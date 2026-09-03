#!/usr/bin/env node
/**
 * Does each self-rendering subject's stylesheet still describe its screens?
 *
 * A rewrite leaves rules behind. Level 3's left 64: a full-bleed hero with its
 * glow and its chips, a zig-zag track with SVG connectors, a grid of practice
 * cards, a progress bar, an outcome header — all still styled, none still
 * rendered, and no way to tell by reading either file which was which. Level 1
 * then left 34 of its own, for the same reason and in the same week.
 *
 * Dead rules are worse than clutter: the next person changing a colour changes
 * it in four places, three of which nothing sees, and then cannot work out why
 * the screen did not move.
 *
 * So the rule is simple and mechanical, and now it is asked of every module
 * that owns its own screens rather than of the one that happened to be
 * rewritten first: every class the stylesheet styles must be one the renderer
 * can produce, and every class the renderer produces must be one the
 * stylesheet styles.
 *
 * THE HARD PART IS THE CLASSES BUILT BY CONCATENATION. `'a3-rung a3-rung-' + t`
 * never contains the string "a3-rung-sheet", so a naive search calls it dead
 * and deletes the styling for every cheat-sheet marker on the path. The
 * prefixes below are the ones each renderer assembles; a class under one of
 * them is taken as live. Keeping those lists short is deliberate — a long one
 * would let real corpses hide behind it.
 *
 * Run: node scripts/check-subject-styles.js   (exit 1 on any failure)
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const RED = '\x1b[31m', GREEN = '\x1b[32m', YELLOW = '\x1b[33m';
const BOLD = '\x1b[1m', DIM = '\x1b[2m', RESET = '\x1b[0m';

/* Each self-rendering subject: its stylesheet, its renderer, the prefix its
   classes share, and the class-name stems that renderer completes at runtime.
   Every stem must actually appear in the renderer as a concatenation, which is
   checked below — a prefix that has stopped being used is itself a way for dead
   rules to survive. */
const MODULES = [
  {
    name: 'AAT Level 1',
    css: 'aat1-styles.css',
    js: 'aat1-ui.js',
    prefix: 'a1',
    built: [
      'a1-callout-',   // ' a1-callout-' + kind
      'a1-kind-',      // 'a1-rung-kind a1-kind-' + kind
      'a1-mc',         // 'a1-mc' + index, the matching-pair colours
    ],
  },
  {
    name: 'AAT Level 3',
    css: 'aat3-styles.css',
    js: 'aat3-ui.js',
    prefix: 'a3',
    built: [
      'a3-callout-',   // ' a3-callout-' + kind
      'a3-rung-',      // 'a3-rung a3-rung-' + type
      'a3-oc',         // 'a3-oc' + state, and 'a3-oc-' + part
    ],
  },
  {
    /* CIPS renders its own screens too, so the same rule applies to it. It was
       outside this gate until its quality pass, which is how it had come to
       carry a `.c2-reader-progress` nobody rendered and a `.c2-theme-i` nobody
       styled at the same time. Its chrome is markup in cips2.html rather than
       strings in the renderer — the header, the tab strip, the theme button —
       so that file counts as its markup as well. */
    name: 'CIPS Level 2',
    css: 'cips2-styles.css',
    js: 'cips2-page.js',
    also: ['cips2.html'],
    prefix: 'c2',
    built: [
      'c2-kind-',      // 'c2-reading-card c2-kind-' + kind
    ],
  },
];

const errors = [];
const notes = [];

