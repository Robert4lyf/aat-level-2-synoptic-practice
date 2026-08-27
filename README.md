# AAT Level 2 Practice

A browser-based study tool for the **AAT Level 2 Certificate in Accounting (Q2022)**, covering all four units:

- Introduction to Bookkeeping (ITBK)
- Principles of Bookkeeping Controls (POBC)
- Principles of Costing (POC)
- The Business Environment (BESY)

Alongside it are two self-contained modules for the levels either side, each with its own design, its own progress and its own renderer:

- **AAT Level 1 Award in Bookkeeping** — Bookkeeping Fundamentals, all five outcomes
- **AAT Level 3 Diploma in Accounting** — two units: Tax Processes for Businesses (complete) and
  Financial Accounting: Preparing Financial Statements (in progress)

> ⚠️ This is an independent study tool. It is **not** affiliated with, endorsed by, or officially associated with AAT (the Association of Accounting Technicians).

## Features

- **646 audited questions** across nine formats — multiple choice, numeric entry, drag-and-drop matching, table completion, gap-fill, and multi-part scenarios.
- **Topic practice** with instant feedback and worked explanations.
- **Blueprint mock exam** — an 8-task paper (two tasks per unit, foundations → applied), evenly weighted across the four topics, sat under a 2-hour timer with a task-grouped navigator.
- **Spaced repetition** — a Leitner system schedules questions for review at 1, 3, 7, 14 and 30-day intervals.
- **Reference panel** — formulas, double-entry rules and key definitions, available at any time.
- **AAT-style on-screen calculator** with memory keys, square root and percentage.
- **Interactive T-account playground** — post double entries and watch the ledgers and trial balance update live.
- **Progress tracking** — lifetime stats, streaks, topic mastery, flagged questions and wrong-answer review.
- **Backup and restore** — export every subject's progress to one JSON file and import it on another device. Importing combines the two rather than overwriting: the higher score always wins, and nothing already on the receiving device is discarded unless you explicitly choose to replace it.
- **Cross-device sync (optional)** — deploy the small Cloudflare Worker in `sync-worker/`, point `sync-config.js` at it, and devices keep themselves in step automatically. It uses the same merge as import, so two devices that both studied offline end up with both sessions rather than whichever synced last. Off, and invisible, until you configure an endpoint.
- **Installable (PWA)** — install it to a phone or desktop home screen and use it fully offline.
- Light/dark themes and keyboard shortcuts throughout.

## Auditing the Level 2 material

Levels 1 and 3 each ship with a build check that asks whether the material is any
*good* — not merely whether it parses. Level 2, the oldest and largest module here,
had no such check, and adding one (`scripts/check-aat2-quality.js`, built against the
encoded syllabus in `aat2-syllabus.js`) found a good deal:

- 126 questions whose explanation was missing or too short to teach anything
- 30 multiple-choice questions whose answer was identifiable from the shape of the
  options alone, without reading the stem
- nine duplicated question stems, one of them repeated ten times
- four arithmetic errors stated in prose, including a bank-reconciliation task whose
  figures did not reconcile
- roughly a hundred scenario sub-questions that no check had ever examined
- true/false grids keyed 68% true, so guessing "true" beat knowing the topic

All of the above are fixed.

The check also compares each unit's lessons against the encoded syllabus, and that
found something larger than any question defect: **Introduction to Bookkeeping covered
only 7 of its 16 assessment criteria.** The whole of topic area 4 — the analysed cash
book, the petty cash book, totalling and balancing them, and recurring receipts and
payments — had no lesson at all, which is 20% of that unit's assessment. Meanwhile five
lessons in the unit taught Level 3 Financial Accounting material (accruals and
prepayments, the statement of financial position, the extended trial balance, capital
versus revenue, depreciation) that appears nowhere in the Level 2 specification.

That unit is now restructured: nine new lessons cover the missing criteria, the five
off-syllabus lessons have moved to the Financial Accounting unit where they belong, and
**ITBK coverage is enforced at 16/16** so it cannot regress. The check now also requires
every lesson in an enforced unit to claim a criterion — `criteria: []` being the explicit
opt-out for a bridge lesson — which is the rule that would have caught the original
problem.

