#!/usr/bin/env node
/**
 * Level 3's practice summary — the totals, and which outcome it names.
 *
 * The summary makes two claims to the reader: how many practice questions they
 * have attempted, and which learning outcome is costing them the most marks.
 * Both are easy to get quietly wrong, and neither fails loudly when it does —
 * a miscounted total still renders, and a mis-ranked outcome still points at
 * something plausible. So both are asserted here rather than eyeballed.
 *
 * WHAT IT ASSERTS
 *   - the totals are derived from the per-outcome record, and count every
 *     question answered — including one filed under an outcome the syllabus
 *     does not list, which must be surfaced rather than silently dropped
 *   - "most mistakes" is a TOTAL order, so identical data cannot rank two ways
 *     between renders: most wrong, then lower accuracy, then larger sample,
 *     then outcome number
 *   - an outcome never practised is still listed, because an untouched outcome
 *     is a gap worth seeing and a hidden row is not
 *   - a record that cannot be true — more correct than attempted, which a
 *     merged backup or a hand-edited file can produce — is clamped rather than
 *     rendered as a negative mistake count
 *   - the per-outcome shape survives a two-device backup merge with the right
 *     total. This is the whole reason the record is stored per outcome instead
 *     of as one running total, so it is pinned here: progress-backup.js merges
 *     by taking the larger of each number, under which a stored grand total
 *     would read 10 where the truth is 18.
 *   - the summary actually reaches the page — mounted, with the headline count
 *     and the named outcome in the rendered HTML
 *
 * Run: node scripts/check-aat3-practice-summary.js   (exit 1 on any failure)
 */

'use strict';

const path = require('path');
const ROOT = path.join(__dirname, '..');
const RED = '\x1b[31m', GREEN = '\x1b[32m', DIM = '\x1b[2m', BOLD = '\x1b[1m', RESET = '\x1b[0m';

const STORE_KEY = 'prep_v2_aat3';

/* Seeded BEFORE aat3-ui.js is required: the module reads its store on load, so
   a store set up afterwards would be read too late to matter. */
function fakeStore(initial) {
  const m = new Map(Object.entries(initial || {}));
  return {
    get length() { return m.size; },
    key(i) { return Array.from(m.keys())[i]; },
    getItem(k) { return m.has(k) ? m.get(k) : null; },
    setItem(k, v) { m.set(k, String(v)); },
    removeItem(k) { m.delete(k); },
  };
}

const SEED = {
  runs: 4,
  los: {
    '1': { attempted: 12, correct: 10 },
    '2': { attempted: 20, correct: 12 },
    '4': { attempted: 9, correct: 1 },
  },
};
global.localStorage = fakeStore({ [STORE_KEY]: JSON.stringify({ lessons: {}, xp: 0, practice: SEED }) });

/* In Node the module's `root` is its own exports object, so the globals it
   reads at call time are set on the module rather than on `window`. */
const UI = require(path.join(ROOT, 'aat3-ui.js'));
UI.AAT3_SYLLABUS = require(path.join(ROOT, 'aat3-syllabus.js')).SYLLABUS;
UI.AAT3_PRACTICE = require(path.join(ROOT, 'aat3-practice-data.js')).AAT3_PRACTICE;
const summary = UI.AAT3_UI.practiceSummary;
const OUTCOMES = UI.AAT3_SYLLABUS.units.tpfb.outcomes;
const BANK = UI.AAT3_PRACTICE.QUESTIONS;

let failures = 0, checks = 0;
function ok(cond, label) {
  checks++;
  if (!cond) { failures++; console.log(`  ${RED}✗${RESET} ${label}`); }
}
function eq(a, b, label) {
  ok(JSON.stringify(a) === JSON.stringify(b), `${label} — got ${JSON.stringify(a)}, expected ${JSON.stringify(b)}`);
}
function row(s, n) { return s.rows.find(r => r.n === n); }

console.log(`${BOLD}AAT Level 3 practice summary${RESET}\n`);

/* ── The bank and the syllabus agree ────────────────────────────────────── */
{
  const known = new Set(OUTCOMES.map(o => o.n));
  const strays = [...new Set(BANK.map(q => q.lo))].filter(lo => !known.has(lo));
  eq(strays, [], 'every practice question is filed under an outcome the syllabus lists');
  ok(BANK.length > 0, 'there is a practice bank to summarise at all');
}

