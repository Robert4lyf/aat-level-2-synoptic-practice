/* Guitar — the subject shell.
 *
 * A self-rendering subject on the same terms as Levels 1 and 3: app.js
 * delegates to GUITAR_UI.mount() and takes no further part, so nothing here can
 * disturb the shared lesson player that every other subject rides on.
 *
 * WHAT THIS IS, AT THIS STAGE
 *
 * The lessons do not exist yet — they are the next step. What this screen does
 * is put the whole substrate on one page and let it be played: pick a scale,
 * root and position, see it on the neck and in tab, hear it at a tempo you
 * choose. That is the honest thing to ship after six steps of engine work, and
 * it is also the fastest way to notice that something sounds wrong.
 *
 * STORAGE
 *
 * Its own key, prep_v2_guitar, written directly rather than through app.js's
 * Storage — the same arrangement as aat1-ui.js. progress-backup.js picks it up
 * automatically because it prefix-matches prep_v2_.
 *
 * `profile` (handedness, touch) travels with a backup; `settings` (tuning,
 * capo, tempo) is per-device and mergeSubject keeps the local copy.
 */
(function (root) {
  'use strict';

  var SY = root.GuitarSyllabus;
  var LD = root.GuitarLearnData;
  var XD = root.GuitarExercises;

  var STORE_KEY = 'prep_v2_guitar';
  var E = root.GuitarEngine, R = root.GuitarRender, A = root.GuitarAudio;

  var data = {
    profile:  { handed: 'right', touch: 'flesh' },
    /* countIn is beats, not a boolean, so the number lives in one place rather
       than as a flag here and a 4 buried at each call site. Zero is off. */
    settings: { tuning: 'standard', capo: 0, tempo: 90, countIn: 4 },
    /* Keyed by lesson id, as the plan's storage shape specifies. Written
       through the generic merge in progress-backup.js, which takes the larger
       of two numbers field-wise — so `at` being a timestamp means the more
       recent completion wins, and `done` being a boolean survives either way. */
    lessons:  {},
    stats:    { plays: 0, cards: 0 }
  };

  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        var p = JSON.parse(raw) || {};
        if (p.profile)  { data.profile  = Object.assign(data.profile, p.profile); }
        if (p.settings) { data.settings = Object.assign(data.settings, p.settings); }
        if (p.stats)    { data.stats    = Object.assign(data.stats, p.stats); }
        /* Lessons was added when the course landed and this line was not, so
           completion was written to storage on every finish and never read back:
           every lesson showed as undone after a reload, and the write looked
           fine from the outside. Assigned onto the default rather than
           replacing it, so a stored object missing keys does not remove them. */
        if (p.lessons)  { data.lessons  = Object.assign(data.lessons || {}, p.lessons); }
      }
    } catch (e) { /* corrupt storage: start clean rather than fail to render */ }
    /* Storage is the one place a tempo arrives unchecked — an older build's
       bounds, a synced device, a hand-edited key. Clamped here so nothing
       downstream has to wonder. */
    data.settings.tempo = clampTempo(data.settings.tempo);
  }
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(data)); } catch (e) {}
    if (root.ProgressSync) root.ProgressSync.noteLocalChange();
  }

  /* Screen state is deliberately not persisted: it is a scratchpad, and
     restoring someone into the middle of a scale they were poking at is not a
     kindness. */
  var S = {
    /* 'lessons' is the course; 'workshop' is the scales and chords bench. The
       bench was here first and is still where the generated material lives, but
       it is a tool rather than the course, so it stops being the landing page
       the moment there are lessons to land on. */
    screen: 'lessons',
    lessonId: null, cardIndex: 0,
    scaleId: 'minPent', rootPc: 9, positionKind: 'box', positionIndex: 0,
    sequence: 'straight', descending: false, rhythm: '', loop: false
  };

  var transport = null;
  /* Tempo bounds. Wider than a metronome's 40–208 at the slow end, because the
     first pass at an unfamiliar shape is played slower than any metronome
     offers, and that is the tempo that actually teaches it. */
  var TEMPO_MIN = 30;
  var TEMPO_MAX = 240;
  function clampTempo(v) {
    v = Math.round(Number(v));
    if (!isFinite(v)) return 90;
    return Math.max(TEMPO_MIN, Math.min(TEMPO_MAX, v));
  }

  var _host = null;

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function fretboard() {
    return E.makeFretboard({
      tuning: data.settings.tuning,
      capo: data.settings.capo,
      handed: data.profile.handed
    });
  }
  /* The playback cursor addresses notes by array index, and the transport
     sorts by beat when it loads. If the figures were drawn from an unsorted
     array the two would disagree and the cursor would light the wrong note —
     silently, and only for exercises whose generator happened to emit out of
     order. Sorted here, once, and the same array goes to both. */
  function byBeat(notes) {
    return (notes || []).slice().sort(function (a, b) { return a.beat - b.beat; });
  }
  function exercise() {
    return E.generateExercise({
      scaleId: S.scaleId, rootPc: S.rootPc,
      positionKind: S.positionKind, positionIndex: S.positionIndex,
      sequence: S.sequence, descending: S.descending,
      rhythm: S.rhythm || undefined,
      tuning: data.settings.tuning, capo: data.settings.capo, handed: data.profile.handed,
      tempo: data.settings.tempo
    });
  }
  function sortedExercise() {
    var ex = exercise();
    if (!ex.fault) ex.notes = byBeat(ex.notes);
    return ex;
  }

  /* Asked of the engine, not written down. An earlier draft listed
     three-notes-per-string from the plan; the engine had dropped it, so the
     option existed, faulted on selection and blanked the whole panel. The UI
     offers what the engine can actually build for this scale, and nothing else. */
  var KIND_LABELS = { box: 'Box position', '3nps': 'Three per string', string: 'One string' };
  function shapeKinds() {
    return ['box', '3nps', 'string']
      .filter(function (k) { return E.positionCount(S.scaleId, k) > 0; })
      .map(function (k) { return { v: k, t: KIND_LABELS[k] || k }; });
  }

  function opts(list, current) {
    return list.map(function (o) {
      return '<option value="' + esc(o.v) + '"' + (String(o.v) === String(current) ? ' selected' : '') + '>' +
             esc(o.t) + '</option>';
    }).join('');
  }
  function noteOptions() {
    var out = [];
    for (var i = 0; i < 12; i++) out.push({ v: i, t: E.midiToName(i) });
    return out;
  }

  /* ── The course ───────────────────────────────────────────────────────────
     A lesson is a stack of cards; a card is some prose and at least one thing
     to play. The player shows one card at a time rather than the whole lesson
     scrolled together, because the format only works if the reader stops and
     plays — and a page that can be scrolled past will be. */

  function lessonDone(id) {
    var rec = data.lessons && data.lessons[id];
    return !!(rec && rec.done);
  }
  function markDone(id) {
    if (!data.lessons) data.lessons = {};
    data.lessons[id] = { done: true, at: Date.now() };
    save();
  }

  /* Move to a card and adopt whatever tempo it prescribes. Called from the
     navigation handlers rather than from the renderer: doing it during render
     would reset the tempo on every repaint, so a player who nudged it to 48
     would watch it snap back the next time anything redrew. */
  function goToCard(lessonId, index) {
    var lesson = LD.lesson(lessonId);
    if (!lesson) return;
    S.lessonId = lessonId;
    S.cardIndex = Math.max(0, Math.min(index, lesson.cards.length - 1));
    S.screen = 'lesson';
    var card = lesson.cards[S.cardIndex];
    var el = card && (card.tab || card.playalong);
    var ex = el && XD.exercise(el.exercise);
    /* A demonstration's pace is its own and is not the reader's tempo, so it
       neither adopts nor overwrites the setting. */
    if (ex && ex.demo) { save(); return; }
    var bpm = (el && el.bpm) || (ex && ex.bpm);
    /* A card prescribes a starting tempo, and adopting it is right until the
       player has said otherwise. Someone working through the unit at 40 because
       that is where the shape holds should not be dragged back to 54 by every
       Next — so once the tempo has been touched by hand, this stops overriding
       it for the rest of the lesson. Opening a lesson clears the flag, because
       a prescribed tempo is worth offering again at the start. */
    if (bpm && !S.tempoTouched) data.settings.tempo = clampTempo(bpm);
    save();
  }

  function unitProgress(unitId) {
    var ls = LD.lessonsFor(unitId);
    var done = ls.filter(function (l) { return lessonDone(l.id); }).length;
    return { done: done, total: ls.length };
  }

  function lessonsHtml() {
    var out = '';
    SY.UNITS.forEach(function (u) {
      var ls = LD.lessonsFor(u.id);
      var prog = unitProgress(u.id);
      /* A unit with no lessons yet is shown rather than hidden. Someone
         following the course should be able to see what is coming and what is
         not there — a syllabus with silent gaps is how the last section of a
         course turns out to be empty. */
      if (!ls.length) {
        out += '<div class="gtr-panel gtr-unit is-empty">' +
          '<h2 class="gtr-h">' + esc(u.id) + ' · ' + esc(u.title) + '</h2>' +
          '<p class="gtr-detail">Not written yet. ' +
            SY.criteriaFor(u.id).length + ' criteria are mapped out for it.</p>' +
        '</div>';
        return;
      }
      out += '<div class="gtr-panel gtr-unit">' +
        '<h2 class="gtr-h">' + esc(u.id) + ' · ' + esc(u.title) + '</h2>' +
        '<p class="gtr-detail">' + prog.done + ' of ' + prog.total + ' done</p>' +
        '<ul class="gtr-lessonlist">' +
        ls.map(function (l) {
          return '<li><button class="gtr-lessonbtn" type="button" data-lesson="' + esc(l.id) + '">' +
            '<span class="gtr-lesson-icon" aria-hidden="true">' + esc(l.icon || '•') + '</span>' +
            '<span class="gtr-lesson-text">' +
              '<span class="gtr-lesson-title">' + esc(l.title) + '</span>' +
              '<span class="gtr-lesson-sum">' + esc(l.summary || '') + '</span>' +
            '</span>' +
            '<span class="gtr-lesson-state">' + (lessonDone(l.id) ? '✓' : '') + '</span>' +
          '</button></li>';
        }).join('') +
        '</ul></div>';
    });
    return out;
  }

  /* Render one card's element. Each returns figure markup plus, where the
     element is playable, the notes the transport should be given — so the
     player never has to look the exercise up a second time and cannot end up
     showing one thing and playing another. */
  /* A card may name a scale shape instead of writing its notes out, and the
     engine produces them. That is what the generator was built for in step 4,
     and until M5 no lesson had ever called it — the whole M strand is scale
     work, and writing five box positions by hand for every key would be both
     enormous and a worse source of truth than the shape itself.
 
     ONE THING IS ADDED HERE that the generator does not do: picking fingers.
     It returns notes with hand 'f' and no finger, so a generated run would show
     no i/m letters at all — in a fingerstyle course whose fifth lesson is about
     never repeating a finger. Strict alternation is applied over the run, which
     is what the course teaches and what any player would do with a scale. */
  function generated(spec) {
    var ex = E.generateExercise({
      scaleId: spec.scaleId, rootPc: spec.rootPc,
      positionKind: spec.positionKind || 'box', positionIndex: spec.positionIndex || 0,
      sequence: spec.sequence || 'straight', descending: !!spec.descending,
      rhythm: spec.rhythm || ''
    });
    if (ex.fault) return null;
    var pair = spec.fingers || ['i', 'm'];
    var k = 0, lastBeat = null;
    var notes = ex.notes.map(function (n) {
      /* Notes sharing a beat are one chord and take one finger each in order;
         only a NEW beat advances the alternation. */
      if (lastBeat !== null && n.beat !== lastBeat) k++;
      lastBeat = n.beat;
      return Object.assign({}, n, { hand: 'p', finger: pair[k % pair.length] });
    });
    return { notes: notes, title: ex.meta ? spec.title || 'Scale shape' : 'Scale shape',
             bpm: spec.bpm || 72, beatsPerBar: 4, generated: true, fb: ex.fb };
  }

  /* The fretboard a card is drawn and played on.
     A lesson about DADGAD has to show DADGAD whatever the player has their own
     guitar set to, so a card may declare `context: { tuning, capo }`. Without
     one it inherits the settings, which is right for every unit that is not
     about tuning.

     HANDEDNESS IS NEVER TAKEN FROM THE CARD. It comes from the profile, always.
     A card can say which instrument it is talking about; it does not get to say
     whose hands are playing it. */
  function cardFretboard(card) {
    var ctx = card && card.context;
    return E.makeFretboard({
      tuning: (ctx && ctx.tuning) || data.settings.tuning,
      capo: (ctx && ctx.capo !== undefined) ? ctx.capo : data.settings.capo,
      handed: data.profile.handed
    });
  }

  function elementHtml(card, fb) {
    var figures = '', playable = null, caption = '';

    if (card.tab || card.playalong) {
      var el = card.tab || card.playalong;
      var ex = el.generate ? generated(el.generate) : XD.exercise(el.exercise);
      if (ex) {
        var notes = byBeat(ex.notes);
        /* A generated exercise carries the fretboard it was built on, for the
           same reason a card does: the notes and the neck they were chosen for
           must not come apart. */
        if (ex.fb) fb = ex.fb;
        figures += R.tab({ notes: notes, title: ex.title,
                           beatsPerBar: ex.beatsPerBar || 4 }, fb);
        /* A demonstration has no tempo: its bpm is derived from the fixed
           seconds-per-beat it declares, so the gap between two chords being
           compared is the same whatever the reader has the slider set to. */
        var demoBpm = (ex.demo && ex.beatSeconds > 0) ? 60 / ex.beatSeconds : 0;
        playable = { notes: notes, demo: !!ex.demo,
                     bpm: demoBpm || el.bpm || ex.bpm || data.settings.tempo,
                     loop: !!el.loop, title: ex.title };
        caption = el.caption || el.note || '';
      } else {
        figures += '<div class="gtr-fault">Exercise "' + esc(el.exercise) + '" is missing.</div>';
      }
    }
    if (card.chordbox) {
      var v = E.findVoicing(card.chordbox.chordId, card.chordbox.rootPc, fb);
      if (v) figures += R.chordBox(v, fb);
    }
    if (card.fretboard) {
      var fnotes = card.fretboard.notes || [];
      figures += R.neckDiagram({ notes: fnotes, root: card.fretboard.rootPc,
                                 labels: true, title: card.fretboard.title || 'Fretboard' }, fb);
    }
    if (card.pointer) {
      var pt = card.pointer;
      figures += '<div class="gtr-pointer">' +
        '<p class="gtr-pointer-song">' + esc(pt.song) + ' — ' + esc(pt.artist) + '</p>' +
        '<p class="gtr-detail"><strong>Listen for</strong> ' + esc(pt.listenFor) + '</p>' +
        '<p class="gtr-detail"><strong>Then try</strong> ' + esc(pt.thenTry) + '</p>' +
      '</div>';
    }
    return { figures: figures, playable: playable, caption: caption };
  }

  /* What to actually do with the thing on the card, and when to stop.
     Added because the format produced cards that took eleven seconds: prose,
     a figure, a Play button, and nothing telling the reader to stay. The
     playing is where the minutes are supposed to go, and until this existed
     nothing asked for any. `until` is the load-bearing half — a target you can
     tell you have hit turns a card you skim into a card you work at. */
  function practiceHtml(card) {
    var pr = card && card.practice;
    if (!pr) return '';
    return '<div class="gtr-practice">' +
      '<p class="gtr-practice-do">' + esc(pr.do) + '</p>' +
      '<p class="gtr-practice-until"><span class="gtr-practice-label">You have it when</span> ' +
        esc(pr.until) + '</p>' +
      (pr.mins ? '<p class="gtr-practice-mins">About ' + esc(String(pr.mins)) +
                 ' minute' + (pr.mins === 1 ? '' : 's') + '</p>' : '') +
    '</div>';
  }

  /* Say so when a card is not on the player's own guitar. Silence here is how
     someone retunes to follow a lesson that never asked them to. */
  function contextNote(card, fb) {
    var ctx = card && card.context;
    if (!ctx) return '';
    var bits = [];
    if (ctx.tuning && ctx.tuning !== data.settings.tuning) {
      bits.push(esc(E.TUNINGS[fb.tuning].name) + ' · ' +
                esc([6,5,4,3,2,1].map(function (st) { return E.midiToName(E.openMidi(st, fb)); }).join(' ')));
    }
    if (ctx.capo !== undefined && ctx.capo !== data.settings.capo) {
      bits.push(ctx.capo ? 'capo at fret ' + ctx.capo : 'no capo');
    }
    if (!bits.length) return '';
    return '<p class="gtr-context">This card is written for ' + bits.join(', ') + '.</p>';
  }

  function lessonHtml() {
    var lesson = LD.lesson(S.lessonId);
    if (!lesson) { S.screen = 'lessons'; return lessonsHtml(); }
    var idx = Math.max(0, Math.min(S.cardIndex, lesson.cards.length - 1));
    var card = lesson.cards[idx];
    var fb = cardFretboard(card);
    var built = elementHtml(card, fb);
    _cardPlayable = built.playable;
    /* The transport gets the fretboard the figure was DRAWN on, not one rebuilt
       from settings when Play is pressed. Rebuilding is how a DADGAD card ends
       up sounding in standard tuning while showing the right dots — the exact
       shape of the chord-box defect from step 6, one layer up. */
    _cardFb = fb;

    var dots = lesson.cards.map(function (c, i) {
      return '<span class="gtr-dot' + (i === idx ? ' is-here' : '') +
             (i < idx ? ' is-past' : '') + '" aria-hidden="true"></span>';
    }).join('');

    var last = idx === lesson.cards.length - 1;

    return '<div class="container gtr-wrap">' +
      '<div class="gtr-lessonbar">' +
        '<button class="gtr-btn" id="gtrBack" type="button">← Lessons</button>' +
        '<span class="gtr-lessonbar-title">' + esc(lesson.title) + '</span>' +
        '<span class="gtr-lessonbar-count">' + (idx + 1) + '/' + lesson.cards.length + '</span>' +
      '</div>' +
      '<div class="gtr-panel gtr-card">' +
        '<div class="gtr-dots">' + dots + '</div>' +
        '<h2 class="gtr-h">' + esc(card.h) + '</h2>' +
        (card.p || []).map(function (para) {
          return '<p class="gtr-p">' + esc(para) + '</p>';
        }).join('') +
        '<div class="gtr-figures">' + built.figures + '</div>' +
        (built.caption ? '<p class="gtr-detail">' + esc(built.caption) + '</p>' : '') +
        practiceHtml(card) +
        contextNote(card, fb) +
        (built.playable ? transportHtml(built.playable) : '') +
      '</div>' +
      '<div class="gtr-cardnav">' +
        '<button class="gtr-btn" id="gtrPrev" type="button"' + (idx === 0 ? ' disabled' : '') + '>Back</button>' +
        (last
          ? '<button class="gtr-play" id="gtrFinish" type="button">' +
              (lessonDone(lesson.id) ? 'Done ✓' : 'Mark done') + '</button>'
          : '<button class="gtr-play" id="gtrNext" type="button">Next</button>') +
      '</div>' +
    '</div>';
  }

  /* The transport markup is shared between the lesson player and the workshop,
     so the tempo control someone learned in one is the same control in the
     other — and there is one place to fix when it is wrong. */
  function transportHtml(playable) {
    /* A demonstration offers no tempo control, because there is no tempo to
       control. Showing a disabled slider would be worse than showing none: it
       invites the reader to wonder what they did wrong. */
    if (playable && playable.demo) {
      return '<div class="gtr-transport">' +
          '<button class="gtr-play" id="gtrPlay" type="button">▶ Play</button>' +
          '<button class="gtr-btn" id="gtrStop" type="button">■ Stop</button>' +
          '<label class="gtr-inline"><input id="gtrCountIn" type="checkbox"' +
            (data.settings.countIn > 0 ? ' checked' : '') + '> Count in</label>' +
        '</div>' +
        '<p class="gtr-detail">Played at a fixed pace so the two can be compared.</p>' +
        '<p class="gtr-detail" id="gtrAudioNote"></p>';
    }
    /* Always the working tempo, never the card's own number. A card prescribes
       a starting tempo, but the moment it is displayed from one place and
       played from another the two disagree — the box would read 44 while the
       transport ran at 90. The card's bpm is applied on NAVIGATION instead
       (see goToCard), so there is one value here and it is the one that plays. */
    var bpm = clampTempo(data.settings.tempo);
    return '<div class="gtr-transport">' +
        '<button class="gtr-play" id="gtrPlay" type="button">▶ Play</button>' +
        '<button class="gtr-btn" id="gtrStop" type="button">■ Stop</button>' +
        '<label class="gtr-inline"><input id="gtrLoop" type="checkbox"' +
          ((playable && playable.loop) || S.loop ? ' checked' : '') + '> Loop</label>' +
        '<label class="gtr-inline"><input id="gtrCountIn" type="checkbox"' +
          (data.settings.countIn > 0 ? ' checked' : '') + '> Count in</label>' +
      '</div>' +
      '<div class="gtr-tempo">' +
        '<span class="gtr-tempo-label" id="gtrTempoLabel">Tempo</span>' +
        '<button class="gtr-step" id="gtrTempoDown" type="button" aria-label="Slower by one bpm">−</button>' +
        '<input id="gtrTempoNum" class="gtr-tempo-num" type="number" inputmode="numeric" ' +
          'min="' + TEMPO_MIN + '" max="' + TEMPO_MAX + '" step="1" ' +
          'aria-labelledby="gtrTempoLabel" value="' + bpm + '">' +
        '<button class="gtr-step" id="gtrTempoUp" type="button" aria-label="Faster by one bpm">+</button>' +
        '<span class="gtr-tempo-unit">bpm</span>' +
        '<input id="gtrTempo" class="gtr-tempo-range" type="range" ' +
          'min="' + TEMPO_MIN + '" max="' + TEMPO_MAX + '" step="1" ' +
          'aria-labelledby="gtrTempoLabel" value="' + bpm + '">' +
      '</div>' +
      '<p class="gtr-detail" id="gtrAudioNote"></p>';
  }

  var _cardPlayable = null;
  var _cardFb = null;

  function html() {
    if (S.screen === 'lesson') return lessonHtml();
    if (S.screen === 'lessons') {
      return '<div class="container gtr-wrap">' +
        '<div class="gtr-nav">' +
          '<button class="gtr-navbtn is-on" type="button" data-screen="lessons">Lessons</button>' +
          '<button class="gtr-navbtn" type="button" data-screen="workshop">Workshop</button>' +
        '</div>' + lessonsHtml() + '</div>';
    }
    return workshopHtml();
  }

  function workshopHtml() {
    var fb = fretboard();
    var ex = sortedExercise();
    var scaleIds = Object.keys(E.SCALES);
    var posCount = E.positionCount(S.scaleId, S.positionKind);
    var posOptions = [];
    for (var p = 0; p < Math.max(posCount, 1); p++) {
      posOptions.push({ v: p, t: S.positionKind === 'string' ? 'String ' + (p + 1) : 'Position ' + (p + 1) });
    }

    var figure, detail;
    if (ex.fault) {
      figure = '<div class="gtr-fault">' + esc(ex.fault) + '</div>';
      detail = '';
    } else {
      var charPc = E.characteristicPc(S.scaleId, S.rootPc);
      figure =
        R.neckDiagram({ notes: ex.notes, root: S.rootPc, characteristic: charPc, labels: true,
                        title: E.midiToName(S.rootPc) + ' ' + E.SCALES[S.scaleId].name }, ex.fb) +
        R.tab({ notes: ex.notes, title: 'Tablature' }, ex.fb);
      detail = '<p class="gtr-detail">' +
        ex.notes.length + ' notes · <strong>' + esc(E.RHYTHMS[ex.meta.rhythm].name.toLowerCase()) + '</strong>' +
        (S.rhythm ? '' : ' (chosen to fit the shape)') +
        ' · sounds <code>' +
        esc(ex.notes.slice(0, 8).map(function (n) { return E.midiToLabel(E.soundingMidi(n, ex.fb)); }).join(' ')) +
        (ex.notes.length > 8 ? ' …' : '') + '</code></p>';
    }

    /* Each box carries the notes it actually sounds, in this tuning.
       This exists because "changing tuning doesn't change the chord shapes"
       was reported against a build where it demonstrably did — and the panel
       gave no way to tell a correct unchanged shape from a stale one. The
       pitches settle it on sight: an A major that reads A C# E is right in
       whatever tuning produced it, and the standard-tuning shape dropped into
       DADGAD would read as something else entirely. It is also the check that
       would have caught the original DADGAD bug the moment it appeared. */
    var CHORD_IDS = ['maj', 'min', 'dom7', 'sus4'];
    var stdFb = E.makeFretboard({ tuning: 'standard', capo: data.settings.capo, handed: data.profile.handed });
    var shapeOf = function (v) {
      return v ? v.notes.map(function (n) { return n.string + 'f' + n.fret; }).join(' ') : '';
    };
    var unchanged = 0, shown = 0;
    var chords = CHORD_IDS.map(function (c) {
      var v = E.findVoicing(c, S.rootPc, fb);
      if (!v) return '';
      shown++;
      if (shapeOf(v) === shapeOf(E.findVoicing(c, S.rootPc, stdFb))) unchanged++;
      /* Low string first, the order they are heard in when rolled. */
      var pitches = v.notes.slice().sort(function (a, b) { return b.string - a.string; })
        .map(function (n) { return E.midiToName(E.soundingMidi(n, fb)); }).join(' ');
      return '<button class="gtr-chordbtn" type="button" data-chord="' + esc(c) + '">' +
             R.chordBox(v, fb) +
             '<span class="gtr-chordpitch">' + esc(pitches) + '</span>' +
             '</button>';
    }).join('');

    /* Drop D alters one string, and none of these voicings use it, so every
       shape is legitimately identical to standard. Saying so is the difference
       between a correct answer and an app that looks broken. */
    var tuningNote;
    if (fb.tuning !== 'standard' && shown && unchanged === shown) {
      tuningNote = 'Every shape here is the same as in standard tuning — these voicings do not use the ' +
                   'strings ' + E.TUNINGS[fb.tuning].name + ' changes. Try another root, or a scale below, ' +
                   'to hear what this tuning does.';
    } else if (fb.tuning !== 'standard' && unchanged) {
      tuningNote = unchanged + ' of these ' + shown + ' shapes are unchanged from standard tuning: they do ' +
                   'not use the strings ' + E.TUNINGS[fb.tuning].name + ' alters.';
    } else {
      tuningNote = 'Tap a shape to hear it. Voicings are searched for on the tuning above, not written down.';
    }

    return '<div class="container gtr-wrap">' +
      '<div class="gtr-nav">' +
        '<button class="gtr-navbtn" type="button" data-screen="lessons">Lessons</button>' +
        '<button class="gtr-navbtn is-on" type="button" data-screen="workshop">Workshop</button>' +
      '</div>' +
      '<div class="gtr-panel">' +
        '<h2 class="gtr-h">Your guitar</h2>' +
        '<div class="gtr-controls">' +
          '<label>Tuning<select id="gtrTuning">' + opts(Object.keys(E.TUNINGS).map(function (t) {
            return { v: t, t: E.TUNINGS[t].name }; }), data.settings.tuning) + '</select></label>' +
          '<label>Capo<select id="gtrCapo">' + opts([0,1,2,3,4,5,6,7,8,9].map(function (n) {
            return { v: n, t: n === 0 ? 'None' : 'Fret ' + n }; }), data.settings.capo) + '</select></label>' +
          '<label>Handedness<select id="gtrHanded">' + opts([
            { v: 'right', t: 'Right-handed' }, { v: 'left', t: 'Left-handed' }
          ], data.profile.handed) + '</select></label>' +
        '</div>' +
        '<p class="gtr-detail">' + esc(E.TUNINGS[fb.tuning].name) + ' · ' +
          esc([6,5,4,3,2,1].map(function (s) { return E.midiToName(E.openMidi(s, fb)); }).join(' ')) +
          (fb.capo ? ' · capo at fret ' + fb.capo : '') + '</p>' +
      '</div>' +

      '<div class="gtr-panel">' +
        '<h2 class="gtr-h">Chords in this tuning</h2>' +
        '<div class="gtr-chordrow">' + chords + '</div>' +
        '<p class="gtr-detail">' + esc(tuningNote) + '</p>' +
      '</div>' +

      '<div class="gtr-panel">' +
        '<h2 class="gtr-h">Scales and positions</h2>' +
        '<div class="gtr-controls">' +
          '<label>Root<select id="gtrRoot">' + opts(noteOptions(), S.rootPc) + '</select></label>' +
          '<label>Scale<select id="gtrScale">' + opts(scaleIds.map(function (s) {
            return { v: s, t: E.SCALES[s].name }; }), S.scaleId) + '</select></label>' +
          '<label>Shape<select id="gtrKind">' + opts(shapeKinds(), S.positionKind) + '</select></label>' +
          '<label>Which<select id="gtrPos">' + opts(posOptions, S.positionIndex) + '</select></label>' +
          '<label>Sequence<select id="gtrSeq">' + opts(Object.keys(E.SEQUENCES).map(function (s) {
            return { v: s, t: E.SEQUENCES[s].name }; }), S.sequence) + '</select></label>' +
          '<label>Rhythm<select id="gtrRhythm">' + opts([{ v: '', t: 'Fit the shape' }].concat(
            Object.keys(E.RHYTHMS).map(function (r) { return { v: r, t: E.RHYTHMS[r].name }; })), S.rhythm) + '</select></label>' +
        '</div>' +
        detail +
        '<div class="gtr-figures">' + figure + '</div>' +
        /* Descending belongs to the generator, not the transport, so it stays
           here rather than moving into the shared control block — a lesson's
           written-out exercise has no ascending or descending to toggle. */
        '<label class="gtr-inline gtr-standalone"><input id="gtrDesc" type="checkbox"' +
          (S.descending ? ' checked' : '') + '> Descending</label>' +
        transportHtml(null) +
      '</div>' +
    '</div>';
  }

  /* ── Events ────────────────────────────────────────────────────────────── */
  function wire(el) {
    function on(id, evt, fn) {
      var n = el.querySelector('#' + id);
      if (n) n.addEventListener(evt, fn);
    }
    function setSetting(k, v) { data.settings[k] = v; save(); rerender(); }

    on('gtrTuning', 'change', function (e) { setSetting('tuning', e.target.value); });
    on('gtrCapo',   'change', function (e) { setSetting('capo', parseInt(e.target.value, 10) || 0); });
    on('gtrHanded', 'change', function (e) { data.profile.handed = e.target.value; save(); rerender(); });

    on('gtrRoot',  'change', function (e) { S.rootPc = parseInt(e.target.value, 10) || 0; rerender(); });
    on('gtrScale', 'change', function (e) {
      S.scaleId = e.target.value;
      /* A position index valid for a seven-note scale may not exist in a
         pentatonic one, so clamp rather than render a fault. */
      var n = E.positionCount(S.scaleId, S.positionKind);
      if (n && S.positionIndex >= n) S.positionIndex = 0;
      rerender();
    });
    on('gtrKind', 'change', function (e) {
      S.positionKind = e.target.value; S.positionIndex = 0; rerender();
    });
    on('gtrPos',    'change', function (e) { S.positionIndex = parseInt(e.target.value, 10) || 0; rerender(); });
    on('gtrSeq',    'change', function (e) { S.sequence = e.target.value; rerender(); });
    on('gtrRhythm', 'change', function (e) { S.rhythm = e.target.value; rerender(); });
    on('gtrDesc',   'change', function (e) { S.descending = !!e.target.checked; rerender(); });
    on('gtrCountIn', 'change', function (e) {
      data.settings.countIn = e.target.checked ? 4 : 0;
      save();
    });
    on('gtrLoop',   'change', function (e) {
      S.loop = !!e.target.checked;
      if (transport) applyLoop();
    });

    /* One writer for the tempo, whichever control moved.
       `except` is the element the user is currently working in: writing a
       clamped value back into a number field mid-keystroke fights the typing,
       turning "1" into "30" before the "20" arrives. It is left alone until it
       commits. Note that none of this rerenders — mount() replaces the whole
       subtree, which would take the focus and the caret with it. */
    function setTempo(v, except) {
      /* A blank or unparseable field restores the live tempo rather than
         resolving to something. Without this, Number('') is 0 and clamps to
         the floor, so clearing the box to retype it drops the tempo to 30 the
         moment focus leaves. */
      if (v === '' || v === null || v === undefined || !isFinite(Number(v))) v = data.settings.tempo;
      data.settings.tempo = clampTempo(v);
      var num = el.querySelector('#gtrTempoNum');
      var rng = el.querySelector('#gtrTempo');
      if (num && num !== except) num.value = data.settings.tempo;
      if (rng && rng !== except) rng.value = data.settings.tempo;
      if (transport) transport.setTempo(data.settings.tempo);
      save();
    }

    on('gtrTempo', 'input', function (e) { S.tempoTouched = true; setTempo(e.target.value, e.target); });

    /* While typing, an out-of-range or half-finished number moves nothing:
       "4" on the way to "45" would otherwise jump the tempo to the floor and
       drag the slider with it. */
    on('gtrTempoNum', 'input', function (e) {
      var v = Number(e.target.value);
      if (e.target.value === '' || !isFinite(v)) return;
      if (v < TEMPO_MIN || v > TEMPO_MAX) return;
      setTempo(v, e.target);
    });
    /* On the way out, whatever is in the box is resolved: an empty field or an
       out-of-range one snaps back to the live tempo rather than sitting there
       disagreeing with what will play. */
    on('gtrTempoNum', 'change', function (e) { S.tempoTouched = true; setTempo(e.target.value, null); });
    on('gtrTempoNum', 'blur',   function (e) { setTempo(e.target.value, null); });
    on('gtrTempoNum', 'keydown', function (e) {
      if (e.key === 'Enter') { setTempo(e.target.value, null); e.target.blur(); }
    });

    on('gtrTempoDown', 'click', function () { S.tempoTouched = true; setTempo(data.settings.tempo - 1, null); });
    on('gtrTempoUp',   'click', function () { S.tempoTouched = true; setTempo(data.settings.tempo + 1, null); });

    Array.prototype.forEach.call(el.querySelectorAll('[data-screen]'), function (btn) {
      btn.addEventListener('click', function () {
        S.screen = btn.getAttribute('data-screen');
        rerender();
      });
    });
    Array.prototype.forEach.call(el.querySelectorAll('[data-lesson]'), function (btn) {
      btn.addEventListener('click', function () {
        S.tempoTouched = false;
        goToCard(btn.getAttribute('data-lesson'), 0);
        rerender();
      });
    });
    on('gtrBack', 'click', function () { S.screen = 'lessons'; rerender(); });
    on('gtrPrev', 'click', function () { goToCard(S.lessonId, S.cardIndex - 1); rerender(); });
    on('gtrNext', 'click', function () {
      data.stats.cards = (data.stats.cards || 0) + 1;
      goToCard(S.lessonId, S.cardIndex + 1);
      rerender();
    });
    on('gtrFinish', 'click', function () {
      if (S.lessonId) markDone(S.lessonId);
      S.screen = 'lessons';
      rerender();
    });

    on('gtrPlay', 'click', play);
    on('gtrStop', 'click', function () { if (transport) transport.stop(); stopCursor(); });

    Array.prototype.forEach.call(el.querySelectorAll('[data-chord]'), function (btn) {
      btn.addEventListener('click', function () {
        var v = E.findVoicing(btn.getAttribute('data-chord'), S.rootPc, fretboard());
        if (v && A) A.strum(v.notes, fretboard());
      });
    });

    var note = el.querySelector('#gtrAudioNote');
    if (note && A && !A.ready()) {
      note.textContent = 'This browser has no Web Audio support, so playback is unavailable. Everything else works.';
    }
  }

  /* How long the loop is depends on which screen is playing. Ticking Loop on a
     lesson card used to set the loop from the WORKSHOP's generated exercise —
     the only exercise this function knew about — so a four-bar card looped over
     whatever length the scale panel happened to be showing. Both cases now come
     from the notes actually loaded. */
  function loopBeats(notes) {
    var last = 0;
    (notes || []).forEach(function (n) {
      var end = n.beat + (n.dur || 0);
      if (end > last) last = end;
    });
    return Math.ceil(last / 4) * 4;
  }
  function applyLoop() {
    if (!transport) return;
    if (S.screen === 'lesson') {
      if (!_cardPlayable) return;
      transport.setLoop(0, S.loop || _cardPlayable.loop ? loopBeats(_cardPlayable.notes) : 0);
      return;
    }
    var ex = sortedExercise();
    if (ex.fault) return;
    if (S.loop) transport.setLoop(0, ex.meta.beats);
    else transport.setLoop(0, 0);
  }

  /* Beats of count-in, clamped to something a transport can use. Read from the
     setting rather than written at each call site, so the toggle cannot end up
     applying on one screen and not the other. */
  function countInBeats() {
    var n = Number(data.settings.countIn);
    return n > 0 ? Math.min(n, 8) : 0;
  }

  function play() {
    if (!A || !A.ready()) return;
    if (!transport) transport = A.createTransport();

    /* Which notes differs by screen — written out on a lesson card, generated
       in the workshop — and NOTHING ELSE DOES. Starting playback used to be
       written out once per branch, which is two places for the count-in, the
       loop, the cursor and the play count to drift apart: wiring the count-in
       toggle to one of them and not the other was a one-line change that no
       gate noticed. So the branch chooses the notes and then stops. */
    var notes, fb;
    if (S.screen === 'lesson') {
      if (!_cardPlayable) return;
      notes = _cardPlayable.notes;
      fb = _cardFb || fretboard();
    } else {
      var ex = sortedExercise();
      if (ex.fault) return;
      notes = ex.notes;
      fb = ex.fb;
    }

    var bpm = (S.screen === 'lesson' && _cardPlayable && _cardPlayable.demo)
      ? _cardPlayable.bpm
      : data.settings.tempo;
    transport.load(notes, fb, bpm);
    applyLoop();
    transport.onEnd = stopCursor;
    transport.play({ countInBeats: countInBeats() });
    startCursor();
    data.stats.plays++;
    save();
  }


  /* ── The playback cursor ──────────────────────────────────────────────────
     Lights the note that is sounding, in the neck diagram and the tab at once.

     Driven by requestAnimationFrame reading the transport, NOT by scheduling a
     highlight alongside each note. The audio is scheduled up to 100 ms ahead
     against the audio clock; a setTimeout painted from the same call would fire
     on the wall clock, drift away from it, and be throttled to a crawl in a
     background tab. Asking "what is sounding now" every frame cannot drift,
     because it never accumulates.

     The transport answers in its own terms — index into the array it was given
     — and this only paints. Everything about which note that is, including the
     output-latency offset, lives with the clock that knows. */
  var cursorRaf = null;
  var cursorLit = -1;
  var cursorEls = null;      // index → [elements], rebuilt on each render

  function cacheCursorEls(el) {
    cursorEls = Object.create(null);
    Array.prototype.forEach.call(el.querySelectorAll('.gtr-note[data-i]'), function (g) {
      var i = parseInt(g.getAttribute('data-i'), 10);
      if (isNaN(i)) return;
      (cursorEls[i] || (cursorEls[i] = [])).push(g);
    });
  }
  function setLit(i, on) {
    var list = cursorEls && cursorEls[i];
    if (!list) return;
    list.forEach(function (g) { g.classList[on ? 'add' : 'remove']('is-playing'); });
  }
  function paintCursor(idx) {
    if (!cursorEls) return;
    if (idx === cursorLit) return;
    setLit(cursorLit, false);
    setLit(idx, true);
    cursorLit = idx;
  }
  function stopCursor() {
    if (cursorRaf && typeof cancelAnimationFrame === 'function') cancelAnimationFrame(cursorRaf);
    cursorRaf = null;
    paintCursor(-1);
  }
  function startCursor() {
    if (typeof requestAnimationFrame !== 'function') return;   // no frames: no cursor, no error
    stopCursor();
    var tick = function () {
      if (!transport || !transport.playing) { stopCursor(); return; }
      var idx = transport.currentIndex();
      if (idx !== cursorLit) paintCursor(idx);
      cursorRaf = requestAnimationFrame(tick);
    };
    cursorRaf = requestAnimationFrame(tick);
  }

  function mount(el) {
    _host = el;
    load();
    el.innerHTML = html();
    wire(el);
    cacheCursorEls(el);
    if (A && A.ready()) A.warmUp();
  }
  /* Every control that reaches here changes the notes themselves — root, scale,
     shape, sequence, rhythm, tuning, capo, handedness. Playing on through that
     would leave the transport sounding the old exercise while the figures show
     the new one, and the cursor lighting notes at indices that no longer mean
     what they did. Tempo and loop deliberately do not rerender, so neither
     interrupts playback. */
  function rerender() {
    if (!_host) return;
    if (transport) transport.stop(true);
    stopCursor();
    mount(_host);
  }

  root.GUITAR_UI = {
    mount: mount,
    reset: function () { if (transport) transport.stop(true); stopCursor(); },
    /* The live transport, or null before the first play. Exposed so the state
       the cursor is painting from can be read independently of the DOM it
       paints into — which is how the cursor is checked: ask the transport what
       is sounding, ask the document what is lit, and require the same answer.
       Reading it through the module's own surface beats reaching into a
       closure or planting a global that only a test knows about. */
    transport: function () { return transport; }
  };
}(typeof self !== 'undefined' ? self : this));
