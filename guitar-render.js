/* Guitar renderer — chord boxes, neck diagrams and tablature, as SVG strings.
 *
 * Strings rather than DOM nodes, for two reasons. aat1-ui.js already builds its
 * markup this way and assigns innerHTML, so it is the house style; and a
 * function that returns markup can be asserted on in Node, which turns step 6's
 * gate from "look at it and see" into "prove the structure, then look at it".
 *
 * THE ONE RULE
 *
 * Nothing here computes a string or fret coordinate. Every position comes from
 * guitar-engine.js — chordBoxStringX, neckStringY, neckFretX, tabStringY — which
 * are the only four functions that know which way round anything goes.
 * check-guitar-handedness.js enforces that by grepping this file, because the
 * one time an axis was reasoned about locally it came out inverted.
 *
 * COLOUR
 *
 * There is none. Every stroke and fill is `currentColor` or a CSS custom
 * property, so light and dark themes are the stylesheet's business and this
 * file cannot get them wrong. A literal hex here would be a bug.
 *
 * INPUT
 *
 * Everything takes notes in the shape the engine defines — { string, fret } —
 * and never a six-element array whose ends someone has to remember. Chord
 * shapes are conventionally written as arrays, and that convention is exactly
 * the sort of thing that gets read backwards, so it is not used.
 */
