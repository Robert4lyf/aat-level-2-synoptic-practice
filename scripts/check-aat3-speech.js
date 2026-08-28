#!/usr/bin/env node
/**
 * Does the read-aloud button say the card, and stop when it should?
 *
 * This is a trial on one lesson, and two things about it are worth guarding
 * even at that size.
 *
 * WHAT IS SPOKEN IS A DECISION, NOT A SIDE EFFECT. Only the prose is read: the
 * heading, the paragraphs, the callout and the exam trap. Tables are passed
 * over in silence, and the remaining structural elements are announced rather
 * than read, because a formula spoken aloud becomes "gross equals net times one
 * point two zero". None of that is visible from the screen — a listener cannot
 * tell a table deliberately skipped from a table that failed to render — so it
 * is asserted here against the card's own data.
 *
 * SPEECH OUTLIVES THE SCREEN THAT STARTED IT. This is the same shape as the
 * mock clock, which went on ticking under another subject until suspend() was
 * given something to call. A voice reading VAT legislation over Français is the
 * same defect with a louder failure mode, so every exit is checked: the Home
 * button, a subject switch, leaving the lesson, and moving between cards.
 *
 * The module reaches the speech engine through `root` rather than `window`,
 * which is what lets this hand it a stub and assert what was said and when it
 * was cancelled. Against the real API none of that would be observable.
 *
 * Run: node scripts/check-aat3-speech.js   (exit 1 on any failure)
 */

'use strict';

const D = require('./lib/aat3-driver.js');

const RED = '\x1b[31m', GREEN = '\x1b[32m', DIM = '\x1b[2m', BOLD = '\x1b[1m', RESET = '\x1b[0m';

let failures = 0, checks = 0;
function ok(cond, label) {
  checks++;
  if (!cond) { failures++; console.log(`  ${RED}✗${RESET} ${label}`); }
}

console.log(`${BOLD}AAT Level 3 read-aloud${RESET}\n`);

/* A stand-in for the Web Speech API that records rather than speaks. */
function fakeSpeech() {
  const spoken = [];
  let cancels = 0;
  const engine = {
    spoken, get cancels() { return cancels; },
    getVoices: () => ([{ lang: 'en-GB', name: 'Stub GB' }, { lang: 'en-US', name: 'Stub US' }]),
    cancel() { cancels++; },
    speak(u) { spoken.push(u); u._queued = true; },
  };
  function Utterance(text) { this.text = text; }
  return { engine, Utterance };
}

function mount(lessonId) {
  const M = D.loadUI(D.fakeStore());
  const { engine, Utterance } = fakeSpeech();
  M.speechSynthesis = engine;
  M.SpeechSynthesisUtterance = Utterance;
  const el = D.fakeEl();
  M.AAT3_UI.reset('path', 'tpfb');
  M.AAT3_UI.mount(el);
  if (lessonId) { D.click(el, 'open', n => n.getAttribute('data-id') === lessonId); }
  return { M, el, engine };
}

const TRIAL = (() => {
  const M = D.loadUI(D.fakeStore());
  return M.AAT3_UI.speechTrialLesson;
})();

/* ── 1. What a card says ─────────────────────────────────────────────────── */
console.log(`${DIM}1. What a card says${RESET}`);
{
  const M = D.loadUI(D.fakeStore());
  const path = M.AAT3_LEARN_PATH || [];
  let lesson = null;
  path.forEach(g => (g.lessons || []).forEach(l => { if (l.id === TRIAL) lesson = l; }));
  ok(!!lesson, `the trial lesson ${TRIAL} exists`);

  const cards = (lesson && lesson.cards) || [];
  ok(cards.length > 0, 'and has cards to read');

  cards.forEach((c, i) => {
    const said = M.AAT3_UI.cardSpeech(c);
    const joined = said.join(' ');
    const where = `card ${i + 1}`;

    ok(said.length > 0, `${where} says something`);
    ok(said[0] === String(c.h).replace(/\*\*/g, '').trim(), `${where} opens with its heading`);

    /* Every paragraph, in order, with the emphasis markers gone.

       BOTH KINDS OF EMPHASIS. The first version of this check stripped `**`
       and not `*`, and reported three paragraphs as unspoken when what had
       actually happened was that the module correctly removed an italic the
       check had left in. Stated here as what a listener should hear — a
       paragraph with no typography in it — rather than copied from the
       implementation. */
    const spoken = (t) => String(t)
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/(^|[^*])\*([^*]+)\*/g, '$1$2')
      .replace(/\s+/g, ' ').trim();
    const paras = c.p ? (Array.isArray(c.p) ? c.p : [c.p]) : [];
    paras.forEach((p, pi) => {
      ok(said.includes(spoken(p)), `${where} says paragraph ${pi + 1} in full`);
    });
    ok(!/\*\*/.test(joined), `${where} carries no bold markers into the speech`);
    ok(!/<[a-z/]/i.test(joined), `${where} carries no markup into the speech`);

    if (c.callout) {
      ok(said.some(x => x === spoken(c.callout.text)), `${where} reads its callout`);
    }
    if (c.examtrap) {
      ok(said.some(x => /^Exam trap\. /.test(x)), `${where} names the exam trap before reading it`);
    }

    /* THE TABLE IS THE POINT OF THIS SECTION. It must contribute nothing at
       all — not its cells, not its headings, and not an announcement. */
    if (c.table) {
      const cells = [].concat(c.table.headers || [], ...(c.table.rows || []));
      const leaked = cells.filter(cell => {
        const t = String(cell).replace(/\*\*/g, '').trim();
        return t.length > 3 && joined.indexOf(t) !== -1 && !paras.some(p => String(p).indexOf(t) !== -1);
      });
      ok(leaked.length === 0, `${where}'s table contributes no cell text (leaked: ${leaked.slice(0, 3).join(' / ')})`);
      ok(!/\btable\b/i.test(joined) || paras.some(p => /\btable\b/i.test(p)),
        `${where}'s table is passed over in silence rather than announced`);
    }
  });
}

