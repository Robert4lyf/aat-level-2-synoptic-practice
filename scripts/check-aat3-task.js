#!/usr/bin/env node
/**
 * Does a multi-part task actually work when a reader touches it?
 *
 * check-aat3-quality.js validates the SHAPE of a task — datasets, parts,
 * answers, whether any row is spare. That is a property of the data, and the
 * data being right is not the same as the screen being right. A task is the
 * most stateful thing this player renders: several inputs and several pill
 * groups, all live at once, all graded together, in a player whose other
 * question types each hold exactly one answer. Everything below is a way that
 * can break while the data stays perfectly valid.
 *
 * Driven through the real player, so what is asserted is what a reader gets.
 *
 * THE ONE THAT MOTIVATED THIS FILE. Clicking a pill repaints the whole
 * question, which rebuilds every input element on it. If the typed figures are
 * not written back from state, answering the choice part LAST is fine and
 * answering it FIRST silently empties every box the reader has already filled.
 * Nothing about the data would look wrong, and a checker reading the data could
 * never see it. Section 4 is that case.
 *
 * Run: node scripts/check-aat3-task.js   (exit 1 on any failure)
 */

'use strict';

const D = require('./lib/aat3-driver.js');
const G = require('../question-grid.js');
const CONTENT = require('./lib/aat3-content.js');
const { groups, questions } = CONTENT.load();

const RED = '\x1b[31m', GREEN = '\x1b[32m';
const BOLD = '\x1b[1m', DIM = '\x1b[2m', RESET = '\x1b[0m';

let failures = 0, checks = 0;
function ok(cond, label) {
  checks++;
  if (!cond) { failures++; console.log(`  ${RED}✗${RESET} ${label}`); }
}

console.log(`${BOLD}AAT Level 3 multi-part tasks${RESET}\n`);

/* Every task in the module, from the practice banks and from the lesson checks
   alike — a type that works in one place and not the other is still broken. */
const tasks = [];
questions.forEach(q => { if (q.type === 'task') tasks.push({ where: `practice ${q.id}`, q }); });
groups.forEach(g => (g.lessons || []).forEach(l => (l.check || []).forEach((q, i) => {
  if (q.type === 'task') tasks.push({ where: `${l.id} Q${i + 1}`, q });
})));

ok(tasks.length > 0, 'the module contains at least one multi-part task');

/* EVERY UNIT, NOT JUST THE ONE THAT HAPPENED TO GET THEM FIRST. TPFB had six
   tasks and FAPS had none, for months, and nothing said so: the type worked,
   the checks that drove it passed, and the unit with the longest paper — the
   one whose assessment is BUILT out of extended tasks — had no question of the
   shape it is assessed in. The rule that catches that is a per-unit one, and
   it is a floor on the content rather than on the code. */
{
  const SYL = require('../aat3-syllabus.js').SYLLABUS;
  Object.keys(SYL.units).forEach(unitKey => {
    const bank = questions.filter(q => q.unitKey === unitKey);
    /* SCOPED TO UNITS THAT HAVE A BANK. A unit encoded in the syllabus with no
       questions at all is not "missing its tasks" — it is unwritten, which is a
       larger and different absence that check-aat3-coverage.js tracks against
       its own shipped list. Demanding a task of an empty unit would report the
       same gap twice and block the syllabus for a unit from landing before its
       content does, which is the order this repo writes them in. */
    if (!bank.length) return;
    const mine = bank.filter(q => q.type === 'task');
    ok(mine.length > 0,
      `${unitKey} has at least one multi-part task among its ${bank.length} practice questions (has ${mine.length})`);
  });
}

/* A one-question practice run carrying exactly this task, which is the
   shortest path to the real grading that does not reach inside the module. */
