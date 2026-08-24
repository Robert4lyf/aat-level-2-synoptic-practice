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
 *     and the named outcome inside the summary section itself. Scoped to that
 *     section on purpose: the practice picker below renders its own
 *     "start outcome 4" button, so a page-wide search for one passes with the
 *     summary deleted, which is how the first version of this check reported
 *     green on a summary that was not there.
 *   - answering questions actually moves the numbers. mount() walks the HTML it
 *     writes and binds click handlers, so a fake element that keeps those
 *     handlers is a driver: the check plays a whole practice run through the
 *     real code and reads the record back, rather than trusting that the thing
 *     computing the summary is ever fed anything.
 *
 * Run: node scripts/check-aat3-practice-summary.js   (exit 1 on any failure)
 */

'use strict';

const path = require('path');
const ROOT = path.join(__dirname, '..');
const RED = '\x1b[31m', GREEN = '\x1b[32m', DIM = '\x1b[2m', BOLD = '\x1b[1m', RESET = '\x1b[0m';

const STORE_KEY = 'prep_v2_aat3';

/* The driver, the store stand-in and the module loader are shared with
   check-aat3-answer-position.js — see scripts/lib/aat3-driver.js for why an
   object with two DOM methods is enough to drive the real player.

   The store is seeded BEFORE aat3-ui.js is required: the module reads it on
   load, so one set up afterwards would be read too late to matter. */
const D = require('./lib/aat3-driver.js');
const { fakeStore, fakeEl, nodes, click, answerCurrent } = D;

const SEED = {
  runs: 4,
  los: {
    '1': { attempted: 12, correct: 10 },
    '2': { attempted: 20, correct: 12 },
    '4': { attempted: 9, correct: 1 },
  },
};
/* On disk the record is nested per unit: outcome numbers restart at 1 in every
   unit, so one flat map would add FAPS outcome 1 to TPFB outcome 1. */
const STORED = { units: { tpfb: SEED } };
global.localStorage = fakeStore({ [STORE_KEY]: JSON.stringify({ lessons: {}, xp: 0, practice: STORED }) });

/* In Node the module's `root` is its own exports object, so the globals it
   reads at call time are set on the module rather than on `window`. */
const UI = require(path.join(ROOT, 'aat3-ui.js'));
UI.AAT3_SYLLABUS = require(path.join(ROOT, 'aat3-syllabus.js')).SYLLABUS;
UI.AAT3_PRACTICE = require(path.join(ROOT, 'aat3-practice-data.js')).AAT3_PRACTICE;
UI.AAT3_LEARN_PATH = require(path.join(ROOT, 'aat3-learn-data.js')).AAT3_LEARN_PATH;
const summary = UI.AAT3_UI.practiceSummary;
const OUTCOMES = UI.AAT3_SYLLABUS.units.tpfb.outcomes;
const FAPS_OUTCOMES = UI.AAT3_SYLLABUS.units.faps.outcomes;
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

  /* THE HEADLINE RULE, and the one the fixtures above do not separate: the
     question is "most mistakes", so a big outcome answered badly must beat a
     tiny one answered worse. Outcome 1 has 8 wrong at 60%; outcome 2 has 3
     wrong at 25%. Ranking on accuracy would name outcome 2 and be answering a
     different question. */
  const volume = summary({ los: { '1': { attempted: 20, correct: 12 }, '2': { attempted: 4, correct: 1 } } }, OUTCOMES);
  eq(volume.worst.n, 1, 'most mistakes outranks worst accuracy — that is the question being asked');
  ok(volume.worst.accuracy > row(volume, 2).accuracy, 'and it wins despite having the better accuracy of the two');

  /* Outcomes 2 and 4 are both 8 wrong in SEED. The tie breaks on accuracy, so
     8 wrong out of 9 must beat 8 wrong out of 20 — the reader has a real
     problem with one and a patchy record on the other. */
  eq(row(s, 2).wrong, 8, 'the fixture really does tie on mistake count');
  eq(s.worst.n, 4, 'a tie on mistakes breaks towards the lower accuracy');
  ok(s.worst.accuracy < row(s, 2).accuracy, 'and the one it picked really is the less accurate');

  /* Tie on mistakes AND accuracy: only reachable through rounding, because
     equal mistakes at equal accuracy otherwise pins the sample size. One wrong
     in twelve and one in thirteen both round to 92%, so this is a genuine tie
     rather than the mistake-count rule wearing a disguise — the earlier version
     of this fixture was 4 wrong against 8 and tested nothing. */
  const sample = summary({ los: { '1': { attempted: 12, correct: 11 }, '2': { attempted: 13, correct: 12 } } }, OUTCOMES);
  eq([row(sample, 1).wrong, row(sample, 2).wrong], [1, 1], 'the fixture ties on mistakes');
  eq([row(sample, 1).accuracy, row(sample, 2).accuracy], [92, 92], 'and ties on accuracy after rounding');
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

  /* A key that is not a number would become NaN, and a comparator that returns
     NaN leaves the sort order undefined — so the "total order" the ranking
     rests on would quietly stop being one. */
  const odd = summary({ los: { mix: { attempted: 5, correct: 1 }, '2': { attempted: 5, correct: 1 } } }, OUTCOMES);
  eq(odd.attempted, 10, 'a non-numeric key still counts towards the total');
  ok(odd.rows.some(r => r.n === 'mix'), 'and is carried through as itself rather than as NaN');
  eq(odd.worst.n, 2, 'a real outcome outranks a junk key on an otherwise exact tie');
  eq(summary({ los: { mix: { attempted: 5, correct: 1 }, '2': { attempted: 5, correct: 1 } } }, OUTCOMES).worst.n,
     odd.worst.n, 'and the ranking is still stable across calls');
}

