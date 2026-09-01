/* AAT Level 1 — self-contained UI.
 *
 * Owns the whole Level 1 experience: its own ladder, its own lesson player, its
 * own state, its own storage key. app.js delegates to it and takes no further
 * part, exactly as it does for Level 3.
 *
 * WHY NOT REUSE THE LEVEL 3 RENDERER
 *
 * It would have been quicker, and it would have been wrong twice over.
 *
 * The first reason is design. Level 3's track is a winding two-column path with
 * an editorial, serif reading surface — a good fit for a reader who already
 * knows what a VAT return is and wants the material to feel like a step up.
 * A Level 1 student has never seen a ledger. What they need is not atmosphere
 * but an unmistakable next thing to do, so this renders a NUMBERED LADDER: one
 * full-width rung per lesson, on a single rail, numbered 1..n, with one primary
 * button at the top that opens the next unfinished step. Nobody should have to
 * work out where to start.
 *
 * The second reason is vocabulary. Level 1 is overwhelmingly about documents —
 * invoices, credit notes, daybooks, cash books, bank statements — and about
 * meeting perhaps sixty pieces of jargon for the first time. So this player
 * adds two card elements Level 3 has no use for (`doc`, which draws a document
 * facsimile, and `terms`, which sets out key terms as a glossary strip) and two
 * question types (`match` and `ordering`) that suit recognition and sequence
 * work far better than a four-option multiple choice does.
 *
 * Sharing a renderer would have meant either bending Level 3's to fit, or
 * shipping a Level 1 that teaches documents without ever showing one.
 *
 * Progress lives under its own key, so nothing here can disturb Level 2 or 3.
 */
