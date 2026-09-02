# CIPS Level 2 — implementation record

Status: **Phase 1 source spine complete; learner-facing implementation not yet exposed.**

## Purpose

Add the CIPS Level 2 Certificate in Procurement and Supply Operations as a textbook-style qualification pathway, following the repository's AAT Level 3 standard: sequential teaching in plain English, worked application, frequent checks, independent practice, specification-level progress and realistic module assessments.

## Phase 1 completed

- Reviewed the current CIPS Level 2 qualification page, Full syllabus and qualification specification on 2026-09-02.
- Encoded the complete five-module qualification spine: 20 learning outcomes, 58 assessment criteria and 210 indicative-content source positions.
- Split module data into separate files so later learner content can grow without turning one syllabus file into a monolith.
- Retained short official learning-outcome / assessment-criterion headings for mapping while independently paraphrasing longer indicative content, avoiding republication of CIPS syllabus prose.
- Added a compact source manifest and source-review record under `docs/reference/`.
- Added structural integrity and source-fidelity gates and wired both into `npm test` and CI.
- Preserved the current published L2M5 assessment discrepancy instead of guessing a missing question allocation.

## Deliberate UX decision

CIPS is **not yet registered in the subject switcher**. A visible qualification with no complete reader or module would be a dead end. It should appear only when the CIPS renderer, progress model and the complete L2M1 vertical slice meet the same browser/layout gates as the existing self-rendering subjects.

## Next implementation milestone

Build L2M1 end to end as the reference module:

1. CIPS-specific qualification/module picker and sequential path, using AAT Level 3 as the interaction-quality benchmark.
2. Orientation lessons that explain procurement and the qualification before syllabus coverage begins.
3. Complete teaching for all six L2M1 learning outcomes and all 13 assessment criteria.
4. Inline understanding checks, outcome checkpoints and independent practice questions tagged to criteria.
5. Learning-outcome-level progress, mistake memory and spaced review.
6. A 72-question / 120-minute L2M1 mock respecting the published 70% per-learning-outcome pass rule.
7. Mobile, keyboard, dark-mode, back-navigation, subject-switch and accessibility QA before the subject is exposed.

## Release rule

No CIPS module is marked complete unless every source criterion is taught, every source indicative-content position is accounted for, checks exist behind the teaching, independent practice exists behind the criterion, and all CIPS-specific quality gates pass.