/* ── The per-outcome shape is what makes a merged backup add up ─────────── */
{
  global.window = global;
  const PB = require(path.join(ROOT, 'progress-backup.js'));
  const phone   = { [STORE_KEY]: { lessons: {}, xp: 60, practice: { units: { tpfb: { runs: 2, los: { '1': { attempted: 10, correct: 6 } } } } } } };
  const desktop = { [STORE_KEY]: { lessons: {}, xp: 30, practice: { units: { tpfb: { runs: 1, los: { '2': { attempted: 8, correct: 3 } } } } } } };

  const merged = PB.mergeAll(phone, desktop)[STORE_KEY].practice.units.tpfb;
  const s = summary(merged, OUTCOMES);
  eq(s.attempted, 18, 'work done on two devices adds up — the reason the record is kept per outcome');
  eq(s.correct, 9, 'and so do the correct answers');
  eq(s.worst.n, 2, 'the merged record still names the worst outcome');

  /* The documented cost of a max-merge: a counter both devices moved takes the
     larger rather than the sum. Asserted so the trade-off is deliberate and
     survives someone "fixing" it into a sum, which would inflate on re-import. */
  const both = PB.mergeAll(
    { [STORE_KEY]: { practice: { units: { tpfb: { runs: 3, los: { '1': { attempted: 10, correct: 6 } } } } } } },
    { [STORE_KEY]: { practice: { units: { tpfb: { runs: 5, los: { '1': { attempted: 7, correct: 5 } } } } } } }
  )[STORE_KEY].practice.units.tpfb;
  eq(summary(both, OUTCOMES).attempted, 10, 'the same outcome on both devices takes the larger count, not the sum');
  eq(both.runs, 5, 'finished runs take the larger count too');

  /* Importing the same file twice must not move the numbers. */
  const once = PB.mergeAll(phone, desktop);
  eq(PB.mergeAll(once, desktop), once, 'merging the same backup twice changes nothing the second time');
}

/* A learn path carrying BOTH units, so the two blocks below test per-unit
   behaviour as a property of the code rather than of how much FAPS has been
   authored so far. A unit only reaches the picker once it has some content, so
   without this stub the FAPS half of these assertions would quietly pass by
   falling back to TPFB — and would go on quietly passing after FAPS shipped. */
const TWO_UNIT_PATH = UI.AAT3_LEARN_PATH.concat(
  UI.AAT3_LEARN_PATH.some(g => g.unit === 'faps')
    ? []
    : [{ unit: 'faps', level: 3, title: 'Financial Accounting: Preparing Financial Statements',
         outcome: 1, outcomeTitle: 'Understand the accounting principles underlying final accounts preparation',
         weighting: 5, lessons: [] }]
);

