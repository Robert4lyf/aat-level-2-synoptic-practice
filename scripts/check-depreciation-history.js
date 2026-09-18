#!/usr/bin/env node
/**
 * A depreciation history the reader could have arrived at.
 *
 * When a question hands over a cost, an accumulated depreciation and the
 * method that produced it, those three figures are a claim about the asset's
 * past: this is what the policy has charged since the asset was bought. The
 * arithmetic the student is asked for can be perfectly right while that claim
 * is impossible, and nothing else in this suite notices, because every
 * equation in the explanation still computes.
 *
 * Both instances in the material were exactly that shape. A delivery van cost
 * £28,000.00 on reducing balance at 25%, with £12,600.00 accumulated. The
 * charge asked for, 25% of £15,400.00, was right. But 25% of £28,000.00 is
 * £7,000.00 and then £5,250.00, so the accumulated figure can only ever be
 * £7,000.00, £12,250.00, £15,687.50 — never £12,600.00. A student who checked
 * the table against the method would find it did not hold, and would have been
 * right. The same table's two straight-line assets were each exactly two years
 * in, so the van was the only one that could not have happened.
 *
 * WHAT THIS ASSERTS, wherever a cost, an accumulated depreciation and a rate
 * appear together for one asset:
 *
 *   reducing balance    accumulated = cost × (1 − (1 − rate)^n) for a whole n
 *   straight line       accumulated = n × (cost ÷ life) for a whole n ≤ life
 *
 * Both are the definition of the method, so neither can be wrong about a
 * legitimate figure. A part-year first charge would break the whole-n rule,
 * and would be a real finding: none of this material charges part years, and
 * a question that started would have to say so in the row itself.
 *
 * WHERE IT LOOKS. Structured dataset rows carrying a cost column, an
 * accumulated depreciation column and a method column; and prose sentences
 * naming all three. The prose pattern is deliberately narrow — it fires only
 * when one sentence carries a cost, an accumulated figure and a percentage on
 * a named balance method. Prose it does not recognise is silently not checked,
 * so this is a tripwire over prose and a proof over the tables. Saying which
 * is the point: a checker believed to be exhaustive when it is not is worse
 * than one whose reach is written down.
 *
 * Run: node scripts/check-depreciation-history.js   (exit 1 on any failure)
 */

'use strict';

const path = require('path');
const ROOT = path.join(__dirname, '..');
const RED = '\x1b[31m', GREEN = '\x1b[32m', DIM = '\x1b[2m', BOLD = '\x1b[1m', RESET = '\x1b[0m';

const FILES = [
  ['AAT L3 TPFB', 'aat3-learn-data.js'],
  ['AAT L3 FAPS', 'aat3-faps-data.js'],
  ['AAT L3 MATS', 'aat3-mats-data.js'],
  ['AAT L3 BUAW', 'aat3-buaw-data.js'],
  ['AAT L3 TPFB practice', 'aat3-practice-data.js'],
  ['AAT L2', 'data.js'],
  ['AAT L2 lessons', 'learn-data.js'],
  ['AAT L1', 'aat1-practice-data.js'],
  ['AAT L1 lessons', 'aat1-learn-data.js'],
];

const money = s => Number(String(s).replace(/[£,\s]/g, ''));
const close = (a, b) => Math.abs(a - b) < 0.005;

/* Reachable under the method, or the list of figures that would have been. */
function reducing(cost, rate) {
  const out = []; let acc = 0;
  for (let n = 0; n < 60; n++) { acc += (cost - acc) * rate; out.push(acc); }
  return out;
}
function straight(cost, life) {
  const out = []; const charge = cost / life;
  for (let n = 1; n <= life; n++) out.push(charge * n);
  return out;
}
function reachable(steps, acc) { return steps.some(s => close(s, acc)); }
function nearest(steps, acc) {
  return steps.filter(s => s <= acc * 2).slice(0, 4).map(s => s.toFixed(2)).join(', ');
}

