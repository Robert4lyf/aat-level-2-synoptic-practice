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
   is the ratchet — add a unit only when its cards actually meet the floor. All
   four now do, against the 90-word average the whole module started at:

     ITBK  87 cards · mean 228 · median 225
     POBC  87 cards · mean 221 · median 217
     POC   84 cards · mean 228 · median 226
     BESY  91 cards · mean 236 · median 233

   Level 1 runs at 253 words a card and Level 3 at 294, so Level 2 now sits in
   the same band rather than an order of magnitude below it. */
const DEPTH_ENFORCED = ['itbk', 'pobc', 'poc', 'besy'];

/* Units whose lessons are tagged against the syllabus and must fully cover it.
   Tagging is what turned a vague sense that the material was patchy into a
   list, and every unit had real gaps:

     ITBK  covered 7 of 16 criteria. The whole of topic area 4 — the analysed
           cash book, the petty cash book, totalling and balancing them,
           recurring receipts and payments — had no lesson, nor did coding
           systems or setting up a bookkeeping system. Six lessons taught Level
           3 Financial Accounting material and mapped to no ITBK criterion.

     POBC  had nothing at all behind learning outcome 4, producing trial
           balances, which is a quarter of the assessment. Payment methods were
           also untaught. The allowance for doubtful debts was taught but does
           not appear in the Level 2 specification at all.

     POC   was the worst. Six criteria had no lesson, including the whole of
           learning outcome 4 (spreadsheets, a tenth of the assessment) and
           criterion 2.5 inside the 40% outcome. Four lessons taught Level 3
           Management Accounting: break-even, high-low, relevant costing and the
           marginal/absorption reconciliation, none of which is in the spec.

     BESY  was missing the principles of an effective tax system, the legal
           administration of a business, business formation, and sources of
           information. Three lessons taught employment law, consumer law and
           director duties, none of which appears in BESY's scope of content.

   All four are now enforced: every criterion has a lesson, and the off-syllabus
   material has moved to the Level 3 preview units where it belongs rather than
   being deleted. */
const COVERAGE_ENFORCED = ['itbk', 'pobc', 'poc', 'besy'];

const errors = [];
const warnings = [];
const notes = [];

/* ── Thresholds ──────────────────────────────────────────────────────────────
   Set to the standard Levels 1 and 3 already meet, not to what Level 2
   currently achieves — the point is to close the gap, not to certify it. */
const MIN_EXP_CHARS = 90;       // an explanation shorter than this explains nothing
const MIN_CARD_WORDS = 150;     // hard floor for a card in an enforced unit
const MIN_PROSE_WORDS = 120;    // prose floor for a card with no rich element
const TARGET_MEDIAN_WORDS = 200; // median card in an enforced unit
/* Ratchet, not aspiration — the convention the Level 1 and 3 checkers use. Set
   just above what the bank achieves so it cannot drift worse. This started at
   35, because 36.3% of MCQs had the key as the single longest option: a student
   who never read the question and always picked the longest answer would have
   beaten the 25% chance rate by half again. Reworking about 240 option sets
   brought it to 20.9%, which is below chance and below the Level 3 bank's 22%.
   The fix was almost always to write the distractors as specifically as the
   key rather than to trim the key, since a one-line distractor beside a
   two-line answer is itself the tell. */
