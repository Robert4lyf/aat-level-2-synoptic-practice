# Guitar module — adversarial review log

One line per finding, per the rule in `docs/guitar-implementation-plan.md` §12.
Findings deliberately **not** fixed are logged too, with the reason. Silent
dismissal is how a known defect becomes a mystery three weeks later.

---

## Step 0 — the plan itself (before any code)

| # | Hypothesis | Outcome | Action |
|---|---|---|---|
| 0.1 | The capo rule contradicts itself | **Confirmed.** §4.2 said `fret` is absolute *and* that `fret === 0` means the capo — the two incompatible conventions | Fixed: store absolute from the nut, capo'd open string is `fret === capo`, the tab renderer subtracts the capo at draw time |
| 0.2 | `stringX` renders tab upside down | **Confirmed.** `i = 6 - stringNo` put low E on the top line; tab convention is highest string on top | Fixed: `i = stringNo - 1` |
| 0.3 | Karplus–Strong reference pitches are detuned | **Confirmed.** `sampleRate / freq` is not an integer; rounding is ~2.5 cents flat at E4 and worse above. Poisons ear training | Fixed: fractional (interpolated) delay, plus a headless gate asserting every pitch within 1 cent |
| 0.4 | The build-time playability sweep is not feasible | **Confirmed.** The space is ~31.6M tuples, not "finite and enumerable" as claimed | Fixed: all-pairs coverage (~200–250 cases) plus exhaustive sweeps of the curated set and all tuning × capo × root |
| 0.5 | The prose floor contradicts the card format | **Confirmed.** A 120-word per-card floor would force padding into a format whose target is a ~40-word caption | Fixed: per-card ceiling kept, per-card floor removed, per-lesson floor of 150 substituted |
| 0.6 | Phase 1 teaches modes before the fretboard | **Confirmed.** M5/M7/M8 were in Phase 1 with M3 in Phase 2 | Fixed: M3 pulled into Phase 1; Phase 1 is seven units |
| 0.7 | A cache-version bump wipes lazily-cached subjects | **Confirmed.** `sw.js:50-56` deletes every non-current cache | Fixed: guitar's lazy files go in a separate unversioned cache excluded from the activate sweep by name |
| 0.8 | One mirror is not enough for handedness | **Confirmed.** The fret axis also flips for horizontal neck diagrams, and §6.2's "tab doesn't mirror" contradicted §6.1's single-transform rule | Fixed: two mirror functions, `mirror` passed as a parameter so tab can opt out without breaking the rule |

Smaller, same pass: float accumulation of beats (compute from an index), `setInterval`
throttling in background tabs, a loop shorter than the lookahead scheduling duplicates,
`just intonation` tripping the minimiser ban, no opt-out for the left-handed-setup lesson
that legitimately needs the words "left hand", and no regression gate covering the other
five subjects. All fixed in the plan.

---

## Step 1 — extract the prose-mannerism guard

Diff: `scripts/lib/prose-mannerisms.js` (new), `scripts/check-aat{1,2,3}-quality.js`.

**Gate: `npm test` byte-identical to the pre-change baseline.** Met, and re-met after
the fixes below.

| # | Hypothesis | Outcome | Action |
|---|---|---|---|
| 1.1 | The three copies differ, so merging changes behaviour | **Disproved.** Normalised diff shows they are identical apart from column alignment | — |
| 1.2 | Output is identical because the guard stopped running | **Disproved.** Injected `delve`, `landscape`, `that said` and a signpost frame into `aat1-learn-data.js`; all three vocabulary tells were caught and the signpost count moved 0 → 1. Data file restored | — |
| 1.3 | The cadence path is dead | **Disproved.** One occurrence is permitted by design (`CADENCE_MAX_PER_CARD = 1`); a stacked string returns 3 and fails | — |
| 1.4 | A reused global regex bleeds `lastIndex` between calls | **Disproved** for the shared lists; **confirmed** as a hazard for override lists — see 1.9 | — |
| 1.5 | Dangling references to the removed constants remain | **Disproved.** No `NEVER`/`CADENCE`/`SIGNPOST` identifiers survive; imported names are used in all three files | — |
| 1.6 | `require('./lib/…')` breaks when run from another cwd | **Disproved.** CommonJS resolves relative to the module file; verified by running from `/tmp` | — |
| 1.7 | A fourth copy survives elsewhere | **Disproved.** Exactly one copy of the patterns exists; `check-french-quality.js` never had one | — |
| 1.8 | `scripts/lib/` gets served publicly | **Disproved.** `.assetsignore:32` excludes `/scripts` and its contents | — |
| 1.9 | `extra` replaces the shared list instead of adding to it | **Confirmed.** `list \|\| NEVER` meant the planned `neverHits(text, GUITAR_NEVER)` would silently disable all 14 shared rules | Fixed: `NEVER.concat(extra \|\| [])` |
| 1.10 | A non-global override inflates `cadenceHits` | **Confirmed.** `.match()` without `/g` returns `[full, ...groups]`, so one match of a two-group pattern counted as 3 and would fail a clean card | Fixed: flags normalised to global inside the matcher |
| 1.11 | `signpostCount` mis-counts a non-global override | **Confirmed.** Returned 2 for text containing 3 occurrences, feeding nonsense to the rate ceiling | Fixed: same normalisation |
| 1.12 | A global override breaks `neverHits` | **Confirmed.** `.test()` with `/g` advances `lastIndex`, so repeat calls silently miss | Fixed: flags normalised to non-global — `neverHits` asks "does this appear", not "how often" |
| 1.13 | The comment justifying fresh-RegExp-per-call is inaccurate | **Confirmed.** It described a bleed that cannot occur with the shared lists and called the workaround deliberate | Fixed: comment now states which matcher needs which flag and why, and that it matters only for overrides |

Findings 1.9–1.13 are all in the optional-override API — latent today, and all of them
would have fired the moment `check-guitar-quality.js` passed its own list, which §8.1 of
the plan commits to doing. Worth recording that the extraction was *correct* and the
*new API around it* was where the defects were.

---

## Step 2 — the fretboard model and note representation

Diff: `guitar-engine.js` (new), `scripts/test-guitar-engine.js` (new), `package.json`,
`docs/guitar-implementation-plan.md`.

**Gate: the tuning × capo × handedness matrix.** 1,243 assertions green.

### Caught before writing code

| # | Hypothesis | Outcome | Action |
|---|---|---|---|
| 2.1 | The plan contradicts itself about where the mirrors live | **Confirmed.** §9 step 2 put `stringX` in the engine and gated it on a Node test; §6.1/§8.4/§2 put it in `guitar-render.js`, declared browser-only. A browser-only file cannot be matrix-tested in Node | Fixed: the axes are pure arithmetic and live in `guitar-engine.js`; the renderer consumes them |
| 2.2 | `openD` and `DADF#AD` are the same tuning listed twice | **Confirmed.** Identical note for note. `cellKey` carries `tuningId`, so two ids would split one exercise's progress across two half-learnt mastery cells | Fixed: one canonical id, `DADF#AD` is an alias resolved before storage, and the test asserts no two tunings share a pitch set |

### Caught by the review of the code

