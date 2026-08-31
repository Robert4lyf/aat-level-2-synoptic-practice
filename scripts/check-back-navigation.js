/**
 * The platform back button steps through the app, and only leaves at the top.
 *
 * THE BUG THIS GUARDS. The app created no history entries, so Android's back
 * button did not step back through it — it popped the app's single entry and
 * left. Installed as a standalone PWA there is nowhere to leave to, and the
 * reader got a blank document painted in the theme colour: a black screen,
 * several screens deep into a lesson, recoverable only by reloading.
 *
 * WHAT IS ASSERTED, and why in three different ways:
 *
 *   §1 the sentinel logic, against a fake history. The push/pop/consume rules
 *      are the part that can be reasoned about, and a fake history is the only
 *      place the CONSUMING case can be provoked deliberately.
 *
 *   §2 every surface's own idea of back, in the fake DOM. `atRoot` and `back`
 *      are per-module and cheap to drive directly, so every screen each module
 *      can be on is walked to the root and counted. A module that reaches its
 *      root in fewer steps than it has screens has a screen whose back does
 *      nothing — which is exactly what the practice picker did on Levels 1
 *      and 3 before this file existed.
 *
 *   §3 the whole thing in Chromium, where popstate is real. The other two
 *      sections cannot see whether the listener is attached, whether a repaint
 *      actually syncs, or whether the app leaves when it should — and the
 *      Level 3 unit picker, a screen sitting ABOVE the one the first draft
 *      treated as the root, was found only here.
 *
 * Run: node scripts/check-back-navigation.js
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

console.log(`${BOLD}Back navigation${RESET}\n`);

/* ── 1. The sentinel, against a fake history ──────────────────────────────── */
console.log(`${DIM}the sentinel${RESET}`);

/* A history stand-in with the surface nav-history.js uses, and a `press()`
   that behaves the way a browser's back button does: drop the top entry, then
   fire popstate. */
function fakeWindow() {
  const stack = [{ tag: null }];
  const listeners = {};
  const w = {
    history: {
      get length() { return stack.length; },
      replaceState(s) { stack[stack.length - 1] = s; },
      pushState(s) { stack.push(s); },
      back() { if (stack.length > 1) stack.pop(); w.fire('popstate'); },
    },
    addEventListener(ev, fn) { (listeners[ev] || (listeners[ev] = [])).push(fn); },
    fire(ev) { (listeners[ev] || []).forEach(fn => fn({})); },
    /* The reader pressing back: the entry is gone before the handler runs. */
    press() { if (stack.length > 1) stack.pop(); w.fire('popstate'); },
    stack,
    listenerCount(ev) { return (listeners[ev] || []).length; },
  };
  return w;
}

function loadNav(w) {
  const p = path.join(ROOT, 'nav-history.js');
  delete require.cache[require.resolve(p)];
  const src = fs.readFileSync(p, 'utf8');
  /* The module binds to `self`; hand it the fake instead. */
  const fn = new Function('self', 'module', src + '\nreturn self.AATNav;');
  return fn(w, { exports: {} });
}

{
  const w = fakeWindow();
  const Nav = loadNav(w);
  let depth = 0;
  Nav.init({ canGoBack: () => depth > 0, back: () => { depth--; Nav.sync(); } });
  ok(w.listenerCount('popstate') === 1, 'init attaches exactly one popstate listener');

  Nav.sync();
  ok(w.stack.length === 1, 'at root, nothing is pushed');

  depth = 1; Nav.sync();
  ok(w.stack.length === 2, 'going deeper pushes one sentinel');
  depth = 2; Nav.sync();
  ok(w.stack.length === 2,
    `and going deeper again pushes no more (stack ${w.stack.length}) — the entry count is ` +
    'independent of how deep the reader is');

  w.press();
  ok(depth === 1, `back steps the app back one (depth ${depth})`);
  ok(w.stack.length === 2, 'and a fresh sentinel replaces the one that was consumed');
  w.press();
  ok(depth === 0, `back again reaches the root (depth ${depth})`);
  ok(w.stack.length === 1, 'and no sentinel is left behind');

  /* AT ROOT THE POP MUST STAND. This is the whole point: one more press has to
     leave the app rather than being swallowed. */
  const before = w.stack.length;
  w.press();
  ok(depth === 0 && w.stack.length === before,
    'at the root, a pop is left alone so the next press leaves the app');
}

