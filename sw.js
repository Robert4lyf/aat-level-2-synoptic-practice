/* AAT Level 2 — service worker
   Offline support via a cache-first, stale-while-revalidate strategy.
   Bump CACHE_VERSION whenever you want to force a clean refresh of cached files. */
'use strict';

var CACHE_VERSION = 'aat-l2-v114';

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
 * The existing seven subjects stay in CORE_ASSETS untouched. The README
 * promises every subject works fully offline, and quietly moving French or LSF
 * out to tidy this up would break that for people who already rely on it. */
var LAZY_CACHE = 'guitar-lazy-v1';
var KEEP_CACHES = [LAZY_CACHE];
var LAZY_PATTERN = /\/guitar-[a-z-]+\.(js|css)$/;

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
  './learn-data.js',
  './story-data.js',
  './story-proto.js',
  './story-styles.css',
  './aat1-styles.css',
  './aat1-syllabus.js',
  './aat1-learn-data.js',
  './aat1-practice-data.js',
  './aat1-ui.js',
  './aat3-styles.css',
  './aat3-syllabus.js',
  './aat3-tax-data.js',
  './aat3-learn-data.js',
  './aat3-practice-data.js',
  './aat3-faps-data.js',
  './aat3-ui.js',
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
      .then(function (cache) { return cache.addAll(CORE_ASSETS); })
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
      .then(function () { return refreshLazyCache(); })
      .then(function () { return self.clients.claim(); })
      .then(function () {
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
  if (req.url.indexOf(self.location.origin) !== 0) return;

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

  event.respondWith(
    caches.match(req).then(function (cached) {
      // Fetch a fresh copy in the background and update the cache.
      var networkFetch = fetch(req).then(function (res) {
        if (res && res.status === 200 && req.url.indexOf(self.location.origin) === 0) {
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