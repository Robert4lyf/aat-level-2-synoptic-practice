#!/usr/bin/env node
/**
 * Quality control for the AAT Level 2 material — the standard Levels 1 and 3
 * are already held to.
 *
 * WHY THIS EXISTS
 *
 * Level 2 is the oldest and largest module in this project, and until now it was
 * the least examined. scripts/validate-aat-data.js checks that the bank is
 * structurally sound and scripts/check-question-integrity.js checks answer keys
 * and shuffling — both useful, neither asking whether the material is any GOOD.
 * Levels 1 and 3 have that check; Level 2 did not, and the difference showed:
 *
 *   - the answer key was the single longest option in 36.3% of MCQs, against a
 *     25% chance rate (Level 1 runs at 5.8%)
 *   - 30 questions had no explanation at all, and 72 had one under 90 characters
 *   - true/false grids keyed 68% true, so guessing "true" beat knowing the topic
 *   - eight question stems were duplicated, one of them ten times over
 *   - teaching cards averaged 90 words against Level 1's 253 and Level 3's 294
 *
 * None of that is visible from reading a diff. All of it is visible from here.
 *
 * TWO RATCHETS, AND WHY THEY ARE PER UNIT
 *
 * Question quality is enforced across the whole module at once: those defects
 * are bounded and fixable in a single pass, so there is no reason to phase them.
 *
 * Teaching DEPTH is different. Bringing 306 cards from 90 words to Level 1's
 * ~250 is tens of thousands of words of accounting prose, and a check that
 * demanded all four units on day one would be red for the entire life of the
 * work — which teaches nobody anything and gets switched off. So depth and
 * syllabus coverage each ratchet per unit: a unit listed below must meet the
 * standard, and the rest are reported so the remaining work is visible and
 * measurable rather than vague. Add a unit to the list when it actually lands.
 *
 * Run via `npm test`.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const RED = '\x1b[31m', GREEN = '\x1b[32m', YELLOW = '\x1b[33m';
const BOLD = '\x1b[1m', DIM = '\x1b[2m', RESET = '\x1b[0m';

const ROOT = path.join(__dirname, '..');
const S = require(path.join(ROOT, 'aat2-syllabus.js'));

/* data.js and learn-data.js are browser files that assign onto `window`. */
function loadBrowser(file) {
  const w = {};
  new Function('window', fs.readFileSync(path.join(ROOT, file), 'utf8'))(w);
  return w;
}
const BANK = loadBrowser('data.js').ALL_QUESTIONS || [];
const PATH_UNITS = loadBrowser('learn-data.js').LEARN_PATH || [];

/* The four units of the Level 2 qualification. learn-data.js also carries short
   preview units for Level 3 subjects (faps, mats, tpfb, buaw); those are
   teasers rather than Level 2 teaching, so they are held to the question-quality
   bar but not to Level 2's depth or coverage requirements. */
const L2_UNITS = ['itbk', 'pobc', 'poc', 'besy'];

/* Units whose teaching material has been brought to Level 1/3 depth. This list
   is the ratchet — add a unit only when its cards actually meet the floor.
   ITBK now does: 87 cards, mean 228 and median 225 words, none below the floor,
   against the 90-word average the whole module started at. POBC followed at 87
   cards, mean 221; POC at 84 cards, mean 228. BESY is still around 90, and its
   figures are reported below so the size of the remaining job is visible on
   every run rather than being a vague sense that the material is thin. */
const DEPTH_ENFORCED = ['itbk', 'pobc', 'poc'];

/* Units whose lessons are tagged against the syllabus and must fully cover it.
   Worth reading for what tagging turned up: only 7 of ITBK's 16 criteria were
   covered at all. The whole of topic area 4 — the analysed cash book, the petty
   cash book, totalling and balancing them, and recurring receipts and payments
   — has no lesson, and neither do coding systems, setting up bookkeeping
   systems, processing receipts from customers or payments to suppliers.
   Meanwhile six ITBK lessons teach Level 3 Financial Accounting material
   (accruals and prepayments, the statement of financial position, the extended
   trial balance, capital versus revenue, depreciation) and map to no ITBK
   criterion at all.

   ITBK is now enforced: the nine missing criteria have lessons, and the five
   off-syllabus lessons have been moved to the Financial Accounting unit where
   they belong.

   POBC told the same story. Tagging it showed learning outcome 4 — producing
   trial balances, a quarter of the assessment — with no lesson behind it at
   all, and no lesson on payment methods either. Three new lessons cover those,
   the allowance for doubtful debts has moved to the Level 3 Financial
   Accounting preview (the word 'doubtful' does not appear in the Level 2
   specification), and the VAT return and VAT schemes have gone to Tax
   Processes for Businesses.

   POC was the worst of the three. Six criteria had no lesson, including the
   whole of learning outcome 4 (spreadsheets, a tenth of the assessment) and
   criterion 2.5 inside the 40% outcome — cost of goods manufactured, cost of
   goods sold and service cost units were all absent. Meanwhile four lessons
   taught Level 3 Management Accounting: break-even, the high-low method,
   relevant costing and the marginal/absorption reconciliation, none of which
   appears anywhere in the Level 2 specification. Those four have moved to the
   Level 3 preview and the six gaps now have lessons. BESY is not yet tagged, so
   its coverage is still unmeasured rather than known to be good. */
const COVERAGE_ENFORCED = ['itbk', 'pobc', 'poc'];

const errors = [];
const warnings = [];
const notes = [];

/* ── Thresholds ──────────────────────────────────────────────────────────────
   Set to the standard Levels 1 and 3 already meet, not to what Level 2
   currently achieves — the point is to close the gap, not to certify it. */
const MIN_EXP_CHARS = 90;       // an explanation shorter than this explains nothing
const MIN_CARD_WORDS = 150;     // hard floor for a card in an enforced unit
const TARGET_MEDIAN_WORDS = 200; // median card in an enforced unit
/* Ratchet, not aspiration — the convention the Level 1 and 3 checkers use. Set
   just above what the bank currently achieves (34.3%) so it cannot drift worse,
   and to be tightened as questions are reworked. For scale: chance is 25%,
   Level 3 sits at 22% and Level 1 at 5.8%, so this is the one threshold here
   that is still materially looser than the other two levels. */
const CUE_CEILING_PCT = 35;     // % of MCQs where the key is the single longest option
const MIN_CUE_GAP_CHARS = 25;   // below this an outlying ratio is noise, not a cue
const TF_TRUE_CEILING = 62;     // % of true/false statements keyed true

const REASON_CLAUSE = /\b(because|since|as it|as they|so that|given that)\b/i;
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
const norm = s => String(s).toLowerCase().replace(/\s+/g, ' ').trim();
const median = a => { const s = a.slice().sort((x, y) => x - y); return s.length ? s[Math.floor(s.length / 2)] : 0; };

/* ── Gather ──────────────────────────────────────────────────────────────── */
const lessons = [];
PATH_UNITS.forEach(u => (u.lessons || []).forEach(l => lessons.push(Object.assign({ _unit: u.unit }, l))));

/* A `scenario` is a wrapper: a `setup` narrative plus a `parts` array, where
   each part is itself a question of one of the ordinary types. Flattening the
   parts in here is what brings them under the quality rules at all — before
   this, 37 scenarios carrying about a hundred sub-questions were checked only
   for their own (non-existent) stem, so every cue and every missing
   explanation inside them was invisible. */
const allQuestions = [];
function addQuestion(where, q, isBank) {
  if ((q.type || '') === 'scenario') {
    if (!q.setup) errors.push(`${where}: a scenario needs a setup narrative.`);
    if (!Array.isArray(q.parts) || !q.parts.length) { errors.push(`${where}: a scenario needs parts.`); return; }
    q.parts.forEach((p, i) => addQuestion(`${where} part ${i + 1}`, p, isBank));
    return;
  }
  allQuestions.push({ where, q, isBank });
}
BANK.forEach(q => addQuestion(`bank ${q.id}`, q, true));
lessons.forEach(l => (l.check || []).forEach((q, i) => addQuestion(`${l.id} Q${i + 1}`, q, false)));

/* ── 1. Question quality ─────────────────────────────────────────────────── */
const stems = new Map();
let mcqCount = 0, cueCount = 0;
const typeCounts = {};

