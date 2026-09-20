#!/usr/bin/env node
/**
 * No term is used in the pixel art course before it is taught.
 *
 * THE FAILURE THIS EXISTS FOR, and it had already happened three times when
 * this file was written:
 *
 *   PX1 lesson 3 told the reader to hide a layer "to check the silhouette".
 *   Silhouette is PX5's word, four units later, and to a beginner on their
 *   third card it is a word that means nothing.
 *   PX1 lesson 3 also listed what an .aseprite file keeps, including "tags",
 *   which are introduced in PX6.
 *   PX1 lesson 1 named anti-aliasing while telling the reader to switch it
 *   off — that one stays, for the reason in ALLOW below, but it now explains
 *   itself where it appears instead of assuming.
 *
 * None of the existing checks could see any of it. check-pixel-course.js
 * proves every criterion is taught and every challenge is reached; neither
 * says anything about whether the prose leans on a word the reader has not
 * met. The guitar module hit exactly this and answered it with
 * check-guitar-prerequisites.js. This is the same gate for this course.
 *
 * HOW IT WORKS. TERMS maps a word to the unit that teaches it. The course is
 * walked in teaching order — the order of UNITS, then lessons, then cards —
 * and the first card whose prose matches each pattern is found. If that card
 * sits in an earlier unit than the one that teaches the term, it fails.
 *
 * ALLOW carries the exceptions, each with a reason someone can weigh. A term
 * belongs there only when the reader must have the word before the course can
 * teach it properly — a control they have to find on day one — and the card
 * that uses it early must also explain it, which is asserted below rather than
 * taken on trust.
 *
 * WHAT THIS CANNOT DO: it checks the words on the list. A term nobody thought
 * to list is invisible to it, exactly as the syllabus itself is invisible to
 * the coverage check. Adding a term here when you add a criterion is the
 * discipline this depends on.
 *
 * Run: node scripts/check-pixel-prerequisites.js   (exit 1 on any failure)
 */

'use strict';

const path = require('path');
const ROOT = path.join(__dirname, '..');
const SY = require(path.join(ROOT, 'pixel-syllabus.js'));
const LD = require(path.join(ROOT, 'pixel-learn-data.js'));
const CH = require(path.join(ROOT, 'pixel-challenge-data.js'));

const RED = '\x1b[31m', GREEN = '\x1b[32m', BOLD = '\x1b[1m', DIM = '\x1b[2m', RESET = '\x1b[0m';
const errors = [];
const notes = [];

/* term → the unit that teaches it, and the pattern that finds it.
   Keep this in step with the syllabus: a criterion that introduces a word a
   reader could not already know belongs here.

   A WORD WITH TWO SENSES IN THIS COURSE DOES NOT BELONG HERE. "Seam" was on
   this list and had to come off: PX4 uses it for the crevice where two forms
   meet and PX7 for the join between two tiles, and nothing a regular
   expression can see tells those apart. A check that cannot distinguish two
   senses must not claim to. */
const TERMS = [
  ['silhouette',    'PX2', /silhouettes?\b/i],
  ['run length',    'PX2', /\brun lengths?\b/i],
  ['pixel-perfect', 'PX2', /pixel-perfect/i],
  ['value',         'PX3', /\bvalues?\b/i],
  ['hue',           'PX3', /\bhues?\b/i],
  ['ramp',          'PX3', /\bramps?\b/i],
  ['indexed',       'PX3', /\bindexed\b/i],
  ['pillow',        'PX4', /pillow/i],
  ['core shadow',   'PX4', /core shadow/i],
  ['occlusion',     'PX4', /occlusion/i],
  ['dither',        'PX4', /dither/i],
  ['banding',       'PX4', /banding/i],
  ['anti-aliasing', 'PX5', /anti-alias/i],
  ['onion skin',    'PX6', /onion.?skin/i],
  ['tag',           'PX6', /\btags?\b/i],
  ['tilemap',       'PX7', /tilemap/i],
  ['tileset',       'PX7', /tileset/i],
  ['head count',    'PX8', /head (count|unit|height)/i],
  ['isometric',     'PX8', /isometric/i],
  ['anticipation',  'PX9', /anticipation/i],
  ['smear',         'PX9', /\bsmears?\b/i],
  ['slice',         'PX9', /\bnine-slice\b|\bslices\b/i],
  ['pivot',         'PX9', /\bpivots?\b|\borigin\b/i],
];

