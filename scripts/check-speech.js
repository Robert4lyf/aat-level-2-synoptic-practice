#!/usr/bin/env node
/**
 * Does the read-aloud button say the card, and stop when it should?
 *
 * This began as a trial on one Level 3 lesson. It is now on every card of both
 * self-rendering players that has something to say, which raises the stakes of
 * three things that were already true and are now true 541 times over.
 *
 * WHAT IS SPOKEN IS A DECISION, NOT A SIDE EFFECT. Only the prose is read: the
 * heading, the paragraphs, the callout, the trap — and, on Level 1, the key
 * terms, because a term and its definition is a sentence and reads as one.
 * Tables are passed over in silence, and the remaining structural elements are
 * announced rather than read, because a formula spoken aloud becomes "gross
 * equals net times one point two zero" and an invoice read field by field is
 * worse than useless. None of that is visible from the screen — a listener
 * cannot tell a table deliberately skipped from a table that failed to render
 * — so it is asserted here against every card's own data.
 *
 * A BUTTON THAT PLAYS SILENCE IS WORSE THAN NO BUTTON, because the reader
 * cannot tell it from a fault. Widening the offer from one lesson to every
 * lesson is what made this reachable: some cards are a table and nothing else.
 * The offer and the content are decided by the same function so they cannot
 * disagree, and that is asserted rather than assumed.
 *
 * SPEECH OUTLIVES THE SCREEN THAT STARTED IT. This is the same shape as the
 * mock clock, which went on ticking under another subject until suspend() was
 * given something to call. A voice reading VAT legislation over Français is the
 * same defect with a louder failure mode, so every exit is checked: the Home
 * button, a subject switch, leaving the lesson, and moving between cards.
 *
 * Both modules reach the speech engine through `root` rather than `window`,
 * which is what lets this hand them a stub and assert what was said and when it
 * was cancelled. Against the real API none of that would be observable.
 *
 * Run: node scripts/check-speech.js   (exit 1 on any failure)
 */

'use strict';

const D3 = require('./lib/aat3-driver.js');
const D1 = require('./lib/aat1-driver.js');

const RED = '\x1b[31m', GREEN = '\x1b[32m', DIM = '\x1b[2m', BOLD = '\x1b[1m', RESET = '\x1b[0m';

let failures = 0, checks = 0;
function ok(cond, label) {
  checks++;
  if (!cond) { failures++; console.log(`  ${RED}✗${RESET} ${label}`); }
}

console.log(`${BOLD}Read-aloud, on both self-rendering players${RESET}\n`);

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

/* What a listener should hear from a piece of authored text: the words, with
   no typography left in. Stated here as the property rather than copied from
   the implementation — an earlier version stripped `**` and not `*`, and
   reported three paragraphs as unspoken when the module had correctly removed
   an italic the check had left in. */
const spoken = (t) => String(t)
  .replace(/\*\*([^*]+)\*\*/g, '$1')
  .replace(/(^|[^*])\*([^*]+)\*/g, '$1$2')
  .replace(/\s+/g, ' ').trim();

/* ── The two players ──────────────────────────────────────────────────────── */

const LEVEL3 = {
  name: 'Level 3', D: D3, pfx: 'a3',
  mount(lessonId, opts) {
    const o = opts || {};
    const M = D3.loadUI(D3.fakeStore());
    const { engine, Utterance } = fakeSpeech();
    M.speechSynthesis = o.noEngine ? null : engine;
    M.SpeechSynthesisUtterance = o.noEngine ? null : Utterance;
    if (o.path) { M.AAT3_LEARN_PATH = o.path; M.AAT3_FAPS_PATH = []; M.AAT3_MATS_PATH = []; }
    const el = D3.fakeEl();
    /* The unit matters: reset() opens ONE unit's path, so asking for a FAPS
       lesson while TPFB is on screen finds nothing to click. */
    M.AAT3_UI.reset('path', o.unit || 'tpfb');
    M.AAT3_UI.mount(el);
    if (lessonId) D3.click(el, 'open', n => n.getAttribute('data-id') === lessonId);
    return { M, el, engine };
  },
  /* Every card the reader can reach, across every unit — the cheat sheets
     included, because a sheet is a lesson with `isSheet` on it and is read the
     same way. */
  cards(M) {
    const out = [];
    const paths = [M.AAT3_LEARN_PATH, M.AAT3_FAPS_PATH, M.AAT3_MATS_PATH];
    paths.forEach(p => (p || []).forEach(g => {
      const ls = (g.lessons || []).concat(g.cheatsheet ? [g.cheatsheet] : []);
      ls.forEach(l => (l.cards || []).forEach((c, i) => out.push({ where: `${l.id} card ${i + 1}`, c })));
    }));
    return out;
  },
  reset(M) { M.AAT3_UI.reset('path', 'tpfb'); },
  synth(cards) {
    return [{
      unit: 'tpfb', level: 3, outcome: 1, outcomeTitle: 'Synthetic', weighting: 100,
      title: 'Tax Processes for Businesses',
      lessons: [{ id: 'L3-SYN-1A', title: 'Synthetic lesson', criteria: [], cards, check: [] }],
    }];
  },
};

