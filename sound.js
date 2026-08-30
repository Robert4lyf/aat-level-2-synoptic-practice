/* ── The sound effects, shared ─────────────────────────────────────────────────
   One engine, three voices. Level 2 (app.js), Level 1 (aat1-ui.js) and Level 3
   (aat3-ui.js) each sound like themselves, and none of them owns a copy of the
   Web Audio plumbing.

   WHY A VOICE IS DATA. The difference between the levels is which notes get
   played, for how long, on what waveform — not how an oscillator is wired to a
   gain node. Holding a voice as a list of steps means the three can be compared
   against each other by a check, which is the only way "make each level unique"
   can be a requirement rather than an intention. A second copy of the plumbing
   would also drift: the exponential ramp to 0.001 rather than to zero is there
   because a linear ramp to silence clicks audibly on the release, and that is
   exactly the sort of detail one copy learns and the other does not.

   THE PREFERENCE IS OWNED HERE, and there is one of it. Level 2 kept `soundOn`
   in its own per-subject store, which was fine while Level 2 was the only thing
   that made a noise; with three levels it would have meant three toggles that
   each silenced a third of the app. Migrated once from the old location, so a
   reader who turned sound off stays silent. */
(function (root) {
  'use strict';

  var KEY = 'aat_sound_on';
  /* Level 2's old home for the flag. Read once, if this module has never
     written its own — otherwise anyone who had turned sound off would find it
     back on the first time they opened the app after this shipped. */
  var LEGACY_STORE = 'aatPrep_v2';

  function ls() {
    try { return root.localStorage || (typeof localStorage !== 'undefined' ? localStorage : null); }
    catch (e) { return null; }
  }

  var _on = null;
  function isEnabled() {
    if (_on !== null) return _on;
    var s = ls();
    if (!s) { _on = true; return _on; }
    try {
      var v = s.getItem(KEY);
      if (v !== null) { _on = v === '1'; return _on; }
      var raw = s.getItem(LEGACY_STORE);
      if (raw) {
        var p = JSON.parse(raw);
        if (p && p.settings && p.settings.soundOn === false) { _on = false; return _on; }
      }
    } catch (e) { /* unreadable storage: sound on, which is the shipped default */ }
    _on = true;
    return _on;
  }
  function setEnabled(v) {
    _on = !!v;
    var s = ls();
    if (s) { try { s.setItem(KEY, _on ? '1' : '0'); } catch (e) {} }
  }

  var ctx = null;
  function audio() {
    if (!isEnabled()) return null;
    if (typeof root.AudioContext !== 'function' && typeof root.webkitAudioContext !== 'function') return null;
    if (!ctx) {
      try { ctx = new (root.AudioContext || root.webkitAudioContext)(); } catch (e) { ctx = null; }
    }
    /* A context created before the first tap starts suspended, and every browser
       requires a gesture to resume it. Every sound here is fired from a click,
       so resuming on the way past is enough and costs nothing when it is
       already running. */
    if (ctx && ctx.state === 'suspended') { try { ctx.resume(); } catch (e) {} }
    return ctx;
  }

  /* One note. `f` hertz, `t` waveform, `d` seconds, `v` peak gain. */
  function tone(f, t, d, v) {
    var c = audio();
    if (!c) return;
    try {
      var o = c.createOscillator(), g = c.createGain();
      o.connect(g); g.connect(c.destination);
      o.type = t; o.frequency.value = f;
      g.gain.setValueAtTime(v, c.currentTime);
      /* To 0.001 rather than to 0: exponentialRampToValueAtTime cannot reach
         zero, and a linear ramp to silence puts an audible click on the release
         of every note. */
      g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + d);
      o.start(); o.stop(c.currentTime + d);
    } catch (e) {}
  }

  /* ── The three voices ───────────────────────────────────────────────────────
     Each differs from the other two in root pitch, in the shape of the interval
     it climbs, in waveform and in how quickly it is over. Any one of those
     alone would be a recolour; together they are three instruments.

     LEVEL 1 — warm and unhurried. Triangle throughout, which is the mellowest
     waveform available without filtering, and the widest intervals of the
     three: root, fifth, octave, spread over a third of a second. Its wrong
     answer is a low triangle rather than a square, because this is the entry
     level and a buzzer is a poor thing to meet on your first day.

     LEVEL 2 — unchanged, note for note. A rising C major triad on sine waves.
     Whatever else moves, the level people have already been using keeps the
     sound they know.

     LEVEL 3 — crisp and brief. A fourth then a fifth, landing an octave above
     where it started, over half the span Level 1 takes. Its click is the
     shortest and highest of the three: a tick rather than a note. */
  var VOICES = {
    aat1: {
      name: 'Level 1',
      click:   [{ f: 622, t: 'triangle', d: 0.05, v: 0.10, at: 0 }],
      correct: [{ f: 587, t: 'triangle', d: 0.16, v: 0.16, at: 0 },
                { f: 880, t: 'triangle', d: 0.18, v: 0.15, at: 110 },
                { f: 1175, t: 'triangle', d: 0.26, v: 0.13, at: 230 }],
      wrong:   [{ f: 165, t: 'triangle', d: 0.26, v: 0.16, at: 0 }],
    },
    aat: {
      name: 'Level 2',
      click:   [{ f: 440, t: 'sine', d: 0.07, v: 0.15, at: 0 }],
      correct: [{ f: 523, t: 'sine', d: 0.12, v: 0.30, at: 0 },
                { f: 659, t: 'sine', d: 0.15, v: 0.30, at: 100 },
                { f: 784, t: 'sine', d: 0.20, v: 0.30, at: 200 }],
      wrong:   [{ f: 220, t: 'square', d: 0.30, v: 0.20, at: 0 }],
    },
    aat3: {
      name: 'Level 3',
      click:   [{ f: 880, t: 'sine', d: 0.03, v: 0.08, at: 0 }],
      correct: [{ f: 392, t: 'sine', d: 0.09, v: 0.20, at: 0 },
                { f: 523, t: 'sine', d: 0.10, v: 0.19, at: 70 },
                { f: 784, t: 'sine', d: 0.16, v: 0.17, at: 140 }],
      wrong:   [{ f: 147, t: 'sine', d: 0.22, v: 0.18, at: 0 }],
    },
  };

  function play(steps) {
    if (!steps || !isEnabled()) return;
    steps.forEach(function (s) {
      if (!s.at) { tone(s.f, s.t, s.d, s.v); return; }
      setTimeout(function () { tone(s.f, s.t, s.d, s.v); }, s.at);
    });
  }

  /* A player for one level. Named rather than passed a voice object, so a
     caller cannot invent a fourth voice that no check compares. */
  function create(voiceId) {
    var v = VOICES[voiceId];
    if (!v) throw new Error('AATSound: no voice named ' + voiceId);
    return {
      voice: voiceId,
      correct: function () { play(v.correct); },
      wrong:   function () { play(v.wrong); },
      click:   function () { play(v.click); },
    };
  }

  root.AATSound = {
    create: create,
    VOICES: VOICES,
    isEnabled: isEnabled,
    setEnabled: setEnabled,
    /* Exposed for the checks, which need to count what would have been played
       without a browser to play it in. */
    _tone: tone,
  };
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
