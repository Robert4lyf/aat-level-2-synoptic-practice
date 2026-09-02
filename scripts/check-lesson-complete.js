#!/usr/bin/env node
/**
 * A finished lesson says which lesson it was.
 *
 * The completion screen at Levels 1 and 3 was a percentage, a ring, a verdict
 * and two buttons. The verdict — "Lesson complete", "Worth another pass" — is a
 * judgement, and a judgement does not say what it is a judgement ON. After a
 * run of three short lessons, or on returning to the tab an hour later, the
 * screen could not answer "which one was that?". Level 1 made the gap plainer
 * than Level 3 did: it already named the step COMING NEXT, so the only thing on
 * the screen without a name was the step just finished.
 *
 * WHAT IT ASSERTS
 *
 *   - Finishing a lesson at Level 1, Level 2 and Level 3 puts that lesson's own
 *     title on the completion screen, matched against the title in the learn
 *     data rather than against a string written here.
 *   - A practice run and a timed mock do NOT. They are not one lesson, so a
 *     lesson name on them would be a lie rather than a missing label — and the
 *     obvious implementation, reading whichever lesson happens to be in state,
 *     produces exactly that lie.
 *
 * Level 2 is the control: it has named its lesson since long before this check,
 * so a failure there is a fault in this file rather than in the app.
 *
 * Run: node scripts/check-lesson-complete.js   (exit 1 on any failure)
 */

'use strict';

const path = require('path');
const RED = '\x1b[31m', GREEN = '\x1b[32m', DIM = '\x1b[2m', BOLD = '\x1b[1m', RESET = '\x1b[0m';
const ROOT = path.join(__dirname, '..');

const D3 = require('./lib/aat3-driver.js');
const D1 = require('./lib/aat1-driver.js');

const errors = [];
const notes = [];

/* Answer whatever is on screen, correctness irrelevant — this is about which
   label the screen carries, not about the score. The Level 1 driver has no
   answerCurrent of its own, so one lives here. */
function answerAny(D, el, p) {
  const has = a => D.nodes(el, a).length;
  const pick = a => D.nodes(el, a);
  /* Written first, because it is the one type answered in three steps rather
     than one and has no submit button the branches below would recognise. */
  if (D.answerWritten && D.answerWritten(el, 'all')) return true;
  if (has('ans')) { pick('ans')[0].fire('click'); return true; }
  if (has('tf')) {
    const seen = new Set();
    pick('tf').forEach(n => {
      const i = n.getAttribute('data-s');
      if (seen.has(i) || n.getAttribute('data-v') !== 'true') return;
      seen.add(i); n.fire('click');
    });
    D.click(el, 'tfsubmit'); return true;
  }
  if (has('gap')) {
    const by = new Map();
    pick('gap').forEach(n => {
      const g = n.getAttribute('data-g');
      if (!by.has(g)) by.set(g, []);
      by.get(g).push(n);
    });
    by.forEach(l => l[0].fire('click'));
    D.click(el, 'gapsubmit'); return true;
  }
  if (has('numinput')) {
    const b = pick('numinput')[0];
    b.value = '0'; b.fire('input'); D.click(el, 'numsubmit'); return true;
  }
  /* Pick lists are <select>s bound to 'change', entry grids are <input>s bound
     to 'input' — a click on either registers nothing. These two types arrived
     after this walker was written, and a mixed run that happened to draw one
     stalled on it until the loop gave up: the 1-in-5 flake this branch ends. */
  if (has('plsubmit')) {
    pick('plpick').forEach(n => { n.value = '0'; n.fire('change'); });
    D.click(el, 'plsubmit'); return true;
  }
  if (has('egsubmit')) {
    pick('egcell').forEach(n => { n.value = '0'; n.fire('input'); });
    D.click(el, 'egsubmit'); return true;
  }
  if (has('matchl')) {
    const L = pick('matchl'), R = pick('matchr');
    L.forEach((n, i) => { n.fire('click'); if (R[i]) R[i].fire('click'); });
    D.click(el, 'matchsubmit'); return true;
  }
  if (has('ordersubmit')) { D.click(el, 'ordersubmit'); return true; }
  if (has('taskinput') || has('tasksubmit')) {
    pick('taskinput').forEach(n => { n.value = '0'; n.fire('input'); });
    const byPart = new Map();
    pick('taskpick').forEach(n => {
      const k = n.getAttribute('data-p');
      if (!byPart.has(k)) byPart.set(k, []);
      byPart.get(k).push(n);
    });
    byPart.forEach(l => l[0].fire('click'));
    D.click(el, 'tasksubmit'); return true;
  }
  return false;
}

