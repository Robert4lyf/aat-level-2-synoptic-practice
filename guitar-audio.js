/* Guitar audio — the Web Audio wiring around the engine's synthesis maths.
 *
 * Everything testable lives in guitar-engine.js: the Karplus–Strong renderer,
 * the beat/second conversions, the loop arithmetic. This file is the part that
 * cannot be tested in Node — an AudioContext, buffers, gain nodes and a
 * scheduler — and it is deliberately thin so there is little here to be wrong.
 *
 * ITS OWN CONTEXT
 *
 * Not app.js's. That one is created inside ensureAudio() only when
 * Storage.data.settings.soundOn is true for whichever subject is loaded, which
 * is a different subject's setting. Sharing it would make guitar sound depend
 * on an AAT preference.
 *
 * THE SCHEDULER
 *
 * A 25 ms tick schedules everything falling in the next 100 ms against
 * audioContext.currentTime. Notes are never fired from setTimeout: it drifts,
 * and it is throttled in a background tab. The engine owns the arithmetic
 * (transportTime, loopWrap, loopIteration); this only decides when to ask.
 *
 * Two failure modes it guards against, both recorded in the plan:
 *
 *   - A loop shorter than the lookahead window is covered more than once per
 *     tick. Events are keyed on (iteration, index) rather than beat position,
 *     because position alone cannot tell two passes apart and every note would
 *     be scheduled twice.
 *   - setInterval is throttled when the tab is hidden, starving the lookahead.
 *     On hide the transport stops rather than stalling silently mid-phrase.
 */
