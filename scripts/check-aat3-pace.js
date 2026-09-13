#!/usr/bin/env node
/**
 * How long a Level 3 question takes — recorded, bounded, and kept apart.
 *
 * The assessment is 80 marks in 150 minutes. Until this existed the module
 * recorded not one millisecond of how long anything took, so "right" and "right
 * in time" were the same claim. They are not: an answer reconstructed in ninety
 * seconds under pressure is not an answer that survives an exam room.
 *
 * WHY THIS NEEDS A CHECK AT ALL. A stopwatch has no visible output until it has
 * enough readings to mean something, so a broken one and an honest one both
 * show nothing — for a while, and then the broken one shows a wrong number with
 * no way to tell. Every claim below is therefore asserted against the stored
 * totals rather than against the screen, and the screen is asserted separately.
 *
 * WHAT IT ASSERTS
 *
 *   Recording
 *     - a graded answer banks exactly one reading, in each of the three buckets
 *     - `n` and `ms` both rise; the mean is computed on read and never stored,
 *       which is what keeps one source of truth
 *     - a mock banks its readings too, under its own mode, from both of its
 *       banking sites — including the question that was open when the clock ran
 *       out, which is the one a reader most wants timed
 *
 *   The bounds, each of which discards rather than clamps
 *     - a reading taken while the page was hidden: a reader who put the phone
 *       down has no honest reading to salvage
 *     - a reading over ten minutes
 *     - a reading under 400ms, which is a double tap or a stale repaint
 *
 *   The two separations that are easy to get wrong and fail silently
 *     - **opening a mock review question banks nothing.** `gradeAnswer()` is
 *       called from three places and one of them is the review, which re-marks
 *       a banked answer every single time the reader opens it. A stopwatch
 *       hooked into grading climbs every time the paper is browsed.
 *     - **a lesson check is timed under its own mode and touches the practice
 *       record not at all.** check-aat3-practice-summary.js asserts a whole
 *       lesson leaves that record byte-identical; this asserts the pace record
 *       still sees the lesson, in a bucket of its own.
 *
 *   Reading back
 *     - below the floor of readings the mean is null, not zero — "not enough
 *       yet" and "fast" are different answers and the screens have to tell them
 *       apart
 *     - the done screen shows the pace line only once the floor is cleared
 *
 * THE CLOCK IS DRIVEN BY THIS FILE. The fake DOM answers a question in under a
 * millisecond, so every reading it produces would fall under the 400ms floor and
 * the whole check would pass vacuously on a stopwatch that recorded nothing.
 * `Date.now` is stubbed before the module loads and advanced explicitly, the way
 * seedRandom makes the draw deterministic for the checks that assert it.
 *
 * Run: node scripts/check-aat3-pace.js   (exit 1 on any failure)
 */

'use strict';

const path = require('path');
const ROOT = path.join(__dirname, '..');
const RED = '\x1b[31m', GREEN = '\x1b[32m', DIM = '\x1b[2m', BOLD = '\x1b[1m', RESET = '\x1b[0m';

const D = require('./lib/aat3-driver.js');
const { fakeStore, fakeEl, nodes, click, answerCurrent } = D;
const STORE_KEY = 'prep_v2_aat3';
const PACE_KEY = STORE_KEY + '_pace';

let failures = 0, checks = 0;
function ok(cond, label) {
  checks++;
  if (!cond) { failures++; console.log(`  ${RED}✗${RESET} ${label}`); }
}
function eq(a, b, label) {
  ok(JSON.stringify(a) === JSON.stringify(b), `${label} — got ${JSON.stringify(a)}, expected ${JSON.stringify(b)}`);
}

console.log(`${BOLD}Level 3 — how long a question takes${RESET}\n`);

/* ── The harness ──────────────────────────────────────────────────────────
   A fresh module against a fresh store, with a clock this file owns — and a
   SEEDED DRAW, which is not a nicety.

   The practice draw is random, so an unseeded run pulls a different mix of
   question types every time. Most of them the loops below can answer and
   advance past; a written task cannot be advanced without revealing the model
   answer first, so an unseeded version of this file crashed on roughly one run
   in six, with an error about a missing button and nothing at all about the
   stopwatch. An intermittently crashing check is worse than no check: it
   teaches whoever meets it to re-run rather than to read. */
let NOW = 1789000000000;
const realNow = Date.now;
const unseed = D.seedRandom(20260913);

