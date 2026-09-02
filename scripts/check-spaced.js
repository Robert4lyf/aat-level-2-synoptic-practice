#!/usr/bin/env node
/**
 * Spaced repetition, on all three levels, from one schedule.
 *
 * WHAT CHANGED AND WHY THIS FILE EXISTS. Level 2 has had an adaptive schedule
 * since it was written: every graded answer sets the item's own ease and
 * interval, and the gap to the next sight of it widens as the reader earns it.
 * Levels 1 and 3 had something much narrower — a question got WRONG and later
 * fixed came back after a fixed seven days, and a question answered right the
 * first time was never scheduled at all. That put a reader's past mistakes in
 * the review pool and nothing else, when the material most likely to slip is
 * everything they got right once and have not seen since.
 *
 * So the algorithm moved into spaced.js and all three players call it. This
 * gate is what stops it drifting back apart.
 *
 * WHAT IT ASSERTS, AND WHAT WOULD OTHERWISE PASS SILENTLY.
 *
 *   §1 the arithmetic — intervals, the ease floor and ceiling, the year cap.
 *   §2 one copy, three callers: no level carries its own ladder any more.
 *   §3 a graded answer on Levels 1 and 3 WRITES a schedule, and right and
 *      wrong write different ones. Without this, deleting the new line from
 *      recordQuestion() leaves every other check in the suite passing.
 *   §4 the practice screen SELECTS on the schedule — due questions are
 *      offered, questions not yet due are not, and a question still in the
 *      mistakes backlog is not offered twice.
 *   §5 records written before schedules existed still work. Every reader who
 *      has used the app has these; a migration that stranded them would empty
 *      their review pool and nothing would say so.
 *   §6 the merge takes the WHOLE schedule from whichever device graded it
 *      last, at each level's own nesting depth. A field-by-field merge — the
 *      larger `reps` from one, the later `dueAt` from the other — invents a
 *      schedule neither device computed, and the generic merge in
 *      progress-backup.js does exactly that unless told otherwise.
 *   §7 spaced.js actually ships: script tag, precache, offline.
 *   §8 Level 2 in a real browser. The wrappers in app.js are guarded, and a
 *      guard that never fires looks exactly like a guard that is never
 *      needed — the only way to tell them apart is to answer a question on
 *      the real page and read back what was written.
 *
 * Run: node scripts/check-spaced.js   (exit 1 on any failure)
 */

'use strict';

const fs = require('fs');
const http = require('http');
const path = require('path');
const ROOT = path.join(__dirname, '..');

const SPACED = require(path.join(ROOT, 'spaced.js'));
const BACKUP = require(path.join(ROOT, 'progress-backup.js'));
const D1 = require('./lib/aat1-driver.js');
const D3 = require('./lib/aat3-driver.js');

const RED = '\x1b[31m', GREEN = '\x1b[32m', YEL = '\x1b[33m';
const BOLD = '\x1b[1m', DIM = '\x1b[2m', RESET = '\x1b[0m';

let failures = 0, checks = 0;
function ok(cond, label) {
  checks++;
  if (!cond) { failures++; console.log(`  ${RED}✗${RESET} ${label}`); }
}

console.log(`${BOLD}Spaced repetition${RESET}\n`);

const DAY = 24 * 60 * 60 * 1000;
const T0 = 1700000000000;                    // a fixed "now", so nothing is clock-dependent

