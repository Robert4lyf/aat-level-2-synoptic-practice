#!/usr/bin/env node
/* Concept diagrams: does the shape still mean what the shape means?
 *
 * WHY THIS EXISTS
 *
 * diagram-figure.js draws six shapes and no seventh, because the shape is
 * half the message: a cycle has to come back round, a spectrum has to run
 * between two opposites, a matrix has to have four quadrants, a stack has to
 * rank. A reader learns the shape as well as the content, so a diagram that
 * stops obeying its own kind teaches something false twice over — once about
 * the subject, and once about what that shape means the next time they see it.
 *
 * So this holds every diagram to its kind:
 *
 *   cycle     at least four steps and a stated return — three boxes and an
 *             arrow is a process, not a cycle
 *   chain     at least three parties, and something named flowing between
 *   hub       a centre, at least three satellites, and labels short enough
 *             to fit the drawn box, because SVG text does not wrap
 *   spectrum  two ends, positions inside 0–1, no two items in the same place,
 *             and something actually at each end
 *   stack     at least three layers, ranked
 *   matrix    all four quadrants filled, and both axes named
 *
 * It also checks the attachment. Diagrams are keyed by card heading rather
 * than passed into card(), which keeps them readable in one block and makes a
 * heading rename silently drop the picture — so every key has to match
 * exactly one card, and every card said to carry one has to have got it.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const RED = '\x1b[31m', GREEN = '\x1b[32m', DIM = '\x1b[2m', BOLD = '\x1b[1m', RESET = '\x1b[0m';

const DF = require(path.join(ROOT, 'diagram-figure.js'));
const MODULES = [
  ['L2M1', 'cips2-l2m1-learn-data.js'],
  ['L2M2', 'cips2-l2m2-learn-data.js'],
];

const errors = [];
const notes = [];
const found = [];

MODULES.forEach(([name, file]) => {
  const m = require(path.join(ROOT, file));
  const src = fs.readFileSync(path.join(ROOT, file), 'utf8');

  /* Every heading in the DIAGRAMS block matches exactly one card. */
  const block = src.match(/var DIAGRAMS = \{([\s\S]*?)\n  \};/);
  if (!block) {
    errors.push(`${file}: no DIAGRAMS block. If diagrams moved, this check has to move with them.`);
  } else {
    const keys = [...block[1].matchAll(/^\s{4}'((?:[^'\\]|\\.)*)':\s*\{/gm)].map((x) => x[1].replace(/\\'/g, "'"));
    keys.forEach((k) => {
      let hits = 0;
      m.LESSONS.forEach((l) => (l.cards || []).forEach((c) => { if (c.h === k) hits++; }));
      if (hits !== 1) {
        errors.push(`${file}: the diagram keyed "${k}" matches ${hits} cards. A renamed heading drops its diagram without a word.`);
      }
    });
    if (!keys.length) errors.push(`${file}: the DIAGRAMS block is empty.`);
  }

  m.LESSONS.forEach((l) => (l.cards || []).forEach((c, i) => {
    if (c.diagram) found.push({ where: `${name} ${l.id} card ${i} ("${c.h}")`, d: c.diagram, card: c });
  }));
});

