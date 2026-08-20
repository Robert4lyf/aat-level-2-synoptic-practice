# Guitar module — implementation plan

Working document. Written for the implementer, not for the reader.
All line numbers verified against `main` @ `1160128` (v1.19.0, sw cache `aat-l2-v100`).

---

## 0. Decisions taken

| Decision | Value | Why |
|---|---|---|
| Subject id | `guitar` | storage key becomes `prep_v2_guitar` |
| Render mode | **self-rendering** (`ui: 'GUITAR_UI'`) | needs card elements and question types the shared player cannot express; keeps Level 2's untested lesson player untouched |
| Engine host | browser **and** Node (UMD, per `formula-engine.js:34-39`) | the playability sweep must run the generator inside `npm test` |
| Notation | tab-primary, hand-rolled. No VexFlow/alphaTab | genre-diverse fingerstyle reads tab; a staff engraver is ~an `app.js` of dependency |
| Synth | Karplus–Strong pre-rendered into `AudioBuffer`s | no samples, no soundfont, no CSP change, works offline |
| Microphone | **not used** | `Permissions-Policy: microphone=()` stays as-is in all three files |
| Skeleton | LCM Acoustic Guitar syllabus, encoded as a coverage ratchet only | free, stable (2020→, upd. 01.01.2025), enumerates content per grade |
| Scope | **Phase 1 — seven units** | confirmed; M3 pulled forward, see §1 |
| Branch | reset `claude/guitar-course-feasibility-1z2slf` from `main`, force-with-lease | confirmed; its only commit was the doc already discarded |
| Instrument | **neutral**, with per-lesson declaration where it matters | player will pick the right guitar per topic |
| Picking hand | **flesh**, not nails | changes P1, P3 and the hygiene content — see §4.5 |
| `sw.js` | subject-aware precache | avoids an offline-size regression for AAT-only users |
| `guitar-styles.css` | lazy-inject from `activate()` | ~116 KB of CSS already loads eagerly |

---

## 1. Scope and phases

Full design is 26 units across four strands (P1–7, F1–4, M1–9, A1–6) plus the tapping module.
**Phase 1 ships seven units.** Architecture is identical either way; only content volume differs.

### Phase 1 — the substrate and the core
- Engine: fretboard model, note representation, generator, renderer, synth, scheduler, vamp/drone
- Units **P1** (the hand), **P2** (arpeggio patterns + Giuliani), **P3** (voicing and balance)
- Units **M3** (the fretboard), **M5** (pentatonics and blues), **M7** (keys and the number system), **M8** (modes)
- Session builder, rut breaker
- All four checkers, wired into `npm test`

**M3 moved into Phase 1.** An earlier draft had it in Phase 2 while keeping M5, M7 and M8 in Phase 1 — teaching positions, keys and modes to someone never taught the fretboard. Scale positions are meaningless without it, and it introduces the tuning/capo/handedness model the engine is built on. Phase 1 is seven units, not six.

### Phase 2
P4, P5, F1–F3, M4, M6, checkpoints, convergences, mastery-grid decay

### Phase 3
A1 styles (11 lessons), A4 arranging, A5 whole piece, M9 ear-to-hand, tapping module T0–T4 + B1–B8

**Drop order if it stalls:** A1 styles first (most content, least value per unit), then tapping (most self-contained).

---

## 2. File manifest

New:

```
guitar-engine.js        UMD. Fretboard model, note rep, scales, patterns,
                        generator, timing maths. No DOM. Node-importable.
guitar-render.js        SVG/DOM: tab, chordbox, fretboard, rhythm grid. Browser only.
guitar-audio.js         Karplus–Strong, scheduler, transport, drone/vamp. Browser only.
guitar-syllabus.js      LCM requirements per grade, encoded. Node-importable.
guitar-learn-data.js    Lessons and cards.
guitar-exercise-data.js Curated exercise list + rut-breaker bank.
guitar-ui.js            GUITAR_UI = { mount, reset }. Owns its screens and storage.
guitar-styles.css       Scoped under body[data-subject="guitar"].

scripts/lib/prose-mannerisms.js     extracted from the three AAT checkers
scripts/check-guitar-coverage.js
scripts/check-guitar-quality.js
scripts/check-guitar-playability.js
scripts/check-guitar-handedness.js
scripts/test-guitar-engine.js       pure-function unit tests (timing, geometry)
```

Modified: `app.js`, `styles.css`, `sw.js`, `index.html`, `package.json`, `progress-backup.js`, `scripts/check-progress-backup.js`, `scripts/check-aat{1,2,3}-quality.js`, `README.md`.

---

## 3. Integration edit sites (verified)

### 3.1 `app.js:16` — registry entry

Insert after the `code-route` entry:

```js
{
  id: 'guitar', name: 'Fingerstyle Guitar', short: 'Guitar', flag: '🎸', color: '#B45309',
  desc: 'Fingerstyle technique, scales, modes and the fretboard',
  meta: '7 units · exercises · ear training',
  tabs: ['home'],
  ui: 'GUITAR_UI',
  assets: ['guitar-engine.js','guitar-audio.js','guitar-render.js',
           'guitar-syllabus.js','guitar-learn-data.js','guitar-exercise-data.js','guitar-ui.js'],
  activate() { window.TOPICS = []; window.ALL_QUESTIONS = []; window.LEARN_PATH = []; window.SKILLS = { defs: [] }; }
}
```

`assets` order matters — `loadScript` sets `async = false` to preserve execution order (`app.js:95`). Engine before render before ui.

