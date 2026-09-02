#!/usr/bin/env node
/**
 * The glossary, and the flashcards drawn from it.
 *
 * WHY A GLOSSARY NEEDS A CHECK AT ALL. It is the one screen in the app where
 * being WRONG and being ABSENT look identical to the reader, because looking a
 * word up is what you do instead of knowing it. Nobody double-checks a
 * definition they came to the glossary to learn. Three failure modes follow
 * from that, and none of them shows on the screen:
 *
 *   · a definition that disagrees with what the lesson taught
 *   · a figure that was right when it was typed and is now a Budget out of date
 *   · a term tagged to an outcome that does not exist, which drops it out of
 *     every grouped view and makes it findable only by search
 *
 * And the flashcards have a fourth, which is the reason they exist:
 *
 *   · a card graded as known that writes nothing, or writes into the wrong
 *     store — leaving the reader with a schedule that never moves, and no way
 *     to tell, because the cards keep coming either way
 *
 * So this asserts, on both players:
 *
 *   §1  every term is complete, unique, and tagged to a real outcome
 *   §2  every outcome has vocabulary, and every term taught on a card is here
 *   §3  the governed figures come from the tax data, not from the file
 *   §4  the glossary paints, groups by outcome, and shows every term
 *   §5  the search narrows on the term AND on the definition, and clears
 *   §6  a run turns a card over before it grades, and refuses to grade before
 *   §7  a graded card writes a spaced-repetition schedule into the same store
 *       every other answer goes to — and into the lesson map, not the practice
 *       one, so a term is never counted as practice the reader never did
 *   §8  a run prefers what is due, then what has never been seen
 *
 * Run: node scripts/check-glossary.js   (exit 1 on any failure)
 */

'use strict';

const path = require('path');
const D3 = require('./lib/aat3-driver.js');
const D1 = require('./lib/aat1-driver.js');

const RED = '\x1b[31m', GREEN = '\x1b[32m', DIM = '\x1b[2m', BOLD = '\x1b[1m', RESET = '\x1b[0m';

let failures = 0, checks = 0;
function ok(cond, label) {
  checks++;
  if (!cond) { failures++; console.log(`  ${RED}✗${RESET} ${label}`); }
}
function section(t) { console.log(`${DIM}${t}${RESET}`); }

console.log(`${BOLD}The glossary, on both self-rendering players${RESET}\n`);

const ROOT = path.join(__dirname, '..');
const SYL1 = require(path.join(ROOT, 'aat1-syllabus.js')).SYLLABUS;
const SYL3 = require(path.join(ROOT, 'aat3-syllabus.js')).SYLLABUS;

/* ── The two players ──────────────────────────────────────────────────────── */

const LEVEL3 = {
  name: 'Level 3', D: D3, pfx: 'a3',
  /* One entry per unit, because Level 3's glossary is per unit and a check that
     only looked at the first would miss two thirds of it. */
  lists() {
    const G = require(path.join(ROOT, 'aat3-glossary-data.js')).AAT3_GLOSSARY.UNITS;
    return Object.keys(G).map(u => ({
      key: u, terms: G[u], outcomes: SYL3.units[u].outcomes,
      /* Level 3's cards carry no `terms` lists — that is a Level 1 shape — so
         there is nothing to cross-check the definitions against here. Named
         rather than omitted, so the empty array is a statement and not a gap. */
      taught: [],
    }));
  },
  open(unit, terms) {
    const M = D3.loadUI(D3.fakeStore());
    if (terms) M.AAT3_GLOSSARY = { UNITS: { [unit]: terms } };
    const el = D3.fakeEl();
    M.AAT3_UI.reset('path', unit);
    M.AAT3_UI.mount(el);
    D3.click(el, 'gloss');
    return { M, el };
  },
  store(M) { return JSON.parse(global.localStorage.getItem(D3.STORE_KEY) || '{}'); },
  practiceQs(data, unit) { return (((data.practice || {}).units || {})[unit] || {}).qs || {}; },
};

