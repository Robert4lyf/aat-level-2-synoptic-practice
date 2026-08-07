#!/usr/bin/env node
/**
 * Content/accuracy validator for the AAT question bank (data.js).
 * Mirrors validate-french-data.js. Exit 1 on hard errors; 0 if only warnings.
 *
 * Catches the kinds of mistakes that are easy to make by hand and hard to spot
 * by eye: out-of-range answer keys, duplicate/ambiguous options, dragdrop pairs
 * that can't be matched unambiguously, table blanks pointing at the wrong cell,
 * gap-fill templates whose placeholders don't match the gaps, numeric generators
 * that throw or return non-numbers, duplicate IDs, and contradictory duplicate
 * question stems.
 *
 * Run: node scripts/validate-aat-data.js
 */

'use strict';

const fs = require('fs');
const path = require('path');

const RED = '\x1b[31m', GREEN = '\x1b[32m', YELLOW = '\x1b[33m', CYAN = '\x1b[36m', BOLD = '\x1b[1m', DIM = '\x1b[2m', RESET = '\x1b[0m';

// ── Load data.js in a sandbox that mimics the browser global. ────────────────
const window = {};
const src = fs.readFileSync(path.resolve(__dirname, '..', 'data.js'), 'utf8');
// eslint-disable-next-line no-new-func
new Function('window', src)(window);

const TOPICS = window.TOPICS || [];
const Q = window.ALL_QUESTIONS || [];
const topicIds = new Set(TOPICS.map(t => t.id));
// Pseudo-topics that are intentionally NOT in TOPICS but are handled specially by
// app.js: "synoptic" drives the cross-unit "Synoptic Practice" home button and is
// treated as always-unlocked by isUnitUnlocked(). Keep this in sync with app.js.
const PSEUDO_TOPICS = new Set(['synoptic']);
const isKnownTopic = (id) => topicIds.has(id) || PSEUDO_TOPICS.has(id);

const errors = [];
const warnings = [];
const err = (id, msg) => errors.push(`${id}: ${msg}`);
const warn = (id, msg) => warnings.push(`${id}: ${msg}`);

const isNum = (n) => typeof n === 'number' && isFinite(n);
const norm = (s) => String(s == null ? '' : s).trim().replace(/\s+/g, ' ').toLowerCase();

// ── Shared MCQ-shape validator (used by top-level mcq, scenario mcq parts). ───
function checkMcq(id, q, ctx) {
  const where = ctx ? `${id} ${ctx}` : id;
  if (!Array.isArray(q.opts) || q.opts.length < 2) { err(where, 'mcq needs at least 2 options'); return; }
  if (q.opts.some(o => o == null || String(o).trim() === '')) err(where, 'has a blank option');
  if (!Number.isInteger(q.ans) || q.ans < 0 || q.ans >= q.opts.length) {
    err(where, `ans index ${q.ans} is out of range (0..${q.opts.length - 1})`);
  }
  // Duplicate options make the key ambiguous (two "correct" choices, or two identical distractors).
  const seen = new Map();
  q.opts.forEach((o, i) => {
    const k = norm(o);
    if (seen.has(k)) err(where, `duplicate option text "${o}" at positions ${seen.get(k)} and ${i}`);
    else seen.set(k, i);
  });
  if (!q.exp || String(q.exp).trim() === '') warn(where, 'missing explanation');
}

// ── Per-question checks. ─────────────────────────────────────────────────────
function checkNumeric(id, q, ctx) {
  const where = ctx ? `${id} ${ctx}` : id;
  if (typeof q.generate === 'function') {
    // Dynamic generator: run it many times to catch throws / NaN / non-number answers.
    for (let i = 0; i < 200; i++) {
      let g;
      try { g = q.generate(); }
      catch (e) { err(where, `generate() threw: ${e.message}`); return; }
      if (!g || typeof g.q !== 'string' || !g.q.trim()) { err(where, 'generate() returned no question text'); return; }
      if (!isNum(g.answer)) { err(where, `generate() returned non-numeric answer: ${JSON.stringify(g.answer)}`); return; }
    }
  } else if (!isNum(q.answer)) {
    err(where, `static numeric answer is not a finite number: ${JSON.stringify(q.answer)}`);
  }
}

