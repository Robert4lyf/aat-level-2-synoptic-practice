#!/usr/bin/env node
/**
 * No lesson uses a term the course has not taught yet.
 *
 * M5 shipped opening with "a minor pentatonic drops the second and the sixth
 * from the minor scale", and nothing anywhere in the course had said what a
 * scale degree was, or a tone, or a semitone. It read as authoritative and was
 * unusable by the person it was written for.
 *
 * Neither existing checker could see it. check-guitar-coverage.js asks whether
 * every criterion is CLAIMED, and every one was — the hole was in what the
 * criteria assumed, not in what they covered. check-guitar-quality.js reads
 * each card on its own, and each card was fine on its own. The defect only
 * exists in the ORDER, which is the one dimension nothing was looking at.
 *
 * So: a term is declared here with the lesson that introduces it, and using it
 * before that lesson fails. Teaching order comes from guitar-syllabus.js's UNITS
 * array and the order of lessons within each unit.
 *
 * WHAT THIS DELIBERATELY DOES NOT COVER. Only terms with one unambiguous
 * meaning are listed. "Tone" means both an interval and a timbre, and P1 uses
 * it in the second sense three lessons before M1 defines the first. "Third" and
 * "fifth" are scale degrees and also ordinary ordinals — "the third string",
 * "the fifth fret". Matching those would produce false failures that train a
 * reader to ignore this check, which is worse than a narrower rule. The
 * ambiguous ones are listed in ALSO_MEANS with the reason.
 *
 * Run: node scripts/check-guitar-prerequisites.js   (exit 1 on any failure)
 */

'use strict';

const S = require('../guitar-syllabus.js');
const D = require('../guitar-learn-data.js');

const RED = '\x1b[31m', GREEN = '\x1b[32m', DIM = '\x1b[2m', BOLD = '\x1b[1m', RESET = '\x1b[0m';
const errors = [];
const notes = [];

/* term → the lesson that introduces it. */
const INTRODUCED = {
  'semitone':          'm1-l1',
  'interval':          'm1-l1',
  'musical alphabet':  'm1-l1',
  'major scale':       'm1-l2',
  'scale degree':      'm1-l2',
  'root':              'm1-l2',
  'octave':            'm1-l1',
  'natural minor':     'm1-l3',
  'minor scale':       'm1-l3',
  'pentatonic':        'm1-l3',
  'flattened':         'm1-l2',
  'free stroke':       'p1-l3',
  'rest stroke':       'p1-l4',
  'capo':              'm3-l4',
  'arpeggio':          'p2-l1',
  'alternating bass':  'p2-l2',
  'pinch':             'p2-l2',
  'contact point':     'p3-l2'
};

/* Words that carry a technical meaning AND an everyday one, left out on
   purpose. Recorded rather than silently omitted, so the gap is a decision. */
const ALSO_MEANS = {
  'tone':   'also means timbre, which P1 uses three lessons before M1 defines the interval',
  'third':  'also an ordinary ordinal — "the third string"',
  'fifth':  'also an ordinary ordinal — "the fifth fret"',
  'second': 'also an ordinary ordinal, and a unit of time',
  'sixth':  'also an ordinary ordinal — "the sixth string"'
};

/* Teaching order: units in syllabus order, lessons in file order within each. */
const order = [];
for (const unit of S.UNITS) {
  for (const lesson of D.lessonsFor(unit.id)) order.push(lesson.id);
}
const rank = new Map(order.map((id, i) => [id, i]));

if (!order.length) {
  errors.push('no lessons found in teaching order — this gate is checking nothing.');
}

for (const [term, home] of Object.entries(INTRODUCED)) {
  if (!rank.has(home)) {
    errors.push(`"${term}" is declared as introduced by ${home}, which is not a lesson in the ` +
                `teaching order. A dangling declaration silently excuses every use of the term.`);
  }
}

const re = (term) => new RegExp('\\b' + term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\w*\\b', 'i');

let checked = 0;
for (const lesson of D.LESSONS) {
  const here = rank.get(lesson.id);
  if (here === undefined) continue;
  lesson.cards.forEach((card, i) => {
    const text = [
      (card.p || []).join(' '),
      card.h || '',
      card.practice ? `${card.practice.do} ${card.practice.until}` : ''
    ].join(' ');
    for (const [term, home] of Object.entries(INTRODUCED)) {
      const homeRank = rank.get(home);
      if (homeRank === undefined) continue;
      checked++;
      if (!re(term).test(text)) continue;
      if (here < homeRank) {
        errors.push(`${lesson.id} card ${i + 1} uses "${term}", which ${home} introduces — ` +
                    `and ${home} comes later. The reader meets the word before the course explains it.`);
      }
    }
  });
}

notes.push(`${Object.keys(INTRODUCED).length} terms declared, ${order.length} lessons in teaching ` +
           `order: ${order.join(' → ')}`);
notes.push(`${Object.keys(ALSO_MEANS).length} ambiguous words deliberately not checked: ` +
           Object.keys(ALSO_MEANS).join(', ') + '.');

console.log(`${BOLD}guitar prerequisites${RESET}\n`);
notes.forEach(n => console.log(`  ${DIM}${n}${RESET}`));
console.log('');
if (errors.length) {
  errors.forEach(e => console.log(`  ${RED}✗${RESET}  ${e}`));
  console.log(`\n${RED}${BOLD}${errors.length} term(s) used before they are taught.${RESET}\n`);
  process.exit(1);
}
console.log(`  ${GREEN}✓  every declared term is introduced before it is used${RESET}\n`);
