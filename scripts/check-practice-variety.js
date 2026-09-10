#!/usr/bin/env node
/**
 * A second practice run has to look different from the first.
 *
 * WHAT WENT WRONG. FAPS Outcome 1 held 13 questions. A practice run is 10.
 * Two runs therefore drew 20 questions from a pool of 13, and by the
 * pigeonhole principle at least 7 of the 10 had to repeat — the measured mean
 * was 7.7. The reader who reported it had done the run twice and seen "the
 * same questions both times", which is exactly what the arithmetic says.
 *
 * Nothing caught it, and nothing could have. The draw is correct: it shuffles
 * and takes ten. Every question in the pool is correct on its own. The
 * coverage checker was satisfied, because all seven of the outcome's criteria
 * had at least one question. The defect was not in any object anything
 * examined — it was in the RATIO between the pool and the run, which no file
 * states and nothing computed.
 *
 * WHAT IT ASSERTS
 *
 *   §1 The run length is read from aat3-ui.js rather than repeated here, so
 *      the gate cannot pass while measuring a different app.
 *   §2 Every outcome holds enough questions that two consecutive runs repeat
 *      no more than CEILING of them on average. Outcomes that do not yet meet
 *      it are named in THIN with a reason, and a THIN entry that has become
 *      unnecessary is itself a failure — the list has to shrink as pools grow,
 *      or it stops meaning anything.
 *   §3 The formula matches the app. Expected repeats are computed as
 *      run² / pool, which is only right if the draw is uniform and without
 *      replacement. So one outcome is actually run through the real UI several
 *      times and the measured overlap is checked against the prediction. A
 *      formula nothing tests is a comment.
 *
 * WHY A RATIO AND NOT A COUNT. "At least 30 questions per outcome" would say
 * nothing about what a reader experiences and would need rewriting the day the
 * run length changed. Expected repeats is the thing being complained about,
 * and it moves correctly when either side of the ratio moves.
 *
 * Run: node scripts/check-practice-variety.js   (exit 1 on any failure)
 */

'use strict';

const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const RED = '\x1b[31m', GREEN = '\x1b[32m', DIM = '\x1b[2m', BOLD = '\x1b[1m', RESET = '\x1b[0m';

const errors = [];
let checks = 0;
const ok = () => { checks++; };

/* The most a second run may repeat, on average, out of a run of ten. At 4.0 a
   reader meets six questions they have not seen; below that the run stops
   feeling like practice and starts feeling like a replay. It is one number, on
   purpose: every judgement this file makes terminates here. */
const CEILING = 4.0;

/* Outcomes that do not meet the ceiling yet, each with a reason. It is EMPTY,
   and the emptiness is the point: BUAW Outcomes 4 and 5 were listed here when
   this gate was written, at 20 and 21 questions, and have since been taken to
   40 each. §2 fails if an entry is added for an outcome that already complies,
   so the list cannot quietly refill with things nobody intends to fix. */
const THIN = [];

console.log(`${BOLD}Practice variety${RESET}\n`);

/* ── §1 the run length comes from the app ─────────────────────────────────── */
const uiSrc = fs.readFileSync(path.join(ROOT, 'aat3-ui.js'), 'utf8');
const lenMatch = /var\s+PRACTICE_LEN\s*=\s*(\d+)\s*;/.exec(uiSrc);
if (!lenMatch) {
  console.log(`${RED}  ✗ could not find PRACTICE_LEN in aat3-ui.js — this gate would be measuring a number of its own invention${RESET}\n`);
  process.exit(1);
}
const RUN = Number(lenMatch[1]);
ok();

const BANKS = {
  tpfb: require(path.join(ROOT, 'aat3-practice-data.js')).AAT3_PRACTICE.QUESTIONS,
  faps: require(path.join(ROOT, 'aat3-faps-data.js')).AAT3_FAPS_PRACTICE.QUESTIONS,
  mats: require(path.join(ROOT, 'aat3-mats-data.js')).AAT3_MATS_PRACTICE.QUESTIONS,
  buaw: require(path.join(ROOT, 'aat3-buaw-data.js')).AAT3_BUAW_PRACTICE.QUESTIONS,
};

/* Drawing `run` twice from `pool` without replacement: each question in the
   second run is in the first with probability run/pool. */
const expectedRepeats = pool => (RUN * RUN) / pool;

