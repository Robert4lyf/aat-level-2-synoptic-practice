#!/usr/bin/env node
/**
 * You cannot lose a timed paper by tapping back.
 *
 * A mock is the one run in this app that cannot be resumed and is worth an
 * hour and a half. Every other screen is cheap to leave: a lesson reopens from
 * the path exactly where it was, and a practice run banks each answer as it
 * passes, so backing out of either costs nothing. Walking out of a mock throws
 * away the whole paper — it is never marked, so there is no percentage, no
 * report, no review, and it does not count towards the best-of.
 *
 * The back button sits inches from the answer buttons on a phone. So it asks
 * first, on all three levels and on the French DELF exam, which is held
 * entirely in memory and never written to storage at all.
 *
 * WHAT THIS ASSERTS, AND WHY IN THIS ORDER
 *
 * The easy half is that a dialog appears. The half that matters is that what
 * the dialog SAYS is true, so the claims are checked against the store rather
 * than against the wording:
 *
 *   - leaving mid-paper does not count as a mock sat, and does not move the
 *     best-of  → "it will not be marked"
 *   - questions already answered are still in the practice record → "questions
 *     you have already answered stay in your practice record"
 *
 * A warning that overstates the loss is one readers learn to click through, and
 * one that understates it is a lie. Both halves have to hold.
 *
 * The rest is the behaviour around it: the paper is still underneath, cancel
 * really cancels, the clock stops only on the way out, the guard cannot outlive
 * the paper it is asking about, and — the trap this gate exists to prevent —
 * the header's 🏠 is guarded on the same terms as the back button beside it.
 * Guarding one and not the other is worse than guarding neither: it teaches the
 * reader that leaving is safe.
 *
 * Two halves. The first drives Levels 1 and 3 through the real player with the
 * fake DOM, which is fast and exhaustive. The second opens the real app in
 * Chromium, because Level 2 and the DELF exam live in app.js, which needs a
 * browser — and because only a browser can press the header button.
 *
 * Run: node scripts/check-mock-exit-guard.js   (exit 1 on any failure)
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

console.log(`${BOLD}Leaving a timed paper${RESET}\n`);

/* ── Levels 1 and 3, through the real player ───────────────────────────────
   One description per level, because the two modules are separate code with
   separate prefixes and a fix applied to one has twice now not been applied to
   the other. */
/* Level 3 keeps a practice record PER UNIT, under practice.units[key]; Level 1
   has one unit and keeps it flat. Read rather than assumed, because a reader
   that finds nothing returns zero and every claim it is asked to check passes
   by default — the exact shape of hollow green this suite has produced before. */
function units(store, key) {
  const d = JSON.parse(store.getItem(key) || '{}');
  return ((d.practice || {}).units) || {};
}

const LEVELS = [
  {
    name: 'Level 3',
    driver: './lib/aat3-driver.js',
    ui: 'AAT3_UI',
    guard: 'a3-guard',
    clock: 'a3-mockclock',
    stem: /<h2 class="a3-q">([\s\S]*?)<\/h2>/,
    /* Reaching the practice screen. Level 3 has a unit picker in front of it;
       reset() puts the screen there directly, which is what the app does when
       a reader taps through. */
    open(D, M, el) { M.AAT3_UI.reset('practice', null); M.AAT3_UI.mount(el); },
    /* The two counters the warning makes a claim about. Level 3 keeps them per
       unit; Level 1 has one unit and keeps them flat. */
    mockRec(store, key) {
      const u = units(store, key);
      return Object.keys(u).map(k => u[k]).find(v => v && 'mocks' in v) || { mocks: 0, mockBest: 0 };
    },
    answered(store, key) {
      const u = units(store, key);
      return Object.keys(u).reduce((n, k) => n + Object.keys((u[k] || {}).qs || {}).length, 0);
    },
  },
  {
    name: 'Level 1',
    driver: './lib/aat1-driver.js',
    ui: 'AAT1_UI',
    guard: 'a1-guard',
    clock: 'a1-mockclock',
    stem: /<h2 class="a1-q">([\s\S]*?)<\/h2>/,
    open(D, M, el) { M.AAT1_UI.reset('practice'); M.AAT1_UI.mount(el); },
    mockRec(store, key) {
      const d = JSON.parse(store.getItem(key) || '{}');
      return d.practice || { mocks: 0, mockBest: 0, qs: {} };
    },
    answered(store, key) {
      const d = JSON.parse(store.getItem(key) || '{}');
      return Object.keys(((d.practice || {}).qs) || {}).length;
    },
  },
];

