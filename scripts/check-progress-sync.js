#!/usr/bin/env node
/* Tests for cross-device sync — the Worker's request handling and the client's
 * pull-merge-push loop.
 *
 * The property that matters is the one a user would notice being broken: two
 * devices that both study offline and then sync must end up with BOTH sessions,
 * not whichever one happened to write last. That is what the version check and
 * the conflict retry exist for, and it is asserted here against a fake server
 * that can be made to race on demand.
 *
 * Everything here fails closed. A server that is down, a key that is wrong, a
 * response that is nonsense — none of them may lose or corrupt local progress,
 * because the app worked perfectly well before sync existed and must keep
 * working when sync does not. */

'use strict';

const path = require('path');

let failures = 0, checks = 0;
function ok(cond, label) {
  checks++;
  if (!cond) { failures++; console.log('  \x1b[31m✗\x1b[0m ' + label); }
}
function eq(a, b, label) { ok(JSON.stringify(a) === JSON.stringify(b), label + ' — got ' + JSON.stringify(a) + ', expected ' + JSON.stringify(b)); }

/* ── Fakes ──────────────────────────────────────────────────────────────── */

function fakeStore(initial) {
  const m = new Map(Object.entries(initial || {}));
  return {
    get length() { return m.size; },
    key(i) { return Array.from(m.keys())[i]; },
    getItem(k) { return m.has(k) ? m.get(k) : null; },
    setItem(k, v) { m.set(k, String(v)); },
    removeItem(k) { m.delete(k); },
    dump() { return Object.fromEntries(m); },
  };
}

/* A KV namespace with the two methods the Worker uses. */
function fakeKV() {
  const m = new Map();
  return {
    async get(k, opts) {
      const v = m.get(k);
      if (v == null) return null;
      return (opts && opts.type === 'json') ? JSON.parse(v) : v;
    },
    async put(k, v) { m.set(k, v); },
    size() { return m.size; },
    names() { return Array.from(m.keys()); },
    raw() { return Array.from(m.values()).join('\n'); },
  };
}

const KEY = 'Ab3xKq7mNp2WvZr9Ts5YuC4EhJ6FgD8k';   // 32 chars, as the client generates
const ENDPOINT = 'https://sync.example.workers.dev';

function req(method, body, headers) {
  return new Request(ENDPOINT + '/state', {
    method,
    headers: headers || {},
    body: body == null ? undefined : JSON.stringify(body),
  });
}
const auth = (k) => ({ Authorization: 'Bearer ' + (k || KEY) });

