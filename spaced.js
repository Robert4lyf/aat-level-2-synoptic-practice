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

  /* THE FIRST TWO INTERVALS, and why they are no longer one day and three.

     An item enters this schedule having ALREADY been answered correctly in
     practice. It is not a cold flashcard being learned from nothing, which is
     what SM-2's one-day first step is designed for, and a reader who has just
     worked through a topic does not need it back tomorrow. */
  var FIRST_INTERVAL = 3, SECOND_INTERVAL = 7;

  /* THE SPREAD, which is the actual fix for the complaint that started this.

     Identical inputs gave identical intervals, so every question graded in one
     sitting fell due on the same day — and then on the same day again, and
     again. A cohort of 81 stayed a cohort of 81 forever:

         current constants, 81 answered right in one session
         day  1: 81      day  4: 81      day 12: 81

     Nothing in the algorithm could ever break that up, because nothing in it
     distinguished one question from another. So each question now takes its
     own place in a window that opens at its nominal interval:

         delay = interval + seed × max(SPREAD_MIN_DAYS, interval × SPREAD_FRACTION)

     with `seed` in [0,1) hashed from the question's OWN id, so it is stable
     across devices and reloads rather than jittering on every recompute.

     THE WINDOW ONLY EVER OPENS LATER. A two-sided spread would pull some
     questions in sooner than the interval they earned, which is the opposite
     of what was asked for. The same 81 questions, spread:

         day 4: 10   day 5: 10   day 6: 15   day 7: 17   day 8: 14   day 9: 15

     A miss takes NO spread. Coming back promptly is the whole point of a miss,
     and there is no cohort to break up — a reader misses a few, not eighty. */
  var SPREAD_MIN_DAYS = 6, SPREAD_FRACTION = 0.5;

  /* How much of an existing backlog stays due today when it is fanned out.
     A practice run serves ten, so a day's worth is one sitting. */
  var BACKLOG_PER_DAY = 10;

  function num(v, dflt) { return typeof v === 'number' && isFinite(v) ? v : dflt; }

  /* FNV-1a over the key, to [0, 1). Any stable hash would do; this one is
     three lines and needs no dependency. */
  function seedFrom(key) {
    var h = 2166136261, str = String(key == null ? '' : key), i;
    for (i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return ((h >>> 0) % 10000) / 10000;
  }

  /* How many days past `interval` this particular question waits. Zero without
     a key, so a caller that does not supply one keeps the old exact behaviour
     rather than silently getting an unseeded spread. */
  function spreadDays(interval, key, reps) {
    if (key == null || key === '') return 0;
    var width = Math.max(SPREAD_MIN_DAYS, Math.round(interval * SPREAD_FRACTION));
    return seedFrom(String(key) + ':' + reps) * width;
  }

  /* The next schedule for an item, from its last one and how it just went.

     `key` identifies the question — its id — and is what gives this one its own
     place in the spread window. It is optional: without it the item falls due
     exactly on its interval, as before.

     FIRST TWO INTERVALS ARE FIXED. An item recalled once is not known; giving
     it its ease straight away would space a lucky guess out to a month. From
     the third success the ease takes over and the gaps widen as fast as the
     reader earns.

     A MISS RESETS THE COUNT, not the ease. Coming back tomorrow is the point;
     dropping the ease by more than the successes raise it is what makes a
     repeatedly missed item stay frequent for longer than one round. */
  function schedule(rec, correct, now, key) {
    var t = num(now, Date.now());
    var ease = num(rec && rec.ease, EASE_DEFAULT);
    var reps = num(rec && rec.reps, 0);
    var interval = num(rec && rec.interval, 0);

    if (correct) {
      reps += 1;
      if (reps === 1) interval = FIRST_INTERVAL;
      else if (reps === 2) interval = SECOND_INTERVAL;
      else interval = Math.max(1, Math.round(interval * ease));
      ease = Math.min(EASE_MAX, ease + 0.08);
    } else {
      reps = 0;
      interval = 1;
      ease = Math.max(EASE_MIN, ease - 0.2);
    }
    interval = Math.min(interval, INTERVAL_MAX);
    /* `interval` stays the nominal ladder position — the spread moves the DUE
       DATE only. Storing the spread in the interval would compound it at the
       next multiplication and walk the ladder away from its constants. */
    var delay = interval + (correct ? spreadDays(interval, key, reps) : 0);
    return {
      ease: Math.round(ease * 100) / 100,
      reps: reps,
      interval: interval,
      dueAt: t + delay * DAY_MS,
      lastResult: !!correct,
    };
  }

  function isDue(rec, now) {
    if (!rec || typeof rec.dueAt !== 'number') return false;
    return rec.dueAt <= num(now, Date.now());
  }

  /* When the record was last graded. What a merge sorts on, and the only field
     that says which of two copies is the newer.

     THE SPREAD SHIFTS THIS FORWARD, by up to the spread width, and that is
     deliberately not corrected for. Two copies of the SAME question at the same
     reps take the same spread — it is hashed from the id — so the shift cancels
     and the later grading still sorts later. At different reps the later
     grading is also the higher reps, and the interval difference dwarfs the
     spread. The ordering this is used for therefore holds; what it no longer
     returns is an exact wall-clock grading time, which nothing reads it for. */
  function touchedAt(rec) {
    if (!rec || typeof rec.dueAt !== 'number') return 0;
    return rec.dueAt - num(rec.interval, 0) * DAY_MS;
  }

  /* ── The backlog that already exists ──────────────────────────────────────
     New constants only shape questions graded from now on. A reader who has
     been using the app already has a cohort banked under the old ones, all
     falling due together, and nothing above reaches it — they would simply
     meet 81 again tomorrow.

     So this fans an existing backlog out ONCE: `perDay` stay due now, the rest
     move to tomorrow, the day after, and so on, MOST OVERDUE FIRST so nothing
     jumps the queue. It defers; it never drops, never brings anything forward,
     and never touches a record that is not already due.

     `entries` is [{ key, rec }] — each level maps its own store into this shape
     because each stores schedules at its own nesting depth. Returns a plain
     map of key → new dueAt for the records that moved, so a caller can write
     back exactly those and leave the rest alone. */
  function deferBacklog(entries, now, perDay) {
    var t = num(now, Date.now());
    var each = Math.max(1, num(perDay, 10));
    var due = (entries || []).filter(function (e) {
      return e && e.rec && isDue(e.rec, t);
    });
    /* Most overdue first, so the oldest material is the part left due today. */
    due.sort(function (a, b) { return num(a.rec.dueAt, 0) - num(b.rec.dueAt, 0); });
    var moved = {};
    due.forEach(function (e, i) {
      var day = Math.floor(i / each);
      if (day === 0) return;                 /* the first day's worth stays put */
      moved[e.key] = t + day * DAY_MS;
    });
    return moved;
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
    deferBacklog: deferBacklog,
    /* Exported so check-spaced.js can work out what a given question's due date
       OUGHT to be and catch a player that grades without passing the id. */
    spreadDays: spreadDays,
    DAY_MS: DAY_MS,
    EASE_DEFAULT: EASE_DEFAULT, EASE_MIN: EASE_MIN, EASE_MAX: EASE_MAX,
    INTERVAL_MAX: INTERVAL_MAX,
    FIRST_INTERVAL: FIRST_INTERVAL, SECOND_INTERVAL: SECOND_INTERVAL,
    SPREAD_MIN_DAYS: SPREAD_MIN_DAYS, SPREAD_FRACTION: SPREAD_FRACTION,
    BACKLOG_PER_DAY: BACKLOG_PER_DAY,
  };

  root.AATSpaced = API;
  if (typeof module === 'object' && module.exports) module.exports = API;
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