(function (root, factory) {
  'use strict';
  var E = (typeof module === 'object' && module.exports)
    ? require('./guitar-engine.js')
    : root.GuitarEngine;
  var api = factory(E);
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.GuitarRender = api;
}(typeof self !== 'undefined' ? self : this, function (E) {
  'use strict';

  /* ── Geometry constants. Nothing outside this block invents a number. ───── */
  /* Chord box. padTop has to hold TWO stacked rows above the nut — the chord
     name and the open/muted markers — and at 26 it did not: the name sat on a
     baseline of 9 and the markers on 14, so with an 11px name over 9px markers
     the glyphs overlapped, and "A7" and "Asus4" collided with the circles above
     the third and fourth strings. Both rows are now placed from named
     baselines rather than from arithmetic on padTop, so the relationship is
     stated once and the two cannot drift apart again. */
  var CB = {                       // chord box
    stringGap: 16, fretGap: 20, padX: 14, padTop: 36, padBottom: 18,
    nameBaseline: 11, markBaseline: 27,
    dot: 5.4, nutThickness: 3.4
  };
  var NK = {                       // neck diagram
    stringGap: 13, fretGap: 26, padX: 22, padY: 18, dot: 5.6, frets: 12
  };
  var TB = {                       // tablature
    stringGap: 11, beatGap: 26, padX: 26, padY: 20, fontSize: 9.5, barPad: 11
  };
  /* At or above this level a note is drawn with an accent. One number, read by
     the renderer and by the content checker, so "loud enough to mark" and
     "loud enough to hear" cannot be set to two different things. */
  var ACCENT_LEVEL = 1.2;
  /* Width of one italic 8px fingering letter, used to decide which side of a
     note it fits on. Measured from the rendered figure rather than guessed. */
  /* How far above the top string and below the bottom one the marginal marks
     sit. Both were a pixel closer, which left the em box of a fingering letter
     overlapping the em box of a string-1 digit — no visible smudge, about a
     pixel and a half of ink between them, and no room for a check to draw the
     line anywhere principled. Moved out to a clear three pixels, so the rule
     "nothing on a figure touches anything else" can be enforced literally. */
  var ABOVE = 12, BELOW = 13;
  var MARKER_FRETS = [3, 5, 7, 9, 15, 17, 19, 21];
  var DOUBLE_MARKER_FRETS = [12, 24];

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function n2(v) { return Math.round(v * 100) / 100; }

  /* Half the width of the mask behind a fret number. A digit's advance in a
     system sans is close to 0.29em; the pad keeps the stave line from grazing
     the glyph. Used both to draw the mask and to work out how far apart notes
     have to sit, so the two can never disagree. */
  function digitHalf(value) {
    return (String(value).length * TB.fontSize * 0.29) + 1.3;
  }

  /* Every figure is wrapped the same way: a viewBox so it scales to its
     container, a role and title so a screen reader gets something, and an
     overflow-x container so a wide one scrolls itself rather than the page. */
  /* Below these widths the digits stop being readable, so a wide figure in a
     narrow container should scroll rather than shrink past them. Held here
     rather than in the stylesheet because the natural width is only known here,
     and the two bounds have to be decided together — see below. */
  var MIN_LEGIBLE = { 'gtr-tab': 300, 'gtr-neck': 340, 'gtr-chordbox': 108 };

  function svgWrap(w, h, title, cls, body) {
    /* BOTH BOUNDS, from the natural width, in one place.
       The stylesheet used to set a flat min-width per kind — 300px for any tab
       — and min-width beats max-width in CSS. So a two-bar demonstration 115
       units wide was forced out to 300 and drawn at nearly three times its
       size, with every digit and fingering letter enlarged to match. A floor
       meant for long staves was being applied to short ones.
       The floor is now whichever is smaller, the legible minimum or the figure
       itself, so a figure is never stretched past its own size and a long one
       still scrolls rather than shrinking. */
    var floor = Math.min(w, MIN_LEGIBLE[cls] || 0);
    return '<div class="gtr-fig ' + esc(cls) + '">' +
      '<svg viewBox="0 0 ' + n2(w) + ' ' + n2(h) + '" width="100%" ' +
      'style="min-width:' + n2(floor) + 'px;max-width:' + n2(w) + 'px" ' +
      'preserveAspectRatio="xMidYMid meet" role="img" ' +
      'aria-label="' + esc(title) + '" class="gtr-svg ' + esc(cls) + '-svg">' +
      '<title>' + esc(title) + '</title>' + body + '</svg></div>';
  }
  function line(x1, y1, x2, y2, cls) {
    return '<line x1="' + n2(x1) + '" y1="' + n2(y1) + '" x2="' + n2(x2) + '" y2="' + n2(y2) +
           '" class="' + esc(cls) + '" stroke="currentColor" />';
  }
  /* Every drawn note is wrapped so a caller can find it again by its position
     in the notes array — which is how the playback cursor lights the note that
     is sounding. The index is the array index and nothing else: the transport
     plays the same array in the same order, so the two agree by construction
     rather than by matching on beat, which would need float comparison and
     would still not separate two notes struck together. */
  /* The one ordering every figure and the transport agree on.
     data-i is only meaningful if everyone numbers the notes the same way. The
     tab has always sorted its own copy; the neck diagram drew in whatever order
     the caller passed, so a caller handing the two figures an unsorted array
     got two different numberings for the same notes — and a cursor that lit the
     right note in one figure and the wrong note in the other. Shared here so
     the agreement is by construction rather than by every caller remembering. */
  function inPlayOrder(notes) {
    return (notes || []).slice().sort(function (a, b) {
      return (a.beat - b.beat) || (a.string - b.string);
    });
  }
  function noteGroup(i, inner) {
    return '<g class="gtr-note" data-i="' + (i | 0) + '">' + inner + '</g>';
  }
  function circle(cx, cy, r, cls) {
    return '<circle cx="' + n2(cx) + '" cy="' + n2(cy) + '" r="' + n2(r) + '" class="' + esc(cls) + '" />';
  }
  function text(x, y, str, cls) {
    return '<text x="' + n2(x) + '" y="' + n2(y) + '" class="' + esc(cls) +
           '" text-anchor="middle" dominant-baseline="central">' + esc(str) + '</text>';
  }
  function textStart(x, y, str, cls) {
    return '<text x="' + n2(x) + '" y="' + n2(y) + '" class="' + esc(cls) +
           '" text-anchor="start" dominant-baseline="central">' + esc(str) + '</text>';
  }

  /* ── Chord box ────────────────────────────────────────────────────────────
     Vertical, nut at the top. The strings are the horizontal axis, so they are
     what flips for a left-handed player; the frets run downward and do not.

     `baseFret` is the fret the top row represents. At 1 the nut is drawn thick;
     above that a label says which fret it is, which is how every chord chart
     handles a shape up the neck.

     A shape may declare the `tuning` it was worked out for. If it does and the
     fretboard disagrees, the figure says so loudly rather than drawing a
     confidently mislabelled chord — a standard-tuning C shape on a DADGAD neck
     is not a C, and nothing about the picture would tell you. Shapes from
     E.findVoicing() carry their tuning automatically.

     shape = { name, notes: [{string, fret, finger?}], muted: [stringNo], baseFret?, tuning? } */
  function chordBox(shape, fb) {
    shape = shape || {};
    fb = fb || E.makeFretboard();
    var notes = (shape.notes || []).filter(function (n) {
      return n && n.string >= 1 && n.string <= E.STRING_COUNT;
    });
    var fretted = notes.filter(function (n) { return n.fret > fb.capo; });
    var used = fretted.map(function (n) { return n.fret; });
    var lo = used.length ? Math.min.apply(null, used) : 1;
    var hi = used.length ? Math.max.apply(null, used) : 1;
    /* The window must fit EVERY fretted note. Choosing it from the lowest alone
       puts a shape at frets 4-6 in open position, draws a nut that is not there
       and silently drops the dots that fall past row 4 — which renders as a
       different chord, plausibly enough that nobody notices. */
    var base = shape.baseFret || (hi <= 4 ? 1 : lo);
    var rows = Math.max(4, hi - base + 1);

    var w = CB.padX * 2 + CB.stringGap * (E.STRING_COUNT - 1);
    var h = CB.padTop + CB.fretGap * rows + CB.padBottom;
    var x = function (stringNo) { return CB.padX + E.chordBoxStringX(stringNo, fb, CB.stringGap); };
    var y = function (row) { return CB.padTop + row * CB.fretGap; };

    var g = '';
    for (var s = 1; s <= E.STRING_COUNT; s++) g += line(x(s), y(0), x(s), y(rows), 'gtr-cb-string');
    for (var r = 0; r <= rows; r++) g += line(x(1), y(r), x(E.STRING_COUNT), y(r), 'gtr-cb-fret');
    if (base === 1) {
      g += '<rect x="' + n2(Math.min(x(1), x(E.STRING_COUNT))) + '" y="' + n2(y(0) - CB.nutThickness) +
           '" width="' + n2(CB.stringGap * (E.STRING_COUNT - 1)) + '" height="' + n2(CB.nutThickness) +
           '" class="gtr-cb-nut" />';
    } else {
      /* Inside the box, not beside it: at text-anchor="end" a two-digit label
         ran off the left edge of the viewBox and clipped "12" to "2" — a wrong
         position marker rather than an obviously missing one. */
      g += '<text x="' + n2(Math.min(x(1), x(E.STRING_COUNT)) - CB.padX / 2) + '" y="' + n2(y(0) + CB.fretGap / 2) +
           '" class="gtr-cb-basefret" text-anchor="middle" dominant-baseline="central">' + base + '</text>';
    }

    /* Open and muted markers sit above the nut, one per string. */
    var sounded = {};
    notes.forEach(function (n) { sounded[n.string] = n; });
    for (var s2 = 1; s2 <= E.STRING_COUNT; s2++) {
      var mark = null;
      if ((shape.muted || []).indexOf(s2) !== -1) mark = '×';
      else if (sounded[s2] && sounded[s2].fret <= fb.capo) mark = '○';
      else if (!sounded[s2]) mark = '×';
      if (mark) g += text(x(s2), CB.markBaseline, mark, 'gtr-cb-mark');
    }

    notes.forEach(function (nte) {
      if (nte.fret <= fb.capo) return;                 // open, already marked
      var row = nte.fret - base + 0.5;
      if (row < 0 || row > rows) return;               // unreachable: rows fits hi
      g += circle(x(nte.string), y(row), CB.dot, 'gtr-cb-dot');
      if (nte.finger) g += text(x(nte.string), y(row), nte.finger, 'gtr-cb-finger');
    });

    /* Raw, not pre-escaped: svgWrap escapes the title itself, and doing it
       twice turned "A&B" into "A&amp;amp;B" in the aria-label while the visible
       name (line below) rendered correctly — the two paths disagreed. */
    var wrongTuning = shape.tuning && shape.tuning !== fb.tuning;
    var shown = (wrongTuning ? '\u26A0 ' : '') + (shape.name || '');
    var label = wrongTuning
      ? (shape.name || 'Chord') + ' — shape is for ' + shape.tuning + ', drawn on ' + fb.tuning
      : (shape.name || 'Chord') + ' chord shape';
    var head = shown.trim()
      ? text(w / 2, CB.nameBaseline, shown, 'gtr-cb-name' + (wrongTuning ? ' is-wrong-tuning' : ''))
      : '';
    return svgWrap(w, h, label, 'gtr-chordbox', head + g);
  }

  /* ── Neck diagram ─────────────────────────────────────────────────────────
     Horizontal, nut at the left for a right-handed player. The FRETS are the
     horizontal axis here, so they flip; the string order does not, because a
     horizontal reflection cannot reorder a vertical axis. High E stays on top
     in both hands, matching the tab stave it usually sits beside.

     opts = { notes, root, characteristic, labels, frets } */
  function neckDiagram(opts, fb) {
    opts = opts || {};
    fb = fb || E.makeFretboard();
    /* Grow to fit. A fixed 12-fret window silently discarded every note above
       it — an 18-note major-scale position reaching fret 17 rendered four dots
       and said nothing. */
    var highest = (opts.notes || []).reduce(function (m, n) { return Math.max(m, n.fret || 0); }, 0);
    var frets = opts.frets || Math.max(NK.frets, Math.min(E.MAX_FRET, highest + 1));
    var w = NK.padX * 2 + NK.fretGap * frets;
    var h = NK.padY * 2 + NK.stringGap * (E.STRING_COUNT - 1);
    var x = function (fret) { return NK.padX + E.neckFretX(fret, fb, frets, NK.fretGap); };
    var y = function (stringNo) { return NK.padY + E.neckStringY(stringNo, fb, NK.stringGap); };

    var g = '';
    for (var s = 1; s <= E.STRING_COUNT; s++) g += line(x(0), y(s), x(frets), y(s), 'gtr-nk-string');
    for (var f = 0; f <= frets; f++) {
      g += line(x(f), y(1), x(f), y(E.STRING_COUNT), f === 0 ? 'gtr-nk-nut' : 'gtr-nk-fret');
    }
    /* Inlay markers, drawn between the string lines so they read as the wood
       rather than as notes. */
    var midY = (y(1) + y(E.STRING_COUNT)) / 2;
    MARKER_FRETS.concat(DOUBLE_MARKER_FRETS).forEach(function (mf) {
      if (mf > frets) return;
      var mx = (x(mf) + x(mf - 1)) / 2;
      if (DOUBLE_MARKER_FRETS.indexOf(mf) !== -1) {
        g += circle(mx, midY - NK.stringGap, 2.4, 'gtr-nk-inlay');
        g += circle(mx, midY + NK.stringGap, 2.4, 'gtr-nk-inlay');
      } else {
        g += circle(mx, midY, 2.4, 'gtr-nk-inlay');
      }
    });
    if (fb.capo > 0 && fb.capo <= frets) {
      g += line(x(fb.capo), y(1), x(fb.capo), y(E.STRING_COUNT), 'gtr-nk-capo');
    }

    inPlayOrder(opts.notes).forEach(function (nte, i) {
      if (nte.fret > frets) return;                    // only when frets was forced by the caller
      var cx = nte.fret === 0 ? x(0) : (x(nte.fret) + x(nte.fret - 1)) / 2;
      var midi = E.soundingMidi(nte, fb);
      var pc = midi === null ? null : ((midi % 12) + 12) % 12;
      var cls = 'gtr-nk-dot';
      if (opts.root != null && pc === (((opts.root % 12) + 12) % 12)) cls += ' is-root';
      else if (opts.characteristic != null && pc === (((opts.characteristic % 12) + 12) % 12)) cls += ' is-char';
      var inner = circle(cx, y(nte.string), NK.dot, cls);
      if (opts.labels && midi !== null) {
        inner += text(cx, y(nte.string), E.midiToName(midi), 'gtr-nk-label');
      }
      g += noteGroup(i, inner);
    });

    return svgWrap(w, h, opts.title || 'Fretboard diagram', 'gtr-neck', g);
  }

  /* ── Tablature ────────────────────────────────────────────────────────────
     Six lines, string 1 on top, fret numbers placed by beat. Polyphony is free:
     two notes sharing a beat on different strings land in the same column,
     which is exactly what a bass note under a melody looks like. No stems — a
     tab column already says what sounds together, and staff engraving is a
     different job.

     Frets print CAPO-RELATIVE, so a capo'd open string reads 0, matching every
     tab source in the world. The engine stores them absolute; displayFret does
     the conversion here and nowhere else.

     Bar lines get breathing room: a note on a downbeat used to be drawn exactly
     on top of its bar line, which is unreadable and wrong — engraving always
     leaves a gap after the line. Each bar is therefore offset by BARPAD, and
     both the lines and the notes are placed from the same arithmetic so they
     cannot drift apart.

     opts = { notes, beatsPerBar, title } */
  function tab(opts, fb) {
    opts = opts || {};
    fb = fb || E.makeFretboard();
    var notes = inPlayOrder(opts.notes);
    var beatsPerBar = opts.beatsPerBar || 4;
    /* A note with no beat used to make totalBeats NaN, and a NaN viewBox does
       not render at all — the figure vanishes with no error anywhere. Treat a
       missing beat as 0 rather than poisoning the geometry. */
    notes = notes.map(function (n) {
      return isFinite(n.beat) ? n : Object.assign({}, n, { beat: 0 });
    });
    var lastBeat = notes.length ? notes[notes.length - 1].beat : 0;
    var totalBeats = Math.max(beatsPerBar, Math.ceil((lastBeat + 0.5) / beatsPerBar) * beatsPerBar);

    /* SPACING MUST CLEAR THE DIGITS, not just the beat.
       Each fret number is drawn over a small rect that masks the stave line
       behind it. That rect is centred, so a two-digit number reaches half its
       width in BOTH directions — and at triplet spacing (26/3 = 8.7px) it ate
       most of the neighbouring digit, turning "7 9 10" into "7 ε 10".

       So the gap between adjacent notes has to clear the sum of the two
       half-widths, and the widest pair in the figure sets the requirement.
       beatGap then grows until the FINEST subdivision present satisfies it.
       Keeping x linear in beat matters: the playback cursor converts a beat to
       an x position, and a non-linear layout would need the same map. */
    var maxHalf = 0;
    notes.forEach(function (nte) { maxHalf = Math.max(maxHalf, digitHalf(E.displayFret(nte, fb))); });
    var needGap = maxHalf * 2 + 2;
    var distinct = [];
    notes.forEach(function (nte) { if (distinct[distinct.length - 1] !== nte.beat) distinct.push(nte.beat); });
    var finest = Infinity;
    for (var d = 1; d < distinct.length; d++) {
      var gap = distinct[d] - distinct[d - 1];
      if (gap > 0 && gap < finest) finest = gap;
    }
    var beatGapPx = (finest === Infinity) ? TB.beatGap : Math.max(TB.beatGap, needGap / finest);

    var bars = Math.max(1, Math.round(totalBeats / beatsPerBar));
    var barWidth = beatsPerBar * beatGapPx + TB.barPad;
    var w = TB.padX * 2 + bars * barWidth;
    /* A capo header needs a row of its own. Sharing the row above the stave
       with the fingering letters put "Capo 2" straight through the letter over
       the first note of the bar — which is where a capo'd figure always starts.
       Present only when there is a capo, so nothing else changes shape. */
    var topExtra = fb.capo > 0 ? 12 : 0;
    var h = TB.padY * 2 + topExtra + TB.stringGap * (E.STRING_COUNT - 1);
    /* Bar k's line, and a note at absolute beat t, both derived from the same
       barWidth so a note can never land on top of a line. */
    var barLineX = function (k) { return TB.padX + k * barWidth; };
    var x = function (beat) {
      var k = Math.floor(beat / beatsPerBar);
      return barLineX(k) + TB.barPad + (beat - k * beatsPerBar) * beatGapPx;
    };
    var y = function (stringNo) { return TB.padY + topExtra + E.tabStringY(stringNo, TB.stringGap); };
    var aboveY = TB.padY + topExtra - ABOVE;
    var markY = TB.padY + topExtra + TB.stringGap * (E.STRING_COUNT - 1) + BELOW;

    var g = '';
    for (var s = 1; s <= E.STRING_COUNT; s++) {
      g += line(barLineX(0), y(s), barLineX(bars), y(s), 'gtr-tab-string');
    }
    for (var k2 = 0; k2 <= bars; k2++) {
      g += line(barLineX(k2), y(1), barLineX(k2), y(E.STRING_COUNT), 'gtr-tab-bar');
    }
    if (fb.capo > 0) {
      g += '<text x="' + n2(TB.padX) + '" y="' + n2(TB.padY - ABOVE + 2) +
           '" class="gtr-tab-capo" text-anchor="start">Capo ' + fb.capo + '</text>';
    }

    /* How many notes share each beat, so a chord can be told from a line. */
    var beatCount = {};
    notes.forEach(function (nte) { beatCount[nte.beat] = (beatCount[nte.beat] || 0) + 1; });

    notes.forEach(function (nte, i) {
      var shown = E.displayFret(nte, fb);
      /* A backing rectangle so the stave line does not run through the digit. */
      var tx = x(nte.beat), ty = y(nte.string);
      var half = digitHalf(shown);
      var inner = '<rect x="' + n2(tx - half) + '" y="' + n2(ty - TB.fontSize / 2) +
           '" width="' + n2(half * 2) + '" height="' + n2(TB.fontSize) + '" class="gtr-tab-clear" />';
      inner += text(tx, ty, shown, 'gtr-tab-fret');
      /* Where the fingering letter goes depends on whether the beat is a chord.
         Above the stave is right for a single line and wrong for a chord: four
         notes at one beat put four letters at one point, and "p i m a" came out
         as a single unreadable smudge. In a chord each letter sits beside its
         own note instead, which is where a chord book puts it anyway. */
      if (nte.finger && nte.hand === 'p') {
        if (beatCount[nte.beat] > 1) {
          /* Beside its own note, and ALWAYS on the same side.
             Tucked to the left it landed on the bar line for anything on a
             downbeat — which is exactly where a chord sits. Choosing a side per
             note fixed that and produced a worse fault: on a row carrying a
             chord note at two consecutive beats, the right-hand label of one
             and the left-hand label of the next met in the middle. One side for
             every label is the only arrangement with no pair of cases in it. */
          inner += textStart(tx + half + 3, ty, nte.finger, 'gtr-tab-pima');
        } else {
          inner += text(tx, aboveY, nte.finger, 'gtr-tab-pima');
        }
      }
      if (nte.tech === 'tap') inner += text(tx, aboveY, 'T', 'gtr-tab-tech');
      g += noteGroup(i, inner);
    });

    /* TWO MARKS BELOW THE STAVE, both DERIVED from the thing they claim.
       An accent is drawn because the note is genuinely struck harder — the same
       `level` the transport multiplies its gain by — and a stopped note is
       drawn because its duration is genuinely short. Neither is a second,
       separate assertion that can drift out of step with the sound, which is
       the disagreement this module has had to fix twice already.

       ONE MARK PER BEAT, not per note. The mark row is a single line under the
       stave, so an accented melody note and a stopped bass at the same instant
       put two glyphs at one point — which is the four-letters-at-one-point
       fault again, in a row added later and with nothing looking at it. What a
       beat is marked with is a property of the beat. */
    var marks = {};
    notes.forEach(function (nte) {
      var m = marks[nte.beat] || { accent: false, damp: false };
      if (nte.level >= ACCENT_LEVEL) m.accent = true;
      if (nte.tech === 'damp') m.damp = true;
      marks[nte.beat] = m;
    });
    Object.keys(marks).forEach(function (beat) {
      var m = marks[beat];
      var glyph = (m.accent ? '>' : '') + (m.damp ? '\u2715' : '');
      if (glyph) g += text(x(Number(beat)), markY, glyph, 'gtr-tab-mark');
    });

    return svgWrap(w, h, opts.title || 'Tablature', 'gtr-tab', g);
  }

  return {
    chordBox: chordBox,
    neckDiagram: neckDiagram,
    tab: tab,
    /* exported for the checkers and for tests */
    ACCENT_LEVEL: ACCENT_LEVEL,
    GEOMETRY: { CB: CB, NK: NK, TB: TB }
  };
}));
