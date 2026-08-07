#!/usr/bin/env node
/**
 * Theme-token guard.
 *
 * CSS custom properties are substituted in the scope that DECLARES them, not
 * where they are used. So an alias declared on :root like
 *
 *     :root { --primary: var(--accent); }      /* --accent = light blue here *​/
 *     .dark { --accent: <dark blue>; }
 *
 * resolves --primary once, against the LIGHT value, and keeps it under .dark.
 * Every element using var(--primary) then renders a light-theme colour on a
 * dark background. Nothing errors; it just looks wrong.
 *
 * This has now bitten the app twice. The v1.3.0 release fixed five such aliases
 * and added a comment explaining the mechanism — and still left --primary
 * broken across 11 use sites, because the fix was done by hand and by eye.
 *
 * This check makes the class of bug impossible to reintroduce: it fails the
 * build when a :root alias points (directly or transitively) at anything that
 * changes between themes and is not itself redeclared for the dark theme.
 *
 * Run via `npm test`.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const RED = '\x1b[31m', GREEN = '\x1b[32m', BOLD = '\x1b[1m', DIM = '\x1b[2m', RESET = '\x1b[0m';

const src = fs.readFileSync(path.join(ROOT, 'styles.css'), 'utf8');

/* Pull the declaration body of a top-level rule, e.g. ":root" or ".dark". */
function ruleBody(selector) {
  const re = new RegExp('^' + selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*\\{([\\s\\S]*?)\\n\\}', 'm');
  const m = re.exec(src);
  return m ? m[1] : null;
}
function declarations(body) {
  const out = Object.create(null);
  const re = /^[ \t]*(--[\w-]+)\s*:\s*([^;]+);/gm;
  let m;
  while ((m = re.exec(body))) out[m[1]] = m[2].trim();
  return out;
}
function referenced(value) {
  const out = [];
  const re = /var\(\s*(--[\w-]+)/g;
  let m;
  while ((m = re.exec(value))) out.push(m[1]);
  return out;
}

const rootBody = ruleBody(':root');
const darkBody = ruleBody('.dark');

const errors = [];
if (!rootBody) errors.push(':root block not found in styles.css — the theme guard cannot run.');
if (!darkBody) errors.push('.dark block not found in styles.css — the theme guard cannot run.');

if (!errors.length) {
  const LIGHT = declarations(rootBody);
  const DARK = declarations(darkBody);

  /* Does this token's effective value differ between the two themes? */
  function themeVaries(token, seen) {
    seen = seen || new Set();
    if (seen.has(token)) return false;          // cycle guard
    seen.add(token);
    if (Object.prototype.hasOwnProperty.call(DARK, token)) return true;
    const value = LIGHT[token];
    if (!value) return false;
    return referenced(value).some(t => themeVaries(t, seen));
  }

  const useCount = token => {
    const re = new RegExp('var\\(\\s*' + token.replace(/-/g, '\\-') + '\\s*[,)]', 'g');
    return (src.match(re) || []).length;
  };

  Object.keys(LIGHT).forEach(token => {
    const value = LIGHT[token];
    const refs = referenced(value);
    if (!refs.length) return;                                   // literal, not an alias
    if (Object.prototype.hasOwnProperty.call(DARK, token)) return; // redeclared, fine
    const varying = refs.filter(r => themeVaries(r));
    if (!varying.length) return;                                // points at something theme-stable
    errors.push(
      `${token} is declared on :root as "${value}" and never redeclared in .dark, ` +
      `but ${varying.join(', ')} change${varying.length === 1 ? 's' : ''} between themes. ` +
      `It will keep its light value in dark mode (${useCount(token)} use site${useCount(token) === 1 ? '' : 's'}). ` +
      `Add "${token}: ${value};" to the .dark block.`
    );
  });

  console.log(`${BOLD}Theme-token check${RESET}`);
  console.log(`${DIM}${Object.keys(LIGHT).length} tokens on :root, ${Object.keys(DARK).length} redeclared in .dark${RESET}\n`);
}

if (errors.length) {
  console.log(`${RED}${BOLD}── STALE THEME ALIASES (${errors.length}) ──${RESET}`);
  errors.forEach(e => console.log(`  ${RED}✗${RESET}  ${e}`));
  console.log('');
  process.exit(1);
}
console.log(`${GREEN}${BOLD}── No stale theme aliases ✓${RESET}\n`);
