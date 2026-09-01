/* Progress backup — export every subject's progress to one file, and merge it
 * back in on another device.
 *
 * WHY MERGE RATHER THAN REPLACE
 *
 * The point of this is carrying progress between a phone and a desktop, and
 * both of them have progress. A restore that overwrites would mean whichever
 * device you imported into silently lost whatever you had done on it — and you
 * would not find out until a lesson you know you finished showed as unstarted.
 * So merging is the default and replacing is the opt-in.
 *
 * Almost all of this data only ever moves one way: attempts and XP rise,
 * lessons get completed, a best score is a high-water mark. That makes the
 * merge simple and, more importantly, ORDER-INDEPENDENT and IDEMPOTENT —
 * importing the same file twice, or importing A into B and then B into A,
 * lands on the same result. Every rule below is chosen to keep that property.
 *
 * The honest cost: counters take the maximum of the two sides rather than the
 * sum. If you answered a question three times on the phone and twice on the
 * desktop, the merged record says three, not five. Summing would be exact once
 * and wrong every time after, because re-importing the same file would double
 * everything. A slightly conservative attempt count is a much better failure
 * than a progress log that inflates every time it is restored.
 *
 * What does NOT travel: device settings (dark mode, which subject is open, an
 * in-progress quiz). Those are properties of the device you are sitting at, not
 * of your progress, and copying them across is a nuisance rather than a feature.
 */
