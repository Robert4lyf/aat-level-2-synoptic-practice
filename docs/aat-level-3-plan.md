# AAT Level 3 — research findings and implementation plan

Status: **plan, not yet implemented.** Written August 2026.

Goal, as briefed: Level 3 should be **primarily a learning platform** — a
textbook substitute for someone who has just finished Level 2 — that follows the
AAT syllabus closely, keeps quizzing but subordinates it to teaching, and takes
the Level 2 journey UI much further using Duolingo as the model.

---

## 1. Where Level 3 should live

**Add Level 3 as a fifth subject in this app. Do not pivot, do not start again.**

The subject registry at `app.js:16` is already generic and proven across four
subjects. A subject is `{ id, name, short, flag, color, desc, meta, tabs,
assets, activate() }` plus lazily-loaded data files, so Level 2 users never
download Level 3 content. Progress is already keyed per subject
(`prep_v2_<id>`, `app.js:9`), so Level 2 progress is untouched.

Starting a new app would mean rebuilding the lesson player, SM-2 spaced
repetition, nine question types with render-time shuffling and grading, the
marks-based exam engine, the diagnostic, flashcards, offline/PWA and the CI
validators — 7,127 lines of `app.js` before a single Level 3 question exists.

Pivoting would delete a finished product to get its successor, and Level 3
students revise Level 2 constantly because Level 3 is built on it. The app
already models that relationship in `L3_BRIDGE` (`app.js:681`).

---

## 2. Research: what AAT Level 3 actually is

Primary source: **AAT Level 3 Diploma in Accounting (Q2022) Qualification
Specification, Qualification Number 603/6337/X, version 5.11, published 16 March
2026** (108 pages), taken from AAT directly. Facts below are from that document
unless noted.

An earlier third-party mirror (v4.5, January 2024) was also extracted and
compared line by line. **The learning-outcome and sub-topic structure is
byte-identical between the two versions** — all 78 sub-topics match exactly.
Everything that changed between January 2024 and March 2026 was tax content:
TPFB moved FA23 → FA24 → FA25, with FA24 removed in v5.10 (24 February 2026).
That is a useful stability signal: the curriculum spine is safe to build
against, and the tax numbers are the only moving part.

### 2.1 Structure — four units, no synoptic

| Unit | Code | GLH | Assessment duration | Marking | Weighting toward grade |
|---|---|---:|---|---|---:|
| Financial Accounting: Preparing Financial Statements | FAPS | 150 | 2h 30m | Computer marked | **40%** |
| Management Accounting Techniques | MATS | 120 | 2h 30m | Partially computer / **partially human** | **30%** |
| Business Awareness | BUAW | 70 | 2h 30m | Partially computer / **partially human** | **15%** |
| Tax Processes for Businesses | TPFB | 60 | 1h 30m | Computer marked | **15%** |

Total 400 GLH. **There is no synoptic assessment at Level 3** — four
independent end-of-unit assessments, confirmed by the grading worked examples in
the specification, which total exactly these four. Pass mark is **70% across all
assessments**.

### 2.2 Grading — this is new versus Level 2

| Grade | Threshold |
|---|---|
| Distinction | 90–100% |
| Merit | 80–89% |
| Pass | 70–79% |
| Unclassified | 0–69%, **or failure to pass one or more assessments** |

The overall grade is the weighted combination of the four unit percentages using
the weightings above. This is worth building into the app: a student can see
that FAPS is worth more than BUAW and TPFB combined, which should drive how they
spend their time.

### 2.3 Corrections to what the app currently claims

`L3_BRIDGE` in `app.js:681` is partly wrong and must be fixed:

- **BUAW duration is 2h 30m, not 2h.**
- All four units are described as "Computer-based"; in fact **MATS and BUAW are
  partially human marked**, which means extended written response matters at
  Level 3 and the app's `written` question type is directly relevant.