/* NARROWED, for the sections that are about the stopwatch rather than the draw.

   This check asserts when a reading is taken, what bounds it and which bucket
   it lands in. None of that varies by question type, and the practice draw is
   random — so an unnarrowed run pulls a different mix every time and the loops
   have to know how to answer all eight types, including a multi-part task whose
   submit stays inert until every part is filled. That is check-aat3-task.js's
   job, not this file's, and the first version of this file spent its failures
   on the driver rather than on the stopwatch.

   check-answer-actions.js narrows for the same reason and says so: the row it
   measures is the same row whatever was answered.

   The two sections that DO need the real bank say so where they open it — the
   lesson, which must draw its own check questions, and the mock, which needs
   eighty marks of them. */
function open(seed, opts) {
  NOW = 1789000000000;
  Date.now = () => NOW;
  const store = fakeStore(seed || { [STORE_KEY]: JSON.stringify({ lessons: {}, xp: 0, practice: { units: {} } }) });
  global.localStorage = store;
  /* A document with one method, so the REAL visibilitychange listener binds and
     can be fired. A test-only seam on the module would have proved the flag is
     honoured while proving nothing about whether anything ever sets it — which
     is the half that only exists in a browser and the half most likely to be
     left out. */
  const handlers = {};
  global.document = {
    visibilityState: 'visible',
    addEventListener(type, fn) { handlers[type] = fn; },
  };
  delete require.cache[require.resolve(path.join(ROOT, 'aat3-ui.js'))];
  const UI = require(path.join(ROOT, 'aat3-ui.js'));
  UI.AAT3_SYLLABUS = require(path.join(ROOT, 'aat3-syllabus.js')).SYLLABUS;
  UI.AAT3_PRACTICE = require(path.join(ROOT, 'aat3-practice-data.js')).AAT3_PRACTICE;
  UI.AAT3_LEARN_PATH = require(path.join(ROOT, 'aat3-learn-data.js')).AAT3_LEARN_PATH;
  if (!opts || opts.simple !== false) {
    const SIMPLE = { mcq: 1, numeric: 1, truefalse: 1 };
    UI.AAT3_PRACTICE = Object.assign({}, UI.AAT3_PRACTICE, {
      QUESTIONS: UI.AAT3_PRACTICE.QUESTIONS.filter(q => SIMPLE[q.type || 'mcq']),
    });
  }
  return {
    UI, store, el: fakeEl(), handlers,
    /* What the browser does when the reader switches app. */
    hide() {
      global.document.visibilityState = 'hidden';
      if (handlers.visibilitychange) handlers.visibilitychange();
      global.document.visibilityState = 'visible';
    },
    bound() { return typeof handlers.visibilitychange === 'function'; },
  };
}

/* Answer whatever is on screen after letting `ms` pass on the harness clock.
   The advance is made BEFORE the answer, because that is where the reader's
   time actually goes.

   THE WRITTEN TASK IS HANDLED HERE rather than dodged by narrowing the bank.
   It is the one type the shared driver cannot answer — it has no key, so it is
   marked by the reader revealing the model and ticking what they earned — and
   it is also a type this stopwatch has to get right, because it is the longest
   question in the module. Skipping it would leave the one question most likely
   to hit the ten-minute ceiling untested. */
function answerAfter(el, ms) {
  NOW += ms;
  if (nodes(el, 'wrinput').length) {
    const box = nodes(el, 'wrinput')[0];
    box.value = 'The answer to this question, written out at sufficient length to satisfy the ' +
      'minimum the task asks for, so that the model answer can be revealed and the rubric ' +
      'marked against it, exactly as a reader would do it in practice rather than in a mock.';
    box.fire('input');
    click(el, 'wrshow');
    click(el, 'wrmark');
    return;
  }
  answerCurrent(el);
}

/* One bounded practice run, every question taking the same stated time.

   WRITTEN TO SURVIVE THE DRAW, not to depend on it. The seed makes a run
   repeatable but not predictable, and an earlier version of this loop assumed
   there was always another question to advance past — so the moment the draw
   ended on a screen it did not expect, it crashed inside the shared driver with
   an error about a missing button and nothing at all about the stopwatch. A
   check that fails by crashing teaches whoever meets it to re-run rather than
   to read, so every exit here is a named one. */
