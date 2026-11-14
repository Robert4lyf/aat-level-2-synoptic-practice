#!/usr/bin/env node
/**
 * Can a Level 2 lesson check be passed by always pressing the first option?
 *
 * It could. Every practice route passes its questions through
 * presentQuestion(), which shuffles the options; the lesson check did not, so
 * it drew them in authored order. Authored order puts the key first — 156 of
 * the 285 multiple-choice keys in the lesson checks, and every gap-fill key —
 * so "always A" passed most lessons without reading a word. The data is not
 * wrong: an option list has to be in SOME order. The player was.
 *
 * This asserts the property, not the implementation, in a real browser: it
 * opens the same lessons many times, walks to the first question, and requires
 * the correct answer to appear in more than one position. Then it presses the
 * correct answer and requires it to be marked correct, because a shuffle that
 * moved the options without moving the key would pass the first assertion and
 * mark every right answer wrong.
 *
 * Math.random is seeded per render, so the result is the same on every run.
 *
 * It also asserts that a fresh reader can open every Level 2 lesson: none of
 * them waits on the one before it.
 *
 * Run: node scripts/check-aat2-lesson-position.js   (exit 1 on any failure)
 */
'use strict';

const path = require('path');
const http = require('http');
const fs = require('fs');

const ROOT = path.join(__dirname, '..');
const RED = '\x1b[31m', GREEN = '\x1b[32m', YEL = '\x1b[33m';
const BOLD = '\x1b[1m', DIM = '\x1b[2m', RESET = '\x1b[0m';

const RENDERS = 4;

let failures = 0, checks = 0;
function ok(cond, label) {
  checks++;
  if (!cond) { failures++; console.log(`  ${RED}✗${RESET} ${label}`); }
}

console.log(`${BOLD}AAT Level 2 lesson-check answer position${RESET}\n`);

/* ── The lessons to sample: per unit, the first whose opening question is a
   multiple choice. The first lesson of a unit is always open, so nothing has
   to be seeded to reach it. ─────────────────────────────────────────────── */
global.window = global;
require(path.join(ROOT, 'learn-data.js'));
const LP = window.AAT_LEARN_PATH || window.LEARN_PATH || [];
const samples = [];
LP.forEach(u => {
  const L = (u.lessons || []).find(l =>
    l.check && l.check.length && (l.check[0].type || 'mcq') === 'mcq' && l.check[0].opts.length >= 3);
  if (L) samples.push({ id: L.id, cards: (L.cards || []).length, q: L.check[0] });
});
ok(samples.length === LP.length,
  `only ${samples.length} of ${LP.length} units have a lesson opening on a multiple choice to sample`);

let chromium;
try { ({ chromium } = require('playwright')); } catch (e) {
  if (process.env.REQUIRE_PLAYWRIGHT) {
    console.log(`  ${RED}✗${RESET} Playwright required: ${e.message}`);
    process.exit(1);
  }
  console.log(`  ${YEL}⚠${RESET} Playwright unavailable — skipped.`);
  process.exit(failures ? 1 : 0);
}

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.webmanifest': 'application/manifest+json', '.png': 'image/png', '.svg': 'image/svg+xml',
};
function serve() {
  return new Promise(resolve => {
    const server = http.createServer((req, res) => {
      const u = decodeURIComponent(req.url.split('?')[0]);
      const file = path.join(ROOT, u === '/' ? 'index.html' : u);
      if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
        res.writeHead(404); res.end('not found'); return;
      }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
      fs.createReadStream(file).pipe(res);
    });
    server.listen(0, '127.0.0.1', () => resolve({ server, port: server.address().port }));
  });
}

