/* Guitar engine — the fretboard model and the note representation.
 *
 * This file is the spine of the guitar module. Everything else — the tab
 * renderer, the exercise generator, the synth, the checkers — is a consumer of
 * the one note shape defined here, and nothing else is allowed to invent its
 * own. See docs/guitar-implementation-plan.md §4.
 *
 * THE NOTE
 *
 *   { string, fret, beat, dur, hand, finger, tech }
 *
 *   string  1..6, and 1 is ALWAYS the high E, in every tuning, at every capo,
 *           for right- and left-handed players alike.
 *   fret    0..24, measured from the NUT, never from the capo.
 *
 * No pixel positions, no tab text, anywhere. That is what makes handedness,
 * capo and tuning rendering parameters rather than data migrations, and it is
 * what lets a progress record stay valid when any of the three changes.
 *
 * THE CAPO RULE, which is the one most easily got wrong
 *
 *   `fret` is absolute. soundingMidi() is tuning[i] + fret and never adds the
 *   capo. The capo'd open string is `fret === capo`, NOT `fret === 0`, so
 *   `fret === 0` is only valid when there is no capo, and anything strictly
 *   between 0 and the capo is unplayable — the capo is in the way.
 *
 *   Real-world tab is written capo-relative: a "0" under a "Capo 5" header
 *   means the string stopped at the fifth fret. Converting that source into
 *   this representation means ADDING 5 to every fret. The tab renderer does the
 *   reverse at draw time. If soundingMidi() ever looks like it needs a + capo
 *   term, the data is wrong, not the function.
 *
 * THE MIRRORS
 *
 *   stringAxis() and fretAxis() are the only two places in the entire module
 *   permitted to turn a string or fret number into a coordinate. They live in
 *   this file rather than the renderer because they are pure arithmetic with no
 *   DOM, and because the handedness matrix test runs in Node.
 *
 *   Handedness flips BOTH axes, not just the strings: a horizontal neck diagram
 *   for a left-handed player has the nut on the right. `mirror` is a parameter
 *   in both, never read from global state, so tab can opt out of mirroring (it
 *   is conventionally written the same way for both hands) without any caller
 *   needing a second code path.
 *
 * Runs in the browser (window.GuitarEngine) and in Node (module.exports), the
 * same way formula-engine.js does, so the checkers can exercise it in CI.
 */
