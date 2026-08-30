#!/usr/bin/env node
/**
 * The sound effects: three voices, one switch, and nothing audible in a mock.
 *
 * HOW THIS OBSERVES SOUND WITHOUT A SPEAKER. Not with a test hook in the
 * shipped module — a hook proves the hook works. A fake AudioContext is
 * installed on the global instead, so sound.js runs its real code path:
 * createOscillator, the waveform, the frequency, the exponential ramp that
 * exists so the release does not click. What is asserted is what the browser
 * would have been told to play.
 *
 * setTimeout is flattened for the same reason. A voice is a little melody with
 * its notes staggered by tens of milliseconds, and a check that waited for real
 * timers would be slow and flaky; running them immediately keeps the ORDER,
 * which is the part that carries the tune.
 *
 * §1 the three voices are actually different   §5 a mock stays silent
 * §2 the switch silences all of them           §6 each level offers a switch
 * §3 each level plays its own voice            §7 Level 2 is unchanged
 * §4 right and wrong do not sound alike
 *
 * Run: node scripts/check-sound.js
 */
'use strict';

const path = require('path');
const ROOT = path.join(__dirname, '..');

const RED = '\x1b[31m', GREEN = '\x1b[32m';
const BOLD = '\x1b[1m', DIM = '\x1b[2m', RESET = '\x1b[0m';

let failures = 0, checks = 0;
function ok(cond, label) {
  checks++;
  if (!cond) { failures++; console.log(`  ${RED}✗${RESET} ${label}`); }
}

console.log(`${BOLD}Sound effects${RESET}\n`);

/* ── A fake AudioContext that writes down what it was asked to play ───────── */
const played = [];
function FakeCtx() {
  this.state = 'running';
  this.currentTime = 0;
  this.destination = { _dest: true };
}
FakeCtx.prototype.resume = function () { this.state = 'running'; };
FakeCtx.prototype.createGain = function () {
  const g = { gain: { setValueAtTime(v) { g._peak = v; }, exponentialRampToValueAtTime(v, t) { g._to = v; g._end = t; } },
              connect() {} };
  return g;
};
FakeCtx.prototype.createOscillator = function () {
  const o = { frequency: { value: 0 }, type: '', _g: null,
              connect(g) { o._g = g; },
              start() {}, stop(t) { played.push({ f: o.frequency.value, t: o.type, end: t, peak: o._g && o._g._peak, to: o._g && o._g._to }); } };
  return o;
};
global.AudioContext = FakeCtx;

/* Timers flattened: order preserved, waiting removed. */
const realSetTimeout = global.setTimeout;
global.setTimeout = (fn) => { fn(); return 0; };

/* A localStorage stand-in, so the preference has somewhere to live. */
const store = new Map();
global.localStorage = {
  getItem: k => (store.has(k) ? store.get(k) : null),
  setItem: (k, v) => store.set(k, String(v)),
  removeItem: k => store.delete(k),
  clear: () => store.clear(),
  get length() { return store.size; },
  key: i => Array.from(store.keys())[i],
};

require(path.join(ROOT, 'sound.js'));
let Sound = global.AATSound;

function capture(fn) { played.length = 0; fn(); return played.slice(); }
const pitches = notes => notes.map(n => n.f).join(',');
const waves = notes => [...new Set(notes.map(n => n.t))].sort().join('+');

/* ── 1. The three voices are actually different ───────────────────────────── */
console.log(`${DIM}three voices${RESET}`);

ok(!!Sound, 'sound.js exports a module');
const IDS = ['aat1', 'aat', 'aat3'];
IDS.forEach(id => ok(!!Sound.VOICES[id], `there is a voice for ${id}`));

let players = {};
IDS.forEach(id => { players[id] = Sound.create(id); });

const sig = {};
IDS.forEach(id => {
  sig[id] = {
    correct: capture(() => players[id].correct()),
    wrong: capture(() => players[id].wrong()),
    click: capture(() => players[id].click()),
  };
  ok(sig[id].correct.length > 0, `${id}: a right answer makes a sound`);
  ok(sig[id].wrong.length > 0, `${id}: a wrong answer makes a sound`);
  ok(sig[id].click.length > 0, `${id}: moving on makes a sound`);
});

/* "Unique" has to mean something a check can hold. Two voices are different
   when they do not play the same notes — and for the correct chime, which is
   the one a reader hears most, they must also differ in shape or timbre rather
   than being the same tune transposed. */
for (let i = 0; i < IDS.length; i++) {
  for (let j = i + 1; j < IDS.length; j++) {
    const a = IDS[i], b = IDS[j];
    ['correct', 'wrong', 'click'].forEach(kind => {
      ok(pitches(sig[a][kind]) !== pitches(sig[b][kind]),
        `${a} and ${b} do not share the same ${kind} notes`);
    });
    const shapeA = sig[a].correct.map((n, k, arr) => (k ? Math.round((n.f / arr[k - 1].f) * 100) : 0)).join(':');
    const shapeB = sig[b].correct.map((n, k, arr) => (k ? Math.round((n.f / arr[k - 1].f) * 100) : 0)).join(':');
    ok(shapeA !== shapeB || waves(sig[a].correct) !== waves(sig[b].correct),
      `${a} and ${b} differ in the shape or the timbre of the chime, not just its pitch`);
  }
}

/* Every note has to be a note: a real waveform, an audible frequency, a peak
   above silence, and a release that ramps rather than cutting. */
IDS.forEach(id => {
  const all = [].concat(sig[id].correct, sig[id].wrong, sig[id].click);
  all.forEach(n => {
    ok(['sine', 'square', 'triangle', 'sawtooth'].indexOf(n.t) !== -1, `${id}: "${n.t}" is a real waveform`);
    ok(n.f >= 100 && n.f <= 4000, `${id}: ${n.f}Hz is within hearing and not piercing`);
    ok(n.peak > 0 && n.peak <= 0.35, `${id}: peak gain ${n.peak} is audible and not painful`);
    ok(n.to > 0, `${id}: the release ramps to a positive value, so it cannot click`);
  });
});

/* ── 2. The switch silences all of them ───────────────────────────────────── */
console.log(`${DIM}the switch${RESET}`);

ok(Sound.isEnabled() === true, 'sound is on by default');
Sound.setEnabled(false);
ok(Sound.isEnabled() === false, 'the switch reports itself off');
IDS.forEach(id => {
  const silent = [].concat(
    capture(() => players[id].correct()),
    capture(() => players[id].wrong()),
    capture(() => players[id].click()));
  ok(silent.length === 0, `${id}: plays nothing while sound is off`);
});
Sound.setEnabled(true);
ok(capture(() => players.aat3.correct()).length > 0, 'and everything comes back when it is switched on');

/* One switch, not three. Silencing from any level silences the app — the whole
   reason the preference was moved out of Level 2's per-subject store. */
ok(Object.keys(store).length >= 0 && store.has('aat_sound_on'), 'the preference is stored in one place');

/* A reader who had turned Level 2's sound off keeps their silence. */
{
  store.clear();
  store.set('aatPrep_v2', JSON.stringify({ settings: { soundOn: false } }));
  delete require.cache[require.resolve(path.join(ROOT, 'sound.js'))];
  delete global.AATSound;
  require(path.join(ROOT, 'sound.js'));
  ok(global.AATSound.isEnabled() === false,
    'someone who had already turned sound off stays silent after the move');
  store.clear();
  delete require.cache[require.resolve(path.join(ROOT, 'sound.js'))];
  delete global.AATSound;
  require(path.join(ROOT, 'sound.js'));
  ok(global.AATSound.isEnabled() === true, 'and a fresh reader gets sound on');
  /* RE-BIND. Re-requiring replaced global.AATSound, and the level modules
     resolve their player from the global — so a `Sound` still pointing at the
     first instance reports on a module nothing else is using any more. That is
     what made "tapping it silences the app" fail against a switch that works. */
  Sound = global.AATSound;
  players = {};
  IDS.forEach(id => { players[id] = Sound.create(id); });
}

/* ── 3–6. Each level, through its real player ─────────────────────────────── */
const LEVELS = [
  { name: 'Level 3', id: 'aat3', driver: './lib/aat3-driver.js', pre: 'a3',
    open: M => M.AAT3_UI.reset('practice', 'tpfb'), unit: 'tpfb' },
  { name: 'Level 1', id: 'aat1', driver: './lib/aat1-driver.js', pre: 'a1',
    open: M => M.AAT1_UI.reset('practice') },
];

const MCQ = { id: 'S-1', unitKey: 'tpfb', lo: 1, criteria: ['TPFB-1.1.1'], type: 'mcq',
  q: 'Which rate applies to most goods?', opts: ['Standard', 'Zero', 'Exempt', 'Outside scope'],
  ans: 0, exp: 'The standard rate is the default for goods and services.' };

LEVELS.forEach(L => {
  console.log(`${DIM}${L.name}${RESET}`);
  const D = require(L.driver);

  function open(q) {
    const M = D.loadUI(D.fakeStore());
    if (L.id === 'aat3') { M.AAT3_PRACTICE = { QUESTIONS: [q] }; M.AAT3_FAPS_PRACTICE = { QUESTIONS: [] }; }
    else { M.AAT1_PRACTICE = { QUESTIONS: [q] }; }
    const el = D.fakeEl();
    L.open(M);
    (M[L.id === 'aat3' ? 'AAT3_UI' : 'AAT1_UI']).mount(el);
    D.click(el, 'startpractice', n => n.getAttribute('data-lo') === 'mix');
    return el;
  }

  const q = L.id === 'aat3' ? MCQ : Object.assign({}, MCQ, { unitKey: undefined });
  Sound.setEnabled(true);

  /* A right answer, and a wrong one, on the real grading path. */
  /* The run is OPENED outside the capture. Starting a practice run is itself a
     navigation click and makes its own noise, so measuring from before it read
     every right answer as a click followed by a chime — which is true, and not
     what this is asking. */
  const elRight = open(q);
  const right = capture(() => D.nodes(elRight, 'ans').find(n => n.getAttribute('data-i') === '0').fire('click'));
  const elWrong = open(q);
  const wrong = capture(() => D.nodes(elWrong, 'ans').find(n => n.getAttribute('data-i') === '1').fire('click'));
  ok(right.length > 0, `${L.name}: answering correctly plays something`);
  ok(wrong.length > 0, `${L.name}: answering wrongly plays something`);
  ok(pitches(right) !== pitches(wrong), `${L.name}: right and wrong do not sound alike`);
  ok(pitches(right) === pitches(sig[L.id].correct), `${L.name}: and it is this level's own chime`);
  ok(pitches(wrong) === pitches(sig[L.id].wrong), `${L.name}: and this level's own wrong answer`);

  /* Under exam conditions nothing is revealed, so nothing may be heard. SILENCE
     is the assertion, not "not the correct chime" — the first version tested
     only for the right-answer notes, and a mutation that graded mock picks
     played the WRONG-answer sound instead and sailed straight through. Either
     one tells a reader something the paper is deliberately withholding.

     The mock is STARTED outside the capture, because starting it is a
     navigation click and makes its own honest noise. */
  const mockEl = (() => {
    const M = D.loadUI(D.fakeStore());
    if (L.id === 'aat3') { M.AAT3_PRACTICE = { QUESTIONS: [q] }; M.AAT3_FAPS_PRACTICE = { QUESTIONS: [] }; }
    else { M.AAT1_PRACTICE = { QUESTIONS: [q] }; }
    const el = D.fakeEl();
    L.open(M);
    (M[L.id === 'aat3' ? 'AAT3_UI' : 'AAT1_UI']).mount(el);
    D.click(el, 'startmock');
    return el;
  })();
  ok(D.nodes(mockEl, 'ans').length > 0, `${L.name}: the mock serves a question to pick from`);
  const inMock = capture(() => { D.nodes(mockEl, 'ans')[0].fire('click'); });
  ok(inMock.length === 0,
    `${L.name}: picking an option in a timed mock is silent (heard ${inMock.map(n => n.f).join(',') || 'nothing'})`);

});

/* The switch is on the path screen, which is where a reader lands. */
LEVELS.forEach(L => {
  const D = require(L.driver);
  const M = D.loadUI(D.fakeStore());
  const el = D.fakeEl();
  if (L.id === 'aat3') M.AAT3_UI.reset('path', 'tpfb'); else M.AAT1_UI.reset('path');
  (M[L.id === 'aat3' ? 'AAT3_UI' : 'AAT1_UI']).mount(el);
  const rows = D.nodes(el, 'soundtoggle');
  ok(rows.length >= 1, `${L.name}: the path screen offers a sound switch`);
  if (rows.length) {
    Sound.setEnabled(true);
    rows[0].fire('click');
    ok(Sound.isEnabled() === false, `${L.name}: tapping it silences the app`);
    const after = capture(() => players[L.id].correct());
    ok(after.length === 0, `${L.name}: and nothing plays afterwards`);
    /* Turning it back ON should be audible; turning it OFF must not be. */
    const el2 = D.fakeEl();
    (M[L.id === 'aat3' ? 'AAT3_UI' : 'AAT1_UI']).mount(el2);
    const back = capture(() => D.nodes(el2, 'soundtoggle')[0].fire('click'));
    ok(Sound.isEnabled() === true, `${L.name}: tapping again brings it back`);
    ok(back.length > 0, `${L.name}: and switching it on is itself audible`);
    /* And switching it OFF is not. A click on the way out is the one sound a
       reader asking for silence has just said they do not want. */
    const el3 = D.fakeEl();
    (M[L.id === 'aat3' ? 'AAT3_UI' : 'AAT1_UI']).mount(el3);
    const off = capture(() => D.nodes(el3, 'soundtoggle')[0].fire('click'));
    ok(Sound.isEnabled() === false, `${L.name}: and off again`);
    ok(off.length === 0, `${L.name}: switching it off makes no sound of its own`);
    Sound.setEnabled(true);
  }
});

/* ── 7. Level 2's voice is unchanged ──────────────────────────────────────── */
console.log(`${DIM}Level 2 is unchanged${RESET}`);
Sound.setEnabled(true);
const l2c = capture(() => players.aat.correct());
ok(pitches(l2c) === '523,659,784', `Level 2 still plays the C major triad (got ${pitches(l2c)})`);
ok(waves(l2c) === 'sine', 'still on sine waves');
const l2w = capture(() => players.aat.wrong());
ok(pitches(l2w) === '220' && waves(l2w) === 'square', 'and still the 220Hz square for a wrong answer');
const l2k = capture(() => players.aat.click());
ok(pitches(l2k) === '440' && waves(l2k) === 'sine', 'and the 440Hz click');

global.setTimeout = realSetTimeout;
console.log();
if (failures) { console.log(`${RED}${BOLD}✗ ${failures} of ${checks} checks failed${RESET}`); process.exit(1); }
console.log(`${GREEN}${BOLD}✓ ${checks} checks passed${RESET}`);
/* EXIT EXPLICITLY. Starting a timed mock starts its clock, which is a
   setInterval nobody stops here — so the checks all finish, the summary
   prints, and node then sits with a live timer forever. In CI that is not a
   failure, it is a job that hangs until the runner kills it. */
process.exit(0);
