#!/usr/bin/env node
/**
 * Does the timed mock behave like an exam rather than like practice?
 *
 * Practice tells you after every question how you did. That is right for
 * learning and useless for rehearsal — knowing where you stand is exactly what
 * the assessment withholds, and it is the part readers find hardest. So the
 * properties worth asserting are the ones that make a mock a mock:
 *
 *   nothing is revealed until the paper is over
 *   the paper is drawn to the assessment's own weighting
 *   the tasks — the shape the assessment is built from — actually appear
 *   an unanswered question marks as wrong
 *   the report says which outcome cost the marks, weighted
 *
 * Driven through the real player. Nothing here reads the allocator or the
 * grader directly: every assertion is about what a reader would see.
 *
 * Run: node scripts/check-aat3-mock.js   (exit 1 on any failure)
 */

'use strict';

const D = require('./lib/aat3-driver.js');
const SYL = require('../aat3-syllabus.js').SYLLABUS;

const RED = '\x1b[31m', GREEN = '\x1b[32m';
const BOLD = '\x1b[1m', DIM = '\x1b[2m', RESET = '\x1b[0m';

let failures = 0, checks = 0;
function ok(cond, label) {
  checks++;
  if (!cond) { failures++; console.log(`  ${RED}✗${RESET} ${label}`); }
}

console.log(`${BOLD}AAT Level 3 timed mock${RESET}\n`);

const restore = D.seedRandom(20260828);

function openMock(unitKey) {
  const store = D.fakeStore();
  const M = D.loadUI(store);
  const el = D.fakeEl();
  M.AAT3_UI.reset('practice', unitKey);
  M.AAT3_UI.mount(el);
  D.click(el, 'startmock');
  return { store, M, el };
}

const BANK = (() => {
  const M = D.loadUI(D.fakeStore());
  return [].concat((M.AAT3_PRACTICE || {}).QUESTIONS || [], (M.AAT3_FAPS_PRACTICE || {}).QUESTIONS || []);
})();

/* The best mock score as the practice screen reports it, read off the element
   that carries the figure rather than out of the sentence around it. These
   assertions matched the phrase "best so far 100%"; the offer has since been
   laid out differently and says the same thing in fewer words, which failed two
   checks that are about whether the score PERSISTS. Returns null when no score
   is shown at all, which is its own assertion on a fresh reader. */
function bestShown(html) {
  const m = /class="a3-mockpanel-best"><b>(\d+)%<\/b>/.exec(html);
  return m ? Number(m[1]) : null;
}

function onScreen(el) {
  const stem = (el.innerHTML.match(/<h2 class="a3-q">([\s\S]*?)<\/h2>/) || [])[1];
  if (!stem) return null;
  const text = stem.replace(/<[^>]*>/g, '').trim();
  return BANK.find(q => String(q.q).replace(/\*\*/g, '').trim() === text) || null;
}

/* Answer the question on screen correctly, using its real key. */
function answerRight(el, q) {
  const t = q.type || 'mcq';
  const hit = (act, attrs) => {
    const n = D.nodes(el, act).find(x => Object.keys(attrs).every(k => x.getAttribute(k) === String(attrs[k])));
    if (n) n.fire('click');
  };
  if (t === 'mcq') hit('ans', { 'data-i': q.ans });
  else if (t === 'truefalse') q.statements.forEach((st, i) => hit('tf', { 'data-s': i, 'data-v': String(st.answer) }));
  else if (t === 'gapfill') q.gaps.forEach((g, i) => hit('gap', { 'data-g': i, 'data-o': g.answer }));
  else if (t === 'numeric') {
    const box = D.nodes(el, 'numinput')[0];
    box.value = String(q.answer); box.fire('input');
  } else if (t === 'task') {
    q.parts.forEach((p, pi) => {
      if (p.type === 'choice') hit('taskpick', { 'data-p': pi, 'data-o': p.answer });
      else {
        const box = D.nodes(el, 'taskinput').find(n => n.getAttribute('data-p') === String(pi));
        box.value = String(p.answer); box.fire('input');
      }
    });
  }
}

