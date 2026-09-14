#!/usr/bin/env node
/**
 * Named misconceptions — the taxonomy, the tags, and what the reader is told.
 *
 * Every wrong answer used to get the same response: the explanation of the
 * RIGHT one. A reader who divided by five instead of six and a reader with no
 * idea were told the same thing, and only one of them needed it. A tagged
 * wrong answer names the error instead — "you applied the rate to a figure
 * that already included VAT" — and the count of how often each name has caught
 * this reader is the thing a diagnosis screen can eventually be built from.
 *
 * THE WHOLE RISK OF THIS PHASE IS THAT IT BECOMES DECORATION. A hundred tags
 * that each restate their own question's explanation would pass any test that
 * only asked "does a tag render". So most of this file is content rules.
 *
 * WHAT IT ASSERTS
 *
 *   The registry
 *     - ids unique; label and explain present; `units` names real Level 3 units
 *     - every entry used by AT LEAST TWO questions, and none unused. An entry
 *       used once is that question's explanation wearing a category's clothes,
 *       and the app can never say "this is the fourth time" about it.
 *
 *       THE FLOOR WAS TO RISE TO THREE WHEN 2b LANDED. IT DOES NOT, AND THE
 *       REASON IS MEASURED RATHER THAN ARGUED. The plan expected 657 distractor
 *       tags to supply the volume a three-use floor was written for. Tagging
 *       them showed the opposite: 227 of the 311 nameable errors in the unit
 *       occur exactly ONCE, because a well-written question varies its
 *       distractors on purpose, so tags spread thinly rather than pooling.
 *       Merging the near-synonyms into real families lifts most of that, and at
 *       a floor of three what is left would still delete 50 genuine families
 *       and 37 questions' worth of feedback — including eight entries 2a
 *       authored, every one of them numeric-only, which 2b was supposed to
 *       rescue and could not, because the distractors in those areas test
 *       recognition rather than the arithmetic slip.
 *
 *       Two remains the right floor on the registry's own argument: a two-use
 *       entry can say "second time", which is a category, and a one-use entry
 *       cannot say anything its question did not already say.
 *
 *   The tags — 291 named distractors across 176 multiple choices, plus 2a's
 *   116 near misses
 *     - every `why` id and every `nearMiss.why` exists in the registry
 *     - `why.length === opts.length`, and `why[ans]` is null — the key is not a
 *       misconception
 *     - no two distractors, and no two near misses, in one question carry the
 *       same tag: they would be the same wrong answer written twice
 *     - no `nearMiss.value` lands within the grading tolerance of the answer,
 *       and no two land within it of each other — either makes the match
 *       ambiguous, and the ambiguity would resolve differently depending on
 *       array order
 *     - a tag's `explain` is not a substring of the question's `exp`, and
 *       shares no long verbatim run with it. THIS ONE IS A HEURISTIC and
 *       carries an allowlist with a reason each, the way QUESTION_FLOORS and
 *       the plain-English gate do.
 *     - an allowlist of untagged numeric questions AND one of untagged multiple
 *       choices, with a reason each, and a staleness check on both: an id on
 *       either that no longer exists, or that has since been tagged, is an
 *       error. 43 multiple choices are untagged, and the reasons fall into two
 *       shapes. Either all three distractors instantiate ONE error — and a tag
 *       may not repeat inside a question, so naming it on one of them would be
 *       a coin toss dressed as a diagnosis — or each names a distinct error no
 *       other question in the unit tests, which is a singleton by another route.
 *     - a `why[]` may hold nulls but not only nulls: an array with nothing in
 *       it is the allowlist's job, and left in the data it would look like
 *       coverage
 *     - a SCOPE assertion: below a floor of tagged questions the file fails, so
 *       the content rules cannot silently stop seeing their subjects
 *
 *   The behaviour, through the real renderer
 *     - a near miss renders its own tag, and the explanation stays
 *     - the right answer renders none; an untagged wrong answer renders none
 *     - a tag id not in the registry renders nothing rather than an empty box
 *     - the counter rises, and SURVIVES A RELOAD — the field-list assertion
 *     - THE SHUFFLE. A tagged distractor shows ITS OWN tag after the options
 *       have been shuffled. This is the most important assertion in the file:
 *       `why` is indexed against the UNSHUFFLED options, and indexing it by
 *       screen position instead attaches every diagnosis to a different option
 *       on every run — which is worse than having none, and invisible from any
 *       single run. It is asserted twice: once on a synthetic question, which
 *       is how it was proved before there was anything real to point at, and
 *       once on a question lifted out of the bank untouched, because a
 *       synthetic one can drift away from the shape the bank actually uses.
 *     - a lesson check banks into `lessonMisc` and leaves the practice record
 *       byte-identical
 *
 * Run: node scripts/check-aat3-misconceptions.js   (exit 1 on any failure)
 */

'use strict';

const path = require('path');
const ROOT = path.join(__dirname, '..');
const RED = '\x1b[31m', GREEN = '\x1b[32m', DIM = '\x1b[2m', BOLD = '\x1b[1m', RESET = '\x1b[0m';

