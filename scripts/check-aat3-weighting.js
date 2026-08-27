#!/usr/bin/env node
/**
 * Does a mixed practice run reflect the weighting of the real assessment?
 *
 * It used to be a uniform sample of the question bank, which made the bank's
 * composition the syllabus. The two were not the same shape: Outcome 5 is 10%
 * of the TPFB assessment and was 15% of the pool, Outcome 2 is 30% and was 26%.
 * A reader working through mixed runs was over-practising the smallest outcome
 * and under-practising the largest, and nothing inside a run could show that.
 *
 * MEASURED THROUGH THE REAL PLAYER, NOT BY CALLING THE ALLOCATOR. Every run
 * below is started, answered to the end, and counted from the per-outcome
 * totals the app itself wrote to storage. An allocator that returns a perfect
 * split and a startPractice() that ignores it would pass a unit test of the
 * arithmetic and fail a reader; this cannot tell the difference between the
 * app being right and the app being wrong, which is the point.
 *
 * WHY THE TOLERANCE IS WHAT IT IS. Ten questions cannot be split 25/30/20/15/10
 * exactly, so a single run is always slightly off and only the average is
 * meaningful. The allocator draws one uniform number and carries it across the
 * cumulative shares, which makes each outcome's expected seat count exactly its
 * share; over the sample size below the observed share should sit within a
 * couple of points of the target, and a systematic bias of five points — which
 * is what deterministic rounding produces — is far outside it.
 *
 * Run: node scripts/check-aat3-weighting.js   (exit 1 on any failure)
 */

'use strict';

const D = require('./lib/aat3-driver.js');
const SYL = require('../aat3-syllabus.js').SYLLABUS;

const RED = '\x1b[31m', GREEN = '\x1b[32m';
const BOLD = '\x1b[1m', DIM = '\x1b[2m', RESET = '\x1b[0m';

let failures = 0, checks = 0;
function ok(cond, label) {
  checks++;
  if (!cond) { failures++; console.log(`  ${RED}✗${RESET} ${label}`); }
}

console.log(`${BOLD}AAT Level 3 practice weighting${RESET}\n`);

const RUNS = 400;
const TOLERANCE = 2.5;   // percentage points, on the observed share of questions

const restore = D.seedRandom(20260828);

/* Answer every question of a mixed run, then read back what the app recorded.
   Answers are given by the driver's generic answerer: whether they are right is
   irrelevant here — `attempted` counts either way, and it is the outcome each
   question belonged to that is being measured. */
function runAndCount(unitKey) {
  const store = D.fakeStore();
  const M = D.loadUI(store);
  const el = D.fakeEl();
  M.AAT3_UI.reset('practice', unitKey);
  M.AAT3_UI.mount(el);
  D.click(el, 'startpractice', n => n.getAttribute('data-lo') === 'mix');
  for (let i = 0; i < 40; i++) {
    if (!/<h2 class="a3-q">/.test(el.innerHTML)) break;
    D.answerCurrent(el);
    if (!D.nodes(el, 'nextq').length) break;
    D.click(el, 'nextq');
  }
  try {
    return (JSON.parse(store.getItem(D.STORE_KEY)).practice.units[unitKey] || {}).los || {};
  } catch (e) { return {}; }
}

Object.keys(SYL.units).forEach(unitKey => {
  const unit = SYL.units[unitKey];
  const M = D.loadUI(D.fakeStore());
  const bank = [].concat((M.AAT3_PRACTICE || {}).QUESTIONS || [], (M.AAT3_FAPS_PRACTICE || {}).QUESTIONS || [])
    .filter(q => q.unitKey === unitKey);
  if (!bank.length) return;

  const present = unit.outcomes.filter(o => bank.some(q => q.lo === o.n));
  const totalWeight = present.reduce((a, o) => a + o.weighting, 0);

  const seen = {};
  let total = 0;
  for (let r = 0; r < RUNS; r++) {
    const los = runAndCount(unitKey);
    Object.keys(los).forEach(k => {
      const n = los[k].attempted || 0;
      seen[k] = (seen[k] || 0) + n;
      total += n;
    });
  }

  ok(total > 0, `${unitKey}: mixed runs draw questions at all`);
  console.log(`  ${DIM}${unitKey}: ${RUNS} runs, ${total} questions drawn${RESET}`);

  present.forEach(o => {
    const target = (o.weighting / totalWeight) * 100;
    const got = ((seen[o.n] || 0) / total) * 100;
    const off = Math.abs(got - target);
    const poolShare = (bank.filter(q => q.lo === o.n).length / bank.length) * 100;
    console.log(`  ${DIM}  Outcome ${o.n}: drawn ${got.toFixed(1)}%  ·  exam ${target.toFixed(1)}%  ·  pool ${poolShare.toFixed(1)}%${RESET}`);
    ok(off <= TOLERANCE,
      `${unitKey} Outcome ${o.n}: drawn ${got.toFixed(1)}% against an exam weighting of ${target.toFixed(1)}% (${off.toFixed(1)} points out, tolerance ${TOLERANCE})`);
  });

  /* And the run is still the length it claims. A weighted allocation that drops
     a seat gives nine questions out of a promised ten, and the score at the end
     is then out of the wrong number. */
  const perRun = total / RUNS;
  ok(Math.abs(perRun - 10) < 0.001,
    `${unitKey}: every run is exactly 10 questions long (averaged ${perRun.toFixed(3)})`);
});

