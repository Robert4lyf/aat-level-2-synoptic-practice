#!/usr/bin/env node
/**
 * Quality control for the AAT Level 1 learning content.
 *
 * scripts/check-aat1-coverage.js asks whether the syllabus is covered.
 * This asks whether the material is any good — the class of defect coverage
 * checking cannot see:
 *
 *   - answer keys guessable from option length or shape
 *   - distractors that duplicate each other or the key
 *   - true/false grids answerable by test-wiseness rather than knowledge
 *   - explanations too short to explain anything
 *   - question stems repeated between the lessons and the practice bank, which
 *     would make "practice" a memory test of a page already read
 *   - card fields that do not match what aat1-ui.js renders, which ship as a
 *     literal "[object Object]" rather than as an error
 *   - arithmetic stated in prose that does not compute
 *   - the VAT rate hardcoded instead of referenced from aat1-syllabus.js
 *   - cards too thin to teach
 *
 * The two question types Level 1 adds — match and ordering — get checks of
 * their own. Both are pairing exercises where the data is index-aligned
 * (left[i] pairs with right[i]; items are in the correct order), so a duplicate
 * entry on either side makes the question unanswerable rather than merely ugly,
 * and nothing at runtime would say so.
 *
 * Run via `npm test`.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const RED = '\x1b[31m', GREEN = '\x1b[32m', YELLOW = '\x1b[33m';
const BOLD = '\x1b[1m', DIM = '\x1b[2m', RESET = '\x1b[0m';

const ROOT = path.join(__dirname, '..');
const { AAT1_LEARN_PATH } = require(path.join(ROOT, 'aat1-learn-data.js'));
const { AAT1_PRACTICE } = require(path.join(ROOT, 'aat1-practice-data.js'));
const { FACTS } = require(path.join(ROOT, 'aat1-syllabus.js'));

const errors = [];
const warnings = [];
const notes = [];

const lessons = [];
(AAT1_LEARN_PATH || []).forEach(g => (g.lessons || []).forEach(l => lessons.push(l)));

/* Every question in the module, wherever it lives. The practice bank gets the
   same scrutiny as the lesson checks, and the shared stem map is what stops the
   bank quietly re-asking a lesson. */
const practice = (AAT1_PRACTICE && AAT1_PRACTICE.QUESTIONS) || [];
const allQuestions = [];
lessons.forEach(l => (l.check || []).forEach((q, i) => allQuestions.push({ where: `${l.id} Q${i + 1}`, q })));
practice.forEach(q => allQuestions.push({ where: `practice ${q.id}`, q, isPractice: true }));

/* ── Thresholds ──────────────────────────────────────────────────────────────
   Set from what the material currently achieves, so they act as a ratchet
   against regression rather than as an aspiration. */
const MIN_EXP_CHARS = 90;      // an explanation shorter than this explains nothing
const MIN_CARD_WORDS = 100;    // total teaching words on a card, prose and elements together
const MIN_PROSE_WORDS = 80;    // for a card whose prose IS the card
const CUE_CEILING_PCT = 45;    // % of MCQs where the key is the single longest option
const MIN_CUE_GAP_CHARS = 25;  // below this an outlying ratio is noise, not a cue

const REASON_CLAUSE = /\b(because|since|as it|as they|so that|given that)\b/i;

/* Elements that carry teaching weight in their own right. On a card with one of
   these the prose is a lead-in, so measuring prose alone understates the card. */
const RICH_ELEMENTS = ['worked', 'table', 'split', 'example', 'flow', 'formula', 'callout', 'examtrap', 'terms', 'doc', 'notyet'];

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
const norm = s => String(s).toLowerCase().replace(/\s+/g, ' ').trim();

/* ── 1. Question quality ─────────────────────────────────────────────────── */
const stems = new Map();
let mcqCount = 0, cueCount = 0;
const typeCounts = {};

