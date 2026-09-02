#!/usr/bin/env node
/**
 * Does the arithmetic written in an explanation actually compute?
 *
 * An explanation is where a reader goes when they got a question wrong, so it
 * is the last place a wrong figure should be. And a wrong figure there is
 * invisible to everything else in this suite: the answer key can be right, the
 * options parallel, the distractors sound, the coverage complete — and the
 * explanation can still say "£2,984.00 + £5,120.50 = £8,014.50", teaching the
 * arithmetic wrongly to precisely the reader who needed it taught.
 *
 * The existing quality gates check that a numeric question's stated answer
 * APPEARS somewhere in its explanation. That is a weaker property than it
 * sounds, and it was passing an explanation that contained the answer, a
 * different figure, and a sentence saying the answer was wrong.
 *
 * So this recomputes instead. Every equation in every explanation, in every
 * bank, is parsed and evaluated:
 *
 *   a + b + c = d          chains of any length, left to right
 *   a − b − c = d          the same, and mixed with +
 *   a × b ÷ c = d          chains of factors and divisors, left to right
 *   a × n% = c             a percentage of an amount
 *   n% of a is c           the same, written as prose
 *
 * WHAT IT DELIBERATELY DOES NOT DO is try to parse mixed precedence — "a + b ×
 * c = d" is left alone rather than guessed at, because a checker that is
 * sometimes wrong about the rules of arithmetic is worse than no checker: it
 * trains people to dismiss its output. Every pattern here has one unambiguous
 * reading.
 *
 * Two false-positive shapes cost real time when this was written, and both are
 * handled rather than tolerated: a four-term sum read as its last three terms,
 * and a three-factor product read as its last two. Any pattern here matches the
 * LONGEST chain, not a tail of one.
 *
 * Run: node scripts/check-explanation-arithmetic.js   (exit 1 on any failure)
 */

'use strict';

const path = require('path');
const ROOT = path.join(__dirname, '..');

const RED = '\x1b[31m', GREEN = '\x1b[32m', DIM = '\x1b[2m', BOLD = '\x1b[1m', RESET = '\x1b[0m';

/* Every bank with explanations a reader relies on. */
function load() {
  const out = [];
  const push = (label, qs) => { if (Array.isArray(qs) && qs.length) out.push([label, qs]); };

  push('AAT L1 practice', require(path.join(ROOT, 'aat1-practice-data.js')).AAT1_PRACTICE.QUESTIONS);
  const l1learn = require(path.join(ROOT, 'aat1-learn-data.js')).AAT1_LEARN_PATH || [];
  const l1checks = [];
  l1learn.forEach(g => (g.lessons || []).forEach(l => (l.check || []).forEach((q, i) =>
    l1checks.push(Object.assign({ id: `${l.id} Q${i + 1}` }, q)))));
  push('AAT L1 lesson checks', l1checks);

  push('AAT L3 TPFB practice', require(path.join(ROOT, 'aat3-practice-data.js')).AAT3_PRACTICE.QUESTIONS);
  const faps = require(path.join(ROOT, 'aat3-faps-data.js'));
  push('AAT L3 FAPS practice', (faps.AAT3_FAPS_PRACTICE || {}).QUESTIONS);
  const mats = require(path.join(ROOT, 'aat3-mats-data.js'));
  push('AAT L3 MATS practice', (mats.AAT3_MATS_PRACTICE || {}).QUESTIONS);
  const l3checks = [];
  [].concat(require(path.join(ROOT, 'aat3-learn-data.js')).AAT3_LEARN_PATH || [], faps.AAT3_FAPS_PATH || [],
            mats.AAT3_MATS_PATH || [])
    .forEach(g => (g.lessons || []).forEach(l => (l.check || []).forEach((q, i) =>
      l3checks.push(Object.assign({ id: `${l.id} Q${i + 1}` }, q)))));
  push('AAT L3 lesson checks', l3checks);

  return out;
}