/* ── §2 every outcome is deep enough ──────────────────────────────────────── */
const rows = [];
const excused = new Set();
Object.keys(BANKS).forEach(unit => {
  const byLo = {};
  BANKS[unit].forEach(q => { (byLo[q.lo] = byLo[q.lo] || []).push(q); });
  Object.keys(byLo).sort((a, b) => a - b).forEach(lo => {
    const pool = byLo[lo].length;
    const rep = expectedRepeats(pool);
    rows.push({ unit, lo: Number(lo), pool, rep });
    const listed = THIN.find(t => t.unit === unit && t.lo === Number(lo));

    if (pool < RUN) {
      errors.push(`${unit} LO${lo}: only ${pool} questions, and a run is ${RUN} — the run cannot even be filled without repeating inside itself.`);
      return;
    }
    if (rep <= CEILING) {
      if (listed) {
        errors.push(`${unit} LO${lo} is listed in THIN but now holds ${pool} questions (${rep.toFixed(1)} repeats), which meets the ceiling. Delete the entry — a list that keeps excusing something already fixed stops being read.`);
      } else ok();
      return;
    }
    if (listed) { excused.add(unit + '/' + lo); ok(); return; }
    errors.push(`${unit} LO${lo}: ${pool} questions means a second run repeats ${rep.toFixed(1)} of ${RUN} on average, over the ceiling of ${CEILING}. ` +
                `It needs ${Math.ceil((RUN * RUN) / CEILING)} to clear it. Add questions, or declare it in THIN with a reason.`);
  });
});

/* ── §3 the formula describes the real app ────────────────────────────────── */
/* The cheapest outcome to drive is whichever is thinnest and not excused,
   because that is where a wrong formula shows up largest. */
let measured = null;
try {
  const D = require(path.join(__dirname, 'lib', 'aat3-driver.js'));
  const target = rows.filter(r => !excused.has(r.unit + '/' + r.lo)).sort((a, b) => a.pool - b.pool)[0];
  const runOnce = () => {
    const store = D.fakeStore();
    const M = D.loadUI(store);
    const el = D.fakeEl();
    M.AAT3_UI.reset('practice', target.unit);
    M.AAT3_UI.mount(el);
    D.click(el, 'startpractice', n => n.getAttribute('data-lo') === String(target.lo));
    const seen = [];
    for (let i = 0; i < RUN * 4; i++) {
      const m = /<h2 class="a3-q">([\s\S]*?)<\/h2>/.exec(el.innerHTML);
      if (!m) break;
      seen.push(m[1].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim());
      D.answerCurrent(el);
      if (!D.nodes(el, 'nextq').length) break;
      D.click(el, 'nextq');
    }
    return seen;
  };
  const runs = [];
  for (let i = 0; i < 8; i++) runs.push(runOnce());
  const short = runs.filter(r => r.length !== RUN);
  if (short.length) {
    errors.push(`§3 ${target.unit} LO${target.lo}: ${short.length} of 8 runs were not ${RUN} questions long (${short.map(r => r.length).join(', ')}). ` +
                `The pool arithmetic assumes a full run.`);
  } else ok();
  let tot = 0, pairs = 0;
  for (let a = 0; a < runs.length; a++) for (let b = a + 1; b < runs.length; b++) {
    const s = new Set(runs[a]); tot += runs[b].filter(x => s.has(x)).length; pairs++;
  }
  const mean = tot / pairs;
  const predicted = expectedRepeats(target.pool);
  measured = { target, mean, predicted };
  /* A generous band. This is checking that the model is the right SHAPE — that
     the draw really is uniform and without replacement — not pinning a sample
     mean to a decimal place. */
  if (Math.abs(mean - predicted) > 1.5) {
    errors.push(`§3 ${target.unit} LO${target.lo}: ${target.pool} questions predicts ${predicted.toFixed(1)} repeats, but eight real runs averaged ${mean.toFixed(1)}. ` +
                `The pool arithmetic in this file does not describe how the app actually draws.`);
  } else ok();
} catch (e) {
  errors.push(`§3 could not drive a real practice run: ${e.message}`);
}

/* ── report ───────────────────────────────────────────────────────────────── */
const worst = rows.slice().sort((a, b) => b.rep - a.rep)[0];
console.log(`${DIM}  run length ${RUN}, read from aat3-ui.js · ceiling ${CEILING} repeats`);
console.log(`  ${rows.length} outcomes across ${Object.keys(BANKS).length} units · thinnest ${worst.unit} LO${worst.lo} at ${worst.pool} questions (${worst.rep.toFixed(1)} repeats)`);
console.log(`  ${THIN.length} declared thin, ${rows.length - THIN.length} meeting the ceiling`);
if (measured) console.log(`  ${measured.target.unit} LO${measured.target.lo} driven 8 times: ${measured.mean.toFixed(2)} measured against ${measured.predicted.toFixed(2)} predicted${RESET}\n`);
else console.log(RESET);

if (errors.length) {
  errors.forEach(e => console.log(`${RED}  ✗ ${e}${RESET}`));
  console.log(`\n${RED}${BOLD}${errors.length} failure${errors.length === 1 ? '' : 's'}${RESET}`);
  process.exit(1);
}
console.log(`${GREEN}${BOLD}✓ ${checks} checks passed${RESET}`);