- Per-unit task counts (currently 6 / 8 / 8 / 6) are **not stated in the
  qualification specification**. They come from the Sample Assessment and Mark
  Scheme (SAMS), which has not yet been consulted. Treat them as unverified
  until they are.

### 2.4 The syllabus spine — 26 outcomes, 78 sub-topics, 363 criteria

The specification's "Scope of content" gives a three-level hierarchy: learning
outcome → sub-topic (`x.y`) → assessment criterion (`x.y.z`), each tagged
"learners need to know", "need to understand" or "need to be able to". This is
the curriculum spine and should be encoded verbatim.

Extracted counts from v5.11:

| Unit | Outcomes | Sub-topics | Assessment criteria | GLH | Weighting |
|---|---:|---:|---:|---:|---:|
| FAPS | 9 | 28 | 122 | 150 | 40% |
| MATS | 7 | 21 | 65 | 120 | 30% |
| BUAW | 5 | 15 | 83 | 70 | 15% |
| TPFB | 5 | 14 | 93 | 60 | 15% |
| **Total** | **26** | **78** | **363** | **400** | **100%** |

Note the shape: BUAW and TPFB carry a high criterion count on low GLH because
they are knowledge-dense and recall-heavy, while MATS has the fewest criteria on
the second-highest GLH because its outcomes are procedural — you are asked to
*do* things repeatedly rather than know many separate facts. That difference
should drive the teaching format per unit, not just the volume.

**FAPS — 9 outcomes, 28 sub-topics** (weightings shown per outcome)

| LO | Title | Wt |
|---|---|---:|
| 1 | Understand the accounting principles underlying final accounts preparation | 5% |
| 2 | Understand the principles of advanced double-entry bookkeeping | 10% |
| 3 | Implement procedures for the acquisition and disposal of non-current assets | 10% |
| 4 | Prepare and record depreciation calculations | 10% |
| 5 | Record period end adjustments | 10% |
| 6 | Produce and extend the trial balance | 15% |
| 7 | Produce financial statements for sole traders and partnerships | 20% |
| 8 | Interpret financial statements using profitability ratios | 10% |
| 9 | Prepare accounting records from incomplete information | 10% |

Sub-topics: 1.1 primary users · 1.2 accounting framework · 1.3 qualities of
useful information · 2.1 accounting equation · 2.2 classification of ledger
accounts · 2.3 books of prime entry · 2.4 period end routines · 3.1 prior
authority for capital expenditure · 3.2 capital vs revenue · 3.3 acquisitions
and disposals · 4.1 calculate depreciation · 4.2 record depreciation · 5.1
accruals and prepayments · 5.2 irrecoverable debts and allowances · 5.3
inventory · 5.4 considerations for period end adjustments · 6.1 initial trial
balance · 6.2 adjusted trial balance · 6.3 extended trial balance · 7.1 sole
trader financial statements · 7.2 opening and closing capital · 7.3 partnership
SPL · 7.4 partnership SFP · 8.1 calculate profitability ratios · 8.2 interpret
profitability ratios · 9.1 identify missing figures · 9.2 mark-up and margin ·
9.3 reasonableness of figures.

**MATS — 7 outcomes, 21 sub-topics**

| LO | Title | Wt |
|---|---|---:|
| 1 | Understand the purpose and use of management accounting within organisations | 10% |
| 2 | Use techniques required for dealing with costs | 15% |
| 3 | Attribute costs according to organisational requirements | 20% |
| 4 | Investigate deviations from budgets | 15% |
| 5 | **Use spreadsheet techniques to provide management accounting information** | 15% |
| 6 | Use management accounting techniques to support short-term decision making | 15% |
| 7 | Understand principles of cash management | 10% |

