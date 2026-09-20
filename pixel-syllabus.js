/* Pixel art — the technical skeleton the units are checked against.
 *
 * WHAT THIS IS NOT: a curriculum borrowed from anywhere. Pixel art has no exam
 * board, and the tutorials that circulate hardest are the ones with the best
 * screenshots rather than the ones with the best order. So these criteria are
 * written from scratch, arranged in the order the skills actually depend on
 * each other: you cannot judge a shading ramp before you can judge a value, and
 * you cannot judge a value while your lines are still fighting you.
 *
 * WHAT IT IS FOR: coverage. Every criterion here must be claimed by a lesson,
 * and no lesson may claim a criterion that is not here — checked by
 * scripts/check-pixel-course.js. That catches the failure this file exists to
 * prevent: a course that accumulates by whatever was interesting to write next
 * and leaves a hole nobody notices until someone hits it.
 *
 * ASEPRITE. The course teaches the craft and uses Aseprite to do it, so a
 * criterion names the program only where the program is the point — palette
 * handling, pixel-perfect mode, onion skinning, export. Everything else would
 * be true in any editor, and saying so keeps the reader's skill portable.
 * Shortcuts are given for Aseprite's defaults; anyone who has remapped them
 * knows they have.
 *
 * IDs are stable and referenced from pixel-learn-data.js and
 * pixel-challenge-data.js. Renaming one is a content migration, not a tidy-up.
 */
