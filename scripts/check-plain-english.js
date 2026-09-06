#!/usr/bin/env node
/**
 * Level 3 teaching prose is written in plain English.
 *
 * WHY THIS IS A CHECK AND NOT A STYLE NOTE. "Wordy" is the kind of complaint
 * that gets agreed with and then not acted on, because nobody can say when it
 * has been fixed. Sentence length can be counted, so it can be held.
 *
 * The content was right and the sentences were long. Measured before the
 * rewrite, across all four units:
 *
 *     2,958 sentences        773 over 25 words   (26%)
 *     1,185 paragraphs       428 over 30 words   (14%)
 *                            199 over 35 words   (7%)
 *                             92 over 40 words   (3%)
 *
 * The worst was 77 words — a single sentence carrying a penalty rule, its
 * exception, and the definition of a Time to Pay agreement, none of which the
 * reader could hold at once.
 *
 * After the rewrite, nothing is over 30 and the mean sentence has come down
 * from 19.7 words to 15.5:
 *
 *     TPFB  19.5 -> 15.3   worst 77 -> 30
 *     FAPS  19.3 -> 15.7   worst 60 -> 30
 *     MATS  21.0 -> 16.3   worst 57 -> 30
 *     BUAW  19.6 -> 15.0   worst 50 -> 30
 *
 * NOTHING HERE MEASURES WHETHER THE MATERIAL IS STILL ALL PRESENT. A rewrite
 * that silently deleted a paragraph would leave this gate, and every content
 * gate beside it, entirely green — that happened once during the rewrite and
 * was caught by hand. Every currency amount, percentage and box reference in
 * all four units was diffed as a multiset against the pre-rewrite files
 * afterwards: none lost, none invented. That check was manual and stays
 * manual; treat this gate as measuring readability and nothing else.
 *
 * LEVELS 1 AND 2 WERE NOT IN THIS GATE UNTIL NOW, and it showed. Measured
 * against Level 3's rule the day they were added:
 *
 *     L3  1255 paragraphs  mean 15.5  worst  30    0 over 30
 *     L1   330 paragraphs  mean 17.3  worst  54   81 over 30
 *     L2  1771 paragraphs  mean 18.1  worst 102  343 over 30
 *
 * Rewriting 424 sentences at once is not a change anyone can review, and the
 * risk is not hypothetical — see the note above about a rewrite that silently
 * dropped a paragraph. So the ceiling is PER LEVEL: 30 where the prose has
 * been through the rewrite, 45 where it has not, with the worst tier fixed
 * first. Twenty-four sentences ran past 45 words, the longest at 102; those
 * are rewritten and the figures diffed as a multiset, none lost or invented.
 *
 * THE 45 IS A RATCHET, NOT A RESTING PLACE. It exists to stop Levels 1 and 2
 * getting worse while the remaining ~300 sentences between 30 and 45 words are
 * worked through. Lower it as they are; never raise it.
 *
 * THE CEILING IS A CEILING, NOT A TARGET. Plain-English guidance puts the
 * average at 15 to 20 words and the limit near 30. This unit teaches tax and
 * financial statements, where a sentence sometimes has to carry a condition
 * and its exception together, so the rule is applied per sentence rather than
 * as an average anyone could game by padding short ones.
 *
 * WHAT IT DELIBERATELY DOES NOT DO. It does not score readability by syllable
 * count. Those formulas punish the vocabulary this subject cannot avoid —
 * "deregistration", "depreciation", "reconciliation" — and rewarding a writer
 * for avoiding the right technical word would make the material worse. Length
 * is the honest measure here: it is the reader's working memory that a
 * seventy-word sentence overruns, not their vocabulary.
 *
 * Run: node scripts/check-plain-english.js   (exit 1 on any failure)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const RED='\x1b[31m', GREEN='\x1b[32m', DIM='\x1b[2m', BOLD='\x1b[1m', RESET='\x1b[0m';

/* No sentence in a teaching paragraph may exceed its level's ceiling. */
const REWRITTEN = 30;      /* prose that has been through the rewrite */
const NOT_YET = 45;        /* prose that has not — a ratchet, see the header */
/* And a paragraph may not average more than this, so a long sentence cannot be
   bought back by surrounding it with three-word ones. Applied only where the
   sentence ceiling is 30: at 45 it would fail hundreds of paragraphs that the
   ratchet is deliberately not asking anyone to fix yet. */
const MAX_PARAGRAPH_MEAN = 22;

const UNITS = [
  { file: 'aat3-learn-data.js', key: 'AAT3_LEARN_PATH', label: 'TPFB', max: REWRITTEN },
  { file: 'aat3-faps-data.js',  key: 'AAT3_FAPS_PATH',  label: 'FAPS', max: REWRITTEN },
  { file: 'aat3-mats-data.js',  key: 'AAT3_MATS_PATH',  label: 'MATS', max: REWRITTEN },
  { file: 'aat3-buaw-data.js',  key: 'AAT3_BUAW_PATH',  label: 'BUAW', max: REWRITTEN },
  { file: 'aat1-learn-data.js', key: 'AAT1_LEARN_PATH', label: 'L1',   max: NOT_YET },
  /* Level 2 hangs its path off `window`, so it is read the way every other
     Level 2 gate reads it rather than left out for the want of an export. */
  { file: 'learn-data.js',      key: 'LEARN_PATH',      label: 'L2',   max: NOT_YET, global: true },
];

/* Sentence splitting, kept deliberately blunt. A cleverer splitter would have
   to know that "£1,350,000." ends a sentence and "e.g." does not, and every
   rule it learned would be a way for a long sentence to hide behind an
   abbreviation. Fragments under four words are dropped: they are the tail of
   a decimal or an initial, not a sentence. */