(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.GuitarEngine = api;
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* ── Pitch ────────────────────────────────────────────────────────────────
     MIDI numbers throughout: 69 = A4 = 440 Hz, 60 = C4, 40 = E2 (low E). */

  var NOTE_NAMES  = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  var FLAT_NAMES  = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

  function midiToName(midi, useFlats) {
    var names = useFlats ? FLAT_NAMES : NOTE_NAMES;
    return names[((midi % 12) + 12) % 12];
  }
  function midiToOctave(midi) { return Math.floor(midi / 12) - 1; }
  function midiToLabel(midi, useFlats) { return midiToName(midi, useFlats) + midiToOctave(midi); }
  function midiToFreq(midi) { return 440 * Math.pow(2, (midi - 69) / 12); }
  /* Cents between two frequencies. Used by the synth's tuning test. */
  function centsBetween(f1, f2) { return 1200 * Math.log2(f2 / f1); }

  /* ── Tunings ──────────────────────────────────────────────────────────────
     Index 0 is string 6 (the lowest), index 5 is string 1 (the highest), which
     is the order a guitarist reads a tuning aloud: "E A D G B E".

     ONE ID PER DISTINCT PITCH SET. `cellKey` in the mastery grid carries the
     tuning id, so two ids for the same tuning would split one exercise's
     progress across two half-learnt cells. DADF#AD is open D note for note, so
     it is an alias, and aliases are resolved before anything is stored. */
  var TUNINGS = {
    standard: { name: 'Standard',  midi: [40, 45, 50, 55, 59, 64] }, // E2 A2 D3 G3 B3 E4
    dropD:    { name: 'Drop D',    midi: [38, 45, 50, 55, 59, 64] }, // D2 A2 D3 G3 B3 E4
    DADGAD:   { name: 'DADGAD',    midi: [38, 45, 50, 55, 57, 62] }, // D2 A2 D3 G3 A3 D4
    openD:    { name: 'Open D',    midi: [38, 45, 50, 54, 57, 62] }, // D2 A2 D3 F#3 A3 D4
    openG:    { name: 'Open G',    midi: [38, 43, 50, 55, 59, 62] }, // D2 G2 D3 G3 B3 D4
    CGCFCE:   { name: 'C G C F C E', midi: [36, 43, 48, 53, 60, 64] } // C2 G2 C3 F3 C4 E4
  };
  var TUNING_ALIASES = { 'DADF#AD': 'openD', dadfsharpad: 'openD', dadgad: 'DADGAD' };

  /* has() rather than a bare truthy test: `TUNINGS['constructor']` is truthy
     through the prototype chain, so makeFretboard({tuning:'constructor'}) would
     store it as valid and the next soundingMidi() would throw on .slice(). */
  function has(obj, key) { return Object.prototype.hasOwnProperty.call(obj, key); }

  function resolveTuningId(id) {
    if (typeof id !== 'string') return null;
    if (has(TUNINGS, id)) return id;
    if (has(TUNING_ALIASES, id)) return TUNING_ALIASES[id];
    return null;
  }
  function tuningMidi(id) {
    var r = resolveTuningId(id);
    return r ? TUNINGS[r].midi.slice() : null;
  }

  var STRING_COUNT = 6;
  var MAX_FRET = 24;

  /* ── The fretboard ────────────────────────────────────────────────────────
     { tuning, capo, handed }. `tuning` is a named id, resolved on read, so a
     stored fretboard never holds an alias. */
  function makeFretboard(opts) {
    opts = opts || {};
    var id = resolveTuningId(opts.tuning || 'standard') || 'standard';
    return {
      tuning: id,
      capo: clampInt(opts.capo, 0, MAX_FRET, 0),
      handed: opts.handed === 'left' ? 'left' : 'right'
    };
  }
  function clampInt(v, lo, hi, dflt) {
    var n = Math.round(Number(v));
    if (!isFinite(n)) return dflt;
    return n < lo ? lo : n > hi ? hi : n;
  }

  /* String 1 is the highest string, and lives at the END of the tuning array.
     This index flip is the single reason to be careful: getting it backwards
     transposes every note by the span of the neck and still looks plausible. */
  function tuningIndex(stringNo) { return STRING_COUNT - stringNo; }

  function openMidi(stringNo, fb) {
    var t = tuningMidi(fb.tuning);
    if (!t) return null;
    return t[tuningIndex(stringNo)];
  }

  /* The sounding pitch of a note. NO capo term — see the header. */
  function soundingMidi(note, fb) {
    var open = openMidi(note.string, fb);
    return open === null ? null : open + note.fret;
  }

  /* ── Playability of a single note ─────────────────────────────────────────
     Returns null when fine, or a reason string. Kept as a reason rather than a
     boolean because check-guitar-playability.js reports which rule failed. */
  function noteFault(note, fb) {
    if (!note || typeof note.string !== 'number' || typeof note.fret !== 'number') {
      return 'note must have numeric string and fret';
    }
    if (note.string < 1 || note.string > STRING_COUNT || note.string !== Math.round(note.string)) {
      return 'string ' + note.string + ' is outside 1..' + STRING_COUNT;
    }
    if (note.fret < 0 || note.fret > MAX_FRET || note.fret !== Math.round(note.fret)) {
      return 'fret ' + note.fret + ' is outside 0..' + MAX_FRET;
    }
    /* The capo occupies its own fret and blocks everything behind it. Fret 0
       means an open string, which only exists when nothing is clamped on. */
    if (fb.capo > 0 && note.fret < fb.capo) {
      return 'fret ' + note.fret + ' is behind the capo at fret ' + fb.capo;
    }
    return null;
  }
  function isPlayable(note, fb) { return noteFault(note, fb) === null; }

  /* What a tab strip prints for this note: capo-relative, so a capo'd open
     string reads 0, matching every tab source in the world. */
  function displayFret(note, fb) { return note.fret - fb.capo; }

  /* ── The axes ─────────────────────────────────────────────────────────────
     The ONLY two functions permitted to turn a string or fret number into a
     coordinate. check-guitar-handedness.js enforces that.

     Both take `reverse`, which is NOT "is the player left-handed". It is
     "does this axis run backwards from its natural order", and which of those
     two things is true depends on the element, not only the hand. Callers
     should use the element helpers below rather than passing the boolean
     themselves — an earlier comment here claimed index 0 was simultaneously
     the top tab line and the rightmost chord-box string, which cannot both
     hold and would have drawn every right-handed chord box mirrored. */
  function stringAxis(stringNo, reverse, spacing) {
    var sp = spacing === undefined ? 1 : spacing;
    var i = stringNo - 1;                       // natural order: string 1 first
    return (reverse ? (STRING_COUNT - 1 - i) : i) * sp;
  }
  function fretAxis(fret, reverse, span, spacing) {
    var sp = spacing === undefined ? 1 : spacing;
    return (reverse ? (span - fret) : fret) * sp;
  }

  /* ── Element conventions ──────────────────────────────────────────────────
     Mirroring for a left-handed player means reflecting the drawing about its
     VERTICAL axis, so it flips whichever axis happens to be horizontal in that
     element and leaves the other alone. That is the whole rule, and it lands
     differently on each of the three:

       tab           strings run down the stave, frets are not positional.
                     Nothing is horizontal, so nothing flips. Tab is written
                     the same way for both hands by convention, and mirrors
                     only on the explicit mirrorTab opt-in.

       chord box     nut at the top, strings across. STRINGS are horizontal, so
                     they flip. Frets run down and do not.
                     Right-handed base orientation is low E leftmost, which is
                     the REVERSE of the natural string-1-first order — hence the
                     inverted-looking test below.

       neck diagram  nut at the left, frets across. FRETS are horizontal, so
                     they flip; the string order does not. High E stays on top
                     in both hands, matching the tab stave directly above it. */
  function tabStringY(stringNo, mirrorTab, spacing) {
    return stringAxis(stringNo, !!mirrorTab, spacing);
  }
  function chordBoxStringX(stringNo, fb, spacing) {
    return stringAxis(stringNo, fb.handed !== 'left', spacing);
  }
  function neckStringY(stringNo, fb, spacing) {
    return stringAxis(stringNo, false, spacing);   // never flips; see above
  }
  function neckFretX(fret, fb, span, spacing) {
    return fretAxis(fret, fb.handed === 'left', span, spacing);
  }

  /* Does this fretboard mirror at all? For prose and aria-labels, not geometry. */
  function mirrorFor(fb) { return fb.handed === 'left'; }

  /* ── Reverse lookup ───────────────────────────────────────────────────────
     Every place on the neck that sounds a given pitch, honouring the capo.
     Used by the fretboard drills and by position finding. */
  function positionsForMidi(midi, fb) {
    var out = [];
    for (var s = 1; s <= STRING_COUNT; s++) {
      var open = openMidi(s, fb);
      if (open === null) continue;
      var fret = midi - open;
      var note = { string: s, fret: fret };
      if (fret >= 0 && fret <= MAX_FRET && isPlayable(note, fb)) out.push(note);
    }
    return out;
  }

  return {
    /* pitch */
    midiToName: midiToName,
    midiToOctave: midiToOctave,
    midiToLabel: midiToLabel,
    midiToFreq: midiToFreq,
    centsBetween: centsBetween,
    /* tunings */
    TUNINGS: TUNINGS,
    TUNING_ALIASES: TUNING_ALIASES,
    resolveTuningId: resolveTuningId,
    tuningMidi: tuningMidi,
    /* fretboard */
    makeFretboard: makeFretboard,
    tuningIndex: tuningIndex,
    openMidi: openMidi,
    soundingMidi: soundingMidi,
    noteFault: noteFault,
    isPlayable: isPlayable,
    displayFret: displayFret,
    positionsForMidi: positionsForMidi,
    /* axes — the only coordinate producers */
    stringAxis: stringAxis,
    fretAxis: fretAxis,
    /* element helpers — what renderers should actually call */
    tabStringY: tabStringY,
    chordBoxStringX: chordBoxStringX,
    neckStringY: neckStringY,
    neckFretX: neckFretX,
    mirrorFor: mirrorFor,
    /* constants */
    STRING_COUNT: STRING_COUNT,
    MAX_FRET: MAX_FRET
  };
}));
