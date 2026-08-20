#!/usr/bin/env node
/**
 * Left-handed mode, enforced rather than intended.
 *
 * A handedness toggle is the kind of feature that gets 90% done and then
 * embarrasses itself in one corner — a chord box that never flipped, a lesson
 * that says "your right hand", a tap target computed locally by someone who
 * reasoned about the axis and got it backwards. None of those show up in a
 * screenshot of the case you happened to look at.
 *
 * So the rules are structural, and each exists because of a specific way this
 * has already gone wrong once:
 *
 *   1. `handed` is read in EXACTLY ONE FILE, guitar-engine.js. An earlier draft
 *      of this checker grepped for arithmetic on `.string`/`.fret` instead,
 *      which does not work: the axis functions take a plain number and touch
 *      neither property, while soundingMidi, displayFret and noteFault touch
 *      both and are entirely handedness-free. That rule would have failed the
 *      engine and never inspected the axes. Grepping for `handed` is the actual
 *      invariant, and it is one line to check.
 *
 *   2. Renderers call the ELEMENT HELPERS, never stringAxis/fretAxis directly.
 *      Passing the reversal boolean by hand is what inverted a chord box once
 *      already: the comment claimed index 0 was both the top tab line and the
 *      rightmost chord-box string, which cannot both be true.
 *
 *   3. No hardcoded colours in the renderer, or dark mode is a second bug.
 *
 *   4. Mirroring flips exactly what it should and nothing else, asserted by
 *      rendering both handednesses and diffing the geometry.
 *
 *   5. Lesson prose says "fretting hand" and "picking hand", never left or
 *      right, with at most ONE lesson allowed to opt out — the one about
 *      left-handed instruments, which cannot be written without the words.
 *
 * Run: node scripts/check-guitar-handedness.js   (exit 1 on any failure)
 */

'use strict';

const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const E = require(path.join(ROOT, 'guitar-engine.js'));
const R = require(path.join(ROOT, 'guitar-render.js'));

const RED = '\x1b[31m', GREEN = '\x1b[32m', DIM = '\x1b[2m', BOLD = '\x1b[1m', RESET = '\x1b[0m';
const errors = [];
const notes = [];

const readIf = f => (fs.existsSync(path.join(ROOT, f)) ? fs.readFileSync(path.join(ROOT, f), 'utf8') : null);

/* Comments are where the rules are explained, so they legitimately contain the
   words the rules ban. Strip them before grepping for code violations. */
function stripComments(src) {
  return src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1');
}

/* ── 1. `handed` is read in one file only ────────────────────────────────── */
const GUITAR_FILES = fs.readdirSync(ROOT).filter(f => /^guitar-.*\.js$/.test(f));
notes.push(`Guitar source files: ${GUITAR_FILES.join(', ')}`);

let handedReaders = [];
GUITAR_FILES.forEach(f => {
  const code = stripComments(readIf(f) || '');
  if (/\bhanded\b/.test(code)) handedReaders.push(f);
});
if (handedReaders.length !== 1 || handedReaders[0] !== 'guitar-engine.js') {
  errors.push(`\`handed\` must be read only in guitar-engine.js, but appears in: ${handedReaders.join(', ') || 'nowhere'}. ` +
              `Anything needing a handedness decision asks the engine for it (see tabMirror).`);
} else {
  notes.push('`handed` is read in guitar-engine.js and nowhere else.');
}

/* ── 2. Renderers use the element helpers, not the raw axes ──────────────── */
{
  const code = stripComments(readIf('guitar-render.js') || '');
  ['stringAxis', 'fretAxis'].forEach(fn => {
    if (new RegExp('\\bE\\.' + fn + '\\s*\\(').test(code)) {
      errors.push(`guitar-render.js calls E.${fn}() directly. Use the element helpers ` +
                  `(tabStringY, chordBoxStringX, neckStringY, neckFretX) — they own the per-element ` +
                  `reversal so no caller has to get the boolean right.`);
    }
  });
  const helpers = ['tabStringY', 'chordBoxStringX', 'neckStringY', 'neckFretX'];
  const used = helpers.filter(h => new RegExp('\\bE\\.' + h + '\\s*\\(').test(code));
  if (used.length !== helpers.length) {
    errors.push(`guitar-render.js does not use ${helpers.filter(h => !used.includes(h)).join(', ')} — ` +
                `either an element is computing its own coordinates, or one is not rendered yet.`);
  } else {
    notes.push('All four element helpers are used; neither raw axis is called directly.');
  }
}

