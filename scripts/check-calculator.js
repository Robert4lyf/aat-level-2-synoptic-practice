#!/usr/bin/env node
/**
 * The on-screen calculator: the arithmetic, and the wiring at both levels.
 *
 * WHY THIS FILE EXISTS AT ALL. The calculator shipped on Level 2 with no test
 * of any kind, and the arithmetic is not as simple as a keypad looks: one flag,
 * `justEvaled`, decides whether the next digit extends the display or replaces
 * it, whether an operator chains off the running total or restarts from it, and
 * whether backspace edits a number or clears a result. Every one of those is a
 * silent wrong answer if it flips — the pad still adds up, just differently,
 * and a reader would blame their own arithmetic.
 *
 * WHAT WOULD BE HOLLOW HERE, AND HOW IT IS AVOIDED. Level 3's keys do NOT
 * repaint the screen — that is the point of them, so the caret stays in the
 * answer box — so the display in the rendered HTML does not move when a key is
 * pressed, and any assertion reading it back from the markup would pass
 * against a pad wired to nothing. So the effects are asserted end to end
 * instead: press keys, click "Use this value", and require the figure to reach
 * the box AND the state that grading reads. §5 grades on it.
 *
 * §1 the engine, in isolation      §5 the value reaches grading, not just the box
 * §2 one pad, two levels           §6 the display resets between questions
 * §3 where it is offered           §7 the reader's typed answer survives a keypress
 * §4 and where it is not           §8 Level 2 is unharmed (Chromium)
 *
 * Run: node scripts/check-calculator.js
 */
'use strict';

const path = require('path');
const http = require('http');
const fs = require('fs');
const ROOT = path.join(__dirname, '..');

const RED = '\x1b[31m', GREEN = '\x1b[32m', YEL = '\x1b[33m';
const BOLD = '\x1b[1m', DIM = '\x1b[2m', RESET = '\x1b[0m';

let failures = 0, checks = 0;
function ok(cond, label) {
  checks++;
  if (!cond) { failures++; console.log(`  ${RED}✗${RESET} ${label}`); }
}

console.log(`${BOLD}On-screen calculator${RESET}\n`);

const D = require('./lib/aat3-driver.js');
require(path.join(ROOT, 'calculator.js'));
const AATCalc = global.AATCalc;

/* ── 1. The engine, in isolation ──────────────────────────────────────────── */
console.log(`${DIM}the engine${RESET}`);

ok(!!AATCalc && typeof AATCalc.create === 'function', 'calculator.js exports a factory');

/* Press a sequence written the way it is on the keys: '7', '*', '3', '='. */
function run(seq) {
  const C = AATCalc.create();
  seq.forEach(s => {
    if (/^\d$/.test(s)) C.press('num', s);
    else if (s === '.') C.press('dot');
    else if ('+-*/'.indexOf(s) !== -1) C.press('op', s);
    else if (s === '=') C.press('eq');
    else C.press(s);
  });
  return C;
}
const SUMS = [
  [['1', '2', '+', '3', '='], '15', 'twelve plus three'],
  [['9', '-', '4', '='], '5', 'nine minus four'],
  [['7', '*', '3', '='], '21', 'seven times three'],
  [['8', '/', '2', '='], '4', 'eight over two'],
  [['1', '.', '5', '+', '2', '.', '2', '5', '='], '3.75', 'decimals'],
  /* The VAT sums this is actually for. 1/6 of a gross figure, and 20% of a net
     one — both to the penny, because a calculator that is a penny out on a VAT
     fraction is worse than no calculator. */
  [['1', '2', '0', '0', '/', '6', '='], '200', 'the VAT fraction of £1,200 gross'],
  [['4', '8', '0', '0', '*', '2', '0', 'pct', '='], '960', 'the engine still knows per cent (20% of £4,800)'],
  /* Chaining without pressing equals: an operator has to settle the sum so far.
     If it does not, this reads 2 rather than 6. */
  [['2', '+', '2', '+', '2', '='], '6', 'chaining without pressing equals'],
];
SUMS.forEach(([seq, want, label]) => {
  ok(run(seq).display === want, `${label} → ${want} (got ${run(seq).display})`);
});

/* The engine keeps these even with no button on the pad, so putting a key back
   is a one-line change rather than a re-implementation. */
ok(run(['9', 'sqrt']).display === '3', 'the engine still knows square root');
ok(run(['5', 'sign']).display === '-5', 'the sign key negates');
ok(run(['5', 'sign', 'sign']).display === '5', 'and negates back');
ok(run(['1', '2', '3', 'back']).display === '12', 'backspace drops a digit');
ok(run(['7', 'back']).display === '0', 'backspacing the last digit leaves zero, not empty');
ok(run(['1', '.', '2', '.', '3']).display === '1.23', 'a second decimal point is refused');
ok(run(['5', '+', '5', '=', 'clear']).display === '0', 'C clears');

/* Division by zero must SAY so rather than showing Infinity, and must not then
   go on doing arithmetic on a broken display. */
const dz = run(['5', '/', '0', '=']);
ok(dz.display === 'Error', 'dividing by zero reports an error');
ok(dz.errored === true, 'and latches the error state');
ok(run(['4', 'sign', 'sqrt']).display === 'Error', 'the root of a negative reports an error');
ok(run(['5', '/', '0', '=', '7']).display === '7', 'typing after an error starts a fresh number');

/* A result is REPLACED by the next digit, not extended by it. Get this wrong
   and 21 followed by 5 becomes 215 — a wrong answer that looks deliberate. */
ok(run(['7', '*', '3', '=', '5']).display === '5', 'a digit after equals starts a new number');
ok(run(['7', '*', '3', '=', '+', '4', '=']).display === '25', 'an operator after equals continues from the result');

/* Memory. M+ then MR has to give back what was banked, and MC has to forget it. */
const mem = AATCalc.create();
mem.press('num', '4'); mem.press('num', '0'); mem.press('madd');
mem.press('clear'); mem.press('num', '2');
ok(mem.memory === 40, 'M+ banks the displayed figure');
mem.press('mr');
ok(mem.display === '40', 'MR recalls it');
mem.press('num', '5'); mem.press('msub');
ok(mem.memory === 35, 'M− subtracts from memory');
mem.press('mc');
ok(mem.memory === 0, 'MC clears memory');

/* Two callers must not share one calculator: a half-typed sum on Level 2 has no
   business appearing on Level 3. */
const a = AATCalc.create(), b = AATCalc.create();
a.press('num', '9'); a.press('madd');
ok(a !== b, 'create() hands back a new calculator each time');
ok(b.display === '0' && b.memory === 0, 'so one caller\'s working never shows up in another');

/* ── 2. One pad, two levels ───────────────────────────────────────────────── */
console.log(`${DIM}one pad, two levels${RESET}`);

const KEYS = AATCalc.KEYS || [];
const WANT = ['clear', 'back', 'sign', 'dot', 'eq'];
WANT.forEach(k => ok(KEYS.some(x => x.k === k), `the shared pad has a ${k} key`));
/* REMOVED ON PURPOSE, and asserted as removed so they cannot drift back in on
   one level and not the other. The memory row, the square root and the
   percentage key were all taken off the pad: the assessment's own calculator is
   this shape, a VAT figure is reached with ÷ 6 or × 1.2, and a square root has
   no use in either unit. The ENGINE still knows how to do all three — that is
   asserted below — so restoring a key is a line in the KEYS table. */
['mc', 'mr', 'msub', 'madd', 'pct', 'sqrt'].forEach(k =>
  ok(!KEYS.some(x => x.k === k), `the pad no longer offers a ${k} key`));
'0123456789'.split('').forEach(d =>
  ok(KEYS.some(x => x.k === 'num' && x.val === d), `the shared pad has a ${d} key`));
['+', '-', '*', '/'].forEach(o =>
  ok(KEYS.some(x => x.k === 'op' && x.val === o), `the shared pad has a "${o}" key`));

/* Every key the pad draws is a key the engine acts on. A pad that renders a √
   it never wired up is the defect this catches, and it is invisible from the
   markup. */
KEYS.forEach(k => {
  /* Set up a state in which EVERY key has something to do — a pending sum for
     "=", a banked figure for MC, a non-zero display for C — so the assertion
     needs no exceptions. The first version pressed each key on a clean
     calculator and had to excuse "=" and MC for correctly doing nothing, which
     is an exception list that would have grown to hide a real dead key. */
  const C = AATCalc.create();
  C.display = '9'; C.justEvaled = false; C.memory = 5; C.prev = 2; C.pending = '+';
  const before = C.display + '|' + C.memory + '|' + C.pending;
  C.press(k.k, k.val);
  ok(before !== C.display + '|' + C.memory + '|' + C.pending,
    `pressing "${k.label}" does something`);
});

/* Both levels must render every one of them, or the two pads have come apart —
   which is the whole reason the layout is shared rather than copied. */
/* COMMENTS STRIPPED FIRST. The first version tested the raw source, and the
   comment above renderCalculatorSidebar says the words "AATCalc.KEYS" — so
   gutting the call to `[].map` left the assertion passing against a Level 2
   calculator with no keys on it at all. A source grep that can be satisfied by
   prose about the source is not a check. What Level 2 actually renders is
   asserted in the browser, in §8. */
