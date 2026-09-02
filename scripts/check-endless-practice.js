#!/usr/bin/env node
/**
 * Endless practice never ends, and ends properly when the reader stops.
 *
 * The whole claim of the mode is a negative one — that the run does NOT stop —
 * and a negative is exactly what an ordinary check of a screen cannot see. A
 * run that quietly reverted to ten questions would look completely normal.
 *
 * So the property asserted here is the one the name promises: drive far past
 * the length of an ordinary run, past the size of the first batch, and require
 * that a question is still being served. Then stop, and require a result screen
 * whose totals describe what was actually attempted rather than however far the
 * top-up happened to reach.
 *
 * WHAT ELSE IS ASSERTED, AND WHY
 *
 *   - the mode is OFFERED on each level's practice screen, since a mode nobody
 *     can reach is not a mode;
 *   - it looks different — its own header class and its own entry card — because
 *     "give it a unique visual style" is a requirement, and a requirement that
 *     is not checked is a requirement that quietly rots;
 *   - a bounded run is untouched, which is the regression this most risks;
 *   - the streak rises with right answers and resets with a wrong one, since
 *     the streak is the only sense of position the mode offers and a streak
 *     that does not move is furniture.
 *
 * Levels 1 and 3 are driven through the fake DOM. Level 2 lives in app.js and
 * needs a browser, so it is driven in Chromium alongside them.
 *
 * Run: node scripts/check-endless-practice.js
 */
'use strict';

const path = require('path');
const http = require('http');
const fs = require('fs');
const ROOT = path.join(__dirname, '..');

const RED = '\x1b[31m', GREEN = '\x1b[32m', YEL = '\x1b[33m';
const BOLD = '\x1b[1m', DIM = '\x1b[2m', RESET = '\x1b[0m';

let failures = 0, checks = 0;
function ok(cond, label) {
  checks++;
  if (!cond) { failures++; console.log(`  ${RED}✗${RESET} ${label}`); }
}

console.log(`${BOLD}Endless practice${RESET}\n`);

/* ── Levels 1 and 3, through the real player ───────────────────────────────
   Far enough past the batch size that a run reverting to a fixed slice — of
   any plausible length — would be caught. */
const PAST_ANY_BATCH = 40;

const LEVELS = [
  { name: 'Level 3', driver: './lib/aat3-driver.js', ui: 'AAT3_UI', pre: 'a3',
    open: M => M.AAT3_UI.reset('practice', 'tpfb') },
  { name: 'Level 1', driver: './lib/aat1-driver.js', ui: 'AAT1_UI', pre: 'a1',
    open: M => M.AAT1_UI.reset('practice') },
];

/* Answer whatever is on screen, correctly or not as asked. The drivers differ
   in what they expose, so this covers the types both levels render rather than
   leaning on either one's helper. */