/* Answer the multiple choice on screen with an option that is NOT the key.
   The driver's generic answerCurrent() cannot do this in a mock: it finishes
   every type by pressing tfsubmit/gapsubmit/numsubmit/tasksubmit, and a mock
   offers none of those — grading waits for the end of the paper. Multiple
   choice is the only type this needs, so it is the only type it does. */
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
function sit(unitKey, how) {
  const ctx = openMock(unitKey);
  const seen = [];
  for (let i = 0; i < 60; i++) {
    const q = onScreen(ctx.el);
    if (!q) break;
    const before = ctx.el.innerHTML;
    if (how === 'right') answerRight(ctx.el, q);
    else if (how === 'mixed' && i % 2 === 0) answerRight(ctx.el, q);
    else if (how === 'wrong-mcq') answerWrongMcq(ctx.el, q);
    /* BOTH SNAPSHOTS, and the one AFTER answering is the one that matters.
       A first version captured only the screen as it arrived — which is
       pristine by construction — so the leak assertions in section 2 were
       reading a state no answer had touched and passed against a player that
       revealed the verdict the moment an option was clicked. */
    seen.push({ q, html: before, answered: ctx.el.innerHTML });
    if (!D.nodes(ctx.el, 'mocknext').length) break;
    D.click(ctx.el, 'mocknext');
  }
  return Object.assign(ctx, { seen });
}

/* ── 1. The paper is the right length, and every question is a real one ──── */
{
  const r = sit('tpfb', 'blank');
  ok(r.seen.length === 24, `a mock is 24 questions long (got ${r.seen.length})`);
  ok(r.seen.every(s => s.q), 'every question on the paper is one from the bank');
  const ids = r.seen.map(s => s.q.id);
  ok(new Set(ids).size === ids.length, 'no question appears twice on one paper');
}

/* ── 2. Nothing is revealed while the paper is being sat ─────────────────── */
/* The property that separates a mock from practice, asserted on every screen of
   a paper answered CORRECTLY — a wrong-answer run could pass this by accident
   if the player only revealed on a right answer. */
{
  const r = sit('tpfb', 'right');
  const TELL = /a3-exp-box|a3-try-verdict|class="a3-opt is-right"|class="a3-opt is-wrong"|a3-part is-right|a3-part is-wrong|a3-part-v|a3-tf-row is-right|a3-tf-row is-wrong|a3-pill is-right|a3-pill is-wrong/;
  const leaks = r.seen.filter(s => TELL.test(s.answered));
  ok(leaks.length === 0,
    `no screen of a mock reveals a verdict once the question is answered (${leaks.length} of ${r.seen.length} did)`);
  ok(r.seen.every(s => !TELL.test(s.html)), 'and none reveals one before it is answered either');
  ok(r.seen.every(s => !/data-a3="nextq"/.test(s.answered)),
    'the practice "next question" button, which only appears once a question is graded, never appears');
  ok(r.seen.every(s => /data-a3="mocknext"/.test(s.html)),
    'every question offers a way forward without answering it');
  ok(r.seen.every(s => /a3-mockclock/.test(s.html)), 'the clock is on screen throughout');

  /* AND NO WAY TO REVEAL ONE ON PURPOSE. Suppressing the verdict is not enough
     if the button that produces it is still on the screen: a task left its
     "Submit all 6" in place, and pressing it graded the task and marked every
     part green or red mid-paper. Nothing in a run that never presses it would
     notice, so the buttons themselves are what is asserted. */
  const REVEALERS = ['tfsubmit', 'gapsubmit', 'numsubmit', 'tasksubmit'];
  const offered = REVEALERS.filter(a =>
    r.seen.some(s => new RegExp(`data-a3="${a}"`).test(s.html) || new RegExp(`data-a3="${a}"`).test(s.answered)));
  ok(offered.length === 0,
    `no mock screen offers a button that grades on the spot (found ${offered.join(', ') || 'none'})`);
}

