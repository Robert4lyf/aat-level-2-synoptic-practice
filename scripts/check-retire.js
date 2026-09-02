#!/usr/bin/env node
/**
 * "I know this": does retiring a question actually retire it?
 *
 * WHY THIS NEEDED ITS OWN CHECK. Everything else in these two players is
 * observable on the screen it happens on — a wrong answer marks wrong, and you
 * can see it. Retiring a question is different in kind: the whole point of it
 * is that something STOPS HAPPENING, later, on a screen the reader is not
 * looking at. A bug here does not paint anything wrong. It just quietly keeps
 * serving a question the reader asked it to stop serving, or — far worse —
 * quietly stops serving one they did not, and neither shows up until someone
 * sits down to count what a hundred runs actually drew.
 *
 * So the properties asserted here are about ABSENCE, and about the one place
 * absence would be wrong:
 *
 *   §1  the control is offered on a graded practice question and NOWHERE else:
 *       not before the answer, not in a mock, not in a lesson, not in a review
 *   §2  tapping it writes the two-timestamp shape the merge needs, and tapping
 *       it again reverses that rather than deleting it
 *   §3  a retired question is never drawn again by mixed practice, by a single
 *       outcome, by endless, by the mistakes backlog or by spaced review
 *   §4  a mock STILL draws it, and still fills a full-length paper when every
 *       question in the bank has been put away — the one deliberate exception,
 *       because a rehearsal of a real paper must not be quietly made easier
 *   §5  the count on the practice screen is the module's own figure
 *   §6  the way back exists, is offered only when there is something behind it,
 *       and brings everything back
 *   §7  two devices that disagree settle on whichever was touched last, through
 *       the REAL progress-backup merge rather than a restatement of it
 *
 * BOTH PLAYERS. Level 1 and Level 3 carry this code separately, and a property
 * that holds in one and not the other is exactly the gap a check written
 * against a single player would miss. Everything below runs twice.
 *
 * Run: node scripts/check-retire.js   (exit 1 on any failure)
 */

'use strict';

const path = require('path');
const D3 = require('./lib/aat3-driver.js');
const D1 = require('./lib/aat1-driver.js');

const RED = '\x1b[31m', GREEN = '\x1b[32m';
const BOLD = '\x1b[1m', DIM = '\x1b[2m', RESET = '\x1b[0m';

let failures = 0, checks = 0;
function ok(cond, label) {
  checks++;
  if (!cond) { failures++; console.log(`  ${RED}✗${RESET} ${label}`); }
}
function section(t) { console.log(`${DIM}${t}${RESET}`); }

console.log(`${BOLD}Retiring a question, on both self-rendering players${RESET}\n`);

/* A synthetic bank, so the draw can be watched rather than sampled. Real banks
   run to hundreds of questions across five outcomes; asserting "this one was
   never served" against one of those is a statement about luck. Six per
   outcome is enough for the weighting to have something to allocate and few
   enough that a single run can be checked exhaustively. */
function bank(unitKey) {
  const out = [];
  for (let lo = 1; lo <= 5; lo++) {
    for (let i = 1; i <= 6; i++) {
      const id = `X-${lo}-${i}`;
      out.push({
        id, lo, unitKey, type: 'mcq',
        q: `Synthetic question ${id}`,
        opts: ['right', 'wrong', 'also wrong', 'wrong again'],
        ans: 0,
        exp: `Because ${id} says so.`,
      });
    }
  }
  return out;
}
const IDS = bank('tpfb').map(q => q.id);
/* Which question is on screen, read out of the stem the renderer prints —
   the same handle four other harnesses use. */
function servedId(html) {
  const m = /Synthetic question (X-\d-\d)/.exec(html);
  return m ? m[1] : null;
}

/* ── The two players, each described by what differs ─────────────────────── */

const LEVEL3 = {
  name: 'Level 3', D: D3, pfx: 'a3',
  load(store) {
    const M = D3.loadUI(store || D3.fakeStore());
    M.AAT3_PRACTICE = { QUESTIONS: bank('tpfb') };
    return M;
  },
  mount(M) {
    const el = D3.fakeEl();
    M.AAT3_UI.reset('practice', 'tpfb');
    M.AAT3_UI.mount(el);
    return el;
  },
  lesson(M) {
    const el = D3.fakeEl();
    M.AAT3_UI.reset('path', 'tpfb');
    M.AAT3_UI.mount(el);
    return el;
  },
  qs(store) {
    const d = JSON.parse(store.getItem(D3.STORE_KEY) || '{}');
    return (((d.practice || {}).units || {}).tpfb || {}).qs || {};
  },
  seed(recs) {
    return D3.fakeStore({ [D3.STORE_KEY]: JSON.stringify({ practice: { units: { tpfb: { qs: recs } } } }) });
  },
};

