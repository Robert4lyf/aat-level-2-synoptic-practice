/* Authored exercises — the ones a lesson names and the player renders.
 *
 * Generated exercises come from guitar-engine.js: give it a scale, a position
 * and a sequence and it produces the notes. That covers scale work, which is
 * most of the M strand. It cannot cover technique work, where the point is a
 * specific hand movement on specific strings — an open-string alternation drill
 * is not a scale, and asking the generator for one would mean teaching it about
 * picking fingers so that a single unit could use it.
 *
 * So these are written out. Every one is the note representation from the plan,
 * the same shape the generator emits, so the renderer, the transport and the
 * playability checker treat both kinds identically:
 *
 *   { string, fret, beat, dur, hand, finger, tech? }
 *
 * string 1 is the high E, always. fret is absolute from the nut, never
 * capo-relative. beat is 0-based in beats. hand is 'p' picking or 'f' fretting,
 * and finger is p/i/m/a for the picking hand or 1-4 for the fretting hand.
 *
 * `bpm` is a starting tempo, not a target. Every one of these is more useful
 * slow, and the unit says so in the prose rather than here.
 *
 * DRILLS AND DEMONSTRATIONS are different things and the difference is marked.
 * A drill has a tempo: playing it faster is the point, and the reader sets it.
 * A demonstration is two chords put side by side so they can be compared, and
 * it has no tempo at all — the gap between them is staging, not rhythm. Left
 * as a drill, that gap stretched and shrank with a tempo slider that meant
 * nothing for it, so at 108 bpm the comparison went past too fast to hear.
 *
 * A demonstration carries `demo: true` and `beatSeconds`: one beat lasts that
 * many seconds whatever the reader has set, and the player offers no tempo
 * control for it. Use it only where the timing genuinely carries no musical
 * information.
 */