/* ── 3. A choice made under exam conditions has to LOOK made ──────────────
   Withholding the VERDICT is not the same as withholding the CHOICE, and
   multiple choice had lost the difference. `is-right` and `is-wrong` were the
   only states an option could carry and both are gated on the question having
   been graded — which, in a mock, does not happen until the paper is over. So
   a reader tapped an option and the screen did not move. The pick was landing
   and the answer was being recorded; there was nothing to see, and the
   reasonable conclusion from the outside was that the tap had not worked. It
   was reported as "you have to long-press rather than tap".

   Asserted for every type that renders its own chosen state. Numeric answers
   are excluded on purpose: what shows a typed figure is the input's own value,
   which the browser paints and the module never re-renders — there is nothing
   in the markup to assert, and nothing that could go missing from it. */
{
  const r = sit('tpfb', 'right');
  const PILL = /class="a3-pill on"/;
  const SHOWS = {
    mcq:       h => /class="a3-opt on"/.test(h),
    truefalse: h => PILL.test(h),
    gapfill:   h => PILL.test(h),
    /* Only when there is a pill to look at: a task of numeric parts alone
       shows its answers in its inputs, like a numeric question. */
    task:      h => PILL.test(h),
  };
  const applies = s => {
    const t = s.q.type || 'mcq';
    if (t === 'task') return (s.q.parts || []).some(p => p.type === 'choice');
    return !!SHOWS[t];
  };
  const relevant = r.seen.filter(applies);
  const invisible = relevant.filter(s => !SHOWS[s.q.type || 'mcq'](s.answered));
  ok(invisible.length === 0,
    `every answered question shows WHICH answer was chosen (${invisible.length} of ${relevant.length} showed nothing: ` +
    `${[...new Set(invisible.map(s => s.q.type || 'mcq'))].join(', ') || 'none'})`);

  /* The assertion above is only worth anything if the paper actually contained
     the type that broke. A draw that happened to serve no multiple choice
     would pass it having tested nothing. */
  const types = new Set(relevant.map(s => s.q.type || 'mcq'));
  ok(types.has('mcq'), 'and the paper it was checked on contained multiple choice at all');

  /* And it still says nothing about whether the choice was right: this whole
     run answered CORRECTLY, so a "chosen" state that leaked correctness would
     look identical to one that does not. The wrong-answer run is what
     separates them. */
  const wrong = sit('tpfb', 'wrong-mcq');
  const wrongMcq = wrong.seen.filter(s => (s.q.type || 'mcq') === 'mcq');
  ok(wrongMcq.length > 0 && wrongMcq.every(s => /class="a3-opt on"/.test(s.answered)),
    'a wrong choice is shown as chosen in exactly the same way as a right one');
}

/* ── 4. The review of a finished paper ────────────────────────────────────
   A mock withholds everything until the end, which is the point, and then had
   nothing to give back but a score and a table by outcome. "Which ones did I
   get wrong, and why" is the question a paper exists to answer.

   The property that matters most is that the review cannot disagree with the
   marking: it restores what the reader put and runs it back through the same
   gradeAnswer(), so there is one marker rather than two. The tally assertion
   below is what makes that observable from outside — the review's own count of
   right answers has to equal the score the paper was given. */

/* The `data-i` of each option, in the order the screen offered them. */
function optionOrder(html) {
  return (html.match(/data-a3="ans" data-i="(\d+)"/g) || [])
    .map(m => Number(/data-i="(\d+)"/.exec(m)[1]));
}
function openReview(ctx, i) {
  D.click(ctx.el, 'reviewq', n => n.getAttribute('data-i') === String(i));
  return ctx.el.innerHTML;
}
function countOf(html, re) { return (html.match(re) || []).length; }

