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

const errors = [];
const warnings = [];
const notes = [];

const lessons = [];
(AAT3_LEARN_PATH || []).forEach(u => (u.lessons || []).forEach(l => lessons.push(l)));

/* ── Thresholds ──────────────────────────────────────────────────────────────
   Set from what the material currently achieves, so they act as a ratchet
   against regression rather than an aspiration. */
const MIN_EXP_CHARS = 90;      // an explanation shorter than this explains nothing
const MIN_CARD_WORDS = 100;    // total teaching words on a card, prose and element together
const MIN_PROSE_WORDS = 80;    // for a card whose prose IS the card, with nothing else on it
const CUE_CEILING_PCT = 45;    // % of MCQs where the key is the single longest option

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

lessons.forEach(l => {
  (l.check || []).forEach((q, qi) => {
    const where = `${l.id} Q${qi + 1}`;
    const type = q.type || 'mcq';

    if (!q.q) errors.push(`${where}: no question text.`);
    if (!q.exp) errors.push(`${where}: no explanation.`);
    else if (q.exp.length < MIN_EXP_CHARS) {
      warnings.push(`${where}: explanation is only ${q.exp.length} chars — too short to teach anything.`);
    }

    const key = String(q.q || '').replace(/\s+/g, ' ').trim();
    if (key) {
      if (!stems.has(key)) stems.set(key, []);
      stems.get(key).push(l.id);
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

      /* A key far longer than the average distractor is guessable without
         reading the question at all. */
      const others = lens.filter((_, i) => i !== q.ans);
      const avg = others.reduce((a, b) => a + b, 0) / others.length;
      if (lens[q.ans] > avg * 1.6 && lens[q.ans] === max) {
        warnings.push(`${where}: the correct option is ${(lens[q.ans] / avg).toFixed(1)}× the average distractor — lengthen the distractors.`);
      }
    } else if (type === 'numeric') {
      if (!Number.isFinite(q.answer)) errors.push(`${where}: numeric answer is not a finite number.`);
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
  });
});

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
