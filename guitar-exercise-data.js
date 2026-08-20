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

  function exercise(id) {
    return Object.prototype.hasOwnProperty.call(EXERCISES, id) ? EXERCISES[id] : null;
  }
  function ids() { return Object.keys(EXERCISES); }

  return { EXERCISES: EXERCISES, exercise: exercise, ids: ids };
}));
