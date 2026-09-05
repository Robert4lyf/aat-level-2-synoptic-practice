/**
 * The two shared table question types: pick list and entry grid.
 *
 * WHAT THEY ARE FOR. Every other type in the app asks the reader for a value.
 * These two ask WHERE it belongs — which book, which column, which side — and
 * that decision is the one a journal, an extended trial balance and a ledger
 * account are all really testing. `tablefill` cannot ask it, because its blanks
 * are positioned for the reader before they start.
 *
 * WHAT IS ASSERTED, and why in these layers:
 *
 *   §1 the grading rules, on the engine alone. Blank against zero, a right
 *      figure on the wrong side, pounds and commas — the rules that decide
 *      whether a reader is marked on bookkeeping or on typing.
 *
 *   §2 the authoring rules, over the real bank. A journal that does not balance
 *      teaches the reader to write one; a label that names the figure it is
 *      asking for hands over the mark.
 *
 *   §3 the whole loop on every level that has these types, in the fake DOM:
 *      render, answer, submit, grade, and the key shown afterwards.
 *
 *   §4 a timed paper. Nothing may be revealed while it is being sat, and the
 *      paper must mark a correct answer correct — a type that renders but is
 *      never marked would be invisible until someone sat a mock and scored
 *      zero on questions they got right.
 *
 * Run: node scripts/check-question-grid.js
 */
'use strict';

const path = require('path');
const fs = require('fs');
const ROOT = path.join(__dirname, '..');
const G = require(path.join(ROOT, 'question-grid.js'));

const RED = '\x1b[31m', GREEN = '\x1b[32m';
const BOLD = '\x1b[1m', DIM = '\x1b[2m', RESET = '\x1b[0m';

let failures = 0, checks = 0;
function ok(cond, label) {
  checks++;
  if (!cond) { failures++; console.log(`  ${RED}✗${RESET} ${label}`); }
}

console.log(`${BOLD}Pick lists and entry grids${RESET}\n`);

/* ── 1. The grading rules ─────────────────────────────────────────────────── */
console.log(`${DIM}the rules${RESET}`);

const J = { type: 'entrygrid', entrygrid: { columns: ['Debit £', 'Credit £'], rows: [
  { label: 'Bank', col: 0, amount: 1440 },
  { label: 'Sales', col: 1, amount: 1200 },
  { label: 'VAT', col: 1, amount: 240 },
] } };
const grade = cells => G.gradeEntry(J, cells).right;

ok(grade({ '0:0': '1440', '1:1': '1200', '2:1': '240' }), 'a correct journal is correct');

/* THE WHOLE POINT OF THE TYPE. Right figures on the wrong side is not a near
   miss — it reverses the entry, and anything built on it is out by twice the
   amount. If this ever passes, the type has stopped testing placement and is a
   numeric question wearing a table. */
ok(!grade({ '0:1': '1440', '1:0': '1200', '2:0': '240' }),
  'the same figures on the wrong side are WRONG');
ok(!grade({ '0:0': '1440', '0:1': '1440', '1:1': '1200', '2:1': '240' }),
  'a figure entered on both sides is wrong');
ok(!grade({ '1:1': '1200', '2:1': '240' }),
  'a blank where a figure belongs is wrong');

/* MARKED ON BOOKKEEPING, NOT ON TYPING. */
ok(grade({ '0:0': '£1,440', '1:1': '1200.00', '2:1': ' 240 ' }),
  'pound signs, commas, decimals and spaces are all the same figure');
ok(grade({ '0:0': '1440', '0:1': '0', '1:1': '1200', '2:1': '240' }),
  'a typed 0 where nothing belongs is accepted — "£0 debited" and "nothing debited" are one statement');
ok(!grade({ '0:0': 'abc', '1:1': '1200', '2:1': '240' }), 'and text that is not a figure is wrong');

const P = { type: 'picklist', picklist: { options: ['A', 'B', 'C'],
  rows: [{ text: 'r1', answer: 0 }, { text: 'r2', answer: 2 }] } };
ok(G.gradePicklist(P, { 0: 0, 1: 2 }).right, 'a correct pick list is correct');
ok(!G.gradePicklist(P, { 0: 0 }).right, 'a row left unanswered is wrong, not unmarked');
ok(!G.gradePicklist(P, {}).right, 'and an empty pick list is wrong');

