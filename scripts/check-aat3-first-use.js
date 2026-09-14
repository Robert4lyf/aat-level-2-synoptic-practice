#!/usr/bin/env node
/**
 * Nothing is named before it is explained.
 *
 * A reader meets these lessons in one order: outcome by outcome, lesson by
 * lesson, card by card. A term that turns up in card 4 and is explained in
 * card 186 is not a hard term — it is an unexplained one, and the reader has
 * no way to tell which. The audit that produced this file found twenty-eight
 * abbreviations in the Level 3 material and nine of them were never tied to
 * their own words anywhere at all: CIS, GDPR, CPD, AAT, IAS, CVP, FIFO, AVCO
 * and the API in a digital-links sentence. Several others were bound only
 * after a hundred cards had used them.
 *
 * WHAT THIS ASSERTS. For every abbreviation below, the card where it FIRST
 * appears in reading order also contains the words it stands for. Not the
 * lesson — the card, because a card is what a reader sees at one time.
 *
 * WHY A DECLARED LIST rather than a sweep for capital letters. The material
 * uses CAPITALS for emphasis ("NOT", "BOTH", "DOES"), spreadsheet references
 * (B2, F20) and function names (VLOOKUP, SUMIF), none of which are
 * abbreviations needing expansion. A sweep would drown the real findings in
 * those, and a sweep with an exclusion list is a declared list wearing a
 * disguise. So the list is explicit, and the SCOPE assertion below fails if it
 * stops covering what the material actually contains.
 *
 * Run: node scripts/check-aat3-first-use.js   (exit 1 on any failure)
 */

'use strict';

const path = require('path');
const ROOT = path.join(__dirname, '..');
const RED = '\x1b[31m', GREEN = '\x1b[32m', DIM = '\x1b[2m', BOLD = '\x1b[1m', RESET = '\x1b[0m';

const UNITS = [
  ['tpfb', 'aat3-learn-data.js', 'AAT3_LEARN_PATH'],
  ['faps', 'aat3-faps-data.js',  'AAT3_FAPS_PATH'],
  ['mats', 'aat3-mats-data.js',  'AAT3_MATS_PATH'],
  ['buaw', 'aat3-buaw-data.js',  'AAT3_BUAW_PATH'],
];

/* abbreviation -> a pattern matching the words it stands for. The pattern is
   deliberately loose about wording ("Revenue and Customs" rather than the whole
   of HMRC's name) because the point is that the reader is told what the letters
   mean, not that one phrasing is used. */
const EXPANSIONS = {
  HMRC: 'Revenue and Customs',
  AAT: 'Association of Accounting Technicians',
  MTD: 'Making Tax Digital',
  RTI: 'Real Time Information',
  PAYE: 'Pay As You Earn',
  NIC: 'National Insurance',
  FPS: 'Full Payment Submission',
  EPS: 'Employer Payment Summary',
  CIS: 'Construction Industry Scheme',
  GDPR: 'General Data Protection Regulation',
  CPD: 'continuing professional development',
  PLR: 'potential lost revenue',
  PVA: 'ostponed VAT accounting',
  PPD: 'prompt payment discount',
  IAS: 'International Accounting Standard',
  SPL: 'statement of profit or loss',
  SFP: 'statement of financial position',
  NRV: 'net realisable value',
  ETB: 'extended trial balance',
  ROCE: 'eturn on capital employed',
  CVP: 'cost-volume-profit',
  WIP: 'work in progress',
  EOQ: 'economic order quantity',
  FIFO: 'first in, first out',
  AVCO: 'average cost',
  ABC: 'activity based costing',
  PESTLE: 'political',
  LLP: 'limited liability partnership',
};

let failures = 0, checks = 0;
function ok(cond, label) {
  checks++;
  if (!cond) { failures++; console.log(`  ${RED}✗${RESET} ${label}`); }
}

console.log(`${BOLD}Level 3 — nothing is named before it is explained${RESET}\n`);

/* Flatten to reading order: a card is one record, and a lesson's check
   questions read after its cards. */
function textOf(card) {
  const bits = [];
  const push = v => {
    if (v == null) return;
    if (typeof v === 'string') { bits.push(v); return; }
    if (Array.isArray(v)) { v.forEach(push); return; }
    if (typeof v === 'object') { Object.values(v).forEach(push); return; }
  };
  Object.values(card).forEach(push);
  return bits.join('\n');
}
const SEQ = [];
UNITS.forEach(([unit, file, key]) => {
  require(path.join(ROOT, file))[key].forEach(o => {
    (o.lessons || []).forEach(les => {
      (les.cards || []).forEach((card, ci) =>
        SEQ.push({ unit, lesson: les.id, where: 'card ' + ci, text: textOf(card) }));
      (les.check || []).forEach((q, qi) =>
        SEQ.push({ unit, lesson: les.id, where: 'check ' + qi,
                   text: [q.q, q.exp].concat(q.opts || []).filter(Boolean).join('\n') }));
    });
  });
});

ok(SEQ.length > 800, `only ${SEQ.length} cards were read, so this file is not seeing the material`);

/* ── Every abbreviation is explained where it is first met ──────────────── */
let covered = 0;
Object.keys(EXPANSIONS).forEach(abbr => {
  const use = new RegExp('\\b' + abbr + '\\b');
  const exp = new RegExp(EXPANSIONS[abbr], 'i');
  const first = SEQ.find(r => use.test(r.text));
  if (!first) return;                    /* handled by the scope check below */
  covered++;
  ok(exp.test(first.text),
    `${abbr} is first used in ${first.unit} ${first.lesson} ${first.where}, which never says what it ` +
    `stands for — the reader meets the letters with nothing to attach them to`);
});

/* ── SCOPE ─────────────────────────────────────────────────────────────────
   Two ways this file could quietly stop working. An abbreviation could be
   renamed out of the material, leaving an entry above that tests nothing; or
   the material could gain a new one that nobody adds here. The first is
   checked; the second cannot be, which is why the list is documented as
   explicit rather than pretending to be a sweep. */
Object.keys(EXPANSIONS).forEach(abbr => {
  const use = new RegExp('\\b' + abbr + '\\b');
  ok(SEQ.some(r => use.test(r.text)),
    `${abbr} is on this list but appears nowhere in the material — the entry is dead`);
});
ok(covered >= 25,
  `only ${covered} of the declared abbreviations were found in the material, so most of this file ` +
  'checked nothing');

console.log(failures
  ? `\n${RED}${BOLD}✗ ${failures} of ${checks} checks failed${RESET}`
  : `\n${GREEN}${BOLD}── Every abbreviation is explained where it is first met ✓${RESET}  ${DIM}(${checks} assertions)${RESET}`);
process.exit(failures ? 1 : 0);
