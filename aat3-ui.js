/* AAT Level 3 — self-contained UI.
 *
 * This module owns the entire Level 3 experience: its own path, its own lesson
 * player, its own state and its own persistence. app.js delegates to it and
 * otherwise does not participate.
 *
 * WHY SEPARATE
 *
 * The Level 2 journey and lesson player are shared by five shipped subjects and
 * are guarded by no behavioural tests at all. Extending them to carry a second,
 * richer design would put four working products at risk for no benefit — and
 * Level 3 is meant to look and feel like a step up, not like Level 2 recoloured.
 * A separate renderer gets both: a free hand on the design, and no blast radius.
 *
 * Progress lives under its own storage key, so nothing here can disturb Level 2.
 */
(function (root) {
  'use strict';

  var STORE_KEY = 'prep_v2_aat3';

  /* ── State ───────────────────────────────────────────────────────────────── */
  var S = {
    screen: 'path',      // 'path' | 'lesson' | 'practice' | 'quiz' | 'done'
    mode: 'lesson',      // 'lesson' | 'practice' — which set the question handlers read
    practiceLo: null,    // an outcome number, or 'mix'
    practiceQs: [],
    practiceMissed: [],
    lessonId: null,
    cardIdx: 0,
    phase: 'teach',      // 'teach' | 'check'
    qIdx: 0,
    answered: null,
    picked: null,
    tfPicks: {},
    gapPicks: {},
    numInput: '',
    score: 0,
    revealed: 0,         // worked-example steps shown
    tryShown: false,
    tryInput: '',
    tryResult: null,
  };

  /* `practice` is the lifetime record of practice runs, kept per outcome.
     WHY PER OUTCOME AND NOT A TOTAL. Progress backup merges two devices by
     taking the larger of each number (see progress-backup.js), so a stored
     grand total would be wrong the moment the two devices practised different
     outcomes: max(10, 8) is 10 where the truth is 18. Per-outcome counters
     merge correctly under that rule, and the totals are derived from them, so
     there is only ever one source of truth. `correct` rather than `wrong` is
     stored for the same reason — both rise, but only the pair (attempted,
     correct) survives a max-merge without ever implying a negative count. */
  var data = { lessons: {}, xp: 0, practice: { runs: 0, los: {} } };

  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        var p = JSON.parse(raw);
        data.lessons = p.lessons || {};
        data.xp = p.xp || 0;
        var pr = p.practice;
        data.practice = {
          runs: (pr && pr.runs) || 0,
          los: (pr && pr.los && typeof pr.los === 'object') ? pr.los : {},
        };
      }
    } catch (e) { /* corrupt storage: start clean rather than fail to render */ }
  }
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(data)); } catch (e) {}
    /* Level 3 persists on its own, so it has to announce its own writes. Without
       this a lesson finished here would sit unsynced until something on the
       Level 2 side happened to save. */
    if (root.ProgressSync) root.ProgressSync.noteLocalChange();
  }

  /* ── Data access ─────────────────────────────────────────────────────────── */
  function path() { return root.AAT3_LEARN_PATH || []; }
  function practiceBank() {
    var p = root.AAT3_PRACTICE;
    return (p && p.QUESTIONS) || [];
  }

  /* The single place that decides which question set the answer handlers act
     on. Everything downstream — scoring, next-question, the explanation box —
     is identical for a lesson check and a practice question, so this accessor
     is all that separates the two modes. */
  function currentQuestions() {
    if (S.mode === 'practice') return S.practiceQs;
    var l = lessonById(S.lessonId);
    return (l && l.check) || [];
  }
  function syllabus() { return root.AAT3_SYLLABUS || null; }
  function lessons() {
    var out = [];
    path().forEach(function (u) { (u.lessons || []).forEach(function (l) { out.push(l); }); });
    return out;
  }
  function lessonById(id) {
    var all = lessons();
    for (var i = 0; i < all.length; i++) if (all[i].id === id) return all[i];
    return null;
  }
  function rec(id) { return data.lessons[id] || null; }
  function isDone(id) { var r = rec(id); return !!(r && r.best >= 60); }
  function stars(id) {
    var r = rec(id); if (!r) return 0;
    if (r.best >= 100) return 3; if (r.best >= 80) return 2; if (r.best >= 60) return 1; return 0;
  }

  /* A node's type drives its art and its label. */
  function nodeType(l) {
    var w = (l.cards || []).filter(function (c) { return c.worked; }).length;
    if (w >= 2) return 'workshop';
    if (w === 1) return 'applied';
    return 'concept';
  }
  var TYPE_META = {
    concept:  { label: 'Concept',  glyph: '◆' },
    applied:  { label: 'Applied',  glyph: '▲' },
    workshop: { label: 'Workshop', glyph: '★' },
  };

  function coverage() {
    var syl = syllabus();
    if (!syl || !syl.units || !syl.units.tpfb) return null;
    var total = 0, covered = 0, done = 0;
    var claimed = {}, doneClaimed = {};
    lessons().forEach(function (l) {
      (l.criteria || []).forEach(function (t) {
        claimed[t] = true;
        if (isDone(l.id)) doneClaimed[t] = true;
      });
    });
    syl.units.tpfb.outcomes.forEach(function (o) {
      o.topics.forEach(function (t) {
        t.concepts.forEach(function (c) {
          total++;
          var tag = 'TPFB-' + c.id;
          if (claimed[tag]) covered++;
          if (doneClaimed[tag]) done++;
        });
      });
    });
    return { total: total, covered: covered, studied: done };
  }

  /* ── The practice record ─────────────────────────────────────────────────── */

  function outcomes() {
    var syl = syllabus();
    return (syl && syl.units && syl.units.tpfb && syl.units.tpfb.outcomes) || [];
  }

  /* One answered practice question. Called from the single place that advances
     a practice run, so a question type added later is counted without anyone
     remembering to count it. */
  function recordPractice(lo, wasCorrect) {
    var key = String(lo);
    var los = data.practice.los;
    if (!los[key]) los[key] = { attempted: 0, correct: 0 };
    los[key].attempted++;
    if (wasCorrect) los[key].correct++;
  }

  /* The lifetime practice picture as one object.
   *
   * Pure — everything it reports is derived from its two arguments — which is
   * what lets the build check assert the ranking without standing up a browser.
   *
   * WHICH OUTCOME "HAS THE MOST MISTAKES" needs a total order, or the answer
   * can change between two renders of identical data. Most wrong answers wins —
   * that is the question being asked, so it outranks a small outcome answered
   * badly. Ties break on the lower accuracy, so eight wrong out of nine beats
   * eight out of twenty. Then the larger sample, which only ever fires on a
   * rounding collision (one wrong in twelve and one in thirteen both read 92%)
   * because equal mistakes at equal accuracy otherwise pins the sample size.
   * Then the outcome number, which is arbitrary but fixed.
   *
   * Rows are built from the syllabus so an outcome never practised still shows
   * as a gap rather than vanishing — but any outcome number found in the record
   * and NOT in the syllabus is appended rather than dropped, so the totals
   * always account for every question the reader actually answered.
   */
  /* Last resort in the ranking, so it must return a number for every pair it
     can be handed — including a numeric outcome against a junk key, where
     subtraction would give NaN and leave the sort order undefined. */
  function cmpOutcome(a, b) {
    var an = typeof a === 'number', bn = typeof b === 'number';
    if (an && bn) return a - b;
    if (an !== bn) return an ? -1 : 1;
    return String(a) < String(b) ? -1 : String(a) > String(b) ? 1 : 0;
  }

  function practiceSummary(record, outcomeList) {
    var p = (record && typeof record === 'object') ? record : data.practice;
    var byLo = (p && p.los && typeof p.los === 'object') ? p.los : {};
    var list = (outcomeList || outcomes()).map(function (o) { return { n: o.n, title: o.title, weighting: o.weighting }; });
    var known = {};
    list.forEach(function (o) { known[String(o.n)] = true; });
    Object.keys(byLo).forEach(function (k) {
      if (known[k]) return;
      /* A key that is not a number can only come from a corrupted or edited
         store, but it still stands for questions somebody answered, so it is
         carried through as itself rather than coerced into NaN — which would
         both render as "Outcome NaN" and poison the comparator below. */
      var n = Number(k);
      list.push({ n: (k !== '' && isFinite(n)) ? n : k, title: 'Outcome ' + k, weighting: null });
    });

    var rows = list.map(function (o) {
      var r = byLo[String(o.n)] || {};
      var att = Math.max(0, r.attempted || 0);
      /* Clamped because a merged backup takes the larger of each counter
         independently, and a hand-edited file need not be coherent at all. */
      var cor = Math.min(att, Math.max(0, r.correct || 0));
      return {
        n: o.n, title: o.title, weighting: o.weighting,
        attempted: att, correct: cor, wrong: att - cor,
        accuracy: att ? Math.round((cor / att) * 100) : null,
      };
    });

    var attempted = 0, correct = 0;
    rows.forEach(function (r) { attempted += r.attempted; correct += r.correct; });

    var worst = rows.filter(function (r) { return r.wrong > 0; }).sort(function (a, b) {
      return (b.wrong - a.wrong) || (a.accuracy - b.accuracy) ||
             (b.attempted - a.attempted) || cmpOutcome(a.n, b.n);
    })[0] || null;

    return {
      runs: Math.max(0, (p && p.runs) || 0),
      attempted: attempted,
      correct: correct,
      wrong: attempted - correct,
      accuracy: attempted ? Math.round((correct / attempted) * 100) : null,
      rows: rows,
      worst: worst,
    };
  }

  /* ── Small helpers ───────────────────────────────────────────────────────── */
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  /* **bold** and *italic*, on already-escaped text. */
  function md(s) {
    return esc(s)
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>');
  }
  function shuffle(a) {
    var r = a.slice();
    for (var i = r.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = r[i]; r[i] = r[j]; r[j] = t;
    }
    return r;
  }

  /* ── Card rendering ──────────────────────────────────────────────────────── */
  function cardHtml(c) {
    var h = '';
    if (c.h) h += '<h2 class="a3-card-h">' + esc(c.h) + '</h2>';
    if (c.p) {
      var ps = Array.isArray(c.p) ? c.p : [c.p];
      h += ps.map(function (t) { return '<p class="a3-p">' + md(t) + '</p>'; }).join('');
    }
    if (c.formula) {
      h += '<div class="a3-formula">' + String(c.formula).split('·').map(function (f) {
        return '<span>' + md(f.trim()) + '</span>';
      }).join('') + '</div>';
    }
    if (c.split) {
      h += '<div class="a3-split">' +
        ['left', 'right'].map(function (side) {
          var s = c.split[side]; if (!s) return '';
          return '<div class="a3-split-col"><h4>' + esc(s.title || '') + '</h4><ul>' +
            (s.items || []).map(function (i) { return '<li>' + md(i) + '</li>'; }).join('') +
            '</ul></div>';
        }).join('') + '</div>';
    }
    if (c.table) {
      h += '<div class="a3-tablewrap"><table class="a3-table">';
      if (c.table.headers) {
        h += '<thead><tr>' + c.table.headers.map(function (x) { return '<th>' + md(x) + '</th>'; }).join('') + '</tr></thead>';
      }
      h += '<tbody>' + (c.table.rows || []).map(function (r) {
        return '<tr>' + r.map(function (x) { return '<td>' + md(x) + '</td>'; }).join('') + '</tr>';
      }).join('') + '</tbody></table></div>';
    }
    if (c.example) {
      h += '<div class="a3-example">';
      if (c.example.title) h += '<div class="a3-example-t">' + md(c.example.title) + '</div>';
      h += '<div class="a3-tablewrap"><table class="a3-table a3-table-plain"><tbody>' +
        (c.example.rows || []).map(function (r, i) {
          var tag = i === 0 ? 'th' : 'td';
          return '<tr>' + r.map(function (x) { return '<' + tag + '>' + md(x) + '</' + tag + '>'; }).join('') + '</tr>';
        }).join('') + '</tbody></table></div></div>';
    }
    if (c.flow) {
      h += '<div class="a3-flow">' + c.flow.map(function (f, i) {
        return '<span class="a3-flow-step">' + esc(f) + '</span>' +
          (i < c.flow.length - 1 ? '<span class="a3-flow-arrow" aria-hidden="true">→</span>' : '');
      }).join('') + '</div>';
    }
    if (c.callout) {
      h += '<div class="a3-callout a3-callout-' + esc(c.callout.kind || 'tip') + '">' +
        '<span class="a3-callout-i" aria-hidden="true">' + (c.callout.kind === 'warning' ? '!' : '✦') + '</span>' +
        '<span>' + md(c.callout.text) + '</span></div>';
    }
    if (c.examtrap) {
      /* Canonically a string. Tolerate { text } too: an examtrap authored in the
         callout's shape once shipped as a literal "[object Object]" on the card,
         and a renderer that degrades to nothing visible is better than one that
         degrades to that. scripts/check-aat3-quality.js enforces the string. */
      h += '<div class="a3-trap"><span class="a3-trap-l">Exam trap</span><span>' +
        md(typeof c.examtrap === 'string' ? c.examtrap : (c.examtrap.text || '')) + '</span></div>';
    }
    if (c.worked) h += workedHtml(c.worked);
    return h;
  }

  function workedHtml(w) {
    var h = '<div class="a3-worked"><div class="a3-worked-head">' +
      '<span class="a3-worked-tag">Worked example</span>' +
      '<span class="a3-worked-title">' + esc(w.title || '') + '</span></div>';
    h += '<p class="a3-worked-problem">' + md(w.problem) + '</p>';
    var steps = w.steps || [];
    h += '<ol class="a3-steps">';
    for (var i = 0; i < steps.length; i++) {
      var shown = i < S.revealed;
      h += '<li class="a3-step' + (shown ? ' is-shown' : ' is-hidden') + '">' +
        '<span class="a3-step-n">' + (i + 1) + '</span><div>' +
        (shown ? '<div class="a3-step-do">' + md(steps[i].do) + '</div>' +
                 (steps[i].why ? '<div class="a3-step-why">' + md(steps[i].why) + '</div>' : '')
               : '<div class="a3-step-do a3-blur">Hidden until revealed</div>') +
        '</div></li>';
    }
    h += '</ol>';
    if (S.revealed < steps.length) {
      h += '<div class="a3-worked-actions">' +
        '<button class="a3-btn a3-btn-primary" data-a3="step">Reveal next step</button>' +
        '<button class="a3-btn a3-btn-ghost" data-a3="stepall">Show all</button></div>';
    } else {
      h += '<div class="a3-answer"><span>Answer</span><strong>' + md(w.answer) + '</strong></div>';
      if (w.tryIt) h += tryItHtml(w.tryIt);
    }
    return h + '</div>';
  }

  function tryItHtml(t) {
    var h = '<div class="a3-try"><div class="a3-try-head">Now you try</div>' +
      '<p class="a3-p">' + md(t.q) + '</p>';
    if (S.tryResult === null) {
      h += '<div class="a3-try-row">' +
        '<input class="a3-input" inputmode="decimal" data-a3="tryinput" value="' + esc(S.tryInput) + '" placeholder="' + esc(t.unit || '') + '" aria-label="Your answer">' +
        '<button class="a3-btn a3-btn-primary" data-a3="trycheck">Check</button></div>';
      if (t.hint) h += '<div class="a3-hint">Hint — ' + md(t.hint) + '</div>';
    } else {
      h += '<div class="a3-try-verdict ' + (S.tryResult ? 'is-right' : 'is-wrong') + '">' +
        (S.tryResult ? 'Correct' : 'Not quite — the answer is ' + esc(t.unit === '£' ? '£' + t.answer : t.answer)) + '</div>';
      if (t.exp) h += '<p class="a3-exp">' + md(t.exp) + '</p>';
    }
    return h + '</div>';
  }

  /* ── Path screen ─────────────────────────────────────────────────────────── */
  function renderPath() {
    var groups = path();
    var unit = groups[0];
    if (!unit) return '<div class="a3-empty">Level 3 content is still loading.</div>';
    var ls = lessons();
    var doneN = ls.filter(function (l) { return isDone(l.id); }).length;
    var pct = ls.length ? Math.round((doneN / ls.length) * 100) : 0;
    var cov = coverage();
    var syl = syllabus();
    var u = syl && syl.units ? syl.units.tpfb : null;
    var h = '<div class="a3-root">';

    /* Hero */
    h += '<header class="a3-hero">' +
      '<div class="a3-hero-glow" aria-hidden="true"></div>' +
      '<div class="a3-hero-in">' +
      '<div class="a3-eyebrow">AAT Level 3 Diploma in Accounting · Q2022</div>' +
      '<h1 class="a3-title">' + esc(unit.title) + '</h1>' +
      '<div class="a3-chips">' +
        (u ? '<span class="a3-chip">' + esc(u.financeAct) + '</span>' : '') +
        (u ? '<span class="a3-chip">' + u.assessment.durationMinutes + ' min exam</span>' : '') +
        (u ? '<span class="a3-chip">' + u.qualificationWeighting + '% of the grade</span>' : '') +
        '<span class="a3-chip a3-chip-accent">' + data.xp + ' XP</span>' +
      '</div>' +
      '<div class="a3-progress"><div class="a3-progress-bar"><span style="width:' + pct + '%"></span></div>' +
        '<div class="a3-progress-meta"><span>' + doneN + ' of ' + ls.length + ' lessons</span>' +
        (cov ? '<span>' + cov.studied + ' of ' + cov.total + ' syllabus points studied</span>' : '') + '</div></div>' +
      '</div></header>';

    /* The scope notice that used to sit here is gone. It was written when the
       unit was part-built and the honest thing was to say so on every visit.
       The unit is complete, so the standing caveat — syllabus coverage is not
       readiness, and nothing here has been checked by a qualified accountant —
       is made once in lesson 0A rather than repeated above every scroll. */

    /* Practice entry. Placed above the track because it is a peer of the
       lessons, not an afterthought at the bottom of a long scroll. */
    if (practiceBank().length) {
      h += '<button class="a3-practice-cta" data-a3="practice">' +
        '<span class="a3-practice-i" aria-hidden="true">◈</span>' +
        '<span class="a3-practice-tx">' +
          '<span class="a3-practice-t">Practice questions</span>' +
          '<span class="a3-practice-m">' + practiceBank().length +
            ' questions, by outcome or mixed — separate from the lessons</span>' +
        '</span>' +
        '<span class="a3-practice-go" aria-hidden="true">→</span>' +
        '</button>';
    }

    /* The track — one section per outcome, continuous numbering of nodes. */
    groups.forEach(function (g) {
      h += '<div class="a3-outcome">' +
        '<div class="a3-outcome-n">Outcome ' + esc(g.outcome) + '</div>' +
        '<h2 class="a3-outcome-t">' + esc(g.outcomeTitle) + '</h2>' +
        (g.weighting ? '<div class="a3-outcome-w">' + g.weighting + '% of the assessment</div>' : '') +
        '</div>';
      h += renderTrack(g.lessons || []);
    });

    h += '<footer class="a3-foot">Independent study tool. Not affiliated with, endorsed by, or officially associated with AAT.</footer>';
    return h + '</div>';
  }

  function renderTrack(ls) {
    var h = '<div class="a3-track">';
    ls.forEach(function (l, i) {
      var t = nodeType(l);
      var meta = TYPE_META[t];
      var done = isDone(l.id);
      var st = stars(l.id);
      var side = i % 2 === 0 ? 'l' : 'r';
      h += '<div class="a3-node-wrap a3-side-' + side + '">' +
        (i > 0 ? '<svg class="a3-link" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="' +
          (side === 'r' ? 'M0,0 C0,58 100,42 100,100' : 'M100,0 C100,58 0,42 0,100') +
          '" /></svg>' : '') +
        '<button class="a3-node a3-node-' + t + (done ? ' is-done' : '') + '" data-a3="open" data-id="' + esc(l.id) + '"' +
          ' aria-label="' + esc(l.title) + (done ? ', completed' : '') + '">' +
          '<span class="a3-node-glyph" aria-hidden="true">' + (done ? '✓' : esc(l.icon || meta.glyph)) + '</span>' +
        '</button>' +
        '<div class="a3-node-card">' +
          '<div class="a3-node-type">' + esc(meta.label) + '</div>' +
          '<div class="a3-node-title">' + esc(l.title) + '</div>' +
          '<div class="a3-node-meta">' + (l.cards || []).length + ' cards · ' + (l.check || []).length + ' questions</div>' +
          (st ? '<div class="a3-stars" aria-label="' + st + ' of 3 stars">' +
            [1,2,3].map(function (n) { return '<span class="' + (n <= st ? 'on' : '') + '">★</span>'; }).join('') + '</div>' : '') +
        '</div></div>';
    });
    return h + '</div>';
  }

  /* ── Lesson screen ───────────────────────────────────────────────────────── */
  function renderLesson() {
    var l = lessonById(S.lessonId);
    if (!l) { S.screen = 'path'; return renderPath(); }
    var cards = l.cards || [], checks = l.check || [];
    var total = cards.length + checks.length;
    var pos = S.phase === 'teach' ? S.cardIdx : cards.length + S.qIdx;
    var pct = total ? Math.round((pos / total) * 100) : 0;

    var h = '<div class="a3-root a3-reading">';
    h += '<div class="a3-lessonbar">' +
      '<button class="a3-btn a3-btn-ghost a3-exit" data-a3="exit">Exit</button>' +
      '<div class="a3-lessonbar-p"><span style="width:' + pct + '%"></span></div>' +
      '<div class="a3-lessonbar-n">' + (pos + 1) + ' / ' + total + '</div></div>';

    h += '<article class="a3-sheet">';
    if (S.phase === 'teach') {
      h += cardHtml(cards[S.cardIdx] || {});
      var c = cards[S.cardIdx] || {};
      var blocked = c.worked && S.revealed < (c.worked.steps || []).length;
      h += '<div class="a3-nav">' +
        (S.cardIdx > 0 ? '<button class="a3-btn a3-btn-ghost" data-a3="back">Back</button>' : '<span></span>') +
        (blocked ? '<span class="a3-nav-hint">Reveal the steps to continue</span>'
                 : '<button class="a3-btn a3-btn-primary" data-a3="next">' +
                   (S.cardIdx === cards.length - 1 ? 'Start the questions' : 'Continue') + '</button>') +
        '</div>';
    } else {
      h += questionHtml(checks[S.qIdx], checks.length);
    }
    h += '</article></div>';
    return h;
  }

  function questionHtml(q, n) {
    if (!q) return '';
    var t = q.type || 'mcq';
    var h = '<div class="a3-qhead">Question ' + (S.qIdx + 1) + ' of ' + n + '</div>' +
            '<h2 class="a3-q">' + md(q.q) + '</h2>';

    if (t === 'mcq') {
      if (!S._order) S._order = shuffle(q.opts.map(function (_, i) { return i; }));
      h += '<div class="a3-opts">' + S._order.map(function (oi, di) {
        var cls = '';
        if (S.answered !== null) {
          if (oi === q.ans) cls = ' is-right';
          else if (oi === S.picked) cls = ' is-wrong';
        }
        return '<button class="a3-opt' + cls + '" data-a3="ans" data-i="' + oi + '"' +
          (S.answered !== null ? ' disabled' : '') + '>' +
          '<span class="a3-opt-k">' + String.fromCharCode(65 + di) + '</span>' +
          '<span>' + md(q.opts[oi]) + '</span></button>';
      }).join('') + '</div>';
    } else if (t === 'truefalse') {
      if (!S._order) S._order = shuffle(q.statements.map(function (_, i) { return i; }));
      h += '<div class="a3-tf">' + S._order.map(function (si) {
        var st = q.statements[si];
        var picked = S.tfPicks[si];
        var right = S.answered !== null && picked === st.answer;
        return '<div class="a3-tf-row' + (S.answered !== null ? (right ? ' is-right' : ' is-wrong') : '') + '">' +
          '<span class="a3-tf-t">' + md(st.text) + '</span>' +
          '<span class="a3-tf-b">' +
            ['true', 'false'].map(function (v) {
              var on = picked === (v === 'true');
              return '<button class="a3-pill' + (on ? ' on' : '') + '" data-a3="tf" data-s="' + si + '" data-v="' + v + '"' +
                (S.answered !== null ? ' disabled' : '') + '>' + (v === 'true' ? 'True' : 'False') + '</button>';
            }).join('') +
          '</span></div>';
      }).join('') + '</div>';
      if (S.answered === null) h += '<button class="a3-btn a3-btn-primary a3-wide" data-a3="tfsubmit">Submit</button>';
    } else if (t === 'numeric') {
      if (S.answered === null) {
        h += '<div class="a3-try-row">' +
          '<input class="a3-input" inputmode="decimal" data-a3="numinput" value="' + esc(S.numInput) + '" placeholder="' + esc(q.unit || '') + '" aria-label="Your answer">' +
          '<button class="a3-btn a3-btn-primary" data-a3="numsubmit">Check</button></div>';
      } else {
        h += '<div class="a3-try-verdict ' + (S.answered ? 'is-right' : 'is-wrong') + '">' +
          (S.answered ? 'Correct' : 'The answer is ' + esc((q.unit === '£' ? '£' : '') + q.answer)) + '</div>';
      }
    } else if (t === 'gapfill') {
      var parts = q.template.split(/(\{\d+\})/);
      h += '<div class="a3-gap">' + parts.map(function (p) {
        var m = /^\{(\d+)\}$/.exec(p);
        if (!m) return esc(p);
        var gi = +m[1], g = q.gaps[gi], sel = S.gapPicks[gi];
        return '<span class="a3-gapsel">' + g.options.map(function (o, oi) {
          var on = sel === oi;
          var cls = on ? ' on' : '';
          if (S.answered !== null && oi === g.answer) cls = ' is-right';
          else if (S.answered !== null && on) cls = ' is-wrong';
          return '<button class="a3-pill' + cls + '" data-a3="gap" data-g="' + gi + '" data-o="' + oi + '"' +
            (S.answered !== null ? ' disabled' : '') + '>' + esc(o) + '</button>';
        }).join('') + '</span>';
      }).join('') + '</div>';
      if (S.answered === null) h += '<button class="a3-btn a3-btn-primary a3-wide" data-a3="gapsubmit">Submit</button>';
    }

    if (S.answered !== null) {
      h += '<div class="a3-exp-box"><div class="a3-exp-l">Why</div><p class="a3-exp">' + md(q.exp || '') + '</p></div>' +
        '<button class="a3-btn a3-btn-primary a3-wide" data-a3="nextq">' +
        (S.qIdx === n - 1 ? 'Finish' : 'Next question') + '</button>';
    }
    return h;
  }

  /* ── Done screen ─────────────────────────────────────────────────────────── */
  function renderDone() {
    var isP = S.mode === 'practice';
    var checks = currentQuestions();
    var pct = checks.length ? Math.round((S.score / checks.length) * 100) : 100;
    var st = pct >= 100 ? 3 : pct >= 80 ? 2 : pct >= 60 ? 1 : 0;
    var head = isP
      ? (pct >= 70 ? 'Comfortable' : pct >= 50 ? 'Some gaps' : 'Worth going back to the lessons')
      : (pct >= 60 ? 'Lesson complete' : 'Worth another pass');

    /* On a practice run, name the outcomes the missed questions came from —
       a score alone tells the reader nothing about where to go next. */
    var weak = '';
    if (isP) {
      var missedLos = {};
      (S.practiceMissed || []).forEach(function (q) { missedLos[q.lo] = (missedLos[q.lo] || 0) + 1; });
      var keys = Object.keys(missedLos);
      if (keys.length) {
        weak = '<div class="a3-done-weak">Missed questions came from ' +
          keys.sort().map(function (k) { return 'Outcome ' + k + ' (' + missedLos[k] + ')'; }).join(', ') +
          '</div>';
      }
    }

    return '<div class="a3-root"><div class="a3-done">' +
      '<div class="a3-done-ring" style="--p:' + pct + '"><span>' + pct + '%</span></div>' +
      '<h1 class="a3-done-h">' + head + '</h1>' +
      '<div class="a3-done-sub">' + S.score + ' of ' + checks.length + ' correct' +
        (isP ? ' · ' + (S.practiceLo === 'mix' ? 'all outcomes' : 'Outcome ' + S.practiceLo) : '') + '</div>' +
      (isP ? '' : '<div class="a3-stars a3-stars-big">' + [1,2,3].map(function (n) {
        return '<span class="' + (n <= st ? 'on' : '') + '">★</span>'; }).join('') + '</div>') +
      weak +
      '<div class="a3-done-actions">' +
        '<button class="a3-btn a3-btn-primary" data-a3="exit">' +
          (isP ? 'More practice' : 'Back to the path') + '</button>' +
        '<button class="a3-btn a3-btn-ghost" data-a3="retry">Retry</button>' +
        (isP ? '<button class="a3-btn a3-btn-ghost" data-a3="topath">Back to the path</button>' : '') +
      '</div></div></div>';
  }

  /* ── Practice summary ────────────────────────────────────────────────────── */

  /* Level 2 answers "how am I doing" on a Progress tab; Level 3 has no tabs, so
     the same question is answered where the answer is actionable — at the top
     of the practice picker, immediately above the outcome the reader would
     choose next.

     The headline is the count of questions attempted, and the callout names the
     outcome with the most mistakes and offers to start a run on it. A score on
     its own tells a reader nothing about where to go next; this makes the next
     click the weakest thing they own. */
  function bandClass(pct) {
    if (pct === null) return 'a3-band-none';
    return pct >= 70 ? 'a3-band-ok' : pct >= 50 ? 'a3-band-mid' : 'a3-band-bad';
  }

  function renderPracticeSummary() {
    var s = practiceSummary();

    if (!s.attempted) {
      return '<section class="a3-sum a3-sum-empty" aria-label="Your practice so far">' +
        '<div class="a3-sum-eyebrow">Your practice so far</div>' +
        '<p class="a3-sum-emptytx">No practice questions answered yet. Answer a few and this will ' +
          'show how many you have attempted and which outcome is costing you the most marks.</p>' +
        '</section>';
    }

    var stat = function (n, label) {
      return '<div class="a3-sum-stat"><span class="a3-sum-n">' + n + '</span>' +
        '<span class="a3-sum-l">' + label + '</span></div>';
    };

    var h = '<section class="a3-sum" aria-label="Your practice so far">';
    h += '<div class="a3-sum-eyebrow">Your practice so far</div>';
    h += '<div class="a3-sum-stats">' +
      stat(s.attempted, 'Questions attempted') +
      stat(s.accuracy + '%', 'Answered correctly') +
      stat(s.wrong, s.wrong === 1 ? 'Mistake' : 'Mistakes') +
      stat(s.runs, s.runs === 1 ? 'Run finished' : 'Runs finished') +
      '</div>';

    if (s.worst) {
      h += '<div class="a3-sum-focus">' +
        '<div class="a3-sum-focus-tx">' +
          '<div class="a3-sum-focus-k">Most mistakes</div>' +
          '<div class="a3-sum-focus-t">Outcome ' + esc(s.worst.n) + ' · ' + esc(s.worst.title) + '</div>' +
          '<div class="a3-sum-focus-m">' + s.worst.wrong + ' wrong out of ' + s.worst.attempted +
            ' attempted · ' + s.worst.accuracy + '% correct' +
            (s.worst.weighting ? ' · worth ' + s.worst.weighting + '% of the assessment' : '') +
          '</div>' +
        '</div>' +
        '<button class="a3-btn a3-btn-primary a3-sum-focus-go" data-a3="startpractice" data-lo="' + esc(s.worst.n) + '">' +
          'Practise Outcome ' + esc(s.worst.n) + '</button>' +
        '</div>';
    } else {
      h += '<div class="a3-sum-focus a3-sum-focus-clean">' +
        '<div class="a3-sum-focus-tx">' +
          '<div class="a3-sum-focus-k">No mistakes yet</div>' +
          '<div class="a3-sum-focus-m">Nothing has gone wrong so far, so there is no weakest ' +
            'outcome to name. Keep going and this will point at one.</div>' +
        '</div></div>';
    }

    h += '<div class="a3-sum-rows">';
    s.rows.forEach(function (r) {
      var isWorst = !!(s.worst && s.worst.n === r.n);
      var pct = r.accuracy === null ? 0 : r.accuracy;
      /* An empty bar is decorative, not a reading of nought per cent. Announced
         as a progressbar it would say "0%" over a row whose own text says the
         outcome has not been practised — two different claims about the same
         thing, and the wrong one is the one a screen reader reaches first. */
      var bar = r.accuracy === null
        ? '<span class="a3-sum-bar" aria-hidden="true">'
        : '<span class="a3-sum-bar" role="progressbar" aria-valuenow="' + pct + '" aria-valuemin="0" aria-valuemax="100"' +
          ' aria-label="Outcome ' + esc(r.n) + ' accuracy">';
      h += '<div class="a3-sum-row' + (isWorst ? ' is-worst' : '') + '">' +
        '<span class="a3-sum-row-n">' + esc(r.n) + '</span>' +
        '<span class="a3-sum-row-t">' + esc(r.title) +
          (isWorst ? '<span class="a3-sum-tag">most mistakes</span>' : '') + '</span>' +
        bar + '<span class="a3-sum-bar-fill ' + bandClass(r.accuracy) + '" style="width:' + pct + '%"></span></span>' +
        '<span class="a3-sum-row-m">' + (r.attempted
          ? r.wrong + ' wrong / ' + r.attempted
          : 'not practised') + '</span>' +
        '</div>';
    });
    h += '</div>';

    h += '<div class="a3-sum-foot">Practice questions only — the questions inside lessons are ' +
      'recorded on the path, not here.</div>';
    return h + '</section>';
  }

  /* ── Practice picker ─────────────────────────────────────────────────────── */
  function renderPractice() {
    var bank = practiceBank();
    var syl = syllabus();
    var los = syl && syl.units ? syl.units.tpfb.outcomes : [];
    var counts = {};
    bank.forEach(function (q) { counts[q.lo] = (counts[q.lo] || 0) + 1; });

    var h = '<div class="a3-root">';
    h += '<header class="a3-hero a3-hero-sm">' +
      '<div class="a3-hero-glow" aria-hidden="true"></div>' +
      '<div class="a3-hero-in">' +
      '<div class="a3-eyebrow">Practice</div>' +
      '<h1 class="a3-title">Test yourself</h1>' +
      '<div class="a3-sub">' + bank.length + ' questions · ' + PRACTICE_LEN + ' per run, drawn at random</div>' +
      '</div></header>';

    h += '<div class="a3-notice">These are separate from the questions inside the lessons, and are meant to be met cold. ' +
      'A run is ' + PRACTICE_LEN + ' questions and records no lesson progress — it tells you what you know, not what you have read.</div>';

    h += renderPracticeSummary();

    h += '<div class="a3-pgrid">';
    h += '<button class="a3-pcard a3-pcard-mix" data-a3="startpractice" data-lo="mix">' +
      '<span class="a3-pcard-k">Mixed</span>' +
      '<span class="a3-pcard-t">All outcomes</span>' +
      '<span class="a3-pcard-m">' + bank.length + ' questions in the pool</span>' +
      '</button>';
    los.forEach(function (o) {
      var n = counts[o.n] || 0;
      if (!n) return;
      h += '<button class="a3-pcard" data-a3="startpractice" data-lo="' + o.n + '">' +
        '<span class="a3-pcard-k">Outcome ' + o.n + ' · ' + o.weighting + '%</span>' +
        '<span class="a3-pcard-t">' + esc(o.title) + '</span>' +
        '<span class="a3-pcard-m">' + n + ' questions</span>' +
        '</button>';
    });
    h += '</div>';
    h += '<div class="a3-pback"><button class="a3-btn a3-btn-ghost" data-a3="topath">Back to the path</button></div>';
    h += '<footer class="a3-foot">Independent study tool. Not affiliated with, endorsed by, or officially associated with AAT.</footer>';
    return h + '</div>';
  }

  /* ── Practice quiz — same question renderer as a lesson check ────────────── */
  function renderQuiz() {
    var qs = currentQuestions();
    if (!qs.length) { S.screen = 'practice'; return renderPractice(); }
    var pct = Math.round((S.qIdx / qs.length) * 100);
    var h = '<div class="a3-root a3-reading">';
    h += '<div class="a3-lessonbar">' +
      '<button class="a3-btn a3-btn-ghost a3-exit" data-a3="exit">Exit</button>' +
      '<div class="a3-lessonbar-p"><span style="width:' + pct + '%"></span></div>' +
      '<div class="a3-lessonbar-n">' + (S.qIdx + 1) + ' / ' + qs.length + '</div></div>';
    h += '<article class="a3-sheet">' + questionHtml(qs[S.qIdx], qs.length) + '</article></div>';
    return h;
  }

  /* ── Mount and events ────────────────────────────────────────────────────── */
  function html() {
    if (S.screen === 'lesson') return renderLesson();
    if (S.screen === 'practice') return renderPractice();
    if (S.screen === 'quiz') return renderQuiz();
    if (S.screen === 'done') return renderDone();
    return renderPath();
  }

  /* Where the reader is, as a single comparable string. Cards are long enough
     to scroll now, so advancing to the next one has to put them back at the
     top — otherwise a new card opens halfway down its own text.

     Keyed on POSITION, not on every render. Revealing a worked-example step,
     picking an option or submitting an answer all re-render, and none of them
     should yank the page to the top while the reader is mid-card. */
  function posKey() {
    return [S.screen, S.lessonId, S.phase, S.cardIdx, S.qIdx].join('|');
  }
  var _lastPos = null;

  function restoreScroll(el) {
    if (typeof window === 'undefined' || !window.scrollTo) return;
    /* Returning to the path: put the lesson just left back under the reader's
       eye rather than sending them to the top of a 21-node track. */
    if (S.screen === 'path' && S.lessonId) {
      var node = el.querySelector('[data-a3="open"][data-id="' + S.lessonId + '"]');
      if (node && node.scrollIntoView) {
        node.scrollIntoView({ behavior: 'instant', block: 'center' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function mount(el) {
    el.innerHTML = html();
    wire(el);
    var k = posKey();
    if (k !== _lastPos) {
      _lastPos = k;
      restoreScroll(el);
    }
  }
  var _host = null;
  function rerender() { if (_host) mount(_host); }

  /* A practice run is a shuffled slice of the bank. Ten is enough to be
     informative and short enough to actually finish; a mixed run draws across
     every outcome so it cannot be answered from one lesson's vocabulary. */
  var PRACTICE_LEN = 10;
  function startPractice(lo) {
    var pool = practiceBank().filter(function (q) { return lo === 'mix' || q.lo === lo; });
    S.practiceLo = lo;
    S.practiceQs = shuffle(pool).slice(0, PRACTICE_LEN);
    S.practiceMissed = [];
    S.mode = 'practice';
    S.screen = 'quiz';
    S.qIdx = 0; S.score = 0;
    resetQState();
  }

  function startLesson(id) {
    S.mode = 'lesson';
    S.lessonId = id; S.screen = 'lesson'; S.cardIdx = 0; S.phase = 'teach';
    S.qIdx = 0; S.answered = null; S.picked = null; S.score = 0;
    S.tfPicks = {}; S.gapPicks = {}; S.numInput = ''; S._order = null;
    S.revealed = 0; S.tryShown = false; S.tryInput = ''; S.tryResult = null;
  }
  function resetCardState() {
    S.revealed = 0; S.tryInput = ''; S.tryResult = null;
  }
  function resetQState() {
    S.answered = null; S.picked = null; S.tfPicks = {}; S.gapPicks = {}; S.numInput = ''; S._order = null;
  }
  function finish() {
    var checks = currentQuestions();
    var pct = checks.length ? Math.round((S.score / checks.length) * 100) : 100;
    /* Practice earns XP but records no lesson result. A practice run is not a
       lesson attempt, and letting it write to data.lessons would mark nodes
       complete on the path for teaching the reader has never opened. */
    if (S.mode !== 'practice') {
      var prev = rec(S.lessonId);
      data.lessons[S.lessonId] = { best: Math.max(pct, prev ? prev.best : 0) };
      data.xp += S.score * 5 + (pct >= 60 ? 20 : 0);
    } else {
      data.xp += S.score * 3;
      data.practice.runs++;
    }
    save();
    S.screen = 'done';
  }

  function wire(el) {
    _host = el;
    el.querySelectorAll('[data-a3]').forEach(function (n) {
      var act = n.getAttribute('data-a3');
      if (act === 'tryinput' || act === 'numinput') {
        n.addEventListener('input', function () {
          if (act === 'tryinput') S.tryInput = n.value; else S.numInput = n.value;
        });
        n.addEventListener('keydown', function (e) {
          if (e.key === 'Enter') {
            e.preventDefault();
            var b = el.querySelector('[data-a3="' + (act === 'tryinput' ? 'trycheck' : 'numsubmit') + '"]');
            if (b) b.click();
          }
        });
        return;
      }
      n.addEventListener('click', function () { handle(act, n); });
    });
  }

  function num(v) {
    var s = String(v == null ? '' : v).replace(/[£,\s]/g, '');
    if (s === '' || isNaN(Number(s))) return null;
    return Number(s);
  }

  function handle(act, n) {
    var l = lessonById(S.lessonId);
    var cards = (l && l.cards) || [], checks = currentQuestions();
    var card = cards[S.cardIdx] || {};
    var q = checks[S.qIdx];

    if (act === 'open') { startLesson(n.getAttribute('data-id')); return rerender(); }
    if (act === 'exit') { S.screen = S.mode === 'practice' ? 'practice' : 'path'; return rerender(); }
    if (act === 'retry') {
      if (S.mode === 'practice') startPractice(S.practiceLo);
      else startLesson(S.lessonId);
      return rerender();
    }
    if (act === 'practice') { S.mode = 'practice'; S.screen = 'practice'; return rerender(); }
    if (act === 'topath') { S.mode = 'lesson'; S.screen = 'path'; return rerender(); }
    if (act === 'startpractice') {
      var lo = n.getAttribute('data-lo');
      startPractice(lo === 'mix' ? 'mix' : Number(lo));
      return rerender();
    }

    if (act === 'step') { S.revealed++; return rerender(); }
    if (act === 'stepall') { S.revealed = (card.worked.steps || []).length; return rerender(); }
    if (act === 'trycheck') {
      var want = card.worked.tryIt.answer;
      var got = num(S.tryInput);
      S.tryResult = got !== null && Math.abs(got - want) < 0.005;
      if (S.tryResult) { data.xp += 5; save(); }
      return rerender();
    }

    if (act === 'back') { S.cardIdx = Math.max(0, S.cardIdx - 1); resetCardState(); return rerender(); }
    if (act === 'next') {
      if (S.cardIdx === cards.length - 1) { S.phase = 'check'; S.qIdx = 0; resetQState(); }
      else { S.cardIdx++; resetCardState(); }
      return rerender();
    }

    if (act === 'ans') {
      if (S.answered !== null) return;
      S.picked = +n.getAttribute('data-i');
      S.answered = S.picked === q.ans;
      if (S.answered) S.score++;
      return rerender();
    }
    if (act === 'tf') {
      S.tfPicks[+n.getAttribute('data-s')] = n.getAttribute('data-v') === 'true';
      return rerender();
    }
    if (act === 'tfsubmit') {
      var all = q.statements.every(function (st, i) { return S.tfPicks[i] === st.answer; });
      if (Object.keys(S.tfPicks).length < q.statements.length) return;
      S.answered = all; if (all) S.score++;
      return rerender();
    }
    if (act === 'gap') {
      S.gapPicks[+n.getAttribute('data-g')] = +n.getAttribute('data-o');
      return rerender();
    }
    if (act === 'gapsubmit') {
      if (Object.keys(S.gapPicks).length < q.gaps.length) return;
      var ok = q.gaps.every(function (g, i) { return S.gapPicks[i] === g.answer; });
      S.answered = ok; if (ok) S.score++;
      return rerender();
    }
    if (act === 'numsubmit') {
      var g2 = num(S.numInput);
      S.answered = g2 !== null && Math.abs(g2 - q.answer) < 0.005;
      if (S.answered) S.score++;
      return rerender();
    }
    if (act === 'nextq') {
      /* Recorded here rather than in each of the four grading paths, so a new
         question type cannot be added without its misses being counted. */
      /* `answered !== null` because a graded answer is what makes this an
         attempt. The button only renders once the question has been graded, so
         today this cannot be reached ungraded — but the count is only honest
         while that stays true, so it is a condition here rather than a
         property of the renderer. */
      if (S.mode === 'practice' && q && S.answered !== null) {
        if (S.answered === false) S.practiceMissed.push(q);
        recordPractice(q.lo, S.answered === true);
        /* Written now rather than at the end of the run. A reader who answers
           six questions and then leaves has attempted six questions, and the
           summary that claims to count what they attempted has to agree. The
           save is debounced downstream, so per-question is not per-request. */
        save();
      }
      if (S.qIdx === checks.length - 1) finish();
      else { S.qIdx++; resetQState(); }
      return rerender();
    }
  }

  load();

  root.AAT3_UI = {
    mount: mount,
    /* `screen` is optional and defaults to the path, which is the only thing
       the app itself ever wants. It is settable so the build check can mount
       the practice picker and assert the summary that renders there, rather
       than asserting a regex against this file and calling that a test. */
    reset: function (screen) { S.screen = screen || 'path'; },
    /* Exposed so scripts/check-aat3-practice-summary.js can assert the totals
       and the most-mistakes ranking directly, rather than reading them back out
       of rendered HTML. */
    practiceSummary: practiceSummary,
  };
}(typeof self !== 'undefined' ? self : this));
