/* CIPS Level 2 — learner-facing shell for the first complete module (L2M1).
 *
 * Deliberately self-contained. The main study app's app.js is a large shared
 * surface; this subject owns its reader, progress and practice state so the
 * CIPS experience can evolve without changing AAT's question engine.
 */
(function (root) {
  'use strict';

  var MOD = root.CIPS2_MODULES && root.CIPS2_MODULES.l2m1;
  var LD = root.CIPS2_L2M1_LEARN;
  var PB = root.CIPS2_L2M1_PRACTICE;
  var STORE_KEY = 'prep_v2_cips2';

  if (!MOD || !LD || !PB) {
    var fail = document.getElementById('cipsApp');
    if (fail) fail.innerHTML = '<div class="c2-fatal"><h1>CIPS content could not load</h1><p>Reload the page. If you are offline, open CIPS once while connected so it can be stored for offline study.</p></div>';
    return;
  }

  var S = {
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

  var data = {
    settings: { darkMode: null },
    lessons: {},
    checkpoint: { attempted: 0, correct: 0 },
    practice: { runs: 0, los: {}, qs: {} }
  };

  function n0(v) { return typeof v === 'number' && isFinite(v) && v > 0 ? v : 0; }
  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (!raw) return;
      var p = JSON.parse(raw) || {};
      if (p.settings) data.settings.darkMode = p.settings.darkMode;
      if (p.lessons && typeof p.lessons === 'object') data.lessons = p.lessons;
      if (p.checkpoint) {
        data.checkpoint.attempted = n0(p.checkpoint.attempted);
        data.checkpoint.correct = n0(p.checkpoint.correct);
      }
      if (p.practice && typeof p.practice === 'object') {
        data.practice.runs = n0(p.practice.runs);
        data.practice.los = p.practice.los && typeof p.practice.los === 'object' ? p.practice.los : {};
        data.practice.qs = p.practice.qs && typeof p.practice.qs === 'object' ? p.practice.qs : {};
      }
    } catch (e) { /* corrupt progress must never prevent studying */ }
  }
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(data)); } catch (e) {}
    if (root.ProgressSync) root.ProgressSync.noteLocalChange();
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
  function completedCount() { return LD.LESSONS.filter(function (l) { return lessonDone(l.id); }).length; }
  function nextLesson() { return LD.LESSONS.filter(function (l) { return !lessonDone(l.id); })[0] || LD.LESSONS[0]; }
  function totalMinutes() { return LD.LESSONS.reduce(function (s, l) { return s + l.minutes; }, 0); }

  function applyTheme() {
    var dark = data.settings.darkMode;
    if (dark == null) dark = !!(root.matchMedia && root.matchMedia('(prefers-color-scheme: dark)').matches);
    document.body.classList.toggle('dark', !!dark);
    var btn = document.getElementById('c2Theme');
    if (btn) {
      btn.textContent = dark ? '☀ Light' : '🌙 Dark';
      btn.setAttribute('aria-pressed', String(!!dark));
    }
  }

  function progressBar(done, total, label) {
    var p = pct(done, total);
    return '<div class="c2-prog" aria-label="' + esc(label || 'Progress') + ': ' + p + '%">' +
      '<div class="c2-prog-track"><span style="width:' + p + '%"></span></div>' +
      '<span class="c2-prog-num">' + p + '%</span></div>';
  }

  function examFactHtml() {
    return '<aside class="c2-examfact" aria-label="L2M1 assessment format">' +
      '<div class="c2-eyebrow">Assessment context</div>' +
      '<h2>L2M1 exam shape</h2>' +
      '<div class="c2-factgrid">' +
        '<div><strong>' + MOD.assessment.questionCount + '</strong><span>objective-response questions</span></div>' +
        '<div><strong>' + MOD.assessment.durationMinutes + '</strong><span>minutes</span></div>' +
        '<div><strong>' + MOD.assessment.questionsPerLearningOutcome + '</strong><span>questions per learning outcome</span></div>' +
        '<div><strong>' + MOD.assessment.passMark + '%</strong><span>required in each LO section</span></div>' +
      '</div>' +
      '<p>This app’s questions are original practice material, not CIPS past-paper questions.</p>' +
    '</aside>';
  }

  function homeHtml() {
    var done = completedCount();
    var next = nextLesson();
    return '<div class="c2-page c2-home">' +
      '<section class="c2-hero">' +
        '<div class="c2-hero-copy">' +
          '<div class="c2-eyebrow">CIPS Level 2 Certificate · 603/3282/7</div>' +
          '<h1 id="c2PageTitle">Procurement and Supply Operations</h1>' +
          '<p class="c2-lead">A structured route through the qualification syllabus. The first complete module is <strong>L2M1 Introducing Procurement and Supply</strong>.</p>' +
          '<div class="c2-hero-actions">' +
            '<button class="c2-btn c2-primary" type="button" data-go="lesson" data-id="' + esc(next.id) + '">' +
              (done ? 'Continue learning' : 'Start L2M1') + ' <span aria-hidden="true">→</span></button>' +
            '<button class="c2-btn c2-secondary" type="button" data-screen="module">View module map</button>' +
          '</div>' +
        '</div>' +
        '<div class="c2-hero-progress">' +
          '<span class="c2-ring" style="--p:' + pct(done, LD.LESSONS.length) + '"><strong>' + done + '</strong><small>of ' + LD.LESSONS.length + '<br>lessons</small></span>' +
          '<p>' + (done === LD.LESSONS.length ? 'L2M1 teaching complete.' : esc(next.title) + ' is next.') + '</p>' +
        '</div>' +
      '</section>' +
      '<section class="c2-overview-grid">' +
        '<article class="c2-panel c2-module-card">' +
          '<div class="c2-module-top"><span class="c2-code">L2M1</span><span class="c2-status is-live">Complete module</span></div>' +
          '<h2>' + esc(MOD.title) + '</h2>' +
          '<p>' + MOD.outcomes.length + ' learning outcomes · ' + LD.LESSONS.length + ' lessons · about ' + Math.round(totalMinutes()/60*10)/10 + ' hours of guided reading and checks</p>' +
          progressBar(done, LD.LESSONS.length, 'L2M1 lessons') +
          '<button class="c2-textbtn" type="button" data-screen="module">Open L2M1 <span aria-hidden="true">→</span></button>' +
        '</article>' +
        '<article class="c2-panel c2-path-card">' +
          '<div class="c2-eyebrow">Qualification path</div><h2>Five mandatory modules</h2>' +
          '<ol class="c2-mini-modules">' +
            '<li class="is-live"><span>L2M1</span><b>Introducing Procurement and Supply</b><small>learning content available</small></li>' +
            '<li><span>L2M2</span><b>Procurement and Supply Operations</b><small>syllabus mapped</small></li>' +
            '<li><span>L2M3</span><b>Stakeholder Relationships</b><small>syllabus mapped</small></li>' +
            '<li><span>L2M4</span><b>Systems Technology</b><small>syllabus mapped</small></li>' +
            '<li><span>L2M5</span><b>Inventory, Logistics and Expediting</b><small>syllabus mapped</small></li>' +
          '</ol>' +
        '</article>' +
      '</section>' + examFactHtml() +
    '</div>';
  }

  function moduleHtml() {
    var groups = LD.GROUPS.map(function (g) {
      var ls = g.lessonIds.map(function (id) { return LD.lesson(id); }).filter(Boolean);
      var gd = ls.filter(function (l) { return lessonDone(l.id); }).length;
      var o = outcome(g.lo);
      return '<section class="c2-lo" id="c2lo-' + g.lo + '">' +
        '<div class="c2-lo-head"><div><span class="c2-lo-num">Learning outcome ' + g.lo + '</span><h2>' + esc(o ? o.title : g.title) + '</h2></div>' +
          '<span class="c2-lo-count">' + gd + '/' + ls.length + '</span></div>' +
        '<div class="c2-lesson-list">' + ls.map(function (l, i) {
          var c = criterion(l.criterion);
          return '<button class="c2-lesson-row' + (lessonDone(l.id) ? ' is-done' : '') + '" type="button" data-go="lesson" data-id="' + esc(l.id) + '">' +
            '<span class="c2-step">' + (lessonDone(l.id) ? '✓' : String(i + 1)) + '</span>' +
            '<span class="c2-lesson-copy"><strong>' + esc(l.title) + '</strong><small>' + esc(c ? c.title : l.summary) + '</small></span>' +
            '<span class="c2-mins">' + l.minutes + ' min</span><span class="c2-chevron" aria-hidden="true">›</span>' +
          '</button>';
        }).join('') + '</div></section>';
    }).join('');
    return '<div class="c2-page c2-module"><div class="c2-pagehead"><div><div class="c2-eyebrow">L2M1 · ' + MOD.credits + ' credits</div>' +
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
    var dots = l.cards.map(function (_, i) { return '<span class="' + (i <= idx ? 'is-on' : '') + '"></span>'; }).join('');
    return '<div class="c2-page c2-reader">' +
      '<div class="c2-readerbar"><button class="c2-back" type="button" data-screen="module">← Module</button>' +
        '<div class="c2-reader-meta"><span>' + esc(l.criterion) + '</span><strong>' + esc(l.title) + '</strong></div><span class="c2-reader-count">' + (idx + 1) + '/' + l.cards.length + '</span></div>' +
      '<div class="c2-reader-progress">' + dots + '</div>' +
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
    return '<div class="c2-page c2-check"><div class="c2-readerbar"><button class="c2-back" type="button" data-back-read>← Lesson</button>' +
      '<div class="c2-reader-meta"><span>Checkpoint</span><strong>' + esc(l.title) + '</strong></div><span class="c2-reader-count">' + (qi + 1) + '/' + qs.length + '</span></div>' +
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
    return '<div class="c2-page c2-practice"><div class="c2-pagehead"><div><div class="c2-eyebrow">Original question bank · L2M1</div><h1 id="c2PageTitle">Practice</h1>' +
      '<p>Choose one learning outcome for a focused 8-question run, or mixed practice for 12 questions drawn evenly across all six outcomes.</p></div>' +
      (overall.attempted ? '<div class="c2-page-progress"><strong>' + pct(overall.correct, overall.attempted) + '%</strong><span>lifetime accuracy</span></div>' : '') + '</div>' +
      '<div class="c2-practice-grid">' + MOD.outcomes.map(function (o) {
        var r = loRecord(o.n); return '<button class="c2-practice-choice" type="button" data-start-practice="' + o.n + '"><span>LO ' + o.n + '</span><strong>' + esc(shortOutcome(o.title)) + '</strong><small>' + (r.attempted ? pct(r.correct,r.attempted) + '% accuracy' : '8 questions') + '</small></button>';
      }).join('') +
      '<button class="c2-practice-choice is-mixed" type="button" data-start-practice="mix"><span>Mixed</span><strong>All learning outcomes</strong><small>12 questions · evenly drawn</small></button></div>' +
      '<aside class="c2-practice-note"><strong>Assessment format:</strong> CIPS publishes L2M1 as a 72-question objective-response examination with 12 questions per learning outcome. This practice bank follows the syllabus scope but does not reproduce the official assessment.</aside>' +
    '</div>';
  }
  function shortOutcome(t) { return String(t).replace(/^Understand /,'').replace(/^Know /,'').replace(/^how /,''); }

  function currentPracticeHtml() {
    var q = S.practiceQs[S.practiceIdx];
    if (!q) return practiceResultsHtml();
    return '<div class="c2-page c2-practice-run"><div class="c2-runbar"><button class="c2-back" type="button" data-stop-practice>← End practice</button>' +
      '<div class="c2-runprogress"><span>Question ' + (S.practiceIdx + 1) + ' of ' + S.practiceQs.length + '</span><div class="c2-prog-track"><span style="width:' + pct(S.practiceIdx, S.practiceQs.length) + '%"></span></div></div>' +
      '<span class="c2-scorepill">' + S.practiceCorrect + ' correct</span></div>' +
      '<section class="c2-question-card"><div class="c2-card-label">LO ' + q.lo + ' · ' + esc(q.criteria.join(', ')) + '</div><h1 id="c2PageTitle">' + esc(q.q) + '</h1>' +
      '<div class="c2-options">' + q.options.map(function (o, i) {
        var cls = '';
        if (S.practiceAnswered) {
          if (i === q.answer) cls = ' is-right'; else if (i === S.practiceChoice) cls = ' is-wrong';
        } else if (i === S.practiceChoice) cls = ' is-selected';
        return '<button type="button" class="c2-option' + cls + '" data-practice-choice="' + i + '"' + (S.practiceAnswered ? ' disabled' : '') + '><span>' + String.fromCharCode(65+i) + '</span>' + esc(o) + '</button>';
      }).join('') + '</div>' +
      (S.practiceAnswered ? '<div class="c2-feedback ' + (S.practiceChoice === q.answer ? 'is-right' : 'is-wrong') + '" role="status"><strong>' + (S.practiceChoice === q.answer ? 'Correct' : 'Incorrect') + '</strong><p>' + esc(q.exp) + '</p></div>' : '') +
      '</section><div class="c2-reader-nav"><span></span>' + (S.practiceAnswered ? '<button class="c2-btn c2-primary" type="button" data-next-practice>' + (S.practiceIdx === S.practiceQs.length - 1 ? 'View results →' : 'Next question →') + '</button>' : '<span class="c2-answerhint">Press 1–4 or choose an answer</span>') + '</div></div>';
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
    return '<div class="c2-page c2-progress"><div class="c2-pagehead"><div><div class="c2-eyebrow">Your L2M1 record</div><h1 id="c2PageTitle">Progress</h1><p>Lesson completion shows coverage. Practice accuracy shows retrieval. Keep both moving.</p></div></div>' +
      '<div class="c2-statgrid"><article><strong>'+done+'</strong><span>of '+LD.LESSONS.length+' lessons</span></article><article><strong>'+data.practice.runs+'</strong><span>practice runs</span></article><article><strong>'+(overall.attempted?pct(overall.correct,overall.attempted)+'%':'—')+'</strong><span>practice accuracy</span></article><article><strong>'+data.checkpoint.correct+'/'+data.checkpoint.attempted+'</strong><span>checkpoint answers</span></article></div>' +
      '<section class="c2-panel"><h2>Learning outcomes</h2><div class="c2-progress-los">' + MOD.outcomes.map(function(o){var ls=LD.lessonsForLo(o.n),ld=ls.filter(function(l){return lessonDone(l.id);}).length,r=loRecord(o.n);return '<article><div class="c2-progress-lohead"><span>LO '+o.n+'</span><strong>'+esc(shortOutcome(o.title))+'</strong></div><div class="c2-progress-line"><span>Lessons</span>'+progressBar(ld,ls.length,'LO '+o.n+' lesson completion')+'</div><div class="c2-progress-line"><span>Practice</span>'+(r.attempted?progressBar(r.correct,r.attempted,'LO '+o.n+' practice accuracy'):'<em>No practice yet</em>')+'</div></article>';}).join('') + '</div></section></div>';
  }

  function glossaryHtml() {
    var term = S.glossaryQuery.toLowerCase().trim();
    var rows = LD.GLOSSARY.filter(function (g) { return !term || (g[0]+' '+g[1]).toLowerCase().indexOf(term) >= 0; });
    return '<div class="c2-page c2-glossary"><div class="c2-pagehead"><div><div class="c2-eyebrow">L2M1 reference</div><h1 id="c2PageTitle">Glossary</h1><p>Short definitions for the vocabulary used in this module.</p></div></div>' +
      '<label class="c2-search"><span>Search terms</span><input id="c2GlossarySearch" type="search" value="'+esc(S.glossaryQuery)+'" placeholder="e.g. PQQ, upstream, value for money" autocomplete="off"></label>' +
      '<dl class="c2-glossary-list">'+rows.map(function(g){return '<div><dt>'+esc(g[0])+'</dt><dd>'+esc(g[1])+'</dd></div>';}).join('')+'</dl>' +
      (!rows.length?'<p class="c2-empty">No matching terms.</p>':'')+'</div>';
  }

  function mainHtml() {
    if (S.screen === 'module') return moduleHtml();
    if (S.screen === 'lesson') return lessonHtml();
    if (S.screen === 'practice') return S.practiceQs.length ? currentPracticeHtml() : practiceLandingHtml();
    if (S.screen === 'results') return practiceResultsHtml();
    if (S.screen === 'progress') return progressHtml();
    if (S.screen === 'glossary') return glossaryHtml();
    return homeHtml();
  }

  var host = document.getElementById('cipsApp');
  function render(opts) {
    if (!host) return;
    host.innerHTML = mainHtml();
    wire();
    syncNav();
    applyTheme();
    if (opts && opts.focus) {
      setTimeout(function(){var h=document.getElementById('c2PageTitle'); if(h){h.setAttribute('tabindex','-1');h.focus({preventScroll:true});}},0);
    }
  }
  function syncNav() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-c2nav]'), function (b) {
      var target=b.getAttribute('data-c2nav');
      var active=(target==='home' && S.screen==='home') || target===S.screen || (target==='module' && S.screen==='lesson');
      b.classList.toggle('is-on',active); b.setAttribute('aria-current',active?'page':'false');
    });
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

  function drawPractice(lo) {
    var qs=[];
    if(String(lo)==='mix') {
      for(var n=1;n<=6;n++) qs=qs.concat(shuffle(PB.forLo(n)).slice(0,2));
      qs=shuffle(qs);
    } else qs=shuffle(PB.forLo(Number(lo)));
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
    Array.prototype.forEach.call(host.querySelectorAll('[data-screen]'),function(b){b.addEventListener('click',function(){S.screen=b.getAttribute('data-screen');S.practiceQs=[];S.lessonId=null;render({focus:true});});});
    Array.prototype.forEach.call(host.querySelectorAll('[data-go="lesson"]'),function(b){b.addEventListener('click',function(){openLesson(b.getAttribute('data-id'));});});
    Array.prototype.forEach.call(host.querySelectorAll('[data-card]'),function(b){b.addEventListener('click',function(){var l=LD.lesson(S.lessonId);if(!l)return;var d=b.getAttribute('data-card')==='next'?1:-1;S.cardIdx=Math.max(0,Math.min(l.cards.length-1,S.cardIdx+d));render();});});
    var sc=host.querySelector('[data-start-check]');if(sc)sc.addEventListener('click',function(){S.lessonPhase='check';S.checkIdx=0;S.checkChoice=null;S.checkAnswered=false;render({focus:true});});
    var br=host.querySelector('[data-back-read]');if(br)br.addEventListener('click',function(){S.lessonPhase='read';render({focus:true});});
    Array.prototype.forEach.call(host.querySelectorAll('[data-check-choice]'),function(b){b.addEventListener('click',function(){if(S.checkAnswered)return;var l=LD.lesson(S.lessonId),q=l.check[S.checkIdx],choice=Number(b.getAttribute('data-check-choice'));S.checkChoice=choice;S.checkAnswered=true;data.checkpoint.attempted++;if(choice===q.answer){S.checkCorrect++;data.checkpoint.correct++;}save();render();});});
    var nc=host.querySelector('[data-next-check]');if(nc)nc.addEventListener('click',function(){S.checkIdx++;S.checkChoice=null;S.checkAnswered=false;render({focus:true});});
    var fc=host.querySelector('[data-finish-check]');if(fc)fc.addEventListener('click',finishLesson);
    var nl=host.querySelector('[data-next-lesson]');if(nl)nl.addEventListener('click',nextAfterLesson);
    Array.prototype.forEach.call(host.querySelectorAll('[data-start-practice]'),function(b){b.addEventListener('click',function(){drawPractice(b.getAttribute('data-start-practice'));});});
    Array.prototype.forEach.call(host.querySelectorAll('[data-practice-choice]'),function(b){b.addEventListener('click',function(){if(S.practiceAnswered)return;var q=S.practiceQs[S.practiceIdx],choice=Number(b.getAttribute('data-practice-choice')),right=choice===q.answer;S.practiceChoice=choice;S.practiceAnswered=true;if(right)S.practiceCorrect++;S.practiceResults.push({id:q.id,lo:q.lo,correct:right});recordPractice(q,right);render();});});
    var np=host.querySelector('[data-next-practice]');if(np)np.addEventListener('click',function(){if(S.practiceIdx>=S.practiceQs.length-1){S.screen='results';render({focus:true});return;}S.practiceIdx++;S.practiceChoice=null;S.practiceAnswered=false;render({focus:true});});
    var sp=host.querySelector('[data-stop-practice]');if(sp)sp.addEventListener('click',function(){S.practiceQs=[];S.practiceResults=[];S.screen='practice';render({focus:true});});
    var gs=host.querySelector('#c2GlossarySearch');if(gs)gs.addEventListener('input',function(e){S.glossaryQuery=e.target.value;var pos=e.target.selectionStart;render();var n=host.querySelector('#c2GlossarySearch');if(n){n.focus();try{n.setSelectionRange(pos,pos);}catch(_){}}});
  }

  Array.prototype.forEach.call(document.querySelectorAll('[data-c2nav]'),function(b){b.addEventListener('click',function(){var s=b.getAttribute('data-c2nav');S.practiceQs=[];S.lessonId=null;S.screen=s;render({focus:true});});});
  var theme=document.getElementById('c2Theme');if(theme)theme.addEventListener('click',function(){var cur=document.body.classList.contains('dark');data.settings.darkMode=!cur;save();applyTheme();});

  document.addEventListener('keydown',function(e){
    if(e.altKey||e.ctrlKey||e.metaKey)return;
    var tag=(e.target&&e.target.tagName||'').toLowerCase();if(tag==='input'||tag==='textarea'||tag==='select')return;
    if(S.screen==='lesson'&&S.lessonPhase==='read'){
      var l=LD.lesson(S.lessonId);if(!l)return;
      if(e.key==='ArrowRight'&&S.cardIdx<l.cards.length-1){S.cardIdx++;e.preventDefault();render();}
      if(e.key==='ArrowLeft'&&S.cardIdx>0){S.cardIdx--;e.preventDefault();render();}
    } else if(S.screen==='practice'&&S.practiceQs.length&&!S.practiceAnswered&&/^[1-4]$/.test(e.key)){
      var b=host.querySelector('[data-practice-choice="'+(Number(e.key)-1)+'"]');if(b){e.preventDefault();b.click();}
    }
  });

  load(); applyTheme(); render();
})(typeof window !== 'undefined' ? window : globalThis);