MODULES.forEach((mod) => {
  /* Comments stripped before anything is read out of the file. These
     stylesheets explain themselves at length, and an explanation naturally
     names the class it is about — including classes that have just been
     DELETED, which is exactly when a comment says their name. Reading prose as
     if it were a selector reported a rule that no longer existed as dead. */
  const css = fs.readFileSync(path.join(ROOT, mod.css), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  /* THE SHARED WIDGETS COUNT AS THIS SUBJECT'S MARKUP. picklist and entrygrid
     are rendered by question-grid.js on behalf of all three levels, with each
     level's class names written out there. Reading only `mod.js` would report
     every rule for those two tables as styling nothing. */
  const js = fs.readFileSync(path.join(ROOT, mod.js), 'utf8')
    + fs.readFileSync(path.join(ROOT, 'question-grid.js'), 'utf8')
    + (mod.also || []).map(f => fs.readFileSync(path.join(ROOT, f), 'utf8')).join('');
  const CLASS = new RegExp('\\.(' + mod.prefix + '-[a-z0-9-]+)', 'g');
  const RENDERED = new RegExp('^' + mod.prefix + '-[a-z0-9-]+$');

  /* ── 1. Every prefix is really used ─────────────────────────────────────── */
  mod.built.forEach(p => {
    /* The prefix must END a string literal that is then concatenated —
       `'a3-rung-' + t`. Searching for the prefix anywhere in the file instead
       finds `class="a3-rung-mark"` and calls the exemption live, which is how a
       first version of this passed after the concatenation it stood for had
       been deleted: the corpses behind a dead exemption stay hidden. */
    const used = new RegExp(p.replace(/-/g, '\\-') + '[\'"]\\s*\\+').test(js);
    if (!used) {
      errors.push(`${mod.name}: the exemption for "${p}*" is stale — ${mod.js} no longer builds a ` +
                  `class name ending in it, so anything hiding behind that prefix is dead too.`);
    }
  });

  /* ── 2. Every styled class is one the renderer can produce ──────────────── */
  const styled = [...new Set([...css.matchAll(CLASS)].map(m => m[1]))].sort();
  const dead = styled.filter(c => js.indexOf(c) === -1 && !mod.built.some(p => c.startsWith(p)));
  dead.forEach(c => {
    const line = css.slice(0, css.indexOf('.' + c)).split('\n').length;
    errors.push(`${mod.css}:${line}: .${c} is styled but nothing renders it.`);
  });

  /* ── 3. And the reverse: every class rendered is one the stylesheet knows ── */
  /* The cheaper direction to get wrong. A class added to the markup and never
     to the stylesheet is invisible rather than broken — the element simply
     renders unstyled, which on a card of prose looks almost right. */
  const rendered = new Set();
  [...js.matchAll(/class="([^"'+]*)"/g)].forEach(m => {
    m[1].split(/\s+/).forEach(c => { if (RENDERED.test(c)) rendered.add(c); });
  });
  const unstyled = [...rendered].filter(c => css.indexOf('.' + c) === -1).sort();
  unstyled.forEach(c => errors.push(`${mod.name}: .${c} is rendered by ${mod.js} but the stylesheet never mentions it.`));

  /* ── 4. The design tokens are used, not just declared ───────────────────── */
  /* A scale nobody reaches for is a scale that has already been abandoned. */
  const tokenRe = new RegExp('^\\s*(--' + mod.prefix + '-[a-z0-9-]+):', 'gm');
  const tokens = [...new Set([...css.matchAll(tokenRe)].map(m => m[1]))];
  const unused = tokens.filter(t => !new RegExp('var\\(' + t + '[,)]').test(css));
  unused.forEach(t => errors.push(`${mod.name}: ${t} is declared as a design token and never used.`));

  notes.push(`${mod.name}: ${styled.length} classes styled and reachable, ` +
             `${rendered.size} rendered and styled, ${tokens.length} tokens all referenced.`);
});

/* ── Report ──────────────────────────────────────────────────────────────── */
console.log(`${BOLD}Self-rendering subjects: stylesheet vs. screens${RESET}\n`);
notes.forEach(n => console.log(`  ${DIM}${n}${RESET}`));
console.log('');

if (errors.length) {
  console.log(`${RED}${BOLD}── ${errors.length} problem${errors.length === 1 ? '' : 's'} ──${RESET}`);
  errors.forEach(e => console.log(`  ${RED}✗${RESET}  ${e}`));
  console.log('');
  process.exit(1);
}
console.log(`${GREEN}${BOLD}── Every stylesheet and its screens agree ✓${RESET}\n`);
