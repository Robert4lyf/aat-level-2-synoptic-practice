#!/usr/bin/env node
/**
 * guitar-engine.js — the fretboard matrix, transport timing, and string synthesis.
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

eq(E.tabStringY(1), 0, 'tab: string 1 is the top line');
eq(E.tabStringY(6), 5, 'tab: string 6 is the bottom line');
/* Tab takes no mirror argument at all now, so it cannot be flipped by accident
   or on purpose. An extra argument must be ignored rather than honoured. */
eq(E.tabStringY(1, 1), 0, 'tab: a stray second argument does not flip it');

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
        tabY.push(E.tabStringY(s));
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

/* ── 9. Timing ────────────────────────────────────────────────────────────
   The gate for step 3. Tolerance is 2 ms, which is roughly a tenth of the
   shortest interval a listener can place, and far tighter than the 25 ms
   scheduler tick. */
const TOL_MS = 2;
const TOL_S = TOL_MS / 1000;

eq(E.beatsToSeconds(1, 60), 1, 'one beat at 60 bpm is one second');
eq(E.beatsToSeconds(4, 120), 2, 'a 4/4 bar at 120 bpm is two seconds');
eq(E.secondsToBeats(2, 120), 4, 'two seconds at 120 bpm is four beats');
near(E.secondsToBeats(E.beatsToSeconds(7.25, 137), 137), 7.25, 1e-12, 'beats round-trip through seconds');
eq(E.beatAt(0, 1 / 3), 0, 'event 0 is at beat 0');
near(E.beatAt(3, 1 / 3), 1, 1e-12, 'three triplets make a beat');

/* THE STEP-3 GATE — 10,000 events, across tempo changes, against a reference.
   An earlier draft ran this on a single-segment map and compared the result to
   `beat * 60 / bpm`, which is the same expression transportTime evaluates. The
   worst error was exactly 0 and the assertion could not fail — a vacuous gate
   dressed as the headline check. This version differs in both respects:

     - the map has four segments, so segment lookup and start-time accumulation
       are actually exercised;
     - expectations come from referenceTime(), written independently below. It
       walks the raw entries summing whole-segment durations, where the engine
       does a lookup into precomputed start times. Same answer by a different
       route, which is what makes disagreement meaningful. */
function referenceTime(beat, entries) {
  let t = 0;
  for (let i = 0; i < entries.length; i++) {
    const segStart = entries[i].beat;
    const segEnd = (i + 1 < entries.length) ? entries[i + 1].beat : Infinity;
    if (beat <= segEnd) return t + (beat - segStart) * 60 / entries[i].bpm;
    t += (segEnd - segStart) * 60 / entries[i].bpm;
  }
  return t;
}
{
  const entries = [
    { beat: 0, bpm: 132 }, { beat: 400, bpm: 60 },
    { beat: 900, bpm: 176 }, { beat: 2000, bpm: 84 }
  ];
  const map = E.compileTempoMap(entries);
  eq(map.length, 4, 'the gate really is running on a four-segment map');
  let worst = 0, worstBeat = 0;
  for (let n = 0; n < 10000; n++) {
    const beat = E.beatAt(n, 1 / 3);
    const err = Math.abs(E.transportTime(beat, map, 0) - referenceTime(beat, entries));
    if (err > worst) { worst = err; worstBeat = beat; }
  }
  ok(worst <= TOL_S,
     `10,000 triplets across four tempo changes stay within ${TOL_MS} ms of an independent reference ` +
     `(worst ${(worst * 1000).toExponential(2)} ms at beat ${worstBeat.toFixed(2)})`);
  /* And the reference must itself disagree with a deliberately wrong engine,
     or it is not discriminating either. */
  ok(Math.abs(referenceTime(1000, entries) - (1000 * 60 / 132)) > TOL_S,
     'the reference distinguishes a tempo-map-aware answer from a naive one');
}

