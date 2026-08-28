#!/usr/bin/env node
/**
 * Does anything on a Level 3 screen fall off the edge of a phone?
 *
 * Every other check in this suite reads data or drives the player through a
 * stand-in element that has no layout at all. None of them can see the class of
 * defect that a redesign actually produces, and this one produced four:
 *
 *   a cheat-sheet table 25px wider than its wrapper, so the column carrying the
 *   rule — the reason the table exists — sat off the right edge, clipped
 *   mid-word;
 *
 *   an arrow given `position: absolute` with no positioning context, which
 *   escaped its row and printed on top of the text beside it;
 *
 *   a screen heading that inherited the app bar's dark background from the
 *   shared stylesheet's bare `header` rule, and rendered near-black on
 *   near-black;
 *
 *   that same heading sized by a rule meant for the app bar, so a 26px display
 *   title came out at body-text size.
 *
 * All four were found by taking a screenshot and looking. That does not scale
 * and does not survive the next change, so the three that a machine can see are
 * asserted here.
 *
 * WHAT IT ASSERTS, on every Level 3 screen at 390px:
 *   nothing overflows the page horizontally
 *   no cell of a table is clipped by its own box
 *   no single word is wider than the column it must wrap inside
 *   no text is rendered in a colour too close to what is behind it
 *
 * WHAT IT DOES NOT ASSERT: that any of it looks good. That still needs eyes.
 *
 * Run: node scripts/check-aat3-layout.js
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
  console.log(`${BOLD}AAT Level 3 layout${RESET}\n`);
  if (process.env.REQUIRE_PLAYWRIGHT) {
    console.log(`  ${RED}✗${RESET}  Playwright is required here and is not installed: ${e.message}\n`);
    process.exit(1);
  }
  console.log(`  ${YEL}⚠${RESET}  Playwright is not installed — skipping the layout sweep.\n`);
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

/* 390px is an iPhone at its most common width and the narrowest thing this has
   to work on. Everything that fails does so here first. */
const WIDTH = 390;

/* Set from what the module achieves, like the rest of the ratchets here, so it
   guards against regression rather than expressing an aspiration. It is NOT a
   WCAG threshold and this is not an accessibility audit: it is looking for text
   that is effectively gone.

   1.25 was tried first and was too low to catch the defect the check was
   written for. A near-black screen heading on the app bar's dark navy gradient
   — which a reader simply cannot see — measures 1.36:1, because both are so
   close to black that the +0.05 in the contrast formula dominates. The floor
   has to sit above that. */
const MIN_CONTRAST = 1.75;