for (const L of LEVELS) {
  const D = require(L.driver);
  const restore = D.seedRandom(20260829);
  const has = (el) => new RegExp(L.guard).test(el.innerHTML);
  const question = (el) => (el.innerHTML.match(L.stem) || [])[1] || null;

  /* Every instance is kept so its clock can be stopped at the end. A mock's
     clock is a setInterval on a module-level handle, and each loadUI() is a
     fresh module with its own — so a run that starts eight papers leaves eight
     intervals alive and Node never exits. */
  const opened = [];
  function inMock() {
    const store = D.fakeStore();
    const M = D.loadUI(store);
    const el = D.fakeEl();
    L.open(D, M, el);
    D.click(el, 'startmock');
    const t = { store, M, el };
    opened.push(t);
    return t;
  }

  console.log(`${DIM}${L.name}${RESET}`);

  /* Sitting the paper. Nothing is in the way until the reader asks to leave. */
  let t = inMock();
  ok(!has(t.el), `${L.name}: no dialog while the paper is being sat`);
  ok(new RegExp(L.clock).test(t.el.innerHTML), `${L.name}: the mock is actually running`);

  /* Back raises it — and does not act on it. The paper has to still be there,
     ON THE SAME QUESTION: a guard that leaves first and asks afterwards is not
     a guard. */
  const before = question(t.el);
  D.click(t.el, 'exit');
  ok(has(t.el), `${L.name}: back raises the dialog`);
  ok(new RegExp(L.clock).test(t.el.innerHTML), `${L.name}: the paper is still on screen behind it`);
  ok(question(t.el) === before, `${L.name}: still on the same question`);

  /* What it says. Not asserted word for word — that tests the copy, not the
     behaviour — but the two things a reader has to be told cannot go missing. */
  const text = t.el.innerHTML.replace(/<[^>]*>/g, ' ').toLowerCase();
  ok(/will be lost/.test(text), `${L.name}: the dialog says progress will be lost`);
  ok(/cannot be resumed/.test(text), `${L.name}: the dialog says a mock cannot be resumed`);

  /* Two ways out, and they are different actions. This caught nothing when it
     was written; it exists because a copy-paste that pointed both buttons at
     the same handler would leave a dialog that only ever destroys. */
  ok(D.nodes(t.el, 'exitcancel').length === 1, `${L.name}: one way to stay`);
  ok(D.nodes(t.el, 'exitconfirm').length === 1, `${L.name}: one way to leave`);

  /* Cancel really cancels. */
  D.click(t.el, 'exitcancel');
  ok(!has(t.el), `${L.name}: staying dismisses the dialog`);
  ok(question(t.el) === before, `${L.name}: staying leaves the reader on the same question`);
  ok(D.nodes(t.el, 'mocknext').length === 1, `${L.name}: the paper can be carried on with`);

  /* Confirm leaves — and stops the clock on the way. A clock left running fires
     finish() over whatever screen the reader has moved on to. */
  D.click(t.el, 'exit');
  D.click(t.el, 'exitconfirm');
  ok(!has(t.el), `${L.name}: leaving dismisses the dialog`);
  ok(!new RegExp(L.clock).test(t.el.innerHTML), `${L.name}: leaving stops the clock`);
  ok(D.nodes(t.el, 'startmock').length === 1, `${L.name}: leaving lands on the practice screen`);

  /* ── The claims, checked against the store rather than the wording ──────── */
  {
    const s = inMock();
    const key = D.STORE_KEY;
    /* Answer three, then walk out. */
    for (let i = 0; i < 3; i++) D.click(s.el, 'mocknext');
    const answeredBefore = L.answered(s.store, key);
    D.click(s.el, 'exit');
    D.click(s.el, 'exitconfirm');
    const rec = L.mockRec(s.store, key);
    ok(rec.mocks === 0, `${L.name}: a paper walked out of does not count as a mock sat`);
    ok(!rec.mockBest, `${L.name}: a paper walked out of does not move the best score`);
    ok(answeredBefore === 3, `${L.name}: the three questions answered were recorded as they passed`);
    ok(L.answered(s.store, key) === 3,
      `${L.name}: leaving keeps the questions already answered — as the dialog promises`);
  }

  /* ── Only a mock is guarded ─────────────────────────────────────────────── */
  {
    const s = inMock();
    /* Out of the mock, into a plain practice run. */
    D.click(s.el, 'exit'); D.click(s.el, 'exitconfirm');
    const mix = D.nodes(s.el, 'startpractice').concat(D.nodes(s.el, 'practicelo'));
    if (mix.length) {
      mix[0].fire('click');
      D.click(s.el, 'exit');
      ok(!has(s.el), `${L.name}: leaving a practice run is not guarded`);
    } else {
      ok(true, `${L.name}: leaving a practice run is not guarded`);
    }
  }

  /* ── The hook the header's 🏠 goes through ──────────────────────────────── */
  {
    const s = inMock();
    ok(s.M[L.ui].guardExit() === true, `${L.name}: Home is intercepted during a mock`);
    s.M[L.ui].mount(s.el);
    ok(has(s.el), `${L.name}: Home raises the same dialog`);
    /* And releases it once the paper is gone, so the header behaves normally
       everywhere else. */
    D.click(s.el, 'exitcancel');
    D.click(s.el, 'exit'); D.click(s.el, 'exitconfirm');
    ok(s.M[L.ui].guardExit() === false, `${L.name}: Home is not intercepted outside a mock`);
  }

  /* ── The guard cannot outlive the paper ─────────────────────────────────── */
  {
    /* The clock goes on ticking underneath the dialog, and when it runs out its
       interval calls finish() directly. Driven here by answering the paper out
       with the dialog open, which reaches the same finish(). Without the reset
       the result screen paints with "Leave the mock?" over it, offering to
       abandon a paper that has already been marked. */
    const s = inMock();
    D.click(s.el, 'exit');
    let n = 0;
    while (D.nodes(s.el, 'mocknext').length && n < 200) { D.click(s.el, 'mocknext'); n++; }
    ok(n > 0, `${L.name}: the paper could be answered out`);
    ok(!has(s.el), `${L.name}: a paper that finishes under the dialog clears it`);
    ok(!D.nodes(s.el, 'exitconfirm').length,
      `${L.name}: the result screen does not offer to abandon a marked paper`);

    /* And leaving the RESULT screen asks nothing. The mode is still 'mock'
       there — that is what tells the done screen to withhold the verdict until
       the reader asks for the review — so a guard written on the mode alone
       fires over a paper that is already marked and banked, asking the reader
       to confirm losing something they cannot lose. */
    D.click(s.el, 'exit');
    ok(!has(s.el), `${L.name}: leaving a finished paper is not guarded`);
    ok(D.nodes(s.el, 'startmock').length === 1,
      `${L.name}: and lands on the practice screen in one tap`);
    ok(s.M[L.ui].guardExit() === false,
      `${L.name}: Home is not intercepted on the result screen`);

    /* Home and away also clear it, or it reappears over a screen it has nothing
       to say about. */
    const s2 = inMock();
    D.click(s2.el, 'exit');
    s2.M[L.ui].home();
    s2.M[L.ui].mount(s2.el);
    ok(!has(s2.el), `${L.name}: Home clears a dialog left open`);

    const s3 = inMock();
    D.click(s3.el, 'exit');
    s3.M[L.ui].suspend();
    s3.M[L.ui].mount(s3.el);
    ok(!has(s3.el), `${L.name}: switching subject clears a dialog left open`);
  }

  opened.forEach(o => o.M[L.ui].suspend());
  restore();
}