/* 4a. It is offered, and a clean sweep reads as one. */
{
  const r = sit('tpfb', 'right');
  ok(/data-a3="review"/.test(r.el.innerHTML), 'a finished paper offers a review of itself');

  D.click(r.el, 'review');
  const rows = D.nodes(r.el, 'reviewq');
  ok(rows.length === r.seen.length,
    `the review lists every question on the paper (${rows.length} rows for ${r.seen.length} questions)`);
  ok(countOf(r.el.innerHTML, /class="a3-revrow is-right"/g) === r.seen.length,
    'and marks them all right, on a paper that was answered right');
  ok(/Every question on this paper was right/.test(r.el.innerHTML),
    'a clean sweep says so rather than offering a filter onto an empty list');

  /* THE MULTI-PART TASKS, which is where re-marking is observable. A reviewed
     question's options are marked from the pick and the key, so a review that
     asserted "graded" without actually grading would look identical on every
     other type. A task's per-part verdicts come from gradeAnswer() and from
     nothing else, so they are what proves the review re-marks rather than
     assuming. (Found by mutation: replacing the grade with a bare `true`
     survived every assertion here until this one existed.) */
  const tasks = r.seen.map((s, i) => ({ s, i })).filter(x => (x.s.q.type || 'mcq') === 'task');
  ok(tasks.length > 0, 'the paper contained at least one multi-part task to review');
  let parts = 0, marked = 0, typed = 0, typedWanted = 0;
  tasks.forEach(({ s, i }) => {
    const html = openReview(r, i);
    parts += (s.q.parts || []).length;
    marked += countOf(html, /class="a3-part is-right"/g);
    /* And the reader's own figures, back in the boxes they typed them into. */
    (s.q.parts || []).forEach((p, pi) => {
      if (p.type === 'choice') return;
      typedWanted++;
      if (new RegExp(`data-a3="taskinput" data-p="${pi}" value="[^"]+"`).test(html)) typed++;
    });
    D.click(r.el, 'reviewlist');
  });
  ok(parts > 0 && marked === parts,
    `every part of a task answered right is marked right in the review (${marked}/${parts})`);
  ok(typedWanted > 0 && typed === typedWanted,
    `and every figure the reader typed is back in the box they typed it into (${typed}/${typedWanted})`);
}

/* 4b. A wrong answer is shown back as the reader's own, in the shuffle they
   saw, with the key and the explanation the paper withheld. */
{
  const r = sit('tpfb', 'wrong-mcq');
  D.click(r.el, 'review');

  const mcq = r.seen.map((s, i) => ({ s, i })).filter(x => (x.s.q.type || 'mcq') === 'mcq');
  ok(mcq.length > 0, 'the paper the review was checked on contained multiple choice at all');

  let choice = 0, key = 0, order = 0, why = 0, verdict = 0;
  mcq.forEach(({ s, i }) => {
    const html = openReview(r, i);
    const q = s.q;
    /* The reader's own wrong option, marked wrong — not merely the key marked
       right, which is also what a question left blank would show. */
    const chosen = q.opts.map((_, k) => k).find(k => k !== q.ans);
    if (new RegExp(`class="a3-opt is-wrong" data-a3="ans" data-i="${chosen}"`).test(html)) choice++;
    if (new RegExp(`class="a3-opt is-right" data-a3="ans" data-i="${q.ans}"`).test(html)) key++;
    /* The same shuffle: "I picked B" means nothing against a different one. */
    if (String(optionOrder(html)) === String(optionOrder(s.html))) order++;
    if (/class="a3-exp-box"/.test(html)) why++;
    if (/class="a3-revverdict is-wrong"/.test(html)) verdict++;
    D.click(r.el, 'reviewlist');
  });
  ok(choice === mcq.length, `a reviewed question shows the answer the reader gave (${choice}/${mcq.length})`);
  ok(key === mcq.length, `and the answer that was right (${key}/${mcq.length})`);
  ok(order === mcq.length, `and the options in the order they were sat in (${order}/${mcq.length})`);
  ok(why === mcq.length, `and the explanation, which the paper itself withheld (${why}/${mcq.length})`);
  ok(verdict === mcq.length, `and marks every one of them wrong (${verdict}/${mcq.length})`);

  /* Read-only. Every control on a reviewed question is disabled and the run's
     own "next question" — which would advance a paper that is already over —
     is not on the screen. */
  const one = openReview(r, mcq[0].i);
  ok(!/data-a3="nextq"/.test(one), 'a reviewed question does not offer the button that advances a run');
  ok(countOf(one, /data-a3="ans"/g) === countOf(one, /data-a3="ans" data-i="\d+" disabled/g),
    'and every option on it is disabled, so a review cannot change what was scored');
}

