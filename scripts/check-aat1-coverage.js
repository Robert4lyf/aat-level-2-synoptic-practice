#!/usr/bin/env node
/**
 * AAT Level 1 syllabus coverage check.
 *
 * The Level 3 sibling of this script (check-aat3-coverage.js) explains the
 * reasoning at length; this is the same idea applied to Bookkeeping
 * Fundamentals, with two jobs.
 *
 * 1. INTEGRITY of aat1-syllabus.js itself — that the encoded tree is internally
 *    consistent, that scope-item numbering is contiguous within each topic, and
 *    that outcome weightings total 100. An error here means the spine is wrong
 *    and everything tagged against it inherits the fault.
 *
 * 2. COVERAGE of the outcomes declared shipped. This RATCHETS PER OUTCOME, so a
 *    part-built module does not paint the build red for its whole life. Level 1
 *    ships complete, so all five outcomes are listed.
 *
 * WHAT THIS PROVES, AND WHAT IT DOES NOT
 *
 * It proves every scope item in a shipped outcome has teaching material pointing
 * at it, and that no lesson claims a tag the specification does not contain — a
 * real risk, since AAT amended items 1.2.1, 3.2.3 and 3.3.2 across published
 * versions. It does NOT prove the teaching is any good: one lesson tagged with
 * forty items would satisfy a naive check, hence the concentration limit below.
 * Quality is check-aat1-quality.js's job.
 *
 * Run via `npm test`.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const RED = '\x1b[31m', GREEN = '\x1b[32m', YELLOW = '\x1b[33m';
const BOLD = '\x1b[1m', DIM = '\x1b[2m', RESET = '\x1b[0m';

const S = require(path.join(ROOT, 'aat1-syllabus.js'));

/* Outcomes whose content is declared complete. This list is the ratchet — add
   an entry only when the material actually ships. */
const OUTCOMES_SHIPPED = [
  { unit: 'bkfn', outcome: 1 },
  { unit: 'bkfn', outcome: 2 },
  { unit: 'bkfn', outcome: 3 },
  { unit: 'bkfn', outcome: 4 },
  { unit: 'bkfn', outcome: 5 },
];

const errors = [];
const warnings = [];
const notes = [];

/* ── 1. Syllabus integrity ───────────────────────────────────────────────── */
/* Level 1's specification uses only two verb framings, unlike Level 3's three:
   "learners need to know" and "learners need to be able to". A stray
   'understand' here would mean the transcription borrowed Level 3's vocabulary. */
const VALID_TIERS = ['know', 'do'];

Object.keys(S.SYLLABUS.units).forEach(key => {
  const u = S.SYLLABUS.units[key];
  const where = u.code;

  if (!u.assessment || !u.assessment.durationMinutes) errors.push(`${where}: assessment duration missing.`);
  if (!u.unitReference) warnings.push(`${where}: no unit reference number recorded.`);

  const weightTotal = u.outcomes.reduce((s, o) => s + (o.weighting || 0), 0);
  if (weightTotal !== 100) errors.push(`${where}: outcome weightings total ${weightTotal}%, expected 100%.`);

  /* The specification states the qualification is ungraded, so asserting a pass
     mark would be inventing one. PASS_MARK_NOTE exists to say so in words. */
  if (u.assessment.passMark != null) {
    errors.push(`${where}: a passMark is recorded, but the specification publishes none for an ungraded qualification — use PASS_MARK_NOTE instead.`);
  }

  const seenTopics = new Set();
  u.outcomes.forEach(o => {
    if (!o.title) errors.push(`${where} LO${o.n}: no title.`);
    if (!o.topics || !o.topics.length) { errors.push(`${where} LO${o.n}: no topic areas.`); return; }

    o.topics.forEach(t => {
      if (seenTopics.has(t.id)) errors.push(`${where}: duplicate topic area ${t.id}.`);
      seenTopics.add(t.id);
      if (t.id.split('.')[0] !== String(o.n)) {
        errors.push(`${where}: topic ${t.id} is filed under LO${o.n} but its number says otherwise.`);
      }
      if (!t.concepts || !t.concepts.length) { errors.push(`${where} ${t.id}: no scope items.`); return; }

      /* Numbering must run contiguously from 1. A gap means something was
         dropped in transcription, which is exactly how a syllabus silently
         loses a requirement. */
      const nums = t.concepts.map(c => Number(c.id.split('.')[2]));
      nums.forEach((n, i) => {
        if (n !== i + 1) errors.push(`${where} ${t.id}: scope-item numbering is not contiguous — expected ${t.id}.${i + 1}, found ${t.concepts[i].id}.`);
      });

      t.concepts.forEach(c => {
        if (c.id.indexOf(t.id + '.') !== 0) errors.push(`${where}: scope item ${c.id} does not belong to topic ${t.id}.`);
        if (!c.text) errors.push(`${where} ${c.id}: no description.`);
        if (VALID_TIERS.indexOf(c.tier) === -1) errors.push(`${where} ${c.id}: tier "${c.tier}" is not one of ${VALID_TIERS.join('/')}.`);
        if (c.indicative && !Array.isArray(c.indicative)) errors.push(`${where} ${c.id}: indicative content must be an array.`);
        if (c.excluded && !Array.isArray(c.excluded)) errors.push(`${where} ${c.id}: excluded must be an array.`);
      });
    });
  });
});