/* Tempo changes, checked against hand-computed segment boundaries.
   0–16 at 60 bpm  = 16 s. 16–32 at 120 bpm = 8 s, ending at 24 s.
   32 onward at 90 bpm. */
{
  const map = E.compileTempoMap([
    { beat: 32, bpm: 90 }, { beat: 0, bpm: 60 }, { beat: 16, bpm: 120 }  // deliberately unsorted
  ]);
  eq(map.length, 3, 'three segments compile');
  eq(map[0].beat, 0, 'segments are sorted by beat');
  near(E.transportTime(0, map, 0), 0, 1e-12, 'beat 0 is at t0');
  near(E.transportTime(16, map, 0), 16, 1e-12, 'beat 16 arrives after 16 s at 60 bpm');
  near(E.transportTime(32, map, 0), 24, 1e-12, 'beat 32 arrives after a further 8 s at 120 bpm');
  near(E.transportTime(38, map, 0), 24 + 4, 1e-12, 'six beats at 90 bpm is four more seconds');
  near(E.transportTime(8, map, 0), 8, 1e-12, 'mid-segment interpolation is linear');
  near(E.transportTime(24, map, 0), 20, 1e-12, 'mid-segment in the second segment');
  /* t0 shifts everything and changes nothing else. */
  near(E.transportTime(16, map, 5) - E.transportTime(0, map, 5), 16, 1e-12, 't0 shifts uniformly');

  /* A tempo change must not retroactively rescale what came before it — the
     failure accumulation would cause. */
  const slower = E.compileTempoMap([{ beat: 0, bpm: 60 }, { beat: 16, bpm: 30 }]);
  near(E.transportTime(16, slower, 0), 16, 1e-12, 'halving the tempo at beat 16 leaves beat 16 where it was');
  near(E.transportTime(32, slower, 0), 48, 1e-12, 'and only affects what follows');
}

/* transportTime and beatAtTime must be exact inverses across the matrix. */
{
  const maps = [
    [{ beat: 0, bpm: 40 }],
    [{ beat: 0, bpm: 240 }],
    [{ beat: 0, bpm: 72 }, { beat: 12, bpm: 144 }, { beat: 30, bpm: 60 }]
  ];
  let worst = 0;
  maps.forEach(entries => {
    const map = E.compileTempoMap(entries);
    [0, 3.5].forEach(t0 => {
      for (let n = 0; n < 2000; n++) {
        const beat = E.beatAt(n, 0.25);
        const back = E.beatAtTime(E.transportTime(beat, map, t0), map, t0);
        const err = Math.abs(back - beat);
        if (err > worst) worst = err;
      }
    });
  });
  ok(worst < 1e-9, `beat → time → beat round-trips exactly (worst ${worst.toExponential(2)} beats)`);
}

/* Count-in is negative beats, and must land before t0 with no special case. */
{
  const map = E.compileTempoMap([{ beat: 0, bpm: 120 }]);
  near(E.transportTime(-4, map, 10), 8, 1e-12, 'a four-beat count-in at 120 bpm starts 2 s early');
  ok(E.transportTime(-1, map, 10) < 10, 'negative beats land before t0');
  near(E.beatAtTime(8, map, 10), -4, 1e-12, 'and convert back to negative beats');
}

/* ── Looping ─────────────────────────────────────────────────────────────── */
eq(E.loopWrap(0, 0, 4), 0, 'loop start maps to itself');
eq(E.loopWrap(4, 0, 4), 0, 'the loop end wraps to the start');
eq(E.loopWrap(5, 0, 4), 1, 'one beat past the end is one beat in');
eq(E.loopWrap(9, 0, 4), 1, 'and again two passes later');
eq(E.loopWrap(-1, 0, 4), 3, 'a beat before the start wraps to the end');
eq(E.loopWrap(6, 2, 6), 2, 'a loop that does not start at zero');
eq(E.loopWrap(3, 0, 0), 3, 'a zero-length loop is a no-op');
eq(E.loopWrap(3, 4, 2), 3, 'an inverted loop is a no-op');

