#!/usr/bin/env node
/**
 * The pixel art course holds together.
 *
 * This subject is the first one in the app whose assessment is not marked.
 * Every other module ends a lesson with questions that have right answers, and
 * a checker can ask whether the answer is right. Here the lesson ends with
 * things to draw, which means two of the usual guarantees have to be replaced:
 *
 *   NOBODY IS SENT ANYWHERE THEY CANNOT GO, and nowhere goes unsent-to. A card
 *   that names "challenges 4–7" must name challenges that exist, and a
 *   challenge no card points at is one nobody will ever do. The whole design
 *   rests on the material driving the practice, so both directions are checked.
 *
 *   A CHALLENGE SAYS WHAT FINISHED LOOKS LIKE. Completion here is something the
 *   reader asserts, and an assertion with no criterion attached is worth
 *   nothing. Every challenge carries a `check` line, and this fails without it.
 *
 * The rest is the usual coverage and format discipline the other modules have:
 * every syllabus criterion taught, no lesson claiming a criterion that does not
 * exist, prose capped, and the shared machine-writing guard applied.
 *
 * FIGURES ARE CHECKED AGAINST THE RENDERER'S OWN PALETTE. A pixel grid is rows
 * of characters, and a character with no colour behind it renders as a hole
 * that looks deliberate. The allowed set is read out of pixel-ui.js rather
 * than restated here, so the two cannot drift.
 *
 * Run: node scripts/check-pixel-course.js   (exit 1 on any failure)
 */

'use strict';

const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const M = require('./lib/prose-mannerisms.js');

const RED = '\x1b[31m', GREEN = '\x1b[32m', BOLD = '\x1b[1m', DIM = '\x1b[2m', RESET = '\x1b[0m';

const SY = require(path.join(ROOT, 'pixel-syllabus.js'));
const LD = require(path.join(ROOT, 'pixel-learn-data.js'));
const CH = require(path.join(ROOT, 'pixel-challenge-data.js'));

const errors = [];
const notes = [];

/* Prose caps. The cap is the load-bearing one: pixel art is learned by moving
   pixels, and a card long enough to read instead of drawing has already lost.
   The floor catches the opposite failure — a card that is a heading and a
   figure, teaching nothing the figure did not already show. */
const WORDS_PER_CARD_MAX = 115;
const WORDS_PER_PARA_MAX = 70;
const WORDS_PER_LESSON_MIN = 120;
const HINTS_PER_CHALLENGE = 3;
const CHALLENGES_PER_UNIT = 10;

const words = (s) => String(s).trim().split(/\s+/).filter(Boolean).length;

/* ── The figure palette, read out of the renderer ─────────────────────────
   Extracted by source text rather than by running the module: pixel-ui.js is a
   browser file that touches localStorage on load. Brittle by nature, so it
   fails loudly rather than quietly checking nothing if the shape changes. */