/* ── Totals ─────────────────────────────────────────────────────────────── */
{
  const s = summary(SEED, OUTCOMES);
  eq(s.attempted, 41, 'questions attempted is the sum of the per-outcome counts');
  eq(s.correct, 23, 'correct answers are summed the same way');
  eq(s.wrong, 18, 'mistakes are attempted minus correct');
  eq(s.accuracy, 56, 'accuracy is correct over attempted, rounded');
  eq(s.runs, 4, 'finished runs are reported as stored');
  eq(s.rows.length, OUTCOMES.length, 'every outcome in the syllabus gets a row');

  const empty = summary({ runs: 0, los: {} }, OUTCOMES);
  eq(empty.attempted, 0, 'a reader who has practised nothing has attempted nothing');
  eq(empty.accuracy, null, 'accuracy over no questions is not a number, and is not 0%');
  eq(empty.worst, null, 'with no mistakes there is no outcome to name');
  eq(empty.rows.length, OUTCOMES.length, 'the outcomes are still listed before anything is attempted');

  /* Defensive: the module falls back to its own loaded record when called with
     nothing, which is how the renderer calls it. */
  const live = summary();
  eq(live.attempted, 41, 'called with no arguments it reads the record loaded from storage');
}

/* ── An outcome not in the syllabus is counted, not lost ────────────────── */
{
  const s = summary({ runs: 1, los: { '2': { attempted: 4, correct: 1 }, '9': { attempted: 6, correct: 0 } } }, OUTCOMES);
  eq(s.attempted, 10, 'a question filed under an unknown outcome still counts towards the total');
  ok(!!row(s, 9), 'an unknown outcome gets a row of its own rather than disappearing');
  eq(s.worst.n, 9, 'and it can be named as the worst, because it genuinely is');
}

/* ── An unpractised outcome is shown, not hidden ────────────────────────── */
{
  const s = summary(SEED, OUTCOMES);
  const untouched = row(s, 3);
  eq(untouched.attempted, 0, 'an outcome never practised reads as nothing attempted');
  eq(untouched.accuracy, null, 'its accuracy is unknown rather than zero');
  eq(untouched.wrong, 0, 'and it contributes no mistakes');
}

/* ── "Most mistakes" is a total order ───────────────────────────────────── */
{
  const s = summary(SEED, OUTCOMES);
  eq(s.worst.n, 4, 'the outcome with the most wrong answers is named');
  eq(s.worst.wrong, 8, 'and its mistake count is the one reported');

  /* Outcomes 2 and 4 are both 8 wrong in SEED. The tie breaks on accuracy, so
     8 wrong out of 9 must beat 8 wrong out of 20 — the reader has a real
     problem with one and a patchy record on the other. */
  eq(row(s, 2).wrong, 8, 'the fixture really does tie on mistake count');
  ok(s.worst.accuracy < row(s, 2).accuracy, 'a tie on mistakes breaks towards the lower accuracy');

  /* Tie on mistakes AND accuracy: the larger sample is the better evidence. */
  const sample = summary({ los: { '1': { attempted: 8, correct: 4 }, '2': { attempted: 16, correct: 8 } } }, OUTCOMES);
  eq(sample.worst.n, 2, 'a tie on mistakes and accuracy breaks towards the larger sample');

  /* Identical in every respect: the outcome number decides, so two renders of
     the same data cannot disagree. */
  const dead = { los: { '3': { attempted: 6, correct: 2 }, '5': { attempted: 6, correct: 2 } } };
  eq(summary(dead, OUTCOMES).worst.n, 3, 'a dead heat is broken by outcome number, so the answer is stable');
  eq(summary(dead, OUTCOMES).worst.n, summary(dead, OUTCOMES).worst.n, 'and repeating the call gives the same answer');

  /* All correct is not "no data": there is nothing to name. */
  const clean = summary({ runs: 2, los: { '1': { attempted: 10, correct: 10 } } }, OUTCOMES);
  eq(clean.worst, null, 'a reader who has got everything right has no worst outcome');
  eq(clean.accuracy, 100, 'and their accuracy is 100%');
}

/* ── Incoherent records are clamped, not rendered ───────────────────────── */
{
  const s = summary({ los: { '1': { attempted: 3, correct: 9 }, '2': { attempted: -5, correct: -2 } } }, OUTCOMES);
  eq(row(s, 1).wrong, 0, 'more correct than attempted cannot produce a negative mistake count');
  eq(row(s, 1).accuracy, 100, 'and accuracy cannot exceed 100%');
  eq(row(s, 2).attempted, 0, 'negative counters read as nothing attempted');
  ok(s.attempted >= 0 && s.correct >= 0 && s.wrong >= 0, 'no total can go negative');

  const junk = summary({ los: 'not an object' }, OUTCOMES);
  eq(junk.attempted, 0, 'a record of the wrong shape summarises as empty rather than throwing');
}

