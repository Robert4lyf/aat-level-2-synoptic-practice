#!/usr/bin/env node
/**
 * How sure the reader was — recorded, scheduled on, and kept out of the wrong
 * places.
 *
 * Accuracy alone cannot tell a lucky guess from secure knowledge, so the
 * spaced-repetition schedule gave both the same interval: a coin flip that
 * landed was spaced out to a fortnight, and an answer the reader was CERTAIN
 * about and got wrong came back no harder than a shrug. The second of those is
 * the most dangerous state in learning and the one a reader will never fix
 * alone — they are not going to look it up, because they do not know they are
 * wrong.
 *
 * WHAT IT ASSERTS
 *
 *   The shared scheduler, which Levels 1 and 2 also call
 *     - a four-argument call is byte-identical to today. This is the assertion
 *       that keeps Level 3's experiment from silently rescheduling two levels
 *       that never opted in, and it is the first one in the file for that
 *       reason.
 *     - right-but-guessed does not climb the ladder and earns no ease
 *     - wrong-while-sure costs more ease than an ordinary miss
 *     - a miss while guessing is unchanged — the reader already knows
 *
 *   The control
 *     - an ordinary run offers one toggle, off by default, and it CLEARS
 *       between questions. A flag that survived would mark every answer after
 *       the first guess as a guess, which is the trap `taskNudge` fell into.
 *     - a calibration run asks three ways and REFUSES to grade until one is
 *       chosen — refuses in the grading funnel, not merely by disabling a
 *       button, because a disabled button is a hint to a person and no obstacle
 *       to a stale repaint
 *     - it is not offered in a mock (nothing is revealed, so there is no moment
 *       to be sure ahead of), in a lesson (teaching, not a test), or on a
 *       written task (submitted only after the model answer is revealed, so the
 *       question would be put to a reader looking at the answer)
 *
 *   The record
 *     - an untapped toggle banks 'sure' — the bias is deliberate and runs the
 *       right way, because confident-and-wrong is recorded by inaction, which
 *       is how it actually happens
 *     - the counters survive a reload. THIS IS THE ONE THAT CATCHES THE FIELD
 *       LIST: `conf` has to be named in normalisePractice, in practiceRec's
 *       blank AND in its lazy repair, and missing any of the three fails here
 *       rather than in a reader's store.
 *     - a fresh unit and a store written before `conf` existed both work
 *     - two devices merge without inventing a percentage neither measured
 *     - a lesson check banks nothing, and leaves the practice record
 *       byte-identical
 *
 *   The panel
 *     - below thirty answers it says how many more it needs rather than drawing
 *       a figure from four
 *     - above it, it names overconfidence only where the gap is real
 *
 * TWO MUTATIONS THIS DELIBERATELY DOES NOT CATCH, recorded so the next person
 * does not go hunting for the assertion that should have.
 *
 *   Removing `isMock()` from confOffered() changes nothing observable. The
 *   question footer branches on isMock() FIRST and renders the mock's own
 *   advance button, so the control cannot reach a paper whether confOffered
 *   agrees or not, and the mock's banking sites never call recordConfidence.
 *   The guard stays because it states the intent where the rule lives, rather
 *   than leaving it as a property of the order two branches happen to be in.
 *
 *   Removing `conf` from practiceRec()'s blank, or from its lazy repair, is
 *   covered by the section-4 source check rather than by behaviour — see the
 *   note there about why three overlapping sites cannot be told apart from
 *   the outside.
 *
 * Run: node scripts/check-aat3-confidence.js   (exit 1 on any failure)
 */

'use strict';

const path = require('path');
const ROOT = path.join(__dirname, '..');
const RED = '\x1b[31m', GREEN = '\x1b[32m', DIM = '\x1b[2m', BOLD = '\x1b[1m', RESET = '\x1b[0m';

const D = require('./lib/aat3-driver.js');
const { fakeStore, fakeEl, nodes, click, answerCurrent } = D;
const STORE_KEY = 'prep_v2_aat3';

let failures = 0, checks = 0;
function ok(cond, label) {
  checks++;
  if (!cond) { failures++; console.log(`  ${RED}✗${RESET} ${label}`); }
}
function eq(a, b, label) {
  ok(JSON.stringify(a) === JSON.stringify(b), `${label} — got ${JSON.stringify(a)}, expected ${JSON.stringify(b)}`);
}

