#!/usr/bin/env node
/**
 * Validation script for french-data.js
 * Run: node scripts/validate-french-data.js
 * Exit 1 on hard errors; exit 0 if only warnings.
 */

'use strict';

const fs = require('fs');
const path = require('path');

// ── Load the data file without a browser ────────────────────────────────────
const dataPath = path.resolve(__dirname, '..', 'french-data.js');
const src = fs.readFileSync(dataPath, 'utf8');

// Strip the window.X = assignments so we can evaluate the values in Node.
const patched = src
  .replace(/window\.(\w+)\s*=/g, 'global.$1 =');

// Use the Function constructor so globals are set on the `global` object.
// eslint-disable-next-line no-new-func
new Function('global', patched)(global);

const TOPICS     = global.FR_TOPICS     || [];
const QUESTIONS  = global.FR_QUESTIONS  || [];
const LEARN_PATH = global.FR_LEARN_PATH || [];

// ── Reporting helpers ────────────────────────────────────────────────────────
const errors   = [];
const warnings = [];

function err(msg)  { errors.push(msg); }
function warn(msg) { warnings.push(msg); }

// ── Known topic IDs ──────────────────────────────────────────────────────────
const topicIds = new Set(TOPICS.map(t => t.id));
const clinicTopicIds = new Set(TOPICS.filter(t => t.section === 'clinic').map(t => t.id));

// ── Collect all lesson IDs from FR_LEARN_PATH ────────────────────────────────
const knownLessonIds = new Set();
for (const level of LEARN_PATH) {
  for (const lesson of (level.lessons || [])) {
    if (lesson.id) knownLessonIds.add(lesson.id);
  }
}

// ── PLACEHOLDER / SILLY OPTION PATTERNS ─────────────────────────────────────
const PLACEHOLDER_PATTERNS = [
  /^(option [a-d]|answer [a-d]|choice [0-9]|placeholder|lorem|foo|bar|baz|test|xxx|aaa)$/i,
  /^\d+$/,  // purely numeric (rare but suspicious in French MCQ)
];

function looksLikePlaceholder(str) {
  return PLACEHOLDER_PATTERNS.some(re => re.test(str.trim()));
}

// ── TEXT SIMILARITY (Levenshtein, capped) ────────────────────────────────────
function levenshtein(a, b) {
  if (a === b) return 0;
  const la = a.length, lb = b.length;
  if (la === 0) return lb;
  if (lb === 0) return la;
  if (Math.abs(la - lb) > 10) return 99; // quick bail-out
  const row = Array.from({length: lb + 1}, (_, i) => i);
  for (let i = 1; i <= la; i++) {
    let prev = i;
    for (let j = 1; j <= lb; j++) {
      const val = a[i-1] === b[j-1] ? row[j-1] : Math.min(row[j-1], row[j], prev) + 1;
      row[j-1] = prev;
      prev = val;
    }
    row[lb] = prev;
  }
  return row[lb];
}

