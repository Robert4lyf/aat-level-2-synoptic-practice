#!/usr/bin/env node
/**
 * AAT Level 3 syllabus coverage check.
 *
 * Two jobs.
 *
 * 1. INTEGRITY of aat3-syllabus.js itself — that the encoded tree is internally
 *    consistent and that outcome weightings total 100. An error here means the
 *    spine is wrong, and everything tagged against it inherits the fault.
 *
 * 2. COVERAGE of the modules declared complete. This RATCHETS PER MODULE: only
 *    outcomes listed in MODULES_SHIPPED are required to be fully covered. A
 *    check that demanded all 93 key concepts from day one would be red for the
 *    entire life of the project, which teaches nobody anything.
 *
 * What this proves, and what it does not:
 *
 *   It proves every part of the syllabus in a shipped module has teaching
 *   material pointing at it, and that no lesson claims a tag that does not
 *   exist. It does NOT prove the teaching is any good — one lesson tagged with
 *   forty concepts would satisfy a naive check, so there is a concentration
 *   limit below. Quality needs review and outcome data, not a validator.
 *
 * Run via `npm test`.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const RED = '\x1b[31m', GREEN = '\x1b[32m', YELLOW = '\x1b[33m';
const BOLD = '\x1b[1m', DIM = '\x1b[2m', RESET = '\x1b[0m';

const S = require(path.join(ROOT, 'aat3-syllabus.js'));

/* Outcomes whose content is declared complete. Add an entry only when the
   module actually ships; this list is the ratchet. */
const MODULES_SHIPPED = [
  { unit: 'faps', outcome: 1 },
  { unit: 'faps', outcome: 2 },
  { unit: 'faps', outcome: 3 },
  { unit: 'faps', outcome: 4 },
  { unit: 'tpfb', outcome: 1 },
  { unit: 'tpfb', outcome: 2 },
  { unit: 'tpfb', outcome: 3 },
  { unit: 'tpfb', outcome: 4 },
  { unit: 'tpfb', outcome: 5 },
];

const errors = [];
const warnings = [];
const notes = [];

/* ── 1. Syllabus integrity ───────────────────────────────────────────────── */
const VALID_TIERS = ['know', 'understand', 'do'];

Object.keys(S.SYLLABUS.units).forEach(key => {
  const u = S.SYLLABUS.units[key];
  const where = u.code;

  if (!u.financeAct && key === 'tpfb') errors.push(`${where}: no financeAct recorded — tax figures cannot be version-scoped.`);
  if (!u.assessment || !u.assessment.durationMinutes) errors.push(`${where}: assessment duration missing.`);

  const weightTotal = u.outcomes.reduce((s, o) => s + (o.weighting || 0), 0);
  if (weightTotal !== 100) errors.push(`${where}: outcome weightings total ${weightTotal}%, expected 100%.`);

  const seenTopics = new Set();
  u.outcomes.forEach(o => {
    if (!o.title) errors.push(`${where} LO${o.n}: no title.`);
    if (!o.topics || !o.topics.length) errors.push(`${where} LO${o.n}: no topic areas.`);

    o.topics.forEach(t => {
      if (seenTopics.has(t.id)) errors.push(`${where}: duplicate topic area ${t.id}.`);
      seenTopics.add(t.id);
      if (t.id.split('.')[0] !== String(o.n)) {
        errors.push(`${where}: topic ${t.id} is filed under LO${o.n} but its number says otherwise.`);
      }
      if (!t.concepts || !t.concepts.length) { errors.push(`${where} ${t.id}: no key concepts.`); return; }

      /* Concept numbering must be contiguous from 1 — a gap means something was
         dropped in transcription, which is exactly how a syllabus silently
         loses a criterion. */
      const nums = t.concepts.map(c => Number(c.id.split('.')[2]));
      nums.forEach((n, i) => {
        if (n !== i + 1) errors.push(`${where} ${t.id}: concept numbering is not contiguous — expected ${t.id}.${i + 1}, found ${t.concepts[i].id}.`);
      });

      t.concepts.forEach(c => {
        if (c.id.indexOf(t.id + '.') !== 0) errors.push(`${where}: concept ${c.id} does not belong to topic ${t.id}.`);
        if (!c.text) errors.push(`${where} ${c.id}: no description.`);
        if (VALID_TIERS.indexOf(c.tier) === -1) errors.push(`${where} ${c.id}: tier "${c.tier}" is not one of ${VALID_TIERS.join('/')}.`);
        if (c.indicative && !Array.isArray(c.indicative)) errors.push(`${where} ${c.id}: indicative content must be an array.`);
        if (c.excluded && !Array.isArray(c.excluded)) errors.push(`${where} ${c.id}: excluded must be an array.`);
      });
    });
  });
});

/* ── 2. Coverage of shipped modules ──────────────────────────────────────── */
/* Lesson data is tagged with `criteria: ['TPFB-2.3.11', …]`. Until the first
   Level 3 content file exists there is nothing to check, which is correct —
   the ratchet starts empty. */
/* Loaded with require() rather than evaluated in a bare sandbox: the content
   files depend on aat3-tax-data.js, and resolving that dependency is the whole
   point — figures live there, not inline.

   Every unit's file, from the one list in scripts/lib/aat3-content.js. Naming
   aat3-learn-data.js here read TPFB and said nothing about FAPS, which is a
   coverage check that reports green on an uncovered unit. */