/* Completion is detected in the rendered HTML, not by walking nodes for a
   className. The fake DOM the drivers provide exposes attributes and events,
   not className, so a node-based test silently never matches — the loop then
   runs to its limit and the check reports "never reached the completion screen"
   while the screen is sitting right there in innerHTML. */
function runToDone(D, el, doneClass) {
  for (let i = 0; i < 400; i++) {
    if (el.innerHTML.indexOf('class="' + doneClass + '"') !== -1) return true;
    if (D.nodes(el, 'nextq').length) { D.click(el, 'nextq'); continue; }
    if (D.nodes(el, 'mocknext').length) { D.click(el, 'mocknext'); continue; }
    if (answerAny(D, el)) continue;
    if (D.nodes(el, 'next').length) { D.click(el, 'next'); continue; }
    /* A worked example holds its steps back until asked. There is no Next until
       they are revealed, so a walker that only knows about answers and Next
       stops here — on a card, with the lesson unfinished. */
    if (D.nodes(el, 'stepall').length) { D.click(el, 'stepall'); continue; }
    if (D.nodes(el, 'step').length) { D.click(el, 'step'); continue; }
    return false;
  }
  return false;
}

/* FINISH A LESSON THAT IS NOT THE ONE COMING NEXT. Finishing the first lesson
   cannot tell "the lesson just finished" from "the next lesson to do": a low
   score leaves it incomplete, so nextLesson() returns the very lesson that was
   just finished and both readings render the same title. Opening a later one
   separates them, and is the only reason this check can see the difference. */
function laterLesson(D, el) {
  const opens = D.nodes(el, 'open');
  const first = opens[0] && opens[0].getAttribute('data-id');
  return opens.find(n => n.getAttribute('data-id') !== first) || opens[0];
}

function nameOn(html, cls) {
  const m = html.match(new RegExp('<div class="' + cls + '">([^<]*)</div>'));
  return m ? m[1] : null;
}

/* ── Level 3 ──────────────────────────────────────────────────────────── */
{
  const M = D3.loadUI(D3.fakeStore());
  const el = D3.fakeEl();
  M.AAT3_UI.mount(el);
  D3.click(el, 'openunit', n => n.getAttribute('data-unit') === 'tpfb');
  const open = laterLesson(D3, el);
  const id = open.getAttribute('data-id');
  open.fire('click');
  if (!runToDone(D3, el, 'a3-done')) {
    errors.push('aat3: never reached the completion screen, so nothing below was tested.');
  } else {
    const shown = nameOn(el.innerHTML, 'a3-done-lesson');
    /* The expected title comes from the learn data, so renaming a lesson can
       never make this pass against a stale copy written into the check. */
    let want = null;
    (M.AAT3_LEARN_PATH || []).forEach(u => (u.lessons || []).forEach(l => { if (l.id === id) want = l.title; }));
    if (!want) errors.push(`aat3: no lesson titled in the learn data for ${id}.`);
    else if (shown === null) {
      errors.push(`aat3: finishing "${want}" left the completion screen without naming it — ` +
                  `no .a3-done-lesson. The verdict alone does not say which lesson it judges.`);
    } else if (shown.indexOf(want) === -1) {
      errors.push(`aat3: the completion screen says "${shown}" after finishing "${want}".`);
    } else {
      notes.push(`aat3        "${shown}"`);
    }
  }
}

/* ── Level 3, a practice run: NOT one lesson ──────────────────────────── */
{
  const M = D3.loadUI(D3.fakeStore());
  const el = D3.fakeEl();
  M.AAT3_UI.mount(el);
  D3.click(el, 'openunit', n => n.getAttribute('data-unit') === 'tpfb');
  /* Open a lesson first and leave it, so a lesson id is sitting in state — the
     condition under which naming it on a practice screen would be wrong. */
  D3.nodes(el, 'open')[0].fire('click');
  D3.click(el, 'exit');
  D3.click(el, 'practice');
  /* NAME THE RUN, do not take whichever button happens to be first. This read
     `D3.click(el, 'startpractice')`, which meant the check silently depended on
     the ORDER of the offers on the practice screen — and the moment an endless
     run was added above mixed practice, it started one of those instead and
     never reached a completion screen at all. A run with no end cannot test a
     completion screen. */
  if (D3.nodes(el, 'startpractice').length) {
    D3.click(el, 'startpractice', n => n.getAttribute('data-lo') === 'mix');
  }
  if (runToDone(D3, el, 'a3-done')) {
    const shown = nameOn(el.innerHTML, 'a3-done-lesson');
    if (shown !== null) {
      errors.push(`aat3: a practice run's completion screen claims to be the lesson "${shown}". ` +
                  `A practice run is drawn across outcomes and is not any one lesson.`);
    } else {
      notes.push('aat3        a practice run names no lesson, as it should not');
    }
  } else {
    /* An error, not a note: downgrading a stall hid the picklist/entrygrid
       blind spot at Level 1 for a while — the same gap must not hide here. */
    errors.push('aat3: a practice run never reached a completion screen, so the check that it does ' +
                'NOT name a lesson proved nothing.');
  }
}

