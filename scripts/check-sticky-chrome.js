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
 * WHY A NUMBER CANNOT BE RIGHT. The app header used to measure 72.8px at 320px
 * wide, 46px at 390px and 50px above that: it wrapped, and it was three
 * heights. It no longer wraps — every course now wears the same one-row bar —
 * so today it is 46px narrow and 50px wide, and a typed number would be wrong
 * on one of them and right on the other by luck. The fix is still
 * chrome-offset.js measuring it into --chrome-h, and is still only as good as
 * the guarantee that every bar uses it. That guarantee is here.
 *
 * AND THE MEASURING ITSELF IS NOW PROVED SEPARATELY. While the header was
 * fractional, reading --chrome-h once was enough to catch both a constant and
 * a rounding error. On a whole-number header neither shows, so §1b makes the
 * chrome fractional and watches the variable follow it.
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

/* Four widths, because the header is a different height at three of them and
   the phone rules change at the fourth. STICKY_WIDTHS narrows that set, and
   exists for one caller: check-sticky-chrome-adversarial.js, which runs this
   file thirteen times over and only needs each mutant to be REJECTED, not
   rejected at every size. Every regression it applies is visible at 320px —
   where the header is tallest and the phone rules are in force — so it runs
   one width and takes four minutes instead of fifteen. A mutant that somehow
   only showed at 1280 would survive there and be reported as a survivor, which
   is the safe direction to be wrong in: a survivor is investigated. */
const WIDTHS = (process.env.STICKY_WIDTHS || '320,390,768,1280')
  .split(',').map(w => Number(w.trim())).filter(w => w > 0);
if (!WIDTHS.length) { console.error('STICKY_WIDTHS named no usable width.'); process.exit(1); }

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

/* ── §1b. --chrome-h is MEASURED, and rounded DOWN ──────────────────────────
   Both of these used to be proved by the header itself. It wrapped, so it was
   72.81px at 320px and 46px at 390px — a fractional height, and three different
   ones — and against that a published constant was obviously wrong and
   Math.ceil overshot by a pixel. check-sticky-chrome-adversarial.js has a
   mutant for each.

   THEN THE HEADER STOPPED WRAPPING. Making every course wear the same compact
   bar meant holding it to one row, so it is now a whole number of pixels at
   every width — and at 320px that number is 46, which is exactly the constant
   the mutant publishes. Both mutants became invisible in the same stroke:
   floor and ceil agree on an integer, and a constant that happens to be right
   is indistinguishable from a measurement. Two of sixteen regressions stopped
   being caught, and nothing failed to say so.

   So the arithmetic is exercised against a chrome the check makes fractional
   itself, which is the honest test of it: chrome-offset.js's contract is
   "measure whatever the chrome is", not "be correct about today's header".
   A constant fails the tracking assertion whatever value it holds, and ceil
   fails the flooring one because .4 of a pixel is put back. */
async function auditMeasurement(page, where) {
  const got = await page.evaluate(async () => {
    const el = document.querySelector('[data-app-chrome]');
    if (!el) return { error: 'no [data-app-chrome] to measure' };
    const read = () => getComputedStyle(document.documentElement)
      .getPropertyValue('--chrome-h').trim();
    const before = read();
    const wait = () => new Promise(r => setTimeout(r, 120));

    /* A fractional, and different, height. 8.4px of extra padding cannot land
       on a whole pixel from an integer start, so floor and ceil must disagree. */
    const had = el.style.paddingTop;
    el.style.paddingTop = (parseFloat(getComputedStyle(el).paddingTop) + 8.4) + 'px';
    window.dispatchEvent(new Event('resize'));
    await wait();
    const after = read();
    const trueH = el.getBoundingClientRect().height;

    el.style.paddingTop = had;
    window.dispatchEvent(new Event('resize'));
    await wait();
    const restored = read();
    return { before, after, restored, trueH: Math.round(trueH * 1000) / 1000 };
  });
  if (got.error) { errors.push(`${where}: ${got.error}`); checks++; return; }

  /* IT TRACKS. A constant is caught here and only here — no reading of a single
     value can tell a lucky constant from a measurement. */
  ok(got.after !== got.before,
    `${where}: the chrome grew by 8.4px and --chrome-h stayed at ${got.before} — it is not being measured.`);
  ok(got.restored === got.before,
    `${where}: --chrome-h did not return to ${got.before} when the chrome did (left at ${got.restored}).`);

  /* AND IT IS FLOORED. Published past the chrome's real bottom edge, every bar
     beneath sits a fraction of a pixel too low and the scrolling page shows
     through the seam — the reported bug this whole file exists for. */
  const published = parseFloat(got.after);
  ok(Number.isFinite(published) && published === Math.floor(got.trueH),
    `${where}: the chrome measures ${got.trueH}px and --chrome-h is ${got.after} — expected ${Math.floor(got.trueH)}px, rounded down.`);
  ok(!Number.isFinite(published) || published <= got.trueH,
    `${where}: --chrome-h (${got.after}) exceeds the chrome's real height (${got.trueH}px), so every bar beneath it sits below the edge it is meant to meet.`);
}

