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
const R = require('../guitar-render.js');

const RED = '\x1b[31m', GREEN = '\x1b[32m', DIM = '\x1b[2m', BOLD = '\x1b[1m', YEL = '\x1b[33m', RESET = '\x1b[0m';
const errors = [];
const warnings = [];
const notes = [];

/* ── Limits ─────────────────────────────────────────────────────────────── */
const WORDS_PER_CARD_MAX = 600;
/* Raised from 80. The original came from the plan's "caption of roughly forty
   words", written before any content existed, and the content it produced was
   measured at ELEVEN SECONDS of reading per card — thirteen minutes for the
   whole course. Forty words can label a figure; it cannot explain why the
   second and the sixth come out of a scale. The ceiling still exists so cards
   do not drift into essays, but it now permits a paragraph that teaches. */
const WORDS_PER_ELEMENT_MAX = 130;
const WORDS_PER_LESSON_MIN = 150;

/* THE REAL FIX FOR THIN CARDS, and it is not prose length.
   A card said "play this", showed a figure, and offered a Play button. Nothing
   told the reader to stay, so they played it twice and moved on — the minutes
   were supposed to be in the PLAYING and nothing ever asked for any. Every card
   with something to play now carries a practice block: what to do, and a target
   you can tell you have reached. `until` is the load-bearing half. */
/* Element kinds that give the reader something to sound. Named once, because
   three separate rules ask the question and they must agree. */
const PLAYABLE_KINDS = ['tab', 'playalong', 'changes'];

const PRACTICE_MIN_WORDS = 12;
const PRACTICE_MAX_WORDS = 70;

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
/* `we'?ll` with an optional apostrophe matches the word "well", which is how a
   card reading "as well as" was reported as first person plural. The apostrophe
   is not optional in any of these — "well", "weve" and "lets" as bare words are
   ordinary English and only the contracted forms are the tell. */
const FIRST_PERSON = /\b(let's|we'll|we can|we will|we've|our hands)\b/i;
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

  /* The same treatment for the first-person pattern, which shipped matching the
     word "well" and flagged a card that had no first person in it at all. A
     pattern that fires on ordinary English trains you to read past it. */
  for (const ok of ['well', 'as well as', 'farewell', 'swell', 'lets go of the string']) {
    if (FIRST_PERSON.test(ok)) {
      errors.push(`the first-person pattern flags "${ok}", which is ordinary English. ` +
                  `Fix the pattern before trusting what it reports.`);
    }
  }
  for (const bad of ["let's start", "we'll come back", 'we will return']) {
    if (!FIRST_PERSON.test(bad)) {
      errors.push(`the first-person pattern misses "${bad}".`);
    }
  }
})();

/* What a card's playable material IS, whether written out or generated.
   A generated card carries a spec instead of an exercise id, and every rule
   below keyed on `el.exercise` skipped it silently — 15 M5 cards were invisible
   to the repetition limit and to the playability sweep, and the checker
   reported "55 card slots" while the module held 70 cards. A pass that comes
   from not looking is the failure this file exists to prevent. */
function materialKey(el) {
  if (!el) return null;
  if (el.exercise) return el.exercise;
  if (el.pick) {
    const k = el.pick;
    return 'pick:' + k.patternId + '/' +
           (k.chords || []).map(c => c.chordId + '/' + c.rootPc + '/' + (c.times || 1)).join(',');
  }
  if (el.chords) {
    return 'changes:' + el.chords.map(c => c.chordId + '/' + c.rootPc + '/' + (c.beats || 4)).join(',');
  }
  if (el.generate) {
    const g = el.generate;
    return `generated:${g.scaleId}/${g.rootPc}/${g.positionKind || 'box'}` +
           `/${g.positionIndex || 0}/${g.sequence || 'straight'}${g.descending ? '/desc' : ''}`;
  }
  return null;
}

const words = (s) => String(s || '').trim().split(/\s+/).filter(Boolean).length;
const prose = (card) => (card.p || []).join(' ');
const elementsOf = (card) => D.ELEMENT_KEYS.filter(k => card[k] !== undefined && card[k] !== null);