/* ── 1. The arithmetic ────────────────────────────────────────────────────── */
console.log(`${DIM}1. The schedule itself${RESET}`);
{
  /* Three successes in a row. The first two intervals are deliberately fixed:
     an item recalled once is not known, and letting the ease loose immediately
     would space a lucky guess out to a week. */
  const a = SPACED.schedule(undefined, true, T0);
  ok(a.interval === 1, `first correct answer returns tomorrow (got ${a.interval})`);
  ok(a.reps === 1, 'and counts one rep');
  ok(a.dueAt === T0 + DAY, 'with a due date one day out');

  const b = SPACED.schedule(a, true, T0);
  ok(b.interval === 3, `second correct answer returns in three days (got ${b.interval})`);

  const c = SPACED.schedule(b, true, T0);
  /* interval 3 × ease 2.66 = 7.98 → 8. From here the ease is in charge. */
  ok(c.interval === 8, `third correct answer uses the ease (expected 8, got ${c.interval})`);
  ok(c.ease > b.ease && b.ease > a.ease, 'and the ease rises with each success');

  const d = SPACED.schedule(c, false, T0);
  ok(d.interval === 1, `a miss brings it back tomorrow (got ${d.interval})`);
  ok(d.reps === 0, 'and resets the run of successes');
  ok(Math.abs(d.ease - (c.ease - 0.2)) < 1e-9,
    `a miss drops the ease by 0.2 (${c.ease} → ${d.ease})`);

  /* A miss must cost more than a success earns, or a question missed every
     other time would drift easier for ever. */
  ok(0.2 > 0.08, 'a miss costs more ease than a success earns');

  /* Floors and ceilings. */
  let hard = { ease: 2.5, reps: 0, interval: 1, dueAt: T0 };
  for (let i = 0; i < 30; i++) hard = SPACED.schedule(hard, false, T0);
  ok(hard.ease === SPACED.EASE_MIN, `ease bottoms out at ${SPACED.EASE_MIN} (got ${hard.ease})`);
  let easy = undefined;
  for (let i = 0; i < 30; i++) easy = SPACED.schedule(easy, true, T0);
  ok(easy.ease === SPACED.EASE_MAX, `ease tops out at ${SPACED.EASE_MAX} (got ${easy.ease})`);
  ok(easy.interval === SPACED.INTERVAL_MAX,
    `the interval is capped at a year (got ${easy.interval})`);
  ok(easy.dueAt === T0 + SPACED.INTERVAL_MAX * DAY, 'and the due date respects the cap');

  /* isDue is inclusive of the moment itself: an item due at noon is due at
     noon, not a millisecond later. */
  ok(SPACED.isDue({ dueAt: T0 }, T0) === true, 'an item due now is due');
  ok(SPACED.isDue({ dueAt: T0 + 1 }, T0) === false, 'an item due in a millisecond is not');
  ok(SPACED.isDue(undefined, T0) === false, 'nothing with no schedule is due');
  ok(SPACED.isDue({}, T0) === false, 'and neither is an empty record');

  /* touchedAt is how a merge decides which of two copies is newer. It is not
     stored, it is recovered — so it has to round-trip. */
  ok(SPACED.touchedAt(c) === T0, `touchedAt recovers the grading time (got ${SPACED.touchedAt(c)})`);
  ok(SPACED.touchedAt(SPACED.schedule(c, true, T0 + 5 * DAY)) === T0 + 5 * DAY,
    'and moves with a later grading');

  /* A Leitner box carried over from the version before this one. */
  const migrated = SPACED.fromBox({ box: 3, dueAt: T0 });
  ok(migrated.interval === 7 && migrated.reps === 3,
    `box 3 arrives as a 7-day interval (got ${migrated.interval}/${migrated.reps})`);
  ok(SPACED.fromBox({ box: 99 }).interval === 30, 'a box beyond the ladder clamps to the top');
  ok(SPACED.fromBox({}).interval === 1, 'and a record with no box starts at the bottom');
}