/* A DAY BOOK LINE fills every column, which the one-cell row shape cannot say. */
const DB = { type: 'entrygrid', entrygrid: { columns: ['Net £', 'VAT £', 'Gross £'], rows: [
  { label: 'Invoice 1', cells: { 0: 400, 1: 80, 2: 480 } },
  { label: 'Invoice 2', cells: { 0: 250, 1: 50, 2: 300 } },
] } };
ok(G.gradeEntry(DB, { '0:0': '400', '0:1': '80', '0:2': '480', '1:0': '250', '1:1': '50', '1:2': '300' }).right,
  'a day book row can carry a figure in every column');
ok(!G.gradeEntry(DB, { '0:0': '400', '0:1': '80', '1:0': '250', '1:1': '50' }).right,
  'and leaving one of its columns out is wrong');

/* ── 2. The authoring rules, over the real bank ───────────────────────────── */
console.log(`${DIM}the bank${RESET}`);

function level2Bank() {
  const w = {};
  new Function('window', fs.readFileSync(path.join(ROOT, 'data.js'), 'utf8'))(w);
  return w.ALL_QUESTIONS;
}
const BANKS = [
  ['Level 1', require(path.join(ROOT, 'aat1-practice-data.js')).AAT1_PRACTICE.QUESTIONS],
  ['Level 2', level2Bank()],
  ['Level 3 TPFB', require(path.join(ROOT, 'aat3-practice-data.js')).AAT3_PRACTICE.QUESTIONS],
  ['Level 3 FAPS', require(path.join(ROOT, 'aat3-faps-data.js')).AAT3_FAPS_PRACTICE.QUESTIONS],
  ['Level 3 MATS', require(path.join(ROOT, 'aat3-mats-data.js')).AAT3_MATS_PRACTICE.QUESTIONS],
];

let authored = 0;
BANKS.forEach(([name, bank]) => {
  const mine = bank.filter(q => q.type === 'picklist' || q.type === 'entrygrid');
  authored += mine.length;
  mine.forEach(q => {
    const problems = G.problems(q, `${name} ${q.id}`);
    ok(problems.length === 0, problems[0] || `${name} ${q.id} is well formed`);
  });
});
ok(authored >= 10, `${authored} questions of these two types are authored across the levels`);

/* EVERY LEVEL THAT SHOULD HAVE THEM, HAS THEM — AND HAS BOTH. Wiring a type
   into a player and never writing a question for it is a change nothing fails
   when undone.

   COUNTED PER TYPE, not together. The first version of this rule counted pick
   lists and entry grids as one population, so a bank with twenty-three pick
   lists and no entry grid satisfied it — which is precisely the state TPFB was
   in, and precisely the state this rule was added to catch. Deleting every
   entry grid from that bank left the gate green. They are two different
   questions: one asks which CATEGORY something falls in, the other asks which
   COLUMN a figure goes in, and a bank missing either is missing a shape its
   assessment uses. */
['Level 1', 'Level 2', 'Level 3 FAPS', 'Level 3 TPFB', 'Level 3 MATS'].forEach((name) => {
  const bank = (BANKS.find(b => b[0] === name) || [])[1] || [];
  ['picklist', 'entrygrid'].forEach((type) => {
    const n = bank.filter(q => q.type === type).length;
    ok(n >= 1, `${name} has ${n} ${type} question${n === 1 ? '' : 's'}`);
  });
});

/* LEVEL 1 HAS NO DOUBLE ENTRY IN ITS SYLLABUS. BKFN stops at the books of prime
   entry and the cash book: no ledger accounts, no journals, no trial balance.
   A debit-and-credit grid there would be teaching outside the qualification and
   telling the reader it is Level 1 work. */
{
  const l1 = (BANKS.find(b => b[0] === 'Level 1') || [])[1] || [];
  const drcr = l1.filter(q => q.type === 'entrygrid' &&
    (q.entrygrid.columns || []).some(c => /debit|credit/i.test(c)));
  ok(drcr.length === 0,
    drcr.length
      ? `${drcr.map(q => q.id).join(', ')}: a debit/credit grid on Level 1, whose syllabus has no double entry`
      : 'no Level 1 grid asks for debits and credits, which its syllabus does not cover');
}