function open(entry) {
  const M = D.loadUI(D.fakeStore());
  M.AAT3_PRACTICE = { QUESTIONS: [Object.assign({}, entry.q, { unitKey: 'tpfb', lo: entry.q.lo || 1 })] };
  const el = D.fakeEl();
  M.AAT3_UI.reset('practice', 'tpfb');
  M.AAT3_UI.mount(el);
  D.click(el, 'startpractice', n => n.getAttribute('data-lo') === 'mix');
  return el;
}

/* Fill one part. `right` decides whether the value given is the keyed one. */
function fillPart(el, q, pi, right) {
  const p = q.parts[pi];
  if (p.type === 'choice') {
    const pills = D.nodes(el, 'taskpick').filter(n => n.getAttribute('data-p') === String(pi));
    const want = right ? p.answer : (p.answer === 0 ? 1 : 0);
    const pick = pills.find(n => Number(n.getAttribute('data-o')) === want);
    if (pick) pick.fire('click');
    return;
  }
  if (p.type === 'grid') {
    /* A grid part is filled cell by cell, and made wrong in exactly ONE cell.
       Spoiling the whole column would still fail the part, and would say
       nothing about whether the grader reads every cell or only the first. */
    const cols = G.entryCols(p);
    G.entryRows(p).forEach((r, ri) => cols.forEach((c, ci) => {
      if (G.isGiven(r, ci)) return;
      const box = D.nodes(el, 'egcell').find(n => n.getAttribute('data-c') === `${ri}:${ci}`);
      if (!box) return;
      const key = G.cellKey(r, ci);
      const spoil = !right && ri === 0 && ci === 0;
      box.value = spoil ? String((key == null ? 0 : key) + 1) : (key == null ? '' : String(key));
      box.fire('input');
    }));
    return;
  }
  const box = D.nodes(el, 'taskinput').find(n => n.getAttribute('data-p') === String(pi));
  if (!box) return;
  box.value = String(right ? p.answer : p.answer + 1);
  box.fire('input');
}

const restore = D.seedRandom(20260827);

/* ── 1. It paints: the data is on screen, and so is every answer box ─────── */
tasks.forEach(entry => {
  const el = open(entry);
  const html = el.innerHTML;
  const q = entry.q;

  ok(/class="a3-dataset"/.test(html), `${entry.where}: the dataset renders`);

  /* Every row of every dataset reached the screen. A task whose table is
     half-painted is a task the reader cannot answer, and the totals would still
     be arithmetically correct against data they never saw. */
  const cellCount = (q.datasets || []).reduce((a, d) => a + d.rows.reduce((b, r) => b + r.length, 0), 0);
  /* `<td` and not `<td>`: amount cells carry a class, and a first version of
     this line counted only the bare tag — so the moment the renderer began
     right-aligning money it reported a third of the table missing. */
  const painted = (html.match(/<td[ >]/g) || []).length;
  ok(painted >= cellCount, `${entry.where}: all ${cellCount} dataset cells render (found ${painted})`);

  const inputs = D.nodes(el, 'taskinput').length;
  const pillParts = new Set(D.nodes(el, 'taskpick').map(n => n.getAttribute('data-p'))).size;
  const wantInputs = q.parts.filter(p => (p.type || 'numeric') === 'numeric').length;
  const wantPills = q.parts.filter(p => p.type === 'choice').length;
  ok(inputs === wantInputs, `${entry.where}: ${wantInputs} typed parts render an input each (found ${inputs})`);
  ok(pillParts === wantPills, `${entry.where}: ${wantPills} choice parts render their pills (found ${pillParts})`);

  /* A grid part renders one box per cell it asks for. Counted rather than
     merely looked for: a table that paints its header and half its rows looks
     right in a screenshot and is unanswerable. */
  const gridParts = q.parts.filter(p => p.type === 'grid');
  const wantCells = gridParts.reduce((a, p) => {
    const cols = G.entryCols(p);
    return a + G.entryRows(p).reduce((b, r) => b + cols.filter((c, ci) => !G.isGiven(r, ci)).length, 0);
  }, 0);
  const cells = D.nodes(el, 'egcell').length;
  ok(cells === wantCells, `${entry.where}: ${wantCells} grid cells render a box each (found ${cells})`);

  ok(!/undefined|\[object Object\]|NaN/.test(html),
    `${entry.where}: nothing renders as undefined, NaN or [object Object]`);
});