| # | Hypothesis | Outcome | Action |
|---|---|---|---|
| 2.3 | A prototype-chain key passes as a tuning id | **Confirmed, and it crashes.** `TUNINGS['constructor']` is truthy through the prototype, so `makeFretboard({tuning:'constructor'})` stored it and the next `soundingMidi` threw on `.slice()` | Fixed with `hasOwnProperty` guards and a type check; five prototype keys are now asserted |
| 2.4 | The axis contract is self-contradictory | **Confirmed.** The comment claimed index 0 was both the top tab line and the rightmost chord-box string. A right-handed chord chart puts the **low E leftmost**, so with `mirror:false` every right-handed chord box would have drawn mirrored | Fixed: `mirror` renamed `reverse`, and four element helpers (`tabStringY`, `chordBoxStringX`, `neckStringY`, `neckFretX`) own the per-element conventions so no caller passes the boolean by hand |
| 2.5 | The test banner overclaims its coverage | **Confirmed.** It advertised capo {0,2,5,7} × both handednesses, but the handedness sweep ran capo {0,5} and asserted no drawn coordinate at all — which is precisely what the step-2 gate calls for | Fixed: full four-capo sweep, plus a coordinate permutation check for all three elements across the matrix |
| 2.6 | `behindCapo.every(...)` passes on an empty array | **Confirmed.** A regression zeroing `positionsForMidi` under a capo would have stayed green | Fixed: length assertion added first |
| 2.7 | The handedness checker rule is unenforceable as written | **Confirmed.** It exempted `stringAxis`/`fretAxis`, which touch neither `.string` nor `.fret` as properties, while `soundingMidi`, `displayFret` and `noteFault` touch both and are handedness-free. The checker would have failed the engine and never inspected the axes | Fixed: the rule is now "`handed` is read in exactly one file", which is the actual invariant and is greppable |
| 2.8 | The parameter-space arithmetic is stale | **Confirmed.** Still multiplied by 7 tunings after the list dropped to 6 | Fixed: ≈27.1M, and the exhaustive sub-sweep is 576 not 672 |
| 2.9 | §6.1's snippets do not match the shipped signatures | **Confirmed.** They showed `STRING_SPACING`/`FRET_SPACING` constants; the functions take a trailing `spacing` defaulting to 1 | Fixed, along with the per-element table |
| 2.10 | §4.2 still describes `tuning` as a MIDI array | **Confirmed.** The engine stores a named id; implementing the documented formula would have indexed into the string `'standard'` | Fixed |

### Found in my own test, before the reviewer saw it

| # | Hypothesis | Outcome | Action |
|---|---|---|---|
| 2.11 | The ascending-tuning assertion is vacuous | **Confirmed.** It excused four of six tunings by id (`\|\| id === 'CGCFCE' \|\| ...`), so it tested almost nothing — and all six are in fact strictly ascending | Fixed: asserted flatly, with a note to exempt one id and say why if a genuinely non-ascending tuning is ever added |

### Mutation testing — does the gate actually bite?

A test that passes first time proves nothing until it has been shown to fail. Nine
deliberate defects were introduced one at a time and the gate killed every one:

| Mutant | Result |
|---|---|
| `tuningIndex` inverted to `stringNo - 1` | 588 failures |
| `soundingMidi` adds the capo | 432 failures |
| `stringAxis` inverted to `6 - stringNo` | 17 failures |
| `fret 0` treated as the capo | 2 failures |
| `DADF#AD` split out as its own tuning | 4 failures |
| chord box not reversed for right-handed | 4 failures |
| neck string order flips with handedness | 2 failures |
| prototype guard removed | crash at module load (loud CI failure) |
| `positionsForMidi` ignores the capo | 1 failure |

Worth recording that findings 2.3–2.10 were all in code that passed 867 assertions
first time. The gate was real; the review found what the gate was not looking at.

---

## Step 3 — transport timing

Diff: `guitar-engine.js` (timing block), `scripts/test-guitar-engine.js`,
`docs/guitar-implementation-plan.md`.

**Gate: 10,000 events across four tempo changes, within 2 ms of an independent
reference.** 1,311 assertions green.

### Measured before writing, and it corrected the plan

| # | Hypothesis | Outcome | Action |
|---|---|---|---|
| 3.1 | Float accumulation of beats causes real drift, as §5.6 claimed | **Disproved.** Accumulating 1/3 a million times drifts 1.09e-6 beats — 1.6 microseconds at 40 bpm, against a 2 ms gate. Sixteenths accumulate exactly | Rule kept, reasoning replaced: accumulation is wrong because it is **path-dependent**, so a tempo change, loop wrap or seek corrupts everything after it by an unbounded amount. Precision was never the argument |

### Caught by the review

| # | Hypothesis | Outcome | Action |
|---|---|---|---|
| 3.2 | The headline gate is vacuous | **Confirmed, and this is the serious one.** It ran on a single-segment map and compared `transportTime` against `beat * 60 / bpm` — the same expression the function evaluates. Worst error was exactly 0; the assertion could not fail whatever the code did | Rewritten: four-segment map, expectations from `referenceTime()`, written independently (walks entries summing segment durations, where the engine looks up precomputed start times). Verified discriminating — a segment-lookup bug now fails it by 494 seconds, where the old version returned 0 |
| 3.3 | An uncompiled tempo map returns NaN silently | **Confirmed.** `transportTime` reads `.time` off each segment; a raw `[{beat,bpm}]` has none, so every event lands at NaN with no error and no sound. The plan advertised exactly that signature | Fixed: `asSegments()` normalises a raw map on the spot; the plan now documents both forms |
| 3.4 | A non-array tempo map is swallowed | **Confirmed.** `compileTempoMap({beat:0,bpm:90})` fell back to 120, so the piece plays a third too fast with nothing reporting a problem | Fixed: a bare object is accepted as a one-entry map; non-objects still fall back |
| 3.5 | A botched edit artifact survives in the test file | **Confirmed.** `/* ── Report ──/* ── Report ──` — a nested comment opener from my own insertion script | Fixed |

### Mutation testing

| Mutant | Result |
|---|---|
| `transportTime` ignores the segment start time | 10 failures |
| `loopIteration` always returns 0 | 3 failures |
| `loopWrap` drops the negative-offset correction | 1 failure |
| `compileTempoMap` does not sort | 2 failures |
| `beatAtTime` uses the wrong segment | round-trip off by 85 beats |
| earlier entry wins on duplicate beats | 1 failure |
| `transportTime` always uses segment 0 | **caught only by the rewritten gate** — the old one returned 0 |

### The pattern worth naming

Finding 3.2 is the same defect as 2.11 — an assertion that cannot fail — and I
wrote it again one step later, in the headline gate rather than a minor check.
Self-comparison is the specific trap: if the expectation restates the
implementation, the test measures nothing however many events it runs over.

**Standing rule from here on: every gate must be shown to fail.** A green suite
is not evidence until a deliberate defect has turned it red.

---

## Step 4 — scales, positions, sequences and the generator

Diff: `guitar-engine.js` (scales, positions, sequences, rhythms, generator),
`scripts/check-guitar-playability.js` (new), `package.json`, plan.

**Gate: the playability sweep.** 1,018 exercises — all-pairs across nine
dimensions, plus exhaustive tuning × capo × root, scale × position, and
sequence × direction × rhythm.

### Caught by the review

| # | Hypothesis | Outcome | Action |
|---|---|---|---|
| 4.1 | The box shapes are wrong | **Confirmed, and this is a real musical bug.** The window `[anchor, anchor+span]` used the string-6 degree as a lower bound, but a shape reaches *below* that anchor on the higher strings. Six of the ten pentatonic boxes came out with one note on some strings instead of two, and A minor pentatonic box 2 sat at frets 8–11 instead of 7–10 | Rewritten as a **climb**: take *n* tones on string 6 from the anchor up, then continue on each higher string from the pitch after the last taken. Correct by construction, and every box is now even across all six strings |
| 4.2 | The whole gate can go vacuous | **Confirmed.** Making `positionNotes` return `null` unconditionally turned all 1,087 cases into "legitimately impossible combinations" — the run reported the skips cheerfully and exited 0 | Fixed: a floor of 900 real inspections and a 5% ceiling on skips. The mutant now fails with "only 112 exercises were actually inspected" |
| 4.3 | `startIndex` is missing from the mastery key | **Confirmed.** Two exercises with genuinely different notes keyed identically, so one cell was credited for something never played | Fixed: `startIndex` reaches `meta` and the key. Verified by mutation — dropping it reproduces the collision |
| 4.4 | `ionian`/`aeolian` fragment the grid | **Confirmed.** Note-identical to `major`/`natMinor`, but `exerciseKey` carried the raw id — the same duplication the tuning aliases exist to prevent | Fixed: `SCALE_KEY_ALIASES` resolved in `exerciseKey` only, so the modes unit keeps its names while the grid keeps one cell |
| 4.5 | The reach limit is flat where the plan says it varies | **Confirmed**, and fixing it revealed a worse problem — see 4.6 | Position-dependent limits, ≤5 below fret 12 and ≤4 above |
| 4.6 | Whole-shape span is the wrong thing to measure | **Confirmed by the fix for 4.5**, which failed 193 perfectly ordinary shapes. A position *climbs* the neck by design, so max-fret minus min-fret says nothing about whether a hand can play it | Rewritten to measure what a hand actually constrains: span on any one string, and drift between consecutive strings. Observed worst cases are 4 and 5; limits sit just above, and the self-test proves they still fire |
| 4.7 | `startIndex` rotates degrees, as documented | **Disproved as documented.** It rotates the playing-order note list, which differs from scale degrees for every box but the first | Renamed from `startDegree` and documented for what it does |
| 4.8 | Box runs repeat a unison across string changes | **Confirmed.** Major box 0 sounded E4 twice — 66 such repeats across the box shapes for root A | Fixed by the climb's strictly-ascending guard |

