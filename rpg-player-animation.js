/* Ledger Legends directional player animation.
   Tracks facing direction and a 3-frame walk cycle without changing the main RPG engine. */
(function () {
  'use strict';

  var KEY = 'aatRpgPlayerSprite_v1';
  var idleTimer = null;
  var frame = 1;
  var dir = 'down';

  function read() {
    try {
      var d = JSON.parse(localStorage.getItem(KEY) || '{}');
      if (d && ['up', 'down', 'left', 'right'].indexOf(d.dir) >= 0) dir = d.dir;
      if (d && [0, 1, 2].indexOf(d.frame) >= 0) frame = d.frame;
    } catch (e) {}
  }

  function write() {
    try {
      localStorage.setItem(KEY, JSON.stringify({ dir: dir, frame: frame }));
    } catch (e) {}
  }

  function clean(el) {
    ['dir-up', 'dir-down', 'dir-left', 'dir-right', 'frame-0', 'frame-1', 'frame-2'].forEach(function (c) {
      el.classList.remove(c);
    });
  }

  function apply() {
    read();
    var sprites = document.querySelectorAll('#rpgOverlay .rpg-player-sprite');
    sprites.forEach(function (s) {
      clean(s);
      s.classList.add('dir-' + dir);
      s.classList.add('frame-' + frame);
      s.setAttribute('data-facing', dir);
      s.setAttribute('data-walk-frame', String(frame));
      s.style.animation = 'none';
    });

    var legacy = document.querySelectorAll('#rpgOverlay .rpg-player');
    legacy.forEach(function (s) { s.style.animation = 'none'; });
  }

  function setIdleSoon() {
    if (idleTimer) clearTimeout(idleTimer);
    idleTimer = setTimeout(function () {
      frame = 1;
      write();
      apply();
    }, 135);
  }

  function step(nextDir) {
    if (['up', 'down', 'left', 'right'].indexOf(nextDir) < 0) return;
    read();
    dir = nextDir;
    frame = frame === 0 ? 2 : 0;
    write();
    apply();
    setIdleSoon();
  }

  function dirFromKey(key) {
    key = String(key || '').toLowerCase();
    if (key === 'arrowup' || key === 'w') return 'up';
    if (key === 'arrowdown' || key === 's') return 'down';
    if (key === 'arrowleft' || key === 'a') return 'left';
    if (key === 'arrowright' || key === 'd') return 'right';
    return '';
  }

  document.addEventListener('click', function (event) {
    var btn = event.target && event.target.closest ? event.target.closest('#rpgOverlay [data-dir]') : null;
    if (!btn) return;
    step(btn.getAttribute('data-dir'));
  }, { capture: true });

  document.addEventListener('keydown', function (event) {
    if (!document.querySelector('#rpgOverlay .rpg-world')) return;
    var d = dirFromKey(event.key);
    if (d) step(d);
  }, { capture: true });

  if (window.MutationObserver) {
    new MutationObserver(apply).observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();
}());
