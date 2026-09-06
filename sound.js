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
  function ctxOf() {
    if (!isEnabled()) return null;
    if (typeof root.AudioContext !== 'function' && typeof root.webkitAudioContext !== 'function') return null;
    /* A context Android has torn down never resumes: resume() on a closed
       context rejects for the life of the page, so the app goes permanently
       silent until a reload. Rebuild instead. */
    if (ctx && ctx.state === 'closed') ctx = null;
    if (!ctx) {
      try { ctx = new (root.AudioContext || root.webkitAudioContext)(); } catch (e) { ctx = null; }
    }
    return ctx;
  }

  /* One note. `f` hertz, `t` waveform, `d` seconds, `v` peak gain, `at` seconds
     from now ON THE AUDIO CLOCK — not on a timer. See play(). */
  function tone(f, t, d, v, at, c) {
    c = c || ctxOf();
    if (!c) return;
    try {
      var o = c.createOscillator(), g = c.createGain();
      o.connect(g); g.connect(c.destination);
      o.type = t; o.frequency.value = f;
      var start = c.currentTime + (at || 0);
      g.gain.setValueAtTime(v, start);
      /* To 0.001 rather than to 0: exponentialRampToValueAtTime cannot reach
         zero, and a linear ramp to silence puts an audible click on the release
         of every note. */
      g.gain.exponentialRampToValueAtTime(0.001, start + d);
      o.start(start); o.stop(start + d);
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

  function schedule(c, steps) {
    steps.forEach(function (s) { tone(s.f, s.t, s.d, s.v, (s.at || 0) / 1000, c); });
  }

  /* WHY THIS WAITS, AND WHY THE MELODY IS ON THE AUDIO CLOCK.
     resume() returns a PROMISE. The old code called it and carried straight on
     to schedule notes against ctx.currentTime — which does not advance while a
     context is suspended, so every note in the melody was written at the same
     frozen instant and the ramps piled up on each other. On a fast phone the
     resume completed inside the same task and nothing was heard to be wrong; on
     slower hardware it did not. That is the shape of the bug: not silence every
     time, silence SOMETIMES, and more often on a slower tablet.

     The staggered notes went through setTimeout, which made it worse twice
     over. Wall-clock timers are throttled hard on Android, so the tune arrived
     ragged under load; and a note fired from a timer is no longer inside the
     tap that resumed the context, which is the gesture the autoplay policy
     wants to see. Scheduling the whole melody on the audio clock instead puts
     it down in one go, inside the gesture, on a clock nothing throttles. */
  function withContext(fn) {
    if (!isEnabled()) return;
    var c = ctxOf();
    if (!c) return;
    if (c.state === 'running') { try { fn(c); } catch (e) {} return; }
    var p;
    try { p = c.resume(); } catch (e) { return; }
    if (p && typeof p.then === 'function') { p.then(function () { try { fn(c); } catch (e) {} }, function () {}); }
    else { try { fn(c); } catch (e) {} }
  }

  function play(steps) {
    if (!steps || !isEnabled()) return;
    withContext(function (c) { schedule(c, steps); });
  }

  /* Level 2 hands the page's audio back when the reader leaves. It is the app
     that suspends here, so it is the app that must resume — which is what
     withContext does on the next sound, and what the old code only pretended
     to do. */
  function suspend() {
    if (ctx && ctx.state === 'running') { try { ctx.suspend(); } catch (e) {} }
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
    /* Story mode in Level 2 builds node graphs that are not notes — a noise
       buffer through a biquad — so it needs the context itself. It must not
       build a SECOND one: two contexts on a page compete for Android's audio
       focus, and only one of them was ever being resumed on the way back from a
       lock screen. One context, one resume path, one place that waits. */
    withContext: withContext,
    suspend: suspend,
    /* Exposed for the checks, which need to count what would have been played
       without a browser to play it in. */
    _tone: tone,
  };
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