(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.PixelSyllabus = api;
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* Strands. T is the tool and the file, D is drawing, C is colour and light,
     R is reading — how the thing looks to someone who is not you, A is
     animation, and E is the environment a sprite stands in. A criterion belongs to exactly one strand, and its id carries
     the unit rather than the strand, because the units are what a reader
     navigates. */
  var STRANDS = {
    T: { name: 'Tool', desc: 'Aseprite, and the file you leave behind' },
    D: { name: 'Drawing', desc: 'Where the pixels go' },
    C: { name: 'Colour', desc: 'Value, hue and light' },
    R: { name: 'Reading', desc: 'What someone else sees' },
    A: { name: 'Animation', desc: 'What happens over time' },
    E: { name: 'Environments', desc: 'What the world is built out of' }
  };

  /* stage is rough difficulty: 1 is a first sprite, 2 is someone with a few
     dozen behind them, 3 is work that holds up next to a released game. Used to
     order the course, not to certify anything. */
  var CRITERIA = [
    /* ── PX1 · The canvas and the pencil ─────────────────────────────────── */
    { id: 'PX1.canvas',  strand: 'T', stage: 1, unit: 'PX1',
      text: 'Choose a canvas size that suits the subject, and say why that size and not double it' },
    { id: 'PX1.pencil',  strand: 'T', stage: 1, unit: 'PX1',
      text: 'Draw with a one-pixel pencil, with no brush softness, opacity or blending anywhere in the file' },
    { id: 'PX1.view',    strand: 'T', stage: 1, unit: 'PX1',
      text: 'Move around the canvas at speed: zoom, pan, fit to window, and the pixel grid' },
    { id: 'PX1.keys',    strand: 'T', stage: 1, unit: 'PX1',
      text: 'Reach the pencil, eraser, eyedropper, selection and colour swap without leaving the canvas' },
    { id: 'PX1.layers',  strand: 'T', stage: 1, unit: 'PX1',
      text: 'Separate a sprite into layers that can be moved and hidden independently' },
    { id: 'PX1.save',    strand: 'T', stage: 1, unit: 'PX1',
      text: 'Keep a working .aseprite file and export a PNG that stays sharp when scaled up' },

    /* ── PX2 · Lines and shapes ──────────────────────────────────────────── */
    { id: 'PX2.jaggy',   strand: 'D', stage: 1, unit: 'PX2',
      text: 'Spot a jaggy — a line whose run lengths jump about — by reading the runs, not by squinting' },
    { id: 'PX2.slope',   strand: 'D', stage: 1, unit: 'PX2',
      text: 'Draw a straight diagonal as an even run of steps, at 1:1, 1:2 or 2:1' },
    { id: 'PX2.perfect', strand: 'D', stage: 1, unit: 'PX2',
      text: 'Use pixel-perfect mode, and say what it removes and when it gets in the way' },
    { id: 'PX2.curve',   strand: 'D', stage: 2, unit: 'PX2',
      text: 'Draw a curve whose run lengths change in one direction only' },
    { id: 'PX2.round',   strand: 'D', stage: 2, unit: 'PX2',
      text: 'Draw circles and ellipses that still read as round at sixteen pixels across' },
    { id: 'PX2.shape',   strand: 'D', stage: 2, unit: 'PX2',
      text: 'Block a subject as flat shapes first, and correct the shape before adding anything inside it' },

    /* ── PX3 · Colour ────────────────────────────────────────────────────── */
    { id: 'PX3.value',   strand: 'C', stage: 1, unit: 'PX3',
      text: 'Judge a colour by its value first, and check a sprite in greyscale' },
    { id: 'PX3.ramp',    strand: 'C', stage: 1, unit: 'PX3',
      text: 'Build a ramp of three to five steps for one material, with even value spacing' },
    { id: 'PX3.hue',     strand: 'C', stage: 2, unit: 'PX3',
      text: 'Shift hue as value changes rather than only raising and lowering brightness' },
    { id: 'PX3.limit',   strand: 'C', stage: 2, unit: 'PX3',
      text: 'Work inside a fixed palette, reusing one ramp across materials rather than adding a new one' },
    { id: 'PX3.indexed', strand: 'C', stage: 2, unit: 'PX3',
      text: 'Use Aseprite\'s palette: indexed mode, editing a swatch, and replacing a colour everywhere at once' },
    { id: 'PX3.mud',     strand: 'C', stage: 2, unit: 'PX3',
      text: 'Keep saturation in the dark end of a ramp so shadows stay coloured rather than grey' },

    /* ── PX4 · Light and form ────────────────────────────────────────────── */
    { id: 'PX4.source',  strand: 'C', stage: 1, unit: 'PX4',
      text: 'Fix one light source and keep every face of every form consistent with it' },
    { id: 'PX4.form',    strand: 'C', stage: 2, unit: 'PX4',
      text: 'Shade for form: lit face, midtone, core shadow, and the bounce underneath' },
    { id: 'PX4.pillow',  strand: 'C', stage: 1, unit: 'PX4',
      text: 'Recognise pillow shading — light following the outline inwards — and rebuild it around a direction' },
    { id: 'PX4.ao',      strand: 'C', stage: 2, unit: 'PX4',
      text: 'Darken the seam where two forms meet, and keep it narrower than the shadow it sits in' },
    { id: 'PX4.dither',  strand: 'C', stage: 2, unit: 'PX4',
      text: 'Dither between two colours of a ramp, choosing a pattern the sprite is big enough to carry' },
    { id: 'PX4.band',    strand: 'C', stage: 3, unit: 'PX4',
      text: 'Spot banding — a shading step drawn parallel to the outline — and break it' },

    /* ── PX5 · Reading at size ───────────────────────────────────────────── */
    { id: 'PX5.sil',     strand: 'R', stage: 1, unit: 'PX5',
      text: 'Test a sprite as a solid silhouette, and fix what cannot be identified from it' },
    { id: 'PX5.aa',      strand: 'R', stage: 2, unit: 'PX5',
      text: 'Anti-alias a curve by hand: one intermediate pixel, tapered with the run length' },
    { id: 'PX5.aa-no',   strand: 'R', stage: 2, unit: 'PX5',
      text: 'Leave anti-aliasing off where it costs more than it buys — tiny sprites, cut-out edges, fast motion' },
    { id: 'PX5.outline', strand: 'R', stage: 2, unit: 'PX5',
      text: 'Choose between a black, a coloured and a selective outline, and say what each buys' },
    { id: 'PX5.focus',   strand: 'R', stage: 3, unit: 'PX5',
      text: 'Keep the highest contrast at the point you want read first, and lower it everywhere else' },
    { id: 'PX5.cut',     strand: 'R', stage: 2, unit: 'PX5',
      text: 'Cut detail that does not survive at 1:1, and suggest it with a single pixel instead' },

    /* ── PX6 · Animation ─────────────────────────────────────────────────── */
    { id: 'PX6.frames',  strand: 'A', stage: 1, unit: 'PX6',
      text: 'Build frames in the timeline, set their durations, and play the loop at its real speed' },
    { id: 'PX6.onion',   strand: 'A', stage: 1, unit: 'PX6',
      text: 'Use onion skinning to place a frame against the ones either side of it' },
    { id: 'PX6.tags',    strand: 'A', stage: 1, unit: 'PX6',
      text: 'Tag a sequence, set its loop direction, and preview one tag on its own' },
    { id: 'PX6.spacing', strand: 'A', stage: 2, unit: 'PX6',
      text: 'Control speed with spacing: wide gaps for fast, tight gaps for slow, and an arc rather than a line' },
    { id: 'PX6.squash',  strand: 'A', stage: 2, unit: 'PX6',
      text: 'Squash and stretch a moving form while keeping its area roughly constant' },
    { id: 'PX6.cycle',   strand: 'A', stage: 3, unit: 'PX6',
      text: 'Build a walk cycle from its key poses, and keep the contact frames doing the work' },
    { id: 'PX6.export',  strand: 'A', stage: 2, unit: 'PX6',
      text: 'Export a spritesheet with a frame order, a layout and a JSON the engine can read' },

    /* ── PX7 · Tiles and environments ────────────────────────────────────
       The first six units make a sprite. None of them make the thing a sprite
       stands on, and a tile is not simply a small sprite: it is one whose four
       edges have to agree with their neighbours, including with itself. */
    { id: 'PX7.grid',    strand: 'E', stage: 1, unit: 'PX7',
      text: 'Set a tile size, work to that grid, and keep every canvas a whole number of tiles' },
    { id: 'PX7.seam',    strand: 'E', stage: 2, unit: 'PX7',
      text: 'Draw a tile that repeats without a visible seam, testing it tiled rather than on its own' },
    { id: 'PX7.repeat',  strand: 'E', stage: 2, unit: 'PX7',
      text: 'Spot a repeated feature — a landmark that turns a field of tiles into a grid — and move it out' },
    { id: 'PX7.tileset', strand: 'E', stage: 2, unit: 'PX7',
      text: 'Build a terrain set: one fill, four edges, and the corners that let it meet another terrain' },
    { id: 'PX7.tilemap', strand: 'E', stage: 2, unit: 'PX7',
      text: 'Use an Aseprite tilemap layer and its tileset, so editing one tile changes every placement' },
    { id: 'PX7.depth',   strand: 'E', stage: 3, unit: 'PX7',
      text: 'Separate background, midground and foreground by contrast and detail rather than by outline' },
    { id: 'PX7.deco',    strand: 'E', stage: 3, unit: 'PX7',
      text: 'Break a field of tiles with decorative tiles placed in clumps rather than evenly' },

    /* ── PX8 · Proportion, projection and transforms ──────────────────────
       The first seven units draw things flat and from one angle, and never
       say how big a head is. This is the unit that was missing when someone
       asked whether the course covered its ground. */
    { id: 'PX8.proportion', strand: 'D', stage: 2, unit: 'PX8',
      text: 'Build a figure on a head count you chose, and hold that count across every pose' },
    { id: 'PX8.landmark',   strand: 'D', stage: 2, unit: 'PX8',
      text: 'Place the eyeline, the shoulder line and the waist before any detail goes in' },
    { id: 'PX8.views',      strand: 'D', stage: 3, unit: 'PX8',
      text: 'Draw one object top-down, side-on and three-quarter, and keep the three agreeing' },
    { id: 'PX8.iso',        strand: 'D', stage: 2, unit: 'PX8',
      text: 'Work on a 2:1 isometric grid: what the ratio means in pixels, and the tile it makes' },
    { id: 'PX8.isocube',    strand: 'D', stage: 3, unit: 'PX8',
      text: 'Build a form on that grid whose three faces read as one solid under one light' },
    { id: 'PX8.transform',  strand: 'T', stage: 2, unit: 'PX8',
      text: 'Flip, turn by ninety degrees and stamp a selection, knowing which of those lose nothing' },
    { id: 'PX8.symmetry',   strand: 'T', stage: 2, unit: 'PX8',
      text: 'Use symmetry mode, then break the symmetry by hand so the result is not a mirror' },

    /* ── PX9 · Effects and shipping ──────────────────────────────────────
       PX6 gets a character walking. This is what a game actually needs next:
       the frames that sell a hit, and the file an engine can anchor to. */
    { id: 'PX9.anticipate', strand: 'A', stage: 2, unit: 'PX9',
      text: 'Give an action an anticipation frame that moves opposite to the action' },
    { id: 'PX9.impact',     strand: 'A', stage: 2, unit: 'PX9',
      text: 'Build the one or two frames that sell a hit, and hold them longer than their neighbours' },
    { id: 'PX9.smear',      strand: 'A', stage: 3, unit: 'PX9',
      text: 'Carry fast motion with a smear that spans where the pose was and where it is going' },
    { id: 'PX9.secondary',  strand: 'A', stage: 3, unit: 'PX9',
      text: 'Let cloth, hair or a tail lag the body and settle after it has stopped' },
    { id: 'PX9.particle',   strand: 'A', stage: 2, unit: 'PX9',
      text: 'Animate a burst that grows and breaks up, rather than one that fades out' },
    { id: 'PX9.pivot',      strand: 'T', stage: 2, unit: 'PX9',
      text: 'Give every frame of a sequence one origin an engine can anchor to' },
    { id: 'PX9.slice',      strand: 'T', stage: 2, unit: 'PX9',
      text: 'Mark regions with slices, including a nine-slice panel, and export them with the sheet' },
    { id: 'PX9.density',    strand: 'T', stage: 1, unit: 'PX9',
      text: 'Keep one pixel density across a project, and scale only by whole numbers' }
  ];

  /* Units, in teaching order. The order of this array IS the teaching order,
     and scripts/check-pixel-course.js reads it to decide whether a technique
     was introduced before a challenge asked for it. */
  var UNITS = [
    { id: 'PX1', title: 'The canvas and the pencil', strand: 'T', icon: '🖱️', ready: true,
      blurb: 'Set Aseprite up so it stops fighting you, and leave a file you can open again.' },
    { id: 'PX2', title: 'Lines and shapes',          strand: 'D', icon: '📐', ready: true,
      blurb: 'The run length is the unit of pixel art. Everything in this unit is counting them.' },
    { id: 'PX3', title: 'Colour',                    strand: 'C', icon: '🎨', ready: true,
      blurb: 'Value first, hue second, and a palette small enough to hold in your head.' },
    { id: 'PX4', title: 'Light and form',            strand: 'C', icon: '💡', ready: true,
      blurb: 'One light, and every surface answering to it.' },
    { id: 'PX5', title: 'Reading at size',           strand: 'R', icon: '👁️', ready: true,
      blurb: 'A sprite is read in a fifth of a second, at 1:1, next to twenty others.' },
    { id: 'PX6', title: 'Animation',                 strand: 'A', icon: '🏃', ready: true,
      blurb: 'Frames, timing and the two or three poses that carry the whole motion.' },
    { id: 'PX7', title: 'Tiles and environments',    strand: 'E', icon: '🧱', ready: true,
      blurb: 'A tile is a sprite whose four edges have to agree with their neighbours — and with itself.' },
    { id: 'PX8', title: 'Proportion and projection',  strand: 'D', icon: '📐', ready: true,
      blurb: 'How big a head is, what the object looks like from the other side, and moving pixels without wrecking them.' },
    { id: 'PX9', title: 'Effects and shipping',       strand: 'A', icon: '💥', ready: true,
      blurb: 'The frames that sell a hit, and the file an engine can actually anchor to.' }
  ];

  function criteriaFor(unitId) {
    return CRITERIA.filter(function (c) { return c.unit === unitId; });
  }
  function criterion(id) {
    for (var i = 0; i < CRITERIA.length; i++) if (CRITERIA[i].id === id) return CRITERIA[i];
    return null;
  }
  function unit(id) {
    for (var i = 0; i < UNITS.length; i++) if (UNITS[i].id === id) return UNITS[i];
    return null;
  }
  function readyUnits() {
    return UNITS.filter(function (u) { return u.ready; });
  }

  return {
    STRANDS: STRANDS,
    CRITERIA: CRITERIA,
    UNITS: UNITS,
    criteriaFor: criteriaFor,
    criterion: criterion,
    unit: unit,
    readyUnits: readyUnits
  };
}));
