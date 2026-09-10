#!/usr/bin/env node
/**
 * One classification of payroll deductions, across four subjects.
 *
 * WHAT WENT WRONG. Level 3 taught that a statutory deduction is one the law
 * requires — PAYE, National Insurance, student loan repayments, and pension
 * contributions where the employer has automatically enrolled its staff. Level
 * 2 taught, in a single sentence of the payroll lesson, that pension
 * contributions were VOLUNTARY, alongside union subscriptions and payroll
 * giving. Both sentences were written from scratch, months apart, and nothing
 * compared them.
 *
 * AAT marks the Level 3 answer. Auto-enrolment is a duty on the EMPLOYER under
 * the Pensions Act: the employee may opt out, but the deduction is required by
 * statute in the same way PAYE is, and only contributions ABOVE the
 * auto-enrolment minimum are the employee's own choice. So the Level 2
 * sentence was teaching a wrong answer to a question the assessment asks.
 *
 * It was not caught by any existing gate, because every gate the repository has
 * reads one subject. check-aat2-quality.js never opens aat3-learn-data.js;
 * check-aat3-quality.js never opens learn-data.js. A fact taught in both is
 * exactly the shape of defect that falls between them.
 *
 * WHAT IT ASSERTS
 *
 *   §1 The canonical table below is stated where the reader meets it: the
 *      Level 2 payroll lesson, the Level 3 statutory-deductions lesson, and
 *      both Level 3 glossary entries each classify pension the same way. A
 *      lesson that drops auto-enrolment from its statutory list fails here.
 *   §2 No prose anywhere puts pension in a voluntary or non-statutory list
 *      without the qualifier that makes it true. Sentences a human has read
 *      and cleared are declared in CLEARED, and a CLEARED entry that no longer
 *      occurs fails too, so the list cannot rot into a blanket exemption.
 *   §4 No sentence DEFINING a statutory deduction states a rule that would
 *      misclassify one. This is the half that let the pension defect through:
 *      every answer key can be right while the rule offered to derive them is
 *      wrong, and a reader taught the wrong rule gets the next one wrong.
 *   §3 No ANSWER KEY contradicts the table. Every graded row that classifies a
 *      named deduction on a statutory axis — true/false statements, pick lists
 *      — is checked against it, in every practice bank at every level.
 *
 * §4 found two more places the day it was written — P-4-48's explanation and the
 * glossary — both saying a statutory deduction is one "the law requires". That
 * reads fine until you apply it: a court's attachment of earnings order is
 * required by law and is NOT statutory, so the rule as stated gives the wrong
 * answer for it. The narrower "required by the tax or pensions system" gives the
 * right answer for all five of PAYE, NI, student loan, auto-enrolment pension and
 * the court order, which is why it is the one the material now states throughout.
 *
 * §3 finds nothing today: no bank currently keys a pension row on that axis,
 * and the rows that exist are all keyed correctly. It is written for the next
 * question somebody adds, which is where the defect would otherwise land — §2
 * is what the live one tripped.
 *
 * WHAT IT DELIBERATELY DOES NOT DO. It does not judge prose that discusses a
 * deduction without classifying it, and it cannot: "the pension provider
 * receives voluntary deductions such as union subscriptions" is a correct
 * sentence containing both words. §2 is a proximity scan with a declared
 * allowlist rather than a reading of meaning, and CLEARED is where that limit
 * is recorded rather than hidden.
 *
 * Run: node scripts/check-payroll-deductions.js   (exit 1 on any failure)
 */

'use strict';

const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const RED = '\x1b[31m', GREEN = '\x1b[32m', DIM = '\x1b[2m', BOLD = '\x1b[1m', RESET = '\x1b[0m';

const errors = [];
const fail = m => errors.push(m);
let checks = 0;
const ok = () => { checks++; };

/* ── the canonical table ──────────────────────────────────────────────────
   The classification AAT marks. `statutory` is whether the law requires the
   employer to make the deduction; `notADeduction` marks the items that never
   come off the employee's pay at all, which is a third answer the pick lists
   offer and the commonest wrong one.

   An attachment of earnings order is the entry worth pausing on. A court
   imposes it and the employee cannot stop it, so "did they agree?" gets the
   wrong answer. It is non-statutory because it arises outside the TAX system,
   which is the test AAT applies and the one the Level 3 lesson teaches. */
