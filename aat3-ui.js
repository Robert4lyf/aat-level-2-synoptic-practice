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
    mode: 'lesson',      // 'lesson' | 'practice' | 'mock' — which set the question handlers read
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
    mockEndsAt: 0,       // timed mock: when the clock runs out
    mockResults: [],     // timed mock: {q, correct} per question, for the report
    mockOver: false,     // timed mock: the clock ran out rather than the reader finishing
    /* Which outcome sections are folded shut on the path. Session-only on
       purpose: folding a section is a momentary act of tidying, not progress,
       and storing it would mean a reader who collapsed everything once came
       back weeks later to a unit that looked empty. */
    shut: {},
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
        /* EVERY FIELD IS NAMED HERE, and that is the trap in this function: it
           REBUILDS the record rather than copying it, so a field added anywhere
           else and not added here is written on the way out and silently gone
           on the way back in. `mocks` and `mockBest` were, and a reader's best
           mock score survived until the page was reloaded. */
        out.units[k] = {
          runs: n0(u.runs),
          mocks: n0(u.mocks),
          mockBest: n0(u.mockBest),
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
    var blank = { runs: 0, mocks: 0, mockBest: 0, los: {}, qs: {} };
    if (!unitKey) return blank;
    var u = data.practice.units[unitKey];
    if (!u) u = data.practice.units[unitKey] = blank;
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
    /* A mock reads the same list. This said `=== 'practice'` and fell through
       to the lesson branch for any other mode, so the first mock ever started
       found no questions and bounced straight back to the picker. */
    if (S.mode === 'practice' || S.mode === 'mock') return S.practiceQs;
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
    if (S.practiceLo === 'mock') return 'a timed paper';
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
      /* Each cell carries its column heading. Nothing shows it on a wide screen
         — the header row is right there — but on a narrow one the table stops
         being a grid and becomes a list of labelled facts, and then the label
         has to come from somewhere. See .a3-cheat .a3-table in the stylesheet.

         WHY THAT IS NEEDED AT ALL. Three columns of accounting vocabulary do
         not fit across a phone. Measured across the eleven cheat sheets: at
         312px, thirty-one words — "Deregistration", "irrecoverable",
         "appropriation", "£1,350,000" — are individually wider than the column
         they sit in, so they break mid-word however the widths are shared out.
         Two rounds of tuning proportions moved which words broke and never
         stopped them breaking. */
      var heads = c.table.headers || [];
      h += '<div class="a3-tablewrap"><table class="a3-table">';
      if (heads.length) {
        h += '<thead><tr>' + heads.map(function (x) { return '<th>' + md(x) + '</th>'; }).join('') + '</tr></thead>';
      }
      h += '<tbody>' + (c.table.rows || []).map(function (r) {
        return '<tr>' + r.map(function (x, ci) {
          var head = heads[ci] ? ' data-h="' + esc(String(heads[ci]).replace(/\*\*/g, '')) + '"' : '';
          return '<td' + head + '>' + md(x) + '</td>';
        }).join('') + '</tr>';
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

    /* THE ONE SCREEN THAT KEEPS A TITLE. Everywhere else the hero was repeating
       what the reader already knew; here, choosing between two units IS the
       screen, so a heading and a sentence of orientation earn their space. It
       is a third of the height the hero used to be, and flat rather than a
       gradient — the shared header above it is already a gradient, and two
       stacked read as a mistake. */
    var h = '<div class="a3-root"><div class="a3-page">';
    h += '<header class="a3-head">' +
      '<div class="a3-eyebrow">AAT Level 3 Diploma in Accounting · Q2022</div>' +
      '<h1 class="a3-head-t">Choose a unit</h1>' +
      '<p class="a3-head-s">Each has its own path, its own practice bank and its own progress.</p>' +
      '</header>';

    h += '<div class="a3-ugrid">';
    keys.forEach(function (k) {
      var u = unitMeta(k);
      var p = unitProgress(k);
      if (!u) return;
      var pct = p.lessons ? Math.round((p.done / p.lessons) * 100) : 0;
      h += '<button class="a3-ucard' + (p.complete ? '' : ' is-partial') + '" data-a3="openunit" data-unit="' + esc(k) + '">' +
        '<span class="a3-ucard-top">' +
          '<span class="a3-ucard-k">' + esc(u.code) + '</span>' +
          '<span class="a3-ring' + (pct >= 100 ? ' is-full' : '') + '" style="--p:' + pct + '"' +
            ' role="img" aria-label="' + pct + '% of the lessons done"></span>' +
        '</span>' +
        '<span class="a3-ucard-t">' + esc(u.title) + '</span>' +
        '<span class="a3-ucard-facts">' +
          '<span><b>' + u.qualificationWeighting + '%</b> of the grade</span>' +
          '<span><b>' + u.assessment.durationMinutes + '</b> min exam</span>' +
          '<span><b>' + u.outcomes.length + '</b> outcomes</span>' +
          '<span><b>' + u.glh + '</b> guided hours</span>' +
        '</span>' +
        '<span class="a3-ucard-s">' +
          (p.lessons ? p.done + ' of ' + p.lessons + ' lessons done' : 'nothing studied yet') +
          (p.complete
            ? ''
            : ' · <strong>' + p.authored + ' of ' + p.outcomes + ' outcomes written</strong> (' + p.pctOfExam + '% of the exam)') +
        '</span>' +
        '</button>';
    });
    h += '</div>';
    h += '<footer class="a3-foot">Independent study tool. Not affiliated with, endorsed by, or officially associated with AAT.</footer>';
    return h + '</div></div>';
  }

  /* ── Path screen ─────────────────────────────────────────────────────────── */
  /* ── The context bar ────────────────────────────────────────────────────────
     What the full-bleed hero was for, in a tenth of the height. The hero cost
     about 450px on a phone and repeated the unit title on every screen; between
     it and the shared header, 740px of an 844px display was chrome before a
     word of content.

     Sticky, because on a path this long the two things you always want are to
     know where you are and to be able to leave. */
  function ctxBar(opts) {
    var o = opts || {};
    var h = '<div class="a3-ctx">';
    if (o.back) {
      h += '<button class="a3-ctx-back" data-a3="' + o.back + '" aria-label="' +
        esc(o.backLabel || 'Back') + '"><span aria-hidden="true">←</span></button>';
    }
    h += '<div class="a3-ctx-main">' +
      '<div class="a3-ctx-unit">' + esc(o.title || '') + '</div>' +
      (o.meta ? '<div class="a3-ctx-meta">' + esc(o.meta) + '</div>' : '') +
      '</div>';
    if (typeof o.pct === 'number') {
      h += '<div class="a3-ctx-ring"><div class="a3-ring' + (o.pct >= 100 ? ' is-full' : '') +
        '" style="--p:' + o.pct + '" role="img" aria-label="' + o.pct + '% complete"></div></div>';
    }
    return h + '</div>';
  }

  /* The next thing to do: the first lesson on the path that has not been
     finished. A study tool whose home screen cannot answer "where was I" makes
     the reader answer it themselves, by scrolling. */
  function nextLesson() {
    var all = lessons();
    for (var i = 0; i < all.length; i++) {
      if (!isDone(all[i].id)) return all[i];
    }
    return null;
  }
  function outcomeOf(l) {
    var found = null;
    path().forEach(function (g) {
      (g.lessons || []).forEach(function (x) { if (x.id === l.id) found = g; });
    });
    return found;
  }

  function renderPath() {
    var key = activeUnit();
    var u = unitMeta(key);
    var groups = path();
    if (!u || !groups.length) return '<div class="a3-empty">Level 3 content is still loading.</div>';
    var ls = lessons();
    var doneN = ls.filter(function (l) { return isDone(l.id); }).length;
    var pct = ls.length ? Math.round((doneN / ls.length) * 100) : 0;
    var prog = unitProgress(key);
    var bank = practiceBank();
    var h = '<div class="a3-root">';

    h += ctxBar({
      back: unitKeys().length > 1 ? 'tounits' : null,
      backLabel: 'All Level 3 units',
      title: u.title,
      /* Just the lesson count. The exam duration and the grade weighting were
         here too and pushed the line past the width of a phone, so it
         truncated to "90 min exam · …" — a bar that reports a unit's facts by
         eliding them. Both are on the units screen, where choosing between
         units is the job. */
      meta: doneN + ' of ' + ls.length + ' lessons',
      pct: pct,
    });

    h += '<div class="a3-page">';

    /* ── The two things you came here to do ──────────────────────────────────
       Continue, and practise. Both above the fold, both one tap, so the long
       scroll below is for browsing rather than for finding your place. */
    var next = nextLesson();
    h += '<div class="a3-actions">';
    if (next) {
      var ng = outcomeOf(next);
      h += '<button class="a3-act a3-act-go" data-a3="open" data-id="' + esc(next.id) + '">' +
        '<span class="a3-act-k">' + (doneN ? 'Continue' : 'Start here') + '</span>' +
        '<span class="a3-act-t">' + esc(next.title) + '</span>' +
        '<span class="a3-act-m">' + (ng ? 'Outcome ' + ng.outcome + ' · ' : '') +
          (next.cards || []).length + ' cards · ' + (next.check || []).length + ' questions</span>' +
        '<span class="a3-act-go-i" aria-hidden="true">→</span>' +
        '</button>';
    } else {
      h += '<div class="a3-act a3-act-done">' +
        '<span class="a3-act-k">Every lesson finished</span>' +
        '<span class="a3-act-t">The path is complete</span>' +
        '<span class="a3-act-m">Practice and the timed mock are where the work is now.</span>' +
        '</div>';
    }
    if (bank.length) {
      h += '<button class="a3-act a3-act-alt" data-a3="practice">' +
        '<span class="a3-act-k">Practise</span>' +
        '<span class="a3-act-t">Questions and a timed mock</span>' +
        '<span class="a3-act-m">' + bank.length + ' questions · drawn to the exam weighting</span>' +
        '<span class="a3-act-go-i" aria-hidden="true">→</span>' +
        '</button>';
    }
    h += '</div>';

    /* A unit still being written says so, once, here — not above every scroll.
       For a finished unit the standing caveats live in lesson 0A. */
    if (!prog.complete) {
      h += '<div class="a3-notice"><strong>' + prog.authored + ' of ' + u.outcomes.length +
        ' outcomes ' + (prog.authored === 1 ? 'is' : 'are') + ' written</strong>, covering ' +
        prog.pctOfExam + '% of this unit\'s assessment. ' +
        'The rest are listed below in the order the specification sets them out, so you can see what is ' +
        'coming and what is missing. Nothing here has been reviewed by a qualified accountant.</div>';
    }

    /* ── The outcome index ───────────────────────────────────────────────────
       Nine outcomes and fifty-one lessons is a long way to scroll to reach
       Outcome 7. The chips jump straight to it, and each one carries its own
       state so the index doubles as a progress overview. */
    h += '<nav class="a3-index" aria-label="Jump to an outcome">';
    u.outcomes.forEach(function (o) {
      var g = groups.filter(function (x) { return x.outcome === o.n; })[0];
      var gl = g ? (g.lessons || []) : [];
      var gd = gl.filter(function (l) { return isDone(l.id); }).length;
      var state = !g ? ' is-unwritten' : (gl.length && gd === gl.length) ? ' is-done' : gd ? ' is-part' : '';
      h += '<button class="a3-index-c' + state + '" data-a3="jump" data-o="' + o.n + '"' +
        ' aria-label="Outcome ' + o.n + ', ' + esc(o.title) + '">' +
        '<span class="a3-index-n">' + o.n + '</span>' +
        '<span class="a3-index-w">' + o.weighting + '%</span>' +
        '</button>';
    });
    h += '</nav>';

    /* ── The track ───────────────────────────────────────────────────────────
       Driven by the SYLLABUS rather than by what happens to be written:
       iterating the authored groups would make an unwritten outcome vanish, and
       a reader could not tell a unit missing two thirds of its content from one
       whose specification simply has fewer outcomes. */
    u.outcomes.forEach(function (o) {
      var g = groups.filter(function (x) { return x.outcome === o.n; })[0];
      var gl = g ? (g.lessons || []) : [];
      var gd = gl.filter(function (l) { return isDone(l.id); }).length;
      var shut = !!S.shut[o.n];
      h += '<section class="a3-oc' + (g ? '' : ' is-unwritten') + (shut ? ' is-shut' : '') +
        '" id="a3-oc-' + o.n + '">' +
        '<button class="a3-oc-h" data-a3="fold" data-o="' + o.n + '" aria-expanded="' + (!shut) + '">' +
          '<span class="a3-oc-n">' + o.n + '</span>' +
          '<span class="a3-oc-tx">' +
            '<span class="a3-oc-t">' + esc(o.title) + '</span>' +
            '<span class="a3-oc-m">' + o.weighting + '% of the assessment' +
              (g ? ' · ' + gd + ' of ' + gl.length + ' done' : ' · not written yet') + '</span>' +
          '</span>' +
          '<span class="a3-oc-fold" aria-hidden="true">' + (shut ? '+' : '−') + '</span>' +
        '</button>';
      if (!shut) {
        h += g
          ? renderTrack(g)
          : '<div class="a3-unwritten">Not written yet. ' +
            o.topics.length + ' topic area' + (o.topics.length === 1 ? '' : 's') + ' of the specification ' +
            'sit here, and no lesson claims any of them.</div>';
      }
      h += '</section>';
    });

    h += '<footer class="a3-foot">Independent study tool. Not affiliated with, endorsed by, or officially associated with AAT.</footer>';
    return h + '</div></div>';
  }

  /* ── One outcome's lessons ─────────────────────────────────────────────────
     A LIST ON A RAIL, not a zig-zag. The nodes used to alternate left and right
     joined by SVG curves, which looked like a path and behaved like an obstacle:
     each rung's text had about 250px of a 390px screen to live in, so titles
     wrapped to three lines and one outcome ran to fifteen hundred pixels. The
     whole path was ten thousand.

     Linear, the same content is a third of the height and every title fits on
     one or two lines. The rail and the markers are what still make it read as a
     path; the zig-zag was never what did that. */
  function renderTrack(g) {
    var ls = (g.lessons || []).slice();
    var sh = sheetOf(g);
    if (sh) ls.push(sh);
    var nx = nextLesson();
    var h = '<ol class="a3-track">';
    ls.forEach(function (l) {
      var t = l.isSheet ? 'sheet' : nodeType(l);
      var meta = TYPE_META[t];
      var done = !l.isSheet && isDone(l.id);
      var st = l.isSheet ? 0 : stars(l.id);
      var isNext = nx && l.id === nx.id;
      h += '<li class="a3-rung a3-rung-' + t + (done ? ' is-done' : '') + (isNext ? ' is-next' : '') + '">' +
        '<button class="a3-rung-b" data-a3="open" data-id="' + esc(l.id) + '"' +
          ' aria-label="' + esc(l.title) + (done ? ', completed' : isNext ? ', up next' : '') + '">' +
          '<span class="a3-rung-mark" aria-hidden="true">' +
            (done ? '✓' : esc(l.icon || meta.glyph)) + '</span>' +
          '<span class="a3-rung-tx">' +
            '<span class="a3-rung-t">' + esc(l.title) + '</span>' +
            /* A sheet's line does not repeat its own label. "Cheat sheet ·
               everything in this outcome, on one card" ran past the width of
               the row and truncated mid-word; the label is already there. */
            '<span class="a3-rung-m">' + (l.isSheet
              ? 'Everything in this outcome, on one card'
              : esc(meta.label) + ' · ' + (l.cards || []).length + ' cards · ' +
                (l.check || []).length + ' questions') + '</span>' +
          '</span>' +
          (st ? '<span class="a3-rung-st" aria-label="' + st + ' of 3 stars">' +
            [1,2,3].map(function (n) { return '<span class="' + (n <= st ? 'on' : '') + '">★</span>'; }).join('') +
            '</span>' : '') +
        '</button></li>';
    });
    return h + '</ol>';
  }

  /* ── Lesson screen ───────────────────────────────────────────────────────── */
  function renderLesson() {
    var l = lessonById(S.lessonId);
    if (!l) { S.screen = 'path'; return renderPath(); }
    var cards = l.cards || [], checks = l.check || [];
    var total = cards.length + checks.length;
    var pos = S.phase === 'teach' ? S.cardIdx : cards.length + S.qIdx;
    var pct = total ? Math.round((pos / total) * 100) : 0;

    /* The bar says WHICH LESSON, and whether you are reading or being asked.
       It was a back button, a bar and "1 / 6" — three signals none of which
       named the thing on screen or admitted that a lesson has two halves. A
       reader who put the phone down mid-lesson came back to a progress bar. */
    var h = '<div class="a3-root a3-reading' + fresh() + '">';
    h += '<div class="a3-lessonbar">' +
      '<button class="a3-ctx-back" data-a3="exit" aria-label="Back to the path">' +
        '<span aria-hidden="true">←</span></button>' +
      '<div class="a3-lessonbar-tx">' +
        '<div class="a3-lessonbar-t">' + esc(l.title) + '</div>' +
        '<div class="a3-lessonbar-m">' +
          (l.isSheet ? 'Cheat sheet'
            : S.phase === 'teach'
              ? 'Reading · card ' + (S.cardIdx + 1) + ' of ' + cards.length
              : 'Questions · ' + (S.qIdx + 1) + ' of ' + checks.length) +
        '</div>' +
      '</div>' +
      '<div class="a3-lessonbar-n">' + pct + '%</div>' +
      '</div>' +
      '<div class="a3-lessonbar-p"><span style="width:' + pct + '%"></span></div>';

    h += '<article class="a3-sheet' + (l.isSheet ? ' a3-cheat' : '') + fresh() + '">';
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
    /* No counter here. The bar above the card carries "Question 3 of 10" now,
       and printing it twice on one screen was the clearest remaining example of
       the module telling the reader the same thing in two places. */
    var h = '<h2 class="a3-q">' + md(q.q) + '</h2>';

    if (t === 'mcq') {
      if (!S._order) S._order = shuffle(q.opts.map(function (_, i) { return i; }));
      h += '<div class="a3-opts">' + S._order.map(function (oi, di) {
        var cls = '';
        if (S.answered !== null) {
          if (oi === q.ans) cls = ' is-right';
          else if (oi === S.picked) cls = ' is-wrong';
        } else if (oi === S.picked) {
          /* CHOSEN, NOT YET MARKED. Only a mock is ever in this state —
             everywhere else choosing IS answering, so an option went straight
             to is-right or is-wrong and this was the one state the control
             never needed. Under exam conditions nothing is graded until the
             paper is over, so without it a reader tapped an option and the
             screen did not move: the pick was recorded and there was simply
             nothing to see. It was reported as the tap not working — "you have
             to long-press rather than tap" — which is what a control that
             accepts input and shows none looks like from the outside.

             Every other question type already had it: the true/false, gap-fill
             and task pills all carry `on` from their own pick, independently
             of whether anything has been graded. */
          cls = ' on';
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
      if (S.answered === null && !isMock()) h += '<button class="a3-btn a3-btn-primary a3-wide" data-a3="tfsubmit">Submit</button>';
    } else if (t === 'numeric') {
      if (S.answered === null) {
        h += '<div class="a3-try-row' + (isMock() ? ' a3-try-row-mock' : '') + '">' +
          '<input class="a3-input" inputmode="decimal" data-a3="numinput" value="' + esc(S.numInput) + '" placeholder="' + esc(q.unit || '') + '" aria-label="Your answer">' +
          (isMock() ? '' : '<button class="a3-btn a3-btn-primary" data-a3="numsubmit">Check</button>') + '</div>';
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
      if (S.answered === null && !isMock()) h += '<button class="a3-btn a3-btn-primary a3-wide" data-a3="gapsubmit">Submit</button>';
    } else if (t === 'task') {
      h += taskHtml(q);
    }

    /* NOTHING IS REVEALED IN A MOCK, and it falls out rather than being
       arranged: the block below is gated on the question having been graded,
       and under exam conditions grading does not happen until the reader has
       already moved on. There is no branch here that could be forgotten. */
    if (isMock()) {
      h += '<button class="a3-btn a3-btn-primary a3-wide" data-a3="mocknext">' +
        (S.qIdx === n - 1 ? 'Finish the paper' : 'Next question') + '</button>';
    } else if (S.answered !== null) {
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

    /* Under exam conditions there is no submit and no nudge: a reader may leave
       a box blank and move on, exactly as they may in the assessment, and a
       blank marks as wrong when the paper is graded at the end. */
    if (!graded && !isMock()) {
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
  /* The mock's report: how every outcome went, against the share of the paper
     it is worth.

     A percentage on its own is the least useful thing a mock can tell you. What
     a reader needs before sitting the real one is which outcome cost them the
     marks — and weighted, because eight wrong out of eight in a 10% outcome is
     a smaller problem than four wrong out of eight in a 30% one, and the raw
     counts say the opposite. */
  function mockReport() {
    var by = {};
    (S.mockResults || []).forEach(function (r) {
      var k = String(r.lo);
      if (!by[k]) by[k] = { asked: 0, right: 0 };
      by[k].asked++;
      if (r.correct) by[k].right++;
    });
    var os = outcomes(S.practiceUnit || activeUnit());
    var rows = os.filter(function (o) { return by[String(o.n)]; }).map(function (o) {
      var b = by[String(o.n)];
      return {
        n: o.n, title: o.title, weighting: o.weighting,
        asked: b.asked, right: b.right,
        pct: Math.round((b.right / b.asked) * 100),
      };
    });
    if (!rows.length) return '';

    /* Worst first, and worst means most of the paper at stake, not the lowest
       percentage: the outcome to go back to is the one where the marks are. */
    var ranked = rows.slice().sort(function (a, b) {
      return ((100 - b.pct) * b.weighting) - ((100 - a.pct) * a.weighting) || a.n - b.n;
    });
    var focus = ranked[0] && ranked[0].pct < 100 ? ranked[0] : null;

    var h = '<div class="a3-mockreport">' +
      '<div class="a3-mockreport-h">How the paper went, outcome by outcome</div>' +
      '<div class="a3-tablewrap"><table class="a3-table"><thead><tr>' +
      '<th>Outcome</th><th class="a3-num">Weight</th><th class="a3-num">Right</th><th class="a3-num">Score</th>' +
      '</tr></thead><tbody>' +
      rows.map(function (r) {
        return '<tr class="' + (r.pct >= 70 ? 'is-ok' : 'is-low') + '">' +
          '<td>' + r.n + ' · ' + esc(r.title) + '</td>' +
          '<td class="a3-num">' + r.weighting + '%</td>' +
          '<td class="a3-num">' + r.right + ' / ' + r.asked + '</td>' +
          '<td class="a3-num">' + r.pct + '%</td></tr>';
      }).join('') +
      '</tbody></table></div>';
    if (focus) {
      h += '<div class="a3-mockreport-f">Most marks at stake: <strong>Outcome ' + focus.n + ' · ' +
        esc(focus.title) + '</strong> — ' + focus.pct + '% right, and ' + focus.weighting +
        '% of the assessment.</div>';
    }
    return h + '</div>';
  }

  function renderDone() {
    var isM = S.mode === 'mock';
    var isP = S.mode === 'practice' || isM;
    var checks = currentQuestions();
    var pct = checks.length ? Math.round((S.score / checks.length) * 100) : 100;
    var st = pct >= 100 ? 3 : pct >= 80 ? 2 : pct >= 60 ? 1 : 0;
    var passMark = (unitMeta(S.practiceUnit || activeUnit()) || {}).assessment;
    passMark = (passMark && passMark.passMark) || 70;
    var head = isM
      ? (pct >= passMark ? 'A pass, on this paper' : 'Below the pass mark')
      : isP
        ? (pct >= 70 ? 'Comfortable' : pct >= 50 ? 'Some gaps' : 'Worth going back to the lessons')
        : (pct >= 60 ? 'Lesson complete' : 'Worth another pass');

    /* On a practice run, name the outcomes the missed questions came from —
       a score alone tells the reader nothing about where to go next. */
    var weak = '';
    if (isM) {
      weak = (S.mockOver ? '<div class="a3-done-weak">The clock ran out. Questions not reached count as wrong, ' +
                           'exactly as they would in the assessment.</div>' : '') +
        mockReport();
    } else if (isP) {
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
        (isM ? ' · pass mark ' + passMark + '%' : isP ? ' · ' + practiceLabel() : '') + '</div>' +
      (isP ? '' : '<div class="a3-stars a3-stars-big">' + [1,2,3].map(function (n) {
        return '<span class="' + (n <= st ? 'on' : '') + '">★</span>'; }).join('') + '</div>') +
      weak +
      '<div class="a3-done-actions">' +
        '<button class="a3-btn a3-btn-primary" data-a3="exit">' +
          (isP ? 'More practice' : 'Back to the path') + '</button>' +
        (isM ? '' : '<button class="a3-btn a3-btn-ghost" data-a3="retry">Retry</button>') +
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
    var bankCounts = {};
    practiceBank().forEach(function (q) { bankCounts[q.lo] = (bankCounts[q.lo] || 0) + 1; });

    /* THE ROWS RENDER WHETHER OR NOT THERE IS ANY HISTORY, and that is not a
       cosmetic choice. The empty state used to be a single paragraph and
       nothing else, which was fine while a separate grid below offered the
       outcomes — and became a dead end the moment that grid was merged into
       these rows. A reader on their first visit could sit a mock or take mixed
       practice, and had no way to choose an outcome at all.

       So the empty state now changes what is SAID, not what is offered: no
       statistics to report yet, but the same five ways in. */
    var empty = !s.attempted;

    var stat = function (n, label) {
      return '<div class="a3-sum-stat"><span class="a3-sum-n">' + n + '</span>' +
        '<span class="a3-sum-l">' + label + '</span></div>';
    };

    var h = '<section class="a3-sum' + (empty ? ' a3-sum-empty' : '') + '" aria-label="Your practice so far">';
    h += '<div class="a3-sum-eyebrow">Your practice so far</div>';
    if (empty) {
      h += '<p class="a3-sum-emptytx">No practice questions answered yet. Answer a few and this will ' +
        'show how many you have attempted and which outcome is costing you the most marks. ' +
        'In the meantime, every outcome is below.</p>';
    } else {
      h += '<div class="a3-sum-stats">' +
        stat(s.attempted, 'Questions attempted') +
        stat(s.accuracy + '%', 'Answered correctly') +
        stat(s.wrong, s.wrong === 1 ? 'Mistake' : 'Mistakes') +
        stat(s.runs, s.runs === 1 ? 'Run finished' : 'Runs finished') +
        '</div>';
    }

    if (empty) {
      /* nothing to focus on yet — the rows below are the whole offer */
    } else if (s.worst) {
      h += '<div class="a3-sum-focus">' +
        '<div class="a3-sum-focus-tx">' +
          '<div class="a3-sum-focus-k">Most mistakes</div>' +
          '<div class="a3-sum-focus-t">Outcome ' + esc(s.worst.n) + ' · ' + esc(s.worst.title) + '</div>' +
          '<div class="a3-sum-focus-m">' + s.worst.wrong + ' wrong out of ' + s.worst.attempted +
            ' attempted · ' + s.worst.accuracy + '% correct' +
            (s.worst.weighting ? ' · worth ' + s.worst.weighting + '% of the assessment' : '') +
          '</div>' +
        '</div>' +
        /* A quiet link, not a full-width primary button. Every row below is
           now a way into its own outcome, so this is a shortcut to the most
           useful one rather than the only way through — and a solid purple
           slab was claiming to be the latter. */
        '<button class="a3-sum-focus-go" data-a3="startpractice" data-lo="' + esc(s.worst.n) + '">' +
          'Practise Outcome ' + esc(s.worst.n) + ' <span aria-hidden="true">→</span></button>' +
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
      /* A row is a button only where there is something behind it. An outcome
         with nothing in the bank — a unit still being written — would otherwise
         start a run of no questions, which bounces straight back to this
         screen and reads as a broken tap. */
      var live = !!bankCounts[r.n];
      var inner = '<span class="a3-sum-row-n">' + esc(r.n) + '</span>' +
        '<span class="a3-sum-row-t">' + esc(r.title) +
          (isWorst ? '<span class="a3-sum-tag">most mistakes</span>' : '') + '</span>' +
        bar + '<span class="a3-sum-bar-fill ' + bandClass(r.accuracy) + '" style="width:' + pct + '%"></span></span>' +
        '<span class="a3-sum-row-m">' + (r.attempted
          ? r.wrong + ' wrong / ' + r.attempted
          : 'not practised') + '</span>';
      h += live
        ? '<button class="a3-sum-row is-live' + (isWorst ? ' is-worst' : '') + '"' +
            ' data-a3="startpractice" data-lo="' + esc(r.n) + '"' +
            ' aria-label="Practise outcome ' + esc(r.n) + ', ' + esc(r.title) + '">' +
            inner + '<span class="a3-sum-row-go" aria-hidden="true">→</span></button>'
        : '<div class="a3-sum-row' + (isWorst ? ' is-worst' : '') + '">' + inner + '</div>';
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
    var u = unitMeta(activeUnit());
    var counts = {};
    bank.forEach(function (q) { counts[q.lo] = (counts[q.lo] || 0) + 1; });
    var mrec = practiceRec(activeUnit());
    var missed = missedQuestions(activeUnit());

    var h = '<div class="a3-root">';
    h += ctxBar({
      back: 'topath',
      backLabel: 'Back to the path',
      /* The unit's full name plus the bank size does not fit a phone, so it
         truncated to "Tax Processes for Businesses · 112 que…". The unit is
         named on the row above in the shared header and again on the path; the
         useful fact here is how big the bank is. */
      title: 'Practice',
      meta: bank.length + ' questions in this unit',
    });
    h += '<div class="a3-page">';

    /* ── THE THREE THINGS ARE NOT PEERS, AND NO LONGER LOOK IT ────────────────
       This was eight cards of identical weight in one grid: the mock, mixed
       practice, the mistakes backlog and five outcomes, all the same size, all
       the same shape, differing only in colour. A reader scanning it had to
       read every card to find the one that mattered.

       Three tiers now. The mock is a panel, because sitting a timed paper is
       the thing this screen is for. The backlog is an alert, and only when
       there is one. The outcomes are a quiet grid you go to when you already
       know which one you want. */
    h += '<button class="a3-mockpanel" data-a3="startmock">' +
      '<span class="a3-mockpanel-tx">' +
        '<span class="a3-mockpanel-k">Timed mock · ' + mockMinutes(activeUnit()) + ' min</span>' +
        '<span class="a3-mockpanel-t">Sit a full paper</span>' +
        '<span class="a3-mockpanel-m">' + MOCK_LEN +
          ' questions drawn to the exam weighting. Nothing is revealed until the end.</span>' +
      '</span>' +
      (mrec.mocks
        ? '<span class="a3-mockpanel-best"><b>' + mrec.mockBest + '%</b>' +
          '<span>best of ' + mrec.mocks + '</span></span>'
        : '<span class="a3-mockpanel-go" aria-hidden="true">→</span>') +
      '</button>';

    if (missed.length) {
      h += '<button class="a3-alert" data-a3="startpractice" data-lo="missed">' +
        '<span class="a3-alert-i" aria-hidden="true">!</span>' +
        '<span class="a3-alert-tx">' +
          '<span class="a3-alert-t">' + missed.length +
            (missed.length === 1 ? ' question you got wrong' : ' questions you got wrong') + '</span>' +
          '<span class="a3-alert-m">Served back most recent first, and cleared as you get them right.</span>' +
        '</span>' +
        '<span class="a3-alert-go" aria-hidden="true">→</span>' +
        '</button>';
    }

    h += '<button class="a3-mixed" data-a3="startpractice" data-lo="mix">' +
      '<span class="a3-mixed-t">Mixed practice</span>' +
      '<span class="a3-mixed-m">' + PRACTICE_LEN + ' questions from all outcomes, drawn to the exam weighting</span>' +
      '<span class="a3-mixed-go" aria-hidden="true">→</span>' +
      '</button>';

    h += renderPracticeSummary();

    /* NO SEPARATE LIST OF OUTCOMES. There was one — a grid of five cards under
       "Practise one outcome" — sitting directly beneath a summary that already
       listed the same five outcomes with the reader's record against each. Two
       lists of the same thing, one telling you how you are doing and the other
       letting you act on it.

       The summary's rows are the way in now. A row carries the record and the
       invitation together, which is what a reader wants from it anyway: the
       outcome you are worst at is the one you want to open. */

    h += '<footer class="a3-foot">Independent study tool. Not affiliated with, endorsed by, or officially associated with AAT.</footer>';
    return h + '</div></div>';
  }

  /* ── Practice quiz — same question renderer as a lesson check ────────────── */
  function renderQuiz() {
    var qs = currentQuestions();
    if (!qs.length) { S.screen = 'practice'; return renderPractice(); }
    var pct = Math.round((S.qIdx / qs.length) * 100);
    var h = '<div class="a3-root a3-reading' + fresh() + '">';
    var left = isMock() ? mockLeft() : 0;
    h += '<div class="a3-lessonbar' + (isMock() ? ' a3-lessonbar-mock' : '') + '">' +
      '<button class="a3-ctx-back" data-a3="exit" aria-label="Leave">' +
        '<span aria-hidden="true">←</span></button>' +
      '<div class="a3-lessonbar-tx">' +
        '<div class="a3-lessonbar-t">' + (isMock() ? 'Timed mock' : 'Practice') + '</div>' +
        '<div class="a3-lessonbar-m">Question ' + (S.qIdx + 1) + ' of ' + qs.length +
          (isMock() ? '' : ' · ' + practiceLabel()) + '</div>' +
      '</div>' +
      (isMock()
        ? '<div class="a3-mockclock' + (left < 5 * 60000 ? ' is-low' : '') + '" role="timer" aria-live="off">' +
            clock(left) + '</div>'
        : '<div class="a3-lessonbar-n">' + pct + '%</div>') +
      '</div>' +
      '<div class="a3-lessonbar-p"><span style="width:' + pct + '%"></span></div>';
    h += '<article class="a3-sheet' + fresh() + '">' + questionHtml(qs[S.qIdx], qs.length) + '</article></div>';
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

  /* ── Animate on MOVEMENT, not on every repaint ─────────────────────────────
     The screen and the card each carried an entrance animation — a 320ms fade
     and rise — applied unconditionally. Every render replaces the whole DOM, and
     a render happens on every click: picking an option, choosing a pill,
     revealing a step, typing into a task and then choosing a pill again. So the
     page re-performed its entrance each time the reader touched anything, which
     is the single loudest way an interface can feel cheap.

     `posKey()` already knew the difference — it is what decides whether to
     restore the scroll position — so the same answer now decides whether
     anything animates. Computed BEFORE the paint, because the class has to be
     in the markup that is about to be written. */
  var _fresh = true;
  function mount(el) {
    /* A mock's clock is an interval, and suspend() stops it when the reader
       switches subject — otherwise it goes on ticking towards a finish() that
       would paint a Level 3 result over whatever subject is on screen.
       Coming back has to pick it up again, and has to notice that the paper
       may have run out while it was away: mockEndsAt is an absolute time, so
       the clock does not pause just because nothing was watching it. */
    if (isMock() && S.screen === 'quiz') {
      if (mockLeft() <= 0) { stopMockClock(); S.mockOver = true; finish(); }
      else if (!_mockTimer) startMockClock();
    }
    var k = posKey();
    _fresh = k !== _lastPos;
    el.innerHTML = html();
    wire(el);
    if (_fresh) {
      _lastPos = k;
      restoreScroll(el);
    }
  }
  function fresh() { return _fresh ? ' is-fresh' : ''; }
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
  function drawWeighted(unitKey, n, tasksFirst) {
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
      var p = shuffle(bank.filter(function (q) { return q.lo === s.n; }));
      /* A stable partition rather than a sort: the two halves stay shuffled
         within themselves, so a mock does not serve the same tasks in the same
         order every time it is sat. */
      if (tasksFirst) {
        p = p.filter(function (q) { return q.type === 'task'; })
             .concat(p.filter(function (q) { return q.type !== 'task'; }));
      }
      pools[s.n] = p;
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

  /* ── The timed mock ────────────────────────────────────────────────────────
     Everything a practice run is not. It runs to the clock the assessment
     actually allows, draws to the assessment's own weighting, reveals nothing
     until it is over, and reports by outcome at the end.

     WHY NO FEEDBACK UNTIL THE END. A practice run tells you immediately, which
     is right for learning and useless for rehearsal: knowing after every
     question how you are doing is exactly what the exam withholds, and it is
     the part readers find hardest. Answers can still be changed until the
     reader moves on — a pick is a pick, not a commitment — which is how the
     real computer-based assessment behaves.

     TASKS FIRST WITHIN EACH OUTCOME. Multi-part tasks are the shape the
     assessment is built from, and drawn at random they would be a twentieth of
     the paper. Taking them first inside each outcome's allocation gets every
     one of them onto a mock without disturbing the weighting by a single seat.

     LENGTH. The assessment's own duration, and enough questions that a reader
     has to pace themselves; a mock that can be finished in twenty minutes
     rehearses nothing about the ninety. */
  var MOCK_LEN = 24;

  function mockMinutes(unitKey) {
    var u = unitMeta(unitKey);
    return (u && u.assessment && u.assessment.durationMinutes) || 90;
  }

  function startMock() {
    S.practiceUnit = activeUnit();
    S.practiceLo = 'mock';
    S.practiceQs = drawWeighted(S.practiceUnit, MOCK_LEN, true);
    S.practiceMissed = [];
    S.mockResults = [];
    S.mockOver = false;
    S.mockEndsAt = Date.now() + mockMinutes(S.practiceUnit) * 60000;
    S.mode = 'mock';
    S.screen = 'quiz';
    S.qIdx = 0; S.score = 0;
    resetQState();
    startMockClock();
  }

  function isMock() { return S.mode === 'mock'; }

  /* THE CLOCK WRITES TO ONE TEXT NODE, and does not repaint.
     A once-a-second rerender would rebuild every input on the screen, which
     takes the caret out of whatever figure the reader is halfway through
     typing — and a task has six boxes to type into. So the tick reaches for the
     clock element and sets its text; the only repaint is the one at the end,
     when time runs out and there is nothing left to type into anyway.

     `querySelector` is guarded because the build checks drive the player
     through a stand-in element that has none: there the clock simply does not
     tick, which is correct — those runs are not against a wall clock. */
  var _mockTimer = null;
  function stopMockClock() {
    if (_mockTimer && typeof clearInterval === 'function') clearInterval(_mockTimer);
    _mockTimer = null;
  }
  function startMockClock() {
    stopMockClock();
    if (typeof setInterval !== 'function') return;
    _mockTimer = setInterval(function () {
      if (!isMock() || S.screen !== 'quiz') { stopMockClock(); return; }
      if (mockLeft() <= 0) {
        stopMockClock();
        S.mockOver = true;
        finish();
        return rerender();
      }
      var el = _host && _host.querySelector && _host.querySelector('.a3-mockclock');
      if (!el) return;
      el.textContent = clock(mockLeft());
      if (mockLeft() < 5 * 60000 && el.classList) el.classList.add('is-low');
    }, 1000);
  }
  function mockLeft() { return Math.max(0, S.mockEndsAt - Date.now()); }
  /* Hours once there is more than one. A ninety-minute paper opening at "89:59"
     is readable but wrong-looking — nobody thinks of an exam as eighty-nine
     minutes — and "1:29:59" says what the reader is being given. */
  function clock(ms) {
    var t = Math.floor(ms / 1000);
    var h = Math.floor(t / 3600), m = Math.floor(t / 60) % 60, sec = t % 60;
    var mm = h ? (m < 10 ? '0' + m : String(m)) : String(Math.floor(t / 60));
    return (h ? h + ':' : '') + mm + ':' + (sec < 10 ? '0' : '') + sec;
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
  /* Marking one answer, for every question type, in one place.

     Each of the five grading handlers used to carry its own comparison. That
     was survivable while grading happened in exactly one situation; the timed
     mock grades in a second one — silently, when the reader moves on — and two
     copies of "is this right" drift apart the first time a type is added or a
     tolerance is changed. The handlers keep their own guards about WHEN to
     grade, which differ; what is right is decided here. */
  function gradeAnswer(q) {
    var t = (q && q.type) || 'mcq';
    if (t === 'mcq') return S.picked === q.ans;
    if (t === 'truefalse') {
      return (q.statements || []).every(function (st, i) { return S.tfPicks[i] === st.answer; });
    }
    if (t === 'gapfill') {
      return (q.gaps || []).every(function (g, i) { return S.gapPicks[i] === g.answer; });
    }
    if (t === 'numeric') {
      var g = num(S.numInput);
      return g !== null && Math.abs(g - q.answer) < 0.005;
    }
    if (t === 'task') {
      S.taskResults = (q.parts || []).map(partCorrect);
      return S.taskResults.length > 0 && S.taskResults.every(Boolean);
    }
    return false;
  }

  function finish() {
    var checks = currentQuestions();
    var pct = checks.length ? Math.round((S.score / checks.length) * 100) : 100;
    /* Practice earns XP but records no lesson result. A practice run is not a
       lesson attempt, and letting it write to data.lessons would mark nodes
       complete on the path for teaching the reader has never opened. */
    /* THREE MODES, TESTED BY NAME. This was `mode !== 'practice'`, which meant
       "a lesson" for as long as there were two modes; a mock reaching it would
       have written a lesson result under a null lesson id. A new mode must not
       be able to fall into the lesson branch by default. */
    if (S.mode === 'lesson') {
      var prev = rec(S.lessonId);
      data.lessons[S.lessonId] = { best: Math.max(pct, prev ? prev.best : 0) };
      data.xp += S.score * 5 + (pct >= 60 ? 20 : 0);
    } else if (S.mode === 'mock') {
      var mrec = practiceRec(S.practiceUnit || activeUnit());
      mrec.mocks = (mrec.mocks || 0) + 1;
      /* Best mock, as a percentage. Monotonic, so it merges between devices by
         the same MAX rule as everything else in this record. */
      mrec.mockBest = Math.max(mrec.mockBest || 0, pct);
      data.xp += S.score * 4;
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
    if (act === 'exit') {
      /* Walking out of a mock stops its clock; leaving it running would fire a
         finish() over whatever screen the reader had moved on to. */
      if (isMock()) { stopMockClock(); S.mode = 'practice'; S.screen = 'practice'; return rerender(); }
      S.screen = S.mode === 'practice' ? 'practice' : 'path';
      return rerender();
    }
    if (act === 'retry') {
      /* Named modes again. `else startLesson(S.lessonId)` meant "a lesson" only
         while there were two modes; a mock falling into it would have reopened
         a null lesson. The mock's done screen offers no Retry — sitting another
         is starting a new paper, not repeating this one — but the handler must
         still be safe if one is ever reached. */
      if (S.mode === 'mock') startMock();
      else if (S.mode === 'practice') startPractice(S.practiceLo);
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
    if (act === 'fold') {
      var fo = n.getAttribute('data-o');
      S.shut[fo] = !S.shut[fo];
      return rerender();
    }
    /* Jumping to an outcome unfolds it first: scrolling to a section that is
       shut lands the reader on a header with nothing under it. */
    if (act === 'jump') {
      var jo = n.getAttribute('data-o');
      if (S.shut[jo]) { S.shut[jo] = false; rerender(); }
      var target = _host && _host.querySelector && _host.querySelector('#a3-oc-' + jo);
      if (target && target.scrollIntoView) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    if (act === 'startmock') { startMock(); return rerender(); }
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
      /* Under exam conditions a pick is a pick, not a commitment: it can be
         changed until the reader moves on, and nothing is revealed. Everywhere
         else, choosing IS answering. */
      if (isMock()) return rerender();
      S.answered = gradeAnswer(q);
      if (S.answered) S.score++;
      return rerender();
    }
    if (act === 'tf') {
      S.tfPicks[+n.getAttribute('data-s')] = n.getAttribute('data-v') === 'true';
      return rerender();
    }
    if (act === 'tfsubmit') {
      if (Object.keys(S.tfPicks).length < q.statements.length) return;
      S.answered = gradeAnswer(q); if (S.answered) S.score++;
      return rerender();
    }
    if (act === 'gap') {
      S.gapPicks[+n.getAttribute('data-g')] = +n.getAttribute('data-o');
      return rerender();
    }
    if (act === 'gapsubmit') {
      if (Object.keys(S.gapPicks).length < q.gaps.length) return;
      S.answered = gradeAnswer(q); if (S.answered) S.score++;
      return rerender();
    }
    if (act === 'numsubmit') {
      S.answered = gradeAnswer(q);
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
      S.answered = gradeAnswer(q);
      if (S.answered) S.score++;
      return rerender();
    }
    /* Moving on IS answering, under exam conditions. The question is graded
       here, silently, and the reader is told nothing until the paper is over —
       so this carries the same recording the practice path does, plus the
       per-question result the report is built from. A question left blank
       grades as wrong, which is what the assessment does with it. */
    if (act === 'mocknext') {
      var mCorrect = gradeAnswer(q);
      if (mCorrect) S.score++; else S.practiceMissed.push(q);
      S.mockResults.push({ id: q.id, lo: q.lo, correct: mCorrect });
      recordPractice(S.practiceUnit || activeUnit(), q.lo, mCorrect);
      recordQuestion(S.practiceUnit || activeUnit(), q.id, mCorrect);
      save();
      if (S.qIdx === checks.length - 1) { stopMockClock(); finish(); }
      else { S.qIdx++; resetQState(); }
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
      stopMockClock();
      S.screen = screen || 'units';
      if (unitKey) S.unit = unitKey;
    },
    /* ── The two lifecycle hooks the shared chrome calls ──────────────────────
       app.js owns the header and knows nothing about `S`; these are how it
       asks. Both are no-ops on any subject that does not define them, so the
       chrome does not need to know which subjects render themselves.

       `home` is the header's 🏠 button. Without it that button sets a screen
       this module does not read and render() remounts whatever was already
       there — so it did nothing at all from inside a lesson, a practice run or
       a mock.

       `suspend` is "you are being switched away from". The mock's clock is an
       interval that outlives the screen: it stops itself when the mode or the
       screen changes, and switching subject changes neither, so it kept
       ticking under French and would have painted a Level 3 result over it
       ninety minutes later. */
    home: function () {
      stopMockClock();
      S.mode = 'lesson';
      S.lessonId = null;
      /* The top of this subject: the unit picker where there is a choice to
         make, and the path where there is only one unit to pick. */
      S.screen = unitKeys().length > 1 ? 'units' : 'path';
    },
    suspend: function () { stopMockClock(); },
    /* Exposed so scripts/check-aat3-practice-summary.js can assert the totals
       and the most-mistakes ranking directly, rather than reading them back out
       of rendered HTML. */
    practiceSummary: practiceSummary,
  };
}(typeof self !== 'undefined' ? self : this));
