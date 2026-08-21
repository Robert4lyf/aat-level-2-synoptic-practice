/* The technical skeleton the units are checked against.
 *
 * WHAT THIS IS NOT: a reproduction of any exam board's syllabus document. The
 * plan called for "LCM requirements per grade, encoded". Two things make that
 * the wrong file to write. An exam board's syllabus is their copyrighted text,
 * and this repository would be republishing it. And the grades were never the
 * point here — they are, in the words that started this module, "a convenient
 * skeleton so nothing is missed".
 *
 * So these are technical criteria written from scratch, arranged in the order a
 * graded course covers them, at roughly the level the early grades expect. They
 * carry no board's name and claim no equivalence. Anyone preparing for a
 * specific exam should read that board's own current syllabus; this is a map of
 * what a fingerstyle player needs to be able to do, not a substitute for it.
 *
 * WHAT IT IS FOR: coverage. Every criterion here must be claimed by a lesson,
 * and no lesson may claim a criterion that is not here — checked by
 * scripts/check-guitar-coverage.js. That catches the failure this file exists
 * to prevent: content that accumulates by whatever was interesting to write
 * next, leaving a hole nobody notices until someone hits it.
 *
 * IDs are stable and referenced from guitar-learn-data.js. Renaming one is a
 * content migration, not a tidy-up.
 */
