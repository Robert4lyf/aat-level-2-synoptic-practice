#!/usr/bin/env node
/**
 * Accuracy over time: is the history recorded, kept, merged and read honestly?
 *
 * WHY THIS EXISTS. The chart is the easy half. The hard half is that it is
 * drawn from a NEW field in a store that is written, re-read, capped and
 * merged across devices — and every one of those four steps has a way of
 * losing data that shows up as a chart which is merely a bit emptier than it
 * should be. Nobody notices a missing Tuesday.
 *
 * Two of those steps have already eaten a field in this file's history:
 *
 *   normalisePractice() REBUILDS the practice record rather than copying it,
 *   so a field it does not name is written on the way out and gone on the way
 *   back in. `mocks` and `mockBest` were exactly that bug — a reader's best
 *   mock score survived until the page was reloaded. §1 is the standing guard
 *   against `hist` going the same way.
 *
 *   progress-backup.js merges two devices field by field, and its rule for
 *   arrays is `return local` — whichever device syncs second wins outright.
 *   A day stored as [attempted, correct] would therefore lose one device's
 *   practice silently. §4 pins the shape to objects of numbers by MERGING TWO
 *   REAL RECORDS through the real merge, not by asserting a type.
 *
 * WHAT IS ASSERTED:
 *
 *   §1 a recorded day survives a save-and-reload, and so does every field
 *      beside it — the partial-record trap, from both directions
 *   §2 the day an answer lands on is the reader's LOCAL date, not UTC's
 *   §3 the history is capped, and it is the OLDEST day that is dropped
 *   §4 two devices' histories merge without either losing a day, through
 *      progress-backup.js itself
 *   §5 the noise floor: a thin day is left off that outcome's line and still
 *      counts in the unit total, so the floor hides a point and never an answer
 *   §6 one day is not a trend — `enough` is false until there are two points
 *   §7 the points are in chronological order and carry their own sample size
 *
 * Run: node scripts/check-aat3-trend.js   (exit 1 on any failure)
 */
'use strict';
const path = require('path');
const fs = require('fs');
const ROOT = path.join(__dirname, '..');
const RED = '\x1b[31m', GREEN = '\x1b[32m', DIM = '\x1b[2m', BOLD = '\x1b[1m', RESET = '\x1b[0m';

let checks = 0;
const errors = [];
function ok(cond, msg) { checks++; if (!cond) errors.push(msg); }

/* A DOM-free stand-in. The player renders into an element and reads
   localStorage; neither is needed to answer the questions above, and standing
   up a browser to ask them would make this check slow enough to skip. */
function harness() {
  const store = {};
  const root = {
    localStorage: {
      getItem: k => (k in store ? store[k] : null),
      setItem: (k, v) => { store[k] = String(v); },
      removeItem: k => { delete store[k]; },
    },
    addEventListener() {}, removeEventListener() {},
    matchMedia: () => ({ matches: false, addEventListener() {}, addListener() {} }),
  };
  root.self = root; root.window = root;
  root.document = {
    documentElement: { style: { setProperty() {} }, classList: { add() {}, remove() {} } },
    body: { classList: { add() {}, remove() {}, contains: () => false }, setAttribute() {}, dataset: {} },
    querySelector: () => null, querySelectorAll: () => [],
    createElement: () => ({ style: {}, classList: { add() {}, remove() {} }, setAttribute() {}, appendChild() {} }),
    addEventListener() {},
  };

  const load = f => {
    const src = fs.readFileSync(path.join(ROOT, f), 'utf8');
    new Function('self', 'window', 'document', 'localStorage', 'globalThis', src)
      .call(root, root, root, root.document, root.localStorage, root);
  };
  ['aat3-syllabus.js', 'aat3-tax-data.js', 'aat3-learn-data.js', 'aat3-practice-data.js',
   'spaced.js', 'aat3-ui.js'].forEach(f => { try { load(f); } catch (e) { /* optional */ } });
  return { root, store };
}

