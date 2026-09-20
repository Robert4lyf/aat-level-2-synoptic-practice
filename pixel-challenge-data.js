/* Pixel art — the drawing challenges.
 *
 * WHY THIS FILE EXISTS INSTEAD OF A QUESTION BANK
 *
 * Every other subject in this app ends a lesson with questions that can be
 * marked. Drawing cannot be marked by a multiple choice, and a quiz about
 * pixel art measures whether you read the lesson, not whether you can put a
 * clean line down. So the unit ends with things to draw.
 *
 * THE SHAPE OF A CHALLENGE, and why each field is there.
 *
 *   brief   — one instruction, specific enough to start on immediately. "Draw
 *             a tree" is not a challenge; "a 16×16 tree in three colours, no
 *             outline" is.
 *   canvas  — the size and the colour budget, because both are constraints the
 *             lesson taught and both are where the learning is.
 *   check   — how to tell you have done it. Without this a challenge is
 *             homework with no marking scheme, and the honest answer to "am I
 *             finished?" is always yes.
 *   hints   — revealed one at a time, in order, and only if asked for. The
 *             first nudges, the second names the technique, the third says
 *             what to actually do. Anyone who opens all three immediately has
 *             turned the challenge into a tutorial, which is their call — but
 *             the default has to be the harder one.
 *
 * DIFFICULTY. Challenge 1 of a unit is doable straight after the first lesson;
 * challenge 10 is a small finished piece that needs everything in the unit at
 * once. scripts/check-pixel-course.js requires ten per ready unit, numbered 1
 * to 10, with `stage` never decreasing — so a challenge cannot quietly be
 * dropped in at the wrong place.
 *
 * EVERY CHALLENGE IS REFERENCED BY THE MATERIAL. The same check requires each
 * one to be named by at least one lesson card in its own unit, because a
 * challenge nobody is sent to is a challenge nobody does.
 */