The same treatment was then applied to the other three units, which turned out to have
the same two-sided defect. Principles of Costing was the worst: six criteria had no
lesson, including the whole of learning outcome 4 — spreadsheets, a tenth of that
assessment — while four of its lessons taught Level 3 Management Accounting.

All four units are now enforced on both ratchets, and the checker prints the position on
every run:

| Unit | Coverage | Cards | Mean words per card |
|---|---|---|---|
| Introduction to Bookkeeping | **16/16 enforced** | 87 | **228 enforced** |
| Principles of Bookkeeping Controls | **10/10 enforced** | 87 | **221 enforced** |
| Principles of Costing | **15/15 enforced** | 84 | **227 enforced** |
| The Business Environment | **22/22 enforced** | 92 | **238 enforced** |

### Taught is not the same as practisable

Coverage proves every criterion is *taught*. It says nothing about whether any of it can
be *practised*, and the two came apart badly. Once the lessons were tagged, a
per-criterion probe of the bank found **five criteria with a lesson and not one question
behind them**, and thirteen more with fewer than four:

- the whole of Principles of Costing outcome 4 — spreadsheets, a tenth of that paper
- ITBK 4.1, entering receipts and payments into an analysed cash book
- POBC 4.2, redrafting the trial balance after adjustments
- POC 3.2, exception reporting, and POC 1.4, sources of information
- BESY 5.3, how the finance team contributes to an organisation's success — which had no
  questions because the lesson covering it had no check questions either

That is now closed: **103 new bank questions**, each tagged with the criteria it tests,
plus 21 new lesson check questions. `QUESTION_FLOORS` in the checker holds every one of
those eighteen criteria at the count it now has. Two lessons that shipped with no check
questions at all have six each, and a new rule requires any lesson claiming a criterion
to carry at least four.

### Scoping the bank to Level 2

Removing off-syllabus questions took three passes, and the reason is worth recording. The
first tested question stems and missed everything naming a Level 3 topic only in its
*options* — "Which adjustment ensures matching of revenue and expenses?" has no giveaway
word in the stem. The second widened to the whole of an MCQ and missed gap-fill
`template`s and drag-and-drop `pairs`, which is where those question types keep all of
their content. The third caught those, plus six ratio-analysis questions the hand-built
removal list had simply skipped.

Scope was settled by grepping the published specification rather than by judgement.
Contribution, break-even, marginal costing, sunk and opportunity cost, accruals and
prepayments, depreciation, gross and net profit margins and ratio analysis all return
zero hits in its scope-of-content sections.

## The Level 1 module

The **Level 1 Award in Bookkeeping** module covers the whole of the Bookkeeping Fundamentals unit
(QN 610/0818/7), following the published qualification specification version 2.1.

- **26 steps** of textbook-style teaching — about 27,000 words across 106 pages — laid out as a
  numbered ladder rather than a branching path, because a beginner's first need is an unambiguous
  next thing to do.
- **All 51 scope items covered**, each declared by the lesson that teaches it and checked at build
  time against the encoded syllabus. A lesson cannot claim coverage the specification does not
  contain, and a shipped outcome cannot leave an item untaught.
- **198 questions** — 124 following the teaching and a separate bank of 74 meant to be met cold —
  in six formats, including click-to-pair matching and reorder-the-steps sequencing, both of which
  suit this unit's recognition and ordering work better than multiple choice does.
- **Documents drawn as documents.** Three of the five outcomes turn on recognising a piece of
  paper, so invoices, credit notes, daybooks, cash books and bank statements are rendered as
  facsimiles rather than described in prose.
- **Vocabulary taught explicitly** — key terms are highlighted where they are first used and
  gathered into glossary strips, which is what the specification's own delivery guidance asks for.
- **Exclusions stated out loud.** Nearly every one of this unit's exclusions is the Level 2
  treatment of a topic it introduces — debits and credits, ledger accounts, VAT from a gross
  figure, bank reconciliation — so the material names them rather than leaving a beginner to
  wonder what they missed.