const T = String.raw`£?-?[\d,]+(?:\.\d+)?`;
const CHAIN = new RegExp(`(${T})((?:\\s*[+−-]\\s*${T})+)\\s*=\\s*(${T})`, 'g');
const TERM = new RegExp(`([+−-])\\s*(${T})`, 'g');
/* × and ÷ share a precedence, so one chain handles both and is evaluated left
   to right. Splitting them into two patterns is what produced the check's first
   five false alarms: "£3,660 × 20 ÷ 120 = £610.00" was read by the division
   pattern as "20 ÷ 120 = £610.00". */
const MULDIV = new RegExp(`(${T})((?:\\s*[×x*÷]\\s*${T})+)\\s*=\\s*(${T})`, 'g');
const FACT = new RegExp(`([×x*÷])\\s*(${T})`, 'g');
const PCT = new RegExp(`(${T})\\s*[×x*]\\s*([\\d.]+)%\\s*=\\s*(${T})`, 'g');
/* "15% of £480.00 is £72.00" — the same statement written as prose. Worth
   parsing because it is the form authors reach for first, and a checker that
   only understood the symbolic form left the commonest phrasing unguarded. */
const PCT_OF = new RegExp(`([\\d.]+)%\\s*of\\s*(${T})\\s*is\\s*(${T})`, 'g');

const num = s => Number(String(s).replace(/[£,\s]/g, ''));
/* A penny of tolerance, doubled: explanations legitimately round a recurring
   figure to the nearest penny before stating it. */
const close = (x, y) => Math.abs(x - y) < 0.02;

/* Every string a question can put in front of a reader, not just `exp`: a
   worked step or a part explanation is read exactly as closely. */
function prose(q) {
  const out = [];
  (function walk(x) {
    if (typeof x === 'string') out.push(x);
    else if (Array.isArray(x)) x.forEach(walk);
    else if (x && typeof x === 'object') Object.values(x).forEach(walk);
  }(q));
  return out;
}

const problems = [];
let checked = 0;

load().forEach(([label, bank]) => {
  bank.forEach(q => {
    prose(q).forEach(text => {
      let m;
      const bad = (found, got) => problems.push(
        `${label} ${q.id || '(no id)'}: "${found.trim()}" computes to ${got.toFixed(2)}`);

      PCT.lastIndex = 0;
      while ((m = PCT.exec(text))) {
        const got = num(m[1]) * Number(m[2]) / 100; checked++;
        if (!close(got, num(m[3]))) bad(m[0], got);
      }
      PCT_OF.lastIndex = 0;
      while ((m = PCT_OF.exec(text))) {
        const got = num(m[2]) * Number(m[1]) / 100; checked++;
        if (!close(got, num(m[3]))) bad(m[0], got);
      }
      MULDIV.lastIndex = 0;
      while ((m = MULDIV.exec(text))) {
        if (/%/.test(m[0])) continue;                 // handled by PCT
        let acc = num(m[1]), f; FACT.lastIndex = 0;
        while ((f = FACT.exec(m[2]))) acc = f[1] === '÷' ? acc / num(f[2]) : acc * num(f[2]);
        checked++;
        if (!close(acc, num(m[3]))) bad(m[0], acc);
      }
      CHAIN.lastIndex = 0;
      while ((m = CHAIN.exec(text))) {
        let acc = num(m[1]), t; TERM.lastIndex = 0;
        while ((t = TERM.exec(m[2]))) acc = t[1] === '+' ? acc + num(t[2]) : acc - num(t[2]);
        checked++;
        if (!close(acc, num(m[3]))) bad(m[0], acc);
      }
    });
  });
});

console.log(`${BOLD}Arithmetic in explanations${RESET}\n`);
if (problems.length) {
  problems.forEach(p => console.log(`  ${RED}✗${RESET} ${p}`));
  console.log();
  console.log(`${RED}${BOLD}── ${problems.length} equation${problems.length === 1 ? '' : 's'} in an explanation do not compute${RESET}`);
  process.exit(1);
}
console.log(`  ${DIM}${checked} equations recomputed across every AAT bank.${RESET}`);
console.log();
console.log(`${GREEN}${BOLD}── Every equation an explanation states actually computes ✓${RESET}`);
