#!/usr/bin/env node
/**
 * Does the Level 3 stylesheet still describe the Level 3 screens?
 *
 * A rewrite leaves rules behind. This one left 64: a full-bleed hero with its
 * glow and its chips, a zig-zag track with SVG connectors and left/right
 * variants, a grid of practice cards, a progress bar, an outcome header — all
 * still styled, none still rendered, and no way to tell by reading either file
 * which was which. Dead rules are worse than clutter: the next person changing
 * a colour changes it in four places, three of which nothing sees, and then
 * cannot work out why the screen did not move.
 *
 * So the rule is simple and mechanical: every class the stylesheet styles must
 * be one the renderer can produce.
 *
 * THE HARD PART IS THE CLASSES BUILT BY CONCATENATION. `'a3-rung a3-rung-' + t`
 * never contains the string "a3-rung-sheet", so a naive search calls it dead
 * and deletes the styling for every cheat-sheet marker on the path. The prefixes
 * below are the ones the renderer assembles; a class under one of them is taken
 * as live. Keeping that list short is deliberate — a long one would let real
 * corpses hide behind it.
 *
 * Run: node scripts/check-aat3-styles.js   (exit 1 on any failure)
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const RED = '\x1b[31m', GREEN = '\x1b[32m', YELLOW = '\x1b[33m';
const BOLD = '\x1b[1m', DIM = '\x1b[2m', RESET = '\x1b[0m';

const css = fs.readFileSync(path.join(ROOT, 'aat3-styles.css'), 'utf8');
const js = fs.readFileSync(path.join(ROOT, 'aat3-ui.js'), 'utf8');

/* Class-name stems the renderer completes at runtime. Each must actually appear
   in aat3-ui.js as a concatenation, which is checked below — a prefix that has
   stopped being used is itself a way for dead rules to survive. */
const BUILT = [
  'a3-callout-',   // ' a3-callout-' + kind
  'a3-rung-',      // 'a3-rung a3-rung-' + type
  'a3-oc',         // 'a3-oc' + state, and 'a3-oc-' + part
];

const errors = [];
const notes = [];

/* ── 1. Every prefix is really used ──────────────────────────────────────── */
BUILT.forEach(p => {
  /* The prefix must END a string literal that is then concatenated —
     `'a3-rung-' + t`. Searching for the prefix anywhere in the file instead
     finds `class="a3-rung-mark"` and calls the exemption live, which is how a
     first version of this passed after the concatenation it stood for had been
     deleted: the corpses behind a dead exemption stay hidden. */
  const used = new RegExp(p.replace(/-/g, '\\-') + '[\'"]\\s*\\+').test(js);
  if (!used) {
    errors.push(`the exemption for "${p}*" is stale — aat3-ui.js no longer builds a class name ` +
                `ending in it, so anything hiding behind that prefix is dead too.`);
  }
});

/* ── 2. Every styled class is one the renderer can produce ───────────────── */
const styled = [...new Set([...css.matchAll(/\.(a3-[a-z0-9-]+)/g)].map(m => m[1]))].sort();
const dead = styled.filter(c => js.indexOf(c) === -1 && !BUILT.some(p => c.startsWith(p)));
dead.forEach(c => {
  const line = css.slice(0, css.indexOf('.' + c)).split('\n').length;
  errors.push(`aat3-styles.css:${line}: .${c} is styled but nothing renders it.`);
});
notes.push(`${styled.length} classes styled, all of them reachable from aat3-ui.js.`);

/* ── 3. And the reverse: every class rendered is one the stylesheet knows ─── */
/* The cheaper direction to get wrong. A class added to the markup and never to
   the stylesheet is invisible rather than broken — the element simply renders
   unstyled, which on a card of prose looks almost right. */
const rendered = new Set();
[...js.matchAll(/class="([^"'+]*)"/g)].forEach(m => {
  m[1].split(/\s+/).forEach(c => { if (/^a3-[a-z0-9-]+$/.test(c)) rendered.add(c); });
});
const unstyled = [...rendered].filter(c => css.indexOf('.' + c) === -1).sort();
unstyled.forEach(c => errors.push(`.${c} is rendered by aat3-ui.js but the stylesheet never mentions it.`));
notes.push(`${rendered.size} classes rendered with a literal name, all of them styled.`);

/* ── 4. The design tokens are used, not just declared ────────────────────── */
/* A scale nobody reaches for is a scale that has already been abandoned. */
const tokens = [...new Set([...css.matchAll(/^\s*(--a3-[a-z0-9-]+):/gm)].map(m => m[1]))];
const unused = tokens.filter(t => {
  const uses = (css.match(new RegExp('var\\(' + t + '[,)]', 'g')) || []).length;
  return uses === 0;
});
unused.forEach(t => errors.push(`${t} is declared as a design token and never used.`));
notes.push(`${tokens.length} design tokens declared, all referenced.`);

/* ── Report ──────────────────────────────────────────────────────────────── */
console.log(`${BOLD}AAT Level 3 stylesheet${RESET}\n`);
notes.forEach(n => console.log(`  ${DIM}${n}${RESET}`));
console.log('');

if (errors.length) {
  console.log(`${RED}${BOLD}── ${errors.length} problem${errors.length === 1 ? '' : 's'} ──${RESET}`);
  errors.forEach(e => console.log(`  ${RED}✗${RESET}  ${e}`));
  console.log('');
  process.exit(1);
}
console.log(`${GREEN}${BOLD}── The stylesheet and the screens agree ✓${RESET}\n`);
