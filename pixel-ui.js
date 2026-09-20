/* Pixel art — the subject shell.
 *
 * A self-rendering subject on the same terms as Levels 1 and 3 and the guitar:
 * app.js delegates to PIXEL_UI.mount() and takes no further part, so nothing
 * here can disturb the shared lesson player every other subject rides on.
 *
 * WHAT IS DIFFERENT ABOUT THIS SUBJECT
 *
 * Every other subject in this app ends a lesson with questions that can be
 * marked. This one ends with things to draw, because a multiple choice about
 * pixel art measures whether you read the lesson rather than whether you can
 * put a clean line down. So a unit has ten challenges, a challenge has hints
 * you reveal one at a time if you need them, and completion is something you
 * assert rather than something the app decides.
 *
 * THAT IS A DELIBERATE WEAKENING OF THE PROGRESS MODEL and worth being honest
 * about: a tick here means "I say I did this". The `check` line on every
 * challenge is what makes that claim mean anything — it says what finished
 * looks like, so the honest answer to "am I done?" is not automatically yes.
 *
 * FIGURES. A pixel grid is written in the data as rows of characters, one per
 * pixel, and drawn here as an SVG of flat rects. The source of a figure is the
 * figure, so nothing can drift out of step with what it claims to show. The
 * palette below is the whole vocabulary those rows may use, and
 * scripts/check-pixel-course.js rejects a row using anything else.
 *
 * WHY THE ART COLOURS ARE LITERAL HEX AND NOT THEME TOKENS. Everything else in
 * this module themes — panels, text, buttons. The pixels inside a figure do
 * not, because a figure teaching hue shifting is wrong if the theme moves its
 * hues, and a ball lit from the upper left is wrong if dark mode lightens its
 * shadow. The art is the content. Only the surface behind it changes.
 *
 * STORAGE. Its own key, prep_v2_pixel, written directly rather than through
 * app.js's Storage — the same arrangement as aat1-ui.js and guitar-ui.js.
 * progress-backup.js picks it up automatically because it prefix-matches
 * prep_v2_.
 */
