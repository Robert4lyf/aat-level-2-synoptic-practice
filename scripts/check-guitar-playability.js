#!/usr/bin/env node
/**
 * Is what the generator emits actually playable?
 *
 * This is the guitar equivalent of check-question-integrity.js: a trial balance
 * either balances or it does not, and a fingering is either reachable or it is
 * not. The generator will happily produce a valid-looking tuple that asks for
 * two notes on one string at the same instant, or a note behind the capo, or a
 * stretch nobody has the hand for. Those must fail the build, not a practice
 * session.
 *
 * WHY NOT SWEEP EVERYTHING
 *
 * The parameter space is 14 scales × 12 roots × 3 position kinds × 7 indices ×
 * 6 tunings × 8 capo positions × 8 sequences × 2 directions × 5 rhythms. That
 * is several million tuples, and this runs on every commit.
 *
 * So it uses ALL-PAIRS (pairwise) coverage: a case set in which every pair of
 * values from every pair of dimensions appears at least once. Interaction bugs
 * are almost always two-dimensional — this scale in that tuning, this position
 * under that capo — and pairwise catches those in a couple of hundred cases
 * rather than millions. On top of it, two small high-risk sets are swept
 * exhaustively: every tuning × capo × root, and every scale × position.
 *
 * EXPECTED FAULTS
 *
 * Some tuples are legitimately impossible — three-notes-per-string is not
 * defined for a five-note scale — and the generator says so rather than
 * inventing something. Those are matched against a whitelist of reasons and
 * counted, not failed. Any other fault, and any exercise that comes back
 * playable-but-wrong, fails the build.
 *
 * Run: node scripts/check-guitar-playability.js   (exit 1 on any failure)
 */

'use strict';

const path = require('path');
const E = require(path.join(__dirname, '..', 'guitar-engine.js'));

const RED = '\x1b[31m', GREEN = '\x1b[32m', DIM = '\x1b[2m', BOLD = '\x1b[1m', RESET = '\x1b[0m';
const errors = [];
const notes = [];
let cases = 0, expectedFaults = 0;

/* Faults that mean "this combination does not exist", not "this is broken". */
const LEGITIMATE = [
  /positions are not defined for/,
  /no playable position/
];

/* Reach, in frets, from the lowest to the highest fret in one shape. A box is a
   hand position and cannot exceed the hand; three-notes-per-string is wider by
   design; a single-string run shifts up the neck and has no limit. */
/* Reach, and what it actually constrains.
   Measuring max-fret minus min-fret across a whole shape is wrong: a position
   CLIMBS the neck, drifting upward a fret or two per string by design, so the
   total span says nothing about whether a hand can play it. An earlier draft
   did exactly that and failed 193 perfectly ordinary shapes.

   What a hand actually constrains is two things:
     - the span on ANY ONE string, since you do not shift mid-string;
     - the DRIFT between consecutive strings, since a large jump is a position
       shift and needs to be marked as one rather than smuggled into a shape.

   The observed worst cases across every scale, tuning and capo are 4 and 5
   respectively — 5-7-9 on one string is a standard three-note-per-string
   stretch. The limits sit just above that, and the self-test proves they still
   fire rather than being set wherever the data happened to land. */
function spanLimit(lowestFret) { return lowestFret >= 12 ? 4 : 5; }
const DRIFT_LIMIT = 5;

/* ── All-pairs (pairwise) case generation ─────────────────────────────────────
   Greedy: build each case by choosing, dimension by dimension, the value that
   covers the most pairs not yet covered. Terminates when every pair is covered,
   with a guard against a case that covers nothing. */
