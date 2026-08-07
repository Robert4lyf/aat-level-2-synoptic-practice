# AAT Level 2 Synoptic — audit and implementation plan

> **Status: all five phases implemented** (v1.1.0). See §7 for what shipped and
> the measured before/after figures.

**Date:** August 2026 · **Scope:** the AAT study experience only (`data.js`, `skills.js`,
`learn-data.js`, and the AAT paths through `app.js`). The French/DELF/LSF/code-route
subjects are explicitly out of scope.

---

## 1. Method

Two things were checked independently:

1. **Fidelity** — does the app model the assessment students actually sit? Compared
   against the AAT Q2022 synoptic assessment specification (as reproduced in Kaplan's
   BESY exam kit) and a full Q2022 BESY mock paper.
2. **Instrument quality** — do the questions measure knowledge? Ran statistical checks
   over all 563 questions for answer-key cues, format coverage and topic balance.

### Ground truth established

From the AAT Q2022 synoptic assessment specification:

> All units within the Level 2 Certificate in Accounting are mandatory. Three units are
> assessed individually in end of unit assessments, but this qualification also includes
> a synoptic assessment, sat towards the end of the qualification, which draws on and
> assesses knowledge and understanding from across the qualification.
>
> - Introduction to Bookkeeping — end of unit assessment
> - Principles of Bookkeeping Controls — end of unit assessment
> - Principles of Costing — end of unit assessment
> - The Business Environment — assessed within the synoptic assessment only
>
> **Note that Principles of Costing is a unit assessment only and is not assessed as part
> of the synoptic assessment.** Note also that The Business Environment is assessed in the
> synoptic assessment only.

And the actual paper: **2 hours, 8 tasks, 100 marks.** Task blueprint from a Q2022 BESY
mock:

| Task | Marks | Content | Marking |
|---:|---:|---|---|
| 1 | 10 | Different business types and their functions | computer |
| 2 | 13 | The finance function, its information requirements and sources, role in the wider organisation | computer |
| 3 | 14 | CSR, ethics and sustainability | computer |
| 4 | **22** | Processing bookkeeping transactions **and communicating information** | **human** |
| 5 | 10 | Control accounts, reconciliations, journals to correct accounts | computer |
| 6 | 7 | Principles of contract law | computer |
| 7 | 10 | Bookkeeping systems, receipts and payments, information and data security | **human** |
| 8 | 14 | The external business environment | computer |

Derived weighting by source unit: **BESY ≈ 58 marks of pure-BESY tasks · POBC ≈ 10 · POC = 0**,
with Tasks 4 and 7 (32 marks) split between bookkeeping content and the BESY
communication/data-security elements they also name. Treating those two tasks as
wholly ITBK overstates it; the implemented split works out at roughly
**BESY ≈ 70 · ITBK ≈ 20 · POBC ≈ 10 · POC = 0**.
**32 of 100 marks are human-marked extended written response.**

---

## 2. What the app already does well

These are genuine strengths and should not be disturbed by the work below.

- **Question formats beyond MCQ.** `dragdrop`, `tablefill`, `gapfill`, `numeric` (with
  live-generated values via `generate()`) and multi-part `scenario` questions. The
  `tablefill` control-account questions are a good match for real exam tasks.
- **Option shuffling.** `presentQuestion()` (`app.js:1454`) reshuffles MCQ options at
  render time. The source data has a severe answer-position bias (74% of keys sit at
  index 1) but students never see it. Worth a regression test so it stays that way.
- **Spaced repetition.** `srSchedule()` (`app.js:729`) is a sound SM-2-lite with ease
  factors, and `srMigrate()` handles legacy Leitner records cleanly.
- **Skill taxonomy.** `skills.js` tags every question by rule, powering targeted drills,
  the weakness dashboard and hints. Good architecture.
- **Data validator.** `scripts/validate-aat-data.js` catches structural faults —
  out-of-range keys, duplicate options, generators that throw, gapfill placeholder
  mismatches, and same-stem/different-key contradictions. Runs in CI.