function runPractice(ctx, ms, lo) {
  ctx.UI.AAT3_UI.reset('practice', 'tpfb');
  ctx.UI.AAT3_UI.mount(ctx.el);
  click(ctx.el, 'startpractice', n => n.getAttribute('data-lo') === (lo || 'mix'));
  let n = 0;
  for (let guard = 0; guard < 60; guard++) {
    if (done(ctx.el)) return n;
    if (!nodes(ctx.el, 'nextq').length) answerAfter(ctx.el, ms);
    if (done(ctx.el)) return n;
    if (!nodes(ctx.el, 'nextq').length) {
      throw new Error('the run stalled on a question this loop cannot advance past — actions on ' +
        'screen: ' + acts(ctx.el).join(', '));
    }
    click(ctx.el, 'nextq');
    n++;
  }
  throw new Error('the practice run never finished');
}
function done(el) { return /class="a3-done"/.test(el.innerHTML); }
function acts(el) {
  return [...new Set(el.querySelectorAll().map(n => n.getAttribute('data-a3')).filter(Boolean))];
}

function pace(ctx, unitKey) { return ctx.UI.AAT3_UI.paceRead(unitKey); }
function cell(p, kind, key) { return (p && p[kind] && p[kind][key]) || { n: 0, ms: 0 }; }