/* ── 2. All parts right grades the task right ────────────────────────────── */
tasks.forEach(entry => {
  const el = open(entry);
  entry.q.parts.forEach((_, pi) => fillPart(el, entry.q, pi, true));
  D.click(el, 'tasksubmit');
  const html = el.innerHTML;
  ok(!/class="a3-part is-wrong"/.test(html), `${entry.where}: every part reads as correct when every part is right`);
  ok(/data-a3="nextq"/.test(html), `${entry.where}: the task grades and offers the next question`);
  /* The keyed answers must be reachable BY TYPING them. A part whose answer is
     stored to more precision than it is shown — 2886.004 keyed, "£2,886.00" on
     screen — is unanswerable, and every reader would be told they were wrong. */
  ok(!/a3-part-v">Answer/.test(html), `${entry.where}: no part rejects its own keyed answer`);
});

/* ── 3. One part wrong fails the task, and says WHICH part ───────────────── */
/* All-or-nothing is the scoring rule, but a reader who gets five of six boxes
   right and is told only "wrong" has learnt nothing they can act on. The
   per-part verdicts are the entire pedagogical point of the type. */
tasks.forEach(entry => {
  const q = entry.q;
  if (q.parts.length < 2) return;
  const el = open(entry);
  q.parts.forEach((_, pi) => fillPart(el, q, pi, pi !== 0));
  D.click(el, 'tasksubmit');
  const html = el.innerHTML;
  const wrong = (html.match(/class="a3-part is-wrong"/g) || []).length;
  const right = (html.match(/class="a3-part is-right"/g) || []).length;
  ok(wrong === 1, `${entry.where}: exactly the one wrong part is marked wrong (found ${wrong})`);
  ok(right === q.parts.length - 1,
    `${entry.where}: the other ${q.parts.length - 1} parts still read as correct (found ${right})`);
  ok(/a3-part-v">Answer/.test(html), `${entry.where}: the wrong part is told what the answer was`);
});

/* ── 4. Typed figures survive a pill click ──────────────────────────────── */
/* The one that motivated this file. Choosing a pill repaints the question; if
   the inputs are not refilled from state, everything typed before it is lost —
   and lost silently, since a blank box looks exactly like one not yet reached. */
{
  const mixed = tasks.filter(t => t.q.parts.some(p => p.type === 'choice')
                               && t.q.parts.some(p => (p.type || 'numeric') === 'numeric'));
  ok(mixed.length > 0, 'there is a task with both typed and choice parts to check');
  mixed.forEach(entry => {
    const q = entry.q;
    const el = open(entry);
    const numIdx = q.parts.findIndex(p => (p.type || 'numeric') === 'numeric');
    const choiceIdx = q.parts.findIndex(p => p.type === 'choice');

    fillPart(el, q, numIdx, true);                    // type a figure
    fillPart(el, q, choiceIdx, true);                 // then click a pill: repaint

    const box = D.nodes(el, 'taskinput').find(n => n.getAttribute('data-p') === String(numIdx));
    const val = box ? String(box.getAttribute('value')) : '';
    ok(val === String(q.parts[numIdx].answer),
      `${entry.where}: the figure typed before a pill click is still in its box afterwards (found "${val}")`);
  });

  /* AND THE SAME FOR A GRID CELL, which is a second store and therefore a
     second chance to lose everything typed. The renderer has to be handed the
     live cells; handed an empty map it paints twelve blank boxes on the next
     repaint while the figures sit in state, so the reader watches their work
     vanish and the grading still says they got it right. */
  const gridded = tasks.filter(t => t.q.parts.some(p => p.type === 'grid')
                                 && t.q.parts.some(p => p.type === 'choice'));
  ok(gridded.length > 0, 'there is a task with both a grid and a choice part to check');
  gridded.forEach(entry => {
    const q = entry.q;
    const el = open(entry);
    const cell = D.nodes(el, 'egcell').find(n => n.getAttribute('data-c') === '0:0');
    cell.value = '1234'; cell.fire('input');
    fillPart(el, q, q.parts.findIndex(p => p.type === 'choice'), true);   // repaint
    const after = D.nodes(el, 'egcell').find(n => n.getAttribute('data-c') === '0:0');
    const v = after ? String(after.getAttribute('value')) : '';
    ok(v === '1234',
      `${entry.where}: the figure typed into a grid cell before a pill click is still there afterwards (found "${v}")`);
  });
}

/* ── 5. A blank part blocks the grade, and is pointed at ─────────────────── */
tasks.forEach(entry => {
  const q = entry.q;
  const el = open(entry);
  q.parts.forEach((_, pi) => { if (pi !== 0) fillPart(el, q, pi, true); });
  D.click(el, 'tasksubmit');
  const html = el.innerHTML;
  ok(!/data-a3="nextq"/.test(html), `${entry.where}: a task with a blank part does not grade`);
  ok(/class="a3-part is-missing"/.test(html), `${entry.where}: the blank part is marked, not left to be hunted for`);
  const missing = (html.match(/class="a3-part is-missing"/g) || []).length;
  ok(missing === 1, `${entry.where}: only the blank part is marked (found ${missing})`);
  ok(/a3-part-status/.test(html), `${entry.where}: the reader is told how many answers are still blank`);
});

/* ── 5b. A grid with ONE cell left blank is not a finished answer ─────────── */
/* An empty grid is caught by §5 above, and an empty grid is the easy case: any
   rule at all catches it. The rule that matters is the partly-filled one — a
   running total with a hole in it is abandoned work, not a partial answer, and
   a task that grades on it hands the reader a mark for a table they did not
   complete. */
tasks.filter(t => t.q.parts.some(p => p.type === 'grid')).forEach(entry => {
  const q = entry.q;
  const gi = q.parts.findIndex(p => p.type === 'grid');
  const el = open(entry);
  q.parts.forEach((_, pi) => { if (pi !== gi) fillPart(el, q, pi, true); });
  fillPart(el, q, gi, true);
  /* Then empty ONE cell again — the last one, so it is not the one a
     "check the first cell" rule would happen to look at. */
  const cells = D.nodes(el, 'egcell');
  const last = cells[cells.length - 1];
  last.value = ''; last.fire('input');
  D.click(el, 'tasksubmit');
  const html = el.innerHTML;
  ok(!/data-a3="nextq"/.test(html),
    `${entry.where}: a grid with one cell still blank does not grade`);
  ok((html.match(/class="a3-part is-missing"/g) || []).length === 1,
    `${entry.where}: and the unfinished grid is the part marked missing`);
});

/* ── 6. Nothing leaks into the next question ─────────────────────────────── */
/* A task holds four kinds of per-question state where every other type holds
   one, so this is where a forgotten reset shows up.
 *
 * THE FOLLOWER IS A SECOND TASK, and that is the point. A first version put a
 * plain numeric question after the task and asserted the screen carried no
 * parts and no dataset — which it never would, because a numeric question does
 * not render either of those whatever state is left over. The check passed
 * against a player that had stopped clearing the typed figures entirely.
 * Only a task can show a leak into task state: the second one arrives with the
 * first one's answers already in its boxes. */
{
  const entry = tasks[0];
  const M = D.loadUI(D.fakeStore());
  /* The follower MIRRORS the first task's parts — same count, same types, same
     order — so every index the first task wrote to is an index the second one
     reads from. Built by hand instead, its choice part landed at index 1 while
     the real task's sat at index 5; a player that never cleared the chosen
     pills passed, because nothing the leak touched was ever displayed. A leak
     that only shows up when the indices happen to line up is a leak that will
     show up to a reader long before it shows up here. */
  const follower = {
    id: 'FOLLOW', unitKey: 'tpfb', lo: 1, type: 'task',
    q: 'A second task, to catch anything the first one left behind.',
    datasets: [{ title: 'Extract', headers: ['Item', 'Net £'], rows: [['Sales', '100.00'], ['Spare', '900.00']] }],
    parts: entry.q.parts.map((p, i) => (p.type === 'grid'
      /* A GRID IS MIRRORED BY A GRID of the same shape, for the same reason the
         choice parts keep their option count: the cells are keyed "row:col", so
         a leak only shows where the second grid has a cell at the same address.
         Mirrored as a numeric box instead, a task grid could carry its figures
         into the next task and nothing here would ever see it. */
      ? { label: `Mirror of part ${i + 1}`, type: 'grid',
          entrygrid: {
            title: 'Mirror grid', rowHeader: 'Row',
            columns: G.entryCols(p).map((c, ci) => `Column ${ci + 1}`),
            rows: G.entryRows(p).map((r, ri) => ({ label: `Row ${ri + 1}`, col: 0, amount: 100 + ri })),
          },
          exp: 'Mirrors a grid part of the task before it, so a leaked cell would show.' }
      : p.type === 'choice'
      ? { label: `Mirror of part ${i + 1}`, type: 'choice',
          /* Same OPTION COUNT as well as the same index. With two options
             against the original's four, a leaked selection of option 3 lands
             past the end of the shorter list, no pill reads as chosen, and the
             leak is invisible — which is exactly what happened. */
          options: (p.options || []).map((_, oi) => `Option ${oi + 1}`), answer: 0,
          exp: 'Mirrors a choice part of the task before it, so a leaked selection would show.' }
      : { label: `Mirror of part ${i + 1}`, type: 'numeric', unit: '£', answer: 100,
          exp: 'Mirrors a typed part of the task before it, so a leaked figure would show.' })),
    exp: 'A follower whose only job is to arrive empty.',
  };
  M.AAT3_PRACTICE = { QUESTIONS: [Object.assign({}, entry.q, { unitKey: 'tpfb', lo: 1 }), follower] };
  const el = D.fakeEl();
  M.AAT3_UI.reset('practice', 'tpfb');
  M.AAT3_UI.mount(el);
  D.click(el, 'startpractice', n => n.getAttribute('data-lo') === 'mix');

  /* WHICHEVER TASK CAME FIRST, not the one written first. A run shuffles, so
     the follower can be dealt before the task it follows; an earlier version
     assumed the authored order and failed the moment the draw changed, which
     said nothing about the player at all. Both are tasks with identically
     shaped parts, so either order tests the same thing.

     The first is answered DELIBERATELY rather than by the generic driver, and
     is submitted once with a part still blank before being completed. That
     leaves every piece of per-question state a task can hold in a non-default
     condition — typed figures, chosen pills, per-part verdicts and the
     blank-part marks — so the assertions below test all four rather than
     whichever ones the driver's arbitrary choices happened to set. */
  const firstIsFollower = /A second task/.test(el.innerHTML);
  const first = firstIsFollower ? follower : entry.q;
  const secondStem = firstIsFollower ? entry.q.q : follower.q;

  D.click(el, 'tasksubmit');                                  // blank: raises the marks
  first.parts.forEach((_, pi) => fillPart(el, first, pi, true));
  D.click(el, 'tasksubmit');
  D.click(el, 'nextq');
  ok(el.innerHTML.indexOf(secondStem.slice(0, 30)) !== -1, 'the task after a task is reached');
  const html = el.innerHTML;

  const filled = D.nodes(el, 'taskinput')
    .map(n => String(n.getAttribute('value') || ''))
    .filter(v => v !== '');
  ok(filled.length === 0,
    `the second task arrives with empty boxes — nothing typed into the first is still there (found ${JSON.stringify(filled)})`);
  const filledCells = D.nodes(el, 'egcell')
    .map(n => String(n.getAttribute('value') || ''))
    .filter(v => v !== '');
  ok(filledCells.length === 0,
    `the second task arrives with an empty grid — nothing typed into the first one's is still there (found ${JSON.stringify(filledCells)})`);
  ok(!/class="a3-pill on"/.test(html), 'no pill arrives already selected');
  ok(!/a3-part is-right|a3-part is-wrong/.test(html), 'the second task arrives ungraded');
  ok(!/a3-part is-missing/.test(html), 'the second task does not arrive carrying the first one\'s blank-part marks');
  ok(/data-a3="tasksubmit"/.test(html), 'the second task offers its own submit');
}

/* ── 7. A grid part is well formed, and its figures come from the table ──── */
/* The player is happy to render any grid. These are the rules the DATA has to
   keep, and the last of them is the one worth having: a running total that the
   reader is asked to reproduce must actually be reproducible from the table
   printed above it. An arithmetic slip in one of twelve cells looks exactly
   like a correct one, and every reader who did the sum right would be marked
   wrong against it.

   WHAT IT CANNOT SEE, said plainly. A step of ZERO always passes, because the
   empty subset sums to zero — and that is not a hole to be plugged but a case
   the rule genuinely cannot judge. A month whose every column is excluded from
   the total adds nothing, correctly; a month whose figure was simply left out
   adds nothing too, and the two are the same arithmetic. Requiring a non-empty
   subset would fail the first, which is a real shape: a month of exempt income
   only. So a running total that stops growing is caught by a reader, not here.
   The specimen that proved this was written expecting a catch and did not get
   one; it is recorded rather than quietly dropped. */

/* Every money figure on one row of a task's dataset. Money means a figure
   written as money — with pence, or a thousands separator, or a £ — which is
   what separates 6,200.00 from the "Apr" and the "—" beside it. */
const MONEY = /^\(?£?\s?\d[\d,]*(?:\.\d{2})?\)?$/;
function rowMoney(cells) {
  const out = [];
  (cells || []).forEach(c => {
    const t = String(c == null ? '' : c).trim();
    if (!MONEY.test(t)) return;
    if (!/[.,£]/.test(t)) return;          // a bare integer is a week or an invoice number
    const n = Number(t.replace(/[£,()\s]/g, ''));
    if (!isNaN(n)) out.push(/^\(/.test(t) ? -n : n);
  });
  return out;
}

/* Can `want` be made by adding up some of `nums`? Small by construction — a
   dataset row carries a handful of money columns — so every subset is tried
   rather than reasoned about. Returns the subset, so a failure can say what it
   did find. */
function subsetTo(nums, want) {
  const target = Math.round(want * 100);
  for (let mask = 0; mask < (1 << nums.length); mask++) {
    let sum = 0;
    for (let i = 0; i < nums.length; i++) if (mask & (1 << i)) sum += Math.round(nums[i] * 100);
    if (sum === target) {
      return nums.filter((n, i) => mask & (1 << i));
    }
  }
  return null;
}

/* The rule itself, lifted out so the specimens below can be run THROUGH IT
   rather than through a second copy of it that could agree with a broken one.
   Returns a list of complaints about one grid part against one dataset. */
function cumulativeProblems(part, dataset, where) {
  const out = [];
  const cols = G.entryCols(part);
  const rows = G.entryRows(part);
  cols.forEach((c, ci) => {
    if (!/cumulative|running total/i.test(String(c))) return;
    if (rows.length !== (dataset.rows || []).length) {
      out.push(`${where}: the ${c} column has ${rows.length} rows and the table beside it has ${(dataset.rows || []).length}.`);
      return;
    }
    let prev = 0;
    rows.forEach((r, ri) => {
      const key = G.cellKey(r, ci);
      if (key == null) { out.push(`${where} ${r.label}: no figure keyed in a cumulative column.`); return; }
      const step = Math.round((key - prev) * 100) / 100;
      if (step < 0) {
        out.push(`${where} ${r.label}: the running total falls from ${prev} to ${key}.`);
      } else if (!subsetTo(rowMoney(dataset.rows[ri]), step)) {
        out.push(`${where} ${r.label}: the running total rises by ${step}, and no combination of that row's figures (${rowMoney(dataset.rows[ri]).join(', ') || 'none'}) adds up to it.`);
      }
      prev = key;
    });
  });
  return out;
}

{
  let gridParts = 0;
  tasks.forEach(entry => {
    const q = entry.q;
    const grids = q.parts.filter(p => p.type === 'grid');
    /* ONE GRID PER TASK. Cells are keyed "row:col" into a single store, so a
       second grid on the same task would address the same cells as the first
       and the two would silently share every figure typed into either. */
    ok(grids.length <= 1, `${entry.where}: at most one grid part (has ${grids.length})`);

    grids.forEach(p => {
      gridParts++;
      /* The shared well-formedness rules, so a task grid cannot be held to a
         looser standard than a standalone one. */
      /* ONE COLUMN IS ALLOWED HERE AND NOWHERE ELSE, and the assertion below
         is the condition that buys it. A standalone grid needs two columns
         because with one there is no "which column does this belong in" left to
         get right. A task grid trades that decision for a harder one: the
         reader reads across the task's own table and decides which of ITS
         columns belong in the figure. So a one-column task grid is sound only
         while the task prints a table with a choice to make on it — which is
         asserted, not assumed. */
      const probs = G.problems({ type: 'entrygrid', entrygrid: p.entrygrid }, entry.where, { minColumns: 1 });
      ok(probs.length === 0, `${entry.where}: the grid part is well formed${probs.length ? ' — ' + probs.join(' ') : ''}`);
      if (G.entryCols(p).length < 2) {
        const widest = (q.datasets || []).reduce(
          (a, d) => Math.max(a, ...(d.rows || []).map(r => rowMoney(r).length)), 0);
        ok(widest >= 2,
          `${entry.where}: a one-column grid sits beside a table with a choice to make on it (widest row shows ${widest} money columns)`);
      }
      ok(G.entryRows(p).length >= 2,
        `${entry.where}: the grid asks for more than one row — one row is a typed box with extra chrome`);
      ok(!!p.exp, `${entry.where}: the grid part explains itself when the task is marked`);

      /* THE FIGURES MUST BE REACHABLE. A grid inside a task shows no money of
         its own — every box is empty — so the money it is built from has to be
         on the task's own tables, or the reader is guessing. */
      const money = (q.datasets || []).reduce((a, d) => a + d.rows.reduce((b, r) => b + rowMoney(r).length, 0), 0);
      ok(money > 0, `${entry.where}: the task shows money for its grid to be worked out from (found ${money} figures)`);

      (q.datasets || []).forEach(d => {
        const probs2 = cumulativeProblems(p, d, `${entry.where} against "${d.title}"`);
        /* Only complains where the row counts line up, so a task with a second,
           unrelated table is not reported against it. */
        if (probs2.length && probs2[0].indexOf('rows and the table beside it') !== -1) return;
        ok(probs2.length === 0,
          `${entry.where}: every cumulative figure is the running total of "${d.title}"${probs2.length ? ' — ' + probs2.join(' ') : ''}`);
      });
    });
  });
  ok(gridParts > 0, 'there is at least one task grid part for these rules to be about');

  /* WHY ONE GRID PER TASK IS A RULE AND NOT A PREFERENCE. The assertion above
     is a bare number, and a bare number can be raised by anyone who finds it
     inconvenient. This drives a task with TWO grids through the real player and
     shows what happens: cells are keyed "row:col" into one store, so both grids
     address the same cells and a figure typed into one appears in the other.

     IT ASSERTS THE BROKEN BEHAVIOUR ON PURPOSE. The day someone gives the cells
     a per-part key this check goes red — and that is the signal that the rule
     above can be relaxed, rather than a failure to paper over. */
  {
    const gridOfTwo = i => ({
      label: `Grid ${i + 1}`, type: 'grid',
      entrygrid: {
        title: `Grid ${i + 1}`, rowHeader: 'Row', hint: 'Specimen.',
        columns: ['Amount £'],
        rows: [{ label: 'One', col: 0, amount: 100 }, { label: 'Two', col: 0, amount: 200 }],
      },
      exp: 'A specimen grid, to show that two of them share one set of cells.',
    });
    const el = open({ where: 'two-grid specimen', q: {
      id: 'TWOGRID', unitKey: 'tpfb', lo: 1, type: 'task',
      q: 'A task carrying two grids, which the rule above forbids.',
      datasets: [{ title: 'Extract', headers: ['Item', 'Net £'], rows: [['Sales', '100.00'], ['More', '200.00']] }],
      parts: [gridOfTwo(0), gridOfTwo(1)],
      exp: 'Exists only to show why one grid per task is a rule.',
    } });
    const boxes = D.nodes(el, 'egcell').filter(n => n.getAttribute('data-c') === '0:0');
    ok(boxes.length === 2, `two grids render two cells at the same address (found ${boxes.length})`);
    if (boxes.length === 2) {
      boxes[0].value = '4321'; boxes[0].fire('input');
      /* Submitting repaints without grading — a cell is still blank, so the
         nudge fires — which is the cheapest way to redraw both tables from the
         one store they share. */
      D.click(el, 'tasksubmit');
      const repainted = D.nodes(el, 'egcell').filter(n => n.getAttribute('data-c') === '0:0');
      ok(String(repainted[1].getAttribute('value')) === '4321',
        'and a figure typed into the first appears in the second — which is why a task may carry only one');
    }
  }

  /* THE CONTROLS. Run through cumulativeProblems itself, so the rule that
     passes the bank above is the rule being proved here — a second copy could
     agree with a broken one. */
  const spec = {
    rows: [['Apr', '100.00', '50.00'], ['May', '200.00', '25.00'], ['Jun', '300.00', '10.00']],
    title: 'Specimen',
  };
  const gridOf = amounts => ({ entrygrid: {
    columns: ['Cumulative £'],
    rows: amounts.map((a, i) => ({ label: `R${i + 1}`, col: 0, amount: a })),
  } });
  ok(cumulativeProblems(gridOf([150, 375, 685]), spec, 'sound').length === 0,
    'control: a column that really is the running total passes');
  ok(cumulativeProblems(gridOf([150, 375, 686]), spec, 'slip').length === 1,
    'a single figure out by one is caught');
  const falls = cumulativeProblems(gridOf([150, 100, 400]), spec, 'falls');
  ok(falls.length === 1 && /falls from/.test(falls[0]),
    `a running total that goes backwards is caught (got ${JSON.stringify(falls)})`);
  /* The rule is a SUBSET rule, not a "sum the whole row" one, because a table
     carries columns the total deliberately leaves out — the exempt rent and the
     capital asset in T-1-01 are the point of that question. So a column that
     counts only the first figure of each row must pass. */
  ok(cumulativeProblems(gridOf([100, 300, 600]), spec, 'one column').length === 0,
    'control: a total that counts only some of each row\'s columns passes');
}

restore();

console.log(`  ${DIM}${tasks.length} task${tasks.length === 1 ? '' : 's'} driven through the real player.${RESET}`);
console.log(failures
  ? `\n${RED}${BOLD}── ${failures} of ${checks} checks failed${RESET}\n`
  : `\n${GREEN}${BOLD}── Multi-part tasks behave ✓${RESET}  ${DIM}(${checks} assertions)${RESET}\n`);
process.exit(failures ? 1 : 0);