---

## 3. Findings

Ranked by impact on a student's actual exam outcome.

### F1 — The mock exam models an assessment that does not exist · **critical**

`MOCK_BLUEPRINT` (`app.js:169`) builds a 55-question paper with four units split evenly:
ITBK 14, POBC 14, **POC 14**, BESY 13. The real synoptic contains **no Principles of
Costing at all**, and BESY is not one-quarter of it but roughly **58%**.

The practical effect: a student preparing on this app spends **a quarter of their
synoptic revision on a unit that cannot appear in the synoptic**, while the unit that
dominates the paper is under-weighted by more than half.

### F2 — `UNIT_EXAM_WEIGHT` tells students something false · **critical**

```js
const UNIT_EXAM_WEIGHT = { itbk: 40, pobc: 30, poc: 15, besy: 15 };   // app.js:671
```

Rendered to the learner as `~15% of synoptic` on each unit card (`app.js:4486`). Every
one of the four numbers is wrong, and two are wrong in a way that actively misdirects
revision: POC is shown as 15% when it is 0%, and BESY as 15% when it is ~58%.

### F3 — No practice for the 32 marks of written response · **critical**

The bank has no free-text question type at all — `mcq`, `numeric`, `dragdrop`,
`tablefill`, `scenario`, `gapfill` only, and `scenario` parts are just `mcq` (98) and
`numeric` (33). Tasks 4 and 7 are human-marked because they require drafting — an email
to a colleague, a note explaining a discrepancy, advice on data security. **Task 4 alone
is 22 marks, the largest single task in the paper.** A student could reach 100% in this
app and have never once written a sentence of prose.

### F4 — 58% of MCQs are answerable from answer length alone · **high**

Across the 449 four-option MCQs, the correct answer is the longest option **262 times
(58.4%)** — against 25% by chance. In 182 cases (40.5%) the key is more than 1.6× the
average distractor length, and in 167 cases (37.2%) all three distractors are under 18
characters. The bias is uniform across topics (itbk 67, pobc 65, poc 58, besy 72), so it
is a house style, not a few bad questions.

Option shuffling does not help here — reordering does not change which option is longest.
A student who reads nothing and always picks the longest option scores ~58%. Typical of
the pattern:

> **What is an example of CSR?** — Tax evasion · *Environmental reporting* · Price fixing · Monopoly behaviour
>
> **The finance function primarily:** — Manages social media · *Records and reports financial information to support decision-making* · Develops new products · Handles staff recruitment

This inflates practice scores, so the app's readiness signal is optimistic — the failure
mode that matters most in exam prep.

### F5 — BESY bank is weighted inversely to the real paper · **high**

Keyword classification of the 126 BESY questions against the eight BESY syllabus areas,
next to the marks each carries in the real paper:

| Syllabus area | App questions | Real marks | Verdict |
|---|---:|---:|---|
| External business environment | 47 | 14 | heavily over-weighted |
| Business types & entities | 25 | 10 | over-weighted |
| Contract law | 15 | 7 | roughly right |
| CSR, ethics & sustainability | 12 | 14 | under-weighted |
| Role of information / data security | 8 | 10 | under-weighted |
| English legal system | 7 | — | folded into contract law |
| **Business communication & planning** | **6** | **~22** | **severely under-weighted** |
| **The finance function** | **5** | **13** | **severely under-weighted** |

The two thinnest areas in the bank are the two biggest tasks in the exam.

### F6 — Scoring is question-count, not marks · **medium**

`finishMock()` (`app.js:2464`) does `if (correct) score++` and computes
`score / questions.length`. Real tasks carry 7–22 marks and individual parts carry 1–4.
A student's mock percentage therefore does not predict their real percentage, and the
70% pass line is being applied to a differently-shaped number.

### F7 — Two ubiquitous answer formats are missing · **medium**