function code(file) {
  return fs.readFileSync(path.join(ROOT, file), 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^\s*\/\/.*$/gm, '');
}
const APP = code('app.js'), A3 = code('aat3-ui.js');
ok(/AATCalc\.KEYS/.test(APP), 'Level 2 renders the shared pad rather than its own');
ok(/AATCalc\.KEYS/.test(A3), 'Level 3 renders the shared pad rather than its own');
ok(!/data-calc="sqrt"/.test(APP), 'Level 2 no longer hand-writes its keys');
/* Nineteen keys over twenty slots: five rows of four with a double-width zero.
   A pad that does not fill its grid leaves a hole, and one that overflows it
   pushes a key onto a sixth row on its own. */
const slots = KEYS.reduce((n, k) => n + (k.span || 1), 0);
ok(slots % 4 === 0, `the pad fills whole rows of four (${KEYS.length} keys over ${slots} slots)`);

/* ── Level 3, through the real player ─────────────────────────────────────── */

const NUMERIC = { id: 'C-N', unitKey: 'tpfb', lo: 1, criteria: ['TPFB-1.1.1'], type: 'numeric',
  q: 'Output tax on £1,200 of standard-rated sales, VAT exclusive?', answer: 240, unit: '£',
  exp: 'Twenty per cent of £1,200 is £240.' };
const MCQ = { id: 'C-M', unitKey: 'tpfb', lo: 1, criteria: ['TPFB-1.1.1'], type: 'mcq',
  q: 'Which rate applies?', opts: ['Standard', 'Zero', 'Exempt', 'Outside scope'], ans: 0,
  exp: 'Standard rate.' };
const TF = { id: 'C-T', unitKey: 'tpfb', lo: 1, criteria: ['TPFB-1.1.1'], type: 'truefalse',
  q: 'True or false?', statements: [{ text: 'A', answer: true }, { text: 'B', answer: false }],
  exp: 'As stated.' };
const GAP = { id: 'C-G', unitKey: 'tpfb', lo: 1, criteria: ['TPFB-1.1.1'], type: 'gapfill',
  q: 'Complete it.', template: 'The rate is {0}.', gaps: [{ options: ['20%', '5%'], answer: 0 }],
  exp: 'Twenty.' };

function openWith(qs) {
  const M = D.loadUI(D.fakeStore());
  M.AAT3_PRACTICE = { QUESTIONS: qs };
  M.AAT3_FAPS_PRACTICE = { QUESTIONS: [] };
  const el = D.fakeEl();
  M.AAT3_UI.reset('practice', 'tpfb');
  M.AAT3_UI.mount(el);
  D.click(el, 'startpractice', n => n.getAttribute('data-lo') === 'mix');
  return el;
}
/* THE PAD IS BEHIND A BUTTON NOW. It is fixed to the bottom of the viewport and
   closed until asked for, so everything that presses a key opens it first. */
function openCalc(el) {
  if (!D.nodes(el, 'calckey').length) D.click(el, 'calctoggle');
  return el;
}

/* Type a sequence on the rendered pad. */
function tap(el, seq) {
  openCalc(el);
  seq.forEach(s => {
    const want = /^\d$/.test(s) ? n => n.getAttribute('data-k') === 'num' && n.getAttribute('data-v') === s
      : '+-*/'.indexOf(s) !== -1 ? n => n.getAttribute('data-k') === 'op' && n.getAttribute('data-v') === s
      : s === '=' ? n => n.getAttribute('data-k') === 'eq'
      : s === '.' ? n => n.getAttribute('data-k') === 'dot'
      : n => n.getAttribute('data-k') === s;
    D.click(el, 'calckey', want);
  });
}

const restore = D.seedRandom(20260830);

/* ── 3. Where it is offered ───────────────────────────────────────────────── */
console.log(`${DIM}where it is offered${RESET}`);

{
  const el = openWith([NUMERIC]);
  ok(D.nodes(el, 'calctoggle').length === 1, 'a numeric question offers a button to open the calculator');
  /* CLOSED UNTIL ASKED FOR. A sheet that opens over the question on arrival has
     taken the screen away before the reader wanted it. */
  ok(D.nodes(el, 'calckey').length === 0, 'and the pad is closed until it is opened');
  ok(D.nodes(el, 'calcuse').length === 0, 'so there is nothing to press yet');
  D.click(el, 'calctoggle');
  ok(D.nodes(el, 'calckey').length === KEYS.length,
    `opening it renders all ${KEYS.length} keys (found ${D.nodes(el, 'calckey').length})`);
  ok(D.nodes(el, 'calcuse').length === 1, 'and a "Use this value" button');
  ok(/id="a3CalcDisplay"/.test(el.innerHTML), 'and a display');
  ok(/class="a3-calcsheet"/.test(el.innerHTML), 'as a floating sheet rather than a block in the flow');
  D.click(el, 'calctoggle');
  ok(D.nodes(el, 'calckey').length === 0, 'and pressing the button again puts it away');
}

/* A multi-part task, which is the shape with several boxes to fill. */
const CONTENT = require('./lib/aat3-content.js');
const { questions } = CONTENT.load();
const someTask = questions.find(q => q.type === 'task');
ok(!!someTask, 'the module has a task to test against');
if (someTask) {
  const el = openCalc(openWith([Object.assign({}, someTask, { unitKey: 'tpfb', lo: someTask.lo || 1 })]));
  ok(D.nodes(el, 'calckey').length === KEYS.length, 'a multi-part task offers the calculator');
}

/* The "now you try" on a worked example — a lesson card, not a question. */
{
  const M = D.loadUI(D.fakeStore());
  const lesson = { id: 'calc-try', title: 'Try', icon: '·',
    cards: [{ t: 'Card', worked: { title: 'W', steps: [{ t: 'step', d: 'do it' }],
      tryIt: { q: 'What is it?', answer: 5, unit: '£', exp: 'five' } } }],
    check: [MCQ] };
  M.AAT3_LEARN_PATH = [{ unit: 'tpfb', outcome: 1, title: 'O', lessons: [lesson] }];
  M.AAT3_FAPS_PATH = [];
  const el = D.fakeEl();
  M.AAT3_UI.reset('path', 'tpfb');
  M.AAT3_UI.mount(el);
  D.click(el, 'open', n => n.getAttribute('data-id') === 'calc-try');
  /* The try-it only appears once every worked step is revealed. */
  D.click(el, 'stepall');
  ok(D.nodes(el, 'tryinput').length === 1, 'the worked example shows its try-it box');
  ok(D.nodes(el, 'calctoggle').length === 1, 'and offers the calculator beside it');
  openCalc(el);
  ok(D.nodes(el, 'calckey').length === KEYS.length, 'which opens the same pad');
  tap(el, ['2', '+', '3', '=']);
  D.click(el, 'calcuse');
  const box = D.nodes(el, 'tryinput')[0];
  ok(box && box.attrs.value === '5', `"Use this value" fills the try-it box (got ${box && box.attrs.value})`);
  D.click(el, 'trycheck');
  ok(/a3-try-verdict is-right/.test(el.innerHTML), 'and the try-it grades it correct');
}

/* ── 4. And where it is not ───────────────────────────────────────────────── */
console.log(`${DIM}and where it is not${RESET}`);

[['multiple choice', MCQ], ['true or false', TF], ['gap-fill', GAP]].forEach(([label, q]) => {
  const el = openWith([q]);
  ok(D.nodes(el, 'calctoggle').length === 0, `a ${label} question does not offer a calculator at all`);
});

/* A NUMERIC QUESTION THAT ASKS THE READER TO REMEMBER, not to work anything
   out. "For how many months must an annual filer submit on time to reset its
   points?" has an answer box and one right answer, 24, and nothing to
   calculate. A keypad there is worse than useless — it tells the reader a sum
   is expected. Driven through the real player against the real bank, so the
   assertion is about the questions that actually ship rather than a fixture. */
{
  const recalls = questions.filter(q => q.recall);
  ok(recalls.length > 0, 'the module marks at least one numeric question as recall');
  recalls.forEach(q => {
    ok((q.type || 'mcq') === 'numeric', `${q.id}: only a numeric question needs the recall flag`);
    const el = openWith([Object.assign({}, q, { unitKey: 'tpfb', lo: q.lo || 1 })]);
    ok(D.nodes(el, 'numinput').length === 1, `${q.id}: still asks for a typed answer`);
    ok(D.nodes(el, 'calctoggle').length === 0, `${q.id}: a recall question offers no calculator`);
    ok(D.nodes(el, 'calcuse').length === 0, `${q.id}: and no "Use this value"`);
  });
  /* The flag must be doing work, not sitting on everything: a computational
     numeric question still gets its pad. Without this the whole feature could
     be switched off by marking the bank and nothing here would notice. */
  const el = openCalc(openWith([NUMERIC]));
  ok(D.nodes(el, 'calckey').length === KEYS.length,
    'a numeric question that must be worked out still gets the keypad');
}

