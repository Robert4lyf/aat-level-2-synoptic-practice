/* Ledger Legends scroll stabiliser.
   Keeps the map visible after D-pad movement and prevents touch controls from scrolling the page. */
(function () {
  'use strict';

  var lastControlAt = 0;

  function overlay() { return document.getElementById('rpgOverlay'); }
  function panel() { var o = overlay(); return o ? o.querySelector('.rpg-panel') : null; }
  function mapSection() { var o = overlay(); return o ? (o.querySelector('.rpg-map-layout') || o.querySelector('.rpg-pixel-map-wrap')) : null; }
  function isWorldOpen() { var o = overlay(); return !!(o && o.querySelector('.rpg-world')); }
  function isControlTarget(target) {
    return !!(target && target.closest && target.closest('#rpgOverlay [data-dir], #rpgOverlay [data-interact]'));
  }

  function keepMapVisible() {
    var p = panel();
    var m = mapSection();
    if (!p || !m) return;
    var nextTop = Math.max(0, m.offsetTop - 10);
    p.scrollTop = nextTop;
    var wrap = overlay() && overlay().querySelector('.rpg-pixel-map-wrap');
    if (wrap && wrap.scrollWidth > wrap.clientWidth) {
      wrap.scrollLeft = Math.max(0, (wrap.scrollWidth - wrap.clientWidth) / 2);
    }
  }

  function restoreSoon() {
    lastControlAt = Date.now();
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(keepMapVisible);
    });
    window.setTimeout(keepMapVisible, 40);
    window.setTimeout(keepMapVisible, 120);
  }

  document.addEventListener('pointerdown', function (event) {
    if (!isControlTarget(event.target)) return;
    event.preventDefault();
    restoreSoon();
  }, { capture: true, passive: false });

  document.addEventListener('touchstart', function (event) {
    if (!isControlTarget(event.target)) return;
    event.preventDefault();
    restoreSoon();
  }, { capture: true, passive: false });

  document.addEventListener('click', function (event) {
    if (!isControlTarget(event.target)) return;
    event.preventDefault();
    restoreSoon();
  }, { capture: true, passive: false });

  document.addEventListener('keydown', function (event) {
    if (!isWorldOpen()) return;
    var key = String(event.key || '').toLowerCase();
    if (key === 'arrowup' || key === 'arrowdown' || key === 'arrowleft' || key === 'arrowright' || key === 'w' || key === 'a' || key === 's' || key === 'd' || key === 'enter' || key === ' ') {
      restoreSoon();
    }
  }, { capture: true });

  if (window.MutationObserver) {
    new MutationObserver(function () {
      if (Date.now() - lastControlAt < 900) keepMapVisible();
    }).observe(document.body, { childList: true, subtree: true });
  }
}());