### 3.2 What needs **no** edit

Verified, do not touch:

- `ALL_TABS` (`app.js:3220`) — only read by `renderMain()`, which self-rendering subjects bypass at `app.js:3155`.
- `getStorageKey` / `subjectStorageKey` (`app.js:9-10`) — the `prep_v2_` + id pattern already generalises.
- The inline theme bootstrap in `index.html` — same pattern; **editing it would break all four CSP hashes**.
- `progress-backup.js:45` — prefix-matches `prep_v2_`, so `prep_v2_guitar` is exported automatically.
- AAT-only UI — calculator (`app.js:4196, 4353, 4433, 5065`), L3 bridge (`app.js:5338`), reference panel CSS (`styles.css:2790-2791`) all key off `=== 'aat'` or `:not([data-subject="aat"])`.

### 3.3 `styles.css:5072-5080` — `--subj` tokens

Two lines, light and dark. Note `aat1` and `aat3` are absent from this block because they ship their own stylesheets; guitar does too, but add the tokens anyway for the subject picker card.

```css
body[data-subject="guitar"]      { --subj: #b45309; --subj-rgb: 180,83,9;    --subj-light: rgba(180,83,9,.08);   }
body.dark[data-subject="guitar"] { --subj: #fbbf24; --subj-rgb: 251,191,36;  --subj-light: rgba(251,191,36,.10); }
```

### 3.4 `sw.js` — precache **and** the subject-aware fix

Two changes:

1. Bump `CACHE_VERSION` (`sw.js:6`) `aat-l2-v100` → `aat-l2-v101`.
2. `CORE_ASSETS` is unconditional. Adding the guitar corpus to it grows every AAT-only user's offline install. **Leave the existing seven subjects exactly as they are** and add guitar as the only lazily-cached one. Do not "tidy" French, LSF or code-route out of `CORE_ASSETS` at the same time — the README promises every subject works fully offline, and moving them would quietly break that for existing users.

   **The version bump wipes lazy caches.** `activate` deletes every cache whose key !== `CACHE_VERSION` (`sw.js:50-56`). If guitar's files live in the versioned cache, the next `CACHE_VERSION` bump deletes them, and a user who updates and then goes offline loses a subject they had been using. So guitar's lazily-cached files must go in a **separate, unversioned cache** (`guitar-lazy-v1`), excluded from the activate sweep by name, and only ever cleared deliberately.

   That means the `activate` handler changes from "delete everything that isn't current" to "delete everything that isn't current **and isn't in the keep-list**". That is a change to shared service-worker behaviour — treat it as the highest-risk edit in §3 and test the update path explicitly: install v100, use guitar offline, bump to v101, confirm guitar still works offline.

### 3.5 `index.html` — stylesheet link

**Decided: lazy-inject, no `<link>` in `index.html`.** `aat1`/`aat3`/`story` are eager and already cost ~116 KB of CSS on every load; a fourth is avoidable.

Inject from `activate()`, and make it **idempotent** — `activate()` runs on every subject switch, so guard on `document.getElementById('guitarCss')` before appending or the head accumulates duplicate links. Adding a `<link>` does **not** affect CSP hashes (they cover inline `<script>` only), and a same-origin stylesheet is allowed by `style-src 'self'`.

Sequencing trap: the stylesheet is injected asynchronously while `mount()` may render immediately, so the first paint can be unstyled. Either inject it in `activate()` *and* await its `load` event before the first `render()`, or accept one frame of unstyled content. Prefer the former — `ensureSubjectAssets()` already returns a promise the switcher awaits, so add the stylesheet to that chain rather than firing it and hoping.

### 3.6 `progress-backup.js` — mastery-grid merge rule

**This is a real bug if skipped.** The generic rule (`mergeValue`, `:199`) takes `Math.max` on numbers field-wise. A mastery cell is `{tempo, achievedAt}`; field-wise max produces `{tempo: <best ever>, achievedAt: <most recent>}` — a record neither device recorded, which defeats decay.

Handle it like `sr` (`:248-256`): take the whole cell from whichever side has the later `achievedAt`.

```js
if (isObj(local.mastery) || isObj(incoming.mastery)) {
  var mg = {}, k2;
  var lm = isObj(local.mastery) ? local.mastery : {}, im = isObj(incoming.mastery) ? incoming.mastery : {};
  for (k2 in lm) if (has(lm, k2)) mg[k2] = lm[k2];
  for (k2 in im) {
    if (!has(im, k2)) continue;
    if (!mg[k2] || (im[k2].achievedAt || 0) > (mg[k2].achievedAt || 0)) mg[k2] = im[k2];
  }
  out.mastery = mg;
}
```

Name the spaced-repetition field **`sr`** so the existing whole-record merge at `:248` applies unchanged. Extend `scripts/check-progress-backup.js` with a mastery-merge case.

### 3.7 `package.json`

Append to `test`: `check-guitar-coverage`, `check-guitar-quality`, `check-guitar-playability`, `check-guitar-handedness`, `test-guitar-engine`. Add matching named scripts.

### 3.8 Header 🎲 button — must be subject-gated

The header is shared across all six subjects. Add the button to `index.html` next to `referenceToggle`, hidden by default in CSS, and shown only under `body[data-subject="guitar"]`. Do **not** create it from `guitar-ui.js` — `applyChrome()` (`app.js:3130`) runs on every render and would fight it.