/* EVERY CLASS THE SHARED RENDERER EMITS HAS A RULE IN THE SHEET IT BELONGS TO.
   question-grid.js draws the same two tables for three players, each under its
   own prefix, and each prefix is styled in a different file. A class added on
   one side and not the other does not fail, break or warn — it renders an
   unstyled table on one level only, which nothing here would otherwise see.
   `check-subject-styles.js` reads the Level 1 and Level 3 sheets; the Level 2
   sheet is not in its remit, and these are the classes Level 2 shares. */
{
  const src = fs.readFileSync(path.join(ROOT, 'question-grid.js'), 'utf8');
  const table = (src.match(/var CLASSES = \{[\s\S]*?\n  \};/) || [''])[0];
  const SHEETS = { a1: 'aat1-styles.css', a3: 'aat3-styles.css', l2: 'styles.css' };
  Object.keys(SHEETS).forEach(px => {
    const block = (table.split(px + ': {')[1] || '').split('},')[0];
    const names = [...block.matchAll(/'([a-z0-9-]+)'/g)].map(x => x[1]);
    ok(names.length >= 18, `${px}: the class table names ${names.length} classes`);
    const css = fs.readFileSync(path.join(ROOT, SHEETS[px]), 'utf8');
    const missing = names.filter(c => !new RegExp('\\.' + c + '(?![a-z0-9-])').test(css));
    ok(missing.length === 0,
      missing.length
        ? `${missing.join(', ')}: emitted by question-grid.js and unstyled in ${SHEETS[px]}`
        : `${px}: all ${names.length} of them are styled in ${SHEETS[px]}`);
  });
}

/* ── 3. The whole loop, on each player ────────────────────────────────────── */
console.log(`${DIM}each player${RESET}`);

const PLAYERS = [
  { name: 'Level 1', px: 'a1', driver: './lib/aat1-driver.js',
    bank: require(path.join(ROOT, 'aat1-practice-data.js')).AAT1_PRACTICE.QUESTIONS,
    /* `install` and `reset` are separate hooks rather than one `open` because
       section 4 needs the same two steps and then a MOCK instead of a practice
       run. An earlier version told the two apart with `if (pl.name === …)`,
       which silently did the wrong thing the moment a third player was added:
       the new bank was installed under the old one's global and the paper
       served nothing, reported as a bank with no questions in it. */
    install(M, qs) { M.AAT1_PRACTICE = { QUESTIONS: qs }; },
    reset(M) { M.AAT1_UI.reset('practice'); },
    open(D, M, qs) {
      this.install(M, qs);
      const el = D.fakeEl();
      this.reset(M); M.AAT1_UI.mount(el);
      D.click(el, 'startpractice', n => n.getAttribute('data-lo') === 'mix');
      return el;
    },
    ui: M => M.AAT1_UI, right: /a1-verdict is-right/, wrong: /a1-verdict is-wrong/ },
  { name: 'Level 3 FAPS', px: 'a3', driver: './lib/aat3-driver.js',
    bank: require(path.join(ROOT, 'aat3-faps-data.js')).AAT3_FAPS_PRACTICE.QUESTIONS,
    install(M, qs) { M.AAT3_FAPS_PRACTICE = { QUESTIONS: qs }; M.AAT3_PRACTICE = { QUESTIONS: [] }; M.AAT3_MATS_PRACTICE = { QUESTIONS: [] }; },
    reset(M) { M.AAT3_UI.reset('practice', 'faps'); },
    open(D, M, qs) {
      this.install(M, qs);
      const el = D.fakeEl();
      this.reset(M); M.AAT3_UI.mount(el);
      D.click(el, 'startpractice', n => n.getAttribute('data-lo') === 'mix');
      return el;
    },
    ui: M => M.AAT3_UI, right: /a3-try-verdict is-right/, wrong: /a3-try-verdict is-wrong/ },
  /* BOTH LEVEL 3 UNITS, not one of them. The two banks are different files
     rendered by the same player, and driving only FAPS proved the player works
     — which it already did. What it could not see was forty TPFB tables that
     had never been rendered, answered or graded by anything. A unit whose
     questions no harness opens is a unit nobody has checked. */
  { name: 'Level 3 TPFB', px: 'a3', driver: './lib/aat3-driver.js',
    bank: require(path.join(ROOT, 'aat3-practice-data.js')).AAT3_PRACTICE.QUESTIONS,
    install(M, qs) { M.AAT3_PRACTICE = { QUESTIONS: qs }; M.AAT3_FAPS_PRACTICE = { QUESTIONS: [] }; M.AAT3_MATS_PRACTICE = { QUESTIONS: [] }; },
    reset(M) { M.AAT3_UI.reset('practice', 'tpfb'); },
    open(D, M, qs) {
      this.install(M, qs);
      const el = D.fakeEl();
      this.reset(M); M.AAT3_UI.mount(el);
      D.click(el, 'startpractice', n => n.getAttribute('data-lo') === 'mix');
      return el;
    },
    ui: M => M.AAT3_UI, right: /a3-try-verdict is-right/, wrong: /a3-try-verdict is-wrong/ },
  { name: 'Level 3 MATS', px: 'a3', driver: './lib/aat3-driver.js',
    bank: require(path.join(ROOT, 'aat3-mats-data.js')).AAT3_MATS_PRACTICE.QUESTIONS,
    install(M, qs) { M.AAT3_MATS_PRACTICE = { QUESTIONS: qs }; M.AAT3_PRACTICE = { QUESTIONS: [] }; M.AAT3_FAPS_PRACTICE = { QUESTIONS: [] }; },
    reset(M) { M.AAT3_UI.reset('practice', 'mats'); },
    open(D, M, qs) {
      this.install(M, qs);
      const el = D.fakeEl();
      this.reset(M); M.AAT3_UI.mount(el);
      D.click(el, 'startpractice', n => n.getAttribute('data-lo') === 'mix');
      return el;
    },
    ui: M => M.AAT3_UI, right: /a3-try-verdict is-right/, wrong: /a3-try-verdict is-wrong/ },
];