const TABLE = [
  { name: 'PAYE income tax',            match: /\b(paye|income tax)\b/i,                          statutory: true },
  { name: 'employee National Insurance',match: /\bnational insurance\b|\bnic\b/i,                  statutory: true, notWhen: /\bemployer/i },
  { name: 'student loan repayments',    match: /\b(student|postgraduate) loan\b/i,                 statutory: true },
  { name: 'auto-enrolment pension',     match: /\bpension\b/i,                                     statutory: true, notWhen: /\bemployer/i, unless: ABOVE_MINIMUM },
  { name: 'trade union subscription',   match: /\b(union subscription|trade union)\b/i,            statutory: false },
  { name: 'payroll giving',             match: /\bpayroll giving\b|\bgive as you earn\b|\bgaye\b/i, statutory: false },
  { name: 'charitable donation',        match: /\bcharit\w+ (donation|gift|giving)\b/i,            statutory: false },
  { name: 'season ticket loan',         match: /\bseason ticket loan\b/i,                          statutory: false },
  { name: 'salary advance repayment',   match: /\bsalary advance\b/i,                              statutory: false },
  { name: 'workplace savings scheme',   match: /\b(savings scheme|social fund)\b/i,                statutory: false },
  { name: 'attachment of earnings',     match: /\battachment of earnings\b/i,                      statutory: false },
];

/* The qualifier that makes a voluntary pension true. Contributions above the
   auto-enrolment minimum ARE the employee's own choice, so a sentence or a row
   carrying one of these is saying something correct and is left alone. */
function ABOVE_MINIMUM(text) {
  return /\b(above|additional|extra|top[- ]up|avc|voluntary contribution|over and above)\b/i.test(text);
}

/* ── §2's declared allowlist ──────────────────────────────────────────────
   Each entry is a sentence a human has read and cleared, with the reason. A
   file/snippet pair that no longer occurs is a failure: the allowlist has to
   describe the code as it is, or it stops meaning anything. */
const CLEARED = [
  {
    file: 'app.js',
    snippet: 'Net pay = Gross pay − PAYE − Employee NIC − student loan − pension − any non-statutory deduction',
    why: 'A formula, not a classification. Pension is one of the named terms and "any non-statutory deduction" is the catch-all after it, so the line groups pension with PAYE rather than against it.',
  },
];

console.log(`${BOLD}Payroll deductions${RESET}\n`);

/* Browser files assign onto `window`. */
function loadBrowser(file) {
  const w = {};
  new Function('window', 'self', fs.readFileSync(path.join(ROOT, file), 'utf8'))(w, w);
  return w;
}

/* ── §1 the table is stated where the reader meets it ─────────────────────
   Each claim names the file and a phrase that must appear in it. The point is
   not the exact wording — it is that a rewrite which quietly drops pension
   from a statutory list, or moves it to a voluntary one, cannot pass. */
const STATED = [
  {
    file: 'learn-data.js',
    what: 'the Level 2 payroll lesson',
    must: [/\*\*Statutory\*\* deductions[^']*pension contributions where the employer has automatically enrolled/i],
    mustNot: [/\*\*Voluntary\*\* deductions[^']*\bpension\b(?![^']*\bABOVE\b)/i],
  },
  {
    file: 'aat3-learn-data.js',
    what: 'the Level 3 statutory-deductions lesson',
    must: [/\*\*Statutory deductions\*\*[^']*automatically enrolled[^']*\*\*pension contributions\*\*/i],
    mustNot: [/\*\*Non-statutory deductions\*\*[^']*\bpension\b(?![^']*\babove\b)/i],
  },
  {
    file: 'aat3-glossary-data.js',
    what: 'the Level 3 glossary',
    must: [
      /t: 'Statutory deduction'[^}]*auto-enrolment/i,
      /t: 'Voluntary deduction'[^}]*ABOVE the auto-enrolment minimum/i,
    ],
    mustNot: [],
  },
];

