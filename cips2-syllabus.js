/* CIPS Level 2 — machine-readable qualification spine.
 *
 * Qualification: CIPS Level 2 Certificate in Procurement and Supply Operations
 * Qualification accreditation number: 603/3282/7
 *
 * The current CIPS qualification page, Full syllabus and qualification
 * specification were reviewed on 2026-09-02. CIPS restricts reproduction of
 * its syllabus, so the short outcome/criterion headings are retained for
 * mapping while indicative content is independently paraphrased in the five
 * module files. See docs/reference/cips-l2-source-notes.md.
 *
 * IMPORTANT: the current source says L2M5 has 36 questions and 9 per learning
 * outcome, but its syllabus has only 3 outcomes (3 × 9 = 27). The module keeps
 * that discrepancy explicit; no mock allocation should guess the missing nine.
 */
(function (root) {
  'use strict';

  var modules;
  if (typeof require === 'function' && typeof module === 'object') {
    modules = {
      l2m1: require('./cips2-l2m1-syllabus.js'),
      l2m2: require('./cips2-l2m2-syllabus.js'),
      l2m3: require('./cips2-l2m3-syllabus.js'),
      l2m4: require('./cips2-l2m4-syllabus.js'),
      l2m5: require('./cips2-l2m5-syllabus.js')
    };
  } else {
    modules = root.CIPS2_MODULES || {};
  }

  var SYLLABUS = {
    awardingBody: 'CIPS',
    level: 2,
    title: 'Certificate in Procurement and Supply Operations',
    qualificationNumber: '603/3282/7',
    syllabusLabel: '2018 Syllabus, Version 1',
    sourceReviewed: '2026-09-02',
    credits: 18,
    totalQualificationTimeHours: 180,
    guidedLearningHours: 120,
    additionalSelfStudyHours: 54,
    totalExamHours: 6,
    entryRequirements: 'None',
    modules: modules
  };

  root.CIPS2_SYLLABUS = SYLLABUS;
  if (typeof module !== 'undefined' && module.exports) module.exports = { SYLLABUS: SYLLABUS };
})(typeof window !== 'undefined' ? window : globalThis);