const CONTENT = require('./lib/aat3-content.js');
const { groups: contentGroups } = CONTENT.load();
const lessons = CONTENT.lessons(contentGroups);

/* Every authored group must name a unit and an outcome the syllabus knows.

   The path is rendered by walking the SYLLABUS outcomes and finding the group
   for each, which is what lets an unwritten outcome say so rather than vanish.
   The same loop silently drops a group whose outcome matches nothing — and a
   first draft of the FAPS file put its orientation lesson in a group numbered
   0, so the lesson existed, passed every other check, and never appeared on
   any screen. */
contentGroups.forEach(g => {
  const where = `${g.unit || '(no unit)'} group "${g.outcomeTitle || g.title || '?'}"`;
  const unit = S.SYLLABUS.units[g.unit];
  if (!unit) {
    errors.push(`${where}: names unit "${g.unit}", which is not in aat3-syllabus.js. Its lessons would never be rendered.`);
    return;
  }
  const o = unit.outcomes.find(x => x.n === g.outcome);
  if (!o) {
    errors.push(`${where}: names outcome ${g.outcome}, which ${unit.code} does not have. The path is driven by the syllabus, so its ${(g.lessons || []).length} lesson(s) would never appear on any screen.`);
    return;
  }
  if (g.weighting != null && g.weighting !== o.weighting) {
    errors.push(`${where}: declares weighting ${g.weighting}% and the syllabus says ${o.weighting}%.`);
  }
});

/* Two groups for the same outcome is the same fault wearing a different hat:
   the path finds the first and the second is unreachable. */
{
  const seen = new Map();
  contentGroups.forEach(g => {
    const k = `${g.unit}/${g.outcome}`;
    if (seen.has(k)) {
      errors.push(`${k} has two authored groups — the path renders the first and the ${(g.lessons || []).length} lesson(s) in the second are unreachable.`);
    }
    seen.set(k, g);
  });
}

const allTags = new Set();
Object.keys(S.SYLLABUS.units).forEach(k => S.concepts(k).forEach(c => allTags.add(c.tag)));

const tagged = new Map();           // tag → [lesson ids]
lessons.forEach(l => {
  (l.criteria || []).forEach(tag => {
    if (!allTags.has(tag)) {
      errors.push(`${l.id}: claims "${tag}", which is not in the syllabus. A spec revision may have renumbered it.`);
      return;
    }
    if (!tagged.has(tag)) tagged.set(tag, []);
    tagged.get(tag).push(l.id);
  });
  /* A single lesson claiming a large slice of an outcome is the failure mode a
     naive coverage check waves through. */
  const n = (l.criteria || []).length;
  if (n > 8) warnings.push(`${l.id} claims ${n} key concepts — that is a lot for one lesson; consider splitting it.`);
});

MODULES_SHIPPED.forEach(m => {
  const unit = S.SYLLABUS.units[m.unit];
  if (!unit) { errors.push(`MODULES_SHIPPED names unknown unit "${m.unit}".`); return; }
  const cs = S.concepts(m.unit).filter(c => c.outcome === m.outcome);
  if (!cs.length) { errors.push(`MODULES_SHIPPED names ${unit.code} LO${m.outcome}, which has no concepts.`); return; }
  const missing = cs.filter(c => !tagged.has(c.tag));
  if (missing.length) {
    errors.push(`${unit.code} LO${m.outcome} is declared shipped but ${missing.length} of ${cs.length} key concepts have no lesson: ${missing.slice(0, 6).map(c => c.id).join(', ')}${missing.length > 6 ? '…' : ''}`);
  }
});

/* ── Report ──────────────────────────────────────────────────────────────── */
Object.keys(S.SYLLABUS.units).forEach(k => {
  const s = S.unitSummary(k);
  notes.push(`${s.code}: ${s.outcomes} outcomes · ${s.topics} topic areas · ${s.concepts} key concepts ` +
             `(${s.doConcepts} "be able to") · ${s.indicative} indicative items · ${s.exclusions} exclusions · teaching load ${s.load}`);
});
notes.push(`Spec version ${S.SYLLABUS.specVersion} (${S.SYLLABUS.specPublished}).`);
notes.push(MODULES_SHIPPED.length
  ? `Modules declared complete: ${MODULES_SHIPPED.map(m => m.unit.toUpperCase() + ' LO' + m.outcome).join(', ')}.`
  : 'No modules declared complete yet — coverage ratchet is empty, which is expected until the first module ships.');
if (lessons.length) notes.push(`${lessons.length} Level 3 lessons, covering ${tagged.size} key concepts.`);

console.log(`${BOLD}AAT Level 3 syllabus coverage${RESET}\n`);
notes.forEach(n => console.log(`  ${DIM}${n}${RESET}`));
console.log('');

if (warnings.length) {
  console.log(`${YELLOW}${BOLD}── WARNINGS (${warnings.length}) ──${RESET}`);
  warnings.forEach(w => console.log(`  ${YELLOW}⚠${RESET}  ${w}`));
  console.log('');
}
if (errors.length) {
  console.log(`${RED}${BOLD}── FAILURES (${errors.length}) ──${RESET}`);
  errors.forEach(e => console.log(`  ${RED}✗${RESET}  ${e}`));
  console.log('');
  process.exit(1);
}
console.log(`${GREEN}${BOLD}── Syllabus integrity and coverage OK ✓${RESET}\n`);