/* The row text as the renderer escaped it, back to what the bank holds. */
function decode(t) {
  return String(t).replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'");
}

/* Fill the controls on screen from the key, or deliberately away from it. */
function answerOnScreen(D, el, q, right) {
  if (q.picklist) {
    D.nodes(el, 'plpick').forEach(n => {
      /* BY THE ROW ON SCREEN, NOT BY THE BANK'S ORDER. The rows are shuffled
         per sitting, so `rows[data-r]` is the wrong row — which is what a
         reader would be marked on if the grader made the same mistake. The
         control names its row in `aria-label`, so look the answer up by that. */
      const label = decode(n.getAttribute('aria-label') || '');
      const row = q.picklist.rows.find(x => decode(x.text) === label) || q.picklist.rows[0];
      const a = row.answer;
      n.value = String(right ? a : (a + 1) % q.picklist.options.length);
      n.fire('change');
    });
  } else {
    D.nodes(el, 'egcell').forEach(n => {
      const [ri, ci] = n.getAttribute('data-c').split(':').map(Number);
      const v = G.cellKey(q.entrygrid.rows[ri], ci);
      n.value = right ? (v == null ? '' : String(v)) : '1';
      n.fire('input');
    });
  }
}

PLAYERS.forEach(pl => {
  const D = require(pl.driver);
  const mine = pl.bank.filter(q => q.type === 'picklist' || q.type === 'entrygrid');
  ok(mine.length > 0, `${pl.name} has questions of these types to drive`);

  mine.forEach(q => {
    const isPick = !!q.picklist;
    const control = isPick ? 'plpick' : 'egcell';
    const submit = isPick ? 'plsubmit' : 'egsubmit';
    /* ONE CONTROL PER CELL THE READER IS ASKED FOR, which is no longer every
       cell: a `given` column is printed rather than rendered as an input, so a
       partly-completed table can be shown. Counting every cell here would fail
       exactly the questions the given cell was added to fix. */
    const givenCount = isPick ? 0 : (q.entrygrid.rows || []).reduce(
      (n, r) => n + (Array.isArray(r.given) ? r.given.length : 0), 0);
    const wanted = isPick
      ? q.picklist.rows.length
      : q.entrygrid.rows.length * q.entrygrid.columns.length - givenCount;

    /* Right. */
    let M = D.loadUI(D.fakeStore());
    let el = pl.open(D, M, [q]);
    ok(D.nodes(el, control).length === wanted,
      `${pl.name} ${q.id}: renders ${wanted} control(s) (got ${D.nodes(el, control).length})`);

    /* AND THE GIVEN FIGURES ARE ON THE SCREEN. Marking a column `given` and
       then not printing it would take the input away and show nothing in its
       place — strictly worse than the blank box it replaced. */
    if (!isPick && givenCount) {
      const html = el.innerHTML;
      let printed = 0, want = 0;
      (q.entrygrid.rows || []).forEach((r) => {
        (Array.isArray(r.given) ? r.given : []).forEach((ci) => {
          const v = r.cells ? r.cells[ci] : (r.col === ci ? r.amount : null);
          if (v == null) return;
          want++;
          if (html.indexOf(Number(v).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })) !== -1) printed++;
        });
      });
      ok(printed === want,
        `${pl.name} ${q.id}: shows all ${want} given figure(s) (found ${printed})`);
    }
    ok(D.nodes(el, submit).length === 1, `${pl.name} ${q.id}: offers a submit button`);
    /* NOTHING IS SHOWN BEFORE IT IS SUBMITTED. */
    ok(!new RegExp(pl.px + '-(pl|eg)-key').test(el.innerHTML),
      `${pl.name} ${q.id}: shows no answer before it is submitted`);
    answerOnScreen(D, el, q, true);
    D.click(el, submit);
    ok(pl.right.test(el.innerHTML), `${pl.name} ${q.id}: a correct answer is marked correct`);

    /* Wrong — and the key is shown afterwards, or a reader who got it wrong has
       nothing to learn from. */
    M = D.loadUI(D.fakeStore());
    el = pl.open(D, M, [q]);
    answerOnScreen(D, el, q, false);
    D.click(el, submit);
    ok(pl.wrong.test(el.innerHTML), `${pl.name} ${q.id}: a wrong answer is marked wrong`);
    ok(new RegExp(pl.px + '-(pl|eg)-key').test(el.innerHTML),
      `${pl.name} ${q.id}: and the right answer is shown beside what they put`);
  });
});