Its own design language is scoped entirely under `body[data-subject="aat1"]`, and its progress
lives under its own storage key, so nothing it does can reach the other subjects.

## The Level 3 module

The **Level 3 Diploma in Accounting** module carries two of the qualification's four units, each
with its own path, practice bank and progress, behind a picker that opens first:

| Unit | Share of the grade | GLH | State |
|---|---|---|---|
| Tax Processes for Businesses (TPFB) | 15% | 60 | **Complete** — 5 of 5 outcomes, 32 lessons |
| Financial Accounting: Preparing Financial Statements (FAPS) | 40% | 150 | **In progress** — 7 of 9 outcomes, 51 lessons, 80% of the assessment |

FAPS is the largest unit in the qualification: 122 key concepts against TPFB's 93, and more of
the grade than the other three units it sits alongside put together. It arrives outcome by
outcome, as TPFB did.

**A part-built unit says so, in three places.** Its card on the picker is marked before it is
opened, its path carries a notice naming how much of the assessment is written, and every
outcome the specification lists gets a section — the unwritten ones saying they are unwritten.
Rendering only what exists would leave a reader unable to tell a unit missing two thirds of its
content from one whose specification simply has fewer outcomes.

Written so far, in the specification's order:

- **Outcome 1** — the accounting principles, primary users, qualitative characteristics and the
  ethics of preparing accounts.
- **Outcome 2** — the accounting equation, classifying ledger accounts, the books of prime entry,
  posting a daybook with VAT, the three ledgers, control accounts, writing up and balancing off an
  account, the period end, and judging whether a transaction belongs at all.
- **Outcomes 3 and 4** — the whole non-current asset lifecycle: capital versus revenue, the asset
  register, VAT by registration status, disposals, part-exchange, straight-line and
  diminishing-balance depreciation.
- **Outcome 5** — the period end adjustments: accruals and prepayments of both expenses and income
  and the reversals that stop them counting twice, irrecoverable debts and allowances for doubtful
  receivables, inventory at the lower of cost and net realisable value item by item, and the ethics
  of the point in the year where the estimates concentrate.
- **Outcome 7** — the statements themselves, for sole traders and for partnerships: what each
  statement answers and how the accounting equation runs through it, the trading vocabulary,
  building an SPL and an SFP end to end, the sole trader's capital account including drawings of
  goods and services, the partnership appropriation account and profit-sharing ratios, and
  partners' capital and current accounts.

At 20% this is the heaviest outcome in the unit, and it came next because every earlier outcome
feeds it: depreciation, disposals and the period end adjustments are all inputs to the two
statements it produces.
- **Outcome 6** — the trial balance and the extended trial balance: why one is drawn up and what
  agreement does not prove, which column each balance falls in and the four accounts that can go
  either way, the six errors a trial balance cannot see and how each is corrected, the suspense
  account, the adjustments columns, extending each line to the profit or position pair, and
  balancing off with the profit figure. Also why a partnership's extended trial balance differs —
  and that completing one is excluded from the specification.

Outcome 6 came last of the three because it sits between the other two: Outcome 5 supplies the
figures for its adjustments columns and Outcome 7 consumes what it produces, so writing it with
both neighbours already in place meant every cross-reference could point at material that exists.

Outcomes 3 and 4 were written before Outcome 2, which is not the order a reader meets them in.
They are the calculation core — genuinely new at Level 3, and where a right method most easily
produces a wrong figure — and the plan's rule for a first module is *representative rather than
easy*. Outcome 2 came next and filled the gap. Outcome 5 followed it because Outcomes 6 and 7 both
consume its output: every adjustment in it becomes a line in the extended trial balance and a
figure in the statements after that.

### The syllabus is checked against the specification, not just against itself