function allPairs(dims) {
  const names = Object.keys(dims);
  const key = (i, a, j, b) => `${i}:${String(a)}|${j}:${String(b)}`;
  const pending = new Set();
  for (let i = 0; i < names.length; i++) {
    for (let j = i + 1; j < names.length; j++) {
      for (const a of dims[names[i]]) for (const b of dims[names[j]]) pending.add(key(i, a, j, b));
    }
  }
  const out = [];
  while (pending.size) {
    const chosen = [];
    for (let i = 0; i < names.length; i++) {
      let best = null, bestCount = -1;
      for (const v of dims[names[i]]) {
        let c = 0;
        for (let j = 0; j < i; j++) if (pending.has(key(j, chosen[j], i, v))) c++;
        for (let j = i + 1; j < names.length; j++) {
          for (const w of dims[names[j]]) if (pending.has(key(i, v, j, w))) c++;
        }
        if (c > bestCount) { bestCount = c; best = v; }
      }
      chosen.push(best);
    }
    let removed = 0;
    for (let i = 0; i < names.length; i++) {
      for (let j = i + 1; j < names.length; j++) {
        if (pending.delete(key(i, chosen[i], j, chosen[j]))) removed++;
      }
    }
    const c = {};
    names.forEach((n, i) => { c[n] = chosen[i]; });
    out.push(c);
    if (!removed) break;   // guard: no progress, stop rather than loop forever
  }
  return out;
}

/* ── The actual rules ────────────────────────────────────────────────────────
   Extracted from the sweep so they can be exercised against deliberately bad
   input in selfTest() below. A rule the generator cannot currently violate is
   still a rule — rule 1 in particular guards authored pieces and any future
   position kind, and the box anchor arithmetic means the generator cannot trip
   it today. Without the self-test that assertion would sit there untested and
   nobody would know. */
function faultsIn(ns, spec, fb) {
  const found = [];

  /* 1. Every note reachable on this fretboard. */
  for (const n of ns) {
    const f = E.noteFault(n, fb);
    if (f) { found.push(f); return found; }
  }

  /* 2. No two notes sounding on the same string at the same instant — one
        string cannot play two pitches at once, and a generator that emits it
        produces silence or a wrong note, never both pitches. */
  const atBeat = new Map();
  for (const n of ns) {
    const k = `${n.beat}|${n.string}`;
    if (atBeat.has(k)) { found.push(`two notes on string ${n.string} at beat ${n.beat}`); return found; }
    atBeat.set(k, true);
  }

  /* 3. Hand span within reach for the position kind. */
  const kind = spec.positionKind || 'box';
  if (kind !== 'string') {          // a single-string run shifts freely
    const byString = new Map();
    for (const n of ns) {
      if (!byString.has(n.string)) byString.set(n.string, []);
      byString.get(n.string).push(n.fret);
    }
    for (const [str, fr] of byString) {
      const lo = Math.min(...fr), span = Math.max(...fr) - lo;
      const limit = spanLimit(lo);
      if (span > limit) {
        found.push(`string ${str} spans ${span} frets from fret ${lo}, beyond the ${limit} a hand reaches there`);
        return found;
      }
    }
    for (let str = 6; str > 1; str--) {
      if (!byString.has(str) || !byString.has(str - 1)) continue;
      const drift = Math.abs(Math.min(...byString.get(str - 1)) - Math.min(...byString.get(str)));
      if (drift > DRIFT_LIMIT) {
        found.push(`the shape jumps ${drift} frets between strings ${str} and ${str - 1} — that is a position shift, not a shape`);
        return found;
      }
    }
  }

  /* 4. Beats never run backwards. NON-decreasing, not strictly increasing:
        several notes share a beat whenever a chord is struck, and rule 2 is
        what makes that legal only across different strings.

        An earlier draft required strictly increasing beats, which passed
        everything the monophonic generator emits and would have rejected every
        chord, chord box and two-voice tab arriving in later steps. Mutation
        testing surfaced it — rule 2 could be disabled with no effect, because
        rule 4 was catching its cases first and for the wrong reason. */
  for (let i = 1; i < ns.length; i++) {
    if (ns[i].beat < ns[i - 1].beat) {
      found.push(`beat ${ns[i].beat} runs backwards from ${ns[i - 1].beat}`); return found;
    }
  }

  /* 5. Every note belongs to the scale it claims. A generator that drifts off
        the scale is worse than one that fails, because it teaches the wrong
        notes convincingly.

        Computed here from the raw tuning table and step list rather than by
        calling isScaleTone() and soundingMidi(), which is what the generator
        itself uses to pick the notes. Asking the engine to confirm its own
        filter would pass whatever the filter did — the same self-comparison
        that made an earlier gate vacuous (review log 3.2). */
  const openMidis = E.TUNINGS[fb.tuning].midi;
  const wanted = E.SCALES[spec.scaleId].steps.map(s => ((spec.rootPc + s) % 12 + 12) % 12);
  for (const n of ns) {
    const pc = (((openMidis[6 - n.string] + n.fret) % 12) + 12) % 12;
    if (wanted.indexOf(pc) === -1) {
      found.push(`string ${n.string} fret ${n.fret} sounds ${E.midiToName(pc)}, not in ${spec.scaleId} on root ${E.midiToName(spec.rootPc)}`);
      return found;
    }
  }
  return found;
}

