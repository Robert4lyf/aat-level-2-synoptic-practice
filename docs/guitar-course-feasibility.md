# Guitar — course feasibility assessment

Status: **assessment only. Nothing built, nothing committed to.**
Written August 2026 in response to: *"how feasible would it be to add a guitar
course, incorporating theory and practical and exercises? Is there an existing
framework for this?"*

**Short answer: yes to the framework — there are several, and one of them is a
better fit for this engine than anything already in the repo. Yes to theory and
to exercises. The honest problem is "practical": 80% of every graded guitar exam
is *play this*, and a browser cannot hear you. Build the theory-and-ear course,
build real practice tooling, and be explicit that the playing half needs an
instrument and a teacher. See §7.**

---

## 1. Two questions, and both have answers

"Is there an existing framework" reads two ways, and both matter:

- **In this repo** — yes. Adding a subject is a solved problem, and the pieces a
  guitar course needs (ear tests, self-assessed performance, a facsimile
  renderer, a tone generator) all already exist in some form. §2 and §3.
- **In the world** — yes, several. UK graded guitar exams are Ofqual-regulated
  qualifications with free, published, stable specifications: LCM/RGT, RSL
  (Rockschool), Trinity Rock & Pop, and Trinity/ABRSM for classical. Their
  specs are as encodable as the AAT ones. §4.

That combination is why this idea is on firmer ground than the Hertfordshire
care one (`docs/hertfordshire-care-course-feasibility.md`), which failed on
having no fixed answer key. Here there is a published spec, a real exam, a mark
scheme and grade boundaries.

---

## 2. Technical feasibility: the cheapest new subject yet, with two exceptions

The registry at `app.js:16` takes `{ id, name, short, flag, color, desc, meta,
tabs, assets, activate() }`, progress is keyed per subject (`prep_v2_<id>`,
`app.js:9`), and `ensureSubjectAssets()` (`app.js:88`) injects data files on
first open so `index.html` needs no edit. All AAT-only UI is gated as
`=== 'aat'`, so a new subject inherits sensible defaults with no code change.

For a subject that rides the shared engine, the cost is four edit sites:

| Edit | File | Size |
|---|---|---|
| Registry entry | `app.js:16` | ~10 lines |
| Data file | new `guitar-data.js` | the content job — see §8 |
| `--subj` token triple, light + dark | `styles.css:5072-5080` | 2 lines |
| Precache entry + `CACHE_VERSION` bump | `sw.js:6` | 2 lines |

A **self-rendering module** (the `aat1` / `aat3` shape — `ui: 'GUITAR_UI'`, and
`render()` delegates) costs one extra registry field and its own stylesheet, and
is what I would actually recommend here. §6 says why.

Two things are genuinely new, and neither is in any previous plan:

### 2.1 The microphone is switched off, deliberately, in three files

`Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()` is set
in `_headers`, `vercel.json` and `worker/index.js:52`. Any tuner, any
play-it-back test, anything that listens, needs `microphone=(self)` in all three.
`npm run check:password` asserts the header exists but only tests the `camera=()`
substring (`scripts/check-site-password.js:157`), so the change passes CI
silently — which is exactly the class of trap the `run_worker_first` note in the
README warns about. If the mic is ever enabled, that assertion should be
tightened to pin the whole policy, not loosened by accident.

This is a real decision, not a formality: it widens the permission surface of a
site that is otherwise strictly `'self'` everywhere, for a feature §5.1 argues is
of limited value anyway.

### 2.2 Notation would be the repo's first dependency

There is no build step and there are no dependencies — "the site is the
repository". Guitar needs chord boxes, fretboard diagrams, tab and (for the
theory half) staff notation.

- **Chord boxes and fretboard diagrams are trivial to hand-roll** — a 6×5 grid
  of lines and dots, ~80 lines of SVG-generating JS, fully themeable with the
  existing tokens. Do this.
- **Staff notation is not.** A correct renderer handles beaming, accidentals,
  ledger lines, rests and spacing. VexFlow or abcjs, self-hosted, would work
  under `script-src 'self'` — but each is roughly the size of `app.js` again, and
  vendoring one breaks a property of this repo that has been worth keeping.

The way out: **most of what a guitar course needs to draw is not staff
notation.** Chord boxes, fretboard maps, rhythm grids and tab can all be
hand-rolled. Reserve real staff notation for the theory lane, and there, prefer
rendering a small fixed library of pre-drawn SVG examples (the `img-delf-*.svg`
precedent) over shipping a general-purpose engraver.

---

## 3. What the engine already has that a guitar course wants

