#!/usr/bin/env node
/**
 * Does aat3-syllabus.js actually say what the published specification says?
 *
 * check-aat3-coverage.js asks whether the encoded tree is INTERNALLY consistent
 * — weightings total 100, no orphan tags, no duplicate ids. Every one of those
 * checks passes just as happily on a tree that was transcribed wrongly. A key
 * concept given the wrong tier, an indicative bullet dropped on the floor, an
 * outcome weighting off by five: all internally consistent, all wrong, and all
 * invisible until a student is taught to the wrong depth.
 *
 * The syllabus is the spine every lesson tags against, so a transcription fault
 * propagates into the coverage ratchet and out into the material. It is also
 * the one part of this project that can be checked against an authority rather
 * than against taste: docs/reference/aat-l3-spec-v5.11-extracted.txt is the
 * text of the specification itself.
 *
 * So this reads both and compares them:
 *
 *   1. IDS — every key concept in the spec is encoded, and every encoded
 *      concept exists in the spec. Neither dropped nor invented.
 *   2. TIERS — each concept's tier matches the "Learners need to…" heading
 *      governing it in the spec, which is what drives the teaching-load model.
 *   3. TEXT — the encoded wording is a rewording of the spec's, not a
 *      different concept. Deliberately loose (see OVERLAP_FLOOR): the encoding
 *      sentence-cases and unwraps, so a strict match would be noise.
 *   4. STRUCTURE — outcome numbers, topic-area ids and topic titles.
 *   5. WEIGHTINGS — against the unit's own test specification table.
 *   6. EXCLUSIONS — an "Excluded:" line in the spec is encoded as one, and
 *      nothing is marked excluded that the spec does not exclude.
 *   7. INDICATIVE CONTENT — the bullet count under each concept.
 *
 * THE ONE PLACE THE SPEC CANNOT BE READ LITERALLY is recorded in
 * LAYOUT_SCRAMBLES below rather than papered over. Where the source PDF sets a
 * topic in two columns, the extracted text interleaves them, and a concept can
 * end up printed under a heading that does not govern it. That is detectable —
 * the identifiers stop ascending — so the check finds those places itself and
 * requires each to be listed with a reason, instead of trusting a heading it
 * has already established is in the wrong place.
 *
 * Scoped to FAPS. TPFB was encoded from the same PDF before this check existed
 * and predates the extract in docs/reference; retro-fitting it is worth doing
 * and is not this change.
 *
 * Run: node scripts/check-aat3-syllabus-fidelity.js   (exit 1 on any failure)
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const RED = '\x1b[31m', GREEN = '\x1b[32m', YELLOW = '\x1b[33m';
const BOLD = '\x1b[1m', DIM = '\x1b[2m', RESET = '\x1b[0m';

const SPEC_FILE = path.join(ROOT, 'docs/reference/aat-l3-spec-v5.11-extracted.txt');
const S = require(path.join(ROOT, 'aat3-syllabus.js'));

/* WHICH UNITS ARE CHECKED, and what identifies each one inside the extract.
   Everything unit-specific lives here; the body below is written once.

   It was written for FAPS alone, and stayed that way when MATS was encoded —
   so a MATS outcome weighting could be wrong by five points and this file,
   whose section 5 exists precisely to catch that, would report a clean pass.
   A checker scoped to one unit is not a checker, it is a checker for that unit.

   TPFB is still absent, and deliberately: it was encoded from the same PDF
   before this check or the extract existed, and retro-fitting it is worth doing
   and is its own change. */
const UNITS = [
  {
    key: 'faps',
    name: 'Financial Accounting: Preparing Financial Statements',
    head: /Financial Accounting: Preparing Financial Statements/,
    strip: /^Financial Accounting: Preparing Financial Statements( \d+)?\s*$/,
    tableStart: /^Test specification for Financial Accounting: Preparing Financial Statements/,
    tableEnd: /^Management Accounting Techniques\s*$/,
    /* A floor on the parse, not on the unit: below this the parser has broken
       and every comparison after it is meaningless rather than passing. */
    minConcepts: 100,
    /* Concepts the extracted text prints under a heading that does not govern
       them, with the reason. The check verifies each entry is REALLY scrambled
       before accepting it, so this cannot be used to wave through a tier that
       is simply wrong. */
    scrambles: {
      '2.3.6': 'Topic 2.3 is set in two columns and breaks across pages 48 and 49. ' +
               'The extract emits the right-hand column ("Learners need to be able to: 2.3.7") ' +
               'before the tail of the left ("2.3.6 that accounting software automates the ' +
               'transfer of data into the control accounts"), so 2.3.6 lands under the ' +
               '"be able to" heading. It is a statement of fact about software, carries no verb ' +
               'a learner could perform, and sits in the understand column of the printed page.',
    },
  },
  {
    key: 'mats',
    name: 'Management Accounting Techniques',
    head: /Management Accounting Techniques/,
    strip: /^Management Accounting Techniques( \d+)?\s*$/,
    tableStart: /^Test specification for Management Accounting Techniques/,
    tableEnd: /^Tax Processes for Businesses/,
    minConcepts: 60,
    scrambles: {},
  },
];