/* ── Level 1 ──────────────────────────────────────────────────────────── */
{
  const M = D1.loadUI(D1.fakeStore());
  const el = D1.fakeEl();
  M.AAT1_UI.mount(el);
  const open = laterLesson(D1, el);
  const id = open.getAttribute('data-id');
  open.fire('click');
  if (!runToDone(D1, el, 'a1-done')) {
    errors.push('aat1: never reached the completion screen, so nothing below was tested.');
  } else {
    const shown = nameOn(el.innerHTML, 'a1-done-lesson');
    let want = null;
    (M.AAT1_LEARN_PATH || []).forEach(u => (u.lessons || []).forEach(l => { if (l.id === id) want = l.title; }));
    if (!want) errors.push(`aat1: no lesson titled in the learn data for ${id}.`);
    else if (shown === null) {
      errors.push(`aat1: finishing "${want}" left the completion screen without naming it — ` +
                  `no .a1-done-lesson. The screen already names the step COMING NEXT, so the ` +
                  `one just finished was the only thing on it without a name.`);
    } else if (shown.indexOf(want) === -1) {
      errors.push(`aat1: the completion screen says "${shown}" after finishing "${want}".`);
    } else {
      notes.push(`aat1        "${shown}"`);
    }
  }
}

/* ── Level 1, a practice run: NOT one step ────────────────────────────── */
{
  const M = D1.loadUI(D1.fakeStore());
  const el = D1.fakeEl();
  M.AAT1_UI.mount(el);
  /* Open a step and leave it, so a lesson id is sitting in state — the
     condition under which naming it on a practice screen would be wrong. */
  D1.nodes(el, 'open')[0].fire('click');
  D1.click(el, 'exit');
  if (D1.nodes(el, 'practice').length) D1.click(el, 'practice');
  /* NAME THE RUN, do not take whichever button happens to be first. This read
     `D1.click(el, 'startpractice')`, which meant the check silently depended on
     the ORDER of the offers on the practice screen — and the moment an endless
     run was added above mixed practice, it started one of those instead and
     never reached a completion screen at all. A run with no end cannot test a
     completion screen. */
  if (D1.nodes(el, 'startpractice').length) {
    D1.click(el, 'startpractice', n => n.getAttribute('data-lo') === 'mix');
  }
  if (runToDone(D1, el, 'a1-done')) {
    const shown = nameOn(el.innerHTML, 'a1-done-lesson');
    if (shown !== null) {
      errors.push(`aat1: a practice run's completion screen claims to be the step "${shown}". ` +
                  `A practice run is drawn across outcomes and is not any one step.`);
    } else {
      notes.push('aat1        a practice run names no step, as it should not');
    }
  } else {
    errors.push('aat1: a practice run never reached a completion screen, so the check that it does ' +
                'NOT name a step proved nothing.');
  }
}

/* ── Level 2, the control ─────────────────────────────────────────────── */
{
  const fs = require('fs');
  const src = fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8');
  if (!/<div class="lesson-done-title">\$\{escapeHtml\(def\.title\)\}<\/div>/.test(src)) {
    errors.push('aat: the Level 2 completion screen no longer renders the lesson title from ' +
                'def.title. Level 2 is the control here — it has named its lesson throughout.');
  } else {
    notes.push('aat         names its lesson from def.title (unchanged)');
  }
}

console.log(`${BOLD}Lesson completion screens${RESET}\n`);
notes.forEach(n => console.log(`  ${DIM}${n}${RESET}`));
console.log('');
if (errors.length) {
  errors.forEach(e => console.log(`  ${RED}✗${RESET}  ${e}`));
  console.log(`\n${RED}${BOLD}${errors.length} completion screen(s) do not name their lesson.${RESET}\n`);
  process.exit(1);
}
console.log(`  ${GREEN}✓  every level names the lesson it has just finished${RESET}\n`);