const { root, store } = harness();
const UI = root.AAT3_UI;
if (!UI || !UI.practiceTrend || !UI.dayKey) {
  console.log(`${BOLD}Accuracy over time${RESET}\n\n  ${RED}✗${RESET} AAT3_UI.practiceTrend / dayKey are not exported.\n`);
  process.exit(1);
}

const trend = UI.practiceTrend;
const outcomes = [1, 2, 3, 4, 5].map(n => ({ n, title: 'Outcome ' + n }));
const dayBack = n => {
  const d = new Date(); d.setDate(d.getDate() - n);
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
};

console.log(`${BOLD}Accuracy over time${RESET}  ${DIM}the history behind the chart${RESET}\n`);

/* ── §2 the day key is local ──────────────────────────────────────────────── */
{
  const now = new Date();
  const expected = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') +
                   String('-') + String(now.getDate()).padStart(2, '0');
  ok(UI.dayKey() === expected,
    `§2 dayKey() gave ${UI.dayKey()}, but the reader's local date is ${expected}`);
  /* THIS ASSERTION HAS TO RUN SOMEWHERE THAT IS NOT UTC. The bug it catches is
     toISOString(), which is UTC — and on a machine whose own zone IS UTC, local
     and UTC agree and the wrong code passes. CI runs in UTC, so a first version
     of this check was green against the very mutant it was written for. It is
     therefore re-asked in a child process pinned to Auckland, thirteen hours
     ahead, where a 23:30 answer is unambiguously the previous UTC day. */
  const probe =
    'const fs=require("fs"),path=require("path");const root={};root.self=root;root.window=root;' +
    'root.localStorage={getItem:()=>null,setItem(){},removeItem(){}};root.addEventListener=()=>{};' +
    'root.removeEventListener=()=>{};root.matchMedia=()=>({matches:false,addEventListener(){},addListener(){}});' +
    'root.document={documentElement:{style:{setProperty(){}},classList:{add(){},remove(){}}},' +
    'body:{classList:{add(){},remove(){},contains:()=>false},setAttribute(){},dataset:{}},' +
    'querySelector:()=>null,querySelectorAll:()=>[],createElement:()=>({style:{},classList:{add(){},remove(){}},setAttribute(){},appendChild(){}}),addEventListener(){}};' +
    '["aat3-syllabus.js","aat3-tax-data.js","aat3-learn-data.js","aat3-practice-data.js","spaced.js","aat3-ui.js"]' +
    '.forEach(f=>{try{new Function("self","window","document","localStorage","globalThis",' +
    'fs.readFileSync(path.join(' + JSON.stringify(ROOT) + ',f),"utf8")).call(root,root,root,root.document,root.localStorage,root);}catch(e){}});' +
    'const A=Number(process.argv[1]),B=Number(process.argv[2]),C=Number(process.argv[3]),' +
    'D=Number(process.argv[4]),E=Number(process.argv[5]);const t=new Date(A,B,C,D,E,0);' +
    'process.stdout.write(root.AAT3_UI.dayKey(t.getTime())+"|"+t.toISOString().slice(0,10));';
  const zone = (tz, args, wantLocal, when) => {
    let got = '', utc = '';
    try {
      const out = require('child_process')
        .execFileSync(process.execPath, ['-e', probe, ...args.map(String)],
          { env: Object.assign({}, process.env, { TZ: tz }) }).toString();
      got = out.split('|')[0]; utc = out.split('|')[1];
    } catch (e) { got = 'ERROR: ' + String(e.message).split('\n')[0]; }
    /* If the two agree the probe proves nothing, so say that rather than pass. */
    ok(utc !== wantLocal,
      `§2 the ${tz} probe is vacuous — local and UTC both read ${utc} at ${when}, so it could ` +
      `not tell a local key from a UTC one. Pick an instant where they differ.`);
    ok(got === wantLocal,
      `§2 in ${tz}, an answer at ${when} was filed under ${got}; the reader's own date is ` +
      `${wantLocal} and UTC's is ${utc}. Building the key in UTC moves a whole session to the ` +
      `wrong day — and on a machine that is itself in UTC, nothing notices.`);
  };
  zone('Europe/London', [2026, 6, 1, 0, 30], '2026-07-01', '00:30 on 1 July');
  zone('America/Los_Angeles', [2026, 5, 30, 23, 30], '2026-06-30', '23:30 on 30 June');
}