const errors = [];
const warnings = [];
const notes = [];

/* Below this share of the spec's own content words, the encoded text is not a
   rewording of that concept — it is a different concept, or the wrong one
   pasted from a neighbour. Set low on purpose: the encoding legitimately drops
   articles, sentence-cases, expands "NCA" and unwraps hyphenated line breaks,
   and a checker that fired on ordinary rewording would be turned off. */
const OVERLAP_FLOOR = 0.5;
const OVERLAP_WARN = 0.7;

/* ── Read the specification ──────────────────────────────────────────────── */
if (!fs.existsSync(SPEC_FILE)) {
  console.log(`${RED}✗${RESET} ${SPEC_FILE} is missing — the fidelity check has nothing to read.`);
  process.exit(1);
}
const specRaw = fs.readFileSync(SPEC_FILE, 'utf8');

/* A unit's scope of content, bounded by its own headings so the slice survives
   the spec being re-extracted at different line numbers. */
function sliceScope(text, startRe, endRe) {
  const lines = text.split('\n');
  let from = -1, to = -1;
  for (let i = 0; i < lines.length; i++) {
    if (from === -1 && startRe.test(lines[i])) from = i;
    else if (from !== -1 && endRe.test(lines[i])) { to = i; break; }
  }
  return from === -1 || to === -1 ? null : lines.slice(from, to);
}

/* "Scope of content" appears once per unit, so anchor on the unit's running
   head that precedes it and end at the unit's "Delivering this unit". */