const LEVEL1 = {
  name: 'Level 1', D: D1, pfx: 'a1',
  mount(lessonId, opts) {
    const o = opts || {};
    const M = D1.loadUI(D1.fakeStore());
    const { engine, Utterance } = fakeSpeech();
    M.speechSynthesis = o.noEngine ? null : engine;
    M.SpeechSynthesisUtterance = o.noEngine ? null : Utterance;
    if (o.path) M.AAT1_LEARN_PATH = o.path;
    const el = D1.fakeEl();
    M.AAT1_UI.reset('path');
    M.AAT1_UI.mount(el);
    if (lessonId) D1.click(el, 'open', n => n.getAttribute('data-id') === lessonId);
    return { M, el, engine };
  },
  cards(M) {
    const out = [];
    (M.AAT1_LEARN_PATH || []).forEach(g => {
      const ls = (g.lessons || []).concat(g.cheatsheet ? [g.cheatsheet] : []);
      ls.forEach(l => (l.cards || []).forEach((c, i) => out.push({ where: `${l.id} card ${i + 1}`, c })));
    });
    return out;
  },
  reset(M) { M.AAT1_UI.reset('path'); },
  synth(cards) {
    return [{
      id: 'syn', outcome: 1, outcomeTitle: 'Synthetic', weighting: 100, blurb: 'x',
      lessons: [{
        id: 'L1-SYN-1A', title: 'Synthetic lesson', summary: 'x', kind: 'theory',
        criteria: [], cards, check: [],
      }],
    }];
  },
};

const PLAYERS = [LEVEL3, LEVEL1];

