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
