#!/usr/bin/env node
/**
 * French learning-quality checker (complements validate-french-data.js, which
 * covers per-question schema). This focuses on bank-level quality:
 *
 *   ERRORS (always wrong):
 *     - a duplicate question (same stem + same answer) WITHIN a single lesson
 *     - a practice lesson with no practice questions (excludes story/exam lessons,
 *       which are reading/assessment content and intentionally have none)
 *
 *   WARNINGS (judgement calls — surfaced, not enforced):
 *     - the same question (stem + answer) repeated across DIFFERENT lessons
 *       (sometimes deliberate reinforcement, sometimes an accidental dup)
 *     - thin CEFR coverage: a level with very few questions per lesson, or that
 *       only uses one question format
 *
 * Plus a coverage report (questions + formats per CEFR level).
 *
 * Run: node scripts/check-french-quality.js   (exit 1 only on ERRORS)
 */

'use strict';

const fs = require('fs');
const path = require('path');

const RED = '\x1b[31m', GREEN = '\x1b[32m', YELLOW = '\x1b[33m', CYAN = '\x1b[36m', BOLD = '\x1b[1m', DIM = '\x1b[2m', RESET = '\x1b[0m';

const window = {};
// eslint-disable-next-line no-new-func
new Function('window', fs.readFileSync(path.resolve(__dirname, '..', 'french-data.js'), 'utf8'))(window);

const Q = window.FR_QUESTIONS || [];
const LP = window.FR_LEARN_PATH || [];

const errors = [];
const warnings = [];

const norm = (s) => String(s == null ? '' : s).trim().toLowerCase().replace(/\s+/g, ' ').replace(/[.?!,;:«»"'’]/g, '');

// A lesson's "answer key" for dedup purposes, by type.
function answerText(q) {
  const t = q.type || 'mcq';
  if ((t === 'mcq' || t === 'listen') && Array.isArray(q.opts) && q.ans != null) return q.opts[q.ans];
  if ((t === 'typed' || t === 'listen-typed') && q.ans != null) return q.ans;
  return null;
}
// A stem that's meaningful to compare. Dictées share the generic prompt
// "Write down what you hear" — their real content is the audio, so key on that.
function stemText(q) {
  const t = q.type || 'mcq';
  if (t === 'listen-typed' || t === 'listen') return q.audio || q.q;
  return q.q;
}

// Story/exam lessons are reading/assessment content with no practice questions by design.
function isPracticeLesson(lesson) {
  const title = lesson.title || '';
  return !/^histoire\s*:/i.test(title) && !/\bexamen\b/i.test(title);
}

// ── Build lesson → questions and the global lesson list. ─────────────────────
const byLesson = {};
Q.forEach((q) => { if (q.lesson) (byLesson[q.lesson] = byLesson[q.lesson] || []).push(q); });

const allLessons = [];
LP.forEach((u) => (u.lessons || []).forEach((l) => allLessons.push({ unit: u.unit || u.id, lesson: l })));

// ── ERROR: practice lesson with no questions. ────────────────────────────────
allLessons.forEach(({ unit, lesson }) => {
  if (isPracticeLesson(lesson) && !(byLesson[lesson.id] || []).length) {
    errors.push(`Practice lesson ${unit}/${lesson.id} "${lesson.title}" has no practice questions`);
  }
});

// ── Duplicate detection (stem + answer). ─────────────────────────────────────
const groups = new Map();
Q.forEach((q) => {
  const t = q.type || 'mcq';
  if (!['mcq', 'typed', 'listen', 'listen-typed'].includes(t)) return;
  const a = answerText(q), s = stemText(q);
  if (a == null || !s) return;
  const key = norm(s) + ' ||ANS|| ' + norm(a);
  if (!groups.has(key)) groups.set(key, []);
  groups.get(key).push(q);
});

let crossLessonDups = 0;
groups.forEach((qs) => {
  if (qs.length < 2) return;
  const lessons = [...new Set(qs.map((q) => q.lesson))];
  const label = `"${(qs[0].q || '').slice(0, 50)}" = "${answerText(qs[0])}"`;
  if (lessons.length === 1) {
    // Same lesson, asked twice — always redundant.
    errors.push(`Duplicate within lesson ${lessons[0]}: ${qs.map((q) => q.id).join(', ')} — ${label}`);
  } else {
    crossLessonDups++;
    warnings.push(`Same question across lessons [${lessons.join(', ')}]: ${qs.map((q) => q.id).join(', ')} — ${label}`);
  }
});

// ── WARNING: thin CEFR coverage. ─────────────────────────────────────────────
const coverage = [];
LP.forEach((u) => {
  const lessons = (u.lessons || []).filter(isPracticeLesson);
  const qs = Q.filter((q) => lessons.some((l) => l.id === q.lesson));
  const types = {};
  qs.forEach((q) => { types[q.type || 'mcq'] = (types[q.type || 'mcq'] || 0) + 1; });
  const perLesson = lessons.length ? qs.length / lessons.length : 0;
  coverage.push({ unit: u.unit || u.id, lessons: lessons.length, questions: qs.length, perLesson, types });
  if (lessons.length && perLesson < 4) warnings.push(`Thin coverage: ${u.unit || u.id} averages ${perLesson.toFixed(1)} questions per practice lesson`);
  if (qs.length >= 5 && Object.keys(types).length === 1) warnings.push(`Format gap: ${u.unit || u.id} uses only "${Object.keys(types)[0]}" questions — no listening/typed/gap-fill variety`);
});

// ── Report. ──────────────────────────────────────────────────────────────────
console.log(`${BOLD}${CYAN}French learning-quality check${RESET}`);
console.log(`${DIM}${Q.length} questions · ${allLessons.length} lessons (${allLessons.filter((l) => isPracticeLesson(l.lesson)).length} practice, ${allLessons.filter((l) => !isPracticeLesson(l.lesson)).length} story/exam)${RESET}\n`);

console.log(`${BOLD}── Coverage by CEFR level ──${RESET}`);
coverage.forEach((c) => {
  const fmt = Object.entries(c.types).sort((a, b) => b[1] - a[1]).map(([t, n]) => `${t}:${n}`).join(', ');
  console.log(`  ${c.unit.padEnd(7)} ${String(c.questions).padStart(4)} q · ${c.lessons} lessons · ${c.perLesson.toFixed(1)}/lesson`);
  console.log(`  ${DIM}        ${fmt}${RESET}`);
});
console.log('');

if (errors.length) {
  console.log(`${RED}${BOLD}── ERRORS (${errors.length}) ──${RESET}`);
  errors.forEach((e) => console.log(`  ${RED}✗${RESET} ${e}`));
} else {
  console.log(`${GREEN}${BOLD}── ERRORS: none ✓${RESET}`);
}
console.log('');
if (warnings.length) {
  console.log(`${YELLOW}${BOLD}── WARNINGS (${warnings.length}) ──${RESET}`);
  warnings.forEach((w) => console.log(`  ${YELLOW}⚠${RESET}  ${w}`));
  console.log('');
}

console.log(`${BOLD}════════════════════════════════════════${RESET}`);
console.log(`Result: ${errors.length} error(s), ${warnings.length} warning(s)`);
process.exit(errors.length ? 1 : 0);