eq(E.loopIteration(0, 0, 4), 0, 'the first pass is iteration 0');
eq(E.loopIteration(3.99, 0, 4), 0, 'still the first pass just before the end');
eq(E.loopIteration(4, 0, 4), 1, 'the end begins the second pass');
eq(E.loopIteration(-1, 0, 4), -1, 'before the start is a negative iteration');
eq(E.loopIteration(3, 0, 0), 0, 'a zero-length loop has one iteration');

/* THE DUPLICATE-SCHEDULING GUARD.
   A loop shorter than the lookahead window is covered more than once in a
   single scheduler tick. Keying events on beat position alone cannot tell the
   passes apart — every event would be scheduled twice. Keying on
   (iteration, index) distinguishes them, which is the whole point. */
{
  const loopStart = 0, loopEnd = 0.5;      // half a beat: ~46 ms at 650 bpm
  const map = E.compileTempoMap([{ beat: 0, bpm: 650 }]);
  const windowStart = 0, windowEnd = E.secondsToBeats(0.1, 650);  // 100 ms lookahead
  ok(windowEnd > (loopEnd - loopStart) * 2, 'the window really does cover the loop more than twice');

  const byPosition = new Set(), byIteration = new Set();
  let events = 0;
  for (let b = windowStart; b < windowEnd; b += 0.25) {
    const wrapped = E.loopWrap(b, loopStart, loopEnd);
    const iter = E.loopIteration(b, loopStart, loopEnd);
    byPosition.add(wrapped);
    byIteration.add(iter + ':' + wrapped);
    events++;
  }
  ok(byPosition.size < events, 'keying on position alone collapses distinct passes (the bug)');
  eq(byIteration.size, events, 'keying on (iteration, position) keeps every pass distinct (the fix)');
}

/* ── Tempo map hygiene ───────────────────────────────────────────────────── */
{
  eq(E.compileTempoMap([]).length, 1, 'an empty map compiles to one default segment');
  eq(E.compileTempoMap([])[0].bpm, E.DEFAULT_BPM, 'and uses the default tempo');
  eq(E.compileTempoMap(null).length, 1, 'null compiles to a default');
  eq(E.compileTempoMap(undefined).length, 1, 'undefined compiles to a default');
  eq(E.compileTempoMap([{ beat: 8, bpm: 90 }])[0].beat, 0, 'a map not starting at 0 gets a beat-0 segment');
  eq(E.compileTempoMap([{ beat: 8, bpm: 90 }])[0].bpm, 90, 'which inherits the first declared tempo');
  eq(E.compileTempoMap([{ beat: 0, bpm: 0 }])[0].bpm, E.DEFAULT_BPM, 'a zero tempo is discarded');
  eq(E.compileTempoMap([{ beat: 0, bpm: -60 }])[0].bpm, E.DEFAULT_BPM, 'a negative tempo is discarded');
  eq(E.compileTempoMap([{ beat: 0, bpm: NaN }])[0].bpm, E.DEFAULT_BPM, 'NaN is discarded');
  eq(E.compileTempoMap([{ beat: NaN, bpm: 90 }])[0].bpm, E.DEFAULT_BPM, 'a NaN beat is discarded');
  eq(E.compileTempoMap([{ beat: -4, bpm: 200 }, { beat: 0, bpm: 90 }]).length, 1,
     'a tempo change before beat 0 is meaningless and is dropped');
  /* Later entry on the same beat wins. */
  const dup = E.compileTempoMap([{ beat: 0, bpm: 60 }, { beat: 8, bpm: 100 }, { beat: 8, bpm: 200 }]);
  eq(dup.length, 2, 'duplicate beats collapse to one segment');
  eq(dup[1].bpm, 200, 'the later entry at the same beat wins');
  /* Segment start times must agree with transportTime at their own boundary. */
  const m = E.compileTempoMap([{ beat: 0, bpm: 60 }, { beat: 16, bpm: 120 }, { beat: 32, bpm: 90 }]);
  m.forEach((seg, idx) => {
    near(E.transportTime(seg.beat, m, 0), seg.time, 1e-12, `segment ${idx} start time is self-consistent`);
  });
}