/* ── The record is per unit, and old records still work ─────────────────── */
{
  /* Outcome numbers restart at 1 in every unit. A flat record would add FAPS
     outcome 1 to TPFB outcome 1 and name a weakest outcome belonging to
     neither, which is worse than reporting nothing. */
  const store = fakeStore({
    [STORE_KEY]: JSON.stringify({
      practice: {
        units: {
          tpfb: { runs: 2, los: { '1': { attempted: 10, correct: 9 } } },
          faps: { runs: 1, los: { '1': { attempted: 10, correct: 1 } } },
        },
      },
    }),
  });
  global.localStorage = store;
  delete require.cache[require.resolve(path.join(ROOT, 'aat3-ui.js'))];
  const M = require(path.join(ROOT, 'aat3-ui.js'));
  M.AAT3_SYLLABUS = UI.AAT3_SYLLABUS;
  M.AAT3_PRACTICE = UI.AAT3_PRACTICE;
  M.AAT3_LEARN_PATH = TWO_UNIT_PATH;

  M.AAT3_UI.reset('path', 'tpfb');
  const t = M.AAT3_UI.practiceSummary();
  eq(t.attempted, 10, 'the summary reports the active unit only, not every unit added together');
  eq(t.correct, 9, 'and its correct count is that unit\'s');
  eq(t.worst.n, 1, 'TPFB outcome 1 is the only outcome with a mistake in it');
  eq(t.wrong, 1, 'one wrong in TPFB, not the eleven a flat record would report');

  M.AAT3_UI.reset('path', 'faps');
  const f = M.AAT3_UI.practiceSummary();
  ok(f.rows.length === FAPS_OUTCOMES.length, 'the FAPS summary really is FAPS — nine outcomes, not TPFB\'s five');
  eq(f.attempted, 10, 'switching unit switches the whole summary');
  eq(f.wrong, 9, 'and FAPS outcome 1 keeps its own nine mistakes');
  ok(t.rows[0].title !== f.rows[0].title, 'the two units\' outcome 1 are different outcomes with different titles');
}

/* ── Migrating a record written before there was a second unit ───────────── */
{
  /* The shape that shipped one change ago: `runs` and `los` at the top level,
     because Level 3 was one unit. Those counters can only be TPFB's. */
  const legacy = { runs: 3, los: { '2': { attempted: 12, correct: 7 } } };
  const store = fakeStore({ [STORE_KEY]: JSON.stringify({ lessons: { 'x': { best: 70 } }, xp: 90, practice: legacy }) });
  global.localStorage = store;
  delete require.cache[require.resolve(path.join(ROOT, 'aat3-ui.js'))];
  const M = require(path.join(ROOT, 'aat3-ui.js'));
  M.AAT3_SYLLABUS = UI.AAT3_SYLLABUS;
  M.AAT3_PRACTICE = UI.AAT3_PRACTICE;
  M.AAT3_LEARN_PATH = TWO_UNIT_PATH;
  M.AAT3_UI.reset('path', 'tpfb');

  const s2 = M.AAT3_UI.practiceSummary();
  eq(s2.attempted, 12, 'a record written before FAPS existed is read, not discarded');
  eq(s2.correct, 7, 'with its correct count intact');
  eq(s2.runs, 3, 'and its finished runs');
  eq(s2.worst.n, 2, 'and it still names the right outcome');

  M.AAT3_UI.reset('path', 'faps');
  eq(M.AAT3_UI.practiceSummary().attempted, 0, 'the migrated work lands under TPFB and not under FAPS');

  /* Idempotent, and the newer figure survives. Re-importing an old backup over
     a migrated store must not double-count and must not overwrite. */
  global.window = global;
  const PB2 = require(path.join(ROOT, 'progress-backup.js'));
  const migrated = { [STORE_KEY]: { practice: { units: { tpfb: { runs: 5, los: { '2': { attempted: 20, correct: 11 } } } } } } };
  const reimported = PB2.mergeAll(migrated, { [STORE_KEY]: { practice: legacy } })[STORE_KEY];
  const store2 = fakeStore({ [STORE_KEY]: JSON.stringify(reimported) });
  global.localStorage = store2;
  delete require.cache[require.resolve(path.join(ROOT, 'aat3-ui.js'))];
  const M2 = require(path.join(ROOT, 'aat3-ui.js'));
  M2.AAT3_SYLLABUS = UI.AAT3_SYLLABUS;
  M2.AAT3_PRACTICE = UI.AAT3_PRACTICE;
  M2.AAT3_LEARN_PATH = TWO_UNIT_PATH;
  M2.AAT3_UI.reset('path', 'tpfb');
  const s3 = M2.AAT3_UI.practiceSummary();
  eq(s3.attempted, 20, 'an old backup re-imported over a migrated store neither double-counts nor overwrites the newer figure');
  eq(s3.runs, 5, 'and the higher run count is the one kept');
}