/* ── Per lesson ─────────────────────────────────────────────────────────── */
let totalCards = 0, totalWords = 0, totalElements = 0, handedOptOuts = 0;
let practiceCards = 0, practiceMinutes = 0;
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
    /* `changes` is playable too. It produces notes and a transport exactly as
       the others do, and leaving it out of this list meant M7's progression
       cards were exempt from the practice-block rule AND did not count toward
       the lesson's playable example — two lessons made entirely of them were
       reported as having nothing to play. A list of element kinds that has to
       be kept in step with the player is the kind of thing that silently rots,
       so it is derived from one place. */
    if (PLAYABLE_KINDS.some(k => els.includes(k))) {
      lessonPlayables++;

      /* THE STRUCTURAL FIX for a bug this file has now shipped twice.
         Generated cards were invisible to the repetition rule because it read
         `el.exercise` and they carry `el.generate`; progression cards were
         invisible to two rules because the playable list said tab and
         playalong. Both times a new SOURCE of material silently switched a
         rule off, and both times a reader found it rather than this file.

         So rather than remembering to teach materialKey about the next source,
         a playable element materialKey cannot read is a failure. The rule that
         has to be kept in step now says so the moment it stops being in step. */
      for (const k of els) {
        if (!PLAYABLE_KINDS.includes(k)) continue;
        if (materialKey(card[k]) === null) {
          errors.push(`${at}: the ${k} element carries material the repetition rule cannot read — ` +
                      `no exercise id, no generate spec, no pick spec, no chord list. Whatever ` +
                      `source it uses, teach materialKey to read it, or every rule keyed on the ` +
                      `material silently skips this card.`);
        }
      }

      const pr = card.practice;
      if (!pr) {
        errors.push(`${at} ("${card.h}") has something to play and no practice block. ` +
                    `A card that does not say what to do or when to stop is one the reader ` +
                    `skims in ten seconds — which is what the whole unit was measured at.`);
      } else {
        if (!pr.do || !String(pr.do).trim()) {
          errors.push(`${at}: the practice block has no instruction.`);
        }
        if (!pr.until || !String(pr.until).trim()) {
          errors.push(`${at}: the practice block has no target. "You have it when…" is the half ` +
                      `that turns a card the reader skims into one they work at.`);
        }
        const pw = words(pr.do) + words(pr.until);
        if (pw < PRACTICE_MIN_WORDS) {
          errors.push(`${at}: the practice block is ${pw} words, under ${PRACTICE_MIN_WORDS}. ` +
                      `Too short to say anything a player can act on.`);
        }
        if (pw > PRACTICE_MAX_WORDS) {
          errors.push(`${at}: the practice block is ${pw} words, over ${PRACTICE_MAX_WORDS}. ` +
                      `It is an instruction, not a second helping of prose.`);
        }
        if (pr.mins !== undefined && !(pr.mins >= 1 && pr.mins <= 20)) {
          errors.push(`${at}: practice time is ${pr.mins} minutes, outside 1-20.`);
        }
        practiceCards++;
        practiceMinutes += pr.mins || 0;
      }
    }
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
        const key = materialKey(card[k]);
        if (!key) continue;
        const at = `${lesson.id} card ${i + 1}`;
        order.push({ at, ex: key });
        if (!uses.has(key)) uses.set(key, []);
        uses.get(key).push(at);
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

/* ── Every generated spec resolves, and its notes are playable ───────────
   The generator is a second source of material and needs the same scrutiny as
   the written-out one. A spec naming a scale the engine does not have, or a
   position index past the end of a shape, produces a fault rather than notes —
   and the player draws a fault message where the exercise should be. */
let generatedCards = 0, generatedNotes = 0;
for (const lesson of D.LESSONS) {
  lesson.cards.forEach((card, i) => {
    for (const k of elementsOf(card)) {
      const el = card[k];
      if (!el || !el.generate) continue;
      const g = el.generate;
      const at = `${lesson.id} card ${i + 1}`;
      generatedCards++;

      if (!Object.prototype.hasOwnProperty.call(E.SCALES, g.scaleId)) {
        errors.push(`${at} generates from scale "${g.scaleId}", which the engine does not have.`);
        continue;
      }
      if (g.sequence && !Object.prototype.hasOwnProperty.call(E.SEQUENCES, g.sequence)) {
        errors.push(`${at} names sequence "${g.sequence}", which the engine does not have.`);
        continue;
      }
      const kind = g.positionKind || 'box';
      const count = E.positionCount(g.scaleId, kind);
      if (!count) {
        errors.push(`${at} asks for shape kind "${kind}", which yields no positions for ${g.scaleId}.`);
        continue;
      }
      if ((g.positionIndex || 0) >= count) {
        errors.push(`${at} asks for position ${(g.positionIndex || 0) + 1} of ${g.scaleId} ${kind}, ` +
                    `which has ${count}.`);
        continue;
      }
      const ex = E.generateExercise({
        scaleId: g.scaleId, rootPc: g.rootPc, positionKind: kind,
        positionIndex: g.positionIndex || 0, sequence: g.sequence || 'straight',
        descending: !!g.descending
      });
      if (ex.fault) {
        errors.push(`${at} generates a fault: ${ex.fault}. The card would draw an error message.`);
        continue;
      }
      if (!ex.notes.length) {
        errors.push(`${at} generates no notes.`);
        continue;
      }
      generatedNotes += ex.notes.length;
      for (const n of ex.notes) {
        const fault = E.noteFault(n, ex.fb);
        if (fault) errors.push(`${at} generated an unplayable note ${JSON.stringify(n)} — ${fault}`);
      }
    }
  });
}
if (generatedCards) {
  notes.push(`${generatedCards} cards generate their material; ${generatedNotes} notes, all playable.`);
}