/* Reaching the root by some OTHER route — the Home button, finishing a run —
   must take the stale sentinel with it, or the reader's next back press is
   swallowed doing nothing visible. */
{
  const w = fakeWindow();
  const Nav = loadNav(w);
  let depth = 0, backCalls = 0;
  Nav.init({ canGoBack: () => depth > 0, back: () => { backCalls++; depth--; } });
  depth = 1; Nav.sync();
  ok(w.stack.length === 2, 'deep again, with a sentinel');
  depth = 0; Nav.sync();          // the Home button, not a back press
  ok(w.stack.length === 1, 'going home by another route drops the stale sentinel');
  ok(backCalls === 0,
    `and does NOT run the back action (${backCalls} calls) — consuming our own entry must ` +
    'not take the reader a screen further than they asked');
}

/* THE CONSUMING GUARD EARNS ITS KEEP ONLY IN SLOW MOTION. `history.back()` is
   asynchronous: the browser fires popstate on a later turn, and in that gap the
   reader can open something. If the pop that arrives is then treated as a back
   press, the app steps out of the screen they just opened — a lesson closing
   itself a moment after being tapped.

   A synchronous fake cannot reach that: by the time it fires, the app is at the
   root and the handler would return early for its own reasons, which is why the
   first version of this section could not tell the guard from dead code. So the
   pop is deferred here, and the app goes deeper before it lands. */
{
  const pending = [];
  const w = fakeWindow();
  w.history.back = () => { if (w.stack.length > 1) w.stack.pop(); pending.push(() => w.fire('popstate')); };
  const Nav = loadNav(w);
  let depth = 0, backCalls = 0;
  Nav.init({ canGoBack: () => depth > 0, back: () => { backCalls++; depth--; } });

  depth = 1; Nav.sync();                 // deep: a sentinel is pushed
  depth = 0; Nav.sync();                 // Home: the stale sentinel is consumed, pop deferred
  depth = 2; Nav.sync();                 // the reader opens something before the pop lands
  pending.forEach(fn => fn());           // ...and now it lands

  ok(backCalls === 0,
    `a deferred pop from our own cleanup is not treated as a back press (${backCalls} calls) — ` +
    'without the guard the app steps out of whatever the reader just opened');
  ok(depth === 2, `and the reader stays where they went (depth ${depth}, expected 2)`);
}

/* ── 2. Every surface's own idea of back ──────────────────────────────────── */
console.log(`${DIM}each surface${RESET}`);

/* Every screen a module can be on is walked to its root. Counting the steps is
   what catches a screen whose back does nothing: the walk stops early and the
   module reports itself at the root having never moved. */
const SURFACES = [
  {
    name: 'Level 1',
    driver: './lib/aat1-driver.js',
    ui: M => M.AAT1_UI,
    open: UI => UI.reset('path'),
    screens: ['practice', 'quiz', 'done', 'review'],
    enter: (UI, s) => UI.reset(s),
  },
  {
    name: 'Level 3',
    driver: './lib/aat3-driver.js',
    ui: M => M.AAT3_UI,
    open: UI => UI.reset('units', 'tpfb'),
    screens: ['path', 'practice', 'quiz', 'done'],
    enter: (UI, s) => UI.reset(s, 'tpfb'),
  },
];

SURFACES.forEach(surf => {
  const D = require(surf.driver);
  const M = D.loadUI(D.fakeStore());
  const UI = surf.ui(M);
  const el = D.fakeEl();

  ok(typeof UI.atRoot === 'function', `${surf.name} exposes atRoot()`);
  ok(typeof UI.back === 'function', `${surf.name} exposes back()`);
  if (typeof UI.atRoot !== 'function' || typeof UI.back !== 'function') return;

  surf.open(UI); UI.mount(el);
  ok(UI.atRoot() === true, `${surf.name} reports its own top screen as the root`);
  /* AND BACK AT THE ROOT IS A NO-OP, not a wrap-around into some other screen. */
  UI.back(); UI.mount(el);
  ok(UI.atRoot() === true, `${surf.name} stays put when back is pressed at the root`);

  surf.screens.forEach(screen => {
    surf.enter(UI, screen); UI.mount(el);
    if (UI.atRoot()) {
      /* Legitimate for a screen that IS the root under some configuration —
         Level 3's path with a single unit. Recorded rather than asserted. */
      return;
    }
    let steps = 0;
    while (!UI.atRoot() && steps < 8) { UI.back(); UI.mount(el); steps++; }
    ok(UI.atRoot(), `${surf.name}: back from "${screen}" reaches the root (${steps} steps)`);
    ok(steps >= 1 && steps <= 4,
      `${surf.name}: "${screen}" takes a sensible number of steps to leave (${steps})`);
  });
});