console.log(`${BOLD}Level 3 — how sure the reader was${RESET}\n`);

/* ══════════════════════════════════════════════════════════════════════════
   Part one — the shared scheduler.

   spaced.js is called by aat1-ui.js, aat3-ui.js and app.js, so one reader meets
   one algorithm rather than three. Level 3 is the only caller that knows about
   confidence; everything here is about making sure the other two cannot notice.
   ══════════════════════════════════════════════════════════════════════════ */
{
  const SP = require(path.join(ROOT, 'spaced.js'));
  const T = 1789000000000;

  /* THE COMPATIBILITY ASSERTION, and it comes first because everything else in
     this file is only safe if it holds. Every shape a caller can be in: no
     record, a young one, a mature one, right and wrong.

     PINNED TO VALUES, NOT TO EACH OTHER, and that correction cost a mutation.
     The first version compared a four-argument call against a five-argument one
     passing `undefined` — which cannot fail, because both take the same path
     through the function. It proved that a missing argument and an explicit
     undefined behave alike, which is true by construction, and proved nothing
     at all about whether today's schedule was preserved. A mutation that capped
     the reps for EVERY caller sailed through it.

     So the expected records are written out. They are the schedule Levels 1 and
     2 are on today; if a change to this function moves any of them, that is a
     change to two levels that never opted into this experiment, and it has to
     be a deliberate one. */
  const SHAPES = [
    [null, true], [null, false],
    [{ ease: 2.5, reps: 1, interval: 3 }, true],
    [{ ease: 2.5, reps: 1, interval: 3 }, false],
    [{ ease: 2.9, reps: 6, interval: 40 }, true],
    [{ ease: 1.4, reps: 0, interval: 1 }, false],
  ];
  const TODAY = [
    { ease: 2.58, reps: 1, interval: 3, dueAt: 1789623376000, lastResult: true },
    { ease: 2.3, reps: 0, interval: 1, dueAt: 1789086400000, lastResult: false },
    { ease: 2.58, reps: 2, interval: 7, dueAt: 1789702984960, lastResult: true },
    { ease: 2.3, reps: 0, interval: 1, dueAt: 1789086400000, lastResult: false },
    { ease: 2.7, reps: 7, interval: 116, dueAt: 1799745516160, lastResult: true },
    { ease: 1.3, reps: 0, interval: 1, dueAt: 1789086400000, lastResult: false },
  ];
  SHAPES.forEach(([rec, correct], i) => {
    const four = SP.schedule(rec, correct, T, 'q' + i);
    eq(four, TODAY[i],
      `a four-argument call no longer schedules what it scheduled before confidence existed ` +
      `(shape ${i}) — Levels 1 and 2 call it this way and must be untouched`);
    eq(SP.schedule(rec, correct, T, 'q' + i, undefined), four,
      `passing an explicit undefined confidence differs from passing none (shape ${i})`);
  });

  /* RIGHT BUT GUESSED IS NOT RECALL. Held at one rep rather than climbing, and
     earning no ease: a coin flip is no evidence that the gaps should widen. */
  {
    const rec = { ease: 2.5, reps: 1, interval: 3 };
    const sure = SP.schedule(rec, true, T, 'q', 'sure');
    const guess = SP.schedule(rec, true, T, 'q', 'guess');
    ok(guess.reps < sure.reps,
      `a guess that landed climbed the ladder as far as a confident answer ` +
      `(reps ${guess.reps} against ${sure.reps})`);
    ok(guess.dueAt < sure.dueAt,
      'a guess that landed is scheduled no sooner than a confident right answer, so a coin ' +
      'flip buys the same fortnight that knowing it does');
    ok(guess.ease <= rec.ease,
      `a guess that landed earned ease (${rec.ease} → ${guess.ease}), which is what decides how ` +
      `fast every later gap widens`);
  }

  /* WRONG WHILE SURE IS THE EXPENSIVE ONE. */
  {
    const rec = { ease: 2.5, reps: 3, interval: 10 };
    const plain = SP.schedule(rec, false, T, 'q');
    const sure = SP.schedule(rec, false, T, 'q', 'sure');
    const guess = SP.schedule(rec, false, T, 'q', 'guess');
    ok(sure.ease < plain.ease,
      `being wrong while sure cost no more ease than an ordinary miss (${sure.ease} against ` +
      `${plain.ease}) — it is the state the reader cannot fix alone, because they do not know ` +
      `they are wrong`);
    eq(guess.ease, plain.ease,
      'being wrong while guessing was penalised beyond an ordinary miss — the reader already ' +
      'knows they do not know it, and there is nothing to correct');
  }

  /* Junk in the fifth argument must not change anything. It arrives from a
     store the reader can edit, by way of the record. */
  {
    const rec = { ease: 2.5, reps: 2, interval: 7 };
    const plain = SP.schedule(rec, true, T, 'q');
    ['', 'SURE', 'maybe', 0, {}, []].forEach(junk => {
      eq(SP.schedule(rec, true, T, 'q', junk), plain,
        `an unrecognised confidence (${JSON.stringify(junk)}) changed the schedule`);
    });
  }
}