function checkDragdrop(id, q) {
  if (!Array.isArray(q.pairs) || q.pairs.length < 2) { err(id, 'dragdrop needs at least 2 pairs'); return; }
  // NOTE: duplicate RIGHT values are allowed — these are classification questions
  // (e.g. several items that are all "Direct cost"). app.js scores drag-drop by
  // comparing right-side TEXT, not slot index, so any matching slot is accepted.
  // Duplicate LEFT prompts, however, are a genuine error (the same prompt twice).
  const lefts = new Map();
  q.pairs.forEach((p, i) => {
    if (!p || p.left == null || p.right == null) { err(id, `pair ${i} missing left/right`); return; }
    const lk = norm(p.left);
    if (lefts.has(lk)) err(id, `duplicate left "${p.left}" (pairs ${lefts.get(lk)} & ${i})`); else lefts.set(lk, i);
  });
}

function checkTablefill(id, q) {
  const t = q.table;
  if (!t || !Array.isArray(t.rows) || !Array.isArray(t.blanks) || !t.blanks.length) { err(id, 'tablefill missing table/rows/blanks'); return; }
  t.blanks.forEach((b, i) => {
    if (!Number.isInteger(b.row) || !Number.isInteger(b.col)) { err(id, `blank ${i} has non-integer row/col`); return; }
    const row = t.rows[b.row];
    if (!row || b.col >= row.length) { err(id, `blank ${i} points outside the table (row ${b.row}, col ${b.col})`); return; }
    if (b.answer == null || String(b.answer).trim() === '') err(id, `blank ${i} has no answer`);
    // The targeted cell should be a placeholder, not already filled with a different value.
    const cell = String(row[b.col]).trim();
    if (cell !== '?' && cell !== '' && norm(cell) !== norm(b.answer)) {
      warn(id, `blank ${i} targets a non-placeholder cell ("${row[b.col]}") — answer is "${b.answer}"`);
    }
  });
}

function checkGapfill(id, q) {
  if (!Array.isArray(q.gaps) || !q.gaps.length) { err(id, 'gapfill has no gaps'); return; }
  const tpl = q.template || '';
  q.gaps.forEach((g, i) => {
    if (!tpl.includes('{' + i + '}')) err(id, `template is missing placeholder {${i}}`);
    if (!Array.isArray(g.options) || g.options.length < 2) err(id, `gap ${i} needs at least 2 options`);
    else if (!Number.isInteger(g.answer) || g.answer < 0 || g.answer >= g.options.length) err(id, `gap ${i} answer index ${g.answer} out of range`);
  });
  // Placeholders in the template beyond the number of gaps would render as literal "{n}".
  const m = tpl.match(/\{(\d+)\}/g) || [];
  m.forEach(ph => {
    const n = parseInt(ph.slice(1, -1), 10);
    if (n >= q.gaps.length) err(id, `template uses placeholder ${ph} but there are only ${q.gaps.length} gaps`);
  });
}

function checkScenario(id, q) {
  if (!Array.isArray(q.parts) || !q.parts.length) { err(id, 'scenario has no parts'); return; }
  q.parts.forEach((p, i) => {
    const ctx = `part ${i + 1}`;
    if (p.type === 'numeric') checkNumeric(id, p, ctx);
    else checkMcq(id, p, ctx); // scenario parts default to mcq shape
  });
}

