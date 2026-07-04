(function () {
  'use strict';

  var lastTap = 0;
  var addedState = false;
  var desiredFullscreen = false;
  var justMovedAt = 0;
  var missingOverlayTimer = null;

  function loadOneCss(href) {
    if (document.querySelector('link[href="' + href + '"]')) return;
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = href;
    document.head.appendChild(l);
  }

  function loadCss() {
    loadOneCss('rpg-fullscreen.css');
    loadOneCss('rpg-normal-fix.css');
  }

  function ov() { return document.getElementById('rpgOverlay'); }
  function world() { var o = ov(); return !!(o && o.querySelector('.rpg-world')); }
  function full() { var o = ov(); return !!(o && o.classList.contains('rpg-map-fullscreen')); }
  function pnl() { var o = ov(); return o ? o.querySelector('.rpg-panel') : null; }
  function wrap() { var o = ov(); return o ? o.querySelector('.rpg-pixel-map-wrap') : null; }
  function playerTile() { var o = ov(); return o ? o.querySelector('.rpg-player-tile') : null; }
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

  function addPad() {
    var o = ov();
    if (!o || o.querySelector('.rpg-fs-controls')) return;
    var d = document.createElement('div');
    d.className = 'rpg-fs-controls';
    d.innerHTML = '<button tabindex="-1" class="rpg-fs-exit" data-fs-exit type="button">×</button><div class="rpg-fs-dpad"><span></span><button tabindex="-1" data-dir="up" type="button">▲</button><span></span><button tabindex="-1" data-dir="left" type="button">◀</button><button tabindex="-1" data-interact type="button">●</button><button tabindex="-1" data-dir="right" type="button">▶</button><span></span><button tabindex="-1" data-dir="down" type="button">▼</button><span></span></div><div class="rpg-fs-abxy"><button tabindex="-1" data-interact type="button">Y</button><button tabindex="-1" data-interact type="button">X</button><button tabindex="-1" data-fs-exit type="button">B</button><button tabindex="-1" data-interact type="button">A</button></div><div class="rpg-fs-hint">Double tap map to exit</div>';
    o.appendChild(d);
  }

  function applyFullscreenClass() {
    var o = ov();
    if (!o || !world()) return false;
    o.classList.add('rpg-map-fullscreen');
    document.body.classList.add('rpg-map-fullscreen-body');
    addPad();
    return true;
  }

  function centerOnPlayer() {
    var w = wrap();
    var p = playerTile();
    if (!w || !p) return false;
    var wr = w.getBoundingClientRect();
    var pr = p.getBoundingClientRect();
    var left = w.scrollLeft + (pr.left - wr.left) - (w.clientWidth / 2) + (pr.width / 2);
    var top = w.scrollTop + (pr.top - wr.top) - (w.clientHeight / 2) + (pr.height / 2);
    w.scrollLeft = Math.max(0, left);
    w.scrollTop = Math.max(0, top);
    return true;
  }

  function keepMap() {
    var p = pnl();
    var w = wrap();
    if (!p || !w) return;
    if (desiredFullscreen) applyFullscreenClass();
    if (!desiredFullscreen && p) p.scrollTop = Math.max(0, w.offsetTop - 12);
    centerOnPlayer();
  }

  function keepSoon() {
    requestAnimationFrame(function () { requestAnimationFrame(keepMap); });
    setTimeout(keepMap, 20);
    setTimeout(keepMap, 60);
    setTimeout(keepMap, 130);
    setTimeout(keepMap, 260);
  }

  function blurActive() {
    try {
      if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
    } catch (e) {}
  }

  function enter() {
    if (!world()) return;
    desiredFullscreen = true;
    if (missingOverlayTimer) { clearTimeout(missingOverlayTimer); missingOverlayTimer = null; }
    applyFullscreenClass();
    keepSoon();
    if (!addedState && history && history.pushState) {
      try { history.pushState({ rpgFull: true }, '', location.href); addedState = true; } catch (e) {}
    }
  }

  function exit(fromPop) {
    desiredFullscreen = false;
    if (missingOverlayTimer) { clearTimeout(missingOverlayTimer); missingOverlayTimer = null; }
    var o = ov();
    if (o) o.classList.remove('rpg-map-fullscreen');
    document.body.classList.remove('rpg-map-fullscreen-body');
    var shouldGoBack = addedState && !fromPop;
    addedState = false;
    keepSoon();
    if (shouldGoBack) { try { history.back(); } catch (e) {} }
  }

  function scheduleMissingOverlayCheck() {
    if (missingOverlayTimer) return;
    missingOverlayTimer = setTimeout(function () {
      missingOverlayTimer = null;
      if (ov()) return;
      if (Date.now() - justMovedAt < 1600) return;
      desiredFullscreen = false;
      document.body.classList.remove('rpg-map-fullscreen-body');
    }, 700);
  }

  document.addEventListener('pointerdown', function (e) {
    if (!isMoveControl(e.target) && !fsExit(e.target)) return;
    e.preventDefault();
    blurActive();
  }, { capture: true, passive: false });

  document.addEventListener('pointerup', function (e) {
    if (!isMoveControl(e.target) && !fsExit(e.target)) return;
    blurActive();
  }, { capture: true, passive: false });

  document.addEventListener('click', function (e) {
    if (fsExit(e.target)) {
      e.preventDefault();
      e.stopPropagation();
      exit(false);
      return;
    }

    if (isMoveControl(e.target)) {
      justMovedAt = Date.now();
      if (desiredFullscreen) applyFullscreenClass();
      blurActive();
      keepSoon();
      return;
    }

    if (!world()) return;
    var m = e.target && e.target.closest ? e.target.closest('#rpgOverlay .rpg-pixel-map-wrap, #rpgOverlay .rpg-pixel-map') : null;
    if (!m) return;
    var now = Date.now();
    if (now - lastTap < 360) {
      e.preventDefault();
      if (desiredFullscreen || full()) exit(false); else enter();
      lastTap = 0;
    } else {
      lastTap = now;
    }
  }, { capture: true, passive: false });

  window.addEventListener('popstate', function () {
    if (desiredFullscreen || full()) exit(true);
  });

  document.addEventListener('keydown', function (e) {
    if (!world()) return;
    if (e.key === 'Escape' && (desiredFullscreen || full())) { e.preventDefault(); exit(false); return; }
    keepSoon();
  }, { capture: true });

  if (window.MutationObserver) {
    new MutationObserver(function () {
      maintainHeaderAccess();
      if (!ov()) {
        scheduleMissingOverlayCheck();
        return;
      }
      if (missingOverlayTimer) { clearTimeout(missingOverlayTimer); missingOverlayTimer = null; }
      keepSoon();
    }).observe(document.body, { childList: true, subtree: true });
  }

  loadCss();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', maintainHeaderAccess);
  else maintainHeaderAccess();
}());
