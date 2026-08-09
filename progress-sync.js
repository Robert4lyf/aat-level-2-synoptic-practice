/* Progress sync — keeps devices in step without exporting and importing a file.
 *
 * This module is only transport. Everything difficult about combining two
 * devices' progress is in progress-backup.js, and this reuses it unchanged:
 * pull the remote document, merge it into what is here, write the result, push
 * it back. Because that merge is idempotent and order-independent, "pull, merge,
 * push" is all the reconciliation there is — no version vectors, no operation
 * log, no conflict UI.
 *
 * THE RACE, AND WHY If-Match IS NOT OPTIONAL
 *
 * Two devices can read the same remote version at once. Without a check both
 * would then write on top of it and whichever landed second would erase the
 * first. So every write quotes the version it is replacing; the server rejects a
 * stale one with 409, and this module re-pulls, merges again and retries. The
 * merge being idempotent is what makes that retry safe rather than a source of
 * duplicated counts.
 *
 * FAILING QUIETLY IS THE POINT
 *
 * The app is offline-first and was completely usable before sync existed. A
 * network that is down, a Worker that is not deployed, a key that is wrong —
 * none of these may interrupt studying. Every failure here leaves local progress
 * exactly as it was, records a status the Progress screen can show, and retries
 * later. Sync is a convenience laid on top of local storage, never a dependency
 * in front of it.
 */