const D = require('./lib/aat3-driver.js');
const { fakeStore, fakeEl, nodes, click } = D;
const STORE_KEY = 'prep_v2_aat3';
const TOLERANCE = 0.005;          /* the figure gradeAnswer uses */
const MIN_USES = 2;
const MIN_TAGGED = 85;            /* numeric scope floor — 91 carry nearMiss today */
/* THE MCQ FLOORS ARE A RATCHET, NOT A TOLERANCE. They sit on exactly today's
   counts, so adding a diagnosis is free and losing one fails here. A floor with
   slack in it cannot see a single tag going quietly to null, which is the way
   this phase would actually decay — and mutation testing showed precisely that
   before these were tightened. Removing a tag on purpose means editing this
   line, which is the point. */
const MIN_TAGGED_MCQ = 176;       /* multiple choices carrying why[] */
const MIN_MCQ_TAGS = 291;         /* named distractors between them */
const UNITS = ['tpfb', 'faps', 'mats', 'buaw'];

const REGISTRY = require(path.join(ROOT, 'aat3-misconceptions.js')).AAT3_MISCONCEPTIONS;
const BANK = require(path.join(ROOT, 'aat3-practice-data.js')).AAT3_PRACTICE.QUESTIONS;

/* ── Untagged on purpose ──────────────────────────────────────────────────
   A numeric question with no `nearMiss` has to say why, and the reason has to
   be a reason rather than "not done yet" — otherwise this list becomes the
   place the phase quietly stops. Every one below is a question whose most
   likely wrong answer is a real error that appears only ONCE in the numeric
   bank, so naming it would put a single-use entry in the registry. They are
   the first candidates for tagging in 2b, where the MCQ distractors supply the
   second and third uses. */
const UNTAGGED = {
  'P-1-53':  'Points reset periods — the only numeric question on them, so "used the quarterly period for a monthly filer" has one use.',
  'P-1-63':  'The VAT chain end to end. The predictable error is adding the tax at every stage instead of netting, and no other numeric question tests it.',
  'P-1-87':  'A due date. Every plausible mis-step in "a calendar month plus seven days" happens to land on the right day for this quarter end.',
  'P-1-114': 'The assessment window. "Used the 20-year deliberate-behaviour window" has one use in the numeric bank.',
  'P-2-27':  'Gifts to one person. "Taxed the excess over the limit rather than the whole series" has one use.',
  'P-2-52':  'A plain repayment position. One subtraction, and no wrong answer worth predicting.',
  'P-2-68':  'Box 6. Both errors it tests — putting the output tax in, leaving the exempt supplies out — are unique to it.',
  'P-3-13':  'One percentage of Box 6, asked directly. Nothing to get wrong but the arithmetic.',
  'P-3-16':  'Box 5 from Box 1 and Box 4. One subtraction.',
  'P-3-23':  'The error-reporting ceiling. "Ignored the cap" has one use.',
  'P-3-30':  'Box 5 with Box 2 nil. One subtraction.',
  'P-3-34':  'A partly explained reconciliation. "Stopped at the first thing found" has one use.',
  'P-3-71':  'A fully explained reconciliation. The mis-posting accounts for the whole difference, so there is no residue to get wrong.',
  'P-4-20':  'The cost of employing someone. "Left the employer contributions out of the cost" has one use.',
  'P-4-67':  'A late filing penalty band. Recall of a table, not a calculation.',
  'P-5-24':  'Setting cash aside. "Reserved the output tax without deducting input tax" has one use.',
};

