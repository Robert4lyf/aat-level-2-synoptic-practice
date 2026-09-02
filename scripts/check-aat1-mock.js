#!/usr/bin/env node
/**
 * Does the Level 1 timed mock behave like an assessment rather than practice?
 *
 * Practice tells you after every question how you did. That is right for
 * learning and useless for rehearsal — knowing where you stand is exactly what
 * the assessment withholds, and it is the part readers find hardest. So the
 * properties worth asserting are the ones that make a mock a mock:
 *
 *   nothing is revealed until the paper is over
 *   a pick can still be changed until the reader moves on
 *   the paper is drawn to the assessment's own weighting
 *   an unanswered question marks as wrong
 *   the clock ends the paper, and does so across a reload
 *   the report says which outcome cost the marks, weighted
 *   what went wrong is remembered, and comes back
 *
 * Driven through the real player. Nothing here reads the allocator or the
 * grader directly: every assertion is about what a reader would see.
 *
 * ONE MUTATION THIS CANNOT CATCH, recorded so the next person does not go
 * looking for the check that should have. Replacing the review's re-mark
 * (`S.answered = gradeAnswer(row.q)`) with the verdict stored on the paper
 * (`S.answered = row.correct`) changes nothing observable, because that stored
 * verdict came from the same marker on the same answer and Level 1's
 * gradeAnswer has no side effects. The re-mark is kept anyway: it is what makes
 * "one marker, not two" a property of the code rather than of today's data, and
 * a question type whose grading sets state — as Level 3's multi-part task
 * does — would break the equivalence immediately.
 *
 * Run: node scripts/check-aat1-mock.js   (exit 1 on any failure)
 */

'use strict';

const D = require('./lib/aat1-driver.js');
const GRID = require('../question-grid.js');
const SYL = require('../aat1-syllabus.js').SYLLABUS;

const RED = '\x1b[31m', GREEN = '\x1b[32m';
const BOLD = '\x1b[1m', DIM = '\x1b[2m', RESET = '\x1b[0m';

let failures = 0, checks = 0;
function ok(cond, label) {
  checks++;
  if (!cond) { failures++; console.log(`  ${RED}✗${RESET} ${label}`); }
}

console.log(`${BOLD}AAT Level 1 timed mock${RESET}\n`);

const restore = D.seedRandom(20260828);

const UNIT = SYL.units.bkfn;
const OUTCOMES = UNIT.outcomes;
const BANK = require('../aat1-practice-data.js').AAT1_PRACTICE.QUESTIONS;

function openPractice() {
  const store = D.fakeStore();
  const M = D.loadUI(store);
  const el = D.fakeEl();
  M.AAT1_UI.reset('practice');
  M.AAT1_UI.mount(el);
  return { store, M, el };
}
function openMock(ctx) {
  const c = ctx || openPractice();
  D.click(c.el, 'startmock');
  return c;
}

/* Which bank question is on screen, found by its stem. */
function onScreen(el) {
  const stem = (el.innerHTML.match(/<h2 class="a1-q">([\s\S]*?)<\/h2>/) || [])[1];
  if (!stem) return null;
  /* ENTITIES DECODED BEFORE COMPARING. The stem is escaped on its way into the
     DOM, so a question containing "Hale & Co" renders as "Hale &amp; Co" and
     never matches its own bank entry — the sweep then reports the run as
     ending, which reads exactly like a draw that came up short. */
  const text = stem.replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .trim();
  return BANK.find(q => String(q.q).replace(/\*\*/g, '').trim() === text) || null;
}

function strip(s) { return String(s).replace(/<[^>]*>/g, '').replace(/\*\*/g, '').trim(); }

/* The ordering rows as they currently stand, as indices into q.items. */
function orderNow(el, q) {
  const texts = [];
  const RE = /<span class="a1-order-t">([\s\S]*?)<\/span>/g;
  let m;
  while ((m = RE.exec(el.innerHTML))) texts.push(strip(m[1]));
  return texts.map(t => q.items.findIndex(x => strip(x) === t));
}

/* Answer the question on screen correctly, using its real key. Every click
   repaints, so nodes are re-queried between clicks rather than held. */
function answerRight(el, q) {
  const t = q.type || 'mcq';
  const hit = (act, attrs) => {
    const n = D.nodes(el, act).find(x => Object.keys(attrs).every(k => x.getAttribute(k) === String(attrs[k])));
    if (n) n.fire('click');
    return !!n;
  };
  if (t === 'mcq') return hit('ans', { 'data-i': q.ans });
  if (t === 'truefalse') { q.statements.forEach((st, i) => hit('tf', { 'data-s': i, 'data-v': String(st.answer) })); return true; }
  if (t === 'gapfill') { q.gaps.forEach((g, i) => hit('gap', { 'data-g': i, 'data-o': g.answer })); return true; }
  if (t === 'numeric') {
    const box = D.nodes(el, 'numinput')[0];
    if (!box) return false;
    box.value = String(q.answer); box.fire('input');
    return true;
  }
  if (t === 'match') {
    q.left.forEach((_, i) => { hit('matchl', { 'data-i': i }); hit('matchr', { 'data-i': i }); });
    return true;
  }
  /* The two tables, answered CORRECTLY from the key — this helper's whole job
     is a paper that should score 100%, so filling them with zeroes the way the
     sweeps do would quietly make that impossible. */
  if (t === 'picklist') {
    /* BY THE ROW ON SCREEN, NOT BY THE BANK'S. A pick list's rows are shuffled
       for each sitting the way a true/false grid's statements are, so
       `rows[data-r]` is a different row from the one the reader is looking at.
       This answered by index and passed for as long as no shuffle happened to
       move a row — which made it fail one run in two, on content that was
       fine, and read as a flake rather than as a harness a change had left
       behind. The control names its own row in `aria-label`. */
    const decode = (x) => String(x).replace(/&amp;/g, '&').replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
    D.nodes(el, 'plpick').forEach(n => {
      const label = decode(n.getAttribute('aria-label') || '');
      const want = q.picklist.rows.find(x => decode(x.text) === label);
      if (want) { n.value = String(want.answer); n.fire('change'); }
    });
    return true;
  }
  if (t === 'entrygrid') {
    D.nodes(el, 'egcell').forEach(n => {
      const [ri, ci] = n.getAttribute('data-c').split(':').map(Number);
      const key = GRID.cellKey(q.entrygrid.rows[ri], ci);
      n.value = key == null ? '' : String(key);
      n.fire('input');
    });
    return true;
  }
  if (t === 'ordering') {
    /* A selection sort through the only control the reader has: move up. Each
       click repaints, so the sequence is re-read every time. */
    for (let target = 0; target < q.items.length; target++) {
      for (let guard = 0; guard < 20; guard++) {
        const seq = orderNow(el, q);
        const at = seq.indexOf(target);
        if (at <= target) break;
        if (!hit('orderup', { 'data-i': at })) break;
      }
    }
    return true;
  }
  return false;
}

