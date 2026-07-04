(function () {
  'use strict';

  var lastTap = 0;
  var addedState = false;

  function loadCss() {
    if (document.querySelector('link[href="rpg-fullscreen.css"]')) return;
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = 'rpg-fullscreen.css';
    document.head.appendChild(l);
  }

  function ov() { return document.getElementById('rpgOverlay'); }
  function world() { var o = ov(); return !!(o && o.querySelector('.rpg-world')); }
  function full() { var o = ov(); return !!(o && o.classList.contains('rpg-map-fullscreen')); }
  function pnl() { var o = ov(); return o ? o.querySelector('.rpg-panel') : null; }
  function wrap() { var o = ov(); return o ? o.querySelector('.rpg-pixel-map-wrap') : null; }
  function fsExit(t) { return t && t.closest ? t.closest('#rpgOverlay [data-fs-exit]') : null; }
  function isMoveControl(t) { return !!(t && t.closest && t.closest('#rpgOverlay [data-dir], #rpgOverlay [data-interact]')); }

  function hidePracticeCard() {
    var card = document.getElementById('rpgDemoBtn');
    if (card) card.style.display = 'none';
  }

  function openLedgerLegends() {
    var tryClick = function () {
      var card = document.getElementById('rpgDemoBtn');
      if (card) { card.click(); return true; }
      return false;
    };
    if (tryClick()) return;
    var home = document.getElementById('homeNavBtn');
    if (home) home.click();
    setTimeout(tryClick, 80);
    setTimeout(tryClick, 250);
    setTimeout(tryClick, 650);
  }

  function addHeaderButton() {
    var header = document.querySelector('.header-right');
    if (!header || document.getElementById('ledgerLegendsNavBtn')) return;
    var btn = document.createElement('button');
    btn.id = 'ledgerLegendsNavBtn';
    btn.className = 'icon-btn ledger-legends-nav-btn';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Open Ledger Legends');
    btn.textContent = '🗺️ Ledger';
    btn.addEventListener('click', function (event) {
      event.preventDefault();
      openLedgerLegends();
    });
    var ref = document.getElementById('referenceToggle') || document.getElementById('darkToggle') || document.getElementById('homeNavBtn');
    if (ref && ref.parentNode === header) header.insertBefore(btn, ref);
    else header.appendChild(btn);
  }

  function maintainHeaderAccess() {
    addHeaderButton();
    hidePracticeCard();
  }

  function keepMap() {
    var p = pnl();
    var w = wrap();
    if (!p || !w) return;
    p.scrollTop = full() ? 0 : Math.max(0, w.offsetTop - 12);
    if (!full() && w.scrollWidth > w.clientWidth) w.scrollLeft = Math.max(0, (w.scrollWidth - w.clientWidth) / 2);
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

  document.addEventListener('pointerdown', function (e) {
    if (!isMoveControl(e.target) && !fsExit(e.target)) return;
    e.preventDefault();
  }, { capture: true, passive: false });

  document.addEventListener('click', function (e) {
    if (fsExit(e.target)) {
      e.preventDefault();
      e.stopPropagation();
      exit(false);
      return;
    }

    if (isMoveControl(e.target)) {
      keepSoon();
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
      maintainHeaderAccess();
      if (!ov()) document.body.classList.remove('rpg-map-fullscreen-body');
      if (full()) addPad();
    }).observe(document.body, { childList: true, subtree: true });
  }

  loadCss();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', maintainHeaderAccess);
  else maintainHeaderAccess();
}());