Every MCQ in the bank has exactly four options and a single key (`opts` length is 4 for
all 449; zero two-option items). The real paper leans heavily on:

- **True/false statement grids** — "Identify whether the following statements about
  charities are true or false" (4 marks, four statements). Appears in Tasks 1, 6 and
  others.
- **Multi-select** — "Which **TWO** of the following statements are **NOT** correct".

Neither is representable in the current schema.

### F8 — The Level 3 bridge is out of date · **medium**

`L3_BRIDGE` (`app.js:620`) describes the AQ2016 qualification, not Q2022:

| App says | Reality under Q2022 |
|---|---|
| `AVBK` Advanced Bookkeeping | Does not exist — merged into FAPS |
| `FAPS` Final Accounts Preparation | Renamed **Financial Accounting: Preparing Financial Statements** |
| `MATS` Management Accounting: Costing | Renamed **Management Accounting Techniques** |
| `PSYA` Professional Synoptic Assessment | **Removed** at Level 3 (except apprentices' EPA) |
| "5 units + synoptic" (`app.js:4519`) | **4 units, no synoptic** |

A student planning their next step is being told to prepare for an exam that was
withdrawn.

### F9 — Learn-path gaps in BESY · **medium**

The ten BESY lessons (`learn-data.js`) cover ethics (×3), technology (×2), economics (×2),
sources of finance, employment/consumer law and a Level 3 bridge. Against the eight-chapter
BESY syllabus there is **no lesson on business communication and planning** (the 22-mark
task) and **none on the finance function's role and information needs** (13 marks).
"Sources of finance" is closer to Level 3 Business Awareness than to L2 BESY.

### F10 — POC has no home once removed from the synoptic · **medium**

POC is a real 90-minute unit assessment. Stripping it from the synoptic mock (F1) is
correct but leaves it unpractised unless a unit-assessment mode exists. The app currently
has topic practice and unit quizzes but no timed, exam-shaped unit mock.

### F11 — The `synoptic` pseudo-topic is the right idea, under-built · **low**

Six cross-unit `scenario` questions (`sc-025`–`sc-030`) sit under a `synoptic` pseudo-topic.
The concept is right; three of the six are POC-based (break-even, inventory valuation,
marginal costing) and so are out of synoptic scope.

---

## 4. Implementation plan

Five phases. Phase 1 is the one that changes outcomes; the rest compound on it.
Sizes are relative: **S** ≈ half a day, **M** ≈ 1–2 days, **L** ≈ 3–5 days.

### Phase 1 — Make the synoptic mock the real synoptic · **M** · fixes F1, F2, F6, F10

**1.1 Replace the blueprint.** Rewrite `MOCK_BLUEPRINT` (`app.js:169`) as an eight-task,
marks-weighted structure matching the real paper, with a `marks` field per task and a
`marks` field per question:

```js
const SYNOPTIC_BLUEPRINT = [
  { n: 1, title: 'Business types and their functions',        area: 'besy-structure', marks: 10 },
  { n: 2, title: 'The finance function and its information',  area: 'besy-finance',   marks: 13 },
  { n: 3, title: 'CSR, ethics and sustainability',            area: 'besy-ethics',    marks: 14 },
  { n: 4, title: 'Bookkeeping transactions and communicating information',
                                              area: ['itbk', 'besy-comms'], marks: 22, written: true },
  { n: 5, title: 'Control accounts, reconciliations and journals', area: 'pobc',       marks: 10 },
  { n: 6, title: 'Principles of contract law',                area: 'besy-law',       marks: 7  },
  { n: 7, title: 'Bookkeeping systems, receipts, payments and data security',
                                              area: ['itbk', 'besy-tech'],  marks: 10, written: true },
  { n: 8, title: 'The external business environment',         area: 'besy-econ',      marks: 14 },
];
```

Selection must fill each task to its mark allocation rather than to a question count.

**1.2 Exclude POC from the synoptic.** Filter it out of synoptic selection entirely, and
add a validator assertion that no POC question can be drawn into a synoptic mock — this is
the rule most likely to be silently reintroduced later.

**1.3 Marks-based scoring.** Change `finishMock()` (`app.js:2464`) to accumulate
`q.marks` rather than `score++`, and compute the percentage against total marks. Show the
per-task mark breakdown on the results screen so students see where marks were lost — this
is how AAT feedback is structured.

**1.4 Add unit-assessment mocks.** Three new timed modes at 90 minutes each — ITBK, POBC,
POC — so POC keeps a realistic home and each unit exam is practised in its own shape.

**1.5 Correct `UNIT_EXAM_WEIGHT`.** Replace with a structure that distinguishes the two
routes, since a single percentage cannot express it:

```js
const UNIT_ASSESSMENT = {
  itbk: { ownExam: '90 min unit assessment', synopticMarks: 32 },
  pobc: { ownExam: '90 min unit assessment', synopticMarks: 10 },
  poc:  { ownExam: '90 min unit assessment', synopticMarks: 0  },
  besy: { ownExam: null,                     synopticMarks: 58 },
};
```

Update the unit-card copy (`app.js:4486`) to say e.g. *"Own 90-min exam · not assessed in
the synoptic"* for POC, and *"Synoptic only · ~58% of the paper"* for BESY.

**Acceptance:** a generated synoptic mock contains zero POC questions, totals 100 marks
across 8 tasks, and reports a marks-based percentage with a per-task breakdown.

### Phase 2 — Written-response tasks · **L** · fixes F3

The hard part is that these are human-marked, so the app cannot auto-grade them. The
workable model is **structured self-assessment against a rubric**, which is also what
AAT's own study materials do.

**2.1 New `written` question type.** Schema:

```js
{ id: 'wr-001', topic: 'besy', type: 'written', marks: 8,
  setup: 'You are an accounts assistant at PB Limited...',
  task:  'Draft an email to the sales manager explaining the discrepancy...',
  minWords: 60,
  rubric: [
    { point: 'Opens with an appropriate greeting and subject line', marks: 1 },
    { point: 'States the discrepancy figure correctly (£1,240)',     marks: 2 },
    { point: 'Explains the likely cause (duplicate invoice posting)', marks: 2 },
    { point: 'Proposes a specific corrective action',                marks: 2 },
    { point: 'Professional tone, no jargon, closes appropriately',   marks: 1 },
  ],
  modelAnswer: '...' }
```

**2.2 UI.** Textarea with a word counter; on submit, reveal the model answer side by side
with the rubric as a checklist; the student ticks each point they hit and the app records
the self-scored marks. Flag these as self-assessed in history so they never masquerade as
objective marks.

**2.3 Content.** Author 12–16 written tasks: ~10 for Task 4 shapes (email/note explaining
a bookkeeping transaction or discrepancy) and ~6 for Task 7 (data security, bookkeeping
systems, receipts and payments advice).

**2.4 Integration.** `submitWritten()` alongside the existing submit handlers; extend
`presentQuestion()`, `finishMock()` and the results renderer; add `checkWritten()` to the
validator (rubric marks must sum to `q.marks`; `modelAnswer` present and non-empty).

**Acceptance:** synoptic mock Tasks 4 and 7 present written tasks; scoring separates
objective marks from self-assessed marks on the results screen.

### Phase 3 — Repair the answer-length cue · **M** · fixes F4

**3.1 Add a validator rule** to `scripts/validate-aat-data.js` — warn when the key is the
longest option *and* exceeds 1.4× the mean distractor length. Add a bank-level check that
fails CI if the longest-is-correct rate across all MCQs exceeds 35%. Ratchet the threshold
down as the backlog clears rather than trying to fix 262 questions in one pass.

**3.2 Rewrite distractors** for the 182 worst offenders (key > 1.6× average distractor).
The fix is almost always to *lengthen and specify the distractors*, not to shorten the
key — a good distractor is a plausible misconception at comparable length. For the CSR
example above: *"Publishing a sustainability report on environmental impact"* against
*"Minimising the corporation tax charge through group relief"*, *"Setting prices in line
with competitors in the sector"*, *"Maximising short-term returns for shareholders"*.

**3.3 Regression test** asserting `presentQuestion()` shuffles MCQ options, so the latent
74% position bias in the source data can never surface.

**Acceptance:** longest-is-correct rate below 35% and falling; CI enforces the ceiling.

### Phase 4 — Rebalance and extend the BESY bank · **L** · fixes F5, F7, F11

**4.1 Two new question types**, both needed before the content can be authored:

- `truefalse` — `{ statements: [{ text, answer: true|false }], marks: n }`, rendered as a
  statement grid. This is the single most common BESY format.
- `multiselect` — `{ opts, answers: [i, j], selectCount: 2 }`, with the "select TWO"
  constraint enforced in the UI.

Both need `presentQuestion()` support (shuffle statement order / option order), submit
handlers, validator checks, and part-level support inside `scenario`.

**4.2 Author to the real weighting.** Target roughly: finance function +25 questions,
business communication +20, CSR/ethics/sustainability +15, data security +12; retire or
demote roughly 25 of the 47 external-environment questions. Net BESY bank ~200,
distributed in proportion to the task marks in §1.

**4.3 Rework the `synoptic` pseudo-topic.** Retire or re-file the three POC-based scenarios
(`sc-027`, `sc-028`, `sc-029`); add cross-unit scenarios that mirror the real integration —
a bookkeeping transaction that must then be *explained* to a non-finance colleague.

**Acceptance:** BESY question distribution within ±5 percentage points of the real task
weighting; `truefalse` and `multiselect` usable in both practice and mock.

### Phase 5 — Curriculum and accuracy corrections · **M** · fixes F8, F9

**5.1 Rewrite `L3_BRIDGE`** (`app.js:620`) for Q2022: four units (FAPS, MATS, TPFB, BUAW)
with correct titles, no AVBK, no PSYA. Fix "5 units + synoptic" (`app.js:4519`) and the
"Complete all five units... then sit the Professional Synoptic" copy (`app.js:4567`).

**5.2 Add two BESY lessons** — *Business communication and planning* (professional email
and note structure, tone, audience, planning tools) and *The finance function* (its role,
information needs and sources, relationship to the wider organisation) — with matching
skills `besy-comms` and an expanded `besy-finance`.

**5.3 Re-scope `Sources of finance`** toward BESY's finance-function content, or mark it
explicitly as Level 3 preview material.

**5.4 Align the app's own framing.** The subject description (`app.js:19`) says "AQ2022";
the qualification is **Q2022**. Worth correcting wherever it appears.

**Acceptance:** every unit code, title and assessment description in the app matches the
current AAT Q2022 specification.

---

## 5. Sequencing

Phases 1 and 3 are independent and can run in parallel. Phase 2 depends on Phase 1's
marks infrastructure. Phase 4 depends on Phase 2's type-system work being settled.
Phase 5 is independent throughout.

Recommended order if done serially: **1 → 3 → 2 → 4 → 5.** Phase 1 alone removes the
worst misdirection (a quarter of synoptic revision spent out of scope); Phase 3 alone
makes every existing practice score meaningful. Those two together are the highest
value-per-day in the plan.

---

## 6. Verification still needed

These should be confirmed against AAT's official qualification specification before being
hard-coded, since the task blueprint here is drawn from one mock paper and the
specification quote from a publisher's reproduction:

- **Task-level mark allocations vary between sittings.** The 10/13/14/22/10/7/10/14 split
  should be treated as representative, not fixed. Consider expressing the blueprint as
  mark *ranges* per task.
- **Exact ITBK and POBC learning outcomes in synoptic scope.** The specification lists
  "LO1, LO2, LO3" for each, but the mock's Task 7 covers receipts and payments, which maps
  to ITBK LO4 in the published LO list. The LO numbering should be checked against AAT's
  own document rather than inferred.
- **Whether Tasks 4 and 7 are always the human-marked ones**, or whether the positions
  move between sittings.

## Sources

- [AAT Level 2 Certificate in Accounting](https://www.aat.org.uk/qualifications-and-courses/accounting/level-2-certificate-accounting) — unit list
- [AAT Q2022 The Business Environment Synoptic Assessment Exam Kit (Kaplan)](https://kaplanpublishing.co.uk/docs/librariesprovider3/look-inside/aat/level-2-certificate/business-environment/besy-exam-kit.pdf) — synoptic assessment specification, POC exclusion
- [The Business Environment Synoptic Study Text (Kaplan)](https://kaplanpublishing.co.uk/docs/librariesprovider3/look-inside/aat/level-2-certificate/business-environment/besy-study-text.pdf) — eight-chapter syllabus structure
- [Acorn Q2022 AAT L2 The Business Environment Mock Exam One](https://www.acornlive.com/downloads/pdf/Acorn_Q2022_AAT_L2_TheBusinessEnvironment_MockExamOne.pdf) — task blueprint, marks, human-marked tasks
- [AAT Q2022 Level 3 Diploma in Accounting (First Intuition)](https://www.firstintuition.co.uk/fihub/aat-q2022-level-3-diploma-in-accounting/) — Level 3 unit structure
- [AAT Q2022 syllabus change (BPP)](https://www.bpp.com/accountancy-and-tax/aat/q22-advice) — synoptic removal at Levels 3 and 4


---

## 7. What shipped

All five phases were implemented. Verified in a real browser (Chromium via
Playwright) as well as by the CI checks.

### Phase 1 — the synoptic mock is now the synoptic

`SYNOPTIC_BLUEPRINT` replaces the old even-split `MOCK_BLUEPRINT`: eight tasks,
100 marks, each task carrying per-area mark quotas. `SYNOPTIC_EXCLUDED_TOPICS`
keeps Principles of Costing out, and a question that would overshoot a task's
quota is skipped rather than accepted, so generated papers land on the blueprint.

Measured across four generated papers: **98–104 marks, 74–84 questions, zero POC
questions**, unit mix BESY 68–74 / ITBK 20 / POBC 10, written content 12–16 marks.

`finishMock()` now scores by marks, and the results screen carries a **marks-by-task**
breakdown alongside marks-by-topic. `UNIT_ASSESSMENT_INFO` replaces the incorrect
`UNIT_EXAM_WEIGHT`, and unit cards now read e.g. *"90-min unit assessment · not in
the synoptic"* for POC. Three separate 90-minute unit assessments were added
(ITBK, POBC, POC) so costing keeps a realistic home.

### Phase 2 — written response

New `written` type: setup, required task, word-counted textarea, model answer and
an examiner-style rubric the student marks themselves against. Self-assessed
marks are tracked separately from objective marks and labelled as such on the
results screen. **16 written tasks** authored across the Task 4 shapes (email,
note, explanation) and Task 7 shapes (data security, systems, fraud).

### Phase 3 — the answer-length cue

| Measure | Before | After |
|---|---:|---:|
| Correct answer is the longest option | **58.4%** | **34.6%** |
| Key > 1.4× mean distractor | 249 | 25 |
| Key > 2× mean distractor (severe) | 64 | 12 |

**235 questions had their distractors rewritten** — plausible misconceptions at
comparable length, rather than the one-word placeholders that made the key
obvious. The validator now fails the build above a 35% bank-wide rate and warns
per-question above 1.4×; the ceiling is a ratchet and should come down as the
remaining scenario sub-parts are cleared.

`scripts/check-question-integrity.js` guards the option shuffling that keeps the
source data's answer-position bias (68% at one index) invisible to students. The
guard was verified by removing the shuffle and confirming it fails.

### Phase 4 — new formats and BESY rebalance

`truefalse` statement grids (partial credit, one mark per statement) and
`multiselect` ("Which TWO…", all-or-nothing) added end to end — render, submit,
`presentQuestion` shuffling, validator checks. **17 true/false grids and 12
multi-select** authored, plus **20 questions** targeting the two areas the audit
found most starved: the finance function and business communication. The three
costing scenarios were moved out of the `synoptic` pseudo-topic and three genuine
cross-unit scenarios (process, then explain) added in their place.

### Phase 5 — curriculum accuracy

`L3_BRIDGE` rewritten for Q2022: four units (FAPS, MATS, TPFB, BUAW), correct
titles, no `AVBK`, no `PSYA`, and the "5 units + synoptic" and "sit the
Professional Synoptic" copy corrected. Two BESY lessons added — *Business
communication and planning* and *The finance function and its information* —
and "Sources of finance" relabelled as a Level 3 preview. `AQ2022` corrected to
`Q2022` throughout.

### Bank composition after the work

| Type | Count |
|---|---:|
| mcq | 469 |
| scenario | 37 |
| numeric | 30 |
| dragdrop | 19 |
| tablefill | 19 |
| truefalse | 17 |
| written | 16 |
| gapfill | 12 |
| multiselect | 12 |
| **Total** | **631** |

## 8. Depth and correctness pass (v1.3.0)

Prompted by a report from a real mock-exam sitting: *"for a number of questions,
all four possible answers do not correspond at all to the question"*, and
*"some questions and answers are severely lacking depth and quality"*.

### Answer/question mismatch

49 questions had option sets belonging to entirely different questions — damage
introduced by an earlier bulk distractor rewrite that applied option sets to
question IDs it had never read. All 49 were restored from git history (verified
byte-identical to the originals) and then rewritten properly, with full-sentence
options and richer explanations.

A permanent guard now runs in CI: `checkCoherence()` in
`scripts/validate-aat-data.js` flags any question whose correct answer shares no
content word with its own stem or explanation. It was proven to fire by
reintroducing a known corruption. Twelve questions currently trip it; each has
been reviewed by hand and is a false positive — a definition question whose
answer legitimately rewords the stem.

### Explanation depth

79 explanations were under 100 characters. All were rewritten to explain *why*
the answer is right and, where useful, why the distractors are wrong. No `exp`
is now under 100 characters; the mean is 171.

### Two genuine content errors found and fixed

- **sc-018** — the setup said Priya *issues* a credit note, but the scenario
  casts her as the buyer and both the explanation and the part-4 arithmetic
  treat it as a credit note *received*. The setup and stem now say received.
- **sc-034 part 1** — a transaction posted as two debits was labelled an "error
  of reversal". A true reversal leaves the trial balance in agreement, which
  contradicts part 3's £630 suspense arithmetic. Reclassified as a posting
  error, with the reversal retained as a distractor and the contrast explained.

### Length cue cleared

All 26 remaining length-cue warnings (25 scenario sub-parts plus two MCQs) were
rewritten so that every option is a comparable full phrase. The bank-wide rate at
which the correct answer is the single longest option is now **32.7%** against a
25% chance baseline, down from 58.4% before this work began.

### Lesson depth

The learning material was the weakest part of the app: 62 of 336 lesson cards
carried a table, split, formula or worked example with **no explanatory prose at
all** — the student saw the artefact but was never told what it meant or why it
worked. Prose was written for every one of them.

| | Before | After |
|---|---:|---:|
| Cards with no prose | 62 | 0 |
| Mean prose per lesson | ~190 words | 276 words |
| Lessons under 120 words | 9 | 0 |

### Still open

- Per-task mark allocations still come from a single mock paper. The `markRange`
  field records the assumed spread but has not been validated against AAT's own
  specification.
- The length-cue CI ceiling is still set at 35%. With the bank now at 32.7% it
  can be ratcheted to 33% to lock the gain in.