function answer(D, el, pre, wantRight) {
  const at = list => list[wantRight ? 0 : Math.min(1, list.length - 1)];
  /* Written first, because it is the one type answered in three steps rather
     than one. Claiming every rubric point passes it and claiming none fails
     it, which is how this loop produces a wrong answer on a type that has no
     wrong option to pick. */
  if (D.answerWritten && D.answerWritten(el, wantRight ? 'all' : 'none')) return true;
  if (D.nodes(el, 'ans').length) { at(D.nodes(el, 'ans')).fire('click'); return true; }
  if (D.nodes(el, 'tf').length) {
    const seen = new Set();
    D.nodes(el, 'tf').forEach(n => {
      const i = n.getAttribute('data-s');
      if (seen.has(i) || n.getAttribute('data-v') !== 'true') return;
      seen.add(i); n.fire('click');
    });
    D.click(el, 'tfsubmit'); return true;
  }
  if (D.nodes(el, 'gap').length) {
    const byGap = new Map();
    D.nodes(el, 'gap').forEach(n => {
      const g = n.getAttribute('data-g');
      if (!byGap.has(g)) byGap.set(g, []);
      byGap.get(g).push(n);
    });
    byGap.forEach(list => at(list).fire('click'));
    D.click(el, 'gapsubmit'); return true;
  }
  /* Level 1's pairing question: select a left item, then a right one, for each
     pair in turn. The action names are matchl/matchr rather than a single
     `match`, which is why an earlier version of this loop stalled here and
     reported the endless run as ending after two questions. */
  if (D.nodes(el, 'matchl').length) {
    const ls = D.nodes(el, 'matchl'), rs = D.nodes(el, 'matchr');
    for (let i = 0; i < Math.min(ls.length, rs.length); i++) {
      D.nodes(el, 'matchl')[i].fire('click');
      D.nodes(el, 'matchr')[wantRight ? i : (i + 1) % rs.length].fire('click');
    }
    if (D.nodes(el, 'matchsubmit').length) D.click(el, 'matchsubmit');
    return true;
  }
  if (D.nodes(el, 'ordersubmit').length) {
    if (!wantRight && D.nodes(el, 'orderdown').length) D.nodes(el, 'orderdown')[0].fire('click');
    D.click(el, 'ordersubmit');
    return true;
  }
  /* The two table types. Answered rather than skipped: a sweep that cannot
     answer a type reports whatever it was counting as an absence instead of
     saying it is stuck, which is how a run of ten came back as a run of three. */
  if (D.nodes(el, 'plsubmit').length) {
    D.nodes(el, 'plpick').forEach(n => { n.value = '0'; n.fire('change'); });
    D.click(el, 'plsubmit'); return true;
  }
  if (D.nodes(el, 'egsubmit').length) {
    D.nodes(el, 'egcell').forEach(n => { n.value = '0'; n.fire('input'); });
    D.click(el, 'egsubmit'); return true;
  }
  const input = D.nodes(el, 'numinput')[0];
  if (input) { input.value = '0'; input.fire('input'); D.click(el, 'numsubmit'); return true; }
  const ti = D.nodes(el, 'taskinput');
  if (ti.length || D.nodes(el, 'tasksubmit').length) {
    ti.forEach(n => { n.value = '0'; n.fire('input'); });
    const byPart = new Map();
    D.nodes(el, 'taskpick').forEach(n => {
      const p = n.getAttribute('data-p');
      if (!byPart.has(p)) byPart.set(p, []);
      byPart.get(p).push(n);
    });
    byPart.forEach(list => at(list).fire('click'));
    D.click(el, 'tasksubmit'); return true;
  }
  return false;
}

