#!/usr/bin/env node
/* Tests for the progress backup merge.
 *
 * This is the one piece of the app that can destroy work rather than merely
 * display it wrongly, so it gets real assertions rather than a shape check.
 * The properties below are the ones the feature actually rests on: merging
 * never loses a completed lesson, never lowers a best score, and gives the
 * same answer however many times you run it and in whichever direction. */

'use strict';

const path = require('path');

/* A localStorage stand-in with the same surface the module uses. */
function fakeStore(initial) {
  const m = new Map(Object.entries(initial || {}));
  return {
    get length() { return m.size; },
    key(i) { return Array.from(m.keys())[i]; },
    getItem(k) { return m.has(k) ? m.get(k) : null; },
    setItem(k, v) { m.set(k, String(v)); },
    removeItem(k) { m.delete(k); },
    dump() { return Object.fromEntries(m); },
  };
}

global.window = global;
const PB = require(path.join(__dirname, '..', 'progress-backup.js'));

let failures = 0, checks = 0;
function ok(cond, label) {
  checks++;
  if (!cond) { failures++; console.log('  \x1b[31m✗\x1b[0m ' + label); }
}
function eq(a, b, label) { ok(JSON.stringify(a) === JSON.stringify(b), label + ' — got ' + JSON.stringify(a) + ', expected ' + JSON.stringify(b)); }

const DAY = 24 * 60 * 60 * 1000;
const T0 = 1786000000000;

/* Two devices with genuinely different work on them. */
const phone = {
  settings: { darkMode: true, soundOn: true },
  stats: {
    questions: { 'q1': { attempts: 5, correct: 4, seen: true, lastSeen: T0 + 900 },
                 'q2': { attempts: 1, correct: 0, seen: true, lastSeen: T0 } },
    topics: { itbk: { attempts: 6, correct: 4 } },
    streak: { current: 3, best: 9, lastCorrectAt: T0 + 900 },
  },
  flagged: { q2: T0 },
  sr: { q1: { ease: 2.6, reps: 3, interval: 7, dueAt: T0 + 900 + 7 * DAY, lastResult: true } },
  history: [{ mode: 'mock', topic: 'all', score: 60, total: 80, pct: 75, timestamp: T0 + 900 }],
  learn: { lessons: { 'L-1': { firstAt: T0, best: 90, stars: 3, lastAt: T0 + 900 } }, xp: 400, bestCombo: 7, taDone: { 'ta-1': true }, unitTests: {} },
  flash: { 'accrual': { box: 4, dueAt: T0 + 14 * DAY } },
  mistakes: { q2: { count: 2 } },
  planner: { examDate: '2026-11-01', dailyGoalXp: 30 },
  badges: { 'first-100': T0 },
  daily: { '2026-08-01': { xp: 40, answered: 12 } },
  story: { v: 1, days: { d1: { best: 80 } } },
};

const desktop = {
  settings: { darkMode: false, soundOn: false },
  stats: {
    questions: { 'q1': { attempts: 2, correct: 2, seen: true, lastSeen: T0 },
                 'q3': { attempts: 4, correct: 1, seen: true, lastSeen: T0 + 5000 } },
    topics: { itbk: { attempts: 3, correct: 3 }, pobc: { attempts: 9, correct: 6 } },
    streak: { current: 1, best: 12, lastCorrectAt: T0 + 5000 },
  },
  flagged: { q3: T0 + 5000 },
  sr: { q1: { ease: 2.3, reps: 1, interval: 1, dueAt: T0 + 5000 + 1 * DAY, lastResult: false } },
  history: [{ mode: 'practice', topic: 'poc', score: 8, total: 10, pct: 80, timestamp: T0 + 5000 }],
  learn: { lessons: { 'L-1': { firstAt: T0 - 9000, best: 70, stars: 2, lastAt: T0 + 5000 },
                      'L-2': { firstAt: T0 + 1, best: 100, stars: 3, lastAt: T0 + 5000 } }, xp: 250, bestCombo: 11, taDone: { 'ta-2': true }, unitTests: {} },
  flash: { 'accrual': { box: 2, dueAt: T0 + 3 * DAY }, 'prepayment': { box: 1, dueAt: T0 + DAY } },
  mistakes: { q2: { count: 1, cleared: true, clearedAt: T0 + 5000 } },
  planner: { examDate: null, dailyGoalXp: 50 },
  badges: { 'streak-7': T0 + 5000 },
  daily: { '2026-08-02': { xp: 25, answered: 8 } },
  story: { v: 1, days: { d2: { best: 60 } } },
};

