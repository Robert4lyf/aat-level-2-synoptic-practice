#!/usr/bin/env node
/**
 * CI runs every check that `npm test` runs.
 *
 * This gate exists because the alternative failed. The workflow lists its steps
 * individually so a red build names the check that broke, rather than burying it
 * in one long `npm test` step. That is worth having — but it means the list in
 * .github/workflows/ci.yml and the list in package.json are two copies of the
 * same thing, and copies drift.
 *
 * They did. The guitar module's engine tests, playability gate and handedness
 * gate were written across five separate steps of work, added to `npm test` each
 * time, and never added here. Every "CI green" reported over those five steps
 * covered the pre-guitar checks only. The gates were real and ran locally; the
 * workflow simply never called them.
 *
 * So: parse both lists, and fail when the workflow is missing one. Scripts that
 * deliberately do not belong in CI go in EXEMPT, with the reason written down,
 * so "not in CI" is always a decision rather than an oversight.
 *
 * Run: node scripts/check-workflow-coverage.js   (exit 1 on any failure)
 */

'use strict';

const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

const RED = '\x1b[31m', GREEN = '\x1b[32m', DIM = '\x1b[2m', BOLD = '\x1b[1m', RESET = '\x1b[0m';

/* Scripts intentionally outside CI, and why. Empty today — every gate we have
   runs. Anything added here needs a reason a reader can weigh, not a label. */
const EXEMPT = {
  // 'check:something': 'reason it cannot run on a runner'
};

const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
const workflow = fs.readFileSync(path.join(ROOT, '.github/workflows/ci.yml'), 'utf8');

/* What `npm test` actually runs, as script files. Reading the chained command
   rather than the script names means a check invoked directly — bypassing its
   own npm alias — is still counted. */
const testCmd = pkg.scripts.test || '';
const testFiles = [...testCmd.matchAll(/node\s+(scripts\/[\w.-]+\.js)/g)].map(m => m[1]);

/* Which npm script each file belongs to, so the error can name the fix. */
const scriptFor = {};
for (const [name, cmd] of Object.entries(pkg.scripts)) {
  if (name === 'test') continue;
  const m = /node\s+(scripts\/[\w.-]+\.js)/.exec(cmd);
  if (m) scriptFor[m[1]] = name;
}

/* What CI runs. Matches `npm run x`, `npm test`, and bare `node scripts/x.js`. */
const ciScripts = new Set([...workflow.matchAll(/npm run ([\w:-]+)/g)].map(m => m[1]));
const ciFiles = new Set([...workflow.matchAll(/node\s+(scripts\/[\w.-]+\.js)/g)].map(m => m[1]));
const ciRunsNpmTest = /run:\s*npm(?:\s+run)?\s+test\s*$/m.test(workflow);

const errors = [];
const notes = [];

if (!testFiles.length) {
  errors.push('parsed no scripts out of `npm test` — this gate is checking nothing. ' +
              'The test script format probably changed.');
}

const uncovered = [];
for (const file of testFiles) {
  const name = scriptFor[file];
  if (ciRunsNpmTest) continue;
  if (ciFiles.has(file)) continue;
  if (name && ciScripts.has(name)) continue;
  if (name && EXEMPT[name]) { notes.push(`${name} is exempt: ${EXEMPT[name]}`); continue; }
  uncovered.push({ file, name });
}

if (uncovered.length) {
  errors.push(`${uncovered.length} check(s) run in \`npm test\` but never in CI:`);
  for (const u of uncovered) {
    errors.push(`    ${u.file}${u.name ? `  →  add a step running \`npm run ${u.name}\`` : ''}`);
  }
  errors.push('  A check that does not run in CI protects nothing on a pull request.');
}

/* The reverse: a CI step naming a script that no longer exists fails the build
   for the wrong reason, and reads as a real failure until someone digs in. */
for (const name of ciScripts) {
  if (!pkg.scripts[name]) errors.push(`CI runs \`npm run ${name}\`, which package.json does not define.`);
}
for (const file of ciFiles) {
  if (!fs.existsSync(path.join(ROOT, file))) errors.push(`CI runs ${file}, which does not exist.`);
}

/* Every script file in scripts/ that looks like a gate should be in `npm test`.
   This is the third way a gate goes missing: written, committed, never wired. */
const onDisk = fs.readdirSync(path.join(ROOT, 'scripts'))
  .filter(f => /^(check|validate|test)-.*\.js$/.test(f))
  .map(f => 'scripts/' + f);
const orphans = onDisk.filter(f => !testFiles.includes(f));
if (orphans.length) {
  errors.push(`${orphans.length} gate(s) exist in scripts/ but are not in \`npm test\`: ${orphans.join(', ')}`);
}

console.log(`${BOLD}CI coverage${RESET}\n`);
console.log(`  ${DIM}\`npm test\` runs ${testFiles.length} checks; the workflow runs ${ciScripts.size}.${RESET}`);
notes.forEach(n => console.log(`  ${DIM}${n}${RESET}`));
console.log('');
if (errors.length) {
  errors.forEach(e => console.log(e.startsWith('    ') ? `  ${DIM}${e}${RESET}` : `  ${RED}✗${RESET}  ${e}`));
  console.log(`\n${RED}${BOLD}CI does not run everything it should.${RESET}\n`);
  process.exit(1);
}
console.log(`  ${GREEN}✓  every check in \`npm test\` runs in CI${RESET}\n`);
