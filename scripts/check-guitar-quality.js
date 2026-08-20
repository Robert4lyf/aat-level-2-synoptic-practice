#!/usr/bin/env node
/**
 * The guitar lessons keep their format and their voice.
 *
 * THE FORMAT RULE that matters most: no card is prose only. This module exists
 * because "lessons should incorporate playing rather than teach then test", and
 * that intention survives exactly as long as something enforces it. Explaining
 * is easier than designing an exercise, so without this rule the cards drift
 * into essays with a play-along bolted on at the end of the lesson.
 *
 * There is a prose CEILING per card and per element, and deliberately no floor
 * per card. An earlier draft of the plan specified a 120-word floor, which would
 * have forced padding and inverted the whole point of the format — the design
 * target is a caption of roughly forty words. The only floor is per lesson,
 * guarding the opposite failure: a lesson that teaches nothing.
 *
 * THE VOICE RULES come from scripts/lib/prose-mannerisms.js, shared with the
 * three AAT checkers, plus a guitar list added on top. Two of the guitar rules
 * needed care rather than a word list:
 *
 *   - `just` is a minimiser in "just play the note" and not in "just intonation"
 *     or "just behind the fret". The pattern matches the minimiser sense only,
 *     and the allowlist is tested against real phrases below.
 *   - The hands are the fretting hand and the picking hand. Left and right are
 *     banned outright, with one opt-out for the lesson that has to cover
 *     left-handed instruments — and the opt-out is capped at one lesson, because
 *     an unbounded opt-out is how a rule quietly stops applying.
 *
 * Run: node scripts/check-guitar-quality.js   (exit 1 on any failure)
 */

'use strict';

const M = require('./lib/prose-mannerisms.js');
const D = require('../guitar-learn-data.js');
const S = require('../guitar-syllabus.js');
const X = require('../guitar-exercise-data.js');
const E = require('../guitar-engine.js');

const RED = '\x1b[31m', GREEN = '\x1b[32m', DIM = '\x1b[2m', BOLD = '\x1b[1m', YEL = '\x1b[33m', RESET = '\x1b[0m';
const errors = [];
const warnings = [];
const notes = [];

/* ── Limits ─────────────────────────────────────────────────────────────── */
const WORDS_PER_CARD_MAX = 600;
const WORDS_PER_ELEMENT_MAX = 80;
const WORDS_PER_LESSON_MIN = 150;

