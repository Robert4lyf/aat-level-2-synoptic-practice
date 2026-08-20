#!/usr/bin/env node
/**
 * Every chord voicing is correct IN THE TUNING IT IS SHOWN FOR.
 *
 * This is the third time this class of defect has come up, and the first time
 * it is being gated rather than fixed.
 *
 *   Step 6: the chord panel drew standard-tuning shapes in DADGAD. Fixed by
 *           adding findVoicing(), which searches the fretboard.
 *   Step 6: reported again, because the first fix corrected the instance the
 *           report named and not the class behind it.
 *   Now:    reported a third time — this time against code that is right. The
 *           shapes do change, and the panel simply had no way of showing that
 *           it had taken the tuning into account.
 *
 * A shape is a set of (string, fret) pairs. It carries no evidence about which
 * tuning it belongs to, so a wrong one looks exactly like a right one. The only
 * thing that distinguishes them is what they SOUND, which is what this checks:
 * take every voicing the app can display, sound it on its own fretboard, and
 * compare the pitch classes against the chord's definition. A standard-tuning
 * shape sitting in DADGAD fails immediately — the pitches come out wrong even
 * though the fingering looks plausible.
 *
 * Swept across every tuning, every chord type, every root and several capo
 * positions, because the failure was never in the case anyone looked at.
 *
 * Run: node scripts/check-guitar-voicings.js   (exit 1 on any failure)
 */

'use strict';

const E = require('../guitar-engine.js');

const RED = '\x1b[31m', GREEN = '\x1b[32m', DIM = '\x1b[2m', BOLD = '\x1b[1m', RESET = '\x1b[0m';
const errors = [];
const notes = [];

const TUNINGS = Object.keys(E.TUNINGS);
const CHORDS = Object.keys(E.CHORDS);
const CAPOS = [0, 2, 5, 7];
const HANDS = ['right', 'left'];

let checked = 0, missing = 0;
const wrong = [];
const perTuning = {};

for (const tuning of TUNINGS) {
  perTuning[tuning] = { checked: 0, missing: 0 };
  for (const capo of CAPOS) {
    for (const handed of HANDS) {
      const fb = E.makeFretboard({ tuning, capo, handed });
      for (const chordId of CHORDS) {
        for (let root = 0; root < 12; root++) {
          const v = E.findVoicing(chordId, root, fb);
          if (!v) { missing++; perTuning[tuning].missing++; continue; }
          checked++; perTuning[tuning].checked++;

          /* What it should sound, as pitch classes. */
          const want = new Set(E.CHORDS[chordId].steps.map(st => (root + st) % 12));
          /* What it does sound, on THIS fretboard. */
          const got = new Set();
          let unplayable = null;
          for (const n of v.notes) {
            if (!E.isPlayable(n, fb)) unplayable = n;
            const midi = E.soundingMidi(n, fb);
            if (midi === null) { unplayable = n; continue; }
            got.add(((midi % 12) + 12) % 12);
          }

          const extra = [...got].filter(p => !want.has(p));
          const absent = [...want].filter(p => !got.has(p));
          if (extra.length || absent.length || unplayable) {
            wrong.push({
              tuning, capo, handed, chordId, root,
              name: E.chordName(chordId, root),
              shape: v.notes.map(n => `${n.string}f${n.fret}`).join(' '),
              extra: extra.map(p => E.midiToName(p)),
              absent: absent.map(p => E.midiToName(p)),
              unplayable
            });
          }
        }
      }
    }
  }
}

if (!checked) {
  errors.push('no voicings were checked at all — this gate is asserting nothing.');
}

if (wrong.length) {
  errors.push(`${wrong.length} of ${checked} voicings do not sound their own chord in their own tuning:`);
  for (const w of wrong.slice(0, 12)) {
    const why = w.unplayable
      ? `uses an unplayable position (string ${w.unplayable.string}, fret ${w.unplayable.fret})`
      : [w.absent.length ? `missing ${w.absent.join('/')}` : '',
         w.extra.length ? `sounds ${w.extra.join('/')} which is not in the chord` : ''
        ].filter(Boolean).join(', ');
    errors.push(`    ${w.name} (${w.chordId}) in ${w.tuning}, capo ${w.capo}, ${w.handed}-handed: ` +
                `${w.shape} — ${why}`);
  }
  if (wrong.length > 12) errors.push(`    ...and ${wrong.length - 12} more.`);
  errors.push('  A shape carries no evidence of its tuning. Sounding it is the only way to tell.');
}