/* 4b². Every type shows the reader what the right answer WAS. Multiple choice
   and gap-fill and the task pills always did; true or false did not — its row
   went red and the pills stayed neutral, so a reader was told they had the
   statement the wrong way round and left to work out which way round it should
   have been. On a review of a whole paper that is the answer being withheld. */
{
  const r = sit('tpfb', 'blank');
  D.click(r.el, 'review');
  const tf = r.seen.map((s, i) => ({ s, i })).filter(x => (x.s.q.type || 'mcq') === 'truefalse');
  ok(tf.length > 0, 'the paper contained a true-or-false question to review');
  let keyed = 0, wanted = 0;
  tf.forEach(({ s, i }) => {
    const html = openReview(r, i);
    /* One marked pill per statement: the one that was true of it. */
    wanted += (s.q.statements || []).length;
    keyed += countOf(html, /class="a3-pill is-right"/g);
    D.click(r.el, 'reviewlist');
  });
  ok(wanted > 0 && keyed === wanted,
    `a reviewed true-or-false marks the right answer to every statement (${keyed}/${wanted})`);
}

/* 4c. A blank. Multiple choice is why this matters: an unanswered question
   replays with the key marked right and nothing marked wrong, which is exactly
   how a question answered CORRECTLY replays. Without the notice a reader would
   read a run of blanks as a run of right answers. */
{
  const r = sit('tpfb', 'blank');
  D.click(r.el, 'review');
  const rows = D.nodes(r.el, 'reviewq').length;
  ok(countOf(r.el.innerHTML, /left blank/g) === rows,
    `every unanswered question is listed as left blank (${countOf(r.el.innerHTML, /left blank/g)}/${rows})`);
  const first = openReview(r, 0);
  ok(/class="a3-revblank"/.test(first) && /You left this one blank/.test(first),
    'and says so on the question itself, where it is the only thing separating a blank from a right answer');
  ok(/class="a3-revverdict is-wrong"/.test(first), 'and marks it wrong');
}

/* 4d. A partly-right paper: the tally, the filter, the arrows, and the way out. */
{
  const r = sit('tpfb', 'mixed');
  const scored = /(\d+) of (\d+) correct/.exec(r.el.innerHTML);
  ok(!!scored, 'a partly-answered paper reports a score');
  const score = scored ? Number(scored[1]) : -1;
  const total = scored ? Number(scored[2]) : -1;
  ok(score > 0 && score < total, `and that score is neither nothing nor everything (${score} of ${total})`);

  D.click(r.el, 'review');
  const all = D.nodes(r.el, 'reviewq').length;
  const rightRows = countOf(r.el.innerHTML, /class="a3-revrow is-right"/g);
  /* THE ONE THAT MATTERS. The review re-marks from what was recorded rather
     than reading back a stored verdict, so this is what would catch the two
     drifting apart. */
  ok(rightRows === score,
    `the review's own count of right answers equals the score the paper was given (${rightRows} vs ${score})`);

  D.click(r.el, 'reviewwrong');
  const filtered = D.nodes(r.el, 'reviewq').length;
  ok(filtered === total - score, `"got wrong" lists exactly the ones that went wrong (${filtered} of ${all})`);
  ok(!/class="a3-revrow is-right"/.test(r.el.innerHTML), 'and lists nothing that was right');

  /* The arrows move through the FILTERED sequence: next from a wrong answer
     reaches the next wrong answer, not the next question. */
  const idxs = D.nodes(r.el, 'reviewq').map(n => Number(n.getAttribute('data-i')));
  D.click(r.el, 'reviewq', n => n.getAttribute('data-i') === String(idxs[0]));
  ok(/data-a3="reviewprev"[^>]*disabled/.test(r.el.innerHTML),
    'the first of the sequence offers no "previous"');
  ok(/Wrong answer 1 of \d+/.test(r.el.innerHTML),
    'and the bar counts within that sequence rather than within the paper');
  D.click(r.el, 'reviewnext');
  ok(/Wrong answer 2 of \d+/.test(r.el.innerHTML), '"next" moves to the second one that went wrong');
  ok(/class="a3-lessonbar-t">Question \d+ of \d+</.test(r.el.innerHTML),
    'while still naming where that question sat on the paper');

  /* Out, and on. The review borrows the per-question state the player uses to
     draw a question; a run started afterwards must not inherit it. */
  D.click(r.el, 'reviewlist');
  D.click(r.el, 'reviewback');
  ok(/A pass, on this paper|Below the pass mark/.test(r.el.innerHTML),
    'leaving the review lands back on the result of the paper');
  D.click(r.el, 'exit');
  D.click(r.el, 'startpractice', n => n.getAttribute('data-lo') === 'mix');
  ok(!/class="a3-revverdict|class="a3-revblank"/.test(r.el.innerHTML),
    'a practice run started afterwards carries nothing of the review');
  ok(!/class="a3-opt is-right"|class="a3-opt is-wrong"|class="a3-exp-box"/.test(r.el.innerHTML),
    'and opens on an unanswered question rather than on a graded one');
}

