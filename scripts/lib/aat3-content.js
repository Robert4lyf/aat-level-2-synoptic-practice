/**
 * Every Level 3 content file, in one place.
 *
 * Level 3 started as one unit in one file. FAPS is 150 guided learning hours
 * against TPFB's 60, and aat3-learn-data.js was already 380KB, so the second
 * unit went into aat3-faps-data.js rather than onto the end of the first.
 *
 * That split leaves a trap. Six checkers read the content, and every one of
 * them read `AAT3_LEARN_PATH` by name. A checker not updated when a unit is
 * added does not fail — it passes, having quietly examined one unit and said
 * nothing about the other, which is the most expensive kind of green there is.
 *
 * So the file list lives here and the checkers ask for it. Adding a third unit
 * is one line in FILES below, and every checker picks it up.
 */

'use strict';

const path = require('path');
const ROOT = path.join(__dirname, '..', '..');

/* Each entry: the file, the two globals it may export, and whether its unit is
   governed by a Finance Act. A file that exports neither global is a mistake
   worth failing on rather than skipping quietly.

   `taxGoverned` scopes the hardcoded-figure scan in check-aat3-quality.js.
   Those thresholds belong to TPFB, and scanning FAPS against them flags any
   coincidence: an authorisation limit of £10,000 in a FAPS question was
   reported as the VAT error-correction limit going stale. FAPS carries no
   Finance Act at all — it rests on IAS 2, IAS 16 and double entry — so there is
   nothing in it for that scan to protect. */
const FILES = [
  { file: 'aat3-learn-data.js', path: 'AAT3_LEARN_PATH', practice: null, taxGoverned: true },
  { file: 'aat3-practice-data.js', path: null, practice: 'AAT3_PRACTICE', taxGoverned: true },
  { file: 'aat3-faps-data.js', path: 'AAT3_FAPS_PATH', practice: 'AAT3_FAPS_PRACTICE', taxGoverned: false },
  /* MATS carries no Finance Act either — it rests on costing arithmetic, which
     is not rolled annually — so the hardcoded-threshold scan does not apply. */
  { file: 'aat3-mats-data.js', path: 'AAT3_MATS_PATH', practice: 'AAT3_MATS_PRACTICE', taxGoverned: false },
];

function load() {
  const groups = [];
  const questions = [];
  const sources = [];
  FILES.forEach(({ file, path: pathKey, practice }) => {
    const mod = require(path.join(ROOT, file));
    if (!pathKey && !practice) throw new Error(`${file}: declares neither a path nor a practice bank.`);
    if (pathKey) {
      const p = mod[pathKey];
      if (!Array.isArray(p)) throw new Error(`${file}: exports no ${pathKey} array.`);
      p.forEach(g => groups.push(g));
    }
    if (practice) {
      const b = mod[practice];
      if (!b || !Array.isArray(b.QUESTIONS)) throw new Error(`${file}: exports no ${practice}.QUESTIONS array.`);
      b.QUESTIONS.forEach(q => questions.push(q));
    }
    sources.push(file);
  });
  return { groups, questions, sources };
}

/* Flat list of every lesson across every unit. */
function lessons(groups) {
  const out = [];
  groups.forEach(g => (g.lessons || []).forEach(l => out.push(l)));
  return out;
}

/* Cheat sheets, as lesson-shaped objects so the CARD-level checks can walk them
   with the same code.

   They are deliberately not in `lessons()`. A cheat sheet claims no syllabus
   criteria and carries no questions, so the coverage ratchet and the
   "every lesson has check questions" rule must not see it — but its single card
   is content a reader will rely on, so the shape, depth, arithmetic, table and
   prose gates all should. Keeping the two lists separate is what lets each
   checker choose. */
function sheets(groups) {
  const out = [];
  groups.forEach(g => {
    const cs = g.cheatsheet;
    if (!cs) return;
    out.push({ id: cs.id, title: cs.title, cards: cs.card ? [cs.card] : [], check: [], criteria: [], isSheet: true, outcome: g.outcome, unit: g.unit });
  });
  return out;
}

module.exports = { ROOT, FILES, load, lessons, sheets };