const UNTAGGED_MCQ = {
  /* SAME ERROR, THREE COSTUMES. Every distractor instantiates one error, and a
     tag may not be repeated inside a question, so naming it on one option and
     not the others would be a coin toss dressed as a diagnosis. */
  'P-1-04':  'Three businesses selling to customers who cannot reclaim — one error, offered three times.',
  'P-1-16':  'Three repayment traders. The error is the same in each: looking for the gain where the tax already flows outward.',
  'P-1-25':  'Three bodies with real authority over a business, none of it over VAT. One error, three names.',
  'P-1-26':  'Three ways of saying a registered business in the chain bears the tax, which is the same misreading each time.',
  'P-1-36':  'Three businesses that each gain from registering, for three reasons. The error — not asking who the customer is — is one.',
  'P-1-55':  'Three lookback periods, all of them the compliance period in disguise. The error is tying the lookback to filing frequency.',
  'P-1-64':  'Three zero-rated items offered as exempt. One error, three instances, and no principled way to name it on just one.',
  'P-1-65':  'Three categories offered for a receipt that is outside the scope. Each is the same failure to remember that a fourth possibility exists.',
  'P-1-67':  'Three penalties from three wrong regimes. Naming one and not the others would be arbitrary; the regime-mixing error is already carried elsewhere.',
  'P-1-68':  'Three things that share the name "account" and are not the VAT account. One error, three objects.',
  'P-1-73':  'Three periods the business happens to use for something else, each anchoring a rolling test that is anchored to nothing.',
  'P-1-85':  'Three businesses that gain from staying registered, for three reasons. The error behind picking any of them is one.',
  'P-1-96':  'Three ordinary supplies that stay inside the scheme. The error is not knowing the exclusion list, which no single option names.',
  'P-1-102': 'Three wrong spans for the interim payments. Each is the same error — starting them before the scheme does.',
  'P-1-106': 'Three percentages from the same table, each the right figure for a different row. One error, three rows.',
  'P-2-67':  'Three kinds of supply that all belong in the outputs figure. Excluding any of them is the same narrowing.',
  'P-2-73':  'Three particulars required on a full invoice and a less detailed one alike. One error, three particulars.',
  'P-3-06':  'Three purchases that all belong in the inputs figure. The error — leaving a purchase out — is one, offered three ways.',
  'P-4-47':  'Three voluntary deductions offered as statutory. One error, three arrangements.',
  'P-4-57':  'Three amounts that do travel to HMRC in the monthly payment. One error, three items.',
  'P-5-09':  'Three fundamental principles, one of them the answer. Naming "the wrong principle" three separate ways would be three synonyms.',
  'P-5-16':  'Three fundamental principles again, for a self-interest threat.',
  'P-5-18':  'Three secondary sources offered in place of the primary one. One error, three sources.',
  'P-5-33':  'Three secondary sources again — a summary, a forum and release notes.',
  'P-5-38':  'Three fundamental principles again, for a question about truthful records.',

  /* SINGLETONS. Each distractor names a real and distinct error, and no other
     question in the unit tests it, so every name would be used exactly once —
     which is the thing the registry exists to prevent. */
  'P-1-60':  'A tribunal reached too early and a regulator with no VAT jurisdiction. Both appear once in the unit.',
  'P-1-98':  'The capital goods exception is tested by this question alone, so naming it would create an entry of one.',
  'P-2-11':  'Banked cash used in place of cash taken. The only question in the unit that turns on it.',
  'P-2-66':  'Cut-off confused with preparing the return itself — a single occurrence.',
  'P-2-69':  'Recovering on a doubtful invoice, and abandoning the recovery instead of querying it. One question each.',
  'P-2-83':  'Integrity of content confused with keeping the invoice private. A single occurrence.',
  'P-2-85':  'The input and output pairing broken, and goods for resale read as an output. One question each.',
  'P-2-107': 'Leaving private fuel unadjusted, and borrowing the car-leasing proportion for fuel. One question each.',
  'P-3-10':  'Checking content before the structure holds, and filing a known error. One question each.',
  'P-3-38':  'Matching the control account to one side of the return, and to the bank payment. Both appear only here.',
  'P-3-55':  'Leaving the customer holding a wrong document, and destroying it rather than correcting it. One question each.',
  'P-3-79':  'A payment left unposted, and a balance expected to stand until the year end. Both appear only here.',
  'P-4-35':  'Payroll thought to need more than one worker, and self assessment thought to displace the employer. One question each.',
  'P-4-37':  'The employer thought to work out the code rather than operate the one it is given. A single occurrence.',
  'P-4-43':  'A spreadsheet thought able to file, software thought to come only from HMRC, and an approval process that does not exist.',
  'P-4-49':  'Statutory status judged by consent, and by where the deduction falls. Both appear only here.',
  'P-4-66':  'A nil month reported on the wrong return, and not reported at all. One question each.',
  'P-5-25':  'Monthly returns, deregistering and accepting a penalty — three distinct wrong remedies, each tested once.',
};

/* Tag explanations legitimately sharing a run of words with a question's own
   explanation. Empty today, and it is the mechanism rather than the entries
   that matters: the substring rule below is a heuristic, and a heuristic in
   this repo carries an allowlist with a reason each. */
const SHARED_WORDING = {};

let failures = 0, checks = 0;
function ok(cond, label) {
  checks++;
  if (!cond) { failures++; console.log(`  ${RED}✗${RESET} ${label}`); }
}
function eq(a, b, label) {
  ok(JSON.stringify(a) === JSON.stringify(b), `${label} — got ${JSON.stringify(a)}, expected ${JSON.stringify(b)}`);
}

console.log(`${BOLD}Level 3 — what the wrong answer actually was${RESET}\n`);

const byId = {};
REGISTRY.forEach(m => { byId[m.id] = m; });

/* ══════════════════════════════════════════════════════════════════════════
   Part one — the registry itself.
   ══════════════════════════════════════════════════════════════════════════ */
{
  ok(REGISTRY.length > 0, 'the registry is empty');
  eq(REGISTRY.length, Object.keys(byId).length, 'two registry entries share an id');
  REGISTRY.forEach(m => {
    ok(typeof m.id === 'string' && /^[a-z0-9-]+$/.test(m.id),
      `registry id ${JSON.stringify(m.id)} is not a lower-case hyphenated slug`);
    ok(typeof m.label === 'string' && m.label.length > 8, `${m.id} has no usable label`);
    ok(typeof m.explain === 'string' && m.explain.length > 40,
      `${m.id}'s explain is too short to state the rule that was misapplied`);
    ok(Array.isArray(m.units) && m.units.length > 0 && m.units.every(u => UNITS.indexOf(u) !== -1),
      `${m.id} names a unit that does not exist`);
    /* THE LABEL IS THE SENTENCE THE READER SEES FIRST, so it says what they
       did, not what the rule is. A label that opens with "The" is describing
       the syllabus rather than the answer. */
    ok(!/^The\b/.test(m.label), `${m.id}'s label describes the rule rather than the reader's answer`);
  });
}

