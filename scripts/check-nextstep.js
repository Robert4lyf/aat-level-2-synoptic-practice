#!/usr/bin/env node
/**
 * "What should I do now?" — does the answer change with the evidence?
 *
 * WHY THIS NEEDED A CHECK OF ITS OWN. A recommendation is the one kind of
 * output that looks right whatever it says. Every other screen in these two
 * modules can be wrong visibly — a question marks the wrong answer, a total
 * does not add up, a button goes nowhere. A next-step panel that always says
 * "mixed practice" looks exactly like a next-step panel that is working, and
 * would keep looking like one for as long as nobody sat down with a store they
 * had built by hand and asked what it OUGHT to have said.
 *
 * So this builds those stores. Each section makes one piece of evidence true
 * and everything else false, and asserts the answer moves:
 *
 *   §1  a reader with no history is sent somewhere sensible, and to a unit
 *       that is fully written rather than the one worth the most marks
 *   §2  the order holds: a backlog outranks a review queue outranks a lesson
 *       outranks a weak outcome outranks a first mock outranks mixed practice
 *   §3  each threshold is a threshold — one below it, the answer does not fire
 *   §4  the unit named is the one the evidence is in, not the biggest or the
 *       first
 *   §5  finishing beats starting, and a fully written unit beats a part-written
 *       one for a reader who has not started either
 *   §6  a weak outcome is chosen by the marks at stake, not by accuracy alone
 *   §7  THE BUTTON GOES WHERE IT SAYS. A recommendation that lands somewhere
 *       else is worse than no recommendation, and this is the half that a
 *       reader notices and a data check never would.
 *
 * BOTH PLAYERS, though they are deliberately not the same feature: Level 3 puts
 * this above a grid of three units because there the question really is "which
 * unit", and Level 1 has one unit and folds it into the second action on its
 * path screen. The ORDER is the same and is asserted the same way.
 *
 * Run: node scripts/check-nextstep.js   (exit 1 on any failure)
 */

'use strict';

const D3 = require('./lib/aat3-driver.js');
const D1 = require('./lib/aat1-driver.js');

const RED = '\x1b[31m', GREEN = '\x1b[32m', DIM = '\x1b[2m', BOLD = '\x1b[1m', RESET = '\x1b[0m';

let failures = 0, checks = 0;
function ok(cond, label) {
  checks++;
  if (!cond) { failures++; console.log(`  ${RED}✗${RESET} ${label}`); }
}
function section(t) { console.log(`${DIM}${t}${RESET}`); }

console.log(`${BOLD}The next-step recommendation, on both self-rendering players${RESET}\n`);

const DAY = 24 * 3600 * 1000;
const LONG_AGO = Date.now() - 400 * DAY;

/* A per-question record in one of the three states this reads:
     'wrong'  — answered wrongly and never put right (the backlog)
     'due'    — answered right, with a schedule that has come round again
     'fine'   — answered right, not due for a long time yet */
function qrec(state) {
  if (state === 'wrong') return { w: LONG_AGO + 2000, r: LONG_AGO };
  if (state === 'due') return { w: LONG_AGO, r: LONG_AGO + 2000, sr: { dueAt: Date.now() - DAY, reps: 1, ease: 2.5, interval: 1 } };
  return { w: LONG_AGO, r: LONG_AGO + 2000, sr: { dueAt: Date.now() + 400 * DAY, reps: 4, ease: 2.5, interval: 400 } };
}

/* ── Level 3 ──────────────────────────────────────────────────────────────── */

