#!/usr/bin/env node
/**
 * Cover-the-options — recall before recognition, and the measurement it makes.
 *
 * Every multiple choice in this app has been letting recognition stand in for
 * recall. Four options are four hints: a reader who could not have produced the
 * answer can very often still point at it, scores well, and finds out in the
 * exam that pointing was all they could do. The covered run takes the options
 * away until the reader says they have an answer — and the gap between those
 * two taps is the thing nothing has ever measured, namely how long they needed
 * before the options could have rescued them.
 *
 * WHAT IT ASSERTS
 *
 *   The cover itself
 *     - the options are ABSENT FROM THE PAGE, not hidden by CSS. This is the
 *       assertion the whole mode rests on: hidden text can be selected, and it
 *       is read out by a screen reader, so a retrieval exercise defeated by
 *       looking harder is not one. Every option string is checked against the
 *       painted HTML, not just the absence of the buttons.
 *     - the reveal is ONE WAY while a question is on screen, and CLEARS between
 *       questions — a flag that survived would uncover the whole rest of the
 *       run from the first question the reader asked about
 *     - the handler refuses a pick while covered, not merely the renderer. A
 *       stale node from the previous repaint is fired at a covered question,
 *       which is the shape a double-tap actually takes here.
 *
 *   What it draws
 *     - multiple choices only, and weighted across the outcomes the way a mixed
 *       run is. The format narrows; the weighting does not.
 *     - the run is not offered at all below COVER_MIN_N live multiple choices,
 *       and retirement counts against that
 *
 *   The measurement
 *     - the GAP lands in `byGap`, keyed by outcome, and nowhere else
 *     - the WHOLE answer lands in byLo, byType and byMode exactly once, with
 *       byMode under 'covered' rather than 'practice'
 *     - THE TWO ARE NEVER MIXED. byGap holds a part of an answer and the other
 *       three hold whole ones; a gap filed as a mode would be summed in by
 *       paceOverall() and reported as a pace nobody ever took. That is the
 *       arithmetic error this record exists to avoid, and it is asserted
 *       directly: the sum of byMode equals the number of questions answered.
 *     - the floors hold — a sub-400ms reveal banks nothing, and a question
 *       backgrounded before the reveal banks nothing
 *     - `byGap` survives a reload, which is the assertion that catches the
 *       field list in paceRec()
 *
 *   Everything else is unchanged
 *     - a covered question grades, scores and schedules exactly as an ordinary
 *       one does
 *     - no other run covers anything, and no other question type is coverable
 *
 * ONE MUTATION THIS DELIBERATELY DOES NOT CATCH, recorded so the next person
 * does not go hunting for the assertion that should have.
 *
 *   Removing `reveal` from NAV_SOUNDS changes nothing observable here: the
 *   sound engine is not loaded under the fake DOM, and what a control sounds
 *   like is covered by check-sound.js rather than by re-asserting it in every
 *   file that adds one.
 *
 * Run: node scripts/check-aat3-covered.js   (exit 1 on any failure)
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

console.log(`${BOLD}Level 3 — the options, held back${RESET}\n`);

/* SEEDED. The draw is random, and a check that passes five times in six is a
   check that fails in someone else's CI run with no way to reproduce it. */
const unseed = D.seedRandom(20260913);
const realNow = Date.now;
let NOW = 1789000000000;

function open(seed) {
  NOW = 1789000000000;
  Date.now = () => NOW;
  const store = fakeStore(seed || { [STORE_KEY]: JSON.stringify({ lessons: {}, xp: 0, practice: { units: {} } }) });
  global.localStorage = store;
  global.document = { visibilityState: 'visible', addEventListener() {} };
  delete require.cache[require.resolve(path.join(ROOT, 'aat3-ui.js'))];
  const UI = require(path.join(ROOT, 'aat3-ui.js'));
  UI.AAT3_SYLLABUS = require(path.join(ROOT, 'aat3-syllabus.js')).SYLLABUS;
  UI.AAT3_PRACTICE = require(path.join(ROOT, 'aat3-practice-data.js')).AAT3_PRACTICE;
  UI.AAT3_LEARN_PATH = require(path.join(ROOT, 'aat3-learn-data.js')).AAT3_LEARN_PATH;
  /* THE SCHEDULER, WIRED IN. aat3-ui.js reads it off its own root object, which
     is `window` in the browser and this module's exports under Node — so
     without this line `root.AATSpaced` is absent, recordQuestion() takes its
     guarded branch, and section 9's claim that a covered answer reaches the
     review schedule would pass against a player where nothing ever does. */
  UI.AATSpaced = require(path.join(ROOT, 'spaced.js'));
  return { UI, store, el: fakeEl() };
}
function pace(ctx) {
  try { return JSON.parse(ctx.store.getItem(PACE_KEY) || '{}'); } catch (e) { return {}; }
}
function practice(ctx) {
  try { return JSON.parse(ctx.store.getItem(STORE_KEY) || '{}'); } catch (e) { return {}; }
}
function onPractice(ctx) {
  ctx.UI.AAT3_UI.reset('practice', 'tpfb');
  ctx.UI.AAT3_UI.mount(ctx.el);
}
function startCovered(ctx) {
  onPractice(ctx);
  click(ctx.el, 'startpractice', n => n.getAttribute('data-lo') === 'covered');
}
/* WHICH QUESTION IS ON SCREEN, matched by its stem the way check-aat3-mistakes
   does. It has to come out of the BANK rather than out of the painted HTML,
   because the whole claim of section 1 is that the option text is not in the
   HTML — a check that read the options off the page could never fail. */
