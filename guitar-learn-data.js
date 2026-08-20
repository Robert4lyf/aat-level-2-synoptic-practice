/* Unit P1 — the hand.
 *
 * THE FORMAT, and why it is this shape.
 *
 * Every card carries something to play. Not as a test at the end of an
 * explanation, but as the body of the card: the prose says what to notice, the
 * element is the thing you do while noticing it. A card with only words in it
 * fails scripts/check-guitar-quality.js, which is the rule that keeps this
 * format honest under pressure to explain more.
 *
 * Prose is capped at 80 words per element and 600 per card, with a floor of 150
 * per lesson. The cap is the load-bearing one. Anything a player needs to know
 * about a stroke fits in forty words; past that the writing has started
 * describing the guitar instead of pointing at what the hands are doing, and
 * the reader has stopped playing to read it.
 *
 * VOICE. Imperative throughout — "let the finger fall", not "you'll want to let
 * the finger fall". No first person plural. The hands are the fretting hand and
 * the picking hand, never left and right, because roughly one player in ten
 * reads those words backwards and a course that says "left hand" has quietly
 * decided who it is for. One lesson is allowed to break that rule and it is not
 * in this unit.
 *
 * CRITERIA. Each lesson claims ids from guitar-syllabus.js, and
 * scripts/check-guitar-coverage.js requires every criterion in a ready unit to
 * be claimed by something. That is the check that catches a unit which reads
 * well and teaches around a hole.
 */
