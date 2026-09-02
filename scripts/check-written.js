#!/usr/bin/env node
/**
 * Does the written task actually work when a reader touches it?
 *
 * WHY THIS TYPE NEEDED ITS OWN CHECK. Every other question in this module is
 * graded by comparing what the reader did with a key, so a checker can assert
 * "the right answer marks right" and be finished. A written task has no key.
 * It has a sequence — write, reveal, self-mark, record — and the sequence IS
 * the pedagogy: reveal before writing and the task becomes a reading exercise,
 * which is exactly the failure that leaves the data valid and the exercise
 * worthless. Nothing about the question would look wrong.
 *
 * So the properties asserted here are about ORDER and about HONESTY:
 *
 *   §1  the scenario, the requirement and a box to write in all reach the page
 *   §2  the model answer is not on the page before it is revealed — the one
 *       failure that would quietly destroy the whole exercise
 *   §3  the reveal is gated on having written something, in the handler and not
 *       only on a disabled button
 *   §4  once revealed, every rubric point is on the page and tickable
 *   §5  70% of the marks passes and 69% does not, matching the assessment
 *   §6  the mark reached the progress record, and reads as attempted
 *   §7  a timed mock serves no written task, because a mock reveals nothing and
 *       an unmarkable task would bank a guaranteed zero
 *   §8  every shipped written task has the parts it needs, and its rubric adds
 *       up to the marks it claims
 *
 * Driven through the real player, so what is asserted is what a reader gets.
 *
 * Run: node scripts/check-written.js   (exit 1 on any failure)
 */

'use strict';

const D = require('./lib/aat3-driver.js');
const CONTENT = require('./lib/aat3-content.js');
const { groups, questions } = CONTENT.load();

const RED = '\x1b[31m', GREEN = '\x1b[32m';
const BOLD = '\x1b[1m', DIM = '\x1b[2m', RESET = '\x1b[0m';

let failures = 0, checks = 0;
function ok(cond, label) {
  checks++;
  if (!cond) { failures++; console.log(`  ${RED}✗${RESET} ${label}`); }
}
function section(t) { console.log(`${DIM}${t}${RESET}`); }

console.log(`${BOLD}AAT Level 3 written tasks${RESET}\n`);

/* Every written task in the module, from the practice banks and the lesson
   checks alike — a type that works in one place and not the other is broken. */
const written = [];
questions.forEach(q => { if (q.type === 'written') written.push({ where: `practice ${q.id}`, q }); });
groups.forEach(g => (g.lessons || []).forEach(l => (l.check || []).forEach((q, i) => {
  if (q.type === 'written') written.push({ where: `${l.id} Q${i + 1}`, q });
})));

ok(written.length > 0, 'the module contains at least one written task');

/* EVERY UNIT WHOSE ASSESSMENT IS PARTLY HUMAN MARKED. The whole reason this
   type exists is that FAPS and MATS are marked "partially computer/partially
   human", and the human-marked half is the half a candidate writes. A unit that
   is human-marked in part and has no written practice at all is the gap this
   file was written to close, so it is a floor on the content and not only on
   the code. */
{
  const SYL = require('../aat3-syllabus.js').SYLLABUS;
  Object.keys(SYL.units).forEach(unitKey => {
    const u = SYL.units[unitKey];
    const bank = questions.filter(q => q.unitKey === unitKey);
    if (!bank.length) return;
    const human = /human/i.test((u.assessment && u.assessment.marking) || '');
    if (!human) return;
    const mine = bank.filter(q => q.type === 'written');
    ok(mine.length > 0,
      `${unitKey} is partly human marked and has written practice (${mine.length} of ${bank.length})`);
  });
}

function marksOf(q) {
  const t = (q.rubric || []).reduce((s, r) => s + (Number(r.marks) || 0), 0);
  return t > 0 ? t : (q.marks || 1);
}