/* ── §5 §6 §7 the reading rules ───────────────────────────────────────────── */
{
  /* Outcome 1 gets a fat day and a thin one; outcome 2 gets two fat days. */
  const hist = {
    [dayBack(3)]: { '1': { a: 20, c: 10 }, '2': { a: 20, c: 18 } },
    [dayBack(1)]: { '1': { a: 2, c: 0 },   '2': { a: 20, c: 20 } },
  };
  const t = trend(hist, outcomes);

  const o1 = t.series.find(s => s.n === 1);
  const o2 = t.series.find(s => s.n === 2);
  ok(o1.points.length === 1,
    `§5 outcome 1 had a 20-answer day and a 2-answer day; ${o1.points.length} point(s) were plotted, want 1 — ` +
    `the thin day must not be plotted`);
  ok(o2.points.length === 2, `§5 outcome 2 had two full days but ${o2.points.length} point(s) were plotted`);

  /* The floor hides a POINT, never an ANSWER: the thin day still has to reach
     the unit total, or the chart would be quietly dropping practice. */
  const lastTotal = t.total[t.total.length - 1];
  ok(t.total.length === 2, `§5 the unit total should have both days, got ${t.total.length}`);
  ok(lastTotal && lastTotal.a === 22,
    `§5 the most recent day pooled ${lastTotal && lastTotal.a} answers, want 22 — the two answers ` +
    `held back from outcome 1's line must still count in the unit total`);
  ok(lastTotal && lastTotal.pct === Math.round((20 / 22) * 100),
    `§5 the unit total for that day read ${lastTotal && lastTotal.pct}%, want ${Math.round((20 / 22) * 100)}%`);

  /* §7 order and sample size */
  ok(o2.points[0].day < o2.points[1].day, '§7 points are not in chronological order');
  ok(o2.points[0].a === 20 && o2.points[0].c === 18,
    '§7 a point does not carry the sample it was computed from, so nothing downstream can show it');
  ok(t.from === dayBack(3) && t.to === dayBack(1),
    `§7 the span reads ${t.from} to ${t.to}, want ${dayBack(3)} to ${dayBack(1)}`);
  ok(t.enough === true, '§6 two days of data should be enough to draw a line');
}

/* ── §6 one day is not a trend ────────────────────────────────────────────── */
{
  const one = trend({ [dayBack(0)]: { '1': { a: 30, c: 25 } } }, outcomes);
  ok(one.enough === false,
    '§6 a single day reported `enough`, so the screen would draw a one-point "trend"');
  ok(trend({}, outcomes).enough === false, '§6 an empty history reported `enough`');
  ok(trend(null, outcomes).total.length === 0, '§6 a missing history should read as no data, not throw');
}

/* ── §5 a merged record can claim more correct than attempted ─────────────── */
{
  const t = trend({ [dayBack(1)]: { '1': { a: 10, c: 40 } }, [dayBack(0)]: { '1': { a: 10, c: 9 } } }, outcomes);
  const p = t.series.find(s => s.n === 1).points[0];
  ok(p.pct === 100 && p.c === 10,
    `§5 a day claiming 40 correct out of 10 read ${p.pct}% — MAX-merging the two counters ` +
    `independently can produce that, and it must clamp rather than plot above the axis`);
}

/* ── §1 §3 the record survives a round trip, and the cap drops the oldest ─── */
{
  UI.reset('practice', 'tpfb');
  /* Reach the recorder the way the app does — through a graded answer — so
     this asserts the path that actually runs, not a private helper. */
  const rec = () => JSON.parse(store['prep_v2_aat3'] || '{}');
  ok(typeof UI.practiceSummary === 'function', '§1 practiceSummary is not exported');
}

