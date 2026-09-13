# Level 3 learning upgrades — implementation plan

**Date:** September 2026 · **Scope:** Level 3 only (all four units), as a proving
ground. Nothing here touches Levels 1 or 2, CIPS, French or guitar. If it works,
each phase ports outward on its own.

**Status:** planning. Nothing below is built.

---

## 0. What problem this solves

The app is already strong at two things: making sure the *content* is right
(syllabus fidelity, arithmetic checks, plain-English ceilings, coverage
ratchets), and deciding *what to ask next* (spaced repetition, weighted draws,
mistake memory, retirement, outcome pickers).

It is blind to a third:

> **It knows *what* you got wrong. It has no idea *why*, how long you took, or
> how sure you were.**

Concretely, in today's Level 3:

- 1,455 practice questions, each carrying exactly **one** `exp` string, shown
  identically whether the reader picked the plausible-but-wrong distractor or
  stabbed at random.
- **Zero** milliseconds of timing recorded anywhere, in a module whose whole
  purpose is preparing for an 80-mark timed paper.
- No confidence signal, so `AATSpaced.schedule()` cannot tell a lucky guess from
  secure knowledge and gives both the same interval.
- `planner: { examDate }` exists in the Level 2 store and is referenced nowhere;
  Level 3 has no equivalent at all.

Everything below moves the module from *"do you know the right answer?"* to
*"does it know what you don't know?"*

---

## 1. The constraints that shape every phase

These are the traps this codebase has already been bitten by. Any feature below
that ignores one of them will look correct and fail silently.

### 1.1 `normalisePractice()` rebuilds the record field by field

`aat3-ui.js` reads the store through `normalisePractice(p)`, which **names every
field explicitly** and constructs a fresh object:

```js
out.units[k] = { runs, mocks, mockBest, los, qs, hist };
```

Its own comment records what happened last time this was forgotten: `mocks` and
`mockBest` were written on the way out and silently dropped on the way back in,
so a reader's best mock score survived until the page reloaded.

**Rule for every phase below:** a new field inside `practice.units[k]` must be
added to `normalisePractice` in the same commit, and the gate for that phase must
include a **save → reload → read-back** assertion. No exceptions.

### 1.2 Backups merge by MAX, so only some shapes are safe

`progress-backup.js` merges two devices by taking the larger of each number,
`||` for booleans, and "keep local" for arrays. That is why the app stores
`(attempted, correct)` rather than `(attempted, wrong)`, and two timestamps
(`k`/`ku`, `w`/`r`) rather than a boolean flag.

Anything new is therefore one of:

| Shape | Merges? | Use for |
|---|---|---|
| Monotonic counter | ✅ | hit counts, attempt counts |
| Pair of monotonic counters | ✅ | (attempted, correct)-style tallies |
| Two timestamps | ✅ | reversible flags |
| Mean, list, "best/lowest" | ❌ | must be device-local |

Device-local keys are excluded by `isDeviceKey()` in `progress-backup.js`, which
currently reads:

```js
/_(pos|losel|topicsel|trendoff)$/.test(k)
```

