#!/usr/bin/env node
/**
 * The service worker's lazy cache survives a version bump.
 *
 * Guitar's files are cached on first open rather than precached with everything
 * else, because its engine, renderer, audio and stylesheet are dead weight in
 * the offline install of someone who only studies AAT.
 *
 * That creates a trap the plan flagged before any of it was written. The
 * activate handler deletes every cache whose key is not the current
 * CACHE_VERSION. Anything lazily cached under the versioned key would therefore
 * be wiped by the next bump — and a user who updated and then went offline
 * would lose a subject they had been using, with nothing to explain it.
 *
 * So the lazy files live in a separate, unversioned cache excluded from that
 * sweep. This exercises the whole path against a mock Cache API rather than
 * asserting it by reading the source: install, open guitar, bump the version,
 * and check that the AAT precache was refreshed while the guitar cache was not
 * touched.
 *
 * Run: node scripts/check-sw-lazy-cache.js   (exit 1 on any failure)
 */

'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const ROOT = path.join(__dirname, '..');

const RED = '\x1b[31m', GREEN = '\x1b[32m', DIM = '\x1b[2m', BOLD = '\x1b[1m', RESET = '\x1b[0m';
const errors = [];
const notes = [];

/* ── A mock Cache API, small enough to read in one sitting ─────────────────
   `tag` labels what this worker's network returns, so the assertions can tell
   the copy fetched before a version bump from the copy fetched after it. An
   earlier version of this file used one body for both, which made the refresh
   assertion below unfalsifiable: it passed with the refresh call deleted. */
function makeEnv(tag) {
  const stores = new Map();                       // cacheName → Map(url → body)
  const caches = {
    open: async (name) => {
      if (!stores.has(name)) stores.set(name, new Map());
      const m = stores.get(name);
      return {
        addAll: async (urls) => urls.forEach(u => m.set(u, 'precached')),
        put: async (req, res) => m.set(typeof req === 'string' ? req : req.url, res._body),
        keys: async () => [...m.keys()].map(url => ({ url, method: 'GET', mode: 'cors' })),
        match: async (req) => {
          const k = typeof req === 'string' ? req : req.url;
          return m.has(k) ? { _body: m.get(k), status: 200, clone() { return this; } } : undefined;
        }
      };
    },
    keys: async () => [...stores.keys()],
    delete: async (name) => stores.delete(name),
    match: async (req) => {
      const k = typeof req === 'string' ? req : req.url;
      for (const m of stores.values()) if (m.has(k)) return { _body: m.get(k), status: 200, clone() { return this; } };
      return undefined;
    }
  };

  const handlers = {};
  const self = {
    addEventListener: (t, fn) => { handlers[t] = fn; },
    skipWaiting: async () => {},
    clients: { claim: async () => {}, matchAll: async () => [] },
    location: { origin: 'https://example.test' },
    caches
  };
  const fetchLog = [];
  const ctx = {
    self, caches, handlers, stores, fetchLog,
    Response: class { constructor(body, init) { this._body = body; Object.assign(this, init || {}); } },
    fetch: async (req) => {
      const url = typeof req === 'string' ? req : req.url;
      fetchLog.push(url);
      return { _body: 'from-network-' + tag, status: 200, clone() { return this; } };
    },
    console
  };
  ctx.self.fetch = ctx.fetch;
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8'), ctx);
  return ctx;
}

async function fire(ctx, type, event) {
  const waits = [];
  const ev = Object.assign({
    waitUntil: p => waits.push(p),
    respondWith: p => { ev._response = p; waits.push(p); }
  }, event);
  ctx.handlers[type](ev);
  await Promise.all(waits);
  return ev;
}

const req = (url) => ({ url, method: 'GET', mode: 'cors' });