const BANK = require(path.join(ROOT, 'aat3-practice-data.js')).AAT3_PRACTICE.QUESTIONS
  .filter(q => q.unitKey === 'tpfb');
function shown(el) {
  const stem = (el.innerHTML.match(/<h2 class="a3-q">([\s\S]*?)<\/h2>/) || [])[1];
  if (!stem) return null;
  const text = stem.replace(/<[^>]*>/g, '').trim();
  return BANK.find(q => String(q.q).replace(/\*\*/g, '').trim() === text) || null;
}

try {

/* ── 1. The options are absent, not hidden ──────────────────────────────── */
{
  const ctx = open();
  onPractice(ctx);
  ok(/data-a3="startpractice" data-lo="covered"/.test(ctx.el.innerHTML),
    'the practice screen does not offer a covered run at all');

  startCovered(ctx);

  /* EVERY QUESTION OF THE RUN. The cover is emitted from one branch, but the
     thing it has to beat — an option string reaching the page by some other
     route — could come from anywhere, and a stem that happens to quote its own
     options would only show up further in. */
  let seen = 0, checkedText = 0;
  while (seen < 10) {
    const html = ctx.el.innerHTML;
    ok(nodes(ctx.el, 'reveal').length === 1, `question ${seen + 1} of the covered run offers no reveal`);
    ok(nodes(ctx.el, 'ans').length === 0,
      `question ${seen + 1} rendered its option buttons while still covered`);

    /* THE ASSERTION THE MODE RESTS ON. Not "the buttons are gone" — the option
       TEXT is not in the page. A `visibility: hidden` or a `display: none`
       would pass the check above and fail this one, which is the mutation. */
    const q = shown(ctx.el);
    if (q && q.opts) {
      checkedText++;
      const leaked = q.opts.filter(o => html.indexOf(String(o)) !== -1);
      eq(leaked, [], `question ${seen + 1} painted its options into the page while covered`);
    }

    NOW += 5000;
    click(ctx.el, 'reveal');
    ok(nodes(ctx.el, 'ans').length > 0, `question ${seen + 1} revealed nothing to answer`);
    ok(nodes(ctx.el, 'reveal').length === 0,
      `question ${seen + 1} still offers a reveal after revealing — the step is repeatable, so ` +
      'a second gap would be recorded for a retrieval moment that has already passed');

    NOW += 3000;
    answerCurrent(ctx.el);
    seen++;
    if (!nodes(ctx.el, 'nextq').length) break;
    click(ctx.el, 'nextq');
  }
  ok(seen === 10, `the covered run ran to ${seen} questions rather than 10`);
  ok(checkedText >= 8,
    `only ${checkedText} of the run's questions could have their option text checked — the ` +
    'leak assertion is passing on questions it never looked at');
  ok(/class="a3-done"/.test(ctx.el.innerHTML), 'the covered run did not reach a result screen');
  ok(/covered options/.test(ctx.el.innerHTML),
    'the result screen does not say which run it was, so a covered run reads as a mixed one');
}

/* ── 2. The reveal clears between questions ─────────────────────────────── */
{
  const ctx = open();
  startCovered(ctx);
  NOW += 5000;
  click(ctx.el, 'reveal');
  NOW += 3000;
  answerCurrent(ctx.el);
  click(ctx.el, 'nextq');
  eq([nodes(ctx.el, 'reveal').length, nodes(ctx.el, 'ans').length], [1, 0],
    'the next question of a covered run arrives already uncovered — the reveal is latching ' +
    'instead of clearing with the rest of the per-question state, so one tap uncovers the run');
}

/* ── 3. The handler refuses, not just the renderer ──────────────────────── */
{
  /* A DISABLED BUTTON IS A HINT TO A PERSON AND NO OBSTACLE TO A STALE REPAINT,
     which is the rule every other guard in this module follows. Here the stale
     node is real rather than hypothetical: the option buttons of question one,
     still holding their bound handlers, fired at question two while it is
     covered. That is the shape a double-tap takes in this mode. */
  const ctx = open();
  startCovered(ctx);
  NOW += 5000;
  const staleReveal = nodes(ctx.el, 'reveal')[0];
  staleReveal.fire('click');

  /* THE REVEAL FIRED A SECOND TIME AT THE QUESTION IT ALREADY OPENED. There is
     no button on screen for this — the covered branch is what draws it, and
     that branch is gone — so the only way in is the node that drew it, which is
     exactly what a stale repaint hands a double-tap. Without the guard the flag
     flips back, the question re-covers, and the next tap banks a SECOND gap for
     a retrieval moment that happened ten seconds ago. */
  NOW += 4000;
  staleReveal.fire('click');
  ok(nodes(ctx.el, 'ans').length > 0 && nodes(ctx.el, 'reveal').length === 0,
    'a second tap on the reveal put the options away again — the step is not one-way');
  eq(Object.keys(pace(ctx).tpfb.byGap).reduce((a, k) => a + pace(ctx).tpfb.byGap[k].n, 0), 1,
    'the second tap banked a second gap for the same question');

  const staleOpts = nodes(ctx.el, 'ans');
  ok(staleOpts.length > 0, 'nothing to go stale — the setup for this section did not reveal');
  NOW += 3000;
  answerCurrent(ctx.el);
  click(ctx.el, 'nextq');

  const before = ctx.el.innerHTML;
  staleOpts.forEach(n => n.fire('click'));
  ok(ctx.el.innerHTML === before,
    'a stale option button graded the covered question behind it — the guard is in the markup ' +
    'only, so the one question a reader has not seen the options for is the one they can answer ' +
    'by tapping twice');
  eq([nodes(ctx.el, 'reveal').length, nodes(ctx.el, 'ans').length], [1, 0],
    'the covered question came uncovered from a stale tap');
}

/* ── 4. What the run is drawn from ──────────────────────────────────────── */
{
  const ctx = open();
  startCovered(ctx);
  const drawn = [];
  for (let i = 0; i < 10; i++) {
    const q = shown(ctx.el);
    drawn.push(q ? (q.type || 'mcq') : '?');
    NOW += 5000; click(ctx.el, 'reveal');
    NOW += 3000; answerCurrent(ctx.el);
    if (!nodes(ctx.el, 'nextq').length) break;
    click(ctx.el, 'nextq');
  }
  eq(drawn.filter(t => t !== 'mcq'), [],
    'the covered run drew something other than a multiple choice — every one of those is a ' +
    'question the mode does nothing to, in a run named for doing it');
  ok(drawn.length === 10, `the covered run drew ${drawn.length} questions rather than 10`);

  /* THE WEIGHTING IS NOT WHAT NARROWS. Drawn over more than one outcome — a
     run that collapsed onto whichever outcome has the most multiple choices
     would still pass every assertion above. */
  const ctx2 = open();
  const los = {};
  for (let run = 0; run < 3; run++) {
    startCovered(ctx2);
    for (let i = 0; i < 10; i++) {
      const q = shown(ctx2.el);
      if (q) los[q.lo] = (los[q.lo] || 0) + 1;
      NOW += 5000; click(ctx2.el, 'reveal');
      NOW += 3000; answerCurrent(ctx2.el);
      if (!nodes(ctx2.el, 'nextq').length) break;
      click(ctx2.el, 'nextq');
    }
  }
  ok(Object.keys(los).length >= 4,
    `three covered runs reached only ${Object.keys(los).length} outcomes — the format filter is ` +
    'narrowing the outcomes too');
}

/* ── 5. Not offered when there is nothing to offer ──────────────────────── */
{
  /* Every multiple choice retired but four. The run needs five, so the offer
     has to go — and it has to go because of the LIVE count, not the bank
     count, which is the mutation. */
  const all = require(path.join(ROOT, 'aat3-practice-data.js')).AAT3_PRACTICE.QUESTIONS
    .filter(q => q.unitKey === 'tpfb' && (q.type || 'mcq') === 'mcq');
  const qs = {};
  /* Retired the way the app retires: `k` later than `ku`, not a boolean — see
     isRetired(). A flag would be merged as sticky by progress-backup, which is
     why the record has never had one. */
  all.slice(0, all.length - 4).forEach(q => { qs[q.id] = { k: 1789000000000, ku: 0 }; });
  const ctx = open({
    [STORE_KEY]: JSON.stringify({ lessons: {}, xp: 0, practice: { units: { tpfb: {
      runs: 1, mocks: 0, mockBest: 0, los: {}, qs: qs, hist: {}, conf: {} } } } }),
  });
  onPractice(ctx);
  const offered = /data-a3="startpractice" data-lo="covered"/.test(ctx.el.innerHTML);
  ok(!offered,
    `with ${4} live multiple choices left the covered run is still offered — a "run" of four ` +
    'questions is not the thing the card says it is');
  ok(/data-a3="startpractice" data-lo="mix"/.test(ctx.el.innerHTML),
    'the rest of the practice screen went with it, so this section is asserting a blank page');
}

/* ── 6. The measurement, and what it is never mixed with ────────────────── */
{
  const ctx = open();
  startCovered(ctx);
  const los = [];
  for (let i = 0; i < 10; i++) {
    const q = shown(ctx.el);
    if (q) los.push(String(q.lo));
    NOW += 5000; click(ctx.el, 'reveal');
    NOW += 3000; answerCurrent(ctx.el);
    if (!nodes(ctx.el, 'nextq').length) break;
    click(ctx.el, 'nextq');
  }
  const u = pace(ctx).tpfb || {};

  /* THE GAP, BY OUTCOME AND NOWHERE ELSE. Five seconds every time, so the sum
     is arithmetic rather than a range. */
  const gapN = Object.keys(u.byGap || {}).reduce((a, k) => a + u.byGap[k].n, 0);
  const gapMs = Object.keys(u.byGap || {}).reduce((a, k) => a + u.byGap[k].ms, 0);
  eq([gapN, gapMs], [10, 50000],
    'the retrieval gaps did not land in byGap — ten reveals at five seconds each');
  eq(Object.keys(u.byGap || {}).sort(), Array.from(new Set(los)).sort(),
    'byGap is not keyed by the outcomes the run actually drew');

  /* THE WHOLE ANSWER, ONCE EACH, IN THE OTHER THREE. Eight seconds a question:
     five thinking plus three answering. A gap banked through recordPace as
     well would show up here as twenty readings, or as 130 seconds. */
  const loN = Object.keys(u.byLo || {}).reduce((a, k) => a + u.byLo[k].n, 0);
  const loMs = Object.keys(u.byLo || {}).reduce((a, k) => a + u.byLo[k].ms, 0);
  eq([loN, loMs], [10, 80000], 'byLo did not get exactly one whole reading per question');
  eq(u.byType, { mcq: { n: 10, ms: 80000 } }, 'byType did not get exactly one whole reading per question');

  /* THE ONE THAT MATTERS. paceOverall() sums byMode; if the gap were filed as a
     mode it would be summed in beside whole answers, and the app would quote a
     pace no reader ever took. */
  eq(u.byMode, { covered: { n: 10, ms: 80000 } },
    'byMode is not ten covered answers alone — either the gap was filed as a mode, or a covered ' +
    'question banked itself as ordinary practice');
  ok(!('covered' in (u.byGap || {})) && !('practice' in (u.byGap || {})),
    'byGap is being keyed by mode rather than by outcome');

  /* SURVIVES A RELOAD, which is the assertion that catches paceRec()'s field
     list: byGap has to be named there or the next write rebuilds the record
     without it and the readings go silently. */
  const again = open({ [STORE_KEY]: ctx.store.getItem(STORE_KEY), [PACE_KEY]: ctx.store.getItem(PACE_KEY) });
  startCovered(again);
  NOW += 5000; click(again.el, 'reveal');
  NOW += 3000; answerCurrent(again.el);
  const u2 = pace(again).tpfb || {};
  const gapN2 = Object.keys(u2.byGap || {}).reduce((a, k) => a + u2.byGap[k].n, 0);
  eq(gapN2, 11, 'the gaps written before a reload were dropped by the next write');
}

/* ── 7. The floors, and the backgrounded question ───────────────────────── */
{
  const fast = open();
  startCovered(fast);
  NOW += 200;                                   /* under PACE_MIN_MS */
  click(fast.el, 'reveal');
  eq(((pace(fast).tpfb || {}).byGap) || {}, {},
    'a reveal 200ms after the stem banked a gap — which is a double tap landing on the button, ' +
    'not a reader who knew it instantly');
  ok(nodes(fast.el, 'ans').length > 0,
    'discarding the reading also discarded the reveal, so a fast tap leaves the question covered');

  const slow = open();
  startCovered(slow);
  NOW += 11 * 60 * 1000;                        /* over PACE_MAX_MS */
  click(slow.el, 'reveal');
  eq(((pace(slow).tpfb || {}).byGap) || {}, {}, 'a phone left on a table for eleven minutes banked a gap');

  /* BACKGROUNDED BEFORE THE REVEAL. The listener latches S.qHidden, and a
     reading interrupted halfway is not rescued by coming back. */
  const away = open();
  let onHide = null;
  global.document = {
    visibilityState: 'visible',
    addEventListener(ev, fn) { if (ev === 'visibilitychange') onHide = fn; },
  };
  delete require.cache[require.resolve(path.join(ROOT, 'aat3-ui.js'))];
  const UI = require(path.join(ROOT, 'aat3-ui.js'));
  UI.AAT3_SYLLABUS = require(path.join(ROOT, 'aat3-syllabus.js')).SYLLABUS;
  UI.AAT3_PRACTICE = require(path.join(ROOT, 'aat3-practice-data.js')).AAT3_PRACTICE;
  UI.AAT3_LEARN_PATH = require(path.join(ROOT, 'aat3-learn-data.js')).AAT3_LEARN_PATH;
  away.UI = UI;
  startCovered(away);
  ok(typeof onHide === 'function', 'nothing listens for the page going away');
  global.document.visibilityState = 'hidden';
  if (onHide) onHide();
  NOW += 5000;
  click(away.el, 'reveal');
  eq(((pace(away).tpfb || {}).byGap) || {}, {},
    'a question the reader walked away from banked its gap — the figure is then how long the ' +
    'phone was in a pocket');
}

/* ── 8. Nothing else covers anything ────────────────────────────────────── */
{
  const ctx = open();
  onPractice(ctx);
  click(ctx.el, 'startpractice', n => n.getAttribute('data-lo') === 'mix');
  let sawMcq = 0;
  for (let i = 0; i < 10; i++) {
    ok(nodes(ctx.el, 'reveal').length === 0, `a mixed run covered question ${i + 1}`);
    if (nodes(ctx.el, 'ans').length) sawMcq++;
    NOW += 3000;
    answerCurrent(ctx.el);
    if (!nodes(ctx.el, 'nextq').length) break;
    click(ctx.el, 'nextq');
  }
  ok(sawMcq >= 2,
    `the mixed run served ${sawMcq} multiple choices, so "a mixed run covers nothing" was ` +
    'asserted against questions that could not have been covered anyway');
  const u = pace(ctx).tpfb || {};
  eq(u.byGap || {}, {}, 'a mixed run wrote gaps');
  ok(!('covered' in (u.byMode || {})), 'a mixed run filed its answers as covered');
}

/* ── 9. Grading is untouched ────────────────────────────────────────────── */
{
  /* The covered run is a different way of ASKING, not a different way of
     marking. Everything downstream — the score, the per-question record, the
     review schedule — has to come out the same shape as a mixed run's. */
  const ctx = open();
  startCovered(ctx);
  const ids = [];
  for (let i = 0; i < 10; i++) {
    const q = shown(ctx.el);
    if (q) ids.push(q.id);
    NOW += 5000; click(ctx.el, 'reveal');
    NOW += 3000; answerCurrent(ctx.el);
    if (!nodes(ctx.el, 'nextq').length) break;
    click(ctx.el, 'nextq');
  }
  const rec = (practice(ctx).practice || {}).units || {};
  const unit = rec.tpfb || {};
  eq(Object.keys(unit.qs || {}).length, ids.length,
    'a covered run did not record one result per question');
  ok(ids.every(id => unit.qs[id] && typeof unit.qs[id] === 'object'),
    'a covered question was recorded under some key other than its own id');
  ok(ids.every(id => unit.qs[id].sr && unit.qs[id].sr.dueAt),
    'a covered question was not put on the review schedule, so answering one teaches the ' +
    'scheduler nothing');
  eq(unit.runs, 1, 'a covered run did not count as a run');
  ok(Object.keys(unit.los || {}).length > 0, 'a covered run recorded nothing per outcome');
}

} finally {
  Date.now = realNow;
  unseed();
}

console.log(failures
  ? `\n${RED}${BOLD}── ${failures} of ${checks} checks failed${RESET}\n`
  : `\n${GREEN}${BOLD}── Recall before recognition holds ✓${RESET}  ${DIM}(${checks} assertions)${RESET}\n`);
process.exit(failures ? 1 : 0);