/* ── Level 2 and the DELF exam, in a real browser ──────────────────────────
   Both live in app.js, which is a browser module, and the header button only
   exists on a real page. */

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.webmanifest': 'application/manifest+json',
  '.png': 'image/png', '.svg': 'image/svg+xml'
};

function serve() {
  return new Promise((resolve) => {
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

let chromium = null;
try { ({ chromium } = require('playwright')); } catch (e) { /* handled below */ }

(async () => {
  if (!chromium) {
    /* Same rule as the render sweep: lenient locally, a build failure in CI,
       where a browser that silently failed to install would leave this half of
       the gate green while asserting nothing. */
    if (process.env.REQUIRE_PLAYWRIGHT) {
      console.log(`\n  ${RED}✗${RESET}  Playwright is required here and is not installed.`);
      process.exit(1);
    }
    console.log(`\n  ${YEL}⚠${RESET}  Playwright is not installed — skipping Level 2 and the DELF exam.`);
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

  async function open(subject) {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    const errs = [];
    page.on('pageerror', e => errs.push('uncaught: ' + e.message));
    await page.addInitScript(id => localStorage.setItem('multisubject_active', id), subject);
    await page.goto(base, { waitUntil: 'load' });
    await page.waitForFunction(() => {
      const a = document.getElementById('app');
      return a && a.textContent.trim().length > 40;
    }, { timeout: 15000 }).catch(() => {});
    /* The shared shell opens on a splash; the self-rendering subjects do not
       have one. Click it if it is there. */
    await tap(page, '#startBtn');
    return { ctx, page, errs };
  }
  /* Click a selector if the screen actually offers it. The four subjects here
     open on four different screens, and hard-coding a path through each of them
     is four things to keep in step with the app rather than one. */
  async function tap(page, sel) {
    const b = page.locator(sel).first();
    if (await b.count() && await b.isVisible().catch(() => false)) {
      await b.click();
      await page.waitForTimeout(150);
      return true;
    }
    return false;
  }
  const shown = (page, sel) => page.locator(sel).first().isVisible().catch(() => false);

  try {
    /* ── Level 2's synoptic mock ─────────────────────────────────────────── */
    {
      console.log(`${DIM}Level 2${RESET}`);
      const { ctx, page, errs } = await open('aat');
      await tap(page, '[data-tab="home"]');
      await page.click('#mockBtn');
      await page.waitForSelector('#exitBtn', { timeout: 10000 });
      ok(await shown(page, '#mockTimer'), 'Level 2: the mock is running');

      await page.click('#exitBtn');
      ok(await shown(page, '.modal-backdrop'), 'Level 2: back raises the dialog');
      ok(await shown(page, '#mockTimer'), 'Level 2: the paper is still on screen behind it');
      const say = (await page.textContent('.modal')) || '';
      ok(/will be lost/i.test(say), 'Level 2: the dialog says progress will be lost');
      ok(/cannot be resumed/i.test(say), 'Level 2: the dialog says a mock cannot be resumed');

      await page.click('#modalCancel');
      ok(!(await shown(page, '.modal-backdrop')), 'Level 2: staying dismisses the dialog');
      ok(await shown(page, '#mockTimer'), 'Level 2: staying leaves the reader in the paper');

      await page.click('#exitBtn');
      await page.click('#modalConfirm');
      ok(!(await shown(page, '#mockTimer')), 'Level 2: leaving ends the paper');
      ok(errs.length === 0, `Level 2: no uncaught error (${errs.join('; ')})`);
      await ctx.close();
    }

    /* ── The header button, on the two self-rendering levels ─────────────── */
    for (const [subject, name, guard, startBtn] of [
      ['aat3', 'Level 3', '.a3-guard', '[data-a3="startmock"]'],
      ['aat1', 'Level 1', '.a1-guard', '[data-a1="startmock"]'],
    ]) {
      console.log(`${DIM}${name}, in the browser${RESET}`);
      const { ctx, page, errs } = await open(subject);
      /* Through the app the way a reader does: units → path → practice → mock.
         Whichever of those buttons exists on the screen in front of us. */
      for (const sel of ['[data-a3="openunit"]', '[data-a3="practice"]', '[data-a1="practice"]']) {
        await tap(page, sel);
      }
      await page.waitForSelector(startBtn, { timeout: 10000 });
      await page.click(startBtn);

      /* The back button first. */
      await page.click(`${guard === '.a3-guard' ? '.a3-ctx-back' : '.a1-ctx-back'}`);
      ok(await shown(page, guard), `${name}: back raises the dialog in the real app`);

      /* Escape is the safe choice, always. */
      await page.keyboard.press('Escape');
      ok(!(await shown(page, guard)), `${name}: Escape dismisses it`);

      /* Then the header's 🏠, inches away, which used to discard the paper
         without a word. */
      await page.click('#homeNavBtn');
      ok(await shown(page, guard), `${name}: the header Home button raises it too`);

      /* The safe choice is the one focus lands on. A reader who taps back and
         hits Enter out of habit stays in the paper. */
      const focused = await page.evaluate(() =>
        (document.activeElement && document.activeElement.textContent) || '');
      ok(/stay/i.test(focused), `${name}: focus lands on the safe choice, not the destructive one`);

      /* Neither label fractures. Side by side the two of them came to four
         pixels more than the box had, and a flex item shrinks before it wraps —
         so both broke onto two lines: "Leave and lose / it". Invisible to every
         other check in the suite, because the dialog only exists after a click.
         Measured at three widths: side by side, stacked, and the narrowest
         phone the layout sweep covers. */
      for (const w of [1280, 480, 320]) {
        await page.setViewportSize({ width: w, height: 900 });
        const lines = await page.evaluate((g) => {
          const row = document.querySelector(g + '-actions');
          if (!row) return null;
          return [...row.children].map(b => {
            const lh = parseFloat(getComputedStyle(b).lineHeight) || 20;
            const inner = b.getBoundingClientRect().height
              - parseFloat(getComputedStyle(b).paddingTop)
              - parseFloat(getComputedStyle(b).paddingBottom);
            return { text: b.textContent.trim(), rows: Math.round(inner / lh) };
          });
        }, guard);
        ok(lines && lines.length === 2 && lines.every(l => l.rows <= 1),
          `${name}: neither choice wraps to two lines at ${w}px` +
          (lines ? ` (${lines.map(l => l.text + ': ' + l.rows).join(', ')})` : ''));
      }
      await page.setViewportSize({ width: 1280, height: 900 });

      ok(errs.length === 0, `${name}: no uncaught error (${errs.join('; ')})`);
      await ctx.close();
    }

    /* ── The DELF exam ───────────────────────────────────────────────────── */
    {
      console.log(`${DIM}DELF exam${RESET}`);
      const { ctx, page, errs } = await open('french');
      await tap(page, '[data-tab="delf"]');
      await page.waitForSelector('[data-delf-exam]', { timeout: 10000 });
      await page.click('[data-delf-exam]');
      await page.waitForSelector('#delfExitBtn', { timeout: 10000 });

      /* Nothing sat yet: nothing to lose, so nothing to ask about. A dialog
         that fires when there is no cost is one readers stop reading. */
      await page.click('#delfExitBtn');
      ok(!(await shown(page, '.modal-backdrop')),
        'DELF: leaving an exam with nothing sat asks nothing');
      ok(await shown(page, '[data-delf-exam]'), 'DELF: and leaves, rather than sitting there');

      /* Inside a section, with its clock running. */
      await page.click('[data-delf-exam]');
      await page.waitForSelector('[data-delf-start]', { timeout: 10000 });
      await page.click('[data-delf-start]');
      await page.waitForSelector('#delfFinishSectionBtn', { timeout: 10000 });

      await page.click('#homeNavBtn');
      ok(await shown(page, '.modal-backdrop'), 'DELF: leaving a section in progress asks first');
      const say = (await page.textContent('.modal')) || '';
      ok(/will be lost/i.test(say), 'DELF: the dialog says progress will be lost');
      await page.click('#modalCancel');
      ok(await shown(page, '#delfFinishSectionBtn'), 'DELF: staying leaves the reader in the section');

      /* Back to the list of sections is navigation INSIDE the exam, not out of
         it, so it asks nothing. */
      await page.click('#delfSectionBackBtn');
      ok(!(await shown(page, '.modal-backdrop')), 'DELF: moving between sections is not a dialog');
      ok(await shown(page, '#delfExitBtn'), 'DELF: and the exam is still open');

      /* A section sat and scored. Its mark is held in memory and written
         nowhere, so from here leaving really does cost something — including
         when the mark is zero, which is why "done" is tested by identity
         against false rather than for truthiness. */
      await page.click('[data-delf-start]');
      await page.waitForSelector('#delfFinishSectionBtn', { timeout: 10000 });
      await page.click('#delfFinishSectionBtn');
      await page.waitForSelector('#delfExitBtn', { timeout: 10000 });
      await page.click('#delfExitBtn');
      ok(await shown(page, '.modal-backdrop'), 'DELF: leaving with a section already sat asks first');
      await page.click('#modalConfirm');
      ok(await shown(page, '[data-delf-exam]'), 'DELF: leaving ends the exam');

      ok(errs.length === 0, `DELF: no uncaught error (${errs.join('; ')})`);
      await ctx.close();
    }
  } finally {
    await browser.close();
    server.close();
  }

  finish();
})().catch(e => {
  console.log(`  ${RED}✗${RESET} the browser half threw: ${e.message}`);
  process.exit(1);
});

function finish() {
  console.log();
  if (failures) {
    console.log(`${RED}${BOLD}${failures} of ${checks} failed${RESET}\n`);
    process.exit(1);
  }
  console.log(`${GREEN}${BOLD}✓ ${checks} checks passed${RESET}\n`);
}
