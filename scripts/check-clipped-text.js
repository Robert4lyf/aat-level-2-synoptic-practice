#!/usr/bin/env node
/**
 * Text the reader cannot see, because something quietly cut it off.
 *
 * WHY THIS IS ITS OWN CHECK. The layout gate asks whether anything overflows
 * the PAGE — whether the screen scrolls sideways. That is a different question,
 * and it misses the more common failure entirely: an element with
 * `overflow: hidden` whose content is wider than it is. Nothing scrolls,
 * nothing overlaps, the page measures correctly, and a chip, a figure or half a
 * table row is simply gone. There is no scrollbar to hint at it and no way to
 * reach it. It is invisible to every other check in this suite and, because it
 * looks like a slightly odd layout rather than an error, it survives a casual
 * look at the screen too.
 *
 * It found two real ones the day it was written: a cheat sheet's worked figures
 * losing 34px of every row inside a card 240px wide, and the journey rail
 * cutting 43px off each lesson's XP chip on four subjects at once.
 *
 * WHAT IS NOT A FAULT, and why each exemption is safe:
 *   - `overflow-x: auto` or `scroll` — the content is reachable by scrolling,
 *     which is a decision, not an accident. Wide datasets rely on it.
 *   - `text-overflow: ellipsis` and `-webkit-line-clamp` — truncation the author
 *     asked for, and which SAYS it is truncation.
 *   - a `mask-image` — the fade that turns a hard slice into a visible "there is
 *     more this way". Used by the tab strip and the journey meta row.
 *
 * Everything else that hides text is a bug until someone makes it one of those.
 *
 * Run: node scripts/check-clipped-text.js
 */

'use strict';

const path = require('path');
const http = require('http');
const fs = require('fs');
const ROOT = path.join(__dirname, '..');

const RED = '\x1b[31m', GREEN = '\x1b[32m', DIM = '\x1b[2m', BOLD = '\x1b[1m', YEL = '\x1b[33m', RESET = '\x1b[0m';

let chromium;
try { ({ chromium } = require('playwright')); }
catch (e) {
  console.log(`${BOLD}Clipped text${RESET}\n`);
  if (process.env.REQUIRE_PLAYWRIGHT) {
    console.log(`  ${RED}✗${RESET}  Playwright is required here and is not installed: ${e.message}\n`);
    process.exit(1);
  }
  console.log(`  ${YEL}⚠${RESET}  Playwright is not installed — skipping.\n`);
  process.exit(0);
}

const SUBJECTS = ['aat1', 'aat', 'aat3', 'french', 'lsf', 'code-route', 'guitar'];
const WIDTHS = [320, 390];

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.webmanifest': 'application/manifest+json',
  '.png': 'image/png', '.svg': 'image/svg+xml' };

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

/* Runs in the page. Returns every element that clips text with no way to reach
   it and no sign that it has. */
const PROBE = () => {
  const out = [];
  document.querySelectorAll('*').forEach(el => {
    const cs = getComputedStyle(el);
    const ox = cs.overflowX;
    if (ox !== 'hidden' && ox !== 'clip') return;        // scrollable: reachable
    if (el.scrollWidth <= el.clientWidth + 2) return;    // nothing lost
    if (!el.clientWidth) return;
    const r = el.getBoundingClientRect();
    if (r.width < 40 || r.height < 8) return;            // decorative slivers, rails, bars
    if (cs.textOverflow === 'ellipsis') return;          // deliberate, and says so
    if (cs.webkitLineClamp && cs.webkitLineClamp !== 'none') return;
    const masked = (cs.maskImage && cs.maskImage !== 'none') ||
                   (cs.webkitMaskImage && cs.webkitMaskImage !== 'none');
    if (masked) return;                                  // faded, so the cut is visible
    const txt = (el.textContent || '').replace(/\s+/g, ' ').trim();
    if (!txt) return;                                    // no text to lose
    out.push({
      cls: String(el.className || '').slice(0, 50),
      tag: el.tagName.toLowerCase(),
      lost: Math.round(el.scrollWidth - el.clientWidth),
      text: txt.slice(0, 46),
    });
  });
  return out.slice(0, 15);
};