function inspect(spec, label) {
  cases++;
  const res = E.generateExercise(spec);
  if (res.fault) {
    if (LEGITIMATE.some(re => re.test(res.fault))) { expectedFaults++; return; }
    errors.push(`${label}: unexpected fault — ${res.fault}`);
    return;
  }
  const ns = res.notes;
  if (!ns || !ns.length) { errors.push(`${label}: produced no notes and no fault`); return; }
  const fb = E.makeFretboard({ tuning: spec.tuning, capo: spec.capo });
  faultsIn(ns, spec, fb).forEach(f => errors.push(`${label}: ${f}`));

  /* 6. The key must be stable and free of rendering choices. */
  const k1 = E.exerciseKey(res.meta);
  const mirrored = E.generateExercise(Object.assign({}, spec, { handed: 'left' }));
  if (!mirrored.fault && E.exerciseKey(mirrored.meta) !== k1) {
    errors.push(`${label}: exercise key changes with handedness`);
  }
}

/* ── Self-test: do the rules actually bite? ──────────────────────────────────
   Mutation testing found that removing the capo guard from positionNotes()
   changed nothing, because boxAnchor() already starts at max(0, capo) and so
   the window can never reach behind it. Rule 1 was therefore real but
   unreachable — an assertion no case could fail, which is worth exactly
   nothing until something proves otherwise.

   These feed hand-made bad exercises straight into faultsIn(). They keep every
   rule live regardless of whether the generator can currently produce a
   violation, which matters because authored pieces and future position kinds
   will not have the anchor arithmetic protecting them. */