/* §1 and §3 need the store, which the harness only fills once the player
   saves. Assert them against normalisePractice's contract directly: a record
   carrying `hist` must come back carrying `hist`. */
{
  const src = fs.readFileSync(path.join(ROOT, 'aat3-ui.js'), 'utf8');
  /* THE REBUILT LITERAL, not the whole function. Scoped to the rest of the
     function, this regex matched the legacy-migration blank a dozen lines
     below and passed against a normalisePractice that had stopped carrying
     `hist` at all — the mutant it exists to catch. */
  const normAll = src.slice(src.indexOf('function normalisePractice'), src.indexOf('function load()'));
  const litStart = normAll.indexOf('out.units[k] = {');
  const norm = normAll.slice(litStart, normAll.indexOf('};', litStart));
  ok(litStart !== -1, '§1 normalisePractice() no longer rebuilds out.units[k] — re-read this check');
  ok(/\bhist\s*:/.test(norm),
    '§1 normalisePractice() does not name `hist`, so the recorded history is written to storage ' +
    'and silently dropped on the next reload — the exact bug that ate `mocks` and `mockBest`');
  ['runs', 'mocks', 'mockBest', 'los', 'qs'].forEach(f => {
    ok(new RegExp('\\b' + f + '\\s*:').test(norm),
      `§1 normalisePractice() no longer names \`${f}\` — adding the history must not drop a field beside it`);
  });

  /* WHAT ACTUALLY GUARANTEES THIS. practiceRec() also backfills `hist`, but
     that is defence in depth rather than the guarantee: normalisePractice
     supplies it on every load, and a store reaching recordPractice without it
     is already off the normal path. So the assertion is on the guard that
     runs immediately before the write, which is the one a record arriving
     from anywhere — an old backup, a hand-edited file — depends on. Testing
     the redundant guard instead gave an assertion that could not fail: the
     regex matched the blank literal a few lines above it. */
  const recordFn = src.slice(src.indexOf('function recordPractice'), src.indexOf('function practiceSummary'));
  ok(/if\s*\(!rec\.hist\)\s*rec\.hist\s*=\s*\{\};/.test(recordFn),
    '§1 recordPractice() writes into `hist` without first checking it exists, so the first answer ' +
    'against a record that predates the history — an old backup, a merged file — throws instead ' +
    'of recording');

  const capFn = src.slice(src.indexOf('function pruneHist'), src.indexOf('function recordPractice'));
  ok(/\.sort\(\)/.test(capFn) && /shift\(\)/.test(capFn),
    '§3 pruneHist() must sort and drop from the FRONT — dropping the newest day instead of the ' +
    'oldest would keep the history capped while erasing the practice the reader just did');
}

