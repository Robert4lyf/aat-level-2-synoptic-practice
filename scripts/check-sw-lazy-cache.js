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

/* ── The precache list, against the disk and against index.html ────────────
   `cache.addAll()` is all-or-nothing: one URL that 404s rejects the whole
   promise, install fails, and NOTHING is cached — so a single stale filename in
   CORE_ASSETS does not degrade offline support, it removes it entirely, for
   every subject, silently. Renaming or deleting a file is the ordinary way to
   introduce that, and nothing was checking it.

   The second half is the same trap from the other end: a file index.html loads
   on every page load and CORE_ASSETS does not name is one the app cannot start
   without offline. Guitar is exempt by LAZY_PATTERN — it is fetched on first
   open on purpose, which is what the rest of this file is about. */
function checkPrecacheList() {
  const sw = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');
  const from = sw.indexOf('var CORE_ASSETS = [');
  const list = sw.slice(from, sw.indexOf('];', from))
    .split('\n').map(l => (l.match(/['"]\.\/([^'"]*)['"]/) || [])[1])
    .filter(f => f);
  notes.push(`CORE_ASSETS names ${list.length} files, all of them on disk.`);

  list.filter(f => !fs.existsSync(path.join(ROOT, f))).forEach(f => errors.push(
    `sw.js precaches "${f}", which is not on disk — cache.addAll() rejects on one bad URL, ` +
    `so install fails and nothing at all is cached offline.`));

  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const eager = [...new Set([...html.matchAll(/(?:src|href)="([^"?:]+\.(?:js|css))"/g)].map(m => m[1].replace(/^\.\//, '')))];
  const lazy = /^guitar-[a-z-]+\.(js|css)$/;
  eager.filter(f => !list.includes(f) && !lazy.test(f)).forEach(f => errors.push(
    `index.html loads "${f}" on every page load and sw.js does not precache it, ` +
    `so the app cannot start offline.`));
  notes.push(`${eager.length} files load on every page; each is precached.`);
}

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
        addAll: async (urls) => urls.forEach(u => m.set(typeof u === 'string' ? u : u.url, 'precached')),
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
    Request: class { constructor(url, init) { this.url = typeof url === 'string' ? url : url.url; this.method = 'GET'; Object.assign(this, init || {}); } },
    URL,
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

  /* ── 5. THE OTHER TRAP: a cached copy must never beat a live one ────────
     Surviving the version sweep was half the problem. The other half shipped
     for three releases: the handler was cache-first, so a reader with anything
     in the lazy cache got that copy and the fresh one only landed on the NEXT
     load. Since these files are the course content, a whole unit could ship and
     the lesson list would still say "Not written yet".

     Nothing above catches it. Every earlier assertion is about what ends up IN
     the cache, and the cache was always correct — it was what got SERVED that
     was a release behind. So: seed the cache with a known-stale body, put a
     different body on the network, and require the network's. */
  {
    const ctx3 = makeEnv();
    const url = 'https://example.test/guitar-learn-data.js';
    const cache = await ctx3.caches.open('guitar-lazy-v1');
    await cache.put(url, { _body: 'STALE-last-release' });
    ctx3.fetch = async () => ({ _body: 'FRESH-from-network', status: 200, clone() { return this; } });
    ctx3.self.fetch = ctx3.fetch;

    const ev5 = await fire(ctx3, 'fetch', { request: req(url) });
    const served = await ev5._response;
    if (!served) {
      errors.push('a lazy request produced no response at all.');
    } else if (served._body !== 'FRESH-from-network') {
      errors.push(`with a live network, the worker served "${served._body}" instead of the fresh copy. ` +
                  `Cache-first on content means every reader runs one release behind — a unit can ship ` +
                  `and the lesson list still say it is not written.`);
    } else {
      notes.push('A live network beats the cached copy, so content is never a release behind.');
    }

    /* And the fresh copy replaces the stale one, so the next offline load is
       also current rather than reverting to what was there before. */
    const after = await (await ctx3.caches.open('guitar-lazy-v1')).match(url);
    if (!after || after._body !== 'FRESH-from-network') {
      errors.push(`after serving from the network the cache still holds "${after && after._body}". ` +
                  `The next offline load would go back to the stale copy.`);
    } else {
      notes.push('The fresh copy is written back, so the next offline load is current too.');
    }
  }

  checkPrecacheList();

  console.log(`${BOLD}service worker — lazy cache and the precache list${RESET}\n`);
  notes.forEach(n => console.log(`  ${DIM}${n}${RESET}`));
  console.log('');
  if (errors.length) {
    errors.forEach(e => console.log(`  ${RED}✗${RESET}  ${e}`));
    console.log(`\n${RED}${BOLD}${errors.length} failure(s).${RESET}\n`);
    process.exit(1);
  }
  console.log(`  ${GREEN}✓  guitar caches lazily and survives a version bump${RESET}\n`);
})();
