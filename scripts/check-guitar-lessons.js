#!/usr/bin/env node
/**
 * Every card of every lesson opens, draws its figure, and plays what it says.
 *
 * check-guitar-quality.js reads the content and check-guitar-coverage.js reads
 * the syllabus, and between them they prove the data is well formed. Neither
 * opens a browser, so neither can tell whether a card actually renders — a
 * lesson referencing an element kind the player does not handle passes both and
 * shows the reader a heading with nothing under it.
 *
 * So this walks the unit the way a person does: open each lesson, step through
 * every card, and require of each one that it drew something, that the tempo
 * offered is the tempo the card prescribes, and that nothing errored on the way.
 * Then it marks a lesson done and reloads, because progress that does not
 * survive a reload is not progress.
 *
 * THE TEMPO ASSERTION is the one worth explaining. A card carries a starting
 * tempo, and the transport carries a working tempo. Nothing stops those from
 * being two different numbers — an early version of the player displayed the
 * card's bpm while playing the workshop's, so the box read 44 and the audio ran
 * at 90. The expected value here comes from guitar-exercise-data.js, which is
 * neither of the two places that could disagree.
 *
 * Run: node scripts/check-guitar-lessons.js   (exit 1 on any failure)
 */

'use strict';

const fs = require('fs');
const path = require('path');
const http = require('http');
const ROOT = path.join(__dirname, '..');
const D = require('../guitar-learn-data.js');
const X = require('../guitar-exercise-data.js');

const RED = '\x1b[31m', GREEN = '\x1b[32m', DIM = '\x1b[2m', BOLD = '\x1b[1m', YEL = '\x1b[33m', RESET = '\x1b[0m';
const errors = [];
const notes = [];

let chromium;
try { ({ chromium } = require('playwright')); }
catch (e) {
  console.log(`${BOLD}guitar lessons${RESET}\n`);
  if (process.env.REQUIRE_PLAYWRIGHT) {
    console.log(`  ${RED}✗${RESET}  REQUIRE_PLAYWRIGHT is set but Playwright is not installed.\n`);
    process.exit(1);
  }
  console.log(`  ${YEL}⚠${RESET}  Playwright is not installed — skipping.\n`);
  process.exit(0);
}

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

/* What tempo each card should offer, read from the content rather than from
   the player. Undefined where a card prescribes none — those inherit whatever
   is already set, and asserting a number there would be inventing one. */
function expectedTempo(lesson, index) {
  const card = lesson.cards[index];
  const el = card.tab || card.playalong;
  if (!el) return undefined;
  const ex = X.exercise(el.exercise);
  return el.bpm || (ex && ex.bpm) || undefined;
}

