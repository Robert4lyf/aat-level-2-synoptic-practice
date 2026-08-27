#!/usr/bin/env node
/**
 * Does the app remember which questions were answered wrongly, and can it
 * serve them back?
 *
 * Before this record existed, progress was a pair of counters per outcome:
 * attempted and correct. That can say WHICH OUTCOME went badly and nothing
 * more, so a reader who missed four specific questions could be told only to
 * "practise Outcome 2" and be handed ten more at random. Nothing knew what they
 * had got wrong.
 *
 * The record is two timestamps per question — last wrong, last right — and a
 * question is outstanding while the wrong one is the more recent.
 *
 * THE MERGE IS WHY IT IS SHAPED THAT WAY, and section 4 is the reason this file
 * exists. progress-backup.js merges two devices field by field, numbers by MAX
 * and booleans by OR. An "outstanding" flag would be sticky: fix a question on
 * the phone, and the laptop's stale `true` resurrects it at every merge for
 * ever. Two timestamps under MAX give the opposite and correct behaviour — the
 * device that answered most recently is the one believed — and they do it
 * whichever way round the merge runs.
 *
 * Run: node scripts/check-aat3-mistakes.js   (exit 1 on any failure)
 */

'use strict';

const D = require('./lib/aat3-driver.js');
const BACKUP = require('../progress-backup.js');

const RED = '\x1b[31m', GREEN = '\x1b[32m';
const BOLD = '\x1b[1m', DIM = '\x1b[2m', RESET = '\x1b[0m';

let failures = 0, checks = 0;
function ok(cond, label) {
  checks++;
  if (!cond) { failures++; console.log(`  ${RED}✗${RESET} ${label}`); }
}

console.log(`${BOLD}AAT Level 3 mistake memory${RESET}\n`);

const restore = D.seedRandom(20260828);

/* A run of `n` questions, answering each one right or wrong as `verdict` says.
   Answers are given by reading the key off the question, so "wrong" means a
   real wrong answer through the real grading and not a flag set by hand. */
function runPractice(store, lo, verdict) {
  const M = D.loadUI(store);
  const el = D.fakeEl();
  M.AAT3_UI.reset('practice', 'tpfb');
  M.AAT3_UI.mount(el);
  D.click(el, 'startpractice', n => n.getAttribute('data-lo') === String(lo));
  const asked = [];
  for (let i = 0; i < 40; i++) {
    if (!D.nodes(el, 'exit').length) break;
    const stem = (el.innerHTML.match(/<h2 class="a3-q">([\s\S]*?)<\/h2>/) || [])[1] || '';
    asked.push(stem.replace(/<[^>]*>/g, '').trim().slice(0, 60));
    answer(el, verdict(asked.length - 1));
    if (!D.nodes(el, 'nextq').length) break;
    D.click(el, 'nextq');
    if (/a3-done|data-a3="exit"/.test(el.innerHTML) && !D.nodes(el, 'nextq').length
        && !D.nodes(el, 'ans').length && !D.nodes(el, 'tf').length
        && !D.nodes(el, 'gap').length && !D.nodes(el, 'numinput').length
        && !D.nodes(el, 'tasksubmit').length) break;
  }
  return { M, el, asked };
}

/* Answer whatever is on screen correctly or incorrectly, ON PURPOSE.

   This has to read the real key off the real question, per type. A first
   version leaned on the driver's generic answerer with an option index, which
   answers a multiple choice deliberately but types "0" into every numeric box
   and picks the first pill of every shuffled gap — so "answer this run
   correctly" got roughly half of them right, and the section asserting that a
   correct answer clears a mistake failed against a player that was working. */
const BANK = (() => {
  const M = D.loadUI(D.fakeStore());
  return ((M.AAT3_PRACTICE || {}).QUESTIONS || []).filter(q => q.unitKey === 'tpfb');
})();