/* Level 3 keeps its practice record per outcome rather than as one running
   total, precisely so this merge adds up — see check-aat3-practice-summary.js,
   which asserts the arithmetic the two devices below produce. */
const A = { aatPrep_v2: phone, prep_v2_aat3: { lessons: { '3A': { best: 80 } }, xp: 120, practice: { runs: 2, los: { '1': { attempted: 10, correct: 6 } } } }, multisubject_active: 'aat3', prep_v2_settings: { seenSplash: true } };
const B = { aatPrep_v2: desktop, prep_v2_aat3: { lessons: { '3A': { best: 60 }, '3B': { best: 95 } }, xp: 90, practice: { runs: 1, los: { '2': { attempted: 8, correct: 3 } } } }, multisubject_active: 'aat', prep_v2_settings: { seenSplash: false } };

console.log('\x1b[1mProgress backup\x1b[0m\n');

/* ── Round trip ─────────────────────────────────────────────────────────── */
{
  const store = fakeStore();
  PB.writeAll(A, store);
  const doc = PB.buildExport({ store, now: T0, appVersion: 'v1.12.2' });
  const target = fakeStore();
  PB.applyImport(doc, 'replace', target);
  const back = PB.readAll(target);
  eq(back.aatPrep_v2, A.aatPrep_v2, 'round trip preserves a subject blob exactly');
  ok(!('multisubject_active' in back), 'round trip does not carry the active-subject key');
  ok(!('prep_v2_settings' in back), 'round trip does not carry device settings');
  eq(doc.format, PB.FORMAT, 'export is stamped with the format id');
  ok(!('multisubject_active' in doc.keys), 'the exported file itself never contains the active-subject key');
  ok(!('prep_v2_settings' in doc.keys), 'the exported file itself never contains device settings');
  ok('aatPrep_v2' in doc.keys, 'the exported file does contain subject progress');

  /* The sync key is a credential. A backup file gets emailed to yourself, put
     in cloud storage, handed to somebody — it must not carry the ability to
     read and overwrite the sync document. */
  const withSync = fakeStore();
  PB.writeAll({ aatPrep_v2: phone, prep_v2_sync: { key: 'SUPERSECRETSYNCKEY0123456789abcd', version: 4 } }, withSync);
  const doc2 = PB.buildExport({ store: withSync, now: T0 });
  ok(!('prep_v2_sync' in doc2.keys), 'the sync key is NEVER written into an exported file');
  ok(JSON.stringify(doc2).indexOf('SUPERSECRETSYNCKEY') === -1, 'no part of the sync key appears anywhere in the export');
  const target2 = fakeStore();
  PB.writeAll({ prep_v2_sync: { key: 'MYOWNKEY0123456789abcdefghijklmn', version: 9 } }, target2);
  PB.applyImport({ format: PB.FORMAT, version: 1, keys: { prep_v2_sync: { key: 'THEIRS', version: 1 }, aatPrep_v2: phone } }, 'replace', target2);
  eq(JSON.parse(target2.getItem('prep_v2_sync')).key, 'MYOWNKEY0123456789abcdefghijklmn', 'importing a doctored file cannot overwrite this device\'s sync key');
}