/* A one-question practice run carrying exactly this task. */
function open(entry, store) {
  const M = D.loadUI(store || D.fakeStore());
  M.AAT3_PRACTICE = { QUESTIONS: [Object.assign({}, entry.q, { unitKey: 'tpfb', lo: entry.q.lo || 1 })] };
  const el = D.fakeEl();
  M.AAT3_UI.reset('practice', 'tpfb');
  M.AAT3_UI.mount(el);
  D.click(el, 'startpractice', n => n.getAttribute('data-lo') === 'mix');
  return el;
}

function typeAnswer(el, words) {
  const box = D.nodes(el, 'wrinput')[0];
  if (!box) return null;
  box.value = new Array(words).fill('word').join(' ');
  box.fire('input');
  return box;
}

const restore = D.seedRandom(20260902);

/* ── 1. It paints ───────────────────────────────────────────────────────── */
section('the task on screen');
written.forEach(entry => {
  const el = open(entry);
  const html = el.innerHTML;
  ok(/class="a3-wr"/.test(html), `${entry.where}: the written block renders`);
  ok(D.nodes(el, 'wrinput').length === 1, `${entry.where}: exactly one box to write in`);
  if (entry.q.setup) {
    ok(/class="a3-wr-setup"/.test(html), `${entry.where}: the scenario renders`);
  }
  /* The requirement is the question's stem, in the same heading every other
     type uses — which is also what four other harnesses read to work out which
     question they are looking at. */
  const stem = (html.match(/<h2 class="a3-q">([\s\S]*?)<\/h2>/) || [])[1] || '';
  ok(stem.length > 15, `${entry.where}: the requirement renders as the question's stem`);
  ok(!/undefined|\[object Object\]|NaN/.test(html),
    `${entry.where}: nothing renders as undefined, NaN or [object Object]`);
});

/* ── 2. The model answer is NOT on the page before it is revealed ────────── */
/* The single most important assertion in this file. A written task whose model
   answer is visible from the start is not a written task — it is a passage of
   text with a box under it, and every downstream check would still pass. */
section('the model stays hidden until it is earned');
written.forEach(entry => {
  const el = open(entry);
  const html = el.innerHTML;
  const model = String(entry.q.modelAnswer || '');
  /* Compared on a distinctive slice rather than the whole string, so that
     escaping or wrapping cannot make a leak look like an absence. */
  const probe = model.replace(/\s+/g, ' ').trim().slice(40, 90);
  ok(probe.length > 10, `${entry.where}: has a model answer long enough to hide`);
  ok(html.replace(/\s+/g, ' ').indexOf(probe) === -1,
    `${entry.where}: the model answer is not on the page before it is revealed`);
  ok(D.nodes(el, 'wrtick').length === 0,
    `${entry.where}: the rubric is not tickable before the model is revealed`);
});

/* ── 3. The reveal is gated on having written something ──────────────────── */
section('write first, then read');
written.forEach(entry => {
  const el = open(entry);
  /* Nothing typed: the handler must refuse, not merely the button. */
  D.click(el, 'wrshow');
  ok(D.nodes(el, 'wrtick').length === 0,
    `${entry.where}: clicking reveal with nothing written does not reveal`);

  typeAnswer(el, 3);
  D.click(el, 'wrshow');
  ok(D.nodes(el, 'wrtick').length === 0,
    `${entry.where}: three words is not an answer, and does not unlock the model`);

  typeAnswer(el, 25);
  D.click(el, 'wrshow');
  ok(D.nodes(el, 'wrtick').length > 0,
    `${entry.where}: a real attempt unlocks the model and the rubric`);
});

