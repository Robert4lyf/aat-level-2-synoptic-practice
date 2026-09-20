/* Pixel art — the course.
 *
 * THE FORMAT, and why it is this shape.
 *
 * A lesson is a stack of cards; a card is a short piece of prose and, wherever
 * a picture can carry the point, a pixel grid drawn at a size you can count.
 * The grids are written as rows of characters — one character per pixel — so
 * the source of a figure is the figure. Nothing here imports an image, and
 * nothing here can drift out of step with what it claims to show.
 *
 * PROSE IS CAPPED at roughly 90 words per card, checked by
 * scripts/check-pixel-course.js. Pixel art is a thing you learn by moving
 * pixels, and a card long enough to read instead of drawing has already lost.
 * Where a technique needs more explanation than that, it needs another card or
 * a figure, not a longer paragraph.
 *
 * EVERY CARD THAT TEACHES A TECHNIQUE POINTS AT CHALLENGES. `exercises` lists
 * challenge numbers within the same unit; the check requires every challenge
 * in a ready unit to be named by at least one card. A challenge nobody is sent
 * to is a challenge nobody does, and the whole reason this subject has
 * challenges instead of questions is that the practice is the assessment.
 *
 * VOICE. Imperative, second person, present tense. Aseprite's default
 * shortcuts are given as they ship; anyone who has remapped them knows they
 * have. No "simply", no "just" — the two words that tell a beginner the thing
 * they cannot do is easy.
 *
 * FIGURE CHARACTERS are defined once, in pixel-ui.js. '.' is transparent; K D
 * M L H are one ramp dark to light; R is the marker colour used to point at a
 * pixel under discussion; 1–5 is a hue-shifted ramp and 6–0 the same ramp
 * built by brightness alone; a–e is grey; v–z is a second material.
 */