/* Once graded there is nothing left to compute, and the explanation needs the
   room. This is the assertion that catches a panel left on screen under the
   verdict. */
{
  const el = openCalc(openWith([NUMERIC]));
  ok(D.nodes(el, 'calckey').length > 0, 'the pad is there before the answer is checked');
  const box = D.nodes(el, 'numinput')[0];
  box.value = '240'; box.fire('input');
  D.click(el, 'numsubmit');
  ok(/a3-try-verdict/.test(el.innerHTML), 'the numeric question grades');
  ok(D.nodes(el, 'calckey').length === 0, 'and the pad goes once it is graded');
  ok(D.nodes(el, 'calctoggle').length === 0, 'along with the button that opens it');
}

/* ── 5. The value reaches grading, not just the box ───────────────────────── */
console.log(`${DIM}the value reaches grading${RESET}`);

{
  const el = openWith([NUMERIC]);
  tap(el, ['1', '2', '0', '0', '/', '5', '=']);
  D.click(el, 'calcuse');
  const box = D.nodes(el, 'numinput')[0];
  ok(box && box.attrs.value === '240', `the computed £240 lands in the answer box (got ${box && box.attrs.value})`);
  /* Submitting WITHOUT touching the box. If "Use this value" only wrote to the
     element and not to state, this grades as unanswered — which is the exact
     shape of a calculator that looks like it works. */
  D.click(el, 'numsubmit');
  ok(/a3-try-verdict is-right/.test(el.innerHTML),
    'and submitting straight afterwards grades it correct');
}

/* An error is not a figure, and must not be handed to the answer box. */
{
  const el = openWith([NUMERIC]);
  tap(el, ['5', '/', '0', '=']);
  D.click(el, 'calcuse');
  const box = D.nodes(el, 'numinput')[0];
  ok(box && box.attrs.value === '', `"Error" is not offered as an answer (got "${box && box.attrs.value}")`);
}

/* On a task the figure goes to the box the reader was last in, not to the
   first box on the screen. */
if (someTask) {
  const q = Object.assign({}, someTask, { unitKey: 'tpfb', lo: someTask.lo || 1 });
  const typed = q.parts.map((p, i) => (p.type === 'choice' ? -1 : i)).filter(i => i >= 0);
  if (typed.length > 1) {
    const el = openWith([q]);
    const second = D.nodes(el, 'taskinput').find(n => n.getAttribute('data-p') === String(typed[1]));
    second.value = '1'; second.fire('input');          // the reader is in box two
    tap(el, ['9', '9']);
    D.click(el, 'calcuse');
    const after = D.nodes(el, 'taskinput');
    const box2 = after.find(n => n.getAttribute('data-p') === String(typed[1]));
    const box1 = after.find(n => n.getAttribute('data-p') === String(typed[0]));
    ok(box2 && box2.attrs.value === '99', `the figure goes to the box last typed in (got ${box2 && box2.attrs.value})`);
    ok(box1 && box1.attrs.value === '', 'and not to the first box on the screen');
  }
  /* Untouched, it goes to the first box still empty. */
  const el2 = openWith([q]);
  tap(el2, ['7', '7']);
  D.click(el2, 'calcuse');
  const first = D.nodes(el2, 'taskinput').find(n => n.getAttribute('data-p') === String(typed[0]));
  ok(first && first.attrs.value === '77', 'untouched, it fills the first empty box');
}

/* ── 6. The display resets between questions, memory does not ─────────────── */
console.log(`${DIM}between questions${RESET}`);

{
  const el = openWith([NUMERIC, Object.assign({}, NUMERIC, { id: 'C-N2' })]);
  tap(el, ['8', '8']);
  const box = D.nodes(el, 'numinput')[0];
  box.value = '240'; box.fire('input');
  D.click(el, 'numsubmit');
  D.click(el, 'nextq');
  /* A figure carried over from the last question is how a wrong answer gets
     typed, so the display must be back to zero. Read through "Use this value",
     because the pad does not repaint on a keypress and the markup would lie. */
  D.click(el, 'calcuse');
  const box2 = D.nodes(el, 'numinput')[0];
  ok(box2 && box2.attrs.value === '0', `the display clears for the next question (got ${box2 && box2.attrs.value})`);
}

/* Clearing the display between questions must not clear MEMORY. There is no
   memory key on the pad any more, so this is not something a reader can reach
   today — it is asserted at the engine, because reset() forgetting memory is
   the kind of thing that would be discovered by putting the key back and
   finding it useless. */
{
  const C = AATCalc.create();
  C.press('num', '8'); C.press('num', '8'); C.press('madd');
  C.reset();
  ok(C.memory === 88, `reset() clears the display without forgetting memory (got ${C.memory})`);
  ok(C.display === '0', 'and the display is back to zero');
}

/* ── 7. A keypress does not throw away what the reader typed ──────────────── */
console.log(`${DIM}the typed answer survives${RESET}`);

{
  /* OPENED FIRST, then the box is taken. Opening the sheet is a repaint of its
     own and legitimately rebuilds the inputs; what must not rebuild them is a
     KEYPRESS, which is what this is about. */
  const el = openCalc(openWith([NUMERIC]));
  const box = D.nodes(el, 'numinput')[0];
  box.value = '19'; box.fire('input');
  tap(el, ['4', '+', '4', '=']);
  /* THE ELEMENT ITSELF MUST SURVIVE, not merely its value. A repaint would
     rebuild the box from state, so "the answer is still 19" passes either way
     — which is what the first version of this asserted, and a mutation making
     every keypress call rerender() sailed through it. The cost of the repaint
     is the caret, which no assertion about the value can see; the driver
     memoises its parsed nodes per repaint, so identity is exactly the signal.
     On a phone this is the difference between typing a figure and retyping it
     after every glance at the pad. */
  ok(D.nodes(el, 'numinput')[0] === box, 'a keypress does not rebuild the answer box');
  D.click(el, 'numsubmit');
  ok(/a3-try-verdict is-wrong/.test(el.innerHTML),
    'and a half-typed answer is still the answer afterwards');
}

/* Collapsing the pad puts it away without disturbing the answer. */
{
  const el = openWith([NUMERIC]);
  const box = D.nodes(el, 'numinput')[0];
  box.value = '240'; box.fire('input');
  openCalc(el);
  D.click(el, 'calctoggle');
  ok(D.nodes(el, 'calckey').length === 0, 'the button folds the sheet away');
  ok(D.nodes(el, 'calctoggle').length === 1, 'and stays to bring it back');
  D.click(el, 'calctoggle');
  ok(D.nodes(el, 'calckey').length === KEYS.length, 'which it does');
  D.click(el, 'numsubmit');
  ok(/a3-try-verdict is-right/.test(el.innerHTML), 'and the typed answer survived both');
}

restore();

/* ── 7b. Level 1, through the real player ─────────────────────────────────── */
console.log(`${DIM}Level 1${RESET}`);

/* A SEPARATE DRIVER, because a separate player. Level 1 renders itself from
   aat1-ui.js with its own state, its own `data-a1` namespace and two question
   types Level 3 does not have. Asserting the pad against Level 3 and grepping
   Level 1's source for a class name would be exactly the check that passes
   while the button lands somewhere unusable. */
const D1 = require('./lib/aat1-driver.js');

const L1_NUMERIC = { id: 'L1-N', lo: 3, criteria: ['BKFN-3.1'], type: 'numeric',
  q: 'A customer buys 12 units at £4.00 each. What is the net amount, in pounds?',
  answer: 48, unit: '£', exp: 'Twelve at four pounds is £48.00.' };
const L1_MCQ = { id: 'L1-M', lo: 3, criteria: ['BKFN-3.1'], type: 'mcq',
  q: 'Which book records credit sales?', opts: ['Sales day book', 'Cash book', 'Petty cash', 'Journal'],
  ans: 0, exp: 'The sales day book.' };
const L1_TF = { id: 'L1-T', lo: 3, criteria: ['BKFN-3.1'], type: 'truefalse',
  q: 'True or false?', statements: [{ text: 'A', answer: true }, { text: 'B', answer: false }],
  exp: 'As stated.' };

function l1Open(qs) {
  const M = D1.loadUI(D1.fakeStore());
  M.AAT1_PRACTICE = { QUESTIONS: qs };
  const el = D1.fakeEl();
  M.AAT1_UI.reset('practice');
  M.AAT1_UI.mount(el);
  D1.click(el, 'startpractice', n => n.getAttribute('data-lo') === 'mix');
  return el;
}
function l1OpenCalc(el) {
  if (!D1.nodes(el, 'calckey').length) D1.click(el, 'calctoggle');
  return el;
}
function l1Tap(el, seq) {
  l1OpenCalc(el);
  seq.forEach(x => {
    const want = /^\d$/.test(x) ? n => n.getAttribute('data-k') === 'num' && n.getAttribute('data-v') === x
      : '+-*/'.indexOf(x) !== -1 ? n => n.getAttribute('data-k') === 'op' && n.getAttribute('data-v') === x
      : x === '=' ? n => n.getAttribute('data-k') === 'eq'
      : x === '.' ? n => n.getAttribute('data-k') === 'dot'
      : n => n.getAttribute('data-k') === x;
    D1.click(el, 'calckey', want);
  });
}

