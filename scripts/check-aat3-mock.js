#!/usr/bin/env node
/**
 * Does the timed mock behave like an exam rather than like practice?
 *
 * Practice tells you after every question how you did. That is right for
 * learning and useless for rehearsal — knowing where you stand is exactly what
 * the assessment withholds, and it is the part readers find hardest. So the
 * properties worth asserting are the ones that make a mock a mock:
 *
 *   nothing is revealed until the paper is over
 *   the paper is drawn to the assessment's own weighting
 *   the tasks — the shape the assessment is built from — actually appear
 *   an unanswered question marks as wrong
 *   the report says which outcome cost the marks, weighted
 *
 * Driven through the real player. Nothing here reads the allocator or the
 * grader directly: every assertion is about what a reader would see.
 *
 * Run: node scripts/check-aat3-mock.js   (exit 1 on any failure)
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

console.log(`${BOLD}AAT Level 3 timed mock${RESET}\n`);

const restore = D.seedRandom(20260828);

function openMock(unitKey) {
  const store = D.fakeStore();
  const M = D.loadUI(store);
  const el = D.fakeEl();
  M.AAT3_UI.reset('practice', unitKey);
  M.AAT3_UI.mount(el);
  D.click(el, 'startmock');
  return { store, M, el };
}

const BANK = (() => {
  const M = D.loadUI(D.fakeStore());
  return [].concat((M.AAT3_PRACTICE || {}).QUESTIONS || [], (M.AAT3_FAPS_PRACTICE || {}).QUESTIONS || []);
})();

function onScreen(el) {
  const stem = (el.innerHTML.match(/<h2 class="a3-q">([\s\S]*?)<\/h2>/) || [])[1];
  if (!stem) return null;
  const text = stem.replace(/<[^>]*>/g, '').trim();
  return BANK.find(q => String(q.q).replace(/\*\*/g, '').trim() === text) || null;
}

/* Answer the question on screen correctly, using its real key. */
function answerRight(el, q) {
  const t = q.type || 'mcq';
  const hit = (act, attrs) => {
    const n = D.nodes(el, act).find(x => Object.keys(attrs).every(k => x.getAttribute(k) === String(attrs[k])));
    if (n) n.fire('click');
  };
  if (t === 'mcq') hit('ans', { 'data-i': q.ans });
  else if (t === 'truefalse') q.statements.forEach((st, i) => hit('tf', { 'data-s': i, 'data-v': String(st.answer) }));
  else if (t === 'gapfill') q.gaps.forEach((g, i) => hit('gap', { 'data-g': i, 'data-o': g.answer }));
  else if (t === 'numeric') {
    const box = D.nodes(el, 'numinput')[0];
    box.value = String(q.answer); box.fire('input');
  } else if (t === 'task') {
    q.parts.forEach((p, pi) => {
      if (p.type === 'choice') hit('taskpick', { 'data-p': pi, 'data-o': p.answer });
      else {
        const box = D.nodes(el, 'taskinput').find(n => n.getAttribute('data-p') === String(pi));
        box.value = String(p.answer); box.fire('input');
      }
    });
  }
}

/* Sit a whole paper. `how` decides each question: 'right', 'wrong', or 'blank'. */
function sit(unitKey, how) {
  const ctx = openMock(unitKey);
  const seen = [];
  for (let i = 0; i < 60; i++) {
    const q = onScreen(ctx.el);
    if (!q) break;
    const before = ctx.el.innerHTML;
    if (how === 'right') answerRight(ctx.el, q);
    else if (how === 'wrong') D.answerCurrent(ctx.el, 0) /* generic: not the key for typed answers */;
    /* BOTH SNAPSHOTS, and the one AFTER answering is the one that matters.
       A first version captured only the screen as it arrived — which is
       pristine by construction — so the leak assertions in section 2 were
       reading a state no answer had touched and passed against a player that
       revealed the verdict the moment an option was clicked. */
    seen.push({ q, html: before, answered: ctx.el.innerHTML });
    if (!D.nodes(ctx.el, 'mocknext').length) break;
    D.click(ctx.el, 'mocknext');
  }
  return Object.assign(ctx, { seen });
}