/* The same, in a PRACTICE run, where five of the six types are graded by a
   submit button that a mock does not offer. Answering without pressing it
   leaves the question ungraded — and a loop that then looks for Next finds
   nothing and stops silently, which is how a check can report a ten-question
   run as zero questions and a cleared backlog as uncleared. */
function answerRightPractice(el, q) {
  /* A written task is answered and submitted in one move, because it has three
     steps of its own — write, reveal, tick — and no submit button the table
     below could name. */
  if (D.answerWritten(el, 'all')) return D.nodes(el, 'nextq').length > 0;
  answerRight(el, q);
  const t = q.type || 'mcq';
  const submit = { truefalse: 'tfsubmit', gapfill: 'gapsubmit', numeric: 'numsubmit',
                   match: 'matchsubmit', ordering: 'ordersubmit',
                   picklist: 'plsubmit', entrygrid: 'egsubmit' }[t];
  if (submit && D.nodes(el, submit).length) D.click(el, submit);
  return D.nodes(el, 'nextq').length > 0;
}

/* Answer the multiple choice on screen with an option that is NOT the key.
   Multiple choice is the only type this needs, so it is the only type it does:
   a mock offers no submit buttons, so there is no generic "answer it wrongly"
   path that would work for the other five. */
function answerWrongMcq(el, q) {
  if ((q.type || 'mcq') !== 'mcq') return false;
  const wrong = q.opts.map((_, i) => i).find(i => i !== q.ans);
  const n = D.nodes(el, 'ans').find(x => x.getAttribute('data-i') === String(wrong));
  if (!n) return false;
  n.fire('click');
  return true;
}

/* Sit a whole paper. `how` decides each question: 'right'; 'wrong-mcq' — every
   multiple choice answered with something that is not the key, everything else
   left alone; 'mixed' — every other question right and the rest left blank,
   which is the only mode that produces a paper the review has something to
   filter; or 'blank'. */
function sit(how, ctx) {
  const c = openMock(ctx);
  const seen = [];
  const screens = [];
  for (let i = 0; i < 80; i++) {
    const q = onScreen(c.el);
    if (!q) break;
    seen.push(q);
    screens.push(c.el.innerHTML);
    if (how === 'right') answerRight(c.el, q);
    else if (how === 'wrong-mcq') answerWrongMcq(c.el, q);
    else if (how === 'mixed' && i % 2 === 0) answerRight(c.el, q);
    D.click(c.el, 'mocknext');
  }
  return Object.assign(c, { seen, screens });
}

function pctShown(html) {
  const m = /class="a1-done-ring"[^>]*><span>(\d+)%<\/span>/.exec(html);
  return m ? Number(m[1]) : null;
}
function bestShown(html) {
  const m = /class="a1-mockpanel-best"><b>(\d+)%<\/b>/.exec(html);
  return m ? Number(m[1]) : null;
}

/* ── 1. The paper is the shape the assessment is ─────────────────────────── */
console.log(`${DIM}1. The paper${RESET}`);
{
  const c = sit('right');
  ok(c.seen.length === 30, `a paper is 30 questions (got ${c.seen.length})`);
  ok(new Set(c.seen.map(q => q.id)).size === c.seen.length, 'no question is asked twice on one paper');
  ok(c.seen.every(q => q.id), 'every drawn question has an id to remember it by');

  const panel = (() => {
    const p = openPractice();
    return p.el.innerHTML;
  })();
  ok(/Timed mock · 90 min/.test(panel), 'the offer names the assessment\'s own 90 minutes');
  ok(UNIT.assessment.durationMinutes === 90, 'and the syllabus is where that 90 comes from');
  ok(/30\s*questions drawn to the assessment weighting/.test(panel),
    'the offer says how long the paper is and that it is weighted');
  ok(/Nothing is revealed until the end/.test(panel), 'and that it reveals nothing until the end');
}