function selfTest() {
  const fb = E.makeFretboard({ tuning: 'standard', capo: 5 });
  const open = E.makeFretboard({ tuning: 'standard', capo: 0 });
  const spec = { scaleId: 'minPent', rootPc: 9, positionKind: 'box' };
  const bite = (label, ns, sp, board) => {
    cases++;
    const f = faultsIn(ns, sp || spec, board || open);
    if (!f.length) errors.push(`SELF-TEST: rule did not fire for ${label}`);
  };
  const pass = (label, ns, sp, board) => {
    cases++;
    const f = faultsIn(ns, sp || spec, board || open);
    if (f.length) errors.push(`SELF-TEST: rule fired wrongly on ${label} — ${f[0]}`);
  };

  /* A known-good A minor pentatonic fragment must NOT trip anything. */
  pass('a clean A minor pentatonic fragment', [
    { string: 6, fret: 5, beat: 0, dur: 0.5 },
    { string: 6, fret: 8, beat: 0.5, dur: 0.5 },
    { string: 5, fret: 5, beat: 1, dur: 0.5 }
  ]);

  /* 1. Behind the capo. */
  bite('a note behind the capo', [{ string: 1, fret: 2, beat: 0, dur: 0.5 }], spec, fb);
  bite('an open string behind a capo', [{ string: 1, fret: 0, beat: 0, dur: 0.5 }], spec, fb);
  bite('a fret off the end of the neck', [{ string: 1, fret: 40, beat: 0, dur: 0.5 }]);
  bite('a seventh string', [{ string: 7, fret: 5, beat: 0, dur: 0.5 }]);

  /* 2. Two notes on one string at one instant. */
  bite('two notes on one string at one beat', [
    { string: 5, fret: 5, beat: 0, dur: 0.5 },
    { string: 5, fret: 7, beat: 0, dur: 0.5 }
  ]);

  /* 3. A stretch past the hand, on one string. */
  bite('a twelve-fret stretch on one string', [
    { string: 6, fret: 5, beat: 0, dur: 0.5 },
    { string: 6, fret: 17, beat: 0.5, dur: 0.5 }
  ]);
  bite('a six-fret stretch high on the neck', [
    { string: 6, fret: 14, beat: 0, dur: 0.5 },
    { string: 6, fret: 20, beat: 0.5, dur: 0.5 }
  ]);
  /* …and a shape that leaps between strings is a position shift, not a shape. */
  bite('an eight-fret jump between strings', [
    { string: 6, fret: 5, beat: 0, dur: 0.5 },
    { string: 5, fret: 13, beat: 0.5, dur: 0.5 }
  ]);
  /* …but the same span is fine on one string, which shifts. */
  pass('the same span on a single string', [
    { string: 6, fret: 5, beat: 0, dur: 0.5 },
    { string: 6, fret: 17, beat: 0.5, dur: 0.5 }
  ], { scaleId: 'minPent', rootPc: 9, positionKind: 'string' });

  /* A chord — several notes on one beat, different strings — must be ALLOWED.
     Rule 4 forbidding it would have rejected every chord box and two-voice tab. */
  pass('a three-note chord on one beat', [
    { string: 5, fret: 7, beat: 0, dur: 1 },
    { string: 4, fret: 7, beat: 0, dur: 1 },
    { string: 3, fret: 5, beat: 0, dur: 1 }
  ]);

  /* 4. Beats that run backwards. Stalling is legal; reversing is not. */
  bite('beats that run backwards', [
    { string: 6, fret: 5, beat: 1, dur: 0.5 },
    { string: 5, fret: 5, beat: 0.5, dur: 0.5 }
  ]);

  /* 5. A note outside the claimed scale. A♭ is not in A minor pentatonic. */
  bite('a note off the scale', [{ string: 6, fret: 4, beat: 0, dur: 0.5 }]);
}
selfTest();
notes.push(`Self-test: every rule shown to fire on hand-made bad input, and to stay quiet on good.`);

/* ── Sweep 1: all-pairs across the whole space ───────────────────────────── */
const DIMS = {
  scaleId:       Object.keys(E.SCALES),
  rootPc:        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  positionKind:  ['box', 'string'],
  positionIndex: [0, 1, 2, 3, 4, 5, 6],
  tuning:        Object.keys(E.TUNINGS),
  capo:          [0, 1, 2, 3, 4, 5, 6, 7],
  sequence:      Object.keys(E.SEQUENCES),
  descending:    [false, true],
  rhythm:        Object.keys(E.RHYTHMS)
};
const pairCases = allPairs(DIMS);
pairCases.forEach((c, i) => inspect(c, `pairwise#${i} ${c.scaleId}/${c.rootPc}/${c.positionKind}${c.positionIndex}/${c.tuning}+${c.capo}/${c.sequence}${c.descending ? '↓' : '↑'}`));
notes.push(`All-pairs: ${pairCases.length} cases covering every pair of values across ${Object.keys(DIMS).length} dimensions.`);

/* ── Sweep 2: every tuning × capo × root, exhaustively ────────────────────────
   The combination most likely to put a shape behind the capo or off the neck. */
