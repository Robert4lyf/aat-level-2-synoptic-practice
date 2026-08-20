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
                     Nothing is horizontal, so nothing flips — and tab is
                     written identically for both hands by convention, so it
                     never mirrors at all.

       chord box     nut at the top, strings across. STRINGS are horizontal, so
                     they flip. Frets run down and do not.
                     Right-handed base orientation is low E leftmost, which is
                     the REVERSE of the natural string-1-first order — hence the
                     inverted-looking test below.

       neck diagram  nut at the left, frets across. FRETS are horizontal, so
                     they flip; the string order does not. High E stays on top
                     in both hands, matching the tab stave directly above it. */
  /* Tab never mirrors. It is written the same way for both hands by universal
     convention, and an opt-in to flip it was removed as unwanted rather than
     left as a switch nobody would touch. String 1 is the top line, always. */
  function tabStringY(stringNo, spacing) {
    return stringAxis(stringNo, false, spacing);
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



  /* ── Scales ───────────────────────────────────────────────────────────────
     Semitone offsets from the root. `char` is the characteristic note — the one
     degree that makes the mode that mode, which the fretboard diagram lights in
     its own colour and the modal lessons ask you to land on. Ionian and aeolian
     have none: they are the reference, not a departure from it.

     `bright` orders the modes from brightest to darkest, and each step down
     flattens exactly one more degree. That ordering is the spine of the modes
     unit, so it lives here rather than in the lesson data. */
  var SCALES = {
    major:      { name: 'Major',            steps: [0, 2, 4, 5, 7, 9, 11] },
    natMinor:   { name: 'Natural minor',    steps: [0, 2, 3, 5, 7, 8, 10] },
    harmMinor:  { name: 'Harmonic minor',   steps: [0, 2, 3, 5, 7, 8, 11] },
    melMinor:   { name: 'Melodic minor',    steps: [0, 2, 3, 5, 7, 9, 11] },
    ionian:     { name: 'Ionian',           steps: [0, 2, 4, 5, 7, 9, 11], mode: true, bright: 1 },
    dorian:     { name: 'Dorian',           steps: [0, 2, 3, 5, 7, 9, 10], mode: true, bright: 3, char: 9 },
    phrygian:   { name: 'Phrygian',         steps: [0, 1, 3, 5, 7, 8, 10], mode: true, bright: 5, char: 1 },
    lydian:     { name: 'Lydian',           steps: [0, 2, 4, 6, 7, 9, 11], mode: true, bright: 0, char: 6 },
    mixolydian: { name: 'Mixolydian',       steps: [0, 2, 4, 5, 7, 9, 10], mode: true, bright: 2, char: 10 },
    aeolian:    { name: 'Aeolian',          steps: [0, 2, 3, 5, 7, 8, 10], mode: true, bright: 4 },
    locrian:    { name: 'Locrian',          steps: [0, 1, 3, 5, 6, 8, 10], mode: true, bright: 6, char: 6 },
    minPent:    { name: 'Minor pentatonic', steps: [0, 3, 5, 7, 10] },
    majPent:    { name: 'Major pentatonic', steps: [0, 2, 4, 7, 9] },
    blues:      { name: 'Blues',            steps: [0, 3, 5, 6, 7, 10], char: 6 }
  };

  /* ionian IS major and aeolian IS natural minor, note for note. They exist as
     separate ids because the modes unit needs them by name, but the mastery
     grid must not treat playing A ionian and A major as two different skills —
     that is the same fragmentation the tuning aliases avoid. Resolved in
     exerciseKey only; everything else keeps the id it was given. */
  var SCALE_KEY_ALIASES = { ionian: 'major', aeolian: 'natMinor' };
  function canonicalScaleId(id) {
    return has(SCALE_KEY_ALIASES, id) ? SCALE_KEY_ALIASES[id] : id;
  }

  function scaleSteps(scaleId) {
    return has(SCALES, scaleId) ? SCALES[scaleId].steps.slice() : null;
  }
  /* Degrees per octave — five for pentatonic, six for blues, seven for the
     rest. Position count follows from this rather than being hardcoded at 5 or
     7: a scale has as many box positions as it has degrees. */
  function scaleDegreeCount(scaleId) {
    var st = scaleSteps(scaleId);
    return st ? st.length : 0;
  }
  function scalePitchClasses(scaleId, rootPc) {
    var st = scaleSteps(scaleId);
    if (!st) return null;
    var out = [];
    for (var i = 0; i < st.length; i++) out.push(((rootPc + st[i]) % 12 + 12) % 12);
    return out;
  }
  function isScaleTone(midi, scaleId, rootPc) {
    var pcs = scalePitchClasses(scaleId, rootPc);
    if (!pcs) return false;
    var pc = ((midi % 12) + 12) % 12;
    return pcs.indexOf(pc) !== -1;
  }
  /* The characteristic note as an absolute pitch class, for the highlight. */
  function characteristicPc(scaleId, rootPc) {
    if (!has(SCALES, scaleId) || SCALES[scaleId].char === undefined) return null;
    return ((rootPc + SCALES[scaleId].char) % 12 + 12) % 12;
  }
  function modesByBrightness() {
    return Object.keys(SCALES)
      .filter(function (k) { return SCALES[k].mode; })
      .sort(function (a, b) { return SCALES[a].bright - SCALES[b].bright; });
  }

  /* ── Positions ────────────────────────────────────────────────────────────
     A position is a window of frets in which the whole scale is played across
     all six strings. Box n is anchored on the fret where the nth scale degree
     sounds on string 6, which is the definition every method book uses and the
     one that generalises past pentatonics — a scale has as many boxes as it has
     degrees, so minor pentatonic gets five and dorian gets seven.

     Notes come back in PLAYING order — string 6 first, low fret to high, then
     string 5 — not in pitch order. Those differ slightly where strings overlap,
     and playing order is what a scale run actually is. */
  /* Notes per string, by how many degrees the scale has. A pentatonic box is
     two notes per string — that is what makes it a box — and a seven-note
     position is three. Blues is the pentatonic shape with the flat five folded
     in, so it stays at two and picks the extra note up where it falls. */
  var NOTES_PER_STRING = { 5: 2, 6: 2, 7: 3 };

  function boxAnchor(scaleId, rootPc, boxIndex, fb) {
    var st = scaleSteps(scaleId);
    if (!st) return null;
    var n = st.length;
    var idx = ((boxIndex % n) + n) % n;
    var open6 = openMidi(6, fb);
    if (open6 === null) return null;
    var targetPc = ((rootPc + st[idx]) % 12 + 12) % 12;
    var start = Math.max(0, fb.capo);
    for (var f = start; f <= MAX_FRET; f++) {
      if ((((open6 + f) % 12) + 12) % 12 === targetPc) return f;
    }
    return null;
  }

  /* A position is a CLIMB, not a rectangular fret window.
     An earlier version took every scale tone inside [anchor, anchor + span],
     with the string-6 degree as the lower bound. That is right for box 0 and
     wrong for most others: on the higher strings the shape reaches BELOW the
     string-6 anchor, so those notes were dropped and six of the ten pentatonic
     boxes came out with one note on some strings instead of two. A minor
     pentatonic box 2 spans frets 7–10, not 8–11.

     Climbing fixes it by construction: take `per` scale tones on string 6 from
     the anchor up, then continue on each higher string from the pitch after the
     last one taken. The strictly-ascending guard also removes the unison
     repeats the window produced where strings overlap. */
  function climbPosition(scaleId, rootPc, fb, boxIndex) {
    var st = scaleSteps(scaleId);
    if (!st) return null;
    var per = NOTES_PER_STRING[st.length] || 2;
    var fromFret = boxAnchor(scaleId, rootPc, boxIndex, fb);
    if (fromFret === null) return null;
    var out = [], lastMidi = -Infinity;
    for (var s = STRING_COUNT; s >= 1; s--) {
      var open = openMidi(s, fb);
      if (open === null) return null;
      var taken = 0, f = fromFret;
      while (taken < per && f <= MAX_FRET) {
        var note = { string: s, fret: f };
        var midi = open + f;
        if (midi > lastMidi && isPlayable(note, fb) && isScaleTone(midi, scaleId, rootPc)) {
          out.push(note); lastMidi = midi; taken++;
        }
        f++;
      }
      if (taken < per) return null;
      if (s > 1) {
        var nextOpen = openMidi(s - 1, fb);
        if (nextOpen === null) return null;
        fromFret = Math.max(0, fb.capo, lastMidi + 1 - nextOpen);
      }
    }
    return out;
  }

  /* positionSpec: { kind:'box', index } | { kind:'string', string }
     There is no separate three-notes-per-string kind: under the climb it is
     exactly what a seven-note box already is, and two ids for one shape would
     split its mastery cell in half. True CAGED five-shape positions are a
     genuinely different system and are deferred rather than conflated. */
  function positionNotes(scaleId, rootPc, fb, spec) {
    if (!scaleSteps(scaleId)) return null;
    spec = spec || { kind: 'box', index: 0 };
    if (spec.kind === 'string') {
      var s = spec.string;
      if (!(s >= 1 && s <= STRING_COUNT)) return null;
      var open = openMidi(s, fb);
      if (open === null) return null;
      var line = [];
      for (var f = Math.max(0, fb.capo); f <= MAX_FRET; f++) {
        var n2 = { string: s, fret: f };
        if (isPlayable(n2, fb) && isScaleTone(open + f, scaleId, rootPc)) line.push(n2);
      }
      return line.length ? line : null;
    }
    var notes = climbPosition(scaleId, rootPc, fb, spec.index || 0);
    return (notes && notes.length) ? notes : null;
  }

  function positionCount(scaleId, kind) {
    var n = scaleDegreeCount(scaleId);
    if (!n) return 0;
    if (kind === 'string') return STRING_COUNT;
    if (kind === 'box') return n;
    return 0;
  }

  /* ── Sequence patterns ────────────────────────────────────────────────────
     A sequence reorders an ordered note list into the shape you actually
     practise. Running a scale straight up and down is the one shape that makes
     solos sound like scales, which is why the others exist.

     Each is an index generator over a list of length n, so the same code drives
     any scale in any position. Descending is the ascending pattern applied to
     the reversed list, which is what "in 3s descending" means when a teacher
     says it — not the ascending sequence played backwards. */
  function range(n) { var a = []; for (var i = 0; i < n; i++) a.push(i); return a; }
  function groupsOf(n, k) {
    var out = [];
    for (var i = 0; i + k <= n; i++) for (var j = 0; j < k; j++) out.push(i + j);
    return out;
  }
  function intervalPairs(n, step) {
    var out = [];
    for (var i = 0; i + step < n; i++) { out.push(i); out.push(i + step); }
    return out;
  }
  var SEQUENCES = {
    straight: { name: 'Straight',      idx: function (n) { return range(n); } },
    in3s:     { name: 'In 3s',         idx: function (n) { return groupsOf(n, 3); } },
    in4s:     { name: 'In 4s',         idx: function (n) { return groupsOf(n, 4); } },
    thirds:   { name: 'In 3rds',       idx: function (n) { return intervalPairs(n, 2); } },
    fourths:  { name: 'In 4ths',       idx: function (n) { return intervalPairs(n, 3); } },
    broken:   { name: 'Broken 3rds',   idx: function (n) {
      var out = [];
      for (var i = 0; i + 3 < n; i++) { out.push(i); out.push(i + 2); out.push(i + 1); out.push(i + 3); }
      return out;
    } },
    skip:     { name: 'Skipping',      idx: function (n) {
      var out = []; for (var i = 0; i < n; i += 2) out.push(i); return out;
    } },
    pedal:    { name: 'Pedal tone',    idx: function (n) {
      var out = []; for (var i = 1; i < n; i++) { out.push(0); out.push(i); } return out;
    } }
  };

  /* `startIndex` rotates the note list, NOT the scale degree — the two differ
     because a position starts on whichever degree anchors it. Named for what it
     does; an earlier draft called it startDegree and documented it as degrees,
     which is wrong for every box but the first. */
  function applySequence(notes, sequenceId, descending, startIndex) {
    if (!notes || !notes.length) return null;
    if (!has(SEQUENCES, sequenceId)) return null;
    var src = notes.slice();
    if (startIndex) {
      var k = ((startIndex % src.length) + src.length) % src.length;
      src = src.slice(k).concat(src.slice(0, k));
    }
    if (descending) src.reverse();
    var idx = SEQUENCES[sequenceId].idx(src.length);
    var out = [];
    for (var i = 0; i < idx.length; i++) {
      var n = src[idx[i]];
      if (n) out.push({ string: n.string, fret: n.fret });
    }
    return out.length ? out : null;
  }

  /* ── Rhythms ──────────────────────────────────────────────────────────────
     Subdivision in beats. Swing is deliberately absent: it needs unequal pair
     durations rather than one subdivision, so it belongs with the rhythm work
     in M2 rather than being faked here. */
  var RHYTHMS = {
    quarters:   { name: 'Quarters',   sub: 1 },
    eighths:    { name: 'Eighths',    sub: 0.5 },
    triplets:   { name: 'Triplets',   sub: 1 / 3 },
    sixteenths: { name: 'Sixteenths', sub: 0.25 },
    sextuplets: { name: 'Sextuplets', sub: 1 / 6 }
  };

  /* ── The generator ────────────────────────────────────────────────────────
     One exercise from one tuple. Returns { notes, meta } or { fault } — never
     throws, and never returns something half-formed, because the playability
     sweep needs a reason string it can report rather than an exception.

     Picking-hand patterns (p-i-m-a and the Giuliani ladder) will populate the
     same shape with `patternId` in place of `scaleId`; that branch lands with
     unit P2 and is deliberately not stubbed here. */
  function generateExercise(spec) {
    spec = spec || {};
    var fb = makeFretboard({ tuning: spec.tuning, capo: spec.capo, handed: spec.handed });
    if (spec.tuning && !resolveTuningId(spec.tuning)) return { fault: 'unknown tuning: ' + spec.tuning };
    if (!has(SCALES, spec.scaleId)) return { fault: 'unknown scale: ' + spec.scaleId };
    var rootPc = Number(spec.rootPc);
    if (!isFinite(rootPc) || rootPc !== Math.round(rootPc)) return { fault: 'rootPc must be a whole number' };
    rootPc = ((rootPc % 12) + 12) % 12;

    var posKind = spec.positionKind || 'box';
    var count = positionCount(spec.scaleId, posKind);
    if (!count) return { fault: posKind + ' positions are not defined for ' + spec.scaleId };
    var posIndex = ((Number(spec.positionIndex || 0) % count) + count) % count;
    var spec2 = posKind === 'string'
      ? { kind: 'string', string: posIndex + 1 }
      : { kind: posKind, index: posIndex };

    var base = positionNotes(spec.scaleId, rootPc, fb, spec2);
    if (!base) return { fault: 'no playable position: ' + spec.scaleId + ' ' + posKind + ' ' + posIndex +
                               ' in ' + fb.tuning + ' capo ' + fb.capo };

    var seqId = spec.sequence || 'straight';
    var startIndex = Math.round(Number(spec.startIndex) || 0);
    var seq = applySequence(base, seqId, !!spec.descending, startIndex);
    if (!seq) return { fault: 'sequence ' + seqId + ' produced nothing from ' + base.length + ' notes' };

    var rhythmId = spec.rhythm || 'eighths';
    if (!has(RHYTHMS, rhythmId)) return { fault: 'unknown rhythm: ' + rhythmId };
    var sub = RHYTHMS[rhythmId].sub;

    var notes = [];
    for (var i = 0; i < seq.length; i++) {
      notes.push({
        string: seq[i].string,
        fret: seq[i].fret,
        beat: beatAt(i, sub),      // computed, never accumulated
        dur: sub,
        hand: 'f'
      });
    }
    return {
      notes: notes,
      /* The fretboard these notes were computed FOR. Returned so a caller
         cannot draw them on a different one: notes are string-and-fret
         positions, so rendering a standard-tuning shape on a DADGAD neck
         produces a confident, completely wrong diagram with nothing to
         indicate it. That happened in the step 6 visual check. */
      fb: fb,
      meta: {
        scaleId: spec.scaleId, rootPc: rootPc, positionKind: posKind, positionIndex: posIndex,
        sequence: seqId, descending: !!spec.descending, startIndex: startIndex, rhythm: rhythmId,
        tempo: Number(spec.tempo) > 0 ? Number(spec.tempo) : DEFAULT_BPM,
        tuning: fb.tuning, capo: fb.capo,
        beats: seq.length * sub
      }
    };
  }

  /* Stable key for the mastery grid. Deterministic, no free text, and it must
     not include anything that is a rendering choice — handedness in particular,
     or the same exercise would score twice. */
  function exerciseKey(meta) {
    return [canonicalScaleId(meta.scaleId), meta.rootPc,
            meta.positionKind + meta.positionIndex,
            meta.sequence + (meta.descending ? 'D' : 'A') + '@' + (meta.startIndex || 0),
            meta.rhythm, meta.tuning, meta.capo].join('|');
  }

  /* ── Timing ───────────────────────────────────────────────────────────────
     Pure arithmetic, deliberately kept out of guitar-audio.js so it can be
     tested in Node. Web Audio scheduling itself cannot be; this can, and this
     is where the errors that matter live.

     BEATS ARE COMPUTED, NEVER ACCUMULATED. Not for precision — that was
     measured, and accumulating 1/3 a million times drifts by about 1.6
     microseconds at 40 bpm, against a 2 ms tolerance. The reason is path
     dependence: an accumulated position depends on the route taken to reach
     it, so a tempo change, a loop wrap or a seek corrupts every event after
     it, by an unbounded amount. A computed position depends only on its index
     and survives all three.

     THE TEMPO MAP is a list of { beat, bpm } — the beat at which each change
     happens, never an elapsed-seconds running total, for the same reason.
     compileTempoMap() precomputes each segment's start time once so that
     repeated transportTime() calls cannot disagree with each other. */

  var DEFAULT_BPM = 120;

  function beatsToSeconds(beats, bpm) { return beats * 60 / bpm; }
  function secondsToBeats(sec, bpm)   { return sec * bpm / 60; }

  /* Event n of a regular subdivision. Trivial, and exported so that "compute,
     don't accumulate" is a call site rather than a convention people remember. */
  function beatAt(index, subdivision) { return index * subdivision; }

  function compileTempoMap(entries) {
    /* A bare object is accepted as a one-entry map. Discarding it and falling
       back to 120 would play the whole piece at the wrong tempo with nothing
       anywhere reporting a problem. */
    var raw = Array.isArray(entries) ? entries
            : (entries && typeof entries === 'object') ? [entries]
            : [];
    var clean = [];
    for (var i = 0; i < raw.length; i++) {
      var e = raw[i];
      if (!e) continue;
      var b = Number(e.beat), t = Number(e.bpm);
      /* Negative beats belong to a count-in, which runs at the beat-0 tempo;
         a tempo change before the piece starts is meaningless. */
      if (!isFinite(b) || !isFinite(t) || t <= 0 || b < 0) continue;
      clean.push({ beat: b, bpm: t });
    }
    clean.sort(function (a, b2) { return a.beat - b2.beat; });

    /* Two entries on the same beat: the later one in the input wins, which is
       what a caller editing a map in place expects. */
    var dedup = [];
    for (var j = 0; j < clean.length; j++) {
      if (j + 1 < clean.length && clean[j + 1].beat === clean[j].beat) continue;
      dedup.push(clean[j]);
    }
    if (!dedup.length) dedup = [{ beat: 0, bpm: DEFAULT_BPM }];
    if (dedup[0].beat > 0) dedup.unshift({ beat: 0, bpm: dedup[0].bpm });

    var segs = [], acc = 0;
    for (var k = 0; k < dedup.length; k++) {
      segs.push({ beat: dedup[k].beat, bpm: dedup[k].bpm, time: acc });
      if (k + 1 < dedup.length) {
        acc += beatsToSeconds(dedup[k + 1].beat - dedup[k].beat, dedup[k].bpm);
      }
    }
    return segs;
  }

  /* transportTime and beatAtTime want COMPILED segments, which carry a
     precomputed .time. Handed a raw [{beat,bpm}] map they would read
     undefined and return NaN for every event — silent, and catastrophic. So
     they normalise instead: a raw map is compiled on the spot. Compiling once
     and reusing is still preferable, and is what the transport does. */
  function asSegments(map) {
    if (!Array.isArray(map) || !map.length) return compileTempoMap(map);
    return typeof map[0].time === 'number' ? map : compileTempoMap(map);
  }

  /* Which segment governs this beat. Linear from the end because tempo maps
     are a handful of entries; if one ever grows, binary search here. */
  function segmentFor(segs, beat) {
    var i = segs.length - 1;
    while (i > 0 && segs[i].beat > beat) i--;
    return segs[i];
  }
  function segmentAtTime(segs, rel) {
    var i = segs.length - 1;
    while (i > 0 && segs[i].time > rel) i--;
    return segs[i];
  }

  /* Wall-clock time of a beat. Negative beats are the count-in and land before
     t0, which falls out of the arithmetic rather than needing a special case. */
  function transportTime(beat, map, t0) {
    var base = t0 || 0;
    var segs = asSegments(map);
    var s = segmentFor(segs, beat);
    return base + s.time + beatsToSeconds(beat - s.beat, s.bpm);
  }

  /* The inverse, for the playback cursor: rAF reads the clock, converts, draws.
     The cursor must follow audio and never lead it. */
  function beatAtTime(sec, map, t0) {
    var segs = asSegments(map);
    var rel = sec - (t0 || 0);
    var s = segmentAtTime(segs, rel);
    return s.beat + secondsToBeats(rel - s.time, s.bpm);
  }

  /* ── Looping ──────────────────────────────────────────────────────────────
     loopWrap maps an absolute beat into the loop's range. loopIteration says
     which pass it belongs to, and that is the one that matters: a loop shorter
     than the scheduler's lookahead window is covered more than once per tick,
     so events must be keyed on (iteration, index) or every one is scheduled
     twice. Keying on beat position alone cannot tell the passes apart. */
  function loopLength(loopStart, loopEnd) {
    var len = loopEnd - loopStart;
    return isFinite(len) && len > 0 ? len : 0;
  }
  function loopWrap(beat, loopStart, loopEnd) {
    var len = loopLength(loopStart, loopEnd);
    if (!len) return beat;
    var off = (beat - loopStart) % len;
    if (off < 0) off += len;
    return loopStart + off;
  }
  function loopIteration(beat, loopStart, loopEnd) {
    var len = loopLength(loopStart, loopEnd);
    if (!len) return 0;
    return Math.floor((beat - loopStart) / len);
  }

  /* ── String synthesis ─────────────────────────────────────────────────────
     Karplus–Strong. A burst of noise in a delay line, fed back through a
     one-pole averaging filter: the noise decays into a pitched, plucky tone
     that sounds enough like a string to play along with. No samples, no
     soundfont, no megabytes, and it works offline.

     THE DELAY LENGTH IS ALMOST NEVER A WHOLE NUMBER, and rounding it detunes
     the note. That is measured, not assumed: rounding to the nearest sample
     puts E4 3.7 cents out and reaches 14.7 cents at C6 — a quarter of the way
     to the next semitone, and audibly wrong to anyone with an ear. Training
     intervals against references that far off is worse than not training them,
     so the fractional part is interpolated. Measured error with interpolation
     is 0.05 cents: 278 times better, and well inside the 1-cent gate.

     Those figures are the SECOND set. The first were taken with a phase
     estimator whose unambiguous range was narrower than the tolerance it
     policed, so large errors aliased into small readings and integer rounding
     looked like 3.8 cents. See the note above estimateFreq in the test.

     Linear interpolation is what is used here, and it is worth saying why,
     because the obvious upgrade is wrong. A first-order allpass has flat
     magnitude and is the textbook fractional-delay filter, so it was tried:
     it measured *worse* (0.030 cents against 0.016). Its group delay drifts
     near Nyquist, which is exactly where the short delay lines of high notes
     live. Simpler and better; do not "improve" this without measuring.

     DECAY IS FREQUENCY-DEPENDENT, for a plainer reason. The loop runs once per
     period, so a fixed per-loop gain makes a high note lose the same energy in
     a fifth of the time. Held constant, top E goes "plink" while the low E
     rings for seconds. The loop gain is therefore derived from a target decay
     time, which keeps the whole range sounding like one instrument. */

  var DEFAULT_SAMPLE_RATE = 44100;

  /* Deterministic PRNG, so a rendered pitch is byte-identical every run and the
     test can assert against it. Math.random would make the gate flaky. */
  function mulberry32(seed) {
    var a = seed | 0;
    return function () {
      a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* Per-sample loop gain giving a -60 dB decay in `t60` seconds at `freq`.
     The loop turns over `freq` times a second, so it needs `freq * t60`
     passes to lose 60 dB. */
  function loopGainFor(freq, t60) {
    if (!(freq > 0) || !(t60 > 0)) return 0.996;
    return Math.pow(10, -3 / (freq * t60));
  }

  function karplusStrong(freq, opts) {
    opts = opts || {};
    var sr = opts.sampleRate > 0 ? opts.sampleRate : DEFAULT_SAMPLE_RATE;
    if (!(freq > 0) || freq >= sr / 2) return null;
    var seconds = opts.seconds > 0 ? opts.seconds : 2.0;
    var t60 = opts.t60 > 0 ? opts.t60 : 2.5;
    var gain = opts.decay > 0 ? opts.decay : loopGainFor(freq, t60);
    var seed = opts.seed === undefined ? 1 : (opts.seed | 0);
    /* brightness 0..1: how much of the initial noise survives. A raw burst is
       harsh and snare-like; lowpassing it is one line and sounds like a finger
       rather than a pick, which is the right default for a fingerstyle course. */
    var brightness = opts.brightness === undefined ? 0.5 : Math.max(0, Math.min(1, opts.brightness));

    /* The averaging filter contributes half a sample of delay, so the line
       itself carries the rest of the period. */
    var d = sr / freq - 0.5;
    var di = Math.floor(d);
    var frac = d - di;
    if (di < 2) return null;                      // too high to synthesise here
    var len = di + 2;

    var line = new Float32Array(len);
    var rnd = mulberry32(seed);
    var prev = 0;
    for (var i = 0; i < len; i++) {
      var white = rnd() * 2 - 1;
      prev = brightness * white + (1 - brightness) * prev;   // one-pole excitation
      line[i] = prev;
    }

    var out = new Float32Array(Math.max(1, Math.floor(sr * seconds)));
    var w = 0, lpPrev = 0;
    for (var n = 0; n < out.length; n++) {
      var r0 = (w - di + len) % len;
      var r1 = (r0 - 1 + len) % len;
      var s = line[r0] + frac * (line[r1] - line[r0]);       // fractional read
      var y = gain * 0.5 * (s + lpPrev);                     // averaging lowpass
      lpPrev = s;
      line[w] = y;
      out[n] = y;
      w = (w + 1) % len;
    }
    return out;
  }

  /* Render one buffer per distinct pitch. NOT one buffer transposed with
     playbackRate: that shifts the decay character along with the pitch, so low
     notes ring wrong and high notes sound sped-up rather than higher. */
  function renderPitch(midi, opts) {
    return karplusStrong(midiToFreq(midi), opts);
  }

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
    /* scales */
    SCALES: SCALES,
    scaleSteps: scaleSteps,
    canonicalScaleId: canonicalScaleId,
    SCALE_KEY_ALIASES: SCALE_KEY_ALIASES,
    scaleDegreeCount: scaleDegreeCount,
    scalePitchClasses: scalePitchClasses,
    isScaleTone: isScaleTone,
    characteristicPc: characteristicPc,
    modesByBrightness: modesByBrightness,
    /* positions */
    boxAnchor: boxAnchor,
    positionNotes: positionNotes,
    positionCount: positionCount,
    /* sequences and rhythms */
    SEQUENCES: SEQUENCES,
    RHYTHMS: RHYTHMS,
    applySequence: applySequence,
    /* generator */
    generateExercise: generateExercise,
    exerciseKey: exerciseKey,
    /* synthesis */
    karplusStrong: karplusStrong,
    renderPitch: renderPitch,
    loopGainFor: loopGainFor,
    DEFAULT_SAMPLE_RATE: DEFAULT_SAMPLE_RATE,
    /* timing */
    beatsToSeconds: beatsToSeconds,
    secondsToBeats: secondsToBeats,
    beatAt: beatAt,
    compileTempoMap: compileTempoMap,
    asSegments: asSegments,
    transportTime: transportTime,
    beatAtTime: beatAtTime,
    loopWrap: loopWrap,
    loopIteration: loopIteration,
    loopLength: loopLength,
    /* constants */
    STRING_COUNT: STRING_COUNT,
    MAX_FRET: MAX_FRET,
    DEFAULT_BPM: DEFAULT_BPM
  };
}));