const LEVEL3 = {
  name: 'Level 3', D: D3,
  /* Every unit's bank, as the module itself would see it, so a seeded store
     refers to questions that really exist. */
  banks() {
    const M = D3.loadUI(D3.fakeStore());
    const out = {};
    out.tpfb = (M.AAT3_PRACTICE.QUESTIONS || []).filter(q => (q.unitKey || 'tpfb') === 'tpfb');
    out.faps = M.AAT3_FAPS_PRACTICE.QUESTIONS || [];
    out.mats = M.AAT3_MATS_PRACTICE.QUESTIONS || [];
    return out;
  },
  lessons() {
    const M = D3.loadUI(D3.fakeStore());
    const out = {};
    [M.AAT3_LEARN_PATH, M.AAT3_FAPS_PATH, M.AAT3_MATS_PATH].forEach(p => (p || []).forEach(g => {
      (out[g.unit] || (out[g.unit] = [])).push(...(g.lessons || []).map(l => l.id));
    }));
    return out;
  },
  /* `spec` is { unitKey: { wrong, due, done, mocks, los } }. */
  store(spec) {
    const banks = this.banks();
    const lessonIds = this.lessons();
    const units = {}, lessons = {};
    Object.keys(spec).forEach(u => {
      const s = spec[u] || {};
      const qs = {};
      const bank = banks[u] || [];
      let at = 0;
      for (let i = 0; i < (s.wrong || 0) && at < bank.length; i++, at++) qs[bank[at].id] = qrec('wrong');
      for (let i = 0; i < (s.due || 0) && at < bank.length; i++, at++) qs[bank[at].id] = qrec('due');
      (lessonIds[u] || []).slice(0, s.done || 0).forEach(id => { lessons[id] = { best: 100 }; });
      units[u] = { runs: 1, mocks: s.mocks || 0, mockBest: 0, los: s.los || {}, qs };
    });
    return D3.fakeStore({ [D3.STORE_KEY]: JSON.stringify({ lessons, practice: { units } }) });
  },
  /* The recommendation as the reader sees it: its title, its explanation, and
     the node that acts on it. Read off the page, never computed here. */
  read(store) {
    const M = D3.loadUI(store);
    const el = D3.fakeEl();
    M.AAT3_UI.reset('units', 'tpfb');
    M.AAT3_UI.mount(el);
    const n = D3.nodes(el, 'donext')[0];
    const t = /a3-nudge-t">([^<]*)</.exec(el.innerHTML);
    const m = /a3-nudge-m">([^<]*)</.exec(el.innerHTML);
    return { M, el, node: n, title: t ? t[1] : null, why: m ? m[1] : null };
  },
};

/* ── Level 1 ──────────────────────────────────────────────────────────────── */

const LEVEL1 = {
  name: 'Level 1', D: D1,
  banks() {
    const M = D1.loadUI(D1.fakeStore());
    return { bkfn: M.AAT1_PRACTICE.QUESTIONS || [] };
  },
  lessons() {
    const M = D1.loadUI(D1.fakeStore());
    const out = [];
    (M.AAT1_LEARN_PATH || []).forEach(g => out.push(...(g.lessons || []).map(l => l.id)));
    return { bkfn: out };
  },
  store(spec) {
    const s = spec.bkfn || {};
    const bank = this.banks().bkfn;
    const qs = {}, lessons = {};
    let at = 0;
    for (let i = 0; i < (s.wrong || 0) && at < bank.length; i++, at++) qs[bank[at].id] = qrec('wrong');
    for (let i = 0; i < (s.due || 0) && at < bank.length; i++, at++) qs[bank[at].id] = qrec('due');
    this.lessons().bkfn.slice(0, s.done || 0).forEach(id => { lessons[id] = { best: 100 }; });
    return D1.fakeStore({
      [D1.STORE_KEY]: JSON.stringify({
        lessons,
        practice: { runs: 1, mocks: s.mocks || 0, mockBest: 0, los: s.los || {}, qs },
      }),
    });
  },
  read(store) {
    const M = D1.loadUI(store);
    const el = D1.fakeEl();
    M.AAT1_UI.reset('path');
    M.AAT1_UI.mount(el);
    const alt = /class="a1-act a1-act-alt"([^>]*)>([\s\S]*?)<\/button>/.exec(el.innerHTML);
    if (!alt) return { M, el, node: null, title: null, why: null };
    const t = /a1-act-t">([^<]*)</.exec(alt[2]);
    const m = /a1-act-m">([^<]*)</.exec(alt[2]);
    const act = /data-a1="([^"]*)"/.exec(alt[1]);
    const node = act ? D1.nodes(el, act[1]).find(x => (x.getAttribute('class') || '').indexOf('a1-act-alt') !== -1) : null;
    return { M, el, node, title: t ? t[1] : null, why: m ? m[1] : null, act: act ? act[1] : null };
  },
};

/* The unit whose bank the recommendation's questions live in — read off the
   page rather than from the store, because "it named MATS" is the claim. */
function namesUnit(r, code) {
  return (r.title + ' ' + r.why).indexOf(code) !== -1;
}

