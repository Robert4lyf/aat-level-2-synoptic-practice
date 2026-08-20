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

  var STORE_KEY = 'prep_v2_guitar';
  var E = root.GuitarEngine, R = root.GuitarRender, A = root.GuitarAudio;

  var data = {
    profile:  { handed: 'right', touch: 'flesh' },
    settings: { tuning: 'standard', capo: 0, tempo: 90 },
    stats:    { plays: 0 }
  };

  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        var p = JSON.parse(raw) || {};
        if (p.profile)  { data.profile  = Object.assign(data.profile, p.profile); }
        if (p.settings) { data.settings = Object.assign(data.settings, p.settings); }
        if (p.stats)    { data.stats    = Object.assign(data.stats, p.stats); }
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

  function html() {
    var fb = fretboard();
    var ex = exercise();
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

    var chords = ['maj', 'min', 'dom7', 'sus4'].map(function (c) {
      var v = E.findVoicing(c, S.rootPc, fb);
      return v ? '<button class="gtr-chordbtn" type="button" data-chord="' + esc(c) + '">' +
                 R.chordBox(v, fb) + '</button>' : '';
    }).join('');

    return '<div class="container gtr-wrap">' +
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
        '<p class="gtr-detail">Tap a shape to hear it. Voicings are searched for on the tuning above, not written down.</p>' +
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
        '<div class="gtr-transport">' +
          '<button class="gtr-play" id="gtrPlay" type="button">▶ Play</button>' +
          '<button class="gtr-btn" id="gtrStop" type="button">■ Stop</button>' +
          '<label class="gtr-inline"><input id="gtrLoop" type="checkbox"' + (S.loop ? ' checked' : '') + '> Loop</label>' +
          '<label class="gtr-inline"><input id="gtrDesc" type="checkbox"' + (S.descending ? ' checked' : '') + '> Descending</label>' +
        '</div>' +
        /* Tempo gets its own row rather than a slot in the transport line.
           Squeezed in beside the buttons it was 120 px wide across 160 bpm —
           a bpm and a third per pixel, so landing on a chosen tempo was luck.
           Three ways in now, all writing the same value: type it, step it by
           one, or drag a slider with a whole row to travel. */
        '<div class="gtr-tempo">' +
          '<span class="gtr-tempo-label" id="gtrTempoLabel">Tempo</span>' +
          '<button class="gtr-step" id="gtrTempoDown" type="button" ' +
            'aria-label="Slower by one bpm">−</button>' +
          '<input id="gtrTempoNum" class="gtr-tempo-num" type="number" inputmode="numeric" ' +
            'min="' + TEMPO_MIN + '" max="' + TEMPO_MAX + '" step="1" ' +
            'aria-labelledby="gtrTempoLabel" value="' + data.settings.tempo + '">' +
          '<button class="gtr-step" id="gtrTempoUp" type="button" ' +
            'aria-label="Faster by one bpm">+</button>' +
          '<span class="gtr-tempo-unit">bpm</span>' +
          '<input id="gtrTempo" class="gtr-tempo-range" type="range" ' +
            'min="' + TEMPO_MIN + '" max="' + TEMPO_MAX + '" step="1" ' +
            'aria-labelledby="gtrTempoLabel" value="' + data.settings.tempo + '">' +
        '</div>' +
        '<p class="gtr-detail" id="gtrAudioNote"></p>' +
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

    on('gtrTempo', 'input', function (e) { setTempo(e.target.value, e.target); });

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
    on('gtrTempoNum', 'change', function (e) { setTempo(e.target.value, null); });
    on('gtrTempoNum', 'blur',   function (e) { setTempo(e.target.value, null); });
    on('gtrTempoNum', 'keydown', function (e) {
      if (e.key === 'Enter') { setTempo(e.target.value, null); e.target.blur(); }
    });

    on('gtrTempoDown', 'click', function () { setTempo(data.settings.tempo - 1, null); });
    on('gtrTempoUp',   'click', function () { setTempo(data.settings.tempo + 1, null); });

    on('gtrPlay', 'click', play);
    on('gtrStop', 'click', function () { if (transport) transport.stop(); });

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

  function applyLoop() {
    var ex = exercise();
    if (ex.fault || !transport) return;
    if (S.loop) transport.setLoop(0, ex.meta.beats);
    else transport.setLoop(0, 0);
  }

  function play() {
    if (!A || !A.ready()) return;
    var ex = exercise();
    if (ex.fault) return;
    if (!transport) transport = A.createTransport();
    transport.load(ex.notes, ex.fb, data.settings.tempo);
    applyLoop();
    transport.play({ countInBeats: 4 });
    data.stats.plays++;
    save();
  }

  /* No playback cursor yet. An earlier draft ran a requestAnimationFrame loop
     writing a data-beat attribute that nothing read — motion with no drawing
     behind it. The transport already exposes currentBeat(), which is the hard
     half; the cursor lands with the lesson player, where there is a tab strip
     that owns a marker to move. */

  function mount(el) {
    _host = el;
    load();
    el.innerHTML = html();
    wire(el);
    if (A && A.ready()) A.warmUp();
  }
  function rerender() { if (_host) mount(_host); }

  root.GUITAR_UI = {
    mount: mount,
    reset: function () { if (transport) transport.stop(true); }
  };
}(typeof self !== 'undefined' ? self : this));
