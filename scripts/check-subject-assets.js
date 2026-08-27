#!/usr/bin/env node
/**
 * A subject never mounts before its stylesheet has arrived.
 *
 * app.js awaits a subject's `styles` file alongside its scripts, because
 * mount() runs the moment that promise chain resolves and guitar's renderer
 * carries no colour of its own — the rect that masks the stave line behind a
 * tab digit has no fill except the one guitar-styles.css gives it, so an
 * unstyled figure is not a plainer figure, it is a black box where the numbers
 * should be.
 *
 * scripts/check-subjects-render.js proves that holds on a cold load: it serves
 * the stylesheet 200ms late and samples the computed style at the instant the
 * first panel enters the document. What it cannot reach is the SECOND call.
 * Getting there through the UI means opening the subject picker, clicking away
 * and clicking back inside a 200ms window — a timing-dependent click sequence
 * is a flaky gate, and a flaky gate is one people learn to re-run.
 *
 * So this reads the property straight off the source instead. The first draft
 * of loadStyles() returned early when `document.getElementById(id)` found the
 * <link>. That element is appended synchronously while the file is still in
 * flight, so from the next line on the test says "loaded" about a stylesheet
 * that has not arrived: a re-entrant switch resolves instantly and mounts
 * against no CSS. The fix memoises the promise the way loadScript() already
 * did. This runs the real function text against a stub DOM and asserts the
 * second caller waits with the first.
 *
 * Run: node scripts/check-subject-assets.js   (exit 1 on any failure)
 */

'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const ROOT = path.join(__dirname, '..');

const RED = '\x1b[31m', GREEN = '\x1b[32m', DIM = '\x1b[2m', BOLD = '\x1b[1m', RESET = '\x1b[0m';
const errors = [];
const notes = [];

/* A promise that never settles ends this process quietly with status 0, which
   reads as a pass. That is not hypothetical: a draft of loadStyles() that
   reused an existing <link> overwrote the first caller's onload with the
   second's, so the first promise hung forever and the gate exited silently
   green. Whatever happens, something gets reported. */
let reported = false;
const deadline = setTimeout(() => {
  errors.push('a promise never settled — some caller of loadStyles() is still waiting. ' +
              'A second call that reuses the first <link> and overwrites its onload does this: ' +
              'the first caller hangs forever, and the subject switch that was waiting on it ' +
              'never completes.');
  report();
}, 4000);

const src = fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8');

/* Lift the asset-loading block out of app.js's IIFE by source text. Brittle by
   nature — so it fails loudly rather than quietly testing nothing if the shape
   changes, which is the failure mode that matters. */
function extract(startMarker, endMarker, label) {
  const a = src.indexOf(startMarker);
  if (a === -1) { errors.push(`could not find ${label} in app.js (looked for "${startMarker}").`); return null; }
  const b = src.indexOf(endMarker, a);
  if (b === -1) { errors.push(`found the start of ${label} but not its end ("${endMarker}").`); return null; }
  return src.slice(a, b);
}

const block = extract('const _stylePromises', 'function subjectAssetsReady', 'the stylesheet loader');
const ready = extract('function subjectAssetsReady', '\n  /* Maps a French', 'subjectAssetsReady');

if (block && ready) {
  /* A stub DOM where a <link> is appended synchronously and loads later, which
     is the whole point: the gap between the two is where the bug lived. */
  let pending = [];
  const head = { appendChild(node) { pending.push(node); } };
  const byId = Object.create(null);
  const document = {
    getElementById: (id) => byId[id] || null,
    createElement: () => ({ set id(v) { byId[v] = this; this._id = v; }, get id() { return this._id; }, sheet: null }),
    head
  };
  const sandbox = { document, Promise, Set, Object, console };
  vm.createContext(sandbox);
  try {
    vm.runInContext(block + '\n' + ready +
      '\nfunction getSubject() { return { styles: "guitar-styles.css", assets: [] }; }' +
      '\nconst _assetReady = new Set();', sandbox);
  } catch (e) {
    errors.push(`the extracted loader does not run standalone: ${e.message}`);
  }

  if (!errors.length) {
    const href = 'guitar-styles.css';
    let firstDone = false, secondDone = false;
    const p1 = sandbox.loadStyles(href).then(() => { firstDone = true; });
    /* Called again before the file arrives — the re-entrant subject switch. */
    const p2 = sandbox.loadStyles(href).then(() => { secondDone = true; });

    setImmediate(() => {
      if (firstDone || secondDone) {
        errors.push('loadStyles resolved before the stylesheet loaded. The <link> is appended ' +
                    'synchronously, so anything that treats its presence as "ready" reports ready ' +
                    'while the file is still in flight — and a subject switch inside that window ' +
                    'mounts against no CSS.');
      }
      if (sandbox.subjectAssetsReady('guitar')) {
        errors.push('subjectAssetsReady() said guitar was ready while its stylesheet was still loading.');
      }
      if (pending.length !== 1) {
        errors.push(`two calls for the same stylesheet appended ${pending.length} <link> elements; ` +
                    `the second should have joined the first request, not started another.`);
      }

      /* Now let it arrive. */
      pending.forEach(l => { l.sheet = {}; if (l.onload) l.onload(); });

      Promise.all([p1, p2]).then(() => {
        if (!firstDone || !secondDone) {
          errors.push('a caller was still waiting after the stylesheet loaded — the promise never settled.');
        } else {
          notes.push('Two concurrent calls share one request and both wait for it.');
        }
        if (!sandbox.subjectAssetsReady('guitar')) {
          errors.push('subjectAssetsReady() still says guitar is not ready after its stylesheet loaded.');
        } else {
          notes.push('subjectAssetsReady() flips only once the file has arrived.');
        }

        /* And a third call afterwards is free, not a fresh request. */
        const before = pending.length;
        sandbox.loadStyles(href).then(() => {
          if (pending.length !== before) errors.push('a later call re-requested an already-loaded stylesheet.');
          else notes.push('A later call resolves without re-requesting.');
          report();
        });
      });
    });
  } else { report(); }
} else { report(); }

function report() {
  if (reported) return;
  reported = true;
  clearTimeout(deadline);
  console.log(`${BOLD}subject assets${RESET}\n`);
  notes.forEach(n => console.log(`  ${DIM}${n}${RESET}`));
  console.log('');
  if (errors.length) {
    errors.forEach(e => console.log(`  ${RED}✗${RESET}  ${e}`));
    console.log(`\n${RED}${BOLD}${errors.length} failure(s).${RESET}\n`);
    process.exit(1);
  }
  console.log(`  ${GREEN}✓  a subject waits for its stylesheet, once${RESET}\n`);
}