This is the part that surprised me. Four mechanisms exist already:

- **A tone generator.** `playTone(freq, type, dur, vol)` at `app.js:1444` is a
  Web Audio oscillator. Ear training — intervals, chord quality, cadences,
  tuning references, a metronome — needs *no audio assets at all*, which also
  means no file-size cost, no offline problem and no licensing question. This is
  a much stronger starting position than the French module's TTS, which depends
  on a voice the device may not have.
- **A worked-example card with a "now you try".** `card.worked`
  (`app.js:5876`) reveals a procedure one step at a time and then sets a
  follow-up problem. That is the right shape for "how do you work out the key
  from the signature", used verbatim.
- **Self-assessment against a rubric, for components a browser cannot mark.**
  The DELF module already solved this problem for speaking and writing:
  `renderDelfSpeakingSection` (`app.js:6560`) tells the learner to perform the
  task out loud, then `renderDelfSelfAssess` (`app.js:6595`) has them tick
  rubric criteria and computes a score. This transfers directly to Performance
  and Accompaniment, and it is the only intellectually honest way to represent
  them. It is also proof the repo has faced this exact problem before and
  answered it without pretending.
- **A domain-specific renderer precedent.** `aat1-ui.js` exists because Level 1
  is a documents unit and needed a `doc` card element plus `match` and
  `ordering` question types that the shared player has no use for. Guitar is the
  same case, more strongly: it needs `chordbox`, `fretboard`, `rhythm` and `ear`
  elements, and question types the shared player cannot express.

---

## 4. The external framework: what the specs actually say

### 4.1 LCM / RGT — the best-documented, and free

The **London College of Music Acoustic Guitar syllabus** (also Electric, Rock,
Bass and Classical) is a free PDF, valid from Spring 2020 "until further notice",
last updated 01.01.2025. Grades 1–8 are Ofqual-regulated; Steps 1–2 are not.
Grade boundaries are fixed at Pass 65–74%, Merit 75–84%, Distinction 85–100%.

Component weightings for Grades 1 to 8:

| Component | Weight | Can this engine assess it? |
|---|---|---|
| Fingerboard Knowledge | 10% | The knowledge, yes. The playing, no. |
| Performance | 50% | **No** — self-assessment only |
| Musical Knowledge | 10% | **Yes, fully** |
| Accompaniment | 20% | **No** — self-assessment only |
| Aural Assessment | 10% | **Mostly** — see §4.2 |

The content is precisely enumerated per grade, which is what makes it encodable
exactly as `aat2-syllabus.js` encodes AAT:

- **Grade 1** — chords A, E, D7, A7, E7, B7; scales D major and A natural minor,
  one octave, ascending and descending, 108bpm one note per beat.
- **Grade 2** — F, C7, G7, five major 7ths, three minor 7ths; A major and A
  dorian, two octaves, 120bpm.
- **Grade 3** — sus2 and sus4 shapes; G major, A natural minor, A mixolydian, two
  octaves, 160bpm.
- **Grade 4** — 6ths and add9s; open-position E major/natural minor/blues, and
  fretted C, G, D, A major, 100bpm two notes per beat.
- **Grade 5** — all major and minor barre chords; all major, natural minor and
  blues scales; arpeggios.
- **Grade 8** — all major chords in four fingerboard positions, harmonised scales
  in 3rds, 6ths and 10ths, all dominant 7 arpeggios.

The **Musical Knowledge** component is a spoken discussion, and its scope is set
out explicitly: Grades 1–2 the anatomy of the guitar and notes on the
fingerboard; Grades 3–5 key, time signature, dynamics, repeat marks and
techniques used in the pieces performed; Grades 6–8 also repertoire and stylistic
awareness, altered tunings, capo use and transposition.

### 4.2 The aural tests, and which of the five a browser can mark

Five tests, the same five at every grade, growing in range and complexity:

| Test | What it asks | In-browser? |
|---|---|---|
| A — Keeping time | Clap the pulse over a 4-bar melody, accenting beat 1 | **Tap-timing proxy.** Measurable, honestly labelled |
| B — Time signature | Identify it, without hearing the melody again | **Yes, directly** |
| C — Repeating a rhythm | Clap back a short extract | **Tap-timing proxy** |
| D — Pitch | Reproduce a melodic phrase *on the guitar* | **No** |
| E — Harmony | Recognise chords and movement between them | **Yes, directly** |

Four of five are implementable with oscillators and a tap target — B and E
exactly, A and C as a screen-tap proxy for clapping. That is a genuinely good
ratio and it is the strongest single argument for building this.