function palette() {
  const src = fs.readFileSync(path.join(ROOT, 'pixel-ui.js'), 'utf8');
  const a = src.indexOf('var PAL = {');
  const b = src.indexOf('};', a);
  if (a === -1 || b === -1) {
    errors.push('could not find `var PAL = {` in pixel-ui.js — the figure palette could not be read, ' +
                'so no figure was checked against it.');
    return null;
  }
  const body = src.slice(a, b).replace(/\/\*[\s\S]*?\*\//g, '');
  const chars = new Set();
  /* Keys are written three ways in that object: bare (K:), quoted ('1':) and
     lowercase bare (a:). All three are one character. */
  [...body.matchAll(/(?:^|[{,\s])(?:'([^'])'|"([^"])"|([A-Za-z]))\s*:/g)]
    .forEach(m => chars.add(m[1] || m[2] || m[3]));
  return chars;
}
const PAL = palette();

/* ── 1. Coverage: every criterion taught, nothing invented ────────────────── */
{
  const known = new Set(SY.CRITERIA.map(c => c.id));
  const claimed = new Set();
  LD.LESSONS.forEach((l) => {
    (l.criteria || []).forEach((c) => {
      claimed.add(c);
      if (!known.has(c)) {
        errors.push(`${l.id} claims criterion "${c}", which is not in pixel-syllabus.js.`);
      }
    });
    if (!l.criteria || !l.criteria.length) errors.push(`${l.id} claims no criteria at all.`);
  });
  SY.readyUnits().forEach((u) => {
    SY.criteriaFor(u.id).forEach((c) => {
      if (!claimed.has(c.id)) {
        errors.push(`${c.id} ("${c.text.slice(0, 48)}…") is in a ready unit and no lesson teaches it.`);
      }
    });
    if (!LD.lessonsFor(u.id).length) {
      errors.push(`unit ${u.id} is marked ready and has no lessons.`);
    }
  });
  notes.push(`${SY.CRITERIA.length} criteria across ${SY.UNITS.length} units; all claimed by a lesson.`);
}

/* ── 2. Lessons: ids, units, card shape, figures ──────────────────────────── */
{
  const seen = new Set();
  LD.LESSONS.forEach((l) => {
    if (seen.has(l.id)) errors.push(`two lessons share the id "${l.id}".`);
    seen.add(l.id);
    if (!SY.unit(l.unit)) errors.push(`${l.id} sits in unit "${l.unit}", which is not in the syllabus.`);
    if (!l.title || !l.summary) errors.push(`${l.id} is missing a title or a summary.`);
    if (!l.cards || !l.cards.length) { errors.push(`${l.id} has no cards.`); return; }

    let lessonWords = 0;
    l.cards.forEach((card, i) => {
      const where = `${l.id} card ${i + 1}`;
      if (!card.h) errors.push(`${where} has no heading.`);
      const ps = M.paras(card);
      if (!ps.length) errors.push(`${where} has no prose.`);
      let cardWords = 0;
      ps.forEach((p) => {
        const n = words(p);
        cardWords += n;
        if (n > WORDS_PER_PARA_MAX) {
          errors.push(`${where}: a paragraph runs to ${n} words (cap ${WORDS_PER_PARA_MAX}). ` +
                      `Split it or cut it — this is a card someone reads with a stylus in their hand.`);
        }
      });
      lessonWords += cardWords;
      if (cardWords > WORDS_PER_CARD_MAX) {
        errors.push(`${where}: ${cardWords} words (cap ${WORDS_PER_CARD_MAX}).`);
      }

      /* Figures: rectangular, and drawn only with colours the renderer has. */
      const grids = [];
      if (card.art) grids.push([`${where} art`, card.art]);
      if (card.compare) {
        ['bad', 'good'].forEach((side) => {
          if (card.compare[side]) grids.push([`${where} compare.${side}`, card.compare[side]]);
        });
        if (!card.compare.bad || !card.compare.good) {
          errors.push(`${where}: a comparison figure needs both a bad and a good side.`);
        }
        if (card.compare.bad && !card.compare.bad.label) errors.push(`${where}: the bad side has no label.`);
        if (card.compare.good && !card.compare.good.label) errors.push(`${where}: the good side has no label.`);
      }
      grids.forEach(([label, fig]) => {
        const rows = fig.rows;
        if (!rows || !rows.length) { errors.push(`${label} has no rows.`); return; }
        const w = rows[0].length;
        rows.forEach((row, ri) => {
          if (row.length !== w) {
            errors.push(`${label} row ${ri + 1} is ${row.length} characters wide; row 1 is ${w}. ` +
                        `A ragged grid renders as a ragged sprite.`);
          }
          if (PAL) {
            [...row].forEach((ch) => {
              if (!PAL.has(ch)) {
                errors.push(`${label} row ${ri + 1} uses "${ch}", which is not in the renderer's palette. ` +
                            `It would draw as a hole.`);
              }
            });
          }
        });
      });

      /* Shortcut tables are pairs, both halves present. */
      (card.keys || []).forEach((k, ki) => {
        if (!Array.isArray(k) || k.length !== 2 || !k[0] || !k[1]) {
          errors.push(`${where}: shortcut ${ki + 1} is not a [key, meaning] pair.`);
        }
      });
    });
    if (lessonWords < WORDS_PER_LESSON_MIN) {
      errors.push(`${l.id} is ${lessonWords} words across its whole lesson (floor ${WORDS_PER_LESSON_MIN}).`);
    }
  });
  notes.push(`${LD.LESSONS.length} lessons, ` +
             `${LD.LESSONS.reduce((n, l) => n + l.cards.length, 0)} cards, all within the prose caps.`);
}

/* ── 3. Challenges: ten per unit, ordered, and each one answerable ────────── */
{
  const known = new Set(SY.CRITERIA.map(c => c.id));
  SY.readyUnits().forEach((u) => {
    const cs = CH.forUnit(u.id);
    if (cs.length !== CHALLENGES_PER_UNIT) {
      errors.push(`unit ${u.id} has ${cs.length} challenges; every ready unit has ${CHALLENGES_PER_UNIT}.`);
    }
    const ns = cs.map(c => c.n);
    ns.forEach((n, i) => {
      if (n !== i + 1) errors.push(`unit ${u.id}: challenge numbers are ${ns.join(',')} — they must run 1..${cs.length}.`);
    });
    /* Difficulty may plateau but never drop: challenge 7 being easier than
       challenge 3 is how a "getting harder" list stops getting harder. */
    for (let i = 1; i < cs.length; i++) {
      if (cs[i].stage < cs[i - 1].stage) {
        errors.push(`${u.id} challenge ${cs[i].n} is stage ${cs[i].stage}, after a stage ${cs[i - 1].stage} one. ` +
                    `The list is meant to get harder.`);
      }
    }
    cs.forEach((c) => {
      const where = `${u.id} challenge ${c.n}`;
      if (!c.title) errors.push(`${where} has no title.`);
      if (!c.brief) errors.push(`${where} has no brief.`);
      if (!c.canvas) errors.push(`${where} does not say what size or how many colours.`);
      if (!c.check) {
        errors.push(`${where} has no "check" line. Completion here is something the reader asserts, ` +
                    `and an assertion with no criterion attached is worth nothing.`);
      }
      const hints = c.hints || [];
      if (hints.length !== HINTS_PER_CHALLENGE) {
        errors.push(`${where} has ${hints.length} hints; every challenge has ${HINTS_PER_CHALLENGE}, ` +
                    `escalating from a nudge to what to actually do.`);
      }
      hints.forEach((h, i) => { if (!h || words(h) < 6) errors.push(`${where} hint ${i + 1} is too short to help.`); });
      (c.criteria || []).forEach((id) => {
        if (!known.has(id)) errors.push(`${where} claims criterion "${id}", which is not in the syllabus.`);
        const cr = SY.criterion(id);
        if (cr && cr.unit !== u.id) {
          errors.push(`${where} claims ${id}, which belongs to unit ${cr.unit}. ` +
                      `A challenge exercises its own unit.`);
        }
      });
      if (!c.criteria || !c.criteria.length) errors.push(`${where} claims no criteria.`);
    });
  });
  notes.push(`${CH.CHALLENGES.length} challenges, ${CHALLENGES_PER_UNIT} per ready unit, ` +
             `each with ${HINTS_PER_CHALLENGE} hints and a stated finish line.`);
}

/* ── 4. The material and the practice point at each other ─────────────────── */
{
  SY.readyUnits().forEach((u) => {
    const total = CH.forUnit(u.id).length;
    const referenced = new Set();
    LD.lessonsFor(u.id).forEach((l) => {
      l.cards.forEach((card, i) => {
        (card.exercises || []).forEach((n) => {
          if (!Number.isInteger(n) || n < 1 || n > total) {
            errors.push(`${l.id} card ${i + 1} points at challenge ${n}, which does not exist in ${u.id} ` +
                        `(it has ${total}).`);
          } else {
            referenced.add(n);
          }
        });
      });
    });
    for (let n = 1; n <= total; n++) {
      if (!referenced.has(n)) {
        const c = CH.get(u.id, n);
        errors.push(`${u.id} challenge ${n} ("${c ? c.title : '?'}") is named by no lesson card. ` +
                    `A challenge nobody is sent to is a challenge nobody does.`);
      }
    }
  });
  const cardsWithRefs = LD.LESSONS.reduce((n, l) =>
    n + l.cards.filter(c => (c.exercises || []).length).length, 0);
  notes.push(`${cardsWithRefs} cards send the reader to a challenge; every challenge is named by one.`);
}

/* ── 5. The shared machine-writing guard ──────────────────────────────────── */
{
  /* Pixel art's own tics, added to the shared list rather than replacing it.
     "crisp" and "pop" are what every tutorial on the subject says instead of
     saying which pixels to move. */
  const EXTRA_NEVER = [
    [/\bcrisp\b/i, 'crisp'],
    [/\bmake (it|them|your \w+) pop\b/i, '"make it pop"'],
    [/\bpixel-perfect\b(?!\s*(mode|is|lives|only|and))/i, '"pixel-perfect" used loosely'],
  ];
  let prose = 0, signposts = 0;
  LD.LESSONS.forEach((l) => {
    l.cards.forEach((card, i) => {
      const text = M.paras(card).join(' ');
      prose += words(text);
      const never = M.neverHits(text, EXTRA_NEVER);
      never.forEach(w => errors.push(`${l.id} card ${i + 1}: "${w}" — machine-writing vocabulary.`));
      const cadence = M.cadenceHits(text);
      if (cadence.length > M.CADENCE_MAX_PER_CARD) {
        errors.push(`${l.id} card ${i + 1}: ${cadence.length} rhetorical shapes stacked ` +
                    `(${cadence.join('; ')}). At most ${M.CADENCE_MAX_PER_CARD} per card.`);
      }
      signposts += M.signpostCount(text);
    });
  });
  const rate = prose ? (signposts / prose) * 1000 : 0;
  if (rate > M.SIGNPOST_CEILING_PER_1K) {
    errors.push(`signposting runs at ${rate.toFixed(2)} per thousand words ` +
                `(ceiling ${M.SIGNPOST_CEILING_PER_1K}).`);
  }
  notes.push(`${prose} words of lesson prose; signposting at ${rate.toFixed(2)} per thousand.`);
}

/* ── 6. The subject is wired up the way it says it is ─────────────────────── */
{
  const app = fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8');
  const entry = app.slice(app.indexOf("id: 'pixel'"), app.indexOf("id: 'code-route'"));
  if (!entry) {
    errors.push('app.js has no SUBJECT_REGISTRY entry for pixel.');
  } else {
    const assets = [...entry.matchAll(/'(pixel-[a-z-]+\.js)'/g)].map(m => m[1]);
    ['pixel-syllabus.js', 'pixel-learn-data.js', 'pixel-challenge-data.js', 'pixel-ui.js']
      .forEach((f) => {
        if (!assets.includes(f)) errors.push(`app.js does not load ${f} for the pixel subject.`);
        if (!fs.existsSync(path.join(ROOT, f))) errors.push(`${f} is named in app.js and is not on disk.`);
      });
    /* Order matters: pixel-ui.js reads the other three at load time, and
       loadScript() preserves order only because it says async = false. */
    if (assets.indexOf('pixel-ui.js') !== assets.length - 1) {
      errors.push('pixel-ui.js must be the last asset — it reads the other three as it loads.');
    }
    if (!/styles:\s*'pixel-styles\.css'/.test(entry)) {
      errors.push('the pixel subject does not declare pixel-styles.css, so it would mount unstyled.');
    }
  }

  /* Lazy, like guitar: its files are dead weight in the offline install of
     someone who only studies AAT. The service worker has to agree. */
  const sw = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');
  const lazy = /var LAZY_PATTERN = (\/.*\/);/.exec(sw);
  if (!lazy) {
    errors.push('could not read LAZY_PATTERN out of sw.js.');
  } else {
    const re = new RegExp(lazy[1].slice(1, lazy[1].lastIndexOf('/')));
    ['pixel-ui.js', 'pixel-styles.css', 'pixel-learn-data.js'].forEach((f) => {
      if (!re.test('/' + f)) {
        errors.push(`sw.js's LAZY_PATTERN does not match ${f}, so it would be fetched from the network ` +
                    `every time and the subject would not work offline.`);
      }
    });
  }
  const core = sw.slice(sw.indexOf('var CORE_ASSETS = ['), sw.indexOf('];', sw.indexOf('var CORE_ASSETS = [')));
  if (/pixel-/.test(core)) {
    errors.push('sw.js precaches a pixel file. They are meant to be lazy, so an AAT-only reader ' +
                'does not carry them offline.');
  }

  const css = fs.readFileSync(path.join(ROOT, 'pixel-styles.css'), 'utf8');
  if (!/body\[data-subject="pixel"\]/.test(css)) {
    errors.push('pixel-styles.css is not scoped to body[data-subject="pixel"] and could reach other subjects.');
  }
  const unscoped = css.replace(/\/\*[\s\S]*?\*\//g, '')
    .split('}').map(b => b.split('{')[0].trim()).filter(Boolean)
    .filter(sel => sel && !sel.startsWith('body') && !sel.startsWith('@'));
  unscoped.forEach(sel => errors.push(`pixel-styles.css: "${sel}" is not scoped to this subject.`));
  notes.push('The subject loads its own assets lazily, styled, in dependency order.');
}

/* ── Report ──────────────────────────────────────────────────────────────── */
console.log(`${BOLD}Pixel art — course, challenges and wiring${RESET}\n`);
notes.forEach(n => console.log(`  ${DIM}${n}${RESET}`));
console.log('');

if (errors.length) {
  console.log(`${RED}${BOLD}── ${errors.length} problem${errors.length === 1 ? '' : 's'} ──${RESET}`);
  errors.forEach(e => console.log(`  ${RED}✗${RESET}  ${e}`));
  console.log('');
  process.exit(1);
}
console.log(`${GREEN}${BOLD}── The material teaches every criterion and sends the reader to every challenge ✓${RESET}\n`);