/* ── Answering questions moves the numbers ──────────────────────────────── */
{
  /* A fixed seed so the draw, the option order and therefore the score are the
     same on every run. A build gate that reports a different thing each time is
     not a gate. */
  const restoreRandom = D.seedRandom(20260824);

  const store = fakeStore();
  global.localStorage = store;
  delete require.cache[require.resolve(path.join(ROOT, 'aat3-ui.js'))];
  const APP = require(path.join(ROOT, 'aat3-ui.js'));
  APP.AAT3_SYLLABUS = UI.AAT3_SYLLABUS;
  APP.AAT3_PRACTICE = UI.AAT3_PRACTICE;
  APP.AAT3_LEARN_PATH = UI.AAT3_LEARN_PATH;

  const el = fakeEl();
  APP.AAT3_UI.reset('practice', 'tpfb');
  APP.AAT3_UI.mount(el);
  ok(/a3-sum-empty/.test(el.innerHTML), 'a reader with no history is shown the empty state');

  /* One full run on outcome 4. */
  click(el, 'startpractice', n => n.getAttribute('data-lo') === '4');
  let answered = 0;
  while (!/a3-done\b/.test(el.innerHTML)) {
    answerCurrent(el);
    click(el, 'nextq');
    answered++;
    if (answered > 40) throw new Error('the run never finished');
  }
  eq(answered, 10, 'a practice run is ten questions');

  /* The app's own score, read off the screen it just drew. */
  const scored = /(\d+) of (\d+) correct/.exec(el.innerHTML);
  ok(!!scored, 'the done screen reports a score to check the record against');
  const score = Number(scored[1]);

  const rec = JSON.parse(store.getItem(STORE_KEY)).practice.units.tpfb;
  eq(rec.los['4'].attempted, 10, 'every answered question was recorded as attempted');
  eq(rec.los['4'].correct, score, 'and the correct count matches the score the app itself reported');
  ok(score < 10, 'the driver got at least one wrong, so a right/wrong mix was actually exercised');
  eq(rec.runs, 1, 'finishing the run counted it');
  eq(Object.keys(rec.los), ['4'], 'nothing was recorded against an outcome that was not practised');

  /* Back to the picker: the summary must now be showing that run. */
  click(el, 'exit');
  const shown = APP.AAT3_UI.practiceSummary();
  eq(shown.attempted, 10, 'the summary reports what was just answered');
  eq(shown.correct, score, 'and agrees with the app about how many were right');
  eq(shown.worst.n, 4, 'and names the only outcome with mistakes in it');

  /* Leaving a run half way. The count claims to be questions ATTEMPTED, so
     three answered and abandoned must be three, not nothing. */
  click(el, 'startpractice', n => n.getAttribute('data-lo') === '1');
  for (let i = 0; i < 3; i++) { answerCurrent(el); click(el, 'nextq'); }
  click(el, 'exit');
  const after = JSON.parse(store.getItem(STORE_KEY)).practice.units.tpfb;
  eq(after.los['1'].attempted, 3, 'questions answered in an abandoned run still count as attempted');
  eq(after.runs, 1, 'but the abandoned run is not counted as finished');
  eq(APP.AAT3_UI.practiceSummary().attempted, 13, 'and the summary totals both runs');

  /* A LESSON MUST NOT TOUCH THIS RECORD. The summary says "practice questions
     only", and the lesson player runs through the same grading, the same
     next-question button and the same handler — the only thing keeping the two
     apart is one mode check. Drive a whole lesson and show the count does not
     move. */
  const beforeLesson = JSON.stringify(JSON.parse(store.getItem(STORE_KEY)).practice);
  APP.AAT3_UI.reset('path', 'tpfb');
  APP.AAT3_UI.mount(el);
  click(el, 'open', n => n.getAttribute('data-id') === 'L3-TPFB-0A');
  let guard = 0;
  while (nodes(el, 'next').length) { click(el, 'next'); if (++guard > 40) throw new Error('lesson never reached its questions'); }
  let lessonQs = 0;
  while (nodes(el, 'nextq').length || !/a3-done\b/.test(el.innerHTML)) {
    if (!nodes(el, 'nextq').length) answerCurrent(el);
    click(el, 'nextq');
    lessonQs++;
    if (lessonQs > 40) throw new Error('the lesson never finished');
  }
  ok(lessonQs > 0, 'the lesson really did ask questions, so this proves something');
  eq(JSON.parse(store.getItem(STORE_KEY)).practice, JSON.parse(beforeLesson),
     'answering a lesson check changes nothing in the practice record');
  ok(!!JSON.parse(store.getItem(STORE_KEY)).lessons['L3-TPFB-0A'],
     'while the lesson itself was recorded, so the lesson really was completed');

  /* Survives a reload — the record is on disk, not in memory. */
  delete require.cache[require.resolve(path.join(ROOT, 'aat3-ui.js'))];
  const RELOADED = require(path.join(ROOT, 'aat3-ui.js'));
  RELOADED.AAT3_SYLLABUS = UI.AAT3_SYLLABUS;
  RELOADED.AAT3_PRACTICE = UI.AAT3_PRACTICE;
  RELOADED.AAT3_LEARN_PATH = UI.AAT3_LEARN_PATH;
  RELOADED.AAT3_UI.reset('path', 'tpfb');
  eq(RELOADED.AAT3_UI.practiceSummary().attempted, 13, 'the record survives a reload');

  restoreRandom();
}