function checkUnit(CFG) {
const scopeLines = (() => {
  const lines = specRaw.split('\n');
  let from = -1;
  for (let i = 0; i < lines.length; i++) {
    if (/^Scope of content\s*$/.test(lines[i]) && CFG.head.test(lines[i - 1] || '')) { from = i; break; }
  }
  if (from === -1) return null;
  for (let i = from; i < lines.length; i++) {
    if (/^Delivering this unit\s*$/.test(lines[i])) return lines.slice(from, i);
  }
  return null;
})();

if (!scopeLines) {
  console.log(`${RED}✗${RESET} Could not locate the ${CFG.key.toUpperCase()} scope of content in the extract — the check would silently assert nothing.`);
  process.exit(1);
}

const LAYOUT_SCRAMBLES = CFG.scrambles;

/* Strip page furniture: the running head, the page counter and blank lines. */
const scope = scopeLines
  .filter(l => !/^-- \d+ of \d+ --\s*$/.test(l))
  .filter(l => !CFG.strip.test(l))
  .filter(l => l.trim() !== '');

/* ── Parse it ────────────────────────────────────────────────────────────── */
const TIER_HEADINGS = {
  'learners need to know:': 'know',
  'learners need to understand:': 'understand',
  'learners need to be able to:': 'do',
  /* Printed without the "to" on page 49. Kept verbatim rather than matched
     loosely, so a genuinely new heading is a parse failure and not a guess. */
  'learners need be able to:': 'do',
};

const CONCEPT_RE = /^([1-9]\.\d+\.\d+)\s+(.*)$/;
const TOPIC_RE = /^([1-9]\.\d+)\s+([A-Z].*)$/;
/* THE DOT IS OPTIONAL, because the specification is inconsistent about it: FAPS
   prints every outcome heading as "3. Title", MATS prints outcomes 2, 3 and 4
   as "2 Title" and the rest with the dot. Requiring the dot made the parser
   miss three MATS headings, leave `currentOutcome` at 1, and report seventeen
   correctly-encoded concepts as filed under the wrong outcome.

   Dropping the dot widens what this can match, so it is narrowed again by
   sequence: a real outcome heading is always the NEXT one. A wrapped line that
   happens to begin with a digit and a capital cannot satisfy that. */
const OUTCOME_RE = /^([1-9])\.?\s+([A-Z].*)$/;

const specConcepts = new Map();   // id → { tier, text, bullets, excluded, topic, outcome }
const specTopics = new Map();     // id → title
const specOutcomes = new Map();   // n  → title
let tier = null, current = null, currentTopic = null, currentOutcome = null;

scope.forEach(raw => {
  const line = raw.trim();

  const heading = TIER_HEADINGS[line.toLowerCase()];
  if (heading) { tier = heading; return; }

  const om = OUTCOME_RE.exec(line);
  if (om && !CONCEPT_RE.test(line) && !TOPIC_RE.test(line) &&
      Number(om[1]) === (currentOutcome === null ? 1 : currentOutcome + 1)) {
    currentOutcome = Number(om[1]);
    specOutcomes.set(currentOutcome, om[2].trim());
    current = null;
    return;
  }

  const tm = TOPIC_RE.exec(line);
  if (tm && !CONCEPT_RE.test(line)) {
    currentTopic = tm[1];
    specTopics.set(currentTopic, tm[2].trim());
    current = null;
    return;
  }

  const cm = CONCEPT_RE.exec(line);
  if (cm) {
    current = { id: cm[1], tier: tier, text: cm[2].trim(), bullets: [], excluded: [], topic: currentTopic, outcome: currentOutcome };
    specConcepts.set(cm[1], current);
    return;
  }

  if (!current) return;
  if (/^-\s+/.test(line)) { current.bullets.push(line.replace(/^-\s+/, '').trim()); return; }
  if (/^Excluded:/i.test(line)) { current.excluded.push(line.replace(/^Excluded:\s*/i, '').trim()); return; }
  /* A continuation of whatever came last: the PDF wraps mid-sentence, and a
     bullet's tail must join the bullet rather than the concept. */
  if (current.bullets.length) current.bullets[current.bullets.length - 1] += ' ' + line;
  else if (current.excluded.length) current.excluded[current.excluded.length - 1] += ' ' + line;
  else current.text += ' ' + line;
});

/* Rejoin words the PDF hyphenated across a line break, and normalise quotes. */
function tidy(s) {
  return String(s)
    .replace(/([a-z])-\s+([a-z])/g, '$1$2')
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/−/g, '-')
    .replace(/\s+/g, ' ')
    .trim();
}
specConcepts.forEach(c => {
  c.text = tidy(c.text).replace(/[.:]$/, '');
  c.bullets = c.bullets.map(b => tidy(b).replace(/[.]$/, ''));
  c.excluded = c.excluded.map(e => tidy(e).replace(/[.]$/, ''));
});

const U = CFG.key.toUpperCase();
notes.push(`${U}: read ${specConcepts.size} key concepts, ${specTopics.size} topic areas and ${specOutcomes.size} outcomes out of the specification extract.`);

if (specConcepts.size < CFG.minConcepts) {
  errors.push(`${U}: only ${specConcepts.size} concepts parsed out of the extract, against a floor of ${CFG.minConcepts} — the parser has broken and every comparison below is meaningless.`);
}

/* ── The encoding ────────────────────────────────────────────────────────── */
const unit = S.SYLLABUS.units[CFG.key];
if (!unit) {
  console.log(`${RED}✗${RESET} No "${CFG.key}" unit in aat3-syllabus.js.`);
  process.exit(1);
}
const encoded = new Map();
unit.outcomes.forEach(o => o.topics.forEach(t => t.concepts.forEach(c => {
  encoded.set(c.id, { ...c, topic: t.id, topicTitle: t.title, outcome: o.n, outcomeTitle: o.title, weighting: o.weighting });
})));

/* ── 1. Ids ──────────────────────────────────────────────────────────────── */
const missing = [...specConcepts.keys()].filter(id => !encoded.has(id));
const invented = [...encoded.keys()].filter(id => !specConcepts.has(id));
missing.forEach(id => errors.push(`${U} ${id} is in the specification and not in the encoding — "${specConcepts.get(id).text.slice(0, 70)}…"`));
invented.forEach(id => errors.push(`${U} ${id} is encoded and appears nowhere in the specification.`));

/* ── 2. Tiers ────────────────────────────────────────────────────────────── */
/* Which ids the extract prints out of sequence within their topic. Computed,
   not asserted: this is the evidence that a LAYOUT_SCRAMBLES entry is real. */