(async () => {
  const { server, port } = await serve();
  const CANDIDATES = [
    '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell',
    '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  ].filter(p => fs.existsSync(p));
  const browser = await chromium.launch(CANDIDATES.length ? { executablePath: CANDIDATES[0] } : {});

  const problems = [];
  let screens = 0;

  console.log(`${BOLD}Clipped text${RESET}\n`);

  try {
    for (const subj of SUBJECTS) {
      for (const width of WIDTHS) {
        const ctx = await browser.newContext({ viewport: { width, height: 900 } });
        const page = await ctx.newPage();
        await page.addInitScript(id => localStorage.setItem('multisubject_active', id), subj);
        await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'load' });
        await page.waitForFunction(() => {
          const a = document.getElementById('app');
          return a && a.textContent.trim().length > 40;
        }, { timeout: 15000 }).catch(() => {});
        const start = await page.$('#startBtn');
        if (start) { await start.click(); await page.waitForTimeout(250); }

        /* Every tab this subject offers — a self-rendering subject has none,
           and its one screen is swept as it stands. */
        let tabs = [];
        try { tabs = await page.evaluate(() => [...document.querySelectorAll('.nav-tab')].map(n => n.dataset.tab)); }
        catch (e) { tabs = []; }
        const stops = (tabs && tabs.length) ? tabs : [null];

        for (const tab of stops) {
          if (tab) {
            await page.evaluate(id => { const n = document.querySelector(`[data-tab="${id}"]`); if (n) n.click(); }, tab);
            await page.waitForTimeout(320);
          }
          screens++;
          let hits = [];
          try { hits = await page.evaluate(PROBE); } catch (e) { /* screen gone mid-probe */ }
          (hits || []).forEach(h => problems.push(
            `${subj} @${width}px ${tab || 'main'}: <${h.tag} class="${h.cls}"> hides ${h.lost}px — "${h.text}"`));

          /* A TAB IS NOT A SCREEN, and the cheat sheets prove it: the first
             version of this check swept every tab of every subject and missed
             a sheet losing 34px of every row, because a sheet is not a tab —
             it is a page you reach from one. They are the densest thing in the
             app (four-column tables and two-column figures on a card 240px
             wide), so each is opened and swept. Anything else reached the same
             way — a lesson, a question — is not yet covered, and this is the
             hook to extend when it needs to be. */
          if (tab === 'learn') {
            let ids = [];
            try { ids = await page.evaluate(() => (window.AAT2_SHEETS || []).map(x => x.id)); } catch (e) {}
            for (const id of ids) {
              const chip = await page.$(`[data-lesson="${id}"]`);
              if (!chip) continue;
              await chip.click();
              await page.waitForTimeout(90);
              screens++;
              let sh = [];
              try { sh = await page.evaluate(PROBE); } catch (e) {}
              (sh || []).forEach(h => problems.push(
                `${subj} @${width}px sheet ${id}: <${h.tag} class="${h.cls}"> hides ${h.lost}px — "${h.text}"`));
              const done = await page.$('#lessonContinueBtn');
              if (done) { await done.click(); await page.waitForTimeout(80); }
            }
          }
        }
        await ctx.close();
      }
    }
  } finally {
    await browser.close();
    server.close();
  }

  const unique = [...new Set(problems)];
  if (unique.length) {
    unique.slice(0, 25).forEach(p => console.log(`  ${RED}✗${RESET} ${p}`));
    if (unique.length > 25) console.log(`  ${DIM}…and ${unique.length - 25} more${RESET}`);
    console.log();
    console.log(`${RED}${BOLD}── ${unique.length} place${unique.length === 1 ? '' : 's'} where text is cut off with no way to reach it${RESET}`);
    process.exit(1);
  }

  console.log(`  ${DIM}${screens} screens across ${SUBJECTS.length} subjects at ${WIDTHS.join('px and ')}px.${RESET}`);
  console.log();
  console.log(`${GREEN}${BOLD}── Nothing is hidden where it cannot be reached ✓${RESET}`);
})().catch(e => { console.error(e); process.exit(1); });