/* ── 1. The paper is the right length, and every question is a real one ──── */
{
  const r = sit('tpfb', 'blank');
  ok(r.seen.length === 24, `a mock is 24 questions long (got ${r.seen.length})`);
  ok(r.seen.every(s => s.q), 'every question on the paper is one from the bank');
  const ids = r.seen.map(s => s.q.id);
  ok(new Set(ids).size === ids.length, 'no question appears twice on one paper');
}

/* ── 2. Nothing is revealed while the paper is being sat ─────────────────── */
/* The property that separates a mock from practice, asserted on every screen of
   a paper answered CORRECTLY — a wrong-answer run could pass this by accident
   if the player only revealed on a right answer. */
{
  const r = sit('tpfb', 'right');
  const TELL = /a3-exp-box|a3-try-verdict|class="a3-opt is-right"|class="a3-opt is-wrong"|a3-part is-right|a3-part is-wrong|a3-part-v|a3-tf-row is-right|a3-tf-row is-wrong|a3-pill is-right|a3-pill is-wrong/;
  const leaks = r.seen.filter(s => TELL.test(s.answered));
  ok(leaks.length === 0,
    `no screen of a mock reveals a verdict once the question is answered (${leaks.length} of ${r.seen.length} did)`);
  ok(r.seen.every(s => !TELL.test(s.html)), 'and none reveals one before it is answered either');
  ok(r.seen.every(s => !/data-a3="nextq"/.test(s.answered)),
    'the practice "next question" button, which only appears once a question is graded, never appears');
  ok(r.seen.every(s => /data-a3="mocknext"/.test(s.html)),
    'every question offers a way forward without answering it');
  ok(r.seen.every(s => /a3-mockclock/.test(s.html)), 'the clock is on screen throughout');

  /* AND NO WAY TO REVEAL ONE ON PURPOSE. Suppressing the verdict is not enough
     if the button that produces it is still on the screen: a task left its
     "Submit all 6" in place, and pressing it graded the task and marked every
     part green or red mid-paper. Nothing in a run that never presses it would
     notice, so the buttons themselves are what is asserted. */
  const REVEALERS = ['tfsubmit', 'gapsubmit', 'numsubmit', 'tasksubmit'];
  const offered = REVEALERS.filter(a =>
    r.seen.some(s => new RegExp(`data-a3="${a}"`).test(s.html) || new RegExp(`data-a3="${a}"`).test(s.answered)));
  ok(offered.length === 0,
    `no mock screen offers a button that grades on the spot (found ${offered.join(', ') || 'none'})`);
}

/* ── 3. A paper answered correctly scores 100, and one left blank scores 0 ── */
{
  const right = sit('tpfb', 'right');
  ok(/100%/.test(right.el.innerHTML), 'a paper answered correctly scores 100%');
  ok(/A pass, on this paper/.test(right.el.innerHTML), 'and reads as a pass');

  const blank = sit('tpfb', 'blank');
  ok(/>0%<|0 of 24 correct/.test(blank.el.innerHTML),
    'a paper left entirely blank scores nothing — an unanswered question marks as wrong');
  ok(/Below the pass mark/.test(blank.el.innerHTML), 'and reads as below the pass mark');
}

/* ── 4. The report names the outcomes, weighted ──────────────────────────── */
{
  const r = sit('tpfb', 'blank');
  const html = r.el.innerHTML;
  ok(/a3-mockreport/.test(html), 'the paper ends with a report');
  ok(/How the paper went, outcome by outcome/.test(html), 'and the report is broken down by outcome');
  ok(/>Weight</.test(html), 'each outcome is shown against its share of the assessment');
  ok(/Most marks at stake/.test(html), 'and the outcome with most marks at stake is named');

  const os = SYL.units.tpfb.outcomes;
  const named = os.filter(o => html.indexOf(String(o.n) + ' · ' + o.title) !== -1).length;
  ok(named === os.length, `all ${os.length} outcomes appear in the report of a full paper (found ${named})`);
}