/* ══════════════════════════════════════════════════════════════════════════
   Part two — the tags on the questions.
   ══════════════════════════════════════════════════════════════════════════ */
const uses = {};
REGISTRY.forEach(m => { uses[m.id] = []; });

/* THE DECORATION CHECK, and it runs on every tag of every kind. A tag that
   restates the question's own explanation diagnoses nothing, and 289 of them
   is how this whole phase turns into noise. It caught eleven of 2b's own
   explanations, written with the question's `exp` open alongside. */
function decoration(q, id) {
  const m = byId[id];
  if (!m || SHARED_WORDING[q.id + '|' + id]) return;
  const a = norm(m.explain), b = norm(q.exp || '');
  ok(b.indexOf(a) === -1,
    `${q.id}: the tag "${id}" is a verbatim copy of the question's own explanation`);
  const run = longestShared(a, b);
  ok(run.length < 60,
    `${q.id}: the tag "${id}" shares ${run.length} characters verbatim with the question's ` +
    `explanation — "${run.slice(0, 50)}…"`);
}

function noteUse(id, qid) {
  if (!(id in uses)) uses[id] = [];
  uses[id].push(qid);
}

{
  let tagged = 0, numeric = 0, taggedMcq = 0, mcqTags = 0, mcq = 0;
  BANK.forEach(q => {
    const t = q.type || 'mcq';
    if (t === 'numeric' && q.unitKey === 'tpfb') numeric++;
    if (t === 'mcq' && q.unitKey === 'tpfb') mcq++;

    if (q.why) {
      taggedMcq++;
      mcqTags += q.why.filter(Boolean).length;
      ok(t === 'mcq', `${q.id} carries a why[] but is not a multiple choice`);
      ok(q.why.some(Boolean),
        `${q.id} carries a why[] with nothing in it — an all-null array is the untagged allowlist's job`);
      eq(q.why.length, (q.opts || []).length, `${q.id}'s why[] is not parallel to its options`);
      ok(q.why[q.ans] === null || q.why[q.ans] === undefined,
        `${q.id} tags its own key as a misconception`);
      const seen = {};
      q.why.forEach((id, i) => {
        if (id === null || id === undefined) return;
        ok(!!byId[id], `${q.id} option ${i} names "${id}", which is not in the registry`);
        ok(!seen[id], `${q.id} tags two of its options with "${id}" — the same wrong answer written twice`);
        seen[id] = 1;
        noteUse(id, q.id);
        decoration(q, id);
      });
    }

    if (q.nearMiss) {
      tagged++;
      ok(t === 'numeric', `${q.id} carries a nearMiss but is not a numeric question`);
      ok(Array.isArray(q.nearMiss) && q.nearMiss.length > 0, `${q.id}'s nearMiss is empty`);
      const seenTag = {}, seenVal = [];
      (q.nearMiss || []).forEach(nm => {
        ok(nm && typeof nm.value === 'number' && isFinite(nm.value),
          `${q.id} has a nearMiss with no usable value`);
        ok(!!byId[nm.why], `${q.id} names "${nm.why}", which is not in the registry`);
        ok(Math.abs(nm.value - q.answer) >= TOLERANCE,
          `${q.id}'s predicted wrong answer ${nm.value} is inside the tolerance of its own answer, so a ` +
          'correct answer would be reported as a named mistake');
        ok(!seenVal.some(v => Math.abs(v - nm.value) < TOLERANCE),
          `${q.id} predicts ${nm.value} twice — the match would resolve by array order`);
        ok(!seenTag[nm.why], `${q.id} tags two near misses with "${nm.why}"`);
        seenVal.push(nm.value);
        seenTag[nm.why] = 1;
        noteUse(nm.why, q.id);

        decoration(q, nm.why);
      });
    }
  });

  /* SCOPE. Without this the rules above pass triumphantly over an empty set
     the moment something stops matching. */
  ok(tagged >= MIN_TAGGED,
    `only ${tagged} questions carry tags, below the floor of ${MIN_TAGGED} — either the phase went ` +
    'backwards or this file has stopped seeing its subjects');
  ok(numeric >= 100, `only ${numeric} TPFB numeric questions were found, so the bank is not being read`);
  ok(taggedMcq >= MIN_TAGGED_MCQ,
    `only ${taggedMcq} multiple choices carry tags, below the floor of ${MIN_TAGGED_MCQ}`);
  ok(mcqTags >= MIN_MCQ_TAGS,
    `only ${mcqTags} distractors are named, below the floor of ${MIN_MCQ_TAGS} — the questions may still ` +
    'carry why[] arrays while the tags inside them have quietly gone');
  ok(mcq >= 210, `only ${mcq} TPFB multiple choices were found, so the bank is not being read`);

  /* THE FLOOR. Both directions: nothing unused, nothing used once. */
  const unused = Object.keys(uses).filter(id => uses[id].length === 0);
  eq(unused, [], 'registry entries no question uses');
  const thin = Object.keys(uses).filter(id => uses[id].length > 0 && uses[id].length < MIN_USES);
  eq(thin, [], `registry entries used fewer than ${MIN_USES} times — a category of one is an excuse`);
  const stray = Object.keys(uses).filter(id => !byId[id]);
  eq(stray, [], 'tags used by questions that are not in the registry');
}