/* THE GUITAR, whose two screens make the whole ladder one step. */
{
  const p = path.join(ROOT, 'guitar-ui.js');
  const src = fs.readFileSync(p, 'utf8');
  ok(/atRoot:\s*atRoot/.test(src) && /back:\s*back/.test(src),
    'the guitar exposes atRoot() and back() too');
}

/* SCOPE ASSERTED. Every module that renders its own screens must take part:
   one that quietly stops exposing the pair goes back to swallowing the
   gesture, and nothing above would notice because the shell would simply
   report itself at the root. */
{
  const SELF_RENDERING = ['aat1-ui.js', 'aat3-ui.js', 'guitar-ui.js'];
  const missing = SELF_RENDERING.filter(f => {
    const src = fs.readFileSync(path.join(ROOT, f), 'utf8');
    return !(/atRoot:\s*atRoot/.test(src) && /back:\s*back/.test(src));
  });
  ok(missing.length === 0,
    missing.length
      ? `${missing.join(', ')}: renders its own screens but exposes no atRoot()/back(), so the ` +
        'back button would leave the app from inside it'
      : `all ${SELF_RENDERING.length} self-rendering subjects answer the back button`);
  /* And every one of them syncs from its OWN repaint. They do not come back
     through app.js's render(), so a module that only relied on that would push
     a sentinel on the first paint and never again. */
  const unsynced = SELF_RENDERING.filter(f =>
    !/AATNav\.sync\(\)/.test(fs.readFileSync(path.join(ROOT, f), 'utf8')));
  ok(unsynced.length === 0,
    unsynced.length
      ? `${unsynced.join(', ')}: never calls AATNav.sync(), so the sentinel goes stale as soon ` +
        'as the module repaints itself'
      : 'and each syncs from its own repaint, not just app.js’s');
}

/* nav-history.js must actually be loaded and cached, or none of the above runs
   in the app at all. */
{
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  ok(/<script src="nav-history\.js">/.test(html), 'index.html loads nav-history.js');
  const sw = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');
  ok(/'\.\/nav-history\.js'/.test(sw), 'and the service worker precaches it, so it works offline');
}

/* ── 3. In Chromium, where popstate is real ───────────────────────────────── */

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.webmanifest': 'application/manifest+json',
  '.png': 'image/png', '.svg': 'image/svg+xml' };
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

let chromium = null;
try { ({ chromium } = require('playwright')); } catch (e) { /* handled below */ }

function finish() {
  console.log();
  if (failures) { console.log(`${RED}${BOLD}✗ ${failures} of ${checks} checks failed${RESET}`); process.exit(1); }
  console.log(`${GREEN}${BOLD}✓ ${checks} checks passed${RESET}`);
}

/* Walking each subject from its home screen down to a question. Written out
   per subject because the route differs, and a route that silently fails to go
   anywhere would make every assertion below hold trivially — which is why the
   depth is asserted before the walk back. */
const ROUTES = [
  { id: 'aat',  name: 'Level 2', steps: ['#startBtn', '[data-tab="home"]', '#endlessBtn'] },
  { id: 'aat1', name: 'Level 1', steps: ['[data-a1="practice"]', '[data-a1="startpractice"]'] },
  { id: 'aat3', name: 'Level 3', steps: ['[data-a3="openunit"]', '[data-a3="practice"]', '[data-a3="startpractice"]'] },
];

