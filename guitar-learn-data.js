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
    },
    /* ═════════════════════════════════════════════════════════════════════
       M3 — The fretboard

       The first musicianship unit, and the first test of whether this format
       carries knowledge as well as it carries technique. It does, with one
       addition: two of these lessons are about tuning and capo, so a card can
       declare `context: { tuning, capo }` and the player draws AND sounds it on
       that instrument rather than on whatever the reader has set. Without that,
       a DADGAD lesson would show standard-tuning notes — the chord-box defect
       from step 6, one layer up.

       The playing is still the body of the lesson. Naming notes is learned by
       putting a finger on one and saying what it is, not by reading a diagram
       of the neck, so every card here has something to play and the diagrams
       are what you check yourself against.
       ═════════════════════════════════════════════════════════════════════ */

    {
      id: 'm3-l1', strand: 'M', unit: 'M3', instrument: 'any',
      title: 'Naming the bass strings',
      icon: '🗺️',
      criteria: ['M3.names'],
      summary: 'Find any note on the sixth and fifth strings without counting up from the nut.',
      cards: [
        {
          h: 'Start from the marks',
          p: ['The dots are at frets 3, 5, 7 and 9, with a double mark at 12. They are the same on every ' +
              'guitar, and they are what stops you counting.',
              'Play them on the sixth string and say the fret number aloud as each one sounds.'],
          tab: { exercise: 'm3-dots-six',
                 caption: 'Three, five, seven, nine, twelve.' }
        },
        {
          h: 'The sixth string by name',
          p: ['Open is E. Then F at the first fret, G at the third, A at the fifth, B at the seventh, ' +
              'C at the eighth, D at the tenth, and E again at the twelfth.',
              'Say each letter as it sounds. The gaps between them are what the next lesson is about.'],
          playalong: { exercise: 'm3-six-letters', loop: true,
                       note: 'E F G A B C D E. Say the letter, then play it.' }
        },
        {
          h: 'The fifth string, same job',
          p: ['Open is A, then B at the second, C at the third, D at the fifth, E at the seventh, ' +
              'F# at the ninth, G at the tenth, A at the twelfth.',
              'These two strings carry most of the bass work in fingerstyle, which is why they come first.'],
          playalong: { exercise: 'm3-five-letters', loop: true,
                       note: 'A B C D E F# G A.' }
        },
        {
          h: 'Fifth and seventh as anchors',
          p: ['A at the fifth fret of the sixth string. E at the seventh. Those two carry more weight than ' +
              'the rest because so much sits around them.',
              'Play across both strings at each fret and hear the interval stay the same.'],
          tab: { exercise: 'm3-anchors',
                 caption: 'Fifth, seventh, twelfth, on both strings.' }
        },
        {
          h: 'Landing without counting',
          p: ['Here the notes jump around. Aim for each one directly rather than walking up to it.',
              'Getting it wrong quickly is more useful than getting it right slowly — the counting is the ' +
              'habit being replaced.'],
          playalong: { exercise: 'm3-name-jump', loop: true,
                       note: 'Name each note before you play it. Check afterwards.' }
        }
      ]
    },

    {
      id: 'm3-l2', strand: 'M', unit: 'M3', instrument: 'any',
      title: 'Octaves',
      icon: '🪞',
      criteria: ['M3.octaves'],
      summary: 'One shape that turns a note you know into the same note somewhere else.',
      cards: [
        {
          h: 'Two strings across, two frets up',
          p: ['From any note on the sixth string, the same note an octave higher sits on the fourth ' +
              'string, two frets along. One shape, anywhere on the neck.',
              'Play the pairs below and hear them match.'],
          tab: { exercise: 'm3-oct-six-four',
                 caption: 'Sixth string, then its octave on the fourth.' }
        },
        {
          h: 'The same from the fifth',
          p: ['Fifth string to third string works identically: across two, up two. Learning the sixth and ' +
              'fifth strings by name therefore gives you the fourth and third for free.',
              'That is the whole reason the last lesson only covered two strings.'],
          playalong: { exercise: 'm3-oct-five-three', loop: true,
                       note: 'Fifth string, then third. Same shape as before.' }
        },
        {
          h: 'Where the shape changes',
          p: ['Between the third and second strings the tuning narrows by a semitone, so the octave shape ' +
              'stretches to three frets instead of two.',
              'Play both versions here. The change is not an exception to remember so much as the one ' +
              'place the pattern bends.'],
          tab: { exercise: 'm3-oct-shift',
                 caption: 'Fourth to second: three frets. Third to first: three frets.' }
        },
        {
          h: 'One note, everywhere it lives',
          p: ['A single pitch appears in several places. Chaining the octave shape finds them without ' +
              'knowing any of their names.',
              'Play the chain and listen for the moment it stops matching — that is a wrong turn, and ' +
              'hearing it is the skill.'],
          playalong: { exercise: 'm3-oct-chain', loop: true,
                       note: 'Every note here is the same letter.' }
        },
        {
          h: 'Tuning by octaves',
          p: ['The same shape checks tuning. An octave that beats against itself is a string out of tune, ' +
              'and it is easier to hear than a unison.',
              'Play each pair and listen for the wobble rather than looking at anything.'],
          tab: { exercise: 'm3-oct-tune',
                 caption: 'Open string, then its octave. Listen for beating.' }
        }
      ]
    },

    {
      id: 'm3-l3', strand: 'M', unit: 'M3', instrument: 'any',
      title: 'When the tuning changes',
      icon: '🎛️',
      criteria: ['M3.tuning'],
      summary: 'Retune to DADGAD and work out what moved, rather than starting again.',
      cards: [
        {
          h: 'Three strings drop',
          p: ['DADGAD lowers the sixth, second and first strings by a tone each. Everything else stays ' +
              'where it was.',
              'Retune, then play the open strings in order and listen to what the guitar has become.'],
          context: { tuning: 'DADGAD', capo: 0 },
          playalong: { exercise: 'm3-dadgad-open', loop: true,
                       note: 'D A D G A D, low to high.' }
        },
        {
          h: 'What moved, exactly',
          p: ['E became D on the sixth. B became A on the second. E became D on the first. Each is two ' +
              'frets lower, so every note on those strings now sits two frets higher than before.',
              'Play the open string and then the second fret: that second fret is the note that used to ' +
              'be open.'],
          context: { tuning: 'DADGAD', capo: 0 },
          tab: { exercise: 'm3-dadgad-moved',
                 caption: 'Open, then two frets up, on each string that changed.' }
        },
        {
          h: 'And what did not',
          p: ['The fifth, fourth and third strings are untouched. Every note you learned on them is still ' +
              'there, in the same place.',
              'Half the neck is unchanged, which is why this is a retuning rather than a new instrument.'],
          context: { tuning: 'DADGAD', capo: 0 },
          tab: { exercise: 'm3-dadgad-same',
                 caption: 'A, D and G strings. Nothing here has moved.' }
        },
        {
          h: 'A shape you know, a chord you do not',
          p: ['Fingering a familiar shape in a new tuning gives a different chord. That is the point of ' +
              'the tuning rather than a problem with it.',
              'Play both of these. The second is the open strings alone, and it is where the sound of ' +
              'DADGAD comes from.'],
          context: { tuning: 'DADGAD', capo: 0 },
          playalong: { exercise: 'm3-dadgad-shape', loop: true,
                       note: 'A D-shape, then everything open.' }
        },
        {
          h: 'Finding a named note again',
          p: ['Work out where each note has gone using what you know: the strings that moved are two ' +
              'frets higher, the others are where they were.',
              'Name each note here before playing it, then check.'],
          context: { tuning: 'DADGAD', capo: 0 },
          playalong: { exercise: 'm3-dadgad-find', loop: true,
                       note: 'Say the letter first. The three unchanged strings are the easy ones.' }
        }
      ]
    },

    {
      id: 'm3-l4', strand: 'M', unit: 'M3', instrument: 'any',
      title: 'The capo',
      icon: '📎',
      criteria: ['M3.capo'],
      summary: 'A capo moves the pitch and leaves the shapes alone. Both halves matter.',
      cards: [
        {
          h: 'A new nut',
          p: ['A capo at the second fret makes the second fret behave as the nut. The open strings now ' +
              'sound F# B E A C# F#.',
              'Put one on and play the strings it is holding down.'],
          context: { tuning: 'standard', capo: 2 },
          tab: { exercise: 'm3-capo-open',
                 caption: 'The strings behind a capo at the second fret.' }
        },
        {
          h: 'The shapes do not move',
          p: ['A shape fingered relative to the capo is the same shape. What changes is the pitch it ' +
              'produces, by one semitone per fret.',
              'Play a D shape here. The fingers do what they always did; the sound is E.'],
          context: { tuning: 'standard', capo: 2 },
          playalong: { exercise: 'm3-capo-shape', loop: true,
                       note: 'A D shape and a Dm shape, both behind the capo.' }
        },
        {
          h: 'Know what is actually sounding',
          p: ['The trap is thinking in shapes and losing the pitch. Playing a G shape at the fifth fret ' +
              'is a C chord, and anyone else in the room will call it C.',
              'Walk the sixth string and name the real pitches, not the shapes.'],
          context: { tuning: 'standard', capo: 2 },
          playalong: { exercise: 'm3-capo-pitch', loop: true,
                       note: 'Capo at 2, so the first note is F#, not E.' }
        },
        {
          h: 'Choosing where it goes',
          p: ['A capo is for putting a song in a key that suits a voice while keeping shapes that ring. ' +
              'Higher up, the strings shorten and the tone tightens.',
              'Play this at the fifth fret and hear how much brighter the same figure sits.'],
          context: { tuning: 'standard', capo: 5 },
          tab: { exercise: 'm3-capo-choose',
                 caption: 'Capo at the fifth fret. Same shapes, tighter sound.' }
        },
        {
          h: 'The same music without one',
          p: ['Everything a capo does can be played without it, further up the neck and usually with a ' +
              'barre. What is lost is the open strings, which is most of why the capo is used.',
              'Here is that figure with no capo. Compare it with the last card.'],
          context: { tuning: 'standard', capo: 0 },
          playalong: { exercise: 'm3-capo-off', loop: true,
                       note: 'No capo. The notes are lower and nothing rings open.' }
        }
      ]
    }