/* ── 5. A paper answered correctly scores 100, and one left blank scores 0 ── */
{
  const right = sit('tpfb', 'right');
  ok(/100%/.test(right.el.innerHTML), 'a paper answered correctly scores 100%');
  ok(/A pass, on this paper/.test(right.el.innerHTML), 'and reads as a pass');

  const blank = sit('tpfb', 'blank');
  ok(/>0%<|0 of 24 correct/.test(blank.el.innerHTML),
    'a paper left entirely blank scores nothing — an unanswered question marks as wrong');
  ok(/Below the pass mark/.test(blank.el.innerHTML), 'and reads as below the pass mark');
}

/* ── 4. The report names the outcomes, weighted ──────────────────────────── */
{
  const r = sit('tpfb', 'blank');
  const html = r.el.innerHTML;
  ok(/a3-mockreport/.test(html), 'the paper ends with a report');
  ok(/How the paper went, outcome by outcome/.test(html), 'and the report is broken down by outcome');
  ok(/>Weight</.test(html), 'each outcome is shown against its share of the assessment');
  ok(/Most marks at stake/.test(html), 'and the outcome with most marks at stake is named');

  const os = SYL.units.tpfb.outcomes;
  const named = os.filter(o => html.indexOf(String(o.n) + ' · ' + o.title) !== -1).length;
  ok(named === os.length, `all ${os.length} outcomes appear in the report of a full paper (found ${named})`);
}

/* ── 5. The paper is drawn to the exam weighting, and leads with the tasks ── */
{
  const RUNS = 60;
  const seen = {};
  let total = 0, tasks = 0, papers = 0;
  for (let i = 0; i < RUNS; i++) {
    const r = sit('tpfb', 'blank');
    papers++;
    r.seen.forEach(s => {
      seen[s.q.lo] = (seen[s.q.lo] || 0) + 1;
      total++;
      if (s.q.type === 'task') tasks++;
    });
  }
  const os = SYL.units.tpfb.outcomes;
  os.forEach(o => {
    const target = o.weighting;
    const got = ((seen[o.n] || 0) / total) * 100;
    console.log(`  ${DIM}Outcome ${o.n}: ${got.toFixed(1)}% of the paper  ·  exam ${target}%${RESET}`);
    ok(Math.abs(got - target) <= 2.5,
      `Outcome ${o.n} is ${got.toFixed(1)}% of a mock against an exam weighting of ${target}%`);
  });

  /* Tasks drawn at random would be about a twentieth of a paper. Taking them
     first inside each outcome's allocation should put every one of them on
     every paper — which is the point of drawing that way, and is worth
     asserting rather than assuming. */
  const bankTasks = BANK.filter(q => q.unitKey === 'tpfb' && q.type === 'task').length;
  const perPaper = tasks / papers;
  console.log(`  ${DIM}Tasks per paper: ${perPaper.toFixed(2)} of ${bankTasks} in the bank${RESET}`);
  ok(perPaper === bankTasks,
    `every one of the ${bankTasks} tasks appears on every paper (averaged ${perPaper.toFixed(2)})`);
}

