#!/usr/bin/env node
/**
 * Guard the guard. check-sticky-chrome.js passes; that is not evidence.
 *
 * Every defect listed here is one this app actually shipped, or the obvious way
 * to reintroduce one. Each is reapplied to a throwaway copy of the tree, and
 * check-sticky-chrome.js must fail on it. A mutant that survives means the
 * check is watching something other than what its comment claims.
 *
 * The copy matters. An earlier version of this discipline mutated the working
 * tree and restored it with `git checkout --`, which quietly destroyed an
 * uncommitted edit. Nothing here touches the tree it was run from.
 *
 * Run: node scripts/check-sticky-chrome-adversarial.js
 */
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const cp = require('child_process');
const ROOT = path.join(__dirname, '..');
const RED = '\x1b[31m', GREEN = '\x1b[32m', DIM = '\x1b[2m', BOLD = '\x1b[1m', YEL = '\x1b[33m', RESET = '\x1b[0m';

try { require('playwright'); } catch (e) {
  console.log(`${BOLD}Sticky chrome — adversarial${RESET}\n`);
  if (process.env.REQUIRE_PLAYWRIGHT) { console.log(`  ${RED}✗${RESET} Playwright required: ${e.message}`); process.exit(1); }
  console.log(`  ${YEL}⚠${RESET} Playwright unavailable — skipping.\n`); process.exit(0);
}

/* Everything the gate loads in a browser. node_modules is linked rather than
   copied — it is the only part big enough to make this slow. */
const COPY = [
  'index.html', 'cips2.html', 'styles.css', 'story-styles.css',
  'aat1-styles.css', 'aat3-styles.css', 'cips2-styles.css',
  'chrome-offset.js', 'nav-history.js', 'package.json',
  'scripts/check-sticky-chrome.js'
];
const COPY_GLOB = [/^aat\d?-.*\.js$/, /^cips2-.*\.js$/, /^guitar-.*\.js$/, /^(app|data|skills|learn-data|spaced|sound|celebrate|calculator|question-grid|story-data|story-proto|progress-backup|progress-sync|sync-config|formula-engine)\.js$/,
  /^(french|delf|lsf|code-route|story)-?data?\.js$/, /^.*-data\.js$/, /^manifest\.webmanifest$/, /^.*\.png$/, /^.*\.svg$/];

function fixture() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'sticky-adversarial-'));
  fs.mkdirSync(path.join(dir, 'scripts'), { recursive: true });
  for (const rel of COPY) fs.copyFileSync(path.join(ROOT, rel), path.join(dir, rel));
  for (const name of fs.readdirSync(ROOT)) {
    if (name === 'node_modules' || name.startsWith('.')) continue;
    const src = path.join(ROOT, name);
    if (!fs.statSync(src).isFile()) continue;
    if (COPY.includes(name)) continue;
    if (COPY_GLOB.some(re => re.test(name))) fs.copyFileSync(src, path.join(dir, name));
  }
  fs.symlinkSync(path.join(ROOT, 'node_modules'), path.join(dir, 'node_modules'), 'dir');
  return dir;
}

function edit(dir, rel, from, to) {
  const p = path.join(dir, rel);
  const s = fs.readFileSync(p, 'utf8');
  if (s.indexOf(from) < 0) throw new Error(`fixture ${rel} no longer contains: ${from.slice(0, 70)}`);
  fs.writeFileSync(p, s.replace(from, to));
}