/* ── 3b. The rows are shuffled, and the marking follows them ──────────────── */

/* WHY THIS MATTERS MORE THAN IT LOOKS. A true/false grid has its statements
   shuffled on all three levels so the reader cannot learn the pattern; a pick
   list is the same shape and was not, so a reader sitting a paper twice could
   answer row 3 without reading it. Shuffling rows is only safe if the RENDERER
   and the GRADER agree on the order — get that wrong and a reader who answers
   every row correctly is marked wrong, which is a worse bug than the one being
   fixed. So this asserts both halves: that the order moves, and that a paper
   answered against the order ON SCREEN is marked right. */
PLAYERS.forEach(pl => {
  const D = require(pl.driver);
  const q = pl.bank.find(x => x.type === 'picklist' && x.picklist.rows.length >= 4);
  if (!q) { ok(false, `${pl.name} has a pick list to shuffle`); return; }

  /* The row LABELS in the order they are drawn, over enough runs that a single
     shuffle landing on the original order is not read as no shuffle at all. */
  const seen = new Set();
  for (let i = 0; i < 12; i++) {
    const M = D.loadUI(D.fakeStore());
    const el = pl.open(D, M, [q]);
    const order = D.nodes(el, 'plpick').map(n => n.getAttribute('aria-label')).join('|');
    if (order) seen.add(order);
  }
  ok(seen.size > 1,
    `${pl.name} ${q.id}: the rows are not always in the same order (${seen.size} orders in 12 runs)`);

  /* AND THE MARKING FOLLOWS THE SCREEN. Answered from the row text as rendered
     — which is what a reader does — a correct answer must be correct. If the
     grader read the bank's row order instead of the shuffled one this fails
     nearly every run. */
  for (let i = 0; i < 6; i++) {
    const M = D.loadUI(D.fakeStore());
    const el = pl.open(D, M, [q]);
    D.nodes(el, 'plpick').forEach(n => {
      /* Look the row's answer up BY ITS TEXT, not by its position. */
      const label = decode(n.getAttribute('aria-label') || '');
      const row = q.picklist.rows.find(x => decode(x.text) === label);
      ok(!!row, `${pl.name} ${q.id}: every row on screen is a row of the question`);
      n.value = String(row ? row.answer : 0);
      n.fire('change');
    });
    D.click(el, 'plsubmit');
    ok(pl.right.test(el.innerHTML),
      `${pl.name} ${q.id}: answered from the rows as shown, it is marked correct (run ${i + 1})`);
  }
});

/* ── 4. A timed paper ─────────────────────────────────────────────────────── */
console.log(`${DIM}under exam conditions${RESET}`);

