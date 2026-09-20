# Pixel art (Aseprite) — design note

A seventh subject in the picker, sitting alongside the guitar module as the
second non-examined course in the app. It teaches pixel art as a craft and uses
Aseprite to do it.

## What is different about it

Every other subject here ends a lesson with questions that can be marked. This
one ends with **drawing challenges**: ten per unit, getting harder, each with a
brief, a canvas-and-colour budget, a statement of what finished looks like, and
three hints revealed one at a time only if asked for. Completion is something
the reader asserts rather than something the app decides.

That is a real weakening of the progress model and the design leans on two
things to make it mean anything:

1. **Every challenge carries a `check` line** — what "done" looks like, in
   terms the reader can apply to their own canvas. Without it, the honest
   answer to "am I finished?" is always yes.
2. **The material drives the practice.** Every card that teaches a technique
   names the challenges that exercise it ("To practise this, see challenges
   4–7"), and every challenge is named by at least one card. Both directions
   are enforced by `scripts/check-pixel-course.js`, because a challenge nobody
   is sent to is a challenge nobody does.

## Files

| File | What it holds |
| --- | --- |
| `pixel-syllabus.js` | 59 criteria in 9 units, in teaching order. The coverage spine. |
| `pixel-learn-data.js` | 27 lessons, 101 cards, with pixel-grid figures written as rows of characters. |
| `pixel-challenge-data.js` | 90 challenges, 10 per unit, each with 3 escalating hints. |
| `pixel-ui.js` | The subject shell: three screens, the figure renderer, progress under `prep_v2_pixel`. |
| `pixel-styles.css` | Scoped to `body[data-subject="pixel"]`. Themes everything except the art. |
| `scripts/check-pixel-course.js` | Coverage, format, figure palette, cross-references, wiring. |
| `scripts/check-pixel-prerequisites.js` | No term used before the unit that teaches it. |

The units are: the canvas and the pencil; lines and shapes; colour; light and
form; reading at size; animation; tiles and environments; proportion and
projection; effects and shipping.

PX7, PX8 and PX9 were added after the rest shipped, and append rather than
insert — the teaching order is the order of the `UNITS` array, and renumbering
to put them in the middle would have invalidated stored completions. PX7 brings
a fifth strand, `E`, because a tile is not a small sprite: it is one whose four
edges have to agree with their neighbours, including with itself.

PX8 and PX9 exist because a coverage audit of the first seven units found what
they never said: nothing taught how big a head is, nothing drew an object from
a second angle, nothing said what rotation does to pixel art, and the course
stopped at a walk cycle without reaching a hit, a pivot or a slice.

## Two decisions worth writing down

**Figures are data, not images.** A pixel grid is rows of characters, one per
pixel, drawn as flat SVG rects. The source of a figure is the figure, so it
cannot drift out of step with what it claims to show, and a diff to a figure is
readable. `check-pixel-course.js` reads the allowed character set straight out
of the renderer's palette, so a character with no colour behind it — which
would render as a hole that looks deliberate — fails the build.

**The art does not theme.** Everything else in `pixel-styles.css` has a light
and a dark value. The pixels inside a figure are literal hex in `pixel-ui.js`,
because a figure teaching hue shifting is wrong if the theme moves its hues,
and a ball lit from the upper left is wrong if dark mode lightens its shadow.
Only the surface behind the art changes.

## Wiring

It follows the guitar module exactly: a registry entry in `app.js` naming
`PIXEL_UI`, its own assets loaded lazily with its stylesheet awaited before
mount, and `sw.js`'s `LAZY_PATTERN` extended to cover `pixel-*.js|css` so its
files stay out of the offline install of somebody who only studies AAT. They
share guitar's unversioned lazy cache — the name is a storage key, not a
description, and renaming it would orphan every existing reader's copy.

It is also in the subject lists of `check-subjects-render.js`,
`check-subject-chrome.js`, `check-clipped-text.js`, `check-reference-panel.js`
(as a subject with no reference drawer) and `check-subject-styles.js`. The
stylesheet-timing probe in `check-subjects-render.js` was guitar-specific and
is now parameterised by a per-subject panel class, so both subjects that ship a
stylesheet through the registry are held to it.

## Known gaps

- **No autotiling rule set.** PX7 covers the thirteen-tile terrain set by
  hand. The 47-tile blob set, and the bitmask an engine uses to pick a tile
  automatically, are a level past what this course reaches.
- **No pixel fonts, UI layout or HUD work.** PX9 covers the nine-slice panel
  an interface is built from, and stops there.
- **One light, always.** Rim light, coloured light and a second source are not
  covered anywhere; PX4 and PX7 both assume a single white key light.
- **No reference layer or symmetry-mode coverage.** Both are useful Aseprite
  features and neither is load-bearing for the craft, so they were cut rather
  than given half a card.
- **Nothing checks a drawing.** There is no image input and no marking. This is
  a course that tells you what to draw and what finished looks like; the
  judgement is yours.
