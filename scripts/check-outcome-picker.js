#!/usr/bin/env node
/**
 * Practising a chosen few outcomes — or, on Level 2, a chosen few topics.
 *
 * Two runs used to be on offer on each level: everything, or one thing. Neither
 * fits a reader partway through a course, who has finished some of it and not
 * started the rest. The picker is the third option, and almost everything that
 * can go wrong with it goes wrong SILENTLY — the reader presses a button and
 * gets a run of no questions, or a run quietly drawn from material they have
 * never read. Nothing throws. So the claims are asserted here rather than
 * eyeballed.
 *
 * WHAT IT ASSERTS
 *
 *   The draw (Level 1, through the real allocator)
 *     - a run over a chosen set contains those outcomes and NOTHING else,
 *       repeated, because the seat allocation carries a random offset and a
 *       filter that leaked would leak intermittently
 *     - it is WEIGHTED, not proportional to the bank: a run over two outcomes
 *       splits them the way the assessment weights them against each other,
 *       which a plain shuffle of the narrowed pool would not
 *     - a run never comes back empty: an empty or stale set is every outcome,
 *       not nothing
 *     - a set stored as strings draws the same questions as the same set as
 *       numbers, because JSON cannot tell "1" from 1 and a strict comparison
 *       against a bank of numbers would match nothing at all
 *     - the stored set drops outcomes the unit does not have, and outcomes with
 *       no questions left to ask
 *
 *   The screen (both levels, in a real browser)
 *     - there is a chip for every pickable outcome or topic and for no others,
 *       so the chips and the stored set cannot disagree
 *     - the run button is present and DISABLED until something is ticked, and
 *       says what it is waiting for
 *     - ticking a chip does not repaint the screen. This is the one thing no
 *       fake DOM can see, and the reason the whole check needs a browser: the
 *       handler patches two nodes instead of calling render(), so a marker set
 *       on a node above the chips must survive the tap
 *     - the set survives a reload with its chips still pressed
 *     - the run that starts contains the chosen topics and nothing else
 *     - "try again" replays the set that was sat, not whatever is ticked now
 *     - the picker does not appear at all when there is no choice to make
 *
 * Run: node scripts/check-outcome-picker.js   (exit 1 on any failure)
 */

'use strict';

const path = require('path');
const http = require('http');
const fs = require('fs');
const ROOT = path.join(__dirname, '..');
/* Level 2 renders a dozen question types and each has its own controls; sitting
   a run to its result screen is about sixty lines. See scripts/lib/aat2-page.js
   for why that lives in one place. */
const { answerCurrent } = require('./lib/aat2-page.js');

const RED = '\x1b[31m', GREEN = '\x1b[32m', YEL = '\x1b[33m';
const BOLD = '\x1b[1m', DIM = '\x1b[2m', RESET = '\x1b[0m';

let failures = 0, checks = 0;
function ok(cond, label) {
  checks++;
  if (!cond) { failures++; console.log(`  ${RED}✗${RESET} ${label}`); }
}

console.log(`${BOLD}Practising a chosen few${RESET}\n`);

