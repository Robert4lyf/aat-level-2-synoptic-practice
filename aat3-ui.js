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
    screen: 'units',     // 'units' | 'path' | 'lesson' | 'practice' | 'quiz' | 'done'
    unit: null,          // which unit's path, practice and progress are on screen
    mode: 'lesson',      // 'lesson' | 'practice' — which set the question handlers read
    practiceLo: null,    // an outcome number, or 'mix', or 'missed'
    practiceUnit: null,  // the unit a run was started in, pinned for its duration
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
    taskInputs: {},      // multi-part task: part index -> what was typed
    taskPicks: {},       // multi-part task: part index -> chosen option
    taskResults: null,   // multi-part task: per-part verdicts, once graded
    taskNudge: false,    // a submit was attempted with parts still blank
    score: 0,
    revealed: 0,         // worked-example steps shown
    tryShown: false,
    tryInput: '',
    tryResult: null,
  };

  /* `practice` is the lifetime record of practice runs, kept per unit and then
     per outcome within it.
     WHY PER OUTCOME AND NOT A TOTAL. Progress backup merges two devices by
     taking the larger of each number (see progress-backup.js), so a stored
     grand total would be wrong the moment the two devices practised different
     outcomes: max(10, 8) is 10 where the truth is 18. Per-outcome counters
     merge correctly under that rule, and the totals are derived from them, so
     there is only ever one source of truth. `correct` rather than `wrong` is
     stored for the same reason — both rise, but only the pair (attempted,
     correct) survives a max-merge without ever implying a negative count.
     WHY PER UNIT. Outcome numbers restart at 1 in every unit, so one flat map
     would add FAPS outcome 1 to TPFB outcome 1 and report a weakest outcome
     that belongs to neither. */
  var data = { lessons: {}, xp: 0, practice: { units: {} } };

  function n0(v) { return typeof v === 'number' && isFinite(v) && v > 0 ? v : 0; }

  /* Reads any shape this record has ever had, and returns the current one.

     Level 3 was a single unit when the practice record was designed, so a store
     written before FAPS existed keeps `runs` and `los` at the top level. Those
     counters can only be TPFB's. They are folded in by MAX rather than by
     assignment, which makes the migration idempotent: re-importing an old
     backup over a migrated store can neither double-count nor overwrite the
     newer figure with the older one. */
  function normalisePractice(p) {
    var out = { units: {} };
    if (p && p.units && typeof p.units === 'object') {
      Object.keys(p.units).forEach(function (k) {
        var u = p.units[k] || {};
        out.units[k] = {
          runs: n0(u.runs),
          los: (u.los && typeof u.los === 'object') ? u.los : {},
          qs: (u.qs && typeof u.qs === 'object') ? u.qs : {},
        };
      });
    }
    var legacyLos = (p && p.los && typeof p.los === 'object') ? p.los : {};
    var legacyRuns = n0(p && p.runs);
    if (legacyRuns || Object.keys(legacyLos).length) {
      var t = out.units.tpfb || (out.units.tpfb = { runs: 0, los: {} });
      t.runs = Math.max(t.runs, legacyRuns);
      Object.keys(legacyLos).forEach(function (lo) {
        var was = legacyLos[lo] || {}, now = t.los[lo] || { attempted: 0, correct: 0 };
        t.los[lo] = {
          attempted: Math.max(n0(now.attempted), n0(was.attempted)),
          correct: Math.max(n0(now.correct), n0(was.correct)),
        };
      });
    }
    return out;
  }

  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        var p = JSON.parse(raw);
        data.lessons = p.lessons || {};
        data.xp = p.xp || 0;
        data.practice = normalisePractice(p.practice);
      }
    } catch (e) { /* corrupt storage: start clean rather than fail to render */ }
  }

  /* The practice record for one unit, created on demand.

     A falsy key gets a detached record that is never stored. Without that, a
     call made before the content files have loaded — when there is no active
     unit to name — would create and then persist a bucket under the key
     "null", which merges across devices and shows up in the backup summary as
     a unit nobody studied. */
  function practiceRec(unitKey) {
    if (!unitKey) return { runs: 0, los: {}, qs: {} };
    var u = data.practice.units[unitKey];
    if (!u) u = data.practice.units[unitKey] = { runs: 0, los: {}, qs: {} };
    if (!u.qs) u.qs = {};
    return u;
  }

  /* ── Per-question memory ──────────────────────────────────────────────────
     The outcome counters above can say WHICH OUTCOME went badly and nothing
     more, so the app could never offer a reader the questions they actually got
     wrong. This records two timestamps per question — when it was last answered
     wrongly, and when it was last answered correctly — and a question counts as
     outstanding while the wrong one is the more recent.

     TWO TIMESTAMPS RATHER THAN A FLAG, AND THAT IS FORCED BY THE MERGE.
     progress-backup.js merges two devices field by field: numbers by MAX,
     booleans by OR. An "outstanding" boolean would therefore be sticky — fix a
     question on the phone, and the laptop's stale `true` resurrects it at the
     next merge, for ever. Under MAX, the later of two timestamps wins, which is
     exactly the semantics wanted: whichever device answered it most recently is
     the one that knows how it went. Order-independent and idempotent, like the
     rest of the record.

     Clock skew between devices can misorder two attempts made close together.
     The cost is a question offered again that did not need to be, which is the
     harmless direction to fail in. */
  function recordQuestion(unitKey, qId, correct) {
    if (!unitKey || !qId) return;
    var qs = practiceRec(unitKey).qs;
    var rec = qs[qId] || (qs[qId] = {});
    if (correct) rec.r = Date.now(); else rec.w = Date.now();
  }
  function isOutstanding(rec) {
    return !!(rec && n0(rec.w) > n0(rec.r));
  }
  /* The questions still outstanding, most recently missed first, and only those
     still in the bank — a question that has been rewritten or removed since it
     was missed is not a question anyone can be asked again. */
  function missedQuestions(unitKey) {
    var qs = practiceRec(unitKey).qs;
    var byId = {};
    practiceBank(unitKey).forEach(function (q) { if (q.id) byId[q.id] = q; });
    return Object.keys(qs)
      .filter(function (id) { return byId[id] && isOutstanding(qs[id]); })
      .sort(function (a, b) { return n0(qs[b].w) - n0(qs[a].w); })
      .map(function (id) { return byId[id]; });
  }
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(data)); } catch (e) {}
    /* Level 3 persists on its own, so it has to announce its own writes. Without
       this a lesson finished here would sit unsynced until something on the
       Level 2 side happened to save. */
    if (root.ProgressSync) root.ProgressSync.noteLocalChange();
  }

  /* ── Data access ─────────────────────────────────────────────────────────── */

  /* Every authored outcome-group, across every unit. Each unit ships its own
     content file — see scripts/lib/aat3-content.js, which carries the same list
     for the build checks. */
  function allGroups() {
    return (root.AAT3_LEARN_PATH || []).concat(root.AAT3_FAPS_PATH || []);
  }

  /* The groups belonging to the unit on screen. Each group in the content files
     already declares its `unit`, so this is a filter rather than a new index. */
  function path() {
    var u = activeUnit();
    return allGroups().filter(function (g) { return g.unit === u; });
  }

  /* Unit keys in the order the syllabus lists them, restricted to those that
     have some teaching material. A unit encoded but not yet written is real
     work in progress and belongs on the picker; a unit with nothing at all
     would be an empty room. */
  function unitKeys() {
    var syl = syllabus();
    var known = (syl && syl.units) ? Object.keys(syl.units) : [];
    var written = {};
    allGroups().forEach(function (g) { written[g.unit] = true; });
    return known.filter(function (k) { return written[k]; });
  }

  /* The unit whose screens are showing. Falls back to the first unit that has
     content, so a stored key for a unit that has since been removed cannot
     strand the reader on an empty path. */
  function activeUnit() {
    var keys = unitKeys();
    if (S.unit && keys.indexOf(S.unit) !== -1) return S.unit;
    return keys[0] || null;
  }

  function unitMeta(key) {
    var syl = syllabus();
    return (syl && syl.units && syl.units[key]) || null;
  }

  function practiceBank(unitKey) {
    var a = root.AAT3_PRACTICE, b = root.AAT3_FAPS_PRACTICE;
    var all = ((a && a.QUESTIONS) || []).concat((b && b.QUESTIONS) || []);
    var u = unitKey || activeUnit();
    /* `unitKey`, not `unit`: on a numeric question `unit` is the £ or % the
       answer is measured in. See the note at the top of aat3-practice-data.js. */
    return all.filter(function (q) { return q.unitKey === u; });
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
  /* Searches EVERY unit, not the active one. A lesson id is globally unique and
     the reader can only be inside a lesson they opened, so scoping this to the
     active unit would turn a mid-lesson unit switch into a blank screen. */
  /* A cheat sheet is NOT a lesson. It claims no syllabus criteria, carries no
     questions, and teaches nothing the outcome has not already taught — so
     holding it in `g.lessons` would inflate the lesson count on the picker,
     demand check questions it should not have, and offer a node the reader can
     never tick off. It lives on the group instead, and is normalised here into
     the shape the lesson screen already knows how to paint.

     `card` is singular by design. A cheat sheet that could grow a second card
     is a lesson with the questions left off. */
  function sheetOf(g) {
    if (!g || !g.cheatsheet || !g.cheatsheet.card) return null;
    var cs = g.cheatsheet;
    return {
      id: cs.id,
      title: cs.title || 'Cheat sheet',
      icon: cs.icon || '🗂️',
      criteria: [],
      cards: [cs.card],
      check: [],
      isSheet: true,
    };
  }

  function lessonById(id) {
    var found = null;
    allGroups().forEach(function (g) {
      (g.lessons || []).forEach(function (l) { if (l.id === id) found = l; });
      var sh = sheetOf(g);
      if (sh && sh.id === id) found = sh;
    });
    return found;
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
    sheet:    { label: 'Cheat sheet', glyph: '🗂️' },
  };

  function coverage(unitKey) {
    var key = unitKey || activeUnit();
    var u = unitMeta(key);
    if (!u) return null;
    var total = 0, covered = 0, done = 0;
    var claimed = {}, doneClaimed = {};
    lessons().forEach(function (l) {
      (l.criteria || []).forEach(function (t) {
        claimed[t] = true;
        if (isDone(l.id)) doneClaimed[t] = true;
      });
    });
    u.outcomes.forEach(function (o) {
      o.topics.forEach(function (t) {
        t.concepts.forEach(function (c) {
          total++;
          var tag = u.code + '-' + c.id;
          if (claimed[tag]) covered++;
          if (doneClaimed[tag]) done++;
        });
      });
    });
    return { total: total, covered: covered, studied: done };
  }

  /* ── The practice record ─────────────────────────────────────────────────── */

  function outcomes(unitKey) {
    var u = unitMeta(unitKey || activeUnit());
    return (u && u.outcomes) || [];
  }

  /* One answered practice question. Called from the single place that advances
     a practice run, so a question type added later is counted without anyone
     remembering to count it. */
  /* What a finished run is called on the done screen. `practiceLo` is not
     always an outcome number, and printing it unguarded produced "Outcome
     missed" the moment a second kind of run existed. */
  function practiceLabel() {
    if (S.practiceLo === 'mix') return 'all outcomes';
    if (S.practiceLo === 'missed') return 'questions you had got wrong';
    return 'Outcome ' + S.practiceLo;
  }

  function recordPractice(unitKey, lo, wasCorrect) {
    var los = practiceRec(unitKey).los;
    var key = String(lo);
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
    var p = (record && typeof record === 'object') ? record : practiceRec(activeUnit());
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

  /* ── Unit picker ─────────────────────────────────────────────────────────── */

  /* How much of a unit is written, measured against the syllabus rather than
     against itself. A unit that has authored two of its nine outcomes should
     say so on the card the reader chooses it from, not after they have opened
     it and scrolled. */
  function unitProgress(key) {
    var u = unitMeta(key);
    var groups = allGroups().filter(function (g) { return g.unit === key; });
    var ls = [];
    groups.forEach(function (g) { (g.lessons || []).forEach(function (l) { ls.push(l); }); });
    var written = {};
    groups.forEach(function (g) { written[g.outcome] = true; });
    var total = u ? u.outcomes.length : 0;
    var authored = u ? u.outcomes.filter(function (o) { return written[o.n]; }).length : 0;
    /* Share of the ASSESSMENT that is written, which is the number a reader
       planning revision actually needs — two 20% outcomes are not the same
       amount of exam as two 5% ones. */
    var pctOfExam = u ? u.outcomes.reduce(function (a, o) { return a + (written[o.n] ? o.weighting : 0); }, 0) : 0;
    return {
      lessons: ls.length,
      done: ls.filter(function (l) { return isDone(l.id); }).length,
      outcomes: total,
      authored: authored,
      pctOfExam: pctOfExam,
      complete: total > 0 && authored === total,
    };
  }

  function renderUnits() {
    var keys = unitKeys();
    if (!keys.length) return '<div class="a3-empty">Level 3 content is still loading.</div>';

    var h = '<div class="a3-root">';
    h += '<header class="a3-hero a3-hero-sm">' +
      '<div class="a3-hero-glow" aria-hidden="true"></div>' +
      '<div class="a3-hero-in">' +
      '<div class="a3-eyebrow">AAT Level 3 Diploma in Accounting · Q2022</div>' +
      '<h1 class="a3-title">Choose a unit</h1>' +
      '<div class="a3-sub">Each unit has its own path, its own practice bank and its own progress.</div>' +
      '</div></header>';

    h += '<div class="a3-ugrid">';
    keys.forEach(function (k) {
      var u = unitMeta(k);
      var p = unitProgress(k);
      if (!u) return;
      var pct = p.lessons ? Math.round((p.done / p.lessons) * 100) : 0;
      h += '<button class="a3-ucard' + (p.complete ? '' : ' is-partial') + '" data-a3="openunit" data-unit="' + esc(k) + '">' +
        '<span class="a3-ucard-k">' + esc(u.code) + ' · ' + u.qualificationWeighting + '% of the grade</span>' +
        '<span class="a3-ucard-t">' + esc(u.title) + '</span>' +
        '<span class="a3-ucard-m">' + u.glh + ' guided learning hours · ' +
          u.assessment.durationMinutes + ' min exam · ' + u.outcomes.length + ' outcomes</span>' +
        '<span class="a3-ucard-bar"><span style="width:' + pct + '%"></span></span>' +
        '<span class="a3-ucard-s">' +
          (p.lessons
            ? p.done + ' of ' + p.lessons + ' lessons done'
            : 'nothing studied yet') +
          (p.complete
            ? ''
            : ' · <strong>' + p.authored + ' of ' + p.outcomes + ' outcomes written</strong> (' + p.pctOfExam + '% of the exam)') +
        '</span>' +
        '</button>';
    });
    h += '</div>';
    h += '<footer class="a3-foot">Independent study tool. Not affiliated with, endorsed by, or officially associated with AAT.</footer>';
    return h + '</div>';
  }

  /* ── Path screen ─────────────────────────────────────────────────────────── */
  function renderPath() {
    var key = activeUnit();
    var u = unitMeta(key);
    var groups = path();
    if (!u || !groups.length) return '<div class="a3-empty">Level 3 content is still loading.</div>';
    var ls = lessons();
    var doneN = ls.filter(function (l) { return isDone(l.id); }).length;
    var pct = ls.length ? Math.round((doneN / ls.length) * 100) : 0;
    var cov = coverage();
    var prog = unitProgress(key);
    var bank = practiceBank();
    var h = '<div class="a3-root">';

    /* Hero */
    h += '<header class="a3-hero">' +
      '<div class="a3-hero-glow" aria-hidden="true"></div>' +
      '<div class="a3-hero-in">' +
      (unitKeys().length > 1
        ? '<button class="a3-unitback" data-a3="tounits"><span aria-hidden="true">←</span> All Level 3 units</button>'
        : '') +
      '<div class="a3-eyebrow">AAT Level 3 Diploma in Accounting · Q2022</div>' +
      '<h1 class="a3-title">' + esc(u.title) + '</h1>' +
      '<div class="a3-chips">' +
        (u.financeAct ? '<span class="a3-chip">' + esc(u.financeAct) + '</span>' : '') +
        '<span class="a3-chip">' + u.assessment.durationMinutes + ' min exam</span>' +
        '<span class="a3-chip">' + u.qualificationWeighting + '% of the grade</span>' +
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
       is made once in lesson 0A rather than repeated above every scroll.

       A unit that is genuinely part-built gets the notice back, because for
       that unit the statement is true again. */
    if (!prog.complete) {
      h += '<div class="a3-notice"><strong>' + prog.authored + ' of ' + u.outcomes.length +
        ' outcomes ' + (prog.authored === 1 ? 'is' : 'are') + ' written</strong>, covering ' +
        prog.pctOfExam + '% of this unit\'s assessment. ' +
        'The rest are listed below in the order the specification sets them out, so you can see what is ' +
        'coming and what is missing. Nothing here has been reviewed by a qualified accountant.</div>';
    }

    /* Practice entry. Placed above the track because it is a peer of the
       lessons, not an afterthought at the bottom of a long scroll. */
    if (bank.length) {
      h += '<button class="a3-practice-cta" data-a3="practice">' +
        '<span class="a3-practice-i" aria-hidden="true">◈</span>' +
        '<span class="a3-practice-tx">' +
          '<span class="a3-practice-t">Practice questions</span>' +
          '<span class="a3-practice-m">' + bank.length +
            ' questions, by outcome or mixed</span>' +
        '</span>' +
        '<span class="a3-practice-go" aria-hidden="true">→</span>' +
        '</button>';
    }

    /* The track — one section per outcome, driven by the SYLLABUS rather than
       by what happens to be written. Iterating the authored groups would make
       an unwritten outcome vanish from the page entirely, and a reader would
       have no way to tell a unit missing two thirds of its content from one
       whose specification simply has fewer outcomes. */
    u.outcomes.forEach(function (o) {
      var g = groups.filter(function (x) { return x.outcome === o.n; })[0];
      h += '<div class="a3-outcome' + (g ? '' : ' is-unwritten') + '">' +
        '<div class="a3-outcome-n">Outcome ' + esc(o.n) + '</div>' +
        '<h2 class="a3-outcome-t">' + esc(o.title) + '</h2>' +
        '<div class="a3-outcome-w">' + o.weighting + '% of the assessment</div>' +
        '</div>';
      h += g
        ? renderTrack(g)
        : '<div class="a3-unwritten">Not written yet. ' +
          o.topics.length + ' topic area' + (o.topics.length === 1 ? '' : 's') + ' of the specification ' +
          'sit here, and no lesson claims any of them.</div>';
    });

    h += '<footer class="a3-foot">Independent study tool. Not affiliated with, endorsed by, or officially associated with AAT.</footer>';
    return h + '</div>';
  }

  function renderTrack(g) {
    var ls = (g.lessons || []).slice();
    var sh = sheetOf(g);
    if (sh) ls.push(sh);
    var h = '<div class="a3-track">';
    ls.forEach(function (l, i) {
      var t = l.isSheet ? 'sheet' : nodeType(l);
      var meta = TYPE_META[t];
      var done = !l.isSheet && isDone(l.id);
      var st = l.isSheet ? 0 : stars(l.id);
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
          '<div class="a3-node-meta">' + (l.isSheet
            ? 'Everything in this outcome, on one card'
            : (l.cards || []).length + ' cards · ' + (l.check || []).length + ' questions') + '</div>' +
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

    h += '<article class="a3-sheet' + (l.isSheet ? ' a3-cheat' : '') + '">';
    if (S.phase === 'teach') {
      h += cardHtml(cards[S.cardIdx] || {});
      var c = cards[S.cardIdx] || {};
      var blocked = c.worked && S.revealed < (c.worked.steps || []).length;
      h += '<div class="a3-nav">' +
        (S.cardIdx > 0 ? '<button class="a3-btn a3-btn-ghost" data-a3="back">Back</button>' : '<span></span>') +
        (blocked ? '<span class="a3-nav-hint">Reveal the steps to continue</span>'
                 : '<button class="a3-btn a3-btn-primary" data-a3="next">' +
                   (S.cardIdx === cards.length - 1
                     ? (l.isSheet ? 'Back to the path' : 'Start the questions')
                     : 'Continue') + '</button>') +
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
      /* SHUFFLED, like the multiple-choice options and the true/false rows.
         Gap-fill was the one question type rendered in authored order, and the
         authored order had the right answer first in 38 of 40 gaps — so
         "always pick the leftmost pill" scored 95% across the whole module
         without reading a word of the question. Nothing measured it, because
         the cue checks were written for MCQ keys and true/false balance.
         Shuffling makes the position carry no information at all, which is a
         better fix than rebalancing data that would drift back. */
      if (!S._gapOrder) {
        S._gapOrder = (q.gaps || []).map(function (g) {
          return shuffle((g.options || []).map(function (_, i) { return i; }));
        });
      }
      var parts = q.template.split(/(\{\d+\})/);
      h += '<div class="a3-gap">' + parts.map(function (p) {
        var m = /^\{(\d+)\}$/.exec(p);
        if (!m) return esc(p);
        var gi = +m[1], g = q.gaps[gi], sel = S.gapPicks[gi];
        var order = S._gapOrder[gi] || g.options.map(function (_, i) { return i; });
        return '<span class="a3-gapsel">' + order.map(function (oi) {
          var on = sel === oi;
          var cls = on ? ' on' : '';
          if (S.answered !== null && oi === g.answer) cls = ' is-right';
          else if (S.answered !== null && on) cls = ' is-wrong';
          return '<button class="a3-pill' + cls + '" data-a3="gap" data-g="' + gi + '" data-o="' + oi + '"' +
            (S.answered !== null ? ' disabled' : '') + '>' + esc(g.options[oi]) + '</button>';
        }).join('') + '</span>';
      }).join('') + '</div>';
      if (S.answered === null) h += '<button class="a3-btn a3-btn-primary a3-wide" data-a3="gapsubmit">Submit</button>';
    } else if (t === 'task') {
      h += taskHtml(q);
    }

    if (S.answered !== null) {
      h += '<div class="a3-exp-box"><div class="a3-exp-l">Why</div><p class="a3-exp">' + md(q.exp || '') + '</p></div>' +
        '<button class="a3-btn a3-btn-primary a3-wide" data-a3="nextq">' +
        (S.qIdx === n - 1 ? 'Finish' : 'Next question') + '</button>';
    }
    return h;
  }

  /* ── Multi-part task ───────────────────────────────────────────────────────
     The exam's spine, and the one shape this module did not have.

     Every other question type hands the reader exactly the figures it wants
     operated on, already classified, in the order they are needed. A task hands
     over a table that includes rows which do NOT belong in the answer, and asks
     for several figures derived from it — with the table still on screen while
     they work. Selecting and classifying the rows is the assessed skill; the
     arithmetic is the easy half, and it was the only half being practised.

     ALL PARTS OR NOTHING, WITH PER-PART FEEDBACK. `score` is a count of
     questions and the progress store keeps (attempted, correct) pairs that
     merge across devices by MAX, so fractional credit has nowhere to live. It
     is also the honest reading: a VAT return with one box wrong is a wrong VAT
     return. What the reader needs is to see WHICH box — that is what the
     per-part verdicts are for, and they are shown whether or not the whole
     task was right.

     WHY A FAILED SUBMIT REPAINTS. The other multi-answer types return silently
     when something is unanswered, which is survivable across three true/false
     rows and confusing across six boxes. Typing does not repaint — that would
     take the caret out of the field mid-number — so a live counter is not
     available; instead the attempt itself marks every blank part. */
  /* A cell that is an amount: digits to two decimal places, with or without
     grouping and with or without the brackets that mark a credit. Deliberately
     narrower than "contains a digit", which would catch "12 Jan" and align a
     whole column of dates to the right. */
  var MONEY_CELL = /^\(?£?\s?\d[\d,]*\.\d{2}\)?$/;

  function taskHtml(q) {
    var parts = q.parts || [];
    var graded = S.answered !== null;

    if (!S._taskOrder) {
      S._taskOrder = parts.map(function (p) {
        return p.type === 'choice'
          ? shuffle((p.options || []).map(function (_, i) { return i; }))
          : null;
      });
    }

    var h = '';
    if (q.brief) h += '<p class="a3-p a3-task-brief">' + md(q.brief) + '</p>';

    (q.datasets || []).forEach(function (d) {
      h += '<div class="a3-dataset">';
      if (d.title) h += '<div class="a3-dataset-t">' + md(d.title) + '</div>';
      /* Which columns hold money, worked out from the rows rather than declared
         in the data. A task's whole job is to be read across and added up, and
         amounts that wrap mid-figure or sit ragged against a left edge are
         harder to total than they need to be. Deriving it means a new dataset
         gets the alignment without anyone remembering to ask for it. */
      var rows = d.rows || [];
      var numCol = (d.headers || rows[0] || []).map(function (_, ci) {
        var vals = rows.map(function (r) { return String(r[ci] == null ? '' : r[ci]); })
                       .filter(function (v) { return v !== ''; });
        return vals.length > 0 && vals.every(function (v) { return MONEY_CELL.test(v); });
      });
      var cell = function (tag, x, ci) {
        return '<' + tag + (numCol[ci] ? ' class="a3-num"' : '') + '>' + md(x) + '</' + tag + '>';
      };
      h += '<div class="a3-tablewrap"><table class="a3-table">';
      if (d.headers) {
        h += '<thead><tr>' + d.headers.map(function (x, ci) {
          return cell('th', x, ci);
        }).join('') + '</tr></thead>';
      }
      h += '<tbody>' + rows.map(function (r) {
        return '<tr>' + r.map(function (x, ci) { return cell('td', x, ci); }).join('') + '</tr>';
      }).join('') + '</tbody></table></div>';
      if (d.note) h += '<div class="a3-dataset-note">' + md(d.note) + '</div>';
      h += '</div>';
    });

    h += '<div class="a3-parts">';
    parts.forEach(function (p, pi) {
      var done = partAnswered(p, pi);
      var right = graded && S.taskResults ? S.taskResults[pi] : false;
      var cls = graded ? (right ? ' is-right' : ' is-wrong')
                       : (S.taskNudge && !done ? ' is-missing' : '');
      h += '<div class="a3-part' + cls + '">' +
        '<div class="a3-part-l">' + md(p.label) + '</div>';

      if (p.type === 'choice') {
        var order = S._taskOrder[pi] || (p.options || []).map(function (_, i) { return i; });
        h += '<div class="a3-part-opts">' + order.map(function (oi) {
          var on = S.taskPicks[pi] === oi;
          var c = on ? ' on' : '';
          if (graded && oi === p.answer) c = ' is-right';
          else if (graded && on) c = ' is-wrong';
          return '<button class="a3-pill' + c + '" data-a3="taskpick" data-p="' + pi + '" data-o="' + oi + '"' +
            (graded ? ' disabled' : '') + '>' + esc(p.options[oi]) + '</button>';
        }).join('') + '</div>';
      } else {
        h += '<div class="a3-part-in">' +
          '<input class="a3-input" inputmode="decimal" data-a3="taskinput" data-p="' + pi + '"' +
          ' value="' + esc(S.taskInputs[pi] == null ? '' : S.taskInputs[pi]) + '"' +
          ' placeholder="' + esc(p.unit || '') + '"' +
          ' aria-label="' + esc(p.label) + '"' + (graded ? ' disabled' : '') + '></div>';
      }

      if (graded) {
        h += '<div class="a3-part-v">' +
          (right ? 'Correct' : 'Answer — ' + esc(partAnswerText(p))) + '</div>';
        if (p.exp) h += '<p class="a3-part-exp">' + md(p.exp) + '</p>';
      }
      h += '</div>';
    });
    h += '</div>';

    if (!graded) {
      var missing = parts.filter(function (p, pi) { return !partAnswered(p, pi); }).length;
      if (S.taskNudge && missing) {
        h += '<div class="a3-part-status">' + missing + ' of ' + parts.length +
          (missing === 1 ? ' answer is still blank' : ' answers are still blank') + '</div>';
      }
      h += '<button class="a3-btn a3-btn-primary a3-wide" data-a3="tasksubmit">Submit all ' +
        parts.length + '</button>';
    }
    return h;
  }

  function partAnswered(p, pi) {
    return p.type === 'choice' ? S.taskPicks[pi] !== undefined : num(S.taskInputs[pi]) !== null;
  }
  /* Money is printed the way the dataset prints it — grouped, to the penny —
     rather than as the bare number the answer is keyed to. A reader told the
     answer was "£5570" has to translate it back to the "£5,570.00" in the day
     book to see where it came from, and the whole point of the verdict is that
     they can trace it. Typing either form is accepted: num() strips both the
     symbol and the commas before comparing. */
  function partAnswerText(p) {
    if (p.type === 'choice') return (p.options || [])[p.answer];
    if (p.unit === '£') {
      return '£' + Number(p.answer).toLocaleString('en-GB', {
        minimumFractionDigits: 2, maximumFractionDigits: 2,
      });
    }
    return String(p.answer) + (p.unit ? ' ' + p.unit : '');
  }
  function partCorrect(p, pi) {
    if (p.type === 'choice') return S.taskPicks[pi] === p.answer;
    var g = num(S.taskInputs[pi]);
    return g !== null && Math.abs(g - p.answer) < 0.005;
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
        (isP ? ' · ' + practiceLabel() : '') + '</div>' +
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
    var los = outcomes();
    var counts = {};
    bank.forEach(function (q) { counts[q.lo] = (counts[q.lo] || 0) + 1; });

    var h = '<div class="a3-root">';
    h += '<header class="a3-hero a3-hero-sm">' +
      '<div class="a3-hero-glow" aria-hidden="true"></div>' +
      '<div class="a3-hero-in">' +
      '<div class="a3-eyebrow">Practice</div>' +
      '<h1 class="a3-title">Test yourself</h1>' +
      /* "up to", because a run is a slice of the pool: an outcome with eight
         questions in the bank gives a run of eight, not a run of ten padded
         out. Stating a flat ten was accurate while every outcome had more than
         ten and stopped being accurate the moment one did not. */
      '<div class="a3-sub">' + bank.length + ' questions · up to ' + PRACTICE_LEN + ' per run, drawn at random</div>' +
      '</div></header>';

    h += renderPracticeSummary();

    h += '<div class="a3-pgrid">';
    h += '<button class="a3-pcard a3-pcard-mix" data-a3="startpractice" data-lo="mix">' +
      '<span class="a3-pcard-k">Mixed</span>' +
      '<span class="a3-pcard-t">All outcomes</span>' +
      '<span class="a3-pcard-m">' + bank.length + ' questions in the pool</span>' +
      '</button>';

    /* Only offered when there is something to redo. A card reading "0
       questions" is an invitation to a screen with nothing on it, and a reader
       who has just cleared their backlog has earned its absence. */
    var missed = missedQuestions(activeUnit());
    if (missed.length) {
      h += '<button class="a3-pcard a3-pcard-missed" data-a3="startpractice" data-lo="missed">' +
        '<span class="a3-pcard-k">Your mistakes</span>' +
        '<span class="a3-pcard-t">Questions you got wrong</span>' +
        '<span class="a3-pcard-m">' + missed.length +
        (missed.length === 1 ? ' question waiting' : ' questions waiting') +
        ', most recent first</span>' +
        '</button>';
    }
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
    if (S.screen === 'units') return unitKeys().length > 1 ? renderUnits() : renderPath();
    return renderPath();
  }

  /* Where the reader is, as a single comparable string. Cards are long enough
     to scroll now, so advancing to the next one has to put them back at the
     top — otherwise a new card opens halfway down its own text.

     Keyed on POSITION, not on every render. Revealing a worked-example step,
     picking an option or submitting an answer all re-render, and none of them
     should yank the page to the top while the reader is mid-card. */
  function posKey() {
    return [S.screen, S.unit, S.lessonId, S.phase, S.cardIdx, S.qIdx].join('|');
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

  /* ── Drawing a mixed run to the exam's own weighting ───────────────────────
     A mixed run used to be a uniform sample of the pool, which quietly made the
     pool's composition the syllabus. It was not the same shape: Outcome 5 is
     10% of the assessment and was 15% of the pool, Outcome 2 is 30% and was
     26%. A reader working through mixed runs was over-practising the smallest
     outcome and under-practising the largest, and neither of those numbers is
     visible from inside a run.

     Weighting the DRAW rather than the pool is the fix that keeps working.
     Question counts drift every time anything is written; the weightings come
     from the syllabus and change only when AAT changes them. Balancing the pool
     would be a one-off correction that starts going stale immediately.

     SYSTEMATIC SAMPLING, not largest remainder. Ten questions cannot be split
     25/30/20/15/10 exactly, and how the leftover seats are handed out decides
     whether the weighting is honoured on average or only on paper. Largest
     remainder is deterministic: with these weightings it awards the spare seat
     to Outcome 1 in EVERY run, so Outcome 1 is permanently 30% of practice
     against 25% of the exam and Outcome 4 permanently 10% against 15%. Fixing
     one bias by installing another, quietly.

     One uniform draw, carried across the cumulative shares, has neither
     problem. Each outcome's seat count is the difference between two floors of
     its running total offset by that draw, which makes the expected count
     exactly its share, and makes the seats always sum to n because the last
     floor is n and the first is zero. A ten-question run comes out 2/3/2/2/1 or
     3/3/2/1/1 depending on the draw, and averages to 2.5/3/2/1.5/1.

     A shortfall in one outcome is redistributed rather than left as a gap: a
     run that asked for three and found two must still be ten questions long, or
     the score at the end is out of a different number than the reader thinks. */
  function drawWeighted(unitKey, n) {
    var bank = practiceBank(unitKey);
    var os = outcomes(unitKey).filter(function (o) {
      return bank.some(function (q) { return q.lo === o.n; });
    });
    if (!os.length) return shuffle(bank).slice(0, n);

    var total = os.reduce(function (a, o) { return a + (o.weighting || 0); }, 0);
    if (!total) return shuffle(bank).slice(0, n);

    var u = Math.random();
    var cum = 0, prev = Math.floor(u);
    var seats = os.map(function (o) {
      cum += n * (o.weighting || 0) / total;
      var upto = Math.floor(cum + u);
      var got = upto - prev;
      prev = upto;
      return { n: o.n, whole: got };
    });

    var pools = {};
    seats.forEach(function (s) {
      pools[s.n] = shuffle(bank.filter(function (q) { return q.lo === s.n; }));
    });

    var out = [];
    seats.forEach(function (s) { out = out.concat(pools[s.n].splice(0, s.whole)); });

    /* Anything the weighting could not fill, taken from whatever is left over,
       so the run is always the length it says it is. */
    if (out.length < n) {
      var rest = [];
      Object.keys(pools).forEach(function (k) { rest = rest.concat(pools[k]); });
      out = out.concat(shuffle(rest).slice(0, n - out.length));
    }
    return shuffle(out);
  }

  function startPractice(lo) {
    /* Pinned at the start of the run. Everything downstream files its answers
       against this rather than against whatever unit happens to be active when
       the question is graded. */
    S.practiceUnit = activeUnit();
    S.practiceLo = lo;
    /* The mistakes run is drawn in order, oldest miss last, rather than
       shuffled: a reader with thirty outstanding questions wants the ten they
       got wrong most recently, not ten at random from the whole backlog. */
    if (lo === 'missed') {
      S.practiceQs = missedQuestions(S.practiceUnit).slice(0, PRACTICE_LEN);
      S.practiceMissed = [];
      S.mode = 'practice';
      S.screen = 'quiz';
      S.qIdx = 0; S.score = 0;
      resetQState();
      return;
    }
    if (lo === 'mix') {
      S.practiceQs = drawWeighted(S.practiceUnit, PRACTICE_LEN);
    } else {
      var pool = practiceBank(S.practiceUnit).filter(function (q) { return q.lo === lo; });
      S.practiceQs = shuffle(pool).slice(0, PRACTICE_LEN);
    }
    S.practiceMissed = [];
    S.mode = 'practice';
    S.screen = 'quiz';
    S.qIdx = 0; S.score = 0;
    resetQState();
  }

  function startLesson(id) {
    S.mode = 'lesson';
    S.lessonId = id; S.screen = 'lesson'; S.cardIdx = 0; S.phase = 'teach';
    S.qIdx = 0; S.score = 0;
    /* Delegated rather than repeated. This function listed every per-question
       field by hand, which meant a new question type had to be remembered in
       two places, and the one that was forgotten would leak the previous
       lesson's answers into the first question of the next. */
    resetQState();
    S.revealed = 0; S.tryShown = false; S.tryInput = ''; S.tryResult = null;
  }
  function resetCardState() {
    S.revealed = 0; S.tryInput = ''; S.tryResult = null;
  }
  function resetQState() {
    S.answered = null; S.picked = null; S.tfPicks = {}; S.gapPicks = {}; S.numInput = '';
    S._order = null; S._gapOrder = null;
    /* Three of these four are load-bearing and proved so: remove the reset of
       taskInputs, taskPicks or taskNudge and check-aat3-task.js §6 fails, with
       the next task arriving pre-filled, pre-selected, or already scolding the
       reader about blanks. `taskResults` is the exception — it is only ever
       read once a task is graded, and `answered` is set to null on the line
       above, so a stale value cannot reach the screen. It is cleared anyway
       rather than left lying about for whoever next changes that condition. */
    S.taskInputs = {}; S.taskPicks = {}; S.taskResults = null; S.taskNudge = false;
    S._taskOrder = null;
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
      practiceRec(S.practiceUnit || activeUnit()).runs++;
    }
    save();
    S.screen = 'done';
  }

  function wire(el) {
    _host = el;
    el.querySelectorAll('[data-a3]').forEach(function (n) {
      var act = n.getAttribute('data-a3');
      if (act === 'tryinput' || act === 'numinput' || act === 'taskinput') {
        n.addEventListener('input', function () {
          if (act === 'tryinput') S.tryInput = n.value;
          else if (act === 'numinput') S.numInput = n.value;
          else S.taskInputs[+n.getAttribute('data-p')] = n.value;
        });
        n.addEventListener('keydown', function (e) {
          if (e.key === 'Enter') {
            e.preventDefault();
            var target = act === 'tryinput' ? 'trycheck' : act === 'numinput' ? 'numsubmit' : 'tasksubmit';
            var b = el.querySelector('[data-a3="' + target + '"]');
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
    if (act === 'openunit') {
      S.unit = n.getAttribute('data-unit');
      S.mode = 'lesson'; S.screen = 'path'; S.lessonId = null;
      return rerender();
    }
    if (act === 'tounits') { S.mode = 'lesson'; S.screen = 'units'; S.lessonId = null; return rerender(); }
    if (act === 'startpractice') {
      var lo = n.getAttribute('data-lo');
      startPractice(lo === 'mix' || lo === 'missed' ? lo : Number(lo));
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
      if (S.cardIdx === cards.length - 1) {
        /* A sheet has no check phase to move into, and no score to record —
           there is nothing to answer, so nothing to be right about. */
        if (l && l.isSheet) { S.screen = 'path'; S.lessonId = null; }
        else { S.phase = 'check'; S.qIdx = 0; resetQState(); }
      } else { S.cardIdx++; resetCardState(); }
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
    if (act === 'taskpick') {
      S.taskPicks[+n.getAttribute('data-p')] = +n.getAttribute('data-o');
      return rerender();
    }
    if (act === 'tasksubmit') {
      var tparts = (q && q.parts) || [];
      if (!tparts.length) return;
      if (!tparts.every(partAnswered)) { S.taskNudge = true; return rerender(); }
      S.taskResults = tparts.map(partCorrect);
      S.answered = S.taskResults.every(Boolean);
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
        recordPractice(S.practiceUnit || activeUnit(), q.lo, S.answered === true);
        /* Only practice questions have ids. A lesson check has no identity of
           its own to remember, and the lesson it belongs to is already tracked
           by its own progress record. */
        recordQuestion(S.practiceUnit || activeUnit(), q.id, S.answered === true);
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
    reset: function (screen, unitKey) {
      S.screen = screen || 'units';
      if (unitKey) S.unit = unitKey;
    },
    /* Exposed so scripts/check-aat3-practice-summary.js can assert the totals
       and the most-mistakes ranking directly, rather than reading them back out
       of rendered HTML. */
    practiceSummary: practiceSummary,
  };
}(typeof self !== 'undefined' ? self : this));
