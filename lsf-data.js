// LSF (Langue des Signes Française) Study Data
// Sets three globals: window.LSF_TOPICS, window.LSF_QUESTIONS, window.LSF_LEARN_PATH

window.LSF_TOPICS = [
  { id: 'lsf-alpha', name: 'Alphabet & dactylogie', short: 'Alphabet', icon: '🤟', desc: 'Manual alphabet and fingerspelling in LSF' },
  { id: 'lsf-num',   name: 'Chiffres en LSF',       short: 'Chiffres', icon: '🔢', desc: 'Numbers and quantities in French Sign Language' },
  { id: 'lsf-salut', name: 'Salutations & émotions', short: 'Salutations', icon: '😊', desc: 'Greetings and emotions in LSF' },
  { id: 'lsf-base',  name: 'Signes essentiels',      short: 'Signes',   icon: '👐', desc: 'Everyday essential signs in LSF' }
];

window.LSF_QUESTIONS = [
  // ── lsf-alpha (001–014) ───────────────────────────────────────────────────
  {
    id: 'lsf-001', topic: 'lsf-alpha', type: 'mcq',
    q: 'The LSF manual alphabet has how many distinct handshapes for the 26 letters?',
    opts: ['24', '26', '28', '30'],
    ans: 1,
    exp: 'The LSF manual alphabet has 26 handshapes, one for each letter of the French alphabet.'
  },
  {
    id: 'lsf-002', topic: 'lsf-alpha', type: 'mcq',
    q: 'Who is credited with creating the first systematic manual alphabet for the deaf in France?',
    opts: ['Louis Braille', "Abbé de l'Épée", 'Samuel Heinicke', 'Alexander Graham Bell'],
    ans: 1,
    exp: "Abbé Charles-Michel de l'Épée (18th century) developed a systematic method of educating deaf people in France including a structured sign system."
  },
  {
    id: 'lsf-003', topic: 'lsf-alpha', type: 'mcq',
    q: 'The Institut National de Jeunes Sourds de Paris (INJS) was founded in which year?',
    opts: ['1760', '1820', '1900', '1650'],
    ans: 0,
    exp: "The INJS Paris was founded in 1760 by Abbé de l'Épée, making it the world's first public school for the deaf."
  },
  {
    id: 'lsf-004', topic: 'lsf-alpha', type: 'mcq',
    q: 'In the LSF manual alphabet, which letter is represented by a closed fist?',
    opts: ['A', 'E', 'O', 'S'],
    ans: 0,
    exp: 'The letter A in the LSF manual alphabet is represented by a closed fist with the thumb resting against the side.'
  },
  {
    id: 'lsf-005', topic: 'lsf-alpha', type: 'mcq',
    q: 'Fingerspelling (dactylogie) is used primarily for?',
    opts: ['All everyday signs', 'Spelling out proper nouns and words with no sign', 'Counting numbers', 'Expressing emotions'],
    ans: 1,
    exp: 'Fingerspelling is mainly used for proper nouns (names, places) and technical terms that do not have an established sign.'
  },
  {
    id: 'lsf-006', topic: 'lsf-alpha', type: 'mcq',
    q: 'LSF (Langue des Signes Française) is?',
    opts: ['A dialect of spoken French', 'A complete language with its own grammar', 'A simplified code for French words', 'An international sign language'],
    ans: 1,
    exp: 'LSF is a fully autonomous language with its own phonology, morphology, syntax and grammar, independent of spoken French.'
  },
  {
    id: 'lsf-007', topic: 'lsf-alpha', type: 'mcq',
    q: 'In LSF, facial expression is?',
    opts: ['Optional decoration only', 'A core grammatical component', 'Not used at all', 'Only used for emotions'],
    ans: 1,
    exp: 'Facial expressions carry grammatical meaning in LSF, including marking questions, negation, relative clauses and intensity.'
  },
  {
    id: 'lsf-008', topic: 'lsf-alpha', type: 'mcq',
    q: 'The letter V in the LSF manual alphabet is made with?',
    opts: ['Thumb and index touching', 'Index and middle finger extended in a V shape', 'All fingers open', 'Curled index finger'],
    ans: 1,
    exp: 'The letter V is represented by the index and middle fingers extended and spread, forming a V shape.'
  },
  {
    id: 'lsf-009', topic: 'lsf-alpha', type: 'mcq',
    q: 'LSF is related most closely to which other sign language?',
    opts: ['BSL (British Sign Language)', 'ASL (American Sign Language)', 'DGS (German Sign Language)', 'ISL (Irish Sign Language)'],
    ans: 1,
    exp: 'ASL (American Sign Language) is historically derived from LSF, brought to the US by Laurent Clerc and Thomas Hopkins Gallaudet in 1817.'
  },
  {
    id: 'lsf-010', topic: 'lsf-alpha', type: 'mcq',
    q: 'In the LSF manual alphabet, the letter "C" is made with?',
    opts: ['Closed fist', 'Open hand flat', 'Curved hand forming a C shape', 'Two fingers extended'],
    ans: 2,
    exp: 'The letter C is made by curving the hand to form a C shape.'
  },
  {
    id: 'lsf-011', topic: 'lsf-alpha', type: 'mcq',
    q: '"Dactylogie" refers to?',
    opts: ['Sign for numbers', 'Fingerspelling of individual letters', 'Lip-reading', 'Non-manual features'],
    ans: 1,
    exp: '"Dactylogie" is the French term for fingerspelling — spelling words letter by letter using the manual alphabet.'
  },
  {
    id: 'lsf-012', topic: 'lsf-alpha', type: 'mcq',
    q: 'Which country did NOT develop its own distinct sign language, instead adopting LSF?',
    opts: ['USA (early influence)', 'United Kingdom', 'Belgium (partially)', 'Australia'],
    ans: 0,
    exp: "The USA's ASL has significant roots in LSF due to the influence of Laurent Clerc. The UK, Australia and other countries developed more independent sign languages."
  },
  {
    id: 'lsf-013', topic: 'lsf-alpha', type: 'mcq',
    q: 'Non-manual features in LSF include?',
    opts: ['Only hand movements', 'Mouth shapes, eye gaze, head movements and facial expressions', 'Body posture only', 'Written notes'],
    ans: 1,
    exp: 'Non-manual features include all visual-gestural components beyond the hands: facial expression, mouth patterns, head tilt, eye gaze, shoulder use and body lean.'
  },
  {
    id: 'lsf-014', topic: 'lsf-alpha', type: 'mcq',
    q: 'The LSF sign for "I/me" is typically?',
    opts: ['Pointing both hands away', 'Pointing the index finger toward oneself', 'Touching the chest with a flat hand', 'Crossing arms on chest'],
    ans: 1,
    exp: "In LSF, first-person reference is shown by pointing the index finger at oneself (the signer's chest area)."
  },

  // ── lsf-num (015–027) ─────────────────────────────────────────────────────
  {
    id: 'lsf-015', topic: 'lsf-num', type: 'mcq',
    q: 'In LSF, the number 1 is shown by?',
    opts: ['Thumb up', 'Index finger extended upward, other fingers closed', 'All fingers up', 'Pinky finger only'],
    ans: 1,
    exp: 'The number 1 in LSF is shown with the index finger extended upward while the other fingers are closed.'
  },
  {
    id: 'lsf-016', topic: 'lsf-num', type: 'mcq',
    q: 'In LSF, how is the number 5 typically shown?',
    opts: ['Fist with thumb out', 'All five fingers extended and spread', 'Three fingers up', 'Index and thumb touching'],
    ans: 1,
    exp: 'The number 5 is shown with all five fingers open and spread apart.'
  },
  {
    id: 'lsf-017', topic: 'lsf-num', type: 'mcq',
    q: 'The number 6 in LSF is shown with?',
    opts: ['Six fingers (impossible)', 'Index finger and thumb pinching, other fingers extended', 'Thumb extended only', 'Index touching thumb, remaining 4 fingers extended'],
    ans: 3,
    exp: 'The number 6 in LSF is signed with the thumb touching the index finger while the other four fingers remain extended.'
  },
  {
    id: 'lsf-018', topic: 'lsf-num', type: 'mcq',
    q: 'For numbers 11–19 in LSF, the signer typically?',
    opts: ['Uses two hands for each digit', 'Flicks individual fingers downward after the base number', 'Spells them out', 'Shows the ten and unit separately on two hands simultaneously'],
    ans: 1,
    exp: 'Numbers 11-19 in LSF are shown by flicking fingers from a closed fist, starting with the index for 11, then adding fingers.'
  },
  {
    id: 'lsf-019', topic: 'lsf-num', type: 'mcq',
    q: 'How are two-digit numbers (20–99) generally shown in LSF?',
    opts: ['One hand only', 'Tens on the right then units on the same hand successively', 'Left hand for tens, right for units shown simultaneously', 'Only fingerspelling is used'],
    ans: 1,
    exp: 'Two-digit numbers are shown sequentially on one hand — the tens digit followed immediately by the units digit.'
  },
  {
    id: 'lsf-020', topic: 'lsf-num', type: 'mcq',
    q: 'Ordinal numbers in LSF (first, second, third...) are typically shown by?',
    opts: ['Separate signs unrelated to cardinals', 'Twisting the cardinal handshape at the wrist', 'Using the non-dominant hand as a base', 'Fingerspelling'],
    ans: 1,
    exp: 'Ordinal numbers are formed by taking the cardinal handshape and twisting it at the wrist.'
  },
  {
    id: 'lsf-021', topic: 'lsf-num', type: 'mcq',
    q: 'In LSF, quantities can be shown simultaneously with the noun they quantify. This is called?',
    opts: ['Classifier predicates', 'Incorporation', 'Spatial grammar', 'Numeral incorporation'],
    ans: 3,
    exp: 'Numeral incorporation is when a number is built into a sign, modifying it to include a quantity (e.g., "three weeks" as a single modified sign).'
  },
  {
    id: 'lsf-022', topic: 'lsf-num', type: 'mcq',
    q: 'The number 10 in LSF is typically shown as?',
    opts: ['Both fists', 'Thumb extended from a closed fist, often with a slight twist', 'Ten fingers all open', 'Index touching thumb'],
    ans: 1,
    exp: 'The number 10 is generally shown with a fist with the thumb extended, often with a small twist or flick.'
  },
  {
    id: 'lsf-023', topic: 'lsf-num', type: 'mcq',
    q: 'The LSF sign for "zero" is?',
    opts: ['Both hands flat', 'An O shape (all fingertips touching the thumb)', 'Pointing down', 'A flat hand waved side to side'],
    ans: 1,
    exp: '"Zero" in LSF is shown with the hand forming an O shape, similar to the manual letter O.'
  },
  {
    id: 'lsf-024', topic: 'lsf-num', type: 'mcq',
    q: 'Counting money amounts in LSF typically involves?',
    opts: ['Only fingerspelling', 'Showing the number then a specific classifier for money', 'Using a calculator sign', 'Mouthing the words only'],
    ans: 1,
    exp: 'Numbers for money are typically followed by a classifier or context sign indicating currency, combined with clear number production.'
  },
  {
    id: 'lsf-025', topic: 'lsf-num', type: 'mcq',
    q: 'For large numbers (hundreds, thousands) in LSF?',
    opts: ['Only written French is used', 'The sign for the power (cent, mille) is combined with the number', 'Fingerspelling only', 'Numbers above 100 are not signable'],
    ans: 1,
    exp: 'Large numbers combine the base number sign with a sign meaning "hundred" (cent) or "thousand" (mille).'
  },
  {
    id: 'lsf-026', topic: 'lsf-num', type: 'mcq',
    q: 'In LSF, time expressions (hours) are typically signed by?',
    opts: ['Fingerspelling every digit', 'Showing the number of hours on the hand at the wrist area', 'Pointing to an imaginary watch then signing the number', 'Using two hands always'],
    ans: 2,
    exp: 'Time in LSF is often indicated by touching the wrist (where a watch would be) then signing the number of hours.'
  },
  {
    id: 'lsf-027', topic: 'lsf-num', type: 'mcq',
    q: 'The number 8 in LSF is shown by?',
    opts: ['Eight fingers (impossible on one hand)', 'Middle finger touching the thumb, other three fingers extended', 'All fingers and thumb closed', 'Index and pinky extended'],
    ans: 1,
    exp: 'The number 8 is signed with the middle finger (or ring finger in some variants) bent to touch the thumb, with other fingers extended.'
  },

  // ── lsf-salut (028–042) ───────────────────────────────────────────────────
  {
    id: 'lsf-028', topic: 'lsf-salut', type: 'mcq',
    q: 'The LSF sign for "Bonjour" (hello) typically involves?',
    opts: ['Pointing to the door', 'A flat open hand moving outward from near the forehead in a wave/salute motion', 'Touching both shoulders', 'Clapping hands together'],
    ans: 1,
    exp: '"Bonjour" in LSF is signed with a flat hand moving outward from the forehead area, similar to a salute.'
  },
  {
    id: 'lsf-029', topic: 'lsf-salut', type: 'mcq',
    q: 'The sign for "Merci" (thank you) in LSF?',
    opts: ['Waving both hands', 'Flat hand touching the lips/chin area and moving forward', 'Pointing to the other person', 'Closed fist on the chest'],
    ans: 1,
    exp: '"Merci" is signed with a flat hand touching the chin or lips, then moving forward toward the person being thanked.'
  },
  {
    id: 'lsf-030', topic: 'lsf-salut', type: 'mcq',
    q: 'How does LSF express "Au revoir" (goodbye)?',
    opts: ['Turning and walking away', 'A wave of the hand, usually open hand moving side to side', 'Both hands clasped together', 'Pointing away'],
    ans: 1,
    exp: '"Au revoir" is typically a waving gesture — an open hand moving from side to side, similar to a casual goodbye wave.'
  },
  {
    id: 'lsf-031', topic: 'lsf-salut', type: 'mcq',
    q: "The sign for \"Je m'appelle...\" (my name is) in LSF involves?",
    opts: ['Pointing upward then spelling name', 'Pointing to oneself followed by fingerspelling of the name', 'Writing in the air', 'Clapping once then signing name'],
    ans: 1,
    exp: 'In LSF, "my name is" is expressed by pointing to oneself and then fingerspelling or producing the name sign.'
  },
  {
    id: 'lsf-032', topic: 'lsf-salut', type: 'mcq',
    q: 'A "name sign" in Deaf culture is?',
    opts: ['A sign any hearing person can choose', 'A personalized sign assigned to a deaf person by the community', 'A fingerspelling shortcut', 'The same as a nickname in spoken language'],
    ans: 1,
    exp: 'Name signs are personalized signs given to individuals, often by the Deaf community. They are meaningful and community-sanctioned.'
  },
  {
    id: 'lsf-033', topic: 'lsf-salut', type: 'mcq',
    q: 'The LSF sign for "heureux/heureuse" (happy) typically involves?',
    opts: ['Both hands pointing down', 'A circular motion with a flat hand on the chest', 'Wagging index finger', 'Hands fluttering in the air'],
    ans: 1,
    exp: '"Happy" in LSF is often signed with a flat hand making a circular motion on the chest, expressing a warm/positive feeling.'
  },
  {
    id: 'lsf-034', topic: 'lsf-salut', type: 'mcq',
    q: 'The sign for "triste" (sad) typically involves?',
    opts: ['Hands moving upward', 'Both flat hands moving downward in front of the face', 'Touching the forehead', 'Shaking fists'],
    ans: 1,
    exp: '"Sad" is often signed with flat hands moving downward in front of the face, as if showing tears falling.'
  },
  {
    id: 'lsf-035', topic: 'lsf-salut', type: 'mcq',
    q: 'The sign for "fâché/fâchée" (angry) typically involves?',
    opts: ['Smiling and nodding', 'Tense bent fingers on the chest moving outward with an intense expression', 'Open hands raised high', 'Touching the mouth'],
    ans: 1,
    exp: '"Angry" is often signed with curved, tense fingers at the chest or face, with a corresponding angry facial expression.'
  },
  {
    id: 'lsf-036', topic: 'lsf-salut', type: 'mcq',
    q: 'In LSF, a yes/no question is grammatically marked by?',
    opts: ['Using a question word at the start', 'Raising the eyebrows and tilting the head slightly forward at the end', 'Lowering the eyebrows only', 'Pausing longer between signs'],
    ans: 1,
    exp: 'Yes/no questions in LSF are marked by raised eyebrows and a slight forward head tilt — a non-manual grammatical marker.'
  },
  {
    id: 'lsf-037', topic: 'lsf-salut', type: 'mcq',
    q: 'The sign for "Comment ça va?" (how are you?) in LSF?',
    opts: ['Points away then waves', 'Involves a thumbs-up query combined with a questioning facial expression', 'Requires fingerspelling', 'Uses the same sign as "what is your name?"'],
    ans: 1,
    exp: '"Comment ça va?" is signed with a sign meaning "OK/how" combined with raised eyebrows indicating a question.'
  },
  {
    id: 'lsf-038', topic: 'lsf-salut', type: 'mcq',
    q: 'The Deaf cultural community in France is called?',
    opts: ['La communauté des sourds-muets', 'La communauté Sourde', 'La société des signes', 'Le club des malentendants'],
    ans: 1,
    exp: '"La communauté Sourde" (capitalised S) refers to the culturally Deaf community in France, distinct from those with hearing loss who do not identify with Deaf culture.'
  },
  {
    id: 'lsf-039', topic: 'lsf-salut', type: 'mcq',
    q: '"Sourd" (capital S) vs "sourd" (lowercase s) in French: what is the distinction?',
    opts: ['No distinction in French', 'Capital S = culturally Deaf (community member); lowercase s = audiological deafness', 'Capital S = more deaf', 'No such distinction exists'],
    ans: 1,
    exp: 'In French, as in English, the capitalised "Sourd" refers to cultural/community identity, while lowercase "sourd" refers to the audiological condition of hearing loss.'
  },
  {
    id: 'lsf-040', topic: 'lsf-salut', type: 'mcq',
    q: 'The sign for "Je comprends" (I understand) in LSF typically involves?',
    opts: ['Nodding only', 'Index finger moving from the temple outward or tapping the forehead', 'Waving both hands', 'Shrugging'],
    ans: 1,
    exp: '"Comprendre" (to understand) is often signed near the temple area, representing the concept of something clicking mentally.'
  },
  {
    id: 'lsf-041', topic: 'lsf-salut', type: 'mcq',
    q: "The sign for \"Je ne comprends pas\" (I don't understand) involves?",
    opts: ['The same sign as understand but with a head shake', 'Wagging a finger', 'Crossing arms', 'Touching the mouth'],
    ans: 0,
    exp: 'Negation in LSF is typically expressed by the same sign with a head shake or by a specific negative movement added to the sign.'
  },
  {
    id: 'lsf-042', topic: 'lsf-salut', type: 'mcq',
    q: 'In LSF, how do you indicate you want to sign more slowly to help a learner?',
    opts: ['Use written paper', 'Reduce signs per utterance and exaggerate movements, or sign slower with a requesting facial expression', 'Stop signing entirely', 'Use fingerspelling for everything'],
    ans: 1,
    exp: 'Asking someone to sign more slowly in LSF involves a gesture/sign meaning "slowly" and clear modulation of sign production pace.'
  },

  // ── lsf-base (043–056) ────────────────────────────────────────────────────
  {
    id: 'lsf-043', topic: 'lsf-base', type: 'mcq',
    q: 'The sign for "manger" (to eat) in LSF?',
    opts: ['Patting the stomach', 'Bringing fingertips of the dominant hand to the mouth repeatedly', 'Rubbing hands together', 'Pointing to a table'],
    ans: 1,
    exp: '"Manger" is signed by bringing the fingertips (clustered together) to the mouth — mimicking the action of putting food in the mouth.'
  },
  {
    id: 'lsf-044', topic: 'lsf-base', type: 'mcq',
    q: 'The sign for "boire" (to drink)?',
    opts: ['Pointing to the throat', 'Tilting an imaginary cup/glass to the lips', 'Rubbing the stomach', 'Making a pouring motion away from the body'],
    ans: 1,
    exp: '"Boire" is signed by mimicking holding a cup and tilting it toward the mouth, as if drinking.'
  },
  {
    id: 'lsf-045', topic: 'lsf-base', type: 'mcq',
    q: 'The sign for "maison" (house/home) typically?',
    opts: ['Points downward', 'Uses both hands to outline the shape of a roof/house', 'Clapping gesture', 'Flat hand on the chest'],
    ans: 1,
    exp: '"Maison" is typically signed by outlining the shape of a peaked roof using both hands meeting at a point above, then dropping to indicate the walls.'
  },
  {
    id: 'lsf-046', topic: 'lsf-base', type: 'mcq',
    q: 'The sign for "famille" (family)?',
    opts: ['Spelling f-a-m-i-l-l-e', 'Both hands forming an F shape or a circular motion in front of the body', 'Touching the chest twice', 'Pointing to several people'],
    ans: 1,
    exp: '"Famille" is often signed with both hands making a circular or sweeping motion to indicate a group, sometimes using an F-classifier.'
  },
  {
    id: 'lsf-047', topic: 'lsf-base', type: 'mcq',
    q: 'The sign for "travail" (work) in LSF typically?',
    opts: ['Pointing to a clock', 'Dominant fist bouncing on the back of the non-dominant fist/wrist', 'Rubbing hands together', 'Touching the forehead'],
    ans: 1,
    exp: '"Travail" is commonly signed with the dominant fist striking or bouncing on the non-dominant wrist/hand — suggesting effort and labour.'
  },
  {
    id: 'lsf-048', topic: 'lsf-base', type: 'mcq',
    q: 'The sign for "école" (school) in LSF?',
    opts: ['Making an O with fingers', 'Clapping the hands together (flat)', 'Spelling e-c-o-l-e', 'Touching the chin'],
    ans: 1,
    exp: "\"École\" is often signed by clapping flat hands together, representing the traditional gesture of a teacher getting students' attention."
  },
  {
    id: 'lsf-049', topic: 'lsf-base', type: 'mcq',
    q: 'The sign for "aider" (to help)?',
    opts: ['Pointing at someone', 'Dominant fist placed on the flat non-dominant palm, with both hands lifting upward', 'Crossing arms on chest', "Patting someone's back"],
    ans: 1,
    exp: '"Aider" is signed by placing the dominant fist on the flat non-dominant hand and lifting both upward, symbolising giving support.'
  },
  {
    id: 'lsf-050', topic: 'lsf-base', type: 'mcq',
    q: 'The sign for "comprendre" (to understand) location is?',
    opts: ['On the chest', 'Near the temple/forehead', 'On the chin', 'On the dominant forearm'],
    ans: 1,
    exp: '"Comprendre" is produced near the temple, associated with thinking and mental processes.'
  },
  {
    id: 'lsf-051', topic: 'lsf-base', type: 'mcq',
    q: 'LSF grammar is primarily based on?',
    opts: ['French word order strictly', 'Spatial grammar, visual iconicity and simultaneous morphology', 'Alphabetical ordering', 'English sentence structure'],
    ans: 1,
    exp: 'LSF uses spatial grammar — locations and movements in signing space carry grammatical meaning. It can also express information simultaneously rather than sequentially.'
  },
  {
    id: 'lsf-052', topic: 'lsf-base', type: 'mcq',
    q: 'The sign for "non" (no) in LSF?',
    opts: ['Index finger pointing down', 'Index and middle fingers (or index alone) snapping shut twice, sometimes with head shake', 'Shaking both fists', 'Waving one hand'],
    ans: 1,
    exp: '"Non" is often signed with the index (and sometimes middle) finger snapping shut, like a "no-no" gesture, accompanied by a head shake.'
  },
  {
    id: 'lsf-053', topic: 'lsf-base', type: 'mcq',
    q: 'The sign for "oui" (yes) in LSF?',
    opts: ['Thumbs up only', 'A nodding fist (dominant hand making a small fist and nodding/bouncing)', 'Open palm facing up', 'Pointing upward'],
    ans: 1,
    exp: '"Oui" is signed with the dominant fist nodding downward, mirroring the head nod for yes.'
  },
  {
    id: 'lsf-054', topic: 'lsf-base', type: 'mcq',
    q: 'The sign for "ami/amie" (friend) in LSF?',
    opts: ['Pointing at someone else', 'Interlinking index fingers of both hands', 'Flat hands touching', 'Thumbs up with both hands'],
    ans: 1,
    exp: '"Ami" (friend) is typically signed by interlinking the index fingers of both hands, showing connection/bond.'
  },
  {
    id: 'lsf-055', topic: 'lsf-base', type: 'mcq',
    q: 'In LSF, role shifting (changement de rôle) means?',
    opts: ['Changing the topic', 'The signer shifts body position and gaze to embody different people in a narrative', 'Switching from LSF to French', 'Using the other hand as dominant'],
    ans: 1,
    exp: 'Role shifting is a key discourse feature of sign languages where the signer physically shifts posture/gaze to represent different characters in a story or conversation.'
  },
  {
    id: 'lsf-056', topic: 'lsf-base', type: 'mcq',
    q: 'The sign for "beau/belle" (beautiful/handsome) in LSF?',
    opts: ['Pointing to a mirror', 'Flat open hand circling in front of the face', 'Touching the lips', 'Clapping once'],
    ans: 1,
    exp: '"Beau/belle" is often signed with a flat open hand making a circular motion in front of the face, meaning beautiful/attractive.'
  }
];