(async () => {
  const { handleRequest } = await import(path.join(__dirname, '..', 'sync-worker', 'worker.js'));

  console.log('\x1b[1mProgress sync\x1b[0m\n');

  /* ── Worker: auth ─────────────────────────────────────────────────────── */
  {
    const env = { PROGRESS: fakeKV() };
    eq((await handleRequest(req('GET'), env)).status, 401, 'a request with no key is rejected');
    eq((await handleRequest(req('GET', null, { Authorization: 'Bearer short' }), env)).status, 401, 'a key that is too short is rejected');
    eq((await handleRequest(req('GET', null, { Authorization: 'Basic ' + KEY }), env)).status, 401, 'a non-bearer Authorization header is rejected');
    eq((await handleRequest(req('GET', null, auth()), env)).status, 404, 'a valid key with nothing stored yet returns 404');
    eq((await handleRequest(new Request(ENDPOINT + '/elsewhere', { headers: auth() }), env)).status, 404, 'an unknown path is a 404');
    eq((await handleRequest(req('DELETE', null, auth()), env)).status, 405, 'an unsupported method is refused');
    eq((await handleRequest(req('OPTIONS', null, auth()), env)).status, 204, 'a CORS preflight succeeds');
  }

  /* ── Worker: the key is never stored ──────────────────────────────────── */
  {
    const kv = fakeKV(), env = { PROGRESS: kv };
    await handleRequest(req('PUT', { keys: { aatPrep_v2: { learn: { xp: 5 } } } }, { ...auth(), 'If-Match': '0' }), env);
    ok(kv.names().every(n => n.indexOf(KEY) === -1), 'the sync key does not appear in any stored key name');
    ok(kv.raw().indexOf(KEY) === -1, 'the sync key does not appear in any stored value');
    ok(/^p:[0-9a-f]{64}$/.test(kv.names()[0]), 'the document is named after a SHA-256 of the key');
  }

  /* ── Worker: two keys are two documents ───────────────────────────────── */
  {
    const env = { PROGRESS: fakeKV() };
    const other = 'Zz9yXw8vUt7sRq6pNm5kJh4gFd3sAb2c';
    await handleRequest(req('PUT', { keys: { aatPrep_v2: { learn: { xp: 11 } } } }, { ...auth(), 'If-Match': '0' }), env);
    await handleRequest(req('PUT', { keys: { aatPrep_v2: { learn: { xp: 22 } } } }, { ...auth(other), 'If-Match': '0' }), env);
    const a = await (await handleRequest(req('GET', null, auth()), env)).json();
    const b = await (await handleRequest(req('GET', null, auth(other)), env)).json();
    eq(a.keys.aatPrep_v2.learn.xp, 11, 'one key reads back its own document');
    eq(b.keys.aatPrep_v2.learn.xp, 22, 'a different key reads a completely separate document');
  }

  /* ── Worker: the version check ────────────────────────────────────────── */
  {
    const env = { PROGRESS: fakeKV() };
    const first = await handleRequest(req('PUT', { keys: { a: 1 } }, { ...auth(), 'If-Match': '0' }), env);
    eq(first.status, 200, 'the first write against version 0 succeeds');
    eq((await first.json()).version, 1, 'the first write returns version 1');
    eq(first.headers.get('ETag'), '"1"', 'the new version is also given as an ETag');

    const stale = await handleRequest(req('PUT', { keys: { a: 2 } }, { ...auth(), 'If-Match': '0' }), env);
    eq(stale.status, 409, 'a write quoting a stale version is refused');
    eq((await stale.json()).version, 1, 'the refusal reports the version the client should have used');

    const fresh = await handleRequest(req('PUT', { keys: { a: 3 } }, { ...auth(), 'If-Match': '1' }), env);
    eq(fresh.status, 200, 'a write quoting the current version succeeds');

    const none = await handleRequest(req('PUT', { keys: { a: 4 } }, auth()), env);
    eq(none.status, 428, 'a write with no If-Match at all is refused rather than allowed through');
    const after = await (await handleRequest(req('GET', null, auth()), env)).json();
    eq(after.keys.a, 3, 'neither refused write changed what is stored');
  }

  /* ── Worker: malformed bodies ─────────────────────────────────────────── */
  {
    const env = { PROGRESS: fakeKV() };
    const bad = new Request(ENDPOINT + '/state', { method: 'PUT', headers: { ...auth(), 'If-Match': '0' }, body: 'not json' });
    eq((await handleRequest(bad, env)).status, 400, 'a body that is not JSON is refused');
    eq((await handleRequest(req('PUT', { nope: true }, { ...auth(), 'If-Match': '0' }), env)).status, 400, 'a JSON body with no keys object is refused');
    const huge = new Request(ENDPOINT + '/state', { method: 'PUT', headers: { ...auth(), 'If-Match': '0' }, body: JSON.stringify({ keys: { a: 'x'.repeat(3 * 1024 * 1024) } }) });
    eq((await handleRequest(huge, env)).status, 413, 'an oversized body is refused');
  }

  /* ── Client ───────────────────────────────────────────────────────────── */

  /* Wire the client and the Worker together through a fetch that routes into
     the real handler, so the two are tested against each other rather than
     against a mock of what each believes the other does. */
  function makeClient(localKeys, server) {
    delete require.cache[require.resolve(path.join(__dirname, '..', 'progress-backup.js'))];
    delete require.cache[require.resolve(path.join(__dirname, '..', 'progress-sync.js'))];
    const g = {};
    g.window = g;
    g.localStorage = fakeStore();
    g.SYNC_ENDPOINT = ENDPOINT;
    g.navigator = { onLine: true };
    g.crypto = require('crypto').webcrypto;
    g.fetch = (url, init) => {
      if (server.down) return Promise.reject(new Error('network down'));
      const r = new Request(url, init);
      return handleRequest(r, server.env);
    };
    const prevWindow = global.window;
    global.window = g;
    const PB = require(path.join(__dirname, '..', 'progress-backup.js'));
    const PS = require(path.join(__dirname, '..', 'progress-sync.js'));
    global.window = prevWindow;
    PB.writeAll(localKeys, g.localStorage);
    PS.setKey(KEY);
    return { PB, PS, store: g.localStorage, g };
  }

  const phoneKeys = {
    aatPrep_v2: { settings: { darkMode: true }, learn: { lessons: { 'L-phone': { best: 90 } }, xp: 400 }, stats: { questions: { 'q-a': { attempts: 3, correct: 2 } }, topics: {}, streak: { current: 1, best: 9, lastCorrectAt: 100 } } },
    prep_v2_aat3: { lessons: { '3A': { best: 88 } }, xp: 120 },
  };
  const deskKeys = {
    aatPrep_v2: { settings: { darkMode: false }, learn: { lessons: { 'L-desk': { best: 70 } }, xp: 250 }, stats: { questions: { 'q-b': { attempts: 1, correct: 1 } }, topics: {}, streak: { current: 2, best: 4, lastCorrectAt: 200 } } },
    prep_v2_aat3: { lessons: { '3B': { best: 55 } }, xp: 60 },
  };

  /* Two devices, each with its own work, syncing in turn. */
  {
    const server = { env: { PROGRESS: fakeKV() } };
    const phone = makeClient(phoneKeys, server);
    const desk = makeClient(deskKeys, server);

    await phone.PS.syncNow();
    const r1 = await desk.PS.syncNow();
    ok(r1.changed, 'the second device is told the sync brought something new in');

    const d = desk.PB.readAll(desk.store).aatPrep_v2;
    ok(!!d.learn.lessons['L-desk'], 'the second device keeps its own lesson');
    ok(!!d.learn.lessons['L-phone'], 'and gains the first device\'s lesson');
    eq(d.learn.xp, 400, 'XP takes the higher of the two');
    eq(d.settings.darkMode, false, 'the second device keeps its own dark-mode setting');
    eq(desk.PB.readAll(desk.store).prep_v2_aat3.lessons['3A'].best, 88, 'Level 3 progress crosses too');

    /* Now the first device syncs again and should receive what the second added. */
    const r2 = await phone.PS.syncNow();
    ok(r2.changed, 'the first device is told it received something back');
    const p = phone.PB.readAll(phone.store).aatPrep_v2;
    ok(!!p.learn.lessons['L-desk'] && !!p.learn.lessons['L-phone'], 'both devices now hold both lessons');
    eq(p.settings.darkMode, true, 'the first device still keeps its OWN dark-mode setting');

    /* Converged: a further sync changes nothing and, importantly, does not
       spend a write doing it. */
    const progressOnly = (s) => { const d = { ...s.dump() }; delete d.prep_v2_sync; return d; };
    const before = JSON.stringify(progressOnly(phone.store));
    const versionBefore = JSON.parse(phone.store.getItem('prep_v2_sync')).version;
    const r3 = await phone.PS.syncNow();
    ok(!r3.changed, 'a sync with nothing new reports no change');
    eq(progressOnly(phone.store), JSON.parse(before), 'and leaves every progress key untouched');
    eq(JSON.parse(phone.store.getItem('prep_v2_sync')).version, versionBefore,
       'and does not spend a server write when there is nothing to send');
  }

  /* The race the version check exists for: both devices read the same version,
     then both write. Neither session may be lost. */
  {
    const server = { env: { PROGRESS: fakeKV() } };
    const seed = makeClient({ aatPrep_v2: { learn: { lessons: {}, xp: 0 } } }, server);
    await seed.PS.syncNow();                       // remote is now at version 1

    const phone = makeClient(phoneKeys, server);
    const desk = makeClient(deskKeys, server);
    /* Both hold version 1 and both push. The second gets a 409, re-reads,
       merges and retries — so the first device's work must survive. */
    await Promise.all([phone.PS.syncNow(), desk.PS.syncNow()]);
    await phone.PS.syncNow();
    await desk.PS.syncNow();

    const remote = await (await handleRequest(req('GET', null, auth()), server.env)).json();
    const lessons = remote.keys.aatPrep_v2.learn.lessons;
    ok(!!lessons['L-phone'], 'after a simultaneous write the phone\'s lesson is on the server');
    ok(!!lessons['L-desk'], 'and so is the desktop\'s — neither overwrote the other');
    eq(remote.keys.aatPrep_v2.learn.xp, 400, 'the higher XP is what the server ended up holding');
    ok(!('prep_v2_sync' in remote.keys), 'the sync key is never uploaded to the server');
  }

  /* The conflict retry, isolated. The server is made to reject the first write
     with a 409 — as it would if another device slipped in between this device's
     read and its write. ONE syncNow must still land the data, because the retry
     re-reads, re-merges and pushes again. Without the retry this loses the
     session outright. */
  {
    const server = { env: { PROGRESS: fakeKV() } };
    const phone = makeClient(phoneKeys, server);
    /* Put something on the server the phone has not seen, so its remembered
       version is stale exactly once. */
    const seed = makeClient(deskKeys, server);
    await seed.PS.syncNow();

    let rejectedOnce = false;
    const realFetch = phone.g.fetch;
    phone.g.fetch = (url, init) => {
      if (init && init.method === 'PUT' && !rejectedOnce) {
        rejectedOnce = true;
        return Promise.resolve(new Response(JSON.stringify({ error: 'conflict', version: 999 }), { status: 409 }));
      }
      return realFetch(url, init);
    };
    const r = await phone.PS.syncNow();
    ok(rejectedOnce, 'the test really did force a conflict');
    ok(!r.error, 'a single sync survives a conflict and still succeeds');
    const remote = await (await handleRequest(req('GET', null, auth()), server.env)).json();
    ok(!!remote.keys.aatPrep_v2.learn.lessons['L-phone'], 'the conflicting write is retried and its data lands');
    ok(!!remote.keys.aatPrep_v2.learn.lessons['L-desk'], 'and the other device\'s data is still there');
  }

  /* Failure must never damage what is on the device. */
  {
    const server = { env: { PROGRESS: fakeKV() }, down: true };
    const phone = makeClient(phoneKeys, server);
    const before = JSON.stringify(phone.store.dump());
    const r = await phone.PS.syncNow();
    eq(r.error, 'network', 'a dead network is reported as an error, not a success');
    ok(!/network down/.test(phone.PS.status().error), 'the raw fetch failure text is not shown to the user');
    ok(/sync server/i.test(phone.PS.status().error), 'a plain explanation is shown instead — got "' + phone.PS.status().error + '"');
    eq(phone.store.dump(), JSON.parse(before), 'and local progress is untouched');
    eq(phone.PS.status().phase, 'error', 'the status reflects the failure so the UI can show it');

    server.down = false;
    const r2 = await phone.PS.syncNow();
    ok(!r2.error, 'once the network returns, the next sync succeeds');
    eq(phone.PS.status().phase, 'idle', 'and the status clears');
  }

  /* A wrong key must not be retried forever, and must not corrupt anything. */
  {
    const server = { env: { PROGRESS: fakeKV() } };
    const phone = makeClient(phoneKeys, server);
    phone.PS.setKey('WrongKeyButLongEnoughToPassLocal');
    const before = JSON.stringify(phone.PB.readAll(phone.store));
    /* The fake server accepts any well-formed key, so drive the 401 directly. */
    phone.g.fetch = () => Promise.resolve(new Response(JSON.stringify({ error: 'bad_key' }), { status: 401 }));
    const r = await phone.PS.syncNow();
    eq(r.error, 'auth', 'a rejected key is reported as an auth failure');
    eq(phone.PB.readAll(phone.store), JSON.parse(before), 'and progress is untouched');
    eq(phone.PS.retryScheduled(), false, 'a rejected key is NOT retried — it will not fix itself');

    /* A network failure, by contrast, must be retried. */
    phone.PS.setKey(KEY);
    phone.g.fetch = () => Promise.reject(new Error('network down'));
    await phone.PS.syncNow();
    eq(phone.PS.retryScheduled(), true, 'a network failure IS retried');
    phone.PS.cancelRetry();
  }

  /* Offline is a state, not an error. */
  {
    const server = { env: { PROGRESS: fakeKV() } };
    const phone = makeClient(phoneKeys, server);
    phone.g.navigator.onLine = false;
    const r = await phone.PS.syncNow();
    eq(r.skipped, 'offline', 'syncing while offline is skipped rather than attempted');
    eq(phone.PS.status().phase, 'offline', 'and the status says so');
    phone.g.navigator.onLine = true;
    ok(!(await phone.PS.syncNow()).error, 'coming back online syncs normally');
  }

  /* Key handling. */
  {
    const server = { env: { PROGRESS: fakeKV() } };
    const c = makeClient({}, server);
    const k = c.PS.generateKey();
    eq(k.length, c.PS.KEY_LENGTH, 'a generated key is the advertised length');
    ok(/^[A-HJ-NP-Za-km-z2-9]+$/.test(k), 'a generated key avoids characters that are easy to misread');
    ok(c.PS.generateKey() !== c.PS.generateKey(), 'two generated keys differ');
    eq(c.PS.setKey('  ' + k.slice(0, 8) + ' ' + k.slice(8) + '\n'), k, 'a pasted key is accepted despite stray whitespace');
    let threw = false;
    try { c.PS.setKey('tooshort'); } catch (e) { threw = true; }
    ok(threw, 'an obviously wrong key is rejected before any request is made');

    /* Switching to a different key must forget the old document's version,
       or the first write would quote a version belonging to someone else. */
    await c.PS.syncNow();
    ok(JSON.parse(c.store.getItem('prep_v2_sync')).version > 0, 'a successful sync remembers the version');
    c.PS.setKey('Zz9yXw8vUt7sRq6pNm5kJh4gFd3sAb2c');
    eq(JSON.parse(c.store.getItem('prep_v2_sync')).version, 0, 'changing the key resets the remembered version');

    c.PS.clearKey();
    eq(c.PS.isEnabled(), false, 'clearing the key turns sync off');
    eq((await c.PS.syncNow()).skipped, 'disabled', 'and no request is made once it is off');
  }

  /* Without an endpoint configured, sync is simply not available. */
  {
    const server = { env: { PROGRESS: fakeKV() } };
    const c = makeClient({}, server);
    c.g.SYNC_ENDPOINT = '';
    eq(c.PS.isConfigured(), false, 'with no endpoint set, sync reports itself unconfigured');
    eq(c.PS.isEnabled(), false, 'and cannot be enabled');
    eq((await c.PS.syncNow()).skipped, 'disabled', 'and never calls out');
    c.g.SYNC_ENDPOINT = 'http://insecure.example.com';
    eq(c.PS.isConfigured(), false, 'a plain-http endpoint is refused');
  }

  console.log(failures
    ? `\n\x1b[31m\x1b[1m── ${failures} of ${checks} checks failed\x1b[0m\n`
    : `\n\x1b[32m\x1b[1m── Progress sync checks passed ✓\x1b[0m  \x1b[2m(${checks} assertions)\x1b[0m\n`);
  process.exit(failures ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