(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.PixelChallenges = api;
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var CHALLENGES = [

    /* ── PX1 · The canvas and the pencil ─────────────────────────────────── */
    { unit: 'PX1', n: 1, stage: 1, title: 'A border and a diagonal',
      brief: 'New file, 16×16, RGB. Draw a one-pixel border all the way round the canvas edge, then a single line from the top-left pixel to the bottom-right.',
      canvas: '16×16 · 1 colour · 5 minutes',
      criteria: ['PX1.canvas', 'PX1.pencil'],
      check: 'The border is exactly one pixel thick the whole way round, with no gap at the corners, and the diagonal touches both corner pixels.',
      hints: [
        'The pencil is B. Check its size is 1 — a size-2 pencil draws a 2×2 block and you will not see it until you zoom in.',
        'You do not have to draw the border freehand. Hold Shift after placing a pixel and the pencil draws a straight line to where you click next.',
        'Turn on the pixel grid (View ▸ Show ▸ Pixel Grid) and zoom to about 1600%. The border is four Shift-lines; the diagonal is one.'
      ] },
    { unit: 'PX1', n: 2, stage: 1, title: 'An apple in three colours',
      brief: 'Draw a 16×16 apple: a dark outline, a body colour and one lighter colour. Pencil only — no eraser, no fill.',
      canvas: '16×16 · 3 colours · 15 minutes',
      criteria: ['PX1.pencil', 'PX1.canvas'],
      check: 'It reads as an apple at 100% zoom, and every pixel in it was placed deliberately rather than left over from a shape you changed your mind about.',
      hints: [
        'Outline first, then fill inside it. Working outline-first means the shape is decided before any of the colour is.',
        'Right-click paints with the background colour, which in a transparent file erases. That is the eraser you are allowed.',
        'Sixteen pixels is small: the stalk is one or two pixels, the leaf three or four. Draw the body as a circle that is slightly wider than it is tall, dent the top, and stop.'
      ] },
    { unit: 'PX1', n: 3, stage: 1, title: 'Hands off the toolbar',
      brief: 'Redraw the apple without clicking the toolbar or the palette once. Use only the keyboard and the canvas.',
      canvas: '16×16 · 3 colours · 10 minutes',
      criteria: ['PX1.keys'],
      check: 'You finished it, and you can now name the keys for pencil, eraser, eyedropper and colour swap without looking them up.',
      hints: [
        'Four keys carry almost everything: B, E, I and X.',
        'I is the eyedropper, but you rarely need it — holding Alt turns whatever tool you are holding into an eyedropper for as long as you hold it.',
        'X swaps foreground and background colour. With two colours loaded and Alt to pick a third off the canvas, the palette can stay shut.'
      ] },
    { unit: 'PX1', n: 4, stage: 1, title: 'Five dots on a big canvas',
      brief: 'New file, 64×64. Put a 3×3 dot in each corner and one in the exact centre, moving between them with zoom and pan rather than by scrolling out.',
      canvas: '64×64 · 1 colour · 10 minutes',
      criteria: ['PX1.view'],
      check: 'All five dots are 3×3, the corner dots touch the canvas edge, and the centre one is genuinely centred — check with View ▸ Show ▸ Grid set to 32×32.',
      hints: [
        'Zoom with the mouse wheel or the 1–6 keys; View ▸ Fit on Window pulls the whole canvas back into view.',
        'Pan by holding Space and dragging, exactly as in most editors. Doing it this way keeps your other hand on the pencil.',
        'A 64×64 canvas has no single centre pixel — it has a 2×2 centre. A 3×3 dot cannot be centred on it, so decide which way it leans and be consistent.'
      ] },
    { unit: 'PX1', n: 5, stage: 2, title: 'Three layers',
      brief: 'Rebuild the apple on three layers: outline, flat colour, and a background colour behind it. Hide and show each one in turn.',
      canvas: '16×16 · 3 colours · 15 minutes',
      criteria: ['PX1.layers'],
      check: 'Hiding the flat-colour layer leaves a complete outline with nothing missing, and hiding the outline leaves a complete silhouette.',
      hints: [
        'The timeline at the bottom is also the layer stack. The eye icon toggles visibility.',
        'Draw the outline on its own layer FIRST, then make a new layer beneath it for the fill. Filling on the layer below means you can be sloppy under the outline.',
        'If the fill layer looks full of holes with the outline hidden, you have been filling right up to the outline instead of under it. Run the fill a pixel past where the outline sits.'
      ] },
    { unit: 'PX1', n: 6, stage: 2, title: 'Same subject, two sizes',
      brief: 'Draw the same object — a mushroom, a coin, a book, your choice — twice: once at 8×8 and once at 32×32.',
      canvas: '8×8 and 32×32 · 4 colours · 25 minutes',
      criteria: ['PX1.canvas'],
      check: 'You can say what you had to remove to get to 8×8, and what you had to invent to fill 32×32.',
      hints: [
        'Do the 8×8 first. Going small after big is a series of deletions; going big after small is a series of decisions.',
        'At 8×8 an object gets about three shapes and two colours. Anything else is noise.',
        'If the 32×32 version is just the 8×8 one with more pixels doing the same job, it is too big for the subject. Add a second material or a form, not more outline.'
      ] },
    { unit: 'PX1', n: 7, stage: 2, title: 'Save it, then export it',
      brief: 'Save your 32×32 sprite as a .aseprite file. Then export it as a PNG at ×1 and again at ×6, and open both.',
      canvas: '32×32 · any colours · 10 minutes',
      criteria: ['PX1.save'],
      check: 'The ×6 PNG has hard square pixels with no blur or grey halo, and the .aseprite file still has your layers when you reopen it.',
      hints: [
        'Ctrl+S saves the working file. Export is a separate command — File ▸ Export, or Ctrl+Alt+Shift+S.',
        'The export dialog has a Resize field. ×6 there scales with nearest neighbour, which is what keeps pixels square.',
        'If the big PNG is blurry, something interpolated it — either you scaled it afterwards in another program, or you are looking at it in a viewer that smooths. Open it in Aseprite to be sure.'
      ] },
    { unit: 'PX1', n: 8, stage: 2, title: 'Transparent, and provably so',
      brief: 'Draw a 32×32 item with no background layer. Export it as a PNG and check it over two different background colours.',
      canvas: '32×32 · 4 colours · 15 minutes',
      criteria: ['PX1.save', 'PX1.layers'],
      check: 'On both backgrounds the edge is clean — no white fringe, no faint grey pixels round the outline.',
      hints: [
        'The checkerboard in Aseprite means transparent. If your sprite sits on flat white, you have a background layer.',
        'A fringe usually comes from anti-aliased tool edges. Check the tool options bar: the pencil, the bucket and the shape tools each have their own anti-aliasing toggle.',
        'Aseprite\'s own background colour behind the sprite is a view setting, not part of the file. Edit ▸ Preferences ▸ Background lets you change it to test contrast without touching the sprite.'
      ] },
    { unit: 'PX1', n: 9, stage: 3, title: 'Three icons, one sheet',
      brief: 'On a single 48×16 canvas, draw three 16×16 icons that belong to the same set — say a sword, a shield and a potion. Each icon on its own layer.',
      canvas: '48×16 · 5 colours · 30 minutes',
      criteria: ['PX1.layers', 'PX1.canvas'],
      check: 'The three read as a set: same outline weight, same colours, same amount of detail. Each sits inside its own 16-pixel cell with a clear margin.',
      hints: [
        'Set the grid to 16×16 (View ▸ Grid ▸ Grid Settings) so the cell boundaries are visible while you work.',
        'Draw them in the order hardest-first. The first icon sets the detail level and the other two have to match it, so you want that decision made on the difficult one.',
        'Leave at least one transparent pixel inside each cell on every side. An icon touching its cell edge will collide with its neighbour the moment anything crops or scales the sheet.'
      ] },
    { unit: 'PX1', n: 10, stage: 3, title: 'From a reference, not a trace',
      brief: 'Pick a real object in front of you. Block it at 32×32 in four colours, on layers, from looking rather than from an imported photo. Save and export both ways.',
      canvas: '32×32 · 4 colours · 45 minutes',
      criteria: ['PX1.canvas', 'PX1.pencil', 'PX1.layers', 'PX1.save'],
      check: 'Someone who can see the object recognises the sprite, and your file has layers, a saved .aseprite and a sharp exported PNG.',
      hints: [
        'Block the biggest shape first at one flat colour, and get its proportion right before anything else goes down.',
        'Squint at the object. What survives squinting is what fits in 32 pixels; what disappears is the detail you were about to waste twenty minutes on.',
        'If it will not come together, the proportions are wrong, not the detail. Hide every layer but the flat block and fix that shape.'
      ] },

    /* ── PX2 · Lines and shapes ──────────────────────────────────────────── */
    { unit: 'PX2', n: 1, stage: 1, title: 'Three slopes',
      brief: 'On a 32×32 canvas draw three lines: one at 1:1, one at 1:2 and one at 2:1. Keep every run the same length within each line.',
      canvas: '32×32 · 1 colour · 10 minutes',
      criteria: ['PX2.slope'],
      check: 'Counting along any line, the runs read 1,1,1,1… or 2,2,2,2… with no run of a different length anywhere, including at the ends.',
      hints: [
        '"1:2" means one pixel down for every two across — so runs of two, stepping down once each time.',
        'Count out loud as you draw. A slope goes wrong at the third step, not the first.',
        'The ends are where these fail. A line that runs 2,2,2,2,1 has a short run at the end and it will read as a kink. Either extend it or start one pixel further in.'
      ] },
    { unit: 'PX2', n: 2, stage: 1, title: 'Clean up a jaggy',
      brief: 'Draw a long diagonal freehand, as fast and sloppily as you can. Then, without undoing, repair it into even runs.',
      canvas: '48×24 · 1 colour · 15 minutes',
      criteria: ['PX2.jaggy', 'PX2.slope'],
      check: 'The repaired line has runs that are all the same length, or that change by one at most, and none of the original wobble is left.',
      hints: [
        'Read the line as numbers before you touch it: write down the run lengths from one end to the other.',
        'Pick the run length that appears most often. Every other run has to become that.',
        'Repair from one end, not from the middle outwards. Fixing the middle moves the problem to both sides at once.'
      ] },
    { unit: 'PX2', n: 3, stage: 1, title: 'Pixel-perfect, on and off',
      brief: 'Draw the same freehand curve twice — once with pixel-perfect mode off, once with it on. Zoom in and compare them pixel by pixel.',
      canvas: '32×32 · 1 colour · 10 minutes',
      criteria: ['PX2.perfect'],
      check: 'You can point at three specific pixels in the first curve that the second one does not have, and say why each was removable.',
      hints: [
        'Pixel-perfect lives in the tool options bar at the top when the pencil is selected.',
        'What it removes is the corner pixel in an L: where a line turns, the pixel at the elbow is doing nothing the two pixels either side are not already doing.',
        'It only works on a one-pixel pencil, and only while you drag. It will not repair a line you already drew.'
      ] },
    { unit: 'PX2', n: 4, stage: 2, title: 'A diamond',
      brief: 'Draw a 16×16 square standing on one corner — four 1:1 edges meeting at four points.',
      canvas: '16×16 · 1 colour · 10 minutes',
      criteria: ['PX2.slope', 'PX2.shape'],
      check: 'All four edges have identical runs, the four points are single pixels, and flipping the canvas horizontally changes nothing.',
      hints: [
        'Flip the sprite (Shift+H) to check symmetry. Anything that moves was not symmetrical.',
        'Draw one edge, then use Edit ▸ Copy and flip to make the other three. Hand-drawing all four is how three of them end up slightly different.',
        'A 16-wide diamond wants its points at pixel 8, which means the widest row is two pixels, not one. Decide that before you draw, or the top and bottom will disagree.'
      ] },
    { unit: 'PX2', n: 5, stage: 2, title: 'A quarter circle',
      brief: 'Draw a quarter-circle arc in a 16×16 space, by hand, with the pencil. No ellipse tool.',
      canvas: '16×16 · 1 colour · 15 minutes',
      criteria: ['PX2.curve'],
      check: 'Reading the runs from the flat end to the steep end they only ever get shorter: something like 5, 3, 2, 1, 1, 1. No run is longer than the one before it.',
      hints: [
        'A curve is a line whose run length changes. The rule is that it changes in one direction only.',
        'Start at the flattest part, where the runs are longest, and work towards the steep end.',
        'If you get 4, 2, 3, 1 the curve has a flat spot in the middle of a bend, which reads as a dent. Redistribute: 4, 3, 2, 1.'
      ] },
    { unit: 'PX2', n: 6, stage: 2, title: 'The 8-pixel circle',
      brief: 'Draw a circle that fits exactly in 8×8, from memory, with the pencil.',
      canvas: '8×8 · 1 colour · 5 minutes',
      criteria: ['PX2.round'],
      check: 'Top and bottom rows are four pixels wide, the two rows in from each end are six, and the middle four rows are full width with single pixels at both ends.',
      hints: [
        'At this size there is essentially one right answer, and every pixel artist has it memorised. Work it out once and you will have it too.',
        'Think of it as runs: 4, 6, 8, 8, 8, 8, 6, 4 — with the ends of each row aligned into a symmetrical shape.',
        'Aseprite\'s ellipse tool at 8×8 gives you a near-identical shape. Draw yours first, then compare — but do not skip drawing it.'
      ] },
    { unit: 'PX2', n: 7, stage: 2, title: 'Circle, then ellipse',
      brief: 'Draw a 16×16 circle by hand, then a 16×10 ellipse beside it. Both without the shape tools.',
      canvas: '32×16 · 1 colour · 20 minutes',
      criteria: ['PX2.round', 'PX2.curve'],
      check: 'Both are symmetrical on both axes, and the ellipse still reads as a squashed circle rather than a stadium shape with flat sides.',
      hints: [
        'Draw one quarter, then mirror it twice. That guarantees the symmetry you would otherwise have to check for.',
        'The 16-wide circle\'s top row is six pixels, not four. Going straight from the 8×8 shape by doubling everything gives a lumpy result.',
        'An ellipse that reads as flat-sided has too long a run at its widest point. Shorten the longest run and lengthen the one after it.'
      ] },
    { unit: 'PX2', n: 8, stage: 3, title: 'A leaf',
      brief: 'Draw a 24×24 leaf: two curves that meet at a point at each end, with a stem.',
      canvas: '24×24 · 2 colours · 25 minutes',
      criteria: ['PX2.curve', 'PX2.shape'],
      check: 'Each edge\'s runs change in one direction only right up to the tip, and the two tips are single pixels rather than blunt ends.',
      hints: [
        'The hard part is the tip. Two curves meeting need their last runs to be 1 and 1, or one will overshoot.',
        'Draw one half, mirror it, then break the symmetry deliberately by moving three or four pixels. A perfectly symmetrical leaf looks manufactured.',
        'Put the stem in last and make it one pixel wide. A two-pixel stem on a 24-pixel leaf is a branch.'
      ] },
    { unit: 'PX2', n: 9, stage: 3, title: 'Block a sword',
      brief: 'Draw a 32×32 sword as flat shapes only — blade, guard, grip, pommel — in one colour. Fix the silhouette before you add a second colour.',
      canvas: '32×32 · 1 then 3 colours · 30 minutes',
      criteria: ['PX2.shape'],
      check: 'The one-colour version is recognisable as a sword on its own. Only then does the second colour go in.',
      hints: [
        'Block the blade as a rectangle first and get its length against the grip right. Proportion is the whole job at this stage.',
        'The guard is what makes it a sword rather than a knife. Make it wider than you think — at 32 pixels, a two-pixel overhang either side disappears.',
        'If you have added colour and it still does not read, go back to one colour. Colour never fixes a shape problem; it hides it until someone looks at the thumbnail.'
      ] },
    { unit: 'PX2', n: 10, stage: 3, title: 'A potion bottle',
      brief: 'Draw a 32×32 potion bottle: straight neck, curved shoulders, round body, flat base, liquid inside. Every line clean.',
      canvas: '32×32 · 5 colours · 45 minutes',
      criteria: ['PX2.slope', 'PX2.curve', 'PX2.round', 'PX2.shape'],
      check: 'No run anywhere breaks its sequence, the bottle is symmetrical on the vertical axis, and the liquid line is dead horizontal.',
      hints: [
        'Vertical line, curve out, circle, flat line. Four different problems from this unit, in the order you have practised them.',
        'The shoulder is the difficult join: a straight neck meeting a curve needs the curve\'s first run to be short, or the join shows as a corner.',
        'Draw the left half only, then mirror. Fix any asymmetry in the source half and mirror again rather than patching the copy.'
      ] },

    /* ── PX3 · Colour ────────────────────────────────────────────────────── */
    { unit: 'PX3', n: 1, stage: 1, title: 'A grey ramp',
      brief: 'Draw five 8×8 swatches in a row, from near-black to near-white, with even steps of value between them.',
      canvas: '40×8 · 5 colours · 10 minutes',
      criteria: ['PX3.value', 'PX3.ramp'],
      check: 'Squint at the row: no two neighbouring swatches merge, and no single step jumps further than the others.',
      hints: [
        'Even steps means even in value, not even in the numbers you typed. 0, 25, 50, 75, 100 is a good start but your eye is the judge.',
        'Do not use pure black or pure white at the ends. Leave yourself room — you will want both later for a highlight or a hard shadow.',
        'The middle step is the one that goes wrong. Cover the outer two swatches and check the middle three are evenly spaced on their own.'
      ] },
    { unit: 'PX3', n: 2, stage: 1, title: 'Grey it out',
      brief: 'Take a sprite you have already coloured, duplicate the layer and desaturate the copy. Look at what your values are actually doing.',
      canvas: 'any · 10 minutes',
      criteria: ['PX3.value'],
      check: 'You can name at least one place where two colours you thought were different turned out to be the same value.',
      hints: [
        'Edit ▸ Adjustments ▸ Hue/Saturation, saturation to −100. Do it on a duplicate layer so the original is safe.',
        'What you are looking for is flatness: areas that separated by hue alone and now do not separate at all.',
        'Anywhere the greyscale version goes mushy, the colour version is relying on hue to do a value\'s job. It will fail on a small sprite or a colourblind viewer.'
      ] },
    { unit: 'PX3', n: 3, stage: 1, title: 'One material, four steps',
      brief: 'Build a four-step ramp for a single material — wood, stone, cloth, your choice — and paint a 16×16 swatch that uses all four.',
      canvas: '16×16 · 4 colours · 20 minutes',
      criteria: ['PX3.ramp'],
      check: 'The four steps have even value spacing, and laid next to each other they read as one material in four lights rather than four different materials.',
      hints: [
        'Pick the midtone first — the colour the material actually is — then build outwards in both directions.',
        'Four steps is usually light, midtone, shadow, deep shadow. The highlight is a fifth and is often better left out.',
        'If the darkest step looks like a different material, it has lost too much saturation. Dark does not mean grey.'
      ] },
    { unit: 'PX3', n: 4, stage: 2, title: 'Shift the hue',
      brief: 'Rebuild the same four-step ramp twice: once by only moving the brightness slider, once by shifting hue as well. Paint the same swatch with each.',
      canvas: '32×16 · 8 colours · 25 minutes',
      criteria: ['PX3.hue'],
      check: 'Side by side, the hue-shifted one looks lit and the brightness-only one looks flat — and you can say which way you shifted the lights and which way the darks.',
      hints: [
        'The usual move: warm towards the light, cool towards the shadow. Yellow-ward as it brightens, blue or purple-ward as it darkens.',
        'Shift by 15–30 degrees per step. Less than that does nothing; more turns your ramp into a rainbow.',
        'Raise saturation slightly in the midtone and drop it at the very lightest step. A highlight that stays fully saturated reads as glowing rather than lit.'
      ] },
    { unit: 'PX3', n: 5, stage: 2, title: 'Four colours, whole sprite',
      brief: 'Repaint an existing 16×16 or 32×32 sprite using exactly four colours, transparency not counted.',
      canvas: '16×16 or 32×32 · exactly 4 colours · 25 minutes',
      criteria: ['PX3.limit'],
      check: 'It still reads at 100% zoom, and every one of the four colours is doing a job you can name.',
      hints: [
        'Spend the four on value, not on hue. Four values of one hue reads; four hues of one value does not.',
        'The outline can be the darkest colour of the ramp rather than a colour of its own. That is one of the four bought back.',
        'If you are one colour short, the thing to cut is the highlight. It is the least load-bearing pixel on almost any small sprite.'
      ] },
    { unit: 'PX3', n: 6, stage: 2, title: 'One ramp, two materials',
      brief: 'Using a single four-step ramp, paint two objects that read as different materials — say a wooden handle and a stone head.',
      canvas: '32×16 · 4 colours · 30 minutes',
      criteria: ['PX3.limit'],
      check: 'They read as different materials, and you did it with where the values go rather than with extra colours.',
      hints: [
        'Material is mostly about contrast range and edge behaviour, not hue. Stone: broad soft steps. Metal: hard jumps from very dark to very light.',
        'Give one object only the top three steps and the other only the bottom three. The overlap is what ties them together.',
        'Texture with single pixels of a value already in the ramp — a scatter for stone, a grain line for wood.'
      ] },
    { unit: 'PX3', n: 7, stage: 2, title: 'Edit the swatch, watch it change',
      brief: 'Convert a sprite to indexed colour mode. Then edit one palette swatch and watch every pixel using it change at once.',
      canvas: 'any · 15 minutes',
      criteria: ['PX3.indexed'],
      check: 'You changed the mood of the whole sprite by editing two or three swatches, without painting a single pixel.',
      hints: [
        'Sprite ▸ Color Mode ▸ Indexed. The palette on the left is now the sprite\'s whole vocabulary.',
        'Double-click a swatch to open the colour picker for it. Every pixel using that index updates live.',
        'Try dragging the whole palette\'s hue at once: select all swatches, then Edit ▸ Adjustments ▸ Hue/Saturation. That is how a day palette becomes a night one.'
      ] },
    { unit: 'PX3', n: 8, stage: 2, title: 'Replace, do not repaint',
      brief: 'Change one colour everywhere in a sprite using the palette or Replace Color — not the bucket, and not by hand.',
      canvas: 'any · 10 minutes',
      criteria: ['PX3.indexed'],
      check: 'Every instance changed, including single stray pixels you had forgotten were there.',
      hints: [
        'Edit ▸ Replace Color, or in indexed mode simply edit the swatch.',
        'The bucket fills a contiguous region. It will always miss the isolated pixels, which is exactly where the old colour survives to annoy you later.',
        'Afterwards, check the palette for a now-unused swatch. The palette panel\'s options menu will strip the colours nothing uses, which tells you whether the replacement was complete.'
      ] },
    { unit: 'PX3', n: 9, stage: 3, title: 'Sixteen down to eight',
      brief: 'Take a sprite with sixteen or more colours and cut it to eight, keeping it readable.',
      canvas: 'any · exactly 8 colours · 35 minutes',
      criteria: ['PX3.limit', 'PX3.indexed'],
      check: 'Nothing important merged into its neighbour, and the sprite is no harder to read at 100% than it was with sixteen.',
      hints: [
        'Start by finding pairs of colours within a step of each other in value. Those are nearly free to merge.',
        'Work in indexed mode: remapping an index merges every pixel using it in one move.',
        'What you must not merge is anything either side of the sprite\'s main read — the focal point needs to keep its contrast even if everything else flattens.'
      ] },
    { unit: 'PX3', n: 10, stage: 3, title: 'Six colours, three materials',
      brief: 'Paint a 32×32 object made of three materials — say a lantern: metal, glass and flame — in six colours total.',
      canvas: '32×32 · exactly 6 colours · 50 minutes',
      criteria: ['PX3.value', 'PX3.ramp', 'PX3.hue', 'PX3.limit', 'PX3.mud'],
      check: 'All three materials read, the six colours form ramps that share steps, and the darks are still coloured rather than grey.',
      hints: [
        'Six colours across three materials means sharing. Build one main ramp of four and give each material two of its own at most.',
        'The light source material — the flame — gets the two colours nothing else uses, because it is the only thing that has to look like it emits.',
        'Check it in greyscale before you finish. If the glass and the metal have the same value, hue alone is carrying them and it will not hold up.'
      ] },

    /* ── PX4 · Light and form ────────────────────────────────────────────── */
    { unit: 'PX4', n: 1, stage: 1, title: 'Two faces of a box',
      brief: 'Draw a 24×24 box in three-quarter view. Pick a light direction and shade the top, the front and the side with three values.',
      canvas: '24×24 · 3 colours · 15 minutes',
      criteria: ['PX4.source'],
      check: 'The three faces have three distinct values, and you can point at where the light is coming from without having drawn it.',
      hints: [
        'Decide the light direction and write it down before any colour goes in. Upper-left is conventional and makes everything else easier to check.',
        'The face pointing most directly at the light is lightest. That is the entire rule for a flat face.',
        'Keep the steps even. If the top and the front are nearly the same value, the box flattens out into a hexagon.'
      ] },
    { unit: 'PX4', n: 2, stage: 1, title: 'A ball, lit',
      brief: 'Draw a 16×16 circle and shade it as a sphere with four values, light from the upper left.',
      canvas: '16×16 · 4 colours · 20 minutes',
      criteria: ['PX4.source', 'PX4.form'],
      check: 'The lightest area sits up and left of centre — not in the middle — and the value bands curve around the form rather than following the outline.',
      hints: [
        'The bands on a sphere are curved, and they are not concentric with the outline. They bunch towards the shadow side.',
        'Put the lightest pixel down first, off-centre towards the light. Everything else is placed relative to it.',
        'The terminator — the edge between lit and unlit — is a curve running roughly perpendicular to the light direction. Draw that line before filling either side.'
      ] },
    { unit: 'PX4', n: 3, stage: 1, title: 'Un-pillow it',
      brief: 'Deliberately pillow-shade a 16×16 ball — light in the middle, darkening evenly outwards. Then redraw it beside the first, lit from one direction.',
      canvas: '32×16 · 4 colours · 20 minutes',
      criteria: ['PX4.pillow'],
      check: 'Side by side the first one looks like a flat disc with a glow and the second looks like a ball, and you can explain why in one sentence.',
      hints: [
        'Pillow shading is what happens when the shading follows the outline inwards. It is not a style, it is the absence of a light source.',
        'Draw the first one quickly — the point is to have the wrong version in front of you, not to labour it.',
        'In the second, make sure at least one part of the outline is as dark as the darkest interior shadow. A ball lit from one side has a dark side that touches its edge.'
      ] },
    { unit: 'PX4', n: 4, stage: 2, title: 'Put it on the ground',
      brief: 'Add a cast shadow under your ball so it sits on a surface rather than floating.',
      canvas: '24×24 · 5 colours · 15 minutes',
      criteria: ['PX4.source', 'PX4.ao'],
      check: 'The shadow falls away from the light, touches the ball where the ball touches the ground, and is darkest at that contact point.',
      hints: [
        'A cast shadow is an ellipse squashed by the viewing angle, offset opposite the light.',
        'It must touch the object. A shadow with a gap under the object reads as the object hovering — which is exactly how you would animate a jump.',
        'Do not make it black. It is the ground colour, darkened — and it keeps the ground\'s hue.'
      ] },
    { unit: 'PX4', n: 5, stage: 2, title: 'Core shadow and bounce',
      brief: 'Take the 16×16 ball to five values: highlight, light, midtone, core shadow, and a lighter bounce along the bottom edge.',
      canvas: '16×16 · 5 colours · 25 minutes',
      criteria: ['PX4.form'],
      check: 'The darkest band is NOT at the very edge — there is a lighter rim below it where light has bounced back up off the ground.',
      hints: [
        'The core shadow is the darkest part of the form, and it sits just inside the shadow edge, not at the outline.',
        'The bounce light is subtle: one value lighter than the core shadow, along the bottom, one or two pixels thick.',
        'If the bounce reads as a second light source, it is too bright. It should never approach the value of the lit side.'
      ] },
    { unit: 'PX4', n: 6, stage: 2, title: 'Where two things meet',
      brief: 'Draw a 32×24 scene of a box sitting on a slab. Darken the seam where they meet, and only there.',
      canvas: '32×24 · 5 colours · 25 minutes',
      criteria: ['PX4.ao'],
      check: 'The darkened seam is one or two pixels at most, sits inside the shadow rather than on the lit side, and stops before it becomes an outline.',
      hints: [
        'Ambient occlusion is about geometry, not the light: the crevice is dark because less sky reaches it, whichever way the sun is.',
        'Keep it narrower than any other shadow in the sprite. An occlusion line as thick as the form shading turns into a black outline.',
        'It applies on the lit side too, but weakly. One pixel, one step darker — not the full shadow value.'
      ] },
    { unit: 'PX4', n: 7, stage: 2, title: 'A cylinder, no dithering',
      brief: 'Draw a 16×32 cylinder — a barrel or a can — shaded with four values and no dither anywhere.',
      canvas: '16×32 · 4 colours · 25 minutes',
      criteria: ['PX4.form'],
      check: 'The bands run vertically, are different widths, and the narrowest is the lightest one where the surface turns fastest towards the light.',
      hints: [
        'A cylinder\'s bands are parallel to its axis. The width of each band tells you how fast the surface is turning.',
        'The lightest band is narrow; the midtone is wide; the shadow is narrow again, with a bounce at the far edge.',
        'The top ellipse is a separate surface and gets its own value — usually lighter than any part of the side if the light is above.'
      ] },
    { unit: 'PX4', n: 8, stage: 3, title: 'Three dithers',
      brief: 'Draw a 48×16 slab and blend two colours across it three times: 50% checkerboard, a sparse scatter, and a 2×2 block pattern.',
      canvas: '48×16 · 2 colours · 30 minutes',
      criteria: ['PX4.dither'],
      check: 'All three blend at a distance; up close they look different; and you can say which one suits a 32-pixel sprite and which needs more room.',
      hints: [
        'A checkerboard is the strongest blend and the loudest texture. It needs space — on a small sprite it reads as noise.',
        'A sparse dither means scattered single pixels of the second colour, getting denser. It is the quietest, and the hardest to place well.',
        'Dither transitions want at least three or four pixels of width to read as a transition rather than as a mistake.'
      ] },
    { unit: 'PX4', n: 9, stage: 3, title: 'Break the bands',
      brief: 'Deliberately shade a curved surface with even bands that follow the outline, then fix the banding.',
      canvas: '32×32 · 4 colours · 30 minutes',
      criteria: ['PX4.band'],
      check: 'In the fixed version no shading boundary runs parallel to the outline for more than a few pixels, and the form reads better for it.',
      hints: [
        'Banding is a boundary that echoes the shape of the one next to it. The eye picks the repetition out instantly.',
        'Fix it by varying the width of each band along its length, not by moving the whole band.',
        'A few pixels of dither along the worst boundary breaks the line without changing the values. Use it sparingly — the widths are the real fix.'
      ] },
    { unit: 'PX4', n: 10, stage: 3, title: 'Stone and metal, one light',
      brief: 'Draw a 32×32 stone block with a metal ring set into it. One light source, full form shading, occlusion where the ring meets the stone, and dither only where it earns its place.',
      canvas: '32×32 · 7 colours · 60 minutes',
      criteria: ['PX4.source', 'PX4.form', 'PX4.ao', 'PX4.dither', 'PX4.band'],
      check: 'Both materials read, the light is consistent across both, the ring is clearly set INTO the stone rather than sitting on it, and no boundary bands.',
      hints: [
        'Metal is hard contrast — near-black next to near-white with little in between. Stone is soft — broad midtones and a narrow light.',
        'What sells "set into" is the occlusion line above the ring plus a lit edge on the lower inner rim of the hole.',
        'Do the stone first and fully. The ring is small and will tempt you into detail that the stone then has to compete with.'
      ] },

    /* ── PX5 · Reading at size ───────────────────────────────────────────── */
    { unit: 'PX5', n: 1, stage: 1, title: 'Black it out',
      brief: 'Take a sprite you have drawn, fill every non-transparent pixel with black, and look at it at 100%.',
      canvas: 'any · 1 colour · 10 minutes',
      criteria: ['PX5.sil'],
      check: 'You can say honestly whether the black shape alone identifies the object — and, if not, which part disappeared.',
      hints: [
        'Duplicate the layer, then Edit ▸ Adjustments ▸ Hue/Saturation with lightness at −100. That blackens the pixels that exist and leaves the transparency alone.',
        'Look at it small and briefly, not large and carefully. A fifth of a second is how long a sprite gets in a real game.',
        'Show it to someone else without saying what it is. Your own eye knows what it is meant to be and will supply the missing shape.'
      ] },
    { unit: 'PX5', n: 2, stage: 1, title: 'Fix the silhouette',
      brief: 'Redraw the sprite so its black silhouette alone identifies it. Change shape, not colour.',
      canvas: 'same as the original · 25 minutes',
      criteria: ['PX5.sil'],
      check: 'The new silhouette is identifiable without colour, and the change was to the outer shape rather than to anything inside it.',
      hints: [
        'Exaggerate the one feature that names the object: the spout on a teapot, the guard on a sword, the ears on a cat.',
        'Break up long straight edges. A silhouette made of two rectangles reads as a box whatever is painted inside it.',
        'Overlapping parts merge into a blob. Move the arm away from the body by one pixel and the whole thing resolves.'
      ] },
    { unit: 'PX5', n: 3, stage: 1, title: 'Down to sixteen',
      brief: 'Take a 32×32 sprite and redraw it at 16×16 — not resized, redrawn — keeping its identity.',
      canvas: '16×16 · 4 colours · 30 minutes',
      criteria: ['PX5.cut'],
      check: 'Both versions read as the same object, and you can list three details you dropped and one you replaced with a single pixel.',
      hints: [
        'Scale it down first as a rough guide layer, set it to low opacity, then redraw on top. Never ship the scaled version.',
        'One pixel can stand in for a whole feature: a single dark pixel is an eye, a buckle, a keyhole.',
        'Anything that was two pixels wide at 32 is gone at 16. Decide what it becomes before you find out by accident.'
      ] },
    { unit: 'PX5', n: 4, stage: 2, title: 'Anti-alias one curve',
      brief: 'Draw a single curved line on a flat background and anti-alias it by hand with one intermediate colour.',
      canvas: '32×32 · 3 colours · 20 minutes',
      criteria: ['PX5.aa'],
      check: 'The intermediate pixels sit in the corners where runs change length, they taper off as the runs get shorter, and there is never more than one per corner.',
      hints: [
        'Anti-aliasing goes on the INSIDE corner of a step, where the jump between run lengths is biggest.',
        'The intermediate colour is halfway in value between the line and the background. Pick it once and use only it.',
        'Where the runs are 1,1,1 — the steepest part — leave it alone. There is no corner to soften, and a pixel there just thickens the line.'
      ] },
    { unit: 'PX5', n: 5, stage: 2, title: 'Anti-alias a sprite',
      brief: 'Anti-alias the outer curves of a 32×32 sprite against its background, tapering the effect as the curve steepens.',
      canvas: '32×32 · 6 colours · 30 minutes',
      criteria: ['PX5.aa'],
      check: 'At 100% the curves look smooth; at 800% every added pixel is on a corner and none of them is a blur.',
      hints: [
        'Only the long shallow runs need it. Start there and stop when it stops helping.',
        'Anti-aliasing against a background you control is easy. Note which edges you could not do because the background will change in-game.',
        'If the sprite now looks soft rather than smooth, you have added a second intermediate pixel somewhere. One per corner.'
      ] },
    { unit: 'PX5', n: 6, stage: 2, title: 'With and without',
      brief: 'Draw the same 16×16 sprite twice: anti-aliased and not. Look at both at 100% on a plain background.',
      canvas: '32×16 · 5 colours · 25 minutes',
      criteria: ['PX5.aa-no'],
      check: 'You can say which one you would ship at this size and why — and the answer is allowed to be the un-anti-aliased one.',
      hints: [
        'At 16×16 the intermediate pixels are a significant fraction of the whole sprite. They soften it, which may or may not be what you want.',
        'Against a background that changes, the intermediate pixels become a halo of the wrong colour. That is the real cost.',
        'Fast-moving sprites are never seen still. Anti-aliasing a run cycle is detail nobody will ever resolve.'
      ] },
    { unit: 'PX5', n: 7, stage: 2, title: 'Three outlines',
      brief: 'Draw the same sprite three times: with a black outline, a dark-hue outline, and a selective outline that drops away on the lit side.',
      canvas: '48×16 · 6 colours · 30 minutes',
      criteria: ['PX5.outline'],
      check: 'You can name a game each of the three would suit, and say what each one costs.',
      hints: [
        'A black outline reads at any size against any background, and flattens the form. It is a legibility decision, not a lazy one.',
        'A coloured outline is the same colour family as what it surrounds, a few steps darker. It keeps the form and loses some separation.',
        'A selective outline thins or vanishes where the light hits. It is the most three-dimensional and the hardest to keep readable.'
      ] },
    { unit: 'PX5', n: 8, stage: 3, title: 'Drop the outline in the light',
      brief: 'Take an outlined 32×32 sprite and remove the outline entirely from the lit side, replacing it with the sprite\'s own light values.',
      canvas: '32×32 · 6 colours · 30 minutes',
      criteria: ['PX5.outline'],
      check: 'The lit edge still reads against the background, and the sprite looks rounder than it did.',
      hints: [
        'Remove, then repair: the pixels the outline occupied still need to be the sprite, not transparent.',
        'Keep the outline everywhere the form turns away from the light. The transition between outlined and not should be gradual.',
        'If the lit edge now disappears against a light background, the sprite is not ready for that background. Either keep a thin outline or raise the contrast of the lit edge.'
      ] },
    { unit: 'PX5', n: 9, stage: 3, title: 'Send the eye somewhere',
      brief: 'Draw a 32×32 sprite in which the highest contrast in the whole image is at one deliberately chosen point.',
      canvas: '32×32 · 6 colours · 40 minutes',
      criteria: ['PX5.focus'],
      check: 'Looking away and back, your eye lands on the chosen point first, every time.',
      hints: [
        'Contrast means value contrast. The brightest pixel next to the darkest pixel is where the eye goes.',
        'Getting focus is as much about lowering contrast everywhere else as about raising it at the focal point.',
        'Saturation and detail density are a secondary pull. Put the most saturated colour and the busiest pixels in the same place as the contrast.'
      ] },
    { unit: 'PX5', n: 10, stage: 3, title: 'A character bust',
      brief: 'Draw a 32×32 character head and shoulders: silhouette-tested, a selective outline, anti-aliasing on two curves only, and the highest contrast at the eyes.',
      canvas: '32×32 · 8 colours · 60 minutes',
      criteria: ['PX5.sil', 'PX5.aa', 'PX5.aa-no', 'PX5.outline', 'PX5.focus', 'PX5.cut'],
      check: 'It passes the black-fill test, it reads at 100%, and the first thing you see is the eyes.',
      hints: [
        'The silhouette of a head is mostly hair and shoulder line. Those are where the character is, not the face.',
        'Eyes at this size are one or two pixels. Their contrast against the skin is what makes them read, not their shape.',
        'Anti-alias the jaw and the top of the head only. Everything else at this size is better left hard.'
      ] },

    /* ── PX6 · Animation ─────────────────────────────────────────────────── */
    { unit: 'PX6', n: 1, stage: 1, title: 'A blink',
      brief: 'Take a face sprite and make it blink: an open frame held long, a closed frame held briefly. Two frames.',
      canvas: 'any · 2 frames · 10 minutes',
      criteria: ['PX6.frames'],
      check: 'Played on loop it blinks rather than flickers — the open frame is at least ten times the duration of the closed one.',
      hints: [
        'Add a frame with Alt+N, or the + in the timeline. Duplicating the current frame first saves redrawing the face.',
        'Frame duration is set per frame: right-click the frame in the timeline, or drag its edge.',
        'A blink is 2 frames at about 60–80ms, in a cycle two or three seconds long. Anything faster reads as a glitch.'
      ] },
    { unit: 'PX6', n: 2, stage: 1, title: 'A flickering torch',
      brief: 'Four frames of a flame, tagged as a loop, running at a speed that reads as fire rather than as a strobe.',
      canvas: '16×16 · 4 frames · 25 minutes',
      criteria: ['PX6.frames', 'PX6.tags'],
      check: 'The loop has no frame you notice as "the one where it jumps", and the tag plays on its own without the rest of the file.',
      hints: [
        'Select a range of frames in the timeline and right-click ▸ New Tag. Name it, and set its loop direction.',
        'Fire moves upward and inward. The base barely changes; the tip changes most.',
        'Frames 1 and 4 need to be as different from each other as 1 and 2 are, or the loop point will stick out.'
      ] },
    { unit: 'PX6', n: 3, stage: 1, title: 'The in-between',
      brief: 'Draw frames 1 and 3 of a simple motion, then use onion skinning to draw frame 2 between them.',
      canvas: '32×32 · 3 frames · 20 minutes',
      criteria: ['PX6.onion'],
      check: 'Played through, frame 2 sits on the path between the other two rather than off to one side.',
      hints: [
        'Onion skinning is the icon at the top-left of the timeline. Turn it on and set it to show one frame either side.',
        'The previous and next frames are tinted differently. Your job is to sit between the two tints, not on either.',
        'Drawing the key frames first and the in-between second is the whole technique. Animating straight through from frame 1 drifts.'
      ] },
    { unit: 'PX6', n: 4, stage: 2, title: 'A bouncing ball',
      brief: 'Six frames of a ball bouncing once. Wide spacing where it moves fast, tight spacing at the top of the arc.',
      canvas: '48×48 · 6 frames · 35 minutes',
      criteria: ['PX6.spacing'],
      check: 'With onion skinning on all frames at once, the positions trace an arc, and the gaps are visibly wider near the ground than at the top.',
      hints: [
        'Plot the positions before drawing anything: six dots along an arc, spaced by how fast the ball is going at each point.',
        'A ball slows at the top of its arc, so frames bunch there. It is fastest at the bottom, so they spread.',
        'Aseprite will show all onion frames at once if you raise the range. Use that to check the arc before you commit.'
      ] },
    { unit: 'PX6', n: 5, stage: 2, title: 'Squash and stretch',
      brief: 'Add squash on impact and stretch in the fast parts of your bouncing ball, keeping its area roughly constant.',
      canvas: '48×48 · 6–8 frames · 30 minutes',
      criteria: ['PX6.squash'],
      check: 'The squashed ball is wider as much as it is shorter, and the stretched one is narrower as much as it is longer.',
      hints: [
        'Squash only on the contact frame, and only for one frame. Two frames of squash reads as rubber.',
        'Stretch along the direction of travel — a falling ball stretches vertically, not horizontally.',
        'If it starts to look like a balloon, the volume is wrong. Count the pixels: a 10-wide, 6-tall squash should come from a 8×8 ball, not a 10×10 one.'
      ] },
    { unit: 'PX6', n: 6, stage: 2, title: 'A spinning coin',
      brief: 'Four frames of a coin spinning on its axis: full face, narrow, edge, narrow. Loop it.',
      canvas: '16×16 · 4 frames · 30 minutes',
      criteria: ['PX6.frames', 'PX6.tags', 'PX6.spacing'],
      check: 'It reads as a spin rather than as a coin being squashed, and the edge frame is held for less time than the face frame.',
      hints: [
        'The face frame is what identifies the object, so it gets the longest duration. The edge frame is nearly invisible in motion.',
        'The narrow frame is the hard one: it needs enough of the face design left to be the same coin.',
        'A one-pixel-wide edge frame is often better as two pixels with the rim highlight. A single line disappears.'
      ] },
    { unit: 'PX6', n: 7, stage: 2, title: 'Breathing',
      brief: 'A four-frame idle: the whole character moves no more than two pixels, and it still reads as alive.',
      canvas: '32×32 · 4 frames · 35 minutes',
      criteria: ['PX6.spacing', 'PX6.frames'],
      check: 'Looped, it does not appear to jitter or slide, and nothing moves in a way you would not notice if it stopped.',
      hints: [
        'Move the chest and head up on two frames and back down on two. The feet do not move at all.',
        'Offset the head from the chest by a frame. Everything moving together reads as the sprite bobbing rather than breathing.',
        'Idle frames want long durations — 150–200ms each. Fast idle animation is the most common way a sprite looks nervous.'
      ] },
    { unit: 'PX6', n: 8, stage: 3, title: 'A four-frame walk',
      brief: 'Build a walk cycle from two contact poses and two passing poses. Four frames, looping.',
      canvas: '32×32 · 4 frames · 50 minutes',
      criteria: ['PX6.cycle'],
      check: 'The contacts carry the weight — the body is at its lowest on them — and left and right steps are distinguishable rather than mirrored copies.',
      hints: [
        'Draw both contacts first. They are the poses that say "walk"; the passes are just what happens between them.',
        'The body rises on the passing pose and drops on the contact. That one or two pixels of vertical movement is what makes it a walk rather than a slide.',
        'Mirroring the first two frames gives you the second two almost free — but shift the arms, or the cycle will look mechanical.'
      ] },
    { unit: 'PX6', n: 9, stage: 3, title: 'Eight frames of run',
      brief: 'An eight-frame run cycle with a visible airborne frame and weight on the landings.',
      canvas: '32×32 · 8 frames · 75 minutes',
      criteria: ['PX6.cycle', 'PX6.spacing', 'PX6.squash'],
      check: 'There is a frame where neither foot touches the ground, the body drops noticeably on each landing, and it loops without a hitch.',
      hints: [
        'A run differs from a walk in one thing: both feet leave the ground. Everything else follows from that.',
        'Lean the body forward. A run with a vertical spine reads as a fast walk.',
        'The landing frame takes the compression — lowest body position, most bent leg. Give it slightly more duration than its neighbours.'
      ] },
    { unit: 'PX6', n: 10, stage: 3, title: 'Ship the sheet',
      brief: 'Export the run cycle as a horizontal spritesheet with JSON data, then check the frame order and cell size in the output.',
      canvas: '32×32 × 8 frames · 20 minutes',
      criteria: ['PX6.export'],
      check: 'The sheet has eight equal cells in the right order, the JSON names your tag with the right frame range, and the PNG has no trimmed or padded cells you did not ask for.',
      hints: [
        'File ▸ Export Sprite Sheet. Type: Horizontal Strip to start with; packed layouts are harder to debug.',
        'Turn on "JSON Data" and pick Array or Hash. Tags are included, which is how an engine finds your run cycle by name.',
        'Watch the Trim and Border Padding options. Trimming makes cells different sizes, which most engines cannot use without the JSON.'
      ] }
  ];

  function forUnit(unitId) {
    return CHALLENGES.filter(function (c) { return c.unit === unitId; })
      .sort(function (a, b) { return a.n - b.n; });
  }
  /* A challenge's id is its unit and number, built rather than stored: two
     fields that must agree are two fields that can disagree. */
  function id(c) { return c.unit + '-c' + c.n; }
  function get(unitId, n) {
    for (var i = 0; i < CHALLENGES.length; i++) {
      if (CHALLENGES[i].unit === unitId && CHALLENGES[i].n === n) return CHALLENGES[i];
    }
    return null;
  }

  return { CHALLENGES: CHALLENGES, forUnit: forUnit, get: get, id: id };
}));
