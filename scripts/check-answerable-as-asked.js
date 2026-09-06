#!/usr/bin/env node
/**
 * A question has exactly one defensible answer.
 *
 * THE THREE DEFECTS THAT PROMPTED THIS, all found by a reader, none by the
 * seventy-seven checks already here.
 *
 *   P-2-107  "What is THE alternative to applying the fuel scale charge, for a
 *            business whose cars are fuelled partly for private motoring?"
 *            The reference material lists FOUR ways to handle VAT on road fuel
 *            and THREE are open to a business with private use. Two of them
 *            were on the option list. One was keyed; the other was marked
 *            wrong, and section 12 names the private-use case for it in terms.
 *
 *   P-5-02   "Whether to disclose an error to HMRC." — keyed REFER, while
 *   P-5-23   an error over the ceiling was keyed HANDLE and
 *   P-5-40   a junior notifying HMRC over the ceiling was keyed HANDLE.
 *            Two questions taught the opposite of the third.
 *
 *   P-5-23   "Whether a LARGE error from three years ago must be notified
 *            separately." Under-specified: the size limbs are mechanical, but
 *            deliberateness is a conduct judgement and "large" never said which
 *            limb decided it.
 *
 * WHY NOTHING CAUGHT THEM. Every existing gate reads one question at a time and
 * asks whether it is well FORMED — options distinct, key in range, explanation
 * present, arithmetic sound. None asks whether it is well POSED: whether the
 * rules the app itself governs make a second option defensible. That is a
 * different question and it needs the governed data, not the question alone.
 *
 * WHAT IT ASSERTS. Three rules, each exact, each proven to fire on a real or
 * constructed instance rather than assumed to work:
 *
 *   §1 THE SAME PROPOSITION KEYED BOTH WAYS. Two true/false statements with
 *      identical normalised text and opposite answers. Whichever is wrong, a
 *      reader who meets both is taught a contradiction.
 *
 *   §2 A STEM THAT PROMISES ONE ANSWER WHERE THE RULES PERMIT SEVERAL. A stem
 *      using singular-uniqueness language — "what is THE alternative", "the
 *      only way" — on a topic where the governed data ENUMERATES three or more
 *      permitted options. This is exactly P-2-107. The fix is never to delete
 *      an option: it is to say in the stem which of the permitted routes is
 *      being asked for, so one is uniquely right and the rest are wrong for a
 *      reason that can be stated.
 *
 *   §3 TWO OPTIONS BOTH SATISFYING A GOVERNED THRESHOLD. Where a stem asks
 *      which figure crosses a governed limit and two options do, both are
 *      right. Arithmetic, so exact.
 *
 * WHAT IT DELIBERATELY DOES NOT DO, said plainly rather than left to be found.
 * It cannot catch the P-5-02 case: two questions, worded differently, teaching
 * opposite things about the same decision. §1 needs the wording to match, and
 * matching meaning instead would mean a checker that guesses — which on a rule
 * of tax law is worse than no checker, because it trains people to dismiss its
 * output. Nor can it tell an under-specified stem from a precise one: "a large
 * error" and "a £60,000 error" are the same shape to a regular expression. Both
 * of those stay a reading job, and this file does not pretend otherwise.
 *
 * Run: node scripts/check-answerable-as-asked.js   (exit 1 on any failure)
 */

'use strict';

const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const RED = '\x1b[31m', GREEN = '\x1b[32m', DIM = '\x1b[2m', BOLD = '\x1b[1m', RESET = '\x1b[0m';

const { TAX } = require(path.join(ROOT, 'aat3-tax-data.js'));

/* Level 2 hangs its bank off `window`; read it the way its own gates do. */
function level2Questions() {
  const w = {};
  w.ALL_QUESTIONS = [];
  new Function('window', fs.readFileSync(path.join(ROOT, 'data.js'), 'utf8'))(w);
  return w.ALL_QUESTIONS || [];
}

const BANKS = [
  ['L1', require(path.join(ROOT, 'aat1-practice-data.js')).AAT1_PRACTICE.QUESTIONS],
  ['L2', level2Questions()],
  ['TPFB', require(path.join(ROOT, 'aat3-practice-data.js')).AAT3_PRACTICE.QUESTIONS],
  ['FAPS', (require(path.join(ROOT, 'aat3-faps-data.js')).AAT3_FAPS_PRACTICE || {}).QUESTIONS || []],
  ['MATS', (require(path.join(ROOT, 'aat3-mats-data.js')).AAT3_MATS_PRACTICE || {}).QUESTIONS || []],
  ['BUAW', (require(path.join(ROOT, 'aat3-buaw-data.js')).AAT3_BUAW_PRACTICE || {}).QUESTIONS || []],
];