/* ── 3. No hardcoded colour in the renderer ──────────────────────────────── */
{
  const code = stripComments(readIf('guitar-render.js') || '');
  const hits = code.match(/#[0-9a-fA-F]{3,8}\b|\brgba?\s*\(|\bhsla?\s*\(/g) || [];
  if (hits.length) {
    errors.push(`guitar-render.js contains ${hits.length} literal colour(s) (${[...new Set(hits)].slice(0, 4).join(', ')}). ` +
                `Every stroke and fill must be currentColor or a CSS custom property, or dark mode is a second bug.`);
  } else {
    notes.push('No literal colours in the renderer.');
  }
}

/* ── 3b. Every class the renderer emits is actually styled ───────────────────
   Rule 3 above only proves the renderer contains no literal colour, which it
   passes trivially by containing no colour at all. That is half the contract:
   the other half is that guitar-styles.css supplies one. The gap is not
   theoretical — gtr-tab-clear masks the stave line behind a tab digit and has
   no fill of its own, so with no rule for it the browser defaults to black and
   paints over the number it exists to reveal. Unstyled is not neutral. */
{
  const css = readIf('guitar-styles.css');
  if (css === null) {
    errors.push('guitar-styles.css is missing. The renderer carries no colour by design, so without ' +
                'it every figure is unstyled — and an unstyled mask rect is an opaque black box.');
  } else {
    const fbA = E.makeFretboard();
    const ex = E.generateExercise({ scaleId: 'minPent', rootPc: 9, positionIndex: 0 });
    const samples = [
      R.chordBox({ name: 'C', notes: [{ string: 5, fret: 3, finger: 3 }, { string: 2, fret: 1 }], muted: [6] }, fbA),
      R.chordBox({ name: 'Bm', notes: [{ string: 5, fret: 2 }, { string: 4, fret: 4 }], muted: [6] }, fbA),
      R.neckDiagram({ notes: ex.notes, root: 9, characteristic: 6, labels: true }, fbA),
      R.tab({ notes: ex.notes.map(n => Object.assign({}, n, { finger: 'i', hand: 'p', tech: 'tap' })) },
            E.makeFretboard({ capo: 3 }))
    ].join('');
    const emitted = new Set();
    (samples.match(/class="([^"]+)"/g) || []).forEach(m => {
      m.slice(7, -1).split(/\s+/).forEach(c => { if (/^(gtr-|is-)/.test(c)) emitted.add(c); });
    });
    const unstyled = [...emitted].filter(c => !css.includes('.' + c));
    if (unstyled.length) {
      errors.push(`guitar-styles.css has no rule for: ${unstyled.sort().join(', ')}. ` +
                  `Every class the renderer emits needs one — unstyled SVG takes browser defaults, ` +
                  `which for a fill is opaque black.`);
    } else {
      notes.push(`All ${emitted.size} emitted classes are styled.`);
    }
    /* And the theme must be complete on both sides, since check-theme-tokens.js
       does not read this file. */
    const tokens = [...new Set((css.match(/--gtr-[a-z-]+/g) || []))];
    const darkBlock = (css.match(/body\.dark\[data-subject="guitar"\]\s*\{([\s\S]*?)\}/) || [])[1] || '';
    const missingDark = tokens.filter(t => !darkBlock.includes(t));
    if (missingDark.length) {
      errors.push(`These tokens have no dark-theme value: ${missingDark.join(', ')}. ` +
                  `check-theme-tokens.js only reads styles.css, so this file is on its own.`);
    } else if (tokens.length) {
      notes.push(`All ${tokens.length} theme tokens are defined for both themes.`);
    }
  }
}

/* ── 4. Mirroring flips exactly what it should ───────────────────────────────
   Rendered geometry, not source inspection: this is the rule that catches a
   renderer which honours handedness for five elements and forgets the sixth. */
function coordsOf(svg, attr) {
  const re = new RegExp(attr + '="(-?[\\d.]+)"', 'g');
  const out = [];
  let m;
  while ((m = re.exec(svg)) !== null) out.push(Number(m[1]));
  return out;
}

