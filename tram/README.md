# Antalya transit board

A one-page board for every Antalya route: the six rail lines — T1A, T1B, T1C,
T1D, T3 and the nostalgic NT07 — as chips, and all 163 bus routes behind a
filter. Open `antalya-tram.html`, pick a route, a direction and a stop, and it
counts down what is coming. Below the board, a map of the route shows the
vehicles where the feed says they are.

ONE FILE. Markup, styles, logic and a fallback timetable are all in
`antalya-tram.html` — no build, no imports, no service worker.

IT IS NOT PART OF THIS SITE. The root `.assetsignore` keeps it out of that
deploy: it has inline scripts, which the site's `script-src 'self'` refuses, it
calls a third-party host, which `connect-src` refuses, and it would sit behind
the password gate — no use standing on a platform.

## Putting it somewhere it can be live

The page needs to reach service.kentkart.com, which rules out both the study
site and the Artifact viewer (whose CSP refuses third-party hosts, and no
artifact capability grants plain HTTP). So it deploys as its own Worker, from
this folder alone:

```
npx wrangler deploy --config tram/wrangler.jsonc
```

That publishes `https://antalya-transit.<your-subdomain>.workers.dev/`, which
`_redirects` points at the page. No password, no build, no secrets — an
assets-only Worker with nothing running in front of it. Delete it in the
Cloudflare dashboard when the trip is over.

FROM A PHONE, with no terminal, the same thing through the dashboard:
Workers & Pages → Create → Import a repository → this repo → set the deploy
command to `npx wrangler deploy --config tram/wrangler.jsonc` and leave the
build command empty. A second project on the same repository is fine; it
deploys on push like the study site does.

Failing that, any static host will do — the page is one file with no build and
no server side.

OR JUST OPEN THE FILE. A `file://` page may call a cross-origin endpoint when
that endpoint sends `access-control-allow-origin: *`, and this one does —
tested in Chromium, which fetches it from `file://` without complaint. I had
written the opposite here, from a test that failed for a different reason (the
browser in that sandbox had no network at all).

Whether a given browser allows it is the browser's business, not something
this page can promise, and Safari has historically been stricter about file
origins. The page says which mode it is in on the line under its title —
"Live from Kentkart" or "Offline — showing the 2023 timetable" — so open it
and read that. If it says Offline, serve the folder over HTTP instead:

```
python3 -m http.server 8000 --directory tram
```

and open `http://localhost:8000/antalya-tram.html`, where the call is an
ordinary cross-origin request and works everywhere.

## There is a live feed, and this uses it

Kentkart's own passenger API answers unauthenticated, over CORS
(`access-control-allow-origin: *`), with the trams' GPS:

```
GET https://service.kentkart.com/rl1/web/pathInfo
    ?region=026&lang=tr&direction=0&displayRouteCode=T1A&resultType=111110
```

`route/list` RETURNS MORE THAN ROUTES. Fifty of the 219 entries are five-digit
codes named after streets (`10006 ATATÜRK BLV-1`), and `pathInfo` answers every
one of them `Sonuç Bulunamadı` — no stops, no vehicles, no timetable. They are
left out of `window.ROUTES`. A route that answers that way anyway says so on
the status line, which is not the same message as a dead network.

`region=026` is Antalya, and it makes no distinction between modes:
`displayRouteCode=KL08` tracks that bus exactly as `T1A` tracks the tram — 9
vehicles were on KL08 when this was written. The route codes come from
`/rl1/api/route/list?region=026` and are baked into `window.ROUTES`. `resultType` is a bitmask, most significant first:

| bit | gives | used for |
|-----|-------|----------|
| 1 | `pointList` | the real shape of the track, so the map is not straight lines between stops |
| 2 | `busList` | **the vehicles on the road now** — lat, lng, plate, and the stop each last called at |
| 3 | `busStopList` | the stops, with `departure_offset` in seconds from the start of the line |
| 4 | `timeTableList` | a window of departures around now |
| 5 | `scheduleList` | the current timetable, one entry per service day |