(function (root) {
  'use strict';

  var STORE_KEY = 'prep_v2_aat1';

  /* ── State ───────────────────────────────────────────────────────────────── */
  var S = {
    screen: 'path',      // 'path' | 'lesson' | 'practice' | 'quiz' | 'done' | 'review'
    mode: 'lesson',      // 'lesson' | 'practice' | 'mock' | 'review' — which set the answer handlers read
    practiceLo: null,    // an outcome number, or 'mix', or 'missed'
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
    matchPicks: {},      // left index → right index
    matchSel: null,      // left index currently selected, awaiting a right click
    orderSeq: null,      // working order, as indices into q.items
    numInput: '',
    plPicks: {},          // picklist: row index -> chosen option
    _plOrder: null,       // picklist: the shuffled row order the reader is shown
    egCells: {},          // entrygrid: 'row:col' -> what the reader typed
    calcCell: null,       // entrygrid: which cell "Use this value" fills
    /* Ordering is the one question type whose working state is created by the
       renderer rather than by the reader: `orderSeq` is dealt as a shuffle the
       moment the question is drawn. So "did they answer it" cannot be read off
       the picks the way it can everywhere else, and under exam conditions a
       question nobody touched would otherwise be reported as an attempt. This
       is the only honest answer to that, and it is set by the move handlers. */
    orderMoved: false,
    mockEndsAt: 0,       // timed mock: when the clock runs out
    mockResults: [],     // timed mock: one record per question answered, for the report and the review
    /* ── Endless practice ──────────────────────────────────────────────────
       A run with no last question. `practiceQs` is topped up as the reader
       nears the end of it, so the question screen never has to know the run
       is unbounded. What changes is what progress MEANS: with no end there is
       no percentage-through, so the bar becomes a streak — the only measure
       of position an endless run can honestly offer. */
    endlessSeen: null,   // ids already served this run, so a top-up cannot repeat one
    streak: 0,           // consecutive right answers, now
    bestStreak: 0,       // the longest run of them this session
    /* A mock's exit is guarded, because walking out of a timed paper cannot be
       undone: the clock stops, the paper is never graded and there is no
       result and no review. Held in state rather than opened as a native
       confirm() so it can be styled, read by a screen reader and — the part a
       native dialog cannot do — survive the repaint the clock fires every
       second underneath it. */
    confirmExit: false,
    mockOver: false,     // timed mock: the clock ran out rather than the reader finishing
    /* Reviewing the paper just sat. `reviewIdx` is which question is open, or
       null for the list of them; `reviewLast` is the one to scroll back to on
       returning to that list. */
    reviewIdx: null,
    reviewLast: null,
    reviewWrongOnly: false,
    /* Which outcome sections are folded shut on the ladder. Session-only on
       purpose: folding is a momentary act of tidying, not progress, and storing
       it would mean a reader who collapsed everything once came back weeks
       later to a course that looked empty. */
    shut: {},
    score: 0,
    revealed: 0,         // worked-example steps shown
    tryInput: '',
    tryResult: null,
    scrollToNext: false,  // the next repaint should bring the advance button into view
    calcOpen: false,      // the on-screen calculator sheet is showing
  };

  /* `practice` is the lifetime record of practice and mock runs.

     FLAT, NOT NESTED PER UNIT. Level 3's equivalent buckets by unit because it
     teaches two of them and outcome numbers restart at 1 in each, so one flat
     map would add FAPS Outcome 1 to TPFB Outcome 1. Level 1 is a single-unit
     qualification — BKFN is the whole award — so there is no second set of
     outcome numbers to collide with, and a nesting level that can only ever
     hold one key is a level of indirection bought with nothing.

     PER OUTCOME AND NOT A TOTAL. Progress backup merges two devices by taking
     the larger of each number (see progress-backup.js), so a stored grand total
     would be wrong the moment the two devices practised different outcomes:
     max(10, 8) is 10 where the truth is 18. Per-outcome counters merge
     correctly under that rule, and the totals are derived from them, so there
     is only ever one source of truth. `correct` rather than `wrong` is stored
     for the same reason — both rise, but only the pair (attempted, correct)
     survives a max-merge without ever implying a negative count. */
  var data = { lessons: {}, xp: 0, practice: { runs: 0, mocks: 0, mockBest: 0, los: {}, qs: {} } };

  function n0(v) { return typeof v === 'number' && isFinite(v) && v > 0 ? v : 0; }

  /* EVERY FIELD IS NAMED HERE, and that is the trap in this function: it
     REBUILDS the record rather than copying it, so a field added anywhere else
     and not added here is written on the way out and silently gone on the way
     back in. That exact mistake cost Level 3 its `mockBest`, which survived
     until the page was reloaded. */
  function normalisePractice(p) {
    p = p || {};
    return {
      runs: n0(p.runs),
      mocks: n0(p.mocks),
      mockBest: n0(p.mockBest),
      los: (p.los && typeof p.los === 'object') ? p.los : {},
      qs: (p.qs && typeof p.qs === 'object') ? p.qs : {},
    };
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

  /* One outcome's running tally. Created on demand so an outcome nobody has
     practised takes no room in the store and merges as an absence. */
  function recordPractice(lo, correct) {
    if (lo === undefined || lo === null) return;
    var los = data.practice.los;
    var r = los[lo] || (los[lo] = { attempted: 0, correct: 0 });
    r.attempted++;
    if (correct) r.correct++;
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
  function recordQuestion(qId, correct) {
    if (!qId) return;
    var qs = data.practice.qs;
    var r = qs[qId] || (qs[qId] = {});
    if (correct) r.r = Date.now(); else r.w = Date.now();
  }
  function isOutstanding(r) {
    return !!(r && n0(r.w) > n0(r.r));
  }
  /* The questions still outstanding, most recently missed first, and only those
     still in the bank — a question that has been rewritten or removed since it
     was missed is not a question anyone can be asked again. */
  function missedQuestions() {
    var qs = data.practice.qs;
    var byId = {};
    practiceBank().forEach(function (q) { if (q.id) byId[q.id] = q; });
    return Object.keys(qs)
      .filter(function (id) { return byId[id] && isOutstanding(qs[id]); })
      .sort(function (a, b) { return n0(qs[b].w) - n0(qs[a].w); })
      .map(function (id) { return byId[id]; });
  }
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(data)); } catch (e) {}
    /* Level 1 persists on its own, so it announces its own writes — otherwise a
       lesson finished here sits unsynced until something else happens to save. */
    if (root.ProgressSync) root.ProgressSync.noteLocalChange();
  }

  /* ── Data access ─────────────────────────────────────────────────────────── */
  function path() { return root.AAT1_LEARN_PATH || []; }
  function practiceBank() {
    var p = root.AAT1_PRACTICE;
    return (p && p.QUESTIONS) || [];
  }
  function syllabus() { return root.AAT1_SYLLABUS || null; }
  function unit() {
    var s = syllabus();
    return (s && s.units && s.units.bkfn) || null;
  }

  /* The single place that decides which question set the answer handlers act
     on. Everything downstream is identical for a lesson check and a practice
     question, so this accessor is all that separates the two modes. */
  /* THE THREE DRAWN MODES ARE LISTED BY NAME, not inferred from "not a
     lesson". A mode added later must not be able to fall into either branch by
     default: the lesson branch reads a lesson that may not exist, and the drawn
     branch reads a pool that may not have been drawn. */
  function currentQuestions() {
    if (S.mode === 'practice' || S.mode === 'mock' || S.mode === 'review') return S.practiceQs;
    var l = lessonById(S.lessonId);
    return (l && l.check) || [];
  }

  /* The card the lesson screen is showing, or null off that screen. Named
     alongside `currentQuestions()` because it is the same kind of accessor:
     the one place that turns state into the thing being rendered. */
  function currentCard() {
    var l = lessonById(S.lessonId);
    return (l && l.cards && l.cards[S.cardIdx]) || null;
  }

  function lessons() {
    var out = [];
    path().forEach(function (g) { (g.lessons || []).forEach(function (l) { out.push(l); }); });
    return out;
  }
  /* A cheat sheet is not a step on the ladder. It claims no assessment
     criteria, carries no questions, teaches nothing the outcome has not already
     taught, and cannot be completed — so it stays off `lessons()`, which is
     what feeds the step numbering, the progress count and the coverage check.
     It is normalised here into the shape the lesson screen already paints.

     `card` is singular on purpose: a cheat sheet that could grow a second card
     is a lesson with the questions left off. */
  function sheetOf(g) {
    if (!g || !g.cheatsheet || !g.cheatsheet.card) return null;
    var cs = g.cheatsheet;
    return {
      id: cs.id,
      title: cs.title || 'Cheat sheet',
      criteria: [],
      cards: [cs.card],
      check: [],
      isSheet: true,
    };
  }
  function sheets() {
    var out = [];
    path().forEach(function (g) { var sh = sheetOf(g); if (sh) out.push(sh); });
    return out;
  }
  function lessonById(id) {
    var all = lessons();
    for (var i = 0; i < all.length; i++) if (all[i].id === id) return all[i];
    var sh = sheets();
    for (var j = 0; j < sh.length; j++) if (sh[j].id === id) return sh[j];
    return null;
  }
  /* Ladder position, 1-based and continuous across outcomes — the number the
     reader sees on the rung and in the lesson bar. */
  function stepNo(id) {
    var all = lessons();
    for (var i = 0; i < all.length; i++) if (all[i].id === id) return i + 1;
    return 0;
  }
  function rec(id) { return data.lessons[id] || null; }
  function isDone(id) { var r = rec(id); return !!(r && r.best >= 60); }
  function stars(id) {
    var r = rec(id); if (!r) return 0;
    if (r.best >= 100) return 3; if (r.best >= 80) return 2; if (r.best >= 60) return 1; return 0;
  }
  /* The first lesson not yet passed — what the hero button opens. */
  function nextLesson() {
    var all = lessons();
    for (var i = 0; i < all.length; i++) if (!isDone(all[i].id)) return all[i];
    return all[all.length - 1] || null;
  }

  /* A rung's kind drives its label and its rail mark. Level 1 splits teaching
     lessons from the ones that ask the reader to produce a document or a
     figure, because the second kind is where the 'do' scope items live and a
     student planning revision time needs to see which is which. */
  function kindOf(l) {
    if (l.kind) return l.kind;
    var hasWorked = (l.cards || []).some(function (c) { return c.worked; });
    var hasDoc = (l.cards || []).some(function (c) { return c.doc; });
    if (hasWorked) return 'practical';
    if (hasDoc) return 'document';
    return 'theory';
  }
  var KIND_META = {
    theory:    { label: 'Theory',    glyph: '●' },
    document:  { label: 'Documents', glyph: '▤' },
    practical: { label: 'Practical', glyph: '✎' },
    sheet:     { label: 'Cheat sheet', glyph: '🗂️' },
  };

  function coverage() {
    var u = unit();
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
          var tag = 'BKFN-' + c.id;
          if (claimed[tag]) covered++;
          if (doneClaimed[tag]) done++;
        });
      });
    });
    return { total: total, covered: covered, studied: done };
  }

  /* ── Small helpers ───────────────────────────────────────────────────────── */
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  /* **bold**, *italic* and `key term`, on already-escaped text. The backtick
     form is Level 1's own: the unit's real difficulty is vocabulary, so a term
     being introduced is marked where it appears rather than only collected in a
     glossary the reader has to go and find. */
  function md(s) {
    return esc(s)
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<span class="a1-term">$1</span>')
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

  /* THE PICK LIST AS THE READER SEES IT. Its rows are shuffled for the same
     reason a true/false grid's statements are, a few lines into the renderer
     below: a reader sitting the paper twice must not be able to answer row 3
     without reading it. Every row carries its own answer, so reordering them is
     safe — but the RENDERER and the GRADER have to agree on the order, which is
     why both go through here rather than each reaching for `q.picklist`.

     An entry grid is deliberately not shuffled: its rows are one entry read in
     order, and a day book ends with a totals row that would stop being the
     total of the rows above it. */
  function shownPicklist(q) {
    if (!q || q.type !== 'picklist' || !q.picklist) return q;
    var rows = q.picklist.rows || [];
    if (!S._plOrder || S._plOrder.length !== rows.length) {
      S._plOrder = shuffle(rows.map(function (_, i) { return i; }));
    }
    var out = {}, k;
    for (k in q) { if (Object.prototype.hasOwnProperty.call(q, k)) out[k] = q[k]; }
    var pl = {};
    for (k in q.picklist) { if (Object.prototype.hasOwnProperty.call(q.picklist, k)) pl[k] = q.picklist[k]; }
    pl.rows = S._plOrder.map(function (i) { return rows[i]; });
    out.picklist = pl;
    return out;
  }
  function idxArray(n) { var a = []; for (var i = 0; i < n; i++) a.push(i); return a; }

  /* ── Card rendering ──────────────────────────────────────────────────────── */
  function cardHtml(c) {
    var h = '';
    if (c.h) h += '<h2 class="a1-card-h">' + esc(c.h) + '</h2>';
    if (c.p) {
      var ps = Array.isArray(c.p) ? c.p : [c.p];
      h += ps.map(function (t) { return '<p class="a1-p">' + md(t) + '</p>'; }).join('');
    }

    /* Key terms. The specification's own delivery guidance asks tutors to have
       students build a list of key terms and define them in their own words;
       this is that list, made part of the teaching rather than an appendix. */
    if (c.terms) {
      h += '<div class="a1-terms"><div class="a1-terms-h">Key terms</div><dl>' +
        c.terms.map(function (t) {
          return '<div class="a1-term-row"><dt>' + esc(t.t) + '</dt><dd>' + md(t.d) + '</dd></div>';
        }).join('') + '</dl></div>';
    }

    if (c.formula) {
      h += '<div class="a1-formula">' + String(c.formula).split('·').map(function (f) {
        return '<span>' + md(f.trim()) + '</span>';
      }).join('') + '</div>';
    }

    if (c.split) {
      h += '<div class="a1-split">' +
        ['left', 'right'].map(function (side) {
          var s = c.split[side]; if (!s) return '';
          return '<div class="a1-split-col a1-split-' + side + '"><h4>' + esc(s.title || '') + '</h4><ul>' +
            (s.items || []).map(function (i) { return '<li>' + md(i) + '</li>'; }).join('') +
            '</ul></div>';
        }).join('') + '</div>';
    }

    if (c.table) {
      h += '<div class="a1-tablewrap"><table class="a1-table">';
      if (c.table.headers) {
        h += '<thead><tr>' + c.table.headers.map(function (x) { return '<th>' + md(x) + '</th>'; }).join('') + '</tr></thead>';
      }
      /* Each cell carries its column heading. Nothing shows it on a wide
         screen — the header row is right there — but on a narrow one the table
         stops being a grid and becomes a list of labelled facts, and then the
         label has to come from somewhere. See .a1-cheat .a1-table in the
         stylesheet. */
      var heads = c.table.headers || [];
      h += '<tbody>' + (c.table.rows || []).map(function (r) {
        return '<tr>' + r.map(function (x, i) {
          var head = heads[i] ? ' data-h="' + esc(String(heads[i]).replace(/\*\*/g, '')) + '"' : '';
          return '<td' + (i ? '' : ' class="a1-td-lead"') + head + '>' + md(x) + '</td>';
        }).join('') + '</tr>';
      }).join('') + '</tbody></table></div>';
      if (c.table.caption) h += '<div class="a1-cap">' + md(c.table.caption) + '</div>';
    }

    /* A block of figures with a title — a small ledger-ish exhibit, where the
       first row acts as the header. Distinct from `table`, which is for
       explanatory content rather than for numbers being demonstrated. */
    if (c.example) {
      h += '<div class="a1-example">';
      if (c.example.title) h += '<div class="a1-example-t">' + md(c.example.title) + '</div>';
      h += '<div class="a1-tablewrap"><table class="a1-table a1-table-plain"><tbody>' +
        (c.example.rows || []).map(function (r, i) {
          var tag = i === 0 ? 'th' : 'td';
          return '<tr>' + r.map(function (x, ci) {
            return '<' + tag + (ci ? ' class="a1-num"' : '') + '>' + md(x) + '</' + tag + '>';
          }).join('') + '</tr>';
        }).join('') + '</tbody></table></div></div>';
    }

    /* Document facsimile. Level 1 is a documents unit — three of its five
       outcomes turn on recognising or completing a piece of paper — so the
       material shows the paper rather than describing it. */
    if (c.doc) h += docHtml(c.doc);

    if (c.flow) {
      h += '<div class="a1-flow">' + c.flow.map(function (f, i) {
        return '<span class="a1-flow-step"><span class="a1-flow-n">' + (i + 1) + '</span>' + esc(f) + '</span>' +
          (i < c.flow.length - 1 ? '<span class="a1-flow-arrow" aria-hidden="true">→</span>' : '');
      }).join('') + '</div>';
    }

    if (c.callout) {
      h += '<div class="a1-callout a1-callout-' + esc(c.callout.kind || 'tip') + '">' +
        '<span class="a1-callout-i" aria-hidden="true">' +
          (c.callout.kind === 'warning' ? '!' : c.callout.kind === 'key' ? '★' : 'i') + '</span>' +
        '<span>' + md(c.callout.text) + '</span></div>';
    }

    /* What the specification puts OUT of scope. Naming it is not padding: at
       this level nearly every exclusion is the Level 2 treatment of the same
       topic, and a beginner who has read ahead needs telling that debits and
       credits are not required here rather than left to assume they missed
       something. */
    if (c.notyet) {
      h += '<div class="a1-notyet"><span class="a1-notyet-l">Not at this level</span><span>' + md(c.notyet) + '</span></div>';
    }

    if (c.examtrap) {
      h += '<div class="a1-trap"><span class="a1-trap-l">Watch out</span><span>' +
        md(typeof c.examtrap === 'string' ? c.examtrap : (c.examtrap.text || '')) + '</span></div>';
    }

    if (c.worked) h += workedHtml(c.worked);
    return h;
  }

  function docHtml(d) {
    var h = '<div class="a1-doc a1-doc-' + esc(d.kind || 'generic') + '">';
    h += '<div class="a1-doc-top"><span class="a1-doc-kind">' + esc(d.title || 'Document') + '</span>' +
      (d.tag ? '<span class="a1-doc-tag">' + esc(d.tag) + '</span>' : '') + '</div>';

    if (d.from || d.to) {
      h += '<div class="a1-doc-parties">' +
        ['from', 'to'].map(function (side) {
          var lines = d[side];
          if (!lines || !lines.length) return '';
          return '<div class="a1-doc-party"><div class="a1-doc-party-l">' +
            esc(side === 'from' ? (d.fromLabel || 'From') : (d.toLabel || 'To')) + '</div>' +
            lines.map(function (x) { return '<div>' + md(x) + '</div>'; }).join('') + '</div>';
        }).join('') + '</div>';
    }

    if (d.fields && d.fields.length) {
      h += '<div class="a1-doc-fields">' + d.fields.map(function (f) {
        return '<div class="a1-doc-field"><span class="a1-doc-field-l">' + esc(f[0]) + '</span>' +
          '<span class="a1-doc-field-v">' + md(f[1]) + '</span></div>';
      }).join('') + '</div>';
    }

    if (d.table) {
      h += '<div class="a1-tablewrap"><table class="a1-table a1-doc-table">';
      if (d.table.headers) {
        h += '<thead><tr>' + d.table.headers.map(function (x, i) {
          return '<th' + (i ? ' class="a1-num"' : '') + '>' + md(x) + '</th>';
        }).join('') + '</tr></thead>';
      }
      h += '<tbody>' + (d.table.rows || []).map(function (r) {
        return '<tr>' + r.map(function (x, i) {
          return '<td' + (i ? ' class="a1-num"' : '') + '>' + md(x) + '</td>';
        }).join('') + '</tr>';
      }).join('') + '</tbody></table></div>';
    }

    if (d.totals && d.totals.length) {
      h += '<div class="a1-doc-totals">' + d.totals.map(function (t, i) {
        var last = i === d.totals.length - 1;
        return '<div class="a1-doc-total' + (last ? ' is-final' : '') + '">' +
          '<span>' + md(t[0]) + '</span><span class="a1-num">' + md(t[1]) + '</span></div>';
      }).join('') + '</div>';
    }

    if (d.foot) h += '<div class="a1-doc-foot">' + md(d.foot) + '</div>';
    return h + '</div>';
  }

  function workedHtml(w) {
    var h = '<div class="a1-worked"><div class="a1-worked-head">' +
      '<span class="a1-worked-tag">Worked example</span>' +
      '<span class="a1-worked-title">' + esc(w.title || '') + '</span></div>';
    h += '<p class="a1-worked-problem">' + md(w.problem) + '</p>';
    var steps = w.steps || [];
    h += '<ol class="a1-steps">';
    for (var i = 0; i < steps.length; i++) {
      var shown = i < S.revealed;
      h += '<li class="a1-step' + (shown ? ' is-shown' : ' is-hidden') + '">' +
        '<span class="a1-step-n">' + (i + 1) + '</span><div>' +
        (shown ? '<div class="a1-step-do">' + md(steps[i].do) + '</div>' +
                 (steps[i].why ? '<div class="a1-step-why">' + md(steps[i].why) + '</div>' : '')
               : '<div class="a1-step-do a1-blur">Hidden until revealed</div>') +
        '</div></li>';
    }
    h += '</ol>';
    if (S.revealed < steps.length) {
      h += '<div class="a1-worked-actions">' +
        '<button class="a1-btn a1-btn-primary" data-a1="step">Reveal next step</button>' +
        '<button class="a1-btn a1-btn-ghost" data-a1="stepall">Show all</button></div>';
    } else {
      h += '<div class="a1-answer"><span>Answer</span><strong>' + md(w.answer) + '</strong></div>';
      if (w.tryIt) h += tryItHtml(w.tryIt);
    }
    return h + '</div>';
  }

  function tryItHtml(t) {
    var h = '<div class="a1-try"><div class="a1-try-head">Now you try</div>' +
      '<p class="a1-p">' + md(t.q) + '</p>';
    if (S.tryResult === null) {
      h += '<div class="a1-try-row">' +
        '<input class="a1-input" inputmode="decimal" data-a1="tryinput" value="' + esc(S.tryInput) + '" placeholder="' + esc(t.unit || '') + '" aria-label="Your answer">' +
        '<button class="a1-btn a1-btn-primary" data-a1="trycheck">Check</button></div>';
      if (t.hint) h += '<div class="a1-hint">Hint — ' + md(t.hint) + '</div>';
    } else {
      h += '<div class="a1-verdict ' + (S.tryResult ? 'is-right' : 'is-wrong') + '">' +
        (S.tryResult ? 'Correct' : 'Not quite — the answer is ' + esc(t.unit === '£' ? '£' + t.answer : t.answer)) + '</div>';
      if (t.exp) h += '<p class="a1-exp">' + md(t.exp) + '</p>';
    }
    return h + '</div>';
  }

  /* ── Path screen — the ladder ─────────────────────────────────────────────── */
  /* ── The context bar ────────────────────────────────────────────────────────
     What the hero was for, in a tenth of the height. The hero cost about
     1,100px on a phone and repeated the same four facts on every visit — after
     the first, a reader arriving to do step 12 read the course description
     again before they could reach it. */
  function ctxBar(opts) {
    var o = opts || {};
    var h = '<div class="a1-ctx">';
    if (o.back) {
      h += '<button class="a1-ctx-back" data-a1="' + o.back + '" aria-label="' +
        esc(o.backLabel || 'Back') + '"><span aria-hidden="true">←</span></button>';
    }
    h += '<div class="a1-ctx-main">' +
      '<div class="a1-ctx-unit">' + esc(o.title || '') + '</div>' +
      (o.meta ? '<div class="a1-ctx-meta">' + esc(o.meta) + '</div>' : '') +
      '</div>';
    if (typeof o.pct === 'number') {
      h += '<div class="a1-ctx-ring"><div class="a1-ring' + (o.pct >= 100 ? ' is-full' : '') +
        '" style="--p:' + o.pct + '" role="img" aria-label="' + o.pct + '% complete"></div></div>';
    }
    return h + '</div>';
  }

  function renderPath() {
    var groups = path();
    if (!groups.length) return '<div class="a1-empty">Level 1 content is still loading.</div>';
    var ls = lessons();
    var doneN = ls.filter(function (l) { return isDone(l.id); }).length;
    var pct = ls.length ? Math.round((doneN / ls.length) * 100) : 0;
    var u = unit();
    var nx = nextLesson();
    var bank = practiceBank();

    var h = '<div class="a1-root">';

    h += ctxBar({
      title: 'Bookkeeping Fundamentals',
      /* Just the step count. The assessment length and the guided hours were
         here too and pushed the line past the width of a phone; they are facts
         a reader needs once, and they are on the step-1 lesson that explains
         where the unit fits. */
      meta: doneN + ' of ' + ls.length + ' steps',
      pct: pct,
    });

    h += '<div class="a1-page">';

    /* ── The two things you came here to do ────────────────────────────────── */
    h += '<div class="a1-actions">';
    if (nx) {
      var ng = groupOf(nx);
      h += '<button class="a1-act a1-act-go" data-a1="open" data-id="' + esc(nx.id) + '">' +
        '<span class="a1-act-k">' + (doneN ? 'Continue' : 'Start here') + '</span>' +
        '<span class="a1-act-t">Step ' + stepNo(nx.id) + ' · ' + esc(nx.title) + '</span>' +
        '<span class="a1-act-m">' + (ng ? 'Outcome ' + ng.outcome + ' · ' : '') +
          (nx.cards || []).length + ' pages · ' + (nx.check || []).length + ' questions</span>' +
        '<span class="a1-act-go-i" aria-hidden="true">→</span>' +
        '</button>';
    } else {
      h += '<div class="a1-act a1-act-done">' +
        '<span class="a1-act-k">Every step finished</span>' +
        '<span class="a1-act-t">The course is complete</span>' +
        '<span class="a1-act-m">Practice is where the work is now.</span>' +
        '</div>';
    }
    if (bank.length) {
      h += '<button class="a1-act a1-act-alt" data-a1="practice">' +
        '<span class="a1-act-k">Practise</span>' +
        '<span class="a1-act-t">Mixed, or one outcome</span>' +
        '<span class="a1-act-m">' + bank.length + ' questions in the bank</span>' +
        '<span class="a1-act-go-i" aria-hidden="true">→</span>' +
        '</button>';
    }
    h += '</div>';

    /* ── The outcome index ─────────────────────────────────────────────────── */
    h += '<nav class="a1-index" aria-label="Jump to an outcome">';
    groups.forEach(function (g) {
      var gl = g.lessons || [];
      var gd = gl.filter(function (l) { return isDone(l.id); }).length;
      var state = (gl.length && gd === gl.length) ? ' is-done' : gd ? ' is-part' : '';
      h += '<button class="a1-index-c' + state + '" data-a1="jump" data-o="' + esc(g.outcome) + '"' +
        ' aria-label="Outcome ' + esc(g.outcome) + ', ' + esc(g.outcomeTitle) + '">' +
        '<span class="a1-index-n">' + esc(g.outcome) + '</span>' +
        '<span class="a1-index-w">' + gd + '/' + gl.length + '</span>' +
        '</button>';
    });
    h += '</nav>';

    /* ── The ladder, one foldable section per outcome ───────────────────────
       Step numbers stay continuous across outcomes: the ladder is one course of
       twenty-six, not five courses of five, and the number is what a reader
       uses to say where they got to. */
    var n = 0;
    groups.forEach(function (g) {
      var gl = g.lessons || [];
      var gd = gl.filter(function (l) { return isDone(l.id); }).length;
      var shut = !!S.shut[g.outcome];
      h += '<section class="a1-oc' + (shut ? ' is-shut' : '') + '" id="a1-oc-' + esc(g.outcome) + '">' +
        '<button class="a1-oc-h" data-a1="fold" data-o="' + esc(g.outcome) + '" aria-expanded="' + (!shut) + '">' +
          '<span class="a1-oc-n">' + esc(g.outcome) + '</span>' +
          '<span class="a1-oc-tx">' +
            '<span class="a1-oc-t">' + esc(g.outcomeTitle) + '</span>' +
            '<span class="a1-oc-m">' +
              (g.weighting ? g.weighting + '% of the assessment · ' : '') +
              gd + ' of ' + gl.length + ' done</span>' +
          '</span>' +
          '<span class="a1-oc-fold" aria-hidden="true">' + (shut ? '+' : '−') + '</span>' +
        '</button>';
      if (!shut) {
        if (g.blurb) h += '<p class="a1-oc-b">' + md(g.blurb) + '</p>';
        h += '<ol class="a1-ladder">';
        gl.forEach(function (l) { n++; h += rungHtml(l, n); });
        var sh = sheetOf(g);
        if (sh) h += rungHtml(sh, null);
        h += '</ol>';
      } else {
        /* The numbering has to keep running through a folded section, or
           reopening it would renumber the whole course. */
        n += gl.length;
      }
      h += '</section>';
    });

    h += soundRow();
    h += '<footer class="a1-foot">Independent study tool. Not affiliated with, endorsed by, or officially associated with AAT.</footer>';
    return h + '</div></div>';
  }

  /* The outcome group a lesson belongs to. */
  function groupOf(l) {
    var found = null;
    path().forEach(function (g) {
      (g.lessons || []).forEach(function (x) { if (x.id === l.id) found = g; });
    });
    return found;
  }

  function rungHtml(l, n) {
    var k = l.isSheet ? 'sheet' : kindOf(l);
    var meta = KIND_META[k];
    var done = !l.isSheet && isDone(l.id);
    var st = l.isSheet ? 0 : stars(l.id);
    /* TITLE FIRST, then a two-line summary, then one line of everything else.
       The kind chip used to have a row of its own above the title and the
       summary ran at full body size, so a rung was four blocks of text and
       about 350px tall — twenty-six of those is nine thousand pixels of ladder
       for a course of twenty-six steps. The summary is worth keeping at this
       level, where a reader genuinely does not know what "a cash book" is, but
       it is orientation rather than reading: two lines, clamped by the browser
       so nothing is cut mid-word. */
    return '<li class="a1-rung' + (done ? ' is-done' : '') + (l.isSheet ? ' a1-rung-sheet' : '') + '">' +
      '<div class="a1-rung-rail" aria-hidden="true"><span class="a1-rung-n">' +
        (l.isSheet ? '🗂️' : (done ? '✓' : n)) + '</span></div>' +
      '<button class="a1-rung-card" data-a1="open" data-id="' + esc(l.id) + '"' +
        ' aria-label="' + (l.isSheet ? '' : 'Step ' + n + ': ') + esc(l.title) + (done ? ', completed' : '') + '">' +
        '<span class="a1-rung-head">' +
          '<span class="a1-rung-title">' + esc(l.title) + '</span>' +
          (st ? '<span class="a1-stars" aria-label="' + st + ' of 3 stars">' +
            [1, 2, 3].map(function (x) { return '<span class="' + (x <= st ? 'on' : '') + '">★</span>'; }).join('') + '</span>' : '') +
        '</span>' +
        (l.summary ? '<span class="a1-rung-sum">' + esc(l.summary) + '</span>' : '') +
        '<span class="a1-rung-meta">' +
          '<span class="a1-rung-kind a1-kind-' + k + '">' + esc(meta.glyph) + ' ' + esc(meta.label) + '</span>' +
          (l.isSheet
            ? '<span>Everything in this outcome, on one page</span>'
            : '<span>' + (l.cards || []).length + ' pages · ' + (l.check || []).length + ' questions</span>') +
        '</span>' +
      '</button></li>';
  }

  /* ── Lesson screen ───────────────────────────────────────────────────────── */
  function renderLesson() {
    var l = lessonById(S.lessonId);
    if (!l) { S.screen = 'path'; return renderPath(); }
    var cards = l.cards || [], checks = l.check || [];
    var total = cards.length + checks.length;
    var pos = S.phase === 'teach' ? S.cardIdx : cards.length + S.qIdx;
    var pct = total ? Math.round((pos / total) * 100) : 0;

    var h = '<div class="a1-root a1-reading' + fresh() + '">';
    /* THE BAR NAMES THE LESSON, AND SAYS WHICH HALF OF IT YOU ARE IN. It was an
       Exit button, a title, a hairline bar and "1/9" — four signals, none of
       which admitted that a lesson has a reading half and a questions half. A
       reader who put the phone down partway through came back to a fraction. */
    h += '<div class="a1-lessonbar">' +
      '<button class="a1-ctx-back" data-a1="exit" aria-label="Back to the steps">' +
        '<span aria-hidden="true">←</span></button>' +
      '<div class="a1-lessonbar-mid">' +
        '<div class="a1-lessonbar-t">' + (l.isSheet ? '' : 'Step ' + stepNo(l.id) + ' · ') + esc(l.title) + '</div>' +
        '<div class="a1-lessonbar-m">' +
          (l.isSheet ? 'Cheat sheet'
            : S.phase === 'teach'
              ? 'Reading · page ' + (S.cardIdx + 1) + ' of ' + cards.length
              : 'Questions · ' + (S.qIdx + 1) + ' of ' + checks.length) +
        '</div>' +
      '</div>' +
      '<div class="a1-lessonbar-n">' + pct + '%</div></div>' +
      '<div class="a1-lessonbar-p"><span style="width:' + pct + '%"></span></div>';

    h += '<article class="a1-sheet' + (l.isSheet ? ' a1-cheat' : '') + fresh() + '">';
    if (S.phase === 'teach') {
      var c = cards[S.cardIdx] || {};
      h += cardHtml(c);
      var blocked = c.worked && S.revealed < (c.worked.steps || []).length;
      h += '<div class="a1-nav">' +
        (S.cardIdx > 0 ? '<button class="a1-btn a1-btn-ghost" data-a1="back">Back</button>' : '<span></span>') +
        (blocked ? '<span class="a1-nav-hint">Reveal the steps to continue</span>'
                 : '<button class="a1-btn a1-btn-primary" data-a1="next">' +
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

  /* ── Questions ───────────────────────────────────────────────────────────── */
  function questionHtml(q, n) {
    if (!q) return '';
    var t = q.type || 'mcq';
    /* THE COUNTER IS SUPPRESSED IN A REVIEW, and not for tidiness. It reads
       `S.qIdx`, which is where the reader got to in the RUN — and a review is
       not a run: it opens whichever question was tapped while qIdx still sits
       at the last question of the finished paper. So a review of question one
       carried a card headed "Question 30 of 30" directly beneath a bar reading
       "Question 1 of 30". The bar is the one that knows, and it is already
       saying it, so this line has nothing left to add. */
    /* "of n" is a lie in an endless run: n is the length of a set that tops
       itself up, so the total would climb as the reader worked — 3 of 12, then
       3 of 24. The position is still worth stating; the total is not there to
       be stated. */
    var h = (isReview() ? ''
              : '<div class="a1-qhead">Question ' + (S.qIdx + 1) +
                (isEndless() ? '' : ' of ' + n) + '</div>') +
            '<h2 class="a1-q">' + md(q.q) + '</h2>';
    if (q.intro) h += '<p class="a1-p a1-q-intro">' + md(q.intro) + '</p>';
    if (q.doc) h += docHtml(q.doc);
    if (q.table) {
      h += '<div class="a1-tablewrap"><table class="a1-table">' +
        (q.table.headers ? '<thead><tr>' + q.table.headers.map(function (x) { return '<th>' + md(x) + '</th>'; }).join('') + '</tr></thead>' : '') +
        '<tbody>' + (q.table.rows || []).map(function (r) {
          return '<tr>' + r.map(function (x) { return '<td>' + md(x) + '</td>'; }).join('') + '</tr>';
        }).join('') + '</tbody></table></div>';
    }

    if (t === 'mcq') {
      if (!S._order) S._order = shuffle(idxArray(q.opts.length));
      h += '<div class="a1-opts">' + S._order.map(function (oi, di) {
        var cls = '';
        if (S.answered !== null) {
          if (oi === q.ans) cls = ' is-right';
          else if (oi === S.picked) cls = ' is-wrong';
        /* CHOSEN, BUT NOT YET MARKED. Outside a mock, choosing IS answering, so
           this state lasted no longer than the click and nothing drew it. Under
           exam conditions a pick is a pick until the reader moves on — and with
           nothing to show for it, the reader taps, sees no change, and concludes
           the tap did not land. */
        } else if (oi === S.picked) { cls = ' on'; }
        return '<button class="a1-opt' + cls + '" data-a1="ans" data-i="' + oi + '"' +
          (S.answered !== null ? ' disabled' : '') + '>' +
          '<span class="a1-opt-k">' + String.fromCharCode(65 + di) + '</span>' +
          '<span>' + md(q.opts[oi]) + '</span></button>';
      }).join('') + '</div>';

    } else if (t === 'truefalse') {
      if (!S._order) S._order = shuffle(idxArray(q.statements.length));
      var labels = q.labels || ['True', 'False'];
      h += '<div class="a1-tf">' + S._order.map(function (si) {
        var st = q.statements[si];
        var picked = S.tfPicks[si];
        var right = S.answered !== null && picked === st.answer;
        return '<div class="a1-tf-row' + (S.answered !== null ? (right ? ' is-right' : ' is-wrong') : '') + '">' +
          '<span class="a1-tf-t">' + md(st.text) + '</span>' +
          '<span class="a1-tf-b">' +
            ['true', 'false'].map(function (v, vi) {
              var on = picked === (v === 'true');
              return '<button class="a1-pill' + (on ? ' on' : '') + '" data-a1="tf" data-s="' + si + '" data-v="' + v + '"' +
                (S.answered !== null ? ' disabled' : '') + '>' + esc(labels[vi]) + '</button>';
            }).join('') +
          '</span></div>';
      }).join('') + '</div>';
      if (S.answered === null && !isMock()) h += '<button class="a1-btn a1-btn-primary a1-wide" data-a1="tfsubmit">Submit</button>';

    } else if (t === 'numeric') {
      if (S.answered === null) {
        h += '<div class="a1-try-row' + (isMock() ? ' a1-try-row-mock' : '') + '">' +
          '<input class="a1-input" inputmode="decimal" data-a1="numinput" value="' + esc(S.numInput) + '" placeholder="' + esc(q.unit || '') + '" aria-label="Your answer">' +
          (isMock() ? '' : '<button class="a1-btn a1-btn-primary" data-a1="numsubmit">Check</button>') + '</div>';
      } else {
        h += '<div class="a1-verdict ' + (S.answered ? 'is-right' : 'is-wrong') + '">' +
          (S.answered ? 'Correct' : 'The answer is ' + esc(fmtAns(q))) + '</div>';
      }

    } else if (t === 'gapfill') {
      var parts = q.template.split(/(\{\d+\})/);
      h += '<div class="a1-gap">' + parts.map(function (p) {
        var m = /^\{(\d+)\}$/.exec(p);
        if (!m) return esc(p);
        var gi = +m[1], g = q.gaps[gi], sel = S.gapPicks[gi];
        return '<span class="a1-gapsel">' + g.options.map(function (o, oi) {
          var on = sel === oi;
          var cls = on ? ' on' : '';
          if (S.answered !== null && oi === g.answer) cls = ' is-right';
          else if (S.answered !== null && on) cls = ' is-wrong';
          return '<button class="a1-pill' + cls + '" data-a1="gap" data-g="' + gi + '" data-o="' + oi + '"' +
            (S.answered !== null ? ' disabled' : '') + '>' + esc(o) + '</button>';
        }).join('') + '</span>';
      }).join('') + '</div>';
      if (S.answered === null && !isMock()) h += '<button class="a1-btn a1-btn-primary a1-wide" data-a1="gapsubmit">Submit</button>';

    } else if (t === 'picklist' || t === 'entrygrid') {
      /* Both tables come from question-grid.js, themed with this module's
         prefix. The submit button and the verdict stay here: when a question
         becomes submittable, and what a wrong answer says, are this player's
         business and differ between the three levels. */
      var GR = root.AATGrid;
      if (GR) {
        h += t === 'picklist'
          ? GR.picklistHtml(shownPicklist(q), { prefix: 'a1', attr: 'data-a1', picks: S.plPicks, showAnswers: S.answered !== null })
          : GR.entryHtml(q, { prefix: 'a1', attr: 'data-a1', cells: S.egCells, showAnswers: S.answered !== null });
      }
      if (S.answered === null && !isMock()) {
        h += '<button class="a1-btn a1-btn-primary a1-wide" data-a1="' +
          (t === 'picklist' ? 'plsubmit' : 'egsubmit') + '">Submit</button>';
      } else if (S.answered !== null) {
        h += '<div class="a1-verdict ' + (S.answered ? 'is-right' : 'is-wrong') + '">' +
          (S.answered ? 'Correct' : 'Not quite — the right entries are shown above') + '</div>';
      }

    } else if (t === 'match') {
      /* Click a term, then click its partner. No HTML5 drag: it does not work
         on touch without a polyfill, and a beginner on a phone is exactly who
         this level is for.

         THE TWO GROUPS HAVE TO LOOK DIFFERENT. Below 620px the two columns
         stack, so what the reader sees is eight boxes in one vertical run with
         nothing to say where the things-to-match end and the things-to-match-
         AGAINST begin. Hence a heading on each column that says which step it
         is, an unfilled slot drawn as a dashed outline, and a colour carried by
         both halves of a pair so a completed pairing can be read at a glance
         rather than by comparing a "1" against a "1" eight rows apart. */
      if (!S._order) S._order = shuffle(idxArray(q.right.length));
      var answered = S.answered !== null;
      var pairedRights = {};
      Object.keys(S.matchPicks).forEach(function (k) { pairedRights[S.matchPicks[k]] = +k; });
      var pairedCount = Object.keys(S.matchPicks).length;
      var firstOpen = -1;
      for (var fi = 0; fi < q.left.length; fi++) {
        if (S.matchPicks[fi] === undefined) { firstOpen = fi; break; }
      }

      /* Instruction ABOVE the boxes. Below them it is read after the reader has
         already worked out what to do, or not at all. */
      if (!answered) {
        h += '<div class="a1-match-status">' +
          '<span class="a1-match-count">' + pairedCount + ' of ' + q.left.length + ' matched</span>' +
          '<span class="a1-match-say">' +
            (S.matchSel !== null ? 'Now tap its match in <strong>step 2</strong> below.'
              : 'Tap an item in <strong>step 1</strong>, then tap its match in <strong>step 2</strong>. A matched pair shares a colour.') +
          '</span></div>';
      }

      h += '<div class="a1-match">';
      h += '<div class="a1-match-col">' +
        '<div class="a1-match-head">' + (answered ? 'Items' : '<span class="a1-match-step">1</span> Tap an item') + '</div>' +
        q.left.map(function (txt, li) {
          var sel = S.matchSel === li;
          var pair = S.matchPicks[li];
          var cls = sel ? ' is-sel' : (pair !== undefined ? ' is-paired' : '');
          if (answered) cls = pair === li ? ' is-right' : ' is-wrong';
          /* Keyed on the LEFT index in both columns, so the two halves of a
             pair agree. Keying each column on its own index would give every
             box a colour and none of them a partner. */
          if (pair !== undefined && !answered) cls += ' a1-mc' + (li % 6);
          /* The cue goes on the row the reader would touch next, not on all
             four: repeated down the column it stopped being an affordance and
             became decoration. */
          var cue = '';
          if (!answered) {
            if (sel) cue = 'now pick its match';
            else if (pair === undefined && S.matchSel === null && li === firstOpen) cue = 'start here';
          }
          return '<button class="a1-match-item a1-match-l' + cls + '" data-a1="matchl" data-i="' + li + '"' +
            (answered ? ' disabled' : '') + ' aria-pressed="' + (sel ? 'true' : 'false') + '">' +
            '<span class="a1-match-k">' + (li + 1) + '</span><span>' + md(txt) + '</span>' +
            (pair !== undefined
              ? '<span class="a1-match-tag">' + String.fromCharCode(65 + S._order.indexOf(pair)) + '</span>'
              : (cue ? '<span class="a1-match-cue">' + cue + '</span>' : '')) +
            '</button>';
        }).join('') + '</div>';

      h += '<div class="a1-match-col">' +
        '<div class="a1-match-head">' + (answered ? 'Matched to' : '<span class="a1-match-step">2</span> Then tap its match') + '</div>' +
        S._order.map(function (ri, di) {
          var takenBy = pairedRights[ri];
          var cls = takenBy !== undefined ? ' is-paired' : ' is-open';
          if (answered) cls = takenBy === ri ? ' is-right' : (takenBy !== undefined ? ' is-wrong' : ' is-open');
          if (takenBy !== undefined && !answered) cls += ' a1-mc' + (takenBy % 6);
          return '<button class="a1-match-item a1-match-r' + cls + '" data-a1="matchr" data-i="' + ri + '"' +
            (answered ? ' disabled' : '') + '>' +
            '<span class="a1-match-k">' + String.fromCharCode(65 + di) + '</span><span>' + md(q.right[ri]) + '</span>' +
            (takenBy !== undefined ? '<span class="a1-match-tag">' + (takenBy + 1) + '</span>' : '') +
            '</button>';
        }).join('') + '</div></div>';

      if (!answered) {
        /* Clear is kept under exam conditions and Submit is not. Clear is the
           only undo this question type has for a reader who paired the wrong
           two things; Submit is the reveal, and a mock reveals nothing. */
        h += '<div class="a1-match-actions">' +
          '<button class="a1-btn a1-btn-ghost" data-a1="matchclear">Clear</button>' +
          (isMock() ? '' : '<button class="a1-btn a1-btn-primary" data-a1="matchsubmit">Submit</button>') +
          '</div>';
      } else {
        /* "1 → A, 2 → C" made the reader carry four letters back up the page
           and look each one up. The pairing is written out instead. */
        h += '<div class="a1-match-key">' +
          '<div class="a1-match-key-h">Correct pairs</div>' +
          q.left.map(function (txt, li) {
            var got = S.matchPicks[li] === li;
            /* A tick as well as a colour. The border alone would leave a reader
               who cannot separate the two hues unable to tell which rows they
               had right, and this line is the whole feedback for the question. */
            return '<div class="a1-match-key-row' + (got ? ' is-right' : ' is-wrong') + '">' +
              '<span class="a1-match-key-m" role="img" aria-label="' +
                (got ? 'You matched this correctly' : 'You matched this wrongly') + '">' +
                (got ? '✓' : '✗') + '</span>' +
              '<span class="a1-match-key-l">' + md(txt) + '</span>' +
              '<span class="a1-match-key-a" aria-hidden="true">→</span>' +
              '<span class="a1-match-key-r">' + md(q.right[li]) + '</span>' +
              '</div>';
          }).join('') + '</div>';
      }

    } else if (t === 'ordering') {
      if (!S.orderSeq) {
        /* Guard against a shuffle that happens to deal the right answer. */
        var seq = shuffle(idxArray(q.items.length));
        var inOrder = seq.every(function (v, i) { return v === i; });
        if (inOrder && seq.length > 1) { var tmp = seq[0]; seq[0] = seq[1]; seq[1] = tmp; }
        S.orderSeq = seq;
      }
      h += '<ol class="a1-order">' + S.orderSeq.map(function (ii, pos) {
        var cls = '';
        if (S.answered !== null) cls = ii === pos ? ' is-right' : ' is-wrong';
        return '<li class="a1-order-row' + cls + '">' +
          '<span class="a1-order-n">' + (pos + 1) + '</span>' +
          '<span class="a1-order-t">' + md(q.items[ii]) + '</span>' +
          (S.answered === null ? '<span class="a1-order-b">' +
            '<button class="a1-order-btn" data-a1="orderup" data-i="' + pos + '"' + (pos === 0 ? ' disabled' : '') + ' aria-label="Move up">▲</button>' +
            '<button class="a1-order-btn" data-a1="orderdown" data-i="' + pos + '"' + (pos === S.orderSeq.length - 1 ? ' disabled' : '') + ' aria-label="Move down">▼</button>' +
            '</span>' : '') +
          '</li>';
      }).join('') + '</ol>';
      /* THE TWO HALVES OF THIS ARE NOT OPPOSITES, and writing them as one
         if/else made them look it. Adding `&& !isMock()` to the submit sent a
         mock down the `else`, which prints the correct order — the one question
         type on the paper that answered itself. Ungraded and graded is the
         outer question; whether a submit is offered is a separate one. */
      if (S.answered === null) {
        if (!isMock()) h += '<button class="a1-btn a1-btn-primary a1-wide" data-a1="ordersubmit">Submit</button>';
      } else {
        h += '<div class="a1-match-key">Correct order — ' + q.items.map(function (x, i) {
          return (i + 1) + '. ' + esc(x);
        }).join(' · ') + '</div>';
      }
    }

    /* NOTHING IS REVEALED IN A MOCK, and it falls out rather than being
       arranged: the block below is gated on the question having been graded,
       and under exam conditions grading does not happen until the reader has
       already moved on. There is no branch here that could be forgotten. */
    if (isMock()) {
      h += '<button class="a1-btn a1-btn-primary a1-wide" data-a1="mocknext">' +
        (S.qIdx === n - 1 ? 'Finish the paper' : 'Next question') + '</button>';
    } else if (S.answered !== null) {
      h += '<div class="a1-exp-box"><div class="a1-exp-l">Why</div><p class="a1-exp">' + md(q.exp || '') + '</p></div>';
      /* A review is the same graded screen with somewhere else to go: it moves
         through a finished paper rather than through a run, so it brings its
         own navigation and must not offer this one. */
      if (!isReview()) {
        h += '<button class="a1-btn a1-btn-primary a1-wide" data-a1="nextq">' +
          (S.qIdx === n - 1 ? 'Finish' : 'Next question') + '</button>';
      }
    }
    return h;
  }

  function fmtAns(q) {
    if (q.unit === '£') return '£' + Number(q.answer).toFixed(2);
    return String(q.answer) + (q.unit && q.unit !== '£' ? ' ' + q.unit : '');
  }

  /* ── How the paper went, outcome by outcome ──────────────────────────────── */
  function mockReport() {
    var by = {};
    (S.mockResults || []).forEach(function (r) {
      var k = String(r.lo);
      if (!by[k]) by[k] = { asked: 0, right: 0 };
      by[k].asked++;
      if (r.correct) by[k].right++;
    });
    var u = unit();
    var os = (u && u.outcomes) || [];
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

    var h = '<div class="a1-mockreport">' +
      '<div class="a1-mockreport-h">How the paper went, outcome by outcome</div>' +
      '<div class="a1-tablewrap"><table class="a1-table"><thead><tr>' +
      '<th>Outcome</th><th class="a1-num">Weight</th><th class="a1-num">Right</th><th class="a1-num">Score</th>' +
      '</tr></thead><tbody>' +
      rows.map(function (r) {
        return '<tr class="' + (r.pct >= 70 ? 'is-ok' : 'is-low') + '">' +
          '<td data-h="Outcome">' + r.n + ' · ' + esc(r.title) + '</td>' +
          '<td class="a1-num" data-h="Weight">' + r.weighting + '%</td>' +
          '<td class="a1-num" data-h="Right">' + r.right + ' / ' + r.asked + '</td>' +
          '<td class="a1-num" data-h="Score">' + r.pct + '%</td></tr>';
      }).join('') +
      '</tbody></table></div>';
    if (focus) {
      h += '<div class="a1-mockreport-f">Most marks at stake: <strong>Outcome ' + focus.n + ' · ' +
        esc(focus.title) + '</strong> — ' + focus.pct + '% right, and ' + focus.weighting +
        '% of the assessment.</div>';
    }
    return h + '</div>';
  }

  /* ── Done screen ─────────────────────────────────────────────────────────── */
  function renderDone() {
    var isM = S.mode === 'mock';
    var isP = S.mode === 'practice' || isM;
    var checks = currentQuestions();
    var pct = checks.length ? Math.round((S.score / checks.length) * 100) : 100;
    var st = pct >= 100 ? 3 : pct >= 80 ? 2 : pct >= 60 ? 1 : 0;
    var head = isM
      ? (pct >= 70 ? 'A strong paper' : pct >= 50 ? 'Some gaps to close' : 'Worth going back to the steps')
      : isP
        ? (pct >= 70 ? 'Solid' : pct >= 50 ? 'Some gaps' : 'Worth going back to the steps')
        : (pct >= 60 ? 'Step complete' : 'Worth another pass');

    var weak = '';
    if (isM) {
      weak = (S.mockOver
        ? '<div class="a1-done-weak">The clock ran out. Questions not reached count as wrong, ' +
          'exactly as they would in the assessment.</div>'
        : '') + mockReport();
    } else if (isP) {
      var missedLos = {};
      (S.practiceMissed || []).forEach(function (q) { missedLos[q.lo] = (missedLos[q.lo] || 0) + 1; });
      var keys = Object.keys(missedLos);
      if (keys.length) {
        weak = '<div class="a1-done-weak">Missed questions came from ' +
          keys.sort().map(function (k) { return 'Outcome ' + k + ' (' + missedLos[k] + ')'; }).join(', ') +
          '</div>';
      }
    }

    /* After a lesson, point at the next rung by name rather than sending the
       reader back to a ladder to find their own place. */
    var onward = '';
    if (!isP) {
      var nx = nextLesson();
      if (nx && nx.id !== S.lessonId) {
        onward = '<div class="a1-done-next">Next up — step ' + stepNo(nx.id) + ', ' + esc(nx.title) + '</div>';
      }
    }

    /* NAME THE STEP THAT WAS JUST FINISHED. The heading is a verdict, and a
       verdict does not say what it is a verdict on; the screen already names
       the step COMING NEXT, so the one just completed was the only thing on it
       without a name. Practice runs and mocks are not one step, so they keep
       the score line they already have. */
    var doneLesson = '';
    if (!isP) {
      var finished = lessonById(S.lessonId);
      if (finished) {
        doneLesson = '<div class="a1-done-lesson">Step ' + stepNo(finished.id) + ' · ' + esc(finished.title) + '</div>';
      }
    }

    return '<div class="a1-root"><div class="a1-done">' +
      '<div class="a1-done-ring" style="--p:' + pct + '"><span>' + pct + '%</span></div>' +
      doneLesson +
      '<h1 class="a1-done-h">' + head + '</h1>' +
      '<div class="a1-done-sub">' + S.score + ' of ' + checks.length + ' correct' +
        (isM ? ' · timed mock' : isP ? ' · ' + practiceLabel() : '') + '</div>' +
      /* The streak is what a "keep going" run was for, so its result leads with
         it rather than with a percentage that depends on how long the reader
         felt like carrying on. */
      (isP && S.practiceLo === 'endless'
        ? '<div class="a1-done-streak"><span class="a1-inf" aria-hidden="true">∞</span>' +
          'Best streak ' + S.bestStreak + '</div>' : '') +
      (isP ? '' : '<div class="a1-stars a1-stars-big">' + [1, 2, 3].map(function (n) {
        return '<span class="' + (n <= st ? 'on' : '') + '">★</span>'; }).join('') + '</div>') +
      weak + onward +
      '<div class="a1-done-actions">' +
        /* THE FIRST THING OFFERED AFTER A PAPER, and ahead of more practice. A
           percentage and a table by outcome say where the marks went; only the
           questions themselves say why, and that is what a reader has just
           spent ninety minutes earning the right to see. */
        (isM && (S.practiceQs || []).length
          ? '<button class="a1-btn a1-btn-primary" data-a1="review">Review the paper</button>' : '') +
        '<button class="a1-btn ' + (isM ? 'a1-btn-ghost' : 'a1-btn-primary') + '" data-a1="exit">' +
          (isP ? 'More practice' : 'Back to the steps') + '</button>' +
        /* No Retry on a paper. Sitting another mock is starting a new paper,
           drawn afresh, not repeating this one. */
        (isM ? '' : '<button class="a1-btn a1-btn-ghost" data-a1="retry">Retry</button>') +
        (isP ? '<button class="a1-btn a1-btn-ghost" data-a1="topath">Back to the steps</button>' : '') +
      '</div></div></div>';
  }

  /* What a run was, in words, for the result screen and the question bar. The
     three drawn runs had one label between them — "Outcome N or all outcomes" —
     which called a mistakes run "all outcomes" the moment a second kind of run
     existed. */
  function practiceLabel() {
    if (S.practiceLo === 'missed') return 'questions you had got wrong';
    if (S.practiceLo === 'mix') return 'all outcomes';
    if (S.practiceLo === 'mock') return 'timed mock';
    /* Without this an endless run is described as "Outcome endless" on its own
       result screen. */
    if (S.practiceLo === 'endless') return 'keep going';
    return 'Outcome ' + S.practiceLo;
  }

  /* ── The review screens ──────────────────────────────────────────────────── */
  function renderReview() {
    var rows = reviewRows();
    var right = rows.filter(function (r) { return r.correct; }).length;
    var wrong = rows.length - right;
    var shown = rows.filter(function (r) { return !S.reviewWrongOnly || !r.correct; });

    var h = '<div class="a1-root">';
    h += ctxBar({
      back: 'reviewback',
      backLabel: 'Back to the result',
      title: 'Review the paper',
      meta: right + ' of ' + rows.length + ' right',
    });
    h += '<div class="a1-page">';

    /* Only offered when there is something to filter TO. On a clean sweep the
       toggle would lead to an empty screen, which is a worse way of saying
       "nothing went wrong" than not offering it. */
    if (wrong) {
      h += '<div class="a1-revfilter" role="group" aria-label="Which questions to show">' +
        '<button class="a1-revfilter-b' + (S.reviewWrongOnly ? '' : ' on') + '" data-a1="reviewall"' +
          ' aria-pressed="' + (!S.reviewWrongOnly) + '">All ' + rows.length + '</button>' +
        '<button class="a1-revfilter-b' + (S.reviewWrongOnly ? ' on' : '') + '" data-a1="reviewwrong"' +
          ' aria-pressed="' + (!!S.reviewWrongOnly) + '">Got wrong ' + wrong + '</button>' +
        '</div>';
    } else {
      h += '<div class="a1-revclean">Every question on this paper was right.</div>';
    }

    h += '<ol class="a1-revlist">';
    shown.forEach(function (r) {
      var g = (r.q && r.q.lo) ? 'Outcome ' + r.q.lo : '';
      var note = !r.reached ? 'not reached' : r.blank ? 'left blank' : '';
      h += '<li><button class="a1-revrow ' + (r.correct ? 'is-right' : 'is-wrong') + '"' +
        ' data-a1="reviewq" data-i="' + r.i + '"' +
        ' aria-label="Question ' + (r.i + 1) + ', ' + (r.correct ? 'correct' : 'wrong') + '">' +
        '<span class="a1-revrow-n">' + (r.i + 1) + '</span>' +
        '<span class="a1-revrow-tx">' +
          '<span class="a1-revrow-q">' + esc(String((r.q && r.q.q) || '').replace(/\*\*/g, '')) + '</span>' +
          '<span class="a1-revrow-m">' + esc(g + (note ? (g ? ' · ' : '') + note : '')) + '</span>' +
        '</span>' +
        '<span class="a1-revrow-v" aria-hidden="true">' + (r.correct ? '✓' : '✗') + '</span>' +
        '</button></li>';
    });
    h += '</ol>';
    h += '<footer class="a1-foot">This review lasts as long as the result screen it was opened from. ' +
      'The questions you got wrong are kept, and come back on the practice screen.</footer>';
    return h + '</div></div>';
  }

  function renderReviewQ() {
    var row = reviewRow(S.reviewIdx);
    if (!row || !row.q) { S.reviewIdx = null; return renderReview(); }
    var seq = reviewSeq();
    var at = seq.indexOf(S.reviewIdx);
    var total = (S.practiceQs || []).length;

    var h = '<div class="a1-root a1-reading' + fresh() + '">';
    h += '<div class="a1-lessonbar">' +
      '<button class="a1-ctx-back" data-a1="reviewlist" aria-label="Back to the list of questions">' +
        '<span aria-hidden="true">←</span></button>' +
      '<div class="a1-lessonbar-mid">' +
        '<div class="a1-lessonbar-t">Question ' + (S.reviewIdx + 1) + ' of ' + total + '</div>' +
        /* Which sequence the arrows are moving through, said out loud. With the
           filter on, Next skips the right answers — and a bar that only said
           "Question 1 of 30" made that look like questions going missing. */
        '<div class="a1-lessonbar-m">' +
          (S.reviewWrongOnly
            ? 'Wrong answer ' + (at + 1) + ' of ' + seq.length
            : 'Reviewing the paper') +
          (row.q.lo ? ' · Outcome ' + row.q.lo : '') + '</div>' +
      '</div>' +
      '<div class="a1-revverdict ' + (row.correct ? 'is-right' : 'is-wrong') + '">' +
        (row.correct ? '✓' : '✗') + '</div>' +
      '</div>';

    h += '<article class="a1-sheet' + fresh() + '">';
    if (row.blank) {
      h += '<div class="a1-revblank">' +
        (row.reached
          ? 'You left this one blank, so it was marked wrong — as it would be in the assessment.'
          : 'The clock ran out before you reached this one. It was marked wrong, as it would be in the assessment.') +
        ' The right answer is shown below.</div>';
    }
    h += questionHtml(row.q, total);

    h += '<div class="a1-revnav">' +
      '<button class="a1-btn a1-btn-ghost" data-a1="reviewprev"' + (at <= 0 ? ' disabled' : '') + '>← Previous</button>' +
      '<button class="a1-btn a1-btn-ghost" data-a1="reviewlist">All questions</button>' +
      '<button class="a1-btn a1-btn-primary" data-a1="reviewnext"' +
        (at < 0 || at >= seq.length - 1 ? ' disabled' : '') + '>Next →</button>' +
      '</div>';
    return h + '</article></div>';
  }

  /* ── Practice picker ─────────────────────────────────────────────────────── */
  function renderPractice() {
    var bank = practiceBank();
    var u = unit();
    var los = u ? u.outcomes : [];
    var counts = {};
    bank.forEach(function (q) { counts[q.lo] = (counts[q.lo] || 0) + 1; });

    var missed = missedQuestions();
    var pr = data.practice;

    var h = '<div class="a1-root">';
    h += ctxBar({
        back: 'topath',
        backLabel: 'Back to the steps',
        title: 'Practice',
        /* "10 per run" was true while a run was the only thing this screen
           offered. It now offers a 30-question paper as well, so the honest
           fact here is the size of the pool; each card says its own length. */
        meta: bank.length + ' questions in the pool',
      });

    h += '<div class="a1-page">';

    /* ── THE THINGS ON THIS SCREEN ARE NOT PEERS ─────────────────────────────
       The mock is a panel, because sitting a timed paper is the thing this
       screen is for. The backlog is an alert, and only when there is one. The
       outcomes are a quiet grid you go to when you already know which one you
       want. */
    h += '<button class="a1-mockpanel" data-a1="startmock">' +
      '<span class="a1-mockpanel-tx">' +
        '<span class="a1-mockpanel-k">Timed mock · ' + mockMinutes() + ' min</span>' +
        '<span class="a1-mockpanel-t">Sit a full paper</span>' +
        '<span class="a1-mockpanel-m">' + MOCK_LEN +
          ' questions drawn to the assessment weighting. Nothing is revealed until the end.</span>' +
      '</span>' +
      (pr.mocks
        ? '<span class="a1-mockpanel-best"><b>' + pr.mockBest + '%</b>' +
          '<span>best of ' + pr.mocks + '</span></span>'
        : '<span class="a1-mockpanel-go" aria-hidden="true">→</span>') +
      '</button>';

    if (missed.length) {
      h += '<button class="a1-alert" data-a1="startpractice" data-lo="missed">' +
        '<span class="a1-alert-i" aria-hidden="true">!</span>' +
        '<span class="a1-alert-tx">' +
          '<span class="a1-alert-t">' + missed.length +
            (missed.length === 1 ? ' question you got wrong' : ' questions you got wrong') + '</span>' +
          '<span class="a1-alert-m">Served back most recent first, and cleared as you get them right.</span>' +
        '</span>' +
        '<span class="a1-alert-go" aria-hidden="true">→</span>' +
        '</button>';
    }

    h += '<div class="a1-pgrid">';
    /* "Keep going" rather than "Endless practice": this is Level 1, and the
       plainer word is the one its readers use. The mode is the same. */
    h += '<button class="a1-endless" data-a1="startpractice" data-lo="endless">' +
      '<span class="a1-endless-glow" aria-hidden="true"></span>' +
      '<span class="a1-endless-i" aria-hidden="true">∞</span>' +
      '<span class="a1-endless-tx">' +
        '<span class="a1-endless-t">Keep going</span>' +
        '<span class="a1-endless-m">Questions keep coming until you stop. Build up a streak.</span>' +
      '</span>' +
      '<span class="a1-endless-go" aria-hidden="true">→</span>' +
      '</button>';

    h += '<button class="a1-pcard a1-pcard-mix" data-a1="startpractice" data-lo="mix">' +
      '<span class="a1-pcard-k">Mixed</span>' +
      '<span class="a1-pcard-t">All five outcomes</span>' +
      '<span class="a1-pcard-m">' + PRACTICE_LEN +
        ' questions, drawn to the assessment weighting</span>' +
      '</button>';
    los.forEach(function (o) {
      var n = counts[o.n] || 0;
      if (!n) return;
      /* The reader's own record against this outcome, where there is one. A
         count of questions in the pool is a fact about the app; how many of
         them you have got right is a fact about you, and it is the one that
         decides which card to press. */
      var r = pr.los[o.n];
      var seen = r && r.attempted ? r : null;
      h += '<button class="a1-pcard" data-a1="startpractice" data-lo="' + o.n + '">' +
        '<span class="a1-pcard-k">Outcome ' + o.n + ' · ' + o.weighting + '%</span>' +
        '<span class="a1-pcard-t">' + esc(o.title) + '</span>' +
        '<span class="a1-pcard-m">' + n + ' questions' +
          (seen ? ' · ' + Math.round((seen.correct / seen.attempted) * 100) + '% right so far' : '') +
        '</span>' +
        '</button>';
    });
    h += '</div>';
    h += '<footer class="a1-foot">Independent study tool. Not affiliated with, endorsed by, or officially associated with AAT.</footer>';
    return h + '</div></div>';
  }

  function renderQuiz() {
    var qs = currentQuestions();
    if (!qs.length) { S.screen = 'practice'; return renderPractice(); }
    var pct = Math.round((S.qIdx / qs.length) * 100);
    var left = isMock() ? mockLeft() : 0;
    var h = '<div class="a1-root a1-reading' + fresh() + '">';
    /* ── Endless looks like its own mode ─────────────────────────────────────
       A run with no last question cannot show "question 3 of 10" or a bar
       filling towards an end, so both are replaced by what does mean something
       without one: how many have been answered, and the streak. Same three-part
       header, different meaning in every slot. */
    if (isEndless()) {
      var done = S.qIdx + (S.answered !== null ? 1 : 0);
      var best = Math.max(S.bestStreak, S.streak, 1);
      var meter = Math.round((S.streak / best) * 100);
      h += '<div class="a1-lessonbar a1-lessonbar-endless">' +
        '<button class="a1-ctx-back" data-a1="exit" aria-label="Stop and see how you did">' +
          '<span aria-hidden="true">←</span></button>' +
        '<div class="a1-lessonbar-mid">' +
          '<div class="a1-lessonbar-t"><span class="a1-inf" aria-hidden="true">∞</span>Keep going</div>' +
          '<div class="a1-lessonbar-m">' + done + ' answered · ' + S.score + ' right</div>' +
        '</div>' +
        '<div class="a1-streak' + (S.streak >= 3 ? ' is-hot' : '') + '" ' +
          'aria-label="Current streak ' + S.streak + '">' +
          '<span class="a1-streak-n">' + S.streak + '</span>' +
          '<span class="a1-streak-l">streak</span>' +
        '</div>' +
        '</div>' +
        '<div class="a1-lessonbar-p a1-lessonbar-p-endless"><span style="width:' + meter + '%"></span></div>';
    } else {
    h += '<div class="a1-lessonbar' + (isMock() ? ' a1-lessonbar-mock' : '') + '">' +
      '<button class="a1-ctx-back" data-a1="exit" aria-label="Leave">' +
        '<span aria-hidden="true">←</span></button>' +
      '<div class="a1-lessonbar-mid">' +
        '<div class="a1-lessonbar-t">' + (isMock() ? 'Timed mock' : 'Practice') + '</div>' +
        '<div class="a1-lessonbar-m">Question ' + (S.qIdx + 1) + ' of ' + qs.length +
          (isMock() ? '' : ' · ' + practiceLabel()) + '</div>' +
      '</div>' +
      (isMock()
        ? '<div class="a1-mockclock' + (left < 5 * 60000 ? ' is-low' : '') + '" role="timer" aria-live="off">' +
            clock(left) + '</div>'
        : '<div class="a1-lessonbar-n">' + pct + '%</div>') +
      '</div>' +
      '<div class="a1-lessonbar-p"><span style="width:' + pct + '%"></span></div>';
    }
    h += '<article class="a1-sheet' + (isEndless() ? ' a1-sheet-endless' : '') + fresh() + '">' +
      questionHtml(qs[S.qIdx], qs.length) + '</article></div>';
    return h;
  }

  /* ── Mount and events ────────────────────────────────────────────────────── */
  function html() {
    /* The guard is drawn OVER whatever screen is underneath rather than
       replacing it, so the paper — the question, the clock, how far through it
       is — is still there behind the dialog. A reader deciding whether to walk
       out of a mock is deciding about what is on the screen, and replacing it
       with a full-screen question takes away the thing they are weighing. */
    return screenHtml() + calcSurface() + (S.confirmExit ? exitGuard() : '');
  }

  function screenHtml() {
    if (S.screen === 'lesson') return renderLesson();
    if (S.screen === 'practice') return renderPractice();
    if (S.screen === 'quiz') return renderQuiz();
    if (S.screen === 'done') return renderDone();
    if (S.screen === 'review') return S.reviewIdx === null ? renderReview() : renderReviewQ();
    return renderPath();
  }

  /* ── Leaving a timed paper ──────────────────────────────────────────────────
     Precise about what actually goes, because a warning that overstates the
     loss is one readers learn to click through. The paper goes: it is never
     graded, so there is no percentage, no breakdown and no review, and it does
     not count towards the best-of. The questions already answered do NOT go —
     mocknext records each one as it passes, so they are already in the practice
     record and in the mistakes backlog. */
  function exitGuard() {
    return '<div class="a1-guard" role="presentation">' +
      '<div class="a1-guard-box" role="alertdialog" aria-modal="true" ' +
        'aria-labelledby="a1-guard-t" aria-describedby="a1-guard-d">' +
        '<h2 class="a1-guard-h" id="a1-guard-t">Leave the mock?</h2>' +
        '<p class="a1-guard-p" id="a1-guard-d">Your progress on this paper will be lost. ' +
          'A mock cannot be resumed, so it will not be marked and there will be no result and no review.</p>' +
        '<p class="a1-guard-note">Questions you have already answered stay in your practice record.</p>' +
        '<div class="a1-guard-actions">' +
          '<button class="a1-btn a1-btn-primary" data-a1="exitcancel" type="button">Stay in the paper</button>' +
          '<button class="a1-btn a1-btn-quiet" data-a1="exitconfirm" type="button">Leave and lose it</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  /* Where the reader is, as a single comparable string. Keyed on POSITION, not
     on every render: revealing a step, pairing two items or submitting an
     answer all re-render, and none of them should yank the page to the top
     while the reader is mid-page. */
  function posKey() {
    return [S.screen, S.lessonId, S.phase, S.cardIdx, S.qIdx, S.reviewIdx].join('|');
  }
  var _lastPos = null;

  function restoreScroll(el) {
    if (typeof window === 'undefined' || !window.scrollTo) return;
    /* Back to the list of questions: put the one just read under the reader's
       eye. Working down a paper of thirty means returning to this list thirty
       times, and each return to the top costs the place. */
    if (S.screen === 'review' && S.reviewIdx === null && S.reviewLast !== null) {
      var row = el.querySelector('[data-a1="reviewq"][data-i="' + S.reviewLast + '"]');
      if (row && row.scrollIntoView) { row.scrollIntoView({ behavior: 'instant', block: 'center' }); return; }
    }
    if (S.screen === 'path' && S.lessonId) {
      var node = el.querySelector('[data-a1="open"][data-id="' + S.lessonId + '"]');
      if (node && node.scrollIntoView) {
        node.scrollIntoView({ behavior: 'instant', block: 'center' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  /* ── Animate on MOVEMENT, not on every repaint ─────────────────────────────
     The screen and the page each carried an entrance animation applied
     unconditionally. Every render replaces the whole DOM and a render happens
     on every click — pairing two items, revealing a step, choosing a pill — so
     the module re-performed its entrance each time the reader touched
     anything, which is the loudest way an interface can feel cheap.

     posKey() already knew the difference; the same answer now decides whether
     anything animates. Computed BEFORE the paint, because the class has to be
     in the markup that is about to be written. */
  var _fresh = true;
  function mount(el) {
    /* A mock's clock is an interval, and suspend() stops it when the reader
       switches subject — otherwise it goes on ticking towards a finish() that
       would paint a Level 1 result over whatever subject is on screen. Coming
       back has to pick it up again, and has to notice that the paper may have
       run out while it was away: mockEndsAt is an absolute time, so the clock
       does not pause just because nothing was watching it. */
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
    /* Consumed, not read: the flag has to survive exactly one repaint. Leaving
       it set would drag the page down again on every subsequent click — the
       calculator keys, a pill, anything — which is the same defect as animating
       on every repaint, in a different medium. */
    if (S.scrollToNext) { S.scrollToNext = false; scrollNextIntoView(el); }
    /* This module repaints itself without going back through app.js's
       render(), so the platform back button is kept in step from here too. */
    if (root.AATNav) root.AATNav.sync();
    ensureGuardKeys();
    /* Focus moves to the SAFE choice, not the destructive one. A reader who
       taps back and then hits Enter out of habit should stay in the paper.
       This also puts focus inside the dialog, which is what a screen reader
       needs to announce it. */
    if (S.confirmExit && el.querySelector) {
      var stay = el.querySelector('[data-a1="exitcancel"]');
      if (stay && stay.focus) { try { stay.focus(); } catch (e) {} }
    }
  }
  function fresh() { return _fresh ? ' is-fresh' : ''; }
  var _host = null;
  function rerender() { if (_host) mount(_host); }

  var PRACTICE_LEN = 10;

  /* ── Drawing to the assessment's weighting ─────────────────────────────────
     A shuffled slice of the bank draws in the bank's OWN proportions, which are
     an accident of the order the questions were written in. This pool happens
     to sit at 18/11/28/32/11 against an assessment weighted 17/10/29/34/10 —
     close, but close by luck, and it drifts every time a question is added.
     Weighting the draw makes the shape a property of the draw rather than of
     the pool, so the pool can grow unevenly without the practice tilting.

     SYSTEMATIC SAMPLING, NOT LARGEST REMAINDER. Rounding each share and handing
     the spare seats to the largest remainders is deterministic: with these
     five weightings it awards the spare seat to the same outcome in EVERY run,
     so that outcome is permanently over-represented and another permanently
     under. Fixing one bias by installing another, quietly.

     One uniform draw, carried across the cumulative shares, has neither
     problem. Each outcome's seat count is the difference between two floors of
     its running total offset by that draw, which makes the expected count
     exactly its share, and makes the seats always sum to n because the last
     floor is n and the first is zero.

     A shortfall in one outcome is redistributed rather than left as a gap: a
     run that asked for ten and found nine must still be ten questions long, or
     the score at the end is out of a different number than the reader thinks. */
  function drawWeighted(n) {
    var bank = practiceBank();
    var u = unit();
    var os = ((u && u.outcomes) || []).filter(function (o) {
      return bank.some(function (q) { return q.lo === o.n; });
    });
    if (!os.length) return shuffle(bank).slice(0, n);

    var total = os.reduce(function (a, o) { return a + (o.weighting || 0); }, 0);
    if (!total) return shuffle(bank).slice(0, n);

    var uni = Math.random();
    var cum = 0, prev = Math.floor(uni);
    var seats = os.map(function (o) {
      cum += n * (o.weighting || 0) / total;
      var upto = Math.floor(cum + uni);
      var got = upto - prev;
      prev = upto;
      return { n: o.n, whole: got };
    });

    var pools = {};
    seats.forEach(function (st) {
      pools[st.n] = shuffle(bank.filter(function (q) { return q.lo === st.n; }));
    });

    var out = [];
    seats.forEach(function (st) { out = out.concat(pools[st.n].splice(0, st.whole)); });

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
     question how you are doing is exactly what the assessment withholds, and it
     is the part readers find hardest. Answers can still be changed until the
     reader moves on — a pick is a pick, not a commitment — which is how the
     real computer-based assessment behaves.

     LENGTH. BKFN is assessed by a ninety-minute computer-marked CBA whose
     published specification names no task count and no mark total, so there is
     no official number to match and inventing one would be a claim this app
     cannot support. Thirty is chosen instead against the two things that are
     knowable: the bank is 74 questions, so a thirty-question paper can be sat
     several times without becoming the same paper; and ninety minutes over
     thirty questions is three minutes each, which is a pace a Level 1 reader
     has to keep rather than one they can amble through. */
  var MOCK_LEN = 30;

  function mockMinutes() {
    var u = unit();
    return (u && u.assessment && u.assessment.durationMinutes) || 90;
  }

  function startMock() {
    S.practiceLo = 'mock';
    S.practiceQs = drawWeighted(MOCK_LEN);
    S.practiceMissed = [];
    S.mockResults = [];
    S.mockOver = false;
    S.mockEndsAt = Date.now() + mockMinutes() * 60000;
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
     typing. So the tick reaches for the clock element and sets its text; the
     only repaint is the one at the end, when time runs out and there is nothing
     left to type into anyway.

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
      var el = _host && _host.querySelector && _host.querySelector('.a1-mockclock');
      if (!el) return;
      el.textContent = clock(mockLeft());
      if (mockLeft() < 5 * 60000 && el.classList) el.classList.add('is-low');
    }, 1000);
  }
  function mockLeft() { return Math.max(0, S.mockEndsAt - Date.now()); }
  /* Hours once there is more than one. A ninety-minute paper opening at "89:59"
     is readable but wrong-looking — nobody thinks of an assessment as
     eighty-nine minutes — and "1:29:59" says what the reader is being given. */
  function clock(ms) {
    var t = Math.floor(ms / 1000);
    var h = Math.floor(t / 3600), m = Math.floor(t / 60) % 60, sec = t % 60;
    var mm = h ? (m < 10 ? '0' + m : String(m)) : String(Math.floor(t / 60));
    return (h ? h + ':' : '') + mm + ':' + (sec < 10 ? '0' : '') + sec;
  }

  /* Drawn in batches rather than all at once, and topped up with one question
     to go so the reader never waits at a boundary they cannot see. */
  var ENDLESS_BATCH = 12;
  function isEndless() { return S.practiceLo === 'endless'; }

  function topUpEndless() {
    var pool = practiceBank();
    var fresh = pool.filter(function (q) { return !S.endlessSeen[q.id]; });
    /* Once the whole bank has been seen the set starts again: an endless run
       that quietly stopped being endless would be worse than repetition. */
    if (!fresh.length) { S.endlessSeen = {}; fresh = pool; }
    var add = shuffle(fresh).slice(0, ENDLESS_BATCH);
    add.forEach(function (q) { S.endlessSeen[q.id] = 1; });
    S.practiceQs = S.practiceQs.concat(add);
  }

  /* The result screen works out a percentage from the length of `practiceQs`,
     which in an endless run is however far the top-up happened to reach — so
     the set is trimmed to what was actually attempted before it is drawn. A run
     left before anything was answered goes quietly back to the picker. */
  function endEndless() {
    var attempted = S.qIdx + (S.answered !== null ? 1 : 0);
    if (!attempted) { S.screen = 'practice'; return; }
    S.practiceQs = S.practiceQs.slice(0, attempted);
    finish();
  }

  function startPractice(lo) {
    S.practiceLo = lo;
    /* The mistakes run is drawn in order, oldest miss last, rather than
       shuffled: a reader with thirty outstanding questions wants the ten they
       got wrong most recently, not ten at random from the whole backlog. */
    if (lo === 'endless') {
      S.endlessSeen = {};
      S.practiceQs = [];
      topUpEndless();
    } else if (lo === 'missed') {
      S.practiceQs = missedQuestions().slice(0, PRACTICE_LEN);
    } else if (lo === 'mix') {
      S.practiceQs = drawWeighted(PRACTICE_LEN);
    } else {
      var pool = practiceBank().filter(function (q) { return q.lo === lo; });
      S.practiceQs = shuffle(pool).slice(0, PRACTICE_LEN);
    }
    S.practiceMissed = [];
    S.streak = 0; S.bestStreak = 0;
    S.mode = 'practice';
    S.screen = 'quiz';
    S.qIdx = 0; S.score = 0;
    resetQState();
  }

  function startLesson(id) {
    S.mode = 'lesson';
    S.lessonId = id; S.screen = 'lesson'; S.cardIdx = 0; S.phase = 'teach';
    S.qIdx = 0; S.score = 0;
    resetCardState(); resetQState();
  }
  function resetCardState() {
    S.revealed = 0; S.tryInput = ''; S.tryResult = null; S.calcOpen = false;
    if (_calc) _calc.reset();
  }
  function resetQState() {
    S.answered = null; S.picked = null; S.tfPicks = {}; S.gapPicks = {};
    S.matchPicks = {}; S.matchSel = null; S.orderSeq = null; S.orderMoved = false;
    S.numInput = ''; S._order = null; S.calcOpen = false;
    S.plPicks = {}; S.egCells = {}; S.calcCell = null; S._plOrder = null;
    /* THE WORKING GOES WITH THE QUESTION. A figure left on the display belongs
       to a sum the reader has finished with, and reading it as the start of the
       next one is how a wrong answer gets typed. Memory survives — reset()
       clears the display without forgetting it. */
    if (_calc) _calc.reset();
  }

  /* Marking one answer, for every question type, in one place.

     Each of the six grading handlers used to carry its own comparison. That was
     survivable while grading happened in exactly one situation; the timed mock
     grades in a second one — silently, when the reader moves on — and the
     review grades in a third. Three copies of "is this right" drift apart the
     first time a type is added or a tolerance is changed. The handlers keep
     their own guards about WHEN to grade, which differ; what is right is
     decided here. */
  /* ── Sound ─────────────────────────────────────────────────────────────────
     Level 1's voice, from sound.js: triangle waves throughout — the mellowest
     waveform available without filtering — and the widest intervals of the
     three levels, root to fifth to octave, spread over a third of a second. Its
     wrong answer is a low triangle rather than Level 2's square, because this
     is the entry level and a buzzer is a poor thing to meet on your first day.

     Resolved on first use: this file is fetched lazily and nothing guarantees
     it arrives after sound.js. */
  var _snd = null;
  function Snd() {
    if (!_snd && root.AATSound) { _snd = root.AATSound.create('aat1'); }
    return _snd;
  }
  function beep(kind) { var p = Snd(); if (p && p[kind]) p[kind](); }

  /* ── Calculator ────────────────────────────────────────────────────────────
     Level 1's arithmetic is the kind that is genuinely done on a calculator in
     the assessment room: 24 folders at £2.75, a 10% trade discount, VAT at a
     fifth, a cash book that has to balance. Every one of the module's numeric
     questions carries figures in its stem and asks for a worked figure back,
     so unlike Level 3 there is no `recall` case here to exclude — but the
     predicate is written as a predicate anyway, in ONE place, because the
     moment a question is added that asks the reader to state a figure rather
     than work one out, the exclusion belongs there and not at four call sites.

     Resolved on first use for the same reason the sound is: this file is
     fetched lazily and nothing guarantees it arrives after calculator.js. */
  var _calc = null;
  function Calc() {
    if (!_calc && root.AATCalc) {
      _calc = root.AATCalc.create({ displayId: 'a1CalcDisplay' });
    }
    return _calc;
  }

  /* Two surfaces ask for a worked figure, and they are not the same shape. A
     practice, quiz or mock question is `numeric` and lives in `S.numInput`; a
     worked example's "Now you try" lives in `S.tryInput` on the lesson screen
     and has no question object at all. Both are offered the pad; both stop
     being offered the moment their answer is settled, because a keypad over a
     verdict is a keypad with nothing left to compute. */
  function calcOffered(q) {
    if (!Calc() || !q || S.answered !== null) return false;
    if (q.recall) return false;
    var t = q.type || 'mcq';
    /* A DAY BOOK IS ARITHMETIC. Its columns are VAT at 20% and a gross total,
       worked out line by line and then cast down — the same sums a numeric
       question asks for, only several of them. A pick list is not: it asks
       which book or which side, and there is nothing in it to compute. */
    return t === 'numeric' || t === 'entrygrid';
  }

  function tryItOffered() {
    if (!Calc() || S.screen !== 'lesson' || S.phase !== 'teach') return false;
    if (S.tryResult !== null) return false;
    var card = currentCard();
    return !!(card && card.worked && card.worked.tryIt);
  }

  /* WRITTEN OUT rather than built from the key's `kind`. `'a1-calc-' + k.kind`
     produces the same three class names and check-subject-styles cannot see
     any of them, so every rule for them reads as styling nothing renders.
     Spelling them keeps the stylesheet and the markup checkable against each
     other. */
  var CALC_KIND_CLASS = { fn: 'a1-calc-fn', op: 'a1-calc-op', eq: 'a1-calc-eq' };

  /* IT FLOATS, AND THE PAGE DOES NOT MOVE when it opens. A question that hands
     over "30 packs at £2.00 with a 10% discount" puts the figures above the
     answer box; a keypad in the flow would sit below both, so the figures and
     the tool for them would never be on screen together.

     Fixed to the viewport instead, opened from a button in the same corner, no
     scrim — the page behind it is the reason it is open, so it stays readable
     and scrollable. Closed by default: a sheet that opens on arrival has taken
     the screen away before the reader asked for it. */
  function calcHtml() {
    var C = Calc();
    if (!C) return '';
    var keys = (root.AATCalc.KEYS || []).map(function (k) {
      return '<button class="a1-calc-key' +
        (CALC_KIND_CLASS[k.kind] ? ' ' + CALC_KIND_CLASS[k.kind] : '') +
        (k.span === 2 ? ' a1-calc-w2' : '') +
        '" type="button" data-a1="calckey" data-k="' + esc(k.k) + '"' +
        (k.val != null ? ' data-v="' + esc(k.val) + '"' : '') +
        (k.aria ? ' aria-label="' + esc(k.aria) + '"' : '') +
        '>' + esc(k.label) + '</button>';
    }).join('');
    var open = !!S.calcOpen;
    return '<button class="a1-calcfab' + (open ? ' is-open' : '') + '" type="button" ' +
        'data-a1="calctoggle" aria-expanded="' + (open ? 'true' : 'false') + '" ' +
        'aria-controls="a1CalcSheet" ' +
        'aria-label="' + (open ? 'Close the calculator' : 'Open the calculator') + '">' +
        '<span class="a1-calcfab-i" aria-hidden="true">' + (open ? '&#10005;' : '&#129518;') + '</span>' +
      '</button>' +
      (open
        ? '<div class="a1-calcsheet" id="a1CalcSheet" role="group" aria-label="On-screen calculator">' +
            '<div class="a1-calc-screen">' +
              '<div class="a1-calc-display' + (C.errored ? ' is-error' : '') + '" ' +
                'id="a1CalcDisplay" role="status" aria-live="polite">' + esc(C.display) + '</div>' +
            '</div>' +
            '<div class="a1-calc-keys">' + keys + '</div>' +
            '<button class="a1-calc-use" type="button" data-a1="calcuse">' +
              '&#8627; Use this value</button>' +
          '</div>'
        : '');
  }

  /* Rendered as a SIBLING of `.a1-root`, never inside it. `.a1-root.is-fresh`
     carries an entrance animation with `fill-mode: both`, which retains the
     final keyframe's transform — and an ancestor with any transform, an
     identity matrix included, becomes the containing block for `position:
     fixed`. Inside the root the button anchors to the card and lands wherever
     the card happens to be; outside it, it anchors to the viewport. */
  function calcSurface() {
    if (tryItOffered()) return calcHtml();
    if (S.screen !== 'practice' && S.screen !== 'quiz') return '';
    var qs = currentQuestions();
    return calcOffered(qs && qs[S.qIdx]) ? calcHtml() : '';
  }

  /* The value goes into STATE and the screen is repainted from it, rather than
     being written onto the input element. `S.numInput` and `S.tryInput` are
     what grading reads; writing only the element would show the reader a
     figure that submitting would not see. */
  /* Which CELL "Use this value" fills: the one the reader last touched, and
     failing that the first on the grid — which is where someone starting the
     entry is. A grid with no cells returns null, and the button then does
     nothing rather than writing the figure where the grading cannot see it. */
  function entryTarget(q) {
    var G = root.AATGrid;
    if (!G) return null;
    var rows = G.entryRows(q), cols = G.entryCols(q);
    if (!rows.length || !cols.length) return null;
    var keys = [];
    rows.forEach(function (r, ri) {
      cols.forEach(function (c, ci) { keys.push(ri + ':' + ci); });
    });
    if (S.calcCell != null && keys.indexOf(S.calcCell) !== -1) return S.calcCell;
    return keys[0];
  }

  function calcUse() {
    var C = Calc();
    if (!C || C.errored) return;
    if (tryItOffered()) {
      S.tryInput = C.display;
      S.calcOpen = false;
      return rerender();
    }
    var qs = currentQuestions();
    var q = qs && qs[S.qIdx];
    if (!calcOffered(q)) return;
    if ((q.type || 'mcq') === 'entrygrid') {
      var k = entryTarget(q);
      if (k == null) return;
      S.egCells[k] = C.display;
      S.calcCell = k;
      S.calcOpen = false;
      return rerender();
    }
    S.numInput = C.display;
    /* CLOSE ON USE. The figure has landed in a box the sheet is covering, and
       leaving it open makes the reader dismiss it to see whether the thing
       they asked for happened. */
    S.calcOpen = false;
    return rerender();
  }

  /* Grading, scoring and the sound that goes with it, in one place. There are
     seven handlers that settle an answer here — multiple choice, true or false,
     gap-fill, match, order, numeric — and they were seven copies of the same
     three lines. Adding a sound to each by hand is how one of them stays
     silent, which a reader notices and no check would: the question still
     grades. */
  function settle(q) {
    S.answered = gradeAnswer(q);
    if (S.answered) S.score++;
    beep(S.answered ? 'correct' : 'wrong');
    /* Grading is the one repaint that should move the page. The verdict and the
       explanation appear where the answer controls were, which on a phone puts
       the button that continues the run below the fold — so a reader finishes a
       question and the screen looks finished with them. Flagged here rather
       than done here, because the button does not exist until the repaint that
       follows. Not in a mock: nothing is revealed there, so nothing grows and
       the button never moves. */
    if (!isMock()) S.scrollToNext = true;
    return rerender();
  }

  /* Put the advance button at the bottom of the viewport. `block: 'end'` rather
     than 'center', because the reader's eye is on the explanation above it and
     the button is the destination, not the subject. */
  /* A run with no finish line can only offer the landmarks the reader builds
     themselves, so fifty right in a row and a hundred are marked. Only in
     ENDLESS: a bounded run has an end of its own to arrive at, and a ten
     question set cannot reach fifty anyway.

     Exact equality rather than a threshold, because the streak moves one at a
     time — so each milestone fires on the answer that reaches it and never
     again on the way past. The list of milestones is AATCelebrate's, so the
     three levels cannot come to disagree about which streaks are worth
     marking. */
  function markStreak() {
    if (!isEndless() || !root.AATCelebrate) return;
    if (root.AATCelebrate.AT.indexOf(S.streak) === -1) return;
    root.AATCelebrate.fire('a1', S.streak, S.streak + ' in a row');
  }

  function scrollNextIntoView(el) {
    if (typeof window === 'undefined' || !el || !el.querySelector) return;
    var b = el.querySelector('[data-a1="nextq"]');
    if (!b || !b.scrollIntoView) return;
    var calm = false;
    try { calm = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (e) {}
    try { b.scrollIntoView({ behavior: calm ? 'instant' : 'smooth', block: 'end' }); }
    catch (e) { try { b.scrollIntoView(false); } catch (e2) {} }
  }

  /* A click on the actions that MOVE the reader, and on nothing else. Written
     out rather than derived: a list of what makes a noise is a thing to read
     and argue with. Grading is deliberately absent, so a right answer is never
     a click and a chime at once. */
  var NAV_SOUNDS = {
    open: 1, next: 1, back: 1, nextq: 1, mocknext: 1,
    startpractice: 1, startmock: 1, practice: 1, retry: 1,
    topath: 1, jump: 1, step: 1, stepall: 1,
    review: 1, reviewall: 1, reviewwrong: 1, reviewq: 1,
    reviewnext: 1, reviewprev: 1, reviewback: 1, reviewlist: 1,
  };

  function gradeAnswer(q) {
    var t = (q && q.type) || 'mcq';
    if (t === 'mcq') return S.picked === q.ans;
    if (t === 'truefalse') {
      return (q.statements || []).every(function (st, i) { return S.tfPicks[i] === st.answer; });
    }
    if (t === 'gapfill') {
      return (q.gaps || []).every(function (g, i) { return S.gapPicks[i] === g.answer; });
    }
    if (t === 'picklist') {
      return !!(root.AATGrid && root.AATGrid.gradePicklist(shownPicklist(q), S.plPicks).right);
    }
    if (t === 'entrygrid') {
      return !!(root.AATGrid && root.AATGrid.gradeEntry(q, S.egCells).right);
    }
    if (t === 'match') {
      return (q.left || []).every(function (_, i) { return S.matchPicks[i] === i; });
    }
    if (t === 'ordering') {
      /* Guarded because a mock can reach this question without the renderer
         having dealt a sequence — the clock can run out on a question never
         drawn, and the paper is still marked. No sequence is no answer. */
      return !!S.orderSeq && S.orderSeq.every(function (v, i) { return v === i; });
    }
    if (t === 'numeric') {
      var g = num(S.numInput);
      return g !== null && Math.abs(g - q.answer) < 0.005;
    }
    return false;
  }

  function finish() {
    var checks = currentQuestions();
    var pct = checks.length ? Math.round((S.score / checks.length) * 100) : 100;
    /* THREE MODES, TESTED BY NAME. This was `mode !== 'practice'`, which meant
       "a lesson" for as long as there were two modes; the mock added a third,
       and reaching this with it would have written a lesson result under a null
       lesson id — ticking a rung on the ladder for a step never opened. A new
       mode must not be able to fall into the lesson branch by default. */
    if (S.mode === 'lesson') {
      var prev = rec(S.lessonId);
      data.lessons[S.lessonId] = { best: Math.max(pct, prev ? prev.best : 0) };
      data.xp += S.score * 5 + (pct >= 60 ? 20 : 0);
    } else if (S.mode === 'mock') {
      data.practice.mocks = (data.practice.mocks || 0) + 1;
      /* Best mock, as a percentage. Monotonic, so it merges between devices by
         the same MAX rule as everything else in this record. */
      data.practice.mockBest = Math.max(data.practice.mockBest || 0, pct);
      data.xp += S.score * 4;
    } else {
      data.xp += S.score * 3;
      data.practice.runs = (data.practice.runs || 0) + 1;
    }
    save();
    /* The clock can run out while the guard is open — it keeps ticking, and its
       interval calls finish() directly. Without this the result screen would
       paint with "Leave the mock?" still sitting on top of it, offering to
       abandon a paper that has already been marked. */
    S.confirmExit = false;
    S.screen = 'done';
  }

  /* ── Reviewing the paper just sat ──────────────────────────────────────────
     A mock tells you nothing while you sit it, which is the whole point, and
     would otherwise tell you nothing afterwards either beyond a score and a
     table by outcome. "Which ones did I get wrong, and why" is the question a
     paper exists to answer, and answering it needs the answers themselves.

     WHAT IS KEPT, AND WHY IT IS MORE THAN A VERDICT. The report already knew
     each question was right or wrong. Replaying one needs what the reader
     actually PUT — and the order they saw it in, because options, statements
     and match targets are shuffled per question and "I picked B" means nothing
     against a different shuffle.

     RE-MARKED RATHER THAN REMEMBERED. The review restores the recorded answer
     and then runs it back through gradeAnswer(), the same function that marked
     the paper. So what the review shows cannot drift from what was scored:
     there is one marker, not two.

     IN MEMORY, NOT IN THE STORE. Progress merges between devices field by
     field — numbers by MAX, booleans by OR (see progress-backup.js) — and a sat
     paper is neither. Merging two devices' papers would splice one reader's
     answers into another's questions. The durable half of this already exists
     and merges correctly: every mock question goes through recordQuestion(), so
     the ones missed come back through the mistakes backlog on the practice
     screen. This is the post-mortem, and it lasts as long as the result screen
     it is opened from. */

  function copyMap(o) {
    var out = {};
    Object.keys(o || {}).forEach(function (k) { out[k] = o[k]; });
    return out;
  }

  /* Everything the reader put into the question on screen, and the order they
     saw it in. Taken at the moment they move on, which under exam conditions is
     the moment the answer becomes final. */
  function snapshotAnswer() {
    return {
      picked: S.picked,
      tf: copyMap(S.tfPicks),
      gaps: copyMap(S.gapPicks),
      match: copyMap(S.matchPicks),
      order: S.orderSeq ? S.orderSeq.slice() : null,
      orderMoved: S.orderMoved,
      num: S.numInput,
      pl: copyMap(S.plPicks),
      plOrder: S._plOrder,
      eg: copyMap(S.egCells),
      shuffle: S._order,
    };
  }

  function restoreAnswer(a) {
    /* Cleared first, so a question the reader never reached shows as blank
       rather than wearing the previous one's answers. */
    resetQState();
    if (!a) return;
    S.picked = a.picked;
    S.tfPicks = copyMap(a.tf);
    S.gapPicks = copyMap(a.gaps);
    S.matchPicks = copyMap(a.match);
    S.orderSeq = a.order ? a.order.slice() : null;
    S.orderMoved = !!a.orderMoved;
    S.numInput = a.num || '';
    S.plPicks = copyMap(a.pl);
    S._plOrder = a.plOrder || null;
    S.egCells = copyMap(a.eg);
    S._order = a.shuffle;
  }

  /* Did the reader put anything at all?

     A blank has to be named, and multiple choice is why. An unanswered question
     replays with the key marked correct and nothing marked wrong — which is
     exactly how a question answered CORRECTLY replays. Without this the two are
     indistinguishable, and the reader would read a run of blanks as a run of
     right answers. */
  function gaveAnswer(q, a) {
    if (!a) return false;
    var t = (q && q.type) || 'mcq';
    if (t === 'mcq') return a.picked !== null && a.picked !== undefined;
    if (t === 'truefalse') return Object.keys(a.tf || {}).length > 0;
    if (t === 'gapfill') return Object.keys(a.gaps || {}).length > 0;
    if (t === 'match') return Object.keys(a.match || {}).length > 0;
    /* Ordering is dealt pre-arranged, so the sequence on screen is never empty
       and cannot stand in for an attempt. Only a move counts. */
    if (t === 'ordering') return !!a.orderMoved;
    if (t === 'numeric') return num(a.num) !== null;
    if (t === 'picklist') return Object.keys(a.pl || {}).length > 0;
    /* A cell holding only spaces is not an answer. `num` returns null for it,
       which is the same test the grader applies, so a paper cannot report as
       attempted something the grading treats as blank. */
    if (t === 'entrygrid') {
      return Object.keys(a.eg || {}).some(function (k) { return num(a.eg[k]) !== null; });
    }
    return false;
  }

  function isReview() { return S.mode === 'review'; }

  /* One row of the paper. `mockResults` runs out before `practiceQs` on a paper
     the clock ended, so a question never reached has no record and is reported
     as such rather than as an answer nobody can account for. */
  function reviewRow(i) {
    var q = (S.practiceQs || [])[i];
    var r = (S.mockResults || [])[i] || null;
    return {
      i: i, q: q,
      reached: !!r,
      correct: !!(r && r.correct),
      blank: !r || !gaveAnswer(q, r.given),
      given: r ? r.given : null,
    };
  }
  function reviewRows() {
    return (S.practiceQs || []).map(function (_, i) { return reviewRow(i); });
  }
  /* The questions the arrows step through: the whole paper, or just what went
     wrong when the filter is on — so "next" from a wrong answer reaches the
     next wrong answer rather than the next question. */
  function reviewSeq() {
    return reviewRows()
      .filter(function (r) { return !S.reviewWrongOnly || !r.correct; })
      .map(function (r) { return r.i; });
  }

  function openReviewQ(i) {
    var row = reviewRow(i);
    if (!row.q) return;
    restoreAnswer(row.given);
    /* The same marker that scored the paper, run again on the same input. */
    S.answered = gradeAnswer(row.q);
    S.reviewIdx = i;
    S.reviewLast = i;
  }

  /* Out of a paper and back to the practice screen. Stopping the clock is the
     load-bearing half: an interval left running fires a finish() over whatever
     screen the reader has moved on to. */
  /* ── The guard's keyboard ───────────────────────────────────────────────────
     A dialog that says aria-modal="true" has to behave like one, and the first
     version did not: it listened on the backdrop, so Escape worked only while
     focus was still inside. Two presses of Tab put focus on the header's theme
     toggle — the dialog said the page behind it was inert while letting the
     reader walk straight out into it — and from there Escape reached nothing.

     So the listener is on the document, in the CAPTURE phase, and Tab cycles
     inside the box. Escape can only mean the safe choice: no dialog should
     destroy anything on a key pressed to make it go away. Installed once and
     inert whenever the guard is down, rather than added and removed around a
     screen that repaints every second — a listener whose removal depends on a
     later repaint is a listener that outlives its dialog.

     stopPropagation as well as preventDefault, so app.js's own key handling
     never sees a keystroke the dialog has answered. */
  var _guardKeysOn = false;
  function ensureGuardKeys() {
    if (_guardKeysOn || typeof document === 'undefined' || !document.addEventListener) return;
    _guardKeysOn = true;
    document.addEventListener('keydown', function (e) {
      if (!S.confirmExit) return;
      var box = _host && _host.querySelector && _host.querySelector('.a1-guard');
      if (!box) return;
      if (e.key === 'Escape' || e.key === 'Esc') {
        e.preventDefault(); e.stopPropagation();
        handle('exitcancel', box);
        return;
      }
      if (e.key !== 'Tab') return;
      var btns = box.querySelectorAll ? box.querySelectorAll('button') : null;
      if (!btns || btns.length < 2) return;
      e.preventDefault(); e.stopPropagation();
      var at = -1;
      for (var i = 0; i < btns.length; i++) if (btns[i] === document.activeElement) at = i;
      /* Focus outside the box — the reader clicked the header, which sits above
         the backdrop — is pulled back to the safe choice rather than advanced
         from nowhere. */
      var to = at < 0 ? 0 : (at + (e.shiftKey ? -1 : 1) + btns.length) % btns.length;
      if (btns[to] && btns[to].focus) { try { btns[to].focus(); } catch (err) {} }
    }, true);
  }

  function leaveMock() {
    stopMockClock();
    S.mode = 'practice';
    S.screen = 'practice';
    return rerender();
  }

  function wire(el) {
    _host = el;
    el.querySelectorAll('[data-a1]').forEach(function (n) {
      var act = n.getAttribute('data-a1');
      /* A <select> announces itself with `change`, not `click`, so it is wired
         here beside the text inputs rather than with the buttons below. */
      if (act === 'plpick') {
        n.addEventListener('change', function () {
          var r = +n.getAttribute('data-r');
          if (n.value === '') delete S.plPicks[r]; else S.plPicks[r] = +n.value;
        });
        return;
      }
      if (act === 'egcell') {
        /* `calcCell` on the keystroke as well as on focus: a soft keyboard can
           put a caret in a field without the focus order a desktop would give. */
        n.addEventListener('input', function () {
          S.egCells[n.getAttribute('data-c')] = n.value;
          S.calcCell = n.getAttribute('data-c');
        });
        n.addEventListener('focus', function () { S.calcCell = n.getAttribute('data-c'); });
        return;
      }
      if (act === 'tryinput' || act === 'numinput') {
        n.addEventListener('input', function () {
          if (act === 'tryinput') S.tryInput = n.value; else S.numInput = n.value;
        });
        n.addEventListener('keydown', function (e) {
          if (e.key === 'Enter') {
            e.preventDefault();
            var b = el.querySelector('[data-a1="' + (act === 'tryinput' ? 'trycheck' : 'numsubmit') + '"]');
            if (b) b.click();
          }
        });
        return;
      }
      n.addEventListener('click', function (e) { handle(act, n, e); });
    });
  }

  /* GHOST-TAP GUARD. Advancing rerenders synchronously, so the second click
     of a double-tap lands on whatever new button now sits at the same
     coordinates — in a mock that grades the next, untouched question as
     blank, with no way back. Level 2 suppresses option clicks for 350ms
     after a transition (app.js), and this is the same rule for this module.
     Only trusted events are suppressed: the check scripts click
     programmatically, back to back, and must not be throttled. */
  var GUARD_MS = 350;
  var lastAdvanceAt = 0;
  var GUARDED_ACTS = { ans: 1, tf: 1, tfsubmit: 1, gap: 1, gapsubmit: 1,
    numsubmit: 1, matchl: 1, matchr: 1, matchsubmit: 1, orderup: 1,
    orderdown: 1, ordersubmit: 1, trycheck: 1, mocknext: 1, nextq: 1, next: 1,
    /* The two new submits belong here for the same reason every other submit
       does: advancing repaints synchronously, so the second tap of a
       double-tap lands on whatever button has taken the same coordinates on
       the next question. */
    plsubmit: 1, egsubmit: 1 };

  function num(v) {
    var s = String(v == null ? '' : v).replace(/[£,\s]/g, '');
    if (s === '' || isNaN(Number(s))) return null;
    return Number(s);
  }

  /* THE LEVEL NEEDS ITS OWN SWITCH. Level 2 keeps the sound toggle on its home
     tab, which a reader inside this module can never reach — it renders every
     screen itself. Shipping a noise with no way to stop it is worse than
     shipping no noise, so the control lives on the path, the one screen every
     reader passes through. It writes the SHARED preference, so silencing
     Level 1 silences the app. */
  function soundRow() {
    if (!root.AATSound) return '';
    var on = root.AATSound.isEnabled();
    return '<button class="a1-soundrow" data-a1="soundtoggle" type="button" ' +
      'role="switch" aria-checked="' + (on ? 'true' : 'false') + '">' +
      '<span class="a1-soundrow-i" aria-hidden="true">' + (on ? '\uD83D\uDD0A' : '\uD83D\uDD07') + '</span>' +
      '<span class="a1-soundrow-l">Sound effects</span>' +
      '<span class="a1-soundrow-s' + (on ? ' is-on' : '') + '" aria-hidden="true"></span>' +
      '</button>';
  }

  function handle(act, n, evt) {
    if (GUARDED_ACTS[act] && evt && evt.isTrusted && Date.now() - lastAdvanceAt < GUARD_MS) return;
    if (act === 'mocknext' || act === 'nextq' || act === 'next') lastAdvanceAt = Date.now();
    /* Turning sound OFF must not make a sound, and turning it on should — which
       is why this sits above the navigation click rather than in its list. */
    if (act === 'soundtoggle') {
      if (root.AATSound) {
        /* THE ORDER IS THE WHOLE TRICK. Flip the preference first, then beep:
           beep() already respects the preference, so switching ON is audible
           and switching OFF is silent, with no condition to write. Beeping
           before the flip would play a click at the exact moment a reader
           asked for quiet. */
        root.AATSound.setEnabled(!root.AATSound.isEnabled());
        beep('click');
      }
      return rerender();
    }
    if (NAV_SOUNDS[act]) beep('click');

    /* No rerender on a keypress. The calculator patches its own display node in
       place, and a full repaint here would take the caret out of the answer box
       the reader is about to type into. */
    if (act === 'calckey') {
      var CK = Calc();
      if (CK) CK.press(n.getAttribute('data-k'), n.getAttribute('data-v'));
      return;
    }
    if (act === 'calctoggle') { S.calcOpen = !S.calcOpen; return rerender(); }
    if (act === 'calcuse') { return calcUse(); }

    var l = lessonById(S.lessonId);
    var cards = (l && l.cards) || [], checks = currentQuestions();
    var card = cards[S.cardIdx] || {};
    var q = checks[S.qIdx];

    if (act === 'open') { startLesson(n.getAttribute('data-id')); return rerender(); }
    if (act === 'exit') {
      /* A mock is the only run worth guarding. A lesson can be reopened from
         the ladder and a practice run banks each answer as it goes, so backing
         out of either costs the reader nothing they cannot get back in a tap;
         a timed paper is ninety minutes that cannot be resumed.

         Only while the paper is being SAT, though. The result screen is reached
         with the mode still 'mock' — that is what tells renderDone() to
         withhold the verdict until the reader asks for the review — and by then
         the paper is marked and banked. Guarding there would ask the reader to
         confirm losing something they cannot lose, which is how a warning
         becomes furniture.

         The clock goes on running underneath the dialog, which is the honest
         thing for it to do: hesitating in an exam costs time. */
      if (isMock()) {
        if (S.screen === 'quiz') { S.confirmExit = true; return rerender(); }
        return leaveMock();
      }
      /* An endless run has no last question, so leaving IS finishing it — and a
         reader who has answered twenty deserves to see how they did rather than
         being dropped back on the picker with nothing. */
      if (isEndless() && S.screen === 'quiz') { endEndless(); return rerender(); }
      S.screen = S.mode === 'practice' ? 'practice' : 'path';
      return rerender();
    }
    if (act === 'exitcancel') { S.confirmExit = false; return rerender(); }
    if (act === 'exitconfirm') { S.confirmExit = false; return leaveMock(); }
    if (act === 'retry') {
      /* Named modes again. `else startLesson(S.lessonId)` meant "a lesson" only
         while there were two modes; a mock falling into it would have reopened
         a null lesson. The mock's result screen offers no Retry — sitting
         another is starting a new paper, not repeating this one — but the
         handler must still be safe if one is ever reached. */
      if (S.mode === 'mock') startMock();
      else if (S.mode === 'practice') startPractice(S.practiceLo);
      else startLesson(S.lessonId);
      return rerender();
    }
    if (act === 'startmock') { startMock(); return rerender(); }

    /* ── The review of a finished paper ─────────────────────────────────────
       `mode` moves to 'review' rather than staying 'mock', because the graded
       screen is drawn by asking isMock() whether to withhold the verdict — and
       a review is nothing but the verdict. Returning to the result puts it
       back, so that screen still reads as the mock's. */
    if (act === 'review') {
      S.mode = 'review'; S.screen = 'review';
      S.reviewIdx = null; S.reviewLast = null; S.reviewWrongOnly = false;
      return rerender();
    }
    if (act === 'reviewback') { S.mode = 'mock'; S.screen = 'done'; S.reviewIdx = null; return rerender(); }
    if (act === 'reviewlist') { S.reviewIdx = null; return rerender(); }
    if (act === 'reviewq') { openReviewQ(+n.getAttribute('data-i')); return rerender(); }
    if (act === 'reviewall' || act === 'reviewwrong') {
      S.reviewWrongOnly = act === 'reviewwrong';
      S.reviewIdx = null;
      return rerender();
    }
    if (act === 'reviewprev' || act === 'reviewnext') {
      var rseq = reviewSeq();
      var rat = rseq.indexOf(S.reviewIdx) + (act === 'reviewnext' ? 1 : -1);
      if (rat >= 0 && rat < rseq.length) openReviewQ(rseq[rat]);
      return rerender();
    }
    if (act === 'practice') { S.mode = 'practice'; S.screen = 'practice'; return rerender(); }
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
      var target = _host && _host.querySelector && _host.querySelector('#a1-oc-' + jo);
      if (target && target.scrollIntoView) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    if (act === 'topath') { S.mode = 'lesson'; S.screen = 'path'; return rerender(); }
    if (act === 'startpractice') {
      var lo = n.getAttribute('data-lo');
      /* Only an OUTCOME becomes a number; every named mode passes through. The
         previous form listed the two names it knew, so any new one became NaN
         and started a run of no questions in silence. */
      startPractice(/^\d+$/.test(lo) ? Number(lo) : lo);
      return rerender();
    }

    if (act === 'step') { S.revealed++; return rerender(); }
    if (act === 'stepall') { S.revealed = (card.worked.steps || []).length; return rerender(); }
    if (act === 'trycheck') {
      var want = card.worked.tryIt.answer;
      var got = num(S.tryInput);
      S.tryResult = got !== null && Math.abs(got - want) < 0.005;
      if (S.tryResult) { data.xp += 5; save(); }
      beep(S.tryResult ? 'correct' : 'wrong');
      return rerender();
    }

    if (act === 'back') { S.cardIdx = Math.max(0, S.cardIdx - 1); resetCardState(); return rerender(); }
    if (act === 'next') {
      if (S.cardIdx === cards.length - 1) {
        /* Nothing to answer on a sheet, so nothing to be right about. */
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
      return settle(q);
    }
    if (act === 'tf') {
      S.tfPicks[+n.getAttribute('data-s')] = n.getAttribute('data-v') === 'true';
      return rerender();
    }
    if (act === 'tfsubmit') {
      if (Object.keys(S.tfPicks).length < q.statements.length) return;
      return settle(q);
    }
    if (act === 'gap') {
      S.gapPicks[+n.getAttribute('data-g')] = +n.getAttribute('data-o');
      return rerender();
    }
    if (act === 'gapsubmit') {
      if (Object.keys(S.gapPicks).length < q.gaps.length) return;
      return settle(q);
    }

    /* Match: select on the left, then pair on the right. Clicking a left item
       that is already paired unpairs it, which is the only undo a beginner
       reaches for. */
    if (act === 'matchl') {
      var li = +n.getAttribute('data-i');
      if (S.matchPicks[li] !== undefined) { delete S.matchPicks[li]; S.matchSel = li; }
      else S.matchSel = S.matchSel === li ? null : li;
      return rerender();
    }
    if (act === 'matchr') {
      var ri = +n.getAttribute('data-i');
      /* Tapping a right item that is already spoken for frees it, so a reader
         who mispaired early is never stuck. */
      Object.keys(S.matchPicks).forEach(function (k) {
        if (S.matchPicks[k] === ri) delete S.matchPicks[k];
      });
      if (S.matchSel !== null) { S.matchPicks[S.matchSel] = ri; S.matchSel = null; }
      return rerender();
    }
    if (act === 'matchclear') { S.matchPicks = {}; S.matchSel = null; return rerender(); }
    if (act === 'matchsubmit') {
      if (Object.keys(S.matchPicks).length < q.left.length) return;
      return settle(q);
    }

    if (act === 'orderup' || act === 'orderdown') {
      var pos = +n.getAttribute('data-i');
      var to = act === 'orderup' ? pos - 1 : pos + 1;
      if (to < 0 || to >= S.orderSeq.length) return;
      var tmp2 = S.orderSeq[pos]; S.orderSeq[pos] = S.orderSeq[to]; S.orderSeq[to] = tmp2;
      /* The reader has now arranged this rather than been dealt it, which is
         the only thing that separates an answer from an untouched shuffle. */
      S.orderMoved = true;
      return rerender();
    }
    if (act === 'ordersubmit') { return settle(q); }

    if (act === 'numsubmit') { return settle(q); }
    /* NO "answer every row first" GUARD, unlike gap-fill. Every row of a table
       is visible at once, so a blank row is a considered answer as often as an
       oversight — and the assessment marks it wrong rather than refusing it. */
    if (act === 'plsubmit' || act === 'egsubmit') { return settle(q); }
    /* Moving on IS answering, under exam conditions. The question is graded
       here, silently, and the reader is told nothing until the paper is over —
       so this carries the same recording the practice path does, plus the
       per-question result the report and the review are built from. A question
       left blank grades as wrong, which is what the assessment does with it. */
    if (act === 'mocknext') {
      var mCorrect = gradeAnswer(q);
      if (mCorrect) S.score++; else S.practiceMissed.push(q);
      S.mockResults.push({ id: q.id, lo: q.lo, correct: mCorrect, given: snapshotAnswer() });
      recordPractice(q.lo, mCorrect);
      recordQuestion(q.id, mCorrect);
      save();
      if (S.qIdx === checks.length - 1) { stopMockClock(); finish(); }
      else { S.qIdx++; resetQState(); }
      return rerender();
    }
    if (act === 'nextq') {
      /* Recorded here rather than in each of the six grading paths, so a new
         question type cannot be added without its misses being counted.

         `answered !== null` because a graded answer is what makes this an
         attempt. The button only renders once the question has been graded, so
         today this cannot be reached ungraded — but the count is only honest
         while that stays true, so it is a condition here rather than a
         property of the renderer. */
      if (S.mode === 'practice' && q && S.answered !== null) {
        if (S.answered === false) S.practiceMissed.push(q);
        recordPractice(q.lo, S.answered === true);
        /* Only practice questions have ids. A lesson check has no identity of
           its own to remember, and the lesson it belongs to is already tracked
           by its own progress record. */
        recordQuestion(q.id, S.answered === true);
        /* Written now rather than at the end of the run. A reader who answers
           six questions and then leaves has attempted six questions, and the
           record that claims to count what they attempted has to agree. */
        save();
      }
      /* The streak is the endless run's only sense of position, so it is kept
         for every practice run and merely displayed by that one. */
      if (S.mode === 'practice' && S.answered !== null) {
        if (S.answered === true) { S.streak++; if (S.streak > S.bestStreak) S.bestStreak = S.streak; }
        else S.streak = 0;
        markStreak();
      }
      if (isEndless()) {
        if (S.qIdx >= checks.length - 2) topUpEndless();
        S.qIdx++; resetQState();
        return rerender();
      }
      if (S.qIdx === checks.length - 1) finish();
      else { S.qIdx++; resetQState(); }
      return rerender();
    }
  }

  load();

  /* ── The two lifecycle hooks the shared chrome calls ────────────────────────
     app.js owns the header and knows nothing about `S`; these are how it asks.
     Both are no-ops on any subject that does not define them, so the chrome
     does not need to know which subjects render themselves.

     `home` is the header's 🏠 button. Without it that button sets a screen this
     module does not read and render() remounts whatever was already there — so
     it did nothing at all from inside a lesson, a practice run or a mock.

     `suspend` is "you are being switched away from". The mock's clock is an
     interval that outlives the screen: it stops itself when the mode or the
     screen changes, and switching subject changes neither, so it would keep
     ticking under French and paint a Level 1 result over it ninety minutes
     later. */
  /* ── The platform back button ───────────────────────────────────────────────
     `atRoot` says whether there is anywhere left to go back TO inside this
     module; `back` takes one step, and takes exactly the step the on-screen
     back button takes — including the mock's guard, which is the one place
     where leaving costs something that cannot be recovered. Routing the
     gesture through the same handler is what keeps the two from drifting into
     different rules. */
  function atRoot() {
    /* The guard dialog counts as somewhere: back should dismiss it rather
       than answering it, the way Escape does. */
    if (S.confirmExit) return false;
    return S.screen === 'path';
  }
  /* THE ACTION EACH SCREEN'S OWN BACK BUTTON CARRIES, screen by screen.

     The first version delegated everything to `exit`, which is written for
     leaving a RUN and recomputes the same screen when it is already on the
     picker — so back from the practice picker did nothing at all and the
     reader pressed it twice to leave the app. Mapping the screens is what
     makes the gesture and the button provably the same thing: each entry here
     is the `data-a1` value on that screen's back control. */
  var BACK_ACTION = {
    lesson:   'exit',
    practice: 'topath',
    quiz:     'exit',
    done:     'topath',
  };
  function back() {
    if (S.confirmExit) { S.confirmExit = false; return rerender(); }
    if (S.screen === 'path') return;
    /* Review is two screens behind one name: the list, and one question out of
       it. */
    if (S.screen === 'review') {
      return handle(S.reviewIdx === null ? 'reviewback' : 'reviewlist', null, null);
    }
    var a = BACK_ACTION[S.screen];
    if (!a) { S.screen = 'path'; return rerender(); }
    return handle(a, null, null);
  }

  root.AAT1_UI = {
    mount: mount,
    atRoot: atRoot,
    back: back,
    /* `screen` is optional and defaults to the ladder, which is the only thing
       the app itself ever wants. It is settable so the build checks can mount
       the practice picker directly rather than asserting a regex against this
       file and calling that a test. */
    reset: function (screen) { stopMockClock(); S.confirmExit = false; S.screen = screen || 'path'; },
    home: function () {
      stopMockClock();
      /* The header's Home button leaves a mock outright, so the guard must not
         survive it: left set, it would reappear over the ladder the next time
         anything repainted, asking about a paper that no longer exists. */
      S.confirmExit = false;
      S.mode = 'lesson';
      S.lessonId = null;
      S.screen = 'path';
    },
    suspend: function () { stopMockClock(); S.confirmExit = false; },
    /* ── The header's Home button, asked before it acts ───────────────────────
       app.js owns the header and cannot know whether leaving costs anything —
       only this module knows a timed paper is on screen. Returns true when it
       has raised its own guard and app.js should stand down; false to be taken
       home as before. Without this the in-screen back button warned and the
       🏠 beside it discarded the paper silently, which is a worse trap than no
       warning at all: it teaches the reader that leaving is guarded. */
    guardExit: function () {
      if (!isMock() || S.screen !== 'quiz') return false;
      S.confirmExit = true;
      return true;
    },
  };
}(typeof self !== 'undefined' ? self : this));
