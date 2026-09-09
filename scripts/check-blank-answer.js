#!/usr/bin/env node
/**
 * A question is not graded until it has been answered.
 *
 * THE BUG, reported by a reader: the Check button under a numeric question
 * would submit an empty box. `settle()` graded whatever was there, and an empty
 * box is not the right answer — so the question came back WRONG. The streak
 * broke, the question was written into the mistakes list, and the answer was
 * revealed. All for a question nobody had attempted, usually from a stray tap
 * or an Enter keypress on a soft keyboard.
 *
 * Level 2 never had this: submitNumericPractice() has always refused a value
 * that does not parse, and says "Please enter a valid number". Levels 1 and 3
 * had no such guard, which is the asymmetry this closes.
 *
 * WHY THE BUTTON ALONE IS NOT THE FIX. Disabling it is a hint to a person and
 * no obstacle to a stale repaint, a harness, or a soft keyboard firing Enter at
 * a button it thinks is live. So the same predicate guards the handler, and it
 * is the handler this file mostly asserts: a disabled attribute that can be
 * bypassed is decoration.
 *
 * WHY THE BUTTON IS TOGGLED BY HAND. The input listener deliberately does not
 * repaint — a rerender on every keystroke puts the caret back to the end of the
 * box — so the button cannot pick up a new `disabled` from a render. It is set
 * directly in the listener instead, from the same num() the guard reads.
 *
 * WHAT COUNTS AS BLANK is whatever num() cannot turn into a number: empty,
 * spaces, "abc". A minus sign, a £ and thousands commas are all still fine, and
 * §4 holds that line — this must not become a rule that rejects "£1,200".
 *
 * NOT IN A MOCK. A mock has no Check button: answers are captured and graded at
 * the end, and leaving a box empty there is a legitimate "not attempted". §5
 * asserts the guard did not quietly change that.
 *
 * Run: node scripts/check-blank-answer.js   (exit 1 on any failure)
 */
'use strict';

const path = require('path');
const RED = '\x1b[31m', GREEN = '\x1b[32m', BOLD = '\x1b[1m', DIM = '\x1b[2m', RESET = '\x1b[0m';

let failures = 0, checks = 0;
function ok(cond, label) {
  checks++;
  if (!cond) { failures++; console.log(`  ${RED}✗${RESET} ${label}`); }
}

console.log(`${BOLD}Nothing is graded until it is answered${RESET}\n`);

const NUMERIC = {
  id: 'B-1', unitKey: 'tpfb', lo: 1, criteria: ['TPFB-1.2.1'],
  type: 'numeric', unit: '£', answer: 1200,
  q: 'A business buys goods for £6,000 excluding VAT. What is the VAT, in pounds?',
  exp: '£6,000.00 × 20% = £1,200.00.',
};

const LEVELS = [
  { name: 'Level 3', px: 'a3', driver: './lib/aat3-driver.js',
    open: (M) => { M.AAT3_PRACTICE = { QUESTIONS: [NUMERIC] }; M.AAT3_FAPS_PRACTICE = { QUESTIONS: [] };
                   M.AAT3_UI.reset('practice', 'tpfb'); return M.AAT3_UI; } },
  { name: 'Level 1', px: 'a1', driver: './lib/aat1-driver.js',
    open: (M) => { M.AAT1_PRACTICE = { QUESTIONS: [Object.assign({}, NUMERIC, { unitKey: undefined })] };
                   M.AAT1_UI.reset('practice'); return M.AAT1_UI; } },
];

LEVELS.forEach(L => {
  console.log(`${DIM}${L.name}${RESET}`);
  const D = require(L.driver);

  function open() {
    const M = D.loadUI(D.fakeStore());
    const ui = L.open(M);
    const el = D.fakeEl();
    ui.mount(el);
    /* A practice RUN, not the menu that offers one: the question screen — and
       the box this file is about — does not exist until a run is started. */
    D.click(el, 'startpractice', n => n.getAttribute('data-lo') === 'mix');
    return el;
  }
  const graded = el => /-try-verdict|-verdict/.test(el.innerHTML) || D.nodes(el, 'nextq').length > 0;
  const submitTag = el => (el.innerHTML.match(
    new RegExp('<button[^>]*data-' + L.px + '="numsubmit"[^>]*>')) || [''])[0];
  function type(el, v) {
    const box = D.nodes(el, 'numinput')[0];
    box.value = v;
    box.fire('input');
  }

  /* ── 1. An empty box does not grade ─────────────────────────────────────── */
  {
    const el = open();
    ok(D.nodes(el, 'numinput').length === 1, `${L.name}: a numeric question offers a box`);
    const btn = D.nodes(el, 'numsubmit')[0];
    ok(!!btn, `${L.name}: and a Check button`);
    /* READ OFF THE MARKUP, not through getAttribute. The fake DOM parses
       name="value" pairs only, so a bare `disabled` is invisible to it — and
       emitting disabled="disabled" to suit the parser would be shipping markup
       for the test's benefit. */
    ok(/disabled/.test(submitTag(el)),
      `${L.name}: the button starts disabled with the box empty`);
    D.click(el, 'numsubmit');
    ok(!graded(el), `${L.name}: clicking it with an empty box does not grade the question`);
  }

  /* ── 2. Nor does anything else that is not a number ─────────────────────── */
  ['   ', 'abc', '-', '.'].forEach(v => {
    const el = open();
    type(el, v);
    D.click(el, 'numsubmit');
    ok(!graded(el), `${L.name}: "${v}" does not grade the question`);
  });

  /* ── 3. A number does grade it ──────────────────────────────────────────── */
  {
    const el = open();
    type(el, '1200');
    D.click(el, 'numsubmit');
    ok(graded(el), `${L.name}: a number still grades, and the guard is not simply refusing everything`);
  }
  {
    /* The attribute has to LIFT, or the box would be unanswerable. Checked on a
       repaint, which is what the fake DOM can see; the live toggle as the
       reader types is set in the input listener and is not observable here. */
    const el = open();
    type(el, '1200');
    D.click(el, 'calctoggle');
    ok(!/disabled/.test(submitTag(el)) || !submitTag(el),
      `${L.name}: and the button is no longer disabled once the box holds one`);
  }

  /* ── 4. THE LINE THIS MUST NOT CROSS ────────────────────────────────────── */
  /* A rule that rejected a currency symbol, thousands commas or a minus sign
     would be a worse bug than the one it replaced: the reader would type a
     correct answer and be unable to submit it, with nothing on screen saying
     why. These are the shapes num() has always accepted. */
  ['£1,200', '1,200', '1200.00', '-5', ' 1200 '].forEach(v => {
    const el = open();
    type(el, v);
    D.click(el, 'numsubmit');
    ok(graded(el), `${L.name}: "${v}" is still a submittable answer`);
  });

  /* ── 5. A mock is untouched ─────────────────────────────────────────────── */
  /* Nothing is graded on the way through a mock, so there is no Check button to
     disable and an empty box is an ordinary "not attempted". */
  {
    const M = D.loadUI(D.fakeStore());
    const ui = L.open(M);
    const el = D.fakeEl();
    ui.mount(el);
    D.click(el, 'startmock');
    ok(D.nodes(el, 'numsubmit').length === 0,
      `${L.name}: a mock offers no Check button, so the guard cannot block a paper`);
  }
});

console.log('');
if (failures) { console.log(`${RED}${BOLD}✗ ${failures} of ${checks} checks failed${RESET}`); process.exit(1); }
console.log(`${GREEN}${BOLD}✓ ${checks} checks passed${RESET}`);
process.exit(0);