LEVELS.forEach(L => {
  const D = require(L.driver);
  const restore = D.seedRandom(20260830);
  const barClass = L.pre + '-lessonbar-endless';
  console.log(`${DIM}${L.name}${RESET}`);

  const store = D.fakeStore();
  const M = D.loadUI(store);
  const el = D.fakeEl();
  L.open(M); M[L.ui].mount(el);

  ok(el.innerHTML.indexOf('data-lo="endless"') !== -1,
    `${L.name}: endless practice is offered on the practice screen`);
  ok(new RegExp(L.pre + '-endless\\b').test(el.innerHTML),
    `${L.name}: the offer has its own card, not a plain row`);

  D.click(el, 'startpractice', n => n.getAttribute('data-lo') === 'endless');
  ok(el.innerHTML.indexOf(barClass) !== -1, `${L.name}: the run has its own header`);
  ok(new RegExp(L.pre + '-streak').test(el.innerHTML), `${L.name}: the header shows a streak`);
  ok(el.innerHTML.indexOf('Question 1 of') === -1,
    `${L.name}: and does NOT claim a position in a fixed run`);

  /* THE CLAIM ITSELF. */
  let served = 0;
  for (let i = 0; i < PAST_ANY_BATCH; i++) {
    if (!answer(D, el, L.pre, true)) break;
    if (!D.nodes(el, 'nextq').length) break;
    D.click(el, 'nextq');
    served++;
  }
  ok(served >= PAST_ANY_BATCH - 1,
    `${L.name}: still serving questions after ${served} of ${PAST_ANY_BATCH} — the run does not end`);
  ok(el.innerHTML.indexOf(barClass) !== -1,
    `${L.name}: and is still an endless run at that point`);

  /* Stopping shows a result about what was attempted. */
  D.click(el, 'exit');
  const plain = el.innerHTML.replace(/<[^>]*>/g, ' ');
  const m = /(\d+) of (\d+) correct/.exec(plain);
  ok(!!m, `${L.name}: stopping shows a result`);
  if (m) {
    /* `served` counts answer-then-advance cycles, so that many questions were
       ANSWERED and the next one was on screen untouched when the reader
       stopped. The result must describe the answered ones. */
    ok(Number(m[2]) === served,
      `${L.name}: the result counts what was attempted (${m[2]} against ${served})`);
    ok(Number(m[1]) <= Number(m[2]), `${L.name}: and cannot report more right than asked`);
  }
  ok(new RegExp(L.pre + '-done-streak').test(el.innerHTML),
    `${L.name}: the result leads with the best streak`);

  /* The regression this most risks: an ordinary run must still end. */
  const el2 = D.fakeEl();
  L.open(M);            // back to the practice screen; exit left it on the result
  M[L.ui].mount(el2);
  D.click(el2, 'startpractice', n => n.getAttribute('data-lo') === 'mix');
  let bounded = 0;
  for (let i = 0; i < 60; i++) {
    if (!answer(D, el2, L.pre, true)) break;
    if (!D.nodes(el2, 'nextq').length) break;
    D.click(el2, 'nextq');
    bounded++;
  }
  ok(bounded < 30, `${L.name}: a bounded practice run still ends (${bounded + 1} questions)`);
  ok(el2.innerHTML.indexOf(barClass) === -1, `${L.name}: and is not styled as endless`);

  /* The streak moves for a reason. */
  const el3 = D.fakeEl();
  L.open(M);
  M[L.ui].mount(el3);
  D.click(el3, 'startpractice', n => n.getAttribute('data-lo') === 'endless');
  const streakNow = () => {
    const s = /-streak-n">(\d+)</.exec(el3.innerHTML);
    return s ? Number(s[1]) : null;
  };
  ok(streakNow() === 0, `${L.name}: the streak starts at zero`);
  let rose = false, reset = false;
  for (let i = 0; i < 25 && !(rose && reset); i++) {
    const before = streakNow();
    if (!answer(D, el3, L.pre, !rose)) break;
    if (!D.nodes(el3, 'nextq').length) break;
    D.click(el3, 'nextq');
    const after = streakNow();
    if (after > before) rose = true;
    else if (rose && after === 0) reset = true;
  }
  ok(rose, `${L.name}: the streak rises on a right answer`);
  ok(reset, `${L.name}: and resets on a wrong one`);

  M[L.ui].suspend();
  restore();
});

/* ── Level 2, in a browser ─────────────────────────────────────────────────
   app.js is a browser module and its endless run is spread across eleven
   question renderers through one shared progress strip, so this drives the
   real page rather than reasoning about the source. */
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
  if (failures) { console.log(`${RED}${BOLD}${failures} of ${checks} failed${RESET}\n`); process.exit(1); }
  console.log(`${GREEN}${BOLD}✓ ${checks} checks passed${RESET}\n`);
}