// True/false statement grid — one mark per statement, so partial credit applies.
function checkTrueFalse(id, q) {
  if (!Array.isArray(q.statements) || q.statements.length < 2) {
    err(id, 'truefalse needs at least 2 statements'); return;
  }
  const seen = new Set();
  q.statements.forEach((s, i) => {
    if (!s || typeof s.text !== 'string' || !s.text.trim()) err(id, `statement ${i} has no text`);
    if (typeof s.answer !== 'boolean') err(id, `statement ${i} answer must be true or false, got ${JSON.stringify(s.answer)}`);
    const k = norm(s.text || '');
    if (seen.has(k)) err(id, `duplicate statement "${s.text}"`); else seen.add(k);
  });
  // A grid where every statement is true (or every one false) is guessable.
  const trues = q.statements.filter(s => s.answer === true).length;
  if (trues === 0 || trues === q.statements.length) {
    warn(id, `all ${q.statements.length} statements are ${trues ? 'TRUE' : 'FALSE'} — mix them so the grid cannot be guessed`);
  }
  if (!q.exp || !String(q.exp).trim()) warn(id, 'missing explanation');
}

// Multi-select — "Which TWO of the following…". All-or-nothing marking.
function checkMultiSelect(id, q) {
  if (!Array.isArray(q.opts) || q.opts.length < 3) { err(id, 'multiselect needs at least 3 options'); return; }
  if (!Array.isArray(q.answers) || q.answers.length < 2) { err(id, 'multiselect needs at least 2 answers'); return; }
  const seen = new Set();
  q.opts.forEach((o, i) => {
    if (o == null || String(o).trim() === '') err(id, `option ${i} is blank`);
    const k = norm(String(o));
    if (seen.has(k)) err(id, `duplicate option text "${o}"`); else seen.add(k);
  });
  const uniq = new Set(q.answers);
  if (uniq.size !== q.answers.length) err(id, 'answers contains a duplicate index');
  q.answers.forEach(a => {
    if (!Number.isInteger(a) || a < 0 || a >= q.opts.length) err(id, `answer index ${a} is out of range (0..${q.opts.length - 1})`);
  });
  if (q.answers.length >= q.opts.length) err(id, 'every option is correct — there are no distractors');
  if (q.selectCount != null && q.selectCount !== q.answers.length) {
    err(id, `selectCount ${q.selectCount} does not match ${q.answers.length} answers`);
  }
  if (!q.exp || !String(q.exp).trim()) warn(id, 'missing explanation');
}

// Written response — human-marked in the real assessment, self-marked here.
// The rubric is the mark scheme, so it must add up to the task's marks.
function checkWritten(id, q) {
  if (!q.task || !String(q.task).trim()) err(id, 'written task has no `task` (the "Required:" instruction)');
  if (!q.modelAnswer || !String(q.modelAnswer).trim()) err(id, 'written task has no model answer');
  if (!Array.isArray(q.rubric) || !q.rubric.length) { err(id, 'written task has no rubric'); return; }
  let sum = 0;
  q.rubric.forEach((r, i) => {
    if (!r || typeof r.point !== 'string' || !r.point.trim()) err(id, `rubric point ${i} has no text`);
    if (!Number.isFinite(r.marks) || r.marks <= 0) err(id, `rubric point ${i} has invalid marks ${JSON.stringify(r.marks)}`);
    else sum += r.marks;
  });
  if (Number.isFinite(q.marks) && sum !== q.marks) {
    err(id, `rubric totals ${sum} marks but the task declares ${q.marks}`);
  }
  if (q.minWords != null && (!Number.isInteger(q.minWords) || q.minWords < 1)) {
    err(id, `minWords must be a positive integer, got ${JSON.stringify(q.minWords)}`);
  }
}

// ── Run checks. ──────────────────────────────────────────────────────────────
const ids = new Map();
const stems = new Map();