const LEVEL1 = {
  name: 'Level 1', D: D1, pfx: 'a1',
  load(store) {
    const M = D1.loadUI(store || D1.fakeStore());
    M.AAT1_PRACTICE = { QUESTIONS: bank(null) };
    return M;
  },
  mount(M) {
    const el = D1.fakeEl();
    M.AAT1_UI.reset('practice');
    M.AAT1_UI.mount(el);
    return el;
  },
  lesson(M) {
    const el = D1.fakeEl();
    M.AAT1_UI.reset('path');
    M.AAT1_UI.mount(el);
    return el;
  },
  qs(store) {
    const d = JSON.parse(store.getItem(D1.STORE_KEY) || '{}');
    return (d.practice || {}).qs || {};
  },
  seed(recs) {
    return D1.fakeStore({ [D1.STORE_KEY]: JSON.stringify({ practice: { qs: recs } }) });
  },
};

const PLAYERS = [LEVEL3, LEVEL1];

PLAYERS.forEach(P => {
  const D = P.D;
  console.log(`${BOLD}${P.name}${RESET}`);
  const restore = D.seedRandom(20260902);

  /* Start a run of the named kind and answer the first question, which is what
     puts the control on screen. */
  function runTo(el, lo) {
    D.click(el, 'startpractice', n => n.getAttribute('data-lo') === String(lo));
    D.nodes(el, 'ans')[0].fire('click');
    return el;
  }

  /* ── 1. Offered on a graded practice question, and nowhere else ───────── */
  section('  where the control appears');
  {
    const store = D.fakeStore();
    const el = P.mount(P.load(store));
    D.click(el, 'startpractice', n => n.getAttribute('data-lo') === 'mix');
    ok(D.nodes(el, 'retire').length === 0, `${P.name}: not offered before the question is answered`);
    D.nodes(el, 'ans')[0].fire('click');
    ok(D.nodes(el, 'retire').length === 1, `${P.name}: offered once the question is graded`);
    ok(/I know this/.test(el.innerHTML), `${P.name}: says what it does`);
  }
  {
    /* A mock, all the way through. Not the first question only: the control is
       rendered per question, so a branch that leaked it on the last one would
       survive a check that looked at the first. */
    const el = P.mount(P.load(D.fakeStore()));
    D.click(el, 'startmock');
    let leaked = 0, seen = 0;
    for (let k = 0; k < 60; k++) {
      seen++;
      if (D.nodes(el, 'retire').length) leaked++;
      if (!D.nodes(el, 'mocknext').length) break;
      D.click(el, 'mocknext');
    }
    ok(seen > 5, `${P.name}: the mock actually ran (${seen} questions walked)`);
    ok(leaked === 0, `${P.name}: never offered under exam conditions (${leaked} leaks)`);
  }
  {
    /* Inside a lesson. A lesson's check questions are part of reading it: there
       is no pool to take them out of and the lesson still has to be finished. */
    const M = P.load(D.fakeStore());
    const el = P.lesson(M);
    const open = D.nodes(el, 'open')[0];
    /* Asserted rather than guarded. A `if (open)` that quietly does nothing is
       how a whole section of a check stops running without anybody noticing. */
    ok(!!open, `${P.name}: a lesson can be opened from the path`);
    if (open) {
      open.fire('click');
      let guard = 0, sawQ = false;
      while (guard++ < 200) {
        if (D.nodes(el, 'ans').length) {
          sawQ = true;
          ok(D.nodes(el, 'retire').length === 0, `${P.name}: not offered on a lesson check before the answer`);
          D.nodes(el, 'ans')[0].fire('click');
          ok(D.nodes(el, 'retire').length === 0, `${P.name}: not offered on a graded lesson check`);
          break;
        }
        if (!D.nodes(el, 'next').length) break;
        D.click(el, 'next');
      }
      ok(sawQ, `${P.name}: a lesson check question was reached`);
    }
  }

  /* ── 2. The record shape the merge needs ─────────────────────────────── */
  section('  what tapping it writes');
  {
    const store = D.fakeStore();
    const el = P.mount(P.load(store));
    runTo(el, 'mix');
    const id = servedId(el.innerHTML);
    ok(!!id, `${P.name}: the question on screen can be identified`);
    D.click(el, 'retire');
    const one = P.qs(store)[id] || {};
    ok(typeof one.k === 'number' && one.k > 0, `${P.name}: retiring writes a timestamp, not a flag`);
    ok(!(one.ku > one.k), `${P.name}: retired while the retiring stamp is the later one`);
    ok(/Bring back/.test(el.innerHTML), `${P.name}: the button now offers the way back`);
    ok(/aria-pressed="true"/.test(el.innerHTML), `${P.name}: the toggle announces its state`);

    D.click(el, 'retire');
    const two = P.qs(store)[id] || {};
    ok(typeof two.ku === 'number' && two.ku >= two.k,
      `${P.name}: un-retiring writes a later stamp rather than deleting the earlier one`);
    ok(typeof two.k === 'number' && two.k > 0,
      `${P.name}: the retiring stamp survives, so the merge can still order the two`);
    ok(/I know this/.test(el.innerHTML), `${P.name}: the button is back to offering the retirement`);
  }

  /* ── 3. A retired question is never drawn again ──────────────────────── */
  section('  what the draw does with it');
  {
    /* Half the bank put away, then every kind of run that is not a mock, many
       times over. `t` is well in the past on both stamps so the schedule and
       the backlog have something to work with too. */
    const half = IDS.filter((_, i) => i % 2 === 0);
    const recs = {};
    const t = Date.now() - 90 * 24 * 3600 * 1000;
    IDS.forEach(id => {
      /* Every question has been answered — wrongly for the backlog, and long
         enough ago for the schedule — so the two review runs have a full pool
         to draw from and "nothing was served" cannot pass by being empty. */
      recs[id] = { w: t, r: t + 1000 };
      if (half.indexOf(id) !== -1) recs[id].k = Date.now();
    });
    /* The backlog wants the wrong stamp to be the later one. Split the bank so
       both review runs have something: odd ids outstanding, even ids due. */
    IDS.forEach((id, i) => { if (i % 3 === 0) { recs[id].w = t + 2000; } });

    ['mix', 'endless', 1, 2, 'missed', 'refresh'].forEach(lo => {
      let served = 0, leaked = 0;
      for (let attempt = 0; attempt < 12; attempt++) {
        const store = P.seed(JSON.parse(JSON.stringify(recs)));
        const el = P.mount(P.load(store));
        let node;
        try { node = D.nodes(el, 'startpractice').find(n => n.getAttribute('data-lo') === String(lo)); }
        catch (e) { node = null; }
        if (!node) continue;
        node.fire('click');
        for (let k = 0; k < 30; k++) {
          const id = servedId(el.innerHTML);
          if (!id) break;
          served++;
          if (half.indexOf(id) !== -1) leaked++;
          if (!D.nodes(el, 'ans').length) break;
          D.nodes(el, 'ans')[0].fire('click');
          if (!D.nodes(el, 'nextq').length) break;
          D.click(el, 'nextq');
        }
      }
      ok(served > 0, `${P.name}: the "${lo}" run served questions (${served})`);
      ok(leaked === 0, `${P.name}: the "${lo}" run never served a retired question (${leaked} of ${served})`);
    });
  }

  /* ── 4. A mock still draws them ──────────────────────────────────────── */
  section('  the one exception');
  {
    /* EVERY question retired. If a mock honoured the retirement it would have
       nothing to draw from at all, which is the failure this exception exists
       to prevent: a paper that is quietly shorter, or quietly off-weighting,
       exactly when the reader is measuring themselves against the real one. */
    const recs = {};
    IDS.forEach(id => { recs[id] = { k: Date.now() }; });
    let len = 0, sawRetired = 0;
    for (let attempt = 0; attempt < 8; attempt++) {
      const store = P.seed(JSON.parse(JSON.stringify(recs)));
      const el = P.mount(P.load(store));
      D.click(el, 'startmock');
      let n = 0;
      for (let k = 0; k < 60; k++) {
        if (servedId(el.innerHTML)) { n++; sawRetired++; }
        if (!D.nodes(el, 'mocknext').length) break;
        D.click(el, 'mocknext');
      }
      len = Math.max(len, n);
    }
    ok(sawRetired > 0, `${P.name}: a mock still asks questions that were put away`);
    ok(len >= 10, `${P.name}: a mock is still a full-length paper with the whole bank retired (${len})`);
  }

  /* ── 5. The count is the module's own figure ─────────────────────────── */
  section('  what the practice screen says');
  {
    const want = 7;
    const recs = {};
    IDS.slice(0, want).forEach(id => { recs[id] = { k: Date.now() }; });
    const store = P.seed(recs);
    const el = P.mount(P.load(store));
    const html = el.innerHTML;
    /* Read, not computed. A section that worked the number out for itself and
       then asserted its own arithmetic would pass whatever the module printed. */
    const m = new RegExp('(\\d+)\\s+questions? put away').exec(html);
    ok(!!m, `${P.name}: the practice screen says how many are put away`);
    ok(m && Number(m[1]) === want,
      `${P.name}: and the figure is right (said ${m ? m[1] : 'nothing'}, put away ${want})`);
    ok(/in practice/.test(html), `${P.name}: the pool size on screen is the live one`);
  }

  /* ── 6. The way back ─────────────────────────────────────────────────── */
  section('  bringing them back');
  {
    const clean = P.mount(P.load(D.fakeStore()));
    ok(D.nodes(clean, 'restore').length === 0,
      `${P.name}: nothing put away, so nothing to bring back`);

    const recs = {};
    IDS.forEach(id => { recs[id] = { k: Date.now() }; });
    const store = P.seed(recs);
    const el = P.mount(P.load(store));
    ok(D.nodes(el, 'restore').length === 1, `${P.name}: the way back is offered`);
    D.click(el, 'restore');
    ok(D.nodes(el, 'restore').length === 0, `${P.name}: and it is gone once it has been used`);
    const after = P.qs(store);
    const still = IDS.filter(id => (after[id] || {}).k > ((after[id] || {}).ku || 0));
    ok(still.length === 0, `${P.name}: every question came back (${still.length} left behind)`);
    /* The whole bank is drawable again, checked through the module rather than
       through the store it just wrote. */
    let served = 0;
    D.click(el, 'startpractice', n => n.getAttribute('data-lo') === 'mix');
    for (let k = 0; k < 30; k++) {
      if (!servedId(el.innerHTML)) break;
      served++;
      if (!D.nodes(el, 'ans').length) break;
      D.nodes(el, 'ans')[0].fire('click');
      if (!D.nodes(el, 'nextq').length) break;
      D.click(el, 'nextq');
    }
    ok(served > 0, `${P.name}: mixed practice draws again after the restore (${served})`);
  }

  restore();
  console.log('');
});