(function (root) {
  'use strict';

  var SY = root.PixelSyllabus;
  var LD = root.PixelLearnData;
  var CH = root.PixelChallenges;

  var STORE_KEY = 'prep_v2_pixel';

  /* The figure palette. One character per colour, and these are the only
     characters a row in pixel-learn-data.js may contain.

     K–H is one hue-shifted ramp, dark to light, and is what most figures draw
     with. R is the marker colour, used only to point at a pixel under
     discussion — it is never part of a sprite. 1–5 is a ramp built by shifting
     hue as well as value; 6–0 is the SAME ramp built by moving brightness
     alone, which is the comparison the colour unit turns on. a–e is neutral
     grey for the value figures, v–z a second material. */
  var PAL = {
    '.': null,
    K: '#15131c', D: '#3b2d4e', M: '#6b4a8a', L: '#a77fd0', H: '#e7dbf7',
    R: '#e0484b', W: '#f2efe9',
    /* hue-shifted: cool dark, warm light */
    '1': '#2b1b3d', '2': '#6b3355', '3': '#b0555a', '4': '#e08a52', '5': '#f6cf8e',
    /* the same ramp by brightness alone */
    '6': '#4a2a20', '7': '#70402f', '8': '#96563f', '9': '#bc6c4f', '0': '#e2825f',
    /* neutral grey */
    a: '#1c1c22', b: '#454550', c: '#72727e', d: '#a3a3ae', e: '#d8d8e0',
    /* a second material */
    v: '#173a2c', w: '#245c41', x: '#2f8055', y: '#4aa96b', z: '#8fd39a'
  };

  var data = {
    settings: { hintsAlwaysOpen: false },
    /* Keyed by lesson id and by challenge id. Written through the generic merge
       in progress-backup.js, which takes the larger of two numbers field-wise —
       so `at` being a timestamp means the more recent completion wins, and
       `done` being a boolean survives either way. */
    lessons: {},
    challenges: {},
    stats: { cards: 0 }
  };

  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        var p = JSON.parse(raw) || {};
        if (p.settings)   { data.settings   = Object.assign(data.settings, p.settings); }
        if (p.stats)      { data.stats      = Object.assign(data.stats, p.stats); }
        /* Assigned onto the defaults rather than replacing them, so a stored
           object missing a key does not remove it. */
        if (p.lessons)    { data.lessons    = Object.assign(data.lessons || {}, p.lessons); }
        if (p.challenges) { data.challenges = Object.assign(data.challenges || {}, p.challenges); }
      }
    } catch (e) { /* corrupt storage: start clean rather than fail to render */ }
  }
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(data)); } catch (e) {}
    if (root.ProgressSync) root.ProgressSync.noteLocalChange();
  }

  /* Screen state is deliberately not persisted, with one exception noted at
     `hints`: how many hints someone has opened on a challenge IS persisted,
     because a hint you have already read is not a hint you want to earn again
     after a reload. */
  var S = {
    screen: 'units',
    unitId: null, lessonId: null, cardIndex: 0,
    openChallenge: 0
  };

  var _host = null;

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ── Progress ───────────────────────────────────────────────────────────── */
  function lessonDone(id) {
    var rec = data.lessons && data.lessons[id];
    return !!(rec && rec.done);
  }
  function markLessonDone(id) {
    if (!data.lessons) data.lessons = {};
    data.lessons[id] = { done: true, at: Date.now() };
    save();
  }
  function challengeDone(cid) {
    var rec = data.challenges && data.challenges[cid];
    return !!(rec && rec.done);
  }
  function toggleChallenge(cid) {
    if (!data.challenges) data.challenges = {};
    var rec = data.challenges[cid] || {};
    data.challenges[cid] = { done: !rec.done, at: Date.now(), hints: rec.hints || 0 };
    save();
  }
  function hintsShown(cid) {
    var rec = data.challenges && data.challenges[cid];
    return (rec && rec.hints) || 0;
  }
  function revealHint(cid) {
    if (!data.challenges) data.challenges = {};
    var rec = data.challenges[cid] || { done: false, at: 0, hints: 0 };
    rec.hints = (rec.hints || 0) + 1;
    data.challenges[cid] = rec;
    save();
  }
  function unitProgress(unitId) {
    var ls = LD.lessonsFor(unitId);
    var cs = CH.forUnit(unitId);
    return {
      lessons: ls.filter(function (l) { return lessonDone(l.id); }).length,
      lessonsTotal: ls.length,
      challenges: cs.filter(function (c) { return challengeDone(CH.id(c)); }).length,
      challengesTotal: cs.length
    };
  }

  /* ── Figures ────────────────────────────────────────────────────────────
     A grid of characters becomes flat rects. No strokes, no gradients, no
     rounding: a pixel figure that is not made of squares teaches the wrong
     thing about what a pixel is.

     The grid lines are drawn at cell sizes of 8 and up, because counting runs
     is what half this course asks the reader to do and an unlined block of
     colour cannot be counted. Below 8 they would be most of what you see. */
  function gridSvg(rows, cell) {
    if (!rows || !rows.length) return '';
    cell = cell || 12;
    var h = rows.length, w = rows[0].length;
    var W = w * cell, H = h * cell;
    var out = '<svg class="px-svg" width="' + W + '" height="' + H +
              '" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-hidden="true">';
    out += '<rect class="px-svg-bg" x="0" y="0" width="' + W + '" height="' + H + '"/>';
    for (var y = 0; y < h; y++) {
      var row = rows[y];
      for (var x = 0; x < row.length; x++) {
        var fill = PAL[row.charAt(x)];
        if (!fill) continue;
        out += '<rect x="' + (x * cell) + '" y="' + (y * cell) + '" width="' + cell +
               '" height="' + cell + '" fill="' + fill + '"/>';
      }
    }
    if (cell >= 8) {
      var d = '';
      for (var gx = 1; gx < w; gx++) d += 'M' + (gx * cell) + ' 0V' + H;
      for (var gy = 1; gy < h; gy++) d += 'M0 ' + (gy * cell) + 'H' + W;
      out += '<path class="px-svg-grid" d="' + d + '"/>';
    }
    out += '<rect class="px-svg-edge" x="0.5" y="0.5" width="' + (W - 1) + '" height="' + (H - 1) + '"/>';
    return out + '</svg>';
  }

  function figureHtml(card) {
    if (card.compare) {
      return '<div class="px-figrow">' +
        ['bad', 'good'].map(function (side) {
          var f = card.compare[side];
          if (!f) return '';
          return '<figure class="px-figbox">' +
            gridSvg(f.rows, f.cell || card.compare.cell || 10) +
            '<figcaption class="px-figlabel">' + esc(f.label) + '</figcaption>' +
          '</figure>';
        }).join('') +
      '</div>';
    }
    if (card.art) {
      return '<div class="px-fig">' + gridSvg(card.art.rows, card.art.cell) +
        (card.art.caption ? '<p class="px-caption">' + esc(card.art.caption) + '</p>' : '') +
      '</div>';
    }
    return '';
  }

  function keysHtml(card) {
    if (!card.keys || !card.keys.length) return '';
    return '<dl class="px-keys">' + card.keys.map(function (k) {
      return '<div class="px-key">' +
        '<dt class="px-keycap">' + esc(k[0]) + '</dt>' +
        '<dd class="px-keyname">' + esc(k[1]) + '</dd>' +
      '</div>';
    }).join('') + '</dl>';
  }

  /* The link from material to practice. The whole reason this subject has
     challenges rather than questions is that the practice IS the assessment,
     so a card that teaches a technique names the challenges that exercise it
     and offers to go there. */
  function xrefHtml(card, unitId) {
    var ns = (card.exercises || []).slice().sort(function (a, b) { return a - b; });
    if (!ns.length) return '';
    /* "1–3" rather than "1, 2, 3" for a run, because a list of five numbers
       reads as five separate things to do and a range reads as a set. */
    var parts = [], i = 0;
    while (i < ns.length) {
      var j = i;
      while (j + 1 < ns.length && ns[j + 1] === ns[j] + 1) j++;
      parts.push(j > i ? ns[i] + '–' + ns[j] : String(ns[i]));
      i = j + 1;
    }
    var label = 'To practise this, see ' +
      (ns.length === 1 ? 'challenge ' : 'challenges ') + parts.join(', ');
    return '<p class="px-xref">' +
      '<button class="px-xref-btn" type="button" data-goto-challenge="' + ns[0] +
        '" data-unit="' + esc(unitId) + '">' + esc(label) + ' →</button>' +
    '</p>';
  }

  /* ── The units screen ───────────────────────────────────────────────────── */
  function unitsHtml() {
    var out = '<div class="px-intro">' +
      '<h2 class="px-intro-h">Pixel art, in Aseprite</h2>' +
      '<p class="px-intro-p">Nine units. Each one is a few short lessons and ten drawing ' +
        'challenges that get harder as they go. Nothing here is marked — the challenges ' +
        'say what finished looks like, and you decide when you are there.</p>' +
    '</div>';

    SY.UNITS.forEach(function (u) {
      var ls = LD.lessonsFor(u.id);
      var pr = unitProgress(u.id);
      if (!ls.length) {
        out += '<div class="px-panel px-unit">' +
          '<div class="px-unit-head">' +
            '<span class="px-unit-icon" aria-hidden="true">' + esc(u.icon) + '</span>' +
            '<span class="px-unit-title">' + esc(u.id) + ' · ' + esc(u.title) + '</span>' +
          '</div>' +
          '<p class="px-empty">Not written yet. ' + SY.criteriaFor(u.id).length +
            ' criteria are mapped out for it.</p>' +
        '</div>';
        return;
      }
      out += '<div class="px-panel px-unit">' +
        '<div class="px-unit-head">' +
          '<span class="px-unit-icon" aria-hidden="true">' + esc(u.icon) + '</span>' +
          '<span class="px-unit-title">' + esc(u.id) + ' · ' + esc(u.title) + '</span>' +
        '</div>' +
        '<p class="px-unit-blurb">' + esc(u.blurb) + '</p>' +
        '<p class="px-unit-meta">' + pr.lessons + ' of ' + pr.lessonsTotal + ' lessons · ' +
          pr.challenges + ' of ' + pr.challengesTotal + ' challenges</p>' +
        '<ul class="px-lessonlist">' +
        ls.map(function (l) {
          return '<li><button class="px-lessonbtn" type="button" data-lesson="' + esc(l.id) + '">' +
            '<span class="px-lesson-icon" aria-hidden="true">' + esc(l.icon || '•') + '</span>' +
            '<span class="px-lesson-text">' +
              '<span class="px-lesson-title">' + esc(l.title) + '</span>' +
              '<span class="px-lesson-sum">' + esc(l.summary || '') + '</span>' +
            '</span>' +
            '<span class="px-lesson-state">' + (lessonDone(l.id) ? '✓' : '') + '</span>' +
          '</button></li>';
        }).join('') +
        '</ul>' +
        '<button class="px-chalbtn" type="button" data-challenges="' + esc(u.id) + '">' +
          '🖌️ Drawing challenges' +
          '<span class="px-chal-count">' + pr.challenges + '/' + pr.challengesTotal + '</span>' +
        '</button>' +
      '</div>';
    });
    return '<div class="container px-wrap">' + out + '</div>';
  }

  /* ── The lesson player ──────────────────────────────────────────────────── */
  function lessonHtml() {
    var lesson = LD.lesson(S.lessonId);
    if (!lesson) { S.screen = 'units'; return unitsHtml(); }
    var idx = Math.max(0, Math.min(S.cardIndex, lesson.cards.length - 1));
    var card = lesson.cards[idx];
    var last = idx === lesson.cards.length - 1;

    var dots = lesson.cards.map(function (c, i) {
      return '<span class="px-dot' + (i === idx ? ' is-here' : '') +
             (i < idx ? ' is-past' : '') + '" aria-hidden="true"></span>';
    }).join('');

    return '<div class="container px-wrap">' +
      '<div class="px-lessonbar">' +
        '<button class="px-btn" id="pxBack" type="button">← Units</button>' +
        '<span class="px-lessonbar-title">' + esc(lesson.title) + '</span>' +
        '<span class="px-lessonbar-count">' + (idx + 1) + '/' + lesson.cards.length + '</span>' +
      '</div>' +
      '<div class="px-panel px-card">' +
        '<div class="px-dots">' + dots + '</div>' +
        '<h2 class="px-h">' + esc(card.h) + '</h2>' +
        (card.p || []).map(function (para) {
          return '<p class="px-p">' + esc(para) + '</p>';
        }).join('') +
        figureHtml(card) +
        keysHtml(card) +
        xrefHtml(card, lesson.unit) +
      '</div>' +
      '<div class="px-cardnav">' +
        '<button class="px-btn" id="pxPrev" type="button"' + (idx === 0 ? ' disabled' : '') + '>Back</button>' +
        (last
          ? '<button class="px-next" id="pxFinish" type="button">' +
              (lessonDone(lesson.id) ? 'Done ✓' : 'Mark done') + '</button>'
          : '<button class="px-next" id="pxNext" type="button">Next</button>') +
      '</div>' +
    '</div>';
  }

  /* ── The challenges screen ──────────────────────────────────────────────
     One card per challenge, collapsed until tapped. Hints are revealed one at
     a time, and how many you have opened is stored: a hint already read is not
     one you want to earn again after a reload. */
  function challengeHtml(c) {
    var cid = CH.id(c);
    var open = S.openChallenge === c.n;
    var done = challengeDone(cid);
    var shown = hintsShown(cid);
    var hints = c.hints || [];

    var body = '';
    if (open) {
      body = '<div class="px-chal-body">' +
        '<p class="px-chal-brief">' + esc(c.brief) + '</p>' +
        '<p class="px-chal-spec">' + esc(c.canvas) + '</p>' +
        '<p class="px-chal-check"><span class="px-chal-checklabel">You have it when</span> ' +
          esc(c.check) + '</p>' +
        '<div class="px-hints">' +
          hints.slice(0, shown).map(function (h, i) {
            return '<p class="px-hint"><span class="px-hint-n">Hint ' + (i + 1) + '</span> ' + esc(h) + '</p>';
          }).join('') +
          (shown < hints.length
            ? '<button class="px-hintbtn" type="button" data-hint="' + c.n + '">' +
                (shown === 0 ? 'Stuck? Reveal a hint' : 'Reveal hint ' + (shown + 1)) +
                ' (' + (hints.length - shown) + ' left)</button>'
            : '<p class="px-hint-n">That is every hint for this one.</p>') +
        '</div>' +
        '<button class="px-donebtn" type="button" data-done="' + c.n + '">' +
          (done ? '✓ Completed — tap to undo' : 'Mark completed') +
        '</button>' +
      '</div>';
    }

    return '<div class="px-chal' + (open ? ' is-open' : '') + (done ? ' is-done' : '') + '">' +
      '<button class="px-chal-head" type="button" data-open="' + c.n + '" aria-expanded="' + (open ? 'true' : 'false') + '">' +
        '<span class="px-chal-n">' + c.n + '</span>' +
        '<span class="px-chal-title">' + esc(c.title) + '</span>' +
        '<span class="px-chal-state">' + (done ? '✓' : '') + '</span>' +
      '</button>' + body +
    '</div>';
  }

  function challengesHtml() {
    var u = SY.unit(S.unitId);
    if (!u) { S.screen = 'units'; return unitsHtml(); }
    var cs = CH.forUnit(u.id);
    var pr = unitProgress(u.id);
    var pct = pr.challengesTotal ? Math.round((pr.challenges / pr.challengesTotal) * 100) : 0;

    return '<div class="container px-wrap">' +
      '<div class="px-lessonbar">' +
        '<button class="px-btn" id="pxBack" type="button">← Units</button>' +
        '<span class="px-lessonbar-title">' + esc(u.title) + '</span>' +
        '<span class="px-lessonbar-count">' + pr.challenges + '/' + pr.challengesTotal + '</span>' +
      '</div>' +
      '<div class="px-panel px-chalhead">' +
        '<h2 class="px-h">Drawing challenges</h2>' +
        '<p class="px-p">Ten, getting harder. Open one, draw it, and tap it complete when ' +
          'it matches its own description of finished. Hints are there if you want them.</p>' +
        '<div class="px-progress"><span class="px-progress-bar" style="width:' + pct + '%"></span></div>' +
      '</div>' +
      cs.map(challengeHtml).join('') +
    '</div>';
  }

  function html() {
    if (S.screen === 'lesson') return lessonHtml();
    if (S.screen === 'challenges') return challengesHtml();
    return unitsHtml();
  }

  /* ── Navigation ─────────────────────────────────────────────────────────── */
  function openLesson(id) {
    var lesson = LD.lesson(id);
    if (!lesson) return;
    S.lessonId = id;
    S.unitId = lesson.unit;
    S.cardIndex = 0;
    S.screen = 'lesson';
  }
  function openChallenges(unitId, n) {
    S.unitId = unitId;
    S.openChallenge = n || 0;
    S.screen = 'challenges';
  }

  /* ── Events ─────────────────────────────────────────────────────────────── */
  function wire(el) {
    function on(id, evt, fn) {
      var n = el.querySelector('#' + id);
      if (n) n.addEventListener(evt, fn);
    }

    el.querySelectorAll('[data-lesson]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        openLesson(btn.getAttribute('data-lesson'));
        rerender();
      });
    });
    el.querySelectorAll('[data-challenges]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        openChallenges(btn.getAttribute('data-challenges'), 0);
        rerender();
      });
    });
    el.querySelectorAll('[data-goto-challenge]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        openChallenges(btn.getAttribute('data-unit'),
                       parseInt(btn.getAttribute('data-goto-challenge'), 10) || 0);
        rerender();
      });
    });
    /* Tapping the open challenge closes it, so the list can be collapsed back
       to ten titles without leaving the screen. */
    el.querySelectorAll('[data-open]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var n = parseInt(btn.getAttribute('data-open'), 10) || 0;
        S.openChallenge = (S.openChallenge === n) ? 0 : n;
        rerender();
      });
    });
    el.querySelectorAll('[data-hint]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var n = parseInt(btn.getAttribute('data-hint'), 10) || 0;
        var c = CH.get(S.unitId, n);
        if (c) revealHint(CH.id(c));
        rerender();
      });
    });
    el.querySelectorAll('[data-done]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var n = parseInt(btn.getAttribute('data-done'), 10) || 0;
        var c = CH.get(S.unitId, n);
        if (c) toggleChallenge(CH.id(c));
        rerender();
      });
    });

    on('pxBack', 'click', function () { back(); });
    on('pxPrev', 'click', function () { S.cardIndex = Math.max(0, S.cardIndex - 1); rerender(); });
    on('pxNext', 'click', function () {
      S.cardIndex += 1;
      data.stats.cards = (data.stats.cards || 0) + 1;
      save();
      rerender();
    });
    on('pxFinish', 'click', function () {
      var lesson = LD.lesson(S.lessonId);
      if (!lesson) return;
      markLessonDone(lesson.id);
      /* Finishing a lesson lands on that unit's challenges rather than back on
         the unit list. The material exists to be practised, and a "Done" that
         returns you to a menu makes the practice something you have to go and
         find. */
      openChallenges(lesson.unit, 0);
      rerender();
    });
  }

  function mount(el) {
    _host = el;
    load();
    el.innerHTML = html();
    /* Kept in step from here as well: this module repaints itself without
       going back through app.js's render(). */
    if (root.AATNav) root.AATNav.sync();
    wire(el);
  }

  function rerender() {
    if (!_host) return;
    mount(_host);
    /* A repaint replaces the whole subtree, so anything that was scrolled into
       view is not any more. Only the lesson player cares — moving between cards
       should start you at the top of the new card, not where the last one
       ended. */
    if (S.screen === 'lesson' && _host.scrollIntoView) {
      try { window.scrollTo({ top: 0, behavior: 'instant' }); }
      catch (e) { window.scrollTo(0, 0); }
    }
  }

  /* ── The platform back button ───────────────────────────────────────────
     Three screens, and both of the deep ones go back to the unit list — a
     lesson and its challenges are siblings, not a stack. */
  function atRoot() { return S.screen === 'units'; }
  function back() {
    if (S.screen === 'units') return;
    S.screen = 'units';
    S.lessonId = null;
    S.openChallenge = 0;
    rerender();
  }

  root.PIXEL_UI = {
    mount: mount,
    atRoot: atRoot,
    back: back,
    reset: function () {},
    /* The shared header's 🏠 button, and "you are being switched away from" —
       see the note on AAT3_UI.home. Nothing here makes a sound or holds a
       timer, so suspend has nothing to stop; it exists because the chrome
       calls it on every subject. */
    home: function () {
      S.screen = 'units';
      S.lessonId = null;
      S.openChallenge = 0;
    },
    suspend: function () {},
    /* Exposed for the checks: the palette a figure may draw with, and the
       module's own view of what is done. Reading progress through the module's
       surface beats reaching into a closure or planting a global. */
    PALETTE: PAL,
    progress: function (unitId) { return unitProgress(unitId); }
  };
}(typeof self !== 'undefined' ? self : this));