/* ══════════════════════════════════════════════════════════════════════════
   Part one — Level 1's draw, through the real allocator.

   Pure, so it needs no browser: the claim worth asserting about a run over a
   chosen set is a property of the draw, and reaching it through the screen
   would test the navigation instead.
   ══════════════════════════════════════════════════════════════════════════ */
{
  const D = require('./lib/aat1-driver.js');
  const M = D.loadUI(D.fakeStore());
  const draw = M.AAT1_UI.drawPractice;
  const OUTCOMES = require('../aat1-syllabus.js').SYLLABUS.units.bkfn.outcomes;
  const w = n => (OUTCOMES.find(o => o.n === n) || {}).weighting;

  ok(typeof draw === 'function', 'the Level 1 practice draw is reachable for assertion');

  /* REPEATED, because one draw of ten proves very little. Three hundred runs
     of ten is three thousand questions per set. */
  const SETS = [[1, 2], [3], [2, 4, 5], [1, 5]];
  SETS.forEach(set => {
    const counts = {};
    let drawn = 0, strays = 0;
    for (let i = 0; i < 300; i++) {
      draw(10, set).forEach(q => {
        drawn++;
        counts[q.lo] = (counts[q.lo] || 0) + 1;
        if (set.indexOf(q.lo) === -1) strays++;
      });
    }
    /* A draw that returns nothing would pass "no strays" while proving nothing
       at all — which is exactly how the Level 3 version of this check first
       reported green on three units it had not loaded. */
    ok(drawn > 2000,
      `L1 ${JSON.stringify(set)}: only ${drawn} questions drawn over 300 runs — a draw ` +
      `with an empty bank passes every other assertion here vacuously`);
    ok(strays === 0,
      `L1 ${JSON.stringify(set)}: ${strays} of ${drawn} questions came from an outcome ` +
      `outside the chosen set (${JSON.stringify(counts)})`);
    ok(set.every(n => counts[n] > 0),
      `L1 ${JSON.stringify(set)}: a chosen outcome never appeared at all (${JSON.stringify(counts)})`);
  });

  /* WEIGHTED, NOT PROPORTIONAL TO THE BANK — asserted on a pair that can tell
     the difference.

     THIS IS THE TRAP IN THIS FILE, and it cost a mutation to find. Level 1's
     bank was deliberately written to the assessment's weighting, so for most
     pairs of outcomes "weighted" and "in proportion to how many questions each
     has" are the SAME NUMBER: Outcomes 3 and 4 are weighted 46:54 and hold
     96:111 questions, which is 46.4:53.6. An assertion on that pair passes
     whether the draw weights or simply shuffles the narrowed pool — it cannot
     fail, and an assertion that cannot fail is worse than none, because it
     reads as coverage.

     Outcomes 2 and 5 are the pair that separates them: weighted 10 against 10,
     so 50:50, but 33 against 41 questions, so a plain shuffle lands near 44.6.
     The seat allocation is near-deterministic — six thousand questions come
     back within a twentieth of a point — so the tolerance is tight enough that
     the two hypotheses cannot both sit inside it. */
  [[2, 5, 2, 0.446], [4, 5, 4, 0.730]].forEach(([a, b, of, byBank]) => {
    const want = w(of) / (w(a) + w(b));
    const counts = {};
    let drawn = 0;
    for (let i = 0; i < 500; i++) {
      draw(10, [a, b]).forEach(q => { counts[q.lo] = (counts[q.lo] || 0) + 1; drawn++; });
    }
    const got = (counts[of] || 0) / drawn;
    ok(Math.abs(got - want) < 0.02,
      `L1: a run over Outcomes ${a} and ${b} gave Outcome ${of} ${(got * 100).toFixed(1)}% of ` +
      `the questions. Weighted ${w(a)} against ${w(b)} it should be ${(want * 100).toFixed(1)}%; ` +
      `drawn in proportion to the bank it would be ${(byBank * 100).toFixed(1)}%`);
    ok(Math.abs(want - byBank) > 0.04,
      `L1: Outcomes ${a} and ${b} weight ${(want * 100).toFixed(1)}% and hold ` +
      `${(byBank * 100).toFixed(1)}% of the bank — too close together for the assertion above ` +
      `to tell a weighted draw from a plain shuffle, so it now proves nothing. Pick another pair.`);
  });

  /* An empty set is not a narrower run, it is every outcome. The screen never
     starts one, but a stored set whose outcomes have all been put away resolves
     to nothing, and silently serving zero questions is the worst of the
     available behaviours. */
  {
    const seen = {};
    for (let i = 0; i < 200; i++) draw(10, []).forEach(q => { seen[q.lo] = 1; });
    ok(Object.keys(seen).length > 2,
      `L1: an empty set drew from only ${Object.keys(seen).length} outcome(s) — it must ` +
      `fall back to the whole unit rather than to nothing`);
    ok(draw(10, null).length === 10, 'L1: a null set drew no questions at all');
  }

  /* NUMBERS THAT ARRIVED AS STRINGS. The stored set is JSON in a store the
     reader can edit, and JSON does not know an outcome number from the text of
     one. A set holding "1" passes a liveness check (object keys coerce) and
     then matches nothing in the draw (a strict comparison does not), and the
     run comes back EMPTY with no error anywhere. */
  {
    const asSet = set => {
      const seen = {};
      for (let i = 0; i < 100; i++) draw(10, set).forEach(q => { seen[q.lo] = 1; });
      return Object.keys(seen).map(Number).sort((a, b) => a - b).join(',');
    };
    ok(asSet(['1', '2']) === asSet([1, 2]),
      `L1: a set of strings drew outcomes [${asSet(['1', '2'])}] where the same set as ` +
      `numbers drew [${asSet([1, 2])}] — the draw must coerce, or a store holding "1" ` +
      `serves nothing at all`);
    ok(draw(10, ['3']).length === 10, 'L1: a set written as strings drew no questions at all');
  }

  /* THE STORED SET, read back through the code the screen uses. */
  {
    const seeded = D.loadUI(D.fakeStore({ 'prep_v2_aat1_losel': JSON.stringify(['1', '2']) }));
    const sel = seeded.AAT1_UI.loSelection();
    ok(sel.length === 2 && sel.every(n => typeof n === 'number'),
      `L1: a set stored as ["1","2"] read back as ${JSON.stringify(sel)} — it must be ` +
      `coerced to numbers on the way out, because the draw compares strictly`);
    ok(sel.join(',') === '1,2', `L1: a stored set of Outcomes 1 and 2 read back as ${JSON.stringify(sel)}`);

    const bogus = D.loadUI(D.fakeStore({ 'prep_v2_aat1_losel': JSON.stringify([2, 99]) }));
    ok(bogus.AAT1_UI.loSelection().join(',') === '2',
      `L1: a stored set holding an outcome the unit does not have read back as ` +
      `${JSON.stringify(bogus.AAT1_UI.loSelection())}`);

    /* AND AN OUTCOME WITH NOTHING LEFT TO ASK. "I know this" retires a
       question, and an outcome whose questions have all been retired loses its
       chip — but it would stay in the stored set, which is what the run button
       says and what the draw is handed. */
    const BANK = require('../aat1-practice-data.js').AAT1_PRACTICE.QUESTIONS;
    const qs = {};
    BANK.forEach(q => { qs[q.id] = { k: 1 }; });
    const retired = D.loadUI(D.fakeStore({
      'prep_v2_aat1': JSON.stringify({ practice: { qs } }),
      'prep_v2_aat1_losel': JSON.stringify([1, 2]),
    }));
    const left = retired.AAT1_UI.loSelection();
    ok(left.length === 0,
      `L1: with every question retired the stored set still read back as ` +
      `${JSON.stringify(left)} — an outcome with nothing left to ask must drop out of ` +
      `the set, or the button offers a run of no questions`);
  }
}

