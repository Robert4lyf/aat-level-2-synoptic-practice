#!/usr/bin/env node
/**
 * An entry grid shows the reader the figures it asks them to work from.
 *
 * THE BUG THIS EXISTS FOR. question-grid.js renders every cell of an entry grid
 * as an empty input, and until the `given` field there was no way to PRINT a
 * figure the reader works from. Ten questions across two banks were written as
 * though there were:
 *
 *   P2-28   "Complete the missing figure in each business's accounting
 *           equation" — three company names and nine empty boxes.
 *   P4-105  "Total each column of the payments side and check that it cross
 *           casts" — no column to total.
 *   P4-137  "Complete the closing balance for each customer" — three names.
 *   P-2-132 "Sort the VAT on each of these purchases" — four descriptions and
 *           no amounts anywhere.
 *
 * Every expected figure lived in the answer key. The explanations quoted them
 * confidently — "Redfern: £3,600.00 − £240.00 = £3,360.00" — so a reader who
 * got it wrong was shown a worked answer to a question they had never been
 * given the data for. A reader found them. None of 75 checks did.
 *
 * TWO RULES, BOTH EXACT, AND A STATED LIMIT.
 *
 *   §1 A grid that shows NO MONEY at all and asks for figures. Money means a
 *      figure written as money — £-prefixed, or carrying pence, or with a
 *      thousands separator — as opposed to the invoice numbers, credit note
 *      numbers, week numbers and dates that made "count the digits" useless
 *      here. Across all five banks this separates perfectly: every unanswerable
 *      grid but two shows no money, and no sound grid does.
 *
 *   §2 A grid that shows ONE amount and asks the reader to split it into three
 *      or more parts that sum back to it. The parts are unknowable — there is
 *      one equation and three unknowns — and no sound grid in any bank does it.
 *
 * WHAT THESE RULES DO NOT CATCH, said plainly rather than left to be
 * discovered: a grid that shows one or two real amounts and asks for figures
 * built on data it never mentions. P3-129 — "Enter these two sales invoices",
 * naming neither — is the example, and it is caught by nobody but a reader.
 * Deciding it mechanically means solving the question, and the arithmetic
 * search that would take fails the sound multi-step grids far more often than
 * it catches an unsound one: a first version of this file flagged 22 of 44,
 * including questions corrected earlier the same day.
 *
 * Run: node scripts/check-grid-answerable.js
 */
'use strict';

const path = require('path');
const ROOT = path.join(__dirname, '..');
const RED = '\x1b[31m', GREEN = '\x1b[32m', BOLD = '\x1b[1m', DIM = '\x1b[2m', RESET = '\x1b[0m';

const BANKS = [
  ['aat1-practice-data.js', 'AAT1_PRACTICE', 'Level 1 BKFN'],
  ['aat3-practice-data.js', 'AAT3_PRACTICE', 'Level 3 TPFB'],
  ['aat3-faps-data.js', 'AAT3_FAPS_PRACTICE', 'Level 3 FAPS'],
  ['aat3-mats-data.js', 'AAT3_MATS_PRACTICE', 'Level 3 MATS'],
  ['aat3-buaw-data.js', 'AAT3_BUAW_PRACTICE', 'Level 3 BUAW'],
];

/* £1,200 · £1,200.00 · 1,200 · 12.50 — and NOT "Invoice 2201", "CN 411",
   "Week 1" or "4 May", which is the whole reason this is not a digit count. */
const MONEY = /£\s*\d[\d,]*(?:\.\d+)?|\d[\d,]*\.\d{2}(?!\d)|\d{1,3}(?:,\d{3})+/g;
const val = (s) => Number(String(s).replace(/[£,\s]/g, ''));

let failures = 0, grids = 0;
const notes = [];
function fail(msg) { failures++; console.log(`  ${RED}✗${RESET} ${msg}`); }

console.log(`${BOLD}Entry grids show their data${RESET}  ${DIM}the reader can see what they are asked to work from${RESET}\n`);

function cellKey(row, ci) {
  if (row && row.cells) {
    const v = row.cells[ci];
    return v == null ? null : v;
  }
  return row.col === ci ? row.amount : null;
}
const givenOf = (row) => new Set((Array.isArray(row && row.given) ? row.given : []).map(Number));

BANKS.forEach(([file, name, label]) => {
  let mod;
  try { mod = require(path.join(ROOT, file)); } catch (e) { return; }
  const qs = ((mod[name] || mod).QUESTIONS) || [];
  const gs = qs.filter((q) => q.type === 'entrygrid' && q.entrygrid);
  if (!gs.length) return;
  let bad = 0;

  gs.forEach((q) => {
    grids++;
    const g = q.entrygrid;
    const rows = g.rows || [], cols = g.columns || [];

    const prose = String(q.q || '') + ' ' + cols.join(' ') + ' ' +
      rows.map((r) => r.label || '').join(' ');
    const shown = (prose.match(MONEY) || []).map(val);
    /* A given cell is a figure on the screen, and counts as fully as one in
       the stem — that is what it is for. */
    rows.forEach((r) => {
      givenOf(r).forEach((ci) => {
        const v = cellKey(r, ci);
        if (v != null) shown.push(v);
      });
    });

    const asked = [];
    rows.forEach((r) => {
      const gv = givenOf(r);
      cols.forEach((c, ci) => {
        if (gv.has(ci)) return;
        const v = cellKey(r, ci);
        if (v != null) asked.push(v);
      });
    });
    if (!asked.length) return;

    /* §1 */
    if (shown.length === 0) {
      bad++;
      fail(`${label} ${q.id}: asks the reader for ${asked.length} figures and shows them no amount at all — ` +
        `the stem, the row labels and the column headings carry no money, so every cell is an empty box ` +
        `over data that was never provided. Put the figures in the stem, or mark the columns they come ` +
        `from as \`given\`.`);
      return;
    }

    /* §2 */
    if (shown.length === 1 && asked.length >= 3) {
      const sum = asked.reduce((a, b) => a + b, 0);
      if (Math.abs(sum - shown[0]) < 0.005) {
        bad++;
        fail(`${label} ${q.id}: shows one amount, ${shown[0].toLocaleString('en-GB')}, and asks the reader ` +
          `to split it into ${asked.length} parts that add back to it (${asked.join(' + ')}). ` +
          `One equation, ${asked.length - 1} unknowns — the split cannot be worked out, only known.`);
      }
    }
  });

  notes.push(`${label}: ${gs.length} grids, ${gs.length - bad} show their data`);
});

notes.forEach((n) => console.log(`  ${DIM}${n}${RESET}`));
console.log();
if (failures) {
  console.log(`${RED}${BOLD}✗ ${failures} of ${grids} entry grids ask for figures the reader cannot see${RESET}\n`);
  process.exit(1);
}
console.log(`${GREEN}${BOLD}── Every entry grid shows the reader its data ✓${RESET}  ${DIM}(${grids} grids)${RESET}\n`);
