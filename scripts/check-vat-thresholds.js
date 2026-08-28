#!/usr/bin/env node
/**
 * TPFB agrees with itself about the VAT thresholds.
 *
 * The registration and deregistration figures are governed in
 * aat3-tax-data.js, each with a source and a checked date, and the lessons and
 * questions already interpolate them rather than restating them. That much is
 * safe on its own. What is not safe is the other half of every one of those
 * sentences: the SCENARIO figures are literals, and the teaching point is their
 * RELATIONSHIP to a threshold.
 *
 *     "£96,000 − £11,000 = £85,000 ... below the £90,000 threshold"
 *
 * Move the threshold to £80,000 in a future Finance Act and every figure in
 * that sentence is still individually correct, the interpolation still renders,
 * every existing check still passes — and the lesson now teaches the opposite
 * of the law. Nothing about it looks wrong; the conclusion simply inverts.
 *
 * So this checks the relationships, not the numbers:
 *
 *   - No figure is presented as a registration or deregistration threshold
 *     unless it is the governed one. (Scheme thresholds are governed too and
 *     are allowed, being different thresholds rather than wrong ones.)
 *   - Every subtraction against a threshold computes, and where the question is
 *     numeric its stored answer equals the explanation's result.
 *   - Every "below/above the threshold" verdict is true of the figure it judges.
 *
 * Run: node scripts/check-vat-thresholds.js   (exit 1 on any failure)
 */

'use strict';

const path = require('path');
const ROOT = path.join(__dirname, '..');
const RED = '\x1b[31m', GREEN = '\x1b[32m', DIM = '\x1b[2m', BOLD = '\x1b[1m', RESET = '\x1b[0m';

const { TAX } = require(path.join(ROOT, 'aat3-tax-data.js'));
const { AAT3_PRACTICE } = require(path.join(ROOT, 'aat3-practice-data.js'));
const { AAT3_LEARN_PATH } = require(path.join(ROOT, 'aat3-learn-data.js'));

const REG = TAX.registration.threshold.value;
const DEREG = TAX.registration.deregistrationThreshold.value;
const S = TAX.schemes;
/* Every governed threshold, so a scheme figure is not mistaken for a wrong
   registration one. They are different thresholds, not bad copies of the same. */
const GOVERNED = new Set([REG, DEREG,
  S.cashAccounting.joinThreshold.value, S.cashAccounting.leaveThreshold.value,
  S.annualAccounting.joinThreshold.value, S.annualAccounting.leaveThreshold.value,
  S.flatRate.joinThreshold.value, S.flatRate.leaveThreshold.value]);

const gbp = n => '£' + n.toLocaleString('en-GB');
const num = s => Number(String(s).replace(/[£,]/g, ''));

const errors = [];
let verdicts = 0, sums = 0, statements = 0;