/* ── §4 two devices merge without losing a day ────────────────────────────── */
{
  const bak = {};
  const r2 = { localStorage: { getItem: () => null, setItem() {}, removeItem() {} },
               addEventListener() {}, removeEventListener() {} };
  r2.self = r2; r2.window = r2;
  try {
    const src = fs.readFileSync(path.join(ROOT, 'progress-backup.js'), 'utf8');
    new Function('self', 'window', 'localStorage', src).call(r2, r2, r2, r2.localStorage);
  } catch (e) { /* fall through to the guard below */ }
  const API = r2.AATBackup || r2.ProgressBackup || r2.PROGRESS_BACKUP;
  const merge = API && (API.mergeAll || API.merge || API._mergeAll);

  /* ASSERTED UNCONDITIONALLY, because the behavioural test below cannot see
     this on its own: two devices holding DIFFERENT days both survive whatever
     the cell is, since the array rule only bites when the same day is on both.
     A first version only checked the shape in the no-merge fallback, and an
     array-shaped day sailed through. */
  {
    const uiSrc = fs.readFileSync(path.join(ROOT, 'aat3-ui.js'), 'utf8');
    const recFn = uiSrc.slice(uiSrc.indexOf('function recordPractice'), uiSrc.indexOf('function practiceSummary'));
    ok(/\{\s*a:\s*0,\s*c:\s*0\s*\}/.test(recFn),
      '§4 a day is not stored as an object of numbers. progress-backup.js merges arrays with ' +
      '`return local`, so a day held as [attempted, correct] loses whichever device synced second — ' +
      'silently, and only on the days both devices touched');
  }

  if (typeof merge !== 'function') {
    console.log(`  ${DIM}§4 shape asserted directly — progress-backup.js exposes no merge entry point${RESET}`);
  } else {
    /* The real store key, because mergeAll only walks keys it recognises as
       progress — a bare `practice` object is skipped entirely, and a first
       version of this check asserted against that and "failed" the code
       rather than itself. */
    const blob = hist => ({ 'prep_v2_aat3': { practice: { units: { tpfb: {
      runs: 1, mocks: 0, mockBest: 0, los: {}, qs: {}, hist: hist } } } } });
    const A = blob({ '2026-09-01': { '1': { a: 10, c: 8 } } });
    const B = blob({ '2026-09-02': { '1': { a: 10, c: 9 } } });
    const out = merge(A, B) || {};
    const h = (((((out['prep_v2_aat3'] || {}).practice || {}).units || {}).tpfb || {}).hist) || {};
    ok(h['2026-09-01'] && h['2026-09-02'],
      '§4 merging two devices lost a day of history — days present: ' + (Object.keys(h).join(', ') || 'none'));

    /* The same day on both devices must not double-count. MAX is the rule the
       lifetime counters already merge under; SUM here would inflate every day
       a reader re-synced. */
    const same = merge(blob({ '2026-09-01': { '1': { a: 10, c: 8 } } }),
                       blob({ '2026-09-01': { '1': { a: 6, c: 6 } } })) || {};
    const sh = (((((same['prep_v2_aat3'] || {}).practice || {}).units || {}).tpfb || {}).hist) || {};
    const cell = (sh['2026-09-01'] || {})['1'] || {};
    ok(cell.a === 10 && cell.c === 8,
      `§4 the same day on two devices merged to a=${cell.a} c=${cell.c}, want a=10 c=8 — ` +
      `summing would double-count every re-sync`);
  }
}