(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.PixelLearnData = api;
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var LESSONS = [

    /* ═══ PX1 · The canvas and the pencil ═══════════════════════════════ */
    {
      id: 'px1-l1', unit: 'PX1', title: 'A file that will not fight you',
      icon: '📄', criteria: ['PX1.canvas', 'PX1.pencil'],
      summary: 'Canvas size, and the four settings that quietly ruin a pixel sprite.',
      cards: [
        {
          h: 'Pick the size before you pick the subject',
          p: ['Canvas size is the first real decision and the one beginners skip. 16×16 is an inventory item. 32×32 is a character who can have a face. 64×64 is a portrait or a boss.',
              'Bigger is not safer. A canvas larger than the subject needs fills with detail that adds nothing and takes four times as long to animate.',
              'The two below are the same mushroom. The small one gets three shapes; the large one earns spots, a lit rim and a stem with sides.'],
          art: {
            caption: 'One subject, 8×8 and 16×16. The second is a redraw, not a resize.',
            cell: 11,
            rows: [
              '...........................',
              '...........................',
              '...........................',
              '...........................',
              '...........................',
              '...........................',
              '...........................',
              '...........................',
              '..KKKK.......KKKKKK........',
              '.K3353K....KK333333KK......',
              'K333533K..K3335533333K.....',
              'K333333K.K333555333333K....',
              '.KWWWWK..K333555333553K....',
              '..KWWK..K33333333355533K...',
              '..KWWK..K33553333333333K...',
              '...KK...K33553333333333K...',
              '.........KKKKKKKKKKKKKK....',
              '............KWWWWWWWWK.....',
              '............KWWWWWWWWK.....',
              '.............KWWWWWWK......',
              '.............KWWWWWWK......',
              '.............KWWWWWWK......',
              '.............KWWWWWWK......',
              '..............KKKKKK.......'
            ]
          },
          exercises: [1, 6]
        },
        {
          h: 'One pixel, hard edges, full opacity',
          p: ['Four settings decide whether you are drawing pixel art at all: pencil size 1, anti-aliasing off, opacity 100, no blending mode.',
              'Anti-aliasing is softening the tool adds along an edge by inventing part-transparent pixels. Unit PX5 covers putting it in by hand, where you choose every pixel; you do not want a tool doing it for you.',
              'Aseprite ships with all four correct. Any of them changed looks fine zoomed in and turns to mush at 100%.'],
          exercises: [1, 2]
        },
        {
          h: 'Right-click is your eraser',
          p: ['The pencil paints the foreground colour with the left button and the background colour with the right. On a transparent layer the background colour is nothing, so right-drag erases.',
              'That saves a tool switch on almost every stroke. The eraser tool is still there for when you want it.'],
          exercises: [2, 3]
        },
        {
          h: 'RGB now, indexed later',
          p: ['New files default to RGB colour mode, which lets you use any colour. Indexed mode restricts you to a palette and makes that palette editable as a unit.',
              'Start in RGB. Unit PX3 covers indexed mode and what it buys you, which is considerable — but not while you are still learning where pixels go.'],
          exercises: [2]
        }
      ]
    },
    {
      id: 'px1-l2', unit: 'PX1', title: 'Moving and reaching',
      icon: '⌨️', criteria: ['PX1.view', 'PX1.keys'],
      summary: 'Getting around the canvas, and the keys that keep your hand on it.',
      cards: [
        {
          h: 'Zoom, pan, fit',
          p: ['You will work at 600–1600% and check at 100%, constantly. Mouse wheel zooms, Space and drag pans, and View ▸ Fit on Window pulls the whole sprite back into view.',
              'Check at 100% every few minutes. Everything looks good at 1600%, and 100% is the only size anyone else will ever see.'],
          keys: [['Wheel', 'Zoom'], ['1–6', 'Zoom 100%–3200%'], ['Space + drag', 'Pan'], ['Shift+0', 'Fit on window']],
          exercises: [4]
        },
        {
          h: 'The pixel grid',
          p: ['View ▸ Show ▸ Pixel Grid draws a line between every pixel. Past about 800% it turns guessing into counting, which is what most of unit PX2 is.',
              'The other grid — View ▸ Grid — is a spacing grid you set yourself, for tiles and for laying icons out in cells.'],
          exercises: [4, 9]
        },
        {
          h: 'Four keys and one modifier',
          p: ['B is the pencil, E the eraser, I the eyedropper, X swaps foreground and background colour. Alt held down turns any tool into an eyedropper until you let go.',
              'That last one is the whole trick: pick a colour off your own sprite without changing tools, without moving to the palette, without losing your place.',
              'These are the shipped defaults. Edit ▸ Keyboard Shortcuts lists whatever yours actually are.'],
          keys: [['B', 'Pencil'], ['E', 'Eraser'], ['Alt + click', 'Pick colour'], ['X', 'Swap colours'], ['M', 'Rectangular marquee'], ['Ctrl+Z', 'Undo']],
          exercises: [3]
        }
      ]
    },
    {
      id: 'px1-l3', unit: 'PX1', title: 'Layers, and the file you leave behind',
      icon: '🗂️', criteria: ['PX1.layers', 'PX1.save'],
      summary: 'Why the outline goes on its own layer, and how to export something that stays sharp.',
      cards: [
        {
          h: 'Outline up, fill down',
          art: {
            caption: 'Outline layer, colour layer, and the two together. The colour runs under the outline.',
            cell: 11,
            rows: [
              '..KKKK.....3333.....KKKK..',
              '.K....K...333333...K3353K.',
              'K......K..333333..K333533K',
              'K......K..333333..K333333K',
              '.K....K...WWWWWW...KWWWWK.',
              '..K..K.....WWWW.....KWWK..',
              '..K..K.....WWWW.....KWWK..',
              '...KK.......WW.......KK...'
            ]
          },
          p: ['Put the outline on its own layer and the flat colour on a layer beneath it. Then you can fill sloppily — past where the outline sits — and nothing shows.',
              'It also lets you hide either one to see what the other is doing on its own, and move the whole sprite without smearing one part against another.'],
          exercises: [5, 8]
        },
        {
          h: 'Two files, two jobs',
          p: ['The .aseprite file keeps your layers, your frames and your palette. The exported PNG keeps none of that. Save the first with Ctrl+S; make the second with File ▸ Export.',
              'Never work on the PNG. Every re-export is free; re-deriving layers from a flattened image is not.'],
          exercises: [7]
        },
        {
          h: 'Scale in the export dialog',
          p: ['The export dialog has a Resize field. ×6 there uses nearest-neighbour scaling, which keeps pixels square.',
              'Scaling afterwards in a program that smooths gives you a blurred sprite with a grey halo. If an export looks soft, something interpolated it.'],
          exercises: [7, 8]
        },
        {
          h: 'Transparency is a layer decision',
          p: ['A new file starts with a Background layer that cannot hold transparency. Right-click it in the timeline and convert it to an ordinary layer; delete it instead and the sprite is cut out.',
              'Check the result on two different background colours. A white fringe means an anti-aliased tool edge got in somewhere.'],
          exercises: [8, 9, 10]
        }
      ]
    },

    /* ═══ PX2 · Lines and shapes ════════════════════════════════════════ */
    {
      id: 'px2-l1', unit: 'PX2', title: 'Run lengths',
      icon: '📏', criteria: ['PX2.jaggy', 'PX2.slope'],
      summary: 'The unit of pixel art is the run — how many pixels in a row before the line steps.',
      cards: [
        {
          h: 'A line is a sequence of runs',
          p: ['Every pixel line is horizontal or vertical runs joined by steps. The run lengths are the line: read them as numbers and you can see what is wrong before you can feel it.',
              'A straight diagonal has runs that are all the same. 1,1,1,1 is 45°. 2,2,2,2 is half that. Anything that jumps about is a jaggy.'],
          compare: {
            bad: { label: 'Runs 3,1,2,3,1,2 — a jaggy', rows: [
              'KKK.........',
              '...K........',
              '....KK......',
              '......KKK...',
              '.........K..',
              '..........KK'
            ] },
            good: { label: 'Runs 2,2,2,2,2,2 — a line', rows: [
              'KK..........',
              '..KK........',
              '....KK......',
              '......KK....',
              '........KK..',
              '..........KK'
            ] }
          },
          exercises: [1, 2]
        },
        {
          h: 'Shift draws the line for you',
          p: ['Click once, then hold Shift and click again: the pencil draws a straight line between the two points, with even runs already worked out.',
              'Use it for anything long and straight. Freehand diagonals are where jaggies come from, and repairing one takes longer than placing two clicks.'],
          exercises: [1]
        },
        {
          h: 'The ends are where lines fail',
          p: ['A line of runs 2,2,2,2,1 has a short run at the end, and that single pixel reads as a kink even though nothing in the middle is wrong.',
              'Either extend the line so the last run is full length, or start it one pixel further in. Do not leave an orphan.'],
          exercises: [1, 2]
        }
      ]
    },
    {
      id: 'px2-l2', unit: 'PX2', title: 'Pixel-perfect, and its limits',
      icon: '✨', criteria: ['PX2.perfect'],
      summary: 'What the mode removes, and the three times you want it off.',
      cards: [
        {
          h: 'What a double is',
          p: ['Drag freehand and the pencil leaves a corner pixel at every bend — an L shape where a single diagonal step would do. The marked pixels below are doing nothing.',
              'Pixel-perfect mode removes them as you draw. It is in the tool options bar whenever the pencil is selected.'],
          compare: {
            bad: { label: 'Freehand — the marked pixels are redundant', rows: [
              'KR.....',
              '.KR....',
              '..KR...',
              '...KR..',
              '....K..'
            ] },
            good: { label: 'Pixel-perfect — one pixel per step', rows: [
              'K......',
              '.K.....',
              '..K....',
              '...K...',
              '....K..'
            ] }
          },
          exercises: [3]
        },
        {
          h: 'It only works while you drag',
          p: ['Pixel-perfect is applied to a stroke as it is drawn. It will not clean up a line already on the canvas, and it does nothing for a pencil bigger than one pixel.',
              'So it is a drawing aid, not a repair tool. Repairing means reading the runs and fixing them by hand.'],
          exercises: [2, 3]
        },
        {
          h: 'When to turn it off',
          p: ['Three cases: drawing thick lines, where it fights the width; dotting single pixels quickly, where it can swallow one; and any place you want an L corner on purpose.',
              'Deliberate corners exist — the inside of a tight bend sometimes needs that pixel. The mode cannot tell the difference, so you do.'],
          exercises: [3]
        }
      ]
    },
    {
      id: 'px2-l3', unit: 'PX2', title: 'Curves and round things',
      icon: '⭕', criteria: ['PX2.curve', 'PX2.round', 'PX2.shape'],
      summary: 'A curve is a line whose runs change — in one direction only.',
      cards: [
        {
          h: 'Runs that change once',
          p: ['If a straight line is runs that stay the same, a curve is runs that change. The rule is that they change in one direction only: getting shorter, or getting longer, never both.',
              'A run that goes back up mid-curve is a dent, and the eye finds it immediately even at 100%.'],
          compare: {
            bad: { label: 'Runs 3,1,5,2,4 — dents', rows: [
              'KKK.............',
              '...K............',
              '....KKKKK.......',
              '.........KK.....',
              '...........KKKK.'
            ] },
            good: { label: 'Runs 5,4,3,2,1 — a curve', rows: [
              'KKKKK...........',
              '.....KKKK.......',
              '.........KKK....',
              '............KK..',
              '..............K.'
            ] }
          },
          exercises: [5, 8]
        },
        {
          h: 'The circle everyone memorises',
          p: ['At 8×8 there is essentially one circle, and it is worth knowing by heart: rows of 4, 6, 8, 8, 8, 8, 6, 4.',
              'Bigger circles are the same idea with more steps. Doubling this one pixel for pixel does not work — a 16-wide circle starts with a run of six, not eight.'],
          art: {
            caption: 'The 8×8 circle — rows of 4, 6, 8, 8, 8, 8, 6, 4',
            cell: 12,
            rows: [
              '..KKKK..',
              '.K....K.',
              'K......K',
              'K......K',
              'K......K',
              'K......K',
              '.K....K.',
              '..KKKK..'
            ]
          },
          exercises: [6, 7]
        },
        {
          h: 'Draw a quarter and mirror it',
          p: ['Anything symmetrical is one quarter of the work. Draw the top-left quarter, copy, flip horizontally, then flip the pair vertically.',
              'Fix mistakes in the source quarter and mirror again rather than patching the copies — that is how three of four edges end up subtly different.'],
          exercises: [4, 7]
        },
        {
          h: 'Shape before anything inside it',
          p: ['Block the subject in one flat colour first and make that outer shape right. The outer shape has a name — the silhouette — and it is what a viewer reads before anything else.',
              'If a one-colour blob does not read as the thing, no amount of shading will make it read. Go back and change the outline. Unit PX5 turns that into a test you can run on any sprite.'],
          exercises: [9, 10]
        }
      ]
    },

    /* ═══ PX3 · Colour ══════════════════════════════════════════════════ */
    {
      id: 'px3-l1', unit: 'PX3', title: 'Value first',
      icon: '🌗', criteria: ['PX3.value', 'PX3.ramp'],
      summary: 'Value is how light a colour is, and it does almost all the work.',
      cards: [
        {
          h: 'Value carries the image',
          p: ['Value is lightness alone, hue and saturation set aside. It is what separates one shape from another at a glance, and it survives being shrunk, blurred or seen by a colourblind player.',
              'Hue makes an image attractive. Value makes it readable. When they disagree, value wins.'],
          art: {
            caption: 'Five even steps of value — nothing here but lightness',
            cell: 16,
            rows: ['aabbccddee', 'aabbccddee']
          },
          exercises: [1]
        },
        {
          h: 'Check it in greyscale',
          p: ['Duplicate the layer and desaturate the copy: Edit ▸ Adjustments ▸ Hue/Saturation, saturation to −100.',
              'Anywhere the sprite goes flat, two colours you thought were different are the same value, and hue is doing a job it cannot do reliably.'],
          exercises: [2]
        },
        {
          h: 'A ramp is a material',
          p: ['A ramp is three to five colours for one material, ordered dark to light, with even value spacing. Three is tight, four is comfortable, five is generous.',
              'Pick the midtone first — the colour the material actually is — then build out in both directions.'],
          exercises: [3, 5]
        }
      ]
    },
    {
      id: 'px3-l2', unit: 'PX3', title: 'Hue makes the difference',
      icon: '🌈', criteria: ['PX3.hue', 'PX3.mud'],
      summary: 'Move the hue as you move the value, or everything you paint looks like plastic.',
      cards: [
        {
          h: 'Do not just turn the brightness down',
          p: ['A ramp built by moving one slider is a ramp of one colour in five strengths. It reads as plastic because nothing in the world is lit that way.',
              'Shift the hue as the value changes — warm towards the light, cool towards the shadow. Fifteen to thirty degrees a step.'],
          compare: {
            bad: { label: 'Brightness only — flat', rows: ['6677889900', '6677889900'] },
            good: { label: 'Hue shifted — lit', rows: ['1122334455', '1122334455'] }
          },
          exercises: [4]
        },
        {
          h: 'Why warm light and cool shadow',
          p: ['Outdoors the light is the sun and the shadow is lit by the sky, which is blue. That is the observation the convention comes from, and it holds indoors often enough to be a default.',
              'Reverse it deliberately for firelight, moonlight or a screen-lit face. Reverse it accidentally and the sprite looks wrong without anyone knowing why.'],
          exercises: [4]
        },
        {
          h: 'Keep saturation in the darks',
          p: ['Dark does not mean grey. A shadow that has lost its saturation reads as dirt, and a sprite full of them looks muddy no matter how good the drawing is.',
              'As the value drops, raise saturation a little and swing the hue. The darkest step should still be obviously a colour.'],
          exercises: [3, 10]
        }
      ]
    },
    {
      id: 'px3-l3', unit: 'PX3', title: 'A palette you can hold',
      icon: '🎨', criteria: ['PX3.limit', 'PX3.indexed'],
      summary: 'Fewer colours, reused harder — and Aseprite\'s palette as a live control.',
      cards: [
        {
          h: 'Share ramps between materials',
          p: ['A small palette is not a restriction so much as a decision to reuse. The same four browns can be wood, leather and hair if the values land differently on each.',
              'Every new ramp is four more colours to keep in harmony. Take the top three steps of an existing ramp before you build another.'],
          exercises: [5, 6]
        },
        {
          h: 'Indexed mode makes the palette real',
          p: ['Sprite ▸ Color Mode ▸ Indexed binds every pixel to a palette slot. Edit the slot and every pixel using it changes at once, live.',
              'That is how a day palette becomes a night one in thirty seconds, and how you test a colour decision without repainting anything.'],
          exercises: [7, 8]
        },
        {
          h: 'Replace, do not repaint',
          p: ['Edit ▸ Replace Color changes every instance of a colour, including stray single pixels you had forgotten. The paint bucket only fills one contiguous region.',
              'After a replacement, check the palette for a swatch nothing uses any more. A leftover swatch means the replacement missed something.'],
          exercises: [8, 9]
        },
        {
          h: 'Cutting a palette down',
          p: ['To go from sixteen colours to eight, find pairs within a step of each other in value — those merge almost free.',
              'What must not merge is anything either side of the focal point. The rest of the sprite can flatten; the thing you want read cannot.'],
          exercises: [9, 10]
        }
      ]
    },

    /* ═══ PX4 · Light and form ══════════════════════════════════════════ */
    {
      id: 'px4-l1', unit: 'PX4', title: 'One light',
      icon: '💡', criteria: ['PX4.source', 'PX4.pillow'],
      summary: 'Decide where the light is, write it down, and make every surface answer to it.',
      cards: [
        {
          h: 'Pick a direction and commit',
          p: ['Before any shading goes down, decide where the light is. Upper-left is the convention, and conventions are useful because everyone can check your work against them.',
              'A flat face pointing at the light is lightest; one turned away is darkest. That single rule handles every box, plank and wall you will ever draw.'],
          exercises: [1]
        },
        {
          h: 'Pillow shading, and what it is missing',
          p: ['Pillow shading is light in the middle getting darker evenly outwards. It happens when the shading follows the outline instead of a light source.',
              'The result reads as a flat disc with a glow behind it. Put the light somewhere specific and the same shape becomes a ball.'],
          compare: {
            bad: { label: 'Pillow — bands follow the outline', rows: [
              '...KKKK...',
              '.KKDDDDKK.',
              '.KDMMMMDK.',
              'KDMLLLLMDK',
              'KDMLHHLMDK',
              'KDMLHHLMDK',
              'KDMLLLLMDK',
              '.KDMMMMDK.',
              '.KKDDDDKK.',
              '...KKKK...'
            ] },
            good: { label: 'Lit from the upper left', rows: [
              '...KKKK...',
              '.KKHHLLKK.',
              '.KHHLLMMK.',
              'KHLLLMMMDK',
              'KHLLMMMDDK',
              'KLLMMMDDDK',
              'KLMMMDDDDK',
              '.KMMDDDDK.',
              '.KKDDDDKK.',
              '...KKKK...'
            ] }
          },
          exercises: [2, 3]
        },
        {
          h: 'The dark side touches the edge',
          p: ['On the lit version above, the darkest interior value reaches the outline on the lower right. On the pillow version it never does — the dark is a ring.',
              'That is the quickest test there is. If your darkest value never touches the silhouette, you have pillow-shaded something.'],
          exercises: [3]
        },
        {
          h: 'Shadows land opposite the light',
          p: ['A cast shadow is the object\'s shape flattened onto the ground, offset away from the light. It must touch the object where the object touches the ground.',
              'A gap between the two reads as hovering — useful for a jump, fatal for a rock.'],
          exercises: [4]
        }
      ]
    },
    {
      id: 'px4-l2', unit: 'PX4', title: 'Form',
      icon: '🔮', criteria: ['PX4.form', 'PX4.ao'],
      summary: 'Light, midtone, core shadow, bounce — and the dark line where two things meet.',
      cards: [
        {
          h: 'The darkest part is not the edge',
          p: ['On a rounded form the darkest band — the core shadow — sits just inside the shadow edge, not on the outline. Below it, light bouncing off the ground lifts the rim again.',
              'Leaving the bounce out is what makes a sphere look like a cut-out disc.'],
          exercises: [5]
        },
        {
          h: 'Band width says how fast it turns',
          p: ['On a cylinder the bands run along the axis. A narrow band means the surface is turning quickly there; a wide one means it is nearly flat.',
              'Highlight narrow, midtone wide, shadow narrow, bounce narrower still. Even bands read as a flat card.'],
          exercises: [7]
        },
        {
          h: 'Occlusion is geometry, not light',
          p: ['Where two forms meet, less light of any kind reaches the crevice. That seam is dark whichever way the sun is, and it is dark on the lit side too — just less so.',
              'Keep it to one or two pixels and keep it darker than the shading around it, or it stops reading as a seam and becomes an outline.'],
          exercises: [6]
        },
        {
          h: 'Set into, not sitting on',
          p: ['An occlusion line above an inset object, plus a lit edge on the lower inner rim of the hole, is what tells the eye the thing is recessed.',
              'Reverse the two and the same pixels say the object is raised. It is a two-pixel difference and it changes the object entirely.'],
          exercises: [6, 10]
        }
      ]
    },
    {
      id: 'px4-l3', unit: 'PX4', title: 'Dither and banding',
      icon: '▞', criteria: ['PX4.dither', 'PX4.band'],
      summary: 'Two ways of blending a step, and the failure the second one exists to fix.',
      cards: [
        {
          h: 'Dithering buys a colour you do not have',
          p: ['Interleaving two colours of a ramp reads, at distance, as a colour between them. A checkerboard is the strongest blend; scattered single pixels the softest.',
              'It costs texture. On a 16-pixel sprite a checkerboard is not a blend, it is noise.'],
          art: {
            caption: 'A checkerboard blending two steps of one ramp',
            cell: 12,
            rows: [
              'LLLLLMLMLMMM',
              'LLLLMLMLMMMM',
              'LLLLLMLMLMMM',
              'LLLLMLMLMMMM'
            ]
          },
          exercises: [8]
        },
        {
          h: 'Give a transition room',
          p: ['A dither needs three or four pixels of width to read as a transition. Narrower and it reads as a mistake someone forgot to clean up.',
              'That is why dithering belongs on large surfaces — skies, slopes, big slabs of metal — and rarely on a character.'],
          exercises: [8]
        },
        {
          h: 'Banding is a boundary that echoes',
          p: ['When a shading step runs parallel to the outline, the eye reads the repetition as a stripe rather than as a form. It is the second most common shading failure after pillowing.',
              'Fix it by varying each band\'s width along its length. Moving the whole band just puts the stripe somewhere else.'],
          exercises: [9]
        },
        {
          h: 'Dither as a last resort on a band',
          p: ['A few dithered pixels along the worst boundary break the line without changing any values. It works, and it is not the real fix.',
              'The real fix is the widths. Reach for dithering when the widths are right and the boundary is still too clean.'],
          exercises: [9, 10]
        }
      ]
    },

    /* ═══ PX5 · Reading at size ═════════════════════════════════════════ */
    {
      id: 'px5-l1', unit: 'PX5', title: 'The silhouette test',
      icon: '🌑', criteria: ['PX5.sil', 'PX5.cut'],
      summary: 'Fill it black. If it is still identifiable, the drawing works.',
      cards: [
        {
          h: 'Black it out and look',
          p: ['Duplicate the layer, then Edit ▸ Adjustments ▸ Hue/Saturation and drag lightness to −100. Every pixel goes black and the transparency is untouched.',
              'If the black shape does not name the object, no amount of interior detail will fix it — the detail is not what is being read.'],
          compare: {
            bad: { label: 'The sprite', rows: [
              '....KKKK....',
              '....KWWK....',
              '....KWWK....',
              '...KKWWKK...',
              '...KWWWWK...',
              '..KKWWWWKK..',
              '..KWWWWWWK..',
              '..KWxxxxWK..',
              '..KWxxxxWK..',
              '..KKxxxxKK..',
              '...KKKKKK...'
            ] },
            good: { label: 'Its silhouette — still a bottle', rows: [
              '....KKKK....',
              '....KKKK....',
              '....KKKK....',
              '...KKKKKK...',
              '...KKKKKK...',
              '..KKKKKKKK..',
              '..KKKKKKKK..',
              '..KKKKKKKK..',
              '..KKKKKKKK..',
              '..KKKKKKKK..',
              '...KKKKKK...'
            ] }
          },
          exercises: [1]
        },
        {
          h: 'Fix the outside, not the inside',
          p: ['A silhouette fails for three reasons: the defining feature is too small, a long edge is featureless, or two parts have merged into one blob.',
              'Exaggerate the feature, break the edge, move the arm one pixel off the body. All three are changes to the outer shape.'],
          exercises: [2]
        },
        {
          h: 'One pixel can be a whole feature',
          p: ['Going from 32×32 to 16×16 is not a resize, it is a redraw. Anything two pixels wide is gone, and you decide what it becomes.',
              'A single dark pixel can be an eye, a buckle or a keyhole. Choose which details get one and let the rest go.'],
          exercises: [3]
        }
      ]
    },
    {
      id: 'px5-l2', unit: 'PX5', title: 'Anti-aliasing by hand',
      icon: '🪶', criteria: ['PX5.aa', 'PX5.aa-no'],
      summary: 'One intermediate pixel on the corner of a step — and knowing when not to.',
      cards: [
        {
          h: 'Soften the corner, not the line',
          p: ['Anti-aliasing means putting a colour between the line and its background on the inside corner where run lengths change.',
              'One pixel per corner, and taper off as the runs get shorter. Where the runs are 1,1,1 there is no corner to soften.'],
          compare: {
            bad: { label: 'No anti-aliasing', rows: [
              'KKKKK...........',
              '.....KKK........',
              '........KK......',
              '..........K.....',
              '...........K....'
            ] },
            good: { label: 'One intermediate pixel per corner', rows: [
              'KKKKKM..........',
              '....MKKKM.......',
              '.......MKKM.....',
              '.........MKM....',
              '..........MK....'
            ] }
          },
          exercises: [4, 5]
        },
        {
          h: 'Pick the intermediate colour once',
          p: ['It sits halfway in value between the line and what is behind it. One colour for the whole edge, not a gradient.',
              'Two intermediate pixels per corner is a blur, not an anti-alias, and at 100% the difference is very visible.'],
          exercises: [4]
        },
        {
          h: 'Three times to leave it off',
          p: ['On a tiny sprite, where the extra pixels are a large share of the whole. On a cut-out edge, where the background changes and the pixels become a halo.',
              'And on anything moving fast — nobody resolves the edge of a run cycle.'],
          exercises: [6]
        }
      ]
    },
    {
      id: 'px5-l3', unit: 'PX5', title: 'Outlines and focus',
      icon: '👁️', criteria: ['PX5.outline', 'PX5.focus'],
      summary: 'Three outline treatments, and how to decide what gets looked at first.',
      cards: [
        {
          h: 'Black, coloured, selective',
          p: ['Black reads against anything and flattens the form. A coloured outline — the same family, a few steps darker — keeps the form and loses some separation.',
              'A selective outline thins or vanishes where the light hits. Roundest, hardest to keep readable, and worth the trouble on a hero sprite.'],
          exercises: [7]
        },
        {
          h: 'Dropping the outline takes repair',
          p: ['Removing an outline on the lit side is not deleting pixels — those pixels still have to be the sprite, in its lightest values.',
              'Make the transition gradual. An outline that stops dead halfway along an edge reads as damage.'],
          exercises: [8]
        },
        {
          h: 'Contrast decides where the eye lands',
          p: ['The brightest pixel next to the darkest pixel is what gets looked at. Decide where that should be — usually the face, the gem, the blade — and put it there.',
              'Then lower contrast everywhere else. Focus is as much subtraction as addition.'],
          exercises: [9]
        },
        {
          h: 'Saturation and detail follow contrast',
          p: ['Put the most saturated colour and the busiest cluster of pixels in the same place as the highest contrast. Three signals agreeing is unmissable.',
              'Three signals in three places is a sprite with no focal point at all.'],
          exercises: [9, 10]
        }
      ]
    },

    /* ═══ PX6 · Animation ═══════════════════════════════════════════════ */
    {
      id: 'px6-l1', unit: 'PX6', title: 'The timeline',
      icon: '🎞️', criteria: ['PX6.frames', 'PX6.onion', 'PX6.tags'],
      summary: 'Frames, durations, onion skinning and tags — the four controls you need.',
      cards: [
        {
          h: 'Frames and durations',
          p: ['Alt+N adds a frame; Alt+B duplicates the current one, which is usually what you want. Enter plays the animation at its real speed.',
              'Duration is per frame, set by right-clicking it. Most of what makes an animation read is which frames are held and which flash past.'],
          keys: [['Alt+N', 'New frame'], ['Alt+B', 'Duplicate frame'], ['Enter', 'Play'], [', / .', 'Previous / next frame']],
          exercises: [1]
        },
        {
          h: 'Onion skinning',
          p: ['The onion icon at the top of the timeline shows the neighbouring frames tinted behind the current one. Set how many either side.',
              'Draw the key frames first and the in-betweens second, sitting between the two tints. Animating straight through from frame 1 drifts.'],
          exercises: [3]
        },
        {
          h: 'Tags name a sequence',
          p: ['Select a frame range, right-click, New Tag. A tag has a name, a colour and a loop direction, and can be previewed on its own.',
              'Tags are also what an exported JSON hands the game engine, so "run" in your file becomes "run" in the code.'],
          exercises: [2, 6]
        },
        {
          h: 'Loop points are a frame apart',
          p: ['The last frame must differ from the first by as much as any other neighbouring pair, or the loop sticks.',
              'Play it twenty times in a row. A hitch you can only see on the tenth loop is still a hitch.'],
          exercises: [2]
        }
      ]
    },
    {
      id: 'px6-l2', unit: 'PX6', title: 'Timing and weight',
      icon: '⚖️', criteria: ['PX6.spacing', 'PX6.squash'],
      summary: 'Spacing is speed. Arcs are life. Squash is weight.',
      cards: [
        {
          h: 'Spacing is speed',
          p: ['The distance between one frame\'s position and the next is how fast the thing is moving. Wide gaps read fast; tight gaps read slow.',
              'A ball slows at the top of its arc, so the frames bunch there, and it is fastest at the bottom, so they spread.'],
          compare: {
            bad: { label: 'Even spacing — constant speed, no weight', rows: [
              '........................',
              '........................',
              '.........R...R..........',
              '........................',
              '.....R...........R......',
              '........................',
              '........................',
              '........................',
              '.R...................R..',
              '........................'
            ] },
            good: { label: 'Bunched at the top, spread at the bottom', rows: [
              '........................',
              '........................',
              '...........R.R..........',
              '........................',
              '........R.......R.......',
              '........................',
              '........................',
              '........................',
              '........................',
              '.R.....................R'
            ] }
          },
          exercises: [4]
        },
        {
          h: 'Move along an arc',
          p: ['Almost nothing in the physical world travels in a straight line. Plot the positions as dots before drawing a single frame.',
              'Turn onion skinning up to show every frame at once and check the dots trace a curve.'],
          exercises: [4, 7]
        },
        {
          h: 'Squash and stretch keep their volume',
          p: ['A ball that squashes 20% shorter gets 20% wider. Losing volume turns it into a balloon.',
              'Squash for one frame only, on impact. Two frames of squash reads as rubber.'],
          exercises: [5]
        },
        {
          h: 'Small movements, long holds',
          p: ['An idle moves two pixels and is still alive if the timing is right — 150 to 200ms a frame, with the head offset a frame behind the chest.',
              'Everything moving together at the same moment is a sprite bobbing, not a character breathing.'],
          exercises: [7]
        }
      ]
    },
    {
      id: 'px6-l3', unit: 'PX6', title: 'Cycles and export',
      icon: '🏃', criteria: ['PX6.cycle', 'PX6.export'],
      summary: 'Build a walk from its keys, then get it out of Aseprite in one piece.',
      cards: [
        {
          h: 'Contacts first, passes second',
          p: ['A four-frame walk is two contact poses — the moment a foot lands — and two passing poses between them. The contacts say "walk"; the passes are consequences.',
              'Draw both contacts before anything else. They are the frames a player actually reads.'],
          exercises: [8]
        },
        {
          h: 'The body goes up and down',
          p: ['The body rises on the passing pose and drops on the contact. One or two pixels is enough, and without it the character slides rather than walks.',
              'A run adds one thing: a frame where neither foot is down. Everything else about a run follows from that.'],
          exercises: [8, 9]
        },
        {
          h: 'Landings take the weight',
          p: ['On a run, the landing frame has the lowest body, the most bent leg and slightly more duration than its neighbours.',
              'That extra duration is most of what "weight" means in a pixel animation.'],
          exercises: [9]
        },
        {
          h: 'Exporting a sheet',
          p: ['File ▸ Export Sprite Sheet. Start with a horizontal strip — packed layouts are harder to debug — and turn on JSON Data so tags travel with the frames.',
              'Watch Trim and Border Padding: trimming makes cells different sizes, which most engines cannot use without reading the JSON.'],
          exercises: [10]
        }
      ]
    }
,

    /* ═══ PX7 · Tiles and environments ══════════════════════════════════ */
    {
      id: 'px7-l1', unit: 'PX7', title: 'Working to a grid',
      icon: '📏', criteria: ['PX7.grid', 'PX7.seam', 'PX7.repeat'],
      summary: 'A tile has four edges that must agree with their neighbours, and with itself.',
      cards: [
        {
          h: 'Pick a tile size first',
          p: ['Sixteen pixels is the common tile, and everything else follows from it: the canvas is a whole number of tiles, the character is a whole number of tiles tall, the camera moves in tiles.',
              'Set View ▸ Grid ▸ Grid Settings to your tile size and leave the grid on. Working to it from the start is cheaper than aligning afterwards.'],
          exercises: [1, 2]
        },
        {
          h: 'The seam is the edge you can see',
          p: ['A tile with a dark border repeats into a lattice — the border becomes a line across the whole field, and it is the first thing anyone sees.',
              'Take the frame off and let the texture run to all four edges. What ties tiles together is that nothing marks where one stops.'],
          compare: {
            cell: 11,
            bad: { label: 'A bordered tile, repeated — a lattice', rows: [
              'KKKKKKKKKKKKKKKK',
              'KwwwwwwKKwwwwwwK',
              'KwwxwwwKKwwxwwwK',
              'KwwwwwwKKwwwwwwK',
              'KwxwwwwKKwxwwwwK',
              'KwwwwvwKKwwwwvwK',
              'KwwwwwwKKwwwwwwK',
              'KKKKKKKKKKKKKKKK',
              'KKKKKKKKKKKKKKKK',
              'KwwwwwwKKwwwwwwK',
              'KwwxwwwKKwwxwwwK',
              'KwwwwwwKKwwwwwwK',
              'KwxwwwwKKwxwwwwK',
              'KwwwwvwKKwwwwvwK',
              'KwwwwwwKKwwwwwwK',
              'KKKKKKKKKKKKKKKK'
            ] },
            good: { label: 'The same tile without its frame', rows: [
              'wwxwwwwwwwxwwwww',
              'wwwwwwwwwwwwwwww',
              'wwwwwvwwwwwwwvww',
              'vwwwwwwvvwwwwwwv',
              'wwwwwwwwwwwwwwww',
              'wxwwwwwwwxwwwwww',
              'wwwwwwwwwwwwwwww',
              'wwwwwwxwwwwwwwxw',
              'wwxwwwwwwwxwwwww',
              'wwwwwwwwwwwwwwww',
              'wwwwwvwwwwwwwvww',
              'vwwwwwwvvwwwwwwv',
              'wwwwwwwwwwwwwwww',
              'wxwwwwwwwxwwwwww',
              'wwwwwwwwwwwwwwww',
              'wwwwwwxwwwwwwwxw'
            ] }
          },
          exercises: [2, 3]
        },
        {
          h: 'Draw across the edge, not up to it',
          p: ['View ▸ Tiled Mode ▸ Tiled in Both Axes repeats the canvas around itself while you draw. A stroke that leaves the right edge arrives at the left, so the wrap is something you can see rather than something you hope for.',
              'Judge the tile in that view. Alone it will always look fine.'],
          exercises: [3, 4]
        },
        {
          h: 'A repeated feature is worse than a seam',
          p: ['One distinctive mark — a flower, a bright stone, a crack — lands in the same place in every tile, and the field turns into a grid of flowers.',
              'Keep the fill tile boring. Anything with a shape to it belongs in a separate decorative tile you place where you want it.'],
          exercises: [4, 5]
        }
      ]
    },
    {
      id: 'px7-l2', unit: 'PX7', title: 'A terrain set',
      icon: '🧱', criteria: ['PX7.tileset', 'PX7.tilemap'],
      summary: 'What it takes for one surface to meet another, and how Aseprite holds the set.',
      cards: [
        {
          h: 'One fill, four edges, four corners',
          p: ['The minimum set for grass meeting dirt is nine tiles: the fill, the four edges, and the four outer corners. That is what the figure shows, laid out with a gap so you can see where one tile stops.',
              'Inner corners — where the terrain turns back on itself — are four more, and you will want them the first time you draw anything that is not a rectangle.'],
          art: {
            caption: 'Nine tiles of a grass-on-dirt set, with the tile boundaries opened out',
            cell: 9,
            rows: [
              '77777777.77777777.77777777',
              '77777777.78777777.77777777',
              '76777777.77777777.77777777',
              '77777777.77777777.77776777',
              '77777xxx.xxxxxxxx.xxx77777',
              '7777vwww.wwwwwwww.wwwv7787',
              '7777vwww.wwwwwwww.wwwv7777',
              '7776vwwx.wwwwwwww.wxwv7777',
              '..........................',
              '7777vwww.wwwwwwww.wwwv7777',
              '7777vwww.wwwwxwww.wwwv7677',
              '7777vwww.wwwwwwww.wwwv7777',
              '7777vwww.wwwwwwww.wwwv7777',
              '7777vwww.wwwwwwww.xwwv7777',
              '7877vwxw.wwwwwwww.wwwv7777',
              '7777vwww.wwwwwwww.wwwv7777',
              '7777vwww.wxwwwwww.wwwv7777',
              '..........................',
              '7777vwww.wwwwwwww.wwwv7777',
              '7777vwww.wwwwwwxw.wwwv7767',
              '7777vwww.wwwwwwww.wwwv7777',
              '77677vvv.vvvvvvvv.vvv77777',
              '77777777.77777777.77777777',
              '77777677.77777777.77677777',
              '77777777.77777778.77777777',
              '77777777.77777777.77777777'
            ]
          },
          exercises: [5, 6]
        },
        {
          h: 'The edges carry the read',
          p: ['The fill tile is the one nobody looks at and the edges are where the work goes: a lit top lip where grass catches the light, a dark line where it overhangs the dirt.',
              'That is unit PX4 applied to a surface. One light direction for the whole set, decided before the first edge tile.'],
          exercises: [6, 7]
        },
        {
          h: 'Tilemap layers',
          p: ['Layer ▸ New ▸ New Tilemap Layer makes a layer that holds tile indices rather than pixels, with its own tileset beside the palette.',
              'Draw on it and you place tiles; drawing a new pattern adds a tile to the set. The canvas still looks like pixels — the layer is what has changed.'],
          exercises: [7, 8]
        },
        {
          h: 'Edit once, change everywhere',
          p: ['Open a tile from the tileset, change three pixels, and every placement of it on the map changes with it. That is the whole reason a tilemap layer exists.',
              'It is also the trap: a tile you tweak to suit one spot moves everywhere it appears. If a spot needs its own version, make it its own tile.'],
          exercises: [7, 8]
        }
      ]
    },
    {
      id: 'px7-l3', unit: 'PX7', title: 'Making a scene',
      icon: '🏞️', criteria: ['PX7.depth', 'PX7.deco'],
      summary: 'Depth from contrast, and how to scatter things so they do not look scattered.',
      cards: [
        {
          h: 'Depth is contrast, not outline',
          p: ['Distance flattens. The far layer loses contrast and saturation and moves towards the sky colour; the near layer keeps the full range and the darkest dark.',
              'Three copies of one shape, three contrast levels, and the eye reads three distances without a single line of perspective.'],
          art: {
            caption: 'One shape at three distances — nothing changes but contrast',
            cell: 11,
            rows: [
              '..dd.......bb.......aa...',
              '.dddd.....bbbb.....aaaa..',
              'dddddd...bbbbbb...aaaaaa.',
              '.dddd.....bbbb.....aaaa..',
              '..dd.......bb.......aa...',
              '..dd.......bb.......aa...',
              '..dd.......bb.......aa...'
            ]
          },
          exercises: [8, 9]
        },
        {
          h: 'Detail goes where the player is',
          p: ['The background gets shapes and no texture. The midground gets texture. The foreground gets the pixel-level work and the only hard outlines in the scene.',
              'A background drawn as carefully as the foreground competes with it, and the player loses track of what they can walk on.'],
          exercises: [9]
        },
        {
          h: 'Scatter, do not sprinkle',
          p: ['Decorative tiles placed one in every few look sown by a machine. Put them in uneven clumps with empty stretches between, and leave more empty than you want to.',
              'Two or three together, then nothing for a screen width. That reads as a place rather than as a texture.'],
          exercises: [9, 10]
        },
        {
          h: 'Judge it at 100%, whole',
          p: ['A scene is looked at all at once, from a distance, while something is happening in it. Zoom out, look at the whole screen, and check that the ground still reads as ground.',
              'Anything you can only see by zooming in is not paying for the time it took.'],
          exercises: [10]
        }
      ]
    }
,

    /* ═══ PX8 · Proportion and projection ═══════════════════════════════ */
    {
      id: 'px8-l1', unit: 'PX8', title: 'Proportion and landmarks',
      icon: '🧍', criteria: ['PX8.proportion', 'PX8.landmark'],
      summary: 'How big a head is, and the three lines that go down before any detail.',
      cards: [
        {
          h: 'Count in heads',
          p: ['A figure is measured in head heights. Three heads is a chibi or a mascot; five is a stylised adult; seven or eight is realistic and needs more pixels than most sprites have.',
              'Pick the count before you draw, and give the head a whole number of pixels — six, seven, eight — so the rest divides cleanly.'],
          art: {
            caption: 'Three heads and five heads, ticked off in head units. Same character, different species.',
            cell: 9,
            rows: [
              '.................R....KKKK.....',
              '......................KKKK.....',
              '......................KKKK.....',
              '......................KKKK.....',
              '......................KKKK.....',
              '.......................KK......',
              '.................R...KKKKKK....',
              '...................K.KKKKKK.K..',
              '...................K.KKKKKK.K..',
              '...................K.KKKKKK.K..',
              '...................K.KKKKKK.K..',
              '...................K.KKKKKK.K..',
              'R....KKKK........R.K.KKKKKK.K..',
              '.....KKKK..........K.KKKKKK.K..',
              '.....KKKK............KKKKKK....',
              '.....KKKK............KK..KK....',
              '.....KKKK............KK..KK....',
              '......KK.............KK..KK....',
              'R...KKKKKK.......R...KK..KK....',
              '..K.KKKKKK.K.........KK..KK....',
              '..K.KKKKKK.K.........KK..KK....',
              '..K.KKKKKK.K.........KK..KK....',
              '..K.KKKKKK.K.........KK..KK....',
              '....KKKKKK...........KK..KK....',
              'R...KK..KK.......R...KK..KK....',
              '....KK..KK...........KK..KK....',
              '....KK..KK...........KK..KK....',
              '....KK..KK...........KK..KK....',
              '....KK..KK...........KK..KK....',
              '....KK..KK...........KK..KK....'
            ]
          },
          exercises: [1, 3]
        },
        {
          h: 'Three lines before any detail',
          p: ['Eyeline, shoulder line, waist. Put those three down as single rows of a marker colour on their own layer and the proportions are decided before a single feature exists.',
              'Everything after that is placing shapes against lines you have already agreed with yourself.'],
          exercises: [2]
        },
        {
          h: 'The count has to survive the pose',
          p: ['A character who is five heads standing and four heads running has changed species between animations. Keep the guide layer and check every new pose against it.',
              'The eyeline is the one that slips. Watch it when the head tilts.'],
          exercises: [2, 3]
        },
        {
          h: 'Small figures get fewer parts, not smaller parts',
          p: ['At three heads the body is one shape and the legs are two. There is no room for a neck, a waist or a separate upper arm, so do not draw them thinner — leave them out.',
              'That is why a chibi reads at 16 pixels and a realistic figure does not.'],
          exercises: [1, 3]
        }
      ]
    },
    {
      id: 'px8-l2', unit: 'PX8', title: 'Three views, and the 2:1 grid',
      icon: '🧊', criteria: ['PX8.views', 'PX8.iso', 'PX8.isocube'],
      summary: 'The same object from three angles, and the one ratio isometric pixel art is built on.',
      cards: [
        {
          h: 'Three views that agree',
          p: ['Draw the object top-down, side-on and three-quarter, and check one thing across all three: the measurements. If the handle is four pixels on the side view it is four on the others.',
              'Disagreement here is why a set of props looks like it came from three different games.'],
          exercises: [4, 5]
        },
        {
          h: 'Two across, one down',
          p: ['Isometric pixel art is drawn at 2:1 — every step is two pixels across and one down. That is not true isometry, it is the ratio that gives clean lines, and every tile set you have seen uses it.',
              'A 2:1 floor tile is sixteen wide and eight tall: a diamond made of runs of two.'],
          exercises: [6]
        },
        {
          h: 'The cube, and its three faces',
          p: ['Extend the tile\'s two lower edges straight down and cap them, and you have a cube: a top face and two sides. The top is lightest, and the two sides take different values even though both face away.',
              'Give the three faces three distinct values or the cube flattens into a hexagon.'],
          art: {
            caption: 'A cube on the 2:1 grid: the tile as its top face, and two sides that meet at the near edge.',
            cell: 12,
            rows: [
              '......LLLL......',
              '....LLLLLLLL....',
              '..LLLLLLLLLLLL..',
              'LLLLLLLLLLLLLLLL',
              'LLLLLLLLLLLLLLLL',
              'DDLLLLLLLLLLLLMM',
              'DDDDLLLLLLLLMMMM',
              'DDDDDDLLLLMMMMMM',
              'DDDDDDDDMMMMMMMM',
              'DDDDDDDDMMMMMMMM',
              'DDDDDDDDMMMMMMMM',
              'DDDDDDDDMMMMMMMM',
              'DDDDDDDDMMMMMMMM',
              '..DDDDDDMMMMMM..',
              '....DDDDMMMM....',
              '......DDMM......'
            ]
          },
          exercises: [7]
        },
        {
          h: 'One light for the whole grid',
          p: ['Every object in an isometric scene shares the light, so the left face is the dark one on all of them, always. Decide it once for the tile set and never revisit it.',
              'Objects lit differently from the floor they stand on read as cut out and pasted in.'],
          exercises: [7, 8]
        }
      ]
    },
    {
      id: 'px8-l3', unit: 'PX8', title: 'Moving pixels without wrecking them',
      icon: '✂️', criteria: ['PX8.transform', 'PX8.symmetry'],
      summary: 'Which transforms are free, which are destructive, and what symmetry mode leaves you to do.',
      cards: [
        {
          h: 'Free: flip, quarter turn, move',
          p: ['Mirroring and turning by ninety degrees move every pixel to another whole pixel, so nothing is invented and nothing is lost. Use them constantly — half of a symmetrical object is drawn once.',
              'Select with M, move with the arrow keys, and the selection stamps where you drop it.'],
          exercises: [9]
        },
        {
          h: 'Not free: any other angle, any fractional scale',
          p: ['Rotate by forty-five degrees and the program has to guess: runs that were clean become ragged, and one-pixel details disappear.',
              'Use the result as a guide on a low-opacity layer and redraw over it. Nine times in ten that is faster than repairing what came out.'],
          exercises: [10]
        },
        {
          h: 'Scaling is the same problem',
          p: ['Doubling is exact — every pixel becomes four. Anything that is not a whole multiple invents pixels, and a 1.5× sprite has rows that are two pixels tall next to rows that are one.',
              'Scale by whole numbers or redraw at the new size.'],
          exercises: [10]
        },
        {
          h: 'Symmetry mode, then break it',
          p: ['The symmetry toggle in the tool options mirrors your strokes live, which halves the work on a face or a front-facing sprite.',
              'Then turn it off and move a dozen pixels by hand. A perfectly symmetrical character looks manufactured, and the asymmetry is what makes it look drawn.'],
          exercises: [9, 10]
        }
      ]
    },

    /* ═══ PX9 · Effects and shipping ════════════════════════════════════ */
    {
      id: 'px9-l1', unit: 'PX9', title: 'Anticipation, impact, smear',
      icon: '💥', criteria: ['PX9.anticipate', 'PX9.impact', 'PX9.smear'],
      summary: 'Three frames do almost all the work in any action, and none of them is the middle of it.',
      cards: [
        {
          h: 'Wind up the other way',
          p: ['Before anything moves forward it moves back. A sword lifts, a body crouches, a fist pulls in. Two or three frames, held long enough to be read.',
              'Without it an action starts from nowhere, and the hit that follows has nothing behind it.'],
          exercises: [2, 5]
        },
        {
          h: 'The impact frame',
          p: ['One frame does the hit: everything at its extreme, the contact point at maximum contrast, often a flash of the lightest colour in the palette.',
              'It can break the rules the rest of the animation follows — go off-model, stretch the limb, add a shape that exists for one frame only.'],
          exercises: [2, 3, 5]
        },
        {
          h: 'Hold the extremes, rush the middles',
          p: ['Give the anticipation and the impact longer durations than the frames between them. The in-betweens are what the eye skips.',
              'A hit that reads as weak is nearly always one where every frame is the same length.'],
          exercises: [3]
        },
        {
          h: 'Smear the frame you cannot draw',
          p: ['When a pose travels too far in one frame, draw the space it crossed: the leading edge sharp, the trail behind it a midtone.',
              'It looks wrong held still and correct at speed, which is the whole trick.'],
          compare: {
            cell: 11,
            bad: { label: 'Two poses, nothing between — it snaps', rows: [
              '....................',
              '....................',
              '....................',
              '....................',
              '..KKKKKK.....K......',
              '..............K.....',
              '...............KK...',
              '.................K..',
              '..................K.'
            ] },
            good: { label: 'Pose, smear, pose — the sweep reads', rows: [
              '...............................',
              '...............................',
              '...............................',
              '...............................',
              '..KKKKKK.....KMMMMM.....K......',
              '..............KMMMM......K.....',
              '...............KKMM.......KK...',
              '.................KM.........K..',
              '..................K..........K.'
            ] }
          },
          exercises: [4, 5]
        }
      ]
    },
    {
      id: 'px9-l2', unit: 'PX9', title: 'What happens after',
      icon: '🌬️', criteria: ['PX9.secondary', 'PX9.particle'],
      summary: 'Cloth that lags the body, and a burst that breaks up instead of fading.',
      cards: [
        {
          h: 'Everything loose arrives late',
          p: ['A cape, a tail, hair, a scarf: they follow the body by a frame or two and keep going after it stops.',
              'Animate the body to completion first, then the loose parts, offset. Moving them in step with the body is what makes a sprite look stiff.'],
          exercises: [7]
        },
        {
          h: 'And it settles rather than stopping',
          p: ['After the body halts, the cloth overshoots once and comes back. Two frames of settle is usually enough, and it is the difference between a character stopping and a character being paused.',
              'The overshoot is small — two or three pixels past where it ends up.'],
          exercises: [7]
        },
        {
          h: 'A burst grows, then breaks up',
          p: ['Dust, sparks and impacts get bigger for a frame or two, then come apart into separate pixels and vanish. They do not fade: a half-transparent pixel is not a pixel-art effect.',
              'Three to five frames is plenty, and the last one should be almost nothing.'],
          art: {
            caption: 'Three frames of a spark: a cross, a star, then pieces.',
            cell: 11,
            rows: [
              '..........................5....',
              '...............H.......5.....5.',
              '.............5.H.5.............',
              '....H..........H...............',
              '...HHH......HHHHHHH...5.......5',
              '....H..........H...............',
              '.............5.H.5.............',
              '...............H.......5.....5.',
              '..........................5....'
            ]
          },
          exercises: [6, 8]
        },
        {
          h: 'Dust is slow and low, sparks are fast and everywhere',
          p: ['A landing puff sits on the ground, spreads sideways and takes five or six frames. A hit spark goes in every direction and is gone in three.',
              'Using the same timing for both is the most common reason an effect reads as generic.'],
          exercises: [6]
        }
      ]
    },
    {
      id: 'px9-l3', unit: 'PX9', title: 'Handing it to an engine',
      icon: '📦', criteria: ['PX9.pivot', 'PX9.slice', 'PX9.density'],
      summary: 'The origin, the slices and the one thing that ruins a whole project\'s art.',
      cards: [
        {
          h: 'One origin, every frame',
          p: ['An engine anchors a sprite at a point. If that point wanders between frames the character jitters, and no amount of animating fixes it.',
              'Pick it — usually between the feet — and draw every frame around it. Onion skinning all frames at once shows you whether it moved.'],
          exercises: [9]
        },
        {
          h: 'Slices mark what the code needs',
          p: ['A slice is a named rectangle over part of the sprite, exported with the sheet: a hitbox, a place to attach a weapon, or a nine-slice panel that stretches without distorting its corners.',
              'For a nine-slice, the centre stretches, the edges stretch one way, and the four corners never stretch at all.'],
          exercises: [10]
        },
        {
          h: 'One pixel size, or none of it works',
          p: ['If one sprite is drawn at twice the pixel size of another, they cannot share a screen. The eye reads the bigger pixels as a mistake immediately.',
              'Decide the density at the start of the project and hold every asset to it.'],
          art: {
            caption: 'The same shape at two pixel densities. In one scene, the right-hand one is broken.',
            cell: 9,
            rows: [
              '.KK..KK......KKKK....KKKK..',
              'KHHKKHHK.....KKKK....KKKK..',
              'KHHHHHHK...KKHHHHKKKKHHHHKK',
              'KHHHHHHK...KKHHHHKKKKHHHHKK',
              '.KHHHHK....KKHHHHHHHHHHHHKK',
              '..KHHK.....KKHHHHHHHHHHHHKK',
              '...KK......KKHHHHHHHHHHHHKK',
              '...........KKHHHHHHHHHHHHKK',
              '.............KKHHHHHHHHKK..',
              '.............KKHHHHHHHHKK..',
              '...............KKHHHHKK....',
              '...............KKHHHHKK....',
              '.................KKKK......',
              '.................KKKK......'
            ]
          },
          exercises: [1]
        },
        {
          h: 'And scale by whole numbers only',
          p: ['×2, ×3, ×4. A game window that scales the art by 2.5 produces exactly the mess above, across every sprite at once, and players will see it as bad art rather than bad settings.',
              'Pick window sizes that are whole multiples of your resolution.'],
          exercises: [1, 10]
        }
      ]
    }
  ];

  function lesson(id) {
    for (var i = 0; i < LESSONS.length; i++) if (LESSONS[i].id === id) return LESSONS[i];
    return null;
  }
  function lessonsFor(unitId) {
    return LESSONS.filter(function (l) { return l.unit === unitId; });
  }

  return { LESSONS: LESSONS, lesson: lesson, lessonsFor: lessonsFor };
}));