/* ── 4. Every rubric point reaches the page ──────────────────────────────── */
section('the rubric');
written.forEach(entry => {
  const el = open(entry);
  typeAnswer(el, 25);
  D.click(el, 'wrshow');
  const ticks = D.nodes(el, 'wrtick');
  ok(ticks.length === (entry.q.rubric || []).length,
    `${entry.where}: all ${(entry.q.rubric || []).length} rubric points are tickable (found ${ticks.length})`);
  const html = el.innerHTML.replace(/\s+/g, ' ');
  const probe = String(entry.q.modelAnswer || '').replace(/\s+/g, ' ').trim().slice(40, 90);
  ok(html.indexOf(probe) !== -1, `${entry.where}: the model answer is on the page once revealed`);
  /* The reader's own words are shown beside it. Marking your answer against a
     model you can no longer see is the version of this exercise that does not
     work. */
  ok(/class="a3-wr-side"/.test(el.innerHTML), `${entry.where}: your own answer is shown beside the model`);
});

/* ── 5. The total on screen is the module's, and it responds to the ticks ── */
/* The first version of this section computed the awarded total ITSELF and then
   asserted its own arithmetic, which is a check that passes whatever the module
   does. Mutation testing found it: blanking the rubric so every task scored nil
   left this section green. What has to be read is the figure the module put on
   the page. */
section('the total is the module\'s own');
written.forEach(entry => {
  const q = entry.q;
  const total = marksOf(q);

  const el = open(entry);
  typeAnswer(el, 25);
  D.click(el, 'wrshow');

  const shown = () => {
    const m = el.innerHTML.match(/Self-assessed <strong>\s*(\d+)\s*\/\s*(\d+)\s*<\/strong>/);
    return m ? { got: Number(m[1]), max: Number(m[2]) } : null;
  };

  const none = shown();
  ok(none !== null, `${entry.where}: the running total is on the page`);
  ok(none && none.max === total, `${entry.where}: it is out of ${total} (shows ${none && none.max})`);
  ok(none && none.got === 0, `${entry.where}: nothing claimed reads as 0 (shows ${none && none.got})`);

  /* One point, then all of them. A total that does not move when a box is
     ticked is the failure the reader cannot see, because the tick itself
     looks like it worked. */
  D.nodes(el, 'wrtick')[0].fire('click');
  const one = shown();
  ok(one && one.got === (Number(q.rubric[0].marks) || 0),
    `${entry.where}: claiming the first point shows ${q.rubric[0].marks} (shows ${one && one.got})`);

  D.nodes(el, 'wrtick').slice(1).forEach(t => t.fire('click'));
  const all = shown();
  ok(all && all.got === total, `${entry.where}: claiming every point shows ${total} (shows ${all && all.got})`);

  /* And the marks printed beside the points add up to it. The total and the
     per-point figures are rendered from the same data by two different
     expressions, so they can disagree — and a rubric whose points say 1, 1, 1
     beside a total out of 8 is a screen the reader cannot reconcile. Mutation
     testing found this one: breaking the per-point figure left every other
     assertion in this file green. */
  /* The capture group, not the whole match with its non-digits stripped: the
     class name contains a "3", so stripping turned a 2-mark point into 32. */
  const perPoint = [];
  {
    const re = /<span class="a3-wr-mk">(\d+)<\/span>/g;
    let m2;
    while ((m2 = re.exec(el.innerHTML))) perPoint.push(Number(m2[1]));
  }
  ok(perPoint.length === (q.rubric || []).length,
    `${entry.where}: every rubric point prints what it is worth`);
  ok(perPoint.reduce((a, b) => a + b, 0) === total,
    `${entry.where}: the marks printed beside the points add to ${total} (they add to ${perPoint.reduce((a, b) => a + b, 0)})`);

  /* And it comes back down. A total that only ever rises would let a reader
     over-claim and never correct it. */
  D.nodes(el, 'wrtick')[0].fire('click');
  const off = shown();
  ok(off && off.got === total - (Number(q.rubric[0].marks) || 0),
    `${entry.where}: unticking a point takes its marks back off`);
});

