# AAT Level 3 — research findings and implementation plan

Status: **plan, not yet implemented.** Rewritten August 2026 after an
adversarial review of the first draft found substantial errors. §8 records what
changed and why, because several of the corrections are worth not re-learning.
§10 adds what a published mock exam later revealed about the assessment itself.

Brief: Level 3 should be **primarily a learning platform** — a textbook
substitute for someone who has just finished Level 2 — following the AAT
syllabus closely, keeping quizzes but subordinating them to teaching, with the
journey UI taken much further using Duolingo as a model and a visual upgrade
that makes Level 3 land as a tier above Level 2. Content is to be delivered one
module at a time rather than as a whole course.

---

## 1. The central risk, stated first

This plan's first draft was a plan to build software. Every hard commitment in
it — six node types, a path renderer, an Excel formula parser, a second design
system, four CI validators — was engineering. The thing actually asked for,
a large body of correct and deep accounting teaching, was one paragraph with a
word target that was several times too low and no evidence anyone here can
produce content at that rate.

The evidence that this is a real failure mode is in this repository:

- Commit `bb4e2fc` removed the "Ledger Legends" RPG: **470 files, 17,829
  deletions**, including a whole sprite-generation pipeline. Built, then thrown
  away.
- The entire Level 2 learning corpus, after all the work to date, is
  **49,269 words**.
- Before a single Level 3 lesson existed, a **1,062-line formula engine** was
  written for a learning outcome worth 4.5% of the qualification.

So the ordering principle for everything below is: **content first, engine
after, and only what the content proved it needed.**

---

## 2. Where Level 3 should live

**Add Level 3 as a fifth subject in this app. Do not pivot, do not start again.**

The subject registry at `app.js:16` takes `{ id, name, short, flag, color, desc,
meta, tabs, assets, activate() }` plus data files, and progress is already keyed
per subject (`prep_v2_<id>`, `app.js:9`), so Level 2 progress is untouched.
Starting again would mean rebuilding the lesson player, SM-2 spaced repetition,
nine question types, the exam engine, the diagnostic, offline support and the CI
validators before a single Level 3 question existed.

**But "generic" is doing a lot of work in that sentence, and the first draft's
"one seam" claim was wrong.** `_activeSubjectId` appears 32 times in `app.js`,
about 20 of them hardcoded id comparisons. The flag the draft named as *the*
seam, `const isAAT` at `app.js:3428`, gates four home-screen mode cards in the
twelve lines below it — not the exam engine. The genuinely AAT-only surfaces are
gated by five further independent literals (`app.js:4094, 4251, 4331, 4963` for
the calculator sidebar; `app.js:5236` for the `L3_BRIDGE` panel), plus two CSS
rules at `styles.css:2784-2785` written as `body:not([data-subject="aat"])` —
**so adding `aat3` silently hides the reference panel and calculator for Level 3
with no code change and no error.**

Realistic cost of a fifth subject, enumerated rather than estimated: **25–30 edit
sites across 7 files**, covering the registry entry, those nine literals and two
CSS negations, `sw.js`, eight hardcoded "AAT Level 2" strings in `index.html`,
per-subject `--subj` token triples, journey unit-shape normalisation, and
`manifest.webmanifest` / `package.json` / `ci.yml`.

**One trap worth knowing before touching it:** `getStorageKey` is duplicated
inside the CSP-hashed inline bootstrap in `index.html`. Editing that script
invalidates a `sha256-` hash pinned in **three** files (`index.html`, `_headers`,
`vercel.json`); `npm run check:csp` is what catches it.

**Offline is a genuine fork, and the first draft got it backwards.** It claimed
lazy loading means "Level 2 users never download Level 3 content". False:
`sw.js` precaches `CORE_ASSETS` unconditionally — **3.33 MB across all
subjects** today. `loadScript()` defers parse and execute, not download. So
Level 3 either joins the precache (every Level 2 user pays, on every cache
bump) or stays out of it (**the flagship product is the only one that does not
work offline**). `cache.addAll` is also all-or-nothing: one 404 aborts the
install and the app silently stays on the previous `CACHE_VERSION`.
**Per-subject cache groups, populated on first activation, are required work.**

Two further leaks: `activate()` assigns `window.TOPICS = window.AAT_TOPICS` but
never releases the previous subject's globals, so **memory grows monotonically
across subject switches** — a session visiting Level 2 then Level 3 holds both
parsed corpora. And there is no eviction from `_assetReady` / `_assetPromises`.

---

## 3. What AAT Level 3 actually is

Primary source: **AAT Level 3 Diploma in Accounting (Q2022) Qualification
Specification, QN 603/6337/X, v5.11, published 16 March 2026** (108 pages).

### 3.1 Structure — four units, no synoptic

| Unit | Code | GLH | Duration | Marking | Weighting |
|---|---|---:|---|---|---:|
| Financial Accounting: Preparing Financial Statements | FAPS | 150 | 2h 30m | Computer marked | **40%** |
| Management Accounting Techniques | MATS | 120 | 2h 30m | Partially computer / partially human | **30%** |
| Business Awareness | BUAW | 70 | 2h 30m | Partially computer / partially human | **15%** |
| Tax Processes for Businesses | TPFB | 60 | 1h 30m | Computer marked | **15%** |

400 GLH; **no synoptic assessment**; 70% pass mark on every assessment.

**Total qualification time is 620 hours**, not 400. GLH counts supervised
delivery; TQT includes unsupervised self-study — which is exactly the mode this
app serves. 620 is the honest planning figure for a textbook substitute.

### 3.2 Grading

Distinction 90–100%, Merit 80–89%, Pass 70–79%, Unclassified 0–69% **or failure
to pass one or more assessments**, combined using the weightings above.

Three further rules a grade calculator must implement:

- **"Only a student's highest result will count towards their grade."** A resit
  that scores lower does not displace the earlier higher result.