(async () => {
  const { server, port } = await serve();
  const CANDIDATES = [
    '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell',
    '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
  ].filter(p => fs.existsSync(p));
  const browser = await chromium.launch(CANDIDATES.length ? { executablePath: CANDIDATES[0] } : {});

  let cardsSeen = 0, figuresSeen = 0;
  try {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    const consoleErrors = [];
    page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });
    page.on('pageerror', e => consoleErrors.push('uncaught: ' + e.message));

    await page.addInitScript(() => localStorage.setItem('multisubject_active', 'guitar'));
    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'load' });
    await page.waitForSelector('[data-lesson]', { timeout: 15000 });

    /* Every lesson in the data has a button. A lesson that exists but cannot be
       reached is invisible content, and nothing else here would notice. */
    const buttons = await page.$$eval('[data-lesson]', els => els.map(e => e.getAttribute('data-lesson')));
    for (const lesson of D.LESSONS) {
      if (!buttons.includes(lesson.id)) {
        errors.push(`${lesson.id} ("${lesson.title}") has no button on the lesson list — ` +
                    `it is written but unreachable.`);
      }
    }

    for (const lesson of D.LESSONS) {
      if (!buttons.includes(lesson.id)) continue;
      await page.click(`[data-lesson="${lesson.id}"]`);
      await page.waitForSelector('.gtr-card', { timeout: 8000 });

      for (let i = 0; i < lesson.cards.length; i++) {
        const seen = await page.evaluate(() => ({
          heading: (document.querySelector('.gtr-card .gtr-h') || {}).textContent || '',
          paras: document.querySelectorAll('.gtr-card .gtr-p').length,
          figures: document.querySelectorAll('.gtr-card .gtr-figures svg, .gtr-card .gtr-pointer').length,
          faults: document.querySelectorAll('.gtr-card .gtr-fault').length,
          count: (document.querySelector('.gtr-lessonbar-count') || {}).textContent || '',
          tempo: (document.querySelector('#gtrTempoNum') || {}).value,
          hasNext: !!document.querySelector('#gtrNext'),
          hasFinish: !!document.querySelector('#gtrFinish')
        }));
        cardsSeen++;
        const at = `${lesson.id} card ${i + 1}`;
        const card = lesson.cards[i];

        if (seen.heading.trim() !== String(card.h).trim()) {
          errors.push(`${at}: the player shows "${seen.heading.trim()}" where the data says "${card.h}".`);
        }
        if (seen.count !== `${i + 1}/${lesson.cards.length}`) {
          errors.push(`${at}: the counter reads "${seen.count}", expected "${i + 1}/${lesson.cards.length}".`);
        }
        if (seen.faults) {
          errors.push(`${at} rendered ${seen.faults} fault message(s) — a referenced exercise did not resolve.`);
        }
        if (!seen.figures) {
          errors.push(`${at} ("${card.h}") drew no figure. The card declares an element the player ` +
                      `does not handle, so the reader gets a heading with nothing under it.`);
        } else {
          figuresSeen++;
        }
        if (seen.paras !== (card.p || []).length) {
          errors.push(`${at}: ${seen.paras} paragraph(s) rendered, ${(card.p || []).length} in the data.`);
        }

        const want = expectedTempo(lesson, i);
        if (want !== undefined && Number(seen.tempo) !== want) {
          errors.push(`${at}: the tempo box reads ${seen.tempo} where the exercise prescribes ${want}. ` +
                      `The card and the transport are reading different numbers.`);
        }

        const last = i === lesson.cards.length - 1;
        if (last && !seen.hasFinish) errors.push(`${at} is the last card but offers no way to finish.`);
        if (!last && !seen.hasNext) errors.push(`${at} offers no way forward.`);

        if (!last) { await page.click('#gtrNext'); await page.waitForTimeout(90); }
      }

      /* Finish, and land back on the list. */
      await page.click('#gtrFinish');
      await page.waitForSelector('[data-lesson]', { timeout: 8000 });
    }

    /* ── A looping card loops over ITS OWN length ─────────────────────────
       Ticking Loop on a lesson card used to set the loop from the workshop's
       generated exercise, because that was the only exercise the loop code knew
       about — so a card looped over whatever length the scale panel happened to
       be showing. It sounded like a loop, which is why it needed measuring
       rather than listening to. The expected length is computed here from
       guitar-exercise-data.js, not read back from the player. */
    const loopLesson = D.LESSONS.find(l => l.cards.some(c => (c.playalong && c.playalong.loop)));
    if (loopLesson) {
      const cardIdx = loopLesson.cards.findIndex(c => c.playalong && c.playalong.loop);
      const ex = X.exercise(loopLesson.cards[cardIdx].playalong.exercise);
      const lastEnd = Math.max(...ex.notes.map(n => n.beat + (n.dur || 0)));
      const wantBeats = Math.ceil(lastEnd / 4) * 4;

      await page.click(`[data-lesson="${loopLesson.id}"]`);
      await page.waitForSelector('.gtr-card', { timeout: 8000 });
      for (let i = 0; i < cardIdx; i++) { await page.click('#gtrNext'); await page.waitForTimeout(70); }
      await page.click('#gtrPlay');
      await page.waitForTimeout(250);
      const loop = await page.evaluate(() => {
        const T = window.GUITAR_UI && window.GUITAR_UI.transport();
        return T && T.loop ? { start: T.loop.start, end: T.loop.end } : null;
      });
      await page.click('#gtrStop');
      if (!loop) {
        errors.push(`${loopLesson.id} card ${cardIdx + 1} declares loop: true but the transport has no loop set.`);
      } else if (loop.end !== wantBeats) {
        errors.push(`${loopLesson.id} card ${cardIdx + 1} loops over ${loop.end} beats; its exercise ` +
                    `"${loopLesson.cards[cardIdx].playalong.exercise}" is ${wantBeats} beats long. ` +
                    `The card is looping over a length that belongs to something else.`);
      } else {
        notes.push(`Looping card: ${loop.end} beats, matching its own exercise.`);
      }
      await page.click('#gtrBack');
      await page.waitForSelector('[data-lesson]', { timeout: 8000 });
    }

    /* Progress survives a reload. */
    const before = await page.evaluate(() =>
      Object.keys((JSON.parse(localStorage.getItem('prep_v2_guitar') || '{}').lessons) || {}).length);
    await page.reload({ waitUntil: 'load' });
    await page.waitForSelector('[data-lesson]', { timeout: 15000 });
    const after = await page.evaluate(() => ({
      stored: Object.keys((JSON.parse(localStorage.getItem('prep_v2_guitar') || '{}').lessons) || {}).length,
      ticks: [...document.querySelectorAll('.gtr-lesson-state')].filter(e => e.textContent.trim()).length
    }));
    if (before !== D.LESSONS.length) {
      errors.push(`${before} of ${D.LESSONS.length} lessons recorded as done after finishing all of them.`);
    }
    if (after.stored !== before) {
      errors.push(`progress was ${before} lessons before a reload and ${after.stored} after.`);
    }
    if (after.ticks !== before) {
      errors.push(`${before} lessons are stored as done but ${after.ticks} show a tick on the list.`);
    }
    notes.push(`${before} lessons marked done; ${after.ticks} ticks shown after a reload.`);

    if (consoleErrors.length) {
      errors.push(`${consoleErrors.length} console error(s) while walking the unit — ${consoleErrors[0].slice(0, 160)}`);
    }
  } finally {
    await browser.close();
    server.close();
  }

  notes.unshift(`${cardsSeen} cards opened across ${D.LESSONS.length} lessons; ${figuresSeen} drew a figure.`);

  console.log(`${BOLD}guitar lessons${RESET}\n`);
  notes.forEach(n => console.log(`  ${DIM}${n}${RESET}`));
  console.log('');
  if (errors.length) {
    errors.forEach(e => console.log(`  ${RED}✗${RESET}  ${e}`));
    console.log(`\n${RED}${BOLD}${errors.length} failure(s).${RESET}\n`);
    process.exit(1);
  }
  console.log(`  ${GREEN}✓  every card opens, draws and keeps its place${RESET}\n`);
})();