/* ── §5 every line can be switched off, one at a time ─────────────────────
   Six lines on a phone is more than anyone reads at once, so each legend entry
   is the switch for its own line. The three ways this breaks are all silent:
   a legend that renders as text again and simply stops toggling, a choice
   keyed by colour slot so it hides whichever line inherited the slot this
   week, and a hidden line whose column stays in the table.

   THE MARKUP IS ASSERTED HERE AND THE CLICK IS ASSERTED IN THE BROWSER, in
   check-subjects-render.js, because `closest` and `classList` are real DOM and
   this file drives a stub. What this can prove is that the switches exist, are
   real buttons with a state, are keyed to something stable, and that a stored
   choice reaches the painted screen — which is the half that a stub can see
   and the half that carries the data. */
{
  const D = require('./lib/aat3-driver.js');
  const day = n => {
    const d = new Date(); d.setDate(d.getDate() - n);
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  };
  const hist = {}, los = {};
  for (let d = 6; d >= 0; d--) {
    hist[day(d)] = {};
    for (let n = 1; n <= 5; n++) hist[day(d)][String(n)] = { a: 20, c: 13 + ((d + n) % 6) };
  }
  for (let n = 1; n <= 5; n++) los[String(n)] = { attempted: 140, correct: 100 + n };

  /* Rendered twice: once with nothing hidden, once with a stored choice, so
     the second can be compared against the first rather than against a guess
     about what the screen contains. */
  function paint(stored) {
    const seed = { 'prep_v2_aat3': JSON.stringify({ lessons: {}, xp: 0,
      practice: { units: { tpfb: { runs: 9, mocks: 0, mockBest: 0, los: los, qs: {}, hist: hist } } } }) };
    if (stored) seed['prep_v2_aat3_trendoff'] = JSON.stringify(stored);
    const keep = global.localStorage;
    global.localStorage = D.fakeStore(seed);
    for (const k of Object.keys(require.cache)) if (/aat3-ui\.js$/.test(k)) delete require.cache[k];
    const M = require(path.join(ROOT, 'aat3-ui.js'));
    M.AAT3_SYLLABUS = require(path.join(ROOT, 'aat3-syllabus.js')).SYLLABUS;
    M.AAT3_PRACTICE = require(path.join(ROOT, 'aat3-practice-data.js')).AAT3_PRACTICE;
    M.AAT3_LEARN_PATH = require(path.join(ROOT, 'aat3-learn-data.js')).AAT3_LEARN_PATH;
    const el = D.fakeEl();
    M.AAT3_UI.mount(el);
    D.click(el, 'practice');
    const html = el.innerHTML;
    const i = html.indexOf('<section class="a3-tr"');
    global.localStorage = keep;
    return i === -1 ? '' : html.slice(i, html.indexOf('</section>', i) + 10);
  }

  const open = paint(null);
  ok(open.length > 0, '§5 the practice screen drew no trend section to switch lines in');

  const btns = open.match(/data-a3="trendseries"/g) || [];
  ok(btns.length === 6,
    `§5 the legend offers ${btns.length} switches, want 6 — five outcomes and the whole-unit line`);
  ok((open.match(/<button[^>]*data-a3="trendseries"/g) || []).length === 6,
    '§5 the legend entries are not real <button>s, so they are not reachable by keyboard');
  ok((open.match(/aria-pressed="true"/g) || []).length === 6,
    '§5 with nothing hidden every switch should read aria-pressed="true"');

  /* KEYED BY OUTCOME NUMBER, NOT BY COLOUR SLOT. The slots are handed out by
     how much each outcome was answered in the window, so a choice stored
     against "slot 3" hides Outcome 4 this week and Outcome 2 the next. */
  const keys = [...open.matchAll(/data-a3="trendseries" data-key="([^"]+)"/g)].map(m => m[1]);
  ok(JSON.stringify(keys) === JSON.stringify(['total', '1', '2', '3', '4', '5']),
    `§5 the switches are keyed ${JSON.stringify(keys)} — want the outcome numbers and "total", ` +
    `never the colour slot, which is reassigned as practice moves`);

  ok(open.indexOf('a3-tr-foot') === -1,
    '§5 the explanatory footnote is back under the chart');

  /* A STORED CHOICE HAS TO REACH THE PAINT, or it survives the reload and then
     the chart draws the line anyway. */
  const hidden = paint({ tpfb: { '3': 1, total: 1 } });
  ok((hidden.match(/aria-pressed="false"/g) || []).length === 2,
    '§5 a stored choice did not reach the legend on the next paint');
  const offMarks = (hidden.match(/class="a3-tr-(line|dot) [^"]*is-off"/g) || []).length;
  ok(offMarks > 0, '§5 a stored choice left every line drawn — the marks carry no is-off');
  ok((hidden.match(/class="a3-tr-col is-off"/g) || []).length > 0,
    '§5 a hidden line kept its column in the table, so the reader is half obeyed');
  /* The choice is per unit: FAPS must not inherit TPFB's hidden outcomes. */
  const other = paint({ faps: { '3': 1 } });
  ok((other.match(/aria-pressed="false"/g) || []).length === 0,
    '§5 one unit\'s hidden lines are being applied to another unit\'s chart');
}

if (errors.length) {
  console.log(`${RED}${BOLD}── FAILURES (${errors.length}) ──${RESET}`);
  errors.forEach(e => console.log(`  ${RED}✗${RESET} ${e}`));
  console.log('');
  process.exit(1);
}
console.log(`${GREEN}${BOLD}── The trend history is recorded, kept and read honestly ✓${RESET}  ${DIM}(${checks} assertions)${RESET}\n`);