(async () => {
  if (!chromium) {
    if (process.env.REQUIRE_PLAYWRIGHT) {
      console.log(`\n  ${RED}✗${RESET}  Playwright is required here and is not installed.`);
      process.exit(1);
    }
    console.log(`\n  ${YEL}⚠${RESET}  Playwright is not installed — skipping the browser checks.`);
    finish();
    return;
  }
  console.log(`${DIM}in the browser${RESET}`);
  const { server, port } = await serve();
  const base = `http://127.0.0.1:${port}/`;
  const CANDIDATES = [
    '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell',
    '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  ].filter(p => fs.existsSync(p));
  const browser = await chromium.launch(CANDIDATES.length ? { executablePath: CANDIDATES[0] } : {});
  try {
    for (const route of ROUTES) {
      const ctx = await browser.newContext({ viewport: { width: 390, height: 780 } });
      const page = await ctx.newPage();
      const errs = [];
      page.on('pageerror', e => errs.push(e.message));
      await page.addInitScript(id => localStorage.setItem('multisubject_active', id), route.id);
      await page.goto(base, { waitUntil: 'load' });
      await page.waitForFunction(() => {
        const a = document.getElementById('app');
        return a && a.textContent.trim().length > 40;
      }, { timeout: 15000 }).catch(() => {});

      const snap = () => page.evaluate(() => ({
        len: (document.getElementById('app') || { innerHTML: '' }).innerHTML.length,
        nav: (window.AATNav && window.AATNav._state()) || null,
      }));

      const home = await snap();
      ok(home.nav && home.nav.armed === true, `${route.name}: the back button is armed on load`);
      ok(home.nav && home.nav.pushed === false,
        `${route.name}: and nothing is pushed while the app is at its top screen`);

      for (const sel of route.steps) {
        const b = page.locator(sel + ':not([disabled])').first();
        if (await b.count() && await b.isVisible().catch(() => false)) {
          await b.click({ timeout: 2500 }).catch(() => {});
          await page.waitForTimeout(150);
        }
      }
      const deep = await snap();
      /* THE WALK MUST HAVE GONE SOMEWHERE. Every assertion below holds
         trivially against a route that never left the home screen, which is
         how the first version of this reported Level 3 as passing while
         testing nothing — its unit picker meant the route never opened a
         unit at all. */
      ok(deep.len !== home.len, `${route.name}: the walk reached a different screen`);
      ok(deep.nav && deep.nav.pushed === true,
        `${route.name}: and being deeper than the root pushes a sentinel`);

      /* Back must step IN the app: the screen changes and the page is still
         rendered. Leaving shows as an empty #app, which is the black screen. */
      let left = false, steps = 0, prev = deep.len;
      for (let i = 0; i < 6; i++) {
        await page.goBack().catch(() => {});
        await page.waitForTimeout(350);
        const s = await snap();
        if (s.nav === null || s.len === 0) { left = true; break; }
        ok(s.len !== prev, `${route.name}: back press ${i + 1} moved to another screen`);
        prev = s.len;
        steps++;
        if (s.nav.pushed === false) break;   // at the root; one more press leaves
      }
      ok(!left, `${route.name}: back never dropped the reader out of a rendered app`);
      ok(steps >= 1, `${route.name}: back stepped through ${steps} screen(s) before reaching the root`);

      /* ERRORS ARE COUNTED WHILE THE APP IS STILL THERE. The last press below
         deliberately leaves, and in this harness that lands on `about:blank`,
         whose opaque origin makes progress-sync's pagehide flush throw when it
         reads localStorage. That throw predates this file — it is in the very
         first recording of the bug — and it happens in a document no reader
         ever sees. Counting it would fail this gate for doing the thing it is
         asserting. */
      const errsInApp = errs.length;

      /* AND THEN IT MUST LEAVE. A back button that can never exit is its own
         trap — the reader would be unable to close the app. */
      await page.goBack().catch(() => {});
      await page.waitForTimeout(350);
      const out = await snap();
      ok(out.nav === null || out.len === 0,
        `${route.name}: one more press at the root leaves the app, as it should`);

      ok(errsInApp === 0,
        `${route.name}: no uncaught error while navigating in the app${errsInApp ? ': ' + errs[0] : ''}`);
      await ctx.close();
    }
  } finally {
    await browser.close();
    server.close();
  }
  finish();
})().catch(e => { console.error(e); process.exit(1); });
