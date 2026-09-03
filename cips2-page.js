/* CIPS Level 2 — learner-facing shell for the modules that have content.
 *
 * Deliberately self-contained. The main study app's app.js is a large shared
 * surface; this subject owns its reader, progress and practice state so the
 * CIPS experience can evolve without changing AAT's question engine.
 */
(function (root) {
  'use strict';

  /* ── The modules this page can teach ───────────────────────────────────────
     A module is offered only when all three of its files loaded: the syllabus
     it is mapped to, the teaching content and the question bank. An id listed
     here whose data was never written does not produce a broken tab — it is
     simply absent from MODULES, and the qualification path on the overview
     screen still shows it as mapped rather than live. */
  var REGISTRY = [
    { id: 'l2m1', learn: 'CIPS2_L2M1_LEARN', practice: 'CIPS2_L2M1_PRACTICE' },
    { id: 'l2m2', learn: 'CIPS2_L2M2_LEARN', practice: 'CIPS2_L2M2_PRACTICE' }
  ];
  var MODULES = REGISTRY.map(function (r) {
    return {
      id: r.id,
      syl: root.CIPS2_MODULES && root.CIPS2_MODULES[r.id],
      learn: root[r.learn],
      practice: root[r.practice]
    };
  }).filter(function (m) { return m.syl && m.learn && m.practice; });

  /* The five mandatory modules of the qualification, in order. Names are typed
     because L2M3–L2M5 carry no data on this page, so there is nothing to read
     them from; check-cips2-content.js compares every one of them against
     the corresponding syllabus file so they cannot drift. */
  var PATH = [
    { id: 'l2m1', code: 'L2M1', title: 'Introducing Procurement and Supply' },
    { id: 'l2m2', code: 'L2M2', title: 'Procurement and Supply Operations' },
    { id: 'l2m3', code: 'L2M3', title: 'Stakeholder Relationships' },
    { id: 'l2m4', code: 'L2M4', title: 'Systems Technology' },
    { id: 'l2m5', code: 'L2M5', title: 'Inventory, Logistics and Expediting' }
  ];

  var STORE_KEY = 'prep_v2_cips2';

  if (!MODULES.length) {
    var fail = document.getElementById('cipsApp');
    if (fail) fail.innerHTML = '<div class="c2-fatal"><h1>CIPS content could not load</h1><p>Reload the page. If you are offline, open CIPS once while connected so it can be stored for offline study.</p></div>';
    return;
  }

  /* The active module's three sources. Reassigned by setModule(), so every
     screen below reads whichever module the reader is in. */
  var MOD, LD, PB;

  var S = {
    moduleId: null,
    screen: 'home',
    lessonId: null,
    cardIdx: 0,
    lessonPhase: 'read', // read | check | complete
    checkIdx: 0,
    checkChoice: null,
    checkAnswered: false,
    checkCorrect: 0,
    practiceLo: 'mix',
    practiceQs: [],
    practiceIdx: 0,
    practiceChoice: null,
    practiceAnswered: false,
    practiceCorrect: 0,
    practiceResults: [],
    glossaryQuery: ''
  };

  /* `store` is the whole file; `data` is the record for the module the reader
     is currently in. Every screen below was written against `data`, and it
     still is — setModule() re-points it, so adding a module did not mean
     rewriting each reference. */
  var store = { settings: { darkMode: null }, activeModule: null, modules: {} };
  var data = null;
  var migrated = false;

  function blankModule() {
    return { lessons: {}, checkpoint: { attempted: 0, correct: 0 }, practice: { runs: 0, los: {}, qs: {} } };
  }
  function n0(v) { return typeof v === 'number' && isFinite(v) && v > 0 ? v : 0; }
  function plainObject(v) { return !!v && typeof v === 'object' && !Array.isArray(v); }
  function sanitiseModule(p) {
    var m = blankModule();
    if (!plainObject(p)) return m;
    if (plainObject(p.lessons)) m.lessons = p.lessons;
    if (p.checkpoint) {
      m.checkpoint.attempted = n0(p.checkpoint.attempted);
      m.checkpoint.correct = n0(p.checkpoint.correct);
    }
    if (plainObject(p.practice)) {
      m.practice.runs = n0(p.practice.runs);
      m.practice.los = plainObject(p.practice.los) ? p.practice.los : {};
      m.practice.qs = plainObject(p.practice.qs) ? p.practice.qs : {};
    }
    return m;
  }

  /* Union of two records for the same module, under the rules the rest of this
     app already merges progress by: a lesson done anywhere is done, and every
     counter and timestamp takes the larger of the two. Both sides are the same
     reader's work, so nothing here should ever go backwards. */
  function foldLegacy(into, from) {
    Object.keys(from.lessons).forEach(function (id) {
      var a = into.lessons[id], b = from.lessons[id];
      if (!a || (b && b.done && !a.done)) into.lessons[id] = b;
    });
    into.checkpoint.attempted = Math.max(into.checkpoint.attempted, from.checkpoint.attempted);
    into.checkpoint.correct = Math.max(into.checkpoint.correct, from.checkpoint.correct);
    into.practice.runs = Math.max(into.practice.runs, from.practice.runs);
    Object.keys(from.practice.los).forEach(function (lo) {
      var a = into.practice.los[lo], b = from.practice.los[lo] || {};
      if (!a) { into.practice.los[lo] = b; return; }
      a.attempted = Math.max(n0(a.attempted), n0(b.attempted));
      a.correct = Math.max(n0(a.correct), n0(b.correct));
    });
    Object.keys(from.practice.qs).forEach(function (id) {
      var a = into.practice.qs[id], b = from.practice.qs[id] || {};
      if (!a) { into.practice.qs[id] = b; return; }
      if (n0(b.r) > n0(a.r)) a.r = b.r;
      if (n0(b.w) > n0(a.w)) a.w = b.w;
    });
    return into;
  }

  /* ONE MODULE'S PROGRESS USED TO BE THE WHOLE FILE.
     Until L2M2 there was only L2M1, so `lessons`, `checkpoint` and `practice`
     sat at the top level of prep_v2_cips2. Read as if it were the new shape,
     a reader who had finished L2M1 would open the course and be shown none of
     it — so the old flat shape is migrated into the l2m1 slot on load, and
     written back in the new shape on the next save.

     `settings` deliberately stays at the top level: cips2-theme-bootstrap.js
     reads it before this file runs, to paint the right theme on first paint. */
  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (!raw) return;
      var p = JSON.parse(raw) || {};
      if (p.settings) store.settings.darkMode = p.settings.darkMode;
      var legacy = (p.lessons || p.checkpoint || p.practice) ? sanitiseModule(p) : null;
      if (plainObject(p.modules)) {
        Object.keys(p.modules).forEach(function (k) { store.modules[k] = sanitiseModule(p.modules[k]); });
        /* BOTH SHAPES AT ONCE, which is not a contradiction — it is what two
           devices produce during an upgrade. This page is served by a service
           worker, so one device can go on running the previous version for some
           time after the new one is live: it keeps writing the flat shape while
           the upgraded device writes the nested one, and progress-backup's
           merge, which walks keys and takes the larger of two numbers, unions
           them into a file that has `lessons` at the top AND `modules` beneath.
           Preferring `modules` and stopping there would silently drop
           everything the un-upgraded device had done. */
        if (legacy) { store.modules.l2m1 = foldLegacy(store.modules.l2m1 || blankModule(), legacy); migrated = true; }
      } else if (legacy) {
        store.modules.l2m1 = legacy;
        migrated = true;
      }
      if (typeof p.activeModule === 'string') store.activeModule = p.activeModule;
    } catch (e) { /* corrupt progress must never prevent studying */ }
  }
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch (e) {}
    if (root.ProgressSync) root.ProgressSync.noteLocalChange();
  }

  function moduleById(id) {
    return MODULES.filter(function (m) { return m.id === id; })[0] || null;
  }
  function recordFor(id) { return store.modules[id] || blankModule(); }
  /* Lessons finished in a module the reader is not currently in — the overview
     screen shows every module's progress, not just the active one. */
  function doneCountFor(m) {
    var rec = recordFor(m.id);
    return m.learn.LESSONS.filter(function (l) { return !!(rec.lessons[l.id] && rec.lessons[l.id].done); }).length;
  }
  function setModule(id) {
    var m = moduleById(id) || MODULES[0];
    MOD = m.syl; LD = m.learn; PB = m.practice;
    S.moduleId = m.id;
    store.activeModule = m.id;
    data = store.modules[m.id] || (store.modules[m.id] = blankModule());
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c];
    });
  }
  function pct(a, b) { return b ? Math.round(a / b * 100) : 0; }
  function shuffle(a) {
    var out = a.slice();
    for (var i = out.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = out[i]; out[i] = out[j]; out[j] = t;
    }
    return out;
  }
  function criterion(id) {
    for (var oi = 0; oi < MOD.outcomes.length; oi++) {
      var cs = MOD.outcomes[oi].criteria || [];
      for (var ci = 0; ci < cs.length; ci++) if (cs[ci].id === id) return cs[ci];
    }
    return null;
  }
  function outcome(n) {
    return MOD.outcomes.filter(function (o) { return o.n === Number(n); })[0] || null;
  }
  function lessonDone(id) { return !!(data.lessons[id] && data.lessons[id].done); }
  /* The step number a lesson carries on the module map. The map GROUPS lessons
     by learning outcome, but the course is one ordered path of thirteen, so the
     number has to come from the path and not from the position within a group —
     otherwise the first lesson of outcome 2 is also "1". This used to be
     corrected after the fact, by a MutationObserver in cips2-register.js that
     rewrote the rendered numbers; a renderer that cannot number its own rows
     will be wrong again the next time a row is added. */
  function lessonStep(id) { return LD.LESSONS.map(function (l) { return l.id; }).indexOf(id) + 1; }
  function completedCount() { return LD.LESSONS.filter(function (l) { return lessonDone(l.id); }).length; }
  function nextLesson() { return LD.LESSONS.filter(function (l) { return !lessonDone(l.id); })[0] || LD.LESSONS[0]; }
  function totalMinutes() { return LD.LESSONS.reduce(function (s, l) { return s + l.minutes; }, 0); }

  function applyTheme() {
    var dark = store.settings.darkMode;
    if (dark == null) dark = !!(root.matchMedia && root.matchMedia('(prefers-color-scheme: dark)').matches);
    document.body.classList.toggle('dark', !!dark);
    var btn = document.getElementById('darkToggle');
    if (btn) {
      /* The same two strings app.js writes into the same button. */
      btn.textContent = dark ? '☀️ Light' : '🌙 Dark';
      btn.setAttribute('aria-pressed', String(!!dark));
    }
  }

  /* ── The context bar ───────────────────────────────────────────────────────
     Level 3's component, in CIPS colours: which thing you are in, how far
     through it you are, and the way out. One bar for the reader, the checkpoint
     and a practice run, where there were three different rows before, none of
     them sticky. */
  function ctxBar(o) {
    var h = '<div class="c2-ctx">';
    /* The attribute carries no destination. Where back goes is goBack()'s
       decision, made from the current screen, so that the arrow and the
       platform back button cannot disagree — and an attribute naming a
       destination nothing reads would suggest otherwise to the next reader. */
    if (o.back) {
      h += '<button class="c2-ctx-back" type="button" data-ctx-back aria-label="' +
        esc(o.backLabel || 'Back') + '"><span aria-hidden="true">←</span></button>';
    }
    h += '<div class="c2-ctx-main">' +
      '<div class="c2-ctx-t">' + esc(o.title || '') + '</div>' +
      (o.meta ? '<div class="c2-ctx-m">' + esc(o.meta) + '</div>' : '') +
      '</div>';
    if (typeof o.pct === 'number') {
      h += '<div class="c2-ctx-ring' + (o.pct >= 100 ? ' is-full' : '') + '" style="--p:' + o.pct + '"' +
        ' role="img" aria-label="' + o.pct + '% through"></div>';
    }
    return h + '</div>';
  }

  function progressBar(done, total, label) {
    var p = pct(done, total);
    return '<div class="c2-prog" aria-label="' + esc(label || 'Progress') + ': ' + p + '%">' +
      '<div class="c2-prog-track"><span style="width:' + p + '%"></span></div>' +
      '<span class="c2-prog-num">' + p + '%</span></div>';
  }

  function examFactHtml() {
    return '<aside class="c2-examfact" aria-label="' + esc(MOD.code) + ' assessment format">' +
      '<div class="c2-eyebrow">Assessment context</div>' +
      '<h2>' + esc(MOD.code) + ' exam shape</h2>' +
      '<div class="c2-factgrid">' +
        '<div><strong>' + MOD.assessment.questionCount + '</strong><span>objective-response questions</span></div>' +
        '<div><strong>' + MOD.assessment.durationMinutes + '</strong><span>minutes</span></div>' +
        '<div><strong>' + MOD.assessment.questionsPerLearningOutcome + '</strong><span>questions per learning outcome</span></div>' +
        '<div><strong>' + MOD.assessment.passMark + '%</strong><span>required in each LO section</span></div>' +
      '</div>' +
      '<p>This app’s questions are original practice material, not CIPS past-paper questions.</p>' +
    '</aside>';
  }

  /* "One module is available" was true when it was written and stopped being
     true the moment a second one shipped. Both this sentence and the live/mapped
     marks on the path list below are counted from MODULES. */
  function liveSentence() {
    var live = MODULES.map(function (m) { return m.syl.code; });
    if (live.length === 1) return 'The complete module is <strong>' + esc(live[0]) + ' ' + esc(MODULES[0].syl.title) + '</strong>.';
    return '<strong>' + esc(live.join(' and ')) + '</strong> carry full teaching content and practice; the remaining modules are syllabus-mapped.';
  }
  function homeHtml() {
    var done = completedCount();
    var next = nextLesson();
    return '<div class="c2-page">' +
      '<section class="c2-hero">' +
        '<div class="c2-hero-copy">' +
          '<div class="c2-eyebrow">CIPS Level 2 Certificate · 603/3282/7</div>' +
          '<h1 id="c2PageTitle">Procurement and Supply Operations</h1>' +
          '<p class="c2-lead">A structured route through the qualification syllabus. ' + liveSentence() + '</p>' +
          '<div class="c2-hero-actions">' +
            /* Once every lesson is finished there is no "next" one, and
               nextLesson() falls back to the first. Offering that as "Continue
               learning" reopened lesson 1 on a course the reader had finished,
               so the finished state gets its own destination: the map, to pick
               something to revisit. This used to be corrected from outside the
               renderer, by rewriting the label and intercepting the click in
               the capture phase. */
            (done === LD.LESSONS.length
              ? '<button class="c2-btn c2-primary" type="button" data-screen="module">Review ' + esc(MOD.code) + ' <span aria-hidden="true">→</span></button>'
              : '<button class="c2-btn c2-primary" type="button" data-go="lesson" data-id="' + esc(next.id) + '">' +
                (done ? 'Continue learning' : 'Start ' + esc(MOD.code)) + ' <span aria-hidden="true">→</span></button>') +
            '<button class="c2-btn c2-secondary" type="button" data-screen="module">View module map</button>' +
          '</div>' +
        '</div>' +
        '<div class="c2-hero-progress">' +
          '<span class="c2-ring" style="--p:' + pct(done, LD.LESSONS.length) + '"><strong>' + done + '</strong><small>of ' + LD.LESSONS.length + '<br>lessons</small></span>' +
          '<p>' + (done === LD.LESSONS.length ? esc(MOD.code) + ' teaching complete.' : esc(next.title) + ' is next.') + '</p>' +
        '</div>' +
      '</section>' +
      '<section class="c2-overview-grid">' +
        MODULES.map(moduleCardHtml).join('') +
        '<article class="c2-panel c2-path-card">' +
          '<div class="c2-eyebrow">Qualification path</div><h2>Five mandatory modules</h2>' +
          '<ol class="c2-mini-modules">' + PATH.map(function (m) {
            var live = !!moduleById(m.id);
            return '<li' + (live ? ' class="is-live"' : '') + '><span>' + esc(m.code) + '</span><b>' + esc(m.title) + '</b>' +
              '<small>' + (live ? 'learning content available' : 'syllabus mapped') + '</small></li>';
          }).join('') + '</ol>' +
        '</article>' +
      '</section>' + examFactHtml() +
    '</div>';
  }

  /* One card per module that has content. The card for the module the reader is
     already in opens its map; the others switch to that module first — which is
     the only place in the page where the active module changes, so there is one
     path for a reader to change course and one place for it to go wrong. */
  function moduleCardHtml(m) {
    var mine = m.id === S.moduleId;
    var lessons = m.learn.LESSONS.length;
    var mins = m.learn.LESSONS.reduce(function (t, l) { return t + l.minutes; }, 0);
    var mdone = doneCountFor(m);
    return '<article class="c2-panel c2-module-card' + (mine ? ' is-current' : '') + '">' +
      '<div class="c2-module-top"><span class="c2-code">' + esc(m.syl.code) + '</span>' +
        '<span class="c2-status is-live">' + (mine ? 'Current module' : 'Complete module') + '</span></div>' +
      '<h2>' + esc(m.syl.title) + '</h2>' +
      '<p>' + m.syl.outcomes.length + ' learning outcomes · ' + lessons + ' lessons · about ' +
        Math.round(mins / 60 * 10) / 10 + ' hours of guided reading and checks</p>' +
      progressBar(mdone, lessons, m.syl.code + ' lessons') +
      '<button class="c2-textbtn" type="button" data-open-module="' + esc(m.id) + '">' +
        (mine ? 'Open ' : 'Switch to ') + esc(m.syl.code) + ' <span aria-hidden="true">→</span></button>' +
    '</article>';
  }

  function moduleHtml() {
    var groups = LD.GROUPS.map(function (g) {
      var ls = g.lessonIds.map(function (id) { return LD.lesson(id); }).filter(Boolean);
      var gd = ls.filter(function (l) { return lessonDone(l.id); }).length;
      var o = outcome(g.lo);
      return '<section class="c2-lo" id="c2lo-' + g.lo + '">' +
        '<div class="c2-lo-head"><div><span class="c2-lo-num">Learning outcome ' + g.lo + '</span><h2>' + esc(o ? o.title : g.title) + '</h2></div>' +
          '<span class="c2-lo-count">' + gd + '/' + ls.length + '</span></div>' +
        '<div class="c2-lesson-list">' + ls.map(function (l) {
          var c = criterion(l.criterion);
          return '<button class="c2-lesson-row' + (lessonDone(l.id) ? ' is-done' : '') + '" type="button" data-go="lesson" data-id="' + esc(l.id) + '">' +
            '<span class="c2-step">' + (lessonDone(l.id) ? '✓' : String(lessonStep(l.id))) + '</span>' +
            '<span class="c2-lesson-copy"><strong>' + esc(l.title) + '</strong><small>' + esc(c ? c.title : l.summary) + '</small></span>' +
            '<span class="c2-mins">' + l.minutes + ' min</span><span class="c2-chevron" aria-hidden="true">›</span>' +
          '</button>';
        }).join('') + '</div></section>';
    }).join('');
    return '<div class="c2-page c2-module"><div class="c2-pagehead"><div><div class="c2-eyebrow">' + esc(MOD.code) + ' · ' + MOD.credits + ' credits</div>' +
      '<h1 id="c2PageTitle">' + esc(MOD.title) + '</h1><p>Every lesson maps to one published assessment criterion. Complete the short checkpoint at the end to mark a lesson done.</p></div>' +
      '<div class="c2-page-progress"><strong>' + completedCount() + '/' + LD.LESSONS.length + '</strong><span>lessons complete</span></div></div>' +
      groups + '</div>';
  }

  function cardKindLabel(kind) {
    return { concept:'Core idea', compare:'Compare', process:'Process', scenario:'Applied example', recap:'Recap' }[kind] || 'Lesson';
  }
  function lessonHtml() {
    var l = LD.lesson(S.lessonId);
    if (!l) { S.screen = 'module'; return moduleHtml(); }
    if (S.lessonPhase === 'check') return checkpointHtml(l);
    if (S.lessonPhase === 'complete') return lessonCompleteHtml(l);
    var idx = Math.max(0, Math.min(S.cardIdx, l.cards.length - 1));
    var c = l.cards[idx];
    return '<div class="c2-page c2-reader">' +
      ctxBar({ back: true, backLabel: 'Back to the module map', title: l.title,
        meta: 'Lesson ' + lessonStep(l.id) + ' of ' + LD.LESSONS.length + ' · ' + l.criterion +
              ' · card ' + (idx + 1) + ' of ' + l.cards.length,
        pct: pct(idx + 1, l.cards.length) }) +
      '<article class="c2-reading-card c2-kind-' + esc(c.kind) + '">' +
        '<div class="c2-card-label">' + esc(cardKindLabel(c.kind)) + '</div><h1 id="c2PageTitle">' + esc(c.h) + '</h1>' +
        (c.p || []).map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') +
        ((c.points || []).length ? '<ul class="c2-keypoints">' + c.points.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ul>' : '') +
        (c.note ? '<aside class="c2-note">' + esc(c.note) + '</aside>' : '') +
      '</article>' +
      '<div class="c2-reader-nav"><button class="c2-btn c2-secondary" type="button" data-card="prev"' + (idx === 0 ? ' disabled' : '') + '>Back</button>' +
        (idx === l.cards.length - 1 ? '<button class="c2-btn c2-primary" type="button" data-start-check>Check your understanding →</button>' :
          '<button class="c2-btn c2-primary" type="button" data-card="next">Next →</button>') + '</div>' +
      '<p class="c2-keyhint">Keyboard: ← / → moves between lesson cards.</p>' +
    '</div>';
  }

  function checkpointHtml(l) {
    var qs = l.check || [];
    var qi = Math.max(0, Math.min(S.checkIdx, qs.length - 1));
    var q = qs[qi];
    return '<div class="c2-page c2-check">' +
      ctxBar({ back: true, backLabel: 'Back to the lesson', title: l.title,
        meta: 'Checkpoint · question ' + (qi + 1) + ' of ' + qs.length,
        pct: pct(qi + (S.checkAnswered ? 1 : 0), qs.length) }) +
      '<section class="c2-question-card"><div class="c2-card-label">Check ' + (qi + 1) + ' of ' + qs.length + '</div><h1 id="c2PageTitle">' + esc(q.prompt) + '</h1>' +
      '<div class="c2-options">' + q.options.map(function (o, i) {
        var cls = '';
        if (S.checkAnswered) {
          if (i === q.answer) cls = ' is-right'; else if (i === S.checkChoice) cls = ' is-wrong';
        } else if (i === S.checkChoice) cls = ' is-selected';
        return '<button type="button" class="c2-option' + cls + '" data-check-choice="' + i + '"' + (S.checkAnswered ? ' disabled' : '') + '><span>' + String.fromCharCode(65+i) + '</span>' + esc(o) + '</button>';
      }).join('') + '</div>' +
      (S.checkAnswered ? '<div class="c2-feedback ' + (S.checkChoice === q.answer ? 'is-right' : 'is-wrong') + '" role="status"><strong>' + (S.checkChoice === q.answer ? 'Correct' : 'Not quite') + '</strong><p>' + esc(q.exp) + '</p></div>' : '') +
      '</section><div class="c2-reader-nav"><span></span>' +
      (S.checkAnswered ? (qi === qs.length - 1 ? '<button class="c2-btn c2-primary" type="button" data-finish-check>Finish lesson →</button>' : '<button class="c2-btn c2-primary" type="button" data-next-check>Next question →</button>') : '<span class="c2-answerhint">Choose one answer</span>') +
      '</div></div>';
  }

  function lessonCompleteHtml(l) {
    var total = (l.check || []).length;
    return '<div class="c2-page c2-complete"><section class="c2-complete-card"><div class="c2-complete-mark" aria-hidden="true">✓</div>' +
      '<div class="c2-eyebrow">Lesson complete</div><h1 id="c2PageTitle">' + esc(l.title) + '</h1>' +
      '<p>You scored <strong>' + S.checkCorrect + ' / ' + total + '</strong> on the checkpoint. Completion records that you worked through the lesson; practice is where you build exam readiness.</p>' +
      '<div class="c2-complete-actions"><button class="c2-btn c2-primary" type="button" data-next-lesson>Continue to next lesson →</button>' +
      '<button class="c2-btn c2-secondary" type="button" data-screen="module">Back to module</button></div></section></div>';
  }

  function practiceLandingHtml() {
    var overall = practiceTotals();
    var wrong = wrongQuestions();
    return '<div class="c2-page c2-practice"><div class="c2-pagehead"><div><div class="c2-eyebrow">Original question bank · ' + esc(MOD.code) + '</div><h1 id="c2PageTitle">Practice</h1>' +
      '<p>Choose one learning outcome for a focused run of ' + PB.forLo(MOD.outcomes[0].n).length + ', or mixed practice for ' + (MOD.outcomes.length * 2) + ' questions drawn evenly across all ' + MOD.outcomes.length + ' outcomes.</p></div>' +
      (overall.attempted ? '<div class="c2-page-progress"><strong>' + pct(overall.correct, overall.attempted) + '%</strong><span>lifetime accuracy</span></div>' : '') + '</div>' +
      '<div class="c2-practice-grid">' + MOD.outcomes.map(function (o) {
        var r = loRecord(o.n); return '<button class="c2-practice-choice" type="button" data-start-practice="' + o.n + '"><span>LO ' + o.n + '</span><strong>' + esc(shortOutcome(o.title)) + '</strong><small>' + (r.attempted ? pct(r.correct,r.attempted) + '% accuracy' : PB.forLo(o.n).length + ' questions') + '</small></button>';
      }).join('') +
      '<button class="c2-practice-choice is-mixed" type="button" data-start-practice="mix"><span>Mixed</span><strong>All learning outcomes</strong><small>' + (MOD.outcomes.length * 2) + ' questions · evenly drawn</small></button>' +
      (wrong.length ? '<button class="c2-practice-choice is-wrong" type="button" data-start-practice="wrong"><span>Repair</span><strong>Questions you got wrong</strong><small>' + wrong.length + ' waiting</small></button>' : '') +
      '</div>' +
      /* The module code, the question count and the per-outcome count were all
         typed here, and described L2M1 alone. On L2M2 every one of them was
         wrong — a 36-question paper announced as 72. They come from
         MOD.assessment now, beside the exam-shape panel that already did. */
      '<aside class="c2-practice-note"><strong>Assessment format:</strong> CIPS publishes ' + esc(MOD.code) +
        ' as a ' + MOD.assessment.questionCount + '-question objective-response examination with ' +
        MOD.assessment.questionsPerLearningOutcome + ' questions per learning outcome. ' +
        'This practice bank follows the syllabus scope but does not reproduce the official assessment.</aside>' +
    '</div>';
  }
  function shortOutcome(t) { return String(t).replace(/^Understand /,'').replace(/^Know /,'').replace(/^how /,''); }

  function currentPracticeHtml() {
    var q = S.practiceQs[S.practiceIdx];
    if (!q) return practiceResultsHtml();
    return '<div class="c2-page c2-practice-run">' +
      ctxBar({ back: true, backLabel: 'End this practice run', title: runTitle(),
        meta: 'Question ' + (S.practiceIdx + 1) + ' of ' + S.practiceQs.length +
              ' · ' + S.practiceCorrect + ' correct so far',
        pct: pct(S.practiceIdx + (S.practiceAnswered ? 1 : 0), S.practiceQs.length) }) +
      '<section class="c2-question-card"><div class="c2-card-label">LO ' + q.lo + ' · ' + esc(q.criteria.join(', ')) + '</div><h1 id="c2PageTitle">' + esc(q.q) + '</h1>' +
      '<div class="c2-options">' + q.options.map(function (o, i) {
        var cls = '';
        if (S.practiceAnswered) {
          if (i === q.answer) cls = ' is-right'; else if (i === S.practiceChoice) cls = ' is-wrong';
        } else if (i === S.practiceChoice) cls = ' is-selected';
        return '<button type="button" class="c2-option' + cls + '" data-practice-choice="' + i + '"' + (S.practiceAnswered ? ' disabled' : '') + '><span>' + String.fromCharCode(65+i) + '</span>' + esc(o) + '</button>';
      }).join('') + '</div>' +
      (S.practiceAnswered ? '<div class="c2-feedback ' + (S.practiceChoice === q.answer ? 'is-right' : 'is-wrong') + '" role="status"><strong>' + (S.practiceChoice === q.answer ? 'Correct' : 'Incorrect') + '</strong><p>' + esc(q.exp) + '</p></div>' : '') +
      '</section><div class="c2-reader-nav"><span></span>' + (S.practiceAnswered ? '<button class="c2-btn c2-primary" type="button" data-next-practice>' + (S.practiceIdx === S.practiceQs.length - 1 ? 'View results →' : 'Next question →') + '</button>' : '<span class="c2-answerhint">Press 1–' + q.options.length + ' or choose an answer</span>') + '</div></div>';
  }

  function practiceResultsHtml() {
    var total = S.practiceResults.length || S.practiceQs.length;
    var score = S.practiceCorrect;
    var byLo = {};
    S.practiceResults.forEach(function (r) { var x = byLo[r.lo] || (byLo[r.lo] = {a:0,c:0}); x.a++; if (r.correct) x.c++; });
    return '<div class="c2-page c2-results"><section class="c2-result-hero"><div class="c2-result-score"><strong>' + pct(score,total) + '%</strong><span>' + score + ' of ' + total + '</span></div>' +
      '<div><div class="c2-eyebrow">Practice complete</div><h1 id="c2PageTitle">' + (pct(score,total) >= 70 ? 'A solid run' : 'Keep building the weak areas') + '</h1><p>Use the learning-outcome breakdown to decide what to revisit. The official pass rule applies per learning-outcome section, so an overall percentage can hide a weak area.</p></div></section>' +
      '<section class="c2-panel"><h2>Breakdown</h2><div class="c2-lo-results">' + Object.keys(byLo).sort().map(function (lo) { var r=byLo[lo]; return '<div><span>LO '+lo+'</span>'+progressBar(r.c,r.a,'LO '+lo+' accuracy')+'<strong>'+r.c+'/'+r.a+'</strong></div>'; }).join('') + '</div></section>' +
      '<div class="c2-complete-actions"><button class="c2-btn c2-primary" type="button" data-screen="practice">Practice again</button><button class="c2-btn c2-secondary" type="button" data-screen="progress">View progress</button></div></div>';
  }

  function loRecord(lo) {
    var r = data.practice.los[String(lo)] || {};
    return { attempted:n0(r.attempted), correct:n0(r.correct) };
  }
  function practiceTotals() {
    var x={attempted:0,correct:0};
    Object.keys(data.practice.los).forEach(function(k){var r=loRecord(k);x.attempted+=r.attempted;x.correct+=r.correct;});
    return x;
  }
  function progressHtml() {
    var done = completedCount(), overall = practiceTotals();
    return '<div class="c2-page c2-progress"><div class="c2-pagehead"><div><div class="c2-eyebrow">Your ' + esc(MOD.code) + ' record</div><h1 id="c2PageTitle">Progress</h1><p>Lesson completion shows coverage. Practice accuracy shows retrieval. Keep both moving.</p></div></div>' +
      '<div class="c2-statgrid"><article><strong>'+done+'</strong><span>of '+LD.LESSONS.length+' lessons</span></article><article><strong>'+data.practice.runs+'</strong><span>practice runs</span></article><article><strong>'+(overall.attempted?pct(overall.correct,overall.attempted)+'%':'—')+'</strong><span>practice accuracy</span></article><article><strong>'+data.checkpoint.correct+'/'+data.checkpoint.attempted+'</strong><span>checkpoint answers</span></article></div>' +
      '<section class="c2-panel"><h2>Learning outcomes</h2><div class="c2-progress-los">' + MOD.outcomes.map(function(o){var ls=LD.lessonsForLo(o.n),ld=ls.filter(function(l){return lessonDone(l.id);}).length,r=loRecord(o.n);return '<article><div class="c2-progress-lohead"><span>LO '+o.n+'</span><strong>'+esc(shortOutcome(o.title))+'</strong></div><div class="c2-progress-line"><span>Lessons</span>'+progressBar(ld,ls.length,'LO '+o.n+' lesson completion')+'</div><div class="c2-progress-line"><span>Practice</span>'+(r.attempted?progressBar(r.correct,r.attempted,'LO '+o.n+' practice accuracy'):'<em>No practice yet</em>')+'</div></article>';}).join('') + '</div></section></div>';
  }

  function glossaryHtml() {
    var term = S.glossaryQuery.toLowerCase().trim();
    var rows = LD.GLOSSARY.filter(function (g) { return !term || (g[0]+' '+g[1]).toLowerCase().indexOf(term) >= 0; });
    return '<div class="c2-page c2-glossary"><div class="c2-pagehead"><div><div class="c2-eyebrow">' + esc(MOD.code) + ' reference</div><h1 id="c2PageTitle">Glossary</h1><p>Short definitions for the vocabulary used in this module.</p></div></div>' +
      '<label class="c2-search"><span>Search terms</span><input id="c2GlossarySearch" type="search" value="'+esc(S.glossaryQuery)+'" placeholder="e.g. PQQ, upstream, value for money" autocomplete="off"></label>' +
      '<dl class="c2-glossary-list">'+rows.map(function(g){return '<div><dt>'+esc(g[0])+'</dt><dd>'+esc(g[1])+'</dd></div>';}).join('')+'</dl>' +
      (!rows.length?'<p class="c2-empty">No matching terms.</p>':'')+'</div>';
  }

  /* THE SECTION TABS, in the app's own component and in the app's own place.
     They used to be a CIPS-only strip inside the chrome, which made the bar at
     the top of this page twice the height of the bar on every other subject.
     Level 2 renders `.nav-tabs` inside its own screen and lets them scroll; so
     does this now.

     Not on the screens that have a context bar. Tabs answer "which section",
     the context bar answers "what am I inside and how do I leave" — showing
     both would offer two different navigations for one screen, and CIPS is the
     only place in the app that ever did. */
  function tabs() {
    return [
      { id: 'home', label: 'Overview' },
      /* Not a constant: with two modules live, a tab permanently reading "L2M1"
         would name the wrong course for half the readers using it. */
      { id: 'module', label: MOD.code },
      { id: 'practice', label: 'Practice' },
      { id: 'progress', label: 'Progress' },
      { id: 'glossary', label: 'Glossary' }
    ];
  }
  function tabsHtml() {
    return '<div class="nav-tabs" role="tablist">' + tabs().map(function (t) {
      var on = t.id === S.screen || (t.id === 'practice' && S.screen === 'results');
      return '<button class="nav-tab' + (on ? ' active' : '') + '" type="button" role="tab"' +
        ' aria-selected="' + (on ? 'true' : 'false') + '" data-c2nav="' + t.id + '">' + esc(t.label) + '</button>';
    }).join('') + '</div>';
  }
  /* A screen is "deep" when it is inside something the context bar names — and
     the test has to be exactly that, because the tabs are hidden on the strength
     of it. The completion card at the end of a lesson draws no context bar, so
     counting it as deep left a screen with no app navigation at all: no tabs,
     no back arrow, nothing but its own two buttons. */
  function isDeep() {
    if (S.screen === 'lesson') return S.lessonPhase !== 'complete';
    return S.screen === 'practice' && S.practiceQs.length > 0;
  }

  function screenHtml() {
    if (S.screen === 'module') return moduleHtml();
    if (S.screen === 'lesson') return lessonHtml();
    if (S.screen === 'practice') return S.practiceQs.length ? currentPracticeHtml() : practiceLandingHtml();
    if (S.screen === 'results') return practiceResultsHtml();
    if (S.screen === 'progress') return progressHtml();
    if (S.screen === 'glossary') return glossaryHtml();
    return homeHtml();
  }
  function mainHtml() {
    return (isDeep() ? '' : '<div class="c2-nav">' + tabsHtml() + '</div>') + screenHtml();
  }

  var host = document.getElementById('cipsApp');
  function render(opts) {
    if (!host) return;
    host.innerHTML = mainHtml();
    wire();
    applyTheme();
    /* Every repaint, because the platform back button's behaviour depends on
       how deep the reader is and that is what a repaint changes. Cheap: it
       compares one boolean against one boolean. */
    if (root.AATNav) root.AATNav.sync();
    if (opts && opts.focus) {
      setTimeout(function(){var h=document.getElementById('c2PageTitle'); if(h){h.setAttribute('tabindex','-1');h.focus({preventScroll:true});}},0);
    }
  }

  /* ── What "back" means, in one place ───────────────────────────────────────
     The context bar's arrow and the platform back button must do the same
     thing. A gesture that behaved differently from the button beside it would
     be a second, invisible set of rules — so both call this, and nav-history.js
     asks canGoBack() whether there is anywhere to go. */
  function canGoBack() {
    if (S.screen === 'lesson') return true;
    if (S.screen === 'practice' && S.practiceQs.length) return true;
    if (S.screen === 'results') return true;
    return false;
  }
  function goBack() {
    if (S.screen === 'lesson') {
      /* Out of the checkpoint to the reading first, then out of the lesson —
         one step at a time, the same steps the arrow takes. */
      if (S.lessonPhase === 'check') { S.lessonPhase = 'read'; render({ focus: true }); return; }
      S.screen = 'module'; S.lessonId = null; render({ focus: true }); return;
    }
    if (S.screen === 'results' || (S.screen === 'practice' && S.practiceQs.length)) {
      S.practiceQs = []; S.practiceResults = []; S.screen = 'practice'; render({ focus: true }); return;
    }
  }

  /* Switching module resets everything that names a lesson or a question,
     because every one of those ids belongs to the module being left. A practice
     run left in flight would otherwise be graded against the other module's
     bank. */
  function openModule(id) {
    if (!moduleById(id)) return;
    setModule(id);
    S.screen = 'module'; S.lessonId = null; S.cardIdx = 0; S.lessonPhase = 'read';
    S.practiceQs = []; S.practiceResults = []; S.practiceIdx = 0;
    S.practiceChoice = null; S.practiceAnswered = false; S.practiceCorrect = 0;
    S.glossaryQuery = '';
    save();
    render({ focus: true });
  }

  /* THE TOP OF THE NEW CARD, NOT WHEREVER THE LAST ONE ENDED.
     Cards vary from a short recap to several hundred words, so pressing Next
     at the foot of a long card left the page scrolled to that same offset in
     the new one — which does not read as a scroll position, it reads as the
     first paragraphs being missing. The card is placed just below the sticky
     stack rather than at viewport zero, because the chrome and the context bar
     cover the top of the page and scrolling the card under them would hide the
     heading the reader is looking for. */
  function scrollToCard() {
    var card = host && host.querySelector('.c2-reading-card');
    if (!card) return;
    var chrome = document.querySelector('[data-app-chrome]');
    var ctx = host.querySelector('.c2-ctx');
    var covered = (chrome ? chrome.getBoundingClientRect().height : 0) +
                  (ctx ? ctx.getBoundingClientRect().height : 0);
    var y = card.getBoundingClientRect().top +
            (window.pageYOffset || document.documentElement.scrollTop || 0) - covered - 12;
    window.scrollTo(0, Math.max(0, y));
  }
  function showCard(delta) {
    var l = LD.lesson(S.lessonId);
    if (!l) return;
    var next = Math.max(0, Math.min(l.cards.length - 1, S.cardIdx + delta));
    if (next === S.cardIdx) return;
    S.cardIdx = next;
    /* focus:true moves the reader to the new card's heading as well; it focuses
       with preventScroll, so it does not fight the scroll above. */
    render({ focus: true });
    scrollToCard();
  }

  function openLesson(id) {
    if (!LD.lesson(id)) return;
    S.screen='lesson'; S.lessonId=id; S.cardIdx=0; S.lessonPhase='read';
    S.checkIdx=0; S.checkChoice=null; S.checkAnswered=false; S.checkCorrect=0;
    render({focus:true});
  }
  function finishLesson() {
    var l=LD.lesson(S.lessonId); if(!l)return;
    data.lessons[l.id]={done:true,at:Date.now(),checkpoint:{correct:S.checkCorrect,total:(l.check||[]).length}};
    save(); S.lessonPhase='complete'; render({focus:true});
  }
  function nextAfterLesson() {
    var idx=LD.LESSONS.map(function(l){return l.id;}).indexOf(S.lessonId);
    if(idx>=0 && idx<LD.LESSONS.length-1) openLesson(LD.LESSONS[idx+1].id);
    else {S.screen='module';S.lessonId=null;render({focus:true});}
  }

  function runTitle() {
    if (S.practiceLo === 'wrong') return 'Questions you got wrong';
    if (String(S.practiceLo) === 'mix') return 'Mixed practice';
    var o = outcome(S.practiceLo);
    return 'LO ' + S.practiceLo + (o ? ' · ' + shortOutcome(o.title) : '');
  }

  /* THE QUESTIONS THIS READER GOT WRONG AND HAS NOT PUT RIGHT SINCE.
     recordPractice has always written these two timestamps, in the same shape
     the AAT levels use — and until now nothing ever read them back, so every
     mistake was recorded and then forgotten. Last answer wins: `w` later than
     `r` means the most recent attempt was wrong. */
  function wrongQuestions() {
    return PB.QUESTIONS.filter(function (q) {
      var r = data.practice.qs[q.id];
      return !!r && n0(r.w) > n0(r.r);
    });
  }

  function drawPractice(lo) {
    var qs = [];
    if (String(lo) === 'wrong') {
      qs = shuffle(wrongQuestions());
      if (!qs.length) return;            /* the button is not offered when empty */
    } else if (String(lo) === 'mix') {
      /* Two from each learning outcome the module actually has, rather than two
         from each of a hard-coded six. L2M1 has six; a module that does not
         would otherwise draw from outcomes that are not there and skip its own. */
      MOD.outcomes.forEach(function (o) { qs = qs.concat(shuffle(PB.forLo(o.n)).slice(0, 2)); });
      qs = shuffle(qs);
    } else qs = shuffle(PB.forLo(Number(lo)));
    S.practiceLo=lo; S.practiceQs=qs; S.practiceIdx=0; S.practiceChoice=null;
    S.practiceAnswered=false; S.practiceCorrect=0; S.practiceResults=[];
    data.practice.runs++; save(); render({focus:true});
  }
  function recordPractice(q, correct) {
    var k=String(q.lo),r=data.practice.los[k]||(data.practice.los[k]={attempted:0,correct:0});
    r.attempted=(r.attempted||0)+1;if(correct)r.correct=(r.correct||0)+1;
    var qr=data.practice.qs[q.id]||(data.practice.qs[q.id]={});
    if(correct)qr.r=Date.now();else qr.w=Date.now();
    save();
  }

  function wire() {
    Array.prototype.forEach.call(host.querySelectorAll('[data-c2nav]'),function(b){b.addEventListener('click',function(){S.practiceQs=[];S.practiceResults=[];S.lessonId=null;S.screen=b.getAttribute('data-c2nav');render({focus:true});});});
    Array.prototype.forEach.call(host.querySelectorAll('[data-open-module]'),function(b){b.addEventListener('click',function(){openModule(b.getAttribute('data-open-module'));});});
    Array.prototype.forEach.call(host.querySelectorAll('[data-screen]'),function(b){b.addEventListener('click',function(){S.screen=b.getAttribute('data-screen');S.practiceQs=[];S.lessonId=null;render({focus:true});});});
    Array.prototype.forEach.call(host.querySelectorAll('[data-go="lesson"]'),function(b){b.addEventListener('click',function(){openLesson(b.getAttribute('data-id'));});});
    Array.prototype.forEach.call(host.querySelectorAll('[data-card]'),function(b){b.addEventListener('click',function(){showCard(b.getAttribute('data-card')==='next'?1:-1);});});
    /* checkCorrect resets HERE, not only in openLesson. The checkpoint can be
       entered more than once in a single visit to a lesson — answer a question,
       press the back arrow to re-read a card, press "Check your understanding"
       again — and the other three fields were reset while the score was not.
       Answers from the abandoned attempt were still counted, so a two-question
       checkpoint reported "You scored 3 / 2" and stored {correct:3,total:2}. */
    var sc=host.querySelector('[data-start-check]');if(sc)sc.addEventListener('click',function(){S.lessonPhase='check';S.checkIdx=0;S.checkChoice=null;S.checkAnswered=false;S.checkCorrect=0;render({focus:true});});
    var cb=host.querySelector('[data-ctx-back]');if(cb)cb.addEventListener('click',function(){goBack();});
    Array.prototype.forEach.call(host.querySelectorAll('[data-check-choice]'),function(b){b.addEventListener('click',function(){if(S.checkAnswered)return;var l=LD.lesson(S.lessonId),q=l.check[S.checkIdx],choice=Number(b.getAttribute('data-check-choice'));S.checkChoice=choice;S.checkAnswered=true;data.checkpoint.attempted++;if(choice===q.answer){S.checkCorrect++;data.checkpoint.correct++;}save();render();});});
    var nc=host.querySelector('[data-next-check]');if(nc)nc.addEventListener('click',function(){S.checkIdx++;S.checkChoice=null;S.checkAnswered=false;render({focus:true});});
    var fc=host.querySelector('[data-finish-check]');if(fc)fc.addEventListener('click',finishLesson);
    var nl=host.querySelector('[data-next-lesson]');if(nl)nl.addEventListener('click',nextAfterLesson);
    Array.prototype.forEach.call(host.querySelectorAll('[data-start-practice]'),function(b){b.addEventListener('click',function(){drawPractice(b.getAttribute('data-start-practice'));});});
    Array.prototype.forEach.call(host.querySelectorAll('[data-practice-choice]'),function(b){b.addEventListener('click',function(){if(S.practiceAnswered)return;var q=S.practiceQs[S.practiceIdx],choice=Number(b.getAttribute('data-practice-choice')),right=choice===q.answer;S.practiceChoice=choice;S.practiceAnswered=true;if(right)S.practiceCorrect++;S.practiceResults.push({id:q.id,lo:q.lo,correct:right});recordPractice(q,right);render();});});
    var np=host.querySelector('[data-next-practice]');if(np)np.addEventListener('click',function(){if(S.practiceIdx>=S.practiceQs.length-1){S.screen='results';render({focus:true});return;}S.practiceIdx++;S.practiceChoice=null;S.practiceAnswered=false;render({focus:true});});
    var gs=host.querySelector('#c2GlossarySearch');if(gs)gs.addEventListener('input',function(e){S.glossaryQuery=e.target.value;var pos=e.target.selectionStart;render();var n=host.querySelector('#c2GlossarySearch');if(n){n.focus();try{n.setSelectionRange(pos,pos);}catch(_){}}});
  }

  /* The shared header's three controls, bound to the ids app.js binds on
     index.html. app.js is not on this page, so the bindings are here — but the
     ids, the classes and the behaviour are the ones every other subject has. */
  var theme = document.getElementById('darkToggle');
  if (theme) theme.addEventListener('click', function () {
    store.settings.darkMode = !document.body.classList.contains('dark');
    save(); applyTheme();
  });
  var home = document.getElementById('homeNavBtn');
  if (home) home.addEventListener('click', function () {
    S.practiceQs = []; S.practiceResults = []; S.lessonId = null; S.screen = 'home';
    render({ focus: true });
  });
  /* The brand is the way out of a subject on every other page in this app,
     where it opens the picker in place. The picker lives on index.html, so this
     copy has to travel — and it must ASK FOR THE PICKER on arrival. Going to
     index.html plain re-opens whichever subject was last active, so a caret
     labelled "switch subject" landed the reader in Level 3 having never been
     offered a choice. app.js reads the hash and opens the picker. */
  var brand = document.getElementById('subjectSwitcherBtn');
  if (brand) brand.addEventListener('click', function () { window.location.href = 'index.html#subjects'; });

  document.addEventListener('keydown',function(e){
    if(e.altKey||e.ctrlKey||e.metaKey)return;
    var tag=(e.target&&e.target.tagName||'').toLowerCase();if(tag==='input'||tag==='textarea'||tag==='select')return;
    if(S.screen==='lesson'&&S.lessonPhase==='read'){
      var l=LD.lesson(S.lessonId);if(!l)return;
      /* The arrows are the same move as the buttons, so they go through the
         same function — an earlier version scrolled on the button and not on
         the key, which is the kind of split nobody notices until they use the
         other one. */
      if(e.key==='ArrowRight'&&S.cardIdx<l.cards.length-1){e.preventDefault();showCard(1);}
      if(e.key==='ArrowLeft'&&S.cardIdx>0){e.preventDefault();showCard(-1);}
    } else if(S.screen==='practice'&&S.practiceQs.length&&!S.practiceAnswered&&/^[1-9]$/.test(e.key)){
      /* Bounded by the question, not by a constant: every question in the bank
         has four options today, and a five-option one would have left its fifth
         unreachable from the keyboard. */
      var q=S.practiceQs[S.practiceIdx];
      if(q&&Number(e.key)<=q.options.length){
        var b=host.querySelector('[data-practice-choice="'+(Number(e.key)-1)+'"]');if(b){e.preventDefault();b.click();}
      }
    }
  });

  /* THE PLATFORM BACK BUTTON, which on this page used to leave CIPS outright.
     Two screens into a lesson, one press landed the reader back on the AAT
     subject picker — the bug nav-history.js was written for, on the one page
     that did not load it. Every AAT subject has had this; CIPS is a page in the
     same installed app and a reader does not know or care which file they are
     looking at. */
  if (root.AATNav) root.AATNav.init({ canGoBack: canGoBack, back: goBack });

  load();
  setModule(store.activeModule);
  /* Write the migrated file back at once rather than waiting for the reader to
     do something that saves. Until it is written, the file on disk still has
     the old top-level keys, so anything reading it — a backup, an export, the
     sync worker, the next version of this page — sees a shape the app no longer
     writes. Only after a migration: a reader with no progress at all should not
     have a progress file created for them just by opening the page. */
  if (migrated) save();
  applyTheme(); render();
})(typeof window !== 'undefined' ? window : globalThis);