`applyChrome` does not currently touch the reference panel or any new button, so add the show/hide as a CSS rule rather than JS:

```css
#rutBtn { display: none; }
body[data-subject="guitar"] #rutBtn { display: inline-flex; }
```

---

## 4. Data model

### 4.1 The note representation — single source of truth

```js
Note = { string, fret, beat, dur, hand, finger, tech? }
```

- `string` 1–6, **1 = high E**, always, regardless of handedness or tuning.
- `fret` 0–24, absolute, **not** capo-relative.
- `beat` float, 0-based, in beats from the start of the phrase.
- `dur` float, in beats.
- `hand` `'p'` (picking) | `'f'` (fretting) — matters only for tapping.
- `finger` picking: `p|i|m|a`; fretting: `1|2|3|4|T`.
- `tech` optional: `hammer|pull|slide|bend|vib|harm|tap|ghost|slap`.

Nothing anywhere stores pixel positions or tab as text. Every renderer, checker, player and progress record consumes this shape. Handedness, capo and tuning are then rendering/sounding parameters, not data migrations.

### 4.2 Fretboard model

```js
Fretboard = { tuning: 'standard', capo: 0, handed: 'right'|'left' }
```

- `tuning` is a **named id**, not an array — a stored fretboard must survive a change to the tuning table, and an alias must never reach storage. `TUNINGS[id].midi` is the array of 6 MIDI numbers, **index 0 = string 6 (low)**. Standard = `[40,45,50,55,59,64]`.
- `soundingMidi(note, fb)` = `TUNINGS[fb.tuning].midi[6 - note.string] + note.fret`. Verify: string 6 → index 0 → 40 (E2); string 1 → index 5 → 64 (E4).

**Capo — store absolute, render relative.** These two rules together, and neither alone:

- `fret` is **always** measured from the nut, in stored data, in the engine, and in `soundingMidi`. A capo never changes a stored `fret`.
- The capo'd open string is `fret === capo`, not `fret === 0`. Therefore `fret === 0` is valid **only** when `capo === 0`, and any `0 < fret < capo` is unplayable.
- The **tab renderer subtracts `capo`** when displaying, so a capo'd open string draws as `0` — matching how every real tab source writes it. Authoring from a capo'd source means **adding** the capo to every fret.

An earlier draft of this section said "`fret === 0` means the capo", which is the capo-relative convention leaking into the absolute one. The two cannot both hold. If `soundingMidi` ever needs a `+ capo` term, the data is wrong, not the function.

- `handed` is read in **exactly one file**, `guitar-engine.js`, by the element helpers in §6.1. Nothing else anywhere may branch on it — that is the invariant the handedness checker enforces (§8.4).

Named tunings to support at launch: `standard`, `dropD`, `DADGAD`, `openD`, `openG`, `CGCFCE`.

`DADF#AD` was listed separately in an earlier draft; it **is** open D, note for note. Two ids for one tuning would fragment the mastery grid, because `cellKey` carries `tuningId` — the same exercise practised in "both" would score as two half-learnt cells. One canonical id per distinct pitch set; aliases resolve to it and are never stored.

### 4.3 Content shapes

```js
Lesson   { id, strand:'P'|'F'|'M'|'A', unit, criteria:[], title, icon,
           instrument:'any'|'steel'|'nylon'|'electric', cards:[] }
Card     { h, p:[], + ≥1 of: tab, chordbox, fretboard, rhythm, playalong, changes, ear, pointer }
Exercise { id, kind:'generated'|'authored', params?|notes?, tags:[], curated:bool }
Piece    { id, title, composer, source:'PD'|'original', tuning, capo, voices:[[Note]] }
Pointer  { song, artist, concept, listenFor, thenTry }
Rut      { id, family, text, level:'nudge'|'constraint'|'hard', requires:[unitId], bed? }
```

`Piece.source` is load-bearing: `'PD'` requires a composer dead pre-1930 or a traditional attribution, and the engraving must be typeset from the note representation here, **not** copied from a modern edition (edition copyright is separate from composition copyright).

### 4.4 Storage — `prep_v2_guitar`

```js
{
  settings: { tuning, capo, mirrorTab },   // device-local, never synced (mergeSubject keeps local)
  profile:  { handed: 'right', touch: 'flesh' },  // travels between devices
  lessons:  { [lessonId]: { done, at } },
  sr:       { [exerciseId]: { box, interval, dueAt } },   // name it `sr` — reuses the existing merge
  mastery:  { [cellKey]: { tempo, achievedAt } },         // needs the merge rule in §3.6
  sessions: [ { at, mins, items:[] } ],
  rut:      { recent: [id], lastAt },
  stats:    { streak: { current, best, lastCorrectAt } }  // reuses existing merge
}
```

`cellKey` = `scaleId|position|patternId|tuningId`. Deterministic, no free text.

Two notes on how these interact with the existing merge:

- `settings` is wiped to the local copy by `mergeSubject` (`progress-backup.js:237`), which is why per-device state (tuning, capo, `mirrorTab`) lives there.
- `profile` goes through the generic merge, and **`mergeValue` returns `local` for every string** (`:213`). So `handed` and `touch` do **not** propagate between devices once both have a value — they are set once per device at first run. That is acceptable (one tap to change) but must not be described as syncing. Do not add explicit merge handling for them; a two-device disagreement about handedness has no correct automatic resolution.

### 4.5 Consequences of flesh, and of instrument neutrality

