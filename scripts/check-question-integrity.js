#!/usr/bin/env node
/**
 * Question-integrity guards for the AAT bank.
 *
 * Two properties that are easy to break silently and expensive to notice:
 *
 *  1. MCQ options MUST be shuffled at render time. The source data has a heavy
 *     answer-position bias (roughly three quarters of keys sit at index 1),
 *     which never reaches a student only because presentQuestion() reshuffles.
 *     If that shuffle is ever removed or refactored away, the bias becomes a
 *     live cue and every practice score is inflated. There is no build step and
 *     presentQuestion lives inside an IIFE, so this is asserted against source.
 *
 *  2. Multi-part answer keys must stay internally consistent — true/false grids
 *     need a mix of both answers, and multi-select needs real distractors.
 *
 * Run via `npm test`.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const RED = '\x1b[31m', GREEN = '\x1b[32m', YELLOW = '\x1b[33m';
const BOLD = '\x1b[1m', DIM = '\x1b[2m', RESET = '\x1b[0m';

const errors = [];
const notes = [];

// ── 1. presentQuestion must shuffle MCQ options. ─────────────────────────────
const appSrc = fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8');
const pqStart = appSrc.indexOf('function presentQuestion(');
if (pqStart === -1) {
  errors.push('presentQuestion() not found in app.js — the shuffle guard cannot run.');
} else {
  // The simple-MCQ path is the tail of the function, after all the type branches.
  const pqBody = appSrc.slice(pqStart, pqStart + 2600);
  const mcqTail = pqBody.slice(pqBody.indexOf('// simple MCQ'));
  if (!mcqTail || mcqTail.length < 40) {
    errors.push('Could not locate the simple-MCQ branch of presentQuestion() — has it been restructured?');
  } else {
    if (!/shuffle\s*\(/.test(mcqTail)) {
      errors.push('presentQuestion() no longer shuffles MCQ options. The source data\'s answer-position bias would become visible to students.');
    }
    if (!/ans:\s*order\.indexOf/.test(mcqTail)) {
      errors.push('presentQuestion() shuffles options but does not remap `ans` — correct answers would be mis-keyed.');
    }
  }
  // Gap-fill and true/false shuffle too; check they were not dropped.
  if (!/isTrueFalse\(q\)[\s\S]{0,220}shuffle\(/.test(pqBody)) {
    errors.push('presentQuestion() no longer shuffles true/false statement order.');
  }
  if (!/isMultiSelect\(q\)[\s\S]{0,260}shuffle\(/.test(pqBody)) {
    errors.push('presentQuestion() no longer shuffles multi-select option order.');
  }
}

// ── 2. Load the bank. ────────────────────────────────────────────────────────
const sandbox = { window: {}, console };
sandbox.window.ALL_QUESTIONS = [];
// eslint-disable-next-line no-new-func
new Function('window', fs.readFileSync(path.join(ROOT, 'data.js'), 'utf8'))(sandbox.window);
const Q = sandbox.window.ALL_QUESTIONS || [];

// Report the latent position bias the shuffle is protecting against.
const mcqs = Q.filter(q => (q.type || 'mcq') === 'mcq' && Array.isArray(q.opts) && Number.isInteger(q.ans));
const pos = [0, 0, 0, 0];
mcqs.forEach(q => { if (q.ans < 4) pos[q.ans]++; });
const worst = Math.max(...pos);
const worstPct = mcqs.length ? (worst / mcqs.length) * 100 : 0;
notes.push(`Source answer positions A/B/C/D: ${pos.join(' / ')} — most common ${worstPct.toFixed(1)}% (neutralised at render by the shuffle).`);

// ── 3. Multi-part key sanity. ────────────────────────────────────────────────
Q.filter(q => q.type === 'truefalse').forEach(q => {
  const trues = (q.statements || []).filter(s => s.answer === true).length;
  if (trues === 0 || trues === (q.statements || []).length) {
    errors.push(`${q.id}: every statement has the same answer — the grid is guessable.`);
  }
});
Q.filter(q => q.type === 'multiselect').forEach(q => {
  if (!Array.isArray(q.answers) || !Array.isArray(q.opts)) return;
  if (q.answers.length >= q.opts.length) errors.push(`${q.id}: every option is a correct answer.`);
  if (q.selectCount != null && q.selectCount !== q.answers.length) {
    errors.push(`${q.id}: selectCount ${q.selectCount} does not match ${q.answers.length} answers.`);
  }
});
Q.filter(q => q.type === 'written').forEach(q => {
  const sum = (q.rubric || []).reduce((s, r) => s + (Number(r.marks) || 0), 0);
  if (Number.isFinite(q.marks) && sum !== q.marks) {
    errors.push(`${q.id}: rubric totals ${sum} but the task declares ${q.marks} marks.`);
  }
});

// ── Report. ──────────────────────────────────────────────────────────────────
console.log(`${BOLD}Question-integrity checks${RESET}`);
console.log(`${DIM}${Q.length} questions${RESET}\n`);
notes.forEach(n => console.log(`  ${DIM}${n}${RESET}`));
console.log('');

if (errors.length) {
  console.log(`${RED}${BOLD}── FAILURES (${errors.length}) ──${RESET}`);
  errors.forEach(e => console.log(`  ${RED}✗${RESET}  ${e}`));
  console.log('');
  process.exit(1);
}
console.log(`${GREEN}${BOLD}── All integrity checks passed ✓${RESET}\n`);