Sub-topics: 1.1 internal reporting calculations · 1.2 marginal vs absorption ·
2.1 materials, labour and overhead costs · 2.2 cost accounting journals · 2.3
inventory control methods · 2.4 cost behaviours · 2.5 differences between
costing systems · 3.1 attribute overheads (traditional) · 3.2 overhead recovery
rates (traditional) · 3.3 overhead recovery rates (**activity-based costing**) ·
3.4 under/over recovery · 4.1 standard costing and budgeting principles · 4.2
calculate variances · 4.3 analyse and investigate variances · 5.1 organise,
record and format data · 5.2 manipulate, analyse and verify data · 5.3 prepare,
protect and present information · 6.1 short-term future revenue and costs · 6.2
effects of changing activity levels · 7.1 cash budgeting · 7.2 improving cash
flow.

**BUAW — 5 outcomes, 15 sub-topics**

| LO | Title | Wt |
|---|---|---:|
| 1 | Understand business types, structures and governance, and the legal framework | 25% |
| 2 | Understand the impact of the external and internal environment | 20% |
| 3 | Understand how businesses and accountants comply with principles of professional ethics | 20% |
| 4 | Understand the impact of new technologies and the risks associated with data security | 15% |
| 5 | Communicate information to stakeholders | 20% |

Sub-topics: 1.1 types of business · 1.2 legal framework for companies and
partnerships · 1.3 stakeholder interactions and needs · 1.4 organisational
structure and governance · 2.1 PESTLE · 2.2 micro-economic environment · 2.3
sustainability · 3.1 the ethical code · 3.2 ethical conflicts and reporting ·
3.3 **money laundering** · 4.1 technology · 4.2 data protection, information
security and cybersecurity · 5.1 information requirements · 5.2 **visualising
information** · 5.3 communicating information.

**TPFB — 5 outcomes, 14 sub-topics**

| LO | Title | Wt |
|---|---|---:|
| 1 | Understand legislation requirements relating to VAT | 25% |
| 2 | Calculate VAT | 30% |
| 3 | Review and verify VAT returns | 20% |
| 4 | Understand principles of payroll | 15% |
| 5 | Report information within the organisation | 10% |

Sub-topics: 1.1 UK tax law principles · 1.2 registration and deregistration ·
1.3 filing and payment · 1.4 special schemes · 1.5 non-compliance · 2.1
extracting data from records · 2.2 VAT invoices · 2.3 VAT calculations · 3.1
adjustments for errors and omissions · 3.2 verify VAT return information · 4.1
employer responsibilities · 4.2 operating payroll · 5.1 communicating VAT and
payroll matters · 5.2 legislation, regulation, guidance and codes of practice.

### 2.5 Tax currency — a standing maintenance problem

The current specification carries TPFB as **Tax Processes for Businesses
(FA2025)**, with the FA24 version removed in v5.10 on 24 February 2026. A
further Finance Act update should be assumed on roughly an annual cycle — the
changelog shows FA23 → FA24 → FA25 in about eighteen months.

Current thresholds verified at the time of writing: VAT registration
**£90,000**, deregistration **£88,000**, both unchanged since 1 April 2024 and
holding through 2026/27.

The version comparison in §2 is the key finding here: across two years and
eleven revisions, **the learning-outcome structure never moved and only the tax
content did**. So the curriculum spine can be encoded once with confidence,
provided the tax numbers are isolated where they can be swapped. The
architectural answer is in §4.5.

---

### 2.6 QTI — the legislation actually assessed

Source: **AAT Level 3 Qualification Technical Information, v3.4, published
January 2025**. It is only two pages but it pins down exactly which legislation
is examinable, which matters for BUAW and TPFB content.

- **BUAW** — Fraud Act 2006; Bribery Act 2010; Data Protection Act 2018; Public
  Interest Disclosure Act 1998; Proceeds of Crime Act 2002; Money Laundering
  Regulations 2020; Charities Act 2011; Charity Commission (England and Wales);
  Charities SORP (no requirement to distinguish between statements); AAT Code of
  Professional Ethics 2017; Terrorism Act 2000; Partnership Act 1890; Companies
  Act 2006; Limited Liability Partnership Act 2000.
- **FAPS** — IAS 1 (formats for the SPL and SFP); IAS 2 (inventories); IAS 16
  (property, plant and equipment); Conceptual Framework for Financial Reporting
  2018; international accounting standards for organisations adopting IFRS.
