/* ── Milestone celebrations, shared ───────────────────────────────────────────
   An endless run has no finish line, so the only landmarks it can offer are the
   ones the reader builds themselves. Fifty right in a row, and a hundred, are
   worth stopping for.

   WHAT IS SHARED AND WHAT IS NOT. This file owns the overlay, the piece count,
   the timing and the tidying up — the parts that would be identical in three
   places and would rot in two of them. It owns nothing about how a celebration
   LOOKS: every visual rule lives in the level's own stylesheet, keyed by class,
   because "make each one unique for each level" is a requirement about
   appearance and appearance belongs where the level's design system is. A check
   can then compare the three stylesheets rather than taking the claim on trust.

   IT IS AN ANNOUNCEMENT, NOT ONLY A DECORATION. The banner carries the
   milestone in words and is given a live region, so a reader using a screen
   reader is told they have reached fifty rather than being shown a shower of
   shapes they cannot see. Under prefers-reduced-motion the pieces are dropped
   entirely and the banner alone is shown: the information survives, the motion
   does not. */
(function (root) {
  'use strict';

  /* How long the overlay lives. Long enough to read the banner, short enough
     that it never becomes something to wait out — the run continues underneath
     and the reader can answer straight through it. */
  var LIFE_MS = 2600;

  /* Pieces per milestone. A hundred earns more than fifty does, everywhere. */
  var PIECES = { 50: 18, 100: 34 };

  function calm() {
    try {
      return !!(root.matchMedia && root.matchMedia('(prefers-reduced-motion: reduce)').matches);
    } catch (e) { return false; }
  }

  var _open = null;
  function clear() {
    if (!_open) return;
    if (_open.el && _open.el.parentNode) _open.el.parentNode.removeChild(_open.el);
    if (_open.timer) clearTimeout(_open.timer);
    _open = null;
  }

  /* theme: 'a1' | 'aat' | 'a3'   milestone: 50 | 100 */
  function fire(theme, milestone, label) {
    if (typeof document === 'undefined' || !document.createElement) return null;
    /* ONE AT A TIME. A reader cannot reach fifty and a hundred in the same
       breath, but a repaint that fired twice would stack two overlays and leave
       one of them behind when the other tidied up. */
    clear();

    var wrap = document.createElement('div');
    wrap.className = 'aat-cel aat-cel-' + theme + ' aat-cel-' + milestone;
    wrap.setAttribute('data-cel', theme + '-' + milestone);

    var quiet = calm();
    if (!quiet) {
      var n = PIECES[milestone] || 18;
      var frag = document.createDocumentFragment();
      for (var i = 0; i < n; i++) {
        var p = document.createElement('span');
        p.className = 'aat-cel-p';
        /* Each piece carries its own index and a spread, so a stylesheet can
           fan them out without this file knowing which direction is up in that
           level's design. */
        p.style.setProperty('--i', String(i));
        p.style.setProperty('--n', String(n));
        p.style.setProperty('--r', String(Math.round(Math.random() * 100)));
        frag.appendChild(p);
      }
      wrap.appendChild(frag);
    }

    var banner = document.createElement('div');
    banner.className = 'aat-cel-t';
    banner.setAttribute('role', 'status');
    banner.setAttribute('aria-live', 'polite');
    banner.textContent = label || (milestone + ' in a row');
    wrap.appendChild(banner);

    document.body.appendChild(wrap);
    _open = { el: wrap, timer: setTimeout(clear, LIFE_MS) };
    return wrap;
  }

  root.AATCelebrate = {
    fire: fire,
    clear: clear,
    LIFE_MS: LIFE_MS,
    PIECES: PIECES,
    /* The milestones themselves, so the three levels cannot disagree about
       which streaks are worth marking. */
    AT: [50, 100],
  };
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