/* ── 2. Coverage of shipped outcomes ─────────────────────────────────────── */
let lessons = [];
const contentFile = path.join(ROOT, 'aat1-learn-data.js');
if (fs.existsSync(contentFile)) {
  const content = require(contentFile);
  (content.AAT1_LEARN_PATH || []).forEach(group => {
    (group.lessons || []).forEach(l => lessons.push(l));
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
  const n = (l.criteria || []).length;
  if (n > 6) warnings.push(`${l.id} claims ${n} scope items — that is a lot for one lesson; consider splitting it.`);
});

/* The practice bank is tagged too, and a bogus tag there is the same defect. */
const practiceFile = path.join(ROOT, 'aat1-practice-data.js');
let practice = [];
if (fs.existsSync(practiceFile)) {
  const p = require(practiceFile);
  practice = (p.AAT1_PRACTICE && p.AAT1_PRACTICE.QUESTIONS) || [];
  practice.forEach(q => {
    (q.criteria || []).forEach(tag => {
      if (!allTags.has(tag)) errors.push(`practice ${q.id}: claims "${tag}", which is not in the syllabus.`);
    });
  });
}

OUTCOMES_SHIPPED.forEach(m => {
  const unit = S.SYLLABUS.units[m.unit];
  if (!unit) { errors.push(`OUTCOMES_SHIPPED names unknown unit "${m.unit}".`); return; }
  const cs = S.concepts(m.unit).filter(c => c.outcome === m.outcome);
  if (!cs.length) { errors.push(`OUTCOMES_SHIPPED names ${unit.code} LO${m.outcome}, which has no scope items.`); return; }
  const missing = cs.filter(c => !tagged.has(c.tag));
  if (missing.length) {
    errors.push(`${unit.code} LO${m.outcome} is declared shipped but ${missing.length} of ${cs.length} scope items have no lesson: ${missing.slice(0, 6).map(c => c.id).join(', ')}${missing.length > 6 ? '…' : ''}`);
  }
});

/* Practice coverage is reported rather than enforced. A bank that reaches every
   scope item would be enormous; what matters is that every OUTCOME is
   practisable, since the picker offers a run per outcome. */
if (practice.length) {
  const los = new Set(practice.map(q => q.lo));
  S.SYLLABUS.units.bkfn.outcomes.forEach(o => {
    if (!los.has(o.n)) errors.push(`the practice bank has no questions for Outcome ${o.n}, but the picker offers a run for it.`);
  });
}

/* ── Report ──────────────────────────────────────────────────────────────── */
Object.keys(S.SYLLABUS.units).forEach(k => {
  const s = S.unitSummary(k);
  notes.push(`${s.code}: ${s.outcomes} outcomes · ${s.topics} topic areas · ${s.concepts} scope items ` +
             `(${s.doConcepts} "be able to") · ${s.indicative} indicative items · ${s.exclusions} exclusions · teaching load ${s.load}`);
});
notes.push(`Spec version ${S.SYLLABUS.specVersion} (${S.SYLLABUS.specPublished}), QN ${S.SYLLABUS.qualificationNumber}.`);
notes.push(OUTCOMES_SHIPPED.length
  ? `Outcomes declared complete: ${OUTCOMES_SHIPPED.map(m => 'LO' + m.outcome).join(', ')}.`
  : 'No outcomes declared complete yet — coverage ratchet is empty.');
if (lessons.length) notes.push(`${lessons.length} Level 1 lessons, covering ${tagged.size} scope items.`);
if (practice.length) notes.push(`${practice.length} practice questions across ${new Set(practice.map(q => q.lo)).size} outcomes.`);

console.log(`${BOLD}AAT Level 1 syllabus coverage${RESET}\n`);
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
