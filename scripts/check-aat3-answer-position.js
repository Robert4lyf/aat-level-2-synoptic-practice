#!/usr/bin/env node
/**
 * Can a Level 3 question be answered from the POSITION of its options?
 *
 * check-aat3-quality.js already hunts two answer cues: a multiple-choice key
 * that is the longest option, and true/false grids that lean one way. Both are
 * properties of the DATA, and both were found by reading the data. This asks
 * the question the data cannot answer on its own — what does a reader actually
 * see — and it found a live one.
 *
 * Gap-fill was the only question type the player rendered in authored order.
 * The authored order put the right answer first in 38 of 40 gaps, so "click
 * the leftmost pill in every gap" scored 95% across the entire module without
 * reading a word. Nothing caught it: the cue checks were written for MCQ keys
 * and true/false balance, the coverage check counts concepts, and the data is
 * not wrong — an option list has to be in SOME order.
 *
 * The fix was to shuffle, as multiple choice and true/false already did. This
 * check exists so that fix cannot be quietly undone, and it asserts the
 * property rather than the implementation: it renders the same question many
 * times and requires the correct answer to move.
 *
 * TWO LAYERS, on purpose:
 *
 *   BEHAVIOUR — every question type that offers a list of options must place
 *   the key in more than one position across repeated renders. Rendered
 *   through the real player, so it holds whatever the data does.
 *
 *   COVERAGE OF THE BEHAVIOUR PASS — every question type present in the module
 *   must either be sampled above or be listed as having no options, with the
 *   reason. Gap-fill went unguarded because the checks were written for the two
 *   types that existed when they were written, and a check that can go stale
 *   the same way would be no better.
 *
 * What is NOT policed here is where the key is authored. Writing it first is
 * this module's convention — 110 of 110 multiple-choice keys — and it is a
 * sound one: easy to write, easy to review, and made safe by the shuffle. A
 * ceiling on that number would fight the convention rather than guard it.
 *
 * Run: node scripts/check-aat3-answer-position.js   (exit 1 on any failure)
 */

'use strict';

const path = require('path');
const D = require('./lib/aat3-driver.js');

const RED = '\x1b[31m', GREEN = '\x1b[32m', YELLOW = '\x1b[33m';
const BOLD = '\x1b[1m', DIM = '\x1b[2m', RESET = '\x1b[0m';

const CONTENT = require('./lib/aat3-content.js');
const { groups: AAT3_LEARN_PATH, questions: ALL_QUESTIONS } = CONTENT.load();

/* Renders per question in the behaviour pass. Enough that a shuffle failing to
   move a two-option gap is a one-in-4096 accident rather than a coin toss. */
const RENDERS = 12;

let failures = 0, checks = 0;
function ok(cond, label) {
  checks++;
  if (!cond) { failures++; console.log(`  ${RED}✗${RESET} ${label}`); }
}

console.log(`${BOLD}AAT Level 3 answer position${RESET}\n`);

/* ── Every question in the module ────────────────────────────────────────── */
const all = [];
(AAT3_LEARN_PATH || []).forEach(g => (g.lessons || []).forEach(l =>
  (l.check || []).forEach((q, i) => all.push({ where: `${l.id} Q${i + 1}`, q }))));
ALL_QUESTIONS.forEach(q => all.push({ where: `practice ${q.id}`, q }));

