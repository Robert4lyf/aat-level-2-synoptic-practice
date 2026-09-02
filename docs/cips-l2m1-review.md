# CIPS Level 2 — L2M1 vertical slice review record

Status: adversarial review complete; release is conditional only on CI being green on this final document/code head.

## Scope

This milestone turns the audited L2M1 syllabus spine into a usable learner experience. It deliberately does **not** claim to be an official CIPS mock exam and does not expose unfinished L2M2–L2M5 teaching as clickable course content.

Implemented learner scope:

- 13 lessons — exactly one owning lesson for each L2M1 assessment criterion.
- Card-level mappings to all 69 indicative-content positions recorded in the audited syllabus spine.
- 26 lesson checkpoint questions (two per lesson).
- 48 original practice questions — eight per learning outcome, with correct-answer positions balanced 2/2/2/2 inside every LO.
- At least half of practice questions require application to a short context rather than pure recall.
- Persistent lesson, checkpoint, practice-by-LO and theme state under `prep_v2_cips2`.
- Shared progress backup/sync transport is loaded on the CIPS page and initialised on direct entry; a remote merge reloads the learner surface from the merged store.
- A responsive CIPS reader, module map, practice runner, progress view and searchable glossary.
- Entry through the shared subject picker, preserving the previously active subject when the reader returns.

## Assessment claims

The UI may state the assessment facts carried by `cips2-l2m1-syllabus.js`: 72 objective-response questions, 120 minutes, 12 questions per learning outcome and a 70% pass requirement per LO section. The app's 48-question bank is labelled original practice material and must not be described as CIPS past-paper, sample-assessment or official-mock content.

## UX release rule

CIPS is allowed into the subject picker only because the visible path now has a complete first module. L2M2–L2M5 appear only as non-interactive pathway context until their own learning content meets the same source-coverage and browser gates.

The CIPS reader must pass at 390px and 1280px without horizontal overflow, preserve touch targets of at least 40px on primary chrome, retain completion/theme state across reload, provide immediate explanatory feedback, and keep the learner's previous main-app subject intact on return.

The 13 lessons are one sequential textbook path even though the module map groups them by learning outcome. The DOM-visible step labels therefore run 1–13 rather than restarting inside each LO. Once all 13 are complete, the overview primary action becomes Review L2M1 and opens the module map rather than unexpectedly reopening lesson 1.

## Architecture decision

The main app's subject registry currently lives inside a very large `app.js`. This slice does not edit that shared engine merely to add CIPS. `cips2-bridge.js` clones the existing subject-card component and intercepts only the CIPS card before the registry's delegated handler runs. CIPS then owns its learner page and storage.

This is an explicit seam, not hidden debt. If the subject registry is later extracted into its own module, CIPS should become a normal first-class registry entry and the bridge should be removed. Until then the bridge has its own browser regression test.

## Automated adversarial evidence

`check-cips2-l2m1-adversarial.js` deliberately introduces and requires rejection of all of the following:

1. dropped indicative-content coverage;
2. an invented assessment criterion;
3. a lesson mapped to the wrong learning outcome;
4. a duplicate practice-question ID;
5. a correct-answer position cue;
6. an underfilled learning-outcome bank;
7. an invalid answer index;
8. a missing explanation.

`check-cips2-render.js` additionally drives the real learner surface and checks the 390px/1280px layouts, named controls and touch targets, the DOM-visible 1–13 sequence, all 13 lesson openings, checkpoint feedback and persistence, practice grading and LO recording, dark-mode persistence, the completed-course Review action, progress transport availability, and subject-picker entry/return behaviour.

`check-cips2-offline.js` proves the service worker controls the CIPS page, required CIPS assets are installed, and L2M1 renders after the browser is taken offline.

## Manual/adversarial review findings

1. **Sequential numbering reset inside each LO — fixed.** The first module-map implementation displayed 1,2,3 then restarted at 1 in LO2. The course is now represented as one 1–13 sequence. A first visual-only CSS counter fix was rejected because it would not give assistive technology the same sequence; the final fix changes the actual DOM labels.
2. **MutationObserver feedback-loop risk — fixed.** The sequence helper initially rewrote `textContent` every time its observed subtree mutated. Because that rewrite creates a child-list mutation, it could trigger itself indefinitely. It now writes only when the current number differs from the required value.
3. **Completed-course CTA reopened lesson 1 — fixed.** With no unfinished lesson, the overview's fallback target was lesson 1 while the label still said Continue learning. The completed state now says Review L2M1 and opens the module map.
4. **Direct CIPS visits did not initialise cross-device sync — fixed.** The page now loads the shared backup/sync modules and calls `ProgressSync.init()`. If a remote pull changes local state, the page reloads from the merged store.
5. **Syllabus coverage/depth — pass.** Every audited source position is mapped to teaching and every criterion has practice. Manual sampling across all six LOs found no assessed concept presented without an explanatory route before checking it.
6. **Beyond-syllabus material — one low-severity enrichment note.** The LO3 customer/supply-chain lesson mentions the “bullwhip effect” when discussing poor information. That term is not one of the audited L2M1 indicative-content positions, is not used as a required definition, and is not assessed by a checkpoint/practice item. Treat it as optional context, not required CIPS knowledge. A later editorial pass may remove or briefly define it for beginner clarity.
7. **Distractor ambiguity — no blocking issue found.** Manual sampling across the six LO banks found distractors plausible enough to require understanding while leaving one clearly best answer under the taught material. Automated gates additionally reject invalid answer keys, duplicate options and position imbalance.
8. **Subject-picker isolation — pass.** The bridge does not write `multisubject_active`; the browser gate verifies a learner can enter CIPS and return with the previously active main-app subject unchanged.
9. **Responsive/accessibility surface — pass subject to final CI.** Browser tests cover 390px and 1280px horizontal overflow, accessible button naming and primary touch targets. Key light/dark text pairs were also spot-checked for readable contrast; no blocking contrast issue was identified. The sequence-number fix is DOM-visible rather than CSS-only.
10. **Offline boundary — pass subject to final CI.** The CIPS page, bridge, stylesheet, register helper and all L2M1 data are part of the versioned core install, while the existing shared progress scripts were already core assets.
11. **Progress/merge compatibility — pass.** CIPS uses the existing `prep_v2_*` naming convention picked up by generic backup/export. Its lesson and practice records are monotonic progress data, and the existing backup/sync regression suites remain part of CI alongside the CIPS browser integration check.

## Known non-blocking debt

- `cips2-bridge.js` exists only because the shared subject registry is still embedded in `app.js`. Extracting the registry should remove this bridge rather than making more bridge variants.
- L2M2–L2M5 must reuse this CIPS learner surface and quality model, not become disconnected standalone pages.
- The optional “bullwhip effect” enrichment phrase should be reconsidered during the next editorial/content-depth pass.

No known release-blocking issue remains in the reviewed implementation. A merge recommendation is valid only after both CI jobs succeed on the final head containing this record.
