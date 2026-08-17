# AAT Level 2 Synoptic Practice

A browser-based study tool for the **AAT Level 2 Certificate in Accounting (Q2022)**, covering all four units:

- Introduction to Bookkeeping (ITBK)
- Principles of Bookkeeping Controls (POBC)
- Principles of Costing (POC)
- The Business Environment (BESY)

Alongside it are two self-contained modules for the levels either side, each with its own design, its own progress and its own renderer:

- **AAT Level 1 Award in Bookkeeping** — Bookkeeping Fundamentals, all five outcomes
- **AAT Level 3 Diploma in Accounting** — Tax Processes for Businesses, all five outcomes

> ⚠️ This is an independent study tool. It is **not** affiliated with, endorsed by, or officially associated with AAT (the Association of Accounting Technicians).

## Features

- **502 audited questions** across six formats — multiple choice, numeric entry, drag-and-drop matching, table completion, gap-fill, and multi-part scenarios.
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

All of the above are fixed. Two gaps are measured but **not** yet fixed, and the
checker reports both on every run so the size of the remaining job stays visible:

- **Teaching depth.** Level 2 cards average 90 words against Level 1's 253 and
  Level 3's 294. 286 of 306 cards fall below a 150-word floor.
- **Syllabus coverage.** Tagging the Introduction to Bookkeeping lessons against the
  encoded criteria showed only 7 of 16 covered. The whole of the analysed cash book
  and petty cash book area has no lesson, while six ITBK lessons teach Level 3
  Financial Accounting material instead.

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
aat3-*.js / aat3-styles.css — the equivalent five files for Level 3
sync-worker/           — the Cloudflare Worker, with its own deployment README
manifest.webmanifest   — PWA manifest (installable app metadata)
sw.js                  — service worker (offline caching)
icon-192.png / icon-512.png / apple-touch-icon.png — app icons
```

## Installing it as an app

When the site is served over HTTPS (e.g. via GitHub Pages), browsers offer an **Install** option:

- **Desktop (Chrome/Edge):** an install icon appears in the address bar.
- **Android:** browser menu → *Add to Home screen* / *Install app*.
- **iOS (Safari):** Share → *Add to Home Screen*.

Once installed, the service worker caches the app so it works **fully offline**. Progress is stored locally in the browser, so installed and in-browser use share the same data on a device.

## Hosting on GitHub Pages

Once this repository is on GitHub, you can publish it free at a public URL:

1. Go to the repository's **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Select the `main` branch and the `/ (root)` folder, then **Save**.
4. After a minute or two the site is live at `https://<your-username>.github.io/<repository-name>/`.

## Licence

Personal study use. Question content is original and was written for revision purposes.
