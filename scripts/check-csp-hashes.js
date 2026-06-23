#!/usr/bin/env node
/**
 * Guards the app's Content-Security-Policy against a regression that silently
 * broke the PWA and caused a theme flash (see PR #112).
 *
 * The CSP uses `script-src 'self'` with NO `'unsafe-inline'`, so every inline
 * <script> in index.html must be whitelisted by its sha256 hash. If someone
 * edits an inline script (changing its hash) or the CSP, the browser silently
 * refuses to run the script — the service worker never registers and the
 * pre-paint theme bootstrap never applies.
 *
 * This check recomputes the sha256 of each inline <script> in index.html and
 * verifies the matching hash is present in ALL three CSP definitions:
 *   index.html (meta), _headers, vercel.json.
 *
 * Run: node scripts/check-csp-hashes.js   (exit 1 on any mismatch)
 */

'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const read = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');

const RED = '\x1b[31m', GREEN = '\x1b[32m', DIM = '\x1b[2m', RESET = '\x1b[0m';
const errors = [];

const html = read('index.html');

// Extract the body of every inline <script> (i.e. those WITHOUT a src=).
const inlineScripts = [];
const re = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
let m;
while ((m = re.exec(html)) !== null) {
  const attrs = m[1] || '';
  if (/\bsrc\s*=/.test(attrs)) continue; // external script — governed by 'self'
  inlineScripts.push(m[2]);
}

if (inlineScripts.length === 0) {
  console.log(`${DIM}No inline scripts in index.html — nothing to check.${RESET}`);
  process.exit(0);
}

// The CSP hash is sha256 over the EXACT bytes between the script tags.
const hashes = inlineScripts.map((body) => {
  const digest = crypto.createHash('sha256').update(body, 'utf8').digest('base64');
  return `sha256-${digest}`;
});

// The three places the CSP must be kept in sync.
const cspSources = {
  'index.html (meta)': html,
  '_headers': read('_headers'),
  'vercel.json': read('vercel.json'),
};

console.log('Inline <script> blocks in index.html:', inlineScripts.length);
hashes.forEach((h, i) => {
  console.log(`  [${i}] '${h}'`);
  for (const [name, src] of Object.entries(cspSources)) {
    const present = src.includes(h);
    console.log(`        ${present ? GREEN + '✓' : RED + '✗'} ${name}${RESET}`);
    if (!present) {
      errors.push(`Inline script #${i}: hash '${h}' is missing from the CSP in ${name}.`);
    }
  }
});

console.log('');
if (errors.length) {
  console.log(`${RED}CSP hash check FAILED (${errors.length}):${RESET}`);
  errors.forEach((e) => console.log(`  ${RED}✗${RESET} ${e}`));
  console.log(
    `\n${DIM}Fix: add the printed sha256 hash(es) to the script-src directive in ` +
    `index.html, _headers and vercel.json — do NOT switch to 'unsafe-inline'.${RESET}`
  );
  process.exit(1);
}

console.log(`${GREEN}CSP hash check passed — all inline scripts are whitelisted in every CSP.${RESET}`);
process.exit(0);
