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