(function (root) {
  'use strict';

  var STORE_KEY = 'prep_v2_sync';       // { key, version, lastSyncAt }
  var KEY_LENGTH = 32;
  var PUSH_DEBOUNCE_MS = 4000;          // let a burst of answers settle into one write
  var MAX_CONFLICT_RETRIES = 3;
  var BACKOFF_MS = [2000, 6000, 15000, 40000];

  /* Unambiguous alphabet: no O/0, no I/l/1. The key gets read off one screen and
     typed into another, and a character you cannot tell apart is a support
     problem with no support to call. */
  var ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';

  var listeners = [];
  var state = { phase: 'off', error: '', lastSyncAt: 0, inFlight: false };
  var pushTimer = null, retryTimer = null, retryStep = 0;

  function endpoint() {
    var e = root.SYNC_ENDPOINT;
    return (typeof e === 'string' && /^https:\/\//.test(e)) ? e.replace(/\/+$/, '') : '';
  }
  function isConfigured() { return !!endpoint(); }

  function load() {
    try {
      var raw = root.localStorage.getItem(STORE_KEY);
      var p = raw ? JSON.parse(raw) : null;
      return (p && typeof p === 'object') ? p : {};
    } catch (e) { return {}; }
  }
  function save(o) {
    try { root.localStorage.setItem(STORE_KEY, JSON.stringify(o)); } catch (e) {}
  }

  function getKey() { return load().key || ''; }
  function isEnabled() { return isConfigured() && !!getKey(); }

  function generateKey() {
    var out = '', i;
    var buf = new Uint8Array(KEY_LENGTH);
    if (root.crypto && root.crypto.getRandomValues) root.crypto.getRandomValues(buf);
    else for (i = 0; i < KEY_LENGTH; i++) buf[i] = Math.floor(Math.random() * 256);
    for (i = 0; i < KEY_LENGTH; i++) out += ALPHABET[buf[i] % ALPHABET.length];
    return out;
  }

  /* A pasted key arrives with whatever whitespace the clipboard picked up. */
  function normaliseKey(k) { return String(k || '').replace(/\s+/g, ''); }

  function setKey(k) {
    var key = normaliseKey(k);
    if (key.length < 24) throw new Error('That does not look like a sync key — they are ' + KEY_LENGTH + ' characters long.');
    var o = load();
    /* A different key means a different document: the version we remember
       belongs to the old one and must not be quoted against the new. */
    if (o.key !== key) o.version = 0;
    o.key = key;
    save(o);
    setPhase('idle');
    return key;
  }

  function clearKey() {
    save({});
    setPhase('off');
  }

  function setPhase(phase, error) {
    state.phase = phase;
    state.error = error || '';
    state.lastSyncAt = load().lastSyncAt || 0;
    for (var i = 0; i < listeners.length; i++) {
      try { listeners[i](status()); } catch (e) {}
    }
  }
  function status() {
    return {
      configured: isConfigured(),
      enabled: isEnabled(),
      phase: state.phase,
      error: state.error,
      lastSyncAt: load().lastSyncAt || 0,
    };
  }
  function onChange(fn) { if (typeof fn === 'function') listeners.push(fn); }

  /* ── Network ────────────────────────────────────────────────────────────── */

  function request(method, body, ifMatch) {
    var headers = { 'Authorization': 'Bearer ' + getKey() };
    var init = { method: method, headers: headers, cache: 'no-store' };
    if (body != null) {
      headers['Content-Type'] = 'application/json';
      init.body = JSON.stringify(body);
    }
    if (ifMatch != null) headers['If-Match'] = String(ifMatch);
    return root.fetch(endpoint() + '/state', init);
  }

  /* ── Sync ───────────────────────────────────────────────────────────────── */

  /* One pull-merge-push. Returns { changed } where `changed` means the local
     store gained something from the remote — the caller uses that to decide
     whether the screen needs redrawing. */
  function syncOnce(attempt) {
    var PB = root.ProgressBackup;
    if (!PB) return Promise.resolve({ changed: false });

    var meta = load();
    var changed = false;

    return request('GET').then(function (res) {
      if (res.status === 401) throw tagged('auth', 'That sync key was rejected.');
      if (res.status === 404) return null;                 // nothing stored yet
      if (!res.ok) throw tagged('server', 'Sync server returned ' + res.status + '.');
      return res.json();
    }).then(function (remote) {
      var local = PB.readAll();
      var merged;
      if (remote && remote.keys) {
        merged = PB.mergeAll(local, remote.keys);
        /* Only touch localStorage when the remote actually contributed
           something, so a routine sync does not rewrite every key. */
        if (JSON.stringify(merged) !== JSON.stringify(local)) {
          PB.writeAll(merged);
          changed = true;
        }
      } else {
        merged = local;
      }
      var version = remote ? remote.version : 0;
      var outgoing = PB.forExport(merged);

      /* If the server already holds exactly this, there is nothing to say. A
         device that is simply open and idle then costs one GET per sync rather
         than a GET and a write — which matters, because the free tier allows a
         hundred times more reads than writes. */
      if (remote && JSON.stringify(outgoing) === JSON.stringify(remote.keys)) {
        var m0 = load();
        m0.version = version;
        m0.lastSyncAt = Date.now();
        save(m0);
        return { changed: changed };
      }

      return request('PUT', { keys: outgoing }, version).then(function (res) {
        if (res.status === 409) {
          if (attempt >= MAX_CONFLICT_RETRIES) throw tagged('conflict', 'Another device kept writing first — will try again shortly.');
          return syncOnce(attempt + 1).then(function (r) { return { changed: changed || r.changed }; });
        }
        if (res.status === 401) throw tagged('auth', 'That sync key was rejected.');
        if (res.status === 413) throw tagged('server', 'Progress is too large to sync.');
        if (!res.ok) throw tagged('server', 'Sync server returned ' + res.status + '.');
        return res.json().then(function (out) {
          var m = load();
          m.version = out.version;
          m.lastSyncAt = Date.now();
          save(m);
          return { changed: changed };
        });
      });
    });
  }

  function tagged(kind, message) {
    var e = new Error(message); e.kind = kind; return e;
  }

  function syncNow(opts) {
    var o = opts || {};
    if (!isEnabled()) return Promise.resolve({ changed: false, skipped: 'disabled' });
    if (state.inFlight) return Promise.resolve({ changed: false, skipped: 'busy' });
    if (root.navigator && root.navigator.onLine === false) {
      setPhase('offline');
      return Promise.resolve({ changed: false, skipped: 'offline' });
    }
    state.inFlight = true;
    setPhase('syncing');
    return syncOnce(0).then(function (r) {
      state.inFlight = false;
      retryStep = 0;
      setPhase('idle');
      if (r.changed && typeof o.onRemoteChange === 'function') o.onRemoteChange();
      return r;
    }).catch(function (err) {
      state.inFlight = false;
      var kind = err && err.kind ? err.kind : 'network';
      /* A raw fetch rejection says "Failed to fetch", which means nothing to
         somebody looking at a study app. Only messages this module wrote itself
         are fit to show; anything else gets a plain one. */
      var message = (err && err.kind && err.message) ? err.message : 'Could not reach the sync server.';
      setPhase('error', message);
      /* An authentication failure will not fix itself, so do not hammer it. */
      if (kind !== 'auth') scheduleRetry(o);
      return { changed: false, error: kind };
    });
  }

  function retryScheduled() { return retryTimer !== null; }

  function scheduleRetry(opts) {
    if (retryTimer) clearTimeout(retryTimer);
    var wait = BACKOFF_MS[Math.min(retryStep, BACKOFF_MS.length - 1)];
    retryStep++;
    retryTimer = setTimeout(function () { syncNow(opts); }, wait);
  }

  /* Called by the app whenever it has just saved. Debounced, because answering
     ten questions in a row is one write, not ten. */
  function noteLocalChange(opts) {
    if (!isEnabled()) return;
    if (pushTimer) clearTimeout(pushTimer);
    pushTimer = setTimeout(function () { syncNow(opts); }, PUSH_DEBOUNCE_MS);
  }

  /* Push whatever is pending without waiting out the debounce. Used when the
     page is being hidden or closed, which is exactly when a pending write would
     otherwise be lost. */
  function flush(opts) {
    if (pushTimer) { clearTimeout(pushTimer); pushTimer = null; }
    return syncNow(opts);
  }

  function init(opts) {
    var o = opts || {};
    setPhase(isEnabled() ? 'idle' : 'off');
    if (!isEnabled()) return;

    syncNow(o);

    if (root.document && root.document.addEventListener) {
      root.document.addEventListener('visibilitychange', function () {
        if (root.document.visibilityState === 'visible') syncNow(o);
        else flush(o);
      });
    }
    if (root.addEventListener) {
      root.addEventListener('online', function () { retryStep = 0; syncNow(o); });
      root.addEventListener('offline', function () { setPhase('offline'); });
      root.addEventListener('pagehide', function () { flush(o); });
    }
  }

  root.ProgressSync = {
    STORE_KEY: STORE_KEY,
    KEY_LENGTH: KEY_LENGTH,
    isConfigured: isConfigured,
    isEnabled: isEnabled,
    generateKey: generateKey,
    normaliseKey: normaliseKey,
    getKey: getKey,
    setKey: setKey,
    clearKey: clearKey,
    status: status,
    onChange: onChange,
    syncNow: syncNow,
    flush: flush,
    noteLocalChange: noteLocalChange,
    init: init,
    /* Exposed so the tests can assert that an authentication failure is NOT
       retried while a network failure IS — behaviour that is otherwise
       invisible until it has been hammering a server for an hour. */
    retryScheduled: retryScheduled,
    cancelRetry: function () { if (retryTimer) { clearTimeout(retryTimer); retryTimer = null; } },
  };
}(typeof window !== 'undefined' ? window : globalThis));

if (typeof module !== 'undefined' && module.exports) module.exports = (typeof window !== 'undefined' ? window : globalThis).ProgressSync;