function onScreen(el) {
  const stem = (el.innerHTML.match(/<h2 class="a3-q">([\s\S]*?)<\/h2>/) || [])[1];
  if (!stem) return null;
  const text = stem.replace(/<[^>]*>/g, '').trim();
  return BANK.find(q => String(q.q).replace(/\*\*/g, '').trim() === text) || null;
}

function pick(el, act, attrs) {
  const n = D.nodes(el, act).find(x => Object.keys(attrs).every(k => x.getAttribute(k) === String(attrs[k])));
  if (n) n.fire('click');
  return !!n;
}

function answer(el, right) {
  const q = onScreen(el);
  if (!q) throw new Error('no recognisable question on screen');
  const t = q.type || 'mcq';

  if (t === 'mcq') {
    const want = right ? q.ans : (q.ans === 0 ? 1 : 0);
    pick(el, 'ans', { 'data-i': want });
  } else if (t === 'truefalse') {
    q.statements.forEach((st, si) => {
      const v = right ? st.answer : !st.answer;
      pick(el, 'tf', { 'data-s': si, 'data-v': String(v) });
    });
    D.click(el, 'tfsubmit');
  } else if (t === 'gapfill') {
    q.gaps.forEach((g, gi) => {
      const want = right ? g.answer : (g.answer === 0 ? 1 : 0);
      pick(el, 'gap', { 'data-g': gi, 'data-o': want });
    });
    D.click(el, 'gapsubmit');
  } else if (t === 'numeric') {
    const box = D.nodes(el, 'numinput')[0];
    box.value = String(right ? q.answer : q.answer + 1);
    box.fire('input');
    D.click(el, 'numsubmit');
  } else if (t === 'task') {
    q.parts.forEach((p, pi) => {
      if (p.type === 'choice') {
        const want = right ? p.answer : (p.answer === 0 ? 1 : 0);
        pick(el, 'taskpick', { 'data-p': pi, 'data-o': want });
      } else {
        const box = D.nodes(el, 'taskinput').find(n => n.getAttribute('data-p') === String(pi));
        box.value = String(right ? p.answer : p.answer + 1);
        box.fire('input');
      }
    });
    D.click(el, 'tasksubmit');
  } else {
    throw new Error('unhandled question type: ' + t);
  }

  /* The grade must actually have happened, or a section asserting what
     answering does would be asserting nothing. */
  if (!D.nodes(el, 'nextq').length) {
    throw new Error(`answering ${q.id} (${t}) did not grade it`);
  }
}

/* How many outstanding questions the practice screen is offering, read off the
   element that carries the number rather than off the sentence around it.
   These assertions matched the whole phrase — "4 questions waiting" — so a
   rewording of the offer failed three checks about mistake memory, which is not
   what any of them is for. The count is the claim; the copy is not. */
function offeredCount(html) {
  const m = /class="a3-alert-t">(\d+) question/.exec(html);
  return m ? Number(m[1]) : 0;
}

const KEY = D.STORE_KEY;
const readQs = (store) => {
  try { return (JSON.parse(store.getItem(KEY) || '{}').practice.units.tpfb || {}).qs || {}; }
  catch (e) { return {}; }
};

/* ── 1. A wrong answer is remembered against its question ────────────────── */
{
  const store = D.fakeStore();
  runPractice(store, 'mix', () => false);
  const qs = readQs(store);
  const ids = Object.keys(qs);
  ok(ids.length > 0, 'a practice run writes a per-question record');
  ok(ids.every(id => typeof qs[id].w === 'number'), 'every question answered wrongly carries a `w` timestamp');
  ok(ids.every(id => qs[id].r === undefined), 'none of them carries an `r` timestamp, because none was right');
}

