#!/usr/bin/env node
/**
 * guitar-engine.js — the tuning × capo × handedness matrix.
 *
 * This is the gate for step 2 of docs/guitar-implementation-plan.md, and it
 * exists because of two specific errors that were made on paper before any of
 * this was written (see docs/guitar-review-log.md, findings 0.1 and 0.2):
 *
 *   - a capo convention that contradicted itself, so soundingMidi() would have
 *     silently transposed by the capo position;
 *   - a string axis computed as (6 - stringNo), which renders every tab stave
 *     upside down and looks entirely reasonable while doing it.
 *
 * Both are invisible in casual use and both would have surfaced weeks later, in
 * content rather than in code. So they get asserted here, by hand-computed
 * expectations rather than by round-tripping the engine against itself — a test
 * that asks the engine to confirm its own arithmetic proves nothing.
 *
 * Run: node scripts/test-guitar-engine.js   (exit 1 on any failure)
 */

'use strict';

const path = require('path');
const E = require(path.join(__dirname, '..', 'guitar-engine.js'));

const RED = '\x1b[31m', GREEN = '\x1b[32m', DIM = '\x1b[2m', BOLD = '\x1b[1m', RESET = '\x1b[0m';
const failures = [];
let checks = 0;

function eq(actual, expected, what) {
  checks++;
  if (actual !== expected) failures.push(`${what}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
}
function ok(cond, what) {
  checks++;
  if (!cond) failures.push(what);
}
function near(actual, expected, tol, what) {
  checks++;
  if (!(Math.abs(actual - expected) <= tol)) {
    failures.push(`${what}: expected ${expected} ±${tol}, got ${actual}`);
  }
}

/* ── 1. Pitch arithmetic, against known values ───────────────────────────── */
eq(E.midiToLabel(40), 'E2', 'MIDI 40 is the low E');
eq(E.midiToLabel(64), 'E4', 'MIDI 64 is the high E');
eq(E.midiToLabel(60), 'C4', 'MIDI 60 is middle C');
eq(E.midiToLabel(69), 'A4', 'MIDI 69 is A440');
eq(E.midiToName(61), 'C#', 'MIDI 61 is C# by default');
eq(E.midiToName(61, true), 'Db', 'MIDI 61 is Db with flats');
near(E.midiToFreq(69), 440, 1e-9, 'A4 is 440 Hz');
near(E.midiToFreq(81), 880, 1e-9, 'A5 is an octave above A4');
near(E.midiToFreq(40), 82.4069, 0.001, 'low E is 82.41 Hz');
near(E.centsBetween(440, 440 * Math.pow(2, 1 / 12)), 100, 1e-6, 'a semitone is 100 cents');

/* ── 2. String numbering, stated as pitches ──────────────────────────────────
   In standard tuning, string 1 must be the HIGH E and string 6 the LOW E. If
   tuningIndex() is inverted these two swap, and every downstream pitch is out
   by two octaves while every function still returns a plausible number. */
const std = E.makeFretboard({ tuning: 'standard' });
eq(E.midiToLabel(E.openMidi(1, std)), 'E4', 'string 1 open is the high E');
eq(E.midiToLabel(E.openMidi(2, std)), 'B3', 'string 2 open is B');
eq(E.midiToLabel(E.openMidi(3, std)), 'G3', 'string 3 open is G');
eq(E.midiToLabel(E.openMidi(4, std)), 'D3', 'string 4 open is D');
eq(E.midiToLabel(E.openMidi(5, std)), 'A2', 'string 5 open is A');
eq(E.midiToLabel(E.openMidi(6, std)), 'E2', 'string 6 open is the low E');
ok(E.openMidi(1, std) > E.openMidi(6, std), 'string 1 sounds higher than string 6');

/* Landmarks a guitarist would catch instantly if they were wrong. */
eq(E.midiToLabel(E.soundingMidi({ string: 5, fret: 3 }, std)), 'C3', 'A string, 3rd fret is C');
eq(E.midiToLabel(E.soundingMidi({ string: 6, fret: 5 }, std)), 'A2', 'low E, 5th fret matches the open A');
eq(E.soundingMidi({ string: 6, fret: 5 }, std), E.openMidi(5, std), '5th fret of string 6 equals open string 5');
eq(E.soundingMidi({ string: 3, fret: 4 }, std), E.openMidi(2, std), '4th fret of string 3 equals open string 2 (the odd one)');
eq(E.midiToLabel(E.soundingMidi({ string: 1, fret: 12 }, std)), 'E5', '12th fret is an octave up');

/* ── 3. The tuning table, verified as intervals not as literals ───────────── */
const EXPECTED_TUNINGS = {
  standard: ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'],
  dropD:    ['D2', 'A2', 'D3', 'G3', 'B3', 'E4'],
  DADGAD:   ['D2', 'A2', 'D3', 'G3', 'A3', 'D4'],
  openD:    ['D2', 'A2', 'D3', 'F#3', 'A3', 'D4'],
  openG:    ['D2', 'G2', 'D3', 'G3', 'B3', 'D4'],
  CGCFCE:   ['C2', 'G2', 'C3', 'F3', 'C4', 'E4']
};
Object.keys(EXPECTED_TUNINGS).forEach(id => {
  const midi = E.tuningMidi(id);
  ok(!!midi, `tuning ${id} exists`);
  if (!midi) return;
  eq(midi.length, 6, `tuning ${id} has six strings`);
  eq(midi.map(m => E.midiToLabel(m)).join(' '), EXPECTED_TUNINGS[id].join(' '), `tuning ${id} pitches`);
  /* Ascending low to high: index 0 must be the lowest string. Every tuning
     shipped so far is strictly ascending, so this is asserted flatly. An
     earlier draft excused four of the six by id, which made the assertion
     vacuous — a check that exempts most of its inputs tests nothing. If a
     genuinely non-ascending tuning is ever added, exempt that one by id here
     and say why, rather than widening the rule. */
  for (let i = 1; i < midi.length; i++) {
    ok(midi[i] > midi[i - 1], `tuning ${id} string index ${i} must sound higher than index ${i - 1}`);
  }
});
/* Every declared tuning must be covered by this test, or a new one could be
   added and never checked. */
Object.keys(E.TUNINGS).forEach(id => {
  ok(Object.prototype.hasOwnProperty.call(EXPECTED_TUNINGS, id), `tuning ${id} is covered by this test`);
});

/* ── 4. Aliases resolve, and never survive into stored state ─────────────────
   Two ids for one pitch set would split mastery-grid progress in half. */
eq(E.resolveTuningId('DADF#AD'), 'openD', 'DADF#AD resolves to open D');
eq(E.tuningMidi('DADF#AD').join(), E.tuningMidi('openD').join(), 'the alias is the same tuning');
eq(E.makeFretboard({ tuning: 'DADF#AD' }).tuning, 'openD', 'a fretboard stores the canonical id, never the alias');
eq(E.resolveTuningId('nonsense'), null, 'an unknown tuning resolves to null');
eq(E.makeFretboard({ tuning: 'nonsense' }).tuning, 'standard', 'an unknown tuning falls back to standard');
/* No two canonical tunings may share a pitch set. */
const seen = {};
Object.keys(E.TUNINGS).forEach(id => {
  const k = E.TUNINGS[id].midi.join(',');
  ok(!seen[k], `tuning ${id} is not a duplicate of ${seen[k]}`);
  seen[k] = id;
});

/* ── 5. THE CAPO RULE ─────────────────────────────────────────────────────────
   soundingMidi() must never add the capo. A note at fret 5 sounds the same
   pitch whether or not a capo sits at fret 5 — the capo changes which notes are
   REACHABLE, not what a given fret sounds. */
[0, 2, 5, 7].forEach(capo => {
  Object.keys(EXPECTED_TUNINGS).forEach(tuning => {
    const fb = E.makeFretboard({ tuning, capo });
    for (let s = 1; s <= 6; s++) {
      [0, 5, 7, 12].forEach(fret => {
        const open = E.tuningMidi(tuning)[6 - s];
        eq(E.soundingMidi({ string: s, fret }, fb), open + fret,
           `capo ${capo} must not change the pitch of ${tuning} string ${s} fret ${fret}`);
      });
    }
  });
});

/* Reachability, which the capo DOES change. */
const capo5 = E.makeFretboard({ tuning: 'standard', capo: 5 });
ok(!E.isPlayable({ string: 1, fret: 0 }, capo5), 'fret 0 is unreachable behind a capo at 5');
ok(!E.isPlayable({ string: 1, fret: 4 }, capo5), 'fret 4 is unreachable behind a capo at 5');
ok(E.isPlayable({ string: 1, fret: 5 }, capo5), 'fret 5 IS the capo, and is playable');
ok(E.isPlayable({ string: 1, fret: 7 }, capo5), 'fret 7 is playable above the capo');
ok(E.isPlayable({ string: 1, fret: 0 }, std), 'fret 0 is playable with no capo');
ok(/behind the capo/.test(E.noteFault({ string: 1, fret: 3 }, capo5)), 'the fault names the capo');

/* The capo'd open string reads as 0 on a tab strip, and only there. */
eq(E.displayFret({ string: 1, fret: 5 }, capo5), 0, 'the capo fret prints as 0');
eq(E.displayFret({ string: 1, fret: 8 }, capo5), 3, 'three frets above a capo at 5 prints as 3');
eq(E.displayFret({ string: 1, fret: 5 }, std), 5, 'with no capo the printed fret is the real one');

/* ── 6. THE MIRRORS ───────────────────────────────────────────────────────── */
/* String 1 is the top line of a tab stave. Inverting this is finding 0.2. */
eq(E.stringAxis(1, false), 0, 'string 1 (high E) is the top line');
eq(E.stringAxis(6, false), 5, 'string 6 (low E) is the bottom line');
eq(E.stringAxis(1, true), 5, 'mirrored, string 1 moves to the far side');
eq(E.stringAxis(6, true), 0, 'mirrored, string 6 moves to the near side');
/* Mirroring is an involution and order-reversing. */
for (let s = 1; s <= 6; s++) {
  eq(E.stringAxis(s, false) + E.stringAxis(s, true), 5, `string ${s} mirrors symmetrically`);
}
for (let s = 1; s < 6; s++) {
  ok(E.stringAxis(s, false) < E.stringAxis(s + 1, false), `unmirrored order holds at string ${s}`);
  ok(E.stringAxis(s, true) > E.stringAxis(s + 1, true), `mirrored order reverses at string ${s}`);
}
eq(E.stringAxis(1, false, 12), 0, 'spacing scales the unmirrored axis');
eq(E.stringAxis(3, false, 12), 24, 'string 3 at 12px spacing');
eq(E.stringAxis(3, true, 12), 36, 'string 3 mirrored at 12px spacing');

/* The fret axis mirrors too — the nut moves to the far end. */
eq(E.fretAxis(0, false, 12), 0, 'fret 0 is at the nut end unmirrored');
eq(E.fretAxis(12, false, 12), 12, 'fret 12 unmirrored');
eq(E.fretAxis(0, true, 12), 12, 'mirrored, the nut is at the far end');
eq(E.fretAxis(12, true, 12), 0, 'mirrored, fret 12 is at the near end');
eq(E.fretAxis(3, false, 12, 10), 30, 'fret spacing scales');
eq(E.fretAxis(3, true, 12, 10), 90, 'mirrored fret spacing scales');

/* mirrorFor reads handedness, and only handedness. */
eq(E.mirrorFor(E.makeFretboard({ handed: 'left' })), true, 'left-handed mirrors');
eq(E.mirrorFor(E.makeFretboard({ handed: 'right' })), false, 'right-handed does not');
eq(E.makeFretboard({ handed: 'sideways' }).handed, 'right', 'an unknown handedness falls back to right');

/* Handedness must not touch pitch. This is the whole point of the split. */
[0, 2, 5, 7].forEach(capo => {
  Object.keys(EXPECTED_TUNINGS).forEach(tuning => {
    const r = E.makeFretboard({ tuning, capo, handed: 'right' });
    const l = E.makeFretboard({ tuning, capo, handed: 'left' });
    for (let s = 1; s <= 6; s++) {
      const n = { string: s, fret: Math.max(capo, 7) };
      eq(E.soundingMidi(n, l), E.soundingMidi(n, r),
         `handedness must not change pitch: ${tuning} capo ${capo} string ${s}`);
      eq(E.isPlayable(n, l), E.isPlayable(n, r),
         `handedness must not change playability: ${tuning} capo ${capo} string ${s}`);
    }
  });
});

/* ── 6b. Element conventions ─────────────────────────────────────
   The contracts a renderer relies on, asserted directly, so a later change to
   stringAxis cannot quietly re-invert a chord box. */
const rh = E.makeFretboard({ handed: 'right' });
const lh = E.makeFretboard({ handed: 'left' });

eq(E.tabStringY(1, false), 0, 'tab: string 1 is the top line');
eq(E.tabStringY(6, false), 5, 'tab: string 6 is the bottom line');
eq(E.tabStringY(1, true), 5, 'tab: mirrorTab flips it');

/* Right-handed chord boxes put the LOW E leftmost, which is the reverse of the
   natural string-1-first order. Left-handed is the mirror image. */
eq(E.chordBoxStringX(6, rh), 0, 'chord box, right-handed: low E leftmost');
eq(E.chordBoxStringX(1, rh), 5, 'chord box, right-handed: high E rightmost');
eq(E.chordBoxStringX(6, lh), 5, 'chord box, left-handed: low E rightmost');
eq(E.chordBoxStringX(1, lh), 0, 'chord box, left-handed: high E leftmost');
for (let s = 1; s <= 6; s++) {
  eq(E.chordBoxStringX(s, rh) + E.chordBoxStringX(s, lh), 5, `chord box string ${s} mirrors symmetrically`);
}

/* A horizontal reflection cannot reorder a vertical axis, so on a neck diagram
   the frets flip and the string order does not. */
eq(E.neckStringY(1, rh), 0, 'neck: high E on top, right-handed');
eq(E.neckStringY(1, lh), 0, 'neck: high E stays on top, left-handed');
eq(E.neckStringY(6, lh), 5, 'neck: low E stays at the bottom, left-handed');
eq(E.neckFretX(0, rh, 12), 0, 'neck: nut on the left, right-handed');
eq(E.neckFretX(0, lh, 12), 12, 'neck: nut on the right, left-handed');
eq(E.neckFretX(12, lh, 12), 0, 'neck: fret 12 near the left, left-handed');

/* Drawn coordinates across the whole matrix, which the step-2 gate calls for
   and an earlier draft of this file only claimed. Every element must map the
   six strings onto 0..5 with no collision, in every configuration. */
[0, 2, 5, 7].forEach(capo => {
  Object.keys(EXPECTED_TUNINGS).forEach(tuning => {
    ['right', 'left'].forEach(handed => {
      const fb = E.makeFretboard({ tuning, capo, handed });
      const box = [], tabY = [], neck = [];
      for (let s = 1; s <= 6; s++) {
        box.push(E.chordBoxStringX(s, fb));
        tabY.push(E.tabStringY(s, false));
        neck.push(E.neckStringY(s, fb));
      }
      const perm = a => a.slice().sort((x, y) => x - y).join(',') === '0,1,2,3,4,5';
      ok(perm(box),  `chord box coords are a clean permutation: ${tuning} capo ${capo} ${handed}`);
      ok(perm(tabY), `tab coords are a clean permutation: ${tuning} capo ${capo} ${handed}`);
      ok(perm(neck), `neck coords are a clean permutation: ${tuning} capo ${capo} ${handed}`);
      eq(E.neckFretX(0, fb, 12), handed === 'left' ? 12 : 0,
         `nut sits on the correct side: ${tuning} capo ${capo} ${handed}`);
    });
  });
});

/* Prototype-chain keys must not be mistaken for tunings. Unguarded, this stores
   'constructor' as a tuning id and the next soundingMidi() throws on .slice(). */
['constructor', 'toString', '__proto__', 'hasOwnProperty', 'valueOf'].forEach(k => {
  eq(E.resolveTuningId(k), null, `'${k}' is not a tuning`);
  const fb = E.makeFretboard({ tuning: k });
  eq(fb.tuning, 'standard', `'${k}' falls back to standard`);
  ok(typeof E.soundingMidi({ string: 1, fret: 0 }, fb) === 'number', `'${k}' fretboard still sounds a pitch`);
});
[null, undefined, 42, {}, []].forEach(v => {
  eq(E.resolveTuningId(v), null, `${JSON.stringify(v) || String(v)} is not a tuning id`);
});

/* ── 7. Boundaries and bad input ──────────────────────────────────────────── */
ok(E.noteFault({ string: 0, fret: 0 }, std), 'string 0 is rejected');
ok(E.noteFault({ string: 7, fret: 0 }, std), 'string 7 is rejected');
ok(E.noteFault({ string: 1, fret: -1 }, std), 'a negative fret is rejected');
ok(E.noteFault({ string: 1, fret: 25 }, std), 'fret 25 is rejected');
ok(E.noteFault({ string: 1.5, fret: 0 }, std), 'a fractional string is rejected');
ok(E.noteFault({ string: 1, fret: 2.5 }, std), 'a fractional fret is rejected');
ok(E.noteFault({}, std), 'an empty note is rejected');
ok(E.noteFault(null, std), 'a null note is rejected');
ok(!E.noteFault({ string: 1, fret: 0 }, std), 'string 1 fret 0 is fine');
ok(!E.noteFault({ string: 6, fret: 24 }, std), 'string 6 fret 24 is fine');
eq(E.makeFretboard({ capo: -3 }).capo, 0, 'a negative capo clamps to 0');
eq(E.makeFretboard({ capo: 99 }).capo, 24, 'an absurd capo clamps to the last fret');
eq(E.makeFretboard({ capo: 'x' }).capo, 0, 'a non-numeric capo falls back to 0');
eq(E.makeFretboard().capo, 0, 'makeFretboard() with no argument works');

/* ── 8. Reverse lookup ───────────────────────────────────────────────────── */
const cPositions = E.positionsForMidi(E.soundingMidi({ string: 5, fret: 3 }, std), std);
ok(cPositions.length >= 2, 'C3 is findable in more than one place');
ok(cPositions.every(p => E.soundingMidi(p, std) === E.soundingMidi({ string: 5, fret: 3 }, std)),
   'every returned position sounds the same pitch');
ok(cPositions.some(p => p.string === 5 && p.fret === 3), 'the A-string C is among them');
const behindCapo = E.positionsForMidi(E.openMidi(1, std), capo5);
ok(behindCapo.length > 0, 'the high E is still findable with a capo at 5 (stops the next check passing vacuously)');
ok(behindCapo.every(p => p.fret >= 5), 'reverse lookup never returns a position behind the capo');
eq(E.positionsForMidi(200, std).length, 0, 'a pitch off the neck returns nothing');

/* ── Report ──────────────────────────────────────────────────────────────── */
console.log(`${BOLD}guitar-engine.js — fretboard matrix${RESET}\n`);
console.log(`  ${DIM}${checks} assertions · pitch, reachability and drawn coordinates · ${Object.keys(EXPECTED_TUNINGS).length} tunings × capo {0,2,5,7} × both handednesses.${RESET}`);
console.log('');
if (failures.length) {
  failures.forEach(f => console.log(`  ${RED}✗${RESET}  ${f}`));
  console.log(`\n${RED}${BOLD}${failures.length} failure(s).${RESET}\n`);
  process.exit(1);
}
console.log(`  ${GREEN}✓  all ${checks} assertions pass${RESET}\n`);