/* ── 6. The verdict is the assessment's pass mark, and it is recorded ────── */
/* Two mutations survived the first version of this file and both landed here:
   the pass threshold moved from 70% to 10%, and the rubric stopped counting at
   all. Neither was visible, because nothing read back what the module CONCLUDED
   from the marks — only what the test itself had counted. So the verdict is read out
   of the progress record, which is also the thing that has to be right for the
   spaced-repetition scheduler to ever show the task again. */
section('what gets remembered, and what it says');
written.forEach(entry => {
  const q = entry.q;
  const total = marksOf(q);
  const need = total * 0.7;

  /* Claim marks greedily up to `want`, then record. */
  function run(want) {
    const store = D.fakeStore();
    const el = open(entry, store);
    typeAnswer(el, 25);
    D.click(el, 'wrshow');
    let got = 0;
    D.nodes(el, 'wrtick').forEach((t, i) => {
      const m = Number((q.rubric[i] || {}).marks) || 0;
      if (got + m <= want) { t.fire('click'); got += m; }
    });
    D.click(el, 'wrmark');
    const graded = /class="a3-exp-box"/.test(el.innerHTML);
    D.click(el, 'nextq');
    /* The module's own key, taken from the driver rather than guessed at — a
       wrong key here reads as an empty store, and "nothing was recorded" is
       exactly what this section is trying to detect. */
    const data = JSON.parse(store.getItem(D.STORE_KEY) || '{}');
    const unit = ((data.practice || {}).units || {}).tpfb || {};
    const rec = (unit.qs || {})[q.id] || null;
    /* Keyed by the question's own outcome, because `open` pins it there — an
       earlier version looked under '1' and reported five of seven tasks as
       recording nothing, which is a bug in the check and not in the module. */
    const lo = (unit.los || {})[String(q.lo || 1)] || {};
    return { got, graded, rec, lo };
  }

  const pass = run(total);
  ok(pass.got === total, `${entry.where}: every point can be claimed (${pass.got}/${total})`);
  ok(pass.graded, `${entry.where}: recording the mark grades the question and shows the explanation`);
  ok(pass.rec !== null, `${entry.where}: a marked answer is written to the progress record`);
  ok(pass.rec && pass.rec.sr, `${entry.where}: it carries a spaced-repetition schedule`);
  ok(pass.rec && pass.rec.sr && pass.rec.sr.lastResult === true,
    `${entry.where}: claiming ${total}/${total} is recorded as a pass`);
  ok(pass.lo.correct === 1 && pass.lo.attempted === 1,
    `${entry.where}: it counts as one attempt, answered correctly`);

  /* Nothing claimed. Zero is under 70% of any positive total, so this is the
     one sub-pass claim every rubric can express whatever its point values. */
  const nil = run(0);
  ok(nil.got === 0, `${entry.where}: nothing need be claimed`);
  ok(nil.rec !== null, `${entry.where}: claiming nothing is still recorded, as an attempt`);
  ok(nil.rec && nil.rec.sr && nil.rec.sr.lastResult === false,
    `${entry.where}: claiming 0/${total} is recorded as a miss`);
  ok(nil.lo.correct === 0 && nil.lo.attempted === 1,
    `${entry.where}: it counts as one attempt, answered wrongly`);

  /* And the line itself. The largest claim that is still short of 70% must
     read as a miss — this is what pins the threshold to the assessment's own
     rather than to whatever number happens to be in the source. */
  let below = 0;
  (q.rubric || []).forEach(r => { const m = Number(r.marks) || 0; if (below + m < need) below += m; });
  if (below > 0) {
    const near = run(below);
    ok(near.rec && near.rec.sr && near.rec.sr.lastResult === false,
      `${entry.where}: ${near.got}/${total} is short of the 70% pass mark and reads as a miss`);
  }
  /* And the smallest claim that reaches it must read as a pass. */
  let atLeast = 0;
  (q.rubric || []).some(r => { atLeast += Number(r.marks) || 0; return atLeast >= need; });
  if (atLeast <= total) {
    const just = run(atLeast);
    ok(just.rec && just.rec.sr && just.rec.sr.lastResult === true,
      `${entry.where}: ${just.got}/${total} reaches the 70% pass mark and reads as a pass`);
  }
});