/* The untagged allowlist, both directions. */
{
  const untaggedNow = BANK
    .filter(q => q.unitKey === 'tpfb' && (q.type || 'mcq') === 'numeric' && !q.nearMiss)
    .map(q => q.id);
  const missing = untaggedNow.filter(id => !(id in UNTAGGED));
  eq(missing, [], 'numeric questions with no tags and no declared reason');
  const stale = Object.keys(UNTAGGED).filter(id => untaggedNow.indexOf(id) === -1);
  eq(stale, [], 'entries on the untagged allowlist that are now tagged, or no longer exist');
  Object.keys(UNTAGGED).forEach(id => {
    ok(UNTAGGED[id].length > 30, `the reason given for leaving ${id} untagged is not a reason`);
  });
  const untaggedMcqNow = BANK
    .filter(q => q.unitKey === 'tpfb' && (q.type || 'mcq') === 'mcq' && !q.why)
    .map(q => q.id);
  const missingMcq = untaggedMcqNow.filter(id => !(id in UNTAGGED_MCQ));
  eq(missingMcq, [], 'multiple choices with no tags and no declared reason');
  const staleMcq = Object.keys(UNTAGGED_MCQ).filter(id => untaggedMcqNow.indexOf(id) === -1);
  eq(staleMcq, [], 'entries on the untagged multiple-choice allowlist that are now tagged, or no longer exist');
  Object.keys(UNTAGGED_MCQ).forEach(id => {
    ok(UNTAGGED_MCQ[id].length > 30, `the reason given for leaving ${id} untagged is not a reason`);
  });

  const sharedStale = Object.keys(SHARED_WORDING).filter(k => {
    const qid = k.split('|')[0];
    return !BANK.some(q => q.id === qid);
  });
  eq(sharedStale, [], 'shared-wording allowances for questions that no longer exist');
}

function norm(s) { return String(s).toLowerCase().replace(/\s+/g, ' ').trim(); }
/* The longest run of characters the two strings share. Quadratic, and the
   inputs are a few hundred characters each, so it costs nothing here. */
function longestShared(a, b) {
  let best = '';
  for (let i = 0; i < a.length; i++) {
    for (let j = a.length; j > i + best.length; j--) {
      const sub = a.slice(i, j);
      if (b.indexOf(sub) !== -1) { if (sub.length > best.length) best = sub; break; }
    }
  }
  return best;
}

/* ══════════════════════════════════════════════════════════════════════════
   Part three — what the reader is actually shown.
   ══════════════════════════════════════════════════════════════════════════ */
const realNow = Date.now;
let NOW = 1789000000000;

function open(bank, seed) {
  NOW = 1789000000000;
  Date.now = () => NOW;
  const store = fakeStore(seed || { [STORE_KEY]: JSON.stringify({ lessons: {}, xp: 0, practice: { units: {} } }) });
  global.localStorage = store;
  global.document = { visibilityState: 'visible', addEventListener() {} };
  delete require.cache[require.resolve(path.join(ROOT, 'aat3-ui.js'))];
  const UI = require(path.join(ROOT, 'aat3-ui.js'));
  UI.AAT3_SYLLABUS = require(path.join(ROOT, 'aat3-syllabus.js')).SYLLABUS;
  const P = require(path.join(ROOT, 'aat3-practice-data.js')).AAT3_PRACTICE;
  UI.AAT3_PRACTICE = Object.assign({}, P, { QUESTIONS: bank || P.QUESTIONS });
  UI.AAT3_LEARN_PATH = require(path.join(ROOT, 'aat3-learn-data.js')).AAT3_LEARN_PATH;
  UI.AAT3_MISCONCEPTIONS = REGISTRY;
  UI.AATSpaced = require(path.join(ROOT, 'spaced.js'));
  return { UI, store, el: fakeEl() };
}
function startOn(ctx) {
  ctx.UI.AAT3_UI.reset('practice', 'tpfb');
  ctx.UI.AAT3_UI.mount(ctx.el);
  click(ctx.el, 'startpractice', n => n.getAttribute('data-lo') === 'mix');
}
function typeAnswer(el, v) {
  const n = nodes(el, 'numinput')[0];
  n.value = String(v);
  n.fire('input');
  NOW += 3000;
  click(el, 'numsubmit');
}
function shownLabel(el) {
  const m = /a3-mis-t">([^<]*)/.exec(el.innerHTML);
  return m ? m[1] : null;
}
function stored(ctx) {
  try { return JSON.parse(ctx.store.getItem(STORE_KEY) || '{}'); } catch (e) { return {}; }
}