### Caught in my own work, before the reviewer

| # | Hypothesis | Outcome | Action |
|---|---|---|---|
| 4.9 | The scale-membership rule is self-comparison | **Confirmed.** It called `isScaleTone` — the same function the generator uses to pick notes — so it would pass whatever that function did. Exactly the defect from 3.2 | Rewritten to recompute pitch classes from the raw tuning table and step list |

### Mutation testing

Every rule disabled in turn, and every mutant killed:

| Mutant | Result |
|---|---|
| scale filter accepts a chromatic neighbour | 25 errors |
| beats do not advance | 25 errors |
| box span widened past a hand | 25 errors |
| `exerciseKey` includes handedness | 25 errors |
| `positionNotes` returns null always | vacuity floor fires |
| rule 1 disabled (capo/bounds) | self-test fires |
| rule 2 disabled (two notes, one string) | self-test fires |
| rule 3 disabled (reach) | self-test fires |
| rule 4 disabled (beats backwards) | self-test fires |
| rule 5 disabled (off-scale) | self-test fires |

**One mutant initially survived**, and chasing it was the most valuable part of
the step. Removing the capo guard from `positionNotes` changed nothing, because
`boxAnchor` already starts at `max(0, capo)` — so that rule was real but
unreachable. Adding a self-test to fire it directly then exposed a second
problem: rule 2 could *also* be disabled with no effect, because rule 4 required
**strictly increasing** beats and was catching its cases first. That rule would
have rejected every chord, chord box and two-voice tab in the entire app.
Relaxed to non-decreasing, with a chord added to the self-test as a case that
must pass.

---

## Step 5 — Karplus–Strong string synthesis

Diff: `guitar-engine.js` (synthesis block), `scripts/test-guitar-engine.js`,
`docs/guitar-implementation-plan.md`.

**Gate: every pitch E2–E6 within 1 cent of equal temperament.** 1,382 assertions green.

### The instrument, twice over

| # | Hypothesis | Outcome | Action |
|---|---|---|---|
| 5.1 | The pitch estimator is accurate enough to trust | **Disproved, twice.** First an autocorrelation estimator with parabolic refinement reported the synth at 0.73 cents — an apparent pass with no margin. Measuring the *estimator* against pure sines showed **3.65 cents of error on its own**: the ruler was coarser than the thing it measured, so neither number meant anything | Replaced with phase-advance correlation against a reference oscillator, Hann-windowed. Validated at 0.0006 cents |
| 5.2 | The replacement estimator is unambiguous over the range that matters | **Disproved by the review, and this is the serious one.** Phase difference wraps into (-π, π], so the unambiguous range is ±sr/(2·gap). At the 0.8 s gap the gate used, that is **0.8 cents at E6 — narrower than the 1-cent tolerance it was policing.** A ten-cent regression at the top of the range measured as 0.18 cents and passed | Gap shortened to 0.02 s: ±32 cents of range, 0.0002 cents of precision. Both measured |
| 5.3 | The "prove the ruler" block proves the ruler the gate uses | **Disproved.** It validated a 0.6 s gap while the gate measured with 0.8 s, and fed only on-pitch tones — so it measured zero-offset bias and could never exercise the wrap | One shared config constant. Validation now reads back known detunings of ±1, 3, 10 and 20 cents at five octaves |

### Consequences of a broken ruler

| # | Hypothesis | Outcome | Action |
|---|---|---|---|
| 5.4 | An allpass fractional delay beats linear interpolation | **Disproved.** The textbook upgrade measured *worse* — 0.030 against 0.016 cents. Its group delay drifts near Nyquist, which is where the short delay lines of high notes live. I had "improved" the plan's original prescription on the strength of a reading from the broken instrument | Reverted to linear interpolation, with the finding written beside it so nobody repeats the upgrade |
| 5.5 | The figures quoted in the header are real | **Disproved.** Every number was taken with the aliased ruler. Integer rounding is not 3.8 cents out, it is **14.7 at C6 and 3.7 at E4** — the case for the fractional delay was understated fourfold | All figures re-derived and corrected in the engine header and the plan |
| 5.6 | The naive-rounding comparator proves the interpolation is load-bearing | **Partly.** It passed, but only via low notes — the aliasing hid that the true worst case is at the top | Now correct by construction, since the comparator uses the fixed ruler |

### Smaller

| # | Hypothesis | Outcome | Action |
|---|---|---|---|
| 5.7 | The 44,100 sample-rate default is safe | **Confirmed as a trap.** A browser caller on a 48 kHz `AudioContext` omitting `sampleRate` would play ~147 cents sharp. No consumer exists yet | Documented, and a test now renders and measures at 48 kHz so the wiring in `guitar-audio.js` has something to lean on |
| 5.8 | Fixed decay is acceptable | **Confirmed as wrong.** The loop turns over once per period, so a fixed gain makes the top of the range decay in a fifth of the time — top E "plinks" while the low E rings | Loop gain derived from a target T60. Asserted: 1.8× energy spread across the range, against a fixed gain's astronomically lopsided ratio |
| 5.9 | A duplicated comment artifact survives | **Confirmed**, from my own insertion script — the same slip as 3.5 | Fixed. Third occurrence; the insertion pattern that causes it is the one that appends the anchor and then re-inserts before it |

### The pattern, now three steps running

Findings 2.11, 3.2 and 5.2 are one defect wearing three costumes: **a gate that
cannot fail in the way it claims to.** A vacuous assertion, a self-comparison,
and now an aliased ruler. Mutation testing catches the first two. It does *not*
catch the third — a deliberately detuned synth would have been measured by the
same aliased estimator and looked fine.

**Rule added to §12: validate the measuring instrument, in the configuration the
gate actually uses, against inputs that are deliberately wrong.** "Show the gate
can fail" is necessary and, on its own, not sufficient.

---

## Step 6 — the renderer and the handedness checker

Diff: `guitar-render.js` (new), `guitar-styles.css` (new),
`scripts/check-guitar-handedness.js` (new), `guitar-engine.js` (tabMirror),
`package.json`, `docs/guitar-implementation-plan.md`.

**Gate: the handedness checker green, plus a visual check across eight
combinations.** The structural half is in CI; the visual half is not, and cannot be.

### Caught before writing code

| # | Hypothesis | Outcome | Action |
|---|---|---|---|
| 6.1 | The renderer must be browser-only, so step 6's gate can only be visual | **Disproved.** `aat1-ui.js` builds markup as strings; doing the same makes the renderer UMD and Node-testable, which turns most of the gate into assertions | Renderer emits SVG strings; the checker asserts structure and geometry |
| 6.2 | Two-voice tab needs stems and is therefore a large job | **Disproved for tablature.** Notes sharing a beat on different strings occupy one column, which *is* polyphonic tab. Stems are staff-notation flourish | Polyphony ships free; engraving deferred to the tapping module |
| 6.3 | The renderer can decide tab's mirror itself | **Confirmed as a violation.** `tab()` read `fb.handed` directly, breaking the one-file rule the checker was being written to enforce | `tabMirror(fb, mirrorTab)` moved into the engine |