/* A method cell or clause: which method, and the number that drives it. */
function readMethod(text) {
  const t = String(text);
  const pct = t.match(/(\d+(?:\.\d+)?)\s*%/);
  if (/(reducing|diminishing)\s+balance/i.test(t) && pct) {
    return { kind: 'reducing balance', rate: Number(pct[1]) / 100 };
  }
  const life = t.match(/straight[\s-]*line[^.]*?(\d+)\s*years?/i);
  if (life && !/residual value of|residual value £/i.test(t)) {
    return { kind: 'straight line', life: Number(life[1]) };
  }
  return null;
}

const problems = [];
let checked = 0;

function assess(where, label, cost, acc, method) {
  if (!(cost > 0) || !(acc >= 0) || !method) return;
  const steps = method.kind === 'reducing balance'
    ? reducing(cost, method.rate)
    : straight(cost, method.life);
  checked++;
  if (reachable(steps, acc)) return;
  problems.push(`${where} — ${label}: ${acc.toFixed(2)} accumulated on a cost of `
    + `${cost.toFixed(2)} under ${method.kind} is not a whole number of years of `
    + `charges. The figures that are: ${nearest(steps, acc)}`);
}

/* Tables: a cost column, an accumulated depreciation column and a method. */
function fromDataset(where, ds) {
  const h = (ds.headers || []).map(x => String(x));
  const iCost = h.findIndex(x => /cost/i.test(x));
  const iAcc = h.findIndex(x => /accumulated\s+depreciation/i.test(x));
  const iMethod = h.findIndex(x => /method|policy|basis/i.test(x));
  if (iCost < 0 || iAcc < 0 || iMethod < 0) return;
  (ds.rows || []).forEach(row => {
    const name = String(row[0] || '').trim() || 'row';
    assess(where, name, money(row[iCost]), money(row[iAcc]), readMethod(row[iMethod]));
  });
}

/* Prose: one sentence carrying all three. */
const SENTENCE = /[^.;]+[.;]?/g;
const PROSE = /cost(?:s|ing)?\s*(?:of\s*)?£([\d,]+(?:\.\d{2})?)\b[\s\S]{0,160}?accumulated depreciation of £([\d,]+(?:\.\d{2})?)\b[\s\S]{0,160}?(\d+(?:\.\d+)?)\s*%[^.;]{0,60}?(reducing|diminishing) balance/i;

function fromProse(where, text) {
  const sentences = String(text).match(SENTENCE) || [];
  sentences.forEach(s => {
    const m = s.match(PROSE);
    if (!m) return;
    assess(where, s.trim().slice(0, 60) + '…', money(m[1]), money(m[2]),
      { kind: 'reducing balance', rate: Number(m[3]) / 100 });
  });
}

function walk(where, node, seen) {
  if (!node || typeof node !== 'object') return;
  if (seen.has(node)) return;
  seen.add(node);
  if (Array.isArray(node)) { node.forEach(v => walk(where, v, seen)); return; }
  if (Array.isArray(node.headers) && Array.isArray(node.rows)) fromDataset(where, node);
  Object.keys(node).forEach(k => {
    const v = node[k];
    if (typeof v === 'string') fromProse(where, v);
    else walk(where, v, seen);
  });
}

FILES.forEach(([label, file]) => {
  let mod;
  try { mod = require(path.join(ROOT, file)); } catch (e) { return; }
  walk(label, mod, new Set());
});

console.log(`${BOLD}Depreciation histories${RESET}\n`);
if (problems.length) {
  problems.forEach(p => console.log(`  ${RED}✗${RESET} ${p}`));
  console.log();
  console.log(`${RED}${BOLD}── ${problems.length} asset${problems.length === 1 ? '' : 's'} could not have reached the accumulated depreciation stated${RESET}`);
  process.exit(1);
}
if (checked < 4) {
  console.log(`  ${RED}✗${RESET} only ${checked} assets were found to check; this gate has stopped reaching the material`);
  console.log();
  console.log(`${RED}${BOLD}── The sweep found nothing to check${RESET}`);
  process.exit(1);
}
console.log(`  ${DIM}${checked} cost-and-accumulated pairs recomputed from the method that produced them.${RESET}`);
console.log();
console.log(`${GREEN}${BOLD}── Every stated depreciation history is one the policy could have produced ✓${RESET}`);