/* ── Nothing is lost ────────────────────────────────────────────────────── */
{
  const m = PB.mergeAll(A, B).aatPrep_v2;
  eq(Object.keys(m.stats.questions).sort(), ['q1', 'q2', 'q3'], 'every attempted question survives the merge');
  eq(Object.keys(m.learn.lessons).sort(), ['L-1', 'L-2'], 'every completed lesson survives the merge');
  eq(m.learn.lessons['L-1'].best, 90, 'a lesson best score is the higher of the two');
  eq(m.learn.lessons['L-1'].stars, 3, 'lesson stars take the higher of the two');
  eq(m.learn.lessons['L-1'].firstAt, T0 - 9000, 'firstAt takes the EARLIER of the two');
  eq(m.learn.xp, 400, 'XP takes the higher of the two');
  eq(m.learn.bestCombo, 11, 'best combo takes the higher of the two');
  eq(m.learn.taDone, { 'ta-1': true, 'ta-2': true }, 'completed task areas are unioned');
  eq(Object.keys(m.flagged).sort(), ['q2', 'q3'], 'flags from both devices are kept');
  eq(Object.keys(m.badges).sort(), ['first-100', 'streak-7'], 'badges from both devices are kept');
  eq(m.mistakes.q2.cleared, true, 'a mistake cleared on either device stays cleared');
  /* The line above only exercises absent-versus-true. A boolean that is
     explicitly false locally must still flip when the file says true. */
  const flags = PB.mergeSubject(
    { learn: { taDone: { 'ta-9': false } }, mistakes: { q9: { count: 1, cleared: false } } },
    { learn: { taDone: { 'ta-9': true } }, mistakes: { q9: { count: 1, cleared: true } } }
  );
  eq(flags.learn.taDone['ta-9'], true, 'a false boolean is raised to true by the imported file');
  eq(flags.mistakes.q9.cleared, true, 'a mistake explicitly uncleared here is cleared by the file');
  eq(m.stats.topics.pobc, { attempts: 9, correct: 6 }, 'a topic only one device has is carried over');
  const l3 = PB.mergeAll(A, B).prep_v2_aat3;
  eq(Object.keys(l3.lessons).sort(), ['3A', '3B'], 'Level 3 lessons from both devices survive');
  eq(l3.lessons['3A'].best, 80, 'Level 3 best score is the higher of the two');
  eq(l3.xp, 120, 'Level 3 XP is the higher of the two');
  eq(Object.keys(l3.practice.los).sort(), ['1', '2'], 'Level 3 practice on an outcome only one device touched is carried over');
  eq(l3.practice.los['1'], { attempted: 10, correct: 6 }, 'a per-outcome practice record survives intact');
  eq(l3.practice.runs, 2, 'finished practice runs take the higher of the two');
}

/* ── Idempotent and order-independent ───────────────────────────────────── */
{
  const once = PB.mergeAll(A, B);
  const twice = PB.mergeAll(once, B);
  eq(twice, once, 'merging the same file twice changes nothing the second time');

  const ab = PB.mergeAll(A, B).aatPrep_v2, ba = PB.mergeAll(B, A).aatPrep_v2;
  eq(ab.learn.lessons['L-1'].best, ba.learn.lessons['L-1'].best, 'lesson best is the same in either direction');
  eq(ab.learn.xp, ba.learn.xp, 'XP is the same in either direction');
  eq(ab.stats.streak.best, ba.stats.streak.best, 'best streak is the same in either direction');
  eq(Object.keys(ab.stats.questions).sort(), Object.keys(ba.stats.questions).sort(), 'the question set is the same in either direction');
  eq(ab.stats.questions.q1.attempts, ba.stats.questions.q1.attempts, 'attempt counts do not depend on merge order');
}

/* ── Counters never inflate on re-import ────────────────────────────────── */
{
  let m = PB.mergeAll(A, A);
  eq(m.aatPrep_v2.stats.questions.q1.attempts, 5, 'importing a device\'s own backup does not double its attempts');
  eq(m.aatPrep_v2.learn.xp, 400, 'importing a device\'s own backup does not double its XP');
  for (let i = 0; i < 5; i++) m = PB.mergeAll(m, A);
  eq(m.aatPrep_v2.stats.questions.q1.attempts, 5, 'repeated re-imports still do not inflate attempts');
}

