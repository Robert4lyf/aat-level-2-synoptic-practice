#!/usr/bin/env node
/**
 * No bar hides behind another bar.
 *
 * THE BUGS THIS GUARDS. Every surface here puts a sticky bar of its own beneath
 * a sticky app header, and before this check every one of them was in the wrong
 * place, because every one of them had a number typed into it:
 *
 *   Levels 1 and 3 stuck their context bar and their lesson bar at `top: 0`.
 *   The header is also sticky and paints at z-index 50, so `top: 0` did not put
 *   those bars below the header — it put them behind it. Scrolled into a unit,
 *   elementFromPoint at the centre of the context bar's back button returned
 *   the header: the way out could not be pressed, at any width. The 3px
 *   progress rule under the lesson bar was pinned 5px too high and spent every
 *   scrolled moment entirely behind the bar it was meant to sit under.
 *
 *   CIPS pinned its tab strip at 68px, and at 62px under 760px, against a bar
 *   whose min-height was 68 but whose measured height is 70.6 — so nine pixels
 *   of the tab strip lived behind the bar on every phone.
 *
 * WHY A NUMBER CANNOT BE RIGHT. The app header measures 72.8px at 320px wide,
 * 46px at 390px and 50px above that: it wraps, and it is three heights. So the
 * fix is chrome-offset.js, which measures it into --chrome-h, and the fix is
 * only as good as the guarantee that every bar uses it. That guarantee is here.
 *
 * WHAT IS ASSERTED, at four widths, on three surfaces:
 *
 *   §1 --chrome-h is published, and equals the chrome's measured height
 *   §2 the chrome itself is pinned to the top, because everything below is
 *      measured from its bottom edge and a chrome that scrolls away makes
 *      every other assertion here vacuously true
 *   §3 every sticky bar below the chrome starts at or after the chrome ends
 *   §4 no sticky bar overlaps the sticky bar above it — the rule §3 alone does
 *      not make. The lesson bar's 3px progress rule was pinned five pixels too
 *      high: correctly below the chrome, and entirely behind the bar it
 *      belongs under. Measuring only against the chrome called that fine.
 *   §5 every control inside a sticky bar is hit-testable where it is drawn
 *   §6 nothing overflows horizontally as a result
 *
 * §4 and §5 are the ones that matter, and both were added after the first
 * version of this file passed against defects it was written to catch. A bar
 * can be at the right coordinate relative to the chrome and still be covered,
 * either by another bar or by paint order, and "looks fine in a screenshot" is
 * not a check.
 */
'use strict';
const path = require('path'), http = require('http'), fs = require('fs');
const ROOT = path.join(__dirname, '..');
const RED = '\x1b[31m', GREEN = '\x1b[32m', DIM = '\x1b[2m', BOLD = '\x1b[1m', YEL = '\x1b[33m', RESET = '\x1b[0m';

let chromium;
try { ({ chromium } = require('playwright')); } catch (e) {
  console.log(`${BOLD}Sticky chrome${RESET}\n`);
  if (process.env.REQUIRE_PLAYWRIGHT) { console.log(`  ${RED}✗${RESET} Playwright required: ${e.message}`); process.exit(1); }
  console.log(`  ${YEL}⚠${RESET} Playwright unavailable — skipping.\n`); process.exit(0);
}

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.webmanifest': 'application/manifest+json', '.png': 'image/png', '.svg': 'image/svg+xml' };
function serve() {
  return new Promise(resolve => {
    const server = http.createServer((req, res) => {
      const u = decodeURIComponent(req.url.split('?')[0]);
      const file = path.join(ROOT, u === '/' ? 'index.html' : u);
      if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); res.end('not found'); return; }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
      fs.createReadStream(file).pipe(res);
    });
    server.listen(0, '127.0.0.1', () => resolve({ server, port: server.address().port }));
  });
}

const WIDTHS = [320, 390, 768, 1280];

/* Ask the page, at its current scroll position, where the chrome ends and where
   every sticky bar begins — and whether each bar's own controls can be reached.

   `elementFromPoint` is the whole point of this function. A bar can report a
   perfectly correct top coordinate and still be unreachable, because whether a
   press lands on it is decided by paint order and not by geometry. */