,

    /* ═════════════════════════════════════════════════════════════════════
       M5 — Pentatonics and blues

       The first unit whose material is GENERATED rather than written out. A
       card names a scale, a position and a sequence, and guitar-engine.js
       produces the notes — which is what that generator was built for in step
       4 and what no lesson had used until here. Writing five box positions by
       hand, in every key, would be enormous and a worse source of truth than
       the shape itself: change the shape once and every card follows.

       The engine returns no picking fingers, so the player applies strict i-m
       alternation over a generated run. That is not decoration — P1.5 teaches
       never repeating a finger, and a scale drill printed without letters would
       quietly contradict it.
       ═════════════════════════════════════════════════════════════════════ */

    {
      id: 'm5-l1', strand: 'M', unit: 'M5', instrument: 'any',
      title: 'One box, both directions',
      icon: '📦',
      criteria: ['M5.box'],
      summary: 'The shape everyone starts with, played until it stops needing to be read.',
      cards: [
        {
          h: 'Five notes, not seven',
          p: ['A minor pentatonic drops the second and the sixth from the minor scale. What is left has ' +
              'no semitone clashes, which is why it fits over almost anything.',
              'Play it up from the sixth string. Two notes per string, all the way across.'],
          playalong: { generate: { scaleId: 'minPent', rootPc: 9, positionKind: 'box', positionIndex: 0,
                                   sequence: 'straight', title: 'A minor pentatonic, first box' },
                       loop: true, bpm: 66,
                       note: 'Two per string. The alternation runs straight through the string changes.' }
        },
        {
          h: 'Back down is a different skill',
          p: ['Descending uses the same notes and a different set of habits: the picking hand keeps ' +
              'alternating while the fretting hand releases rather than presses.',
              'Most players know a shape upward long before they know it downward.'],
          playalong: { generate: { scaleId: 'minPent', rootPc: 9, positionKind: 'box', positionIndex: 0,
                                   sequence: 'straight', descending: true, title: 'The same box, descending' },
                       loop: true, bpm: 66,
                       note: 'Start on the high string. Same letters, same order.' }
        },
        {
          h: 'The root is not the lowest note',
          p: ['The shape starts on A because the sixth string is where the root sits here — but the box ' +
              'contains three more A notes, and hearing which one is home is what makes it music.',
              'Play the shape and stop on a root each time round.'],
          fretboard: { notes: [], rootPc: 9, title: 'A minor pentatonic, first box' },
          playalong: { generate: { scaleId: 'minPent', rootPc: 9, positionKind: 'box', positionIndex: 0,
                                   sequence: 'pedal', title: 'Returning to the root' },
                       loop: true, bpm: 60,
                       note: 'Every other note is a root. Hear it pull.' }
        },
        {
          h: 'Move it without relearning it',
          p: ['The shape has no open strings, so it slides. Put its lowest note on C at the eighth fret ' +
              'and the same fingering gives C minor pentatonic.',
              'That is the whole advantage of a movable shape, and the reason to learn this one properly.'],
          playalong: { generate: { scaleId: 'minPent', rootPc: 3, positionKind: 'box', positionIndex: 0,
                                   sequence: 'straight', title: 'C minor pentatonic, same shape' },
                       loop: true, bpm: 66,
                       note: 'Identical fingering, three frets higher.' }
        },
        {
          h: 'In threes',
          p: ['Running the shape in groups of three breaks the up-and-down and makes the notes sound like ' +
              'a line rather than a scale.',
              'The alternation still never repeats a finger. That is what keeps it playable at speed.'],
          playalong: { generate: { scaleId: 'minPent', rootPc: 9, positionKind: 'box', positionIndex: 0,
                                   sequence: 'in3s', title: 'The box in threes' },
                       loop: true, bpm: 54,
                       note: 'Slower than it looks. The grouping is the difficulty, not the notes.' }
        }
      ]
    },

    {
      id: 'm5-l2', strand: 'M', unit: 'M5', instrument: 'any',
      title: 'Joining two positions',
      icon: '🔗',
      criteria: ['M5.positions'],
      summary: 'The neck is one shape repeated, and the joins are where playing stops being boxed in.',
      cards: [
        {
          h: 'The next box up',
          p: ['The second position starts where the first ends. Its lowest note is the one the first box ' +
              'finished on, which is why they overlap rather than sit apart.',
              'Play it on its own first.'],
          playalong: { generate: { scaleId: 'minPent', rootPc: 9, positionKind: 'box', positionIndex: 1,
                                   sequence: 'straight', title: 'A minor pentatonic, second box' },
                       loop: true, bpm: 66,
                       note: 'Two frets higher than the first box, and a different shape.' }
        },
        {
          h: 'And the one below',
          p: ['Going the other way, the fifth position sits under the first. Five boxes cover the neck and ' +
              'then repeat at the twelfth fret.',
              'Learn the neighbours before the far ones — those are the joins you actually use.'],
          playalong: { generate: { scaleId: 'minPent', rootPc: 9, positionKind: 'box', positionIndex: 4,
                                   sequence: 'straight', title: 'The box below' },
                       loop: true, bpm: 66,
                       note: 'Lower on the neck, same five notes.' }
        },
        {
          h: 'One string at a time',
          p: ['A different way to see it: take a single string and play every scale note on it, right up ' +
              'the neck. The boxes are slices across that.',
              'This is the view that stops the neck looking like five unrelated diagrams.'],
          playalong: { generate: { scaleId: 'minPent', rootPc: 9, positionKind: 'string', positionIndex: 2,
                                   sequence: 'straight', title: 'The scale along one string' },
                       loop: true, bpm: 60,
                       note: 'One string, the whole neck. Shift with the fretting hand.' }
        },
        {
          h: 'Crossing the join',
          p: ['A line that starts in one box and ends in the next needs the shift to happen on a note you ' +
              'were going to play anyway, not as an extra move.',
              'Play the second box in threes and feel where the hand wants to move.'],
          playalong: { generate: { scaleId: 'minPent', rootPc: 9, positionKind: 'box', positionIndex: 1,
                                   sequence: 'in3s', title: 'Second box, in threes' },
                       loop: true, bpm: 54,
                       note: 'The grouping pushes the hand toward the edge of the shape.' }
        },
        {
          h: 'In fours, higher up',
          p: ['The third position sits around the ninth fret, where the frets are closer and the same ' +
              'stretch is easier.',
              'Play it in fours. Higher up the neck, most players find speed comes sooner.'],
          playalong: { generate: { scaleId: 'minPent', rootPc: 9, positionKind: 'box', positionIndex: 2,
                                   sequence: 'in4s', title: 'Third box, in fours' },
                       loop: true, bpm: 52,
                       note: 'Narrower frets. Keep the fingers close to the board.' }
        }
      ]
    },

    {
      id: 'm5-l3', strand: 'M', unit: 'M5', instrument: 'any',
      title: 'The blue note',
      icon: '🫐',
      criteria: ['M5.blue'],
      summary: 'One extra note between the fourth and the fifth, and what it does to everything around it.',
      cards: [
        {
          h: 'Where it goes',
          p: ['The blues scale is the minor pentatonic with a flattened fifth added — one note, sitting ' +
              'between the fourth and the fifth.',
              'Play it and hear how different the same shape becomes.'],
          playalong: { generate: { scaleId: 'blues', rootPc: 9, positionKind: 'box', positionIndex: 0,
                                   sequence: 'straight', title: 'A blues scale, first box' },
                       loop: true, bpm: 60,
                       note: 'The added note is the one that sounds like it wants to move.' }
        },
        {
          h: 'It is a passing note',
          p: ['The flattened fifth is unstable by design. Landing on it and staying there sounds wrong, ' +
              'which is why it works best going through rather than stopping.',
              'Play the shape and let that note pass each time.'],
          playalong: { generate: { scaleId: 'blues', rootPc: 9, positionKind: 'box', positionIndex: 0,
                                   sequence: 'straight', descending: true, title: 'Passing through, descending' },
                       loop: true, bpm: 60,
                       note: 'Coming down, it falls into the fourth. That is where it wants to go.' }
        },
        {
          h: 'One note changes the genre',
          p: ['The same box without it is a rock or folk sound; with it the line reads as blues before ' +
              'anything else has happened.',
              'Play the pentatonic and the blues scale back to back and hear where the difference sits.'],
          playalong: { generate: { scaleId: 'minPent', rootPc: 9, positionKind: 'box', positionIndex: 0,
                                   sequence: 'straight', title: 'Without the blue note' },
                       loop: true, bpm: 60,
                       note: 'Then go back a card and play the blues scale. One note apart.' }
        },
        {
          h: 'In a broken pattern',
          p: ['Straight up and down hides what a note does. A broken pattern keeps returning to it from ' +
              'different sides, which is how you learn its character.',
              'Slowly — the pattern is harder than the notes.'],
          playalong: { generate: { scaleId: 'blues', rootPc: 9, positionKind: 'box', positionIndex: 0,
                                   sequence: 'broken', title: 'Blues scale, broken' },
                       loop: true, bpm: 50,
                       note: 'Listen for the flattened fifth each time it comes round.' }
        },
        {
          h: 'Somewhere else on the neck',
          p: ['The blue note exists in every position, not only the first. Finding it in an unfamiliar ' +
              'shape is the test of whether you know what it is rather than where it was.',
              'Play the second box and locate it by ear.'],
          playalong: { generate: { scaleId: 'blues', rootPc: 9, positionKind: 'box', positionIndex: 1,
                                   sequence: 'straight', title: 'Blues scale, second box' },
                       loop: true, bpm: 58,
                       note: 'Same note, different place. Find it before you look.' }
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
