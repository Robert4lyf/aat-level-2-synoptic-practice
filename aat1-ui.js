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
    screen: 'path',      // 'path' | 'lesson' | 'practice' | 'quiz' | 'done'
    mode: 'lesson',      // 'lesson' | 'practice' — which set the answer handlers read
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
    matchPicks: {},      // left index → right index
    matchSel: null,      // left index currently selected, awaiting a right click
    orderSeq: null,      // working order, as indices into q.items
    numInput: '',
    score: 0,
    revealed: 0,         // worked-example steps shown
    tryInput: '',
    tryResult: null,
  };

  var data = { lessons: {}, xp: 0 };

  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        var p = JSON.parse(raw);
        data.lessons = p.lessons || {};
        data.xp = p.xp || 0;
      }
    } catch (e) { /* corrupt storage: start clean rather than fail to render */ }
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
  function currentQuestions() {
    if (S.mode === 'practice') return S.practiceQs;
    var l = lessonById(S.lessonId);
    return (l && l.check) || [];
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
      h += '<tbody>' + (c.table.rows || []).map(function (r) {
        return '<tr>' + r.map(function (x, i) {
          return '<td' + (i ? '' : ' class="a1-td-lead"') + '>' + md(x) + '</td>';
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
  function renderPath() {
    var groups = path();
    if (!groups.length) return '<div class="a1-empty">Level 1 content is still loading.</div>';
    var ls = lessons();
    var doneN = ls.filter(function (l) { return isDone(l.id); }).length;
    var pct = ls.length ? Math.round((doneN / ls.length) * 100) : 0;
    var cov = coverage();
    var u = unit();
    var nx = nextLesson();
    var started = doneN > 0;

    var h = '<div class="a1-root">';

    /* Two decisions here, both from bugs the browser found.
       The banner CONTAINS the eyebrow and title rather than sitting behind them
       as a fixed-height band: the band cut through the first line of the lede
       as soon as the title wrapped, which it does at any narrow width.
       And this is a <section>, not a <header>, because styles.css styles the
       bare `header` element for the app chrome — `display: flex` and
       `padding: 14px 28px` — and that reached in here, turning the banner into a
       shrink-to-fit flex item indented by 28px. Level 1 owns no global
       selectors, so the fix is to stop matching one. */
    h += '<section class="a1-hero">' +
      '<div class="a1-hero-top">' +
      '<div class="a1-eyebrow">AAT Level 1 Award in Bookkeeping</div>' +
      '<h1 class="a1-title">Bookkeeping Fundamentals</h1>' +
      '</div>' +
      '<div class="a1-hero-in">' +
      '<p class="a1-lede">The first step. No prior knowledge assumed — this starts at what a bookkeeper is for and ends with you reading a bank statement against a cash book.</p>' +
      '<div class="a1-chips">' +
        (u ? '<span class="a1-chip">' + u.assessment.durationMinutes + '-minute assessment</span>' : '') +
        (u ? '<span class="a1-chip">' + u.glh + ' guided hours</span>' : '') +
        '<span class="a1-chip">' + ls.length + ' steps</span>' +
        '<span class="a1-chip a1-chip-accent">' + data.xp + ' XP</span>' +
      '</div>' +
      (nx ? '<button class="a1-start" data-a1="open" data-id="' + esc(nx.id) + '">' +
        '<span class="a1-start-k">' + (started ? 'Continue' : 'Start here') + '</span>' +
        '<span class="a1-start-t">Step ' + stepNo(nx.id) + ' · ' + esc(nx.title) + '</span>' +
        '</button>' : '') +
      '<div class="a1-progress"><div class="a1-progress-bar"><span style="width:' + pct + '%"></span></div>' +
        '<div class="a1-progress-meta"><span>' + doneN + ' of ' + ls.length + ' steps done</span>' +
        (cov ? '<span>' + cov.studied + ' of ' + cov.total + ' scope items studied</span>' : '') + '</div></div>' +
      '</div></section>';

    if (practiceBank().length) {
      h += '<button class="a1-practice-cta" data-a1="practice">' +
        '<span class="a1-practice-i" aria-hidden="true">✓</span>' +
        '<span class="a1-practice-tx">' +
          '<span class="a1-practice-t">Practice questions</span>' +
          '<span class="a1-practice-m">' + practiceBank().length +
            ' questions, mixed or by outcome</span>' +
        '</span>' +
        '<span class="a1-practice-go" aria-hidden="true">→</span>' +
        '</button>';
    }

    /* The ladder — one band per outcome, continuous step numbering throughout. */
    var n = 0;
    groups.forEach(function (g) {
      h += '<div class="a1-outcome">' +
        '<div class="a1-outcome-top">' +
          '<span class="a1-outcome-n">Outcome ' + esc(g.outcome) + '</span>' +
          (g.weighting ? '<span class="a1-outcome-w">' + g.weighting + '% of the assessment</span>' : '') +
        '</div>' +
        '<h2 class="a1-outcome-t">' + esc(g.outcomeTitle) + '</h2>' +
        (g.blurb ? '<p class="a1-outcome-b">' + md(g.blurb) + '</p>' : '') +
        '</div>';
      h += '<ol class="a1-ladder">';
      (g.lessons || []).forEach(function (l) {
        n++;
        h += rungHtml(l, n);
      });
      var sh = sheetOf(g);
      if (sh) h += rungHtml(sh, null);
      h += '</ol>';
    });

    h += '<footer class="a1-foot">Independent study tool. Not affiliated with, endorsed by, or officially associated with AAT.</footer>';
    return h + '</div>';
  }

  function rungHtml(l, n) {
    var k = l.isSheet ? 'sheet' : kindOf(l);
    var meta = KIND_META[k];
    var done = !l.isSheet && isDone(l.id);
    var st = l.isSheet ? 0 : stars(l.id);
    return '<li class="a1-rung' + (done ? ' is-done' : '') + (l.isSheet ? ' a1-rung-sheet' : '') + '">' +
      '<div class="a1-rung-rail" aria-hidden="true"><span class="a1-rung-n">' +
        (l.isSheet ? '🗂️' : (done ? '✓' : n)) + '</span></div>' +
      '<button class="a1-rung-card" data-a1="open" data-id="' + esc(l.id) + '"' +
        ' aria-label="' + (l.isSheet ? '' : 'Step ' + n + ': ') + esc(l.title) + (done ? ', completed' : '') + '">' +
        '<span class="a1-rung-head">' +
          '<span class="a1-rung-kind a1-kind-' + k + '">' + esc(meta.glyph) + ' ' + esc(meta.label) + '</span>' +
          (st ? '<span class="a1-stars" aria-label="' + st + ' of 3 stars">' +
            [1, 2, 3].map(function (x) { return '<span class="' + (x <= st ? 'on' : '') + '">★</span>'; }).join('') + '</span>' : '') +
        '</span>' +
        '<span class="a1-rung-title">' + esc(l.title) + '</span>' +
        (l.summary ? '<span class="a1-rung-sum">' + esc(l.summary) + '</span>' : '') +
        '<span class="a1-rung-meta">' + (l.isSheet
          ? 'Everything in this outcome, on one page'
          : (l.cards || []).length + ' pages · ' + (l.check || []).length + ' questions') + '</span>' +
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

    var h = '<div class="a1-root a1-reading">';
    h += '<div class="a1-lessonbar">' +
      '<button class="a1-btn a1-btn-ghost a1-exit" data-a1="exit">Exit</button>' +
      '<div class="a1-lessonbar-mid">' +
        '<div class="a1-lessonbar-t">' + (l.isSheet ? '' : 'Step ' + stepNo(l.id) + ' · ') + esc(l.title) + '</div>' +
        '<div class="a1-lessonbar-p"><span style="width:' + pct + '%"></span></div>' +
      '</div>' +
      '<div class="a1-lessonbar-n">' + (pos + 1) + '/' + total + '</div></div>';

    h += '<article class="a1-sheet">';
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
    var h = '<div class="a1-qhead">Question ' + (S.qIdx + 1) + ' of ' + n + '</div>' +
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
        }
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
      if (S.answered === null) h += '<button class="a1-btn a1-btn-primary a1-wide" data-a1="tfsubmit">Submit</button>';

    } else if (t === 'numeric') {
      if (S.answered === null) {
        h += '<div class="a1-try-row">' +
          '<input class="a1-input" inputmode="decimal" data-a1="numinput" value="' + esc(S.numInput) + '" placeholder="' + esc(q.unit || '') + '" aria-label="Your answer">' +
          '<button class="a1-btn a1-btn-primary" data-a1="numsubmit">Check</button></div>';
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
      if (S.answered === null) h += '<button class="a1-btn a1-btn-primary a1-wide" data-a1="gapsubmit">Submit</button>';

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
        h += '<div class="a1-match-actions">' +
          '<button class="a1-btn a1-btn-ghost" data-a1="matchclear">Clear</button>' +
          '<button class="a1-btn a1-btn-primary" data-a1="matchsubmit">Submit</button></div>';
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
      if (S.answered === null) h += '<button class="a1-btn a1-btn-primary a1-wide" data-a1="ordersubmit">Submit</button>';
      else h += '<div class="a1-match-key">Correct order — ' + q.items.map(function (x, i) {
        return (i + 1) + '. ' + esc(x);
      }).join(' · ') + '</div>';
    }

    if (S.answered !== null) {
      h += '<div class="a1-exp-box"><div class="a1-exp-l">Why</div><p class="a1-exp">' + md(q.exp || '') + '</p></div>' +
        '<button class="a1-btn a1-btn-primary a1-wide" data-a1="nextq">' +
        (S.qIdx === n - 1 ? 'Finish' : 'Next question') + '</button>';
    }
    return h;
  }

  function fmtAns(q) {
    if (q.unit === '£') return '£' + Number(q.answer).toFixed(2);
    return String(q.answer) + (q.unit && q.unit !== '£' ? ' ' + q.unit : '');
  }

  /* ── Done screen ─────────────────────────────────────────────────────────── */
  function renderDone() {
    var isP = S.mode === 'practice';
    var checks = currentQuestions();
    var pct = checks.length ? Math.round((S.score / checks.length) * 100) : 100;
    var st = pct >= 100 ? 3 : pct >= 80 ? 2 : pct >= 60 ? 1 : 0;
    var head = isP
      ? (pct >= 70 ? 'Solid' : pct >= 50 ? 'Some gaps' : 'Worth going back to the steps')
      : (pct >= 60 ? 'Step complete' : 'Worth another pass');

    var weak = '';
    if (isP) {
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

    return '<div class="a1-root"><div class="a1-done">' +
      '<div class="a1-done-ring" style="--p:' + pct + '"><span>' + pct + '%</span></div>' +
      '<h1 class="a1-done-h">' + head + '</h1>' +
      '<div class="a1-done-sub">' + S.score + ' of ' + checks.length + ' correct' +
        (isP ? ' · ' + (S.practiceLo === 'mix' ? 'all outcomes' : 'Outcome ' + S.practiceLo) : '') + '</div>' +
      (isP ? '' : '<div class="a1-stars a1-stars-big">' + [1, 2, 3].map(function (n) {
        return '<span class="' + (n <= st ? 'on' : '') + '">★</span>'; }).join('') + '</div>') +
      weak + onward +
      '<div class="a1-done-actions">' +
        '<button class="a1-btn a1-btn-primary" data-a1="exit">' +
          (isP ? 'More practice' : 'Back to the steps') + '</button>' +
        '<button class="a1-btn a1-btn-ghost" data-a1="retry">Retry</button>' +
        (isP ? '<button class="a1-btn a1-btn-ghost" data-a1="topath">Back to the steps</button>' : '') +
      '</div></div></div>';
  }

  /* ── Practice picker ─────────────────────────────────────────────────────── */
  function renderPractice() {
    var bank = practiceBank();
    var u = unit();
    var los = u ? u.outcomes : [];
    var counts = {};
    bank.forEach(function (q) { counts[q.lo] = (counts[q.lo] || 0) + 1; });

    var h = '<div class="a1-root">';
    h += '<section class="a1-hero a1-hero-sm">' +
      '<div class="a1-hero-top">' +
      '<div class="a1-eyebrow">Practice</div>' +
      '<h1 class="a1-title">Test yourself</h1>' +
      '</div>' +
      '<div class="a1-hero-in">' +
      '<p class="a1-lede">' + bank.length + ' questions · ' + PRACTICE_LEN + ' per run, drawn at random</p>' +
      '</div></section>';

    h += '<div class="a1-pgrid">';
    h += '<button class="a1-pcard a1-pcard-mix" data-a1="startpractice" data-lo="mix">' +
      '<span class="a1-pcard-k">Mixed</span>' +
      '<span class="a1-pcard-t">All five outcomes</span>' +
      '<span class="a1-pcard-m">' + bank.length + ' questions in the pool</span>' +
      '</button>';
    los.forEach(function (o) {
      var n = counts[o.n] || 0;
      if (!n) return;
      h += '<button class="a1-pcard" data-a1="startpractice" data-lo="' + o.n + '">' +
        '<span class="a1-pcard-k">Outcome ' + o.n + ' · ' + o.weighting + '%</span>' +
        '<span class="a1-pcard-t">' + esc(o.title) + '</span>' +
        '<span class="a1-pcard-m">' + n + ' questions</span>' +
        '</button>';
    });
    h += '</div>';
    h += '<div class="a1-pback"><button class="a1-btn a1-btn-ghost" data-a1="topath">Back to the steps</button></div>';
    h += '<footer class="a1-foot">Independent study tool. Not affiliated with, endorsed by, or officially associated with AAT.</footer>';
    return h + '</div>';
  }

  function renderQuiz() {
    var qs = currentQuestions();
    if (!qs.length) { S.screen = 'practice'; return renderPractice(); }
    var pct = Math.round((S.qIdx / qs.length) * 100);
    var h = '<div class="a1-root a1-reading">';
    h += '<div class="a1-lessonbar">' +
      '<button class="a1-btn a1-btn-ghost a1-exit" data-a1="exit">Exit</button>' +
      '<div class="a1-lessonbar-mid">' +
        '<div class="a1-lessonbar-t">Practice · ' + (S.practiceLo === 'mix' ? 'all outcomes' : 'Outcome ' + S.practiceLo) + '</div>' +
        '<div class="a1-lessonbar-p"><span style="width:' + pct + '%"></span></div>' +
      '</div>' +
      '<div class="a1-lessonbar-n">' + (S.qIdx + 1) + '/' + qs.length + '</div></div>';
    h += '<article class="a1-sheet">' + questionHtml(qs[S.qIdx], qs.length) + '</article></div>';
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

  /* Where the reader is, as a single comparable string. Keyed on POSITION, not
     on every render: revealing a step, pairing two items or submitting an
     answer all re-render, and none of them should yank the page to the top
     while the reader is mid-page. */
  function posKey() {
    return [S.screen, S.lessonId, S.phase, S.cardIdx, S.qIdx].join('|');
  }
  var _lastPos = null;

  function restoreScroll(el) {
    if (typeof window === 'undefined' || !window.scrollTo) return;
    if (S.screen === 'path' && S.lessonId) {
      var node = el.querySelector('[data-a1="open"][data-id="' + S.lessonId + '"]');
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
    S.qIdx = 0; S.score = 0;
    resetCardState(); resetQState();
  }
  function resetCardState() {
    S.revealed = 0; S.tryInput = ''; S.tryResult = null;
  }
  function resetQState() {
    S.answered = null; S.picked = null; S.tfPicks = {}; S.gapPicks = {};
    S.matchPicks = {}; S.matchSel = null; S.orderSeq = null;
    S.numInput = ''; S._order = null;
  }
  function finish() {
    var checks = currentQuestions();
    var pct = checks.length ? Math.round((S.score / checks.length) * 100) : 100;
    /* Practice earns XP but records no step result. Letting it write to
       data.lessons would tick rungs on the ladder for teaching never opened. */
    if (S.mode !== 'practice') {
      var prev = rec(S.lessonId);
      data.lessons[S.lessonId] = { best: Math.max(pct, prev ? prev.best : 0) };
      data.xp += S.score * 5 + (pct >= 60 ? 20 : 0);
    } else {
      data.xp += S.score * 3;
    }
    save();
    S.screen = 'done';
  }

  function wire(el) {
    _host = el;
    el.querySelectorAll('[data-a1]').forEach(function (n) {
      var act = n.getAttribute('data-a1');
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
      S.answered = S.picked === q.ans;
      if (S.answered) S.score++;
      return rerender();
    }
    if (act === 'tf') {
      S.tfPicks[+n.getAttribute('data-s')] = n.getAttribute('data-v') === 'true';
      return rerender();
    }
    if (act === 'tfsubmit') {
      if (Object.keys(S.tfPicks).length < q.statements.length) return;
      var all = q.statements.every(function (st, i) { return S.tfPicks[i] === st.answer; });
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
      var allPaired = q.left.every(function (_, i) { return S.matchPicks[i] === i; });
      S.answered = allPaired; if (allPaired) S.score++;
      return rerender();
    }

    if (act === 'orderup' || act === 'orderdown') {
      var pos = +n.getAttribute('data-i');
      var to = act === 'orderup' ? pos - 1 : pos + 1;
      if (to < 0 || to >= S.orderSeq.length) return;
      var tmp2 = S.orderSeq[pos]; S.orderSeq[pos] = S.orderSeq[to]; S.orderSeq[to] = tmp2;
      return rerender();
    }
    if (act === 'ordersubmit') {
      var right = S.orderSeq.every(function (v, i) { return v === i; });
      S.answered = right; if (right) S.score++;
      return rerender();
    }

    if (act === 'numsubmit') {
      var g2 = num(S.numInput);
      S.answered = g2 !== null && Math.abs(g2 - q.answer) < 0.005;
      if (S.answered) S.score++;
      return rerender();
    }
    if (act === 'nextq') {
      /* Recorded here rather than in each grading path, so a new question type
         cannot be added without its misses being counted. */
      if (S.mode === 'practice' && S.answered === false && q) S.practiceMissed.push(q);
      if (S.qIdx === checks.length - 1) finish();
      else { S.qIdx++; resetQState(); }
      return rerender();
    }
  }

  load();

  /* `home` is the shared header's 🏠 button — see the note on AAT3_UI.home.
     There is nothing running here to suspend, so no suspend hook. */
  root.AAT1_UI = {
    mount: mount,
    reset: function () { S.screen = 'path'; },
    home: function () { S.mode = 'lesson'; S.lessonId = null; S.screen = 'path'; },
  };
}(typeof self !== 'undefined' ? self : this));