Two phases add keys to that regex: Phase 1 adds `_pace` and Phase 5 adds `_plan`.
(Phase 3 writes into Phase 1's record and Phase 4 adds no key at all.) Each addition needs an assertion in
`scripts/check-progress-backup.js` in **both** directions — never exported, never
imported — because the last time this filter was wrong, four keys claimed in
their own comments to be device-local and none of them were.

### 1.3 `spaced.js` is shared by all three levels

`AATSpaced.schedule(rec, correct, now, key)` is called by `aat1-ui.js`,
`aat3-ui.js` and `app.js`. Phase 1 wants a confidence input. That must be an
**additive fifth parameter** whose absence reproduces today's behaviour exactly,
and `scripts/check-spaced.js` must assert that a 4-argument call is unchanged —
otherwise Level 3's experiment silently reschedules Levels 1 and 2.

### 1.4 Level 3 shuffles MCQ options at render — but the handler sees the original index

`S._order` holds the display order; the renderer emits `data-i="<original
index>"`, so `S.picked` is an index into the **authored** `opts` array and
`S.picked === q.ans` works directly. Phase 2's `why[]` is therefore a plain
`why[S.picked]` lookup with **no `_order` mapping at all**.

*(An earlier draft of this plan said the opposite — that the tag had to be mapped
back through `_order`. It does not, and building that mapping would have attached
every explanation to the wrong option. The lesson is that the shuffle is real but
it is confined to the renderer.)*

The property still needs pinning, because a future refactor that switched the
markup to display indices would break it silently and plausibly: **the gate must
assert that a tagged distractor shows its own tag after the options are
shuffled**, with the shuffle seeded so the assertion is deterministic.

### 1.5 A new field is a named field list in three or four places, depending where it sits

`save()` serialises the whole `data` object, so **writing** a new field is free.
Reading it back is not: every read path names its fields explicitly, and a field
not named is dropped.

**A top-level field on `data`** (like `lessonQs`) — two places:

| Place | Line (approx) | What it does |
|---|---|---|
| `load()` | 200–204 | names `lessons`, `xp`, `lessonQs`, `practice`, `srSpreadAt` and nothing else |
| the `data` literal | 146 | the shape before anything is loaded |

**A field inside `practice.units[k]`** — three places:

| Place | Line (approx) | What it does |
|---|---|---|
| `normalisePractice()` | 165 | rebuilds the record on load — §1.1 |
| `practiceRec()`'s `blank` | 257 | the shape a **new** unit gets |
| `practiceRec()`'s lazy repair | 261–263 | `if (!u.qs) …`, `if (!u.hist) …` for records written before a field existed |

Add a per-unit field to `normalisePractice` only and a brand-new unit gets
`undefined` — a crash or a silent zero on the reader's very first run in that
unit, which is the worst possible time. Add it to the first two and not the
third, and every **existing** store misses it until something else rewrites the
unit.

**Every phase below must touch all of the places its field needs, and its gate
must cover both paths: a fresh unit, and a store written before the field
existed.**

### 1.6 `gradeAnswer()` is called three times, and one of them is the review

```
settle(q)              ← practice and lesson: the real grading
mocknext / finish()    ← the mock: silent grading as the reader moves on
openReviewQ(i)         ← re-marks a banked answer, EVERY TIME the reader opens it
```

Anything that *counts* — a timing reading, a misconception hit, a confidence
tally — must be attached to `settle()` and the mock's two banking sites, **never
to `gradeAnswer()`**. Hooked into grading, every counter inflates each time the
reader browses the mock review, and the numbers drift upward for a reason nobody
would think to look for.

`openReviewQ` also calls `restoreAnswer()`, which calls `resetQState()` — so a
`qShownAt` set there is reset harmlessly, but only because nothing reads it.

### 1.7 Lesson check questions run through the same handlers

`settle()` does not know or care whether it is inside a lesson or a practice run.
But the practice record deliberately excludes lesson questions — their misses go
to `data.lessonQs`, outside `practice`, and
`check-aat3-practice-summary.js` **asserts that a whole lesson run leaves the
practice record byte-identical**.

So every counter added below must decide explicitly whether a lesson check
question counts, and its gate must assert that decision. This plan's answer:

| Signal | Lesson questions count? | Why |
|---|---|---|
| Timing (§3.1) | **Yes**, in their own bucket | pace while learning is worth seeing, and it is not the practice record |
| Confidence (§3.2) | **No** | the calibration claim is about practice, and a lesson check is not a test |
| Misconceptions (§4) | **Yes**, but *outside* `practice` | a misconception is a fact about the reader, wherever it surfaced |
| Mastery (§7.3) | **No** | mastery is evidenced by practice, per the existing summary's rule |

**The misconception row carries a constraint that an earlier draft of this plan
got wrong.** `check-aat3-practice-summary.js` does not merely assert that the
practice *count* is unmoved by a lesson — it drives a whole lesson and asserts
that `store.practice` is **deep-equal** to what it was before:

```js
eq(JSON.parse(store.getItem(STORE_KEY)).practice, JSON.parse(beforeLesson),
   'answering a lesson check changes nothing in the practice record');
```

So "misconceptions count for lesson questions" and "`misc` lives inside
`practice.units[k]`" cannot both be true. Writing a single misconception hit
during a lesson breaks that gate.

**Resolution:** lesson-sourced misconception hits go to `data.lessonMisc`, a
top-level map alongside `data.lessonQs` — which exists for precisely this reason
and whose own comment says so. Practice-sourced hits stay in
`practice.units[k].misc`. The diagnosis screen reads both and adds them.

The cost is two maps instead of one, and it buys the one thing that matters: the
signal from lesson checks is not thrown away, and the existing gate stays green
without being weakened. **Do not "fix" this by relaxing the deep-equal
assertion** — it is the only thing keeping two modes that share every handler
from bleeding into each other.

Getting any of these wrong does not produce a wrong number — it produces a
**failing existing gate**, which is the good outcome. They are listed here so the
decisions are made deliberately rather than discovered.

### 1.8 The Node fake DOM has no `closest()` or `querySelector()`

`scripts/lib/aat3-driver.js` can drive the real player headlessly, but any
handler that patches the DOM in place (rather than calling `rerender()`) is
unreachable there. Those need a Chromium gate — see `check-outcome-picker.js`
for the serve/goto pattern and the marker trick that proves a repaint did *not*
happen.

### 1.9 Every gate must be in both `npm test` and `.github/workflows/ci.yml`

`check-workflow-coverage.js` fails the build when they disagree. Registering a
gate in one and not the other is a real failure mode — it happened on the last
change.

### 1.10 Housekeeping per change

- Bump `CACHE_VERSION` in `sw.js` (currently `aat-l2-v241`).
- Any new top-level `.js` file must be added to the service worker's precache
  list and to `index.html`, and `check-csp-hashes.js` / `check-cache-freshness.js`
  will say so if not.
- New CSS classes must be *reachable*: `check-subject-styles.js` rejects dead
  rules and unstyled rendered classes alike.

---

## 2. Phase order, and why

```
Phase 1  Signals        timing + confidence          ← everything else reads these
   │
   ├── Phase 2  Misconceptions   why an answer was wrong
   │      │
   │      └── Phase 6  Diagnosis screen   what to do about it
   │
   ├── Phase 3  Retrieval        cover-the-options mode
   ├── Phase 4  Follow-through   own-figure marking on chained tasks
   │
   └── Phase 5  Readiness        forecast + exam date + mastery
```

Phase 1 first because it is cheap, needs no content authoring, and every later
phase is sharper for having it. In particular it makes Phase 2's enormous
authoring job **targeted**: once the app records confident-wrong answers, the
distractors worth tagging first are the ones people are confidently wrong about,
rather than all 1,833 of them.

---

## 3. Phase 1 — the two missing signals

### 3.1 Timing

**What.** Record how long each question took, from render to grade.

**Where the hooks go.**

- `resetQState()` (`aat3-ui.js` ~line 4680) sets `S.qShownAt = Date.now()` and
  `S.qHidden = false`.
- `settle(q)` (~line 4721) is the single grading funnel for every type — that is
  where the reading is taken. The mock's silent grade in the `mocknext` handler
  and the one in `finish()` need the same treatment; all three already exist as
  named call sites.
- A `visibilitychange` listener sets `S.qHidden = true`. Any reading where the
  page was hidden is **discarded**, not clamped — a reader who put the phone down
  mid-question has no honest reading. The pattern is already in the codebase
  three times (`app.js`, `progress-sync.js`, `guitar-audio.js`); bind at module
  scope, once, so there is nothing to unbind.
- The mock needs no special handling for revisits: Level 3's mock is strictly
  forward-only — `mocknext` is the only way through it and there is no jump — so
  a question is shown exactly once and timed exactly once.

**Discard rules** (all three, or the data is junk on day one):

1. Page hidden at any point during the question → discard.
2. Over 10 minutes → discard. The longest legitimate question in the bank is a
   multi-part `task` or a 12-cell `entrygrid`; ten minutes is generous for both
   and still catches a walk-away.
3. Under 400 ms → discard. That is a double-tap or a stale repaint, not an
   answer.

**Storage — device-local, in its own key.** `prep_v2_aat3_pace`:

```js
{ tpfb: { byLo: { '3': { n: 41, ms: 512000 } },
          byType: { numeric: { n: 60, ms: 900000 } } } }
```

Device-local for two reasons, and the second is the real one: a mean cannot
survive a MAX-merge (§1.2), **and pace is genuinely device-specific** — typing a
figure on a phone is slower than on a laptop, so a merged pace number would
describe nobody. Add `pace` to `isDeviceKey()`.

**What it is for.**

- The done screen gains one line: *"10 questions, 6m 20s — about 38s each."*
- The practice summary gains a pace row per outcome once `n >= 20`.
- Phase 5's forecast uses it to answer "would you finish the paper".

**Gate:** `scripts/check-aat3-pace.js` (Node, via the driver).
- a graded answer records exactly one reading
- a reading while hidden is discarded
- readings outside the bounds are discarded
- `n` and `ms` both rise; the mean is computed, never stored
- the key never appears in an export and never arrives on import
- **the record survives a reload** (§1.1 — even though this key sits outside
  `practice`, the assertion is cheap and the failure mode is identical)

**Mutations that must kill it:** drop the visibility guard; drop the upper bound;
store a mean instead of the pair; record on `nextq` instead of `settle` (which
would time the reader's *reading of the explanation*, not their answering).

**Size:** ~150 lines of app code, ~200 of gate. One session.

### 3.2 Confidence

**The design problem.** MCQ grades on the option tap (`act === 'ans'` →
`settle(q)`), so there is no natural moment to ask. 611 of 1,455 questions are
MCQ, so "add a step" is not a small change — it slows the most common type and
works against endless practice.

The other seven types have an explicit submit, but one of them is no better: a
`written` task submits through `wrmark`, which is only reachable **after** the
model answer has been revealed. Asking "how sure were you?" at that point asks a
reader who is looking at the answer. Written tasks are therefore excluded from
the confidence signal entirely, and the gate should assert that rather than leave
it to chance.

**The design.** Two mechanisms, deliberately different in cost:

**(a) Everyday practice — a "Guessing" toggle.** One button beside the question,
off by default, tapped *before* answering. Tap it and the answer is recorded as a
guess whatever the outcome.

Zero extra taps for the confident reader; one tap for the unsure one. The bias is
real and it is the *right way round*: the dangerous state this exists to catch is
**confident-wrong**, and confidence is recorded by inaction. A reader who never
taps the button produces "confident" data, and a confident-wrong is exactly what
that captures.

**(b) A Calibration run.** A practice mode that forces the three-way ask — **Sure
/ Think so / Guessing** — on every question, before the grade. Ten questions,
unbiased, and the only source the calibration chart draws on. This is where
honest data comes from; (a) is where cheap data comes from.

**A new run type is four edits, not one.** Both this and Phase 3's
cover-the-options mode add a `practiceLo` value, and each needs:

1. a branch in `startPractice()` that fills `S.practiceQs`;
2. a branch in `practiceLabel()` — the function's own comment records that
   `practiceLo` is not always an outcome number, and printing it unguarded
   produced *"Outcome missed"* the first time a second kind of run existed;
3. a button on the practice screen;
4. a check that `isEndless()` and the `Array.isArray(lo)` branch cannot claim it.

The `startpractice` handler is already safe: it converts to a number only when
the value matches `/^\d+$/`, so a named mode passes through — a property its own
comment records as the fix for `'endless'` silently becoming `NaN`.

**Storage.** Per unit, inside `practice.units[k]` — and therefore **added to
`normalisePractice`**:

```js
conf: { sure:   { n: 0, right: 0 },
        think:  { n: 0, right: 0 },
        guess:  { n: 0, right: 0 } }
```

Three pairs of monotonic counters: merges correctly under MAX.

**The scheduler.** `AATSpaced.schedule(rec, correct, now, key, conf)` — additive
fifth parameter (§1.3). Behaviour:

| Answer | Confidence | Today | Proposed |
|---|---|---|---|
| Right | sure | ladder up | unchanged |
| Right | guess | ladder up | **treated as reps = 1** — a guess is not knowledge |
| Wrong | guess | reset, interval 1 | unchanged |
| Wrong | sure | reset, interval 1 | **ease penalised harder** — the most dangerous state in learning |

`conf` undefined → today's behaviour exactly, which is what keeps Levels 1 and 2
untouched.

**The chart.** A calibration panel on the practice screen, once
`conf.sure.n + conf.think.n + conf.guess.n >= 30`:

> *When you said **sure**, you were right 71% of the time.*

Below the threshold it says how many more answers it needs rather than drawing a
chart from four data points.

**Gate:** `scripts/check-aat3-confidence.js`.
- the toggle renders, is off by default, and clears between questions
  (`resetQState` — the same trap `taskNudge` fell into)
- a flagged answer lands in `guess`, an unflagged one in `sure`
- the counters survive a reload (§1.1) — **this is the assertion that catches the
  `normalisePractice` trap**
- the counters merge correctly across two simulated devices
- `schedule()` called with four arguments is byte-identical to today
- a right-but-guessed answer schedules sooner than a right-and-sure one
- the chart does not render below the threshold, and says why

**Mutations:** omit `conf` from `normalisePractice` (must fail the reload
assertion); make the toggle sticky across questions; make the 4-arg call route
through the new branch.

**Size:** ~250 lines app, ~250 gate, plus `spaced.js`. One to two sessions.

**Open question for you:** is the everyday "Guessing" toggle worth its screen
space, or should confidence live *only* in the Calibration run? The toggle gives
continuous data at the cost of a permanent control on every question. I lean
toward shipping both and dropping the toggle if it goes untapped for a fortnight
— which is itself measurable.

---

## 4. Phase 2 — misconception tags

**What.** Every wrong option names the specific error that leads to it, so the
feedback can say *"you treated £480 as gross"* instead of restating the key.

### 4.1 The registry

A new file, `aat3-misconceptions.js`:

```js
window.AAT3_MISCONCEPTIONS = [
  { id: 'gross-for-net',
    label: 'Treated a gross figure as net',
    explain: 'The figure given already includes VAT, so the VAT is the gross ÷ 6, not the gross × 20%.',
    units: ['tpfb', 'faps'] },
  ...
];
```

Registry first, tags second. A taxonomy grown bottom-up from whatever each
question needed produces fifty near-synonyms and diagnoses nothing.

### 4.2 The tags

**MCQ** — an array parallel to `opts`, indexed against the **unshuffled** array
(§1.4):

```js
{ opts: [...], ans: 0, why: [null, 'gross-for-net', 'vat-fraction-on-net', 'reversed-the-entry'] }
```

**Numeric** — predicted wrong answers, which are *more* valuable than MCQ tags
because they catch the reader's actual arithmetic rather than a choice among
four:

```js
{ type: 'numeric', answer: 80, nearMiss: [ { value: 96, why: 'vat-on-gross' },
                                           { value: 400, why: 'net-not-vat' } ] }
```

Matched on the same `< 0.005` tolerance `gradeAnswer` already uses.

### 4.3 Scale — be honest about it

| Unit | MCQ | Distractors | Numeric |
|---|---|---|---|
| TPFB | 219 | **657** | 107 |
| FAPS | 157 | 471 | 150 |
| MATS | 93 | 279 | 96 |
| BUAW | 142 | 426 | 2 |
| **Total** | **611** | **1,833** | **355** |

1,833 distractors is not a session's work. **Stage it:**

- **2a — the registry and the machinery**, plus `nearMiss` on TPFB's 107 numeric
  questions. Numeric first: two predicted values per question is far quicker than
  three distractor tags, and the payoff per tag is higher.
- **2b — TPFB's 657 MCQ distractors.** The complete unit, exhaustively, as the
  proving run.
- **2c — the rest**, ordered by Phase 1's confident-wrong data.

Ship after 2a. If the feedback does not change how it feels to practise, 2b never
starts and almost nothing is wasted.

### 4.4 Storage

Two maps, for the reason §1.7 sets out:

```js
practice.units[k].misc = { 'gross-for-net': 4, 'reversed-the-entry': 11 }  // practice
data.lessonMisc        = { 'gross-for-net': 1 }                            // lesson checks
```

Monotonic counts, one key per misconception, so both merge under MAX. The first
needs all three per-unit places (§1.5); the second needs `load()` and the `data`
literal.

### 4.5 The screen

On a wrong answer, above the existing explanation:

> **You treated a gross figure as net.**
> The figure given already includes VAT, so the VAT is the gross ÷ 6.

The existing `exp` is unchanged and still shown — it explains the *right* answer,
which is a different job.

### 4.6 Gate: `scripts/check-aat3-misconceptions.js`

Content rules — this is where this repo's real strength is, so the gate does the
heavy lifting:

- every `why` id and every `nearMiss.why` exists in the registry
- every registry entry is used by **at least three** questions — a taxonomy with
  singletons is a list of excuses, not a diagnosis
- `why[ans]` is `null` — the key is not a misconception
- `why.length === opts.length` where `why` is present
- no two distractors in one question carry the same tag; they would be the same
  wrong answer written twice, which is a question defect
- no `nearMiss.value` lands within the grading tolerance (`0.005`, the figure
  `gradeAnswer` already uses) of the question's own `answer`, **and no two
  `nearMiss` values land within that tolerance of each other** — either would
  make the match ambiguous, and the ambiguity would resolve differently
  depending on array order
- a tag's `explain` must not be a substring of the question's `exp` — a tag that
  restates the explanation diagnoses nothing.
  **This one is a heuristic, and heuristics in this repo carry an allowlist with
  a reason each** (the pattern `QUESTION_FLOORS` and the plain-English gate both
  use). It will have false positives, where a tag legitimately shares a phrase
  with the explanation, and false negatives, where a paraphrase says the same
  thing in different words. It is worth having anyway because the failure it
  catches — a hundred tags that each restate their own answer — is the most
  likely way this whole phase turns into decoration.
- **a declared allowlist of untagged questions with a reason each**, and a
  staleness check: an id in the allowlist that no longer exists is an error. This
  is the pattern `QUESTION_FLOORS` already uses.
- **a scope assertion**: the gate must fail if it finds fewer than N tagged
  questions, so the rule cannot silently stop seeing its subjects

Behaviour rules (via the driver):
- picking a tagged distractor renders that misconception's `explain`
- picking the key renders no misconception
- a `nearMiss` hit renders its tag
- the counter rises, and **survives a reload**
- the shuffle: a tagged distractor still shows *its own* tag after options are
  shuffled. **This is the §1.4 assertion and the most important one in the file.**

**Mutations:** index `why` by the shuffled position; allow `why[ans]` non-null;
drop the three-uses floor; drop the scope assertion.

**Size:** machinery ~300 lines app + ~400 gate. Authoring is the cost: 2a is
maybe two sessions, 2b four or more.

---

## 5. Phase 3 — cover-the-options retrieval

**What.** A practice mode where the stem appears with the options hidden. The
reader thinks, taps **"I have my answer"**, and only then do the options appear
to be picked from.

**Why this shape.** Free-recall self-grading ("did I have it?") is a claim about
a thought, and unverifiable. Delaying the options keeps the grading fully
objective while still forcing retrieval before recognition — and the gap between
the two taps is a real measurement: *how long you needed before the options could
rescue you*.

**Scope: `mcq` and `truefalse` only.** Numeric, entrygrid and picklist questions
are already blank-page by construction — there is nothing to cover. Gap-fill is
the awkward one and is deliberately left out: its options are pills rendered
*inline inside the sentence*, so hiding them leaves a sentence full of holes,
which is a different exercise (cloze recall) rather than a covered multiple
choice. It may well be a good exercise. It is not this one, and bundling it here
would mean one mode with two meanings.

A run therefore mixes covered and uncovered questions, and the screen has to say
which is which rather than leaving the reader wondering why some questions have
a "reveal" step and some do not.

**Storage.** None new: the gap lands in the Phase 1 pace record under a
`covered` bucket.

**Screen.** A fourth run type on the practice screen beside Mixed / Endless /
Mistakes, and a per-question blur-then-reveal.

**Gate:** `scripts/check-aat3-covered.js` — options are genuinely absent from the
DOM rather than merely hidden by CSS (a reader can read hidden text; so can a
screen reader); the reveal is one-way within a question; the run grades and
records exactly as an ordinary run does.

**Mutations:** render the options with `visibility: hidden` instead of omitting
them; let the reveal toggle back.

**Size:** ~200 lines app, ~150 gate. One session. **Best value-to-effort on this
list after Phase 1.**

---

## 6. Phase 4 — follow-through (own-figure) marking

**What.** In a multi-part `task`, carry a wrong figure forward *correctly* and
earn the later marks — exactly how AAT marks, and something no practice tool I
know of does.

**Today.** `partCorrect(p, pi)` compares against `p.answer`, an absolute. A part
that depends on an earlier one is wrong twice for one mistake.

**The data.** A part declares its dependency declaratively — no `eval`, no
`new Function`, consistent with `formula-engine.js`'s stated design:

```js
parts: [
  { q: 'VAT on the sale', answer: 80 },
  { q: 'Total invoice', answer: 480, from: { part: 0, op: 'add', operand: 400 } },
]
```

`partCorrect` then accepts **either** the absolute answer **or** the value implied
by what the reader actually entered for part 0.

**`from.part` must point at a numeric part, and the gate must enforce it.**
`partCorrect` reads `S.taskInputs[pi]` for a numeric part but `S.egCells` for a
`type: 'grid'` part — and a grid holds many cells, so "the value the reader
entered" has no single meaning there. A `from` pointing at a grid part is not a
harder case to support; it is a question with no defined answer.

A part marked by follow-through is flagged in `S.taskResults` so the screen can
say so:

> ✓ *Correct on your figure* — £96 + £400 = £496. The £96 above should have been
> £80.

**Why this matters beyond marks.** Because the error propagates, the debrief can
show **where the chain broke** rather than that the last answer was wrong. That is
the single most useful thing a multi-part task can tell a reader.

**Scope.** 34 `task` questions across Level 3. Small enough to do exhaustively;
most parts will need no `from` at all.

**Gate:** extend `scripts/check-aat3-task.js`.
- a `from` part's declared `answer` must equal the operation applied to the
  earlier part's `answer` — an arithmetic consistency check, in the spirit of
  `check-explanation-arithmetic.js`
- `from.part` must be an earlier index (no cycles, no forward references)
- `from.part` must point at a part whose type is numeric — not `choice`, not
  `grid`
- a part with `from` still declares its own absolute `answer`, so a reader who
  gets part 0 right is marked against the truth rather than against themselves
- a run entering a wrong part 0 and the consistent part 1 awards the part 1 mark
- the same run still scores part 0 wrong
- `awardMarks` and `gradeAnswer` agree part for part (the file already asserts
  this; follow-through must not break it)

**Mutations:** allow `from.part` to point forward; let follow-through also excuse
the part that was actually wrong; mark by absolute answer only.

**Size:** ~200 lines app, ~200 gate, plus authoring `from` on maybe 40 parts. One
to two sessions.

---

## 7. Phase 5 — readiness, exam date and mastery

Three things that only become honest once Phases 1 and 2 exist.

### 7.1 Exam date

A date per unit, stored device-local in `prep_v2_aat3_plan`. Drives everything
below and, on its own, a days-remaining line on the unit picker.

### 7.2 The forecast

Per unit, combining per-outcome accuracy (`practice.units[k].los`), the syllabus
weightings (FAPS 5/10/10/10/10/15/20/10/10, MATS 10/15/20/15/15/15/10, TPFB
25/30/20/15/10, BUAW 25/20/20/15/20) and — where Phase 1 has enough readings —
whether the paper would be finished in time.

> **On today's evidence: 63–71%.** Pass is 70%.
> The cheapest six marks are Outcome 4, which you have never practised.

**The interval is the point.** A single number invites false precision; the width
carries how much evidence there is. An outcome with 4 attempts widens it; one with
60 narrows it.

**It must score itself.** Every forecast is stored with its date, and when a mock
is sat the two are compared:

> *Last time I said 68%. You scored 71%.*

A predictor that never checks itself is decoration — the same argument as the
house rule that a checker sometimes wrong about arithmetic is worse than none.

**There is nothing to score against today, and that is a prerequisite, not a
detail.** The store holds `mocks` (a count) and `mockBest` (the best percentage)
and nothing else — no date, no per-sitting score. "Compare the forecast to the
mock that followed it" cannot be built on that: `mockBest` is the best mock ever
sat, which may predate the forecast entirely, and scoring a prediction against a
result from three weeks earlier is worse than not scoring it.

So Phase 5 begins with a **per-mock log**:

```js
// device-local, in prep_v2_aat3_plan
sittings: [ { unit: 'tpfb', at: 1789…, pct: 71, marks: 57, max: 80 } ]
```

A list, so it cannot merge under MAX (§1.2) — hence device-local, alongside the
forecasts it exists to score. `mocks` and `mockBest` stay exactly as they are:
they are the merged, cross-device record, and nothing here disturbs them.

**Consequence to accept up front:** a reader who sits a mock on their phone and
reads the forecast on a laptop sees an unscored forecast. That is the honest
outcome of a mean-like quantity that cannot merge, and the alternative — pretending
the two devices' sittings are one sequence — would score predictions against
results the predictor never saw.

**Gate:** `scripts/check-aat3-forecast.js` — pure function, so assertable without
a browser. Known inputs give known outputs; the interval widens as evidence
thins; an outcome never practised is named rather than assumed average; the
forecast is bounded 0–100 even on absurd input (more correct than attempted,
which a merged backup can produce — `practiceTrend` already clamps for exactly
this reason).

### 7.3 Mastery — the app says *stop*

Per criterion, not per outcome (Level 3 tags all 1,455 questions with criteria,
which is finer than Level 2's skills). A criterion reads **solid** when:

- at least 4 distinct questions answered correctly, and
- each at `sr.reps >= 2`, and
- at least one answered under mock conditions, and
- none answered wrong in the last 21 days

Then the practice screen says *"Outcome 3 is solid — leave it."* Every study tool
pushes more practice; almost none will tell you what you can stop revising, and
three weeks before a paper that is worth more than another hundred questions.

**Gate:** each clause of the rule is load-bearing — remove any one and a seeded
store must flip from solid to not-solid. That is four mutations, written as four
assertions.

**Size:** ~400 lines app, ~350 gate. Two sessions.

---

## 8. Phase 6 — the diagnosis screen

Once Phases 1, 2 and 5 have run for a fortnight there is enough to replace the
practice summary's "most mistakes" row with something that names a *cause*:

> **You have reversed debit and credit on 7 of the 9 credit-note questions you
> have missed.** · [Practise just those]
>
> When you said you were sure, you were right 71% of the time — overconfident by
> about 15 points.
>
> You average 2m10s on control accounts. At that pace the paper runs out two
> tasks early.

This is the payoff, and it is deliberately last: every line of it is a view over
data the earlier phases record, and building the screen before the data exists
would mean designing against imagined numbers.

**Size:** ~300 lines app, ~200 gate. One session.

---

## 9. Every one of these has to be switchable off

Six new panels is not six improvements. The practice screen is already carrying a
summary, a trend chart, an outcome picker, a mock panel, a restore-retired row
and a footer; adding pace, calibration, misconceptions, readiness and mastery
without a way to put any of them away makes the screen worse for a reader who
wants to press one button and answer questions.

So each phase ships with its panel **collapsible**, and the collapsed state lives
in the existing device-local view-preference pattern (`_trendoff` already does
exactly this, keyed per unit and excluded from backup). The default for a panel
is **shown once it has enough data to say something**, and absent before that —
which is the same rule the calibration chart follows at 30 answers and the trend
chart already follows at two points.

The question controls are different and stricter: the Phase 1 "Guessing" toggle
sits beside every question, and if it goes untapped for a fortnight it should be
removed rather than tolerated. That is measurable from its own counters, which is
the point of §13's second open question.

---

## 10. Deliberately not doing

**Authored difficulty tags.** Level 2 has `difficulty` on all 697 questions;
Level 3 has none. The obvious parity move is to tag 1,455 questions — but
difficulty is a property of *a reader*, not of a question, and this app has one
reader. Phase 1 plus the existing `sr` record already measure per-reader
difficulty directly. Deriving it beats authoring it, at zero authoring cost.
**This is a deliberate divergence from the Level 2 pattern, not an oversight.**

**Porting Level 2's skill taxonomy.** Level 3's criteria tags are finer-grained
than Level 2's skills and every question already carries them. A second parallel
taxonomy would be a synonym list to maintain.

**More questions.** 1,455 with enforced per-criterion floors. Question 1,456 is
worth less than a misconception tag on question 12.

**An LLM tutor in the app.** It breaks offline-first, breaks the no-build-step
static-site property, costs money per use — and breaks the property this repo is
actually built on: everything shipped is *checked*. A generated explanation
cannot be gated. An LLM is the right tool for **authoring** Phase 2's tags
offline, with the output reviewed and gated like any other content. It is the
wrong tool for serving them.

---

## 11. Order of work

The session counts below are estimates from recent work in this repo, where a
change of this shape has run roughly: a day on the app code, a day on the gate,
and half a day on mutation testing and the full-suite round trip. They have been
wrong before in one direction — the last three changes each turned up a real
defect during mutation testing that needed a second round. **Read them as "no
smaller than", not as "about".**

| # | Phase | Sessions | Depends on | Ship on its own? |
|---|---|---|---|---|
| 1 | Timing + confidence | 2–3 | — | Yes |
| 3 | Cover-the-options | 1 | Phase 1 (for the gap timing) | Yes |
| 2a | Misconception registry + TPFB numeric | 2 | — | Yes |
| 4 | Follow-through marking | 1–2 | — | Yes |
| 2b | TPFB MCQ distractors | 4+ | 2a | Yes |
| 5 | Readiness + mastery | 2 | Phase 1 | Yes |
| 6 | Diagnosis screen | 1 | 1, 2, 5 | Yes |
| 2c | Remaining units | 6+ | 2b, and evidence it works | Yes |

Every row ships independently behind `npm test` green. Nothing below row 1 is
started before row 1 is merged, because every later phase reads its data.

---

## 12. Abandoning a phase

Every phase writes data. If Phase 2 stops after 2a, the `misc` counters already
written to real stores need a story, and the story is a good one: because
`normalisePractice()` **rebuilds** the record from a named field list (§1.1), a
field removed from that list is dropped on the next load, silently and
completely. The trap that costs a feature its data is also the thing that makes
abandoning one clean.

Two caveats:

- **Device-local keys are not covered by that.** `_pace`, `_plan` and any other
  key outside `practice` persist until something removes them. An abandoned
  phase should delete its own key rather than leave orphaned JSON in a store
  that syncs nothing and explains nothing.
- **Content tags are not data, they are content.** `why[]` and `nearMiss[]` live
  in the question bank. Abandoning Phase 2 after tagging TPFB leaves the tags in
  place and harmless — but the *gate* must then be deleted or its scope
  assertion narrowed, or it will fail the build for the three units that were
  never tagged.

---

## 13. Open questions

1. **The everyday "Guessing" toggle** — worth permanent screen space, or should
   confidence live only in the Calibration run? (§3.2)
2. **Phase 2 stop/go** — after 2a, does specific misconception feedback actually
   change how practice feels? If not, 2b and 2c are ~10 sessions saved.
3. **Mastery thresholds** — 4 questions / 2 reps / 21 days are first guesses.
   They should be one reviewable constant block, not scattered numbers.
4. **Forecast presentation** — a range is honest and may read as hedging. A
   single number with a separate "how sure" line may land better. Worth trying
   both on yourself before gating either.

---

## 14. What the adversarial review of this plan changed

Recorded because the near-misses are the useful part, and because two of them
would have shipped as working-looking code.

| # | Finding | Severity |
|---|---|---|
| 1 | §1.4 said per-option tags must be mapped back through `S._order`. **Wrong** — the renderer emits `data-i="<original index>"`, so `S.picked` is already an authored index and `why[S.picked]` is direct. Building the mapping would have attached every explanation to the wrong option, plausibly. | **Error** |
| 2 | §1.7 said misconception hits count for lesson questions *and* §4.4 put `misc` inside `practice.units[k]`. Those contradict: `check-aat3-practice-summary.js` asserts `store.practice` is **deep-equal** after a whole lesson, so one hit would fail an existing gate. Resolved with `data.lessonMisc`, mirroring `data.lessonQs`. | **Error** |
| 3 | §1.5 named one place a new field must be added. There are **three** for a per-unit field (`normalisePractice`, `practiceRec`'s `blank`, its lazy repair) and **two** for a top-level one (`load()`, the `data` literal). A field added only to `normalisePractice` gives a brand-new unit `undefined` on the reader's first run in it. | **Gap** |
| 4 | Nothing named `openReviewQ()` as a third caller of `gradeAnswer()`. Any counter hooked into grading inflates every time the reader opens a mock review question. | **Gap** |
| 5 | Phase 5 proposed scoring forecasts against mocks, but only `mocks` (a count) and `mockBest` (best ever) are stored — no date, no per-sitting score. The feature had no data to stand on. | **Gap** |
| 6 | `nearMiss` said "must not equal the answer"; it must be "not within the `0.005` grading tolerance", and no two near-misses within that of each other, or the match is order-dependent. | **Error** |
| 7 | Follow-through `from` could point at a `grid` part, where "the value the reader entered" has no single meaning. Restricted to numeric parts, enforced by the gate. | **Gap** |
| 8 | The "tag must not restate the explanation" rule is a heuristic and was stated as a hard rule. Now carries an allowlist-with-reasons, like every other heuristic here. | **Gap** |
| 9 | A new run type needs four edits, not one — `startPractice`, `practiceLabel()`, a button, and a check that `isEndless()` cannot claim it. | **Gap** |
| 10 | Phase 3 included `gapfill`, whose options render inline inside the sentence; covering them is cloze recall, a different exercise. Scoped to `mcq` and `truefalse`. | **Gap** |
| 11 | `written` submits only after the model answer is revealed, so a confidence ask there asks someone looking at the answer. Excluded. | **Gap** |
| 12 | No off-switch story for six new panels, no abandonment story for the data they write. Both now stated (§9, §12). | **Gap** |

Two findings were **not** acted on, deliberately:

- **The "Guessing" toggle's bias is unfixable by design.** A reader who never
  taps it produces all-confident data. That is accepted rather than solved,
  because the asymmetry runs the right way — confident-wrong, the state worth
  catching, is recorded by inaction — and because the Calibration run exists to
  supply unbiased data. §13's first open question is whether the toggle earns its
  place at all.
- **Session estimates remain estimates.** They are labelled "no smaller than"
  rather than made falsely precise.