STATED.forEach(({ file, what, must, mustNot }) => {
  const src = fs.readFileSync(path.join(ROOT, file), 'utf8');
  must.forEach(re => {
    if (re.test(src)) ok();
    else fail(`§1 ${what} (${file}) no longer states the classification: nothing matches ${re}`);
  });
  mustNot.forEach(re => {
    if (!re.test(src)) ok();
    else fail(`§1 ${what} (${file}) classifies pension as voluntary: ${String(src.match(re)).slice(0, 160)}`);
  });
});

/* ── §2 no prose puts pension in a voluntary list ─────────────────────────
   Every content file, split into sentences. A sentence naming pension and a
   voluntary marker fails unless it carries the qualifier or is CLEARED. */
const PROSE_FILES = [
  'learn-data.js', 'data.js', 'skills.js',
  'aat1-learn-data.js', 'aat1-practice-data.js', 'aat1-glossary-data.js',
  'aat2-sheets-data.js',
  'aat3-learn-data.js', 'aat3-practice-data.js', 'aat3-glossary-data.js',
  'aat3-faps-data.js', 'aat3-mats-data.js', 'aat3-buaw-data.js',
  'app.js', 'aat1-ui.js', 'aat3-ui.js',
];
const VOLUNTARY_MARKER = /\b(voluntary|non-statutory|non‑statutory|not statutory)\b/i;
const PENSION = /\bpension\b/i;

/* "The pension provider receives voluntary deductions such as union
   subscriptions" is a correct sentence carrying both words. The pension there
   is the PAYEE, not the thing being classified, so those two roles are removed
   before the sentence is tested. A pension SCHEME is left in: it can be either,
   and a false positive on one belongs in CLEARED rather than in this rule. */
const asRecipient = s => s.replace(/\bpension (provider|administrator)s?\b/gi, '');

const clearedHits = new Set();
let sentencesScanned = 0;

PROSE_FILES.forEach(file => {
  const full = path.join(ROOT, file);
  if (!fs.existsSync(full)) { fail(`§2 ${file} is listed for scanning but is not there`); return; }
  fs.readFileSync(full, 'utf8').split('\n').forEach((line, i) => {
    line.split(/(?<=[.!?])\s+/).forEach(sentence => {
      sentencesScanned++;
      if (!VOLUNTARY_MARKER.test(sentence) || !PENSION.test(asRecipient(sentence))) return;
      if (ABOVE_MINIMUM(sentence)) { ok(); return; }
      const cleared = CLEARED.find(c => c.file === file && sentence.includes(c.snippet));
      if (cleared) { clearedHits.add(cleared.snippet); ok(); return; }
      fail(`§2 ${file}:${i + 1} classifies pension as voluntary, or reads as if it does:\n     ${sentence.trim().slice(0, 220)}`);
    });
  });
});

CLEARED.forEach(c => {
  if (clearedHits.has(c.snippet)) ok();
  else fail(`§2 the CLEARED entry for ${c.file} no longer matches anything: “${c.snippet.slice(0, 80)}…”. Delete it or fix the snippet — a stale allowlist exempts whatever comes next.`);
});

/* ── §3 no answer key contradicts the table ───────────────────────────────
   A question classifies deductions when it asks about the statutory axis. The
   test is on the question's own words plus its labels or pick-list options,
   because a true/false set says "identify whether each deduction is statutory"
   and a pick list says it in its options instead. */
/* Every bank but Level 2's exports for node; data.js only assigns onto the
   window, so it is the one that goes through loadBrowser. */
const bank = (file, key) => require(path.join(ROOT, file))[key];
const BANKS = [
  ['Level 1', bank('aat1-practice-data.js', 'AAT1_PRACTICE')],
  ['Level 2', { l2: loadBrowser('data.js').ALL_QUESTIONS }],
  ['Level 3 TPFB', bank('aat3-practice-data.js', 'AAT3_PRACTICE')],
  ['Level 3 FAPS', bank('aat3-faps-data.js', 'AAT3_FAPS_PRACTICE')],
  ['Level 3 MATS', bank('aat3-mats-data.js', 'AAT3_MATS_PRACTICE')],
  ['Level 3 BUAW', bank('aat3-buaw-data.js', 'AAT3_BUAW_PRACTICE')],
];
BANKS.forEach(([level, b]) => { if (!b) fail(`§3 the ${level} bank did not load — nothing was classified against the table`); });