PLAYERS.forEach(P => {
  const D = P.D;
  const UI = (M) => M[`AAT${P.pfx === 'a3' ? 3 : 1}_UI`];
  console.log(`${BOLD}${P.name}${RESET}`);

  /* ── 1. What every card says ───────────────────────────────────────────── */
  console.log(`${DIM}  1. What a card says${RESET}`);
  {
    const M = D.loadUI(D.fakeStore());
    const all = P.cards(M);
    ok(all.length > 50, `${P.name}: there are cards to sweep (${all.length})`);

    /* Counted rather than asserted per card, because one line per card across
       541 cards is not a report anybody reads. A single failure names its
       card; a clean sweep says how many. */
    let noHeadingFirst = [], leakedBold = [], leakedMarkup = [],
        missedPara = [], silentCallout = [], unnamedTrap = [], tableLeak = [],
        missedTerm = [], readDoc = [], unframedNotYet = [];

    all.forEach(({ where, c }) => {
      const said = UI(M).cardSpeech(c);
      const joined = said.join(' ');
      if (!said.length) return;   // a card with nothing to say is section 2's business

      if (c.h && said[0] !== spoken(c.h)) noHeadingFirst.push(where);
      if (/\*\*/.test(joined)) leakedBold.push(where);
      if (/<[a-z/]/i.test(joined)) leakedMarkup.push(where);

      const paras = c.p ? (Array.isArray(c.p) ? c.p : [c.p]) : [];
      paras.forEach((p, pi) => {
        if (!said.includes(spoken(p))) missedPara.push(`${where} ¶${pi + 1}`);
      });

      if (c.callout && !said.some(x => x === spoken(c.callout.text))) silentCallout.push(where);
      if (c.examtrap) {
        const body = typeof c.examtrap === 'string' ? c.examtrap : (c.examtrap.text || '');
        /* Named before it is read, in the words the card itself prints, so a
           listener gets the same framing a reader sees. */
        if (!said.some(x => /^(Exam trap|Watch out)\. /.test(x) && x.indexOf(spoken(body).slice(0, 30)) !== -1)) {
          unnamedTrap.push(where);
        }
      }

      /* THE TABLE IS THE POINT OF THIS SECTION. It must contribute nothing at
         all — not its cells, not its headings, and not an announcement.

         Asserted by DIFFERENCE rather than by hunting for cell text in the
         speech, and that is not a stylistic preference: a cell reading "What"
         or "Blocked" turns up inside a callout on the same card, and the
         hunting version reported sixteen of those as leaks. Taking the table
         away and requiring the speech not to change is exact, has no false
         positives, and says the property directly. */
      if (c.table) {
        const bare = Object.assign({}, c); delete bare.table;
        if (UI(M).cardSpeech(bare).join('\u0001') !== said.join('\u0001')) {
          tableLeak.push(where);
        }
      }

      /* Level 1 only. A key-terms list is the one structured element here that
         survives being spoken, so it is read; a document facsimile does not,
         so it is announced by kind and its fields stay on the page. */
      if (c.terms) {
        c.terms.forEach(t => {
          if (!said.some(x => x.indexOf(spoken(t.t)) === 0 && x.indexOf(spoken(t.d).slice(0, 25)) !== -1)) {
            missedTerm.push(`${where}: ${t.t}`);
          }
        });
      }
      /* A document contributes EXACTLY ONE line, and it is the announcement.
         Same difference test as the table, plus the announcement itself:
         together they say "announced, and not read out" without leaving room
         for a field to sneak through under a short string. */
      if (c.doc) {
        const bare = Object.assign({}, c); delete bare.doc;
        const withoutDoc = UI(M).cardSpeech(bare);
        const added = said.filter(x => withoutDoc.indexOf(x) === -1);
        if (added.length !== 1) readDoc.push(`${where}: contributed ${added.length} lines, not 1`);
        else if (!/ on screen to look at\.$/.test(added[0])) readDoc.push(`${where}: ${added[0]}`);
      }
      if (c.notyet && !said.some(x => /^Not at this level\. /.test(x))) unframedNotYet.push(where);
    });

    const clean = (list, label) =>
      ok(list.length === 0, `${P.name}: ${label} (${list.length}: ${list.slice(0, 3).join(' · ')})`);
    clean(noHeadingFirst, 'every card opens with its heading');
    clean(missedPara, 'every paragraph is said in full');
    clean(leakedBold, 'no bold markers reach the speech');
    clean(leakedMarkup, 'no markup reaches the speech');
    clean(silentCallout, 'every callout is read');
    clean(unnamedTrap, 'every trap is named before it is read');
    clean(tableLeak, 'no table contributes a word');
    clean(missedTerm, 'every key term is read with its definition');
    clean(readDoc, 'every document is announced and none is read out');
    clean(unframedNotYet, 'every out-of-scope note keeps its framing');
  }

  /* ── 2. Where the button appears ───────────────────────────────────────── */
  console.log(`${DIM}  2. Where the button appears${RESET}`);
  {
    /* THE WIDENING ITSELF. Every lesson with a prose card offers the button —
       this is the property the old trial constant existed to deny, and the
       reason it is asserted over every lesson rather than over one is that a
       gate scoped to one instance is how the trial stayed a trial. */
    const M0 = D.loadUI(D.fakeStore());
    const lessons = [];
    const paths = P.pfx === 'a3'
      ? [M0.AAT3_LEARN_PATH, M0.AAT3_FAPS_PATH, M0.AAT3_MATS_PATH]
      : [M0.AAT1_LEARN_PATH];
    paths.forEach(p => (p || []).forEach(g => (g.lessons || []).forEach(l => {
      if ((l.cards || []).length && UI(M0).cardSpeech(l.cards[0]).length) {
        lessons.push({ id: l.id, unit: g.unit });
      }
    })));
    ok(lessons.length > 10, `${P.name}: there are lessons to open (${lessons.length})`);
    /* Sampled across the whole path rather than taken from the front, so a
       unit that lost its speech would not hide behind the first one. */
    const sample = lessons.filter((_, i) => i % Math.max(1, Math.floor(lessons.length / 12)) === 0);
    ok(P.pfx !== 'a3' || new Set(sample.map(x => x.unit)).size > 1,
      `${P.name}: the sample reaches more than one unit`);
    const silent = sample.filter(x =>
      !new RegExp(`data-${P.pfx}="speak"`).test(P.mount(x.id, { unit: x.unit }).el.innerHTML));
    ok(silent.length === 0,
      `${P.name}: every sampled lesson offers the button (${silent.length} of ${sample.length} silent: ${silent.slice(0, 3).map(x => x.id).join(' ')})`);

    const one = P.mount(sample[0].id, { unit: sample[0].unit });
    /* BOTH HALVES OF THE LABEL, separately. They are two spans so the narrowest
       phone can drop the word and keep the glyph — and the first attempt at
       that collapsed BOTH, rendering an empty pill at 320px that only a
       screenshot caught. A button with nothing in it still matches a selector,
       so the content is what gets asserted. */
    ok(new RegExp(`class="${P.pfx}-speak-i"[^>]*>▶<`).test(one.el.innerHTML), `${P.name}: and carries a play glyph`);
    ok(new RegExp(`class="${P.pfx}-speak-l">Listen<`).test(one.el.innerHTML), `${P.name}: and the word Listen beside it`);

    /* A CARD WITH NOTHING TO SAY IS OFFERED NOTHING. This is what widening the
       trial made reachable: a Listen button that plays silence cannot be told
       from a fault. */
    const muteId = P.pfx === 'a3' ? 'L3-SYN-1A' : 'L1-SYN-1A';
    const mute = P.mount(null, {
      path: P.synth([{ table: { headers: ['A', 'B'], rows: [['1', '2']] } }]),
    });
    D.click(mute.el, 'open', n => n.getAttribute('data-id') === muteId);
    ok(!new RegExp(`data-${P.pfx}="speak"`).test(mute.el.innerHTML),
      `${P.name}: a card with nothing to say offers no button rather than a silent one`);

    /* And a card that DOES have prose, in the same synthetic lesson, does — so
       the check above cannot be passing because the lesson failed to open. */
    const loud = P.mount(null, {
      path: P.synth([{ h: 'A heading', p: 'A sentence of prose to read out.' }]),
    });
    D.click(loud.el, 'open', n => n.getAttribute('data-id') === muteId);
    ok(new RegExp(`data-${P.pfx}="speak"`).test(loud.el.innerHTML),
      `${P.name}: and a prose card in the same place does offer one`);

    /* Not once the reading is over and the questions begin. */
    const q = P.mount(sample[0].id, { unit: sample[0].unit });
    for (let i = 0; i < 40; i++) {
      if (!D.nodes(q.el, 'next').length) break;
      D.click(q.el, 'next');
    }
    ok(!new RegExp(`data-${P.pfx}="speak"`).test(q.el.innerHTML),
      `${P.name}: and not on the questions — there is no card to read`);

    /* A device with no speech engine is offered nothing rather than a dead
       button. */
    const none = P.mount(sample[0].id, { unit: sample[0].unit, noEngine: true });
    ok(!new RegExp(`data-${P.pfx}="speak"`).test(none.el.innerHTML),
      `${P.name}: a device without a speech engine is offered no button rather than a dead one`);
  }

  /* ── 3. Speaking, and stopping ─────────────────────────────────────────── */
  console.log(`${DIM}  3. Speaking, and stopping${RESET}`);
  const FIRST = (() => {
    const M0 = D.loadUI(D.fakeStore());
    const paths = P.pfx === 'a3' ? [M0.AAT3_LEARN_PATH] : [M0.AAT1_LEARN_PATH];
    let id = null;
    paths.forEach(p => (p || []).forEach(g => (g.lessons || []).forEach(l => {
      if (!id && (l.cards || []).length && UI(M0).cardSpeech(l.cards[0]).length > 2) id = l.id;
    })));
    return id;
  })();
  {
    const t = P.mount(FIRST);
    D.click(t.el, 'speak');
    ok(t.engine.spoken.length > 1,
      `${P.name}: a card is queued as several utterances, not one (${t.engine.spoken.length})`);
    ok(t.engine.spoken.every(u => u.lang === 'en-GB'), `${P.name}: every utterance is English`);
    ok(t.engine.spoken.every(u => u.voice && u.voice.lang === 'en-GB'),
      `${P.name}: and takes the British voice where one exists`);
    ok(t.engine.spoken.every(u => String(u.text).length < 400),
      `${P.name}: and no utterance is long enough to be cut off mid-sentence on iOS`);

    const before = t.engine.cancels;
    D.click(t.el, 'speak');
    ok(t.engine.cancels > before, `${P.name}: pressing it again cancels`);

    /* ONLY THE LAST UTTERANCE ENDS THE RUN. A card is queued as one utterance
       per sentence, so an `onend` attached to every one of them would clear the
       speaking flag at the first full stop — the button would flip back to
       Listen while the voice was still on its second paragraph, and pressing it
       would start the card again from the top. Nothing on screen looks wrong,
       which is why this is driven rather than read: the first utterance is
       ENDED here, and the module must still consider itself speaking. */
    const t3 = P.mount(FIRST);
    D.click(t3.el, 'speak');
    const queue = t3.engine.spoken;
    ok(queue.length > 2, `${P.name}: there is more than one utterance to end early (${queue.length})`);
    if (queue[0].onend) queue[0].onend();
    UI(t3.M).mount(t3.el);
    ok(new RegExp(`class="${P.pfx}-speak is-on"`).test(t3.el.innerHTML),
      `${P.name}: the first sentence ending does not end the card`);
    if (queue[queue.length - 1].onend) queue[queue.length - 1].onend();
    UI(t3.M).mount(t3.el);
    ok(!new RegExp(`class="${P.pfx}-speak is-on"`).test(t3.el.innerHTML),
      `${P.name}: and the last sentence ending does`);

    /* And the button says so on a fresh paint, from state rather than from
       whatever the last DOM write left behind. */
    const t2 = P.mount(FIRST);
    D.click(t2.el, 'speak');
    UI(t2.M).mount(t2.el);
    ok(new RegExp(`class="${P.pfx}-speak is-on"`).test(t2.el.innerHTML),
      `${P.name}: a repaint mid-speech keeps the speaking state`);
    ok(new RegExp(`class="${P.pfx}-speak-i"[^>]*>■<`).test(t2.el.innerHTML) &&
       new RegExp(`class="${P.pfx}-speak-l">Stop<`).test(t2.el.innerHTML),
      `${P.name}: and still offers a way to stop`);
  }

  /* ── 4. Nothing goes on speaking after the card leaves the screen ──────── */
  console.log(`${DIM}  4. Nothing outlives the card${RESET}`);
  {
    const cases = [
      ['moving to the next card', (c) => D.click(c.el, 'next')],
      ['going back a card', (c) => { D.click(c.el, 'next'); D.click(c.el, 'back'); }],
      ['leaving the lesson', (c) => D.click(c.el, 'exit')],
      ['the Home button', (c) => UI(c.M).home()],
      ['switching subject', (c) => UI(c.M).suspend()],
      ['a reset', (c) => P.reset(c.M)],
    ];
    cases.forEach(([label, act]) => {
      const c = P.mount(FIRST);
      D.click(c.el, 'speak');
      const before = c.engine.cancels;
      act(c);
      ok(c.engine.cancels > before, `${P.name}: ${label} cancels the speech`);
    });
  }
  console.log('');
});

if (failures) {
  console.log(`${RED}${BOLD}── ${failures} of ${checks} checks failed${RESET}`);
  process.exit(1);
}
console.log(`${GREEN}${BOLD}── Read-aloud says the card and stops when it should: ${checks} checks ✓${RESET}`);