/* ── 2. Where the button appears ─────────────────────────────────────────── */
console.log(`${DIM}2. Where the button appears${RESET}`);
{
  const t = mount(TRIAL);
  ok(/data-a3="speak"/.test(t.el.innerHTML), `the trial lesson ${TRIAL} offers the button`);
  /* BOTH HALVES OF THE LABEL, separately. They are two spans so the narrowest
     phone can drop the word and keep the glyph — and the first attempt at that
     collapsed BOTH, rendering an empty pill at 320px that only a screenshot
     caught. A button with nothing in it still matches a selector, so the
     content is what gets asserted. */
  ok(/class="a3-speak-i"[^>]*>▶</.test(t.el.innerHTML), 'and carries a play glyph');
  ok(/class="a3-speak-l">Listen</.test(t.el.innerHTML), 'and the word Listen beside it');

  /* Any other lesson must not, because this is a trial. */
  const other = mount(null);
  const M = other.M;
  let otherId = null;
  (M.AAT3_LEARN_PATH || []).forEach(g => (g.lessons || []).forEach(l => {
    if (!otherId && l.id !== TRIAL && (l.cards || []).length) otherId = l.id;
  }));
  ok(!!otherId, 'another lesson exists to compare against');
  const o = mount(otherId);
  ok(!/data-a3="speak"/.test(o.el.innerHTML), `${otherId} does not offer it — the trial is scoped`);

  /* And not once the reading is over and the questions begin. */
  const q = mount(TRIAL);
  for (let i = 0; i < 12; i++) {
    if (!D.nodes(q.el, 'next').length) break;
    D.click(q.el, 'next');
  }
  ok(!/data-a3="speak"/.test(q.el.innerHTML), 'and not on the questions — there is no card to read');

  /* A device with no speech engine is offered nothing rather than a dead
     button. */
  const M2 = D.loadUI(D.fakeStore());
  M2.speechSynthesis = null;
  M2.SpeechSynthesisUtterance = null;
  const el2 = D.fakeEl();
  M2.AAT3_UI.reset('path', 'tpfb');
  M2.AAT3_UI.mount(el2);
  D.click(el2, 'open', n => n.getAttribute('data-id') === TRIAL);
  ok(!/data-a3="speak"/.test(el2.innerHTML),
    'a device without a speech engine is offered no button rather than a dead one');
}

/* ── 3. Speaking, and stopping ───────────────────────────────────────────── */
console.log(`${DIM}3. Speaking, and stopping${RESET}`);
{
  const t = mount(TRIAL);
  D.click(t.el, 'speak');
  ok(t.engine.spoken.length > 1,
    `a card is queued as several utterances, not one (${t.engine.spoken.length})`);
  ok(t.engine.spoken.every(u => u.lang === 'en-GB'), 'every utterance is English');
  ok(t.engine.spoken.every(u => u.voice && u.voice.lang === 'en-GB'),
    'and takes the British voice where one exists');
  ok(t.engine.spoken.every(u => String(u.text).length < 400),
    'and no utterance is long enough to be cut off mid-sentence on iOS');

  /* Pressing it again stops. */
  const before = t.engine.cancels;
  D.click(t.el, 'speak');
  ok(t.engine.cancels > before, 'pressing it again cancels');

  /* And the button says so on a fresh paint, from state rather than from
     whatever the last DOM write left behind. */
  const t2 = mount(TRIAL);
  D.click(t2.el, 'speak');
  t2.M.AAT3_UI.mount(t2.el);
  ok(/class="a3-speak is-on"/.test(t2.el.innerHTML), 'a repaint mid-speech keeps the speaking state');
  ok(/class="a3-speak-i"[^>]*>■</.test(t2.el.innerHTML) && /class="a3-speak-l">Stop</.test(t2.el.innerHTML),
    'and still offers a way to stop');
}

/* ── 4. Nothing goes on speaking after the card leaves the screen ────────── */
console.log(`${DIM}4. Nothing outlives the card${RESET}`);
{
  const cases = [
    ['moving to the next card', (c) => D.click(c.el, 'next')],
    ['going back a card', (c) => { D.click(c.el, 'next'); D.click(c.el, 'back'); }],
    ['leaving the lesson', (c) => D.click(c.el, 'exit')],
    ['the Home button', (c) => c.M.AAT3_UI.home()],
    ['switching subject', (c) => c.M.AAT3_UI.suspend()],
    ['a reset', (c) => c.M.AAT3_UI.reset('path', 'tpfb')],
  ];
  cases.forEach(([label, act]) => {
    const c = mount(TRIAL);
    D.click(c.el, 'speak');
    const before = c.engine.cancels;
    act(c);
    ok(c.engine.cancels > before, `${label} cancels the speech`);
  });
}

console.log();
if (failures) {
  console.log(`${RED}${BOLD}── ${failures} of ${checks} checks failed${RESET}`);
  process.exit(1);
}
console.log(`${GREEN}${BOLD}── The read-aloud trial says the card and stops when it should ✓${RESET} ${DIM}(${checks} checks)${RESET}`);