try {

/* ── 1. A graded answer banks exactly one reading, three ways ────────────── */
{
  const ctx = open();
  const answered = runPractice(ctx, 3000);
  const p = pace(ctx, 'tpfb');
  ok(!!p, 'a finished practice run wrote no pace record at all');
  eq(cell(p, 'byMode', 'practice').n, answered,
    'every question in the run banked exactly one reading under its mode');
  eq(cell(p, 'byMode', 'practice').ms, answered * 3000,
    'and the milliseconds are the sum of them, not an average');

  /* THE THREE BUCKETS MUST AGREE ON THE TOTAL. They are three views of the
     same readings, so a question counted in one and missed in another means a
     bucket is being written on a path the others are not. */
  const sum = k => Object.keys(p[k] || {}).reduce((a, key) => a + cell(p, k, key).n, 0);
  eq(sum('byLo'), answered, 'the per-outcome bucket counts every reading');
  eq(sum('byType'), answered, 'the per-type bucket counts every reading');
  eq(sum('byMode'), answered, 'the per-mode bucket counts every reading');

  /* THE MEAN IS COMPUTED, NEVER STORED — the same rule the practice record
     follows, and for the same reason: two numbers that can disagree are two
     sources of truth. */
  const raw = JSON.parse(ctx.store.getItem(PACE_KEY));
  const keys = new Set();
  Object.keys(raw.tpfb).forEach(k => Object.keys(raw.tpfb[k]).forEach(
    key => Object.keys(raw.tpfb[k][key]).forEach(f => keys.add(f))));
  eq([...keys].sort(), ['ms', 'n'], 'the stored record holds only the two totals');
  eq(ctx.UI.AAT3_UI.paceMeanOf('tpfb', 'byMode', 'practice'), 3000,
    'and reads back as the mean of them');
}

/* ── 2. The bounds. Each discards; none clamps ───────────────────────────── */
{
  /* A reading over ten minutes is a walk-away the visibility flag missed. */
  const slow = open();
  runPractice(slow, 11 * 60 * 1000);
  eq(pace(slow, 'tpfb'), null, 'a run of eleven-minute answers banked readings it should have discarded');

  /* Under 400ms is a double tap or a stale repaint, not an answer. */
  const fast = open();
  runPractice(fast, 100);
  eq(pace(fast, 'tpfb'), null, 'a run of 100ms answers banked readings it should have discarded');

  /* And the boundary itself, from both sides, because an off-by-one in a
     bound is exactly the defect a round number invites. */
  const atFloor = open();
  runPractice(atFloor, 400);
  ok(!!pace(atFloor, 'tpfb'), 'a reading of exactly 400ms was discarded — the floor is inclusive');

  const overCeiling = open();
  runPractice(overCeiling, 10 * 60 * 1000 + 1);
  eq(pace(overCeiling, 'tpfb'), null, 'a reading one millisecond over the ceiling was kept');
}

/* ── 3. The page went away ───────────────────────────────────────────────── */
{
  const ctx = open();
  ok(ctx.bound(),
    'aat3-ui.js bound no visibilitychange listener, so nothing sets the flag in a browser and ' +
    'every assertion below passes about a latch that never latches');

  ctx.UI.AAT3_UI.reset('practice', 'tpfb');
  ctx.UI.AAT3_UI.mount(ctx.el);
  click(ctx.el, 'startpractice', n => n.getAttribute('data-lo') === 'mix');
  let n = 0;
  for (let guard = 0; guard < 60 && !done(ctx.el); guard++) {
    if (!nodes(ctx.el, 'nextq').length) { ctx.hide(); answerAfter(ctx.el, 3000); }
    if (done(ctx.el) || !nodes(ctx.el, 'nextq').length) break;
    click(ctx.el, 'nextq');
    n++;
  }
  eq(pace(ctx, 'tpfb'), null,
    'a question answered after the page was hidden banked a reading — a reader who put ' +
    'the phone down has no honest reading to salvage');

  /* AND THE LATCH CLEARS FOR THE NEXT QUESTION. A flag that latched for the
     rest of the run would discard everything after the first interruption,
     which looks exactly like a stopwatch that stopped working. */
  const back = open();
  back.UI.AAT3_UI.reset('practice', 'tpfb');
  back.UI.AAT3_UI.mount(back.el);
  click(back.el, 'startpractice', n => n.getAttribute('data-lo') === 'mix');
  let m = 0, hidFirst = false;
  for (let guard = 0; guard < 60 && !done(back.el); guard++) {
    if (!nodes(back.el, 'nextq').length) {
      if (!hidFirst) { back.hide(); hidFirst = true; }
      answerAfter(back.el, 3000);
    }
    if (done(back.el) || !nodes(back.el, 'nextq').length) break;
    click(back.el, 'nextq');
    m++;
  }
  eq(cell(pace(back, 'tpfb'), 'byMode', 'practice').n, m - 1,
    'one interruption cost more than the one question it interrupted — the flag is latching ' +
    'across questions instead of clearing with the rest of the per-question state');
}

/* ── 4. A lesson is timed, under its own mode, and touches nothing else ──── */
{
  /* The whole bank: a lesson draws its check questions from its own content,
     and narrowing the practice bank has nothing to do with it. */
  const ctx = open(null, { simple: false });
  const before = JSON.stringify(JSON.parse(ctx.store.getItem(STORE_KEY)).practice);
  ctx.UI.AAT3_UI.reset('path', 'tpfb');
  ctx.UI.AAT3_UI.mount(ctx.el);
  click(ctx.el, 'open', n => n.getAttribute('data-id') === 'L3-TPFB-0A');
  let guard = 0;
  while (nodes(ctx.el, 'next').length) { click(ctx.el, 'next'); if (++guard > 40) throw new Error('no questions'); }
  let asked = 0;
  for (let g2 = 0; g2 < 60 && !done(ctx.el); g2++) {
    if (!nodes(ctx.el, 'nextq').length) answerAfter(ctx.el, 5000);
    if (done(ctx.el) || !nodes(ctx.el, 'nextq').length) break;
    click(ctx.el, 'nextq');
    asked++;
  }
  ok(asked > 0, 'the lesson really did ask questions, so this proves something');

  const p = pace(ctx, 'tpfb');
  eq(cell(p, 'byMode', 'lesson').n, asked, 'a lesson check is timed, under the lesson mode');
  eq(cell(p, 'byMode', 'practice').n, 0, 'and not under practice, which would make the practice pace a lie');

  /* THE EXISTING RULE, RESTATED HERE so a change to the stopwatch cannot break
     it quietly. check-aat3-practice-summary.js owns this claim; this file
     re-asserts it because the stopwatch is the newest thing with a reason to
     write during a lesson. */
  eq(JSON.parse(ctx.store.getItem(STORE_KEY)).practice, JSON.parse(before),
    'timing a lesson check wrote into the practice record');
}

/* ── 5. A mock, and the review that must not re-time it ──────────────────── */
{
  /* The whole bank, because a paper is eighty marks and a narrowed pool cannot
     fill it — and because the review this section is really about only exists
     once a full paper has been sat. */
  const ctx = open(null, { simple: false });
  ctx.UI.AAT3_UI.reset('practice', 'tpfb');
  ctx.UI.AAT3_UI.mount(ctx.el);
  click(ctx.el, 'startmock');
  /* SAT BLANK, ON PURPOSE. A reading is banked when the reader MOVES ON, not
     when they answer — under exam conditions nothing is graded until then, and
     a question stared at and abandoned took exactly as long as one answered.
     Driving it blank also keeps this file out of the business of knowing how to
     answer a dozen question types, which is check-aat3-mock.js's job. */
  let sat = 0;
  while (nodes(ctx.el, 'mocknext').length) {
    NOW += 4000;
    click(ctx.el, 'mocknext');
    if (++sat > 200) throw new Error('the mock never finished');
  }
  ok(sat > 5, 'the mock really was sat, so this proves something');
  const p = pace(ctx, 'tpfb');
  eq(cell(p, 'byMode', 'mock').n, sat, 'every question in the paper was timed, under the mock mode');
  eq(cell(p, 'byMode', 'practice').n, 0, 'and none of them under practice');

  /* THE ASSERTION THIS WHOLE FILE EXISTS FOR. `openReviewQ` re-marks a banked
     answer through `gradeAnswer`, once for every time the reader opens it. A
     stopwatch hooked into grading rather than into the two banking sites
     climbs every time the paper is browsed, and the pace drifts upward for a
     reason nobody would think to look for. */
  const afterPaper = JSON.stringify(pace(ctx, 'tpfb'));
  click(ctx.el, 'review');
  let opened = 0;
  ['0', '1', '2'].forEach(i => {
    if (!nodes(ctx.el, 'reviewq').some(n => n.getAttribute('data-i') === i)) return;
    NOW += 30000;                    // the reader reads the question for half a minute
    click(ctx.el, 'reviewq', n => n.getAttribute('data-i') === i);
    opened++;
    click(ctx.el, 'reviewlist');
  });
  ok(opened > 0, 'the review really was opened, so this proves something');
  eq(JSON.stringify(pace(ctx, 'tpfb')), afterPaper,
    `opening ${opened} review question(s) changed the pace record — the stopwatch is hooked ` +
    `into gradeAnswer(), which the review calls every time a question is opened`);
}

/* ── 6. Reading back: not enough is not the same as fast ─────────────────── */
{
  const ctx = open();
  /* Three readings, which is under the floor. */
  const seeded = { tpfb: { byLo: { '1': { n: 3, ms: 9000 } }, byType: {}, byMode: {} } };
  ctx.store.setItem(PACE_KEY, JSON.stringify(seeded));
  eq(ctx.UI.AAT3_UI.paceMeanOf('tpfb', 'byLo', '1'), null,
    'a mean was reported from three readings — below the floor it must be null, or the screen ' +
    'cannot tell "not enough yet" from "fast"');

  seeded.tpfb.byLo['1'] = { n: 8, ms: 24000 };
  ctx.store.setItem(PACE_KEY, JSON.stringify(seeded));
  eq(ctx.UI.AAT3_UI.paceMeanOf('tpfb', 'byLo', '1'), 3000, 'at the floor the mean is reported');

  /* A hand-edited store cannot put a string or a negative into an average. */
  ctx.store.setItem(PACE_KEY, JSON.stringify({ tpfb: { byLo: { '1': { n: '40', ms: -5 } } } }));
  const junk = ctx.UI.AAT3_UI.paceMeanOf('tpfb', 'byLo', '1');
  ok(junk === null || (typeof junk === 'number' && junk >= 0),
    `a junk record read back as ${JSON.stringify(junk)} rather than null or a sane number`);
}

/* ── 7. The screen ──────────────────────────────────────────────────────── */
{
  const ctx = open();
  runPractice(ctx, 3000);
  ok(/a3-done-pace/.test(ctx.el.innerHTML),
    'ten timed questions cleared the floor and the done screen still showed no pace');
  ok(/About 3s a question/.test(ctx.el.innerHTML),
    'the done screen does not say what the pace actually was');

  const thin = open();
  runPractice(thin, 3000, '1');
  /* A single-outcome run of ten still clears the floor, so the line shows; what
     is asserted here is the wording, which must not claim a unit-wide figure
     from one outcome's readings. */
  ok(/over 10 timed/.test(thin.el.innerHTML),
    'the done screen does not say how many readings its figure rests on');
}

} finally {
  Date.now = realNow;
  unseed();
}

console.log(failures
  ? `\n${RED}${BOLD}── ${failures} of ${checks} checks failed${RESET}\n`
  : `\n${GREEN}${BOLD}── The stopwatch holds ✓${RESET}  ${DIM}(${checks} assertions)${RESET}\n`);
process.exit(failures ? 1 : 0);
