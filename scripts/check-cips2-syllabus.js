#!/usr/bin/env node
'use strict';

const path = require('path');
const ROOT = path.join(__dirname, '..');
const S = require(path.join(ROOT, 'cips2-syllabus.js')).SYLLABUS;

const errors = [];
const notes = [];
const seenCriteria = new Set();

function err(message) { errors.push(message); }
function sum(xs) { return xs.reduce((a, b) => a + b, 0); }

if (!S || !S.modules) err('cips2-syllabus.js did not export SYLLABUS.modules.');
if (S.awardingBody !== 'CIPS') err(`awardingBody is ${JSON.stringify(S.awardingBody)}, expected CIPS.`);
if (S.level !== 2) err(`level is ${S.level}, expected 2.`);
if (S.qualificationNumber !== '603/3282/7') err(`qualification number is ${S.qualificationNumber}, expected 603/3282/7.`);

const moduleEntries = Object.entries(S.modules || {});
const expectedKeys = ['l2m1', 'l2m2', 'l2m3', 'l2m4', 'l2m5'];
if (moduleEntries.map(([k]) => k).join(',') !== expectedKeys.join(',')) {
  err(`module keys/order are [${moduleEntries.map(([k]) => k).join(', ')}], expected [${expectedKeys.join(', ')}].`);
}

let outcomeCount = 0;
let criterionCount = 0;
let bulletCount = 0;

for (const [key, m] of moduleEntries) {
  const where = m.code || key;
  if (m.code.toLowerCase() !== key) err(`${where}: registry key ${key} does not match module code.`);
  if (!m.title || typeof m.title !== 'string') err(`${where}: missing title.`);
  if (![3, 6].includes(m.credits)) err(`${where}: unexpected credit value ${m.credits}.`);
  if (!Array.isArray(m.globalStandard) || !m.globalStandard.length) err(`${where}: no CIPS Global Standard references.`);

  const a = m.assessment || {};
  if (a.method !== 'Objective Response') err(`${where}: assessment method must be Objective Response.`);
  if (a.delivery !== 'computer-based examination') err(`${where}: assessment delivery is not recorded as computer-based examination.`);
  if (![36, 72].includes(a.questionCount)) err(`${where}: unexpected question count ${a.questionCount}.`);
  if (![60, 120].includes(a.durationMinutes)) err(`${where}: unexpected duration ${a.durationMinutes}.`);
  if (a.passMark !== 70) err(`${where}: pass mark ${a.passMark}; source says 70.`);
  if (!/each learning-outcome section/i.test(a.passRule || '')) err(`${where}: pass rule does not preserve the per-learning-outcome requirement.`);

  const examHours = a.durationMinutes / 60;
  if (m.glh + m.additionalSelfStudyHours + examHours !== m.moduleLearningTimeHours) {
    err(`${where}: ${m.glh} GLH + ${m.additionalSelfStudyHours} self-study + ${examHours} exam != ${m.moduleLearningTimeHours} module learning hours.`);
  }

  if (!Array.isArray(m.outcomes) || !m.outcomes.length) {
    err(`${where}: no learning outcomes.`);
    continue;
  }

  m.outcomes.forEach((o, oi) => {
    outcomeCount++;
    if (o.n !== oi + 1) err(`${where}: outcome sequence jumps at ${o.n}; expected ${oi + 1}.`);
    if (!['know', 'understand'].includes(o.tier)) err(`${where} LO${o.n}: invalid tier ${JSON.stringify(o.tier)}.`);
    if (!o.title || typeof o.title !== 'string') err(`${where} LO${o.n}: missing title.`);
    if (!Array.isArray(o.criteria) || !o.criteria.length) err(`${where} LO${o.n}: no assessment criteria.`);

    (o.criteria || []).forEach((c) => {
      criterionCount++;
      const expectedPrefix = `${m.code}-${o.n}.`;
      if (!c.id.startsWith(expectedPrefix)) err(`${where} LO${o.n}: criterion ${c.id} has wrong prefix; expected ${expectedPrefix}x.`);
      if (seenCriteria.has(c.id)) err(`${c.id}: duplicate assessment-criterion id.`);
      seenCriteria.add(c.id);
      if (!c.title || typeof c.title !== 'string') err(`${c.id}: missing title.`);
      if (!Number.isInteger(c.sourceBulletCount) || c.sourceBulletCount < 1) err(`${c.id}: invalid sourceBulletCount ${c.sourceBulletCount}.`);
      if (!Array.isArray(c.indicative)) err(`${c.id}: indicative content is not an array.`);
      else {
        bulletCount += c.indicative.length;
        if (c.indicative.length !== c.sourceBulletCount) {
          err(`${c.id}: ${c.indicative.length} paraphrased indicative items but sourceBulletCount is ${c.sourceBulletCount}.`);
        }
        c.indicative.forEach((item, i) => {
          if (typeof item !== 'string' || item.trim().length < 4) err(`${c.id} indicative ${i + 1}: empty or too short.`);
        });
      }
    });
  });

  /* This would normally be an invariant, but L2M5 is the source exception we
     must expose rather than "fix". Everything else must reconcile exactly. */
  const impliedQuestions = m.outcomes.length * a.questionsPerLearningOutcome;
  if (impliedQuestions !== a.questionCount) {
    if (m.code !== 'L2M5') {
      err(`${where}: ${m.outcomes.length} outcomes × ${a.questionsPerLearningOutcome} questions/LO = ${impliedQuestions}, not ${a.questionCount}.`);
    } else if (!a.caveat || !/36/.test(a.caveat) || !/27|3 × 9/.test(a.caveat)) {
      err('L2M5: the published question-allocation discrepancy exists but is not explicitly documented in assessment.caveat.');
    } else {
      notes.push('L2M5 source discrepancy retained: 36 total questions vs 3 outcomes × 9 questions/LO.');
    }
  }
}