/* ── Every picking spec resolves, and its notes are playable ─────────────
   The same scrutiny the generated scale specs get, for the same reason: a
   pattern naming a slot a four-string chord does not have, or two fingers
   landing on one string at one instant, produces a fault rather than notes and
   the card draws an error message where the exercise should be.

   Checked in the tuning and capo the CARD declares, not in standard with no
   capo — an earlier version of the authored sweep passed by asking the wrong
   question, and the answer meant nothing. */
let pickCards = 0, pickNotes = 0;
const pickPatternsUsed = new Set();
for (const lesson of D.LESSONS) {
  lesson.cards.forEach((card, i) => {
    for (const k of elementsOf(card)) {
      const el = card[k];
      if (!el || !el.pick) continue;
      const at = `${lesson.id} card ${i + 1}`;
      const ctx = card.context || {};
      pickCards++;
      const spec = el.pick;
      if (!Object.prototype.hasOwnProperty.call(E.PICKING, spec.patternId)) {
        errors.push(`${at} names picking pattern "${spec.patternId}", which the engine does not have.`);
        continue;
      }
      pickPatternsUsed.add(spec.patternId);
      const ex = E.generatePicking({
        patternId: spec.patternId, chords: spec.chords, sub: spec.sub,
        tuning: ctx.tuning || 'standard', capo: ctx.capo || 0
      });
      if (ex.fault) {
        errors.push(`${at} generates a fault: ${ex.fault}. The card would draw an error message.`);
        continue;
      }
      if (!ex.notes.length) {
        errors.push(`${at} generates no notes.`);
        continue;
      }
      pickNotes += ex.notes.length;
      for (const n of ex.notes) {
        const fault = E.noteFault(n, ex.fb);
        if (fault) errors.push(`${at} generated an unplayable note ${JSON.stringify(n)} — ${fault}`);
      }
      /* The boxes drawn beside the tab come from these voicings. A pattern
         that produced notes but no voicings would draw a tab with nothing
         above it and no error anywhere. */
      if (ex.voicings.length !== spec.chords.length) {
        errors.push(`${at} names ${spec.chords.length} chord(s) and got ${ex.voicings.length} ` +
                    `voicing(s) back; the chord boxes and the tab would disagree.`);
      }
    }
  });
}
if (pickCards) {
  notes.push(`${pickCards} cards pick over held chords; ${pickNotes} notes, all playable, ` +
             `${pickPatternsUsed.size} of ${Object.keys(E.PICKING).length} patterns used.`);
}

/* ── A note's notation cannot contradict its sound ───────────────────────
   The tab draws an accent from `level` and a stop mark from `tech: 'damp'`.
   The first is derived — the same number the transport multiplies gain by — so
   it cannot lie. The second is declared, so it can: a note marked stopped that
   rings right up to the next one is a figure teaching the opposite of what it
   says. P3 is a unit about hearing these differences, and a mark the ear
   cannot confirm is worse there than no mark. */
const DAMP_MAX_TRAILING_DUR = 1;
const VOICES_AVAILABLE = ['pluck', 'chord', 'tasto', 'ponticello'];
for (const id of X.ids()) {
  const byBeat = X.exercise(id).notes.slice().sort((a, b) => a.beat - b.beat);
  for (const n of X.exercise(id).notes) {
    if (n.tech === 'damp') {
      /* "Stopped" means stopped BEFORE something else happens. Against a fixed
         number this would pass a note that rings right up to the next one in a
         slow figure and fail a legitimate one in a fast figure; the question is
         relative, so the rule is. */
      const next = byBeat.find(x => x.beat > n.beat + 1e-9);
      if (next) {
        if (!(n.dur > 0 && n.dur < next.beat - n.beat)) {
          errors.push(`exercise ${id}: a note at beat ${n.beat} is marked stopped and lasts ` +
                      `${n.dur} beats, with the next note ${next.beat - n.beat} beats away. ` +
                      `It rings right up to it — the tab says stopped and the ear hears held.`);
        }
      } else if (!(n.dur > 0 && n.dur <= DAMP_MAX_TRAILING_DUR)) {
        errors.push(`exercise ${id}: the last note is marked stopped and lasts ${n.dur} beats.`);
      }
    }
    if (n.level !== undefined && !(n.level >= 0.2 && n.level <= 1.6)) {
      errors.push(`exercise ${id}: level ${n.level} is outside 0.2-1.6.`);
    }
    if (n.voice !== undefined && !VOICES_AVAILABLE.includes(n.voice)) {
      errors.push(`exercise ${id}: voice "${n.voice}" is not one the player has ` +
                  `(${VOICES_AVAILABLE.join(', ')}).`);
    }
  }
}