const scrambled = new Set();
{
  const byTopic = new Map();
  [...specConcepts.keys()].forEach(id => {
    const t = id.split('.').slice(0, 2).join('.');
    if (!byTopic.has(t)) byTopic.set(t, []);
    byTopic.get(t).push(id);
  });
  byTopic.forEach(ids => {
    for (let i = 1; i < ids.length; i++) {
      if (Number(ids[i].split('.')[2]) < Number(ids[i - 1].split('.')[2])) scrambled.add(ids[i]);
    }
  });
}

let tierChecked = 0;
specConcepts.forEach((spec, id) => {
  const enc = encoded.get(id);
  if (!enc) return;
  if (!spec.tier) { errors.push(`${id}: no "Learners need to…" heading governs it in the extract — the parser lost the heading.`); return; }
  if (LAYOUT_SCRAMBLES[id]) return;
  tierChecked++;
  if (enc.tier !== spec.tier) {
    errors.push(`${id}: encoded as "${enc.tier}" but the specification files it under "Learners need to ${spec.tier === 'do' ? 'be able to' : spec.tier}" — the teaching-load model reads this.`);
  }
});

/* An exemption must name a real scramble, and a scramble must be exempted or
   asserted. Neither half can be quietly skipped. */
Object.keys(LAYOUT_SCRAMBLES).forEach(id => {
  if (!specConcepts.has(id)) {
    errors.push(`${id} is listed as a layout scramble and is not in the specification at all.`);
  } else if (!scrambled.has(id)) {
    errors.push(`${id} is exempted from the tier check as a layout scramble, but it is printed in sequence — the exemption is hiding a real disagreement.`);
  }
  if (!String(LAYOUT_SCRAMBLES[id] || '').trim()) errors.push(`${id}: layout-scramble exemption carries no reason.`);
});
scrambled.forEach(id => {
  if (!LAYOUT_SCRAMBLES[id]) {
    errors.push(`${id} is printed out of sequence in the extract, so the heading above it may not govern it. Establish which tier is right and record it in LAYOUT_SCRAMBLES with the reason.`);
  }
});
if (scrambled.size) {
  notes.push(`Two-column layout scrambles found and accounted for: ${[...scrambled].join(', ')}.`);
}

/* ── 3. Text ─────────────────────────────────────────────────────────────── */
const STOP = new Set(['that', 'this', 'with', 'from', 'their', 'there', 'which', 'when', 'into', 'they', 'them', 'have', 'been', 'were', 'each', 'both', 'other', 'about', 'these', 'those', 'such', 'than', 'then', 'over', 'under', 'being', 'where', 'while', 'whether']);
function contentWords(s) {
  return [...new Set(String(s).toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/)
    .filter(w => w.length >= 5 && !STOP.has(w)))];
}
const overlaps = [];
specConcepts.forEach((spec, id) => {
  const enc = encoded.get(id);
  if (!enc) return;
  const want = contentWords(spec.text);
  if (want.length < 3) return;                     // too short to measure meaningfully
  const hay = String(enc.text + ' ' + (enc.indicative || []).join(' ') + ' ' + (enc.note || '')).toLowerCase();
  const hit = want.filter(w => hay.includes(w)).length;
  const ratio = hit / want.length;
  overlaps.push(ratio);
  if (ratio < OVERLAP_FLOOR) {
    errors.push(`${id}: the encoded text shares only ${(ratio * 100).toFixed(0)}% of the specification's content words — this looks like a different concept.\n     spec:    "${spec.text.slice(0, 90)}"\n     encoded: "${enc.text.slice(0, 90)}"`);
  } else if (ratio < OVERLAP_WARN) {
    warnings.push(`${id}: encoded text shares ${(ratio * 100).toFixed(0)}% of the specification's content words — check it is a rewording and not a drift.\n     spec:    "${spec.text.slice(0, 90)}"\n     encoded: "${enc.text.slice(0, 90)}"`);
  }
});
if (overlaps.length) {
  const mean = overlaps.reduce((a, b) => a + b, 0) / overlaps.length;
  notes.push(`Wording overlap with the specification: mean ${(mean * 100).toFixed(0)}%, floor ${(Math.min(...overlaps) * 100).toFixed(0)}% (hard fail below ${OVERLAP_FLOOR * 100}%).`);
}