const LEVEL1 = {
  name: 'Level 1', D: D1, pfx: 'a1',
  lists() {
    const G = require(path.join(ROOT, 'aat1-glossary-data.js')).AAT1_GLOSSARY.TERMS;
    const taught = [];
    (require(path.join(ROOT, 'aat1-learn-data.js')).AAT1_LEARN_PATH || []).forEach(g =>
      (g.lessons || []).forEach(l => (l.cards || []).forEach(c =>
        (c.terms || []).forEach(t => taught.push({ where: l.id, t: t.t, d: t.d })))));
    return [{ key: 'bkfn', terms: G, outcomes: SYL1.units.bkfn.outcomes, taught }];
  },
  open(unit, terms) {
    const M = D1.loadUI(D1.fakeStore());
    if (terms) M.AAT1_GLOSSARY = { TERMS: terms };
    const el = D1.fakeEl();
    M.AAT1_UI.reset('path');
    M.AAT1_UI.mount(el);
    D1.click(el, 'gloss');
    return { M, el };
  },
  store() { return JSON.parse(global.localStorage.getItem(D1.STORE_KEY) || '{}'); },
  practiceQs(data) { return (data.practice || {}).qs || {}; },
};

const PLAYERS = [LEVEL3, LEVEL1];

PLAYERS.forEach(P => {
  const D = P.D;
  console.log(`${BOLD}${P.name}${RESET}`);
  const lists = P.lists();
  ok(lists.length > 0, `${P.name}: there is a glossary`);

  /* ── 1. Every term is a term ───────────────────────────────────────────── */
  section('  1. the terms themselves');
  lists.forEach(L => {
    const seen = new Map();
    const bad = { short: [], stub: [], badLo: [], dup: [], circular: [], markup: [] };
    const known = new Set(L.outcomes.map(o => o.n));
    L.terms.forEach(t => {
      if (!t.t || String(t.t).trim().length < 2) bad.short.push(String(t.t));
      /* A stub is the failure a glossary rots into: a term added to the list
         with a placeholder meaning, which reads as an answer. */
      if (!t.d || String(t.d).trim().length < 25) bad.stub.push(t.t);
      if (!known.has(t.lo)) bad.badLo.push(`${t.t} → outcome ${t.lo}`);
      const k = String(t.t).toLowerCase();
      if (seen.has(k)) bad.dup.push(t.t); else seen.set(k, 1);
      /* "A quotation is a quotation" — a definition whose only content is the
         term restates it. Tested as: strip the term's own words out and see
         whether anything of substance is left.

         THREE, NOT SIX. The first version demanded six substantial words and
         reported eleven definitions as circular that are simply short and
         crisp — "Someone who buys from the business" has four. A threshold that
         fires on good writing is a threshold that gets raised until it fires on
         nothing, so it is set where it catches a genuine restatement and
         nothing else. */
      const words = String(t.d).toLowerCase().replace(/[^a-z ]/g, ' ').split(/\s+/)
        .filter(w => w.length > 3 && k.indexOf(w) === -1);
      if (words.length < 3) bad.circular.push(t.t);
      if (/<[a-z/]/i.test(String(t.d))) bad.markup.push(t.t);
    });
    const clean = (list, label) =>
      ok(list.length === 0, `${P.name} ${L.key}: ${label} (${list.length}: ${list.slice(0, 3).join(' · ')})`);
    ok(L.terms.length >= 60, `${P.name} ${L.key}: has enough vocabulary to be worth opening (${L.terms.length})`);
    clean(bad.short, 'every term is named');
    clean(bad.stub, 'every definition is a sentence, not a stub');
    clean(bad.badLo, 'every term belongs to an outcome that exists');
    clean(bad.dup, 'no term is defined twice');
    clean(bad.circular, 'no definition merely restates its own term');
    clean(bad.markup, 'no definition carries markup');
  });

  /* ── 2. Coverage ───────────────────────────────────────────────────────── */
  section('  2. coverage');
  lists.forEach(L => {
    const empty = L.outcomes.filter(o => !L.terms.some(t => t.lo === o.n));
    ok(empty.length === 0,
      `${P.name} ${L.key}: every outcome has vocabulary (${empty.map(o => o.n).join(' ')} empty)`);

    /* THE GLOSSARY MUST NOT DISAGREE WITH THE TEACHING. Level 1's cards define
       terms in place; every one of them has to be findable here, or a reader
       who met a word in a lesson and came looking for it finds nothing and
       concludes the glossary is incomplete — which it would be. */
    if (L.taught.length) {
      const have = new Set(L.terms.map(t => t.t.toLowerCase()));
      const missing = [...new Set(L.taught.filter(x => !have.has(x.t.toLowerCase())).map(x => x.t))];
      ok(missing.length === 0,
        `${P.name} ${L.key}: every term taught on a card is in the glossary (${missing.slice(0, 4).join(' · ')})`);
      ok(L.taught.length > 20, `${P.name} ${L.key}: there were card terms to check against (${L.taught.length})`);
    }
  });
  console.log('');
});