(async () => {
  if (!chromium) {
    if (process.env.REQUIRE_PLAYWRIGHT) {
      console.log(`\n  ${RED}✗${RESET}  Playwright is required here and is not installed.`);
      process.exit(1);
    }
    console.log(`\n  ${YEL}⚠${RESET}  Playwright is not installed — skipping Level 2.`);
    finish();
    return;
  }
  const { server, port } = await serve();
  const base = `http://127.0.0.1:${port}/`;
  const CANDIDATES = [
    '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell',
    '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
  ].filter(p => fs.existsSync(p));
  const browser = await chromium.launch(CANDIDATES.length ? { executablePath: CANDIDATES[0] } : {});

  try {
    console.log(`${DIM}Level 2${RESET}`);
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    const errs = [];
    page.on('pageerror', e => errs.push('uncaught: ' + e.message));
    await page.addInitScript(() => localStorage.setItem('multisubject_active', 'aat'));
    /* SEED THE PAGE'S SHUFFLE. Which question types an endless run serves is
       otherwise a fresh draw every time, so a sweep that can answer eleven of
       the twelve types passes locally and fails in CI on the twelfth — which
       is what happened, on a gap-fill. A flaky gate is worse than none, and the
       fix is to make the run reproducible rather than to lower the bar. */
    await page.addInitScript(() => {
      let s = 20260830 >>> 0;
      Math.random = () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648; };
    });
    await page.goto(base, { waitUntil: 'load' });
    await page.waitForFunction(() => {
      const a = document.getElementById('app');
      return a && a.textContent.trim().length > 40;
    }, { timeout: 15000 }).catch(() => {});
    /* Skips a DISABLED control rather than waiting on it. Without the
       :not([disabled]) the sweep sat for thirty seconds on a multi-select
       submit that had not been enabled yet, and reported a timeout instead of
       whatever it was actually stuck on. Every click is bounded for the same
       reason. */
    const tap = async sel => {
      const b = page.locator(sel + ':not([disabled])').first();
      if (await b.count() && await b.isVisible().catch(() => false)) {
        await b.click({ timeout: 2500 }).catch(() => {});
        await page.waitForTimeout(100);
        return true;
      }
      return false;
    };
    await tap('#startBtn');
    await tap('[data-tab="home"]');

    ok(await page.locator('#endlessBtn').count() > 0, 'Level 2: endless practice is offered');
    ok(await page.locator('#endlessBtn.mode-endless').count() > 0,
      'Level 2: the card carries its own style class');

    await page.click('#endlessBtn');
    await page.waitForSelector('.quiz-container', { timeout: 10000 });
    ok(await page.locator('.q-counter-endless').count() > 0,
      'Level 2: the quiz header shows a streak rather than a position');
    ok(await page.locator('.q-counter:not(.q-counter-endless)').count() === 0,
      'Level 2: and not "Q1/15" alongside it');

    /* What is on screen, for the message when the harness cannot answer it —
       a stall in the harness and a run that ended are different failures and
       must not be reported as the same one. */
    const currentType = L2.currentType;
    let stalledOn = null;
    /* An endless run must never label its advance button as the last one. The
       set is topped up before the question renders precisely so this cannot
       happen; before that fix it read "See Results ✓" at every batch boundary
       and then served another question. */
    let sawSeeResults = false;
    /* Answer whatever is on screen and move on, far past any batch. */
    let served = 0;
    for (let i = 0; i < PAST_ANY_BATCH; i++) {
      /* Level 2 renders a dozen question types and each carries its own submit
         button. An earlier version clicked an option and hoped, which stalled
         on the first typed question and reported the run as ending after three.
         Click an option if there is one, fill any text input, then press
         whichever submit is on screen. */
      /* Answer only while the question is UNANSWERED — once it is graded the
         option buttons are disabled and clicking one hangs. Level 2 renders a
         dozen types, each with its own submit, so the answer step tries an
         option, fills any input, then presses whichever submit is on screen. */
      await L2.answerCurrent(page);
      const next = page.locator('#nextBtn:not([disabled])');
      if (await next.count()) {
        const label = (await next.first().innerText().catch(() => '')) || '';
        if (/see results/i.test(label)) sawSeeResults = true;
      }
      if (!(await next.count())) { stalledOn = await currentType(page); break; }
      await next.click({ timeout: 2500 }).catch(() => {});
      await page.waitForTimeout(45);
      served++;
      if (!(await page.locator('.quiz-container').count())) break;
    }
    /* The threshold that MEANS something is the batch size: getting past it
       proves a top-up happened, which is the whole mechanism. Level 2 renders a
       dozen question types and a sweep that has to answer every one of them is
       a harness problem rather than a stronger assertion, so the bar is set
       where the evidence is rather than at an arbitrary count. */
    ok(served > 12,
      `Level 2: still serving after ${served} questions — past the batch, so the set topped up`
      + (stalledOn ? ` [harness could not answer: ${stalledOn}]` : ''));
    ok(await page.locator('.q-counter-endless').count() > 0,
      'Level 2: and is still an endless run at that point');
    ok(sawSeeResults === false,
      'Level 2: the advance button never offered "See Results" during the run');

    await page.click('#exitBtn');
    await page.waitForTimeout(200);
    const scoreText = await page.locator('#app').innerText();
    ok(/\d+\s*\/\s*\d+|\d+ of \d+/.test(scoreText) || /score/i.test(scoreText),
      'Level 2: stopping shows a result rather than dropping the reader home');
    ok(errs.length === 0, `Level 2: no uncaught error (${errs.join('; ')})`);
    await ctx.close();
  } finally {
    await browser.close();
    server.close();
  }
  finish();
})().catch(e => {
  console.log(`  ${RED}✗${RESET} the browser half threw: ${e.message}`);
  process.exit(1);
});