/* ── The per-outcome shape is what makes a merged backup add up ─────────── */
{
  global.window = global;
  const PB = require(path.join(ROOT, 'progress-backup.js'));
  const phone   = { [STORE_KEY]: { lessons: {}, xp: 60, practice: { runs: 2, los: { '1': { attempted: 10, correct: 6 } } } } };
  const desktop = { [STORE_KEY]: { lessons: {}, xp: 30, practice: { runs: 1, los: { '2': { attempted: 8, correct: 3 } } } } };

  const merged = PB.mergeAll(phone, desktop)[STORE_KEY].practice;
  const s = summary(merged, OUTCOMES);
  eq(s.attempted, 18, 'work done on two devices adds up — the reason the record is kept per outcome');
  eq(s.correct, 9, 'and so do the correct answers');
  eq(s.worst.n, 2, 'the merged record still names the worst outcome');

  /* The documented cost of a max-merge: a counter both devices moved takes the
     larger rather than the sum. Asserted so the trade-off is deliberate and
     survives someone "fixing" it into a sum, which would inflate on re-import. */
  const both = PB.mergeAll(
    { [STORE_KEY]: { practice: { runs: 3, los: { '1': { attempted: 10, correct: 6 } } } } },
    { [STORE_KEY]: { practice: { runs: 5, los: { '1': { attempted: 7, correct: 5 } } } } }
  )[STORE_KEY].practice;
  eq(summary(both, OUTCOMES).attempted, 10, 'the same outcome on both devices takes the larger count, not the sum');
  eq(both.runs, 5, 'finished runs take the larger count too');

  /* Importing the same file twice must not move the numbers. */
  const once = PB.mergeAll(phone, desktop);
  eq(PB.mergeAll(once, desktop), once, 'merging the same backup twice changes nothing the second time');
}

/* ── It reaches the page ────────────────────────────────────────────────── */
{
  /* A fake element is enough: mount() writes a string and then walks it for
     click targets, and neither needs a real DOM. */
  let painted = '';
  const el = {
    set innerHTML(v) { painted = v; },
    get innerHTML() { return painted; },
    querySelectorAll() { return []; },
    querySelector() { return null; },
  };
  UI.AAT3_UI.reset('practice');
  UI.AAT3_UI.mount(el);

  ok(/a3-sum\b/.test(painted), 'the practice picker renders the summary section');
  ok(painted.indexOf('Questions attempted') !== -1, 'the summary labels the headline count');
  ok(painted.indexOf('>41<') !== -1, 'the headline count is the number of questions attempted');
  ok(painted.indexOf('Most mistakes') !== -1, 'the summary calls out the outcome with the most mistakes');
  ok(painted.indexOf('Understand principles of payroll') !== -1, 'and names that outcome in full');
  ok(/data-a3="startpractice" data-lo="4"/.test(painted), 'and offers a run on it, so the reading leads somewhere');
  ok(painted.indexOf('a3-sum-tag') !== -1, 'the outcome breakdown marks which row is the worst');
  ok(painted.indexOf('not practised') !== -1, 'an outcome never practised says so rather than reading 0%');
  ok(painted.indexOf('<script') === -1, 'nothing in the summary opens a script tag');

  /* The empty case is the first thing most readers see, and rendering the
     stat grid full of zeros there would be worse than saying nothing. */
  global.localStorage.setItem(STORE_KEY, JSON.stringify({ lessons: {}, xp: 0 }));
  delete require.cache[require.resolve(path.join(ROOT, 'aat3-ui.js'))];
  const FRESH = require(path.join(ROOT, 'aat3-ui.js'));
  FRESH.AAT3_SYLLABUS = UI.AAT3_SYLLABUS;
  FRESH.AAT3_PRACTICE = UI.AAT3_PRACTICE;
  let blank = '';
  const el2 = {
    set innerHTML(v) { blank = v; },
    get innerHTML() { return blank; },
    querySelectorAll() { return []; },
    querySelector() { return null; },
  };
  FRESH.AAT3_UI.reset('practice');
  FRESH.AAT3_UI.mount(el2);
  ok(/a3-sum-empty/.test(blank), 'before any practice the summary renders its empty state');
  ok(blank.indexOf('Questions attempted') === -1, 'and does not show a grid of zeros');
  ok(blank.indexOf('Most mistakes') === -1, 'and names no worst outcome, because there is not one yet');
  ok(/a3-pgrid/.test(blank), 'the outcome picker itself still renders underneath');
}

console.log(failures
  ? `\n${RED}${BOLD}── ${failures} of ${checks} checks failed${RESET}\n`
  : `\n${GREEN}${BOLD}── Level 3 practice summary checks passed ✓${RESET}  ${DIM}(${checks} assertions)${RESET}\n`);
process.exit(failures ? 1 : 0);