const SAMPLE = BANK.find(q => q.id === 'P-2-01');

try {

/* ── 1. A near miss is named; the explanation stays ─────────────────────── */
{
  const ctx = open([SAMPLE]);
  startOn(ctx);
  typeAnswer(ctx.el, SAMPLE.nearMiss[0].value);
  eq(shownLabel(ctx.el), byId[SAMPLE.nearMiss[0].why].label,
    'the predicted wrong answer was not named');
  ok(/a3-exp-box/.test(ctx.el.innerHTML),
    'the diagnosis replaced the explanation — they answer different questions and both belong on the screen');
  const idx = ctx.el.innerHTML.indexOf('a3-mis-t');
  ok(idx !== -1 && idx < ctx.el.innerHTML.indexOf('a3-exp-box'),
    'the diagnosis renders below the explanation, so the first thing a reader who has just got it wrong ' +
    'reads is about the question rather than about their answer');

  click(ctx.el, 'nextq');
  eq(((stored(ctx).practice.units.tpfb || {}).misc || {}), { [SAMPLE.nearMiss[0].why]: 1 },
    'the named error was not counted');
}

/* ── 2. Right, and wrong-but-unpredicted, say nothing ───────────────────── */
{
  const right = open([SAMPLE]);
  startOn(right);
  typeAnswer(right.el, SAMPLE.answer);
  eq(shownLabel(right.el), null, 'a correct answer was given a diagnosis');
  click(right.el, 'nextq');
  eq(((stored(right).practice.units.tpfb || {}).misc || {}), {}, 'a correct answer was counted as a misconception');

  const odd = open([SAMPLE]);
  startOn(odd);
  typeAnswer(odd.el, 12345.67);
  eq(shownLabel(odd.el), null,
    'an unpredicted wrong answer was given a diagnosis — the tag is matching on something other than the value');
  ok(/a3-exp-box/.test(odd.el.innerHTML), 'an unpredicted wrong answer lost its explanation too');
  click(odd.el, 'nextq');
  eq(((stored(odd).practice.units.tpfb || {}).misc || {}), {}, 'an unpredicted wrong answer was counted');

  /* THE TOLERANCE IS THE GRADING TOLERANCE, PINNED FROM BOTH SIDES. A match on
     anything looser turns the diagnosis into a guess: a reader who was out by
     a pound would be told, confidently and by name, which error they made —
     and it would be the wrong name. Only a value that is arithmetically the
     predicted one counts. */
  const inside = open([SAMPLE]);
  startOn(inside);
  typeAnswer(inside.el, SAMPLE.nearMiss[0].value + TOLERANCE / 2);
  eq(shownLabel(inside.el), byId[SAMPLE.nearMiss[0].why].label,
    'a value inside the grading tolerance of a predicted answer was not matched, so the tolerance is ' +
    'tighter than the one the same value would be GRADED on');

  const outside = open([SAMPLE]);
  startOn(outside);
  typeAnswer(outside.el, SAMPLE.nearMiss[0].value + 1);
  eq(shownLabel(outside.el), null,
    'an answer a whole pound away from the predicted one was named as that error — the match is on ' +
    'something looser than the grading tolerance, so the diagnosis is a guess wearing a name');
  click(outside.el, 'nextq');
  eq(((stored(outside).practice.units.tpfb || {}).misc || {}), {},
    'an answer outside the tolerance was counted against a named error');
}

/* ── 3. A tag that is not in the registry renders nothing ───────────────── */
{
  /* A stale id survives a registry rename, and the failure has to be silence
     rather than an empty box with a heading on it. */
  const q = Object.assign({}, SAMPLE, { nearMiss: [{ value: SAMPLE.nearMiss[0].value, why: 'no-such-misconception' }] });
  const ctx = open([q]);
  startOn(ctx);
  typeAnswer(ctx.el, q.nearMiss[0].value);
  eq(shownLabel(ctx.el), null, 'a tag with no registry entry rendered a diagnosis');
  ok(!/a3-mis"/.test(ctx.el.innerHTML), 'a tag with no registry entry rendered an empty box');
  click(ctx.el, 'nextq');
  eq(((stored(ctx).practice.units.tpfb || {}).misc || {}), {}, 'a tag with no registry entry was counted');
}

/* ── 4. The counter survives a reload — the field list ──────────────────── */
{
  /* `misc` has to be named in normalisePractice, in practiceRec's blank AND in
     its lazy repair. Missing any of the three loses the counts on the next
     load rather than here, which is why this is asserted through a real
     reload rather than by reading the source. */
  const first = open([SAMPLE]);
  startOn(first);
  typeAnswer(first.el, SAMPLE.nearMiss[0].value);
  click(first.el, 'nextq');

  const again = open([SAMPLE], { [STORE_KEY]: first.store.getItem(STORE_KEY) });
  startOn(again);
  typeAnswer(again.el, SAMPLE.nearMiss[0].value);
  click(again.el, 'nextq');
  eq(((stored(again).practice.units.tpfb || {}).misc || {}), { [SAMPLE.nearMiss[0].why]: 2 },
    'the count written before the reload was dropped by the next write — `misc` is missing from one of ' +
    'the three places the practice record is rebuilt in');
}

/* ── 5. THE SHUFFLE ─────────────────────────────────────────────────────── */
{
  /* `why` is indexed against the UNSHUFFLED options. The renderer shuffles the
     order it draws them in and writes each option's ORIGINAL index into
     data-i, so the two line up — but only if nothing indexes `why` by screen
     position. Indexed by position, every diagnosis attaches to a different
     option on every run, and no single run can tell.

     There are no tagged multiple choices in the bank yet. This is a synthetic
     one, on purpose: the machinery has to be proved before 2b authors six
     hundred real ones against it. */
  const TAGS = [null, 'vat-rate-applied-to-a-gross-figure', 'gross-fraction-used-on-a-net-figure',
    'reduced-rate-supply-taxed-at-the-standard-rate'];
  const mcq = {
    id: 'SYNTH-MIS-1', unitKey: 'tpfb', lo: 2, criteria: ['TPFB-2.3.1'], type: 'mcq',
    q: 'Synthetic question for the shuffle assertion.',
    opts: ['The right one', 'Wrong A', 'Wrong B', 'Wrong C'],
    ans: 0, why: TAGS,
    exp: 'Synthetic explanation.',
  };

  let positions = {}, runs = 0;
  for (let seed = 0; seed < 24; seed++) {
    const ctx = open([mcq]);
    startOn(ctx);
    /* Pick the option whose ORIGINAL index is 2, wherever the shuffle put it. */
    const target = nodes(ctx.el, 'ans').find(n => n.getAttribute('data-i') === '2');
    if (!target) continue;
    /* Where on screen it landed, so the loop can prove the shuffle moved it. */
    positions[nodes(ctx.el, 'ans').indexOf(target)] = 1;
    NOW += 3000;
    target.fire('click');
    runs++;
    eq(shownLabel(ctx.el), byId[TAGS[2]].label,
      'a tagged distractor showed some other option\'s diagnosis — `why` is being indexed by screen ' +
      'position rather than by the option\'s own index');
    click(ctx.el, 'nextq');
    eq(((stored(ctx).practice.units.tpfb || {}).misc || {}), { [TAGS[2]]: 1 },
      'the wrong misconception was counted for a tagged distractor');
  }
  ok(runs >= 20, `only ${runs} of 24 shuffle runs found the tagged option, so most of this section did nothing`);
  ok(Object.keys(positions).length >= 3,
    `the tagged option landed in ${Object.keys(positions).length} screen positions across ${runs} runs — the ` +
    'options are not being shuffled, so this section cannot tell a position index from an option index');

  /* And the key still says nothing, whatever the shuffle did with it. */
  const keyCtx = open([mcq]);
  startOn(keyCtx);
  const key = nodes(keyCtx.el, 'ans').find(n => n.getAttribute('data-i') === '0');
  NOW += 3000;
  key.fire('click');
  eq(shownLabel(keyCtx.el), null, 'the key was given a diagnosis');

  /* GUARDED TWICE, AND BOTH GUARDS ASSERTED. Part two forbids tagging a key,
     so this can only arrive as invalid data — which is exactly the case the
     renderer has to survive, because a content rule is a rule about the
     repository and not about what is in a reader's browser after a bad deploy.
     The same reasoning the calibration guard follows: the refusal lives where
     the answer arrives, not only where the data is written. */
  const badKey = Object.assign({}, mcq, { why: [TAGS[1], null, null, null] });
  const badCtx = open([badKey]);
  startOn(badCtx);
  const k2 = nodes(badCtx.el, 'ans').find(n => n.getAttribute('data-i') === '0');
  NOW += 3000;
  k2.fire('click');
  eq(shownLabel(badCtx.el), null,
    'a right answer was told which mistake it was — the renderer is reading the tag off a question ' +
    'that was graded CORRECT, and only the content rules are stopping that reaching a reader');
  click(badCtx.el, 'nextq');
  eq(((stored(badCtx).practice.units.tpfb || {}).misc || {}), {},
    'a right answer was counted against a named error');
}

/* ── 5b. THE SHUFFLE, ON A REAL QUESTION FROM THE BANK ──────────────────── */
{
  /* Section 5 proves the machinery on a synthetic question, which is what it
     was for before there was anything real to point at. Now there is. A
     synthetic question can drift away from the shape the bank actually uses —
     a renderer that special-cased four plain options would pass it and fail
     every real one — so the same assertion is made again on a question taken
     out of the bank untouched, with every distractor it really carries. */
  const real = BANK.find(q => q.why && q.why.filter(Boolean).length === 3);
  ok(!!real, 'no bank question carries three named distractors, so this section has nothing to prove');
  if (real) {
    real.why.forEach((tag, i) => {
      if (!tag) return;
      let found = 0, seats = {};
      for (let seed = 0; seed < 24 && found < 6; seed++) {
        const ctx = open([real]);
        startOn(ctx);
        const target = nodes(ctx.el, 'ans').find(n => n.getAttribute('data-i') === String(i));
        if (!target) continue;
        seats[nodes(ctx.el, 'ans').indexOf(target)] = 1;
        found++;
        NOW += 3000;
        target.fire('click');
        eq(shownLabel(ctx.el), byId[tag].label,
          `${real.id} option ${i} showed another option's diagnosis — on a real bank question, with real ` +
          'tags, `why` is being read by screen position');
        click(ctx.el, 'nextq');
        eq(((stored(ctx).practice.units.tpfb || {}).misc || {}), { [tag]: 1 },
          `${real.id} option ${i} counted the wrong named error`);
      }
      ok(found >= 4, `${real.id} option ${i} was reachable in only ${found} runs`);
      ok(Object.keys(seats).length >= 2,
        `${real.id} option ${i} sat in ${Object.keys(seats).length} screen position(s), so these runs ` +
        'cannot tell a position index from an option index');
    });
  }
}

/* ── 6. A lesson check banks apart from the practice record ────────── */
{
  /* check-aat3-practice-summary.js asserts that a whole lesson leaves the
     practice record BYTE-IDENTICAL, and the practice summary is an answer to
     "what did I practise". So a lesson check that banked into
     practice.units[k].misc would break that file rather than this one — which
     is the wrong place to find out. The split is asserted here instead, at the
     moment the count is written.

     No lesson check in the bank carries a tag yet, so the lesson is synthetic.
     The alternative is to assert nothing and say the split holds. */
  const TAG = 'vat-rate-applied-to-a-gross-figure';
  const LESSON = [{
    unit: 'tpfb', level: 3, title: 'Synthetic outcome', outcome: 1,
    outcomeTitle: 'Synthetic outcome', weighting: 100,
    lessons: [{
      id: 'SYNTH-LESSON-1', title: 'Synthetic lesson', icon: '\u25CF', criteria: ['TPFB-1.1.1'],
      cards: [{ h: 'One card', p: ['Nothing to read here.'] }],
      check: [{
        q: 'Synthetic lesson check.',
        opts: ['The right one', 'The tagged wrong one'],
        ans: 0, why: [null, TAG],
        exp: 'Synthetic explanation.',
      }],
    }],
  }];

  const ctx = open();
  ctx.UI.AAT3_LEARN_PATH = LESSON;
  ctx.UI.AAT3_UI.reset('path', 'tpfb');
  ctx.UI.AAT3_UI.mount(ctx.el);
  const before = JSON.stringify(stored(ctx).practice || {});

  click(ctx.el, 'open', n => n.getAttribute('data-id') === 'SYNTH-LESSON-1');
  let guard = 0;
  while (nodes(ctx.el, 'next').length) {
    click(ctx.el, 'next');
    if (++guard > 20) throw new Error('the synthetic lesson never reached its check');
  }
  const wrong = nodes(ctx.el, 'ans').find(n => n.getAttribute('data-i') === '1');
  ok(!!wrong, 'the synthetic lesson check never rendered its options');
  if (wrong) {
    NOW += 3000;
    wrong.fire('click');
    eq(shownLabel(ctx.el), byId[TAG].label, 'a lesson check does not name the error it caught');
    click(ctx.el, 'nextq');
  }

  const after = stored(ctx);
  eq(after.lessonMisc || {}, { [TAG]: 1 },
    'a lesson check did not bank its misconception into lessonMisc');
  eq(JSON.stringify(after.practice || {}), before,
    'a lesson check wrote into the practice record — check-aat3-practice-summary.js asserts a whole ' +
    'lesson leaves it byte-identical, and the practice summary is an answer to "what did I practise"');

  /* AND IT SURVIVES A RELOAD, which is the top-level field list: `lessonMisc`
     has to be named in load() as well as in the `data` literal. */
  const again = open(null, { [STORE_KEY]: ctx.store.getItem(STORE_KEY) });
  again.UI.AAT3_LEARN_PATH = LESSON;
  again.UI.AAT3_UI.reset('path', 'tpfb');
  again.UI.AAT3_UI.mount(again.el);
  click(again.el, 'open', n => n.getAttribute('data-id') === 'SYNTH-LESSON-1');
  guard = 0;
  while (nodes(again.el, 'next').length) {
    click(again.el, 'next');
    if (++guard > 20) throw new Error('the synthetic lesson never reached its check on the reload');
  }
  const wrong2 = nodes(again.el, 'ans').find(n => n.getAttribute('data-i') === '1');
  if (wrong2) { NOW += 3000; wrong2.fire('click'); click(again.el, 'nextq'); }
  eq(stored(again).lessonMisc || {}, { [TAG]: 2 },
    'the lesson tally written before a reload was dropped by the next write \u2014 `lessonMisc` is missing ' +
    'from load() or from the `data` literal');
}

} finally {
  Date.now = realNow;
}

console.log(failures
  ? `\n${RED}${BOLD}── ${failures} of ${checks} checks failed${RESET}\n`
  : `\n${GREEN}${BOLD}── The diagnosis is a diagnosis ✓${RESET}  ${DIM}(${checks} assertions)${RESET}\n`);
process.exit(failures ? 1 : 0);