const INSPECT = `(sel) => {
  const r2 = n => Math.round(n * 100) / 100;
  const chrome = document.querySelector('[data-app-chrome]');
  if (!chrome) return { error: 'no [data-app-chrome] on this page' };
  const cr = chrome.getBoundingClientRect();
  const bars = [];
  sel.forEach(s => {
    document.querySelectorAll(s).forEach(el => {
      if (getComputedStyle(el).position !== 'sticky') return;
      const r = el.getBoundingClientRect();
      /* Only bars the reader can currently see. One that has scrolled past the
         bottom of the window is not covered by anything. */
      if (r.bottom <= 0 || r.top >= window.innerHeight) return;
      const controls = [];
      el.querySelectorAll('button, a[href], [role="button"]').forEach(c => {
        const q = c.getBoundingClientRect();
        if (q.width < 2 || q.height < 2) return;
        const at = document.elementFromPoint(q.left + q.width / 2, q.top + q.height / 2);
        controls.push({
          name: (c.getAttribute('aria-label') || c.textContent || '').trim().slice(0, 40),
          reachable: !!(at && (at === c || (at.closest && at.closest(s) === el && c.contains(at))) )
        });
      });
      bars.push({
        sel: s, top: r2(r.top), bottom: r2(r.bottom), height: Math.round(r.height),
        /* A bar inside the chrome is not measured against the chrome's bottom
           edge — it is part of it. It is still measured against its neighbours,
           which is where CIPS's tab strip went wrong. */
        inChrome: chrome.contains(el),
        controls: controls
      });
    });
  });
  bars.sort((a, b) => a.top - b.top);
  return {
    chromeTop: r2(cr.top),
    chromeBottom: r2(cr.bottom),
    chromePosition: getComputedStyle(chrome).position,
    chromeVar: getComputedStyle(document.documentElement).getPropertyValue('--chrome-h').trim(),
    chromeHeight: r2(cr.height),
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    scrollY: Math.round(window.scrollY),
    bars: bars
  };
}`;

let checks = 0;
const errors = [];
function ok(cond, msg) { checks++; if (!cond) errors.push(msg); }

/* One surface, scrolled far enough that its sticky bars have engaged, inspected
   against every rule above. */
async function audit(page, where, sel) {
  await page.evaluate(() => window.scrollTo(0, Math.min(900, document.documentElement.scrollHeight)));
  await page.waitForTimeout(140);
  const seen = await page.evaluate(new Function('return ' + INSPECT)(), sel);
  if (seen.error) { errors.push(`${where}: ${seen.error}`); checks++; return seen; }

  ok(/^\d+px$/.test(seen.chromeVar), `${where}: --chrome-h is ${JSON.stringify(seen.chromeVar)}, not a pixel length — chrome-offset.js did not run.`);
  /* Rounded UP by the module, so it may exceed the true height by under a pixel
     and must never fall short of it. */
  const declared = parseFloat(seen.chromeVar);
  ok(declared >= seen.chromeHeight - 0.01 && declared < seen.chromeHeight + 1,
    `${where}: --chrome-h is ${seen.chromeVar} but the chrome measures ${seen.chromeHeight}px.`);

  ok(seen.overflow <= 1, `${where}: page overflows horizontally by ${seen.overflow}px.`);

  /* §2. Everything below is measured from the chrome's bottom edge, so a chrome
     that has scrolled away turns every one of those assertions into a
     tautology — the page is scrolled, so its bottom is above the viewport and
     nothing can be "behind" it. This is the assertion that makes the rest mean
     something, and without it, splitting CIPS's chrome group back into two
     mis-stacked stickies passed cleanly. */
  ok(seen.chromePosition === 'sticky' || seen.chromePosition === 'fixed',
    `${where}: the element marked data-app-chrome has position: ${seen.chromePosition} — it scrolls away, and nothing beneath it can be positioned against it.`);
  ok(seen.scrollY < 2 || seen.chromeTop <= 0.5,
    `${where}: the chrome is at ${seen.chromeTop}px with the page scrolled to ${seen.scrollY}px — it is not pinned to the top.`);

  ok(seen.bars.length > 0, `${where}: no sticky bar found — the selectors this check watches have been renamed, and it is now watching nothing.`);

  /* §4. Bar against the bar above it, in the order they appear on screen. */
  let previous = null;
  seen.bars.forEach(b => {
    /* §3. A quarter-pixel of slack for subpixel layout; anything more is a bar
       sitting behind the chrome. */
    if (!b.inChrome) {
      ok(b.top >= seen.chromeBottom - 0.25,
        `${where}: ${b.sel} sticks at ${b.top}px, which is ${Math.round((seen.chromeBottom - b.top) * 100) / 100}px behind the chrome (ends at ${seen.chromeBottom}px).`);
    }
    if (previous && previous.sel !== b.sel) {
      ok(b.top >= previous.bottom - 0.25,
        `${where}: ${b.sel} sticks at ${b.top}px, ${Math.round((previous.bottom - b.top) * 100) / 100}px behind ${previous.sel}, which ends at ${previous.bottom}px.`);
    }
    previous = b;
    /* §5. */
    b.controls.forEach(c => {
      ok(c.reachable, `${where}: the "${c.name}" control in ${b.sel} is drawn where something else receives the press.`);
    });
  });
  return seen;
}