(function (root, factory) {
  'use strict';
  var E = (typeof module === 'object' && module.exports)
    ? require('./guitar-engine.js')
    : root.GuitarEngine;
  var api = factory(E);
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.GuitarAudio = api;
}(typeof self !== 'undefined' ? self : this, function (E) {
  'use strict';

  var LOOKAHEAD_S = 0.1;      // schedule this far ahead
  var TICK_MS = 25;           // and re-check this often
  var MIN_MIDI = 40;          // E2, the lowest note on a standard guitar
  var MAX_MIDI = 88;          // E6, four octaves up

  /* ── Voices ───────────────────────────────────────────────────────────────
     One set of buffers, shaped differently on the way out.

     A plucked scale note and a strummed chord want different envelopes. The
     scales sound right as they are: the string is struck and left to ring.
     Chords built from the same buffers came out hard — six copies of the same
     transient inside a tenth of a second reads as an attack, not a chord, and
     the brightness that gives a single line its definition just stacks up.

     Shaping this in the graph rather than rendering a second set of buffers is
     what keeps it cheap. A second timbre at this quality is ~20 MB of
     Float32Array, which is real weight on a phone for a difference a filter and
     a fade already make.

       attack    seconds to reach full level; softens the leading edge
       cutoff    lowpass corner in Hz, 0 for none; takes off the top
       highpass  highpass corner in Hz, 0 for none; takes out the bottom
       gain      trim, since a darker note reads as louder at the same level

     The pluck voice is deliberately all-zero: attack 0 and cutoff 0 take the
     same branches the old code took unconditionally, so a scale sounds exactly
     as it did before any of this. The scales were reported as fine; a 2 ms
     ramp "too small to hear" is still a change nobody asked for.

     TASTO AND PONTICELLO exist for P3, which teaches moving the contact point
     along the string. Over the soundhole the note is round and dark; up by the
     bridge it is thin and glassy. Those are the two ends and they are a filter
     apart: tasto rolls the top off, ponticello takes the bottom out rather
     than adding a top that is not in the buffer to add. A unit about hearing a
     difference has to be able to make one. */
  var VOICES = {
    pluck:      { attack: 0,     cutoff: 0,    highpass: 0,   gain: 1 },
    chord:      { attack: 0.018, cutoff: 3200, highpass: 0,   gain: 0.86 },
    tasto:      { attack: 0.012, cutoff: 1500, highpass: 0,   gain: 1.08 },
    ponticello: { attack: 0,     cutoff: 0,    highpass: 620, gain: 1.0 }
  };
  function voiceOf(name) { return VOICES[name] || VOICES.pluck; }

  /* Seconds between strings of a strum. A chord is rolled with the thumb here,
     not raked with a pick: 22 ms across six strings put the whole chord inside
     an eighth of a second, which is a strum. 45 ms was still too quick by ear,
     so 75 ms — the whole chord across about four tenths of a second, which is
     a roll you can hear the individual strings inside. Set by ear; there is no
     correct value here, only a preferred one. */
  var STRUM_SPREAD_S = 0.075;

  var ctx = null;
  var master = null;
  var buffers = Object.create(null);   // midi → AudioBuffer
  var rendering = Object.create(null); // midi → true while being built

  function context() {
    if (ctx) return ctx;
    var C = (typeof window !== 'undefined') && (window.AudioContext || window.webkitAudioContext);
    if (!C) return null;
    try { ctx = new C(); } catch (e) { return null; }
    master = ctx.createGain();
    master.gain.value = 0.9;
    master.connect(ctx.destination);
    return ctx;
  }

  /* A context created before a user gesture starts suspended. Every entry point
     resumes it, because the alternative is silence with no error. */
  function resume() {
    var c = context();
    if (c && c.state === 'suspended') { try { c.resume(); } catch (e) {} }
    return c;
  }
  function ready() { return !!context(); }

  /* ── Buffers ──────────────────────────────────────────────────────────────
     One per pitch, rendered by the engine at the context's real sample rate —
     not a fixed 44.1k, because a mismatch would detune everything by the ratio.
     Never transposed with playbackRate: that shifts the decay along with the
     pitch, so low notes would ring wrong. */
  function bufferFor(midi) {
    var c = context();
    if (!c) return null;
    midi = Math.round(midi);
    if (buffers[midi]) return buffers[midi];
    if (midi < MIN_MIDI - 12 || midi > MAX_MIDI + 12) return null;
    var data = E.renderPitch(midi, { sampleRate: c.sampleRate, seconds: 2.2 });
    if (!data) return null;
    var buf = c.createBuffer(1, data.length, c.sampleRate);
    buf.copyToChannel ? buf.copyToChannel(data, 0) : buf.getChannelData(0).set(data);
    buffers[midi] = buf;
    return buf;
  }

  /* Render the whole playable range up front, in idle slices so a slow device
     does not freeze on first open. ~49 pitches at ~2.2 s each. */
  function warmUp(onDone) {
    var c = context();
    if (!c) { if (onDone) onDone(); return; }
    var list = [];
    for (var m = MIN_MIDI; m <= MAX_MIDI; m++) if (!buffers[m]) list.push(m);
    var i = 0;
    function slice() {
      var t0 = (typeof performance !== 'undefined' ? performance.now() : Date.now());
      while (i < list.length) {
        bufferFor(list[i++]);
        var now = (typeof performance !== 'undefined' ? performance.now() : Date.now());
        if (now - t0 > 12) break;      // yield so the UI stays responsive
      }
      if (i < list.length) setTimeout(slice, 0);
      else if (onDone) onDone();
    }
    slice();
  }

  /* ── One note ─────────────────────────────────────────────────────────────
     `when` is an absolute context time. Scheduling in the past is a silent
     no-op in some browsers and an error in others, so it is clamped. */
  function playMidi(midi, when, gain, durationS, voiceName) {
    var c = resume();
    if (!c) return null;
    var buf = bufferFor(midi);
    if (!buf) return null;
    var v = voiceOf(voiceName);
    var src = c.createBufferSource();
    src.buffer = buf;
    var g = c.createGain();
    /* Held in a variable, not read back off g.gain.value: the attack ramp
       below leaves that at the ramp's starting floor, so the damping stage
       would fade out from silence and cut the note dead. */
    var level = (gain === undefined ? 0.8 : gain) * v.gain;
    var t = Math.max(when === undefined ? c.currentTime : when, c.currentTime);

    /* Filters chained in whatever order they are present, so a voice may use
       either, both or neither without a branch per combination. */
    var tail = src;
    if (v.cutoff > 0) {
      var lp = c.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.value = v.cutoff;
      lp.Q.value = 0.707;                 // Butterworth: no peak at the corner
      tail.connect(lp); tail = lp;
    }
    if (v.highpass > 0) {
      var hp = c.createBiquadFilter();
      hp.type = 'highpass';
      hp.frequency.value = v.highpass;
      hp.Q.value = 0.707;
      tail.connect(hp); tail = hp;
    }
    tail.connect(g);
    g.connect(master);

    /* Ramp in rather than starting at full level. exponentialRampToValueAtTime
       cannot depart from zero, hence the floor. */
    if (v.attack > 0 && level > 0.0001) {
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(level, t + v.attack);
    } else {
      /* level guarded as well as attack: an exponential ramp cannot reach or
         depart from zero, and a caller silencing a voice by passing gain 0
         would otherwise throw rather than go quiet. */
      g.gain.setValueAtTime(level, t);
    }
    src.start(t);

    /* A note shorter than the buffer is damped rather than cut, so it sounds
       like a hand stopping a string instead of a click. */
    if (durationS > 0 && durationS < buf.duration) {
      var end = t + durationS;
      /* Never before the attack has finished, or the two ramps fight and the
         note never reaches level. */
      var damp = Math.max(end - 0.06, t + v.attack);
      g.gain.setValueAtTime(level, damp);
      g.gain.exponentialRampToValueAtTime(0.0001, Math.max(end + 0.02, damp + 0.02));
      src.stop(Math.max(end + 0.05, damp + 0.05));
    }
    return src;
  }

  /* `bpm` is optional: with it, a note's `dur` in beats becomes a real damping
     time. Without it the string is left to ring, which is right for a strum. */
  function playNote(note, fb, when, gain, bpm, voiceName) {
    var midi = E.soundingMidi(note, fb);
    if (midi === null) return null;
    var seconds = (bpm > 0 && note.dur > 0) ? E.beatsToSeconds(note.dur, bpm) * 1.6 : undefined;
    return playMidi(midi, when, gain, seconds, voiceName);
  }

  /* Strum a chord: the same notes, spread slightly, low string first. */
  function strum(notes, fb, when, spreadS) {
    var c = resume();
    if (!c) return;
    var spread = spreadS === undefined ? STRUM_SPREAD_S : spreadS;
    var base = Math.max(when === undefined ? c.currentTime : when, c.currentTime);
    var ordered = notes.slice().sort(function (a, b) { return b.string - a.string; });
    /* Slightly lighter towards the top, the way a thumb roll actually lands:
       an even level across six strings puts the whole weight on the trebles. */
    ordered.forEach(function (n, i) {
      playNote(n, fb, base + i * spread, 0.72 - i * 0.025, 0, 'chord');
    });
  }

  /* ── Transport ────────────────────────────────────────────────────────────
     Holds the notes, the tempo map and the loop; the engine converts beats to
     times. Nothing here does its own arithmetic. */
  function createTransport() {
    var T = {
      notes: [], fb: null, segs: E.compileTempoMap([{ beat: 0, bpm: E.DEFAULT_BPM }]),
      loop: null, playing: false, t0: 0, countIn: 0, voice: '',
      timer: null, scheduled: Object.create(null), onEnd: null
    };

    /* ONE firing path, used by both branches below.
       The loop branch and the straight branch each used to spell out the
       playMidi call, and wiring the count-in toggle into one of two such
       branches was a one-line change that the whole suite passed. A note's
       level, voice and roll offset are three more things that would have to be
       remembered twice, so there is now one place to remember them. */
    function fire(n, atBeat, when) {
      var seconds = E.beatsToSeconds(n.dur || 0.5, tempoAt(atBeat)) * 1.6;
      /* delayS is SECONDS, deliberately. A rolled chord spreads by a fixed
         amount of time whatever the tempo; spreading it in beats would make
         the roll tighten as the tempo rises, which is a block chord played
         fast rather than a strum. */
      playMidi(E.soundingMidi(n, T.fb), when + (n.delayS || 0),
               0.8 * (n.level > 0 ? n.level : 1), seconds, n.voice || T.voice);
    }

    function schedule() {
      var c = context();
      if (!c || !T.playing) return;
      var horizonBeat = E.beatAtTime(c.currentTime + LOOKAHEAD_S, T.segs, T.t0);

      if (T.loop) {
        var len = E.loopLength(T.loop.start, T.loop.end);
        if (len > 0) {
          var iter = E.loopIteration(horizonBeat, T.loop.start, T.loop.end);
          /* Every pass currently in the window, not just the current one: a
             loop shorter than the lookahead spans more than one. */
          /* Clamp to 0: during a count-in the transport clock is still
             negative, so the current iteration is -1 and the whole of a pass
             that never happens would be scheduled — every note clamped to
             `now`, arriving as one chord on top of the count-in. */
          var from = Math.max(0, E.loopIteration(E.beatAtTime(c.currentTime, T.segs, T.t0), T.loop.start, T.loop.end));
          for (var k = from; k <= iter; k++) {
            for (var i = 0; i < T.notes.length; i++) {
              var n = T.notes[i];
              if (n.beat < T.loop.start || n.beat >= T.loop.end) continue;
              var abs = n.beat + k * len;
              var key = k + ':' + i;
              if (T.scheduled[key]) continue;
              var at = E.transportTime(abs, T.segs, T.t0);
              if (at > c.currentTime + LOOKAHEAD_S) continue;
              T.scheduled[key] = true;
              fire(n, n.beat, at);
            }
          }
          return;
        }
      }

      var last = 0;
      for (var j = 0; j < T.notes.length; j++) {
        var note = T.notes[j];
        if (note.beat > last) last = note.beat;
        if (note.beat > horizonBeat) continue;
        if (T.scheduled['0:' + j]) continue;
        var when = E.transportTime(note.beat, T.segs, T.t0);
        T.scheduled['0:' + j] = true;
        fire(note, note.beat, when);
      }
      /* Stop once the last note has had time to sound. */
      if (E.transportTime(last, T.segs, T.t0) + 2.0 < c.currentTime) T.stop();
    }

    function tempoAt(beat) {
      var s = T.segs[0];
      for (var i = 0; i < T.segs.length; i++) if (T.segs[i].beat <= beat) s = T.segs[i];
      return s.bpm;
    }

    T.load = function (notes, fb, bpm, voice) {
      T.notes = (notes || []).slice().sort(function (a, b) { return a.beat - b.beat; });
      T.fb = fb || E.makeFretboard();
      T.segs = E.compileTempoMap([{ beat: 0, bpm: bpm > 0 ? bpm : E.DEFAULT_BPM }]);
      /* The voice every note falls back to. A progression wants the chord
         voice for all of it; a note may still name its own. */
      T.voice = voice || '';
      return T;
    };
    T.setTempo = function (bpm) {
      /* Re-anchor so the beat we are on now keeps its position: changing tempo
         must not make the cursor jump. */
      var c = context();
      if (c && T.playing) {
        var beatNow = E.beatAtTime(c.currentTime, T.segs, T.t0);
        T.segs = E.compileTempoMap([{ beat: 0, bpm: bpm }]);
        T.t0 = c.currentTime - E.beatsToSeconds(beatNow, bpm);
      } else {
        T.segs = E.compileTempoMap([{ beat: 0, bpm: bpm }]);
      }
      return T;
    };
    T.setLoop = function (startBeat, endBeat) {
      T.loop = (endBeat > startBeat) ? { start: startBeat, end: endBeat } : null;
      return T;
    };
    T.play = function (opts) {
      var c = resume();
      if (!c) return T;
      opts = opts || {};
      T.stop(true);
      T.scheduled = Object.create(null);
      T.countIn = opts.countInBeats || 0;
      /* A count-in is negative beats, so t0 simply sits that much later. */
      T.t0 = c.currentTime + 0.06 + E.beatsToSeconds(T.countIn, tempoAt(0));
      T.playing = true;
      if (T.countIn > 0) {
        for (var b = -T.countIn; b < 0; b++) {
          playMidi(84, E.transportTime(b, T.segs, T.t0), 0.35, 0.09);
        }
      }
      schedule();
      T.timer = setInterval(schedule, TICK_MS);
      return T;
    };
    T.stop = function (quiet) {
      if (T.timer) { clearInterval(T.timer); T.timer = null; }
      T.playing = false;
      T.scheduled = Object.create(null);
      if (!quiet && T.onEnd) T.onEnd();
      return T;
    };
    /* Where the cursor should be. Reads the audio clock and converts — the
       display follows audio, never the other way round.

       Offset by the output latency, which is not a detail. currentTime is the
       scheduling clock: it marks audio entering the output pipeline, not audio
       reaching the ear. A note scheduled at X is heard at about X + latency, so
       what is being heard at this instant was scheduled a latency ago — hence
       the subtraction. On a wired desktop that is a few milliseconds and barely
       matters. Over Bluetooth it is commonly 150–200 ms, which at 120 bpm is
       most of a beat: the highlight would visibly lead the sound, and on a
       tool for playing along that is worse than no highlight at all.

       Returns negative during a count-in, which callers use to light nothing. */
    T.currentBeat = function () {
      var c = context();
      if (!c || !T.playing) return null;
      var lat = c.outputLatency;
      if (!(lat > 0)) lat = c.baseLatency;
      if (!(lat > 0)) lat = 0;
      var b = E.beatAtTime(c.currentTime - lat, T.segs, T.t0);
      /* A count-in is negative beats, and negative beats are not IN the loop —
         they are before it. Wrapping them lands them at the far end of the
         range instead: with a four-beat count-in over an eight-beat loop,
         loopWrap(-4, 0, 8) is 4, so the cursor ran the back half of the phrase
         while the clicks were still counting, then jumped to the start when the
         music began — four beats ahead of the sound, exactly.
         Wrap only once the loop has actually been entered. */
      if (b < 0) return b;
      if (T.loop) return E.loopWrap(b, T.loop.start, T.loop.end);
      return b;
    };
    /* Which note is sounding, as an index into the array passed to load().
       Kept here rather than in the UI because it is the transport that knows
       the array is sorted by beat, and the answer must not disagree with what
       was scheduled. A note stays lit until the next one starts: for a scale
       run that reads as a moving cursor, where lighting only for the note's
       written duration flickers through every rest between them. */
    T.currentIndex = function () {
      var b = T.currentBeat();
      if (b === null || b < 0) return -1;
      var idx = -1;
      for (var i = 0; i < T.notes.length; i++) {
        if (T.notes[i].beat <= b + 1e-9) idx = i; else break;
      }
      return idx;
    };
    return T;
  }

  /* A hidden tab throttles setInterval to about once a second, which starves a
     100 ms lookahead and produces a stutter or a stall. Stopping is honest;
     stalling mid-phrase looks like a bug. */
  var transports = [];
  function track(t) { transports.push(t); return t; }
  if (typeof document !== 'undefined' && document.addEventListener) {
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) transports.forEach(function (t) { if (t.playing) t.stop(); });
    });
  }

  return {
    ready: ready,
    resume: resume,
    warmUp: warmUp,
    playMidi: playMidi,
    playNote: playNote,
    strum: strum,
    createTransport: function () { return track(createTransport()); },
    context: context,
    VOICES: VOICES,
    STRUM_SPREAD_S: STRUM_SPREAD_S,
    LOOKAHEAD_S: LOOKAHEAD_S,
    TICK_MS: TICK_MS
  };
}));
