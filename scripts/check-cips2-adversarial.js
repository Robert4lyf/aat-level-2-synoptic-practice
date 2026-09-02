#!/usr/bin/env node
'use strict';

/*
 * Guard the guards. The normal CIPS checks prove the current spine passes; this
 * script proves representative corruptions are actually rejected. It performs
 * mutations in a temporary copy only and expects each relevant gate to fail.
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const cp = require('child_process');
const ROOT = path.join(__dirname, '..');

const FILES = [
  'cips2-syllabus.js',
  'cips2-l2m1-syllabus.js',
  'cips2-l2m2-syllabus.js',
  'cips2-l2m3-syllabus.js',
  'cips2-l2m4-syllabus.js',
  'cips2-l2m5-syllabus.js',
  'docs/reference/cips-l2-source-manifest.json',
  'scripts/check-cips2-syllabus.js',
  'scripts/check-cips2-syllabus-fidelity.js'
];

function copyFixture() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'cips2-adversarial-'));
  for (const rel of FILES) {
    const dest = path.join(dir, rel);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(path.join(ROOT, rel), dest);
  }
  return dir;
}

function mutate(rel, fn) {
  const dir = copyFixture();
  const file = path.join(dir, rel);
  const before = fs.readFileSync(file, 'utf8');
  const after = fn(before);
  if (after === before) throw new Error(`mutation for ${rel} changed nothing`);
  fs.writeFileSync(file, after);
  return dir;
}

function expectRejected(name, dir, gate, expectedText) {
  const result = cp.spawnSync(process.execPath, [path.join(dir, 'scripts', gate)], {
    cwd: dir,
    encoding: 'utf8'
  });
  const output = `${result.stdout || ''}\n${result.stderr || ''}`;
  if (result.status === 0) throw new Error(`${name}: mutation passed ${gate}`);
  if (expectedText && !output.includes(expectedText)) {
    throw new Error(`${name}: gate failed, but not for the expected reason (${expectedText})`);
  }
  console.log(`  \x1b[32m✓\x1b[0m ${name}`);
}

console.log('\x1b[1mCIPS Level 2 adversarial gate review\x1b[0m\n');

let d = mutate('cips2-l2m3-syllabus.js', s => s.replace(
  'Know the stakeholders in procurement and supply',
  'Know stakeholders in procurement and supply'
));
expectRejected('official heading drift is detected', d, 'check-cips2-syllabus-fidelity.js', 'heading fingerprint');

d = mutate('cips2-l2m2-syllabus.js', s => s.replace(
  '            "Business-to-business and business-to-consumer e-commerce"\n',
  ''
).replace(
  '            "Evaluating information published on supplier/customer websites",\n',
  '            "Evaluating information published on supplier/customer websites"\n'
));
expectRejected('a dropped indicative-content position is detected', d, 'check-cips2-syllabus.js', 'sourceBulletCount');

d = mutate('cips2-l2m1-syllabus.js', s => s.replace('"questionCount": 72', '"questionCount": 70'));
expectRejected('assessment-shape drift is detected', d, 'check-cips2-syllabus-fidelity.js', 'question count');

d = mutate('cips2-l2m5-syllabus.js', s => s.replace(
  ',\n    "caveat": "The published specification also states 36 questions in total, but the syllabus has three learning outcomes: 3 × 9 accounts for only 27 questions. Preserve the source discrepancy; do not infer the missing allocation."',
  ''
));
expectRejected('the L2M5 source caveat cannot be silently removed', d, 'check-cips2-syllabus.js', 'assessment.caveat');

d = mutate('cips2-l2m5-syllabus.js', s => s.replace('"tier": "know"', '"tier": "understand"'));
expectRejected('learning-outcome tier drift is detected', d, 'check-cips2-syllabus-fidelity.js', 'outcome tiers');

d = mutate('cips2-l2m2-syllabus.js', s => s.replace('"id": "L2M2-1.2"', '"id": "L2M2-1.1"'));
expectRejected('duplicate criterion identifiers are detected', d, 'check-cips2-syllabus.js', 'duplicate assessment-criterion id');

d = mutate('cips2-syllabus.js', s => s.replace('totalQualificationTimeHours: 180', 'totalQualificationTimeHours: 181'));
expectRejected('qualification-level metadata drift is detected', d, 'check-cips2-syllabus-fidelity.js', 'TQT');

console.log('\n  \x1b[32m✓\x1b[0m all seven representative corruptions were rejected\n');