/* ── 1. Behaviour: the key moves between renders ─────────────────────────── */
/* Rendered through the real player rather than reasoned about. A question is
   fed in as a one-question practice run, which is the shortest path to
   questionHtml() that does not reach inside the module. */
{
  const restore = D.seedRandom(20260824);

  const gapfills = all.filter(x => (x.q.type || 'mcq') === 'gapfill');
  const mcqs = all.filter(x => (x.q.type || 'mcq') === 'mcq');
  const tfs = all.filter(x => (x.q.type || 'mcq') === 'truefalse');
  const tasks = all.filter(x => x.q.type === 'task');

  ok(gapfills.length > 0, 'there are gap-fill questions to check');
  ok(mcqs.length > 0, 'there are multiple-choice questions to check');
  ok(tfs.length > 0, 'there are true/false questions to check');

  /* Where does the key sit on screen? Read off the painted HTML by finding the
     button whose data-o (gap-fill) or data-i (MCQ) is the authored answer, and
     counting how many of that group came before it. */
  function keyPositions(painted, attr, group, answerOf) {
    const out = new Map();
    const re = new RegExp(`data-a3="(?:gap|ans)"[^>]*?\\b${group}="(\\d+)"[^>]*?\\b${attr}="(\\d+)"|data-a3="(?:gap|ans)"[^>]*?\\b${attr}="(\\d+)"`, 'g');
    let m, seen = new Map();
    while ((m = re.exec(painted))) {
      const g = m[1] !== undefined ? m[1] : '0';
      const opt = Number(m[2] !== undefined ? m[2] : m[3]);
      const n = seen.get(g) || 0;
      seen.set(g, n + 1);
      if (opt === answerOf(g)) out.set(g, n);
    }
    return out;
  }

  function renderQuestion(entry) {
    /* A store with nothing in it, and a bank of exactly this question, so the
       run cannot draw anything else. */
    const M = D.loadUI(D.fakeStore());
    M.AAT3_PRACTICE = { QUESTIONS: [Object.assign({}, entry.q, { unitKey: 'tpfb', lo: entry.q.lo || 1, id: 'X' })] };
    const el = D.fakeEl();
    M.AAT3_UI.reset('practice', 'tpfb');
    M.AAT3_UI.mount(el);
    D.click(el, 'startpractice', n => n.getAttribute('data-lo') === 'mix');
    return el.innerHTML;
  }

  /* Gap-fill: the type that carried the cue. */
  {
    const moved = [];
    gapfills.slice(0, 8).forEach(entry => {
      const positions = new Map();
      for (let r = 0; r < RENDERS; r++) {
        const painted = renderQuestion(entry);
        const found = keyPositions(painted, 'data-o', 'data-g', g => entry.q.gaps[Number(g)].answer);
        found.forEach((pos, g) => {
          if (!positions.has(g)) positions.set(g, new Set());
          positions.get(g).add(pos);
        });
      }
      let anyStuck = false;
      positions.forEach((set, g) => {
        const opts = entry.q.gaps[Number(g)].options.length;
        if (opts > 1 && set.size < 2) anyStuck = true;
      });
      moved.push(!anyStuck && positions.size > 0);
      ok(positions.size > 0, `${entry.where}: the gap-fill renders its options at all`);
      ok(!anyStuck, `${entry.where}: the correct pill appears in more than one position across ${RENDERS} renders — position carries no information`);
    });
    ok(moved.length > 0 && moved.every(Boolean), 'every sampled gap-fill shuffles its options');
  }

  /* Multiple choice, which already shuffled. Asserted anyway: this check is
     about the class of defect, and a type that stops shuffling is the same
     defect wherever it happens. */
  {
    mcqs.slice(0, 6).forEach(entry => {
      const seen = new Set();
      for (let r = 0; r < RENDERS; r++) {
        const painted = renderQuestion(entry);
        const order = [...painted.matchAll(/data-a3="ans" data-i="(\d+)"/g)].map(m => Number(m[1]));
        const at = order.indexOf(entry.q.ans);
        if (at !== -1) seen.add(at);
      }
      ok(seen.size >= 2, `${entry.where}: the correct option appears in more than one position across ${RENDERS} renders`);
    });
  }

  /* True/false: the statements are shuffled, so a grid cannot be answered off
     a remembered row order. */
  {
    tfs.slice(0, 6).forEach(entry => {
      const seen = new Set();
      for (let r = 0; r < RENDERS; r++) {
        const painted = renderQuestion(entry);
        const order = [...painted.matchAll(/data-a3="tf" data-s="(\d+)" data-v="true"/g)].map(m => Number(m[1]));
        seen.add(order.join(','));
      }
      ok(entry.q.statements.length < 3 || seen.size >= 2,
        `${entry.where}: the true/false rows appear in more than one order across ${RENDERS} renders`);
    });
  }

  /* Multi-part tasks. Only the `choice` parts offer options; the numeric parts
     are typed into and have no position to read. A task's choice parts are
     multiple-choice questions in every respect that makes a key guessable, so
     they are sampled here rather than exempted for sitting inside a bigger
     question. */
  {
    const withChoices = tasks.filter(x => (x.q.parts || []).some(p => p.type === 'choice'));
    ok(withChoices.length > 0, 'there are tasks with choice parts to check');
    withChoices.slice(0, 6).forEach(entry => {
      const byPart = new Map();
      for (let r = 0; r < RENDERS; r++) {
        const painted = renderQuestion(entry);
        const groups = new Map();
        [...painted.matchAll(/data-a3="taskpick" data-p="(\d+)" data-o="(\d+)"/g)].forEach(m => {
          const p = m[1];
          if (!groups.has(p)) groups.set(p, []);
          groups.get(p).push(Number(m[2]));
        });
        groups.forEach((order, p) => {
          const at = order.indexOf(entry.q.parts[Number(p)].answer);
          if (!byPart.has(p)) byPart.set(p, new Set());
          byPart.get(p).add(at);
        });
      }
      const expected = (entry.q.parts || []).filter(p => p.type === 'choice').length;
      ok(byPart.size === expected,
        `${entry.where}: all ${expected} choice parts render their options`);
      let stuck = false;
      byPart.forEach((set, p) => {
        if ((entry.q.parts[Number(p)].options || []).length > 1 && set.size < 2) stuck = true;
      });
      ok(!stuck, `${entry.where}: every choice part places its key in more than one position across ${RENDERS} renders`);
    });
  }

  restore();
}