function flatten(bank) {
  const out = [];
  (function walk(n) {
    if (!n) return;
    if (Array.isArray(n)) { n.forEach(walk); return; }
    if (typeof n === 'object') {
      if (n.q || n.statements || n.picklist) out.push(n);
      Object.keys(n).forEach(k => { if (typeof n[k] === 'object') walk(n[k]); });
    }
  }(bank));
  return out;
}

/* Which way round the axis runs. "Identify whether each deduction is
   statutory" keys true = statutory; "identify whether each deduction is
   NON-statutory" keys true = non-statutory, and P-4-50 is exactly that. Get
   this backwards and the gate reports every correct row as wrong. */
function trueMeansStatutory(q) {
  const asked = String(q.q || '');
  if (/\bnon-statutory\b|\bnot statutory\b/i.test(asked)) return false;
  return true;
}

let rowsChecked = 0;
BANKS.forEach(([level, bank]) => {
  flatten(bank).forEach(q => {
    const asked = String(q.q || '');
    const opts = (q.picklist && q.picklist.options) || q.labels || [];
    const axis = /\bstatutory\b/i.test(asked) || opts.some(o => /\bstatutory\b/i.test(String(o)));
    if (!axis) return;

    /* true/false: `answer` is a boolean against the question's own direction. */
    (q.statements || []).forEach(st => {
      const text = String(st.text || '');
      const claimsStatutory = trueMeansStatutory(q) ? st.answer === true : st.answer === false;
      TABLE.forEach(entry => {
        if (!entry.match.test(text)) return;
        if (entry.notWhen && entry.notWhen.test(text)) return;
        if (entry.unless && entry.unless(text)) return;
        rowsChecked++;
        if (claimsStatutory === entry.statutory) ok();
        else fail(`§3 ${level} ${q.id || '(no id)'}: “${text}” is keyed ${claimsStatutory ? 'statutory' : 'non-statutory'}, but ${entry.name} is ${entry.statutory ? 'statutory' : 'non-statutory'}`);
      });
    });

    /* pick list: `answer` indexes into options, and only options naming the
       axis are ours — "Not a deduction from pay" is a third answer this gate
       has nothing to say about. */
    if (q.picklist) {
      (q.picklist.rows || []).forEach(row => {
        const text = String(row.text || '');
        const chosen = String((q.picklist.options || [])[row.answer] || '');
        if (!/\bstatutory\b/i.test(chosen)) return;
        const claimsStatutory = !/\bnon-statutory\b|\bnot statutory\b/i.test(chosen);
        TABLE.forEach(entry => {
          if (!entry.match.test(text)) return;
          if (entry.notWhen && entry.notWhen.test(text)) return;
          if (entry.unless && entry.unless(text)) return;
          rowsChecked++;
          if (claimsStatutory === entry.statutory) ok();
          else fail(`§3 ${level} ${q.id || '(no id)'}: “${text}” is keyed “${chosen}”, but ${entry.name} is ${entry.statutory ? 'statutory' : 'non-statutory'}`);
        });
      });
    }
  });
});

/* ── §4 the rule offered to the reader gives the right answers ────────────
   A DEFINING sentence is one that says what a statutory deduction is — not a
   question stem asking the reader to classify, and not a deliberately-false
   statement in a true/false set, both of which contain the words and neither
   of which is the material speaking in its own voice. So the scan runs over
   explanation and lesson prose only, and requires a definition to name both
   halves of the rule: the tax side and the pensions side. Naming only the tax
   side is the too-narrow rule that makes auto-enrolment pension non-statutory;
   saying only "required by law" is the too-broad one that makes a court order
   statutory. Both were live in this repository. */
