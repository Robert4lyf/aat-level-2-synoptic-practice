#!/usr/bin/env node
/**
 * The shared header, against the subjects that render themselves.
 *
 * Three subjects — Levels 1 and 3 and the guitar — own their screens entirely:
 * app.js delegates to their module and takes no further part. That is what
 * keeps a redesign of one from touching the other six, and it leaves a seam.
 * Everything OUTSIDE #app is still app.js's: the header, its Home button, and
 * the subject switcher. app.js drives those by setting its own `State`, and a
 * subject that renders itself does not read `State`.
 *
 * Two defects lived in that seam, and neither was visible to any other check
 * here — they all read data, or drive one module's player through a stand-in
 * element with no header attached:
 *
 *   the header's Home button did nothing at all on those three subjects. It
 *   sets State.screen = 'home', which is the only screen app.js believes them
 *   ever to be on, so render() remounted the module unchanged. Four cards into
 *   a Level 3 lesson, tapping Home left you on card four;
 *
 *   switching subject did not stop what the subject being left had running. A
 *   guitar exercise went on sounding into the French screen, and a Level 3
 *   mock's clock went on ticking towards a finish() that would have painted a
 *   Level 3 result over whatever subject was on screen at the time.
 *
 * WHAT IT ASSERTS
 *   every subject responds to the header's Home button, from a screen that is
 *   not already home;
 *   switching subject silences the guitar;
 *   a Level 3 mock left behind by a subject switch neither paints nor finishes
 *   over the subject that replaced it — checked by winding the clock past the
 *   whole ninety minutes;
 *   and coming back to it resumes the paper rather than stranding it.
 *
 * Run: node scripts/check-subject-chrome.js
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
  console.log(`${BOLD}Shared chrome vs. self-rendering subjects${RESET}\n`);
  if (process.env.REQUIRE_PLAYWRIGHT) {
    console.log(`  ${RED}✗${RESET}  Playwright is required here and is not installed: ${e.message}\n`);
    process.exit(1);
  }
  console.log(`  ${YEL}⚠${RESET}  Playwright is not installed — skipping.\n`);
  process.exit(0);
}

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.webmanifest': 'application/manifest+json',
  '.png': 'image/png', '.svg': 'image/svg+xml',
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

/* One step in from each subject's landing screen, and what that step is called.
   `aat` is the control: it does not render itself, its Home button has always
   worked, and if this check ever stops being able to move it off home the
   fault is in the check rather than in the subject. */
const JOURNEYS = [
  { id: 'aat1',   into: '[data-a1="open"]',     what: 'a lesson', homeIsLanding: true },
  { id: 'aat3',   into: '[data-a3="openunit"]', what: 'a unit, then a lesson',
    then: '[data-a3="open"]', homeIsLanding: true },
  { id: 'guitar', into: '[data-lesson]',        what: 'a lesson', homeIsLanding: true },
  /* Level 2 is the control: it does not render itself and its Home button has
     always worked, so a failure here is a fault in this check rather than in
     the subject.

     Two things about it are particular. It opens on a splash the first time,
     so `seenSplash` puts this straight onto the screen a returning reader
     sees; and it LANDS on its Learn tab while Home goes to its Home tab, so
     unlike the three self-rendering subjects, home is not where it started —
     which is why `homeIsLanding` is a per-subject fact rather than an
     assumption. The tab opened here is therefore any tab but those two. */
  { id: 'aat',    into: '[data-tab="glossary"]', what: 'the Glossary tab', homeIsLanding: false,
    seed: { key: 'aatPrep_v2', value: { settings: { seenSplash: true } } } },
];

const errors = [];
const notes = [];

/* The head of #app, squashed — enough to tell one screen from another without
   depending on any particular wording.

   LONG ENOUGH TO CLEAR THE FURNITURE. Seventy characters was tried first and
   was not: Level 2 renders its tab strip at the top of #app, so every tab's
   screen opened with the same sixty characters of tab labels and the check
   reported that clicking a tab had changed nothing. */
async function screenOf(page) {
  return ((await page.textContent('#app')) || '').replace(/\s+/g, ' ').trim().slice(0, 220);
}