PLAYERS.forEach(pl => {
  const D = require(pl.driver);
  const mine = pl.bank.filter(q => q.type === 'picklist' || q.type === 'entrygrid');
  if (!mine.length) return;

  [true, false].forEach(right => {
    const M = D.loadUI(D.fakeStore());
    pl.install(M, mine);
    const UI = pl.ui(M);
    const el = D.fakeEl();
    pl.reset(M);
    UI.mount(el);
    D.click(el, 'startmock');

    const norm = t => String(t).replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
    const stemRe = new RegExp('<h2 class="' + pl.px + '-q">([\\s\\S]*?)</h2>');
    /* WALK THE PAPER THE PAPER SETS, not a number written here. This loop ran a
       fixed twelve times, which was every question while the bank held fewer
       than twelve of these types. The FAPS bank now holds twenty-six and its
       paper is twenty-four long, so the walk stopped halfway and reported a
       correct paper as scoring 50% — a harness that had quietly stopped
       measuring what it claimed to. The bound is now a guard against a paper
       that never ends, not a description of one. */
    let leaked = 0, matched = 0, sawSubmit = 0, screens = 0, unmatched = 0;
    for (let i = 0; i < 200; i++) {
      const html = el.innerHTML;
      if (new RegExp(pl.px + '-(pl|eg)-(key|said)').test(html)) leaked++;
      if (/data-a[13]="(plsubmit|egsubmit)"/.test(html)) sawSubmit++;
      const m = html.match(stemRe);
      /* DECODED, not just de-tagged. The renderer escapes the stem, so a
         question whose wording contains an apostrophe arrives as `&#39;` and
         never matches the bank — which showed up as a paper scoring 92% with
         two questions "not recognised", and would have been read as a product
         defect rather than as this harness reading escaped HTML as text. */
      const text = m ? norm(decode(m[1].replace(/<[^>]*>/g, ''))) : null;
      /* A screen with no stem is the result screen, not a question the paper
         served. Counting it made every paper one question longer than it was. */
      if (text !== null) {
        const q = mine.find(x => norm(x.q) === text);
        screens++;
        if (q) { matched++; answerOnScreen(D, el, q, right); } else unmatched++;
      }
      if (!D.nodes(el, 'mocknext').length) break;
      D.click(el, 'mocknext');
    }
    const pct = Number((el.innerHTML.match(/(\d+)%/) || [])[1]);

    if (right) {
      /* THE BANK HOLDS ONLY THESE TYPES, so every screen the paper drew must be
         one of them and must have been answered. Counting screens rather than
         the bank keeps this honest whether the paper is shorter than the bank
         (a weighted draw over nine outcomes) or the same length as it. */
      ok(screens > 0 && unmatched === 0,
        `${pl.name} mock: every one of the ${screens} questions the paper served was answered (${unmatched} not recognised)`);
      ok(matched >= Math.min(mine.length, 3),
        `${pl.name} mock: the paper served a meaningful number of them (${matched})`);
      /* NOTHING REVEALED WHILE THE PAPER IS BEING SAT. A type that printed its
         key beside the controls would hand over the marks, and no existing
         check looks inside these tables. */
      ok(leaked === 0, `${pl.name} mock: no answer is revealed during the paper (${leaked} screens leaked)`);
      ok(sawSubmit === 0, `${pl.name} mock: no per-question submit button appears in a paper`);
      ok(pct === 100, `${pl.name} mock: a paper answered correctly scores 100% (got ${pct})`);

      /* WHAT THE READER PUT HAS TO SURVIVE THE PAPER, and it is kept separately
         from the score: the mark is taken as they move on, the review screen is
         rebuilt from a stored copy of the entries. Keep only the mark and a
         paper scored 100% reports every one of these questions as left blank —
         a contradiction the reader sees and the percentage does not. */
      D.click(el, 'review');
      ok(!/left blank|not reached/.test(el.innerHTML),
        `${pl.name} mock: review reports none of them left blank after a full, correct paper`);
      /* AND THE REVIEW AGREES WITH THE PAPER. The score is taken as the reader
         moves on; the review screen MARKS THE QUESTION AGAIN from the stored
         answer. Anything the paper knew and the record does not — which rows a
         pick list showed, and in what order — makes the two disagree, and the
         reader is shown a question ticked in the list and marked wrong when
         they open it. Every question on this paper was answered correctly, so
         every re-grade must say so too. */
      const ids = D.nodes(el, 'reviewq').map(n => n.getAttribute('data-i'));
      ok(ids.length === screens, `${pl.name} mock: review lists all ${screens} questions the paper served`);
      ids.forEach(i => {
        D.click(el, 'reviewq', n => n.getAttribute('data-i') === i);
        ok(pl.right.test(el.innerHTML),
          `${pl.name} mock: question ${Number(i) + 1} re-marks as right in review, as the paper scored it`);
        ok(new RegExp(pl.px + '-(pl|eg)-said').test(el.innerHTML),
          `${pl.name} mock: and shows the entries they made`);
        D.click(el, 'reviewlist');
      });
    } else {
      ok(pct === 0, `${pl.name} mock: a paper answered wrongly scores 0% (got ${pct})`);
    }
  });
});