/* ── Device settings stay put ───────────────────────────────────────────── */
{
  const m = PB.mergeAll(A, B);
  eq(m.aatPrep_v2.settings.darkMode, true, 'dark mode is not overwritten by the imported file');
  eq(m.aatPrep_v2.planner.dailyGoalXp, 30, 'the daily goal is not overwritten by the imported file');
  eq(m.multisubject_active, 'aat3', 'the active subject stays as it was on this device');
  eq(m.prep_v2_settings, { seenSplash: true }, 'shell settings stay as they were on this device');

  /* The case above cannot tell "settings are pinned to this device" apart from
     "settings happened to merge to the same value", because true wins either
     way. This one can: a device with dark mode OFF importing a file with it ON
     must stay off. */
  const dark = PB.mergeSubject(
    { settings: { darkMode: false, refOpen: false }, planner: { examDate: null, dailyGoalXp: 20 } },
    { settings: { darkMode: true, refOpen: true }, planner: { examDate: '2026-12-01', dailyGoalXp: 90 } }
  );
  eq(dark.settings.darkMode, false, 'a device with dark mode off stays off after importing a file with it on');
  eq(dark.settings.refOpen, false, 'panel state is not carried in from the imported file');
  eq(dark.planner.dailyGoalXp, 20, 'the local daily goal survives a file carrying a different one');
  eq(dark.planner.examDate, null, 'the local exam date is not replaced by the imported one');
}

/* ── Spaced repetition takes the record graded last ─────────────────────── */
{
  const m = PB.mergeAll(A, B).aatPrep_v2;
  eq(m.sr.q1.reps, 1, 'the SR record graded most recently wins outright');
  eq(m.sr.q1.ease, 2.3, 'the winning SR record keeps its own ease rather than a blended one');
  const back = PB.mergeAll(B, A).aatPrep_v2;
  eq(back.sr.q1.reps, 1, 'the same SR record wins whichever direction the merge runs');
}

/* ── Flashcards take the further-advanced box ───────────────────────────── */
{
  const m = PB.mergeAll(A, B).aatPrep_v2;
  eq(m.flash.accrual.box, 4, 'the higher flashcard box wins');
  eq(m.flash.accrual.dueAt, T0 + 14 * DAY, 'the winning flashcard keeps its own due date');
  ok('prepayment' in m.flash, 'a flashcard only one device has is carried over');
}

/* ── Streak ─────────────────────────────────────────────────────────────── */
{
  const m = PB.mergeAll(A, B).aatPrep_v2;
  eq(m.stats.streak.best, 12, 'the better best streak survives');
  eq(m.stats.streak.current, 1, 'the current streak comes from the device that scored most recently');
  eq(m.stats.streak.lastCorrectAt, T0 + 5000, 'lastCorrectAt matches the streak it was taken from');
  /* In the fixture the more recent device also happens to hold the better
     best, so the two rules are indistinguishable. Here they conflict: the
     recent device has the WORSE best, and both rules must still hold. */
  const st = PB.mergeSubject(
    { stats: { streak: { current: 2, best: 30, lastCorrectAt: T0 } } },
    { stats: { streak: { current: 6, best: 4, lastCorrectAt: T0 + 1 } } }
  );
  eq(st.stats.streak.best, 30, 'a record best is kept even when the other device scored more recently');
  eq(st.stats.streak.current, 6, 'the running streak still comes from the more recent device');
}

/* ── History ────────────────────────────────────────────────────────────── */
{
  const m = PB.mergeAll(A, B).aatPrep_v2;
  eq(m.history.length, 2, 'history from both devices is combined');
  eq(m.history[0].timestamp, T0 + 5000, 'history is ordered newest first');
  const dup = PB.mergeHistory(phone.history, phone.history);
  eq(dup.length, 1, 'identical history rows are de-duplicated');
  const many = Array.from({ length: 50 }, (_, i) => ({ mode: 'practice', topic: 't', score: 1, total: 2, timestamp: T0 + i }));
  eq(PB.mergeHistory(many, []).length, 20, 'history is capped at the app\'s own limit');
}