/* One surface, scrolled far enough that its sticky bars have engaged, inspected
   against every rule above. */
async function audit(page, where, sel) {
  await page.evaluate(() => window.scrollTo(0, Math.min(900, document.documentElement.scrollHeight)));
  await page.waitForTimeout(140);
  const seen = await page.evaluate(new Function('return ' + INSPECT)(), sel);
  if (seen.error) { errors.push(`${where}: ${seen.error}`); checks++; return seen; }

  ok(/^\d+px$/.test(seen.chromeVar), `${where}: --chrome-h is ${JSON.stringify(seen.chromeVar)}, not a pixel length — chrome-offset.js did not run.`);
  /* Rounded DOWN by the module, so it may fall short of the true height by
     under a pixel and must never exceed it. Overshooting is what pushed every
     bar below the chrome's real bottom edge and opened the seam this file now
     watches for; see the note in chrome-offset.js. */
  const declared = parseFloat(seen.chromeVar);
  ok(declared <= seen.chromeHeight + 0.01 && declared > seen.chromeHeight - 1,
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

  /* §3/§4. THE SEAM, against the chrome and against the bar above.

     This used to ask only that a bar was not BEHIND the thing above it, which
     let any size of gap through — and a gap is what shipped. A bar that meets
     the edge above it exactly is not good enough either: layout heights are
     fractional (the chrome was 72.81px back when it wrapped, and a lesson bar
     still is — see the 108.27px in this file's own output) and so is the device
     pixel grid, so an exact meeting at 2.75x lands on device pixel 126.5 and
     the two sides round apart, leaving one row of pixels through which the
     scrolling page shows. It was reported from a phone and is visible in the
     screenshot as a single line of clipped text.

     So the requirement is an OVERLAP, in a band. At least ~1px, because
     anything less is under a device pixel on a 2.75x or 3x screen and can
     still split. At most 4px, because everything above paints over the overlap
     and a large one would be silently eating the bar's own content. */
  const MIN_OVERLAP = 0.9, MAX_OVERLAP = 4;
  const seam = (name, edge, b) => {
    const overlap = Math.round((edge - b.top) * 1000) / 1000;
    ok(overlap >= MIN_OVERLAP && overlap <= MAX_OVERLAP,
      overlap < MIN_OVERLAP
        ? `${where}: ${b.sel} sticks at ${b.top}px and ${name} ends at ${edge}px — they ${overlap < 0 ? `leave a ${-overlap}px gap` : `meet with only ${overlap}px of overlap`}, so the scrolling page shows through the seam.`
        : `${where}: ${b.sel} sticks at ${b.top}px, overlapping ${name} by ${overlap}px — more than the ${MAX_OVERLAP}px the seam needs, so ${name} is covering the bar's own content.`);
  };
  let previous = null;
  seen.bars.forEach(b => {
    /* Against whatever is immediately above THIS bar — the chrome for the
       first one, the bar above for the rest. Checking every bar against the
       chrome would demand that a second-tier rule overlap something it is not
       meant to touch. */
    if (!b.inChrome) {
      if (previous && previous.sel !== b.sel) seam(previous.sel, previous.bottom, b);
      else seam('the chrome', seen.chromeBottom, b);
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
        await auditMeasurement(page, `L3 path @${width}`);
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
        const seen = await audit(page, `CIPS lesson @${width}`, ['.c2-ctx']);
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
          /* AND THE PAGE MUST ACTUALLY HAVE MOVED between the two photographs.
             The first version scrolled down by 60 from a position audit() had
             already clamped to the bottom of a 613px-scrollable lesson: the page
             did not move, the two photographs were identical, and identical was
             read as opaque. A probe that cannot tell "the same because nothing
             shows through" from "the same because nothing happened" is not a
             probe, so the movement is asserted too. */
          const posA = await page.evaluate(() => window.scrollY);
          const a = await shoot();
          await page.evaluate(() => window.scrollBy(0, -80));
          await page.waitForTimeout(120);
          const posB = await page.evaluate(() => window.scrollY);
          const b = await shoot();
          ok(Math.abs(posA - posB) > 20,
            `CIPS lesson @${width}: the opacity probe could not scroll the page (${posA}px then ${posB}px), so it compared two photographs of the same thing and proved nothing.`);
          ok(a === b,
            `CIPS lesson @${width}: the context bar's pixels change when the page scrolls behind it — it is not opaque, so prose passing under it shows through.`);
        }
        await ctx.close();
      }
    }
    notes.push(`Chrome height is measured, not typed: proved by moving the chrome and watching --chrome-h follow it, floored (§1b).`);
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