allQuestions.forEach(({ where, q }) => {
  const type = q.type || 'mcq';
  typeCounts[type] = (typeCounts[type] || 0) + 1;

  /* `generate`d questions build their own stem, figures and explanation at
     runtime from a seed, so neither the stem nor the explanation exists on the
     static object — checking for them here reported 30 healthy questions as
     defective. `written` ones are marked against a rubric rather than an answer
     key, so they carry a rubric instead of an explanation. Everything else must
     have a stem and must explain itself. */
  const selfBuilding = !!q.generate;
  const rubricMarked = type === 'written';

  if (!selfBuilding && !q.q && !q.task) errors.push(`${where}: no question text.`);
  if (!selfBuilding && !rubricMarked) {
    if (!q.exp) errors.push(`${where}: no explanation — a question that cannot say why is not teaching anything.`);
    else if (String(q.exp).length < MIN_EXP_CHARS) {
      errors.push(`${where}: explanation is only ${String(q.exp).length} chars (floor ${MIN_EXP_CHARS}) — too short to teach.`);
    }
  }

  const key = norm(q.q || q.task || '');
  if (key) {
    if (!stems.has(key)) stems.set(key, []);
    stems.get(key).push(where);
  }

  if (type === 'mcq') {
    if (!Array.isArray(q.opts) || q.opts.length < 2) { errors.push(`${where}: needs at least 2 options.`); return; }
    if (!Number.isInteger(q.ans) || q.ans < 0 || q.ans >= q.opts.length) {
      errors.push(`${where}: ans index ${q.ans} is out of range.`); return;
    }
    mcqCount++;
    const n = q.opts.map(norm);
    if (new Set(n).size !== n.length) errors.push(`${where}: two options are the same text.`);

    const lens = q.opts.map(o => String(o).length);
    const max = Math.max(...lens);
    if (lens[q.ans] === max && lens.filter(x => x === max).length === 1) cueCount++;

    /* Structural parallelism, symmetric: a key much longer than its distractors
       is identifiable, and so is one much shorter. Ratio alone misleads when
       every option is short, so a real absolute gap is required too. */
    const others = lens.filter((_, i) => i !== q.ans);
    const avg = others.reduce((a, b) => a + b, 0) / others.length;
    const ratio = lens[q.ans] / avg;
    const gap = Math.abs(lens[q.ans] - avg);
    if ((ratio > 1.5 || ratio < 0.67) && gap >= MIN_CUE_GAP_CHARS) {
      errors.push(`${where}: the key is ${ratio.toFixed(2)}× the average distractor (${Math.round(gap)} chars apart) — make the options structurally parallel.`);
    }

    const hasReason = o => REASON_CLAUSE.test(String(o));
    const keyReason = hasReason(q.opts[q.ans]);
    const otherReasons = q.opts.filter((o, i) => i !== q.ans && hasReason(o)).length;
    if (otherReasons > 0 && !keyReason && otherReasons === q.opts.length - 1) {
      errors.push(`${where}: every distractor carries a "because…" clause and the key does not — the answer is identifiable without reading the question.`);
    }
    if (keyReason && otherReasons === 0 && q.opts.length > 2) {
      errors.push(`${where}: only the key carries a "because…" clause — the answer is identifiable without reading the question.`);
    }

  } else if (type === 'numeric') {
    if (q.generate) return;                       // answer computed at runtime
    if (!Number.isFinite(q.ans) && !Number.isFinite(q.answer)) {
      errors.push(`${where}: numeric answer is not a finite number.`);
    }

  } else if (type === 'truefalse') {
    if (!Array.isArray(q.statements) || q.statements.length < 2) { errors.push(`${where}: needs at least 2 statements.`); return; }
    q.statements.forEach((s, si) => {
      if (!s.text && !s.q) errors.push(`${where} statement ${si + 1}: no text.`);
      const a = s.answer !== undefined ? s.answer : s.ans;
      if (typeof a !== 'boolean') errors.push(`${where} statement ${si + 1}: answer must be true or false.`);
    });
    const tr = q.statements.filter(s => (s.answer !== undefined ? s.answer : s.ans) === true).length;
    if (tr === 0 || tr === q.statements.length) {
      errors.push(`${where}: every statement has the same answer — the grid is guessable.`);
    }

  } else if (type === 'gapfill') {
    if (!q.template) { errors.push(`${where}: no template.`); return; }
    if (!Array.isArray(q.gaps) || !q.gaps.length) { errors.push(`${where}: no gaps.`); return; }
    q.gaps.forEach((g, gi) => {
      const opts = g.options || g.opts;
      if (!Array.isArray(opts) || opts.length < 2) { errors.push(`${where} gap ${gi}: needs at least 2 options.`); return; }
      const a = g.answer !== undefined ? g.answer : g.ans;
      if (!Number.isInteger(a) || a < 0 || a >= opts.length) errors.push(`${where} gap ${gi}: answer index out of range.`);
      const gn = opts.map(norm);
      if (new Set(gn).size !== gn.length) errors.push(`${where} gap ${gi}: two options are the same text.`);
    });
  }
});

