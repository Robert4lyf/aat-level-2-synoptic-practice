// french-data.js — vanilla JS data file for French study app
// Sets three globals: window.FR_TOPICS, window.FR_QUESTIONS, window.FR_LEARN_PATH

window.FR_TOPICS = [
  { id: 'fr-salut', name: 'Salutations',      short: 'Salutations',    icon: '👋', desc: 'Greetings and polite expressions' },
  { id: 'fr-vocab', name: 'Vocabulaire',       short: 'Vocabulaire',    icon: '📚', desc: 'Essential nouns and adjectives' },
  { id: 'fr-gram',  name: 'Grammaire',         short: 'Grammaire',      icon: '✏️', desc: 'French grammar rules and structures' },
  { id: 'fr-num',   name: 'L\'heure & temps',   short: 'L\'heure',       icon: '🔢', desc: 'Telling the time and expressing time in French' },
  { id: 'fr-vie',   name: 'Vie quotidienne',   short: 'Vie quotidienne',icon: '🏠', desc: 'Daily life, shopping, transport and directions' },
  { id: 'fr-conj',  name: 'Conjugaison',       short: 'Conjugaison',    icon: '🔄', desc: 'Verb conjugation practice across all tenses' },
];

window.FR_QUESTIONS = [
  // ── fr-salut (fr-001 to fr-017) ──────────────────────────────────────────
  {
    id: 'fr-001', topic: 'fr-salut', type: 'mcq',
    q: 'What does "Bonjour" mean?',
    opts: ['Hello / Good day', 'Goodbye', 'Good night', 'Thank you'],
    ans: 0,
    exp: '"Bonjour" is the standard French greeting meaning hello or good day.'
  },
  {
    id: 'fr-002', topic: 'fr-salut', type: 'mcq',
    q: 'What does "Bonsoir" mean?',
    opts: ['Good morning', 'Good evening', 'Goodbye', 'See you soon'],
    ans: 1,
    exp: '"Bonsoir" is used to greet someone in the evening, meaning good evening.'
  },
  {
    id: 'fr-003', topic: 'fr-salut', type: 'mcq',
    q: 'What does "Bonne nuit" mean?',
    opts: ['Good afternoon', 'Good evening', 'Good night', 'Goodnight tomorrow'],
    ans: 2,
    exp: '"Bonne nuit" means good night and is used when parting for bed.'
  },
  {
    id: 'fr-004', topic: 'fr-salut', type: 'mcq',
    q: 'How do you say "Goodbye" formally in French?',
    opts: ['Salut', 'Au revoir', 'À bientôt', 'Ciao'],
    ans: 1,
    exp: '"Au revoir" is the standard formal way to say goodbye in French.'
  },
  {
    id: 'fr-005', topic: 'fr-salut', type: 'mcq',
    q: '"À bientôt" means?',
    opts: ['See you tomorrow', 'See you soon', 'Goodbye forever', 'Good night'],
    ans: 1,
    exp: '"À bientôt" means see you soon.'
  },
  {
    id: 'fr-006', topic: 'fr-salut', type: 'mcq',
    q: '"À demain" means?',
    opts: ['See you later', 'See you tomorrow', 'See you next week', 'Good night'],
    ans: 1,
    exp: '"À demain" means see you tomorrow. "Demain" is the French word for tomorrow.'
  },
  {
    id: 'fr-007', topic: 'fr-salut', type: 'mcq',
    q: '"S\'il vous plaît" is?',
    opts: ['Thank you', 'Please (formal)', 'Sorry', 'Excuse me'],
    ans: 1,
    exp: '"S\'il vous plaît" is the formal way to say please in French.'
  },
  {
    id: 'fr-008', topic: 'fr-salut', type: 'mcq',
    q: '"Merci beaucoup" means?',
    opts: ['Thank you very much', 'You\'re welcome', 'Sorry', 'Please'],
    ans: 0,
    exp: '"Merci beaucoup" means thank you very much. "Beaucoup" means a lot/very much.'
  },
  {
    id: 'fr-009', topic: 'fr-salut', type: 'mcq',
    q: '"De rien" means?',
    opts: ['Nothing at all', 'You\'re welcome', 'Excuse me', 'I don\'t know'],
    ans: 1,
    exp: '"De rien" means you\'re welcome (literally "it\'s nothing").'
  },
  {
    id: 'fr-010', topic: 'fr-salut', type: 'mcq',
    q: '"Excusez-moi" is?',
    opts: ['Thank you', 'You\'re welcome', 'Excuse me (formal)', 'Sorry (informal)'],
    ans: 2,
    exp: '"Excusez-moi" is the formal/plural way to say excuse me in French.'
  },
  {
    id: 'fr-011', topic: 'fr-salut', type: 'mcq',
    q: '"Comment vous appelez-vous?" means?',
    opts: ['How are you?', 'What is your name? (formal)', 'Where are you from?', 'How old are you?'],
    ans: 1,
    exp: '"Comment vous appelez-vous?" is the formal way to ask someone\'s name.'
  },
  {
    id: 'fr-012', topic: 'fr-salut', type: 'mcq',
    q: '"Je m\'appelle Marie" means?',
    opts: ['I am from Marie', 'My name is Marie', 'I like Marie', 'I know Marie'],
    ans: 1,
    exp: '"Je m\'appelle" literally means "I call myself" and is used to state your name.'
  },
  {
    id: 'fr-013', topic: 'fr-salut', type: 'mcq',
    q: '"Ça va?" means?',
    opts: ['Where are you going?', 'How are you / Is it OK?', 'Do you want some?', 'What time is it?'],
    ans: 1,
    exp: '"Ça va?" is an informal way to ask how someone is doing.'
  },
  {
    id: 'fr-014', topic: 'fr-salut', type: 'mcq',
    q: '"Ça va bien, merci" means?',
    opts: ['It\'s going badly', 'I\'m fine thanks', 'Thank you for coming', 'Nothing works'],
    ans: 1,
    exp: '"Ça va bien" means it\'s going well / I\'m fine, and "merci" adds thank you.'
  },
  {
    id: 'fr-015', topic: 'fr-salut', type: 'mcq',
    q: 'Which is the INFORMAL greeting?',
    opts: ['Bonjour', 'Bonsoir', 'Salut', 'Comment allez-vous?'],
    ans: 2,
    exp: '"Salut" is the informal/casual greeting equivalent to "hi" in English.'
  },
  {
    id: 'fr-016', topic: 'fr-salut', type: 'mcq',
    q: '"Enchanté(e)" means?',
    opts: ['Tired', 'Nice to meet you', 'I\'m busy', 'Let\'s go'],
    ans: 1,
    exp: '"Enchanté(e)" means nice to meet you and is used when introduced to someone.'
  },
  {
    id: 'fr-017', topic: 'fr-salut', type: 'mcq',
    q: '"Comment allez-vous?" — what register is this?',
    opts: ['Informal', 'Formal', 'Slang', 'Regional'],
    ans: 1,
    exp: '"Comment allez-vous?" uses the formal "vous" form and is therefore formal.'
  },

  // ── fr-vocab (fr-027 to fr-033) ──────────────────────────────────────────
  {
    id: 'fr-027', topic: 'fr-vocab', type: 'mcq',
    q: '"Père" means?',
    opts: ['Mother', 'Brother', 'Father', 'Son'],
    ans: 2,
    exp: '"Père" is the French word for father.'
  },
  {
    id: 'fr-028', topic: 'fr-vocab', type: 'mcq',
    q: '"Sœur" means?',
    opts: ['Brother', 'Daughter', 'Mother', 'Sister'],
    ans: 3,
    exp: '"Sœur" is the French word for sister.'
  },
  {
    id: 'fr-029', topic: 'fr-vocab', type: 'mcq',
    q: '"Pain" means?',
    opts: ['Butter', 'Bread', 'Cheese', 'Wine'],
    ans: 1,
    exp: '"Pain" is the French word for bread.'
  },
  {
    id: 'fr-030', topic: 'fr-vocab', type: 'mcq',
    q: '"Eau" means?',
    opts: ['Milk', 'Coffee', 'Water', 'Tea'],
    ans: 2,
    exp: '"Eau" is the French word for water.'
  },
  {
    id: 'fr-031', topic: 'fr-vocab', type: 'mcq',
    q: '"Chat" means?',
    opts: ['Dog', 'Horse', 'Cat', 'Bird'],
    ans: 2,
    exp: '"Chat" is the French word for cat.'
  },
  {
    id: 'fr-032', topic: 'fr-vocab', type: 'mcq',
    q: '"Tête" means?',
    opts: ['Hand', 'Foot', 'Head', 'Ear'],
    ans: 2,
    exp: '"Tête" is the French word for head.'
  },
  {
    id: 'fr-033', topic: 'fr-vocab', type: 'mcq',
    q: '"Main" means?',
    opts: ['Hand', 'Foot', 'Eye', 'Nose'],
    ans: 0,
    exp: '"Main" is the French word for hand.'
  },
  // ── fr-gram (fr-035 to fr-051) ───────────────────────────────────────────
  {
    id: 'fr-035', topic: 'fr-gram', type: 'mcq',
    q: 'Which article is masculine singular definite?',
    opts: ['la', 'les', 'le', 'un'],
    ans: 2,
    exp: '"Le" is the masculine singular definite article (e.g. le livre).'
  },
  {
    id: 'fr-036', topic: 'fr-gram', type: 'mcq',
    q: 'Which article is feminine singular definite?',
    opts: ['le', 'la', 'un', 'une'],
    ans: 1,
    exp: '"La" is the feminine singular definite article (e.g. la table).'
  },
  {
    id: 'fr-037', topic: 'fr-gram', type: 'mcq',
    q: '"Un/une" are which type of articles?',
    opts: ['Definite', 'Indefinite', 'Partitive', 'Negative'],
    ans: 1,
    exp: '"Un" and "une" are indefinite articles meaning a/an.'
  },
  {
    id: 'fr-038', topic: 'fr-gram', type: 'mcq',
    q: '"Des" is the plural of which article?',
    opts: ['le / la', 'un / une', 'du / de la', 'de'],
    ans: 1,
    exp: '"Des" is the plural of the indefinite articles un and une.'
  },
  {
    id: 'fr-039', topic: 'fr-gram', type: 'mcq',
    q: 'The French word "maison" (house) is which gender?',
    opts: ['Masculine', 'Feminine', 'Neuter', 'Variable'],
    ans: 1,
    exp: '"Maison" is a feminine noun in French — it uses "la maison".'
  },
  {
    id: 'fr-040', topic: 'fr-gram', type: 'mcq',
    q: 'How do you make most nouns plural in French?',
    opts: ['Add -es', 'Add -s', 'Add -x', 'No change'],
    ans: 1,
    exp: 'Most French nouns form the plural by adding -s (e.g. livre → livres).'
  },
  {
    id: 'fr-041', topic: 'fr-gram', type: 'mcq',
    q: '"Ne...pas" is used for?',
    opts: ['Questions', 'Negation', 'Exclamations', 'Emphasis'],
    ans: 1,
    exp: '"Ne...pas" surrounds the verb to form a negative sentence (I do not...).'
  },
  {
    id: 'fr-042', topic: 'fr-gram', type: 'mcq',
    q: '"Je suis" means?',
    opts: ['I have', 'I am', 'I go', 'I do'],
    ans: 1,
    exp: '"Je suis" is the first-person singular of être (to be), meaning I am.'
  },
  {
    id: 'fr-043', topic: 'fr-gram', type: 'mcq',
    q: '"Tu as" means?',
    opts: ['You go', 'You are', 'You have (informal)', 'You do'],
    ans: 2,
    exp: '"Tu as" is the informal second-person singular of avoir (to have).'
  },
  {
    id: 'fr-044', topic: 'fr-gram', type: 'mcq',
    q: '"Il/elle va" uses which verb?',
    opts: ['être', 'avoir', 'aller', 'faire'],
    ans: 2,
    exp: '"Va" is the third-person singular of aller (to go).'
  },
  {
    id: 'fr-045', topic: 'fr-gram', type: 'mcq',
    q: '"Nous faisons" means?',
    opts: ['We are', 'We have', 'We go', 'We do / make'],
    ans: 3,
    exp: '"Nous faisons" is the first-person plural of faire (to do/make).'
  },
  {
    id: 'fr-046', topic: 'fr-gram', type: 'mcq',
    q: 'How does a feminine adjective generally differ from its masculine form?',
    opts: ['It is shorter', 'It adds -e', 'It adds -s', 'It adds -ment'],
    ans: 1,
    exp: 'Feminine adjectives are generally formed by adding -e to the masculine form.'
  },
  {
    id: 'fr-047', topic: 'fr-gram', type: 'mcq',
    q: '"Grand" (masc) becomes what in the feminine form?',
    opts: ['Grande', 'Grandes', 'Grands', 'Grand'],
    ans: 0,
    exp: 'The feminine of "grand" is "grande" — simply add -e.'
  },
  {
    id: 'fr-048', topic: 'fr-gram', type: 'mcq',
    q: 'To ask a question you can invert subject and verb. "Parlez-vous français?" means?',
    opts: ['Do you speak French?', 'Are you French?', 'You speak French.', 'Speak French please.'],
    ans: 0,
    exp: '"Parlez-vous français?" inverts the verb and subject to form a question: Do you speak French?'
  },
  {
    id: 'fr-049', topic: 'fr-gram', type: 'mcq',
    q: 'Which preposition means "in" (for countries/cities)?',
    opts: ['de', 'sur', 'à / en', 'dans'],
    ans: 2,
    exp: '"À" is used before cities (à Paris) and "en" before feminine countries (en France).'
  },
  {
    id: 'fr-050', topic: 'fr-gram', type: 'mcq',
    q: '"Sur" means?',
    opts: ['Under', 'On / Above', 'In', 'Between'],
    ans: 1,
    exp: '"Sur" means on or above (e.g. sur la table — on the table).'
  },
  {
    id: 'fr-051', topic: 'fr-gram', type: 'mcq',
    q: '"Sous" means?',
    opts: ['On', 'Over', 'Under / Below', 'Beside'],
    ans: 2,
    exp: '"Sous" means under or below (e.g. sous la table — under the table).'
  },

  // ── fr-num (fr-062 to fr-065) ────────────────────────────────────────────
  {
    id: 'fr-062', topic: 'fr-num', type: 'mcq',
    q: '"Quelle heure est-il?" means?',
    opts: ['What day is it?', 'What time is it?', 'How long?', 'What year?'],
    ans: 1,
    exp: '"Quelle heure est-il?" is the standard French way to ask what time it is.'
  },
  {
    id: 'fr-063', topic: 'fr-num', type: 'mcq',
    q: '"Il est trois heures" means?',
    opts: ['It is two o\'clock', 'It is three o\'clock', 'It is thirty', 'It is thirteen hours'],
    ans: 1,
    exp: '"Il est trois heures" = It is three o\'clock.'
  },
  {
    id: 'fr-064', topic: 'fr-num', type: 'mcq',
    q: 'What is "le printemps"?',
    opts: ['Summer', 'Autumn', 'Winter', 'Spring'],
    ans: 3,
    exp: '"Le printemps" is spring in French.'
  },
  {
    id: 'fr-065', topic: 'fr-num', type: 'mcq',
    q: 'What is "l\'hiver"?',
    opts: ['Summer', 'Autumn', 'Winter', 'Spring'],
    ans: 2,
    exp: '"L\'hiver" is winter in French.'
  },
  // ── fr-vie (fr-069 to fr-085) ────────────────────────────────────────────
  {
    id: 'fr-069', topic: 'fr-vie', type: 'mcq',
    q: '"Combien ça coûte?" means?',
    opts: ['Where is it?', 'How much does it cost?', 'Do you have any?', 'I\'d like this.'],
    ans: 1,
    exp: '"Combien ça coûte?" is the standard way to ask how much something costs.'
  },
  {
    id: 'fr-070', topic: 'fr-vie', type: 'mcq',
    q: '"Je voudrais" means?',
    opts: ['I want (rude)', 'I would like (polite)', 'I need', 'I have'],
    ans: 1,
    exp: '"Je voudrais" is the conditional of vouloir and means I would like — polite and commonly used in shops and restaurants.'
  },
  {
    id: 'fr-071', topic: 'fr-vie', type: 'mcq',
    q: '"Le train" means?',
    opts: ['Plane', 'Bus', 'Train', 'Car'],
    ans: 2,
    exp: '"Le train" is the French word for train.'
  },
  {
    id: 'fr-072', topic: 'fr-vie', type: 'mcq',
    q: '"L\'autobus" means?',
    opts: ['Taxi', 'Bike', 'Bus', 'Subway'],
    ans: 2,
    exp: '"L\'autobus" (or "le bus") is the French word for bus.'
  },
  {
    id: 'fr-073', topic: 'fr-vie', type: 'mcq',
    q: '"Le métro" means?',
    opts: ['Train', 'Subway / Metro', 'Tram', 'Bus'],
    ans: 1,
    exp: '"Le métro" refers to the underground subway/metro system.'
  },
  {
    id: 'fr-074', topic: 'fr-vie', type: 'mcq',
    q: '"À pied" means?',
    opts: ['By car', 'By bus', 'On foot', 'By bike'],
    ans: 2,
    exp: '"À pied" means on foot — travelling by walking.'
  },
  {
    id: 'fr-075', topic: 'fr-vie', type: 'mcq',
    q: '"Tout droit" means?',
    opts: ['Turn left', 'Turn right', 'Straight ahead', 'Stop'],
    ans: 2,
    exp: '"Tout droit" means straight ahead when giving directions.'
  },
  {
    id: 'fr-076', topic: 'fr-vie', type: 'mcq',
    q: '"À gauche" means?',
    opts: ['Straight on', 'To the right', 'To the left', 'Behind'],
    ans: 2,
    exp: '"À gauche" means to the left.'
  },
  {
    id: 'fr-077', topic: 'fr-vie', type: 'mcq',
    q: '"À droite" means?',
    opts: ['To the left', 'Straight on', 'To the right', 'In front'],
    ans: 2,
    exp: '"À droite" means to the right.'
  },
  {
    id: 'fr-078', topic: 'fr-vie', type: 'mcq',
    q: '"La carte" at a restaurant means?',
    opts: ['The bill', 'The menu / card', 'The table', 'The waiter'],
    ans: 1,
    exp: '"La carte" at a restaurant means the menu. "La carte des vins" = wine list.'
  },
  {
    id: 'fr-079', topic: 'fr-vie', type: 'mcq',
    q: '"L\'addition" means?',
    opts: ['The menu', 'The starter', 'The bill', 'The dessert'],
    ans: 2,
    exp: '"L\'addition" is the bill/check at a restaurant.'
  },
  {
    id: 'fr-080', topic: 'fr-vie', type: 'mcq',
    q: '"Il fait beau" means?',
    opts: ['It\'s cold', 'It\'s raining', 'It\'s nice / sunny weather', 'It\'s windy'],
    ans: 2,
    exp: '"Il fait beau" is a common weather expression meaning it\'s nice/fine weather.'
  },
  {
    id: 'fr-081', topic: 'fr-vie', type: 'mcq',
    q: '"Il pleut" means?',
    opts: ['It\'s snowing', 'It\'s raining', 'It\'s foggy', 'It\'s hot'],
    ans: 1,
    exp: '"Il pleut" comes from the verb pleuvoir and means it is raining.'
  },
  {
    id: 'fr-082', topic: 'fr-vie', type: 'mcq',
    q: '"Il fait chaud" means?',
    opts: ['It\'s cold', 'It\'s windy', 'It\'s hot', 'It\'s cloudy'],
    ans: 2,
    exp: '"Il fait chaud" means it\'s hot. "Chaud" = hot/warm.'
  },
  {
    id: 'fr-083', topic: 'fr-vie', type: 'mcq',
    q: '"Une chambre" at a hotel means?',
    opts: ['A bathroom', 'A room', 'A bed', 'A key'],
    ans: 1,
    exp: '"Une chambre" means a bedroom/room in a hotel.'
  },
  {
    id: 'fr-084', topic: 'fr-vie', type: 'mcq',
    q: '"En voiture" means?',
    opts: ['On foot', 'By train', 'By car', 'By plane'],
    ans: 2,
    exp: '"En voiture" means by car. "Voiture" = car.'
  },
  {
    id: 'fr-085', topic: 'fr-vie', type: 'mcq',
    q: '"Tournez à gauche" means?',
    opts: ['Go straight', 'Turn left', 'Turn right', 'Stop here'],
    ans: 1,
    exp: '"Tournez à gauche" = Turn left. "Tournez" = turn, "à gauche" = to the left.'
  },

  // ── NEW: Conjugaison & grammaire avancée (fr-086 to fr-120) ──────────────

  // -ER verb gapfill
  {
    id: 'fr-086', topic: 'fr-conj', type: 'gapfill',
    q: 'Complete with the correct form of "parler" (to speak):',
    template: 'Nous {0} français tous les jours.',
    gaps: [{ options: ['parlons', 'parlez', 'parlent', 'parle'], answer: 0 }],
    exp: '"Nous" takes the "-ons" ending for -ER verbs: nous parlons.'
  },
  {
    id: 'fr-087', topic: 'fr-conj', type: 'gapfill',
    q: 'Complete with the correct form of "aimer" (to like/love):',
    template: 'Elle {0} le chocolat.',
    gaps: [{ options: ['aime', 'aimes', 'aimons', 'aimez'], answer: 0 }],
    exp: '"Il/elle" takes "-e" for -ER verbs: elle aime.'
  },
  {
    id: 'fr-088', topic: 'fr-conj', type: 'gapfill',
    q: 'Complete with the correct form of "travailler" (to work):',
    template: 'Vous {0} beaucoup.',
    gaps: [{ options: ['travaillez', 'travaillons', 'travaillent', 'travaille'], answer: 0 }],
    exp: '"Vous" takes "-ez" for -ER verbs: vous travaillez.'
  },
  {
    id: 'fr-089', topic: 'fr-conj', type: 'dragdrop',
    q: 'Match each subject pronoun to its correct form of "parler":',
    pairs: [
      { left: 'je', right: 'parle' },
      { left: 'tu', right: 'parles' },
      { left: 'nous', right: 'parlons' },
      { left: 'ils', right: 'parlent' },
    ],
    exp: '-ER endings: je -e, tu -es, il/elle -e, nous -ons, vous -ez, ils/elles -ent.'
  },
  {
    id: 'fr-090', topic: 'fr-gram', type: 'gapfill',
    q: 'Make the sentence negative (ne...pas):',
    template: 'Je {0} parle {1} anglais.',
    gaps: [
      { options: ['ne', 'pas', 'non', 'n\''], answer: 0 },
      { options: ['pas', 'ne', 'non', 'rien'], answer: 0 },
    ],
    exp: 'Negation wraps the verb: Je NE parle PAS anglais.'
  },
  {
    id: 'fr-091', topic: 'fr-gram', type: 'gapfill',
    q: 'Form a question using "est-ce que":',
    template: '{0} tu parles espagnol ?',
    gaps: [{ options: ['Est-ce que', 'Que', 'Qui', 'Dont'], answer: 0 }],
    exp: '"Est-ce que" placed before subject + verb forms a question without inversion.'
  },
  {
    id: 'fr-092', topic: 'fr-gram', type: 'gapfill',
    q: 'Complete with the passé composé of "manger":',
    template: 'J\'{0} mangé ce matin.',
    gaps: [{ options: ['ai', 'suis', 'as', 'est'], answer: 0 }],
    exp: '"Manger" uses avoir in passé composé: j\'ai mangé.'
  },
  {
    id: 'fr-093', topic: 'fr-gram', type: 'gapfill',
    q: 'Complete with the passé composé of "aller":',
    template: 'Elle {0} allée au marché hier.',
    gaps: [{ options: ['est', 'a', 'sont', 'ont'], answer: 0 }],
    exp: '"Aller" uses être in passé composé: elle est allée.'
  },
  {
    id: 'fr-094', topic: 'fr-gram', type: 'dragdrop',
    q: 'Match each infinitive to its past participle:',
    pairs: [
      { left: 'parler', right: 'parlé' },
      { left: 'finir', right: 'fini' },
      { left: 'vendre', right: 'vendu' },
      { left: 'faire', right: 'fait' },
    ],
    exp: 'Regular: -ER → -é, -IR → -i, -RE → -u. Irregular: faire → fait.'
  },
  {
    id: 'fr-095', topic: 'fr-gram', type: 'dragdrop',
    q: 'Match each verb to its auxiliary in the passé composé:',
    pairs: [
      { left: 'manger', right: 'avoir' },
      { left: 'aller', right: 'être' },
      { left: 'venir', right: 'être' },
      { left: 'finir', right: 'avoir' },
    ],
    exp: 'Être group (DR MRS VANDERTRAMP) + reflexives use être; most verbs use avoir.'
  },
  {
    id: 'fr-096', topic: 'fr-gram', type: 'gapfill',
    q: 'Complete with the imparfait of "habiter" (to live):',
    template: 'Quand j\'étais enfant, j\'{0} à Lyon.',
    gaps: [{ options: ['habitais', 'habite', 'habiterai', 'habitait'], answer: 0 }],
    exp: 'Imparfait: stem from nous form (drop -ons) + -ais. j\'habitais = I used to live.'
  },
  {
    id: 'fr-097', topic: 'fr-gram', type: 'mcq',
    q: 'The imparfait is used for?',
    opts: ['A single completed past action', 'An ongoing or habitual past action / description', 'A future plan', 'A polite request'],
    ans: 1,
    exp: 'Imparfait = ongoing, habitual, or descriptive past. Passé composé = completed event.'
  },
  {
    id: 'fr-098', topic: 'fr-gram', type: 'mcq',
    q: '"Quand j\'étais jeune, je jouais au foot" — the imparfait here expresses?',
    opts: ['A sudden completed event', 'A habitual past activity', 'A future intention', 'A polite wish'],
    ans: 1,
    exp: '"Je jouais" = I used to play — a repeated past habit, expressed with imparfait.'
  },
  {
    id: 'fr-099', topic: 'fr-gram', type: 'gapfill',
    q: 'Complete with the futur simple of "parler":',
    template: 'Demain, je {0} avec le directeur.',
    gaps: [{ options: ['parlerai', 'parle', 'parlais', 'parlé'], answer: 0 }],
    exp: 'Futur simple: infinitive + -ai. parler → je parlerai.'
  },
  {
    id: 'fr-100', topic: 'fr-gram', type: 'dragdrop',
    q: 'Match each verb to its irregular futur simple stem:',
    pairs: [
      { left: 'être', right: 'ser-' },
      { left: 'avoir', right: 'aur-' },
      { left: 'aller', right: 'ir-' },
      { left: 'faire', right: 'fer-' },
    ],
    exp: 'Irregular futur stems: être→ser-, avoir→aur-, aller→ir-, faire→fer-.'
  },
  {
    id: 'fr-101', topic: 'fr-gram', type: 'mcq',
    q: '"Je vais partir" — which tense is this?',
    opts: ['Futur simple', 'Futur proche', 'Conditionnel', 'Présent'],
    ans: 1,
    exp: 'Futur proche = aller (présent) + infinitif. Je vais partir = I am going to leave.'
  },
  {
    id: 'fr-102', topic: 'fr-gram', type: 'mcq',
    q: '"Se lever" means?',
    opts: ['To lower something', 'To get up', 'To lie down', 'To leave'],
    ans: 1,
    exp: '"Se lever" is a pronominal (reflexive) verb meaning to get up.'
  },
  {
    id: 'fr-103', topic: 'fr-gram', type: 'gapfill',
    q: 'Complete with the present tense of "se laver":',
    template: 'Il {0} les mains avant de manger.',
    gaps: [{ options: ['se lave', 'se lève', 'se lavait', 'se lavé'], answer: 0 }],
    exp: '"Se laver" présent for il: il se lave (he washes himself).'
  },
  {
    id: 'fr-104', topic: 'fr-gram', type: 'mcq',
    q: 'In the passé composé, pronominal verbs use which auxiliary?',
    opts: ['avoir', 'être', 'aller', 'faire'],
    ans: 1,
    exp: 'All pronominal (reflexive) verbs use être in passé composé: je me suis levé(e).'
  },
  {
    id: 'fr-105', topic: 'fr-gram', type: 'mcq',
    q: '"Je le vois" — what does "le" replace?',
    opts: ['A feminine direct object', 'A masculine singular direct object', 'An indirect object', 'A plural noun'],
    ans: 1,
    exp: '"Le" is the masculine singular COD (direct object pronoun).'
  },
  {
    id: 'fr-106', topic: 'fr-gram', type: 'mcq',
    q: 'The COI pronoun for "to him / to her" is?',
    opts: ['lui', 'le', 'la', 'leur'],
    ans: 0,
    exp: '"Lui" is the COI pronoun for he/she: Je lui parle = I speak to him/her.'
  },
  {
    id: 'fr-107', topic: 'fr-gram', type: 'mcq',
    q: '"Nous leur parlons" — "leur" means?',
    opts: ['To him', 'To her', 'To them', 'For us'],
    ans: 2,
    exp: '"Leur" (plural COI) means "to them".'
  },
  {
    id: 'fr-108', topic: 'fr-gram', type: 'mcq',
    q: 'Where do COD/COI object pronouns go in a sentence?',
    opts: ['After the verb', 'Before the conjugated verb', 'At the end of the sentence', 'After the subject'],
    ans: 1,
    exp: 'Object pronouns go directly before the conjugated verb: Je le vois / Je lui parle.'
  },
  {
    id: 'fr-109', topic: 'fr-gram', type: 'mcq',
    q: 'The conditionnel présent is formed with?',
    opts: ['Present stem + present endings', 'Futur stem + imparfait endings', 'Infinitive + être', 'Past participle + avoir'],
    ans: 1,
    exp: 'Conditionnel = futur simple stem + imparfait endings (-ais, -ais, -ait, -ions, -iez, -aient).'
  },
  {
    id: 'fr-110', topic: 'fr-gram', type: 'mcq',
    q: '"Je voudrais un café" — what tense is "voudrais"?',
    opts: ['Imparfait', 'Futur simple', 'Conditionnel présent', 'Subjonctif'],
    ans: 2,
    exp: '"Voudrais" is conditionnel présent of vouloir, used for polite requests.'
  },
  {
    id: 'fr-111', topic: 'fr-gram', type: 'gapfill',
    q: 'Complete: si + imparfait → conditionnel (voyager):',
    template: 'Si j\'avais le temps, je {0} en France.',
    gaps: [{ options: ['voyagerais', 'voyage', 'voyagerai', 'ai voyagé'], answer: 0 }],
    exp: 'Si + imparfait → conditionnel présent: je voyagerais = I would travel.'
  },
  {
    id: 'fr-112', topic: 'fr-gram', type: 'mcq',
    q: '"Il faut que tu ___" is followed by which mood?',
    opts: ['Indicatif', 'Conditionnel', 'Subjonctif', 'Infinitif'],
    ans: 2,
    exp: '"Il faut que" always triggers the subjonctif.'
  },
  {
    id: 'fr-113', topic: 'fr-gram', type: 'mcq',
    q: 'Subjonctif of "être" for "il/elle" is?',
    opts: ['est', 'soit', 'serait', 'était'],
    ans: 1,
    exp: '"Être" has an irregular subjonctif: que je sois, que tu sois, qu\'il soit.'
  },
  {
    id: 'fr-114', topic: 'fr-gram', type: 'mcq',
    q: '"bien que" (although) is followed by which mood?',
    opts: ['Indicatif', 'Conditionnel', 'Infinitif', 'Subjonctif'],
    ans: 3,
    exp: '"Bien que" always takes the subjonctif: bien qu\'il soit tard.'
  },
  {
    id: 'fr-115', topic: 'fr-gram', type: 'mcq',
    q: '"L\'homme ___ parle" — which relative pronoun completes this?',
    opts: ['que', 'dont', 'qui', 'où'],
    ans: 2,
    exp: '"Qui" is the subject relative pronoun: l\'homme qui parle = the man who speaks.'
  },
  {
    id: 'fr-116', topic: 'fr-gram', type: 'mcq',
    q: '"Le livre ___ j\'ai lu" — which relative pronoun?',
    opts: ['qui', 'que', 'dont', 'où'],
    ans: 1,
    exp: '"Que" is the direct object relative pronoun: le livre que j\'ai lu = the book I read.'
  },
  {
    id: 'fr-117', topic: 'fr-gram', type: 'mcq',
    q: '"Le pays ___ je vis" — which relative pronoun?',
    opts: ['qui', 'que', 'dont', 'où'],
    ans: 3,
    exp: '"Où" is used for place or time: le pays où je vis = the country where I live.'
  },
  {
    id: 'fr-118', topic: 'fr-gram', type: 'mcq',
    q: '"Le livre ___ j\'ai besoin" — which relative pronoun? (avoir besoin DE)',
    opts: ['qui', 'que', 'dont', 'où'],
    ans: 2,
    exp: '"Dont" replaces de + noun: le livre dont j\'ai besoin (avoir besoin de).'
  },
  {
    id: 'fr-119', topic: 'fr-gram', type: 'dragdrop',
    q: 'Match each relative pronoun to its function:',
    pairs: [
      { left: 'qui', right: 'Subject of relative clause' },
      { left: 'que', right: 'Direct object of relative clause' },
      { left: 'dont', right: 'After expressions with "de"' },
      { left: 'où', right: 'Place or time reference' },
    ],
    exp: 'qui = subject, que = direct object, dont = de + ..., où = where/when.'
  },
  {
    id: 'fr-120', topic: 'fr-gram', type: 'mcq',
    q: '"Elle est partie" — the past participle "parti" adds -e because?',
    opts: ['All -IR verbs add -e', 'The subject is feminine and être is the auxiliary', 'It is always irregular', 'It is in the futur'],
    ans: 1,
    exp: 'With être in passé composé, the past participle agrees with the subject gender: elle est partie.'
  },
  // ── Extended practice bank (breadth: family, time, dates, food, weather, tenses) ──
  {"id":"fr-121","topic":"fr-salut","type":"mcq","q":"A waiter says « Vous désirez ? ». He is asking:","opts":["How are you?","What would you like?","Where are you from?","What's your name?"],"ans":1,"exp":"« Vous désirez ? » = What would you like? (taking an order)."},
  {"id":"fr-122","topic":"fr-salut","type":"mcq","q":"Which reply best answers « Comment ça va ? »","opts":["Je m'appelle Léa","Ça va bien, merci","Au revoir","J'ai 20 ans"],"ans":1,"exp":"« Ça va bien, merci » = I'm fine, thanks."},
  {"id":"fr-123","topic":"fr-salut","type":"mcq","q":"« Enchanté(e) ! » is said when:","opts":["leaving","meeting someone for the first time","apologising","thanking"],"ans":1,"exp":"« Enchanté(e) » = pleased to meet you, on first meeting."},
  {"id":"fr-124","topic":"fr-salut","type":"mcq","q":"To politely get a stranger's attention you say:","opts":["Salut !","Excusez-moi, Monsieur","De rien","Bonne nuit"],"ans":1,"exp":"« Excusez-moi » politely gets attention or apologises."},
  {"id":"fr-125","topic":"fr-salut","type":"mcq","q":"« À tout à l'heure » means:","opts":["See you tomorrow","See you later today","Goodbye forever","Good night"],"ans":1,"exp":"« À tout à l'heure » = see you later (the same day)."},
  {"id":"fr-126","topic":"fr-vocab","type":"mcq","q":"« la sœur » means:","opts":["the brother","the sister","the mother","the aunt"],"ans":1,"exp":"la sœur = the sister."},
  {"id":"fr-127","topic":"fr-vocab","type":"mcq","q":"« les grands-parents » are:","opts":["the parents","the grandparents","the cousins","the children"],"ans":1,"exp":"les grands-parents = the grandparents."},
  {"id":"fr-128","topic":"fr-vocab","type":"mcq","q":"Which word means « husband »?","opts":["la femme","le mari","le fils","le frère"],"ans":1,"exp":"le mari = husband; la femme = wife."},
  {"id":"fr-129","topic":"fr-vocab","type":"mcq","q":"« un jus d'orange » is a:","opts":["food","drink","place","colour"],"ans":1,"exp":"un jus d'orange = an orange juice (a drink)."},
  {"id":"fr-130","topic":"fr-vocab","type":"mcq","q":"Which is something you eat?","opts":["un café","une eau","un croissant","un thé"],"ans":2,"exp":"un croissant is food; the others are drinks."},
  {"id":"fr-131","topic":"fr-vocab","type":"mcq","q":"« Il fait froid » describes:","opts":["the time","the weather (cold)","a feeling","a colour"],"ans":1,"exp":"« Il fait froid » = it's cold (weather)."},
  {"id":"fr-132","topic":"fr-vocab","type":"mcq","q":"Which season is « l'hiver »?","opts":["spring","summer","autumn","winter"],"ans":3,"exp":"l'hiver = winter."},
  {"id":"fr-133","topic":"fr-vocab","type":"mcq","q":"« Elle est espagnole » means she is:","opts":["Italian","Spanish","German","English"],"ans":1,"exp":"espagnole = Spanish (feminine)."},
  {"id":"fr-134","topic":"fr-vocab","type":"mcq","q":"The language « le chinois » is:","opts":["Japanese","Korean","Chinese","Vietnamese"],"ans":2,"exp":"le chinois = Chinese."},
  {"id":"fr-136","topic":"fr-vocab","type":"dragdrop","q":"Match each French word to its meaning:","pairs":[{"left":"le père","right":"father"},{"left":"la mère","right":"mother"},{"left":"le fils","right":"son"},{"left":"la fille","right":"daughter"}],"exp":"Core family vocabulary: père, mère, fils, fille."},
  {"id":"fr-137","topic":"fr-vocab","type":"dragdrop","q":"Match the season to English:","pairs":[{"left":"le printemps","right":"spring"},{"left":"l'été","right":"summer"},{"left":"l'automne","right":"autumn"},{"left":"l'hiver","right":"winter"}],"exp":"The four seasons in French."},
  {"id":"fr-138","topic":"fr-gram","type":"mcq","q":"« Je vais ___ cinéma. » (à + le)","opts":["à le","au","aux","du"],"ans":1,"exp":"à + le = au."},
  {"id":"fr-139","topic":"fr-gram","type":"mcq","q":"« le livre ___ professeur » (de + le)","opts":["de le","du","des","au"],"ans":1,"exp":"de + le = du."},
  {"id":"fr-140","topic":"fr-gram","type":"mcq","q":"Plural of « un animal »:","opts":["des animals","des animaux","des animales","des animal"],"ans":1,"exp":"-al → -aux: animaux."},
  {"id":"fr-141","topic":"fr-gram","type":"mcq","q":"« ___ amie » (my, before a vowel):","opts":["ma","mon","mes","m'"],"ans":1,"exp":"Before a feminine word starting with a vowel, use « mon » for sound: mon amie."},
  {"id":"fr-142","topic":"fr-gram","type":"mcq","q":"« ses livres » means:","opts":["my books","our books","his/her books","your books"],"ans":2,"exp":"ses = his/her (plural object)."},
  {"id":"fr-143","topic":"fr-gram","type":"mcq","q":"« Je mange ___ pain. » (some bread)","opts":["du","de la","des","le"],"ans":0,"exp":"Partitive masculine: du pain."},
  {"id":"fr-144","topic":"fr-gram","type":"mcq","q":"Negative: « Je bois du café » →","opts":["Je ne bois pas du café","Je ne bois pas de café","Je bois ne pas café","Je ne bois pas le café"],"ans":1,"exp":"After a negative, partitive → de: pas de café."},
  {"id":"fr-145","topic":"fr-gram","type":"mcq","q":"« Paul est ___ grand ___ Marc. » (taller than)","opts":["plus … que","moins … que","aussi … que","le plus … de"],"ans":0,"exp":"plus … que = more … than."},
  {"id":"fr-146","topic":"fr-gram","type":"mcq","q":"Comparative of « bon »:","opts":["plus bon","meilleur","mieux","bien"],"ans":1,"exp":"bon → meilleur (irregular)."},
  {"id":"fr-147","topic":"fr-gram","type":"mcq","q":"« L'homme ___ parle est mon père. »","opts":["que","qui","dont","où"],"ans":1,"exp":"Subject relative pronoun → qui."},
  {"id":"fr-148","topic":"fr-gram","type":"mcq","q":"« Le livre ___ je lis. »","opts":["qui","que","dont","où"],"ans":1,"exp":"Direct object relative pronoun → que."},
  {"id":"fr-149","topic":"fr-gram","type":"mcq","q":"« Le pays ___ je vis. »","opts":["qui","que","dont","où"],"ans":3,"exp":"Place → où."},
  {"id":"fr-150","topic":"fr-gram","type":"gapfill","q":"Choose the correct article:","template":"J'achète {0} pommes au marché.","gaps":[{"options":["des","du","de la","le"],"answer":0}],"exp":"Plural « some » → des pommes."},
  {"id":"fr-151","topic":"fr-gram","type":"gapfill","q":"Complete the contraction:","template":"Elle parle {0} enfants. (à + les)","gaps":[{"options":["aux","à les","des","au"],"answer":0}],"exp":"à + les = aux."},
  {"id":"fr-152","topic":"fr-num","type":"mcq","q":"« Il est trois heures et quart » = ","opts":["3:15","3:30","3:45","4:15"],"ans":0,"exp":"et quart = quarter past → 3:15."},
  {"id":"fr-153","topic":"fr-num","type":"mcq","q":"« cinq heures moins le quart » = ","opts":["5:15","5:45","4:45","4:15"],"ans":2,"exp":"moins le quart = quarter to → 4:45."},
  {"id":"fr-154","topic":"fr-num","type":"mcq","q":"« midi » means:","opts":["midnight","noon","morning","evening"],"ans":1,"exp":"midi = noon; minuit = midnight."},
  {"id":"fr-157","topic":"fr-num","type":"mcq","q":"14:30 in 24-hour French is:","opts":["deux heures trente","quatorze heures trente","quatre heures trente","quatorze et demie"],"ans":1,"exp":"quatorze heures trente = 14:30."},
  {"id":"fr-160","topic":"fr-vie","type":"mcq","q":"« L'addition, s'il vous plaît » asks for:","opts":["the menu","the bill","a waiter","the toilet"],"ans":1,"exp":"l'addition = the bill."},
  {"id":"fr-161","topic":"fr-vie","type":"mcq","q":"Polite way to order a coffee:","opts":["Donne un café","Je veux café","Je voudrais un café","Café maintenant"],"ans":2,"exp":"« Je voudrais » is the polite « I would like »."},
  {"id":"fr-162","topic":"fr-vie","type":"mcq","q":"« Où est la gare ? » asks:","opts":["What is the station?","Where is the station?","When is the train?","How much is the ticket?"],"ans":1,"exp":"Où = where: Where is the station?"},
  {"id":"fr-163","topic":"fr-vie","type":"mcq","q":"« Tournez à gauche » means:","opts":["Turn right","Turn left","Go straight","Stop here"],"ans":1,"exp":"à gauche = left; à droite = right."},
  {"id":"fr-164","topic":"fr-vie","type":"mcq","q":"« Je me lève à sept heures » describes:","opts":["a daily routine","the weather","a price","a place"],"ans":0,"exp":"se lever (reflexive) describes daily routine: I get up at seven."},
  {"id":"fr-165","topic":"fr-vie","type":"mcq","q":"« faire les courses » means:","opts":["to do sport","to go shopping (groceries)","to cook","to run"],"ans":1,"exp":"faire les courses = to do the (grocery) shopping."},
  {"id":"fr-166","topic":"fr-vie","type":"mcq","q":"« C'est combien ? » asks:","opts":["What is it?","How much is it?","Where is it?","Whose is it?"],"ans":1,"exp":"combien = how much: How much is it?"},
  {"id":"fr-167","topic":"fr-vie","type":"gapfill","q":"Complete the café order:","template":"Je {0} une salade, s'il vous plaît.","gaps":[{"options":["voudrais","veux","vais","suis"],"answer":0}],"exp":"Polite: je voudrais une salade."},
  {"id":"fr-168","topic":"fr-conj","type":"mcq","q":"« Nous ___ français. » (être)","opts":["sommes","êtes","sont","est"],"ans":0,"exp":"nous sommes."},
  {"id":"fr-169","topic":"fr-conj","type":"mcq","q":"« Vous ___ vos devoirs. » (faire)","opts":["faisons","faites","font","fais"],"ans":1,"exp":"vous faites (irregular)."},
  {"id":"fr-170","topic":"fr-conj","type":"mcq","q":"Past participle of « prendre »:","opts":["prendu","pris","prit","prené"],"ans":1,"exp":"prendre → pris."},
  {"id":"fr-171","topic":"fr-conj","type":"mcq","q":"« Elle ___ allée au marché. » (passé composé)","opts":["a","est","va","fait"],"ans":1,"exp":"aller uses être: elle est allée."},
  {"id":"fr-172","topic":"fr-conj","type":"mcq","q":"« Quand j'étais jeune, je ___ au foot. »","opts":["ai joué","jouais","jouerai","joue"],"ans":1,"exp":"Habit in the past → imparfait: je jouais."},
  {"id":"fr-173","topic":"fr-conj","type":"mcq","q":"Futur simple of « aller » for « je »:","opts":["allerai","irai","vais","allais"],"ans":1,"exp":"aller → ir-: j'irai."},
  {"id":"fr-174","topic":"fr-conj","type":"mcq","q":"« Si j'avais le temps, je ___ (voyager). »","opts":["voyage","voyagerai","voyagerais","voyageais"],"ans":2,"exp":"si + imparfait → conditionnel: je voyagerais."},
  {"id":"fr-175","topic":"fr-conj","type":"mcq","q":"« Il faut que tu ___ (être) là. »","opts":["es","sois","seras","étais"],"ans":1,"exp":"Subjonctif: que tu sois."},
  {"id":"fr-176","topic":"fr-conj","type":"mcq","q":"« Je me suis ___ tôt. » (se lever, féminin)","opts":["levé","levée","levés","lever"],"ans":1,"exp":"Pronominal + feminine subject → levée."},
  {"id":"fr-177","topic":"fr-conj","type":"gapfill","q":"Passé composé with avoir:","template":"Hier, j'{0} un bon film. (regarder)","gaps":[{"options":["ai regardé","suis regardé","regardais","regarde"],"answer":0}],"exp":"regarder uses avoir: j'ai regardé."},
  {"id":"fr-178","topic":"fr-conj","type":"gapfill","q":"Choose the correct future:","template":"Demain, nous {0} à la plage. (aller)","gaps":[{"options":["irons","allons","allions","irez"],"answer":0}],"exp":"Futur simple of aller: nous irons."},
  {"id":"fr-179","topic":"fr-conj","type":"dragdrop","q":"Match the subject to « avoir » (présent):","pairs":[{"left":"j'","right":"ai"},{"left":"tu","right":"as"},{"left":"nous","right":"avons"},{"left":"ils","right":"ont"}],"exp":"avoir: j'ai, tu as, il a, nous avons, vous avez, ils ont."},
  {"id":"fr-180","topic":"fr-conj","type":"dragdrop","q":"Match the verb to its auxiliary in the passé composé:","pairs":[{"left":"manger","right":"avoir"},{"left":"aller","right":"être"},{"left":"finir","right":"avoir"},{"left":"partir","right":"être"}],"exp":"Movement/state verbs (aller, partir) use être; most others use avoir."},
  {"id":"fr-181","topic":"fr-conj","type":"dragdrop","q":"Match subject to « être » (présent):","pairs":[{"left":"je","right":"suis"},{"left":"tu","right":"es"},{"left":"vous","right":"êtes"},{"left":"elles","right":"sont"}],"exp":"être: je suis, tu es, il est, nous sommes, vous êtes, ils sont."},
  {"id":"fr-182","topic":"fr-conj","type":"mcq","q":"Conditionnel of « vouloir » for politeness:","opts":["je veux","je voudrais","je voulais","je voudrai"],"ans":1,"exp":"je voudrais = I would like (polite)."},

  // ── Pronunciation & accents ──────────────────────────────────────────────────
  {"id":"fr-183","topic":"fr-gram","type":"mcq","q":"What sound does the accent aigu (é) represent?","opts":["Like \"ay\" in \"say\"","Like \"a\" in \"cat\"","Like \"ee\" in \"see\"","It is silent"],"ans":0,"exp":"é sounds like \"ay\": café, été, répéter."},
  {"id":"fr-184","topic":"fr-gram","type":"mcq","q":"The cédille (ç) always sounds like:","opts":["\"k\" (as in \"car\")","\"s\" (as in \"sun\")","\"sh\" (as in \"she\")","\"z\" (as in \"zoo\")"],"ans":1,"exp":"ç = s sound before a, o, u: garçon, leçon, français."},
  {"id":"fr-185","topic":"fr-gram","type":"mcq","q":"In \"naïve\", the tréma (¨) on the ï means:","opts":["The i is silent","Pronounce the a and i as separate syllables","Stress the syllable","The word is feminine"],"ans":1,"exp":"Tréma separates vowels that would otherwise combine: naïve = na-ïve, not \"nave\"."},
  {"id":"fr-186","topic":"fr-gram","type":"mcq","q":"\"Les enfants\" — what happens in spoken French?","opts":["The s in \"les\" is fully silent","The silent s of \"les\" links to the vowel: \"lez-enfants\"","The t in \"enfants\" is pronounced","All letters are silent"],"ans":1,"exp":"Liaison: a normally silent final consonant is pronounced before a vowel word. Les enfants → lez-enfants."},
  {"id":"fr-187","topic":"fr-gram","type":"mcq","q":"The French \"ou\" sound (in \"vous\", \"rouge\") rhymes with:","opts":["\"oo\" in \"boot\"","\"uh\" in \"but\"","\"u\" in \"cup\"","\"ow\" in \"now\""],"ans":0,"exp":"ou = \"oo\": vous, rouge, beaucoup, bouche."},
  {"id":"fr-188","topic":"fr-gram","type":"mcq","q":"The French \"u\" (in \"tu\", \"rue\") is unusual because:","opts":["It sounds exactly like English \"oo\"","You round your lips as for \"oo\" but say \"ee\" — no English equivalent","It is always silent","It sounds like \"uh\""],"ans":1,"exp":"French \"u\" has no English equivalent — round lips as if saying \"oo\", then say \"ee\": une, rue, tu."},
  {"id":"fr-189","topic":"fr-gram","type":"mcq","q":"In French, most final consonants are:","opts":["Always pronounced","Silent unless followed by a vowel-starting word (liaison)","Doubled before a vowel","Always stressed"],"ans":1,"exp":"Final consonants are usually silent: vous parlEZ, ils sontT — but can link before a vowel: vous_avez → vouz-avez."},
  {"id":"fr-190","topic":"fr-gram","type":"mcq","q":"Nasal vowels (un, in, on, an) are produced by:","opts":["Pressing the tongue to the roof of the mouth","Allowing air to flow through the nose as you speak","Doubling the vowel length","Closing the lips tightly"],"ans":1,"exp":"Nasal vowels involve nasal resonance — breathe through your nose as you say them. The n/m is not fully articulated."},
  {"id":"fr-191","topic":"fr-gram","type":"dragdrop","q":"Match each accent to an example word:","pairs":[{"left":"accent aigu","right":"café"},{"left":"accent grave","right":"père"},{"left":"cédille","right":"français"},{"left":"tréma","right":"naïf"}],"exp":"é = aigu (sounds like ay), è = grave (open e), ç = cédille (s sound), ï = tréma (separate vowels)."},
  {"id":"fr-192","topic":"fr-gram","type":"gapfill","q":"Both words contain a cédille. Complete the spelling:","template":"La le{0}on de fran{1}ais commence maintenant.","gaps":[{"options":["ç","c","ss","x"],"answer":0},{"options":["ç","c","ss","z"],"answer":0}],"exp":"leçon and français both use ç to give the 's' sound before o and a."},

  // ── Le corps et la santé ─────────────────────────────────────────────────────
  {"id":"fr-193","topic":"fr-vie","type":"mcq","q":"\"La tête\" means:","opts":["the arm","the head","the foot","the hand"],"ans":1,"exp":"la tête = the head."},
  {"id":"fr-194","topic":"fr-vie","type":"mcq","q":"\"J'ai mal à la gorge\" means:","opts":["I have a sore arm","I have a sore throat","I have a headache","I have a stomach ache"],"ans":1,"exp":"la gorge = the throat; j'ai mal à la gorge = I have a sore throat."},
  {"id":"fr-195","topic":"fr-vie","type":"mcq","q":"\"Le ventre\" refers to:","opts":["the chest","the stomach/belly","the back","the leg"],"ans":1,"exp":"le ventre = the stomach / belly / abdomen."},
  {"id":"fr-196","topic":"fr-vie","type":"gapfill","q":"My back hurts — use à + le:","template":"J'ai mal {0} dos.","gaps":[{"options":["au","à le","à la","du"],"answer":0}],"exp":"à + le = au: j'ai mal au dos."},
  {"id":"fr-197","topic":"fr-vie","type":"mcq","q":"\"Les yeux\" is the IRREGULAR plural of:","opts":["le nez","l'oeil","la tête","le bras"],"ans":1,"exp":"l'oeil (eye) → les yeux (eyes) — completely irregular plural."},
  {"id":"fr-198","topic":"fr-vie","type":"mcq","q":"At the pharmacy, \"j'ai de la fièvre\" means:","opts":["I have a cold","I have a fever","I have a cough","I feel dizzy"],"ans":1,"exp":"la fièvre = fever; j'ai de la fièvre = I have a fever."},
  {"id":"fr-199","topic":"fr-vie","type":"dragdrop","q":"Match the French body part to its English meaning:","pairs":[{"left":"la main","right":"hand"},{"left":"le genou","right":"knee"},{"left":"l'épaule","right":"shoulder"},{"left":"la cheville","right":"ankle"}],"exp":"la main = hand, le genou = knee, l'épaule = shoulder, la cheville = ankle."},
  {"id":"fr-200","topic":"fr-vie","type":"gapfill","q":"My teeth hurt — use à + les:","template":"J'ai mal {0} dents.","gaps":[{"options":["aux","à les","au","à la"],"answer":0}],"exp":"à + les = aux: j'ai mal aux dents."},
  {"id":"fr-201","topic":"fr-vie","type":"mcq","q":"\"Je tousse\" means:","opts":["I sneeze","I cough","I vomit","I faint"],"ans":1,"exp":"tousser = to cough; je tousse."},
  {"id":"fr-202","topic":"fr-vie","type":"mcq","q":"\"J'ai mal au coeur\" means:","opts":["I have heartburn","I feel sick / nauseous","I have chest pain","My heart is broken"],"ans":1,"exp":"avoir mal au coeur = to feel sick/nauseous (literally to have pain at the heart)."},
  {"id":"fr-203","topic":"fr-vie","type":"mcq","q":"\"Il faut prendre des médicaments\" means:","opts":["It is necessary to take medicine","You must see a doctor","Buy medicine at the pharmacy","Take a rest"],"ans":0,"exp":"il faut + infinitif = it is necessary to; des médicaments = medicine/tablets."},
  {"id":"fr-204","topic":"fr-vie","type":"gapfill","q":"Her stomach hurts:","template":"Elle a {0} au ventre.","gaps":[{"options":["mal","bien","froid","chaud"],"answer":0}],"exp":"avoir mal = to hurt/ache: elle a mal au ventre = her stomach hurts."},
  {"id":"fr-205","topic":"fr-vie","type":"mcq","q":"\"Les genoux\" is the plural of:","opts":["le genu","le genou","la genoue","le genoux"],"ans":1,"exp":"le genou → les genoux (add x for words ending in -ou such as genou, bijou, caillou)."},
  {"id":"fr-206","topic":"fr-vie","type":"scenario","setup":"You are at the doctor's surgery in Paris. The doctor asks you some questions.","parts":[{"q":"The doctor says \"Qu'est-ce qui ne va pas ?\" — what is she asking?","opts":["What is your name?","What is wrong with you?","Do you have insurance?","How old are you?"],"ans":1,"exp":"Qu'est-ce qui ne va pas ? = What is wrong? / What's the matter?"},{"q":"You want to say \"I have had a headache for three days.\" Which is correct?","opts":["J'ai mal à la tête depuis trois jours","J'ai de la fièvre depuis trois jours","J'ai mal à l'estomac depuis trois jours","Je suis fatigué depuis trois jours"],"ans":0,"exp":"j'ai mal à la tête = headache; depuis trois jours = for three days (ongoing → use depuis + present)."},{"q":"The doctor says \"Prenez ces comprimés trois fois par jour.\" What should you do?","opts":["Take these tablets once a day","Take these tablets three times a day","Take these tablets with every meal","Rest for three days"],"ans":1,"exp":"comprimés = tablets; trois fois par jour = three times a day."}],"exp":"At the doctor: Qu'est-ce qui ne va pas? → j'ai mal à... depuis... → prenez... par jour."},
  {"id":"fr-207","topic":"fr-vie","type":"mcq","q":"At the pharmacy, you say you have a cough. Which phrase is correct?","opts":["J'ai mal au dos","Je tousse beaucoup","J'ai de la fièvre","J'ai mal à la tête"],"ans":1,"exp":"tousser = to cough; je tousse beaucoup = I am coughing a lot."},

  // ── Les vêtements et le shopping ─────────────────────────────────────────────
  {"id":"fr-208","topic":"fr-vie","type":"mcq","q":"\"Un manteau\" is:","opts":["a hat","a coat","a scarf","a pair of trousers"],"ans":1,"exp":"un manteau = a coat."},
  {"id":"fr-209","topic":"fr-vie","type":"mcq","q":"\"Je porte une robe\" means:","opts":["I am wearing a dress","I am wearing a skirt","I am wearing a jacket","I am wearing trousers"],"ans":0,"exp":"une robe = a dress; porter = to wear."},
  {"id":"fr-210","topic":"fr-vie","type":"mcq","q":"False friend: \"une librairie\" is:","opts":["a library","a bookshop","a clothes shop","a pharmacy"],"ans":1,"exp":"une librairie = a bookshop. une bibliothèque = a library."},
  {"id":"fr-211","topic":"fr-vie","type":"mcq","q":"How do you ask for a size in French?","opts":["Quelle est votre taille ?","C'est combien ?","Vous avez cela en rouge ?","Je voudrais l'essayer"],"ans":0,"exp":"Quelle est votre taille ? / Quelle taille faites-vous ? = What is your size?"},
  {"id":"fr-212","topic":"fr-vie","type":"mcq","q":"\"Je voudrais l'essayer\" means:","opts":["I would like to buy it","I would like to try it on","I would like a refund","I would like to pay by card"],"ans":1,"exp":"essayer = to try on; je voudrais l'essayer = I would like to try it on."},
  {"id":"fr-213","topic":"fr-vie","type":"mcq","q":"\"Une boulangerie\" sells:","opts":["meat","bread and pastries","vegetables","clothes"],"ans":1,"exp":"une boulangerie = a bakery (bread, croissants, baguettes)."},
  {"id":"fr-214","topic":"fr-vie","type":"dragdrop","q":"Match the clothing item to its English meaning:","pairs":[{"left":"le pull","right":"jumper / sweater"},{"left":"le pantalon","right":"trousers"},{"left":"les chaussures","right":"shoes"},{"left":"la veste","right":"jacket"}],"exp":"pull = jumper, pantalon = trousers, chaussures = shoes, veste = jacket."},
  {"id":"fr-215","topic":"fr-vie","type":"gapfill","q":"Complete the polite shop request:","template":"Je {0} ce pantalon en taille 40, s'il vous plaît.","gaps":[{"options":["voudrais","veux","dois","peux"],"answer":0}],"exp":"je voudrais = I would like (polite conditional — always use in shops)."},
  {"id":"fr-216","topic":"fr-vie","type":"mcq","q":"\"Je paie par carte\" means:","opts":["I am paying in cash","I am paying by card","I am paying by cheque","I cannot pay"],"ans":1,"exp":"payer par carte = to pay by card; en espèces = in cash."},
  {"id":"fr-217","topic":"fr-vie","type":"mcq","q":"\"C'est trop cher\" means:","opts":["It is very cheap","It is too expensive","It is on sale","It is the right size"],"ans":1,"exp":"trop = too (much); cher = expensive: it is too expensive."},
  {"id":"fr-218","topic":"fr-vie","type":"gapfill","q":"Ask if they have this item in red:","template":"Vous avez {0} en rouge ?","gaps":[{"options":["ça","ici","bien","là"],"answer":0}],"exp":"ça = this/that (informal demonstrative): Vous avez ça en rouge ? = Do you have this in red?"},
  {"id":"fr-219","topic":"fr-vie","type":"mcq","q":"\"Les soldes\" refers to:","opts":["the receipts","the sales","the prices","the stock"],"ans":1,"exp":"les soldes = the sales (seasonal sales); en solde = on sale / reduced."},
  {"id":"fr-220","topic":"fr-vie","type":"mcq","q":"\"Une épicerie\" is:","opts":["a pharmacy","a grocery shop","a department store","a bakery"],"ans":1,"exp":"une épicerie = a grocery shop / corner shop."},
  {"id":"fr-221","topic":"fr-vie","type":"scenario","setup":"You are shopping in a French clothes shop.","parts":[{"q":"The assistant says \"Je peux vous aider ?\" — what is she offering?","opts":["Can I help you?","What size are you?","We have a sale today","The changing rooms are upstairs"],"ans":0,"exp":"Je peux vous aider ? = Can I help you? (May I help you?)"},{"q":"You want to ask \"Do you have this shirt in a size 38?\" Which is best?","opts":["Vous avez cette chemise en taille 38 ?","Je voudrais une chemise taille 38","C'est combien cette chemise ?","Je l'essaie en 38"],"ans":0,"exp":"Vous avez + item + en taille + number ? = Do you have...in size...?"},{"q":"The price tag says \"30 % de réduction\". What does this mean?","opts":["30 % extra charge","30 % discount","Only 30 items in stock","Fixed price of 30 €"],"ans":1,"exp":"réduction = reduction / discount; 30 % de réduction = 30 % off."}],"exp":"Shopping: Je peux vous aider? → Vous avez...en taille...? → réduction = discount."},
  {"id":"fr-222","topic":"fr-vie","type":"mcq","q":"In a shop, \"la cabine d'essayage\" is:","opts":["the checkout","the changing / fitting room","the display window","the stockroom"],"ans":1,"exp":"la cabine d'essayage = the changing room / fitting room."},

  // ── Le travail et la vie professionnelle ─────────────────────────────────────
  {"id":"fr-223","topic":"fr-vie","type":"mcq","q":"\"Je suis médecin\" — why is there no article before médecin?","opts":["Because médecin is masculine","Because être + profession omits the article","Because it is in the plural","Because it is an irregular verb"],"ans":1,"exp":"être + profession takes NO article: je suis médecin (not *je suis un médecin)."},
  {"id":"fr-224","topic":"fr-vie","type":"mcq","q":"What is the feminine form of \"un acteur\"?","opts":["une acteure","une actrice","une acteur","une acteurse"],"ans":1,"exp":"acteur → actrice (irregular feminine, like directeur → directrice)."},
  {"id":"fr-225","topic":"fr-vie","type":"mcq","q":"\"Je travaille à temps plein\" means:","opts":["I work part-time","I work full-time","I work from home","I am self-employed"],"ans":1,"exp":"à temps plein = full-time; à temps partiel = part-time."},
  {"id":"fr-226","topic":"fr-vie","type":"mcq","q":"\"Un(e) infirmier / infirmière\" is:","opts":["a doctor","a nurse","a pharmacist","a surgeon"],"ans":1,"exp":"un infirmier / une infirmière = a nurse."},
  {"id":"fr-227","topic":"fr-vie","type":"mcq","q":"\"Je suis à mon compte\" means:","opts":["I have a bank account","I am self-employed","I am unemployed","I work for an agency"],"ans":1,"exp":"être à son compte = to be self-employed / freelance."},
  {"id":"fr-228","topic":"fr-vie","type":"dragdrop","q":"Match the masculine profession to its feminine form:","pairs":[{"left":"un boulanger","right":"une boulangère"},{"left":"un vendeur","right":"une vendeuse"},{"left":"un directeur","right":"une directrice"},{"left":"un avocat","right":"une avocate"}],"exp":"boulanger/boulangère, vendeur/vendeuse (irregular), directeur/directrice, avocat/avocate."},
  {"id":"fr-229","topic":"fr-vie","type":"mcq","q":"\"Mon bureau se trouve au deuxième étage\" means:","opts":["My desk is on the ground floor","My office is on the second floor","My office is in the basement","My desk is at reception"],"ans":1,"exp":"bureau = office / desk; deuxième étage = second floor (in France: rez-de-chaussée = ground, 1er étage = 1st, 2e étage = 2nd)."},
  {"id":"fr-230","topic":"fr-vie","type":"mcq","q":"\"J'ai un entretien d'embauche\" means:","opts":["I have a team meeting","I have a job interview","I have a salary review","I am starting a new job"],"ans":1,"exp":"un entretien d'embauche = a job interview."},
  {"id":"fr-231","topic":"fr-vie","type":"gapfill","q":"Complete — profession needs no article:","template":"Ma soeur {0} avocate.","gaps":[{"options":["est","a","fait","va"],"answer":0}],"exp":"être + profession (no article): elle est avocate."},
  {"id":"fr-232","topic":"fr-vie","type":"mcq","q":"\"Le salaire\" means:","opts":["the salary","the holiday","the contract","the office"],"ans":0,"exp":"le salaire = the salary / wages."},
  {"id":"fr-233","topic":"fr-vie","type":"mcq","q":"\"Je suis en congé\" means:","opts":["I am at work","I am on leave / holiday","I am in a meeting","I am late"],"ans":1,"exp":"être en congé = to be on leave (annual leave, sick leave, etc.)."},
  {"id":"fr-234","topic":"fr-vie","type":"scenario","setup":"You are at a job interview at a French company.","parts":[{"q":"The interviewer says \"Parlez-moi de votre expérience.\" What is she asking?","opts":["Tell me about your salary expectations","Tell me about your experience","Where did you study?","What are your weaknesses?"],"ans":1,"exp":"Parlez-moi de... = Tell me about...; votre expérience = your experience."},{"q":"You want to say \"I have been working in a shop for two years.\" Which is correct?","opts":["J'ai travaillé dans un magasin pendant deux ans","Je travaille dans un magasin depuis deux ans","J'ai travaillé dans un magasin pour deux ans","Je travaillais dans un magasin il y a deux ans"],"ans":1,"exp":"An ongoing situation starting in the past uses depuis + present tense: je travaille depuis deux ans."},{"q":"\"Quels sont vos points forts ?\" asks about your:","opts":["salary expectations","weaknesses","strengths","references"],"ans":2,"exp":"points forts = strengths (literally strong points); points faibles = weaknesses."}],"exp":"Interview: votre expérience, depuis + présent, points forts/faibles."},
  {"id":"fr-235","topic":"fr-vie","type":"mcq","q":"False friend: \"un stage\" in a professional context means:","opts":["a stage performance","a work placement / internship","a pay rise","a promotion"],"ans":1,"exp":"un stage = a work placement or internship (NOT a theatre stage — that is une scène)."},
  {"id":"fr-236","topic":"fr-vie","type":"gapfill","q":"Complete the sentence:","template":"Je {0} ingénieur depuis cinq ans.","gaps":[{"options":["suis","ai","fais","travaille"],"answer":0}],"exp":"être + profession: je suis ingénieur; depuis cinq ans = for five years (ongoing)."},
  {"id":"fr-237","topic":"fr-vie","type":"mcq","q":"The feminine of \"un infirmier\" is:","opts":["une infirmière","une infirmieuse","une infirmiere","une infirmiersse"],"ans":0,"exp":"un infirmier → une infirmière (add accent and -e; the -r becomes clearly pronounced)."},

  // ── Grammaire avancée : COD / COI / y / en / subjonctif ─────────────────────
  {"id":"fr-238","topic":"fr-gram","type":"mcq","q":"\"Je le vois\" — what is \"le\"?","opts":["Direct object pronoun (COD)","Indirect object pronoun (COI)","Reflexive pronoun","Subject pronoun"],"ans":0,"exp":"le / la / les are direct object pronouns (COD): je le vois = I see him/it."},
  {"id":"fr-239","topic":"fr-gram","type":"mcq","q":"\"Je lui parle\" — what is \"lui\"?","opts":["Direct object pronoun","Indirect object pronoun (COI)","Reflexive pronoun","Emphatic pronoun"],"ans":1,"exp":"lui / leur are indirect object pronouns (COI): je lui parle = I speak to him/her."},
  {"id":"fr-240","topic":"fr-gram","type":"mcq","q":"Where does a COD/COI pronoun go in a French sentence?","opts":["After the verb","Before the conjugated verb (or before the auxiliary in compound tenses)","At the end of the sentence","At the very start of the sentence"],"ans":1,"exp":"Object pronouns precede the verb: je le vois. In compound tenses: je l'ai vu."},
  {"id":"fr-241","topic":"fr-gram","type":"mcq","q":"\"J'y vais\" — \"y\" replaces:","opts":["a person","a place or à + thing","a quantity","a direct object person"],"ans":1,"exp":"y replaces a location or à + thing: je vais à Paris → j'y vais."},
  {"id":"fr-242","topic":"fr-gram","type":"mcq","q":"\"J'en veux\" — \"en\" replaces:","opts":["à + noun","de + noun or a quantity expression","a direct object person","a place"],"ans":1,"exp":"en replaces de + noun or a quantity: je veux du café → j'en veux."},
  {"id":"fr-243","topic":"fr-gram","type":"gapfill","q":"Replace the direct object (Marie, feminine):","template":"Tu vois Marie ? — Oui, je {0} vois chaque jour.","gaps":[{"options":["la","le","lui","les"],"answer":0}],"exp":"Marie is feminine direct object (COD) → la: je la vois chaque jour."},
  {"id":"fr-244","topic":"fr-gram","type":"gapfill","q":"Replace the indirect object (ton frère):","template":"Tu parles à ton frère ? — Oui, je {0} parle souvent.","gaps":[{"options":["lui","le","la","y"],"answer":0}],"exp":"parler à quelqu'un → COI: lui (singular him/her): je lui parle souvent."},
  {"id":"fr-245","topic":"fr-gram","type":"mcq","q":"\"Il en a trois\" — what does \"en\" refer to?","opts":["He has three friends","He has three of them (some previously mentioned thing)","He goes there three times","He has been three times"],"ans":1,"exp":"en replaces de + noun or a quantity: \"il en a trois\" = he has three of them."},
  {"id":"fr-246","topic":"fr-gram","type":"mcq","q":"\"Je ne le vois plus\" — what does ne...plus mean?","opts":["I don't see him often","I don't see him any more","I have never seen him","I rarely see him"],"ans":1,"exp":"ne...plus = no longer / not any more (completed action stopped)."},
  {"id":"fr-247","topic":"fr-gram","type":"mcq","q":"\"Bien que je sois fatigué, je travaille\" — \"sois\" is in the:","opts":["présent indicatif","subjonctif","conditionnel","imparfait"],"ans":1,"exp":"bien que (although) is one of several conjunctions that trigger the subjonctif: bien que je sois."},
  {"id":"fr-248","topic":"fr-gram","type":"gapfill","q":"Choose the correct relative pronoun:","template":"C'est le livre {0} je t'ai parlé.","gaps":[{"options":["dont","que","qui","où"],"answer":0}],"exp":"parler de quelque chose → dont: c'est le livre dont je t'ai parlé = the book I told you about."},
  {"id":"fr-249","topic":"fr-gram","type":"mcq","q":"\"Si j'avais su, je ne serais pas venu\" — this expresses:","opts":["A future condition","A past hypothetical (unreal condition in the past)","A habit in the past","A polite request"],"ans":1,"exp":"si + plus-que-parfait → conditionnel passé = unreal past condition: If I had known, I wouldn't have come."},
  {"id":"fr-250","topic":"fr-gram","type":"dragdrop","q":"Match each pronoun to what it replaces:","pairs":[{"left":"le / la / les","right":"direct object (COD)"},{"left":"lui / leur","right":"indirect object (COI: à + person)"},{"left":"y","right":"place or à + thing"},{"left":"en","right":"de + noun or quantity"}],"exp":"COD = le/la/les, COI = lui/leur, place/à+thing = y, de+noun/quantity = en."},
  {"id":"fr-251","topic":"fr-gram","type":"mcq","q":"\"Lequel\" is used to mean:","opts":["who (subject)","which one (replacing a masculine noun already mentioned)","that (direct object)","whose"],"ans":1,"exp":"lequel / laquelle / lesquels / lesquelles = which one(s) — refers back to a noun already mentioned."},
  {"id":"fr-252","topic":"fr-gram","type":"scenario","setup":"Sophie tells her friend about a birthday present she bought.","parts":[{"q":"\"Je lui ai acheté un livre.\" — to WHOM did Sophie buy the book?","opts":["To herself","To her friend (indirect object — lui)","To the bookshop owner","To them (plural)"],"ans":1,"exp":"lui = COI (indirect object): to him/her. Plural would be leur."},{"q":"Sophie says \"Je l'ai emballé hier.\" What did she wrap?","opts":["The book (l' = le = direct object)","Her friend","A present box","A birthday card"],"ans":0,"exp":"l' = le before a vowel (COD, masculine): refers to the book."},{"q":"\"Elle y est allée pour l'acheter.\" Where did she go?","opts":["To the library","To a place already mentioned (the bookshop)","To her friend's house","Online"],"ans":1,"exp":"y replaces the previously mentioned location (the bookshop — la librairie)."}],"exp":"lui (COI), l' = le (COD), y (place pronoun)."},

  // ── Les transports et la vie quotidienne ─────────────────────────────────────
  {"id":"fr-253","topic":"fr-vie","type":"mcq","q":"\"Je prends le métro\" — how are you travelling?","opts":["by bus","by underground / metro","by train","by bike"],"ans":1,"exp":"le métro = the underground / subway."},
  {"id":"fr-254","topic":"fr-vie","type":"mcq","q":"\"À vélo\" means travelling:","opts":["by car","by bus","by bike","on foot"],"ans":2,"exp":"à vélo = by bike; à pied = on foot."},
  {"id":"fr-255","topic":"fr-vie","type":"mcq","q":"\"Tournez à droite au feu\" — what should you do at the traffic lights?","opts":["Turn left at the lights","Turn right at the lights","Go straight at the lights","Stop at the lights"],"ans":1,"exp":"à droite = right; au feu (rouge) = at the traffic lights."},
  {"id":"fr-256","topic":"fr-vie","type":"gapfill","q":"Choose en or à for transport in a vehicle:","template":"Je vais au travail {0} voiture.","gaps":[{"options":["en","à","par","avec"],"answer":0}],"exp":"Enclosed vehicle → en: en voiture, en bus, en train. Non-enclosed → à: à vélo, à pied."},
  {"id":"fr-257","topic":"fr-vie","type":"mcq","q":"\"Prenez la deuxième rue à gauche\" means:","opts":["Take the first road on the left","Take the second road on the left","Take the second road on the right","Go straight for two streets"],"ans":1,"exp":"deuxième = second; à gauche = on the left."},
  {"id":"fr-258","topic":"fr-vie","type":"mcq","q":"\"C'est à dix minutes à pied\" means:","opts":["It is ten minutes by car","It is ten minutes on foot","It is ten kilometres away","It takes ten minutes by bus"],"ans":1,"exp":"à pied = on foot; à dix minutes à pied = ten minutes' walk."},
  {"id":"fr-259","topic":"fr-vie","type":"scenario","setup":"You are lost in a French town and ask a passer-by for directions to the station (la gare).","parts":[{"q":"How do you politely ask where the station is?","opts":["Excusez-moi, où est la gare ?","Où est le cinéma ?","C'est loin d'ici ?","Avez-vous un plan ?"],"ans":0,"exp":"Excusez-moi, où est la gare ? = Excuse me, where is the station?"},{"q":"The passer-by says \"Continuez tout droit, puis tournez à gauche.\" What do you do FIRST?","opts":["Turn left","Continue straight on","Turn right","Go back the way you came"],"ans":1,"exp":"tout droit = straight on; puis = then; tournez à gauche = turn left. So: go straight first, THEN turn left."},{"q":"They add \"C'est à cinq minutes à pied.\" How far away is the station?","opts":["5 km away","5 minutes by car","5 minutes on foot","5 bus stops away"],"ans":2,"exp":"à pied = on foot; à cinq minutes à pied = five minutes' walk."}],"exp":"Directions: Excusez-moi, où est...? → tout droit puis tournez... → à pied."},
  {"id":"fr-260","topic":"fr-vie","type":"mcq","q":"False friend: \"le car\" in French is:","opts":["a car (automobile)","a coach / long-distance bus","a taxi","a tram"],"ans":1,"exp":"le car = a coach / long-distance bus. la voiture = a car."},
  {"id":"fr-261","topic":"fr-vie","type":"gapfill","q":"Buy a return ticket at the station:","template":"Je voudrais {0} billet aller-retour pour Lyon.","gaps":[{"options":["un","une","des","le"],"answer":0}],"exp":"un billet (masculine) = a ticket; aller-retour = return; aller simple = single."},
  {"id":"fr-262","topic":"fr-vie","type":"mcq","q":"\"Le prochain train part à quelle heure ?\" asks:","opts":["the price of the next train","when the next train departs","where the next train goes","how long the journey takes"],"ans":1,"exp":"partir = to depart; à quelle heure = at what time: When does the next train depart?"},

  // ── Chez le médecin — doctor / pharmacy vocab (fr-l41) ───────────────────────
  {"id":"fr-263","topic":"fr-vie","type":"mcq","q":"\"J'éternue\" means:","opts":["I am coughing","I am sneezing","I feel dizzy","I am vomiting"],"ans":1,"exp":"éternuer = to sneeze; j'éternue = I am sneezing. (Je tousse = I am coughing.)"},
  {"id":"fr-264","topic":"fr-vie","type":"mcq","q":"\"Je me sens mal\" means:","opts":["I feel great","I am very ill","I don't feel well","I am cold"],"ans":2,"exp":"se sentir = to feel; je me sens mal = I don't feel well / I feel unwell. (Je suis malade = I am ill.)"},
  {"id":"fr-265","topic":"fr-vie","type":"mcq","q":"\"Une ordonnance\" is:","opts":["a medicine","a prescription","a pharmacy","a medical certificate"],"ans":1,"exp":"une ordonnance = a prescription — the document a doctor writes so you can collect medication at the pharmacy."},
  {"id":"fr-266","topic":"fr-vie","type":"gapfill","q":"Complete: I need a prescription.","template":"Il me {0} une ordonnance.","gaps":[{"options":["faut","fais","suis","ai"],"answer":0}],"exp":"il me faut = I need (literally 'it is necessary for me'); une ordonnance = a prescription."},
  {"id":"fr-267","topic":"fr-vie","type":"mcq","q":"At the pharmacy, \"des comprimés\" are:","opts":["syrups","creams","tablets / pills","injections"],"ans":2,"exp":"des comprimés = tablets / pills. (du sirop = syrup; une crème = a cream.)"},
  {"id":"fr-268","topic":"fr-vie","type":"mcq","q":"\"Le pharmacien / la pharmacienne\" is:","opts":["a doctor","a nurse","a pharmacist","a surgeon"],"ans":2,"exp":"le pharmacien / la pharmacienne = the pharmacist. In France, pharmacists can advise on minor ailments without a doctor's appointment."},
  {"id":"fr-269","topic":"fr-vie","type":"dragdrop","q":"Match each pharmacy item to its English meaning:","pairs":[{"left":"un médicament","right":"a medicine / medication"},{"left":"des comprimés","right":"tablets / pills"},{"left":"du sirop","right":"syrup"},{"left":"une crème","right":"a cream"}],"exp":"médicament = medicine, comprimés = tablets/pills, sirop = syrup, crème = cream."},
  {"id":"fr-270","topic":"fr-vie","type":"scenario","setup":"You feel unwell and visit a pharmacy in France.","parts":[{"q":"You want to say you don't feel well. Which phrase is correct?","opts":["Je suis en bonne santé.","Je me sens mal.","J'ai faim.","Je suis fatigué(e)."],"ans":1,"exp":"Je me sens mal = I don't feel well / I feel unwell."},{"q":"The pharmacist asks what is wrong. You have a fever and a cough. Which answer covers BOTH symptoms?","opts":["J'ai mal au dos et aux dents.","J'ai de la fièvre et je tousse.","Je suis allergique au soleil.","J'ai mal à la gorge seulement."],"ans":1,"exp":"J'ai de la fièvre (I have a fever) et je tousse (I am coughing) — both symptoms from the lesson."},{"q":"The pharmacist recommends tablets. What is the French word you expect to hear?","opts":["une crème","du sirop","des comprimés","une ordonnance"],"ans":2,"exp":"des comprimés = tablets/pills. (une ordonnance = a prescription, issued by a doctor not a pharmacist.)"}],"exp":"At the pharmacy: je me sens mal → j'ai de la fièvre et je tousse → des comprimés."},

  // ── Le pluriel des noms (fr-l05) — A1 ────────────────────────────────────────
  {"id":"fr-271","topic":"fr-gram","type":"mcq","q":"Plural of « un bateau » (boat):","opts":["des bateau","des bateus","des bateaux","des bateauxs"],"ans":2,"exp":"Words ending in -eau take -eaux in the plural: un bateau → des bateaux."},
  {"id":"fr-272","topic":"fr-gram","type":"mcq","q":"Plural of « un animal »:","opts":["des animals","des animaux","des animales","des animeaux"],"ans":1,"exp":"Words ending in -al take -aux in the plural: un animal → des animaux."},
  {"id":"fr-273","topic":"fr-gram","type":"mcq","q":"Plural of « un jeu » (game):","opts":["des jeus","des jeues","des jeux","des jeuxs"],"ans":2,"exp":"Words ending in -eu take -eux in the plural: un jeu → des jeux."},
  {"id":"fr-274","topic":"fr-gram","type":"gapfill","q":"She's wearing two hats (chapeau):","template":"Elle porte deux {0}.","gaps":[{"options":["chapeaux","chapeaus","chapeau","chapeausx"],"answer":0}],"exp":"chapeau follows the -eau → -eaux rule: un chapeau → des chapeaux."},
  {"id":"fr-275","topic":"fr-gram","type":"mcq","q":"Which word already ends in -x and does NOT change in the plural?","opts":["un chat","un livre","une voix","un bateau"],"ans":2,"exp":"Words already ending in -s, -x or -z stay the same in the plural: une voix → des voix."},
  {"id":"fr-276","topic":"fr-gram","type":"dragdrop","q":"Match each noun to its correct plural:","pairs":[{"left":"un bateau","right":"des bateaux"},{"left":"un animal","right":"des animaux"},{"left":"un jeu","right":"des jeux"},{"left":"un bijou","right":"des bijoux"}],"exp":"-eau→-eaux (bateau), -al→-aux (animal), -eu→-eux (jeu), -ou→-oux (bijou — one of 7 nouns)."},

  // ── La négation et les questions (fr-l10) — A1 ───────────────────────────────
  {"id":"fr-277","topic":"fr-gram","type":"mcq","q":"« Je ne comprends rien » means:","opts":["I don't understand anything","I understand a little","I understand everything","I never understand"],"ans":0,"exp":"ne … rien = not … anything / nothing: je ne comprends rien = I don't understand anything."},
  {"id":"fr-278","topic":"fr-gram","type":"mcq","q":"« Il ne mange jamais de viande » means:","opts":["He hardly ever eats meat","He never eats meat","He no longer eats meat","He doesn't eat meat right now"],"ans":1,"exp":"ne … jamais = never: il ne mange jamais de viande = he never eats meat."},
  {"id":"fr-279","topic":"fr-gram","type":"gapfill","q":"She doesn't live here any more:","template":"Elle n'habite {0} ici.","gaps":[{"options":["plus","jamais","rien","personne"],"answer":0}],"exp":"ne … plus = no longer / not any more: elle n'habite plus ici."},
  {"id":"fr-280","topic":"fr-gram","type":"mcq","q":"Which phrase introduces a yes/no question politely?","opts":["Qu'est-ce que…","Où est-ce que…","Est-ce que…","Qu'est-ce qui…"],"ans":2,"exp":"Est-ce que… turns any statement into a yes/no question: Est-ce que tu viens ? = Are you coming?"},
  {"id":"fr-281","topic":"fr-gram","type":"gapfill","q":"What do you want? (use qu'est-ce que):","template":"{0} tu veux ?","gaps":[{"options":["Qu'est-ce que","Est-ce que","Qu'est-ce qui","Qui est-ce que"],"answer":0}],"exp":"Qu'est-ce que = what (direct object): Qu'est-ce que tu veux ? = What do you want?"},

  // ── Les adjectifs (fr-l12) — A1 ──────────────────────────────────────────────
  {"id":"fr-282","topic":"fr-gram","type":"mcq","q":"Choose the correct form: « une maison ___ » (grand):","opts":["grand","grands","grande","grandes"],"ans":2,"exp":"Adjectives must agree in gender and number: 'maison' is feminine singular → grande (add -e)."},
  {"id":"fr-283","topic":"fr-gram","type":"mcq","q":"BAGS adjectives go ___ the noun:","opts":["after","before","either side of","at the start of the sentence"],"ans":1,"exp":"BAGS = Beauty, Age, Goodness, Size. These short common adjectives precede the noun: un beau jardin, une bonne idée."},
  {"id":"fr-284","topic":"fr-gram","type":"mcq","q":"Which sentence places the adjective correctly?","opts":["un intéressant film","une gentille fille","une bleue robe","un grand moderne appartement"],"ans":1,"exp":"'gentil(le)' is a BAGS adjective (Goodness) and goes BEFORE the noun: une gentille fille. Adjectives like bleu or intéressant go AFTER the noun."},
  {"id":"fr-285","topic":"fr-gram","type":"gapfill","q":"They (m. plural) are tall:","template":"Ils sont {0}.","gaps":[{"options":["grands","grand","grandes","grande"],"answer":0}],"exp":"Masculine plural adjective: add -s → grands. (grande = f. sing., grandes = f. pl.)"},
  {"id":"fr-286","topic":"fr-gram","type":"dragdrop","q":"Match each adjective to its correct feminine form:","pairs":[{"left":"grand","right":"grande"},{"left":"petit","right":"petite"},{"left":"beau","right":"belle"},{"left":"nouveau","right":"nouvelle"}],"exp":"Regular -e added: grand→grande, petit→petite. Irregular: beau→belle, nouveau→nouvelle."},

  // ── Aller et faire (fr-l14) — A1 ─────────────────────────────────────────────
  {"id":"fr-287","topic":"fr-conj","type":"mcq","q":"Conjugate « aller »: ils/elles ___:","opts":["allez","allons","vais","vont"],"ans":3,"exp":"aller: je vais, tu vas, il/elle va, nous allons, vous allez, ils/elles vont."},
  {"id":"fr-288","topic":"fr-conj","type":"gapfill","q":"We do sport on Saturdays:","template":"Nous {0} du sport le samedi.","gaps":[{"options":["faisons","faisez","font","faites"],"answer":0}],"exp":"faire: je fais, tu fais, il fait, nous faisons, vous faites, ils font."},
  {"id":"fr-289","topic":"fr-gram","type":"mcq","q":"« aller + à + le » contracts to:","opts":["à le","al","au","à du"],"ans":2,"exp":"à + le = au: je vais au cinéma. à + la stays as à la: je vais à la piscine."},
  {"id":"fr-290","topic":"fr-conj","type":"mcq","q":"Conjugate « faire »: vous ___:","opts":["faisez","faites","font","faisons"],"ans":1,"exp":"faire: vous faites (irregular — not *faisez*). Compare nous faisons."},

  // ── Passé composé avec avoir (fr-l18) — A2 ───────────────────────────────────
  {"id":"fr-291","topic":"fr-conj","type":"mcq","q":"Past participle of « finir »:","opts":["finu","fini","finé","fin"],"ans":1,"exp":"-IR verbs form the past participle with -i: finir → fini."},
  {"id":"fr-292","topic":"fr-conj","type":"mcq","q":"Past participle of « vendre »:","opts":["vendu","vendé","vendi","vendré"],"ans":0,"exp":"-RE verbs form the past participle with -u: vendre → vendu."},
  {"id":"fr-293","topic":"fr-conj","type":"gapfill","q":"He watched a film (passé composé):","template":"Il {0} regardé un film.","gaps":[{"options":["a","est","as","ont"],"answer":0}],"exp":"Most verbs use avoir as auxiliary: il a regardé. (il + a = has/did watch)"},
  {"id":"fr-294","topic":"fr-conj","type":"mcq","q":"Irregular past participle of « faire »:","opts":["faisé","fairé","fait","faistu"],"ans":2,"exp":"faire → fait (irregular). Other key irregulars: avoir→eu, être→été, voir→vu, prendre→pris."},

  // ── Passé composé avec être (fr-l19) — A2 ────────────────────────────────────
  {"id":"fr-295","topic":"fr-conj","type":"mcq","q":"With être verbs, the past participle must agree with:","opts":["the auxiliary verb","the direct object","the subject","the indirect object"],"ans":2,"exp":"With être auxiliary, the past participle agrees with the SUBJECT: il est allé / elle est allée / ils sont allés."},
  {"id":"fr-296","topic":"fr-conj","type":"mcq","q":"She went (passé composé of aller):","opts":["elle a allé","elle est allé","elle est allée","elle a allée"],"ans":2,"exp":"aller takes être: elle est allée — auxiliary être + past participle allé with feminine agreement (-e)."},
  {"id":"fr-297","topic":"fr-conj","type":"mcq","q":"Which verb uses ÊTRE (not avoir) in the passé composé?","opts":["regarder","finir","partir","acheter"],"ans":2,"exp":"partir is a DR MRS VANDERTRAMP verb and takes être: il est parti. The others use avoir."},
  {"id":"fr-298","topic":"fr-conj","type":"gapfill","q":"They (m.) left early:","template":"Ils {0} partis tôt.","gaps":[{"options":["sont","ont","est","a"],"answer":0}],"exp":"partir takes être: ils sont partis (+ -s for masculine plural subject agreement)."},

  // ── Imparfait ou passé composé ? (fr-l21) — A2 ───────────────────────────────
  {"id":"fr-299","topic":"fr-gram","type":"mcq","q":"The signal word « soudain » (suddenly) typically triggers:","opts":["imparfait","passé composé","futur proche","subjonctif"],"ans":1,"exp":"'Soudain' introduces a specific, completed event → passé composé. Ongoing background/habits → imparfait."},
  {"id":"fr-300","topic":"fr-gram","type":"mcq","q":"The phrase « d'habitude » (usually) signals:","opts":["passé composé","imparfait","futur proche","conditionnel"],"ans":1,"exp":"d'habitude / souvent / toujours / tous les jours signal habitual or repeated actions → imparfait."},
  {"id":"fr-301","topic":"fr-gram","type":"mcq","q":"« Je dormais quand le téléphone a sonné. » — « dormais » is imparfait because:","opts":["it happened once and is complete","it was the background state, interrupted by the phone","it is a habitual action","it is in the future"],"ans":1,"exp":"dormais (imparfait) = was sleeping — ongoing background action. a sonné (PC) = the single event that interrupted it."},

  // ── Comparatif et superlatif (fr-l25) — A2 ───────────────────────────────────
  {"id":"fr-302","topic":"fr-gram","type":"mcq","q":"« C'est le meilleur restaurant de la ville » means:","opts":["It is a good restaurant in the city","It is the best restaurant in town","It is a better restaurant than in town","It is the most expensive in town"],"ans":1,"exp":"le meilleur = the best (superlative of bon). 'de' after a superlative = 'in': le meilleur de la ville = the best in town."},
  {"id":"fr-303","topic":"fr-gram","type":"mcq","q":"« aussi intelligent que » expresses:","opts":["superiority (smarter than)","inferiority (less smart than)","equality (as smart as)","approximation"],"ans":2,"exp":"aussi … que = as … as (equality). plus … que = more/smarter than; moins … que = less … than."},
  {"id":"fr-304","topic":"fr-gram","type":"gapfill","q":"This is the tallest building in Paris (m.):","template":"C'est {0} plus grand bâtiment de Paris.","gaps":[{"options":["le","la","les","l'"],"answer":0}],"exp":"Masculine singular noun → le plus grand. (la plus grande f., les plus grands m. pl.)"},
  {"id":"fr-305","topic":"fr-gram","type":"mcq","q":"The comparative of « bon » (good) is:","opts":["plus bon","meilleur","mieux","plus bien"],"ans":1,"exp":"bon → meilleur (better) / le meilleur (the best). Never say *plus bon*. Note: bien (adverb) → mieux."},

  // ── Exprimer son opinion (fr-l30) — A2 ───────────────────────────────────────
  {"id":"fr-306","topic":"fr-gram","type":"mcq","q":"« À mon avis, c'est une bonne idée » means:","opts":["It is obviously a good idea","In my opinion, it is a good idea","According to him, it is a good idea","Certainly, it is a good idea"],"ans":1,"exp":"À mon avis = in my opinion. (Selon moi = according to me — similar meaning.)"},
  {"id":"fr-307","topic":"fr-gram","type":"mcq","q":"« Tu as raison » means:","opts":["You are wrong","You are right","You have a reason","You are mistaken"],"ans":1,"exp":"avoir raison = to be right. avoir tort = to be wrong: tu as tort."},
  {"id":"fr-308","topic":"fr-gram","type":"mcq","q":"« Je ne suis pas d'accord » means:","opts":["I am not sure","I disagree","I am not ready","I don't understand"],"ans":1,"exp":"être d'accord = to agree; ne pas être d'accord = to disagree."},
  {"id":"fr-309","topic":"fr-gram","type":"gapfill","q":"In my opinion, the situation is serious:","template":"{0} mon avis, la situation est grave.","gaps":[{"options":["À","De","En","Par"],"answer":0}],"exp":"À mon avis = in my opinion. (NOT *De mon avis* or *En mon avis*)"},
  {"id":"fr-310","topic":"fr-gram","type":"mcq","q":"« Par contre, je préfère le cinéma » — « par contre » means:","opts":["therefore","in fact","however / on the other hand","in addition"],"ans":2,"exp":"par contre = however / on the other hand — introduces a contrasting idea. Similar to 'cependant'."},
  {"id":"fr-311","topic":"fr-gram","type":"mcq","q":"« Je ne pense pas qu'il vienne » — « vienne » is subjunctive because:","opts":["the sentence is in the past","it follows a negative opinion expression (ne pense pas que)","venir is irregular","it follows a time expression"],"ans":1,"exp":"Negative opinions (je ne pense pas que, je ne crois pas que) trigger the subjunctive mood. Affirmative je pense que takes the indicative."},

  // fr-l09 — -ER verb conjugation (A1, fr-conj)
  {"id":"fr-312","topic":"fr-conj","lesson":"fr-l09","type":"mcq","q":"What is the correct conjugation of « parler » for « je »?","opts":["je parle","je parles","je parlee","je parl"],"ans":0,"exp":"-ER verbs: remove -er, add -e for je. je parle."},
  {"id":"fr-313","topic":"fr-conj","lesson":"fr-l09","type":"mcq","q":"What is « tu » form of « travailler »?","opts":["tu travaille","tu travailles","tu travaillez","tu travaillons"],"ans":1,"exp":"tu form of -ER verbs adds -es: tu travailles."},
  {"id":"fr-314","topic":"fr-conj","lesson":"fr-l09","type":"gapfill","q":"Complete: He works every day.","template":"Il {0} tous les jours.","gaps":[{"options":["travaille","travailles","travaillons","travaillez"],"answer":0}],"exp":"il/elle takes -e: il travaille."},
  {"id":"fr-315","topic":"fr-conj","lesson":"fr-l09","type":"mcq","q":"How do you say « we listen » in French?","opts":["nous écoutons","nous écoutez","nous écoutent","nous écoute"],"ans":0,"exp":"nous form adds -ons: nous écoutons."},
  {"id":"fr-316","topic":"fr-conj","lesson":"fr-l09","type":"mcq","q":"How do you say « you (plural/formal) watch » in French?","opts":["vous regardons","vous regardez","vous regardent","vous regarde"],"ans":1,"exp":"vous form adds -ez: vous regardez."},
  {"id":"fr-317","topic":"fr-conj","lesson":"fr-l09","type":"mcq","q":"Which form is correct for « ils aimer »?","opts":["ils aime","ils aimez","ils aiment","ils aimons"],"ans":2,"exp":"ils/elles form adds -ent: ils aiment. The -ent is silent."},
  {"id":"fr-318","topic":"fr-conj","lesson":"fr-l09","type":"gapfill","q":"Spelling change: We eat together. (manger)","template":"Nous {0} ensemble.","gaps":[{"options":["mangeons","mangons","mangez","mangent"],"answer":0}],"exp":"-ger verbs keep the 'e' before -ons to preserve the soft g: nous mangeons."},
  {"id":"fr-319","topic":"fr-conj","lesson":"fr-l09","type":"mcq","q":"Give the correct « nous » form of « commencer »:","opts":["nous commençons","nous commencons","nous commenceons","nous commencez"],"ans":0,"exp":"-cer verbs change c → ç before -ons: nous commençons (to keep the soft s sound)."},
  {"id":"fr-320","topic":"fr-conj","lesson":"fr-l09","type":"dragdrop","q":"Match each pronoun to the correct -ER verb ending:","pairs":[{"left":"je","right":"-e"},{"left":"tu","right":"-es"},{"left":"il/elle","right":"-e"},{"left":"nous","right":"-ons"},{"left":"vous","right":"-ez"},{"left":"ils/elles","right":"-ent"}],"exp":"Regular -ER endings: je -e, tu -es, il -e, nous -ons, vous -ez, ils -ent. Note je and il share -e."},

  // fr-l13 — Nationalities, countries, en/au/aux (A1, fr-gram)
  {"id":"fr-321","topic":"fr-gram","lesson":"fr-l13","type":"mcq","q":"What is the masculine adjective of nationality for Spain?","opts":["espagnole","espagnol","espagnés","espagnier"],"ans":1,"exp":"Masculine nationalities usually have no extra ending: espagnol (m.), espagnole (f.)."},
  {"id":"fr-322","topic":"fr-gram","lesson":"fr-l13","type":"mcq","q":"What is the feminine form of « italien »?","opts":["italienne","italiene","italière","italiano"],"ans":0,"exp":"Nationalities ending in -ien add -ne for feminine: italien → italienne."},
  {"id":"fr-323","topic":"fr-gram","lesson":"fr-l13","type":"mcq","q":"Which preposition goes before a feminine country (e.g. France)?","opts":["au","aux","en","à"],"ans":2,"exp":"en + feminine country: en France, en Espagne, en Italie. au is for masculine countries."},
  {"id":"fr-324","topic":"fr-gram","lesson":"fr-l13","type":"mcq","q":"Which preposition goes before a masculine country (e.g. Portugal)?","opts":["en","aux","à","au"],"ans":3,"exp":"au + masculine singular country: au Portugal, au Japon, au Canada."},
  {"id":"fr-325","topic":"fr-gram","lesson":"fr-l13","type":"gapfill","q":"She lives in Paris. (city — use the right preposition)","template":"Elle habite {0} Paris.","gaps":[{"options":["à","en","au","aux"],"answer":0}],"exp":"Cities take à: à Paris, à Londres, à Lyon. No article with cities."},
  {"id":"fr-326","topic":"fr-gram","lesson":"fr-l13","type":"mcq","q":"« Il vient des États-Unis » — why « des »?","opts":["des is the partitive article","États-Unis is plural so aux → des for origin (venir de + les = des)","des replaces de un","it's an exception"],"ans":1,"exp":"venir DE + les États-Unis → de + les = des. For plural countries use aux (going) / des (coming from): aux États-Unis / des États-Unis."},

  // fr-l16 — Weather expressions (A1, fr-gram)
  {"id":"fr-327","topic":"fr-gram","lesson":"fr-l16","type":"mcq","q":"How do you say « it is nice/sunny » in French?","opts":["Il fait froid","Il fait beau","Il pleut","Il neige"],"ans":1,"exp":"il fait beau = it is nice / the weather is good. il fait mauvais = it is bad weather."},
  {"id":"fr-328","topic":"fr-gram","lesson":"fr-l16","type":"mcq","q":"How do you say « it is cold » in French?","opts":["il fait chaud","il fait du vent","il fait froid","il y a du soleil"],"ans":2,"exp":"il fait froid = it is cold. il fait chaud = it is hot."},
  {"id":"fr-329","topic":"fr-gram","lesson":"fr-l16","type":"gapfill","q":"It is raining today.","template":"Il {0} aujourd'hui.","gaps":[{"options":["pleut","pleure","pluie","pleuvoit"],"answer":0}],"exp":"il pleut = it is raining. This is the il form of pleuvoir (irregular)."},
  {"id":"fr-330","topic":"fr-gram","lesson":"fr-l16","type":"mcq","q":"How do you say « it is windy »?","opts":["il fait du soleil","il fait de la neige","il y a du vent","il fait vent"],"ans":2,"exp":"il y a du vent = it is windy. il y a du soleil = it is sunny (alternatively il fait du soleil)."},
  {"id":"fr-331","topic":"fr-gram","lesson":"fr-l16","type":"mcq","q":"« Au printemps » means:","opts":["in winter","in summer","in autumn","in spring"],"ans":3,"exp":"au printemps = in spring. en été = in summer; en automne = in autumn; en hiver = in winter. Note: printemps uses au, the others use en."},

  // fr-l38 — Irregular verbs: vouloir/pouvoir/devoir/savoir/venir/prendre (A2, fr-conj)
  {"id":"fr-332","topic":"fr-conj","lesson":"fr-l38","type":"mcq","q":"What is the « il » form of « vouloir »?","opts":["il voul","il vouloir","il veut","il voulez"],"ans":2,"exp":"vouloir: je veux, tu veux, il veut, nous voulons, vous voulez, ils veulent."},
  {"id":"fr-333","topic":"fr-conj","lesson":"fr-l38","type":"mcq","q":"How do you say « we can »?","opts":["nous pouvons","nous pouvez","nous peuvent","nous pouvez"],"ans":0,"exp":"pouvoir: je peux, tu peux, il peut, nous pouvons, vous pouvez, ils peuvent."},
  {"id":"fr-334","topic":"fr-conj","lesson":"fr-l38","type":"gapfill","q":"You must leave now. (devoir)","template":"Tu {0} partir maintenant.","gaps":[{"options":["dois","doit","devons","devez"],"answer":0}],"exp":"devoir: je dois, tu dois, il doit, nous devons, vous devez, ils doivent."},
  {"id":"fr-335","topic":"fr-conj","lesson":"fr-l38","type":"mcq","q":"What is the « je » form of « savoir »?","opts":["je sais","je sait","je savons","je savoir"],"ans":0,"exp":"savoir: je sais, tu sais, il sait, nous savons, vous savez, ils savent."},
  {"id":"fr-336","topic":"fr-conj","lesson":"fr-l38","type":"gapfill","q":"They take the bus. (prendre)","template":"Ils {0} le bus.","gaps":[{"options":["prennent","prenent","prends","prend"],"answer":0}],"exp":"prendre: je prends, tu prends, il prend, nous prenons, vous prenez, ils prennent (double n)."},
  {"id":"fr-337","topic":"fr-conj","lesson":"fr-l38","type":"mcq","q":"What is the « ils » form of « venir »?","opts":["ils venons","ils viennent","ils venez","ils vient"],"ans":1,"exp":"venir: je viens, tu viens, il vient, nous venons, vous venez, ils viennent (double n)."},
  {"id":"fr-338","topic":"fr-conj","lesson":"fr-l38","type":"dragdrop","q":"Match each verb to its meaning:","pairs":[{"left":"vouloir","right":"to want"},{"left":"pouvoir","right":"to be able to / can"},{"left":"devoir","right":"to have to / must"},{"left":"savoir","right":"to know (a fact/skill)"}],"exp":"These four key irregular verbs are modal-type: vouloir (want), pouvoir (can), devoir (must), savoir (know how)."},
  {"id":"fr-339","topic":"fr-conj","lesson":"fr-l38","type":"mcq","q":"« Vous devez remplir ce formulaire » means:","opts":["You want to fill in this form","You can fill in this form","You must fill in this form","You know how to fill in this form"],"ans":2,"exp":"devoir = must/have to. vous devez = you must. Not pouvoir (can) or vouloir (want)."},

  // fr-l20 — Imparfait formation (A2, fr-conj)
  {"id":"fr-340","topic":"fr-conj","lesson":"fr-l20","type":"mcq","q":"What is the imperfect (imparfait) stem of « parler »?","opts":["parl-","parler-","parl-ait","nous parlons → parli-"],"ans":0,"exp":"Imparfait stem = nous present form minus -ons: nous parlons → parl-. Then add endings: -ais, -ais, -ait, -ions, -iez, -aient."},
  {"id":"fr-341","topic":"fr-conj","lesson":"fr-l20","type":"mcq","q":"Give the imparfait of « parler » for « je »:","opts":["je parlais","je parlait","je parlerai","je parlions"],"ans":0,"exp":"je/tu take -ais: je parlais (I was speaking / I used to speak)."},
  {"id":"fr-342","topic":"fr-conj","lesson":"fr-l20","type":"gapfill","q":"She used to drink coffee every morning. (boire)","template":"Elle {0} du café chaque matin.","gaps":[{"options":["buvait","buvais","buvions","boivait"],"answer":0}],"exp":"boire → nous buvons → stem buv-. il/elle: buvait. (Irregular stem but regular imparfait endings.)"},
  {"id":"fr-343","topic":"fr-conj","lesson":"fr-l20","type":"mcq","q":"What is the imparfait of « être » for « j' »?","opts":["j'avais","j'étais","j'étions","j'était"],"ans":1,"exp":"être has an irregular stem in the imparfait: ét-. j'étais, tu étais, il était, nous étions, vous étiez, ils étaient."},
  {"id":"fr-344","topic":"fr-conj","lesson":"fr-l20","type":"mcq","q":"Which sentence uses imparfait correctly to describe a past habit?","opts":["Hier, je mangeais une pizza.","Chaque soir, je mangeais une pizza.","Je mangeais une pizza hier soir à 20h.","Soudain, je mangeais une pizza."],"ans":1,"exp":"Imparfait describes repeated past habits (chaque soir = every evening). For a single completed event at a specific time, use passé composé."},
  {"id":"fr-345","topic":"fr-conj","lesson":"fr-l20","type":"mcq","q":"What is the « nous » imparfait of « finir »?","opts":["nous finissions","nous finions","nous finissons","nous finirons"],"ans":0,"exp":"finir → nous finissons → stem finiss-. nous finissions. (-iss- stem kept for -IR verbs.)"},

  // fr-l22 — Futur proche & futur simple (A2, fr-conj)
  {"id":"fr-346","topic":"fr-conj","lesson":"fr-l22","type":"mcq","q":"How do you form « futur proche »?","opts":["present of avoir + infinitive","present of aller + infinitive","present of être + past participle","imperfect + infinitive"],"ans":1,"exp":"Futur proche = present of aller + infinitive: je vais partir, tu vas manger, il va venir."},
  {"id":"fr-347","topic":"fr-conj","lesson":"fr-l22","type":"gapfill","q":"He is going to leave tomorrow. (futur proche)","template":"Il {0} partir demain.","gaps":[{"options":["va","vais","allons","allez"],"answer":0}],"exp":"il va + infinitive = he is going to. Futur proche with aller conjugated to match the subject."},
  {"id":"fr-348","topic":"fr-conj","lesson":"fr-l22","type":"mcq","q":"The futur simple stem for « avoir » is:","opts":["av-","aur-","avons-","aurait-"],"ans":1,"exp":"avoir → futur stem aur-: j'aurai, tu auras, il aura, nous aurons, vous aurez, ils auront."},
  {"id":"fr-349","topic":"fr-conj","lesson":"fr-l22","type":"mcq","q":"The futur simple stem for « être » is:","opts":["ét-","êtr-","ser-","est-"],"ans":2,"exp":"être → futur stem ser-: je serai, tu seras, il sera, nous serons, vous serez, ils seront."},
  {"id":"fr-350","topic":"fr-conj","lesson":"fr-l22","type":"mcq","q":"What is « ils feront » in English?","opts":["they were doing","they do","they will do","they are doing"],"ans":2,"exp":"faire → futur stem fer-: ils feront = they will do/make."},
  {"id":"fr-351","topic":"fr-conj","lesson":"fr-l22","type":"gapfill","q":"I will be able to come. (pouvoir, futur simple)","template":"Je {0} venir.","gaps":[{"options":["pourrai","pourrait","pouvrai","pourrez"],"answer":0}],"exp":"pouvoir → futur stem pourr-: je pourrai = I will be able to."},
  {"id":"fr-352","topic":"fr-conj","lesson":"fr-l22","type":"mcq","q":"Which sentence uses futur simple correctly?","opts":["Demain, je vais travailler.","Demain, je travaillerai.","Demain, j'ai travaillé.","Demain, je travaillais."],"ans":1,"exp":"Both futur proche and futur simple can express future plans. je travaillerai is the futur simple form (stem + -ai). Futur proche (je vais travailler) is also correct but option B specifically tests the futur simple form."},

  // fr-l24 — COD & COI pronouns (A2, fr-gram)
  {"id":"fr-353","topic":"fr-gram","lesson":"fr-l24","type":"mcq","q":"What does COD stand for and what does it replace?","opts":["Complément d'objet direct — replaces a direct object (no preposition)","Complément d'objet direct — replaces an indirect object (with à)","Complément d'objet de direction — replaces a place","Complément d'objet défini — replaces a definite noun"],"ans":0,"exp":"COD = Complément d'objet direct. It replaces a noun that is the direct object of the verb (no preposition between verb and noun)."},
  {"id":"fr-354","topic":"fr-gram","lesson":"fr-l24","type":"gapfill","q":"I see her. (la/le/les/lui)","template":"Je {0} vois.","gaps":[{"options":["la","le","lui","les"],"answer":0}],"exp":"la replaces a feminine singular direct object: Je vois Marie → Je la vois. Pronouns go BEFORE the verb."},
  {"id":"fr-355","topic":"fr-gram","lesson":"fr-l24","type":"mcq","q":"Which pronoun replaces a masculine singular direct object?","opts":["lui","la","le","leur"],"ans":2,"exp":"le = masculine singular direct object pronoun. la = feminine. les = plural. lui/leur are indirect object pronouns (COI)."},
  {"id":"fr-356","topic":"fr-gram","lesson":"fr-l24","type":"mcq","q":"COI pronouns lui and leur replace « à + person ». What does « lui » replace?","opts":["à + a plural person","à + a masculine singular person only","à + a singular person (m. or f.)","à + a place"],"ans":2,"exp":"lui replaces à + singular person (either gender): à Marc → lui; à Marie → lui. leur replaces à + plural people."},
  {"id":"fr-357","topic":"fr-gram","lesson":"fr-l24","type":"gapfill","q":"I speak to him/her. (parler à → COI)","template":"Je {0} parle.","gaps":[{"options":["lui","le","la","leur"],"answer":0}],"exp":"parler à quelqu'un → replace à + person with lui (singular): Je parle à Paul → Je lui parle."},
  {"id":"fr-358","topic":"fr-gram","lesson":"fr-l24","type":"mcq","q":"« Je leur téléphone » — who does « leur » refer to?","opts":["one person (him/her)","a place","multiple people (them)","an object"],"ans":2,"exp":"leur (COI) = to them (plural): je téléphone à mes parents → je leur téléphone. Not to be confused with leur (possessive adjective)."},
  {"id":"fr-359","topic":"fr-gram","lesson":"fr-l24","type":"mcq","q":"Where does a COD/COI pronoun go in a sentence?","opts":["After the verb","Before the verb","After the object","At the end of the sentence"],"ans":1,"exp":"Object pronouns (COD/COI) go BEFORE the conjugated verb in French: Je le mange. Je lui parle. In infinitive constructions, before the infinitive: Je vais le manger."},
  {"id":"fr-360","topic":"fr-gram","lesson":"fr-l24","type":"mcq","q":"Replace the underlined noun: « J'envoie un message À MES AMIS »","opts":["Je les envoie un message.","Je leur envoie un message.","Je lui envoie un message.","Je le leur envoie un message."],"ans":1,"exp":"à mes amis (plural, indirect) → leur. Je leur envoie un message. (leur because it replaces à + plural people.)"},

  // fr-l29 — Relative pronouns: qui, que, dont, où (B1, fr-gram)
  {"id":"fr-361","topic":"fr-gram","lesson":"fr-l29","type":"mcq","q":"In « L'homme qui parle est mon père », what is the role of « qui »?","opts":["direct object of parle","subject of parle","replaces de + noun","indicates a place"],"ans":1,"exp":"qui = subject relative pronoun. It refers back to L'homme and is the subject of parle. Tip: qui is always followed directly by a verb."},
  {"id":"fr-362","topic":"fr-gram","lesson":"fr-l29","type":"mcq","q":"In « Le livre que je lis est intéressant », what is the role of « que »?","opts":["subject of lis","direct object of lis","replaces de + livre","indicates time"],"ans":1,"exp":"que = direct object relative pronoun. Je lis le livre → le livre que je lis. que is always followed by a subject + verb."},
  {"id":"fr-363","topic":"fr-gram","lesson":"fr-l29","type":"mcq","q":"When do you use « dont » as a relative pronoun?","opts":["To replace a subject","To replace a direct object","To replace de + noun/person","To indicate a place or time"],"ans":2,"exp":"dont replaces de + noun: J'ai besoin de ce livre → le livre dont j'ai besoin. Use dont when the verb requires de (avoir besoin de, parler de, se souvenir de…)."},
  {"id":"fr-364","topic":"fr-gram","lesson":"fr-l29","type":"gapfill","q":"The town where I grew up is small. (use où)","template":"La ville {0} j'ai grandi est petite.","gaps":[{"options":["où","que","qui","dont"],"answer":0}],"exp":"où = relative pronoun for place or time: La ville où j'ai grandi. Le jour où je suis arrivé. où replaces a location or time expression."},
  {"id":"fr-365","topic":"fr-gram","lesson":"fr-l29","type":"mcq","q":"« C'est le sujet dont il parle » — why « dont » and not « que »?","opts":["parler takes a direct object","parler de requires de, so dont replaces de + le sujet","dont is used for people only","que must follow a subject"],"ans":1,"exp":"parler DE quelque chose → dont replaces de + noun. il parle DE ce sujet → le sujet dont il parle. If the verb took a direct object, you'd use que."},

  // fr-l23 — Verbes pronominaux / Reflexive verbs (A2, fr-conj)
  {"id":"fr-366","topic":"fr-conj","lesson":"fr-l23","type":"mcq","q":"What characterises a pronominal (reflexive) verb in French?","opts":["It always uses être in the present tense","It uses a reflexive pronoun (me/te/se/nous/vous/se) that refers back to the subject","It can only be used in the third person","It has an irregular present tense stem"],"ans":1,"exp":"Reflexive verbs carry a pronoun that 'reflects' the action back onto the subject: je me lave (I wash myself), tu te lèves (you get yourself up). The pronoun changes with each person."},
  {"id":"fr-367","topic":"fr-conj","lesson":"fr-l23","type":"mcq","q":"How do you say « we get up » in French? (se lever)","opts":["nous levons","nous se levons","nous nous levons","nous me levons"],"ans":2,"exp":"With reflexive verbs, the subject pronoun and reflexive pronoun both appear: nous + nous = nous nous levons. Every person doubles up: je me lève, tu te lèves, il se lève, nous nous levons, vous vous levez, ils se lèvent."},
  {"id":"fr-368","topic":"fr-conj","lesson":"fr-l23","type":"mcq","q":"« Je me réveille à six heures » — what does this mean?","opts":["Someone wakes me up at six","I wake (myself) up at six","I am sleeping until six","I wake you up at six"],"ans":1,"exp":"se réveiller = to wake up (oneself). me = myself (reflexive). Je me réveille = I wake up. It is part of a daily routine verb: se réveiller, se lever, se laver, s'habiller, se coucher."},
  {"id":"fr-369","topic":"fr-conj","lesson":"fr-l23","type":"gapfill","q":"She gets dressed before breakfast. (s'habiller)","template":"Elle {0} avant le petit-déjeuner.","gaps":[{"options":["s'habille","se habille","m'habille","t'habille"],"answer":0}],"exp":"s'habiller → elle s'habille. Note the elision: se → s' before a vowel (h is mute here). The reflexive pronoun (se) contracts to s' when followed by a vowel or mute h."},
  {"id":"fr-370","topic":"fr-conj","lesson":"fr-l23","type":"mcq","q":"How do you say « I don't go to bed late »? (se coucher)","opts":["Je me ne couche pas tard","Je ne se couche pas tard","Je ne me couche pas tard","Je me couche ne pas tard"],"ans":2,"exp":"Negation with reflexive verbs: ne goes before the reflexive pronoun, pas goes after the verb: je NE me couche PAS tard. The reflexive pronoun (me) stays between ne and the verb."},
  {"id":"fr-371","topic":"fr-conj","lesson":"fr-l23","type":"mcq","q":"« Elle s'est levée tôt » — why does levée have a final 'e'?","opts":["levée is a feminine noun","Reflexive verbs form their PC with être, so the past participle agrees with the subject (elle = feminine)","être always causes agreement with all verbs","s' requires a feminine form"],"ans":1,"exp":"Reflexive verbs always use être in the passé composé: elle s'est levée. Because the auxiliary is être, the past participle agrees with the subject in gender and number. Elle (f. sg.) → levée (+e). Il s'est levé (no extra e for masculine)."},

  // fr-l44 — Les pronoms Y et EN (B1, fr-gram)
  {"id":"fr-372","topic":"fr-gram","lesson":"fr-l44","type":"mcq","q":"What does the pronoun Y replace?","opts":["le/la/les (direct object)","à + place or à + thing","de + noun","à + person (indirect object)"],"ans":1,"exp":"Y replaces à + place (Tu vas à Paris → Tu y vas) or à + thing when the verb takes à (Je pense à ça → J'y pense). It does NOT replace à + person — use lui/leur for people."},
  {"id":"fr-373","topic":"fr-gram","lesson":"fr-l44","type":"gapfill","q":"Are you going to the cinema tonight? → Are you going there?","template":"Tu vas au cinéma ce soir ? → Tu {0} vas ?","gaps":[{"options":["y","en","lui","le"],"answer":0}],"exp":"au cinéma = à + place → replaced by Y. Tu y vas ? = Are you going there?"},
  {"id":"fr-374","topic":"fr-gram","lesson":"fr-l44","type":"mcq","q":"What does the pronoun EN replace?","opts":["à + place","de + noun (especially with quantities or verbs taking de)","le/la (definite direct object)","à + person"],"ans":1,"exp":"EN replaces de + noun: Il parle de son voyage → Il en parle. It also replaces du/de la/des + noun: Tu veux des pommes → Tu en veux ?"},
  {"id":"fr-375","topic":"fr-gram","lesson":"fr-l44","type":"gapfill","q":"She has three cats. → She has three (of them).","template":"Elle a trois chats. → Elle {0} a trois.","gaps":[{"options":["en","y","les","leur"],"answer":0}],"exp":"des/de + noun with a quantity → EN. The number (trois) stays AFTER the verb: elle en a trois. Never omit the number when it was part of the original sentence."},
  {"id":"fr-376","topic":"fr-gram","lesson":"fr-l44","type":"mcq","q":"Where do Y and EN go in a sentence?","opts":["After the conjugated verb","Before the conjugated verb (or before an infinitive)","At the end of the sentence","After a past participle"],"ans":1,"exp":"Y and EN go before the verb: Je y vais → J'y vais. In a 2-verb group (modal + infinitive), they go before the infinitive: Je vais y aller. Exception: affirmative imperative → after the verb: Vas-y !"},
  {"id":"fr-377","topic":"fr-gram","lesson":"fr-l44","type":"mcq","q":"« Vas-y ! » — why does Y come after the verb here?","opts":["Y always follows an imperative","With an affirmative imperative, object pronouns go after the verb with a hyphen","Y is an adverb, not a pronoun","Vas is irregular and requires post-verbal pronouns"],"ans":1,"exp":"With affirmative imperatives, pronouns follow the verb: Vas-y ! (Go there!), Prends-en ! (Take some!). In negative imperatives, the pronoun goes before: N'y vas pas. (Don't go there.)"}
];

