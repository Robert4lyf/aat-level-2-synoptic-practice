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
            visual: '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(72px,1fr));gap:8px;padding:6px 0;margin-bottom:4px"><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><img src="data:image/png;base64,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" alt="LSF A" style="max-width:62px;max-height:84px;width:auto;height:auto;display:block;margin:auto"/><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">A</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Poing, pouce côté</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><img src="data:image/png;base64,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" alt="LSF B" style="max-width:62px;max-height:84px;width:auto;height:auto;display:block;margin:auto"/><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">B</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Main plate</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><img src="data:image/png;base64,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" alt="LSF C" style="max-width:62px;max-height:84px;width:auto;height:auto;display:block;margin:auto"/><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">C</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Main en C</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><img src="data:image/png;base64,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" alt="LSF D" style="max-width:62px;max-height:84px;width:auto;height:auto;display:block;margin:auto"/><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">D</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Index levé</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><img src="data:image/png;base64,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" alt="LSF E" style="max-width:62px;max-height:84px;width:auto;height:auto;display:block;margin:auto"/><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">E</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Doigts repliés</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><img src="data:image/png;base64,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" alt="LSF F" style="max-width:62px;max-height:84px;width:auto;height:auto;display:block;margin:auto"/><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">F</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Cercle pouce-index</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAAEPCAYAAACDRGwIAAAHUUlEQVR42u2d23KkOBBEuwh+wv//obVPu+F1tN0gVPeTEfMyM26DdJRZBWqQr6+vF9ouvfn/JcuBn8xdKAjpdDCHgAQQOSc1BRREhj0MUilacAhbyc2/V4Do6w6yCAtADHKG9LUEQNQFByAGTbICBMIhUL7YAIh63QtA4BIAgQACZYgNgCA2AKLYqlaAQDgE+jM2FCAQDoHii0uAQABB9wIQxAZAIIBAAIEAomvBqBnqCL6o498VyB//pi+uQ4xrEVN/IRggcrWN8gA0gGgGRYr9ENQQPlBoVgAAolaEUEMggEAAQRwYtbQAAWwAUUFln0YHEAggcCCAoI4ACOoIgBjUDQAEwAEEwiEQQCCAQABB4QcQqKDYMWWr1SflAwSg8NAxhEOMLzbTRwhA+HYe6TsRIsO+gKTtRACBAAJ1jCOKSmoPgHg4WdIVhslA6IafjXw3pwBEvtX4/fE/uuE4xOg4AcLRmne8BP7dxSuNcIcpQGji47gzuYJDxMDg8c4Kbn8nhGH1GVD68FhS3884BsIgDydFgmDgafgGksDP2fWSeH3xZd8tK0kCwNOA8wSI4m5DDTFk8rQiPDgELgEQDlBY3KsQgMBFcAiDyluaTDrXIRAO0S0arK+IKkAgHALXAQgm8P+fKS/2Q8xr+aI7jG4OoU2hdj0vIiO/O7m+qQ8giD6AKAyFAAR5T9tJQRmnk8lHVYEABCLjPxAUiHCIHZMpTHEPIJTJB4i7IABAcyAUCADijiusfqcSiAoBgSsk65rOATBocahcW+cz6UniCgEwZOwyAIGisiUMFptj+KJOtcF0OJ8x+yGIiiRig0yPONLKQGjw4CEc4hGIo26h8zT8ayCMuQxODfEehOyuYFZHHIGrLmP7qZEtH5FRs6JvXWuczd2BriRhZFzJZHWc6C5dg1QD4m5xxg7pBC58ZjqYV/29C0TGAxhcn4zSNDZSAbH6qP53EDBZSeqI4wEIrw0geEMxAbxH53Ua/rLVl4zgEM3aTu9XGOESG3VudAcxmjRUzCGqX+ev7hISAYQ2W8ndHUgtgYiCwfM2tN44ntZ1x9GZ9k0u8Q6Cn3CUfL/WSlHZLSosQFQcwj/nvS9U6cWfyQLIth1U56ZfPsUVxBHWdA6hA11iBRiZAsTU2iFzIUyXkdAlskIhU4DI7kzaySmOglnJDanhkZHJhWQBTgWIurWElVNpgWO8BQTdxZB9FJUjw/Pb3J9gkJf/pmETncUyb3WL3bubUzu+pidNxudPIHasOHF0CdnoBncGVG58ThnXOAxgsHYZSfAZ4ny8LWqITJtbfma9BwxSsRA9Nw1OxGVaz+dkS5HFkcYhflt5XtGRPaK+H6dOAKLr9Qorh9EpQHifvKVLiMO46AQgIp1CN/28GI7Lb2BoZyAiM16TwlCixjgSr/bOXUDGjbpb2s5d7aFHdMiF/yvOUIypISKoX1l10RPyW7suXR0iYoBXv2AjwcdtuRAlk0N4X769crOLbXgJIiOL2n+3ogIQmVwCGDbVEB4ri7fxFneInxdSrl51y5LhgGfUZVy9Fe31nCqKxkAg7ua1rrRDBjBMcYdb53k8+OCMO4xxhoJtp1XHAQwBkZHVZvVmvUIxmcghdruEJo+xkV1GpXoBYBI6xFOXoF4wGpfoexkrUHx6QIcCTF0g3kGhHybbrSenhoiHgtvTOITbCp7oDlIdCFrHwILyKhDaAAwAK1ZD7J7MaTXItvPlKXTUDwCBZgGRaXt9qbjAIYgLgMAdZgExLS62t9gHPTsiMoiLEUBwQ2yDux8MDvATGSwAgEB7gdCJq2VirYRDEBctgZjSYZifJw6BOwAEmgVE14LS5dlYOAS6BAQ3uIYWzTgE0bgMBDePKCrRpLgACAQQ1A/rQNBpDIsLHAJ3eAwEnQY1BJoSFwBBXAAEAogucSEZgPB+wTvCIVCmBQcQCCDoLgCCuNgIBIXlEHfAIRBAFIsLAQhU1iGoIwYDwWYZgEDT6odOQAhO5g9E9usRwIBDtI2LMJ3MR+oItIJNLB2C9rORVt79DQB5Y0eeOg01RP36QXfGzJHoxND9id0KwyoQtHc9C1AiAxhsgSA2no9XuPseWchEOURkzO1OXIAgNopD8QQIYoPIQJU6hixAEBuDHYLYAAjUWeyHmN2diJdDUEfkHx+xigzqiHrdjOmOKVyCohKXyLzKM3cZuARtJ1AAxOfYAAoc4iMU+u0PagqE3IQCOJLFsfela7kAjwJIHBSn0aRf3S945Ys/6gBn5fbz3zGSH2N21a3FGognJxWxsjqB8f28dGWMz+QnhZxj5SxEfOfIkCyfdRqeoDacONrOzC0Sqg0EAggEEKh0dFoCQTGIQ1BYAgQCCNTXIQEiHgaZDoQCw1yHoNP4GwaZBsRklyi5wecMHjAZ5AYl3NMDiL/ufHbYpKIL4zHeIT7dDtekg6YG40BkXISic41RxgEPBsb8fEud88FqAYQMXUbUTmvAvgAEdyBzFJwp9A/7GH7tiO+eSgAAAABJRU5ErkJggg==" alt="LSF G" style="max-width:62px;max-height:84px;width:auto;height:auto;display:block;margin:auto"/><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">G</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Index horizontal</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><img src="data:image/png;base64,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" alt="LSF H" style="max-width:62px;max-height:84px;width:auto;height:auto;display:block;margin:auto"/><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">H</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Deux doigts horiz.</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><img src="data:image/png;base64,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" alt="LSF I" style="max-width:62px;max-height:84px;width:auto;height:auto;display:block;margin:auto"/><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">I</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Auriculaire levé</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><img src="data:image/png;base64,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" alt="LSF J" style="max-width:62px;max-height:84px;width:auto;height:auto;display:block;margin:auto"/><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">J</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Auriculaire + J</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><img src="data:image/png;base64,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" alt="LSF K" style="max-width:62px;max-height:84px;width:auto;height:auto;display:block;margin:auto"/><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">K</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Index + majeur + p.</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><img src="data:image/png;base64,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" alt="LSF L" style="max-width:62px;max-height:84px;width:auto;height:auto;display:block;margin:auto"/><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">L</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Pouce + index (L)</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><img src="data:image/png;base64,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" alt="LSF M" style="max-width:62px;max-height:84px;width:auto;height:auto;display:block;margin:auto"/><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">M</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Trois doigts repliés</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><img src="data:image/png;base64,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" alt="LSF N" style="max-width:62px;max-height:84px;width:auto;height:auto;display:block;margin:auto"/><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">N</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Deux doigts repliés</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><img src="data:image/png;base64,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" alt="LSF O" style="max-width:62px;max-height:84px;width:auto;height:auto;display:block;margin:auto"/><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">O</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Main en O</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALUAAADWCAYAAACXM8NdAAAITElEQVR42u2dW5IjKwxELcKbmP0vVPfvhsNtlwuQhAQnI+Zn2t2ugkNW8iiQf//+PRDaSNooA7SbgBoBNULZ9ezNKzc+IxQryg61GoEP7CgF1Gr4XcCOlkOtQdegAI4ioNZF16M4OYruKIoRqDg5SgH1KFBiCLni4sgKakt4vCAHcDQUPzwkRpGFPI7SQP0LdMu4AuhAvRXg5HKg/gOCbAg4kOPUaR3cE3JA3wRq+VC5UW6tgyBJB6QWoAP8Jk7tDbY6gCJOoM/8LRpCsvjhBXbk1Lws/G5y/EKo5aKyrcFePYkiixsZk0iBTh0JtleFZszo0REMqIPB1gBAsjQ8HfwsgHeoGVSkGsEjBYC2uEfZ5F7KQ30HukwFn70jJm//7t4TcBvFj7tRZDQP8mjtmyklcxs6dc8jVBc6S/XhsrvujWsbQt0Ly0rAq7v3XfNARlCPdHyiK0E2gRvXDoQ6G9y7Vu5d10YP+23HMjm3bAo3YAdD/Q43w1WAvQ3Uo+4N3DZlqkCdJxdWg1sTwA3YC6GOhFsOABqwE0E9A3emSpJHns4oYCeBehSOX4Cf5NKA/UHPhJWiE3CdCvTr/Ueuf8epAx7rejDQOHZiqGfhZkjwcLBbkQoayd1ZrmUVTMeCXe10rp7F9RnHujMt6FKgrhtR1BBGLVpGR4G9yzmKnq6tRiAIYAO1BzQ9juvpzArYQO3hhvrFhb/BbLHjqiQuHwXq2jl71L29dqUCbKB2dcVPoyte25IBNlAvq2zdEIBtwd4V6p5O3tW496//E0ewAHtQzw1hjgAq69qU0XvZahFUOxDoLOugJRnY2zh22wRmDYBZJz+bHY5twG7AvOTJIYAN1CMFvBrmb5M12TNqebBbQZijJ0lOVGmwWzGgq3QCvTM7YBeHerU7Wx7/UXFb4XJgtwJAZ3JndWiMdB4PgloTwRzh7NnfUi9z3S0pzOoEDrn6ALBbwUqtALQANlBnjxsMERYCuyWBece4IRs3nNRgtwRAV+wMesWISvebFuyWHOhdcjJRJFDPhDC/F1amyYvo8fAqneKjRz92jhsnO7sM1ndpp54Zqnt1AgXYco4d/vbMMznQO3UCf1WwAnYNqL07g6M7oYozvBZ/UwA7F9QR7iwBv7PqzMKdlwFIRait3VkXAe3xN/UAcK/cOkQtOdC7udjMpu0V73VJ36EVAzr6UclRGwXBbgFAy+Oc0Q2UAOync+XLQvgYS86fsV06jq0A0MCJQqCOdOirEQOhIRBDLKDOHDkAGrC7oV7ZIbxauScre9soF9hPQ6C9pS8AX03IADCZOj3QnxxaOn+fSHKQW7fkQI8W2OzMnSS+P8CehDoL0O9urQsLHRWOH9kdmuyMW3dBrdEXMlgArM8A7FtQzzi0J2D642fAjT5CbRE51AFm7fwsgB/s1i1xhp6FE8APBbtNfJmXW3uACNwHxg81AFoMwFbDVt97njjQb+LWT4eLioBZnPoBmiB2Afbk2uunQ45+33zGar+1LMfHoQLxQx0AujP0Z3Xsskw2ltfvuIotxJMiMaQFXJgOjkas3mQduHOCPQS1B0hqANSKTudIhxPFRMIlTt3bQCxW1XnBh2sXiiHNuUVlOAfRCj5cu0gMaU6VtALmqHUpn64bsBPFkOfFL4gjzJ6t+tcEi8fWDZ+eBgwDxtXrH6cW75YTXNErVhKSuRO5dTOo/LtHxkW/KSMLwCZzJ8jW7UYvUy/+P/sZLjLZGC1dGwWVbc/b5COTJxVauC74TuSo5lARGbckAOyDsnUzBjJzRa4GmwgSZBbNCM4qG8asfMcSsIPksfS0Ath3XhYgPtSqw//nIJ4Uym1XHT3e7vGt8FG8U5+e1bTDwYkVidQogktnfu8riFGfgkaAU4eCLRP9i56FTsQQnNo9bni4qDxsdmFFHUZD/PgOdsQRzcQQnDqutQfADdhAvQxsD7iJIUCdAuxXuNX4O3FroHYDu3dYzhJGwAbqdHArYOcQ49S/44EGQ8n4NU6dzrmJIkBdDm4JajiADdRbAA7YZOpU2XsmVrzm6PdlsWRsnLpsA1AcG6h37HgCtkEHG6jzufbrmLdc/Azh1GXjCCMjQE3OBmpUGWwE1NuAPTKF791BU6BGM2B/y9pHwwzUe4C9GmjiB9oGbI+zN83KCajrgq2LYM4CNE69IdhRrv3rJYh0IzJADdgzT4OUQ4xADdg9rpwe6MeDpacVwdYfYHsdFZgeZqCuDbfF/to62KgeQI1WgP0Nbp34vgdQowxgHwMyUJ+Ts2dBLrmYCqjPce1eKMsubQVqXPsOzGRqtFXWLpetmXzZ27Vn/0bJziJOjco7M1CfoZ5p7u02yyF+oO3eewRq9ABqhIAaIaBGCKjReZ1BoEY4NSotBWqEgBohoEYIqBECanQlAWqEgBohoEZ+4hwYoEZAjRBQIwTUyFYC1AgBNUJAjZC72Pfjr0bGeqXodePUCLhw6poSI7CFosSpd2sUukHjxKkRQOHU5GrkUM5AjXBqlDJ+8GQAagTUCOcEanRY/El130Bd3615KuDUuOXuYvLFxh0tDrVHQJ0qSryv9Vjp0sc/IYgf86DIQqB5KuDUOCBOjRBQI54mQI3I0+b3D9S4NE6NcO7sjRqoEU6NcGugRtEZWg+AW4Ea197pnn7eFzOK30GoMJrwazuGXfYf6WqgOPXeUaR6HLl77YJTj8FR4dr1ByBSBOSp+gLq/Rql3gBGikJ8y4CA+jywV8OtBvdHR/HgGLUabjW+n1sCalzbEr4UfRygxrW366wDNXBvATJQA/dquF07qEAN3LPZOt3YN1Cj1ICOiGlytJ2AGgE1Qtn1Hwm9OascIxS5AAAAAElFTkSuQmCC" alt="LSF P" style="max-width:62px;max-height:84px;width:auto;height:auto;display:block;margin:auto"/><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">P</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">K vers le bas</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><img src="data:image/png;base64,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" alt="LSF Q" style="max-width:62px;max-height:84px;width:auto;height:auto;display:block;margin:auto"/><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">Q</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">G vers le bas</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><img src="data:image/png;base64,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" alt="LSF R" style="max-width:62px;max-height:84px;width:auto;height:auto;display:block;margin:auto"/><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">R</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Index + majeur croisés</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><img src="data:image/png;base64,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" alt="LSF S" style="max-width:62px;max-height:84px;width:auto;height:auto;display:block;margin:auto"/><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">S</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Poing fermé</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><img src="data:image/png;base64,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" alt="LSF T" style="max-width:62px;max-height:84px;width:auto;height:auto;display:block;margin:auto"/><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">T</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Pouce entre I/M</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><img src="data:image/png;base64,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" alt="LSF U" style="max-width:62px;max-height:84px;width:auto;height:auto;display:block;margin:auto"/><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">U</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">I+M joints</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><img src="data:image/png;base64,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" alt="LSF V" style="max-width:62px;max-height:84px;width:auto;height:auto;display:block;margin:auto"/><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">V</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">I+M écartés (V)</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><img src="data:image/png;base64,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" alt="LSF W" style="max-width:62px;max-height:84px;width:auto;height:auto;display:block;margin:auto"/><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">W</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Trois doigts levés</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><img src="data:image/png;base64,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" alt="LSF X" style="max-width:62px;max-height:84px;width:auto;height:auto;display:block;margin:auto"/><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">X</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Index recourbé</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><img src="data:image/png;base64,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" alt="LSF Y" style="max-width:62px;max-height:84px;width:auto;height:auto;display:block;margin:auto"/><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">Y</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Pouce + auriculaire</span></div><div style="display:flex;flex-direction:column;align-items:center;background:rgba(124,58,237,.08);border-radius:10px;padding:8px 5px;gap:3px;min-width:66px"><img src="data:image/png;base64,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" alt="LSF Z" style="max-width:62px;max-height:84px;width:auto;height:auto;display:block;margin:auto"/><span style="font-size:1rem;font-weight:800;color:#7c3aed;line-height:1">Z</span><span style="font-size:.6rem;color:#666;text-align:center;line-height:1.3">Index trace un Z</span></div></div>',
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