/* ══════════════════════════════════════════════════════════════════════════
   Part two — the screens, in a real browser.

   A fake DOM cannot see the one property that matters most here: that ticking
   a chip patches two nodes instead of repainting the screen. It has no
   `closest`, so the handler that does the patching never runs in it at all.
   ══════════════════════════════════════════════════════════════════════════ */

let chromium;
try { ({ chromium } = require('playwright')); } catch (e) {
  if (process.env.REQUIRE_PLAYWRIGHT) {
    console.log(`  ${RED}✗${RESET} Playwright required: ${e.message}`);
    process.exit(1);
  }
  console.log(`  ${YEL}⚠${RESET} Playwright unavailable — the screen checks are skipped.`);
  console.log(failures
    ? `\n${RED}${BOLD}── ${failures} of ${checks} checks failed${RESET}\n`
    : `\n${GREEN}${BOLD}── The draw holds ✓${RESET}  ${DIM}(${checks} assertions, screens skipped)${RESET}\n`);
  process.exit(failures ? 1 : 0);
}

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.webmanifest': 'application/manifest+json', '.png': 'image/png', '.svg': 'image/svg+xml',
};
function serve() {
  return new Promise(resolve => {
    const server = http.createServer((req, res) => {
      const u = decodeURIComponent(req.url.split('?')[0]);
      const file = path.join(ROOT, u === '/' ? 'index.html' : u);
      if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
        res.writeHead(404); res.end('not found'); return;
      }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
      fs.createReadStream(file).pipe(res);
    });
    server.listen(0, '127.0.0.1', () => resolve({ server, port: server.address().port }));
  });
}