(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.GuitarSyllabus = api;
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* Strands. P is physical technique, M is musical understanding, F is
     fluency and reading, A is application and repertoire. A criterion belongs
     to exactly one strand, and its id carries it. */
  var STRANDS = {
    P: { name: 'Technique', desc: 'What the hands do' },
    M: { name: 'Musicianship', desc: 'What the notes mean' },
    F: { name: 'Fluency', desc: 'Reading, timing and recall' },
    A: { name: 'Application', desc: 'Styles, arrangement and repertoire' }
  };

  /* stage is the rough grade band a criterion sits in: 1 is a first-year
     player, 2 is around grades 2–3, 3 is grades 4–5. Used to order the course,
     not to certify anything. */
  var CRITERIA = [
    /* ── P1 · The hand ──────────────────────────────────────────────────── */
    { id: 'P1.posture',     strand: 'P', stage: 1, unit: 'P1',
      text: 'Hold the instrument so both hands reach their work without gripping or bracing' },
    { id: 'P1.pima',        strand: 'P', stage: 1, unit: 'P1',
      text: 'Name and place the picking-hand digits p, i, m and a on their home strings' },
    { id: 'P1.free',        strand: 'P', stage: 1, unit: 'P1',
      text: 'Play a free stroke that clears the next string, from the knuckle rather than the tip' },
    { id: 'P1.rest',        strand: 'P', stage: 1, unit: 'P1',
      text: 'Play a rest stroke that comes to rest on the next string, and choose between the two strokes' },
    { id: 'P1.alternate',   strand: 'P', stage: 1, unit: 'P1',
      text: 'Alternate i and m through a single line without repeating a finger' },
    { id: 'P1.thumb',       strand: 'P', stage: 1, unit: 'P1',
      text: 'Sound a bass with p while the fingers play above it, without the two colliding' },
    { id: 'P1.fret',        strand: 'P', stage: 1, unit: 'P1',
      text: 'Fret with the fingertip close behind the fret, using the least pressure that sounds the note' },
    { id: 'P1.hygiene',     strand: 'P', stage: 1, unit: 'P1',
      text: 'Keep the picking-hand nails short enough that flesh contacts the string first' },

    /* ── P2 · Arpeggio patterns (phase 1, not yet written) ──────────────── */
    { id: 'P2.pattern',     strand: 'P', stage: 1, unit: 'P2',
      text: 'Play p-i-m-a and p-a-m-i patterns over a held chord at an even tempo' },
    { id: 'P2.giuliani',    strand: 'P', stage: 2, unit: 'P2',
      text: 'Work the Giuliani right-hand formulas as a daily pattern set' },
    { id: 'P2.crossing',    strand: 'P', stage: 2, unit: 'P2',
      text: 'Cross strings mid-pattern without an audible gap or a change of tone' },

    /* ── P3 · Voicing and balance ───────────────────────────────────────── */
    { id: 'P3.melody',      strand: 'P', stage: 2, unit: 'P3',
      text: 'Bring a melody note above its accompaniment within the same hand' },
    { id: 'P3.attack',      strand: 'P', stage: 2, unit: 'P3',
      text: 'Move the contact point along the string to change tone deliberately' },
    { id: 'P3.damp',        strand: 'P', stage: 2, unit: 'P3',
      text: 'Stop a ringing bass so it does not blur into the next harmony' },

    /* ── M3 · The fretboard ─────────────────────────────────────────────── */
    { id: 'M3.names',       strand: 'M', stage: 1, unit: 'M3',
      text: 'Name any note on the sixth and fifth strings without counting from the nut' },
    { id: 'M3.octaves',     strand: 'M', stage: 1, unit: 'M3',
      text: 'Find the octave of a given note on an adjacent pair of strings' },
    { id: 'M3.tuning',      strand: 'M', stage: 1, unit: 'M3',
      text: 'Retune to a named altered tuning and locate the notes that moved' },
    { id: 'M3.capo',        strand: 'M', stage: 1, unit: 'M3',
      text: 'Read a capo position as a change of pitch, not a change of shape' },

    /* ── M5 · Pentatonics and blues ─────────────────────────────────────── */
    { id: 'M5.box',         strand: 'M', stage: 1, unit: 'M5',
      text: 'Play the minor pentatonic in one box position, ascending and descending' },
    { id: 'M5.positions',   strand: 'M', stage: 2, unit: 'M5',
      text: 'Join two adjacent pentatonic positions across the neck' },
    { id: 'M5.blue',        strand: 'M', stage: 2, unit: 'M5',
      text: 'Add the flattened fifth and hear what it does to the line' },

    /* ── M7 · Keys and the number system ────────────────────────────────── */
    { id: 'M7.numbers',     strand: 'M', stage: 2, unit: 'M7',
      text: 'Read a progression as scale degrees rather than as chord names' },
    { id: 'M7.transpose',   strand: 'M', stage: 2, unit: 'M7',
      text: 'Move a progression to a new key without rewriting it' },
    { id: 'M7.function',    strand: 'M', stage: 2, unit: 'M7',
      text: 'Identify which chord is pulling home and which is passing through' },

    /* ── M8 · Modes ─────────────────────────────────────────────────────── */
    { id: 'M8.parent',      strand: 'M', stage: 2, unit: 'M8',
      text: 'Relate each mode to its parent scale and to its own root' },
    { id: 'M8.character',   strand: 'M', stage: 3, unit: 'M8',
      text: 'Name the one note that gives each mode its character, and voice it' },
    { id: 'M8.use',         strand: 'M', stage: 3, unit: 'M8',
      text: 'Choose a mode to fit a stated mood, and write a phrase that shows it' }
  ];

  /* Units, in teaching order. `phase` says when it ships; the coverage checker
     only requires criteria from units marked ready, so an unwritten unit is a
     known gap rather than a failure. */
  var UNITS = [
    { id: 'P1', title: 'The hand',                 strand: 'P', phase: 1, ready: true },
    { id: 'M3', title: 'The fretboard',            strand: 'M', phase: 1, ready: true },
    { id: 'P2', title: 'Arpeggio patterns',        strand: 'P', phase: 1, ready: false },
    { id: 'M5', title: 'Pentatonics and blues',    strand: 'M', phase: 1, ready: true },
    { id: 'P3', title: 'Voicing and balance',      strand: 'P', phase: 1, ready: false },
    { id: 'M7', title: 'Keys and the number system', strand: 'M', phase: 1, ready: false },
    { id: 'M8', title: 'Modes',                    strand: 'M', phase: 1, ready: false }
  ];

  function criteriaFor(unitId) {
    return CRITERIA.filter(function (c) { return c.unit === unitId; });
  }
  function criterion(id) {
    for (var i = 0; i < CRITERIA.length; i++) if (CRITERIA[i].id === id) return CRITERIA[i];
    return null;
  }
  function unit(id) {
    for (var i = 0; i < UNITS.length; i++) if (UNITS[i].id === id) return UNITS[i];
    return null;
  }
  function readyUnits() {
    return UNITS.filter(function (u) { return u.ready; });
  }

  return {
    STRANDS: STRANDS,
    CRITERIA: CRITERIA,
    UNITS: UNITS,
    criteriaFor: criteriaFor,
    criterion: criterion,
    unit: unit,
    readyUnits: readyUnits
  };
}));