`scripts/check-aat3-coverage.js` asks whether the encoded syllabus is internally consistent, and
a tree transcribed wrongly is internally consistent. So `check-aat3-syllabus-fidelity.js` reads
the published specification in `docs/reference/` and compares: every key concept id in both
directions, each concept's tier against the "Learners need to…" heading governing it, wording
overlap, topic and outcome structure, weightings and duration against the unit's own test
specification table, exclusions, and indicative bullet counts.

It found two faults in the first FAPS draft, both invisible to every other check: inline lists at
2.3.1 and 2.4.3 split into indicative bullets while the identical construction elsewhere was left
inline, moving 13 units of teaching load onto two concepts for no reason but inconsistency.

One place the extract cannot be read literally is recorded rather than papered over. Topic 2.3 is
set in two columns across a page break, so 2.3.6 is emitted after 2.3.7 and lands under the wrong
heading. The check finds such places itself — the identifiers stop ascending — and requires each
to be listed with a reason. Claiming a scramble that is not one is itself an error.

### Practice summary

Each unit's practice screen opens with a **summary of your practice so far**: how many practice
questions you have attempted, how many you got right, and — the part worth having — which
learning outcome you are getting wrong most, named in full with a button that starts a run on
it. Underneath, every outcome gets a row, so an outcome you have never touched reads *not
practised* rather than quietly not appearing.

Two details are load-bearing rather than cosmetic:

- **The record is kept per unit and then per outcome, not as a running total.** Backups merge two
  devices by taking the larger of each number (see `progress-backup.js`), under which a stored
  grand total would read 10 where the truth is 18. And outcome numbers restart at 1 in every
  unit, so one flat map would add FAPS outcome 1 to TPFB outcome 1 and name a weakest outcome
  belonging to neither.
- **"Most mistakes" is a total order.** Most wrong wins — that is the question being asked, so a
  large outcome answered badly beats a tiny one answered worse. Ties break on lower accuracy,
  then on the larger sample (which only fires on a rounding collision), then on outcome number.
  A partial order would let identical data rank two ways between renders.

Both are asserted by `scripts/check-aat3-practice-summary.js`. It also drives the real thing:
`mount()` writes HTML and then binds click handlers to it, so a fake element that keeps those
handlers plays a whole practice run — and a whole lesson, to show the lesson does *not* move the
practice count — through the real grading, then reads the record back. The page assertions are
scoped to the summary section, because the picker below renders its own "start outcome 4" button
and an unscoped search for one passes with the summary deleted.

Only practice questions are counted. The questions inside lessons are recorded on the path,
which keeps the summary an answer to "what do I know" rather than "what have I read".

## Running it

This is a static site — no build step and no dependencies. Open `index.html` in any modern browser, or host the folder on any static host.

```
index.html             — page shell
styles.css             — all styling
data.js                — question bank, glossary and topic data
app.js                 — application logic
progress-backup.js     — export/import and the cross-device merge
progress-sync.js       — optional automatic sync (pull, merge, push)
sync-config.js         — where the sync endpoint lives (empty = sync off)
aat1-syllabus.js       — Level 1 syllabus spine, encoded from the AAT specification
aat1-learn-data.js     — Level 1 teaching content (26 steps)
aat1-practice-data.js  — Level 1 practice question bank
aat1-ui.js             — Level 1 renderer (self-contained)
aat1-styles.css        — Level 1 design language
aat3-syllabus.js       — Level 3 syllabus spine for both units, checked against the specification
aat3-tax-data.js       — TPFB tax figures, every one sourced and dated
aat3-learn-data.js     — TPFB teaching content
aat3-practice-data.js  — TPFB practice question bank
aat3-faps-data.js      — FAPS teaching content and practice bank
aat3-ui.js             — Level 3 renderer (self-contained, multi-unit)
aat3-styles.css        — Level 3 design language
docs/reference/        — the published qualification specifications, as extracted text
sync-worker/           — the Cloudflare Worker, with its own deployment README
worker/index.js        — password gate + asset serving for the deployed site
wrangler.jsonc         — Cloudflare Workers config (see the note on run_worker_first)
.assetsignore          — what must never be uploaded as a public asset
manifest.webmanifest   — PWA manifest (installable app metadata)
sw.js                  — service worker (offline caching)
icon-192.png / icon-512.png / apple-touch-icon.png — app icons
```