/* ── 7. Two devices that disagree ─────────────────────────────────────────
   Run once rather than per player: both write the same record shape into the
   same backup format, and this is a statement about the MERGE, which is one
   piece of code. Driven through progress-backup itself — a restatement of the
   rule here would agree with a broken merge as happily as with a working one. */
console.log(`${BOLD}Two devices${RESET}`);
section('  through the real progress-backup merge');
{
  const B = require(path.join(__dirname, '..', 'progress-backup.js'));
  const merge = B && B.mergeAll;
  if (typeof merge !== 'function') {
    /* Named explicitly rather than skipped: a merge this check cannot reach is
       a merge this check is not testing, and that has to be visible. */
    ok(false, 'progress-backup exposes a merge this check can drive');
  } else {
    /* mergeAll works over the storage keys themselves, which is why the shape
       here is the real store key rather than a tidier stand-in: a check that
       merged a shape the app never writes would prove nothing about the app. */
    const snap = (k, ku) => ({
      [D3.STORE_KEY]: { practice: { units: { tpfb: { qs: { 'X-1-1': ku ? { k, ku } : { k } } } } } },
      [D1.STORE_KEY]: { practice: { qs: { 'X-1-1': ku ? { k, ku } : { k } } } },
    });
    const laptop = snap(1000);              // retired at t=1000
    const phone = snap(1000, 2000);         // brought back at t=2000
    const read3 = (m) => ((((m[D3.STORE_KEY] || {}).practice || {}).units || {}).tpfb || {}).qs['X-1-1'] || {};
    const read1 = (m) => (((m[D1.STORE_KEY] || {}).practice || {}).qs || {})['X-1-1'] || {};
    [['Level 3', read3], ['Level 1', read1]].forEach(([name, read]) => {
      const a = read(merge(laptop, phone));
      const b = read(merge(phone, laptop));
      ok((a.ku || 0) > (a.k || 0), `${name}: the later decision wins, whichever side it arrived from`);
      ok((b.ku || 0) > (b.k || 0), `${name}: and the merge is order-independent`);
      /* Retiring again on the laptop, after the phone brought it back, must
         retire it — otherwise the control is one-way after the first sync. */
      const again = read(merge(snap(3000, 2000), phone));
      ok((again.k || 0) > (again.ku || 0), `${name}: a later retirement wins over an earlier restore`);
    });
  }
}

console.log('');
if (failures) {
  console.log(`${RED}${BOLD}── ${failures} of ${checks} checks failed${RESET}`);
  process.exit(1);
}
console.log(`${GREEN}${BOLD}── Retiring a question retires it: ${checks} checks ✓${RESET}`);
