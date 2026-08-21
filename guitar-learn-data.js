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
          practice: { do: 'Play the basses through four times, lifting the picking hand clear between each.',
                      until: 'the guitar has not shifted once, and your shoulders are where they started.',
                      mins: 3 },
          p: ['The picking hand should be free to move. If it is also stopping the guitar sliding, ' +
              'it has two jobs and will do the second one badly.',
              'Play the open basses below. The guitar should stay where it is when the hand lifts off.'],
          playalong: { exercise: 'p1-sit-settle', loop: true,
                       note: 'Lift the picking hand clear between bars. Nothing should shift.' }
        },
        {
          h: 'Height before angle',
          practice: { do: 'Set the height, play the four notes, adjust, repeat. Change one thing at a time.',
                      until: 'both wrists look straight from the side and the first fret needs no reaching.',
                      mins: 4 },
          p: ['Raise the neck until the fretting hand reaches the first fret without the wrist folding ' +
              'forward. A footstool or a cushion under the thigh does this; so does a strap, sitting down.',
              'Then check the picking hand falls onto the strings around the soundhole with a straight wrist.'],
          tab: { exercise: 'p1-sit-reach',
                 caption: 'Reach for these four without moving your shoulders.' }
        },
        {
          h: 'What a bad position feels like',
          practice: { do: 'Play it through watching for the three faults: rising shoulder, squeezing thumb, folding wrist.',
                      until: 'you can play it twice with none of the three appearing.',
                      mins: 4 },
          p: ['Discomfort arrives late. The reliable signals are earlier: a rising shoulder, a thumb ' +
              'squeezing the neck, a wrist that has to fold to reach.',
              'Play this and watch for those three. Stop at the first one rather than at the ache.'],
          playalong: { exercise: 'p1-sit-signals', loop: true,
                       note: 'One finger per fret, moving strings. Watch for all three faults.' }
        },
        {
          h: 'Where the picking hand floats',
          practice: { do: 'Play with the little finger deliberately off the top. It will want to land.',
                      until: 'the hand stays over the strings for a whole bar with nothing resting on the guitar.',
                      mins: 4 },
          p: ['The forearm rests on the edge of the body; the hand hangs from it over the strings, ' +
              'near the back of the soundhole. Nothing else touches the guitar.',
              'Anchoring the little finger on the top feels stable and pins the hand to one spot. ' +
              'Leave it off.'],
          tab: { exercise: 'p1-sit-noanchor',
                 caption: 'Three strings, no anchor. The hand pivots from the forearm.' }
        },
        {
          h: 'Check it against a mirror',
          practice: { do: 'Play a bar, look at each wrist, adjust, play it again. Ten rounds.',
                      until: 'you stop finding anything to adjust.',
                      mins: 5 },
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
          practice: { do: 'Say the letter aloud as each note sounds. Slowly enough that the mouth keeps up.',
                      until: 'you can name the digit before it plays rather than after.',
                      mins: 3 },
          p: ['p is the thumb, i the index, m the middle, a the ring. The names are Spanish and they ' +
              'are what every piece of fingerstyle notation uses, including the tab in this course.',
              'The little finger has no part to play here.'],
          tab: { exercise: 'p1-home',
                 caption: 'The letters above the tab say which digit takes each note.' }
        },
        {
          h: 'Home strings',
          practice: { do: 'Play it with your eyes shut. The fingers should find their strings unaimed.',
                      until: 'eight bars land clean without looking.',
                      mins: 5 },
          p: ['p covers the three basses. i, m and a sit on the third, second and first. That is the ' +
              'default, not a rule — but starting from it means the hand rarely has to travel.',
              'Play the figure below until the fingers land without being aimed.'],
          playalong: { exercise: 'p1-home-hold', loop: true,
                       note: 'p moves between basses. i, m and a stay put.' }
        },
        {
          h: 'Cut the nails back',
          practice: { do: 'Cut them, then play the string repeatedly and listen at the moment of attack.',
                      until: 'no note starts with a click, only with tone.',
                      mins: 3 },
          p: ['This course plays with flesh. For that, the nail must not reach the string before the ' +
              'fingertip does — a nail past the flesh clicks and thins the tone.',
              'Look along the finger from the palm side. No white should show past the tip. Cut them ' +
              'there and keep them there.'],
          playalong: { exercise: 'p1-nail-listen', loop: true,
                       note: 'A click on the attack means the nail is still too long.' }
        },
        {
          h: 'a is the weak one',
          practice: { do: 'Play it through and listen only to the a notes, ignoring everything else.',
                      until: 'the a notes are as loud as the i and m notes around them.',
                      mins: 5 },
          p: ['The ring finger shares tendons with the middle finger and starts with less independence ' +
              'than the others. That is anatomy, not a fault, and it evens out with use.',
              'Give it its own turn rather than avoiding it, which is what happens by default.'],
          tab: { exercise: 'p1-a-alone',
                 caption: 'a takes the first string every bar. Make it sound like the others.' }
        },
        {
          h: 'The thumb works alone',
          practice: { do: 'Rest i, m and a on their strings and leave them there while p works.',
                      until: 'the thumb plays eight bars with the fingers touching but silent.',
                      mins: 4 },
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
          practice: { do: 'Watch the knuckle where the finger meets the hand. The outer joints hold their shape.',
                      until: 'the movement is visibly coming from that joint and nowhere else.',
                      mins: 5 },
          p: ['The finger closes from the joint where it meets the hand. The two joints further out ' +
              'hold their shape rather than curling.',
              'Play the open first string with i, four times, then m. Watch the knuckle, not the tip.'],
          tab: { exercise: 'p1-free-single',
                 caption: 'Four with i, four with m. Slowly.' }
        },
        {
          h: 'Clear the string above',
          practice: { do: 'Play the three strings and listen for whether the earlier notes are still ringing.',
                      until: 'all three notes are still sounding at the end of the bar.',
                      mins: 4 },
          p: ['A free stroke finishes in the air. The fingertip passes the next string without touching ' +
              'it, which is what keeps the note underneath ringing.',
              'If the next string buzzes, the finger is travelling across the strings rather than through ' +
              'this one.'],
          playalong: { exercise: 'p1-free-across', loop: true,
                       note: 'Three strings. Every note should still be sounding at the end of the bar.' }
        },
        {
          h: 'Prepare, then play',
          practice: { do: 'Land the fingertip on the string a full beat before you sound it.',
                      until: 'every note starts exactly when you decide, not a moment after.',
                      mins: 5 },
          p: ['Rest the fingertip on the string before sounding it. That contact is what makes the note ' +
              'start when you decide rather than a moment later.',
              'Take the tempo down until the preparation happens on purpose. Speed removes it first.'],
          playalong: { exercise: 'p1-free-prepare', bpm: 44, loop: true,
                       note: 'Land the finger on the string a full beat before playing it.' }
        },
        {
          h: 'Follow through, then release',
          practice: { do: 'Watch the finger that has already played rather than the one about to.',
                      until: 'each finger opens again before the next one moves.',
                      mins: 4 },
          p: ['The finger finishes near the palm and returns to the string. It does not clench, and it ' +
              'does not stay curled waiting.',
              'A hand that tightens between notes runs out after a page. Let each finger open again ' +
              'before the next one plays.'],
          tab: { exercise: 'p1-free-release',
                 caption: 'Watch the finger that has already played, not the one about to.' }
        },
        {
          h: 'Move along the string for tone',
          practice: { do: 'Play the figure three times: near the bridge, over the hole, near the neck.',
                      until: 'you can produce all three tones on demand and say which you want.',
                      mins: 5 },
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
          practice: { do: 'Play through the string and let the finger stop against the next one.',
                      until: 'the finger is leaning on the next string at the end of every stroke.',
                      mins: 4 },
          p: ['Play through the string and let the fingertip stop against the next one. The finger ends ' +
              'the stroke leaning on that string rather than in the air.',
              'The tone is fuller because the finger has driven the string across rather than lifted it.'],
          tab: { exercise: 'p1-rest-single',
                 caption: 'Four on the second string, four on the first.' }
        },
        {
          h: 'What it costs',
          practice: { do: 'Play it twice, once with rest strokes and once free. Listen to the difference.',
                      until: 'you can hear that the rest stroke is louder and that it stops the next string.',
                      mins: 4 },
          p: ['The finger comes to rest on the next string, so that string stops ringing. In a chord ' +
              'that matters; in a single line it does not.',
              'That is the whole decision: rest stroke for a line that needs to carry, free stroke ' +
              'wherever the string above has to keep sounding.'],
          playalong: { exercise: 'p1-rest-vs-free', loop: true,
                       note: 'Play it twice — once with rest strokes, once free. The difference is volume, not pitch.' }
        },
        {
          h: 'Flesh needs the help',
          practice: { do: 'Melody notes with m as a rest stroke, everything else free, in the same phrase.',
                      until: 'the melody sits clearly above the rest without playing anything else quieter.',
                      mins: 6 },
          p: ['A nail gives brightness that carries a melody on its own. Flesh does not, so the rest ' +
              'stroke does more work in this course than in one that assumes nails.',
              'Where a melody has to sit above an accompaniment, that is where this stroke goes.'],
          playalong: { exercise: 'p1-rest-melody', bpm: 44, loop: true,
                       note: 'Melody notes with m as a rest stroke. Everything else free.' }
        },
        {
          h: 'Same joint, more of it',
          practice: { do: 'Slowly enough to feel exactly where the finger stops. Do not aim for volume.',
                      until: 'the finger arrives at the next string without the tip digging under.',
                      mins: 4 },
          p: ['The rest stroke is not a different movement. It starts at the same knuckle and travels ' +
              'further, ending against the next string rather than above it.',
              'If the fingertip is digging under the string to reach, the angle is wrong rather than ' +
              'the effort.'],
          tab: { exercise: 'p1-rest-angle',
                 caption: 'Slowly enough to feel where the finger stops.' }
        },
        {
          h: 'Alternate it too',
          practice: { do: 'Every note a rest stroke, i and m strictly alternating through the line.',
                      until: 'the line runs twice with no repeated finger and no note noticeably weaker.',
                      mins: 6 },
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
          practice: { do: 'Say the letters aloud while playing. The mouth catches a repeat before the ear does.',
                      until: 'eight bars pass with no repeated finger and no gap where you had to think.',
                      mins: 5 },
          p: ['A finger that has played needs to return before it can play again. Alternating means the ' +
              'other one is already there.',
              'Repeat a finger and the tempo is capped by how fast that single finger can reset. ' +
              'Alternation removes the cap.'],
          tab: { exercise: 'p1-alternate-open',
                 caption: 'Eight notes a bar. The letters never repeat.' }
        },
        {
          h: 'Across a string change',
          practice: { do: 'Watch the beat where the string changes. That is where the pattern wants to restart.',
                      until: 'the alternation crosses the string change without resetting to i.',
                      mins: 5 },
          p: ['Alternation survives the move to a new string. The temptation is to restart with i on ' +
              'every string, which is where the pattern breaks.',
              'Play the figure and say the letters aloud. The mouth catches a repeat before the ear does.'],
          playalong: { exercise: 'p1-alternate-cross', loop: true,
                       note: 'The string changes at beat 3. The alternation does not.' }
        },
        {
          h: 'Through a real line',
          practice: { do: 'Both hands working. Halve the tempo the moment a finger repeats.',
                      until: 'you can play it four times through at a tempo where the pattern never breaks.',
                      mins: 6 },
          p: ['Here the fretting hand is moving too. Keep the alternation strict and let the other hand ' +
              'work around it.',
              'Slow enough that the pattern holds. A tempo where it breaks is teaching the break.'],
          playalong: { exercise: 'p1-alternate-scale', loop: true,
                       note: 'If a finger repeats, halve the tempo and start again.' }
        },
        {
          h: 'm and a alternate as well',
          practice: { do: 'Read every i as m and every m as a. Same rhythm, weaker pair.',
                      until: 'the m-a version sounds as even as the i-m version did.',
                      mins: 5 },
          p: ['i and m is the pair that comes up most, but any two neighbours work. m and a is worth ' +
              'building early because the ring finger is weaker and gets skipped otherwise.',
              'Run the same figure with m and a in place of i and m.'],
          tab: { exercise: 'p1-alternate-ma',
                 caption: 'Read i as m, and m as a. Same rhythm.' }
        },
        {
          h: 'The thumb does not interrupt',
          practice: { do: 'Listen for a gap on the thumb notes rather than watching for one.',
                      until: 'the fingers keep their pulse straight through every bass note.',
                      mins: 6 },
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
          practice: { do: 'Basses alone first. The thumb moves away from the palm, in front of the fingers.',
                      until: 'the thumb and fingers never touch each other while playing.',
                      mins: 3 },
          p: ['The thumb plays on the far side of the fingers, moving away from the palm. Cross it ' +
              'behind them and the two collide on every other note.',
              'Play the basses alone first, so the movement is set before anything else is added.'],
          tab: { exercise: 'p1-thumb-alone',
                 caption: 'Sixth, fifth, fourth, fifth. Thumb throughout.' }
        },
        {
          h: 'Add the fingers between',
          practice: { do: 'Bass on the beat, finger between. Slow enough that both parts are deliberate.',
                      until: 'two bars pass with the bass even and the offbeats landing where they should.',
                      mins: 6 },
          p: ['The thumb lands on the beat; a finger falls between the beats. Two things at once is the ' +
              'point of the unit, and it arrives here.',
              'Start slow enough that both parts are deliberate. The bass is what holds when the rest wobbles.'],
          playalong: { exercise: 'p1-thumb-under', loop: true,
                       note: 'Bass on 1 and 2, fingers on the offbeats.' }
        },
        {
          h: 'Let the bass keep going',
          practice: { do: 'Play the bass alone, keep it running, then add the fingers without altering it.',
                      until: 'the bass sounds identical with the fingers in as it did without them.',
                      mins: 6 },
          p: ['If the thumb pauses when a finger plays, the two parts have merged into one. The test is ' +
              'whether the bass stays even while the fingers change.',
              'Play the bass alone, keep it going, and add the fingers without letting it alter.'],
          playalong: { exercise: 'p1-thumb-steady', bpm: 40, loop: true,
                       note: 'Listen only to the bass. It should sound the same with the fingers in as out.' }
        },
        {
          h: 'A rest stroke on the bass',
          practice: { do: 'Each thumb stroke coming to rest against the string below it.',
                      until: 'the bass has weight and does not ring on into the next note.',
                      mins: 4 },
          p: ['The thumb can land on the next string too, which gives the bass weight and stops it ' +
              'ringing into the following harmony.',
              'Use it where the bass line is the tune. Use a free stroke where the basses need to ' +
              'overlap.'],
          tab: { exercise: 'p1-thumb-rest',
                 caption: 'Each thumb stroke coming to rest on the string below.' }
        },
        {
          h: 'Count out loud',
          practice: { do: 'Say one and two and while playing. The part that drifts is the one you are not counting.',
                      until: 'you can count aloud through two bars without either part slipping.',
                      mins: 6 },
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
          practice: { do: 'Move each finger as close behind its fret as it will sit without touching it.',
                      until: 'every note sounds clean with noticeably less effort than before.',
                      mins: 4 },
          p: ['The note is made by the fret, not the finger. Pressing halfway between two frets needs ' +
              'far more force and still buzzes.',
              'Move each finger as close behind its fret as it will sit without touching it.'],
          tab: { exercise: 'p1-fret-pressure',
                 caption: 'One finger per fret. Finger 1 at fret 1, and so on.' }
        },
        {
          h: 'Find the least pressure',
          practice: { do: 'Press until clean, back off until it buzzes, add the smallest amount back.',
                      until: 'you can find the buzz point on every note and sit just above it.',
                      mins: 6 },
          p: ['Press until the note sounds cleanly, then back off until it buzzes, then add the smallest ' +
              'amount back. That is the pressure to use.',
              'Most players use several times what is needed, which is where fatigue and slow changes ' +
              'come from.'],
          playalong: { exercise: 'p1-fret-light', bpm: 40, loop: true,
                       note: 'Find the buzz on every note, then come back from it.' }
        },
        {
          h: 'The thumb behind, not over',
          practice: { do: 'Thumb behind the neck, roughly opposite the second finger, while the strings change.',
                      until: 'the thumb has not moved at all across eight bars.',
                      mins: 5 },
          p: ['The fretting thumb sits behind the neck, roughly opposite the second finger. It balances ' +
              'the fingers rather than squeezing against them.',
              'A thumb hooked over the top shortens the reach of every finger. That grip has uses; none ' +
              'of them are in this unit.'],
          playalong: { exercise: 'p1-fret-clean', loop: true,
                       note: 'Changing strings each beat. The thumb should not move at all.' }
        },
        {
          h: 'Keep the fingers near the board',
          practice: { do: 'Watch the fingers doing nothing rather than the one playing. Those are the ones that fly.',
                      until: 'no finger lifts more than a centimetre from the strings.',
                      mins: 5 },
          p: ['A finger that lifts an inch has an inch to travel back. Held close, it arrives before ' +
              'the beat needs it.',
              'Play the figure below and watch the fingers doing nothing. Those are the ones that fly.'],
          tab: { exercise: 'p1-fret-close',
                 caption: 'Four fingers, two strings. Nothing lifts far.' }
        },
        {
          h: 'Arrive together',
          practice: { do: 'Slow the tempo until the fretting hand is always waiting for the picking hand.',
                      until: 'no note buzzes at the start, at a tempo you can hold for a page.',
                      mins: 6 },
          p: ['A note sounds cleanly when the fretting finger is down before the string is picked. Late ' +
              'by a fraction and it buzzes; early is free.',
              'Slow the tempo until the fretting hand is always waiting for the picking hand.'],
          playalong: { exercise: 'p1-fret-together', bpm: 42, loop: true,
                       note: 'Fretting hand first, every time. Listen for the buzz that says otherwise.' }
        }
      ]
    },
    /* ═════════════════════════════════════════════════════════════════════
       M1 — Intervals and degrees

       Written after the fact, which is worth recording. M5 shipped saying "a
       minor pentatonic drops the second and the sixth from the minor scale"
       when nothing in the course had ever said what a scale degree was, or a
       tone, or a semitone. Phase 1 chose M3, M5, M7 and M8 and left out the
       unit they all stand on.

       Everything downstream assumes this vocabulary. It comes second, after the
       hands know what to do and before anything starts counting.
       ═════════════════════════════════════════════════════════════════════ */

    {
      id: 'm1-l1', strand: 'M', unit: 'M1', instrument: 'any',
      title: 'Tones and semitones',
      icon: '📏',
      criteria: ['M1.tone'],
      summary: 'The two distances everything else is built from, and where they sit on a guitar.',
      cards: [
        {
          h: 'One fret is a semitone',
          p: ['A semitone is the smallest step in Western music, and on a guitar it is exactly one ' +
              'fret. Move up a fret and you have moved a semitone; move up twelve and you are back ' +
              'where you started, an octave higher.',
              'That is the whole reason a guitar is easier to reason about than most instruments: the ' +
              'distance is the same everywhere, on every string.'],
          practice: { do: 'Play up one fret at a time and listen to how small each step is.',
                      until: 'you can hear that every step is the same size.',
                      mins: 3 },
          tab: { exercise: 'm1-semitone', caption: 'Eight semitones, one fret each.' }
        },
        {
          h: 'Two frets is a tone',
          p: ['A tone is two semitones — two frets. Almost everything in the next few units is ' +
              'described as a pattern of tones and semitones, so these two words do a lot of work.',
              'Some books call them a half step and a whole step. Same things, different names.'],
          practice: { do: 'Play up in twos and compare the sound with the run you just played.',
                      until: 'you can tell a tone from a semitone by ear, without looking at your hand.',
                      mins: 4 },
          tab: { exercise: 'm1-tone', caption: 'Eight tones, two frets each.' }
        },
        {
          h: 'Hear the difference',
          p: ['Put them side by side. The semitone sounds tight and unresolved; the tone sounds open. ' +
              'Naming the interval matters less than hearing which of the two you heard.'],
          practice: { do: 'Play the pair, then look away and have the difference in your head before you play it again.',
                      until: 'you can say which one you just heard without watching your hand.',
                      mins: 4 },
          playalong: { exercise: 'm1-compare', loop: true,
                       note: 'A semitone, then a tone, from the same starting note.' }
        },
        {
          h: 'The two places the pattern closes up',
          p: ['The musical alphabet runs A to G and then starts again, and every pair of letters is a ' +
              'tone apart except two: E to F, and B to C. Those two are a semitone.',
              'This is why there is no black key between them on a piano, and why the fret numbers on ' +
              'the last lesson looked uneven. Nothing is missing there. Those two gaps are the smaller kind.'],
          practice: { do: 'Find E to F and B to C on the neck and play each as one fret.',
                      until: 'you can name the two semitone pairs without thinking, and find both.',
                      mins: 5 },
          tab: { exercise: 'm1-eandf', caption: 'E to F, then B to C. Both one fret.' }
        },
        {
          h: 'Counting a distance',
          p: ['Any interval can be counted in semitones. From any starting note to the note seven ' +
              'frets above it is the same distance, wherever on the neck you begin.',
              'Counting frets is slow and completely reliable, which makes it the right tool while the ' +
              'shapes are still being learned.'],
          practice: { do: 'Count the frets between the first note and each of the others as you play.',
                      until: 'you can say how many semitones any two notes on one string are apart.',
                      mins: 5 },
          tab: { exercise: 'm1-count-up', caption: 'A major scale on one string. Count the gaps.' }
        }
      ]
    },

    {
      id: 'm1-l2', strand: 'M', unit: 'M1', instrument: 'any',
      title: 'The major scale, and its numbers',
      icon: '🔢',
      criteria: ['M1.major', 'M1.degrees'],
      summary: 'One pattern of tones and semitones, and the numbering every other scale is described against.',
      cards: [
        {
          h: 'Tone tone semitone, tone tone tone semitone',
          p: ['That sequence, starting from any note, gives a major scale. Seven notes, and the eighth ' +
              'is the octave.',
              'It is worth memorising as a rhythm rather than a list. Say it aloud a few times and it ' +
              'sticks in a way that reading it does not.'],
          practice: { do: 'Play the pattern on one string, counting the frets: two, two, one, two, two, two, one.',
                      until: 'you can play a major scale on one string from any starting fret.',
                      mins: 6 },
          playalong: { generate: { scaleId: 'major', rootPc: 0, positionKind: 'string', positionIndex: 4,
                                   sequence: 'straight', title: 'A major scale along one string' },
                       loop: true, bpm: 56,
                       note: 'One string, so the pattern of gaps is visible as fret distances.' }
        },
        {
          h: 'The notes get numbers',
          p: ['The first note is the first — the root. The others are the second, third, fourth, fifth, ' +
              'sixth and seventh, in order up the scale.',
              'That numbering is the vocabulary the rest of this course runs on. "The flattened fifth" ' +
              'means the fifth note of the scale, lowered a semitone.'],
          practice: { do: 'Play the scale up and down saying the numbers aloud rather than the letters.',
                      until: 'you can play the fourth or the sixth of a scale on request, without counting from the root.',
                      mins: 6 },
          playalong: { generate: { scaleId: 'major', rootPc: 0, positionKind: 'box', positionIndex: 0,
                                   sequence: 'straight', title: 'C major, numbered' },
                       loop: true, bpm: 60,
                       note: 'One two three four five six seven, then the octave.' }
        },
        {
          h: 'The numbers travel',
          p: ['Move the scale to another key and the numbers move with it. The fifth of G is D; the ' +
              'fifth of C is G. The number describes a position in the scale, not a letter.',
              'That is why players talk in numbers: it says the same thing in every key.'],
          practice: { do: 'Play the same shape from a different root and name the new fifth and sixth.',
                      until: 'you can give the fifth of any major scale without playing it.',
                      mins: 6 },
          playalong: { generate: { scaleId: 'major', rootPc: 7, positionKind: 'box', positionIndex: 0,
                                   sequence: 'straight', title: 'G major, same numbers' },
                       loop: true, bpm: 60,
                       note: 'Different letters, identical numbering.' }
        },
        {
          h: 'In thirds',
          p: ['Playing a scale in thirds means going up two scale steps at a time — first to third, ' +
              'second to fourth, and so on. It is the first pattern that makes the numbering useful ' +
              'rather than theoretical.'],
          practice: { do: 'Play it slowly, naming the pair of numbers for each jump.',
                      until: 'you can run the whole scale in thirds without losing your place.',
                      mins: 8 },
          playalong: { generate: { scaleId: 'major', rootPc: 0, positionKind: 'box', positionIndex: 0,
                                   sequence: 'thirds', title: 'C major in thirds' },
                       loop: true, bpm: 52,
                       note: 'One-three, two-four, three-five, and onward.' }
        },
        {
          h: 'Why seven and not twelve',
          p: ['There are twelve semitones in an octave and a major scale uses seven of them. The five ' +
              'it leaves out are what make it sound like something rather than like everything.',
              'Every scale in this course is a different choice about which notes to leave out.'],
          practice: { do: 'Play the scale, then play every fret in the same span, and listen to the difference.',
                      until: 'you can hear that the scale has a character and the chromatic run does not.',
                      mins: 5 },
          playalong: { generate: { scaleId: 'major', rootPc: 0, positionKind: 'box', positionIndex: 1,
                                   sequence: 'straight', title: 'C major, second shape' },
                       loop: true, bpm: 60,
                       note: 'Seven of the twelve. The other five are the ones you are stepping over.' }
        }
      ]
    },

    {
      id: 'm1-l3', strand: 'M', unit: 'M1', instrument: 'any',
      title: 'The minor scale',
      icon: '🌘',
      criteria: ['M1.minor'],
      summary: 'Three notes lowered, and a completely different mood from the same seven letters.',
      cards: [
        {
          h: 'Three degrees drop',
          p: ['A natural minor scale is a major scale with the third, sixth and seventh lowered by a ' +
              'semitone. Same seven positions, three of them a fret lower.',
              'Describing it that way is the point of the numbering. "Flat three, flat six, flat ' +
              'seven" says the whole thing in four words.'],
          practice: { do: 'Play the major scale, then the minor from the same root, and listen for the three that moved.',
                      until: 'you can hear which degrees changed rather than just hearing it as sadder.',
                      mins: 6 },
          playalong: { generate: { scaleId: 'natMinor', rootPc: 9, positionKind: 'box', positionIndex: 0,
                                   sequence: 'straight', title: 'A natural minor' },
                       loop: true, bpm: 58,
                       note: 'Flat third, flat sixth, flat seventh. Everything else as it was.' }
        },
        {
          h: 'The third is the one that decides',
          p: ['Of the three, the third does most of the work. Lower it alone and the scale already ' +
              'sounds minor; the sixth and seventh colour it further.',
              'This is why the third is the note to find first in any shape.'],
          practice: { do: 'Play the scale and stop on the third each time round. Then do it in major.',
                      until: 'you can find the third of a shape immediately, and hear which kind it is.',
                      mins: 6 },
          playalong: { generate: { scaleId: 'natMinor', rootPc: 9, positionKind: 'box', positionIndex: 0,
                                   sequence: 'pedal', title: 'Returning to the third' },
                       loop: true, bpm: 54,
                       note: 'The pattern keeps coming back. Listen to where it lands.' }
        },
        {
          h: 'The same notes, a different home',
          p: ['A minor and C major contain exactly the same seven notes. What differs is which one ' +
              'you treat as home — and the ear follows that choice completely.',
              'A scale is a set of notes plus a decision about where they resolve.'],
          practice: { do: 'Play the shape ending on A, then the same notes ending on C. Listen to both.',
                      until: 'you can hear the same notes point somewhere different depending on where you stop.',
                      mins: 6 },
          playalong: { generate: { scaleId: 'major', rootPc: 0, positionKind: 'box', positionIndex: 2,
                                   sequence: 'straight', title: 'C major, third shape' },
                       loop: true, bpm: 58,
                       note: 'Same seven notes as A minor. Only the resting place is different.' }
        },
        {
          h: 'Which notes the pentatonic keeps',
          p: ['A minor pentatonic is this scale with the second and the sixth removed — five notes ' +
              'left. Those two are the ones most likely to clash against a chord underneath.',
              'That sentence is what the pentatonic unit assumes you already have.'],
          practice: { do: 'Play the minor scale, then the pentatonic, and find the two notes missing.',
                      until: 'you can name the two degrees the pentatonic leaves out.',
                      mins: 6 },
          playalong: { generate: { scaleId: 'minPent', rootPc: 9, positionKind: 'box', positionIndex: 3,
                                   sequence: 'straight', title: 'A minor pentatonic, fourth shape' },
                       loop: true, bpm: 60,
                       note: 'Five notes. The second and the sixth are gone.' }
        },
        {
          h: 'Say it in numbers',
          p: ['By now every scale in the course can be described the same way: a list of degrees, some ' +
              'of them flattened. Major is one to seven. Natural minor is flat three, flat six, flat ' +
              'seven. Minor pentatonic drops the second and sixth as well.',
              'Learning the shapes is the easy half. This is the half that transfers.'],
          practice: { do: 'Say each scale as a list of numbers before you play it, then play it.',
                      until: 'you can describe any scale you know in degrees rather than in shapes.',
                      mins: 8 },
          playalong: { generate: { scaleId: 'natMinor', rootPc: 9, positionKind: 'box', positionIndex: 4,
                                   sequence: 'in3s', title: 'A natural minor, in threes' },
                       loop: true, bpm: 52,
                       note: 'A shape you have not seen. Name the degrees as they pass.' }
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
          practice: { do: 'Play the marked frets on the sixth string, saying the fret number aloud each time.',
                      until: 'you can find the seventh and ninth without counting up from the third.',
                      mins: 4 },
          p: ['The dots are at frets 3, 5, 7 and 9, with a double mark at 12. They are the same on every ' +
              'guitar, and they are what stops you counting.',
              'Play them on the sixth string and say the fret number aloud as each one sounds.'],
          tab: { exercise: 'm3-dots-six',
                 caption: 'Three, five, seven, nine, twelve.' }
        },
        {
          h: 'The sixth string by name',
          practice: { do: 'Say the letter, then play it. Up and back down, several times.',
                      until: 'you can name every marked fret on the sixth string without working it out.',
                      mins: 6 },
          p: ['Open is E. Then F at the first fret, G at the third, A at the fifth, B at the seventh, ' +
              'C at the eighth, D at the tenth, and E again at the twelfth.',
              'Say each letter as it sounds. The gaps between them are what the next lesson is about.'],
          playalong: { exercise: 'm3-six-letters', loop: true,
                       note: 'E F G A B C D E. Say the letter, then play it.' }
        },
        {
          h: 'The fifth string, same job',
          practice: { do: 'Same routine on the fifth string. Say the letter before the note sounds.',
                      until: 'you can name any marked fret on either bass string within a second.',
                      mins: 6 },
          p: ['Open is A, then B at the second, C at the third, D at the fifth, E at the seventh, ' +
              'F# at the ninth, G at the tenth, A at the twelfth.',
              'These two strings carry most of the bass work in fingerstyle, which is why they come first.'],
          playalong: { exercise: 'm3-five-letters', loop: true,
                       note: 'A B C D E F# G A.' }
        },
        {
          h: 'Fifth and seventh as anchors',
          practice: { do: 'Play across both strings at each fret and listen to the interval stay the same.',
                      until: 'you can put a finger on A or E at the fifth or seventh fret without hunting.',
                      mins: 5 },
          p: ['A at the fifth fret of the sixth string. E at the seventh. Those two carry more weight than ' +
              'the rest because so much sits around them.',
              'Play across both strings at each fret and hear the interval stay the same.'],
          tab: { exercise: 'm3-anchors',
                 caption: 'Fifth, seventh, twelfth, on both strings.' }
        },
        {
          h: 'Landing without counting',
          practice: { do: 'Name each note before you play it, then check. Getting it wrong quickly beats getting it right slowly.',
                      until: 'you are right more often than not, and you have stopped counting up from the nut.',
                      mins: 8 },
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
          practice: { do: 'Play each pair and listen for the two notes matching.',
                      until: 'you can find the octave of any sixth-string note without thinking about it.',
                      mins: 5 },
          p: ['From any note on the sixth string, the same note an octave higher sits on the fourth ' +
              'string, two frets along. One shape, anywhere on the neck.',
              'Play the pairs below and hear them match.'],
          tab: { exercise: 'm3-oct-six-four',
                 caption: 'Sixth string, then its octave on the fourth.' }
        },
        {
          h: 'The same from the fifth',
          practice: { do: 'Fifth string to third string, same shape. Play the pairs and hear them match.',
                      until: 'the shape works from either bass string without you checking which you are on.',
                      mins: 5 },
          p: ['Fifth string to third string works identically: across two, up two. Learning the sixth and ' +
              'fifth strings by name therefore gives you the fourth and third for free.',
              'That is the whole reason the last lesson only covered two strings.'],
          playalong: { exercise: 'm3-oct-five-three', loop: true,
                       note: 'Fifth string, then third. Same shape as before.' }
        },
        {
          h: 'Where the shape changes',
          practice: { do: 'Play both versions and feel the stretch change from two frets to three.',
                      until: 'you reach for three frets automatically once the second string is involved.',
                      mins: 6 },
          p: ['Between the third and second strings the tuning narrows by a semitone, so the octave shape ' +
              'stretches to three frets instead of two.',
              'Play both versions here. The change is not an exception to remember so much as the one ' +
              'place the pattern bends.'],
          tab: { exercise: 'm3-oct-shift',
                 caption: 'Fourth to second: three frets. Third to first: three frets.' }
        },
        {
          h: 'One note, everywhere it lives',
          practice: { do: 'Chain the shape and listen for the moment it stops matching. That is a wrong turn.',
                      until: 'you can find four places to play one note and hear that all four agree.',
                      mins: 6 },
          p: ['A single pitch appears in several places. Chaining the octave shape finds them without ' +
              'knowing any of their names.',
              'Play the chain and listen for the moment it stops matching — that is a wrong turn, and ' +
              'hearing it is the skill.'],
          playalong: { exercise: 'm3-oct-chain', loop: true,
                       note: 'Every note here is the same letter.' }
        },
        {
          h: 'Tuning by octaves',
          practice: { do: 'Play each pair and listen for the wobble rather than looking at anything.',
                      until: 'you can hear a string that is slightly out and say which way it needs to go.',
                      mins: 5 },
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
          practice: { do: 'Retune, then play the open strings in order and listen to what the guitar has become.',
                      until: 'the six open strings ring as one chord with nothing sounding wrong.',
                      mins: 4 },
          p: ['DADGAD lowers the sixth, second and first strings by a tone each. Everything else stays ' +
              'where it was.',
              'Retune, then play the open strings in order and listen to what the guitar has become.'],
          context: { tuning: 'DADGAD', capo: 0 },
          playalong: { exercise: 'm3-dadgad-open', loop: true,
                       note: 'D A D G A D, low to high.' }
        },
        {
          h: 'What moved, exactly',
          practice: { do: 'Open string, then the second fret, on each string that changed.',
                      until: 'you can say which three strings moved and by how much, without looking it up.',
                      mins: 4 },
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
          practice: { do: 'Play only the fifth, fourth and third strings. Nothing here has changed.',
                      until: 'you can name notes on those three strings as fluently as you did in standard.',
                      mins: 4 },
          p: ['The fifth, fourth and third strings are untouched. Every note you learned on them is still ' +
              'there, in the same place.',
              'Half the neck is unchanged, which is why this is a retuning rather than a new instrument.'],
          context: { tuning: 'DADGAD', capo: 0 },
          tab: { exercise: 'm3-dadgad-same',
                 caption: 'A, D and G strings. Nothing here has moved.' }
        },
        {
          h: 'A shape you know, a chord you do not',
          practice: { do: 'Play both, listening to how different a familiar fingering has become.',
                      until: 'you can hear that the open strings alone are the sound the tuning is for.',
                      mins: 4 },
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
          practice: { do: 'Say the letter before you play it, using what moved and what did not.',
                      until: 'you can locate a named note anywhere on the neck in this tuning within a few seconds.',
                      mins: 8 },
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
          practice: { do: 'Put the capo on and play the strings it is holding down.',
                      until: 'you can name all six new open-string pitches without counting.',
                      mins: 3 },
          p: ['A capo at the second fret makes the second fret behave as the nut. The open strings now ' +
              'sound F# B E A C# F#.',
              'Put one on and play the strings it is holding down.'],
          context: { tuning: 'standard', capo: 2 },
          tab: { exercise: 'm3-capo-open',
                 caption: 'The strings behind a capo at the second fret.' }
        },
        {
          h: 'The shapes do not move',
          practice: { do: 'Finger a D shape behind the capo. The hand does what it always did.',
                      until: 'you can play two familiar shapes behind the capo without any hesitation.',
                      mins: 4 },
          p: ['A shape fingered relative to the capo is the same shape. What changes is the pitch it ' +
              'produces, by one semitone per fret.',
              'Play a D shape here. The fingers do what they always did; the sound is E.'],
          context: { tuning: 'standard', capo: 2 },
          playalong: { exercise: 'm3-capo-shape', loop: true,
                       note: 'A D shape and a Dm shape, both behind the capo.' }
        },
        {
          h: 'Know what is actually sounding',
          practice: { do: 'Walk the sixth string naming real pitches, not shapes. Capo at two, so open is F sharp.',
                      until: 'you can say what a G shape at this capo would actually be called.',
                      mins: 6 },
          p: ['The trap is thinking in shapes and losing the pitch. Playing a G shape at the fifth fret ' +
              'is a C chord, and anyone else in the room will call it C.',
              'Walk the sixth string and name the real pitches, not the shapes.'],
          context: { tuning: 'standard', capo: 2 },
          playalong: { exercise: 'm3-capo-pitch', loop: true,
                       note: 'Capo at 2, so the first note is F#, not E.' }
        },
        {
          h: 'Choosing where it goes',
          practice: { do: 'Move the capo to the fifth fret and play the same figure again.',
                      until: 'you can hear the tone tighten and say what key you are now in.',
                      mins: 5 },
          p: ['A capo is for putting a song in a key that suits a voice while keeping shapes that ring. ' +
              'Higher up, the strings shorten and the tone tightens.',
              'Play this at the fifth fret and hear how much brighter the same figure sits.'],
          context: { tuning: 'standard', capo: 5 },
          tab: { exercise: 'm3-capo-choose',
                 caption: 'Capo at the fifth fret. Same shapes, tighter sound.' }
        },
        {
          h: 'The same music without one',
          practice: { do: 'Take the capo off and play the figure where it now falls.',
                      until: 'you can say what the capo bought you, and what it cost.',
                      mins: 5 },
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
          practice: { do: 'Up from the sixth string, two notes per string, all the way across.',
                      until: 'you can play it through twice without reading the tab.',
                      mins: 6 },
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
          practice: { do: 'Start on the high string and come down. Same letters, same alternation.',
                      until: 'descending is as fluent as ascending, at the same tempo.',
                      mins: 6 },
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
          practice: { do: 'Play the shape and stop on a root each time round.',
                      until: 'you can hear which notes are home without looking at the diagram.',
                      mins: 5 },
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
          practice: { do: 'Slide the shape up three frets and play it as C minor pentatonic.',
                      until: 'you can put the shape in any key by naming its lowest note first.',
                      mins: 5 },
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
          practice: { do: 'Groups of three rather than straight up and down. Slower than it looks.',
                      until: 'the grouping runs cleanly through the whole shape without the alternation breaking.',
                      mins: 8 },
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
          practice: { do: 'Play the second box on its own until it stops feeling like the first one moved.',
                      until: 'you can play it without reference to where the first box was.',
                      mins: 6 },
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
          practice: { do: 'The box under the first. Play it up and down until it sits.',
                      until: 'you can move between this box and the first without a gap.',
                      mins: 6 },
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
          practice: { do: 'Every scale note on one string, right up the neck and back.',
                      until: 'you can see the boxes as slices of this rather than as separate diagrams.',
                      mins: 6 },
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
          practice: { do: 'Second box in threes. Feel where the hand wants to move to the next shape.',
                      until: 'you can start a line in one box and finish it in the next without a pause.',
                      mins: 8 },
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
          practice: { do: 'Third box in fours. Narrower frets, so keep the fingers close to the board.',
                      until: 'the grouping is even at a tempo you could not manage lower down the neck.',
                      mins: 8 },
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
          practice: { do: 'Play the blues scale and find the one note the pentatonic did not have.',
                      until: 'you can point to the added note without counting up from the root.',
                      mins: 5 },
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
          practice: { do: 'Coming down, let the added note fall into the fourth rather than stopping on it.',
                      until: 'the note passes through cleanly and you can hear why stopping on it sounds unfinished.',
                      mins: 5 },
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
          practice: { do: 'Play the pentatonic, then go back a card and play the blues scale.',
                      until: 'you can hear which of the two you are playing without being told.',
                      mins: 5 },
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
          practice: { do: 'A broken pattern keeps returning to the note from different sides. Slowly.',
                      until: 'you can hear the flattened fifth each time it comes round, at a steady tempo.',
                      mins: 8 },
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
          practice: { do: 'Play the second box and find the blue note by ear before you look.',
                      until: 'you can locate it in an unfamiliar shape without counting.',
                      mins: 6 },
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

,

    /* ═════════════════════════════════════════════════════════════════════
       M7 — Keys and the number system

       The first unit that needed the `changes` element: a progression is a
       SEQUENCE of chords, and until now the player could draw one chord and no
       more. Predicted before the unit was written, which is worth recording —
       each new strand has wanted one capability the previous ones did not.

       The boxes and the playback come from the same voicing search, so what is
       drawn and what is heard cannot come apart.
       ═════════════════════════════════════════════════════════════════════ */

    {
      id: 'm7-l1', strand: 'M', unit: 'M7', instrument: 'any',
      title: 'Chords have numbers too',
      icon: '🔟',
      criteria: ['M7.numbers'],
      summary: 'Every chord in a key has a degree, and naming it that way says the same thing in every key.',
      cards: [
        {
          h: 'One chord per degree',
          p: ['Build a chord on each note of a major scale and you get seven, one per degree. Three ' +
              'come out major, three minor, and the seventh is a diminished chord nobody uses much at ' +
              'this stage.',
              'They are written as roman numerals: capitals for major, lower case for minor. In C that ' +
              'gives C, Dm, Em, F, G, Am.'],
          practice: { do: 'Play the six chords in order, saying the numeral aloud as each one lands.',
                      until: 'you can name the numeral for any of the six without counting up from the root.',
                      mins: 6 },
          changes: { key: 0, bpm: 66, loop: true,
                     chords: [{ chordId: 'maj', rootPc: 0, beats: 2 }, { chordId: 'min', rootPc: 2, beats: 2 },
                              { chordId: 'min', rootPc: 4, beats: 2 }, { chordId: 'maj', rootPc: 5, beats: 2 },
                              { chordId: 'maj', rootPc: 7, beats: 2 }, { chordId: 'min', rootPc: 9, beats: 2 }],
                     note: 'The six chords of C major, in order. Degrees above each box.' }
        },
        {
          h: 'The one everybody plays',
          p: ['I, V, vi, IV is the progression under a very large fraction of popular music. Hearing it ' +
              'as numbers rather than as C, G, Am, F is what lets you recognise it when someone else ' +
              'plays it in E.'],
          practice: { do: 'Play it round four times, naming the numerals rather than the chord names.',
                      until: 'you can hear the shape of it and would recognise it played in another key.',
                      mins: 6 },
          changes: { key: 0, bpm: 72, loop: true,
                     chords: [{ chordId: 'maj', rootPc: 0, beats: 4 }, { chordId: 'maj', rootPc: 7, beats: 4 },
                              { chordId: 'min', rootPc: 9, beats: 4 }, { chordId: 'maj', rootPc: 5, beats: 4 }],
                     note: 'I V vi IV, in C.' }
        },
        {
          h: 'Minors are lower case',
          p: ['The case of the numeral carries the quality. ii is minor, IV is major, and you can read ' +
              'a progression off the page without being told which is which.',
              'That convention is doing real work — it means a progression written in numbers is a ' +
              'complete instruction.'],
          practice: { do: 'Play the sequence and check each numeral against whether the chord sounds major or minor.',
                      until: 'you can hear major or minor before you look at the numeral.',
                      mins: 5 },
          changes: { key: 0, bpm: 70, loop: true,
                     chords: [{ chordId: 'min', rootPc: 2, beats: 4 }, { chordId: 'maj', rootPc: 7, beats: 4 },
                              { chordId: 'maj', rootPc: 0, beats: 4 }, { chordId: 'min', rootPc: 9, beats: 4 }],
                     note: 'ii V I vi. Two minors and two majors.' }
        },
        {
          h: 'A minor key numbers the same way',
          p: ['In a minor key the same method applies to the minor scale, so the numerals come out ' +
              'differently: i, III, iv, v, VI, VII.',
              'The system is the same; only which degrees are major changes.'],
          practice: { do: 'Play it round and name the numerals. Notice how many are major.',
                      until: 'you can say why a minor key produces a different set of numerals.',
                      mins: 6 },
          changes: { key: 9, bpm: 68, loop: true,
                     chords: [{ chordId: 'min', rootPc: 9, beats: 4 }, { chordId: 'maj', rootPc: 5, beats: 4 },
                              { chordId: 'maj', rootPc: 0, beats: 4 }, { chordId: 'maj', rootPc: 7, beats: 4 }],
                     note: 'i VI III VII, in A minor.' }
        },
        {
          h: 'Write one down',
          p: ['Pick four chords from the six you know and write the numerals. That row of numbers is a ' +
              'song in any key, which is more than the chord names ever were.'],
          practice: { do: 'Play your four, write them as numerals, then play them again from the numbers alone.',
                      until: 'you can play your own progression reading only the numerals.',
                      mins: 8 },
          changes: { key: 0, bpm: 72, loop: true,
                     chords: [{ chordId: 'maj', rootPc: 5, beats: 4 }, { chordId: 'maj', rootPc: 0, beats: 4 },
                              { chordId: 'min', rootPc: 7, beats: 4 }, { chordId: 'maj', rootPc: 5, beats: 4 }],
                     note: 'IV I v IV. One to copy the shape of.' }
        }
      ]
    },

    {
      id: 'm7-l2', strand: 'M', unit: 'M7', instrument: 'any',
      title: 'Moving a song to another key',
      icon: '🚚',
      criteria: ['M7.transpose'],
      summary: 'Numbers transpose for free; chord names have to be worked out one at a time.',
      cards: [
        {
          h: 'The same numbers, a new key',
          p: ['I V vi IV in G is G, D, Em, C. The numerals did not change; only the letters did.',
              'This is the whole payoff of the number system, and the reason a band leader calls out ' +
              '"one four five" rather than three chord names.'],
          practice: { do: 'Play the same progression you just learned, now starting from G.',
                      until: 'you can name the four chords in a new key without writing anything down.',
                      mins: 6 },
          changes: { key: 7, bpm: 72, loop: true,
                     chords: [{ chordId: 'maj', rootPc: 7, beats: 4 }, { chordId: 'maj', rootPc: 2, beats: 4 },
                              { chordId: 'min', rootPc: 4, beats: 4 }, { chordId: 'maj', rootPc: 0, beats: 4 }],
                     note: 'I V vi IV again, this time in G.' }
        },
        {
          h: 'Move it somewhere awkward',
          p: ['E flat has three flats and none of its chords are shapes a beginner reaches for. The ' +
              'numerals are still I, V, vi, IV.',
              'A capo is the usual answer here, which is exactly the trade the capo lesson described.'],
          practice: { do: 'Work out the four chords in E flat from the numerals before playing anything.',
                      until: 'you can name them correctly without a chart, even if playing them is hard.',
                      mins: 6 },
          changes: { key: 3, bpm: 68, loop: true,
                     chords: [{ chordId: 'maj', rootPc: 3, beats: 4 }, { chordId: 'maj', rootPc: 10, beats: 4 },
                              { chordId: 'min', rootPc: 0, beats: 4 }, { chordId: 'maj', rootPc: 8, beats: 4 }],
                     note: 'The same four degrees in E flat.' }
        },
        {
          h: 'Why singers ask',
          p: ['Moving a song is usually about a voice rather than a guitar. A song a tone lower is the ' +
              'difference between straining and singing.',
              'Knowing the numbers means you can do it between verses rather than between rehearsals.'],
          practice: { do: 'Take the progression down a tone and play it from the numerals.',
                      until: 'you can transpose a four-chord song by ear in under a minute.',
                      mins: 6 },
          changes: { key: 5, bpm: 70, loop: true,
                     chords: [{ chordId: 'maj', rootPc: 5, beats: 4 }, { chordId: 'maj', rootPc: 0, beats: 4 },
                              { chordId: 'min', rootPc: 2, beats: 4 }, { chordId: 'maj', rootPc: 10, beats: 4 }],
                     note: 'The same shape again, in F.' }
        },
        {
          h: 'The shapes move too',
          p: ['A barre chord shape transposes by sliding. The numeral tells you which chord; the shape ' +
              'tells you how to play it; the fret tells you where.',
              'Those three pieces of information are separate, and keeping them separate is what makes ' +
              'the neck navigable.'],
          practice: { do: 'Play the progression using movable shapes only, no open strings.',
                      until: 'you can play it in three different keys using the same two shapes.',
                      mins: 8 },
          changes: { key: 2, bpm: 66, loop: true,
                     chords: [{ chordId: 'maj', rootPc: 2, beats: 4 }, { chordId: 'maj', rootPc: 9, beats: 4 },
                              { chordId: 'min', rootPc: 11, beats: 4 }, { chordId: 'maj', rootPc: 7, beats: 4 }],
                     note: 'I V vi IV in D.' }
        },
        {
          h: 'Numbers survive the retuning too',
          p: ['A progression in numerals says nothing about tuning, so it carries into DADGAD or open G ' +
              'unchanged. What changes is the shapes.',
              'That is the last thing the number system buys: it describes the music rather than the ' +
              'instrument.'],
          practice: { do: 'Play the same four degrees, then work out what the shapes would be in another tuning.',
                      until: 'you can see that the progression is unaffected by how the guitar is tuned.',
                      mins: 6 },
          changes: { key: 4, bpm: 70, loop: true,
                     chords: [{ chordId: 'maj', rootPc: 4, beats: 4 }, { chordId: 'maj', rootPc: 11, beats: 4 },
                              { chordId: 'min', rootPc: 1, beats: 4 }, { chordId: 'maj', rootPc: 9, beats: 4 }],
                     note: 'I V vi IV in E.' }
        }
      ]
    },

    {
      id: 'm7-l3', strand: 'M', unit: 'M7', instrument: 'any',
      title: 'Which chord is pulling home',
      icon: '🧲',
      criteria: ['M7.function'],
      summary: 'Some chords rest, some lean, and knowing which is which is how you write an ending.',
      cards: [
        {
          h: 'Home is the first degree',
          p: ['The I chord is where a progression rests. Everything else is measured by how far from it ' +
              'a chord feels, and how strongly it wants to return.',
              'Play a progression that never reaches I and the ear stays unsettled the whole way.'],
          practice: { do: 'Play the sequence and notice how the last chord makes you want the first again.',
                      until: 'you can hear the pull toward home rather than being told it is there.',
                      mins: 6 },
          changes: { key: 0, bpm: 68, loop: true,
                     chords: [{ chordId: 'maj', rootPc: 0, beats: 4 }, { chordId: 'maj', rootPc: 5, beats: 4 },
                              { chordId: 'maj', rootPc: 7, beats: 4 }, { chordId: 'maj', rootPc: 0, beats: 4 }],
                     note: 'I IV V I. The most settled ending there is.' }
        },
        {
          h: 'The fifth degree leans hardest',
          p: ['V is the chord that most wants to resolve to I, and adding a seventh to it makes the ' +
              'pull stronger still.',
              'Almost every ending in the folk and popular repertoire is some version of V going to I.'],
          practice: { do: 'Play V7 to I several times and listen to how strongly the second chord settles.',
                      until: 'you can hear a V7 coming and know what it will resolve to.',
                      mins: 6 },
          changes: { key: 0, bpm: 66, loop: true,
                     chords: [{ chordId: 'dom7', rootPc: 7, beats: 4 }, { chordId: 'maj', rootPc: 0, beats: 4 }],
                     note: 'V7 to I. The strongest resolution in the system.' }
        },
        {
          h: 'The fourth degree leans differently',
          p: ['IV also returns to I, but it arrives from the other side and sounds softer. It is the ' +
              'sound of a hymn ending rather than a blues ending.',
              'Two chords, both resolving home, and completely different in character.'],
          practice: { do: 'Play IV to I, then V to I, back to back. Listen for how differently they arrive.',
                      until: 'you can tell the two resolutions apart with your eyes shut.',
                      mins: 6 },
          changes: { key: 0, bpm: 64, loop: true,
                     chords: [{ chordId: 'maj', rootPc: 5, beats: 4 }, { chordId: 'maj', rootPc: 0, beats: 4 },
                              { chordId: 'maj', rootPc: 7, beats: 4 }, { chordId: 'maj', rootPc: 0, beats: 4 }],
                     note: 'IV I, then V I. Same destination, different road.' }
        },
        {
          h: 'Passing through',
          p: ['A chord in the middle of a phrase is not resting or resolving; it is carrying you from ' +
              'one place to another. ii is the classic example, almost always on its way to V.',
              'Hearing a chord as passing rather than arriving is what stops a progression sounding ' +
              'like a list.'],
          practice: { do: 'Play it and listen to how the second chord refuses to feel like an ending.',
                      until: 'you can hear which chords are passing and which are arriving.',
                      mins: 6 },
          changes: { key: 0, bpm: 70, loop: true,
                     chords: [{ chordId: 'maj', rootPc: 0, beats: 4 }, { chordId: 'min', rootPc: 2, beats: 4 },
                              { chordId: 'dom7', rootPc: 7, beats: 4 }, { chordId: 'maj', rootPc: 0, beats: 4 }],
                     note: 'I ii V7 I. The ii is passing through toward the V.' }
        },
        {
          h: 'Ending somewhere else',
          p: ['A progression that stops on V rather than I leaves the phrase open, which is how a verse ' +
              'hands over to a chorus.',
              'Choosing where to stop is a compositional decision, and the number system is what makes ' +
              'it a decision rather than an accident.'],
          practice: { do: 'Play it and hear the ending refuse to settle. Then add a I chord and hear it close.',
                      until: 'you can end a phrase open or closed on purpose.',
                      mins: 8 },
          changes: { key: 0, bpm: 68, loop: true,
                     chords: [{ chordId: 'maj', rootPc: 0, beats: 4 }, { chordId: 'min', rootPc: 9, beats: 4 },
                              { chordId: 'maj', rootPc: 5, beats: 4 }, { chordId: 'maj', rootPc: 7, beats: 4 }],
                     note: 'I vi IV V. Ends on the V, so it wants to go round again.' }
        }
      ]
    }

,

    /* ═════════════════════════════════════════════════════════════════════
       M8 — Modes

       The unit the whole M strand was heading for, and the first one that
       needed NOTHING new: generated scale material from M5, degree vocabulary
       from M1, and progressions from M7. Written entirely with what was already
       there.

       Modes are usually taught as seven scales to memorise, which is both
       tedious and misleading. They are one scale seen from seven starting
       points, and each has exactly one note that gives it its character. That
       note is what the unit is about.
       ═════════════════════════════════════════════════════════════════════ */

    {
      id: 'm8-l1', strand: 'M', unit: 'M8', instrument: 'any',
      title: 'One scale, seven starting points',
      icon: '🎠',
      criteria: ['M8.parent'],
      summary: 'Every mode is the major scale begun somewhere else, and that is the whole mechanism.',
      cards: [
        {
          h: 'Start on the second degree',
          p: ['Play a C major scale from D to D. Same seven notes, different starting place, and it no ' +
              'longer sounds major. That is D dorian.',
              'Nothing was added or removed. The ear reorganised everything around the new home.'],
          practice: { do: 'Play C major from C, then the same notes from D. Listen to what changed.',
                      until: 'you can hear that the second version is not simply the first one moved.',
                      mins: 6 },
          playalong: { generate: { scaleId: 'dorian', rootPc: 2, positionKind: 'box', positionIndex: 0,
                                   sequence: 'straight', title: 'D dorian' },
                       loop: true, bpm: 60,
                       note: 'The notes of C major, beginning and ending on D.' }
        },
        {
          h: 'Seven notes, seven modes',
          p: ['Do that from every degree and you get seven modes: ionian, dorian, phrygian, lydian, ' +
              'mixolydian, aeolian and locrian, in that order up the scale.',
              'Ionian is the major scale and aeolian is the natural minor, so two of the seven already ' +
              'have familiar names.'],
          practice: { do: 'Play the parent scale from the third degree and name which mode that is.',
                      until: 'you can name the mode produced by starting on any degree.',
                      mins: 6 },
          playalong: { generate: { scaleId: 'phrygian', rootPc: 4, positionKind: 'box', positionIndex: 0,
                                   sequence: 'straight', title: 'E phrygian' },
                       loop: true, bpm: 58,
                       note: 'C major from its third degree. That is phrygian.' }
        },
        {
          h: 'The parent is not the point',
          p: ['Thinking of D dorian as "C major starting on D" explains where the notes come from and ' +
              'tells you nothing about how it sounds.',
              'Once the mechanism is clear, the useful view is the other one: dorian is a minor scale ' +
              'with a raised sixth, which says what it sounds like.'],
          practice: { do: 'Play D dorian, then D natural minor, and find the single note that differs.',
                      until: 'you can describe dorian by what it changes rather than by where it starts.',
                      mins: 8 },
          playalong: { generate: { scaleId: 'dorian', rootPc: 2, positionKind: 'box', positionIndex: 1,
                                   sequence: 'straight', title: 'D dorian, second shape' },
                       loop: true, bpm: 60,
                       note: 'One note apart from D minor. Find it.' }
        },
        {
          h: 'Same shapes, different home',
          p: ['Because the notes are the parent scale, the fretboard shapes are the ones already ' +
              'learned. What changes is which note you treat as home and where you resolve.',
              'A mode is a set of notes plus a decision, exactly as a scale was.'],
          practice: { do: 'Play a familiar C major shape but start and finish on A. Then on G.',
                      until: 'you can produce three different modes from one shape by changing where you land.',
                      mins: 8 },
          playalong: { generate: { scaleId: 'mixolydian', rootPc: 7, positionKind: 'box', positionIndex: 0,
                                   sequence: 'straight', title: 'G mixolydian' },
                       loop: true, bpm: 62,
                       note: 'C major from its fifth degree, resolving to G.' }
        },
        {
          h: 'Order them by brightness',
          p: ['Lydian, ionian, mixolydian, dorian, aeolian, phrygian, locrian. Each step down that list ' +
              'flattens one more degree, and each sounds a little darker than the last.',
              'That ordering is more useful than the numbered one, because it lines up with what the ' +
              'modes actually do.'],
          practice: { do: 'Play lydian, then ionian, then mixolydian from the same root and hear each darken.',
                      until: 'you can arrange three modes by brightness after hearing them.',
                      mins: 8 },
          playalong: { generate: { scaleId: 'lydian', rootPc: 5, positionKind: 'box', positionIndex: 0,
                                   sequence: 'straight', title: 'F lydian, the brightest' },
                       loop: true, bpm: 60,
                       note: 'The brightest of the seven. One note above the major scale.' }
        }
      ]
    },

    {
      id: 'm8-l2', strand: 'M', unit: 'M8', instrument: 'any',
      title: 'The note that does the work',
      icon: '💡',
      criteria: ['M8.character'],
      summary: 'Each mode has one degree that makes it what it is. Find it, voice it, and the mode arrives.',
      cards: [
        {
          h: 'Dorian is the raised sixth',
          p: ['Dorian is a minor scale with the sixth raised a semitone. That one note is the whole ' +
              'difference, and it is why dorian sounds hopeful where natural minor sounds resigned.',
              'Land on it and the mode announces itself; avoid it and you are playing minor.'],
          practice: { do: 'Play the scale and stop on the sixth degree each time round.',
                      until: 'you can find and hold the raised sixth without counting to it.',
                      mins: 8 },
          playalong: { generate: { scaleId: 'dorian', rootPc: 9, positionKind: 'box', positionIndex: 0,
                                   sequence: 'pedal', title: 'A dorian, returning to the sixth' },
                       loop: true, bpm: 58,
                       note: 'The raised sixth is the note the pattern keeps landing on.' }
        },
        {
          h: 'Mixolydian is the flattened seventh',
          p: ['Mixolydian is major with a flat seventh. It loses the pull the leading note gave and ' +
              'settles into something looser — which is why so much folk and rock sits in it.',
              'One note away from major, and a completely different feeling.'],
          practice: { do: 'Play major, then mixolydian, from the same root. Find the note that moved.',
                      until: 'you can hear a flat seventh and name it as the thing that changed.',
                      mins: 8 },
          playalong: { generate: { scaleId: 'mixolydian', rootPc: 2, positionKind: 'box', positionIndex: 0,
                                   sequence: 'straight', title: 'D mixolydian' },
                       loop: true, bpm: 62,
                       note: 'Major, but the seventh is a fret lower.' }
        },
        {
          h: 'Lydian is the raised fourth',
          p: ['Lydian is major with a sharpened fourth — the one note above the major scale, and the ' +
              'reason it sounds like it is floating.',
              'It is the brightest of the seven and the easiest to overuse.'],
          practice: { do: 'Play the scale and hold the fourth degree. Then play major and hold its fourth.',
                      until: 'you can hear the raised fourth as the thing that lifts the scale.',
                      mins: 8 },
          playalong: { generate: { scaleId: 'lydian', rootPc: 0, positionKind: 'box', positionIndex: 0,
                                   sequence: 'pedal', title: 'C lydian, returning to the fourth' },
                       loop: true, bpm: 60,
                       note: 'The raised fourth, over and over.' }
        },
        {
          h: 'Phrygian is the flattened second',
          p: ['Phrygian is minor with a flat second, sitting a semitone above the root. That interval ' +
              'is what gives it the Spanish or middle-eastern colour people reach for it for.',
              'It is the most immediately recognisable of the seven.'],
          practice: { do: 'Play the root, then the second, back to back, and listen to how close they sit.',
                      until: 'you can recognise phrygian from its first two notes.',
                      mins: 6 },
          playalong: { generate: { scaleId: 'phrygian', rootPc: 9, positionKind: 'box', positionIndex: 0,
                                   sequence: 'straight', title: 'A phrygian' },
                       loop: true, bpm: 58,
                       note: 'Root, then one fret up. That is the sound.' }
        },
        {
          h: 'One note is enough',
          p: ['Every mode in the list is one or two degrees away from major or minor. Naming that ' +
              'degree is faster than memorising seven shapes and it transfers to any key.',
              'Learn the characteristic note and the shapes look after themselves.'],
          practice: { do: 'For each mode you know, say its characteristic degree before playing it.',
                      until: 'you can name the characteristic note of four modes without hesitating.',
                      mins: 8 },
          playalong: { generate: { scaleId: 'aeolian', rootPc: 4, positionKind: 'box', positionIndex: 0,
                                   sequence: 'in3s', title: 'E aeolian, in threes' },
                       loop: true, bpm: 54,
                       note: 'Aeolian is the natural minor. No characteristic note to add.' }
        }
      ]
    },

    {
      id: 'm8-l3', strand: 'M', unit: 'M8', instrument: 'any',
      title: 'Choosing one on purpose',
      icon: '🎨',
      criteria: ['M8.use'],
      summary: 'Pick a mood, pick the mode that carries it, and write four bars that prove it.',
      cards: [
        {
          h: 'A mode needs a chord under it',
          p: ['Play dorian over a plain minor chord and it sounds like minor, because nothing is ' +
              'holding the raised sixth in place. Modes need harmony that agrees with them.',
              'That is why this unit comes after progressions rather than before.'],
          practice: { do: 'Play the two-chord vamp, then play dorian over it and hold the sixth.',
                      until: 'you can hear the mode survive rather than collapsing back into minor.',
                      mins: 8 },
          changes: { key: 2, bpm: 66, loop: true,
                     chords: [{ chordId: 'min', rootPc: 2, beats: 4 }, { chordId: 'maj', rootPc: 7, beats: 4 }],
                     note: 'i to IV. The major fourth chord is what holds dorian in place.' }
        },
        {
          h: 'Bright, for something hopeful',
          p: ['Lydian over a major chord gives brightness without sweetness. It is the sound of a ' +
              'film score at the moment something opens up.',
              'Choose it when the thing you are writing needs to lift.'],
          practice: { do: 'Vamp on the two chords and play lydian across them, landing on the raised fourth.',
                      until: 'you have four bars that sound like the mood rather than like a scale.',
                      mins: 10 },
          changes: { key: 0, bpm: 68, loop: true,
                     chords: [{ chordId: 'maj', rootPc: 0, beats: 4 }, { chordId: 'maj', rootPc: 2, beats: 4 }],
                     note: 'I to II. The major second chord is what makes it lydian rather than major.' }
        },
        {
          h: 'Loose, for something rolling',
          p: ['Mixolydian over a major chord with a flat seventh above it is most of folk, blues and ' +
              'rock. It moves without ever quite resolving.',
              'Choose it when you want momentum rather than an ending.'],
          practice: { do: 'Vamp the two chords and play mixolydian over them, leaning on the flat seventh.',
                      until: 'you can play four bars that keep moving rather than arriving.',
                      mins: 10 },
          changes: { key: 7, bpm: 72, loop: true,
                     chords: [{ chordId: 'maj', rootPc: 7, beats: 4 }, { chordId: 'maj', rootPc: 5, beats: 4 }],
                     note: 'I to bVII. The flat seventh chord is the giveaway.' }
        },
        {
          h: 'Dark, for something with an edge',
          p: ['Phrygian over a minor chord with a flat second above it is dark in a way natural minor ' +
              'is not. The semitone at the bottom does all of it.',
              'Choose it sparingly. It is strong enough to become the only thing anyone hears.'],
          practice: { do: 'Vamp and play phrygian, using the flat second as a way in rather than a resting place.',
                      until: 'you can write four bars in it that do not sound like an exercise.',
                      mins: 10 },
          changes: { key: 4, bpm: 62, loop: true,
                     chords: [{ chordId: 'min', rootPc: 4, beats: 4 }, { chordId: 'maj', rootPc: 5, beats: 4 }],
                     note: 'i to bII. That second chord is what makes it phrygian.' }
        },
        {
          h: 'Write the phrase',
          p: ['Pick a mood, pick the mode, and write four bars over its vamp. Use the characteristic ' +
              'note at least twice and finish on the root.',
              'This is the point everything in the M strand was for: not knowing the modes, but ' +
              'choosing one and having it do what you wanted.'],
          practice: { do: 'Write four bars over one of the vamps and play them from memory.',
                      until: 'someone else could name the mood without being told which mode you used.',
                      mins: 12 },
          changes: { key: 9, bpm: 66, loop: true,
                     chords: [{ chordId: 'min', rootPc: 9, beats: 4 }, { chordId: 'maj', rootPc: 2, beats: 4 },
                              { chordId: 'min', rootPc: 9, beats: 4 }, { chordId: 'maj', rootPc: 7, beats: 4 }],
                     note: 'A dorian vamp to write over. i IV i bVII.' }
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