{
  const el = l1Open([L1_NUMERIC]);
  ok(D1.nodes(el, 'calctoggle').length === 1, 'a Level 1 numeric question offers the calculator');
  ok(D1.nodes(el, 'calckey').length === 0, 'and it is closed until it is asked for');
  D1.click(el, 'calctoggle');
  ok(D1.nodes(el, 'calckey').length === KEYS.length,
    `opening it renders all ${KEYS.length} keys (found ${D1.nodes(el, 'calckey').length})`);
  ok(D1.nodes(el, 'calcuse').length === 1, 'and a "Use this value" button');
  ok(/id="a1CalcDisplay"/.test(el.innerHTML), 'and a display of its own, not Level 3’s');
  ok(/class="a1-calcsheet"/.test(el.innerHTML), 'as a floating sheet rather than a block in the flow');
  D1.click(el, 'calctoggle');
  ok(D1.nodes(el, 'calckey').length === 0, 'and pressing the button again puts it away');
}

/* THE BUTTON IS OUTSIDE `.a1-root`. `.a1-root.is-fresh` carries an entrance
   animation with `fill-mode: both`, which retains the final keyframe's
   transform — and any transformed ancestor, an identity matrix included,
   becomes the containing block for `position: fixed`. Rendered inside the
   root, the button anchors to the card instead of the viewport and lands
   wherever the card happens to be. That is not a hypothetical: it is the bug
   Level 3 shipped, reported from a screenshot with the button stranded mid-page.

   Asserted on the FIRST PAINT, before anything opens the sheet. All 179 checks
   in this file missed that bug because every one of them opened the calculator
   first, and opening it is a repaint that happened to land the button correctly. */
{
  const el = l1Open([L1_NUMERIC]);
  const html = el.innerHTML;
  const rootAt = html.indexOf('<div class="a1-root');
  const fabAt = html.indexOf('a1-calcfab');
  ok(rootAt !== -1 && fabAt !== -1, 'the first paint has both a root and a calculator button');
  ok(fabAt > html.lastIndexOf('</div>', fabAt),
    'the calculator button is not nested inside the animated root');
  /* The structural form of the same thing: everything `.a1-root` opens is
     closed before the button is written. */
  const beforeFab = html.slice(0, fabAt);
  const opens = (beforeFab.match(/<div\b/g) || []).length + (beforeFab.match(/<article\b/g) || []).length;
  const closes = (beforeFab.match(/<\/div>/g) || []).length + (beforeFab.match(/<\/article>/g) || []).length;
  ok(opens === closes,
    `every element opened before the button is closed before it (${opens} opened, ${closes} closed)`);
}

/* Where it is NOT offered. */
[['multiple choice', L1_MCQ], ['true or false', L1_TF]].forEach(([label, q]) => {
  const el = l1Open([q]);
  ok(D1.nodes(el, 'calctoggle').length === 0, `a Level 1 ${label} question offers no calculator`);
});
{
  const el = l1Open([L1_NUMERIC]);
  l1Tap(el, ['4', '8', '=']);
  D1.click(el, 'calcuse');
  D1.click(el, 'numsubmit');
  ok(D1.nodes(el, 'calctoggle').length === 0, 'and once the answer is graded the calculator goes away');
}

/* THE ID IN THE MARKUP AND THE ID THE ENGINE PAINTS TO MUST BE THE SAME ONE.
   They are written in two different places — `create({displayId})` and the
   `id="..."` attribute — and nothing but this ties them together. Point the
   engine at Level 3's display and every other assertion in this section still
   passes: "Use this value" reads `C.display` from the object, not from the
   screen, so the figure still reaches the box while the reader watches a
   display that never moves.

   So the lookup is resolved against the RENDERED MARKUP, the way a browser
   resolves it: an id that is not on the page cannot be found. */
function l1PaintedDisplay(el, seq) {
  l1OpenCalc(el);                       /* opening repaints; do it outside the stub */
  const painted = Object.create(null);
  const realDoc = global.document;
  global.document = {
    getElementById(id) {
      if (el.innerHTML.indexOf('id="' + id + '"') === -1) return null;
      return painted[id] || (painted[id] = { textContent: '', classList: { toggle() {} } });
    },
  };
  try { l1Tap(el, seq); } finally {
    if (realDoc === undefined) delete global.document; else global.document = realDoc;
  }
  return painted;
}
{
  const painted = l1PaintedDisplay(l1Open([L1_NUMERIC]), ['1', '2', '*', '4', '=']);
  const disp = painted.a1CalcDisplay;
  ok(!!disp, 'keypresses paint the display element Level 1 actually renders');
  ok(disp && disp.textContent === '48',
    `and it shows the running figure (got ${disp && JSON.stringify(disp.textContent)})`);
}

/* The figure must reach GRADING, not merely the box. */
{
  const el = l1Open([L1_NUMERIC]);
  l1Tap(el, ['1', '2', '*', '4', '=']);
  D1.click(el, 'calcuse');
  const box = D1.nodes(el, 'numinput')[0];
  ok(box && box.attrs.value === '48', `"Use this value" fills the answer box (got ${box && box.attrs.value})`);
  ok(D1.nodes(el, 'calckey').length === 0, 'and closes the sheet it had covered the box with');
  D1.click(el, 'numsubmit');
  ok(/is-right/.test(el.innerHTML), 'and the answer it put there grades as correct');
}

/* A keypress must not rebuild the answer box: on a phone that is the difference
   between typing a figure and retyping it after every glance at the pad. */
{
  const el = l1OpenCalc(l1Open([L1_NUMERIC]));
  const box = D1.nodes(el, 'numinput')[0];
  box.value = '19'; box.fire('input');
  l1Tap(el, ['4', '+', '4', '=']);
  ok(D1.nodes(el, 'numinput')[0] === box, 'a keypress does not rebuild the Level 1 answer box');
  D1.click(el, 'numsubmit');
  ok(/is-wrong/.test(el.innerHTML), 'and what the reader typed is what gets graded');
}

/* The display clears between questions: a figure carried over is how a wrong
   answer gets typed. Read through "Use this value", because the pad does not
   repaint on a keypress and the markup would lie. */
{
  const el = l1Open([L1_NUMERIC, Object.assign({}, L1_NUMERIC, { id: 'L1-N2' })]);
  l1Tap(el, ['4', '8', '=']);
  D1.click(el, 'calcuse');
  D1.click(el, 'numsubmit');
  D1.click(el, 'nextq');
  D1.click(el, 'calctoggle');
  D1.click(el, 'calcuse');
  const box = D1.nodes(el, 'numinput')[0];
  ok(box && box.attrs.value === '0',
    `the Level 1 display clears for the next question (got ${box && box.attrs.value})`);
}

/* The worked example's "Now you try" — a lesson card, not a question, holding
   its answer in a different piece of state. */
{
  const M = D1.loadUI(D1.fakeStore());
  const lesson = { id: 'l1-calc-try', title: 'Try', icon: '·',
    cards: [{ t: 'Card', worked: { title: 'W', steps: [{ t: 'step', d: 'do it' }],
      tryIt: { q: 'What is it?', answer: 5, unit: '£', exp: 'five' } } }],
    check: [L1_MCQ] };
  M.AAT1_LEARN_PATH = [{ outcome: 3, title: 'O', lessons: [lesson] }];
  const el = D1.fakeEl();
  M.AAT1_UI.reset('path');
  M.AAT1_UI.mount(el);
  D1.click(el, 'open', n => n.getAttribute('data-id') === 'l1-calc-try');
  D1.click(el, 'stepall');
  ok(D1.nodes(el, 'tryinput').length === 1, 'the Level 1 worked example shows its try-it box');
  ok(D1.nodes(el, 'calctoggle').length === 1, 'and offers the calculator beside it');
  l1Tap(el, ['2', '+', '3', '=']);
  D1.click(el, 'calcuse');
  const box = D1.nodes(el, 'tryinput')[0];
  ok(box && box.attrs.value === '5', `"Use this value" fills the try-it box (got ${box && box.attrs.value})`);
  D1.click(el, 'trycheck');
  ok(/is-right/.test(el.innerHTML), 'and the try-it grades it correct');
  ok(D1.nodes(el, 'calctoggle').length === 0, 'and the calculator goes away once it is graded');
}

/* SCOPE ASSERTED. Every numeric question in the real bank must be one the pad
   is offered on — the module has no recall questions today, and a new one added
   without the flag would get a keypad with nothing to work out. Counting them
   here is what makes that visible rather than a matter of authoring memory. */
{
  const BANK = require(path.join(ROOT, 'aat1-practice-data.js')).AAT1_PRACTICE.QUESTIONS;
  const numeric = BANK.filter(q => (q.type || 'mcq') === 'numeric');
  ok(numeric.length >= 30, `the Level 1 bank has ${numeric.length} numeric questions to offer it on`);
  const noFigure = numeric.filter(q => !/\d/.test(q.q || '') && !q.recall);
  ok(noFigure.length === 0,
    noFigure.length
      ? `${noFigure.map(q => q.id).join(', ')}: numeric with no figure in the stem — mark \`recall: true\` or it gets a keypad with nothing to work out`
      : 'and every one of them carries a figure to work from');
}