**Flesh is the assumption, not a fork.** P1 does not present a nails-or-flesh choice; it teaches flesh technique directly. `touch` is stored so a later change is possible, but no Phase 1 content branches on it.

What this actually changes:

- **Hygiene content inverts rather than disappears.** Flesh playing needs nails cut back below the fingertip or they click on the string. The hygiene reference says "keep them short and why", not "how to shape and buff".
- **P3 gets harder, and leans on rest stroke.** Flesh has a narrower dynamic range and softer attack, so nail brightness cannot do the work of separating the melody from the accompaniment. Rest stroke on melody notes and deliberate attack-point control carry that load instead. Write P3 accordingly — this is the single biggest content consequence.
- **Attack point is unaffected.** *Sul tasto* vs *sul ponticello* works the same either way.
- **Thumbpicks are not plectrums.** Travis, Atkins and Emmanuel are all thumbpick players and it is fingerstyle equipment, not a pick. Name it once in P4 as an option for bass volume; build no content around it.
- **Classical tremolo and flamenco rasgueado are quieter flesh-only.** Still playable. Where a Phase 3 style lesson assumes nails, it must say so rather than assume.

**Instrument neutrality** is enforced by the `instrument` field on `Lesson`, default `'any'`. The renderer shows a short note when it is not `'any'`. A lesson marked `'any'` must not contain instrument-assuming phrasing (`your acoustic`, `on the electric`, `dial in`, `your amp`) — see §8.2.

---

## 5. Engine (`guitar-engine.js`)

UMD wrapper exactly as `formula-engine.js:34-39`, so checkers can `require()` it.

### 5.1 Scales

Formula as semitone offsets from root. Fourteen at launch:

```
major        0 2 4 5 7 9 11
natMinor     0 2 3 5 7 8 10
harmMinor    0 2 3 5 7 8 11
melMinor     0 2 3 5 7 9 11
ionian       = major
dorian       0 2 3 5 7 9 10
phrygian     0 1 3 5 7 8 10
lydian       0 2 4 6 7 9 11
mixolydian   0 2 4 5 7 9 10
aeolian      = natMinor
locrian      0 1 3 5 6 8 10
minPent      0 3 5 7 10
majPent      0 2 4 7 9
blues        0 3 5 6 7 10
```

Characteristic note per mode (for the fretboard highlight): lydian ♯4 (6), mixolydian ♭7 (10), dorian ♮6 (9), phrygian ♭2 (1), locrian ♭5 (6).
Brightness order, used by the modes unit: lydian > ionian > mixolydian > dorian > aeolian > phrygian > locrian.

### 5.2 Positions

CAGED boxes as a fret-window per (scale, key, box) plus three-notes-per-string and single-string. Emit `Note[]` given `(scaleId, rootMidi, position, fretboard)`.

Guard: a position that would require `fret < capo` is invalid — return empty and let the playability checker fail it at build time rather than rendering nonsense.

### 5.3 Sequence patterns

Applied to a note list: `straight, thirds, fourths, in3s, in4s, broken, skip, pedal`, each with an `ascending`/`descending` flag, plus `startDegree` (0-based into the scale).

### 5.4 Picking patterns

Applied to a chord shape: sequence of `(finger, stringOffset)`.
`p-i-m-a`, `p-a-m-i`, `p-i-m-a-m-i`, `p-m-i-m`, `pinch(p+i)`, Travis (alternating thumb + syncopated `i`/`m`), plus the Giuliani 120 as data.

### 5.5 Exercise generation

```js
{ scaleId|patternId, key, position, tuning, capo, rightHand, stroke, rhythm, tempo, backing }
```

`rightHand` ∈ `i-m | i-a | m-a | p-i-m-a | p-i-m-a-m-i | p`; `stroke` ∈ `rest | free`.
The scale engine and the picking-pattern engine are one function with different fields populated.

**The parameter space is finite but not enumerable in CI.** Counting it honestly: 14 scales × 12 keys × 7 positions × 6 tunings × 8 capo positions × 8 patterns × 6 right-hand fingerings × 2 strokes × 5 rhythms ≈ **27.1 million tuples**. An earlier draft claimed the checker could sweep all of it at build time; it cannot, and `npm test` runs on every commit.

Use **all-pairs (pairwise) coverage** instead: generate a case set in which every pair of parameter values from every pair of dimensions appears at least once. For these nine dimensions that is roughly 200–250 cases, runs in under a second, and catches the interaction bugs that matter — which are almost always two-dimensional (this scale in that tuning; this position under that capo).

On top of the pairwise set, sweep **exhaustively** over two things that are small and high-risk:
- every curated exercise in `guitar-exercise-data.js`
- every (tuning × capo) pair against every scale root — 6 × 8 × 12 = 576 cases, the combination most likely to produce sub-capo frets

### 5.6 Timing maths — pure functions, unit tested in Node

Split out so `scripts/test-guitar-engine.js` can cover the part that causes drift:

```js
beatsToSeconds(beats, bpm)
secondsToBeats(sec, bpm)
beatAt(index, subdivision)            // compute, never accumulate — see below
compileTempoMap(entries)              // → segments with precomputed start times
transportTime(beat, map, t0)          // beat → wall clock, across tempo changes
beatAtTime(sec, map, t0)              // the inverse, for the playback cursor
loopWrap(beat, loopStart, loopEnd)    // absolute beat → position within the loop
loopIteration(beat, loopStart, loopEnd)  // which pass — the duplicate guard
```

