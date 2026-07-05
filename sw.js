/* AAT Level 2 Synoptic Practice — service worker
   Offline support via a cache-first, stale-while-revalidate strategy.
   Bump CACHE_VERSION whenever you want to force a clean refresh of cached files. */
'use strict';

var CACHE_VERSION = 'aat-l2-practice-v57';
var CORE_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './data.js',
  './app.js',
  './rpg-demo.css',
  './rpg-fullscreen.css',
  './rpg-normal-fix.css',
  './rpg-player-animation.css',
  './rpg-demo.js',
  './rpg-scroll-fix.js',
  './rpg-player-animation.js',
  './skills.js',
  './learn-data.js',
  './french-data.js',
  './delf-data.js',
  './img-delf-a1-sp3.svg',
  './img-delf-a2-sp2.svg',
  './lsf-data.js',
  './code-route-data.js',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  // Ledger Legends pixel art — precached so the RPG renders fully offline and
  // updates land with the cache-version bump instead of trickling in lazily.
  './rpg-assets/char-player.png',
  './rpg-assets/char-player-down.png',
  './rpg-assets/char-player-up.png',
  './rpg-assets/char-player-left.png',
  './rpg-assets/char-player-right.png',
  './rpg-assets/boss-itbk.png',
  './rpg-assets/boss-pobc.png',
  './rpg-assets/boss-poc.png',
  './rpg-assets/boss-besy.png',
  './rpg-assets/boss-league.png',
  './rpg-assets/wild-slime.png',
  './rpg-assets/wild-bat.png',
  './rpg-assets/wild-imp.png',
  './rpg-assets/wild-sprite.png',
  './rpg-assets/npc-professor.png',
  './rpg-assets/npc-professor-down.png',
  './rpg-assets/npc-professor-up.png',
  './rpg-assets/npc-professor-left.png',
  './rpg-assets/npc-professor-right.png',
  './rpg-assets/npc-librarian.png',
  './rpg-assets/npc-librarian-down.png',
  './rpg-assets/npc-librarian-up.png',
  './rpg-assets/npc-librarian-left.png',
  './rpg-assets/npc-librarian-right.png',
  './rpg-assets/npc-fox_scribe.png',
  './rpg-assets/npc-fox_scribe-down.png',
  './rpg-assets/npc-fox_scribe-up.png',
  './rpg-assets/npc-fox_scribe-left.png',
  './rpg-assets/npc-fox_scribe-right.png',
  './rpg-assets/npc-badger_judge.png',
  './rpg-assets/npc-badger_judge-down.png',
  './rpg-assets/npc-badger_judge-up.png',
  './rpg-assets/npc-badger_judge-left.png',
  './rpg-assets/npc-badger_judge-right.png',
  './rpg-assets/npc-mole_clerk.png',
  './rpg-assets/npc-mole_clerk-down.png',
  './rpg-assets/npc-mole_clerk-up.png',
  './rpg-assets/npc-mole_clerk-left.png',
  './rpg-assets/npc-mole_clerk-right.png',
  './rpg-assets/npc-apprentice.png',
  './rpg-assets/npc-apprentice-down.png',
  './rpg-assets/npc-apprentice-up.png',
  './rpg-assets/npc-apprentice-left.png',
  './rpg-assets/npc-apprentice-right.png',
  './rpg-assets/npc-mayor.png',
  './rpg-assets/npc-mayor-down.png',
  './rpg-assets/npc-mayor-up.png',
  './rpg-assets/npc-mayor-left.png',
  './rpg-assets/npc-mayor-right.png',
  './rpg-assets/npc-cat_merchant.png',
  './rpg-assets/npc-cat_merchant-down.png',
  './rpg-assets/npc-cat_merchant-up.png',
  './rpg-assets/npc-cat_merchant-left.png',
  './rpg-assets/npc-cat_merchant-right.png',
  './rpg-assets/npc-beaver_builder.png',
  './rpg-assets/npc-beaver_builder-down.png',
  './rpg-assets/npc-beaver_builder-up.png',
  './rpg-assets/npc-beaver_builder-left.png',
  './rpg-assets/npc-beaver_builder-right.png',
  './rpg-assets/npc-otter_fisher.png',
  './rpg-assets/npc-otter_fisher-down.png',
  './rpg-assets/npc-otter_fisher-up.png',
  './rpg-assets/npc-otter_fisher-left.png',
  './rpg-assets/npc-otter_fisher-right.png',
  './rpg-assets/npc-frog_cashier.png',
  './rpg-assets/npc-frog_cashier-down.png',
  './rpg-assets/npc-frog_cashier-up.png',
  './rpg-assets/npc-frog_cashier-left.png',
  './rpg-assets/npc-frog_cashier-right.png',
  './rpg-assets/npc-duck_clerk.png',
  './rpg-assets/npc-duck_clerk-down.png',
  './rpg-assets/npc-duck_clerk-up.png',
  './rpg-assets/npc-duck_clerk-left.png',
  './rpg-assets/npc-duck_clerk-right.png',
  './rpg-assets/npc-raven_ledger.png',
  './rpg-assets/npc-raven_ledger-down.png',
  './rpg-assets/npc-raven_ledger-up.png',
  './rpg-assets/npc-raven_ledger-left.png',
  './rpg-assets/npc-raven_ledger-right.png',
  './rpg-assets/npc-owl_auditor.png',
  './rpg-assets/npc-owl_auditor-down.png',
  './rpg-assets/npc-owl_auditor-up.png',
  './rpg-assets/npc-owl_auditor-left.png',
  './rpg-assets/npc-owl_auditor-right.png',
  './rpg-assets/npc-bear_smith.png',
  './rpg-assets/npc-bear_smith-down.png',
  './rpg-assets/npc-bear_smith-up.png',
  './rpg-assets/npc-bear_smith-left.png',
  './rpg-assets/npc-bear_smith-right.png',
  './rpg-assets/npc-baker.png',
  './rpg-assets/npc-baker-down.png',
  './rpg-assets/npc-baker-up.png',
  './rpg-assets/npc-baker-left.png',
  './rpg-assets/npc-baker-right.png',
  './rpg-assets/npc-tealady.png',
  './rpg-assets/npc-tealady-down.png',
  './rpg-assets/npc-tealady-up.png',
  './rpg-assets/npc-tealady-left.png',
  './rpg-assets/npc-tealady-right.png',
  './rpg-assets/npc-lamplighter.png',
  './rpg-assets/npc-lamplighter-down.png',
  './rpg-assets/npc-lamplighter-up.png',
  './rpg-assets/npc-lamplighter-left.png',
  './rpg-assets/npc-lamplighter-right.png',
  './rpg-assets/npc-bard.png',
  './rpg-assets/npc-bard-down.png',
  './rpg-assets/npc-bard-up.png',
  './rpg-assets/npc-bard-left.png',
  './rpg-assets/npc-bard-right.png',
  './rpg-assets/npc-treasurer.png',
  './rpg-assets/npc-treasurer-down.png',
  './rpg-assets/npc-treasurer-up.png',
  './rpg-assets/npc-treasurer-left.png',
  './rpg-assets/npc-treasurer-right.png',
  './rpg-assets/scene-forest.png',
  './rpg-assets/scene-cave.png',
  './rpg-assets/scene-factory.png',
  './rpg-assets/scene-town.png',
  './rpg-assets/tile-grass-1.png',
  './rpg-assets/tile-grass-2.png',
  './rpg-assets/tile-grass-3.png',
  './rpg-assets/tile-path-1.png',
  './rpg-assets/tile-path-2.png',
  './rpg-assets/tile-flower-1.png',
  './rpg-assets/tile-flower-2.png',
  './rpg-assets/tile-flower-3.png',
  './rpg-assets/tile-tree-1.png',
  './rpg-assets/tile-tree-2.png',
  './rpg-assets/tile-tree-3.png',
  './rpg-assets/tile-rock.png',
  './rpg-assets/tile-sign.png',
  './rpg-assets/tile-book.png',
  './rpg-assets/tile-well.png',
  './rpg-assets/tile-ledger-stone.png',
  './rpg-assets/tile-pathlamp.png',
  './rpg-assets/tile-mushroom.png',
  './rpg-assets/tile-flowerbed.png',
  './rpg-assets/tile-pond.png',
  './rpg-assets/tile-bush.png',
  './rpg-assets/tile-fence.png',
  './rpg-assets/tile-fountain.png',
  './rpg-assets/tile-barrel.png',
  './rpg-assets/tile-crop.png',
  './rpg-assets/tile-house-1.png',
  './rpg-assets/tile-house-2.png',
  './rpg-assets/tile-factory-wall.png',
  './rpg-assets/tile-gate-forest.png',
  './rpg-assets/tile-gate-cave.png',
  './rpg-assets/tile-gate-factory.png',
  './rpg-assets/tile-gate-town.png'
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