(async () => {
  /* ── 1. Install precaches the shell, and does NOT precache guitar ──────── */
  let ctx = makeEnv('v1');
  await fire(ctx, 'install', {});
  const version = [...ctx.stores.keys()].find(k => /^aat-l2-v/.test(k));
  if (!version) {
    errors.push('install created no versioned cache.');
  } else {
    const core = ctx.stores.get(version);
    const guitarPrecached = [...core.keys()].filter(u => /guitar-/.test(u));
    if (guitarPrecached.length) {
      errors.push(`install precached ${guitarPrecached.length} guitar file(s) (${guitarPrecached[0]}). ` +
                  `They are meant to be lazy, so an AAT-only user does not carry them offline.`);
    }
    const others = ['./french-data.js', './lsf-data.js', './code-route-data.js', './aat1-ui.js', './aat3-ui.js'];
    const missing = others.filter(u => !core.has(u));
    if (missing.length) {
      errors.push(`install stopped precaching ${missing.join(', ')}. The README promises every existing ` +
                  `subject works fully offline — moving one out to tidy up breaks that for people already relying on it.`);
    }
    notes.push(`Install precached ${core.size} files under ${version}; no guitar files among them.`);
  }

  /* ── 2. Opening guitar caches its files, in the unversioned store ──────── */
  await fire(ctx, 'fetch', { request: req('https://example.test/guitar-engine.js') });
  await fire(ctx, 'fetch', { request: req('https://example.test/guitar-styles.css') });
  const lazyName = [...ctx.stores.keys()].find(k => !/^aat-l2-v/.test(k));
  if (!lazyName) {
    errors.push('opening guitar cached nothing outside the versioned store.');
  } else {
    const lazy = ctx.stores.get(lazyName);
    if (lazy.size < 2) errors.push(`the lazy cache holds ${lazy.size} file(s) after two guitar requests.`);
    if (/^aat-l2-v/.test(lazyName)) errors.push(`the lazy cache is version-named (${lazyName}) and will be swept.`);
    notes.push(`Opening guitar cached ${lazy.size} file(s) under "${lazyName}".`);
  }

  /* ── 3. THE TRAP: bump the version and activate ────────────────────────── */
  const before = new Map([...ctx.stores.get(lazyName)]);
  const src = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');
  const bumped = src.replace(/var CACHE_VERSION = '([^']+)'/,
    (m, v) => `var CACHE_VERSION = '${v.replace(/(\d+)$/, (n) => String(Number(n) + 1))}'`);
  if (bumped === src) errors.push('could not synthesise a version bump — CACHE_VERSION did not match.');

  /* Re-run the new worker over the SAME stores, which is what an update does. */
  const ctx2 = makeEnv('v2');
  ctx2.stores.clear();
  for (const [k, v] of ctx.stores) ctx2.stores.set(k, v);
  vm.runInContext(bumped, ctx2);
  await fire(ctx2, 'install', {});
  await fire(ctx2, 'activate', {});

  const survived = ctx2.stores.get(lazyName);
  if (!survived) {
    errors.push(`THE TRAP FIRED: the guitar cache "${lazyName}" was deleted by the version bump. ` +
                `A user who updated and then went offline would lose the subject with no explanation.`);
  } else {
    const lost = [...before.keys()].filter(k => !survived.has(k));
    if (lost.length) errors.push(`${lost.length} guitar file(s) lost across the bump: ${lost.join(', ')}`);
    else notes.push(`Version bump: guitar's ${survived.size} cached file(s) survived intact.`);
  }
  /* ── 3b. Surviving is not enough: it must also be REFRESHED ──────────────
     A lazy cache that is spared the sweep but never revalidated serves the old
     engine to the new app for one whole session. Assert the bodies actually
     changed. The two workers' networks return differently-tagged bodies, so a
     file still holding the pre-bump body is one that was spared but not
     revalidated — which is the whole defect. */
  if (survived) {
    const stale = [...survived.entries()].filter(([, body]) => body !== 'from-network-v2').map(([k]) => k);
    if (stale.length) {
      errors.push(`${stale.length} guitar file(s) survived the bump WITHOUT being refreshed: ${stale.join(', ')}. ` +
                  `Cache-first serving then hands the old ${path.basename(stale[0])} to the new app.js for a ` +
                  `whole session — the exact mismatch that versioning a cache exists to prevent.`);
    } else {
      notes.push(`Version bump: all ${survived.size} lazy file(s) re-fetched from the network.`);
    }
  }

  const oldVersions = [...ctx2.stores.keys()].filter(k => /^aat-l2-v/.test(k));
  if (oldVersions.length !== 1) {
    errors.push(`after the bump there are ${oldVersions.length} versioned caches (${oldVersions.join(', ')}); ` +
                `the old one should have been swept.`);
  } else {
    notes.push(`Old versioned cache swept; ${oldVersions[0]} is the only one left.`);
  }

  /* ── 4. Offline: a cached guitar file is still served ──────────────────── */
  ctx2.fetch = async () => { throw new Error('offline'); };
  ctx2.self.fetch = ctx2.fetch;
  const ev = await fire(ctx2, 'fetch', { request: req('https://example.test/guitar-engine.js') });
  const res = await ev._response;
  if (!res || res.status !== 200) {
    errors.push('offline after a version bump, a previously cached guitar file was not served from cache.');
  } else {
    notes.push('Offline after the bump, guitar files are still served from cache.');
  }

  console.log(`${BOLD}service worker — lazy cache${RESET}\n`);
  notes.forEach(n => console.log(`  ${DIM}${n}${RESET}`));
  console.log('');
  if (errors.length) {
    errors.forEach(e => console.log(`  ${RED}✗${RESET}  ${e}`));
    console.log(`\n${RED}${BOLD}${errors.length} failure(s).${RESET}\n`);
    process.exit(1);
  }
  console.log(`  ${GREEN}✓  guitar caches lazily and survives a version bump${RESET}\n`);
})();
