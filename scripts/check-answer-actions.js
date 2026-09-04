#!/usr/bin/env node
/**
 * The two buttons under an answered question are the same size.
 *
 * THE BUG. On a graded practice question Levels 1 and 3 draw a row holding the
 * advance button and "I know this". The row is `display: flex` with
 * `align-items: stretch`, so both children should be exactly as tall as the
 * row — and they were not. The advance button carried its own `margin-top`,
 * from the `.aN-wide` rule it shares with every full-width button elsewhere in
 * the app. Inside a flex row that margin is part of the row's height but not
 * part of the button's, so the retire button stretched over it: 18px taller
 * than the button beside it on Level 3, 16px on Level 1, and starting that far
 * higher. Two controls meant to sit side by side were visibly mismatched.
 *
 * WHY IT NEEDED A CHECK AND NOT JUST A FIX. Nothing in the suite could see it.
 * check-retire.js asserts that retiring a question retires it, and does that
 * against a DOM with no layout at all. check-subject-layout.js has real layout
 * but sweeps UNANSWERED questions, and this row does not exist until an answer
 * has been graded. So the defect lived in the one gap between them, and was
 * found by a person looking at a phone.
 *
 * WHAT IS ASSERTED, on Levels 1 and 3, light and dark, at 390px and 768px:
 *
 *   §1 the row exists once a question has been graded, with both buttons in it
 *   §2 the two buttons have the same top edge, to within a pixel
 *   §3 the two buttons have the same height, to within a pixel
 *   §4 there is still clear space above the row — the fix moves the margin to
 *      the row rather than deleting it, and a check that only compared the two
 *      buttons would be equally happy with them jammed against the explanation
 *   §5 both are hit-testable at their centres, because a box stretched over a
 *      margin can also mean a box overlapping whatever is above it
 *
 * §3 alone is not enough: two buttons of equal height can still be offset from
 * each other, which is exactly what the defect looked like.
 *
 * Run: node scripts/check-answer-actions.js   (exit 1 on any failure)
 */
'use strict';
const path = require('path'), http = require('http'), fs = require('fs');
const ROOT = path.join(__dirname, '..');
const RED = '\x1b[31m', GREEN = '\x1b[32m', DIM = '\x1b[2m', BOLD = '\x1b[1m', YEL = '\x1b[33m', RESET = '\x1b[0m';

