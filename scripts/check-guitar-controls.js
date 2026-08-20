#!/usr/bin/env node
/**
 * The guitar UI's controls are styled, and the tempo control behaves.
 *
 * TWO GATES, because they fail in two different ways.
 *
 * 1. STYLING (no browser needed). Every gtr-* class guitar-ui.js writes into
 *    the DOM has a rule in guitar-styles.css. A class with no rule renders as
 *    unstyled markup rather than as an error, so nothing else in the suite
 *    would notice — and the render sweep counts characters, which an unstyled
 *    control still produces plenty of. Catches the rename that updates one file
 *    and not the other.
 *
 * 2. TEMPO (browser). The tempo control was rebuilt because a 120 px slider
 *    across 160 bpm is a bpm and a third per pixel, so choosing 96 rather than
 *    95 was luck. It is now three controls writing one value, and the failure
 *    mode of that arrangement is them disagreeing. Specifically:
 *
 *      - typing is not fought. Clamping every keystroke turns the "1" on the
 *        way to "120" into "30", so the field fights the hand holding it.
 *      - the slider tracks the number, and the number tracks the slider.
 *      - the step buttons move by exactly one, not by the slider's idea of a
 *        step or by two through a doubled listener.
 *      - the value survives a reload, since it is a saved setting.
 *      - out-of-range input resolves on commit rather than persisting a tempo
 *        that cannot play.
 *
 * Run: node scripts/check-guitar-controls.js   (exit 1 on any failure)
 */

'use strict';

const fs = require('fs');
const path = require('path');
const http = require('http');
const ROOT = path.join(__dirname, '..');

const RED = '\x1b[31m', GREEN = '\x1b[32m', DIM = '\x1b[2m', BOLD = '\x1b[1m', YEL = '\x1b[33m', RESET = '\x1b[0m';
const errors = [];
const notes = [];

/* ── 1. Every emitted gtr-* class is styled ──────────────────────────────── */
const ui = fs.readFileSync(path.join(ROOT, 'guitar-ui.js'), 'utf8');
const css = fs.readFileSync(path.join(ROOT, 'guitar-styles.css'), 'utf8');

/* Classes as they appear in the markup this file builds: class="a b c". */
const emitted = new Set();
for (const m of ui.matchAll(/class="([^"]*)"/g)) {
  for (const cls of m[1].split(/\s+/)) if (/^gtr-/.test(cls)) emitted.add(cls);
}
/* And the ones the renderer is handed via its own attributes. */
const styled = new Set([...css.matchAll(/\.(gtr-[\w-]+)/g)].map(m => m[1]));

const unstyled = [...emitted].filter(c => !styled.has(c)).sort();
if (unstyled.length) {
  errors.push(`${unstyled.length} class(es) written into the DOM with no rule in guitar-styles.css: ` +
              unstyled.join(', ') + '. They render as unstyled markup, which nothing else here would catch.');
}
notes.push(`${emitted.size} gtr-* classes emitted, ${styled.size} styled.`);

/* The reverse is not an error — the renderer emits classes this file never
   names — but a rule for a class nothing anywhere writes is dead weight.
   Matched loosely, on any gtr- token in either file rather than on class
   attributes: guitar-render.js passes class names to helpers as arguments
   (`text(tx, ty, shown, 'gtr-tab-fret')`), so attribute matching reported two
   dozen live classes as dead. Loose is the safe direction here — it can only
   suppress a dead-code note, never invent a styling failure. */
const render = fs.existsSync(path.join(ROOT, 'guitar-render.js'))
  ? fs.readFileSync(path.join(ROOT, 'guitar-render.js'), 'utf8') : '';
const anywhere = new Set([...emitted]);
for (const src of [ui, render]) {
  for (const m of src.matchAll(/\bgtr-[\w-]+/g)) anywhere.add(m[0]);
}
/* And classes assembled at runtime. svgWrap builds `esc(cls) + '-svg'`, so
   gtr-tab-svg exists in the DOM without ever existing as a literal. Any
   suffix concatenated onto a class expression is applied to every known
   class; over-generous by design, for the same reason as above — the cost of
   a miss here is a live rule reported as dead and then deleted. */
