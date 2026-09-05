#!/usr/bin/env node
/**
 * A deploy reaches the reader.
 *
 * THE BUG THIS EXISTS FOR. The Cloudflare Worker set no Cache-Control header
 * at all — it rebuilt each asset response to add the security headers and
 * passed through whatever the assets binding chose for caching. There is no
 * build step in this repository and therefore no content hashing: app.js is
 * app.js from one release to the next, and a URL that may be held for an hour
 * is a URL that serves last hour's app. A reader on the Worker deployment was
 * running a build old enough to predate several releases while the identical
 * commit served fresh from GitHub Pages.
 *
 * IT COMPOUNDS, WHICH IS WHY IT WENT ON SO LONG. The service worker's own
 * script is an asset like any other. Serve sw.js stale and the worker never
 * updates; never update and CACHE_VERSION never changes; never change it and
 * the versioned caches are never swept. One stale file freezes every file, and
 * reloading cannot clear it — each reload is answered from the same caches.
 *
 * AND THE SHELL WAS CACHE-FIRST. Content files were moved to network-first
 * after a run of releases shipped uncorrected questions to warm caches; the
 * app's own code was left behind, so a reader got CURRENT question data
 * running on OLD code — the app looked weeks stale while its material was
 * today's.
 *
 * WHAT IS ASSERTED
 *
 *   §1 the Worker sets Cache-Control on every asset it serves, and sets it to
 *      something that revalidates rather than something with a lifetime
 *   §2 the service worker fetches the shell — html, js, css, webmanifest, and
 *      navigations — from the network before its cache
 *   §3 content still does too, and is still tested before the shell so the two
 *      branches cannot swap
 *   §4 the cache is still the offline fallback on both, because network-first
 *      with no fallback is an app that stops working on a train
 *   §5 images and fonts are still cache-first — they are the files that do not
 *      change and the ones worth serving from disk
 *
 * Run: node scripts/check-cache-freshness.js
 */
'use strict';

const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

const RED = '\x1b[31m', GREEN = '\x1b[32m', BOLD = '\x1b[1m', DIM = '\x1b[2m', RESET = '\x1b[0m';
let failures = 0, checks = 0;
function ok(cond, label) {
  checks++;
  if (!cond) { failures++; console.log(`  ${RED}✗${RESET} ${label}`); }
}

console.log(`${BOLD}Cache freshness${RESET}  ${DIM}a deploy reaches the reader${RESET}\n`);

/* Comments stripped before anything is read out of either file. Both explain
   themselves at length and name the very headers and patterns being asserted,
   so prose about a rule would otherwise satisfy a check for the rule. */
function code(file) {
  return fs.readFileSync(path.join(ROOT, file), 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^\s*\/\/.*$/gm, '');
}

const WORKER = code('worker/index.js');
const SW = code('sw.js');

/* ── 1. The Worker says how long its assets may be held ────────────────────── */
console.log(`${DIM}the Worker${RESET}`);

ok(/Cache-Control/i.test(WORKER), 'worker/index.js sets a Cache-Control header');
/* Set on the ASSET path, not only on the 401. The challenge response already
   carried no-store long before this bug; it is the assets that were bare, and
   a check satisfied by the 401 would have passed throughout. */
ok(/withSecurityHeaders[\s\S]{0,400}Cache-Control/i.test(WORKER),
  'and sets it on the assets it serves, not only on the password challenge');