/* ── 3. Governed figures ──────────────────────────────────────────────────
   Run once, on Level 3, because it is the only glossary carrying statutory
   numbers. Asserted by CHANGING the tax data and requiring the glossary to
   change with it — a check that merely read the same constant from the same
   place would agree with a hard-coded string as happily as with an
   interpolated one. */
console.log(`${BOLD}Governed figures${RESET}`);
section('  3. rates come from the tax data, not from the glossary');
{
  const taxPath = require.resolve(path.join(ROOT, 'aat3-tax-data.js'));
  const glossPath = require.resolve(path.join(ROOT, 'aat3-glossary-data.js'));
  const load = () => {
    delete require.cache[glossPath];
    return require(glossPath).AAT3_GLOSSARY.UNITS.tpfb;
  };
  const before = load();
  const rate = require(taxPath).TAX.rates.standard;
  const said = (list, term) => (list.find(t => t.t === term) || {}).d || '';

  ok(/\b20%/.test(said(before, 'Standard rate')),
    `the standard rate reaches the definition (${said(before, 'Standard rate').slice(0, 60)})`);

  /* Move the rate, reload, and require the glossary to have moved. Restored
     immediately afterwards — the module object is shared, so leaving it changed
     would poison every check that ran after this one in the same process. */
  const real = rate.value;
  try {
    rate.value = 17;
    const after = load();
    ok(/\b17%/.test(said(after, 'Standard rate')),
      `a change in the tax data reaches the glossary (${said(after, 'Standard rate').slice(0, 60)})`);
    ok(/\b17%/.test(said(after, 'VAT fraction')) || !/\b20%/.test(said(after, 'VAT fraction')),
      'and no definition keeps the old rate behind it');
  } finally {
    rate.value = real;
    load();
  }
  const restored = load();
  ok(/\b20%/.test(said(restored, 'Standard rate')), 'and the real rate is put back afterwards');
}
console.log('');