(async () => {
  const { server, port } = await serve();
  const CANDIDATES = [
    '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell',
    '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    '/opt/pw-browsers/chromium',
  ].filter(p => fs.existsSync(p));
  const browser = await chromium.launch(CANDIDATES.length ? { executablePath: CANDIDATES[0] } : {});

  /* positions[lessonId] = the slot the key was drawn in, per render */
  const positions = {};
  samples.forEach(s => { positions[s.id] = []; });

  try {
    /* Every lesson is open to a fresh reader: no rail position is locked. */
    {
      const ctx = await browser.newContext({ viewport: { width: 390, height: 800 } });
      const page = await ctx.newPage();
      await page.addInitScript(() => {
        localStorage.setItem('multisubject_active', 'aat');
        if (!localStorage.getItem('aatPrep_v2')) {
          localStorage.setItem('aatPrep_v2', JSON.stringify({ settings: { seenSplash: true } }));
        }
      });
      await page.goto(`http://127.0.0.1:${port}/index.html`, { waitUntil: 'networkidle' });
      await page.locator('[data-tab="learn"]').first().click();
      await page.waitForSelector('.journey-node', { timeout: 10000 });
      const total = LP.reduce((n, u) => n + (u.lessons || []).length, 0);
      const open = await page.locator('.journey-node[data-lesson]:not([disabled])').count();
      const locked = await page.locator('.journey-node.node-locked').count();
      ok(open === total && locked === 0,
        `fresh reader: ${open} of ${total} lessons can be opened and ${locked} are locked — ` +
        `every Level 2 lesson should be open without completing the one before it`);
      await ctx.close();
    }

    for (let r = 0; r < RENDERS; r++) {
      const ctx = await browser.newContext({ viewport: { width: 390, height: 800 } });
      const page = await ctx.newPage();
      await page.addInitScript(seed => {
        /* mulberry32 — a different, fixed sequence for each render */
        let a = seed >>> 0;
        Math.random = function () {
          a = (a + 0x6D2B79F5) >>> 0;
          let t = a;
          t = Math.imul(t ^ (t >>> 15), t | 1);
          t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
          return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
        localStorage.setItem('multisubject_active', 'aat');
        if (!localStorage.getItem('aatPrep_v2')) {
          localStorage.setItem('aatPrep_v2', JSON.stringify({ settings: { seenSplash: true } }));
        }
      }, 20261114 + r * 7919);

      for (const s of samples) {
        await page.goto(`http://127.0.0.1:${port}/index.html`, { waitUntil: 'networkidle' });
        await page.locator('[data-tab="learn"]').first().click();
        const node = page.locator(`.journey-node[data-lesson="${s.id}"]`).first();
        await node.waitFor({ timeout: 10000 });
        await node.click();
        /* Through every card and the transition screen to the first question. */
        await page.waitForTimeout(450); /* the player ignores taps for 400ms after opening */
        for (let i = 0; i < s.cards + 2; i++) {
          if (await page.locator('[data-lesson-ans]').count()) break;
          const btn = page.locator('#lessonContinueBtn').first();
          if (!(await btn.count())) break;
          await btn.click({ timeout: 2500 }).catch(() => {});
        }
        const opts = await page.$$eval('[data-lesson-ans]', els =>
          els.map(e => (e.querySelector('.option-text') || e).textContent.trim()));
        const key = s.q.opts[s.q.ans];
        const at = opts.findIndex(t => t.includes(key));
        ok(opts.length === s.q.opts.length && at >= 0,
          `${s.id} render ${r + 1}: reached ${opts.length} option(s) and the key ` +
          `"${key.slice(0, 50)}" ${at < 0 ? 'was not among them' : 'was found'}`);
        if (at < 0) continue;
        positions[s.id].push(at);

        /* Pressing the key must be graded correct. */
        await page.locator('[data-lesson-ans]').nth(at).click();
        const correct = await page.locator('.feedback.correct').count();
        ok(correct > 0,
          `${s.id} render ${r + 1}: the correct answer was pressed and not marked correct — ` +
          `the options moved but the key did not move with them`);
      }
      await ctx.close();
    }
  } finally {
    await browser.close();
    server.close();
  }

  for (const s of samples) {
    const seen = new Set(positions[s.id]);
    ok(seen.size > 1,
      `${s.id}: across ${positions[s.id].length} renders the key was always in position ` +
      `${[...seen].map(i => 'ABCDEF'[i]).join('') || '?'} — the lesson check is not shuffled`);
    console.log(`  ${DIM}${s.id}: key at ${positions[s.id].map(i => 'ABCDEF'[i]).join(' ')}${RESET}`);
  }

  console.log(failures
    ? `\n${RED}${BOLD}── ${failures} of ${checks} checks failed${RESET}\n`
    : `\n${GREEN}${BOLD}── The key moves, and is still marked correct ✓${RESET}  ${DIM}(${checks} assertions)${RESET}\n`);
  process.exit(failures ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