let s2 = 0;
Object.keys(E.TUNINGS).forEach(tuning => {
  for (let capo = 0; capo <= 7; capo++) {
    for (let rootPc = 0; rootPc < 12; rootPc++) {
      inspect({ scaleId: 'minPent', rootPc, positionKind: 'box', positionIndex: 0,
                tuning, capo, sequence: 'straight', rhythm: 'eighths' },
              `tuning×capo×root ${tuning}+${capo} root ${rootPc}`);
      s2++;
    }
  }
});
notes.push(`Tuning × capo × root: ${s2} cases, exhaustive.`);

/* ── Sweep 3: every scale × every position of every kind ─────────────────── */
let s3 = 0;
Object.keys(E.SCALES).forEach(scaleId => {
  ['box', 'string'].forEach(kind => {
    const count = E.positionCount(scaleId, kind);
    for (let i = 0; i < Math.max(count, 1); i++) {
      inspect({ scaleId, rootPc: 9, positionKind: kind, positionIndex: i,
                tuning: 'standard', capo: 0, sequence: 'straight', rhythm: 'eighths' },
              `scale×position ${scaleId} ${kind}${i}`);
      s3++;
    }
  });
});
notes.push(`Scale × position: ${s3} cases, exhaustive.`);

/* ── Sweep 4: every sequence against a known shape ───────────────────────── */
let s4 = 0;
Object.keys(E.SEQUENCES).forEach(sequence => {
  [false, true].forEach(descending => {
    Object.keys(E.RHYTHMS).forEach(rhythm => {
      inspect({ scaleId: 'dorian', rootPc: 9, positionKind: 'box', positionIndex: 0,
                tuning: 'standard', capo: 0, sequence, descending, rhythm },
              `sequence ${sequence}${descending ? '↓' : '↑'} ${rhythm}`);
      s4++;
    });
  });
});
notes.push(`Sequence × direction × rhythm: ${s4} cases, exhaustive.`);

/* ── Vacuity floor ───────────────────────────────────────────────────────────
   Without this the whole gate can pass while inspecting nothing. Making
   positionNotes() return null unconditionally turns every case into a
   "legitimately impossible combination", and the run reports 1,000-odd skips
   and exits 0. A checker that congratulates itself for examining nothing is
   worse than no checker, because it is believed.

   So: a floor on real inspections, and a ceiling on the proportion skipped. */
const inspected = cases - expectedFaults;
const skipRatio = cases ? expectedFaults / cases : 1;
if (inspected < 900) {
  errors.push(`VACUITY: only ${inspected} exercises were actually inspected, out of ${cases} cases. ` +
              `The sweep is not testing what it claims.`);
}
if (skipRatio > 0.05) {
  errors.push(`VACUITY: ${(skipRatio * 100).toFixed(1)}% of cases were skipped as impossible, above the 5% ceiling. ` +
              `Either the generator has stopped producing exercises, or the whitelist is too broad.`);
}
notes.push(`Vacuity floor: ${inspected} exercises genuinely inspected (${(skipRatio * 100).toFixed(1)}% skipped, ceiling 5%).`);

/* ── Report ──────────────────────────────────────────────────────────────── */
console.log(`${BOLD}guitar exercise playability${RESET}\n`);
notes.forEach(n => console.log(`  ${DIM}${n}${RESET}`));
console.log(`  ${DIM}${cases} exercises inspected · ${expectedFaults} legitimately impossible combinations skipped.${RESET}`);
console.log('');
if (errors.length) {
  errors.slice(0, 25).forEach(e => console.log(`  ${RED}✗${RESET}  ${e}`));
  if (errors.length > 25) console.log(`  ${DIM}… and ${errors.length - 25} more${RESET}`);
  console.log(`\n${RED}${BOLD}${errors.length} unplayable exercise(s).${RESET}\n`);
  process.exit(1);
}
console.log(`  ${GREEN}✓  every generated exercise is playable${RESET}\n`);
