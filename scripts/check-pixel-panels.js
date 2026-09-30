#!/usr/bin/env node
/* Aseprite's interface: does the drawing point at anything?
 *
 * WHY THIS EXISTS
 *
 * pixel-panels.js draws the program the course is taught in — the New Sprite
 * dialog, the toolbar, the timeline with its onion range and its tag bar, the
 * layer stack, the indexed palette. A panel earns its place by being pointed
 * at: a mark written into a label, and a line beneath saying what that control
 * does. A dialog with no marks on it is a picture of a dialog.
 *
 * So the thing that has to hold is the pointing. A legend entry explaining ②
 * when nothing in the drawing prints ② is worse than no legend: the reader
 * hunts for a mark that is not there and concludes they have missed it.
 * pixel-panels.js reports the marks it actually prints, and this compares the
 * two sets in both directions rather than re-deriving them.
 *
 * The rest is the shape of the data, and one thing that is easy to get wrong
 * in a timeline: a tag or an onion range running past the last frame draws
 * off the end of the panel, which looks like a rendering bug and is a typo.
 *
 * WHAT IT CANNOT CHECK. Whether the diagram resembles Aseprite. That was done
 * by rendering the panels and looking at them, and it has to be done again by
 * eye whenever a kind changes.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const RED = '\x1b[31m', GREEN = '\x1b[32m', DIM = '\x1b[2m', BOLD = '\x1b[1m', RESET = '\x1b[0m';

const PP = require(path.join(ROOT, 'pixel-panels.js'));
const DATA = require(path.join(ROOT, 'pixel-learn-data.js'));
const LESSONS = (DATA.PixelLearnData || DATA).LESSONS;

const errors = [];
const notes = [];

const panels = [];
(LESSONS || []).forEach((l) => (l.cards || []).forEach((c, i) => {
  if (c.panel) panels.push({ where: `${l.unit} ${l.id} card ${i} ("${c.h}")`, p: c.panel, card: c });
}));

const CONTROLS = ['field', 'select', 'check', 'radios', 'button'];

panels.forEach(({ where, p, card }) => {
  const bad = (m) => errors.push(`${where}: ${m}`);
  if (!PP.KINDS[p.kind]) {
    bad(`kind "${p.kind}" is not one pixel-panels.js draws — pick from ${Object.keys(PP.KINDS).join(', ')}.`);
    return;
  }

  if (p.kind === 'dialog') {
    if (!p.rows || !p.rows.length) bad('is a dialog with no rows.');
    (p.rows || []).forEach((r, i) => {
      if (CONTROLS.indexOf(r[1]) === -1) {
        bad(`row ${i + 1} ("${r[0]}") asks for a "${r[1]}" control, which does not exist. Use one of ${CONTROLS.join(', ')}.`);
      }
      if (r[1] === 'radios' && !/\*/.test(String(r[2]))) {
        bad(`row ${i + 1} ("${r[0]}") is a set of radios with none selected — mark one with a trailing *.`);
      }
      if (r[1] === 'check' && !/^(on|off)\b/.test(String(r[2]))) {
        bad(`row ${i + 1} ("${r[0]}") is a tick box whose value does not start "on" or "off", so it draws unticked whatever was meant.`);
      }
    });
  }

  if (p.kind === 'toolbar') {
    if (!p.tools || !p.tools.length) bad('is a toolbar with no tools.');
    if ((p.tools || []).filter((t) => t[2]).length !== 1) {
      bad('a toolbar shows exactly one active tool — that is what it is for.');
    }
  }

  if (p.kind === 'timeline') {
    const n = p.frames || 0;
    if (n < 2) bad('is a timeline with fewer than two frames.');
    (p.layers || []).forEach((l, i) => {
      if ((l[1] || '').length !== n) {
        bad(`layer ${i + 1} ("${l[0]}") has ${(l[1] || '').length} cels against ${n} frames.`);
      }
      if (!/^[#.]*$/.test(l[1] || '')) bad(`layer ${i + 1} ("${l[0]}") uses a character other than # or . for its cels.`);
    });
    ['onion', 'tag'].forEach((k) => {
      if (!p[k]) return;
      const [a, b] = p[k];
      if (!(a >= 1 && b >= a && b <= n)) {
        bad(`the ${k} covers frames ${a}–${b}, which is not inside 1–${n}. It would draw off the end of the panel.`);
      }
    });
    if (!p.layers || !p.layers.length) bad('is a timeline with no layers.');
  }

  if (p.kind === 'palette') {
    const cols = p.colours || [];
    if (cols.length < 4) bad('is a palette of fewer than four colours.');
    cols.forEach((c, i) => {
      if (!/^#[0-9a-f]{6}$/i.test(c)) bad(`palette entry ${i} is "${c}", which is not a six-digit hex colour.`);
    });
    if (new Set(cols.map((c) => c.toLowerCase())).size !== cols.length) {
      bad('has the same colour in two slots. In indexed mode that is two indexes nobody can tell apart.');
    }
  }

  if (p.kind === 'layers' && (!p.items || !p.items.length)) bad('is a layer stack with no layers.');

  /* ── The pointing ─────────────────────────────────────────────────────── */
  const printed = PP.usedMarks(p);
  const legend = (p.marks || []).map((m) => m[0]);
  if (!legend.length) {
    bad('has no annotations. A drawing of a panel with nothing pointed at is decoration; say what at least one control does.');
  }
  printed.forEach((m) => {
    if (legend.indexOf(m) === -1) bad(`prints ${m} in the panel and never says what it is.`);
  });
  legend.forEach((m, i) => {
    if (PP.MARKS.indexOf(m) === -1) bad(`annotation ${i + 1} is marked "${m}", which is not one of ${PP.MARKS.join('')}.`);
    else if (printed.indexOf(m) === -1) bad(`explains ${m} and prints it nowhere in the drawing, so the reader hunts for a mark that is not there.`);
    if (legend.indexOf(m) !== i) bad(`uses ${m} for two different annotations.`);
    if (PP.MARKS[i] !== m) bad(`annotation ${i + 1} is ${m}; the legend runs in order, so it should be ${PP.MARKS[i]}.`);
  });
  (p.marks || []).forEach((m, i) => {
    if (!m[1] || m[1].length < 40) bad(`annotation ${i + 1} explains ${m[0]} in ${(m[1] || '').length} characters. Say what the control does, or drop the mark.`);
  });

  /* A panel on a card that never mentions the program is a panel on the wrong
     card. Cheap, and it caught nothing — which is the point of running it. */
  const prose = [card.h].concat(card.p || []).join(' ');
  if (!/aseprite|timeline|palette|layer|export|dialog|tool|tag|onion|colou?r mode|file ▸|sprite ▸|edit ▸/i.test(prose)) {
    errors.push(`${where}: draws a panel and the card never mentions the interface. Either the card should, or the panel is on the wrong card.`);
  }
});

/* ── Every kind is used ───────────────────────────────────────────────────── */
const kinds = new Set(panels.map((x) => x.p.kind));
Object.keys(PP.KINDS).forEach((k) => {
  if (!kinds.has(k)) errors.push(`pixel-panels.js: the "${k}" panel is drawn by nothing. Put it on a card or delete it.`);
});

/* ── The chrome does not theme ────────────────────────────────────────────── */
const src = fs.readFileSync(path.join(ROOT, 'pixel-panels.js'), 'utf8');
if (/var\(--/.test(src)) {
  errors.push('pixel-panels.js reaches for a CSS custom property. Aseprite is dark grey whichever theme the reader has set, and a panel repainted white stops looking like the program.');
}

/* ── Wiring ───────────────────────────────────────────────────────────────── */
const read = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');
[
  ['pixel-ui.js', /card\.panel\b/, 'pixel-ui.js never reads card.panel, so the panels are data nothing draws.'],
  ['app.js', /'pixel-panels\.js'/, "the pixel subject's assets in app.js do not list pixel-panels.js, so PixelPanels is never loaded."],
].forEach(([f, re, msg]) => { if (!re.test(read(f))) errors.push(msg); });

/* ── Report ───────────────────────────────────────────────────────────────── */
console.log(`${BOLD}Aseprite panels: does the drawing point at anything?${RESET}\n`);
notes.push(`${panels.length} panels across ${new Set(panels.map((x) => x.where.split(' ')[0])).size} units, ${kinds.size} of ${Object.keys(PP.KINDS).length} kinds in use`);
notes.push(`${panels.reduce((n, x) => n + (x.p.marks || []).length, 0)} controls pointed at and explained`);
notes.forEach((n) => console.log(`  ${DIM}${n}${RESET}`));
console.log('');

if (errors.length) {
  console.log(`${RED}${BOLD}── ${errors.length} problem${errors.length === 1 ? '' : 's'} ──${RESET}`);
  errors.forEach((e) => console.log(`  ${RED}✗${RESET}  ${e}`));
  console.log('');
  process.exit(1);
}
console.log(`${GREEN}${BOLD}── Every panel points at a control and says what it does ✓${RESET}\n`);