/* An UNCOMPILED map must not silently produce NaN. transportTime reads .time
   off each segment; a raw [{beat,bpm}] has none, so every event would land at
   NaN — no error, no sound, no clue. */
{
  const entries = [{ beat: 0, bpm: 60 }, { beat: 16, bpm: 120 }];
  const compiled = E.compileTempoMap(entries);
  near(E.transportTime(32, entries, 0), E.transportTime(32, compiled, 0), 1e-12,
       'a raw tempo map gives the same answer as a compiled one');
  ok(isFinite(E.transportTime(32, entries, 0)), 'a raw tempo map does not produce NaN');
  ok(isFinite(E.beatAtTime(20, entries, 0)), 'beatAtTime accepts a raw map too');
  near(E.beatAtTime(20, entries, 0), E.beatAtTime(20, compiled, 0), 1e-12, 'and agrees with the compiled form');
  ok(isFinite(E.transportTime(4, [], 0)), 'an empty map still yields a finite time');
  ok(isFinite(E.transportTime(4, null, 0)), 'a null map still yields a finite time');
  /* An empty map must not stack the whole piece at one instant. */
  ok(E.transportTime(8, [], 0) > E.transportTime(0, [], 0), 'an empty map still advances with the beat');
}

/* A single tempo object, not wrapped in an array, must not be discarded —
   falling back to the default would play the piece at the wrong tempo silently. */
{
  eq(E.compileTempoMap({ beat: 0, bpm: 90 })[0].bpm, 90, 'a bare tempo object is accepted as a one-entry map');
  near(E.transportTime(90, { beat: 0, bpm: 90 }, 0), 60, 1e-12, 'and is used for the arithmetic');
  eq(E.compileTempoMap('nonsense')[0].bpm, E.DEFAULT_BPM, 'a string still falls back to the default');
  eq(E.compileTempoMap(42)[0].bpm, E.DEFAULT_BPM, 'a number still falls back to the default');
}

/* Accumulation is path-dependent; computation is not. This is the actual
   argument for beatAt(), and it is asserted rather than asserted-about: a
   tempo change partway through must not move any event that precedes it. */
{
  const map = E.compileTempoMap([{ beat: 0, bpm: 100 }, { beat: 50, bpm: 25 }]);
  const before = [];
  for (let n = 0; n < 50; n++) before.push(E.transportTime(E.beatAt(n, 1), map, 0));
  const noChange = E.compileTempoMap([{ beat: 0, bpm: 100 }]);
  let worst = 0;
  for (let n = 0; n < 50; n++) {
    const err = Math.abs(before[n] - E.transportTime(E.beatAt(n, 1), noChange, 0));
    if (err > worst) worst = err;
  }
  ok(worst < 1e-12, 'a later tempo change moves nothing before it');
}

