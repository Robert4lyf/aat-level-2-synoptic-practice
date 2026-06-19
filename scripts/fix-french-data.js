#!/usr/bin/env node
/**
 * One-time fix script for french-data.js.
 * Applies three categories of fixes:
 *   1. Expand suspiciously short explanations.
 *   2. Add lesson metadata to clinic questions.
 *   3. Rebalance MCQ / listen answer-position distribution.
 *
 * Usage: node scripts/fix-french-data.js
 * Then:  node scripts/validate-french-data.js
 */

'use strict';

const fs   = require('fs');
const path = require('path');

const dataPath = path.resolve(__dirname, '..', 'french-data.js');
const src = fs.readFileSync(dataPath, 'utf8');

// ── Load data into Node (no browser needed) ──────────────────────────────────
const patched = src.replace(/window\.(\w+)\s*=/g, 'global.$1 =');
new Function('global', patched)(global);

// Deep-clone so we never mutate the eval'd globals
const QUESTIONS = JSON.parse(JSON.stringify(global.FR_QUESTIONS || []));

// ── 1. Expand short explanations ─────────────────────────────────────────────
const EXP_FIXES = {
  'fr-132': "l'hiver = winter. Four seasons: le printemps (spring), l'été (summer), l'automne (autumn), l'hiver (winter). Use 'en' before seasons: en hiver, en été, en automne — but au printemps (exception).",
  'fr-138': "à + le contracts to 'au': je vais au cinéma. à + la = à la; à + les = aux; à + l' = à l'. These contractions are mandatory — you must never write 'à le'.",
  'fr-139': "de + le contracts to 'du': le livre du professeur. de + la = de la; de + les = des; de + l' = de l'. These contractions are mandatory — never write 'de le'.",
  'fr-149': "Use 'où' for place or time relative clauses: le pays où je vis (the country where I live); le jour où il est né (the day he was born). 'Dont' = of which/whose; 'qui' = who (subject); 'que' = which/that (object).",
  'fr-151': "à + les contracts to 'aux': elle parle aux enfants. All mandatory contractions: à + le = au, à + les = aux, de + le = du, de + les = des. Writing 'à les' or 'de les' is always incorrect in French.",
  'fr-168': "être conjugation: je suis, tu es, il/elle est, nous sommes, vous êtes, ils/elles sont. 'Nous sommes' uses the irregular stem 'somm-', very different from the infinitive être. être = to be.",
  'fr-170': "prendre has an irregular past participle: pris. Related verbs: apprendre → appris, comprendre → compris, surprendre → surpris. All use avoir as auxiliary: j'ai pris, elle a compris, nous avons appris.",
  'fr-193': "la tête = the head. Key body vocabulary: la tête (head), le bras (arm), la main (hand), la jambe (leg), le pied (foot), l'œil / les yeux (eye/eyes), l'oreille (ear), le nez (nose), la bouche (mouth).",
};

let expFixed = 0;
QUESTIONS.forEach(q => {
  if (EXP_FIXES[q.id]) {
    q.exp = EXP_FIXES[q.id];
    expFixed++;
  }
});
console.log(`[1] Fixed ${expFixed} short explanations.`);

// ── 2. Add lesson field to clinic questions ──────────────────────────────────
// Convention: lesson = topic (e.g. "fr-clinic-gender")
let clinicFixed = 0;
QUESTIONS.forEach(q => {
  if (q.topic && q.topic.startsWith('fr-clinic') && !q.lesson) {
    q.lesson = q.topic;
    clinicFixed++;
  }
});
console.log(`[2] Added lesson field to ${clinicFixed} clinic questions.`);

// ── 3. Rebalance answer-position distribution ────────────────────────────────
/**
 * Move the correct option from currentAns to targetAns by splicing it out and
 * reinserting at the new position. Distractors keep their relative order.
 */
function rotateAnswer(opts, currentAns, targetAns) {
  if (currentAns === targetAns) return { opts, ans: currentAns };
  const o = [...opts];
  const correct = o.splice(currentAns, 1)[0];
  o.splice(targetAns, 0, correct);
  return { opts: o, ans: targetAns };
}

function rebalanceType(questions, type) {
  const items = questions.filter(
    q => q.type === type
      && Array.isArray(q.opts) && q.opts.length === 4
      && typeof q.ans === 'number' && q.ans >= 0 && q.ans <= 3,
  );
  const total = items.length;
  if (total === 0) return;

  // Calculate per-position targets (as equal as possible)
  const base = Math.floor(total / 4);
  const rem  = total % 4;
  // Give the extra slots to positions that currently have the smallest counts
  const counts  = [0, 0, 0, 0];
  items.forEach(q => counts[q.ans]++);
  const targets = [base, base, base, base];
  // Assign +1 to the positions with the largest deficit first
  const deficits = targets.map((t, i) => t - counts[i]);
  for (let r = 0; r < rem; r++) {
    const pos = deficits.indexOf(Math.max(...deficits));
    targets[pos]++;
    deficits[pos]--;
  }

  const before = [...counts];
  let moved = 0;

  for (const q of items) {
    if (counts[q.ans] > targets[q.ans]) {
      // Find the position that needs the most answers right now
      let targetPos = -1;
      let maxNeed = 0;
      for (let i = 0; i < 4; i++) {
        const need = targets[i] - counts[i];
        if (i !== q.ans && need > maxNeed) {
          maxNeed = need;
          targetPos = i;
        }
      }
      if (targetPos !== -1) {
        const orig = q.ans;
        const result = rotateAnswer(q.opts, q.ans, targetPos);
        q.opts = result.opts;
        q.ans  = result.ans;
        counts[orig]--;
        counts[targetPos]++;
        moved++;
      }
    }
  }

  console.log(`[3] ${type}: before=${JSON.stringify(before)}, after=${JSON.stringify(counts)}, targets=${JSON.stringify(targets)}, rotated=${moved}`);
}

rebalanceType(QUESTIONS, 'mcq');
rebalanceType(QUESTIONS, 'listen');

// ── Write back ────────────────────────────────────────────────────────────────
// Preserve everything outside the FR_QUESTIONS block verbatim.
const qStart = src.indexOf('window.FR_QUESTIONS = [');
const qEnd   = src.indexOf('\n];', qStart) + 3; // skip past the \n];

const before = src.slice(0, qStart);
const after  = src.slice(qEnd);

const qLines      = QUESTIONS.map(q => '  ' + JSON.stringify(q));
const newQSection = `window.FR_QUESTIONS = [\n${qLines.join(',\n')}\n];`;

fs.writeFileSync(dataPath, before + newQSection + after, 'utf8');

console.log(`\nWrote ${QUESTIONS.length} questions to french-data.js.`);
console.log('Verify with: node scripts/validate-french-data.js');