## Installing it as an app

When the site is served over HTTPS (see [Hosting it](#hosting-it)), browsers offer an **Install** option:

- **Desktop (Chrome/Edge):** an install icon appears in the address bar.
- **Android:** browser menu → *Add to Home screen* / *Install app*.
- **iOS (Safari):** Share → *Add to Home Screen*.

Once installed, the service worker caches the app so it works **fully offline**. Progress is stored locally in the browser, so installed and in-browser use share the same data on a device.

## Hosting it

There is no build step — the site is the repository — so any static host will
serve it. Two are set up here.

### Cloudflare Workers, behind a password (recommended)

This is the option to pick if you want to hand the URL to other people without
putting the site on the open internet. It redeploys on every push to `main`, and
it is free: GitHub Pages cannot password-protect a site outside Enterprise, and
Netlify and Vercel both moved theirs behind paid plans.

The site is served by `worker/index.js`, which checks a password before handing
back any file. `wrangler.jsonc` and `.assetsignore` configure that; both are in
the repository, so the dashboard needs almost nothing set by hand.

1. At [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** →
   **Create** → **Import a repository**, pick this repository.
2. Deploy command: `npx wrangler deploy`. There is no build command.
3. The first deploy will serve **503 Not configured** — that is the gate working,
   not a broken deploy. Nothing is served until step 4.
4. **Settings → Variables and Secrets**, add:

   | Name | Required | Notes |
   |---|---|---|
   | `SITE_PASSWORD` | yes | The shared password. Add it as a **Secret**, not plaintext. |
   | `SITE_USERNAME` | no | If set, the username must match too. If unset, any username works and only the password is checked. |

5. Redeploy. The site is live at `https://<worker>.<subdomain>.workers.dev` and
   asks for the password first. A custom domain can be attached free under
   **Settings → Domains & Routes**.

Every merge to `main` redeploys automatically.

**What this is and is not.** It is one shared password, not per-person accounts,
and HTTP Basic authentication encodes rather than encrypts it — HTTPS is what
keeps it private in transit. That is the right weight for sharing a study URL
with a group. It is not access control for anything sensitive. If you want
per-person logins with a revocable list, use **Cloudflare Access** instead (free
up to 50 users); it emails each person a one-time code rather than using a shared
secret, and it sits in front of the Worker rather than replacing it.

Three things about this setup are worth knowing before editing it:

- **`run_worker_first` is load-bearing.** Cloudflare's default is to serve a
  matching static asset straight from the edge without invoking the Worker at
  all — which would serve every page of this site without ever asking for the
  password. `wrangler.jsonc` sets `assets.run_worker_first` to stop that.
  Removing it breaks nothing visibly; it silently unlocks the site.
- **`.assetsignore` decides what is public.** The assets directory is the
  repository root, so anything not excluded there is served to anyone past the
  password — and `node_modules` (created at deploy time by `npx wrangler`)
  contains a 144 MiB binary that is over Cloudflare's 25 MiB per-asset limit and
  fails the build outright.
- **The Worker re-applies the security headers itself**, because responses no
  longer come straight off the edge where `_headers` applies. That makes four
  copies of the policy (`index.html`, `_headers`, `vercel.json` and the Worker).

`npm run check:csp` fails the build if those four drift apart, and
`npm run check:password` exercises the gate against mock requests and asserts the
`wrangler.jsonc` settings it depends on. Both run in CI.

The service worker is unaffected: the browser attaches the stored credentials to
same-origin requests, so offline caching and PWA install work normally once past
the prompt, and a 401 is never cached (the worker only stores 200s).

### GitHub Pages, in the open

Simpler, but public to anyone with the link — there is no way to gate it.

1. Go to the repository's **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Select the `main` branch and the `/ (root)` folder, then **Save**.
4. After a minute or two the site is live at `https://<your-username>.github.io/<repository-name>/`.

## Licence

Personal study use. Question content is original and was written for revision purposes.