allQuestions.forEach(({ where, q }) => {
  const type = q.type || 'mcq';
  typeCounts[type] = (typeCounts[type] || 0) + 1;

  if (!q.q) errors.push(`${where}: no question text.`);
  if (!q.exp) errors.push(`${where}: no explanation.`);
  else if (q.exp.length < MIN_EXP_CHARS) {
    warnings.push(`${where}: explanation is only ${q.exp.length} chars — too short to teach anything.`);
  }

  const key = norm(q.q || '');
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
    const n = q.opts.map(norm);
    if (new Set(n).size !== n.length) errors.push(`${where}: two options are the same text.`);

    const lens = q.opts.map(o => String(o).length);
    const max = Math.max(...lens);
    if (lens[q.ans] === max && lens.filter(x => x === max).length === 1) cueCount++;

    /* Structural parallelism, symmetric in both directions: a key that is much
       longer than its distractors is identifiable, and so is one that is much
       shorter. It is about SHAPE — every option should look like the same kind
       of thing. Ratio alone misleads when all options are short, so a
       meaningful absolute gap is required too. */
    const others = lens.filter((_, i) => i !== q.ans);
    const avg = others.reduce((a, b) => a + b, 0) / others.length;
    const ratio = lens[q.ans] / avg;
    const gap = Math.abs(lens[q.ans] - avg);
    if ((ratio > 1.5 || ratio < 0.67) && gap >= MIN_CUE_GAP_CHARS) {
      errors.push(`${where}: the correct option is ${ratio.toFixed(2)}× the average distractor (${Math.round(gap)} characters apart) — make the options structurally parallel.`);
    }

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
    /* The answer must appear in its own explanation. Without this a stated
       answer and a carefully-worked explanation can disagree, and the
       arithmetic checker below has nothing to say because each is internally
       sound. */
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
    if (q.labels && (!Array.isArray(q.labels) || q.labels.length !== 2)) {
      errors.push(`${where}: labels must be exactly two — the one shown for true and the one for false.`);
    }

  } else if (type === 'gapfill') {
    if (!q.template) { errors.push(`${where}: no template.`); return; }
    if (!Array.isArray(q.gaps) || !q.gaps.length) { errors.push(`${where}: no gaps.`); return; }
    q.gaps.forEach((g, gi) => {
      if (!q.template.includes('{' + gi + '}')) errors.push(`${where}: template is missing placeholder {${gi}}.`);
      if (!Array.isArray(g.options) || g.options.length < 2) errors.push(`${where} gap ${gi}: needs at least 2 options.`);
      else {
        if (!Number.isInteger(g.answer) || g.answer < 0 || g.answer >= g.options.length) {
          errors.push(`${where} gap ${gi}: answer index out of range.`);
        }
        const gn = g.options.map(norm);
        if (new Set(gn).size !== gn.length) errors.push(`${where} gap ${gi}: two options are the same text.`);
      }
    });

  } else if (type === 'match') {
    /* left[i] pairs with right[i]. Two identical entries on either side make
       the question unanswerable — the reader can pair correctly and still be
       marked wrong, because only one index is accepted. Nothing at runtime
       reports this, so it has to fail the build. */
    if (!Array.isArray(q.left) || !Array.isArray(q.right)) { errors.push(`${where}: match needs left and right arrays.`); return; }
    if (q.left.length !== q.right.length) {
      errors.push(`${where}: match has ${q.left.length} left items and ${q.right.length} right — they pair by index, so the counts must be equal.`);
      return;
    }
    if (q.left.length < 3) warnings.push(`${where}: only ${q.left.length} pairs — a two-pair match is close to a coin toss.`);
    ['left', 'right'].forEach(side => {
      const n2 = q[side].map(norm);
      if (new Set(n2).size !== n2.length) {
        errors.push(`${where}: the ${side} column repeats an entry — pairs are index-aligned, so a duplicate makes a correct pairing markable as wrong.`);
      }
      q[side].forEach((x, i) => { if (typeof x !== 'string' || !x.trim()) errors.push(`${where}: ${side}[${i}] is empty or not text.`); });
    });

  } else if (type === 'ordering') {
    /* The items array IS the correct order. A duplicate makes two different
       arrangements equally right while only one is accepted. */
    if (!Array.isArray(q.items) || q.items.length < 3) { errors.push(`${where}: ordering needs at least 3 items.`); return; }
    const n3 = q.items.map(norm);
    if (new Set(n3).size !== n3.length) {
      errors.push(`${where}: the items list repeats an entry — the array is the answer key, so a duplicate makes two arrangements equally correct.`);
    }
    q.items.forEach((x, i) => { if (typeof x !== 'string' || !x.trim()) errors.push(`${where}: items[${i}] is empty or not text.`); });

  } else {
    errors.push(`${where}: unknown question type "${type}".`);
  }
});