### Caught by mutation testing the checker

| # | Hypothesis | Outcome | Action |
|---|---|---|---|
| 6.4 | Sorting coordinates before comparing is harmless | **Confirmed as vacuous, and this is the third time.** Mirroring permutes which note sits at which coordinate without changing the *set*, so sorting destroyed the signal — a mutation flipping the neck's string order with handedness passed cleanly | Compare in emission order; `sameSeq` replaces every sorted `.join()` |
| 6.5 | Comparing the two handednesses to each other is sufficient | **Confirmed insufficient.** Inverting the chord box for *both* hands kept them perfect mirrors and passed. Relative checks say nothing when both sides are wrong together | Absolute anchors added: chord box low-E-leftmost, neck and tab high-E-on-top, nut side per hand |

### Caught by the review

| # | Hypothesis | Outcome | Action |
|---|---|---|---|
| 6.6 | The chord-box window fits any shape | **Confirmed broken.** The window came from the lowest fretted note alone, so a shape at frets 4–6 drew a nut that is not there and silently dropped two dots — rendering as a different, plausible chord | Window fits lowest *and* highest; rows grow to suit |
| 6.7 | The neck diagram shows every note given to it | **Confirmed broken.** A fixed 12-fret window discarded everything above it: an 18-note position reaching fret 17 rendered four dots and said nothing | The diagram grows to fit the notes |
| 6.8 | An unstyled class is merely unstyled | **Confirmed false, and it would have made tab unreadable.** `gtr-tab-clear` masks the stave line behind a digit and carries no fill, so with no CSS the browser defaults to opaque black and paints over the number | `guitar-styles.css` ships with the renderer, and a new rule asserts every emitted class has a rule and every token a dark value. It found four unstyled classes on its first run |
| 6.9 | The prose ban works | **Confirmed vacuous.** It iterated the top-level path as if entries were lessons, but the house shape is path → unit.lessons → cards, so `l.cards` was undefined everywhere while it printed a confident count | Walks both shapes; finding zero cards is now an error, not a pass |
| 6.10 | Scanning `card.p` covers the prose | **Confirmed insufficient.** Headings, callouts, tables, splits, worked examples and pointers all carry text; "your left hand" in a heading was invisible | `cardText()` gathers every text-bearing field |
| 6.11 | A note without a beat is harmless | **Confirmed.** It made `totalBeats` NaN and emitted `viewBox="0 0 NaN 95"` — the figure does not render at all, silently | Missing beat treated as 0 |
| 6.12 | The base-fret label is fine beside the box | **Confirmed broken.** At `text-anchor="end"` it ran outside the viewBox and clipped "12" to "2" — a *wrong* position marker rather than a missing one | Moved inside, centred |
| 6.13 | Escaping the chord name is harmless | **Confirmed.** `svgWrap` escapes the title again, so `A&B` reached the aria-label as `A&amp;amp;B` while the visible name was correct — the two paths disagreed | Raw name passed; escaping happens once |
| 6.14 | The neck's fret axis is pinned like the string axes | **Confirmed missing.** Inverting `neckFretX` for both hands passed the checker; only the engine unit test caught it | Absolute nut-side assertion added for both hands |

### The pattern, now three steps running

Findings 2.11, 3.2 and 6.4 are the same defect: an assertion that cannot fail.
Each time the cause was **normalising before comparing** — excusing inputs by id,
restating the implementation as the expectation, sorting away the association
being tested. 6.5 is its close relative: comparing two things to each other with
neither anchored to reality.

Added to the §12 checklist as a standing question: *does this assertion compare
against something independent of the code under test, and is anything being
sorted, filtered or excused before the comparison?*

### What the gate does not cover

The visual half. Nothing in CI can say whether a chord box is legible at 130px,
whether the dark palette is comfortable, or whether the tab digits are the right
size. A page covering eight combinations was generated and handed over for that.

### Step 6, second pass — feedback on the visual check

The half of the gate that CI cannot cover did its job: three things came back
that no checker had flagged, and one of them was wrong output in a delivered
artefact.

| # | Finding | Outcome | Action |
|---|---|---|---|
| 6.15 | Tab mirroring is wanted | **Disproved by the only person who will use it.** It was designed in as an opt-in for left-handed readers | Removed entirely — engine, renderer, checker, tests and plan. `tabStringY` no longer takes a mirror argument, so tab cannot be flipped by accident or on purpose. A switch nobody will touch is worse than no switch |
| 6.16 | Notes never collide with bar lines | **Confirmed broken.** `x = padX + beat × beatGap` and bar lines at multiples of `beatsPerBar`, so every downbeat was drawn exactly on top of its own bar line. Worst with quarter notes, where every note is a downbeat | Each bar is offset by `barPad`; lines and notes now derive from the same `barWidth` so they cannot drift apart. Verified: zero notes within 4px of a line |
| 6.17 | The DADGAD panel shows DADGAD | **Confirmed false, and it was in a file I sent.** The check page generated the notes once for standard tuning and drew them on a DADGAD neck. A standard-tuning A dorian box reads `G2 A2 A#2 D3…` in DADGAD — a confident, entirely wrong diagram | Page fixed, and the API hazard behind it closed |

**6.17 is the one worth dwelling on.** The page was wrong, but the reason it
could be wrong is that `generateExercise` returned notes without the fretboard
they were computed for, leaving every caller to build a second one and get it
right by hand. Notes are string-and-fret positions, so the mismatch is silent
and total.

`generateExercise` now returns `fb`. A caller has no reason to construct a
second fretboard, and the visual-check protocol in §12 says every panel must
generate its notes for the board it is drawn on.

No checker caught this, and none realistically could — the notes were valid, the
diagram was well-formed, every structural assertion passed. It took someone who
knows what A dorian sounds like in DADGAD looking at the picture. Worth
recording as the clearest example so far of what the visual half of a gate is
actually for.

### Step 6, third pass — the same class of bug, twice

| # | Finding | Outcome | Action |
|---|---|---|---|
| 6.18 | Note groups straddling bar lines is a rendering fault | **Disproved — it was the exercise.** A dorian box 1 is uniformly *three notes per string*; the check page asked for eighths, so eight notes per bar cut every group of three in half. A three-per-string run is played in **triplets**, one string to a beat, which is the only subdivision where the finger grouping and the beat agree | `naturalRhythm(notes)` added: an unspecified rhythm now follows the grouping (2/string → eighths, 3 → triplets, 4 → sixteenths, 6 → sextuplets) rather than defaulting to a fixed eighth note. An explicit rhythm is still honoured, including a deliberately awkward one |
| 6.19 | The DADGAD chord boxes were fixed last pass | **Confirmed false.** I fixed the scale notes and left the chord shapes hardcoded in the same file. `C`, `Bm` and `D (12th)` are standard-tuning fingerings; on a DADGAD neck they are not those chords, and the label says they are | Two fixes, because one was not enough last time |

**6.19 is the same defect as 6.17, one pass later, in the same file.** I fixed the
instance rather than the class, and it took a second report to see it. The class
is: *tuning-specific data must not be written down by hand next to a variable
tuning.*

So it is closed twice over:

- **`findVoicing(chordId, rootPc, fb)`** searches the fretboard for a playable
  shape instead of anyone writing one out. Verified against fingerings that can
  be named: standard C comes back `x32010`, A7 `x02020`, and DADGAD's D sus4
  comes back all-open, which is the chord that tuning exists for. Shapes carry
  the tuning they were found on.
- **`chordBox` marks a mismatch loudly.** A shape declaring a tuning that
  disagrees with the fretboard is drawn with a warning glyph and an aria-label
  saying which is which, rather than a confidently mislabelled chord.

The check page now hardcodes no shape at all, and prints the sounding notes
beneath every chord box so the claim is checkable rather than trusted.

