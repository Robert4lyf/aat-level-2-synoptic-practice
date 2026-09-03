#!/usr/bin/env node
/**
 * No throwaway file is tracked in this repository.
 *
 * THE BUG THIS GUARDS. PR #236 committed `.cips-hunt.tmp.js` and
 * `.cips-hunt2.tmp.js` — two ad-hoc Playwright probes written to hunt for bugs
 * on the CIPS page. Nothing imports them, nothing runs them, and they hardcode
 * `/home/user/aat-level-2-synoptic-practice` as their document root, so they
 * cannot work anywhere else. They reached `main`. Wrangler does not upload
 * dotfiles, so these two almost certainly stayed off the public site — but the
 * name is what saved us there, not any rule, and the next one need not start
 * with a dot.
 *
 * WHY A CHECK AND NOT JUST A .gitignore RULE. An ignore rule only stops a file
 * that is not already tracked: `git add` on a tracked path, or an explicit
 * `git add -f`, walks straight past it, and the file that started this was
 * added before any rule existed. This asserts the tracked set itself.
 *
 * WHAT COUNTS AS SCRATCH. Only names that carry their disposability in them:
 * `.tmp.js`, `.tmp.mjs`, `.bak`, `.orig`, and anything under a `tmp/` or
 * `scratch/` directory. Deliberately narrow — a check that guesses at
 * "unreferenced" would flag data files the service worker loads by name and
 * teach people to ignore it.
 *
 * Run: node scripts/check-no-scratch-files.js   (exit 1 on any failure)
 */
'use strict';
const cp = require('child_process');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const RED = '\x1b[31m', GREEN = '\x1b[32m', DIM = '\x1b[2m', BOLD = '\x1b[1m', RESET = '\x1b[0m';

const SCRATCH = [
  { re: /\.tmp\.(js|mjs|cjs|json|css|html)$/i, why: 'a .tmp. file — a scratch script or a half-written draft' },
  { re: /\.(bak|orig|rej)$/i,                  why: 'an editor or merge leftover' },
  { re: /(^|\/)(tmp|scratch)\//i,              why: 'inside a tmp/ or scratch/ directory' }
];

console.log(`${BOLD}No scratch files tracked${RESET}\n`);

let tracked;
try {
  tracked = cp.execSync('git ls-files -z', { cwd: ROOT, encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 })
    .split('\0').filter(Boolean);
} catch (e) {
  console.log(`  ${RED}✗${RESET} could not list tracked files: ${e.message}\n`);
  process.exit(1);
}

const bad = [];
for (const f of tracked) {
  const hit = SCRATCH.find(s => s.re.test(f));
  if (hit) bad.push({ f, why: hit.why });
}

console.log(`  ${DIM}${tracked.length} tracked files scanned${RESET}\n`);

if (bad.length) {
  console.log(`${RED}${BOLD}${bad.length} scratch file${bad.length === 1 ? '' : 's'} tracked${RESET}`);
  bad.forEach(b => console.log(`  ${RED}✗${RESET} ${b.f} — ${b.why}. Delete it, or rename it into scripts/ as a real check.`));
  console.log('');
  process.exit(1);
}
console.log(`${GREEN}${BOLD}no throwaway file is tracked ✓${RESET}\n`);
process.exit(0);