(async () => {
  const { server, port } = await serve();
  const CANDIDATES = [
    '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell',
    '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    '/opt/pw-browsers/chromium',
  ].filter(p => fs.existsSync(p));
  const browser = await chromium.launch(CANDIDATES.length ? { executablePath: CANDIDATES[0] } : {});

  async function open(subject, withClock, seed) {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await ctx.newPage();
    if (withClock) await page.clock.install();
    await page.addInitScript(([id, sd]) => {
      localStorage.setItem('multisubject_active', id);
      if (sd) localStorage.setItem(sd.key, JSON.stringify(sd.value));
    }, [subject, seed || null]);
    await page.goto(`http://127.0.0.1:${port}/index.html`, { waitUntil: 'load' });
    await page.waitForTimeout(700);
    return { ctx, page };
  }

  try {
    /* ── 1. Home means home, on every subject ────────────────────────────── */
    for (const j of JOURNEYS) {
      const { ctx, page } = await open(j.id, false, j.seed);
      const top = await screenOf(page);
      const first = await page.$(j.into);
      if (!first) {
        errors.push(`${j.id}: could not find ${j.what} to open — the check cannot reach a screen that is not home.`);
        await ctx.close();
        continue;
      }
      await first.click();
      await page.waitForTimeout(500);
      if (j.then) { const nxt = await page.$(j.then); if (nxt) { await nxt.click(); await page.waitForTimeout(500); } }
      const inside = await screenOf(page);
      if (inside === top) {
        errors.push(`${j.id}: opening ${j.what} did not change the screen, so the Home assertion below would pass for the wrong reason.`);
        await ctx.close();
        continue;
      }
      await page.click('#homeNavBtn');
      await page.waitForTimeout(500);
      const after = await screenOf(page);
      if (after === inside) {
        errors.push(`${j.id}: the header's Home button did nothing from inside ${j.what} — the screen is still "${inside}".`);
      } else if (j.homeIsLanding && after !== top) {
        errors.push(`${j.id}: Home left the reader on "${after}" rather than back at "${top}".`);
      }
      await ctx.close();
    }
    notes.push('Home moves every subject off a screen one level in, and returns the three that ' +
                 'render themselves to their landing screen.');

    /* ── 2. Switching subject silences the guitar ────────────────────────── */
    {
      const { ctx, page } = await open('guitar');
      const lesson = await page.$('[data-lesson]');
      if (!lesson) errors.push('guitar: no lesson to open, so playback could not be started.');
      else {
        await lesson.click(); await page.waitForTimeout(600);
        const play = await page.$('#gtrPlay');
        if (!play) errors.push('guitar: no Play control on the lesson screen.');
        else {
          await play.click();
          await page.waitForTimeout(900);
          const playing = await page.evaluate(() => {
            const t = window.GUITAR_UI && window.GUITAR_UI.transport();
            return !!(t && t.playing);
          });
          if (!playing) {
            errors.push('guitar: pressing Play did not start the transport, so the silence assertion below is vacuous.');
          } else {
            await page.click('#subjectSwitcherBtn'); await page.waitForTimeout(300);
            await page.click('[data-switch-subject="french"]'); await page.waitForTimeout(2500);
            const still = await page.evaluate(() => {
              const t = window.GUITAR_UI && window.GUITAR_UI.transport();
              return !!(t && t.playing);
            });
            const nowOn = await page.evaluate(() => document.body.getAttribute('data-subject'));
            if (still) errors.push(`guitar: the exercise was still sounding after switching to "${nowOn}".`);
          }
        }
      }
      await ctx.close();
      notes.push('Switching away from the guitar stops the transport.');
    }

    /* ── 3. A Level 3 mock does not follow the reader to another subject ─── */
    {
      const { ctx, page } = await open('aat3', true);
      await page.click('[data-a3="openunit"][data-unit="tpfb"]'); await page.waitForTimeout(400);
      await page.click('[data-a3="practice"]'); await page.waitForTimeout(400);
      await page.click('[data-a3="startmock"]'); await page.waitForTimeout(500);
      const clockShown = await page.$('.a3-mockclock');
      if (!clockShown) {
        errors.push('aat3: the timed mock did not start, so nothing below is being tested.');
      } else {
        await page.click('#subjectSwitcherBtn'); await page.waitForTimeout(300);
        await page.click('[data-switch-subject="french"]'); await page.waitForTimeout(2000);
        const away = await screenOf(page);
        /* Past the whole paper, and then some. If the clock is still running it
           fires here, calls finish() and repaints Level 3 over the French
           screen — which is exactly the defect. */
        await page.clock.fastForward('01:35:00');
        await page.waitForTimeout(800);
        const stillAway = await screenOf(page);
        const subjectNow = await page.evaluate(() => document.body.getAttribute('data-subject'));
        if (stillAway !== away || subjectNow !== 'french') {
          errors.push(`aat3: the abandoned mock repainted over another subject — the screen went from ` +
                      `"${away}" to "${stillAway}" (data-subject "${subjectNow}") when its time ran out.`);
        }

        /* And coming back must not strand the reader on a paper whose clock
           has stopped: the time is gone, so the paper is over. */
        await page.click('#subjectSwitcherBtn'); await page.waitForTimeout(300);
        await page.click('[data-switch-subject="aat3"]'); await page.waitForTimeout(900);
        const back = ((await page.textContent('#app')) || '').replace(/\s+/g, ' ');
        if (/Question \d+ of \d+/.test(back)) {
          errors.push('aat3: returning to a mock whose ninety minutes had elapsed put the reader back ' +
                      'on a question rather than on the result.');
        }
      }
      await ctx.close();
      notes.push('A Level 3 mock left behind neither paints nor finishes over the subject that replaced it.');
    }
  } finally {
    await browser.close();
    server.close();
  }

  console.log(`${BOLD}Shared chrome vs. self-rendering subjects${RESET}\n`);
  notes.forEach(n => console.log(`  ${DIM}${n}${RESET}`));
  console.log('');
  if (errors.length) {
    console.log(`${RED}${BOLD}── ${errors.length} problem${errors.length === 1 ? '' : 's'} ──${RESET}`);
    errors.forEach(e => console.log(`  ${RED}✗${RESET}  ${e}`));
    console.log('');
    process.exit(1);
  }
  console.log(`${GREEN}${BOLD}── The header and the subjects agree ✓${RESET}\n`);
  process.exit(0);
})();