- **MATS** — "No additional guidance."
- **TPFB** — Finance Act 2024 for assessments delivered from 27 January 2025;
  Value Added Tax Act 1994.

**Conflict to be aware of.** The QTI (v3.4, January 2025) still names **Finance
Act 2024**, but the qualification specification (v5.11, March 2026) titles the
unit **Tax Processes for Businesses (FA2025)** and removed the FA24 variant in
v5.10 on 24 February 2026. The QTI has simply not been reissued. The
specification is the more recent document and should be treated as authoritative
on which Finance Act applies, but **this needs confirming with AAT before TPFB
content is written** — getting it wrong makes every threshold in the unit wrong.
This is exactly the risk §4.5 exists to contain.

### 2.7 SAMS — a real assessment blueprint, and how AAT thinks

Source: **AAT Level 3 Business Awareness Sample Assessment and Mark Scheme**.

BUAW is **7 tasks, 100 marks, 2 hours 30 minutes**, and each task is
independent — no task depends on an answer from a previous one.

| Task | Marks | Outcomes drawn on |
|---|---:|---|
| 1 | 20 | LO1, LO3 |
| 2 | 18 | LO1, LO2, LO4 |
| 3 | 17 | LO1, LO4 |
| 4 | 10 | LO3 |
| 5 | 10 | LO2 |
| 6 | 13 | LO5 |
| 7 | 12 | LO1, LO5 |

**This corrects the app again: BUAW has 7 tasks, not the 6 claimed in
`L3_BRIDGE`.** Task counts for FAPS, MATS and TPFB remain unverified — only the
BUAW SAMS was supplied, and the other three should be obtained before their
blueprints are built.

The most useful finding is structural: **AAT tags every sub-question in the mark
scheme with the exact assessment criteria it tests** — "(3 marks) (1.4.1,
1.4.2)". Tasks deliberately span several outcomes rather than testing one at a
time. Two consequences:

1. The criterion-tagging design in §4.1 is not an invention; it is how the
   awarding body itself structures assessment. Tagging questions the same way
   makes app blueprints directly comparable to real ones.
2. Practice must **interleave outcomes within a task**, because the real
   assessment does. A mock that tests one outcome per task would be easier than
   the real thing and would mislead the student.

---

## 3. Research: what to take from Duolingo

Duolingo's path is four nested levels — **section → unit → level (node) →
lesson** — with typed nodes rather than a uniform list. Node types include
standard lesson (star), **personalised practice** (dumbbell), **unit review**
(trophy), story (book), and others; each unit carries a **guidebook** of
explanations reachable from the unit header; progression is sequential with the
option to **skip ahead by passing a test**; and personalised practice sessions
are interspersed through the path to drive spaced repetition against material
the learner actually got wrong.

### What Level 2's journey has today

Lesson cards already support a decent vocabulary — `p`, `split`, `table`,
`example`, `formula`, `callout`, `examtrap`, `flow`, `worked` — SM-2 spaced
repetition exists (`app.js:782`), and there are XP, stars and per-unit revision
notes. Mean prose per lesson after the v1.3.0 work is 276 words.

### The gap, stated plainly

| Duolingo mechanic | Level 2 today |
|---|---|
| Typed path nodes | **One** node type — every node is a lesson |
| Personalised practice woven into the path | SM-2 exists but only as a separate mode |
| End-of-unit review that must be passed | None |
| Guidebook per unit | Partial — a "📝 Notes" button |
| Skip ahead by testing out | Diagnostic recommends a start point; no per-unit test-out |
| Mistakes queue | None |
| Graded difficulty inside a lesson | None — fixed order |

---

## 4. Design

### 4.1 Curriculum spine, and making "follows the syllabus" provable

Encode the specification's full tree — 26 outcomes, 78 sub-topics, **363
assessment criteria** — in a new `aat3-syllabus.js`, using AAT's own numbering,
and give every lesson a `criteria: ['FAPS-3.3.2', …]` tag.