/* ── A unit that claims an audible difference has to make one ────────────
   P3's three criteria are each about something the ear can hear: a note louder
   than its neighbours, a note with a different tone, a note stopped early. All
   three are carried by fields the note gained for this unit, and all three are
   easy to lose silently — drop a `level` and the lesson still reads correctly,
   the tab still draws, every other rule still passes, and the card teaches
   nothing because there is no longer anything to hear.

   So a lesson claiming one of these criteria must have material that makes the
   difference it claims. The criterion and the notes are checked against each
   other rather than each alone, which is the dimension the prerequisite
   checker had to be written for as well. */
const AUDIBLE_CLAIMS = {
  'P3.melody': [n => n.level >= R.ACCENT_LEVEL, 'a note struck at or above accent level'],
  'P3.attack': [n => n.voice && n.voice !== 'pluck', 'a note sounded at a named contact point'],
  'P3.damp':   [n => n.tech === 'damp', 'a note stopped before the next one']
};
for (const lesson of D.LESSONS) {
  for (const id of lesson.criteria || []) {
    const claim = AUDIBLE_CLAIMS[id];
    if (!claim) continue;
    const [test, want] = claim;
    let found = 0;
    for (const card of lesson.cards) {
      for (const k of elementsOf(card)) {
        const el = card[k];
        if (!el || !el.exercise) continue;
        const ex = X.exercise(el.exercise);
        if (ex) found += ex.notes.filter(test).length;
      }
    }
    if (!found) {
      errors.push(`${lesson.id} claims ${id} and no note in its material is ${want}. ` +
                  `The lesson describes a difference the player never makes.`);
    }
  }
}

/* ── The transport fires notes from one place ────────────────────────────
   The loop branch and the straight branch each used to spell out the playMidi
   call, and wiring the count-in toggle into one of two such branches was a
   one-line change the whole suite passed. A note's level, voice and roll
   offset are three more things that would otherwise be remembered twice. */
(function () {
  const audio = require('fs').readFileSync(
    require('path').join(__dirname, '..', 'guitar-audio.js'), 'utf8');
  const from = audio.indexOf('function schedule()');
  const to = audio.indexOf('function tempoAt(');
  if (from < 0 || to < 0 || to <= from) {
    errors.push('cannot find the transport scheduler in guitar-audio.js, so this gate is ' +
                'checking nothing. Fix the landmarks before trusting the pass.');
    return;
  }
  const direct = (audio.slice(from, to).match(/playMidi\(/g) || []).length;
  if (direct) {
    errors.push(`the transport scheduler calls playMidi directly ${direct} time(s). ` +
                `It has two branches and they must not each spell out how a note is sounded — ` +
                `that is how the count-in came to be wired into one of them.`);
  }
})();

/* ── Every element kind the data may use is one the player draws ─────────
   ELEMENT_KEYS is what a card may carry AND what the "no prose-only card" rule
   counts. Two of the eight — `rhythm` and `ear` — were listed there and had no
   branch in the player at all, so a card using one would satisfy the rule that
   exists to guarantee something to do, and draw nothing. The list of kinds and
   the list of things that render have to be the same list. */
(function () {
  const ui = require('fs').readFileSync(
    require('path').join(__dirname, '..', 'guitar-ui.js'), 'utf8');
  const undrawn = D.ELEMENT_KEYS.filter(k => !new RegExp('card\\.' + k + '\\b').test(ui));
  if (undrawn.length) {
    errors.push(`${undrawn.join(', ')} listed in ELEMENT_KEYS and never read by guitar-ui.js. ` +
                `A card using one would pass the rule that every card carries something to play, ` +
                `and draw nothing at all.`);
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
/* The same question for picking patterns. A pattern in the engine that no card
   plays is untested content: the sweep above only reaches the ones a lesson
   names, so an unused one is neither taught nor checked. */
const unusedPatterns = Object.keys(E.PICKING).filter(id => !pickPatternsUsed.has(id));
if (unusedPatterns.length) {
  warnings.push(`${unusedPatterns.length} picking pattern(s) no card uses: ${unusedPatterns.join(', ')}.`);
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
notes.push(`${practiceCards} cards carry a practice block; ${practiceMinutes} minutes of practice ` +
           `prescribed across ${D.LESSONS.length} lessons ` +
           `(${(practiceMinutes / D.LESSONS.length).toFixed(0)} per lesson).`);
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