/* ── 6. Sitting a mock records it, and its best score ────────────────────── */
{
  const r = sit('tpfb', 'right');
  const rec = JSON.parse(r.store.getItem(D.STORE_KEY)).practice.units.tpfb;
  ok(rec.mocks === 1, `sitting a paper counts it (got ${rec.mocks})`);
  ok(rec.mockBest === 100, `and records the score (got ${rec.mockBest})`);
  ok(!rec.runs, 'a mock is not counted as a practice run');

  /* Every answer still reaches the per-outcome counters and the per-question
     memory, so a mock feeds the mistakes list like anything else. */
  const attempted = Object.keys(rec.los).reduce((a, k) => a + rec.los[k].attempted, 0);
  ok(attempted === 24, `all 24 answers reach the outcome counters (got ${attempted})`);
  ok(Object.keys(rec.qs || {}).length === 24, 'and all 24 reach the per-question record');
}

/* ── 6a. What was recorded survives a reload ─────────────────────────────── */
/* THE BUG THIS SECTION EXISTS FOR. Section 6 reads the record straight out of
   storage, which proves it was WRITTEN and nothing else. The player rebuilds
   that record field by field when it loads — a defence against a store written
   by an older version — and `mocks` and `mockBest` were not among the fields it
   named. Both were written on the way out and dropped on the way back in, so
   the best mock score was correct until the page was reloaded and then gone. It
   took a screenshot to notice.
 *
 * So the assertion is not "was it saved" but "is it still there next time",
 * which is the thing a reader actually experiences. */
{
  const r = sit('tpfb', 'right');
  const M = D.loadUI(r.store);          // a fresh load of the same storage
  const el = D.fakeEl();
  M.AAT3_UI.reset('practice', 'tpfb');
  M.AAT3_UI.mount(el);
  ok(bestShown(el.innerHTML) === 100,
    'the best mock score is still there after a reload — the record is rebuilt on load, and a field it does not name is lost');

  /* The rest of the record has to survive the same trip. */
  const before = JSON.parse(r.store.getItem(D.STORE_KEY)).practice.units.tpfb;
  D.click(el, 'startpractice', n => n.getAttribute('data-lo') === 'mix');
  D.answerCurrent(el);
  D.click(el, 'nextq');
  const after = JSON.parse(r.store.getItem(D.STORE_KEY)).practice.units.tpfb;
  Object.keys(before).forEach(k => {
    ok(after[k] !== undefined, `\`${k}\` survives a reload and a subsequent save`);
  });
}

/* ── 7. A mock leaves no state behind ────────────────────────────────────── */
/* Walking out of a paper mid-way must put the reader back in practice with no
   clock running and no mock answers counted towards the next thing they do. */
{
  const ctx = openMock('tpfb');
  D.click(ctx.el, 'mocknext');
  D.click(ctx.el, 'exit');
  ok(/data-a3="startmock"/.test(ctx.el.innerHTML), 'exiting a mock lands back on the practice picker');
  D.click(ctx.el, 'startpractice', n => n.getAttribute('data-lo') === 'mix');
  ok(!/a3-mockclock/.test(ctx.el.innerHTML), 'a practice run started afterwards carries no clock');
  ok(!/data-a3="mocknext"/.test(ctx.el.innerHTML), 'and grades on the spot, as practice does');
}

/* ── 8. The mock card reports the best score once one has been sat ───────── */
{
  const r = sit('tpfb', 'right');
  D.click(r.el, 'exit');
  ok(bestShown(r.el.innerHTML) === 100, 'the picker shows the best mock score once there is one');

  const fresh = D.loadUI(D.fakeStore());
  const el = D.fakeEl();
  fresh.AAT3_UI.reset('practice', 'tpfb');
  fresh.AAT3_UI.mount(el);
  ok(bestShown(el.innerHTML) === null, 'and says nothing about a best score before any paper is sat');
}

restore();

console.log(failures
  ? `\n${RED}${BOLD}── ${failures} of ${checks} checks failed${RESET}\n`
  : `\n${GREEN}${BOLD}── The mock behaves like an exam ✓${RESET}  ${DIM}(${checks} assertions)${RESET}\n`);
process.exit(failures ? 1 : 0);