Then add a **coverage validator** to CI: the build fails if any of the 363
criteria has no lesson covering it, and warns if a high-weighted outcome is
covered more thinly than a low-weighted one. This turns "closely follows the AAT
syllabus" from a claim into a machine-checked property — the same discipline as
the existing question-integrity guards, which is what caught the corrupted
option sets.

It also gives the student something no textbook offers: a coverage map showing
exactly which criteria they have studied and which remain, per outcome.

### 4.2 Journey structure

Map Duolingo's hierarchy onto the qualification:

- **Section** → unit (FAPS, MATS, BUAW, TPFB)
- **Unit** → learning outcome (26 of them)
- **Node** → sub-topic (78 of them)

Node types to build:

1. `lesson` — teach then check. The default.
2. `workshop` — a long guided procedure done step by step with reasoning at each
   step: extend a trial balance, prepare a partnership appropriation account,
   complete a VAT return, build a cash budget. This is the single most important
   new type for FAPS and MATS and is a natural extension of the existing
   `worked` card.
3. `practice` — personalised, drawn from the learner's own wrong answers and
   SM-2 due items. Inserted every few nodes rather than living in a separate tab.
4. `review` — end-of-outcome consolidation, mixed formats, **must be passed** to
   unlock the next outcome.
5. `casefile` — an extended cross-outcome scenario in real assessment shape.
6. `checkpoint` — the full unit assessment mock at the end of each section.

Plus: a **guidebook** per learning outcome (reference notes, formulas, worked
patterns) reachable at any time; **test-out** per outcome, which matters
specifically because a student arriving from Level 2 already knows a good deal
of FAPS LO2 and TPFB LO4; and a **mistakes queue** that never empties silently.

### 4.3 Depth — the textbook-substitute standard

This is the real change in kind from Level 2, and the bulk of the work.

Per sub-topic lesson, target:

- 900–1,400 words of exposition that explains **why**, not just what
- at least one fully worked example with reasoning at every step
- common errors and exam traps drawn from examiner reports
- graded practice: guided → scaffolded → independent
- explicit callbacks to the Level 2 prerequisite, since the reader has just
  finished it

Across 78 sub-topics that is roughly **80,000–110,000 words**. That is textbook
scale, and it should be planned as such rather than discovered halfway through.

Effort should follow the qualification weighting rather than being spread evenly:
FAPS 40%, MATS 30%, BUAW 15%, TPFB 15%.

### 4.4 MATS LO5 — the spreadsheet problem

**This outcome is 15% of MATS and cannot be taught honestly by multiple choice.**
It requires organising, manipulating, verifying, protecting and presenting data
in a spreadsheet, and it is partly human marked.

**Decision taken: build the formula-evaluating grid.**

The syllabus names the exact function set to support at criterion 5.2.1, which
makes this a bounded target rather than "implement Excel":

> SUM, AVERAGE, MIN, MAX, ROUND, ROUNDUP, ROUNDDOWN, SUMIF, COUNT, COUNTA,
> COUNTIF, IF (simple and nested), VLOOKUP, HLOOKUP, DAYS — "using absolute and
> relative cell referencing"

Plus, at 5.2.1, the statistical tools **goal seek** and **forecast**; at 5.2.4
the auditing tools **trace precedents**, **trace dependents** and **show
formulas**.

Scope, honestly drawn:

- **Fully practised** — writing and evaluating formulas, the 15 functions above,
  absolute vs relative referencing, and what happens when a formula is copied.
  This is the core of 5.2.1 and much of 5.2.2, and it is where the marks are.
- **Practised in a reduced form** — show formulas and trace precedents fall out
  of the engine almost free, since it already parses references (5.2.4).