/* ── 10. String synthesis ─────────────────────────────────────────────────
   THE INSTRUMENT IS VALIDATED BEFORE THE THING IT MEASURES.

   The first version of this gate used autocorrelation with parabolic peak
   refinement, and reported the synth as 0.73 cents out — just inside the
   1-cent limit, which looked like a pass with no margin. Measuring the
   ESTIMATOR against pure sines showed it carried 3.65 cents of error by
   itself. The ruler was coarser than the thing being measured, so neither
   number meant anything, and a real defect of up to 3 cents could have sailed
   through while a clean synth could equally have failed.

   The estimator below correlates the signal against a reference oscillator at
   f0 using ABSOLUTE sample index, in two Hann-windowed segments separated by a
   gap. A signal at f0+d advances its phase in that frame by 2*pi*d*gap/sr, so
   d falls out of the phase difference. Hann windowing suppresses harmonic
   leakage into the f0 bin at low pitches, and is worth three orders of
   magnitude.

   THE GAP SETS AN UNAMBIGUOUS RANGE, and getting it wrong is how a precise
   ruler becomes a useless one. The phase difference wraps into (-pi, pi], so
   deviations beyond +/- sr/(2*gap) alias into small readings. The first
   version used a 0.8 s gap, which at E6 gives a range of 0.8 CENTS — narrower
   than the tolerance it was policing. A ten-cent regression at the top of the
   range measured as 0.18 cents and passed.

   GAP_S is therefore 0.02 s: +/- 32 cents of range at E6, still 0.0002 cents
   of precision. Measured, both ways, in the validation block below — which
   feeds it DETUNED tones as well as clean ones, because a validation that only
   ever sees correct pitches cannot exercise the wrap at all. */
function phaseAt(sig, sr, f, start, N) {
  let re = 0, im = 0;
  for (let i = 0; i < N; i++) {
    const w = 2 * Math.PI * f * (start + i) / sr;
    const win = 0.5 - 0.5 * Math.cos(2 * Math.PI * i / (N - 1));
    const s = sig[start + i] * win;
    re += s * Math.cos(w);
    im -= s * Math.sin(w);
  }
  return Math.atan2(im, re);
}
function estimateFreq(sig, sr, f0, start, N, gap) {
  let d = phaseAt(sig, sr, f0, start + gap, N) - phaseAt(sig, sr, f0, start, N);
  while (d > Math.PI) d -= 2 * Math.PI;
  while (d < -Math.PI) d += 2 * Math.PI;
  return f0 + d * sr / (2 * Math.PI * gap);
}

const SR = E.DEFAULT_SAMPLE_RATE;
const CENT_TOL = 1.0;
/* One configuration, shared by the validation and the gate. An earlier draft
   validated a 0.6 s gap and then measured with 0.8 s, so the block that proved
   the ruler was proving a different ruler. */
const AN_START = Math.floor(SR * 0.05);
const AN_N     = Math.floor(SR * 0.4);
const AN_GAP   = Math.floor(SR * 0.02);
const measure  = (sig, f0) => estimateFreq(sig, SR, f0, AN_START, AN_N, AN_GAP);

/* First: prove the ruler, in the exact configuration the gate uses, against
   tones that are deliberately WRONG as well as right. */
{
  const harmonicTone = (freq, secs) => {
    const n = Math.floor(SR * secs), sig = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const t = i / SR;
      sig[i] = Math.sin(2 * Math.PI * freq * t + 0.7)
             + 0.4 * Math.sin(2 * Math.PI * 2 * freq * t + 1.1)
             + 0.2 * Math.sin(2 * Math.PI * 3 * freq * t);
    }
    return sig;
  };

  let worst = 0;
  for (let midi = 40; midi <= 88; midi++) {
    const ref = E.midiToFreq(midi);
    worst = Math.max(worst, Math.abs(E.centsBetween(ref, measure(harmonicTone(ref, 1.2), ref))));
  }
  ok(worst < CENT_TOL / 100,
     `the pitch estimator is at least 100x finer than the tolerance it polices (worst ${worst.toExponential(2)} cents)`);

  /* And it must READ BACK a known detuning rather than aliasing it to nothing.
     This is the assertion whose absence let a ten-cent regression pass. */
  let worstOffset = 0;
  for (const midi of [40, 52, 64, 76, 88]) {
    const ref = E.midiToFreq(midi);
    for (const offset of [-20, -10, -3, -1, 1, 3, 10, 20]) {
      const detuned = ref * Math.pow(2, offset / 1200);
      const read = E.centsBetween(ref, measure(harmonicTone(detuned, 1.2), ref));
      worstOffset = Math.max(worstOffset, Math.abs(read - offset));
    }
  }
  ok(worstOffset < 0.05,
     `a known detuning of up to +/-20 cents reads back correctly at every octave (worst slip ${worstOffset.toExponential(2)} cents)`);
}