function check(where, text, answer) {
  /* A figure named as THE registration or deregistration threshold. */
  for (const m of text.matchAll(/(registration|deregistration) threshold (?:of|is|was) \*{0,2}£([\d,]+)/gi)) {
    statements++;
    const n = num(m[2]);
    const want = /^de/i.test(m[1]) ? DEREG : REG;
    if (n !== want) {
      errors.push(`${where}: calls ${gbp(n)} the ${m[1].toLowerCase()} threshold; ` +
                  `aat3-tax-data.js governs it at ${gbp(want)}.`);
    }
  }
  for (const m of text.matchAll(/threshold of \*{0,2}£([\d,]+)/gi)) {
    const n = num(m[1]);
    if (!GOVERNED.has(n)) {
      errors.push(`${where}: states a "threshold of ${gbp(n)}", which is not any figure ` +
                  `aat3-tax-data.js governs.`);
    }
  }
  /* ANY figure attached to the word threshold. Without this a hardcoded old
     threshold slips through everything else: the verdict check below skips a
     figure it does not recognise as governed, which is exactly backwards — an
     unrecognised threshold is the thing most worth reporting, not the thing to
     pass over. "£2,000 below the registration threshold" does not match, and
     should not: that is a gap between two thresholds, not a threshold. */
  for (const m of text.matchAll(/£([\d,]+) threshold/gi)) {
    statements++;
    const n = num(m[1]);
    if (!GOVERNED.has(n)) {
      errors.push(`${where}: names ${gbp(n)} as a threshold. aat3-tax-data.js governs the registration ` +
                  `threshold at ${gbp(REG)} and deregistration at ${gbp(DEREG)}; a figure written in by ` +
                  `hand cannot follow a Finance Act.`);
    }
  }

  /* The GAP between the two thresholds. It is a third figure that must move
     when either endpoint does, and it is the one most likely to be written in
     by hand, because "£2,000 below" reads like prose rather than like data. */
  for (const m of text.matchAll(/£([\d,]+) below the registration threshold/gi)) {
    statements++;
    const n = num(m[1]);
    if (n !== REG - DEREG) {
      errors.push(`${where}: says the deregistration threshold sits ${gbp(n)} below the registration ` +
                  `one. The governed figures are ${gbp(REG)} and ${gbp(DEREG)}, a gap of ` +
                  `${gbp(REG - DEREG)}.`);
    }
  }

  /* A subtraction against a threshold, and the answer that depends on it. */
  for (const m of text.matchAll(/£([\d,]+)\s*−\s*£([\d,]+)\s*=\s*£([\d,]+)/g)) {
    const [a, b, c] = [m[1], m[2], m[3]].map(num);
    if (!GOVERNED.has(a) && !GOVERNED.has(b)) continue;
    sums++;
    if (a - b !== c) {
      errors.push(`${where}: "${m[0]}" does not compute — ${a} − ${b} is ${a - b}.`);
    } else if (typeof answer === 'number' && answer !== c) {
      errors.push(`${where}: the stored answer is ${answer} but its own explanation works to ${c}.`);
    }
  }

  /* THE VERDICT IS THE FRAGILE PART. "At £85,000 the business is below the
     £90,000 threshold" survives a threshold change with every number intact and
     the conclusion reversed. */
  for (const m of text.matchAll(/(?:At |is |of )?£([\d,]+)[^.£]{0,80}?\b(below|above|under|over)\b[^.£]{0,40}?£([\d,]+) threshold/gi)) {
    const [figure, dir, thresh] = [num(m[1]), m[2].toLowerCase(), num(m[3])];
    /* A non-governed threshold is reported by the loop above; the verdict is
       still worth judging on its own terms rather than skipped. */
    verdicts++;
    const isBelow = dir === 'below' || dir === 'under';
    if (isBelow && !(figure < thresh)) {
      errors.push(`${where}: says ${gbp(figure)} is ${dir} the ${gbp(thresh)} threshold, and it is not. ` +
                  `The scenario figure is a literal and the threshold is governed, so a change to ` +
                  `aat3-tax-data.js has inverted what this teaches.`);
    }
    if (!isBelow && !(figure > thresh)) {
      errors.push(`${where}: says ${gbp(figure)} is ${dir} the ${gbp(thresh)} threshold, and it is not.`);
    }
  }
}

const QS = AAT3_PRACTICE.QUESTIONS.filter(q => q.unitKey === 'tpfb');
for (const q of QS) {
  check(q.id, [q.q, q.exp, (q.opts || []).join(' · ')].join(' '), typeof q.answer === 'number' ? q.answer : null);
}

let cards = 0, lessons = 0, checksSeen = 0;
for (const unit of AAT3_LEARN_PATH) {
  if (unit.unit !== 'tpfb') continue;
  for (const L of (unit.lessons || [])) {
    lessons++;
    for (const c of (L.cards || [])) { cards++; check(L.id, JSON.stringify(c), null); }
    /* The key is `check`, not `checks`. Guessing the plural reads perfectly
       well and silently scans nothing: the end-of-lesson questions are where
       the sharpest threshold verdicts live, and this file reported a clean
       sweep of them while never looking at one. */
    for (const k of (L.check || [])) { checksSeen++; check(L.id + ' check', JSON.stringify(k), null); }
  }
  if (unit.cheatsheet) check(`${unit.unit} outcome ${unit.outcome} cheat sheet`, JSON.stringify(unit.cheatsheet), null);
}

console.log(`${BOLD}VAT thresholds across TPFB${RESET}\n`);
console.log(`  ${DIM}Governed: registration ${gbp(REG)} · deregistration ${gbp(DEREG)} ` +
            `(aat3-tax-data.js, checked ${TAX.registration.threshold.checked})${RESET}`);
console.log(`  ${DIM}${QS.length} questions, ${cards} cards and ${checksSeen} lesson checks across ` +
            `${lessons} lessons, plus cheat sheets${RESET}`);
console.log(`  ${DIM}${statements} threshold statements · ${sums} sums against a threshold · ` +
            `${verdicts} above/below verdicts${RESET}\n`);

if (errors.length) {
  errors.forEach(e => console.log(`  ${RED}✗${RESET}  ${e}`));
  console.log(`\n${RED}${BOLD}${errors.length} place(s) where TPFB disagrees with the governed thresholds.${RESET}\n`);
  process.exit(1);
}
console.log(`  ${GREEN}✓  every threshold, sum and verdict in TPFB agrees with aat3-tax-data.js${RESET}\n`);
