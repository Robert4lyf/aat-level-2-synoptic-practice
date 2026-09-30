# Figures across the courses — design note

Nine courses. Before this work, three of them had pictures: LSF (41 hand-sign
photographs), guitar (a fretboard renderer) and pixel art (21 grid figures).
The other six taught entirely in prose, including the three that spend most of
their length telling a reader to read something off a piece of paper, the one
that asks seventeen questions about the shape and colour of road signs, and the
one taught inside a piece of software it never showed.

Four modules now cover that, each drawing from data rather than shipping
images. They share one argument and differ in one decision.

| Module | Draws | Used by | Gate |
| --- | --- | --- | --- |
| `doc-figure.js` | Invoices, credit notes, statements, payslips, VAT returns | AAT L1, L2, L3 | `check-doc-figures.js` |
| `sign-figure.js` | French road signs | Code de la route | `check-sign-figures.js` |
| `pixel-panels.js` | Aseprite's interface | Pixel art | `check-pixel-panels.js` |
| `diagram-figure.js` | Concept diagrams: cycle, chain, hub, spectrum, stack, matrix | CIPS L2 | `check-diagram-figures.js` |

## The shared argument: a figure is data

None of these ship an image or a blob of HTML. An invoice written as markup is
an invoice nobody can ask whether its VAT is 20% of its net. A road sign
written as markup is a sign nobody can ask whether it is the shape its own
lesson says it is. Written as data, both questions have answers, and the four
check scripts ask them on every build:

- **Documents** — lines extend, totals chain, VAT is the percentage printed on
  the document, a statement's balance runs. Two are wrong on purpose and
  declare it; for those the check inverts.
- **Signs** — a sign declares only its family, and the family table decides
  its outline and every colour, so the card that teaches "rond rouge =
  interdiction" cannot quietly contain a triangle. Each outline also declares
  a **safe region**, and every pictogram is drawn through it as a clip path,
  so detail cannot run into the border however badly a glyph is written. The
  clip makes the overlap impossible; it does not make a glyph fit, so each one
  was rendered with the region showing and looked at.
- **Panels** — a tag that runs past the last frame, a radio group with nothing
  selected, a palette with one colour in two slots.
- **Diagrams** — a cycle that does not return, a spectrum whose ends are never
  reached, a matrix missing a quadrant.

Each module names the classes it can emit in one place and reports them, so
`check-subject-styles.js` can ask rather than guess: a rule for a part the
renderer dropped fails, and a part with no rule fails too.

## The one decision that differs: whether the drawing themes

Two of the four keep literal colours and fail their build on a `var(--`:

- **Road signs.** A sign whose red drifts towards pink in dark mode is a sign
  the reader learns wrong. The regulation's colours are the content.
- **Aseprite panels.** The program is dark grey whichever theme this app is
  set to, and a panel repainted white stops looking like the thing the reader
  has open.

Two of them theme completely:

- **Documents**, because an invoice on screen is a surface like any other, and
  a black-on-white facsimile in a dark reading session is a torch in the face.
- **Concept diagrams**, because nothing about them is a picture of an external
  thing. They are the course talking.

The pixel art course already contained both halves of this argument — its grid
figures keep literal colours because a hue-shifting lesson is wrong if the
theme moves its hues — so the split is not new, only written down.

## Why nothing here is a photograph or a screenshot

Three separate reasons, and all three would have applied anyway:

1. **Licence.** A photograph of a road sign belongs to whoever took it.
   Aseprite is proprietary and a screenshot of it is its authors' copyright.
2. **Staleness.** A screenshot carries a version number and a theme, and goes
   out of date the week either changes. A diagram of the arrangement does not.
3. **Checkability.** This is the one that mattered most. A picture cannot be
   asked whether its arithmetic works.

## Known gaps

- **French (`french-data.js`) has no figures.** It is the largest data file in
  the repo and nothing here touched it.
- **The AAT documents cover no purchase order, delivery note or paying-in
  slip**, though all three are named in tables that describe them.
- **Eight Aseprite panels, not a tour.** Only the controls the cards already
  named are drawn.
- **CIPS L2M3, L2M4 and L2M5 have syllabus data and no lessons**, so they have
  no diagrams either.
- **Nothing checks a figure against the prose beside it**, beyond a keyword
  test. Where a worked example and a document share figures, they were matched
  by hand, and a later edit to either could drift without a word.