**What this says about the visual gate.** Three real defects have now come out of
looking at the pictures — none of them detectable by any checker, because in
every case the output was structurally perfect and musically wrong. Two of them
were mine twice over: I treated a symptom, shipped it, and needed telling again.

### Step 6, fourth pass — the mask ate its neighbour

| # | Finding | Outcome | Action |
|---|---|---|---|
| 6.20 | Fret numbers of any width fit the spacing | **Confirmed false.** Each digit is masked from the stave line by a centred rect. A two-digit mask reaches ~8px in *both* directions, while triplet spacing is 8.7px — so it covered most of the neighbouring digit and "7 9 10" rendered as "7 ε 10": a missing note that still looks like notation | Spacing now clears the **sum of two adjacent half-widths**, not one. `beatGap` grows until the finest subdivision present satisfies it |

Two details worth keeping:

- **`digitHalf()` is used both to draw the mask and to space the notes**, so the
  two cannot disagree. The original bug was possible because one number sized
  the rect and a different, unrelated constant set the spacing.
- **x stays linear in beat.** Proportional-by-content layout is what an engraver
  would do, but the playback cursor converts a beat to an x position, and a
  non-linear layout would need that same map threaded through it. Widening the
  whole figure keeps one arithmetic.

Asserted permanently across every rhythm × three positions, and the assertion was
shown to fail: with the spacing requirement removed it reports 30 masked digits
at eighths and 6 at triplets.

**Four passes, four real defects, none of them findable by a checker before the
fact.** Every one produced structurally valid output — well-formed SVG, correct
note data, all assertions green — that was wrong in a way only a guitarist
looking at it would catch. The checkers now cover all four *after* the fact,
which is the most that could be expected of them.

## Step 7 — guitar-audio.js, and wiring the subject into the app

Nine findings. Four were fixed on the spot; the five below are the ones worth
writing down, and the first is the most serious thing found in the project so
far because it is about the reporting rather than the code.

### 7.1 CI has never run a single guitar check

| # | Finding | Outcome | Action |
|---|---|---|---|
| 7.1 | Steps 2–6 were reported as "CI green" | **Confirmed, and the reporting was wrong.** `.github/workflows/ci.yml` lists its checks individually and stopped at `check:french-quality`. It never ran `npm test`. Every guitar gate written across five steps — 1382 engine assertions, the playability sweep, the handedness rules — ran locally and nowhere else | Every check now has its own step, and a gate keeps it that way |

The gates were real and I did run them. What was wrong is that "CI is green"
implied a coverage that did not exist: the workflow was checking the pre-guitar
subjects and reporting success for the whole commit.

The fix is not just adding the missing steps, because they went missing for a
structural reason. Listing steps individually is worth doing — a red build names
the check that broke instead of burying it inside one long `npm test` — but it
makes the workflow and package.json two copies of one list, and copies drift.

`scripts/check-workflow-coverage.js` now reads both and fails when they disagree,
in all three directions:

- a check in `npm test` with no step in CI (the defect that happened),
- a CI step naming a script package.json does not define (a typo that fails the
  build for the wrong reason and reads as a real failure),
- a gate file sitting in `scripts/` that was never wired into `npm test` at all —
  written, committed, never run.

Shown to fail on each: deleting the playability step, misspelling a script name,
and dropping an unwired file into `scripts/`.

A second half to the same finding: `check:subjects` skips itself when Playwright
is missing, so a failed browser install in CI would report green while asserting
nothing. CI now sets `REQUIRE_PLAYWRIGHT`, under which a missing browser is a
build failure. Locally it still skips, so the suite runs for someone who has not
installed it.

### 7.2 Thirteen shell classes, no CSS

| # | Finding | Outcome | Action |
|---|---|---|---|
| 7.2 | The UI was styled | **Confirmed false.** `guitar-styles.css` covered the twenty-nine classes the *renderer* emits and none of the thirteen the *UI* emits. Every panel, control row, transport button and fault message took browser defaults | Shell styles written; rule 3b in the handedness checker extended to `guitar-ui.js` |

The figure rules were written in the step that built the renderer and the shell
markup in the step that built the UI, and the second step never came back for its
CSS. Nothing noticed, because it rendered: the sweep asks whether a subject
renders, not whether it is legible.

Extending rule 3b exposed a weakness in the rule itself. It tested
`css.includes('.' + name)`, which a class mentioned only as an *ancestor* —
`.gtr-transport input` — passes while the element itself is unstyled. Deleting
the `.gtr-transport` rule and watching the gate stay green is how that was found.
It now checks selector position: the class must be the rightmost compound of at
least one selector, which is what "a rule applies to this element" means.

### 7.3 The lazy cache survived the sweep but was never refreshed

| # | Finding | Outcome | Action |
|---|---|---|---|
| 7.3 | Excluding the lazy cache from the activate sweep was the whole fix | **Confirmed false — it solved half and created the other half.** The versioned cache is rebuilt from the network on every install; the lazy cache is untouched and serves cache-first. So the first guitar session after an update runs the old engine, renderer and stylesheet against the new `app.js` | `refreshLazyCache()` re-fetches whatever is in there during activate |

One load with a mismatched pair is the class of bug that versioning caches exists
to prevent. Refreshing rather than deleting is what keeps the offline promise:
the re-fetch deliberately swallows a network failure, because a stale file still
beats an empty cache for someone offline.

**The assertion I wrote for this was vacuous, and that is the second time.** It
checked that the cached bodies equalled what the mock's `fetch` returns — but the
files had been fetched through that same mock when they were first cached, so the
bodies already matched and the assertion could not fail. It passed with the
refresh call deleted. The two workers' networks now return differently-tagged
bodies, and the gate fails three ways: refresh removed, refresh response
discarded, and cache deleted instead of refreshed.

The standing rule from step 3 is holding up: *every gate must be shown to fail.*
Both times the vacuity was invisible on inspection and obvious on mutation.

### 7.4 A stylesheet is not loaded because its `<link>` exists

| # | Finding | Outcome | Action |
|---|---|---|---|
| 7.4 | `loadStyles` was idempotent | **Confirmed false.** It returned early when `document.getElementById(id)` found the `<link>`. That element is appended synchronously while the file is still in flight, so from the next line on the test says "loaded" about a stylesheet that has not arrived | Memoised the promise, the way `loadScript` already did |

A subject switch inside that window resolves instantly and mounts against no CSS,
which for guitar means the mask behind every tab digit paints solid black over
the number it exists to reveal. The renderer carries no colour by design, so
unstyled is not plainer — it is unreadable.

Two gates, because one could not reach it:

- **`check:subjects` now serves the stylesheet 200ms late** and samples the
  computed style at the instant the first panel enters the document, via a
  MutationObserver installed before first paint. Reading it after the page
  settles answers an easier question — by then a delayed stylesheet has arrived
  anyway, and the check passes whether or not `mount()` waited. That version was
  written first and passed with the `await` removed.
- **`check:subject-assets` runs the real function text against a stub DOM.**
  Reaching the re-entrant call through the UI would mean opening the subject
  picker, clicking away and clicking back inside a 200ms window; a
  timing-dependent click sequence is a flaky gate, and a flaky gate is one people
  learn to re-run.

That second gate found a defect while being written. Under one mutation the
process exited silently with status 0 — a promise never settled, so nothing was
ever reported, and no output plus a zero exit code reads exactly like a pass. It
now has a deadline, and reports whatever state it is in when the deadline fires.

### 7.5 `node_modules` was untracked but not ignored

19MB of Playwright, one `git add -A` away from the repository. Added to
`.gitignore`.

### What step 7 says

Steps 2 through 6 each ended with a gate shown to fail, and every one of those
gates was correct. What none of them established is that anything ran them. The
adversarial review has been good at finding defects inside the thing being
built and slow to ask whether the machinery around it is connected — the CI gap,
the unstyled shell and the unrefreshed cache are all failures of a seam rather
than of a component.

The visual half stays with the user. Nothing here can tell you whether a
Karplus–Strong pluck is something you want to play along to for ninety seconds.