/* ══════════════════════════════════════════════════════════════════════════
   Part two — the control and the record.
   ══════════════════════════════════════════════════════════════════════════ */

let NOW = 1789000000000;
const realNow = Date.now;
const unseed = D.seedRandom(20260913);

/* Narrowed for the same reason check-aat3-pace.js narrows: this file is about
   when a confidence is asked for and where it is banked, none of which varies
   by question type — and an unnarrowed draw makes the loops responsible for
   answering all eight, which is another file's job. The two sections that need
   the real bank say so. */
function open(seed, opts) {
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
  if (!opts || opts.simple !== false) {
    const SIMPLE = { mcq: 1, numeric: 1, truefalse: 1 };
    UI.AAT3_PRACTICE = Object.assign({}, UI.AAT3_PRACTICE, {
      QUESTIONS: UI.AAT3_PRACTICE.QUESTIONS.filter(q => SIMPLE[q.type || 'mcq']),
    });
  }
  return { UI, store, el: fakeEl() };
}
function done(el) { return /class="a3-done"/.test(el.innerHTML); }
function acts(el) {
  return [...new Set(el.querySelectorAll().map(n => n.getAttribute('data-a3')).filter(Boolean))];
}

/* Sit a run. `call` decides what is said about each question, by index: return
   null to say nothing at all. Every exit is named — see the note in
   check-aat3-pace.js about a check that fails by crashing. */
function run(ctx, lo, call) {
  ctx.UI.AAT3_UI.reset('practice', 'tpfb');
  ctx.UI.AAT3_UI.mount(ctx.el);
  click(ctx.el, 'startpractice', n => n.getAttribute('data-lo') === lo);
  let n = 0;
  for (let guard = 0; guard < 60; guard++) {
    if (done(ctx.el)) return n;
    if (!nodes(ctx.el, 'nextq').length) {
      const say = call ? call(n) : null;
      if (say && nodes(ctx.el, 'conf').length) {
        click(ctx.el, 'conf', b => b.getAttribute('data-c') === say);
      }
      NOW += 3000;
      answerCurrent(ctx.el);
    }
    if (done(ctx.el)) return n;
    if (!nodes(ctx.el, 'nextq').length) {
      throw new Error('the run stalled — actions on screen: ' + acts(ctx.el).join(', '));
    }
    click(ctx.el, 'nextq');
    n++;
  }
  throw new Error('the run never finished');
}

