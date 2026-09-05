/* AAT Level 2 — service worker
   Offline support via a cache-first, stale-while-revalidate strategy.
   Bump CACHE_VERSION whenever you want to force a clean refresh of cached files. */
'use strict';

var CACHE_VERSION = 'aat-l2-v204';

/* Guitar's files are cached lazily, on first open, rather than precached with
   everything else — its engine, renderer, audio and stylesheet are dead weight
   in the offline install of somebody who only studies AAT.
 *
 * They go in a SEPARATE, UNVERSIONED cache, and that detail is load-bearing.
 * The activate handler below deletes every cache whose key is not the current
 * CACHE_VERSION, so anything lazily cached under the versioned key would be
 * wiped by the next version bump — and a user who updated and then went offline
 * would lose a subject they had been using. Naming it separately and excluding
 * it from the sweep is what stops that.
 *
 * The existing subjects stay in CORE_ASSETS untouched. The README promises
 * every subject works fully offline, so CIPS joins that same core promise now
 * that a complete learner-facing module is exposed in the subject picker. */
var LAZY_CACHE = 'guitar-lazy-v1';
var KEEP_CACHES = [LAZY_CACHE];
var LAZY_PATTERN = /\/guitar-[a-z-]+\.(js|css)$/;

/* Course content — question banks, lessons, syllabus spines — for the
   precached subjects. Guitar's network-first lesson (see the long comment on
   the fetch handler) applies to these too: four consecutive content-accuracy
   releases shipped without a CACHE_VERSION bump, so a returning reader with a
   warm cache was served the UNCORRECTED questions. These files are served
   network-first with the precache as the offline fallback, so a content fix
   reaches readers on the next load whether or not anyone remembered the bump.
   Matches data.js, learn-data.js, aat1-/aat2-/aat3-*-data.js, *-syllabus.js,
   french/lsf/code-route/CIPS data. */
var CONTENT_PATTERN = /\/[a-z0-9-]*(data|syllabus)\.js$/;

/* THE APP ITSELF, and the same argument a second time.
 *
 * Content was moved to network-first because a warm cache served last
 * release's questions. The code was left cache-first, and it has exactly the
 * same problem for exactly the same reason — there is no build step, so
 * app.js is app.js from one release to the next and the cache has no way to
 * tell this week's from a month ago's. The result is worse than a stale
 * lesson: the reader gets CURRENT question data running on OLD code, so the
 * app looks like a build from weeks back while the material inside it is
 * today's. Reported from a phone that had been reloading for a while.
 *
 * The versioned sweep was supposed to cover this. It only runs when the
 * service worker activates, the worker only activates when its own script is
 * seen to change, and if sw.js itself is served from a cache — which it was,
 * the Worker set no Cache-Control at all — then nothing activates and nothing
 * is ever swept. One stale file froze all of them.
 *
 * So the shell joins the content: ask the network, fall back to the cache.
 * Offline is unaffected, because the fallback IS the cache. What it costs is
 * a conditional request per file on a warm load, which is a 304 and no body.
 *
 * Icons, fonts and images are deliberately NOT here. They are the files that
 * genuinely do not change, they are the largest, and they are the ones worth
 * serving instantly from disk. */
var SHELL_PATTERN = /\/[^/]*\.(html|js|css|webmanifest)$/;

/* Surviving the sweep solves half the problem and creates the other half.
 *
 * The versioned cache is rebuilt from the network on every install, so after an
 * update the shell is new. The lazy cache is not touched, and it serves
 * cache-first — so the first guitar session after an update runs the OLD
 * engine, renderer and stylesheet against the NEW app.js, and only the session
 * after that gets the matched pair. One load with a mismatched pair is the
 * whole class of bug that versioning caches exists to prevent.
 *
 * So on activate, refresh whatever is in there. It is at most a handful of
 * files, it happens once per version bump, and it deliberately swallows a
 * network failure: a stale file still beats an empty cache for someone offline.
 * Refreshing rather than deleting is what keeps the offline promise intact. */
