/**
 * A fake element that is really a driver for the Level 1 player.
 *
 * aat1-ui.js `mount(el)` writes a string of HTML into `el.innerHTML` and then
 * walks it with `el.querySelectorAll('[data-a1]')`, binding a click handler to
 * every node it finds. Nothing else about a DOM is used. So an object that
 * parses that string into nodes and REMEMBERS them is enough to drive the real
 * code: click the real buttons, in the real order, through the real grading.
 *
 * The Level 3 sibling of this file explains why that is worth more than testing
 * the functions directly, and why memoising the parsed nodes per repaint is
 * load-bearing rather than an optimisation. This is the same idea against a
 * player with two question types Level 3 does not have — `match`, which is two
 * clicks per pair, and `ordering`, which is a sequence of swaps.
 */

'use strict';

const path = require('path');
const ROOT = path.join(__dirname, '..', '..');

const STORE_KEY = 'prep_v2_aat1';

/* A localStorage stand-in with the surface aat1-ui.js uses. */
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
  /* `textarea` is in the list because a written task is answered in one:
     without it the fake DOM parses the buttons around the box and not the box
     itself, so every assertion about that type would be made against something
     nobody can answer — green, and about nothing. */
  const TAG = /<(?:button|span|div|input|select|textarea|a|li)\b([^>]*\bdata-a1="[^"]*"[^>]*)>/g;
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
  return el.querySelectorAll().filter(n => n.getAttribute('data-a1') === act);
}

function click(el, act, pick) {
  const found = nodes(el, act);
  const n = pick ? found.find(pick) : found[0];
  if (!n) throw new Error(`nothing to click for data-a1="${act}"`);
  n.fire('click');
  return n;
}

/* Answer whichever written task is on screen, claiming `claim` rubric points.

   Shared rather than repeated, because four harnesses drive Level 1 questions
   with their own inline dispatchers, and a type none of them can answer is a
   type that stalls every one of them — reporting a short run as a finished
   one. Returns false when the question on screen is not a written task, so a
   dispatcher can fall through to its own handling. */
function answerWritten(el, claim) {
  if (!nodes(el, 'wrinput').length) return false;
  const box = nodes(el, 'wrinput')[0];
  box.value = new Array(25).fill('word').join(' ');
  box.fire('input');
  click(el, 'wrshow');
  const ticks = nodes(el, 'wrtick');
  const want = claim === 'all' ? ticks.length : (claim === 'none' ? 0 : Number(claim) || 0);
  ticks.slice(0, Math.min(want, ticks.length)).forEach(t => t.fire('click'));
  click(el, 'wrmark');
  return true;
}

/* A fresh, fully-wired copy of the module reading `store`.

   Requiring it again after clearing the cache is what makes "does this survive
   a reload" answerable, and setting the content globals on the returned object
   is required rather than optional: in Node the module's `root` is its own
   exports, and without the learn path there is no unit, so every syllabus-scoped
   call quietly falls back to nothing — including the weighted draw. */
function loadUI(store) {
  global.localStorage = store;
  const p = path.join(ROOT, 'aat1-ui.js');
  delete require.cache[require.resolve(p)];
  const M = require(p);
  /* Sound is a hard dependency the same way the content files are: without it
     the module renders no toggle and plays nothing, silently. */
  M.AATSound = require(path.join(ROOT, 'sound.js')) && global.AATSound;
  M.AATCelebrate = require(path.join(ROOT, 'celebrate.js')) && global.AATCelebrate;
  /* Same hard dependency as sound: without it `Calc()` stays null, the pad is
     never offered, and every assertion about it would pass by never running. */
  M.AATCalc = require(path.join(ROOT, 'calculator.js')) && global.AATCalc;
  /* picklist and entrygrid render and grade here; without it those two
     question types render nothing and every assertion about them would pass
     by never running. */
  M.AATGrid = require(path.join(ROOT, 'question-grid.js')) && global.AATGrid;
  /* Every graded answer writes a spaced-repetition schedule through this.
     Without it recordQuestion() throws on the first question of any run. */
  M.AATSpaced = require(path.join(ROOT, 'spaced.js')) && global.AATSpaced;
  M.AAT1_SYLLABUS = require(path.join(ROOT, 'aat1-syllabus.js')).SYLLABUS;
  M.AAT1_PRACTICE = require(path.join(ROOT, 'aat1-practice-data.js')).AAT1_PRACTICE;
  M.AAT1_LEARN_PATH = require(path.join(ROOT, 'aat1-learn-data.js')).AAT1_LEARN_PATH;
  /* Same hard dependency as the banks: without it the glossary screen renders
     empty and every assertion about it would pass by never running. */
  M.AAT1_GLOSSARY = require(path.join(ROOT, 'aat1-glossary-data.js')).AAT1_GLOSSARY;
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

module.exports = { ROOT, STORE_KEY, fakeStore, fakeEl, nodes, click, answerWritten, loadUI, seedRandom };