/* ── The shapes a guitarist actually plays ─────────────────────────────────
   Everything above proves a voicing sounds the right notes. It cannot say
   whether anyone would choose to play it, and for a while nobody was: D major
   in standard tuning came back as 10-9-7-7-7-10 — correct, six strings, root in
   the bass, and nothing like a D chord. The old scoring paid 12 points a string
   and stopped as soon as anything cleared 100, so the first full-width shape up
   the neck won and the open position two frets from the nut was never reached.

   These are the open-position shapes as they are taught, written from outside
   the code — a chord book, not this engine's opinion. That independence is the
   point: a table generated from findVoicing would agree with it by
   construction and catch nothing.

   Only chords with a genuine open-position shape are listed. F is deliberately
   absent: its conventional fingering is a barre, so there is no open shape to
   assert and pinning one would be inventing a convention rather than checking
   one. */
const OPEN_SHAPES = {
  'maj 0':  'x32010',   // C
  'maj 2':  'xx0232',   // D
  'maj 4':  '022100',   // E
  'maj 7':  '320003',   // G
  'maj 9':  'x02220',   // A
  'min 2':  'xx0231',   // Dm
  'min 4':  '022000',   // Em
  'min 9':  'x02210',   // Am
  'dom7 2': 'xx0212',   // D7
  'dom7 4': '020100',   // E7
  'dom7 7': '320001',   // G7
  'dom7 9': 'x02020',   // A7
  'sus4 2': 'xx0233',   // Dsus4
  'sus4 9': 'x00230'    // Asus4
};

(function () {
  const fb = E.makeFretboard({ tuning: 'standard', capo: 0, handed: 'right' });
  const asShape = (v) => {
    if (!v) return null;
    const by = {};
    v.notes.forEach(n => { by[n.string] = n.fret; });
    let out = '';
    for (let st = 6; st >= 1; st--) out += (by[st] === undefined ? 'x' : by[st]);
    return out;
  };
  const wrongShapes = [];
  for (const [key, want] of Object.entries(OPEN_SHAPES)) {
    const [chordId, root] = key.split(' ');
    const got = asShape(E.findVoicing(chordId, Number(root), fb));
    if (got !== want) wrongShapes.push({ name: E.chordName(chordId, Number(root)), want, got });
  }
  if (wrongShapes.length) {
    errors.push(`${wrongShapes.length} of ${Object.keys(OPEN_SHAPES).length} open-position chords in ` +
                `standard tuning are not the shape they are taught as:`);
    for (const w of wrongShapes) {
      errors.push(`    ${String(w.name).padEnd(6)} expected ${w.want}, got ${w.got}`);
    }
    errors.push('  Correct notes are not enough: nobody learning this will play a shape they do not recognise.');
  } else {
    notes.push(`All ${Object.keys(OPEN_SHAPES).length} open-position chords match the shapes they are taught as.`);
  }
})();

/* ── Nothing runs away up the neck ────────────────────────────────────────
   A first version of this asserted that a voicing should sit at the lowest
   position where any shape exists. That rule is false, and writing it down was
   the mistake: it flagged D#m in standard tuning as a defect for choosing the
   barre at the eleventh fret over a cramped four-finger shape at the first —
   and the barre is how anyone actually plays E-flat minor. Chords with no open
   shape are SUPPOSED to be found up the neck. Had that gate been kept, it would
   have forced the engine to get worse to satisfy it.

   What is true is weaker and still worth holding: nothing should be found past
   the twelfth fret, where the neck meets the body and the fingerboard is
   already awkward. Every legitimate barre position for a chord in any of these
   tunings is below that, so anything beyond it is a search that has lost track
   of where the hand is rather than a shape someone chose.

   The narrow, real version of the complaint — a chord with a conventional open
   shape must come back as that shape — is the table above, and that is the one
   that catches the defect this file was written for. */