function refreshLazyCache() {
  return caches.open(LAZY_CACHE).then(function (cache) {
    return cache.keys().then(function (reqs) {
      return Promise.all(reqs.map(function (req) {
        return fetch(req, { cache: 'reload' }).then(function (res) {
          if (res && res.status === 200) return cache.put(req, res.clone());
        }).catch(function () { /* Offline. Keep the copy we have. */ });
      }));
    });
  }).catch(function () { /* No lazy cache yet: nothing to refresh. */ });
}
var CORE_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './data.js',
  './app.js',
  './progress-backup.js',
  './sync-config.js',
  './progress-sync.js',
  './skills.js',
  './calculator.js',
  './nav-history.js',
  './chrome-offset.js',
  './question-grid.js',
  './spaced.js',
  './sound.js',
  './celebrate.js',
  './learn-data.js',
  './aat2-sheets-data.js',
  './story-data.js',
  './story-proto.js',
  './story-styles.css',
  './aat1-styles.css',
  './aat1-syllabus.js',
  './aat1-learn-data.js',
  './aat1-practice-data.js',
  './aat1-glossary-data.js',
  './aat1-ui.js',
  './aat3-styles.css',
  './aat3-syllabus.js',
  './aat3-tax-data.js',
  './aat3-learn-data.js',
  './aat3-practice-data.js',
  './aat3-faps-data.js',
  './aat3-mats-data.js',
  './aat3-buaw-data.js',
  './aat3-glossary-data.js',
  './aat3-ui.js',
  './cips2.html',
  './cips2-styles.css',
  './cips2-page.js',
  './cips2-bridge.js',
  './cips2-register.js',
  './cips2-theme-bootstrap.js',
  './cips2-l2m1-syllabus.js',
  './cips2-l2m1-learn-data.js',
  './cips2-l2m1-practice-data.js',
  './cips2-l2m2-syllabus.js',
  './cips2-l2m2-learn-data.js',
  './cips2-l2m2-practice-data.js',
  './french-data.js',
  './delf-data.js',
  './img-delf-a1-sp3.svg',
  './img-delf-a2-sp2.svg',
  './lsf-data.js',
  './code-route-data.js',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(function (cache) {
        /* cache: 'reload' bypasses the HTTP cache, so a version bump really
           does fetch fresh copies — the default mode would happily precache
           whatever stale copy the browser already held, on any host that
           serves these files with a max-age. */
        return cache.addAll(CORE_ASSETS.map(function (u) {
          return new Request(u, { cache: 'reload' });
        }));
      })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(keys.map(function (key) {
          if (key !== CACHE_VERSION && KEEP_CACHES.indexOf(key) === -1) return caches.delete(key);
        }));
      })
      .then(function () { return self.clients.claim(); })
      .then(function () {
        /* Refresh the lazy cache in the background, deliberately NOT gating
           activation on it: functional events queue until activation settles,
           so awaiting a fistful of network fetches here would hold every page
           load hostage to a bad connection on each version bump. If the
           worker is stopped before the refresh finishes, the next activate
           simply runs it again. */
        refreshLazyCache();
        // Notify all open tabs that a new version is active so they can prompt a reload.
        return self.clients.matchAll({ type: 'window' }).then(function (clients) {
          clients.forEach(function (client) { client.postMessage({ type: 'SW_UPDATED' }); });
        });
      })
  );
});