/* ── Daily activity cap ─────────────────────────────────────────────────── */
{
  /* Distinct days, and enough of them on EACH side that the union comfortably
     exceeds the cap — otherwise the assertion passes whether the cap runs or
     not. Days 0–49 on one device, 40–89 on the other: 90 distinct days. */
  const mk = (from, to) => { const d = {}; for (let i = from; i < to; i++) d[new Date(Date.UTC(2026, 0, 1 + i)).toISOString().slice(0, 10)] = { xp: i, answered: i }; return d; };
  const m = PB.mergeSubject({ daily: mk(0, 50) }, { daily: mk(40, 90) });
  eq(Object.keys(m.daily).length, 60, 'merged daily activity is trimmed to the app\'s 60-day window');
  const kept = Object.keys(m.daily).sort();
  eq(kept[kept.length - 1], new Date(Date.UTC(2026, 0, 90)).toISOString().slice(0, 10), 'the most recent day is the one kept');
}

/* ── Story version guard ────────────────────────────────────────────────── */
{
  const m = PB.mergeSubject({ story: { v: 1, days: { d1: { best: 50 } } } }, { story: { v: 2, days: { d1: { best: 90 } } } });
  eq(m.story, { v: 1, days: { d1: { best: 50 } } }, 'story records are not blended across a version change');
}

/* ── Replace mode ───────────────────────────────────────────────────────── */
{
  const m = PB.replaceAll(A, B);
  eq(m.aatPrep_v2.learn.xp, 250, 'replace takes the imported value even when it is lower');
  eq(m.multisubject_active, 'aat3', 'replace still leaves device keys alone');
}

/* ── Parsing rejects what it should ─────────────────────────────────────── */
{
  const bad = [
    ['not json at all', 'plain text'],
    ['{"format":"something-else","version":1,"keys":{}}', 'a JSON file that is not one of ours'],
    ['{"format":"aat-study-progress","version":99,"keys":{}}', 'a backup from a newer app version'],
    ['{"format":"aat-study-progress","version":1}', 'a backup with no keys'],
  ];
  bad.forEach(([text, label]) => {
    let threw = false;
    try { PB.parse(text); } catch (e) { threw = true; }
    ok(threw, 'parse rejects ' + label);
  });
  const good = PB.parse(JSON.stringify(PB.buildExport({ store: fakeStore(), now: T0 })));
  ok(good.format === PB.FORMAT, 'parse accepts a file this app wrote');
}

/* ── A foreign key is never written ─────────────────────────────────────── */
{
  const store = fakeStore({ unrelated_app_data: 'keep me' });
  PB.writeAll({ unrelated_app_data: 'clobbered', aatPrep_v2: { xp: 1 } }, store);
  eq(store.getItem('unrelated_app_data'), 'keep me', 'a key outside this app is never overwritten');
}

/* ── Summary ────────────────────────────────────────────────────────────── */
{
  const s = PB.summarize({ keys: A });
  eq(s.map(r => r.key).sort(), ['aatPrep_v2', 'prep_v2_aat3'], 'the summary lists every subject holding progress');
  const l2 = s.find(r => r.key === 'aatPrep_v2');
  ok(/2 questions attempted/.test(l2.detail), 'the summary counts attempted questions');
  ok(/1 lesson\b/.test(l2.detail), 'the summary counts lessons and gets the plural right');
  ok(/400 XP/.test(l2.detail), 'the summary reports XP');
  ok(/120 XP/.test(s.find(r => r.key === 'prep_v2_aat3').detail), 'the summary reads Level 3\'s own blob shape');
  ok(s.every(r => !PB.isDeviceKey(r.key)), 'the summary does not list device-only keys');
}

console.log(failures
  ? `\n\x1b[31m\x1b[1m── ${failures} of ${checks} checks failed\x1b[0m\n`
  : `\n\x1b[32m\x1b[1m── Progress backup checks passed ✓\x1b[0m  \x1b[2m(${checks} assertions)\x1b[0m\n`);
process.exit(failures ? 1 : 0);