const norm = s => String(s == null ? '' : s)
  .toLowerCase().replace(/\*\*/g, '').replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();

const errors = [];
let statements = 0, stems = 0, thresholdQs = 0;

/* ── §1 the same proposition, keyed both ways ─────────────────────────────── */
const propositions = new Map();
BANKS.forEach(([bank, qs]) => qs.forEach(q => {
  (q.statements || []).forEach(st => {
    const key = norm(st.text);
    if (!key) return;
    statements++;
    const prev = propositions.get(key);
    if (prev && prev.answer !== st.answer) {
      errors.push(`§1 ${prev.bank} ${prev.id} keys "${st.text.slice(0, 60)}…" as ${prev.answer}, ` +
        `but ${bank} ${q.id} keys the same statement as ${st.answer}`);
    } else if (!prev) {
      propositions.set(key, { bank, id: q.id, answer: st.answer });
    }
  });
}));

/* ── §2 uniqueness language where the rules enumerate several ─────────────── */
/* Each entry: how a stem names the topic, and the governed list of permitted
   options for it. A list of three or more is what makes "the only" a claim the
   rules do not support. */
const ENUMERATED = [
  { re: /fuel scale charge|road fuel/i, list: TAX.fuelScaleCharges.fourWaysToHandleFuelVat,
    what: 'ways to handle VAT on road fuel', where: 'fuelScaleCharges.fourWaysToHandleFuelVat' },
  { re: /full vat invoice|contents of a vat invoice/i, list: TAX.invoicing.contents.full,
    what: 'required contents of a full VAT invoice', where: 'invoicing.contents.full' },
  { re: /records? (a business |the business )?must keep|keeping (vat |business )?records/i,
    list: TAX.records.whatToKeep, what: 'records that must be kept', where: 'records.whatToKeep' },
  { re: /cash accounting scheme/i, list: TAX.schemes.cashAccounting.excluded,
    what: 'supplies excluded from the cash accounting scheme', where: 'schemes.cashAccounting.excluded' },
  { re: /same working day|faster payments|chaps/i, list: TAX.filing.paymentMethods.sameDay,
    what: 'same-day payment methods', where: 'filing.paymentMethods.sameDay' },
  { re: /late (fps|full payment submission)|payroll (filing|late submission) penalt/i,
    list: TAX.payroll.penalties.lateFiling.exceptions,
    what: 'cases where the late filing penalty does not apply', where: 'payroll.penalties.lateFiling.exceptions' },
];
/* A list of three or more permitted options is what makes "the only" a claim
   the rules do not support. Named rather than inlined so the self-check below
   can assert it has not been quietly raised. */
const QUALIFYING_LENGTH = 3;

/* Singular-definite phrasing that promises exactly one answer. "Which of these"
   and "which one of the following" are NOT here: they promise one option is
   correct, which is a property of the option list, not a claim about the rules. */
const PROMISES_ONE = /\bthe (?:alternative|only|sole)\b|\bwhat is the (?:alternative|option|way|method|route)\b/i;

/* ── The rules guard themselves ───────────────────────────────────────────
   Everything below reads the BANKS. Nothing in it can notice this file's own
   table being emptied or its qualifying length raised out of the way, and
   mutation testing confirmed both: with the banks clean, dropping the fuel
   entry or setting the minimum to 99 leaves the gate green while the rule it
   enforces quietly disappears.

   So the configuration is asserted too. Each entry must name a governed list
   that still exists and still has the length that made it worth watching, the
   qualifying length may not be raised above three, and the table may not
   shrink. Defanging this gate now means editing this block, which is a
   deliberate act rather than a number nobody reviews. */