/* ── 2. The mistakes card appears, counts, and serves those questions ────── */
{
  const store = D.fakeStore();
  runPractice(store, 'mix', () => false);
  const wrongIds = Object.keys(readQs(store));

  const M = D.loadUI(store);
  const el = D.fakeEl();
  M.AAT3_UI.reset('practice', 'tpfb');
  M.AAT3_UI.mount(el);
  const card = D.nodes(el, 'startpractice').find(n => n.getAttribute('data-lo') === 'missed');
  ok(!!card, 'the mistakes card is offered once there are mistakes');
  ok(offeredCount(el.innerHTML) === wrongIds.length,
    `the offer counts ${wrongIds.length} outstanding questions (found ${offeredCount(el.innerHTML)})`);

  D.click(el, 'startpractice', n => n.getAttribute('data-lo') === 'missed');
  const stems = [];
  for (let i = 0; i < 20 && D.nodes(el, 'exit').length; i++) {
    const s = (el.innerHTML.match(/<h2 class="a3-q">([\s\S]*?)<\/h2>/) || [])[1];
    if (!s) break;
    stems.push(s.replace(/<[^>]*>/g, '').trim());
    answer(el, true);
    if (!D.nodes(el, 'nextq').length) break;
    D.click(el, 'nextq');
  }
  ok(stems.length > 0, 'the mistakes run serves questions');
  /* Every question served must be one that was actually missed. */
  const M2 = D.loadUI(store);
  const bank = (M2.AAT3_PRACTICE.QUESTIONS || []).filter(q => q.unitKey === 'tpfb');
  const wrongStems = new Set(bank.filter(q => wrongIds.indexOf(q.id) !== -1)
    .map(q => String(q.q).replace(/\*\*/g, '')));
  ok(stems.every(s => wrongStems.has(s)),
    'every question in the mistakes run is one that was answered wrongly');
}

/* ── 3. Getting it right clears it ───────────────────────────────────────── */
{
  const store = D.fakeStore();
  runPractice(store, 'mix', () => false);
  const before = Object.keys(readQs(store)).length;
  ok(before > 0, 'there are outstanding questions to clear');

  /* Answer the mistakes run correctly, then look again. */
  const M = D.loadUI(store);
  const el = D.fakeEl();
  M.AAT3_UI.reset('practice', 'tpfb');
  M.AAT3_UI.mount(el);
  D.click(el, 'startpractice', n => n.getAttribute('data-lo') === 'missed');
  let cleared = 0;
  for (let i = 0; i < 20 && D.nodes(el, 'exit').length; i++) {
    if (!/<h2 class="a3-q">/.test(el.innerHTML)) break;
    answer(el, true);
    if (!D.nodes(el, 'nextq').length) break;
    D.click(el, 'nextq');
    cleared++;
  }
  const qs = readQs(store);
  const still = Object.keys(qs).filter(id => (qs[id].w || 0) > (qs[id].r || 0)).length;
  ok(cleared > 0, 'the mistakes run was worked through');
  ok(still === before - cleared,
    `answering ${cleared} correctly clears exactly those ${cleared} (${before} → ${still})`);
}

/* ── 4. The record merges correctly between two devices ──────────────────── */
/* The whole reason for two timestamps rather than a flag. Both directions are
   asserted, because a merge that is right one way round and wrong the other is
   a merge that depends on which device happens to sync first. */
{
  /* THE REAL STORAGE KEY, not a friendly name. mergeAll filters on
     isProgressKey(), so a document keyed "aat3" is skipped entirely and the
     merge silently returns the local side untouched — which a first version of
     this section read as a broken merge rather than a broken fixture. */
  const laptop = { [KEY]: { practice: { units: { tpfb: { qs: { 'P-1-01': { w: 1000 } } } } } } };
  const phone = { [KEY]: { practice: { units: { tpfb: { qs: { 'P-1-01': { w: 1000, r: 2000 } } } } } } };

  const forwards = BACKUP.mergeAll(laptop, phone)[KEY].practice.units.tpfb.qs['P-1-01'];
  const backwards = BACKUP.mergeAll(phone, laptop)[KEY].practice.units.tpfb.qs['P-1-01'];

  ok(forwards.r === 2000 && forwards.w === 1000,
    'a question fixed on the phone arrives on the laptop as fixed');
  ok(backwards.r === 2000 && backwards.w === 1000,
    'and the same merge run the other way round agrees');
  ok((forwards.w > (forwards.r || 0)) === false,
    'the merged record reads as no longer outstanding');

  /* And the reverse case: missed again later, on either device. */
  const missedAgain = { [KEY]: { practice: { units: { tpfb: { qs: { 'P-1-01': { w: 3000, r: 2000 } } } } } } };
  const after = BACKUP.mergeAll(phone, missedAgain)[KEY].practice.units.tpfb.qs['P-1-01'];
  ok(after.w === 3000 && after.r === 2000, 'a later miss survives the merge');
  ok(after.w > after.r, 'and the question reads as outstanding again');

  /* Idempotent: merging the same document twice must change nothing. */
  const once = BACKUP.mergeAll(laptop, phone);
  const twice = BACKUP.mergeAll(once, phone);
  ok(JSON.stringify(once) === JSON.stringify(twice), 'merging the same backup twice changes nothing');
}