## Step 7b — the first report from playing it

Both of these came back from the preview build, from the only test that matters
at this point: someone picking up a guitar and using it. Neither was reachable
from any gate written so far, and one of them had a gate written around it
afterwards precisely because it is not the kind of thing anyone catches twice.

### 7b.1 Chords were too fast and too hard

Scales were fine — same buffers, same synthesis. What was wrong was everything
between the buffer and the speaker.

- **Too fast.** The strum spread was 22 ms, which puts a six-string chord inside
  132 ms. That is a strum. This is a fingerstyle course, and a thumb rolling
  across six strings takes longer. Now 45 ms, and each successive string is
  fractionally quieter, because a roll at an even level lands all its weight on
  the trebles.
- **Too much attack.** Six copies of the same Karplus–Strong transient stacked
  inside a tenth of a second read as a hit rather than a chord, and the
  excitation brightness that gives a single line its definition just accumulates.

Fixed by shaping in the graph rather than rendering a second timbre: an 18 ms
attack ramp and a 2.4 kHz lowpass on chords only. A second buffer set at this
quality is ~20 MB of `Float32Array` — real weight on a phone, for a difference a
filter and a fade already make.

The review of the fix caught two things in the fix:

- **The damping stage read its target level back off `g.gain.value`,** which the
  new attack ramp leaves sitting at its 0.0001 starting floor. Every damped note
  would have faded out from silence — which is to say, been cut dead. This is the
  same shape as the step 6 mask bug: the change was right, and it silently broke
  the thing standing next to it.
- **The pluck voice was given a 2 ms attack** on the grounds that it is too short
  to hear. The scales had just been reported as fine. A change nobody asked for,
  defended by a claim that it makes no difference, is a change that should not be
  made — so the pluck voice is now all-zero and takes the identical branches the
  old code took unconditionally.

Whether 45 ms and 2.4 kHz are *right* is not something anything here can answer.
Both are one-line constants at the top of `guitar-audio.js`, named and commented,
because they will be adjusted by ear.

### 7b.2 The tempo slider could not be aimed

120 px of slider across 160 bpm is 1.3 bpm per pixel, so choosing 96 rather than
95 was luck. It now has its own row: a typable number field, −1 and +1 buttons,
and a full-width slider. All three write through one function.

Three defects found reviewing it, two of them in the gate rather than the code:

- **The first version of the keystroke assertion was vacuous.** It typed "120"
  and checked the field still read "120" — but the field is deliberately excluded
  from write-back, so it reads "120" whether or not the bug is present. The
  mutation survived. What actually lurches when each digit is applied as it lands
  is everything *downstream*: the slider jumps to 30 and back, storage records the
  half-typed number, and a playing transport audibly drops to a crawl. The gate
  now watches the slider. This is the third vacuous assertion in seven steps, and
  all three shared a shape — asserting on the thing being manipulated rather than
  on the thing that would move if the code were wrong.
- **The blank field dropped the tempo to 30.** `Number('')` is 0, which clamps to
  the floor, so clearing the box to retype it set the tempo to the minimum the
  moment focus left. The comment above the function claimed it "snaps back to the
  live tempo". It did not. Found by reading the comment against the code rather
  than by any test — the comment was written describing what the code should do,
  and then not checked against what it did.
- **The class-coverage gate passes a class with only a `:hover` rule.** It asks
  whether the class appears anywhere in the stylesheet, so renaming a base rule
  while leaving its `:hover` intact is not caught. Recorded rather than fixed:
  it catches a class with no rules at all, which is the failure that actually
  happens, and tightening it to require a base rule would reject the several
  classes that legitimately only modify.

### What step 7b says

Step 7 closed by saying the visual and audible half stays with the user. It did,
and it returned two defects within a day — both of which produced output that was
structurally correct and wrong to use. That is now the established pattern across
steps 6 and 7: the gates hold the structure, and the ear and the eye find what
the structure cannot express.

The new gate does not fix that. It stops these two specific behaviours from
regressing silently; it cannot tell anyone whether 45 ms is the right roll.

## Step 7c — the second report from playing it

Three more from the preview build, one of which is a defect the gate written in
7b should arguably have caught and did not.

### 7c.1 The tempo overflowed its box

`width: 4.4ch` on the number field, under a site-wide `box-sizing: border-box`,
so the padding and border were taken out of that 4.4ch before any digits saw it:
about 35px, less 12px of padding and 2px of border, leaving 21px of content box
for a three-digit tempo needing roughly 24. Any tempo of 100 or more read past
its own field.

Worth noting where the 7b gate stood on this. It typed 120, stepped to 121,
dragged to 76, committed 999 and checked all of it read back correctly — and
every one of those assertions passed while the field was visibly clipping,
because an overflowing input still renders and still reports the right value.
The gate tested the control's *behaviour* and never asked whether it could be
read. It now measures `scrollWidth` against `clientWidth` across 30–240 bpm,
which is the browser's own answer to "does this fit", and that assertion fails
on four of the six tempos under the old width.

The fix was also checked by taking a screenshot at phone width and looking at
it, which is what should have happened before it was shipped the first time.

### 7c.2 Chords, again: slower and brighter

45 ms was still too quick — now 75 ms, putting the roll across about four tenths
of a second, slow enough to hear the individual strings inside it. The lowpass
moves from 2.4 kHz to 3.2 kHz, roughly half an octave up.

Both remain ear-set constants. Neither is defensible from first principles and
neither should pretend to be: the comment in `guitar-audio.js` says so, so that
whoever changes it next does not go looking for the reasoning that justifies
75 ms over 70.

### What step 7c says

7b closed by saying the gates hold the structure while the ear and the eye find
what the structure cannot express. 7c sharpens that: the *visual* half of it can
be gated after all, and cheaply. A clipped field, an overlapping label, a control
running past its container are all measurable in a browser that is already
running. What is not measurable is whether 75 ms is a better roll than 45 —
that stays with the person holding the guitar.

The standing lesson, restated: when a report comes back from real use, gate the
class of defect, not the instance. 7b gated the tempo control's behaviour because
behaviour was what had been rebuilt. Legibility was never asked about, so it was
never checked, and it was the next thing to break.

## Step 7d — "changing tuning doesn't change the chord shapes"

Reported for the third time in this project, and the first time against code
that was right.

### 7d.1 What was actually happening

The engine was correct. Verified two ways before touching anything: 4,608
voicings sounded across every tuning, chord type, root, capo and hand, all
pitch-correct; and a real browser driven through the tuning selector, showing
DADGAD, Open D, Open G and CGCFCE all producing shapes that differ from standard
in every one of the 48 root/chord combinations.

Drop D is the exception, and it is not a bug. Drop D alters one string, the
sixth. At the default root of A, none of the four displayed voicings — A, Am,
A7, Asus4 — use the sixth string, so all four shapes are legitimately identical
to standard. Switching to Drop D changed nothing on screen, and the panel gave
no way to tell that correct answer apart from a stale one.

Which is the real defect. A chord shape is a set of (string, fret) pairs and
carries no evidence about which tuning produced it, so a right one and a wrong
one look exactly alike. The panel is headed "Chords in this tuning" and offered
nothing to back the claim up.

Two changes, both about showing the work:

- **Every box now carries the notes it sounds** in the current tuning, low
  string first. An A major reading `A E A C# E` is self-evidently right in
  whatever tuning produced it; the standard-tuning shape dropped into DADGAD
  would read as something else entirely. This is also the display that would
  have made the original step-6 bug obvious on sight.
- **A tuning that changes nothing says so.** In Drop D the panel now explains
  that these voicings do not use the strings Drop D alters, and suggests another
  root or the scale panel below.

### 7d.2 The gate that should have existed since step 6

`check:guitar-voicings` sounds every voicing the app can display on its own
fretboard and compares the pitch classes against the chord definition. Under a
mutation that makes `findVoicing` ignore the tuning — the original step-6 bug,
reintroduced exactly — 3,496 of 4,608 voicings fail, with the reason stated:
`D (maj) in dropD: 6f10 5f9 4f7 3f7 2f7 1f10 — sounds C which is not in the
chord`.