(async () => {
  const errors = [];
  const notes = [];
  const { server, port } = await serve();
  const CANDIDATES = [
    '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell',
    '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    '/opt/pw-browsers/chromium',
  ].filter(p => fs.existsSync(p));
  const browser = await chromium.launch(CANDIDATES.length ? { executablePath: CANDIDATES[0] } : {});

  try {
    for (const dark of [false, true]) {
      const ctx = await browser.newContext({ viewport: { width: WIDTH, height: 860 } });
      const page = await ctx.newPage();
      await page.addInitScript((d) => {
        localStorage.setItem('multisubject_active', 'aat3');
        localStorage.setItem('prep_v2_aat3', JSON.stringify({
          settings: { darkMode: d },
          lessons: { 'L3-TPFB-0A': { best: 100 }, 'L3-TPFB-1A': { best: 80 } },
          practice: { units: { tpfb: { runs: 2, mocks: 1, mockBest: 62,
            los: { 1: { attempted: 9, correct: 7 }, 2: { attempted: 8, correct: 3 } },
            qs: { 'P-2-01': { w: 5000 } } } } },
        }));
      }, dark);
      await page.goto(`http://127.0.0.1:${port}/index.html`, { waitUntil: 'networkidle' });
      await page.waitForFunction(() => !!window.AAT3_UI, null, { timeout: 15000 });

      const found = await page.evaluate((MIN_CONTRAST) => {
        const problems = [];

        const remount = (screen, unit) => {
          window.AAT3_UI.reset(screen, unit);
          window.AAT3_UI.mount(document.querySelector('.a3-root').parentElement);
        };

        /* Text a reader cannot see. Walks up for the first ancestor that paints
           a background, because the element itself is usually transparent. */
        const luminance = (c) => {
          const m = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/.exec(c);
          if (!m) return null;
          if (m[4] !== undefined && Number(m[4]) < 0.5) return null;
          const [r, g, b] = [m[1], m[2], m[3]].map(v => {
            const s = Number(v) / 255;
            return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
          });
          return 0.2126 * r + 0.7152 * g + 0.0722 * b;
        };
        /* Returns null — meaning "cannot judge" — rather than guessing, in the
           two cases where guessing is what produced twenty-three false alarms
           on the first run of this check:

           A DELIBERATELY FAINT MARK. An unearned star is drawn in the line
           colour on purpose, and came out at 1.49:1 — correctly measured and
           not a defect. Decorative marks are excluded by aria-hidden, which
           they carry anyway for screen readers. */
        /* A GRADIENT IS AVERAGED, NOT SKIPPED. `backgroundColor` on an element
           painted with a background-image is rgba(0,0,0,0), so a first version
           walked straight past the mock panel's purple gradient to the white
           page behind it and called its white heading white-on-white — twelve
           false alarms. Skipping gradients instead silenced those and silenced
           the real defect with them: the bug this check exists for is a dark
           heading on the app bar's dark navy, and the app bar's background IS a
           gradient. Skipping it, the mutant survived.

           So the stops are read out of the gradient and averaged. It is an
           approximation — the colour under any particular glyph is somewhere
           between the stops — but every stop of these gradients is dark, and
           "is this text within touching distance of everything behind it" is a
           question the average answers correctly. */
        const backdrop = (el) => {
          for (let n = el; n && n !== document.documentElement; n = n.parentElement) {
            const cs = getComputedStyle(n);
            if (cs.backgroundImage && cs.backgroundImage !== 'none') {
              const stops = (cs.backgroundImage.match(/rgba?\([^)]*\)/g) || [])
                .map(luminance).filter(v => v !== null);
              if (stops.length) return stops.reduce((a, b) => a + b, 0) / stops.length;
              continue;   // an image or an unreadable gradient: keep looking behind it
            }
            const l = luminance(cs.backgroundColor);
            if (l !== null) return l;
          }
          return luminance(getComputedStyle(document.body).backgroundColor);
        };

        const sweep = (label) => {
          const root = document.querySelector('.a3-root');
          if (!root) { problems.push(`${label}: nothing rendered`); return; }

          /* 1. The page itself does not scroll sideways. */
          if (document.documentElement.scrollWidth > window.innerWidth + 1) {
            problems.push(`${label}: the page is ${document.documentElement.scrollWidth}px wide in a ${window.innerWidth}px window`);
          }

          /* 2. No table is wider than the box meant to hold it, and no cell is
                clipped by its own. A wrapper that scrolls is fine for a dataset
                of figures and not for a card of prose, so only the cheat sheets
                are held to the stricter rule. */
          /* ONLY THE CHEAT SHEETS ARE REQUIRED TO FIT. A sheet is read at a
             glance, so a column off the edge defeats the card, and stacking its
             rows costs nothing because they are independent facts.

             A task dataset is different and the first version of this check had
             it wrong. It demanded that datasets fit too, and immediately found
             that three of the six do not: 314px, 390px and 428px inside a 310px
             wrapper, two of which had never been looked at. But twelve monthly
             figures across four columns cannot be made to fit a phone, and both
             ways of forcing it are worse than scrolling — a broken amount, or a
             stacked layout that destroys the column the reader is being asked
             to add up. So a dataset may scroll. What it may not do is break a
             word, which the rule below covers. */
          root.querySelectorAll('.a3-cheat .a3-table').forEach(t => {
            const w = t.closest('.a3-tablewrap');
            if (w && t.scrollWidth > w.clientWidth + 1) {
              problems.push(`${label}: a cheat-sheet table is ${t.scrollWidth}px in a ${w.clientWidth}px wrapper, so part of it cannot be read without scrolling`);
            }
          });
          root.querySelectorAll('td, th').forEach(c => {
            if (c.offsetParent === null || c.clientWidth <= 0) return;
            if (c.scrollWidth > c.clientWidth + 1) {
              problems.push(`${label}: a cell is clipped — "${c.textContent.trim().slice(0, 40)}"`);
            }
          });

          /* 3. No word too wide for the column it wraps inside. A cell that
                fits can still break "Deregistration" across two lines, and a
                figure broken in half — "£1,350,00 / 0" — is worse than either. */
          const rule = document.createElement('span');
          rule.style.cssText = 'position:absolute;visibility:hidden;white-space:pre;top:-9999px';
          document.body.appendChild(rule);
          root.querySelectorAll('.a3-cheat td, .a3-dataset td').forEach(c => {
            if (c.offsetParent === null || c.clientWidth <= 0) return;
            const cs = getComputedStyle(c);
            if (cs.display !== 'table-cell') return;   // stacked layout: no columns to overflow
            const inner = c.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
            /* The individual properties, not the `font` shorthand: Chrome
               returns an empty string for it whenever the family is inherited,
               so the measuring span silently fell back to the default font and
               reported eight-letter words as too wide for columns they fit in.
               Every "will break mid-word" this check found was measured against
               the wrong typeface until this line changed. */
            rule.style.fontFamily = cs.fontFamily;
            rule.style.fontSize = cs.fontSize;
            rule.style.fontWeight = cs.fontWeight;
            rule.style.fontStyle = cs.fontStyle;
            rule.style.letterSpacing = cs.letterSpacing;
            /* Split on hyphens, slashes and dashes as well as spaces: a
               browser breaks a line at any of them, so "standard-rated" is two
               opportunities and not one long word. Treating it as unbreakable
               reported the only remaining failure in the module, wrongly. */
            c.textContent.trim().split(/[\s/\u2013\u2014]+|(?<=-)/).forEach(word => {
              const w = word.trim();
              if (w.length < 4) return;
              rule.textContent = w;
              if (rule.getBoundingClientRect().width > inner + 0.5) {
                problems.push(`${label}: "${w}" is wider than its ${Math.round(inner)}px column and will break mid-word`);
              }
            });
          });
          rule.remove();

          /* 4. Text a reader cannot see. */
          root.querySelectorAll('h1, h2, h3, p, span, div, button, td, th, li').forEach(el => {
            const t = (el.childNodes.length && [...el.childNodes]
              .filter(n => n.nodeType === 3).map(n => n.textContent).join('').trim()) || '';
            if (!t) return;
            if (el.offsetParent === null) return;
            if (el.closest('[aria-hidden="true"]')) return;
            const fg = luminance(getComputedStyle(el).color);
            const bg = backdrop(el);
            if (fg === null || bg === null) return;
            const ratio = (Math.max(fg, bg) + 0.05) / (Math.min(fg, bg) + 0.05);
            /* 1.25, not a WCAG threshold. This is not an accessibility audit —
               check-theme-tokens.js is elsewhere and there is a real one to be
               written. It is looking for text that is effectively GONE, which is
               what the shared stylesheet's `header` rule did to a screen
               heading: dark ink on the app bar's dark navy, at 1.00:1. Setting
               it where contrast merely gets poor would flag every deliberately
               quiet label in the module. */
            if (window.__a3lowest === undefined || ratio < window.__a3lowest.ratio) {
              window.__a3lowest = { ratio: ratio, text: t.slice(0, 40), label: label };
            }
            if (ratio < MIN_CONTRAST) {
              problems.push(`${label}: "${t.slice(0, 34)}" is ${ratio.toFixed(2)}:1 against what is behind it — effectively invisible`);
            }
          });
        };

        remount('units', 'tpfb'); sweep('units');
        ['tpfb', 'faps'].forEach(unit => {
          remount('path', unit); sweep(`${unit} path`);
          remount('practice', unit); sweep(`${unit} practice`);
          /* Every cheat sheet, which is where the tables live. */
          remount('path', unit);
          const sheets = [...document.querySelectorAll('[data-a3="open"]')]
            .filter(n => /S$/.test(n.getAttribute('data-id') || ''))
            .map(n => n.getAttribute('data-id'));
          sheets.forEach(id => {
            remount('path', unit);
            const b = [...document.querySelectorAll('[data-a3="open"]')].find(n => n.getAttribute('data-id') === id);
            if (b) { b.click(); sweep(`${id}`); }
          });
          /* And one ordinary lesson, for the reading surface. */
          remount('path', unit);
          const first = document.querySelector('[data-a3="open"]');
          if (first) { first.click(); sweep(`${unit} lesson`); }

          /* Every multi-part task, each in a bank of exactly itself so the run
             cannot draw anything else. Drawing at random and hoping a task
             turns up would make this check pass or fail by luck. */
          const banks = [window.AAT3_PRACTICE, window.AAT3_FAPS_PRACTICE].filter(Boolean);
          const tasks = banks.flatMap(b => (b.QUESTIONS || []))
            .filter(q => q.type === 'task' && q.unitKey === unit);
          const saved = window.AAT3_PRACTICE;
          tasks.forEach(t => {
            window.AAT3_PRACTICE = { QUESTIONS: [Object.assign({}, t, { unitKey: unit })] };
            window.AAT3_FAPS_PRACTICE = { QUESTIONS: [] };
            remount('practice', unit);
            const go = [...document.querySelectorAll('[data-a3="startpractice"]')]
              .find(n => n.getAttribute('data-lo') === 'mix');
            if (go) { go.click(); sweep(`task ${t.id}`); }
          });
          window.AAT3_PRACTICE = saved;
        });
        return { problems: problems, lowest: window.__a3lowest };
      }, MIN_CONTRAST);

      const theme = dark ? 'dark' : 'light';
      found.problems.forEach(p => errors.push(`${theme}: ${p}`));
      notes.push(`${theme}: swept units, both paths, both practice screens, every cheat sheet, ` +
        `a lesson and every task at ${WIDTH}px.`);
      if (found.lowest) {
        notes.push(`${theme}: faintest text is ${found.lowest.ratio.toFixed(2)}:1 — ` +
          `"${found.lowest.text}" on ${found.lowest.label} (floor ${MIN_CONTRAST}).`);
      }
      await ctx.close();
    }
  } finally {
    await browser.close();
    server.close();
  }

  console.log(`${BOLD}AAT Level 3 layout${RESET}\n`);
  notes.forEach(n => console.log(`  ${DIM}${n}${RESET}`));
  console.log('');
  if (errors.length) {
    console.log(`${RED}${BOLD}── ${errors.length} layout problem${errors.length === 1 ? '' : 's'} ──${RESET}`);
    errors.slice(0, 40).forEach(e => console.log(`  ${RED}✗${RESET}  ${e}`));
    if (errors.length > 40) console.log(`  ${DIM}…and ${errors.length - 40} more${RESET}`);
    console.log('');
    process.exit(1);
  }
  console.log(`${GREEN}${BOLD}── Nothing falls off the edge ✓${RESET}\n`);
})();