/* ── 4. Structure ────────────────────────────────────────────────────────── */
specConcepts.forEach((spec, id) => {
  const enc = encoded.get(id);
  if (!enc) return;
  if (spec.topic && enc.topic !== spec.topic) errors.push(`${id}: encoded under topic ${enc.topic}, specification puts it under ${spec.topic}.`);
  if (spec.outcome && enc.outcome !== spec.outcome) errors.push(`${id}: encoded under outcome ${enc.outcome}, specification puts it under ${spec.outcome}.`);
});

const encodedTopics = new Map();
unit.outcomes.forEach(o => o.topics.forEach(t => encodedTopics.set(t.id, t.title)));
specTopics.forEach((title, id) => {
  if (!encodedTopics.has(id)) { errors.push(`Topic area ${id} ("${title}") is in the specification and not in the encoding.`); return; }
  const a = tidy(title).toLowerCase().replace(/[^a-z0-9 ]/g, '');
  const b = tidy(encodedTopics.get(id)).toLowerCase().replace(/[^a-z0-9 ]/g, '');
  if (a !== b) errors.push(`Topic area ${id} title differs.\n     spec:    "${title}"\n     encoded: "${encodedTopics.get(id)}"`);
});
encodedTopics.forEach((title, id) => {
  if (!specTopics.has(id)) errors.push(`Topic area ${id} ("${title}") is encoded and is not in the specification.`);
});

specOutcomes.forEach((title, n) => {
  const enc = unit.outcomes.find(o => o.n === n);
  if (!enc) { errors.push(`Outcome ${n} ("${title}") is in the specification and not in the encoding.`); return; }
  const a = tidy(title).toLowerCase().replace(/[^a-z0-9 ]/g, '');
  const b = tidy(enc.title).toLowerCase().replace(/[^a-z0-9 ]/g, '');
  if (a !== b) errors.push(`Outcome ${n} title differs.\n     spec:    "${title}"\n     encoded: "${enc.title}"`);
});

/* ── 5. Weightings, against the unit's own test specification table ──────── */
/* The table is the LAST place in the unit that lists all nine outcomes with a
   percentage, so it is found by searching from the end of the FAPS pages
   rather than by line number. */
{
  const tail = sliceScope(specRaw, CFG.tableStart, CFG.tableEnd);
  if (!tail) {
    errors.push(`${U}: could not find the test specification table — outcome weightings are unverified.`);
  } else {
    const text = tail.join('\n');
    let found = 0;
    unit.outcomes.forEach(o => {
      /* The outcome title, then a percentage, with the PDF free to wrap
         between them. Anchored on the encoded title, which section 4 has
         already proved matches the specification's. */
      const esc = o.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+');
      const m = new RegExp(esc + '\\s*(\\d+)%', 'i').exec(text.replace(/\n/g, ' '));
      if (!m) { errors.push(`${U} outcome ${o.n}: no weighting found for it in the test specification table.`); return; }
      found++;
      if (Number(m[1]) !== o.weighting) {
        errors.push(`${U} outcome ${o.n} is encoded at ${o.weighting}% and the test specification table says ${m[1]}%.`);
      }
    });
    if (found) notes.push(`${U}: outcome weightings checked against the test specification table: ${found}/${unit.outcomes.length}.`);

    const dur = /(\d)\s*hours?\s*(\d+)\s*minutes/i.exec(text);
    if (dur) {
      const mins = Number(dur[1]) * 60 + Number(dur[2]);
      if (mins !== unit.assessment.durationMinutes) {
        errors.push(`${U}: assessment duration is encoded as ${unit.assessment.durationMinutes} minutes and the test specification says ${dur[0]} (${mins}).`);
      } else {
        notes.push(`${U}: assessment duration confirmed: ${dur[0]} = ${mins} minutes.`);
      }
    } else {
      warnings.push(`${U}: could not read the assessment duration out of the test specification table.`);
    }
    /* THE MARKING TYPE, BOTH WAYS. The old rule only fired when the table said
       "Computer marked" and the encoding did not, so a unit the table calls
       partially human marked could be encoded as anything at all — and MATS is
       exactly that unit. Normalising both sides and requiring the encoded
       phrase to appear in the table catches the encoding being wrong whatever
       the table happens to say. */
    const flat = t => String(t).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
    const wantMark = flat(unit.assessment.marking);
    if (!wantMark) {
      errors.push(`${U}: no marking type encoded.`);
    } else if (!flat(text).includes(wantMark)) {
      errors.push(`${U}: the encoding says the unit is "${unit.assessment.marking}" and the test specification table does not say that.`);
    } else {
      notes.push(`${U}: marking type confirmed as "${unit.assessment.marking}".`);
    }
  }
}

