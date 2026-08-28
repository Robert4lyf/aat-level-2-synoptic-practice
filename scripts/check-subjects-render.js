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
 *   - the title IS the subject switcher, and names the subject only once
 *   - the title is not truncated on a 1280px header with room to spare
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
        /* THE TITLE IS THE SWITCHER, and the header names the subject once.
           It used to name it twice — an <h1> reading "AAT Level 3" beside a
           pill reading "AAT L3 ▾" — so one of four header controls was spent
           repeating the word beside it. */
        brand: (() => {
          const h1 = document.querySelector('body > header h1');
          const btn = document.getElementById('subjectSwitcherBtn');
          const nm = document.querySelector('body > header .brand-name');
          const car = document.querySelector('body > header .brand-caret');
          const hdr = document.querySelector('body > header');
          if (!h1 || !btn || !nm || !car || !hdr) {
            return { missing: [['h1', h1], ['button', btn], ['.brand-name', nm],
                               ['.brand-caret', car], ['header', hdr]]
                       .filter(x => !x[1]).map(x => x[0]) };
          }
          /* Everything in the top bar EXCEPT the title. If the subject's name
             appears here too, it is being said twice. */
          const rest = Array.from(hdr.querySelectorAll('*'))
            .filter(e => !h1.contains(e) && e !== h1 && !e.querySelector('h1'))
            .map(e => e.textContent).join(' ');
          const carBox = car.getBoundingClientRect();
          return {
            missing: [],
            inH1: h1.contains(btn),
            /* scrollWidth exceeding clientWidth means the ellipsis has eaten
               part of the name. On a 1280px header that is never right. */
            clipped: nm.scrollWidth > nm.clientWidth + 1,
            nameW: Math.round(nm.getBoundingClientRect().width),
            content: nm.scrollWidth,
            /* A caret that computes to a zero box is the empty-pill failure:
               present in the DOM, absent from the screen. */
            caretPainted: carBox.width > 0 && carBox.height > 0 && !!car.textContent.trim(),
            aria: btn.getAttribute('aria-label') || '',
            rest: rest.replace(/\s+/g, ' ')
          };
        })(),
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
      const br = seen.brand;
      if (br.missing.length) {
        errors.push(`${subj.id}: the header title switcher is incomplete — no ${br.missing.join(', no ')}.`);
      } else {
        if (!br.inH1) {
          errors.push(`${subj.id}: #subjectSwitcherBtn is not inside the <h1>. The title is meant to BE the ` +
                      `switcher; a separate control means the header names the subject twice.`);
        }
        if (br.rest.includes(subj.name)) {
          errors.push(`${subj.id}: the top bar names "${subj.name}" outside the title as well — ` +
                      `"${br.rest.trim().slice(0, 80)}". The subject should be named once.`);
        }
        /* The context is 1280px wide with a title of at most ~320px, so there is
           never a legitimate reason to truncate. This caught a `max-width: 100%`
           on the button that resolved against a shrink-to-fit ancestor and
           ellipsised "AAT Level 3" down to "AAT Le…" at EVERY width — invisible
           to every other check, because the button was still there and still
           worked. */
        if (br.clipped) {
          errors.push(`${subj.id}: the title is truncated at 1280px — "${subj.name}" needs ${br.content}px ` +
                      `and was given ${br.nameW}px. A header this wide has the room; something is ` +
                      `collapsing the title's width.`);
        }
        if (!br.caretPainted) {
          errors.push(`${subj.id}: the ▾ caret computes to an empty box, so the title does not read as ` +
                      `something you can press.`);
        }
        if (!br.aria.includes(subj.name)) {
          errors.push(`${subj.id}: the switcher's aria-label is "${br.aria}", which does not name ` +
                      `${subj.name} — a screen reader is told it switches subject but not which is open.`);
        }
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
                 (seen.brand.missing.length ? '' : ` · title/switcher ${seen.brand.nameW}px`) +
                 (seen.subjToken ? '' : ' (via the --accent fallback)'));
      await ctx.close();
    }
    /* ── The title gives way rather than pushing the page sideways ─────────
       Every assertion above runs on a 1280px header, where nothing truncates
       and nothing needs to. This is the other end: a narrow phone and a
       subject name too long for it.

       The name is injected rather than drawn from the registry because no
       subject is quite long enough today — "Langue des Signes Française" is
       290px inside 296px of usable width, five pixels short of proving
       anything. That margin is the whole reason to assert it: the next subject
       with a long name inherits whatever this does, and what it did before the
       <h1> became a flex container was overflow the viewport to 645px and give
       the whole app a horizontal scrollbar, because an inline-flex button in a
       block <h1> sizes itself and ignores every min-width: 0 above it. */
    {
      const ctx = await browser.newContext({ viewport: { width: 320, height: 640 } });
      const page = await ctx.newPage();
      await page.addInitScript(() => {
        localStorage.setItem('multisubject_active', 'aat3');
        localStorage.setItem('prep_v2_aat3', JSON.stringify({ settings: { seenSplash: true } }));
      });
      await page.goto(`http://127.0.0.1:${port}/`);
      await page.waitForFunction(() => {
        const a = document.getElementById('app');
        return a && a.textContent.trim().length > 40;
      }, { timeout: 15000 }).catch(() => {});

      const narrow = await page.evaluate(() => {
        const nm = document.querySelector('body > header .brand-name');
        const car = document.querySelector('body > header .brand-caret');
        if (!nm || !car) return null;
        nm.textContent = '📗 Association of Accounting Technicians Level 3 Diploma in Accounting';
        return new Promise(res => requestAnimationFrame(() => requestAnimationFrame(() => {
          const carBox = car.getBoundingClientRect();
          const doc = document.documentElement;
          res({
            truncated: nm.scrollWidth > nm.clientWidth + 1,
            /* The caret must survive the squeeze: a title that truncates the
               ▾ away stops reading as a control exactly when it is hardest to
               tell what the header is. */
            caretVisible: carBox.width > 0 && carBox.right <= doc.clientWidth + 1,
            scrollW: doc.scrollWidth,
            clientW: doc.clientWidth
          });
        })));
      });

      if (!narrow) {
        errors.push('narrow header: no .brand-name/.brand-caret to test the long-name case against.');
      } else {
        if (narrow.scrollW > narrow.clientW) {
          errors.push(`narrow header: a long subject name pushed the page to ${narrow.scrollW}px inside a ` +
                      `${narrow.clientW}px viewport, so the whole app scrolls sideways. The title must ` +
                      `truncate instead of growing.`);
        }
        if (!narrow.truncated) {
          errors.push('narrow header: a 614px subject name in a 320px viewport was not truncated, so the ' +
                      'ellipsis never engages and the header has no way to give ground.');
        }
        if (!narrow.caretVisible) {
          errors.push('narrow header: the ▾ caret was pushed off-screen by a long subject name.');
        }
        if (!errors.length || narrow.truncated) {
          notes.push(`narrow      a 614px name truncates inside 320px with the caret still on screen`);
        }
      }
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