/* ── 1b. The shuffle is recomputed for each question, not reused ─────────── */
/* Every render in section 1 started a fresh run, so each question got a fresh
   order whether or not the code resets one. Inside a real run the questions
   arrive one after another, and an order computed for the previous question is
   the wrong length for this one.

   The pair below is synthetic and adversarial on purpose. Two gap-fills drawn
   from the bank would very likely have the same shape, and a stale order of the
   same length is a valid permutation — every pill still renders, and the check
   passes while the bug is live. That is exactly what a first version of this
   block did. Four options followed by two makes the fault unmissable: the
   carried-over order indexes past the end of the shorter list, and the reader
   is offered a pill captioned "undefined". */
{
  const restore = D.seedRandom(4242);
  const four = ['alpha', 'bravo', 'charlie', 'delta'];
  const two = ['yes', 'no'];
  const QA = { id: 'A', unitKey: 'tpfb', lo: 1, type: 'gapfill', q: 'First',
               template: 'One {0} and two {1}.',
               gaps: [{ options: four, answer: 0 }, { options: four, answer: 0 }], exp: 'x' };
  const QB = { id: 'B', unitKey: 'tpfb', lo: 1, type: 'gapfill', q: 'Second',
               template: 'Three {0}, four {1}, five {2}.',
               gaps: [{ options: two, answer: 0 }, { options: two, answer: 0 }, { options: two, answer: 0 }], exp: 'x' };

  const positions = new Map();
  let sawUndefined = false, wrongCount = false, rendered = 0;

  for (let r = 0; r < RENDERS * 2; r++) {
    const M = D.loadUI(D.fakeStore());
    M.AAT3_PRACTICE = { QUESTIONS: [QA, QB] };
    const el = D.fakeEl();
    M.AAT3_UI.reset('practice', 'tpfb');
    M.AAT3_UI.mount(el);
    D.click(el, 'startpractice', n => n.getAttribute('data-lo') === 'mix');

    /* The run draws its ten from a bank of two, so walk until the second
       question is the one on screen. */
    let guard = 0;
    while (!/Second/.test(el.innerHTML)) {
      D.answerCurrent(el);
      D.click(el, 'nextq');
      if (++guard > 12) break;
    }
    if (!/Second/.test(el.innerHTML)) continue;
    rendered++;

    const byGap = new Map();
    [...el.innerHTML.matchAll(/data-a3="gap" data-g="(\d+)" data-o="(\d+)"[^>]*>([^<]*)</g)].forEach(m => {
      const g = m[1];
      if (!byGap.has(g)) byGap.set(g, []);
      byGap.get(g).push({ opt: Number(m[2]), text: m[3] });
      if (!m[3] || m[3] === 'undefined') sawUndefined = true;
    });
    byGap.forEach((list, g) => {
      if (list.length !== QB.gaps[Number(g)].options.length) wrongCount = true;
      const at = list.findIndex(x => x.opt === QB.gaps[Number(g)].answer);
      if (!positions.has(g)) positions.set(g, new Set());
      positions.get(g).add(at);
    });
  }

  ok(rendered > 0, 'the second question of a run reaches the screen');
  ok(!sawUndefined, 'no gap offers a pill with no text — an order carried over from a longer question indexes past the end of a shorter one');
  ok(!wrongCount, 'every gap in the second question offers exactly its own options');
  ok(positions.size === QB.gaps.length, 'every gap in the second question renders');
  let allMoved = true;
  positions.forEach(set => { if (set.size < 2) allMoved = false; });
  ok(allMoved, 'every gap in the SECOND question shuffles too — its order is computed for itself, not inherited from the question before it');

  restore();
}

