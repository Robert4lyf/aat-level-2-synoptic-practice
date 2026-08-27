#!/usr/bin/env node
/**
 * Every subject still renders.
 *
 * The guitar module added a registry entry, changed how subject assets load,
 * added a --subj token pair and rewrote part of the service worker. All four
 * are shared surfaces: nothing in the rest of `npm test` would notice if one of
 * them broke Français or Level 1, because every other check reads data files
 * rather than running the app.
 *
 * The implementation plan called this sweep manual and not optional. It does
 * not have to be manual — Chromium is available, the site is static, and
 * "does this subject render" is a question a browser can answer in a second.
 * So it runs here, over all seven subjects, on every commit.
 *
 * WHAT IT ASSERTS, per subject:
 *   - it renders something into #app rather than staying blank
 *   - no uncaught error and no console error while doing so
 *   - the header names that subject, so the chrome and the content agree
 *   - the --subj token resolves, so its accent colour exists
 *   - progress written under its own key survives a reload
 *
 * WHAT IT DOES NOT ASSERT: that any of it looks right. That still needs eyes.
 *
 * Skipped rather than failed when Playwright is unavailable, so the suite still
 * runs for someone who has not installed it.
 *
 * Run: node scripts/check-subjects-render.js
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
  console.log(`${BOLD}subject rendering${RESET}\n`);
  /* Skipping keeps the suite runnable for someone who has not installed
     Playwright. In CI that leniency is wrong: a browser install that silently
     failed would leave this green while asserting nothing, which is worse than
     no check at all. So CI sets REQUIRE_PLAYWRIGHT and a missing browser is a
     build failure. */
  if (process.env.REQUIRE_PLAYWRIGHT) {
    console.log(`  ${RED}✗${RESET}  Playwright is required here and is not installed: ${e.message}`);
    console.log(`  ${DIM}This check is the only one that runs the app. Skipping it in CI would report`);
    console.log(`  green while asserting nothing.${RESET}\n`);
    process.exit(1);
  }
  console.log(`  ${YEL}⚠${RESET}  Playwright is not installed — skipping the render sweep.`);
  console.log(`  ${DIM}npm i -D playwright   (Chromium is already present at PLAYWRIGHT_BROWSERS_PATH)${RESET}\n`);
  process.exit(0);
}

const SUBJECTS = [
  { id: 'aat1',       name: 'AAT Level 1' },
  { id: 'aat',        name: 'AAT Level 2' },
  { id: 'aat3',       name: 'AAT Level 3' },
  { id: 'french',     name: 'Français' },
  { id: 'lsf',        name: 'Langue des Signes Française' },
  { id: 'code-route', name: 'Code de la Route' },
  { id: 'guitar',     name: 'Fingerstyle Guitar' }
];

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.webmanifest': 'application/manifest+json',
  '.png': 'image/png', '.svg': 'image/svg+xml'
};

/* A subject's own stylesheet is deliberately held back. On localhost every file
   arrives in under a millisecond, which hides the question this check is asking:
   does mount() WAIT for the stylesheet, or does it merely happen to win a race
   that a real network would lose? Delaying it by a fifth of a second turns a
   coin-flip into a deterministic answer. */
const CSS_DELAY_MS = 200;
const DELAYED = /guitar-styles\.css$/;

function serve() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const url = decodeURIComponent(req.url.split('?')[0]);
      const file = path.join(ROOT, url === '/' ? 'index.html' : url);
      if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
        res.writeHead(404); res.end('not found'); return;
      }
      const send = () => {
        res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
        fs.createReadStream(file).pipe(res);
      };
      if (DELAYED.test(url)) setTimeout(send, CSS_DELAY_MS); else send();
    });
    server.listen(0, '127.0.0.1', () => resolve({ server, port: server.address().port }));
  });
}