function sentences(text) {
  return String(text).split(/(?<=[.!?])\s+/)
    .map(s => s.trim())
    .filter(s => s.split(/\s+/).filter(Boolean).length >= 4);
}
const words = s => s.split(/\s+/).filter(Boolean).length;

/* Bold markers and the pipes of an inline table are formatting, not language,
   and counting them as words would flatter every paragraph that used them. */
function clean(text) {
  return String(text).replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
}

function paragraphs(node, lessonId, out) {
  if (Array.isArray(node)) { node.forEach(n => paragraphs(n, lessonId, out)); return; }
  if (!node || typeof node !== 'object') return;
  const id = node.id || lessonId;
  if (Array.isArray(node.cards)) {
    node.cards.forEach(card => {
      if (!Array.isArray(card.p)) return;
      card.p.forEach((t, i) => {
        if (typeof t !== 'string') return;
        out.push({ id, heading: card.h || '', index: i, text: clean(t) });
      });
    });
  }
  Object.values(node).forEach(v => paragraphs(v, id, out));
}

const errors = [];
let checks = 0, totalSentences = 0, totalWords = 0;
const rows = [];

/* ── The ratchet guards itself ────────────────────────────────────────────
   Everything below measures the PROSE. Nothing in it can notice the gate's own
   ceilings being raised, or a level being quietly dropped from the table — and
   both are one-line edits that would leave every check here green while the
   standard silently disappeared. Mutation testing found exactly that: a 50-word
   sentence in Level 2 goes undetected if `max` is edited to 999, or if the L2
   row is deleted.

   So the configuration is asserted too. A ceiling may only ever be one of the
   two declared constants, the constants may only move DOWN, and all six banks
   must be present. Loosening the standard now means editing this block, which
   is a deliberate act rather than a number nobody reviews. */
if (REWRITTEN > 30) {
  errors.push(`the rewritten-prose ceiling has been raised to ${REWRITTEN}; the ratchet only goes down`);
}
if (NOT_YET > 45) {
  errors.push(`the not-yet-rewritten ceiling has been raised to ${NOT_YET}; the ratchet only goes down`);
}
if (NOT_YET < REWRITTEN) {
  errors.push(`the two ceilings have been crossed over (${NOT_YET} < ${REWRITTEN})`);
}
UNITS.forEach(u => {
  if (u.max !== REWRITTEN && u.max !== NOT_YET) {
    errors.push(`${u.label} carries a ceiling of ${u.max}, which is neither of the two declared constants`);
  }
});
['TPFB', 'FAPS', 'MATS', 'BUAW', 'L1', 'L2'].forEach(label => {
  if (!UNITS.some(u => u.label === label)) {
    errors.push(`${label} is no longer in the gate — its prose is unmeasured`);
  }
});

UNITS.forEach(u => {
  let mod;
  if (u.global) {
    const w = {};
    new Function('window', fs.readFileSync(path.join(ROOT, u.file), 'utf8'))(w);
    mod = w;
  } else {
    mod = require(path.join(ROOT, u.file));
  }
  const out = [];
  paragraphs(mod[u.key], '', out);

  let overSentence = 0, overMean = 0, unitSentences = 0, unitWords = 0, worst = 0;
  out.forEach(p => {
    const ss = sentences(p.text);
    if (!ss.length) return;
    const lens = ss.map(words);
    unitSentences += lens.length;
    unitWords += lens.reduce((a, b) => a + b, 0);
    const mean = lens.reduce((a, b) => a + b, 0) / lens.length;
    worst = Math.max(worst, ...lens);

    checks++;
    const long = ss.filter(s => words(s) > u.max);
    if (long.length) {
      overSentence++;
      const l = long[0];
      errors.push(`${u.label} ${p.id} "${p.heading}" paragraph ${p.index + 1}: ` +
        `a ${words(l)}-word sentence (ceiling ${u.max}) — "${l.slice(0, 90)}…"`);
    } else if (u.max === REWRITTEN && mean > MAX_PARAGRAPH_MEAN) {
      overMean++;
      errors.push(`${u.label} ${p.id} "${p.heading}" paragraph ${p.index + 1}: ` +
        `averages ${mean.toFixed(1)} words a sentence over ${lens.length} sentences ` +
        `(ceiling ${MAX_PARAGRAPH_MEAN}).`);
    }
  });
  totalSentences += unitSentences;
  totalWords += unitWords;
  rows.push(`${u.label.padEnd(5)} ${String(out.length).padStart(4)} paragraphs · ` +
    `${String(unitSentences).padStart(4)} sentences · ` +
    `mean ${(unitWords / unitSentences).toFixed(1)} words · longest ${worst} · ` +
    `${overSentence + overMean} over the ceiling`);
});

console.log(`${BOLD}Teaching prose: plain English${RESET}\n`);
rows.forEach(r => console.log(`  ${DIM}${r}${RESET}`));
console.log(`  ${DIM}${'all'.padEnd(5)} ${String(checks).padStart(4)} paragraphs · ` +
  `${String(totalSentences).padStart(4)} sentences · mean ${(totalWords / totalSentences).toFixed(1)} words${RESET}\n`);

if (errors.length) {
  errors.slice(0, 25).forEach(e => console.log(`  ${RED}✗${RESET} ${e}`));
  if (errors.length > 25) console.log(`  ${DIM}… and ${errors.length - 25} more${RESET}`);
  console.log(`\n${RED}${BOLD}${errors.length} of ${checks} paragraphs are harder to read than they need to be.${RESET}\n`);
  process.exit(1);
}
console.log(`${GREEN}${BOLD}${checks} paragraphs pass — nothing over its level's ceiling ` +
  `(${REWRITTEN} words where the prose has been rewritten, ${NOT_YET} where it has not) ✓${RESET}\n`);
process.exit(0);
