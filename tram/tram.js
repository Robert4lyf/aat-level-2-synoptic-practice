/* Antalya tram departure board.
 *
 * Everything it needs is in tram-data.js: there is no network call, no live
 * feed, no service worker. The timetable is fixed at the moment it was
 * captured, which is the honest limit of this page — Antalya publishes no
 * public real-time feed, so a delayed tram still shows at its booked time.
 *
 * The clock is always Antalya's, read through Intl rather than the device's
 * own offset, so the board is right whether the phone is on Turkish time or
 * still on the time it left home.
 */
'use strict';

(function () {
  var DATA = window.TRAM;
  var STOPS = DATA.stops, DIRS = DATA.dirs;
  var LINE_LABEL = { T1A: 'T1A', T1B: 'T1B', T2: 'T2', T3: 'T3' };
  var LINE_NOTE = { T2: 'nostalgic tram' };
  var SHOWN = 6;

  var state = {
    line: 'T1A',
    dir: '0',
    stop: null,
    open: null,   /* index of the departure whose calling points are showing */
    favs: []
  };

  /* ---- Antalya time ---------------------------------------------------- */

  var fmt = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Istanbul', weekday: 'short',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  });

  function antalyaNow() {
    var parts = {}, list = fmt.formatToParts(new Date()), i;
    for (i = 0; i < list.length; i++) parts[list[i].type] = list[i].value;
    var h = parseInt(parts.hour, 10) % 24;
    return {
      minutes: h * 60 + parseInt(parts.minute, 10) + parseInt(parts.second, 10) / 60,
      weekday: parts.weekday,
      clock: (h < 10 ? '0' : '') + h + ':' + parts.minute
    };
  }

  /* Sunday runs its own timetable; Monday to Saturday share one. */
  function dayType(weekday) { return weekday === 'Sun' ? 'su' : 'wd'; }
  function yesterdayType(weekday) { return weekday === 'Mon' ? 'su' : 'wd'; }
  function tomorrowType(weekday) { return weekday === 'Sat' ? 'su' : 'wd'; }

  function hhmm(min) {
    var m = ((min % 1440) + 1440) % 1440;
    var h = Math.floor(m / 60), n = Math.round(m % 60);
    return (h < 10 ? '0' : '') + h + ':' + (n < 10 ? '0' : '') + n;
  }

  function countdown(mins) {
    if (mins < 0.5) return 'now';
    if (mins < 60) return 'in ' + Math.round(mins) + ' min';
    var h = Math.floor(mins / 60), m = Math.round(mins % 60);
    return 'in ' + h + ' h ' + (m < 10 ? '0' : '') + m;
  }

  /* Platform names carry a trailing 1 or 2 for the two sides of the track;
   * the sign on the street does not, so neither does the picker. */
  function stopName(id) { return STOPS[id][0].replace(/\s*[12]$/, ''); }

  /* ---- departures ------------------------------------------------------ */

  /* Every tram calling at `stopId` on `dirKey` from `nowMin` onwards, soonest
   * first. Trips that left before midnight can still be running, so the
   * previous day's timetable is folded in with its minutes shifted back. */
  function departures(dirKey, stopId, now) {
    var dir = DIRS[dirKey];
    var idx = dir.stops.indexOf(stopId);
    if (idx < 0) return [];
    var out = [];
    function collect(trips, shift) {
      if (!trips) return;
      for (var i = 0; i < trips.length; i++) {
        var t = trips[i][idx + 1] + trips[i][0] - shift;
        if (t >= now.minutes - 1 && t < now.minutes + 24 * 60) out.push({ at: t, trip: trips[i] });
      }
    }
    collect(dir.trips[dayType(now.weekday)], 0);
    collect(dir.trips[yesterdayType(now.weekday)], 1440);
    /* Late in the evening the rest of the board is tomorrow's first trams. */
    collect(dir.trips[tomorrowType(now.weekday)], -1440);
    out.sort(function (a, b) { return a.at - b.at; });
    return out.slice(0, SHOWN);
  }

  /* ---- rendering ------------------------------------------------------- */

  var el = {
    clock: document.getElementById('clock'),
    lines: document.getElementById('lines'),
    dirs: document.getElementById('dirs'),
    stop: document.getElementById('stop'),
    fav: document.getElementById('fav'),
    favs: document.getElementById('favs'),
    board: document.getElementById('board'),
    src: document.getElementById('src')
  };

  function dirKey() { return state.line + '|' + state.dir; }
  function dirsFor(line) {
    return Object.keys(DIRS).filter(function (k) { return DIRS[k].route === line; }).sort();
  }
  function terminus(key) { return stopName(DIRS[key].stops[DIRS[key].stops.length - 1]); }

  function renderLines() {
    var lines = [], seen = {};
    Object.keys(DIRS).forEach(function (k) {
      if (!seen[DIRS[k].route]) { seen[DIRS[k].route] = 1; lines.push(DIRS[k].route); }
    });
    lines.sort();
    el.lines.innerHTML = '';
    lines.forEach(function (line) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'chip ' + line.toLowerCase();
      b.setAttribute('aria-pressed', line === state.line ? 'true' : 'false');
      b.textContent = LINE_LABEL[line] + (LINE_NOTE[line] ? ' · ' + LINE_NOTE[line] : '');
      b.onclick = function () {
        state.line = line;
        state.dir = dirsFor(line)[0].split('|')[1];
        state.stop = null;
        render();
      };
      el.lines.appendChild(b);
    });
  }

  function renderDirs() {
    el.dirs.innerHTML = '';
    dirsFor(state.line).forEach(function (key) {
      var d = key.split('|')[1];
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-pressed', d === state.dir ? 'true' : 'false');
      b.textContent = 'towards ' + terminus(key);
      b.onclick = function () { state.dir = d; state.stop = null; render(); };
      el.dirs.appendChild(b);
    });
  }

  function renderStops() {
    var stops = DIRS[dirKey()].stops;
    if (stops.indexOf(state.stop) < 0) state.stop = stops[0];
    el.stop.innerHTML = '';
    stops.forEach(function (id, i) {
      var o = document.createElement('option');
      o.value = id;
      o.textContent = (i + 1) + '. ' + stopName(id);
      if (id === state.stop) o.selected = true;
      el.stop.appendChild(o);
    });
    el.fav.textContent = isFav() ? '★' : '☆';
  }

  function renderBoard() {
    var now = antalyaNow();
    el.clock.textContent = now.clock;
    var key = dirKey(), deps = departures(key, state.stop, now);
    el.board.innerHTML = '';
    if (!deps.length) {
      var p = document.createElement('li');
      p.className = 'empty';
      p.textContent = 'No trams from this stop in the next 24 hours.';
      el.board.appendChild(p);
      return;
    }
    deps.forEach(function (dep, i) {
      var wait = dep.at - now.minutes;
      var li = document.createElement('li');
      if (wait < 5) li.className = 'soon';

      var row = document.createElement('button');
      row.type = 'button';
      row.className = 'dep';

      var badge = document.createElement('span');
      badge.className = 'badge';
      badge.style.color = 'var(--' + state.line.toLowerCase() + ')';
      badge.textContent = state.line;

      var to = document.createElement('span');
      to.className = 'to';
      to.textContent = 'to ' + terminus(key);

      var when = document.createElement('span');
      when.className = 'when';
      when.innerHTML = '<b></b><span></span>';
      when.querySelector('b').textContent = countdown(wait);
      when.querySelector('span').textContent = hhmm(dep.at);

      row.appendChild(badge); row.appendChild(to); row.appendChild(when);
      row.onclick = function () { state.open = state.open === i ? null : i; renderBoard(); };
      li.appendChild(row);

      if (state.open === i) li.appendChild(callingPoints(key, dep));
      el.board.appendChild(li);
    });
  }

  /* The rest of this tram's journey, so you can see when it reaches where you
   * are going without working it out from a map. */
  function callingPoints(key, dep) {
    var dir = DIRS[key], from = dir.stops.indexOf(state.stop);
    var ul = document.createElement('ul');
    ul.className = 'calls';
    for (var i = from + 1; i < dir.stops.length; i++) {
      var li = document.createElement('li');
      var name = document.createElement('span');
      name.textContent = stopName(dir.stops[i]);
      var t = document.createElement('b');
      t.textContent = hhmm(dep.trip[0] + dep.trip[i + 1]);
      li.appendChild(name); li.appendChild(t);
      ul.appendChild(li);
    }
    return ul;
  }

  /* ---- saved stops ----------------------------------------------------- */

  function favId() { return dirKey() + '@' + state.stop; }
  function isFav() { return state.favs.indexOf(favId()) >= 0; }

  function renderFavs() {
    el.favs.innerHTML = '';
    el.favs.hidden = state.favs.length === 0;
    state.favs.forEach(function (id) {
      var key = id.split('@')[0], stop = id.split('@')[1];
      if (!DIRS[key] || !STOPS[stop]) return;
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = stopName(stop) + ' → ' + terminus(key);
      b.onclick = function () {
        state.line = DIRS[key].route;
        state.dir = key.split('|')[1];
        state.stop = stop;
        render();
      };
      el.favs.appendChild(b);
    });
  }

  function store() {
    try {
      localStorage.setItem('antalya-tram', JSON.stringify({
        line: state.line, dir: state.dir, stop: state.stop, favs: state.favs
      }));
    } catch (e) { /* private browsing — the page still works, it just forgets */ }
  }

  function restore() {
    var saved;
    try { saved = JSON.parse(localStorage.getItem('antalya-tram') || '{}'); } catch (e) { saved = {}; }
    if (saved.favs) state.favs = saved.favs;
    if (saved.line && dirsFor(saved.line).length) {
      state.line = saved.line;
      state.dir = saved.dir || '0';
      state.stop = saved.stop || null;
    }
  }

  /* ---- wiring ---------------------------------------------------------- */

  function render() {
    state.open = null;
    renderLines();
    renderDirs();
    renderStops();
    renderFavs();
    renderBoard();
    store();
  }

  el.stop.onchange = function () { state.stop = el.stop.value; render(); };

  el.fav.onclick = function () {
    var id = favId(), i = state.favs.indexOf(id);
    if (i >= 0) state.favs.splice(i, 1); else state.favs.push(id);
    render();
  };

  el.src.textContent =
    'Timetable captured ' + DATA.meta.captured + ' from ' + DATA.meta.source + '.';

  restore();
  render();

  /* A minute is the resolution of the timetable, so a 15-second tick keeps the
   * countdown honest without spinning the phone's battery. */
  setInterval(renderBoard, 15000);
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) renderBoard();
  });
})();
