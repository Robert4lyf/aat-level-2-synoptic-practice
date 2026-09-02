/**
 * One spaced-repetition schedule, shared by every level.
 *
 * WHAT IT IS. An SM-2-lite scheduler. Each question carries its own `ease`
 * (how easily it is recalled) and `interval` (days until it is asked again),
 * so an item a reader finds easy spaces out quickly while a stubborn one stays
 * frequent. Grading is binary — recalled or not — because that is all a marked
 * question can tell us.
 *
 * WHY IT IS SHARED. Level 2 has had this since it was written. Levels 1 and 3
 * had something narrower: a question got wrong and later fixed came back after
 * a fixed seven days, and a question answered right the first time was never
 * scheduled at all. That meant the review pool held only a reader's past
 * mistakes, when the material most likely to slip is everything they got right
 * once and have not seen since.
 *
 * Rather than copy the algorithm into two more files — where three copies drift
 * the first time an interval is tuned — it moves here and all three levels call
 * it. The constants are Level 2's unchanged, so a reader moving between levels
 * meets one schedule rather than three.
 *
 * WHAT THIS MODULE DOES NOT DO. It does not decide what "due" is worth showing,
 * how many to serve, or where the record is kept. Each level stores its own
 * progress in its own shape and merges it its own way; this only computes the
 * next interval from the last one.
 *
 * A NOTE ON MERGING, because it has bitten this codebase before. A schedule is
 * a RECORD, not a set of independent numbers. Merging two devices field by
 * field — the larger `reps` from one, the later `dueAt` from the other —
 * invents a schedule neither device ever computed. Whoever stores these must
 * take the whole record from whichever side graded it last;
 * progress-backup.js does exactly that for all three levels.
 */
(function (root) {
  'use strict';

  var DAY_MS = 24 * 60 * 60 * 1000;
  var EASE_DEFAULT = 2.5, EASE_MIN = 1.3, EASE_MAX = 2.7;
  var INTERVAL_MAX = 365;

  function num(v, dflt) { return typeof v === 'number' && isFinite(v) ? v : dflt; }

  /* The next schedule for an item, from its last one and how it just went.

     FIRST TWO INTERVALS ARE FIXED at one day and three. An item recalled once
     is not known; giving it its ease straight away would space a lucky guess
     out to a week. From the third success the ease takes over and the gaps
     widen as fast as the reader earns.

     A MISS RESETS THE COUNT, not the ease. Coming back tomorrow is the point;
     dropping the ease by more than the successes raise it is what makes a
     repeatedly missed item stay frequent for longer than one round. */
  function schedule(rec, correct, now) {
    var t = num(now, Date.now());
    var ease = num(rec && rec.ease, EASE_DEFAULT);
    var reps = num(rec && rec.reps, 0);
    var interval = num(rec && rec.interval, 0);

    if (correct) {
      reps += 1;
      if (reps === 1) interval = 1;
      else if (reps === 2) interval = 3;
      else interval = Math.max(1, Math.round(interval * ease));
      ease = Math.min(EASE_MAX, ease + 0.08);
    } else {
      reps = 0;
      interval = 1;
      ease = Math.max(EASE_MIN, ease - 0.2);
    }
    interval = Math.min(interval, INTERVAL_MAX);
    return {
      ease: Math.round(ease * 100) / 100,
      reps: reps,
      interval: interval,
      dueAt: t + interval * DAY_MS,
      lastResult: !!correct,
    };
  }

  function isDue(rec, now) {
    if (!rec || typeof rec.dueAt !== 'number') return false;
    return rec.dueAt <= num(now, Date.now());
  }

  /* When the record was last graded. What a merge sorts on, and the only field
     that says which of two copies is the newer. */
  function touchedAt(rec) {
    if (!rec || typeof rec.dueAt !== 'number') return 0;
    return rec.dueAt - num(rec.interval, 0) * DAY_MS;
  }

  /* A legacy Leitner box {box, dueAt} in the adaptive model's terms. Level 2
     shipped boxes before it shipped this, and a reader's ladder position is
     worth carrying rather than restarting. */
  function fromBox(r) {
    var box = Math.max(1, Math.min(5, num(r && r.box, 1)));
    var days = [1, 3, 7, 14, 30][box - 1] || 1;
    return {
      ease: EASE_DEFAULT, reps: box, interval: days,
      dueAt: num(r && r.dueAt, Date.now() + days * DAY_MS),
      lastResult: !!(r && r.lastResult),
    };
  }

  var API = {
    schedule: schedule,
    isDue: isDue,
    touchedAt: touchedAt,
    fromBox: fromBox,
    DAY_MS: DAY_MS,
    EASE_DEFAULT: EASE_DEFAULT, EASE_MIN: EASE_MIN, EASE_MAX: EASE_MAX,
    INTERVAL_MAX: INTERVAL_MAX,
  };

  root.AATSpaced = API;
  if (typeof module === 'object' && module.exports) module.exports = API;
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
