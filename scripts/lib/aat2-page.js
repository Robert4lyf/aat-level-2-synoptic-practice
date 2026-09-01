/**
 * Answering a Level 2 question in a real browser.
 *
 * Level 2 renders a dozen question types and each has its own controls and its
 * own submit button, so "answer whatever is on screen" is about sixty lines
 * rather than one. It was written once, inside check-endless-practice.js, and
 * the second gate that needed it — check-calculator.js, walking to a numeric
 * question — began by guessing the submit ids and stalled on a gap-fill for
 * forty iterations before reporting the run as ended.
 *
 * That is the failure mode worth naming: a harness that cannot answer a
 * question type does not report "I cannot answer this". It reports whatever
 * the gate was measuring, as an absence. So this lives in one place, and a
 * type added to Level 2 is taught to every gate at once.
 *
 * Shared by check-endless-practice.js and check-calculator.js.
 */
'use strict';

async function tap(page, sel) {
  const b = page.locator(sel).first();
  if (!(await b.count())) return false;
  await b.click({ timeout: 2500 }).catch(() => {});
  await page.waitForTimeout(80);
  return true;
}

/* Answer the question on screen, whatever type it is, and press its submit.
   A no-op when the question is already graded — once it is, the option buttons
   are disabled and clicking one hangs the sweep. */
async function answerCurrent(page) {
  if (await page.locator('#nextBtn').count()) return;

  /* A multi-select needs more than one option chosen before its submit
     enables, so every option is clicked where the question is one; a
     single-answer question takes the first and ignores the rest. */
  const ms = page.locator('.option-btn.ms-btn:not([disabled])');
  if (await ms.count()) {
    const n = await ms.count();
    for (let k = 0; k < n; k++) await ms.nth(k).click({ timeout: 2500 }).catch(() => {});
  } else {
    const opt = page.locator('.option-btn:not([disabled])').first();
    if (await opt.count()) await opt.click({ timeout: 2500 }).catch(() => {});
  }
  /* The two shared tables. A <select> is set and told, an amount box is filled
     the way every other input here is. Answered rather than skipped, because a
     sweep that cannot answer a type reports whatever it was measuring as an
     absence instead of saying it is stuck. */
  const sels = await page.locator('[data-l2="plpick"]').count().catch(() => 0);
  for (let i = 0; i < sels; i++) {
    await page.locator('[data-l2="plpick"]').nth(i).selectOption({ index: 1 }).catch(() => {});
  }
  const cells = await page.locator('[data-l2="egcell"]').count().catch(() => 0);
  for (let i = 0; i < cells; i++) {
    await page.locator('[data-l2="egcell"]').nth(i).fill('0').catch(() => {});
  }
  for (const sel of ['#numericAnswer', '#typedAnswer', '.gap-input', '.tablefill-input']) {
    const f = page.locator(sel).first();
    if (await f.count()) await f.fill('0').catch(() => {});
  }
  /* A true/false grid needs every row set before its submit will accept, and a
     gap-fill needs every blank chosen. Both stalled the sweep and were being
     reported as the run ending. */
  const rows = await page.locator('[data-tfq-row]').evaluateAll(
    es => [...new Set(es.map(e => e.getAttribute('data-tfq-row')))]).catch(() => []);
  for (const r of rows) {
    const b = page.locator(`[data-tfq-row="${r}"][data-tfq-val]`).first();
    if (await b.count()) await b.click().catch(() => {});
  }
  /* Gap-fill: each blank is a <select>, so pick the first real option. */
  const gaps = await page.locator('[data-gf-gap]').count().catch(() => 0);
  for (let g = 0; g < gaps; g++) {
    const sel = page.locator('[data-gf-gap]').nth(g);
    const opts = await sel.locator('option').evaluateAll(
      es => es.map(e => e.value).filter(v => v !== '')).catch(() => []);
    if (opts.length) await sel.selectOption(opts[0]).catch(() => {});
  }
  /* Drag-drop: pair each left item with a right one in turn. */
  const lefts = await page.locator('[data-dd-left]').evaluateAll(
    es => es.map(e => e.getAttribute('data-dd-left'))).catch(() => []);
  const rights = await page.locator('[data-dd-right]').evaluateAll(
    es => es.map(e => e.getAttribute('data-dd-right'))).catch(() => []);
  for (let li = 0; li < Math.min(lefts.length, rights.length); li++) {
    await page.locator(`[data-dd-left="${lefts[li]}"]`).first().click().catch(() => {});
    await page.locator(`[data-dd-right="${rights[li]}"]`).first().click().catch(() => {});
  }
  const blanks = await page.locator('[data-tf-blank]').evaluateAll(
    es => [...new Set(es.map(e => e.getAttribute('data-tf-blank')))]).catch(() => []);
  for (const bl of blanks) {
    const b = page.locator(`[data-tf-blank="${bl}"]`).first();
    if (await b.count()) await b.click().catch(() => {});
  }
  if (!(await page.locator('#nextBtn').count())) {
    for (const sel of SUBMITS) if (await tap(page, sel)) break;
  }
}

/* Every submit button Level 2 renders. Written out rather than matched by a
   pattern so that a new type with a new id fails loudly here instead of
   quietly turning some other gate red somewhere else. */
const SUBMITS = ['#submitBtn', '#submitNumericBtn', '#submitTrueFalseBtn', '#submitGapFillBtn',
  '#submitMultiSelectBtn', '#submitScenarioBtn', '#submitDragDropBtn',
  '#submitTableFillBtn', '#submitListenTypedBtn',
  '#submitPickListBtn', '#submitEntryGridBtn'];

/* What is on screen, for the message when a sweep cannot answer it. A stall in
   the harness and a run that ended are different failures and must not be
   reported as the same one. */
function currentType(page) {
  return page.evaluate(() => {
    const ids = [...document.querySelectorAll('button[id]')].map(b => b.id);
    return ids.filter(i => /submit|next/i.test(i)).join(',') || 'no submit on screen';
  });
}

module.exports = { tap, answerCurrent, currentType, SUBMITS };