(async () => {
  const { server, port } = await serve();
  const base = `http://127.0.0.1:${port}/`;
  const candidates = ['/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell',
    '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', '/opt/pw-browsers/chromium'].filter(fs.existsSync);
  const browser = await chromium.launch(candidates.length ? { executablePath: candidates[0] } : {});
  const notes = [];

  try {
    for (const width of WIDTHS) {
      /* ── Level 3: the units picker, a unit path, and a lesson ───────────── */
      {
        const ctx = await browser.newContext({ viewport: { width, height: 844 } });
        const page = await ctx.newPage();
        await page.addInitScript(() => localStorage.setItem('multisubject_active', 'aat3'));
        await page.goto(base, { waitUntil: 'load' });
        await page.waitForTimeout(600);
        await page.click('[data-a3="openunit"]');
        await page.waitForTimeout(320);
        await audit(page, `L3 path @${width}`, ['.a3-ctx']);
        await page.evaluate(() => window.scrollTo(0, 0));
        const lesson = await page.$('[data-a3="open"]');
        if (lesson) {
          await lesson.click(); await page.waitForTimeout(320);
          await audit(page, `L3 lesson @${width}`, ['.a3-lessonbar', '.a3-lessonbar-p']);
        } else { errors.push(`L3 lesson @${width}: no lesson to open.`); checks++; }
        await ctx.close();
      }

      /* ── Level 1: its path is its root, so the lesson is where a bar stacks ─ */
      {
        const ctx = await browser.newContext({ viewport: { width, height: 844 } });
        const page = await ctx.newPage();
        await page.addInitScript(() => localStorage.setItem('multisubject_active', 'aat1'));
        await page.goto(base, { waitUntil: 'load' });
        await page.waitForTimeout(600);
        await audit(page, `L1 path @${width}`, ['.a1-ctx']);
        await page.evaluate(() => window.scrollTo(0, 0));
        const lesson = await page.$('[data-a1="open"]');
        if (lesson) {
          await lesson.click(); await page.waitForTimeout(320);
          await audit(page, `L1 lesson @${width}`, ['.a1-lessonbar', '.a1-lessonbar-p']);
        } else { errors.push(`L1 lesson @${width}: no lesson to open.`); checks++; }
        await ctx.close();
      }

      /* ── CIPS: its own page, its own chrome group, the same rules ────────── */
      {
        const ctx = await browser.newContext({ viewport: { width, height: 844 } });
        const page = await ctx.newPage();
        await page.goto(base + 'cips2.html', { waitUntil: 'load' });
        await page.waitForTimeout(350);
        await page.click('[data-c2nav="module"]');
        await page.waitForTimeout(220);
        await page.click('[data-go="lesson"]');
        await page.waitForTimeout(280);
        const seen = await audit(page, `CIPS lesson @${width}`, ['.c2-top', '.c2-tabs', '.c2-ctx']);
        /* The title is the reason the bar exists, and the old bar hid its own
           title below 760px — which is every phone this app is used on. */
        const title = (await page.textContent('.c2-ctx-t') || '').trim();
        ok(title.length > 3, `CIPS lesson @${width}: the context bar shows no lesson title.`);
        const shown = await page.evaluate(() => {
          const t = document.querySelector('.c2-ctx-t');
          return !!t && getComputedStyle(t).display !== 'none' && t.getBoundingClientRect().height > 0;
        });
        ok(shown, `CIPS lesson @${width}: the context bar's title is present in the markup but not displayed.`);
        if (seen && seen.bars.length) {
          /* OPAQUE, tested by its symptom rather than by parsing a colour.

             The first version of this read backgroundColor and looked for an
             alpha channel in `rgba(...)`. A `color-mix` does not compute to
             that, so the regex found nothing — and finding nothing was treated
             as opaque. It passed against a bar that was 88% transparent, which
             is the exact defect it was written for.

             The second version painted a black overlay behind the bar and
             compared pixels. That tests a z-index race, not translucency.

             This one asks the question the reader asks: does the bar change
             when the prose behind it moves? Scroll a little, photograph the
             same bar, require the two photographs to be identical. Nothing in
             the bar's own content depends on scroll position, so any
             difference is the page showing through it. */
          const shoot = async () => {
            const clip = await page.evaluate(() => {
              const r = document.querySelector('.c2-ctx').getBoundingClientRect();
              return { x: Math.round(r.left), y: Math.round(r.top) + 1,
                       width: Math.round(r.width), height: Math.max(1, Math.round(r.height) - 2) };
            });
            return (await page.screenshot({ clip: clip })).toString('base64');
          };
          const a = await shoot();
          await page.evaluate(() => window.scrollBy(0, 60));
          await page.waitForTimeout(120);
          const b = await shoot();
          ok(a === b,
            `CIPS lesson @${width}: the context bar's pixels change when the page scrolls behind it — it is not opaque, so prose passing under it shows through.`);
        }
        await ctx.close();
      }
    }
    notes.push(`Chrome height is measured, not typed: the header is 72.8px at 320px, 46px at 390px and 50px above that.`);
    notes.push(`Every sticky bar on Levels 1 and 3 and CIPS sits below the chrome at ${WIDTHS.join('/')}px, with its controls reachable where they are drawn.`);
  } finally {
    await browser.close(); server.close();
  }

  console.log(`${BOLD}Sticky chrome${RESET}\n`);
  notes.forEach(n => console.log(`  ${DIM}${n}${RESET}`));
  console.log('');
  if (errors.length) {
    console.log(`${RED}${BOLD}${errors.length} of ${checks} checks failed${RESET}`);
    errors.forEach(e => console.log(`  ${RED}✗${RESET} ${e}`));
    console.log('');
    process.exit(1);
  }
  console.log(`${GREEN}${BOLD}${checks} checks pass — no bar hides behind another ✓${RESET}\n`);
  process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });
