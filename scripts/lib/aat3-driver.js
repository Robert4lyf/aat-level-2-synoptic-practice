/**
 * A fake element that is really a driver for the Level 3 player.
 *
 * aat3-ui.js `mount(el)` writes a string of HTML into `el.innerHTML` and then
 * walks it with `el.querySelectorAll('[data-a3]')`, binding a click handler to
 * every node it finds. Nothing else about a DOM is used. So an object that
 * parses that string into nodes and REMEMBERS them is enough to drive the real
 * code: click the real buttons, in the real order, through the real grading.
 *
 * That is worth more than it sounds. Checks written against hand-built data
 * structures answer "does this function compute the right thing"; this answers
 * "does the thing the reader touches do what we think", which is where the
 * defects that reach people actually live. A gap-fill cue that let "always pick
 * the leftmost pill" score 95% across the module was invisible to every check
 * in the suite until something could render a question and look at it.
 *
 * MEMOISING THE PARSED NODES PER REPAINT IS LOAD-BEARING. wire() binds its
 * handlers to the objects querySelectorAll returns, so handing back fresh
 * objects on the next call hands back nodes with nothing bound to them: every
 * click a silent no-op, and every assertion afterwards green against a screen
 * that never moved.
 *
 * Shared by check-aat3-practice-summary.js and check-aat3-answer-position.js.
 */

'use strict';

const path = require('path');
const ROOT = path.join(__dirname, '..', '..');

const STORE_KEY = 'prep_v2_aat3';

/* A localStorage stand-in with the surface aat3-ui.js uses. */
function fakeStore(initial) {
  const m = new Map(Object.entries(initial || {}));
  return {
    get length() { return m.size; },
    key(i) { return Array.from(m.keys())[i]; },
    getItem(k) { return m.has(k) ? m.get(k) : null; },
    setItem(k, v) { m.set(k, String(v)); },
    removeItem(k) { m.delete(k); },
  };
}

function fakeEl() {
  /* `select` is in the list because picklist rows are dropdowns: without it
     the fake DOM parses the table's buttons and none of its controls, and every
     assertion about a picklist would be made against a question nobody can
     answer. */
  const TAG = /<(?:button|span|div|input|select|a)\b([^>]*\bdata-a3="[^"]*"[^>]*)>/g;
  const ATTR = /([\w-]+)="([^"]*)"/g;
  let painted = '';
  let parsed = null;
  return {
    set innerHTML(v) { painted = v; parsed = null; },
    get innerHTML() { return painted; },
    querySelector() { return null; },
    querySelectorAll() {
      if (parsed) return parsed;
      const out = [];
      let m;
      TAG.lastIndex = 0;
      while ((m = TAG.exec(painted))) {
        const attrs = {};
        let a;
        ATTR.lastIndex = 0;
        while ((a = ATTR.exec(m[1]))) attrs[a[1]] = a[2];
        const listeners = {};
        out.push({
          attrs,
          value: '',
          getAttribute(n) { return n in attrs ? attrs[n] : null; },
          addEventListener(ev, fn) { (listeners[ev] || (listeners[ev] = [])).push(fn); },
          fire(ev) { (listeners[ev] || []).forEach(fn => fn({ preventDefault() {} })); },
        });
      }
      parsed = out;
      return out;
    },
  };
}

function nodes(el, act) {
  return el.querySelectorAll().filter(n => n.getAttribute('data-a3') === act);
}

function click(el, act, pick) {
  const found = nodes(el, act);
  const n = pick ? found.find(pick) : found[0];
  if (!n) throw new Error(`nothing to click for data-a3="${act}"`);
  n.fire('click');
  return n;
}

/* Answer whatever question type is on screen, taking the option at `choose`
   (default: the first offered). Deliberately not "the right answer" — a driver
   that always answered correctly could not tell a right/wrong mix apart. */
function answerCurrent(el, choose) {
  const pickIdx = typeof choose === 'number' ? choose : 0;
  const at = (arr) => arr[Math.min(pickIdx, arr.length - 1)];

  if (nodes(el, 'ans').length) { at(nodes(el, 'ans')).fire('click'); return; }

  if (nodes(el, 'tf').length) {
    const seen = new Set();
    nodes(el, 'tf').forEach(n => {
      const i = n.getAttribute('data-s');
      if (seen.has(i) || n.getAttribute('data-v') !== 'true') return;
      seen.add(i); n.fire('click');
    });
    click(el, 'tfsubmit'); return;
  }

  if (nodes(el, 'gap').length) {
    const byGap = new Map();
    nodes(el, 'gap').forEach(n => {
      const g = n.getAttribute('data-g');
      if (!byGap.has(g)) byGap.set(g, []);
      byGap.get(g).push(n);
    });
    byGap.forEach(list => at(list).fire('click'));
    click(el, 'gapsubmit'); return;
  }

  /* A multi-part task. Every part has to be filled before the submit does
     anything, so this fills all of them — the typed parts with a figure and the
     choice parts with an offered pill — rather than stopping at the first. */
  if (nodes(el, 'tasksubmit').length) {
    nodes(el, 'taskinput').forEach(n => { n.value = '0'; n.fire('input'); });
    const byPart = new Map();
    nodes(el, 'taskpick').forEach(n => {
      const p = n.getAttribute('data-p');
      if (!byPart.has(p)) byPart.set(p, []);
      byPart.get(p).push(n);
    });
    byPart.forEach(list => at(list).fire('click'));
    click(el, 'tasksubmit');
    return;
  }

  /* A pick list and an entry grid. Both are answered rather than skipped,
     because a sweep that cannot answer a type reports whatever it was measuring
     as an absence rather than saying it is stuck. The answers here are
     deliberately arbitrary — these sweeps count questions served, not marks. */
  if (nodes(el, 'plsubmit').length) {
    nodes(el, 'plpick').forEach(n => { n.value = '0'; n.fire('change'); });
    click(el, 'plsubmit'); return;
  }
  if (nodes(el, 'egsubmit').length) {
    nodes(el, 'egcell').forEach(n => { n.value = '0'; n.fire('input'); });
    click(el, 'egsubmit'); return;
  }

  const input = nodes(el, 'numinput')[0];
  if (input) { input.value = '0'; input.fire('input'); click(el, 'numsubmit'); return; }

  throw new Error('unrecognised question type: ' + el.innerHTML.slice(0, 300));
}

/* A fresh, fully-wired copy of the module reading `store`.

   Requiring it again after clearing the cache is what makes "does this survive
   a reload" answerable, and setting the content globals on the returned object
   is required rather than optional: in Node the module's `root` is its own
   exports, and without the learn path there are no units, so every unit-scoped
   call quietly falls back to nothing. */
function loadUI(store) {
  global.localStorage = store;
  const p = path.join(ROOT, 'aat3-ui.js');
  delete require.cache[require.resolve(p)];
  const M = require(p);
  /* In Node the module's `root` is its own exports, so anything it expects to
     find on `window` has to be put there by hand. The calculator is a hard
     dependency the same way the content files are: without it the module
     renders no keypad at all, silently — which is exactly the shape of defect
     a check that only asserted "nothing threw" would sail past. */
  M.AATCalc = require(path.join(ROOT, 'calculator.js')) && global.AATCalc;
  /* picklist and entrygrid render and grade here; without it those two
     question types render nothing and every assertion about them would pass
     by never running. */
  M.AATGrid = require(path.join(ROOT, 'question-grid.js')) && global.AATGrid;
  M.AATSound = require(path.join(ROOT, 'sound.js')) && global.AATSound;
  M.AATCelebrate = require(path.join(ROOT, 'celebrate.js')) && global.AATCelebrate;
  /* Every graded answer writes a spaced-repetition schedule through this.
     Without it recordQuestion() throws on the first question of any run. */
  M.AATSpaced = require(path.join(ROOT, 'spaced.js')) && global.AATSpaced;
  M.AAT3_SYLLABUS = require(path.join(ROOT, 'aat3-syllabus.js')).SYLLABUS;
  M.AAT3_PRACTICE = require(path.join(ROOT, 'aat3-practice-data.js')).AAT3_PRACTICE;
  M.AAT3_LEARN_PATH = require(path.join(ROOT, 'aat3-learn-data.js')).AAT3_LEARN_PATH;
  const faps = require(path.join(ROOT, 'aat3-faps-data.js'));
  M.AAT3_FAPS_PATH = faps.AAT3_FAPS_PATH;
  M.AAT3_FAPS_PRACTICE = faps.AAT3_FAPS_PRACTICE;
  return M;
}

/* A deterministic Math.random, so a run that reports a different thing each
   time cannot be mistaken for a gate. Returns the restore function. */
function seedRandom(seed) {
  const real = Math.random;
  let s = seed >>> 0;
  Math.random = () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648; };
  return () => { Math.random = real; };
}

module.exports = { ROOT, STORE_KEY, fakeStore, fakeEl, nodes, click, answerCurrent, loadUI, seedRandom };