(function () {
  const tooHigh = [];
  for (const tuning of TUNINGS) {
    const fb = E.makeFretboard({ tuning, capo: 0, handed: 'right' });
    for (const chordId of CHORDS) {
      for (let root = 0; root < 12; root++) {
        const v = E.findVoicing(chordId, root, fb);
        if (!v) continue;
        const frets = v.notes.map(n => n.fret).filter(f => f > 0);
        if (!frets.length) continue;
        const lowest = Math.min(...frets);
        if (lowest > 12) {
          tooHigh.push(`${E.chordName(chordId, root)} in ${tuning} starts at fret ${lowest} ` +
                       `(${v.notes.map(n => n.string + 'f' + n.fret).join(' ')})`);
        }
      }
    }
  }
  if (tooHigh.length) {
    errors.push(`${tooHigh.length} voicing(s) sit past the twelfth fret:`);
    tooHigh.slice(0, 5).forEach(t => errors.push(`    ${t}`));
  } else {
    notes.push('No voicing sits past the twelfth fret.');
  }
})();

/* ── And every voicing anywhere fits a hand ───────────────────────────────
   Four fingers, no thumb. Enforced in findVoicing; asserted here so removing
   the enforcement fails loudly rather than quietly producing shapes that are
   correct on paper and impossible in the hand. */
(function () {
  const tooHard = [];
  let worst = 0;
  for (const tuning of TUNINGS) {
    for (const capo of CAPOS) {
      const fb = E.makeFretboard({ tuning, capo, handed: 'right' });
      for (const chordId of CHORDS) {
        for (let root = 0; root < 12; root++) {
          const v = E.findVoicing(chordId, root, fb);
          if (!v) continue;
          const fretted = v.notes.filter(n => n.fret > capo);
          let fingers = 0;
          if (fretted.length) {
            const minF = Math.min(...fretted.map(n => n.fret));
            const atMin = fretted.filter(n => n.fret === minF).length;
            fingers = atMin >= 2 ? 1 + (fretted.length - atMin) : fretted.length;
          }
          worst = Math.max(worst, fingers);
          if (fingers > 4) {
            tooHard.push(`${E.chordName(chordId, root)} in ${tuning} capo ${capo} needs ${fingers} fingers ` +
                         `(${v.notes.map(n => n.string + 'f' + n.fret).join(' ')})`);
          }
        }
      }
    }
  }
  if (tooHard.length) {
    errors.push(`${tooHard.length} voicing(s) need more than four fingers:`);
    tooHard.slice(0, 5).forEach(t => errors.push(`    ${t}`));
  } else {
    notes.push(`No voicing anywhere needs more than ${worst} fingers.`);
  }
})();

/* Handedness must not change which notes sound — it is a drawing concern. It
   has its own checker, but a voicing that differed between hands would be a
   hole in exactly the seam this file is standing on. */
for (const tuning of TUNINGS) {
  const r = E.makeFretboard({ tuning, capo: 0, handed: 'right' });
  const l = E.makeFretboard({ tuning, capo: 0, handed: 'left' });
  for (const chordId of CHORDS) {
    for (let root = 0; root < 12; root++) {
      const a = E.findVoicing(chordId, root, r);
      const b = E.findVoicing(chordId, root, l);
      const sig = v => v ? v.notes.map(n => `${n.string}f${n.fret}`).sort().join(',') : 'none';
      if (sig(a) !== sig(b)) {
        errors.push(`${E.chordName(chordId, root)} in ${tuning} differs between hands: ` +
                    `${sig(a)} vs ${sig(b)}. Handedness mirrors the drawing, never the notes.`);
      }
    }
  }
}

notes.push(`${checked} voicings sounded across ${TUNINGS.length} tunings × ${CHORDS.length} chord types ` +
           `× 12 roots × ${CAPOS.length} capo positions × ${HANDS.length} hands.`);
if (missing) {
  notes.push(`${missing} combination(s) had no playable voicing at all — the panel omits those, ` +
             `which is a real answer rather than a failure.`);
}
for (const t of TUNINGS) {
  notes.push(`  ${t.padEnd(9)} ${String(perTuning[t].checked).padStart(4)} voicings` +
             (perTuning[t].missing ? `, ${perTuning[t].missing} with no shape` : ''));
}

console.log(`${BOLD}guitar chord voicings${RESET}\n`);
notes.forEach(n => console.log(`  ${DIM}${n}${RESET}`));
console.log('');
if (errors.length) {
  errors.forEach(e => console.log(e.startsWith('    ') ? `  ${DIM}${e}${RESET}` : `  ${RED}✗${RESET}  ${e}`));
  console.log(`\n${RED}${BOLD}${errors.length} failure(s).${RESET}\n`);
  process.exit(1);
}
console.log(`  ${GREEN}✓  every voicing sounds its own chord in its own tuning${RESET}\n`);