### 4.3 The alternative that fits this engine perfectly: written music theory

**ABRSM Music Theory Grades 1–5 are online, objectively marked exams**: 75 marks,
Pass 50, Merit 60, Distinction 65 — the same boundaries at every grade — using
multiple choice, drag-and-drop, text entry and notation questions. Grades 6–8 are
human-marked written papers (harmony, composition, score analysis).

Read that question-format list against the repo's own: `mcq`, `dragdrop`,
`gapfill`, `tablefill`, `numeric`, `multiselect`. It is nearly a one-to-one map.
This is the guitar-adjacent qualification the engine can assess at **100%**
rather than 20%, and it is also the qualification most guitarists actually need
and skip — Grade 5 Theory is a prerequisite for Grade 6+ practical exams at
ABRSM, and the theory content is instrument-neutral, so it serves the guitar
goal without pretending to teach playing.

### 4.4 The others, briefly

- **RSL Awards (Rockschool)** — Guitar, Bass and Drums syllabuses refreshed for
  2024 onwards; technical exercises, supporting tests and unseen tests; Ofqual /
  CCEA / SQA regulated, UCAS points at Grades 6–8; graded exam or performance
  certificate, face-to-face or digital submission.
- **Trinity Rock & Pop** — Guitar Initial to Grade 8, with a *session skills*
  component (playback and improvising) that is distinctive and, notably, the
  component least representable in a browser. A new syllabus impression dated
  April 2026 covers digital and face-to-face exams.
- **RGT@LCM** — Electric, Rock, Acoustic, Bass and Classical, regulated from
  Grade 1; Recital Grades are *not* Ofqual-regulated, which is worth knowing
  before encoding them as if they were.

**Recommendation on which to encode: LCM Acoustic (or Electric).** Its syllabus
is free, complete, precise, unusually stable, and enumerates content in a form
that maps straight onto the `aat1-syllabus.js` pattern. RSL and Trinity are
equally good qualifications but lean harder on paid handbooks for the detail.

---

## 5. Where it breaks: five honest problems

### 5.1 Eighty per cent of the exam is "play this"

Fingerboard Knowledge (10%) + Performance (50%) + Accompaniment (20%) = **80% of
every graded exam requires playing an instrument in front of an examiner**, plus
aural Test D on top. No amount of engineering changes that number.

The temptation is to close the gap with the microphone. It does not close:

- Monophonic pitch detection in the browser is genuinely good — YIN-class
  algorithms reach ±1–2 cents across E2–E6, which is fine for a tuner and for
  single-note drills.
- **Polyphonic detection is not.** Autocorrelation struggles with stacked notes
  and octave-flips depending on mic proximity; practical chord detection is done
  by matching pitch classes against templates for common major, minor and 7th
  shapes, which fails on exactly the sus2/sus4/add9/maj7 vocabulary the LCM
  grades are built from.

So a tuner is buildable and a chord-change *counter* (onset detection, not chord
identification) is buildable, but "did you play that Fadd9 cleanly, in time, with
the right fingering" is not. And that is the actual question a guitar exam asks.

**Do not chase it.** Use the DELF self-assessment pattern (§3) and say plainly
what is being self-scored.

### 5.2 The repertoire is copyrighted, and it is half the syllabus

This is a constraint the repo has never faced. Every existing subject teaches
original prose about a freely published specification. Here, the set pieces —
which carry 50% of the marks — live in paid handbooks and are in copyright.
Rockschool's arrangements likewise.

The course can teach the *syllabus* (which chords, which scales, at what tempo,
what the examiner asks about, how the marks are split) without reproducing a
single note of the repertoire. What it cannot do is be a substitute for the
handbook, and the material should say so. Public-domain traditional melodies —
the Steps handbooks name *Blow the Man Down*, *Streets of Laredo*, *Buffalo Gals*
— are available for worked examples, but the graded pieces are not.

### 5.3 Recall drills do not build motor skill

The in-repo precedent is unflattering and should be looked at squarely: the
**LSF module is 56 multiple-choice questions about a physical language**, and it
teaches nobody to sign. It is a perfectly good general-knowledge quiz about LSF
wearing the clothes of a language course.

A guitar module drilling "which note is fret 5 of the A string" has the same
risk. That drill is genuinely worth doing — fingerboard fluency is real knowledge
and most self-taught players never acquire it — but a learner can score 100% on
it and still fret badly, mute strings and rush. The material has to be honest
about which of the two things it is training.

### 5.4 Notation is a build, and a dependency question

