# AAT Level 2 Synoptic Practice

A browser-based study tool for the **AAT Level 2 Certificate in Accounting — Synoptic Assessment (AQ2022)**, covering all four units:

- Introduction to Bookkeeping (ITBK)
- Principles of Bookkeeping Controls (POBC)
- Principles of Costing (POC)
- The Business Environment (BESY)

> ⚠️ This is an independent study tool. It is **not** affiliated with, endorsed by, or officially associated with AAT (the Association of Accounting Technicians).

## Features

- **502 audited questions** across six formats — multiple choice, numeric entry, drag-and-drop matching, table completion, gap-fill, and multi-part scenarios.
- **Topic practice** with instant feedback and worked explanations.
- **Blueprint mock exam** — an 8-task paper (two tasks per unit, foundations → applied), evenly weighted across the four topics, sat under a 2-hour timer with a task-grouped navigator.
- **Spaced repetition** — a Leitner system schedules questions for review at 1, 3, 7, 14 and 30-day intervals.
- **Reference panel** — formulas, double-entry rules and key definitions, available at any time.
- **AAT-style on-screen calculator** with memory keys, square root and percentage.
- **Interactive T-account playground** — post double entries and watch the ledgers and trial balance update live.
- **Progress tracking** — lifetime stats, streaks, topic mastery, flagged questions, wrong-answer review, and CSV export.
- **Installable (PWA)** — install it to a phone or desktop home screen and use it fully offline.
- Light/dark themes and keyboard shortcuts throughout.

## Running it

This is a static site — no build step and no dependencies. Open `index.html` in any modern browser, or host the folder on any static host.

```
index.html             — page shell
styles.css             — all styling
data.js                — question bank, glossary and topic data
app.js                 — application logic
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
