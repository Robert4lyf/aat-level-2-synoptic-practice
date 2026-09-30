#!/usr/bin/env node
/* Road signs: does the drawing agree with the lesson beside it?
 *
 * WHY THIS EXISTS
 *
 * The Code de la route course teaches one rule above all others, and it is a
 * rule about shape and colour: a red triangle warns, a red ring forbids, a
 * blue disc obliges, a blue rectangle informs. Every sign drawn by
 * sign-figure.js declares which of those families it belongs to, and the
 * module's FAMILIES table — not the sign — decides its outline and its
 * colours. So the one thing that can go wrong is a sign filed under the wrong
 * family: a "sens interdit" marked `danger` would come out as a triangle, on
 * the very card that says prohibitions are round.
 *
 * That is what this checks, and a few things around it:
 *
 *   · every family and every glyph a sign names exists in the renderer —
 *     an unknown glyph draws NOTHING, which looks like a deliberate blank
 *     sign rather than a typo
 *   · every glyph the renderer carries is used by some sign, so a drawing
 *     nobody reaches gets deleted rather than quietly rotting
 *   · the card that teaches a family draws that family, and does not draw a
 *     contradicting one — the "rond rouge" card may not be all triangles
 *   · every sign says what it is called and what it requires, in French
 *   · nothing is drawn twice in one row
 *   · every class the renderer can emit has a rule in styles.css, both ways
 *
 * WHAT IT CANNOT CHECK. Whether the drawing looks like the sign. Nothing here
 * can tell a stag from a hedgehog; that was done by rendering them and
 * looking, and it has to be done again by eye whenever a glyph changes.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const RED = '\x1b[31m', GREEN = '\x1b[32m', DIM = '\x1b[2m', BOLD = '\x1b[1m', RESET = '\x1b[0m';

const SignFigure = require(path.join(ROOT, 'sign-figure.js'));
global.window = global.window || global;
require(path.join(ROOT, 'code-route-data.js'));
const LEARN = global.window.CR_LEARN_PATH || global.CR_LEARN_PATH;
const QUESTIONS = global.window.CR_QUESTIONS || global.CR_QUESTIONS;

const errors = [];
const notes = [];

/* ── Gathering ────────────────────────────────────────────────────────────── */
const figures = [];
(LEARN || []).forEach((u) => (u.lessons || []).forEach((l) => {
  (l.cards || []).forEach((c, i) => {
    if (c.signs) figures.push({ lesson: l.id, card: i, h: c.h || '', text: [c.h].concat(c.p || []).join(' '), fig: c.signs });
  });
}));

/* ── Each family's card teaches what it draws ─────────────────────────────── */
/* The heading of a card names the family it is about. Where it does, every
   sign in that card's row must belong to that family or to one the card
   explicitly calls an exception — and the card has to say so in its own
   words, which is what the `unless` regex is for. A row that silently mixes
   families is a row that contradicts the sentence above it. */
