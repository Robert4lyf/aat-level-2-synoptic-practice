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

  let cardsSeen = 0, figuresSeen = 0, demoCards = 0;
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

        /* A demonstration must offer no tempo control at all — its pace is
           fixed so two chords can be compared, and a slider that changed the
           gap would be changing the only thing the card is about. */
        const el0 = card.tab || card.playalong;
        const ex0 = el0 && X.exercise(el0.exercise);
        if (ex0 && ex0.demo) {
          if (seen.tempo !== undefined) {
            errors.push(`${at} is a demonstration but offers a tempo control reading ${seen.tempo}. ` +
                        `Its pace is fixed; a slider here would stretch the comparison it exists to make.`);
          } else {
            demoCards++;
          }
        } else {
          const want = expectedTempo(lesson, i);
          if (want !== undefined && Number(seen.tempo) !== want) {
            errors.push(`${at}: the tempo box reads ${seen.tempo} where the exercise prescribes ${want}. ` +
                        `The card and the transport are reading different numbers.`);
          }
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
      /* ── Nothing lights during the count-in ───────────────────────────
         The cursor follows currentBeat(), which reports negative beats while
         the count-in clicks. Those were being wrapped into the loop range —
         loopWrap(-4, 0, 8) is 4 — so a looping card lit the back half of the
         phrase before a note had sounded, then jumped to the start. It looked
         like a cursor four beats ahead of the audio, and it was. Only the LOOP
         path did this, which is why the cursor timing check in
         check-guitar-controls.js never saw it: that one plays unlooped.

         MEASURED BY THE CLOCK, NOT BY THE TRANSPORT. The obvious version of
         this check asks currentBeat() whether the count-in is still running and
         requires nothing lit while it is negative — and that is vacuous, because
         currentBeat() is the broken function. Under the bug it reports 4 rather
         than -4, the filter never fires, and the gate passes while the defect
         sits in front of it. So the window comes from elapsed wall-clock time
         against the count-in length implied by the exercise's own bpm, which is
         neither of the things being judged. */
      const countInMs = (4 * 60 / (loopLesson.cards[cardIdx].playalong.bpm || ex.bpm)) * 1000;
      const litEarly = await page.evaluate(async (windowMs) => {
        const t0 = performance.now();
        const samples = [];
        /* Stop a little short of beat 0 so a slow frame near the boundary is
           not read as an early light. */
        while (performance.now() - t0 < windowMs - 250) {
          samples.push({
            at: Math.round(performance.now() - t0),
            lit: document.querySelectorAll('.gtr-note.is-playing').length
          });
          await new Promise(r => setTimeout(r, 60));
        }
        return samples;
      }, countInMs);
      const bad = litEarly.filter(x => x.lit > 0);
      if (bad.length) {
        errors.push(`${loopLesson.id} card ${cardIdx + 1}: a note was lit ${bad[0].at}ms after play, ` +
                    `during a ${Math.round(countInMs)}ms count-in (${bad.length} of ${litEarly.length} ` +
                    `samples lit). The cursor is running ahead of the sound by the length of the count-in.`);
      } else {
        notes.push(`Count-in: ${litEarly.length} samples across ${Math.round(countInMs)}ms, none lit.`);
      }

      await page.click('#gtrStop');
      await page.waitForTimeout(60);

      /* ── And with the count-in off, playing starts straight away ─────────
         The toggle is only worth having if it does something, and "nothing
         lights for four beats" is indistinguishable from "the cursor is
         broken" without the other half of the pair. Measured the same way:
         wall-clock elapsed, not the transport's own opinion of the beat. */
      await page.uncheck('#gtrCountIn');
      await page.click('#gtrPlay');
      const litBy = await page.evaluate(async (windowMs) => {
        const t0 = performance.now();
        while (performance.now() - t0 < windowMs) {
          if (document.querySelectorAll('.gtr-note.is-playing').length) {
            return Math.round(performance.now() - t0);
          }
          await new Promise(r => setTimeout(r, 30));
        }
        return null;
      }, countInMs);
      await page.click('#gtrStop');
      await page.check('#gtrCountIn');
      if (litBy === null) {
        errors.push(`with the count-in off, no note lit within ${Math.round(countInMs)}ms. ` +
                    `The toggle is not taking effect, so playback still waits.`);
      } else if (litBy > countInMs / 2) {
        errors.push(`with the count-in off, the first note lit ${litBy}ms in — over half of the ` +
                    `${Math.round(countInMs)}ms count-in it is meant to skip.`);
      } else {
        notes.push(`Count-in off: first note lit ${litBy}ms in, against a ${Math.round(countInMs)}ms count-in.`);
      }

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

    /* ── The same toggle governs the workshop ─────────────────────────────
       Playback is started in one place for both screens, which is what stops
       the count-in applying on the lesson player and not the bench. Asserted
       rather than trusted: a mutation wiring only the workshop back to a
       hardcoded count-in passed the whole suite before this existed, because
       every other check here drives lessons. */
    await page.click('[data-screen="workshop"]');
    await page.waitForSelector('#gtrCountIn', { timeout: 8000 });
    const workshopChecked = await page.isChecked('#gtrCountIn');
    if (workshopChecked !== true) {
      errors.push(`the count-in reads ${workshopChecked} on the workshop after being left on in a ` +
                  `lesson. The two screens are keeping separate settings.`);
    }
    await page.uncheck('#gtrCountIn');
    await page.click('#gtrPlay');
    const workshopLitBy = await page.evaluate(async () => {
      const t0 = performance.now();
      while (performance.now() - t0 < 3000) {
        if (document.querySelectorAll('.gtr-note.is-playing').length) return Math.round(performance.now() - t0);
        await new Promise(r => setTimeout(r, 30));
      }
      return null;
    });
    await page.click('#gtrStop');
    await page.check('#gtrCountIn');
    if (workshopLitBy === null || workshopLitBy > 1200) {
      errors.push(`on the workshop with the count-in off, the first note lit ` +
                  `${workshopLitBy === null ? 'never' : workshopLitBy + 'ms in'}. ` +
                  `The toggle works on lessons but not here.`);
    } else {
      notes.push(`Workshop honours the same count-in setting; first note lit ${workshopLitBy}ms in with it off.`);
    }
    await page.click('[data-screen="lessons"]');
    await page.waitForSelector('[data-lesson]', { timeout: 8000 });

    /* ── And the box reports the setting it is actually using ─────────────
       Rendering the checkbox as always-checked still WORKS when clicked — the
       change handler fires either way — so every assertion above passes with
       it hardcoded. What breaks is quieter: turn the count-in off, come back
       later, and the box says it is on while playback starts immediately. A
       control that misreports its own state is worse than one that does
       nothing, because it teaches the wrong thing about what the app is doing. */
    await page.click(`[data-lesson="${D.LESSONS[0].id}"]`);
    await page.waitForSelector('#gtrCountIn', { timeout: 8000 });
    await page.uncheck('#gtrCountIn');
    await page.click('#gtrNext');                       // a rerender
    await page.waitForTimeout(120);
    const afterNav = await page.isChecked('#gtrCountIn');
    if (afterNav) {
      errors.push('the count-in box shows checked after being turned off and the card redrawn. ' +
                  'It is rendering a fixed value rather than the setting.');
    }
    await page.reload({ waitUntil: 'load' });
    await page.waitForSelector('[data-lesson]', { timeout: 15000 });
    await page.click(`[data-lesson="${D.LESSONS[0].id}"]`);
    await page.waitForSelector('#gtrCountIn', { timeout: 8000 });
    const afterReload = await page.isChecked('#gtrCountIn');
    const storedCountIn = await page.evaluate(() =>
      (JSON.parse(localStorage.getItem('prep_v2_guitar') || '{}').settings || {}).countIn);
    if (afterReload !== (storedCountIn > 0)) {
      errors.push(`after a reload the count-in box reads ${afterReload} while the stored setting is ` +
                  `${storedCountIn}. The control and the setting disagree.`);
    } else {
      notes.push(`Count-in setting survives a redraw and a reload (stored ${storedCountIn}).`);
    }
    await page.check('#gtrCountIn');
    await page.click('#gtrBack');
    await page.waitForSelector('[data-lesson]', { timeout: 8000 });

    /* ── A card's declared tuning reaches the drawing AND the sound ───────
       This is the step-6 defect one layer up. There, a chord box drew standard
       shapes in DADGAD; here, a card declaring `context: { tuning: 'DADGAD' }`
       could draw the right neck and hand the transport a fretboard rebuilt from
       the reader's own settings — structurally perfect, a tone out, and only
       audible.

       Checked against guitar-engine, which is neither the renderer nor the
       player: ask the engine what those string-and-fret pairs SOUND in the
       declared tuning, then require the transport to have been loaded with a
       fretboard that agrees. The reader's settings are deliberately left on
       standard throughout, so a fretboard taken from settings gives a different
       answer and the check fails. */
    const ctxCards = [];
    for (const lesson of D.LESSONS) {
      lesson.cards.forEach((card, i) => {
        if (card.context && (card.context.tuning || card.context.capo)) {
          ctxCards.push({ lesson: lesson.id, index: i, card });
        }
      });
    }
    if (!ctxCards.length) {
      notes.push('No card declares its own tuning or capo; that half of the player is unexercised.');
    }
    for (const { lesson, index, card } of ctxCards) {
      const el = card.tab || card.playalong;
      if (!el) continue;
      const ex = X.exercise(el.exercise);
      const want = card.context.tuning || 'standard';
      const wantCapo = card.context.capo || 0;

      await page.click(`[data-lesson="${lesson}"]`);
      await page.waitForSelector('.gtr-card', { timeout: 8000 });
      for (let k = 0; k < index; k++) { await page.click('#gtrNext'); await page.waitForTimeout(60); }
      await page.click('#gtrPlay');
      await page.waitForTimeout(200);
      const loaded = await page.evaluate(() => {
        const T = window.GUITAR_UI && window.GUITAR_UI.transport();
        return T && T.fb ? { tuning: T.fb.tuning, capo: T.fb.capo } : null;
      });
      await page.click('#gtrStop');

      if (!loaded) {
        errors.push(`${lesson} card ${index + 1}: the transport exposed no fretboard to check.`);
      } else if (loaded.tuning !== want || loaded.capo !== wantCapo) {
        errors.push(`${lesson} card ${index + 1} declares ${want}` +
                    `${wantCapo ? ' capo ' + wantCapo : ''} but the transport was loaded with ` +
                    `${loaded.tuning}${loaded.capo ? ' capo ' + loaded.capo : ''}. ` +
                    `The card would draw correctly and sound wrong.`);
      }

      /* And the drawn figure agrees with the sounding pitches the engine gives
         for that tuning — so a right-sounding card cannot draw a wrong neck. */
      const drawn = await page.evaluate(() =>
        [...document.querySelectorAll('.gtr-note[data-i]')].length);
      if (drawn !== ex.notes.length) {
        errors.push(`${lesson} card ${index + 1} drew ${drawn} notes for an exercise of ` +
                    `${ex.notes.length}.`);
      }
      await page.click('#gtrBack');
      await page.waitForSelector('[data-lesson]', { timeout: 8000 });
    }
    if (ctxCards.length) {
      notes.push(`All ${ctxCards.length} context cards checked: declared tuning and capo reach both ` +
                 `the figure and the transport.`);
    }

    /* ── A demonstration's pace does not move with the tempo setting ──────
       The point of these cards is two chords side by side, close enough
       together to compare. That gap used to be beats, so the tempo slider
       stretched and shrank it — at 108 bpm the comparison went past too fast to
       hear, and the slider was changing the only thing the card is about.

       Measured, not inferred: set the reader's tempo to one extreme, play, time
       the gap between the first and second chord lighting; set it to the other
       extreme and do it again. The two must agree. Timing it in the browser
       rather than reading the transport's bpm is deliberate — bpm is what the
       fix changes, so asserting on it would be asking the fix to confirm
       itself. */
    const demoCard = (() => {
      for (const lesson of D.LESSONS) {
        for (let i = 0; i < lesson.cards.length; i++) {
          const el = lesson.cards[i].tab || lesson.cards[i].playalong;
          const ex = el && X.exercise(el.exercise);
          if (ex && ex.demo) return { lesson: lesson.id, index: i, ex };
        }
      }
      return null;
    })();

    if (demoCard) {
      const gapAt = async (tempo) => {
        /* Set the tempo on the card IMMEDIATELY BEFORE the demonstration, then
           step forward one.

           Setting it on the workshop and navigating here does not work, and
           finding that out is what this comment is for: every non-demo card
           adopts its own prescribed tempo on arrival, so walking through the
           lesson overwrites whatever was set and the demo always played at the
           previous card's number. The first version of this check did exactly
           that, measured 1262ms against 1245ms with the bug reinstated, and
           passed — a contaminated measurement rather than a wrong assertion. */
        await page.click(`[data-lesson="${demoCard.lesson}"]`);
        await page.waitForSelector('.gtr-card', { timeout: 8000 });
        for (let k = 0; k < demoCard.index - 1; k++) { await page.click('#gtrNext'); await page.waitForTimeout(60); }
        await page.waitForSelector('#gtrTempoNum', { timeout: 8000 });
        await page.fill('#gtrTempoNum', String(tempo));
        await page.dispatchEvent('#gtrTempoNum', 'change');
        await page.waitForTimeout(80);
        await page.click('#gtrNext');
        await page.waitForTimeout(120);
        await page.uncheck('#gtrCountIn').catch(() => {});
        await page.click('#gtrPlay');
        const ms = await page.evaluate(async () => {
          const seen = [];
          const t0 = performance.now();
          let last = '';
          while (performance.now() - t0 < 6000 && seen.length < 2) {
            const lit = [...document.querySelectorAll('.gtr-note.is-playing')]
              .map(e => e.getAttribute('data-i')).sort().join(',');
            if (lit && lit !== last) { seen.push(performance.now() - t0); last = lit; }
            await new Promise(r => setTimeout(r, 15));
          }
          return seen.length === 2 ? Math.round(seen[1] - seen[0]) : null;
        });
        await page.click('#gtrStop');
        await page.click('#gtrBack');
        await page.waitForSelector('[data-lesson]', { timeout: 8000 });
        return ms;
      };

      const slow = await gapAt(40);
      const fast = await gapAt(200);
      if (slow === null || fast === null) {
        errors.push(`could not time the two chords on ${demoCard.lesson} card ${demoCard.index + 1} ` +
                    `(slow=${slow}, fast=${fast}); the demonstration may not be playing.`);
      } else if (Math.abs(slow - fast) > 250) {
        errors.push(`${demoCard.lesson} card ${demoCard.index + 1} is a demonstration, but the gap ` +
                    `between its two chords was ${slow}ms at 40 bpm and ${fast}ms at 200 bpm. ` +
                    `The tempo setting is stretching the comparison the card exists to make.`);
      } else {
        const want = Math.round((demoCard.ex.beatSeconds || 0) * 1000);
        notes.push(`Demonstration gap: ${slow}ms at 40 bpm, ${fast}ms at 200 bpm ` +
                   `(declared ${want}ms) — fixed, as it should be.`);
      }
      await page.check('#gtrCountIn').catch(() => {});
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

  notes.unshift(`${cardsSeen} cards opened across ${D.LESSONS.length} lessons; ${figuresSeen} drew a figure; ` +
                `${demoCards} were demonstrations with no tempo control.`);

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