/* ── 7c. Entry grids get the pad; pick lists do not ───────────────────────── */
console.log(`${DIM}entry grids${RESET}`);

/* WHY THE DISTINCTION. A day book column is VAT at 20% of a net figure and a
   gross total beside it — arithmetic, several times over, and exactly what the
   pad is for. A pick list asks which book or which side, and there is nothing
   in it to compute; a keypad over it is a keypad with nothing to work out.

   AND WHY IT IS DRIVEN RATHER THAN GREPPED. "Use this value" writes into
   STATE, and the grid is repainted from it. An implementation that set the
   input element instead would look right on screen and grade as blank, which
   is the failure this fills a cell from the pad and then submits to rule out. */
function gridQ(px) {
  const base = px === 'a1' ? { lo: 3, criteria: ['BKFN-3.1'] }
    : { unitKey: 'tpfb', lo: 1, criteria: ['TPFB-1.1.1'] };
  return {
    eg: Object.assign({ id: 'C-EG', type: 'entrygrid',
      q: 'Two invoices, £400.00 and £250.00 net, VAT at 20%. Complete the day book.',
      entrygrid: { rowHeader: 'Invoice', columns: ['Net £', 'VAT £'], rows: [
        { label: 'Invoice 101', cells: { 0: 400, 1: 80 } },
        { label: 'Invoice 102', cells: { 0: 250, 1: 50 } },
      ] },
      exp: 'VAT is 20% of the net: £80.00 and £50.00.' }, base),
    pl: Object.assign({ id: 'C-PL', type: 'picklist',
      q: 'Which book of prime entry records each document?',
      picklist: { options: ['Sales day book', 'Cash book'], rows: [
        { text: 'A sales invoice raised on credit', answer: 0 },
        { text: 'A cheque received from a customer', answer: 1 },
      ] },
      exp: 'Invoices go to the day book; money received goes to the cash book.' }, base),
  };
}

[['Level 1', D1, l1Open, l1Tap, 'a1-verdict'],
 ['Level 3', D, openWith, tap, 'a3-try-verdict']].forEach(([name, Drv, open, type, verdict]) => {
  const Q = gridQ(name === 'Level 1' ? 'a1' : 'a3');

  ok(Drv.nodes(open([Q.pl]), 'calctoggle').length === 0,
    `a ${name} pick list offers no calculator`);

  const el = open([Q.eg]);
  ok(Drv.nodes(el, 'calctoggle').length === 1, `a ${name} entry grid offers the calculator`);

  /* The figure goes to the cell the reader was last in. */
  const second = Drv.nodes(el, 'egcell').find(n => n.getAttribute('data-c') === '0:1');
  second.fire('focus');
  type(el, ['4', '0', '0', '*', '0', '.', '2', '=']);
  Drv.click(el, 'calcuse');
  let cells = Drv.nodes(el, 'egcell');
  const at01 = cells.find(n => n.getAttribute('data-c') === '0:1');
  const at00 = cells.find(n => n.getAttribute('data-c') === '0:0');
  ok(at01 && at01.attrs.value === '80',
    `${name}: the figure lands in the cell last touched (got ${at01 && at01.attrs.value})`);
  ok(at00 && at00.attrs.value === '', 'and not in the first cell on the grid');

  /* AND THE GRADING SEES IT. Everything else typed by hand, one cell filled
     from the pad, and the row marked right is the only proof that the figure
     went into the state the marker reads rather than onto the element. */
  [['0:0', '400'], ['1:0', '250'], ['1:1', '50']].forEach(([k, v]) => {
    const n = Drv.nodes(el, 'egcell').find(x => x.getAttribute('data-c') === k);
    n.value = v; n.fire('input');
  });
  Drv.click(el, 'egsubmit');
  ok(new RegExp(verdict + ' is-right').test(el.innerHTML),
    `${name}: and the marker reads the cell the pad filled`);

  /* Untouched, it fills the first cell — where someone starting the grid is. */
  const el2 = open([Q.eg]);
  type(el2, ['7', '7']);
  Drv.click(el2, 'calcuse');
  const first = Drv.nodes(el2, 'egcell').find(n => n.getAttribute('data-c') === '0:0');
  ok(first && first.attrs.value === '77',
    `${name}: untouched, it fills the first cell (got ${first && first.attrs.value})`);
});

/* ── 8. Level 2 is unharmed ───────────────────────────────────────────────── */

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.webmanifest': 'application/manifest+json',
  '.png': 'image/png', '.svg': 'image/svg+xml' };
