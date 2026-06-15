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
            visual: '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(72px,1fr));gap:8px;padding:6px 0;margin-bottom:4px"><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><svg viewBox="0 0 80 100" width="60" height="75" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:auto;overflow:visible"><rect x="13" y="57" width="50" height="33" rx="5" fill="white" stroke="#333" stroke-width="1.5"/><rect x="59" y="62" width="15" height="10" rx="5" fill="white" stroke="#333" stroke-width="1.5"/></svg><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">A</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Poing, pouce côté</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><svg viewBox="0 0 80 100" width="60" height="75" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:auto;overflow:visible"><rect x="14" y="12" width="9" height="100" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="24" y="12" width="9" height="100" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="34" y="12" width="9" height="100" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="44" y="12" width="9" height="100" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="13" y="57" width="50" height="33" rx="5" fill="white" stroke="#333" stroke-width="1.5"/><path d="M 15 71 Q 37 65 57 71" fill="none" stroke="#333" stroke-width="2.5" stroke-linecap="round"/></svg><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">B</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">4 doigts plats</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><svg viewBox="0 0 80 100" width="60" height="75" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:auto;overflow:visible"><path d="M 63 30 Q 59 8 38 8 Q 16 8 13 35 Q 10 58 19 74 Q 29 88 51 86 Q 62 82 66 72" fill="none" stroke="#333" stroke-width="2.5" stroke-linecap="round"/></svg><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">C</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Main en C</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><svg viewBox="0 0 80 100" width="60" height="75" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:auto;overflow:visible"><rect x="44" y="12" width="9" height="100" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="13" y="57" width="50" height="33" rx="5" fill="white" stroke="#333" stroke-width="1.5"/><circle cx="28" cy="72" r="10" fill="white" stroke="#333" stroke-width="1.5"/></svg><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">D</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Index haut, cercle</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><svg viewBox="0 0 80 100" width="60" height="75" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:auto;overflow:visible"><rect x="14" y="42" width="9" height="16" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="24" y="42" width="9" height="16" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="34" y="42" width="9" height="16" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="44" y="42" width="9" height="16" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="13" y="55" width="50" height="35" rx="5" fill="white" stroke="#333" stroke-width="1.5"/></svg><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">E</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Doigts fléchis</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><svg viewBox="0 0 80 100" width="60" height="75" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:auto;overflow:visible"><rect x="14" y="12" width="9" height="100" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="24" y="12" width="9" height="100" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="34" y="12" width="9" height="100" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="13" y="57" width="50" height="33" rx="5" fill="white" stroke="#333" stroke-width="1.5"/><circle cx="49" cy="64" r="8" fill="white" stroke="#333" stroke-width="1.5"/></svg><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">F</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Cercle pouce-index</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><svg viewBox="0 0 80 100" width="60" height="75" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:auto;overflow:visible"><rect x="13" y="58" width="37" height="30" rx="5" fill="white" stroke="#333" stroke-width="1.5"/><rect x="47" y="62" width="22" height="9" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="47" y="52" width="18" height="9" rx="4" fill="white" stroke="#333" stroke-width="1.5"/></svg><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">G</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Index horizontal</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><svg viewBox="0 0 80 100" width="60" height="75" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:auto;overflow:visible"><rect x="13" y="57" width="37" height="33" rx="5" fill="white" stroke="#333" stroke-width="1.5"/><rect x="47" y="60" width="22" height="9" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="47" y="70" width="22" height="9" rx="4" fill="white" stroke="#333" stroke-width="1.5"/></svg><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">H</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">I+M horizontaux</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><svg viewBox="0 0 80 100" width="60" height="75" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:auto;overflow:visible"><rect x="14" y="12" width="9" height="100" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="13" y="57" width="50" height="33" rx="5" fill="white" stroke="#333" stroke-width="1.5"/></svg><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">I</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Auriculaire seul</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><svg viewBox="0 0 80 100" width="60" height="75" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:auto;overflow:visible"><rect x="14" y="12" width="9" height="100" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="13" y="57" width="50" height="33" rx="5" fill="white" stroke="#333" stroke-width="1.5"/><path d="M 18 14 L 18 40 Q 20 52 30 54" fill="none" stroke="#888" stroke-width="1.3" stroke-linecap="round" stroke-dasharray="3,2"/><polygon points="27,54 33,53 30,58" fill="#888"/></svg><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">J</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Auriculaire + tracé J</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><svg viewBox="0 0 80 100" width="60" height="75" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:auto;overflow:visible"><rect x="34" y="12" width="9" height="100" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="44" y="12" width="9" height="100" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="13" y="57" width="50" height="33" rx="5" fill="white" stroke="#333" stroke-width="1.5"/><rect x="38" y="50" width="8" height="11" rx="3" fill="white" stroke="#333" stroke-width="1.3"/></svg><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">K</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">I+M + pouce entre</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><svg viewBox="0 0 80 100" width="60" height="75" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:auto;overflow:visible"><rect x="44" y="12" width="9" height="100" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="13" y="57" width="50" height="33" rx="5" fill="white" stroke="#333" stroke-width="1.5"/><rect x="45" y="52" width="23" height="10" rx="5" fill="white" stroke="#333" stroke-width="1.5"/></svg><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">L</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Index + pouce horiz.</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><svg viewBox="0 0 80 100" width="60" height="75" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:auto;overflow:visible"><rect x="14" y="48" width="9" height="11" rx="3" fill="white" stroke="#333" stroke-width="1.3"/><rect x="24" y="48" width="9" height="11" rx="3" fill="white" stroke="#333" stroke-width="1.3"/><rect x="34" y="48" width="9" height="11" rx="3" fill="white" stroke="#333" stroke-width="1.3"/><rect x="13" y="56" width="50" height="34" rx="5" fill="white" stroke="#333" stroke-width="1.5"/></svg><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">M</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">3 doigts / pouce</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><svg viewBox="0 0 80 100" width="60" height="75" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:auto;overflow:visible"><rect x="24" y="48" width="9" height="11" rx="3" fill="white" stroke="#333" stroke-width="1.3"/><rect x="34" y="48" width="9" height="11" rx="3" fill="white" stroke="#333" stroke-width="1.3"/><rect x="13" y="56" width="50" height="34" rx="5" fill="white" stroke="#333" stroke-width="1.5"/></svg><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">N</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">2 doigts / pouce</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><svg viewBox="0 0 80 100" width="60" height="75" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:auto;overflow:visible"><path d="M 38 12 Q 58 12 63 32 Q 67 52 60 70 Q 52 86 38 88 Q 24 86 16 70 Q 9 52 13 32 Q 18 12 38 12 Z" fill="white" stroke="#333" stroke-width="1.8"/><ellipse cx="38" cy="50" rx="14" ry="18" fill="#f0f0f0" stroke="#ccc" stroke-width="1"/></svg><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">O</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Tous en O</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><svg viewBox="0 0 80 100" width="60" height="75" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:auto;overflow:visible"><rect x="13" y="32" width="38" height="22" rx="5" fill="white" stroke="#333" stroke-width="1.5"/><rect x="34" y="51" width="9" height="30" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="44" y="51" width="9" height="30" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="8" y="38" width="9" height="18" rx="4" fill="white" stroke="#333" stroke-width="1.5"/></svg><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">P</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">K vers le bas</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><svg viewBox="0 0 80 100" width="60" height="75" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:auto;overflow:visible"><rect x="13" y="28" width="38" height="22" rx="5" fill="white" stroke="#333" stroke-width="1.5"/><rect x="44" y="47" width="9" height="32" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="54" y="47" width="9" height="22" rx="4" fill="white" stroke="#333" stroke-width="1.5"/></svg><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">Q</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">G vers le bas</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><svg viewBox="0 0 80 100" width="60" height="75" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:auto;overflow:visible"><rect x="34" y="12" width="9" height="100" rx="4" fill="white" stroke="#333" stroke-width="1.5" transform="rotate(10,38,57)"/><rect x="44" y="12" width="9" height="100" rx="4" fill="white" stroke="#333" stroke-width="1.5" transform="rotate(-10,48,57)"/><rect x="13" y="57" width="50" height="33" rx="5" fill="white" stroke="#333" stroke-width="1.5"/></svg><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">R</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">I+M croisés</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><svg viewBox="0 0 80 100" width="60" height="75" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:auto;overflow:visible"><rect x="13" y="57" width="50" height="33" rx="5" fill="white" stroke="#333" stroke-width="1.5"/><path d="M 15 66 Q 37 60 58 66" fill="none" stroke="#333" stroke-width="3" stroke-linecap="round"/></svg><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">S</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Poing, pouce dessus</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><svg viewBox="0 0 80 100" width="60" height="75" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:auto;overflow:visible"><rect x="13" y="57" width="50" height="33" rx="5" fill="white" stroke="#333" stroke-width="1.5"/><rect x="38" y="47" width="9" height="14" rx="4" fill="white" stroke="#333" stroke-width="1.5"/></svg><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">T</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Pouce entre I+M</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><svg viewBox="0 0 80 100" width="60" height="75" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:auto;overflow:visible"><rect x="34" y="12" width="9" height="100" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="44" y="12" width="9" height="100" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="13" y="57" width="50" height="33" rx="5" fill="white" stroke="#333" stroke-width="1.5"/></svg><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">U</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">I+M joints, haut</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><svg viewBox="0 0 80 100" width="60" height="75" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:auto;overflow:visible"><rect x="32" y="12" width="9" height="100" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="46" y="12" width="9" height="100" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="13" y="57" width="50" height="33" rx="5" fill="white" stroke="#333" stroke-width="1.5"/></svg><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">V</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">I+M écartés (V)</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><svg viewBox="0 0 80 100" width="60" height="75" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:auto;overflow:visible"><rect x="20" y="12" width="9" height="100" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="35" y="12" width="9" height="100" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="50" y="12" width="9" height="100" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="13" y="57" width="50" height="33" rx="5" fill="white" stroke="#333" stroke-width="1.5"/></svg><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">W</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">3 doigts écartés</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><svg viewBox="0 0 80 100" width="60" height="75" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:auto;overflow:visible"><path d="M 44 57 L 44 28 Q 44 14 50 13 Q 56 11 57 19 Q 58 29 52 35 Q 49 39 47 46" fill="white" stroke="#333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><rect x="13" y="57" width="50" height="33" rx="5" fill="white" stroke="#333" stroke-width="1.5"/></svg><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">X</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Index recourbé</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><svg viewBox="0 0 80 100" width="60" height="75" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:auto;overflow:visible"><rect x="14" y="12" width="9" height="100" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="13" y="57" width="50" height="33" rx="5" fill="white" stroke="#333" stroke-width="1.5"/><rect x="59" y="62" width="15" height="10" rx="5" fill="white" stroke="#333" stroke-width="1.5"/></svg><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">Y</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Pouce + auriculaire</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><svg viewBox="0 0 80 100" width="60" height="75" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:auto;overflow:visible"><rect x="44" y="12" width="9" height="100" rx="4" fill="white" stroke="#333" stroke-width="1.5"/><rect x="13" y="57" width="50" height="33" rx="5" fill="white" stroke="#333" stroke-width="1.5"/><path d="M 44 14 L 54 14 L 44 30 L 54 30" fill="none" stroke="#888" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><polygon points="51,27 56,31 52,35" fill="#888"/></svg><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">Z</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Index trace un Z</span></div></div>',
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