const TAUGHT = [
  { when: /panneaux de danger/i,       family: 'danger' },
  { when: /panneaux d'interdiction/i,  family: 'interdiction', unless: /exception|stationner|bleu/i },
  { when: /panneaux d'obligation/i,    family: 'obligation' },
  { when: /panneaux d'information/i,   family: 'indication',   unless: /cas particuliers/i },
];

figures.forEach(({ lesson, card, h, text, fig }) => {
  const where = `${lesson} card ${card} ("${h}")`;
  if (!fig.items || !fig.items.length) {
    errors.push(`${where}: has a signs block with nothing in it.`);
    return;
  }
  const seen = new Set();
  fig.items.forEach((it, n) => {
    const at = `${where}, sign ${n + 1}`;
    if (!SignFigure.FAMILIES[it.family]) {
      errors.push(`${at}: family "${it.family}" is not one sign-figure.js draws — pick from ${Object.keys(SignFigure.FAMILIES).join(', ')}.`);
    }
    if (!SignFigure.GLYPHS[it.glyph]) {
      errors.push(`${at}: glyph "${it.glyph}" does not exist, so this sign renders empty and looks like a blank one on purpose.`);
    }
    if (it.glyph === 'text' && !it.text) {
      errors.push(`${at}: uses the text glyph and gives no text, so it draws an empty sign.`);
    }
    if (it.tint && !SignFigure.FAMILIES[it.family] ) { /* family error already reported */ }
    else if (it.tint && !SignFigure.FAMILIES[it.family].tint) {
      errors.push(`${at}: sets a tint, and the ${it.family} family takes its ground from the family table. Only a family marked tint reads it.`);
    }
    if (!it.label || it.label.length < 4) errors.push(`${at}: has no name. A sign a reader cannot name is a sign they cannot be asked about.`);
    if (!it.means || it.means.length < 20) errors.push(`${at} ("${it.label}"): says nothing about what it requires of the driver.`);
    const key = it.family + '|' + it.glyph + '|' + (it.text || '') + '|' + (it.bar ? 'bar' : '') + '|' + (it.tint || '');
    if (seen.has(key)) errors.push(`${at} ("${it.label}"): the same sign is already in this row.`);
    seen.add(key);
  });

  const rule = TAUGHT.find((r) => r.when.test(h));
  if (rule) {
    const off = fig.items.filter((it) => it.family !== rule.family);
    if (off.length && !(rule.unless && rule.unless.test(text + ' ' + (fig.note || '')))) {
      errors.push(`${where}: teaches the ${rule.family} family and draws ` +
        off.map((o) => `a ${o.family} ("${o.label}")`).join(', ') +
        ` without the card saying why. Either move the sign or have the card name the exception.`);
    }
  }
});

/* ── No glyph the renderer carries goes unused ────────────────────────────── */
const used = new Set();
figures.forEach(({ fig }) => fig.items.forEach((it) => used.add(it.glyph)));
Object.keys(SignFigure.GLYPHS).forEach((g) => {
  if (!used.has(g)) errors.push(`sign-figure.js: the "${g}" glyph is drawn by nothing. Put it on a card or delete it.`);
});
const usedFam = new Set();
figures.forEach(({ fig }) => fig.items.forEach((it) => usedFam.add(it.family)));
Object.keys(SignFigure.FAMILIES).forEach((f) => {
  if (!usedFam.has(f)) errors.push(`sign-figure.js: the "${f}" family is used by no sign.`);
});

/* ── The shapes the family table points at exist ──────────────────────────── */
Object.keys(SignFigure.FAMILIES).forEach((f) => {
  const fam = SignFigure.FAMILIES[f];
  if (!SignFigure.SHAPES[fam.shape]) errors.push(`sign-figure.js: family ${f} asks for the "${fam.shape}" outline, which SHAPES does not have.`);
  if (!fam.teaches) errors.push(`sign-figure.js: family ${f} does not say what it teaches.`);
});

/* ── The families the questions ask about are families the course draws ───── */
/* Seventeen questions in cr-panneaux turn on shape and colour. If one asks
   about a family no card draws, the course is still answering it in words. */
const ASKED = [
  { re: /triangular|triangle/i, family: 'danger' },
  { re: /red border and cross-bar|prohibition/i, family: 'interdiction' },
  { re: /blue background|obligation/i, family: 'obligation' },
  { re: /rectangular\/square|information and services/i, family: 'indication' },
  { re: /\bSTOP\b/, family: 'stop' },
  { re: /c[ée]dez le passage/i, family: 'cedez' },
];
ASKED.forEach((a) => {
  const asked = (QUESTIONS || []).some((q) => a.re.test([q.q, (q.opts || []).join(' '), q.exp].join(' ')));
  if (asked && !usedFam.has(a.family)) {
    errors.push(`the question bank asks about the ${a.family} family and no lesson draws one.`);
  }
});

/* ── Styling, both ways ───────────────────────────────────────────────────── */
const css = fs.readFileSync(path.join(ROOT, 'styles.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
const canEmit = SignFigure.classes();
canEmit.forEach((c) => {
  if (!new RegExp('\\.' + c + '[\\s,.:{>+~\\[]').test(css)) {
    errors.push(`styles.css: .${c} can be rendered by sign-figure.js and has no rule, so it renders unstyled.`);
  }
});
[...new Set([...css.matchAll(/\.(signs?[a-z-]*)\b/g)].map((m) => m[1]))].forEach((c) => {
  if (canEmit.indexOf(c) === -1) errors.push(`styles.css: .${c} is styled and sign-figure.js cannot produce it.`);
});

/* ── The art carries no theme tokens ──────────────────────────────────────── */
/* The whole argument for literal colours is that a sign must not move with the
   theme. One var() in the renderer and that argument is over. */
const src = fs.readFileSync(path.join(ROOT, 'sign-figure.js'), 'utf8');
if (/var\(--/.test(src)) {
  errors.push('sign-figure.js reaches for a CSS custom property. The colours inside a sign are literals on purpose — a sign that themes is a sign learned wrong.');
}

/* ── Wiring ───────────────────────────────────────────────────────────────── */
const read = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');
[
  ['index.html', /<script src="sign-figure\.js">/, 'index.html does not load sign-figure.js, so every sign renders as nothing.'],
  ['sw.js', /'\.\/sign-figure\.js'/, 'sw.js does not precache sign-figure.js, so the signs vanish offline.'],
  ['app.js', /card\.signs\b/, 'app.js never reads card.signs, so the signs are data nothing draws.'],
].forEach(([f, re, msg]) => { if (!re.test(read(f))) errors.push(msg); });

/* ── Report ───────────────────────────────────────────────────────────────── */
console.log(`${BOLD}Road signs: the drawing against the lesson${RESET}\n`);
const total = figures.reduce((n, f) => n + f.fig.items.length, 0);
notes.push(`${total} signs in ${figures.length} rows, across ${new Set(figures.map((f) => f.lesson)).size} lessons`);
notes.push(`${usedFam.size} of ${Object.keys(SignFigure.FAMILIES).length} families and ${used.size} of ${Object.keys(SignFigure.GLYPHS).length} glyphs in use`);
notes.forEach((n) => console.log(`  ${DIM}${n}${RESET}`));
console.log('');

if (errors.length) {
  console.log(`${RED}${BOLD}── ${errors.length} problem${errors.length === 1 ? '' : 's'} ──${RESET}`);
  errors.forEach((e) => console.log(`  ${RED}✗${RESET}  ${e}`));
  console.log('');
  process.exit(1);
}
console.log(`${GREEN}${BOLD}── Every sign is the shape its lesson says it is ✓${RESET}\n`);
