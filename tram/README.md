# Antalya tram board

A one-page departure board for Antalya's trams — T1A, T1B, T3 and the T2
nostalgic line. Open `tram/index.html` (deployed: `/tram/index.html`), pick a
line, a direction and a stop, and it counts down the next six trams. Tap a
departure to see when that tram reaches every stop further down the line.

It is deliberately inert: three files, no build, no network calls at runtime,
no service worker of its own. That means it works on a phone with no signal,
and it means the timetable is frozen at the moment it was captured.

## What it is not

It is not live tracking. Antalya publishes no public real-time feed for the
trams — the Kentkart API behind the AntalyaKart app exposes route and stop
lists but no vehicle positions, and `antray.antalyaulasim.com.tr` is not a
documented API. So a tram running ten minutes late still shows at its booked
time here.

## Where the timetable comes from

The city's official GTFS feed (`tr_antalya.gtfs.zip`), read through
[transitous.org](https://transitous.org)'s public MOTIS API — a free community
mirror of open transit feeds. Captured 2026-09-10.

To refresh it, for each line and direction (`T1A|0`, `T1A|1`, `T1B|0`, `T1B|1`,
`T2|0`, `T2|1`, `T3|0`, `T3|1`):

1. List that day's trips from the first stop of the direction:
   `https://api.transitous.org/api/v1/stoptimes?stopId=<first stop>&time=<ISO UTC>&n=100`
   (page on with `pageCursor`, keep entries whose `routeShortName` and
   `directionId` match).
2. Fetch each trip: `https://api.transitous.org/api/v1/trip?tripId=<id>` — the
   single leg holds `from`, `intermediateStops` and `to` with scheduled times.
3. Write each trip as `[departure minute, then minutes after departure at each
   stop]` into `tram-data.js`.

Two day types are stored: `wd` (Monday–Saturday, one timetable) and `su`
(Sunday, which runs a denser T1 service). The feed lists some Sunday trips
twice; trips sharing a departure minute are collapsed to one.

Stop names keep the feed's trailing `1`/`2`, which marks the two sides of the
track; the page strips it, because the sign on the street does not have it.
