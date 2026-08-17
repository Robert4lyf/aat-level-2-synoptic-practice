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
const { AAT3_LEARN_PATH } = require(path.join(ROOT, 'aat3-learn-data.js'));
const { TAX } = require(path.join(ROOT, 'aat3-tax-data.js'));
const { AAT3_PRACTICE } = require(path.join(ROOT, 'aat3-practice-data.js'));

const errors = [];
const warnings = [];
const notes = [];

const lessons = [];
(AAT3_LEARN_PATH || []).forEach(u => (u.lessons || []).forEach(l => lessons.push(l)));

/* Every question in the module, wherever it lives. The practice bank gets the
   same scrutiny as the lesson checks — and the shared stem map is what stops
   the bank quietly re-asking a lesson, which would make it a memory test. */
const practice = (AAT3_PRACTICE && AAT3_PRACTICE.QUESTIONS) || [];
const allQuestions = [];
lessons.forEach(l => (l.check || []).forEach((q, i) => allQuestions.push({ where: `${l.id} Q${i + 1}`, q })));
practice.forEach(q => allQuestions.push({ where: `practice ${q.id}`, q, isPractice: true }));

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
    } else {
      errors.push(`${where}: unknown question type "${type}".`);
    }
  }
});

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

lessons.forEach(l => {
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
lessons.forEach(l => {
  flat({ cards: l.cards, check: l.check }).split(/(?<=[.;])\s/).forEach(() => {});
  const text = flat({ cards: l.cards, check: l.check });
  const found = text.match(CHAIN) || [];
  found.forEach(expr => {
    const r = evalChain(expr);
    if (!r) return;
    sumsChecked++;
    /* Tolerate a penny of rounding, and tolerate a stated result that has been
       rounded to whole pounds from a fractional one. */
    const off = Math.abs(r.got - r.want);
    if (off > 0.011 && off > Math.abs(r.got) * 1e-9 && Math.round(r.got) !== r.want) {
      errors.push(`${l.id}: the stated sum "${expr.trim()}" does not compute — it comes to ${r.got.toFixed(2)}.`);
    }
  });
});

/* ── 3. Tax figures must come from aat3-tax-data.js ──────────────────────── */
/* Any of these appearing literally in prose is a figure that will silently go
   stale when the Finance Act rolls. Rates and small worked-example amounts are
   fine; it is the thresholds and limits that must be referenced. */
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
const source = require('fs').readFileSync(path.join(ROOT, 'aat3-learn-data.js'), 'utf8');
GOVERNED.forEach(([value, label]) => {
  const withCommas = Number(value).toLocaleString('en-GB');
  /* `\b` is wrong here: £200\b matches inside "£200,000", because the comma is
     a word boundary. Reject a digit continuation, and a comma or point that is
     itself followed by a digit — but NOT a sentence-ending "£90,000." */
  const re = new RegExp('£\\s?(' + value + '|' + withCommas + ')(?!\\d)(?![,.]\\d)', 'g');
  let m;
  while ((m = re.exec(source)) !== null) {
    const line = source.slice(0, m.index).split('\n').length;
    warnings.push(`aat3-learn-data.js:${line}: the ${label} (£${withCommas}) is hardcoded. Reference aat3-tax-data.js so a Finance Act change is a one-file edit.`);
  }
});

/* ── 4. Teaching depth ───────────────────────────────────────────────────── */
let cardCount = 0, proseTotal = 0, teachTotal = 0;
lessons.forEach(l => {
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
  if (!(l.check || []).length) errors.push(`${l.id}: no check questions.`);
});

/* ── 4b. Prose mannerisms ────────────────────────────────────────────────────
   This material is written by a model, and models have tics. Two kinds are
   worth guarding against, and they need different severities.

   The NEVER list is vocabulary that has no business in a UK accounting
   textbook and reads as machine-generated on sight. Every one of these is
   currently at zero across all three levels, so a hard failure here costs
   nothing and catches the drift the moment it starts.

   SIGNPOSTING is different. "It is worth noting that…" is not wrong, it is
   just weak — it announces that a point matters instead of making the point.
   A few are fine, so this is a rate ceiling rather than a ban. The module ran
   at 1.2 per thousand words before a deliberate cull and 0.2 after; the
   ceiling sits at 1.0, which permits ordinary use and catches a relapse. */
const NEVER = [
  [/\bdelv(e|es|ing)\b/i,                    'delve'],
  [/\bleverag(e|es|ing)\b/i,                 'leverage'],
  [/\bseamless(ly)?\b/i,                     'seamless'],
  [/\b(landscape|realm|tapestry|ecosystem)\b/i, 'landscape/realm/tapestry/ecosystem'],
  [/\bin today'?s (world|business|climate)\b/i, "in today's world"],
  [/\bever-(changing|evolving)\b/i,          'ever-changing'],
  [/\bat (its|the) (core|heart)\b/i,          'at its core'],
  [/\bthat said\b/i,                         'that said'],
  [/(^|[.!?]\s+)(Furthermore|Moreover|Additionally),/, 'Furthermore/Moreover/Additionally'],
  [/\bunderscore[sd]?\b/i,                   'underscores'],
  [/\bholistic(ally)?\b/i,                   'holistic'],
  [/\bmulti-faceted\b/i,                     'multi-faceted'],
  [/\bnavigat(e|es|ing) the\b/i,             'navigate the (metaphor)'],
  [/\bit'?s important to note\b/i,           "it's important to note"],
];
const SIGNPOST = /\b(it is|it's) worth\b|\bworth (noting|saying|being|pausing|flagging)\b/gi;
const SIGNPOST_CEILING_PER_1K = 1.0;

let proseWords = 0;
const proseBits = [];
lessons.forEach(l => (l.cards || []).forEach((c, ci) => {
  (c.p || []).forEach(par => {
    const text = String(par);
    proseBits.push(text);
    proseWords += words(text);
    NEVER.forEach(([re, label]) => {
      if (re.test(text)) errors.push(`${l.id} card ${ci + 1} ("${String(c.h || '').slice(0, 40)}"): prose contains "${label}" — a machine-writing tell, not this material's voice.`);
    });
  });
}));
const signposts = (proseBits.join('\n').match(SIGNPOST) || []).length;
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
lessons.forEach(l => {
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