Covered in §2.2. The mitigation is to hand-roll the guitar-specific graphics
(cheap, and better looking scoped to the app's own tokens) and to be sparing
about staff notation.

### 5.5 It is a different kind of subject to everything here

Every subject in the repo is exam prep for a written assessment, where retrieval
practice is exactly the right tool. Guitar is a psychomotor skill with a written
shell around it. The app is well suited to the shell and structurally unable to
touch the core.

That is not a reason not to build it. It *is* a reason to name the thing
accurately, so it isn't mistaken for a substitute for lessons.

---

## 6. The verdict

**Feasible to build: yes, and cheaper than Level 3 was.**
**Worth building: yes — with the scope stated honestly.**
**Buildable as "a guitar course": no. As "the theory, ear and knowledge half of
a graded guitar course, plus practice tooling": comfortably.**

Unlike the Hertfordshire idea, nothing here decays. The LCM syllabus has been
stable since 2020, ABRSM's theory boundaries are fixed, and D major is D major.
The content, once written and checked against the spec, stays correct — which is
what makes the authoring cost worth paying.

---

## 7. What it should actually be: three lanes

Three lanes, distinguished in the UI, each honest about what it can claim.

### Lane 1 — Theory (fully assessed, the largest lane)

Built against **ABRSM Music Theory Grades 1–5** as the answer key, because that
exam is objectively marked and its question formats already exist in this engine.
Notation and rhythm, note values and rests, time signatures simple and compound,
key signatures and scales, intervals, triads and inversions, transposition,
clefs, terms and signs, score analysis.

Delivered with the existing `mcq` / `dragdrop` / `gapfill` / `tablefill` types
plus one new one: **place-the-note**, click a staff or fretboard position. This
lane can carry a real mock exam — 75 marks, Pass 50 / Merit 60 / Distinction 65 —
scored exactly as the real thing, which is something the practical lanes can
never offer.

### Lane 2 — Ear and fingerboard (assessed, generated audio, no assets)

Built against the **LCM aural tests** (§4.2) and **Fingerboard Knowledge**:

- **Interval, chord-quality and cadence recognition** — oscillators, generated
  fresh each time, so the bank never runs out and nothing is memorised by
  position.
- **Time-signature identification** (Test B) and **chord-movement recognition**
  (Test E) — direct implementations of two of the five aural tests.
- **Tap-back rhythm tests** (Tests A and C) — screen-tap proxies for clapping,
  scored on timing accuracy, labelled as proxies.
- **Fingerboard drills** — name the note at a position, find the position for a
  note, spell a scale, identify a chord from its box, name the notes in a chord.
  This is the declarative half of a 10% component, and it is the half most
  self-taught players are missing.

Every stimulus is synthesised, so this lane adds no bytes, works offline, and
raises no licensing question at all.

### Lane 3 — Practical (never scored by the app; tools and rubrics)

This is where "exercises" belongs, and the DELF pattern (§3) is the template:

- **Metronome**, built on `playTone`, with subdivisions and accents — the
  syllabus specifies exact tempi per grade (108, 120, 160bpm and so on), so it
  can be pre-set from the encoded spec rather than dialled in.
- **One-minute chord changes** — the standard guitar practice measure. Pick two
  chords from the grade's own list, run the timer, log the count. Self-reported,
  and it is a genuinely motivating number to watch climb.
- **A practice routine generator** — given a target grade, produce this week's
  routine from the encoded requirements: these chords, these scales, at this
  tempo, for this long.
- **A practice log** feeding the existing progress and streak machinery.
- **Self-assessed performance and accompaniment**, using the rubric checklist
  pattern, with the LCM attainment-band descriptors (Distinction / Merit / Pass /
  Below Pass) as the actual criteria — they are published verbatim and are
  written in plain language.
- **An optional tuner** if, and only if, the Permissions-Policy decision in §2.1
  is taken deliberately. It is the one mic feature that clearly works.

The lane's framing should be explicit, once, in the material: *the app cannot
hear you play, and nothing here is a substitute for a teacher.*

---

## 8. Sizing, against the repo's own yardsticks

| Precedent | Renderer | Content |
|---|---|---|
| `code-route` (shared engine) | 0 lines | 950 lines, ~7,000 words |
| `lsf` (shared engine) | 0 lines | 674 lines, 56 questions |
| `aat1` (self-rendering) | 1,031 lines UI + 742 CSS + 405 syllabus + 859 checker | 3,672 lines, ~43,800 words, 198 questions |
| `aat3` (self-rendering) | 757 lines UI | ~55,800 words |

A guitar module is the `aat1` shape. A realistic first cut — **Steps 1–2 plus
Grades 1–2, all three lanes** — is roughly:

- `guitar-syllabus.js` — ~350 lines, encoding LCM requirements per grade, plus
  the ABRSM theory topic list, with a `check-guitar-coverage.js` mirroring
  `check-aat1-coverage.js` so a lesson cannot claim a requirement the spec does
  not contain.
- `guitar-ui.js` — ~700–900 lines: chord-box and fretboard SVG generators, the
  ear-test player, the tap-timing scorer, the metronome, the rubric self-assess.
- `guitar-learn-data.js` — 12–15 lessons, ~15,000–18,000 words.
- `guitar-practice-data.js` — 150–200 questions, weighted towards Lane 1 because
  that is the lane that can be marked.
- `guitar-styles.css` — ~500 lines scoped under `body[data-subject="guitar"]`.

Call it **a fortnight of evenings for the engineering, and the content is the
real job** — the same ratio as every other subject here, which is the correct
ratio.

One warning from the repo's own history: `formula-engine.js` is 39KB of
carefully-built, adversarially-reviewed spreadsheet evaluator that is loaded by
nothing and tested by nothing. Guitar has exactly the same failure mode available
to it — the fretboard renderer and the ear-test engine are the fun part, and the
lessons are not. Write one complete grade end to end before building any more
tooling.

---

## 9. Recommendation

1. **Build Lane 1 first, on its own, as its own thing.** ABRSM Theory Grades 1–3
   using only question types the engine already has, no new renderer, no new
   graphics beyond a handful of pre-drawn SVGs. It is the cheapest lane, the only
   fully assessable one, and it is immediately useful. If the appetite runs out
   here, what exists is still a complete, honest product.
2. **Then Lane 2**, which is where the character of the subject actually lives
   and where the engine is unexpectedly well-equipped. Ear training needs the
   renderer, but it needs no content-authoring marathon — the stimuli are
   generated.
3. **Then Lane 3**, the practice tooling, which is small, and the LCM syllabus
   encoding that drives it.
4. **Take the microphone decision separately and explicitly**, or not at all. A
   tuner is nice; it is not what makes this course worth having.
5. **Name it for what it is.** Something like *"Guitar — theory, ear and
   fingerboard"*, not *"Guitar Grade 1"*. The README's existing disclaimer style
   ("this is an independent study tool, not affiliated with…") is the right
   register, and here it should also say that the playing components are
   self-assessed.

The thing to avoid is the LSF outcome: a course that quizzes fluently *about*
guitar and teaches nobody to play, while looking from the outside as though it
should. The three-lane split, labelled honestly, is what prevents that.

---

## Sources

- [LCM Acoustic Guitar syllabus (PDF, valid from 2020, updated 01.01.2025)](https://lcme.uwl.ac.uk/media/4ovo23fm/acoustic-guitar-syllabus.pdf)
- [LCM Rock Guitar syllabus (PDF)](https://lcme.uwl.ac.uk/media/sfkmvgtk/rock-guitar-syllabus-2019.pdf)
- [RGT@LCM graded guitar exams — regulation and levels](https://www.rgt.org/exams/)
- [RGT@LCM Acoustic Guitar](https://www.rgt.org/exams/acoustic-guitar.php) · [Electric](https://www.rgt.org/exams/electric-guitar.php) · [Rock](https://www.rgt.org/exams/rock-guitar.php) · [Classical](https://www.rgt.org/exams/classical-guitar.php)
- [RSL Awards — new Rockschool Guitar, Bass and Drums syllabuses (2024)](https://www.rslawards.com/new-rockschool-guitar-bass-drums-syllabuses-out-now/)
- [RSL Awards — graded music exam updates](https://www.rslawards.com/graded-music-exam-updates/)
- [Trinity Rock & Pop — the syllabuses](https://www.trinityrock.com/exams/syllabus)
- [Trinity Rock & Pop Guitar qualification specifications](https://www.trinitycollege.com/resource?id=7899)
- [ABRSM Music Theory exams](https://www.abrsm.org/en-gb/our-exams/music-theory-exams)
- [ABRSM Music Theory pass marks and grade boundaries](https://gomusictheory.com/en/blog/abrsm-music-theory-pass-mark)
- [Pitch detection in Web Audio using autocorrelation (cwilso/PitchDetect)](https://github.com/cwilso/PitchDetect)
- [Detecting pitch with the Web Audio API and autocorrelation](https://alexanderell.is/posts/tuner/)
- [Guitar note identification with YIN — accuracy across E2–E6](https://frequencydetector.com/guitar-note-identifier/)