const modules = moduleEntries.map(([, m]) => m);
const credits = sum(modules.map(m => m.credits));
const glh = sum(modules.map(m => m.glh));
const selfStudy = sum(modules.map(m => m.additionalSelfStudyHours));
const examHours = sum(modules.map(m => m.assessment.durationMinutes)) / 60;
const learningTime = sum(modules.map(m => m.moduleLearningTimeHours));

if (credits !== S.credits || credits !== 18) err(`module credits total ${credits}; qualification records ${S.credits}; source says 18.`);
if (glh !== S.guidedLearningHours || glh !== 120) err(`module GLH total ${glh}; qualification records ${S.guidedLearningHours}; source says 120.`);
if (selfStudy !== S.additionalSelfStudyHours || selfStudy !== 54) err(`module self-study total ${selfStudy}; qualification records ${S.additionalSelfStudyHours}; source says 54.`);
if (examHours !== S.totalExamHours || examHours !== 6) err(`module exam time totals ${examHours}h; qualification records ${S.totalExamHours}; source says 6.`);
if (learningTime !== S.totalQualificationTimeHours || learningTime !== 180) err(`module learning time totals ${learningTime}; qualification records ${S.totalQualificationTimeHours}; source says 180.`);
if (outcomeCount !== 20) err(`found ${outcomeCount} learning outcomes; source spine should contain 20.`);
if (criterionCount !== 58) err(`found ${criterionCount} assessment criteria; source spine should contain 58.`);
if (bulletCount !== 210) err(`found ${bulletCount} indicative-content items; source spine should contain 210.`);

console.log('\x1b[1mCIPS Level 2 syllabus integrity\x1b[0m\n');
notes.forEach(n => console.log(`  \x1b[33m!\x1b[0m ${n}`));
if (errors.length) {
  errors.forEach(e => console.log(`  \x1b[31m✗\x1b[0m ${e}`));
  console.log(`\n\x1b[31m${errors.length} failure${errors.length === 1 ? '' : 's'}\x1b[0m`);
  process.exit(1);
}
console.log(`  \x1b[32m✓\x1b[0m 5 modules · ${outcomeCount} learning outcomes · ${criterionCount} assessment criteria · ${bulletCount} indicative items`);
console.log(`  \x1b[32m✓\x1b[0m ${credits} credits · ${glh} GLH · ${selfStudy} self-study hours · ${examHours} exam hours · ${learningTime} TQT`);