(function (root) {
  'use strict';

  var FORMAT = 'aat-study-progress';
  var VERSION = 1;
  var DAY_MS = 24 * 60 * 60 * 1000;

  /* Caps mirrored from app.js. If either changes there, change it here — a
     merge that produced a longer array than the app trims to would simply be
     truncated on the next save, which is harmless but confusing to debug. */
  var HISTORY_LIMIT = 20;
  var DAILY_LIMIT = 60;

  /* Keys holding progress. Matching by prefix rather than listing the subjects
     means a subject added later is included without anyone remembering to. */
  function isProgressKey(k) {
    return k === 'aatPrep_v2' || k === 'multisubject_active' || k.indexOf('prep_v2_') === 0;
  }

  /* Device-local, deliberately not carried across devices.

     `prep_v2_sync` holds the sync key and matters most of the three: it is a
     credential. Were it treated as progress it would be written into every
     exported file, so sharing a backup would hand over the ability to read and
     overwrite the sync document. It must never leave this device by either
     route, which is why it is filtered on export as well as on import. */
  function isDeviceKey(k) {
    /* `*_pos` is a reading position — which page of which lesson this DEVICE
       is on. Two devices legitimately sit on different pages, and the generic
       MAX-merge would splice one device's lesson with the other's page index.
       It must neither be exported nor imported. */
    return k === 'multisubject_active' || k === 'prep_v2_settings' || k === 'prep_v2_sync' ||
           /_pos$/.test(k);
  }

  function isObj(v) { return v !== null && typeof v === 'object' && !Array.isArray(v); }

  /* localStorage values are strings. Most are JSON; `multisubject_active` is a
     bare subject id that is not valid JSON. Keep whatever it is and put back
     the same shape on write, so a round trip is byte-identical. */
  function decode(raw) {
    if (raw == null) return null;
    try { return JSON.parse(raw); } catch (e) { return raw; }
  }
  function encode(val) {
    return typeof val === 'string' ? val : JSON.stringify(val);
  }

  /* ── Reading and writing the store ──────────────────────────────────────── */

  function readAll(store) {
    var s = store || root.localStorage, out = {};
    for (var i = 0; i < s.length; i++) {
      var k = s.key(i);
      if (k && isProgressKey(k)) out[k] = decode(s.getItem(k));
    }
    return out;
  }

  function writeAll(keys, store) {
    var s = store || root.localStorage;
    /* Serialise everything BEFORE writing anything: encode() is the step on
       our side that can throw, and an exception midway through a write loop
       would leave the store half old and half new, with the in-memory
       modules agreeing with neither. */
    var pending = [];
    for (var k in keys) {
      if (!Object.prototype.hasOwnProperty.call(keys, k)) continue;
      if (!isProgressKey(k)) continue;           // never write a key we do not own
      if (keys[k] == null) continue;
      pending.push([k, encode(keys[k])]);
    }
    for (var i = 0; i < pending.length; i++) s.setItem(pending[i][0], pending[i][1]);
  }

  /* ── Export ─────────────────────────────────────────────────────────────── */

  /* Device keys are stripped on the way OUT as well as on the way in, so a
     file never carries someone's dark-mode preference between machines even if
     an older or hand-edited importer stopped filtering. */
  function forExport(all) {
    var out = {};
    for (var k in all) {
      if (!Object.prototype.hasOwnProperty.call(all, k)) continue;
      if (isDeviceKey(k)) continue;
      var v = all[k];
      /* The subject blob itself carries device-local state: settings, an
         in-progress session, the planner. mergeSubject discards them on the
         way in, but Replace mode copies the blob wholesale — so they are
         stripped on the way OUT too, which also keeps a stale quiz and
         someone's dark-mode out of the file and the sync payload. */
      if (isObj(v) && (v.settings !== undefined || v.session !== undefined || v.planner !== undefined)) {
        var c = {};
        for (var f in v) {
          if (!Object.prototype.hasOwnProperty.call(v, f)) continue;
          if (f === 'settings' || f === 'session' || f === 'planner') continue;
          c[f] = v[f];
        }
        v = c;
      }
      out[k] = v;
    }
    return out;
  }

  function buildExport(opts) {
    var o = opts || {};
    return {
      format: FORMAT,
      version: VERSION,
      exportedAt: new Date(o.now || Date.now()).toISOString(),
      app: o.appVersion || '',
      keys: forExport(readAll(o.store)),
    };
  }

  function filename(now) {
    var d = new Date(now || Date.now());
    var p = function (n) { return (n < 10 ? '0' : '') + n; };
    return 'study-progress-' + d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()) + '.json';
  }

  /* ── Parsing an imported file ───────────────────────────────────────────── */

  function parse(text) {
    var doc;
    try { doc = JSON.parse(text); }
    catch (e) { throw new Error('That file is not valid JSON, so it is not a progress backup.'); }
    if (!isObj(doc) || doc.format !== FORMAT) {
      throw new Error('That file is not a progress backup from this app.');
    }
    if (typeof doc.version !== 'number' || doc.version > VERSION) {
      throw new Error('That backup was written by a newer version of the app than this one.');
    }
    if (!isObj(doc.keys)) throw new Error('That backup contains no progress.');
    return doc;
  }

  /* A short human-readable account of what a file holds, shown before anything
     is written. A restore that reports nothing is a restore you cannot check. */
  function summarize(doc) {
    var out = [];
    var keys = doc.keys || {};
    for (var k in keys) {
      if (!Object.prototype.hasOwnProperty.call(keys, k)) continue;
      if (isDeviceKey(k)) continue;
      var v = keys[k], parts = [];
      if (!isObj(v)) continue;
      if (isObj(v.stats) && isObj(v.stats.questions)) {
        var n = Object.keys(v.stats.questions).length;
        if (n) parts.push(n + ' question' + (n === 1 ? '' : 's') + ' attempted');
      }
      var lessons = (isObj(v.learn) && isObj(v.learn.lessons)) ? v.learn.lessons : (isObj(v.lessons) ? v.lessons : null);
      if (lessons) {
        var ln = Object.keys(lessons).length;
        if (ln) parts.push(ln + ' lesson' + (ln === 1 ? '' : 's'));
      }
      var xp = (isObj(v.learn) && typeof v.learn.xp === 'number') ? v.learn.xp
             : (typeof v.xp === 'number' ? v.xp : 0);
      if (xp) parts.push(xp + ' XP');
      if (parts.length) out.push({ key: k, detail: parts.join(' · ') });
    }
    return out;
  }

  /* ── Merge ──────────────────────────────────────────────────────────────── */

  /* Keys whose value is an "earliest" fact rather than a running total. */
  var MIN_KEYS = { firstAt: 1, earnedAt: 1, startedAt: 1 };

  /* When was this spaced-repetition record last graded? Not stored directly,
     but srSchedule() sets dueAt = now + interval days, so it is recoverable.
     The record graded more recently is the one that reflects reality. */
  function srTouchedAt(r) {
    if (!isObj(r)) return -Infinity;
    var due = typeof r.dueAt === 'number' ? r.dueAt : 0;
    var iv = typeof r.interval === 'number' ? r.interval : 0;
    return due - iv * DAY_MS;
  }

  function mergeHistory(a, b) {
    var all = (Array.isArray(a) ? a : []).concat(Array.isArray(b) ? b : []);
    var seen = {}, out = [];
    for (var i = 0; i < all.length; i++) {
      var h = all[i];
      if (!isObj(h)) continue;
      var id = [h.timestamp, h.mode, h.topic, h.score, h.total].join('|');
      if (seen[id]) continue;
      seen[id] = 1; out.push(h);
    }
    out.sort(function (x, y) { return (y.timestamp || 0) - (x.timestamp || 0); });
    return out.slice(0, HISTORY_LIMIT);
  }

  /* Generic value merge. `local` wins ties, which keeps the merge stable when
     a file is imported onto the device it was exported from. */
  function mergeValue(local, incoming, keyName) {
    if (incoming === undefined) return local;
    if (local === undefined) return incoming;

    if (typeof local === 'number' && typeof incoming === 'number') {
      return MIN_KEYS[keyName] ? Math.min(local, incoming) : Math.max(local, incoming);
    }
    if (typeof local === 'boolean' && typeof incoming === 'boolean') {
      return local || incoming;                      // a thing done stays done
    }
    if (Array.isArray(local) || Array.isArray(incoming)) {
      return local;                                  // only `history` merges, handled above
    }
    if (isObj(local) && isObj(incoming)) return mergeObject(local, incoming);
    return local;                                    // strings and mismatched types
  }

  function mergeObject(local, incoming) {
    var out = {}, k;
    for (k in local) if (Object.prototype.hasOwnProperty.call(local, k)) out[k] = local[k];
    for (k in incoming) {
      if (!Object.prototype.hasOwnProperty.call(incoming, k)) continue;
      out[k] = mergeValue(out[k], incoming[k], k);
    }
    return out;
  }

  /* One subject's saved blob. Handles the fields whose correct merge is not
     "take the larger number", and delegates the rest — questions, topics,
     lessons, badges, mistakes, daily, flagged — to the generic rule, which is
     right for all of them because every field in them is monotonic. */
  function mergeSubject(local, incoming) {
    if (!isObj(local)) return isObj(incoming) ? incoming : local;
    if (!isObj(incoming)) return local;

    var out = mergeObject(local, incoming);

    /* Device-local. Never travels. */
    out.settings = local.settings;
    out.session = local.session;
    out.planner = local.planner;

    if (local.history || incoming.history) {
      out.history = mergeHistory(local.history, incoming.history);
    }

    /* Spaced repetition: take the whole record from whichever side graded it
       last. Merging the fields individually would invent a schedule that
       neither device ever computed. */
    if (isObj(local.sr) || isObj(incoming.sr)) {
      var sr = {}, id;
      var ls = isObj(local.sr) ? local.sr : {}, is = isObj(incoming.sr) ? incoming.sr : {};
      for (id in ls) if (Object.prototype.hasOwnProperty.call(ls, id)) sr[id] = ls[id];
      for (id in is) {
        if (!Object.prototype.hasOwnProperty.call(is, id)) continue;
        if (!sr[id] || srTouchedAt(is[id]) > srTouchedAt(sr[id])) sr[id] = is[id];
      }
      out.sr = sr;
    }

    /* Glossary flashcards use the same reasoning: the further-advanced box is
       the one to keep, with its own due date rather than a spliced one. */
    if (isObj(local.flash) || isObj(incoming.flash)) {
      var fl = {}, t;
      var lf = isObj(local.flash) ? local.flash : {}, inf = isObj(incoming.flash) ? incoming.flash : {};
      for (t in lf) if (Object.prototype.hasOwnProperty.call(lf, t)) fl[t] = lf[t];
      for (t in inf) {
        if (!Object.prototype.hasOwnProperty.call(inf, t)) continue;
        var a = fl[t], b = inf[t];
        if (!a) { fl[t] = b; continue; }
        var ab = (isObj(a) && a.box) || 0, bb = (isObj(b) && b.box) || 0;
        if (bb > ab || (bb === ab && (b.dueAt || 0) > (a.dueAt || 0))) fl[t] = b;
      }
      out.flash = fl;
    }

    /* The mistake notebook is a story per question, not a set of monotonic
       fields: `cleared` is deliberately set BACK to false by a later wrong
       answer, so the generic boolean OR would resurrect "cleared" on every
       merge after a re-miss and silently empty the notebook. Keep the whole
       record from whichever side saw the question last — the same reasoning
       as spaced repetition above — but never lose the larger count. */
    if (isObj(local.mistakes) || isObj(incoming.mistakes)) {
      var mm = {}, mid;
      var lm = isObj(local.mistakes) ? local.mistakes : {};
      var im = isObj(incoming.mistakes) ? incoming.mistakes : {};
      var mTouched = function (r) {
        return Math.max((isObj(r) && r.lastAt) || 0, (isObj(r) && r.clearedAt) || 0);
      };
      for (mid in lm) if (Object.prototype.hasOwnProperty.call(lm, mid)) mm[mid] = lm[mid];
      for (mid in im) {
        if (!Object.prototype.hasOwnProperty.call(im, mid)) continue;
        var mcur = mm[mid], minc = im[mid];
        if (!mcur) { mm[mid] = minc; continue; }
        var mwin = mTouched(minc) > mTouched(mcur) ? minc : mcur, mf;
        var mout = {};
        for (mf in mwin) if (Object.prototype.hasOwnProperty.call(mwin, mf)) mout[mf] = mwin[mf];
        mout.count = Math.max((isObj(mcur) && mcur.count) || 0, (isObj(minc) && minc.count) || 0);
        mm[mid] = mout;
      }
      out.mistakes = mm;
    }

    /* The streak is a single coherent story, not a set of fields: keep the
       side that scored most recently, but never lose the better best. */
    if (isObj(local.stats) && isObj(incoming.stats)) {
      var lst = local.stats.streak, ist = incoming.stats.streak;
      if (isObj(lst) || isObj(ist)) {
        var newer = ((ist && ist.lastCorrectAt) || 0) > ((lst && lst.lastCorrectAt) || 0) ? ist : lst;
        out.stats.streak = {
          current: (newer && newer.current) || 0,
          lastCorrectAt: (newer && newer.lastCorrectAt) || 0,
          best: Math.max((lst && lst.best) || 0, (ist && ist.best) || 0),
        };
      }
    }

    /* Story progress is versioned on purpose: a rewrite means a recorded day
       no longer means the same thing, so records across a version boundary
       must not be blended. */
    if (isObj(local.story) && isObj(incoming.story) && local.story.v !== incoming.story.v) {
      out.story = local.story;
    }

    /* Re-apply the app's own 60-day cap on daily activity. */
    if (isObj(out.daily)) {
      var days = Object.keys(out.daily).sort();
      while (days.length > DAILY_LIMIT) delete out.daily[days.shift()];
    }

    return out;
  }

  /* Merge a whole backup into a whole store. */
  function mergeAll(local, incoming) {
    var out = {}, k;
    for (k in local) if (Object.prototype.hasOwnProperty.call(local, k)) out[k] = local[k];
    for (k in incoming) {
      if (!Object.prototype.hasOwnProperty.call(incoming, k)) continue;
      if (!isProgressKey(k) || isDeviceKey(k)) continue;
      out[k] = (k in out) ? mergeSubject(out[k], incoming[k]) : incoming[k];
    }
    return out;
  }

  /* Replace: take the file wholesale, still leaving device keys alone — and
     leaving the DEVICE-LOCAL fields inside each subject blob (settings,
     session, planner) with the device, since an older file may still carry
     them and "replace my progress" was never "adopt someone else's dark-mode
     and their half-finished quiz". */
  function replaceAll(local, incoming) {
    var out = {}, k;
    for (k in local) if (Object.prototype.hasOwnProperty.call(local, k)) out[k] = local[k];
    for (k in incoming) {
      if (!Object.prototype.hasOwnProperty.call(incoming, k)) continue;
      if (!isProgressKey(k) || isDeviceKey(k)) continue;
      var inc = incoming[k], loc = out[k];
      if (isObj(inc) && isObj(loc)) {
        var merged = {}, f;
        for (f in inc) if (Object.prototype.hasOwnProperty.call(inc, f)) merged[f] = inc[f];
        if (loc.settings !== undefined) merged.settings = loc.settings; else delete merged.settings;
        if (loc.session !== undefined) merged.session = loc.session; else delete merged.session;
        if (loc.planner !== undefined) merged.planner = loc.planner; else delete merged.planner;
        out[k] = merged;
      } else {
        out[k] = inc;
      }
    }
    return out;
  }

  function applyImport(doc, mode, store) {
    var local = readAll(store);
    var next = mode === 'replace' ? replaceAll(local, doc.keys) : mergeAll(local, doc.keys);
    writeAll(next, store);
    return next;
  }

  root.ProgressBackup = {
    FORMAT: FORMAT,
    VERSION: VERSION,
    isProgressKey: isProgressKey,
    isDeviceKey: isDeviceKey,
    readAll: readAll,
    writeAll: writeAll,
    forExport: forExport,
    buildExport: buildExport,
    filename: filename,
    parse: parse,
    summarize: summarize,
    mergeAll: mergeAll,
    replaceAll: replaceAll,
    mergeSubject: mergeSubject,
    mergeHistory: mergeHistory,
    applyImport: applyImport,
  };
}(typeof window !== 'undefined' ? window : globalThis));

if (typeof module !== 'undefined' && module.exports) module.exports = (typeof window !== 'undefined' ? window : globalThis).ProgressBackup;