- Units passed by recognition of prior learning are **given a pass mark**;
  exemptions carry a **maximum pass** into the grade.
- **"This qualification is not subject to re-sit restrictions."**

Results timing is worth surfacing in the app: computer-marked results appear
within **24 hours**, human-marked ones can take **up to six weeks** — i.e. BUAW
and MATS.

### 3.3 The syllabus is a FOUR-level hierarchy

The first draft got this wrong and built its central guarantee on the mistake.
The spec's own "Content structure" section defines four levels:

> • Each learning outcome is stated in full.
> • **Topic areas** specify the standard that a student is expected to meet…
> • Each topic area is then expanded into **key concepts**…
> • Each concept is then further expanded into **indicative content** where
>   applicable.

and states that **the indicative content "will need to be covered in a
programme of learning"** for a student to meet the standard.

| Unit | Outcomes | Topic areas (x.y) | Key concepts (x.y.z) | Indicative content | GLH | Weighting |
|---|---:|---:|---:|---:|---:|---:|
| FAPS | 9 | 28 | 122 | ~75 | 150 | 40% |
| MATS | 7 | 21 | 65 | ~156 | 120 | 30% |
| BUAW | 5 | 15 | 83 | ~160 | 70 | 15% |
| TPFB | 5 | 14 | 93 | ~88 | 60 | 15% |
| **Total** | **26** | **78** | **363** | **~479** | **400** | **100%** |

The x.y.z counts are exact and each unit's sequence is contiguous. The
indicative-content counts are approximate — see the extraction caveat in §3.7.

Two consequences the first draft missed:

1. **The real teaching spine is ~840 items, not 363.** A coverage check against
   x.y.z alone certifies coverage of headings. One lesson tagged `BUAW-2.1.4`
   would pass while omitting every named competition factor beneath it.
2. **"Assessment criteria" is not the spec's term** at Level 3. Use the spec's
   vocabulary — topic area, key concept, indicative content — so the encoding
   and the source stay comparable.

**These counts are UK-only.** Section 11 also contains two Botswana Tax
Processes for Businesses units (2024 and 2025), described as optional. They are
deliberately excluded; anyone regenerating the syllabus file must apply the same
exclusion or the totals will not reproduce.

### 3.4 Scope exclusions — high value, and all missed in the first draft

The spec states what is *not* assessed. These are the cheapest possible savings
and two of them contradict the first draft's own design:

| Where | Exclusion | Consequence |
|---|---|---|
| FAPS 3.3.8 | "Excluded: VAT treatment of part exchanges" | `L3_BRIDGE` at `app.js:686` advertises "Asset disposals & **part-exchange**" |
| FAPS 6.3.4 | "**Excluded: completion of the ETB for partnerships**" | The first draft named the ETB and partnership accounts as flagship workshops without noticing the boundary between them |
| TPFB 3.2.1 | VAT return boxes "(excluding Box 2, 8 and 9)" | Defines what a VAT-return workshop should render |
| TPFB 4.1.12 | "**Exclusion: the calculation of Income Tax, National Insurance contributions (NICs) and student loan repayments**" — "students will be provided with figures" | Do **not** build PAYE/NIC calculators or chase rate tables that are never examinable |
| TPFB intro | "The rules relating to Northern Ireland are not assessed in this unit." | |

**Exclusions must be first-class fields in the syllabus encoding**, not prose.

### 3.5 Which Finance Act — resolved, and not the blocker the first draft claimed

The first draft escalated a QTI-versus-spec "conflict" to a blocker requiring
confirmation from AAT. It is settled in the specification itself:

> **"This unit is based on the Finance Act 2025 subject to assessment from
> 26 January 2026."**

The QTI (v3.4, January 2025) says "Finance Act (2024) – for assessment delivered
from 27 January 2025". Those are consecutive, non-overlapping windows. The QTI
is stale, not contradictory. **As at August 2026, FA2025 applies.**

The cadence is annual, not the "eighteen months" the first draft stated: the
changelog shows FA23 at v4.2 (Sept 2023), FA24 at v5.1 (Sept 2024), FA25 at v5.7
(Sept 2025) — a new Finance Act unit each September, assessable from the
following late January. **That publication date, not the age of a version label,
is the maintenance trigger.**

### 3.6 Tax figures — to be sourced, not recalled

The first draft quoted VAT thresholds as "verified", in the same document that
said tax content must never be written from memory. Correcting that:

**The qualification specification contains no numeric thresholds at all.** TPFB
1.2.1 says only "the registration and deregistration thresholds… and how to
apply them". Every figure must be sourced from HMRC at authoring time, dated,
and stored in `aat3-tax-data.js` stamped `FA2025, assessable from 26 January
2026` — not merely labelled `FA2025`.

### 3.7 Legislation assessed (QTI v3.4, January 2025)

- **BUAW** — Fraud Act 2006; Bribery Act 2010; Data Protection Act 2018; Public
  Interest Disclosure Act 1998; Proceeds of Crime Act 2002; Money Laundering
  Regulations 2020; Charities Act 2011; Charity Commission (England and Wales);
  Charities SORP; AAT Code of Professional Ethics 2017; Terrorism Act 2000;
  Partnership Act 1890; Companies Act 2006; Limited Liability Partnership Act 2000.
- **FAPS** — IAS 1, IAS 2, IAS 16; Conceptual Framework for Financial Reporting
  2018; international accounting standards for organisations adopting IFRS.
- **MATS** — "No additional guidance."
- **TPFB** — Value Added Tax Act 1994, plus the Finance Act per §3.5.

**Extraction caveat.** The spec PDF lays "Learners need to know / need to be able
to" out in two columns, and text extraction interleaves them: in BUAW 3.1 the
key concepts come out in the order 3.1.1–3.1.4, 3.1.11–3.1.17, 3.1.5… so
indicative content attaches to the wrong parent. **Counts survive extraction;
structure does not.** The syllabus file must be built with a layout-aware
extraction or by hand-checking each unit against the PDF, and the first draft's
promise to encode the tree "verbatim" cannot be met by the current text dump.