- **Taught but not practised** — charts, pivot tables, conditional formatting,
  cell protection, headers and footers, print setup (parts of 5.1.3, 5.2.2,
  5.3.1, 5.3.2). These are Excel UI skills. The app should teach them as
  knowledge and **say plainly that they need practising in real spreadsheet
  software**, rather than pretending otherwise.

Engineering requirements, given this takes student free-text input:

- **No `eval`, no `new Function`.** A hand-written tokeniser and recursive-descent
  parser producing an AST that is then walked.
- **Excel semantics where they differ from JavaScript**, notably: unary minus
  binds tighter than `^` (so `-2^2` is 4); `%` is postfix; `ROUND` goes half away
  from zero, so `ROUND(-2.5, 0)` is −3 and `ROUND(2.675, 2)` is 2.68 despite
  binary floating point.
- **Circular references detected**, not hung on.
- **Hard limits** on formula length, range size and nesting depth, since a
  student can type anything.
- **A comprehensive unit-test suite in CI**, in the spirit of the existing
  question-integrity guards.

### 4.5 Tax currency — isolate the numbers

Put every rate, threshold, penalty and deadline in a single `aat3-tax-data.js`
with an explicit `FINANCE_ACT: 'FA2025'` label and a `validFrom` date. Lessons
and questions reference the constants; none hardcode a number. Add a validator
that warns when the Finance Act label is more than a year old.

When the Finance Act rolls, the update is one file plus a review pass, not a
hunt through 100,000 words.

### 4.6 Assessment engine

Level 3 needs four independent unit blueprints rather than one synoptic. The
machinery is mostly there: `buildUnitAssessment(unitId)` already does this shape
of work, and the Level 2 exam UI is gated behind a single flag,
`const isAAT = _activeSubjectId === 'aat'` at `app.js:3428` — that line is the
seam to generalise into per-subject exam configuration.

Add a **qualification grade calculator** implementing §2.2: weighted unit
percentages, Distinction/Merit/Pass thresholds, and the rule that failing any
one unit makes the whole qualification unclassified.

---

### 4.7 Visual design — Level 3 must feel like a tier up

Level 3 should not look like Level 2 with different words in it. The brief is
that it lands as a premium product, and the visual language is most of how that
reads before a single lesson is opened.

Where Level 2 stands: a functional card-and-list UI, one accent colour per
subject, journey nodes as circles with lock and star glyphs, flat cards, minimal
motion, and a dark mode that was defective until v1.3.0. It is clean but plainly
utilitarian.

What "a tier up" should mean concretely:

- **A distinct Level 3 identity, not a recoloured Level 2.** Its own palette and
  accent, richer surfaces (layered elevation, subtle gradients on section
  headers), and a heavier display face for headings against the current single
  system font.
- **A path that reads as a path.** Level 2 renders nodes as a vertical list of
  circles. Level 3 should draw an actual winding track with connecting segments
  that fill as you progress, section banners between units, and typed node art
  so a workshop, a review and a practice node are distinguishable at a glance —
  which is exactly how Duolingo signals what is coming next.
- **Motion with a purpose.** Node completion, streak increments, section
  unlocks and correct/incorrect feedback all deserve transitions. All of it must
  respect `prefers-reduced-motion`, which the app does not currently handle.
- **Progress made legible.** Per-outcome rings, a criteria-coverage meter driven
  by §4.1, and a live projected qualification grade from §2.2 weightings.
- **Typography and density tuned for reading.** A textbook substitute is read
  for long stretches: measure capped for line length, larger body size, more
  generous spacing than the quiz-oriented Level 2 layout.
- **Both themes designed together, from tokens.** The v1.3.0 dark-mode failure
  happened because 25 rules targeted a selector the app never set and alias
  tokens resolved once against light values. Level 3 styling should be built on
  semantic tokens defined for both themes at the same time, with a contrast
  check in CI so that class of bug cannot recur.

Risk worth stating: this is the part of the plan most likely to expand without
limit, and it competes directly with content for effort. The recommendation is a
**fixed visual foundation delivered once in phase 1** — tokens, path, node art,
motion, typography — and then a freeze, so that phases 2–5 are content work
against a stable design rather than a rolling redesign.

