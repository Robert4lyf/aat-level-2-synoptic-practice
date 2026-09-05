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
    /* ── Written response ──────────────────────────────────────────────────
       See the block above writtenHtml for what this type is for. Bookkeeping is
       computer marked, so it is a study technique here rather than a rehearsal
       of a format, and the note under the box says so. */
    wrText: '',          // written: what the reader has typed
    wrShown: false,      // written: has the model answer been revealed?
    wrTicks: {},         // written: rubric index -> did the reader claim it?
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
    /* ── The glossary and its flashcards ────────────────────────────────────
       `glossQuery` is what has been typed into the search box, session-only:
       a search is a momentary act, and a reader coming back weeks later to a
       glossary filtered to one word they no longer remember typing would think
       the glossary had emptied.

       `flash` is one run of cards. Held here rather than persisted — what a run
       is worth is the SCHEDULE it writes, and that goes into the same
       per-question store every other answer does. */
    glossQuery: '',
    flash: null,
    /* Reading the card aloud. Held in state rather than read off the button,
       because every click repaints the whole screen and a class on a node that
       no longer exists is not a source of truth. */
    speaking: false,
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
  /* `lessonQs` is the mistake memory for LESSON check questions, and it sits
     OUTSIDE `practice` on purpose: the practice record is asserted untouched
     by lesson runs (see the Level 3 twin of that rule in
     check-aat3-practice-summary), and the summary's counts must stay an answer
     to "what did I practise". It merges between devices exactly as `qs` does —
     two timestamps per question under MAX. */
  var data = { lessons: {}, xp: 0, lessonQs: {}, practice: { runs: 0, mocks: 0, mockBest: 0, los: {}, qs: {} } };

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
        data.lessonQs = (p.lessonQs && typeof p.lessonQs === 'object') ? p.lessonQs : {};
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
  /* Lesson-check questions carry no ids of their own, so they get synthetic,
     stable ones — "<lessonId>~<index>" — and are wrapped with the outcome of
     the lesson that owns them, so a miss in a lesson can come back through the
     same backlog as a miss in practice. Before this, half the questions a
     learner answered were invisible: failing the same concept six times inside
     a lesson never surfaced anywhere. */
  var LESSON_Q_SEP = '~';
  function isLessonQId(qId) { return typeof qId === 'string' && qId.indexOf(LESSON_Q_SEP) !== -1; }
  var _answerable = null;
  function answerableById() {
    if (_answerable) return _answerable;
    var byId = {};
    practiceBank().forEach(function (q) { if (q.id) byId[q.id] = q; });
    var lessonQs = 0;
    path().forEach(function (g) {
      (g.lessons || []).forEach(function (l) {
        (l.check || []).forEach(function (q, i) {
          var id = l.id + LESSON_Q_SEP + i;
          var w = {};
          for (var k in q) if (Object.prototype.hasOwnProperty.call(q, k)) w[k] = q[k];
          w.id = id; w.lo = g.outcome;
          byId[id] = w;
          lessonQs++;
        });
      });
    });
    /* Cache only once the content files are in — an index built before them
       would answer "no such question" forever. */
    if (lessonQs || practiceBank().length) _answerable = byId;
    return byId;
  }
  function recordQuestion(qId, correct) {
    if (!qId) return;
    var map = isLessonQId(qId) ? data.lessonQs : data.practice.qs;
    var r = map[qId] || (map[qId] = {});
    if (correct) r.r = Date.now(); else r.w = Date.now();
    /* The two timestamps stay: the mistakes backlog is built from them, and a
       record written before schedules existed still has to work. `sr` is the
       spaced-repetition schedule on top — see spaced.js, shared with Levels 2
       and 3 so a reader meets one algorithm rather than three.

       Guarded, not assumed: answering a question is the one thing this player
       must never fail to do, and an unguarded call would take a whole run down
       if the file were ever missing. §7 of check-spaced.js is what makes sure
       it is actually shipped. */
    if (root.AATSpaced) r.sr = root.AATSpaced.schedule(r.sr, correct);
  }
  function isOutstanding(r) {
    return !!(r && n0(r.w) > n0(r.r));
  }

  /* ── Retiring a question you already know ─────────────────────────────────
     Level 2 has had this control since it shipped; this is the same idea in the
     record shape Levels 1 and 3 use, and the Level 3 player carries the same
     code with its own prefix.

     TWO TIMESTAMPS, NOT A FLAG, for exactly the reason `w` and `r` are two
     timestamps: progress-backup merges numbers by MAX and booleans by OR, so a
     `retired: true` would be sticky — bring a question back on the phone, and
     the laptop's stale `true` retires it again at the next merge, for ever.
     Retired while the retiring stamp is the later of the two, which is
     order-independent, idempotent, and settles a disagreement between two
     devices in favour of whichever one the reader touched last.

     `k` for known, `ku` for known-undone. Short because there is one of these
     per question and the store is JSON in localStorage. */
  function isRetired(r) {
    return !!(r && n0(r.k) > n0(r.ku));
  }
  /* The record for one question, whichever of the two maps it lives in, created
     on demand. Lesson-check questions carry a synthetic id and live in
     `lessonQs`; everything else is in the practice record. */
  function qRec(qId, make) {
    if (!qId) return null;
    var map = isLessonQId(qId) ? data.lessonQs : data.practice.qs;
    if (!map[qId] && !make) return null;
    return map[qId] || (map[qId] = {});
  }
  function retired(qId) { return isRetired(qRec(qId, false)); }
  function toggleRetire(qId) {
    var r = qRec(qId, true);
    if (!r) return false;
    var now = Date.now();
    /* Written rather than deleted. A record whose stamps were removed would be
       indistinguishable from one that had never been retired, and the merge
       would then resurrect the retirement from the other device. */
    if (isRetired(r)) r.ku = now; else r.k = now;
    save();
    return isRetired(r);
  }
  /* How many questions are put away, counted over the ids that are still
     answerable rather than over the store: a question retired and then
     rewritten out of the bank is not one the reader can bring back, and
     counting it would leave a number on the practice screen that no button can
     move. */
  function retiredQuestions() {
    var byId = answerableById();
    var out = [];
    [data.practice.qs, data.lessonQs].forEach(function (map) {
      Object.keys(map || {}).forEach(function (id) {
        if (byId[id] && isRetired(map[id])) out.push(byId[id]);
      });
    });
    return out;
  }
  /* Bring every one of them back, in one act. Retiring is reversible one
     question at a time only while the question is still being served — and it
     is not, that being the point — so without this the control would be a
     one-way door. */
  function restoreRetired() {
    var byId = answerableById();
    var now = Date.now(), n = 0;
    [data.practice.qs, data.lessonQs].forEach(function (map) {
      Object.keys(map || {}).forEach(function (id) {
        if (byId[id] && isRetired(map[id])) { map[id].ku = now; n++; }
      });
    });
    if (n) save();
    return n;
  }
  /* The bank minus what the reader has put away. Every draw that is not a mock
     goes through this; see drawWeighted for why a mock does not. */
  function livePool() {
    return practiceBank().filter(function (q) { return !retired(q.id); });
  }
  /* The questions still outstanding, most recently missed first, and only those
     still answerable — a question that has been rewritten or removed since it
     was missed is not a question anyone can be asked again. Reads both mistake
     maps: practice misses and lesson-check misses. */
  function missedQuestions() {
    var byId = answerableById();
    var out = [];
    [data.practice.qs, data.lessonQs].forEach(function (map) {
      Object.keys(map || {}).forEach(function (id) {
        /* A retired question is out of every draw, the backlog included: the
           reader said they know it, and serving it back because they once got
           it wrong would make the control mean nothing. */
        if (byId[id] && isOutstanding(map[id]) && !isRetired(map[id])) {
          out.push({ id: id, w: n0(map[id].w) });
        }
      });
    });
    return out.sort(function (a, b) { return b.w - a.w; })
      .map(function (e) { return byId[e.id]; });
  }
  /* Spaced review. Every answered question carries a schedule (see spaced.js):
     get it right and the gap to the next sight of it widens, get it wrong and
     it comes back tomorrow. Answered right once is not the same as known, so
     first-time correct answers are scheduled too — the material most likely to
     slip is what a reader got right once and has not seen since.

     Records written before schedules existed have only the two timestamps, and
     keep the rule they were written under: a mistake fixed a week ago comes
     back. They pick up a schedule the next time they are answered. */
  var REVIEW_AFTER_MS = 7 * 24 * 60 * 60 * 1000;
  /* The moment this record fell due, or null if it has not. Both branches
     return a due time rather than a last-seen time, so schedules and legacy
     records sort against each other on the same scale. */
  function dueSince(r, now) {
    if (!r) return null;
    var sr = r.sr;
    if (sr && typeof sr.dueAt === 'number') return sr.dueAt <= now ? sr.dueAt : null;
    if (n0(r.w) > 0 && n0(r.r) >= n0(r.w) && now - n0(r.r) > REVIEW_AFTER_MS) {
      return n0(r.r) + REVIEW_AFTER_MS;
    }
    return null;
  }
  function dueQuestions() {
    var byId = answerableById();
    var now = Date.now();
    var out = [];
    [data.practice.qs, data.lessonQs].forEach(function (map) {
      Object.keys(map || {}).forEach(function (id) {
        var r = map[id];
        /* A question still outstanding belongs to the mistakes backlog, which
           serves it sooner and more insistently. Offering it in both places
           would double-count it on the practice screen. */
        if (!byId[id] || isOutstanding(r) || isRetired(r)) return;
        var at = dueSince(r, now);
        if (at !== null) out.push({ id: id, r: at });
      });
    });
    return out.sort(function (a, b) { return a.r - b.r; })
      .map(function (e) { return byId[e.id]; });
  }
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(data)); } catch (e) {}
    /* Level 1 persists on its own, so it announces its own writes — otherwise a
       lesson finished here sits unsynced until something else happens to save. */
    if (root.ProgressSync) root.ProgressSync.noteLocalChange();
  }

  /* ── Reading position ─────────────────────────────────────────────────────
     Which page of which step the reader was on. Its own localStorage key,
     deliberately outside the progress record: position is device-local — two
     devices legitimately sit on different pages, and a MAX-merge of "page 4"
     and "page 2" answers a question nobody asked. Only the TEACH phase is
     saved: a half-answered question run is not restorable honestly, so a
     reader who left mid-questions resumes on the last page of the reading. */
  var POS_KEY = STORE_KEY + '_pos';
  function savePos() {
    if (S.mode !== 'lesson' || S.screen !== 'lesson' || !S.lessonId || S.phase !== 'teach') return;
    /* Consulting a cheat sheet mid-lesson must not destroy the position in the
       step the reader was actually inside. */
    var cur = lessonById(S.lessonId);
    if (cur && cur.isSheet) return;
    try {
      localStorage.setItem(POS_KEY, JSON.stringify({ lessonId: S.lessonId, cardIdx: S.cardIdx }));
    } catch (e) {}
  }
  function readPos() {
    try { return JSON.parse(localStorage.getItem(POS_KEY) || 'null'); } catch (e) { return null; }
  }
  function clearPos() {
    try { localStorage.removeItem(POS_KEY); } catch (e) {}
  }
  /* What the hero card should open: the step the reader was inside, at the
     page they left, and only then the first step not yet passed. */
  function continueTarget() {
    var pos = readPos();
    if (pos && pos.lessonId) {
      var l = lessonById(pos.lessonId);
      if (l && !l.isSheet && !isDone(l.id)) {
        /* Clamped against the deck HERE, so the hero label and startLesson()
           cannot disagree — a content release that shortens a lesson must not
           leave the hero promising "back to page 9 of 6". */
        var ci = n0(pos.cardIdx);
        if (ci >= ((l.cards || []).length)) ci = 0;
        return { lesson: l, cardIdx: ci };
      }
    }
    var nx = nextLesson();
    return nx ? { lesson: nx, cardIdx: 0 } : null;
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
  /* Indexed once: handle() resolves the current lesson on every single click,
     and lessons() + sheets() each rebuild their array per call. The learn path
     is static after load, so the id → lesson map and the id → step-number map
     are built on first use and kept. */
  var _lessonIndex = null, _stepIndex = null;
  function buildIndexes() {
    var li = {}, si = {};
    lessons().forEach(function (l, i) { li[l.id] = l; si[l.id] = i + 1; });
    sheets().forEach(function (sh) { li[sh.id] = sh; });
    /* Only kept once built from loaded content — before the data file arrives
       an empty index would answer "no such lesson" forever. */
    if (Object.keys(li).length) { _lessonIndex = li; _stepIndex = si; }
    return { li: li, si: si };
  }
  function lessonById(id) {
    if (id == null) return null;
    var li = _lessonIndex || buildIndexes().li;
    return li[id] || null;
  }
  /* Ladder position, 1-based and continuous across outcomes — the number the
     reader sees on the rung and in the lesson bar. */
  function stepNo(id) {
    var si = _stepIndex || buildIndexes().si;
    return si[id] || 0;
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

  /* ── What should I do now? ────────────────────────────────────────────────
     NOT A NEW PANEL. Level 3 puts this above a grid of three units, because
     there the question really is "which unit"; here there is one unit and the
     path screen already leads with Continue, which is the right first offer
     and should not be argued with. What it led with SECOND was the problem:

       Practise · Mixed, or one outcome · 338 questions in the bank

     — three facts and no recommendation, on a screen whose whole job is to say
     what to do next. Every number needed to do better is already recorded:
     which questions went wrong and were never put right, which the schedule
     says are due, which outcome is losing marks, whether a mock has ever been
     sat. Nothing put them together.

     So the second button keeps its place and gains an opinion. The reading
     half of the screen is untouched.

     THE ORDER IS THE OPINION:

       1. Questions you got wrong and have not fixed. Repair before anything
          else: material you are already known to be shaky on, and the cheapest
          to put right.
       2. Questions the schedule says are due. Forgetting is the loss spaced
          repetition exists to prevent, and a card left past its due date is
          the one thing here that gets worse on its own. Held to a higher
          threshold so it does not headline over three cards.
       3. An outcome you keep getting wrong, weighted by its share of the
          assessment — 60% on an outcome worth a third of the paper costs more
          than 50% on one worth a tenth.
       4. A mock, once every step is done and one has never been sat.
       5. Mixed practice, when there is nothing more specific to say. This is
          the offer that used to be the only one.

     Reading the next lesson is not in this list because the button above
     already is that, and better: it resumes the exact page.

     THRESHOLDS ARE DELIBERATELY NOT ZERO. "1 question due for review" is true
     and is not advice; a recommendation that fires on a single card teaches the
     reader to ignore the recommendation. */
  var NUDGE_MISSED = 3;
  var NUDGE_DUE = 5;
  var NUDGE_WEAK_ATTEMPTS = 8;
  var NUDGE_WEAK_PCT = 70;

  function nextStep() {
    var bank = practiceBank();
    if (!bank.length) return null;

    var missed = missedQuestions().length;
    if (missed >= NUDGE_MISSED) {
      return { lo: 'missed', k: 'Put right what went wrong',
        t: missed + (missed === 1 ? ' question you got wrong' : ' questions you got wrong'),
        m: 'Served back most recent first, and cleared as you get them right.' };
    }

    var due = dueQuestions().length;
    if (due >= NUDGE_DUE) {
      return { lo: 'refresh', k: 'Due for review',
        t: due + ' questions are ready to come back',
        m: 'Answered right once is not the same as known \u2014 these are the ones closest to slipping.' };
    }

    /* The per-outcome record, read where it lives. Level 3 has a
       practiceSummary() that assembles this because it has to reconcile three
       units and a legacy store shape; here there is one unit and one map.

       Clamped, because a merged backup takes the larger of `attempted` and
       `correct` INDEPENDENTLY, and a hand-edited file need not be coherent at
       all — an unclamped pair can report 120% right and sort above everything
       real. */
    var weak = null;
    var u = unit();
    ((u && u.outcomes) || []).forEach(function (o) {
      var r = data.practice.los[o.n];
      var att = Math.max(0, (r && r.attempted) || 0);
      if (att < NUDGE_WEAK_ATTEMPTS) return;
      var cor = Math.min(att, Math.max(0, (r && r.correct) || 0));
      var pct = Math.round((cor / att) * 100);
      if (pct >= NUDGE_WEAK_PCT) return;
      var cost = (100 - pct) * (o.weighting || 1);
      if (!weak || cost > weak.cost) weak = { o: o, pct: pct, cost: cost };
    });
    if (weak) {
      return { lo: weak.o.n, k: 'Costing you marks',
        t: 'Outcome ' + weak.o.n + ' \u00b7 ' + weak.o.title,
        m: weak.pct + '% right so far' +
           (weak.o.weighting ? ', and worth ' + weak.o.weighting + '% of the assessment' : '') + '.' };
    }

    var ls = lessons();
    var allRead = ls.length > 0 && ls.every(function (l) { return isDone(l.id); });
    if (allRead && !data.practice.mocks) {
      return { mock: true, k: 'Nothing left to read',
        t: 'Sit your first timed mock',
        m: 'A full paper at the real length and weighting. The only thing left that tells you whether it stuck.' };
    }

    return { lo: 'mix', k: 'Practise',
      t: 'Mixed, or one outcome',
      m: bank.length + ' questions in the bank, drawn to the exam weighting.' };
  }

  function renderPath() {
    var groups = path();
    if (!groups.length) return '<div class="a1-empty">Level 1 content is still loading.</div>';
    var ls = lessons();
    var doneN = ls.filter(function (l) { return isDone(l.id); }).length;
    var pct = ls.length ? Math.round((doneN / ls.length) * 100) : 0;
    var nx = nextLesson();
    var bank = practiceBank();

    var h = '<div class="a1-root' + fresh() + '">';

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
      /* The step the reader was INSIDE beats the first step not done: leaving
         page 4 of step 12 and being sent to step 3 is how "Continue" loses a
         reader's trust. startLesson() reopens the saved page. */
      var ct = continueTarget();
      var ctL = (ct && ct.lesson) || nx;
      var resumingPage = ct && ct.cardIdx > 0 && ctL.id === (readPos() || {}).lessonId;
      var ng = groupOf(ctL);
      h += '<button class="a1-act a1-act-go" data-a1="open" data-id="' + esc(ctL.id) + '">' +
        '<span class="a1-act-k">' + (doneN || resumingPage ? 'Continue' : 'Start here') + '</span>' +
        '<span class="a1-act-t">Step ' + stepNo(ctL.id) + ' · ' + esc(ctL.title) + '</span>' +
        '<span class="a1-act-m">' + (ng ? 'Outcome ' + ng.outcome + ' · ' : '') +
          (resumingPage
            ? 'back to page ' + (ct.cardIdx + 1) + ' of ' + (ctL.cards || []).length
            : (ctL.cards || []).length + ' pages · ' + (ctL.check || []).length + ' questions') +
        '</span>' +
        '<span class="a1-act-go-i" aria-hidden="true">→</span>' +
        '</button>';
    } else {
      h += '<div class="a1-act a1-act-done">' +
        '<span class="a1-act-k">Every step finished</span>' +
        '<span class="a1-act-t">The course is complete</span>' +
        '<span class="a1-act-m">Practice is where the work is now.</span>' +
        '</div>';
    }
    /* The second action, and what it says is a recommendation rather than a
       category. See nextStep() above for the order and why. `practice` is kept
       as the act for the generic offer, so a reader who wants to choose for
       themselves still lands on the picker; anything more specific goes
       straight to the run it named. */
    var ns = nextStep();
    if (ns) {
      var nAttrs = ns.mock
        ? ' data-a1="startmock"'
        : ns.lo === 'mix'
          ? ' data-a1="practice"'
          : ' data-a1="startpractice" data-lo="' + esc(ns.lo) + '"';
      h += '<button class="a1-act a1-act-alt"' + nAttrs + '>' +
        '<span class="a1-act-k">' + esc(ns.k) + '</span>' +
        '<span class="a1-act-t">' + esc(ns.t) + '</span>' +
        '<span class="a1-act-m">' + esc(ns.m) + '</span>' +
        '<span class="a1-act-go-i" aria-hidden="true">→</span>' +
        '</button>';
    }
    /* THE THIRD WAY IN, and quieter than the other two on purpose. Reading and
       practising are what a reader came to do; the vocabulary is what they
       reach for when a word in one of them did not land. Offered only where
       there is a glossary, so a build without one does not advertise an empty
       screen. */
    if (glossary().length) {
      h += '<button class="a1-act a1-act-alt a1-act-quiet" data-a1="gloss">' +
        '<span class="a1-act-k">Glossary</span>' +
        '<span class="a1-act-t">' + glossary().length + ' terms, and flashcards</span>' +
        '<span class="a1-act-m">Search the vocabulary, or be asked to produce it from memory</span>' +
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
      /* THE GLYPH AND THE WORD ARE SEPARATE ELEMENTS, so the narrowest phone can
         drop the word and keep the button. Setting `font-size: 0` on the button
         and restoring the glyph with `::first-letter` does not work — that
         pseudo-element does not apply to an inline-flex box, and the button
         renders as an empty pill at 320px. */
      (speechOffered(cards[S.cardIdx])
        ? '<button class="a1-speak' + (S.speaking ? ' is-on' : '') + '" data-a1="speak"' +
          ' aria-label="' + (S.speaking ? 'Stop reading this card aloud' : 'Read this card aloud') + '">' +
          '<span class="a1-speak-i" aria-hidden="true">' + (S.speaking ? '\u25a0' : '\u25b6') + '</span>' +
          '<span class="a1-speak-l">' + (S.speaking ? 'Stop' : 'Listen') + '</span>' +
          '</button>'
        : '') +
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
  /* ── Written response ────────────────────────────────────────────────────
     WHY A COMPUTER-MARKED UNIT ASKS THE READER TO WRITE.

     Bookkeeping Transactions is computer marked, so nothing in the assessment
     will ask for prose and the note under the box says exactly that. It is here
     anyway because picking the right sentence out of four and being able to
     write it are different abilities, and only one of them is what a colleague
     asking "why does that go on the credit side?" will meet. Writing an
     explanation out is the fastest way to find out that you cannot.

     Marked the way Level 3 marks it, and for the same reasons: write, reveal
     the model, tick the rubric points you actually made, pass at 70%. The
     reveal is gated on having written something, because a model answer read
     cold is a passage of text rather than an exercise. */

  function qMarks(q) {
    if (!q) return 1;
    if (Array.isArray(q.rubric) && q.rubric.length) {
      var t = q.rubric.reduce(function (s2, r) { return s2 + (Number(r.marks) || 0); }, 0);
      if (t > 0) return t;
    }
    return (typeof q.marks === 'number' && q.marks > 0) ? q.marks : 1;
  }

  function wrWords(text) {
    var t = String(text == null ? '' : text).trim();
    return t ? t.split(/\s+/).length : 0;
  }

  function wrEnough(q) {
    return wrWords(S.wrText) >= Math.min(20, q.minWords || 20);
  }

  function wrAwarded(q) {
    return (q.rubric || []).reduce(function (s2, r, i) {
      return s2 + (S.wrTicks[i] ? (Number(r.marks) || 0) : 0);
    }, 0);
  }

  function writtenHtml(q) {
    var marks = qMarks(q);
    var h = '<div class="a1-wr">';
    if (q.setup) {
      h += '<div class="a1-wr-setup"><span class="a1-wr-req">The situation</span>' +
        md(q.setup) + '</div>';
    }

    if (!S.wrShown) {
      var words = wrWords(S.wrText);
      var min = q.minWords || 0;
      h += '<label class="a1-wr-label" for="a1-wr-in">Your answer &middot; ' + marks + ' mark' +
        (marks === 1 ? '' : 's') + (min ? ' &middot; aim for at least ' + min + ' words' : '') + '</label>' +
        '<textarea id="a1-wr-in" class="a1-wr-in" data-a1="wrinput" rows="8" spellcheck="true" ' +
        'placeholder="Write your answer here\u2026">' + esc(S.wrText) + '</textarea>' +
        '<div class="a1-wr-count' + (min && words < min ? ' is-short' : '') + '">' +
        words + ' word' + (words === 1 ? '' : 's') + (min ? ' &middot; minimum ' + min : '') + '</div>' +
        '<p class="a1-wr-note">This unit is computer marked, so you will not be asked to write in ' +
        'the assessment. You are asked to here because explaining something is the fastest way to ' +
        'find out whether you understand it. Write your answer first, then mark it yourself ' +
        'against the rubric.</p>';
      return h + '</div>';
    }

    var graded = S.answered !== null;
    h += '<div class="a1-wr-cmp">' +
      '<div class="a1-wr-side"><div class="a1-wr-h">What you wrote</div>' +
        '<div class="a1-wr-body">' + (esc(S.wrText) || '<em>Nothing</em>') + '</div></div>' +
      '<div class="a1-wr-side is-model"><div class="a1-wr-h">A model answer</div>' +
        '<div class="a1-wr-body">' + esc(q.modelAnswer || '') + '</div></div>' +
      '</div>';
    h += '<div class="a1-wr-rub">' +
      '<div class="a1-wr-rh">Mark your own answer &mdash; tick every point you actually made</div>' +
      (q.rubric || []).map(function (r, i) {
        return '<label class="a1-wr-row' + (S.wrTicks[i] ? ' on' : '') + '">' +
          '<input type="checkbox" class="a1-wr-box" data-a1="wrtick" data-i="' + i + '"' +
          (S.wrTicks[i] ? ' checked' : '') + (graded ? ' disabled' : '') + '>' +
          '<span class="a1-wr-pt">' + md(r.point) + '</span>' +
          '<span class="a1-wr-mk">' + r.marks + '</span></label>';
      }).join('') +
      '<div class="a1-wr-tot">Self-assessed <strong>' + wrAwarded(q) + ' / ' + marks + '</strong>' +
      ' &middot; ' + Math.ceil(marks * 0.7) + ' to pass</div>' +
      '</div>';
    return h + '</div>';
  }

  /* ── "I know this" ────────────────────────────────────────────────────────
     OFFERED AFTER THE ANSWER, NEVER BEFORE IT. Shown alongside the question it
     would be a way of skipping something hard; shown alongside the explanation
     it is a judgement the reader has just earned the right to make, because
     they have seen whether they were right.

     PRACTICE RUNS ONLY. Not in a mock, where nothing is graded until the paper
     is over and there is nothing to judge yet — and where the questions are
     drawn from the full bank anyway. Not in a review, which walks a finished
     paper and has its own navigation. Not inside a lesson: a lesson's check
     questions are part of reading it, there is no pool to take them out of,
     and the lesson still has to be finished either way. A lesson question that
     later surfaces through the backlog IS served in a practice run, and can be
     retired there like any other. */
  function retireOffered(q) {
    return !!(q && q.id) && S.mode === 'practice' && S.answered !== null && !isReview();
  }
  function retireBtn(q) {
    var on = retired(q.id);
    return '<button class="a1-retire' + (on ? ' is-on' : '') + '" data-a1="retire"' +
      ' aria-pressed="' + (on ? 'true' : 'false') + '"' +
      ' title="' + (on ? 'Put this back into practice' : 'Stop showing me this question') + '">' +
      '<span class="a1-retire-i" aria-hidden="true">' + (on ? '\u21ba' : '\u2713') + '</span>' +
      '<span class="a1-retire-l">' + (on ? 'Bring back' : 'I know this') + '</span>' +
      '</button>';
  }

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

    if (t === 'written') {
      h += writtenHtml(q);
      if (S.answered === null && !isMock()) {
        if (!S.wrShown) {
          var wrReady = wrEnough(q);
          h += '<button class="a1-btn a1-btn-primary a1-wide" data-a1="wrshow"' +
            (wrReady ? '' : ' disabled') + '>' +
            (wrReady ? 'Reveal the model answer' : 'Write an answer first') + '</button>';
        } else {
          h += '<button class="a1-btn a1-btn-primary a1-wide" data-a1="wrmark">Record ' +
            wrAwarded(q) + ' / ' + qMarks(q) + '</button>';
        }
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
        var adv = '<button class="a1-btn a1-btn-primary a1-wide" data-a1="nextq">' +
          (S.qIdx === n - 1 ? 'Finish' : 'Next question') + '</button>';
        h += retireOffered(q)
          ? '<div class="a1-qfoot">' + adv + retireBtn(q) + '</div>'
          : adv;
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
        '% of the assessment.' +
        /* The diagnosis used to stop at naming the outcome; the obvious next
           step is a tap, not a hunt back through the practice screen. */
        '<button class="a1-btn a1-btn-primary a1-mockreport-go" data-a1="startpractice" data-lo="' +
          focus.n + '">Practise Outcome ' + focus.n + '</button></div>';
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

    return '<div class="a1-root' + fresh() + '"><div class="a1-done">' +
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
      (S.lastXp > 0 ? '<div class="a1-done-xp">+' + S.lastXp + ' XP · ' + data.xp + ' total</div>' : '') +
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
    if (S.practiceLo === 'refresh') return 'spaced review';
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

    var h = '<div class="a1-root' + fresh() + '">';
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
  /* ── The glossary, and being drilled on it ────────────────────────────────
     THE SAME FEATURE LEVEL 3 CARRIES, with this unit's own vocabulary. See the
     block above renderGlossary in aat3-ui.js for why flashcards exist alongside
     a practice bank that already asks about these ideas: a practice question
     gives four options and asks you to pick, a card gives a word and asks you
     to produce the meaning, and recognition is not recall.

     WHY THE GLOSSARY IS ITS OWN FILE AND NOT THE CARDS' `terms` LISTS. Twenty
     cards in this unit already carry a terms list, and those exist to be read
     in place — a definition arrives beside the paragraph that needs it. This is
     for looking a word up weeks later, and for being drilled on it, which wants
     every term in one place regardless of which lesson introduced it. The two
     must agree, and scripts/check-glossary.js asserts that every term taught on
     a card is here.

     THE SCHEDULE IS THE SAME ONE. A card graded here writes through
     recordQuestion into the same per-question store as every practice answer,
     with the same spaced-repetition schedule from spaced.js. The synthetic id
     is "gloss~<term>", which puts it in the lesson-question map (see
     isLessonQId): a term is not a bank question, so it must not land in the
     practice `qs` map and be counted as practice the reader never did. */
  function glossary() {
    var G = root.AAT1_GLOSSARY;
    return (G && G.TERMS) || [];
  }
  var GLOSS_PREFIX = 'gloss' + LESSON_Q_SEP;
  function glossId(term) { return GLOSS_PREFIX + term; }

  /* Searched over BOTH the term and its definition. A reader who has forgotten
     the word but remembers "the one where the payee controls the amount" is
     exactly the reader a glossary is for, and a term-only search fails them. */
  function glossMatches() {
    var q = String(S.glossQuery || '').trim().toLowerCase();
    var all = glossary();
    if (!q) return all;
    return all.filter(function (t) {
      return (t.t + ' ' + t.d).toLowerCase().indexOf(q) !== -1;
    });
  }

  function renderGlossary() {
    var all = glossary();
    var rows = glossMatches();
    var q = String(S.glossQuery || '');

    var h = '<div class="a1-root' + fresh() + '">';
    h += ctxBar({
      back: 'topath',
      backLabel: 'Back to the steps',
      title: 'Glossary',
      meta: all.length + ' terms',
    });
    h += '<div class="a1-page">';

    if (!all.length) {
      h += '<div class="a1-empty">No glossary yet.</div>';
      return h + '</div></div>';
    }

    h += '<button class="a1-flashstart" data-a1="startflash">' +
      '<span class="a1-flashstart-i" aria-hidden="true">◆</span>' +
      '<span class="a1-flashstart-tx">' +
        '<span class="a1-flashstart-t">Test yourself on ' + FLASH_LEN + ' of them</span>' +
        '<span class="a1-flashstart-m">The word, then the meaning from memory. Drawn to the exam ' +
          'weighting, and scheduled like everything else you answer.</span>' +
      '</span>' +
      '<span class="a1-flashstart-go" aria-hidden="true">→</span>' +
      '</button>';

    h += '<div class="a1-glosssearch">' +
      '<input class="a1-glossin" type="search" data-a1="glossin" value="' + esc(q) + '"' +
      ' placeholder="Search the terms and the definitions…" aria-label="Search the glossary">' +
      (q ? '<button class="a1-glossclear" data-a1="glossclear" aria-label="Clear the search">×</button>' : '') +
      '</div>';

    if (!rows.length) {
      h += '<div class="a1-empty">Nothing matches “' + esc(q) + '”.</div>';
      return h + '</div></div>';
    }

    /* GROUPED BY OUTCOME RATHER THAN ALPHABETICALLY. A reader revising outcome
       4 wants outcome 4's vocabulary together; a reader looking one word up
       types it, and the search box serves that better than an alphabet would. */
    var u = unit();
    var los = (u && u.outcomes) || [];
    var seen = {};
    los.forEach(function (o) {
      var mine = rows.filter(function (t) { return t.lo === o.n; });
      if (!mine.length) return;
      mine.forEach(function (t) { seen[t.t] = 1; });
      h += '<section class="a1-glossgroup">' +
        '<h2 class="a1-glossgroup-h"><span class="a1-glossgroup-n">' + esc(o.n) + '</span>' +
        esc(o.title) + '</h2><dl class="a1-glosslist">';
      mine.forEach(function (t) {
        h += '<div class="a1-glossrow"><dt>' + esc(t.t) + '</dt><dd>' + md(t.d) + '</dd></div>';
      });
      h += '</dl></section>';
    });
    /* A term whose `lo` matches no outcome would otherwise vanish silently.
       Shown rather than dropped: a definition nobody can find is the one bug a
       glossary can have that looks like no bug at all. */
    var orphans = rows.filter(function (t) { return !seen[t.t]; });
    if (orphans.length) {
      h += '<section class="a1-glossgroup"><h2 class="a1-glossgroup-h">Other terms</h2><dl class="a1-glosslist">';
      orphans.forEach(function (t) {
        h += '<div class="a1-glossrow"><dt>' + esc(t.t) + '</dt><dd>' + md(t.d) + '</dd></div>';
      });
      h += '</dl></section>';
    }

    h += '<footer class="a1-foot">Independent study tool. Not affiliated with, endorsed by, or officially associated with AAT.</footer>';
    return h + '</div></div>';
  }

  /* Twelve cards. Long enough to be worth starting and short enough to finish
     on a bus, which is the whole case for flashcards over a practice run. */
  var FLASH_LEN = 12;

  function startFlash() {
    var pool = glossary();
    if (!pool.length) return;
    /* DUE FIRST, THEN UNSEEN, THEN THE REST — the same priority the practice
       screen uses, and for the same reason. */
    var now = Date.now();
    var due = [], unseen = [], rest = [];
    pool.forEach(function (t) {
      var r = data.lessonQs[glossId(t.t)];
      if (!r) unseen.push(t);
      else if (isOutstanding(r) || dueSince(r, now) !== null) due.push(t);
      else rest.push(t);
    });
    var deck = shuffle(due).concat(shuffle(unseen)).concat(shuffle(rest)).slice(0, FLASH_LEN);
    S.flash = { cards: deck, idx: 0, shown: false, got: 0 };
    S.screen = 'flash';
  }

  function renderFlash() {
    var F = S.flash;
    if (!F || !F.cards.length) { S.screen = 'gloss'; return renderGlossary(); }
    if (F.idx >= F.cards.length) return renderFlashDone();
    var card = F.cards[F.idx];
    var pct = Math.round((F.idx / F.cards.length) * 100);

    var h = '<div class="a1-root a1-reading' + fresh() + '">';
    h += '<div class="a1-lessonbar">' +
      '<button class="a1-ctx-back" data-a1="gloss" aria-label="Back to the glossary">' +
        '<span aria-hidden="true">←</span></button>' +
      '<div class="a1-lessonbar-mid">' +
        '<div class="a1-lessonbar-t">Flashcards</div>' +
        '<div class="a1-lessonbar-m">Card ' + (F.idx + 1) + ' of ' + F.cards.length +
          ' · ' + F.got + ' known</div>' +
      '</div>' +
      '<div class="a1-lessonbar-n">' + pct + '%</div></div>' +
      '<div class="a1-lessonbar-p"><span style="width:' + pct + '%"></span></div>';

    h += '<article class="a1-sheet' + fresh() + '">';
    /* The term is an h2 with the same class every question stem uses, so the
       harnesses that identify a screen by its stem can see this one too. */
    h += '<h2 class="a1-q">' + esc(card.t) + '</h2>';
    if (!F.shown) {
      h += '<p class="a1-flash-ask">Say what it means, then turn the card over.</p>' +
        '<button class="a1-btn a1-btn-primary a1-wide" data-a1="flashflip">Turn it over</button>';
    } else {
      h += '<div class="a1-flash-def">' + md(card.d) + '</div>' +
        '<p class="a1-flash-ask">Did you have it?</p>' +
        '<div class="a1-flash-grade">' +
          '<button class="a1-btn a1-btn-ghost" data-a1="flashno">Not yet</button>' +
          '<button class="a1-btn a1-btn-primary" data-a1="flashyes">I had it</button>' +
        '</div>';
    }
    h += '</article></div>';
    return h;
  }

  function renderFlashDone() {
    var F = S.flash;
    var n = F.cards.length;
    var pct = n ? Math.round((F.got / n) * 100) : 0;
    var h = '<div class="a1-root' + fresh() + '"><div class="a1-page">';
    /* THE RESULT SCREEN EVERY OTHER RUN USES. A flashcard run ending in its own
       bespoke panel would be a second visual language for the same event, and
       the classes here already carry the ring, the heading and the button row. */
    h += '<section class="a1-done">' +
      '<div class="a1-done-ring" style="--p:' + pct + '"><span>' + pct + '%</span></div>' +
      '<div class="a1-done-lesson">Flashcards</div>' +
      '<h2 class="a1-done-h">' + F.got + ' of ' + n + ' recalled</h2>' +
      '<p class="a1-done-sub">The ones you did not have come back sooner; the ones you did ' +
        'come back later.</p>' +
      '<div class="a1-done-actions">' +
        '<button class="a1-btn a1-btn-primary" data-a1="startflash">Another ' + FLASH_LEN + '</button>' +
        '<button class="a1-btn a1-btn-ghost" data-a1="gloss">Back to the glossary</button>' +
      '</div></section>';
    h += '</div></div>';
    return h;
  }

  function renderPractice() {
    var bank = practiceBank();
    var u = unit();
    var los = u ? u.outcomes : [];
    var counts = {};
    bank.forEach(function (q) { counts[q.lo] = (counts[q.lo] || 0) + 1; });

    var missed = missedQuestions();
    var due = dueQuestions();
    var put = retiredQuestions();
    var pr = data.practice;

    var h = '<div class="a1-root' + fresh() + '">';
    h += ctxBar({
        back: 'topath',
        backLabel: 'Back to the steps',
        title: 'Practice',
        /* "10 per run" was true while a run was the only thing this screen
           offered. It now offers a 30-question paper as well, so the honest
           fact here is the size of the pool; each card says its own length. */
        /* The live figure once anything is put away, because that is the number
           a run will actually draw from, and "338 questions" over a pool of 298
           is the app disagreeing with itself. */
        meta: put.length
          ? (bank.length - put.length) + ' in practice \u00b7 ' + put.length + ' put away'
          : bank.length + ' questions in the pool',
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
    /* Spaced review — questions whose schedule says they are due. Quieter than
       the backlog: these went right last time, so this is upkeep rather than
       repair. */
    if (due.length) {
      h += '<button class="a1-alert a1-alert-due" data-a1="startpractice" data-lo="refresh">' +
        '<span class="a1-alert-i" aria-hidden="true">↻</span>' +
        '<span class="a1-alert-tx">' +
          '<span class="a1-alert-t">' + due.length +
            (due.length === 1 ? ' question due for review' : ' questions due for review') + '</span>' +
          '<span class="a1-alert-m">Spaced out further each time you get one right. Right once is not the same as known.</span>' +
        '</span>' +
        '<span class="a1-alert-go" aria-hidden="true">→</span>' +
        '</button>';
    }

    /* The way back from "I know this". Retiring is reversible one question at a
       time only while that question is still being served, and it is not — so
       without a control here the button on the question screen would be a
       one-way door. Rendered only when there is something behind it. */
    if (put.length) {
      h += '<button class="a1-restore" data-a1="restore">' +
        '<span class="a1-restore-i" aria-hidden="true">\u21ba</span>' +
        '<span class="a1-restore-tx">' +
          '<span class="a1-restore-t">' + put.length +
            (put.length === 1 ? ' question put away' : ' questions put away') + '</span>' +
          '<span class="a1-restore-m">Marked \u201cI know this\u201d, so practice runs skip ' +
            (put.length === 1 ? 'it' : 'them') + '. A timed mock still asks ' +
            (put.length === 1 ? 'it' : 'them') + '. Tap to bring ' +
            (put.length === 1 ? 'it' : 'them') + ' back.</span>' +
        '</span>' +
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
    if (S.screen === 'gloss') return renderGlossary();
    if (S.screen === 'flash') return renderFlash();
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
    savePos();
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
    /* THE SEARCH BOX GETS ITS CARET BACK. Typing into the glossary filters the
       list, which means a repaint, which means the input the reader is typing
       into is replaced by a new one — and a new input is not focused and holds
       no caret. Without this the box takes exactly one character and then
       silently stops accepting them, which reads as the keyboard breaking.

       Only while there is something in it: focusing an empty box on arrival
       would open the keyboard over the glossary on every phone, on a screen
       whose point is to be read. */
    if (S.screen === 'gloss' && S.glossQuery && el.querySelector) {
      var box = el.querySelector('.a1-glossin');
      if (box && box.focus) {
        try {
          box.focus();
          /* To the end, not to the start — which is where a fresh input puts
             it, and which would type the next character in front of the last. */
          if (box.setSelectionRange) box.setSelectionRange(box.value.length, box.value.length);
        } catch (e) {}
      }
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
  function drawWeighted(n, noWritten, keepRetired) {
    /* WHY A MOCK STILL DRAWS FROM RETIRED QUESTIONS, and nothing else does.
       Everywhere else, "I know this" means stop asking me. A mock is the one
       place where honouring that would work against the reader: it is a
       rehearsal of a real paper at the real weighting, and the real paper has
       never heard of anything you put away. Drawing a mock from the shrunken
       pool would hand back a score against an easier exam than the one being
       sat — and, at the far end, an outcome with every question retired could
       not fill its seats at all, so the weighting itself would quietly stop
       holding. Keeping them in also means retirement can never hide a weakness
       from the one measure that is supposed to find it. */
    var bank = keepRetired ? practiceBank() : livePool();
    /* WHY A MOCK HAS NO WRITTEN TASKS IN IT. A written task is marked by the
       reader against a rubric they can only see once the model answer is on
       screen — and a mock reveals nothing until the paper is over. Including
       one would either show the model under exam conditions or bank a task
       that scored nothing because there was no way to mark it. */
    if (noWritten) bank = bank.filter(function (q) { return q.type !== 'written'; });
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
    S.practiceQs = drawWeighted(MOCK_LEN, true, true);
    S.practiceMissed = [];
    S.streak = 0; S.bestStreak = 0; /* same reset startPractice() does */
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
  /* ── Reading a card aloud ──────────────────────────────────────────────────
     THE SAME MACHINERY LEVEL 3 CARRIES, and deliberately a second copy of it
     rather than a shared module: the two players have separate closures, no
     common runtime, and their cards are not the same shape. Level 1 has three
     kinds Level 3 does not — a key-terms list, a document facsimile and a
     "not at this level" note — and each needed its own decision about whether
     it can be said out loud at all. A shared cardSpeech would have to know
     about both card vocabularies, which is the coupling, not the saving.

     ON EVERY CARD THAT HAS SOMETHING TO SAY, and withheld where there is not:
     a card whose whole substance is a document facsimile produces no prose,
     and a Listen button that plays silence is worse than no button, because
     the reader cannot tell it from a fault. The offer and the content are
     decided by the same function, so they cannot disagree.

     EVERYTHING GOES THROUGH `root`, not `window`. In the browser `root` IS
     window, so this is the same object; in Node it is the module's exports,
     which is what lets the build check hand it a stub speech engine and assert
     what was said and when it was cancelled. */
  function speechEngine() { return root.speechSynthesis || null; }
  function canSpeak() { return !!(speechEngine() && root.SpeechSynthesisUtterance); }
  function speechOffered(card) {
    return canSpeak() && S.phase === 'teach' && cardSpeech(card).length > 0;
  }

  /* An English voice, preferring the British one this material is written in.
     Voices load asynchronously on most browsers, so this is asked for at speak
     time rather than cached at load — a cached null from the first paint would
     never recover. */
  function englishVoice() {
    var e = speechEngine();
    var voices = (e && e.getVoices) ? e.getVoices() : [];
    if (!voices.length) return null;
    return voices.find(function (v) { return v.lang === 'en-GB'; })
      || voices.find(function (v) { return String(v.lang).indexOf('en') === 0; })
      || null;
  }

  /* What a card SAYS, as opposed to what it shows. Built from the card data,
     never from the rendered HTML — scraping the DOM would pick up the markup
     and the per-cell column headings the narrow layout carries.

     IN THE ORDER THE CARD RENDERS THEM, so "there is more here" arrives at the
     point the eye would reach it. Compare cardHtml above: heading, prose, key
     terms, formula, split, table, example, document, flow, callout, not-yet,
     watch-out, worked.

     WHAT IS READ AND WHAT IS ONLY ANNOUNCED. Prose is read. A key-terms list
     is read, because a term and its definition is a sentence and reads as one;
     it is the one structured element here that survives being spoken. Tables
     are passed over in silence — a four-column grid becomes a stream of
     unanchored words, and announcing it turned out to be little better on a
     card whose table IS the substance. Everything else is announced but not
     read: a formula becomes "gross equals net times one point two zero", and a
     document facsimile read field by field is worse than useless — but a
     listener has to know it is there, or they will think they have heard the
     whole card. */
  function cardSpeech(c) {
    if (!c) return [];
    var out = [];
    var say = function (t) {
      var clean = String(t == null ? '' : t)
        .replace(/\*\*([^*]+)\*\*/g, '$1')      // bold markers are for the eye
        .replace(/(^|[^*])\*([^*]+)\*/g, '$1$2')  // and so is emphasis
        .replace(/\s+/g, ' ')
        .trim();
      if (clean) out.push(clean);
    };

    if (c.h) say(c.h);
    if (c.p) (Array.isArray(c.p) ? c.p : [c.p]).forEach(say);
    if (c.terms && c.terms.length) {
      say('Key terms.');
      c.terms.forEach(function (t) { say(t.t + '. ' + t.d); });
    }
    if (c.formula) say('There is a formula on screen.');
    if (c.split) say('There are two lists on screen to compare.');
    /* Tables: silence. See the block above. */
    if (c.example) say('There is a worked figure on screen.');
    if (c.doc) {
      /* NAMED, because Level 1 is a documents unit and half its cards are a
         picture of a piece of paper. "There is a document" would leave a
         listener wondering which; the kind is the one word that helps. */
      say('There is a ' + String((c.doc.tag || c.doc.title || 'document')).toLowerCase() +
        ' on screen to look at.');
    }
    if (c.flow) say('There is a sequence of steps on screen.');
    if (c.callout) say(c.callout.text);
    /* Prefixed with the label the card itself prints, so a listener hears the
       same framing a reader sees. */
    if (c.notyet) say('Not at this level. ' + c.notyet);
    if (c.examtrap) {
      say('Watch out. ' + (typeof c.examtrap === 'string' ? c.examtrap : (c.examtrap.text || '')));
    }
    if (c.worked) say('There is a worked example on screen to step through.');
    return out;
  }

  /* SPOKEN AS SENTENCES, NOT AS ONE UTTERANCE, and that is not a stylistic
     preference. iOS Safari cuts speech off after roughly fifteen seconds of a
     single utterance, and the median card here runs well past that, so one
     utterance per card would be truncated on every iPhone in the middle of the
     second paragraph. Queued sentences also give the pauses a reader expects,
     and let the stop button take effect within a sentence rather than at the
     end of the card. */
  function sentences(text) {
    /* No lookbehind — a regex literal with one is a parse error on Safari
       before 16.4, and because it is a literal the whole file dies at load,
       taking the entire Level 1 module with it. Mark each boundary, then split
       on the marker. */
    return String(text).replace(/([.!?])\s+/g, '$1\u0001').split('\u0001')
      .filter(function (x) { return x.trim(); });
  }

  function stopSpeaking() {
    var e = speechEngine();
    if (e && e.cancel) e.cancel();
    S.speaking = false;
    paintSpeakButton();
  }

  /* The button is repainted in place rather than by re-rendering, for the same
     reason the mock clock is: a repaint rebuilds the whole screen, and doing
     that from an utterance callback would fight whatever the reader is doing.
     Guarded because the build check drives this through an element that has no
     querySelector. */
  function paintSpeakButton() {
    if (!_host || !_host.querySelector) return;
    var el = _host.querySelector('.a1-speak');
    if (!el) return;
    /* The two spans are updated rather than the button's textContent, which
       would replace them with a bare string and take the narrow-screen layout
       with it. */
    var icon = el.querySelector && el.querySelector('.a1-speak-i');
    var label = el.querySelector && el.querySelector('.a1-speak-l');
    if (icon) icon.textContent = S.speaking ? '\u25a0' : '\u25b6';
    if (label) label.textContent = S.speaking ? 'Stop' : 'Listen';
    if (el.classList) {
      if (S.speaking) el.classList.add('is-on'); else el.classList.remove('is-on');
    }
    el.setAttribute('aria-label', S.speaking ? 'Stop reading this card aloud' : 'Read this card aloud');
  }

  function speakCard(c) {
    var e = speechEngine();
    if (!e || !root.SpeechSynthesisUtterance) return;
    e.cancel();
    var lines = [];
    cardSpeech(c).forEach(function (t) { lines = lines.concat(sentences(t)); });
    if (!lines.length) return;

    var voice = englishVoice();
    var utterances = lines.map(function (line) {
      var u = new root.SpeechSynthesisUtterance(line);
      u.lang = 'en-GB';
      u.rate = 0.95;
      if (voice) u.voice = voice;
      return u;
    });
    /* Only the last one clears the flag. Attaching it to every utterance would
       end the run at the first full stop. */
    var last = utterances[utterances.length - 1];
    last.onend = last.onerror = function () { S.speaking = false; paintSpeakButton(); };
    S.speaking = true;
    paintSpeakButton();
    utterances.forEach(function (u) { e.speak(u); });
  }

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
  /* Mode-gated, not just practiceLo: `practiceLo` survives a finished endless
     run, so a LESSON opened afterwards answered isEndless() true — its nextq
     took the endless branch, qIdx ran past the checks, and finish() was never
     reached. A lesson could not be completed until something else happened to
     reset practiceLo. */
  function isEndless() { return S.mode === 'practice' && S.practiceLo === 'endless'; }

  function topUpEndless() {
    var pool = livePool();
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
    } else if (lo === 'refresh') {
      S.practiceQs = dueQuestions().slice(0, PRACTICE_LEN);
    } else if (lo === 'mix') {
      S.practiceQs = drawWeighted(PRACTICE_LEN);
    } else {
      var pool = livePool().filter(function (q) { return q.lo === lo; });
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
    /* Resume the reading position if this is the step the reader left. */
    var pos = readPos();
    if (pos && pos.lessonId === id) {
      var l = lessonById(id);
      var nCards = ((l && l.cards) || []).length;
      if (n0(pos.cardIdx) > 0 && pos.cardIdx < nCards) S.cardIdx = pos.cardIdx;
    }
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
    S.wrText = ''; S.wrShown = false; S.wrTicks = {};
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
      _calc = root.AATCalc.create({ displayId: 'a1CalcDisplay', panelId: 'a1CalcSheet' });
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
        /* Lit at render time as well as patched live — a repaint rebuilds this
           markup and would otherwise put out a light the sum still has on. */
        root.AATCalc.opClass(k, C.pending) +
        '" type="button" data-a1="calckey" data-k="' + esc(k.k) + '"' +
        (k.val != null ? ' data-v="' + esc(k.val) + '"' : '') +
        root.AATCalc.opAttrs(k, C.pending) +
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
    /* 'quiz' only. This also admitted 'practice' — the PICKER, which has no
       question on it — so leaving a run on an unanswered numeric question
       painted the calculator, and sometimes the whole open keypad sheet, over
       the outcome cards, with a "Use this value" that wrote into a question
       nobody could see. */
    if (S.screen !== 'quiz') return '';
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
    /* Revealing the model moves to the next step of the same question, so it
       sounds like one. Recording the mark goes through settle(), which makes
       the right-or-wrong noise instead. */
    wrshow: 1,
    startpractice: 1, startmock: 1, practice: 1, retry: 1,
    topath: 1, jump: 1, step: 1, stepall: 1,
    review: 1, reviewall: 1, reviewwrong: 1, reviewq: 1,
    reviewnext: 1, reviewprev: 1, reviewback: 1, reviewlist: 1,
    /* Retiring is a decision about the pool, not a move through it, so it gets
       the flat click rather than the advance noise. */
    retire: 1, restore: 1,
    /* Turning a card over is a move to the next step of the same card, so it
       sounds like one. Grading is not here: it makes the right-or-wrong noise
       itself, the way settle() does. */
    gloss: 1, startflash: 1, flashflip: 1,
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
    /* SELF-ASSESSED, at the assessment's own pass mark. A written task has no
       key to compare against, so "correct" means the reader claimed at least
       70% of the rubric. */
    if (t === 'written') return wrAwarded(q) >= qMarks(q) * 0.7;
    return false;
  }

  function finish() {
    var checks = currentQuestions();
    /* A mock whose clock ran out has a question OPEN — possibly fully answered
       — that mocknext never banked. Grade it on the way out, exactly as
       mocknext would have: without this the review said "the clock ran out
       before you reached this one" about a question the reader was looking at,
       and their answer was discarded unmarked. The length guard means the
       normal path (mocknext banks the last question, then calls finish) can
       never grade it twice. */
    if (S.mode === 'mock' && S.mockResults && S.mockResults.length === S.qIdx && checks[S.qIdx]) {
      var qOpen = checks[S.qIdx];
      var okOpen = gradeAnswer(qOpen);
      if (okOpen) S.score++; else S.practiceMissed.push(qOpen);
      S.mockResults.push({ id: qOpen.id, lo: qOpen.lo, correct: okOpen, given: snapshotAnswer() });
      recordPractice(qOpen.lo, okOpen);
      recordQuestion(qOpen.id, okOpen);
    }
    var pct = checks.length ? Math.round((S.score / checks.length) * 100) : 100;
    /* THREE MODES, TESTED BY NAME. This was `mode !== 'practice'`, which meant
       "a lesson" for as long as there were two modes; the mock added a third,
       and reaching this with it would have written a lesson result under a null
       lesson id — ticking a rung on the ladder for a step never opened. A new
       mode must not be able to fall into the lesson branch by default. */
    var xpBefore = data.xp;
    if (S.mode === 'lesson') {
      var prev = rec(S.lessonId);
      data.lessons[S.lessonId] = { best: Math.max(pct, prev ? prev.best : 0) };
      data.xp += S.score * 5 + (pct >= 60 ? 20 : 0);
      /* The step is finished, so there is no reading position to come back to. */
      clearPos();
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
    /* What this run just earned — the reward loop used to accrue invisibly. */
    S.lastXp = data.xp - xpBefore;
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

  function wireCalcDrag(el) {
    /* Dragged by its screen — the one surface on the sheet that is not a key.
       Re-run on every mount because the sheet is rebuilt on repaint, and the
       shared helper puts a moved panel back where the reader left it. */
    if (!root.AATCalc || !root.AATCalc.draggable) return;
    root.AATCalc.draggable({
      key: 'aat1',
      panel: el.querySelector('.a1-calcsheet'),
      handle: el.querySelector('.a1-calcsheet .a1-calc-screen')
    });
  }

  function wire(el) {
    _host = el;
    wireCalcDrag(el);
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
      /* THE SEARCH BOX IS BOUND HERE, LIKE EVERY OTHER INPUT, and not in
         handle(). handle() is only ever reached from the click listener at the
         bottom of this function, so an `input` binding written there is never
         installed — the box takes text and nothing happens, which is a defect
         that looks exactly like a filter with no matches.

         AND IT DOES REPAINT ON THE KEYSTROKE, unlike the written task below:
         the point of typing here is to narrow the list, so the list has to be
         rebuilt. What that costs is the caret, and mount() puts it back — see
         the note at the end of it. */
      if (act === 'glossin') {
        n.addEventListener('input', function () { S.glossQuery = n.value; rerender(); });
        return;
      }
      if (act === 'wrinput') {
        /* No repaint on the keystroke. Every other input here is a short
           number; this is several lines of prose, and rerendering would drop
           the caret to the end of it on every character typed. */
        n.addEventListener('input', function () { S.wrText = n.value; });
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
    orderdown: 1, ordersubmit: 1, trycheck: 1, wrshow: 1, wrmark: 1,
    mocknext: 1, nextq: 1, next: 1,
    /* The two new submits belong here for the same reason every other submit
       does: advancing repaints synchronously, so the second tap of a
       double-tap lands on whatever button has taken the same coordinates on
       the next question. */
    plsubmit: 1, egsubmit: 1, retire: 1,
    /* The grade buttons sit where the flip button was a moment ago, which is
       the double-tap this guard exists for. */
    flashflip: 1, flashyes: 1, flashno: 1 };

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
      stopSpeaking();
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
      /* The answer on screen is banked before anything else happens. It was
         graded — settle() scored it, and endEndless() counts it as attempted —
         but only nextq recorded it, so leaving right after answering dropped
         that question from the per-outcome tally and the mistakes backlog. The
         one most likely to be a miss is the one someone leaves on. */
      if (S.mode === 'practice' && S.screen === 'quiz' && q && S.answered !== null) {
        if (S.answered === false) S.practiceMissed.push(q);
        recordPractice(q.lo, S.answered === true);
        recordQuestion(q.id, S.answered === true);
        save();
      }
      S.calcOpen = false;
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
    if (act === 'gloss') { S.screen = 'gloss'; S.flash = null; return rerender(); }
    if (act === 'glossclear') { S.glossQuery = ''; return rerender(); }
    if (act === 'startflash') { startFlash(); return rerender(); }
    if (act === 'flashflip') {
      if (!S.flash || S.flash.shown) return;
      S.flash.shown = true;
      return rerender();
    }
    if (act === 'flashyes' || act === 'flashno') {
      var F = S.flash;
      /* Guarded rather than assumed: the buttons only render once the card is
         turned over, but a tap from the previous paint is still live while the
         finger is travelling — and grading a card the reader has not seen the
         back of is exactly the thing this must not do. */
      if (!F || !F.shown || F.idx >= F.cards.length) return;
      var got = act === 'flashyes';
      /* Written through the same recorder every graded answer goes through, so
         a term picks up the same spaced-repetition schedule as a question. */
      recordQuestion(glossId(F.cards[F.idx].t), got);
      save();
      if (got) F.got++;
      beep(got ? 'correct' : 'wrong');
      F.idx++; F.shown = false;
      return rerender();
    }
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

    if (act === 'speak') {
      /* Guarded here as well as on the button, because a tap from the previous
         paint is still live while the finger is travelling — and the card
         index does not move when the lesson turns to its questions, so a stale
         tap would read a card aloud over a question. */
      if (S.speaking) stopSpeaking();
      else if (speechOffered(cards[S.cardIdx])) speakCard(cards[S.cardIdx]);
      return;
    }

    if (act === 'back') {
      /* The card on screen is about to change, so what is being read no longer
         matches what is being shown. */
      stopSpeaking();
      S.cardIdx = Math.max(0, S.cardIdx - 1); resetCardState(); return rerender();
    }
    if (act === 'next') {
      stopSpeaking();
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
    if (act === 'wrshow') {
      /* The guard is in the handler as well as on the button. Disabling a
         button is a hint to a person and no obstacle at all to a harness or a
         stale repaint, and reading the model without writing first is the one
         thing this type has to prevent. */
      if (!wrEnough(q)) return;
      S.wrShown = true;
      return rerender();
    }
    if (act === 'wrtick') {
      if (S.answered !== null) return;
      var wi = +n.getAttribute('data-i');
      S.wrTicks[wi] = !S.wrTicks[wi];
      return rerender();
    }
    if (act === 'wrmark') {
      if (!S.wrShown) return;
      return settle(q);
    }
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
    if (act === 'restore') {
      restoreRetired();
      return rerender();
    }
    /* Toggling the retirement does not advance and does not grade — it repaints
       so the button can say what it now means. Guarded the same way the graded
       submits are: it sits next to the advance button, and a stray second tap
       of a double-tap must not land on it. */
    if (act === 'retire') {
      if (!retireOffered(q)) return;
      toggleRetire(q.id);
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
      /* A lesson miss is remembered too — under its synthetic id, in the map
         kept apart from the practice record (see `data.lessonQs`). This is
         what lets the mistakes backlog offer back a concept failed inside a
         lesson, which used to vanish without trace. */
      if (S.mode === 'lesson' && q && S.answered !== null && l && !l.isSheet) {
        recordQuestion(l.id + LESSON_Q_SEP + S.qIdx, S.answered === true);
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
    gloss:    'topath',
    /* A flashcard run backs out to the glossary it was started from, not to
       the ladder: leaving a run is not leaving the vocabulary. */
    flash:    'gloss',
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
    /* Exposed so the build check can assert what a card SAYS against the
       card's own data. None of it is observable from the screen — a listener
       cannot tell a table deliberately skipped from a table that failed to
       render. */
    cardSpeech: cardSpeech,
    atRoot: atRoot,
    back: back,
    /* `screen` is optional and defaults to the ladder, which is the only thing
       the app itself ever wants. It is settable so the build checks can mount
       the practice picker directly rather than asserting a regex against this
       file and calling that a test. */
    /* SPEECH IS STOPPED WHEREVER THE CLOCK IS. Both outlive the screen that
       started them, and a voice reading bookkeeping over another subject is
       the same defect as a clock still ticking under one, with a louder
       failure mode. */
    reset: function (screen) { stopMockClock(); stopSpeaking(); S.confirmExit = false; S.screen = screen || 'path'; },
    home: function () {
      stopMockClock();
      stopSpeaking();
      /* The header's Home button leaves a mock outright, so the guard must not
         survive it: left set, it would reappear over the ladder the next time
         anything repainted, asking about a paper that no longer exists. */
      S.confirmExit = false;
      S.mode = 'lesson';
      S.lessonId = null;
      S.screen = 'path';
    },
    suspend: function () { stopMockClock(); stopSpeaking(); S.confirmExit = false; },
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