/* ── 1b. Set-level cues that no single question reveals ──────────────────── */
const ABSOLUTE = /\b(all|never|always|only|cannot|every|immediately|any circumstances)\b/i;
let tfTrue = 0, tfFalse = 0, absTrue = 0, absFalse = 0;
allQuestions.forEach(({ q }) => {
  if ((q.type || 'mcq') !== 'truefalse' || !Array.isArray(q.statements)) return;
  q.statements.forEach(st => {
    const a = st.answer !== undefined ? st.answer : st.ans;
    if (a) tfTrue++; else tfFalse++;
    if (ABSOLUTE.test(String(st.text || st.q))) { if (a) absTrue++; else absFalse++; }
  });
});
if (tfTrue + tfFalse >= 20) {
  const total = tfTrue + tfFalse;
  const truePct = (tfTrue / total) * 100;
  notes.push(`True/false balance: ${tfTrue} true, ${tfFalse} false (${truePct.toFixed(0)}% true; even is 50%).`);
  if (truePct > TF_TRUE_CEILING || truePct < 100 - TF_TRUE_CEILING) {
    errors.push(`True/false keys are ${truePct.toFixed(0)}% true across ${total} statements (ceiling ${TF_TRUE_CEILING}%) — guessing the majority answer beats knowing the material.`);
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
    /* A stem shared between the bank and a lesson check makes "practice" a
       memory test of a page already read; a stem repeated inside the bank is
       two questions where there should be one. Both fail. */
    errors.push(`Question stem repeated ${where.length}× in ${where.slice(0, 4).join(', ')}${where.length > 4 ? '…' : ''}: "${stem.slice(0, 60)}…"`);
  }
});

if (mcqCount) {
  const pct = (cueCount / mcqCount) * 100;
  notes.push(`Answer-length cue: the key is the single longest option in ${cueCount}/${mcqCount} MCQs (${pct.toFixed(1)}%; chance is 25%).`);
  if (pct > CUE_CEILING_PCT) {
    errors.push(`Answer-length cue is ${pct.toFixed(1)}% of MCQs, above the ${CUE_CEILING_PCT}% ceiling. Lengthen distractors on the flagged questions.`);
  }
}

/* ── 2. Card shape must match what the renderer reads ────────────────────── */
/* Anything reaching the markdown helper directly must be a primitive, or it
   renders as a literal "[object Object]" — a defect that loads cleanly and
   passes every other check. */