### 3.8 Assessment shape (BUAW SAMS v1.2, February 2024)

BUAW is **7 tasks, 100 marks, 2h 30m**, each task independent:

| Task | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|---|---:|---:|---:|---:|---:|---:|---:|
| Marks | 20 | 18 | 17 | 10 | 10 | 13 | 12 |
| Outcomes | 1, 3 | 1, 2, 4 | 1, 4 | 3 | 2 | 5 | 1, 5 |

Four things follow:

1. **`L3_BRIDGE` says 6 tasks; it is 7.** Also, its `exam: 'Computer-based'`
   field is not wrong — all four units are computer-*delivered*; marking type is
   a separate axis. The field is incomplete, not incorrect.
2. **AAT tags every sub-question with the key concepts it tests** — "(3 marks)
   (1.4.1, 1.4.2)" — and tasks deliberately span several outcomes. Practice must
   interleave outcomes within a task or mocks will be easier than the real thing.
3. **29 of 100 marks are free-text and human marked** (Task 2a 9, Task 4 10,
   Task 6a 10). One of them, Task 6a, is marked by **level-of-response bands**
   (0 / 1–3 / 4–7 / 8–10), not a point list. An auto-graded rubric cannot
   reproduce banded marking; the app should present the band descriptors and be
   honest that this is self-assessment against them.
4. **Task 1 and Task 4 — 30 marks — are sat with the AAT Code of Professional
   Ethics open**, "via the references section in the assessment platform". BUAW
   3.1 is the largest topic area in the qualification (17 key concepts) and the
   skill assessed is *applying* a lookup-able code, not memorising it. **BUAW
   practice needs a references pane**, and its lessons should teach navigation of
   the Code rather than recall of it.

On the human-marked units, one correction: the spec attributes extended written
response to **Business Awareness only** ("In the Business Awareness unit, some
tasks will require extended written responses"). It nowhere says MATS requires
it; MATS's human-marked component is more plausibly spreadsheet output. The
first draft asserted otherwise without support.

### 3.9 What AAT actually publishes

The first draft's open question asked for SAMS for FAPS, MATS and TPFB. **They
do not exist.** The spec lists:

> • practice assessments for each unit
> • **one Sample Assessment and Mark Scheme (SMAS - Business Awareness)**
> • Qualification Technical Information (QTI)
> • **annual Chief Examiner reports**

So the thing to obtain is the **per-unit practice assessments** and the **Chief
Examiner reports** — the latter being the actual source for the "common errors"
material this plan depends on. Both are on the AAT Lifelong Learning Portal.

---

## 4. What to take from Duolingo — and what to reject

Duolingo's path is section → unit → node, with typed nodes (lesson, personalised
practice, review), a guidebook per unit, sequential unlock with a test-out
option, and personalised practice interleaved to drive spaced repetition.

**Adopt:** typed path nodes as information architecture; the per-outcome
guidebook; personalised practice drawn from the student's own errors, woven into
the path rather than parked in a separate tab (SM-2 already exists at
`app.js:782` but is not in the journey).

**Reject, with reasons:**

- **Streaks.** Right for vocabulary, wrong for AAT. The correct behaviour for an
  AAT student is a two-hour block at the weekend, not five minutes daily. A
  streak punishes the correct behaviour. **Replace it with exam-date planning**
  (§5.5) — the same motivational job, aimed at the real goal.
- **Bite-size framing.** Extending a trial balance is one indivisible 30–45
  minute procedure. A path that signals "this takes four minutes" puts students
  into the wrong mode and they abandon workshops half-done. Node art and copy
  must show expected duration honestly.
- **Hard gating.** Review nodes that must be passed lock out the struggling
  student who most needs the next outcome, and unlike Spanish, AAT has a booked
  exam date. Make review nodes strongly recommended with a visible warning, not
  a lock.
- **Test-out**, except for the two genuine Level 2 overlaps (FAPS LO2, TPFB
  LO4). In a product whose thesis is that teaching dominates quizzing, a general
  "skip the teaching if you pass a quiz" affordance contradicts the brief.
- **One node per topic area.** Incoherent for FAPS 6.3 (ETB) or MATS 4.2
  (variances), which need teach → worked → guided → independent as separate
  nodes. A topic area maps to **1..n** nodes.

**Also reject the linear 26-outcome path across units.** Most Level 3 students
are with a training provider that teaches units in its own order and books exams
unit by unit. A student whose college is doing MATS next month cannot use an app
that requires finishing FAPS first. **Sequence within an outcome; never across
units.**

---

## 5. Design

### 5.1 Syllabus encoding and what the validator can honestly claim

Encode all four levels in `aat3-syllabus.js`, using the spec's own vocabulary and
numbering, **stamped with the spec version**, with **exclusions as first-class
fields**.

The validator should assert against **indicative content where present**, not
just key concepts, and should fail on a lesson that claims more than a handful of
key concepts — a single lesson tagged with forty of them is the failure mode a
naive check would wave through.

It must also **report tags that match nothing**, not only concepts with no tag.
This matters because of a mistake in the first draft: it compared spec v4.5 and
v5.11 at topic-area level, found them identical, and generalised to "the spine is
stable, only tax moves". At key-concept level, **roughly a quarter of TPFB's IDs
were renumbered** between those versions — some deleted, some inserted, and at
least one narrowed in scope while keeping its number. A Finance Act roll
therefore silently invalidates tags, not just numbers. So:

- Treat TPFB identifiers as **version-scoped** (`TPFB-FA2025-4.1.11`).
- Ship a **syllabus diff tool** that reports added, removed, moved and
  rescoped items against the previous spec version.
- State the stability claim only where it holds: **outcome and topic-area level**.

