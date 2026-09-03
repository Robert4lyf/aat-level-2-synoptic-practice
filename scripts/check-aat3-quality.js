#!/usr/bin/env node
/**
 * Quality control for the AAT Level 3 learning content.
 *
 * scripts/check-aat3-coverage.js asks whether the syllabus is covered.
 * This asks whether the material is any good — the class of defect that
 * coverage checking cannot see:
 *
 *   - answer keys that are guessable from option length (the cue that ran at
 *     58% in the Level 2 bank before it was hunted down)
 *   - distractors that duplicate each other or the key
 *   - explanations too short to explain anything
 *   - question stems repeated across lessons
 *   - tax figures hardcoded in prose instead of referenced from
 *     aat3-tax-data.js, which is what makes the annual Finance Act roll a
 *     one-file job
 *   - cards too thin to teach, now that the target is textbook depth
 *
 * Run via `npm test`.
 */
'use strict';

const path = require('path');
const RED = '\x1b[31m', GREEN = '\x1b[32m', YELLOW = '\x1b[33m';
const BOLD = '\x1b[1m', DIM = '\x1b[2m', RESET = '\x1b[0m';

const ROOT = path.join(__dirname, '..');
const GRID = require(path.join(ROOT, 'question-grid.js'));
const { TAX } = require(path.join(ROOT, 'aat3-tax-data.js'));
const SYL = require(path.join(ROOT, 'aat3-syllabus.js'));
/* Every unit's content, from the one list — see scripts/lib/aat3-content.js.
   Reading AAT3_LEARN_PATH by name examined TPFB and said nothing about FAPS,
   while still reporting green. */
const CONTENT = require('./lib/aat3-content.js');
const { groups: AAT3_LEARN_PATH, questions: PRACTICE_QUESTIONS } = CONTENT.load();

const errors = [];
const warnings = [];
const notes = [];

const lessons = [];
(AAT3_LEARN_PATH || []).forEach(u => (u.lessons || []).forEach(l => lessons.push(l)));

/* Cheat sheets are not lessons — they claim no criteria and carry no questions,
   so the coverage ratchet and the check-questions rule must not see them. Their
   single card is content a reader leans on, though, so every CARD-level gate
   below walks `carded` rather than `lessons`: shape, depth, arithmetic, table
   geometry, prose mannerisms and near-duplication all apply to a sheet exactly
   as they do to a lesson. */
const sheetList = CONTENT.sheets(AAT3_LEARN_PATH || []);
const carded = lessons.concat(sheetList);

/* Every question in the module, wherever it lives. The practice bank gets the
   same scrutiny as the lesson checks — and the shared stem map is what stops
   the bank quietly re-asking a lesson, which would make it a memory test. */
const practice = PRACTICE_QUESTIONS;
const allQuestions = [];
lessons.forEach(l => (l.check || []).forEach((q, i) => allQuestions.push({ where: `${l.id} Q${i + 1}`, q })));
practice.forEach(q => allQuestions.push({ where: `practice ${q.id}`, q, isPractice: true }));

/* ── The try-its, which nothing here had ever looked at ──────────────────────
   A worked example ends with "Now you try": a question, an answer and an
   explanation, graded by the same code and read by the same reader as anything
   in `check`. They were not in allQuestions, so every per-question rule in this
   file — and both of the ones added for the calculator — had a blind spot the
   size of 41 questions.

   Found by sweeping the numeric bank by hand for treatment errors: the sweep
   turned up a try-it saying "a fuel scale charge of £120" and adding £120 in
   full, the exact defect the scale-charge rule had just been written to catch,
   sitting in the one place the rule could not see.

   They are held SEPARATELY rather than folded into allQuestions, because a
   try-it is a different shape — no options, no criteria, a shorter explanation —
   and the rules written for a multiple-choice question would fail it for being
   what it is. The rules that apply to any question with an answer and a reason
   iterate `everyQuestion`. */
const tryIts = [];
lessons.forEach(l => (l.cards || []).forEach((c, i) => {
  if (c.worked && c.worked.tryIt) {
    tryIts.push({ where: `${l.id} card ${i + 1} try-it`, q: Object.assign({ type: 'numeric' }, c.worked.tryIt) });
  }
}));
const everyQuestion = allQuestions.concat(tryIts);

/* ── Thresholds ──────────────────────────────────────────────────────────────
   Set from what the material currently achieves, so they act as a ratchet
   against regression rather than an aspiration. */
const MIN_EXP_CHARS = 90;      // an explanation shorter than this explains nothing
const MIN_CARD_WORDS = 100;    // total teaching words on a card, prose and element together
const MIN_PROSE_WORDS = 80;    // for a card whose prose IS the card, with nothing else on it
const CUE_CEILING_PCT = 45;    // % of MCQs where the key is the single longest option
const MIN_CUE_GAP_CHARS = 25;  // below this an outlying ratio is noise, not a cue

/* Self-justifying option text. An option that argues its own case is doing the
   reader's thinking, and if only some options do it the odd one out is free. */
const REASON_CLAUSE = /\b(because|since|as it|as they|so that|given that)\b/i;

/* Elements that carry teaching weight in their own right. On a card with one of
   these the prose is a lead-in, so measuring prose alone understates the card:
   a worked example's `why` text is the teaching, not the paragraph above it. */
const RICH_ELEMENTS = ['worked', 'table', 'split', 'example', 'flow', 'formula', 'callout', 'examtrap'];

const words = s => String(s || '').split(/\s+/).filter(Boolean).length;
const flat = o => {
  let out = '';
  (function walk(x) {
    if (typeof x === 'string') out += ' ' + x;
    else if (Array.isArray(x)) x.forEach(walk);
    else if (x && typeof x === 'object') Object.values(x).forEach(walk);
  }(o));
  return out;
};

/* A multi-part task: one dataset, several answers derived from it.

   THE RULE THAT MATTERS IS THE LAST ONE. A task exists so the reader has to
   decide which rows count, so at least one figure it asks for must not be the
   plain total of a column — otherwise the whole thing can be answered by adding
   everything up in order, which is the single-step question this type was added
   to get away from. Asserted rather than trusted to authoring discipline.

   Ragged rows are fatal here for the same reason they are in a lesson table:
   the renderer emits one cell per entry, so a short row slides every figure
   below it under the wrong heading, and a reader working from the wrong column
   gets a defensible wrong answer with nothing to show them why. */
