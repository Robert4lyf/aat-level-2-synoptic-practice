#!/usr/bin/env node
/**
 * Every criterion in a ready unit is taught by something, and nothing teaches
 * toward a criterion that does not exist.
 *
 * Content accumulates in the order it was interesting to write. Left alone that
 * produces a unit which reads well, covers the parts that were fun, and has a
 * hole nobody notices until a player hits it — and by then there is a lot of
 * material sitting on top of the gap.
 *
 * So guitar-syllabus.js states what the unit owes, this compares it against
 * what the lessons claim, and the two have to agree in both directions:
 *
 *   - a criterion claimed by no lesson is a hole
 *   - a lesson claiming a criterion the syllabus does not list is a typo, or a
 *     criterion that was renamed and left a dangling reference behind
 *
 * Only units marked `ready` are required to be complete. An unwritten unit is a
 * known gap, not a failure — but its criteria still have to exist, so the
 * dangling-reference half applies everywhere.
 *
 * Run: node scripts/check-guitar-coverage.js   (exit 1 on any failure)
 */

'use strict';

const S = require('../guitar-syllabus.js');
const D = require('../guitar-learn-data.js');

const RED = '\x1b[31m', GREEN = '\x1b[32m', DIM = '\x1b[2m', BOLD = '\x1b[1m', RESET = '\x1b[0m';
const errors = [];
const notes = [];

const allIds = new Set(S.CRITERIA.map(c => c.id));
const ready = S.readyUnits();
const readyIds = new Set(ready.map(u => u.id));

if (!ready.length) {
  errors.push('no unit is marked ready, so this gate is checking nothing. ' +
              'Set ready: true on a unit once its lessons are written.');
}

/* ── Claims → syllabus ─────────────────────────────────────────────────── */
const claimed = new Map();               // criterion id → [lesson ids]
for (const lesson of D.LESSONS) {
  if (!Array.isArray(lesson.criteria)) {
    errors.push(`${lesson.id} has no criteria array. A lesson that claims nothing cannot be checked ` +
                `for coverage; write criteria: [] deliberately if it really teaches no criterion.`);
    continue;
  }
  if (!S.unit(lesson.unit)) {
    errors.push(`${lesson.id} belongs to unit "${lesson.unit}", which guitar-syllabus.js does not list.`);
  }
  for (const id of lesson.criteria) {
    if (!allIds.has(id)) {
      errors.push(`${lesson.id} claims criterion "${id}", which does not exist. ` +
                  `Either it was renamed in the syllabus, or this is a typo teaching toward nothing.`);
      continue;
    }
    const c = S.criterion(id);
    if (c.unit !== lesson.unit) {
      errors.push(`${lesson.id} is in unit ${lesson.unit} but claims ${id}, which belongs to ${c.unit}. ` +
                  `A criterion taught outside its own unit will not be found by anyone following the order.`);
    }
    if (!claimed.has(id)) claimed.set(id, []);
    claimed.get(id).push(lesson.id);
  }
}

/* ── Syllabus → claims, for ready units only ───────────────────────────── */
for (const unit of ready) {
  const want = S.criteriaFor(unit.id);
  if (!want.length) {
    errors.push(`unit ${unit.id} is marked ready but the syllabus lists no criteria for it.`);
    continue;
  }
  const missing = want.filter(c => !claimed.has(c.id));
  if (missing.length) {
    errors.push(`unit ${unit.id} (${unit.title}) is marked ready with ${missing.length} ` +
                `criterion/criteria taught by no lesson:`);
    for (const m of missing) errors.push(`    ${m.id} — ${m.text}`);
  } else {
    const lessons = D.lessonsFor(unit.id);
    notes.push(`${unit.id} ${unit.title}: ${want.length} criteria across ${lessons.length} lessons, all claimed.`);
  }
}

/* A lesson in a ready unit that claims nothing is almost always an oversight;
   an empty criteria array elsewhere is a deliberate "this teaches no criterion"
   and is left alone. */
for (const lesson of D.LESSONS) {
  if (readyIds.has(lesson.unit) && Array.isArray(lesson.criteria) && !lesson.criteria.length) {
    errors.push(`${lesson.id} is in ready unit ${lesson.unit} and claims no criterion.`);
  }
}

/* Duplicated coverage is not an error — two lessons may approach one criterion
   from different sides — but it is worth seeing, because it is also what a
   copy-pasted lesson looks like. */
for (const [id, lessons] of claimed) {
  if (lessons.length > 1) notes.push(`${id} is claimed by ${lessons.length}: ${lessons.join(', ')}.`);
}

const unwritten = S.UNITS.filter(u => !u.ready);
if (unwritten.length) {
  notes.push(`Not yet written: ${unwritten.map(u => u.id).join(', ')} ` +
             `(${S.CRITERIA.filter(c => !readyIds.has(c.unit)).length} criteria waiting).`);
}

console.log(`${BOLD}guitar syllabus coverage${RESET}\n`);
notes.forEach(n => console.log(`  ${DIM}${n}${RESET}`));
console.log('');
if (errors.length) {
  errors.forEach(e => console.log(e.startsWith('    ') ? `  ${DIM}${e}${RESET}` : `  ${RED}✗${RESET}  ${e}`));
  console.log(`\n${RED}${BOLD}${errors.length} failure(s).${RESET}\n`);
  process.exit(1);
}
console.log(`  ${GREEN}✓  every criterion in a ready unit is taught, and every claim resolves${RESET}\n`);