found.forEach(({ where, d, card }) => {
  const bad = (msg) => errors.push(`${where}: ${msg}`);
  if (DF.KINDS.indexOf(d.kind) === -1) {
    bad(`kind "${d.kind}" is not one diagram-figure.js draws — pick from ${DF.KINDS.join(', ')}.`);
    return;
  }
  if (!d.title) bad('has no title.');
  if (!d.note || d.note.length < 40) bad('has no note under it saying what the shape is for. The picture is not self-explanatory; that is why it has a caption.');

  const items = d.items || [];
  const labels = items.map((x) => x.label || '');
  labels.forEach((x, i) => { if (!x) bad(`item ${i + 1} has no label.`); });
  if (new Set(labels).size !== labels.length) bad('has the same label twice.');

  if (d.kind === 'cycle') {
    if (items.length < 4) bad(`is a cycle of ${items.length} steps. Three boxes and an arrow is a process; a cycle has to look like one.`);
    if (!d.returns || d.returns.length < 15) bad('is a cycle that does not say where it returns to, which is the only thing that makes it a cycle rather than a list.');
  }

  if (d.kind === 'chain') {
    if (items.length < 3) bad(`is a chain of ${items.length}. A chain needs something in the middle.`);
    const flows = items.slice(0, -1).filter((x) => x.flow).length;
    if (flows !== items.length - 1) {
      bad(`names what flows across ${flows} of its ${items.length - 1} links. An unlabelled arrow between two parties says only that they are next to each other.`);
    }
    if (items[items.length - 1].flow) bad('names something flowing out of its last party, and nothing is drawn after it.');
  }

  if (d.kind === 'hub') {
    if (!d.centre) bad('is a hub with nothing at the centre.');
    if (items.length < 3) bad(`is a hub with ${items.length} satellites.`);
    labels.concat([d.centre || '']).forEach((x) => {
      if (x.length > DF.HUB_LABEL_MAX) {
        bad(`"${x}" is ${x.length} characters and a hub label has to fit a drawn box — ${DF.HUB_LABEL_MAX} is the limit. SVG text does not wrap; it runs off the edge.`);
      }
    });
    items.forEach((x, i) => { if (x.sub) bad(`satellite ${i + 1} ("${x.label}") carries a sub-label, and the ring has nowhere to put one.`); });
  }

  if (d.kind === 'spectrum') {
    const ends = d.ends || [];
    if (ends.length !== 2 || !ends[0] || !ends[1]) bad('is a spectrum without two named ends.');
    if (items.length < 3) bad(`is a spectrum with ${items.length} things on it.`);
    const ats = items.map((x) => x.at);
    ats.forEach((a, i) => {
      if (typeof a !== 'number' || a < 0 || a > 1) bad(`item ${i + 1} ("${labels[i]}") sits at ${a}; a position on the range runs 0 to 1.`);
    });
    if (new Set(ats).size !== ats.length) bad('puts two things in the same place on the range, which says they carry the risk equally — if that is meant, say so in the note and move one.');
    if (Math.min.apply(null, ats) > 0.15) bad('has nothing near its left end, so the end is named and never reached.');
    if (Math.max.apply(null, ats) < 0.85) bad('has nothing near its right end, so the end is named and never reached.');
    items.forEach((x, i) => { if (!x.sub || x.sub.length < 30) bad(`item ${i + 1} ("${labels[i]}") is placed on the range and not explained.`); });
  }

  if (d.kind === 'stack') {
    if (items.length < 3) bad(`is a stack of ${items.length}. Two layers is a comparison.`);
  }

  if (d.kind === 'matrix') {
    const qs = (d.cells || []).map((c) => c.q);
    DF.QUADRANTS.forEach((q) => {
      if (qs.indexOf(q) === -1) bad(`is a matrix with no ${q} quadrant. A missing quadrant reads as "this combination cannot happen", which is almost never what is meant.`);
    });
    qs.forEach((q, i) => {
      if (DF.QUADRANTS.indexOf(q) === -1) bad(`cell ${i + 1} is in quadrant "${q}", which is not one of ${DF.QUADRANTS.join(', ')}.`);
      if (qs.indexOf(q) !== i) bad(`has two cells in the ${q} quadrant.`);
    });
    [['x', d.x], ['y', d.y]].forEach(([ax, v]) => {
      if (!v || v.length !== 2 || !v[0] || !v[1]) bad(`does not name both ends of its ${ax} axis, so the grid has four boxes and no meaning.`);
    });
    (d.cells || []).forEach((c, i) => {
      if (!c.label) bad(`cell ${i + 1} has no label.`);
      if (!c.sub || c.sub.length < 20) bad(`cell ${i + 1} ("${c.label}") does not say which combination it is.`);
    });
  }

  /* The card has to be about the thing the diagram draws. Cheap, and it is
     the check that survives a diagram being moved to the wrong heading. */
  const prose = [card.h].concat(card.p || [], card.points || []).join(' ').toLowerCase();
  /* Matched on the first six letters rather than the whole word, because a
     title says "commitment" where the prose says "committing" and a check
     that cannot see those are the same word is a check that gets switched
     off. Six is long enough that it does not match by accident. */
  const words = (d.title || '').toLowerCase().split(/[^a-z]+/).filter((w) => w.length > 4);
  if (words.length && !words.some((w) => prose.indexOf(w.slice(0, 6)) !== -1)) {
    errors.push(`${where}: the diagram is titled "${d.title}" and the card's text shares none of it. Either it is on the wrong card, or the title is describing something else.`);
  }
});

/* ── Every kind is used ───────────────────────────────────────────────────── */
const kinds = new Set(found.map((f) => f.d.kind));
DF.KINDS.forEach((k) => {
  if (!kinds.has(k)) errors.push(`diagram-figure.js: the "${k}" shape is drawn by nothing. A shape nobody uses is one nobody has had to make work.`);
});

/* ── Styling and wiring ───────────────────────────────────────────────────── */
/* The class names are checked both ways by check-subject-styles.js, which asks
   diagram-figure.js what it can emit for the c2-dia stem. This only has to
   make sure the thing is loaded and called at all. */
const read = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');
[
  ['cips2.html', /<script src="diagram-figure\.js">/, 'cips2.html does not load diagram-figure.js, so every diagram renders as nothing.'],
  ['sw.js', /'\.\/diagram-figure\.js'/, 'sw.js does not precache diagram-figure.js, so the diagrams vanish offline.'],
  ['cips2-page.js', /c\.diagram\b/, 'cips2-page.js never reads c.diagram, so the diagrams are data nothing draws.'],
].forEach(([f, re, msg]) => { if (!re.test(read(f))) errors.push(msg); });

/* ── Report ───────────────────────────────────────────────────────────────── */
console.log(`${BOLD}Concept diagrams: does the shape mean what the shape means?${RESET}\n`);
notes.push(`${found.length} diagrams, ${kinds.size} of ${DF.KINDS.length} shapes in use: ${[...kinds].sort().join(', ')}`);
notes.push(`across ${new Set(found.map((f) => f.where.split(' ')[0])).size} modules`);
notes.forEach((n) => console.log(`  ${DIM}${n}${RESET}`));
console.log('');

if (errors.length) {
  console.log(`${RED}${BOLD}── ${errors.length} problem${errors.length === 1 ? '' : 's'} ──${RESET}`);
  errors.forEach((e) => console.log(`  ${RED}✗${RESET}  ${e}`));
  console.log('');
  process.exit(1);
}
console.log(`${GREEN}${BOLD}── Every diagram keeps the promise its shape makes ✓${RESET}\n`);