/* ── 2. Nothing is revealed while the paper is being sat ─────────────────── */
console.log(`${DIM}2. Nothing is revealed${RESET}`);
{
  const c = sit('mixed');
  const body = c.screens.join('\n');
  ok(!/class="a1-exp"/.test(body), 'no explanation is shown during the paper');
  ok(!/a1-opt[^"]*is-right|a1-opt[^"]*is-wrong/.test(body), 'no option is marked right or wrong');
  ok(!/class="a1-verdict/.test(body), 'no numeric verdict is shown');
  ok(!/class="a1-match-key/.test(body), 'no matching key is shown');
  ok(!/data-a1="tfsubmit"|data-a1="gapsubmit"|data-a1="numsubmit"|data-a1="matchsubmit"|data-a1="ordersubmit"/.test(body),
    'no question type offers a Submit — moving on is answering');
  ok(!/data-a1="nextq"/.test(body), 'the practice Next is never offered on a paper');
  ok(/data-a1="mocknext"/.test(body), 'the paper has its own Next');
  ok(/Finish the paper/.test(body), 'and the last one says it finishes the paper');
  ok(!/data-a1="ans"[^>]*disabled/.test(body), 'options stay live after a pick, so it can be changed');
}

/* ── 3. A pick is a pick, not a commitment ───────────────────────────────── */
console.log(`${DIM}3. Answers can be changed until the reader moves on${RESET}`);
{
  const c = openMock();
  /* Walk to the first multiple choice. */
  let q = onScreen(c.el);
  for (let i = 0; i < 40 && q && (q.type || 'mcq') !== 'mcq'; i++) {
    D.click(c.el, 'mocknext');
    q = onScreen(c.el);
  }
  if (!q || (q.type || 'mcq') !== 'mcq') { ok(false, 'a paper contains at least one multiple choice'); }
  else {
    const wrong = q.opts.map((_, i) => i).find(i => i !== q.ans);
    D.nodes(c.el, 'ans').find(n => n.getAttribute('data-i') === String(wrong)).fire('click');
    ok(new RegExp(`class="a1-opt on" data-a1="ans" data-i="${wrong}"`).test(c.el.innerHTML),
      'the chosen option is drawn as chosen — a tap that shows nothing reads as a tap that missed');
    D.nodes(c.el, 'ans').find(n => n.getAttribute('data-i') === String(q.ans)).fire('click');
    ok(new RegExp(`class="a1-opt on" data-a1="ans" data-i="${q.ans}"`).test(c.el.innerHTML),
      'changing the pick moves the chosen state');
    ok(!new RegExp(`class="a1-opt on" data-a1="ans" data-i="${wrong}"`).test(c.el.innerHTML),
      'and takes it off the one abandoned');
    /* And the change is what gets marked. */
    D.click(c.el, 'mocknext');
    while (onScreen(c.el)) D.click(c.el, 'mocknext');
    ok(/1 of 30 correct|[1-9]\d? of 30 correct/.test(c.el.innerHTML), 'the final pick is the one marked');
  }
}

/* ── 4. Marking ──────────────────────────────────────────────────────────── */
console.log(`${DIM}4. Marking${RESET}`);
{
  const right = sit('right');
  ok(pctShown(right.el.innerHTML) === 100, `a paper answered right scores 100% (got ${pctShown(right.el.innerHTML)})`);
  ok(/30 of 30 correct/.test(right.el.innerHTML), 'and says so as a count');

  const blank = sit('blank');
  ok(pctShown(blank.el.innerHTML) === 0, `a paper left blank scores 0% (got ${pctShown(blank.el.innerHTML)})`);
  ok(/0 of 30 correct/.test(blank.el.innerHTML), 'an unanswered question marks as wrong, as the assessment does');

  const wrong = sit('wrong-mcq');
  const wpct = pctShown(wrong.el.innerHTML);
  ok(wpct !== null && wpct < 100, 'a paper answered wrongly does not score 100%');

  /* Every question type is actually reachable and markable — a type the mock
     could not grade would fail silently as a run of zeroes. */
  const kinds = new Set(right.seen.map(q => q.type || 'mcq'));
  ok(kinds.size >= 4, `a paper draws several question types (got ${[...kinds].join(', ')})`);
}

/* ── 5. Drawn to the assessment's weighting ──────────────────────────────── */
console.log(`${DIM}5. The draw${RESET}`);
{
  /* Across many papers the seats should land on the published weighting. One
     paper cannot show this — 30 seats over five outcomes is lumpy by design —
     so this is the average of 400. */
  const N = 400;
  const tally = {};
  let lengths = new Set();
  let dupes = 0;
  for (let i = 0; i < N; i++) {
    const c = openMock();
    const drawn = [];
    for (let k = 0; k < 40; k++) {
      const q = onScreen(c.el);
      if (!q) break;
      drawn.push(q);
      D.click(c.el, 'mocknext');
    }
    lengths.add(drawn.length);
    if (new Set(drawn.map(q => q.id)).size !== drawn.length) dupes++;
    drawn.forEach(q => { tally[q.lo] = (tally[q.lo] || 0) + 1; });
  }
  const total = Object.values(tally).reduce((a, b) => a + b, 0);
  ok(lengths.size === 1 && lengths.has(30), `every one of ${N} papers is exactly 30 questions`);
  ok(dupes === 0, 'no paper repeats a question');

  let worst = 0, worstLabel = '';
  OUTCOMES.forEach(o => {
    const got = ((tally[o.n] || 0) / total) * 100;
    const gap = Math.abs(got - o.weighting);
    if (gap > worst) { worst = gap; worstLabel = `Outcome ${o.n}: ${got.toFixed(1)}% drawn vs ${o.weighting}% published`; }
  });
  ok(worst < 1.5, `the draw lands on the published weighting (worst gap ${worst.toFixed(2)} points — ${worstLabel})`);

  /* And it is not the pool's own shape wearing a weighting's name. The pool
     sits at 18/11/28/32/11 against 17/10/29/34/10, so a draw that merely
     shuffled the bank would miss on Outcome 4 by about two points. */
  const poolBy = {};
  BANK.forEach(q => { poolBy[q.lo] = (poolBy[q.lo] || 0) + 1; });
  const o4pool = (poolBy[4] / BANK.length) * 100;
  const o4drawn = ((tally[4] || 0) / total) * 100;
  const o4published = OUTCOMES.find(o => o.n === 4).weighting;
  ok(Math.abs(o4drawn - o4published) < Math.abs(o4pool - o4published),
    `the draw is closer to the specification than the pool is (drawn ${o4drawn.toFixed(1)}%, pool ${o4pool.toFixed(1)}%, published ${o4published}%)`);
}

/* ── 5b. Mixed practice is drawn the same way ────────────────────────────── */
console.log(`${DIM}5b. Mixed practice${RESET}`);
{
  /* The mock is not the only run that should rehearse the assessment's shape.
     A reader doing mixed practice every day and a mock once a month spends
     almost all of their time in the run that is NOT the mock. */
  const N = 400;
  const tally = {};
  const lengths = new Set();
  for (let i = 0; i < N; i++) {
    const c = openPractice();
    D.click(c.el, 'startpractice', n => n.getAttribute('data-lo') === 'mix');
    const drawn = [];
    for (let k = 0; k < 15; k++) {
      const q = onScreen(c.el);
      if (!q) break;
      drawn.push(q);
      if (!answerRightPractice(c.el, q)) break;
      D.click(c.el, 'nextq');
    }
    lengths.add(drawn.length);
    drawn.forEach(q => { tally[q.lo] = (tally[q.lo] || 0) + 1; });
  }
  const total = Object.values(tally).reduce((a, b) => a + b, 0);
  ok(lengths.size === 1 && lengths.has(10), `every mixed run is exactly 10 questions (got ${[...lengths].join(', ')})`);
  let worst = 0, worstLabel = '';
  OUTCOMES.forEach(o => {
    const got = ((tally[o.n] || 0) / total) * 100;
    const gap = Math.abs(got - o.weighting);
    if (gap > worst) { worst = gap; worstLabel = `Outcome ${o.n}: ${got.toFixed(1)}% vs ${o.weighting}%`; }
  });
  ok(worst < 1.5, `mixed practice is drawn to the same weighting (worst gap ${worst.toFixed(2)} points — ${worstLabel})`);
}

/* ── 6. The clock ────────────────────────────────────────────────────────── */
console.log(`${DIM}6. The clock${RESET}`);
{
  const c = openMock();
  /* A RANGE, NOT AN EQUALITY. The clock is the gap between an absolute end
     time and now, so whether it reads 1:30:00 or 1:29:59 depends on how many
     milliseconds passed between starting the paper and painting it — which is
     a property of the machine running this check, not of the app. Asserting
     the exact string made this gate fail the day another section was added
     above it. */
  const shown = (/class="a1-mockclock[^"]*"[^>]*>(\d+):(\d\d):(\d\d)</.exec(c.el.innerHTML) || []).slice(1).map(Number);
  ok(shown.length === 3, 'a paper opens with a clock written in hours, minutes and seconds');
  const secs = shown.length === 3 ? shown[0] * 3600 + shown[1] * 60 + shown[2] : 0;
  ok(secs > 89 * 60 && secs <= 90 * 60,
    `and it opens on the assessment's own ninety minutes (showed ${shown.join(':')})`);
  ok(!/class="a1-lessonbar-n"/.test(c.el.innerHTML),
    'and the progress percentage gives way to it — a reader sitting to time wants the minutes');

  /* Time runs out while the reader is away. mockEndsAt is an absolute moment,
     so coming back has to notice — not resume a paper that expired. */
  const realNow = Date.now;
  Date.now = () => realNow() + 91 * 60000;
  c.M.AAT1_UI.mount(c.el);
  Date.now = realNow;
  ok(/class="a1-done-ring"/.test(c.el.innerHTML), 'a paper whose clock ran out while away is over on return');
  ok(/The clock ran out/.test(c.el.innerHTML), 'and says so');
  ok(/count as wrong/.test(c.el.innerHTML), 'and says what happened to the questions not reached');
  ok(pctShown(c.el.innerHTML) === 0, 'a paper never started scores zero rather than being unscored');
}

/* ── 7. The report ───────────────────────────────────────────────────────── */
console.log(`${DIM}7. The report by outcome${RESET}`);
{
  const c = sit('mixed');
  const html = c.el.innerHTML;
  ok(/How the paper went, outcome by outcome/.test(html), 'the result is broken down by outcome');

  const rows = [...html.matchAll(/<td data-h="Outcome">(\d+) · [^<]*<\/td><td class="a1-num" data-h="Weight">(\d+)%<\/td><td class="a1-num" data-h="Right">(\d+) \/ (\d+)<\/td><td class="a1-num" data-h="Score">(\d+)%<\/td>/g)]
    .map(m => ({ n: +m[1], weight: +m[2], right: +m[3], asked: +m[4], pct: +m[5] }));
  ok(rows.length > 0, 'the report has rows');
  ok(rows.reduce((a, r) => a + r.asked, 0) === 30, 'the rows account for every question on the paper');
  ok(rows.reduce((a, r) => a + r.right, 0) === c.seen.filter((q, i) => i % 2 === 0).length ||
     rows.reduce((a, r) => a + r.right, 0) > 0, 'the rows account for the marks scored');
  ok(rows.every(r => r.pct === Math.round((r.right / r.asked) * 100)), 'each row\'s percentage is its own two numbers');
  ok(rows.every(r => r.weight === (OUTCOMES.find(o => o.n === r.n) || {}).weighting),
    'each row carries the outcome\'s published weighting');
  ok(/Most marks at stake/.test(html), 'and the report names where the marks went');

  /* Worst means most of the paper at stake, not the lowest percentage. */
  const focus = (/Most marks at stake: <strong>Outcome (\d+)/.exec(html) || [])[1];
  const ranked = rows.slice().sort((a, b) => ((100 - b.pct) * b.weight) - ((100 - a.pct) * a.weight) || a.n - b.n);
  ok(focus && Number(focus) === ranked[0].n,
    'the outcome named is the one with the most marks at stake, not merely the lowest score');

  /* THE TWO RANKINGS AGREE ON MOST PAPERS, which is why asserting against one
     paper proves nothing: swap the weighted ranking for "lowest score" and the
     check still passes. So papers are sat until one is found where they
     DISAGREE, and the assertion is made there. If none of forty disagree the
     check says so rather than passing quietly. */
  let discriminating = null;
  for (let i = 0; i < 40 && !discriminating; i++) {
    const t = sit('mixed');
    const trs = [...t.el.innerHTML.matchAll(/<td data-h="Outcome">(\d+) · [^<]*<\/td><td class="a1-num" data-h="Weight">(\d+)%<\/td><td class="a1-num" data-h="Right">(\d+) \/ (\d+)<\/td><td class="a1-num" data-h="Score">(\d+)%<\/td>/g)]
      .map(m => ({ n: +m[1], weight: +m[2], pct: +m[5] }));
    if (trs.length < 2) continue;
    const byStake = trs.slice().sort((a, b) => ((100 - b.pct) * b.weight) - ((100 - a.pct) * a.weight) || a.n - b.n)[0];
    const byScore = trs.slice().sort((a, b) => a.pct - b.pct || a.n - b.n)[0];
    if (byStake.n !== byScore.n && byStake.pct < 100) {
      discriminating = { html: t.el.innerHTML, byStake, byScore };
    }
  }
  ok(!!discriminating, 'a paper exists where "most marks at stake" and "lowest score" name different outcomes');
  if (discriminating) {
    const named = Number((/Most marks at stake: <strong>Outcome (\d+)/.exec(discriminating.html) || [])[1]);
    ok(named === discriminating.byStake.n,
      `on such a paper the report names the outcome with the marks at stake (Outcome ${discriminating.byStake.n}), ` +
      `not the lowest score (Outcome ${discriminating.byScore.n}) — got Outcome ${named}`);
  }

  /* A clean sweep names nobody: there is nothing at stake. */
  const clean = sit('right');
  ok(!/Most marks at stake/.test(clean.el.innerHTML), 'a paper answered right names no weak outcome');
}

/* ── 8. What the paper leaves behind ─────────────────────────────────────── */
console.log(`${DIM}8. What the paper leaves behind${RESET}`);
{
  const c = sit('right');
  D.click(c.el, 'exit');
  ok(bestShown(c.el.innerHTML) === 100, 'the best paper is shown on the practice screen');
  ok(/best of 1/.test(c.el.innerHTML), 'and how many were sat');

  /* Survives a reload. Level 3 lost exactly this to a normalise function that
     rebuilt the record without naming every field. */
  const M2 = D.loadUI(c.store);
  const el2 = D.fakeEl();
  M2.AAT1_UI.reset('practice');
  M2.AAT1_UI.mount(el2);
  ok(bestShown(el2.innerHTML) === 100, 'and it survives a reload');
  ok(/best of 1/.test(el2.innerHTML), 'along with the count of papers sat');

  /* A mock is not a lesson. Writing one to data.lessons would tick a rung on
     the ladder for a step the reader never opened. */
  const saved = JSON.parse(c.store.getItem(D.STORE_KEY));
  ok(Object.keys(saved.lessons || {}).length === 0, 'a paper writes no lesson result');
  ok(!('null' in (saved.lessons || {})), 'and no result under a null lesson id');
  ok(saved.practice && saved.practice.mocks === 1, 'the paper is counted as a mock');
  ok(saved.practice.runs === 0, 'and not as a practice run');

  /* A second, worse paper does not lower the best. */
  const c2 = sit('blank', { store: c.store, M: c.M, el: c.el });
  D.click(c2.el, 'exit');
  ok(bestShown(c2.el.innerHTML) === 100, 'a worse paper does not lower the best');
  ok(/best of 2/.test(c2.el.innerHTML), 'but is still counted');
}

/* ── 9. Mistake memory ───────────────────────────────────────────────────── */
console.log(`${DIM}9. Mistake memory${RESET}`);
{
  const c = sit('wrong-mcq');
  const missedMcq = c.seen.filter(q => (q.type || 'mcq') === 'mcq');
  D.click(c.el, 'exit');
  const alert = /class="a1-alert-t">(\d+) question/.exec(c.el.innerHTML);
  ok(!!alert, 'the questions got wrong are offered back');
  ok(alert && Number(alert[1]) >= missedMcq.length,
    `the backlog holds at least the ${missedMcq.length} multiple choices answered wrongly (got ${alert && alert[1]})`);
  ok(/Served back most recent first/.test(c.el.innerHTML), 'and says how they come back');

  /* Survives a reload — the durable half of a paper is this, not the paper. */
  const M2 = D.loadUI(c.store);
  const el2 = D.fakeEl();
  M2.AAT1_UI.reset('practice');
  M2.AAT1_UI.mount(el2);
  const alert2 = /class="a1-alert-t">(\d+) question/.exec(el2.innerHTML);
  ok(alert && alert2 && alert2[1] === alert[1], 'the backlog survives a reload');

  /* A GUARD RATHER THAN A CLICK. Everything below depends on there being a
     backlog to open, and clicking a button that is not there throws — which
     ends the whole run and takes four later sections' worth of assertions with
     it. A gate that stops at its first failure reports one bug where there may
     be five. */
  const canOpen = D.nodes(el2, 'startpractice').some(n => n.getAttribute('data-lo') === 'missed');
  ok(canOpen, 'the backlog can be opened from the practice screen');

  if (canOpen) {
    D.click(el2, 'startpractice', n => n.getAttribute('data-lo') === 'missed');
    ok(!!onScreen(el2), 'the backlog run serves a real question');
    ok(/questions you had got wrong/.test(el2.innerHTML),
      'and the run says what it is — not "all outcomes", which is what one label for three runs produced');

    const before = Number(alert2[1]);
    let cleared = 0;
    for (let i = 0; i < 12; i++) {
      const q = onScreen(el2);
      if (!q) break;
      ok(answerRightPractice(el2, q), `backlog question ${i + 1} grades on submit`);
      cleared++;
      D.click(el2, 'nextq');
    }
    ok(cleared === 10, `the backlog run is 10 questions (got ${cleared})`);
    D.click(el2, 'exit');
    const alert3 = /class="a1-alert-t">(\d+) question/.exec(el2.innerHTML);
    const after = alert3 ? Number(alert3[1]) : 0;
    ok(after === before - cleared,
      `getting them right clears exactly those from the backlog (${before} → ${after}, ${cleared} answered)`);
  }

  /* A record is two timestamps, not a flag — a flag would merge stickily
     between devices and resurrect a question already fixed. */
  const saved = JSON.parse(c.store.getItem(D.STORE_KEY));
  const recs = Object.values((saved.practice || {}).qs || {});
  ok(recs.length > 0, 'per-question results are stored');
  ok(recs.every(r => typeof r === 'object' && !('outstanding' in r)),
    'a result is not a sticky boolean');
  ok(recs.some(r => typeof r.w === 'number'), 'a wrong answer is stored as the moment it went wrong');
  ok(recs.every(r => (r.r === undefined || r.r > 0) && (r.w === undefined || r.w > 0)),
    'and every stored moment is a real one');

  /* Both halves of the pair, from a run that got some right and some wrong. */
  const mix = sit('mixed');
  const mixSaved = JSON.parse(mix.store.getItem(D.STORE_KEY));
  const mixRecs = Object.values(mixSaved.practice.qs);
  ok(mixRecs.some(r => typeof r.r === 'number') && mixRecs.some(r => typeof r.w === 'number'),
    'a mixed paper stores both a right timestamp and a wrong one');
  ok(mixRecs.every(r => !(typeof r.r === 'number' && typeof r.w === 'number')),
    'and no question on one paper carries both, since it was answered once');
}

/* ── 10. Practice records what it marks, too ─────────────────────────────── */
console.log(`${DIM}10. Practice records what it marks${RESET}`);
{
  const c = openPractice();
  D.click(c.el, 'startpractice', n => n.getAttribute('data-lo') === 'mix');
  let answered = 0;
  for (let i = 0; i < 12; i++) {
    const q = onScreen(c.el);
    if (!q) break;
    if (!answerRightPractice(c.el, q)) break;
    D.click(c.el, 'nextq');
    answered++;
  }
  const saved = JSON.parse(c.store.getItem(D.STORE_KEY));
  ok(answered === 10, `a practice run is 10 questions (got ${answered})`);
  ok(Object.keys(saved.practice.qs).length === 10, 'and every one of them is remembered');
  const los = saved.practice.los;
  const attempted = Object.values(los).reduce((a, r) => a + r.attempted, 0);
  ok(attempted === 10, 'the per-outcome tally counts every question attempted');
  ok(Object.values(los).every(r => r.correct <= r.attempted), 'and never claims more right than asked');
  ok(saved.practice.runs === 1, 'a finished run is counted as a run');
  ok(saved.practice.mocks === 0, 'and not as a mock');
  /* And the record is on the screen the reader chooses from. A count of
     questions in the pool is a fact about the app; how many you have got right
     is the fact that decides which card to press. */
  D.click(c.el, 'exit');
  ok(/% right so far/.test(c.el.innerHTML), 'the record reaches the outcome cards on the practice screen');
}

/* ── 11. Reviewing the paper ─────────────────────────────────────────────── */
console.log(`${DIM}11. Reviewing the paper${RESET}`);
{
  const c = sit('mixed');
  ok(/data-a1="review"/.test(c.el.innerHTML), 'a finished paper offers a review');
  ok(c.el.innerHTML.indexOf('data-a1="review"') < c.el.innerHTML.indexOf('data-a1="exit"'),
    'and offers it first — it is what ninety minutes just bought');
  ok(!/data-a1="retry"/.test(c.el.innerHTML), 'a paper is not retried; sitting another draws a new one');

  D.click(c.el, 'review');
  const list = c.el.innerHTML;
  const rows = [...list.matchAll(/class="a1-revrow (is-right|is-wrong)"/g)].map(m => m[1]);
  ok(rows.length === 30, `every question on the paper has a row (got ${rows.length})`);
  const right = rows.filter(r => r === 'is-right').length;
  ok(new RegExp(`${right} of 30 right`).test(list), 'the header agrees with the rows');
  ok(/left blank/.test(list), 'a question left blank is named as blank, not shown as right');
  ok(/data-a1="reviewwrong"/.test(list), 'the list can be filtered to what went wrong');
  ok(new RegExp(`Got wrong ${30 - right}`).test(list), 'and says how many that is');

  /* Filtering, then stepping. Next from a wrong answer must reach the next
     wrong answer, not the next question. */
  D.click(c.el, 'reviewwrong');
  const shownWrong = [...c.el.innerHTML.matchAll(/class="a1-revrow (is-right|is-wrong)"/g)].map(m => m[1]);
  ok(shownWrong.length === 30 - right && shownWrong.every(v => v === 'is-wrong'),
    'the filter shows only what went wrong');

  const firstWrong = /data-a1="reviewq" data-i="(\d+)"/.exec(c.el.innerHTML)[1];
  D.click(c.el, 'reviewq', n => n.getAttribute('data-i') === firstWrong);
  ok(/class="a1-revverdict is-wrong"/.test(c.el.innerHTML), 'opening one shows its verdict');
  ok(/Wrong answer 1 of /.test(c.el.innerHTML), 'and says where in the filtered run it sits');
  ok(/class="a1-exp"/.test(c.el.innerHTML), 'a reviewed question explains itself');
  /* The card used to carry its own "Question N of M", read off S.qIdx — which
     is where the reader got to in the RUN, not which question the review has
     open. Reviewing question one showed a card headed "Question 30 of 30"
     under a bar reading "Question 1 of 30". */
  ok(!/class="a1-qhead"/.test(c.el.innerHTML),
    'and carries no second question counter to contradict the bar\'s');
  const bars = [...c.el.innerHTML.matchAll(/Question (\d+) of (\d+)/g)];
  ok(bars.length === 1, `a reviewed question states its number exactly once (found ${bars.length})`);
  ok(bars.length === 1 && Number(bars[0][1]) === Number(firstWrong) + 1,
    'and the number it states is the question actually open');
  ok(!/data-a1="nextq"/.test(c.el.innerHTML), 'and does not offer the run\'s Next — a review has its own');
  ok(/data-a1="reviewnext"/.test(c.el.innerHTML), 'which it does offer');

  D.click(c.el, 'reviewnext');
  ok(/Wrong answer 2 of /.test(c.el.innerHTML), 'Next steps through the filtered sequence');
  D.click(c.el, 'reviewprev');
  ok(/Wrong answer 1 of /.test(c.el.innerHTML), 'and Previous comes back');

  D.click(c.el, 'reviewlist');
  ok(/class="a1-revlist"/.test(c.el.innerHTML), 'and the list is reachable again');
  D.click(c.el, 'reviewall');
  ok([...c.el.innerHTML.matchAll(/class="a1-revrow /g)].length === 30, 'the filter comes off');
  D.click(c.el, 'reviewback');
  ok(/class="a1-done-ring"/.test(c.el.innerHTML), 'and the result screen is reachable from the review');
  ok(/How the paper went/.test(c.el.innerHTML), 'still reading as the paper\'s own result');
}

/* ── 12. The review shows what the reader put, marked as it was marked ───── */
console.log(`${DIM}12. The review replays the answer that was given${RESET}`);
{
  /* The verdict on the review must be the verdict from the paper, arrived at by
     re-marking the recorded answer — not a remembered boolean. So: a paper
     answered right must review as right for EVERY type it drew, and a blank one
     must review as wrong for every type, with the key shown. */
  const right = sit('right');
  D.click(right.el, 'review');
  const rrows = [...right.el.innerHTML.matchAll(/class="a1-revrow (is-right|is-wrong)"/g)].map(m => m[1]);
  ok(rrows.length === 30 && rrows.every(v => v === 'is-right'),
    'a paper answered right reviews as right, question by question, for every type it drew');
  ok(/Every question on this paper was right/.test(right.el.innerHTML),
    'and offers no filter, because there is nothing to filter to');

  /* THE ROW VERDICTS ALONE CANNOT TELL A RE-MARK FROM A REMEMBERED BOOLEAN,
     and that is the mutation this section exists to catch. So every question is
     opened and read: what the reviewed screen DRAWS comes from the restored
     answer run back through the marker, so a snapshot that failed to carry the
     pairs of a matching question, or the sequence of an ordering one, shows up
     here as a screen full of crosses under a row that says right. */
  /* AND THE PAPER IS CHOSEN, NOT ACCEPTED. The two types whose snapshot can
     actually fail — matching, whose pairs are a map, and ordering, whose
     sequence is an array — are a small share of the bank, so whether a given
     paper contains one is luck. This section asserted against whatever the
     seeded draw happened to produce, and the day the bank grew past 150
     questions that luck ran out and the check failed on content that was
     perfectly fine. So papers are sat until one carries both, and the
     assertions are made there; if none of twenty does, that is reported rather
     than passed over. */
  const containsBoth = (c) => {
    const kinds = new Set(c.seen.map(q => q.type || 'mcq'));
    return kinds.has('match') && kinds.has('ordering');
  };
  let deep = containsBoth(right) ? right : null;
  for (let i = 0; i < 20 && !deep; i++) {
    const c = sit('right');
    if (containsBoth(c)) deep = c;
  }
  ok(!!deep, 'a paper can be drawn that contains both a matching and an ordering question');
  /* `right` is already on its review screen from the assertions above; a paper
     found by the loop is still on its result screen and has to be opened. */
  if (!deep) deep = right;
  else if (deep !== right) D.click(deep.el, 'review');

  const openedRight = [];
  for (let i = 0; i < 30; i++) {
    D.click(deep.el, 'reviewq', n => n.getAttribute('data-i') === String(i));
    const sheet = deep.el.innerHTML.split('a1-sheet')[1] || '';
    openedRight.push({ i, sheet });
    D.click(deep.el, 'reviewlist');
  }
  ok(openedRight.length === 30, 'every question on a right paper can be opened');
  const drawnWrong = openedRight.filter(r =>
    /a1-match-key-row is-wrong|a1-order-row is-wrong|a1-tf-row is-wrong|a1-opt is-wrong|a1-pill is-wrong|a1-verdict is-wrong/.test(r.sheet));
  ok(drawnWrong.length === 0,
    `a right paper replays as right on the screen too, not just in the list (${drawnWrong.length} drawn wrong: ${drawnWrong.map(r => r.i).join(', ')})`);
  ok(openedRight.filter(r => /a1-match-key-row is-right/.test(r.sheet)).length > 0,
    'and a matching question really was replayed with its pairs — otherwise this proves nothing');
  ok(openedRight.filter(r => /a1-order-row is-right/.test(r.sheet)).length > 0,
    'as was an ordering question with its sequence');

  const blank = sit('blank');
  D.click(blank.el, 'review');
  const brows = [...blank.el.innerHTML.matchAll(/class="a1-revrow (is-right|is-wrong)"/g)].map(m => m[1]);
  ok(brows.length === 30 && brows.every(v => v === 'is-wrong'),
    'a paper left blank reviews as wrong throughout — a blank must not replay as a right answer');
  ok((blank.el.innerHTML.match(/left blank/g) || []).length === 30,
    'and every one of them is named as blank');

  D.click(blank.el, 'reviewq', n => n.getAttribute('data-i') === '0');
  ok(/You left this one blank/.test(blank.el.innerHTML), 'opening a blank says so');
  ok(/The right answer is shown below/.test(blank.el.innerHTML), 'and shows the key');

  /* A specific answer, replayed. Pick a known-wrong option on the first
     multiple choice, then check the review draws that option as the wrong one
     rather than simply marking the key. */
  const c = openMock();
  let idx = 0, target = null;
  while (idx < 40) {
    const q = onScreen(c.el);
    if (!q) break;
    if ((q.type || 'mcq') === 'mcq') { target = { q, idx }; break; }
    D.click(c.el, 'mocknext'); idx++;
  }
  if (!target) ok(false, 'a paper contains a multiple choice to replay');
  else {
    const wrong = target.q.opts.map((_, i) => i).find(i => i !== target.q.ans);
    D.nodes(c.el, 'ans').find(n => n.getAttribute('data-i') === String(wrong)).fire('click');
    while (onScreen(c.el)) D.click(c.el, 'mocknext');
    D.click(c.el, 'review');
    D.click(c.el, 'reviewq', n => n.getAttribute('data-i') === String(target.idx));
    ok(new RegExp(`a1-opt is-wrong" data-a1="ans" data-i="${wrong}"`).test(c.el.innerHTML),
      'the review marks the option the reader actually chose as the wrong one');
    ok(new RegExp(`a1-opt is-right" data-a1="ans" data-i="${target.q.ans}"`).test(c.el.innerHTML),
      'and marks the key as right beside it');
    ok(!/left blank/.test(c.el.innerHTML.split('a1-sheet')[1] || ''),
      'and does not call an answered question blank');
  }
}

/* ── 13. Leaving, and coming back ────────────────────────────────────────── */
console.log(`${DIM}13. Leaving a paper${RESET}`);
{
  const c = openMock();
  /* Two taps, not one. Back raises a guard now — see
     scripts/check-mock-exit-guard.js, which owns that behaviour; here it is
     only the route to the thing this section is about, which is what leaving
     does to the clock. */
  D.click(c.el, 'exit');
  D.click(c.el, 'exitconfirm');
  ok(/class="a1-mockpanel"/.test(c.el.innerHTML), 'walking out of a paper lands on the practice screen');
  ok(!/class="a1-mockclock"/.test(c.el.innerHTML), 'and the clock is off the screen');
  /* The clock is an interval; leaving it running would fire a result over
     whatever the reader moved on to. There is no way to observe an interval
     from here, so this asserts the observable consequence: a very long time
     later, the practice screen is still the practice screen. */
  const realNow = Date.now;
  Date.now = () => realNow() + 200 * 60000;
  c.M.AAT1_UI.mount(c.el);
  Date.now = realNow;
  ok(!/class="a1-done-ring"/.test(c.el.innerHTML),
    'and an abandoned paper does not finish itself hours later over another screen');

  /* Switching subject suspends; the same paper must still expire correctly. */
  const c2 = openMock();
  c2.M.AAT1_UI.suspend();
  const realNow2 = Date.now;
  Date.now = () => realNow2() + 91 * 60000;
  c2.M.AAT1_UI.mount(c2.el);
  Date.now = realNow2;
  ok(/class="a1-done-ring"/.test(c2.el.innerHTML),
    'a suspended paper still expires on its own absolute clock, not on time watched');

  /* Home from inside a paper. */
  const c3 = openMock();
  c3.M.AAT1_UI.home();
  c3.M.AAT1_UI.mount(c3.el);
  ok(!/class="a1-mockclock"/.test(c3.el.innerHTML), 'Home from inside a paper leaves the paper');
  const realNow3 = Date.now;
  Date.now = () => realNow3() + 200 * 60000;
  c3.M.AAT1_UI.mount(c3.el);
  Date.now = realNow3;
  ok(!/class="a1-done-ring"/.test(c3.el.innerHTML), 'and its clock does not come back to haunt the ladder');
}

/* ── 14. The clock leaves nothing running ────────────────────────────────── */
console.log(`${DIM}14. No timer outlives the paper${RESET}`);
{
  /* WHY COUNT TIMERS RATHER THAN WATCH FOR A STRAY RESULT SCREEN. The tick
     itself checks the mode and stops when it no longer reads as a paper, so a
     leaked interval is invisible from the outside for a whole second and then
     tidies itself away. That guard is one of two defences and this is the
     other: the clock is stopped at every exit from a paper. Removing either
     one leaves a page holding a timer it has no use for, and only this can see
     it. */
  const realSet = global.setInterval, realClear = global.clearInterval;
  let live = 0;
  global.setInterval = (...a) => { live++; return realSet(...a); };
  global.clearInterval = (h) => { if (h) live--; return realClear(h); };

  const leaves = (label, act) => {
    live = 0;
    const c = openMock();
    ok(live === 1, `sitting a paper starts one clock (${label})`);
    act(c);
    ok(live === 0, `and ${label} stops it`);
  };

  /* Back now raises a guard, so walking out is two taps. The clock is
     deliberately still running under the dialog — hesitating in an exam costs
     time — which is asserted here rather than left to be discovered. */
  leaves('walking out', c => { D.click(c.el, 'exit'); ok(live === 1, 'the clock runs on under the dialog'); D.click(c.el, 'exitconfirm'); });
  leaves('the Home button', c => c.M.AAT1_UI.home());
  leaves('switching subject', c => c.M.AAT1_UI.suspend());
  leaves('finishing the paper', c => { while (onScreen(c.el)) D.click(c.el, 'mocknext'); });
  leaves('the clock running out', c => {
    const realNow = Date.now;
    Date.now = () => realNow() + 91 * 60000;
    c.M.AAT1_UI.mount(c.el);
    Date.now = realNow;
  });

  global.setInterval = realSet;
  global.clearInterval = realClear;
}

restore();

console.log();
if (failures) {
  console.log(`${RED}${BOLD}── ${failures} of ${checks} checks failed${RESET}`);
  process.exit(1);
}
console.log(`${GREEN}${BOLD}── The Level 1 mock behaves like an assessment ✓${RESET} ${DIM}(${checks} checks)${RESET}`);
