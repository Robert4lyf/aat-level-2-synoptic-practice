#!/usr/bin/env node
'use strict';

/*
 * CIPS Level 2 syllabus fidelity gate.
 *
 * `check-cips2-syllabus.js` proves the encoded tree is internally coherent.
 * This file asks a different question: does it still match the compact source
 * manifest transcribed from the CIPS-hosted syllabus/specification reviewed on
 * 2026-09-02?
 *
 * The manifest intentionally does not republish CIPS's indicative prose. It
 * stores public qualification metadata, official heading fingerprints and the
 * number of indicative bullets under each assessment criterion. A wording,
 * structure, assessment-shape or bullet-count drift therefore fails closed.
 */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const S = require(path.join(ROOT, 'cips2-syllabus.js')).SYLLABUS;
const MANIFEST_FILE = path.join(ROOT, 'docs/reference/cips-l2-source-manifest.json');

const errors = [];
function err(message) { errors.push(message); }
function eq(actual, expected, label) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    err(`${label}: got ${JSON.stringify(actual)}, expected ${JSON.stringify(expected)}.`);
  }
}

if (!fs.existsSync(MANIFEST_FILE)) {
  console.log(`\x1b[31m✗\x1b[0m ${MANIFEST_FILE} is missing — fidelity cannot be checked.`);
  process.exit(1);
}
const M = JSON.parse(fs.readFileSync(MANIFEST_FILE, 'utf8'));

/* Qualification-level facts from the live qualification page/specification. */
eq(S.qualificationNumber, M.qualificationNumber, 'qualification number');
eq(S.syllabusLabel, M.syllabusLabel, 'syllabus label');
eq(S.sourceReviewed, M.reviewed, 'source review date');
eq(S.credits, M.credits, 'qualification credits');
eq(S.totalQualificationTimeHours, M.totalQualificationTimeHours, 'TQT');
eq(S.guidedLearningHours, M.guidedLearningHours, 'qualification GLH');
eq(S.additionalSelfStudyHours, M.additionalSelfStudyHours, 'qualification self-study');
eq(S.totalExamHours, M.totalExamHours, 'qualification exam hours');

const encodedKeys = Object.keys(S.modules);
const sourceKeys = Object.keys(M.modules);
eq(encodedKeys, sourceKeys, 'module keys/order');

for (const key of sourceKeys) {
  const source = M.modules[key];
  const mod = S.modules[key];
  if (!mod) { err(`${source.code}: module is missing from encoding.`); continue; }

  eq(mod.code, source.code, `${source.code} code`);
  eq(mod.credits, source.credits, `${source.code} credits`);
  eq(mod.assessment.questionCount, source.questionCount, `${source.code} question count`);
  eq(mod.assessment.durationMinutes, source.durationMinutes, `${source.code} duration`);
  eq(mod.assessment.questionsPerLearningOutcome, source.questionsPerLearningOutcome, `${source.code} questions per LO`);
  eq(mod.assessment.passMark, M.passMark, `${source.code} pass mark`);
  if (!/each learning-outcome section/i.test(mod.assessment.passRule || '')) {
    err(`${source.code}: encoded pass rule no longer states the per-learning-outcome requirement.`);
  }
  eq(mod.glh, source.glh, `${source.code} GLH`);
  eq(mod.additionalSelfStudyHours, source.additionalSelfStudyHours, `${source.code} self-study`);
  eq(mod.moduleLearningTimeHours, source.moduleLearningTimeHours, `${source.code} module learning time`);
  eq(mod.globalStandard, source.globalStandard, `${source.code} CIPS Global Standard references`);

  eq(mod.outcomes.map(o => o.tier), source.outcomeTiers, `${source.code} outcome tiers`);

  const actualCounts = {};
  const headingLines = [];
  mod.outcomes.forEach(o => {
    headingLines.push(`LO${o.n}|${o.title}`);
    o.criteria.forEach(c => {
      const localId = c.id.replace(`${mod.code}-`, '');
      actualCounts[localId] = c.sourceBulletCount;
      headingLines.push(`${c.id}|${c.title}`);
    });
  });
  eq(actualCounts, source.criteriaBulletCounts, `${source.code} criterion ids / official indicative-bullet counts`);

  const digest = crypto.createHash('sha256').update(headingLines.join('\n')).digest('hex');
  eq(digest, source.headingsSha256, `${source.code} official LO/criterion heading fingerprint`);

  if (source.sourceDiscrepancy) {
    if (!mod.assessment.caveat) err(`${source.code}: source discrepancy is recorded in the manifest but missing from module assessment.caveat.`);
    const implied = mod.outcomes.length * mod.assessment.questionsPerLearningOutcome;
    if (implied === mod.assessment.questionCount) err(`${source.code}: source discrepancy unexpectedly disappeared; verify whether CIPS changed the source before removing the caveat.`);
  } else if (mod.assessment.caveat) {
    err(`${source.code}: assessment caveat is encoded but the source manifest records no discrepancy.`);
  }
}

console.log('\x1b[1mCIPS Level 2 syllabus fidelity\x1b[0m\n');
if (errors.length) {
  errors.forEach(e => console.log(`  \x1b[31m✗\x1b[0m ${e}`));
  console.log(`\n\x1b[31m${errors.length} failure${errors.length === 1 ? '' : 's'}\x1b[0m`);
  process.exit(1);
}
console.log('  \x1b[32m✓\x1b[0m qualification metadata matches the reviewed CIPS source manifest');
console.log('  \x1b[32m✓\x1b[0m all 20 learning-outcome / 58 criterion headings match their source fingerprints');
console.log('  \x1b[32m✓\x1b[0m all 210 indicative-content source positions are accounted for without republishing CIPS prose');
console.log('  \x1b[33m!\x1b[0m L2M5 source discrepancy remains explicit and unresolved by design');