let chromium;
try { ({ chromium } = require('playwright')); } catch (e) {
  console.log(`${BOLD}Answer actions${RESET}\n`);
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

/* One pixel of slack, because a sub-pixel layout height on a fractional device
   ratio can round the two boxes apart by a fraction without anybody being able
   to see it. Two is already visible; the defect this guards was sixteen. */
const SLACK = 1;
/* The row must keep breathing space above it. The margin the fix moves is 16px
   on Level 1 and 18px on Level 3, so anything at or above 12 means it survived
   in some form; zero means it was deleted rather than moved. */
const MIN_GAP = 12;

const MODULES = [
  { id: 'aat1', name: 'AAT Level 1', ui: 'AAT1_UI', store: 'prep_v2_aat1', root: '.a1-root',
    foot: '.a1-qfoot', advance: '.a1-qfoot .a1-wide', retire: '.a1-qfoot .a1-retire',
    start: '[data-a1="startpractice"]', option: '.a1-opt', bank: 'AAT1_PRACTICE' },
  { id: 'aat3', name: 'AAT Level 3', ui: 'AAT3_UI', store: 'prep_v2_aat3', root: '.a3-root',
    foot: '.a3-qfoot', advance: '.a3-qfoot .a3-wide', retire: '.a3-qfoot .a3-retire',
    start: '[data-a3="startpractice"]', option: '.a3-opt', bank: 'AAT3_PRACTICE' },
];

const WIDTHS = [390, 768];

let checks = 0;
const errors = [];
function ok(cond, msg) { checks++; if (!cond) errors.push(msg); }

/* Mount practice, start a mixed run, answer the first question, and measure.
   Answering is the whole reason this runs in a browser: the row does not exist
   before the answer is graded. */
function enterPractice(MOD) {
  const UI = window[MOD.ui];
  if (!UI) return MOD.ui + ' not on the page';

  /* Mixed practice draws at random from every question type the unit has, and
     most of them — grids, pick lists, written answers — have no `.aN-opt` to
     click. A first version left the draw alone and passed or failed by luck,
     four runs out of eight. So the bank is narrowed to one multiple choice
     question: this check is about the height of two buttons, not about the
     draw, and the row it measures is the same row whatever was answered. */
  const bank = window[MOD.bank];
  if (!bank || !Array.isArray(bank.QUESTIONS)) return MOD.bank + ' has no QUESTIONS';
  const one = bank.QUESTIONS.find(q => (!q.type || q.type === 'mcq') && Array.isArray(q.opts));
  if (!one) return 'no multiple choice question in ' + MOD.bank;
  bank.QUESTIONS = [one];

  UI.reset('practice');
  UI.mount(document.querySelector(MOD.root).parentElement);
  const go = [...document.querySelectorAll(MOD.start)].find(n => (n.getAttribute('data-lo') || '') === 'mix')
          || document.querySelector(MOD.start);
  if (!go) return 'no way into practice';
  go.click();
  return null;
}

function measure(MOD) {
  const r2 = n => Math.round(n * 100) / 100;
  const foot0 = document.querySelector(MOD.foot);
  /* elementFromPoint is viewport-relative and returns null for a point off the
     bottom of the window, which would read as "covered" rather than "not on
     screen". Bring the row into view first. */
  if (foot0) foot0.scrollIntoView({ block: 'center' });
  const foot = document.querySelector(MOD.foot);
  const adv = document.querySelector(MOD.advance);
  const ret = document.querySelector(MOD.retire);
  if (!foot || !adv || !ret) {
    return { error: 'after answering: ' + (foot ? '' : 'no row; ') + (adv ? '' : 'no advance button; ') + (ret ? '' : 'no retire button') };
  }
  const box = el => { const r = el.getBoundingClientRect();
    return { top: r2(r.top), bottom: r2(r.bottom), height: r2(r.height), width: r2(r.width) }; };
  const hit = el => { const r = el.getBoundingClientRect();
    const at = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
    return !!(at && (at === el || el.contains(at))); };

  /* What sits immediately above the row. The gap between its bottom edge and
     the row's top is the breathing space §4 is about. */
  const prev = foot.previousElementSibling;
  const gap = prev ? r2(foot.getBoundingClientRect().top - prev.getBoundingClientRect().bottom) : null;

  return {
    adv: box(adv), ret: box(ret), foot: box(foot), gap: gap,
    advHit: hit(adv), retHit: hit(ret),
    align: getComputedStyle(foot).alignItems,
  };
}

(async () => {
  console.log(`${BOLD}Answer actions${RESET}  ${DIM}the pair under a graded question${RESET}\n`);
  const { server, port } = await serve();
  const CANDIDATES = [
    '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell',
    '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    '/opt/pw-browsers/chromium',
  ].filter(p => fs.existsSync(p));
  const browser = await chromium.launch(CANDIDATES.length ? { executablePath: CANDIDATES[0] } : {});

  try {
    for (const width of WIDTHS) {
      for (const MOD of MODULES) {
        for (const dark of [false, true]) {
          const label = `${MOD.name} ${width}px ${dark ? 'dark' : 'light'}`;
          const ctx = await browser.newContext({ viewport: { width, height: 900 } });
          const page = await ctx.newPage();
          await page.addInitScript(([d, id, store]) => {
            localStorage.setItem('multisubject_active', id);
            localStorage.setItem(store, JSON.stringify({ settings: { darkMode: d } }));
          }, [dark, MOD.id, MOD.store]);
          await page.goto(`http://127.0.0.1:${port}/index.html`, { waitUntil: 'networkidle' });
          await page.waitForFunction(g => !!window[g], MOD.ui, { timeout: 15000 });

          let m;
          try {
            const why = await page.evaluate(enterPractice, MOD);
            if (why) throw new Error(why);
            /* The player renders on its own schedule after the click, so the
               option is waited for rather than assumed. An early version read
               the DOM inside the same evaluate and passed or failed by luck. */
            await page.waitForSelector(MOD.option, { timeout: 10000 });
            await page.click(MOD.option + ':first-of-type');
            await page.waitForSelector(MOD.foot, { timeout: 10000 });
            m = await page.evaluate(measure, MOD);
          } catch (e) {
            m = { error: String(e.message || e).split('\n')[0] };
          }
          await ctx.close();

          if (m.error) { ok(false, `${label}: ${m.error}`); continue; }

          /* §1 */
          ok(m.adv.width > 2 && m.adv.height > 2, `${label}: the advance button has no box`);
          ok(m.ret.width > 2 && m.ret.height > 2, `${label}: "I know this" has no box`);

          /* §2 and §3 — the defect, from both directions. */
          const dTop = Math.abs(m.adv.top - m.ret.top);
          ok(dTop <= SLACK,
            `${label}: the two buttons do not start level — advance top ${m.adv.top}, ` +
            `"I know this" top ${m.ret.top} (${r1(dTop)}px apart, tolerance ${SLACK})`);
          const dH = Math.abs(m.adv.height - m.ret.height);
          ok(dH <= SLACK,
            `${label}: the two buttons are different heights — advance ${m.adv.height}, ` +
            `"I know this" ${m.ret.height} (${r1(dH)}px apart, tolerance ${SLACK})`);

          /* §4 — the margin moved to the row, not deleted from it. */
          if (m.gap !== null) {
            ok(m.gap >= MIN_GAP,
              `${label}: only ${m.gap}px above the button row (want at least ${MIN_GAP}) — ` +
              `the spacing was removed rather than moved to the row`);
          }

          /* §5 */
          ok(m.advHit, `${label}: the advance button is not hit-testable at its centre`);
          ok(m.retHit, `${label}: "I know this" is not hit-testable at its centre`);

          if (!errors.length || !errors[errors.length - 1].startsWith(label)) {
            console.log(`  ${GREEN}✓${RESET} ${label}  ${DIM}both ${m.adv.height}px tall, ${m.gap}px above${RESET}`);
          }
        }
      }
    }
  } finally {
    await browser.close();
    server.close();
  }

  if (errors.length) {
    console.log(`\n${RED}${BOLD}── FAILURES (${errors.length}) ──${RESET}`);
    errors.forEach(e => console.log(`  ${RED}✗${RESET} ${e}`));
    console.log('');
    process.exit(1);
  }
  console.log(`\n${GREEN}${BOLD}── The pair under a graded question matches ✓${RESET}  ${DIM}(${checks} assertions)${RESET}\n`);
})().catch(e => { console.error(e); process.exit(1); });

function r1(n) { return Math.round(n * 10) / 10; }