/* ── Level 3 ──────────────────────────────────────────────────────────────── */
console.log(`${BOLD}Level 3${RESET}`);
const P3 = LEVEL3;
{
  section('  1. a reader with no history');
  const r = P3.read(P3.store({}));
  ok(!!r.node, 'the suggestion is on the units screen');
  ok(/^Start /.test(r.title || ''), `and sends a beginner into a unit (said "${r.title}")`);
}
{
  section('  2. the order');
  /* Everything true at once. Each step removes the winner and the next one
     must take over — which is a stronger statement than testing each in
     isolation, because it is the RANKING that is the design here. */
  const banks = P3.banks();
  const full = { tpfb: { wrong: 6, due: 20, done: 0, los: { 1: { attempted: 40, correct: 10 } } } };
  const a = P3.read(P3.store(full));
  ok(/got wrong/.test(a.title || ''), `a backlog outranks everything (said "${a.title}")`);

  const b = P3.read(P3.store({ tpfb: { due: 20, done: 0, los: { 1: { attempted: 40, correct: 10 } } } }));
  ok(/due for review/.test(b.title || ''), `a review queue outranks a lesson (said "${b.title}")`);

  const c = P3.read(P3.store({ tpfb: { los: { 1: { attempted: 40, correct: 10 } } } }));
  ok(/^(Start|Carry on)/.test(c.title || ''), `an unread lesson outranks a weak outcome (said "${c.title}")`);

  /* Every lesson in every unit read, so the lesson rung is empty and the weak
     outcome can be seen. */
  const allDone = {};
  Object.keys(banks).forEach(u => { allDone[u] = { done: 9999 }; });
  allDone.tpfb = { done: 9999, mocks: 1, los: { 1: { attempted: 40, correct: 10 } } };
  Object.keys(allDone).forEach(u => { if (u !== 'tpfb') allDone[u].mocks = 1; });
  const d = P3.read(P3.store(allDone));
  ok(/costing you marks/i.test(d.title || ''), `a weak outcome outranks a sat mock (said "${d.title}")`);

  const noMock = {};
  Object.keys(banks).forEach(u => { noMock[u] = { done: 9999, mocks: u === 'tpfb' ? 0 : 1 }; });
  const e = P3.read(P3.store(noMock));
  ok(/mock/i.test(e.title || ''), `a first mock outranks mixed practice (said "${e.title}")`);

  const nothing = {};
  Object.keys(banks).forEach(u => { nothing[u] = { done: 9999, mocks: 1 }; });
  const f = P3.read(P3.store(nothing));
  ok(/Mixed practice/.test(f.title || ''), `and mixed practice is the last word (said "${f.title}")`);
}
{
  section('  3. thresholds');
  const two = P3.read(P3.store({ tpfb: { wrong: 2, done: 9999, mocks: 1 } }));
  ok(!/got wrong/.test(two.title || ''), `two outstanding questions is not a headline (said "${two.title}")`);
  const three = P3.read(P3.store({ tpfb: { wrong: 3, done: 9999, mocks: 1 } }));
  ok(/got wrong/.test(three.title || ''), `three is (said "${three.title}")`);

  const four = P3.read(P3.store({ tpfb: { due: 4, done: 9999, mocks: 1 } }));
  ok(!/due for review/.test(four.title || ''), `four due is not a headline (said "${four.title}")`);
  const five = P3.read(P3.store({ tpfb: { due: 5, done: 9999, mocks: 1 } }));
  ok(/due for review/.test(five.title || ''), `five is (said "${five.title}")`);

  const thin = P3.read(P3.store({ tpfb: { done: 9999, mocks: 1, los: { 1: { attempted: 7, correct: 0 } } } }));
  ok(!/costing you marks/i.test(thin.title || ''),
    `seven attempts is too few to call an outcome weak (said "${thin.title}")`);
}
{
  section('  4. which unit');
  /* The backlog is in MATS and the bigger review queue is in FAPS. Both the
     kind and the unit have to come out right, and neither is the first unit in
     the registry nor the one worth the most marks. */
  const r = P3.read(P3.store({
    mats: { wrong: 4, done: 9999, mocks: 1 },
    faps: { due: 30, done: 9999, mocks: 1 },
    tpfb: { done: 9999, mocks: 1 },
  }));
  ok(/got wrong/.test(r.title || '') && namesUnit(r, 'MATS'),
    `the backlog wins and names its own unit (said "${r.title} — ${r.why}")`);

  const r2 = P3.read(P3.store({
    mats: { due: 6, done: 9999, mocks: 1 },
    faps: { due: 30, done: 9999, mocks: 1 },
    tpfb: { done: 9999, mocks: 1 },
  }));
  ok(/due for review/.test(r2.title || '') && namesUnit(r2, 'FAPS'),
    `and the review queue names the unit with the most due (said "${r2.title} — ${r2.why}")`);
}
{
  section('  5. finishing beats starting');
  /* Three lessons into TPFB, which is the SMALLEST unit by exam weighting. A
     ranking that went by weighting alone would send the reader to FAPS. */
  const r = P3.read(P3.store({ tpfb: { done: 3 } }));
  ok(/^Carry on/.test(r.title || '') && namesUnit(r, 'TPFB'),
    `a unit under way beats a bigger untouched one (said "${r.title}")`);
}
{
  section('  6. the marks at stake, not the accuracy');
  /* Outcome A is worse as a percentage; outcome B is worth far more of the
     paper. The one that costs more marks is the one to name. */
  const M = D3.loadUI(D3.fakeStore());
  const outs = M.AAT3_SYLLABUS.units.faps.outcomes.slice().sort((a, b) => a.weighting - b.weighting);
  const small = outs[0], big = outs[outs.length - 1];
  ok(big.weighting > small.weighting * 2,
    `FAPS has outcomes far apart in weight to compare (${small.weighting}% vs ${big.weighting}%)`);
  const los = {};
  los[small.n] = { attempted: 40, correct: 4 };    // 10% right, small stake
  los[big.n] = { attempted: 40, correct: 26 };     // 65% right, large stake
  const spec = { faps: { done: 9999, mocks: 1, los }, tpfb: { done: 9999, mocks: 1 }, mats: { done: 9999, mocks: 1 } };
  const r = P3.read(P3.store(spec));
  const cheap = (100 - 10) * small.weighting, dear = (100 - 65) * big.weighting;
  /* Only asserted when the arithmetic actually makes the big outcome dearer —
     otherwise this would be testing the content's weightings, not the rule. */
  if (dear > cheap) {
    ok(new RegExp('Outcome ' + big.n + '\\b').test(r.title || ''),
      `the dearer outcome is named, not the worse one (said "${r.title}")`);
  } else {
    ok(new RegExp('Outcome ' + small.n + '\\b').test(r.title || ''),
      `the dearer outcome is named, not the worse one (said "${r.title}")`);
  }
}
{
  section('  7. the button goes where it says');
  const cases = [
    ['a backlog', { tpfb: { wrong: 6, done: 9999, mocks: 1 } }, /questions you had got wrong|got wrong/],
    ['a review queue', { tpfb: { due: 20, done: 9999, mocks: 1 } }, /spaced review/],
    ['mixed practice', { tpfb: { done: 9999, mocks: 1 }, faps: { done: 9999, mocks: 1 }, mats: { done: 9999, mocks: 1 } }, /all outcomes/],
  ];
  cases.forEach(([label, spec, want]) => {
    const r = P3.read(P3.store(spec));
    ok(!!r.node, `${label}: there is a button to press`);
    if (!r.node) return;
    r.node.fire('click');
    const h = r.el.innerHTML;
    ok(/a3-lessonbar-m/.test(h) && want.test(h),
      `${label}: one tap lands in the run it named (${(/a3-lessonbar-m">([^<]*)</.exec(h) || [])[1]})`);
  });

  const lesson = P3.read(P3.store({ tpfb: { done: 3 } }));
  lesson.node.fire('click');
  ok(/a3-lessonbar-t">/.test(lesson.el.innerHTML),
    'a lesson: one tap opens the lesson rather than the path');

  const mockSpec = { tpfb: { done: 9999, mocks: 0 }, faps: { done: 9999, mocks: 1 }, mats: { done: 9999, mocks: 1 } };
  const mock = P3.read(P3.store(mockSpec));
  ok(/mock/i.test(mock.title || ''), `a first mock is offered (said "${mock.title}")`);
  mock.node.fire('click');
  ok(/a3-mockclock/.test(mock.el.innerHTML), 'a mock: one tap starts the timed paper');
  /* Put the clock down. A started mock holds a live setInterval, and in Node
     that keeps the event loop alive: without this the check passes and then
     hangs for ever, which reads exactly like a check that is slow. */
  mock.M.AAT3_UI.suspend();
}
console.log('');