A service day is named by a seven-letter string, Monday first, with the days it
runs capitalised: `MTWTFss` is the weekday service, `mtwtfSs` Saturday,
`mtwtfsS` Sunday.

THE BOARD MIXES TWO KINDS OF ROW. A **live** row is a tram the feed can see:
its arrival is the booked run time from the stop it last called at to yours,
which is `departure_offset` differences. A **timed** row is that line's current
timetable. A timed tram within three minutes of a live one is taken to be the
same tram rather than a second one.

A live row needs a tracked vehicle *behind* your stop, which at the end of a
line is impossible and on a three-tram line is often just untrue. So when
nothing on your side of the line is tracked, the note above the board gives
the nearest vehicle that can still reach you — the one coming the other way,
its run time to the far end plus the booked run out to your stop, if it turns
straight round. It says so in those words: at a mid-route stop the timetable
below is usually sooner, and reading that note as "the next tram" would be
worse than showing nothing.

STOP NAMES END IN DIGITS THAT MATTER. The two tram platforms are `FATİH1` and
`FATİH2`, and showing both as `FATİH` reads better — but `CEBESOY CD-11`,
`CEBESOY CD-12` and `100 YIL BLV-1` are bus stops whose names simply end in a
number. Stripping a trailing 1 or 2 unconditionally turned CD-11 and CD-12 into
two stops both called `CD-1`. The rule is now: strip it only where a letter
comes immediately before it.

THE MAP ZOOMS to about forty times the fitted view — pinch, scroll, double-tap,
or the buttons under it, which centre on your stop rather than on the middle of
the bounding box (a diagonal route leaves most of that box empty). One finger
still scrolls the page until you have zoomed in; after that it pans. Every
radius, stroke and letter is divided by the magnification, so nothing fattens
as you go in, and past about three times the stop names on screen appear.
The frame is fitted to the track, not to the vehicles, so the picture does not
shift under you every twenty seconds as they move. Bear in mind what zoom
cannot fix: `pointList` leaves gaps of up to 2.6 km, so far enough in the drawn
track visibly cuts the corners the real rails go round.

Vehicles move visibly in well under a minute — one T3 tram moved 310 m in the
46 seconds between two polls — so the page refreshes every 20 seconds, and on
returning to the tab. If six of those refreshes pass without an answer the page
keeps the last positions but drops the word "live": it says how old they are
instead.

## The fallback, and why it is still here

With no signal the page falls back to `window.TRAM`, a timetable flattened from
the city's 2023 GTFS export, and the status line says so rather than passing it
off as live. The fallback carries T1A, T1B, T3 and the nostalgic line (which
that export calls T2); T1C and T1D postdate it and are live-only.

To rebuild the fallback, download the GTFS zip that
[transitous.org](https://transitous.org) points at for Antalya and flatten
`trips.txt`, `stop_times.txt` and `stops.txt` into `window.TRAM`: each trip
becomes `[departure minute, then minutes after departure at each stop]`.

THAT EXPORT'S CALENDARS DISAGREE WITH THEMSELVES, and taking them literally is
a bug this page shipped once. `H`, `C` and `P` are plainly weekday, Saturday and
Sunday, but all three are marked as running on all seven days — so read
literally they put the weekday and the Sunday timetable on the road at the same
time, and the first cut offered 99 Sunday departures against the real 61. Each
day takes the one calendar meant for it.

## What was checked before the live feed was found

Kept because it says where not to bother looking again: `/rl1/api/…` carries
only `route/*`, `trip/search`, `poi/list` and `taxi/*`, and roughly 550 probed
paths under it returned nothing for vehicles — the positions live under
`/rl1/web/`, a namespace with flat command names rather than group/verb.
transitous.org carries no GTFS-Realtime for any Turkish feed;
`acikveri.antalya.bel.tr` is down even from Turkey; and
`antray.antalyaulasim.com.tr` is a journey-time lookup over scheduled data.