/* ── 5. A question that has left the bank is not offered ─────────────────── */
/* Ids outlive the questions they name. A record for a question that has been
   rewritten or removed must not produce a run with a hole in it. */
{
  const store = D.fakeStore({
    [KEY]: JSON.stringify({
      practice: { units: { tpfb: { runs: 1, los: {}, qs: {
        'GONE-99': { w: 5000 },
        'P-1-01': { w: 5000 },
      } } } },
    }),
  });
  const M = D.loadUI(store);
  const el = D.fakeEl();
  M.AAT3_UI.reset('practice', 'tpfb');
  M.AAT3_UI.mount(el);
  ok(offeredCount(el.innerHTML) === 1,
    'a record naming a question no longer in the bank is not counted');
  D.click(el, 'startpractice', n => n.getAttribute('data-lo') === 'missed');
  ok(/<h2 class="a3-q">/.test(el.innerHTML), 'the run still has a real question in it');
}

/* ── 5a. The boundary: answered wrongly and rightly at the same instant ──── */
/* Two real attempts are always milliseconds apart, so this case never arises
   from a run and every assertion above passes whether the comparison is `>` or
   `>=`. It does arise from a merge — two devices whose clocks agree to the
   millisecond, or a record hand-edited by a restore — and the two operators
   disagree about it: one says fixed, the other says outstanding for ever. The
   choice is "fixed", because a question that can never be cleared is worse than
   one cleared a moment early. Pinned here so it is a decision and not an
   accident of which operator got typed. */
{
  const store = D.fakeStore({
    [KEY]: JSON.stringify({
      practice: { units: { tpfb: { runs: 1, los: {}, qs: {
        'P-1-01': { w: 5000, r: 5000 },   // same instant: counts as fixed
        'P-1-02': { w: 6000, r: 5000 },   // genuinely outstanding
      } } } },
    }),
  });
  const M = D.loadUI(store);
  const el = D.fakeEl();
  M.AAT3_UI.reset('practice', 'tpfb');
  M.AAT3_UI.mount(el);
  ok(offeredCount(el.innerHTML) === 1,
    'a question last answered wrongly and rightly at the same instant counts as fixed, not outstanding');
}

/* ── 6. No mistakes, no card ─────────────────────────────────────────────── */
{
  const store = D.fakeStore();
  const M = D.loadUI(store);
  const el = D.fakeEl();
  M.AAT3_UI.reset('practice', 'tpfb');
  M.AAT3_UI.mount(el);
  ok(!D.nodes(el, 'startpractice').some(n => n.getAttribute('data-lo') === 'missed'),
    'a reader with nothing outstanding is not offered an empty run');
}

restore();

console.log(failures
  ? `\n${RED}${BOLD}── ${failures} of ${checks} checks failed${RESET}\n`
  : `\n${GREEN}${BOLD}── Mistakes are remembered, served and cleared ✓${RESET}  ${DIM}(${checks} assertions)${RESET}\n`);
process.exit(failures ? 1 : 0);