/* NEVER SORT BEFORE COMPARING.
   Mirroring permutes which note sits at which coordinate; it does not change
   the SET of coordinates in use. Sorting therefore makes every comparison here
   vacuous — an earlier draft did exactly that, and a mutation that flipped the
   neck's string order with handedness passed the checker cleanly. Compare in
   emission order, which is note order, so a changed assignment shows up. */
function sameSeq(a, b) { return a.length === b.length && a.every((v, i) => v === b[i]); }

{
  const rh = E.makeFretboard({ handed: 'right' });
  const lh = E.makeFretboard({ handed: 'left' });
  const shape = {
    name: 'C',
    notes: [{ string: 5, fret: 3 }, { string: 4, fret: 2 }, { string: 3, fret: 0 },
            { string: 2, fret: 1 }, { string: 1, fret: 0 }],
    muted: [6]
  };

  /* Chord box: the dots must move, and must land on mirrored positions. */
  const cbR = R.chordBox(shape, rh), cbL = R.chordBox(shape, lh);
  const dotXR = coordsOf(cbR, 'cx');
  const dotXL = coordsOf(cbL, 'cx');
  if (sameSeq(dotXR, dotXL) && dotXR.length) {
    errors.push('chordBox: dot positions are identical for both handednesses — the strings are not flipping.');
  }
  if (dotXR.length !== dotXL.length) {
    errors.push('chordBox: mirroring changed how many dots are drawn.');
  }
  /* Width is the same figure, so a dot at x in one is at (w - x) in the other. */
  {
    const w = Number((cbR.match(/viewBox="0 0 ([\d.]+) /) || [])[1]);
    const pairs = dotXR.map(v => Math.round((w - v) * 100) / 100);
    if (!isFinite(w)) {
      errors.push('chordBox: no width in the viewBox, so mirroring cannot be verified.');
    } else if (!sameSeq(pairs, dotXL)) {
      errors.push(`chordBox: left-handed dots are not the mirror of right-handed ones ` +
                  `(expected ${pairs.join(',')}, got ${dotXL.join(',')}).`);
    }
  }

  /* ABSOLUTE ORIENTATION, not just relative.
     Everything above compares the two handednesses to each other, which passes
     happily when BOTH are wrong — a mutation that inverted the chord box for
     both hands kept them perfect mirrors of one another and sailed through.
     So each element is also pinned to the convention it must actually follow,
     by rendering a single known string and asking where it landed. */
  const onlyString = (n) => R.chordBox({ notes: [{ string: n, fret: 2 }] }, rh);
  const xOf = (svg) => coordsOf(svg, 'cx')[0];
  if (!(xOf(onlyString(6)) < xOf(onlyString(1)))) {
    errors.push('chordBox, right-handed: the low E must be leftmost. That is the chord-chart ' +
                'convention, and it is the reverse of the natural string-1-first order.');
  }
  const lhBox = (n) => R.chordBox({ notes: [{ string: n, fret: 2 }] }, lh);
  if (!(coordsOf(lhBox(1), 'cx')[0] < coordsOf(lhBox(6), 'cx')[0])) {
    errors.push('chordBox, left-handed: the high E must be leftmost — the mirror image.');
  }

  const oneNeck = (n, fb2) => R.neckDiagram({ notes: [{ string: n, fret: 3 }] }, fb2);
  if (!(coordsOf(oneNeck(1, rh), 'cy').slice(-1)[0] < coordsOf(oneNeck(6, rh), 'cy').slice(-1)[0])) {
    errors.push('neckDiagram: string 1 (high E) must sit above string 6, matching the tab stave beside it.');
  }
  if (!(coordsOf(oneNeck(1, lh), 'cy').slice(-1)[0] < coordsOf(oneNeck(6, lh), 'cy').slice(-1)[0])) {
    errors.push('neckDiagram, left-handed: string 1 must STILL sit above string 6.');
  }

  const oneTab = (n, opts2, fb2) => R.tab(Object.assign({ notes: [{ string: n, fret: 3, beat: 0 }] }, opts2), fb2);
  const tabY = (svg) => coordsOf(svg, 'y').slice(-1)[0];
  if (!(tabY(oneTab(1, {}, rh)) < tabY(oneTab(6, {}, rh)))) {
    errors.push('tab: string 1 (high E) must be the TOP line. The plausible inverse renders every ' +
                'stave upside down.');
  }
  if (!(tabY(oneTab(1, {}, lh)) < tabY(oneTab(6, {}, lh)))) {
    errors.push('tab, left-handed without the opt-in: string 1 must still be the top line.');
  }
  const neckAt = (fret, fb2) => coordsOf(R.neckDiagram({ notes: [{ string: 3, fret: fret }] }, fb2), 'cx').slice(-1)[0];
  if (!(neckAt(1, rh) < neckAt(11, rh))) {
    errors.push('neckDiagram, right-handed: the nut must be on the LEFT, so fret 1 sits left of fret 11.');
  }
  if (!(neckAt(1, lh) > neckAt(11, lh))) {
    errors.push('neckDiagram, left-handed: the nut must be on the RIGHT — that is what the fret axis flip is for.');
  }
  notes.push('Absolute orientation pinned: chord box low-E-leftmost, neck and tab high-E-on-top, nut side per hand.');

  /* Neck diagram: the FRET axis flips, the string order does not. */
  const exercise = E.generateExercise({ scaleId: 'minPent', rootPc: 9, positionIndex: 0 });
  const nkR = R.neckDiagram({ notes: exercise.notes }, rh);
  const nkL = R.neckDiagram({ notes: exercise.notes }, lh);
  const nkYR = coordsOf(nkR, 'cy');
  const nkYL = coordsOf(nkL, 'cy');
  if (!sameSeq(nkYR, nkYL)) {
    errors.push('neckDiagram: string positions changed with handedness. A horizontal reflection ' +
                'cannot reorder a vertical axis — high E stays on top for both hands.');
  }
  const nkXR = coordsOf(nkR, 'cx');
  const nkXL = coordsOf(nkL, 'cx');
  if (sameSeq(nkXR, nkXL)) {
    errors.push('neckDiagram: fret positions are identical for both handednesses — the nut is not moving.');
  }

  /* Tab: does NOT flip by default, and DOES flip on the explicit opt-in. */
  const tabR = R.tab({ notes: exercise.notes }, rh);
  const tabL = R.tab({ notes: exercise.notes }, lh);
  if (!sameSeq(coordsOf(tabR, 'y'), coordsOf(tabL, 'y'))) {
    errors.push('tab: flipped with handedness. Tab is written the same way for both hands by ' +
                'convention; it must flip only on the explicit mirrorTab opt-in.');
  }
  const tabLM = R.tab({ notes: exercise.notes, mirrorTab: true }, lh);
  if (sameSeq(coordsOf(tabR, 'y'), coordsOf(tabLM, 'y'))) {
    errors.push('tab: mirrorTab did nothing for a left-handed player.');
  }
  const tabRM = R.tab({ notes: exercise.notes, mirrorTab: true }, rh);
  if (!sameSeq(coordsOf(tabR, 'y'), coordsOf(tabRM, 'y'))) {
    errors.push('tab: mirrorTab flipped a RIGHT-handed stave. The opt-in mirrors a left-handed ' +
                'reading, not everyone\'s.');
  }
  notes.push('Mirroring verified on rendered geometry: chord box strings flip, neck frets flip, ' +
             'neck strings do not, tab only on opt-in.');

  /* Every figure must scale and be announced. */
  [cbR, nkR, tabR].forEach((svg, i) => {
    const which = ['chordBox', 'neckDiagram', 'tab'][i];
    if (!/viewBox="/.test(svg)) errors.push(`${which}: no viewBox, so it will not scale.`);
    if (!/<title>/.test(svg)) errors.push(`${which}: no <title>, so a screen reader gets nothing.`);
    if (!/role="img"/.test(svg)) errors.push(`${which}: no role="img".`);
  });
}

/* ── 5. Lesson prose uses fretting/picking, never left/right ─────────────── */
const BANNED = [
  /\bright[- ]hand(ed)?\b/i, /\bleft[- ]hand(ed)?\b/i,
  /\byour right\b/i, /\byour left\b/i, /\bon the left\b/i, /\bon the right\b/i
];

/* The house shape is path → unit.lessons[] → lesson.cards[], as aat1-learn-data
   and aat3-learn-data both are. An earlier draft treated the top-level array as
   lessons, so `l.cards` was undefined everywhere and the entire ban passed
   vacuously while cheerfully printing how many lessons it had checked. Both
   shapes are accepted, and finding no cards at all is an ERROR rather than a
   pass — that is the specific way this went wrong. */
function flattenLessons(path) {
  const out = [];
  (Array.isArray(path) ? path : []).forEach(entry => {
    if (!entry) return;
    if (Array.isArray(entry.lessons)) entry.lessons.forEach(l => l && out.push(l));
    else if (Array.isArray(entry.cards)) out.push(entry);
  });
  return out;
}

/* Prose lives in more than `p`. A heading or a callout saying "your left hand"
   is the same defect and was previously invisible. */
function cardText(c) {
  if (!c) return '';
  const bits = [];
  const push = v => { if (typeof v === 'string') bits.push(v); };
  push(c.h); push(c.title); push(c.body);
  (c.p || []).forEach(push);
  (c.flow || []).forEach(push);
  if (c.callout) push(c.callout.text);
  push(c.examtrap);
  if (c.table) { (c.table.headers || []).forEach(push); (c.table.rows || []).forEach(r => (r || []).forEach(push)); }
  if (c.example) { push(c.example.title); (c.example.rows || []).forEach(r => (r || []).forEach(push)); }
  if (c.split) { ['left', 'right'].forEach(k => { if (c.split[k]) { push(c.split[k].title); (c.split[k].items || []).forEach(push); } }); }
  if (c.worked) { push(c.worked.title); push(c.worked.problem); (c.worked.steps || []).forEach(st => { push(st.do); push(st.why); }); if (c.worked.tryIt) { push(c.worked.tryIt.q); push(c.worked.tryIt.hint); push(c.worked.tryIt.exp); } }
  if (c.pointer) { push(c.pointer.listenFor); push(c.pointer.thenTry); push(c.pointer.concept); }
  return bits.join(' ');
}

{
  const dataFile = 'guitar-learn-data.js';
  const src = readIf(dataFile);
  if (src === null) {
    notes.push(`${dataFile} does not exist yet — prose rules will apply when it does.`);
  } else {
    let mod = null;
    try { mod = require(path.join(ROOT, dataFile)); } catch (e) { mod = null; }
    if (!mod) {
      errors.push(`${dataFile} could not be loaded for prose checking.`);
    } else {
      const lessons = flattenLessons(mod.GUITAR_LEARN_PATH || mod.LESSONS || []);
      let optOuts = 0, cardsSeen = 0;
      lessons.forEach(l => {
        if (l.handedProse) { optOuts++; return; }
        (l.cards || []).forEach((c, ci) => {
          cardsSeen++;
          const t = cardText(c);
          BANNED.forEach(re => {
            const hit = t.match(re);
            if (hit) {
              errors.push(`${l.id} card ${ci + 1}: prose says "${hit[0]}". Use "fretting hand" and ` +
                          `"picking hand" — they are correct for both players.`);
            }
          });
        });
      });
      if (lessons.length && !cardsSeen) {
        errors.push(`${dataFile}: found ${lessons.length} lesson(s) but zero cards. The prose ban is ` +
                    `not actually running — check the data shape rather than trusting this pass.`);
      }
      if (optOuts > 1) {
        errors.push(`${optOuts} lessons set handedProse. At most one may — the left-handed instrument ` +
                    `lesson. An unbounded opt-out is how this rule quietly stops applying.`);
      }
      notes.push(`Prose: ${cardsSeen} card(s) across ${lessons.length} lesson(s); ${optOuts} opt-out(s).`);
    }
  }
}

/* ── 6. No stored pixel positions in guitar data ─────────────────────────── */
['guitar-learn-data.js', 'guitar-exercise-data.js'].forEach(f => {
  const src = readIf(f);
  if (src === null) return;
  if (/\b(cx|cy|px|x1|y1)\s*:/.test(stripComments(src))) {
    errors.push(`${f} appears to store pixel coordinates. Data holds { string, fret }; the renderer ` +
                `decides where that lands, which is what keeps progress valid when handedness changes.`);
  }
});

/* ── Report ──────────────────────────────────────────────────────────────── */
console.log(`${BOLD}guitar handedness${RESET}\n`);
notes.forEach(n => console.log(`  ${DIM}${n}${RESET}`));
console.log('');
if (errors.length) {
  errors.forEach(e => console.log(`  ${RED}✗${RESET}  ${e}`));
  console.log(`\n${RED}${BOLD}${errors.length} handedness failure(s).${RESET}\n`);
  process.exit(1);
}
console.log(`  ${GREEN}✓  left-handed mode holds everywhere it is checked${RESET}\n`);