/* THE LEVEL 2 SYNOPTIC SERVES THEM. AAT's Level 2 specification v5.4 §9.4 lists
   three families of question — multiple choice, numeric gap-fill, and "question
   tools that replicate workplace activities such as making entries in a
   journal" — and the synoptic's objectives 4, 5 and 7 (process bookkeeping
   transactions; produce and reconcile control accounts and use journals;
   bookkeeping systems, receipts and payments) are thirty of its hundred marks.
   A paper that met those marks with multiple choice alone rehearsed two of the
   three formats. The exclusion here was mine, and it did not survive reading
   the specification. */
{
  const app = fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8');
  const m = app.match(/const MOCK_TYPES = \[([\s\S]*?)\]/);
  ok(!!m, 'Level 2 still has an explicit list of the types its mock may serve');
  ok(!!m && /'picklist'/.test(m[1]) && /'entrygrid'/.test(m[1]),
    'and both table types are on it, as the specification\u2019s third question family');

  /* THE THREE PIECES A PAPER NEEDS. All three were missing when the types were
     first wired in and none of them showed, because nothing exercised the exam
     path. They are asserted here as well as driven in a browser below, because
     a regex over the source says WHICH piece is gone when a paper breaks, and a
     failed paper only says that it did.

       renderer  — the exam body draws the table with the key HIDDEN. Handed
                   `showAnswers: true` it prints the answers during the paper.
       grader    — without a branch of its own, both types fall through to the
                   simple-MCQ case, which reads a `q.opts` neither one has.
       recorder  — under exam conditions what the reader types goes to the
                   paper's answer key, not to the practice draft. Written to
                   the draft, the paper marks a filled-in journal unanswered. */
  const EXAM = [
    [/isPickList\(q\) && window\.AATGrid[\s\S]{0,400}?showAnswers: false/,
      'the exam body draws a pick list with the key hidden'],
    [/isEntryGrid\(q\) && window\.AATGrid[\s\S]{0,400}?showAnswers: false/,
      'the exam body draws an entry grid with the key hidden'],
    [/isPickList\(q\) && window\.AATGrid[\s\S]{0,400}?gradePicklist/,
      'the exam grader marks a pick list with the shared grader'],
    [/isEntryGrid\(q\) && window\.AATGrid[\s\S]{0,400}?gradeEntry/,
      'the exam grader marks an entry grid with the shared grader'],
    [/data-l2="plpick"[\s\S]{0,400}?State\.mode === 'mock'\) setExamAnswerKey/,
      "a pick list's choices reach the paper's answer key, not the practice draft"],
    [/data-l2="egcell"[\s\S]{0,400}?State\.mode === 'mock'\) setExamAnswerKey/,
      "an entry grid's cells reach the paper's answer key, not the practice draft"],
  ];
  EXAM.forEach(([re, label]) => ok(re.test(app), `Level 2 under exam conditions: ${label}`));
}

/* ── 5. Level 2, in a real browser ────────────────────────────────────────── */

/* WHY THIS ONE NEEDS A BROWSER. Levels 1 and 3 render themselves from modules
   Node can load, and §3 drives them in a fake DOM. Level 2 lives in app.js —
   ten thousand lines that only run in a page — so the only way to find out
   whether these two types render, record and grade there is to open the app and
   answer one. Reading the source is what left three defects in this path (an
   exam renderer handed `showAnswers: true`, no grader branch, and answers
   written to the practice draft instead of the paper's key) until they were
   read for a second time. */

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.webmanifest': 'application/manifest+json',
  '.png': 'image/png', '.svg': 'image/svg+xml' };
function serve() {
  return new Promise(resolve => {
    const server = require('http').createServer((req, res) => {
      const url = decodeURIComponent(req.url.split('?')[0]);
      const file = path.join(ROOT, url === '/' ? 'index.html' : url);
      if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
        res.writeHead(404); res.end('not found'); return;
      }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
      fs.createReadStream(file).pipe(res);
    });
    server.listen(0, '127.0.0.1', () => resolve({ server, port: server.address().port }));
  });
}

let chromium = null;
try { ({ chromium } = require('playwright')); } catch (e) { /* handled below */ }

function finish() {
  console.log();
  if (failures) { console.log(`${RED}${BOLD}✗ ${failures} of ${checks} checks failed${RESET}`); process.exit(1); }
  console.log(`${GREEN}${BOLD}✓ ${checks} checks passed${RESET}`);
  process.exit(0);
}