/* THE STEP-5 GATE: every pitch E2–E6 within one cent of equal temperament. */
{
  let worst = 0, worstNote = '';
  for (let midi = 40; midi <= 88; midi++) {
    const ref = E.midiToFreq(midi);
    const buf = E.renderPitch(midi, { seconds: 2.0, t60: 6, seed: midi });
    ok(!!buf && buf.length > 0, `midi ${midi} renders`);
    if (!buf) continue;
    const est = measure(buf, ref);
    const c = Math.abs(E.centsBetween(ref, est));
    if (c > worst) { worst = c; worstNote = `${E.midiToLabel(midi)} (${ref.toFixed(1)} Hz)`; }
  }
  ok(worst <= CENT_TOL,
     `every pitch E2–E6 is within ${CENT_TOL} cent of equal temperament (worst ${worst.toFixed(4)} at ${worstNote})`);
}

/* The fractional delay must be doing the work. Rounding to a whole sample is
   the naive implementation, and it must measurably fail the same gate — if it
   passes, the interpolation is decoration and the gate proves nothing. */
{
  const naive = (freq, seconds, seed) => {
    /* Deliberately rounded: the version the plan warned about. */
    const len = Math.round(SR / freq - 0.5) + 1;
    const line = new Float32Array(len);
    let a = seed | 0;
    const rnd = () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a);
                        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
                        return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    for (let i = 0; i < len; i++) line[i] = rnd() * 2 - 1;
    const out = new Float32Array(Math.floor(SR * seconds));
    let w = 0, prev = 0;
    const g = E.loopGainFor(freq, 6);
    for (let n = 0; n < out.length; n++) {
      const s = line[(w - (len - 1) + len) % len];
      const y = g * 0.5 * (s + prev);
      prev = s; line[w] = y; out[n] = y; w = (w + 1) % len;
    }
    return out;
  };
  let naiveWorst = 0;
  for (let midi = 40; midi <= 88; midi++) {
    const ref = E.midiToFreq(midi);
    const est = measure(naive(ref, 2.0, midi), ref);
    naiveWorst = Math.max(naiveWorst, Math.abs(E.centsBetween(ref, est)));
  }
  ok(naiveWorst > CENT_TOL,
     `rounding the delay to a whole sample fails the same gate (${naiveWorst.toFixed(2)} cents), so the interpolation is load-bearing`);
}

/* Decay must be frequency-compensated, or the top of the range goes "plink"
   while the bottom rings on. Energy remaining after one second should be
   comparable across the range rather than differing by orders of magnitude. */
{
  const energyAt = (midi, atSec) => {
    const buf = E.renderPitch(midi, { seconds: atSec + 0.1, t60: 2.5, seed: midi });
    let sum = 0;
    for (let i = Math.floor(SR * atSec); i < Math.floor(SR * (atSec + 0.05)); i++) sum += buf[i] * buf[i];
    return Math.sqrt(sum);
  };
  const lo = energyAt(40, 1.0), hi = energyAt(88, 1.0);
  ok(lo > 0 && hi > 0, 'both ends of the range still sound after a second');
  const ratio = Math.max(lo, hi) / Math.min(lo, hi);
  ok(ratio < 20, `decay is comparable across the range after 1 s (ratio ${ratio.toFixed(1)}x)`);
  /* And the compensation is real: a FIXED loop gain must be far worse. */
  const fixedLo = E.karplusStrong(E.midiToFreq(40), { seconds: 1.1, decay: 0.996, seed: 40 });
  const fixedHi = E.karplusStrong(E.midiToFreq(88), { seconds: 1.1, decay: 0.996, seed: 88 });
  const rms = b => { let s = 0; for (let i = Math.floor(SR * 1.0); i < Math.floor(SR * 1.05); i++) s += b[i] * b[i]; return Math.sqrt(s); };
  const fixedRatio = Math.max(rms(fixedLo), rms(fixedHi)) / Math.max(1e-30, Math.min(rms(fixedLo), rms(fixedHi)));
  ok(fixedRatio > ratio * 10,
     `a fixed loop gain is far more lopsided (${fixedRatio.toExponential(1)}x vs ${ratio.toFixed(1)}x), so the compensation earns its place`);
}