function serve() {
  return new Promise(resolve => {
    const server = http.createServer((req, res) => {
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

const L2 = require('./lib/aat2-page.js');

let chromium = null;
try { ({ chromium } = require('playwright')); } catch (e) { /* handled below */ }

function finish() {
  console.log();
  if (failures) { console.log(`${RED}${BOLD}✗ ${failures} of ${checks} checks failed${RESET}`); process.exit(1); }
  console.log(`${GREEN}${BOLD}✓ ${checks} checks passed${RESET}`);
}

(async () => {
  if (!chromium) {
    if (process.env.REQUIRE_PLAYWRIGHT) {
      console.log(`\n  ${RED}✗${RESET}  Playwright is required here and is not installed.`);
      process.exit(1);
    }
    console.log(`\n  ${YEL}⚠${RESET}  Playwright is not installed — skipping the browser checks.`);
    finish();
    return;
  }
  console.log(`${DIM}in the browser${RESET}`);
  const { server, port } = await serve();
  const base = `http://127.0.0.1:${port}/`;
  const CANDIDATES = [
    '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell',
    '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  ].filter(p => fs.existsSync(p));
  const browser = await chromium.launch(CANDIDATES.length ? { executablePath: CANDIDATES[0] } : {});
  try {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    const errs = [];
    page.on('pageerror', e => errs.push('uncaught: ' + e.message));
    await page.addInitScript(() => localStorage.setItem('multisubject_active', 'aat'));
    await page.goto(base, { waitUntil: 'load' });
    await page.waitForFunction(() => {
      const a = document.getElementById('app');
      return a && a.textContent.trim().length > 40;
    }, { timeout: 15000 }).catch(() => {});

    /* The extraction moved Level 2's engine into another file. If the page
       cannot find it, app.js throws on load and nothing renders at all. */
    ok(errs.length === 0, `the page loads without an uncaught error${errs.length ? ': ' + errs[0] : ''}`);
    ok(await page.evaluate(() => typeof window.AATCalc === 'object' && typeof window.AATCalc.create === 'function'),
      'the shared calculator is on the page');

    /* Level 3's pad, in a real browser: the display must actually move when a
       key is pressed. In Node it cannot — _refresh() needs a document — so
       this is the only place the wiring from key to display is visible. */
    await page.evaluate(() => {
      document.body.dataset.subject = 'aat3';
    });
    const shown = await page.evaluate(async (q) => {
      /* Drive the real Level 3 module, mounted into a scratch host, so the
         markup and the handlers under test are the shipped ones.

         THE BANK IS REPLACED WITH ONE KNOWN NUMERIC QUESTION rather than
         walked until a numeric one turns up. The first version answered its
         way through a real run looking for one; that passed on its own and
         failed inside the full suite, because which types a run draws is a
         fresh shuffle every time. A gate that depends on the draw is a gate
         that reports the weather. */
      const need = ['calculator.js', 'aat3-syllabus.js', 'aat3-tax-data.js', 'aat3-learn-data.js',
        'aat3-practice-data.js', 'aat3-faps-data.js', 'aat3-mats-data.js', 'aat3-ui.js'];
      for (const src of need) {
        if (document.querySelector(`script[src="${src}"]`)) continue;
        await new Promise((res, rej) => {
          const s = document.createElement('script');
          s.src = src; s.async = false; s.onload = res; s.onerror = rej;
          document.head.appendChild(s);
        });
      }
      /* The stylesheet too: it loads lazily with the subject's assets now, and
         the position assertions below measure a FIXED element — unstyled, the
         FAB sits in the flow and the numbers mean nothing. */
      if (!document.querySelector('link[href="aat3-styles.css"]')) {
        await new Promise((res, rej) => {
          const l = document.createElement('link');
          l.rel = 'stylesheet'; l.href = 'aat3-styles.css'; l.onload = res; l.onerror = rej;
          document.head.appendChild(l);
        });
      }
      window.AAT3_PRACTICE = { QUESTIONS: [q] };
      window.AAT3_FAPS_PRACTICE = { QUESTIONS: [] };
      const host = document.createElement('div');
      document.body.appendChild(host);
      window.AAT3_UI.reset('practice', 'tpfb');
      window.AAT3_UI.mount(host);
      const start = host.querySelector('[data-a3="startpractice"][data-lo="mix"]');
      if (!start) return { err: 'no practice run to start' };
      start.click();
      const fab = host.querySelector('[data-a3="calctoggle"]');
      if (!fab) return { err: 'the numeric question offered no calculator button' };
      /* WHERE IS IT, ON THE FIRST PAINT OF THE QUESTION.

         A fixed element is positioned against the viewport only while no
         ancestor carries a transform; an ancestor that does becomes the
         containing block instead. Both entrance animations in this app end on
         a transform and run with fill-mode: both, so a button rendered inside
         the question card was pinned to the CARD's corner — over the Check
         button, halfway up the screen — until something repainted without the
         animation.

         Measured HERE, before anything is clicked, because that is the only
         moment the defect exists: the gate used to open the calculator first
         and so only ever saw the corrected position. */
      const fr = fab.getBoundingClientRect();
      const firstPaint = {
        right: Math.round(window.innerWidth - fr.right),
        bottom: Math.round(window.innerHeight - fr.bottom),
      };
      /* THE PAGE MUST NOT MOVE WHEN IT OPENS. That is the entire reason the
         calculator was lifted out of the flow: a reader working from a table of
         figures at the top of the question cannot have the page jump when they
         reach for the keypad. Measured across the open, in a page scrolled away
         from the top so there is something to lose. */
      document.documentElement.style.minHeight = '250vh';
      window.scrollTo(0, 400);
      const scrollBefore = window.scrollY;
      fab.click();
      const scrollAfter = window.scrollY;
      if (!host.querySelector('[data-a3="calckey"]')) return { err: 'opening it rendered no keypad' };
      const key = v => host.querySelector(`[data-a3="calckey"][data-k="num"][data-v="${v}"]`);
      const box = host.querySelector('[data-a3="numinput"]');
      box.value = '7';                       // something the reader typed
      key('4').click(); key('2').click();
      const display = document.getElementById('a3CalcDisplay');
      /* READ BEFORE "Use this value" IS CLICKED. That click repaints on
         purpose, so measuring identity after it would report a rebuild that
         the keypress did not cause — which is what the first version did, and
         it failed honestly. Identity, with no `|| box.value === '7'` escape
         hatch: a detached node keeps its value, so the disjunction could not
         fail either way. */
      const boxKept = host.querySelector('[data-a3="numinput"]') === box;
      /* Read while it is still open: the click below closes it on purpose. */
      const sheet = !!host.querySelector('.a3-calcsheet');
      /* Now the whole point of it: the figure has to reach the answer. */
      host.querySelector('[data-a3="calcuse"]').click();
      const after = host.querySelector('[data-a3="numinput"]');
      return {
        display: display && display.textContent,
        boxKept: boxKept,
        used: after && after.value,
        scrollBefore: scrollBefore,
        scrollAfter: scrollAfter,
        sheet: sheet,
        closedAfterUse: !host.querySelector('.a3-calcsheet'),
        firstPaint: firstPaint,
      };
    }, NUMERIC);
    ok(!shown.err, `Level 3's pad is reachable in the browser${shown.err ? ': ' + shown.err : ''}`);
    ok(shown.display === '42', `pressing 4 then 2 shows 42 on the display (got ${shown.display})`);
    ok(shown.boxKept === true, 'and the answer box is neither rebuilt nor emptied by the keypress');
    ok(shown.used === '42', `"Use this value" puts it in the answer box (got ${shown.used})`);
    ok(shown.scrollBefore === shown.scrollAfter,
      `opening the calculator leaves the page exactly where it was ` +
      `(${shown.scrollBefore} → ${shown.scrollAfter})`);
    ok(shown.scrollBefore > 0, 'and the page was genuinely scrolled away from the top when measured');
    ok(shown.firstPaint && shown.firstPaint.right >= 0 && shown.firstPaint.right <= 40,
      `on first paint the button sits against the right edge (${shown.firstPaint && shown.firstPaint.right}px in)`);
    ok(shown.firstPaint && shown.firstPaint.bottom >= 0 && shown.firstPaint.bottom <= 40,
      `and against the bottom edge, not the card's corner (${shown.firstPaint && shown.firstPaint.bottom}px up)`);
    ok(shown.sheet === true, 'the pad opens as a floating sheet, not as a block in the flow');
    /* The figure has gone into a box the sheet was covering, so the sheet gets
       out of the way rather than making the reader dismiss it to check. */
    ok(shown.closedAfterUse === true, 'and "Use this value" puts it away again');
    await ctx.close();

    /* Level 2's own pad, rendered from the same KEYS. Asserted here rather than
       by grepping app.js, because a source grep is satisfied by a comment that
       merely mentions AATCalc.KEYS — which is how gutting renderCalculatorSidebar
       to `[].map` first went unnoticed. */
    const ctx2 = await browser.newContext();
    const p2 = await ctx2.newPage();
    const errs2 = [];
    p2.on('pageerror', e => errs2.push('uncaught: ' + e.message));
    await p2.addInitScript(() => localStorage.setItem('multisubject_active', 'aat'));
    /* Seeded, so which question types the run serves is the same every time. A
       walk that depends on the draw is a gate that reports the weather. */
    await p2.addInitScript(() => {
      let s = 20260830 >>> 0;
      Math.random = () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648; };
    });
    await p2.goto(base, { waitUntil: 'load' });
    await p2.waitForFunction(() => {
      const a = document.getElementById('app');
      return a && a.textContent.trim().length > 40;
    }, { timeout: 15000 }).catch(() => {});
    await L2.tap(p2, '#startBtn');
    await L2.tap(p2, '[data-tab="home"]');
    await L2.tap(p2, '#endlessBtn');
    await p2.waitForSelector('.quiz-container', { timeout: 10000 }).catch(() => {});
    /* Endless serves every type, so a numeric one turns up quickly. Bounded,
       and the bound is a FAILURE rather than a silent skip — a sweep that
       cannot answer a type does not announce it, it reports the thing being
       measured as absent, which is why the answering lives in lib/aat2-page.js
       and not in a guessed list of submit ids here. */
    let sidebar = 0, walked = 0, orphans = 0, seen = 0;
    for (; walked < 40; walked++) {
      const state = await p2.evaluate(() => ({
        calc: document.querySelectorAll('.calc-sidebar').length,
        boxes: document.querySelectorAll('#numericAnswer, [data-tf-blank], [data-sc-part]').length,
      }));
      /* A KEYPAD WITH NOTHING TO TYPE INTO is the defect this walk found: a
         scenario question whose parts are all multiple choice rendered a full
         calculator and a "Use this value" button on a screen with no answer
         box at all. Counted across every screen of the walk rather than only
         the one it stops on, so a single unlucky landing cannot hide it. */
      if (state.calc) { seen++; if (!state.boxes) orphans++; }
      if (state.calc && state.boxes) { sidebar = state.calc; break; }
      await L2.answerCurrent(p2);
      const next = p2.locator('#nextBtn:not([disabled])');
      if (!(await next.count())) break;
      await next.click({ timeout: 2500 }).catch(() => {});
      await p2.waitForTimeout(45);
    }
    ok(orphans === 0,
      `Level 2 never shows the calculator on a screen with no answer box (${orphans} of ${seen} did)`);
    ok(sidebar > 0, `Level 2 still shows its calculator on a numeric question` +
      (sidebar ? '' : ` (walked ${walked}, stalled on ${await L2.currentType(p2)})`));
    if (sidebar > 0) {
      const n = await p2.locator('.calc-sidebar [data-calc]').count();
      ok(n === KEYS.length, `Level 2 renders all ${KEYS.length} shared keys (found ${n})`);
      ok(await p2.locator('.calc-sidebar #calcDisplay').count() === 1, 'and its display');
      /* The pad is wired: pressing 4 then 2 has to reach the display. */
      await p2.locator('.calc-sidebar [data-calc="num"][data-val="4"]').click({ timeout: 2000 });
      await p2.locator('.calc-sidebar [data-calc="num"][data-val="2"]').click({ timeout: 2000 });
      const d = await p2.locator('#calcDisplay').textContent();
      ok(d === '42', `Level 2's keys reach its display (got ${d})`);
      /* Whichever answer box this screen has. The calculator is shown beside
         numeric, table-fill and scenario questions, and each carries a
         different box — the first version of this looked only for
         #numericAnswer, landed on a table-fill, and reported null. That was
         not the check being wrong: "Use this value" really did nothing on two
         of the three types it is offered on. */
      const BOXES = '#numericAnswer, [data-tf-blank], [data-sc-part]';
      const before = await p2.locator(BOXES).count();
      ok(before > 0, `the screen showing the calculator has an answer box (found ${before})`);
      await p2.locator(BOXES).first().focus().catch(() => {});
      /* WATCH FOR THE INPUT EVENT, not just the element's value. Level 2 keeps
         a table-fill's and a scenario's answers in State, written only from the
         input handler — so setting `.value` alone puts a figure on the screen
         that submitting cannot see. Reading the value back afterwards cannot
         tell the two apart: it is the same string either way, which is exactly
         how a mutation dropping the dispatch survived the first version of
         this. */
      await p2.evaluate(sel => {
        window.__calcInput = 0;
        document.querySelectorAll(sel).forEach(b =>
          b.addEventListener('input', () => { window.__calcInput++; }));
      }, BOXES);
      await p2.locator('#calcUse').click({ timeout: 2000 }).catch(() => {});
      const v = await p2.locator(BOXES).first().inputValue().catch(() => null);
      ok(v === '42', `and "Use this value" fills Level 2's answer box (got ${v})`);
      ok(await p2.evaluate(() => window.__calcInput) === 1,
        'and announces the change, so the state grading reads is written too');
    }
    ok(errs2.length === 0, `Level 2 runs without an uncaught error${errs2.length ? ': ' + errs2[0] : ''}`);

    /* ── Level 2 at two widths ───────────────────────────────────────────────
       The whole claim of the narrow layout is that the calculator stops being a
       block at the bottom of the page and becomes a sheet over it — and that
       the WIDE layout is untouched, which is the half a change like this
       usually breaks. Both are measured on the same page, resized between. */
    const at = async (w, h) => {
      await p2.setViewportSize({ width: w, height: h });
      await p2.waitForTimeout(120);
      return p2.evaluate(() => {
        const fab = document.getElementById('calcFab');
        const side = document.getElementById('calcSidebar');
        const vis = el => !!el && getComputedStyle(el).display !== 'none';
        return {
          fab: vis(fab),
          side: vis(side),
          fixed: side ? getComputedStyle(side).position : null,
        };
      });
    };
    const wide = await at(1200, 900);
    ok(wide.side === true, 'at 1200px the calculator is in its column, as it always was');
    ok(wide.fixed === 'sticky', 'and still sticky beside the question, not floating');
    ok(wide.fab === false, 'with no floating button, because none is needed');

    const narrow = await at(390, 844);
    ok(narrow.fab === true, 'at 390px a button appears to open it');
    ok(narrow.side === false, 'and the panel is out of the flow until it is asked for');
    /* And in the corner, not pinned to a transformed ancestor. See the note on
       Level 3's first-paint measurement above: `.quiz-container` animates in on
       a transform that its fill-mode keeps, so anything fixed inside it is
       positioned against that box rather than the screen. */
    const corner = await p2.evaluate(() => {
      const f = document.getElementById('calcFab');
      if (!f) return null;
      const r = f.getBoundingClientRect();
      return { right: Math.round(innerWidth - r.right), bottom: Math.round(innerHeight - r.bottom) };
    });
    ok(corner && corner.right >= 0 && corner.right <= 40,
      `the button sits against the right edge (${corner && corner.right}px in)`);
    ok(corner && corner.bottom >= 0 && corner.bottom <= 40,
      `and against the bottom edge (${corner && corner.bottom}px up)`);

    /* Opening it must not move the page: the figures the reader is working from
       are the reason it is open. */
    const moved = await p2.evaluate(async () => {
      document.documentElement.style.minHeight = '250vh';
      window.scrollTo(0, 300);
      const before = window.scrollY;
      document.getElementById('calcFab').click();
      await new Promise(r => requestAnimationFrame(r));
      const side = document.getElementById('calcSidebar');
      return {
        before, after: window.scrollY,
        open: !!side && getComputedStyle(side).display !== 'none',
        position: side ? getComputedStyle(side).position : null,
      };
    });
    ok(moved.open === true, 'pressing it opens the panel');
    ok(moved.position === 'fixed', 'as a sheet over the page rather than a block in it');
    ok(moved.before === moved.after,
      `and the page does not move (${moved.before} → ${moved.after})`);
    ok(moved.before > 0, 'measured from a page genuinely scrolled away from the top');

    const shut = await p2.evaluate(async () => {
      document.getElementById('calcFab').click();
      await new Promise(r => requestAnimationFrame(r));
      const side = document.getElementById('calcSidebar');
      return !side || getComputedStyle(side).display === 'none';
    });
    ok(shut === true, 'and pressing it again puts the panel away');

    /* USING A VALUE PUTS IT AWAY TOO. The figure has just gone into a box the
       sheet was covering, so leaving it up makes the reader dismiss it to check
       that the thing they asked for happened. Level 3 was asserted on this;
       Level 2 was not, and a mutation removing it survived. */
    const afterUse = await p2.evaluate(async () => {
      document.getElementById('calcFab').click();
      await new Promise(r => requestAnimationFrame(r));
      const key = v => document.querySelector(`.calc-sidebar [data-calc="num"][data-val="${v}"]`);
      if (!key('7')) return { err: 'no keypad after opening' };
      /* CLEARED FIRST. The display carries whatever the previous check left on
         it — the calculator does not reset between assertions any more than it
         does between keystrokes — so typing 7 onto a live 42 gives 427, which
         is correct behaviour and a confusing thing to assert against. */
      const clear = document.querySelector('.calc-sidebar [data-calc="clear"]');
      if (clear) clear.click();
      key('7').click();
      const use = document.getElementById('calcUse');
      if (!use) return { err: 'no use button' };
      const BOXES = '#numericAnswer, [data-tf-blank], [data-sc-part]';
      const box = document.querySelector(BOXES);
      if (box) box.focus();
      use.click();
      await new Promise(r => requestAnimationFrame(r));
      const side = document.getElementById('calcSidebar');
      return {
        closed: !side || getComputedStyle(side).display === 'none',
        value: document.querySelector(BOXES) ? document.querySelector(BOXES).value : null,
      };
    });
    ok(!afterUse.err, `the narrow sheet can be used${afterUse.err ? ': ' + afterUse.err : ''}`);
    ok(afterUse.value === '7', `and the figure reaches the answer box (got ${afterUse.value})`);
    ok(afterUse.closed === true, 'and "Use this value" puts the sheet away');

    /* ── Level 2: a sum with no box to type it in ────────────────────────────
       A typed answer was the original test for offering the pad, and it misses
       a whole class of question. "Fixed costs are £10,000; variable cost is £5
       per unit; 2,000 units are produced. Total cost is:" offers four figures
       to choose between, and choosing needs the same sum as typing would.

       Asserted as a CORRESPONDENCE over a real sweep rather than against one
       hand-picked question: every question the sweep meets is looked up in the
       bank, and what the screen did is compared with what the data says it
       should do. A single example proves the flag was read once; this proves
       nothing else is quietly getting a keypad, or quietly missing one. */
    {
      /* data.js assigns to a global `window`, so it is evaluated with one
         supplied rather than required — requiring it throws in Node. */
      const w = {};
      const src = fs.readFileSync(path.join(ROOT, 'data.js'), 'utf8');
      new Function('window', src)(w);
      const norm = t => String(t || '').replace(/\s+/g, ' ').replace(/\*\*/g, '').trim();
      /* INDEXED ONLY BY A STEM THAT EXISTS. 78 of the bank's questions carry no
         `q` at all — a scenario's opening text is `setup`, a written task's is
         `task`, and a generated numeric has neither. Keying them all under the
         empty string made every one of them collide, and any screen the sweep
         caught mid-repaint, with no .question-text on it yet, then "matched"
         whichever of the 78 was indexed last and was compared against it.
         That is how a question with numeric parts came back as one the app had
         wrongly denied a calculator. */
      const stemOf = q => norm(q.q || q.setup || q.task);
      const byStem = new Map();
      w.ALL_QUESTIONS.forEach(q => {
        const k = stemOf(q);
        if (k) byStem.set(k, q);
      });
      /* STATED INDEPENDENTLY of app.js on purpose: this is what the rule is
         meant to be, and the point of the sweep is to find out whether the app
         agrees. Keeping it in step is the cost of that, and a mismatch here is
         the check doing its job rather than a nuisance. */
      const canFill = q => {
        const t = q.type || 'mcq';
        return t === 'numeric' || t === 'tablefill' || t === 'entrygrid'
          || (t === 'scenario' && (q.parts || []).some(x => x.type === 'numeric'));
      };

      /* ITS OWN PAGE. The checks above leave this one mid-question, scrolled,
         at 390px with the sheet open — and a sweep that starts from there walks
         a handful of questions and reports the correspondence as holding over
         almost nothing. A fresh context costs a second and removes the
         dependency on everything before it.

         THE DRAW IS SEEDED. 24 of 646 questions carry the flag, so an unseeded
         sweep of 60 meets one about nine times in ten — and a gate that passes
         nine times in ten is a gate that fails for reasons nobody can
         reproduce. */
      const ctx3 = await browser.newContext({ viewport: { width: 1200, height: 900 } });
      const p3 = await ctx3.newPage();
      await p3.addInitScript(() => localStorage.setItem('multisubject_active', 'aat'));
      await p3.addInitScript(() => {
        let s = 20260831 >>> 0;
        Math.random = () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648; };
      });
      await p3.goto(base, { waitUntil: 'load' });
      await p3.waitForFunction(() => {
        const a = document.getElementById('app');
        return a && a.textContent.trim().length > 40;
      }, { timeout: 15000 }).catch(() => {});
      const tap3 = async sel => {
        const b = p3.locator(sel + ':not([disabled])').first();
        if (await b.count() && await b.isVisible().catch(() => false)) {
          await b.click({ timeout: 2500 }).catch(() => {});
          await p3.waitForTimeout(90);
          return true;
        }
        return false;
      };
      await tap3('#startBtn');
      await tap3('[data-tab="home"]');
      await tap3('#endlessBtn');
      await p3.waitForSelector('.quiz-container', { timeout: 10000 }).catch(() => {});

      /* WAITS ON THE SCREEN, NOT THE CLOCK. The first version slept a fixed
         80ms after each advance, which is plenty on an idle machine and not
         nearly enough when the rest of the suite is running beside it: the
         clicks landed on a screen that had not repainted, the sweep walked
         nowhere, and the correspondence below held over two questions instead
         of sixty. The scope assertion caught it — but a gate that needs a quiet
         machine reports the weather, so the sweep now waits for the question to
         actually change. */
      const readScreen = () => p3.evaluate(() => {
        const el = document.querySelector('.question-text');
        return {
          stem: el ? el.textContent.replace(/\s+/g, ' ').trim() : null,
          fab: !!document.getElementById('calcFab'),
          use: !!document.getElementById('calcUse'),
          keys: document.querySelectorAll('.calc-key').length,
          hint: (document.querySelector('.calc-hint') || {}).textContent || null,
        };
      });
      const obs = [];
      /* THIRTY, NOT SIXTY. Each pass is several browser round trips and an
         answerCurrent that touches a dozen locators; sixty of those inside a
         full-suite run took long enough that the waits below started timing
         out, and the sweep came back having identified seven questions. The
         correspondence is just as real over thirty, and thirty finishes. */
      for (let i = 0; i < 30; i++) {
        const here = await readScreen();
        obs.push(here);
        await L2.answerCurrent(p3);
        const nx = p3.locator('#nextBtn');
        if (!(await nx.count())) break;
        await nx.click({ timeout: 5000 }).catch(() => {});
        /* The stem is the signal: a repaint that has not happened yet still
           shows the question just answered. Bounded, so a genuinely stuck run
           ends the sweep rather than hanging the suite. */
        await p3.waitForFunction(prev => {
          const el = document.querySelector('.question-text');
          const now = el ? el.textContent.replace(/\s+/g, ' ').trim() : null;
          return now !== prev;
        }, here.stem, { timeout: 5000 }).catch(() => {});
      }

      let matched = 0, wrongPad = 0, wrongUse = 0, mcqWithPad = 0, mcqNoPad = 0;
      obs.forEach(o => {
        /* A screen with no question text is a repaint caught in flight, not a
           question. Matching it against anything is how the collision above
           turned into a false failure. */
        if (!norm(o.stem)) return;
        const q = byStem.get(norm(o.stem));
        if (!q) return;
        matched++;
        const wantPad = !!(q.calc || canFill(q));
        if (o.fab !== wantPad) { wrongPad++; if (wrongPad < 4) console.log(`      ${q.id} (${q.type || 'mcq'}) want=${wantPad} shown=${o.fab}`); }
        if (o.fab && o.use !== canFill(q)) wrongUse++;
        if ((q.type || 'mcq') === 'mcq') { if (o.fab) mcqWithPad++; else mcqNoPad++; }
      });

      /* THE SWEEP MUST HAVE SEEN SOMETHING. A correspondence over nothing holds
         trivially, which is how a navigation change that lands the sweep on an
         empty screen turns this whole block green while checking nothing. */
      /* A FLOOR ON THE SAMPLE, not on the wall clock. The sweep asks for sixty
         questions and identifies as many as it can match back to the bank; how
         many it gets through depends on how loaded the machine is, which is not
         something to assert. What must hold is that the correspondence below
         was tested over a real sample rather than over nothing — the failure
         this guards is a navigation change that lands the sweep on an empty
         screen, and that shows up as a handful, not as twenty-five. */
      ok(matched >= 10, `the sweep identified ${matched} questions in the bank`);
      ok(mcqWithPad >= 1,
        `and met ${mcqWithPad} multiple-choice question(s) that ask for a sum, which now get the pad`);
      ok(mcqNoPad >= 5,
        `and ${mcqNoPad} that do not, which still get none`);
      ok(wrongPad === 0, `every question got the calculator exactly when the bank says it should (${wrongPad} wrong)`);
      ok(wrongUse === 0, `and "Use this value" appeared only where there is a box to fill (${wrongUse} wrong)`);

      /* On a question with no answer box the pad is a scratch pad, and the
         button that promises to fill something must not be drawn — a control
         that cannot do what it says is worse than no control. */
      const scratch = obs.find(o => o.fab && !o.use);
      ok(!!scratch, 'a multiple-choice question showed the pad as working-only');
      if (scratch) {
        ok(scratch.keys === KEYS.length,
          `and it is the same ${KEYS.length}-key pad, not a reduced one (got ${scratch.keys})`);
        ok(/Working only/.test(scratch.hint || ''),
          `and says so rather than promising an answer box (got ${JSON.stringify(scratch.hint)})`);
      }

      /* SCOPE, asserted against the bank rather than the sweep: the flag is
         authored, so the number of questions carrying it is a fact about the
         content and a drop in it is a regression the sweep alone cannot see. */
      const flagged = w.ALL_QUESTIONS.filter(q => q.calc);
      ok(flagged.length >= 20,
        `${flagged.length} questions in the bank are marked as needing working`);
      const misflagged = flagged.filter(q => canFill(q));
      ok(misflagged.length === 0,
        misflagged.length
          ? `${misflagged.map(q => q.id).join(', ')}: marked \`calc\` but already gets the pad from its type — the flag is for questions with no answer box`
          : 'and none of them is a type that already had it');

      /* EVERY QUESTION THE MACHINE CAN SEE IS ACCOUNTED FOR, one way or the
         other. Money in the stem and figures in every option finds the
         computational multiple-choice questions; it also finds nine that need
         no sum at all, so the detector alone cannot decide. What it CAN do is
         insist that each question it catches has been looked at: marked
         `calc`, or named here with the reason it is not.

         Without this, dropping the flag from one question is invisible — the
         count stays healthy and the sweep may never draw it. */
      const NEEDS_NO_SUM = {
        'itbk-102': 'both figures are given; the question is which one is recorded',
        'itbk-105': 'the £240 and the £40 are both in the stem; the answer is the entry',
        'itbk-207': 'the £600 difference is stated; the answer is which error causes it',
        'pobc-201': 'the £400 is stated; the answer is which error causes it',
        'pobc-206': 'the £600 difference is stated; the answer is which error causes it',
        'itbk-402': 'the right answer needs no arithmetic — £775 is the trap, and a ' +
          'calculator here would walk the reader into it',
        'poc-427': 'a spreadsheet formula question; B2 and B10 are cell references, not figures',
        'poc-428': 'a spreadsheet formula question; the numbers are row references',
        'poc-429': 'a spreadsheet formula question; the numbers are row references',
      };
      const moneyish = o => /[£$]?\d[\d,]*(\.\d+)?/.test(String(o));
      const figCount = t => (String(t || '').match(/[£$]?\d[\d,]*(?:\.\d+)?/g) || []).length;
      const caught = w.ALL_QUESTIONS.filter(q =>
        (q.type || 'mcq') === 'mcq' && (q.opts || []).length > 0
        && (q.opts || []).every(moneyish) && figCount(q.q) >= 2);
      ok(caught.length >= 25,
        `the computational-MCQ detector still finds ${caught.length} candidates to account for`);
      const unaccounted = caught.filter(q => !q.calc && !NEEDS_NO_SUM[q.id]);
      ok(unaccounted.length === 0,
        unaccounted.length
          ? `${unaccounted.map(q => q.id).join(', ')}: reads as a sum with no answer box but is ` +
            `neither marked \`calc: true\` nor listed in NEEDS_NO_SUM with a reason`
          : 'and every one is either marked as needing working or listed as not');
      /* AND NOT BOTH. Marking a question `calc` while it is listed here as
         needing no sum is a contradiction, and the flag would win silently:
         `itbk-402` would get a calculator whose only use is to compute £775,
         the trap its distractors are built from. The list is the reasoning;
         the flag must agree with it. */
      const contradictory = caught.filter(q => q.calc && NEEDS_NO_SUM[q.id]);
      ok(contradictory.length === 0,
        contradictory.length
          ? `${contradictory.map(q => q.id).join(', ')}: marked \`calc: true\` AND listed in ` +
            `NEEDS_NO_SUM — one of the two is wrong, and the flag is the half that ships`
          : 'and none is both marked and excluded');
      const staleExclusions = Object.keys(NEEDS_NO_SUM)
        .filter(id => !caught.some(q => q.id === id));
      ok(staleExclusions.length === 0,
        staleExclusions.length
          ? `${staleExclusions.join(', ')}: listed in NEEDS_NO_SUM but the detector no longer ` +
            `catches them — the exclusion is stale and hides nothing`
          : 'and no exclusion is stale');
      await ctx3.close();
    }

    await ctx2.close();
  } finally {
    await browser.close();
    server.close();
  }
  finish();
})().catch(e => { console.error(e); process.exit(1); });