`transportTime` and `beatAtTime` want **compiled** segments, and normalise a raw `[{beat,bpm}]` map on the spot rather than reading an absent `.time` and returning `NaN` for every event. Compiling once and reusing is still what the transport should do; the guard is there because a silent NaN is a bug nobody can see.

**Beats are computed, never accumulated.** `beat = index * subdivision` from a fixed origin.

The reason is *not* floating-point precision, which an earlier draft claimed. That was measured: accumulating 1/3 a million times drifts by 1.1e-6 beats, which is 1.6 microseconds at 40 bpm against a 2 ms gate. Negligible, and sixteenths accumulate exactly.

The real reason is **path dependence**. An accumulated position is a function of the route taken to reach it, so a tempo change, a loop wrap or a seek silently corrupts every subsequent event, and the error is unbounded rather than tiny. A computed position is a function of the index alone and survives all three. Store the beat at which each tempo change occurs, never an elapsed-seconds running total, for the same reason.

Web Audio scheduling itself is not testable in Node; these functions are. Be honest about what the gate proves — it verifies conversion accuracy, not that the browser fires events on time.

---

## 6. Renderer (`guitar-render.js`)

**The two mirror functions live in `guitar-engine.js`, not here.** They are pure arithmetic with no DOM, and §9 step 2 gates them on a Node matrix test — which a browser-only file cannot satisfy. The renderer is their only consumer; the engine is their home. They are documented in this section because this is where they matter.

### 6.1 The mirrors — two transforms, nowhere else

**Tab convention puts the highest string on the top line.** String 1 (high E) is therefore index 0, not index 5. An earlier draft had `i = 6 - stringNo` with a comment claiming low E sat at the top; that renders every tab upside down while looking plausible.

Handedness also flips the **fret** axis, not only the string axis: a horizontal neck diagram for a left-handed player puts the nut on the right. One mirror is not enough.

```js
// stringNo 1..6, 1 = high E. Natural order is string 1 first (index 0).
// `spacing` is a trailing argument defaulting to 1, so a caller can work in
// raw indices or in pixels without a second function.
stringAxis(stringNo, reverse, spacing)
fretAxis(fret, reverse, span, spacing)
```

`reverse` is **not** "is the player left-handed" — it is "does this axis run backwards from its natural order", and which of those holds depends on the element as much as the hand. So callers use the element helpers and never pass the boolean themselves:

```js
tabStringY(stringNo, mirrorTab, spacing)
chordBoxStringX(stringNo, fb, spacing)
neckStringY(stringNo, fb, spacing)
neckFretX(fret, fb, span, spacing)
```

**The rule underneath all four:** mirroring for a left-handed player reflects the drawing about its *vertical* axis, so it flips whichever axis is horizontal in that element and leaves the other alone.

| Element | horizontal axis | flips with handedness | fixed |
|---|---|---|---|
| Tab | neither | nothing (opt-in `mirrorTab` only) | string 1 on the top line |
| Chord box (nut at top) | strings | strings | frets run down |
| Neck diagram (nut at left) | frets | frets | high E stays on top |

The chord box is the one that reads oddly: a right-handed chord chart puts the **low E leftmost**, which is the *reverse* of the natural string-1-first order, so `chordBoxStringX` passes `reverse: true` for a right-hander. An earlier draft asserted index 0 was both the top tab line and the rightmost chord-box string; those cannot both hold, and taking it literally mirrors every chord box for the default handedness.

**No other function in the codebase may compute a string or fret coordinate.** `check-guitar-handedness.js` enforces this by grepping for arithmetic on `.string` or `.fret` outside the two mirror functions in `guitar-engine.js`.

### 6.2 Tab opts out of the handedness toggle

Convention writes tab low-E-at-the-bottom regardless of handedness, and most left-handed players read standard tab unchanged. Tab therefore passes `mirror: false` unless the separate `profile.mirrorTab` opt-in is set — it is not an exception to the single-transform rule, it is a caller passing a different argument.

### 6.3 Elements

`tab` (two voices, independent stems, PIMA above, `T` for tapped, ties), `chordbox`, `fretboard` (with characteristic-note highlight), `rhythm` grid, `playalong`, `changes`, `ear`, `pointer`.

Wide elements must scroll inside their own `overflow-x: auto` container; the page body never scrolls horizontally.

### 6.4 Stylesheet discipline

`scripts/check-theme-tokens.js` reads **only `styles.css`** (`:33`). `guitar-styles.css` is therefore unchecked — define the complete light palette on `body[data-subject="guitar"]` and redeclare every changing token under `body.dark[data-subject="guitar"]`. Never alias a `:root` token that changes between themes.

---

## 7. Audio (`guitar-audio.js`)

### 7.1 Synth

Karplus–Strong: a noise-filled delay line of length `sampleRate / freq`, fed back through a one-pole lowpass with a decay factor.

**The delay length is almost never an integer**, and rounding it detunes the string — at E4 (329.6 Hz, 44.1 kHz) the delay is 133.8 samples, and rounding to 134 lands about 2.5 cents flat; higher pitches are worse. An ear-training course that teaches intervals on detuned reference tones is actively harmful, so this cannot be waved through.

Use a **fractional delay**: linear interpolation between the two samples straddling the true delay length, i.e. `y = (1-f)*buf[i] + f*buf[i+1]` where `f` is the fractional part. Cheap, and accurate to well under a cent.

Verification gate: render every pitch E2–E6, run each through an FFT or zero-crossing estimate, and assert the measured fundamental is within **1 cent** of equal temperament at A=440. This test belongs in `scripts/test-guitar-engine.js` and can run headless — generate the buffer with plain JS maths, no `AudioContext` required.