const CARD_SHAPE = {
  h: 'str',
  p: 'str[]',
  formula: 'str',
  flow: 'str[]',
  examtrap: 'str',
  callout: { kind: 'str?', text: 'str' },
  table: { headers: 'str[]?', rows: 'str[][]', caption: 'str?' },
  example: { title: 'str?', rows: 'str[][]' },
  split: { left: { title: 'str?', items: 'str[]' }, right: { title: 'str?', items: 'str[]' } },
  worked: {
    title: 'str?', problem: 'str', answer: 'str',
    steps: [{ do: 'str', why: 'str?' }],
    tryIt: { q: 'str', answer: 'num', unit: 'str?', hint: 'str?', exp: 'str?' }
  }
};
function isPrim(v) { return typeof v === 'string' || typeof v === 'number'; }
function checkShape(val, spec, where) {
  if (val === undefined || val === null) return;
  if (typeof spec === 'string') {
    const base = spec.endsWith('?') ? spec.slice(0, -1) : spec;
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
        if (!Array.isArray(row)) { errors.push(`${where}[${r}]: must be a row.`); return; }
        row.forEach((x, c) => { if (!isPrim(x)) errors.push(`${where}[${r}][${c}]: must be text.`); });
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
    if (val[k] === undefined) { if (required) errors.push(`${where}.${k}: missing.`); return; }
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

/* ── 3. Prose must not promise an element the card does not have ─────────── */
const PROMISES = {
  table: /\b(the|this)\s+table\s+(below|opposite|here)\b|\b(below|following)\s+table\b/i,
  worked: /\bworked example below\b/i,
  split: /\b(the\s+)?two\s+columns\s+below\b/i,
  flow: /\b(the\s+)?(flow|sequence)\s+below\b/i,
  example: /\bexample below\b/i,
  formula: /\bformula below\b/i
};
lessons.forEach(l => {
  (l.cards || []).forEach((c, ci) => {
    const prose = Array.isArray(c.p) ? c.p.join(' ') : String(c.p || '');
    Object.keys(PROMISES).forEach(el => {
      const m = prose.match(PROMISES[el]);
      if (m && !c[el]) errors.push(`${l.id} card ${ci + 1} ("${String(c.h || '').slice(0, 40)}"): prose says "${m[0]}" but the card has no ${el}.`);
    });
  });
});

/* ── 4. Arithmetic stated in prose must compute ──────────────────────────── */
const NUM = '£?\\s?-?\\d[\\d,]*(?:\\.\\d+)?%?';
const CHAIN = new RegExp(NUM + '(?:\\s*[+\\-−×x*÷/]\\s*' + NUM + ')+\\s*=\\s*' + NUM, 'g');
function val(tok) {
  const pct = /%$/.test(tok);
  return { n: Number(String(tok).replace(/[£,%\s]/g, '')), pct };
}
function evalChain(expr) {
  const parts = String(expr).split('=');
  if (parts.length !== 2) return null;
  const toks = parts[0].match(new RegExp(NUM + '|[+\\-−×x*÷/]', 'g'));
  if (!toks || toks.length < 3) return null;
  const first = val(toks[0]);
  if (first.pct) return null;
  let total = first.n;
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
const sources = lessons.map(l => [l.id, flat({ cards: l.cards, check: l.check })]);
sources.push(['question bank', flat(BANK)]);
sources.forEach(([label, text]) => {
  let m;
  const re = new RegExp(CHAIN.source, 'g');
  while ((m = re.exec(text)) !== null) {
    const expr = m[0];
    /* Skip a match that is only part of a longer chain of equalities. Prose
       legitimately writes "12 × £13.50 × 1.5 = 12 × £20.25 = £243", where the
       regex matches the middle slice "£13.50 × 1.5 = 12" and would condemn
       arithmetic that is in fact correct. What distinguishes the two is a
       continuation operator immediately AFTER the match: the stated result is
       itself being operated on, so this is not a whole statement.

       Only that test. An earlier version also skipped a match preceded by
       "= ", which looked equally sensible and was badly wrong: it threw away 98
       of 148 chains, because prose routinely labels a calculation — "Gross =
       £2,576.33 − £320 − £198 = £2,058.33" — and the label is not a chained
       equality. Over-skipping is the failure mode to fear here, since it makes
       the check quietly stop looking. */
    const after = text.slice(m.index + expr.length, m.index + expr.length + 12);
    if (/^\s*[+\-−×x*÷/=]/.test(after)) continue;
    const r = evalChain(expr);
    if (!r) continue;
    sumsChecked++;
    const off = Math.abs(r.got - r.want);
    if (off > 0.011 && off > Math.abs(r.got) * 1e-9 && Math.round(r.got) !== r.want) {
      errors.push(`${label}: the stated sum "${expr.trim()}" does not compute — it comes to ${r.got.toFixed(2)}.`);
    }
  }
});

/* ── 5. Teaching depth, ratcheted per unit ───────────────────────────────── */
const depthByUnit = {};
lessons.forEach(l => {
  const u = l._unit;
  if (!depthByUnit[u]) depthByUnit[u] = [];
  (l.cards || []).forEach((c, ci) => {
    depthByUnit[u].push({ lesson: l.id, ci: ci + 1, h: String(c.h || ''), n: words(flat(c)), rich: RICH_ELEMENTS.some(k => c[k]) });
  });
});
L2_UNITS.forEach(u => {
  const cards = depthByUnit[u] || [];
  if (!cards.length) return;
  const counts = cards.map(c => c.n);
  const med = median(counts);
  const mean = Math.round(counts.reduce((a, b) => a + b, 0) / counts.length);
  const thin = cards.filter(c => c.n < MIN_CARD_WORDS);
  const enforced = DEPTH_ENFORCED.indexOf(u) !== -1;
  notes.push(`${u.toUpperCase()} depth: ${cards.length} cards · mean ${mean} · median ${med} words` +
             (enforced ? ` · ENFORCED` : ` · not yet enforced (${thin.length} under ${MIN_CARD_WORDS})`));
  if (!enforced) return;
  thin.forEach(c => errors.push(`${c.lesson} card ${c.ci} ("${c.h.slice(0, 40)}"): ${c.n} words, below the ${MIN_CARD_WORDS}-word floor for an enforced unit.`));
  if (med < TARGET_MEDIAN_WORDS) {
    errors.push(`${u.toUpperCase()}: median card is ${med} words, below the ${TARGET_MEDIAN_WORDS}-word target for an enforced unit.`);
  }
});

/* ── 6. Syllabus coverage, ratcheted per unit ────────────────────────────── */
const allTags = new Set(S.allCriteria().map(c => c.tag));
const tagged = new Map();
lessons.forEach(l => {
  (l.criteria || []).forEach(tag => {
    if (!allTags.has(tag)) { errors.push(`${l.id}: claims "${tag}", which is not in the Level 2 syllabus.`); return; }
    if (!tagged.has(tag)) tagged.set(tag, []);
    tagged.get(tag).push(l.id);
  });
});
COVERAGE_ENFORCED.forEach(u => {
  const cs = S.criteria(u);
  if (!cs.length) { errors.push(`COVERAGE_ENFORCED names unknown unit "${u}".`); return; }
  const missing = cs.filter(c => !tagged.has(c.tag));
  if (missing.length) {
    errors.push(`${u.toUpperCase()} is declared covered but ${missing.length} of ${cs.length} criteria have no lesson: ${missing.map(c => c.id).join(', ')}`);
  }
  /* Coverage in the other direction, and the rule that would have caught the
     original defect. Requiring every criterion to have a lesson does not stop a
     unit carrying lessons that belong to a different qualification — six ITBK
     lessons taught Level 3 Financial Accounting material for exactly that
     reason. A lesson must therefore claim a criterion, and `criteria: []` is
     the explicit opt-out for an orientation or bridge lesson that honestly
     covers none. An ABSENT field is the failure; an empty one is a decision. */
  lessons.filter(l => l._unit === u).forEach(l => {
    if (!l.criteria) {
      errors.push(`${l.id} ("${String(l.title || '').slice(0, 40)}") claims no criteria in an enforced unit. Tag it, or set criteria: [] to declare that it deliberately covers none.`);
    }
  });
});
L2_UNITS.forEach(u => {
  const cs = S.criteria(u);
  const missing = cs.filter(c => !tagged.has(c.tag));
  const have = cs.length - missing.length;
  notes.push(`${u.toUpperCase()} coverage: ${have}/${cs.length} criteria tagged` +
             (COVERAGE_ENFORCED.indexOf(u) !== -1 ? ' · ENFORCED' : ' · not yet enforced') +
             (missing.length && have ? ` · missing ${missing.map(c => c.id).join(', ')}` : ''));
});

/* ── Report ──────────────────────────────────────────────────────────────── */
const cardTotal = lessons.reduce((s, l) => s + (l.cards || []).length, 0);
const proseTotal = lessons.reduce((s, l) => s + words(flat(l.cards)), 0);
notes.unshift(`${lessons.length} lessons · ${cardTotal} cards · ${proseTotal.toLocaleString('en-GB')} words of teaching content.`);
notes.push(`${allQuestions.length} questions (${BANK.length} in the bank, ${allQuestions.length - BANK.length} in lesson checks).`);
notes.push(`Types: ${Object.keys(typeCounts).sort().map(k => `${k} ${typeCounts[k]}`).join(' · ')}.`);
notes.push(`${sumsChecked} arithmetic chains in prose evaluated.`);
notes.push(`Depth enforced for: ${DEPTH_ENFORCED.map(u => u.toUpperCase()).join(', ') || 'none'}. Coverage enforced for: ${COVERAGE_ENFORCED.map(u => u.toUpperCase()).join(', ') || 'none'}.`);

console.log(`${BOLD}AAT Level 2 content quality${RESET}\n`);
notes.forEach(n => console.log(`  ${DIM}${n}${RESET}`));
console.log('');

if (warnings.length) {
  console.log(`${YELLOW}${BOLD}── WARNINGS (${warnings.length}) ──${RESET}`);
  warnings.slice(0, 40).forEach(w => console.log(`  ${YELLOW}⚠${RESET}  ${w}`));
  if (warnings.length > 40) console.log(`  ${DIM}… and ${warnings.length - 40} more${RESET}`);
  console.log('');
}
if (errors.length) {
  console.log(`${RED}${BOLD}── FAILURES (${errors.length}) ──${RESET}`);
  errors.slice(0, 60).forEach(e => console.log(`  ${RED}✗${RESET}  ${e}`));
  if (errors.length > 60) console.log(`  ${DIM}… and ${errors.length - 60} more${RESET}`);
  console.log('');
  process.exit(1);
}
console.log(`${GREEN}${BOLD}── Level 2 content quality OK ✓${RESET}\n`);