const cc = /Cache-Control['"]?\s*[,:]\s*(?:CACHE_CONTROL|['"]([^'"]+)['"])/i.exec(WORKER);
const ccValue = /CACHE_CONTROL\s*=\s*['"]([^'"]+)['"]/.exec(WORKER);
const value = (ccValue && ccValue[1]) || (cc && cc[1]) || '';
ok(!!value, `the value is a literal this check can read (got ${JSON.stringify(value)})`);
/* REVALIDATION, NOT A LIFETIME. no-cache stores the response and revalidates
   it; a max-age above zero is a window in which the reader is served an old
   build and cannot know. */
ok(/no-cache|no-store|max-age=0/.test(value),
  `assets are revalidated rather than held (got ${JSON.stringify(value)})`);
ok(!/max-age=[1-9]/.test(value),
  `and carry no lifetime — nothing here is content-hashed, so no URL is safe to hold (${JSON.stringify(value)})`);

/* ── 2. The service worker asks the network for the app ────────────────────── */
console.log(`${DIM}the service worker${RESET}`);

const shellPat = /var SHELL_PATTERN = (\/[^\n;]+\/)\s*;/.exec(SW);
ok(!!shellPat, 'sw.js defines a shell pattern');
let SHELL = null;
try { SHELL = shellPat ? eval(shellPat[1]) : null; } catch (e) { SHELL = null; }
ok(!!SHELL, 'and it is a usable regular expression');

if (SHELL) {
  [
    ['/index.html', 'the page itself'],
    ['/app.js', "Level 2's player"],
    ['/aat1-ui.js', "Level 1's player"],
    ['/aat3-ui.js', "Level 3's player"],
    ['/aat3-styles.css', "Level 3's stylesheet"],
    ['/styles.css', 'the shared stylesheet'],
    ['/calculator.js', 'the shared calculator'],
    ['/question-grid.js', 'the shared grids'],
    ['/site.webmanifest', 'the manifest'],
  ].forEach(([url, what]) => ok(SHELL.test(url), `${what} is fetched fresh (${url})`));

  /* §5 — and the files that genuinely never change are not, because they are
     the big ones and the cache is the right answer for them. */
  [
    ['/icon-192.png', 'an icon'],
    ['/apple-touch-icon.png', 'the touch icon'],
    ['/fonts/inter.woff2', 'a font'],
    ['/img/diagram.svg', 'an image'],
  ].forEach(([url, what]) => ok(!SHELL.test(url), `${what} is still served from the cache (${url})`));
}

/* A navigation has no extension to match on, and it is the request that
   decides which app the reader gets. */
ok(/SHELL_PATTERN\.test\(req\.url\)\s*\|\|\s*req\.mode === 'navigate'/.test(SW),
  'a navigation is fetched fresh too, extension or not');

/* THE BRANCH IS NETWORK-FIRST, not cache-first with a background refresh.
   Read as: inside the shell branch, fetch comes before any caches.match. The
   defect being guarded is the branch being written the other way round, which
   still passes every pattern assertion above. */
/* THE BRANCH, AND ONLY THE BRANCH. A first version took a fixed 900 characters
   from the `if`, which ran past the closing brace and into the cache-first
   branch below — and that branch contains a .catch with a caches.match and a
   cache.put of its own. Two mutants that deleted the shell branch's offline
   fallback and its write-back both survived, because the assertions were
   matching the NEXT branch's code. Balanced to the brace instead. */
function branchBody(src, marker) {
  const at = src.indexOf(marker);
  if (at === -1) return '';
  const open = src.indexOf('{', at);
  if (open === -1) return '';
  let depth = 0;
  for (let i = open; i < src.length; i++) {
    if (src[i] === '{') depth++;
    else if (src[i] === '}') { depth--; if (depth === 0) return src.slice(at, i + 1); }
  }
  return '';
}
const shellBranch = branchBody(SW, 'SHELL_PATTERN.test(req.url)');
ok(shellBranch.length > 0 && shellBranch.length < 1200,
  `the shell branch is read as one balanced block (${shellBranch.length} chars)`);
ok(shellBranch.indexOf('fetch(req)') !== -1, 'the shell branch goes to the network');
ok(shellBranch.indexOf('fetch(req)') < (shellBranch.indexOf('caches.match') === -1 ? Infinity : shellBranch.indexOf('caches.match')),
  'and asks the network BEFORE the cache — cache-first with a background refresh is the defect');
/* §4 — but the cache is still there when the network is not. */
ok(/\.catch\(function[\s\S]{0,300}caches\.match/.test(shellBranch),
  'and falls back to the cache when the network does not answer, so offline still works');
ok(/caches\.open\(CACHE_VERSION\)[\s\S]{0,120}cache\.put/.test(shellBranch),
  'and writes what it fetched back, so the next offline load is current too');

/* ── 3. Content is unchanged, and still decided first ──────────────────────── */
console.log(`${DIM}content${RESET}`);

const iLazy = SW.indexOf('LAZY_PATTERN.test(req.url)');
const iContent = SW.indexOf('CONTENT_PATTERN.test(req.url)');
const iShell = SW.indexOf('SHELL_PATTERN.test(req.url)');
ok(iLazy !== -1 && iContent !== -1 && iShell !== -1, 'all three branches are present');
/* ORDER IS LOAD-BEARING. aat3-practice-data.js matches the shell pattern as
   well — it ends in .js — so if the shell branch were tested first the content
   files would silently change hands, and the guitar files would too. */
ok(iContent < iShell,
  `content is decided before the shell (content at ${iContent}, shell at ${iShell})`);
ok(iLazy < iContent,
  `and the lazily-cached subject files before both (lazy at ${iLazy})`);

/* AND EACH BRANCH IS LIVE. Order alone is satisfied by a branch that has been
   disabled where it stands — a condition anded with false, a respondWith
   deleted — which leaves the files falling through to whatever comes next
   while every position assertion above still passes. */
[['LAZY_PATTERN.test(req.url)', 'the lazily-cached subject files'],
 ['CONTENT_PATTERN.test(req.url)', 'course content'],
 ['SHELL_PATTERN.test(req.url)', 'the app shell']].forEach(([marker, what]) => {
  const body = branchBody(SW, marker);
  ok(body.indexOf('event.respondWith') !== -1, `${what} is actually answered by its branch`);
  ok(/return;\s*$/.test(body.trim()) || body.indexOf('return;') !== -1,
    `${what} stops there rather than falling through`);
  ok(!/&&\s*false|\|\|\s*true|if\s*\(\s*false/.test(body.slice(0, 120)),
    `${what} is not switched off where it stands`);
});

if (SHELL) {
  const contentPat = /var CONTENT_PATTERN = (\/[^\n;]+\/)\s*;/.exec(SW);
  let CONTENT = null;
  try { CONTENT = contentPat ? eval(contentPat[1]) : null; } catch (e) { CONTENT = null; }
  ok(!!CONTENT && CONTENT.test('/aat3-practice-data.js'),
    'a question bank is still matched by the content pattern');
  ok(!!CONTENT && SHELL.test('/aat3-practice-data.js'),
    'and by the shell pattern too — which is exactly why the order above matters');
}

console.log();
if (failures) {
  console.log(`${RED}${BOLD}✗ ${failures} of ${checks} checks failed${RESET}\n`);
  process.exit(1);
}
console.log(`${GREEN}${BOLD}── A deploy reaches the reader ✓${RESET}  ${DIM}(${checks} assertions)${RESET}\n`);