function normalise(str) {
  return str.toLowerCase().replace(/[''`]/g, "'").replace(/\s+/g, ' ').trim();
}

// ── 1. DUPLICATE IDs ─────────────────────────────────────────────────────────
const seenIds = new Map();
for (const q of QUESTIONS) {
  if (!q.id) {
    err(`Question without an id: ${JSON.stringify(q).slice(0, 80)}`);
    continue;
  }
  if (seenIds.has(q.id)) {
    err(`Duplicate ID: ${q.id} (first at index ${seenIds.get(q.id)})`);
  } else {
    seenIds.set(q.id, QUESTIONS.indexOf(q));
  }
}

// ── Per-question checks ──────────────────────────────────────────────────────
const mcqAnswerPositions = [0, 0, 0, 0]; // tally answer positions for MCQ
const topicCounts    = {};
const typeCounts     = {};
const normTexts      = []; // for near-duplicate detection

for (const q of QUESTIONS) {
  const id = q.id || '(no-id)';
  const isClinic = clinicTopicIds.has(q.topic);

  // ── 2. Missing / invalid topic ────────────────────────────────────────────
  if (!q.topic) {
    err(`[${id}] Missing topic`);
  } else if (!topicIds.has(q.topic)) {
    err(`[${id}] Unknown topic "${q.topic}"`);
  }

  // ── 3. Missing / invalid lesson ──────────────────────────────────────────
  if (isClinic) {
    // Clinic items are allowed to omit the lesson field entirely.
    if (q.lesson && !knownLessonIds.has(q.lesson) && !q.lesson.startsWith('fr-clinic')) {
      warn(`[${id}] Clinic item has unrecognised lesson "${q.lesson}"`);
    }
  } else {
    if (!q.lesson) {
      err(`[${id}] Missing lesson`);
    } else if (!knownLessonIds.has(q.lesson)) {
      warn(`[${id}] Lesson "${q.lesson}" not found in FR_LEARN_PATH`);
    }
  }

  // ── 4. Missing question text (except scenario — text is inside parts) ─────
  const isScenario = q.type === 'scenario';
  if (!isScenario && !q.q) {
    err(`[${id}] Missing question text (q)`);
  }
  if (isScenario && !q.parts) {
    err(`[${id}] Scenario has no parts array`);
  }

  // ── 5. Missing / empty explanation ───────────────────────────────────────
  if (!q.exp || q.exp.trim() === '') {
    err(`[${id}] Missing or empty explanation (exp)`);
  }

  // ── 15. Suspiciously short explanation ───────────────────────────────────
  if (q.exp && q.exp.trim().length < 20) {
    warn(`[${id}] Suspiciously short explanation: "${q.exp}"`);
  }

  // ── Count by topic and type ───────────────────────────────────────────────
  topicCounts[q.topic] = (topicCounts[q.topic] || 0) + 1;
  typeCounts[q.type]   = (typeCounts[q.type]   || 0) + 1;

  // ── Type-specific checks ──────────────────────────────────────────────────
  switch (q.type) {

    case 'mcq': {
      // ── 6. MCQ answer index out of range ─────────────────────────────────
      if (!Array.isArray(q.opts) || q.opts.length === 0) {
        err(`[${id}] MCQ missing opts array`);
        break;
      }
      if (typeof q.ans !== 'number' || q.ans < 0 || q.ans >= q.opts.length) {
        err(`[${id}] MCQ ans=${q.ans} is out of range (opts length ${q.opts.length})`);
      } else {
        mcqAnswerPositions[q.ans] = (mcqAnswerPositions[q.ans] || 0) + 1;
      }
      // ── 16. Placeholder-like answer options ───────────────────────────────
      // Numeric-only options are valid for number/time/stats topics — skip those.
      const isNumberTopic = /nums|num$|chiffres/i.test(q.topic || '') || /digit|number/i.test(q.q || '');
      for (const opt of q.opts) {
        if (!isNumberTopic && looksLikePlaceholder(opt)) {
          warn(`[${id}] Suspicious MCQ option: "${opt}"`);
        }
      }
      break;
    }

    case 'gapfill': {
      // ── 7. Gapfill answer index out of range ──────────────────────────────
      if (!Array.isArray(q.gaps) || q.gaps.length === 0) {
        err(`[${id}] Gapfill missing gaps array`);
        break;
      }
      for (let i = 0; i < q.gaps.length; i++) {
        const gap = q.gaps[i];
        if (!Array.isArray(gap.options) || gap.options.length === 0) {
          err(`[${id}] gap[${i}] missing options array`);
        }
        if (typeof gap.answer !== 'number' || gap.answer < 0 || gap.answer >= (gap.options || []).length) {
          err(`[${id}] gap[${i}] answer=${gap.answer} out of range (options length ${(gap.options||[]).length})`);
        }
      }
      if (!q.template) {
        err(`[${id}] Gapfill missing template`);
      }
      break;
    }

    case 'dragdrop': {
      // ── 8. Drag/drop pairs with missing left/right ────────────────────────
      if (!Array.isArray(q.pairs) || q.pairs.length === 0) {
        err(`[${id}] Dragdrop missing pairs array`);
        break;
      }
      for (let i = 0; i < q.pairs.length; i++) {
        const p = q.pairs[i];
        if (!p.left  || String(p.left).trim()  === '') err(`[${id}] pair[${i}] missing left`);
        if (!p.right || String(p.right).trim() === '') err(`[${id}] pair[${i}] missing right`);
      }
      break;
    }

    case 'listen': {
      // ── 9. Listening: missing audio or prompt ─────────────────────────────
      if (!q.audio || q.audio.trim() === '') {
        err(`[${id}] Listen question missing audio text`);
      }
      if (!q.q || q.q.trim() === '') {
        err(`[${id}] Listen question missing prompt (q)`);
      }
      // Standard listen is MCQ-like: check opts/ans
      if (!Array.isArray(q.opts) || q.opts.length === 0) {
        err(`[${id}] Listen question missing opts array`);
      }
      if (typeof q.ans !== 'number' || q.ans < 0 || q.ans >= (q.opts || []).length) {
        err(`[${id}] Listen question ans=${q.ans} out of range`);
      }
      break;
    }

    case 'listen-typed': {
      // ── 9. (continued) listen-typed ───────────────────────────────────────
      if (!q.audio || q.audio.trim() === '') {
        err(`[${id}] Listen-typed question missing audio text`);
      }
      if (!q.q || q.q.trim() === '') {
        err(`[${id}] Listen-typed question missing prompt (q)`);
      }
      if (!q.ans || String(q.ans).trim() === '') {
        err(`[${id}] Listen-typed question missing ans`);
      }
      break;
    }

    case 'wordorder': {
      // ── 10. Word-order: missing words or invalid target order ─────────────
      if (!Array.isArray(q.words) || q.words.length === 0) {
        err(`[${id}] Wordorder missing words array`);
      }
      if (!Array.isArray(q.answer) || q.answer.length === 0) {
        err(`[${id}] Wordorder missing answer array`);
      } else {
        // Every token in the answer must appear in words
        const wordBag = [...(q.words || [])];
        for (const token of q.answer) {
          const idx = wordBag.indexOf(token);
          if (idx === -1) {
            err(`[${id}] Wordorder answer token "${token}" not present in words pool`);
          } else {
            wordBag.splice(idx, 1); // consume one copy
          }
        }
      }
      break;
    }

    case 'typed': {
      if (!q.ans || String(q.ans).trim() === '') {
        err(`[${id}] Typed question missing ans`);
      }
      break;
    }

    case 'scenario': {
      // ── 17. Scenario schema check ─────────────────────────────────────────
      if (!Array.isArray(q.parts)) {
        err(`[${id}] Scenario missing parts array`);
        break;
      }
      for (let i = 0; i < q.parts.length; i++) {
        const part = q.parts[i];
        if (!part.q || part.q.trim() === '') err(`[${id}] part[${i}] missing q`);
        if (!Array.isArray(part.opts) || part.opts.length === 0) {
          err(`[${id}] part[${i}] missing opts`);
        }
        if (typeof part.ans !== 'number' || part.ans < 0 || part.ans >= (part.opts || []).length) {
          err(`[${id}] part[${i}] ans=${part.ans} out of range`);
        }
      }
      break;
    }

    default: {
      // ── 17. Unrecognised type ─────────────────────────────────────────────
      warn(`[${id}] Unrecognised question type: "${q.type}"`);
    }
  }

  // ── 15. Near-identical question text (long texts only) ───────────────────
  if (q.q && q.q.length >= 40) {
    normTexts.push({ id, text: normalise(q.q) });
  }
}

// ── 11. MCQ answer distribution ─────────────────────────────────────────────
const totalMcq = mcqAnswerPositions.reduce((a, b) => a + b, 0);

// ── 14. Near-duplicate detection (strings >= 40 chars, tight threshold) ──────
for (let i = 0; i < normTexts.length; i++) {
  for (let j = i + 1; j < normTexts.length; j++) {
    const a = normTexts[i].text;
    const b = normTexts[j].text;
    if (a === b) {
      warn(`Identical question text: [${normTexts[i].id}] and [${normTexts[j].id}]: "${a.slice(0, 70)}"`);
      continue;
    }
    // Only run Levenshtein when lengths are comparable and strings are medium length
    const maxLen = Math.max(a.length, b.length);
    if (maxLen <= 150 && Math.abs(a.length - b.length) <= 5) {
      const dist = levenshtein(a, b);
      // Require at least 2 edits AND ratio < 5% to reduce template-pattern noise
      if (dist >= 2 && dist / maxLen < 0.05) {
        warn(`Near-identical question text (${dist} edits): [${normTexts[i].id}] and [${normTexts[j].id}]: "${a.slice(0, 60)}"`);
      }
    }
  }
}

// ── Topic imbalance (warning only) ───────────────────────────────────────────
const counts = Object.values(topicCounts);
const avgCount = counts.reduce((a, b) => a + b, 0) / counts.length;
for (const [topic, count] of Object.entries(topicCounts)) {
  if (count < 3) warn(`Topic "${topic}" has only ${count} question(s)`);
  if (count > avgCount * 5) warn(`Topic "${topic}" has ${count} questions — may be over-represented (avg ${avgCount.toFixed(1)})`);
}

// ── Print report ─────────────────────────────────────────────────────────────
const BOLD  = '\x1b[1m';
const RED   = '\x1b[31m';
const YEL   = '\x1b[33m';
const GRN   = '\x1b[32m';
const CYN   = '\x1b[36m';
const RST   = '\x1b[0m';

console.log(`\n${BOLD}════════════════════════════════════════════════════════${RST}`);
console.log(`${BOLD} French Data Validator — french-data.js${RST}`);
console.log(`${BOLD}════════════════════════════════════════════════════════${RST}`);
console.log(`\nLoaded ${QUESTIONS.length} questions across ${TOPICS.length} topics.`);

// Summary tables
console.log(`\n${CYN}${BOLD}── Question count by type ──────────────────────────${RST}`);
for (const [type, count] of Object.entries(typeCounts).sort((a,b) => b[1]-a[1])) {
  console.log(`  ${type.padEnd(14)} ${count}`);
}

console.log(`\n${CYN}${BOLD}── Question count by topic ─────────────────────────${RST}`);
for (const [topic, count] of Object.entries(topicCounts).sort((a,b) => b[1]-a[1])) {
  const name = (TOPICS.find(t => t.id === topic) || {}).name || topic;
  console.log(`  ${topic.padEnd(22)} ${String(count).padStart(4)}  ${name}`);
}

console.log(`\n${CYN}${BOLD}── MCQ correct-answer position distribution ────────${RST}`);
if (totalMcq > 0) {
  mcqAnswerPositions.forEach((n, i) => {
    const pct = ((n / totalMcq) * 100).toFixed(1);
    const bar = '█'.repeat(Math.round(n / totalMcq * 30));
    console.log(`  Position ${i} (${pct.padStart(5)}%)  ${bar} ${n}`);
  });
  // Flag heavy bias
  for (let i = 0; i < mcqAnswerPositions.length; i++) {
    const pct = mcqAnswerPositions[i] / totalMcq;
    if (pct > 0.45) warn(`MCQ answer position ${i} is used ${(pct*100).toFixed(1)}% of the time — consider redistributing`);
    if (pct < 0.10 && mcqAnswerPositions[i] > 0) warn(`MCQ answer position ${i} is used only ${(pct*100).toFixed(1)}% of the time`);
  }
}

// Errors
if (errors.length > 0) {
  console.log(`\n${RED}${BOLD}── ERRORS (${errors.length}) ──────────────────────────────────${RST}`);
  for (const e of errors) console.log(`  ${RED}✖${RST} ${e}`);
} else {
  console.log(`\n${GRN}${BOLD}── ERRORS: none ✓${RST}`);
}

// Warnings
if (warnings.length > 0) {
  console.log(`\n${YEL}${BOLD}── WARNINGS (${warnings.length}) ────────────────────────────────${RST}`);
  for (const w of warnings) console.log(`  ${YEL}⚠${RST}  ${w}`);
} else {
  console.log(`\n${GRN}${BOLD}── WARNINGS: none ✓${RST}`);
}

console.log(`\n${BOLD}════════════════════════════════════════════════════════${RST}`);
console.log(`Result: ${errors.length} error(s), ${warnings.length} warning(s)\n`);

process.exit(errors.length > 0 ? 1 : 0);