And state plainly what the validator does and does not prove. **It is a
self-attestation.** The check is "does some lesson name this identifier" —
tagging one stub lesson with all 363 would pass. That is weaker than the
existing guards it compares itself to (`check-question-integrity.js` asserts
*structural* properties: answer-key ranges, shuffle presence, distractor
validity). It is a useful anti-regression tripwire and nothing more. Give it
what teeth it can have — minimum worked examples and question count per concept,
weighted by verb tier, and a failure when one lesson claims more than a handful
of concepts — and measure actual teaching separately (§5.7).

**The validator must ratchet per module, not globally.** A check that fails the
build when any of 363 items is uncovered would be red from the day it lands
until the final module ships, i.e. for the entire life of the project. The rule
is "this module's items must be complete", with a manifest of which modules are
in scope.

### 5.2 Depth — sized from the syllabus, not a flat word count

The first draft set 900–1,400 words per topic area, totalling 80,000–110,000.
Three things are wrong with that. The arithmetic (78 × 900 = 70,200, not
80,000). The uniformity — FAPS 3.1 is two key concepts and 27 words of spec,
while TPFB 2.3 has fifteen covering partial exemption, blocked input tax, bad
debt relief, postponed import VAT and fuel scale charges. And the scale: a
published Level 3 tutorial set runs to several hundred pages per unit, so
80–110k is a revision guide, not a textbook substitute.

**Replace the word target with a sufficiency spec per topic area**, derived from
the syllabus: for each "need to be able to" concept, N worked examples at
increasing complexity plus M independent practice items; for each "need to know"
concept, exposition and retrieval practice. Let word count fall out. Expect FAPS
6.3 and 7.3/7.4 to run many thousands of words each, and expect FAPS 3.1 to be
short — that is correct, not a gap to pad.

Note that criterion counts are a poor proxy for teaching load in both
directions: MATS 2.1 is a *single* concept that contains inventory records for
raw materials, WIP and finished goods, materials and labour costing, overhead
treatment and cost per equivalent unit. One of the "smallest" nodes by count is
one of the largest by content.

**Honest total for a genuine textbook substitute across four units: 250,000+
words.** Which is why §6 scopes the first year to one unit.

**Payload consequences, which the first draft ignored entirely.**
`learn-data.js` is 431 KB for roughly 18,800 words of prose — about **23 bytes
of file per word**, once structure, check questions and markup are counted. At
even the old (too small) 80–110k target, `aat3-learn-data.js` would be
**1.8–2.5 MB before a single question**; with a proportional question bank,
Level 3 lands at 3–4 MB and the precache roughly doubles to ~7 MB. And
`loadScript()` injects a `<script src>`, so that is a multi-megabyte synchronous
parse on the main thread with no chunking or progress.

**Therefore content files must be split per module** — `aat3-faps-lo2.js` and so
on, loaded on demand. The established pattern in this repo is one giant file per
subject, and at Level 3's size that pattern breaks.

### 5.3 Effort allocation — an unresolved tension, named

The first draft asserted that effort should follow qualification weighting (FAPS
40 / MATS 30 / BUAW 15 / TPFB 15) while adopting a structure that forces effort
to follow topic-area count (FAPS 36 / MATS 27 / BUAW 19 / TPFB 18) or key-concept
count (FAPS 34 / MATS 18 / BUAW 23 / TPFB 26). TPFB is 15% of the grade but 26%
of the concepts; MATS is 30% of the grade but 18%. **These cannot all be
satisfied. Weighting wins**, because it reflects both marks and GLH, and the
mismatch is a property of uneven drafting between unit authors rather than a
signal about teaching load.

### 5.4 Journey structure

- **Section** → unit; **unit** → learning outcome; **node** → 1..n per topic area.
- Node types: `lesson`; `workshop` (a long guided procedure — ETB, appropriation
  account, VAT return, cash budget — with honest duration shown); `practice`
  (personalised, from the student's own errors); `review` (recommended, not
  gating); `casefile` (cross-outcome, in real assessment shape, interleaving
  outcomes as §3.8 requires); `checkpoint` (unit mock).
- **Guidebook** per outcome, always reachable.
- **BUAW gets a references pane** replicating the in-exam Code of Ethics access.
- **Empty state must be honest.** With content shipping module by module, most
  outcomes will not exist for a long time. Unwritten outcomes render as
  "Coming — currently writing LO5", not as locked nodes. Locked implies earned.

**The first draft's "gap versus Duolingo" table was wrong on three rows.** Level
2 already has: a winding path (`app.js:5173` cycles nodes through
`step-pos-l/c/r`, with 17 supporting CSS rules and unit progress bars); a full
per-unit revision screen (`UNIT_REVISION` + `renderRevision()` at `app.js:5730`),
not merely a "Notes" button; and a **Mistake Notebook** mode
(`Storage.activeMistakeIds()`, `app.js:3441`). The honest gap list is shorter:
**typed nodes, practice woven into the path, must-pass review, and test-out.**

**And the real cost is higher than the first draft implied.** The journey is one
~180-line function (`renderLearningJourney`, `app.js:5117-5295`) built as a
single nested template literal. Node "type" is string-sniffed rather than typed —
`L.title.startsWith('Histoire')` is load-bearing. Unlocking is a strictly linear
chain (`app.js:5158-5162`) where "done" means "scored ≥50% once", with no
dependency graph. The lesson player is a fixed three-phase state machine
(`teach → transition → quiz`). Five new node types means five new phases or
screens, each needing `State` fields, a `render()` branch and event wiring.

**All of that is shared by all five existing subjects, and CI runs zero UI or
behavioural tests** — five data validators, no headless browser, no DOM
assertions. A journey or player rewrite is currently guarded by nothing. Either
behavioural tests come first, or this work carries real regression risk to four
shipped subjects.

### 5.5 Readiness and exam dates — early, not last