/* Exceptions, each with a reason and the card that carries it. A card listed
   here must ALSO explain the term where it uses it — asserted below, because
   an exemption that lets a word through unexplained is the defect this file
   exists to catch, wearing a permission slip. */
const ALLOW = [
  {
    term: 'indexed', card: 'px1-l1',
    why: 'the card is about choosing a colour mode in the New File dialog, which cannot be ' +
         'discussed without naming the other option; it says what indexed mode does and defers to PX3',
    mustExplain: /restricts you to a palette/i,
  },
  {
    term: 'anti-aliasing', card: 'px1-l1',
    why: 'it is the name of a tool-options checkbox that has to be off in the very first file; ' +
         'the card explains what it is and points at PX5 for doing it by hand',
    mustExplain: /softening|invent|part-transparent/i,
  },
];

/* The course in teaching order. */
const cards = [];
SY.UNITS.forEach((u, ui) => {
  LD.lessonsFor(u.id).forEach((l) => {
    l.cards.forEach((c, i) => {
      const p = Array.isArray(c.p) ? c.p : (c.p ? [c.p] : []);
      const figures = []
        .concat(c.art ? [c.art.caption || ''] : [])
        .concat(c.compare ? ['bad', 'good'].map(k => (c.compare[k] && c.compare[k].label) || '') : []);
      cards.push({
        unit: u.id, ui, lesson: l.id, n: i + 1,
        text: [c.h, ...p, ...figures].join(' '),
        prose: p.join(' '),
      });
    });
  });
});

const unitIndex = Object.fromEntries(SY.UNITS.map((u, i) => [u.id, i]));

TERMS.forEach(([term, unit, re]) => {
  const first = cards.find(c => re.test(c.text));
  if (!first) {
    /* A term on this list that appears nowhere means the list has drifted from
       the course, which is worth knowing: the rule it states is not being
       enforced on anything. */
    errors.push(`"${term}" is listed as taught in ${unit} and appears in no lesson card. ` +
                `Either the material dropped it or this list is stale.`);
    return;
  }
  if (unitIndex[first.unit] >= unitIndex[unit]) return;   // introduced in time

  const allowed = ALLOW.find(a => a.term === term && a.card === first.lesson);
  if (!allowed) {
    errors.push(`"${term}" is taught in ${unit} but first used in ${first.unit} ` +
                `(${first.lesson} card ${first.n}). A reader meets the word before anything has ` +
                `explained it. Reword the earlier card, or move the teaching earlier.`);
    return;
  }
  if (!allowed.mustExplain.test(first.prose)) {
    errors.push(`"${term}" is exempted at ${first.lesson} on the grounds that the card explains it — ` +
                `and the card no longer does. Either restore the explanation or drop the exemption.`);
    return;
  }
  notes.push(`${term} appears early in ${first.lesson} and explains itself there: ${allowed.why}.`);
});

/* A challenge may not reach for a term its own unit has not taught either.
   The hints are where this slips: a hint is written to be helpful and reaches
   for whatever word is handy. */
TERMS.forEach(([term, unit, re]) => {
  const teachIdx = unitIndex[unit];
  CH.CHALLENGES.forEach((c) => {
    if (unitIndex[c.unit] >= teachIdx) return;
    const text = [c.title, c.brief, c.check, ...(c.hints || [])].join(' ');
    if (!re.test(text)) return;
    if (ALLOW.some(a => a.term === term)) return;
    errors.push(`${c.unit} challenge ${c.n} ("${c.title}") uses "${term}", which is not taught until ${unit}.`);
  });
});

notes.push(`${TERMS.length} terms checked across ${cards.length} cards and ${CH.CHALLENGES.length} challenges, ` +
           `in the teaching order ${SY.UNITS.map(u => u.id).join(' → ')}.`);

console.log(`${BOLD}Pixel art — nothing is named before it is explained${RESET}\n`);
notes.forEach(n => console.log(`  ${DIM}${n}${RESET}`));
console.log('');

if (errors.length) {
  console.log(`${RED}${BOLD}── ${errors.length} problem${errors.length === 1 ? '' : 's'} ──${RESET}`);
  errors.forEach(e => console.log(`  ${RED}✗${RESET}  ${e}`));
  console.log('');
  process.exit(1);
}
console.log(`${GREEN}${BOLD}── Every term is introduced before it is used ✓${RESET}\n`);