/* Markdown bold is stripped first: the Level 2 lesson writes "**Statutory**
   deductions are required by law", and the asterisks alone hid that sentence
   from an earlier version of this scan. The third alternative catches the
   glossary, which states the rule as "A deduction the ... requires" with the
   term in its own field rather than in the sentence. */
const demark = s => s.replace(/[*_]/g, '');
/* (?<!non-) matters: "Non-statutory deductions are everything else" is a
   different and correct claim, and without the guard it reads as a broken
   definition of the statutory class. */
const DEFINES = /(?<!non-)\b(statutory deductions? (is|are)|statutory deductions?\b[^.]{0,80}\brequire)|deduction is statutory/i;
const NAMES_TAX = /\btax\b|\bPAYE\b|\bHMRC\b/i;
const NAMES_PENSIONS = /\bpension/i;

let definitionsChecked = 0;
PROSE_FILES.forEach(file => {
  const full = path.join(ROOT, file);
  if (!fs.existsSync(full)) return;
  fs.readFileSync(full, 'utf8').split('\n').forEach((line, i) => {
    /* Only the material's own voice: an explanation, or a line of lesson prose.
       A `q:` stem or a `text:` statement is the question talking, not the rule. */
    /* The exclusions are the meaningful half: a `q:` stem asks the reader to
       classify and a `text:` statement is often deliberately false, so neither
       is the material stating a rule. Everything else is in scope — including
       the glossary's `{ t: ..., d: ... }` line, which an earlier positive
       prefix filter silently skipped. */
    if (/^\s*(q|text|label|title):/.test(line)) return;
    line.split(/(?<=[.!?])\s+/).map(demark).forEach(sentence => {
      if (!DEFINES.test(sentence)) return;
      if (/\bagreed to in writing\b|\bthe employee has agreed\b/i.test(sentence)) return; /* a stated falsehood */
      definitionsChecked++;
      /* Test the RULE, not the examples after it. "Statutory deductions are the
         ones HMRC requires: PAYE, NI, student loan and auto-enrolment pension"
         states a rule that excludes pension and then lists pension, and reading
         the whole sentence lets the correct list hide the wrong rule — both
         survivors when this was first written. So the clause is cut at whatever
         introduces the examples. */
      /* Everything up to the LAST `: '` is object plumbing — `exp: '`, or the
         glossary's `{ t: 'Statutory deduction', d: '`. Past it, the first
         em-dash, colon or semicolon introduces the examples. */
      const lastKey = sentence.lastIndexOf(": '") >= 0 ? sentence.lastIndexOf(": '") + 3
        : sentence.lastIndexOf(': "') >= 0 ? sentence.lastIndexOf(': "') + 3 : 0;
      const rule = sentence.slice(lastKey).split(/[—:;]/)[0];
      const tax = NAMES_TAX.test(rule), pen = NAMES_PENSIONS.test(rule);
      if (tax && pen) { ok(); return; }
      fail(`§4 ${file}:${i + 1} defines a statutory deduction by a rule that misclassifies — it names ${tax ? 'the tax side but not pensions (which makes auto-enrolment pension non-statutory)' : pen ? 'pensions but not tax' : 'neither tax nor pensions, so it reads as "anything the law requires" — which makes a court order statutory'}:\n     ${rule.trim().slice(0, 200)}`);
    });
  });
});

/* ── report ──────────────────────────────────────────────────────────────── */
console.log(`${DIM}  §1 the table is stated in ${STATED.length} places`);
console.log(`  §2 ${sentencesScanned.toLocaleString('en-GB')} sentences scanned across ${PROSE_FILES.length} files, ${CLEARED.length} cleared by hand`);
console.log(`  §3 ${rowsChecked} graded rows classified against the table`);
console.log(`  §4 ${definitionsChecked} sentences defining the statutory class${RESET}\n`);

if (errors.length) {
  errors.forEach(e => console.log(`${RED}  ✗ ${e}${RESET}`));
  console.log(`\n${RED}${BOLD}${errors.length} failure${errors.length === 1 ? '' : 's'}${RESET}`);
  process.exit(1);
}
console.log(`${GREEN}${BOLD}✓ ${checks} checks passed${RESET}`);
