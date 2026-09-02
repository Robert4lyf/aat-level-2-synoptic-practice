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
    parts: entry.q.parts.map((p, i) => (p.type === 'choice'
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
  ok(!/class="a3-pill on"/.test(html), 'no pill arrives already selected');
  ok(!/a3-part is-right|a3-part is-wrong/.test(html), 'the second task arrives ungraded');
  ok(!/a3-part is-missing/.test(html), 'the second task does not arrive carrying the first one\'s blank-part marks');
  ok(/data-a3="tasksubmit"/.test(html), 'the second task offers its own submit');
}

restore();

console.log(`  ${DIM}${tasks.length} task${tasks.length === 1 ? '' : 's'} driven through the real player.${RESET}`);
console.log(failures
  ? `\n${RED}${BOLD}── ${failures} of ${checks} checks failed${RESET}\n`
  : `\n${GREEN}${BOLD}── Multi-part tasks behave ✓${RESET}  ${DIM}(${checks} assertions)${RESET}\n`);
process.exit(failures ? 1 : 0);