for (const q of Q) {
  if (!q.id) { err('(no id)', 'question is missing an id'); continue; }
  if (ids.has(q.id)) err(q.id, `duplicate id (also at index ${ids.get(q.id)})`);
  else ids.set(q.id, Q.indexOf(q));

  if (q.topic && !isKnownTopic(q.topic)) err(q.id, `unknown topic "${q.topic}"`);
  if (q.difficulty && !['easy', 'medium', 'hard'].includes(q.difficulty)) warn(q.id, `unexpected difficulty "${q.difficulty}"`);

  const type = q.type || 'mcq';
  if (type === 'mcq') checkMcq(q.id, q);
  else if (type === 'numeric') checkNumeric(q.id, q);
  else if (type === 'dragdrop') checkDragdrop(q.id, q);
  else if (type === 'tablefill') checkTablefill(q.id, q);
  else if (type === 'gapfill') checkGapfill(q.id, q);
  else if (type === 'scenario') checkScenario(q.id, q);
  else if (type === 'truefalse') checkTrueFalse(q.id, q);
  else if (type === 'multiselect') checkMultiSelect(q.id, q);
  else if (type === 'written') checkWritten(q.id, q);
  else warn(q.id, `unrecognised type "${type}"`);

  // Contradiction check: a TRUE contradiction is the same stem AND the same set of
  // options but a different correct answer. (Two questions that merely share a stem
  // but offer different option sets are legitimate variants, not contradictions.)
  if (type === 'mcq' && q.q && Array.isArray(q.opts) && Number.isInteger(q.ans)) {
    const stemKey = norm(q.q);
    const optsKey = q.opts.map(norm).slice().sort().join(' | ');
    const correct = norm(q.opts[q.ans]);
    const k = stemKey + ' :: ' + optsKey;
    if (stems.has(k)) {
      const prev = stems.get(k);
      if (prev.correct !== correct) {
        warn(q.id, `same stem AND options as ${prev.id} but a different correct answer ("${q.opts[q.ans]}" vs "${prev.text}")`);
      }
    } else {
      stems.set(k, { id: q.id, correct, text: q.opts[q.ans] });
    }
  }
}

// ── Answer-length cue check. ─────────────────────────────────────────────────
// If the correct option is reliably the longest, a student can score well above
// chance without reading the question — and option shuffling does not help,
// because reordering never changes which option is longest. Chance is 25% for a
// four-option MCQ; anything far above that is a measurement problem, not a
// question-writing style.
const CUE_RATIO = 1.4;          // key longer than this multiple of mean distractor → flagged
const CUE_CEILING_PCT = 33;     // bank-wide longest-is-correct rate that fails the build

const cueCandidates = [];
function collectCue(id, q, ctx) {
  if (!Array.isArray(q.opts) || !Number.isInteger(q.ans)) return;
  if (q.opts.length < 3 || !q.opts[q.ans]) return;
  const lens = q.opts.map(o => String(o).length);
  const key = lens[q.ans];
  const others = lens.filter((_, i) => i !== q.ans);
  const isLongest = key > Math.max(...others);
  const mean = others.reduce((a, b) => a + b, 0) / others.length;
  cueCandidates.push({ id: ctx ? `${id} (${ctx})` : id, isLongest, ratio: mean ? key / mean : 1 });
}
for (const q of Q) {
  const type = q.type || 'mcq';
  if (type === 'mcq') collectCue(q.id, q);
  else if (type === 'scenario' && Array.isArray(q.parts)) {
    q.parts.forEach((p, i) => { if (!p.type || p.type === 'mcq') collectCue(q.id, p, `part ${i + 1}`); });
  }
}
const cueFlagged = cueCandidates.filter(c => c.isLongest && c.ratio > CUE_RATIO);
cueFlagged.forEach(c => warn(c.id, `correct answer is the longest option and ${c.ratio.toFixed(1)}× the average distractor — lengthen the distractors`));
const longestCount = cueCandidates.filter(c => c.isLongest).length;
const longestPct = cueCandidates.length ? (longestCount / cueCandidates.length) * 100 : 0;
if (longestPct > CUE_CEILING_PCT) {
  err('(bank)', `correct answer is the longest option in ${longestPct.toFixed(1)}% of MCQs (${longestCount}/${cueCandidates.length}) — ceiling is ${CUE_CEILING_PCT}%, chance is 25%`);
}

// ── Answer-coherence check. ──────────────────────────────────────────────────
// A bulk distractor rewrite once landed option sets on the wrong questions —
// "In a general partnership, partners' liability is:" answered by "Government
// policy on taxation and public spending". Structurally valid, completely wrong.
// The key should share some vocabulary with its own stem or explanation; when it
// shares none at all, the pair is very likely mismatched.
const COHERENCE_STOP = new Set(['that','this','with','from','which','their','they','have','been',
  'when','what','into','than','then','there','these','those','will','would','should','could',
  'because','the','and','for','are','not','following','statements','identify','whether','true',
  'false','business','account','accounts','cost','costs','amount','amounts']);