/* ── 7. A timed mock serves no written task ──────────────────────────────── */
section('and never under exam conditions');
{
  const M = D.loadUI(D.fakeStore());
  const el = D.fakeEl();
  M.AAT3_UI.reset('units');
  M.AAT3_UI.mount(el);
  const bank = M.AAT3_UI._test ? null : null;
  /* Sat repeatedly, because the draw is random and one clean paper proves
     nothing about the next. */
  let served = 0, papers = 0;
  ['tpfb', 'faps', 'mats'].forEach(unit => {
    for (let i = 0; i < 40; i++) {
      const M2 = D.loadUI(D.fakeStore());
      const el2 = D.fakeEl();
      M2.AAT3_UI.reset('practice', unit);
      M2.AAT3_UI.mount(el2);
      D.click(el2, 'startmock');
      papers++;
      if (D.nodes(el2, 'wrinput').length) served++;
      /* The whole paper, not only its first question. */
      for (let k = 0; k < 30; k++) {
        if (!D.nodes(el2, 'mocknext').length) break;
        if (D.nodes(el2, 'wrinput').length) served++;
        D.click(el2, 'mocknext');
      }
    }
  });
  ok(papers > 0, `mocks were actually sat (${papers})`);
  ok(served === 0, `no written task appeared in ${papers} timed papers (found ${served})`);
}

/* ── 8. The shape of every shipped task ──────────────────────────────────── */
section('the data behind them');
written.forEach(entry => {
  const q = entry.q;
  /* `q` carries the requirement, the way it carries the question on every
     other type in this bank; `setup` carries the scenario it belongs to. */
  const req = q.task || q.q;
  ok(typeof req === 'string' && req.length > 15, `${entry.where}: has a requirement to answer`);
  ok(typeof q.modelAnswer === 'string' && q.modelAnswer.length > 120,
    `${entry.where}: has a model answer worth reading`);
  ok(Array.isArray(q.rubric) && q.rubric.length >= 3,
    `${entry.where}: has at least three rubric points`);
  (q.rubric || []).forEach((r, i) => {
    ok(typeof r.point === 'string' && r.point.length > 10, `${entry.where} rubric ${i + 1}: has a point`);
    ok(Number.isFinite(r.marks) && r.marks > 0, `${entry.where} rubric ${i + 1}: is worth marks`);
  });
  /* An authored `marks` that disagrees with the rubric is a task that reports
     one total on screen and marks against another. */
  if (Number.isFinite(q.marks)) {
    const sum = (q.rubric || []).reduce((s, r) => s + (Number(r.marks) || 0), 0);
    ok(q.marks === sum, `${entry.where}: authored marks (${q.marks}) equal the rubric total (${sum})`);
  }
  ok(Number.isFinite(q.minWords) && q.minWords >= 30,
    `${entry.where}: asks for a minimum length worth writing`);
  /* Every rubric point should be findable in the model answer, or the model is
     not a model of the answer being marked. Matched on the point's longest
     word, which is a weak test that still catches a rubric written for a
     different task. */
  (q.rubric || []).forEach((r, i) => {
    const words = String(r.point).toLowerCase().match(/[a-z]{6,}/g) || [];
    if (!words.length) return;
    const model = String(q.modelAnswer || '').toLowerCase();
    ok(words.some(w => model.indexOf(w.slice(0, 6)) !== -1),
      `${entry.where} rubric ${i + 1}: its subject appears in the model answer`);
  });
});

restore();

console.log('');
if (failures) {
  console.log(`${RED}${BOLD}── ${failures} of ${checks} checks failed${RESET}\n`);
  process.exit(1);
}
console.log(`${GREEN}${BOLD}✓ ${checks} checks passed${RESET}\n`);
