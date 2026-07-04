(function () {
  'use strict';

  var lastTap = 0;
  var suppressClickUntil = 0;
  var addedState = false;

  function ov() { return document.getElementById('rpgOverlay'); }
  function world() { var o = ov(); return !!(o && o.querySelector('.rpg-world')); }
  function full() { var o = ov(); return !!(o && o.classList.contains('rpg-map-fullscreen')); }
  function pnl() { var o = ov(); return o ? o.querySelector('.rpg-panel') : null; }
  function wrap() { var o = ov(); return o ? o.querySelector('.rpg-pixel-map-wrap') : null; }
  function ctrl(t) { return t && t.closest ? t.closest('#rpgOverlay [data-dir], #rpgOverlay [data-interact], #rpgOverlay [data-fs-exit]') : null; }

  function keepMap() {
    var p = pnl();
    var w = wrap();
    if (!p || !w) return;
    p.scrollTop = full() ? 0 : Math.max(0, w.offsetTop - 12);
    if (w.scrollWidth > w.clientWidth) w.scrollLeft = Math.max(0, (w.scrollWidth - w.clientWidth) / 2);
  }

  function keepSoon() {
    requestAnimationFrame(function () { requestAnimationFrame(keepMap); });
    setTimeout(keepMap, 50);
    setTimeout(keepMap, 150);
  }

  function addPad() {
    var o = ov();
    if (!o || o.querySelector('.rpg-fs-controls')) return;
    var d = document.createElement('div');
    d.className = 'rpg-fs-controls';
    d.innerHTML = '<button class="rpg-fs-exit" data-fs-exit type="button">×</button><div class="rpg-fs-dpad"><span></span><button data-dir="up" type="button">▲</button><span></span><button data-dir="left" type="button">◀</button><button data-interact type="button">●</button><button data-dir="right" type="button">▶</button><span></span><button data-dir="down" type="button">▼</button><span></span></div><div class="rpg-fs-abxy"><button data-interact type="button">Y</button><button data-interact type="button">X</button><button data-fs-exit type="button">B</button><button data-interact type="button">A</button></div><div class="rpg-fs-hint">Double tap map to exit</div>';
    o.appendChild(d);
  }

  function enter() {
    var o = ov();
    if (!o || !world()) return;
    o.classList.add('rpg-map-fullscreen');
    document.body.classList.add('rpg-map-fullscreen-body');
    addPad();
    keepSoon();
    if (!addedState && history && history.pushState) {
      try { history.pushState({ rpgFull: true }, '', location.href); addedState = true; } catch (e) {}
    }
  }

  function exit(fromPop) {
    var o = ov();
    if (o) o.classList.remove('rpg-map-fullscreen');
    document.body.classList.remove('rpg-map-fullscreen-body');
    var shouldGoBack = addedState && !fromPop;
    addedState = false;
    keepSoon();
    if (shouldGoBack) { try { history.back(); } catch (e) {} }
  }

  function activate(button) {
    if (!button) return;
    if (button.hasAttribute('data-fs-exit')) return exit(false);
    suppressClickUntil = Date.now() + 550;
    setTimeout(function () { button.click(); keepSoon(); }, 0);
  }

  document.addEventListener('pointerdown', function (e) {
    if (!ctrl(e.target)) return;
    e.preventDefault();
  }, { capture: true, passive: false });

  document.addEventListener('pointerup', function (e) {
    var b = ctrl(e.target);
    if (!b) return;
    e.preventDefault();
    e.stopPropagation();
    activate(b);
  }, { capture: true, passive: false });

  document.addEventListener('click', function (e) {
    var b = ctrl(e.target);
    if (b && Date.now() < suppressClickUntil) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if (!world()) return;
    var m = e.target && e.target.closest ? e.target.closest('#rpgOverlay .rpg-pixel-map-wrap, #rpgOverlay .rpg-pixel-map') : null;
    if (!m) return;
    var now = Date.now();
    if (now - lastTap < 360) {
      e.preventDefault();
      if (full()) exit(false); else enter();
      lastTap = 0;
    } else {
      lastTap = now;
    }
  }, { capture: true, passive: false });

  window.addEventListener('popstate', function () {
    if (full()) exit(true);
  });

  document.addEventListener('keydown', function (e) {
    if (!world()) return;
    if (e.key === 'Escape' && full()) { e.preventDefault(); exit(false); return; }
    keepSoon();
  }, { capture: true });

  if (window.MutationObserver) {
    new MutationObserver(function () {
      if (!ov()) document.body.classList.remove('rpg-map-fullscreen-body');
      if (full()) addPad();
    }).observe(document.body, { childList: true, subtree: true });
  }
}());