Step 6 fixed this defect twice: once for the instance reported, once for the
class. Neither fix came with an assertion that the class stays fixed. It does
now.

### 7d.3 And a collision found by looking at the screenshot

Taking a screenshot to confirm the pitch labels showed the chord name running
into the open-string markers on A7 and Asus4. `padTop` at 26 left the name on a
baseline of 9 and the markers on 14 — an 11px name over 9px markers, so the
glyphs overlapped.

This is the step-6 tab mask bug again in a different place: two elements
positioned independently from arithmetic that assumed they would not meet. Both
rows now come from named baselines, and the gate measures `getBBox` overlap
between name and markers across every chord shown, catching both collisions.

### What step 7d says

The report was wrong about the cause and completely right that something was
broken. Chasing only the literal claim — "shapes don't change" — would have
ended at "works as intended", which is the worst possible outcome: the user is
told they are mistaken and the actual defect survives.

Two habits earned their place this round. Reproducing before fixing, which is
what separated the correct engine from the miscommunicating panel. And
screenshotting the fix, which found a defect that had nothing to do with the
report and had been shipped since step 6.

## Step 7e — the playback cursor

Step 7 deferred this with a note saying an earlier draft had run a
requestAnimationFrame loop writing an attribute nothing read, and that the
cursor should land when there was a figure that owned a marker to move. There
now is one, so it landed.

### 7e.1 What it does

Every drawn note is wrapped in `<g class="gtr-note" data-i="N">` in both the
neck diagram and the tab. A rAF loop asks the transport which note is sounding
and moves a class. Three decisions worth recording:

- **rAF reading the clock, not a timer painting alongside each note.** The audio
  is scheduled up to 100 ms ahead against the audio clock; a `setTimeout`
  queued from the same call would run on the wall clock, drift away from it, and
  be throttled to roughly once a second in a background tab. Asking "what is
  sounding now" every frame cannot accumulate error because it never
  accumulates anything.
- **Offset by the output latency.** `currentTime` marks audio entering the
  output pipeline, not audio reaching the ear, so what is heard now was
  scheduled a latency ago. Wired, that is a few milliseconds. Over Bluetooth it
  is commonly 150–200 ms — most of a beat at 120 bpm — and a highlight that
  visibly leads the sound is worse than none on a tool for playing along. The
  checker measures 32 ms in headless Chromium, so the path is live rather than
  theoretical.
- **A note stays lit until the next one starts.** Lighting only for the written
  duration flickers through the gap between every pair of notes.

### 7e.2 A latent trap, found by mutating

`tab()` sorted its own copy of the notes; `neckDiagram()` drew in whatever order
the caller passed. Both number their notes by array position, so a caller handing
the two figures an unsorted array got two different numberings for the same
notes — and a cursor that was right in one figure and wrong in the other. Nothing
had gone wrong yet because callers happened to pass sorted arrays.

Both now sort through one shared comparator, so the agreement holds by
construction rather than by every caller remembering.

### 7e.3 The fourth vacuous assertion

The first version of the gate compared the lit element against
`transport.currentIndex()` every 25 ms. It passed. It was worthless: an
off-by-one planted inside `currentIndex()` moved both sides of the comparison
together, so the check could not see it. Two of six mutations survived, both for
this reason — the off-by-one and lighting during the count-in.

Asking the cursor whether it agrees with itself is not a test.

Rebuilt to record which note lit and *when*, and compare against times computed
in the checker from the tempo, the count-in and each note's own beat — none of
which come from the indexing logic under test. Worst observed error is now
around 15 ms against a 300 ms beat, and the off-by-one shows up as a 160 ms lag.

Then a seventh mutation — rendering the figures from a reversed array — survived
even that, because timing alone cannot see a cursor keeping perfect time on the
wrong notes. So the check also reads the lit digit off the tab and the lit label
off the neck and compares both against the transport's own note. Eight
mutations, eight caught.

### What step 7e says

The vacuous-assertion count is now four across seven steps, and all four share
one shape: the expectation was derived from the thing under test. Step 3
compared `transportTime` against the expression it evaluates. Step 2 asserted
an ascending tuning was ascending using the function that built it. Step 7b
watched the field the code deliberately does not write to. Here, the cursor was
asked whether it agreed with the function that positions the cursor.

The tell is the same every time and it is worth stating as a rule: if a gate
cannot name a source of truth that exists independently of the code it is
checking, it is not checking anything. Timing came from the tempo and the beats.
Identity came from reading the rendered digits back. Neither is computed by the
code they judge.

## Step 7f — "for standard tuning, these are unconventional fingerings"

Reported against D, Dm, D7 and Dsus4, all of which came back as scattered
six-string shapes around the seventh fret. D major was 10-9-7-7-7-10: correct
notes, root in the bass, six strings ringing, and nothing anyone would call a D
chord.

### 7f.1 The cause

Two lines, working together.

    var score = sounding.length * 12 + (bassIsRoot ? 40 : 0) + ... ;
    if (best && best.score >= 100) break;

Twelve points a string means six strings is 72, plus 40 for the root in the
bass is 112, which clears the threshold — so the search stopped at the first
full-width shape it met and never looked lower. For chords whose open shape
uses fewer than six strings, that is every one of them. D's open shape scored
86 and was passed over for a shape scoring 112 four frets further up.

The check written the round before could not see any of this, and was right not
to: it asks whether a voicing sounds its own chord, and 10-9-7-7-7-10 does.
Correctness and idiom are different properties and needed different gates.

### 7f.2 The fix

Scored the way a player chooses rather than the way a search is easiest to
write: fullness worth 6 a string instead of 12, open strings worth 10 each,
position penalised 3 a fret, span 6, and a hand model that rejects anything
needing more than four fingers — counting a barre as one finger at the lowest
fretted fret, and not counting the thumb, since a course should teach a hand
position before it teaches hooking round the neck.

The magic threshold is gone. Positions are searched from the nut outwards and
every term either ignores position or penalises it, so the best score still
reachable further up is bounded; the loop stops when the shape in hand beats
that bound. That is derived from the scoring rather than guessed, so it cannot
drift out of agreement with it the way 100 had.

Fourteen open-position chords now come back as the shapes they are taught as.

### 7f.3 A gate I wrote, tested, and deleted

The open-shape table pins the fourteen chords anyone would notice. Wanting
something more general, I added a check asserting that a voicing should sit at
the lowest position where any shape exists.

It flagged 98 voicings. The first was D#m in standard tuning, chosen as the
barre at the eleventh fret over a cramped four-finger shape at the first — and
the barre is how everyone plays E-flat minor. Chords with no open shape are
supposed to be found up the neck. The rule was false, and a false gate is worse
than no gate: kept, it would have forced the engine to get worse in order to
pass.

Deleted, and replaced with what is actually true — nothing past the twelfth
fret, where the neck meets the body. Weaker, and it holds.

Worth recording that the check also had a measurement bug on the way: `maxFret`
bounds where the search may start, not which frets a shape may use, and
comparing it against a fret number produced 176 false positives before the
false premise underneath was even visible. Two wrong things stacked, and fixing
the measurement was what made the bad rule legible.

### What step 7f says

Every gate in this project asserts something about the world, and until now the
assertions had all been safe: pitches are pitches, text either overlaps or it
does not. This was the first one that encoded a claim about *taste* — and got it
wrong.

The distinction that matters: "a chord with a conventional open shape must come
back as that shape" is checkable, because the conventional shapes are written
down in every chord book. "A chord should sit as low as possible" sounds like the
same kind of statement and is not — it is a preference dressed as a fact, and
the moment it met a real barre chord it was wrong. When a gate has no source
outside the code AND no source outside my own judgement, it is not measuring
anything but my opinion.

## Step 8 — unit P1, end to end