Pre-render one `AudioBuffer` per distinct pitch (E2–E6, ~44 pitches), cache, play via `AudioBufferSourceNode` → per-voice `GainNode`. Do **not** transpose one buffer with `playbackRate`: it shifts the decay character along with the pitch, so low notes ring wrong.

Reuse `ensureAudio()`'s pattern from `app.js:1437` (resume on suspended), but the guitar module owns its own context — do **not** share `app.js`'s `audioCtx`, which is gated on `Storage.data.settings.soundOn` for a different subject.

### 7.2 Scheduler

- 25 ms `setInterval` tick; schedule everything falling in the next 100 ms against `audioContext.currentTime`.
- **`setInterval` is throttled in background tabs** (to ~1 s or worse), which starves the lookahead and produces a gap or a stall. Practice is a foreground activity so this is tolerable, but handle it deliberately: listen for `visibilitychange` and, on hide, either widen the lookahead window to ~1.5 s or stop the transport and resume cleanly on show. Silent stalling is the failure to avoid.
- **Beat clock, not seconds.** Store `{bpm, changedAtContextTime, beatAtChange}`; convert on demand. Tempo changes mid-loop then cause no drift.
- **Loop wrap inside the lookahead window**: if the window crosses `loopEnd`, schedule the next iteration's opening in the same tick. Re-triggering at the boundary is what produces an audible gap.
- **Cursor follows audio.** `requestAnimationFrame` reads `currentTime`, converts to beats, draws. Never drive the cursor from the scheduler.
- Count-in = negative beats.

### 7.3 Drone / vamp / call

Drone: sustained pitch, low gain. Vamp: chord voicings on a beat grid. Call: play a generated phrase, then silence for the same number of bars.

The A/B switch swaps only the vamp; the metronome and transport keep running so the learner's hands never stop.

---

## 8. Checkers

### 8.1 `scripts/lib/prose-mannerisms.js` — extract first

`NEVER`, `SIGNPOST`, `SIGNPOST_CEILING_PER_1K`, `CADENCE`, `CADENCE_MAX_PER_CARD` are currently **pasted into three files**: `check-aat1-quality.js:540-611`, `check-aat2-quality.js:547-621`, `check-aat3-quality.js:488-562`. Extract to a shared module, have all three import it, verify `npm test` output is byte-identical before adding guitar's list. Adding a fourth copy is not acceptable.