/* ── 2. No question type escapes the behaviour pass ──────────────────────── */
/* The gap-fill cue existed because a question TYPE was rendered in authored
   order while the checks were written for the other two. So the guard that
   matters is not a ceiling on the data — it is that every type carrying a list
   of options has actually been rendered and watched.

   Authoring the key into slot one is this module's convention and a sound one:
   110 of 110 multiple-choice keys sit at index 0, which makes a question easy
   to write and easy to review, and the renderer is what makes it safe. A
   ceiling on that number would fight the convention instead of guarding it.
   What has to hold is the shuffle. */
{
  /* ── Pick lists: the cue is the DISTRIBUTION, not the order ────────────────
     Gap-fill's exploit was positional — the key sat first, so "take the
     leftmost" scored 95%. A pick list cannot carry that cue in the same way,
     because one option list serves every row: position says nothing about any
     particular row, and the reader still has to decide each one.

     What it CAN carry is a lopsided key. If most rows across the module answer
     "Asset", then "always answer Asset" scores well without reading anything,
     and no per-question rule would see it because each question on its own
     looks varied. So the whole module's rows are pooled and the best single
     fixed answer is scored against them. */
  {
    const pls = all.filter(x => (x.q.type || 'mcq') === 'picklist');
    ok(pls.length > 0, 'there are pick lists to check');
    if (pls.length) {
      /* Pooled by the option's TEXT, not its index. Index 0 means something
         different in every question, so pooling indices would measure nothing;
         a reader's fixed strategy is "always say Asset", which is a label. */
      const byLabel = new Map();
      let rows = 0;
      pls.forEach(x => {
        const p = x.q.picklist;
        (p.rows || []).forEach(r => {
          rows++;
          const label = p.options[r.answer];
          byLabel.set(label, (byLabel.get(label) || 0) + 1);
        });
      });
      let best = 0, bestLabel = '';
      byLabel.forEach((n, label) => { if (n > best) { best = n; bestLabel = label; } });
      const share = rows ? best / rows : 0;
      console.log(`  ${DIM}${rows} pick-list rows; the best fixed answer is ` +
        `"${bestLabel}" at ${Math.round(share * 100)}%.${RESET}`);
      /* A THRESHOLD PROPORTIONATE TO THE SAMPLE. Below a dozen rows any share
         is noise, and failing on it would be a gate that reports the weather.
         Above that, a single answer covering more than half the rows is a
         strategy worth more than reading. */
      if (rows >= 12) {
        ok(share <= 0.5,
          `no single fixed answer covers more than half the pick-list rows ` +
          `("${bestLabel}" is ${Math.round(share * 100)}% of ${rows})`);
      }
    }
  }

  const SAMPLED = new Set(['gapfill', 'mcq', 'truefalse', 'task', 'picklist']);
  const NO_OPTIONS = {
    numeric: 'the reader types a figure; there are no options to place.',
    entrygrid: 'the reader types amounts into columns; there is no list of options to place.',
  };

  const present = new Set(all.map(x => x.q.type || 'mcq'));
  present.forEach(t => {
    if (SAMPLED.has(t)) { ok(true, `question type "${t}" is exercised by the behaviour pass above`); return; }
    if (NO_OPTIONS[t]) { console.log(`  ${DIM}"${t}" is exempt: ${NO_OPTIONS[t]}${RESET}`); return; }
    ok(false, `question type "${t}" exists in the module and this check has never rendered one. ` +
              `Either it offers a list of options and needs a behaviour sample above, or it does not and belongs in NO_OPTIONS with the reason. ` +
              `Gap-fill carried a 95% positional cue for exactly this long.`);
  });

  const counts = {};
  all.forEach(x => { const t = x.q.type || 'mcq'; counts[t] = (counts[t] || 0) + 1; });
  console.log(`  ${DIM}Question types in the module: ${Object.entries(counts).map(([k, v]) => `${k} ${v}`).join(', ')}.${RESET}`);

  /* And the authored convention, reported rather than policed, so a reviewer
     can see at a glance whether it still holds. */
  let mcqFirst = 0, mcqTotal = 0, gapFirst = 0, gapTotal = 0;
  all.forEach(({ q }) => {
    const t = q.type || 'mcq';
    if (t === 'mcq' && (q.opts || []).length > 1) { mcqTotal++; if (q.ans === 0) mcqFirst++; }
    if (t === 'gapfill') (q.gaps || []).forEach(g => {
      if ((g.options || []).length > 1) { gapTotal++; if (g.answer === 0) gapFirst++; }
    });
  });
  if (mcqTotal) console.log(`  ${DIM}Authored convention: the multiple-choice key is written first in ${mcqFirst}/${mcqTotal}; the player shuffles.${RESET}`);
  if (gapTotal) console.log(`  ${DIM}Authored convention: the gap-fill key is written first in ${gapFirst}/${gapTotal}; the player shuffles.${RESET}`);
}

console.log(failures
  ? `\n${RED}${BOLD}── ${failures} of ${checks} checks failed${RESET}\n`
  : `\n${GREEN}${BOLD}── No question can be answered from option position ✓${RESET}  ${DIM}(${checks} assertions)${RESET}\n`);
process.exit(failures ? 1 : 0);