const contentWords = (t) => new Set(String(t || '').toLowerCase().replace(/[^a-z0-9 ]/g, ' ')
  .split(/\s+/).filter(w => w.length > 3 && !COHERENCE_STOP.has(w)));

let incoherent = 0;
function checkCoherence(id, q, ctx) {
  if (!Array.isArray(q.opts) || !Number.isInteger(q.ans) || !q.opts[q.ans]) return;
  const ref = new Set([...contentWords(q.q), ...contentWords(q.exp)]);
  const key = [...contentWords(q.opts[q.ans])];
  if (key.length < 3) return;                 // short keys carry too little signal
  const shared = key.filter(w => ref.has(w)).length;
  if (shared === 0) {
    incoherent++;
    warn(ctx ? `${id} (${ctx})` : id,
      `correct answer shares no wording with its question or explanation — check the option set belongs to this question ("${String(q.opts[q.ans]).slice(0, 60)}")`);
  }
}
for (const q of Q) {
  const type = q.type || 'mcq';
  if (type === 'mcq') checkCoherence(q.id, q);
  else if (type === 'scenario' && Array.isArray(q.parts)) {
    q.parts.forEach((p, i) => { if (!p.type || p.type === 'mcq') checkCoherence(q.id, p, `part ${i + 1}`); });
  }
}
// A handful of legitimate questions phrase the key entirely in synonyms, so this
// is a warning with a ceiling rather than a hard failure per question.
if (incoherent > 25) {
  err('(bank)', `${incoherent} questions have a correct answer sharing no wording with their stem or explanation — that is well above the expected handful of synonym cases, and suggests option sets have been applied to the wrong questions`);
}

// ── Explanation-depth check. ─────────────────────────────────────────────────
// A one-line explanation confirms the answer without teaching anything. The
// explanation is what a student reads after getting it wrong, so it is the most
// valuable text in the bank.
const shallow = Q.filter(q => (q.type || 'mcq') === 'mcq' && q.exp && String(q.exp).length < 80);
shallow.forEach(q => warn(q.id, `explanation is only ${String(q.exp).length} characters — say why the answer is right, not just what it is`));
if (shallow.length > 20) {
  err('(bank)', `${shallow.length} MCQ explanations are under 80 characters — the ceiling is 20`);
}

// ── Report. ──────────────────────────────────────────────────────────────────
console.log(`${BOLD}${CYAN}AAT question-bank validation${RESET}`);
console.log(`${DIM}${Q.length} questions across ${TOPICS.length} topics${RESET}\n`);

const byType = {};
for (const q of Q) { const t = q.type || 'mcq'; byType[t] = (byType[t] || 0) + 1; }
console.log(`${BOLD}── By type ──${RESET}`);
Object.entries(byType).sort((a, b) => b[1] - a[1]).forEach(([t, n]) => console.log(`  ${t.padEnd(10)} ${String(n).padStart(4)}`));
console.log('');

if (errors.length) {
  console.log(`${RED}${BOLD}── ERRORS (${errors.length}) ──${RESET}`);
  errors.forEach(e => console.log(`  ${RED}✗${RESET} ${e}`));
} else {
  console.log(`${GREEN}${BOLD}── ERRORS: none ✓${RESET}`);
}
console.log('');
if (warnings.length) {
  console.log(`${YELLOW}${BOLD}── WARNINGS (${warnings.length}) ──${RESET}`);
  warnings.forEach(w => console.log(`  ${YELLOW}⚠${RESET}  ${w}`));
  console.log('');
}

console.log(`${BOLD}════════════════════════════════════════${RESET}`);
console.log(`Result: ${errors.length} error(s), ${warnings.length} warning(s)`);
process.exit(errors.length ? 1 : 0);
