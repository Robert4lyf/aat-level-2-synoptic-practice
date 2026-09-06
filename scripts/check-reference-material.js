#!/usr/bin/env node
/**
 * Every figure sourced to the AAT reference material really is in it.
 *
 * WHAT CHANGED, AND WHY IT NEEDS A GATE. aat3-tax-data.js used to be sourced
 * entirely from HMRC — notices, manuals, gov.uk pages — each entry carrying a
 * `source` string and a `checked` date. Those strings are prose: nothing could
 * verify them, and nothing had to, because the claim they made was only "a
 * human looked this up once".
 *
 * The AAT reference material is different in kind. It is the document the
 * candidate has ON SCREEN at every task position, so where it and HMRC differ
 * in wording it is what the marking follows — and unlike a notice, it is in
 * this repository. A claim of the form "this figure comes from the reference
 * material" is therefore CHECKABLE, and reconciling the two files turned up
 * three entries that disagreed with it (the flat rate leaving test, how a
 * penalty point expires, and an invoice-contents list missing three of its
 * eleven items). Those were found by reading. This is what finds the next one.
 *
 * WHAT IT ASSERTS
 *
 *   §1 Both documents are present, as a PDF and as a text extract, and the
 *      extract is not a stub.
 *   §2 TAX.REFERENCE_MATERIAL describes the edition the extract actually is —
 *      same Finance Act, same assessable-from date — and lists its 25 sections
 *      with the titles the contents page gives them. A file that rolls to a new
 *      Finance Act without the extract rolling with it fails here.
 *   §3 EVERY NUMBER carried by an entry whose source is the reference material
 *      appears in the reference material. This is the load-bearing one. It
 *      cannot prove a figure means what the entry says it means, but a figure
 *      that is not in the document at all is either mis-sourced or wrong, and
 *      both are defects.
 *   §4 Every named list taken verbatim from it — the invoice contents, the
 *      fuel scale bands, the notifiable changes — matches the document text.
 *
 * HOW MATCHING WORKS. The PDF's text layer breaks words across lines mid-word
 * ("the ti\nme of the supply"), so comparison strips everything that is not a
 * letter or a digit from both sides. That is coarse by design: the check is
 * "does this figure occur in this document", not "is this sentence quoted".
 *
 * WHAT IT DELIBERATELY DOES NOT DO. It does not require every entry in
 * aat3-tax-data.js to be sourced to the reference material — most are not, and
 * NOT_IN_REFERENCE_MATERIAL records the ones that never can be. It does not
 * read the PDF; the extract is the artefact under test, and a PDF whose extract
 * is stale fails §2 rather than passing silently.
 *
 * Run: node scripts/check-reference-material.js   (exit 1 on any failure)
 */

'use strict';

const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const RED = '\x1b[31m', GREEN = '\x1b[32m', DIM = '\x1b[2m', BOLD = '\x1b[1m', RESET = '\x1b[0m';

const { TAX } = require(path.join(ROOT, 'aat3-tax-data.js'));

const DOCS = path.join(ROOT, 'docs', 'reference');
const MAIN = 'aat-l3-tpfb-reference-material-fa2025';
const INVOICE = 'aat-l3-tpfb-vat-invoice-contents-fa2025';

const errors = [];
const fail = m => errors.push(m);

/* Letters and digits only. The extract breaks words across lines mid-word, and
   the data file uses typographic dashes and non-breaking spaces the PDF does
   not, so anything else is noise for this comparison. */
const squash = s => String(s == null ? '' : s).toLowerCase().replace(/[^a-z0-9]+/g, '');

console.log(`${BOLD}Reference material${RESET}\n`);

/* ── §1 the documents are here ───────────────────────────────────────────── */
let mainText = '', invoiceText = '';
for (const [stem, label] of [[MAIN, 'reference material'], [INVOICE, 'invoice contents sheet']]) {
  const pdf = path.join(DOCS, stem + '.pdf');
  const txt = path.join(DOCS, stem + '-extracted.txt');
  if (!fs.existsSync(pdf)) fail(`§1 the ${label} PDF is missing: docs/reference/${stem}.pdf`);
  if (!fs.existsSync(txt)) { fail(`§1 the ${label} text extract is missing: docs/reference/${stem}-extracted.txt`); continue; }
  const body = fs.readFileSync(txt, 'utf8');
  if (squash(body).length < 400) fail(`§1 the ${label} extract is a stub (${squash(body).length} characters of content)`);
  if (stem === MAIN) mainText = body; else invoiceText = body;
}
const BOTH = squash(mainText + '\n' + invoiceText);
const has = needle => BOTH.includes(squash(needle));