const WATCHED = [
  ['fuelScaleCharges.fourWaysToHandleFuelVat', 4],
  ['invoicing.contents.full', 11],
  ['records.whatToKeep', 6],
  ['schemes.cashAccounting.excluded', 5],
  ['filing.paymentMethods.sameDay', 3],
  ['payroll.penalties.lateFiling.exceptions', 3],
];
/* WHERE THE REGRESS STOPS. A self-check cannot guard its own list without a
   further list to guard that one, so it stops here, at one number in one place:
   deleting a row from WATCHED is caught by the count, and lowering the count is
   the single edit a reviewer has to notice. */
if (WATCHED.length < 6) {
  errors.push(`the self-check watches only ${WATCHED.length} governed lists; it was built to watch 6`);
}
if (QUALIFYING_LENGTH > 3) {
  errors.push(`the qualifying list length has been raised to ${QUALIFYING_LENGTH}; three or more permitted options is what makes "the only" wrong`);
}
WATCHED.forEach(([where, atLeast]) => {
  if (!ENUMERATED.some(E => E.where === where)) {
    errors.push(`${where} is no longer watched by §2 — a stem promising one answer on that topic would pass`);
    return;
  }
  const live = where.split('.').reduce((n, k) => (n == null ? n : n[k]), TAX);
  if (!Array.isArray(live) || live.length < atLeast) {
    errors.push(`${where} now holds ${Array.isArray(live) ? live.length : 'no'} entries, not the ${atLeast} §2 was built around`);
  }
});

BANKS.forEach(([bank, qs]) => qs.forEach(q => {
  const stem = String(q.q || '');
  if (!stem) return;
  stems++;
  if (!PROMISES_ONE.test(stem)) return;
  ENUMERATED.forEach(E => {
    if (!E.re.test(stem)) return;
    if (E.list.length < QUALIFYING_LENGTH) return;
    errors.push(`§2 ${bank} ${q.id}: the stem promises a single answer — "${stem.slice(0, 70)}…" — ` +
      `but ${E.where} lists ${E.list.length} ${E.what}. Say in the stem which one is being asked for.`);
  });
}));

/* ── §3 two options both clearing a governed threshold ────────────────────── */
const THRESHOLDS = [
  { re: /notified separately|separate notification|notify (?:hmrc )?separately|form vat652/i,
    over: TAX.errorCorrection.absoluteCeiling.value, what: 'the £50,000 error ceiling' },
  { re: /must register for vat|compulsor\w* register|registration threshold/i,
    over: TAX.registration.threshold.value, what: 'the VAT registration threshold' },
  { re: /deregist\w*/i, under: TAX.registration.deregistrationThreshold.value,
    what: 'the deregistration threshold' },
];
BANKS.forEach(([bank, qs]) => qs.forEach(q => {
  if (!Array.isArray(q.opts) || typeof q.ans !== 'number') return;
  const stem = String(q.q || '');
  THRESHOLDS.forEach(T => {
    if (!T.re.test(stem)) return;
    const vals = q.opts.map(o => {
      const m = String(o).match(/£\s*([\d,]+)/);
      return m ? Number(m[1].replace(/,/g, '')) : null;
    });
    if (vals.filter(v => v !== null).length < 2) return;
    thresholdQs++;
    const satisfy = vals
      .map((v, i) => (v !== null && (T.over != null ? v > T.over : v < T.under) ? i : null))
      .filter(i => i !== null);
    if (satisfy.length > 1) {
      errors.push(`§3 ${bank} ${q.id}: ${satisfy.length} options clear ${T.what} — ` +
        satisfy.map(i => `"${q.opts[i]}"`).join(' and ') + ' — so more than one is defensible');
    }
  });
}));

/* ── report ───────────────────────────────────────────────────────────────── */
console.log(`${BOLD}Answerable as asked${RESET}\n`);
console.log(`  ${DIM}${BANKS.reduce((n, b) => n + b[1].length, 0)} questions across ${BANKS.length} banks · ` +
  `${statements} true/false statements · ${stems} stems · ` +
  `${thresholdQs} threshold questions · ${ENUMERATED.length} governed lists consulted${RESET}\n`);

if (errors.length) {
  console.log(`${RED}${BOLD}${errors.length} question${errors.length === 1 ? '' : 's'} with more than one defensible answer${RESET}`);
  errors.forEach(e => console.log(`  ${RED}✗${RESET} ${e}`));
  console.log('');
  process.exit(1);
}
console.log(`${GREEN}${BOLD}every question has exactly one defensible answer, as far as the governed rules can say ✓${RESET}\n`);
process.exit(0);