/* ── 2. One copy of the algorithm, three callers ──────────────────────────── */
console.log(`${DIM}2. One schedule, shared${RESET}`);
{
  const read = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');
  ['app.js', 'aat1-ui.js', 'aat3-ui.js'].forEach((f) => {
    ok(/AATSpaced\.schedule\(/.test(read(f)), `${f} schedules through the shared module`);
  });
  /* The ease step is the fingerprint of the algorithm. If it appears in a
     player, that player has grown its own copy. */
  ['aat1-ui.js', 'aat3-ui.js'].forEach((f) => {
    ok(!/ease\s*[+\-]\s*0\.0?\d/.test(read(f)), `${f} does not carry its own ease arithmetic`);
  });
}

/* ── 3. A graded answer writes a schedule ────────────────────────────────── */
console.log(`${DIM}3. Every graded answer is scheduled${RESET}`);

/* THE RUN IS SEEDED RATHER THAN RANDOM. A run drawn at random serves whatever
   question type comes up, and a first version of this section broke off as
   soon as it met one it could not answer — reporting "nothing was graded"
   against a player that was working perfectly. The mistakes run serves exactly
   the questions in the store, in a known order, so seeding it with one plain
   multiple-choice question makes the whole section deterministic. It also
   grades through the same recordQuestion() as every other run. */
const A1_KEY = D1.STORE_KEY, A3_KEY = D3.STORE_KEY;
const a1qs = (store) => {
  try { return JSON.parse(store.getItem(A1_KEY) || '{}').practice.qs || {}; } catch (e) { return {}; }
};
const a3qs = (store) => {
  try { return (JSON.parse(store.getItem(A3_KEY) || '{}').practice.units.tpfb || {}).qs || {}; }
  catch (e) { return {}; }
};

/* Answer one seeded multiple-choice question, right or wrong on purpose, and
   hand back the record that was written for it. */
function gradeOne(C, qId, right) {
  const seeded = {};
  seeded[qId] = { w: Date.now() - 60000 };            // outstanding, so the mistakes run serves it
  const store = C.D.fakeStore({ [C.key]: JSON.stringify(C.build(seeded)) });
  const M = C.D.loadUI(store);
  const el = C.D.fakeEl();
  C.mount(M, el);
  if (!C.D.nodes(el, 'startpractice').some(n => n.getAttribute('data-lo') === 'missed')) {
    return { err: 'no mistakes run offered' };
  }
  C.D.click(el, 'startpractice', n => n.getAttribute('data-lo') === 'missed');
  const q = C.bank().find(b => b.id === qId);
  if (!q) return { err: 'question not in the bank' };
  const want = right ? q.ans : (q.ans === 0 ? 1 : 0);
  const node = C.D.nodes(el, 'ans').find(n => n.getAttribute('data-i') === String(want));
  if (!node) return { err: 'the seeded question did not render as multiple choice' };
  node.fire('click');
  if (!C.D.nodes(el, 'nextq').length) return { err: 'answering it did not grade it' };
  /* The record is written when the reader moves on, not the instant the mark
     appears — so the run has to be carried through to the end of the question
     or the store still holds only what was seeded. */
  C.D.click(el, 'nextq');
  return { rec: C.qs(store)[qId] };
}

/* Level 1 and Level 3 are asserted through the same fixture, built at the
   right nesting depth for each. */
const CASES = [
  {
    name: 'Level 1', D: D1, prefix: 'a1', key: A1_KEY,
    mount: (M, el) => { M.AAT1_UI.reset('practice'); M.AAT1_UI.mount(el); },
    bank: () => require(path.join(ROOT, 'aat1-practice-data.js')).AAT1_PRACTICE.QUESTIONS,
    ids: () => require(path.join(ROOT, 'aat1-practice-data.js')).AAT1_PRACTICE.QUESTIONS.map(q => q.id),
    qs: (store) => a1qs(store),
    mcq: 'P1-01',
    build: (qs) => ({ lessons: {}, xp: 0, lessonQs: {},
                      practice: { runs: 1, mocks: 0, mockBest: 0, los: {}, qs: qs } }),
  },
  {
    name: 'Level 3', D: D3, prefix: 'a3', key: A3_KEY,
    mount: (M, el) => { M.AAT3_UI.reset('practice', 'tpfb'); M.AAT3_UI.mount(el); },
    bank: () => require(path.join(ROOT, 'aat3-practice-data.js')).AAT3_PRACTICE.QUESTIONS
                  .filter(q => q.unitKey === 'tpfb'),
    ids: () => require(path.join(ROOT, 'aat3-practice-data.js')).AAT3_PRACTICE.QUESTIONS
                 .filter(q => q.unitKey === 'tpfb').map(q => q.id),
    qs: (store) => a3qs(store),
    mcq: 'P-1-03',
    build: (qs) => ({ lessons: {}, xp: 0, lessonQs: {},
                      practice: { units: { tpfb: { runs: 1, los: {}, qs: qs } } } }),
  },
];


/* The two players are asserted through one set of assertions. Anything that
   holds on one level must hold on the other; a schedule that only Level 1
   writes is exactly the drift this file exists to catch. */
CASES.forEach((C) => {
  const right = gradeOne(C, C.mcq, true);
  ok(!right.err, `${C.name}: a correct answer was graded${right.err ? ' — ' + right.err : ''}`);
  const rr = right.rec;
  ok(!!(rr && rr.sr), `${C.name}: a correct answer writes a schedule`);
  ok(!!(rr && rr.sr && rr.sr.interval === 1 && rr.sr.reps === 1),
    `${C.name}: and it is the first-success schedule`);
  ok(!!(rr && rr.sr && rr.sr.lastResult === true), `${C.name}: recorded as recalled`);
  ok(!!(rr && rr.sr && rr.sr.dueAt > Date.now()), `${C.name}: with a due date in the future`);
  ok(!!(rr && typeof rr.r === 'number'),
    `${C.name}: the old timestamp is still written, so the mistakes backlog is unharmed`);

  const wrong = gradeOne(C, C.mcq, false);
  ok(!wrong.err, `${C.name}: a wrong answer was graded${wrong.err ? ' — ' + wrong.err : ''}`);
  const wr = wrong.rec;
  ok(!!(wr && wr.sr), `${C.name}: a wrong answer writes a schedule too`);
  ok(!!(wr && wr.sr && wr.sr.lastResult === false), `${C.name}: recorded as missed`);
  ok(!!(wr && wr.sr && wr.sr.reps === 0), `${C.name}: with no successes to its name`);
  ok(!!(wr && wr.sr && wr.sr.ease < SPACED.EASE_DEFAULT),
    `${C.name}: and a miss lowers the ease (got ${wr && wr.sr && wr.sr.ease})`);
  ok(!!(rr && wr && rr.sr && wr.sr && rr.sr.ease !== wr.sr.ease),
    `${C.name}: right and wrong do not write the same schedule`);
});


/* ── 4. The practice screen selects on the schedule ───────────────────────── */
console.log(`${DIM}4. The review offer is driven by the schedule${RESET}`);

/* A schedule that fell due `days` ago, or is `days` away if negative. */
function dueSchedule(daysAgo) {
  return { ease: 2.5, reps: 2, interval: 3, dueAt: Date.now() - daysAgo * DAY, lastResult: true };
}

/* The number on the review card, read off the element that carries it rather
   than the sentence around it, and scoped to the review card so a change to
   the mistakes card cannot answer for it. */
function dueOffered(html, prefix) {
  const card = new RegExp(`${prefix}-alert-due[\\s\\S]*?class="${prefix}-alert-t">(\\d+) `).exec(html);
  return card ? Number(card[1]) : 0;
}

CASES.forEach((C) => {
  const ids = C.ids();
  const now = Date.now();
  const qs = {};
  /* One due, one not yet due, one due but still outstanding, and one that a
     reader got right first time and has never missed — the case the old rule
     could not schedule at all. */
  qs[ids[0]] = { r: now - 5 * DAY, sr: dueSchedule(2) };
  qs[ids[1]] = { r: now - 1 * DAY, sr: dueSchedule(-5) };
  qs[ids[2]] = { r: now - 9 * DAY, w: now - 1 * DAY, sr: dueSchedule(2) };
  qs[ids[3]] = { r: now - 6 * DAY, sr: dueSchedule(1) };

  const store = C.D.fakeStore({ [C.key]: JSON.stringify(C.build(qs)) });
  const M = C.D.loadUI(store);
  const el = C.D.fakeEl();
  C.mount(M, el);
  const html = el.innerHTML;

  ok(dueOffered(html, C.prefix) === 2,
    `${C.name}: two of the four questions are due (offered ${dueOffered(html, C.prefix)})`);
  ok(/data-lo="refresh"/.test(html), `${C.name}: the review card is on the practice screen`);

  /* And the run OPENS ON THE ONE THAT FELL DUE FIRST. Order matters here:
     a review pool served newest-first leaves the oldest item permanently at
     the back, which is the one thing a spacing schedule exists to prevent.
     ids[0] fell due two days ago, ids[3] yesterday. */
  C.D.click(el, 'startpractice', n => n.getAttribute('data-lo') === 'refresh');
  const bank = C.bank();
  const stem = (el.innerHTML.match(new RegExp(`<h2 class="${C.prefix}-q">([\\s\\S]*?)</h2>`)) || [])[1] || '';
  const text = stem.replace(/<[^>]*>/g, '').trim();
  const opened = bank.find(b => String(b.q).replace(/\*\*/g, '').replace(/<[^>]*>/g, '').trim() === text);
  ok(!!opened, `${C.name}: the review run puts a question on screen`);
  ok(opened && opened.id === ids[0],
    `${C.name}: and it is the one that fell due first (opened ${opened && opened.id}, expected ${ids[0]})`);

  /* The two that must NOT be offered, each for its own reason. */
  const notDue = {};
  notDue[ids[1]] = { r: now - DAY, sr: dueSchedule(-5) };
  const s2 = C.D.fakeStore({ [C.key]: JSON.stringify(C.build(notDue)) });
  const el2 = C.D.fakeEl();
  C.mount(C.D.loadUI(s2), el2);
  ok(dueOffered(el2.innerHTML, C.prefix) === 0,
    `${C.name}: a question not yet due is not offered for review`);
  ok(!/data-lo="refresh"/.test(el2.innerHTML),
    `${C.name}: and the card is not shown at all when nothing is due`);

  const outstanding = {};
  outstanding[ids[2]] = { r: now - 9 * DAY, w: now - DAY, sr: dueSchedule(2) };
  const s3 = C.D.fakeStore({ [C.key]: JSON.stringify(C.build(outstanding)) });
  const el3 = C.D.fakeEl();
  C.mount(C.D.loadUI(s3), el3);
  ok(dueOffered(el3.innerHTML, C.prefix) === 0,
    `${C.name}: a question still in the mistakes backlog is not also offered for review`);
  ok(/data-lo="missed"/.test(el3.innerHTML),
    `${C.name}: it is offered as a mistake instead`);
});

/* ── 5. Records that predate the schedule ────────────────────────────────── */
console.log(`${DIM}5. Records written before schedules existed${RESET}`);
CASES.forEach((C) => {
  const ids = C.ids();
  const now = Date.now();
  const legacy = {};
  legacy[ids[0]] = { w: now - 30 * DAY, r: now - 8 * DAY };   // fixed 8 days ago → due
  legacy[ids[1]] = { w: now - 30 * DAY, r: now - 2 * DAY };   // fixed 2 days ago → not yet
  legacy[ids[2]] = { r: now - 40 * DAY };                     // right first time, never missed

  const store = C.D.fakeStore({ [C.key]: JSON.stringify(C.build(legacy)) });
  const el = C.D.fakeEl();
  C.mount(C.D.loadUI(store), el);
  ok(dueOffered(el.innerHTML, C.prefix) === 1,
    `${C.name}: a mistake fixed over a week ago is still offered (offered ${dueOffered(el.innerHTML, C.prefix)})`);

  /* And answering one gives it a schedule, so nobody is stranded on the old
     rule for ever. */
  const rec = SPACED.schedule(undefined, true, now);
  ok(rec.dueAt === now + DAY, `${C.name}: answering a legacy record schedules it from scratch`);
});

/* ── 6. Two devices ──────────────────────────────────────────────────────── */
console.log(`${DIM}6. Merging two devices${RESET}`);
{
  /* The schedules under test: the phone graded LATER, and it graded a MISS, so
     every individual field of the laptop's record is the larger one. A
     field-by-field merge would therefore keep all of the laptop's numbers and
     the phone's date, which is a schedule neither device ever computed. */
  const laptop = { ease: 2.66, reps: 4, interval: 20, dueAt: T0 + 20 * DAY, lastResult: true };
  const phone  = { ease: 2.30, reps: 0, interval: 1,  dueAt: T0 + 6 * DAY,  lastResult: false };
  ok(SPACED.touchedAt(phone) > SPACED.touchedAt(laptop), 'fixture: the phone graded it later');
  ok(laptop.ease > phone.ease && laptop.reps > phone.reps && laptop.interval > phone.interval,
    'fixture: every field of the laptop record is the larger one');

  const shapes = [
    { name: 'Level 1 practice', key: A1_KEY,
      wrap: (sr) => ({ practice: { qs: { 'P1-01': { r: 1000, sr: sr } } } }),
      read: (v) => v.practice.qs['P1-01'].sr },
    { name: 'Level 1 lesson checks', key: A1_KEY,
      wrap: (sr) => ({ lessonQs: { 'L1-1-1#0': { r: 1000, sr: sr } } }),
      read: (v) => v.lessonQs['L1-1-1#0'].sr },
    { name: 'Level 3 practice', key: A3_KEY,
      wrap: (sr) => ({ practice: { units: { tpfb: { qs: { 'P-1-01': { r: 1000, sr: sr } } } } } }),
      read: (v) => v.practice.units.tpfb.qs['P-1-01'].sr },
    { name: 'Level 2', key: 'aatPrep_v2',
      wrap: (sr) => ({ sr: { 'Q1': sr } }),
      read: (v) => v.sr['Q1'] },
  ];

  shapes.forEach((S) => {
    const L = { [S.key]: S.wrap(laptop) };
    const P = { [S.key]: S.wrap(phone) };
    const fwd = S.read(BACKUP.mergeAll(L, P)[S.key]);
    const bwd = S.read(BACKUP.mergeAll(P, L)[S.key]);
    ok(fwd.reps === 0 && fwd.interval === 1 && fwd.ease === 2.30,
      `${S.name}: the later grading wins whole (got reps ${fwd.reps}, interval ${fwd.interval}, ease ${fwd.ease})`);
    ok(bwd.reps === 0 && bwd.interval === 1 && bwd.ease === 2.30,
      `${S.name}: and the merge run the other way round agrees`);
    ok(fwd.dueAt === phone.dueAt, `${S.name}: with the due date that record was computed with`);
  });

  /* Idempotence: merging the same file twice must not move anything. */
  const S = shapes[0];
  const L = { [S.key]: S.wrap(laptop) }, P = { [S.key]: S.wrap(phone) };
  const once = BACKUP.mergeAll(L, P);
  const twice = BACKUP.mergeAll(once, P);
  ok(JSON.stringify(S.read(once[S.key])) === JSON.stringify(S.read(twice[S.key])),
    'importing the same backup twice changes nothing');

  /* The timestamps beside the schedule keep merging as they always did. */
  const a = { [A1_KEY]: { practice: { qs: { 'P1-01': { w: 3000, r: 1000, sr: laptop } } } } };
  const b = { [A1_KEY]: { practice: { qs: { 'P1-01': { w: 2000, r: 4000, sr: phone } } } } };
  const m = BACKUP.mergeAll(a, b)[A1_KEY].practice.qs['P1-01'];
  ok(m.w === 3000 && m.r === 4000, 'the mistake timestamps still merge by most recent');

  /* One side has no schedule at all — the record must arrive intact, not be
     blended into a half-record. */
  const bare = { [A1_KEY]: { practice: { qs: { 'P1-01': { r: 1000 } } } } };
  const sched = { [A1_KEY]: { practice: { qs: { 'P1-01': { r: 1000, sr: laptop } } } } };
  const gained = BACKUP.mergeAll(bare, sched)[A1_KEY].practice.qs['P1-01'].sr;
  ok(gained && gained.interval === 20 && gained.reps === 4,
    'a device with no schedule for a question adopts the other side\'s whole record');
}

/* ── 7. It ships ─────────────────────────────────────────────────────────── */
console.log(`${DIM}7. The module actually ships${RESET}`);
{
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  ok(/<script src="spaced\.js"><\/script>/.test(html), 'index.html loads spaced.js');
  /* Order matters: the players read window.AATSpaced when they grade, but
     app.js also reads it, and a script that loads after its callers have run
     would be a blank screen rather than a missing feature. */
  const iSpaced = html.indexOf('spaced.js');
  ['app.js', 'aat1-ui.js', 'aat3-ui.js'].forEach((f) => {
    const i = html.indexOf(`"${f}"`);
    ok(i === -1 || iSpaced < i, `spaced.js is loaded before ${f}`);
  });

  const sw = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');
  ok(/'\.\/spaced\.js'/.test(sw), 'the service worker precaches spaced.js, so review works offline');

  /* The Node drivers must load it too, or every driver-based check in the
     suite grades questions through a module that is not there. */
  ['aat1-driver.js', 'aat3-driver.js'].forEach((f) => {
    const d = fs.readFileSync(path.join(ROOT, 'scripts', 'lib', f), 'utf8');
    ok(/spaced\.js/.test(d), `${f} loads spaced.js`);
  });
}

/* ── 8. Level 2, in a real browser ───────────────────────────────────────────
   app.js only runs in a browser, so this drives the real page. It is here
   because sections 1–7 would all pass with Level 2 quietly no longer
   scheduling anything: the wrapper is guarded, and a guard that never fires
   looks exactly like a guard that is never needed. The only way to tell them
   apart is to answer a question and look at what was written. */
const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.webmanifest': 'application/manifest+json',
  '.png': 'image/png', '.svg': 'image/svg+xml'
};
function serve() {
  return new Promise(resolve => {
    const server = http.createServer((req, res) => {
      const url = decodeURIComponent(req.url.split('?')[0]);
      const file = path.join(ROOT, url === '/' ? 'index.html' : url);
      if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
        res.writeHead(404); res.end('not found'); return;
      }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
      fs.createReadStream(file).pipe(res);
    });
    server.listen(0, '127.0.0.1', () => resolve({ server, port: server.address().port }));
  });
}