(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.GuitarExercises = api;
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* Repeat a one-bar figure, shifting each copy along the beat. Written as a
     helper because the alternative is four hand-typed copies of the same eight
     notes, differing only in a number, and the fourth copy is where the typo
     goes. */
  function repeat(notes, times, barBeats) {
    var out = [];
    for (var r = 0; r < times; r++) {
      for (var i = 0; i < notes.length; i++) {
        var n = notes[i];
        out.push({
          string: n.string, fret: n.fret,
          beat: n.beat + r * barBeats, dur: n.dur,
          hand: n.hand, finger: n.finger, tech: n.tech
        });
      }
    }
    return out;
  }

  /* Open string, picked with one named finger, one note per beat. */
  function pulse(string, finger, count, startBeat, dur) {
    var out = [];
    for (var i = 0; i < count; i++) {
      out.push({ string: string, fret: 0, beat: startBeat + i * (dur || 1),
                 dur: dur || 1, hand: 'p', finger: finger });
    }
    return out;
  }

  var EXERCISES = {

    /* ── P1.2 · placing the picking hand ─────────────────────────────────── */
    'p1-home': {
      kind: 'authored', curated: true, bpm: 60, beatsPerBar: 4,
      title: 'Each finger on its own string',
      tags: ['P1', 'picking', 'open'],
      notes: [
        { string: 6, fret: 0, beat: 0, dur: 1, hand: 'p', finger: 'p' },
        { string: 3, fret: 0, beat: 1, dur: 1, hand: 'p', finger: 'i' },
        { string: 2, fret: 0, beat: 2, dur: 1, hand: 'p', finger: 'm' },
        { string: 1, fret: 0, beat: 3, dur: 1, hand: 'p', finger: 'a' },
        { string: 5, fret: 0, beat: 4, dur: 1, hand: 'p', finger: 'p' },
        { string: 3, fret: 0, beat: 5, dur: 1, hand: 'p', finger: 'i' },
        { string: 2, fret: 0, beat: 6, dur: 1, hand: 'p', finger: 'm' },
        { string: 1, fret: 0, beat: 7, dur: 1, hand: 'p', finger: 'a' }
      ]
    },

    /* ── P1.3 · free stroke ──────────────────────────────────────────────── */
    'p1-free-single': {
      kind: 'authored', curated: true, bpm: 54, beatsPerBar: 4,
      title: 'Free stroke, one string',
      tags: ['P1', 'free stroke', 'open'],
      notes: pulse(1, 'i', 4, 0).concat(pulse(1, 'm', 4, 4))
    },
    'p1-free-across': {
      kind: 'authored', curated: true, bpm: 54, beatsPerBar: 4,
      title: 'Free stroke across three strings',
      tags: ['P1', 'free stroke', 'open'],
      notes: [
        { string: 3, fret: 0, beat: 0, dur: 1, hand: 'p', finger: 'i' },
        { string: 2, fret: 0, beat: 1, dur: 1, hand: 'p', finger: 'm' },
        { string: 1, fret: 0, beat: 2, dur: 1, hand: 'p', finger: 'a' },
        { string: 2, fret: 0, beat: 3, dur: 1, hand: 'p', finger: 'm' },
        { string: 3, fret: 0, beat: 4, dur: 1, hand: 'p', finger: 'i' },
        { string: 2, fret: 0, beat: 5, dur: 1, hand: 'p', finger: 'm' },
        { string: 1, fret: 0, beat: 6, dur: 1, hand: 'p', finger: 'a' },
        { string: 2, fret: 0, beat: 7, dur: 1, hand: 'p', finger: 'm' }
      ]
    },

    /* ── P1.4 · rest stroke ──────────────────────────────────────────────── */
    'p1-rest-single': {
      kind: 'authored', curated: true, bpm: 50, beatsPerBar: 4,
      title: 'Rest stroke, one string',
      tags: ['P1', 'rest stroke', 'open'],
      notes: pulse(2, 'm', 4, 0).concat(pulse(1, 'm', 4, 4))
    },
    'p1-rest-vs-free': {
      kind: 'authored', curated: true, bpm: 50, beatsPerBar: 4,
      title: 'The same phrase, both strokes',
      tags: ['P1', 'rest stroke', 'free stroke', 'tone'],
      notes: [
        { string: 1, fret: 0, beat: 0, dur: 0.5, hand: 'p', finger: 'i' },
        { string: 1, fret: 3, beat: 0.5, dur: 0.5, hand: 'p', finger: 'm' },
        { string: 1, fret: 5, beat: 1, dur: 1, hand: 'p', finger: 'i' },
        { string: 1, fret: 3, beat: 2, dur: 0.5, hand: 'p', finger: 'm' },
        { string: 1, fret: 0, beat: 2.5, dur: 1.5, hand: 'p', finger: 'i' }
      ]
    },

    /* ── P1.5 · alternation ──────────────────────────────────────────────── */
    'p1-alternate-open': {
      kind: 'authored', curated: true, bpm: 60, beatsPerBar: 4,
      title: 'i and m, taking turns',
      tags: ['P1', 'alternation', 'open'],
      notes: repeat([
        { string: 1, fret: 0, beat: 0, dur: 0.5, hand: 'p', finger: 'i' },
        { string: 1, fret: 0, beat: 0.5, dur: 0.5, hand: 'p', finger: 'm' },
        { string: 1, fret: 0, beat: 1, dur: 0.5, hand: 'p', finger: 'i' },
        { string: 1, fret: 0, beat: 1.5, dur: 0.5, hand: 'p', finger: 'm' },
        { string: 2, fret: 0, beat: 2, dur: 0.5, hand: 'p', finger: 'i' },
        { string: 2, fret: 0, beat: 2.5, dur: 0.5, hand: 'p', finger: 'm' },
        { string: 2, fret: 0, beat: 3, dur: 0.5, hand: 'p', finger: 'i' },
        { string: 2, fret: 0, beat: 3.5, dur: 0.5, hand: 'p', finger: 'm' }
      ], 2, 4)
    },
    'p1-alternate-scale': {
      kind: 'authored', curated: true, bpm: 56, beatsPerBar: 4,
      title: 'Alternation through a moving line',
      tags: ['P1', 'alternation', 'fretted'],
      notes: [
        { string: 3, fret: 0, beat: 0, dur: 0.5, hand: 'p', finger: 'i' },
        { string: 3, fret: 2, beat: 0.5, dur: 0.5, hand: 'p', finger: 'm' },
        { string: 2, fret: 0, beat: 1, dur: 0.5, hand: 'p', finger: 'i' },
        { string: 2, fret: 1, beat: 1.5, dur: 0.5, hand: 'p', finger: 'm' },
        { string: 2, fret: 3, beat: 2, dur: 0.5, hand: 'p', finger: 'i' },
        { string: 1, fret: 0, beat: 2.5, dur: 0.5, hand: 'p', finger: 'm' },
        { string: 1, fret: 1, beat: 3, dur: 0.5, hand: 'p', finger: 'i' },
        { string: 1, fret: 3, beat: 3.5, dur: 0.5, hand: 'p', finger: 'm' },
        { string: 1, fret: 1, beat: 4, dur: 0.5, hand: 'p', finger: 'i' },
        { string: 1, fret: 0, beat: 4.5, dur: 0.5, hand: 'p', finger: 'm' },
        { string: 2, fret: 3, beat: 5, dur: 0.5, hand: 'p', finger: 'i' },
        { string: 2, fret: 1, beat: 5.5, dur: 0.5, hand: 'p', finger: 'm' },
        { string: 2, fret: 0, beat: 6, dur: 0.5, hand: 'p', finger: 'i' },
        { string: 3, fret: 2, beat: 6.5, dur: 0.5, hand: 'p', finger: 'm' },
        { string: 3, fret: 0, beat: 7, dur: 1, hand: 'p', finger: 'i' }
      ]
    },

    /* ── P1.6 · the thumb underneath ─────────────────────────────────────── */
    'p1-thumb-alone': {
      kind: 'authored', curated: true, bpm: 60, beatsPerBar: 4,
      title: 'The thumb on its own',
      tags: ['P1', 'thumb', 'open'],
      notes: [
        { string: 6, fret: 0, beat: 0, dur: 1, hand: 'p', finger: 'p' },
        { string: 5, fret: 0, beat: 1, dur: 1, hand: 'p', finger: 'p' },
        { string: 4, fret: 0, beat: 2, dur: 1, hand: 'p', finger: 'p' },
        { string: 5, fret: 0, beat: 3, dur: 1, hand: 'p', finger: 'p' },
        { string: 6, fret: 0, beat: 4, dur: 1, hand: 'p', finger: 'p' },
        { string: 5, fret: 0, beat: 5, dur: 1, hand: 'p', finger: 'p' },
        { string: 4, fret: 0, beat: 6, dur: 1, hand: 'p', finger: 'p' },
        { string: 5, fret: 0, beat: 7, dur: 1, hand: 'p', finger: 'p' }
      ]
    },
    'p1-thumb-under': {
      kind: 'authored', curated: true, bpm: 52, beatsPerBar: 4,
      title: 'Bass on the beat, fingers between',
      tags: ['P1', 'thumb', 'independence'],
      notes: repeat([
        { string: 5, fret: 0, beat: 0, dur: 1, hand: 'p', finger: 'p' },
        { string: 2, fret: 0, beat: 0.5, dur: 0.5, hand: 'p', finger: 'm' },
        { string: 4, fret: 0, beat: 1, dur: 1, hand: 'p', finger: 'p' },
        { string: 1, fret: 0, beat: 1.5, dur: 0.5, hand: 'p', finger: 'a' },
        { string: 5, fret: 0, beat: 2, dur: 1, hand: 'p', finger: 'p' },
        { string: 2, fret: 0, beat: 2.5, dur: 0.5, hand: 'p', finger: 'm' },
        { string: 4, fret: 0, beat: 3, dur: 1, hand: 'p', finger: 'p' },
        { string: 1, fret: 0, beat: 3.5, dur: 0.5, hand: 'p', finger: 'a' }
      ], 2, 4)
    },

    /* ── P1.1 · posture, which needs undemanding material ────────────────
       These exist because the first draft of the unit borrowed lesson 3, 6 and
       7's exercises for lesson 1 — so a reader met the free-stroke drill before
       the free stroke, and met it again two cards later when it was actually
       taught. Posture cards need something easy enough that the hands are free
       to be watched rather than managed. */
    'p1-sit-settle': {
      kind: 'authored', curated: true, bpm: 50, beatsPerBar: 4,
      title: 'Open basses, unhurried',
      tags: ['P1', 'posture', 'open'],
      notes: [
        { string: 6, fret: 0, beat: 0, dur: 2, hand: 'p', finger: 'p' },
        { string: 5, fret: 0, beat: 2, dur: 2, hand: 'p', finger: 'p' },
        { string: 4, fret: 0, beat: 4, dur: 2, hand: 'p', finger: 'p' },
        { string: 5, fret: 0, beat: 6, dur: 2, hand: 'p', finger: 'p' }
      ]
    },
    'p1-sit-reach': {
      kind: 'authored', curated: true, bpm: 48, beatsPerBar: 4,
      title: 'Reaching the first fret',
      tags: ['P1', 'posture', 'fretting'],
      notes: [
        { string: 6, fret: 1, beat: 0, dur: 1, hand: 'f', finger: 1 },
        { string: 4, fret: 1, beat: 1, dur: 1, hand: 'f', finger: 1 },
        { string: 2, fret: 1, beat: 2, dur: 1, hand: 'f', finger: 1 },
        { string: 1, fret: 1, beat: 3, dur: 1, hand: 'f', finger: 1 },
        { string: 2, fret: 1, beat: 4, dur: 1, hand: 'f', finger: 1 },
        { string: 4, fret: 1, beat: 5, dur: 1, hand: 'f', finger: 1 },
        { string: 6, fret: 1, beat: 6, dur: 2, hand: 'f', finger: 1 }
      ]
    },
    'p1-sit-signals': {
      kind: 'authored', curated: true, bpm: 46, beatsPerBar: 4,
      title: 'Enough work to show the faults',
      tags: ['P1', 'posture', 'fretting'],
      notes: [
        { string: 5, fret: 2, beat: 0, dur: 1, hand: 'f', finger: 2 },
        { string: 4, fret: 2, beat: 1, dur: 1, hand: 'f', finger: 2 },
        { string: 3, fret: 1, beat: 2, dur: 1, hand: 'f', finger: 1 },
        { string: 2, fret: 3, beat: 3, dur: 1, hand: 'f', finger: 3 },
        { string: 3, fret: 1, beat: 4, dur: 1, hand: 'f', finger: 1 },
        { string: 4, fret: 2, beat: 5, dur: 1, hand: 'f', finger: 2 },
        { string: 5, fret: 2, beat: 6, dur: 2, hand: 'f', finger: 2 }
      ]
    },
    'p1-sit-noanchor': {
      kind: 'authored', curated: true, bpm: 52, beatsPerBar: 4,
      title: 'Three strings, nothing resting',
      tags: ['P1', 'posture', 'open'],
      notes: [
        { string: 3, fret: 0, beat: 0, dur: 1, hand: 'p', finger: 'i' },
        { string: 1, fret: 0, beat: 1, dur: 1, hand: 'p', finger: 'a' },
        { string: 2, fret: 0, beat: 2, dur: 1, hand: 'p', finger: 'm' },
        { string: 1, fret: 0, beat: 3, dur: 1, hand: 'p', finger: 'a' },
        { string: 3, fret: 0, beat: 4, dur: 1, hand: 'p', finger: 'i' },
        { string: 1, fret: 0, beat: 5, dur: 1, hand: 'p', finger: 'a' },
        { string: 2, fret: 0, beat: 6, dur: 2, hand: 'p', finger: 'm' }
      ]
    },
    'p1-sit-mirror': {
      kind: 'authored', curated: true, bpm: 46, beatsPerBar: 4,
      title: 'Both hands, slowly',
      tags: ['P1', 'posture'],
      notes: [
        { string: 5, fret: 2, beat: 0, dur: 1, hand: 'p', finger: 'p' },
        { string: 2, fret: 0, beat: 1, dur: 1, hand: 'p', finger: 'm' },
        { string: 4, fret: 2, beat: 2, dur: 1, hand: 'p', finger: 'p' },
        { string: 1, fret: 0, beat: 3, dur: 1, hand: 'p', finger: 'a' },
        { string: 5, fret: 0, beat: 4, dur: 1, hand: 'p', finger: 'p' },
        { string: 2, fret: 0, beat: 5, dur: 1, hand: 'p', finger: 'm' },
        { string: 4, fret: 0, beat: 6, dur: 2, hand: 'p', finger: 'p' }
      ]
    },

    /* ── P1.2 · placing the hand ─────────────────────────────────────────── */
    'p1-home-hold': {
      kind: 'authored', curated: true, bpm: 56, beatsPerBar: 4,
      title: 'i, m and a stay put',
      tags: ['P1', 'picking', 'open'],
      notes: [
        { string: 6, fret: 0, beat: 0, dur: 1, hand: 'p', finger: 'p' },
        { string: 1, fret: 0, beat: 1, dur: 1, hand: 'p', finger: 'a' },
        { string: 2, fret: 0, beat: 2, dur: 1, hand: 'p', finger: 'm' },
        { string: 3, fret: 0, beat: 3, dur: 1, hand: 'p', finger: 'i' },
        { string: 4, fret: 0, beat: 4, dur: 1, hand: 'p', finger: 'p' },
        { string: 1, fret: 0, beat: 5, dur: 1, hand: 'p', finger: 'a' },
        { string: 2, fret: 0, beat: 6, dur: 1, hand: 'p', finger: 'm' },
        { string: 3, fret: 0, beat: 7, dur: 1, hand: 'p', finger: 'i' }
      ]
    },
    'p1-nail-listen': {
      kind: 'authored', curated: true, bpm: 46, beatsPerBar: 4,
      title: 'One string, listening for the click',
      tags: ['P1', 'hygiene', 'tone'],
      notes: [
        { string: 2, fret: 0, beat: 0, dur: 2, hand: 'p', finger: 'i' },
        { string: 2, fret: 0, beat: 2, dur: 2, hand: 'p', finger: 'm' },
        { string: 2, fret: 0, beat: 4, dur: 2, hand: 'p', finger: 'a' },
        { string: 2, fret: 0, beat: 6, dur: 2, hand: 'p', finger: 'i' }
      ]
    },
    'p1-a-alone': {
      kind: 'authored', curated: true, bpm: 50, beatsPerBar: 4,
      title: 'Giving a its own turn',
      tags: ['P1', 'picking', 'independence'],
      notes: [
        { string: 1, fret: 0, beat: 0, dur: 1, hand: 'p', finger: 'a' },
        { string: 2, fret: 0, beat: 1, dur: 1, hand: 'p', finger: 'm' },
        { string: 1, fret: 0, beat: 2, dur: 1, hand: 'p', finger: 'a' },
        { string: 3, fret: 0, beat: 3, dur: 1, hand: 'p', finger: 'i' },
        { string: 1, fret: 0, beat: 4, dur: 1, hand: 'p', finger: 'a' },
        { string: 2, fret: 0, beat: 5, dur: 1, hand: 'p', finger: 'm' },
        { string: 1, fret: 0, beat: 6, dur: 2, hand: 'p', finger: 'a' }
      ]
    },

    /* ── P1.3 · free stroke ──────────────────────────────────────────────── */
    'p1-free-prepare': {
      kind: 'authored', curated: true, bpm: 44, beatsPerBar: 4,
      title: 'Land, wait, play',
      tags: ['P1', 'free stroke', 'preparation'],
      notes: [
        { string: 1, fret: 0, beat: 0, dur: 2, hand: 'p', finger: 'i' },
        { string: 1, fret: 0, beat: 2, dur: 2, hand: 'p', finger: 'm' },
        { string: 2, fret: 0, beat: 4, dur: 2, hand: 'p', finger: 'i' },
        { string: 2, fret: 0, beat: 6, dur: 2, hand: 'p', finger: 'm' }
      ]
    },
    'p1-free-release': {
      kind: 'authored', curated: true, bpm: 50, beatsPerBar: 4,
      title: 'Follow through and open again',
      tags: ['P1', 'free stroke'],
      notes: [
        { string: 2, fret: 0, beat: 0, dur: 1, hand: 'p', finger: 'i' },
        { string: 1, fret: 0, beat: 1, dur: 1, hand: 'p', finger: 'm' },
        { string: 2, fret: 0, beat: 2, dur: 1, hand: 'p', finger: 'i' },
        { string: 1, fret: 0, beat: 3, dur: 1, hand: 'p', finger: 'm' },
        { string: 3, fret: 0, beat: 4, dur: 1, hand: 'p', finger: 'i' },
        { string: 1, fret: 0, beat: 5, dur: 1, hand: 'p', finger: 'm' },
        { string: 3, fret: 0, beat: 6, dur: 2, hand: 'p', finger: 'i' }
      ]
    },
    'p1-free-tone': {
      kind: 'authored', curated: true, bpm: 52, beatsPerBar: 4,
      title: 'The same figure, three places',
      tags: ['P1', 'free stroke', 'tone'],
      notes: [
        { string: 3, fret: 0, beat: 0, dur: 1, hand: 'p', finger: 'i' },
        { string: 2, fret: 0, beat: 1, dur: 1, hand: 'p', finger: 'm' },
        { string: 1, fret: 0, beat: 2, dur: 2, hand: 'p', finger: 'a' },
        { string: 3, fret: 0, beat: 4, dur: 1, hand: 'p', finger: 'i' },
        { string: 2, fret: 0, beat: 5, dur: 1, hand: 'p', finger: 'm' },
        { string: 1, fret: 0, beat: 6, dur: 2, hand: 'p', finger: 'a' }
      ]
    },

    /* ── P1.4 · rest stroke ──────────────────────────────────────────────── */
    'p1-rest-melody': {
      kind: 'authored', curated: true, bpm: 48, beatsPerBar: 4,
      title: 'A melody that has to carry',
      tags: ['P1', 'rest stroke', 'tone'],
      notes: [
        { string: 2, fret: 1, beat: 0, dur: 1, hand: 'p', finger: 'm' },
        { string: 2, fret: 3, beat: 1, dur: 1, hand: 'p', finger: 'm' },
        { string: 1, fret: 0, beat: 2, dur: 1, hand: 'p', finger: 'm' },
        { string: 1, fret: 1, beat: 3, dur: 1, hand: 'p', finger: 'm' },
        { string: 1, fret: 3, beat: 4, dur: 2, hand: 'p', finger: 'm' },
        { string: 1, fret: 1, beat: 6, dur: 2, hand: 'p', finger: 'm' }
      ]
    },
    'p1-rest-angle': {
      kind: 'authored', curated: true, bpm: 44, beatsPerBar: 4,
      title: 'Feeling where the finger stops',
      tags: ['P1', 'rest stroke'],
      notes: [
        { string: 3, fret: 0, beat: 0, dur: 2, hand: 'p', finger: 'm' },
        { string: 3, fret: 2, beat: 2, dur: 2, hand: 'p', finger: 'i' },
        { string: 2, fret: 0, beat: 4, dur: 2, hand: 'p', finger: 'm' },
        { string: 2, fret: 1, beat: 6, dur: 2, hand: 'p', finger: 'i' }
      ]
    },
    'p1-rest-alternate': {
      kind: 'authored', curated: true, bpm: 46, beatsPerBar: 4,
      title: 'Rest strokes, taking turns',
      tags: ['P1', 'rest stroke', 'alternation'],
      notes: [
        { string: 1, fret: 0, beat: 0, dur: 0.5, hand: 'p', finger: 'i' },
        { string: 1, fret: 1, beat: 0.5, dur: 0.5, hand: 'p', finger: 'm' },
        { string: 1, fret: 3, beat: 1, dur: 0.5, hand: 'p', finger: 'i' },
        { string: 1, fret: 5, beat: 1.5, dur: 0.5, hand: 'p', finger: 'm' },
        { string: 1, fret: 3, beat: 2, dur: 0.5, hand: 'p', finger: 'i' },
        { string: 1, fret: 1, beat: 2.5, dur: 0.5, hand: 'p', finger: 'm' },
        { string: 1, fret: 0, beat: 3, dur: 1, hand: 'p', finger: 'i' },
        { string: 2, fret: 1, beat: 4, dur: 0.5, hand: 'p', finger: 'm' },
        { string: 2, fret: 3, beat: 4.5, dur: 0.5, hand: 'p', finger: 'i' },
        { string: 1, fret: 0, beat: 5, dur: 0.5, hand: 'p', finger: 'm' },
        { string: 1, fret: 1, beat: 5.5, dur: 0.5, hand: 'p', finger: 'i' },
        { string: 1, fret: 0, beat: 6, dur: 2, hand: 'p', finger: 'm' }
      ]
    },

    /* ── P1.5 · alternation ──────────────────────────────────────────────── */
    'p1-alternate-cross': {
      kind: 'authored', curated: true, bpm: 54, beatsPerBar: 4,
      title: 'Alternation across a string change',
      tags: ['P1', 'alternation', 'open'],
      notes: [
        { string: 3, fret: 0, beat: 0, dur: 0.5, hand: 'p', finger: 'i' },
        { string: 3, fret: 0, beat: 0.5, dur: 0.5, hand: 'p', finger: 'm' },
        { string: 2, fret: 0, beat: 1, dur: 0.5, hand: 'p', finger: 'i' },
        { string: 1, fret: 0, beat: 1.5, dur: 0.5, hand: 'p', finger: 'm' },
        { string: 2, fret: 0, beat: 2, dur: 0.5, hand: 'p', finger: 'i' },
        { string: 3, fret: 0, beat: 2.5, dur: 0.5, hand: 'p', finger: 'm' },
        { string: 2, fret: 0, beat: 3, dur: 0.5, hand: 'p', finger: 'i' },
        { string: 1, fret: 0, beat: 3.5, dur: 0.5, hand: 'p', finger: 'm' },
        { string: 1, fret: 0, beat: 4, dur: 0.5, hand: 'p', finger: 'i' },
        { string: 2, fret: 0, beat: 4.5, dur: 0.5, hand: 'p', finger: 'm' },
        { string: 3, fret: 0, beat: 5, dur: 0.5, hand: 'p', finger: 'i' },
        { string: 2, fret: 0, beat: 5.5, dur: 0.5, hand: 'p', finger: 'm' },
        { string: 1, fret: 0, beat: 6, dur: 2, hand: 'p', finger: 'i' }
      ]
    },
    'p1-alternate-ma': {
      kind: 'authored', curated: true, bpm: 50, beatsPerBar: 4,
      title: 'm and a taking turns',
      tags: ['P1', 'alternation', 'independence'],
      notes: [
        { string: 2, fret: 0, beat: 0, dur: 0.5, hand: 'p', finger: 'm' },
        { string: 1, fret: 0, beat: 0.5, dur: 0.5, hand: 'p', finger: 'a' },
        { string: 2, fret: 0, beat: 1, dur: 0.5, hand: 'p', finger: 'm' },
        { string: 1, fret: 0, beat: 1.5, dur: 0.5, hand: 'p', finger: 'a' },
        { string: 1, fret: 0, beat: 2, dur: 0.5, hand: 'p', finger: 'm' },
        { string: 1, fret: 0, beat: 2.5, dur: 0.5, hand: 'p', finger: 'a' },
        { string: 1, fret: 0, beat: 3, dur: 0.5, hand: 'p', finger: 'm' },
        { string: 1, fret: 0, beat: 3.5, dur: 0.5, hand: 'p', finger: 'a' },
        { string: 2, fret: 0, beat: 4, dur: 0.5, hand: 'p', finger: 'm' },
        { string: 1, fret: 0, beat: 4.5, dur: 0.5, hand: 'p', finger: 'a' },
        { string: 2, fret: 0, beat: 5, dur: 0.5, hand: 'p', finger: 'm' },
        { string: 1, fret: 0, beat: 5.5, dur: 0.5, hand: 'p', finger: 'a' },
        { string: 2, fret: 0, beat: 6, dur: 2, hand: 'p', finger: 'm' }
      ]
    },
    'p1-alternate-bass': {
      kind: 'authored', curated: true, bpm: 48, beatsPerBar: 4,
      title: 'Alternation with a bass under it',
      tags: ['P1', 'alternation', 'thumb'],
      notes: [
        { string: 5, fret: 0, beat: 0, dur: 1, hand: 'p', finger: 'p' },
        { string: 2, fret: 0, beat: 0.5, dur: 0.5, hand: 'p', finger: 'i' },
        { string: 1, fret: 0, beat: 1, dur: 0.5, hand: 'p', finger: 'm' },
        { string: 2, fret: 0, beat: 1.5, dur: 0.5, hand: 'p', finger: 'i' },
        { string: 4, fret: 0, beat: 2, dur: 1, hand: 'p', finger: 'p' },
        { string: 1, fret: 0, beat: 2.5, dur: 0.5, hand: 'p', finger: 'm' },
        { string: 2, fret: 0, beat: 3, dur: 0.5, hand: 'p', finger: 'i' },
        { string: 1, fret: 0, beat: 3.5, dur: 0.5, hand: 'p', finger: 'm' },
        { string: 5, fret: 0, beat: 4, dur: 1, hand: 'p', finger: 'p' },
        { string: 2, fret: 0, beat: 4.5, dur: 0.5, hand: 'p', finger: 'i' },
        { string: 1, fret: 0, beat: 5, dur: 0.5, hand: 'p', finger: 'm' },
        { string: 2, fret: 0, beat: 5.5, dur: 0.5, hand: 'p', finger: 'i' },
        { string: 4, fret: 0, beat: 6, dur: 2, hand: 'p', finger: 'p' }
      ]
    },

    /* ── P1.6 · the thumb underneath ─────────────────────────────────────── */
    'p1-thumb-steady': {
      kind: 'authored', curated: true, bpm: 44, beatsPerBar: 4,
      title: 'The bass does not pause',
      tags: ['P1', 'thumb', 'independence'],
      notes: [
        { string: 5, fret: 0, beat: 0, dur: 1, hand: 'p', finger: 'p' },
        { string: 4, fret: 0, beat: 1, dur: 1, hand: 'p', finger: 'p' },
        { string: 1, fret: 0, beat: 1.5, dur: 0.5, hand: 'p', finger: 'a' },
        { string: 5, fret: 0, beat: 2, dur: 1, hand: 'p', finger: 'p' },
        { string: 2, fret: 0, beat: 2.5, dur: 0.5, hand: 'p', finger: 'm' },
        { string: 1, fret: 0, beat: 2.75, dur: 0.25, hand: 'p', finger: 'a' },
        { string: 4, fret: 0, beat: 3, dur: 1, hand: 'p', finger: 'p' },
        { string: 5, fret: 0, beat: 4, dur: 1, hand: 'p', finger: 'p' },
        { string: 2, fret: 0, beat: 4.5, dur: 0.5, hand: 'p', finger: 'm' },
        { string: 4, fret: 0, beat: 5, dur: 1, hand: 'p', finger: 'p' },
        { string: 5, fret: 0, beat: 6, dur: 2, hand: 'p', finger: 'p' }
      ]
    },
    'p1-thumb-rest': {
      kind: 'authored', curated: true, bpm: 50, beatsPerBar: 4,
      title: 'The thumb coming to rest',
      tags: ['P1', 'thumb', 'rest stroke'],
      notes: [
        { string: 6, fret: 0, beat: 0, dur: 1, hand: 'p', finger: 'p' },
        { string: 6, fret: 3, beat: 1, dur: 1, hand: 'p', finger: 'p' },
        { string: 5, fret: 0, beat: 2, dur: 1, hand: 'p', finger: 'p' },
        { string: 5, fret: 2, beat: 3, dur: 1, hand: 'p', finger: 'p' },
        { string: 4, fret: 0, beat: 4, dur: 1, hand: 'p', finger: 'p' },
        { string: 5, fret: 2, beat: 5, dur: 1, hand: 'p', finger: 'p' },
        { string: 6, fret: 3, beat: 6, dur: 2, hand: 'p', finger: 'p' }
      ]
    },
    'p1-thumb-count': {
      kind: 'authored', curated: true, bpm: 46, beatsPerBar: 4,
      title: 'Counting it out',
      tags: ['P1', 'thumb', 'timing'],
      notes: [
        { string: 5, fret: 0, beat: 0, dur: 1, hand: 'p', finger: 'p' },
        { string: 2, fret: 0, beat: 0.5, dur: 0.5, hand: 'p', finger: 'm' },
        { string: 5, fret: 0, beat: 1, dur: 1, hand: 'p', finger: 'p' },
        { string: 1, fret: 0, beat: 1.5, dur: 0.5, hand: 'p', finger: 'a' },
        { string: 4, fret: 0, beat: 2, dur: 1, hand: 'p', finger: 'p' },
        { string: 2, fret: 0, beat: 2.5, dur: 0.5, hand: 'p', finger: 'm' },
        { string: 4, fret: 0, beat: 3, dur: 1, hand: 'p', finger: 'p' },
        { string: 1, fret: 0, beat: 3.5, dur: 0.5, hand: 'p', finger: 'a' },
        { string: 5, fret: 0, beat: 4, dur: 2, hand: 'p', finger: 'p' },
        { string: 2, fret: 0, beat: 5, dur: 0.5, hand: 'p', finger: 'm' },
        { string: 4, fret: 0, beat: 6, dur: 2, hand: 'p', finger: 'p' }
      ]
    },

    /* ── P1.7 · the fretting hand ────────────────────────────────────────── */
    'p1-fret-pressure': {
      kind: 'authored', curated: true, bpm: 48, beatsPerBar: 4,
      title: 'One finger, four frets',
      tags: ['P1', 'fretting', 'pressure'],
      notes: [
        { string: 2, fret: 1, beat: 0, dur: 1, hand: 'f', finger: 1 },
        { string: 2, fret: 2, beat: 1, dur: 1, hand: 'f', finger: 2 },
        { string: 2, fret: 3, beat: 2, dur: 1, hand: 'f', finger: 3 },
        { string: 2, fret: 4, beat: 3, dur: 1, hand: 'f', finger: 4 },
        { string: 1, fret: 1, beat: 4, dur: 1, hand: 'f', finger: 1 },
        { string: 1, fret: 2, beat: 5, dur: 1, hand: 'f', finger: 2 },
        { string: 1, fret: 3, beat: 6, dur: 1, hand: 'f', finger: 3 },
        { string: 1, fret: 4, beat: 7, dur: 1, hand: 'f', finger: 4 }
      ]
    },
    'p1-fret-light': {
      kind: 'authored', curated: true, bpm: 42, beatsPerBar: 4,
      title: 'Finding the buzz, then leaving it',
      tags: ['P1', 'fretting', 'pressure'],
      notes: [
        { string: 3, fret: 2, beat: 0, dur: 2, hand: 'f', finger: 2 },
        { string: 3, fret: 4, beat: 2, dur: 2, hand: 'f', finger: 4 },
        { string: 2, fret: 3, beat: 4, dur: 2, hand: 'f', finger: 3 },
        { string: 2, fret: 1, beat: 6, dur: 2, hand: 'f', finger: 1 }
      ]
    },
    'p1-fret-close': {
      kind: 'authored', curated: true, bpm: 50, beatsPerBar: 4,
      title: 'Fingers that never fly',
      tags: ['P1', 'fretting', 'economy'],
      notes: [
        { string: 2, fret: 1, beat: 0, dur: 0.5, hand: 'f', finger: 1 },
        { string: 2, fret: 3, beat: 0.5, dur: 0.5, hand: 'f', finger: 3 },
        { string: 2, fret: 2, beat: 1, dur: 0.5, hand: 'f', finger: 2 },
        { string: 2, fret: 4, beat: 1.5, dur: 0.5, hand: 'f', finger: 4 },
        { string: 1, fret: 1, beat: 2, dur: 0.5, hand: 'f', finger: 1 },
        { string: 1, fret: 3, beat: 2.5, dur: 0.5, hand: 'f', finger: 3 },
        { string: 1, fret: 2, beat: 3, dur: 0.5, hand: 'f', finger: 2 },
        { string: 1, fret: 4, beat: 3.5, dur: 0.5, hand: 'f', finger: 4 },
        { string: 2, fret: 4, beat: 4, dur: 0.5, hand: 'f', finger: 4 },
        { string: 2, fret: 2, beat: 4.5, dur: 0.5, hand: 'f', finger: 2 },
        { string: 2, fret: 3, beat: 5, dur: 0.5, hand: 'f', finger: 3 },
        { string: 2, fret: 1, beat: 5.5, dur: 0.5, hand: 'f', finger: 1 },
        { string: 2, fret: 1, beat: 6, dur: 2, hand: 'f', finger: 1 }
      ]
    },
    'p1-fret-together': {
      kind: 'authored', curated: true, bpm: 44, beatsPerBar: 4,
      title: 'Fretting hand first, every time',
      tags: ['P1', 'fretting', 'timing'],
      notes: [
        { string: 3, fret: 0, beat: 0, dur: 0.5, hand: 'p', finger: 'i' },
        { string: 3, fret: 2, beat: 0.5, dur: 0.5, hand: 'p', finger: 'm' },
        { string: 2, fret: 0, beat: 1, dur: 0.5, hand: 'p', finger: 'i' },
        { string: 2, fret: 3, beat: 1.5, dur: 0.5, hand: 'p', finger: 'm' },
        { string: 1, fret: 0, beat: 2, dur: 0.5, hand: 'p', finger: 'i' },
        { string: 1, fret: 2, beat: 2.5, dur: 0.5, hand: 'p', finger: 'm' },
        { string: 1, fret: 3, beat: 3, dur: 1, hand: 'p', finger: 'i' },
        { string: 1, fret: 2, beat: 4, dur: 0.5, hand: 'p', finger: 'm' },
        { string: 1, fret: 0, beat: 4.5, dur: 0.5, hand: 'p', finger: 'i' },
        { string: 2, fret: 3, beat: 5, dur: 0.5, hand: 'p', finger: 'm' },
        { string: 2, fret: 0, beat: 5.5, dur: 0.5, hand: 'p', finger: 'i' },
        { string: 3, fret: 2, beat: 6, dur: 2, hand: 'p', finger: 'm' }
      ]
    },
    'p1-fret-clean': {
      kind: 'authored', curated: true, bpm: 52, beatsPerBar: 4,
      title: 'Clean changes on two strings',
      tags: ['P1', 'fretting', 'accuracy'],
      notes: [
        { string: 3, fret: 2, beat: 0, dur: 1, hand: 'f', finger: 2 },
        { string: 2, fret: 3, beat: 1, dur: 1, hand: 'f', finger: 3 },
        { string: 3, fret: 2, beat: 2, dur: 1, hand: 'f', finger: 2 },
        { string: 2, fret: 1, beat: 3, dur: 1, hand: 'f', finger: 1 },
        { string: 3, fret: 4, beat: 4, dur: 1, hand: 'f', finger: 4 },
        { string: 2, fret: 3, beat: 5, dur: 1, hand: 'f', finger: 3 },
        { string: 3, fret: 2, beat: 6, dur: 1, hand: 'f', finger: 2 },
        { string: 2, fret: 1, beat: 7, dur: 1, hand: 'f', finger: 1 }
      ]
    }
  };

  /* ── M3 · the fretboard ───────────────────────────────────────────────
     A different kind of exercise from P1's. These are not drills for the hands;
     they are routes around the neck, played slowly while naming what is under
     the finger. The playing is how the knowledge gets in, which is why they are
     exercises at all rather than diagrams with a paragraph attached.

     Several are written for a named tuning or a capo, and the CARD carries that
     context — see `context` in guitar-learn-data.js. The notes here stay what
     they always are: absolute string and fret, never capo-relative. */

  /* Walk a single string through a list of frets, one note per beat. */
  function walk(string, frets, startBeat, dur, finger) {
    return frets.map(function (f, i) {
      return { string: string, fret: f, beat: startBeat + i * (dur || 1),
               dur: dur || 1, hand: 'p', finger: finger || 'i' };
    });
  }

  var M1 = {
    'm1-semitone': {
      kind: 'authored', curated: true, bpm: 50, beatsPerBar: 4,
      title: 'One fret at a time',
      tags: ['M1', 'intervals'],
      notes: walk(3, [0, 1, 2, 3, 4, 5, 6, 7], 0, 1)
    },
    'm1-tone': {
      kind: 'authored', curated: true, bpm: 50, beatsPerBar: 4,
      title: 'Two frets at a time',
      tags: ['M1', 'intervals'],
      notes: walk(3, [0, 2, 4, 6, 8, 10, 12, 14], 0, 1)
    },
    'm1-compare': {
      kind: 'authored', curated: true, demo: true, beatSeconds: 1.2, beatsPerBar: 2,
      title: 'A semitone, then a tone',
      tags: ['M1', 'intervals'],
      notes: [
        { string: 3, fret: 0, beat: 0, dur: 1, hand: 'p', finger: 'i' },
        { string: 3, fret: 1, beat: 1, dur: 1, hand: 'p', finger: 'm' },
        { string: 3, fret: 0, beat: 2, dur: 1, hand: 'p', finger: 'i' },
        { string: 3, fret: 2, beat: 3, dur: 1, hand: 'p', finger: 'm' }
      ]
    },
    'm1-eandf': {
      kind: 'authored', curated: true, bpm: 46, beatsPerBar: 4,
      title: 'Where the gaps close up',
      tags: ['M1', 'intervals', 'naming'],
      notes: [
        { string: 1, fret: 0, beat: 0, dur: 1, hand: 'p', finger: 'i' },
        { string: 1, fret: 1, beat: 1, dur: 1, hand: 'p', finger: 'm' },
        { string: 2, fret: 0, beat: 2, dur: 1, hand: 'p', finger: 'i' },
        { string: 2, fret: 1, beat: 3, dur: 1, hand: 'p', finger: 'm' },
        { string: 1, fret: 0, beat: 4, dur: 1, hand: 'p', finger: 'i' },
        { string: 1, fret: 2, beat: 5, dur: 1, hand: 'p', finger: 'm' },
        { string: 2, fret: 0, beat: 6, dur: 2, hand: 'p', finger: 'i' }
      ]
    },
    'm1-count-up': {
      kind: 'authored', curated: true, bpm: 48, beatsPerBar: 4,
      title: 'Counting the steps',
      tags: ['M1', 'intervals'],
      notes: walk(5, [0, 2, 4, 5, 7, 9, 11, 12], 0, 1, 'p')
    }
  };
  Object.keys(M1).forEach(function (k) { EXERCISES[k] = M1[k]; });

  var M3 = {
    /* M3.1 — naming the bass strings */
    'm3-dots-six': {
      kind: 'authored', curated: true, bpm: 52, beatsPerBar: 4,
      title: 'The marked frets on the sixth string',
      tags: ['M3', 'fretboard', 'landmarks'],
      notes: walk(6, [3, 5, 7, 9, 12], 0, 1.5)
    },
    'm3-six-letters': {
      kind: 'authored', curated: true, bpm: 50, beatsPerBar: 4,
      title: 'The sixth string, letter by letter',
      tags: ['M3', 'fretboard', 'naming'],
      notes: walk(6, [0, 1, 3, 5, 7, 8, 10, 12], 0, 1)
    },
    'm3-five-letters': {
      kind: 'authored', curated: true, bpm: 50, beatsPerBar: 4,
      title: 'The fifth string, letter by letter',
      tags: ['M3', 'fretboard', 'naming'],
      notes: walk(5, [0, 2, 3, 5, 7, 9, 10, 12], 0, 1)
    },
    'm3-anchors': {
      kind: 'authored', curated: true, bpm: 48, beatsPerBar: 4,
      title: 'Fifth and seventh, both strings',
      tags: ['M3', 'fretboard', 'landmarks'],
      notes: [
        { string: 6, fret: 5, beat: 0, dur: 1, hand: 'p', finger: 'p' },
        { string: 5, fret: 5, beat: 1, dur: 1, hand: 'p', finger: 'p' },
        { string: 6, fret: 7, beat: 2, dur: 1, hand: 'p', finger: 'p' },
        { string: 5, fret: 7, beat: 3, dur: 1, hand: 'p', finger: 'p' },
        { string: 6, fret: 12, beat: 4, dur: 2, hand: 'p', finger: 'p' },
        { string: 5, fret: 12, beat: 6, dur: 2, hand: 'p', finger: 'p' }
      ]
    },
    'm3-name-jump': {
      kind: 'authored', curated: true, bpm: 44, beatsPerBar: 4,
      title: 'Landing without counting',
      tags: ['M3', 'fretboard', 'recall'],
      notes: [
        { string: 6, fret: 8, beat: 0, dur: 1, hand: 'p', finger: 'p' },
        { string: 5, fret: 3, beat: 1, dur: 1, hand: 'p', finger: 'p' },
        { string: 6, fret: 10, beat: 2, dur: 1, hand: 'p', finger: 'p' },
        { string: 5, fret: 8, beat: 3, dur: 1, hand: 'p', finger: 'p' },
        { string: 6, fret: 1, beat: 4, dur: 1, hand: 'p', finger: 'p' },
        { string: 5, fret: 10, beat: 5, dur: 1, hand: 'p', finger: 'p' },
        { string: 6, fret: 5, beat: 6, dur: 2, hand: 'p', finger: 'p' }
      ]
    },

    /* M3.2 — octaves */
    'm3-oct-six-four': {
      kind: 'authored', curated: true, bpm: 50, beatsPerBar: 4,
      title: 'Sixth to fourth, two frets up',
      tags: ['M3', 'octaves'],
      notes: [
        { string: 6, fret: 3, beat: 0, dur: 1, hand: 'p', finger: 'p' },
        { string: 4, fret: 5, beat: 1, dur: 1, hand: 'p', finger: 'i' },
        { string: 6, fret: 5, beat: 2, dur: 1, hand: 'p', finger: 'p' },
        { string: 4, fret: 7, beat: 3, dur: 1, hand: 'p', finger: 'i' },
        { string: 6, fret: 8, beat: 4, dur: 1, hand: 'p', finger: 'p' },
        { string: 4, fret: 10, beat: 5, dur: 1, hand: 'p', finger: 'i' },
        { string: 6, fret: 10, beat: 6, dur: 2, hand: 'p', finger: 'p' }
      ]
    },
    'm3-oct-five-three': {
      kind: 'authored', curated: true, bpm: 50, beatsPerBar: 4,
      title: 'Fifth to third, the same shape',
      tags: ['M3', 'octaves'],
      notes: [
        { string: 5, fret: 3, beat: 0, dur: 1, hand: 'p', finger: 'p' },
        { string: 3, fret: 5, beat: 1, dur: 1, hand: 'p', finger: 'i' },
        { string: 5, fret: 5, beat: 2, dur: 1, hand: 'p', finger: 'p' },
        { string: 3, fret: 7, beat: 3, dur: 1, hand: 'p', finger: 'i' },
        { string: 5, fret: 7, beat: 4, dur: 1, hand: 'p', finger: 'p' },
        { string: 3, fret: 9, beat: 5, dur: 1, hand: 'p', finger: 'i' },
        { string: 5, fret: 10, beat: 6, dur: 2, hand: 'p', finger: 'p' }
      ]
    },
    'm3-oct-shift': {
      kind: 'authored', curated: true, bpm: 48, beatsPerBar: 4,
      title: 'Where the shape changes',
      tags: ['M3', 'octaves'],
      notes: [
        { string: 4, fret: 5, beat: 0, dur: 1, hand: 'p', finger: 'p' },
        { string: 2, fret: 8, beat: 1, dur: 1, hand: 'p', finger: 'm' },
        { string: 4, fret: 7, beat: 2, dur: 1, hand: 'p', finger: 'p' },
        { string: 2, fret: 10, beat: 3, dur: 1, hand: 'p', finger: 'm' },
        { string: 3, fret: 5, beat: 4, dur: 1, hand: 'p', finger: 'i' },
        { string: 1, fret: 8, beat: 5, dur: 1, hand: 'p', finger: 'a' },
        { string: 3, fret: 7, beat: 6, dur: 2, hand: 'p', finger: 'i' }
      ]
    },
    'm3-oct-chain': {
      kind: 'authored', curated: true, bpm: 46, beatsPerBar: 4,
      title: 'One note, everywhere it lives',
      tags: ['M3', 'octaves', 'recall'],
      notes: [
        { string: 6, fret: 5, beat: 0, dur: 1, hand: 'p', finger: 'p' },
        { string: 4, fret: 7, beat: 1, dur: 1, hand: 'p', finger: 'i' },
        { string: 2, fret: 10, beat: 2, dur: 1, hand: 'p', finger: 'm' },
        { string: 5, fret: 12, beat: 3, dur: 1, hand: 'p', finger: 'p' },
        { string: 3, fret: 14, beat: 4, dur: 1, hand: 'p', finger: 'i' },
        { string: 4, fret: 7, beat: 5, dur: 1, hand: 'p', finger: 'i' },
        { string: 6, fret: 5, beat: 6, dur: 2, hand: 'p', finger: 'p' }
      ]
    },
    'm3-oct-tune': {
      kind: 'authored', curated: true, bpm: 44, beatsPerBar: 4,
      title: 'Checking the tuning by octaves',
      tags: ['M3', 'octaves', 'tuning'],
      notes: [
        { string: 6, fret: 0, beat: 0, dur: 1, hand: 'p', finger: 'p' },
        { string: 4, fret: 2, beat: 1, dur: 1, hand: 'p', finger: 'i' },
        { string: 5, fret: 0, beat: 2, dur: 1, hand: 'p', finger: 'p' },
        { string: 3, fret: 2, beat: 3, dur: 1, hand: 'p', finger: 'i' },
        { string: 4, fret: 0, beat: 4, dur: 1, hand: 'p', finger: 'p' },
        { string: 2, fret: 3, beat: 5, dur: 1, hand: 'p', finger: 'm' },
        { string: 6, fret: 0, beat: 6, dur: 2, hand: 'p', finger: 'p' }
      ]
    },

    /* M3.3 — altered tuning. Written for DADGAD; the cards say so. */
    'm3-dadgad-open': {
      kind: 'authored', curated: true, bpm: 48, beatsPerBar: 4,
      title: 'The open strings, one at a time',
      tags: ['M3', 'tuning', 'DADGAD'],
      notes: [
        { string: 6, fret: 0, beat: 0, dur: 1, hand: 'p', finger: 'p' },
        { string: 5, fret: 0, beat: 1, dur: 1, hand: 'p', finger: 'p' },
        { string: 4, fret: 0, beat: 2, dur: 1, hand: 'p', finger: 'p' },
        { string: 3, fret: 0, beat: 3, dur: 1, hand: 'p', finger: 'i' },
        { string: 2, fret: 0, beat: 4, dur: 1, hand: 'p', finger: 'm' },
        { string: 1, fret: 0, beat: 5, dur: 1, hand: 'p', finger: 'a' },
        { string: 4, fret: 0, beat: 6, dur: 2, hand: 'p', finger: 'p' }
      ]
    },
    'm3-dadgad-moved': {
      kind: 'authored', curated: true, bpm: 46, beatsPerBar: 4,
      title: 'The three strings that moved',
      tags: ['M3', 'tuning', 'DADGAD'],
      notes: [
        { string: 6, fret: 0, beat: 0, dur: 1, hand: 'p', finger: 'p' },
        { string: 6, fret: 2, beat: 1, dur: 1, hand: 'p', finger: 'p' },
        { string: 2, fret: 0, beat: 2, dur: 1, hand: 'p', finger: 'm' },
        { string: 2, fret: 2, beat: 3, dur: 1, hand: 'p', finger: 'm' },
        { string: 1, fret: 0, beat: 4, dur: 1, hand: 'p', finger: 'a' },
        { string: 1, fret: 2, beat: 5, dur: 1, hand: 'p', finger: 'a' },
        { string: 4, fret: 0, beat: 6, dur: 2, hand: 'p', finger: 'p' }
      ]
    },
    'm3-dadgad-same': {
      kind: 'authored', curated: true, bpm: 48, beatsPerBar: 4,
      title: 'The three that did not',
      tags: ['M3', 'tuning', 'DADGAD'],
      notes: [
        { string: 5, fret: 0, beat: 0, dur: 1, hand: 'p', finger: 'p' },
        { string: 5, fret: 2, beat: 1, dur: 1, hand: 'p', finger: 'p' },
        { string: 4, fret: 2, beat: 2, dur: 1, hand: 'p', finger: 'p' },
        { string: 3, fret: 2, beat: 3, dur: 1, hand: 'p', finger: 'i' },
        { string: 3, fret: 0, beat: 4, dur: 1, hand: 'p', finger: 'i' },
        { string: 4, fret: 0, beat: 5, dur: 1, hand: 'p', finger: 'p' },
        { string: 5, fret: 0, beat: 6, dur: 2, hand: 'p', finger: 'p' }
      ]
    },
    'm3-dadgad-shape': {
      kind: 'authored', curated: true, demo: true, beatSeconds: 1.4, beatsPerBar: 2,
      title: 'A familiar shape, a different chord',
      tags: ['M3', 'tuning', 'DADGAD'],
      notes: [
        { string: 4, fret: 0, beat: 0, dur: 1, hand: 'p', finger: 'p' },
        { string: 3, fret: 2, beat: 0, dur: 1, hand: 'p', finger: 'i' },
        { string: 2, fret: 3, beat: 0, dur: 1, hand: 'p', finger: 'm' },
        { string: 1, fret: 2, beat: 0, dur: 1, hand: 'p', finger: 'a' },
        { string: 4, fret: 0, beat: 1, dur: 1, hand: 'p', finger: 'p' },
        { string: 3, fret: 0, beat: 1, dur: 1, hand: 'p', finger: 'i' },
        { string: 2, fret: 0, beat: 1, dur: 1, hand: 'p', finger: 'm' },
        { string: 1, fret: 0, beat: 1, dur: 1, hand: 'p', finger: 'a' }
      ]
    },
    'm3-dadgad-find': {
      kind: 'authored', curated: true, bpm: 44, beatsPerBar: 4,
      title: 'Finding a named note again',
      tags: ['M3', 'tuning', 'DADGAD', 'recall'],
      notes: [
        { string: 6, fret: 5, beat: 0, dur: 1, hand: 'p', finger: 'p' },
        { string: 5, fret: 0, beat: 1, dur: 1, hand: 'p', finger: 'p' },
        { string: 4, fret: 5, beat: 2, dur: 1, hand: 'p', finger: 'p' },
        { string: 2, fret: 5, beat: 3, dur: 1, hand: 'p', finger: 'm' },
        { string: 1, fret: 7, beat: 4, dur: 1, hand: 'p', finger: 'a' },
        { string: 3, fret: 2, beat: 5, dur: 1, hand: 'p', finger: 'i' },
        { string: 4, fret: 0, beat: 6, dur: 2, hand: 'p', finger: 'p' }
      ]
    },

    /* M3.4 — the capo. Frets stay absolute; the cards carry the capo. */
    'm3-capo-open': {
      kind: 'authored', curated: true, bpm: 50, beatsPerBar: 4,
      title: 'Open strings behind a capo',
      tags: ['M3', 'capo'],
      notes: [
        { string: 6, fret: 2, beat: 0, dur: 1, hand: 'p', finger: 'p' },
        { string: 5, fret: 2, beat: 1, dur: 1, hand: 'p', finger: 'p' },
        { string: 4, fret: 2, beat: 2, dur: 1, hand: 'p', finger: 'p' },
        { string: 3, fret: 2, beat: 3, dur: 1, hand: 'p', finger: 'i' },
        { string: 2, fret: 2, beat: 4, dur: 1, hand: 'p', finger: 'm' },
        { string: 1, fret: 2, beat: 5, dur: 1, hand: 'p', finger: 'a' },
        { string: 6, fret: 2, beat: 6, dur: 2, hand: 'p', finger: 'p' }
      ]
    },
    'm3-capo-shape': {
      kind: 'authored', curated: true, demo: true, beatSeconds: 1.4, beatsPerBar: 2,
      title: 'The same shape, two frets higher',
      tags: ['M3', 'capo'],
      notes: [
        { string: 5, fret: 2, beat: 0, dur: 1, hand: 'p', finger: 'p' },
        { string: 4, fret: 4, beat: 0, dur: 1, hand: 'p', finger: 'i' },
        { string: 3, fret: 4, beat: 0, dur: 1, hand: 'p', finger: 'm' },
        { string: 2, fret: 4, beat: 0, dur: 1, hand: 'p', finger: 'a' },
        { string: 5, fret: 2, beat: 1, dur: 1, hand: 'p', finger: 'p' },
        { string: 4, fret: 4, beat: 1, dur: 1, hand: 'p', finger: 'i' },
        { string: 3, fret: 3, beat: 1, dur: 1, hand: 'p', finger: 'm' },
        { string: 2, fret: 4, beat: 1, dur: 1, hand: 'p', finger: 'a' }
      ]
    },
    'm3-capo-pitch': {
      kind: 'authored', curated: true, bpm: 46, beatsPerBar: 4,
      title: 'What the pitch actually is',
      tags: ['M3', 'capo', 'naming'],
      notes: walk(6, [2, 4, 5, 7, 9, 10, 12, 14], 0, 1, 'p')
    },
    'm3-capo-choose': {
      kind: 'authored', curated: true, bpm: 48, beatsPerBar: 4,
      title: 'Choosing where to put it',
      tags: ['M3', 'capo'],
      notes: [
        { string: 5, fret: 5, beat: 0, dur: 1, hand: 'p', finger: 'p' },
        { string: 4, fret: 7, beat: 1, dur: 1, hand: 'p', finger: 'i' },
        { string: 3, fret: 7, beat: 2, dur: 1, hand: 'p', finger: 'm' },
        { string: 2, fret: 5, beat: 3, dur: 1, hand: 'p', finger: 'a' },
        { string: 4, fret: 7, beat: 4, dur: 1, hand: 'p', finger: 'i' },
        { string: 3, fret: 5, beat: 5, dur: 1, hand: 'p', finger: 'm' },
        { string: 5, fret: 5, beat: 6, dur: 2, hand: 'p', finger: 'p' }
      ]
    },
    'm3-capo-off': {
      kind: 'authored', curated: true, bpm: 46, beatsPerBar: 4,
      title: 'The same music without it',
      tags: ['M3', 'capo', 'transpose'],
      notes: [
        { string: 5, fret: 3, beat: 0, dur: 1, hand: 'p', finger: 'p' },
        { string: 4, fret: 5, beat: 1, dur: 1, hand: 'p', finger: 'i' },
        { string: 3, fret: 5, beat: 2, dur: 1, hand: 'p', finger: 'm' },
        { string: 2, fret: 3, beat: 3, dur: 1, hand: 'p', finger: 'a' },
        { string: 4, fret: 5, beat: 4, dur: 1, hand: 'p', finger: 'i' },
        { string: 3, fret: 3, beat: 5, dur: 1, hand: 'p', finger: 'm' },
        { string: 5, fret: 3, beat: 6, dur: 2, hand: 'p', finger: 'p' }
      ]
    }
  };

  Object.keys(M3).forEach(function (k) { EXERCISES[k] = M3[k]; });

  function exercise(id) {
    return Object.prototype.hasOwnProperty.call(EXERCISES, id) ? EXERCISES[id] : null;
  }
  function ids() { return Object.keys(EXERCISES); }

  return { EXERCISES: EXERCISES, exercise: exercise, ids: ids };
}));