/* ── It reaches the page ────────────────────────────────────────────────── */
{
  global.localStorage = fakeStore({ [STORE_KEY]: JSON.stringify({ lessons: {}, xp: 0, practice: STORED }) });
  delete require.cache[require.resolve(path.join(ROOT, 'aat3-ui.js'))];
  const PAGE = require(path.join(ROOT, 'aat3-ui.js'));
  PAGE.AAT3_SYLLABUS = UI.AAT3_SYLLABUS;
  PAGE.AAT3_PRACTICE = UI.AAT3_PRACTICE;
  PAGE.AAT3_LEARN_PATH = UI.AAT3_LEARN_PATH;

  const el = fakeEl();
  PAGE.AAT3_UI.reset('practice', 'tpfb');
  PAGE.AAT3_UI.mount(el);
  const page = el.innerHTML;

  /* SCOPED TO THE SECTION. The picker underneath renders its own
     "start outcome 4" button and its own outcome titles, so a page-wide search
     passes with the summary deleted — which is exactly what the first version
     of this check did. */
  const open = page.indexOf('<section class="a3-sum');
  ok(open !== -1, 'the practice picker renders the summary section');
  const sum = page.slice(open, page.indexOf('</section>', open));
  ok(/a3-pgrid/.test(page), 'and the outcome picker still renders underneath it');

  ok(sum.indexOf('Questions attempted') !== -1, 'the summary labels the headline count');
  ok(sum.indexOf('>41<') !== -1, 'the headline count is the number of questions attempted');
  ok(sum.indexOf('Most mistakes') !== -1, 'the summary calls out the outcome with the most mistakes');
  ok(sum.indexOf('Understand principles of payroll') !== -1, 'and names that outcome in full');
  ok(/data-a3="startpractice" data-lo="4"/.test(sum), 'and offers a run on it, so the reading leads somewhere');
  ok(sum.indexOf('a3-sum-tag') !== -1, 'the outcome breakdown marks which row is the worst');
  ok(sum.indexOf('not practised') !== -1, 'an outcome never practised says so rather than reading 0%');
  ok(!/aria-valuenow="0"/.test(sum), 'and its empty bar is not announced as a reading of nought per cent');
  ok(/role="progressbar"/.test(sum), 'while a bar that does have a reading is announced');
  ok(sum.indexOf('<script') === -1, 'nothing in the summary opens a script tag');

  /* The empty case is the first thing most readers see, and rendering the
     stat grid full of zeros there would be worse than saying nothing. */
  global.localStorage = fakeStore({ [STORE_KEY]: JSON.stringify({ lessons: {}, xp: 0 }) });
  delete require.cache[require.resolve(path.join(ROOT, 'aat3-ui.js'))];
  const FRESH = require(path.join(ROOT, 'aat3-ui.js'));
  FRESH.AAT3_SYLLABUS = UI.AAT3_SYLLABUS;
  FRESH.AAT3_PRACTICE = UI.AAT3_PRACTICE;
  FRESH.AAT3_LEARN_PATH = UI.AAT3_LEARN_PATH;
  const el2 = fakeEl();
  FRESH.AAT3_UI.reset('practice', 'tpfb');
  FRESH.AAT3_UI.mount(el2);
  const blank = el2.innerHTML;
  ok(/a3-sum-empty/.test(blank), 'before any practice the summary renders its empty state');
  ok(blank.indexOf('Questions attempted') === -1, 'and does not show a grid of zeros');
  ok(blank.indexOf('Most mistakes') === -1, 'and names no worst outcome, because there is not one yet');
  ok(/a3-pgrid/.test(blank), 'the outcome picker itself still renders underneath');
}

console.log(failures
  ? `\n${RED}${BOLD}── ${failures} of ${checks} checks failed${RESET}\n`
  : `\n${GREEN}${BOLD}── Level 3 practice summary checks passed ✓${RESET}  ${DIM}(${checks} assertions)${RESET}\n`);
process.exit(failures ? 1 : 0);