The first draft put mocks and the grade calculator in the final phase, meaning
that for the whole life of the programme no student could find out whether they
were ready. That is backwards: readiness feedback is the strongest motivator in
exam study.

- Build a **per-outcome readiness estimate in the first engine phase**, from
  question performance against the criterion tags that already exist.
- Ship **one real mock as soon as its unit's content supports it** — the BUAW
  blueprint in §3.8 is already complete and verified.
- Add **exam-date entry per unit** and backwards planning from it. This replaces
  streaks and is the feature most likely to drive retention in this domain.

### 5.6 Subject-matter review — a gate, not a nicety

**Nothing in a CI validator catches a confidently-worded wrong explanation of
goodwill on partnership admission.** This project has already shipped wrong
answers at Level 2, on materially easier content, and only found them because a
student hit them in a mock.

**Each module ships only after an AAT-qualified reviewer has signed off the
teaching text and every answer key.** If no such reviewer is available, that is a
fact the owner needs before the writing starts, not after — and the honest
fallback is to narrow scope to material that can be checked against worked
examples in published exam kits, and to label the app accordingly.

### 5.7 Measuring teaching, not just content

The first draft measured whether content exists. For a product whose thesis is
teaching, add one genuine efficacy measure: **first-attempt accuracy on
independent-practice items, per key concept, after its lesson.** When a
concept's accuracy is persistently low, the *lesson* is flagged for rewrite.
That is the difference between a teaching product and a content dump.

### 5.8 Visual design

Level 3 must land as a tier above Level 2. Two corrections to the first draft's
approach:

**Build one design system, not two.** `styles.css` is already 204 KB and 5,886
lines serving five subjects with no build step. A parallel second design
language doubles the cost of every future dark-mode, accessibility and
responsive fix — and the v1.3.0 dark-mode failure (25 rules targeting a selector
the app never set) is exactly the class of bug that doubling the surface makes
likelier. Instead: express the new design in **semantic tokens, back-port the
token layer to Level 2**, and give Level 3 richer *values* — the path, the
display face, the motion, the elevation. Split `styles.css` per subject at the
same time; it is past maintainable. This also avoids the finished Level 2
product looking abandoned next to Level 3 on the subject switcher.

**Freeze the shell, not the card vocabulary.** Tokens, path, node art, motion and
typography can be delivered once and frozen. The *content* card types cannot —
Level 2's vocabulary (`p`, `split`, `table`, `example`, `formula`, `callout`,
`examtrap`, `flow`, `worked`) grew from writing lessons, and Level 3 will need
ETB grids, appropriation layouts, variance bridges, T-account pairs and VAT
return facsimiles that nobody can enumerate in advance. Budget for the card
vocabulary to grow with every module and say so, so it is not experienced later
as scope creep.

**Fix the live dark-mode bug before layering anything on top.** The first draft
said the v1.3.0 fix means "that class of bug cannot recur". It has not even been
fully fixed. `styles.css:119` declares `--primary: var(--accent)` on `:root` and
**`.dark` never redeclares it**, while `--accent` itself changes from
`--brand-600` to `--brand-400` between themes. Custom properties substitute in
the scope that declares them, so `--primary` computes once against the light
value and stays light in dark mode — across **11 use sites**. This is shipping
in Level 2 today. It also means the proposed contrast check must resolve alias
chains; a checker that reads declared values will not catch it.

**`prefers-reduced-motion` is already handled, and the risk is the opposite of
what the first draft said.** `styles.css:270-278` applies a universal-selector
`!important` reset. So Level 3 motion is *already* neutralised wholesale, and
any per-component reduced-motion nuance will have to fight `!important`. The
work is to replace a blunt reset with a considered one, not to add handling.

**Accessibility is an acceptance bar, not a bullet.** The two new surfaces are
the least accessible things the app would contain: a path where visual position
carries the progression model, and a grid taking free-text formulas. Phase
requirements: keyboard-complete path with a semantic list fallback,
screen-reader tested, and focus/announcement behaviour designed for the grid
before more of it is built.

**A CI contrast check needs a headless browser** to resolve alias chains,
gradients and `rgba()` across 5,886 lines. Current CI is five plain node
scripts. That is a new dependency class in a repo whose premise is "no build
step", and it should be a deliberate decision rather than a side effect.

### 5.9 MATS LO5 — the spreadsheet grid, right-sized

The syllabus names the function set at 5.2.1: SUM, AVERAGE, MIN, MAX, ROUND,
ROUNDUP, ROUNDDOWN, SUMIF, COUNT, COUNTA, COUNTIF, IF (simple and nested),
VLOOKUP, HLOOKUP, DAYS, with absolute and relative referencing; plus goal seek
and forecast, and the auditing tools at 5.2.4.

**Proportion, stated honestly:** LO5 is 15% of MATS, which is **4.5% of the
qualification**, and 5.2.1 is one of LO5's nine concepts. A hand-written parser
with Excel rounding semantics is a large build for that share, and it must not
gate FAPS content at 40%.

**Scope, complete this time** — the first draft's table silently omitted several
concepts:

- *Practised by the grid:* 5.2.1 (formulas, functions, referencing), parts of
  5.2.4 (show formulas, trace precedents — these fall out of the parser).
- *Partly practised:* 5.2.3 (editing and updating data).
- *Not practised, and the grid does not touch them:* **5.1.1 (designing
  spreadsheets to support flexed budgets, variance analysis, operating
  statements, overhead absorption, decision making, cash budgeting — the
  substance of LO5, and a design skill)**, 5.1.2 (linking and paste-special),
  5.1.3 (formatting and charts), 5.2.2 (sort, filter, pivot tables, conditional
  formatting, subtotals, comments), 5.3.1 (validation and protection), 5.3.2
  (presentation and charts).

Most of LO5 is therefore *not* addressable by a formula evaluator. Those parts
should be taught as knowledge with an explicit statement that they need
practising in real spreadsheet software.

