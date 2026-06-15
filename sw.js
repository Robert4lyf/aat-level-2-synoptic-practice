/* AAT Level 2 Synoptic Practice — service worker
   Offline support via a cache-first, stale-while-revalidate strategy.
   Bump CACHE_VERSION whenever you want to force a clean refresh of cached files. */
'use strict';

var CACHE_VERSION = 'aat-l2-practice-v8';
var CORE_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './data.js',
  './app.js',
  './skills.js',
  './learn-data.js',
  './french-data.js',
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
          if (key !== CACHE_VERSION) return caches.delete(key);
        }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (event) {
  var req = event.request;
  if (req.method !== 'GET') return;

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
