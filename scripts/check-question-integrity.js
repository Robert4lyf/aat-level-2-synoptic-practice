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
  /* THE WHOLE FUNCTION, found by its end rather than by a byte count. This read
     a fixed 2600 characters, which was comfortably more than the function
     needed until two more type branches were added — and then the simple-MCQ
     tail fell outside the window and this check reported that app.js had
     stopped remapping `ans`, which it had not. A window that silently stops
     covering what it is checking is worse than one that is too small to work
     at all: it fails, but for a reason nobody can act on. */
  const pqEnd = appSrc.indexOf('\n  function ', pqStart + 1);
  const pqBody = appSrc.slice(pqStart, pqEnd === -1 ? appSrc.length : pqEnd);
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

// ── 4. Learning-path integrity. ──────────────────────────────────────────────
// The lesson data has no schema, so a typo in a check question (an out-of-range
// answer index, a gap-fill placeholder with no gap) silently ships a lesson that
// cannot be completed. These checks are cheap and catch that class of fault.
const learnSrc = fs.readFileSync(path.join(ROOT, 'learn-data.js'), 'utf8');
const skillsSrc = fs.readFileSync(path.join(ROOT, 'skills.js'), 'utf8');
// eslint-disable-next-line no-new-func
new Function('window', learnSrc)(sandbox.window);
// eslint-disable-next-line no-new-func
new Function('window', skillsSrc)(sandbox.window);
const LEARN = sandbox.window.LEARN_PATH || [];
const skillIds = new Set(((sandbox.window.SKILLS || {}).defs || []).map(d => d.id));

const lessonIds = new Set();
let lessonCount = 0, checkCount = 0, workedCount = 0;
for (const unit of LEARN) {
  for (const l of unit.lessons || []) {
    lessonCount++;
    const where = l.id || '(no id)';
    if (!l.id) errors.push('A lesson has no id.');
    else if (lessonIds.has(l.id)) errors.push(`Duplicate lesson id: ${l.id}.`);
    else lessonIds.add(l.id);
    if (!l.title) errors.push(`${where}: no title.`);
    if (!Array.isArray(l.cards) || !l.cards.length) errors.push(`${where}: no cards.`);
    for (const sid of l.skills || []) {
      if (!skillIds.has(sid)) errors.push(`${where}: references unknown skill "${sid}".`);
    }
    (l.cards || []).forEach((c, ci) => {
      if (!c.h && !c.title) errors.push(`${where} card ${ci}: no heading.`);
      if (!c.worked) return;
      workedCount++;
      const w = c.worked;
      if (!w.problem) errors.push(`${where} card ${ci}: worked example has no problem.`);
      if (!Array.isArray(w.steps) || !w.steps.length) errors.push(`${where} card ${ci}: worked example has no steps.`);
      else w.steps.forEach((st, si) => { if (!st.do) errors.push(`${where} card ${ci} step ${si}: no "do" text.`); });
      if (!w.answer) errors.push(`${where} card ${ci}: worked example has no answer.`);
      if (w.tryIt) {
        if (!w.tryIt.q) errors.push(`${where} card ${ci}: tryIt has no question.`);
        if (!Number.isFinite(w.tryIt.answer)) errors.push(`${where} card ${ci}: tryIt answer is not a finite number.`);
      }
    });
    (l.check || []).forEach((q, qi) => {
      checkCount++;
      const w = `${where} check ${qi}`;
      const t = q.type || 'mcq';
      if (!q.q) errors.push(`${w}: no question text.`);
      if (!q.exp) errors.push(`${w}: no explanation.`);
      if (t === 'mcq') {
        if (!Array.isArray(q.opts) || q.opts.length < 2) { errors.push(`${w}: needs at least 2 options.`); return; }
        if (!Number.isInteger(q.ans) || q.ans < 0 || q.ans >= q.opts.length) errors.push(`${w}: ans index ${q.ans} out of range.`);
        if (new Set(q.opts.map(o => String(o).toLowerCase())).size !== q.opts.length) errors.push(`${w}: duplicate option text.`);
      } else if (t === 'numeric') {
        if (!Number.isFinite(q.answer)) errors.push(`${w}: numeric answer is not a finite number.`);
      } else if (t === 'gapfill') {
        if (!q.template) { errors.push(`${w}: no template.`); return; }
        if (!Array.isArray(q.gaps) || !q.gaps.length) { errors.push(`${w}: no gaps.`); return; }
        q.gaps.forEach((g, gi) => {
          if (!q.template.includes('{' + gi + '}')) errors.push(`${w}: template is missing placeholder {${gi}}.`);
          if (!Array.isArray(g.options) || g.options.length < 2) errors.push(`${w} gap ${gi}: needs at least 2 options.`);
          else if (!Number.isInteger(g.answer) || g.answer < 0 || g.answer >= g.options.length) errors.push(`${w} gap ${gi}: answer index out of range.`);
        });
        (q.template.match(/\{(\d+)\}/g) || []).forEach(ph => {
          const n = +ph.slice(1, -1);
          if (n >= q.gaps.length) errors.push(`${w}: template uses {${n}} but only ${q.gaps.length} gaps exist.`);
        });
      } else if (t === 'truefalse') {
        if (!Array.isArray(q.statements) || q.statements.length < 2) { errors.push(`${w}: needs at least 2 statements.`); return; }
        q.statements.forEach((st, si) => {
          if (!st.text) errors.push(`${w} statement ${si}: no text.`);
          if (typeof st.answer !== 'boolean') errors.push(`${w} statement ${si}: answer must be true or false.`);
        });
        const trues = q.statements.filter(st => st.answer === true).length;
        if (trues === 0 || trues === q.statements.length) errors.push(`${w}: every statement has the same answer — the grid is guessable.`);
      } else {
        errors.push(`${w}: unknown check type "${t}".`);
      }
    });
  }
}
notes.push(`Learning path: ${lessonCount} lessons, ${checkCount} check questions, ${workedCount} worked examples.`);

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