self.addEventListener('fetch', function (event) {
  var req = event.request;
  if (req.method !== 'GET') return;
  /* Leave anything off this origin alone. The only cross-origin traffic is the
     progress sync endpoint, and a cached reply from it would mean handing the
     app somebody's older progress and calling it current. */
  /* An exact origin comparison, not a prefix test: "https://site.example"
     is a prefix of "https://site.example.evil.net", and the whole point of
     this guard is that the sync endpoint must never be cached. */
  if (new URL(req.url).origin !== self.location.origin) return;

  /* Lazily-cached subject files: same stale-while-revalidate behaviour, but in
     the cache that survives a version bump. */
  /* NETWORK FIRST, cache as the fallback.
   *
   * This was cache-first, with a background fetch updating the cache for next
   * time. That is the standard stale-while-revalidate shape and it is wrong for
   * this material. These files are the course CONTENT — lessons, exercises, the
   * syllabus — and they change on every content release, so serving the cached
   * copy meant every reader ran one deploy behind, permanently. A whole unit
   * shipped and the lesson list still said "Not written yet", because the copy
   * being served predated it.
   *
   * The versioned refresh in refreshLazyCache() was supposed to cover this and
   * cannot on its own: it only runs on activate, activate only runs on a
   * CACHE_VERSION bump, and remembering to bump the version for a content
   * change is exactly the discipline that fails. Three content releases went
   * out without one.
   *
   * So: ask the network, fall back to the cache when it does not answer. A
   * round trip on a handful of small files is worth paying to never again ship
   * content that readers cannot see. Offline is unaffected — the fallback is
   * the same cache, still excluded from the version sweep. */
  if (LAZY_PATTERN.test(req.url)) {
    event.respondWith(
      caches.open(LAZY_CACHE).then(function (cache) {
        return fetch(req).then(function (res) {
          if (res && res.status === 200) cache.put(req, res.clone());
          return res;
        }).catch(function () {
          return cache.match(req).then(function (hit) {
            return hit || new Response('', { status: 504, statusText: 'Offline' });
          });
        });
      })
    );
    return;
  }

  /* Content files: network first, precache as the offline fallback. The fresh
     copy is written back into the versioned cache so the next offline load is
     current too. Ordered after LAZY_PATTERN — guitar-learn-data.js matches
     both, and guitar's copies live in the unversioned lazy cache. */
  if (CONTENT_PATTERN.test(req.url)) {
    event.respondWith(
      fetch(req).then(function (res) {
        if (res && res.status === 200) {
          var copy = res.clone();
          caches.open(CACHE_VERSION).then(function (cache) { cache.put(req, copy); });
        }
        return res;
      }).catch(function () {
        return caches.match(req).then(function (hit) {
          return hit || new Response('', { status: 504, statusText: 'Offline' });
        });
      })
    );
    return;
  }

  /* The shell — index.html, the players, the stylesheets — network first, for
     the reasons on SHELL_PATTERN. Navigations count: a request for "/" has no
     extension to match, and it is the one that decides which app you get. */
  if (SHELL_PATTERN.test(req.url) || req.mode === 'navigate') {
    event.respondWith(
      fetch(req).then(function (res) {
        if (res && res.status === 200) {
          var copy = res.clone();
          caches.open(CACHE_VERSION).then(function (cache) { cache.put(req, copy); });
        }
        return res;
      }).catch(function () {
        return caches.match(req).then(function (hit) {
          if (hit) return hit;
          if (req.mode === 'navigate') return caches.match('./index.html');
          return new Response('', { status: 504, statusText: 'Offline' });
        });
      })
    );
    return;
  }

  event.respondWith(
    caches.match(req).then(function (cached) {
      // Fetch a fresh copy in the background and update the cache.
      var networkFetch = fetch(req).then(function (res) {
        if (res && res.status === 200 && new URL(req.url).origin === self.location.origin) {
          var copy = res.clone();
          caches.open(CACHE_VERSION).then(function (cache) { cache.put(req, copy); });
        }
        return res;
      }).catch(function () { return null; });

      // Serve cached immediately if present; otherwise wait for the network.
      if (cached) return cached;
      return networkFetch.then(function (res) {
        if (res) return res;
        // Offline and uncached — fall back to the app shell for navigations.
        if (req.mode === 'navigate') return caches.match('./index.html');
        return new Response('', { status: 504, statusText: 'Offline' });
      });
    })
  );
});