/* ── Guitar's own vocabulary, on top of the shared list ─────────────────── */
const GUITAR_NEVER = [
  [/\bunlock(ing)? the fretboard\b/i, 'unlock the fretboard'],
  [/\bnext level\b/i,                 'next level'],
  [/\bgame[- ]changer\b/i,            'game-changer'],
  [/\bsecret weapon\b/i,              'secret weapon'],
  [/\bat your fingertips\b/i,         'at your fingertips'],
  [/\barsenal\b/i,                    'arsenal'],
  [/\btoolkit\b/i,                    'toolkit'],
  [/\bmusical journey\b/i,            'musical journey'],
  [/\bdive in(to)?\b/i,               'dive in'],
  [/\blet'?s explore\b/i,             "let's explore"],
  [/\bthe world of\b/i,               'the world of'],
  [/\beffortless(ly)?\b/i,            'effortless'],
  [/\bmagical\b/i,                    'magical'],
  [/\bsprinkl(e|es|ing)\b/i,          'sprinkle'],
  [/\bspice up\b/i,                   'spice up'],
  [/\bhaunting\b/i,                   'haunting'],
  [/\bethereal\b/i,                   'ethereal'],
  [/\bsoaring\b/i,                    'soaring'],
  [/\blush\b/i,                       'lush']
];

/* Minimisers, in their minimising sense only. */
const MINIMISER = /\b(just|simply|merely)\s+(?!intonation\b|above\b|below\b|behind\b|under\b|past\b|before\b|after\b|as\b|the\b|a\b|an\b|that\b|how\b|what\b|enough\b|about\b)([a-z]+)\b/gi;
const MINIMISER_ALLOW = [
  'just intonation', 'just above the 12th fret', 'just below the nut',
  'just behind the fret', 'just under the string', 'just past the soundhole'
];
const FIRST_PERSON = /\b(let'?s|we'?ll|we can|we will|we'?ve|our hands)\b/i;
const HEDGE = /\b(you might want to|you could try|feel free to|if you like|perhaps try)\b/i;
const HANDEDNESS = /\b(right|left)[- ]hand(ed|s)?\b|\byour (right|left)\b|\bon the (right|left)\b/i;
const INSTRUMENT_ASSUMING = /\b(your acoustic|on the electric|your amp|dial in|steel[- ]string|nylon)\b/i;
const INSTRUMENTS = ['any', 'steel', 'nylon', 'electric'];

/* ── The minimiser pattern is tested before it is trusted ───────────────── */
(function selfTest() {
  const shouldPass = MINIMISER_ALLOW.slice();
  const shouldFail = ['just play the note', 'simply lift the finger', 'merely repeat it'];
  for (const s of shouldPass) {
    MINIMISER.lastIndex = 0;
    if (MINIMISER.test(s)) {
      errors.push(`the minimiser pattern flags "${s}", which is a legitimate use in this domain. ` +
                  `Fix the pattern before trusting anything it reports.`);
    }
  }
  for (const s of shouldFail) {
    MINIMISER.lastIndex = 0;
    if (!MINIMISER.test(s)) {
      errors.push(`the minimiser pattern misses "${s}", so it is not catching what it exists for.`);
    }
  }
  MINIMISER.lastIndex = 0;
})();

const words = (s) => String(s || '').trim().split(/\s+/).filter(Boolean).length;
const prose = (card) => (card.p || []).join(' ');
const elementsOf = (card) => D.ELEMENT_KEYS.filter(k => card[k] !== undefined && card[k] !== null);

/* ── Per lesson ─────────────────────────────────────────────────────────── */
let totalCards = 0, totalWords = 0, totalElements = 0, handedOptOuts = 0;
let playableLessons = 0;

for (const lesson of D.LESSONS) {
  const where = lesson.id;
  let lessonWords = 0;
  let lessonPlayables = 0;

  if (!INSTRUMENTS.includes(lesson.instrument)) {
    errors.push(`${where}: instrument is "${lesson.instrument}"; expected one of ${INSTRUMENTS.join(', ')}.`);
  }
  if (lesson.handedProse) handedOptOuts++;
  if (!Array.isArray(lesson.cards) || !lesson.cards.length) {
    errors.push(`${where} has no cards.`);
    continue;
  }

  lesson.cards.forEach((card, i) => {
    const at = `${where} card ${i + 1}`;
    totalCards++;
    const text = prose(card);
    const w = words(text);
    lessonWords += w;
    totalWords += w;

    if (!card.h || !String(card.h).trim()) errors.push(`${at} has no heading.`);

    /* THE RULE. */
    const els = elementsOf(card);
    totalElements += els.length;
    if (!els.length) {
      errors.push(`${at} ("${card.h}") is prose only. Every card carries something to play — ` +
                  `that is what makes this a lesson you do rather than one you read.`);
    }
    if (els.includes('tab') || els.includes('playalong')) lessonPlayables++;
    /* The player draws one tab for either, so a card carrying both gets a
       double prose allowance for a single figure — the ratio rule would stop
       biting exactly where the card is heaviest. */
    if (els.includes('tab') && els.includes('playalong')) {
      errors.push(`${at} carries both tab and playalong. They render as the same figure; ` +
                  `use playalong when the card wants a transport, tab when it does not.`);
    }

    if (w > WORDS_PER_CARD_MAX) {
      errors.push(`${at} runs to ${w} words, over the ${WORDS_PER_CARD_MAX} ceiling.`);
    }
    if (els.length && w > els.length * WORDS_PER_ELEMENT_MAX) {
      errors.push(`${at} has ${w} words against ${els.length} element(s) — over ${WORDS_PER_ELEMENT_MAX} ` +
                  `per element. The prose has started describing the instrument instead of pointing at ` +
                  `what the hands are doing.`);
    }

    /* Voice, over the card's own prose plus any element captions and notes. */
    const speakable = [text,
      ...els.map(k => (card[k] && (card[k].caption || card[k].note)) || '')].join(' ');

    M.neverHits(speakable, GUITAR_NEVER).forEach(label => {
      errors.push(`${at} uses "${label}".`);
    });
    const cadence = M.cadenceHits(speakable);
    if (cadence.length > M.CADENCE_MAX_PER_CARD) {
      errors.push(`${at} stacks ${cadence.length} cadence shapes (${cadence.join('; ')}). ` +
                  `At most ${M.CADENCE_MAX_PER_CARD} per card — the device is fine, the pile-up is the tell.`);
    }
    MINIMISER.lastIndex = 0;
    const mins = speakable.match(MINIMISER);
    if (mins) errors.push(`${at} minimises with "${mins[0].trim()}". Say the instruction without it.`);
    if (FIRST_PERSON.test(speakable)) {
      errors.push(`${at} uses the first person plural ("${speakable.match(FIRST_PERSON)[0]}"). ` +
                  `The course speaks in the imperative.`);
    }
    if (HEDGE.test(speakable)) {
      errors.push(`${at} hedges the instruction ("${speakable.match(HEDGE)[0]}"). Say what to do.`);
    }
    if (!lesson.handedProse && HANDEDNESS.test(speakable)) {
      errors.push(`${at} says "${speakable.match(HANDEDNESS)[0]}". Use fretting hand and picking hand — ` +
                  `roughly one player in ten reads left and right backwards.`);
    }
    if (lesson.instrument === 'any' && INSTRUMENT_ASSUMING.test(speakable)) {
      errors.push(`${at} is marked instrument: 'any' but says "${speakable.match(INSTRUMENT_ASSUMING)[0]}".`);
    }

    /* Every referenced exercise resolves, and its notes are playable. */
    for (const k of els) {
      const el = card[k];
      if (el && el.exercise) {
        const ex = X.exercise(el.exercise);
        if (!ex) {
          errors.push(`${at} references exercise "${el.exercise}", which does not exist.`);
          continue;
        }
        if (!Array.isArray(ex.notes) || !ex.notes.length) {
          errors.push(`${at} references "${el.exercise}", which has no notes.`);
        }
      }
    }
  });

  if (lessonWords < WORDS_PER_LESSON_MIN) {
    errors.push(`${where} has ${lessonWords} words across ${lesson.cards.length} cards, under the ` +
                `${WORDS_PER_LESSON_MIN} floor. The floor is per lesson, not per card — a lesson this ` +
                `short is not teaching the criterion it claims.`);
  }
  if (!lessonPlayables) {
    errors.push(`${where} has no playable example. Every lesson needs at least one.`);
  } else {
    playableLessons++;
  }
}

/* ── The handedness opt-out is capped ───────────────────────────────────── */
if (handedOptOuts > 1) {
  errors.push(`${handedOptOuts} lessons set handedProse. At most one may — the lesson about ` +
              `left-handed instruments. An unbounded opt-out is how the rule stops applying.`);
}

/* ── Signposting, measured over everything at once ──────────────────────── */
const allProse = D.LESSONS.flatMap(l => l.cards.map(c => prose(c))).join(' ');
const signposts = M.signpostCount(allProse);
const per1k = totalWords ? (signposts / totalWords) * 1000 : 0;
if (per1k > M.SIGNPOST_CEILING_PER_1K) {
  errors.push(`signposting runs at ${per1k.toFixed(2)} per thousand words, over the ` +
              `${M.SIGNPOST_CEILING_PER_1K} ceiling. "It is worth noting that X" announces that X ` +
              `matters instead of making the point.`);
}

/* ── The same exercise does not keep coming back ────────────────────────
   Caught by a reader, not by this file: "this exercise was used about 2 cards
   before". It was, and four other times besides — 35 cards were drawing on 11
   exercises, with one figure of eight notes appearing five times and three of
   those inside a single lesson.

   The cause was ordinary and worth naming, because it will recur. Exercises
   were written first and cards second, so every card that needed something to
   play reached for what already existed. That is the path of least resistance
   and it produces a unit that looks complete and feels repetitive, which no
   count of cards or words would show.

   Two limits. A gap of at least MIN_GAP cards in reading order, because a
   repeat the reader can still remember reads as an oversight rather than as
   revision. And a cap of MAX_USES across the module, because a figure met
   often enough stops being practice and becomes wallpaper.

   Reuse is not banned: coming back to a figure once, later, with a different
   focus is real teaching. Coming back to it two cards later is not. */
const MIN_GAP = 4;
const MAX_USES = 2;

(function () {
  const order = [];
  const uses = new Map();
  for (const lesson of D.LESSONS) {
    lesson.cards.forEach((card, i) => {
      for (const k of elementsOf(card)) {
        const el = card[k];
        if (!el || !el.exercise) continue;
        const at = `${lesson.id} card ${i + 1}`;
        order.push({ at, ex: el.exercise });
        if (!uses.has(el.exercise)) uses.set(el.exercise, []);
        uses.get(el.exercise).push(at);
      }
    });
  }

  for (let i = 1; i < order.length; i++) {
    for (let j = Math.max(0, i - MIN_GAP); j < i; j++) {
      if (order[j].ex !== order[i].ex) continue;
      errors.push(`"${order[i].ex}" appears at ${order[j].at} and again at ${order[i].at}, ` +
                  `${i - j} card(s) later. Leave at least ${MIN_GAP} — a reader who still ` +
                  `remembers the figure reads the repeat as an oversight.`);
      break;
    }
  }
  for (const [ex, at] of uses) {
    if (at.length > MAX_USES) {
      errors.push(`"${ex}" is used ${at.length} times (${at.join(', ')}), over the ${MAX_USES} cap. ` +
                  `A figure met this often stops being practice.`);
    }
  }
  if (order.length) {
    notes.push(`${order.length} card slots draw on ${uses.size} distinct exercises; ` +
               `no repeat within ${MIN_GAP} cards.`);
  }
})();

/* ── Every authored exercise is reachable and sound ─────────────────────── */
const referenced = new Set();
for (const lesson of D.LESSONS) {
  for (const card of lesson.cards) {
    for (const k of elementsOf(card)) {
      if (card[k] && card[k].exercise) referenced.add(card[k].exercise);
    }
  }
}
const orphans = X.ids().filter(id => !referenced.has(id));
if (orphans.length) {
  warnings.push(`${orphans.length} authored exercise(s) no lesson uses: ${orphans.join(', ')}.`);
}

/* Playability is guitar-engine's own question, asked here against the authored
   notes because check-guitar-playability sweeps the GENERATED space and would
   never see these.

   ON THE CONTEXT OF EACH ONE. An earlier version of this checked every exercise
   against standard tuning with no capo, and reported "all playable in standard
   tuning" while the module contained exercises written for DADGAD and for a
   capo at the fifth fret. That is a check answering a question nobody asked: a
   capo-5 exercise with a note at the third fret is unplayable in its own lesson
   and perfectly fine in standard tuning, so the pass meant nothing. Each
   exercise is now checked on the instrument the card that uses it declares. */
const contextOf = new Map();          // exercise id → { tuning, capo }
for (const lesson of D.LESSONS) {
  for (const card of lesson.cards) {
    for (const k of elementsOf(card)) {
      const el = card[k];
      if (!el || !el.exercise) continue;
      const ctx = card.context || {};
      contextOf.set(el.exercise, { tuning: ctx.tuning || 'standard', capo: ctx.capo || 0 });
    }
  }
}
let noteCount = 0;
for (const id of X.ids()) {
  const ex = X.exercise(id);
  const ctx = contextOf.get(id) || { tuning: 'standard', capo: 0 };
  const fb = E.makeFretboard({ tuning: ctx.tuning, capo: ctx.capo, handed: 'right' });
  for (const n of ex.notes) {
    noteCount++;
    const fault = E.noteFault(n, fb);
    if (fault) {
      errors.push(`exercise ${id} in ${ctx.tuning}${ctx.capo ? ' capo ' + ctx.capo : ''}: ` +
                  `${JSON.stringify(n)} — ${fault}`);
    }
  }
  /* Two notes on one string at one moment is unplayable and renders as a
     collision rather than as an error. */
  const seen = Object.create(null);
  for (const n of ex.notes) {
    const key = n.string + '@' + n.beat;
    if (seen[key]) errors.push(`exercise ${id}: two notes on string ${n.string} at beat ${n.beat}.`);
    seen[key] = true;
  }
}

notes.push(`${D.LESSONS.length} lessons, ${totalCards} cards, ${totalWords} prose words ` +
           `(${Math.round(totalWords / totalCards)} per card), ${totalElements} elements.`);
const contexts = [...new Set([...contextOf.values()].map(c => c.tuning + (c.capo ? '/' + c.capo : '')))];
notes.push(`${X.ids().length} authored exercises, ${noteCount} notes, all playable on the instrument ` +
           `their card declares (${contexts.sort().join(', ')}).`);

/* A card that declares a tuning the engine does not know would silently fall
   back to standard, drawing the wrong neck under confident prose. */
for (const lesson of D.LESSONS) {
  lesson.cards.forEach((card, i) => {
    const ctx = card.context;
    if (!ctx) return;
    if (ctx.tuning && !Object.prototype.hasOwnProperty.call(E.TUNINGS, ctx.tuning)) {
      errors.push(`${lesson.id} card ${i + 1} declares tuning "${ctx.tuning}", which the engine does ` +
                  `not have. It would fall back to standard and draw the wrong neck.`);
    }
    if (ctx.capo !== undefined && (!(ctx.capo >= 0) || ctx.capo > 9)) {
      errors.push(`${lesson.id} card ${i + 1} declares capo ${ctx.capo}, outside 0-9.`);
    }
    /* A card says which INSTRUMENT it is talking about. It does not get to say
       whose hands are playing it — that belongs to the profile, and a card able
       to override it is a left-handed reader being shown a right-handed neck by
       content they cannot argue with. */
    if ('handed' in ctx) {
      errors.push(`${lesson.id} card ${i + 1} declares handedness in its context. Handedness comes ` +
                  `from the reader's profile, never from content.`);
    }
    const allowed = ['tuning', 'capo'];
    for (const key of Object.keys(ctx)) {
      if (!allowed.includes(key)) {
        errors.push(`${lesson.id} card ${i + 1} has an unknown context key "${key}". ` +
                    `The player reads only ${allowed.join(' and ')}, so this would be silently ignored.`);
      }
    }
  });
}
notes.push(`Signposting ${per1k.toFixed(2)} per 1k words (ceiling ${M.SIGNPOST_CEILING_PER_1K}); ` +
           `${playableLessons}/${D.LESSONS.length} lessons carry a playable example.`);

console.log(`${BOLD}guitar content quality${RESET}\n`);
notes.forEach(n => console.log(`  ${DIM}${n}${RESET}`));
warnings.forEach(w => console.log(`  ${YEL}⚠${RESET}  ${w}`));
console.log('');
if (errors.length) {
  errors.forEach(e => console.log(e.startsWith('    ') ? `  ${DIM}${e}${RESET}` : `  ${RED}✗${RESET}  ${e}`));
  console.log(`\n${RED}${BOLD}${errors.length} failure(s).${RESET}\n`);
  process.exit(1);
}
console.log(`  ${GREEN}✓  every card carries something to play, and the voice holds${RESET}\n`);