try {

/* ── 1. The control, in an ordinary run ─────────────────────────────────── */
{
  const ctx = open();
  ctx.UI.AAT3_UI.reset('practice', 'tpfb');
  ctx.UI.AAT3_UI.mount(ctx.el);
  ok(/data-a3="startpractice" data-lo="calib"/.test(ctx.el.innerHTML),
    'the practice screen offers no calibration run, so the unbiased half is unreachable');

  click(ctx.el, 'startpractice', n => n.getAttribute('data-lo') === 'mix');
  ok(/a3-conf-one/.test(ctx.el.innerHTML), 'an ordinary question offers no way to say it was a guess');
  ok(!/a3-conf-ask/.test(ctx.el.innerHTML),
    'an ordinary question asks the three-way question, which is the slow one and belongs to ' +
    'the calibration run');
  eq(nodes(ctx.el, 'conf').map(n => n.getAttribute('aria-pressed')), ['false'],
    'the toggle does not start off, so a reader who never touches it is recorded as guessing');

  /* IT TOGGLES BACK. A one-way flag is a trap: a mis-tap would make every
     question after it a guess with no way to say otherwise. */
  click(ctx.el, 'conf');
  eq(nodes(ctx.el, 'conf').map(n => n.getAttribute('aria-pressed')), ['true'], 'tapping the toggle does not press it');
  click(ctx.el, 'conf');
  eq(nodes(ctx.el, 'conf').map(n => n.getAttribute('aria-pressed')), ['false'], 'tapping it again does not turn it off');

  /* AND IT CLEARS BETWEEN QUESTIONS — the taskNudge trap. */
  click(ctx.el, 'conf');
  NOW += 3000;
  answerCurrent(ctx.el);
  click(ctx.el, 'nextq');
  eq(nodes(ctx.el, 'conf').map(n => n.getAttribute('aria-pressed')), ['false'],
    'the next question arrives already marked as a guess — the flag is latching instead of ' +
    'clearing with the rest of the per-question state');
}

/* ── 2. The calibration run refuses to be skipped ────────────────────────── */
{
  const ctx = open();
  ctx.UI.AAT3_UI.reset('practice', 'tpfb');
  ctx.UI.AAT3_UI.mount(ctx.el);
  click(ctx.el, 'startpractice', n => n.getAttribute('data-lo') === 'calib');
  eq(nodes(ctx.el, 'conf').map(n => n.getAttribute('data-c')), ['sure', 'think', 'guess'],
    'a calibration run does not offer the three-way ask');

  /* THE GUARD IS IN THE GRADING FUNNEL, not on a button. */
  NOW += 3000;
  answerCurrent(ctx.el);
  ok(!nodes(ctx.el, 'nextq').length,
    'a calibration question graded before the reader said how sure — the guard has to be in ' +
    'settle(), which every type grades through, not on eight separate buttons');
  ok(/is-nudge/.test(ctx.el.innerHTML),
    'the refusal is silent: a control that accepts a tap and shows nothing reads as broken');

  click(ctx.el, 'conf', b => b.getAttribute('data-c') === 'sure');
  NOW += 3000;
  answerCurrent(ctx.el);
  ok(nodes(ctx.el, 'nextq').length > 0, 'a calibration question would not grade even once it was called');
  ok(!/is-nudge/.test(ctx.el.innerHTML), 'the nudge stayed on screen after the reader did what it asked');
}

/* ── 3. What gets banked ─────────────────────────────────────────────────── */
{
  /* An untapped toggle is 'sure'. The bias is the design: the state worth
     catching is recorded by inaction, because that is how it happens. */
  const quiet = open();
  const n1 = run(quiet, 'mix', () => null);
  const c1 = quiet.UI.AAT3_UI.confidenceRead('tpfb');
  eq(c1.sure.n, n1, 'a run where the toggle was never touched did not bank every answer as sure');
  eq(c1.guess.n, 0, 'and banked something as a guess that nobody said was one');
  eq(c1.total, n1, 'the three buckets do not add up to the run');

  /* Every third question called a guess. */
  const mixed = open();
  const n2 = run(mixed, 'mix', i => (i % 3 === 0 ? 'guess' : null));
  const c2 = mixed.UI.AAT3_UI.confidenceRead('tpfb');
  eq(c2.guess.n, Math.ceil(n2 / 3), 'the guesses were not banked one for one');
  eq(c2.sure.n, n2 - Math.ceil(n2 / 3), 'and the rest were not banked as sure');

  /* `right` never exceeds `n`, which is what a merged backup can produce. */
  ['sure', 'think', 'guess'].forEach(k => {
    ok(c2[k].right <= c2[k].n, `${k}: more right answers than answers given`);
  });
}

/* ── 4. THE FIELD LIST. A reload is where a forgotten one shows up ───────── */
{
  const ctx = open();
  run(ctx, 'mix', i => (i % 2 === 0 ? 'guess' : null));
  const before = ctx.UI.AAT3_UI.confidenceRead('tpfb');
  ok(before.total > 0, 'nothing was banked, so the reload assertion below would prove nothing');

  /* Re-open against the SAME store, which is what a reload is. */
  delete require.cache[require.resolve(path.join(ROOT, 'aat3-ui.js'))];
  const AGAIN = require(path.join(ROOT, 'aat3-ui.js'));
  ['AAT3_SYLLABUS', 'AAT3_PRACTICE', 'AAT3_LEARN_PATH'].forEach(k => { AGAIN[k] = ctx.UI[k]; });
  eq(AGAIN.AAT3_UI.confidenceRead('tpfb'), before,
    'the confidence counters did not survive a reload — `conf` is missing from ' +
    'normalisePractice(), which REBUILDS the record from a named field list and drops ' +
    'anything not on it');

  /* A BRAND-NEW UNIT, which is practiceRec's `blank` rather than
     normalisePractice — the second of the three places. */
  const fresh = AGAIN.AAT3_UI.confidenceRead('faps');
  eq(fresh.total, 0, 'a unit never practised does not read back as an empty record');
  ok(fresh.sure && fresh.sure.n === 0, 'a unit never practised has no sure bucket at all');

  /* AND A STORE WRITTEN BEFORE `conf` EXISTED — the third place, the lazy
     repair. This is exactly what every existing reader's store looks like. */
  const old = open({
    [STORE_KEY]: JSON.stringify({
      lessons: {}, xp: 0,
      practice: { units: { tpfb: { runs: 2, los: { '1': { attempted: 4, correct: 3 } }, qs: {}, hist: {} } } },
    }),
  });
  const oldRead = old.UI.AAT3_UI.confidenceRead('tpfb');
  eq(oldRead.total, 0, 'a store written before confidence existed does not read back clean');
  const after = run(old, 'mix', () => 'guess');
  eq(old.UI.AAT3_UI.confidenceRead('tpfb').guess.n, after,
    'a store written before confidence existed cannot record any — the lazy repair in ' +
    'practiceRec() is missing `conf`');

  /* AND ALL THREE PLACES NAME IT, asserted against the source.

     WHY A STRUCTURAL CHECK AND NOT THREE BEHAVIOURAL ONES. The three sites
     OVERLAP: normalisePractice repairs a record read from disk, the blank
     covers a unit created fresh, and the lazy repair catches anything else — so
     removing any ONE of them leaves the other two covering it, and every
     behavioural assertion above still passes. That redundancy is deliberate and
     worth keeping (the file already does it for `qs` and `hist`), but it means
     the only way to notice a field slipping out of one list is to look at the
     lists.

     This is the §1.5 rule from docs/level-3-learning-upgrades-plan.md made
     enforceable: the trap it describes cost this module a reader's best mock
     score once already. */
  const src = require('fs').readFileSync(path.join(ROOT, 'aat3-ui.js'), 'utf8');
  /* EACH SITE LOOKS FOR THE CODE THAT DOES THE WORK, not for the word.

     The first version searched each region for `conf` and one mutation walked
     straight through it: deleting the assignment left the COMMENT above it in
     place, and a comment mentioning the field satisfied the pattern. A check
     that a comment can pass is a check of the documentation. */
  const SITES = [
    [/out\.units\[k\] = \{[\s\S]*?\n        \};/, /conf\s*:/, 'normalisePractice()'],
    /* To the end of the LINE, not to the first `}` — the blank holds `los: {}`
       and three more like it, so a brace-matching pattern stops at the first
       empty object and reads only half the field list. */
    [/var blank = \{.*$/m, /conf\s*:/, "practiceRec()'s blank"],
    [/if \(!u\.hist\) u\.hist = \{\};[\s\S]{0,400}?return u;/, /u\.conf\s*=/, "practiceRec()'s lazy repair"],
  ];
  SITES.forEach(([where, what, name]) => {
    const m = where.exec(src);
    ok(!!m, `could not find ${name} in aat3-ui.js — this check has gone stale and now guards nothing`);
    if (m) {
      ok(what.test(m[0]),
        `${name} does not set \`conf\`. All three have to: miss one and the field survives ` +
        `today because the other two cover it, and vanishes the moment either is touched`);
    }
  });
}

/* ── 5. Where it must not be offered ─────────────────────────────────────── */
{
  /* A mock. The whole bank, because a paper is eighty marks. */
  const m = open(null, { simple: false });
  m.UI.AAT3_UI.reset('practice', 'tpfb');
  m.UI.AAT3_UI.mount(m.el);
  click(m.el, 'startmock');
  let sat = 0, sawControl = false;
  while (nodes(m.el, 'mocknext').length) {
    if (nodes(m.el, 'conf').length) sawControl = true;
    NOW += 4000;
    click(m.el, 'mocknext');
    if (++sat > 200) throw new Error('the mock never finished');
  }
  ok(sat > 5, 'the mock really was sat, so this proves something');
  ok(!sawControl,
    'a mock asked how sure the reader was — nothing is revealed there, so there is no moment ' +
    'of finding out to be sure ahead of');
  eq(m.UI.AAT3_UI.confidenceRead('tpfb').total, 0, 'and a mock banked confidence anyway');

  /* A lesson. Timed, per Phase 1.1 — but not asked, and not banked. */
  const l = open(null, { simple: false });
  const beforeStore = JSON.stringify(JSON.parse(l.store.getItem(STORE_KEY)).practice);
  l.UI.AAT3_UI.reset('path', 'tpfb');
  l.UI.AAT3_UI.mount(l.el);
  click(l.el, 'open', n => n.getAttribute('data-id') === 'L3-TPFB-0A');
  for (let g = 0; g < 40 && nodes(l.el, 'next').length; g++) click(l.el, 'next');
  let asked = 0, lessonControl = false;
  for (let g = 0; g < 60 && !done(l.el); g++) {
    if (!nodes(l.el, 'nextq').length) {
      if (nodes(l.el, 'conf').length) lessonControl = true;
      NOW += 3000;
      answerCurrent(l.el);
    }
    if (done(l.el) || !nodes(l.el, 'nextq').length) break;
    click(l.el, 'nextq');
    asked++;
  }
  ok(asked > 0, 'the lesson really did ask questions, so this proves something');
  ok(!lessonControl, 'a lesson check asked how sure the reader was — a check inside a lesson is teaching');
  eq(l.UI.AAT3_UI.confidenceRead('tpfb').total, 0, 'and a lesson banked confidence anyway');
  eq(JSON.parse(l.store.getItem(STORE_KEY)).practice, JSON.parse(beforeStore),
    'answering a lesson check wrote into the practice record');
}

/* ── 6. A written task is never asked ───────────────────────────────────── */
{
  /* BUAW, NOT TPFB. Written tasks are rehearsal of a format only two units are
     marked in — BUAW has eight and MATS seven; TPFB and FAPS have none at all.
     The first version of this section narrowed TPFB to its written questions,
     got an empty bank, and said so rather than passing: which is what the
     "did one actually reach the screen?" assertion below is for, and why it is
     written before the claim it protects. */
  const WRITTEN = require(path.join(ROOT, 'aat3-buaw-data.js')).AAT3_BUAW_PRACTICE.QUESTIONS
    .filter(q => q.type === 'written');
  ok(WRITTEN.length > 0, 'BUAW holds no written tasks, so this section can prove nothing');

  const w = open();
  /* BOTH halves of the unit, and the PATH is the one that is easy to forget:
     unitKeys() lists only units that have teaching content, so a unit whose
     bank is loaded and whose path is not is not a unit at all — activeUnit()
     falls back to TPFB and the whole section quietly tests the wrong unit. */
  w.UI.AAT3_BUAW_PATH = require(path.join(ROOT, 'aat3-buaw-data.js')).AAT3_BUAW_PATH;
  w.UI.AAT3_BUAW_PRACTICE = { QUESTIONS: WRITTEN };
  w.UI.AAT3_UI.reset('practice', 'buaw');
  w.UI.AAT3_UI.mount(w.el);
  ok(nodes(w.el, 'startpractice').some(n => n.getAttribute('data-lo') === 'calib'),
    'a bank of written questions offered no calibration run, so section 6 tested nothing');
  click(w.el, 'startpractice', n => n.getAttribute('data-lo') === 'calib');
  ok(/data-a3="wrinput"/.test(w.el.innerHTML),
    'the written-only bank did not put a written task on screen, so the assertion below ' +
    'would pass about a question type that was never drawn');
  ok(!nodes(w.el, 'conf').length,
    'a written task asked how sure the reader was — it is submitted only after the model ' +
    'answer is revealed, so the question would be put to someone looking at the answer');

  /* AND IT STILL GRADES. A type excluded from the ask must not be excluded from
     the run: the calibration guard refuses only where the control is offered,
     so a written task inside a calibration run has to go through untouched. */
  const box = nodes(w.el, 'wrinput')[0];
  box.value = 'An answer written out at sufficient length to satisfy the minimum this task asks ' +
    'for, so that the model answer can be revealed and the rubric marked against it in the ' +
    'ordinary way a reader would do it.';
  box.fire('input');
  click(w.el, 'wrshow');
  click(w.el, 'wrmark');
  ok(nodes(w.el, 'nextq').length > 0,
    'a written task inside a calibration run would not grade — the guard is refusing on a ' +
    'question it never asked about');
}

/* ── 7. Two devices, and the panel ──────────────────────────────────────── */
{
  /* MERGED BY MAX, which is why this is three pairs of counters and not a
     stored percentage. The merge is progress-backup's; what is asserted here is
     that the SHAPE survives it without inventing a figure. */
  const PB = require(path.join(ROOT, 'progress-backup.js'));
  const phone = { practice: { units: { tpfb: { runs: 1, los: {}, qs: {}, hist: {},
    conf: { sure: { n: 20, right: 12 }, guess: { n: 4, right: 1 } } } } } };
  const laptop = { practice: { units: { tpfb: { runs: 2, los: {}, qs: {}, hist: {},
    conf: { sure: { n: 30, right: 25 }, guess: { n: 2, right: 2 } } } } } };
  const merged = PB.mergeBlob ? PB.mergeBlob(phone, laptop) : null;
  if (merged) {
    const c = merged.practice.units.tpfb.conf;
    ok(c.sure.n >= 20 && c.sure.n >= 30, 'the merge lost one device\'s sure count');
    ok(c.sure.right <= c.sure.n, 'the merge produced more right answers than answers given');
  } else {
    /* The merge entry point is not exported under that name; the shape claim is
       still worth stating, so it is asserted directly on the clamp that reads
       the record back. */
    const ctx = open({
      [STORE_KEY]: JSON.stringify({ lessons: {}, xp: 0, practice: { units: { tpfb: {
        runs: 1, los: {}, qs: {}, hist: {}, conf: { sure: { n: 10, right: 40 } } } } } }),
    });
    const c = ctx.UI.AAT3_UI.confidenceRead('tpfb');
    eq(c.sure.right, 10,
      'a record claiming more right answers than answers given was not clamped — a MAX-merge ' +
      'takes the larger n and the larger right independently and produces exactly this');
    eq(c.sure.pct, 100, 'and the percentage it reads back from is over a hundred');
  }

  /* THE PANEL. Below the floor it says how far off it is; above it, it names
     overconfidence only where the gap is real. */
  const thin = open({
    [STORE_KEY]: JSON.stringify({ lessons: {}, xp: 0, practice: { units: { tpfb: {
      runs: 1, los: {}, qs: {}, hist: {}, conf: { sure: { n: 4, right: 1 } } } } } }),
  });
  thin.UI.AAT3_UI.reset('practice', 'tpfb');
  thin.UI.AAT3_UI.mount(thin.el);
  ok(/4 of 30 answers so far/.test(thin.el.innerHTML),
    'with four answers the panel drew a figure instead of saying how many more it needs');
  ok(!/a3-cal-rows/.test(thin.el.innerHTML), 'and drew its bars from four answers');

  const over = open({
    [STORE_KEY]: JSON.stringify({ lessons: {}, xp: 0, practice: { units: { tpfb: {
      runs: 1, los: {}, qs: {}, hist: {},
      conf: { sure: { n: 40, right: 24 }, guess: { n: 6, right: 2 } } } } } }),
  });
  over.UI.AAT3_UI.reset('practice', 'tpfb');
  over.UI.AAT3_UI.mount(over.el);
  ok(/a3-cal-rows/.test(over.el.innerHTML), 'above the floor the panel drew no bars');
  ok(/wrong 40% of the time/.test(over.el.innerHTML),
    'a reader right 60% of the time when sure was not told the size of the gap');

  const calm = open({
    [STORE_KEY]: JSON.stringify({ lessons: {}, xp: 0, practice: { units: { tpfb: {
      runs: 1, los: {}, qs: {}, hist: {},
      conf: { sure: { n: 40, right: 38 }, guess: { n: 6, right: 2 } } } } } }),
  });
  calm.UI.AAT3_UI.reset('practice', 'tpfb');
  calm.UI.AAT3_UI.mount(calm.el);
  ok(/worth trusting/.test(calm.el.innerHTML),
    'a well-calibrated reader was not told so — the panel only ever scolds');
  ok(!/wrong \d+% of the time/.test(calm.el.innerHTML),
    'a reader right 95% of the time when sure was called overconfident, which is the checker ' +
    'that is sometimes wrong about arithmetic');
}

/* ── 8. Where the control sits, which is not a cosmetic question ─────────── */
{
  /* The two halves want opposite placements and the reason is the same one.

     The calibration ask HAS TO BE ANSWERED FIRST, so it comes first: a control
     that must precede the answer and renders after it is one the reader meets
     having already decided, and the nudge that fires when they submit without
     it then appears below the button they just pressed.

     The ordinary toggle is optional and comes last, because it is a note about
     an answer being given rather than one of the ways to give it — and because
     on a narrow screen anything sharing the answer row's right edge lands
     directly under the primary button at the same width, which is what a
     second submit looks like.

     BOTH SIDES ARE ASSERTED, so moving either one is a deliberate act. The
     anchor is the first answer control on screen, and if a question renders
     none of them this throws rather than passing: an ordering assertion with
     nothing to order against is the shape that reports whatever it is given. */
  const ANSWER_ACTS = ['ans', 'tf', 'tfsubmit', 'numinput', 'numsubmit'];
  function firstAnswerAt(el) {
    const h = el.innerHTML;
    const at = ANSWER_ACTS
      .map(a => h.indexOf('data-a3="' + a + '"'))
      .filter(i => i !== -1);
    if (!at.length) {
      throw new Error('no answer control on screen to order the ask against — ' +
        'actions present: ' + acts(el).join(', '));
    }
    return Math.min.apply(null, at);
  }

  const cal = open();
  cal.UI.AAT3_UI.reset('practice', 'tpfb');
  cal.UI.AAT3_UI.mount(cal.el);
  click(cal.el, 'startpractice', n => n.getAttribute('data-lo') === 'calib');

  /* EVERY QUESTION OF THE RUN, not the first: the ask is emitted from one
     place but the answer controls are a dozen branches, and a type that
     rendered its own before the stem would only show up further in. */
  let seen = 0;
  while (seen < 10 && !done(cal.el)) {
    const askAt = cal.el.innerHTML.indexOf('a3-conf-ask');
    ok(askAt !== -1, 'the calibration ask vanished partway through the run');
    ok(askAt !== -1 && askAt < firstAnswerAt(cal.el),
      'the calibration ask renders below the answer controls, so the one thing that has to be ' +
      'answered first is met last');
    seen++;
    click(cal.el, 'conf', b => b.getAttribute('data-c') === 'sure');
    NOW += 3000;
    answerCurrent(cal.el);
    if (done(cal.el)) break;
    click(cal.el, 'nextq');
  }
  ok(seen >= 10, `the calibration run ended after ${seen} questions, so most of it went unchecked`);

  const ord = open();
  ord.UI.AAT3_UI.reset('practice', 'tpfb');
  ord.UI.AAT3_UI.mount(ord.el);
  click(ord.el, 'startpractice', n => n.getAttribute('data-lo') === 'mix');

  let oseen = 0;
  while (oseen < 10 && !done(ord.el)) {
    const loneAt = ord.el.innerHTML.indexOf('a3-conf-lone');
    ok(loneAt !== -1, 'the lone toggle lost the class that positions it below the answer controls');
    ok(loneAt !== -1 && loneAt > firstAnswerAt(ord.el),
      'the lone toggle renders above the answer controls, coming between the question and the ' +
      'way to answer it');
    oseen++;
    NOW += 3000;
    answerCurrent(ord.el);
    if (done(ord.el)) break;
    click(ord.el, 'nextq');
  }
  ok(oseen >= 10, `the ordinary run ended after ${oseen} questions, so most of it went unchecked`);

  /* AND IT IS STILL REACHABLE. Everything above is about order; this is the
     assertion that a toggle small enough to get out of the way is still a
     toggle, which is the failure a placement change is most likely to cause. */
  const tap = open();
  tap.UI.AAT3_UI.reset('practice', 'tpfb');
  tap.UI.AAT3_UI.mount(tap.el);
  click(tap.el, 'startpractice', n => n.getAttribute('data-lo') === 'mix');
  click(tap.el, 'conf');
  eq(nodes(tap.el, 'conf').map(n => n.getAttribute('aria-pressed')), ['true'],
    'the repositioned toggle no longer answers a tap');
}

} finally {
  Date.now = realNow;
  unseed();
}

console.log(failures
  ? `\n${RED}${BOLD}── ${failures} of ${checks} checks failed${RESET}\n`
  : `\n${GREEN}${BOLD}── Knowing what you know holds ✓${RESET}  ${DIM}(${checks} assertions)${RESET}\n`);
process.exit(failures ? 1 : 0);