/* ── §2 the data file describes the edition the extract actually is ──────── */
const RM = TAX.REFERENCE_MATERIAL || {};
if (!RM.title) fail('§2 TAX.REFERENCE_MATERIAL is missing — nothing records which edition the figures came from');
else {
  if (RM.financeAct !== TAX.FINANCE_ACT) {
    fail(`§2 REFERENCE_MATERIAL.financeAct is ${RM.financeAct}, but the file is built for ${TAX.FINANCE_ACT}`);
  }
  if (RM.assessmentsFrom !== TAX.ASSESSABLE_FROM) {
    fail(`§2 REFERENCE_MATERIAL.assessmentsFrom is ${RM.assessmentsFrom}, but ASSESSABLE_FROM is ${TAX.ASSESSABLE_FROM}`);
  }
  /* The cover page names both, so a rolled document with an unrolled data file
     — or the reverse — is caught rather than assumed. */
  if (!has('Finance Act ' + String(RM.financeAct).replace(/^FA/, ''))) {
    fail(`§2 the extract does not name ${RM.financeAct}; the data file and the document are different editions`);
  }
  const sections = RM.sections || [];
  if (sections.length !== 25) fail(`§2 REFERENCE_MATERIAL lists ${sections.length} sections; the document has 25`);
  sections.forEach(sec => {
    if (!has(sec.title)) fail(`§2 section ${sec.n} “${sec.title}” does not appear in the extract`);
  });
}

/* ── §3 every figure claiming this source occurs in the document ─────────── */
/* An entry is "sourced to the reference material" if any of its own string
   values names it. Entries use `source` for the whole node and, where only part
   of a node comes from the document, a suffixed key — `conditionsSource`,
   `monthEndSource` — so the test is on the value, not on the key's name. */
const NAMES_IT = /reference material/i;

let figuresChecked = 0, nodesChecked = 0;
const missing = [];

function numbersIn(node) {
  const out = [];
  (function walk(n) {
    if (n == null) return;
    if (typeof n === 'number') { out.push(n); return; }
    if (typeof n === 'string' || typeof n === 'boolean') return;
    if (Array.isArray(n)) { n.forEach(walk); return; }
    Object.keys(n).forEach(k => walk(n[k]));
  }(node));
  return out;
}

/* How a figure could legitimately be written in the document. 1350000 appears
   as "£1.35m"; 16.5 as "16.5%"; 230000 as "£230,000". Any one form is enough. */
function figureAppears(v) {
  if (!Number.isFinite(v)) return true;
  const forms = new Set();
  forms.add(String(v));
  forms.add(v.toLocaleString('en-GB'));
  if (Number.isInteger(v) && v >= 1000000 && v % 10000 === 0) {
    forms.add(String(v / 1000000) + 'm');                    /* 1.35m */
  }
  if (Number.isInteger(v) && v >= 1000 && v % 1000 === 0) {
    forms.add(String(v / 1000) + 'k');
  }
  for (const f of forms) if (BOTH.includes(squash(f))) return true;
  return false;
}

/* Figures that are structure rather than content: array indexes, section
   numbers, and the small integers a note happens to contain. Only `value`
   fields and the tabulated band figures are treated as claims. */
function claimedFigures(node) {
  const out = [];
  if (node && typeof node === 'object' && !Array.isArray(node) && Number.isFinite(node.value)) {
    out.push({ v: node.value, why: 'value' });
  }
  Object.keys(node || {}).forEach(k => {
    const child = node[k];
    if (child && typeof child === 'object' && !Array.isArray(child) && Number.isFinite(child.value)
        && !claimedFiguresHasSource(child)) {
      out.push({ v: child.value, why: k });
    }
  });
  return out;
}
/* A child carrying its own source is checked on its own pass, not on its
   parent's — otherwise a node sourced elsewhere is dragged in by its parent. */
function claimedFiguresHasSource(n) {
  return Object.keys(n).some(k => typeof n[k] === 'string' && /source/i.test(k));
}

(function walkForSources(node, pathStr) {
  if (!node || typeof node !== 'object') return;
  if (!Array.isArray(node)) {
    const sourced = Object.keys(node).some(k =>
      /source/i.test(k) && typeof node[k] === 'string' && NAMES_IT.test(node[k]));
    if (sourced) {
      nodesChecked++;
      claimedFigures(node).forEach(f => {
        figuresChecked++;
        if (!figureAppears(f.v)) missing.push(`${pathStr}.${f.why} = ${f.v}`);
      });
      /* Tabulated rows — the fuel scale bands — are the point of the table, so
         every number in them is a claim. */
      Object.keys(node).forEach(k => {
        if (!Array.isArray(node[k])) return;
        numbersIn(node[k]).forEach(v => {
          figuresChecked++;
          if (!figureAppears(v)) missing.push(`${pathStr}.${k} contains ${v}`);
        });
      });
    }
  }
  Object.keys(node).forEach(k => {
    if (/source/i.test(k)) return;
    walkForSources(node[k], pathStr ? pathStr + '.' + k : k);
  });
}(TAX, ''));

missing.forEach(m => fail(`§3 ${m} — not in the reference material, so the source is wrong or the figure is`));