const suffixes = new Set([...render.matchAll(/\+\s*'(-[\w-]+)/g)].map(m => m[1]));
for (const base of [...anywhere]) {
  for (const suf of suffixes) anywhere.add(base + suf);
}
const dead = [...styled].filter(c => !anywhere.has(c)).sort();
if (dead.length) notes.push(`Styled but never emitted (harmless, but dead): ${dead.join(', ')}.`);

/* ── 2. The tempo control, in a real browser ─────────────────────────────── */
let chromium;
try { ({ chromium } = require('playwright')); }
catch (e) {
  if (process.env.REQUIRE_PLAYWRIGHT) {
    errors.push('REQUIRE_PLAYWRIGHT is set but Playwright is not installed, so the tempo control was not exercised.');
  } else {
    notes.push('Playwright not installed — the tempo behaviour half was skipped.');
  }
  report();
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

function report() {
  console.log(`${BOLD}guitar controls${RESET}\n`);
  notes.forEach(n => console.log(`  ${DIM}${n}${RESET}`));
  console.log('');
  if (errors.length) {
    errors.forEach(e => console.log(`  ${RED}✗${RESET}  ${e}`));
    console.log(`\n${RED}${BOLD}${errors.length} failure(s).${RESET}\n`);
    process.exit(1);
  }
  console.log(`  ${GREEN}✓  controls are styled and the tempo reads back what it was given${RESET}\n`);
  process.exit(0);
}

(async () => {
  const { server, port } = await serve();
  const CANDIDATES = [
    '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell',
    '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
  ].filter(p => fs.existsSync(p));
  const browser = await chromium.launch(CANDIDATES.length ? { executablePath: CANDIDATES[0] } : {});

  try {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    await page.addInitScript(() => localStorage.setItem('multisubject_active', 'guitar'));
    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'load' });
    await page.waitForSelector('#gtrTempoNum', { timeout: 15000 });

    const read = () => page.evaluate(() => ({
      num: document.querySelector('#gtrTempoNum').value,
      range: document.querySelector('#gtrTempo').value,
      saved: (JSON.parse(localStorage.getItem('prep_v2_guitar') || '{}').settings || {}).tempo
    }));

    /* -- typing is not fought -------------------------------------------
       The observable is the SLIDER, not the number field. A half-typed "1" on
       the way to "120" is a legal number and clamps to the floor; the field
       itself is excluded from the write-back, so it keeps showing what was
       typed either way and proves nothing. What lurches is everything the
       number drives — the slider jumps to 30, storage records it, and a
       playing transport audibly drops to a crawl and back on every keystroke.
       So: type one digit, and check nothing downstream moved. */
    const start = await read();
    const startRange = start.range;
    /* Undefined on a first load: nothing has called save() yet, so there is no
       stored settings object. Compared as "unchanged" rather than as a number,
       because "no tempo saved" is a legitimate starting state. */
    const startSaved = start.saved;
    await page.click('#gtrTempoNum');
    await page.evaluate(() => { document.querySelector('#gtrTempoNum').select(); });
    await page.keyboard.press('1');
    let s = await read();
    if (s.range !== startRange) {
      errors.push(`a single keystroke on the way to a three-digit tempo moved the slider from ` +
                  `${startRange} to ${s.range}. Each digit is being applied as it lands, so typing ` +
                  `"120" drags the tempo to the floor and back before it arrives.`);
    }
    if (s.saved !== startSaved) {
      errors.push(`a single keystroke changed the stored tempo from ${startSaved} to ${s.saved}; ` +
                  `a half-typed number is not a tempo.`);
    }
    notes.push(`One digit typed: slider held at ${s.range}, storage at ${s.saved}.`);

    await page.keyboard.type('20', { delay: 30 });
    s = await read();
    if (s.num !== '120') {
      errors.push(`typing "120" left the field reading "${s.num}" — something is rewriting the box ` +
                  `while it is being typed into.`);
    }
    await page.keyboard.press('Enter');
    s = await read();
    if (s.range !== '120') errors.push(`after typing 120, the slider reads ${s.range}.`);
    if (s.saved !== 120)   errors.push(`after typing 120, the saved tempo is ${s.saved}.`);
    notes.push(`Typed 120 → number ${s.num}, slider ${s.range}, saved ${s.saved}.`);

    /* -- the step buttons move by exactly one --------------------------- */
    await page.click('#gtrTempoUp');
    s = await read();
    if (Number(s.num) !== 121) errors.push(`+1 from 120 gave ${s.num}, not 121.`);
    if (s.range !== s.num)     errors.push(`+1 left the slider at ${s.range} and the number at ${s.num}.`);
    await page.click('#gtrTempoDown');
    await page.click('#gtrTempoDown');
    s = await read();
    if (Number(s.num) !== 119) errors.push(`two presses of −1 from 121 gave ${s.num}, not 119.`);
    if (s.saved !== 119)       errors.push(`stepping did not save: storage holds ${s.saved}, the field ${s.num}.`);
    notes.push(`Stepped +1 then −1 twice from 120 → ${s.num}, saved ${s.saved}.`);

    /* -- the number tracks the slider ----------------------------------- */
    await page.evaluate(() => {
      const r = document.querySelector('#gtrTempo');
      r.value = 76;
      r.dispatchEvent(new Event('input', { bubbles: true }));
    });
    s = await read();
    if (s.num !== '76')  errors.push(`dragging the slider to 76 left the number at ${s.num}.`);
    if (s.saved !== 76)  errors.push(`dragging the slider to 76 saved ${s.saved}.`);

    /* -- out of range resolves on commit -------------------------------- */
    await page.evaluate(() => {
      const n = document.querySelector('#gtrTempoNum');
      n.value = '999';
      n.dispatchEvent(new Event('change', { bubbles: true }));
    });
    s = await read();
    if (Number(s.num) > 240) {
      errors.push(`999 bpm was accepted (field reads ${s.num}). It should resolve to the maximum on commit.`);
    }
    notes.push(`999 committed → ${s.num}; slider ${s.range}.`);

    /* -- clearing the box to retype does not drop the tempo -------------- */
    await page.evaluate(() => {
      const n = document.querySelector('#gtrTempoNum');
      n.value = '';
      n.dispatchEvent(new Event('change', { bubbles: true }));
    });
    s = await read();
    if (Number(s.num) < 60) {
      errors.push(`clearing the tempo box and leaving it dropped the tempo to ${s.num}. An empty field ` +
                  `parses as 0 and clamps to the floor unless it is treated as "no change".`);
    }
    notes.push(`Cleared and committed → held at ${s.num}.`);

    /* -- the number fits its box at every tempo --------------------------
       box-sizing is border-box site-wide, so a width in ch is spent on padding
       and border before any digits get it. The first version of this control
       clipped "137" — visible on a phone, invisible to every other check here,
       since an overflowing field still renders and still reports the right
       value. Measured rather than eyeballed: scrollWidth exceeding clientWidth
       is the browser saying the content does not fit. */
    const fit = await page.evaluate(async () => {
      const n = document.querySelector('#gtrTempoNum');
      const bad = [];
      for (const v of [30, 88, 100, 137, 199, 240]) {
        n.value = String(v);
        n.dispatchEvent(new Event('input', { bubbles: true }));
        /* Let layout settle before measuring. */
        await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
        if (n.scrollWidth > n.clientWidth) {
          bad.push({ v, scroll: n.scrollWidth, client: n.clientWidth });
        }
      }
      return { bad, box: n.getBoundingClientRect().width };
    });
    if (fit.bad.length) {
      const w = fit.bad[0];
      errors.push(`the tempo reads past its box: at ${w.v} bpm the content is ${w.scroll}px wide in a ` +
                  `${w.client}px field (${fit.bad.length} of 6 tempos tested overflow).`);
    }
    notes.push(`Tempo field ${Math.round(fit.box)}px wide; 30–240 bpm all fit.`);

    /* -- nothing in a chord box overlaps anything else --------------------
       The chord name and the open/muted markers are two rows of text stacked
       above the nut, positioned independently. At the original padTop they
       overlapped: "A7" and "Asus4" ran into the circles above the third and
       fourth strings. Structurally the SVG was perfect and every other check
       passed — the collision only exists once a font renders.

       So it is measured the way a reader sees it, with getBBox on the live
       elements, across every chord the panel can show. Text-versus-text only:
       dots deliberately sit on string lines and frets. */
    const collisions = await page.evaluate(() => {
      const out = [];
      for (const box of document.querySelectorAll('.gtr-chordbox-svg')) {
        const name = box.querySelector('.gtr-cb-name');
        const marks = [...box.querySelectorAll('.gtr-cb-mark, .gtr-cb-basefret')];
        if (!name || !marks.length) continue;
        const a = name.getBBox();
        for (const m of marks) {
          const b = m.getBBox();
          const overlapX = Math.min(a.x + a.width,  b.x + b.width)  - Math.max(a.x, b.x);
          const overlapY = Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y);
          if (overlapX > 0.5 && overlapY > 0.5) {
            out.push({
              chord: name.textContent.trim(),
              mark: m.textContent.trim(),
              x: +overlapX.toFixed(1), y: +overlapY.toFixed(1)
            });
          }
        }
      }
      return out;
    });
    if (collisions.length) {
      const c = collisions[0];
      errors.push(`${collisions.length} overlapping label(s) in the chord boxes: the name "${c.chord}" ` +
                  `runs into the "${c.mark}" marker by ${c.x}×${c.y}px. Two rows of text above the nut ` +
                  `are positioned independently and have drifted into each other.`);
    }
    notes.push(`Chord-box labels: no overlap between names and markers.`);

    /* -- the playback cursor lights the note that is sounding -------------
       The claim is "each note lights up at the same time it plays", so what
       has to be measured is WHEN each note lights, against a clock that does
       not come from the code being tested.

       An earlier version of this check compared the lit element against
       transport.currentIndex() every 25ms. It passed, and it was worthless: an
       off-by-one planted inside currentIndex() moved both sides of the
       comparison together, so the check could not see it. Asking the cursor
       whether it agrees with itself is not a test.

       So this records the transitions — which note lit, and at what wall-clock
       moment — and compares them against times computed here from the tempo,
       the count-in and each note's own beat. Those come from the notes array
       and the settings, which are data; nothing in the expectation is produced
       by the indexing logic under test. An off-by-one now shows up as note 1
       lighting when note 0 was due, and a drifting cursor as a growing error. */
    const cursor = await page.evaluate(async () => {
      const wait = ms => new Promise(r => setTimeout(r, ms));
      const A = window.GuitarAudio;
      if (!A || !A.ready()) return { skipped: 'no Web Audio in this browser' };

      const BPM = 200, COUNT_IN = 4;
      const num = document.querySelector('#gtrTempoNum');
      num.value = String(BPM);
      num.dispatchEvent(new Event('change', { bubbles: true }));

      const litNow = () => {
        const set = [...new Set([...document.querySelectorAll('.gtr-note.is-playing')]
          .map(g => +g.getAttribute('data-i')))];
        return set.length === 0 ? -1 : (set.length === 1 ? set[0] : -2);  // -2: more than one
      };
      /* What the lit note says it is, on the tab. Timing alone cannot catch a
         figure drawn in a different order from the array the transport plays:
         the indices would still light in sequence at the right moments while
         pointing at the wrong notes on screen. Reading the digit back and
         comparing it to the transport's own note closes that. */
      const litFret = () => {
        const t = document.querySelector('.gtr-tab-svg .gtr-note.is-playing .gtr-tab-fret');
        return t ? t.textContent.trim() : null;
      };
      /* And what the NECK says it is. Both figures are checked because they
         number their notes independently: the tab sorts its own copy, the neck
         diagram used not to, and a cursor can be right in one and wrong in the
         other. Agreeing with the transport separately is the only way to know
         they agree with each other. */
      const litName = () => {
        const t = document.querySelector('.gtr-neck-svg .gtr-note.is-playing .gtr-nk-label');
        return t ? t.textContent.trim() : null;
      };

      const t0 = performance.now();
      document.querySelector('#gtrPlay').click();

      const transitions = [];
      let last = litNow();
      let multiple = 0;
      while (performance.now() - t0 < 4200 && transitions.length < 10) {
        await wait(8);
        const cur = litNow();
        if (cur === -2) multiple++;
        if (cur !== last) {
          transitions.push({ i: cur, t: performance.now() - t0, fret: litFret(), name: litName() });
          last = cur;
        }
      }
      const T = window.GUITAR_UI && window.GUITAR_UI.transport();
      const beats = T ? T.notes.map(n => n.beat) : [];
      /* The fret each index SHOULD be showing, straight off the transport's
         own notes — the array it actually schedules from. */
      const E2 = window.GuitarEngine;
      const wantFrets = (T && E2) ? T.notes.map(n => String(E2.displayFret(n, T.fb))) : [];
      const wantNames = (T && E2) ? T.notes.map(n => E2.midiToName(E2.soundingMidi(n, T.fb))) : [];
      const ctx = A.context();
      const latency = (ctx && (ctx.outputLatency || ctx.baseLatency)) || 0;

      document.querySelector('#gtrStop').click();
      await wait(80);
      const afterStop = document.querySelectorAll('.gtr-note.is-playing').length;

      return { transitions, multiple, beats, wantFrets, wantNames, latency, afterStop, BPM, COUNT_IN,
               total: document.querySelectorAll('.gtr-note[data-i]').length };
    });

    if (cursor.skipped) {
      notes.push(`Playback cursor not exercised: ${cursor.skipped}.`);
    } else {
      const lights = cursor.transitions.filter(x => x.i >= 0);
      const spb = 60 / cursor.BPM;
      /* play() schedules from currentTime + 0.06, and the cursor is offset by
         the output latency; both shift every expected time equally. */
      const offsetMs = (cursor.COUNT_IN * spb + 0.06 + cursor.latency) * 1000;
      /* One rAF frame, one 8ms sample, and the click-to-play gap. Generous
         enough not to flake, far tighter than a whole note (300ms here). */
      const TOL = 110;

      if (!lights.length) {
        errors.push('no note ever lit during playback — the cursor does not run at all.');
      } else {
        if (lights[0].i !== 0) {
          errors.push(`the first note to light was ${lights[0].i}, not 0. The cursor starts on the ` +
                      `wrong note, so every highlight after it names the wrong one too.`);
        }
        const worst = { err: 0 };
        for (const L of lights) {
          if (cursor.beats[L.i] === undefined) {
            errors.push(`note ${L.i} lit, but the transport holds only ${cursor.beats.length} notes.`);
            continue;
          }
          const want = offsetMs + cursor.beats[L.i] * spb * 1000;
          const err = L.t - want;
          if (Math.abs(err) > Math.abs(worst.err)) { worst.err = err; worst.i = L.i; worst.t = L.t; worst.want = want; }
        }
        if (Math.abs(worst.err) > TOL) {
          errors.push(`note ${worst.i} lit ${Math.round(worst.t)}ms after Play but was due at ` +
                      `${Math.round(worst.want)}ms — ${worst.err > 0 ? 'late' : 'early'} by ` +
                      `${Math.round(Math.abs(worst.err))}ms, past the ${TOL}ms tolerance. ` +
                      `The highlight is not landing with the note it names.`);
        }
        /* The lit note on screen must BE the note the transport is playing.
           Checked by reading the digit back off the tab and comparing it with
           the fret of the transport's own note at that index. Catches figures
           rendered from a differently ordered array — where the highlight
           marches along in perfect time, landing on the wrong notes. */
        const wrongNote = lights.find(L =>
          L.fret !== null && cursor.wantFrets[L.i] !== undefined && L.fret !== cursor.wantFrets[L.i]);
        if (wrongNote) {
          errors.push(`the cursor lit a tab digit reading "${wrongNote.fret}" while the transport was ` +
                      `playing fret ${cursor.wantFrets[wrongNote.i]} at that index. The figures and the ` +
                      `transport disagree about which note is which — the highlight keeps perfect time ` +
                      `on the wrong notes.`);
        }

        const wrongName = lights.find(L =>
          L.name !== null && cursor.wantNames[L.i] !== undefined && L.name !== cursor.wantNames[L.i]);
        if (wrongName) {
          errors.push(`the neck diagram lit "${wrongName.name}" while the transport was playing ` +
                      `${cursor.wantNames[wrongName.i]}. The two figures number their notes ` +
                      `differently, so the cursor cannot be right in both.`);
        }

        /* Consecutive and in order: a skip or a repeat means the index search
           is not walking the notes the way the transport plays them. */
        for (let k = 1; k < lights.length; k++) {
          if (lights[k].i !== lights[k - 1].i + 1) {
            errors.push(`the cursor went from note ${lights[k - 1].i} to ${lights[k].i}; ` +
                        `a scale run should light every note once, in order.`);
            break;
          }
        }
        notes.push(`Cursor: ${lights.length} notes lit in order from 0, worst timing error ` +
                   `${Math.round(worst.err)}ms against a ${Math.round(spb * 1000)}ms beat` +
                   (cursor.latency ? `, output latency ${Math.round(cursor.latency * 1000)}ms` : '') + '.');
      }
      /* Nothing may be lit before the count-in ends: the first transition away
         from "nothing lit" must not arrive early. */
      if (lights.length && lights[0].t < offsetMs - TOL) {
        errors.push(`a note lit ${Math.round(lights[0].t)}ms after Play, before the ` +
                    `${Math.round(offsetMs)}ms count-in had finished. Nothing is sounding yet.`);
      }
      if (cursor.multiple) {
        errors.push(`${cursor.multiple} sample(s) had more than one note lit at once — ` +
                    `the previous highlight is not being cleared.`);
      }
      if (cursor.afterStop) errors.push(`${cursor.afterStop} note(s) stayed lit after Stop.`);
    }

    /* -- and it survives a reload --------------------------------------- */
    const before = (await read()).saved;
    await page.reload({ waitUntil: 'load' });
    await page.waitForSelector('#gtrTempoNum', { timeout: 15000 });
    s = await read();
    if (Number(s.num) !== before) {
      errors.push(`tempo was ${before} before a reload and ${s.num} after — a saved setting that does not come back.`);
    }
    notes.push(`Reload: ${before} → ${s.num}.`);
  } finally {
    await browser.close();
    server.close();
  }
  report();
})();