Guitar's additional `NEVER`: `unlock the fretboard`, `next level`, `game-changer`, `secret weapon`, `at your fingertips`, `arsenal`, `toolkit`, `musical journey`, `dive in`, `let's explore`, `the world of`, `effortless`, `magical`, `sprinkle`, `spice up`, `haunting`, `ethereal`, `soaring`, `lush`.

Guitar-specific rules:
- **Minimisers**: hard fail on `just|simply|merely` before a verb in card prose. **`just` has legitimate uses in this domain** — *just intonation*, *just above the 12th fret*, *just behind the fret*. Match only the minimiser sense (`just`/`simply`/`merely` immediately followed by a verb) and allowlist `just intonation`, `just above`, `just below`, `just behind`, `just under`, `just past`. Test the pattern against those six strings before shipping it.
- **First person plural**: hard fail on `let's|we'll|we can|we will` — the course uses the imperative.
- **Hedged instruction**: `you might want to|you could try|feel free to`.

Method: write unit P1, measure, and hard-fail only what already sits at zero. Anything at low frequency becomes a rate ceiling. That is why the AAT lists cost nothing.

### 8.2 `check-guitar-quality.js`
- No prose-only cards — every card carries ≥1 interactive element
- Every lesson: ≥1 playable example; ≥1 claimed criterion or explicit `criteria: []`
- Prose **ceiling 600 words per card**. There is deliberately **no per-card floor** — the design target is a caption of roughly 40 words, and the worked example lesson is ~250 words across six cards. An earlier draft specified a 120-word floor per card, which would have forced padding and inverted the whole point of the format. A **per-lesson floor of 150 words** guards the opposite failure (a lesson that teaches nothing), and that is the only floor.
- Prose-to-element ratio ≤ ~80 words per element
- Every style lesson: ≥3 pointers, all five fields non-empty
- `instrument` is one of the four values; a lesson marked `'any'` contains no instrument-assuming phrasing (`your acoustic`, `on the electric`, `your amp`, `dial in`, `nylon`, `steel-string`)
- Every referenced exercise resolves in the engine
- Rut bank: valid family and level, `requires` points at real units, `bed` params resolve. **Count floor of ≥12 per family, counted only over prompts whose `requires` is satisfiable by the units that actually ship in the current phase.** A floor over the whole bank would pass while Phase 1 users see four prompts on a loop — the tuning and percussive families in particular have almost nothing unlocked before Phase 3.

### 8.3 `check-guitar-playability.js`
- No two simultaneous notes on the same string
- Fret span within reach for the position (≤5 below fret 12, ≤4 above)
- No `fret > 0 && fret < capo`
- No picking finger sounding two strings at once
- Tapped and fretted notes not colliding
- **Sweeps the generator's entire parameter space**, not just authored content

### 8.4 `check-guitar-handedness.js`
- Ban in lesson prose: `right hand`, `left hand`, `right-hand`, `left-hand`, `your right`, `your left`, `on the left`, `on the right`. Required vocabulary: **fretting hand** / **picking hand**.
- **One opt-out is required**, or the checker blocks correct content: the lesson covering left-handed instruments, restringing and playing a right-handed guitar upside down cannot be written without those words. Allow `handedProse: true` on a `Lesson`, and have the checker assert that **at most one lesson in the module sets it**. An unbounded opt-out is how this rule quietly stops applying.
- **`handed` is read only in `guitar-engine.js`.** Grepping for `.string`/`.fret` arithmetic was the rule in an earlier draft and it does not work: the axis functions take a plain number and touch neither property, while `soundingMidi`, `displayFret` and `noteFault` touch both and are entirely handedness-free. The checker would have failed the engine and never looked at the axes. Grep for `handed` instead — one file, no exceptions.
- Renderers call the **element helpers** (`tabStringY`, `chordBoxStringX`, `neckStringY`, `neckFretX`), never `stringAxis`/`fretAxis` directly. Passing the reversal boolean by hand is what inverted a chord box once already.
- No stored pixel positions in any data file.

### 8.5 `check-guitar-coverage.js`
Mirrors `check-aat1-coverage.js` (197 lines). Every LCM requirement in `guitar-syllabus.js` is claimed by some lesson; no lesson claims a requirement the spec does not contain. Enforced per-grade, starting with Grades 1–2.

---

## 9. Build order, with a gate at each step

Each step ends green on `npm test` before the next begins.

1. **`prose-mannerisms.js` extraction.** No behaviour change. *Gate: identical error and warning counts, and identical message text, from all three AAT quality checkers. Capture `npm test` output to a file before the change and diff it after — but compare the findings, not the whole stream, since notes carry counts that could legitimately reformat.*
2. **`guitar-engine.js` — fretboard model + note rep only.** `soundingMidi`, tuning table, capo validity, `stringAxis`/`fretAxis`. Plus `scripts/test-guitar-engine.js` covering the **tuning × capo × handedness matrix**: for each named tuning, capo 0/2/5/7, both handednesses — assert sounding pitch and drawn x for a fixed note set. *Gate: matrix green.*
3. **Timing maths + its unit tests.** *Gate: 1,000 scheduled beats within 2 ms of intent, computed offline.*
4. **Scales, positions, sequence patterns, generator.** *Gate: `check-guitar-playability.js` sweeps the whole space clean.*
5. **`guitar-audio.js`** — synth, then transport, then loop, then cursor. *Gate: manual — a scale plays evenly at 60 and 160 bpm, loops seamlessly, tempo changes mid-loop without drift.*
6. **`guitar-render.js`** — chordbox → fretboard → tab. *Gate: `check-guitar-handedness.js` green; visual check both themes, both handednesses, on a narrow viewport.*
7. **`guitar-ui.js` shell + registry entry + `sw.js` + `styles.css` + `index.html`.** *Gate: **the six-subject regression sweep** — open AAT L1, AAT L2, AAT L3, Français, LSF and Code de la Route in turn; each renders, keeps its theme, and its progress survives a reload. Then the service-worker update path: install the old version, use guitar offline, bump `CACHE_VERSION`, confirm guitar still works offline. Then `npm run check:csp` and `check:password` green.*

   This is the only step that can break subjects other than guitar, and nothing in `npm test` covers their rendering. The sweep is manual and it is not optional.
8. **Unit P1, complete, end to end.** Cards, exercises, checkers passing, mannerism guard tuned from measured output. *Gate: this is the honest cost signal for the remaining 25 units.*
9. **P2, P3, M5, M7, M8.**
10. **Session builder, rut breaker.**
11. **`progress-backup.js` mastery merge + `check-progress-backup.js` case.** *Gate: export → import → identical state; two-device merge preserves the newer cell.*
12. **README section, version bump, `sw.js` cache bump.**

---

## 10. Traps (all verified against the code)

1. **CSP hashes.** Four copies — `index.html` meta, `_headers`, `vercel.json`, `worker/index.js`. Only inline `<script>` is hashed. Adding a `<link>` is safe; touching the theme bootstrap breaks all four. `npm run check:csp` catches it.
2. **`run_worker_first`** in `wrangler.jsonc` is load-bearing — removing it silently unlocks the whole site.
3. **`.assetsignore`** decides what is public. `/docs`, `/scripts`, `/tools` are excluded; new top-level `guitar-*.js` files **are** served, which is correct.
4. **`check-theme-tokens.js` only reads `styles.css`.** `guitar-styles.css` gets no protection — dark-mode discipline is manual.
5. **`applyChrome()` runs on every render** and rewrites `header h1`, `.sub`, `.badge`. Do not have `guitar-ui.js` write to the header.
6. **Self-rendering subjects manage their own storage.** `Storage` in `app.js` is not used by `aat1`/`aat3` and must not be used by guitar. Follow `aat1-ui.js:36,67,76`.
7. **`assets` load order** is preserved only because `loadScript` sets `async = false` (`app.js:95`). Engine must precede ui.
8. **`sw.js` `CORE_ASSETS` is unconditional** — see §3.4. This is the one change that affects other subjects.
9. **Mastery merge** — §3.6. Field-wise max invents records.
10. **Do not share `app.js`'s `audioCtx`** — it is gated on another subject's `soundOn` setting.
11. **`fret` is absolute, never capo-relative** in data and in `soundingMidi`; the tab renderer subtracts the capo at draw time (§4.2). The capo'd open string is `fret === capo`, not `fret === 0`. Wrong here is invisible until a capo lesson.
12. **String numbering is fixed at 1 = high E** everywhere in data, and **string 1 draws on the top line** (`i = stringNo - 1`). The plausible-looking `6 - stringNo` renders every tab upside down.
13. **Karplus–Strong needs a fractional delay.** Integer-rounding the delay length detunes every reference pitch by up to several cents, which poisons ear training (§7.1).
14. **A loop shorter than the lookahead window schedules duplicate events.** At a 100 ms lookahead, any loop under ~100 ms (a one-beat loop above 600 bpm, or a sub-beat loop) wraps more than once per tick. Guard the wrap with a "have I already scheduled this iteration" check keyed on iteration index, not on beat position.
15. **Bumping `CACHE_VERSION` deletes every non-matching cache** (`sw.js:50-56`), including anything cached lazily. Guitar's lazy cache must be excluded from that sweep by name (§3.4).
16. **`activate()` runs on every subject switch** — anything it injects must be idempotent.

---

## 11. Questions — resolved

1. **Scope** → Phase 1, seven units (six as answered, plus M3 pulled forward by the §12 review). Phases 2–3 add content, not architecture.
2. **Branch** → reset `claude/guitar-course-feasibility-1z2slf` from `main` with `--force-with-lease`. Permission given. Its only commit is the feasibility doc already discarded, so nothing unmerged is lost. Verify `git log origin/<branch>` shows exactly that one commit before forcing.
3. **`sw.js`** → subject-aware precache. Shell and AAT in `CORE_ASSETS`; per-subject bundles cached lazily on first fetch by the existing stale-while-revalidate handler.
4. **`guitar-styles.css`** → lazy-inject from `activate()`, not a fourth eager `<link>`.
5. **Instrument** → neutral, with the `instrument` field per lesson (§4.5).
6. **Picking hand** → flesh (§4.5). Not a fork; the content assumes it.

### Still open

- **Where this plan lives.** Currently in the session scratchpad, which dies with the container. Commit to `docs/guitar-implementation-plan.md` if it should survive into a later session. Not done unilaterally, given the last doc was removed on request.

---

## 12. Adversarial review after every step — mandatory

**Rule: no step in §9 is complete until it has been adversarially reviewed and the findings recorded.** The gate in §9 proves the step works. This proves it does not break. Both are required; passing the gate is not permission to move on.

The distinction that matters: a normal review reads the code and asks "is this right?". An adversarial review states a **specific failure hypothesis first** — "this returns the wrong pitch at capo 7 in DADGAD" — and then tries to make it happen. If every hypothesis is disproved, the step is done. Reading the diff and feeling satisfied is not a review.

### Procedure

1. Run `/code-review` at **high** effort against the step's diff. The skill exists in this repo; use it rather than improvising.
2. Run the step-type checklist below, writing a failure hypothesis for each item before testing it.
3. Append every finding to `guitar-review-log.md` — one line per finding: step, hypothesis, outcome, action. **A finding that is deliberately not fixed still gets logged, with the reason.** Silent dismissal is how a known defect becomes a mystery three weeks later.
4. Fix, or log-with-reason. Then start the next step.

### Checklists

**Engine and pure logic (steps 2–4)**
- Boundaries: fret 0, fret 24, capo 0, capo 12, string 1, string 6, empty note list, single note, 10,000 notes
- Every named tuning through every public function, not just standard
- Off-by-one hunt on both indexing conventions — `6 - n` versus `n - 1` is the specific error already made once in this plan
- Does any function read state it should have been passed?
- Is anything accumulated in a loop that should be computed from an index?
- Does an invalid input return empty, or does it return plausible nonsense? Prefer the former loudly.

**Audio (step 5)**
- Tempo 40 and 240; tempo changed exactly on a loop boundary
- A loop shorter than the lookahead window (trap 14)
- Tab backgrounded mid-loop and returned to
- Pitch accuracy **measured** against equal temperament, not assumed (§7.1)
- Two voices starting on the same beat; a voice whose note is longer than the loop

**Renderer (step 6)**
- Both themes × both handedness values × `mirrorTab` on and off — eight combinations, check all eight
- Narrowest supported viewport; the longest realistic phrase; does it reflow or overflow the body?
- A two-voice tab where both voices land on the same beat
- Grep the diff for coordinate arithmetic outside the two mirror functions

**Integration (step 7)**
- The six-subject regression sweep, in full
- Service-worker update path: use guitar offline, bump the version, confirm it still works offline
- Export → import round trip; two-device merge with conflicting mastery cells
- `check:csp` and `check:password`

**Content (steps 8–10)**
- Read the mannerism guard's **misses**, not only its hits — a guard that finds nothing usually means a bad pattern, not clean prose
- Read one full lesson aloud: does any prose narrate what the widget already shows?
- Does every card have an action?
- Are the song pointers' mode attributions actually correct, checked against a source rather than recalled?
- Does the rut bank have ≥12 *unlockable* prompts per family at this phase (§8.2)?

### Why this rule exists

The adversarial pass over this plan, before a line of code was written, found eight defects that would have shipped: a capo convention that contradicted itself, tab rendered upside down, detuned ear-training reference pitches, a build-time sweep of 31.6 million cases presented as tractable, a prose floor that contradicted the format it was meant to protect, modes taught before the fretboard unit, a cache bump that silently wipes offline subjects, and a mirror that handled one axis of two.

Every one of those looked correct while being written. That is the expected hit rate, and it is why the review is a step rather than a habit.