window.FR_LEARN_PATH = window.FR_LEARN_PATH = [
  {
    "id": "fr-a1",
    "title": "A1 — Débutant",
    "lessons": [
      {
        "id": "fr-l01",
        "title": "Saluer et se présenter",
        "icon": "👋",
        "cards": [
          {
            "h": "Bonjour & Salut",
            "p": [
              "Use **Bonjour** (hello / good day) in any formal or neutral situation; use **Salut** (hi) casually with friends and family.",
              "In the evening, say **Bonsoir**. To wish someone a good night before bed, say **Bonne nuit**."
            ],
            "callout": {
              "kind": "key",
              "text": "In formal speech, add a title: « Bonjour Monsieur », « Bonsoir Madame ». This is expected politeness in France."
            }
          },
          {
            "h": "Tu ou vous ?",
            "split": {
              "left": {
                "title": "tu (informal)",
                "items": [
                  "Friends, family, children",
                  "Comment tu t'appelles ?",
                  "Ça va ?",
                  "Et toi ?"
                ]
              },
              "right": {
                "title": "vous (formal/plural)",
                "items": [
                  "Strangers, elders, work",
                  "Comment vous appelez-vous ?",
                  "Comment allez-vous ?",
                  "Et vous ?"
                ]
              }
            },
            "p": [
              "Choosing **tu** or **vous** correctly is a key A1 skill — when unsure with an adult you don't know, use **vous**."
            ]
          },
          {
            "h": "Se présenter — phrases clés",
            "example": {
              "title": "Introducing yourself",
              "rows": [
                [
                  "Je m'appelle Marie.",
                  "My name is Marie."
                ],
                [
                  "J'ai vingt ans.",
                  "I am twenty years old."
                ],
                [
                  "Je suis anglais(e).",
                  "I am English."
                ],
                [
                  "J'habite à Londres.",
                  "I live in London."
                ],
                [
                  "Enchanté(e) !",
                  "Nice to meet you!"
                ]
              ]
            }
          },
          {
            "h": "Demander à quelqu'un",
            "example": {
              "title": "Asking about someone",
              "rows": [
                [
                  "Comment vous appelez-vous ?",
                  "What is your name? (formal)"
                ],
                [
                  "Vous venez d'où ?",
                  "Where are you from? (formal)"
                ],
                [
                  "Comment ça va ?",
                  "How are you?"
                ],
                [
                  "Ça va bien, merci. Et vous ?",
                  "I'm fine, thanks. And you?"
                ]
              ]
            }
          },
          {
            "h": "La politesse essentielle",
            "p": [
              "**S'il vous plaît** (formal) / **s'il te plaît** (informal) = please.",
              "**Merci** = thank you · **Merci beaucoup** = thank you very much · **De rien** = you're welcome.",
              "**Pardon** / **Excusez-moi** = excuse me / sorry."
            ]
          }
        ],
        "check": [
          {
            "q": "Which greeting is INFORMAL?",
            "opts": [
              "Bonjour",
              "Bonsoir",
              "Salut",
              "Comment allez-vous ?"
            ],
            "ans": 2,
            "exp": "« Salut » is the casual greeting, like « hi »."
          },
          {
            "q": "You meet your friend's grandmother for the first time. You should use:",
            "opts": [
              "tu",
              "vous",
              "either is fine",
              "no pronoun"
            ],
            "ans": 1,
            "exp": "With an adult you don't know — especially an elder — use the polite « vous »."
          },
          {
            "q": "« Je m'appelle Paul » means?",
            "opts": [
              "I am from Paul",
              "My name is Paul",
              "I like Paul",
              "I know Paul"
            ],
            "ans": 1,
            "exp": "« Je m'appelle » literally means « I call myself »."
          },
          {
            "q": "How do you say « I am twenty years old »?",
            "opts": [
              "Je suis vingt ans",
              "J'ai vingt ans",
              "J'ai vingt",
              "Je suis vingt"
            ],
            "ans": 1,
            "exp": "Age uses AVOIR: « J'ai vingt ans » (literally « I have twenty years »)."
          },
          {
            "q": "« De rien » means?",
            "opts": [
              "Nothing works",
              "You're welcome",
              "Please",
              "Sorry"
            ],
            "ans": 1,
            "exp": "« De rien » = you're welcome (literally « it's nothing »)."
          },
          {
            "q": "Choose the correct evening greeting:",
            "opts": [
              "Bonne nuit",
              "Bonjour",
              "Bonsoir",
              "Salut tout le monde"
            ],
            "ans": 2,
            "exp": "« Bonsoir » greets someone in the evening; « Bonne nuit » is only for going to bed."
          }
        ]
      },
      {
        "id": "fr-l40",
        "title": "La prononciation et les accents",
        "icon": "🗣️",
        "cards": [
          {
            "h": "Les accents écrits",
            "p": [
              "French uses several written accents that change how vowels are pronounced.",
              "**accent aigu (é)** → closed \"ay\" sound: *été*, *répéter*",
              "**accent grave (è)** → open \"eh\" sound: *père*, *très*, *après*",
              "**accent circonflexe (ê, â, ô, û, î)** → historical marker, often lengthens vowel: *fête*, *hôtel*, *être*",
              "**cédille (ç)** → makes c say \"s\" before a, o, u: *ça*, *garçon*, *français*",
              "**tréma (ë, ï)** → pronounce both vowels separately: *Noël*, *naïf*"
            ],
            "table": {
              "headers": ["Accent", "Name", "Effect", "Example words"],
              "rows": [
                ["é", "accent aigu", "closed \"ay\"", "été, répéter, café"],
                ["è", "accent grave", "open \"eh\"", "père, très, après"],
                ["ê/â/ô/û/î", "accent circonflexe", "lengthens vowel", "fête, hôtel, être"],
                ["ç", "cédille", "c → \"s\" sound", "ça, garçon, français"],
                ["ë/ï", "tréma", "pronounce both vowels", "Noël, naïf"]
              ]
            }
          },
          {
            "h": "Les sons difficiles",
            "p": [
              "These vowel sounds are tricky for English speakers — practice them carefully."
            ],
            "table": {
              "headers": ["Written", "Sounds like", "Example"],
              "rows": [
                ["ou", "\"oo\" as in moon", "vous, rouge, bouche"],
                ["u", "tight pursed lips (no English equiv.)", "tu, rue, vu"],
                ["eu / œu", "\"uh\" with rounded lips", "feu, sœur, peur"],
                ["oi", "\"wa\"", "moi, voiture, trois"],
                ["ai / ei", "\"eh\"", "mais, lait, reine"],
                ["an / en", "nasal (through nose)", "dans, vent, France"],
                ["in / ain / ein", "nasal", "vin, pain, plein"],
                ["on", "nasal", "bon, maison, pont"]
              ]
            }
          },
          {
            "h": "Les consonnes muettes et la liaison",
            "p": [
              "In French, **final consonants are usually silent**: *grand*, *petit*, *vous*.",
              "However, **liaison** occurs when the next word begins with a vowel or mute h — the silent consonant is then pronounced.",
              "Examples: *vous_avez*, *ils_ont*, *les_enfants*",
              "**h muet** → liaison applies: *les_hommes*, *l'hôtel*",
              "**h aspiré** → NO liaison: *les / haricots* (not *les_haricots*)"
            ],
            "callout": {
              "kind": "key",
              "text": "The s, t, x, z, d at the end of words usually disappear — but re-emerge when the next word starts with a vowel or mute h."
            }
          },
          {
            "h": "Règles d'or — Six golden rules",
            "table": {
              "headers": ["Rule", "Example"],
              "rows": [
                ["Final consonants are usually silent", "petit → peti, grand → gran"],
                ["é = closed \"ay\"; è = open \"eh\"", "été vs. père"],
                ["u requires pursed lips (not \"oo\")", "tu ≠ \"too\""],
                ["oi = \"wa\"", "moi = \"mwa\""],
                ["Nasal vowels (an, in, on) — air through nose", "vin, bon, dans"],
                ["Liaison: link words before vowels", "vous_avez, ils_ont"]
              ]
            }
          }
        ],
        "check": [
          {
            "type": "mcq",
            "q": "The accent aigu (é) is pronounced like:",
            "opts": ["closed \"ay\"", "open \"eh\"", "silent", "\"ee\""],
            "ans": 0,
            "exp": "The accent aigu (é) gives a closed \"ay\" sound, as in été or café."
          },
          {
            "type": "mcq",
            "q": "What does the cédille (ç) do?",
            "opts": ["Makes c a soft \"s\" sound", "Makes c hard", "Is silent", "Changes the vowel"],
            "ans": 0,
            "exp": "The cédille makes c sound like \"s\" before a, o, or u: ça, garçon, français."
          },
          {
            "type": "mcq",
            "q": "\"ou\" in French sounds like:",
            "opts": ["\"oo\" as in moon", "\"u\" as in up", "\"w\"", "\"uh\""],
            "ans": 0,
            "exp": "\"ou\" = \"oo\" as in moon: vous, rouge, bouche."
          },
          {
            "type": "mcq",
            "q": "\"oi\" sounds like:",
            "opts": ["\"oy\"", "\"wa\"", "\"oh-ee\"", "\"wee\""],
            "ans": 1,
            "exp": "\"oi\" = \"wa\": moi = \"mwa\", voiture = \"vwa-toor\"."
          },
          {
            "type": "mcq",
            "q": "In \"ils_ont\", the s in \"ils\" is pronounced because:",
            "opts": ["Liaison before a vowel", "It is always pronounced", "It is irregular", "h aspiré follows"],
            "ans": 0,
            "exp": "Liaison: the normally silent final s reappears when the next word starts with a vowel."
          },
          {
            "type": "mcq",
            "q": "Which word has a NASAL vowel?",
            "opts": ["rue", "vin", "feu", "ou"],
            "ans": 1,
            "exp": "\"vin\" contains the nasal vowel \"in\" — air flows through the nose when pronouncing it."
          }
        ]
      },
      {
        "id": "fr-l02",
        "title": "Les pronoms et le verbe « être »",
        "icon": "🧍",
        "cards": [
          {
            "h": "Les pronoms personnels sujets",
            "example": {
              "title": "Subject pronouns",
              "rows": [
                [
                  "je",
                  "I"
                ],
                [
                  "tu",
                  "you (informal)"
                ],
                [
                  "il / elle / on",
                  "he / she / one (we, casually)"
                ],
                [
                  "nous",
                  "we"
                ],
                [
                  "vous",
                  "you (formal / plural)"
                ],
                [
                  "ils / elles",
                  "they (m / f)"
                ]
              ]
            },
            "callout": {
              "kind": "tip",
              "text": "**on** is used constantly in spoken French to mean « we »: « On va au cinéma » = we're going to the cinema."
            }
          },
          {
            "h": "Le verbe être (to be)",
            "example": {
              "title": "être — présent",
              "rows": [
                [
                  "je suis",
                  "I am"
                ],
                [
                  "tu es",
                  "you are"
                ],
                [
                  "il / elle est",
                  "he / she is"
                ],
                [
                  "nous sommes",
                  "we are"
                ],
                [
                  "vous êtes",
                  "you are"
                ],
                [
                  "ils / elles sont",
                  "they are"
                ]
              ]
            }
          },
          {
            "h": "« Être » en contexte",
            "p": [
              "Identity & profession: **Je suis professeur.** (I am a teacher — note: no article!)",
              "Description: **Elle est grande et sympathique.** (She is tall and friendly.)",
              "Origin: **Nous sommes français.** (We are French.)"
            ],
            "callout": {
              "kind": "warning",
              "text": "With jobs, French drops the article: « Il est médecin » NOT « Il est un médecin »."
            }
          },
          {
            "h": "C'est vs Il/Elle est",
            "split": {
              "left": {
                "title": "C'est + noun",
                "items": [
                  "C'est un livre.",
                  "C'est Marie.",
                  "C'est mon ami.",
                  "C'est intéressant."
                ]
              },
              "right": {
                "title": "Il/Elle est + adjective",
                "items": [
                  "Il est petit.",
                  "Elle est gentille.",
                  "Il est anglais.",
                  "Elle est médecin."
                ]
              }
            }
          }
        ],
        "check": [
          {
            "q": "Complete: « Nous ___ étudiants. »",
            "opts": [
              "sommes",
              "êtes",
              "sont",
              "est"
            ],
            "ans": 0,
            "exp": "nous sommes = we are."
          },
          {
            "q": "Which pronoun means « they » (feminine)?",
            "opts": [
              "ils",
              "elles",
              "on",
              "vous"
            ],
            "ans": 1,
            "exp": "« elles » = they, for an all-female group."
          },
          {
            "q": "« Vous ___ français. » Choose the correct form of être.",
            "opts": [
              "es",
              "est",
              "êtes",
              "sont"
            ],
            "ans": 2,
            "exp": "vous êtes = you are."
          },
          {
            "q": "Correct French for « He is a doctor »:",
            "opts": [
              "Il est un médecin",
              "Il est médecin",
              "Il a médecin",
              "C'est médecin"
            ],
            "ans": 1,
            "exp": "No article with professions after être: « Il est médecin »."
          },
          {
            "q": "Choose the correct sentence:",
            "opts": [
              "Il est un livre",
              "C'est un livre",
              "C'est petit livre",
              "Elle est livre"
            ],
            "ans": 1,
            "exp": "Use « C'est » before a noun (un livre); use « il/elle est » before an adjective."
          },
          {
            "q": "« On va au parc » — « on » here means:",
            "opts": [
              "one must",
              "we",
              "they only",
              "you"
            ],
            "ans": 1,
            "exp": "In everyday French « on » commonly means « we »."
          }
        ]
      },
      {
        "id": "fr-l03",
        "title": "« Avoir », l'âge et la possession",
        "icon": "🎂",
        "cards": [
          {
            "h": "Le verbe avoir (to have)",
            "example": {
              "title": "avoir — présent",
              "rows": [
                [
                  "j'ai",
                  "I have"
                ],
                [
                  "tu as",
                  "you have"
                ],
                [
                  "il / elle a",
                  "he / she has"
                ],
                [
                  "nous avons",
                  "we have"
                ],
                [
                  "vous avez",
                  "you have"
                ],
                [
                  "ils / elles ont",
                  "they have"
                ]
              ]
            }
          },
          {
            "h": "L'âge",
            "p": [
              "French uses **avoir** for age, never être: **J'ai trente ans.** (I am 30.)",
              "Ask: **Quel âge as-tu ?** / **Quel âge avez-vous ?** = How old are you?"
            ],
            "callout": {
              "kind": "warning",
              "text": "Never say « Je suis 30 ans ». Age is always « J'ai … ans ». You must keep the word « ans »."
            }
          },
          {
            "h": "Expressions avec avoir",
            "example": {
              "title": "Common avoir expressions",
              "rows": [
                [
                  "avoir faim / soif",
                  "to be hungry / thirsty"
                ],
                [
                  "avoir chaud / froid",
                  "to be hot / cold"
                ],
                [
                  "avoir peur",
                  "to be afraid"
                ],
                [
                  "avoir besoin de",
                  "to need"
                ],
                [
                  "avoir envie de",
                  "to feel like / want"
                ]
              ]
            },
            "p": [
              "Example: **J'ai faim et j'ai soif.** (I'm hungry and thirsty.)"
            ]
          },
          {
            "h": "Il y a (there is / there are)",
            "p": [
              "**Il y a** means « there is » or « there are » — it never changes.",
              "**Il y a un café près d'ici.** (There is a café nearby.)",
              "**Il y a deux chambres dans l'appartement.** (There are two bedrooms in the flat.)"
            ]
          }
        ],
        "check": [
          {
            "q": "Complete: « ___ trois frères. »",
            "opts": [
              "Je suis",
              "J'ai",
              "Je",
              "J'as"
            ],
            "ans": 1,
            "exp": "Possession uses avoir: « J'ai trois frères » (I have three brothers)."
          },
          {
            "q": "How do you say « She is 25 years old »?",
            "opts": [
              "Elle est 25 ans",
              "Elle a 25 ans",
              "Elle a 25",
              "Elle est 25"
            ],
            "ans": 1,
            "exp": "Age uses avoir + ans: « Elle a 25 ans »."
          },
          {
            "q": "« Nous ___ faim. »",
            "opts": [
              "sommes",
              "avons",
              "avez",
              "ont"
            ],
            "ans": 1,
            "exp": "« avoir faim » = to be hungry, so « nous avons faim »."
          },
          {
            "q": "« J'ai besoin de » means:",
            "opts": [
              "I feel like",
              "I am afraid of",
              "I need",
              "I have"
            ],
            "ans": 2,
            "exp": "« avoir besoin de » = to need."
          },
          {
            "q": "Choose the correct sentence for « There are two cafés »:",
            "opts": [
              "Il y a deux cafés",
              "Il est deux cafés",
              "Ils ont deux cafés",
              "Il a deux cafés"
            ],
            "ans": 0,
            "exp": "« Il y a » = there is/are, invariable."
          },
          {
            "q": "« Quel âge avez-vous ? » asks:",
            "opts": [
              "What's your name?",
              "Where are you from?",
              "How old are you?",
              "How are you?"
            ],
            "ans": 2,
            "exp": "« Quel âge avez-vous ? » = How old are you? (formal)."
          }
        ]
      },
      {
        "id": "fr-l04",
        "title": "Les articles et le genre",
        "icon": "✏️",
        "cards": [
          {
            "h": "Articles définis (the)",
            "example": {
              "title": "le / la / l' / les",
              "rows": [
                [
                  "le livre",
                  "the book (m)"
                ],
                [
                  "la table",
                  "the table (f)"
                ],
                [
                  "l'ami / l'eau",
                  "the friend / the water (before a vowel)"
                ],
                [
                  "les livres",
                  "the books (plural, m & f)"
                ]
              ]
            },
            "callout": {
              "kind": "key",
              "text": "Before a vowel or silent h, « le » and « la » both shorten to **l'** : l'homme, l'école."
            }
          },
          {
            "h": "Articles indéfinis (a / some)",
            "example": {
              "title": "un / une / des",
              "rows": [
                [
                  "un chien",
                  "a dog (m)"
                ],
                [
                  "une maison",
                  "a house (f)"
                ],
                [
                  "des amis",
                  "some friends (plural)"
                ]
              ]
            }
          },
          {
            "h": "Le genre des noms",
            "p": [
              "Every French noun is masculine or feminine — there is no neuter. Learn each noun **with its article**.",
              "Endings often feminine: **-tion, -sion, -té, -ure, -ette** (la nation, la liberté, la voiture).",
              "Endings often masculine: **-age, -ment, -isme, -eau** (le garage, le moment, le bureau)."
            ]
          },
          {
            "h": "Articles contractés (à / de + le)",
            "example": {
              "title": "Contractions",
              "rows": [
                [
                  "à + le = au",
                  "Je vais au cinéma."
                ],
                [
                  "à + les = aux",
                  "Il parle aux enfants."
                ],
                [
                  "de + le = du",
                  "Le livre du professeur."
                ],
                [
                  "de + les = des",
                  "La couleur des murs."
                ]
              ]
            },
            "callout": {
              "kind": "warning",
              "text": "« à la » and « à l' » do NOT contract: je vais à la plage, à l'école."
            }
          }
        ],
        "check": [
          {
            "q": "Which article goes with « table » (feminine)?",
            "opts": [
              "le",
              "la",
              "un",
              "les"
            ],
            "ans": 1,
            "exp": "« la table » — feminine singular."
          },
          {
            "q": "Before « ami » you write:",
            "opts": [
              "le ami",
              "la ami",
              "l'ami",
              "les ami"
            ],
            "ans": 2,
            "exp": "Before a vowel, le/la become l': « l'ami »."
          },
          {
            "q": "« des » is the plural of:",
            "opts": [
              "le / la",
              "un / une",
              "du / de la",
              "au / aux"
            ],
            "ans": 1,
            "exp": "« des » is the plural indefinite article (un/une → des)."
          },
          {
            "q": "« Je vais ___ cinéma. » (à + le)",
            "opts": [
              "à le",
              "au",
              "aux",
              "du"
            ],
            "ans": 1,
            "exp": "à + le contracts to « au »: je vais au cinéma."
          },
          {
            "q": "A noun ending in « -tion » is usually:",
            "opts": [
              "masculine",
              "feminine",
              "always plural",
              "invariable"
            ],
            "ans": 1,
            "exp": "Nouns ending in -tion (la nation, la question) are usually feminine."
          },
          {
            "q": "« Le livre ___ professeur. » (de + le)",
            "opts": [
              "de le",
              "du",
              "des",
              "au"
            ],
            "ans": 1,
            "exp": "de + le contracts to « du »: le livre du professeur."
          }
        ]
      },
      {
        "id": "fr-l05",
        "title": "Le pluriel des noms",
        "icon": "➕",
        "cards": [
          {
            "h": "Règle générale : + s",
            "p": [
              "Most nouns add **-s** in the plural (silent in speech): un livre → des livres, une fleur → des fleurs.",
              "The article changes too: le/la/un/une → **les/des**."
            ],
            "callout": {
              "kind": "tip",
              "text": "The plural -s is almost never pronounced. You hear the plural from the ARTICLE: « le chat » vs « les chats »."
            }
          },
          {
            "h": "Pluriels en -x",
            "example": {
              "title": "Special plural endings",
              "rows": [
                [
                  "-eau → -eaux",
                  "un bateau → des bateaux"
                ],
                [
                  "-eu → -eux",
                  "un jeu → des jeux"
                ],
                [
                  "-al → -aux",
                  "un animal → des animaux"
                ],
                [
                  "-ou (7 nouns) → -oux",
                  "un bijou → des bijoux"
                ]
              ]
            }
          },
          {
            "h": "Cas invariables",
            "p": [
              "Nouns already ending in **-s, -x, -z** do not change: un fils → des fils, une voix → des voix, le nez → les nez.",
              "Example: **J'ai deux fils.** (I have two sons.)"
            ]
          }
        ],
        "check": [
          {
            "q": "Plural of « une voiture »:",
            "opts": [
              "des voitures",
              "des voiturs",
              "les voiture",
              "des voiturex"
            ],
            "ans": 0,
            "exp": "Regular plural: add -s → des voitures."
          },
          {
            "q": "Plural of « un château »:",
            "opts": [
              "des châteaus",
              "des châteaux",
              "des châteales",
              "des château"
            ],
            "ans": 1,
            "exp": "Nouns in -eau take -x: château → châteaux."
          },
          {
            "q": "Plural of « un animal »:",
            "opts": [
              "des animals",
              "des animales",
              "des animaux",
              "des animal"
            ],
            "ans": 2,
            "exp": "Nouns in -al usually become -aux: animal → animaux."
          },
          {
            "q": "Plural of « le fils » (the son):",
            "opts": [
              "les filss",
              "les fils",
              "les filses",
              "les fis"
            ],
            "ans": 1,
            "exp": "Nouns ending in -s don't change: le fils → les fils."
          },
          {
            "q": "How do you usually HEAR that a noun is plural?",
            "opts": [
              "From the -s ending",
              "From the article (les/des)",
              "From the verb only",
              "You can't tell"
            ],
            "ans": 1,
            "exp": "The plural -s is silent; the article (les, des) signals the plural."
          }
        ]
      },
      {
        "id": "fr-l07",
        "title": "Quelle heure est-il ?",
        "icon": "🕐",
        "cards": [
          {
            "h": "Demander et dire l'heure",
            "example": {
              "title": "Telling the time",
              "rows": [
                [
                  "Quelle heure est-il ?",
                  "What time is it?"
                ],
                [
                  "Il est une heure.",
                  "It's one o'clock."
                ],
                [
                  "Il est deux heures.",
                  "It's two o'clock."
                ],
                [
                  "Il est midi / minuit.",
                  "It's noon / midnight."
                ]
              ]
            }
          },
          {
            "h": "Les minutes",
            "example": {
              "title": "Minutes past / to",
              "rows": [
                [
                  "Il est trois heures dix.",
                  "3:10"
                ],
                [
                  "… et quart",
                  "quarter past (h15)"
                ],
                [
                  "… et demie",
                  "half past (h30)"
                ],
                [
                  "… moins le quart",
                  "quarter to (h45)"
                ],
                [
                  "… moins dix",
                  "ten to"
                ]
              ]
            },
            "callout": {
              "kind": "tip",
              "text": "Official/transport time uses the 24-hour clock: « quatorze heures trente » = 14:30."
            }
          },
          {
            "h": "Les moments de la journée",
            "p": [
              "le matin (morning), l'après-midi (afternoon), le soir (evening), la nuit (night).",
              "**Le matin, je prends un café.** (In the morning, I have a coffee.)",
              "**du matin / de l'après-midi / du soir** distinguish am/pm: huit heures du soir = 8 pm."
            ]
          }
        ],
        "check": [
          {
            "q": "« Quelle heure est-il ? » means:",
            "opts": [
              "What day is it?",
              "What time is it?",
              "How long?",
              "When?"
            ],
            "ans": 1,
            "exp": "« Quelle heure est-il ? » = What time is it?"
          },
          {
            "q": "« Il est midi » means:",
            "opts": [
              "It's midnight",
              "It's noon",
              "It's morning",
              "It's one o'clock"
            ],
            "ans": 1,
            "exp": "midi = noon; minuit = midnight."
          },
          {
            "q": "How do you say 3:30?",
            "opts": [
              "trois heures quart",
              "trois heures et demie",
              "trois heures moins le quart",
              "trois demi"
            ],
            "ans": 1,
            "exp": "Half past = « et demie »: trois heures et demie."
          },
          {
            "q": "« cinq heures moins le quart » = ?",
            "opts": [
              "5:15",
              "5:45",
              "4:45",
              "4:15"
            ],
            "ans": 2,
            "exp": "« moins le quart » = quarter to → 4:45."
          },
          {
            "q": "14:30 spoken in 24-hour time is:",
            "opts": [
              "deux heures trente",
              "quatorze heures trente",
              "quatre heures trente",
              "quatorze et demie"
            ],
            "ans": 1,
            "exp": "24-hour clock: quatorze heures trente."
          },
          {
            "q": "« le matin » means:",
            "opts": [
              "the evening",
              "the night",
              "the morning",
              "the afternoon"
            ],
            "ans": 2,
            "exp": "le matin = the morning."
          }
        ]
      },
      {
        "id": "fr-l09",
        "title": "Les verbes en -ER au présent",
        "icon": "🗣️",
        "cards": [
          {
            "h": "La conjugaison régulière",
            "example": {
              "title": "parler (to speak)",
              "rows": [
                [
                  "je parle",
                  "I speak"
                ],
                [
                  "tu parles",
                  "you speak"
                ],
                [
                  "il / elle parle",
                  "he / she speaks"
                ],
                [
                  "nous parlons",
                  "we speak"
                ],
                [
                  "vous parlez",
                  "you speak"
                ],
                [
                  "ils / elles parlent",
                  "they speak"
                ]
              ]
            },
            "callout": {
              "kind": "key",
              "text": "Drop **-er**, add: **-e, -es, -e, -ons, -ez, -ent**. The -e, -es, -ent endings are all silent — they sound identical."
            }
          },
          {
            "h": "Des verbes utiles",
            "p": [
              "**aimer** (to like/love), **habiter** (to live), **travailler** (to work), **regarder** (to watch), **manger** (to eat), **écouter** (to listen).",
              "Over 90% of French verbs are -ER verbs, so this one pattern unlocks a huge amount."
            ]
          },
          {
            "h": "Petits changements d'orthographe",
            "example": {
              "title": "Spelling tweaks",
              "rows": [
                [
                  "manger → nous mangeons",
                  "keep the « e » for a soft g"
                ],
                [
                  "commencer → nous commençons",
                  "ç keeps the soft c"
                ],
                [
                  "préférer → je préfère",
                  "é → è before silent ending"
                ],
                [
                  "acheter → j'achète",
                  "add accent: è"
                ]
              ]
            }
          },
          {
            "h": "Phrases en contexte",
            "p": [
              "**J'habite à Paris et je travaille dans un bureau.** (I live in Paris and work in an office.)",
              "**Nous mangeons au restaurant le samedi.** (We eat at the restaurant on Saturdays.)",
              "**Tu écoutes de la musique ?** (Are you listening to music?)"
            ]
          }
        ],
        "check": [
          {
            "q": "Conjugate: « Nous (parler) ___ français. »",
            "opts": [
              "parle",
              "parles",
              "parlons",
              "parlez"
            ],
            "ans": 2,
            "exp": "nous + -ER verb → -ons: nous parlons."
          },
          {
            "q": "« Tu (aimer) ___ le café. »",
            "opts": [
              "aime",
              "aimes",
              "aimons",
              "aiment"
            ],
            "ans": 1,
            "exp": "tu + -ER verb → -es: tu aimes."
          },
          {
            "q": "Which endings are silent (sound the same)?",
            "opts": [
              "-ons and -ez",
              "-e, -es, -ent",
              "-ez and -ent",
              "none are silent"
            ],
            "ans": 1,
            "exp": "je parle / tu parles / ils parlent all sound identical — the endings are silent."
          },
          {
            "q": "« Nous (manger) ___ » is spelled:",
            "opts": [
              "mangons",
              "mangeons",
              "manjons",
              "mangez"
            ],
            "ans": 1,
            "exp": "Keep the « e » before -ons to keep the soft g: nous mangeons."
          },
          {
            "q": "« Ils (travailler) ___ beaucoup. »",
            "opts": [
              "travaille",
              "travailles",
              "travaillent",
              "travaillons"
            ],
            "ans": 2,
            "exp": "ils/elles + -ER → -ent: ils travaillent."
          },
          {
            "q": "Translate « I live in Lyon »:",
            "opts": [
              "Je habite à Lyon",
              "J'habite à Lyon",
              "Je habites Lyon",
              "J'habite Lyon en"
            ],
            "ans": 1,
            "exp": "habiter starts with a vowel, so je → j': « J'habite à Lyon »."
          }
        ]
      },
      {
        "id": "fr-l10",
        "title": "La négation et les questions",
        "icon": "❓",
        "cards": [
          {
            "h": "La négation : ne … pas",
            "p": [
              "Wrap the verb with **ne … pas**: **Je ne parle pas anglais.** (I don't speak English.)",
              "Before a vowel, **ne → n'**: **Je n'aime pas le café.**"
            ],
            "callout": {
              "kind": "tip",
              "text": "In casual speech the « ne » is often dropped: « Je sais pas ». But write the full « ne … pas » in exams."
            }
          },
          {
            "h": "Autres négations",
            "example": {
              "title": "More negatives",
              "rows": [
                [
                  "ne … jamais",
                  "never"
                ],
                [
                  "ne … rien",
                  "nothing"
                ],
                [
                  "ne … personne",
                  "nobody"
                ],
                [
                  "ne … plus",
                  "no longer / not anymore"
                ]
              ]
            },
            "p": [
              "**Je ne mange jamais de viande.** (I never eat meat.)"
            ]
          },
          {
            "h": "Poser une question — 3 façons",
            "split": {
              "left": {
                "title": "Easy → formal",
                "items": [
                  "Intonation: « Tu viens ? »",
                  "est-ce que: « Est-ce que tu viens ? »",
                  "Inversion: « Viens-tu ? »"
                ]
              },
              "right": {
                "title": "Same meaning",
                "items": [
                  "Are you coming?",
                  "Are you coming?",
                  "Are you coming? (formal)"
                ]
              }
            }
          },
          {
            "h": "Les mots interrogatifs",
            "example": {
              "title": "Question words",
              "rows": [
                [
                  "qui ?",
                  "who?"
                ],
                [
                  "que / quoi ?",
                  "what?"
                ],
                [
                  "où ?",
                  "where?"
                ],
                [
                  "quand ?",
                  "when?"
                ],
                [
                  "comment ?",
                  "how?"
                ],
                [
                  "pourquoi ? / combien ?",
                  "why? / how much?"
                ]
              ]
            },
            "p": [
              "**Où habites-tu ?** (Where do you live?) · **Pourquoi ?** — **Parce que…** (Why? — Because…)"
            ]
          }
        ],
        "check": [
          {
            "q": "Make negative: « Je parle italien. »",
            "opts": [
              "Je ne parle italien",
              "Je parle ne pas italien",
              "Je ne parle pas italien",
              "Je pas parle italien"
            ],
            "ans": 2,
            "exp": "Wrap the verb: ne + verb + pas → Je ne parle pas italien."
          },
          {
            "q": "« Je n'aime pas » shows that ne becomes n' because:",
            "opts": [
              "it's plural",
              "the next word starts with a vowel",
              "it's a question",
              "it's informal"
            ],
            "ans": 1,
            "exp": "Before a vowel, ne → n': je n'aime pas."
          },
          {
            "q": "« ne … jamais » means:",
            "opts": [
              "nothing",
              "never",
              "nobody",
              "no longer"
            ],
            "ans": 1,
            "exp": "ne … jamais = never."
          },
          {
            "q": "Which is the FORMAL question form?",
            "opts": [
              "Tu viens ?",
              "Est-ce que tu viens ?",
              "Viens-tu ?",
              "Tu viens, non ?"
            ],
            "ans": 2,
            "exp": "Inversion (Viens-tu ?) is the most formal question form."
          },
          {
            "q": "« Où habites-tu ? » asks:",
            "opts": [
              "When do you live?",
              "Where do you live?",
              "Why do you live?",
              "How do you live?"
            ],
            "ans": 1,
            "exp": "où = where."
          },
          {
            "q": "Choose the word for « why »:",
            "opts": [
              "comment",
              "quand",
              "pourquoi",
              "combien"
            ],
            "ans": 2,
            "exp": "pourquoi = why; answer with « parce que »."
          }
        ]
      },
      {
        "id": "fr-l11",
        "title": "La famille et les adjectifs possessifs",
        "icon": "👨‍👩‍👧",
        "cards": [
          {
            "h": "La famille",
            "example": {
              "title": "Family members",
              "rows": [
                [
                  "le père / la mère",
                  "father / mother"
                ],
                [
                  "le frère / la sœur",
                  "brother / sister"
                ],
                [
                  "le fils / la fille",
                  "son / daughter"
                ],
                [
                  "les parents / les grands-parents",
                  "parents / grandparents"
                ],
                [
                  "le mari / la femme",
                  "husband / wife"
                ]
              ]
            }
          },
          {
            "h": "Adjectifs possessifs (1 owner)",
            "example": {
              "title": "my / your / his-her",
              "rows": [
                [
                  "mon / ma / mes",
                  "my (m / f / pl)"
                ],
                [
                  "ton / ta / tes",
                  "your (informal)"
                ],
                [
                  "son / sa / ses",
                  "his / her / its"
                ]
              ]
            },
            "callout": {
              "kind": "key",
              "text": "**son/sa/ses** = his OR her — it agrees with the THING owned, not the owner. « sa voiture » = his or her car."
            }
          },
          {
            "h": "Adjectifs possessifs (plural owners)",
            "example": {
              "title": "our / your / their",
              "rows": [
                [
                  "notre / nos",
                  "our (sing / pl)"
                ],
                [
                  "votre / vos",
                  "your (formal/pl)"
                ],
                [
                  "leur / leurs",
                  "their"
                ]
              ]
            }
          },
          {
            "h": "En contexte",
            "p": [
              "**Voici ma mère et mon père.** (This is my mother and my father.)",
              "**Mes parents habitent en France.** (My parents live in France.)",
              "**C'est ta sœur ?** — **Oui, c'est ma sœur.** (Is that your sister? — Yes, it's my sister.)"
            ],
            "callout": {
              "kind": "warning",
              "text": "Before a feminine word starting with a vowel, use the masculine form for sound: « mon amie » (not « ma amie »)."
            }
          }
        ],
        "check": [
          {
            "q": "« la sœur » means:",
            "opts": [
              "the brother",
              "the sister",
              "the daughter",
              "the mother"
            ],
            "ans": 1,
            "exp": "la sœur = the sister."
          },
          {
            "q": "Choose « my » for « ma mère »→ for « père » (m):",
            "opts": [
              "ma père",
              "mon père",
              "mes père",
              "ton père"
            ],
            "ans": 1,
            "exp": "père is masculine → mon père."
          },
          {
            "q": "« ses livres » means:",
            "opts": [
              "my books",
              "your books",
              "his/her books",
              "our books"
            ],
            "ans": 2,
            "exp": "ses = his/her (plural object); agrees with « livres », not the owner."
          },
          {
            "q": "« ___ parents habitent ici. » (our)",
            "opts": [
              "notre",
              "nos",
              "votre",
              "leur"
            ],
            "ans": 1,
            "exp": "« parents » is plural → nos parents."
          },
          {
            "q": "Why do we say « mon amie » even though « amie » is feminine?",
            "opts": [
              "amie is actually masculine",
              "for easier pronunciation before a vowel",
              "it's a mistake",
              "all friends are mon"
            ],
            "ans": 1,
            "exp": "Before a feminine noun starting with a vowel, the masculine « mon » is used for sound."
          },
          {
            "q": "« leur maison » means:",
            "opts": [
              "our house",
              "your house",
              "their house",
              "her house"
            ],
            "ans": 2,
            "exp": "leur = their (singular object)."
          }
        ]
      },
      {
        "id": "fr-l12",
        "title": "Décrire : les adjectifs",
        "icon": "🎨",
        "cards": [
          {
            "h": "L'accord des adjectifs",
            "example": {
              "title": "grand (big)",
              "rows": [
                [
                  "masculin",
                  "un grand jardin"
                ],
                [
                  "féminin (+e)",
                  "une grande maison"
                ],
                [
                  "pluriel (+s)",
                  "de grands jardins"
                ],
                [
                  "féminin pluriel (+es)",
                  "de grandes maisons"
                ]
              ]
            },
            "callout": {
              "kind": "key",
              "text": "Adjectives agree in **gender and number** with the noun. Add -e (f), -s (pl), -es (f pl)."
            }
          },
          {
            "h": "La place de l'adjectif",
            "p": [
              "Most adjectives go **after** the noun: une chemise bleue, un film intéressant.",
              "But short common ones go **before** — remember **BAGS**: Beauty, Age, Goodness, Size.",
              "**un beau jardin, un jeune homme, une bonne idée, une petite ville.**"
            ]
          },
          {
            "h": "Adjectifs irréguliers utiles",
            "example": {
              "title": "Irregular feminines",
              "rows": [
                [
                  "beau → belle",
                  "beautiful"
                ],
                [
                  "nouveau → nouvelle",
                  "new"
                ],
                [
                  "vieux → vieille",
                  "old"
                ],
                [
                  "blanc → blanche",
                  "white"
                ],
                [
                  "heureux → heureuse",
                  "happy"
                ]
              ]
            }
          }
        ],
        "check": [
          {
            "q": "Where do most adjectives go?",
            "opts": [
              "before the noun",
              "after the noun",
              "either, no rule",
              "never used"
            ],
            "ans": 1,
            "exp": "Most French adjectives follow the noun: une voiture rouge."
          },
          {
            "q": "Feminine of « grand »:",
            "opts": [
              "grand",
              "grande",
              "grands",
              "grandes"
            ],
            "ans": 1,
            "exp": "Add -e: grand → grande."
          },
          {
            "q": "Which adjective goes BEFORE the noun?",
            "opts": [
              "rouge",
              "intéressant",
              "petit",
              "français"
            ],
            "ans": 2,
            "exp": "« petit » is a BAGS adjective (size) and goes before: une petite ville."
          },
          {
            "q": "Feminine of « beau »:",
            "opts": [
              "beaue",
              "belle",
              "beaux",
              "bel"
            ],
            "ans": 1,
            "exp": "Irregular: beau → belle."
          }
        ]
      },
      {
        "id": "fr-l13",
        "title": "Nationalités, pays et langues",
        "icon": "🌍",
        "cards": [
          {
            "h": "Les nationalités",
            "p": [
              "Nationalities agree like adjectives: **Il est français / Elle est française.**",
              "anglais(e), espagnol(e), allemand(e), italien(ne), américain(e), chinois(e)."
            ],
            "callout": {
              "kind": "tip",
              "text": "As an adjective (nationality) → lowercase: « il est français ». As a noun (the people) → capital: « les Français »."
            }
          },
          {
            "h": "Les pays et les prépositions",
            "example": {
              "title": "« in / to » a country",
              "rows": [
                [
                  "en + feminine country",
                  "en France, en Espagne, en Italie"
                ],
                [
                  "au + masculine country",
                  "au Canada, au Japon, au Portugal"
                ],
                [
                  "aux + plural country",
                  "aux États-Unis, aux Pays-Bas"
                ],
                [
                  "à + city",
                  "à Paris, à Londres"
                ]
              ]
            },
            "callout": {
              "kind": "key",
              "text": "Most countries ending in -e are feminine (use « en »). Exception: le Mexique."
            }
          },
          {
            "h": "Dire d'où on vient",
            "p": [
              "**Je viens de France.** / **Je viens du Canada.** / **Je viens des États-Unis.**",
              "**venir de** + feminine country = de; + masculine = du; + plural = des."
            ]
          },
          {
            "h": "Les langues",
            "p": [
              "Languages are masculine and lowercase: **le français, l'anglais, l'espagnol**.",
              "**Je parle français et un peu espagnol.** (I speak French and a little Spanish.)",
              "**Elle apprend le chinois.** (She is learning Chinese.)"
            ]
          }
        ],
        "check": [
          {
            "q": "« Elle est ___ » (English):",
            "opts": [
              "anglais",
              "anglaise",
              "Anglais",
              "l'anglais"
            ],
            "ans": 1,
            "exp": "Nationality agrees: feminine → anglaise (lowercase as an adjective)."
          },
          {
            "q": "« Je vais ___ France. »",
            "opts": [
              "au",
              "en",
              "à",
              "aux"
            ],
            "ans": 1,
            "exp": "France is feminine → « en France »."
          },
          {
            "q": "« Je vais ___ Japon. »",
            "opts": [
              "en",
              "à",
              "au",
              "aux"
            ],
            "ans": 2,
            "exp": "le Japon is masculine → « au Japon »."
          },
          {
            "q": "« I come from the United States »:",
            "opts": [
              "Je viens de États-Unis",
              "Je viens des États-Unis",
              "Je viens du États-Unis",
              "Je viens aux États-Unis"
            ],
            "ans": 1,
            "exp": "Plural country → « des »: je viens des États-Unis."
          },
          {
            "q": "How are language names written?",
            "opts": [
              "Capitalised",
              "Lowercase, masculine",
              "Always feminine",
              "With « la »"
            ],
            "ans": 1,
            "exp": "Languages are masculine and lowercase: le français, l'anglais."
          },
          {
            "q": "« en » is used for countries that are:",
            "opts": [
              "masculine",
              "feminine (and most -e endings)",
              "plural",
              "cities"
            ],
            "ans": 1,
            "exp": "Feminine countries (mostly ending in -e) use « en »: en France, en Italie."
          }
        ]
      },
      {
        "id": "fr-l14",
        "title": "« Aller », « faire » et les loisirs",
        "icon": "⚽",
        "cards": [
          {
            "h": "Aller (to go)",
            "example": {
              "title": "aller — présent",
              "rows": [
                [
                  "je vais / tu vas",
                  "I go / you go"
                ],
                [
                  "il / elle va",
                  "he / she goes"
                ],
                [
                  "nous allons / vous allez",
                  "we / you go"
                ],
                [
                  "ils / elles vont",
                  "they go"
                ]
              ]
            },
            "callout": {
              "kind": "tip",
              "text": "aller + à: « Je vais **au** cinéma, **à la** piscine, **aux** magasins. »"
            }
          },
          {
            "h": "Faire (to do / make)",
            "example": {
              "title": "faire — présent",
              "rows": [
                [
                  "je fais / tu fais",
                  "I do / you do"
                ],
                [
                  "il / elle fait",
                  "he / she does"
                ],
                [
                  "nous faisons / vous faites",
                  "we / you do"
                ],
                [
                  "ils / elles font",
                  "they do"
                ]
              ]
            }
          },
          {
            "h": "Parler de ses loisirs",
            "example": {
              "title": "Hobbies with faire de / jouer à",
              "rows": [
                [
                  "faire du sport / du vélo",
                  "to do sport / cycle"
                ],
                [
                  "faire de la natation",
                  "to swim"
                ],
                [
                  "jouer au foot / au tennis",
                  "to play football / tennis"
                ],
                [
                  "jouer du piano / de la guitare",
                  "to play piano / guitar"
                ]
              ]
            },
            "callout": {
              "kind": "key",
              "text": "**jouer à** + games/sports; **jouer de** + musical instruments."
            }
          },
          {
            "h": "Aimer, adorer, détester",
            "p": [
              "**Aimer** (to like/love), **adorer** (to adore/love), and **détester** (to hate) are opinion verbs. They follow two structures depending on what comes next."
            ],
            "table": {
              "headers": ["Structure", "Use when…", "Examples"],
              "rows": [
                ["verb + **infinitive**", "talking about an activity", "J'aime lire. · J'adore danser. · Je déteste travailler."],
                ["verb + **le / la / les**", "talking about things in general", "J'aime le chocolat. · J'adore la musique. · Je déteste les maths."]
              ]
            },
            "callout": {
              "kind": "key",
              "text": "General likes always take **le/la/les**, never du/de la: **J'aime le café** ✓ — *J'aime du café* ✗. To ask: **Qu'est-ce que tu aimes faire ?** (What do you like doing?)"
            }
          }
        ],
        "check": [
          {
            "q": "« Nous ___ au parc. » (aller)",
            "opts": [
              "allons",
              "allez",
              "vont",
              "vas"
            ],
            "ans": 0,
            "exp": "nous allons = we go."
          },
          {
            "q": "« Vous ___ vos devoirs. » (faire)",
            "opts": [
              "faisons",
              "faites",
              "font",
              "fais"
            ],
            "ans": 1,
            "exp": "vous faites = you do (irregular!)."
          },
          {
            "q": "« Je joue ___ piano. »",
            "opts": [
              "au",
              "du",
              "à la",
              "de la"
            ],
            "ans": 1,
            "exp": "Instruments use jouer DE: jouer du piano."
          },
          {
            "q": "« Je joue ___ tennis. »",
            "opts": [
              "du",
              "de la",
              "au",
              "à le"
            ],
            "ans": 2,
            "exp": "Sports/games use jouer À: jouer au tennis."
          },
          {
            "q": "« Je vais ___ piscine. »",
            "opts": [
              "au",
              "à la",
              "aux",
              "du"
            ],
            "ans": 1,
            "exp": "piscine is feminine → à la piscine."
          },
          {
            "q": "After « J'aime » to say « I like to read »:",
            "opts": [
              "J'aime lis",
              "J'aime lire",
              "J'aime le lire",
              "J'aime à lire"
            ],
            "ans": 1,
            "exp": "aimer + infinitive: J'aime lire."
          }
        ]
      },
      {
        "id": "fr-l15",
        "title": "Manger et boire : au café",
        "icon": "☕",
        "cards": [
          {
            "h": "Les articles partitifs",
            "example": {
              "title": "« some » — du / de la / de l' / des",
              "rows": [
                [
                  "du pain (m)",
                  "some bread"
                ],
                [
                  "de la confiture (f)",
                  "some jam"
                ],
                [
                  "de l'eau (vowel)",
                  "some water"
                ],
                [
                  "des fruits (pl)",
                  "some fruit"
                ]
              ]
            },
            "callout": {
              "kind": "key",
              "text": "Partitive = an unspecified quantity. « Je mange **du** pain » = I eat (some) bread."
            }
          },
          {
            "h": "De après la négation",
            "p": [
              "After **ne…pas** (and ne…plus, ne…jamais), every article that expresses 'some' or 'a/an' collapses to **de** (or **d'** before a vowel). It doesn't matter whether the original article was du, de la, de l', des, un, or une — they all become **de**."
            ],
            "table": {
              "headers": ["Affirmative (+)", "Negative (−)"],
              "rows": [
                ["Je mange **du** pain.", "Je ne mange pas **de** pain."],
                ["Elle boit **de la** bière.", "Elle ne boit pas **de** bière."],
                ["Tu veux **de l'**eau.", "Tu ne veux pas **d'**eau."],
                ["Il achète **des** légumes.", "Il n'achète pas **de** légumes."],
                ["J'ai **une** idée.", "Je n'ai pas **d'**idée."],
                ["Il a **un** chien.", "Il n'a pas **de** chien."]
              ]
            },
            "callout": {
              "kind": "warning",
              "text": "Exception — after être, the article stays: « Ce n'est pas **un** problème. » ✓   The de-rule only applies to partitive and indefinite articles, not after être."
            }
          },
          {
            "h": "Commander au café",
            "example": {
              "title": "Ordering politely",
              "rows": [
                [
                  "Vous désirez ?",
                  "What would you like?"
                ],
                [
                  "Je voudrais un café, s'il vous plaît.",
                  "I'd like a coffee, please."
                ],
                [
                  "Et pour vous ?",
                  "And for you?"
                ],
                [
                  "L'addition, s'il vous plaît.",
                  "The bill, please."
                ]
              ]
            }
          },
          {
            "h": "Vocabulaire — boire et manger",
            "p": [
              "Boissons: un café, un thé, une eau, un jus d'orange, un verre de vin.",
              "Nourriture: un croissant, un sandwich, une salade, une pizza, une glace.",
              "**Je voudrais une salade et de l'eau, s'il vous plaît.** (I'd like a salad and some water, please.)"
            ]
          }
        ],
        "check": [
          {
            "q": "« Je mange ___ pain. » (some bread)",
            "opts": [
              "du",
              "de la",
              "des",
              "le"
            ],
            "ans": 0,
            "exp": "pain is masculine → du pain."
          },
          {
            "q": "« Je bois ___ eau. »",
            "opts": [
              "du",
              "de la",
              "de l'",
              "des"
            ],
            "ans": 2,
            "exp": "Before a vowel → de l': de l'eau."
          },
          {
            "q": "Negative of « Je mange du fromage »:",
            "opts": [
              "Je ne mange pas du fromage",
              "Je ne mange pas de fromage",
              "Je ne mange pas le fromage",
              "Je mange ne pas fromage"
            ],
            "ans": 1,
            "exp": "After a negative, partitives → de: pas de fromage."
          },
          {
            "q": "Polite way to order « I'd like a coffee »:",
            "opts": [
              "Je veux un café",
              "Donne un café",
              "Je voudrais un café",
              "Un café !"
            ],
            "ans": 2,
            "exp": "« Je voudrais » (conditional of vouloir) is the polite « I would like »."
          },
          {
            "q": "« L'addition, s'il vous plaît » asks for:",
            "opts": [
              "the menu",
              "the bill",
              "the waiter",
              "the toilet"
            ],
            "ans": 1,
            "exp": "l'addition = the bill/check."
          },
          {
            "q": "« des fruits » is which kind of article?",
            "opts": [
              "definite",
              "partitive/indefinite plural (some)",
              "contracted",
              "negative"
            ],
            "ans": 1,
            "exp": "« des » before a plural noun expresses « some fruit »."
          },
          {
            "q": "Negative of « Elle achète des pommes » :",
            "opts": [
              "Elle n'achète pas des pommes",
              "Elle n'achète pas de pommes",
              "Elle n'achète pas les pommes",
              "Elle achète ne pas pommes"
            ],
            "ans": 1,
            "exp": "des → de after a negative: elle n'achète pas **de** pommes."
          },
          {
            "q": "Negative of « J'ai une idée » :",
            "opts": [
              "Je n'ai pas une idée",
              "Je n'ai pas de idée",
              "Je n'ai pas d'idée",
              "Je n'ai pas l'idée"
            ],
            "ans": 2,
            "exp": "une → de after a negative; and de + vowel = d': **je n'ai pas d'idée**."
          },
          {
            "q": "After être, which sentence is correct?",
            "opts": [
              "Ce n'est pas de bon film.",
              "Ce n'est pas un bon film.",
              "Ce n'est pas du bon film.",
              "Ce n'est pas de la bon film."
            ],
            "ans": 1,
            "exp": "After être, the article stays unchanged: **Ce n'est pas un bon film** ✓. The de-rule only replaces du / de la / des / un / une after verbs other than être."
          }
        ]
      },
      {
        "id": "fr-l16",
        "title": "Le temps et les saisons",
        "icon": "🌦️",
        "cards": [
          {
            "h": "Quel temps fait-il ?",
            "example": {
              "title": "Weather with « il fait »",
              "rows": [
                [
                  "Il fait beau.",
                  "It's nice."
                ],
                [
                  "Il fait mauvais.",
                  "It's bad weather."
                ],
                [
                  "Il fait chaud / froid.",
                  "It's hot / cold."
                ],
                [
                  "Il fait du vent / du soleil.",
                  "It's windy / sunny."
                ]
              ]
            },
            "callout": {
              "kind": "key",
              "text": "Weather usually uses **faire**: « il fait… ». But « il pleut » (it's raining) and « il neige » (it's snowing) are their own verbs."
            }
          },
          {
            "h": "La pluie et la neige",
            "p": [
              "**Il pleut.** (It's raining.) — verb *pleuvoir*.",
              "**Il neige.** (It's snowing.) — verb *neiger*.",
              "**Il y a des nuages / un orage.** (There are clouds / a storm.)"
            ]
          },
          {
            "h": "Les saisons",
            "example": {
              "title": "The four seasons",
              "rows": [
                [
                  "le printemps",
                  "spring — au printemps"
                ],
                [
                  "l'été",
                  "summer — en été"
                ],
                [
                  "l'automne",
                  "autumn — en automne"
                ],
                [
                  "l'hiver",
                  "winter — en hiver"
                ]
              ]
            },
            "callout": {
              "kind": "warning",
              "text": "« au printemps » uses « au », but the other three seasons use « en »: en été, en automne, en hiver."
            }
          },
          {
            "h": "En contexte",
            "p": [
              "**En hiver, il fait froid et il neige souvent.** (In winter it's cold and it often snows.)",
              "**Aujourd'hui il fait beau, mais demain il va pleuvoir.** (Today it's nice, but tomorrow it's going to rain.)"
            ]
          }
        ],
        "check": [
          {
            "q": "« Il fait beau » means:",
            "opts": [
              "It's bad weather",
              "It's nice weather",
              "It's raining",
              "It's cold"
            ],
            "ans": 1,
            "exp": "il fait beau = the weather is nice."
          },
          {
            "q": "Which weather expression does NOT use « faire »?",
            "opts": [
              "Il fait chaud",
              "Il fait du vent",
              "Il pleut",
              "Il fait froid"
            ],
            "ans": 2,
            "exp": "« Il pleut » (it rains) uses the verb pleuvoir, not faire."
          },
          {
            "q": "« It's snowing » in French:",
            "opts": [
              "Il fait neige",
              "Il neige",
              "Il y a neige",
              "Il pleut neige"
            ],
            "ans": 1,
            "exp": "« Il neige » = it's snowing (verb neiger)."
          },
          {
            "q": "« in summer » =",
            "opts": [
              "au été",
              "en été",
              "à l'été",
              "dans été"
            ],
            "ans": 1,
            "exp": "en été. (Only spring uses « au »: au printemps.)"
          },
          {
            "q": "« au printemps » means:",
            "opts": [
              "in winter",
              "in autumn",
              "in spring",
              "in summer"
            ],
            "ans": 2,
            "exp": "le printemps = spring; « au printemps » = in spring."
          },
          {
            "q": "Complete: « Demain, il ___ pleuvoir. » (near future)",
            "opts": [
              "va",
              "fait",
              "est",
              "a"
            ],
            "ans": 0,
            "exp": "Near future = aller + infinitive: il va pleuvoir."
          }
        ]
      },
      {
        "id": "fr-l41",
        "title": "Le corps et la santé",
        "icon": "🏥",
        "cards": [
          {
            "h": "Les parties du corps",
            "p": [
              "Learn the key body parts in French. Note the irregular plural: **l'œil → les yeux**."
            ],
            "table": {
              "headers": ["French", "English"],
              "rows": [
                ["la tête", "the head"],
                ["le visage", "the face"],
                ["les yeux / l'œil", "the eyes / the eye"],
                ["le nez", "the nose"],
                ["la bouche", "the mouth"],
                ["l'oreille", "the ear"],
                ["les cheveux", "the hair"],
                ["le cou", "the neck"],
                ["l'épaule", "the shoulder"],
                ["le bras", "the arm"],
                ["la main", "the hand"],
                ["le doigt", "the finger"],
                ["le ventre", "the stomach"],
                ["le dos", "the back"],
                ["la jambe", "the leg"],
                ["le genou", "the knee"],
                ["le pied", "the foot"]
              ]
            }
          },
          {
            "h": "J'ai mal à… — expressing pain",
            "p": [
              "Use **j'ai mal à** + definite article to say where it hurts.",
              "Remember: **à + le → au** and **à + les → aux**."
            ],
            "table": {
              "headers": ["French phrase", "English translation"],
              "rows": [
                ["J'ai mal à la tête.", "I have a headache."],
                ["J'ai mal au dos.", "I have a backache."],
                ["J'ai mal aux dents.", "I have toothache."],
                ["J'ai mal à la gorge.", "I have a sore throat."],
                ["J'ai mal au ventre.", "I have a stomach ache."],
                ["J'ai mal à l'oreille.", "I have earache."]
              ]
            }
          },
          {
            "h": "Chez le médecin — at the doctor",
            "p": [
              "**Je suis malade.** — I'm ill.",
              "**Je me sens mal.** — I don't feel well.",
              "**J'ai de la fièvre.** — I have a fever.",
              "**Je tousse.** — I'm coughing.",
              "**J'éternue.** — I'm sneezing.",
              "**Il me faut une ordonnance.** — I need a prescription.",
              "À la pharmacie: *un médicament* (medicine), *des comprimés* (tablets), *du sirop* (syrup), *une crème* (cream)."
            ],
            "callout": {
              "kind": "tip",
              "text": "In France, the pharmacist (le pharmacien / la pharmacienne) can advise on minor ailments — a great first port of call."
            }
          }
        ],
        "check": [
          {
            "type": "mcq",
            "q": "\"La tête\" means:",
            "opts": ["the hand", "the head", "the foot", "the back"],
            "ans": 1,
            "exp": "La tête = the head."
          },
          {
            "type": "mcq",
            "q": "\"J'ai mal au dos\" means:",
            "opts": ["I have a headache", "I have a stomach ache", "I have a backache", "I have a toothache"],
            "ans": 2,
            "exp": "J'ai mal au dos = I have a backache. (dos = back)"
          },
          {
            "type": "mcq",
            "q": "The correct contracted form of \"à + les\" is:",
            "opts": ["à les", "au", "aux", "del"],
            "ans": 2,
            "exp": "à + les contracts to aux: j'ai mal aux dents."
          },
          {
            "type": "mcq",
            "q": "\"Je suis malade\" means:",
            "opts": ["I am tired", "I am ill", "I am hungry", "I am cold"],
            "ans": 1,
            "exp": "Je suis malade = I am ill."
          },
          {
            "type": "mcq",
            "q": "\"J'ai de la fièvre\" means:",
            "opts": ["I have a cough", "I have a temperature / fever", "I have a headache", "I feel dizzy"],
            "ans": 1,
            "exp": "J'ai de la fièvre = I have a fever / temperature."
          },
          {
            "type": "mcq",
            "q": "What is \"un médicament\"?",
            "opts": ["a doctor", "a prescription", "a medicine", "a nurse"],
            "ans": 2,
            "exp": "Un médicament = a medicine / medication."
          }
        ]
      },
      {
        "id": "fr-l39",
        "title": "Les transports, les directions et les prépositions de lieu",
        "icon": "🚌",
        "cards": [
          {
            "h": "Les moyens de transport",
            "table": {
              "headers": ["French", "English", "Example"],
              "rows": [
                ["le train", "the train", "Je prends le train."],
                ["l'autobus / le bus", "the bus", "On prend le bus."],
                ["le métro", "the underground / metro", "Elle prend le métro."],
                ["le vélo", "the bike", "Il va au travail à vélo."],
                ["la voiture", "the car", "Nous y allons en voiture."],
                ["l'avion", "the plane", "Ils voyagent en avion."],
                ["à pied", "on foot", "Je vais à pied."]
              ]
            },
            "callout": {
              "kind": "key",
              "text": "Use **en** with most vehicles (en voiture, en bus, en avion) but **à** with vélo and à pied. Also: **prendre** the train/bus/metro."
            }
          },
          {
            "h": "Les directions",
            "table": {
              "headers": ["French", "English"],
              "rows": [
                ["Allez tout droit.", "Go straight ahead."],
                ["Tournez à gauche.", "Turn left."],
                ["Tournez à droite.", "Turn right."],
                ["Prenez la première rue à gauche.", "Take the first street on the left."],
                ["Traversez le pont.", "Cross the bridge."],
                ["C'est à deux cents mètres.", "It's two hundred metres away."]
              ]
            },
            "p": [
              "To ask where something is: **Où est… ?** (formal/general) or **Où se trouve… ?** (slightly more polite).",
              "**Pardon, où est la gare, s'il vous plaît ?** (Excuse me, where is the station, please?)"
            ]
          },
          {
            "h": "Les prépositions de lieu",
            "p": [
              "These small words describe **where** something is. They are invariable — they never change form."
            ],
            "table": {
              "headers": ["Preposition", "Meaning", "Example"],
              "rows": [
                ["sur", "on", "Le livre est sur la table."],
                ["sous", "under / beneath", "Le chat est sous la chaise."],
                ["dans", "in / inside", "Les clés sont dans mon sac."],
                ["devant", "in front of", "Il attend devant l'école."],
                ["derrière", "behind", "Le jardin est derrière la maison."],
                ["entre", "between", "La banque est entre le café et la pharmacie."],
                ["à côté de", "next to", "La boulangerie est à côté de la poste."],
                ["en face de", "opposite / across from", "L'hôtel est en face de la gare."],
                ["près de", "near", "Nous habitons près du centre-ville."],
                ["loin de", "far from", "C'est loin de la station ?"]
              ]
            }
          },
          {
            "h": "À l'hôtel et en ville",
            "p": [
              "Key vocabulary for getting around town and checking in to accommodation.",
              "**Je voudrais une chambre, s'il vous plaît.** (I'd like a room, please.)",
              "**Pour combien de nuits ?** (For how many nights?)"
            ],
            "table": {
              "headers": ["French", "English"],
              "rows": [
                ["une chambre", "a (hotel) room"],
                ["la gare", "the (train) station"],
                ["l'aéroport", "the airport"],
                ["l'arrêt de bus", "the bus stop"],
                ["la station de métro", "the metro station"],
                ["l'hôtel", "the hotel"],
                ["la pharmacie", "the chemist / pharmacy"],
                ["la poste", "the post office"],
                ["la banque", "the bank"]
              ]
            }
          }
        ],
        "check": [
          {
            "type": "mcq",
            "q": "« Le métro » means:",
            "opts": ["the bus", "the train", "the underground / metro", "the tram"],
            "ans": 2,
            "exp": "le métro = the underground / metro system."
          },
          {
            "type": "mcq",
            "q": "« En voiture » means:",
            "opts": ["by foot", "by bus", "by car", "by bike"],
            "ans": 2,
            "exp": "en voiture = by car. Use en with most vehicles."
          },
          {
            "type": "mcq",
            "q": "« Tournez à gauche » means:",
            "opts": ["Go straight ahead", "Turn right", "Turn left", "Stop here"],
            "ans": 2,
            "exp": "à gauche = left; à droite = right."
          },
          {
            "type": "mcq",
            "q": "« Tout droit » means:",
            "opts": ["Turn left", "Turn right", "Straight ahead", "Go back"],
            "ans": 2,
            "exp": "tout droit = straight ahead / straight on."
          },
          {
            "type": "mcq",
            "q": "« Le livre est ___ la table. » (on the table)",
            "opts": ["sous", "dans", "sur", "devant"],
            "ans": 2,
            "exp": "sur = on. Le livre est sur la table."
          },
          {
            "type": "mcq",
            "q": "« Le chat est ___ la chaise. » (under the chair)",
            "opts": ["sur", "sous", "dans", "derrière"],
            "ans": 1,
            "exp": "sous = under / beneath. Le chat est sous la chaise."
          }
        ]
      },
      {
        "id": "fr-l17",
        "title": "Examen A1 (type DELF)",
        "icon": "📝",
        "cards": [
          {
            "h": "Compréhension écrite — lisez",
            "p": [
              "Read this short message, then answer the questions that follow.",
              "**« Salut ! Je m'appelle Léa. J'ai 22 ans et je suis française. J'habite à Bordeaux avec ma sœur. J'étudie l'anglais à l'université. Le week-end, j'aime faire du vélo et j'adore le chocolat. Et toi ? À bientôt, Léa. »**"
            ],
            "callout": {
              "kind": "tip",
              "text": "DELF A1 tests greetings, personal info, numbers, time/dates, family, likes, and simple present-tense grammar. Read the text twice before answering."
            }
          },
          {
            "h": "Comment ça marche",
            "p": [
              "This test has 14 questions: reading comprehension, vocabulary, and grammar — like the real DELF A1.",
              "Aim for 70%+ to be confident at A1. Take your time and read each option carefully."
            ]
          }
        ],
        "check": [
          {
            "q": "(Texte) Quel âge a Léa ?",
            "opts": [
              "12 ans",
              "22 ans",
              "20 ans",
              "On ne sait pas"
            ],
            "ans": 1,
            "exp": "« J'ai 22 ans »."
          },
          {
            "q": "(Texte) Où habite Léa ?",
            "opts": [
              "À Paris",
              "À Lyon",
              "À Bordeaux",
              "En Angleterre"
            ],
            "ans": 2,
            "exp": "« J'habite à Bordeaux »."
          },
          {
            "q": "(Texte) Avec qui habite-t-elle ?",
            "opts": [
              "Sa mère",
              "Son frère",
              "Sa sœur",
              "Seule"
            ],
            "ans": 2,
            "exp": "« … avec ma sœur »."
          },
          {
            "q": "(Texte) Qu'est-ce qu'elle étudie ?",
            "opts": [
              "Le français",
              "L'anglais",
              "Les maths",
              "La musique"
            ],
            "ans": 1,
            "exp": "« J'étudie l'anglais »."
          },
          {
            "q": "(Texte) Qu'est-ce qu'elle aime faire le week-end ?",
            "opts": [
              "Faire du vélo",
              "Nager",
              "Jouer au foot",
              "Cuisiner"
            ],
            "ans": 0,
            "exp": "« j'aime faire du vélo »."
          },
          {
            "q": "Choisissez le bon article : « ___ école est grande. »",
            "opts": [
              "Le",
              "La",
              "L'",
              "Les"
            ],
            "ans": 2,
            "exp": "Before a vowel, le/la → l': l'école."
          },
          {
            "q": "« Je ___ pas anglais. » (ne … pas, parler)",
            "opts": [
              "ne parle",
              "ne parle pas",
              "parle ne",
              "ne pas parle"
            ],
            "ans": 1,
            "exp": "Je ne parle pas anglais."
          },
          {
            "q": "Conjuguez : « Nous ___ au cinéma. » (aller)",
            "opts": [
              "allons",
              "allez",
              "vont",
              "va"
            ],
            "ans": 0,
            "exp": "nous allons."
          },
          {
            "q": "Quel est le contraire de « grand » ?",
            "opts": [
              "gros",
              "petit",
              "long",
              "haut"
            ],
            "ans": 1,
            "exp": "petit = small, the opposite of grand."
          },
          {
            "q": "« Il est trois heures et demie » = ",
            "opts": [
              "3:15",
              "3:30",
              "3:45",
              "2:30"
            ],
            "ans": 1,
            "exp": "et demie = half past → 3:30."
          },
          {
            "q": "Choisissez : « J'ai besoin ___ aide. »",
            "opts": [
              "à",
              "de",
              "d'",
              "du"
            ],
            "ans": 2,
            "exp": "avoir besoin de → before a vowel « d' »: besoin d'aide."
          },
          {
            "q": "« Je viens ___ Canada. »",
            "opts": [
              "de",
              "du",
              "des",
              "en"
            ],
            "ans": 1,
            "exp": "le Canada (masculine) → « du Canada »."
          },
          {
            "q": "Le pluriel de « un journal » :",
            "opts": [
              "des journals",
              "des journaux",
              "des journales",
              "des journal"
            ],
            "ans": 1,
            "exp": "-al → -aux: journal → journaux."
          },
          {
            "q": "« Quel temps fait-il ? » — réponse correcte :",
            "opts": [
              "Il est beau",
              "Il fait beau",
              "Il a beau",
              "C'est beau temps"
            ],
            "ans": 1,
            "exp": "Weather uses faire: « Il fait beau »."
          }
        ]
      },
      {
        "id": "fr-l32",
        "title": "Histoire : Au café",
        "icon": "📖",
        "cards": [
          {
            "h": "Au café — lisez l'histoire",
            "p": [
              "Marie entre dans un café à Paris et commande quelque chose. Lisez le dialogue, puis répondez aux questions."
            ],
            "visual": "<div style='background:linear-gradient(135deg,#f0f4ff,#fff);border-left:4px solid #003189;border-radius:10px;padding:16px;font-size:0.9em;line-height:1.9'>\n<div style='color:#003189;font-weight:700;font-size:1em;margin-bottom:10px'>☕ Un café à Paris</div>\n<div style='margin:5px 0'><span style='font-weight:700;color:#555'>Serveur :</span> Bonjour madame ! Vous désirez ?</div>\n<div style='margin:5px 0'><span style='font-weight:700;color:#003189'>Marie :</span> Bonjour ! Je voudrais un café et un croissant, s'il vous plaît.</div>\n<div style='margin:5px 0'><span style='font-weight:700;color:#555'>Serveur :</span> Bien sûr. C'est tout ?</div>\n<div style='margin:5px 0'><span style='font-weight:700;color:#003189'>Marie :</span> Oui, c'est tout. C'est combien ?</div>\n<div style='margin:5px 0'><span style='font-weight:700;color:#555'>Serveur :</span> Ça fait quatre euros cinquante, madame.</div>\n<div style='margin:5px 0'><span style='font-weight:700;color:#003189'>Marie :</span> Voilà. Merci beaucoup !</div>\n<div style='margin:5px 0'><span style='font-weight:700;color:#555'>Serveur :</span> De rien. Bon appétit !</div>\n</div>"
          },
          {
            "h": "Vocabulaire clé",
            "example": {
              "title": "Key words from the story",
              "rows": [
                [
                  "je voudrais",
                  "I would like (polite request)"
                ],
                [
                  "c'est tout ?",
                  "is that everything?"
                ],
                [
                  "c'est combien ?",
                  "how much is it?"
                ],
                [
                  "ça fait…",
                  "it comes to… (for a price)"
                ],
                [
                  "voilà",
                  "here you are (handing something over)"
                ],
                [
                  "bon appétit",
                  "enjoy your meal"
                ]
              ]
            }
          }
        ],
        "check": [
          {
            "q": "Where does this story take place?",
            "opts": [
              "A restaurant",
              "A café",
              "A boulangerie",
              "A supermarket"
            ],
            "ans": 1,
            "exp": "The story is set in a café in Paris."
          },
          {
            "q": "What does Marie order?",
            "opts": [
              "Tea and a cake",
              "Coffee and a croissant",
              "Coffee only",
              "A croissant only"
            ],
            "ans": 1,
            "exp": "Marie says: « Je voudrais un café et un croissant. »"
          },
          {
            "q": "How much does Marie pay?",
            "opts": [
              "€3.50",
              "€4.00",
              "€4.50",
              "€5.00"
            ],
            "ans": 2,
            "exp": "The waiter says: « Ça fait quatre euros cinquante. »"
          },
          {
            "q": "What does the waiter say when Marie has paid?",
            "opts": [
              "Au revoir",
              "Bonne journée",
              "Bon appétit",
              "À bientôt"
            ],
            "ans": 2,
            "exp": "« Bon appétit » = enjoy your meal — a typical farewell in a café or restaurant."
          },
          {
            "q": "What does Marie say when handing over the money?",
            "opts": [
              "S'il vous plaît",
              "Excusez-moi",
              "Voilà",
              "De rien"
            ],
            "ans": 2,
            "exp": "« Voilà » (here you are) is used when handing something over."
          }
        ]
      },
      {
        "id": "fr-l33",
        "title": "Histoire : Ma famille",
        "icon": "📖",
        "cards": [
          {
            "h": "Ma famille — lisez l'histoire",
            "p": [
              "Marie shows her friend Lucie a family photo. Pay attention to être, avoir, ages, and descriptions."
            ],
            "visual": "<div style='background:linear-gradient(135deg,#f0f4ff,#fff);border-left:4px solid #003189;border-radius:10px;padding:16px;font-size:0.9em;line-height:1.9'>\n<div style='color:#003189;font-weight:700;font-size:1em;margin-bottom:10px'>👨‍👩‍👧‍👦 Marie montre une photo à son amie Lucie</div>\n<div style='margin:5px 0'><span style='font-weight:700;color:#003189'>Marie :</span> Regarde, c'est ma famille !</div>\n<div style='margin:5px 0'><span style='font-weight:700;color:#555'>Lucie :</span> Ah, qui est-ce ?</div>\n<div style='margin:5px 0'><span style='font-weight:700;color:#003189'>Marie :</span> C'est mon père. Il s'appelle Paul. Il a cinquante ans.</div>\n<div style='margin:5px 0'><span style='font-weight:700;color:#555'>Lucie :</span> Et là, c'est qui ?</div>\n<div style='margin:5px 0'><span style='font-weight:700;color:#003189'>Marie :</span> C'est ma mère, Sophie. Elle a quarante-huit ans. Elle est médecin.</div>\n<div style='margin:5px 0'><span style='font-weight:700;color:#555'>Lucie :</span> Tu as des frères et sœurs ?</div>\n<div style='margin:5px 0'><span style='font-weight:700;color:#003189'>Marie :</span> Oui, j'ai un frère. Il s'appelle Tom. Il a quinze ans. Il est grand et sportif.</div>\n<div style='margin:5px 0'><span style='font-weight:700;color:#555'>Lucie :</span> Et toi, tu as quel âge ?</div>\n<div style='margin:5px 0'><span style='font-weight:700;color:#003189'>Marie :</span> J'ai dix-neuf ans.</div>\n</div>"
          },
          {
            "h": "Vocabulaire clé",
            "example": {
              "title": "Key words from the story",
              "rows": [
                [
                  "mon père / ma mère",
                  "my father / my mother"
                ],
                [
                  "mon frère / ma sœur",
                  "my brother / my sister"
                ],
                [
                  "il/elle s'appelle …",
                  "his/her name is …"
                ],
                [
                  "il/elle a … ans",
                  "he/she is … years old"
                ],
                [
                  "tu as quel âge ?",
                  "how old are you?"
                ],
                [
                  "grand(e) et sportif/ve",
                  "tall and sporty"
                ]
              ]
            }
          }
        ],
        "check": [
          {
            "q": "How old is Marie's father, Paul?",
            "opts": [
              "45",
              "48",
              "50",
              "55"
            ],
            "ans": 2,
            "exp": "Marie dit : « Il a cinquante ans. » = He is fifty years old."
          },
          {
            "q": "What is Sophie's profession?",
            "opts": [
              "Teacher",
              "Nurse",
              "Doctor",
              "Engineer"
            ],
            "ans": 2,
            "exp": "« Elle est médecin » = she is a doctor."
          },
          {
            "q": "How is Tom described?",
            "opts": [
              "Short and artistic",
              "Tall and sporty",
              "Kind and funny",
              "Young and shy"
            ],
            "ans": 1,
            "exp": "Marie dit : « Il est grand et sportif. »"
          },
          {
            "q": "How old is Marie?",
            "opts": [
              "15",
              "17",
              "19",
              "21"
            ],
            "ans": 2,
            "exp": "Marie dit : « J'ai dix-neuf ans. » = I am nineteen years old."
          },
          {
            "q": "Who is Lucie?",
            "opts": [
              "Marie's sister",
              "Marie's mother",
              "Marie's friend",
              "Marie's teacher"
            ],
            "ans": 2,
            "exp": "The story says « son amie Lucie » = her friend Lucie."
          }
        ]
      }
    ]
  },
  {
    "id": "fr-a2",
    "title": "A2 — Élémentaire",
    "lessons": [
      {
        "id": "fr-l18",
        "title": "Le passé composé — avec « avoir »",
        "icon": "⏪",
        "cards": [
          {
            "h": "Structure",
            "p": [
              "passé composé = **avoir (présent)** + **participe passé**.",
              "**J'ai mangé une pizza.** (I ate / have eaten a pizza.)"
            ],
            "callout": {
              "kind": "key",
              "text": "Most verbs form the passé composé with avoir. A small group uses être (next lesson)."
            }
          },
          {
            "h": "Les participes passés",
            "example": {
              "title": "Forming the past participle",
              "rows": [
                [
                  "-ER → -é",
                  "parler → parlé"
                ],
                [
                  "-IR → -i",
                  "finir → fini"
                ],
                [
                  "-RE → -u",
                  "vendre → vendu"
                ],
                [
                  "irregular",
                  "avoir→eu, être→été, faire→fait, voir→vu"
                ]
              ]
            }
          },
          {
            "h": "Conjugaison complète",
            "example": {
              "title": "regarder (to watch)",
              "rows": [
                [
                  "j'ai regardé",
                  "I watched"
                ],
                [
                  "tu as regardé",
                  "you watched"
                ],
                [
                  "il/elle a regardé",
                  "he/she watched"
                ],
                [
                  "nous avons regardé",
                  "we watched"
                ],
                [
                  "vous avez regardé",
                  "you watched"
                ],
                [
                  "ils/elles ont regardé",
                  "they watched"
                ]
              ]
            }
          },
          {
            "h": "En contexte",
            "p": [
              "**Hier, j'ai travaillé puis j'ai regardé un film.** (Yesterday I worked then watched a film.)",
              "**Elle a fini ses devoirs.** (She finished her homework.)",
              "**Nous avons pris le train à huit heures.** (We took the train at eight.)"
            ],
            "callout": {
              "kind": "tip",
              "text": "Negative wraps the auxiliary: « Je **n'ai pas** mangé »."
            }
          }
        ],
        "check": [
          {
            "q": "« J'ai mangé » uses which auxiliary?",
            "opts": [
              "être",
              "avoir",
              "aller",
              "faire"
            ],
            "ans": 1,
            "exp": "Most verbs use avoir: j'ai mangé."
          },
          {
            "q": "Past participle of « finir »:",
            "opts": [
              "fini",
              "finé",
              "finu",
              "finit"
            ],
            "ans": 0,
            "exp": "-IR verbs → -i: fini."
          },
          {
            "q": "Past participle of « vendre »:",
            "opts": [
              "vendé",
              "vendi",
              "vendu",
              "vendre"
            ],
            "ans": 2,
            "exp": "-RE verbs → -u: vendu."
          },
          {
            "q": "Irregular past participle of « faire »:",
            "opts": [
              "fait",
              "faisé",
              "fais",
              "fé"
            ],
            "ans": 0,
            "exp": "faire → fait (J'ai fait)."
          },
          {
            "q": "Make negative: « J'ai vu le film. »",
            "opts": [
              "Je n'ai pas vu le film",
              "Je n'ai vu pas le film",
              "Je ai pas vu",
              "Je ne vu pas le film"
            ],
            "ans": 0,
            "exp": "ne … pas wraps the auxiliary: je n'ai pas vu."
          },
          {
            "q": "« Nous ___ pris le bus. »",
            "opts": [
              "sommes",
              "avons",
              "ont",
              "avez"
            ],
            "ans": 1,
            "exp": "prendre uses avoir: nous avons pris."
          }
        ]
      },
      {
        "id": "fr-l19",
        "title": "Le passé composé — avec « être »",
        "icon": "🚶",
        "cards": [
          {
            "h": "Les verbes avec être",
            "p": [
              "About 16 verbs of movement / change of state use **être** as the auxiliary in passé composé — not avoir. The mnemonic **DR MRS VANDERTRAMP** names them all."
            ],
            "table": {
              "headers": ["Letter", "Verb", "Meaning", "Past participle"],
              "rows": [
                ["D", "Devenir", "to become", "devenu"],
                ["R", "Revenir", "to come back", "revenu"],
                ["M", "Monter", "to go up / climb", "monté"],
                ["R", "Rester", "to stay", "resté"],
                ["S", "Sortir", "to go out", "sorti"],
                ["V", "Venir", "to come", "venu"],
                ["A", "Aller", "to go", "allé"],
                ["N", "Naître", "to be born", "né"],
                ["D", "Descendre", "to go down", "descendu"],
                ["E", "Entrer", "to enter", "entré"],
                ["R", "Rentrer", "to go back in / return home", "rentré"],
                ["T", "Tomber", "to fall", "tombé"],
                ["R", "Retourner", "to return / go back", "retourné"],
                ["A", "Arriver", "to arrive", "arrivé"],
                ["M", "Mourir", "to die", "mort"],
                ["P", "Partir", "to leave", "parti"]
              ]
            },
            "callout": {
              "kind": "key",
              "text": "All reflexive (pronominal) verbs also take être — see the next card. For VANDERTRAMP verbs, the past participle agrees in gender and number with the subject: il est allé / elle est allée / ils sont allés / elles sont allées."
            }
          },
          {
            "h": "L'accord avec le sujet",
            "example": {
              "title": "aller — agreement",
              "rows": [
                [
                  "il est allé",
                  "he went"
                ],
                [
                  "elle est allée",
                  "she went (+e)"
                ],
                [
                  "ils sont allés",
                  "they went (+s)"
                ],
                [
                  "elles sont allées",
                  "they (f) went (+es)"
                ]
              ]
            },
            "callout": {
              "kind": "key",
              "text": "With être, the past participle **agrees with the subject** in gender and number — like an adjective."
            }
          },
          {
            "h": "Les verbes pronominaux",
            "p": [
              "All reflexive verbs also use être: **Je me suis levé(e).** **Nous nous sommes couché(e)s.**",
              "**Elle s'est réveillée à sept heures.** (She woke up at seven.)"
            ]
          },
          {
            "h": "En contexte",
            "p": [
              "**Il est parti hier soir.** (He left last night.)",
              "**Elles sont arrivées ce matin.** (They [f] arrived this morning.)",
              "**Nous sommes nés en France.** (We were born in France.)"
            ]
          }
        ],
        "check": [
          {
            "q": "« Je suis allé(e) » uses which auxiliary?",
            "opts": [
              "avoir",
              "être",
              "aller",
              "faire"
            ],
            "ans": 1,
            "exp": "aller is a DR MRS VANDERTRAMP verb → être."
          },
          {
            "q": "« Elle est ___ » (partir):",
            "opts": [
              "parti",
              "partie",
              "partis",
              "parties"
            ],
            "ans": 1,
            "exp": "Agreement with feminine subject: elle est partie."
          },
          {
            "q": "Why « arrivées » in « Elles sont arrivées »?",
            "opts": [
              "always added",
              "agreement: feminine plural subject + être",
              "irregular verb",
              "shows the past"
            ],
            "ans": 1,
            "exp": "With être the participle agrees: elles → arrivées (f. pl.)."
          },
          {
            "q": "Reflexive verbs in passé composé use:",
            "opts": [
              "avoir",
              "être",
              "aller",
              "faire"
            ],
            "ans": 1,
            "exp": "All pronominal verbs use être: je me suis levé(e)."
          },
          {
            "q": "Which verb takes être?",
            "opts": [
              "manger",
              "venir",
              "finir",
              "regarder"
            ],
            "ans": 1,
            "exp": "venir is a movement verb (DR MRS VANDERTRAMP) → être."
          },
          {
            "q": "« Nous sommes ___ en 1990. » (naître)",
            "opts": [
              "né",
              "nés",
              "naît",
              "naître"
            ],
            "ans": 1,
            "exp": "naître → né; plural subject « nous » → nés (born)."
          }
        ]
      },
      {
        "id": "fr-l38",
        "title": "Les verbes irréguliers essentiels",
        "icon": "⚙️",
        "cards": [
          {
            "h": "Pourquoi les apprendre ?",
            "p": [
              "Six high-frequency irregular verbs — **vouloir, pouvoir, devoir, savoir, venir, prendre** — appear constantly in French. Their present tense forms don't follow regular -ER/-IR/-RE patterns, so you need to learn them individually.",
              "You already know **être** (fr-l02), **avoir** (fr-l03), **aller** and **faire** (fr-l14). Add these six and you'll have all the key irregular verbs covered."
            ]
          },
          {
            "h": "Vouloir (to want) & Pouvoir (to be able to / can)",
            "table": {
              "headers": ["Pronom", "vouloir", "pouvoir"],
              "rows": [
                ["je", "veux", "peux"],
                ["tu", "veux", "peux"],
                ["il / elle", "veut", "peut"],
                ["nous", "voulons", "pouvons"],
                ["vous", "voulez", "pouvez"],
                ["ils / elles", "veulent", "peuvent"]
              ]
            },
            "callout": {
              "kind": "tip",
              "text": "**Je veux** = I want (direct/strong). **Je voudrais** (conditional) = I would like (polite). Use « voudrais » in shops and restaurants."
            }
          },
          {
            "h": "Devoir (must / to have to) & Savoir (to know how to)",
            "table": {
              "headers": ["Pronom", "devoir", "savoir"],
              "rows": [
                ["je", "dois", "sais"],
                ["tu", "dois", "sais"],
                ["il / elle", "doit", "sait"],
                ["nous", "devons", "savons"],
                ["vous", "devez", "savez"],
                ["ils / elles", "doivent", "savent"]
              ]
            },
            "callout": {
              "kind": "key",
              "text": "**devoir + infinitive** = must/have to: « Je dois partir. » **savoir + infinitive** = to know how to: « Elle sait nager. »"
            }
          },
          {
            "h": "Venir (to come) & Prendre (to take)",
            "table": {
              "headers": ["Pronom", "venir", "prendre"],
              "rows": [
                ["je", "viens", "prends"],
                ["tu", "viens", "prends"],
                ["il / elle", "vient", "prend"],
                ["nous", "venons", "prenons"],
                ["vous", "venez", "prenez"],
                ["ils / elles", "viennent", "prennent"]
              ]
            },
            "p": [
              "Verbs conjugated like **venir**: revenir (to come back), devenir (to become), se souvenir (to remember).",
              "Verbs conjugated like **prendre**: apprendre (to learn), comprendre (to understand), surprendre (to surprise)."
            ]
          },
          {
            "h": "En contexte",
            "example": {
              "title": "Using these verbs",
              "rows": [
                ["Je veux partir maintenant.", "I want to leave now."],
                ["Elle peut venir demain.", "She can come tomorrow."],
                ["Vous devez réserver.", "You must book."],
                ["Il sait parler chinois.", "He knows how to speak Chinese."],
                ["Nous venons de Paris.", "We come from Paris."],
                ["Je prends le bus.", "I take the bus."]
              ]
            }
          }
        ],
        "check": [
          {
            "type": "mcq",
            "q": "« Ils ___ partir maintenant. » (vouloir)",
            "opts": ["veulent", "voulons", "voulez", "veut"],
            "ans": 0,
            "exp": "ils/elles + vouloir → veulent."
          },
          {
            "type": "mcq",
            "q": "« Tu ___ nager ? » (savoir — do you know how to?)",
            "opts": ["sais", "savent", "savons", "sait"],
            "ans": 0,
            "exp": "tu + savoir → sais: Tu sais nager ?"
          },
          {
            "type": "mcq",
            "q": "« Nous ___ prendre le train. » (devoir — must)",
            "opts": ["devons", "doivent", "dois", "doit"],
            "ans": 0,
            "exp": "nous + devoir → devons: Nous devons prendre le train."
          },
          {
            "type": "mcq",
            "q": "« Vous ___ parler ? » (pouvoir — can you?)",
            "opts": ["pouvez", "peuvent", "peux", "peut"],
            "ans": 0,
            "exp": "vous + pouvoir → pouvez."
          },
          {
            "type": "mcq",
            "q": "« Elle ___ le bus tous les matins. » (prendre)",
            "opts": ["prend", "prends", "prenons", "prennent"],
            "ans": 0,
            "exp": "il/elle + prendre → prend."
          },
          {
            "type": "mcq",
            "q": "« Ils ___ de Lyon. » (venir)",
            "opts": ["viennent", "venons", "vient", "venez"],
            "ans": 0,
            "exp": "ils/elles + venir → viennent."
          }
        ]
      },
      {
        "id": "fr-l20",
        "title": "L'imparfait",
        "icon": "🔁",
        "cards": [
          {
            "h": "Formation",
            "p": [
              "Take the **nous** form of the present, drop **-ons**, add the imparfait endings.",
              "parler → nous parl**ons** → je parl**ais**."
            ],
            "example": {
              "title": "Imparfait endings",
              "rows": [
                [
                  "je -ais / tu -ais",
                  "il/elle -ait"
                ],
                [
                  "nous -ions / vous -iez",
                  "ils/elles -aient"
                ]
              ]
            }
          },
          {
            "h": "Le seul irrégulier : être",
            "example": {
              "title": "être à l'imparfait",
              "rows": [
                [
                  "j'étais / tu étais",
                  "il/elle était"
                ],
                [
                  "nous étions / vous étiez",
                  "ils/elles étaient"
                ]
              ]
            }
          },
          {
            "h": "Les emplois",
            "p": [
              "Description in the past: **Il faisait beau et les oiseaux chantaient.**",
              "Habits / repeated actions: **Quand j'étais petit, je jouais au foot.** (When I was little, I used to play football.)",
              "Ongoing background action: **Je dormais quand le téléphone a sonné.**"
            ],
            "callout": {
              "kind": "key",
              "text": "Imparfait = description, habit, « used to / was -ing ». Passé composé = a completed event."
            }
          }
        ],
        "check": [
          {
            "q": "Imparfait is built from which present form?",
            "opts": [
              "je",
              "tu",
              "nous",
              "ils"
            ],
            "ans": 2,
            "exp": "Take the nous form, drop -ons: nous parlons → parl-."
          },
          {
            "q": "« Quand j'étais petit » — which tense?",
            "opts": [
              "passé composé",
              "imparfait",
              "futur",
              "présent"
            ],
            "ans": 1,
            "exp": "j'étais = imparfait of être (description/habit)."
          },
          {
            "q": "Imparfait of « finir » for « je »:",
            "opts": [
              "je finis",
              "je finissais",
              "je finirai",
              "j'ai fini"
            ],
            "ans": 1,
            "exp": "nous finissons → je finissais."
          },
          {
            "q": "Which verb is irregular in the imparfait stem?",
            "opts": [
              "avoir",
              "être",
              "faire",
              "aller"
            ],
            "ans": 1,
            "exp": "être is the only truly irregular stem: j'étais."
          },
          {
            "q": "« Nous (jouer) ___ au parc tous les jours. »",
            "opts": [
              "jouons",
              "jouions",
              "avons joué",
              "jouerons"
            ],
            "ans": 1,
            "exp": "Imparfait nous → -ions: nous jouions (habit)."
          },
          {
            "q": "Choose the imparfait use:",
            "opts": [
              "a single finished action",
              "description / repeated habit in the past",
              "a future plan",
              "a command"
            ],
            "ans": 1,
            "exp": "Imparfait = ongoing description or habitual past."
          }
        ]
      },
      {
        "id": "fr-l21",
        "title": "Imparfait ou passé composé ?",
        "icon": "⚖️",
        "cards": [
          {
            "h": "La grande différence",
            "split": {
              "left": {
                "title": "Imparfait",
                "items": [
                  "Background / description",
                  "Habits (used to)",
                  "Was/were -ing",
                  "No clear end"
                ]
              },
              "right": {
                "title": "Passé composé",
                "items": [
                  "A specific event",
                  "Happened once",
                  "Moves the story on",
                  "Has a clear end"
                ]
              }
            }
          },
          {
            "h": "Les deux ensemble",
            "p": [
              "Often a passé composé event **interrupts** an imparfait background:",
              "**Je dormais (imp) quand le téléphone a sonné (pc).** (I was sleeping when the phone rang.)",
              "**Il pleuvait, alors nous sommes restés à la maison.** (It was raining, so we stayed home.)"
            ],
            "callout": {
              "kind": "tip",
              "text": "Signal words: *souvent, toujours, tous les jours, d'habitude* → imparfait. *soudain, hier, un jour, à 8 heures* → passé composé."
            }
          },
          {
            "h": "Mini-récit",
            "p": [
              "**Hier, il faisait froid. Je suis allé au café. J'ai pris un chocolat chaud pendant que je lisais mon livre.**",
              "(Yesterday it was cold. I went to the café. I had a hot chocolate while I was reading my book.)"
            ]
          }
        ],
        "check": [
          {
            "q": "« Je (dormir) ___ quand tu as téléphoné. »",
            "opts": [
              "ai dormi",
              "dormais",
              "dormirai",
              "dors"
            ],
            "ans": 1,
            "exp": "Background ongoing action = imparfait: je dormais."
          },
          {
            "q": "« Soudain, il (entrer) ___. »",
            "opts": [
              "entrait",
              "est entré",
              "entre",
              "entrera"
            ],
            "ans": 1,
            "exp": "« Soudain » signals a single event → passé composé: il est entré."
          },
          {
            "q": "Which signals the imparfait?",
            "opts": [
              "hier",
              "soudain",
              "tous les jours",
              "à midi"
            ],
            "ans": 2,
            "exp": "« tous les jours » (every day) marks a habit → imparfait."
          },
          {
            "q": "« Tous les étés, nous (aller) ___ à la mer. »",
            "opts": [
              "sommes allés",
              "allions",
              "irons",
              "allons"
            ],
            "ans": 1,
            "exp": "Repeated habit → imparfait: nous allions."
          },
          {
            "q": "« Quand je suis arrivé, il (pleuvoir) ___. »",
            "opts": [
              "a plu",
              "pleuvait",
              "pleuvra",
              "pleut"
            ],
            "ans": 1,
            "exp": "Description/background = imparfait: il pleuvait."
          },
          {
            "q": "Passé composé is used for:",
            "opts": [
              "a description",
              "a habit",
              "a completed event that moves the story",
              "the weather background"
            ],
            "ans": 2,
            "exp": "Passé composé = a specific, completed action."
          }
        ]
      },
      {
        "id": "fr-l22",
        "title": "Le futur proche et le futur simple",
        "icon": "⏩",
        "cards": [
          {
            "h": "Le futur proche (going to)",
            "p": [
              "**aller (présent) + infinitif** = near future.",
              "**Je vais manger.** (I'm going to eat.) · **Nous allons partir.** (We're going to leave.)"
            ],
            "callout": {
              "kind": "tip",
              "text": "Futur proche feels immediate/planned; futur simple feels more distant or formal."
            }
          },
          {
            "h": "Le futur simple — formation",
            "p": [
              "Add endings to the **infinitive** (drop final -e of -RE verbs).",
              "Endings: **-ai, -as, -a, -ons, -ez, -ont** (they echo « avoir »)."
            ],
            "example": {
              "title": "parler — futur simple",
              "rows": [
                [
                  "je parlerai / tu parleras",
                  "il/elle parlera"
                ],
                [
                  "nous parlerons / vous parlerez",
                  "ils/elles parleront"
                ]
              ]
            }
          },
          {
            "h": "Radicaux irréguliers",
            "example": {
              "title": "Common irregular stems",
              "rows": [
                [
                  "être → ser-",
                  "je serai"
                ],
                [
                  "avoir → aur-",
                  "j'aurai"
                ],
                [
                  "aller → ir-",
                  "j'irai"
                ],
                [
                  "faire → fer-",
                  "je ferai"
                ],
                [
                  "venir → viendr-",
                  "je viendrai"
                ]
              ]
            }
          },
          {
            "h": "En contexte",
            "p": [
              "**Demain, je vais visiter le musée.** (futur proche)",
              "**L'année prochaine, nous habiterons à Nice.** (futur simple)",
              "**Quand il sera grand, il deviendra médecin.**"
            ]
          }
        ],
        "check": [
          {
            "q": "« Je vais manger » is the:",
            "opts": [
              "passé composé",
              "futur proche",
              "futur simple",
              "imparfait"
            ],
            "ans": 1,
            "exp": "aller + infinitive = futur proche."
          },
          {
            "q": "Futur simple of « parler » for « nous »:",
            "opts": [
              "parlons",
              "parlerons",
              "parlions",
              "avons parlé"
            ],
            "ans": 1,
            "exp": "infinitive + -ons: nous parlerons."
          },
          {
            "q": "Futur simple stem of « être »:",
            "opts": [
              "êtr-",
              "ser-",
              "étai-",
              "est-"
            ],
            "ans": 1,
            "exp": "être → ser-: je serai."
          },
          {
            "q": "« j'___ » future of « avoir »:",
            "opts": [
              "aurai",
              "avrai",
              "aurais",
              "aierai"
            ],
            "ans": 0,
            "exp": "avoir → aur-: j'aurai."
          },
          {
            "q": "Futur simple of « aller » for « je »:",
            "opts": [
              "allerai",
              "irai",
              "vais",
              "allais"
            ],
            "ans": 1,
            "exp": "aller → ir-: j'irai."
          },
          {
            "q": "Endings of the futur simple resemble which verb?",
            "opts": [
              "être",
              "avoir",
              "faire",
              "aller"
            ],
            "ans": 1,
            "exp": "-ai, -as, -a, -ons, -ez, -ont echo avoir."
          }
        ]
      },
      {
        "id": "fr-l23",
        "title": "Les verbes pronominaux",
        "icon": "🪞",
        "cards": [
          {
            "h": "Qu'est-ce qu'un verbe pronominal ?",
            "p": [
              "These verbs take an extra reflexive pronoun (me, te, se, nous, vous, se).",
              "**se laver** (to wash oneself), **se lever** (to get up), **s'appeler** (to be called)."
            ],
            "example": {
              "title": "se laver — présent",
              "rows": [
                [
                  "je me lave / tu te laves",
                  "il/elle se lave"
                ],
                [
                  "nous nous lavons / vous vous lavez",
                  "ils/elles se lavent"
                ]
              ]
            }
          },
          {
            "h": "La routine quotidienne",
            "p": [
              "**Je me réveille à 7 h, je me lève, je me douche et je m'habille.**",
              "(I wake up at 7, get up, shower and get dressed.)",
              "se coucher (go to bed), se reposer (rest), se dépêcher (hurry)."
            ]
          },
          {
            "h": "Au passé composé",
            "p": [
              "Pronominal verbs use **être**, and the participle usually agrees with the subject.",
              "**Elle s'est levée tôt.** · **Ils se sont couchés tard.**"
            ],
            "callout": {
              "kind": "warning",
              "text": "Don't forget the reflexive pronoun in the past: « je **me** suis levé(e) », not « je suis levé »."
            }
          }
        ],
        "check": [
          {
            "q": "« se lever » means:",
            "opts": [
              "to wash",
              "to get up",
              "to go to bed",
              "to hurry"
            ],
            "ans": 1,
            "exp": "se lever = to get (oneself) up."
          },
          {
            "q": "« Tu ___ laves. » (se laver)",
            "opts": [
              "me",
              "te",
              "se",
              "vous"
            ],
            "ans": 1,
            "exp": "tu → te: tu te laves."
          },
          {
            "q": "« Nous ___ levons. »",
            "opts": [
              "nous",
              "vous",
              "se",
              "me"
            ],
            "ans": 0,
            "exp": "nous → nous: nous nous levons."
          },
          {
            "q": "Pronominal verbs in passé composé use:",
            "opts": [
              "avoir",
              "être",
              "aller",
              "faire"
            ],
            "ans": 1,
            "exp": "They always use être: je me suis levé(e)."
          },
          {
            "q": "« Elle s'est ___ tôt. » (se lever)",
            "opts": [
              "levé",
              "levée",
              "levés",
              "lever"
            ],
            "ans": 1,
            "exp": "Agreement with feminine subject: levée."
          },
          {
            "q": "« Je m'appelle Marc » — « m' » is a:",
            "opts": [
              "article",
              "reflexive pronoun",
              "negative",
              "preposition"
            ],
            "ans": 1,
            "exp": "s'appeler is pronominal; « m' » is the reflexive pronoun."
          }
        ]
      },
      {
        "id": "fr-l24",
        "title": "Les pronoms COD et COI",
        "icon": "🔄",
        "cards": [
          {
            "h": "Pronoms COD (direct object)",
            "example": {
              "title": "me / te / le / la / nous / vous / les",
              "rows": [
                [
                  "le / la / les",
                  "him/it · her/it · them"
                ],
                [
                  "Tu vois Marie ? — Oui, je la vois.",
                  "Yes, I see her."
                ],
                [
                  "Tu aimes les films ? — Je les aime.",
                  "I like them."
                ]
              ]
            },
            "callout": {
              "kind": "key",
              "text": "The object pronoun goes **before the verb**: « Je le mange », not « Je mange le »."
            }
          },
          {
            "h": "Pronoms COI (indirect object — « à »)",
            "example": {
              "title": "me / te / lui / nous / vous / leur",
              "rows": [
                [
                  "lui",
                  "to him / to her"
                ],
                [
                  "leur",
                  "to them"
                ],
                [
                  "Je parle à Paul. → Je lui parle.",
                  "I speak to him."
                ],
                [
                  "Je téléphone à mes amis. → Je leur téléphone.",
                  "I call them."
                ]
              ]
            }
          },
          {
            "h": "Comment choisir ?",
            "p": [
              "Verb + **direct** noun (no preposition) → COD: voir, aimer, manger, regarder.",
              "Verb + **à** + person → COI: parler à, téléphoner à, donner à, écrire à.",
              "**Je donne le livre à Marie. → Je le lui donne.** (I give it to her.)"
            ],
            "callout": {
              "kind": "tip",
              "text": "In the passé composé, a COD before avoir makes the participle agree: « Les fleurs ? Je les ai achetées. »"
            }
          }
        ],
        "check": [
          {
            "q": "« Tu vois Marie ? — Oui, je ___ vois. »",
            "opts": [
              "le",
              "la",
              "lui",
              "les"
            ],
            "ans": 1,
            "exp": "Marie = feminine direct object → la."
          },
          {
            "q": "« Je parle à Paul. → Je ___ parle. »",
            "opts": [
              "le",
              "la",
              "lui",
              "les"
            ],
            "ans": 2,
            "exp": "parler à + person → COI: lui."
          },
          {
            "q": "Where does the object pronoun go?",
            "opts": [
              "after the verb",
              "before the verb",
              "at the end",
              "after the subject only"
            ],
            "ans": 1,
            "exp": "Object pronouns precede the conjugated verb: je le vois."
          },
          {
            "q": "« Je téléphone à mes parents. → Je ___ téléphone. »",
            "opts": [
              "les",
              "leur",
              "lui",
              "le"
            ],
            "ans": 1,
            "exp": "téléphoner à + plural people → leur."
          },
          {
            "q": "Which verb takes a COI (à + person)?",
            "opts": [
              "regarder",
              "aimer",
              "donner à",
              "voir"
            ],
            "ans": 2,
            "exp": "donner à quelqu'un = indirect → COI."
          },
          {
            "q": "« Les fleurs ? Je les ai ___. » (acheter)",
            "opts": [
              "acheté",
              "achetée",
              "achetés",
              "achetées"
            ],
            "ans": 3,
            "exp": "COD « les » (fleurs, f.pl.) before avoir → agreement: achetées."
          }
        ]
      },
      {
        "id": "fr-l25",
        "title": "Le comparatif et le superlatif",
        "icon": "📊",
        "cards": [
          {
            "h": "Le comparatif",
            "example": {
              "title": "plus / moins / aussi … que",
              "rows": [
                [
                  "plus … que",
                  "Paul est plus grand que Marc. (taller than)"
                ],
                [
                  "moins … que",
                  "Il est moins rapide que toi. (less fast than)"
                ],
                [
                  "aussi … que",
                  "Elle est aussi gentille que sa sœur. (as … as)"
                ]
              ]
            }
          },
          {
            "h": "Le superlatif",
            "p": [
              "**le / la / les + plus / moins + adjectif (+ de…)**",
              "**C'est le plus grand musée de Paris.** (the biggest museum in Paris.)",
              "**C'est la ville la plus belle du monde.** (adjective after noun keeps its position.)"
            ],
            "callout": {
              "kind": "key",
              "text": "« de » after a superlative = « in »: le meilleur restaurant **de** la ville = the best restaurant **in** town."
            }
          },
          {
            "h": "Irréguliers : bon et bien",
            "example": {
              "title": "Special comparatives",
              "rows": [
                [
                  "bon → meilleur",
                  "good → better"
                ],
                [
                  "le meilleur",
                  "the best (adjective)"
                ],
                [
                  "bien → mieux",
                  "well → better"
                ],
                [
                  "le mieux",
                  "the best (adverb)"
                ]
              ]
            },
            "p": [
              "**Ce gâteau est meilleur que l'autre.** · **Elle chante mieux que moi.**"
            ]
          }
        ],
        "check": [
          {
            "q": "« Paul est ___ grand ___ Marc. » (taller than)",
            "opts": [
              "plus … que",
              "moins … que",
              "aussi … que",
              "très … de"
            ],
            "ans": 0,
            "exp": "Comparative of superiority: plus … que."
          },
          {
            "q": "« as tall as » =",
            "opts": [
              "plus grand que",
              "moins grand que",
              "aussi grand que",
              "le plus grand"
            ],
            "ans": 2,
            "exp": "Equality: aussi … que."
          },
          {
            "q": "Comparative of « bon »:",
            "opts": [
              "plus bon",
              "meilleur",
              "mieux",
              "le bon"
            ],
            "ans": 1,
            "exp": "bon → meilleur (irregular). Never « plus bon »."
          },
          {
            "q": "« She sings better than me » — choose:",
            "opts": [
              "plus bon que",
              "meilleur que",
              "mieux que",
              "aussi bien que"
            ],
            "ans": 2,
            "exp": "bien → mieux (adverb): elle chante mieux que moi."
          },
          {
            "q": "« the most beautiful city » =",
            "opts": [
              "plus belle ville",
              "la ville la plus belle",
              "la belle plus ville",
              "ville plus belle"
            ],
            "ans": 1,
            "exp": "Superlative keeps the adjective's position: la ville la plus belle."
          },
          {
            "q": "After a superlative, « in the town » =",
            "opts": [
              "dans la ville",
              "à la ville",
              "de la ville",
              "en ville"
            ],
            "ans": 2,
            "exp": "Superlative + de: le meilleur … de la ville."
          }
        ]
      },
      {
        "id": "fr-l42",
        "title": "Les vêtements et le shopping",
        "icon": "🛍️",
        "cards": [
          {
            "h": "Les vêtements — clothing vocabulary",
            "p": [
              "Note that items that are always plural use **des**: *des chaussures*, *des baskets*, *des chaussettes*, *des gants*."
            ],
            "table": {
              "headers": ["French", "English"],
              "rows": [
                ["un manteau", "a coat"],
                ["une veste", "a jacket"],
                ["un pull", "a jumper / sweater"],
                ["une chemise", "a shirt"],
                ["un t-shirt", "a t-shirt"],
                ["un jean", "jeans"],
                ["un pantalon", "trousers"],
                ["une jupe", "a skirt"],
                ["une robe", "a dress"],
                ["des chaussures", "shoes"],
                ["des baskets", "trainers / sneakers"],
                ["des chaussettes", "socks"],
                ["un chapeau", "a hat"],
                ["une écharpe", "a scarf"],
                ["des gants", "gloves"]
              ]
            }
          },
          {
            "h": "Faire du shopping — shopping phrases",
            "table": {
              "headers": ["French phrase", "English meaning"],
              "rows": [
                ["Je cherche…", "I'm looking for…"],
                ["Vous avez ça en quelle taille ?", "What size do you have it in?"],
                ["C'est trop grand.", "It's too big."],
                ["C'est trop petit.", "It's too small."],
                ["C'est trop cher.", "It's too expensive."],
                ["Je vais le/la prendre.", "I'll take it."],
                ["Vous acceptez les cartes ?", "Do you take cards?"]
              ]
            },
            "p": [
              "Sizes: XS, S, M, L, XL / **pointure** (shoe size)."
            ]
          },
          {
            "h": "Les magasins — types of shops",
            "p": [
              "**une boutique** — boutique / small shop",
              "**un grand magasin** — department store",
              "**un marché** — market",
              "**une pharmacie** — pharmacy",
              "**une boulangerie** — bakery",
              "**une épicerie** — grocer's",
              "**une librairie** — bookshop (NOT a library!)",
              "Je vais à la boulangerie. / Je vais au marché."
            ],
            "callout": {
              "kind": "key",
              "text": "une librairie = a bookshop; une bibliothèque = a library. A classic false friend!"
            }
          }
        ],
        "check": [
          {
            "type": "mcq",
            "q": "\"Un pantalon\" means:",
            "opts": ["a shirt", "trousers", "a skirt", "a coat"],
            "ans": 1,
            "exp": "Un pantalon = trousers."
          },
          {
            "type": "mcq",
            "q": "\"Je cherche une veste\" means:",
            "opts": ["I'm buying a jacket", "I'm looking for a jacket", "I found a jacket", "I need a coat"],
            "ans": 1,
            "exp": "Je cherche = I'm looking for. Une veste = a jacket."
          },
          {
            "type": "mcq",
            "q": "\"C'est trop cher\" means:",
            "opts": ["It's too big", "It's too small", "It's too expensive", "It's on sale"],
            "ans": 2,
            "exp": "Cher = expensive. C'est trop cher = It's too expensive."
          },
          {
            "type": "mcq",
            "q": "\"Une librairie\" is:",
            "opts": ["a library", "a bookshop", "a pharmacy", "a grocery"],
            "ans": 1,
            "exp": "Une librairie = a bookshop. Une bibliothèque = a library. Classic false friend!"
          },
          {
            "type": "mcq",
            "q": "\"Je vais le prendre\" means:",
            "opts": ["I'm going to try it", "I'll take it", "I like it", "I want to return it"],
            "ans": 1,
            "exp": "Je vais le prendre = I'll take it (near future: aller + infinitive)."
          },
          {
            "type": "mcq",
            "q": "\"Vous avez ça en quelle taille ?\" asks about:",
            "opts": ["the price", "the colour", "the size", "the material"],
            "ans": 2,
            "exp": "Taille = size. The phrase asks what size you have it in."
          }
        ]
      },
      {
        "id": "fr-l43",
        "title": "Le travail et la vie professionnelle",
        "icon": "💼",
        "cards": [
          {
            "h": "Les métiers — professions",
            "p": [
              "Many professions now have both masculine and feminine forms. Some are invariable (same for both genders)."
            ],
            "table": {
              "headers": ["Métier", "Masculine", "Feminine"],
              "rows": [
                ["doctor", "un médecin", "une médecin"],
                ["nurse", "un infirmier", "une infirmière"],
                ["teacher", "un professeur", "une professeure"],
                ["engineer", "un ingénieur", "une ingénieure"],
                ["lawyer", "un avocat", "une avocate"],
                ["accountant", "un comptable", "une comptable"],
                ["manager", "un directeur", "une directrice"],
                ["salesperson", "un vendeur", "une vendeuse"],
                ["cook / chef", "un cuisinier", "une cuisinière"]
              ]
            }
          },
          {
            "h": "Au bureau — workplace vocabulary",
            "p": [
              "**un bureau** — office / desk",
              "**un/une collègue** — colleague",
              "**une réunion** — meeting",
              "**un projet** — project",
              "**un rapport** — report",
              "**un e-mail / un courriel** — email",
              "**les heures supplémentaires** — overtime",
              "**Je travaille à mi-temps.** — I work part-time.",
              "**Je travaille à temps plein.** — I work full-time.",
              "**Je télétravaille.** — I work from home.",
              "**Je suis en réunion.** — I'm in a meeting."
            ]
          },
          {
            "h": "Parler de son travail — talking about your job",
            "p": [
              "**Qu'est-ce que vous faites dans la vie ?** / **Vous faites quoi comme travail ?** — What do you do for a living?",
              "Use **Je suis + profession** (NO article): *Je suis comptable.* / *Elle est médecin.*",
              "Use **Je travaille dans + sector**: *Je travaille dans la finance / l'éducation / la santé.*"
            ],
            "callout": {
              "kind": "key",
              "text": "With être + profession, drop the article: Je suis ingénieur (not 'un ingénieur')."
            }
          }
        ],
        "check": [
          {
            "type": "mcq",
            "q": "\"Un infirmier / une infirmière\" is:",
            "opts": ["a doctor", "a nurse", "a pharmacist", "a dentist"],
            "ans": 1,
            "exp": "Un infirmier / une infirmière = a nurse."
          },
          {
            "type": "mcq",
            "q": "\"Je suis avocat\" — why is there no article?",
            "opts": ["être + profession never uses an article", "avocat is uncountable", "It's informal speech", "Masculine nouns drop the article"],
            "ans": 0,
            "exp": "With être + profession, no article is used: Je suis avocat, Elle est médecin."
          },
          {
            "type": "mcq",
            "q": "\"Je travaille à mi-temps\" means:",
            "opts": ["I work full-time", "I work part-time", "I work from home", "I'm unemployed"],
            "ans": 1,
            "exp": "À mi-temps = part-time. À temps plein = full-time."
          },
          {
            "type": "mcq",
            "q": "\"Une réunion\" means:",
            "opts": ["a project", "a report", "a meeting", "a deadline"],
            "ans": 2,
            "exp": "Une réunion = a meeting."
          },
          {
            "type": "mcq",
            "q": "\"Je télétravaille\" means:",
            "opts": ["I work overtime", "I work from home", "I travel for work", "I work in IT"],
            "ans": 1,
            "exp": "Télétravailler = to work from home / remotely."
          },
          {
            "type": "mcq",
            "q": "\"Je travaille dans la santé\" means I work in:",
            "opts": ["finance", "education", "health", "sales"],
            "ans": 2,
            "exp": "La santé = health. Je travaille dans la santé = I work in health/healthcare."
          }
        ]
      },
      {
        "id": "fr-l26",
        "title": "Examen A2 (type DELF)",
        "icon": "📝",
        "cards": [
          {
            "h": "Compréhension écrite — lisez",
            "p": [
              "Read this email, then answer the questions.",
              "**« Salut Thomas, le week-end dernier, je suis allé à la montagne avec ma famille. Il faisait froid mais il y avait du soleil. Samedi, nous avons fait du ski toute la journée. Le soir, j'étais très fatigué, alors je me suis couché tôt. Dimanche, nous sommes rentrés à Lyon. C'était un super week-end ! Bientôt, je vais t'envoyer les photos. Amitiés, Julien. »**"
            ],
            "callout": {
              "kind": "tip",
              "text": "A2 adds past tenses (passé composé / imparfait), near future, reflexive verbs, and comparisons. Watch for time markers."
            }
          },
          {
            "h": "Comment ça marche",
            "p": [
              "14 questions covering reading comprehension and A2 grammar. Aim for 70%+."
            ]
          }
        ],
        "check": [
          {
            "q": "(Texte) Où est allé Julien ?",
            "opts": [
              "À la mer",
              "À la montagne",
              "À Paris",
              "À la campagne"
            ],
            "ans": 1,
            "exp": "« je suis allé à la montagne »."
          },
          {
            "q": "(Texte) Quel temps faisait-il ?",
            "opts": [
              "Il pleuvait",
              "Il faisait froid avec du soleil",
              "Il neigeait beaucoup",
              "Il faisait chaud"
            ],
            "ans": 1,
            "exp": "« Il faisait froid mais il y avait du soleil »."
          },
          {
            "q": "(Texte) Qu'ont-ils fait samedi ?",
            "opts": [
              "Du ski",
              "De la natation",
              "Du vélo",
              "Rien"
            ],
            "ans": 0,
            "exp": "« nous avons fait du ski toute la journée »."
          },
          {
            "q": "(Texte) Pourquoi s'est-il couché tôt ?",
            "opts": [
              "Il était malade",
              "Il était fatigué",
              "Il avait un train",
              "Il n'aime pas la nuit"
            ],
            "ans": 1,
            "exp": "« j'étais très fatigué, alors je me suis couché tôt »."
          },
          {
            "q": "(Texte) Que va-t-il faire bientôt ?",
            "opts": [
              "Retourner à la montagne",
              "Envoyer les photos",
              "Téléphoner",
              "Faire du ski"
            ],
            "ans": 1,
            "exp": "« je vais t'envoyer les photos » (futur proche)."
          },
          {
            "q": "Choisissez l'auxiliaire : « Elle ___ arrivée hier. »",
            "opts": [
              "a",
              "est",
              "va",
              "fait"
            ],
            "ans": 1,
            "exp": "arriver = être verb: elle est arrivée."
          },
          {
            "q": "Participe passé de « prendre » :",
            "opts": [
              "prendu",
              "prit",
              "pris",
              "prené"
            ],
            "ans": 2,
            "exp": "prendre → pris (j'ai pris)."
          },
          {
            "q": "« Quand j'étais jeune, je ___ au foot. » (jouer)",
            "opts": [
              "ai joué",
              "jouais",
              "jouerai",
              "joue"
            ],
            "ans": 1,
            "exp": "Habit in the past → imparfait: je jouais."
          },
          {
            "q": "« Tu vois Marie ? — Oui, je ___ vois. »",
            "opts": [
              "le",
              "la",
              "lui",
              "les"
            ],
            "ans": 1,
            "exp": "Marie = COD feminine → la."
          },
          {
            "q": "Comparatif de « bon » :",
            "opts": [
              "plus bon",
              "meilleur",
              "mieux",
              "très bon"
            ],
            "ans": 1,
            "exp": "bon → meilleur."
          },
          {
            "q": "« Je me suis ___ tôt. » (se lever, féminin)",
            "opts": [
              "levé",
              "levée",
              "levés",
              "lever"
            ],
            "ans": 1,
            "exp": "Pronominal + feminine subject → levée."
          },
          {
            "q": "Futur simple : « Demain, nous ___ à Nice. » (aller)",
            "opts": [
              "allons",
              "irons",
              "allions",
              "allés"
            ],
            "ans": 1,
            "exp": "aller → ir-: nous irons."
          },
          {
            "q": "« Je parle à mes amis → Je ___ parle. »",
            "opts": [
              "les",
              "leur",
              "lui",
              "le"
            ],
            "ans": 1,
            "exp": "parler à + plural people → leur."
          },
          {
            "q": "« C'est le restaurant le plus cher ___ la ville. »",
            "opts": [
              "à",
              "en",
              "de",
              "dans"
            ],
            "ans": 2,
            "exp": "Superlative + de = in: de la ville."
          }
        ]
      },
      {
        "id": "fr-l34",
        "title": "Histoire : Le week-end dernier",
        "icon": "📖",
        "cards": [
          {
            "h": "Le week-end dernier — lisez l'histoire",
            "p": [
              "Emma tells her colleague about last weekend. **Notice the passé composé** — some verbs use avoir, some use être."
            ],
            "visual": "<div style='background:linear-gradient(135deg,#fff8f0,#fff);border-left:4px solid #b45309;border-radius:10px;padding:16px;font-size:0.9em;line-height:1.9'>\n<div style='color:#b45309;font-weight:700;font-size:1em;margin-bottom:10px'>📅 Lundi matin — au bureau</div>\n<div style='margin:5px 0'><span style='font-weight:700;color:#555'>Claire :</span> Salut Emma ! Tu as passé un bon week-end ?</div>\n<div style='margin:5px 0'><span style='font-weight:700;color:#b45309'>Emma :</span> Oui, excellent ! Samedi, <strong>je suis allée</strong> au marché avec ma sœur.</div>\n<div style='margin:5px 0'><span style='font-weight:700;color:#555'>Claire :</span> Ah oui ? Vous avez acheté quoi ?</div>\n<div style='margin:5px 0'><span style='font-weight:700;color:#b45309'>Emma :</span> On <strong>a acheté</strong> des fruits, du fromage et une belle tarte aux pommes.</div>\n<div style='margin:5px 0'><span style='font-weight:700;color:#555'>Claire :</span> Et dimanche ?</div>\n<div style='margin:5px 0'><span style='font-weight:700;color:#b45309'>Emma :</span> <strong>Je suis restée</strong> à la maison le matin. <strong>J'ai regardé</strong> un film et <strong>j'ai fait</strong> du sport. Le soir, on <strong>est allés</strong> au restaurant avec des amis.</div>\n<div style='margin:5px 0'><span style='font-weight:700;color:#555'>Claire :</span> Super ! C'était quel restaurant ?</div>\n<div style='margin:5px 0'><span style='font-weight:700;color:#b45309'>Emma :</span> Un petit bistrot près de chez moi. On a très bien mangé !</div>\n</div>"
          },
          {
            "h": "Grammaire : être ou avoir ?",
            "p": [
              "The highlighted verbs above are all **passé composé**. Two patterns:"
            ],
            "split": {
              "left": {
                "title": "avec avoir",
                "items": [
                  "j'ai regardé (I watched)",
                  "j'ai fait (I did)",
                  "on a acheté (we bought)",
                  "on a mangé (we ate)"
                ]
              },
              "right": {
                "title": "avec être (mouvement)",
                "items": [
                  "je suis allée (I went — fem.)",
                  "je suis restée (I stayed — fem.)",
                  "on est allés (we went — masc. pl.)"
                ]
              }
            },
            "callout": {
              "kind": "key",
              "text": "Verbs of movement/state (aller, venir, partir, rester, arriver…) take être. The past participle agrees with the subject in gender and number."
            }
          }
        ],
        "check": [
          {
            "q": "Where did Emma go on Saturday?",
            "opts": [
              "The supermarket",
              "The market",
              "The park",
              "The cinema"
            ],
            "ans": 1,
            "exp": "Emma dit : « je suis allée au marché »."
          },
          {
            "q": "Which item did Emma NOT buy at the market?",
            "opts": [
              "Fruit",
              "Cheese",
              "An apple tart",
              "Bread"
            ],
            "ans": 3,
            "exp": "They bought des fruits, du fromage and une tarte aux pommes — not bread."
          },
          {
            "q": "What did Emma do on Sunday morning?",
            "opts": [
              "She went to the market",
              "She visited friends",
              "She stayed home and watched a film",
              "She went to the restaurant"
            ],
            "ans": 2,
            "exp": "Emma dit : « Je suis restée à la maison. J'ai regardé un film et j'ai fait du sport. »"
          },
          {
            "q": "Why is « suis allée » used instead of « ai allé » ?",
            "opts": [
              "Aller uses être in passé composé",
              "Emma is talking about the future",
              "It is a reflexive verb",
              "The sentence is negative"
            ],
            "ans": 0,
            "exp": "Aller is one of the 17 verbs that take être in passé composé. The -e on allée agrees with Emma (feminine)."
          },
          {
            "q": "With whom did Emma go to the restaurant on Sunday evening?",
            "opts": [
              "Her sister",
              "Her colleagues",
              "Her friends",
              "Her parents"
            ],
            "ans": 2,
            "exp": "Emma dit : « on est allés au restaurant avec des amis »."
          }
        ]
      },
      {
        "id": "fr-l35",
        "title": "Histoire : Lettre de Lyon",
        "icon": "📖",
        "cards": [
          {
            "h": "Lettre de Lyon — lisez l'histoire",
            "p": [
              "Camille has moved from Paris to Lyon. She writes to her friend Sophie. **Imparfait** describes past habits and states; **passé composé** marks single events."
            ],
            "visual": "<div style='background:linear-gradient(135deg,#fff8f0,#fff);border-left:4px solid #b45309;border-radius:10px;padding:16px;font-size:0.9em;line-height:1.9'>\n<div style='color:#b45309;font-weight:700;font-size:1em;margin-bottom:10px'>✉️ Une lettre de Camille</div>\n<p style='margin:8px 0;font-style:italic'>Chère Sophie,</p>\n<p style='margin:8px 0'>Je t'écris de Lyon ! <strong>Je suis arrivée</strong> ici il y a deux semaines pour mon nouveau travail.</p>\n<p style='margin:8px 0'>Quand <strong>j'habitais</strong> à Paris, <strong>je prenais</strong> le métro tous les jours. <strong>C'était</strong> stressant et cher. Ici, à Lyon, je prends le vélo. C'est beaucoup plus agréable !</p>\n<p style='margin:8px 0'>La semaine dernière, <strong>j'ai visité</strong> le Vieux-Lyon avec une collègue. Les rues <strong>étaient</strong> magnifiques et les traboules <strong>étaient</strong> fascinantes. On <strong>a mangé</strong> une quenelle lyonnaise — c'était délicieux !</p>\n<p style='margin:8px 0'>Lyon est <em>moins grand que</em> Paris, mais c'est <em>plus calme</em> et les gens sont très accueillants.</p>\n<p style='margin:8px 0;font-style:italic'>Bisous, Camille</p>\n</div>"
          },
          {
            "h": "Grammaire dans l'histoire",
            "p": [
              "Spot the difference between **imparfait** (ongoing past habit/state) and **passé composé** (single event):"
            ],
            "split": {
              "left": {
                "title": "imparfait (habitude / état)",
                "items": [
                  "j'habitais (I used to live)",
                  "je prenais le métro (I used to take)",
                  "c'était stressant (it was stressful)",
                  "les rues étaient (the streets were)"
                ]
              },
              "right": {
                "title": "passé composé (événement)",
                "items": [
                  "je suis arrivée (I arrived)",
                  "j'ai visité (I visited)",
                  "on a mangé (we ate)"
                ]
              }
            },
            "callout": {
              "kind": "tip",
              "text": "Comparisons: « moins … que » (less than), « plus … que » (more than). Lyon est moins grand que Paris = Lyon is less big than Paris."
            }
          }
        ],
        "check": [
          {
            "q": "How long has Camille been in Lyon?",
            "opts": [
              "One week",
              "Two weeks",
              "One month",
              "Three weeks"
            ],
            "ans": 1,
            "exp": "« il y a deux semaines » = two weeks ago."
          },
          {
            "q": "How did Camille commute when she lived in Paris?",
            "opts": [
              "By bike",
              "By car",
              "By metro",
              "On foot"
            ],
            "ans": 2,
            "exp": "« je prenais le métro tous les jours » — imparfait for a past habit."
          },
          {
            "q": "What did Camille visit last week?",
            "opts": [
              "A museum",
              "The Eiffel Tower",
              "Le Vieux-Lyon",
              "A market"
            ],
            "ans": 2,
            "exp": "« j'ai visité le Vieux-Lyon » — passé composé for a single completed event."
          },
          {
            "q": "« Lyon est moins grand que Paris » means:",
            "opts": [
              "Lyon is bigger than Paris",
              "Lyon is less big than Paris",
              "Lyon is as big as Paris",
              "Lyon is too big"
            ],
            "ans": 1,
            "exp": "« moins … que » = less … than."
          },
          {
            "q": "Why is « habitais » (imparfait) used rather than « ai habité » (passé composé)?",
            "opts": [
              "It describes an ongoing past habit",
              "It's a negative sentence",
              "It's the future tense",
              "It's a reflexive verb"
            ],
            "ans": 0,
            "exp": "« Quand j'habitais à Paris » describes a repeated past habit → imparfait. A one-off event uses passé composé."
          }
        ]
      }
    ]
  },
  {
    "id": "fr-b1",
    "title": "B1 — Intermédiaire",
    "lessons": [
      {
        "id": "fr-l27",
        "title": "Le conditionnel présent",
        "icon": "🎩",
        "cards": [
          {
            "h": "Formation",
            "p": [
              "**radical du futur + terminaisons de l'imparfait** (-ais, -ais, -ait, -ions, -iez, -aient).",
              "parler → je parlerais · finir → je finirais · prendre → je prendrais."
            ],
            "callout": {
              "kind": "key",
              "text": "Same irregular stems as the futur simple: être→ser-, avoir→aur-, aller→ir-, faire→fer-, venir→viendr-."
            }
          },
          {
            "h": "Les emplois",
            "example": {
              "title": "Uses of the conditional",
              "rows": [
                [
                  "Politeness",
                  "Je voudrais un café. / Pourriez-vous m'aider ?"
                ],
                [
                  "Hypothesis",
                  "Si j'avais le temps, je voyagerais."
                ],
                [
                  "Advice",
                  "Tu devrais te reposer."
                ],
                [
                  "Wish",
                  "J'aimerais visiter le Japon."
                ]
              ]
            }
          },
          {
            "h": "La phrase avec « si »",
            "p": [
              "**Si + imparfait, … conditionnel présent.**",
              "**Si j'étais riche, j'achèterais une maison.** (If I were rich, I would buy a house.)",
              "**Si tu venais, on serait content.** (If you came, we would be happy.)"
            ],
            "callout": {
              "kind": "warning",
              "text": "Never put the conditional directly after « si ». « Si » takes the imparfait; the conditional is in the other clause."
            }
          }
        ],
        "check": [
          {
            "q": "Conditionnel of « parler » for « je »:",
            "opts": [
              "je parlerai",
              "je parlerais",
              "je parlais",
              "je parle"
            ],
            "ans": 1,
            "exp": "Future stem + imparfait endings: je parlerais."
          },
          {
            "q": "Polite request « I would like »:",
            "opts": [
              "je veux",
              "je voudrais",
              "je voulais",
              "je voudrai"
            ],
            "ans": 1,
            "exp": "je voudrais = conditional of vouloir (polite)."
          },
          {
            "q": "« Si j'avais le temps, je ___ (voyager). »",
            "opts": [
              "voyage",
              "voyagerai",
              "voyagerais",
              "voyageais"
            ],
            "ans": 2,
            "exp": "si + imparfait → conditional: je voyagerais."
          },
          {
            "q": "Which tense follows « si » in these sentences?",
            "opts": [
              "conditional",
              "imparfait",
              "futur",
              "présent"
            ],
            "ans": 1,
            "exp": "Si + imparfait, … conditionnel présent."
          },
          {
            "q": "« Tu ___ te reposer. » (advice: should)",
            "opts": [
              "dois",
              "devras",
              "devrais",
              "devais"
            ],
            "ans": 2,
            "exp": "devrais = conditional of devoir → « you should »."
          },
          {
            "q": "Conditional stem of « être »:",
            "opts": [
              "êtr-",
              "ser-",
              "étai-",
              "est-"
            ],
            "ans": 1,
            "exp": "Same as future: ser- → je serais."
          }
        ]
      },
      {
        "id": "fr-l28",
        "title": "Le subjonctif présent",
        "icon": "🌀",
        "cards": [
          {
            "h": "Formation",
            "p": [
              "Take the **ils** form of the present, drop **-ent**, add: **-e, -es, -e, -ions, -iez, -ent**.",
              "ils parlent → que je parle · ils finissent → que je finisse."
            ]
          },
          {
            "h": "Irréguliers fréquents",
            "example": {
              "title": "Common irregular subjunctives",
              "rows": [
                [
                  "être",
                  "que je sois, que nous soyons"
                ],
                [
                  "avoir",
                  "que j'aie, que nous ayons"
                ],
                [
                  "aller",
                  "que j'aille, que nous allions"
                ],
                [
                  "faire",
                  "que je fasse"
                ],
                [
                  "pouvoir",
                  "que je puisse"
                ]
              ]
            }
          },
          {
            "h": "Les déclencheurs",
            "p": [
              "After expressions of **wish, emotion, necessity, doubt** + **que**:",
              "**Il faut que** tu partes. · **Je veux que** tu viennes. · **Je suis content que** tu sois là.",
              "**Bien que, pour que, avant que, à condition que** also trigger the subjunctive."
            ],
            "callout": {
              "kind": "key",
              "text": "Subjunctive needs TWO different subjects + que: « Je veux **que tu** viennes ». Same subject → infinitive: « Je veux venir »."
            }
          }
        ],
        "check": [
          {
            "q": "Subjunctive is built from which present form?",
            "opts": [
              "je",
              "nous",
              "ils",
              "vous"
            ],
            "ans": 2,
            "exp": "ils form, drop -ent: ils parlent → que je parle."
          },
          {
            "q": "« Il faut que tu ___ (partir). »",
            "opts": [
              "pars",
              "partes",
              "partiras",
              "partais"
            ],
            "ans": 1,
            "exp": "Subjunctive: que tu partes."
          },
          {
            "q": "Subjunctive of « être » for « je »:",
            "opts": [
              "suis",
              "sois",
              "serais",
              "soit"
            ],
            "ans": 1,
            "exp": "que je sois (irregular)."
          },
          {
            "q": "Which expression triggers the subjunctive?",
            "opts": [
              "Je pense que",
              "Il est vrai que",
              "Je veux que",
              "J'espère que"
            ],
            "ans": 2,
            "exp": "« vouloir que » expresses will → subjunctive."
          },
          {
            "q": "« Je veux ___ » (I want to come — same subject):",
            "opts": [
              "que je viens",
              "venir",
              "que je vienne",
              "je viendrai"
            ],
            "ans": 1,
            "exp": "Same subject → infinitive: je veux venir."
          },
          {
            "q": "Subjunctive of « avoir » for « nous »:",
            "opts": [
              "avons",
              "ayons",
              "aurons",
              "avions"
            ],
            "ans": 1,
            "exp": "que nous ayons (irregular)."
          }
        ]
      },
      {
        "id": "fr-l29",
        "title": "Les pronoms relatifs",
        "icon": "🔗",
        "cards": [
          {
            "h": "qui et que",
            "split": {
              "left": {
                "title": "qui = subject",
                "items": [
                  "L'homme qui parle.",
                  "(qui does the action)",
                  "+ verb directly"
                ]
              },
              "right": {
                "title": "que = direct object",
                "items": [
                  "Le livre que je lis.",
                  "(que receives the action)",
                  "+ subject + verb"
                ]
              }
            }
          },
          {
            "h": "dont (de + …)",
            "p": [
              "**dont** replaces **de + noun**, after verbs/expressions needing « de ».",
              "**Le livre dont j'ai besoin.** (avoir besoin **de**)",
              "**La femme dont il parle.** (parler **de**)"
            ]
          },
          {
            "h": "où — lieu et temps",
            "p": [
              "**où** replaces a place or a time expression.",
              "**Le restaurant où nous mangeons.** (place)",
              "**Le jour où je suis arrivé.** (time)"
            ],
            "callout": {
              "kind": "tip",
              "text": "Quick test: if the relative word is the SUBJECT of the next verb → qui; if there's already a subject → que."
            }
          }
        ],
        "check": [
          {
            "q": "« L'homme ___ parle est mon père. »",
            "opts": [
              "que",
              "dont",
              "où",
              "qui"
            ],
            "ans": 3,
            "exp": "Subject relative → qui (qui parle)."
          },
          {
            "q": "« Le livre ___ je lis est bon. »",
            "opts": [
              "qui",
              "dont",
              "où",
              "que"
            ],
            "ans": 3,
            "exp": "Direct object relative → que."
          },
          {
            "q": "« dont » replaces phrases with:",
            "opts": [
              "à",
              "de",
              "en",
              "par"
            ],
            "ans": 1,
            "exp": "dont = de + noun: avoir besoin de → dont."
          },
          {
            "q": "« Le pays ___ je vis. »",
            "opts": [
              "qui",
              "que",
              "dont",
              "où"
            ],
            "ans": 3,
            "exp": "Place → où: le pays où je vis."
          },
          {
            "q": "« La fille ___ j'ai rencontrée hier. »",
            "opts": [
              "qui",
              "que",
              "dont",
              "où"
            ],
            "ans": 1,
            "exp": "Direct object (I met her) → que."
          },
          {
            "q": "« Le moment ___ il est parti. »",
            "opts": [
              "qui",
              "que",
              "où",
              "dont"
            ],
            "ans": 2,
            "exp": "Time expression → où."
          }
        ]
      },
      {
        "id": "fr-l44",
        "title": "Les pronoms Y et EN",
        "icon": "📍",
        "cards": [
          {
            "h": "Le pronom Y",
            "p": [
              "**Y** replaces **à + place** or **à + thing** (when the verb takes « à »).",
              "**Tu vas à Paris ?** → **Tu y vas ?** (Are you going there?)",
              "**Il pense à son travail.** → **Il y pense.** (He thinks about it.)"
            ],
            "example": {
              "title": "Y in action",
              "rows": [
                ["Elle va à l'école. → Elle y va.", "She goes to school. → She goes there."],
                ["Nous habitons à Lyon. → Nous y habitons.", "We live there."],
                ["Tu crois à la magie ? → Tu y crois ?", "Do you believe in it?"]
              ]
            },
            "callout": {
              "kind": "key",
              "text": "Y goes **before** the verb (or before the infinitive in a 2-verb construction): **Je vais y aller**."
            }
          },
          {
            "h": "Le pronom EN",
            "p": [
              "**EN** replaces **de + noun**, especially with quantities, numbers, or verbs taking « de ».",
              "**Tu veux du café ?** → **Tu en veux ?** (Do you want some?)",
              "**Il parle de son voyage.** → **Il en parle.** (He talks about it.)"
            ],
            "example": {
              "title": "EN in action",
              "rows": [
                ["J'ai trois frères. → J'en ai trois.", "I have three (of them)."],
                ["Elle mange des pommes. → Elle en mange.", "She eats some (of them)."],
                ["Il revient de Paris. → Il en revient.", "He's coming back from there."]
              ]
            },
            "callout": {
              "kind": "tip",
              "text": "Keep numbers/quantities AFTER the verb when using EN: **J'en ai trois** (NOT *j'en trois ai*)."
            }
          },
          {
            "h": "Y et EN — position et résumé",
            "p": [
              "Both **y** and **en** go **before the conjugated verb** (or the infinitive in a two-verb group).",
              "With imperatives (affirmative): pronoun goes **after** the verb: **Vas-y !** (Go there!), **Prends-en !** (Take some!)"
            ],
            "split": {
              "left": {
                "title": "Y — replaces",
                "items": [
                  "à + place (J'y vais)",
                  "à + thing (J'y pense)",
                  "Answers: là-bas, à + noun"
                ]
              },
              "right": {
                "title": "EN — replaces",
                "items": [
                  "de + noun (J'en parle)",
                  "du/de la/des + noun (J'en veux)",
                  "Keeps numbers: j'en ai deux"
                ]
              }
            }
          }
        ],
        "check": [
          {
            "q": "Replace: « Tu vas au cinéma ? » → « Tu ___ vas ? »",
            "opts": ["en","y","le","lui"],
            "ans": 1,
            "exp": "au cinéma = à + place → y."
          },
          {
            "q": "Replace: « Elle mange des pommes. » → « Elle ___ mange. »",
            "opts": ["y","les","en","lui"],
            "ans": 2,
            "exp": "des pommes (de + noun, indefinite quantity) → en."
          },
          {
            "q": "« J'en ai trois » — what does EN replace?",
            "opts": ["à + place","de + noun (with quantity retained)","le/la (direct object)","à + person"],
            "ans": 1,
            "exp": "EN replaces de + noun. The number (trois) stays after the verb: j'en ai trois."
          },
          {
            "q": "Where does Y go in the sentence?",
            "opts": ["After the verb","Before the conjugated verb","At the end of the sentence","After the subject"],
            "ans": 1,
            "exp": "Y (and EN) go before the conjugated verb: Tu y vas. Je vais y aller (before infinitive in 2-verb group)."
          }
        ]
      },
      {
        "id": "fr-l30",
        "title": "Exprimer son opinion",
        "icon": "💬",
        "cards": [
          {
            "h": "Donner son avis",
            "example": {
              "title": "Opinion phrases",
              "rows": [
                [
                  "Je pense que…",
                  "I think that…"
                ],
                [
                  "À mon avis,…",
                  "In my opinion,…"
                ],
                [
                  "Je trouve que…",
                  "I find that…"
                ],
                [
                  "Selon moi,…",
                  "According to me,…"
                ]
              ]
            },
            "callout": {
              "kind": "tip",
              "text": "Affirmative « je pense que / je crois que » take the **indicative**: « Je pense qu'il a raison »."
            }
          },
          {
            "h": "Être d'accord ou non",
            "p": [
              "**Je suis d'accord (avec toi).** (I agree.) · **Je ne suis pas d'accord.** (I disagree.)",
              "**Tu as raison.** (You're right.) · **Tu as tort.** (You're wrong.)",
              "**C'est vrai, mais…** / **Par contre,…** (However,…)"
            ]
          },
          {
            "h": "Doute et certitude",
            "p": [
              "Certainty → indicative: **Je suis sûr qu'il viendra.**",
              "Doubt / negation of opinion → subjunctive: **Je ne pense pas qu'il vienne.** · **Je doute qu'il ait raison.**"
            ],
            "callout": {
              "kind": "warning",
              "text": "« Je ne pense pas que… » becomes negative/doubtful → triggers the subjunctive: « … qu'il **vienne** »."
            }
          }
        ],
        "check": [
          {
            "q": "« À mon avis » means:",
            "opts": [
              "I agree",
              "In my opinion",
              "I doubt",
              "However"
            ],
            "ans": 1,
            "exp": "À mon avis = in my opinion."
          },
          {
            "q": "« I disagree » =",
            "opts": [
              "Je suis d'accord",
              "Je ne suis pas d'accord",
              "Tu as raison",
              "C'est vrai"
            ],
            "ans": 1,
            "exp": "Je ne suis pas d'accord = I disagree."
          },
          {
            "q": "« Je pense qu'il ___ raison. » (avoir)",
            "opts": [
              "ait",
              "a",
              "aurait",
              "aie"
            ],
            "ans": 1,
            "exp": "Affirmative « je pense que » → indicative: il a raison."
          },
          {
            "q": "« Je ne pense pas qu'il ___. » (venir)",
            "opts": [
              "vient",
              "viendra",
              "vienne",
              "venait"
            ],
            "ans": 2,
            "exp": "Negative opinion → subjunctive: qu'il vienne."
          },
          {
            "q": "« Tu as tort » means:",
            "opts": [
              "You're right",
              "You're wrong",
              "You agree",
              "You doubt"
            ],
            "ans": 1,
            "exp": "avoir tort = to be wrong."
          },
          {
            "q": "Which introduces a contrasting idea?",
            "opts": [
              "Par contre",
              "Selon moi",
              "Je trouve que",
              "D'accord"
            ],
            "ans": 0,
            "exp": "« Par contre » = however / on the other hand."
          }
        ]
      },
      {
        "id": "fr-l31",
        "title": "Examen B1 (type DELF)",
        "icon": "📝",
        "cards": [
          {
            "h": "Compréhension écrite — lisez",
            "p": [
              "Read this opinion text, then answer the questions.",
              "**« Beaucoup de jeunes pensent que les réseaux sociaux sont indispensables. À mon avis, ils ont des avantages : on peut rester en contact avec ses amis et s'informer rapidement. Cependant, je ne crois pas qu'ils soient toujours positifs. Si les gens passaient moins de temps sur leur téléphone, ils seraient peut-être plus heureux. Il faudrait trouver un équilibre. »**"
            ],
            "callout": {
              "kind": "tip",
              "text": "B1 tests conditional, subjunctive, relative pronouns, and opinion language. Identify the writer's nuance: advantages AND reservations."
            }
          },
          {
            "h": "Comment ça marche",
            "p": [
              "14 questions on reading comprehension and B1 grammar. Aim for 70%+."
            ]
          }
        ],
        "check": [
          {
            "q": "(Texte) Selon l'auteur, quel est un avantage des réseaux sociaux ?",
            "opts": [
              "Ils coûtent cher",
              "Rester en contact avec ses amis",
              "Ils sont dangereux",
              "Ils font dormir"
            ],
            "ans": 1,
            "exp": "« on peut rester en contact avec ses amis »."
          },
          {
            "q": "(Texte) L'auteur pense que les réseaux sociaux sont :",
            "opts": [
              "toujours positifs",
              "toujours négatifs",
              "pas toujours positifs",
              "inutiles"
            ],
            "ans": 2,
            "exp": "« je ne crois pas qu'ils soient toujours positifs »."
          },
          {
            "q": "(Texte) Que faudrait-il trouver ?",
            "opts": [
              "un téléphone",
              "un équilibre",
              "des amis",
              "du temps libre"
            ],
            "ans": 1,
            "exp": "« Il faudrait trouver un équilibre »."
          },
          {
            "q": "(Texte) « ils seraient plus heureux » est au :",
            "opts": [
              "futur simple",
              "conditionnel",
              "subjonctif",
              "imparfait"
            ],
            "ans": 1,
            "exp": "« seraient » = conditionnel (hypothèse avec si + imparfait)."
          },
          {
            "q": "Complétez : « Si j'avais le temps, je ___ (voyager). »",
            "opts": [
              "voyage",
              "voyagerai",
              "voyagerais",
              "voyageais"
            ],
            "ans": 2,
            "exp": "si + imparfait → conditionnel: je voyagerais."
          },
          {
            "q": "« Il faut que tu ___ (être) à l'heure. »",
            "opts": [
              "es",
              "sois",
              "seras",
              "étais"
            ],
            "ans": 1,
            "exp": "Subjonctif: que tu sois."
          },
          {
            "q": "« Le livre ___ je parle est célèbre. »",
            "opts": [
              "qui",
              "que",
              "dont",
              "où"
            ],
            "ans": 2,
            "exp": "parler de → dont."
          },
          {
            "q": "« La ville ___ j'habite est belle. »",
            "opts": [
              "qui",
              "que",
              "dont",
              "où"
            ],
            "ans": 3,
            "exp": "Lieu → où."
          },
          {
            "q": "« Je ne pense pas qu'il ___ raison. » (avoir)",
            "opts": [
              "a",
              "ait",
              "aura",
              "avait"
            ],
            "ans": 1,
            "exp": "Negative opinion → subjonctif: qu'il ait raison."
          },
          {
            "q": "Politesse : « ___-vous m'aider, s'il vous plaît ? » (pouvoir, conditionnel)",
            "opts": [
              "Pouvez",
              "Pourriez",
              "Pourrez",
              "Pouviez"
            ],
            "ans": 1,
            "exp": "Conditional for politeness: Pourriez-vous…"
          },
          {
            "q": "« Je voudrais » est le conditionnel de :",
            "opts": [
              "pouvoir",
              "vouloir",
              "devoir",
              "savoir"
            ],
            "ans": 1,
            "exp": "vouloir → je voudrais."
          },
          {
            "q": "« L'homme ___ travaille ici est gentil. »",
            "opts": [
              "que",
              "qui",
              "dont",
              "où"
            ],
            "ans": 1,
            "exp": "Sujet → qui."
          },
          {
            "q": "Choisissez le mot d'opinion :",
            "opts": [
              "Par contre",
              "Selon moi",
              "Pourtant",
              "Cependant"
            ],
            "ans": 1,
            "exp": "« Selon moi » introduces a personal opinion."
          },
          {
            "q": "« Bien qu'il ___ fatigué, il travaille. » (être)",
            "opts": [
              "est",
              "soit",
              "sera",
              "était"
            ],
            "ans": 1,
            "exp": "« bien que » triggers the subjunctive: qu'il soit."
          }
        ]
      },
      {
        "id": "fr-l36",
        "title": "Histoire : Un débat",
        "icon": "📖",
        "cards": [
          {
            "h": "Un débat à l'université — lisez l'histoire",
            "p": [
              "Students debate whether cars should be banned from city centres. Notice **opinion phrases**, the **subjunctif**, and the **conditional**."
            ],
            "visual": "<div style='background:linear-gradient(135deg,#f0fff4,#fff);border-left:4px solid #166534;border-radius:10px;padding:16px;font-size:0.9em;line-height:1.9'>\n<div style='color:#166534;font-weight:700;font-size:1em;margin-bottom:10px'>🎓 En cours — un débat</div>\n<div style='margin:5px 0'><span style='font-weight:700;color:#555'>Prof :</span> Le sujet du jour : faut-il interdire les voitures en ville ?</div>\n<div style='margin:5px 0'><span style='font-weight:700;color:#166534'>Léa :</span> <em>Selon moi</em>, c'est absolument nécessaire. <em>Je pense que</em> les voitures polluent trop. <em>Il faudrait que</em> chaque ville <strong>investisse</strong> dans les transports en commun.</div>\n<div style='margin:5px 0'><span style='font-weight:700;color:#1d4ed8'>Marc :</span> <em>Je ne suis pas d'accord.</em> <em>Bien que</em> la pollution <strong>soit</strong> un problème réel, beaucoup de gens dépendent de leur voiture. Ce <strong>serait</strong> injuste de les pénaliser.</div>\n<div style='margin:5px 0'><span style='font-weight:700;color:#166534'>Léa :</span> Mais si on <strong>améliorait</strong> les pistes cyclables, les gens <strong>pourraient</strong> utiliser le vélo !</div>\n<div style='margin:5px 0'><span style='font-weight:700;color:#1d4ed8'>Marc :</span> C'est possible. <em>Cependant</em>, dans les petites villes, les distances sont trop grandes pour le vélo.</div>\n<div style='margin:5px 0'><span style='font-weight:700;color:#555'>Prof :</span> Est-ce que vous pensez qu'il y <strong>ait</strong> une solution idéale ?</div>\n<div style='margin:5px 0'><span style='font-weight:700;color:#166534'>Léa :</span> Je ne pense pas qu'il y <strong>ait</strong> une solution parfaite, mais il faut agir.</div>\n<div style='margin:5px 0'><span style='font-weight:700;color:#1d4ed8'>Marc :</span> Je suis d'accord là-dessus. Le plus important, c'est qu'on <strong>commence</strong> à changer.</div>\n</div>"
          },
          {
            "h": "Structures clés du débat",
            "example": {
              "title": "B1 language in this debate",
              "rows": [
                [
                  "Selon moi, …",
                  "In my opinion, … (formal opinion marker)"
                ],
                [
                  "Je ne suis pas d'accord",
                  "I disagree"
                ],
                [
                  "Bien que + subjonctif",
                  "Although … (bien que la pollution soit)"
                ],
                [
                  "Si + imparfait, … conditionnel",
                  "If … (si on améliorait, on pourrait)"
                ],
                [
                  "Il faudrait que + subjonctif",
                  "It would be necessary that … (investisse)"
                ],
                [
                  "Cependant / Pourtant",
                  "However / Nevertheless"
                ]
              ]
            }
          }
        ],
        "check": [
          {
            "q": "What is the debate topic?",
            "opts": [
              "Should cars be taxed more?",
              "Should cars be banned from cities?",
              "Should cycling be compulsory?",
              "Should public transport be free?"
            ],
            "ans": 1,
            "exp": "The professor asks: « faut-il interdire les voitures en ville ? »"
          },
          {
            "q": "What does Léa think cities should invest in?",
            "opts": [
              "Cycling lanes",
              "Electric cars",
              "Public transport",
              "More parking"
            ],
            "ans": 2,
            "exp": "Léa dit : « il faudrait que chaque ville investisse dans les transports en commun. »"
          },
          {
            "q": "Why is « soit » used in « bien que la pollution soit un problème » ?",
            "opts": [
              "It is the passé composé of être",
              "« Bien que » always triggers the subjunctive",
              "It is a question form",
              "It is conditional mood"
            ],
            "ans": 1,
            "exp": "« Bien que » (although) always triggers the subjunctive. Soit is the subjunctive of être."
          },
          {
            "q": "Marc's argument about small towns is that:",
            "opts": [
              "They have no metro system",
              "Distances are too great for cycling",
              "Petrol is cheaper there",
              "People don't own cars"
            ],
            "ans": 1,
            "exp": "Marc dit : « dans les petites villes, les distances sont trop grandes pour le vélo. »"
          },
          {
            "q": "Do Léa and Marc agree at the end of the debate?",
            "opts": [
              "No, they completely disagree",
              "Yes — both agree that change is needed",
              "Léa abandons her position",
              "Marc changes his mind about cars"
            ],
            "ans": 1,
            "exp": "Marc dit : « Je suis d'accord là-dessus. Le plus important, c'est qu'on commence à changer. »"
          }
        ]
      },
      {
        "id": "fr-l37",
        "title": "Histoire : Changer de vie",
        "icon": "📖",
        "cards": [
          {
            "h": "Changer de vie — lisez l'histoire",
            "p": [
              "A magazine interviews Sophie, who left a corporate career to open a bakery. Notice the **conditionnel passé** (past conditional), **dont**, and the **subjunctif** after « il faut que »."
            ],
            "visual": "<div style='background:linear-gradient(135deg,#f0fff4,#fff);border-left:4px solid #166534;border-radius:10px;padding:16px;font-size:0.9em;line-height:1.9'>\n<div style='color:#166534;font-weight:700;font-size:1em;margin-bottom:10px'>📰 Interview — magazine</div>\n<div style='margin:8px 0'><span style='font-weight:700;color:#555'>Journaliste :</span> Vous avez quitté votre poste de directrice financière pour ouvrir une boulangerie. Pourquoi ?</div>\n<div style='margin:8px 0'><span style='font-weight:700;color:#166534'>Sophie :</span> Depuis des années, je travaillais dans une grande entreprise. Le salaire était excellent, mais je n'étais pas heureuse. Un jour, j'ai réalisé que le travail <strong>que</strong> je faisais ne correspondait pas à mes valeurs.</div>\n<div style='margin:8px 0'><span style='font-weight:700;color:#555'>Journaliste :</span> C'était risqué, non ?</div>\n<div style='margin:8px 0'><span style='font-weight:700;color:#166534'>Sophie :</span> Oui, bien sûr. Si j'<strong>avais su</strong> à quel point c'était difficile, j'<strong>aurais</strong> peut-être hésité davantage. Mais je ne regrette rien. La boulangerie <strong>dont</strong> je rêvais depuis toujours est maintenant une réalité.</div>\n<div style='margin:8px 0'><span style='font-weight:700;color:#555'>Journaliste :</span> Qu'est-ce que vous conseilleriez à quelqu'un qui veut changer de vie ?</div>\n<div style='margin:8px 0'><span style='font-weight:700;color:#166534'>Sophie :</span> Je lui dirais de ne pas attendre le « bon moment » — il n'existe pas. Il faut que vous <strong>ayez</strong> confiance en vous et que vous <strong>osiez</strong> prendre des risques.</div>\n</div>"
          },
          {
            "h": "Structures clés",
            "example": {
              "title": "B1 grammar features in this story",
              "rows": [
                [
                  "le travail que je faisais",
                  "the work that I was doing (relative pronoun que — object)"
                ],
                [
                  "la boulangerie dont je rêvais",
                  "the bakery I dreamed of (dont = de + which; rêver de)"
                ],
                [
                  "si j'avais su … j'aurais hésité",
                  "if I had known … I would have hesitated (conditionnel passé)"
                ],
                [
                  "je ne regrette rien",
                  "I regret nothing (negative with rien)"
                ],
                [
                  "il faut que vous ayez / osiez",
                  "you must have / dare (subjunctive after il faut que)"
                ],
                [
                  "conseilleriez / dirais",
                  "would advise / would say (conditionnel présent)"
                ]
              ]
            },
            "callout": {
              "kind": "key",
              "text": "« dont » replaces « de + noun ». rêver DE qch → la chose dont je rêve. Use dont whenever the verb takes « de »."
            }
          }
        ],
        "check": [
          {
            "q": "What was Sophie's previous job?",
            "opts": [
              "Teacher",
              "Financial director",
              "Journalist",
              "Engineer"
            ],
            "ans": 1,
            "exp": "She was « directrice financière » = financial director."
          },
          {
            "q": "Why was Sophie unhappy in her old job?",
            "opts": [
              "The salary was too low",
              "She worked too many hours",
              "The work didn't match her values",
              "She had no holidays"
            ],
            "ans": 2,
            "exp": "Sophie dit : « le travail que je faisais ne correspondait pas à mes valeurs. »"
          },
          {
            "q": "What does Sophie regret?",
            "opts": [
              "Opening the bakery",
              "Nothing at all",
              "Not saving more money",
              "Leaving Paris"
            ],
            "ans": 1,
            "exp": "Sophie dit : « je ne regrette rien. » = I regret nothing."
          },
          {
            "q": "In « la boulangerie dont je rêvais », what does « dont » replace?",
            "opts": [
              "la boulangerie (subject)",
              "de la boulangerie (rêver de qch)",
              "que + boulangerie (direct object)",
              "à la boulangerie (direction)"
            ],
            "ans": 1,
            "exp": "rêver DE qch → dont replaces « de + la boulangerie ». Use dont when the verb takes « de »."
          },
          {
            "q": "What advice does Sophie give to someone wanting to change their life?",
            "opts": [
              "Save money first",
              "Wait for the right moment",
              "Don't wait — have confidence and take risks",
              "Ask your family before deciding"
            ],
            "ans": 2,
            "exp": "Sophie dit : « Ne pas attendre le bon moment — il n'existe pas. Il faut que vous ayez confiance en vous. »"
          }
        ]
      }
    ]
  }
];