**Unresolved and blocking further grid work: the mobile story.** This is a
mobile-first PWA. A free-text formula grid on a phone is close to unusable, and
the first draft committed to building one without asking. Decide the phone
experience — read-only, tap-to-fill, or desktop-only with an honest notice —
before writing more engine.

**Current state: `formula-engine.js` is a draft, and its adversarial review
found it NOT fit to build on.** The architecture is sound — no `eval`, real
tokeniser and recursive-descent parser, Excel operator precedence verified
correct (`-2^2` = 4, `2^3^2` = 64, postfix `%`), half-away-from-zero rounding
correct for the headline cases, `VLOOKUP`/`HLOOKUP` indexing correct in both
orientations. But the safety story — the entire reason for hand-writing it —
does not hold:

- **Uncaught stack overflow from student input.** `MAX_FORMULA_LEN` is checked
  in `evaluateFormula` but not in `check()` or `parseFormula`, and `analyse()`'s
  tree walk is unguarded. A long pasted formula throws `RangeError` out of the
  public API. *Verified.*
- **Catastrophic regex backtracking.** `COUNTIF` criteria wildcards compile to
  `new RegExp`; a criteria string of a dozen `a*` groups against a 60-character
  cell hangs indefinitely. *Verified — a 120-second run did not return.* A
  synchronous regex cannot be interrupted, so the tab is dead.
- **Parse-error messages are discarded** in the documented flow: with
  `spec.target` set, every message becomes `#NAME?`, so a student with a missing
  bracket is told "the formula evaluates to #NAME?". The teaching value is lost.
- **The most common AAT formula shape is wrong.** `=SUM(A1)` and `=SUM(B1,A1)`
  where a cell holds text return `#VALUE!` instead of ignoring it — while
  `=SUM(A1:A1)` correctly returns 0. *Verified.* The answer depends on whether
  the student wrote `A1` or `A1:A1`.
- Plus wrong `ROUNDUP`/`ROUNDDOWN` near boundaries, `Infinity` instead of
  `#NUM!`, order-dependent circular-reference results, and a broken
  `mustBeFormula: false`.

None is architectural; the review estimates about a day to fix, with the
wildcard matcher replaced by a linear glob matcher. **But the file ships with no
tests, into a CI that has no behavioural tests at all.** It stays shelved until
MATS LO5 is the module being written, and it does not merge without
`scripts/test-formula-engine.js` wired into `npm test`.

### 5.10 Copyright — what may and may not be reproduced

Neither the first draft nor its rewrite mentioned this. The specification carries
its own licence:

> Copyright © AAT. All rights reserved. **Reproduction is permitted for personal
> and educational use only.** No part of this content may be reproduced or
> transmitted for commercial use without the copyright holder's written consent.

The plan proposed encoding the syllabus "verbatim", shipping AAT's identifiers
as product-visible tags, reproducing a mark-scheme blueprint, and a references
pane "replicating the in-exam Code of Ethics access" — that last one being a
separate AAT copyright.

**Resolved: this app is for the owner's personal study only and is not
commercial.** That places it squarely inside the licence's own carve-out —
"reproduction is permitted for personal and educational use" — which is the
permission the notice grants rather than an exception being stretched. So the
syllabus tree may be encoded faithfully, and the coverage check in §5.1 is
meaningful precisely because it maps to AAT's own wording.

Three things still hold, and cost nothing:

- **The non-affiliation disclaimer** already in `README.md` and on the Level 2
  home screen must appear on the Level 3 surface too, and its claim that
  question content is original must stay true — questions are authored, not
  lifted from AAT assessments.
- **Teaching prose is written from scratch.** The syllabus is a coverage
  checklist; the lessons explain the content in their own words. This is a
  pedagogical requirement before it is a licensing one.
- **If the position ever changes** — commercial release, or distribution as a
  product rather than a personal study tool — the carve-out no longer applies
  and this must be revisited before, not after.

---

## 6. Phasing — one complete unit first

**Decision taken: TPFB complete, end to end, before anything else.** This
replaces both the first draft's engineering-first order and the rewrite's
"FAPS only for a year".

Why TPFB rather than a slice of FAPS:

- **It is finishable.** 60 GLH, 5 outcomes, 14 topic areas — the smallest unit in
  the qualification. Three-ninths of FAPS is not a release; a whole TPFB is.
