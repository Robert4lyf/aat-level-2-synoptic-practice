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
  [['4', '8', '0', '0', '*', '2', '0', 'pct', '='], '960', '20% of £4,800 net'],
  /* Chaining without pressing equals: an operator has to settle the sum so far.
     If it does not, this reads 2 rather than 6. */
  [['2', '+', '2', '+', '2', '='], '6', 'chaining without pressing equals'],
];
SUMS.forEach(([seq, want, label]) => {
  ok(run(seq).display === want, `${label} → ${want} (got ${run(seq).display})`);
});

ok(run(['9', 'sqrt']).display === '3', 'square root of nine');
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
ok(b.display === '0' && b.memory === 0, 'each caller gets its own calculator');

/* ── 2. One pad, two levels ───────────────────────────────────────────────── */
console.log(`${DIM}one pad, two levels${RESET}`);

const KEYS = AATCalc.KEYS || [];
const WANT = ['mc', 'mr', 'msub', 'madd', 'clear', 'back', 'pct', 'sqrt', 'sign', 'dot', 'eq'];
WANT.forEach(k => ok(KEYS.some(x => x.k === k), `the shared pad has a ${k} key`));
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
const APP = fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8');
const A3 = fs.readFileSync(path.join(ROOT, 'aat3-ui.js'), 'utf8');
ok(/AATCalc\.KEYS/.test(APP), 'Level 2 renders the shared pad rather than its own');
ok(/AATCalc\.KEYS/.test(A3), 'Level 3 renders the shared pad rather than its own');
ok(!/data-calc="sqrt"/.test(APP), 'Level 2 no longer hand-writes its keys');

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
/* Type a sequence on the rendered pad. */
function tap(el, seq) {
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
  ok(/class="a3-calc /.test(el.innerHTML) || /class="a3-calc is-open"/.test(el.innerHTML),
    'a numeric question offers the calculator');
  ok(D.nodes(el, 'calckey').length === KEYS.length,
    `all ${KEYS.length} keys render (found ${D.nodes(el, 'calckey').length})`);
  ok(D.nodes(el, 'calcuse').length === 1, 'and a "Use this value" button');
  ok(/id="a3CalcDisplay"/.test(el.innerHTML), 'and a display');
}

/* A multi-part task, which is the shape with several boxes to fill. */
const CONTENT = require('./lib/aat3-content.js');
const { questions } = CONTENT.load();
const someTask = questions.find(q => q.type === 'task');
ok(!!someTask, 'the module has a task to test against');
if (someTask) {
  const el = openWith([Object.assign({}, someTask, { unitKey: 'tpfb', lo: someTask.lo || 1 })]);
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
  ok(D.nodes(el, 'calckey').length === KEYS.length, 'and offers the calculator beside it');
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
  ok(D.nodes(el, 'calckey').length === 0, `a ${label} question does not carry a keypad`);
});

/* Once graded there is nothing left to compute, and the explanation needs the
   room. This is the assertion that catches a panel left on screen under the
   verdict. */
{
  const el = openWith([NUMERIC]);
  ok(D.nodes(el, 'calckey').length > 0, 'the pad is there before the answer is checked');
  const box = D.nodes(el, 'numinput')[0];
  box.value = '240'; box.fire('input');
  D.click(el, 'numsubmit');
  ok(/a3-try-verdict/.test(el.innerHTML), 'the numeric question grades');
  ok(D.nodes(el, 'calckey').length === 0, 'and the pad goes once it is graded');
}

/* ── 5. The value reaches grading, not just the box ───────────────────────── */
console.log(`${DIM}the value reaches grading${RESET}`);

{
  const el = openWith([NUMERIC]);
  tap(el, ['1', '2', '0', '0', '*', '2', '0', 'pct', '=']);
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
  tap(el, ['8', '8', 'madd']);          // 88 banked in memory, 88 on the display
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
  /* Memory is a subtotal the reader parked ON PURPOSE, often to carry across
     the parts of a task. Clearing it would make the memory keys pointless. */
  tap(el, ['mr']);
  D.click(el, 'calcuse');
  const box3 = D.nodes(el, 'numinput')[0];
  ok(box3 && box3.attrs.value === '88', `but memory survives the question change (got ${box3 && box3.attrs.value})`);
}

/* ── 7. A keypress does not throw away what the reader typed ──────────────── */
console.log(`${DIM}the typed answer survives${RESET}`);

{
  const el = openWith([NUMERIC]);
  const box = D.nodes(el, 'numinput')[0];
  box.value = '19'; box.fire('input');
  tap(el, ['4', '+', '4', '=']);
  /* The whole reason the pad does not repaint. If a keypress rebuilt the card,
     a half-typed answer would be rebuilt from state — and that is survivable —
     but a repaint mid-number on a phone also drops the caret. Assert the value
     is still there and still the reader's. */
  D.click(el, 'numsubmit');
  ok(/a3-try-verdict is-wrong/.test(el.innerHTML),
    'a half-typed answer is still the answer after using the keypad');
}

/* Collapsing the pad puts it away without disturbing the answer. */
{
  const el = openWith([NUMERIC]);
  const box = D.nodes(el, 'numinput')[0];
  box.value = '240'; box.fire('input');
  D.click(el, 'calctoggle');
  ok(D.nodes(el, 'calckey').length === 0, 'the toggle folds the pad away');
  ok(D.nodes(el, 'calctoggle').length === 1, 'and leaves the toggle to bring it back');
  D.click(el, 'calctoggle');
  ok(D.nodes(el, 'calckey').length === KEYS.length, 'the toggle brings it back');
  D.click(el, 'numsubmit');
  ok(/a3-try-verdict is-right/.test(el.innerHTML), 'and the typed answer survived both');
}

restore();

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
        'aat3-practice-data.js', 'aat3-faps-data.js', 'aat3-ui.js'];
      for (const src of need) {
        if (document.querySelector(`script[src="${src}"]`)) continue;
        await new Promise((res, rej) => {
          const s = document.createElement('script');
          s.src = src; s.async = false; s.onload = res; s.onerror = rej;
          document.head.appendChild(s);
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
      if (!host.querySelector('[data-a3="calckey"]')) return { err: 'the numeric question rendered no keypad' };
      const key = v => host.querySelector(`[data-a3="calckey"][data-k="num"][data-v="${v}"]`);
      const box = host.querySelector('[data-a3="numinput"]');
      box.value = '7';                       // something the reader typed
      key('4').click(); key('2').click();
      const display = document.getElementById('a3CalcDisplay');
      /* Now the whole point of it: the figure has to reach the answer. */
      host.querySelector('[data-a3="calcuse"]').click();
      const after = host.querySelector('[data-a3="numinput"]');
      return {
        display: display && display.textContent,
        boxKept: host.querySelector('[data-a3="numinput"]') === box || box.value === '7',
        used: after && after.value,
      };
    }, NUMERIC);
    ok(!shown.err, `Level 3's pad is reachable in the browser${shown.err ? ': ' + shown.err : ''}`);
    ok(shown.display === '42', `pressing 4 then 2 shows 42 on the display (got ${shown.display})`);
    ok(shown.boxKept === true, 'and the answer box is neither rebuilt nor emptied by the keypress');
    ok(shown.used === '42', `"Use this value" puts it in the answer box (got ${shown.used})`);
    await ctx.close();
  } finally {
    await browser.close();
    server.close();
  }
  finish();
})().catch(e => { console.error(e); process.exit(1); });