/* ── 6. Exclusions ───────────────────────────────────────────────────────── */
specConcepts.forEach((spec, id) => {
  const enc = encoded.get(id);
  if (!enc) return;
  const encEx = enc.excluded || [];
  if (spec.excluded.length && !encEx.length) {
    errors.push(`${id}: the specification excludes "${spec.excluded.join('; ')}" and the encoding records no exclusion. Exclusions are the cheapest teaching savings available.`);
  }
  if (!spec.excluded.length && encEx.length) {
    errors.push(`${id}: the encoding excludes "${encEx.join('; ')}" and the specification excludes nothing here — material would be withheld for no reason.`);
  }
  if (spec.excluded.length && encEx.length) {
    const a = contentWords(spec.excluded.join(' '));
    const hay = encEx.join(' ').toLowerCase();
    const hit = a.filter(w => hay.includes(w)).length;
    if (a.length && hit / a.length < OVERLAP_FLOOR) {
      errors.push(`${id}: the encoded exclusion does not match the specification's.\n     spec:    "${spec.excluded.join('; ')}"\n     encoded: "${encEx.join('; ')}"`);
    }
  }
});
{
  const n = [...specConcepts.values()].filter(c => c.excluded.length).length;
  notes.push(`${U}: concept-level exclusions in the specification: ${n}, all encoded.`);
}

/* ── 7. Indicative content ───────────────────────────────────────────────── */
/* Counts, and they must match exactly in both directions.
   
   The load model is `base + indicative.length`, so a bullet dropped sizes that
   concept's lesson too small and a bullet invented sizes it too large. The
   first draft of this encoding did both: it split the inline, comma-separated
   lists at 2.3.1 and 2.4.3 into eight and five bullets while leaving the
   identical construction at 3.2.2 and 6.1.1 inline, which silently moved 13
   units of teaching load onto two concepts. Requiring equality is what caught
   it, and equality is the only rule that keeps the encoding's structure the
   specification's rather than the author's. */
let bulletSpec = 0, bulletEnc = 0;
specConcepts.forEach((spec, id) => {
  const enc = encoded.get(id);
  if (!enc) return;
  const want = spec.bullets.length, got = (enc.indicative || []).length;
  bulletSpec += want; bulletEnc += got;
  if (got === want) return;
  const missed = spec.bullets.filter(b => !JSON.stringify(enc.indicative || []).toLowerCase().includes(b.slice(0, 12).toLowerCase()));
  errors.push(got < want
    ? `${id}: ${got} indicative bullets encoded against ${want} in the specification — the teaching load is understated by ${want - got}. Not encoded: "${missed.join('; ').slice(0, 120)}".`
    : `${id}: ${got} indicative bullets encoded against ${want} in the specification — the load is overstated by ${got - want}. Where the specification runs a list inline after a colon, it belongs in the concept text, not split into bullets.`);
});
notes.push(`${U}: indicative bullets: ${bulletSpec} in the specification, ${bulletEnc} encoded.`);

  return { concepts: specConcepts.size, topics: specTopics.size, outcomes: specOutcomes.size };
}

console.log(`${BOLD}AAT Level 3 syllabus fidelity — against the published specification${RESET}\n`);
const tallies = UNITS.map(cfg => ({ cfg, n: checkUnit(cfg) }));

/* ── Report ──────────────────────────────────────────────────────────────── */
notes.forEach(n => console.log(`  ${DIM}${n}${RESET}`));
console.log();
if (warnings.length) {
  console.log(`${YELLOW}${BOLD}── WARNINGS (${warnings.length})${RESET}`);
  warnings.forEach(w => console.log(`  ${YELLOW}⚠${RESET}  ${w}`));
  console.log();
}
if (errors.length) {
  console.log(`${RED}${BOLD}── ERRORS (${errors.length})${RESET}`);
  errors.forEach(e => console.log(`  ${RED}✗${RESET}  ${e}`));
  console.log(`\n${RED}${BOLD}── The encoded syllabus disagrees with the specification.${RESET}\n`);
  process.exit(1);
}
const summary = tallies.map(t => `${t.cfg.key.toUpperCase()} ${t.n.concepts}/${t.n.topics}/${t.n.outcomes}`).join(', ');
console.log(`${GREEN}${BOLD}── ${tallies.map(t => t.cfg.key.toUpperCase()).join(' and ')} match the published specification ✓${RESET}  ${DIM}(concepts/topics/outcomes — ${summary})${RESET}\n`);