/* Level 2 unlocks each unit behind the one before it, so a fresh reader has one
   topic and no choice to make. This is the reader three units in. */
function unlockLevel2() {
  const lp = window.AAT_LEARN_PATH || window.LEARN_PATH || [];
  const lessons = {}, unitTests = {};
  lp.forEach(u => {
    u.lessons.forEach(L => { lessons[L.id] = { best: 100, done: true }; });
    unitTests[u.unit || u.id] = { passed: true, score: 100 };
  });
  const d = JSON.parse(localStorage.getItem('aatPrep_v2') || '{}');
  d.learn = Object.assign({ lessons: {}, xp: 0 }, d.learn, { lessons, unitTests });
  d.settings = Object.assign({}, d.settings, { seenSplash: true });
  localStorage.setItem('aatPrep_v2', JSON.stringify(d));
}

(async () => {
  const { server, port } = await serve();
  const CANDIDATES = [
    '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell',
    '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    '/opt/pw-browsers/chromium',
  ].filter(p => fs.existsSync(p));
  const browser = await chromium.launch(CANDIDATES.length ? { executablePath: CANDIDATES[0] } : {});

  try {
    /* ── Level 1 ──────────────────────────────────────────────────────────── */
    {
      const ctx = await browser.newContext({ viewport: { width: 390, height: 800 } });
      const page = await ctx.newPage();
      await page.addInitScript(() => { localStorage.setItem('multisubject_active', 'aat1'); });
      await page.goto(`http://127.0.0.1:${port}/index.html`, { waitUntil: 'networkidle' });
      await page.waitForFunction(() => !!window.AAT1_UI, { timeout: 15000 });
      await page.evaluate(() => {
        window.AAT1_UI.reset('practice');
        window.AAT1_UI.mount(document.querySelector('.a1-root').parentElement);
      });
      await page.waitForSelector('.a1-chip', { timeout: 10000 });

      const chips = await page.locator('.a1-chip').evaluateAll(
        es => es.map(e => Number(e.getAttribute('data-lo'))));
      const cards = await page.locator('[data-a1="startpractice"]').evaluateAll(
        es => es.map(e => e.getAttribute('data-lo')).filter(v => /^\d+$/.test(v)).map(Number));
      ok(chips.length > 1, `L1 screen: ${chips.length} chip(s) — a picker with one chip is not a choice`);
      ok(JSON.stringify(chips) === JSON.stringify(cards),
        `L1 screen: ${chips.length} outcomes can be ticked but ${cards.length} can be started ` +
        `(${JSON.stringify(chips)} vs ${JSON.stringify(cards)}) — every outcome with questions ` +
        `behind it should offer both, or the chips and the stored set will disagree`);

      ok(await page.locator('.a1-pick-go').count() === 1, 'L1 screen: the chosen set has no button to start it');
      ok(await page.locator('.a1-pick-go').getAttribute('disabled') !== null,
        'L1 screen: with nothing ticked the run button is not disabled');
      ok((await page.locator('.a1-pick-lbl').textContent()).indexOf('Choose') === 0,
        'L1 screen: the disabled button does not say what it is waiting for');
      ok(await page.locator('.a1-chip[aria-pressed]').count() === chips.length,
        'L1 screen: a chip carries no pressed state, so a screen reader cannot tell which are chosen');

      /* THE TAP, AND THE REPAINT THAT MUST NOT HAPPEN. The marker is set on a
         node ABOVE the chips: if the handler called rerender() the whole screen
         would be rebuilt from a string and the property would be gone with it. */
      await page.evaluate(() => { document.querySelector('.a1-pgrid').__probe = 'here'; });
      await page.locator('.a1-chip[data-lo="1"]').click();
      await page.locator('.a1-chip[data-lo="2"]').click();
      await page.waitForTimeout(120);
      ok(await page.evaluate(() => document.querySelector('.a1-pgrid').__probe === 'here'),
        'L1 screen: ticking a chip repainted the practice screen — the row of chips moves ' +
        'out from under the finger still tapping along it');
      ok(await page.locator('.a1-pick-go').getAttribute('disabled') === null,
        'L1 screen: two chips are ticked and the run button is still disabled');
      const lbl1 = await page.locator('.a1-pick-lbl').textContent();
      ok(/Outcomes 1 and 2/.test(lbl1), `L1 screen: the run button reads "${lbl1}" after ticking Outcomes 1 and 2`);

      /* Untick both and it goes back to waiting, rather than offering a run of
         nothing. */
      await page.locator('.a1-chip[data-lo="1"]').click();
      await page.locator('.a1-chip[data-lo="2"]').click();
      await page.waitForTimeout(120);
      ok(await page.locator('.a1-pick-go').getAttribute('disabled') !== null,
        'L1 screen: unticking the last chip left the run button live, so it would start a run of nothing');

      /* REMEMBERED. Which outcomes you have studied is a fact about where you
         are in the unit, not a thing to re-tick every visit. */
      await page.locator('.a1-chip[data-lo="3"]').click();
      await page.waitForTimeout(120);
      await page.reload({ waitUntil: 'networkidle' });
      await page.waitForFunction(() => !!window.AAT1_UI, { timeout: 15000 });
      await page.evaluate(() => {
        window.AAT1_UI.reset('practice');
        window.AAT1_UI.mount(document.querySelector('.a1-root').parentElement);
      });
      await page.waitForSelector('.a1-chip', { timeout: 10000 });
      ok(await page.locator('.a1-chip[data-lo="3"]').getAttribute('aria-pressed') === 'true',
        'L1 screen: the chosen set did not survive a reload');
      const lbl2 = await page.locator('.a1-pick-lbl').textContent();
      ok(/Outcome 3\b/.test(lbl2), `L1 screen: after a reload the run button reads "${lbl2}"`);

      /* AND THE RUN ITSELF — the questions the button actually produced, not
         the questions a function sitting next to it would have. The draw is
         asserted above against the same function startPractice calls, which
         proves the draw and not the wiring; this proves the wiring. */
      await page.locator('.a1-pick-go').click();
      await page.waitForTimeout(400);
      ok(await page.locator('.a1-opt, .a1-q').count() > 0,
        'L1 screen: pressing the run button started nothing');
      const run = await page.evaluate(() => window.AAT1_UI.runOutcomes());
      ok(run.length > 5,
        `L1 run: ${run.length} questions — pressing the button started a run of nothing`);
      const strays = run.filter(n => n !== 3);
      ok(strays.length === 0,
        `L1 run: ${strays.length} of ${run.length} questions came from outside the chosen ` +
        `Outcome 3 (${JSON.stringify([...new Set(strays)])}) — the button is not narrowing the draw`);

      await ctx.close();
    }

    /* ── Level 2 ──────────────────────────────────────────────────────────── */
    {
      /* THE PICKER IS NOT THERE WHEN THERE IS NOTHING TO PICK. A fresh Level 2
         reader has one unit unlocked, so "several together" is not a thing that
         can be done, and a control offering it would be a lie. */
      const ctx0 = await browser.newContext({ viewport: { width: 390, height: 800 } });
      const p0 = await ctx0.newPage();
      await p0.addInitScript(() => {
        localStorage.setItem('multisubject_active', 'aat');
        /* Past the splash, which otherwise stands between this check and the
           screen it is about. Written only when there is nothing there yet:
           this runs before EVERY navigation, reloads included, and an
           unconditional write would wipe the unlocked units seeded below and
           quietly turn the reload assertions into a fresh-reader test. */
        if (!localStorage.getItem('aatPrep_v2')) {
          localStorage.setItem('aatPrep_v2', JSON.stringify({ settings: { seenSplash: true } }));
        }
      });
      await p0.goto(`http://127.0.0.1:${port}/index.html`, { waitUntil: 'networkidle' });
      await p0.waitForFunction(() => !!window.__AAT2_PRACTICE, { timeout: 15000 });
      await p0.locator('[data-tab="home"]').first().click();
      await p0.waitForTimeout(300);
      const fresh = await p0.evaluate(() => window.__AAT2_PRACTICE.pickableTopics());
      ok(fresh.length === 1,
        `L2 screen: a fresh reader has ${fresh.length} pickable topics (${JSON.stringify(fresh)}) — ` +
        `if the unlock gate has changed, the assertion below no longer tests what it says`);
      ok(await p0.locator('.topic-pick').count() === 0,
        'L2 screen: the picker is offered to a reader with only one topic unlocked, ' +
        'where "several together" is not a thing that can be done');
      await ctx0.close();

      const ctx = await browser.newContext({ viewport: { width: 390, height: 800 } });
      const page = await ctx.newPage();
      await page.addInitScript(() => {
        localStorage.setItem('multisubject_active', 'aat');
        if (!localStorage.getItem('aatPrep_v2')) {
          localStorage.setItem('aatPrep_v2', JSON.stringify({ settings: { seenSplash: true } }));
        }
      });
      await page.goto(`http://127.0.0.1:${port}/index.html`, { waitUntil: 'networkidle' });
      await page.waitForFunction(() => !!window.__AAT2_PRACTICE, { timeout: 15000 });
      await page.evaluate(unlockLevel2);
      await page.reload({ waitUntil: 'networkidle' });
      await page.waitForFunction(() => !!window.__AAT2_PRACTICE, { timeout: 15000 });
      await page.locator('[data-tab="home"]').first().click();
      await page.waitForSelector('.topic-chip', { timeout: 10000 });

      const chips = await page.locator('.topic-chip').evaluateAll(es => es.map(e => e.dataset.pickTopic));
      const pickable = await page.evaluate(() => window.__AAT2_PRACTICE.pickableTopics());
      ok(chips.length > 1, `L2 screen: ${chips.length} chip(s) — a picker with one chip is not a choice`);
      ok(JSON.stringify(chips) === JSON.stringify(pickable),
        `L2 screen: the chips (${JSON.stringify(chips)}) and the topics the stored set will ` +
        `accept (${JSON.stringify(pickable)}) are different lists — a chip the set cannot hold ` +
        `goes dark and changes nothing`);
      const startable = await page.locator('.topic-card[data-topic]').evaluateAll(
        es => es.map(e => e.dataset.topic));
      ok(chips.every(id => startable.indexOf(id) !== -1),
        `L2 screen: a topic can be ticked that cannot be started on its own ` +
        `(chips ${JSON.stringify(chips)}, cards ${JSON.stringify(startable)})`);

      ok(await page.locator('.topic-pick-go').getAttribute('disabled') !== null,
        'L2 screen: with nothing ticked the run button is not disabled');
      ok((await page.locator('.topic-pick-lbl').textContent()).indexOf('Choose') === 0,
        'L2 screen: the disabled button does not say what it is waiting for');

      /* The tap, and the repaint that must not happen. */
      await page.evaluate(() => { document.querySelector('.home-grid').__probe = 'here'; });
      await page.locator('.topic-chip[data-pick-topic="itbk"]').click();
      await page.locator('.topic-chip[data-pick-topic="pobc"]').click();
      await page.waitForTimeout(150);
      ok(await page.evaluate(() => document.querySelector('.home-grid').__probe === 'here'),
        'L2 screen: ticking a chip repainted the practice tab — the topic grid above it ' +
        'replays its fade-in and the chips move under the finger');
      ok(await page.locator('.topic-pick-go').getAttribute('disabled') === null,
        'L2 screen: two chips are ticked and the run button is still disabled');
      const lbl = await page.locator('.topic-pick-lbl').textContent();
      ok(/Bookkeeping and Controls/.test(lbl),
        `L2 screen: the run button reads "${lbl}" after ticking Bookkeeping and Controls`);
      const stored = await page.evaluate(() => window.__AAT2_PRACTICE.topicSelection());
      ok(JSON.stringify(stored) === JSON.stringify(['itbk', 'pobc']),
        `L2 screen: the stored set is ${JSON.stringify(stored)} after ticking two chips`);

      /* Remembered across a reload, chips and all. */
      await page.reload({ waitUntil: 'networkidle' });
      await page.waitForFunction(() => !!window.__AAT2_PRACTICE, { timeout: 15000 });
      await page.locator('[data-tab="home"]').first().click();
      await page.waitForSelector('.topic-chip', { timeout: 10000 });
      ok(await page.locator('.topic-chip[data-pick-topic="itbk"]').getAttribute('aria-pressed') === 'true'
        && await page.locator('.topic-chip[data-pick-topic="pobc"]').getAttribute('aria-pressed') === 'true',
        'L2 screen: the chosen set did not survive a reload with its chips pressed');

      /* THE RUN. The claim is about the questions in it, and nothing in the
         rendered quiz names the topic a question came from. */
      await page.locator('.topic-pick-go').click();
      await page.waitForTimeout(500);
      const run = await page.evaluate(() => window.__AAT2_PRACTICE.runTopics());
      ok(run.length > 10,
        `L2 run: ${run.length} questions drawn — a run that returns nothing passes ` +
        `"never strays outside the set" while proving nothing at all`);
      const strays = run.filter(t => t !== 'itbk' && t !== 'pobc');
      ok(strays.length === 0,
        `L2 run: ${strays.length} of ${run.length} questions came from a topic outside the ` +
        `chosen set (${JSON.stringify([...new Set(strays)])})`);
      ok(new Set(run).size === 2,
        `L2 run: the run drew from ${new Set(run).size} of the 2 chosen topics ` +
        `(${JSON.stringify([...new Set(run)])}) — a chosen topic never appeared at all`);

      /* "TRY AGAIN" REPLAYS THE SET THAT WAS SAT, not whatever is ticked now.
         The set is resolved into the run when it starts, so changing the chips
         afterwards must not change what the finished run was.

         The run has to be SAT to reach the button, and the first version of
         this check skipped the whole assertion when #retryBtn was not on the
         page — which it never was, because the run was still on question one.
         A conditional assertion that silently passes is the thing this file
         exists to prevent, so the button is now required rather than looked
         for. */
      const frozen = await page.evaluate(() => {
        /* Re-tick behind the run's back, exactly as a reader returning to the
           practice tab mid-run could. */
        localStorage.setItem('aatPrep_v2_topicsel', JSON.stringify(['poc']));
        return window.__AAT2_PRACTICE.topicSelection();
      });
      ok(JSON.stringify(frozen) === JSON.stringify(['poc']),
        `L2 run: the set read back as ${JSON.stringify(frozen)} after being re-ticked, so the ` +
        `replay assertion below would not be testing anything`);

      for (let i = 0; i < run.length + 4; i++) {
        if (await page.locator('#retryBtn').count()) break;
        await answerCurrent(page);
        const next = page.locator('#nextBtn');
        if (await next.count()) await next.click({ timeout: 2500 }).catch(() => {});
        await page.waitForTimeout(60);
      }
      ok(await page.locator('#retryBtn').count() === 1,
        'L2 run: the run never reached its result screen, so "try again" could not be tested');
      await page.locator('#retryBtn').click();
      await page.waitForTimeout(500);
      const replay = [...new Set(await page.evaluate(() => window.__AAT2_PRACTICE.runTopics()))].sort();
      ok(JSON.stringify(replay) === JSON.stringify(['itbk', 'pobc']),
        `L2 run: "try again" replayed ${JSON.stringify(replay)} after the chips were ` +
        `re-ticked to ["poc"] — the set must be fixed at the moment the run starts, or a ` +
        `reader who changes it retroactively changes the run they just sat`);

      /* THE STORED SET DROPS WHAT IT CANNOT OFFER. A topic id that no longer
         exists, or one whose unit has been locked again, would otherwise sit in
         the set with no chip beside it: the button would name a topic the
         reader cannot see, and the run would quietly be drawn from something
         else. */
      const cleaned = await page.evaluate(() => {
        localStorage.setItem('aatPrep_v2_topicsel', JSON.stringify(['itbk', 'no-such-topic', 'pobc']));
        return window.__AAT2_PRACTICE.topicSelection();
      });
      ok(JSON.stringify(cleaned) === JSON.stringify(['itbk', 'pobc']),
        `L2: a stored set holding a topic that does not exist read back as ` +
        `${JSON.stringify(cleaned)} — it must drop out, or the button offers a topic with no chip`);

      await ctx.close();
    }
  } finally {
    await browser.close();
    server.close();
  }

  console.log(failures
    ? `\n${RED}${BOLD}── ${failures} of ${checks} checks failed${RESET}\n`
    : `\n${GREEN}${BOLD}── A run over a chosen few holds ✓${RESET}  ${DIM}(${checks} assertions)${RESET}\n`);
  process.exit(failures ? 1 : 0);
})();
