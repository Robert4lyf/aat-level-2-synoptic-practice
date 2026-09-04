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
 * Run: node scripts/check-aat3-plain-english.js   (exit 1 on any failure)
 */
'use strict';
const path = require('path');
const ROOT = path.join(__dirname, '..');
const RED='\x1b[31m', GREEN='\x1b[32m', DIM='\x1b[2m', BOLD='\x1b[1m', RESET='\x1b[0m';

/* No sentence in a teaching paragraph may exceed this. */
const MAX_SENTENCE = 30;
/* And a paragraph may not average more than this, so a long sentence cannot be
   bought back by surrounding it with three-word ones. */
const MAX_PARAGRAPH_MEAN = 22;

const UNITS = [
  { file: 'aat3-learn-data.js', key: 'AAT3_LEARN_PATH', label: 'TPFB' },
  { file: 'aat3-faps-data.js',  key: 'AAT3_FAPS_PATH',  label: 'FAPS' },
  { file: 'aat3-mats-data.js',  key: 'AAT3_MATS_PATH',  label: 'MATS' },
  { file: 'aat3-buaw-data.js',  key: 'AAT3_BUAW_PATH',  label: 'BUAW' },
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

UNITS.forEach(u => {
  const mod = require(path.join(ROOT, u.file));
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
    const long = ss.filter(s => words(s) > MAX_SENTENCE);
    if (long.length) {
      overSentence++;
      const l = long[0];
      errors.push(`${u.label} ${p.id} "${p.heading}" paragraph ${p.index + 1}: ` +
        `a ${words(l)}-word sentence (ceiling ${MAX_SENTENCE}) — "${l.slice(0, 90)}…"`);
    } else if (mean > MAX_PARAGRAPH_MEAN) {
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

console.log(`${BOLD}Level 3 prose: plain English${RESET}\n`);
rows.forEach(r => console.log(`  ${DIM}${r}${RESET}`));
console.log(`  ${DIM}${'all'.padEnd(5)} ${String(checks).padStart(4)} paragraphs · ` +
  `${String(totalSentences).padStart(4)} sentences · mean ${(totalWords / totalSentences).toFixed(1)} words${RESET}\n`);

if (errors.length) {
  errors.slice(0, 25).forEach(e => console.log(`  ${RED}✗${RESET} ${e}`));
  if (errors.length > 25) console.log(`  ${DIM}… and ${errors.length - 25} more${RESET}`);
  console.log(`\n${RED}${BOLD}${errors.length} of ${checks} paragraphs are harder to read than they need to be.${RESET}\n`);
  process.exit(1);
}
console.log(`${GREEN}${BOLD}${checks} paragraphs pass — no sentence over ${MAX_SENTENCE} words ✓${RESET}\n`);
process.exit(0);
