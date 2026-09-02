# CIPS Level 2 — L2M1 vertical slice review record

Status: implementation branch; update this record before merge.

## Scope

This milestone turns the audited L2M1 syllabus spine into a usable learner experience. It deliberately does **not** claim to be an official CIPS mock exam and does not expose unfinished L2M2–L2M5 teaching as clickable course content.

Implemented learner scope:

- 13 lessons — exactly one owning lesson for each L2M1 assessment criterion.
- Card-level mappings to all 69 indicative-content positions recorded in the audited syllabus spine.
- 26 lesson checkpoint questions (two per lesson).
- 48 original practice questions — eight per learning outcome, with correct-answer positions balanced 2/2/2/2 inside every LO.
- At least half of practice questions require application to a short context rather than pure recall.
- Persistent lesson, checkpoint, practice-by-LO and theme state under `prep_v2_cips2`.
- A responsive CIPS reader, module map, practice runner, progress view and searchable glossary.
- Entry through the shared subject picker, preserving the previously active subject when the reader returns.

## Assessment claims

The UI may state the assessment facts carried by `cips2-l2m1-syllabus.js`: 72 objective-response questions, 120 minutes, 12 questions per learning outcome and a 70% pass requirement per LO section. The app's 48-question bank is labelled original practice material and must not be described as CIPS past-paper, sample-assessment or official-mock content.

## UX release rule

CIPS is allowed into the subject picker only because the visible path now has a complete first module. L2M2–L2M5 appear only as non-interactive pathway context until their own learning content meets the same source-coverage and browser gates.

The CIPS reader must pass at 390px and 1280px without horizontal overflow, preserve touch targets of at least 40px on primary chrome, retain completion/theme state across reload, provide immediate explanatory feedback, and keep the learner's previous main-app subject intact on return.

## Architecture decision

The main app's subject registry currently lives inside a very large `app.js`. This slice does not edit that shared engine merely to add CIPS. `cips2-bridge.js` clones the existing subject-card component and intercepts only the CIPS card before the registry's delegated handler runs. CIPS then owns its learner page and storage.

This is an explicit seam, not hidden debt. If the subject registry is later extracted into its own module, CIPS should become a normal first-class registry entry and the bridge should be removed. Until then the bridge has its own browser regression test.

## Adversarial review required before merge

The automated review must prove the content gate rejects at least these corruptions: dropped source coverage, invented criterion, wrong LO, duplicate question ID, answer-position cue, underfilled LO bank, invalid answer index, and missing explanation.

The final human/code review must additionally challenge:

1. whether any lesson introduces an assessed concept without enough explanation;
2. whether any teaching statement goes materially beyond the audited syllabus and is presented as though CIPS requires it;
3. whether the practice distractors are plausible without being ambiguous;
4. whether the subject-picker bridge can accidentally change `multisubject_active`;
5. whether phone chrome, long criterion titles or feedback can overflow;
6. whether dark mode produces readable contrast on every functional state;
7. whether offline caching includes the page, bridge, stylesheet and all L2M1 data;
8. whether completion and practice records remain compatible with generic progress backup/merge behaviour.