/* ── Level 1 ──────────────────────────────────────────────────────────────── */
console.log(`${BOLD}Level 1${RESET}`);
const P1 = LEVEL1;
{
  section('  1. a reader with no history');
  const r = P1.read(P1.store({}));
  ok(!!r.node, 'the second action carries a suggestion');
  ok(/Mixed/.test(r.title || ''), `and offers the practice picker (said "${r.title}")`);
  ok(r.act === 'practice', 'through the picker, so a reader who wants to choose still can');
}
{
  section('  2. the order');
  const a = P1.read(P1.store({ bkfn: { wrong: 6, due: 20, los: { 1: { attempted: 40, correct: 10 } } } }));
  ok(/got wrong/.test(a.title || ''), `a backlog outranks everything (said "${a.title}")`);

  const b = P1.read(P1.store({ bkfn: { due: 20, los: { 1: { attempted: 40, correct: 10 } } } }));
  ok(/ready to come back/.test(b.title || ''), `a review queue outranks a weak outcome (said "${b.title}")`);

  const c = P1.read(P1.store({ bkfn: { los: { 1: { attempted: 40, correct: 10 } } } }));
  ok(/^Outcome 1\b/.test(c.title || ''), `a weak outcome outranks a first mock (said "${c.title}")`);

  const d = P1.read(P1.store({ bkfn: { done: 9999 } }));
  ok(/mock/i.test(d.title || ''), `a first mock outranks mixed practice (said "${d.title}")`);

  const e = P1.read(P1.store({ bkfn: { done: 9999, mocks: 1 } }));
  ok(/Mixed/.test(e.title || ''), `and mixed practice is the last word (said "${e.title}")`);
}
{
  section('  3. thresholds');
  ok(!/got wrong/.test((P1.read(P1.store({ bkfn: { wrong: 2, mocks: 1 } })).title) || ''),
    'two outstanding questions is not a headline');
  ok(/got wrong/.test((P1.read(P1.store({ bkfn: { wrong: 3, mocks: 1 } })).title) || ''), 'three is');
  ok(!/ready to come back/.test((P1.read(P1.store({ bkfn: { due: 4, mocks: 1 } })).title) || ''),
    'four due is not a headline');
  ok(/ready to come back/.test((P1.read(P1.store({ bkfn: { due: 5, mocks: 1 } })).title) || ''), 'five is');
  ok(!/^Outcome /.test((P1.read(P1.store({ bkfn: { mocks: 1, los: { 1: { attempted: 7, correct: 0 } } } })).title) || ''),
    'seven attempts is too few to call an outcome weak');
}
{
  section('  4. a mock is only offered once there is nothing left to read');
  const r = P1.read(P1.store({ bkfn: { done: 1 } }));
  ok(!/mock/i.test(r.title || ''),
    `one step read is not "nothing left to read" (said "${r.title}")`);
}
{
  section('  5. the marks at stake, not the accuracy');
  const M = D1.loadUI(D1.fakeStore());
  const outs = M.AAT1_SYLLABUS.units.bkfn.outcomes.slice().sort((a, b) => a.weighting - b.weighting);
  const small = outs[0], big = outs[outs.length - 1];
  const los = {};
  los[small.n] = { attempted: 40, correct: 4 };
  los[big.n] = { attempted: 40, correct: 26 };
  const r = P1.read(P1.store({ bkfn: { done: 9999, mocks: 1, los } }));
  const cheap = (100 - 10) * small.weighting, dear = (100 - 65) * big.weighting;
  const want = dear > cheap ? big.n : small.n;
  ok(new RegExp('^Outcome ' + want + '\\b').test(r.title || ''),
    `the dearer outcome is named, not the worse one (said "${r.title}")`);
}
{
  section('  6. the button goes where it says');
  const cases = [
    ['a backlog', { bkfn: { wrong: 6, mocks: 1 } }, /you had got wrong|got wrong/],
    ['a review queue', { bkfn: { due: 20, mocks: 1 } }, /spaced review/],
    ['a weak outcome', { bkfn: { mocks: 1, los: { 1: { attempted: 40, correct: 4 } } } }, /Outcome 1/],
  ];
  cases.forEach(([label, spec, want]) => {
    const r = P1.read(P1.store(spec));
    ok(!!r.node, `${label}: there is a button to press`);
    if (!r.node) return;
    r.node.fire('click');
    const h = r.el.innerHTML;
    ok(/a1-lessonbar-m/.test(h) && want.test(h),
      `${label}: one tap lands in the run it named (${(/a1-lessonbar-m">([^<]*)</.exec(h) || [])[1]})`);
  });

  const mock = P1.read(P1.store({ bkfn: { done: 9999 } }));
  mock.node.fire('click');
  ok(/a1-mockclock/.test(mock.el.innerHTML), 'a mock: one tap starts the timed paper');
  mock.M.AAT1_UI.suspend();   // see the Level 3 note: a live clock never exits
}

console.log('');
if (failures) {
  console.log(`${RED}${BOLD}── ${failures} of ${checks} checks failed${RESET}`);
  process.exit(1);
}
console.log(`${GREEN}${BOLD}── The recommendation moves with the evidence: ${checks} checks ✓${RESET}`);