/* ── §4 the verbatim lists are verbatim ──────────────────────────────────── */
const C = (TAX.invoicing && TAX.invoicing.contents) || {};
[['full', C.full], ['simplified', C.simplified]].forEach(([which, list]) => {
  if (!Array.isArray(list) || !list.length) { fail(`§4 the ${which} invoice contents list is missing`); return; }
  list.forEach(item => {
    /* Compare the first clause. A whole bullet includes an em dash and a
       parenthetical the extract splits differently; the opening words are what
       identify the requirement. */
    const head = String(item).split(/[—(]/)[0].trim();
    if (!has(head)) fail(`§4 ${which} invoice contents: “${head}” is not in the document`);
  });
});
if (Array.isArray(C.full) && C.full.length !== 11) fail(`§4 a full VAT invoice has 11 required contents; the list has ${C.full.length}`);
if (Array.isArray(C.simplified) && C.simplified.length !== 4) fail(`§4 a simplified VAT invoice has 4; the list has ${C.simplified.length}`);

/* The two penalty-point expiry periods. A bare "25" survives §3 unaided —
   "26 January 2026" is on the cover page, so almost any small integer occurs
   somewhere — which is exactly the weakness §3's header admits to. Here the
   document's own phrasing is the test, and the two periods must differ by
   exactly the one month that separates the month-end case from the rest. */
const LS = (TAX.penalties && TAX.penalties.lateSubmission) || {};
[[LS.pointExpiryMonths, 'a deadline that was NOT a month end'],
 [LS.pointExpiryMonthEndMonths, 'a deadline that WAS a month end']].forEach(([node, which]) => {
  const n = node && node.value;
  if (!Number.isFinite(n)) { fail(`§4 no penalty point expiry period recorded for ${which}`); return; }
  if (!has(n + ' months after this')) {
    fail(`§4 a point earned on ${which} is said to expire after ${n} months; the document does not say that`);
  }
});
if (Number.isFinite(LS.pointExpiryMonths && LS.pointExpiryMonths.value)
    && Number.isFinite(LS.pointExpiryMonthEndMonths && LS.pointExpiryMonthEndMonths.value)
    && LS.pointExpiryMonthEndMonths.value !== LS.pointExpiryMonths.value + 1) {
  fail(`§4 the month-end expiry should be exactly one month longer than the other; it is ${LS.pointExpiryMonthEndMonths.value} against ${LS.pointExpiryMonths.value}`);
}

const CH = (TAX.registration && TAX.registration.changesToNotify) || {};
if (!Array.isArray(CH.items) || CH.items.length !== 5) fail(`§4 the notifiable changes list should have 5 entries; it has ${(CH.items || []).length}`);

const FS = TAX.fuelScaleCharges || {};
if (!Array.isArray(FS.bands) || FS.bands.length !== 22) fail(`§4 the fuel scale table should have 22 bands; it has ${(FS.bands || []).length}`);
else {
  /* Ascending, in steps of 5, or the rounding helper walks off the end. */
  FS.bands.forEach((b, i) => {
    if (i && b.co2 !== FS.bands[i - 1].co2 + 5) fail(`§4 fuel scale band ${b.co2} does not follow ${FS.bands[i - 1].co2} in steps of 5`);
    if (!(b.annual > b.quarterly && b.quarterly > b.monthly)) {
      fail(`§4 fuel scale band ${b.co2}: the 12-month figure should exceed the 3-month, which should exceed the 1-month`);
    }
  });
}

/* The rounding rule, which is what the table is actually assessed on. */
const API = require(path.join(ROOT, 'aat3-tax-data.js'));
if (typeof API.fuelScaleCharge === 'function') {
  const cases = [
    [137, 'quarterly', 280, 'rounds DOWN to the 135 band, not up to 140'],
    [135, 'quarterly', 280, 'an exact multiple of 5 stays put'],
    [95, 'annual', 661, 'below the table takes the “120 or less” band'],
    [400, 'annual', 2314, 'above the table takes the “225 or more” band'],
    [224, 'monthly', 187, 'rounds down to 220, not up to 225']
  ];
  cases.forEach(([co2, period, want, why]) => {
    const got = API.fuelScaleCharge(co2, period);
    if (got !== want) fail(`§4 fuelScaleCharge(${co2}, '${period}') is ${got}, expected ${want} — ${why}`);
  });
} else {
  fail('§4 fuelScaleCharge() is not exported; the rounding rule is then a literal at every call site');
}

/* ── report ──────────────────────────────────────────────────────────────── */
console.log(`  ${DIM}${(TAX.REFERENCE_MATERIAL.sections || []).length} sections · ${nodesChecked} sourced entries · ${figuresChecked} figures checked against the document${RESET}\n`);

if (errors.length) {
  console.log(`${RED}${BOLD}${errors.length} problem${errors.length === 1 ? '' : 's'}${RESET}`);
  errors.forEach(e => console.log(`  ${RED}✗${RESET} ${e}`));
  console.log('');
  process.exit(1);
}
console.log(`${GREEN}${BOLD}every figure sourced to the reference material is in it ✓${RESET}\n`);
process.exit(0);
