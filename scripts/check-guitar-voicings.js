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