(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.GuitarLearnData = api;
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var LESSONS = [

    /* ─────────────────────────────────────────────────────────────────────
       P1.1 — Sitting down with it
       ───────────────────────────────────────────────────────────────────── */
    {
      id: 'p1-l1', strand: 'P', unit: 'P1', instrument: 'any',
      title: 'Sitting down with it',
      icon: '🪑',
      criteria: ['P1.posture'],
      summary: 'Get the instrument into a position both hands can reach without holding it up.',
      cards: [
        {
          h: 'Let the guitar sit still',
          p: ['The picking hand should be free to move. If it is also stopping the guitar sliding, ' +
              'it has two jobs and will do the second one badly.',
              'Play the open basses below. The guitar should stay where it is when the hand lifts off.'],
          playalong: { exercise: 'p1-sit-settle', loop: true,
                       note: 'Lift the picking hand clear between bars. Nothing should shift.' }
        },
        {
          h: 'Height before angle',
          p: ['Raise the neck until the fretting hand reaches the first fret without the wrist folding ' +
              'forward. A footstool or a cushion under the thigh does this; so does a strap, sitting down.',
              'Then check the picking hand falls onto the strings around the soundhole with a straight wrist.'],
          tab: { exercise: 'p1-sit-reach',
                 caption: 'Reach for these four without moving your shoulders.' }
        },
        {
          h: 'What a bad position feels like',
          p: ['Discomfort arrives late. The reliable signals are earlier: a rising shoulder, a thumb ' +
              'squeezing the neck, a wrist that has to fold to reach.',
              'Play this and watch for those three. Stop at the first one rather than at the ache.'],
          playalong: { exercise: 'p1-sit-signals', loop: true,
                       note: 'One finger per fret, moving strings. Watch for all three faults.' }
        },
        {
          h: 'Where the picking hand floats',
          p: ['The forearm rests on the edge of the body; the hand hangs from it over the strings, ' +
              'near the back of the soundhole. Nothing else touches the guitar.',
              'Anchoring the little finger on the top feels stable and pins the hand to one spot. ' +
              'Leave it off.'],
          tab: { exercise: 'p1-sit-noanchor',
                 caption: 'Three strings, no anchor. The hand pivots from the forearm.' }
        },
        {
          h: 'Check it against a mirror',
          p: ['Both wrists should look straight from the side. A folded picking wrist is the most ' +
              'common fault at this stage and the one that carries an injury risk.',
              'Play a bar, look, adjust, play it again. The position is learned by repetition, not by ' +
              'being told once.'],
          playalong: { exercise: 'p1-sit-mirror', bpm: 46, loop: true,
                       note: 'Both hands working. Check each wrist between repeats.' }
        }
      ]
    },

    /* ─────────────────────────────────────────────────────────────────────
       P1.2 — p, i, m and a
       ───────────────────────────────────────────────────────────────────── */
    {
      id: 'p1-l2', strand: 'P', unit: 'P1', instrument: 'any',
      title: 'p, i, m and a',
      icon: '✋',
      criteria: ['P1.pima', 'P1.hygiene'],
      summary: 'Four digits, four jobs, and the reason the nails have to come down.',
      cards: [
        {
          h: 'The four names',
          p: ['p is the thumb, i the index, m the middle, a the ring. The names are Spanish and they ' +
              'are what every piece of fingerstyle notation uses, including the tab in this course.',
              'The little finger has no part to play here.'],
          tab: { exercise: 'p1-home',
                 caption: 'The letters above the tab say which digit takes each note.' }
        },
        {
          h: 'Home strings',
          p: ['p covers the three basses. i, m and a sit on the third, second and first. That is the ' +
              'default, not a rule — but starting from it means the hand rarely has to travel.',
              'Play the figure below until the fingers land without being aimed.'],
          playalong: { exercise: 'p1-home-hold', loop: true,
                       note: 'p moves between basses. i, m and a stay put.' }
        },
        {
          h: 'Cut the nails back',
          p: ['This course plays with flesh. For that, the nail must not reach the string before the ' +
              'fingertip does — a nail past the flesh clicks and thins the tone.',
              'Look along the finger from the palm side. No white should show past the tip. Cut them ' +
              'there and keep them there.'],
          playalong: { exercise: 'p1-nail-listen', loop: true,
                       note: 'A click on the attack means the nail is still too long.' }
        },
        {
          h: 'a is the weak one',
          p: ['The ring finger shares tendons with the middle finger and starts with less independence ' +
              'than the others. That is anatomy, not a fault, and it evens out with use.',
              'Give it its own turn rather than avoiding it, which is what happens by default.'],
          tab: { exercise: 'p1-a-alone',
                 caption: 'a takes the first string every bar. Make it sound like the others.' }
        },
        {
          h: 'The thumb works alone',
          p: ['p moves from its own joint at the wrist and does not share a tendon with the fingers. ' +
              'It can hold a steady bass while the fingers do something unrelated above it.',
              'That independence is what the rest of this unit builds on.'],
          playalong: { exercise: 'p1-thumb-alone', loop: true,
                       note: 'Thumb only. The fingers stay resting on their strings.' }
        }
      ]
    },

    /* ─────────────────────────────────────────────────────────────────────
       P1.3 — Free stroke
       ───────────────────────────────────────────────────────────────────── */
    {
      id: 'p1-l3', strand: 'P', unit: 'P1', instrument: 'any',
      title: 'Free stroke',
      icon: '🎣',
      criteria: ['P1.free'],
      summary: 'The stroke that clears the next string, and where it comes from.',
      cards: [
        {
          h: 'Move from the knuckle',
          p: ['The finger closes from the joint where it meets the hand. The two joints further out ' +
              'hold their shape rather than curling.',
              'Play the open first string with i, four times, then m. Watch the knuckle, not the tip.'],
          tab: { exercise: 'p1-free-single',
                 caption: 'Four with i, four with m. Slowly.' }
        },
        {
          h: 'Clear the string above',
          p: ['A free stroke finishes in the air. The fingertip passes the next string without touching ' +
              'it, which is what keeps the note underneath ringing.',
              'If the next string buzzes, the finger is travelling across the strings rather than through ' +
              'this one.'],
          playalong: { exercise: 'p1-free-across', loop: true,
                       note: 'Three strings. Every note should still be sounding at the end of the bar.' }
        },
        {
          h: 'Prepare, then play',
          p: ['Rest the fingertip on the string before sounding it. That contact is what makes the note ' +
              'start when you decide rather than a moment later.',
              'Take the tempo down until the preparation happens on purpose. Speed removes it first.'],
          playalong: { exercise: 'p1-free-prepare', bpm: 44, loop: true,
                       note: 'Land the finger on the string a full beat before playing it.' }
        },
        {
          h: 'Follow through, then release',
          p: ['The finger finishes near the palm and returns to the string. It does not clench, and it ' +
              'does not stay curled waiting.',
              'A hand that tightens between notes runs out after a page. Let each finger open again ' +
              'before the next one plays.'],
          tab: { exercise: 'p1-free-release',
                 caption: 'Watch the finger that has already played, not the one about to.' }
        },
        {
          h: 'Move along the string for tone',
          p: ['Nearer the bridge the sound is thin and hard; nearer the neck it is round and soft. The ' +
              'hand moves a few centimetres to change it.',
              'Play the same figure in three places along the string and pick the one you want.'],
          playalong: { exercise: 'p1-free-tone', loop: true,
                       note: 'Same notes, three hand positions. Only the tone changes.' }
        }
      ]
    },

    /* ─────────────────────────────────────────────────────────────────────
       P1.4 — Rest stroke
       ───────────────────────────────────────────────────────────────────── */
    {
      id: 'p1-l4', strand: 'P', unit: 'P1', instrument: 'any',
      title: 'Rest stroke',
      icon: '🛬',
      criteria: ['P1.rest'],
      summary: 'The stroke that lands on the next string, and when to choose it.',
      cards: [
        {
          h: 'Come to rest',
          p: ['Play through the string and let the fingertip stop against the next one. The finger ends ' +
              'the stroke leaning on that string rather than in the air.',
              'The tone is fuller because the finger has driven the string across rather than lifted it.'],
          tab: { exercise: 'p1-rest-single',
                 caption: 'Four on the second string, four on the first.' }
        },
        {
          h: 'What it costs',
          p: ['The finger comes to rest on the next string, so that string stops ringing. In a chord ' +
              'that matters; in a single line it does not.',
              'That is the whole decision: rest stroke for a line that needs to carry, free stroke ' +
              'wherever the string above has to keep sounding.'],
          playalong: { exercise: 'p1-rest-vs-free', loop: true,
                       note: 'Play it twice — once with rest strokes, once free. The difference is volume, not pitch.' }
        },
        {
          h: 'Flesh needs the help',
          p: ['A nail gives brightness that carries a melody on its own. Flesh does not, so the rest ' +
              'stroke does more work in this course than in one that assumes nails.',
              'Where a melody has to sit above an accompaniment, that is where this stroke goes.'],
          playalong: { exercise: 'p1-rest-melody', bpm: 44, loop: true,
                       note: 'Melody notes with m as a rest stroke. Everything else free.' }
        },
        {
          h: 'Same joint, more of it',
          p: ['The rest stroke is not a different movement. It starts at the same knuckle and travels ' +
              'further, ending against the next string rather than above it.',
              'If the fingertip is digging under the string to reach, the angle is wrong rather than ' +
              'the effort.'],
          tab: { exercise: 'p1-rest-angle',
                 caption: 'Slowly enough to feel where the finger stops.' }
        },
        {
          h: 'Alternate it too',
          p: ['Rest strokes alternate the same way free strokes do. A melody played with one repeated ' +
              'finger hits the same ceiling.',
              'Take the line below with i and m alternating, every note a rest stroke.'],
          playalong: { exercise: 'p1-rest-alternate', bpm: 44, loop: true,
                       note: 'Every note lands on the string above. Keep the letters strict.' }
        }
      ]
    },

    /* ─────────────────────────────────────────────────────────────────────
       P1.5 — Taking turns
       ───────────────────────────────────────────────────────────────────── */
    {
      id: 'p1-l5', strand: 'P', unit: 'P1', instrument: 'any',
      title: 'Taking turns',
      icon: '🔁',
      criteria: ['P1.alternate'],
      summary: 'Why the same finger never plays twice in a row, and what happens when it does.',
      cards: [
        {
          h: 'i, m, i, m',
          p: ['A finger that has played needs to return before it can play again. Alternating means the ' +
              'other one is already there.',
              'Repeat a finger and the tempo is capped by how fast that single finger can reset. ' +
              'Alternation removes the cap.'],
          tab: { exercise: 'p1-alternate-open',
                 caption: 'Eight notes a bar. The letters never repeat.' }
        },
        {
          h: 'Across a string change',
          p: ['Alternation survives the move to a new string. The temptation is to restart with i on ' +
              'every string, which is where the pattern breaks.',
              'Play the figure and say the letters aloud. The mouth catches a repeat before the ear does.'],
          playalong: { exercise: 'p1-alternate-cross', loop: true,
                       note: 'The string changes at beat 3. The alternation does not.' }
        },
        {
          h: 'Through a real line',
          p: ['Here the fretting hand is moving too. Keep the alternation strict and let the other hand ' +
              'work around it.',
              'Slow enough that the pattern holds. A tempo where it breaks is teaching the break.'],
          playalong: { exercise: 'p1-alternate-scale', loop: true,
                       note: 'If a finger repeats, halve the tempo and start again.' }
        },
        {
          h: 'm and a alternate as well',
          p: ['i and m is the pair that comes up most, but any two neighbours work. m and a is worth ' +
              'building early because the ring finger is weaker and gets skipped otherwise.',
              'Run the same figure with m and a in place of i and m.'],
          tab: { exercise: 'p1-alternate-ma',
                 caption: 'Read i as m, and m as a. Same rhythm.' }
        },
        {
          h: 'The thumb does not interrupt',
          p: ['Adding a bass should leave the alternation untouched. What usually happens instead is a ' +
              'small pause on every thumb note while the fingers wait.',
              'Play this and listen for the gap rather than watching for it.'],
          playalong: { exercise: 'p1-alternate-bass', loop: true,
                       note: 'Fingers alternate through the bass notes without pausing.' }
        }
      ]
    },

    /* ─────────────────────────────────────────────────────────────────────
       P1.6 — The thumb underneath
       ───────────────────────────────────────────────────────────────────── */
    {
      id: 'p1-l6', strand: 'P', unit: 'P1', instrument: 'any',
      title: 'The thumb underneath',
      icon: '👍',
      criteria: ['P1.thumb'],
      summary: 'A bass that keeps time while the fingers play something else above it.',
      cards: [
        {
          h: 'p moves in front',
          p: ['The thumb plays on the far side of the fingers, moving away from the palm. Cross it ' +
              'behind them and the two collide on every other note.',
              'Play the basses alone first, so the movement is set before anything else is added.'],
          tab: { exercise: 'p1-thumb-alone',
                 caption: 'Sixth, fifth, fourth, fifth. Thumb throughout.' }
        },
        {
          h: 'Add the fingers between',
          p: ['The thumb lands on the beat; a finger falls between the beats. Two things at once is the ' +
              'point of the unit, and it arrives here.',
              'Start slow enough that both parts are deliberate. The bass is what holds when the rest wobbles.'],
          playalong: { exercise: 'p1-thumb-under', loop: true,
                       note: 'Bass on 1 and 2, fingers on the offbeats.' }
        },
        {
          h: 'Let the bass keep going',
          p: ['If the thumb pauses when a finger plays, the two parts have merged into one. The test is ' +
              'whether the bass stays even while the fingers change.',
              'Play the bass alone, keep it going, and add the fingers without letting it alter.'],
          playalong: { exercise: 'p1-thumb-steady', bpm: 40, loop: true,
                       note: 'Listen only to the bass. It should sound the same with the fingers in as out.' }
        },
        {
          h: 'A rest stroke on the bass',
          p: ['The thumb can land on the next string too, which gives the bass weight and stops it ' +
              'ringing into the following harmony.',
              'Use it where the bass line is the tune. Use a free stroke where the basses need to ' +
              'overlap.'],
          tab: { exercise: 'p1-thumb-rest',
                 caption: 'Each thumb stroke coming to rest on the string below.' }
        },
        {
          h: 'Count out loud',
          p: ['Two parts at different speeds is where counting stops being optional. Say the beat while ' +
              'playing; the part that drifts is the one not being counted.',
              'If speaking and playing at once is too much, count the bass alone and add the fingers after.'],
          playalong: { exercise: 'p1-thumb-count', bpm: 46, loop: true,
                       note: 'Count one and two and. The thumb is on the numbers.' }
        }
      ]
    },

    /* ─────────────────────────────────────────────────────────────────────
       P1.7 — The fretting hand
       ───────────────────────────────────────────────────────────────────── */
    {
      id: 'p1-l7', strand: 'P', unit: 'P1', instrument: 'any',
      title: 'The fretting hand',
      icon: '🖐️',
      criteria: ['P1.fret'],
      summary: 'Fingertip, close behind the fret, and the least pressure that works.',
      cards: [
        {
          h: 'Close behind the fret',
          p: ['The note is made by the fret, not the finger. Pressing halfway between two frets needs ' +
              'far more force and still buzzes.',
              'Move each finger as close behind its fret as it will sit without touching it.'],
          tab: { exercise: 'p1-fret-pressure',
                 caption: 'One finger per fret. Finger 1 at fret 1, and so on.' }
        },
        {
          h: 'Find the least pressure',
          p: ['Press until the note sounds cleanly, then back off until it buzzes, then add the smallest ' +
              'amount back. That is the pressure to use.',
              'Most players use several times what is needed, which is where fatigue and slow changes ' +
              'come from.'],
          playalong: { exercise: 'p1-fret-light', bpm: 40, loop: true,
                       note: 'Find the buzz on every note, then come back from it.' }
        },
        {
          h: 'The thumb behind, not over',
          p: ['The fretting thumb sits behind the neck, roughly opposite the second finger. It balances ' +
              'the fingers rather than squeezing against them.',
              'A thumb hooked over the top shortens the reach of every finger. That grip has uses; none ' +
              'of them are in this unit.'],
          playalong: { exercise: 'p1-fret-clean', loop: true,
                       note: 'Changing strings each beat. The thumb should not move at all.' }
        },
        {
          h: 'Keep the fingers near the board',
          p: ['A finger that lifts an inch has an inch to travel back. Held close, it arrives before ' +
              'the beat needs it.',
              'Play the figure below and watch the fingers doing nothing. Those are the ones that fly.'],
          tab: { exercise: 'p1-fret-close',
                 caption: 'Four fingers, two strings. Nothing lifts far.' }
        },
        {
          h: 'Arrive together',
          p: ['A note sounds cleanly when the fretting finger is down before the string is picked. Late ' +
              'by a fraction and it buzzes; early is free.',
              'Slow the tempo until the fretting hand is always waiting for the picking hand.'],
          playalong: { exercise: 'p1-fret-together', bpm: 42, loop: true,
                       note: 'Fretting hand first, every time. Listen for the buzz that says otherwise.' }
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
  /* Every element a card can carry. The quality checker counts these, so a new
     kind has to be named here before a card may use one — which is how "add an
     element type" stays a decision rather than a typo that disables the rule. */
  var ELEMENT_KEYS = ['tab', 'chordbox', 'fretboard', 'rhythm', 'playalong', 'changes', 'ear', 'pointer'];

  return {
    LESSONS: LESSONS,
    ELEMENT_KEYS: ELEMENT_KEYS,
    lesson: lesson,
    lessonsFor: lessonsFor
  };
}));