/* ── Everything below drives the real screens ───────────────────────────── */
PLAYERS.forEach(P => {
  const D = P.D;
  console.log(`${BOLD}${P.name} — on screen${RESET}`);
  const L = P.lists()[0];
  const unit = L.key;

  /* ── 4. It paints ──────────────────────────────────────────────────────── */
  section('  4. the glossary screen');
  {
    const { el } = P.open(unit);
    const html = el.innerHTML;
    const rows = (html.match(new RegExp(`${P.pfx}-glossrow`, 'g')) || []).length;
    ok(rows === L.terms.length, `${P.name}: every term is on the page (${rows} of ${L.terms.length})`);
    const groups = (html.match(new RegExp(`${P.pfx}-glossgroup-h`, 'g')) || []).length;
    ok(groups >= L.outcomes.filter(o => L.terms.some(t => t.lo === o.n)).length,
      `${P.name}: grouped by outcome (${groups} headings)`);
    ok(!/undefined|NaN|\[object/.test(html), `${P.name}: nothing renders as undefined`);
    /* A term picked from the middle of the list, so a screen that rendered only
       its first group would fail. */
    const mid = L.terms[Math.floor(L.terms.length / 2)];
    ok(html.indexOf(mid.d.slice(0, 40).replace(/&/g, '&amp;')) !== -1 || html.indexOf(mid.t) !== -1,
      `${P.name}: a term from the middle of the list is present (${mid.t})`);
  }
  {
    /* A TERM WHOSE OUTCOME DOES NOT EXIST STILL REACHES THE PAGE. §1 asserts
       the shipped data has none, so this cannot be tested against it — and
       that is precisely why it is tested with an injected one. The screen is
       built by walking the outcomes and pulling each one's terms out, so a
       mistyped `lo` falls through every group and lands nowhere: a definition
       findable only by someone who already knows the word, which is the one bug
       a glossary can have that looks like no bug at all.

       Both the good term and the orphan are asserted, so a screen that rendered
       nothing at all could not pass this by rendering the orphan alone. */
    const orphan = { t: 'Zzorphan', d: 'A term tagged to an outcome that does not exist in this unit.', lo: 99 };
    const good = { t: 'Zzanchor', d: 'A term tagged to an outcome that does exist in this unit.', lo: L.outcomes[0].n };
    const { el } = P.open(unit, [good, orphan]);
    ok(el.innerHTML.indexOf(good.t) !== -1, `${P.name}: a well-tagged term renders`);
    ok(el.innerHTML.indexOf(orphan.t) !== -1,
      `${P.name}: and one tagged to no outcome is shown rather than silently dropped`);
    ok(/Other terms/.test(el.innerHTML), `${P.name}: under a heading that says what it is`);
  }

  /* ── 5. Search ─────────────────────────────────────────────────────────── */
  section('  5. searching');
  {
    const { el } = P.open(unit);
    const box = D.nodes(el, 'glossin')[0];
    ok(!!box, `${P.name}: there is a search box`);
    const target = L.terms[3];
    box.value = target.t;
    box.fire('input');
    let rows = (el.innerHTML.match(new RegExp(`${P.pfx}-glossrow`, 'g')) || []).length;
    ok(rows > 0 && rows < L.terms.length,
      `${P.name}: searching a term narrows the list (${rows} of ${L.terms.length})`);
    ok(el.innerHTML.indexOf(target.t) !== -1, `${P.name}: and the term searched for survives it`);

    /* THE DEFINITIONS ARE SEARCHED TOO. A reader who has forgotten the word
       but remembers a phrase from its meaning is exactly who a glossary is
       for, and a term-only search fails them. Uses a distinctive phrase from a
       definition that does NOT appear in its own term. */
    const withPhrase = L.terms.find(t => {
      const w = t.d.toLowerCase().replace(/[^a-z ]/g, ' ').split(/\s+/).find(x => x.length > 7);
      return w && t.t.toLowerCase().indexOf(w) === -1 &&
        L.terms.filter(o => (o.t + ' ' + o.d).toLowerCase().indexOf(w) !== -1).length < L.terms.length;
    });
    ok(!!withPhrase, `${P.name}: there is a definition-only phrase to search for`);
    if (withPhrase) {
      const w = withPhrase.d.toLowerCase().replace(/[^a-z ]/g, ' ').split(/\s+/).find(x => x.length > 7);
      const box2 = D.nodes(el, 'glossin')[0];
      box2.value = w;
      box2.fire('input');
      ok(el.innerHTML.indexOf(withPhrase.t) !== -1,
        `${P.name}: a phrase from a definition finds its term ("${w}" → ${withPhrase.t})`);
    }

    /* Nothing matching says so rather than rendering an empty page. */
    const box3 = D.nodes(el, 'glossin')[0];
    box3.value = 'zzzznothinglikethis';
    box3.fire('input');
    ok((el.innerHTML.match(new RegExp(`${P.pfx}-glossrow`, 'g')) || []).length === 0,
      `${P.name}: a search matching nothing shows nothing`);
    ok(/Nothing matches/.test(el.innerHTML), `${P.name}: and says so`);

    D.click(el, 'glossclear');
    rows = (el.innerHTML.match(new RegExp(`${P.pfx}-glossrow`, 'g')) || []).length;
    ok(rows === L.terms.length, `${P.name}: clearing the search brings every term back (${rows})`);
  }

  /* ── 6. A run turns the card over before it grades ─────────────────────── */
  section('  6. a flashcard run');
  {
    const { el } = P.open(unit);
    D.click(el, 'startflash');
    const stem = new RegExp(`${P.pfx}-q">([^<]*)<`);
    const first = stem.exec(el.innerHTML);
    ok(!!first, `${P.name}: a card is on screen, with a stem the harnesses can read`);
    ok(L.terms.some(t => t.t === (first || [])[1]), `${P.name}: and the stem is a term from the glossary`);

    /* THE MEANING IS NOT ON THE PAGE BEFORE IT IS TURNED OVER. This is the
       whole exercise: a card that shows the answer with the prompt is a
       reading exercise, and nothing about the screen would look wrong. */
    const term = L.terms.find(t => t.t === first[1]);
    ok(el.innerHTML.indexOf(term.d.slice(20, 60)) === -1,
      `${P.name}: the meaning is not on the page before the card is turned over`);
    ok(D.nodes(el, 'flashyes').length === 0 && D.nodes(el, 'flashno').length === 0,
      `${P.name}: and there is nothing to grade with yet`);

    D.click(el, 'flashflip');
    ok(el.innerHTML.indexOf(term.d.slice(20, 60)) !== -1, `${P.name}: turning it over shows the meaning`);
    ok(D.nodes(el, 'flashyes').length === 1 && D.nodes(el, 'flashno').length === 1,
      `${P.name}: and both grades are offered, equally`);
  }
  {
    /* A STALE TAP. The grade buttons only render on a turned-over card, so the
       renderer alone would look like guard enough — and it is not, because a
       node from the previous paint is live for as long as the finger is
       travelling. Grade one card, then fire the OLD button on the next. */
    const { el } = P.open(unit);
    D.click(el, 'startflash');
    D.click(el, 'flashflip');
    const stale = D.nodes(el, 'flashyes')[0];
    D.click(el, 'flashyes');
    const stem = new RegExp(`${P.pfx}-q">([^<]*)<`);
    const nowOn = (stem.exec(el.innerHTML) || [])[1];
    ok(!!nowOn && D.nodes(el, 'flashyes').length === 0,
      `${P.name}: the next card arrives face down`);
    stale.fire('click');
    ok((stem.exec(el.innerHTML) || [])[1] === nowOn,
      `${P.name}: a stale tap cannot grade the card underneath it`);
  }

  /* ── 7. What a graded card writes ──────────────────────────────────────── */
  section('  7. what a graded card records');
  {
    const store = P.D.fakeStore();
    const M = P.D === D3 ? D3.loadUI(store) : D1.loadUI(store);
    const el = P.D.fakeEl();
    if (P.D === D3) { M.AAT3_UI.reset('path', unit); M.AAT3_UI.mount(el); }
    else { M.AAT1_UI.reset('path'); M.AAT1_UI.mount(el); }
    D.click(el, 'gloss');
    D.click(el, 'startflash');
    const stem = new RegExp(`${P.pfx}-q">([^<]*)<`);
    const term = (stem.exec(el.innerHTML) || [])[1];
    D.click(el, 'flashflip');
    D.click(el, 'flashyes');

    const data = JSON.parse(store.getItem(P.D.STORE_KEY) || '{}');
    const id = 'gloss~' + term;
    const rec = (data.lessonQs || {})[id];
    ok(!!rec, `${P.name}: the card was recorded (${id})`);
    ok(rec && typeof rec.r === 'number', `${P.name}: a correct grade writes the right-answer stamp`);
    /* THE SAME SCHEDULE EVERYTHING ELSE GETS. Without this a term would be
       recorded and never come round again, which is the failure the reader
       cannot see: the cards keep coming, drawn at random, for ever. */
    ok(rec && rec.sr && typeof rec.sr.dueAt === 'number',
      `${P.name}: and a spaced-repetition schedule with it`);
    /* AND NOT INTO THE PRACTICE MAP. A term is not a bank question; counted
       there it would inflate "questions attempted" with practice the reader
       never did. */
    const qs = P.practiceQs(data, unit);
    ok(!qs[id] && !Object.keys(qs).some(k => k.indexOf('gloss~') === 0),
      `${P.name}: and not into the practice record`);

    /* A wrong grade writes the other stamp, and puts the term in the backlog. */
    const term2 = (stem.exec(el.innerHTML) || [])[1];
    D.click(el, 'flashflip');
    D.click(el, 'flashno');
    const data2 = JSON.parse(store.getItem(P.D.STORE_KEY) || '{}');
    const rec2 = (data2.lessonQs || {})['gloss~' + term2];
    ok(rec2 && typeof rec2.w === 'number', `${P.name}: "not yet" writes the wrong-answer stamp`);
    ok(rec2 && rec2.sr && typeof rec2.sr.dueAt === 'number', `${P.name}: and its own schedule`);
    /* THE TWO SCHEDULES DIVERGE, and this asserts the state that makes them
       diverge rather than the due dates themselves. A first sighting is one day
       away whichever way it was graded — see spaced.js, where the interval only
       starts widening on the second correct answer in a row — so comparing the
       two dueAt values here would be comparing two identical numbers and
       calling it a check. What differs on the first grade is `lastResult` and
       `reps`, and those are what the next answer is scheduled from.

       How the intervals then move apart is check-spaced.js's job, and is not
       restated here: two gates asserting the same arithmetic is one gate and
       one place for them to disagree. */
    ok(rec.sr.lastResult === true && rec.sr.reps > 0,
      `${P.name}: the known card is recorded as known, and counts towards its run of them`);
    ok(rec2.sr.lastResult === false && rec2.sr.reps === 0,
      `${P.name}: the one not had resets the run, so it stays on the short interval`);
    ok(rec2.sr.ease < rec.sr.ease,
      `${P.name}: and is treated as harder than the one that was known`);
  }

  /* ── 8. What a run draws ───────────────────────────────────────────────── */
  section('  8. what a run draws first');
  {
    /* Half the glossary answered correctly and scheduled far into the future,
       one term explicitly overdue. The overdue one must be in the next run —
       a run that ignored the schedule would find it only by luck. */
    const target = L.terms[Math.floor(L.terms.length * 0.75)];
    const lessonQs = {};
    const far = Date.now() + 300 * 24 * 3600 * 1000;
    L.terms.forEach(t => {
      lessonQs['gloss~' + t.t] = {
        r: Date.now() - 1000, w: Date.now() - 2000,
        sr: { dueAt: far, reps: 5, ease: 2.5, interval: 300 },
      };
    });
    lessonQs['gloss~' + target.t].sr = { dueAt: Date.now() - 24 * 3600 * 1000, reps: 1, ease: 2.5, interval: 1 };
    const store = P.D.fakeStore({ [P.D.STORE_KEY]: JSON.stringify({ lessonQs }) });
    const M = P.D === D3 ? D3.loadUI(store) : D1.loadUI(store);
    const el = P.D.fakeEl();
    if (P.D === D3) { M.AAT3_UI.reset('path', unit); M.AAT3_UI.mount(el); }
    else { M.AAT1_UI.reset('path'); M.AAT1_UI.mount(el); }
    D.click(el, 'gloss');
    D.click(el, 'startflash');
    const stem = new RegExp(`${P.pfx}-q">([^<]*)<`);
    const seen = [];
    for (let i = 0; i < 20; i++) {
      const t = (stem.exec(el.innerHTML) || [])[1];
      if (!t) break;
      seen.push(t);
      if (!D.nodes(el, 'flashflip').length) break;
      D.click(el, 'flashflip');
      D.click(el, 'flashyes');
    }
    ok(seen.length > 5, `${P.name}: the run served cards (${seen.length})`);
    ok(seen[0] === target.t,
      `${P.name}: the overdue term is served first (wanted ${target.t}, got ${seen[0]})`);
  }
  console.log('');
});

if (failures) {
  console.log(`${RED}${BOLD}── ${failures} of ${checks} checks failed${RESET}`);
  process.exit(1);
}
console.log(`${GREEN}${BOLD}── The glossary agrees with the teaching and the cards are scheduled: ${checks} checks ✓${RESET}`);