(async () => {
  const l2 = level2Bank().filter(q => q.type === 'picklist' || q.type === 'entrygrid');
  if (!chromium) {
    if (process.env.REQUIRE_PLAYWRIGHT) {
      console.log(`\n  ${RED}✗${RESET}  Playwright is required here and is not installed.`);
      process.exit(1);
    }
    console.log(`${DIM}Level 2 — skipped, Playwright is not installed${RESET}`);
    finish();
    return;
  }
  console.log(`${DIM}Level 2, in a browser${RESET}`);
  const { server, port } = await serve();
  const base = `http://127.0.0.1:${port}/`;
  const CANDIDATES = [
    '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell',
    '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  ].filter(p => fs.existsSync(p));
  const browser = await chromium.launch(CANDIDATES.length ? { executablePath: CANDIDATES[0] } : {});

  for (const q of l2) {
    for (const right of [true, false]) {
      /* A CONTEXT OF ITS OWN PER CASE. Storage carries a half-finished session
         between runs, and the resume banner that offers it stands where the
         next question would be — which the first version of this read as the
         question failing to render. */
      const ctx = await browser.newContext({ viewport: { width: 1200, height: 900 } });
      await ctx.addInitScript(() => localStorage.setItem('multisubject_active', 'aat'));
      const page = await ctx.newPage();
      const errs = [];
      page.on('pageerror', e => errs.push(e.message));
      await page.goto(base, { waitUntil: 'load' });
      await page.waitForFunction(() => {
        const a = document.getElementById('app');
        return a && a.textContent.trim().length > 40;
      }, { timeout: 15000 }).catch(() => {});
      const tap = async sel => {
        const b = page.locator(sel + ':not([disabled])').first();
        if (await b.count() && await b.isVisible().catch(() => false)) {
          await b.click({ timeout: 2500 }).catch(() => {});
          await page.waitForTimeout(120);
          return true;
        }
        return false;
      };
      await tap('#startBtn');
      await tap('[data-tab="home"]');

      /* THE BANK IS NARROWED TO ONE QUESTION so the run is the question, not a
         draw that reaches it nine times in ten. Its topic is rewritten to the
         first unit because later units are locked until the earlier ones are
         passed, and a locked unit refuses to start rather than serving a
         question — nothing in the rendering or grading path reads `topic`
         beyond the pill in the header. */
      await page.evaluate(id => {
        window.ALL_QUESTIONS = window.ALL_QUESTIONS
          .filter(x => x.id === id)
          .map(x => Object.assign({}, x, { topic: 'itbk' }));
      }, q.id);
      await tap('[data-topic="all"]');
      await page.waitForSelector('.quiz-container', { timeout: 10000 }).catch(() => {});

      const pick = q.type === 'picklist';
      const control = pick ? '[data-l2="plpick"]' : '[data-l2="egcell"]';
      const wanted = pick ? q.picklist.rows.length
        : q.entrygrid.rows.length * q.entrygrid.columns.length;
      const got = await page.locator(control).count();
      ok(got === wanted, `Level 2 ${q.id}: renders ${wanted} control(s) (got ${got})`);
      ok(await page.locator('.l2-pl-key, .l2-eg-key').count() === 0,
        `Level 2 ${q.id}: shows no answer before it is submitted`);

      if (pick) {
        const n = q.picklist.options.length;
        /* BY THE ROW ON SCREEN. Level 2 shuffles a pick list's rows per sitting,
           so the bank's order is not the reader's, and answering by bank index
           tests nothing but the shuffle. */
        const shown = await page.locator(control).evaluateAll(
          es => es.map(e => e.getAttribute('aria-label')));
        for (let r = 0; r < q.picklist.rows.length; r++) {
          const row = q.picklist.rows.find(x => x.text === shown[r]) || q.picklist.rows[r];
          const a = row.answer;
          await page.locator(control).nth(r)
            .selectOption(String(right ? a : (a + 1) % n)).catch(() => {});
        }
      } else {
        let i = 0;
        for (let ri = 0; ri < q.entrygrid.rows.length; ri++) {
          for (let ci = 0; ci < q.entrygrid.columns.length; ci++) {
            const v = G.cellKey(q.entrygrid.rows[ri], ci);
            await page.locator(control).nth(i)
              .fill(right ? (v == null ? '' : String(v)) : '1').catch(() => {});
            i++;
          }
        }
      }
      await tap(pick ? '#submitPickListBtn' : '#submitEntryGridBtn');

      const good = await page.locator('.feedback.correct').count();
      const bad = await page.locator('.feedback.wrong').count();
      const key = await page.locator('.l2-pl-key, .l2-eg-key').count();
      if (right) {
        ok(good === 1 && bad === 0, `Level 2 ${q.id}: a correct answer is marked correct`);
      } else {
        ok(bad === 1 && good === 0, `Level 2 ${q.id}: a wrong answer is marked wrong`);
        ok(key > 0, `Level 2 ${q.id}: and the right answer is shown beside what they put`);
      }
      ok(errs.length === 0, `Level 2 ${q.id}: raises no uncaught error (${errs[0] || ''})`);
      await ctx.close();
    }
  }

  await browser.close();
  server.close();
  finish();
})();

