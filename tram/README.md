# Antalya tram board

A one-page departure board for Antalya's trams — T1A, T1B, T3 and the T2
nostalgic line. Open `antalya-tram.html`, pick a line, a direction and a stop,
and it counts down the next six trams. Tap a departure to see when that tram
reaches every stop further down the line.

ONE FILE, ON PURPOSE. Markup, styles, timetable and logic are all in
`antalya-tram.html` — no build, no imports, no network calls at runtime, no
service worker. Open it from anywhere: a phone's downloads, a memory stick, any
static host. It works with no signal, and the timetable is frozen at the moment
it was captured.

IT IS NOT PART OF THIS SITE. `.assetsignore` keeps it out of the deploy, so it
never reaches the password gate — which is the point, since a tram board you
have to log in to is no use standing on a platform. Its inline scripts would
also be refused by the site's `script-src 'self'` policy, and relaxing that
policy to host a tram timetable would be the wrong trade.

## What it is not

It is not live tracking. Antalya publishes no public real-time feed for the
trams — the Kentkart API behind the AntalyaKart app exposes route and stop
lists but no vehicle positions, and `antray.antalyaulasim.com.tr` is not a
documented API. So a tram running ten minutes late still shows at its booked
time here.

## Where the timetable comes from

The GTFS feed published by Otobus Tramvay (`agency_url` is
antalyaulasim.com.tr), as mirrored by [transitous.org](https://transitous.org),
whose feed list points at a Dropbox-hosted `antalya.zip`. That is the newest
public copy there is, and it is not new: `stop_times.txt` is dated September
2023 and `routes.txt` September 2024. Its `calendar.txt` runs to 2030, so
nothing anywhere marks it stale — this paragraph is the only thing that does.

To rebuild the timetable, download that zip and flatten it:

1. `trips.txt` — keep `route_id` in T1A, T1B, T2, T3; note `service_id` and
   `direction_id`.
2. `stop_times.txt` — group by `trip_id`, order by `stop_sequence`, and write
   each trip as `[departure minute, then minutes after departure at each stop]`
   into the `window.TRAM` object at the top of `antalya-tram.html`.
3. `stops.txt` — name and coordinates for each stop id.

THE FEED'S CALENDARS DISAGREE WITH THEMSELVES, and taking them literally is a
bug I shipped once. There are three: `H`, `C` and `P`. `C` departs at exactly
the same minutes as `H` and `P` at different ones — plainly weekday, Saturday
and Sunday — but all three are marked `1` for all seven days, so read literally
they put the weekday and the Sunday timetable on the road simultaneously. The
first cut of this page did that and offered Sunday trams that do not run: 99
departures a day against the real 61. Each day now takes the one calendar meant
for it.

Stop names keep the feed's trailing `1`/`2`, which marks the two sides of the
track; the page strips it, because the sign on the street does not have it.

## No live feed exists, and here is where I looked

- **Kentkart** (`service.kentkart.com/rl1/api`, Antalya is region `026`) is the
  service behind the AntalyaKart app. `route/list` and `trip/search` answer
  unauthenticated; roughly 400 probed paths and parameter names turned up no
  vehicle-position endpoint. The app has live buses, so the data exists — it is
  just not exposed.
- **transitous.org** carries no GTFS-Realtime for any Turkish feed.
- **acikveri.antalya.bel.tr** (the city's open data portal) and
  **antray.antalyaulasim.com.tr** both resolve in DNS but refuse connections
  from outside Turkey. Either could hold something; check them from a Turkish
  connection before assuming this list is closed.
- **Moovit** shows Antalya trams and advertises live arrivals, but has no
  public API.