(async () => {
  const errors = [];
  const notes = [];
  const fallbackSubjects = [];
  const { server, port } = await serve();
  const base = `http://127.0.0.1:${port}/`;
  /* The pre-installed Chromium is a different build number from whatever
     Playwright expects, so point at it explicitly rather than letting the
     launcher hunt for a version that is not here. Falls back to the default
     if it has moved. */
  const CANDIDATES = [
    '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell',
    '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
  ].filter(p2 => fs.existsSync(p2));
  const browser = await chromium.launch(CANDIDATES.length ? { executablePath: CANDIDATES[0] } : {});

  try {
    for (const subj of SUBJECTS) {
      const ctx = await browser.newContext();
      const page = await ctx.newPage();
      const consoleErrors = [];
      page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });
      page.on('pageerror', e => consoleErrors.push('uncaught: ' + e.message));

      /* Choose the subject the way the app does, before first paint. */
      await page.addInitScript(id => {
        localStorage.setItem('multisubject_active', id);
      }, subj.id);

      /* Record the first styled element the moment it enters the document.
         Reading it after the page settles answers a different and much easier
         question — by then a delayed stylesheet has arrived anyway, and the
         check passes whether or not mount() waited for it. */
      await page.addInitScript(() => {
        window.__mountCss = null;
        new MutationObserver((records, obs) => {
          for (const r of records) {
            for (const n of r.addedNodes) {
              if (n.nodeType !== 1) continue;
              const el = n.classList && n.classList.contains('gtr-panel')
                ? n : (n.querySelector && n.querySelector('.gtr-panel'));
              if (!el) continue;
              const cs = getComputedStyle(el);
              window.__mountCss = { border: cs.borderTopWidth, radius: cs.borderTopLeftRadius };
              obs.disconnect();
              return;
            }
          }
        }).observe(document, { childList: true, subtree: true });
      });

      await page.goto(base, { waitUntil: 'load' });
      /* The shell renders, then a self-rendering subject swaps itself in on the
         next tick once its assets resolve. Wait for content rather than a
         fixed delay. */
      await page.waitForFunction(() => {
        const app = document.getElementById('app');
        return app && app.textContent.trim().length > 40;
      }, { timeout: 15000 }).catch(() => {});

      const seen = await page.evaluate(() => ({
        subject: document.body.getAttribute('data-subject'),
        appLen: (document.getElementById('app') || {}).textContent?.trim().length || 0,
        heading: (document.querySelector('header h1') || {}).textContent || '',
        subjToken: getComputedStyle(document.body).getPropertyValue('--subj').trim(),
        /* What the chrome actually paints. styles.css uses var(--subj,
           var(--accent)), so a subject without its own token is not broken —
           it inherits the generic accent. This resolves the whole chain. */
        accent: (() => {
          const probe = document.createElement('div');
          probe.style.color = 'var(--subj, var(--accent))';
          document.body.appendChild(probe);
          const c = getComputedStyle(probe).color;
          probe.remove();
          return c;
        })(),
        cover: !!document.getElementById('page-cover'),
        /* Does the subject's own stylesheet apply by the time it has rendered?
           app.js awaits it before mount for exactly one reason: guitar's
           renderer carries no colour of its own, so an unstyled figure is not a
           plainer figure, it is a black rectangle where the tab digits were.
           Probing a rule only that file defines catches both a stylesheet that
           404s and one that mount() did not wait for. */
        moduleCss: window.__mountCss
      }));

      if (seen.subject !== subj.id) {
        errors.push(`${subj.id}: body[data-subject] is "${seen.subject}", not "${subj.id}".`);
      }
      if (seen.appLen < 40) {
        errors.push(`${subj.id}: #app rendered ${seen.appLen} characters — effectively blank.`);
      }
      if (!seen.heading.includes(subj.name)) {
        errors.push(`${subj.id}: header reads "${seen.heading.trim()}", which does not name ${subj.name}. ` +
                    `applyChrome() and the rendered content disagree about which subject is open.`);
      }
      /* An empty --subj is not a failure: styles.css writes var(--subj,
         var(--accent)) throughout, and aat1/aat3 have always relied on that
         fallback because they ship their own stylesheets. What would be a
         failure is the whole chain resolving to nothing. Recorded rather than
         asserted, so the day someone removes the fallback it shows up here
         instead of as an invisible colour. */
      if (!seen.accent || /rgba\(0, 0, 0, 0\)/.test(seen.accent)) {
        errors.push(`${subj.id}: var(--subj, var(--accent)) resolves to nothing, so its chrome has no colour.`);
      }
      if (!seen.subjToken) fallbackSubjects.push(subj.id);
      /* Only guitar ships its own stylesheet through the registry's `styles`
         field, so it is the only subject this applies to. The others link
         theirs from index.html. */
      if (subj.id === 'guitar') {
        if (!seen.moduleCss) {
          errors.push(`${subj.id}: no .gtr-panel ever entered the document, so the stylesheet timing ` +
                      `could not be sampled. Either the shell markup changed or the subject did not mount.`);
        } else if (!(parseFloat(seen.moduleCss.border) > 0)) {
          errors.push(`${subj.id}: guitar-styles.css was not in effect when the UI mounted — .gtr-panel ` +
                      `had no border (${seen.moduleCss.border}) at the instant it entered the document. ` +
                      `mount() is not waiting for the stylesheet, so on any connection slower than ` +
                      `localhost the first paint is unstyled: the mask behind every tab digit defaults ` +
                      `to opaque black and hides the number it exists to reveal.`);
        } else {
          notes.push(`guitar      stylesheet already in effect when the UI mounted, with the file held ` +
                     `back ${CSS_DELAY_MS}ms (.gtr-panel border ${seen.moduleCss.border})`);
        }
      }
      if (consoleErrors.length) {
        errors.push(`${subj.id}: ${consoleErrors.length} console error(s) — ${consoleErrors[0].slice(0, 140)}`);
      }

      /* Progress must survive a reload under this subject's own key. */
      const key = subj.id === 'aat' ? 'aatPrep_v2' : 'prep_v2_' + subj.id;
      await page.evaluate(k => {
        const cur = JSON.parse(localStorage.getItem(k) || '{}');
        cur.__probe = 'kept';
        localStorage.setItem(k, JSON.stringify(cur));
      }, key);
      await page.reload({ waitUntil: 'load' });
      const kept = await page.evaluate(k => {
        try { return (JSON.parse(localStorage.getItem(k) || '{}')).__probe === 'kept'; }
        catch (e) { return false; }
      }, key);
      if (!kept) errors.push(`${subj.id}: progress under ${key} did not survive a reload.`);

      notes.push(`${subj.id.padEnd(11)} ${String(seen.appLen).padStart(6)} chars · accent ${seen.accent}` +
                 (seen.subjToken ? '' : ' (via the --accent fallback)'));
      await ctx.close();
    }
  } finally {
    await browser.close();
    server.close();
  }

  console.log(`${BOLD}subject rendering${RESET}\n`);
  notes.forEach(n => console.log(`  ${DIM}${n}${RESET}`));
  if (fallbackSubjects.length) {
    console.log(`  ${DIM}No --subj token of their own, using the --accent fallback: ${fallbackSubjects.join(', ')}.${RESET}`);
  }
  console.log('');
  if (errors.length) {
    errors.forEach(e => console.log(`  ${RED}✗${RESET}  ${e}`));
    console.log(`\n${RED}${BOLD}${errors.length} subject(s) broken.${RESET}\n`);
    process.exit(1);
  }
  console.log(`  ${GREEN}✓  all ${SUBJECTS.length} subjects render, keep their chrome and keep their progress${RESET}\n`);
})();