let taskCount = 0, taskPartCount = 0, taskRowCount = 0;
function taskErrors(q, where) {
  const out = [];
  taskCount++;
  taskPartCount += (q.parts || []).length;
  (q.datasets || []).forEach(d => { taskRowCount += (d.rows || []).length; });
  const ds = q.datasets;
  if (!Array.isArray(ds) || !ds.length) out.push(`${where}: a task needs at least one dataset.`);
  else ds.forEach((d, di) => {
    if (!Array.isArray(d.rows) || !d.rows.length) { out.push(`${where} dataset ${di}: no rows.`); return; }
    const width = Array.isArray(d.headers) ? d.headers.length : d.rows[0].length;
    d.rows.forEach((r, ri) => {
      if (!Array.isArray(r)) { out.push(`${where} dataset ${di} row ${ri}: not an array.`); return; }
      if (r.length !== width) {
        out.push(`${where} dataset ${di} row ${ri}: ${r.length} cells against ${width} headers — every figure below it renders under the wrong heading.`);
      }
    });
  });

  const parts = q.parts;
  if (!Array.isArray(parts) || parts.length < 2) {
    out.push(`${where}: a task needs at least 2 parts — with one it is a numeric question carrying a table.`);
    return out;
  }
  parts.forEach((p, pi) => {
    const pw = `${where} part ${pi + 1}`;
    if (!p.label) out.push(`${pw}: no label.`);
    if (!p.exp) out.push(`${pw}: no explanation — a reader who got this part wrong learns nothing from a bare answer.`);
    else if (p.exp.length < MIN_EXP_CHARS) {
      warnings.push(`${pw}: explanation is only ${p.exp.length} chars — too short to teach anything.`);
    }
    const t = p.type || 'numeric';
    if (t === 'numeric') {
      if (!Number.isFinite(p.answer)) { out.push(`${pw}: numeric answer is not a finite number.`); return; }
      /* The same guard the standalone numeric questions carry: a part whose
         stated answer never appears in its own explanation has one of the two
         wrong, and the arithmetic checker cannot tell which. */
      const plain = String(p.answer);
      const grouped = Number(p.answer).toLocaleString('en-GB');
      const twoDp = Number(p.answer).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      const e = String(p.exp || '');
      if (e && e.indexOf(plain) === -1 && e.indexOf(grouped) === -1 && e.indexOf(twoDp) === -1) {
        out.push(`${pw}: the stated answer ${grouped} never appears in its own explanation — one of the two is wrong.`);
      }
    } else if (t === 'choice') {
      if (!Array.isArray(p.options) || p.options.length < 2) { out.push(`${pw}: needs at least 2 options.`); return; }
      if (!Number.isInteger(p.answer) || p.answer < 0 || p.answer >= p.options.length) {
        out.push(`${pw}: answer index ${p.answer} is out of range.`);
        return;
      }
      const norm = p.options.map(o => String(o).toLowerCase().replace(/\s+/g, ' ').trim());
      if (new Set(norm).size !== norm.length) out.push(`${pw}: two options are the same text.`);
      /* The length cue, policed here exactly as it is on a standalone MCQ. A
         choice part is a multiple-choice question in every respect that makes a
         key guessable, and letting it escape the guard because it sits inside a
         task would put the module's only unguarded options in its newest type. */
      const lens = p.options.map(o => String(o).length);
      const others = lens.filter((_, i) => i !== p.answer);
      const avg = others.reduce((a, b) => a + b, 0) / others.length;
      const ratio = lens[p.answer] / avg;
      const gap = Math.abs(lens[p.answer] - avg);
      if ((ratio > 1.5 || ratio < 0.67) && gap >= MIN_CUE_GAP_CHARS) {
        out.push(`${pw}: the correct option is ${ratio.toFixed(2)}× the average distractor (${Math.round(gap)} characters apart) — make the options structurally parallel.`);
      }
      const hasReason = o => REASON_CLAUSE.test(String(o));
      const keyReason = hasReason(p.options[p.answer]);
      const otherReasons = p.options.filter((o, i) => i !== p.answer && hasReason(o)).length;
      if (otherReasons > 0 && !keyReason && otherReasons === p.options.length - 1) {
        out.push(`${pw}: every distractor carries a "because…" clause and the correct option does not.`);
      }
      if (keyReason && otherReasons === 0 && p.options.length > 2) {
        out.push(`${pw}: only the correct option carries a "because…" clause.`);
      }
    } else {
      out.push(`${pw}: unknown part type "${t}".`);
    }
  });

  /* CAN THE WHOLE THING BE ANSWERED BY TOTALLING COLUMNS?
     A task exists so the reader has to decide which rows count. If every answer
     happens to equal the plain total of some column, no decision was ever
     required: total everything, in order, and score full marks without reading
     a word. That is the single-step question wearing a table, and it is the
     shape this type was added to get away from.

     So at least one numeric part must be unreachable that way.

     TWO EARLIER VERSIONS OF THIS RULE WERE WRONG, both in the direction of
     passing things they should not have.

     The first looked for an amount appearing in no part's explanation, on the
     theory that an unmentioned figure is one the reader had to discard. It
     accepted any cell containing a digit, so "12 Jan" counted — every dated day
     book satisfied it automatically. Measured: 14 spare cells on the first
     task, 12 of them dates.

     Narrowing it to money-shaped cells fixed that and left something worse. A
     good explanation NAMES the figure it is excluding — "wages and rates are
     both left out of Box 7" is exactly the sentence a reader needs — so the
     better the writing, the more likely the rule was to fire. A check that
     penalises the thing you want is worse than no check.

     Column totals have neither problem: they are computed from the data alone,
     say nothing about how it is described, and test the property that actually
     matters. */
  const amountOf = (c) => {
    const s = String(c).trim();
    if (!/^\(?£?\s?\d[\d,]*\.\d{2}\)?$/.test(s)) return null;
    const n = Number(s.replace(/[£,()\s]/g, ''));
    return Number.isFinite(n) ? (/^\(/.test(s) ? -n : n) : null;
  };
  const colTotals = [];
  let amountCells = 0;
  (Array.isArray(ds) ? ds : []).forEach(d => {
    const rows = d.rows || [];
    const width = Array.isArray(d.headers) ? d.headers.length : (rows[0] || []).length;
    for (let ci = 0; ci < width; ci++) {
      const vals = rows.map(r => amountOf((r || [])[ci])).filter(v => v !== null);
      amountCells += vals.length;
      if (vals.length > 1) colTotals.push(vals.reduce((a, b) => a + b, 0));
    }
  });
  const numericParts = parts.filter(p => (p.type || 'numeric') === 'numeric' && Number.isFinite(p.answer));
  /* Both rules below are about figures, so both are scoped to tasks that ask
     for one. A task made entirely of choice parts — which deadline applies to
     which obligation, say — is a legitimate shape with no arithmetic in it, and
     demanding amounts of it would be demanding the wrong thing. */
  if (numericParts.length && !amountCells) {
    out.push(`${where}: a figure is asked for but no dataset cell is an amount — there is nothing for the reader to work from.`);
    return out;
  }
  const needsSelection = numericParts.filter(p => !colTotals.some(t => Math.abs(t - p.answer) < 0.005));
  if (numericParts.length && !needsSelection.length) {
    out.push(`${where}: every figure asked for is the plain total of a dataset column, so the task can be answered by adding everything up without deciding what counts. Ask for at least one figure that requires rows to be included or excluded.`);
  }
  return out;
}

/* ── 1. Question quality ─────────────────────────────────────────────────── */
const stems = new Map();
let mcqCount = 0, cueCount = 0;

allQuestions.forEach(({ where, q }) => {
  {
    const type = q.type || 'mcq';

    if (!q.q) errors.push(`${where}: no question text.`);
    if (!q.exp) errors.push(`${where}: no explanation.`);
    else if (q.exp.length < MIN_EXP_CHARS) {
      warnings.push(`${where}: explanation is only ${q.exp.length} chars — too short to teach anything.`);
    }

    const key = String(q.q || '').replace(/\s+/g, ' ').trim();
    if (key) {
      if (!stems.has(key)) stems.set(key, []);
      stems.get(key).push(where);
    }

    if (type === 'mcq') {
      mcqCount++;
      if (!Array.isArray(q.opts) || q.opts.length < 2) { errors.push(`${where}: needs at least 2 options.`); return; }
      if (!Number.isInteger(q.ans) || q.ans < 0 || q.ans >= q.opts.length) {
        errors.push(`${where}: ans index ${q.ans} is out of range.`); return;
      }
      const norm = q.opts.map(o => String(o).toLowerCase().replace(/\s+/g, ' ').trim());
      if (new Set(norm).size !== norm.length) errors.push(`${where}: two options are the same text.`);

      const lens = q.opts.map(o => String(o).length);
      const max = Math.max(...lens);
      if (lens[q.ans] === max && lens.filter(x => x === max).length === 1) cueCount++;

      /* STRUCTURAL PARALLELISM.
         The first version of this check only looked for a key that was the
         LONGEST option. That missed the opposite and more common tell: a bare
         correct answer — "Cash accounting" — sitting among three distractors
         that each explain themselves — "Annual accounting, because a single
         return reduces the administrative burden". The odd one out is
         identifiable without reading the question at all, and 22 of 90 MCQs
         had it. Worse, an earlier pass that shortened over-long keys to fix
         the long-key cue was actively creating the short-key one.

         So the test is now symmetric, and it is about SHAPE: every option
         should look like the same kind of thing. A reason clause belongs in
         the explanation, not in an option.

         Ratio alone is a poor signal when all the options are short — the five
         ethical principles differ in length by nature and no cue arises — so a
         meaningful absolute gap is required as well. */
      const others = lens.filter((_, i) => i !== q.ans);
      const avg = others.reduce((a, b) => a + b, 0) / others.length;
      const ratio = lens[q.ans] / avg;
      const gap = Math.abs(lens[q.ans] - avg);
      if ((ratio > 1.5 || ratio < 0.67) && gap >= MIN_CUE_GAP_CHARS) {
        errors.push(`${where}: the correct option is ${ratio.toFixed(2)}× the average distractor (${Math.round(gap)} characters apart) — make the options structurally parallel.`);
      }

      /* The same tell, detected by shape rather than by length: every
         distractor justifies itself and the key does not, or vice versa. */
      const hasReason = o => REASON_CLAUSE.test(String(o));
      const keyReason = hasReason(q.opts[q.ans]);
      const otherReasons = q.opts.filter((o, i) => i !== q.ans && hasReason(o)).length;
      if (otherReasons > 0 && !keyReason && otherReasons === q.opts.length - 1) {
        errors.push(`${where}: every distractor carries a "because…" clause and the correct option does not — the key is identifiable without reading the question.`);
      }
      if (keyReason && otherReasons === 0 && q.opts.length > 2) {
        errors.push(`${where}: only the correct option carries a "because…" clause — the key is identifiable without reading the question.`);
      }
    } else if (type === 'numeric') {
      if (!Number.isFinite(q.answer)) errors.push(`${where}: numeric answer is not a finite number.`);
      /* The answer must appear in its own explanation. A practice question once
         carried answer 14030 while its explanation worked carefully to 12,030 —
         the arithmetic was internally sound, so the chain checker below had
         nothing to say, and only the mismatch between the two gave it away. */
      else if (q.exp) {
        const plain = String(q.answer);
        const grouped = Number(q.answer).toLocaleString('en-GB');
        const twoDp = Number(q.answer).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        if (q.exp.indexOf(plain) === -1 && q.exp.indexOf(grouped) === -1 && q.exp.indexOf(twoDp) === -1) {
          errors.push(`${where}: the stated answer ${grouped} never appears in its own explanation — one of the two is wrong.`);
        }
      }
    } else if (type === 'truefalse') {
      if (!Array.isArray(q.statements) || q.statements.length < 2) { errors.push(`${where}: needs at least 2 statements.`); return; }
      q.statements.forEach((s, si) => {
        if (!s.text) errors.push(`${where} statement ${si + 1}: no text.`);
        if (typeof s.answer !== 'boolean') errors.push(`${where} statement ${si + 1}: answer must be true or false.`);
      });
      const trues = q.statements.filter(s => s.answer === true).length;
      if (trues === 0 || trues === q.statements.length) {
        errors.push(`${where}: every statement has the same answer — the grid is guessable.`);
      }
    } else if (type === 'task') {
      taskErrors(q, where).forEach(e => errors.push(e));
    } else if (type === 'gapfill') {
      if (!q.template) { errors.push(`${where}: no template.`); return; }
      if (!Array.isArray(q.gaps) || !q.gaps.length) { errors.push(`${where}: no gaps.`); return; }
      q.gaps.forEach((g, gi) => {
        if (!q.template.includes('{' + gi + '}')) errors.push(`${where}: template is missing placeholder {${gi}}.`);
        if (!Array.isArray(g.options) || g.options.length < 2) errors.push(`${where} gap ${gi}: needs at least 2 options.`);
        else if (!Number.isInteger(g.answer) || g.answer < 0 || g.answer >= g.options.length) {
          errors.push(`${where} gap ${gi}: answer index out of range.`);
        }
      });
    } else if (type === 'picklist' || type === 'entrygrid') {
      /* The rules live in question-grid.js beside the grading, because three
         levels author these tables and three copies would drift. */
      GRID.problems(q, where).forEach(e => errors.push(e));
    } else if (type === 'written') {
      /* Only what this file is for — the shape of the data. Whether the model
         stays hidden until it is earned, whether the rubric grades at the
         assessment's own pass mark and whether the mark reaches the progress
         record are properties of the SCREEN, and they live in
         scripts/check-written.js, which drives the real player. */
      if (!q.setup) errors.push(`${where}: a written task needs a scenario to answer about.`);
      if (!q.modelAnswer) errors.push(`${where}: a written task needs a model answer to be marked against.`);
      if (!Array.isArray(q.rubric) || q.rubric.length < 3) {
        errors.push(`${where}: a written task needs at least three rubric points.`);
      } else q.rubric.forEach((r, ri) => {
        if (!r || !r.point) errors.push(`${where} rubric ${ri + 1}: no point.`);
        if (!r || !Number.isFinite(r.marks) || r.marks <= 0) {
          errors.push(`${where} rubric ${ri + 1}: is not worth a positive number of marks.`);
        }
      });
      /* A minimum worth writing. Below about thirty words nothing is being
         explained, and the type stops being different from a multiple choice
         with a bigger box. */
      if (!Number.isFinite(q.minWords) || q.minWords < 30) {
        errors.push(`${where}: a written task needs a minWords of at least 30.`);
      }
    } else {
      errors.push(`${where}: unknown question type "${type}".`);
    }
  }
});

/* ── 1a. Every practice question names its unit, and names it in the right field
   ────────────────────────────────────────────────────────────────────────────
   Two different things were called `unit`. On a numeric question it is the unit
   of MEASUREMENT — the £ or % the player prints as the input placeholder. When
   the bank had to be tagged with the AAT unit it belongs to, the obvious field
   name was already taken, and writing `unit: 'tpfb'` into a question that later
   said `unit: '£'` did not fail: the second key won, the question fell out of
   its own practice bank, and nothing said a word.

   So: `unitKey` carries the AAT unit, `unit` carries the measurement, and
   neither is allowed to hold the other's values. An untagged question is worse
   than a missing one — outcome numbers restart at 1 in every unit, so it would
   be counted inside a different unit's outcome 1. */
{
  const UNIT_KEYS = Object.keys(SYL.SYLLABUS.units);
  /* A currency symbol, or a named measure. `units` and `kg` belong here: a
     re-order level and an economic order quantity are answered in units, and a
     stores question in kilograms, so flagging them taught nothing. The point of
     the test is to catch an AAT unit key sitting in `unit`, which line 403
     already does exactly; this is the softer net behind it. */
  const MEASURES = /^[£$%€]|^(hours?|days?|weeks?|months?|units?|items?|kg|tonnes?|litres?|miles?)$/i;
  practice.forEach(q => {
    const where = `practice ${q.id}`;
    if (!q.unitKey) {
      errors.push(`${where}: no unitKey — outcome numbers restart in every unit, so this would be counted under another unit's outcome ${q.lo}.`);
    } else if (UNIT_KEYS.indexOf(q.unitKey) === -1) {
      errors.push(`${where}: unitKey "${q.unitKey}" is not a unit in aat3-syllabus.js (${UNIT_KEYS.join(', ')}).`);
    }
    if (q.unit && UNIT_KEYS.indexOf(q.unit) !== -1) {
      errors.push(`${where}: \`unit\` is set to "${q.unit}", which is an AAT unit key. \`unit\` is the unit of MEASUREMENT the player shows as a placeholder; the AAT unit goes in \`unitKey\`.`);
    }
    if (q.unit && !MEASURES.test(String(q.unit))) {
      warnings.push(`${where}: \`unit\` is "${q.unit}", which does not look like a unit of measurement.`);
    }
    if (q.unitKey && q.lo != null) {
      const u = SYL.SYLLABUS.units[q.unitKey];
      if (u && !u.outcomes.some(o => o.n === q.lo)) {
        errors.push(`${where}: outcome ${q.lo} does not exist in ${q.unitKey.toUpperCase()}.`);
      }
    }
  });
  const byUnit = {};
  practice.forEach(q => { byUnit[q.unitKey || '(none)'] = (byUnit[q.unitKey || '(none)'] || 0) + 1; });
  notes.push(`Practice bank by unit: ${Object.entries(byUnit).map(([k, v]) => `${k} ${v}`).join(', ')}.`);
}

/* ── No two questions ask the same thing in the same words ─────────────────── */

/* WHAT A REPEATED STEM COSTS. Two questions worded identically are two
   different questions to the marker and one question to the reader: met in the
   same endless run they read as a bug, and met in the same paper they read as
   a paper that has run out of things to ask.

   It also breaks anything that identifies a question BY its stem, which is what
   a harness driving a real paper has to do — that is how this rule was found.
   Three collisions had gone in unnoticed while a mock check quietly reported a
   correct paper as scoring 96%, because it answered the first question with
   that wording and the screen was showing the second.

   Compared within a unit, because two units may legitimately examine the same
   idea, and normalised so that a difference of spacing or case is not a
   difference of question. */
{
  const seen = new Map();
  practice.forEach(q => {
    const stem = String(q.q || q.task || '').replace(/\s+/g, ' ').trim().toLowerCase();
    if (!stem) return;
    const key = (q.unitKey || '?') + '|' + stem;
    if (seen.has(key)) {
      errors.push(`practice ${q.id}: asks the same thing in the same words as ${seen.get(key)} ` +
        `— "${stem.slice(0, 60)}${stem.length > 60 ? '…' : ''}". Reword one of them.`);
    } else {
      seen.set(key, q.id);
    }
  });
  notes.push(`${seen.size} distinct question stems across the practice banks.`);
}

/* ── 1b. True/false grids must not be answerable by test-wiseness ─────────
   An adversarial review found two cues in the true/false statements that no
   check was measuring. Both are properties of the SET, not of any one grid,
   so they cannot be caught while looking at questions one at a time.

   First, absolutes. A statement containing "all", "never", "only" or "cannot"
   was keyed FALSE 67% of the time against a 39% base rate — so "if it sounds
   absolute, answer false" beat knowing the subject. Real rules do sometimes
   admit no exception, so the fix is not to ban absolutes but to keep them from
   predicting the answer.

   Second, overall balance. The keys leaned 61% true, which rewards guessing
   true. Neither is a defect in any individual statement, and neither would
   ever show up in review of a single question. */
const ABSOLUTE = /\b(all|never|always|only|cannot|every|immediately|any circumstances)\b/i;
let tfTrue = 0, tfFalse = 0, absTrue = 0, absFalse = 0;
allQuestions.forEach(({ q }) => {
  if ((q.type || 'mcq') !== 'truefalse' || !Array.isArray(q.statements)) return;
  q.statements.forEach(st => {
    if (st.answer) tfTrue++; else tfFalse++;
    if (ABSOLUTE.test(String(st.text))) { if (st.answer) absTrue++; else absFalse++; }
  });
});
if (tfTrue + tfFalse >= 20) {
  const total = tfTrue + tfFalse;
  const truePct = (tfTrue / total) * 100;
  notes.push(`True/false balance: ${tfTrue} true, ${tfFalse} false (${truePct.toFixed(0)}% true; even is 50%).`);
  if (truePct > 65 || truePct < 35) {
    errors.push(`True/false keys are ${truePct.toFixed(0)}% true across ${total} statements — guessing the majority answer beats knowing the material. Rebalance.`);
  } else if (truePct > 60 || truePct < 40) {
    warnings.push(`True/false keys are ${truePct.toFixed(0)}% true across ${total} statements — drifting towards guessable.`);
  }
  const absTotal = absTrue + absFalse;
  if (absTotal >= 8) {
    const absFalsePct = (absFalse / absTotal) * 100;
    const baseFalsePct = (tfFalse / total) * 100;
    notes.push(`Absolute wording ("all", "never", "only"): ${absFalse}/${absTotal} keyed false (${absFalsePct.toFixed(0)}%; base rate ${baseFalsePct.toFixed(0)}%).`);
    if (absFalsePct - baseFalsePct > 20) {
      errors.push(`Statements containing an absolute are keyed false ${absFalsePct.toFixed(0)}% of the time against a ${baseFalsePct.toFixed(0)}% base rate — "if it sounds absolute, answer false" is a winning strategy. Either soften the false stems or key some absolutes true.`);
    }
  }
}

stems.forEach((where, stem) => {
  if (where.length > 1) {
    warnings.push(`Question stem repeated in ${where.join(', ')}: "${stem.slice(0, 60)}…"`);
  }
});

if (mcqCount) {
  const pct = (cueCount / mcqCount) * 100;
  notes.push(`Answer-length cue: the key is the single longest option in ${cueCount}/${mcqCount} MCQs (${pct.toFixed(1)}%; chance is 25%).`);
  if (pct > CUE_CEILING_PCT) {
    errors.push(`Answer-length cue is ${pct.toFixed(1)}% of MCQs, above the ${CUE_CEILING_PCT}% ceiling. Lengthen distractors on the flagged questions.`);
  }
}

/* ── 2. Worked examples ──────────────────────────────────────────────────── */
let workedCount = 0, tryCount = 0;
carded.forEach(l => {
  (l.cards || []).forEach((c, ci) => {
    if (!c.worked) return;
    workedCount++;
    const where = `${l.id} card ${ci + 1}`;
    const w = c.worked;
    if (!w.problem) errors.push(`${where}: worked example has no problem.`);
    if (!Array.isArray(w.steps) || !w.steps.length) errors.push(`${where}: worked example has no steps.`);
    else w.steps.forEach((s, si) => {
      if (!s.do) errors.push(`${where} step ${si + 1}: no "do" text.`);
      /* A step without a "why" is an instruction, not teaching. */
      if (!s.why) warnings.push(`${where} step ${si + 1}: no "why" — the step says what to do but not why.`);
    });
    if (!w.answer) errors.push(`${where}: worked example has no answer.`);
    if (w.tryIt) {
      tryCount++;
      if (!w.tryIt.q) errors.push(`${where}: tryIt has no question.`);
      if (!Number.isFinite(w.tryIt.answer)) errors.push(`${where}: tryIt answer is not a finite number.`);
      if (!w.tryIt.exp) warnings.push(`${where}: tryIt has no explanation.`);
    }
  });
});

/* ── 2a. Card fields must match the shape the renderer reads ─────────────── */
/* An examtrap authored as { text: '…' } instead of a plain string rendered as
   the literal "[object Object]" on a shipped card, because the renderer passes
   it straight to md(). Nothing caught it: the data loaded, the coverage check
   passed, the prose was counted. This encodes the contract in aat3-ui.js so a
   field that would stringify into the page fails the build instead.

   `str` means it reaches md()/esc() directly and MUST be a primitive. */
const CARD_SHAPE = {
  h: 'str',
  p: 'str[]',
  formula: 'str',
  flow: 'str[]',
  examtrap: 'str',
  callout: { kind: 'str?', text: 'str' },
  table: { headers: 'str[]?', rows: 'str[][]' },
  example: { title: 'str?', rows: 'str[][]' },
  split: { left: { title: 'str?', items: 'str[]' }, right: { title: 'str?', items: 'str[]' } },
  worked: {
    title: 'str?', problem: 'str', answer: 'str',
    steps: [{ do: 'str', why: 'str?' }],
    tryIt: { q: 'str', answer: 'num', unit: 'str?', hint: 'str?', exp: 'str?' },
  },
};

function isPrim(v) { return typeof v === 'string' || typeof v === 'number'; }

function checkShape(val, spec, where) {
  if (val === undefined || val === null) return;
  if (typeof spec === 'string') {
    const optional = spec.endsWith('?');
    const base = optional ? spec.slice(0, -1) : spec;
    if (base === 'str') {
      if (!isPrim(val)) errors.push(`${where}: must be text, but is ${Array.isArray(val) ? 'an array' : typeof val} — it would render as "[object Object]".`);
    } else if (base === 'num') {
      if (!Number.isFinite(val)) errors.push(`${where}: must be a finite number.`);
    } else if (base === 'str[]') {
      if (!Array.isArray(val)) { errors.push(`${where}: must be a list.`); return; }
      val.forEach((x, i) => { if (!isPrim(x)) errors.push(`${where}[${i}]: must be text, but is ${typeof x} — it would render as "[object Object]".`); });
    } else if (base === 'str[][]') {
      if (!Array.isArray(val)) { errors.push(`${where}: must be a list of rows.`); return; }
      val.forEach((row, r) => {
        if (!Array.isArray(row)) { errors.push(`${where}[${r}]: must be a row (a list of cells).`); return; }
        row.forEach((x, cIdx) => { if (!isPrim(x)) errors.push(`${where}[${r}][${cIdx}]: must be text — it would render as "[object Object]".`); });
      });
    }
    return;
  }
  if (Array.isArray(spec)) {
    if (!Array.isArray(val)) { errors.push(`${where}: must be a list.`); return; }
    val.forEach((item, i) => checkShape(item, spec[0], `${where}[${i}]`));
    return;
  }
  if (typeof val !== 'object' || Array.isArray(val)) { errors.push(`${where}: must be an object.`); return; }
  Object.keys(spec).forEach(k => {
    const sub = spec[k];
    const required = typeof sub === 'string' ? !sub.endsWith('?') : true;
    if (val[k] === undefined) {
      if (required) errors.push(`${where}.${k}: missing.`);
      return;
    }
    checkShape(val[k], sub, `${where}.${k}`);
  });
}

carded.forEach(l => {
  (l.cards || []).forEach((c, ci) => {
    Object.keys(c).forEach(k => {
      if (!CARD_SHAPE[k]) { errors.push(`${l.id} card ${ci + 1}: unknown field "${k}" — the renderer will ignore it silently.`); return; }
      checkShape(c[k], CARD_SHAPE[k], `${l.id} card ${ci + 1}.${k}`);
    });
  });
});

/* ── 2a-ii. Prose must not promise an element the card does not have ─────── */
/* A card's prose referred three times to "that table" and to "the most valuable
   line in that table", and no table was ever rendered on it — the content had
   been written as prose and the table never built. Deliberately narrow: it
   fires only on phrases that promise something ON THIS CARD ("the table
   below", "shown below"), never on a bare mention of "the table", because
   material legitimately refers to tables HMRC publishes and supplies in the
   assessment. A checker that cried wolf here would be worse than none. */
const PROMISES = {
  table: /\b(the|this)\s+table\s+(below|opposite|here)\b|\b(below|following)\s+table\b/i,
  worked: /\bworked example below\b/i,
  split: /\b(the\s+)?two\s+columns\s+below\b/i,
  flow: /\b(the\s+)?(flow|sequence)\s+below\b/i,
  example: /\bexample below\b/i,
  formula: /\bformula below\b/i,
};
carded.forEach(l => {
  (l.cards || []).forEach((c, ci) => {
    const prose = Array.isArray(c.p) ? c.p.join(' ') : String(c.p || '');
    Object.keys(PROMISES).forEach(el => {
      const m = prose.match(PROMISES[el]);
      if (m && !c[el]) {
        errors.push(`${l.id} card ${ci + 1} ("${String(c.h || '').slice(0, 40)}"): prose says "${m[0]}" but the card has no ${el}.`);
      }
    });
  });
});

/* ── 2a-iii. A key written twice in one object literal ───────────────────── */
/* JavaScript accepts `{ p: [...], example: {...}, p: [...] }` without a murmur
   and keeps the LAST one. The content files are large object literals written
   by hand, and this has now eaten data twice: `unit: 'tpfb'` overwritten by a
   numeric question's `unit: '£'`, dropping 29 questions out of a practice bank,
   and two FAPS cards where a second `p` silently deleted three paragraphs of
   teaching that had been written, reviewed and committed.

   Neither failure is visible at runtime — the object is valid, the file loads,
   and the only symptom is content that is not there. The depth check caught the
   second by accident, because the surviving paragraph was short enough to trip
   a word count. A longer survivor would have passed.

   THE FIRST VERSION OF THIS CHECK ONLY LOOKED AT LINE-LEADING KEYS, which is
   how these files are usually laid out — and would therefore have missed the
   very bug that prompted it, because `id: 'P-1-02', unit: 'tpfb', lo: 1,` puts
   three keys on one line. So the scan is a character walk: it tracks strings,
   comments and brace depth, and treats an identifier as a key when the last
   significant character before it was `{` or `,`. That last condition is what
   keeps ternaries and labels out of it. */
CONTENT.FILES.forEach(({ file }) => {
  const src = require('fs').readFileSync(path.join(ROOT, file), 'utf8');
  const seen = [];               // one Map per open brace depth
  let depth = 0, inStr = null, line = 1, lastSig = '';
  let i = 0;

  const isIdStart = c => /[A-Za-z_$]/.test(c);
  const isIdChar = c => /[\w$]/.test(c);

  while (i < src.length) {
    const c = src[i], n = src[i + 1];
    if (c === '\n') { line++; i++; continue; }

    if (inStr) {
      if (c === '\\') { i += 2; continue; }
      if (c === inStr) inStr = null;
      i++; continue;
    }
    if (c === '/' && n === '*') { const e = src.indexOf('*/', i + 2); const skip = e === -1 ? src.length : e + 2; line += src.slice(i, skip).split('\n').length - 1; i = skip; continue; }
    if (c === '/' && n === '/') { const e = src.indexOf('\n', i); i = e === -1 ? src.length : e; continue; }
    if (c === "'" || c === '"' || c === '`') { inStr = c; lastSig = c; i++; continue; }

    if (c === '{') { depth++; seen[depth] = new Map(); lastSig = c; i++; continue; }
    if (c === '}') { seen[depth] = null; depth--; lastSig = c; i++; continue; }
    if (c === '[' || c === ']') { lastSig = c; i++; continue; }

    if (isIdStart(c) && (lastSig === '{' || lastSig === ',')) {
      let j = i;
      while (j < src.length && isIdChar(src[j])) j++;
      const word = src.slice(i, j);
      let k = j;
      while (k < src.length && /\s/.test(src[k])) { if (src[k] === '\n') line++; k++; }
      if (src[k] === ':') {
        const map = seen[depth];
        if (map) {
          if (map.has(word)) {
            errors.push(`${file}:${line}: the key "${word}" is set twice in the same object (first at line ${map.get(word)}). JavaScript keeps the last one silently, so whatever the first held is gone.`);
          } else {
            map.set(word, line);
          }
        }
        lastSig = ':';
        i = k + 1;
        continue;
      }
      lastSig = word[word.length - 1];
      i = j;
      continue;
    }

    if (!/\s/.test(c)) lastSig = c;
    i++;
  }
});

/* ── 2a-iv. Every row of a table has to be the same width ────────────────── */
/* The renderer emits one cell per entry and nothing else. A row with fewer
   entries than the header therefore renders SHORT — the remaining columns
   simply stop, and the browser closes the row where the data ran out, so the
   figures below it slide left under the wrong headings. Nothing throws, the
   page still paints, and a reader sees a carrying amount sitting in the
   depreciation column.

   Found by writing one. A four-column statement-of-financial-position layout
   was drafted with three-column rows underneath it; the shape check passed,
   because str[][] says nothing about how long each row is.

   Measured at zero across all 58 tables and examples in the module before
   being added, so it is a ratchet against a new one rather than a backlog. */
[['table', t => (t.headers ? [t.headers] : []).concat(t.rows || [])],
 ['example', e => e.rows || []]].forEach(([field, rowsOf]) => {
  carded.forEach(l => {
    (l.cards || []).forEach((c, ci) => {
      const el = c[field];
      if (!el) return;
      const rows = rowsOf(el).filter(Array.isArray);
      if (rows.length < 2) return;
      const widths = rows.map(r => r.length);
      const commonest = widths.slice().sort((a, b) =>
        widths.filter(w => w === b).length - widths.filter(w => w === a).length)[0];
      rows.forEach((r, ri) => {
        if (r.length !== commonest) {
          errors.push(`${l.id} card ${ci + 1}.${field}: row ${ri + 1} has ${r.length} cells where the rest of the table has ${commonest} — the columns below it will render under the wrong headings.`);
        }
      });
    });
  });
});

/* ── 2a-v. The first row of an example is rendered as a header ───────────── */
/* The renderer emits row 0 with <th> and every other row with <td>, so whatever
   is written first is styled as the column labels whether it names columns or
   not. Two Outcome 7 layouts were drafted starting straight in on the figures,
   which put "Profit for the year … 96,000" across the page in header type with
   no labels above the money at all.

   Checked as "row 0 must not contain a money amount", which is the part that
   can be decided mechanically. A label like "Year 1" is fine; "96,000" or
   "£600" is a line of the statement that has been pushed into the header.
   All 17 examples in the module satisfied it once the two were fixed. */
const MONEY_CELL = /£\s?\d|\d{1,3},\d{3}|\d+\.\d{2}/;
let gridsChecked = 0, headersChecked = 0;
carded.forEach(l => {
  (l.cards || []).forEach(c => { if (c.table) gridsChecked++; if (c.example) { gridsChecked++; headersChecked++; } });
});
carded.forEach(l => {
  (l.cards || []).forEach((c, ci) => {
    const rows = c.example && c.example.rows;
    if (!Array.isArray(rows) || !Array.isArray(rows[0])) return;
    const money = rows[0].filter(x => MONEY_CELL.test(String(x)));
    if (money.length) {
      errors.push(`${l.id} card ${ci + 1}.example: the first row is rendered as the table header, and it carries figures (${money.join(', ')}) — put the column labels there and move this line down.`);
    }
  });
});

/* ── 2b. Arithmetic stated in prose must actually compute ────────────────── */
/* Worked examples and explanations state their sums in the text — "£18,400 +
   £90 − £560 = £17,930". Those are load-bearing: a student who cannot
   reproduce the line assumes they are wrong, not the material. This evaluates
   every such chain it can parse and checks the stated result.

   Deliberately conservative. It only handles + − × ÷ and % over plain numbers,
   and skips anything it cannot parse cleanly, because a false failure here
   would train people to ignore the gate. */
const NUM = '£?\\s?-?\\d[\\d,]*(?:\\.\\d+)?%?';
const CHAIN = new RegExp(NUM + '(?:\\s*[+\\-−×x*÷/]\\s*' + NUM + ')+\\s*=\\s*' + NUM, 'g');

function val(tok) {
  const pct = /%$/.test(tok);
  const n = Number(String(tok).replace(/[£,%\s]/g, ''));
  return { n: n, pct: pct };
}

function evalChain(expr) {
  const parts = String(expr).split('=');
  if (parts.length !== 2) return null;
  const toks = parts[0].match(new RegExp(NUM + '|[+\\-−×x*÷/]', 'g'));
  if (!toks || toks.length < 3) return null;

  let acc = val(toks[0]);
  if (acc.pct) return null;                     // a leading percentage is not a chain we model
  let total = acc.n;
  for (let i = 1; i < toks.length; i += 2) {
    const op = toks[i], rhsTok = toks[i + 1];
    if (rhsTok === undefined) return null;
    const rhs = val(rhsTok);
    if (!Number.isFinite(rhs.n)) return null;
    if (op === '+') { if (rhs.pct) return null; total += rhs.n; }
    else if (op === '-' || op === '−') { if (rhs.pct) return null; total -= rhs.n; }
    else if (op === '×' || op === 'x' || op === '*') total = rhs.pct ? total * (rhs.n / 100) : total * rhs.n;
    else if (op === '÷' || op === '/') { if (rhs.pct || rhs.n === 0) return null; total /= rhs.n; }
    else return null;
  }
  const want = val(parts[1]);
  if (want.pct || !Number.isFinite(want.n)) return null;
  return { got: total, want: want.n };
}

let sumsChecked = 0;

/* THE PRACTICE BANK IS IN HERE TOO, and it had never been.
   This pass walked `carded` — lessons and cheat sheets — so a sum written into
   a practice question's explanation was evaluated by nobody. That was survivable
   while those explanations were a sentence each; multi-part tasks put a worked
   chain behind every figure they ask for, which is exactly the material this
   check exists for. Adding the bank took the count from 330 to a number that
   includes them, and found nothing wrong — which is the answer you want and not
   a reason to have left it unasked. */
const chainSources = carded.map(l => ({ id: l.id, text: flat({ cards: l.cards, check: l.check }) }))
  .concat(allQuestions.map(({ where, q }) => ({ id: where, text: flat(q) })));

chainSources.forEach(({ id, text }) => {
  const found = text.match(CHAIN) || [];
  found.forEach(expr => {
    const r = evalChain(expr);
    if (!r) return;
    sumsChecked++;
    /* Tolerate a penny of rounding, and tolerate a stated result that has been
       rounded to whole pounds from a fractional one. */
    const off = Math.abs(r.got - r.want);
    if (off > 0.011 && off > Math.abs(r.got) * 1e-9 && Math.round(r.got) !== r.want) {
      errors.push(`${id}: the stated sum "${expr.trim()}" does not compute — it comes to ${r.got.toFixed(2)}.`);
    }
  });
});

/* ── 3. Tax figures must come from aat3-tax-data.js ──────────────────────── */
/* Any of these appearing literally in prose is a figure that will silently go
   stale when the Finance Act rolls. Rates and small worked-example amounts are
   fine; it is the thresholds and limits that must be referenced.

   Scanned only in the files whose unit HAS a Finance Act. FAPS does not, so
   every one of these amounts is an ordinary number there — and matching them
   in it produces false alarms that train people to skip the whole section. */
const GOVERNED = [
  [String(TAX.registration.threshold.value), 'VAT registration threshold'],
  [String(TAX.registration.deregistrationThreshold.value), 'deregistration threshold'],
  [String(TAX.schemes.cashAccounting.joinThreshold.value), 'cash accounting join threshold'],
  [String(TAX.schemes.flatRate.leaveThreshold.value), 'flat rate leave threshold'],
  [String(TAX.errorCorrection.netErrorLimit.value), 'error correction limit'],
  [String(TAX.errorCorrection.absoluteCeiling.value), 'error correction ceiling'],
  [String(TAX.penalties.lateSubmission.penalty.value), 'late submission penalty'],
  [String(TAX.partialExemption.deMinimisPerMonth.value), 'partial exemption de minimis'],
];
/* This must read the SOURCE, not the loaded objects. A correct reference —
   `'£' + T.partialExemption.deMinimisPerMonth.value + ' a month'` — evaluates to
   the very string we are hunting for, so checking the runtime value cannot tell
   a live reference from a hardcoded one. In the source they are unmistakable. */
/* Scanned FILE BY FILE. Concatenating them first and reporting one line number
   into the join names a line that exists in no file anybody can open. */
CONTENT.FILES.filter(f => f.taxGoverned).forEach(({ file }) => {
  const source = require('fs').readFileSync(path.join(ROOT, file), 'utf8');
  GOVERNED.forEach(([value, label]) => {
    const withCommas = Number(value).toLocaleString('en-GB');
    /* `\b` is wrong here: £200\b matches inside "£200,000", because the comma is
       a word boundary. Reject a digit continuation, and a comma or point that is
       itself followed by a digit — but NOT a sentence-ending "£90,000." */
    const re = new RegExp('£\\s?(' + value + '|' + withCommas + ')(?!\\d)(?![,.]\\d)', 'g');
    let m;
    while ((m = re.exec(source)) !== null) {
      const line = source.slice(0, m.index).split('\n').length;
      warnings.push(`${file}:${line}: the ${label} (£${withCommas}) is hardcoded. Reference aat3-tax-data.js so a Finance Act change is a one-file edit.`);
    }
  });
});

/* ── 4. Teaching depth ───────────────────────────────────────────────────── */
let cardCount = 0, proseTotal = 0, teachTotal = 0;
carded.forEach(l => {
  (l.cards || []).forEach((c, ci) => {
    cardCount++;
    const label = `${l.id} card ${ci + 1} ("${String(c.h || '').slice(0, 40)}")`;
    const pw = words(Array.isArray(c.p) ? c.p.join(' ') : c.p);
    proseTotal += pw;

    /* Everything on the card except its heading. */
    const body = {};
    Object.keys(c).forEach(k => { if (k !== 'h') body[k] = c[k]; });
    const tw = words(flat(body));
    teachTotal += tw;

    if (tw < MIN_CARD_WORDS) {
      warnings.push(`${label} carries ${tw} teaching words — too thin to teach.`);
    }
    if (!RICH_ELEMENTS.some(k => c[k]) && pw < MIN_PROSE_WORDS) {
      warnings.push(`${label} is prose-only with ${pw} words and nothing else on it — give it depth or an element.`);
    }
    if (!c.h) errors.push(`${l.id} card ${ci + 1}: no heading.`);
  });
});

/* Lessons only. A cheat sheet with check questions would be a lesson with the
   teaching removed. */
lessons.forEach(l => {
  if (!(l.check || []).length) errors.push(`${l.id}: no check questions.`);
});

/* ── Prose mannerisms ────────────────────────────────────────────────────────
   The patterns and matchers live in scripts/lib/prose-mannerisms.js, shared
   with the other quality checkers; the reasoning is set out there at length.
   Message strings stay here so each module reports in its own voice. */
const {
  SIGNPOST_CEILING_PER_1K, CADENCE_MAX_PER_CARD,
  neverHits, cadenceHits, signpostCount, paras,
} = require('./lib/prose-mannerisms.js');

carded.forEach(l => (l.cards || []).forEach((c, ci) => {
  const text = paras(c).join(' ');
  const found = cadenceHits(text);
  if (found.length > CADENCE_MAX_PER_CARD) {
    errors.push(`${l.id} card ${ci + 1} ("${String(c.h || '').slice(0, 40)}"): ${found.length} rhetorical cadences stacked on one card — ${[...new Set(found)].join('; ')}. One is emphasis; a pile-up is what makes prose read as machine-written. Make the points instead of announcing them.`);
  }
}));


let proseWords = 0;
const proseBits = [];
carded.forEach(l => (l.cards || []).forEach((c, ci) => {
  paras(c).forEach(par => {
    const text = String(par);
    proseBits.push(text);
    proseWords += words(text);
    neverHits(text).forEach(label => errors.push(`${l.id} card ${ci + 1} ("${String(c.h || '').slice(0, 40)}"): prose contains "${label}" — a machine-writing tell, not this material's voice.`));
  });
}));
const signposts = signpostCount(proseBits.join('\n'));
const perK = proseWords ? (1000 * signposts / proseWords) : 0;
notes.push(`Signposting ("it is worth…"): ${signposts} in ${proseWords.toLocaleString('en-GB')} prose words = ${perK.toFixed(2)} per 1,000 (ceiling ${SIGNPOST_CEILING_PER_1K.toFixed(1)}).`);
if (perK > SIGNPOST_CEILING_PER_1K) {
  warnings.push(`Signposting runs at ${perK.toFixed(2)} per 1,000 prose words, above the ${SIGNPOST_CEILING_PER_1K.toFixed(1)} ceiling. "It is worth noting that X" announces that X matters instead of saying X — cut the frame and keep the point.`);
}

/* ── 5. Near-duplicate cards ─────────────────────────────────────────────────
   Two cards in this module taught the same thing twice: 2A's "What software
   does and does not do for you" and, three lessons later, a shorter restatement
   of the same three claims with the same example. Nothing flagged it, because
   every other check here looks at one card at a time.

   Repetition is not cosmetic in teaching material. A reader who meets an idea
   twice cannot tell whether the second telling is deliberate reinforcement or a
   sign the author lost track — and the shorter version is almost always the
   weaker one, so the effect is to dilute the good telling.

   THE MEASURE, AND WHY NOT THE OBVIOUS ONE

   Comparison is over content-word BIGRAMS: two cards about VAT inevitably share
   "input", "tax" and "supply" without saying anything alike, so it is shared
   PHRASING that indicates one was written from the other.

   The first version of this check scored those bigram sets with Jaccard and
   MISSED the very pair it was written for — 0.20 against a 0.24 threshold.
   Jaccard divides by the union, so a short card restating part of a long one is
   penalised for the length difference, which is exactly backwards: being shorter
   is what makes it a redundant restatement rather than a second treatment.

   Containment — shared ÷ the smaller set — asks the right question: is this
   card mostly already inside another one? Measured on the real pair it gives
   0.69, against 0.28 for the closest legitimate pair in the module (0B's
   introduction to the nine boxes and 3C's detailed treatment of them, which
   genuinely share subject matter and should). The threshold sits between. */
const STOP = new Set(('a an and are as at be been but by can cannot for from had has have if in into is it its ' +
  'may must no not of on one or so than that the their them then there these they this to two up was what when ' +
  'where which who will with would you your does do').split(' '));

function bigrams(text) {
  const w = String(text || '')
    .toLowerCase()
    .replace(/\*\*|\*/g, ' ')
    .replace(/[^a-z0-9£%\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t && !STOP.has(t));
  const out = new Set();
  for (let i = 0; i < w.length - 1; i++) out.add(w[i] + ' ' + w[i + 1]);
  return out;
}
function containment(a, b) {
  if (!a.size || !b.size) return 0;
  let shared = 0;
  a.forEach(x => { if (b.has(x)) shared++; });
  return shared / Math.min(a.size, b.size);
}

const DUPLICATE_AT = 0.45;
const MIN_BIGRAMS = 25;          // too short to judge, and short cards repeat by nature

const fingerprints = [];
carded.forEach(l => {
  (l.cards || []).forEach((c, ci) => {
    const g = bigrams(flat(c));
    if (g.size >= MIN_BIGRAMS) {
      fingerprints.push({ label: `${l.id} card ${ci + 1} ("${String(c.h || '').slice(0, 44)}")`, g });
    }
  });
});
let closest = 0, closestPair = '';
for (let i = 0; i < fingerprints.length; i++) {
  for (let j = i + 1; j < fingerprints.length; j++) {
    const score = containment(fingerprints[i].g, fingerprints[j].g);
    if (score > closest) { closest = score; closestPair = `${fingerprints[i].label} / ${fingerprints[j].label}`; }
    if (score >= DUPLICATE_AT) {
      warnings.push(`${fingerprints[i].label} and ${fingerprints[j].label}: ${Math.round(score * 100)}% of the shorter card's phrasing already appears in the other. One is probably a restatement — keep the better telling and cut or repoint the other.`);
    }
  }
}
notes.push(`${fingerprints.length} cards compared pairwise for near-duplication; closest ${Math.round(closest * 100)}%, flagged at ${Math.round(DUPLICATE_AT * 100)}% (${closestPair}).`);

/* ── 6. Terms used before the lesson that explains them ──────────────────────
   Reported three times by a reader, each time about a different term: Making
   Tax Digital introduced as new in three separate lessons, then the domestic
   reverse charge and Time to Pay named without explanation, then bad debt
   relief and the fuel scale charge used repeatedly across Outcomes 1 and 2
   before Outcome 2 defines them.

   The unit's vocabulary is not optional scenery. A reader who meets "fuel scale
   charge" in lesson 0A and is not told what it is must either break off to look
   elsewhere or carry an unexplained noun for thirteen lessons.

   The rule enforced is the modest, checkable one: a term may be named before
   its own lesson, but the card that names it early must say WHERE it is
   explained. A pointer is the floor, not the ceiling — a term the reader is
   asked to reason with, rather than merely see in a list, deserves a sentence
   of gloss too, and that part is a judgement no check can make.

   The home lesson is DERIVED from card headings rather than declared, so the
   table below cannot drift out of date: if a term stops titling a card, the
   check fails loudly instead of quietly passing. */
const KEY_TERMS = [
  /* Outcomes 1 and 2 — VAT */
  'fuel scale charge', 'bad debt relief', 'Making Tax Digital', 'partial exemption',
  'de minimis', 'tax point', 'flat rate scheme', 'cash accounting', 'annual accounting',
  'blocked input tax', 'postponed accounting',
  /* Outcome 3 — reviewing and correcting */
  'net error', 'VAT control account', 'Method 2',
  /* Outcome 4 — payroll */
  'Real Time Information', 'Full Payment Submission', 'Employer Payment Summary',
  'employment allowance', 'attachment of earnings', 'statutory deduction', 'tax code',
  'gross pay', 'taxable pay', 'net pay', 'student loan', 'P11D', 'P45', 'P60',
  /* Outcome 5 — communication and ethics */
  'fundamental principles', 'money laundering', 'confidentiality',
];

/* Deliberately NOT in the list, with the reason, so nobody adds them back:

   "National Insurance" — the derivation below would name 3C as its home,
   because that is where it is first bolded. But 3C bolds it inside a list of
   things EXCLUDED from Box 6, which is not a definition. Payroll deductions are
   handed to you as figures in this unit rather than calculated, so there is no
   card that defines the term and no honest home to point at.

   "PAYE" — too widely used, in twelve lessons, for a single home to be
   meaningful; 0B introduces it at orientation level and 4A onwards assumes it. */

const lessonOrder = [];
AAT3_LEARN_PATH.forEach(u => (u.lessons || []).forEach(l => lessonOrder.push(l)));

KEY_TERMS.forEach(term => {
  /* Two things this pattern has to get right, both learned the hard way.

     Word boundaries are not optional: without them "PAYE" matches inside
     "payers" and "P45" inside a reference number, so the check reports on a
     lesson that never mentioned the term.

     But adding them alone broke the term this whole check was written for.
     Cards are titled in the plural — "Fuel scale charges", "Statutory and
     non-statutory deductions" — so \b after a singular term fails to match its
     own heading, the home falls through to wherever the term happens to be
     bolded first, and the check passes vacuously. A trailing "s" is therefore
     optional on the last word, which matches singular and plural alike. */
  const pattern = term.replace(/ /g, '\\s+') + 's?';
  const re = new RegExp('\\b' + pattern + '\\b', 'i');

  /* Where a term is explained, in order of how strongly the signal states it:
     a card TITLED with the term is the author saying "this card is about X";
     failing that, the first place the term is BOLDED, which is how this module
     marks a term being introduced. Both are derived, so neither can go stale
     silently — a term with neither signal fails the build. */
  let homeIdx = lessonOrder.findIndex(l => (l.cards || []).some(c => re.test(String(c.h || ''))));
  if (homeIdx === -1) {
    const boldRe = new RegExp('\\*\\*[^*]*\\b' + pattern + '\\b[^*]*\\*\\*', 'i');
    homeIdx = lessonOrder.findIndex(l => boldRe.test(flat(l)));
  }
  if (homeIdx === -1) {
    errors.push(`Key term "${term}" is neither the title of a card nor bolded anywhere, so this check cannot tell where it is explained. Give it a home or drop it from KEY_TERMS.`);
    return;
  }
  const home = lessonOrder[homeIdx].id.replace('L3-TPFB-', '');

  /* EVERY lesson ahead of the home one, not just the first. The complaint that
     prompted this was precisely that a term recurred several times unexplained;
     stopping at the first mention would leave exactly that pattern undetected. */
  for (let i = 0; i < homeIdx; i++) {
    const l = lessonOrder[i];
    const pieces = (l.cards || [])
      .map((c, ci) => ({ label: `card ${ci + 1} ("${String(c.h || '').slice(0, 36)}")`, text: flat(c) }))
      .concat((l.check || []).map((q, qi) => ({ label: `check Q${qi + 1}`, text: flat(q) })));
    const hit = pieces.find(x => re.test(x.text));
    if (!hit) continue;
    if (!new RegExp('\\b' + home + '\\b').test(hit.text)) {
      warnings.push(`${l.id} ${hit.label} uses "${term}" but ${home} is where it is explained, and this card does not say so. Name the lesson, and gloss the term if the reader has to reason with it here.`);
    }
  }
});

/* ── Report ──────────────────────────────────────────────────────────────── */
const totalWords = words(flat(AAT3_LEARN_PATH));
notes.push(`${lessons.length} lessons · ${cardCount} cards · ${Math.round(proseTotal / cardCount)} words of prose and ${Math.round(teachTotal / cardCount)} words of teaching per card.`);
notes.push(`${workedCount} worked examples (${tryCount} with a try-it) · ${totalWords} words in the module.`);
notes.push(`${sumsChecked} arithmetic chains stated in prose were evaluated and agree.`);
if (taskCount) {
  notes.push(`${taskCount} multi-part tasks: ${taskPartCount} parts and ${taskRowCount} dataset rows checked for shape, ragged rows and answerability by column total.`);
}
notes.push(`${gridsChecked} tables and examples checked for ragged rows; ${headersChecked} example header rows checked for figures.`);

/* ── The fuel scale charge is a GROSS figure ─────────────────────────────────
   The module teaches this in its own words — "The scale charge is a gross
   figure and it is OUTPUT tax" is an exam trap on a card, and a true/false
   statement asserts that the figure is VAT-inclusive — and HMRC's published
   table gives a VAT-inclusive consideration per CO2 band, with the VAT at one
   sixth of it.

   So "a fuel scale charge of £288 applies" adds £48 to output tax, not £288.
   One question said £288 and added the lot, reaching an answer that its own
   explanation then justified: the arithmetic gate could not see it, because
   "£22,750 + £288 = £23,038" is perfectly good arithmetic. What was wrong was
   the treatment, and the only thing that can catch a wrong treatment is a rule
   that knows the treatment.

   Two phrasings, two meanings, and both are checked:
     "a fuel scale charge OF £X"      — X is the gross charge; the VAT is X ÷ 6
     "a fuel scale charge ADDING £X"  — X is already the output tax; add it whole
   The second exists because a reconciliation question wants to hand over the
   adjustment itself. Anything else is ambiguous by construction and is failed
   here, since the ambiguity is the trap. */
{
  const OF = /fuel scale charge of £([\d,]+)/i;
  const ADDING = /fuel scale charge (?:of £[\d,]+ )?adding £([\d,]+)/i;
  let scaleChecked = 0;
  everyQuestion.forEach(({ where, q }) => {
    const stem = q.q || '';
    if (!/fuel scale charge/i.test(stem)) return;
    const adding = ADDING.exec(stem);
    const of = OF.exec(stem);
    if (!adding && !of) return;          // a stem that names no figure has nothing to get wrong
    scaleChecked++;
    const exp = q.exp || '';
    if (adding) {
      if (/÷\s*6/.test(exp)) {
        errors.push(`${where}: the stem says the scale charge ADDS £${adding[1]}, so that figure is ` +
          `already the output tax — the explanation must not divide it by six.`);
      }
      return;
    }
    const gross = Number(of[1].replace(/,/g, ''));
    /* The explanation has to show the sixth being taken. Requiring the figure
       as well as the operator, so an explanation dividing some OTHER number by
       six does not satisfy it. */
    const shown = new RegExp('£' + of[1].replace(/,/g, '[,]?') + '\\s*÷\\s*6').test(exp);
    if (!shown) {
      errors.push(`${where}: "a fuel scale charge of £${of[1]}" is a VAT-INCLUSIVE figure, so it adds ` +
        `£${(gross / 6).toLocaleString('en-GB')} of output tax, not £${of[1]}. The explanation must show ` +
        `£${of[1]} ÷ 6, or the stem must say "adding £X of output tax" if X is meant to be the VAT itself.`);
    }
  });
  notes.push(`${scaleChecked} fuel scale charge questions checked for the gross-figure treatment.`);
}

/* ── A numeric question with nothing to calculate ────────────────────────────
   A numeric question puts an answer box on the screen, and the Level 3 player
   puts a calculator under that box — so a question that asks the reader to
   RECALL a figure rather than work one out gets a keypad it has no use for,
   which is worse than useless: it says a sum is expected.

   The reliable giveaway is that the stem carries no figure at all. Across the
   module that identifies exactly the recall questions and nothing else, but it
   only works in ONE direction: a recall question that happens to mention a
   figure ("a business exceeds the threshold at the end of July — how many days
   does it have to notify?") reads as computational to any machine. So the data
   carries the flag and this enforces the half that is checkable — a stem with
   no figures cannot be anything but recall, and must say so. The other half is
   an authoring judgement, made when the question is written.

   The converse is checked too: a question marked `recall` must not be one whose
   answer is worked out from figures it was given, which would be a flag put on
   the wrong question and a reader denied a calculator they need. */
{
  let recallChecked = 0, recallMarked = 0;
  everyQuestion.forEach(({ where, q }) => {
    if ((q.type || 'mcq') !== 'numeric') return;
    recallChecked++;
    const hasFigure = /\d/.test(q.q || '');
    if (q.recall) recallMarked++;
    if (!hasFigure && !q.recall) {
      errors.push(`${where}: numeric question with no figure in its stem — there is nothing to ` +
        `calculate, so it must be marked \`recall: true\` or it will be given a calculator.`);
    }
    if (q.recall && hasFigure) {
      /* Not an error: this is exactly the case the flag exists for. Surfaced so
         a flag put on a computational question by mistake is visible. */
      warnings.push(`${where}: marked \`recall\` but its stem carries a figure — confirm the answer ` +
        `is recalled rather than worked out from it.`);
    }
  });
  /* THE SCOPE IS ASSERTED, NOT ASSUMED. Widening a rule to a surface it could
     not see is a change that nothing fails when it is undone: every question
     still passes, and the coverage quietly halves. Counting the numeric items
     that EXIST and requiring the rule to have seen all of them is what makes
     the widening permanent — drop try-its back out and this line fails. */
  const numericExpected = allQuestions.concat(tryIts)
    .filter(x => ((x.q && x.q.type) || 'mcq') === 'numeric').length;
  if (recallChecked !== numericExpected) {
    errors.push(`the recall rule saw ${recallChecked} numeric questions but the module has ` +
      `${numericExpected} — a surface carrying questions has dropped out of this file's scope.`);
  }
  if (!tryIts.length) {
    errors.push('no worked-example try-its were found — the extractor has stopped matching, ' +
      'and every per-question rule below is silently checking nothing on that surface.');
  }
  notes.push(`${recallChecked} numeric questions checked for a figure to work from ` +
    `(${tryIts.length} try-its included); ${recallMarked} marked as recall.`);
}

/* ── An adjustment named in the stem but never in the explanation ────────────
   The Box 4 defect this rule exists for was not a wrong figure. `T-2-01` put a
   six-row purchases day book in front of the reader, and its Box 4 explanation
   accounted for three of those rows. The key was right, so every arithmetic
   check passed; what was missing was the REASON the other rows contributed
   nothing, and a reader who cannot see that reason learns the wrong general
   rule — that a line missing from Box 4 is a line to leave out.

   Prose is not checkable in general, but this one shape is. A composite VAT
   calculation names its adjustments in words: blocked input tax, bad debt
   relief, a credit note, a fuel scale charge. Each moves ONE side of the return
   and each has a rule behind it. If the stem raises one and the explanation
   never says the words again, the explanation has done the arithmetic and
   skipped the teaching — which is exactly how `P-2-24` came to show four
   subtractions and justify none of them.

   Scoped to stems carrying three or more figures, because a question whose
   whole subject IS the adjustment ("how much bad debt relief may it claim?")
   explains it at length and needs no reminder to mention it. */
{
  const ADJUSTMENTS = [
    { re: /blocked|entertain/i, name: 'blocked input tax' },
    { re: /bad debt relief/i, name: 'bad debt relief' },
    { re: /credit note/i, name: 'a credit note' },
    { re: /scale charge/i, name: 'a fuel scale charge' },
  ];
  /* Named independently of the array above. Deleting an entry from ADJUSTMENTS
     must FAIL rather than quietly narrow the rule, so the roster the module
     promises to police is written down separately and compared. */
  const MUST_POLICE = ['blocked input tax', 'bad debt relief', 'a credit note', 'a fuel scale charge'];

  /* The rule as a pure function, so it can be run against known-bad input below
     as well as against the module. A rule that is only ever run on clean data
     cannot tell you it still works. */
  const adjustmentGaps = rows => {
    const found = [];
    const exercised = new Map(MUST_POLICE.map(n => [n, 0]));
    let examined = 0;
    rows.forEach(({ where, stem, exp }) => {
      if ((stem.match(/£[\d,]+/g) || []).length < 3) return;
      examined++;
      ADJUSTMENTS.forEach(({ re, name }) => {
        if (!re.test(stem)) return;
        if (exercised.has(name)) exercised.set(name, exercised.get(name) + 1);
        if (!re.test(exp || '')) found.push({ where, name });
      });
    });
    /* `examined` and `exercised` come back from the SAME traversal that produces
       the findings. A parallel loop counting alongside would let the findings be
       thrown away while the counts still looked healthy — the reach assertions
       below would then be measuring a traversal nobody acted on. */
    return { found, examined, exercised };
  };

  /* SELF-TEST. Two surfaces the rule must flag and two it must not. If the
     reporting is removed, an adjustment is dropped, or the figure threshold is
     raised out of range, these stop matching and the gate fails on its own
     terms — before it ever looks at the module. */
  {
    const FIXTURE = [
      { where: 'fixture/gap', exp: 'Output tax £31,200 − £1,100 = £30,100. Payable = £13,380.',
        stem: 'Output tax £31,200; credit notes issued carrying £1,100 of VAT; input tax £16,800.' },
      { where: 'fixture/blocked-gap', exp: 'Input tax is £21,400 − £700 = £20,700.',
        stem: 'Input tax £21,400 of which £700 is blocked; output tax £38,900; relief £540.' },
      { where: 'fixture/explained', exp: 'A credit note issued reduces output tax: £31,200 − £1,100 = £30,100.',
        stem: 'Output tax £31,200; credit notes issued carrying £1,100 of VAT; input tax £16,800.' },
      { where: 'fixture/too-few-figures', exp: 'Just the arithmetic.',
        stem: 'A debt of £4,320 is written off. How much bad debt relief may be claimed?' },
    ];
    const got = adjustmentGaps(FIXTURE).found.map(f => `${f.where}:${f.name}`).sort().join('|');
    const want = 'fixture/blocked-gap:blocked input tax|fixture/gap:a credit note';
    if (got !== want) {
      errors.push(`the adjustment rule failed its own self-test: expected to flag [${want}] ` +
        `but flagged [${got}]. The rule is not detecting what it claims to, so its verdict ` +
        `on the module below means nothing.`);
    }
    const missing = MUST_POLICE.filter(n => !ADJUSTMENTS.some(a => a.name === n));
    if (missing.length) {
      errors.push(`ADJUSTMENTS no longer covers ${missing.join(', ')} — an adjustment this ` +
        `module promises to police has been dropped from the rule.`);
    }
  }

  let adjChecked = 0;
  /* Parts are checked in their own right. T-2-01's Box 4 is a PART, and a rule
     that only looked at whole questions would have missed the very defect it
     was written for. */
  const surfaces = [];
  let partsSeen = 0;
  everyQuestion.forEach(({ where, q }) => {
    if (Array.isArray(q.parts)) {
      q.parts.forEach((p, i) => {
        partsSeen++;
        surfaces.push({
          where: `${where} part ${i + 1}`,
          stem: [q.q, q.brief, p.label].filter(Boolean).join(' '),
          exp: p.exp,
        });
      });
    } else {
      surfaces.push({ where, stem: [q.q, q.brief].filter(Boolean).join(' '), exp: q.exp });
    }
  });
  const result = adjustmentGaps(surfaces);
  const exercised = result.exercised;
  adjChecked = result.examined;
  result.found.forEach(({ where, name }) => {
    errors.push(`${where}: the stem raises ${name} but the explanation never mentions it — ` +
      `a composite calculation must say which side each adjustment moves and why, ` +
      `or it teaches the arithmetic and none of the rule.`);
  });
  /* Scope asserted, as everywhere else in this file: a task whose parts stop
     being unwrapped would silently drop this rule's best cases. */
  const partsExpected = everyQuestion.filter(({ q }) => Array.isArray(q.parts))
    .reduce((n, { q }) => n + q.parts.length, 0);
  /* Compare what the rule REACHED against what exists. Counting the data alone
     would pass even if the unwrapping above were deleted, which is the failure
     mode this assertion is here to prevent. */
  /* A rule with no live failures can be switched off and nothing will notice —
     raise the figure threshold, or drop an entry from ADJUSTMENTS, and a clean
     bank still passes. So the rule's REACH is asserted, not just its verdict:
     it must still examine composite calculations, and every adjustment it
     claims to police must still be exercised by real questions. */
  const MIN_COMPOSITES = 80;  // 97 today; a floor, not a target
  if (adjChecked < MIN_COMPOSITES) {
    errors.push(`the adjustment rule examined only ${adjChecked} composite calculations, ` +
      `below the floor of ${MIN_COMPOSITES} — either the figure threshold has been raised ` +
      `past the questions it is meant to police, or a surface has left its scope.`);
  }
  exercised.forEach((n, name) => {
    if (n < 1) {
      errors.push(`no composite calculation in the module raises ${name}, so that entry in ` +
        `ADJUSTMENTS polices nothing and could be deleted unnoticed — remove it deliberately ` +
        `or restore the questions that exercised it.`);
    }
  });
  if (partsSeen !== partsExpected || partsSeen < 1) {
    errors.push(`the adjustment rule reached ${partsSeen} task parts but the module has ` +
      `${partsExpected} — the surface that carried the Box 4 defect this rule exists for ` +
      `has dropped out of its scope.`);
  }
  notes.push(`${adjChecked} composite calculations checked for an adjustment named in the ` +
    `stem but not in the explanation (${partsSeen} task parts included).`);
}

console.log(`${BOLD}AAT Level 3 content quality${RESET}\n`);
notes.forEach(n => console.log(`  ${DIM}${n}${RESET}`));
console.log('');

if (warnings.length) {
  console.log(`${YELLOW}${BOLD}── WARNINGS (${warnings.length}) ──${RESET}`);
  warnings.forEach(w => console.log(`  ${YELLOW}⚠${RESET}  ${w}`));
  console.log('');
}
if (errors.length) {
  console.log(`${RED}${BOLD}── FAILURES (${errors.length}) ──${RESET}`);
  errors.forEach(e => console.log(`  ${RED}✗${RESET}  ${e}`));
  console.log('');
  process.exit(1);
}
console.log(`${GREEN}${BOLD}── Content quality checks passed ✓${RESET}\n`);