---

## 5. Phasing

**Revised on instruction: the full course is parked. Content is delivered one
module at a time**, each module shipped complete — lessons, worked examples,
checks, guidebook, criteria coverage — before the next begins. That keeps every
release useful on its own and stops a half-finished 78-lesson corpus sitting in
the app.

| Phase | Content | Depends on |
|---|---|---|
| 0 | Subject registry entry, `aat3-syllabus.js` for all 363 criteria, coverage validator, generalise `isAAT`, de-hardcode the app title, fix the `L3_BRIDGE` errors in §2.3 and §2.7 | — |
| 1 | Journey engine + **visual foundation** (§4.7): typed nodes, path, guidebook, test-out, practice/review nodes, mistakes queue, design tokens, motion, contrast check | 0 |
| 1b | Spreadsheet grid engine and UI (§4.4), with its CI test suite | 0 |
| 2+ | **One module at a time.** Each module = one learning outcome, shipped complete. | 0, 1 |
| last | Four unit assessment mocks to real blueprints; qualification grade calculator | content |

**Module order.** Within the module-at-a-time approach, FAPS first — 40% of the
grade and 150 of the 400 guided learning hours — starting at FAPS LO2 rather
than LO1. LO2 is advanced double-entry, which is the direct continuation of what
the student has just finished at Level 2, so it is the gentlest true start; LO1
is conceptual framework material that reads better once there is something
concrete to attach it to.

Each module ships with: every criterion in that outcome covered and
CI-verified, a guidebook entry, at least one workshop node, a review node, and
enough questions to support the practice queue.

---

## 6. Open questions

Resolved since the first draft:

- ~~The spreadsheet decision~~ — **decided: build the grid** (§4.4).
- ~~Depth confirmation~~ — **decided: park the full course, one module at a
  time** (§5).
- ~~QTI and BUAW SAMS not yet read~~ — both now obtained and folded into §2.6
  and §2.7.

Still open:

1. **Which Finance Act applies to TPFB.** The QTI says FA2024, the current
   specification says FA2025 (§2.6). Must be settled with AAT before any TPFB
   content is written, because it determines every threshold in the unit.
2. **SAMS for FAPS, MATS and TPFB.** Only the BUAW sample assessment has been
   supplied. The other three are needed before their mock blueprints are built —
   task counts and mark allocations cannot be guessed.
3. **How far the "taught but not practised" spreadsheet criteria can go**
   (§4.4). Charts, pivot tables and cell protection are real syllabus content
   that a browser grid will not genuinely exercise. The plan is to teach them
   and say so plainly; that honesty should be checked as acceptable.
4. **Tax content must not be written from memory.** VAT penalty regimes, MTD
   obligations and payroll thresholds change; every figure needs sourcing
   against the current QTI at authoring time and storing in `aat3-tax-data.js`.
5. **Scope discipline on the visual upgrade** (§4.7) — the fixed-foundation-then-
   freeze recommendation needs agreeing, or design work will run indefinitely
   alongside content.

---

## Sources

- **AAT Level 3 Diploma in Accounting (Q2022) Qualification Specification, QN
  603/6337/X, v5.11, 16 March 2026** — the current specification, from
  aat.org.uk. Units, GLH, durations, marking types, weightings, grading
  thresholds and the full scope of content. This is the authority for every
  curriculum fact above.
- The same specification at v4.5, 29 January 2024 — used only as a comparison
  to establish that the outcome structure has been stable across eleven
  revisions.
- HMRC VAT threshold guidance as reported August 2026 — registration £90,000,
  deregistration £88,000.
- duoplanet, *The Duolingo Learning Path* — path hierarchy, node types,
  guidebook, test-out and personalised practice mechanics.

Not yet consulted, and needed before any assessment blueprint is written: the
AAT **Qualification Technical Information (QTI)** and the **Sample Assessment
and Mark Schemes (SAMS)**.