/* Determinism and boundaries. */
{
  const a = E.renderPitch(64, { seconds: 0.2, seed: 7 });
  const b = E.renderPitch(64, { seconds: 0.2, seed: 7 });
  let same = a.length === b.length;
  for (let i = 0; same && i < a.length; i++) if (a[i] !== b[i]) same = false;
  ok(same, 'the same seed renders byte-identical audio, so the gate cannot flake');
  const c = E.renderPitch(64, { seconds: 0.2, seed: 8 });
  let differs = false;
  for (let i = 0; i < a.length; i++) if (a[i] !== c[i]) { differs = true; break; }
  ok(differs, 'a different seed renders different audio');

  /* The 44100 default is a trap for any caller on a 48 kHz AudioContext — it
     would play about 147 cents sharp. guitar-audio.js must pass ctx.sampleRate.
     Assert the parameter actually works, so the wiring has something to lean on. */
  {
    const SR48 = 48000, ref = E.midiToFreq(64);
    const buf = E.karplusStrong(ref, { sampleRate: SR48, seconds: 1.5, t60: 6, seed: 64 });
    ok(!!buf, 'renders at 48 kHz');
    const est = estimateFreq(buf, SR48, ref, Math.floor(SR48 * 0.05), Math.floor(SR48 * 0.4), Math.floor(SR48 * 0.02));
    ok(Math.abs(E.centsBetween(ref, est)) <= CENT_TOL, 'and is in tune at 48 kHz, so sampleRate is honoured');
  }

  eq(E.karplusStrong(0), null, 'zero frequency renders nothing');
  eq(E.karplusStrong(-100), null, 'negative frequency renders nothing');
  eq(E.karplusStrong(SR), null, 'a frequency at the sample rate renders nothing');
  eq(E.karplusStrong(SR / 2), null, 'a frequency at Nyquist renders nothing');
  ok(E.karplusStrong(E.midiToFreq(40)) !== null, 'the low E renders');
  ok(E.renderPitch(40, { seconds: 0.05 }).length === Math.floor(SR * 0.05), 'length follows the requested duration');
  /* Nothing may clip: a buffer that exceeds unity distorts on playback. */
  for (const midi of [40, 52, 64, 76, 88]) {
    const buf = E.renderPitch(midi, { seconds: 0.5, seed: midi });
    let peak = 0;
    for (let i = 0; i < buf.length; i++) peak = Math.max(peak, Math.abs(buf[i]));
    ok(peak <= 1.0, `${E.midiToLabel(midi)} does not clip (peak ${peak.toFixed(3)})`);
  }
}