window.LSF_LEARN_PATH = [
  {
    id: 'lsf-init',
    title: 'Introduction à la LSF',
    lessons: [
      {
        id: 'lsf-l01',
        title: "L'alphabet manuel",
        icon: '🔤',
        cards: [
          {
            h: "La dactylogie",
            p: [
              "La dactylogie est l'épellation manuelle des mots, lettre par lettre, à l'aide d'un alphabet gestuel.",
              "Elle est surtout utilisée pour les noms propres, les mots techniques ou les mots n'ayant pas de signe établi."
            ]
          },
          {
            h: "L'alphabet LSF",
            visual: '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(72px,1fr));gap:8px;padding:6px 0;margin-bottom:4px"><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFcAAACJCAYAAABZ/KQzAAADvklEQVR42u2dYW4rIQyEM4iT5P53nPerUvSU3RiwwbBjqarUpqn5GNt42SV4v98vWYwVIRBcwZUJruAKrkxwBVdwZYIruIIrE1zBFVyZ4Aqu4MoEV3Blgiu4gisTXMEVXJngCq7gygRXcAVXJriCK7gywRVcmeAKruDKBFdwBVcmuIJ7utXDxsOG10Jwr6GhA6iUa1QiOxXJj+94ItweNWKRT8gMlw7QWnMtHf3jlZ91c6ir8rxpDCWJ40gAs8c/ZMm5NIRohhUAvSKoLgh36+y3VvPR6s9WZf4aa10AFsbXrFRvaxFFJFxLKEWuK0cngwNgQwuaNUdlKlgjYM3jKpPAjjQHmS1stcBgVSKpas0CKU6K3ck4ayKLw2xjMogtUkIPXB4I7G+lQW/fygAURMz25LyLL/+HXsKoE8FuXflntL9wDEPrYr31f9Lof0uzgB4OddDZ0xWIEQ4lyGlOeC8ODBwzJq90DIyLlP5/RcdN2KaIwtoxW+jIUR75FMEpwH1SVm7z4BV3pYyBPrvApUFlHnAYBBVO10EYmRZwE/K4ycu/Ki0u3n+4St9Eyes14X6FnrSALwWlR0UtuZwTQ753DKFNhFf4jQySjX8/Rb01eNZXtsk0CgGdogqDS0NuyzZpmOznJdzsd8NYU8bS6KnOEPml+N1VftzkxFZfWpuMKx/dLOJ2pquC8fezz6+73Gi5L4uDkYTIVUl1Dk9cqNW6HdSzewxn/93evzorNqrAwUmpVr+ZNS14t5KRYEOWYNE51wqYF7/jxeu22l6qk2b/M+/ydb8nx2TNSGq4V4WNN3kZC6FyN7i/FJtRmdhJua1bMVurdsVqYZpqnNvoI+BuW7yyw83ykInb5NaHp4IwsJmUy9PAWuBSYP3h4iEp4fiChhNVmwEuTwVrhcvXmYaVaWHG4RA4OVJK4vDdNh1kv7awPVgL3EhHcDLYJyh3aToruzi643q6PES1yKpcCOwc5VJg/eFiQ8Uut9NOIe0RRJjST4Lbe+rHsVfFjl6ejZ4UcloRo5Tro8Srm/2WwN3hXLCRyXA/r+epOZdGNS+By81Twt0TnVgF96Rd2qXbPE/uyJY/E8FNVcgvOZYRndrJ7a91hRDWvZVglWRMIzS+Dk9WbuRnSaS4+ZnJwtxDtW5r3ifl3OnnSJZJju6yBEu3zqXA+sPF5AF/W4viZOXOArzlEbNRH8KBoPB/3IPVuGgrR9rSI5qXiMMsPK/ub30VLmKdO/rJUMdc1oxsIo58Qmf2OlcmuIIruDKb/QOxWezO1RFpoAAAAABJRU5ErkJggg==" alt="LSF A" loading="lazy" style="max-width:58px;max-height:80px;width:auto;height:auto;display:block;margin:auto"/><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">A</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Poing, pouce côté</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACKCAYAAAAaGkwMAAADVUlEQVR42u1cW47kIAxMIU7S979j7d9oFeUF+AUGaaRRukPH5SpjDAS/3+/I3MqRvG0ANgDJWzX4Dd5cRwYGsPOzJSWAC69zZQB4Q/czEFydAfhwnRkkkGIY5H9/rezgqY+phkEOSoQX/dBiyCwKxkPhgRmVAdJeMh8mpWIABjM9t5GiRKSlJQhFyfvTgGCRB4TI+b0AQNC+3DPB1oRJjVXVCQBkkUB4Gcw8GWJWAERZUA2Q5seHdokLVcl4zkKn2kk9RvSmZgyAkYGMBMAMNKYFAyBAc64QAyJ5D1Kg1iCGIxMD8AEgM0D26nCWnH8VBuAQXlsskbzRYLRY4KxKhpus6lgCgAaj77ylGd27+y4C9HwyPHxtYC+PB430XBEAbAYETJh2KtyAJoPKZShm1I8PwpcH/DoOM1osqAoeecsI+QDu3XeOl+shZ4NXhmntJHEHAMIPO8K4pnuLksc9kqedCm8AOphYFqD/kAxKBB16skBqqywmZU3XMHg2WGKJjEJsO2+8hgYACKJfPuQf9IgBvfLhAGjDZwsiLo319OVWFN2JUCdtw/RbnCQQBgRPCYQAoTgZjo5R4Ot3ERWAczUHx33J7e1eMZaVAHR/Y0OP8Z+Xzy1Oj/N4XjfkAxBvtcFhKVgkQmikNj5kexiIO2YMYIfxbwDiEC6iFkfjW3Z9hD462+t568kPLWKA1nB2NWIcDRKiFQPQqGmJ35lmOqyxLjjNFplwi6JR6wFcEYCw3rdKhUOzKtrJUViDVgJSH0rehxcDQrcShPra2ofHZCgtAziL9zPEAHjGgCmyybKKlnuDcFGI4JjF+yvHAEgCwBW1/wUAHAnaKhLoPqa35wILpLZDhzRXYoDKHiFMpH31IMjVjF9JAqrnBRCQBWKn00tWz7cCgNW0P8IArkD9HgC8Y0GIFysjCO3hKQFvKcA7BngGxHAvVaXxvb33nN9j/Pd/ddSw1aLp47HeOtApG70ScmJVo2rTqpWMRs8+F2BWADQYx3rkaSZbZadj0C6LbwA2ALnbHgUyGp0JAOwYsBAAzAwAozOAhsYjEgDaawWqxkuNAnflMQgzSqUAI1kS440RiGi4Rh5wd5BRspo7RSo8GhdMa43amWD4wunOBDcAG4Dc7R8wC8bMmV2PXQAAAABJRU5ErkJggg==" alt="LSF B" loading="lazy" style="max-width:58px;max-height:80px;width:auto;height:auto;display:block;margin:auto"/><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">B</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Main plate</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAACLCAYAAAD/A747AAADgklEQVR42u2dWZLkIAxEOx2cpO5/x5z/iVrYJCSR/HW01+dMIVEG4/V6/anta48QCKiACqiagAqogKoJqIAKqJqACqiACqiagAqogKoJqIDWay359bNzOwjoPES82Y5eUFsBiOgE6wK1JQWJD9viw7a83fK9IDkYDmgdV1sCkPiyLRYejkkIaIFh4se2vTDwZh+zEPAUh9lzXlZTKAdArsQ+y2OnTZt2KRMTxUG60hNOME2rqBbI7m498WT5msry2HyjPaqmhVKjJ/ZYVJz74MlTGOZ1MZQbYyatQWWyPAZg0ltxWSzPSWXix/9wWh1RKiUMKpoR1JilU0rdIgCFgO6Ln16pUVmgO0fMIaDB6u7sQMur85RCUVWdnkBZ3eqnFIrKML2A8gZlnig9sWGf63v5dArLEkMhoGrhgFJA49mdAnqxOj3Spp1lJm8Fyo37IJvaW0B14svfvN3yKxVRytz1CWB3pU0qV/2Blh2R9wTKIA+jXKcEp7AAo+Mu3Vu2wREYP6SebZghbTql0pUZe7AEyoQPY8QB74qLt1BbIkuulqP0uObsA8wrcW/2fVJYx9ATdscATFcHZV8i410sc7G2B1AcVCmjXFcFhY5AtEy1SnRKGOhomEGhDKzGXenWp/uFpUIzDWjQCuYqUCYOERy8z+6XhW98cwSTILv2fS6ze49Sv1VWZp2Shd1/pTQWay79KgiGz5NxqTaPgeXpc7SAN+dZh28/R9tkl2wwzebXPxsuJEqvfBxmpBhKp5BiHkZaILvD8Bxu46IRV2dMp8qolRIdjhlqxN6jQ7KyuVs1l2HtuzQwZ4FeM+fIEiilzjyWZxWYM0Aj250RrvMpok5GeeiPsyWz5K8uCs2wZC8yAVXc3ACUga0aDuaIQqPZPSTMrJZPu/adp93prHCz1hIrM+1ighF+00kB85RCe+BhAb4sv0nF6uUHFJxmDLYFVycG98NpdWf9hNo3ZY98UdHN8qffEIHBsXkSaLrYNZA5XNMp0XCfK39Gnrl5fbqiehNQARVQAS3Ytn+ydxZolZ+Qj6dNWRL6cClWK2Rp/AUYiK4SQxHFWRVXdLjyM5RXp00Upj1APa3DmxRqfcNhX6uxAGo9QbYUzNFOiYYWLzOzxDNtOrqEWiSg75ZEwwZVl5zv1KvQ/8u6FfuXnjjWJkBQAPfGUE1NVOkpoAKqJqAm7R9aicjhA9sK5AAAAABJRU5ErkJggg==" alt="LSF C" loading="lazy" style="max-width:58px;max-height:80px;width:auto;height:auto;display:block;margin:auto"/><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">C</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Main en C</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAACKCAYAAAAT8ex2AAAC+ElEQVR42u2cW3LrMAxDDY1Xkv3vEffzZjKpowdJURL0107q2kcASNmK8Xq9Lo3/owiBgAiIgAiIgAiIgAiIgAiIgAjI+uNe+Nz58TNOVgj/+B1PBMIPVaAC1rZA+GCRoy0DrwPvUmVgkR8qu4sDYYSNyqL2kEJkGQEJzRsp5JTW3TxwpRCVXSlEQAREQAREQAREQAREQFZc8e4IBFKI4bgXkDd2B8KILMgMhJ3e546WGbECdlIIZ2dBpirzbSPLCAxEQi0BMI7tVD1hYDUgWZXBGUBomBdWKsEshXD2jGYqu1w5PD0tA0N1YFUgvDYdxQAGjeClsN0dZBfuCKSn12gJ3qUy5AmGRZ6w4ljMAqQHBhsbNXQobgoQdliHAwrCNbnZKwPK+Mvzf8HgD2vwATBnZwgfQg8Pf8MGO6Vcz9wdB31XBiuUMRrAoZWnJkOeJNv6BZ70a57bcMY4Q+JRCsGX2eePwIXTBbIys0wqTemcwdmzycrzgEeG9NrJqlQi0mLFwd8eUCzWPLS2TIt3LdtwOgPuXtyxojmLWBjC8/Ol4WC4fMqoeaWIUIjnAitVs+YNZLQs8kr8bJeOKvkFgwFKDbVMa3fJjibMJFiL5cGMjsGZnXFxlv37xaADRvjzH49OdTRkYWiVkCpDQyh0+h8h90PebwCPPkNBZcgiq2U8+xRkgdGqEGuVpOxWy8onn9EyFJDNoZTVPZ9JIdhRJZ4bd48Egt2gZNqFuJVltE911yzRtzIdgUBANrSNNRBIIcoQARGQk4NVCgkAkr3SUAppmChZRkCebVNm+vUkhWS93/rzvJQhgUCyll9kCFVKIbmzRGU3ExAIyMJZEgUEUsiiKokEskTFObHKpLofMlslzKiQLNb5GvT3oTZBtgyJVEnTm3FKEsl6fZ21+S18JbGsw1SRCQiMlcJr8EWVGUO1Zw+92Rt+swD5fPdQDRR6rJsyZUjNFs+aF7wMjWyW+aaU0FV0xgyBpyVWBBJy4VrtCoiACIjH+AecnK2aSkr2kQAAAABJRU5ErkJggg==" alt="LSF D" loading="lazy" style="max-width:58px;max-height:80px;width:auto;height:auto;display:block;margin:auto"/><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">D</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Index levé</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAACJCAYAAACRkE7lAAAD0ElEQVR42u2dW5asMAhFhZWR9PzneO5vLa9RQiBgJH/V9dKdc3jElE1/f39Hjf8HF4ICU2AKTIEpMAWmwBSYAlNgCkyNAlNgCkyBKTAFpsAUmAJTYApMjQIjGO1Fx4qLv9FXwWDgefqKlXoKoV2thMHXU+f9dHoMS2icHMohUA3tohjJCcE7uGYCMxIoSakuKCfidXUMoj6rBZwMDVgNRvbEqEU5YIbx8BwMgagDdHOEMhJc8aAaiyBMI6m9OUAhhU1WZR+xPZvDF0vBadWAWZtkStfkZNcnW6jrIXY6WK9MR4LXXQXwq4COKMXASeY0GKhx0ULAWzERAXSJjTlZDEkz2DkmvLbNaE5fQDcZZHVAVqmcHW1EF5nhdz2FJoBAUDW/ZtlBWtTdLXrjokh0KQTZOYZQp7t9es+Iolwsu2I95mwhTbmPQXv1FIJVYMhBZedKlQxUTRkVM3tyVhX0ECh2jC9XscU7hd9NyhDcNgnlLiZcHRCUMCAsC8yWJJqTNSSzJFlRo4GTNV38ak4WkgLtncxIRjmr08SuGS7q0ynIPlW1UgVhJhGwg42sVCWpcunBxstjjDeMO+tJG0kImtr0YKRqxEO/ZXbNW2olJAZGHeVhBZhV8aXXFvTU8hu4r3oybd2U9qI+btQwUvbTMXh1ICuY37RNShVLtqg9Wo0TxZeZwNk7cSggpshKmLCKNgZSJ3apwXhdZqUA1T7WNS1IITShKKyAM9pEkmAZwEJ1TwC9Lv+KwdylOo+dlZLPpGNBQsjUEkigLKvAm9IClmoZ2eJxGNh5uvJ9ugQbCcVdQZzcOnevM2sYtVbyjP40Ce8ODr1VMWSkKE2zuVV3PQLbbaEqw8af0F1anFQt4VvXONmspdmillExM1vHsCOYFBbKnpWOaNXwpmpBKcYpYfCGanEt8D5TyH3JSgVmVzDRVS5KMYoYx4GzRZnVyplmKdNxcMbZyvD9FWMSgckSW6gUMwhFAgZlpY/XLVIwtLGNSjGa2PIVMOqf6WTatZmqROAXlO0hFTaXhb4DxuTnf1xQ5sDgS1AkYOiFSjEZbTP7jE4mdgUzu++OdgPjfmP1VkDmwUSs7JvduNgjXVOQMhB5TC2pPX4BrLp/OGbARGzZON/7Ycl4Q/BdpRjStASU3HIhwfeTg7PPXJRaOfsBRo1WprFJ15FV8NKA3hR+R5aD94xfb8pKSxX6pX8KswwMdoVioRg4AUGkjbRgvH4U3gMSkv1m7rWJGzhkoLjQcmCmwBu57WP6FsCj8rWwVrpi0aMl2KKnqmWHAlNgCozn+AfQSwHaBJdSIQAAAABJRU5ErkJggg==" alt="LSF E" loading="lazy" style="max-width:58px;max-height:80px;width:auto;height:auto;display:block;margin:auto"/><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">E</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Doigts repliés</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAACKCAYAAAAT8ex2AAADe0lEQVR42u1dWbIjIQyLKU6S+99R8/mmUkk3ixfhNp9JmkWWjAHTkff7/aryV1pBUIAUIAVIAVKAFCAFSAFSgBQgJ5RuVC++fCbFkHuQHgeInMIMS8kgiHXCyBA4AgGLtr1nGRjJUq1+S0DEYIbBD5mo+anGrOcIOTZjZhwX13j5EJwAhmWk+nJmHk5jyKpl3aNb5sXdipOWzICEsKhPNhaxLhEWySA4NA8Bri00ho3BYfL34imXUUDEYs2gbHHK0P2qs2IoldBp18vBjUgFnoBEWAoO0nKTDBR/K5FMbRsNQ9GScGKTCUNE2XLwsLwWIIxHB6YAtiitKgxOsjGESip3gLAeLiEKEHY/QLOFqH04JEzs2GGIhoUoZdkdBoEvz4qzxFx8yMw+5zEZAH3QOt4DQpTM2kEad+lPU+yk5lGBvGwOy2njEJpp9iRAjph2WX0HlOoZZggUnR2U5TI6IyELQ64GfHeyKB913IYQEfshWodPM8esYu1DEOxLzEL5rmRlGEnirn1oR9Ksqd2zQR5dBpEYSWNm8QgNY3RlBoxICRezwS6Q2K3PI/k/gl3Lq2WPOMR71SwfzhZRDJlu3MEIYJNM5Op3iZnNoEM4GZRG5gMsEmGmUsGaYePa2hcPUBh9SOhebjfSOBQsigE/MpPMJyP960FWXgVMNsDBSB8sfIgoATbyjHrubMQlRCyAMWoEDIApDIDcURvKMsVq9OoFiBh//wuU6dscK/khYsQcq/o+twQu11x9Ankod3Ym+Jo1xDd5UB1DXHXMcs9kOvLtjj5E43YWbli0DWhU6C6Gz235uFMPu6ly3VOD0g6QieuK+GSGSAZAhF0+LUCvwgw46yXEsMKQ/F+AFEMOYlvLMpBiiJHDbxmsGsGQ9NMti2RQgJAzruKQZICgADGWYMswiGiGpI5FGoFF4fwcvQ+R0yXDAIbZ9RAGhuBUhrB0PPSVO8yaT3EMsTuwtG+YoZ2ZMif/L5V+IBirybr/P/+zvs5kHeVZ5epvEkRLMnVyd3DMgWyAhLwJryUGQzJKxr30B0hl6g4vcxwiEfU0YnaE1NUSs6Oc6pNXuwXIEwEBQ32ZGZLGqUpJpnxIAeLtUN0Wd5rXVCmzCPrGQEQZCDkJkG+71yPLdLX3nDIy5OoOrMsLk1glM/tiyMf9q3uqo4mKQwqQAqQA2Sn/AEpHus4CId/1AAAAAElFTkSuQmCC" alt="LSF F" loading="lazy" style="max-width:58px;max-height:80px;width:auto;height:auto;display:block;margin:auto"/><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">F</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Cercle pouce-index</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAACRCAYAAAB64B4uAAADjklEQVR42u1cW5LkIAxDFCfp+99R+zm9qaTDwwYbTNV8JT2ALAubGPD5fFK0v5YDggAkAAlABlpxOm7+eIbTGMJgyD0YeHjGEZZ41RBIu8ruosoARIglseweBAgDkEPjEFWW7AoIgiEhqgFIANIomPz66xbW4tygb9sAzauMZ0BwAQUnB2bXbQCx7DdENQAJQJr0xBsgUH4/XCYACUACkKHmOVKllJDuxJBrlIqTGSIKRGjIpul/d0TqCZBeseQODGHju3j5P/ixRWAekNqiF778RgwMSy6Dl2dsZA2Ssx2zVgtisC836T8630VqrxSiB0Csge52g0it8C4fYHlaB4STgHD3GQIWaRfJ3WGAYPdVZov0vzXsVk/xVwFCZVdwBQg9rCgzNIQNYNAi+8rmrFhWp7oFGBoaYkkr0ANO9mhFzf4il3ESqT7VnKqDb2EL8Veh7XQWFWGfpMAkMIF9kASEBlwKQmwcdhm+pNm930NoxShlYAB4sQQkLTfLrXIHGFAakAVXfAWEnUDAisVbwc+KA5bQkunxSFamMAcGy4qtBdPpv4RY1mTOXKkhs/0blSxTY29WVnwIW5QCY8QIQ1ZkpFg5hjxpghLW5M3SL64nloru0PC8p2BGnCEcjAtG0nzMinBLB30p5DajtWXQcJncObnehGwkUJM2khkNYYULYJC5S67LkEjbqaQH9MQQpPqK5NTJlKUXqnBg8NekDUKAq4qq2kWMFpvGFuISy66MQ540AYouZiqXkZwoLSRwEqIKAdBobfIzsl3T7jA7Dnm6Auct+MLODLkCYZExXBGp1p6gXMkOzGKI5Wa6guiIVabFSubc5TSGxCHEHsGPa7uMAGI2fM/hLm2AcBV1V/WZgx11gCAd2uJedwOAwHKfHo+6q/aTDU3AvIbsIqxxsjtWGUE3P+EyBBVAeAI7dmeIyg0zx4XwxYPVZgZ9eWZnuyy7Ht2mpq71ru6W5TCJ+K5jub1UMs/20YX6UVXUEztmnYDA+cRVP0N4XW3Ev9wdEaRF+n9hT9akXzBkgxUo9/7QGUuqj+kHQwQAeTrJIH1Of8myW6R8L/1/DoYNv59VYvVdk38XxjOlBIk7iDCgMWzNNQQNSEmG1BwvsxzIRdHdaXEILQHCYIhdjUC4jDBDs8VBNfQpfm9itmqpBiBE3VciUuVipohqWREaED2DIA2I9aj0yMAsAAlAApA17R+sqNLDPMByGgAAAABJRU5ErkJggg==" alt="LSF G" loading="lazy" style="max-width:58px;max-height:80px;width:auto;height:auto;display:block;margin:auto"/><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">G</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Index horizontal</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAACTCAYAAAAtFF+rAAAEBklEQVR42u1dW47DIAyMrZyk97/j7O8qIgkPP4ORql21UQvDzGAbmtLv9zuq3TcuCAqgAqgAcmznRmNF4zkqBt2D8/T81hKjEZB4M/bQv7/UAxJvzJzyoB6PKQ/qZEpJrADKGShCiuoG/oNW/9i4gwhIEvKQ2DX2IEeQlljLBuC0/o/IpBAmTUeyxgWGLUA4Pta42FOBYgGUJZLGgPysvQqzdqCRakTwH7EU5+sSW56s8qCAAKEAitPClFyjsmLZg07j2UsXYZ+KM1bJalBZ4isAUTEouUFXoGgEEL4M0NcOUI1uNZElQGQ04J7PGwk30p4PgrG0KYLEMHEdPbwO7ZDhNNI8DcgDHdddq5LQAilyRZE6Xof2aspOoCDYZIQx6ev+/P/HLHD0JYBWjNkFMI9VjBQkp7aVxE4MaQ0wZHbPxuBQpzwQJcezZBBNAImHWOtq8OHiICgCiQZILuXcaKsYvcgupcTIUI7ICJAEiBj0pWNHifWEAOYg8YJfSF9Pg2x8Yx1uVruh/mcr2vfKjS6Pad88Bb3FYquZGuEAGhIU68cpKC8SYAdNAIZDsWD2hX0xVeNmIbqvZtskKL1ikGXJgyd8YiuQOBilw02Al8Q0yxWiLGKn2bVIHeDFIFIAiTSNNpPEkO3zOODAVln0mTOKKRh6TsxuqEDuJUmGNUDWMhupRJLwhLpJTPKLd081HxHZsbGuKYgsTSUGwYE97d2TB5tPgdkfff6pNtzyHlpMSXr8jKKa9IyxqlUPd4iDtgdo9pjMtNlzB521UwlcSiCt5zX6A0kGkTIr3tghccCKjomtqahnFLViIJKWmOXqtb1Jt478zhz//eTpDrx4CXVk5i5lETaYqbet6jvwcOgfpAp1s9sR5uBQOIgwAy5LoNwprbtOtmRH0gON6EE94EBLGlLvwcbgrMY4dHlvaMpLC6AncNAY5GHpKd4A9TBnVSYtgKElUembvJHgdSGicnYAJ0quZwbQKCOkViCTFZANwdGQljojeYGOnuDM9DV8Nh+hbCJeDyLJD1MECRrs6QEIQhKgYExaBugr94Ne/qp5/XSNM0BwZKPbIc4tpLWLxOp2ydr5Hpe01gHCsXHjBJGyG3u+6kFkxaBtjXnHSFodICRhDxWDgjEo/L7VQ19772L1eN1p0GkveZLEdRyQCaHYqX26I2Xs42HSadMVzjy7Fu3MLoFF9oofwdsusz83GKNJyZWOTRsLa3prgKgYVCyqbF4boEwyS5HNZ1je1b5Qh5JYNdc7UBWDCiD/VSo8QF4/7wAryUvdaNIKKPMJWYmDWt+00ZpZt59FlggU77Z2VsDCIINDA3TtMCYGHDa8sPiFOmQCxCMXSx1YVqBYABVABZBn+wPjH/7F5hjh8QAAAABJRU5ErkJggg==" alt="LSF H" loading="lazy" style="max-width:58px;max-height:80px;width:auto;height:auto;display:block;margin:auto"/><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">H</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Deux doigts horizontaux</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEoAAACRCAYAAABkKS6dAAADoklEQVR42u2cW5LrIAxEpymvJPvfo+7vrVRs89AT2n8zcWxy6BZCBuPz+fzxeD8aERAUQREUQREUQfEgKIKyPC7He8nN/0FFvUN6++woRcmDeqSK9TxjFCqrqgVarkx88lRUGSBMDxKDEoKiohifqCiCIqgjQAlBHRjIab1CoMpY9CKUfIrCQ8zCiYoaKa2wcMdgfmBqQEURVH5QQlAHxydaj6AI6oi5nmfGn1pRYni+dJ4j1RUlit/FyzlioS4LUBiwhSxe9/szqWC9TEqUqtaLDtSyes3d0gP8CO6ioborgYow+fksxKnA35yssxKgNQDh4W+JsB4GwKLzemLUniFYV6DlrHKqLdKDmbiDGxXiJVhD0QFlRr07JUFRaWINShTjRs/3cKNOjQFFPBQFBzV950ZasMyt51UjR8eEGAvAYA0qOvt2O5pj48UQ1q/RT1Xtl6HtxEFZchOM/08dMPG7YKEovEwd8Pe8kkX73m+pw5QrmpGassQvtc6pEMyh0DGyek4zsp3lj56tHvQWB6EFatf1BWaKQqYfMqHmtwroEig5QT2aeVTV1SqYzK1CRr2VgB6m6FbIdohsRytmu7B7Z3hcFQFmOE61INvhKxnsbYMotAceikIiS2muWhEtRWWa8CKiw6pVODUBDdm3KV1wdLVbplSjqy2XUm/eVRm1oYQBvox76ymerI5cotTWrqfXzbAHrUq/Ifv9Ki2f/gUm3SINJITkOjmvuEsdER3XktlKJtMN8/wsEtSvXKbnmZzWnE9NUeJouZU3Ksqu1vs1mR3dwQDjjpsChcjY8HA+PO9fsXoQYr+WwHZai1JNYWXIzCVD5j0LSpzUJA8ViFTPDqtvGlqteqpNYSxr0qJ4n62COYzO3WYKI8YKcIEa8Zrukitiot4VDANFWL5OIGx3lWUlYrQdyAjKMr6Yrna5guBIEvApJ8VZgvhUO1phq7m2pVFNtTPzI/OozJPpEqBKLej3muuhsppOst7yYHJajEJWULKDmiKrBxGQQOsZQ4oEVS75bMb+xg5qegKFPx7bxyix6PCdg3nvegX1Bfk7ZuA4UVEmltvZeiYDUTvUcscrCgQVPPFuG0ECQSWYKjVajpk5QXnGphFQQj3tsyo4FBQK2E7jWttXD7hpiDHqAFBCUEkz4WxtGN0LI0mAuY/I10CjJDAzDu+c0bf99OxrsX7HE7KDurOiZ++XfWsiHCClmCFcO/4oJpwERVAEddrxD4qNz8H2jI/lAAAAAElFTkSuQmCC" alt="LSF I" loading="lazy" style="max-width:58px;max-height:80px;width:auto;height:auto;display:block;margin:auto"/><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">I</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Auriculaire levé</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF8AAACFCAYAAAA96SS8AAAEZElEQVR42u1d227sIAxcI76k//+P7utqFRIMvpKxVFVqz8nCMB5fApT+/v4+sBhrgADgA3wYwAf4MIAP8GEAH+DDAD7AhwF8gA8D+AAfBvABPgzgp7QOCLaNBz8ngO8P+u/vCbJjDzx9fU0tEpi/Bzw9SA5/fScw3x74ad0H+HbAI9XMCjzAR5H1TtYDfHvgGeDHGwH8JHJzWpG13F+JtH4g4Ff/hgJYzyeCP8NyVloEM72PBp+Fg2fBxEYLodoe2J1bTw68FHTJ4vHgOezB+ijwWTBAVmLiaBF40nuOrHBp4vf0ID0rnzkjS+Ze3QJZTwrM1RyXdoZD2Zm/ylp28LrwPF+zeNGsGEkpfdT0JvH82qJ2sZH7r3oBK3oBRTP/bhVnswUvd6eNsVg+ZzvgkjBbiPaEKI9c+symtMJsMbhgKTKPZc159clxESQpJkeQpSlPkh8m5ikJdykpf2k7KQVc8f/rBpNckSBSCHQfwXNT9Pm7MctW+uhW2VCaQGuh+RqFk1WwtJY7sgCfAxaDEhVyqQPuCDgtL1glAP98p4wL2RRyeEmWYe0FWt1JFylrmQe34QWe2czyZ/VJBkvfKJHhJEPfPnlqPl0wkALYryFrmnLIHuC7l9zFxkPW4FMASzNpeppUkwuzNJ11Bbf3Cr48qIbpdObTAPSI4BsNNnuDH5mlfG4Wu7T2t0XG8eYCcEYmColC3swnRdmIaJxRVeZrMu6IVLGS5t95QGTA5IsvF4nri6BpZi6enUipF45S2RQn0K9ekEu1/DuLIWXwUscH7RfoUVpestjS2jpCH93Nr2gvvMy4GvOPAGEQg+gE5kfHg5lF5Ynxcmbmj/LnFRaxIaPTFIFdeXI7+TpfPIsc2T8b8NNedrSrl9aMkxx8Nk9fmzJ7NBk5s8u4dBIQne3wQ0CmB2nSBsZ1S0wzdmGJxksC+e44OJr1kcyXBmYvqbtrV1AF8J+aa7MnHe/kZfet2t2FF24naSyKLAtgaEJ+pNkJ/dQhT/GnXIVLky4tedYIpCdPo0G8YKGnlWovzLYZtHcgz4IX1vboToBLCxxLT2SDcacAnwOZNZs1kfIz04C/c08NKS1+mY1Vp19qSgsLzBXA1zxoQIpg84b8ue6iyNDbsTj0XOI4aeS+nWwHk933DmW/XdC7BnEdUwPwcWPCFe6BMaFVHXhluQHzg4HfAf+k/fVhc2nKDKrC+BRjfpvscCYPbhXd9QTgVytcBFeAXz8e9RcBn04mG4AH+K8D/g2pZuqMzPsi61dmNR7gZzpNWKIGsTgcgVulAjUfC5Ag4FZ4z3tkkbV7rinL8dHSFS495N6j/TWvuI/Hq71wxPW7KLIA/vHGAP/wIq2BrZCd17UWIDsAH+BD7wuDj1ZyAPi/Z57YeTFK/yGzZsA2dgDm6tnlWhXdwN29r2gp2x+KuPgiw1+QSNGy9rz4goMBT+ctnjvWssnD3Ysel7uZ33yd7927ZjqN+VkXABUu2gswV/sH6Qwl2J+jhuAAAAAASUVORK5CYII=" alt="LSF J" loading="lazy" style="max-width:58px;max-height:80px;width:auto;height:auto;display:block;margin:auto"/><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">J</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Auriculaire + tracé J</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAACRCAYAAAA8Vr2EAAADwUlEQVR42u2dW27rMAxETUEryf73OPc3SJNrSRbF1xDoT4Gm9hwORcqOLa/X62LYRaMEBEAADAIgAAYBEACDAAiAQQAEwCAAAmAQQInolOBP4MvvhA44IzwmoBCAYtbL248qhEbhv4p/pPxUXwNwUmg6wKH4VR0AD8JXdcCK+CAAvf5+JoQA9oWL7K8E4Gnd5yRsUHpw4uBaMfFlQVghgP29Pjxkf2YAnzVfvoD4tfl2dE6o3AWJZeZnnYRntxjEekJuhcV3EY3i22V/FgBhxc+4CIvR35ZchHfUfFifREsmPhY/QwhgX+Yj0sm0ZOLfTbmusj/aGjAq2l054iVJRfHvFmV35akFEz9dRFsD5CHII3e7ZQKAzeJ/+ywQwHfBtBdLF5t1zXnW7xAKl+Od0VZAfC7CRuK7KjWeBzEt4XEFuCjTkorPOcBYfBCAvfgh3NSNxdcSSaK4pCUTH1ewdYTfkix6PUC79KxemjwO5CQAOAMMD0B6NcvfHAdOA+kJs38nFPW7p7uz7Pc2Gd8Bedx1dWfZL4Ecgh2DX3OU/ZYBBXe4ABC19s/83aPLm43Zr1aazAFkvZ0EOyE0Zv+2pMIKhMbsnzpe2Z1wPUH273jIniid6+3QluFbkjP3gMpECXl6TENDWze0swWU/03astkt8iY6LEqQOHcKLv0LOLef3RNm/6w4UEwgnAYQsfX8VSJ2bwyqL8Kp7+NfcMqQHr149g+1itf4982mNeHDu/e3ulMJ2ZXtGV1kdac345MoH7wvyNjFLeqBK7kWdECM+u8SQOT6j6gAkEzE40nUE2W/LG4fmCZRtkHsc0F1/2WNbmz5092NLGxDuHeABHLGLxDhuqCovf/oA53CdEESFIJ4OQcOYsEdwDAAAMrmwwHcejYAwOx34gBmPxfhR4GIAJBQ/DAPbnV10FnEr1aCXDp4FoAkEV+iAqD4myP6GzRmbyV05+C+kEFR67rL8tkDn8DIs4Hcr1mZrwmnmIRB8X10Qdz7MQDAnU8nDsj2mJnQkzDrPwHUKEERrI3MACJZWzIDYPYTwFL2j9x66OL2xJ40+7c/WIkO+Ct+ium8FROfL/M07nqEAGwyF3SAbcspdICfoQsEYNv1CAEUbTkjAUCS/xESwIkbqdy8b6wVFP/9c/lOeQPxP13Ad8ordCojO51ycTdUreORQ6DLDWJsQ9nv5wIAOsBOoPLvkx91ACj+eQCiBAEUf7wN/eyTZ1+WM9KHl48+KBIWRabwmwaxJyWJgitMwhSVkzABMAiAABgP4x9Pg9TVLGnPpgAAAABJRU5ErkJggg==" alt="LSF K" loading="lazy" style="max-width:58px;max-height:80px;width:auto;height:auto;display:block;margin:auto"/><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">K</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Index + majeur, pouce</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAACKCAYAAABcrO+mAAAECUlEQVR42u2dW47DIAxFY8RKuv89er5GGo3SFge/uZb606oN4XD9AELp9XpdsDw20AUAAgMQAIE9tNnoXvjmPYJC8sD49D6AOMGgP6+SUEYzGO/cFQMI7GggJHwfQBIHfgA5qYNPVAhtfg4gMAABEMQdAIFCGgV+ADF2S1w1NZ7N1YBKHQYgAAIDEACBAYhlxY0Vw2QFHwpDGIC0sO4b5X7dFWJIUDwpPW3S1WX9BUMI6j3SZABJliYDCCxXlsWCUc0AEuvbuXrmVLUOoQVg7eGMJOqgxdqivY2kyjgWDLIsANnKlAhAUOAdlWWRoeIwuRgIsU3Qr7gewlejZwqRZQGIWoZ1RKY1CwCAQhRBMADHK0SSgrKzC/K+XrhCOGk6euSaOj/ohKNmci1dFit2MgPMnkKQNSVSyMqiEka8k0KOWtvOrhBrGBJVZRkMEtdNmkCsYVTaDM1K3yPPwtDqhikwPu1klSzxCNNIHdKOI0e1SNqmsfD17jDO23bMBz9q7YKsFCBtFxu062sbJuoNFxDLUIbhaKxYcLKTWrfqEIIychaGFUf8Stv4uj+uPFWlrnW4vbR4uttcrbnQRQGqYMm9WCqElG6EjNJhLxcl2iEzFn9sZ5Sy8POIOTNLZYjgD0GD6aEbuj64Ib5Rg3f8sYTOUiUOp8bzl8qXvvh5VnaDUZnU1+vtrBjSA///dDqlSszYnmqZDylz1jw+MAVX2fA9NqTHC/HmW8O8O8riZId3ceLRNaZCY1ZvkgWgtGHQoqsNd4NTQe5Z19Dv4lZqGKtAaBPYfzfndRAAOcBWv1aWx6ItR7JlXaE+7zWNRiIvfLbT+RHVvEsWORUbuzrCd6ZjOEhBbgPAcm/v3VTJSmpIRjBKrIBqKeTd1PlOsI9WRYh71FQILbghEqbN0TDKKuQuPqy6IUoMwj15sNoot1q7AIYTkJ10OYN7CttYHvVYNGAkAhIFo0RiMAJHXzZlhKsjAkjmE0ZTPJAUPbnovSmNM8OIBBKlDJxsXaBzUj07mSntPR5GVJYFGBtATnhoJ1VcGY6NzKqOI4M66o2EMYSgDB0gXeMIVQOiuck5w9pGibNaxgEjkSsoQwqki9sqP3VSeXNBGTcVWalDGYpAGMrIAaTSDXHhtrdzWeVhPAFSxW2VTUZGkxtsc0BnB5fV6rTU6gcpc9B3oRADt0rVgVAjGFBIMneV1qzOOpF2JDmrow2Q1XNOPnUczo03UEjrUYoYAisPhAGkT7oLIDAfIFFugzurCwppACTLyGqZalf7P3UO+C2qBMRzV6L2ukerGPL/b3zYGMQxf9k3k45gPiluaAGhDx3ID793nQpCWyGSTgYE5yyLhDAwUxyY9qLzUakDCAxAAARmZD8K/PXcJmXZrAAAAABJRU5ErkJggg==" alt="LSF L" loading="lazy" style="max-width:58px;max-height:80px;width:auto;height:auto;display:block;margin:auto"/><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">L</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Pouce + index (L)</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHIAAACICAYAAAA71L8CAAAD2ElEQVR42u2dXZLsIAhGg8VKZv975L5O3cp0G8UocHic6e4EDh+K5kd+fn4uLL41QgBIDJAYIDFAAhIDJAZIDJCAxACJARIDJAZIQGKAxACJARKQGCAxQGKALGtKCFzNOj8ngDwTjNfvCiDHgikLYMlEctgoTC2uLHMA4wHeZmFqclBeKlqt2OnKoIWAycQx5SXAVgGkbVTVCEx7U+kaFKJcecwFeAsGUTZAlMXfc/En0spOJhV+S1h7Ol5qIOcqJpH1noMGgSiHJpLcnOfoQoN8Oe7HsbT6gkBPf/f0ezKRfDbalmgRNUYZX4fPswWHaMmqQolZ611QJOh5j4K2KKW1R4125WxF0izR9ZZUSQxKRhXLpR5JxsoWTI1VFynCtR/Zl+E+lVeLrki7apnc+D+9RddQ45aEs5sWSmbOQ1HjK4n2bStOZo+jh0CUREDvNsGX700qEN2ryIprg46ftcphEP4/p9/BXb0sKFffqpWcAtIW/N6q0iUvJ52M/r9thChBVX1k4rfsDh567N6dju7jaFA17t4BkQ1JEvaanVPL6coZt436qgmcj5qIrm0M21h7qsGTlZ5jxsiMapRfkxEZiMW3Sx+v00BmL6nyMAZ3ZdUFqh7kcCaI9qFsLomHvqTGSg27dEAW73gpanQF+DQe5hUvRY1r+7tJqFtBRp3g2IKq0jOrDTFrjQZNHAH1fNbtTmwtqEZzUNnTfnN5qW4vZPkp5bF3Vrl68rZkvF1VWiWYyt6YtdvKOOkCJcjGYFWa8S5VZJWdjdFrUJfFRxdlXHWzt5NcUeMULNkN0AtkZTXKCQC9FVl1199OiQdPUA4O0AOkAe+caqQOTgkA44KsANEi+ayODmZpIyxi0jLZCQ7QA6QkhhjON0WFOZKzTTqeyUJXmFbR6YwtVCuqxnR9cLUxMu1rJ0ZKa6Ybca7KICmngAQiIIHoAtKAmEuRAkRK68424wJk/KAIIGMGpOSjYLKV1rLP82lABCQQA4G0YBDLWq8i07+2j9JKST3CNAHA8hCjKhKIgyAFiDlAGhAprR6JYECcA+mlxJlXzm6/EzjTrNXz4Xm97QIAD28/5EO5pMkP2Ef2PGQPgAn6SCA6gWQhmtK6rU150mumm0x9A/mmc+IAc/mbUxkjMUBuLteAxACJSgFZs7xSWgEZwrjSPFFZkmT+PAIpiRVa9o5l1l2Dg8ySuVa5tGZSpVSY/LQHQbDr2c7+jn7PPvz9r3NPodLea3bsD+dlQfBXvIBMsg8h+jBAXkAtc1BPBtkLlMY9CMgVTTYQN4IERND2AwMkBkgMkNXsH38z3fxB7AJ/AAAAAElFTkSuQmCC" alt="LSF M" loading="lazy" style="max-width:58px;max-height:80px;width:auto;height:auto;display:block;margin:auto"/><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">M</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Trois doigts repliés</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHIAAACKCAYAAAB2HB4JAAADb0lEQVR42u2d246rMAxF68hf0v//R5/X0VFLSXDAl7WleRipF8LyduwQqLzf7xfKr8EpACQCJAIkAiQgESARIBEgAYkAiQCJAIkACUgESARIBEhAIkAiQCJAAhIBEgWQcgrcZROvFUA+D8H7+wSQ90KSE58lB8fw7f12BagCaCndifN32AfY5UHaZkjexzkTGMtj0yIAJQAMqtYFiPKqp0tBM4B4q2RhvCVAVnWi/fkr335EgCiv9QJELjhzunIdQAw7ZpsJIgXi1pbFHM+HZK5aJVBg/Vqt+fS/OAb1YbrVwG6UjS6fCRyZfI9sCGT7BVODQvTuvbLPsT+LrhH4wM9AlGSQbNdnjIADFCcX7ur9Qgb3SOjEDq3ItEYwN1JBfz8/aeZInLYIMULVarCaCm6L6EjDjX5Br0BMBzDMgkB2iHbDcdtsHcF2yDgF3aWtLIobp0HYJrddquQViKEq8uXzQmp9Bpx7ICtuvOQauxvYkyCrQLSn3BYB5F0QV77HnIqZEMGZfY68cklLDmCmyy6a2I0ejfn/812aWwTuAnlH5MrGz/sG1KOP3CJuPT+Gaq8kV2hGUjfeBTMNUBw5D7QFyMrLcKF37A0g1hCpFZC4sbIjgZgUZIY+ywCZw432I6CkA0xNDHH2OTYea7Ml+8inB7XS15nTeKWiI7MUOEerM5J9vJrUjZ6Bd+YxKeHHq03ceHYMn65JpuiRtZkbZ9JvqkfEjAsQpQHQku1H12W4FGNl0byIBm7sBRIVA4kbE4PseJ+/VXZkRzdKFZC4sWAf2Q1gqgx0NrUKEHFktjSaMmgVgDUyjzYBVH7q0GLV28w9GqXmfS064DP3OpZS9bXWNn2wNgFYflVqABGQQCS10tgDsnBT3wGknegZW1/0zgKSnQkNU2tLValaBZA5o53tmQUcCcSFOVKCAgRiUkcCMXnV2n7FJhrIGUexYhMY5Le7gmktEqfWlM8Mp9ihrWhbtQKxyYIASth+eKXj8pe6soMU59eRWoMuHjBHFnYnIBEgSbGAJMXiSECWcKQBsoYrBZDMk4BEgKTwKQBy1wnntrqHIK7+jkf7XQd64kRJYCcKrjxOrXJD2mOv6gOp1fPCLHtVbwb5aYXEYz4D4EOO/PazfVdSLgAfSq3iBBGAwdoPgLAggACJAAlIlEL/AHX9uvfeIvI7AAAAAElFTkSuQmCC" alt="LSF N" loading="lazy" style="max-width:58px;max-height:80px;width:auto;height:auto;display:block;margin:auto"/><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">N</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Deux doigts repliés</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFIAAACLCAYAAADyHc58AAAD2UlEQVR42u2dW3LsIAxEpymvZPa/x75fqbo1ZWNAAiQhvpKJH8yhG4mHY3y/308WeSmJIEEmyASZJUEmyASZILMkyASZILMkSNVyOa47f35HghyHd/c3pLXrkO4gouPY4xV5Z2E+wOTDzzhdkU/94BMYvKiUJypSoihU+tQpfenlSIWfxs9rx/xaH1GtPTulQUcWEKaPxMTrQjvKX0bVCIGKRxtCZPXLIUTeqIsdtsVL2uQWJCcp9gnslPzyMgYRE9MVCBrRVbCRQuTgPVUsXoyoUQoRijalF2u32hmbGxmWFWlqDlGzLsUgRC01SrMBWgTZA3GHEiFVZjFoZ0t2NwOyByInWJeLuoepUXtkBDE6PmbDMaN9cdNxlxGIIwHmD+CoMiFonOkgd6Y3UKoPfhqqaXBQDEAcTXdaVK82BHw7vxiAuCKRhvD6r41RFlnMUrrT0q+yVxxFWY0aM9uzzu1Zr+lu3J2zP9igxmluuTZWcrUDPpVo/PnUd3BsTci9FHwUZuG97Y/UXm9Bx7UYCaQGRM6492k7dqftUNs5sbvzfGjfe+XELgTn7l7DMaNIzSHaiDqpWJcQwQanKzJkgImSR1IAkYP3DAGSnUBadnL0AEUkRT5tyWMnRFizNg1A/a2L5mokV4HcHU3f0iI0nkvp9ysObS39vBXmsi0rdAK6J+Hn6HUjzEfeBRbpUkT3+WWjEmY7gYoNEzohNxX8vCfk2qocHk6WABChpErRmPwKokIpTPHERglm5W1pWjEMUWsDQcv+SXGQsgrSy2YDt+mP2YbxDpIW1CgBSSMQYQGihiLhXMU43dozt0tnsNkF0StIWoPoWZHm+uZygBqXNEBJNZ4HkptUPA0knaoRVhWJwCoOa21ar2CEDQIm3BN5ZMNUpMN0qSSMPSDpxKK0DtJT6rO0nsW4Gt2kSsW4Gnc9T5NRe1fXUxzYGg7q2K1Iq0GGu+sYwdq00NDWQbpZ7i2pxnUgmRB1FQmjENPaShCRIAMFo+LMQrQIsUeRSIgxrG0aoheQ5iF6AOllDvSY5dijQdILxDeQTIi6ikRCjD+ySZCR1FgDyYTYVyw+ry19fmZL/35N+FKrVVx7p/b/x2SwGWzou7eAJEhhPz4dZnEIZbTbwUmKhFd7nGLtBOlZkUwsPhU52nBuFr+sv7QnFblJzUyQ9eGh+TzSetDpGa1sHyJ6gPlb3+5X8WmUq6GluaoyngNWqVQIztRpOmo/WSfkME/b2k8wn97coTGjjRNA1oCOQA3ZRYys2dT+aToHr3UkyFr/eRxADZDh4Zw01k6QCTJLgpxZ/gFi+PO0iPCe2wAAAABJRU5ErkJggg==" alt="LSF O" loading="lazy" style="max-width:58px;max-height:80px;width:auto;height:auto;display:block;margin:auto"/><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">O</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Main en O</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGkAAACJCAYAAAAvxha4AAAEhklEQVR42u2dXZKlMAiFQyor6f3vkXm9Y6n5AwJ4qJqH7rntVb6cQBAj/f39FZhvq3ABIMEACZBggAQDJECCARIMkAAJBkiABAMkGCABEgyQYIAESDBAggESIMEACZBgXqwNfo4HP0dw6RlIPHE8BrRzShpxOAPaeUizEAHNISQJaABnDOnN+Yy4pgOJFx1293e0Edc+B05bSbNgR6bIzy0J2uCF8oLTWcBJJLgkoOxKuoLSuOjR49IknKJ83upWN0Y1HwA0c66//67fxVkhlZcLlgjumiOclAeZK0hPF7wzQi2dFVJVVXh0rl44GYMKpaoqeNEnRikLqyotpJFRykqApFN8/gIkS1ikdK7uQGlXHOjmwiVqc1x045j28V0oaTTJ0Bi5nE1R1j0OJJBdjYxyqYSCvwipN3JZwPkkdG5uQHnoFupVMa4/04DjUoHy0tLVi1cr1XDOAsoLJB6IX3SwQnEUVHUAhycywdEpTTqFPgqqOlIPbTqWDZ3I2SFxkW824ZfpkAXVdERRNbh6PMbSsJAk1fOUZFjdGzIvytZg6iEnI9506qsHAFmvtay+k6NBuk49lrGHsoGqhuphZcX0UvBQHUK/1hThPAVZEnAYvSQPJ2y1gdQUEk84sXcRT//PE6rgTKCaEaDfz62Wc3buIVFkUE0QkPTtgRmAliDMQdUNODuAuNx3v2YJ+qIZX91Uz+oIxtN8ipB2AdFNbKKkUMXUVI0VdAfqrek/+hpHBFQzBEQ/gXT2Lmvk6ZEslPRU3uETJxzcWAOSdIr91AGU3bamvbpJnQVG0deATYOqCyPh+rtewB8BQA/rr6xqEkkcRqe5p3ocD55o73uybbyxVI2oCiPkrYdu5diUTGnT8akKSfSpx2AUDk8AK+VjGaKEkqQaHHlSXZFVNXXdbQAATShgZ5Fbytx+DqS0TAijpB5p6QbHnTapqNPgsJpGpzt+Saelmkx2+9miF2GXII04n5RP2vvmHSYL3OZwhF7re7NxKl3m1xxPA9xJEHqVjijTX3dgtUADqrf7JHeqIJ9eJ1nM1bOL3VSpeA2knJXFKwPSmRR1RlkpQEWISU/OTl9piJ448MS0RiXw/qtREofZhbb1oy9Q0uJC++7mGkVNyzO/5Opu36KQtziyv4lstTcDkBwkHFRk63wMSDpTn1RCwVCS3tTHgoAIkHyBYgU1ApIAqLe70kgcDEGN9nL0FtPi8a2V79rIdthWqnnNNL8M6c1BI21sZpULQHpf4N5tDmJeVgIkJ2k2IMklGEesgoN/AyTZCgQgQUkwV3EIkKAkGCABEgyQYIAESFjIHrOWwIFa70lyc40RlPT0Rs1fp2Z5BJOiKmlkpIdtIf5STEoLKBOk1M8nZVJSyswum5IYSvKtIImY5HbKbEGhfComZUnB08ajTDEpdXYISFDSJ1J4QPoAKM4ASfNpcToIavhFYZG2rdE+/spmvSZLCPSC/++o1R0rV6ezoWMD0juoUuZf1SA+MwBSf/qTiFlbagQkmaRCNW4Ckp8EBuskVBxggARIMPf2Dw2bR9KHgREkAAAAAElFTkSuQmCC" alt="LSF P" loading="lazy" style="max-width:58px;max-height:80px;width:auto;height:auto;display:block;margin:auto"/><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">P</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Index vers le bas</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEcAAACgCAYAAABe8XElAAAC8ElEQVR42u2dS3aDMBAE03qcxPe/Y2flRfLABmkkzae1ywaTonpGMgLj9Xr9aJyPJgSCIziCIziCIziCIziCoyE4giM4giM4ghNqHI7OhQbHQCY4nHg8RIZD46vPk78REQ4nxAEnxx4CdGwGgwnH/w+JvZ/VkoH5ZCO9w1kFxgRQ22TNzgtBz+Zg02e6rTm7rAm1fIDgJLBmtTkQnCTWrDQHgpPImlXmQHCSWbPCHAhOjOFiVc4sNFvBSGEXHGbKYZsEBoKTvDC3QtZs/7ILmRTTvfLJcCg4xSJlAYeKlWqOImUJhzKnqDWVaw5nwokaKaw0B5n1aoWsWVpzIDhFrRkxB4Kj5UPZSHGGOZA5eYf5fSsWhPjYHAhOHWuomjPJHCaNFKxiVa7W3IFDxUrWqCBbwqkUKcqcjnLRRg9QLVblu9QnOEhqjek+ZCYD4/65cs1zAlrDlXCiRBJWq/KnH8oIAEZjxcBmDJ1n66Sdpc13fxOIwSsAB/84Rs71yfKh3MxZGwkG4USsL7Q4757vkLPYY3qvPGv9gVXNyQJo2m5S74CGW7iHhefVzJserBmBY2EPNndGzILjNV7fIrX0VXh3AHkC98hQ6wdD9NB9Z6ENZY0lHD2M1hkvRLRmRqz00H3nFdtdd0rftzJvBG3yFQp9B2L16zdDzYPagiulF7feBLTSHnqGs6O1m670K7yD/ccznLN4McKFyP7KX0SA8z7RUF0s008bIAOcMEU6y8+pcAZwDwtPypyAdjYnJ0+Z8x0QBcfHBDFMzYFHSNreLzh940jwP9Aoku/jMBMc68aArLGiYrVoCdKSR2QI6lEQiFr5A6B66F7mCI5pl/o4gcxiDmTOWqhUzbmOJgTnbztn1kmgVby0Kr9TgxSrpN2KgiNz/E0APcPhyvhEN4eCcz8qrAzn7sZKyBzVHLVywcnSuY7AUFDdnKt9O6gcK35o58s6WXNoylWUlu/+akGitGXe47kgb58Iap4jOIJjPn4BT/6Iwy8h7m8AAAAASUVORK5CYII=" alt="LSF Q" loading="lazy" style="max-width:58px;max-height:80px;width:auto;height:auto;display:block;margin:auto"/><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">Q</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Pouce et index en bas</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAACZCAYAAACfWDw5AAADpklEQVR42u2dSW7DMAxFTUIn6f3v+LsNgtjWwEkiDXTRNB749UiRGlz6+/u7Mh98JT9KgBKgBCgBSoASoAQoAUqAEqAEyHm0DZ8ZPz6jEwnAx8+T8U+fb0sAXn6nH3/DDAkc3HiSxH3XIEiagvBmrZ+2G6RsAtyhjqwEVCb4QAGKgEMEgAAd2wqARTc4qhgiI2LCECCR/BxRDdLkd49KhUXx3kEAeBkejQD6quvNjhY0BiAbASkzQRidE54A6jAaDzECp8SAUYFEUmIOij9liAFvhiKDAO6Z4+4C0I4EwMq46ARQBISqGqxU+NDgVgQETYUhfB7tJAAGv0sWLsGOxiMCXc3YeLr520oLL1WF7Gh8iGSoObf8ZwvSaQKkToVH0VdZ/bFbIkQedLBD64cogiwIIAEBtxNAapUHrO7Pxq2PznM/hcAuBEDh/F4iQi2QIAER8JUmkxYNHKT1766FH66BqC4g0X/TS9p8SdOwy5AYHmKD+0pRKBHyTQNuXGLJBdkAf9wEtxkhqFMoMwHwYDBe0JWOL1Pxpwkaj8EHdRsDkCAANxjSwLl0MzBi2i2zkPFSfb15XcILF6Vrrtx9C2qrBpOWC1gsal51A7WNk5rb2Ujg+qp5gPlevmt8Funu2bAqgIfxI66Am1hE0i5ADq3eIwKt0sRBcHZbLseCfghHeqbvy0IX0hi1geAgCKwHRDDpBtKpMUkQMHNT6c0PalNnrIWWgPEmEyRNuWXI0pjOmCIqQI+feRtPlkFQIh/AQ4a33ZaZ2e0tvwZDVdypGfvcapETcmLkbsRXY5JEXIQm2MpbrAeQJoCEvj8yqCpKQZQdI/CiJ+LcIA1+b+u3yKzuAp0ZmXYXgC6ZNcIibsLOmEtMsoRNhDR6EfF7nb5lBhFjQKiDg5awZq7GTj6KCPiXCyQRgIqAhAIgsgAhFkdlcQHKKACKgIEchjO3fo8AuA4/ODP+TwJQBvw9CUCE1vcSgCIJekIMWJqOq2LIMUrDu/V7BUAREJMCkal4No7WGvc48t3i4VwgWhyYfSfx914lNGU/jeRCP/cUlAuUAEmqviJAQIBowVAkT2mdN4JwRua9MgQjAoy0xOhrctzpaRGxjNwLHFcZVi9wKtpFQAnwWg2q9AKRDyoXKAFkBEAkH85CgFrtMCIAnWb8Si9gseEBFo0wKsB3aazROrCkb4aAp81K6HShMP9raCURGjVI68WLbgKMPDA8jbQQYNtqsjLBEiD58Q87Rei8q6oisgAAAABJRU5ErkJggg==" alt="LSF R" loading="lazy" style="max-width:58px;max-height:80px;width:auto;height:auto;display:block;margin:auto"/><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">R</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Index et majeur croisés</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFIAAACZCAYAAAC8A23sAAAEcElEQVR42u2dXW7tIAyEz6CspPvfo/taReQU8A82GaT70N40go8ZG0gC+Pn5+bDoSyMCgiRIgmQhSIIkSIJkIUiCJEgWgiRIgiRIFoIkSIIkSBaCJMhTynVYe+Th9yBIHcD7/4PWHoeIP/9mgTNGPiiuB1QI8jtATABmjHxQlwyq8+/1GFQn3mptTCagj8V17QA19pSDgWt6yQmrcfU6RIX3xt6ViQXbohM+UA2kGPw9OrERE7GxF1vLWFsUEL/ZEd4d3BKrcCR2zcK06CTJDHIkKYyqaxSm6diyFYO4AtMKGLJm7VGAGjtKJ9s+/f6IKeJ/Vu7FSY1yoeykNCC1GRUG15aPkeI4fly1f5lFi20r1xMwkVmR4qwyGN5fsilSFsZ4SKLKFCBX7IsA1YZY/HICuJJVRVkH7ITZjCFC0SDzsZ2iPRKlSI0K5Z+Bt2wEGBojRWFjzyGQReJCtCKjZiVRYQHRihRnIBHDGEzcZ7iNzaAHPWKaKGGGd/Jl2HAEqmpnGFErMvN8eXtpCVWUtYgFyJGHSL3pXmW4U+JoCze/Q5MvwxAcqHBYW/v+NoN0YMoLLG8WI3vDjS1DkE44kUogv0kegfCe1C/GnbMMMsNqzGocDxuXtoWb7I55YgnAKum1xUrLZogjSUwi63opemnHAgYUHeC63Hct3gRJFDrjJPHs8CtAKbIBosfq1PIbu5aZzksNMzMo14TTHCsQZV9kaMO1EYA2VCCBI1xmNqPDEs1XWpLVJdaKxESje59vSAabWoIUY6hQXJf9gduQtWFs+5XOgEFd3Nc3o180lU48lX8G0ZaJ4ojvtXur53fFiaMrXNdIo4c/I/P0bDFRMoGUwWRStlzBPSoTix7ZMvS2D5ZG4WSG6PY4dtXKI7ueIKkSh+rk9TL+yEfn8pDNP9XU6DXXhqKSJdUYMdfGYAYvn7lbcE/K5NCohK0jkk25xYfVUNOcIGLC/uXV6AUSRez7sXRNC6xcyHfT0ZaOBFlljq2qT8tcuSpqjFLk1u0Iozq8ZezdKglmR4w8wfJpBuTHqnGnIivNbraCRAG1mk5Z24ttbeqMtx4xIBWsfex8OpMidy9euC3lNdqZIFOFn/ZCNYKKTArxDSDDnhOtfkLHMghy9zcx5ca27aTG7HTTG5INCPKAGMlZjANIZm4lSM/tCY9LcIyRBJkrFJ2sSGQEyYTDGJkDJDfZdFBkBXtLZpAVVYnMimQ5DGTKEHMR4LsUGfHs5b4T4NRuf1chBXonkKevc4c2YFo5qwHB9kVAh4UfehEV50rtHjADUrtvTvbj/Mpk7eOnmhyQP7tGCFK3M/R996uh3f1PA2l1pB86PwutnTRGvnW1HFYgT828Jiec0NrjImGMNIK4bW+0k4ZMW7b0euXQidbePEWUgvZMBTLrfma7joUxs3aGU+ZSdOjqwUD3BkR/sZBuF1TtuYjRCpVP0q1krQ4qFwfFlDq3weOEJe8D10odemHZUDkN2q6ZzSteDeTMhiAJkiBZnssvztkWGrQ17GsAAAAASUVORK5CYII=" alt="LSF S" loading="lazy" style="max-width:58px;max-height:80px;width:auto;height:auto;display:block;margin:auto"/><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">S</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Poing fermé</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFIAAACYCAYAAAB3X75JAAADtElEQVR42u2da27jMAyEM4JPkvvfkfurWG/gbfQgJT6GQNEGSBP705AiKdnG+/1+0datEQFBEiRB0gjS2q5gxyu3v0FFrkP8eS0EmUSJO1z7N7XMwsDtt9y+B1Tk/ICUi5G4/fSolenPoIpk8HNQEWSIk48eI5FxQFjZFAApBFkwzjaqkTGSIDOmT1QkQfqyK3KjILIid8ymkkmRTwo82f8T754xosjdbTA8vIbX8HJ6spFJqOFBzqpSXv8uViFTfJxVJCYV9T+3lAzZwUnXTpVKNQUIWu4omUFKFUVZgcRmNUn0ATqd/iC7IiO4t0QByRho4NqySSFhl2rbwkEKlfvXRnajfXZ90PEei/gHjznn1ek6ovAeC3d14w0WjV3paFw85Y2hQ0RTHPlvDQm8nPcUPSfk3I1GswcpxLYGEnRlurZbkCfdW6jIxBnBNXHw8qXmxsvJRUQLisZORcpHoh3BZOB9YqnI3lFDAIiqa+vNwejvhggLETQHoGTWnSYhuphsrFxLs4F8ZG/nDMje3iM6TwSDnzPjIbD2tLZZhVbf8aR2LEKEV9fWHphvm69Wc9mh/49W2fwWHo7uR2oBXHcF7owCMXOOTfngd4OD0uA+rZAOKTxq08IkqV7xvmz9SHnN3e6hNzzIKZAwhrZjvb3rHJq15DcM0rfrf36D2ZviwBKkhw7PyI4M05TIS4yUhabFSMkqCwk7IlQ2WGhSjKgTCk2RMLM2buqRDZ6gEus9pz+WSxiiPXFyXfu5ipFRyJfiCCMB0B5Xh4UiM8BTKT2vwBBkI+DUMfJz0+rRll6WyQanlZxp1h4tA0GQDi0byGPX4GRVpBDkgdSlAkiJotRGaPkVuVK/Y7f7M/1xAlL7itgTV9i6UiSoSBpBEiRB5i3xVs1bhzzsbRmaUyVKNJVXjJEgSLp2/sTea4wkyKrpVKuuJCrSWQyu0P0RKjJQRsA8knmkr0mwygMmURUkuz9Vq6QKkw2qg0QUNVZQJAgyWN3fqEaCdKPGzIpEJJBCNeoqEs4gcutz5EHNANJFiGlUI0G6mvAa1UiQrtKvq5Aav6VISynUVUiNptfecBWRMdJNVRXGtT9jl8t9RlcQgE/qQzaQmjdPEs+wvCnS5HkykUHOxquU1y0y/SFIgiRIGkESpHEaplYlXYVBurzJnGxUUUrXLn9TEIsYufOe4e4GMFobza0XaG9ZkYoQNRV5b2CsPPtA69mGqVxbFAfJvWmC1LyNdal+JFMilogESZAESeuyP4EwvOcZOPVtAAAAAElFTkSuQmCC" alt="LSF T" loading="lazy" style="max-width:58px;max-height:80px;width:auto;height:auto;display:block;margin:auto"/><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">T</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Pouce entre I/M</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAACYCAYAAABXs+G0AAADtElEQVR42u2dW27rMAxEPYJX0v3vce7XBYzA0ZPiI6J/CqSp66MZUqRiOfj7+7tOO8p14JHQCZ3QCZ3QEY9747n55XX8otKsAF+N34VUmg1V+fiJX4tpfIGCh5i2TGQ8Efoopc0tfhv/f1oMkJW9YRn3t5Mwg2aSKw6BP19jFGgKWty90nB6rpDzNE+EPkppnGxvUYunvU+xeDG2IyxazHuTMmzAY2Eg4RF6hz1FHZGJLKEDl5kR+ulnvPYkveVkdjtzHjKmNw1ICRqrPEVp9/aG5/MWR/FKLYtHtDciKM1TYvqpCE6CHlUaWi7SrshaZeazxORLghNxjTY0JgcJkv21t9pbpQ7PiiyhE9r1wZOgkfZO6IRO6IRO6GDz7ujf3BsvdGYefeueauee6rbujcqw0iePFBy4hHcC3ILAtVsb0fE+NMAvD9C1FY1PVXk52t4gkciegG8Ka4FRE/r5DzGQoMwaj1toVN0t8+5UGoPvpQeLWxQntLZ4CQ5rMk9LJDnpLYjN85XN6o1sa6CWxYtGDD2SmIsdt8Uonlvg4bcoYbAzk7A7d0NTCBwv8NwRdpqPB8BEtkZH9lexNwcb/drrmtl9GpoTMchVO0qDFwG71i5qx448akGzo0euXRSFwZcSbJkArsU4Kn+zCk4te/eWmS2ra9ockjGNgUYCk4M42rRQWumWUq31LwjZvHaH0RR4EU4evUmwNz571t7ElN6dbXtV6llNxWhO0mo42ADf3lmNQENpUKQHYOvKyWpP/TbVbf+AQAtapJLy0GVxIbapUKuLQmNRuZ621O1yUc/KRq+SquASH+u0+mgMgHPXwoF0IsNE8d8qX7cqvtpliVZKX1yh9iCI2U0kI/V0D7BLe/NRZPTE4fO9Zg9iK5OQb7DXAHivo1w9xgeLHdToqorpU6p6bTk65UDwXKa198p6+LfBpnfoN/DVtbORVZclaG5WfDRhbd1KrLFsy8Xzue6nv11o2NskZ7P/TmCRD+UpfEEwdFduZ7i8xNyvxXRCR4DmSdBIex8IHcHilIJG2jvGAUloiVaTUZRGsNh2Z29EgpbeaxFOaUYFL4vWZESLFwcXzEj2Dqt2cXDBiKh0uHm7RFPJW3HCk6BxstJh1JaCxslKh1BbEhonK+1ebc/fgbdtsK2/RWnX4ebO/p+OaZwIbWVxWkNrqz10B6LW4+vpyU0adwx+wnMjsPmDIP5fBFft2Klu93ksvgNP6ga66Rxi8cx+WMFaQpvP51mRJXRC/9bxDwOa68YWxd73AAAAAElFTkSuQmCC" alt="LSF U" loading="lazy" style="max-width:58px;max-height:80px;width:auto;height:auto;display:block;margin:auto"/><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">U</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Index + majeur joints</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAACZCAYAAACWs5xDAAAEcklEQVR42u1dWZLsIAyLKE4y97+j3ufrSiVh88bCz9R0zwQQkrHNEvz9/V2n/C/pQHAAOYAcQAZKFnoOb79jV0BY+Bw7SaaGFdzVhuDnJ27gcDdAUPH5NKDka+3CxkFUn3Y9WcKe7yz8EARgBh7awQiOGY3ruANRHJwdPVVoA8KgsumqMznYBkaW5AnuHAHBDHWtxBBGYgg9Gq/BohShEZHqSBPZBRPGZePGIQA7+PMTXpKpjiW85ZsdRglX4PxIFpZKBJvCEakmI91GCPVpzZBorDIP7iKwitLPPMGdMiA0+h81O5YcJQAH8I9kdgQEKwLCKPWkSUeXWvWmiUc7vA1BI2ihplsryfABhLfNNCGYlQ3AKG2saU0HsCIm6t7iZRHcWeZROVp/nhgIaNSZDGzH8VSDFnoAoh2wqU/VURgCY+BdAJnSjqQAox0K4F2MKmcGhE4MNI9lIjxnql2IEPqbkAyR9EdMZ6toNgQP6YJRkDkzIJ4Rs1n4/7Z++zb6+PiOA4AhCiA19OXVuCf95bnDWbjZYpmnE1uXEIPMGAIlW4BKaW7ruouArXVMdar4RYohXJE5WbHCbfMhb6twmBGYLCSTr7O7yx5kHpnjubpk0OEyc1VARvaTcVWG9ACDlSUzAiIPIN/TcyiPNSs2AteEN9AkBcRbNqtQkTnqm/9Hrr5Ag6RcbYzWiarRnTzipxyiRLsQoHvYZQh2Olq9UoCgQye+tssPt50F2fzmQdkB0Ago0GDIl55LjX07D4fGxpq5/mkAjHsnta//GwVleI9Zq6V/m13oDAqkJYOBkZA0irSQT5Lw/wvgQZgd14ORNrMhUivuUNI+pANHzU13kqBAaNDcTlR96ZyNdkNiZR+eDHlrBBu035MemOJkN15GujRT4HLKlbQC0nPQBx2ycisaCaKWTorPEqNtS4N2ocVvYIFFuAJk0NKAXWgdAVzly0/cry0eWbnruY3qa4Z5Mr7mKcU0oLcnUGr8hidj6nnVl+i0i6sv//llTF1nnSRkPFu8z5KvcU8gTbe1m5UNZ0U0DE+5SADCytEs2RYIMdAEkCffoNYd51Wfby2xzP2IGQr+AipmkLeEcumsvpubb5kP+ep8mJ1ImvkQVHitjAZKz0JVb/h//wxKDBwqubJDkhL6tSkQfKYJIBpSoiDgovlUS0C+TkjBYVDMjap7kGYxy1CBNVPuMcMu7LCWTJgQXxKQqW+xkwQE1yZl9juZQwDCw5CNZNMrGR5ANpl+R5Yy1W693ZkhSwAivf7Kw5DAskkCHZnJlpyXh94GTXUX4oyvoD4MsTaq0769XZMhS4FyJKMEyCwscX17SIhzuK2+Thau9Ok9lE+goGEUTb1Z64vd2CArF7c+K3T+622l4bNuM93avcS0ywPI5CyxcMx4ADk2ZJ0Yx+LM3WFIQFsS6t0Q3tIJcW1XTQPhAASiAPJ2+krD3gxdCGXJkJ498KPSawbZQzK9l9GrXaLiDUhr4ynd6eiAhPJljut+ADmAHEBGyj9Ccibs+LumqAAAAABJRU5ErkJggg==" alt="LSF V" loading="lazy" style="max-width:58px;max-height:80px;width:auto;height:auto;display:block;margin:auto"/><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">V</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Index + majeur écartés</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAACZCAYAAACFZNy3AAAEcElEQVR42u1dSZbrOAwz9HySuv8d2ate/Lw41sABlKhlVUWRIYCTKRX+/v6uGv2jFQQFWAFWgBVgBViNAkxn3EnWKT9+h2KYHphHAiYfbMIXVkkB9h2s6wt4ZfTLS64PDLLxSMCEcVG3wwPCmF3IaPQlG1NYAtcndy8RHs1CFc2YXSAmy5QqmiG7mKXZEwxXHNYZDJsCJgrM82SjrCqiOcmRbd7p72wlxcolTZ1TO5BdS8C2Yld+SQrzfG1nNljM15KzJ1XyLYO7KxPzP30OURvUCKXTC4QYrFEsGeYVXFIl9bfhA68wUOMzYqGaZgzWFobeimEglrZorfEmfUjtTcQPR4GR72dsRsEiyL11+qn3DXcQkxiieMzM1RylBGdZw8IcNOddTT9Ykm8JZNcQCVirFXL5xW9D38PmJT+T7VGPZ8ouFoZJJtt4k7FLiyVitQFZuqgZCgLpAettglFtxbqDdtWz/YlSkstJbTAwIblkT27WGzZsH+nD+fNipIo0qVGkXcIJgIUFu3USJBFgkvG7W8ACmHJFnChJVw/bvHco+7gXd2alqiDZ5NgDmFjSO5sc3wB7q3bOtgb0NJlYH8dRL+/0BIYwDCJh8MAqamgdC3urLYFEni4vTprSDjGAhuvfHgqTA6+ep9kiHYHaRt6D7OpZDMNhUjBI8k2mMLInmnOFHmzoeZW1+rBCJvchwNDxMxi4dCiqwA2wkYZbPAA5yjbKen9TWPivwwerFwuFlaJXvCQePN/oq30M2CbWaxvUAtfZ3ZZMYM3YMHmRoSyCRv+e8h58QHmREwbDgZ4500ry0wOOekqNv00HmHXqIeTzuVz0wTAnGACzvNxDXlItz6bhpWrFU9QPAybIhBOhCivwI3gVIwkJm2NgOcLMXPpWB+zN7qxWQzTmFjbArB9mFjR1GWu3bI4a55G/X72SgZJhI3ZnxvMhEiwrSWJQajPzh3lMC8DkIbHWlhJ2AOxTZviI0NOPZgjWU4UjCjhhAay3nmX13pIylxzNL5lskGrz3koH4kwzG2W6Y1mt0MwbqV92rAKm8fYZD7FaKtDaoAxXwfoGkOwEmIdBRibQmrEHk075zfReHMmw2Rx0S8CEBLRUF9/OAGCVRmE3Sf7KP4+0YSCRaFguORKoRklJsjBs22OBp5z5du2tkKvGEQwTb8BQfDrThiECsNXjLyiGlSTLjhXDggGbtWM4DbCSZYAk5VTApBh2oB3ylqQUYMWy/4nwdquwtIXJTxu4rgvNeQfpAdG2YaaX+1cctp8dU7sZpZdlEgRCKMOyyMvkDID3idxUrU0sNiybA/jHrmkckj8qJruvGkOK0DokvzPLJGMcts2J3G8s07iVTutuWCgADGsbptHTBSJWqwPWc7RYyMHpXpPF//lGElBCA9dj4rLdqxXULZvMLAMrw7Azu6wlKbuBZQVYpDQ1g96w5Nujoc7tihkrwJ7+LSIcJGe6OZYM876n1cXheEjSsizt7pW9CoiVGp06CrACrACjGv8BicMTCEbudVUAAAAASUVORK5CYII=" alt="LSF W" loading="lazy" style="max-width:58px;max-height:80px;width:auto;height:auto;display:block;margin:auto"/><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">W</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Trois doigts levés</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFcAAACXCAYAAABgIMfYAAAFJklEQVR42u1dWarjMBB0C58k979jzddAyLOtrXe3YGBInmOpVKpetNHn8zmqyJRWEBS4BW6VAletnMbvx8VnVODyAnr1PQm+l7LJAh6ApYVO2OlQdOoTClxcgPn97/j5PyfAUOxEc4NGk9+DGdi7TmQH+TQE9smYEXNj6eGz0MzFAKPIyugMdHgIWegxhZTdMNx4JogIrqeCrAZtxwfedb92DK17P/epEfgyZBLGTD3y0/IW6AdAugCVhFiEi9+jhWdCyAK0rPXg70Iq5NYGlwbcMxIEGBqgWgURR0dXSYCppAmoNbiHYtBAQp3nGtzZxuIImOf1HkRwygQKXBkQyALkMwFwo+94Aji0t3AXPEhKAQ1+jizMlWYLnNQjhEHT7riw+VwYP5/SFSPj583emUkW8EbmZjCUIcDF8aLSkrAJbwZXC0QqcH3qKDKAy+3vwmtHtkDsu5pR4Eq2482yEMb9+i5nQhB32EwZwQVjg6/ytibMbsmA/X3WZAbCC3M1Jh6/1/ri4bt0zNVcg0uZmeshRCXNjo7kioVL+pxBpMBq1pi8ggtDIybRBvIiCwg6xOnB+MGauaOLLeCQwXQzupaJ0AyAPQ6FPWCTdRbp5KbAAu8Ai20AbAKsJeZOsDC4LIz24ueC+e84WHunxdAEdzdhPTMEJbZSiY0wL8wlZxJCB8Ouo2bdu50GWRrCXn0gCa7U8ByZgNQG+NsvH2ZwYwKAm/0wlISZqM0st8DBFs5AhIQk47aebZO1UknoWQ+ixziNPW5bzIURg70HI7fsbYMP9nKddLxsBaOEKzaqgTCQBwvDTDvgjh4dJQmIlwQPK3N3V65YhapaQY+YnyvJOhx/F9pJGizTdQukBHBv26g3o9kd2drL9jHhO5Mi01ZGFru3sJN/oE7uYMTZ5zRuWPhNcMgChNhAD8ZP0xCtjKzpyPQUagg6YHLM/HL8xuxxW1M53SYkBSOVhSDTuD2Ep1QjaWuupna69ZGb1YsZALbcsO3CWzjezOBzoIdGzr3drWAkcFWn1rkYgEysfWJub2pZyqOYca/cd4bFkQB3wK7oL3mVBG1wR8LcmSRPCleMI6mxkjrk/C2TciqwlCuUtpSDpdFyblhwCBtDr8wcrldjesnVPTuRgwNVb2Hl4gxJgLXn5iABLucUz0wymjb/Rkpypp7TWCt2B/DKKfuhZEZzIV5v+bvX5UuIAO4IOE8Ah/FvrcLfEZaQI2Bdbk+tMgkuDNlsLQdiu3k8aFyIcDeaLCByx5bmvsRbQCZJ8M7c0JKwAu4bslxpb08lB5LA9u6m9aIyaPbSgCySMAvum9ib7hIOysTaHXBRrOUHN+Sp91bvbM4qRFlYuwouKTYQkUdKczyEtQ8Udnl+bh0FwAxuFp8XHsG10MZwPnbzWKm3y0JprxK4VADLMrcAFpaFKoLgWrH36m40F4V7IZ7UZj08dKBbj0Xznojdyzc8za+ZgUvH9REnvRWDntYtuGfuf8B+7yXLAOTI0lJIgXunvVkiupGjZKhcsX3vCJZ+Ll4C8p/2NsWXZi23G2dKFmSYS5rgIhj7WMBuxboYuYU3666Zt1Dglu7yt62Yu9/5t7s+NcD1rrsSJ62iwl+5TqGShT0J6crIWTjJSUkx1/Eqx0zAUnRw8QbGWjLXw3YolZsCNS/h8LAqB516sRZtb+H3ekGNIMNsMtTCFfudvOQ0KjvXKqYA97uBWAAnTAhuHURInPfoJpfhJUJLmVSvCK3ALXCrFLh65R8kE1728lbn4wAAAABJRU5ErkJggg==" alt="LSF X" loading="lazy" style="max-width:58px;max-height:80px;width:auto;height:auto;display:block;margin:auto"/><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">X</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Index recourbé</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGkAAACbCAYAAABh2LUoAAAE1klEQVR42u2dWW7kMAxEU4JPkvvfkfMVYGC43VooqUiVgABB0ovNx+IiyTZ+f39/NLhHkQkESUOQBEmDZFwVr7GHv0Gm41GSNf5dYzEkuylH6gmSkyA18UCyl/wjUGRKUogLXIILnvokDW9IykvEkBTyFO40BOlASMpLUpIgjQwVD1KShiAlgaSCgGBcL7nGBCxeuLsv/KloIM5J/8MSqGCFg8IhMSSt1AZRksLeZkhSh5pZjd4+6VOvVFtA7Ah/NceK05W00wDm/LowSoo68AWORVPUNdGzsVglb2rG7bNCgfLaLWQTYR/fBlydyjDnYqMGEAYh3o8vjJrKYPj4+x2TFfR2HOgAFaqQKIOGw4RKyj7kkmOb6hnNLJwUhIk5Z4ea7OHHLSdhwolYgxEjFwQ24JRTlfTtIFnCFjYBQmsRdJEZKUPeqb0Q/CnkPlachcxLERxWa3FVZa9rk2e99Sk9ORAEfY85OOnynIQv/8s0Q2Az378yJ2WdtrHZ58i66Dej7GcF9PUzitTDq6BeSCZYj3awmaALuZEtAKD7/KJ5K7EQGzuC+nCrVmv7vKZQeQ0YuXW9J9yydadx76AwmsuuTs8xUq+3n7rpJlS+byQaYFRBo30SOsFax3tHFNhilJbvweCx0PZJ2PD5qJjdwIbzABOkLKW357QPmJUUwaDmbWAPp10NaWSG+5NRe/c/2KKoMNzrXcGVAgcneHsfRTO9A9K3is0q+xCvXGAfqjzvuTlEVFLthssVxnnahuwByKIq6VN4wSKl7qg+h75nd3VnA1BbvsOIz40a0q4tVdZQJIDhPE+8HBMPeYh68rcEM673oqM9gINTiE0Daedehm+lPk1Ijx7ubBAOJhjZ3elKcECY5OFgURELpJGpnBbvXVEgTAndJZBq7IMhrGEmIUTzyjLjMJLcWxWBxceaWkm22ci0TXohPjHb5blMKmLPSfipn4gFiQKP2LBvFb/PLM3pVMQGqbdxZJmDAwskW3zSb0a/h8MdF6YtsQdjTjIWD2YZbFdVoDHH7LxTCu31STub2E8zD1LSxgRcAwFEx3ucklBRhke4najLuDoPEJtAsQFachwRZsGPf5BJ6fBspkIivYqiKOlYBUWCZITHAUHiC3NbFa1nVQRQcyE+6KOLhRFIOFhBiKakE1REszxfiE/i6GJBhUOQMDcCacV1RXpGoJQUR0UekFbfef84QCOQFI4U7qQidkhSqZQUz0kEiaNgmQ7JEgFCNkhIBCp1ToJUdGZOsmTfo8LBCRBOgeThmWmuzmODhGBGs0iATu+TjnpAfaaeKTWkKF4Z0omuREZFQqeiz0k1j95Gg9HDhuJrknFH70bfciV5+qUNT0g9t0Tb0VRCSuoLLVro21Q4vClLUDZCmvGMB/VJMsHXsG2Or0vZJ+0eFBWmlDReBE2/dY6U1JZnex59Kkibw55utkEe9pbdIawsPKlsakJkJeFQZSncEcLRbWsS9E6CdNIQJEHSECRB0nip7iwTpIz78JbfyV9KOjjcaUVWShKkrMlekIIAgiDxeXGKnUszIUEKihXubDGcVHv/yibPXjUTkKIVmL0R5b6j1XvB7IhtzCt2C3k9C8kav0+QnGB5hEJdn7Sg6tNlMoSQjje6ZhwESUOQNAQp6vgHCPofAmEivHMAAAAASUVORK5CYII=" alt="LSF Y" loading="lazy" style="max-width:58px;max-height:80px;width:auto;height:auto;display:block;margin:auto"/><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">Y</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Pouce + auriculaire</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEoAAACZCAYAAACIeqzwAAAERklEQVR42u2dSXLFIAxELYqT5P537GxTjgcZJDQgqrLJHwyPbhDjp5+fn6PSe2qFoEAVqAJVoApUgapUoIZSf3kdF/+jAvUM6PwalfX+K4hugKFA/VcN3UBDgeIB3ALWTK+3FazZ8OBsRRQofkKB2tiGkopKDasJ2yhtENoUCpyycedYDwXrGdSsjVLB4jbm24zpVsZRdzMMyAxqpKC4GEyHh9WUlLSl9biKeJrQC68qrqLeCsqZ9aTsijqYECizRUfbqNGChrVgmyjoVoGo1boe7WI9STUgKygSghLKgm2hGnABmbJbjwaAUmQLrmjMcSSY+WxCIK7+x92jEKKtkloAxWSkTtkVRUpWTd1GQRA6MoLSsg2yKkpaVSmtJ1lAuuk9txwUfwWPjKAg9H7KaL3RguGjDbezHj4Epi5gaS+APg1tQoUN3UBBo7ZOaT36MPaDYHuF0184RXFmG+4G12/KwqRNyQsojGTs4rNXsRV9VN8daLIChVOmaOCzfz+HFyVy3nv1nS5mD3DIrSDTcX/E5FwRNKBQWCiKFnyeGGC5nQxWKgqCdrUajEMbFIQybjW2oxWKglFBwXzPOaYaVn4PCGlGKTRq/xYQkslQJuopdemJPdIA5c1ytEKxzVEGZ22nqqoW0HJkUWlNsEZTpxbIdqYVmeluFtKEle0SGzVY3cAKtOh5ohvY+qIaXhocXjyLvIOS7gi4O/nOFsRsHlYf8ZCMoziTdpxLeLYY63GmUEQa+JmzMCrrZ5PqUusoPO+4k3w+WYPyMhfFtRcsQFlA+tLTcQfUFZnX7EHNHpgHtCmsR5aqz3oFLhWoYG1UgQre+7mdCvZ4X7CLXu9q89UWt1D36JZYFd/1wcx8VRNFr4gsvR4VqHXKwi6gSPN7KuBkKrFAMVVZoBbvM08zVNlBUbXjTrGHw46KUgW/M6ilx9AQsdAjNs60CvNlTe8z2L6TfWYqvDnILPcZV6elzsvkHFUN5bdP1gYWKYWYeSGtfHXBgpGCMjXPuZAFKAlYEmeRRw58L2mjvN3zxLUdrQZ1HPyj9NawYKmobdKOv+Jhun3aY6Qe/rYft6pZ3UZJ3DiW8mZXyVp0u5+hOWof3iCZqqwrtA14iNQxqEjzy+O1rkW6gzV6VydltZ6X8aOoovBRLRIWDBe89g9gIGhBDhxXNu2H7mawp9E8hJ8VrjHXiLvMf1emBWkrzLdA9oUPx4f2z+TI/igo7a4ZQpY0b6PIyD5evvexjYpycHHGbpgFpWU1yeOrmMgnSVjv7yXI5FQ9pvFVP2WAHFrLzVjPY9pm4i7EQNfD7EGEXvPz3gNaZKXQdybstlIc6soRGFvOPSgq68Ua9gxVWotmAavofjWo1b9sBqkhUHNgB0RQreU9nFAY+Kr9+qP14gJ3C+HofgSKrKingkDIRuKhiLfZg9G7hdVjtAg77lwEqrUruEAVqALlOf0CQ+QM+FOiNZUAAAAASUVORK5CYII=" alt="LSF Z" loading="lazy" style="max-width:58px;max-height:80px;width:auto;height:auto;display:block;margin:auto"/><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">Z</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Index trace un Z</span></div></div>',
            p: [
              "L'alphabet manuel LSF comprend 26 configurations de main, une par lettre de l'alphabet français.",
              "La plupart des lettres ressemblent à leur forme écrite : le C fait une forme de C, le L forme un angle droit."
            ]
          },
          {
            h: "Lettres clés à retenir",
            p: [
              "A = poing fermé, pouce sur le côté. B = quatre doigts étendus ensemble, pouce replié. C = main courbée en C.",
              "V = index et majeur écartés en V. L = index et pouce formant un L. O = tous les doigts formant un cercle."
            ]
          },
          {
            h: "Conseils pour apprendre",
            p: [
              "Pratiquez régulièrement l'alphabet en vous filmant — la mémoire musculaire est clé.",
              "Commencez par épeler des mots courts (3–4 lettres) puis progressez vers des mots plus longs."
            ]
          }
        ],
        check: [
          {
            q: 'What is "dactylogie"?',
            opts: ['A grammar rule', 'Fingerspelling using the manual alphabet', 'A type of sign classifier', 'A mouth pattern'],
            ans: 1,
            exp: '"Dactylogie" refers to fingerspelling — spelling words letter by letter using the manual alphabet.'
          },
          {
            q: 'The LSF manual alphabet has how many handshapes?',
            opts: ['24', '25', '26', '28'],
            ans: 2,
            exp: 'There are 26 handshapes in the LSF manual alphabet, one for each letter of the French alphabet.'
          },
          {
            q: 'When is fingerspelling most commonly used?',
            opts: ['For all everyday signs', 'For common verbs', 'For proper names and words without a dedicated sign', 'For numbers only'],
            ans: 2,
            exp: 'Fingerspelling is mainly used for proper names, place names, and words that do not have an established LSF sign.'
          },
          {
            q: 'The letter A in the LSF manual alphabet is?',
            opts: ['All fingers open', 'Closed fist', 'Index and thumb touching', 'Pinky only'],
            ans: 1,
            exp: 'A is represented by a closed fist with the thumb resting at the side.'
          },
          {
            q: 'The letter V looks like?',
            opts: ['A curved hand', 'Two fingers extended in a V shape', 'A fist with thumb out', 'O shape'],
            ans: 1,
            exp: 'The letter V is formed by extending the index and middle fingers in a V or peace sign shape.'
          }
        ]
      },
      {
        id: 'lsf-l02',
        title: 'Introduction à la LSF',
        icon: '🤟',
        cards: [
          {
            h: "Qu'est-ce que la LSF?",
            p: [
              "La LSF (Langue des Signes Française) est une langue visuelle et gestuelle naturelle, utilisée principalement par la communauté Sourde en France.",
              "Elle possède sa propre grammaire, syntaxe et structure — elle n'est pas une version signée du français."
            ]
          },
          {
            h: "Histoire de la LSF",
            p: [
              "La LSF moderne trouve ses racines au XVIIIe siècle, avec Abbé de l'Épée qui fonda le premier institut public pour sourds en 1760 à Paris.",
              "Laurent Clerc, sourd, exporta la LSF aux États-Unis en 1817, donnant naissance à l'ASL (American Sign Language)."
            ]
          },
          {
            h: "La communauté Sourde",
            p: [
              "La 'communauté Sourde' (Sourd avec un grand S) représente une identité culturelle et linguistique, pas seulement un état auditif.",
              "La LSF est reconnue officiellement en France depuis la loi de 2005."
            ]
          },
          {
            h: "Caractéristiques de la LSF",
            p: [
              "La LSF utilise des paramètres : la configuration (handshape), l'emplacement, le mouvement et l'orientation de la main.",
              "Les expressions faciales et la direction du regard sont des éléments grammaticaux essentiels."
            ]
          }
        ],
        check: [
          {
            q: 'LSF is a complete, independent language.',
            opts: ['True', 'False', 'Partially true', 'Only in France'],
            ans: 0,
            exp: 'LSF is a fully autonomous language with its own grammar, completely independent from spoken French.'
          },
          {
            q: 'Who founded the first public school for the Deaf in Paris (1760)?',
            opts: ['Laurent Clerc', 'Louis Braille', "Abbé de l'Épée", 'Samuel Heinicke'],
            ans: 2,
            exp: "Abbé Charles-Michel de l'Épée founded the Institut National de Jeunes Sourds de Paris in 1760."
          },
          {
            q: 'In LSF, facial expressions are?',
            opts: ['Just for showing feelings', 'A core grammatical feature', 'Optional add-ons', 'Only used in formal contexts'],
            ans: 1,
            exp: 'Facial expressions in LSF carry grammatical information such as question marking, negation and adverbial modification.'
          },
          {
            q: 'ASL (American Sign Language) has its roots in?',
            opts: ['BSL', 'DGS', 'LSF', 'ISL'],
            ans: 2,
            exp: "ASL developed significantly from LSF through Laurent Clerc's work in the US from 1817 onwards."
          }
        ]
      },
      {
        id: 'lsf-l03',
        title: 'Les chiffres 1 à 10',
        icon: '🔢',
        cards: [
          {
            h: "Chiffres 1 à 5",
            visual: '<div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;padding:6px 0;margin-bottom:4px"><div style="display:flex;flex-direction:column;align-items:center"><svg viewBox="0 0 54 76" width="54" height="76"><rect x="9" y="44" width="36" height="24" rx="8" fill="white" stroke="#333" stroke-width="1.5"/><rect x="12" y="12" width="8" height="34" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="21" y="38" width="8" height="8" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="30" y="38" width="8" height="8" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="39" y="38" width="7" height="8" rx="3" fill="white" stroke="#333" stroke-width="1.5"/><ellipse cx="7" cy="48" rx="4" ry="8"  fill="white" stroke="#333" stroke-width="1.5"/><text x="27" y="74" text-anchor="middle" font-size="11" font-weight="700" fill="#7c3aed" font-family="system-ui,sans-serif">1</text></svg></div><div style="display:flex;flex-direction:column;align-items:center"><svg viewBox="0 0 54 76" width="54" height="76"><rect x="9" y="44" width="36" height="24" rx="8" fill="white" stroke="#333" stroke-width="1.5"/><rect x="12" y="12" width="8" height="34" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="21" y="12" width="8" height="34" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="30" y="38" width="8" height="8" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="39" y="38" width="7" height="8" rx="3" fill="white" stroke="#333" stroke-width="1.5"/><ellipse cx="7" cy="48" rx="4" ry="8"  fill="white" stroke="#333" stroke-width="1.5"/><text x="27" y="74" text-anchor="middle" font-size="11" font-weight="700" fill="#7c3aed" font-family="system-ui,sans-serif">2</text></svg></div><div style="display:flex;flex-direction:column;align-items:center"><svg viewBox="0 0 54 76" width="54" height="76"><rect x="9" y="44" width="36" height="24" rx="8" fill="white" stroke="#333" stroke-width="1.5"/><rect x="12" y="12" width="8" height="34" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="21" y="12" width="8" height="34" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="30" y="38" width="8" height="8" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="39" y="38" width="7" height="8" rx="3" fill="white" stroke="#333" stroke-width="1.5"/><ellipse cx="4" cy="50" rx="5" ry="13" fill="white" stroke="#333" stroke-width="1.5"/><text x="27" y="74" text-anchor="middle" font-size="11" font-weight="700" fill="#7c3aed" font-family="system-ui,sans-serif">3</text></svg></div><div style="display:flex;flex-direction:column;align-items:center"><svg viewBox="0 0 54 76" width="54" height="76"><rect x="9" y="44" width="36" height="24" rx="8" fill="white" stroke="#333" stroke-width="1.5"/><rect x="12" y="12" width="8" height="34" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="21" y="12" width="8" height="34" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="30" y="12" width="8" height="34" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="39" y="12" width="7" height="34" rx="3" fill="white" stroke="#333" stroke-width="1.5"/><rect x="11" y="42" width="18" height="7" rx="3" fill="white" stroke="#333" stroke-width="1.5"/><text x="27" y="74" text-anchor="middle" font-size="11" font-weight="700" fill="#7c3aed" font-family="system-ui,sans-serif">4</text></svg></div><div style="display:flex;flex-direction:column;align-items:center"><svg viewBox="0 0 54 76" width="54" height="76"><rect x="9" y="44" width="36" height="24" rx="8" fill="white" stroke="#333" stroke-width="1.5"/><rect x="12" y="12" width="8" height="34" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="21" y="12" width="8" height="34" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="30" y="12" width="8" height="34" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="39" y="12" width="7" height="34" rx="3" fill="white" stroke="#333" stroke-width="1.5"/><ellipse cx="4" cy="50" rx="5" ry="13" fill="white" stroke="#333" stroke-width="1.5"/><text x="27" y="74" text-anchor="middle" font-size="11" font-weight="700" fill="#7c3aed" font-family="system-ui,sans-serif">5</text></svg></div></div>',
            p: [
              "1 = index levé seul. 2 = index et majeur levés (comme le V). 3 = pouce, index et majeur levés.",
              "4 = quatre doigts levés (sans le pouce). 5 = main ouverte, cinq doigts écartés."
            ]
          },
          {
            h: "Chiffres 6 à 10",
            visual: '<div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;padding:6px 0;margin-bottom:4px"><div style="display:flex;flex-direction:column;align-items:center"><svg viewBox="0 0 54 76" width="54" height="76"><rect x="9" y="44" width="36" height="24" rx="8" fill="white" stroke="#333" stroke-width="1.5"/><rect x="12" y="24" width="8" height="22" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="21" y="12" width="8" height="34" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="30" y="12" width="8" height="34" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="39" y="12" width="7" height="34" rx="3" fill="white" stroke="#333" stroke-width="1.5"/><path d="M 7 60 Q 4 50 6 42 Q 9 34 16 28" fill="none" stroke="#333" stroke-width="2" stroke-linecap="round"/><circle cx="16" cy="28" r="4" fill="#7c3aed" opacity="0.35"/><text x="27" y="74" text-anchor="middle" font-size="11" font-weight="700" fill="#7c3aed" font-family="system-ui,sans-serif">6</text></svg></div><div style="display:flex;flex-direction:column;align-items:center"><svg viewBox="0 0 54 76" width="54" height="76"><rect x="9" y="44" width="36" height="24" rx="8" fill="white" stroke="#333" stroke-width="1.5"/><rect x="12" y="12" width="8" height="34" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="21" y="24" width="8" height="22" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="30" y="12" width="8" height="34" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="39" y="12" width="7" height="34" rx="3" fill="white" stroke="#333" stroke-width="1.5"/><path d="M 7 60 Q 4 50 6 42 Q 9 34 25 28" fill="none" stroke="#333" stroke-width="2" stroke-linecap="round"/><circle cx="25" cy="28" r="4" fill="#7c3aed" opacity="0.35"/><text x="27" y="74" text-anchor="middle" font-size="11" font-weight="700" fill="#7c3aed" font-family="system-ui,sans-serif">7</text></svg></div><div style="display:flex;flex-direction:column;align-items:center"><svg viewBox="0 0 54 76" width="54" height="76"><rect x="9" y="44" width="36" height="24" rx="8" fill="white" stroke="#333" stroke-width="1.5"/><rect x="12" y="12" width="8" height="34" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="21" y="12" width="8" height="34" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="30" y="24" width="8" height="22" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="39" y="12" width="7" height="34" rx="3" fill="white" stroke="#333" stroke-width="1.5"/><path d="M 7 60 Q 4 50 6 42 Q 9 34 34 28" fill="none" stroke="#333" stroke-width="2" stroke-linecap="round"/><circle cx="34" cy="28" r="4" fill="#7c3aed" opacity="0.35"/><text x="27" y="74" text-anchor="middle" font-size="11" font-weight="700" fill="#7c3aed" font-family="system-ui,sans-serif">8</text></svg></div><div style="display:flex;flex-direction:column;align-items:center"><svg viewBox="0 0 54 76" width="54" height="76"><rect x="9" y="44" width="36" height="24" rx="8" fill="white" stroke="#333" stroke-width="1.5"/><rect x="12" y="12" width="8" height="34" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="21" y="12" width="8" height="34" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="30" y="12" width="8" height="34" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="39" y="24" width="7" height="22" rx="3" fill="white" stroke="#333" stroke-width="1.5"/><path d="M 7 60 Q 4 50 6 42 Q 9 34 43 28" fill="none" stroke="#333" stroke-width="2" stroke-linecap="round"/><circle cx="43" cy="28" r="4" fill="#7c3aed" opacity="0.35"/><text x="27" y="74" text-anchor="middle" font-size="11" font-weight="700" fill="#7c3aed" font-family="system-ui,sans-serif">9</text></svg></div><div style="display:flex;flex-direction:column;align-items:center"><svg viewBox="0 0 54 76" width="54" height="76"><rect x="9" y="44" width="36" height="24" rx="8" fill="white" stroke="#333" stroke-width="1.5"/><rect x="12" y="38" width="8" height="8" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="21" y="38" width="8" height="8" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="30" y="38" width="8" height="8" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="39" y="38" width="7" height="8" rx="3" fill="white" stroke="#333" stroke-width="1.5"/><rect x="3" y="26" width="8" height="20" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><text x="42" y="18" font-size="15" fill="#7c3aed" font-family="system-ui">&#x21BB;</text><text x="27" y="74" text-anchor="middle" font-size="11" font-weight="700" fill="#7c3aed" font-family="system-ui,sans-serif">10</text></svg></div></div>',
            p: [
              "6 = pouce touchant l'index, autres doigts étendus. 7 = pouce touchant le majeur. 8 = pouce touchant l'annulaire.",
              "9 = pouce touchant le petit doigt. 10 = poing avec le pouce relevé, mouvement de rotation ou de secouement léger."
            ]
          },
          {
            h: "Utiliser les chiffres",
            p: [
              "Les chiffres s'utilisent pour l'âge, l'heure, les prix et les quantités.",
              "Pour l'heure : tapez votre poignet (pour montrer une montre) puis signez le chiffre."
            ]
          }
        ],
        check: [
          {
            q: 'How is the number 1 signed in LSF?',
            opts: ['Thumb up', 'Index finger extended upward', 'All fingers open', 'Pinky extended'],
            ans: 1,
            exp: 'The number 1 is signed with just the index finger extended upward.'
          },
          {
            q: 'How is the number 5 signed?',
            opts: ['Index finger only', 'Thumb and index touching', 'All five fingers open and spread', 'Fist with thumb out'],
            ans: 2,
            exp: '5 is signed with all five fingers open and spread apart.'
          },
          {
            q: 'The number 6 in LSF uses?',
            opts: ['Six fingers', 'Thumb touching index, other four fingers extended', 'Index and pinky only', 'Two hands'],
            ans: 1,
            exp: '6 is signed with the thumb touching the index finger while the remaining four fingers are extended.'
          },
          {
            q: "To sign a time (e.g., 3 o'clock) in LSF, you typically first?",
            opts: ['Fingerspell the hour', 'Sign the number on your chin', 'Tap your wrist area (like a watch) then sign the number', 'Clap once'],
            ans: 2,
            exp: 'Time is indicated by first touching the wrist (where a watch would be) and then signing the number of hours.'
          }
        ]
      },
      {
        id: 'lsf-l04',
        title: 'Se saluer en LSF',
        icon: '😊',
        cards: [
          {
            h: "Dire bonjour",
            visual: '<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;justify-content:center;padding:8px 0;margin-bottom:4px"><div style="display:flex;flex-direction:column;align-items:center;gap:4px;background:rgba(124,58,237,.07);border-radius:10px;padding:10px 14px;min-width:80px"><span style="font-size:1.8rem;line-height:1">🖐️</span><span style="font-size:.72rem;font-weight:600;color:#555;text-align:center;line-height:1.3">Main au front</span><span style="font-size:.65rem;color:#888;text-align:center">paume vers avant</span></div><div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px"><span style="font-size:1.4rem;color:#7c3aed">&#x2192;</span><span style="font-size:.65rem;color:#aaa">mouvement</span></div><div style="display:flex;flex-direction:column;align-items:center;gap:4px;background:rgba(124,58,237,.07);border-radius:10px;padding:10px 14px;min-width:80px"><span style="font-size:1.8rem;line-height:1">🖐️</span><span style="font-size:.72rem;font-weight:600;color:#555;text-align:center;line-height:1.3">Vers avant</span><span style="font-size:.65rem;color:#888;text-align:center">ecarter / salut</span></div></div>',
            p: [
              "'Bonjour' se signe avec une main à plat qui part du front vers l'avant, comme un salut militaire détendu.",
              "'Salut' informel peut être une simple vague de la main ouverte."
            ]
          },
          {
            h: "Dire au revoir et merci",
            visual: '<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;justify-content:center;padding:8px 0;margin-bottom:4px"><div style="display:flex;flex-direction:column;align-items:center;gap:4px;background:rgba(124,58,237,.07);border-radius:10px;padding:10px 14px;min-width:80px"><span style="font-size:1.8rem;line-height:1">🤲</span><span style="font-size:.72rem;font-weight:600;color:#555;text-align:center;line-height:1.3">Main plate au menton</span><span style="font-size:.65rem;color:#888;text-align:center">ou aux levres</span></div><div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px"><span style="font-size:1.4rem;color:#7c3aed">&#x2192;</span><span style="font-size:.65rem;color:#aaa">vers toi</span></div><div style="display:flex;flex-direction:column;align-items:center;gap:4px;background:rgba(124,58,237,.07);border-radius:10px;padding:10px 14px;min-width:80px"><span style="font-size:1.8rem;line-height:1">🖐️</span><span style="font-size:.72rem;font-weight:600;color:#555;text-align:center;line-height:1.3">Vers la personne</span><span style="font-size:.65rem;color:#888;text-align:center">gratitude envoyee</span></div></div>',
            p: [
              "'Au revoir' est un geste d'agitation de la main ouverte d'un côté à l'autre.",
              "'Merci' : main à plat touchant le menton ou les lèvres, puis portée vers l'avant (vers la personne remerciée)."
            ]
          },
          {
            h: "Exprimer des émotions",
            p: [
              "Heureux : mouvement circulaire de la main plate sur la poitrine. Triste : mains plates descendant devant le visage.",
              "Les expressions du visage amplifient et précisent les signes d'émotion — elles sont indispensables."
            ]
          },
          {
            h: "Questions et réponses",
            p: [
              "Pour poser une question oui/non : haussez les sourcils et inclinez légèrement la tête vers l'avant.",
              "Pour les questions ouvertes (qui, quoi, où...) : froncez les sourcils et inclinez la tête."
            ]
          }
        ],
        check: [
          {
            q: 'The LSF sign for "Bonjour" involves?',
            opts: ['Clapping hands', 'A flat open hand moving outward from the forehead', 'Touching both shoulders', 'Pointing to the sky'],
            ans: 1,
            exp: '"Bonjour" is signed with a flat hand starting near the forehead and moving outward, like a relaxed salute.'
          },
          {
            q: '"Merci" is signed by?',
            opts: ['Waving both hands', 'Flat hand touching the chin/lips and moving forward', 'Pointing to the other person', 'Fist on chest'],
            ans: 1,
            exp: '"Merci" uses a flat hand at the chin or lips moving forward toward the person being thanked.'
          },
          {
            q: '"Triste" (sad) is typically shown by?',
            opts: ['Hands moving upward', 'Circular motion on chest', 'Flat hands moving downward in front of the face', 'Pointing to the floor'],
            ans: 2,
            exp: '"Triste" is signed with both flat hands moving down in front of the face, like tears falling.'
          },
          {
            q: 'In LSF, a yes/no question is marked non-manually by?',
            opts: ['Frowning and looking away', 'Raising the eyebrows with a slight forward head tilt', 'Shaking the head quickly', 'Lowering the chin'],
            ans: 1,
            exp: 'Yes/no questions in LSF require raised eyebrows and a slight forward lean or head tilt — a grammatical non-manual marker.'
          },
          {
            q: '"Oui" (yes) in LSF is signed with?',
            opts: ['Thumbs up', 'A nodding fist', 'Open palm upward', 'Pointing upward'],
            ans: 1,
            exp: '"Oui" is signed with a fist that nods or bounces downward, mirroring a head nod for yes.'
          }
        ]
      }
    ]
  }
];