const CUE_CEILING_PCT = 22;     // % of MCQs where the key is the single longest option
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
    const numAns = Number.isFinite(q.answer) ? q.answer : q.ans;
    if (!Number.isFinite(numAns)) {
      errors.push(`${where}: numeric answer is not a finite number.`);
    } else if (q.exp) {
      /* The answer must appear in its own explanation. This is the Level 1
         checker's rule, and it catches the one defect the arithmetic pass
         cannot: a stated answer and a carefully-worked explanation that
         disagree, each internally sound. */
      const plain = String(numAns);
      const grouped = Number(numAns).toLocaleString('en-GB');
      const twoDp = Number(numAns).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      if (q.exp.indexOf(plain) === -1 && q.exp.indexOf(grouped) === -1 && q.exp.indexOf(twoDp) === -1) {
        errors.push(`${where}: the stated answer ${grouped} never appears in its own explanation — one of the two is wrong.`);
      }
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
    depthByUnit[u].push({
      lesson: l.id, ci: ci + 1, h: String(c.h || ''),
      n: words(flat(c)),
      prose: words((c.p || []).join(' ')),
      rich: RICH_ELEMENTS.some(k => c[k]),
    });
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
  /* A card can clear the word floor on the strength of a big table while its
     prose says almost nothing, so a card with no table, example or worked
     element has to carry the teaching in prose. Level 1's rule, applied here. */
  cards.filter(c => c.n >= MIN_CARD_WORDS && !c.rich && c.prose < MIN_PROSE_WORDS).forEach(c => {
    errors.push(`${c.lesson} card ${c.ci} ("${c.h.slice(0, 40)}"): ${c.prose} words of prose and no table, example or worked element — the card carries little.`);
  });
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

/* ── 7. Prose mannerisms ─────────────────────────────────────────────────────
   Shared with the Level 1 and Level 3 checkers, where the reasoning is set out
   at length. The short version: this material is written by a model, and models
   have tics.

   NEVER is vocabulary that has no business in a UK accounting textbook and
   reads as machine-generated on sight. All of it is at zero across all three
   levels, so a hard failure costs nothing today and catches drift immediately.
   It is applied to the Level 3 preview lessons too — a tell is unwanted
   wherever it appears.

   SIGNPOSTING — "it is worth noting that X" — announces that X matters instead
   of making the point. A few are fine, so this is a rate ceiling, not a ban.
   This module ran at 0.41 per thousand words before a cull and 0.03 after. */
const NEVER = [
  [/\bdelv(e|es|ing)\b/i,                       'delve'],
  [/\bleverag(e|es|ing)\b/i,                    'leverage'],
  [/\bseamless(ly)?\b/i,                        'seamless'],
  [/\b(landscape|realm|tapestry|ecosystem)\b/i,  'landscape/realm/tapestry/ecosystem'],
  [/\bin today'?s (world|business|climate)\b/i,  "in today's world"],
  [/\bever-(changing|evolving)\b/i,             'ever-changing'],
  [/\bat (its|the) (core|heart)\b/i,             'at its core'],
  [/\bthat said\b/i,                            'that said'],
  [/(^|[.!?]\s+)(Furthermore|Moreover|Additionally),/, 'Furthermore/Moreover/Additionally'],
  [/\bunderscore[sd]?\b/i,                      'underscores'],
  [/\bholistic(ally)?\b/i,                      'holistic'],
  [/\bmulti-faceted\b/i,                        'multi-faceted'],
  [/\bnavigat(e|es|ing) the\b/i,                'navigate the (metaphor)'],
  [/\bit'?s important to note\b/i,              "it's important to note"],
];
const SIGNPOST = /\b(it is|it's) worth\b|\bworth (noting|saying|being|pausing|flagging)\b/gi;
const SIGNPOST_CEILING_PER_1K = 1.0;
/* ── Cadence: rhetorical shapes, not vocabulary ──────────────────────────────
   The never-list above hunts WORDS. This hunts SHAPES, which is the harder and
   more common tell — a reader spotted "That sounds modest, and it is worth
   being clear about why it is not" and was right to, even though every word in
   it is ordinary.

   These shapes are not banned. "A credit note is not a cancelled invoice — it
   is X" corrects a real misconception and earns its form, and one such
   sentence in a card reads as emphasis. What reads as machine-written is
   DENSITY: the worst card in the project stacked four of them, opening with a
   concession-reversal, defining by negation, reaching for a superlative and
   then announcing that the point was the point of the card.

   So the rule is per card, not per module: at most one. That permits the device
   and forbids the pile-up. All three modules now sit at a maximum of one. */
const CADENCE = [
  [/\b(that|this|it) (sounds|seems|looks|feels)\b[^.!?]{0,60}?\b(and|but|yet)\b[^.!?]{0,40}?\bnot\b/gi, 'concession-reversal ("that sounds X, but it is not")'],
  [/\bthan it (first |initially )?(appears|looks|sounds|seems)\b/gi,          '"than it appears"'],
  [/\b(is|are) not [^.!?]{3,60}?[.—:] ?(It|They) (is|are)\b/g,                'definition by negation'],
  [/\bis not [^.!?]{3,50}?(,| —) (but|it is|rather)\b/gi,                     '"not X, but Y"'],
  [/\b(that|this) is (the )?(whole |entire |very )?(point|of it|difference)\b/gi, '"that is the point"'],
  [/\bwhich is (exactly|precisely)\b/gi,                                      '"which is exactly/precisely"'],
  [/\bthe answer is (almost |nearly )?always\b/gi,                            '"the answer is almost always"'],
  [/\b(keep|hold) (that|this) (thread |thought )?in mind\b/gi,                '"keep that in mind"'],
  [/\bthe (only|single most|one) [a-z]+ (account|source|place|thing|reason|way|figure|check)\b/gi, 'superlative-only'],
  [/\beverything else\b[^.!?]{0,40}\b(is built|rests|follows|depends)\b/gi,    '"everything else follows"'],
  [/\b(is|are) doing (the|real|a lot of) work\b|\bcarr(y|ies) the whole\b/gi,  '"is doing the work"'],
  [/\bis the (point|subject|whole) of this (card|lesson)\b/gi,                 '"is the point of this card"'],
  [/\bworth (pausing|dwelling|lingering) on\b/gi,                             '"worth dwelling on"'],
  [/\b(none of (that|this) is|that is not) (arbitrary|accidental|an accident|a coincidence)\b/gi, '"not arbitrary/no accident"'],
  [/\band that is (exactly|precisely) (why|what|the)\b/gi,                     '"and that is precisely why"'],
];
const CADENCE_MAX_PER_CARD = 1;

lessons.forEach(l => (l.cards || []).forEach((c, ci) => {
  const text = (c.p || []).join(' ');
  const found = [];
  CADENCE.forEach(([re, label]) => {
    const m = text.match(new RegExp(re.source, re.flags));
    if (m) for (let k = 0; k < m.length; k++) found.push(label);
  });
  if (found.length > CADENCE_MAX_PER_CARD) {
    errors.push(`${l.id} card ${ci + 1} ("${String(c.h || '').slice(0, 40)}"): ${found.length} rhetorical cadences stacked on one card — ${[...new Set(found)].join('; ')}. One is emphasis; a pile-up is what makes prose read as machine-written. Make the points instead of announcing them.`);
  }
}));


{
  let proseWords = 0;
  const proseBits = [];
  lessons.forEach(l => (l.cards || []).forEach((c, ci) => {
    (c.p || []).forEach(par => {
      const text = String(par);
      NEVER.forEach(([re, label]) => {
        if (re.test(text)) errors.push(`${l.id} card ${ci + 1} ("${String(c.h || '').slice(0, 40)}"): prose contains "${label}" — a machine-writing tell, not this material's voice.`);
      });
      /* The rate is measured over the four Level 2 units, so the preview
         lessons cannot dilute it. */
      if (L2_UNITS.indexOf(l._unit) !== -1) { proseBits.push(text); proseWords += words(text); }
    });
  }));
  const hits = (proseBits.join('\n').match(SIGNPOST) || []).length;
  const perK = proseWords ? (1000 * hits / proseWords) : 0;
  notes.push(`Signposting ("it is worth…"): ${hits} in ${proseWords.toLocaleString('en-GB')} prose words = ${perK.toFixed(2)} per 1,000 (ceiling ${SIGNPOST_CEILING_PER_1K.toFixed(1)}).`);
  if (perK > SIGNPOST_CEILING_PER_1K) {
    warnings.push(`Signposting runs at ${perK.toFixed(2)} per 1,000 prose words, above the ${SIGNPOST_CEILING_PER_1K.toFixed(1)} ceiling. "It is worth noting that X" announces that X matters instead of saying X — cut the frame and keep the point.`);
  }
}

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