/* ── Rolled chords and picking patterns ──────────────────────────────────
   Both were built for phase 1's last two units, and both encode a decision
   that was previously made in the player where nothing could test it. */
{
  const chord = [{ string: 1, fret: 0 }, { string: 6, fret: 3 }, { string: 4, fret: 0 }];
  const rolled = E.rollChord(chord, 4, 4, 0.06);
  eq(rolled.length, 3, 'a rolled chord keeps every note');
  eq(rolled[0].string, 6, 'a roll starts on the lowest string');
  eq(rolled[2].string, 1, 'and ends on the highest');
  ok(rolled.every(n => n.beat === 4), 'every note of a roll is on the same beat');
  near(rolled[1].delayS, 0.06, 1e-9, 'the second string is one spread behind');
  near(rolled[2].delayS, 0.12, 1e-9, 'the third is two');
  ok(rolled.every(n => n.voice === 'chord'), 'a roll uses the chord voice, not the pluck voice');
  ok(rolled[0].level > rolled[2].level, 'a roll eases towards the top');
  /* The spread is in seconds, so it is the same at any tempo. Expressed in
     beats it would tighten as the tempo rose — a block chord played fast. */
  const slow = E.rollChord(chord, 0, 4, 0.06), fast = E.rollChord(chord, 0, 1, 0.06);
  eq(slow[2].delayS, fast[2].delayS, 'the roll spread does not change with the note length');

  const pat = E.generatePicking({ patternId: 'pima', chords: [{ chordId: 'maj', rootPc: 0, times: 2 }] });
  eq(pat.notes.length, 8, 'p-i-m-a over two rounds is eight notes');
  eq(pat.notes.map(n => n.finger).join(''), 'pimapima', 'the fingers come out in the pattern order');
  eq(pat.notes[0].string, 5, 'p takes the lowest sounding string of an open C');
  eq(pat.notes[3].string, 1, 'a takes the highest');
  eq(pat.voicings.length, 1, 'the voicing it used comes back, so the boxes and the tab agree');
  ok(E.generatePicking({ patternId: 'nope', chords: [{ chordId: 'maj', rootPc: 0 }] }).fault,
     'an unknown pattern is a fault, not silence');
  ok(E.generatePicking({ patternId: 'pima', chords: [] }).fault,
     'a picking exercise with no chords is a fault');
  ok(E.generatePicking({ patternId: 'pima', chords: [{ chordId: 'wat', rootPc: 0 }] }).fault,
     'an unknown chord is a fault');
  /* Every pattern, over every chord the module has, in every tuning and under
     every capo a card may declare: the notes must be playable where they were
     computed. This is the sweep the picking branch never had. */
  let cases = 0;
  for (const tuning of Object.keys(E.TUNINGS)) {
    for (const capo of [0, 2, 5]) {
      for (const patternId of Object.keys(E.PICKING)) {
        for (const chordId of Object.keys(E.CHORDS)) {
          for (let rootPc = 0; rootPc < 12; rootPc += 5) {
            cases++;
            const ex = E.generatePicking({ patternId, chords: [{ chordId, rootPc }], tuning, capo });
            if (ex.fault) { ok(false, `${patternId} ${chordId} ${rootPc} in ${tuning} capo ${capo}: ${ex.fault}`); continue; }
            for (const n of ex.notes) {
              const fault = E.noteFault(n, ex.fb);
              if (fault) ok(false, `${patternId} ${chordId} in ${tuning} capo ${capo}: ${fault}`);
            }
          }
        }
      }
    }
  }
  ok(cases > 1000, `the picking sweep covered ${cases} cases`);
}

/* ── Report ──────────────────────────────────────────────────────────────── */
console.log(`${BOLD}guitar-engine.js — fretboard, timing and synthesis${RESET}\n`);
console.log(`  ${DIM}${checks} assertions.${RESET}`);
console.log(`  ${DIM}Fretboard: pitch, reachability and drawn coordinates over ${Object.keys(EXPECTED_TUNINGS).length} tunings × capo {0,2,5,7} × both handednesses.${RESET}`);
console.log(`  ${DIM}Timing: 10,000 events across tempo changes within ${TOL_MS} ms, round-trip inversion, and the loop-iteration guard.${RESET}`);
console.log(`  ${DIM}Synthesis: every pitch E2–E6 within ${CENT_TOL} cent, measured with an estimator validated to 100x that.${RESET}`);
console.log('');
if (failures.length) {
  failures.forEach(f => console.log(`  ${RED}✗${RESET}  ${f}`));
  console.log(`\n${RED}${BOLD}${failures.length} failure(s).${RESET}\n`);
  process.exit(1);
}
console.log(`  ${GREEN}✓  all ${checks} assertions pass${RESET}\n`);