- **It is computer marked**, with no free-text and no banded marking. That
  removes the hardest assessment problem in the qualification from the first
  build entirely (see §3.8 on BUAW's level-of-response bands).
- **Its mock can be built from the specification alone.** Per-LO weightings are
  published — 25 / 30 / 20 / 15 / 10 — so no SAMS is needed, and §3.9 establishes
  none exists for this unit anyway.
- **It has the largest exclusions** (§3.4), which cut the real teaching surface
  well below what its 93-key-concept count suggests.
- **It proves the whole pipeline** — syllabus encoding, exclusions as data,
  coverage ratchet, per-module content files, tax-data isolation, a mock, a
  readiness estimate — on the cheapest unit available.

The counter-argument is real and was weighed: TPFB is 15% of the grade against
FAPS's 40%, and its content churns annually. But **that churn is an argument for
doing it first, not last** — the annual Finance Act roll is a permanent
maintenance obligation, and its true cost should be discovered on a 60 GLH unit
now rather than on a large corpus in two years. The syllabus diff tool in §5.1
cannot be tested at all until some version-scoped TPFB content exists to diff
against. The current FA2025 window runs to January 2027, so a unit written now
has a clean twelve months.

| Phase | Content |
|---|---|
| **T0** | `aat3-syllabus.js` for TPFB — 5 outcomes, 14 topic areas, 93 key concepts, with **exclusions as data**. Plus `aat3-tax-data.js`, every figure sourced and dated. Written, not engineered. |
| **T1** | **LO2 "Calculate VAT" first** — 30%, the largest outcome and the one with the most calculation. This is a representative sample, not an easy one: it is genuinely new at Level 3 and it is where the marks are. Measure words written, authoring time and error rate at review. |
| **T2** | Recalibrate from T1's real numbers, then LO1, LO3, LO4, LO5. |
| **T3** | Subject registry entry and the plumbing in §2; per-module content files; per-subject service-worker cache groups; coverage ratchet; honest empty states. |
| **T4** | The TPFB mock to the published weightings, and a readiness estimate. **Unit complete and releasable.** |
| **Then** | FAPS, module by module, recalibrated against everything TPFB taught. |

**Why LO2 first within TPFB**, rather than starting at LO1: LO1 is legislation
and registration rules — knowledge-dense and quick to write, which would produce
the same misleadingly optimistic calibration that made FAPS LO2 a bad pilot
(§8 #28). LO2 is the calculation core. If the sufficiency spec and the card
vocabulary survive LO2, they will survive the rest.

---

## 7. Open questions

1. **Is a qualified reviewer available, and at what cost?** (§5.6) This gates the
   honesty of everything else and should be answered before P0 finishes.
2. **The mobile story for the spreadsheet grid** (§5.9) — blocks further grid work.
3. **How far "taught but not practised" can go** for the LO5 criteria a browser
   grid cannot exercise (§5.9). The plan is to teach them and say so plainly.
4. **Obtain the per-unit practice assessments and the annual Chief Examiner
   reports** from the Lifelong Learning Portal (§3.9). The examiner reports are
   the source for the common-errors material §5.2 depends on.
5. **A layout-aware extraction of the spec PDF** (§3.7), or a hand-check, before
   the syllabus file is generated.
6. **Should the live `--primary` dark-mode bug be fixed now?** (§5.8) It affects
   the shipped Level 2 product today, across 11 use sites, and is independent of
   all Level 3 work. Recommendation: fix it as a standalone change immediately,
   rather than bundling it into a design-system phase.
7. **Do behavioural tests come before the journey rewrite?** (§5.4) CI has five
   data validators and no DOM assertions. Rewriting the journey and lesson
   player — shared by five shipped subjects — with no behavioural coverage is
   the largest unmanaged regression risk in this plan.
8. **RESOLVED IN PART (8 Aug 2026), by a published Q2022 TPFB mock.** The mock
   shows a return with **Box 1 £13,000.00 and Box 4 £8,464.58**, confirming the
   VAT boxes carry pounds and pence. It gives no Box 6–9 figure, so the
   "whole pounds, **rounded down**" half remains unsupported by any source. The
   mock's own instructions say to apply *normal mathematical rules unless the
   task says otherwise*, which suggests the convention is not tested as a rule
   to recall. Lesson 2C now teaches the confirmed half, states plainly that the
   rounding-down claim could not be verified, and tells the reader to follow the
   task instruction. Close this only against an AAT practice assessment.

   The original entry follows, for the record.

   **The VAT return box rounding rule is taught but UNVERIFIED.** Lesson 2C
   states that boxes 1–5 are completed in pounds and pence and boxes 6–9 in
   whole pounds rounded down. On 8 August 2026 this could not be confirmed
   against any current HMRC source: Notice 700/12 (the box-by-box guidance),
   Notice 700, and the margin-scheme return page were each checked and none of
   them states a rounding convention. The rule appears to originate in the
   online return service and older VAT 100 paper guidance, and it is what AAT
   study material teaches — but "widely repeated" is not "sourced", and this is
   the second time on this project that a widely repeated figure has turned out
   to belong to a superseded regime (see the Notice 700/41 late-registration
   penalty, §8). It is recorded in `aat3-tax-data.js` as
   `returnBoxes.roundingUnverified` with a comment saying not to treat it as
   sourced. Resolve it from a practice assessment or the live return service
   before the TPFB mock is built, since a mock would test it directly.

---

## 8. Corrections made to the first draft

Recorded so they are not re-learned:

| # | First draft said | Actually |
|---|---|---|
| 1 | The Finance Act question is a blocker needing AAT confirmation | Resolved in the spec: FA2025, assessable from 26 January 2026 (§3.5) |
| 2 | Obtain SAMS for FAPS, MATS, TPFB | Only one SAMS exists. Get practice assessments and Chief Examiner reports (§3.9) |
| 3 | The syllabus is three levels, 363 criteria | Four levels; ~479 items of indicative content beneath, which the spec says must be covered (§3.3) |
| 4 | Structure is "byte-identical" across versions, so the spine is stable | True only at topic-area level; ~25% of TPFB's key-concept IDs were renumbered (§5.1) |
| 5 | VAT thresholds "verified" at £90,000 / £88,000 | Quoted from a search, not a primary source; the spec contains no thresholds at all (§3.6) |
| 6 | (no mention of exclusions) | Five exclusions, two of which contradicted the draft's own design (§3.4) |
| 7 | MATS requires extended written response | The spec says that of BUAW only (§3.8) |
| 8 | `L3_BRIDGE`'s "Computer-based" is wrong | It is incomplete, not wrong — delivery and marking are separate axes (§3.8) |
| 9 | BUAW has 6 tasks | 7 (§3.8) |
| 10 | Lazy loading means Level 2 users never download Level 3 | `sw.js` precaches every subject unconditionally (§2) |
| 11 | 80,000–110,000 words | Arithmetic wrong (78 × 900 = 70,200) and the target is several times too thin (§5.2) |
| 12 | Effort follows qualification weighting | Cannot, under one-node-per-topic-area; tension now named and resolved (§5.3) |
| 13 | Finance Act cadence ~18 months | Annual, each September, assessable the following January (§3.5) |
| 14 | Mocks and grade calculator last | Readiness signal must come early (§5.5) |
| 15 | Two design systems, frozen after phase 1 | One token system back-ported; shell frozen, card vocabulary not (§5.8) |
| 16 | Engineering phases gate all content | Inverted — content pilot first (§6) |
| 17 | (no expert review step) | SME sign-off is a release gate (§5.6) |
| 18 | Coverage validator makes syllabus-following "provable" | It proves tags exist; efficacy needs measuring separately (§5.1, §5.7) |
| 19 | Sources section said the QTI and SAMS were unread | They had been read two sections earlier |
| 20 | The exam UI is gated behind "one seam" at `app.js:3428` | That flag gates four home-screen cards; five more literals and two CSS negations gate the rest — 25–30 edit sites across 7 files (§2) |
| 21 | Level 2 renders nodes "as a vertical list of circles" | A 3-position winding path already exists at `app.js:5173` (§5.4) |
| 22 | Guidebook is "partial — a Notes button" | `UNIT_REVISION` + `renderRevision()` is a full per-unit revision screen (§5.4) |
| 23 | Mistakes queue: "None" | A Mistake Notebook mode already exists at `app.js:3441` (§5.4) |
| 24 | `prefers-reduced-motion` "is not currently handled" | It is, as a universal `!important` reset — the risk is inverted (§5.8) |
| 25 | The v1.3.0 fix means the dark-mode alias bug "cannot recur" | `--primary: var(--accent)` is still unredeclared in `.dark`, live across 11 use sites (§5.8) |
| 26 | (payload never mentioned) | ~23 bytes/word means 1.8–2.5 MB of lesson data at the old target; content must be split per module (§5.2) |
| 27 | `formula-engine.js` merely "needs review" | Review found an uncaught stack overflow and an unbounded regex hang, both verified (§5.9) |

---

## 9. Sources

- **AAT Level 3 Diploma in Accounting (Q2022) Qualification Specification, QN
  603/6337/X, v5.11, 16 March 2026** — the authority for every curriculum fact
  above. Extracted text committed at `docs/reference/`.
- The same specification at v4.5, 29 January 2024 — used only for the version
  comparison in §5.1.
- **AAT Level 3 Qualification Technical Information, v3.4, January 2025** —
  legislation per unit (§3.7). Stale on the Finance Act; see §3.5.
- **AAT Level 3 Business Awareness Sample Assessment and Mark Scheme, v1.2,
  February 2024** — the blueprint in §3.8. Two years and eleven spec revisions
  older than the specification, though BUAW's content is unchanged over that
  window.
- duoplanet, *The Duolingo Learning Path* — path hierarchy and node mechanics.

To obtain: per-unit practice assessments and annual Chief Examiner reports
(§3.9); current HMRC tax figures at authoring time (§3.6).

---

## 10. TPFB assessment shape (published mock, August 2026)

The qualification specification states no task count for TPFB, so §3 left
`taskCount: null`. A published Q2022 TPFB mock (Acorn/MarZar) supplies the
shape. It is **not an AAT publication** and is recorded as indicative, but
three of its five outcome weightings reproduce the published figures exactly,
which is strong evidence the structure is real.

**8 tasks, 80 marks, 90 minutes.**

| Task | Marks | About | Best-fit outcome |
|---:|---:|---|---:|
| 1 | 9 | Tax law principles, registration and deregistration, special schemes | LO1 |
| 2 | 8 | Calculating and accounting for VAT | LO2 |
| 3 | 12 | Recovery of input tax | LO2 |
| 4 | 8 | Preparing, calculating and adjusting information for VAT returns | LO2/LO3 |
| 5 | 12 | Verifying VAT returns | LO3 |
| 6 | 11 | Record keeping, filing, payment, non-compliance | LO1 |
| 7 | 12 | Principles of payroll | LO4 |
| 8 | 8 | Reporting information on VAT and payroll | LO5 |

Mapped this way the marks give LO1 25%, LO4 15% and LO5 10% — exact matches.
LO2 and LO3 do not resolve exactly because **task 4 straddles them**, which is
the useful finding: tasks deliberately span outcomes, so a mock built by
allocating whole tasks to single outcomes would be easier than the real thing.

### 10.1 Reference material is available during the assessment

The single most consequential finding, and one nothing in the corpus had said.
The mock's model answers cite AAT reference material at nearly every numerical
step: fuel scale charges, flat rate percentages, the de minimis figures, bad
debt relief conditions, penalty points thresholds and the £200 penalty, late
payment percentages and days, the interest rate and Bank of England base rate,
and the behaviour tables for both errors and failure to notify.

This does not make the figures unimportant — a student who has never met a rule
will not think to look it up, and finding the right row under time pressure
needs familiarity. But it redirects revision decisively towards **which rule
applies, whether its conditions are met, and how to apply it**. Lesson 0A now
says so explicitly, in a card written for the purpose.

### 10.2 A conflation the mock exposed

Errors in a return and failure to notify carry **different** penalty tables.
Errors fall under Schedule 24 FA2007 (behaviour band "careless", prompted
minimum **15%**, no twelve-month distinction); failure to notify falls under
Schedule 41 FA2008 ("non-deliberate", with the twelve-month split). Lesson 3A
had described them as the same structure. Corrected, with the tables separated
in `aat3-tax-data.js` and both verified against HMRC's Compliance Handbook
rather than against the mock.

### 10.3 What the mock does NOT settle

Its explanation of the partial exemption de minimis test contains the sentence
"the rule is 'or' not 'and'", which reads as contradicting the both-limbs test
taught in 2D. It does not: the mock's own pass condition is stated as "no more
than £625 **and** no more than 50%", its failure condition as "more than £625
**or** more than 50%" — De Morgan's law, correctly applied — and its model
answer blocks the exempt input tax because the first limb fails. The narrative
sentence is simply garbled. **2D was not changed.** Third-party mocks are
evidence, not authority, and this one was checked against HMRC before anything
was altered on its say-so.