/* ── 5. The paper is drawn to the exam weighting, and leads with the tasks ── */
{
  const RUNS = 60;
  const seen = {};
  let total = 0, tasks = 0, papers = 0;
  for (let i = 0; i < RUNS; i++) {
    const r = sit('tpfb', 'blank');
    papers++;
    r.seen.forEach(s => {
      seen[s.q.lo] = (seen[s.q.lo] || 0) + 1;
      total++;
      if (s.q.type === 'task') tasks++;
    });
  }
  const os = SYL.units.tpfb.outcomes;
  os.forEach(o => {
    const target = o.weighting;
    const got = ((seen[o.n] || 0) / total) * 100;
    console.log(`  ${DIM}Outcome ${o.n}: ${got.toFixed(1)}% of the paper  ·  exam ${target}%${RESET}`);
    ok(Math.abs(got - target) <= 2.5,
      `Outcome ${o.n} is ${got.toFixed(1)}% of a mock against an exam weighting of ${target}%`);
  });

  /* Tasks drawn at random would be about a twentieth of a paper. Taking them
     first inside each outcome's allocation should put every one of them on
     every paper — which is the point of drawing that way, and is worth
     asserting rather than assuming. */
  const bankTasks = BANK.filter(q => q.unitKey === 'tpfb' && q.type === 'task').length;
  const perPaper = tasks / papers;
  console.log(`  ${DIM}Tasks per paper: ${perPaper.toFixed(2)} of ${bankTasks} in the bank${RESET}`);
  ok(perPaper === bankTasks,
    `every one of the ${bankTasks} tasks appears on every paper (averaged ${perPaper.toFixed(2)})`);
}

/* ── 6. Sitting a mock records it, and its best score ────────────────────── */
{
  const r = sit('tpfb', 'right');
  const rec = JSON.parse(r.store.getItem(D.STORE_KEY)).practice.units.tpfb;
  ok(rec.mocks === 1, `sitting a paper counts it (got ${rec.mocks})`);
  ok(rec.mockBest === 100, `and records the score (got ${rec.mockBest})`);
  ok(!rec.runs, 'a mock is not counted as a practice run');

  /* Every answer still reaches the per-outcome counters and the per-question
     memory, so a mock feeds the mistakes list like anything else. */
  const attempted = Object.keys(rec.los).reduce((a, k) => a + rec.los[k].attempted, 0);
  ok(attempted === 24, `all 24 answers reach the outcome counters (got ${attempted})`);
  ok(Object.keys(rec.qs || {}).length === 24, 'and all 24 reach the per-question record');
}

/* ── 7. A mock leaves no state behind ────────────────────────────────────── */
/* Walking out of a paper mid-way must put the reader back in practice with no
   clock running and no mock answers counted towards the next thing they do. */
{
  const ctx = openMock('tpfb');
  D.click(ctx.el, 'mocknext');
  D.click(ctx.el, 'exit');
  ok(/data-a3="startmock"/.test(ctx.el.innerHTML), 'exiting a mock lands back on the practice picker');
  D.click(ctx.el, 'startpractice', n => n.getAttribute('data-lo') === 'mix');
  ok(!/a3-mockclock/.test(ctx.el.innerHTML), 'a practice run started afterwards carries no clock');
  ok(!/data-a3="mocknext"/.test(ctx.el.innerHTML), 'and grades on the spot, as practice does');
}

/* ── 8. The mock card reports the best score once one has been sat ───────── */
{
  const r = sit('tpfb', 'right');
  D.click(r.el, 'exit');
  ok(/best so far 100%/.test(r.el.innerHTML), 'the picker shows the best mock score once there is one');

  const fresh = D.loadUI(D.fakeStore());
  const el = D.fakeEl();
  fresh.AAT3_UI.reset('practice', 'tpfb');
  fresh.AAT3_UI.mount(el);
  ok(!/best so far/.test(el.innerHTML), 'and says nothing about a best score before any paper is sat');
}

restore();

console.log(failures
  ? `\n${RED}${BOLD}── ${failures} of ${checks} checks failed${RESET}\n`
  : `\n${GREEN}${BOLD}── The mock behaves like an exam ✓${RESET}  ${DIM}(${checks} assertions)${RESET}\n`);
process.exit(failures ? 1 : 0);