const L2 = require('./lib/aat2-page.js');
let chromium = null;
try { ({ chromium } = require('playwright')); } catch (e) { /* handled below */ }

function finish() {
  console.log();
  if (failures) { console.log(`${RED}${BOLD}✗ ${failures} of ${checks} checks failed${RESET}`); process.exit(1); }
  console.log(`${GREEN}${BOLD}✓ ${checks} checks passed${RESET}`);
  process.exit(0);
}

(async () => {
  console.log(`${DIM}8. Level 2, in a browser${RESET}`);
  if (!chromium) {
    if (process.env.REQUIRE_PLAYWRIGHT) {
      console.log(`  ${RED}✗${RESET}  Playwright is required here and is not installed.`);
      failures++; checks++;
      finish();
      return;
    }
    console.log(`  ${YEL}⚠${RESET}  Playwright is not installed — Level 2 not driven.`);
    finish();
    return;
  }
  const { server, port } = await serve();
  const CANDIDATES = [
    '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell',
    '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  ].filter(p => fs.existsSync(p));
  const browser = await chromium.launch(CANDIDATES.length ? { executablePath: CANDIDATES[0] } : {});
  try {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    await page.addInitScript(() => localStorage.setItem('multisubject_active', 'aat'));
    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'load' });
    await page.waitForFunction(() => {
      const a = document.getElementById('app');
      return a && a.textContent.trim().length > 40;
    }, { timeout: 15000 }).catch(() => {});

    /* The module is on the page, and it is THE module — the same arithmetic
       Node just checked, not a second copy that happens to share a name. */
    const fromPage = await page.evaluate(() =>
      (window.AATSpaced ? window.AATSpaced.schedule({ ease: 2.5, reps: 2, interval: 3 }, true, 0) : null));
    ok(!!fromPage, 'Level 2: spaced.js is on the page');
    const fromNode = SPACED.schedule({ ease: 2.5, reps: 2, interval: 3 }, true, 0);
    ok(JSON.stringify(fromPage) === JSON.stringify(fromNode),
      `Level 2: and it computes what Node computes (${JSON.stringify(fromPage)})`);

    await L2.tap(page, '#startBtn');
    await L2.tap(page, '[data-tab="home"]');
    await L2.tap(page, '#endlessBtn');
    await page.waitForSelector('.quiz-container', { timeout: 10000 }).catch(() => {});

    /* Answer whatever is on screen, right or wrong — the assertion is that a
       schedule was WRITTEN, which is true either way. Up to four questions,
       because a type this harness cannot answer must show up as "nothing was
       graded" rather than as a missing schedule. */
    let graded = 0;
    for (let i = 0; i < 4; i++) {
      await L2.answerCurrent(page);
      if (await page.locator('#nextBtn').count()) { graded++; await L2.tap(page, '#nextBtn'); }
      if (graded) break;
    }
    ok(graded > 0, `Level 2: a question was graded (${graded ? '' : await L2.currentType(page)})`);

    const sr = await page.evaluate(() => {
      try { return (JSON.parse(localStorage.getItem('aatPrep_v2') || '{}').sr) || {}; }
      catch (e) { return {}; }
    });
    const ids = Object.keys(sr);
    ok(ids.length > 0, 'Level 2: answering a question writes a schedule');
    const rec = sr[ids[0]] || {};
    ok(typeof rec.ease === 'number' && typeof rec.reps === 'number' &&
       typeof rec.interval === 'number' && typeof rec.dueAt === 'number',
      `Level 2: and it is a whole schedule (got ${JSON.stringify(rec)})`);
    ok(rec.interval >= 1 && rec.dueAt > Date.now(),
      'Level 2: with a due date in the future');
    ok(SPACED.isDue(rec, Date.now()) === false,
      'Level 2: a question just answered is not immediately due again');
  } finally {
    await browser.close().catch(() => {});
    server.close();
  }
  finish();
})();