/* Each mutant is the defect, restated. `why` is what shipped. */
const MUTANTS = [
  {
    name: 'Level 3 context bar back at top: 0 (the unclickable back button)',
    apply: d => edit(d, 'aat3-styles.css',
      'margin: 0 -20px; position: sticky; top: var(--chrome-h, 0px); z-index: 6;\n  display: flex; align-items: center; gap: var(--a3-3);',
      'margin: 0 -20px; position: sticky; top: 0; z-index: 6;\n  display: flex; align-items: center; gap: var(--a3-3);')
  },
  {
    name: 'Level 3 lesson bar back at top: 0',
    apply: d => edit(d, 'aat3-styles.css',
      'margin: 0 -20px; padding: var(--a3-3) var(--a3-5);\n  position: sticky; top: var(--chrome-h, 0px); z-index: 6;',
      'margin: 0 -20px; padding: var(--a3-3) var(--a3-5);\n  position: sticky; top: 0; z-index: 6;')
  },
  {
    name: 'Level 3 progress rule back at its old 58px (hidden behind its own bar)',
    apply: d => edit(d, 'aat3-styles.css',
      'position: sticky; top: calc(var(--chrome-h, 0px) + 64px); z-index: 6;',
      'position: sticky; top: calc(var(--chrome-h, 0px) + 58px); z-index: 6;')
  },
  {
    name: 'Level 1 context bar back at top: 0',
    apply: d => edit(d, 'aat1-styles.css',
      '.a1-ctx {\n  margin: 0 -20px; position: sticky; top: var(--chrome-h, 0px); z-index: 6;',
      '.a1-ctx {\n  margin: 0 -20px; position: sticky; top: 0; z-index: 6;')
  },
  {
    name: 'Level 1 progress rule back at its old 52px',
    apply: d => edit(d, 'aat1-styles.css',
      'position: sticky; top: calc(var(--chrome-h, 0px) + 58px); z-index: 5;',
      'position: sticky; top: calc(var(--chrome-h, 0px) + 52px); z-index: 5;')
  },
  {
    /* CIPS's bar is now the shared app header, so the way to break it is the
       way it can be broken on any page: stop it being pinned. Everything the
       gate measures on this page is measured from its bottom edge. */
    name: 'the CIPS app bar stops being pinned to the top',
    apply: d => edit(d, 'styles.css', 'header {\n  background: var(--header-bg);',
      'header {\n  position: static !important;\n  background: var(--header-bg);')
  },
  {
    name: 'CIPS context bar back at top: 0',
    apply: d => edit(d, 'cips2-styles.css',
      '.c2-ctx {\n  position: sticky; top: var(--chrome-h, 0px); z-index: 6;',
      '.c2-ctx {\n  position: sticky; top: 0; z-index: 6;')
  },
  {
    name: 'CIPS context bar translucent again (prose showing through it)',
    apply: d => edit(d, 'cips2-styles.css',
      '  background: var(--c2-wash);\n  border-bottom: 1px solid var(--c2-line);\n}\n.c2-ctx-back {',
      '  background: color-mix(in srgb, var(--c2-wash) 88%, transparent);\n  border-bottom: 1px solid var(--c2-line);\n}\n.c2-ctx-back {')
  },
  {
    name: 'CIPS context bar hides its own title on phones, as the old bar did',
    apply: d => edit(d, 'cips2-styles.css',
      '@media (max-width: 760px) {\n',
      '@media (max-width: 760px) {\n  .c2-ctx-t { display:none; }\n')
  },
  {
    name: 'chrome-offset.js never loaded, so --chrome-h is never published',
    apply: d => edit(d, 'index.html', '  <script src="chrome-offset.js"></script>\n', '')
  },
  {
    name: 'chrome-offset.js publishes a constant instead of a measurement',
    apply: d => edit(d, 'chrome-offset.js',
      "var h = Math.ceil(el.getBoundingClientRect().height);",
      "var h = 46;")
  },
  {
    name: 'the context bar is in the right place but painted under something else',
    apply: d => edit(d, 'aat3-styles.css',
      'margin: 0 -20px; position: sticky; top: var(--chrome-h, 0px); z-index: 6;\n  display: flex; align-items: center; gap: var(--a3-3);',
      'margin: 0 -20px; position: sticky; top: var(--chrome-h, 0px); z-index: 6;\n  display: flex; align-items: center; gap: var(--a3-3);\n  pointer-events: none;')
  }
];

console.log(`${BOLD}Sticky chrome — adversarial${RESET}\n`);
let survived = 0;

for (const m of MUTANTS) {
  const dir = fixture();
  let verdict;
  try {
    m.apply(dir);
    const r = cp.spawnSync(process.execPath, [path.join(dir, 'scripts', 'check-sticky-chrome.js')],
      { cwd: dir, encoding: 'utf8', timeout: 600000,
        /* One width per mutant. See the note on WIDTHS in check-sticky-chrome.js:
           the question here is whether the gate rejects the defect, not whether
           it rejects it four times, and thirteen four-width runs put a quarter
           of an hour on every CI build for no extra evidence. */
        env: Object.assign({}, process.env, { REQUIRE_PLAYWRIGHT: '1', STICKY_WIDTHS: '320' }) });
    verdict = r.status === 0 ? 'SURVIVED' : 'caught';
    if (verdict === 'SURVIVED') {
      survived++;
      console.log(`  ${RED}✗${RESET} ${m.name}\n      ${DIM}the check still passed — it is not watching this.${RESET}`);
    } else {
      const first = (r.stdout || '').split('\n').filter(l => l.includes('✗'))[0] || '';
      console.log(`  ${GREEN}✓${RESET} ${m.name}\n      ${DIM}${first.trim().replace(/\x1b\[\d+m/g, '').slice(0, 130)}${RESET}`);
    }
  } catch (e) {
    survived++;
    console.log(`  ${RED}✗${RESET} ${m.name}\n      ${DIM}could not be applied: ${e.message}${RESET}`);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

console.log('');
if (survived) {
  console.log(`${RED}${BOLD}${survived} of ${MUTANTS.length} regressions were not caught${RESET}\n`);
  process.exit(1);
}
console.log(`${GREEN}${BOLD}all ${MUTANTS.length} deliberate regressions are caught ✓${RESET}\n`);
process.exit(0);