/* ── An outcome too thin to fill its seats ───────────────────────────────── */
/* Every pool in the module is currently deeper than its share of a
   ten-question run, so the redistribution branch never runs against real data
   and would sit untested — until a unit is part-written, or an outcome is
   started, and a reader is handed a run of eight with a score out of ten.
   Forced here with a bank whose Outcome 2 holds a single question. It has to be
   Outcome 2: with these weightings Outcome 5 draws exactly one seat every time,
   so thinning IT to one question produces no shortfall at all and the branch
   stays unexercised — which is what a first version of this section did, and it
   passed just as happily with the redistribution deleted. Outcome 2 draws three
   seats every run, so one question leaves a guaranteed gap of two. */
{
  const store = D.fakeStore();
  const M = D.loadUI(store);
  const full = (M.AAT3_PRACTICE.QUESTIONS || []).filter(q => q.unitKey === 'tpfb');
  const thin = full.filter(q => q.lo !== 2).concat(full.filter(q => q.lo === 2).slice(0, 1));
  M.AAT3_PRACTICE = { QUESTIONS: thin };
  const el = D.fakeEl();
  M.AAT3_UI.reset('practice', 'tpfb');
  M.AAT3_UI.mount(el);
  D.click(el, 'startpractice', n => n.getAttribute('data-lo') === 'mix');
  let asked = 0;
  for (let i = 0; i < 40; i++) {
    if (!/<h2 class="a3-q">/.test(el.innerHTML)) break;
    D.answerCurrent(el);
    asked++;
    if (!D.nodes(el, 'nextq').length) break;
    D.click(el, 'nextq');
  }
  ok(asked === 10, `a run is still ten questions when an outcome cannot fill its share (got ${asked})`);
  const los = JSON.parse(store.getItem(D.STORE_KEY)).practice.units.tpfb.los;
  ok((los['2'] || { attempted: 0 }).attempted === 1,
    'and the thin outcome contributes its one question exactly once');
}

/* ── A single-outcome run is unaffected ──────────────────────────────────── */
/* The weighting applies to "all outcomes". Choosing one outcome must still give
   ten questions from that outcome and nothing else. */
{
  const store = D.fakeStore();
  const M = D.loadUI(store);
  const el = D.fakeEl();
  M.AAT3_UI.reset('practice', 'tpfb');
  M.AAT3_UI.mount(el);
  D.click(el, 'startpractice', n => n.getAttribute('data-lo') === '3');
  for (let i = 0; i < 40; i++) {
    if (!/<h2 class="a3-q">/.test(el.innerHTML)) break;
    D.answerCurrent(el);
    if (!D.nodes(el, 'nextq').length) break;
    D.click(el, 'nextq');
  }
  const los = JSON.parse(store.getItem(D.STORE_KEY)).practice.units.tpfb.los;
  ok(Object.keys(los).join() === '3', `choosing one outcome draws only that outcome (drew ${Object.keys(los).join(', ')})`);
  ok((los['3'] || {}).attempted === 10, 'and still draws ten questions');
}

restore();

console.log(failures
  ? `\n${RED}${BOLD}── ${failures} of ${checks} checks failed${RESET}\n`
  : `\n${GREEN}${BOLD}── Mixed practice matches the exam weighting ✓${RESET}  ${DIM}(${checks} assertions)${RESET}\n`);
process.exit(failures ? 1 : 0);