The plan called this "the honest cost signal for the remaining 25 units". What
shipped: the syllabus skeleton, unit P1 as 7 lessons and 35 cards, 11 authored
exercises, a lesson player, and three new gates.

### 8.1 A deliberate departure from the plan

The plan said `guitar-syllabus.js` should hold "LCM requirements per grade,
encoded". It does not, and this is the one place step 8 knowingly does something
other than what was written down.

Two reasons. An exam board's syllabus is their copyrighted text, and encoding it
here would be republishing it. And the grades were never the goal — the module
started from "I want to get better at guitar and the grades are a convenient
skeleton so nothing is missed". So the file holds technical criteria written
from scratch, in the order a graded course covers them, carrying no board's name
and claiming no equivalence. The file says so at the top.

What is preserved is the function the plan wanted: something external that
states what a unit owes, so coverage can be checked rather than assumed.

### 8.2 The per-lesson floor did its job immediately

First draft: 7 lessons, 3 cards each, 116–139 words per lesson. The 150-word
floor failed all seven.

The tempting fix was padding the prose, which is exactly the failure the plan
predicted when it rejected a per-CARD floor. The real reading was different: the
plan's worked example was ~250 words across six cards, so three-card lessons
were half the size intended. The fix was more cards — 35 rather than 21, still
averaging 42 prose words each, right on the design target.

A floor that forces padding is a bad rule; a floor that reveals thin content is
a good one. The difference is whether it is per card or per lesson, which is the
distinction the plan drew and the reason it drew it.

### 8.3 A write-only progress record, found by the browser gate

`markDone()` wrote lesson completion to storage. `load()` restored profile,
settings and stats — and not lessons, because that key was added when the course
landed and the restore line was not.

Every lesson showed as undone after a reload. From inside the code the write
looked fine, and both content checkers passed: they read the data files and never
open a browser. It took `check-guitar-lessons.js` walking the unit the way a
person does — finish everything, reload, count the ticks — to see it.

That is now three defects of the same shape across this project: state that is
written correctly and never read back, invisible to everything except actually
using the thing.

### 8.4 Two more from reviewing the step

- **The Loop checkbox on a lesson card set the loop from the workshop's
  generated exercise**, because that was the only exercise `applyLoop` knew
  about. A four-bar card looped over whatever length the scale panel happened to
  be showing. It sounds like a loop either way, which is why the gate measures
  the loop length against the exercise data instead of listening to it.
- **The card's tempo and the transport's tempo were two numbers.** The player
  displayed the card's prescribed bpm while playing the working tempo, so the box
  could read 44 while the audio ran at 90. Now there is one value, and the card's
  bpm is applied on navigation rather than on render — because applying it during
  render resets the tempo on every repaint, and a player who nudged it to 48
  would watch it snap back.

  Reviewing that fix raised the question the fix did not answer: a player working
  through at 40 should not be dragged back to 54 by every Next. So the prescribed
  tempo is adopted until the tempo is touched by hand, and offered again when the
  lesson is reopened. Verified in a browser: `open 54 → next 54 → nudged 52 →
  next 52 → reopened 54`.

### 8.5 What a unit costs

Twelve mutations across the three new gates, all caught. `npm test` runs 26
checks.

The honest signal the plan asked for, for one unit of seven lessons:

- **Content** is the bulk of it — 35 cards at 42 words is small on the page and
  slow to write, because the constraint is what to leave out. The word ceiling
  does most of the editing.
- **Exercises** were quicker than expected. 11 authored exercises, 108 notes,
  all playable first time — the note representation and the playability rules
  from steps 2 and 4 did that work already.
- **The player** was written once and now serves every remaining unit. That cost
  does not repeat.
- **The gates** were roughly a third of the step and also do not repeat: coverage
  and quality are content-shaped, not unit-shaped, so unit 2 arrives with them
  already in place.

So the remaining 25 units are mostly the first item. The substrate is not the
long pole; the writing is.

## Step 8b — the cursor ran four beats ahead of the sound

Reported against a lesson card: the highlight did not account for the four-beat
count-in, so it led the audio by exactly that much.

### 8b.1 The cause

`currentBeat()` reports negative beats while the count-in clicks, and the last
line of it wrapped them:

    if (T.loop) return E.loopWrap(b, T.loop.start, T.loop.end);

Negative beats are not IN the loop, they are before it. `loopWrap(-4, 0, 8)` is
4, so a looping card lit the back half of the phrase during the count-in and
then jumped to the start when the music began. Four beats of count-in, four
beats ahead.

Only the loop path did this. Unlooped, `b < 0` fell through to `currentIndex`,
which returns -1 for a negative beat and lights nothing — correct. That is why
the cursor timing check in `check-guitar-controls.js` never saw it: it plays
unlooped, and the defect needed a count-in AND a loop together. Lesson cards
default to `loop: true`, so the course is where it surfaced.

### 8b.2 The gate I wrote first was vacuous, which makes three

The obvious check asks the transport whether the count-in is running and
requires nothing lit while the beat is negative:

    const earlyLit = samples.filter(x => x.beat < 0 && x.lit > 0);

It passed with the bug reinstated. Under the bug `currentBeat()` reports 4
rather than -4, so `x.beat < 0` is never true, the filter matches nothing, and
the gate reports success while the defect sits in front of it. The check read
its ground truth from the function it was judging.

The working version measures elapsed wall-clock time against the count-in length
implied by the exercise's own bpm — neither of the two things being judged.
Reinstating the bug now fails it at the first sample, as does the opposite
mutation of clamping negative beats to 0.

This is the third vacuous assertion in this project: the ascending-tuning check
in step 2, the transport-time check in step 3, and now this. The standing rule
added after step 3 — every gate must be shown to fail — is what caught all three,
and it caught this one only because the mutation was run before the work was
called done rather than after.

The pattern behind all three is the same and worth naming: **each read its
expected value from the code under test.** Step 2 compared a tuning against
itself sorted, step 3 compared `transportTime` against the expression
`transportTime` evaluates, and this compared "are we in the count-in" against
the function that gets the count-in wrong. A gate needs a source of truth from
outside the thing it is checking — a chord book, a clock, an arithmetic
identity worked out by hand. When the only available source is the code itself,
the check is a tautology however carefully it is written.

## Step 8c — a count-in toggle

Requested after the cursor fix: an on/off switch for the four-beat lead-in.

### 8c.1 Stored as beats, not as a boolean

`settings.countIn` holds the number of beats, with zero meaning off. A boolean
would have needed a `4` written at each call site, which is the same shape as
the bug in 8c.2 — one number in two places, free to drift.

It lives in `settings` rather than `profile`, which is deliberate: `mergeSubject`
keeps the local copy of `settings`, so a count-in preference stays on the device
that set it. That is right for something that depends on whether you are
practising with headphones on a train or sat down with the guitar.

### 8c.2 The duplication that made the toggle risky

`play()` had two branches, one per screen, and each wrote out the whole start
sequence — load, loop, cursor, play count, and the count-in. Wiring the toggle
into one and not the other was a one-line change, and a mutation doing exactly
that **passed the entire suite**, because every browser check that exercises
playback drives lessons rather than the workshop bench.

Two fixes, and the order matters. The branch now chooses the notes and stops;
everything after it happens once. Then the gate covers the workshop path
explicitly, so the next thing that only half-lands is caught even if it is not
this one.

Gating the instance without removing the duplication would have left the class
open. Removing the duplication without the gate would have left nothing to stop
it coming back.

### 8c.3 A mutation the first gate did not catch

Rendering the checkbox as permanently `checked` passed everything. The change
handler fires whether or not the box reflects the setting, so playback behaved
correctly and every timing assertion held.

What breaks is quieter: turn the count-in off, come back later, and the box says
on while playback starts immediately. A control that misreports its own state is
worse than one that does nothing, because it teaches the wrong thing about what
the app is doing.

The added assertion turns it off, forces a redraw, reloads, and requires the box
and the stored value to agree. Worth noting what the near-miss has in common
with 8b: both gates tested the behaviour and not the display, and both times the
display was where the lie would have lived.