/* ── 1b. True/false grids must not be answerable by test-wiseness ─────────
   Two cues live in the SET rather than in any one grid, so neither can be seen
   while reviewing questions one at a time.

   First, absolutes. If statements containing "all", "never" or "only" are
   keyed false far more often than the base rate, "if it sounds absolute,
   answer false" beats knowing the subject. Real rules do sometimes admit no
   exception, so the fix is not to ban absolutes but to stop them predicting.

   Second, overall balance: keys leaning heavily true reward guessing true. */
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
      errors.push(`Statements containing an absolute are keyed false ${absFalsePct.toFixed(0)}% of the time against a ${baseFalsePct.toFixed(0)}% base rate — "if it sounds absolute, answer false" is a winning strategy.`);
    }
  }
}

stems.forEach((where, stem) => {
  if (where.length > 1) {
    /* A repeat spanning both files is the defect the practice bank exists to
       avoid, so it fails rather than warns. */
    const spansPractice = where.some(w => w.startsWith('practice')) && where.some(w => !w.startsWith('practice'));
    const msg = `Question stem repeated in ${where.join(', ')}: "${stem.slice(0, 60)}…"`;
    if (spansPractice) errors.push(msg + ' — the practice bank must not re-ask a lesson check.');
    else warnings.push(msg);
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
lessons.forEach(l => {
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

/* ── 3. Card fields must match the shape the renderer reads ──────────────── */
/* Anything reaching md()/esc() directly must be a primitive, or it renders as
   the literal "[object Object]" — a defect that loads cleanly, passes coverage
   and counts towards the prose word count. `str` marks those fields. This
   encodes the contract in aat1-ui.js, including the four elements Level 1 adds:
   terms, doc, notyet and example. */
const CARD_SHAPE = {
  h: 'str',
  p: 'str[]',
  formula: 'str',
  flow: 'str[]',
  examtrap: 'str',
  notyet: 'str',
  terms: [{ t: 'str', d: 'str' }],
  callout: { kind: 'str?', text: 'str' },
  table: { headers: 'str[]?', rows: 'str[][]', caption: 'str?' },
  example: { title: 'str?', rows: 'str[][]' },
  split: { left: { title: 'str?', items: 'str[]' }, right: { title: 'str?', items: 'str[]' } },
  doc: {
    kind: 'str?', title: 'str', tag: 'str?', foot: 'str?',
    fromLabel: 'str?', toLabel: 'str?', from: 'str[]?', to: 'str[]?',
    fields: 'str[][]?', totals: 'str[][]?',
    table: { headers: 'str[]?', rows: 'str[][]' },
  },
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
      val.forEach((x, i) => { if (!isPrim(x)) errors.push(`${where}[${i}]: must be text — it would render as "[object Object]".`); });
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
    const required = typeof sub === 'string' ? !sub.endsWith('?') : false;
    if (val[k] === undefined) {
      if (required) errors.push(`${where}.${k}: missing.`);
      return;
    }
    checkShape(val[k], sub, `${where}.${k}`);
  });
}

lessons.forEach(l => {
  (l.cards || []).forEach((c, ci) => {
    Object.keys(c).forEach(k => {
      if (!CARD_SHAPE[k]) { errors.push(`${l.id} card ${ci + 1}: unknown field "${k}" — the renderer will ignore it silently.`); return; }
      checkShape(c[k], CARD_SHAPE[k], `${l.id} card ${ci + 1}.${k}`);
    });
  });
});

/* Question-level extras the renderer also reads. A `doc` or `table` attached to
   a question goes through the same renderer as a card's, so it needs the same
   guarantee. */
const Q_EXTRA_SHAPE = { doc: CARD_SHAPE.doc, table: CARD_SHAPE.table, intro: 'str' };
allQuestions.forEach(({ where, q }) => {
  Object.keys(Q_EXTRA_SHAPE).forEach(k => {
    if (q[k] !== undefined) checkShape(q[k], Q_EXTRA_SHAPE[k], `${where}.${k}`);
  });
});

/* ── 4. Prose must not promise an element the card does not have ─────────── */
/* Deliberately narrow: it fires only on phrases promising something ON THIS
   CARD ("the table below", "shown below"), never on a bare mention of "the
   table", because material legitimately refers to tables elsewhere. */
const PROMISES = {
  table: /\b(the|this)\s+table\s+(below|opposite|here)\b|\b(below|following)\s+table\b/i,
  worked: /\bworked example below\b/i,
  split: /\b(the\s+)?two\s+columns\s+below\b/i,
  flow: /\b(the\s+)?(flow|sequence)\s+below\b/i,
  example: /\bexample below\b/i,
  formula: /\bformula below\b/i,
  doc: /\b(the\s+)?(invoice|credit note|statement|document)\s+below\b/i,
  terms: /\b(the\s+)?(key\s+)?terms\s+below\b/i,
};
lessons.forEach(l => {
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

/* ── 5. Arithmetic stated in prose must actually compute ─────────────────── */
/* Worked examples and explanations state their sums in the text — "£174.00 +
   £892.00 = £1,066.00". Those are load-bearing: a student who cannot reproduce
   the line assumes they are wrong, not the material. This evaluates every chain
   it can parse and checks the stated result.

   Deliberately conservative — only + − × ÷ and % over plain numbers, skipping
   anything it cannot parse cleanly, because a false failure here would train
   people to ignore the gate. */
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
const sumSources = [];
lessons.forEach(l => sumSources.push([l.id, flat({ cards: l.cards, check: l.check })]));
sumSources.push(['practice bank', flat(practice)]);
sumSources.forEach(([label, text]) => {
  (text.match(CHAIN) || []).forEach(expr => {
    const r = evalChain(expr);
    if (!r) return;
    sumsChecked++;
    /* Tolerate a penny of rounding, and a stated result rounded to whole pounds. */
    const off = Math.abs(r.got - r.want);
    if (off > 0.011 && off > Math.abs(r.got) * 1e-9 && Math.round(r.got) !== r.want) {
      errors.push(`${label}: the stated sum "${expr.trim()}" does not compute — it comes to ${r.got.toFixed(2)}.`);
    }
  });
});

/* ── 6. Cards must be thick enough to teach ──────────────────────────────── */
let thin = 0;
lessons.forEach(l => {
  (l.cards || []).forEach((c, ci) => {
    const where = `${l.id} card ${ci + 1} ("${String(c.h || '').slice(0, 40)}")`;
    const prose = words(Array.isArray(c.p) ? c.p.join(' ') : c.p);
    const totalWords = words(flat(c));
    const rich = RICH_ELEMENTS.some(k => c[k]);
    if (totalWords < MIN_CARD_WORDS) {
      warnings.push(`${where}: only ${totalWords} words in total — too thin to teach.`);
      thin++;
    } else if (!rich && prose < MIN_PROSE_WORDS) {
      warnings.push(`${where}: ${prose} words of prose and no table, example or worked element — the card carries little.`);
      thin++;
    }
  });
});

/* ── 7. The VAT rate must come from aat1-syllabus.js ─────────────────────── */
/* Level 1 has almost no governed figures — one rate, and the specification
   fixes the direction it is applied in. Hardcoding it in prose is still a
   latent staleness bug, and it is cheap to prevent while there is only one.
   This reads the SOURCE, not the loaded strings: a correct reference evaluates
   to exactly the text being hunted for, so only the source distinguishes a live
   reference from a literal. */
const RATE = String(FACTS.vat.standardRate.value);
/* Comments are blanked before scanning, keeping their line breaks so reported
   line numbers stay right. Without this the declaration's own trailing comment
   — `var VAT = F.vat.standardRate.label;   // '20%'` — was reported as a
   hardcoded figure, which is the correct reference being flagged as the defect
   it prevents. A check that cries wolf trains people to ignore it. */
function stripComments(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, m => m.replace(/[^\n]/g, ' '))
    .replace(/(^|[^:])\/\/[^\n]*/g, (m, p) => p + ' '.repeat(m.length - p.length));
}
[['aat1-learn-data.js'], ['aat1-practice-data.js']].forEach(([file]) => {
  const src = stripComments(fs.readFileSync(path.join(ROOT, file), 'utf8'));
  const re = new RegExp("'[^'\\n]*?\\b" + RATE + "%", 'g');
  let m;
  while ((m = re.exec(src)) !== null) {
    const line = src.slice(0, m.index).split('\n').length;
    warnings.push(`${file}:${line}: the standard VAT rate (${RATE}%) is written literally. Reference the VAT constant so a rate change is a one-file edit.`);
  }
});

/* The reverse-VAT calculation is explicitly excluded by scope items 3.2.3 and
   3.3.2, and teaching it would send a student reaching for ÷ 6 in an exam where
   every question runs the other way. The material may NAME the exclusion — the
   `notyet` element does — but must never present the method as a rule to use. */
const learnSrc = fs.readFileSync(path.join(ROOT, 'aat1-learn-data.js'), 'utf8');
const REVERSE_VAT = /(gross|total|VAT-inclusive)[^'\n]{0,40}(÷|\/)\s*6\b/gi;
let rv;
while ((rv = REVERSE_VAT.exec(learnSrc)) !== null) {
  const line = learnSrc.slice(0, rv.index).split('\n').length;
  const context = learnSrc.slice(Math.max(0, rv.index - 200), rv.index);
  /* Allow it where the surrounding text is plainly telling the reader NOT to
     use it, which is the only legitimate appearance at this level. */
  if (!/not required|excluded|never|does not|do not|wrong answer/i.test(context)) {
    errors.push(`aat1-learn-data.js:${line}: presents the reverse-VAT calculation ("${rv[0].trim()}"), which scope items 3.2.3 and 3.3.2 exclude at this level.`);
  }
}

/* ── Report ──────────────────────────────────────────────────────────────── */
const cardCount = lessons.reduce((s, l) => s + (l.cards || []).length, 0);
const proseWords = lessons.reduce((s, l) => s + words(flat(l.cards)), 0);
notes.unshift(`${lessons.length} lessons · ${cardCount} cards · ${proseWords.toLocaleString('en-GB')} words of teaching content.`);
notes.push(`${allQuestions.length} questions (${(allQuestions.length - practice.length)} in lessons, ${practice.length} in the practice bank).`);
notes.push(`Question types: ${Object.keys(typeCounts).sort().map(k => `${k} ${typeCounts[k]}`).join(' · ')}.`);
notes.push(`${workedCount} worked examples, ${tryCount} with a "now you try".`);
notes.push(`${sumsChecked} arithmetic chains in prose evaluated.`);
if (thin) notes.push(`${thin} card(s) flagged as thin.`);

console.log(`${BOLD}AAT Level 1 content quality${RESET}\n`);
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
console.log(`${GREEN}${BOLD}── Level 1 content quality OK ✓${RESET}\n`);
