// french-data.js — vanilla JS data file for French study app
// Sets three globals: window.FR_TOPICS, window.FR_QUESTIONS, window.FR_LEARN_PATH

window.FR_TOPICS = [
  { id: 'fr-salut',     name: 'Salutations',             short: 'Salutations',    icon: '👋', desc: 'Greetings and polite expressions' },
  { id: 'fr-vocab',     name: 'Vocabulaire',              short: 'Vocabulaire',    icon: '📚', desc: 'Essential nouns and adjectives' },
  { id: 'fr-gram',      name: 'Grammaire',                short: 'Grammaire',      icon: '✏️', desc: 'French grammar rules and structures' },
  { id: 'fr-num',       name: 'L\'heure & temps',          short: 'L\'heure',       icon: '🕐', desc: 'Telling the time and expressing time in French' },
  { id: 'fr-vie',       name: 'Vie quotidienne',          short: 'Vie quotidienne',icon: '🏠', desc: 'Daily life, shopping, transport and directions' },
  { id: 'fr-conj',      name: 'Conjugaison',              short: 'Conjugaison',    icon: '🔄', desc: 'Verb conjugation practice across all tenses' },
  { id: 'fr-nums',      name: 'Les chiffres',             short: 'Chiffres',       icon: '🔢', desc: 'Numbers 0–100 and ordinals' },
  { id: 'fr-fam',       name: 'La famille',               short: 'Famille',        icon: '👨‍👩‍👧‍👦', desc: 'Family vocabulary and possessives' },
  { id: 'fr-food',      name: 'Nourriture & boissons',    short: 'Nourriture',     icon: '🍽️', desc: 'Food, drink and partitive articles' },
  { id: 'fr-shop',      name: 'Faire les courses',        short: 'Shopping',       icon: '🛍️', desc: 'Shopping phrases, colours and sizes' },
  { id: 'fr-transport', name: 'Transports & directions',  short: 'Transports',     icon: '🚌', desc: 'Transport vocabulary and giving directions' },
  { id: 'fr-meteo',     name: 'La météo',                 short: 'Météo',          icon: '☀️', desc: 'Weather expressions and seasons' },
  { id: 'fr-resto',     name: 'Au restaurant',            short: 'Restaurant',     icon: '🍷', desc: 'Dining out phrases and restaurant vocabulary' },
  { id: 'fr-dial',     name: 'Dialogues & situations',   short: 'Dialogues',      icon: '💬', desc: 'Real-world conversations and situational language' },
  { id: 'fr-phon',     name: 'Prononciation',            short: 'Prononciation',  icon: '🔊', desc: 'Minimal pairs, French sounds, silent letters and liaison' },
  { id: 'fr-order',    name: 'Ordre des mots',           short: 'Ordre des mots', icon: '🔀', desc: 'Sentence builder — arrange words in the correct French order' },
  { id: 'fr-listen',  name: 'Écoute active',            short: 'Écoute',         icon: '🎧', desc: 'Listen to spoken French and identify what you heard' },
];

window.FR_QUESTIONS = [
  // ── fr-salut (fr-001 to fr-017) ──────────────────────────────────────────
  {
    id: 'fr-001', topic: 'fr-salut', lesson: 'fr-l01', type: 'mcq',
    q: 'What does "Bonjour" mean?',
    opts: ['Hello / Good day', 'Goodbye', 'Good night', 'Thank you'],
    ans: 0,
    exp: '"Bonjour" is the standard French greeting meaning hello or good day.'
  },
  {
    id: 'fr-002', topic: 'fr-salut', lesson: 'fr-l01', type: 'mcq',
    q: 'What does "Bonsoir" mean?',
    opts: ['Good morning', 'Good evening', 'Goodbye', 'See you soon'],
    ans: 1,
    exp: '"Bonsoir" is used to greet someone in the evening, meaning good evening.'
  },
  {
    id: 'fr-003', topic: 'fr-salut', lesson: 'fr-l01', type: 'mcq',
    q: 'What does "Bonne nuit" mean?',
    opts: ['Good afternoon', 'Good evening', 'Good night', 'Goodnight tomorrow'],
    ans: 2,
    exp: '"Bonne nuit" means good night and is used when parting for bed.'
  },
  {
    id: 'fr-004', topic: 'fr-salut', lesson: 'fr-l01', type: 'mcq',
    q: 'How do you say "Goodbye" formally in French?',
    opts: ['Salut', 'Au revoir', 'À bientôt', 'Ciao'],
    ans: 1,
    exp: '"Au revoir" is the standard formal way to say goodbye in French.'
  },
  {
    id: 'fr-005', topic: 'fr-salut', lesson: 'fr-l01', type: 'mcq',
    q: '"À bientôt" means?',
    opts: ['See you tomorrow', 'See you soon', 'Goodbye forever', 'Good night'],
    ans: 1,
    exp: '"À bientôt" means see you soon.'
  },
  {
    id: 'fr-006', topic: 'fr-salut', lesson: 'fr-l01', type: 'mcq',
    q: '"À demain" means?',
    opts: ['See you later', 'See you tomorrow', 'See you next week', 'Good night'],
    ans: 1,
    exp: '"À demain" means see you tomorrow. "Demain" is the French word for tomorrow.'
  },
  {
    id: 'fr-007', topic: 'fr-salut', lesson: 'fr-l01', type: 'mcq',
    q: '"S\'il vous plaît" is?',
    opts: ['Thank you', 'Please (formal)', 'Sorry', 'Excuse me'],
    ans: 1,
    exp: '"S\'il vous plaît" is the formal way to say please in French.'
  },
  {
    id: 'fr-008', topic: 'fr-salut', lesson: 'fr-l01', type: 'mcq',
    q: '"Merci beaucoup" means?',
    opts: ['Thank you very much', 'You\'re welcome', 'Sorry', 'Please'],
    ans: 0,
    exp: '"Merci beaucoup" means thank you very much. "Beaucoup" means a lot/very much.'
  },
  {
    id: 'fr-009', topic: 'fr-salut', lesson: 'fr-l01', type: 'mcq',
    q: '"De rien" means?',
    opts: ['Nothing at all', 'You\'re welcome', 'Excuse me', 'I don\'t know'],
    ans: 1,
    exp: '"De rien" means you\'re welcome (literally "it\'s nothing").'
  },
  {
    id: 'fr-010', topic: 'fr-salut', lesson: 'fr-l01', type: 'mcq',
    q: '"Excusez-moi" is?',
    opts: ['Thank you', 'You\'re welcome', 'Excuse me (formal)', 'Sorry (informal)'],
    ans: 2,
    exp: '"Excusez-moi" is the formal/plural way to say excuse me in French.'
  },
  {
    id: 'fr-011', topic: 'fr-salut', lesson: 'fr-l01', type: 'mcq',
    q: '"Comment vous appelez-vous?" means?',
    opts: ['How are you?', 'What is your name? (formal)', 'Where are you from?', 'How old are you?'],
    ans: 1,
    exp: '"Comment vous appelez-vous?" is the formal way to ask someone\'s name.'
  },
  {
    id: 'fr-012', topic: 'fr-salut', lesson: 'fr-l01', type: 'mcq',
    q: '"Je m\'appelle Marie" means?',
    opts: ['I am from Marie', 'My name is Marie', 'I like Marie', 'I know Marie'],
    ans: 1,
    exp: '"Je m\'appelle" literally means "I call myself" and is used to state your name.'
  },
  {
    id: 'fr-013', topic: 'fr-salut', lesson: 'fr-l01', type: 'mcq',
    q: '"Ça va?" means?',
    opts: ['Where are you going?', 'How are you / Is it OK?', 'Do you want some?', 'What time is it?'],
    ans: 1,
    exp: '"Ça va?" is an informal way to ask how someone is doing.'
  },
  {
    id: 'fr-014', topic: 'fr-salut', lesson: 'fr-l01', type: 'mcq',
    q: '"Ça va bien, merci" means?',
    opts: ['It\'s going badly', 'I\'m fine thanks', 'Thank you for coming', 'Nothing works'],
    ans: 1,
    exp: '"Ça va bien" means it\'s going well / I\'m fine, and "merci" adds thank you.'
  },
  {
    id: 'fr-015', topic: 'fr-salut', lesson: 'fr-l01', type: 'mcq',
    q: 'Which is the INFORMAL greeting?',
    opts: ['Bonjour', 'Bonsoir', 'Salut', 'Comment allez-vous?'],
    ans: 2,
    exp: '"Salut" is the informal/casual greeting equivalent to "hi" in English.'
  },
  {
    id: 'fr-016', topic: 'fr-salut', lesson: 'fr-l01', type: 'mcq',
    q: '"Enchanté(e)" means?',
    opts: ['Tired', 'Nice to meet you', 'I\'m busy', 'Let\'s go'],
    ans: 1,
    exp: '"Enchanté(e)" means nice to meet you and is used when introduced to someone.'
  },
  {
    id: 'fr-017', topic: 'fr-salut', lesson: 'fr-l01', type: 'mcq',
    q: '"Comment allez-vous?" — what register is this?',
    opts: ['Informal', 'Formal', 'Slang', 'Regional'],
    ans: 1,
    exp: '"Comment allez-vous?" uses the formal "vous" form and is therefore formal.'
  },

  // ── fr-vocab (fr-027 to fr-033) ──────────────────────────────────────────
  {
    id: 'fr-027', topic: 'fr-vocab', lesson: 'fr-l11', type: 'mcq',
    q: '"Père" means?',
    opts: ['Mother', 'Brother', 'Father', 'Son'],
    ans: 2,
    exp: '"Père" is the French word for father.'
  },
  {
    id: 'fr-028', topic: 'fr-vocab', lesson: 'fr-l11', type: 'mcq',
    q: '"Sœur" means?',
    opts: ['Brother', 'Daughter', 'Mother', 'Sister'],
    ans: 3,
    exp: '"Sœur" is the French word for sister.'
  },
  {
    id: 'fr-029', topic: 'fr-vocab', lesson: 'fr-l15', type: 'mcq',
    q: '"Pain" means?',
    opts: ['Butter', 'Bread', 'Cheese', 'Wine'],
    ans: 1,
    exp: '"Pain" is the French word for bread.'
  },
  {
    id: 'fr-030', topic: 'fr-vocab', lesson: 'fr-l15', type: 'mcq',
    q: '"Eau" means?',
    opts: ['Milk', 'Coffee', 'Water', 'Tea'],
    ans: 2,
    exp: '"Eau" is the French word for water.'
  },
  {
    id: 'fr-031', topic: 'fr-vocab', lesson: 'fr-l04', type: 'mcq',
    q: '"Chat" means?',
    opts: ['Dog', 'Horse', 'Cat', 'Bird'],
    ans: 2,
    exp: '"Chat" is the French word for cat.'
  },
  {
    id: 'fr-032', topic: 'fr-vocab', lesson: 'fr-l41', type: 'mcq',
    q: '"Tête" means?',
    opts: ['Hand', 'Foot', 'Head', 'Ear'],
    ans: 2,
    exp: '"Tête" is the French word for head.'
  },
  {
    id: 'fr-033', topic: 'fr-vocab', lesson: 'fr-l41', type: 'mcq',
    q: '"Main" means?',
    opts: ['Hand', 'Foot', 'Eye', 'Nose'],
    ans: 0,
    exp: '"Main" is the French word for hand.'
  },
  // ── fr-gram (fr-035 to fr-051) ───────────────────────────────────────────
  {
    id: 'fr-035', topic: 'fr-gram', lesson: 'fr-l04', type: 'mcq',
    q: 'Which article is masculine singular definite?',
    opts: ['la', 'les', 'le', 'un'],
    ans: 2,
    exp: '"Le" is the masculine singular definite article (e.g. le livre).'
  },
  {
    id: 'fr-036', topic: 'fr-gram', lesson: 'fr-l04', type: 'mcq',
    q: 'Which article is feminine singular definite?',
    opts: ['le', 'la', 'un', 'une'],
    ans: 1,
    exp: '"La" is the feminine singular definite article (e.g. la table).'
  },
  {
    id: 'fr-037', topic: 'fr-gram', lesson: 'fr-l04', type: 'mcq',
    q: '"Un/une" are which type of articles?',
    opts: ['Definite', 'Indefinite', 'Partitive', 'Negative'],
    ans: 1,
    exp: '"Un" and "une" are indefinite articles meaning a/an.'
  },
  {
    id: 'fr-038', topic: 'fr-gram', lesson: 'fr-l04', type: 'mcq',
    q: '"Des" is the plural of which article?',
    opts: ['le / la', 'un / une', 'du / de la', 'de'],
    ans: 1,
    exp: '"Des" is the plural of the indefinite articles un and une.'
  },
  {
    id: 'fr-039', topic: 'fr-gram', lesson: 'fr-l04', type: 'mcq',
    q: 'The French word "maison" (house) is which gender?',
    opts: ['Masculine', 'Feminine', 'Neuter', 'Variable'],
    ans: 1,
    exp: '"Maison" is a feminine noun in French — it uses "la maison".'
  },
  {
    id: 'fr-040', topic: 'fr-gram', lesson: 'fr-l05', type: 'mcq',
    q: 'How do you make most nouns plural in French?',
    opts: ['Add -es', 'Add -s', 'Add -x', 'No change'],
    ans: 1,
    exp: 'Most French nouns form the plural by adding -s (e.g. livre → livres).'
  },
  {
    id: 'fr-041', topic: 'fr-gram', lesson: 'fr-l10', type: 'mcq',
    q: '"Ne...pas" is used for?',
    opts: ['Questions', 'Negation', 'Exclamations', 'Emphasis'],
    ans: 1,
    exp: '"Ne...pas" surrounds the verb to form a negative sentence (I do not...).'
  },
  {
    id: 'fr-042', topic: 'fr-gram', lesson: 'fr-l02', type: 'mcq',
    q: '"Je suis" means?',
    opts: ['I have', 'I am', 'I go', 'I do'],
    ans: 1,
    exp: '"Je suis" is the first-person singular of être (to be), meaning I am.'
  },
  {
    id: 'fr-043', topic: 'fr-gram', lesson: 'fr-l03', type: 'mcq',
    q: '"Tu as" means?',
    opts: ['You go', 'You are', 'You have (informal)', 'You do'],
    ans: 2,
    exp: '"Tu as" is the informal second-person singular of avoir (to have).'
  },
  {
    id: 'fr-044', topic: 'fr-gram', lesson: 'fr-l14', type: 'mcq',
    q: '"Il/elle va" uses which verb?',
    opts: ['être', 'avoir', 'aller', 'faire'],
    ans: 2,
    exp: '"Va" is the third-person singular of aller (to go).'
  },
  {
    id: 'fr-045', topic: 'fr-gram', lesson: 'fr-l14', type: 'mcq',
    q: '"Nous faisons" means?',
    opts: ['We are', 'We have', 'We go', 'We do / make'],
    ans: 3,
    exp: '"Nous faisons" is the first-person plural of faire (to do/make).'
  },
  {
    id: 'fr-046', topic: 'fr-gram', lesson: 'fr-l12', type: 'mcq',
    q: 'How does a feminine adjective generally differ from its masculine form?',
    opts: ['It is shorter', 'It adds -e', 'It adds -s', 'It adds -ment'],
    ans: 1,
    exp: 'Feminine adjectives are generally formed by adding -e to the masculine form.'
  },
  {
    id: 'fr-047', topic: 'fr-gram', lesson: 'fr-l12', type: 'mcq',
    q: '"Grand" (masc) becomes what in the feminine form?',
    opts: ['Grande', 'Grandes', 'Grands', 'Grand'],
    ans: 0,
    exp: 'The feminine of "grand" is "grande" — simply add -e.'
  },
  {
    id: 'fr-048', topic: 'fr-gram', lesson: 'fr-l10', type: 'mcq',
    q: 'To ask a question you can invert subject and verb. "Parlez-vous français?" means?',
    opts: ['Do you speak French?', 'Are you French?', 'You speak French.', 'Speak French please.'],
    ans: 0,
    exp: '"Parlez-vous français?" inverts the verb and subject to form a question: Do you speak French?'
  },
  {
    id: 'fr-049', topic: 'fr-gram', lesson: 'fr-l13', type: 'mcq',
    q: 'Which preposition means "in" (for countries/cities)?',
    opts: ['de', 'sur', 'à / en', 'dans'],
    ans: 2,
    exp: '"À" is used before cities (à Paris) and "en" before feminine countries (en France).'
  },
  {
    id: 'fr-050', topic: 'fr-gram', lesson: 'fr-l39', type: 'mcq',
    q: '"Sur" means?',
    opts: ['Under', 'On / Above', 'In', 'Between'],
    ans: 1,
    exp: '"Sur" means on or above (e.g. sur la table — on the table).'
  },
  {
    id: 'fr-051', topic: 'fr-gram', lesson: 'fr-l39', type: 'mcq',
    q: '"Sous" means?',
    opts: ['On', 'Over', 'Under / Below', 'Beside'],
    ans: 2,
    exp: '"Sous" means under or below (e.g. sous la table — under the table).'
  },

  // ── fr-num (fr-062 to fr-065) ────────────────────────────────────────────
  {
    id: 'fr-062', topic: 'fr-num', lesson: 'fr-l07', type: 'mcq',
    q: '"Quelle heure est-il?" means?',
    opts: ['What day is it?', 'What time is it?', 'How long?', 'What year?'],
    ans: 1,
    exp: '"Quelle heure est-il?" is the standard French way to ask what time it is.'
  },
  {
    id: 'fr-063', topic: 'fr-num', lesson: 'fr-l07', type: 'mcq',
    q: '"Il est trois heures" means?',
    opts: ['It is two o\'clock', 'It is three o\'clock', 'It is thirty', 'It is thirteen hours'],
    ans: 1,
    exp: '"Il est trois heures" = It is three o\'clock.'
  },
  {
    id: 'fr-064', topic: 'fr-num', lesson: 'fr-l16', type: 'mcq',
    q: 'What is "le printemps"?',
    opts: ['Summer', 'Autumn', 'Winter', 'Spring'],
    ans: 3,
    exp: '"Le printemps" is spring in French.'
  },
  {
    id: 'fr-065', topic: 'fr-num', lesson: 'fr-l16', type: 'mcq',
    q: 'What is "l\'hiver"?',
    opts: ['Summer', 'Autumn', 'Winter', 'Spring'],
    ans: 2,
    exp: '"L\'hiver" is winter in French.'
  },
  // ── fr-vie (fr-069 to fr-085) ────────────────────────────────────────────
  {
    id: 'fr-069', topic: 'fr-vie', lesson: 'fr-l42', type: 'mcq',
    q: '"Combien ça coûte?" means?',
    opts: ['Where is it?', 'How much does it cost?', 'Do you have any?', 'I\'d like this.'],
    ans: 1,
    exp: '"Combien ça coûte?" is the standard way to ask how much something costs.'
  },
  {
    id: 'fr-070', topic: 'fr-vie', lesson: 'fr-l15', type: 'mcq',
    q: '"Je voudrais" means?',
    opts: ['I want (rude)', 'I would like (polite)', 'I need', 'I have'],
    ans: 1,
    exp: '"Je voudrais" is the conditional of vouloir and means I would like — polite and commonly used in shops and restaurants.'
  },
  {
    id: 'fr-071', topic: 'fr-vie', lesson: 'fr-l39', type: 'mcq',
    q: '"Le train" means?',
    opts: ['Plane', 'Bus', 'Train', 'Car'],
    ans: 2,
    exp: '"Le train" is the French word for train.'
  },
  {
    id: 'fr-072', topic: 'fr-vie', lesson: 'fr-l39', type: 'mcq',
    q: '"L\'autobus" means?',
    opts: ['Taxi', 'Bike', 'Bus', 'Subway'],
    ans: 2,
    exp: '"L\'autobus" (or "le bus") is the French word for bus.'
  },
  {
    id: 'fr-073', topic: 'fr-vie', lesson: 'fr-l39', type: 'mcq',
    q: '"Le métro" means?',
    opts: ['Train', 'Subway / Metro', 'Tram', 'Bus'],
    ans: 1,
    exp: '"Le métro" refers to the underground subway/metro system.'
  },
  {
    id: 'fr-074', topic: 'fr-vie', lesson: 'fr-l39', type: 'mcq',
    q: '"À pied" means?',
    opts: ['By car', 'By bus', 'On foot', 'By bike'],
    ans: 2,
    exp: '"À pied" means on foot — travelling by walking.'
  },
  {
    id: 'fr-075', topic: 'fr-vie', lesson: 'fr-l39', type: 'mcq',
    q: '"Tout droit" means?',
    opts: ['Turn left', 'Turn right', 'Straight ahead', 'Stop'],
    ans: 2,
    exp: '"Tout droit" means straight ahead when giving directions.'
  },
  {
    id: 'fr-076', topic: 'fr-vie', lesson: 'fr-l39', type: 'mcq',
    q: '"À gauche" means?',
    opts: ['Straight on', 'To the right', 'To the left', 'Behind'],
    ans: 2,
    exp: '"À gauche" means to the left.'
  },
  {
    id: 'fr-077', topic: 'fr-vie', lesson: 'fr-l39', type: 'mcq',
    q: '"À droite" means?',
    opts: ['To the left', 'Straight on', 'To the right', 'In front'],
    ans: 2,
    exp: '"À droite" means to the right.'
  },
  {
    id: 'fr-078', topic: 'fr-vie', lesson: 'fr-l15', type: 'mcq',
    q: '"La carte" at a restaurant means?',
    opts: ['The bill', 'The menu / card', 'The table', 'The waiter'],
    ans: 1,
    exp: '"La carte" at a restaurant means the menu. "La carte des vins" = wine list.'
  },
  {
    id: 'fr-079', topic: 'fr-vie', lesson: 'fr-l15', type: 'mcq',
    q: '"L\'addition" means?',
    opts: ['The menu', 'The starter', 'The bill', 'The dessert'],
    ans: 2,
    exp: '"L\'addition" is the bill/check at a restaurant.'
  },
  {
    id: 'fr-080', topic: 'fr-vie', lesson: 'fr-l16', type: 'mcq',
    q: '"Il fait beau" means?',
    opts: ['It\'s cold', 'It\'s raining', 'It\'s nice / sunny weather', 'It\'s windy'],
    ans: 2,
    exp: '"Il fait beau" is a common weather expression meaning it\'s nice/fine weather.'
  },
  {
    id: 'fr-081', topic: 'fr-vie', lesson: 'fr-l16', type: 'mcq',
    q: '"Il pleut" means?',
    opts: ['It\'s snowing', 'It\'s raining', 'It\'s foggy', 'It\'s hot'],
    ans: 1,
    exp: '"Il pleut" comes from the verb pleuvoir and means it is raining.'
  },
  {
    id: 'fr-082', topic: 'fr-vie', lesson: 'fr-l16', type: 'mcq',
    q: '"Il fait chaud" means?',
    opts: ['It\'s cold', 'It\'s windy', 'It\'s hot', 'It\'s cloudy'],
    ans: 2,
    exp: '"Il fait chaud" means it\'s hot. "Chaud" = hot/warm.'
  },
  {
    id: 'fr-083', topic: 'fr-vie', lesson: 'fr-l39', type: 'mcq',
    q: '"Une chambre" at a hotel means?',
    opts: ['A bathroom', 'A room', 'A bed', 'A key'],
    ans: 1,
    exp: '"Une chambre" means a bedroom/room in a hotel.'
  },
  {
    id: 'fr-084', topic: 'fr-vie', lesson: 'fr-l39', type: 'mcq',
    q: '"En voiture" means?',
    opts: ['On foot', 'By train', 'By car', 'By plane'],
    ans: 2,
    exp: '"En voiture" means by car. "Voiture" = car.'
  },
  {
    id: 'fr-085', topic: 'fr-vie', lesson: 'fr-l39', type: 'mcq',
    q: '"Tournez à gauche" means?',
    opts: ['Go straight', 'Turn left', 'Turn right', 'Stop here'],
    ans: 1,
    exp: '"Tournez à gauche" = Turn left. "Tournez" = turn, "à gauche" = to the left.'
  },

  // ── NEW: Conjugaison & grammaire avancée (fr-086 to fr-120) ──────────────

  // -ER verb gapfill
  {
    id: 'fr-086', topic: 'fr-conj', lesson: 'fr-l09', type: 'gapfill',
    q: 'Complete with the correct form of "parler" (to speak):',
    template: 'Nous {0} français tous les jours.',
    gaps: [{ options: ['parlons', 'parlez', 'parlent', 'parle'], answer: 0 }],
    exp: '"Nous" takes the "-ons" ending for -ER verbs: nous parlons.'
  },
  {
    id: 'fr-087', topic: 'fr-conj', lesson: 'fr-l09', type: 'gapfill',
    q: 'Complete with the correct form of "aimer" (to like/love):',
    template: 'Elle {0} le chocolat.',
    gaps: [{ options: ['aime', 'aimes', 'aimons', 'aimez'], answer: 0 }],
    exp: '"Il/elle" takes "-e" for -ER verbs: elle aime.'
  },
  {
    id: 'fr-088', topic: 'fr-conj', lesson: 'fr-l09', type: 'gapfill',
    q: 'Complete with the correct form of "travailler" (to work):',
    template: 'Vous {0} beaucoup.',
    gaps: [{ options: ['travaillez', 'travaillons', 'travaillent', 'travaille'], answer: 0 }],
    exp: '"Vous" takes "-ez" for -ER verbs: vous travaillez.'
  },
  {
    id: 'fr-089', topic: 'fr-conj', lesson: 'fr-l09', type: 'dragdrop',
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
    id: 'fr-090', topic: 'fr-gram', lesson: 'fr-l10', type: 'gapfill',
    q: 'Make the sentence negative (ne...pas):',
    template: 'Je {0} parle {1} anglais.',
    gaps: [
      { options: ['ne', 'pas', 'non', 'n\''], answer: 0 },
      { options: ['pas', 'ne', 'non', 'rien'], answer: 0 },
    ],
    exp: 'Negation wraps the verb: Je NE parle PAS anglais.'
  },
  {
    id: 'fr-091', topic: 'fr-gram', lesson: 'fr-l10', type: 'gapfill',
    q: 'Form a question using "est-ce que":',
    template: '{0} tu parles espagnol ?',
    gaps: [{ options: ['Est-ce que', 'Que', 'Qui', 'Dont'], answer: 0 }],
    exp: '"Est-ce que" placed before subject + verb forms a question without inversion.'
  },
  {
    id: 'fr-092', topic: 'fr-gram', lesson: 'fr-l18', type: 'gapfill',
    q: 'Complete with the passé composé of "manger":',
    template: 'J\'{0} mangé ce matin.',
    gaps: [{ options: ['ai', 'suis', 'as', 'est'], answer: 0 }],
    exp: '"Manger" uses avoir in passé composé: j\'ai mangé.'
  },
  {
    id: 'fr-093', topic: 'fr-gram', lesson: 'fr-l19', type: 'gapfill',
    q: 'Complete with the passé composé of "aller":',
    template: 'Elle {0} allée au marché hier.',
    gaps: [{ options: ['est', 'a', 'sont', 'ont'], answer: 0 }],
    exp: '"Aller" uses être in passé composé: elle est allée.'
  },
  {
    id: 'fr-094', topic: 'fr-gram', lesson: 'fr-l18', type: 'dragdrop',
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
    id: 'fr-095', topic: 'fr-gram', lesson: 'fr-l19', type: 'dragdrop',
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
    id: 'fr-096', topic: 'fr-gram', lesson: 'fr-l20', type: 'gapfill',
    q: 'Complete with the imparfait of "habiter" (to live):',
    template: 'Quand j\'étais enfant, j\'{0} à Lyon.',
    gaps: [{ options: ['habitais', 'habite', 'habiterai', 'habitait'], answer: 0 }],
    exp: 'Imparfait: stem from nous form (drop -ons) + -ais. j\'habitais = I used to live.'
  },
  {
    id: 'fr-097', topic: 'fr-gram', lesson: 'fr-l20', type: 'mcq',
    q: 'The imparfait is used for?',
    opts: ['A single completed past action', 'An ongoing or habitual past action / description', 'A future plan', 'A polite request'],
    ans: 1,
    exp: 'Imparfait = ongoing, habitual, or descriptive past. Passé composé = completed event.'
  },
  {
    id: 'fr-098', topic: 'fr-gram', lesson: 'fr-l20', type: 'mcq',
    q: '"Quand j\'étais jeune, je jouais au foot" — the imparfait here expresses?',
    opts: ['A sudden completed event', 'A habitual past activity', 'A future intention', 'A polite wish'],
    ans: 1,
    exp: '"Je jouais" = I used to play — a repeated past habit, expressed with imparfait.'
  },
  {
    id: 'fr-099', topic: 'fr-gram', lesson: 'fr-l22', type: 'gapfill',
    q: 'Complete with the futur simple of "parler":',
    template: 'Demain, je {0} avec le directeur.',
    gaps: [{ options: ['parlerai', 'parle', 'parlais', 'parlé'], answer: 0 }],
    exp: 'Futur simple: infinitive + -ai. parler → je parlerai.'
  },
  {
    id: 'fr-100', topic: 'fr-gram', lesson: 'fr-l22', type: 'dragdrop',
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
    id: 'fr-101', topic: 'fr-gram', lesson: 'fr-l22', type: 'mcq',
    q: '"Je vais partir" — which tense is this?',
    opts: ['Futur simple', 'Futur proche', 'Conditionnel', 'Présent'],
    ans: 1,
    exp: 'Futur proche = aller (présent) + infinitif. Je vais partir = I am going to leave.'
  },
  {
    id: 'fr-102', topic: 'fr-gram', lesson: 'fr-l23', type: 'mcq',
    q: '"Se lever" means?',
    opts: ['To lower something', 'To get up', 'To lie down', 'To leave'],
    ans: 1,
    exp: '"Se lever" is a pronominal (reflexive) verb meaning to get up.'
  },
  {
    id: 'fr-103', topic: 'fr-gram', lesson: 'fr-l23', type: 'gapfill',
    q: 'Complete with the present tense of "se laver":',
    template: 'Il {0} les mains avant de manger.',
    gaps: [{ options: ['se lave', 'se lève', 'se lavait', 'se lavé'], answer: 0 }],
    exp: '"Se laver" présent for il: il se lave (he washes himself).'
  },
  {
    id: 'fr-104', topic: 'fr-gram', lesson: 'fr-l23', type: 'mcq',
    q: 'In the passé composé, pronominal verbs use which auxiliary?',
    opts: ['avoir', 'être', 'aller', 'faire'],
    ans: 1,
    exp: 'All pronominal (reflexive) verbs use être in passé composé: je me suis levé(e).'
  },
  {
    id: 'fr-105', topic: 'fr-gram', lesson: 'fr-l24', type: 'mcq',
    q: '"Je le vois" — what does "le" replace?',
    opts: ['A feminine direct object', 'A masculine singular direct object', 'An indirect object', 'A plural noun'],
    ans: 1,
    exp: '"Le" is the masculine singular COD (direct object pronoun).'
  },
  {
    id: 'fr-106', topic: 'fr-gram', lesson: 'fr-l24', type: 'mcq',
    q: 'The COI pronoun for "to him / to her" is?',
    opts: ['lui', 'le', 'la', 'leur'],
    ans: 0,
    exp: '"Lui" is the COI pronoun for he/she: Je lui parle = I speak to him/her.'
  },
  {
    id: 'fr-107', topic: 'fr-gram', lesson: 'fr-l24', type: 'mcq',
    q: '"Nous leur parlons" — "leur" means?',
    opts: ['To him', 'To her', 'To them', 'For us'],
    ans: 2,
    exp: '"Leur" (plural COI) means "to them".'
  },
  {
    id: 'fr-108', topic: 'fr-gram', lesson: 'fr-l24', type: 'mcq',
    q: 'Where do COD/COI object pronouns go in a sentence?',
    opts: ['After the verb', 'Before the conjugated verb', 'At the end of the sentence', 'After the subject'],
    ans: 1,
    exp: 'Object pronouns go directly before the conjugated verb: Je le vois / Je lui parle.'
  },
  {
    id: 'fr-109', topic: 'fr-gram', lesson: 'fr-l27', type: 'mcq',
    q: 'The conditionnel présent is formed with?',
    opts: ['Present stem + present endings', 'Futur stem + imparfait endings', 'Infinitive + être', 'Past participle + avoir'],
    ans: 1,
    exp: 'Conditionnel = futur simple stem + imparfait endings (-ais, -ais, -ait, -ions, -iez, -aient).'
  },
  {
    id: 'fr-110', topic: 'fr-gram', lesson: 'fr-l27', type: 'mcq',
    q: '"Je voudrais un café" — what tense is "voudrais"?',
    opts: ['Imparfait', 'Futur simple', 'Conditionnel présent', 'Subjonctif'],
    ans: 2,
    exp: '"Voudrais" is conditionnel présent of vouloir, used for polite requests.'
  },
  {
    id: 'fr-111', topic: 'fr-gram', lesson: 'fr-l27', type: 'gapfill',
    q: 'Complete: si + imparfait → conditionnel (voyager):',
    template: 'Si j\'avais le temps, je {0} en France.',
    gaps: [{ options: ['voyagerais', 'voyage', 'voyagerai', 'ai voyagé'], answer: 0 }],
    exp: 'Si + imparfait → conditionnel présent: je voyagerais = I would travel.'
  },
  {
    id: 'fr-112', topic: 'fr-gram', lesson: 'fr-l28', type: 'mcq',
    q: '"Il faut que tu ___" is followed by which mood?',
    opts: ['Indicatif', 'Conditionnel', 'Subjonctif', 'Infinitif'],
    ans: 2,
    exp: '"Il faut que" always triggers the subjonctif.'
  },
  {
    id: 'fr-113', topic: 'fr-gram', lesson: 'fr-l28', type: 'mcq',
    q: 'Subjonctif of "être" for "il/elle" is?',
    opts: ['est', 'soit', 'serait', 'était'],
    ans: 1,
    exp: '"Être" has an irregular subjonctif: que je sois, que tu sois, qu\'il soit.'
  },
  {
    id: 'fr-114', topic: 'fr-gram', lesson: 'fr-l28', type: 'mcq',
    q: '"bien que" (although) is followed by which mood?',
    opts: ['Indicatif', 'Conditionnel', 'Infinitif', 'Subjonctif'],
    ans: 3,
    exp: '"Bien que" always takes the subjonctif: bien qu\'il soit tard.'
  },
  {
    id: 'fr-115', topic: 'fr-gram', lesson: 'fr-l29', type: 'mcq',
    q: '"L\'homme ___ parle" — which relative pronoun completes this?',
    opts: ['que', 'dont', 'qui', 'où'],
    ans: 2,
    exp: '"Qui" is the subject relative pronoun: l\'homme qui parle = the man who speaks.'
  },
  {
    id: 'fr-116', topic: 'fr-gram', lesson: 'fr-l29', type: 'mcq',
    q: '"Le livre ___ j\'ai lu" — which relative pronoun?',
    opts: ['qui', 'que', 'dont', 'où'],
    ans: 1,
    exp: '"Que" is the direct object relative pronoun: le livre que j\'ai lu = the book I read.'
  },
  {
    id: 'fr-117', topic: 'fr-gram', lesson: 'fr-l29', type: 'mcq',
    q: '"Le pays ___ je vis" — which relative pronoun?',
    opts: ['qui', 'que', 'dont', 'où'],
    ans: 3,
    exp: '"Où" is used for place or time: le pays où je vis = the country where I live.'
  },
  {
    id: 'fr-118', topic: 'fr-gram', lesson: 'fr-l29', type: 'mcq',
    q: '"Le livre ___ j\'ai besoin" — which relative pronoun? (avoir besoin DE)',
    opts: ['qui', 'que', 'dont', 'où'],
    ans: 2,
    exp: '"Dont" replaces de + noun: le livre dont j\'ai besoin (avoir besoin de).'
  },
  {
    id: 'fr-119', topic: 'fr-gram', lesson: 'fr-l29', type: 'dragdrop',
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
    id: 'fr-120', topic: 'fr-gram', lesson: 'fr-l19', type: 'mcq',
    q: '"Elle est partie" — the past participle "parti" adds -e because?',
    opts: ['All -IR verbs add -e', 'The subject is feminine and être is the auxiliary', 'It is always irregular', 'It is in the futur'],
    ans: 1,
    exp: 'With être in passé composé, the past participle agrees with the subject gender: elle est partie.'
  },
  // ── Extended practice bank (breadth: family, time, dates, food, weather, tenses) ──
  {"id":"fr-121","topic":"fr-salut","lesson":"fr-l15","type":"mcq","q":"A waiter says « Vous désirez ? ». He is asking:","opts":["How are you?","What would you like?","Where are you from?","What's your name?"],"ans":1,"exp":"« Vous désirez ? » = What would you like? (taking an order)."},
  {"id":"fr-122","topic":"fr-salut","lesson":"fr-l01","type":"mcq","q":"Which reply best answers « Comment ça va ? »","opts":["Je m'appelle Léa","Ça va bien, merci","Au revoir","J'ai 20 ans"],"ans":1,"exp":"« Ça va bien, merci » = I'm fine, thanks."},
  {"id":"fr-123","topic":"fr-salut","lesson":"fr-l01","type":"mcq","q":"« Enchanté(e) ! » is said when:","opts":["leaving","meeting someone for the first time","apologising","thanking"],"ans":1,"exp":"« Enchanté(e) » = pleased to meet you, on first meeting."},
  {"id":"fr-124","topic":"fr-salut","lesson":"fr-l01","type":"mcq","q":"To politely get a stranger's attention you say:","opts":["Salut !","Excusez-moi, Monsieur","De rien","Bonne nuit"],"ans":1,"exp":"« Excusez-moi » politely gets attention or apologises."},
  {"id":"fr-125","topic":"fr-salut","lesson":"fr-l01","type":"mcq","q":"« À tout à l'heure » means:","opts":["See you tomorrow","See you later today","Goodbye forever","Good night"],"ans":1,"exp":"« À tout à l'heure » = see you later (the same day)."},
  {"id":"fr-126","topic":"fr-vocab","lesson":"fr-l11","type":"mcq","q":"« la sœur » means:","opts":["the brother","the sister","the mother","the aunt"],"ans":1,"exp":"la sœur = the sister."},
  {"id":"fr-127","topic":"fr-vocab","lesson":"fr-l11","type":"mcq","q":"« les grands-parents » are:","opts":["the parents","the grandparents","the cousins","the children"],"ans":1,"exp":"les grands-parents = the grandparents."},
  {"id":"fr-128","topic":"fr-vocab","lesson":"fr-l11","type":"mcq","q":"Which word means « husband »?","opts":["la femme","le mari","le fils","le frère"],"ans":1,"exp":"le mari = husband; la femme = wife."},
  {"id":"fr-129","topic":"fr-vocab","lesson":"fr-l15","type":"mcq","q":"« un jus d'orange » is a:","opts":["food","drink","place","colour"],"ans":1,"exp":"un jus d'orange = an orange juice (a drink)."},
  {"id":"fr-130","topic":"fr-vocab","lesson":"fr-l15","type":"mcq","q":"Which is something you eat?","opts":["un café","une eau","un croissant","un thé"],"ans":2,"exp":"un croissant is food; the others are drinks."},
  {"id":"fr-131","topic":"fr-vocab","lesson":"fr-l16","type":"mcq","q":"« Il fait froid » describes:","opts":["the time","the weather (cold)","a feeling","a colour"],"ans":1,"exp":"« Il fait froid » = it's cold (weather)."},
  {"id":"fr-132","topic":"fr-vocab","lesson":"fr-l16","type":"mcq","q":"Which season is « l'hiver »?","opts":["spring","summer","autumn","winter"],"ans":3,"exp":"l'hiver = winter."},
  {"id":"fr-133","topic":"fr-vocab","lesson":"fr-l13","type":"mcq","q":"« Elle est espagnole » means she is:","opts":["Italian","Spanish","German","English"],"ans":1,"exp":"espagnole = Spanish (feminine)."},
  {"id":"fr-134","topic":"fr-vocab","lesson":"fr-l13","type":"mcq","q":"The language « le chinois » is:","opts":["Japanese","Korean","Chinese","Vietnamese"],"ans":2,"exp":"le chinois = Chinese."},
  {"id":"fr-136","topic":"fr-vocab","lesson":"fr-l11","type":"dragdrop","q":"Match each French word to its meaning:","pairs":[{"left":"le père","right":"father"},{"left":"la mère","right":"mother"},{"left":"le fils","right":"son"},{"left":"la fille","right":"daughter"}],"exp":"Core family vocabulary: père, mère, fils, fille."},
  {"id":"fr-137","topic":"fr-vocab","lesson":"fr-l16","type":"dragdrop","q":"Match the season to English:","pairs":[{"left":"le printemps","right":"spring"},{"left":"l'été","right":"summer"},{"left":"l'automne","right":"autumn"},{"left":"l'hiver","right":"winter"}],"exp":"The four seasons in French."},
  {"id":"fr-138","topic":"fr-gram","lesson":"fr-l04","type":"mcq","q":"« Je vais ___ cinéma. » (à + le)","opts":["à le","au","aux","du"],"ans":1,"exp":"à + le = au."},
  {"id":"fr-139","topic":"fr-gram","lesson":"fr-l04","type":"mcq","q":"« le livre ___ professeur » (de + le)","opts":["de le","du","des","au"],"ans":1,"exp":"de + le = du."},
  {"id":"fr-140","topic":"fr-gram","lesson":"fr-l05","type":"mcq","q":"Plural of « un animal »:","opts":["des animals","des animaux","des animales","des animal"],"ans":1,"exp":"-al → -aux: animaux."},
  {"id":"fr-141","topic":"fr-gram","lesson":"fr-l11","type":"mcq","q":"« ___ amie » (my, before a vowel):","opts":["ma","mon","mes","m'"],"ans":1,"exp":"Before a feminine word starting with a vowel, use « mon » for sound: mon amie."},
  {"id":"fr-142","topic":"fr-gram","lesson":"fr-l11","type":"mcq","q":"« ses livres » means:","opts":["my books","our books","his/her books","your books"],"ans":2,"exp":"ses = his/her (plural object)."},
  {"id":"fr-143","topic":"fr-gram","lesson":"fr-l15","type":"mcq","q":"« Je mange ___ pain. » (some bread)","opts":["du","de la","des","le"],"ans":0,"exp":"Partitive masculine: du pain."},
  {"id":"fr-144","topic":"fr-gram","lesson":"fr-l15","type":"mcq","q":"Negative: « Je bois du café » →","opts":["Je ne bois pas du café","Je ne bois pas de café","Je bois ne pas café","Je ne bois pas le café"],"ans":1,"exp":"After a negative, partitive → de: pas de café."},
  {"id":"fr-145","topic":"fr-gram","lesson":"fr-l25","type":"mcq","q":"« Paul est ___ grand ___ Marc. » (taller than)","opts":["plus … que","moins … que","aussi … que","le plus … de"],"ans":0,"exp":"plus … que = more … than."},
  {"id":"fr-146","topic":"fr-gram","lesson":"fr-l25","type":"mcq","q":"Comparative of « bon »:","opts":["plus bon","meilleur","mieux","bien"],"ans":1,"exp":"bon → meilleur (irregular)."},
  {"id":"fr-147","topic":"fr-gram","lesson":"fr-l29","type":"mcq","q":"« L'homme ___ parle est mon père. »","opts":["que","qui","dont","où"],"ans":1,"exp":"Subject relative pronoun → qui."},
  {"id":"fr-148","topic":"fr-gram","lesson":"fr-l29","type":"mcq","q":"« Le livre ___ je lis. »","opts":["qui","que","dont","où"],"ans":1,"exp":"Direct object relative pronoun → que."},
  {"id":"fr-149","topic":"fr-gram","lesson":"fr-l29","type":"mcq","q":"« Le pays ___ je vis. »","opts":["qui","que","dont","où"],"ans":3,"exp":"Place → où."},
  {"id":"fr-150","topic":"fr-gram","lesson":"fr-l15","type":"gapfill","q":"Choose the correct article:","template":"J'achète {0} pommes au marché.","gaps":[{"options":["des","du","de la","le"],"answer":0}],"exp":"Plural « some » → des pommes."},
  {"id":"fr-151","topic":"fr-gram","lesson":"fr-l04","type":"gapfill","q":"Complete the contraction:","template":"Elle parle {0} enfants. (à + les)","gaps":[{"options":["aux","à les","des","au"],"answer":0}],"exp":"à + les = aux."},
  {"id":"fr-152","topic":"fr-num","lesson":"fr-l07","type":"mcq","q":"« Il est trois heures et quart » = ","opts":["3:15","3:30","3:45","4:15"],"ans":0,"exp":"et quart = quarter past → 3:15."},
  {"id":"fr-153","topic":"fr-num","lesson":"fr-l07","type":"mcq","q":"« cinq heures moins le quart » = ","opts":["5:15","5:45","4:45","4:15"],"ans":2,"exp":"moins le quart = quarter to → 4:45."},
  {"id":"fr-154","topic":"fr-num","lesson":"fr-l07","type":"mcq","q":"« midi » means:","opts":["midnight","noon","morning","evening"],"ans":1,"exp":"midi = noon; minuit = midnight."},
  {"id":"fr-157","topic":"fr-num","lesson":"fr-l07","type":"mcq","q":"14:30 in 24-hour French is:","opts":["deux heures trente","quatorze heures trente","quatre heures trente","quatorze et demie"],"ans":1,"exp":"quatorze heures trente = 14:30."},
  {"id":"fr-160","topic":"fr-vie","lesson":"fr-l15","type":"mcq","q":"« L'addition, s'il vous plaît » asks for:","opts":["the menu","the bill","a waiter","the toilet"],"ans":1,"exp":"l'addition = the bill."},
  {"id":"fr-161","topic":"fr-vie","lesson":"fr-l15","type":"mcq","q":"Polite way to order a coffee:","opts":["Donne un café","Je veux café","Je voudrais un café","Café maintenant"],"ans":2,"exp":"« Je voudrais » is the polite « I would like »."},
  {"id":"fr-162","topic":"fr-vie","lesson":"fr-l39","type":"mcq","q":"« Où est la gare ? » asks:","opts":["What is the station?","Where is the station?","When is the train?","How much is the ticket?"],"ans":1,"exp":"Où = where: Where is the station?"},
  {"id":"fr-163","topic":"fr-vie","lesson":"fr-l39","type":"mcq","q":"« Tournez à gauche » means:","opts":["Turn right","Turn left","Go straight","Stop here"],"ans":1,"exp":"à gauche = left; à droite = right."},
  {"id":"fr-164","topic":"fr-vie","lesson":"fr-l23","type":"mcq","q":"« Je me lève à sept heures » describes:","opts":["a daily routine","the weather","a price","a place"],"ans":0,"exp":"se lever (reflexive) describes daily routine: I get up at seven."},
  {"id":"fr-165","topic":"fr-vie","lesson":"fr-l42","type":"mcq","q":"« faire les courses » means:","opts":["to do sport","to go shopping (groceries)","to cook","to run"],"ans":1,"exp":"faire les courses = to do the (grocery) shopping."},
  {"id":"fr-166","topic":"fr-vie","lesson":"fr-l42","type":"mcq","q":"« C'est combien ? » asks:","opts":["What is it?","How much is it?","Where is it?","Whose is it?"],"ans":1,"exp":"combien = how much: How much is it?"},
  {"id":"fr-167","topic":"fr-vie","lesson":"fr-l15","type":"gapfill","q":"Complete the café order:","template":"Je {0} une salade, s'il vous plaît.","gaps":[{"options":["voudrais","veux","vais","suis"],"answer":0}],"exp":"Polite: je voudrais une salade."},
  {"id":"fr-168","topic":"fr-conj","lesson":"fr-l02","type":"mcq","q":"« Nous ___ français. » (être)","opts":["sommes","êtes","sont","est"],"ans":0,"exp":"nous sommes."},
  {"id":"fr-169","topic":"fr-conj","lesson":"fr-l14","type":"mcq","q":"« Vous ___ vos devoirs. » (faire)","opts":["faisons","faites","font","fais"],"ans":1,"exp":"vous faites (irregular)."},
  {"id":"fr-170","topic":"fr-conj","lesson":"fr-l18","type":"mcq","q":"Past participle of « prendre »:","opts":["prendu","pris","prit","prené"],"ans":1,"exp":"prendre → pris."},
  {"id":"fr-171","topic":"fr-conj","lesson":"fr-l19","type":"mcq","q":"« Elle ___ allée au marché. » (passé composé)","opts":["a","est","va","fait"],"ans":1,"exp":"aller uses être: elle est allée."},
  {"id":"fr-172","topic":"fr-conj","lesson":"fr-l20","type":"mcq","q":"« Quand j'étais jeune, je ___ au foot. »","opts":["ai joué","jouais","jouerai","joue"],"ans":1,"exp":"Habit in the past → imparfait: je jouais."},
  {"id":"fr-173","topic":"fr-conj","lesson":"fr-l22","type":"mcq","q":"Futur simple of « aller » for « je »:","opts":["allerai","irai","vais","allais"],"ans":1,"exp":"aller → ir-: j'irai."},
  {"id":"fr-174","topic":"fr-conj","lesson":"fr-l27","type":"mcq","q":"« Si j'avais le temps, je ___ (voyager). »","opts":["voyage","voyagerai","voyagerais","voyageais"],"ans":2,"exp":"si + imparfait → conditionnel: je voyagerais."},
  {"id":"fr-175","topic":"fr-conj","lesson":"fr-l28","type":"mcq","q":"« Il faut que tu ___ (être) là. »","opts":["es","sois","seras","étais"],"ans":1,"exp":"Subjonctif: que tu sois."},
  {"id":"fr-176","topic":"fr-conj","lesson":"fr-l23","type":"mcq","q":"« Je me suis ___ tôt. » (se lever, féminin)","opts":["levé","levée","levés","lever"],"ans":1,"exp":"Pronominal + feminine subject → levée."},
  {"id":"fr-177","topic":"fr-conj","lesson":"fr-l18","type":"gapfill","q":"Passé composé with avoir:","template":"Hier, j'{0} un bon film. (regarder)","gaps":[{"options":["ai regardé","suis regardé","regardais","regarde"],"answer":0}],"exp":"regarder uses avoir: j'ai regardé."},
  {"id":"fr-178","topic":"fr-conj","lesson":"fr-l22","type":"gapfill","q":"Choose the correct future:","template":"Demain, nous {0} à la plage. (aller)","gaps":[{"options":["irons","allons","allions","irez"],"answer":0}],"exp":"Futur simple of aller: nous irons."},
  {"id":"fr-179","topic":"fr-conj","lesson":"fr-l03","type":"dragdrop","q":"Match the subject to « avoir » (présent):","pairs":[{"left":"j'","right":"ai"},{"left":"tu","right":"as"},{"left":"nous","right":"avons"},{"left":"ils","right":"ont"}],"exp":"avoir: j'ai, tu as, il a, nous avons, vous avez, ils ont."},
  {"id":"fr-180","topic":"fr-conj","lesson":"fr-l19","type":"dragdrop","q":"Match the verb to its auxiliary in the passé composé:","pairs":[{"left":"manger","right":"avoir"},{"left":"aller","right":"être"},{"left":"finir","right":"avoir"},{"left":"partir","right":"être"}],"exp":"Movement/state verbs (aller, partir) use être; most others use avoir."},
  {"id":"fr-181","topic":"fr-conj","lesson":"fr-l02","type":"dragdrop","q":"Match subject to « être » (présent):","pairs":[{"left":"je","right":"suis"},{"left":"tu","right":"es"},{"left":"vous","right":"êtes"},{"left":"elles","right":"sont"}],"exp":"être: je suis, tu es, il est, nous sommes, vous êtes, ils sont."},
  {"id":"fr-182","topic":"fr-conj","lesson":"fr-l27","type":"mcq","q":"Conditionnel of « vouloir » for politeness:","opts":["je veux","je voudrais","je voulais","je voudrai"],"ans":1,"exp":"je voudrais = I would like (polite)."},

  // ── Pronunciation & accents ──────────────────────────────────────────────────
  {"id":"fr-183","topic":"fr-gram","lesson":"fr-l40","type":"mcq","q":"What sound does the accent aigu (é) represent?","opts":["Like \"ay\" in \"say\"","Like \"a\" in \"cat\"","Like \"ee\" in \"see\"","It is silent"],"ans":0,"exp":"é sounds like \"ay\": café, été, répéter."},
  {"id":"fr-184","topic":"fr-gram","lesson":"fr-l40","type":"mcq","q":"The cédille (ç) always sounds like:","opts":["\"k\" (as in \"car\")","\"s\" (as in \"sun\")","\"sh\" (as in \"she\")","\"z\" (as in \"zoo\")"],"ans":1,"exp":"ç = s sound before a, o, u: garçon, leçon, français."},
  {"id":"fr-185","topic":"fr-gram","lesson":"fr-l40","type":"mcq","q":"In \"naïve\", the tréma (¨) on the ï means:","opts":["The i is silent","Pronounce the a and i as separate syllables","Stress the syllable","The word is feminine"],"ans":1,"exp":"Tréma separates vowels that would otherwise combine: naïve = na-ïve, not \"nave\"."},
  {"id":"fr-186","topic":"fr-gram","lesson":"fr-l40","type":"mcq","q":"\"Les enfants\" — what happens in spoken French?","opts":["The s in \"les\" is fully silent","The silent s of \"les\" links to the vowel: \"lez-enfants\"","The t in \"enfants\" is pronounced","All letters are silent"],"ans":1,"exp":"Liaison: a normally silent final consonant is pronounced before a vowel word. Les enfants → lez-enfants."},
  {"id":"fr-187","topic":"fr-gram","lesson":"fr-l40","type":"mcq","q":"The French \"ou\" sound (in \"vous\", \"rouge\") rhymes with:","opts":["\"oo\" in \"boot\"","\"uh\" in \"but\"","\"u\" in \"cup\"","\"ow\" in \"now\""],"ans":0,"exp":"ou = \"oo\": vous, rouge, beaucoup, bouche."},
  {"id":"fr-188","topic":"fr-gram","lesson":"fr-l40","type":"mcq","q":"The French \"u\" (in \"tu\", \"rue\") is unusual because:","opts":["It sounds exactly like English \"oo\"","You round your lips as for \"oo\" but say \"ee\" — no English equivalent","It is always silent","It sounds like \"uh\""],"ans":1,"exp":"French \"u\" has no English equivalent — round lips as if saying \"oo\", then say \"ee\": une, rue, tu."},
  {"id":"fr-189","topic":"fr-gram","lesson":"fr-l40","type":"mcq","q":"In French, most final consonants are:","opts":["Always pronounced","Silent unless followed by a vowel-starting word (liaison)","Doubled before a vowel","Always stressed"],"ans":1,"exp":"Final consonants are usually silent: vous parlEZ, ils sontT — but can link before a vowel: vous_avez → vouz-avez."},
  {"id":"fr-190","topic":"fr-gram","lesson":"fr-l40","type":"mcq","q":"Nasal vowels (un, in, on, an) are produced by:","opts":["Pressing the tongue to the roof of the mouth","Allowing air to flow through the nose as you speak","Doubling the vowel length","Closing the lips tightly"],"ans":1,"exp":"Nasal vowels involve nasal resonance — breathe through your nose as you say them. The n/m is not fully articulated."},
  {"id":"fr-191","topic":"fr-gram","lesson":"fr-l40","type":"dragdrop","q":"Match each accent to an example word:","pairs":[{"left":"accent aigu","right":"café"},{"left":"accent grave","right":"père"},{"left":"cédille","right":"français"},{"left":"tréma","right":"naïf"}],"exp":"é = aigu (sounds like ay), è = grave (open e), ç = cédille (s sound), ï = tréma (separate vowels)."},
  {"id":"fr-192","topic":"fr-gram","lesson":"fr-l40","type":"gapfill","q":"Both words contain a cédille. Complete the spelling:","template":"La le{0}on de fran{1}ais commence maintenant.","gaps":[{"options":["ç","c","ss","x"],"answer":0},{"options":["ç","c","ss","z"],"answer":0}],"exp":"leçon and français both use ç to give the 's' sound before o and a."},

  // ── Le corps et la santé ─────────────────────────────────────────────────────
  {"id":"fr-193","topic":"fr-vie","lesson":"fr-l41","type":"mcq","q":"\"La tête\" means:","opts":["the arm","the head","the foot","the hand"],"ans":1,"exp":"la tête = the head."},
  {"id":"fr-194","topic":"fr-vie","lesson":"fr-l41","type":"mcq","q":"\"J'ai mal à la gorge\" means:","opts":["I have a sore arm","I have a sore throat","I have a headache","I have a stomach ache"],"ans":1,"exp":"la gorge = the throat; j'ai mal à la gorge = I have a sore throat."},
  {"id":"fr-195","topic":"fr-vie","lesson":"fr-l41","type":"mcq","q":"\"Le ventre\" refers to:","opts":["the chest","the stomach/belly","the back","the leg"],"ans":1,"exp":"le ventre = the stomach / belly / abdomen."},
  {"id":"fr-196","topic":"fr-vie","lesson":"fr-l41","type":"gapfill","q":"My back hurts — use à + le:","template":"J'ai mal {0} dos.","gaps":[{"options":["au","à le","à la","du"],"answer":0}],"exp":"à + le = au: j'ai mal au dos."},
  {"id":"fr-197","topic":"fr-vie","lesson":"fr-l41","type":"mcq","q":"Which word has 'les yeux' as its IRREGULAR plural?","opts":["le nez","l'oeil","la tête","le bras"],"ans":1,"exp":"l'oeil (eye) → les yeux (eyes) — completely irregular plural."},
  {"id":"fr-198","topic":"fr-vie","lesson":"fr-l41","type":"mcq","q":"At the pharmacy, \"j'ai de la fièvre\" means:","opts":["I have a cold","I have a fever","I have a cough","I feel dizzy"],"ans":1,"exp":"la fièvre = fever; j'ai de la fièvre = I have a fever."},
  {"id":"fr-199","topic":"fr-vie","lesson":"fr-l41","type":"dragdrop","q":"Match the French body part to its English meaning:","pairs":[{"left":"la main","right":"hand"},{"left":"le genou","right":"knee"},{"left":"l'épaule","right":"shoulder"},{"left":"la cheville","right":"ankle"}],"exp":"la main = hand, le genou = knee, l'épaule = shoulder, la cheville = ankle."},
  {"id":"fr-200","topic":"fr-vie","lesson":"fr-l41","type":"gapfill","q":"My teeth hurt — use à + les:","template":"J'ai mal {0} dents.","gaps":[{"options":["aux","à les","au","à la"],"answer":0}],"exp":"à + les = aux: j'ai mal aux dents."},
  {"id":"fr-201","topic":"fr-vie","lesson":"fr-l41","type":"mcq","q":"\"Je tousse\" means:","opts":["I sneeze","I cough","I vomit","I faint"],"ans":1,"exp":"tousser = to cough; je tousse."},
  {"id":"fr-202","topic":"fr-vie","lesson":"fr-l41","type":"mcq","q":"\"J'ai mal au coeur\" means:","opts":["I have heartburn","I feel sick / nauseous","I have chest pain","My heart is broken"],"ans":1,"exp":"avoir mal au coeur = to feel sick/nauseous (literally to have pain at the heart)."},
  {"id":"fr-203","topic":"fr-vie","lesson":"fr-l41","type":"mcq","q":"\"Il faut prendre des médicaments\" means:","opts":["It is necessary to take medicine","You must see a doctor","Buy medicine at the pharmacy","Take a rest"],"ans":0,"exp":"il faut + infinitif = it is necessary to; des médicaments = medicine/tablets."},
  {"id":"fr-204","topic":"fr-vie","lesson":"fr-l41","type":"gapfill","q":"Her stomach hurts:","template":"Elle a {0} au ventre.","gaps":[{"options":["mal","bien","froid","chaud"],"answer":0}],"exp":"avoir mal = to hurt/ache: elle a mal au ventre = her stomach hurts."},
  {"id":"fr-205","topic":"fr-vie","lesson":"fr-l41","type":"mcq","q":"Which is the correct singular form of 'les genoux'?","opts":["le genu","le genou","la genoue","le genoux"],"ans":1,"exp":"le genou → les genoux (add x for words ending in -ou such as genou, bijou, caillou)."},
  {"id":"fr-206","topic":"fr-vie","lesson":"fr-l41","type":"scenario","setup":"You are at the doctor's surgery in Paris. The doctor asks you some questions.","parts":[{"q":"The doctor says \"Qu'est-ce qui ne va pas ?\" — what is she asking?","opts":["What is your name?","What is wrong with you?","Do you have insurance?","How old are you?"],"ans":1,"exp":"Qu'est-ce qui ne va pas ? = What is wrong? / What's the matter?"},{"q":"You want to say \"I have had a headache for three days.\" Which is correct?","opts":["J'ai mal à la tête depuis trois jours","J'ai de la fièvre depuis trois jours","J'ai mal à l'estomac depuis trois jours","Je suis fatigué depuis trois jours"],"ans":0,"exp":"j'ai mal à la tête = headache; depuis trois jours = for three days (ongoing → use depuis + present)."},{"q":"The doctor says \"Prenez ces comprimés trois fois par jour.\" What should you do?","opts":["Take these tablets once a day","Take these tablets three times a day","Take these tablets with every meal","Rest for three days"],"ans":1,"exp":"comprimés = tablets; trois fois par jour = three times a day."}],"exp":"At the doctor: Qu'est-ce qui ne va pas? → j'ai mal à... depuis... → prenez... par jour."},
  {"id":"fr-207","topic":"fr-vie","lesson":"fr-l41","type":"mcq","q":"At the pharmacy, you say you have a cough. Which phrase is correct?","opts":["J'ai mal au dos","Je tousse beaucoup","J'ai de la fièvre","J'ai mal à la tête"],"ans":1,"exp":"tousser = to cough; je tousse beaucoup = I am coughing a lot."},

  // ── Les vêtements et le shopping ─────────────────────────────────────────────
  {"id":"fr-208","topic":"fr-vie","lesson":"fr-l42","type":"mcq","q":"\"Un manteau\" is:","opts":["a hat","a coat","a scarf","a pair of trousers"],"ans":1,"exp":"un manteau = a coat."},
  {"id":"fr-209","topic":"fr-vie","lesson":"fr-l42","type":"mcq","q":"\"Je porte une robe\" means:","opts":["I am wearing a dress","I am wearing a skirt","I am wearing a jacket","I am wearing trousers"],"ans":0,"exp":"une robe = a dress; porter = to wear."},
  {"id":"fr-210","topic":"fr-vie","lesson":"fr-l42","type":"mcq","q":"False friend: \"une librairie\" is:","opts":["a library","a bookshop","a clothes shop","a pharmacy"],"ans":1,"exp":"une librairie = a bookshop. une bibliothèque = a library."},
  {"id":"fr-211","topic":"fr-vie","lesson":"fr-l42","type":"mcq","q":"How do you ask for a size in French?","opts":["Quelle est votre taille ?","C'est combien ?","Vous avez cela en rouge ?","Je voudrais l'essayer"],"ans":0,"exp":"Quelle est votre taille ? / Quelle taille faites-vous ? = What is your size?"},
  {"id":"fr-212","topic":"fr-vie","lesson":"fr-l42","type":"mcq","q":"\"Je voudrais l'essayer\" means:","opts":["I would like to buy it","I would like to try it on","I would like a refund","I would like to pay by card"],"ans":1,"exp":"essayer = to try on; je voudrais l'essayer = I would like to try it on."},
  {"id":"fr-213","topic":"fr-vie","lesson":"fr-l42","type":"mcq","q":"\"Une boulangerie\" sells:","opts":["meat","bread and pastries","vegetables","clothes"],"ans":1,"exp":"une boulangerie = a bakery (bread, croissants, baguettes)."},
  {"id":"fr-214","topic":"fr-vie","lesson":"fr-l42","type":"dragdrop","q":"Match the clothing item to its English meaning:","pairs":[{"left":"le pull","right":"jumper / sweater"},{"left":"le pantalon","right":"trousers"},{"left":"les chaussures","right":"shoes"},{"left":"la veste","right":"jacket"}],"exp":"pull = jumper, pantalon = trousers, chaussures = shoes, veste = jacket."},
  {"id":"fr-215","topic":"fr-vie","lesson":"fr-l42","type":"gapfill","q":"Complete the polite shop request:","template":"Je {0} ce pantalon en taille 40, s'il vous plaît.","gaps":[{"options":["voudrais","veux","dois","peux"],"answer":0}],"exp":"je voudrais = I would like (polite conditional — always use in shops)."},
  {"id":"fr-216","topic":"fr-vie","lesson":"fr-l42","type":"mcq","q":"\"Je paie par carte\" means:","opts":["I am paying in cash","I am paying by card","I am paying by cheque","I cannot pay"],"ans":1,"exp":"payer par carte = to pay by card; en espèces = in cash."},
  {"id":"fr-217","topic":"fr-vie","lesson":"fr-l42","type":"mcq","q":"\"C'est trop cher\" means:","opts":["It is very cheap","It is too expensive","It is on sale","It is the right size"],"ans":1,"exp":"trop = too (much); cher = expensive: it is too expensive."},
  {"id":"fr-218","topic":"fr-vie","lesson":"fr-l42","type":"gapfill","q":"Ask if they have this item in red:","template":"Vous avez {0} en rouge ?","gaps":[{"options":["ça","ici","bien","là"],"answer":0}],"exp":"ça = this/that (informal demonstrative): Vous avez ça en rouge ? = Do you have this in red?"},
  {"id":"fr-219","topic":"fr-vie","lesson":"fr-l42","type":"mcq","q":"\"Les soldes\" refers to:","opts":["the receipts","the sales","the prices","the stock"],"ans":1,"exp":"les soldes = the sales (seasonal sales); en solde = on sale / reduced."},
  {"id":"fr-220","topic":"fr-vie","lesson":"fr-l42","type":"mcq","q":"\"Une épicerie\" is:","opts":["a pharmacy","a grocery shop","a department store","a bakery"],"ans":1,"exp":"une épicerie = a grocery shop / corner shop."},
  {"id":"fr-221","topic":"fr-vie","lesson":"fr-l42","type":"scenario","setup":"You are shopping in a French clothes shop.","parts":[{"q":"The assistant says \"Je peux vous aider ?\" — what is she offering?","opts":["Can I help you?","What size are you?","We have a sale today","The changing rooms are upstairs"],"ans":0,"exp":"Je peux vous aider ? = Can I help you? (May I help you?)"},{"q":"You want to ask \"Do you have this shirt in a size 38?\" Which is best?","opts":["Vous avez cette chemise en taille 38 ?","Je voudrais une chemise taille 38","C'est combien cette chemise ?","Je l'essaie en 38"],"ans":0,"exp":"Vous avez + item + en taille + number ? = Do you have...in size...?"},{"q":"The price tag says \"30 % de réduction\". What does this mean?","opts":["30 % extra charge","30 % discount","Only 30 items in stock","Fixed price of 30 €"],"ans":1,"exp":"réduction = reduction / discount; 30 % de réduction = 30 % off."}],"exp":"Shopping: Je peux vous aider? → Vous avez...en taille...? → réduction = discount."},
  {"id":"fr-222","topic":"fr-vie","lesson":"fr-l42","type":"mcq","q":"In a shop, \"la cabine d'essayage\" is:","opts":["the checkout","the changing / fitting room","the display window","the stockroom"],"ans":1,"exp":"la cabine d'essayage = the changing room / fitting room."},

  // ── Le travail et la vie professionnelle ─────────────────────────────────────
  {"id":"fr-223","topic":"fr-vie","lesson":"fr-l43","type":"mcq","q":"\"Je suis médecin\" — why is there no article before médecin?","opts":["Because médecin is masculine","Because être + profession omits the article","Because it is in the plural","Because it is an irregular verb"],"ans":1,"exp":"être + profession takes NO article: je suis médecin (not *je suis un médecin)."},
  {"id":"fr-224","topic":"fr-vie","lesson":"fr-l43","type":"mcq","q":"What is the feminine form of \"un acteur\"?","opts":["une acteure","une actrice","une acteur","une acteurse"],"ans":1,"exp":"acteur → actrice (irregular feminine, like directeur → directrice)."},
  {"id":"fr-225","topic":"fr-vie","lesson":"fr-l43","type":"mcq","q":"\"Je travaille à temps plein\" means:","opts":["I work part-time","I work full-time","I work from home","I am self-employed"],"ans":1,"exp":"à temps plein = full-time; à temps partiel = part-time."},
  {"id":"fr-226","topic":"fr-vie","lesson":"fr-l43","type":"mcq","q":"\"Un(e) infirmier / infirmière\" is:","opts":["a doctor","a nurse","a pharmacist","a surgeon"],"ans":1,"exp":"un infirmier / une infirmière = a nurse."},
  {"id":"fr-227","topic":"fr-vie","lesson":"fr-l43","type":"mcq","q":"\"Je suis à mon compte\" means:","opts":["I have a bank account","I am self-employed","I am unemployed","I work for an agency"],"ans":1,"exp":"être à son compte = to be self-employed / freelance."},
  {"id":"fr-228","topic":"fr-vie","lesson":"fr-l43","type":"dragdrop","q":"Match the masculine profession to its feminine form:","pairs":[{"left":"un boulanger","right":"une boulangère"},{"left":"un vendeur","right":"une vendeuse"},{"left":"un directeur","right":"une directrice"},{"left":"un avocat","right":"une avocate"}],"exp":"boulanger/boulangère, vendeur/vendeuse (irregular), directeur/directrice, avocat/avocate."},
  {"id":"fr-229","topic":"fr-vie","lesson":"fr-l43","type":"mcq","q":"\"Mon bureau se trouve au deuxième étage\" means:","opts":["My desk is on the ground floor","My office is on the second floor","My office is in the basement","My desk is at reception"],"ans":1,"exp":"bureau = office / desk; deuxième étage = second floor (in France: rez-de-chaussée = ground, 1er étage = 1st, 2e étage = 2nd)."},
  {"id":"fr-230","topic":"fr-vie","lesson":"fr-l43","type":"mcq","q":"\"J'ai un entretien d'embauche\" means:","opts":["I have a team meeting","I have a job interview","I have a salary review","I am starting a new job"],"ans":1,"exp":"un entretien d'embauche = a job interview."},
  {"id":"fr-231","topic":"fr-vie","lesson":"fr-l43","type":"gapfill","q":"Complete — profession needs no article:","template":"Ma soeur {0} avocate.","gaps":[{"options":["est","a","fait","va"],"answer":0}],"exp":"être + profession (no article): elle est avocate."},
  {"id":"fr-232","topic":"fr-vie","lesson":"fr-l43","type":"mcq","q":"\"Le salaire\" means:","opts":["the salary","the holiday","the contract","the office"],"ans":0,"exp":"le salaire = the salary / wages."},
  {"id":"fr-233","topic":"fr-vie","lesson":"fr-l43","type":"mcq","q":"\"Je suis en congé\" means:","opts":["I am at work","I am on leave / holiday","I am in a meeting","I am late"],"ans":1,"exp":"être en congé = to be on leave (annual leave, sick leave, etc.)."},
  {"id":"fr-234","topic":"fr-vie","lesson":"fr-l43","type":"scenario","setup":"You are at a job interview at a French company.","parts":[{"q":"The interviewer says \"Parlez-moi de votre expérience.\" What is she asking?","opts":["Tell me about your salary expectations","Tell me about your experience","Where did you study?","What are your weaknesses?"],"ans":1,"exp":"Parlez-moi de... = Tell me about...; votre expérience = your experience."},{"q":"You want to say \"I have been working in a shop for two years.\" Which is correct?","opts":["J'ai travaillé dans un magasin pendant deux ans","Je travaille dans un magasin depuis deux ans","J'ai travaillé dans un magasin pour deux ans","Je travaillais dans un magasin il y a deux ans"],"ans":1,"exp":"An ongoing situation starting in the past uses depuis + present tense: je travaille depuis deux ans."},{"q":"\"Quels sont vos points forts ?\" asks about your:","opts":["salary expectations","weaknesses","strengths","references"],"ans":2,"exp":"points forts = strengths (literally strong points); points faibles = weaknesses."}],"exp":"Interview: votre expérience, depuis + présent, points forts/faibles."},
  {"id":"fr-235","topic":"fr-vie","lesson":"fr-l43","type":"mcq","q":"False friend: \"un stage\" in a professional context means:","opts":["a stage performance","a work placement / internship","a pay rise","a promotion"],"ans":1,"exp":"un stage = a work placement or internship (NOT a theatre stage — that is une scène)."},
  {"id":"fr-236","topic":"fr-vie","lesson":"fr-l43","type":"gapfill","q":"Complete the sentence:","template":"Je {0} ingénieur depuis cinq ans.","gaps":[{"options":["suis","ai","fais","travaille"],"answer":0}],"exp":"être + profession: je suis ingénieur; depuis cinq ans = for five years (ongoing)."},
  {"id":"fr-237","topic":"fr-vie","lesson":"fr-l43","type":"mcq","q":"The feminine of \"un infirmier\" is:","opts":["une infirmière","une infirmieuse","une infirmiere","une infirmiersse"],"ans":0,"exp":"un infirmier → une infirmière (add accent and -e; the -r becomes clearly pronounced)."},

  // ── Grammaire avancée : COD / COI / y / en / subjonctif ─────────────────────
  {"id":"fr-238","topic":"fr-gram","lesson":"fr-l24","type":"mcq","q":"\"Je le vois\" — what is \"le\"?","opts":["Direct object pronoun (COD)","Indirect object pronoun (COI)","Reflexive pronoun","Subject pronoun"],"ans":0,"exp":"le / la / les are direct object pronouns (COD): je le vois = I see him/it."},
  {"id":"fr-239","topic":"fr-gram","lesson":"fr-l24","type":"mcq","q":"\"Je lui parle\" — what is \"lui\"?","opts":["Direct object pronoun","Indirect object pronoun (COI)","Reflexive pronoun","Emphatic pronoun"],"ans":1,"exp":"lui / leur are indirect object pronouns (COI): je lui parle = I speak to him/her."},
  {"id":"fr-240","topic":"fr-gram","lesson":"fr-l24","type":"mcq","q":"Where does a COD/COI pronoun go in a French sentence?","opts":["After the verb","Before the conjugated verb (or before the auxiliary in compound tenses)","At the end of the sentence","At the very start of the sentence"],"ans":1,"exp":"Object pronouns precede the verb: je le vois. In compound tenses: je l'ai vu."},
  {"id":"fr-241","topic":"fr-gram","lesson":"fr-l44","type":"mcq","q":"\"J'y vais\" — \"y\" replaces:","opts":["a person","a place or à + thing","a quantity","a direct object person"],"ans":1,"exp":"y replaces a location or à + thing: je vais à Paris → j'y vais."},
  {"id":"fr-242","topic":"fr-gram","lesson":"fr-l44","type":"mcq","q":"\"J'en veux\" — \"en\" replaces:","opts":["à + noun","de + noun or a quantity expression","a direct object person","a place"],"ans":1,"exp":"en replaces de + noun or a quantity: je veux du café → j'en veux."},
  {"id":"fr-243","topic":"fr-gram","lesson":"fr-l24","type":"gapfill","q":"Replace the direct object (Marie, feminine):","template":"Tu vois Marie ? — Oui, je {0} vois chaque jour.","gaps":[{"options":["la","le","lui","les"],"answer":0}],"exp":"Marie is feminine direct object (COD) → la: je la vois chaque jour."},
  {"id":"fr-244","topic":"fr-gram","lesson":"fr-l24","type":"gapfill","q":"Replace the indirect object (ton frère):","template":"Tu parles à ton frère ? — Oui, je {0} parle souvent.","gaps":[{"options":["lui","le","la","y"],"answer":0}],"exp":"parler à quelqu'un → COI: lui (singular him/her): je lui parle souvent."},
  {"id":"fr-245","topic":"fr-gram","lesson":"fr-l44","type":"mcq","q":"\"Il en a trois\" — what does \"en\" refer to?","opts":["He has three friends","He has three of them (some previously mentioned thing)","He goes there three times","He has been three times"],"ans":1,"exp":"en replaces de + noun or a quantity: \"il en a trois\" = he has three of them."},
  {"id":"fr-246","topic":"fr-gram","lesson":"fr-l10","type":"mcq","q":"\"Je ne le vois plus\" — what does ne...plus mean?","opts":["I don't see him often","I don't see him any more","I have never seen him","I rarely see him"],"ans":1,"exp":"ne...plus = no longer / not any more (completed action stopped)."},
  {"id":"fr-247","topic":"fr-gram","lesson":"fr-l28","type":"mcq","q":"\"Bien que je sois fatigué, je travaille\" — \"sois\" is in the:","opts":["présent indicatif","subjonctif","conditionnel","imparfait"],"ans":1,"exp":"bien que (although) is one of several conjunctions that trigger the subjonctif: bien que je sois."},
  {"id":"fr-248","topic":"fr-gram","lesson":"fr-l29","type":"gapfill","q":"Choose the correct relative pronoun:","template":"C'est le livre {0} je t'ai parlé.","gaps":[{"options":["dont","que","qui","où"],"answer":0}],"exp":"parler de quelque chose → dont: c'est le livre dont je t'ai parlé = the book I told you about."},
  {"id":"fr-249","topic":"fr-gram","lesson":"fr-l27","type":"mcq","q":"\"Si j'avais su, je ne serais pas venu\" — this expresses:","opts":["A future condition","A past hypothetical (unreal condition in the past)","A habit in the past","A polite request"],"ans":1,"exp":"si + plus-que-parfait → conditionnel passé = unreal past condition: If I had known, I wouldn't have come."},
  {"id":"fr-250","topic":"fr-gram","lesson":"fr-l24","type":"dragdrop","q":"Match each pronoun to what it replaces:","pairs":[{"left":"le / la / les","right":"direct object (COD)"},{"left":"lui / leur","right":"indirect object (COI: à + person)"},{"left":"y","right":"place or à + thing"},{"left":"en","right":"de + noun or quantity"}],"exp":"COD = le/la/les, COI = lui/leur, place/à+thing = y, de+noun/quantity = en."},
  {"id":"fr-251","topic":"fr-gram","lesson":"fr-l29","type":"mcq","q":"\"Lequel\" is used to mean:","opts":["who (subject)","which one (replacing a masculine noun already mentioned)","that (direct object)","whose"],"ans":1,"exp":"lequel / laquelle / lesquels / lesquelles = which one(s) — refers back to a noun already mentioned."},
  {"id":"fr-252","topic":"fr-gram","lesson":"fr-l24","type":"scenario","setup":"Sophie tells her friend about a birthday present she bought.","parts":[{"q":"\"Je lui ai acheté un livre.\" — to WHOM did Sophie buy the book?","opts":["To herself","To her friend (indirect object — lui)","To the bookshop owner","To them (plural)"],"ans":1,"exp":"lui = COI (indirect object): to him/her. Plural would be leur."},{"q":"Sophie says \"Je l'ai emballé hier.\" What did she wrap?","opts":["The book (l' = le = direct object)","Her friend","A present box","A birthday card"],"ans":0,"exp":"l' = le before a vowel (COD, masculine): refers to the book."},{"q":"\"Elle y est allée pour l'acheter.\" Where did she go?","opts":["To the library","To a place already mentioned (the bookshop)","To her friend's house","Online"],"ans":1,"exp":"y replaces the previously mentioned location (the bookshop — la librairie)."}],"exp":"lui (COI), l' = le (COD), y (place pronoun)."},

  // ── Les transports et la vie quotidienne ─────────────────────────────────────
  {"id":"fr-253","topic":"fr-vie","lesson":"fr-l39","type":"mcq","q":"\"Je prends le métro\" — how are you travelling?","opts":["by bus","by underground / metro","by train","by bike"],"ans":1,"exp":"le métro = the underground / subway."},
  {"id":"fr-254","topic":"fr-vie","lesson":"fr-l39","type":"mcq","q":"\"À vélo\" means travelling:","opts":["by car","by bus","by bike","on foot"],"ans":2,"exp":"à vélo = by bike; à pied = on foot."},
  {"id":"fr-255","topic":"fr-vie","lesson":"fr-l39","type":"mcq","q":"\"Tournez à droite au feu\" — what should you do at the traffic lights?","opts":["Turn left at the lights","Turn right at the lights","Go straight at the lights","Stop at the lights"],"ans":1,"exp":"à droite = right; au feu (rouge) = at the traffic lights."},
  {"id":"fr-256","topic":"fr-vie","lesson":"fr-l39","type":"gapfill","q":"Choose en or à for transport in a vehicle:","template":"Je vais au travail {0} voiture.","gaps":[{"options":["en","à","par","avec"],"answer":0}],"exp":"Enclosed vehicle → en: en voiture, en bus, en train. Non-enclosed → à: à vélo, à pied."},
  {"id":"fr-257","topic":"fr-vie","lesson":"fr-l39","type":"mcq","q":"\"Prenez la deuxième rue à gauche\" means:","opts":["Take the first road on the left","Take the second road on the left","Take the second road on the right","Go straight for two streets"],"ans":1,"exp":"deuxième = second; à gauche = on the left."},
  {"id":"fr-258","topic":"fr-vie","lesson":"fr-l39","type":"mcq","q":"\"C'est à dix minutes à pied\" means:","opts":["It is ten minutes by car","It is ten minutes on foot","It is ten kilometres away","It takes ten minutes by bus"],"ans":1,"exp":"à pied = on foot; à dix minutes à pied = ten minutes' walk."},
  {"id":"fr-259","topic":"fr-vie","lesson":"fr-l39","type":"scenario","setup":"You are lost in a French town and ask a passer-by for directions to the station (la gare).","parts":[{"q":"How do you politely ask where the station is?","opts":["Excusez-moi, où est la gare ?","Où est le cinéma ?","C'est loin d'ici ?","Avez-vous un plan ?"],"ans":0,"exp":"Excusez-moi, où est la gare ? = Excuse me, where is the station?"},{"q":"The passer-by says \"Continuez tout droit, puis tournez à gauche.\" What do you do FIRST?","opts":["Turn left","Continue straight on","Turn right","Go back the way you came"],"ans":1,"exp":"tout droit = straight on; puis = then; tournez à gauche = turn left. So: go straight first, THEN turn left."},{"q":"They add \"C'est à cinq minutes à pied.\" How far away is the station?","opts":["5 km away","5 minutes by car","5 minutes on foot","5 bus stops away"],"ans":2,"exp":"à pied = on foot; à cinq minutes à pied = five minutes' walk."}],"exp":"Directions: Excusez-moi, où est...? → tout droit puis tournez... → à pied."},
  {"id":"fr-260","topic":"fr-vie","lesson":"fr-l39","type":"mcq","q":"False friend: \"le car\" in French is:","opts":["a car (automobile)","a coach / long-distance bus","a taxi","a tram"],"ans":1,"exp":"le car = a coach / long-distance bus. la voiture = a car."},
  {"id":"fr-261","topic":"fr-vie","lesson":"fr-l39","type":"gapfill","q":"Buy a return ticket at the station:","template":"Je voudrais {0} billet aller-retour pour Lyon.","gaps":[{"options":["un","une","des","le"],"answer":0}],"exp":"un billet (masculine) = a ticket; aller-retour = return; aller simple = single."},
  {"id":"fr-262","topic":"fr-vie","lesson":"fr-l39","type":"mcq","q":"\"Le prochain train part à quelle heure ?\" asks:","opts":["the price of the next train","when the next train departs","where the next train goes","how long the journey takes"],"ans":1,"exp":"partir = to depart; à quelle heure = at what time: When does the next train depart?"},

  // ── Chez le médecin — doctor / pharmacy vocab (fr-l41) ───────────────────────
  {"id":"fr-263","topic":"fr-vie","lesson":"fr-l41","type":"mcq","q":"\"J'éternue\" means:","opts":["I am coughing","I am sneezing","I feel dizzy","I am vomiting"],"ans":1,"exp":"éternuer = to sneeze; j'éternue = I am sneezing. (Je tousse = I am coughing.)"},
  {"id":"fr-264","topic":"fr-vie","lesson":"fr-l41","type":"mcq","q":"\"Je me sens mal\" means:","opts":["I feel great","I am very ill","I don't feel well","I am cold"],"ans":2,"exp":"se sentir = to feel; je me sens mal = I don't feel well / I feel unwell. (Je suis malade = I am ill.)"},
  {"id":"fr-265","topic":"fr-vie","lesson":"fr-l41","type":"mcq","q":"\"Une ordonnance\" is:","opts":["a medicine","a prescription","a pharmacy","a medical certificate"],"ans":1,"exp":"une ordonnance = a prescription — the document a doctor writes so you can collect medication at the pharmacy."},
  {"id":"fr-266","topic":"fr-vie","lesson":"fr-l41","type":"gapfill","q":"Complete: I need a prescription.","template":"Il me {0} une ordonnance.","gaps":[{"options":["faut","fais","suis","ai"],"answer":0}],"exp":"il me faut = I need (literally 'it is necessary for me'); une ordonnance = a prescription."},
  {"id":"fr-267","topic":"fr-vie","lesson":"fr-l41","type":"mcq","q":"At the pharmacy, \"des comprimés\" are:","opts":["syrups","creams","tablets / pills","injections"],"ans":2,"exp":"des comprimés = tablets / pills. (du sirop = syrup; une crème = a cream.)"},
  {"id":"fr-268","topic":"fr-vie","lesson":"fr-l41","type":"mcq","q":"\"Le pharmacien / la pharmacienne\" is:","opts":["a doctor","a nurse","a pharmacist","a surgeon"],"ans":2,"exp":"le pharmacien / la pharmacienne = the pharmacist. In France, pharmacists can advise on minor ailments without a doctor's appointment."},
  {"id":"fr-269","topic":"fr-vie","lesson":"fr-l41","type":"dragdrop","q":"Match each pharmacy item to its English meaning:","pairs":[{"left":"un médicament","right":"a medicine / medication"},{"left":"des comprimés","right":"tablets / pills"},{"left":"du sirop","right":"syrup"},{"left":"une crème","right":"a cream"}],"exp":"médicament = medicine, comprimés = tablets/pills, sirop = syrup, crème = cream."},
  {"id":"fr-270","topic":"fr-vie","lesson":"fr-l41","type":"scenario","setup":"You feel unwell and visit a pharmacy in France.","parts":[{"q":"You want to say you don't feel well. Which phrase is correct?","opts":["Je suis en bonne santé.","Je me sens mal.","J'ai faim.","Je suis fatigué(e)."],"ans":1,"exp":"Je me sens mal = I don't feel well / I feel unwell."},{"q":"The pharmacist asks what is wrong. You have a fever and a cough. Which answer covers BOTH symptoms?","opts":["J'ai mal au dos et aux dents.","J'ai de la fièvre et je tousse.","Je suis allergique au soleil.","J'ai mal à la gorge seulement."],"ans":1,"exp":"J'ai de la fièvre (I have a fever) et je tousse (I am coughing) — both symptoms from the lesson."},{"q":"The pharmacist recommends tablets. What is the French word you expect to hear?","opts":["une crème","du sirop","des comprimés","une ordonnance"],"ans":2,"exp":"des comprimés = tablets/pills. (une ordonnance = a prescription, issued by a doctor not a pharmacist.)"}],"exp":"At the pharmacy: je me sens mal → j'ai de la fièvre et je tousse → des comprimés."},

  // ── Le pluriel des noms (fr-l05) — A1 ────────────────────────────────────────
  {"id":"fr-271","topic":"fr-gram","lesson":"fr-l05","type":"mcq","q":"Plural of « un bateau » (boat):","opts":["des bateau","des bateus","des bateaux","des bateauxs"],"ans":2,"exp":"Words ending in -eau take -eaux in the plural: un bateau → des bateaux."},
  {"id":"fr-272","topic":"fr-gram","lesson":"fr-l05","type":"mcq","q":"Plural of « un animal »:","opts":["des animals","des animaux","des animales","des animeaux"],"ans":1,"exp":"Words ending in -al take -aux in the plural: un animal → des animaux."},
  {"id":"fr-273","topic":"fr-gram","lesson":"fr-l05","type":"mcq","q":"Plural of « un jeu » (game):","opts":["des jeus","des jeues","des jeux","des jeuxs"],"ans":2,"exp":"Words ending in -eu take -eux in the plural: un jeu → des jeux."},
  {"id":"fr-274","topic":"fr-gram","lesson":"fr-l05","type":"gapfill","q":"She's wearing two hats (chapeau):","template":"Elle porte deux {0}.","gaps":[{"options":["chapeaux","chapeaus","chapeau","chapeausx"],"answer":0}],"exp":"chapeau follows the -eau → -eaux rule: un chapeau → des chapeaux."},
  {"id":"fr-275","topic":"fr-gram","lesson":"fr-l05","type":"mcq","q":"Which word already ends in -x and does NOT change in the plural?","opts":["un chat","un livre","une voix","un bateau"],"ans":2,"exp":"Words already ending in -s, -x or -z stay the same in the plural: une voix → des voix."},
  {"id":"fr-276","topic":"fr-gram","lesson":"fr-l05","type":"dragdrop","q":"Match each noun to its correct plural:","pairs":[{"left":"un bateau","right":"des bateaux"},{"left":"un animal","right":"des animaux"},{"left":"un jeu","right":"des jeux"},{"left":"un bijou","right":"des bijoux"}],"exp":"-eau→-eaux (bateau), -al→-aux (animal), -eu→-eux (jeu), -ou→-oux (bijou — one of 7 nouns)."},

  // ── La négation et les questions (fr-l10) — A1 ───────────────────────────────
  {"id":"fr-277","topic":"fr-gram","lesson":"fr-l10","type":"mcq","q":"« Je ne comprends rien » means:","opts":["I don't understand anything","I understand a little","I understand everything","I never understand"],"ans":0,"exp":"ne … rien = not … anything / nothing: je ne comprends rien = I don't understand anything."},
  {"id":"fr-278","topic":"fr-gram","lesson":"fr-l10","type":"mcq","q":"« Il ne mange jamais de viande » means:","opts":["He hardly ever eats meat","He never eats meat","He no longer eats meat","He doesn't eat meat right now"],"ans":1,"exp":"ne … jamais = never: il ne mange jamais de viande = he never eats meat."},
  {"id":"fr-279","topic":"fr-gram","lesson":"fr-l10","type":"gapfill","q":"She doesn't live here any more:","template":"Elle n'habite {0} ici.","gaps":[{"options":["plus","jamais","rien","personne"],"answer":0}],"exp":"ne … plus = no longer / not any more: elle n'habite plus ici."},
  {"id":"fr-280","topic":"fr-gram","lesson":"fr-l10","type":"mcq","q":"Which phrase introduces a yes/no question politely?","opts":["Qu'est-ce que…","Où est-ce que…","Est-ce que…","Qu'est-ce qui…"],"ans":2,"exp":"Est-ce que… turns any statement into a yes/no question: Est-ce que tu viens ? = Are you coming?"},
  {"id":"fr-281","topic":"fr-gram","lesson":"fr-l10","type":"gapfill","q":"What do you want? (use qu'est-ce que):","template":"{0} tu veux ?","gaps":[{"options":["Qu'est-ce que","Est-ce que","Qu'est-ce qui","Qui est-ce que"],"answer":0}],"exp":"Qu'est-ce que = what (direct object): Qu'est-ce que tu veux ? = What do you want?"},

  // ── Les adjectifs (fr-l12) — A1 ──────────────────────────────────────────────
  {"id":"fr-282","topic":"fr-gram","lesson":"fr-l12","type":"mcq","q":"Choose the correct form: « une maison ___ » (grand):","opts":["grand","grands","grande","grandes"],"ans":2,"exp":"Adjectives must agree in gender and number: 'maison' is feminine singular → grande (add -e)."},
  {"id":"fr-283","topic":"fr-gram","lesson":"fr-l12","type":"mcq","q":"BAGS adjectives go ___ the noun:","opts":["after","before","either side of","at the start of the sentence"],"ans":1,"exp":"BAGS = Beauty, Age, Goodness, Size. These short common adjectives precede the noun: un beau jardin, une bonne idée."},
  {"id":"fr-284","topic":"fr-gram","lesson":"fr-l12","type":"mcq","q":"Which sentence places the adjective correctly?","opts":["un intéressant film","une gentille fille","une bleue robe","un grand moderne appartement"],"ans":1,"exp":"'gentil(le)' is a BAGS adjective (Goodness) and goes BEFORE the noun: une gentille fille. Adjectives like bleu or intéressant go AFTER the noun."},
  {"id":"fr-285","topic":"fr-gram","lesson":"fr-l12","type":"gapfill","q":"They (m. plural) are tall:","template":"Ils sont {0}.","gaps":[{"options":["grands","grand","grandes","grande"],"answer":0}],"exp":"Masculine plural adjective: add -s → grands. (grande = f. sing., grandes = f. pl.)"},
  {"id":"fr-286","topic":"fr-gram","lesson":"fr-l12","type":"dragdrop","q":"Match each adjective to its correct feminine form:","pairs":[{"left":"grand","right":"grande"},{"left":"petit","right":"petite"},{"left":"beau","right":"belle"},{"left":"nouveau","right":"nouvelle"}],"exp":"Regular -e added: grand→grande, petit→petite. Irregular: beau→belle, nouveau→nouvelle."},

  // ── Aller et faire (fr-l14) — A1 ─────────────────────────────────────────────
  {"id":"fr-287","topic":"fr-conj","lesson":"fr-l14","type":"mcq","q":"Conjugate « aller »: ils/elles ___:","opts":["allez","allons","vais","vont"],"ans":3,"exp":"aller: je vais, tu vas, il/elle va, nous allons, vous allez, ils/elles vont."},
  {"id":"fr-288","topic":"fr-conj","lesson":"fr-l14","type":"gapfill","q":"We do sport on Saturdays:","template":"Nous {0} du sport le samedi.","gaps":[{"options":["faisons","faisez","font","faites"],"answer":0}],"exp":"faire: je fais, tu fais, il fait, nous faisons, vous faites, ils font."},
  {"id":"fr-289","topic":"fr-gram","lesson":"fr-l14","type":"mcq","q":"« aller + à + le » contracts to:","opts":["à le","al","au","à du"],"ans":2,"exp":"à + le = au: je vais au cinéma. à + la stays as à la: je vais à la piscine."},
  {"id":"fr-290","topic":"fr-conj","lesson":"fr-l14","type":"mcq","q":"Conjugate « faire »: vous ___:","opts":["faisez","faites","font","faisons"],"ans":1,"exp":"faire: vous faites (irregular — not *faisez*). Compare nous faisons."},

  // ── Passé composé avec avoir (fr-l18) — A2 ───────────────────────────────────
  {"id":"fr-291","topic":"fr-conj","lesson":"fr-l18","type":"mcq","q":"Past participle of « finir »:","opts":["finu","fini","finé","fin"],"ans":1,"exp":"-IR verbs form the past participle with -i: finir → fini."},
  {"id":"fr-292","topic":"fr-conj","lesson":"fr-l18","type":"mcq","q":"Past participle of « vendre »:","opts":["vendu","vendé","vendi","vendré"],"ans":0,"exp":"-RE verbs form the past participle with -u: vendre → vendu."},
  {"id":"fr-293","topic":"fr-conj","lesson":"fr-l18","type":"gapfill","q":"He watched a film (passé composé):","template":"Il {0} regardé un film.","gaps":[{"options":["a","est","as","ont"],"answer":0}],"exp":"Most verbs use avoir as auxiliary: il a regardé. (il + a = has/did watch)"},
  {"id":"fr-294","topic":"fr-conj","lesson":"fr-l18","type":"mcq","q":"Irregular past participle of « faire »:","opts":["faisé","fairé","fait","faistu"],"ans":2,"exp":"faire → fait (irregular). Other key irregulars: avoir→eu, être→été, voir→vu, prendre→pris."},

  // ── Passé composé avec être (fr-l19) — A2 ────────────────────────────────────
  {"id":"fr-295","topic":"fr-conj","lesson":"fr-l19","type":"mcq","q":"With être verbs, the past participle must agree with:","opts":["the auxiliary verb","the direct object","the subject","the indirect object"],"ans":2,"exp":"With être auxiliary, the past participle agrees with the SUBJECT: il est allé / elle est allée / ils sont allés."},
  {"id":"fr-296","topic":"fr-conj","lesson":"fr-l19","type":"mcq","q":"She went (passé composé of aller):","opts":["elle a allé","elle est allé","elle est allée","elle a allée"],"ans":2,"exp":"aller takes être: elle est allée — auxiliary être + past participle allé with feminine agreement (-e)."},
  {"id":"fr-297","topic":"fr-conj","lesson":"fr-l19","type":"mcq","q":"Which verb uses ÊTRE (not avoir) in the passé composé?","opts":["regarder","finir","partir","acheter"],"ans":2,"exp":"partir is a DR MRS VANDERTRAMP verb and takes être: il est parti. The others use avoir."},
  {"id":"fr-298","topic":"fr-conj","lesson":"fr-l19","type":"gapfill","q":"They (m.) left early:","template":"Ils {0} partis tôt.","gaps":[{"options":["sont","ont","est","a"],"answer":0}],"exp":"partir takes être: ils sont partis (+ -s for masculine plural subject agreement)."},

  // ── Imparfait ou passé composé ? (fr-l21) — A2 ───────────────────────────────
  {"id":"fr-299","topic":"fr-gram","lesson":"fr-l21","type":"mcq","q":"The signal word « soudain » (suddenly) typically triggers:","opts":["imparfait","passé composé","futur proche","subjonctif"],"ans":1,"exp":"'Soudain' introduces a specific, completed event → passé composé. Ongoing background/habits → imparfait."},
  {"id":"fr-300","topic":"fr-gram","lesson":"fr-l21","type":"mcq","q":"The phrase « d'habitude » (usually) signals:","opts":["passé composé","imparfait","futur proche","conditionnel"],"ans":1,"exp":"d'habitude / souvent / toujours / tous les jours signal habitual or repeated actions → imparfait."},
  {"id":"fr-301","topic":"fr-gram","lesson":"fr-l21","type":"mcq","q":"« Je dormais quand le téléphone a sonné. » — « dormais » is imparfait because:","opts":["it happened once and is complete","it was the background state, interrupted by the phone","it is a habitual action","it is in the future"],"ans":1,"exp":"dormais (imparfait) = was sleeping — ongoing background action. a sonné (PC) = the single event that interrupted it."},

  // ── Comparatif et superlatif (fr-l25) — A2 ───────────────────────────────────
  {"id":"fr-302","topic":"fr-gram","lesson":"fr-l25","type":"mcq","q":"« C'est le meilleur restaurant de la ville » means:","opts":["It is a good restaurant in the city","It is the best restaurant in town","It is a better restaurant than in town","It is the most expensive in town"],"ans":1,"exp":"le meilleur = the best (superlative of bon). 'de' after a superlative = 'in': le meilleur de la ville = the best in town."},
  {"id":"fr-303","topic":"fr-gram","lesson":"fr-l25","type":"mcq","q":"« aussi intelligent que » expresses:","opts":["superiority (smarter than)","inferiority (less smart than)","equality (as smart as)","approximation"],"ans":2,"exp":"aussi … que = as … as (equality). plus … que = more/smarter than; moins … que = less … than."},
  {"id":"fr-304","topic":"fr-gram","lesson":"fr-l25","type":"gapfill","q":"This is the tallest building in Paris (m.):","template":"C'est {0} plus grand bâtiment de Paris.","gaps":[{"options":["le","la","les","l'"],"answer":0}],"exp":"Masculine singular noun → le plus grand. (la plus grande f., les plus grands m. pl.)"},
  {"id":"fr-305","topic":"fr-gram","lesson":"fr-l25","type":"mcq","q":"The comparative of « bon » (good) is:","opts":["plus bon","meilleur","mieux","plus bien"],"ans":1,"exp":"bon → meilleur (better) / le meilleur (the best). Never say *plus bon*. Note: bien (adverb) → mieux."},

  // ── Exprimer son opinion (fr-l30) — A2 ───────────────────────────────────────
  {"id":"fr-306","topic":"fr-gram","lesson":"fr-l30","type":"mcq","q":"« À mon avis, c'est une bonne idée » means:","opts":["It is obviously a good idea","In my opinion, it is a good idea","According to him, it is a good idea","Certainly, it is a good idea"],"ans":1,"exp":"À mon avis = in my opinion. (Selon moi = according to me — similar meaning.)"},
  {"id":"fr-307","topic":"fr-gram","lesson":"fr-l30","type":"mcq","q":"« Tu as raison » means:","opts":["You are wrong","You are right","You have a reason","You are mistaken"],"ans":1,"exp":"avoir raison = to be right. avoir tort = to be wrong: tu as tort."},
  {"id":"fr-308","topic":"fr-gram","lesson":"fr-l30","type":"mcq","q":"« Je ne suis pas d'accord » means:","opts":["I am not sure","I disagree","I am not ready","I don't understand"],"ans":1,"exp":"être d'accord = to agree; ne pas être d'accord = to disagree."},
  {"id":"fr-309","topic":"fr-gram","lesson":"fr-l30","type":"gapfill","q":"In my opinion, the situation is serious:","template":"{0} mon avis, la situation est grave.","gaps":[{"options":["À","De","En","Par"],"answer":0}],"exp":"À mon avis = in my opinion. (NOT *De mon avis* or *En mon avis*)"},
  {"id":"fr-310","topic":"fr-gram","lesson":"fr-l30","type":"mcq","q":"« Par contre, je préfère le cinéma » — « par contre » means:","opts":["therefore","in fact","however / on the other hand","in addition"],"ans":2,"exp":"par contre = however / on the other hand — introduces a contrasting idea. Similar to 'cependant'."},
  {"id":"fr-311","topic":"fr-gram","lesson":"fr-l30","type":"mcq","q":"« Je ne pense pas qu'il vienne » — « vienne » is subjunctive because:","opts":["the sentence is in the past","it follows a negative opinion expression (ne pense pas que)","venir is irregular","it follows a time expression"],"ans":1,"exp":"Negative opinions (je ne pense pas que, je ne crois pas que) trigger the subjunctive mood. Affirmative je pense que takes the indicative."},

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
  {"id":"fr-377","topic":"fr-gram","lesson":"fr-l44","type":"mcq","q":"« Vas-y ! » — why does Y come after the verb here?","opts":["Y always follows an imperative","With an affirmative imperative, object pronouns go after the verb with a hyphen","Y is an adverb, not a pronoun","Vas is irregular and requires post-verbal pronouns"],"ans":1,"exp":"With affirmative imperatives, pronouns follow the verb: Vas-y ! (Go there!), Prends-en ! (Take some!). In negative imperatives, the pronoun goes before: N'y vas pas. (Don't go there.)"},

  // ── THEMATIC VOCABULARY UNITS ────────────────────────────────────────────
  // fr-l45 — Les chiffres (0–100) — A1
  {"id":"fr-378","topic":"fr-nums","lesson":"fr-l45","type":"mcq","q":"What is 'soixante-dix' in digits?","opts":["60","70","76","80"],"ans":1,"exp":"soixante-dix = 60 + 10 = 70. French counts 70–79 as 60 + 10–19: soixante-dix (70), soixante-et-onze (71), soixante-douze (72)…"},
  {"id":"fr-379","topic":"fr-nums","lesson":"fr-l45","type":"mcq","q":"How do you say '80' in French?","opts":["huitante","octante","quatre-vingt","quatre-vingts"],"ans":3,"exp":"80 = quatre-vingts (four-twenties). The final -s drops when followed by another number: quatre-vingt-un (81). Belgian and Swiss French use huitante, but standard French uses quatre-vingts."},
  {"id":"fr-380","topic":"fr-nums","lesson":"fr-l45","type":"mcq","q":"What is 'quatre-vingt-dix' in digits?","opts":["80","84","90","94"],"ans":2,"exp":"quatre-vingt-dix = 4 × 20 + 10 = 90. The 90s follow: quatre-vingt-onze (91), quatre-vingt-douze (92)… quatre-vingt-dix-neuf (99)."},
  {"id":"fr-381","topic":"fr-nums","lesson":"fr-l45","type":"mcq","q":"How do you say '21' in French?","opts":["vingt-un","vingt et un","vingt-et-un","un-vingt"],"ans":1,"exp":"21 = vingt et un (no hyphen around 'et'). Only 21, 31, 41, 51, 61, 71 use 'et un'. All other compounds use a hyphen: vingt-deux, vingt-trois…"},
  {"id":"fr-382","topic":"fr-nums","lesson":"fr-l45","type":"mcq","q":"What does 'cinquante' mean?","opts":["15","25","50","55"],"ans":2,"exp":"cinquante = 50. The tens: vingt (20), trente (30), quarante (40), cinquante (50), soixante (60)."},
  {"id":"fr-383","topic":"fr-nums","lesson":"fr-l45","type":"mcq","q":"How do you say '17' in French?","opts":["septième","dix-sept","sèze-un","sept-dix"],"ans":1,"exp":"17 = dix-sept (ten-seven). Numbers 13–16 have unique forms: treize, quatorze, quinze, seize. From 17: dix-sept, dix-huit, dix-neuf."},
  {"id":"fr-384","topic":"fr-nums","lesson":"fr-l45","type":"mcq","q":"What is the French word for 12?","opts":["dozième","deuze","douze","deux-dix"],"ans":2,"exp":"12 = douze. The numbers 11–16 are all unique: onze (11), douze (12), treize (13), quatorze (14), quinze (15), seize (16)."},
  {"id":"fr-385","topic":"fr-nums","lesson":"fr-l45","type":"mcq","q":"How do you say '71' in French?","opts":["soixante-et-onze","soixante-et-un","soixante-onze","septante-un"],"ans":0,"exp":"71 = soixante-et-onze. This follows the 'et un/onze' pattern: 60 + 11. From 72: soixante-douze (without 'et')."},
  {"id":"fr-386","topic":"fr-nums","lesson":"fr-l45","type":"mcq","q":"You count: dix, vingt, trente… What comes next?","opts":["quarante","soixante","cinquante-dix","quadrante"],"ans":0,"exp":"The tens: vingt (20), trente (30), quarante (40), cinquante (50), soixante (60), soixante-dix (70), quatre-vingts (80), quatre-vingt-dix (90), cent (100)."},
  {"id":"fr-387","topic":"fr-nums","lesson":"fr-l45","type":"gapfill","q":"Complete the sequence: quatre-vingts, ___, quatre-vingt-deux","template":"quatre-vingts, {0}, quatre-vingt-deux","gaps":[{"options":["quatre-vingt-un","quatre-vingt-et-un","huitante-un","quatre-vingts-un"],"answer":0}],"exp":"quatre-vingt-un = 81. No 'et' and no final -s on vingt (the -s only appears when quatre-vingts stands alone as 80)."},
  {"id":"fr-388","topic":"fr-nums","lesson":"fr-l45","type":"mcq","q":"How do you say '100' in French?","opts":["mille","centième","centi","cent"],"ans":3,"exp":"100 = cent. Two hundreds: deux cents (with -s). But 201 = deux cent un (no -s when followed by another number). 1000 = mille."},
  {"id":"fr-389","topic":"fr-nums","lesson":"fr-l45","type":"mcq","q":"What is 'quatre-vingt-cinq' in digits?","opts":["75","84","85","95"],"ans":2,"exp":"quatre-vingt-cinq = 4 × 20 + 5 = 85. No -s on vingt because it is followed by cinq."},
  {"id":"fr-390","topic":"fr-nums","lesson":"fr-l45","type":"mcq","q":"How do you say 'first' (1st, masculine) in French?","opts":["un","unième","primaire","premier"],"ans":3,"exp":"1st (masculine) = premier; (feminine) = première. All other ordinals add -ième to the cardinal: deuxième (2nd), troisième (3rd), vingtième (20th)."},
  {"id":"fr-391","topic":"fr-nums","lesson":"fr-l45","type":"mcq","q":"A price tag reads 'QUARANTE-SEPT euros'. What is the price?","opts":["€37","€40","€47","€74"],"ans":2,"exp":"quarante-sept = 47. Tens 40s: quarante (40), quarante et un (41), quarante-deux (42)… quarante-neuf (49)."},
  {"id":"fr-392","topic":"fr-nums","lesson":"fr-l45","type":"dragdrop","q":"Match each French number to its value","pairs":[{"left":"onze","right":"11"},{"left":"quinze","right":"15"},{"left":"soixante","right":"60"},{"left":"quatre-vingts","right":"80"}],"exp":"onze=11, quinze=15, soixante=60, quatre-vingts=80. Common pitfalls: onze ≠ douze; soixante ≠ soixante-dix (70); quatre-vingts is NOT huitante in standard French."},

  // fr-l46 — La famille — A1
  {"id":"fr-393","topic":"fr-fam","lesson":"fr-l46","type":"mcq","q":"What does 'le père' mean?","opts":["brother","grandfather","son","father"],"ans":3,"exp":"le père = the father. Feminine: la mère (the mother). Together: les parents (the parents). Note: les parents also means 'relatives' in a broader sense."},
  {"id":"fr-394","topic":"fr-fam","lesson":"fr-l46","type":"mcq","q":"How do you say 'sister' in French?","opts":["le frère","la fille","la tante","la sœur"],"ans":3,"exp":"la sœur = sister. le frère = brother. Note the ligature œ in sœur — it is always written with this character. Le frère et la sœur = brother and sister."},
  {"id":"fr-395","topic":"fr-fam","lesson":"fr-l46","type":"mcq","q":"What is 'la grand-mère'?","opts":["aunt","mother-in-law","godmother","grandmother"],"ans":3,"exp":"la grand-mère = grandmother. le grand-père = grandfather. Together: les grands-parents (grandparents). Note the hyphen in grand-mère/grand-père."},
  {"id":"fr-396","topic":"fr-fam","lesson":"fr-l46","type":"mcq","q":"How do you say 'my father' in French?","opts":["ton père","son père","notre père","mon père"],"ans":3,"exp":"mon père = my father. Possessives: mon (my, masc.), ma (my, fem.), mes (my, plural). Use mon before masculine nouns: mon père, mon frère."},
  {"id":"fr-397","topic":"fr-fam","lesson":"fr-l46","type":"mcq","q":"What does 'la fille' mean in a family context?","opts":["godmother","aunt","wife","daughter"],"ans":3,"exp":"la fille = daughter (in a family context) OR girl (in general). ma fille = my daughter; une fille = a girl. Masculine: le fils (son) — note the silent -l; it is pronounced 'fiss'."},
  {"id":"fr-398","topic":"fr-fam","lesson":"fr-l46","type":"mcq","q":"How do you say 'his/her aunt'?","opts":["ma tante","ta tante","leur tante","sa tante"],"ans":3,"exp":"sa tante = his/her aunt (or son oncle = his/her uncle). French son/sa/ses covers both 'his' and 'her' — the choice depends on the noun's gender, not the possessor's."},
  {"id":"fr-399","topic":"fr-fam","lesson":"fr-l46","type":"mcq","q":"You introduce: 'Voici mon mari.' What are you saying?","opts":["This is my brother","This is my father","This is my son","This is my husband"],"ans":3,"exp":"mon mari = my husband. la femme = wife (also means 'woman'). ma femme = my wife. Voici = here is / this is."},
  {"id":"fr-400","topic":"fr-fam","lesson":"fr-l46","type":"gapfill","q":"The sister of my mother is my ___. — La sœur de ma mère est ma ___.","template":"La sœur de ma mère est ma {0}.","gaps":[{"options":["tante","cousine","nièce","belle-mère"],"answer":0}],"exp":"La sœur de ta mère = ta tante (aunt). Similarly: le frère de ton parent = ton oncle. Their children = tes cousins/cousines."},
  {"id":"fr-401","topic":"fr-fam","lesson":"fr-l46","type":"mcq","q":"What does 'les enfants' mean?","opts":["the parents","the grandparents","the babies","the children"],"ans":3,"exp":"les enfants = the children. Singular: l'enfant (child — can be masculine or feminine). un bébé (baby), un garçon (boy), une fille (girl)."},
  {"id":"fr-402","topic":"fr-fam","lesson":"fr-l46","type":"mcq","q":"How do you say 'my sister' in French?","opts":["mon sœur","mes sœurs","sa sœur","ma sœur"],"ans":3,"exp":"ma sœur = my sister. Use ma (not mon) because sœur is feminine. Exception: use mon before any feminine noun starting with a vowel/mute h: mon amie."},
  {"id":"fr-403","topic":"fr-fam","lesson":"fr-l46","type":"mcq","q":"Marie says: 'J'ai deux frères et une sœur.' What does she mean?","opts":["She has two sisters and a brother","She has two cousins and a sister","She has two parents and a sibling","She has two brothers and a sister"],"ans":3,"exp":"j'ai = I have; deux frères = two brothers; une sœur = a sister. So: I have two brothers and a sister."},
  {"id":"fr-404","topic":"fr-fam","lesson":"fr-l46","type":"mcq","q":"What does 'les beaux-parents' mean?","opts":["good parents","stepparents","grandparents","in-laws"],"ans":3,"exp":"les beaux-parents = in-laws (parents-in-law). le beau-père = father-in-law or stepfather; la belle-mère = mother-in-law or stepmother. Context usually clarifies which meaning is intended."},
  {"id":"fr-405","topic":"fr-fam","lesson":"fr-l46","type":"dragdrop","q":"Match each French family word to its English meaning","pairs":[{"left":"le mari","right":"husband"},{"left":"la femme","right":"wife"},{"left":"le fils","right":"son"},{"left":"la nièce","right":"niece"}],"exp":"le mari=husband, la femme=wife (also 'woman'), le fils=son (the -l is silent; pronounced 'fiss'), la nièce=niece. Note la femme has a double meaning."},
  {"id":"fr-406","topic":"fr-fam","lesson":"fr-l46","type":"mcq","q":"How do you say 'our children' in French?","opts":["leur enfants","vos enfants","leurs enfants","nos enfants"],"ans":3,"exp":"nos enfants = our children. Possessives: notre (our, singular noun), nos (our, plural noun). notre fils / notre fille → nos enfants."},
  {"id":"fr-407","topic":"fr-fam","lesson":"fr-l46","type":"mcq","q":"What is the French word for 'cousin' (female)?","opts":["la niece","la sœur","la cousine","la fille"],"ans":2,"exp":"la cousine = female cousin. le cousin = male cousin. In French, gender matters — unlike English where 'cousin' covers both."},

  // fr-l47 — La nourriture et les boissons — A1
  {"id":"fr-408","topic":"fr-food","lesson":"fr-l47","type":"mcq","q":"What does 'le pain' mean?","opts":["meat","fish","cake","bread"],"ans":3,"exp":"le pain = bread. An essential French food! Un pain = a loaf; une baguette = the long thin bread. La France is famous for its bread culture."},
  {"id":"fr-409","topic":"fr-food","lesson":"fr-l47","type":"mcq","q":"How do you say 'I would like some cheese'?","opts":["Je veux du fromage","Je mange du fromage","J'ai du fromage","Je voudrais du fromage"],"ans":3,"exp":"Je voudrais du fromage = I would like some cheese. Je voudrais is the conditional of vouloir — polite request. du = partitive article (some) before masculine nouns."},
  {"id":"fr-410","topic":"fr-food","lesson":"fr-l47","type":"mcq","q":"What are 'les légumes'?","opts":["fruits","drinks","meals","vegetables"],"ans":3,"exp":"les légumes = vegetables. les fruits = fruits. les fruits de mer = seafood (literally 'sea fruits')."},
  {"id":"fr-411","topic":"fr-food","lesson":"fr-l47","type":"mcq","q":"Which partitive article goes with 'eau' (water)?","opts":["du","de la","des","de l'"],"ans":3,"exp":"de l'eau = some water. Use de l' before nouns starting with a vowel or mute h. du (masc.), de la (fem.), de l' (vowel/h), des (plural)."},
  {"id":"fr-412","topic":"fr-food","lesson":"fr-l47","type":"mcq","q":"How do you say 'I don't like fish'?","opts":["J'aime pas le poisson","Je n'aime le poisson pas","Je n'aime pas du poisson","Je n'aime pas le poisson"],"ans":3,"exp":"Je n'aime pas le poisson = I don't like fish. After aimer/adorer/détester expressing general taste, use the definite article le/la/les — not the partitive. Ne...pas wraps the verb."},
  {"id":"fr-413","topic":"fr-food","lesson":"fr-l47","type":"mcq","q":"What does 'le poulet' mean?","opts":["pork","beef","lamb","chicken"],"ans":3,"exp":"le poulet = chicken. Other meats: le bœuf (beef), le porc (pork), l'agneau (lamb), le veau (veal)."},
  {"id":"fr-414","topic":"fr-food","lesson":"fr-l47","type":"mcq","q":"How do you say 'a cup of coffee'?","opts":["un verre de café","une bouteille de café","un bol de café","une tasse de café"],"ans":3,"exp":"une tasse de café = a cup of coffee. une tasse = cup; un verre = glass; un bol = bowl; une bouteille = bottle."},
  {"id":"fr-415","topic":"fr-food","lesson":"fr-l47","type":"mcq","q":"What does 'du lait' mean?","opts":["some juice","some water","some tea","some milk"],"ans":3,"exp":"du lait = some milk. du = de + le (partitive, masculine). le lait = milk; le jus = juice; l'eau = water; le thé = tea."},
  {"id":"fr-416","topic":"fr-food","lesson":"fr-l47","type":"gapfill","q":"I like wine but I prefer beer. — J'aime le vin mais je préfère ___.","template":"J'aime le vin mais je préfère {0}.","gaps":[{"options":["la bière","du bière","le bière","une bière"],"answer":0}],"exp":"la bière = beer (definite article for general preference). After préférer/aimer/adorer, use le/la/les for general statements — not the partitive."},
  {"id":"fr-417","topic":"fr-food","lesson":"fr-l47","type":"mcq","q":"Which of these is a vegetable in French?","opts":["la pomme","le raisin","la poire","la carotte"],"ans":3,"exp":"la carotte = carrot (a vegetable). la pomme = apple, le raisin = grape, la poire = pear — all fruits."},
  {"id":"fr-418","topic":"fr-food","lesson":"fr-l47","type":"mcq","q":"How do you say 'I am hungry'?","opts":["Je suis faim","J'ai chaud","Je mange faim","J'ai faim"],"ans":3,"exp":"J'ai faim = I am hungry (lit. 'I have hunger'). French uses avoir for physical states: J'ai soif (thirsty), J'ai chaud (hot), J'ai froid (cold)."},
  {"id":"fr-419","topic":"fr-food","lesson":"fr-l47","type":"mcq","q":"'Il y a des fruits sur la table.' — What does this mean?","opts":["There are vegetables on the table","There is fruit in the kitchen","I like the fruit on the table","There are fruits on the table"],"ans":3,"exp":"Il y a = there is / there are. des fruits = some fruits (indefinite plural). sur la table = on the table."},
  {"id":"fr-420","topic":"fr-food","lesson":"fr-l47","type":"dragdrop","q":"Match each food to its French translation","pairs":[{"left":"bread","right":"le pain"},{"left":"cheese","right":"le fromage"},{"left":"fish","right":"le poisson"},{"left":"egg","right":"l'œuf"}],"exp":"le pain (bread), le fromage (cheese), le poisson (fish), l'œuf (egg). Note the ligature in l'œuf — plural les œufs is pronounced 'les zeu' (the -fs is silent in plural)."},
  {"id":"fr-421","topic":"fr-food","lesson":"fr-l47","type":"mcq","q":"'Je voudrais de la soupe, s'il vous plaît.' — What is being ordered?","opts":["salad","sauce","dessert","soup"],"ans":3,"exp":"de la soupe = some soup. de la is the feminine partitive article. s'il vous plaît = please (formal). Je voudrais = I would like (polite conditional)."},
  {"id":"fr-422","topic":"fr-food","lesson":"fr-l47","type":"mcq","q":"What does 'le petit-déjeuner' mean?","opts":["lunch","dinner","snack","breakfast"],"ans":3,"exp":"le petit-déjeuner = breakfast (lit. 'the small lunch'). le déjeuner = lunch; le dîner = dinner; le goûter = afternoon snack (especially for children)."},

  // fr-l48 — Faire les courses (Shopping) — A2
  {"id":"fr-423","topic":"fr-shop","lesson":"fr-l48","type":"mcq","q":"How do you ask 'How much does it cost?'","opts":["Combien il coûte ?","Quel est le prix ?","Comment le prix ?","C'est combien ? / Ça coûte combien ?"],"ans":3,"exp":"C'est combien ? or Ça coûte combien ? = How much is it? You can also say Combien coûte-t-il ? (formal). All are correct and commonly heard in French shops."},
  {"id":"fr-424","topic":"fr-shop","lesson":"fr-l48","type":"mcq","q":"You say 'Je cherche une veste bleue.' What are you looking for?","opts":["a black jacket","a blue dress","a blue skirt","a blue jacket"],"ans":3,"exp":"je cherche = I'm looking for; une veste = a jacket; bleue = blue (feminine — agrees with veste which is feminine)."},
  {"id":"fr-425","topic":"fr-shop","lesson":"fr-l48","type":"mcq","q":"How do you say 'It's too expensive'?","opts":["C'est trop bon","C'est très cher","C'est assez cher","C'est trop cher"],"ans":3,"exp":"C'est trop cher = It's too expensive. trop = too (much); très = very; assez = quite/enough. C'est très cher = It's very expensive but not necessarily too expensive."},
  {"id":"fr-426","topic":"fr-shop","lesson":"fr-l48","type":"mcq","q":"A shop assistant asks 'Vous faites quelle taille ?' — What are they asking?","opts":["What colour do you want?","How much do you want to spend?","What are you looking for?","What size do you take?"],"ans":3,"exp":"Quelle taille ? = What size? la taille = clothing size; la pointure = shoe size. Vous faites quelle taille ? = What size do you wear?"},
  {"id":"fr-427","topic":"fr-shop","lesson":"fr-l48","type":"mcq","q":"How do you say 'I'll take it' when buying something?","opts":["Je veux ça","C'est pour moi","Je voudrais ça","Je le prends"],"ans":3,"exp":"Je le prends = I'll take it (lit. 'I take it'). This is the standard phrase when deciding to buy. je le prends (masc.) / je la prends (fem.) — depends on the item's gender."},
  {"id":"fr-428","topic":"fr-shop","lesson":"fr-l48","type":"mcq","q":"What does 'les soldes' mean?","opts":["the receipts","the shelves","the prices","the sales"],"ans":3,"exp":"les soldes = the sales (seasonal discounts). en soldes = on sale. In France, Les Soldes are legally regulated biannual events in January and July."},
  {"id":"fr-429","topic":"fr-shop","lesson":"fr-l48","type":"gapfill","q":"Do you have this in red? — Vous avez ça en ___ ?","template":"Vous avez ça en {0} ?","gaps":[{"options":["rouge","roux","rosé","rouge-et-blanc"],"answer":0}],"exp":"rouge = red (invariable — same form for masculine and feminine nouns). Common colours: rouge (red), bleu/e (blue), vert/e (green), noir/e (black), blanc/blanche (white)."},
  {"id":"fr-430","topic":"fr-shop","lesson":"fr-l48","type":"mcq","q":"'Ça fait vingt euros.' — What does the cashier mean?","opts":["It's very expensive","It's twenty percent off","It comes to forty euros","It comes to twenty euros"],"ans":3,"exp":"Ça fait vingt euros = It comes to / That's twenty euros. Ça fait + price is the standard cashier phrase for the total amount."},
  {"id":"fr-431","topic":"fr-shop","lesson":"fr-l48","type":"mcq","q":"How do you ask for a smaller size?","opts":["Vous avez ça en plus grand ?","Vous avez ça en autre couleur ?","Vous avez ça en solde ?","Vous avez ça en plus petit ?"],"ans":3,"exp":"en plus petit = in a smaller size. en plus grand = in a bigger size. These comparative expressions are used in clothes shops."},
  {"id":"fr-432","topic":"fr-shop","lesson":"fr-l48","type":"mcq","q":"What is 'le marché' ?","opts":["the supermarket","the shop","the mall","the market"],"ans":3,"exp":"le marché = the market (outdoor or covered). le supermarché = supermarket; le magasin = shop/store; le centre commercial = shopping centre/mall."},
  {"id":"fr-433","topic":"fr-shop","lesson":"fr-l48","type":"mcq","q":"Which phrase means 'I'm just browsing'?","opts":["Je cherche quelque chose","Je veux acheter","J'ai besoin d'aide","Je regarde, merci"],"ans":3,"exp":"Je regarde, merci = I'm just looking, thanks. The polite way to decline a shop assistant's offer of help when you don't want it."},
  {"id":"fr-434","topic":"fr-shop","lesson":"fr-l48","type":"mcq","q":"You see 'CAISSE' at the end of an aisle. What does it mean?","opts":["Exit","Changing rooms","Information","Till / Checkout"],"ans":3,"exp":"la caisse = the till / checkout. Other useful signs: CABINES D'ESSAYAGE = changing rooms; SORTIE = exit; ACCUEIL = reception."},

  // fr-l49 — Les transports et les directions — A2
  {"id":"fr-435","topic":"fr-transport","lesson":"fr-l49","type":"mcq","q":"How do you say 'by train' in French?","opts":["à train","par train","avec train","en train"],"ans":3,"exp":"en train = by train. Use 'en' for enclosed transport: en voiture (by car), en bus, en avion, en métro. Use 'à' for non-enclosed: à vélo (by bike), à pied (on foot)."},
  {"id":"fr-436","topic":"fr-transport","lesson":"fr-l49","type":"mcq","q":"What does 'Tournez à gauche' mean?","opts":["Go straight ahead","Turn right","Turn around","Turn left"],"ans":3,"exp":"Tournez à gauche = Turn left. Tournez à droite = turn right. Allez tout droit = go straight ahead. These are the core direction commands."},
  {"id":"fr-437","topic":"fr-transport","lesson":"fr-l49","type":"mcq","q":"How do you ask 'Where is the train station?'","opts":["Où est le train ?","Où va la gare ?","Comment est la gare ?","Où est la gare ?"],"ans":3,"exp":"Où est la gare ? = Where is the train station? la gare = train station; l'aéroport = airport; l'arrêt de bus = bus stop; la station de métro = metro station."},
  {"id":"fr-438","topic":"fr-transport","lesson":"fr-l49","type":"mcq","q":"'Prenez la deuxième rue à droite.' — What should you do?","opts":["Take the first street on the left","Go straight for two streets","Turn at the traffic lights","Take the second street on the right"],"ans":3,"exp":"Prenez la deuxième rue à droite = Take the second street on the right. Ordinals: première (1st), deuxième (2nd), troisième (3rd) — essential for giving directions."},
  {"id":"fr-439","topic":"fr-transport","lesson":"fr-l49","type":"mcq","q":"What does 'C'est loin d'ici ?' mean?","opts":["How do I get there?","Is it on the left?","Where is the nearest bus stop?","Is it far from here?"],"ans":3,"exp":"C'est loin d'ici ? = Is it far from here? loin de = far from; près de = near; d'ici = from here. C'est près d'ici = It's nearby."},
  {"id":"fr-440","topic":"fr-transport","lesson":"fr-l49","type":"mcq","q":"How do you say 'on foot' in French?","opts":["en pied","au pied","par pied","à pied"],"ans":3,"exp":"à pied = on foot. Contrast with enclosed transport using en: en bus, en voiture. à pied (foot), à vélo (bicycle), à moto (motorbike)."},
  {"id":"fr-441","topic":"fr-transport","lesson":"fr-l49","type":"gapfill","q":"Go straight ahead, then turn right. — Allez ___, puis tournez à droite.","template":"Allez {0}, puis tournez à droite.","gaps":[{"options":["tout droit","très droit","tout droite","tout à droite"],"answer":0}],"exp":"tout droit = straight ahead. tout = entirely; droit = straight. Note: la droite (f.) = the right side, but tout droit = straight (invariable fixed phrase)."},
  {"id":"fr-442","topic":"fr-transport","lesson":"fr-l49","type":"mcq","q":"What is 'le carrefour'?","opts":["the roundabout","the bridge","the traffic light","the crossroads / intersection"],"ans":3,"exp":"le carrefour = crossroads / intersection. le rond-point = roundabout; le pont = bridge; le feu rouge = traffic light; le passage piéton = pedestrian crossing."},
  {"id":"fr-443","topic":"fr-transport","lesson":"fr-l49","type":"mcq","q":"'Traversez le pont, puis continuez tout droit.' — What should you do?","opts":["Turn at the bridge, then go left","Cross the road at the lights, then turn right","Go under the bridge and continue","Cross the bridge, then continue straight ahead"],"ans":3,"exp":"Traversez = cross (verb traverser); le pont = the bridge; continuez = continue; tout droit = straight ahead."},
  {"id":"fr-444","topic":"fr-transport","lesson":"fr-l49","type":"mcq","q":"Which transport word uses 'à' rather than 'en'?","opts":["l'avion","le bus","la voiture","le vélo"],"ans":3,"exp":"à vélo = by bicycle. Rule: non-enclosed personal transport uses 'à': à vélo, à moto, à pied, à cheval. Enclosed vehicles use 'en': en voiture, en bus, en avion."},
  {"id":"fr-445","topic":"fr-transport","lesson":"fr-l49","type":"mcq","q":"How do you say 'The bus stop is on the left'?","opts":["La gare est à gauche","Le bus est sur la gauche","L'arrêt de bus est à droite","L'arrêt de bus est à gauche"],"ans":3,"exp":"L'arrêt de bus est à gauche = The bus stop is on the left. l'arrêt de bus = bus stop; à gauche = on the left; à droite = on the right."},
  {"id":"fr-446","topic":"fr-transport","lesson":"fr-l49","type":"dragdrop","q":"Match each transport word to its English meaning","pairs":[{"left":"la voiture","right":"car"},{"left":"le métro","right":"underground/subway"},{"left":"l'avion","right":"aeroplane"},{"left":"le vélo","right":"bicycle"}],"exp":"la voiture (car), le métro (underground), l'avion (aeroplane — note the elision l'), le vélo (bicycle)."},

  // fr-l50 — La météo — A1
  {"id":"fr-447","topic":"fr-meteo","lesson":"fr-l50","type":"mcq","q":"How do you say 'It's nice weather'?","opts":["Il est beau","Il y a beau","C'est beau temps","Il fait beau"],"ans":3,"exp":"Il fait beau = It's nice weather. The construction 'il fait + adjective' is used for weather: il fait beau (nice), il fait mauvais (bad), il fait chaud (hot), il fait froid (cold)."},
  {"id":"fr-448","topic":"fr-meteo","lesson":"fr-l50","type":"mcq","q":"How do you say 'It's raining'?","opts":["Il fait pluie","Il tombe la pluie","Il est pluvieux","Il pleut"],"ans":3,"exp":"Il pleut = It's raining. This is an impersonal verb — only ever used with il. Similarly: il neige (it's snowing), il gèle (it's freezing), il grêle (it's hailing)."},
  {"id":"fr-449","topic":"fr-meteo","lesson":"fr-l50","type":"mcq","q":"What does 'il y a du vent' mean?","opts":["it's sunny","it's snowing","it's foggy","it's windy"],"ans":3,"exp":"il y a du vent = it's windy (lit. 'there is some wind'). Use 'il y a du/de la' for weather as nouns: du vent (wind), du soleil (sunshine), du brouillard (fog), des nuages (clouds)."},
  {"id":"fr-450","topic":"fr-meteo","lesson":"fr-l50","type":"mcq","q":"'Quel temps fait-il aujourd'hui ?' — What does this ask?","opts":["What time is it today?","What's the temperature today?","What season is it?","What's the weather like today?"],"ans":3,"exp":"Quel temps fait-il ? = What's the weather like? le temps = weather (also 'time' as duration). aujourd'hui = today. Il fait quel temps ? is a less formal alternative."},
  {"id":"fr-451","topic":"fr-meteo","lesson":"fr-l50","type":"mcq","q":"What is the French word for 'spring'?","opts":["l'été","l'automne","l'hiver","le printemps"],"ans":3,"exp":"le printemps = spring. les saisons: le printemps (spring), l'été (summer), l'automne (autumn), l'hiver (winter). Note: au printemps BUT en été / en automne / en hiver."},
  {"id":"fr-452","topic":"fr-meteo","lesson":"fr-l50","type":"mcq","q":"How do you say 'in summer'?","opts":["au printemps","au été","en hiver","en été"],"ans":3,"exp":"en été = in summer. All seasons except printemps use en: en été, en automne, en hiver. Spring is the exception: au printemps (because printemps starts with a consonant cluster)."},
  {"id":"fr-453","topic":"fr-meteo","lesson":"fr-l50","type":"gapfill","q":"It's cold and it's snowing. — Il fait froid et il ___.","template":"Il fait froid et il {0}.","gaps":[{"options":["neige","neigeait","neigera","neigeux"],"answer":0}],"exp":"il neige = it's snowing. Impersonal weather verbs: il pleut (raining), il neige (snowing), il gèle (freezing). They only conjugate in the 3rd person singular."},
  {"id":"fr-454","topic":"fr-meteo","lesson":"fr-l50","type":"mcq","q":"Which phrase means 'it's foggy'?","opts":["Il fait froid","Il pleut","Il y a du vent","Il y a du brouillard"],"ans":3,"exp":"il y a du brouillard = it's foggy. brouillard = fog. Il y a du/de la for weather nouns: du brouillard (fog), du soleil (sun), du vent (wind), des nuages (clouds)."},
  {"id":"fr-455","topic":"fr-meteo","lesson":"fr-l50","type":"mcq","q":"'Il fait 30 degrés.' — What does this mean?","opts":["It's freezing at -30°C","It's raining heavily","There are 30 clouds","It's 30 degrees (hot)"],"ans":3,"exp":"Il fait 30 degrés = It's 30 degrees. Il fait + temperature is the standard construction. Il fait moins 5 = It's minus 5."},
  {"id":"fr-456","topic":"fr-meteo","lesson":"fr-l50","type":"mcq","q":"What season do the French associate with 'les vendanges' (grape harvest)?","opts":["le printemps","l'été","l'hiver","l'automne"],"ans":3,"exp":"Les vendanges (grape harvest) take place in l'automne (autumn), typically September–October. France's wine regions are particularly associated with this season."},
  {"id":"fr-457","topic":"fr-meteo","lesson":"fr-l50","type":"dragdrop","q":"Match each weather expression to its meaning","pairs":[{"left":"il fait beau","right":"it's nice"},{"left":"il pleut","right":"it's raining"},{"left":"il neige","right":"it's snowing"},{"left":"il y a du soleil","right":"it's sunny"}],"exp":"il fait beau (nice weather), il pleut (raining — verb pleuvoir), il neige (snowing — verb neiger), il y a du soleil (sunny — 'there is some sun')."},
  {"id":"fr-458","topic":"fr-meteo","lesson":"fr-l50","type":"mcq","q":"'Il fait un temps de chien.' — What does this idiom mean?","opts":["It's a beautiful day","The weather is perfect for a walk","It's raining cats and dogs","The weather is terrible"],"ans":3,"exp":"Il fait un temps de chien = The weather is terrible (lit. 'dog weather'). A common French idiom for really bad weather. Similar to English 'it's miserable outside'."},

  // fr-l51 — Au restaurant — A2
  {"id":"fr-459","topic":"fr-resto","lesson":"fr-l51","type":"mcq","q":"How do you ask for a table for two?","opts":["Deux personnes, s'il vous plaît","Je voudrais deux tables","Nous voulons une place","Une table pour deux personnes, s'il vous plaît"],"ans":3,"exp":"Une table pour deux personnes, s'il vous plaît = A table for two, please. The standard phrase on entering a restaurant. You can also say: Pour deux, s'il vous plaît."},
  {"id":"fr-460","topic":"fr-resto","lesson":"fr-l51","type":"mcq","q":"What is the difference between 'la carte' and 'le menu' in a French restaurant?","opts":["They mean the same thing","La carte is the drinks list; le menu is the food list","Le menu is cheaper; la carte is more expensive","La carte is the full à la carte menu; le menu is a fixed-price set meal"],"ans":3,"exp":"la carte = the à la carte menu (choose individual dishes at listed prices). le menu = a fixed-price set meal. Je prends le menu à 15 euros = I'll have the set menu at €15."},
  {"id":"fr-461","topic":"fr-resto","lesson":"fr-l51","type":"mcq","q":"How do you ask for the bill?","opts":["Je voudrais partir","Le prix, s'il vous plaît","Combien, merci","L'addition, s'il vous plaît"],"ans":3,"exp":"L'addition, s'il vous plaît = The bill, please. l'addition = the bill (restaurant). la facture = invoice (business context). You can also gesture to the waiter while saying this."},
  {"id":"fr-462","topic":"fr-resto","lesson":"fr-l51","type":"mcq","q":"'Je voudrais commander.' — What does this mean?","opts":["I would like the bill","I would like to leave","I would like a table","I would like to order"],"ans":3,"exp":"Je voudrais commander = I would like to order. commander = to order (food/drink). Je suis prêt(e) à commander = I'm ready to order."},
  {"id":"fr-463","topic":"fr-resto","lesson":"fr-l51","type":"mcq","q":"A French menu lists: l'entrée, le plat principal, le dessert. What is 'le plat principal'?","opts":["the starter","the dessert","the side dish","the main course"],"ans":3,"exp":"le plat principal = the main course. l'entrée = the starter (caution: in French, entrée means starter — the opposite of American English where 'entrée' means main course!)."},
  {"id":"fr-464","topic":"fr-resto","lesson":"fr-l51","type":"mcq","q":"'Est-ce que le service est compris ?' — What is being asked?","opts":["Is the set menu included?","Is the restaurant busy?","Is the waiter available?","Is service/tip included?"],"ans":3,"exp":"Est-ce que le service est compris ? = Is service included? In France, service (15%) is included in the bill by law. A pourboire (tip) is optional on top. compris = included."},
  {"id":"fr-465","topic":"fr-resto","lesson":"fr-l51","type":"mcq","q":"How do you say 'It's delicious!'?","opts":["C'est parfait !","C'est trop salé !","C'est bon marché !","C'est délicieux !"],"ans":3,"exp":"C'est délicieux ! = It's delicious! Other food comments: C'est bon (good), C'est parfait (perfect), C'est trop salé (too salty), C'est trop sucré (too sweet)."},
  {"id":"fr-466","topic":"fr-resto","lesson":"fr-l51","type":"gapfill","q":"The waiter asks: 'Vous avez ___ ?' (Are you ready to order?)","template":"Vous avez {0} ?","gaps":[{"options":["choisi","commandé","payé","fini"],"answer":0}],"exp":"Vous avez choisi ? = Have you chosen / Are you ready to order? choisir → choisi (past participle). This is the most common waiter phrase to check if you're ready to order."},
  {"id":"fr-467","topic":"fr-resto","lesson":"fr-l51","type":"mcq","q":"What does 'le pourboire' mean?","opts":["the starter","the bill","the set menu","the tip"],"ans":3,"exp":"le pourboire = the tip (gratuity). Etymology: pour = for, boire = to drink (historically you'd tip someone 'for a drink'). In France, service is included in prices by law, but tips are appreciated."},
  {"id":"fr-468","topic":"fr-resto","lesson":"fr-l51","type":"mcq","q":"'Je suis allergique aux noix.' — What should the waiter know?","opts":["The customer doesn't like nuts","The customer wants nuts in their dish","The customer is vegetarian","The customer is allergic to nuts"],"ans":3,"exp":"Je suis allergique aux noix = I am allergic to nuts. allergique à = allergic to; les noix = nuts. Important for safety — always communicate allergies clearly."},
  {"id":"fr-469","topic":"fr-resto","lesson":"fr-l51","type":"mcq","q":"Which phrase means 'I'm a vegetarian'?","opts":["Je n'aime pas la viande","Je préfère les légumes","Je mange sain","Je suis végétarien/végétarienne"],"ans":3,"exp":"Je suis végétarien (m.) / végétarienne (f.) = I am a vegetarian. Je suis végétalien/e = vegan. Je suis sans gluten = gluten-free. Essential dietary phrases for eating out."},
  {"id":"fr-470","topic":"fr-resto","lesson":"fr-l51","type":"dragdrop","q":"Match each restaurant phrase to its meaning","pairs":[{"left":"l'addition","right":"the bill"},{"left":"le serveur","right":"the waiter"},{"left":"commander","right":"to order"},{"left":"l'entrée","right":"the starter"}],"exp":"l'addition (bill), le serveur/la serveuse (waiter/waitress), commander (to order), l'entrée (starter — not main course as in American English!)."},

  // ── CONJUGATION TABLE DRILLS ─────────────────────────────────────────────
  // fr-l52 — Être, avoir, aller — tableau complet — A1
  {"id":"fr-471","topic":"fr-conj","lesson":"fr-l52","type":"gapfill","q":"Être — je ___ (I am)","template":"Je {0} professeur.","gaps":[{"options":["suis","est","sommes","êtes"],"answer":0}],"exp":"être → je suis. Full présent: je suis · tu es · il/elle est · nous sommes · vous êtes · ils/elles sont."},
  {"id":"fr-472","topic":"fr-conj","lesson":"fr-l52","type":"gapfill","q":"Être — tu ___ (you are, informal)","template":"Tu {0} étudiant.","gaps":[{"options":["es","est","êtes","suis"],"answer":0}],"exp":"être → tu es. Common confusions: tu es (informal you) vs vous êtes (formal/plural you)."},
  {"id":"fr-473","topic":"fr-conj","lesson":"fr-l52","type":"gapfill","q":"Être — il/elle ___ (he/she is)","template":"Elle {0} française.","gaps":[{"options":["est","es","soit","a"],"answer":0}],"exp":"être → il/elle est. Note: est sounds like 'ay'. It's also the 3rd-person form used for on: on est = we are (informal)."},
  {"id":"fr-474","topic":"fr-conj","lesson":"fr-l52","type":"gapfill","q":"Être — nous ___ (we are)","template":"Nous {0} prêts.","gaps":[{"options":["sommes","êtes","sont","suis"],"answer":0}],"exp":"être → nous sommes. Memory tip: SOMmes — think of 'sum' (total). Nous sommes = we are."},
  {"id":"fr-475","topic":"fr-conj","lesson":"fr-l52","type":"gapfill","q":"Être — vous ___ (you are, formal/plural)","template":"Vous {0} en retard.","gaps":[{"options":["êtes","es","sont","sommes"],"answer":0}],"exp":"être → vous êtes. The accent on ê distinguishes êtes (you are) from et (and)."},
  {"id":"fr-476","topic":"fr-conj","lesson":"fr-l52","type":"gapfill","q":"Être — ils/elles ___ (they are)","template":"Ils {0} contents.","gaps":[{"options":["sont","suis","es","est"],"answer":0}],"exp":"être → ils/elles sont. Note: elles sont = they are (f.); ils sont = they are (m. or mixed group)."},
  {"id":"fr-477","topic":"fr-conj","lesson":"fr-l52","type":"gapfill","q":"Avoir — j'___ (I have)","template":"J'{0} faim.","gaps":[{"options":["ai","as","a","avons"],"answer":0}],"exp":"avoir → j'ai. Elision: je + ai → j'ai. Remember: j'ai faim (I'm hungry), j'ai soif (I'm thirsty) — French uses avoir for these states."},
  {"id":"fr-478","topic":"fr-conj","lesson":"fr-l52","type":"gapfill","q":"Avoir — tu ___ (you have)","template":"Tu {0} quel âge ?","gaps":[{"options":["as","ai","a","avez"],"answer":0}],"exp":"avoir → tu as. Asking age: tu as quel âge ? = how old are you? (lit. 'you have what age?')"},
  {"id":"fr-479","topic":"fr-conj","lesson":"fr-l52","type":"gapfill","q":"Avoir — il/elle ___ (he/she has)","template":"Elle {0} les yeux bleus.","gaps":[{"options":["a","ai","as","ont"],"answer":0}],"exp":"avoir → il/elle a. Compare: il est (he is) vs il a (he has). These two verbs are essential and often confused by beginners."},
  {"id":"fr-480","topic":"fr-conj","lesson":"fr-l52","type":"gapfill","q":"Avoir — nous ___ (we have)","template":"Nous {0} deux enfants.","gaps":[{"options":["avons","avez","ont","a"],"answer":0}],"exp":"avoir → nous avons. Full present of avoir: j'ai · tu as · il/elle a · nous avons · vous avez · ils/elles ont."},
  {"id":"fr-481","topic":"fr-conj","lesson":"fr-l52","type":"gapfill","q":"Avoir — vous ___ (you have, formal/plural)","template":"Vous {0} un rendez-vous.","gaps":[{"options":["avez","avons","ont","as"],"answer":0}],"exp":"avoir → vous avez. Also used in avoir passé composé: vous avez mangé (you have eaten)."},
  {"id":"fr-482","topic":"fr-conj","lesson":"fr-l52","type":"gapfill","q":"Avoir — ils/elles ___ (they have)","template":"Ils {0} de la chance.","gaps":[{"options":["ont","avons","avez","a"],"answer":0}],"exp":"avoir → ils/elles ont. Ils ont de la chance = they are lucky (lit. 'they have luck'). Note: ils ont sounds like 'il-zon' due to liaison."},
  {"id":"fr-483","topic":"fr-conj","lesson":"fr-l52","type":"gapfill","q":"Aller — je ___ (I go)","template":"Je {0} au marché.","gaps":[{"options":["vais","vas","va","allons"],"answer":0}],"exp":"aller → je vais. Aller is highly irregular! Full présent: je vais · tu vas · il/elle va · nous allons · vous allez · ils/elles vont."},
  {"id":"fr-484","topic":"fr-conj","lesson":"fr-l52","type":"gapfill","q":"Aller — tu ___ (you go)","template":"Tu {0} à l'école.","gaps":[{"options":["vas","vais","va","allez"],"answer":0}],"exp":"aller → tu vas. Also used for the near future: tu vas manger = you are going to eat."},
  {"id":"fr-485","topic":"fr-conj","lesson":"fr-l52","type":"gapfill","q":"Aller — nous ___ (we go)","template":"Nous {0} en France.","gaps":[{"options":["allons","allez","vont","vais"],"answer":0}],"exp":"aller → nous allons. Allons! = Let's go! (imperative). The nous form is also used to form the futur proche: nous allons partir."},
  {"id":"fr-486","topic":"fr-conj","lesson":"fr-l52","type":"gapfill","q":"Aller — ils/elles ___ (they go)","template":"Ils {0} au cinéma.","gaps":[{"options":["vont","vais","va","allez"],"answer":0}],"exp":"aller → ils/elles vont. Ils vont = they go / they are going. Also the near future: ils vont arriver = they are going to arrive."},
  {"id":"fr-487","topic":"fr-conj","lesson":"fr-l52","type":"mcq","q":"Which is the correct form of 'être' for 'vous'?","opts":["vous êtes","vous est","vous sommes","vous sont"],"ans":0,"exp":"vous êtes = you are (formal/plural). Note the circumflex on ê. Vous form of être is unique — it doesn't follow any regular pattern."},
  {"id":"fr-488","topic":"fr-conj","lesson":"fr-l52","type":"mcq","q":"'Nous ___ en retard.' — Which verb (être) is correct?","opts":["nous sommes","nous êtes","nous sont","nous suis"],"ans":0,"exp":"nous sommes = we are. The nous form of être is sommes — it comes from the Latin 'sumus'. Just one to memorise!"},
  {"id":"fr-489","topic":"fr-conj","lesson":"fr-l52","type":"dragdrop","q":"Match each pronoun to the correct form of ÊTRE","pairs":[{"left":"je","right":"suis"},{"left":"tu","right":"es"},{"left":"nous","right":"sommes"},{"left":"ils","right":"sont"}],"exp":"être: je suis · tu es · il/elle est · nous sommes · vous êtes · ils/elles sont. This is the most irregular verb in French — learn it by heart!"},
  {"id":"fr-490","topic":"fr-conj","lesson":"fr-l52","type":"dragdrop","q":"Match each pronoun to the correct form of AVOIR","pairs":[{"left":"j'","right":"ai"},{"left":"tu","right":"as"},{"left":"nous","right":"avons"},{"left":"ils","right":"ont"}],"exp":"avoir: j'ai · tu as · il/elle a · nous avons · vous avez · ils/elles ont. Avoir is used for passé composé of most verbs (e.g. j'ai mangé)."},

  // fr-l53 — Verbes réguliers -ER, -IR, -RE — A1
  {"id":"fr-491","topic":"fr-conj","lesson":"fr-l53","type":"gapfill","q":"-ER verb: parler — je ___ (I speak)","template":"Je {0} français.","gaps":[{"options":["parle","parles","parlez","parlons"],"answer":0}],"exp":"parler → je parle. Regular -ER endings: -e · -es · -e · -ons · -ez · -ent. The je/il/elle forms both end in -e (the 's' that appears in other forms is absent here)."},
  {"id":"fr-492","topic":"fr-conj","lesson":"fr-l53","type":"gapfill","q":"-ER verb: parler — tu ___ (you speak)","template":"Tu {0} vite !","gaps":[{"options":["parles","parle","parlez","parlent"],"answer":0}],"exp":"parler → tu parles (add -es). Regular -ER: je parle · tu parles · il parle · nous parlons · vous parlez · ils parlent."},
  {"id":"fr-493","topic":"fr-conj","lesson":"fr-l53","type":"gapfill","q":"-ER verb: parler — nous ___ (we speak)","template":"Nous {0} anglais.","gaps":[{"options":["parlons","parlez","parlent","parles"],"answer":0}],"exp":"parler → nous parlons (add -ons). All regular verbs use -ons for nous. Parlons! = Let's talk! (imperative)."},
  {"id":"fr-494","topic":"fr-conj","lesson":"fr-l53","type":"gapfill","q":"-ER verb: manger — nous ___ (we eat)","template":"Nous {0} à midi.","gaps":[{"options":["mangeons","mangons","manges","mangez"],"answer":0}],"exp":"manger → nous mangeons. Verbs ending in -ger add an 'e' before -ons to keep the soft 'g' sound: mang-e-ons. Same pattern for nager (to swim) → nous nageons."},
  {"id":"fr-495","topic":"fr-conj","lesson":"fr-l53","type":"gapfill","q":"-ER verb: aimer — ils ___ (they like/love)","template":"Ils {0} la musique.","gaps":[{"options":["aiment","aimez","aimé","aimes"],"answer":0}],"exp":"aimer → ils aiment. The -ent ending of ils/elles is SILENT. ils aiment sounds exactly like il aime (he loves)."},
  {"id":"fr-496","topic":"fr-conj","lesson":"fr-l53","type":"mcq","q":"Which form is correct? 'Vous ___ le français.' (parler)","opts":["parlons","parlez","parlent","parle"],"ans":1,"exp":"vous parlez = you speak. -ER verbs: vous + stem + -ez. Nearly all verbs (including most irregular ones) use -ez for vous."},
  {"id":"fr-497","topic":"fr-conj","lesson":"fr-l53","type":"gapfill","q":"-IR verb: finir — je ___ (I finish)","template":"Je {0} le travail.","gaps":[{"options":["finis","fini","finit","finissons"],"answer":0}],"exp":"finir → je finis. Regular -IR endings: -is · -is · -it · -issons · -issez · -issent. Note the 'iss' inserted in plural forms: nous finissons."},
  {"id":"fr-498","topic":"fr-conj","lesson":"fr-l53","type":"gapfill","q":"-IR verb: finir — il/elle ___ (he/she finishes)","template":"Il {0} le repas.","gaps":[{"options":["finit","finis","finissent","finissons"],"answer":0}],"exp":"finir → il finit. The 't' appears in the il/elle form: -it. Full present: je finis · tu finis · il finit · nous finissons · vous finissez · ils finissent."},
  {"id":"fr-499","topic":"fr-conj","lesson":"fr-l53","type":"gapfill","q":"-IR verb: finir — nous ___ (we finish)","template":"Nous {0} à 17h.","gaps":[{"options":["finissons","finissez","finissent","finit"],"answer":0}],"exp":"finir → nous finissons. The -iss- infix appears in nous/vous/ils forms of regular -IR verbs: finissons, finissez, finissent."},
  {"id":"fr-500","topic":"fr-conj","lesson":"fr-l53","type":"gapfill","q":"-IR verb: choisir — ils ___ (they choose)","template":"Ils {0} le menu.","gaps":[{"options":["choisissent","choisit","choisissons","choisissez"],"answer":0}],"exp":"choisir → ils choisissent. All regular -IR verbs follow this pattern: ils + stem + -issent. Other -IR verbs: réussir (to succeed), obéir (to obey), rougir (to blush)."},
  {"id":"fr-501","topic":"fr-conj","lesson":"fr-l53","type":"gapfill","q":"-RE verb: attendre — j'___ (I wait for)","template":"J'{0} le bus.","gaps":[{"options":["attends","attend","attendons","attendez"],"answer":0}],"exp":"attendre → j'attends. Regular -RE endings: -ds · -ds · d (NO ending) · -ons · -ez · -ent. Note: the je/tu forms have -ds and the il/elle form has just the stem with no ending."},
  {"id":"fr-502","topic":"fr-conj","lesson":"fr-l53","type":"gapfill","q":"-RE verb: attendre — il/elle ___ (he/she waits)","template":"Elle {0} son ami.","gaps":[{"options":["attend","attends","attendez","attendons"],"answer":0}],"exp":"attendre → il/elle attend. The il/elle form of -RE verbs has NO added ending — just the stem: attend (not attendt). Compare -ER (il parle) and -IR (il finit) where endings appear."},
  {"id":"fr-503","topic":"fr-conj","lesson":"fr-l53","type":"mcq","q":"Which pattern correctly shows the endings for regular -ER verbs?","opts":["-is, -is, -it, -issons, -issez, -issent","-s, -s, -d, -ons, -ez, -ent","-e, -es, -e, -ons, -ez, -ent","-e, -es, -e, -ons, -ez, -ons"],"ans":2,"exp":"Regular -ER endings: -e · -es · -e · -ons · -ez · -ent. The -IR pattern uses -is/-issons; the -RE pattern uses -ds/-d. Each group has distinct endings."},
  {"id":"fr-504","topic":"fr-conj","lesson":"fr-l53","type":"mcq","q":"'Elle ___ vite.' — Which form of 'travailler' is correct?","opts":["travaillons","travaillez","travaille","travailles"],"ans":2,"exp":"elle travaille = she works. -ER verb, il/elle form: stem + -e (no extra letter). The ending is silent — travaille and j'aime both end in the same sound."},
  {"id":"fr-505","topic":"fr-conj","lesson":"fr-l53","type":"dragdrop","q":"Match each -ER verb ending to its pronoun","pairs":[{"left":"je","right":"-e"},{"left":"tu","right":"-es"},{"left":"nous","right":"-ons"},{"left":"ils/elles","right":"-ent"}],"exp":"-ER verb endings: je -e · tu -es · il/elle -e · nous -ons · vous -ez · ils/elles -ent. The je and il/elle endings are identical (-e) and always silent."},

  // fr-l54 — Faire, vouloir, pouvoir, devoir — A2
  {"id":"fr-506","topic":"fr-conj","lesson":"fr-l54","type":"gapfill","q":"Faire — je ___ (I do/make)","template":"Je {0} du sport.","gaps":[{"options":["fais","fait","faites","font"],"answer":0}],"exp":"faire → je fais. Faire is highly irregular! Full présent: je fais · tu fais · il fait · nous faisons · vous faites · ils font. Note: faites (not faisez) for vous."},
  {"id":"fr-507","topic":"fr-conj","lesson":"fr-l54","type":"gapfill","q":"Faire — vous ___ (you do/make)","template":"Vous {0} du bruit.","gaps":[{"options":["faites","faisez","fait","faisons"],"answer":0}],"exp":"faire → vous faites. This is irregular — most verbs use -ez for vous, but faire uses faites. One of only three -tes endings: vous êtes, vous faites, vous dites."},
  {"id":"fr-508","topic":"fr-conj","lesson":"fr-l54","type":"gapfill","q":"Faire — ils/elles ___ (they do/make)","template":"Ils {0} la cuisine.","gaps":[{"options":["font","faits","faisons","fait"],"answer":0}],"exp":"faire → ils font. Irregular: not faisent. Full: je fais · tu fais · il fait · nous faisons · vous faites · ils font."},
  {"id":"fr-509","topic":"fr-conj","lesson":"fr-l54","type":"gapfill","q":"Vouloir — je ___ (I want)","template":"Je {0} un café.","gaps":[{"options":["veux","veut","voulons","voulez"],"answer":0}],"exp":"vouloir → je veux. The stem changes: veul- for je/tu/il, voul- for nous/vous, veul- for ils. Full: je veux · tu veux · il veut · nous voulons · vous voulez · ils veulent."},
  {"id":"fr-510","topic":"fr-conj","lesson":"fr-l54","type":"gapfill","q":"Vouloir — il/elle ___ (he/she wants)","template":"Il {0} partir.","gaps":[{"options":["veut","veux","voulons","voulez"],"answer":0}],"exp":"vouloir → il veut. Note the stem change: je/tu veux · il veut (same sound as veux but spelled differently). The -t on il veut is a spelling convention."},
  {"id":"fr-511","topic":"fr-conj","lesson":"fr-l54","type":"gapfill","q":"Vouloir — nous ___ (we want)","template":"Nous {0} rester.","gaps":[{"options":["voulons","voulons","veulent","voulez"],"answer":0}],"exp":"vouloir → nous voulons. The stem reverts to voul- for nous and vous: voulons, voulez. This stem change (veul-/voul-) is typical of irregular verbs."},
  {"id":"fr-512","topic":"fr-conj","lesson":"fr-l54","type":"gapfill","q":"Pouvoir — je ___ (I can)","template":"Je {0} vous aider.","gaps":[{"options":["peux","peut","pouvons","pouvez"],"answer":0}],"exp":"pouvoir → je peux. Alternative: je puis (very formal/literary). Full: je peux · tu peux · il peut · nous pouvons · vous pouvez · ils peuvent."},
  {"id":"fr-513","topic":"fr-conj","lesson":"fr-l54","type":"gapfill","q":"Pouvoir — vous ___ (you can)","template":"Vous {0} partir.","gaps":[{"options":["pouvez","pouvent","pouvons","peux"],"answer":0}],"exp":"pouvoir → vous pouvez. The vous form is regular (-ez on the pouv- stem): pouvez. Compare vouloir: vous voulez."},
  {"id":"fr-514","topic":"fr-conj","lesson":"fr-l54","type":"gapfill","q":"Devoir — je ___ (I must)","template":"Je {0} partir maintenant.","gaps":[{"options":["dois","doit","devons","devez"],"answer":0}],"exp":"devoir → je dois. Full présent: je dois · tu dois · il doit · nous devons · vous devez · ils doivent. Devoir expresses obligation: je dois = I must / I have to."},
  {"id":"fr-515","topic":"fr-conj","lesson":"fr-l54","type":"mcq","q":"Which form of 'faire' is correct for 'vous'?","opts":["vous faisons","vous faisez","vous font","vous faites"],"ans":3,"exp":"vous faites = you do/make. This is one of three irregular vous forms in French: vous êtes (être), vous faites (faire), vous dites (dire). All other verbs use -ez."},
  {"id":"fr-516","topic":"fr-conj","lesson":"fr-l54","type":"dragdrop","q":"Match each pronoun to the correct form of FAIRE","pairs":[{"left":"je/tu","right":"fais"},{"left":"il/elle","right":"fait"},{"left":"nous","right":"faisons"},{"left":"ils/elles","right":"font"}],"exp":"faire: je/tu fais · il fait · nous faisons · vous faites · ils font. Remember: faites (NOT faisez) for vous, and font (NOT faisent) for ils."},

  // fr-l55 — Le passé composé — A2
  {"id":"fr-517","topic":"fr-conj","lesson":"fr-l55","type":"gapfill","q":"Passé composé (avoir): 'I ate' — j'___ mangé","template":"Hier, j'{0} mangé.","gaps":[{"options":["ai","suis","ais","avais"],"answer":0}],"exp":"j'ai mangé = I ate (lit. 'I have eaten'). Passé composé = auxiliary (avoir or être) + past participle. Most verbs use avoir: j'ai · tu as · il a · nous avons · vous avez · ils ont + past participle."},
  {"id":"fr-518","topic":"fr-conj","lesson":"fr-l55","type":"gapfill","q":"Passé composé (avoir): 'she finished' — elle ___ fini","template":"Elle {0} fini le devoir.","gaps":[{"options":["a","ai","est","avait"],"answer":0}],"exp":"elle a fini = she finished/has finished. Auxiliary: elle a (avoir). Past participle of finir → fini. Regular -IR verbs: stem + i."},
  {"id":"fr-519","topic":"fr-conj","lesson":"fr-l55","type":"gapfill","q":"Passé composé (être): 'I went' — je ___ allé(e)","template":"Je {0} allé(e) au marché.","gaps":[{"options":["suis","ai","était","suis allé"],"answer":0}],"exp":"je suis allé(e) = I went/have gone. Aller uses être as its auxiliary. Verbs of motion/state use être: aller, venir, partir, arriver, naître, mourir, rester, retourner, tomber, entrer, sortir."},
  {"id":"fr-520","topic":"fr-conj","lesson":"fr-l55","type":"gapfill","q":"Passé composé (être): 'she arrived' — elle ___ arrivée","template":"Elle {0} arrivée tard.","gaps":[{"options":["est","a","était","avait"],"answer":0}],"exp":"elle est arrivée = she arrived. Arriver uses être. With être auxiliary, the past participle agrees with the subject: elle est arrivée (fem. +e), ils sont arrivés (masc. pl. +s)."},
  {"id":"fr-521","topic":"fr-conj","lesson":"fr-l55","type":"mcq","q":"What is the past participle of 'avoir' (to have)?","opts":["avé","havé","eu","avait"],"ans":2,"exp":"avoir → eu. Irregular past participle. Common irregular past participles to memorise: avoir → eu · être → été · faire → fait · prendre → pris · voir → vu · venir → venu."},
  {"id":"fr-522","topic":"fr-conj","lesson":"fr-l55","type":"mcq","q":"What is the past participle of 'faire' (to do/make)?","opts":["faisé","faite","fait","fais"],"ans":2,"exp":"faire → fait. J'ai fait = I did/made. Other key irregular past participles: prendre → pris · mettre → mis · voir → vu · vouloir → voulu · pouvoir → pu."},
  {"id":"fr-523","topic":"fr-conj","lesson":"fr-l55","type":"mcq","q":"What is the past participle of 'prendre' (to take)?","opts":["prendu","pris","prend","prendé"],"ans":1,"exp":"prendre → pris. J'ai pris = I took. Pris is also used for: comprendre (compris), apprendre (appris), surprendre (surpris)."},
  {"id":"fr-524","topic":"fr-conj","lesson":"fr-l55","type":"mcq","q":"'Je n'ai pas mangé.' — What does this sentence mean?","opts":["I didn't eat","I have eaten","I was not eating","I will not eat"],"ans":0,"exp":"Je n'ai pas mangé = I didn't eat / I haven't eaten. Negation in passé composé: ne goes before the auxiliary, pas goes after it: je NE ai PAS → je N'AI PAS mangé."},
  {"id":"fr-525","topic":"fr-conj","lesson":"fr-l55","type":"mcq","q":"'Elle est partie hier.' — Why is 'partie' not 'parti'?","opts":["It's an error","Partir is a -RE verb","Avec être auxiliary, the past participle agrees with the subject (elle = feminine)","Hier always causes feminine agreement"],"ans":2,"exp":"With être auxiliary, the past participle agrees with the subject in gender and number: elle (fem.) → partie (+e). Il est parti (masc.) · Elle est partie (fem.) · Ils sont partis (masc. pl.) · Elles sont parties (fem. pl.)."},
  {"id":"fr-526","topic":"fr-conj","lesson":"fr-l55","type":"dragdrop","q":"Match each infinitive to its past participle","pairs":[{"left":"voir","right":"vu"},{"left":"venir","right":"venu"},{"left":"mettre","right":"mis"},{"left":"être","right":"été"}],"exp":"Irregular past participles: voir → vu · venir → venu · mettre → mis · être → été. Also: avoir → eu · faire → fait · prendre → pris · savoir → su · pouvoir → pu."},

  // fr-l56 — A1 Dialogues: basic real-world conversations
  {"id":"fr-527","topic":"fr-dial","lesson":"fr-l56","type":"mcq","q":"A waiter says: 'Bonjour ! Qu'est-ce que vous prenez ?' You want a coffee. Which reply is correct?","opts":["Je suis un café, s'il vous plaît.","Je voudrais un café, s'il vous plaît.","J'ai un café, merci.","Un café est ici."],"ans":1,"exp":"'Je voudrais un café, s'il vous plaît' = I would like a coffee, please. 'Je voudrais' (I would like) is the polite conditional — always use it when ordering. 'Je suis' means I am; 'j'ai' means I have — both wrong here."},
  {"id":"fr-528","topic":"fr-dial","lesson":"fr-l56","type":"mcq","q":"In a shop you ask: 'C'est combien ?' The assistant says 'Cinq euros.' You want to pay. You say:","opts":["Je ne comprends pas.","Voilà, cinq euros.","C'est fermé.","Je voudrais partir."],"ans":1,"exp":"'Voilà, cinq euros' = Here you are, five euros. 'Voilà' is used when handing something over. 'C'est combien ?' = How much is it? is an essential shopping phrase."},
  {"id":"fr-529","topic":"fr-dial","lesson":"fr-l56","type":"mcq","q":"You meet someone for the first time. They say 'Bonjour ! Comment vous appelez-vous ?' How do you give your name?","opts":["Je m'appelle Marie.","J'ai Marie.","Je suis Marie.","Marie appelle."],"ans":0,"exp":"'Je m'appelle Marie' = My name is Marie (lit. 'I call myself Marie'). This is the standard way to give your name. 'Je suis' is also possible but 'Je m'appelle' is more idiomatic for names."},
  {"id":"fr-530","topic":"fr-dial","lesson":"fr-l56","type":"mcq","q":"A friend says 'Ça va ?' in the street. Which is the most natural casual reply?","opts":["Je m'appelle bien.","Ça va, merci ! Et toi ?","Je voudrais aller bien.","Oui, je suis content."],"ans":1,"exp":"'Ça va, merci ! Et toi ?' = Fine, thanks! And you? This mirrors the greeting and is the natural exchange. 'Ça va ?' can be both the question AND the answer ('ça va' = fine)."},
  {"id":"fr-531","topic":"fr-dial","lesson":"fr-l56","type":"scenario","setup":"You are at a boulangerie (bakery). The baker says: 'Bonjour ! Je vous sers ?' You want a baguette and two croissants.","q":"What do you say?","parts":[{"q":"'Je vous sers ?' means:","opts":["Do you want to serve me?","Can I help you? / What can I get you?","Are you being served?","Do you have a number?"],"ans":1},{"q":"To order, you say:","opts":["Je suis une baguette et deux croissants.","Je voudrais une baguette et deux croissants, s'il vous plaît.","J'ai une baguette et deux croissants.","Une baguette sont deux croissants."],"ans":1}],"exp":"'Je vous sers ?' = Can I help you? (lit. 'I serve you?'). To order: 'Je voudrais + item(s), s'il vous plaît'. In French bakeries, you say exactly what you want — no need to browse first."},
  {"id":"fr-532","topic":"fr-dial","lesson":"fr-l56","type":"mcq","q":"Someone asks you 'Quelle heure est-il ?' It is 3 o'clock. What do you say?","opts":["Il est trois heures.","Il fait trois heures.","C'est trois heures.","Trois heures est."],"ans":0,"exp":"'Il est trois heures' = It is three o'clock. Always use 'Il est + [number] + heures' for telling the time. 'Il fait' is used for weather; 'C'est' is NOT used for time."},
  {"id":"fr-533","topic":"fr-dial","lesson":"fr-l56","type":"mcq","q":"A tourist asks you: 'Excusez-moi, où est la gare ?' You point left. What do you say?","opts":["La gare est à droite.","La gare est tout droit.","La gare est à gauche.","La gare est derrière vous."],"ans":2,"exp":"'La gare est à gauche' = The station is on the left. Key directions: à gauche (left) · à droite (right) · tout droit (straight ahead) · derrière (behind)."},
  {"id":"fr-534","topic":"fr-dial","lesson":"fr-l56","type":"mcq","q":"Someone says 'Merci beaucoup !' to you. Which is the most natural response?","opts":["Oui, merci.","De rien !","Merci à toi.","Je vous en prie, non."],"ans":1,"exp":"'De rien !' = You're welcome! (lit. 'Of nothing'). Also correct: 'Je vous en prie' (formal) or 'Avec plaisir' (with pleasure). 'De rien' is the most common casual response."},
  {"id":"fr-535","topic":"fr-dial","lesson":"fr-l56","type":"scenario","setup":"You are offered food at a French dinner party. The host says: 'Vous voulez encore du gâteau ?' You want more cake.","q":"How do you accept politely?","parts":[{"q":"'Encore' in this context means:","opts":["any more","already","first","enough"],"ans":0},{"q":"To accept politely, you say:","opts":["Non, merci.","Oui, s'il vous plaît, c'est délicieux !","Je voudrais partir.","J'ai assez mangé."],"ans":1}],"exp":"'Vous voulez encore du gâteau ?' = Would you like more cake? 'Encore' = more/again. To accept: 'Oui, s'il vous plaît, c'est délicieux !' = Yes please, it's delicious! To decline: 'Non, merci' (add 'c'est délicieux' to soften it)."},
  {"id":"fr-536","topic":"fr-dial","lesson":"fr-l56","type":"mcq","q":"At the pharmacy, you say: 'J'ai mal à la tête.' What have you told the pharmacist?","opts":["I have a stomachache.","I have a headache.","I feel dizzy.","I have a sore throat."],"ans":1,"exp":"'J'ai mal à la tête' = I have a headache (lit. 'I have pain at the head'). Body part pain pattern: 'j'ai mal à + article + body part'. J'ai mal au ventre (stomach) · à la gorge (throat) · aux pieds (feet)."},
  {"id":"fr-537","topic":"fr-dial","lesson":"fr-l56","type":"mcq","q":"It's 9pm and you're leaving a friend's house. Which goodbye is most appropriate?","opts":["Bonjour !","Bonne journée !","Bonne nuit !","Au revoir, bonne soirée !"],"ans":3,"exp":"'Au revoir, bonne soirée !' = Goodbye, have a good evening! At 9pm it's soirée (evening), not journée (day) or nuit (night — said when going to sleep). 'Bonjour' is only for greetings, not goodbyes."},
  {"id":"fr-538","topic":"fr-dial","lesson":"fr-l56","type":"mcq","q":"A new colleague says 'Je ne comprends pas. Vous pouvez répéter, s'il vous plaît ?' What are they asking?","opts":["Can you speak faster?","Can you write it down?","Can you repeat that, please?","Can you help me?"],"ans":2,"exp":"'Vous pouvez répéter ?' = Can you repeat? 'Je ne comprends pas' = I don't understand. These two phrases together form one of the most important requests for language learners in France."},
  {"id":"fr-539","topic":"fr-dial","lesson":"fr-l56","type":"mcq","q":"Someone asks: 'Vous avez quel âge ?' You are 25. What do you reply?","opts":["Je suis 25 ans.","J'ai 25 ans.","J'ai 25 années.","Il y a 25 ans."],"ans":1,"exp":"'J'ai 25 ans' = I am 25 years old (lit. 'I have 25 years'). French uses AVOIR (to have) for age, not être (to be). This is a very common mistake for English speakers."},
  {"id":"fr-540","topic":"fr-dial","lesson":"fr-l56","type":"scenario","setup":"At a train station kiosk. The ticket agent says: 'Bonjour ! Vous désirez ?' You want a single ticket to Lyon.","q":"Choose the correct exchanges.","parts":[{"q":"'Vous désirez ?' means:","opts":["You want to go?","What would you like?","Where are you going?","Do you have a ticket?"],"ans":1},{"q":"You reply:","opts":["Je voudrais un aller simple pour Lyon, s'il vous plaît.","Je suis Lyon, s'il vous plaît.","Un aller-retour pour Paris, merci.","Lyon, je vais."],"ans":0}],"exp":"'Vous désirez ?' = What would you like? (formal). 'Un aller simple' = a single/one-way ticket. 'Un aller-retour' = a return ticket. Always add 's'il vous plaît' when ordering or requesting."},
  {"id":"fr-541","topic":"fr-dial","lesson":"fr-l56","type":"mcq","q":"In class, your teacher says something you didn't catch. What is the most polite way to ask them to slow down?","opts":["Parlez plus vite, s'il vous plaît !","Pouvez-vous parler plus lentement, s'il vous plaît ?","Je ne veux pas écouter.","Répétez en anglais, s'il vous plaît."],"ans":1,"exp":"'Pouvez-vous parler plus lentement, s'il vous plaît ?' = Could you speak more slowly, please? 'Lentement' = slowly. 'Plus lentement' = more slowly. This is one of the most useful phrases for language learners."},
  {"id":"fr-542","topic":"fr-dial","lesson":"fr-l56","type":"mcq","q":"You call a French business and someone answers. Which is the correct way they would greet you?","opts":["Allô, bonjour ! Société Dupont, j'écoute.","Hello, qui êtes-vous ?","Oui ? C'est quoi ?","Bonjour, appelez plus tard."],"ans":0,"exp":"'Allô, bonjour ! [Company name], j'écoute.' is the standard French telephone greeting. 'J'écoute' = I'm listening. 'Allô' is used ONLY on the phone — never in person. When calling, you say: 'Bonjour, je suis [name]' to introduce yourself."},
  {"id":"fr-543","topic":"fr-dial","lesson":"fr-l56","type":"mcq","q":"At the supermarket checkout, the cashier asks 'Vous avez une carte de fidélité ?' You don't. What do you say?","opts":["Oui, voilà ma carte.","Non, je n'en ai pas.","Je ne sais pas ce que c'est.","Non, je suis fidèle."],"ans":1,"exp":"'Non, je n'en ai pas' = No, I don't have one. 'En' replaces 'une carte de fidélité' (a loyalty card). 'Une carte de fidélité' = a loyalty card. 'Je n'en ai pas' is natural French; 'Non, pas de carte' also works."},

  // fr-l57 — A2 Dialogues: everyday social situations
  {"id":"fr-544","topic":"fr-dial","lesson":"fr-l57","type":"scenario","setup":"You arrive at a hotel. The receptionist says: 'Bonsoir ! Vous avez une réservation ?' You have a booking under the name Martin for two nights.","q":"Navigate the check-in.","parts":[{"q":"'Avez-vous une réservation ?' means:","opts":["Do you have a room?","Do you have a reservation?","Are you reserved?","Have you been here before?"],"ans":1},{"q":"You reply:","opts":["Oui, j'ai une réservation au nom de Martin, pour deux nuits.","Oui, je veux une chambre pour deux.","Je suis Martin, j'ai deux nuits.","Oui, j'ai reservé."],"ans":0}],"exp":"'Avez-vous une réservation ?' = Do you have a reservation? 'Au nom de' = in the name of. 'Pour deux nuits' = for two nights. Hotel vocabulary: chambre (room) · clé (key) · étage (floor) · ascenseur (lift/elevator)."},
  {"id":"fr-545","topic":"fr-dial","lesson":"fr-l57","type":"mcq","q":"You need directions. You ask: 'Pardon, pouvez-vous m'indiquer le chemin pour aller à la mairie ?' The person says 'Prenez la première rue à droite, puis tournez à gauche.' What should you do?","opts":["Turn right at the second street, then left","Take the first street on the right, then turn left","Go straight ahead, then right","Take the second street on the left, then right"],"ans":1,"exp":"'Prenez la première rue à droite' = Take the first street on the right. 'Puis tournez à gauche' = then turn left. 'Première' = first · 'rue' = street · 'puis' = then. Common direction verbs: prendre (take) · tourner (turn) · continuer (continue)."},
  {"id":"fr-546","topic":"fr-dial","lesson":"fr-l57","type":"mcq","q":"You call a doctor's surgery. The receptionist asks: 'C'est pour quel motif ?' What are they asking?","opts":["What is your name?","What is your address?","What is the reason for your visit?","What is your insurance number?"],"ans":2,"exp":"'C'est pour quel motif ?' = What is the reason for your appointment? 'Motif' = reason/motive. You might reply: 'J'ai de la fièvre' (I have a fever) or 'J'ai besoin d'un certificat médical' (I need a medical certificate)."},
  {"id":"fr-547","topic":"fr-dial","lesson":"fr-l57","type":"mcq","q":"At the train station: 'Je voudrais un aller-retour pour Bordeaux, deuxième classe, s'il vous plaît.' What have you asked for?","opts":["A one-way first-class ticket to Bordeaux","A return second-class ticket to Bordeaux","A one-way second-class ticket to Bordeaux","A first-class return to Bordeaux"],"ans":1,"exp":"'Aller-retour' = return ticket · 'deuxième classe' = second class · 'aller simple' = one-way ticket · 'première classe' = first class. Train vocabulary: voie (platform/track) · wagon (carriage) · réservation (seat reservation)."},
  {"id":"fr-548","topic":"fr-dial","lesson":"fr-l57","type":"scenario","setup":"You phone a friend to make plans. You say: 'Allô, c'est moi ! Tu es libre samedi soir ?' Your friend says: 'Oui, pourquoi ? Tu veux faire quelque chose ?'","q":"Continue the conversation.","parts":[{"q":"'Tu es libre samedi soir ?' means:","opts":["Are you free Saturday evening?","Do you want to go out Saturday?","What are you doing Saturday?","Are you leaving Saturday?"],"ans":0},{"q":"To suggest going to the cinema, you say:","opts":["On va au cinéma ?","Je voudrais le cinéma.","Tu es le cinéma ?","On doit cinéma."],"ans":0}],"exp":"'Tu es libre ?' = Are you free? 'On va au cinéma ?' = Shall we go to the cinema? (lit. 'One goes to the cinema?'). 'On' is very common in spoken French to mean 'we'. Making plans: 'On pourrait...' (We could...) or 'Ça te dit de... ?' (Do you fancy...?)."},
  {"id":"fr-549","topic":"fr-dial","lesson":"fr-l57","type":"mcq","q":"Your colleague says: 'On se retrouve devant le café à midi ?' What are they suggesting?","opts":["They want to eat inside the café","They're asking you to meet outside the café at noon","They want to meet at midnight","They're asking if you've been to the café"],"ans":1,"exp":"'On se retrouve' = we meet up (reflexive verb 'se retrouver' = to meet). 'Devant' = in front of. 'À midi' = at noon. 'Se retrouver' is used for arranged meetings: on se retrouve à la gare (we'll meet at the station)."},
  {"id":"fr-550","topic":"fr-dial","lesson":"fr-l57","type":"mcq","q":"In a shop you can't find what you want. You ask an assistant: 'Est-ce que vous vendez des piles ?' They say 'Non, désolé, nous n'en avons pas.' What have they told you?","opts":["They sell batteries but they're expensive","They don't sell batteries","They are sorry you are lost","They sell batteries in a different size"],"ans":1,"exp":"'Nous n'en avons pas' = We don't have any (of them). 'En' replaces 'des piles' (batteries). 'Désolé' = sorry. To ask for items: 'Est-ce que vous avez/vendez + article + item ?'"},
  {"id":"fr-551","topic":"fr-dial","lesson":"fr-l57","type":"mcq","q":"You're at the post office. You say: 'Je voudrais envoyer ce colis en Angleterre. C'est urgent.' The clerk asks: 'Vous préférez Chronopost ou lettre recommandée ?' What is the choice being offered?","opts":["Airmail or sea freight","Express delivery or registered post","Standard or economy","Domestic or international"],"ans":1,"exp":"'Chronopost' = express/next-day delivery · 'lettre recommandée' = registered/recorded post. At the post office: enveloppe (envelope) · timbre (stamp) · colis (parcel) · recommandé (registered)."},
  {"id":"fr-552","topic":"fr-dial","lesson":"fr-l57","type":"mcq","q":"You're staying in a hotel and call reception: 'Il y a un problème avec ma chambre — il n'y a pas d'eau chaude.' The receptionist says 'Je suis vraiment désolé, je vais envoyer quelqu'un tout de suite.' What will happen?","opts":["You'll be moved to another room","Someone will come to fix it immediately","You'll get a discount","They will call a plumber tomorrow"],"ans":1,"exp":"'Je vais envoyer quelqu'un tout de suite' = I'm going to send someone right away. 'Tout de suite' = right away/immediately. 'Il n'y a pas d'eau chaude' = there is no hot water. Useful complaints: il y a du bruit (noise) · le chauffage ne marche pas (the heating doesn't work)."},
  {"id":"fr-553","topic":"fr-dial","lesson":"fr-l57","type":"scenario","setup":"You are at a French restaurant. The waiter asks: 'Vous avez choisi ?' You want to order the steak, medium-rare, with chips.","q":"Order your meal correctly.","parts":[{"q":"Medium-rare steak in French is:","opts":["bien cuit","à point","saignant","bleu"],"ans":1},{"q":"To order chips alongside, you say:","opts":["avec des frites, s'il vous plaît","avec du riz, s'il vous plaît","avec des légumes, s'il vous plaît","avec de la salade, s'il vous plaît"],"ans":0}],"exp":"Steak preferences: bleu (very rare/blue) · saignant (rare) · à point (medium/medium-rare) · bien cuit (well done). 'Des frites' = chips/French fries. 'Avec' = with. Ordering: 'Je voudrais le steak à point, avec des frites, s'il vous plaît.'"},
  {"id":"fr-554","topic":"fr-dial","lesson":"fr-l57","type":"mcq","q":"Your French colleague phones you while you're unavailable. They leave the message: 'Pourriez-vous me rappeler quand vous avez un moment ?' What are they asking?","opts":["Could you call me back when you have a moment?","Could you call me earlier next time?","Would you remember to take a break?","Could you send me a message later?"],"ans":0,"exp":"'Pourriez-vous me rappeler ?' = Could you call me back? 'Rappeler' = to call back. 'Quand vous avez un moment' = when you have a moment. 'Pourriez-vous' (could you?) is the polite conditional of pouvoir."},
  {"id":"fr-555","topic":"fr-dial","lesson":"fr-l57","type":"mcq","q":"A French friend texts: 'Je suis en retard, j'arrive dans dix minutes. Désolé !' What should you understand?","opts":["They will be there in 10 minutes and are sorry they're late","They left 10 minutes ago","They can't come at all","They want to meet in 10 minutes"],"ans":0,"exp":"'En retard' = late. 'J'arrive dans dix minutes' = I'll be there in ten minutes. 'Désolé' = sorry. 'Je suis en retard' is very commonly used. Compare: 'Je suis en avance' (I'm early) · 'Je suis à l'heure' (I'm on time)."},
  {"id":"fr-556","topic":"fr-dial","lesson":"fr-l57","type":"mcq","q":"You're shopping and the assistant offers: 'Vous payez par carte ou en espèces ?' What are your payment options?","opts":["Online or in person","By card or cash","Credit or debit card","In euros or foreign currency"],"ans":1,"exp":"'Par carte' = by card · 'en espèces' = in cash. Payment vocabulary: carte bancaire (bank card) · espèces (cash) · ticket de caisse (receipt) · remboursement (refund). You might also hear 'sans contact' (contactless)."},
  {"id":"fr-557","topic":"fr-dial","lesson":"fr-l57","type":"mcq","q":"A French friend says: 'Qu'est-ce que tu as fait ce week-end ?' You went to the cinema and then ate at a restaurant. Which is the correct reply?","opts":["Je vais au cinéma et après je mange au restaurant.","Je suis allé au cinéma et ensuite j'ai mangé au restaurant.","J'allais au cinéma et je mangeais au restaurant.","Je vais aller au cinéma et manger au restaurant."],"ans":1,"exp":"Past events → passé composé: 'je suis allé' (I went, using être) + 'j'ai mangé' (I ate, using avoir). 'Ensuite' = then/afterwards. 'Ce week-end' asks about the past, so the présent or futur would be wrong."},
  {"id":"fr-558","topic":"fr-dial","lesson":"fr-l57","type":"mcq","q":"You meet a French acquaintance who asks: 'Ça fait longtemps qu'on ne s'est pas vus !' What does this expression mean?","opts":["We haven't seen each other for a long time!","It takes a long time to see you!","I haven't been able to see you!","You look like you've been away a long time!"],"ans":0,"exp":"'Ça fait longtemps qu'on ne s'est pas vus !' = It's been a long time since we've seen each other! (It's been ages!). 'Ça fait + duration + que' = it has been [time] since. Common follow-up: 'Qu'est-ce que tu deviens ?' (What have you been up to?)."},
  {"id":"fr-559","topic":"fr-dial","lesson":"fr-l57","type":"mcq","q":"Your French landlord calls and says: 'Le loyer est dû avant le premier du mois.' What have they told you?","opts":["The rent is due before the first of the month","The rent has increased from the first of the month","The lease ends on the first of the month","You can pay rent after the first of the month"],"ans":0,"exp":"'Le loyer est dû' = the rent is due. 'Avant le premier du mois' = before the first of the month. Housing vocabulary: loyer (rent) · charges (bills/service charges) · bail (lease) · dépôt de garantie (deposit)."},
  {"id":"fr-560","topic":"fr-dial","lesson":"fr-l57","type":"mcq","q":"At the end of a French meal, you want to split the bill with friends. You tell the waiter: 'On peut avoir l'addition, s'il vous plaît ? On va payer séparément.' What have you asked?","opts":["Can we have the bill — we'll pay separately","Can we share a dessert separately","Can we have separate menus","Can you bring the bill and we'll tip separately"],"ans":0,"exp":"'L'addition' = the bill. 'Payer séparément' = to pay separately. 'On peut avoir...?' = Can we have...? Note: 'la note' = bill in informal usage. 'Vous partagez ?' (Are you splitting?) is what the waiter might ask."},

  // fr-l58 — B1 Dialogues: complex and formal situations
  {"id":"fr-561","topic":"fr-dial","lesson":"fr-l58","type":"scenario","setup":"You are a guest at a hotel. Your room is very noisy due to construction work nearby. You go to reception to complain formally.","q":"Handle the formal complaint.","parts":[{"q":"Which opening is most appropriate for a formal complaint?","opts":["Ce n'est pas cool ce bruit !","Je souhaiterais signaler un problème concernant ma chambre.","Ma chambre est trop bruyante, c'est inadmissible !","Vous devez faire quelque chose maintenant !"],"ans":1},{"q":"After explaining the problem, you ask for a solution. Which is most appropriate?","opts":["Je veux partir immédiatement sans payer.","Serait-il possible de me changer de chambre ?","C'est votre problème, pas le mien.","Je vais écrire sur TripAdvisor."],"ans":1}],"exp":"Formal complaint: 'Je souhaiterais signaler un problème' = I would like to report a problem. 'Serait-il possible de... ?' = Would it be possible to...? These conditional forms show you are making a request rather than a demand, which is more likely to get a positive response."},
  {"id":"fr-562","topic":"fr-dial","lesson":"fr-l58","type":"mcq","q":"You receive a formal French email starting with: 'Suite à notre entretien téléphonique du 15 juin, je me permets de vous contacter pour...' What does this opening tell you?","opts":["This is a follow-up to a phone call on 15 June","This is a first-time contact dated 15 June","The writer is apologising for a delay","The writer is requesting an urgent meeting"],"ans":0,"exp":"'Suite à notre entretien téléphonique' = following our phone conversation. 'Je me permets de vous contacter' = I am taking the liberty of contacting you (formal). This phrasing establishes prior contact and is extremely common in formal French business correspondence."},
  {"id":"fr-563","topic":"fr-dial","lesson":"fr-l58","type":"mcq","q":"In a job interview, the interviewer asks: 'Quelles sont vos principales qualités ?' What are they asking?","opts":["What are your main weaknesses?","What are your main qualities/strengths?","What qualifications do you have?","What salary do you expect?"],"ans":1,"exp":"'Qualités' = qualities/strengths. 'Quelles sont vos principales qualités ?' = What are your main qualities/strengths? Common follow-up: 'Et quels sont vos défauts ?' (And what are your weaknesses?). Strong adjectives to use: rigoureux/se, organisé(e), autonome, créatif/ve, à l'écoute."},
  {"id":"fr-564","topic":"fr-dial","lesson":"fr-l58","type":"mcq","q":"In a discussion you want to politely disagree. Which phrasing is most appropriate in a formal context?","opts":["Non, tu as tort.","Je ne suis pas tout à fait d'accord. À mon sens...","C'est faux, vraiment.","Non, pas du tout, je pense l'opposé."],"ans":1,"exp":"'Je ne suis pas tout à fait d'accord' = I don't entirely agree. 'À mon sens' = in my view. Polite disagreement uses 'pas tout à fait' (not entirely) or 'cependant' (however). Blunt 'tu as tort' (you're wrong) or 'c'est faux' (that's wrong) are too aggressive in professional settings."},
  {"id":"fr-565","topic":"fr-dial","lesson":"fr-l58","type":"scenario","setup":"You are in a job interview. The interviewer says: 'Pourquoi avez-vous quitté votre dernier poste ?'","q":"Respond professionally.","parts":[{"q":"'Votre dernier poste' means:","opts":["your last salary","your current position","your previous job/position","your last company"],"ans":2},{"q":"Which is the most professional answer?","opts":["Mon patron était horrible.","Je cherchais de nouveaux défis et des opportunités de développement professionnel.","Le salaire n'était pas assez élevé.","Je m'ennuyais vraiment."],"ans":1}],"exp":"'Poste' = position/role/job. Professional answer: 'Je cherchais de nouveaux défis' = I was looking for new challenges. Always frame the reason positively in interviews. 'Développement professionnel' = professional development. Avoid criticising former employers."},
  {"id":"fr-566","topic":"fr-dial","lesson":"fr-l58","type":"mcq","q":"You receive a formal letter ending with: 'Veuillez agréer, Madame, Monsieur, l'expression de mes salutations distinguées.' What is this?","opts":["A complaint","A formal letter closing/sign-off","An invoice","A job offer"],"ans":1,"exp":"'Veuillez agréer... l'expression de mes salutations distinguées' is a formal French sign-off (closing formula). It is equivalent to 'Yours faithfully/sincerely'. Formal letters also use: 'Cordialement' (more modern/casual) or 'Bien à vous'. The full formal formula is considered very proper in official correspondence."},
  {"id":"fr-567","topic":"fr-dial","lesson":"fr-l58","type":"mcq","q":"Your French colleague says in a meeting: 'Il faudrait revoir notre approche concernant ce dossier.' What are they suggesting?","opts":["The file needs to be deleted","Our approach to this case needs to be reconsidered","The report is already correct","We should hire someone to handle it"],"ans":1,"exp":"'Il faudrait' = it would be necessary to / we should (conditional of falloir). 'Revoir' = to re-examine/reconsider. 'Notre approche' = our approach. 'Dossier' = file/case. 'Il faudrait + infinitive' is a polite way to make suggestions in professional French."},
  {"id":"fr-568","topic":"fr-dial","lesson":"fr-l58","type":"mcq","q":"During a debate, someone says: 'D'un côté... de l'autre côté...' What rhetorical structure are they using?","opts":["Cause and effect","On the one hand... on the other hand... (balanced argument)","Listing three points","Introducing a conclusion"],"ans":1,"exp":"'D'un côté... de l'autre côté...' = on the one hand... on the other hand... This is a key discourse structure for balanced arguments. Other connectors: 'certes... mais...' (admittedly... but...) · 'en revanche' (however/on the other hand) · 'néanmoins' (nevertheless)."},
  {"id":"fr-569","topic":"fr-dial","lesson":"fr-l58","type":"mcq","q":"You call a French company and ask to speak to Ms Leblanc. The assistant says: 'Mme Leblanc est absente pour le moment. Voulez-vous laisser un message ?' What do you do?","opts":["Call back immediately","Leave a message or call back later","Ask for the manager instead","Ask for her email address"],"ans":1,"exp":"'Elle est absente pour le moment' = she is not available right now. 'Voulez-vous laisser un message ?' = Would you like to leave a message? You could say: 'Oui, pouvez-vous lui demander de me rappeler ? Je m'appelle [name], mon numéro est le...'"},
  {"id":"fr-570","topic":"fr-dial","lesson":"fr-l58","type":"scenario","setup":"You are applying for a job in France. The HR manager emails: 'Auriez-vous la possibilité de passer un entretien le mardi 20 à 14h ?'","q":"Understand and respond to the invitation.","parts":[{"q":"'Auriez-vous la possibilité de...' means:","opts":["You must attend an interview","Would you be able to...?","Have you already attended an interview?","We are unable to interview you"],"ans":1},{"q":"To confirm you can attend, you reply:","opts":["Oui, je serai disponible le mardi 20 à 14h. Je vous remercie de cette invitation.","Non, je ne peux pas.","J'ai un entretien.","Je suis libre le lundi."],"ans":0}],"exp":"'Auriez-vous la possibilité de... ?' = Would you be able to...? (polite conditional). Confirming: 'Je serai disponible' = I will be available. 'Je vous remercie de cette invitation' = Thank you for this invitation. Always use 'vous' in professional emails and confirm availability clearly."},
  {"id":"fr-571","topic":"fr-dial","lesson":"fr-l58","type":"mcq","q":"In a formal meeting, you want to add a point. Which phrase is most appropriate?","opts":["Hey, j'ai quelque chose à dire !","Si vous me le permettez, j'aimerais ajouter...","Je pense que tu oublies quelque chose.","Attendez, j'ai une idée."],"ans":1,"exp":"'Si vous me le permettez, j'aimerais ajouter...' = If you will allow me, I would like to add... This is the formal way to ask to contribute to a discussion. Other formal phrases: 'Je me permets d'intervenir pour...' (I take the liberty of intervening to...) · 'Permettez-moi de...' (Allow me to...)."},
  {"id":"fr-572","topic":"fr-dial","lesson":"fr-l58","type":"mcq","q":"A French colleague emails you informally: 'Salut ! T'as vu le rapport de Thomas ? Il est trop bien !' What register is this, and what does it mean?","opts":["Formal; the report is too long","Informal; have you seen Thomas's report? It's really good!","Neutral; did you finish the report?","Formal; the report needs revision"],"ans":1,"exp":"'Salut' = informal hi. 'T'as vu' = informal contraction of 'tu as vu' (have you seen). 'Trop bien' = really good (colloquial; literally 'too good'). This is informal/familiar register — appropriate for close colleagues, not management or external contacts."},
  {"id":"fr-573","topic":"fr-dial","lesson":"fr-l58","type":"mcq","q":"You read in a contract: 'En cas de litige, les parties s'engagent à recourir à la médiation avant toute procédure judiciaire.' What does this clause mean?","opts":["In case of a dispute, parties must go directly to court","In case of a dispute, parties agree to use mediation before any legal proceedings","Disputes must be reported to the government","All agreements require a judge's approval"],"ans":1,"exp":"'En cas de litige' = in case of a dispute. 'S'engagent à' = agree to (commit to). 'Recourir à la médiation' = to resort to mediation. 'Avant toute procédure judiciaire' = before any legal proceedings. This is a standard arbitration/mediation clause."},
  {"id":"fr-574","topic":"fr-dial","lesson":"fr-l58","type":"mcq","q":"A French news article says: 'Le gouvernement aurait décidé de reporter la réforme.' What does 'aurait décidé' indicate?","opts":["The government has definitely decided to postpone the reform","It is alleged/reportedly decided (unconfirmed information)","The government decided in the past but changed its mind","The government refused to decide"],"ans":1,"exp":"'Aurait décidé' = would have decided — this is the conditionnel passé used as a journalistic device to report unconfirmed information (le conditionnel journalistique). It signals the information is not yet officially confirmed. Very common in French news reporting."},
  {"id":"fr-575","topic":"fr-dial","lesson":"fr-l58","type":"mcq","q":"You want to end a formal business email professionally. Which sign-off is most appropriate for a first contact?","opts":["Bisous !","À plus tard,","Dans l'attente de votre réponse, je vous adresse mes cordiales salutations.","Merci bye,"],"ans":2,"exp":"'Dans l'attente de votre réponse, je vous adresse mes cordiales salutations' = Awaiting your reply, I send you my cordial regards. Formal first-contact sign-offs: 'Cordialement' (standard) · 'Bien cordialement' (warm/professional) · 'Salutations distinguées' (very formal). 'Bisous' (kisses) is for close friends only."},

  // fr-l59 — A1 Pronunciation: vowels, silent letters, basic sounds
  {"id":"fr-576","topic":"fr-phon","lesson":"fr-l59","type":"mcq","q":"The French word 'ou' (or) and 'où' (where) look nearly identical. How do you tell them apart?","opts":["They are homophones — they sound different","'Ou' has no accent; 'où' has a grave accent (`) — but they sound identical","'Ou' sounds like 'oo'; 'où' sounds like 'uh'","'Où' is always at the start of a sentence"],"ans":1,"exp":"'Ou' and 'où' are homophones — they sound identical (/u/). The grave accent on 'où' is purely a spelling convention to avoid confusion between 'or' and 'where'. Context always clarifies: Tu viens ou tu restes ? vs Où es-tu ?"},
  {"id":"fr-577","topic":"fr-phon","lesson":"fr-l59","type":"mcq","q":"Which pair of French words are homophones (sound exactly the same)?","opts":["vert (green) / vers (towards) / verre (glass)","chat (cat) / chaud (hot)","bon (good) / beau (handsome)","et (and) / est (is)"],"ans":0,"exp":"'Vert', 'vers', and 'verre' are all pronounced /vɛʁ/ — identical sounds, different spellings and meanings. French has many such homophones. Context and spelling are key: Je porte un pull vert. · Il marche vers la gare. · Je bois dans un verre."},
  {"id":"fr-578","topic":"fr-phon","lesson":"fr-l59","type":"mcq","q":"In French, the letter 'h' at the start of a word is almost always silent. Which sentence is correct?","opts":["Je habite à Paris.","J'habite à Paris.","Je hhabite à Paris.","I h'abite à Paris."],"ans":1,"exp":"'J'habite' = I live (elision: je + habite → j'habite). The 'h' in 'habite' is a 'h muet' (silent h) — treat it as if it starts with a vowel. Elision and liaison occur. Some words have 'h aspiré' (aspirate h) where elision does NOT occur: le hibou (NOT l'hibou)."},
  {"id":"fr-579","topic":"fr-phon","lesson":"fr-l59","type":"mcq","q":"In French, the sounds 'au', 'eau', and 'o' all rhyme with each other. Which word does NOT belong in the same rhyming group?","opts":["beau","bureau","bateau","bien"],"ans":3,"exp":"'Beau' /bo/ · 'bureau' /byʁo/ · 'bateau' /bato/ — all contain the /o/ sound. 'Bien' /bjɛ̃/ contains the nasal vowel /ɛ̃/ — completely different. The 'eau' spelling always sounds /o/ in French: eau, beau, gâteau, tableau, chapeau."},
  {"id":"fr-580","topic":"fr-phon","lesson":"fr-l59","type":"mcq","q":"The French 'u' sound (as in 'tu', 'lune', 'rue') does not exist in English. How is it best described?","opts":["Like the English 'oo' in 'moon'","Like the English 'u' in 'but'","Round your lips as if to say 'oo' but say 'ee' instead","Like the English 'ew' in 'new'"],"ans":2,"exp":"The French /y/ sound in 'tu/lune/rue': position lips to say 'oo' (rounded), then say 'ee' without moving your lips. This is different from 'ou' (/u/) in 'vous/roue'. 'Tu' (/ty/) vs 'tout' (/tu/) — a minimal pair that changes meaning completely."},
  {"id":"fr-581","topic":"fr-phon","lesson":"fr-l59","type":"mcq","q":"Which word contains a SILENT final consonant?","opts":["avec","chef","sept","pont"],"ans":3,"exp":"'Pont' /pɔ̃/ — the final 't' is silent (it also has a nasal vowel). In French, most final consonants are silent: chat, vingt, nez, pied. Exceptions where final consonants ARE pronounced: avec /avɛk/ · chef /ʃɛf/ · sept /sɛt/. The memory trick: CaReFuL — C, R, F, L are usually pronounced at the end."},
  {"id":"fr-582","topic":"fr-phon","lesson":"fr-l59","type":"mcq","q":"'Est' (is) and 'et' (and) — how do they compare in pronunciation?","opts":["'Est' is /ɛst/, 'et' is /ɛt/ — different","Both are pronounced /e/ — they sound the same","'Et' rhymes with 'jet'; 'est' is silent","'Est' sounds like 'air'; 'et' sounds like 'ay'"],"ans":1,"exp":"'Et' /e/ and 'est' /ɛ/ are near-identical in natural speech — both sound like 'ay'. In careful speech, 'est' has a slightly more open /ɛ/ vowel. The final 'st' in 'est' is silent. In fast speech they are often indistinguishable, and context clarifies meaning."},
  {"id":"fr-583","topic":"fr-phon","lesson":"fr-l59","type":"mcq","q":"The 'é' (closed e) and 'è' (open e) are different sounds. Which word contains a CLOSED 'é' sound (like the 'ay' in 'say')?","opts":["fête","père","café","fenêtre"],"ans":2,"exp":"'Café' contains the closed /e/ sound — like 'ay'. 'Fête', 'père', 'fenêtre' all contain the OPEN /ɛ/ sound (like 'air' in English). Rule: é = closed /e/ · è, ê, e followed by double consonant = open /ɛ/. This distinction matters: chanter (infinitive) vs chanté (past participle) — same spelling group but different tones."},
  {"id":"fr-584","topic":"fr-phon","lesson":"fr-l59","type":"mcq","q":"In French, the letter 'c' is pronounced like 's' before which letters?","opts":["a, o, u","e, i, y","r, l, n","all vowels"],"ans":1,"exp":"'C' is soft /s/ before e, i, y: cerise /s/, cinéma /s/, cycle /s/. Before a, o, u it is hard /k/: café, copain, curieux. To force a soft 'c' sound before a, o, u, you add a cedilla: français, garçon, ça va."},
  {"id":"fr-585","topic":"fr-phon","lesson":"fr-l59","type":"mcq","q":"Which word does NOT rhyme with 'main' (hand)?","opts":["pain","vin","bain","lune"],"ans":3,"exp":"'Main' /mɛ̃/, 'pain' /pɛ̃/, 'vin' /vɛ̃/, 'bain' /bɛ̃/ — all share the nasal /ɛ̃/ sound. 'Lune' /lyn/ has the /y/ vowel — completely different. French nasal 'in/ain/ein' all produce /ɛ̃/: vin, pain, main, bain, sein, rein."},
  {"id":"fr-586","topic":"fr-phon","lesson":"fr-l59","type":"dragdrop","q":"Match each word to the vowel sound it contains","pairs":[{"left":"vous","right":"/u/ (oo)"},{"left":"tu","right":"/y/ (French ü)"},{"left":"café","right":"/e/ (ay)"},{"left":"père","right":"/ɛ/ (air)"}],"exp":"Key French vowels: vous /vu/ = 'oo' sound · tu /ty/ = rounded 'ee' (no English equivalent) · café /kafe/ = closed 'ay' · père /pɛʁ/ = open 'air'. The ou/u distinction is crucial: 'vous' vs 'vu', 'roue' vs 'rue'."},
  {"id":"fr-587","topic":"fr-phon","lesson":"fr-l59","type":"mcq","q":"Which of these pairs are minimal pairs — words that differ by only ONE sound?","opts":["bon / blanc","tu / tout","verre / vert","chat / chien"],"ans":1,"exp":"'Tu' /ty/ and 'tout' /tu/ differ by exactly one sound: the vowel (/y/ vs /u/). These are minimal pairs. 'Bon'/'blanc' differ in vowel AND consonant. 'Verre'/'vert' are homophones (same sound). 'Chat'/'chien' differ in multiple sounds."},
  {"id":"fr-588","topic":"fr-phon","lesson":"fr-l59","type":"mcq","q":"In French, 'on' at the end of a word (as in 'maison', 'bon', 'garçon') produces which sound?","opts":["Like the English 'on' in 'on'","A nasal vowel /ɔ̃/ — like a nasalised 'awn'","Like the English 'own' in 'own'","The letter 'n' is fully pronounced"],"ans":1,"exp":"French 'on' produces the nasal vowel /ɔ̃/ — the vowel is nasalised and the 'n' is NOT a separate consonant. English has no direct equivalent; it sounds like a rounded 'aw' hummed through the nose. bon /bɔ̃/ · maison /mɛzɔ̃/ · garçon /gaʁsɔ̃/."},
  {"id":"fr-589","topic":"fr-phon","lesson":"fr-l59","type":"mcq","q":"The letters 'gn' in French (as in 'montagne', 'champagne', 'cognac') produce which sound?","opts":["Like the 'gn' in English 'ignore'","Like the 'ny' in 'canyon' (the Spanish ñ sound)","Like the 'ng' in 'sing'","Like the letter 'g' alone"],"ans":1,"exp":"French 'gn' = /ɲ/ — like the 'ny' sound in 'canyon' or the Spanish ñ. montagne /mɔ̃taɲ/ · champagne /ʃɑ̃paɲ/ · cognac /kɔɲak/ · Espagne /ɛspaɲ/. This sound is also found in 'gagner' (to win/earn) /gaɲe/."},
  {"id":"fr-590","topic":"fr-phon","lesson":"fr-l59","type":"dragdrop","q":"Match each French spelling pattern to the sound it makes","pairs":[{"left":"eau / au","right":"/o/ (as in 'go')"},{"left":"ou","right":"/u/ (as in 'you')"},{"left":"ai / ei","right":"/ɛ/ (as in 'air')"},{"left":"in / ain","right":"/ɛ̃/ (nasal)"}],"exp":"French spelling patterns: eau/au → /o/ (beau, bateau) · ou → /u/ (vous, rouge) · ai/ei → /ɛ/ (maison, beige) · in/ain → /ɛ̃/ nasal (vin, main). Mastering these patterns makes reading French aloud much more predictable."},
  {"id":"fr-591","topic":"fr-phon","lesson":"fr-l59","type":"mcq","q":"How is the French 'r' (as in 'rue', 'rouge', 'très') produced?","opts":["Like the English 'r' — the tongue tip curls back","In the throat/back of the mouth — a uvular fricative","Like the Spanish rolled 'r'","It is always silent"],"ans":1,"exp":"The French 'r' /ʁ/ is produced at the back of the throat (uvular position) — a gentle friction like gargling. It is completely different from the English 'r' (tongue tip) or Spanish 'r' (trilled). Very common in French: rue, rouge, très, partir, merci."},

  // fr-l60 — A2 Pronunciation: nasal vowels, liaison, elision
  {"id":"fr-592","topic":"fr-phon","lesson":"fr-l60","type":"mcq","q":"French has four nasal vowel sounds. Which combination is correct?","opts":["/an/, /in/, /on/, /un/","an/en, in/ain/ein, on, un/um","/a/, /i/, /o/, /u/ when followed by 'n'","an, enne, onne, unne"],"ans":1,"exp":"The four French nasal vowels: an/en → /ɑ̃/ (enfant, sans) · in/ain/ein → /ɛ̃/ (vin, pain, bein) · on → /ɔ̃/ (bon, maison) · un → /œ̃/ (un, lundi — though /un/ is merging with /ɛ̃/ in modern French). These sounds are nasalised — air passes through the nose as you say them."},
  {"id":"fr-593","topic":"fr-phon","lesson":"fr-l60","type":"mcq","q":"'An' and 'en' both produce the same nasal vowel /ɑ̃/. Which word does NOT contain this sound?","opts":["enfant","sans","vent","vin"],"ans":3,"exp":"'Vin' contains the /ɛ̃/ nasal vowel (not /ɑ̃/). 'Enfant' /ɑ̃fɑ̃/ · 'sans' /sɑ̃/ · 'vent' /vɑ̃/ — all /ɑ̃/. 'Vin' /vɛ̃/ — different nasal vowel. Key contrast: vent (wind) vs vin (wine) — both nasal, but different sounds."},
  {"id":"fr-594","topic":"fr-phon","lesson":"fr-l60","type":"mcq","q":"Liaison in French means linking a final consonant to the next word's initial vowel. 'Les enfants' — what happens?","opts":["The 's' is silent as usual","The 's' is pronounced /z/ and links to 'enfants': lez-enfants","The 's' is pronounced /s/ and links: les-senfants","No liaison occurs"],"ans":1,"exp":"In 'les enfants', liaison occurs: the silent 's' of 'les' becomes /z/ and links to the vowel: /lez‿ɑ̃fɑ̃/. Liaison always occurs after: les, des, ces, mes, tes, ses, un, aux, en, on, bien, très. It marks formal/careful speech."},
  {"id":"fr-595","topic":"fr-phon","lesson":"fr-l60","type":"mcq","q":"Elision (l'apostrophe) replaces the vowel of 'le/la/je/me/te/se/de/ne/que'. Before which sound does elision occur?","opts":["Before any noun","Before words starting with a vowel or silent h","Before words starting with a consonant","Before words of more than 2 syllables"],"ans":1,"exp":"Elision occurs before words starting with a vowel OR a silent 'h': le + ami → l'ami · je + ai → j'ai · ne + est → n'est. Not before aspirate 'h': le hibou (not l'hibou) · la honte (not l'honte). This is mandatory in written French."},
  {"id":"fr-596","topic":"fr-phon","lesson":"fr-l60","type":"mcq","q":"Which sentence contains a MISTAKE in written liaison/elision?","opts":["J'habite à Paris.","Le hibou est là.","C'est un bon ami.","L'homme arrive."],"ans":1,"exp":"'Le hibou' is correct — 'hibou' has an aspirate h (h aspiré), so no elision or liaison. The other sentences are correct: j'habite (elision, h muet) · c'est = elided 'ce est' · l'homme (elision, h muet). Aspirate h is unpredictable and must be memorised."},
  {"id":"fr-597","topic":"fr-phon","lesson":"fr-l60","type":"dragdrop","q":"Match the French word to its nasal vowel sound","pairs":[{"left":"vin","right":"/ɛ̃/"},{"left":"bon","right":"/ɔ̃/"},{"left":"enfant","right":"/ɑ̃/"},{"left":"un","right":"/œ̃/"}],"exp":"The four nasal vowels: vin /ɛ̃/ (in/ain) · bon /ɔ̃/ (on) · enfant /ɑ̃/ (an/en) · un /œ̃/ (un/um). Being able to distinguish these is essential for both listening and speaking in French."},
  {"id":"fr-598","topic":"fr-phon","lesson":"fr-l60","type":"mcq","q":"The French word 'plus' has three different pronunciations. In 'je ne mange plus' (I no longer eat), how is it pronounced?","opts":["/plys/ — the 's' is heard","/ply/ — the 's' is silent","/plu/ — like English 'blue'","/pluz/ — the 'z' sound"],"ans":1,"exp":"In negation (ne...plus = no longer), 'plus' is /ply/ — the 's' is silent. In 'plus de' (more of) it is /ply/ too. Only when meaning 'more' positively is it sometimes /plys/: 'Tu veux plus de pain ?' In liaison: 'de plus en plus' /dəplyzɑ̃ply/."},
  {"id":"fr-599","topic":"fr-phon","lesson":"fr-l60","type":"mcq","q":"'Vingt' (20) — how many of its letters are actually pronounced?","opts":["All four (v-i-n-g-t)","Three (v-i-n)","Two: /vɛ̃/ — the nasal vowel only, gt silent","The 't' only"],"ans":2,"exp":"'Vingt' is pronounced /vɛ̃/ — just the 'vin' part, with a nasal vowel. The 'g' and 't' are silent in 'vingt' alone. BUT in liaison: 'vingt-et-un' = /vɛ̃teuœ̃/ — the 't' is heard. Similarly: 'vingt ans' = /vɛ̃tɑ̃/ with liaison."},
  {"id":"fr-600","topic":"fr-phon","lesson":"fr-l60","type":"mcq","q":"What happens to the 'd' in 'grand ami' when spoken?","opts":["The 'd' stays silent","Liaison occurs: 'grand' sounds like /grɑ̃t/ — the 'd' becomes /t/","The 'd' is pronounced /d/","'Grand' drops its final syllable"],"ans":1,"exp":"Liaison in 'grand ami': the 'd' is normally silent but in liaison it becomes /t/ (voiced consonants become voiceless in liaison): /grɑ̃t‿ami/. This is why 'un grand ami' sounds like 'un gran-tami'. Other voiced → voiceless: second /sgɔ̃/ → 'second enfant' /sgɔ̃t‿ɑ̃fɑ̃/."},
  {"id":"fr-601","topic":"fr-phon","lesson":"fr-l60","type":"mcq","q":"What is the French term for when two vowels in adjacent words merge — the first vowel is dropped?","opts":["Liaison","Élision","Enchaînement","Troncation"],"ans":1,"exp":"Élision = dropping a vowel (replaced by apostrophe): le → l' · la → l' · je → j' · de → d' · ne → n' · que → qu'. This is MANDATORY before vowels/h muet in standard French. Liaison (linking consonants) and enchaînement (linking a pronounced consonant to the next vowel) are related but different."},
  {"id":"fr-602","topic":"fr-phon","lesson":"fr-l60","type":"mcq","q":"The French 'j' (as in 'je', 'jour', 'jardin') produces which sound?","opts":["Like the English 'j' in 'jam'","Like the 's' in 'measure' — a voiced palatal fricative /ʒ/","Like the English 'y' in 'yes'","Like the 'zh' in 'Zhukov'"],"ans":1,"exp":"French 'j' = /ʒ/ — like the 's' in 'measure', 'treasure', or 'vision'. je /ʒə/ · jour /ʒuʁ/ · jardin /ʒaʁdɛ̃/. Note: French 'ch' = /ʃ/ (like English 'sh'): chat, chef, chercher. These are two different sounds: je vs chef."},
  {"id":"fr-603","topic":"fr-phon","lesson":"fr-l60","type":"mcq","q":"In connected speech, French speakers often shorten 'tu' to /t/ before a vowel. 'Tu as' becomes what?","opts":["tu as (no change)","t'as (/ta/)","tu'as","t'az"],"ans":1,"exp":"'T'as' /ta/ is the colloquial spoken form of 'tu as'. This elision (tu → t') happens in fast speech: t'as vu ? (Have you seen?). Similarly: t'es (tu es), t'aimes (tu aimes). This is spoken/informal only — always write 'tu as' in formal writing."},
  {"id":"fr-604","topic":"fr-phon","lesson":"fr-l60","type":"mcq","q":"The word 'œuf' (egg) is pronounced /œf/ in the singular. What happens in the plural 'œufs'?","opts":["Pronounced /œfs/ — the 's' is added","Pronounced /ø/ — both consonants drop","Pronounced /œ/ — the 'f' drops too","Same as singular"],"ans":1,"exp":"'Œufs' (eggs) is pronounced /ø/ — both the 'f' AND the 's' are silent in the plural! This is one of the most surprising pronunciation changes in French. Similarly: bœuf /bœf/ → bœufs /bø/ · os (bone) /ɔs/ → os (bones) /o/."},
  {"id":"fr-605","topic":"fr-phon","lesson":"fr-l60","type":"dragdrop","q":"Identify whether each 'h' triggers elision (h muet) or blocks it (h aspiré)","pairs":[{"left":"habiter (to live)","right":"h muet → j'habite"},{"left":"hibou (owl)","right":"h aspiré → le hibou"},{"left":"homme (man)","right":"h muet → l'homme"},{"left":"haricot (bean)","right":"h aspiré → le haricot"}],"exp":"H muet (silent h) → elision and liaison occur: l'homme, j'habite, l'heure, l'hiver. H aspiré (aspirate h) → NO elision or liaison: le hibou, le haricot, la honte, le héros. Unfortunately this must be memorised — there's no reliable rule."},

  // fr-l61 — B1 Pronunciation: register, reduced forms, intonation
  {"id":"fr-606","topic":"fr-phon","lesson":"fr-l61","type":"mcq","q":"In fast spoken French, 'je ne sais pas' (I don't know) is commonly shortened to what?","opts":["je ne sais","je sais pas","/ʃɛpa/","Both B and C"],"ans":3,"exp":"In informal spoken French, 'ne' is commonly dropped: 'je sais pas' (/ʒsɛpa/ or /ʃɛpa/). Further reduction: 'chais pas' or '/ʃɛpa/' in very casual speech. This is perfectly normal in conversation but should NEVER appear in formal writing."},
  {"id":"fr-607","topic":"fr-phon","lesson":"fr-l61","type":"mcq","q":"In spoken French, 'il y a' (there is/are) often becomes which sound?","opts":["'il y' only","/ja/ or 'y'a'","'il a'","'y il a'"],"ans":1,"exp":"'Il y a' → /ja/ or 'y'a' in fast speech: 'Y'a pas de problème' (No problem). Similarly: 'il y en a' → 'y'en a'. This reduction is common in all but the most formal spoken contexts. Always write 'il y a' in formal registers."},
  {"id":"fr-608","topic":"fr-phon","lesson":"fr-l61","type":"mcq","q":"French intonation in a yes/no question without an inversion can be shown only by:","opts":["Adding 'est-ce que' at the start","Rising intonation on the last syllable","Adding '?' at the end in writing","Both A and B"],"ans":3,"exp":"In spoken French, yes/no questions can be formed three ways: (1) rising intonation: 'Tu viens ?' ↗ (2) est-ce que: 'Est-ce que tu viens ?' (3) inversion: 'Viens-tu ?' In casual speech, only intonation or est-ce que is used — inversion is formal/written."},
  {"id":"fr-609","topic":"fr-phon","lesson":"fr-l61","type":"mcq","q":"What is the schwa /ə/ in French, and when is it dropped?","opts":["The letter 'e' — always pronounced","The 'mute e' — often dropped in fast speech: 'je ne sais pas' → 'j'n'sais pas'","A silent letter that is never pronounced","The nasal 'en' sound"],"ans":1,"exp":"The schwa /ə/ is the 'mute e' — a neutral vowel that is often dropped in fast speech. 'Je ne le veux pas' → '/ʒnlvøpa/' in rapid French. In poetry and formal speech every schwa is pronounced. The schwa keeps rhythmic flow; dropping it speeds up speech."},
  {"id":"fr-610","topic":"fr-phon","lesson":"fr-l61","type":"mcq","q":"The phrase 'Qu'est-ce que c'est ?' is which level of formality?","opts":["Very formal","Standard/neutral — correct spoken French","Informal/slang","Regional dialect only"],"ans":1,"exp":"'Qu'est-ce que c'est ?' = What is it? This is standard spoken French for a question about identity/nature. More formal: 'Qu'est-ce que c'est que cela ?' Informal: 'C'est quoi ça ?' The most formal (written): 'Qu'est-ce que cela est ?' or 'Qu'est-ce ?' — rarely used."},
  {"id":"fr-611","topic":"fr-phon","lesson":"fr-l61","type":"mcq","q":"In French, word stress falls on which syllable?","opts":["The first syllable (like English often does)","The last syllable of a rhythmic group","Whichever syllable carries the most meaning","It varies unpredictably"],"ans":1,"exp":"French stress falls on the LAST syllable of a rhythmic group (phrase), unlike English which varies. 'je mange' = /ʒə MⱭNƷ/ · 'je mange une pomme' = /ʒə mɑ̃ʒ yn POM/. Individual French words have no fixed stress — stress is at the phrase level. This gives French its characteristic even, flowing rhythm."},
  {"id":"fr-612","topic":"fr-phon","lesson":"fr-l61","type":"mcq","q":"'Bon' /bɔ̃/ and 'bonne' /bɔn/ are pronounced differently. What changes?","opts":["The vowel changes from nasal to oral when 'ne' is added","The stress moves to the second syllable","The b sound changes","Nothing — they are homophones"],"ans":0,"exp":"'Bon' /bɔ̃/ has a nasal vowel (the 'n' is not a separate consonant). 'Bonne' /bɔn/ has an oral vowel + a pronounced 'n'. This nasal/oral alternation happens when feminine endings are added: bon/bonne · américain/américaine · brun/brune · plein/pleine."},
  {"id":"fr-613","topic":"fr-phon","lesson":"fr-l61","type":"mcq","q":"'Pain' (bread) and 'pin' (pine tree) — are these homophones?","opts":["Yes — both /pɛ̃/","No — 'pain' is /pɛ̃/ and 'pin' is /pɛn/","No — 'pain' is /pæn/ and 'pin' is /pɛ̃/","Yes — both /pan/"],"ans":0,"exp":"'Pain' /pɛ̃/ and 'pin' /pɛ̃/ are homophones — both have the /ɛ̃/ nasal vowel. French has many such homophones: vin/vain/vingt /vɛ̃/ · main/maint /mɛ̃/. Context and spelling determine meaning: Je mange du pain. Il y a un pin dans le jardin."},
  {"id":"fr-614","topic":"fr-phon","lesson":"fr-l61","type":"mcq","q":"What is 'enchaînement' in French phonetics?","opts":["Elision — dropping a vowel","Linking a word-final pronounced consonant to the initial vowel of the next word","Liaison — linking a silent consonant","A change in vowel quality before nasals"],"ans":1,"exp":"Enchaînement = linking a word-final PRONOUNCED consonant to the initial vowel of the next word: 'une amie' → /y‿na‿mi/ (the 'n' links). This differs from liaison (where normally-silent consonants are activated). Both create the flowing connected sound of French."},
  {"id":"fr-615","topic":"fr-phon","lesson":"fr-l61","type":"mcq","q":"In formal spoken French, how many syllables does 'je' have in 'je vais'?","opts":["One /ʒə/ — always","In careful speech it's one; in fast speech the /ə/ drops making it cluster with 'v': /ʒvɛ/","It is silent — inversion must be used","Two syllables: /ʒe-vɛ/"],"ans":1,"exp":"'Je vais' = /ʒə vɛ/ in careful speech (two syllables). In fast speech the schwa drops: /ʒvɛ/. When several clitics cluster: 'je ne le vois pas' → /ʒnlvwapa/. Schwa reduction is a hallmark of natural, spontaneous French speech."},
  {"id":"fr-616","topic":"fr-phon","lesson":"fr-l61","type":"dragdrop","q":"Match the phonetic phenomenon to its example","pairs":[{"left":"Élision","right":"j'ai (je + ai)"},{"left":"Liaison","right":"les‿enfants (/z/ sound)"},{"left":"Enchaînement","right":"une‿amie (/n/ links)"},{"left":"Chute du ne","right":"Je sais pas (spoken)"}],"exp":"Four key spoken French phenomena: élision (vowel dropped, apostrophe written) · liaison (silent consonant activated before vowel) · enchaînement (pronounced consonant links to next vowel) · chute du ne (dropping 'ne' in negation — spoken only)."},
  {"id":"fr-617","topic":"fr-phon","lesson":"fr-l61","type":"mcq","q":"Which sentence demonstrates the FORMAL/WRITTEN register correctly for a question?","opts":["T'as vu le film ?","Tu as vu le film ?","As-tu vu le film ?","Est-ce que t'as vu le film ?"],"ans":2,"exp":"'As-tu vu le film ?' = Have you seen the film? Inversion (verb-subject swap) is the most formal question form — used in written and formal spoken French. 'Tu as vu le film ?' (rising intonation) and 'Est-ce que tu as vu le film ?' are standard spoken forms. 'T'as vu' is informal spoken only."},

  // fr-l62 — A1 Word order: basic SVO, negation, articles
  {"id":"fr-618","topic":"fr-order","lesson":"fr-l62","type":"wordorder","q":"Build the sentence: 'She eats an apple.'","words":["une","Elle","pomme","mange"],"answer":["Elle","mange","une","pomme"],"exp":"Elle mange une pomme. Word order: Subject (Elle) + Verb (mange) + Article (une) + Noun (pomme). French basic word order is SVO — same as English."},
  {"id":"fr-619","topic":"fr-order","lesson":"fr-l62","type":"wordorder","q":"Build the sentence: 'I speak French.'","words":["français","parle","Je"],"answer":["Je","parle","français"],"exp":"Je parle français. Subject (Je) + Verb (parle) + Language (français). Note: no article before a language after 'parler'. Je parle + language (no article)."},
  {"id":"fr-620","topic":"fr-order","lesson":"fr-l62","type":"wordorder","q":"Build the sentence: 'He has a dog.'","words":["un","a","Il","chien"],"answer":["Il","a","un","chien"],"exp":"Il a un chien. Subject (Il) + avoir (a) + un (masc. article) + chien. avoir is used for possession: j'ai, tu as, il a, nous avons, vous avez, ils ont."},
  {"id":"fr-621","topic":"fr-order","lesson":"fr-l62","type":"wordorder","q":"Build the sentence: 'We are going to Paris.'","words":["allons","Paris","à","Nous"],"answer":["Nous","allons","à","Paris"],"exp":"Nous allons à Paris. Subject (Nous) + aller (allons) + preposition (à) + city name (Paris). Use 'à' before city names: à Paris, à Lyon, à Rome."},
  {"id":"fr-622","topic":"fr-order","lesson":"fr-l62","type":"wordorder","q":"Build the sentence: 'I don't understand.'","words":["comprends","ne","Je","pas"],"answer":["Je","ne","comprends","pas"],"exp":"Je ne comprends pas. Negation: ne before the verb, pas after the verb. Je NE comprends PAS. The verb goes between ne and pas."},
  {"id":"fr-623","topic":"fr-order","lesson":"fr-l62","type":"wordorder","q":"Build the sentence: 'She is very beautiful.'","words":["très","est","Elle","belle"],"answer":["Elle","est","très","belle"],"exp":"Elle est très belle. Subject + être + adverb (très) + adjective (belle). 'Très' intensifies the adjective and always comes directly before it. Adjective agrees with subject: belle (feminine) for Elle."},
  {"id":"fr-624","topic":"fr-order","lesson":"fr-l62","type":"wordorder","q":"Build the sentence: 'The house is big.'","words":["grande","est","maison","La"],"answer":["La","maison","est","grande"],"exp":"La maison est grande. Article (La) + Noun (maison) + être (est) + Adjective (grande). Predicative adjectives come after être in French — same position as English. Feminine: grand → grande."},
  {"id":"fr-625","topic":"fr-order","lesson":"fr-l62","type":"wordorder","q":"Build the sentence: 'I am going to the market.'","words":["vais","marché","Je","au"],"answer":["Je","vais","au","marché"],"exp":"Je vais au marché. 'Au' = à + le (contracted). You cannot say 'à le marché' — it must contract: à + le → au. Similarly: à + les → aux. Used before masculine nouns."},
  {"id":"fr-626","topic":"fr-order","lesson":"fr-l62","type":"wordorder","q":"Build the sentence: 'They have two children.'","words":["deux","ont","Ils","enfants"],"answer":["Ils","ont","deux","enfants"],"exp":"Ils ont deux enfants. Subject (Ils) + avoir (ont) + numeral (deux) + noun (enfants). Numbers come before the noun they modify, just like in English."},
  {"id":"fr-627","topic":"fr-order","lesson":"fr-l62","type":"wordorder","q":"Build the sentence: 'The cat is on the sofa.'","words":["sur","Le","est","chat","le","canapé"],"answer":["Le","chat","est","sur","le","canapé"],"exp":"Le chat est sur le canapé. Prepositions of place: sur (on), sous (under), devant (in front of), derrière (behind), dans (in), entre (between). The article is repeated before 'canapé'."},
  {"id":"fr-628","topic":"fr-order","lesson":"fr-l62","type":"wordorder","q":"Build the sentence: 'I would like a coffee please.'","words":["café","voudrais","Je","un","plaît","vous","s'il"],"answer":["Je","voudrais","un","café","s'il","vous","plaît"],"exp":"Je voudrais un café s'il vous plaît. 'Voudrais' (conditional) is the polite form for ordering. 'S'il vous plaît' (formal please) always comes at the end of a request. S'il te plaît is the informal version."},
  {"id":"fr-629","topic":"fr-order","lesson":"fr-l62","type":"wordorder","q":"Build the sentence: 'She doesn't like cheese.'","words":["fromage","n'aime","le","Elle","pas"],"answer":["Elle","n'aime","pas","le","fromage"],"exp":"Elle n'aime pas le fromage. Negation with elision: ne + aime → n'aime (because 'aimer' starts with a vowel). ne/n' comes before the verb, pas after. Use 'le' (definite article) with general likes/dislikes in French."},
  {"id":"fr-630","topic":"fr-order","lesson":"fr-l62","type":"wordorder","q":"Build the sentence: 'It is cold today.'","words":["froid","fait","aujourd'hui","Il"],"answer":["Il","fait","froid","aujourd'hui"],"exp":"Il fait froid aujourd'hui. Impersonal weather: Il + faire + adjective. Time expressions (aujourd'hui, demain, hier) typically go at the end of a French sentence."},
  {"id":"fr-631","topic":"fr-order","lesson":"fr-l62","type":"wordorder","q":"Build the sentence: 'You speak very good French.'","words":["bien","français","Tu","parles","très"],"answer":["Tu","parles","très","bien","français"],"exp":"Tu parles très bien français. Adverbs of manner (bien, mal, vite) come immediately after the verb. 'Très bien' = very well. Note: no article before 'français' after 'parler'."},
  {"id":"fr-632","topic":"fr-order","lesson":"fr-l62","type":"wordorder","q":"Build the sentence: 'We are in the classroom.'","words":["la","dans","Nous","classe","sommes"],"answer":["Nous","sommes","dans","la","classe"],"exp":"Nous sommes dans la classe. 'Dans' = in (enclosed space). Compare: à l'école (at school in general) vs dans la classe (inside the classroom). Location prepositions: dans (in/inside), à (at/in), sur (on), en (in, with countries/states)."},
  {"id":"fr-633","topic":"fr-order","lesson":"fr-l62","type":"wordorder","q":"Build the sentence: 'I have a headache.'","words":["tête","mal","à","J'ai","la"],"answer":["J'ai","mal","à","la","tête"],"exp":"J'ai mal à la tête. Pattern: avoir + mal + à + article + body part. J'ai mal au ventre (stomach) · à la gorge (throat) · aux yeux (eyes). This uses AVOIR, not être."},

  // fr-l63 — A2 Word order: questions, pronoun placement, passé composé
  {"id":"fr-634","topic":"fr-order","lesson":"fr-l63","type":"wordorder","q":"Build the passé composé sentence: 'I ate a pizza yesterday.'","words":["hier","mangé","une","J'ai","pizza"],"answer":["J'ai","mangé","une","pizza","hier"],"exp":"J'ai mangé une pizza hier. Passé composé: auxiliary (j'ai) + past participle (mangé) + object + time expression. Time expressions (hier, ce matin, la semaine dernière) go at the end."},
  {"id":"fr-635","topic":"fr-order","lesson":"fr-l63","type":"wordorder","q":"Build the passé composé sentence: 'She went to the market.'","words":["allée","marché","est","au","Elle"],"answer":["Elle","est","allée","au","marché"],"exp":"Elle est allée au marché. Aller uses ÊTRE as auxiliary. Past participle agrees with subject: elle → allée (feminine +e). Être verbs include: aller, venir, partir, arriver, rester, tomber, naître, mourir."},
  {"id":"fr-636","topic":"fr-order","lesson":"fr-l63","type":"wordorder","q":"Build the question: 'Do you speak French?' using est-ce que.","words":["tu","Est-ce","français","parles","que"],"answer":["Est-ce","que","tu","parles","français"],"exp":"Est-ce que tu parles français ? The est-ce que structure: Est-ce que + subject + verb + rest. No word order change needed after 'est-ce que' — just add it before a normal statement."},
  {"id":"fr-637","topic":"fr-order","lesson":"fr-l63","type":"wordorder","q":"Build the sentence with a direct object pronoun: 'I see him.'","words":["vois","le","Je"],"answer":["Je","le","vois"],"exp":"Je le vois. Direct object pronouns (me, te, le, la, nous, vous, les) go BEFORE the verb in French — unlike English where they go after. Je le vois (NOT 'je vois le')."},
  {"id":"fr-638","topic":"fr-order","lesson":"fr-l63","type":"wordorder","q":"Build the sentence: 'She gave him a book.'","words":["lui","un","Elle","a","livre","donné"],"answer":["Elle","lui","a","donné","un","livre"],"exp":"Elle lui a donné un livre. 'Lui' (indirect object pronoun = to him/her) goes before the auxiliary 'a' in passé composé. Pronoun order before verb: me/te/se/nous/vous → le/la/les → lui/leur → y → en."},
  {"id":"fr-639","topic":"fr-order","lesson":"fr-l63","type":"wordorder","q":"Build the negated passé composé: 'I didn't see him.'","words":["pas","Je","l'ai","ne","vu"],"answer":["Je","ne","l'ai","pas","vu"],"exp":"Je ne l'ai pas vu. In passé composé, negation wraps around the auxiliary: NE + l'ai + PAS + past participle. The pronoun 'l'' stays before the auxiliary. Je NE l'ai PAS vu."},
  {"id":"fr-640","topic":"fr-order","lesson":"fr-l63","type":"wordorder","q":"Build the near future sentence: 'He is going to leave tomorrow morning.'","words":["matin","va","partir","Il","demain"],"answer":["Il","va","partir","demain","matin"],"exp":"Il va partir demain matin. Futur proche: subject + aller (conjugated) + infinitive. 'Demain matin' (tomorrow morning) goes at the end. Aller + infinitive is very common in spoken French for near-future events."},
  {"id":"fr-641","topic":"fr-order","lesson":"fr-l63","type":"wordorder","q":"Build the sentence with adjective placement: 'It's a beautiful red dress.'","words":["belle","rouge","C'est","une","robe"],"answer":["C'est","une","belle","robe","rouge"],"exp":"C'est une belle robe rouge. 'Belle' (beautiful) is a BAGS adjective (Beauty, Age, Goodness, Size) — it goes BEFORE the noun. 'Rouge' (red) is a colour — it goes AFTER the noun. Belle + robe (pre-noun) + rouge (post-noun)."},
  {"id":"fr-642","topic":"fr-order","lesson":"fr-l63","type":"wordorder","q":"Build the question by inversion: 'Can you speak more slowly?'","words":["parler","lentement","Pouvez-vous","plus"],"answer":["Pouvez-vous","parler","plus","lentement"],"exp":"Pouvez-vous parler plus lentement ? Inversion question: verb-subject hyphenated (Pouvez-vous) + infinitive. 'Plus lentement' = more slowly. Inversion is the formal question structure for modals like pouvoir."},
  {"id":"fr-643","topic":"fr-order","lesson":"fr-l63","type":"wordorder","q":"Build the sentence: 'I am looking for a cheap flat.'","words":["cher","un","cherche","appartement","Je","pas"],"answer":["Je","cherche","un","appartement","pas","cher"],"exp":"Je cherche un appartement pas cher. 'Pas cher' (not expensive) acts as a compound adjective after the noun. Note: 'pas' without 'ne' is informal/spoken. Formal: 'un appartement qui n'est pas cher'. Colour/size adjectives follow the noun."},
  {"id":"fr-644","topic":"fr-order","lesson":"fr-l63","type":"wordorder","q":"Build the sentence: 'We have been visiting the Louvre.'","words":["Louvre","le","visité","avons","Nous"],"answer":["Nous","avons","visité","le","Louvre"],"exp":"Nous avons visité le Louvre. Passé composé with avoir: auxiliary (avons) + past participle (visité) + direct object (le Louvre). 'Visiter' is a regular -ER verb: passé composé = visité."},
  {"id":"fr-645","topic":"fr-order","lesson":"fr-l63","type":"wordorder","q":"Build the sentence: 'You should eat more vegetables.'","words":["légumes","manger","Tu","de","devrais","plus"],"answer":["Tu","devrais","manger","plus","de","légumes"],"exp":"Tu devrais manger plus de légumes. 'Devrais' = conditional of devoir (should). Modal + infinitive: devrais + manger. 'Plus de' = more (of). After comparative expressions, use 'de' + noun: plus de légumes (not 'plus des')."},

  // fr-l64 — B1 Word order: complex structures, relative clauses, subjunctive
  {"id":"fr-646","topic":"fr-order","lesson":"fr-l64","type":"wordorder","q":"Build the relative clause sentence: 'It's the house that I dream of.'","words":["je","dont","C'est","rêve","la","maison"],"answer":["C'est","la","maison","dont","je","rêve"],"exp":"C'est la maison dont je rêve. 'Dont' = relative pronoun replacing 'de + which/whom'. 'Rêver de' = to dream of → la maison de laquelle → la maison dont. Dont is used when the verb takes 'de'."},
  {"id":"fr-647","topic":"fr-order","lesson":"fr-l64","type":"wordorder","q":"Build the subjunctive sentence: 'It is necessary that you be on time.'","words":["à","tu","que","l'heure","faut","sois","Il"],"answer":["Il","faut","que","tu","sois","à","l'heure"],"exp":"Il faut que tu sois à l'heure. Subjunctive: il faut que + subject + subjunctive verb. 'Sois' = subjunctive of être. Triggers: il faut que, vouloir que, douter que, bien que, pour que."},
  {"id":"fr-648","topic":"fr-order","lesson":"fr-l64","type":"wordorder","q":"Build the conditional sentence: 'We could have finished earlier.'","words":["pu","tôt","finir","Nous","plus","aurions"],"answer":["Nous","aurions","pu","finir","plus","tôt"],"exp":"Nous aurions pu finir plus tôt. Conditionnel passé: subject + auxiliary in conditional (aurions) + past participle (pu) + infinitive (finir). 'Plus tôt' = earlier. Conditionnel passé expresses what would have happened."},
  {"id":"fr-649","topic":"fr-order","lesson":"fr-l64","type":"wordorder","q":"Build the sentence with 'y': 'I go there every day.'","words":["jours","J'y","tous","les","vais"],"answer":["J'y","vais","tous","les","jours"],"exp":"J'y vais tous les jours. 'Y' replaces 'à + place': j'y vais = I go there. 'Y' goes before the verb. 'Tous les jours' = every day. Pronoun order: y goes before the verb, after other object pronouns."},
  {"id":"fr-650","topic":"fr-order","lesson":"fr-l64","type":"wordorder","q":"Build the sentence with 'en': 'I don't have any left.'","words":["plus","n'en","Je","ai"],"answer":["Je","n'en","ai","plus"],"exp":"Je n'en ai plus. 'En' replaces 'de + noun' and goes before the verb. 'Ne...plus' = no longer/no more. The ne wraps around the pronoun+verb: je N'EN ai PLUS. Order: je + n'en (ne + en) + ai (avoir) + plus."},
  {"id":"fr-651","topic":"fr-order","lesson":"fr-l64","type":"wordorder","q":"Build the sentence: 'I don't entirely agree with you.'","words":["vous","d'accord","suis","à","Je","tout","pas","ne","fait","avec"],"answer":["Je","ne","suis","pas","tout","à","fait","d'accord","avec","vous"],"exp":"Je ne suis pas tout à fait d'accord avec vous. 'Pas tout à fait' = not entirely. Negation: ne...pas wraps the verb (ne suis pas). 'Tout à fait' = entirely/completely. 'Avec vous' = with you (formal)."},
  {"id":"fr-652","topic":"fr-order","lesson":"fr-l64","type":"wordorder","q":"Build the formal sentence: 'I am writing to you following our meeting.'","words":["réunion","écris","Je","notre","suite","à","vous"],"answer":["Je","vous","écris","suite","à","notre","réunion"],"exp":"Je vous écris suite à notre réunion. 'Suite à' = following/further to (formal connective). 'Vous écris' — indirect object pronoun 'vous' goes before the verb. Used in formal correspondence to establish the reason for contact."},

  // ── fr-listen (fr-653 to fr-672) ──────────────────────────────────────────
  // A1 — greetings, basic phrases (fr-653 to fr-662)
  {"id":"fr-653","topic":"fr-listen","lesson":"fr-l65","type":"listen","audio":"Bonjour, comment allez-vous ?","q":"What did you hear?","opts":["Bonjour, comment allez-vous ?","Bonsoir, comment vas-tu ?","Bon matin, comment vous appelez-vous ?","Bonjour, comment tu t'appelles ?"],"ans":0,"exp":"'Bonjour, comment allez-vous ?' = Hello, how are you? (formal). 'Comment allez-vous' uses the formal vous form; 'comment vas-tu' is informal."},
  {"id":"fr-654","topic":"fr-listen","lesson":"fr-l65","type":"listen","audio":"Merci beaucoup, au revoir !","q":"What did you hear?","opts":["Merci bien, à bientôt !","Merci beaucoup, au revoir !","Merci mille fois, bonsoir !","De rien, à demain !"],"ans":1,"exp":"'Merci beaucoup, au revoir !' = Thank you very much, goodbye! 'Beaucoup' (a lot) vs 'bien' (well/kindly) — both follow merci but have slightly different registers."},
  {"id":"fr-655","topic":"fr-listen","lesson":"fr-l65","type":"listen","audio":"Je m'appelle Sophie et j'ai vingt ans.","q":"What did you hear?","opts":["Je m'appelle Sophie et j'ai trente ans.","Je m'appelle Sylvie et j'ai vingt ans.","Je m'appelle Sophie et j'ai vingt ans.","Je m'appelle Sophie et j'ai douze ans."],"ans":2,"exp":"'Je m'appelle Sophie et j'ai vingt ans.' = My name is Sophie and I am twenty years old. Note 'vingt' (20) vs 'trente' (30) and 'douze' (12)."},
  {"id":"fr-656","topic":"fr-listen","lesson":"fr-l65","type":"listen","audio":"Où est la gare, s'il vous plaît ?","q":"What did you hear?","opts":["Où est le café, s'il vous plaît ?","Où est la poste, s'il vous plaît ?","Où est la gare, s'il te plaît ?","Où est la gare, s'il vous plaît ?"],"ans":3,"exp":"'Où est la gare, s'il vous plaît ?' = Where is the train station, please? 'La gare' = the station; 's'il vous plaît' is the formal please."},
  {"id":"fr-657","topic":"fr-listen","lesson":"fr-l65","type":"listen","audio":"Il fait beau aujourd'hui.","q":"What did you hear?","opts":["Il fait chaud aujourd'hui.","Il fait beau demain.","Il fait beau aujourd'hui.","Il fait froid ce soir."],"ans":2,"exp":"'Il fait beau aujourd'hui.' = It is nice (weather) today. 'Beau' = nice/fine; 'chaud' = hot; 'froid' = cold. 'Aujourd'hui' = today; 'demain' = tomorrow."},
  {"id":"fr-658","topic":"fr-listen","lesson":"fr-l65","type":"listen","audio":"Je voudrais un café et un croissant, s'il vous plaît.","q":"What did you hear?","opts":["Je voudrais un thé et un croissant, s'il vous plaît.","Je voudrais un café et un croissant, s'il vous plaît.","Je voudrais un café et un pain au chocolat, s'il vous plaît.","Je prends un café et un croissant, s'il vous plaît."],"ans":1,"exp":"'Je voudrais un café et un croissant, s'il vous plaît.' = I would like a coffee and a croissant, please. 'Je voudrais' (conditional, polite) vs 'je prends' (I'll take — also common in cafés)."},
  {"id":"fr-659","topic":"fr-listen","lesson":"fr-l65","type":"listen","audio":"Tournez à gauche, puis allez tout droit.","q":"What did you hear?","opts":["Tournez à droite, puis allez tout droit.","Tournez à gauche, puis prenez la première rue.","Tournez à gauche, puis allez tout droit.","Continuez tout droit, puis tournez à gauche."],"ans":2,"exp":"'Tournez à gauche, puis allez tout droit.' = Turn left, then go straight ahead. 'À gauche' = to the left; 'à droite' = to the right; 'tout droit' = straight ahead."},
  {"id":"fr-660","topic":"fr-listen","lesson":"fr-l65","type":"listen","audio":"C'est combien, s'il vous plaît ?","q":"What did you hear?","opts":["C'est comment, s'il vous plaît ?","Ça coûte combien, s'il vous plaît ?","C'est combien pour deux, s'il vous plaît ?","C'est combien, s'il vous plaît ?"],"ans":3,"exp":"'C'est combien ?' = How much is it? A key phrase for shopping. 'Combien' = how much/many. 'Ça coûte combien ?' is also correct and very common."},
  {"id":"fr-661","topic":"fr-listen","lesson":"fr-l65","type":"listen","audio":"Le musée est fermé le lundi.","q":"What did you hear?","opts":["Le musée est ouvert le lundi.","Le musée est fermé le mardi.","Le musée est fermé le lundi.","Le marché est fermé le lundi."],"ans":2,"exp":"'Le musée est fermé le lundi.' = The museum is closed on Mondays. 'Fermé' = closed; 'ouvert' = open. 'Le lundi' (with article) = on Mondays (habitual)."},
  {"id":"fr-662","topic":"fr-listen","lesson":"fr-l65","type":"listen","audio":"Je dois prendre le bus numéro douze.","q":"What did you hear?","opts":["Je dois prendre le bus numéro deux.","Je dois prendre le train numéro douze.","Je dois prendre le bus numéro vingt.","Je dois prendre le bus numéro douze."],"ans":3,"exp":"'Je dois prendre le bus numéro douze.' = I must take bus number twelve. 'Devoir' (must/have to) + infinitive. 'Douze' = 12; 'deux' = 2; 'vingt' = 20."},

  // A2 — conversational phrases and sentences (fr-663 to fr-668)
  {"id":"fr-663","topic":"fr-listen","lesson":"fr-l66","type":"listen","audio":"Hier soir, je suis allé au cinéma avec mes amis.","q":"What did you hear?","opts":["Hier matin, je suis allé au cinéma avec mes amis.","Hier soir, je suis allé au théâtre avec mes amis.","Hier soir, je suis allée au cinéma avec ma famille.","Hier soir, je suis allé au cinéma avec mes amis."],"ans":3,"exp":"'Hier soir, je suis allé au cinéma avec mes amis.' = Yesterday evening, I went to the cinema with my friends. Passé composé with être (allé). 'Hier soir' = yesterday evening; 'hier matin' = yesterday morning."},
  {"id":"fr-664","topic":"fr-listen","lesson":"fr-l66","type":"listen","audio":"Est-ce que tu peux m'aider, s'il te plaît ?","q":"What did you hear?","opts":["Est-ce que vous pouvez m'aider, s'il vous plaît ?","Est-ce que tu veux m'aider, s'il te plaît ?","Est-ce que tu peux m'aider, s'il te plaît ?","Pourrais-tu m'aider, s'il te plaît ?"],"ans":2,"exp":"'Est-ce que tu peux m'aider, s'il te plaît ?' = Can you help me, please? (informal). 'Tu peux' (you can, informal) vs 'vous pouvez' (formal). 'Veux' = want vs 'peux' = can."},
  {"id":"fr-665","topic":"fr-listen","lesson":"fr-l66","type":"listen","audio":"Je prends le train de huit heures trente.","q":"What did you hear?","opts":["Je prends le train de sept heures trente.","Je prends le bus de huit heures trente.","Je prends le train de huit heures et demie.","Je prends le train de huit heures trente."],"ans":3,"exp":"'Je prends le train de huit heures trente.' = I'm taking the eight thirty train. '8h30' can be said as 'huit heures trente' or 'huit heures et demie' — both are correct. 'Trente' = thirty."},
  {"id":"fr-666","topic":"fr-listen","lesson":"fr-l66","type":"listen","audio":"Nous avons réservé une table pour deux personnes.","q":"What did you hear?","opts":["Nous avons réservé une chambre pour deux personnes.","Nous avons réservé une table pour quatre personnes.","Nous voudrions réserver une table pour deux personnes.","Nous avons réservé une table pour deux personnes."],"ans":3,"exp":"'Nous avons réservé une table pour deux personnes.' = We have reserved a table for two people. 'Réserver' = to reserve/book. 'Une table' vs 'une chambre' (a room). 'Deux' = two; 'quatre' = four."},
  {"id":"fr-667","topic":"fr-listen","lesson":"fr-l66","type":"listen","audio":"Qu'est-ce que vous recommandez comme plat principal ?","q":"What did you hear?","opts":["Qu'est-ce que vous recommandez comme dessert ?","Qu'est-ce que vous conseillez comme plat principal ?","Qu'est-ce que vous recommandez comme entrée ?","Qu'est-ce que vous recommandez comme plat principal ?"],"ans":3,"exp":"'Qu'est-ce que vous recommandez comme plat principal ?' = What do you recommend as a main course? 'Recommander' and 'conseiller' are both used for 'to recommend'. 'Plat principal' = main course; 'entrée' = starter; 'dessert' = dessert."},
  {"id":"fr-668","topic":"fr-listen","lesson":"fr-l66","type":"listen","audio":"Il pleut des cordes depuis ce matin.","q":"What did you hear?","opts":["Il pleut depuis ce matin.","Il pleut des cordes depuis hier soir.","Il pleut à verse depuis ce matin.","Il pleut des cordes depuis ce matin."],"ans":3,"exp":"'Il pleut des cordes depuis ce matin.' = It has been pouring with rain since this morning. 'Pleuvoir des cordes' = to rain cats and dogs (lit. to rain ropes). 'Depuis' = since/for. 'À verse' = in torrents (synonym)."},

  // B1 — complex sentences (fr-669 to fr-672)
  {"id":"fr-669","topic":"fr-listen","lesson":"fr-l67","type":"listen","audio":"Je ne suis pas sûr que ce soit la bonne décision.","q":"What did you hear?","opts":["Je ne suis pas sûr que c'est la bonne décision.","Je ne suis pas certain que ce soit la bonne solution.","Je ne suis pas sûr que ce soit la bonne décision.","Je ne suis pas sûr que ce soit la bonne direction."],"ans":2,"exp":"'Je ne suis pas sûr que ce soit la bonne décision.' = I'm not sure that it is the right decision. 'Que ce soit' uses the subjunctive (être → soit) because of the doubt expressed by 'ne pas être sûr'. 'Décision' vs 'solution' vs 'direction'."},
  {"id":"fr-670","topic":"fr-listen","lesson":"fr-l67","type":"listen","audio":"Si j'avais su, je n'aurais pas accepté ce poste.","q":"What did you hear?","opts":["Si j'avais su, je n'aurais pas refusé ce poste.","Si j'avais pu, je n'aurais pas accepté ce poste.","Si j'avais su, je n'aurais pas accepté cet emploi.","Si j'avais su, je n'aurais pas accepté ce poste."],"ans":3,"exp":"'Si j'avais su, je n'aurais pas accepté ce poste.' = If I had known, I wouldn't have accepted this job. Past conditional: si + plus-que-parfait, then conditionnel passé. 'Poste' = post/position; 'emploi' = employment/job (near synonym)."},
  {"id":"fr-671","topic":"fr-listen","lesson":"fr-l67","type":"listen","audio":"Il faut que tu finisses tes devoirs avant de sortir.","q":"What did you hear?","opts":["Il faut que tu finisses tes devoirs avant de dîner.","Il faut que vous finissiez vos devoirs avant de sortir.","Il faut que tu fasses tes devoirs avant de sortir.","Il faut que tu finisses tes devoirs avant de sortir."],"ans":3,"exp":"'Il faut que tu finisses tes devoirs avant de sortir.' = You must finish your homework before going out. 'Il faut que' + subjunctive (finir → finisses). 'Avant de' + infinitive. Compare 'finisses' (finish) vs 'fasses' (do/make)."},
  {"id":"fr-672","topic":"fr-listen","lesson":"fr-l67","type":"listen","audio":"C'est en forgeant qu'on devient forgeron.","q":"What did you hear?","opts":["C'est en travaillant qu'on devient fort.","C'est en forgeant qu'on devient forgeron.","C'est en pratiquant qu'on devient expert.","C'est en lisant qu'on devient lettré."],"ans":1,"exp":"'C'est en forgeant qu'on devient forgeron.' = Practice makes perfect (lit. It is by forging that one becomes a blacksmith). Uses 'c'est en + gérondif + que'. A classic French proverb about learning through doing."}
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
      },
      {
        "id": "fr-l45",
        "title": "Les chiffres (1–100)",
        "icon": "🔢",
        "cards": [
          {
            "type": "info",
            "title": "Numbers 0–19",
            "body": "<p>Each number 0–19 has a unique name to memorise:</p><table><tr><th>0–9</th><th>10–19</th></tr><tr><td>0 zéro · 1 un · 2 deux · 3 trois · 4 quatre · 5 cinq · 6 six · 7 sept · 8 huit · 9 neuf</td><td>10 dix · 11 onze · 12 douze · 13 treize · 14 quatorze · 15 quinze · 16 seize · 17 dix-sept · 18 dix-huit · 19 dix-neuf</td></tr></table><p>Note: 17–19 combine dix + sept/huit/neuf.</p>"
          },
          {
            "type": "info",
            "title": "Tens: 20–60",
            "body": "<p>The tens 20–60 are regular and must be learnt:</p><ul><li>20 = vingt · 30 = trente · 40 = quarante · 50 = cinquante · 60 = soixante</li></ul><p>Compound numbers use a hyphen: 22 = vingt-deux, 35 = trente-cinq.<br><strong>Exception:</strong> numbers ending in 1 use 'et': 21 = vingt <em>et</em> un, 31 = trente <em>et</em> un, 51 = cinquante <em>et</em> un.</p>"
          },
          {
            "type": "info",
            "title": "Special cases: 70, 80, 90",
            "body": "<p>French has no unique words for 70, 80, or 90 — they use arithmetic!</p><ul><li><strong>70</strong> = soixante-dix (60+10) · 71 = soixante-et-onze · 72 = soixante-douze…</li><li><strong>80</strong> = quatre-vingts (4×20) — note the 's' when it stands alone</li><li><strong>81</strong> = quatre-vingt-un — the 's' drops before any unit digit</li><li><strong>90</strong> = quatre-vingt-dix (4×20+10) · 99 = quatre-vingt-dix-neuf</li></ul><p><strong>Memory tip:</strong> Belgium/Switzerland use septante, huitante, nonante — simpler but not standard French!</p>"
          },
          {
            "type": "info",
            "title": "Ordinal numbers",
            "body": "<p>Ordinals indicate position (1st, 2nd, 3rd…):</p><ul><li>1st = <strong>premier</strong> (m.) / <strong>première</strong> (f.) — irregular!</li><li>2nd = deuxième · 3rd = troisième · 4th = quatrième · 5th = cinquième</li></ul><p><strong>Rule:</strong> add <strong>-ième</strong> to the cardinal (drop a final 'e' first: quatre → quatrième).<br>Ordinals are used for floors (au deuxième étage), rankings, and dates (le premier janvier).</p>"
          }
        ],
        "check": [
          {
            "q": "How do you say 75 in French?",
            "opts": ["soixante-cinq", "soixante-quinze", "quatre-vingt-cinq", "soixante-dix-cinq"],
            "ans": 1,
            "exp": "75 = soixante-quinze (60+15). French builds on 60 for 61–79. Quinze = 15, so 75 = soixante-quinze."
          },
          {
            "q": "What is 'quatre-vingt-dix' in digits?",
            "opts": ["80", "88", "90", "94"],
            "ans": 2,
            "exp": "quatre-vingt-dix = 4×20+10 = 90. French builds the 90s from 80+10 through 80+19."
          },
          {
            "q": "Which is correct for 81 in French?",
            "opts": ["quatre-vingts-un", "quatre-vingt-un", "quatre-vingt et un", "huitante-un"],
            "ans": 1,
            "exp": "81 = quatre-vingt-un. The 's' of quatre-vingts drops when any digit follows. Only 80 alone keeps the 's'."
          },
          {
            "q": "What is the feminine form of the ordinal 'first' in French?",
            "opts": ["première", "premier", "premièrement", "unième"],
            "ans": 0,
            "exp": "'Première' is the feminine form of 'premier' (first). All other ordinals (deuxième, troisième…) have the same form for both genders."
          },
          {
            "q": "How do you say 'on the third floor' in French?",
            "opts": ["au trois étage", "au troisième étage", "dans le troisième étage", "le troisième étage"],
            "ans": 1,
            "exp": "'Au troisième étage' = on the third floor. Use 'au' (à + le) with étage, and the ordinal 'troisième' for 3rd."
          }
        ]
      },
      {
        "id": "fr-l46",
        "title": "La famille",
        "icon": "👨‍👩‍👧‍👦",
        "cards": [
          {
            "type": "info",
            "title": "Core family vocabulary",
            "body": "<p>Essential French family words:</p><table><tr><th>French</th><th>English</th><th>French</th><th>English</th></tr><tr><td>le père</td><td>father</td><td>la mère</td><td>mother</td></tr><tr><td>le frère</td><td>brother</td><td>la sœur</td><td>sister</td></tr><tr><td>le fils</td><td>son</td><td>la fille</td><td>daughter</td></tr><tr><td>le mari</td><td>husband</td><td>la femme</td><td>wife</td></tr><tr><td>l'enfant</td><td>child</td><td>le bébé</td><td>baby</td></tr></table><p><strong>Note:</strong> 'La fille' = daughter or girl; 'la femme' = wife or woman — context is key! The 'l' in 'le fils' is silent; it is pronounced 'fiss' (the s IS voiced).</p>"
          },
          {
            "type": "info",
            "title": "Extended family",
            "body": "<p>More family vocabulary:</p><table><tr><th>French</th><th>English</th></tr><tr><td>le grand-père</td><td>grandfather</td></tr><tr><td>la grand-mère</td><td>grandmother</td></tr><tr><td>l'oncle</td><td>uncle</td></tr><tr><td>la tante</td><td>aunt</td></tr><tr><td>le cousin</td><td>male cousin</td></tr><tr><td>la cousine</td><td>female cousin</td></tr></table><p><strong>Tip:</strong> Les grands-parents = grandparents. Les parents = parents (or relatives in a broader sense).</p>"
          },
          {
            "type": "info",
            "title": "Possessives: mon/ma/mes",
            "body": "<p>French possessives agree with the <strong>noun</strong>, not the owner:</p><table><tr><th></th><th>Masc. sing.</th><th>Fem. sing.</th><th>Plural</th></tr><tr><td><strong>my</strong></td><td>mon</td><td>ma</td><td>mes</td></tr><tr><td><strong>your</strong> (tu)</td><td>ton</td><td>ta</td><td>tes</td></tr><tr><td><strong>his/her</strong></td><td>son</td><td>sa</td><td>ses</td></tr></table><p><strong>Special rule:</strong> Before any vowel-starting noun, use the masculine form: <em>mon amie</em> (not ma amie) to avoid a vowel clash.<br>Examples: mon père, ma mère, mes parents, son frère, sa sœur.</p>"
          }
        ],
        "check": [
          {
            "q": "How do you say 'my aunt' in French?",
            "opts": ["mon tante", "ma tante", "mes tantes", "sa tante"],
            "ans": 1,
            "exp": "'Ma tante' = my aunt. 'Tante' is feminine singular, so use 'ma'. Remember: possessive agrees with the noun, not the owner."
          },
          {
            "q": "What does 'son fils' mean?",
            "opts": ["her sister", "his/her son", "his father", "their child"],
            "ans": 1,
            "exp": "'Son fils' = his son OR her son. 'Fils' is masculine, so 'son' is used regardless of whether the owner is male or female."
          },
          {
            "q": "How do you say 'my uncle' in French? (Note: oncle starts with a vowel)",
            "opts": ["ma oncle", "mes oncle", "mon oncle", "ton oncle"],
            "ans": 2,
            "exp": "'Mon oncle' = my uncle. Before any vowel-starting noun, use 'mon/ton/son' — even for feminine nouns — to avoid a vowel clash."
          },
          {
            "q": "What is the French word for 'grandmother'?",
            "opts": ["la grand-sœur", "la grand-mère", "la grande-mère", "la mère-grand"],
            "ans": 1,
            "exp": "'La grand-mère' = grandmother. Note the hyphen. Grand-père = grandfather. Together: les grands-parents = grandparents."
          },
          {
            "q": "Which sentence means 'She has two brothers'?",
            "opts": ["Elle a deux sœurs", "Il a deux frères", "Elle a deux frères", "Mes frères sont deux"],
            "ans": 2,
            "exp": "'Elle a deux frères' = She has two brothers. 'Elle' = she, 'a' = has (avoir), 'deux' = two, 'frères' = brothers (plural)."
          }
        ]
      },
      {
        "id": "fr-l47",
        "title": "La nourriture et les boissons",
        "icon": "🍽️",
        "cards": [
          {
            "type": "info",
            "title": "Food vocabulary",
            "body": "<p>Essential French food words with gender:</p><table><tr><th>French</th><th>English</th><th>Gender</th></tr><tr><td>le pain</td><td>bread</td><td>masc.</td></tr><tr><td>le fromage</td><td>cheese</td><td>masc.</td></tr><tr><td>la viande</td><td>meat</td><td>fem.</td></tr><tr><td>le poisson</td><td>fish</td><td>masc.</td></tr><tr><td>les légumes</td><td>vegetables</td><td>masc. pl.</td></tr><tr><td>les fruits</td><td>fruit</td><td>masc. pl.</td></tr><tr><td>le poulet</td><td>chicken</td><td>masc.</td></tr><tr><td>l'œuf</td><td>egg</td><td>masc.</td></tr></table>"
          },
          {
            "type": "info",
            "title": "Drinks vocabulary",
            "body": "<p>Essential French drink words:</p><table><tr><th>French</th><th>English</th></tr><tr><td>le café</td><td>coffee</td></tr><tr><td>le thé</td><td>tea</td></tr><tr><td>l'eau (f)</td><td>water</td></tr><tr><td>le jus</td><td>juice</td></tr><tr><td>le lait</td><td>milk</td></tr><tr><td>le vin</td><td>wine</td></tr><tr><td>la bière</td><td>beer</td></tr></table><p>Note: l'eau is feminine — <em>de l'eau</em>. All others are masculine — <em>du café, du lait, du vin.</em></p>"
          },
          {
            "type": "info",
            "title": "Partitive articles: du / de la / de l' / des",
            "body": "<p>To say 'some' (unspecified quantity), use partitive articles:</p><table><tr><th>Type</th><th>Article</th><th>Example</th></tr><tr><td>Masc. singular</td><td>du</td><td>du pain (some bread)</td></tr><tr><td>Fem. singular</td><td>de la</td><td>de la viande (some meat)</td></tr><tr><td>Before vowel/h</td><td>de l'</td><td>de l'eau (some water)</td></tr><tr><td>Plural</td><td>des</td><td>des légumes (some vegetables)</td></tr></table><p><strong>After negation</strong>, all partitives become <em>de</em> (or <em>d'</em>): Je n'ai pas <em>de</em> pain. Je ne veux pas <em>d'</em>eau.</p>"
          },
          {
            "type": "info",
            "title": "Expressing preferences and ordering",
            "body": "<p>Key difference between expressing preference and ordering:</p><ul><li><strong>J'aime le/la/les…</strong> = I like… (general preference — use definite article)</li><li><strong>Je n'aime pas le/la/les…</strong> = I don't like… (still definite article for general preferences)</li><li><strong>Je voudrais du/de la/de l'/des…</strong> = I would like some… (ordering — use partitive)</li><li><strong>Il y a du/de la/de l'/des…</strong> = There is/are some… (existence — use partitive)</li></ul><p>'J'aime le poisson' (I like fish in general) vs 'Je voudrais du poisson' (I'd like some fish now).</p>"
          }
        ],
        "check": [
          {
            "q": "Which partitive article goes with 'eau' (water)?",
            "opts": ["du", "de la", "de l'", "des"],
            "ans": 2,
            "exp": "'De l'eau' — eau is feminine and starts with a vowel, so 'de la' contracts to 'de l''. Always elide before a vowel sound."
          },
          {
            "q": "How do you say 'I like cheese' (general preference)?",
            "opts": ["Je voudrais du fromage", "J'aime du fromage", "J'aime le fromage", "Il y a le fromage"],
            "ans": 2,
            "exp": "'J'aime le fromage' — with verbs of preference (aimer, adorer), use the definite article for general statements, not the partitive."
          },
          {
            "q": "How do you say 'there are some vegetables' in French?",
            "opts": ["Il y a le légumes", "Il y a des légumes", "Il y a du légumes", "Il y a de la légumes"],
            "ans": 1,
            "exp": "'Il y a des légumes' — légumes is plural, so use 'des'. 'Il y a' = there is/are."
          },
          {
            "q": "What happens to partitive articles after negation?",
            "opts": ["They stay the same", "They become de/d'", "They become les", "They disappear"],
            "ans": 1,
            "exp": "After negation, all partitives (du, de la, de l', des) become 'de' or 'd'': Je n'ai pas de pain. Je ne veux pas d'eau."
          },
          {
            "q": "How do you politely order 'some wine' in French?",
            "opts": ["Je veux le vin", "Je voudrais du vin", "J'aime le vin", "Il y a du vin"],
            "ans": 1,
            "exp": "'Je voudrais du vin' = I would like some wine. 'Je voudrais' (conditional) is polite. 'Du' is the partitive for masculine 'vin'."
          }
        ]
      },
      {
        "id": "fr-l50",
        "title": "La météo",
        "icon": "☀️",
        "cards": [
          {
            "type": "info",
            "title": "Weather with 'il fait'",
            "body": "<p>Many weather expressions use the verb <strong>faire</strong> with impersonal <em>il</em>:</p><table><tr><th>French</th><th>English</th></tr><tr><td>il fait beau</td><td>the weather is nice</td></tr><tr><td>il fait mauvais</td><td>the weather is bad</td></tr><tr><td>il fait chaud</td><td>it is hot</td></tr><tr><td>il fait froid</td><td>it is cold</td></tr><tr><td>il fait doux</td><td>it is mild</td></tr></table>"
          },
          {
            "type": "info",
            "title": "Weather with 'il y a' and impersonal verbs",
            "body": "<p>Other weather patterns to master:</p><ul><li><strong>Il y a du vent</strong> = It is windy</li><li><strong>Il y a du soleil</strong> = It is sunny</li><li><strong>Il y a du brouillard</strong> = There is fog</li><li><strong>Il y a des nuages</strong> = It is cloudy</li><li><strong>Il pleut</strong> = It is raining (from pleuvoir)</li><li><strong>Il neige</strong> = It is snowing (from neiger)</li></ul><p><strong>Three patterns:</strong> il fait + adj · il y a du/de la + noun · il + impersonal verb</p>"
          },
          {
            "type": "info",
            "title": "The four seasons",
            "body": "<p>The seasons and how to say 'in' each one:</p><table><tr><th>Season</th><th>French</th><th>'In' + season</th></tr><tr><td>spring</td><td>le printemps</td><td>au printemps</td></tr><tr><td>summer</td><td>l'été</td><td>en été</td></tr><tr><td>autumn</td><td>l'automne</td><td>en automne</td></tr><tr><td>winter</td><td>l'hiver</td><td>en hiver</td></tr></table><p><strong>Key rule:</strong> All seasons use 'en' EXCEPT spring: <em>au printemps</em> (à + le printemps). This is the one exception to memorise!</p>"
          }
        ],
        "check": [
          {
            "q": "How do you say 'it is cold' in French?",
            "opts": ["il fait chaud", "il fait froid", "il fait beau", "il fait mauvais"],
            "ans": 1,
            "exp": "'Il fait froid' = it is cold. Opposite: 'il fait chaud' (hot). These use the impersonal 'il fait + adjective' construction."
          },
          {
            "q": "What is 'il neige' in English?",
            "opts": ["it is raining", "it is cold", "it is snowing", "it is windy"],
            "ans": 2,
            "exp": "'Il neige' = it is snowing. From the verb 'neiger'. Similarly, 'il pleut' = it is raining (from pleuvoir). Both are impersonal verbs."
          },
          {
            "q": "How do you say 'in spring' in French?",
            "opts": ["en printemps", "en été", "au printemps", "dans le printemps"],
            "ans": 2,
            "exp": "'Au printemps' = in spring. Spring is the only season that uses 'au'. All others use 'en': en été, en automne, en hiver."
          },
          {
            "q": "What does 'il y a du brouillard' mean?",
            "opts": ["it is sunny", "there is fog", "it is windy", "it is raining"],
            "ans": 1,
            "exp": "'Il y a du brouillard' = there is fog. The pattern 'il y a du/de la + noun' works for: vent (wind), soleil (sun), brouillard (fog)."
          },
          {
            "q": "Which is correct for 'the weather is nice'?",
            "opts": ["il y a beau", "il fait du beau", "il fait beau", "il est beau"],
            "ans": 2,
            "exp": "'Il fait beau' = the weather is nice/fine. Use 'il fait + adjective' for these weather expressions."
          }
        ]
      },
      {
        "id": "fr-l52",
        "title": "Conjugaison : être, avoir, aller",
        "icon": "🔠",
        "cards": [
          {
            "type": "info",
            "title": "Être — to be",
            "body": "<p>The most important French verb — irregular in every form:</p><table><tr><th>Pronoun</th><th>être</th><th>English</th></tr><tr><td>je</td><td><strong>suis</strong></td><td>I am</td></tr><tr><td>tu</td><td><strong>es</strong></td><td>you are</td></tr><tr><td>il / elle</td><td><strong>est</strong></td><td>he/she is</td></tr><tr><td>nous</td><td><strong>sommes</strong></td><td>we are</td></tr><tr><td>vous</td><td><strong>êtes</strong></td><td>you are</td></tr><tr><td>ils / elles</td><td><strong>sont</strong></td><td>they are</td></tr></table><p><strong>Tip:</strong> No form resembles the infinitive 'être' at all — it must be fully memorised.</p>"
          },
          {
            "type": "info",
            "title": "Avoir — to have",
            "body": "<p>Also essential — used as auxiliary in passé composé for most verbs:</p><table><tr><th>Pronoun</th><th>avoir</th><th>English</th></tr><tr><td>j'</td><td><strong>ai</strong></td><td>I have</td></tr><tr><td>tu</td><td><strong>as</strong></td><td>you have</td></tr><tr><td>il / elle</td><td><strong>a</strong></td><td>he/she has</td></tr><tr><td>nous</td><td><strong>avons</strong></td><td>we have</td></tr><tr><td>vous</td><td><strong>avez</strong></td><td>you have</td></tr><tr><td>ils / elles</td><td><strong>ont</strong></td><td>they have</td></tr></table><p><strong>Note:</strong> 'j'ai' — je elides to j' before a vowel.</p>"
          },
          {
            "type": "info",
            "title": "Aller — to go",
            "body": "<p>Irregular but its forms are easy to recognise:</p><table><tr><th>Pronoun</th><th>aller</th><th>English</th></tr><tr><td>je</td><td><strong>vais</strong></td><td>I go</td></tr><tr><td>tu</td><td><strong>vas</strong></td><td>you go</td></tr><tr><td>il / elle</td><td><strong>va</strong></td><td>he/she goes</td></tr><tr><td>nous</td><td><strong>allons</strong></td><td>we go</td></tr><tr><td>vous</td><td><strong>allez</strong></td><td>you go</td></tr><tr><td>ils / elles</td><td><strong>vont</strong></td><td>they go</td></tr></table><p><strong>Tip:</strong> aller + infinitive = near future: <em>je vais manger</em> = I am going to eat.</p>"
          }
        ],
        "check": [
          {
            "q": "What is the 'nous' form of être?",
            "opts": ["avons", "sommes", "allons", "êtes"],
            "ans": 1,
            "exp": "nous sommes = we are. être: je suis · tu es · il est · nous sommes · vous êtes · ils sont."
          },
          {
            "q": "What is the 'ils' form of avoir?",
            "opts": ["avez", "avons", "ont", "aient"],
            "ans": 2,
            "exp": "ils ont = they have. avoir: j'ai · tu as · il a · nous avons · vous avez · ils ont."
          },
          {
            "q": "How do you say 'I am going' in French?",
            "opts": ["je vais", "je vas", "j'ai", "je suis"],
            "ans": 0,
            "exp": "je vais = I go / I am going. aller: je vais · tu vas · il va · nous allons · vous allez · ils vont."
          },
          {
            "q": "Which form of ALLER is correct for 'tu'?",
            "opts": ["tu allez", "tu allons", "tu vas", "tu vais"],
            "ans": 2,
            "exp": "tu vas = you go (informal). aller: je vais · tu vas · il va · nous allons · vous allez · ils vont."
          }
        ]
      },
      {
        "id": "fr-l53",
        "title": "Conjugaison : verbes réguliers",
        "icon": "📋",
        "cards": [
          {
            "type": "info",
            "title": "Regular -ER verbs (parler)",
            "body": "<p>Most French verbs end in <strong>-ER</strong>. Remove -er and add these endings:</p><table><tr><th>Pronoun</th><th>Ending</th><th>parler (to speak)</th></tr><tr><td>je</td><td><strong>-e</strong></td><td>je parle</td></tr><tr><td>tu</td><td><strong>-es</strong></td><td>tu parles</td></tr><tr><td>il/elle</td><td><strong>-e</strong></td><td>il parle</td></tr><tr><td>nous</td><td><strong>-ons</strong></td><td>nous parlons</td></tr><tr><td>vous</td><td><strong>-ez</strong></td><td>vous parlez</td></tr><tr><td>ils/elles</td><td><strong>-ent</strong></td><td>ils parlent</td></tr></table><p>⚠️ The -ent of ils/elles is <strong>silent</strong>. Other -ER verbs: aimer, manger, écouter, travailler.</p>"
          },
          {
            "type": "info",
            "title": "Regular -IR verbs (finir)",
            "body": "<p>Remove -ir and add these endings — note the <strong>-iss-</strong> infix in plural forms:</p><table><tr><th>Pronoun</th><th>Ending</th><th>finir (to finish)</th></tr><tr><td>je</td><td><strong>-is</strong></td><td>je finis</td></tr><tr><td>tu</td><td><strong>-is</strong></td><td>tu finis</td></tr><tr><td>il/elle</td><td><strong>-it</strong></td><td>il finit</td></tr><tr><td>nous</td><td><strong>-issons</strong></td><td>nous finissons</td></tr><tr><td>vous</td><td><strong>-issez</strong></td><td>vous finissez</td></tr><tr><td>ils/elles</td><td><strong>-issent</strong></td><td>ils finissent</td></tr></table><p>Other -IR verbs: choisir, réussir, obéir.</p>"
          },
          {
            "type": "info",
            "title": "Regular -RE verbs (attendre)",
            "body": "<p>Remove -re and add these endings — il/elle gets <strong>no ending at all</strong>:</p><table><tr><th>Pronoun</th><th>Ending</th><th>attendre (to wait)</th></tr><tr><td>je</td><td><strong>-ds</strong></td><td>j'attends</td></tr><tr><td>tu</td><td><strong>-ds</strong></td><td>tu attends</td></tr><tr><td>il/elle</td><td><strong>— (nothing)</strong></td><td>il attend</td></tr><tr><td>nous</td><td><strong>-ons</strong></td><td>nous attendons</td></tr><tr><td>vous</td><td><strong>-ez</strong></td><td>vous attendez</td></tr><tr><td>ils/elles</td><td><strong>-ent</strong></td><td>ils attendent</td></tr></table><p>Other -RE verbs: vendre, répondre, perdre.</p>"
          }
        ],
        "check": [
          {
            "q": "What ending do regular -ER verbs take with 'nous'?",
            "opts": ["-ons", "-ez", "-ent", "-e"],
            "ans": 0,
            "exp": "nous + -ons: nous parlons, nous écoutons, nous travaillons. This -ons ending is shared by all verb groups."
          },
          {
            "q": "What is 'nous finissons' in English?",
            "opts": ["we finish / we are finishing", "they finish", "you finish", "I finish"],
            "ans": 0,
            "exp": "nous finissons = we finish. Note the -iss- infix that appears in nous/vous/ils forms of regular -IR verbs."
          },
          {
            "q": "What is the il/elle form of 'attendre'?",
            "opts": ["attends", "attend", "attendez", "attendit"],
            "ans": 1,
            "exp": "il attend = he waits. -RE verbs have NO added ending for il/elle — just the stem: attend (not 'attendt')."
          },
          {
            "q": "Which verbs use the -iss- infix in plural forms?",
            "opts": ["Regular -ER verbs", "Regular -IR verbs", "Regular -RE verbs", "All irregular verbs"],
            "ans": 1,
            "exp": "Regular -IR verbs use -iss- in nous/vous/ils: finissons, finissez, finissent. This infix is a key feature of the -IR group."
          }
        ]
      },
      {
        "id": "fr-l56",
        "title": "Dialogues du quotidien — A1",
        "icon": "💬",
        "cards": [
          {
            "type": "info",
            "title": "At the café and bakery",
            "body": "<p>Essential phrases for ordering and paying:</p><ul><li><strong>Qu'est-ce que vous prenez ?</strong> = What will you have?</li><li><strong>Je voudrais un café, s'il vous plaît.</strong> = I would like a coffee, please.</li><li><strong>C'est combien ?</strong> = How much is it?</li><li><strong>Voilà, cinq euros.</strong> = Here you are, five euros.</li><li><strong>Je vous sers ?</strong> = Can I help you? (lit. 'I serve you?')</li></ul><p>💡 Always use <strong>je voudrais</strong> (I would like) rather than <strong>je veux</strong> (I want) — it's much more polite.</p>"
          },
          {
            "type": "info",
            "title": "Greetings and social exchanges",
            "body": "<p>Key dialogue phrases for meeting people:</p><table><tr><th>French</th><th>English</th></tr><tr><td>Comment vous appelez-vous ?</td><td>What is your name?</td></tr><tr><td>Je m'appelle...</td><td>My name is...</td></tr><tr><td>Ça va ? / Ça va, merci !</td><td>How are you? / Fine, thanks!</td></tr><tr><td>Vous avez quel âge ?</td><td>How old are you?</td></tr><tr><td>J'ai 25 ans.</td><td>I am 25 years old.</td></tr></table><p>⚠️ Use <strong>avoir</strong> for age: j'ai 25 ans (NOT je suis 25 ans).</p>"
          },
          {
            "type": "info",
            "title": "Getting around and asking for help",
            "body": "<p>Survival phrases for navigating France:</p><ul><li><strong>Excusez-moi, où est la gare ?</strong> = Excuse me, where is the station?</li><li><strong>À gauche / à droite / tout droit</strong> = Left / right / straight ahead</li><li><strong>Je ne comprends pas.</strong> = I don't understand.</li><li><strong>Pouvez-vous répéter, s'il vous plaît ?</strong> = Can you repeat, please?</li><li><strong>Pouvez-vous parler plus lentement ?</strong> = Can you speak more slowly?</li><li><strong>J'ai mal à la tête.</strong> = I have a headache.</li></ul>"
          }
        ],
        "check": [
          {
            "q": "A waiter says 'Qu'est-ce que vous prenez ?' You want tea. What do you reply?",
            "opts": ["Je suis un thé, s'il vous plaît.", "Je voudrais un thé, s'il vous plaît.", "J'ai un thé, merci.", "Un thé est ici."],
            "ans": 1,
            "exp": "'Je voudrais un thé, s'il vous plaît' = I would like a tea, please. Always use 'je voudrais' (conditional) for polite ordering — never 'je veux' (I want), which sounds rude."
          },
          {
            "q": "Someone asks 'Vous avez quel âge ?' You are 30. What do you reply?",
            "opts": ["Je suis 30 ans.", "J'ai 30 ans.", "J'ai 30 années.", "Il y a 30 ans."],
            "ans": 1,
            "exp": "'J'ai 30 ans' = I am 30 years old. French uses AVOIR (to have) for age, not être. This is a key difference from English."
          },
          {
            "q": "You don't understand something in French. Which phrase do you use?",
            "opts": ["Je ne sais pas.", "Je ne comprends pas.", "Je n'écoute pas.", "Je ne parle pas."],
            "ans": 1,
            "exp": "'Je ne comprends pas' = I don't understand. Follow with: 'Pouvez-vous répéter ?' (Can you repeat?) or 'Pouvez-vous parler plus lentement ?' (Can you speak more slowly?)."
          },
          {
            "q": "To give your name, which phrase is most natural?",
            "opts": ["Je suis Marie.", "J'ai le nom Marie.", "Je m'appelle Marie.", "Marie est mon nom."],
            "ans": 2,
            "exp": "'Je m'appelle Marie' = My name is Marie. This is the standard phrase for giving your name in French. 'Je suis Marie' is also possible but less idiomatic."
          }
        ]
      },
      {
        "id": "fr-l59",
        "title": "Prononciation — sons de base",
        "icon": "🔊",
        "cards": [
          {
            "type": "info",
            "title": "Key vowel sounds",
            "body": "<p>French has vowel sounds that don't exist in English:</p><table><tr><th>Sound</th><th>Symbol</th><th>Example words</th></tr><tr><td>Rounded 'ee' (no English equivalent)</td><td>/y/</td><td>tu, lune, rue, vu</td></tr><tr><td>'oo' (as in 'you')</td><td>/u/</td><td>vous, rouge, tout, ou</td></tr><tr><td>Closed 'ay'</td><td>/e/</td><td>café, été, chanté</td></tr><tr><td>Open 'air'</td><td>/ɛ/</td><td>père, fête, être, mer</td></tr></table><p>🔑 Minimal pair: <strong>tu</strong> /ty/ vs <strong>tout</strong> /tu/ — change just one sound, change the meaning!</p>"
          },
          {
            "type": "info",
            "title": "Silent letters and h muet",
            "body": "<p>French has many silent letters:</p><ul><li><strong>Final consonants</strong> are usually silent: cha<strong>t</strong>, pon<strong>t</strong>, ne<strong>z</strong>, pie<strong>d</strong></li><li>Exception: <em>CaReFuL</em> — C, R, F, L are often pronounced at end: aver<strong>c</strong>, spor<strong>t</strong></li><li><strong>H muet</strong> (silent h) — triggers elision: <em>j'habite</em>, <em>l'homme</em>, <em>l'heure</em></li><li><strong>H aspiré</strong> — blocks elision: <em>le hibou</em>, <em>le haricot</em> (must be memorised)</li></ul><p>Spelling patterns: <strong>eau/au → /o/</strong> · <strong>ai/ei → /ɛ/</strong> · <strong>in/ain → /ɛ̃/</strong> nasal</p>"
          },
          {
            "type": "info",
            "title": "The French R and special consonants",
            "body": "<p>Consonants that differ from English:</p><ul><li><strong>French R</strong> /ʁ/ — produced at the back of the throat (uvular). Not like English 'r' or Spanish rolled 'r': <em>rue, rouge, très, partir</em></li><li><strong>French J</strong> /ʒ/ — like the 's' in 'measure': <em>je, jour, jardin</em></li><li><strong>CH</strong> /ʃ/ — like English 'sh': <em>chat, chef, chercher</em></li><li><strong>GN</strong> /ɲ/ — like 'ny' in 'canyon': <em>montagne, champagne, gagner</em></li><li><strong>C before e/i/y</strong> = /s/: <em>cerise, cinéma</em></li></ul>"
          }
        ],
        "check": [
          {
            "q": "The words 'vert' (green), 'vers' (towards) and 'verre' (glass) all sound the same. What are they called?",
            "opts": ["Synonyms", "Homophones", "Antonyms", "Cognates"],
            "ans": 1,
            "exp": "Homophones = words that sound identical but have different spellings and meanings. French has many: vert/vers/verre, ou/où, à/a, et/est. Context and spelling clarify meaning."
          },
          {
            "q": "Is the 'h' in 'habiter' (to live) silent or aspirate?",
            "opts": ["Aspirate h — say 'le habite'", "Silent h (h muet) — elision applies: j'habite", "It's always pronounced", "It depends on dialect"],
            "ans": 1,
            "exp": "'Habiter' has a silent h (h muet): je + habite → j'habite. Elision and liaison occur. Compare: 'le hibou' (owl) has an aspirate h — no elision. This must be memorised per word."
          },
          {
            "q": "What sound does 'gn' produce in 'montagne'?",
            "opts": ["Like the 'g' in 'go'", "Like the 'ny' in 'canyon'", "Like 'ng' in 'sing'", "Silent"],
            "ans": 1,
            "exp": "'GN' = /ɲ/ — like 'ny' in 'canyon' or the Spanish ñ. montagne /mɔ̃taɲ/ · champagne /ʃɑ̃paɲ/ · gagner /gaɲe/."
          }
        ]
      },
      {
        "id": "fr-l62",
        "title": "Ordre des mots — A1",
        "icon": "🔀",
        "cards": [
          {
            "type": "info",
            "title": "Basic French word order (SVO)",
            "body": "<p>French follows <strong>SVO order</strong> — Subject + Verb + Object — just like English:</p><table><tr><th>Subject</th><th>Verb</th><th>Object</th></tr><tr><td>Elle</td><td>mange</td><td>une pomme.</td></tr><tr><td>Je</td><td>parle</td><td>français.</td></tr><tr><td>Nous</td><td>avons</td><td>deux chats.</td></tr></table><p><strong>Time expressions</strong> (hier, demain, aujourd'hui) go at the END of the sentence in French: <em>Je mange une pizza <strong>ce soir</strong>.</em></p>"
          },
          {
            "type": "info",
            "title": "Negation word order",
            "body": "<p>French negation uses TWO words that wrap around the verb:</p><p style='text-align:center;font-size:1.1em;padding:8px'><strong>ne</strong> + VERB + <strong>pas</strong></p><ul><li>Je <strong>ne</strong> comprends <strong>pas</strong>. (I don't understand.)</li><li>Elle <strong>n'</strong>aime <strong>pas</strong> le café. (She doesn't like coffee.)</li><li>Il <strong>ne</strong> va <strong>pas</strong> partir. (He is not going to leave.)</li></ul><p>Note: 'ne' becomes 'n'' before a vowel (elision). In spoken French, 'ne' is often dropped: 'Je comprends pas.'</p>"
          },
          {
            "type": "info",
            "title": "Adjective placement",
            "body": "<p>Most French adjectives come <strong>AFTER</strong> the noun — opposite to English:</p><ul><li>une voiture <strong>rouge</strong> (a red car)</li><li>un homme <strong>grand</strong> (a tall man)</li></ul><p><strong>BAGS adjectives</strong> come BEFORE the noun:</p><p><strong>B</strong>eauty: beau/belle, joli(e)<br><strong>A</strong>ge: jeune, vieux/vieille, nouveau/nouvelle<br><strong>G</strong>oodness: bon(ne), mauvais(e)<br><strong>S</strong>ize: grand(e), petit(e), gros(se)</p><ul><li>une <strong>belle</strong> robe <strong>rouge</strong> (a beautiful red dress)</li></ul>"
          }
        ],
        "check": [
          {
            "q": "Which sentence has the correct French word order?",
            "opts": ["Mange elle une pomme.", "Elle une pomme mange.", "Elle mange une pomme.", "Une pomme mange elle."],
            "ans": 2,
            "exp": "Elle mange une pomme. French word order is SVO: Subject (Elle) + Verb (mange) + Object (une pomme) — the same as English."
          },
          {
            "q": "How do you say 'I don't like coffee' in French?",
            "opts": ["Je n'aime pas le café.", "Je pas aime le café.", "Je aime ne le café pas.", "Ne je pas aime le café."],
            "ans": 0,
            "exp": "'Je n'aime pas le café.' Negation: ne/n' BEFORE the verb, pas AFTER. 'n'aime' = ne + aime (elision before vowel). Use 'le' (definite article) with general likes/dislikes."
          },
          {
            "q": "Where does the adjective 'rouge' (red) go in 'a red car'?",
            "opts": ["Before the noun: une rouge voiture", "After the noun: une voiture rouge", "Before the article: rouge une voiture", "It doesn't matter"],
            "ans": 1,
            "exp": "Colour adjectives come AFTER the noun: une voiture rouge. Only BAGS adjectives (Beauty, Age, Goodness, Size) come before: une belle voiture, une petite voiture."
          }
        ]
      },
      {
        "id": "fr-l65",
        "title": "Écoute active — A1",
        "icon": "🎧",
        "cards": [
          {
            "type": "info",
            "title": "Listening to French: getting started",
            "body": "<p>Your ear needs training — French has several features that differ from English:</p><ul><li><strong>Liaison</strong>: final consonants link to the next word: <em>vous_avez, ils_ont</em>.</li><li><strong>Enchaînement</strong>: words blend together in a phrase — 'je m'appelle' sounds like one word.</li><li><strong>Silent letters</strong>: final consonants (except C, R, F, L) are usually silent: <em>allé, vous</em>.</li></ul><p>Strategy: listen for key words like nouns and verbs — don't try to catch every syllable at first.</p>"
          },
          {
            "type": "info",
            "title": "Numbers and time words",
            "body": "<p>Numbers that sound alike cause common listening errors:</p><table><tr><th>Number</th><th>French</th><th>Sounds like</th></tr><tr><td>2</td><td>deux</td><td>'duh'</td></tr><tr><td>12</td><td>douze</td><td>'dooz'</td></tr><tr><td>20</td><td>vingt</td><td>'van'</td></tr><tr><td>30</td><td>trente</td><td>'tront'</td></tr></table><p>Time clues: <em>aujourd'hui</em> (today), <em>demain</em> (tomorrow), <em>hier</em> (yesterday), <em>ce soir</em> (this evening).</p>"
          },
          {
            "type": "info",
            "title": "Common places and directions",
            "body": "<p>Key place words you'll hear in A1 listening:</p><ul><li><strong>la gare</strong> = train station</li><li><strong>le café / le restaurant</strong> = café / restaurant</li><li><strong>la poste</strong> = post office</li><li><strong>le musée</strong> = museum</li></ul><p>Direction words: <em>à gauche</em> (left), <em>à droite</em> (right), <em>tout droit</em> (straight ahead), <em>tournez</em> (turn), <em>continuez</em> (continue).</p>"
          }
        ],
        "check": [
          {
            "q": "Tap Listen and choose what you hear: 'Bonjour' or 'Bonsoir'?",
            "audio": "Bonjour",
            "opts": ["Bonjour (good day / hello)", "Bonsoir (good evening)", "Bon courage (good luck)", "Bonne nuit (good night)"],
            "ans": 0,
            "exp": "'Bonjour' is used during the day; 'bonsoir' in the evening. The key difference is the vowel: 'jour' (rhymes with 'poor') vs 'soir' (rhymes with 'war')."
          },
          {
            "q": "Tap Listen — which number do you hear?",
            "audio": "douze",
            "opts": ["deux (2)", "dix (10)", "douze (12)", "vingt (20)"],
            "ans": 2,
            "exp": "'Douze' = twelve. Common confusion: 'deux' (2), 'dix' (10), 'douze' (12), 'vingt' (20). Listen for the 'z' sound in 'douze' that distinguishes it from 'deux'."
          },
          {
            "q": "Tap Listen — then answer: what should you do first?",
            "audio": "Tournez à gauche, puis allez tout droit.",
            "opts": ["Go straight ahead, then turn left", "Turn right, then go straight ahead", "Turn left, then go straight ahead", "Turn left, then turn right"],
            "ans": 2,
            "exp": "'Tournez à gauche' = turn left; 'puis' = then; 'allez tout droit' = go straight ahead. The order is: first turn left, then go straight. 'Gauche' = left; 'droite' = right."
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
      },
      {
        "id": "fr-l48",
        "title": "Faire les courses",
        "icon": "🛍️",
        "cards": [
          {
            "type": "info",
            "title": "Shopping phrases",
            "body": "<p>Essential phrases for shopping in French:</p><ul><li><strong>C'est combien ?</strong> / <strong>Combien ça coûte ?</strong> = How much is it?</li><li><strong>Ça fait combien ?</strong> = How much does that come to? (at the till)</li><li><strong>Je cherche…</strong> = I am looking for…</li><li><strong>Vous avez… ?</strong> = Do you have…?</li><li><strong>Je le/la prends.</strong> = I'll take it.</li><li><strong>Je regarde, merci.</strong> = I'm just looking, thanks.</li><li><strong>Où est-ce qu'on paie ?</strong> = Where do we pay?</li></ul>"
          },
          {
            "type": "info",
            "title": "Size, fit and price",
            "body": "<p>Key vocabulary for clothes and shopping:</p><table><tr><th>French</th><th>English</th></tr><tr><td>la taille</td><td>clothing size</td></tr><tr><td>la pointure</td><td>shoe size</td></tr><tr><td>le prix</td><td>the price</td></tr><tr><td>les soldes</td><td>the sales</td></tr><tr><td>trop grand/petit</td><td>too big/small</td></tr><tr><td>le magasin</td><td>the shop/store</td></tr><tr><td>le marché</td><td>the market</td></tr><tr><td>la caisse</td><td>the till/checkout</td></tr><tr><td>payer</td><td>to pay</td></tr></table>"
          },
          {
            "type": "info",
            "title": "Colours (les couleurs)",
            "body": "<p>Colours come <strong>after</strong> the noun in French and agree in gender and number:</p><table><tr><th>Colour</th><th>Masc.</th><th>Fem.</th></tr><tr><td>red</td><td>rouge</td><td>rouge</td></tr><tr><td>blue</td><td>bleu</td><td>bleue</td></tr><tr><td>green</td><td>vert</td><td>verte</td></tr><tr><td>yellow</td><td>jaune</td><td>jaune</td></tr><tr><td>white</td><td>blanc</td><td>blanche</td></tr><tr><td>black</td><td>noir</td><td>noire</td></tr></table><p>Example: <em>une robe verte</em> (a green dress), <em>un manteau noir</em> (a black coat).</p>"
          }
        ],
        "check": [
          {
            "q": "How do you ask 'How much is it?' in French?",
            "opts": ["Combien vous avez ?", "C'est combien ?", "Ça fait quoi ?", "Le prix est quoi ?"],
            "ans": 1,
            "exp": "'C'est combien ?' = How much is it? Also correct: 'Combien ça coûte ?' 'Ça fait combien ?' is used more at the checkout."
          },
          {
            "q": "How do you say 'I am looking for a blue jacket'?",
            "opts": ["Je cherche une veste bleue", "Je voudrais une veste bleu", "Je trouve une veste bleue", "J'achète une veste bleue"],
            "ans": 0,
            "exp": "'Je cherche une veste bleue' — chercher = to look for; veste (jacket) is feminine so 'bleu' becomes 'bleue'. Colours agree with the noun."
          },
          {
            "q": "What does 'les soldes' mean?",
            "opts": ["the shops", "the prices", "the sales", "the markets"],
            "ans": 2,
            "exp": "'Les soldes' = the sales. France has two regulated sale periods per year. Don't confuse with 'le solde' (bank balance)."
          },
          {
            "q": "How do you say 'too small' in French?",
            "opts": ["trop grand", "assez petit", "trop petit", "très petit"],
            "ans": 2,
            "exp": "'Trop petit' = too small. 'Trop' = too (much). 'Trop grand' = too big. 'Très petit' = very small (not too small)."
          },
          {
            "q": "Which word means 'to pay' in French?",
            "opts": ["acheter", "vendre", "chercher", "payer"],
            "ans": 3,
            "exp": "'Payer' = to pay. Acheter = to buy, vendre = to sell, chercher = to look for. 'Je voudrais payer' = I would like to pay."
          }
        ]
      },
      {
        "id": "fr-l49",
        "title": "Les transports et les directions",
        "icon": "🚌",
        "cards": [
          {
            "type": "info",
            "title": "Transport vocabulary",
            "body": "<p>Essential French transport words:</p><table><tr><th>French</th><th>English</th></tr><tr><td>le bus</td><td>bus</td></tr><tr><td>le métro</td><td>underground/metro</td></tr><tr><td>le train</td><td>train</td></tr><tr><td>l'avion (m)</td><td>aeroplane</td></tr><tr><td>le vélo</td><td>bicycle</td></tr><tr><td>la voiture</td><td>car</td></tr><tr><td>à pied</td><td>on foot</td></tr></table><p>Use <strong>'en'</strong> for most transport: en bus, en train, en voiture. Use <strong>'à'</strong> for bicycle and foot: à vélo, à pied.</p>"
          },
          {
            "type": "info",
            "title": "Giving directions",
            "body": "<p>Key direction phrases using the imperative (vous):</p><ul><li><strong>Allez tout droit.</strong> = Go straight ahead.</li><li><strong>Tournez à gauche.</strong> = Turn left.</li><li><strong>Tournez à droite.</strong> = Turn right.</li><li><strong>Prenez la première / deuxième rue.</strong> = Take the first / second street.</li><li><strong>Traversez la rue / le pont.</strong> = Cross the street / bridge.</li><li><strong>Au carrefour…</strong> = At the crossroads…</li><li><strong>Au feu rouge…</strong> = At the traffic lights…</li></ul>"
          },
          {
            "type": "info",
            "title": "Prepositions of place",
            "body": "<p>These prepositions help locate places:</p><table><tr><th>French</th><th>English</th><th>Example</th></tr><tr><td>près de</td><td>near</td><td>près de la gare</td></tr><tr><td>loin de</td><td>far from</td><td>loin d'ici</td></tr><tr><td>à côté de</td><td>next to</td><td>à côté du café</td></tr><tr><td>en face de</td><td>opposite</td><td>en face de l'hôtel</td></tr><tr><td>au bout de</td><td>at the end of</td><td>au bout de la rue</td></tr></table>"
          }
        ],
        "check": [
          {
            "q": "How do you say 'Turn left' in French?",
            "opts": ["Allez tout droit", "Tournez à gauche", "Tournez à droite", "Prenez à gauche"],
            "ans": 1,
            "exp": "'Tournez à gauche' = Turn left. 'Gauche' = left. 'Droite' = right. 'Tout droit' = straight ahead."
          },
          {
            "q": "What does 'à pied' mean?",
            "opts": ["by car", "by bike", "on foot", "by bus"],
            "ans": 2,
            "exp": "'À pied' = on foot. 'Le pied' = foot. Transport uses 'en' (en bus, en voiture) but 'à' for vélo and pied."
          },
          {
            "q": "How do you say 'Take the first street on the left'?",
            "opts": ["Allez la première rue à gauche", "Traversez la première rue à gauche", "Prenez la première rue à gauche", "Tournez la première rue à gauche"],
            "ans": 2,
            "exp": "'Prenez la première rue à gauche.' Prendre = to take (streets and transport). 'Première' = first (feminine, agrees with 'rue')."
          },
          {
            "q": "What is 'le carrefour'?",
            "opts": ["the traffic light", "the roundabout", "the crossroads", "the pavement"],
            "ans": 2,
            "exp": "'Le carrefour' = the crossroads/junction. The Carrefour supermarket is named after the crossroads where the first store opened!"
          },
          {
            "q": "How do you say 'the station is near here'?",
            "opts": ["La gare est loin d'ici", "La gare est près d'ici", "La gare est à côté", "La gare est en face d'ici"],
            "ans": 1,
            "exp": "'La gare est près d'ici' = The station is near here. 'Près de' = near. 'Loin de' = far from (opposite)."
          }
        ]
      },
      {
        "id": "fr-l51",
        "title": "Au restaurant",
        "icon": "🍷",
        "cards": [
          {
            "type": "info",
            "title": "Arriving and ordering",
            "body": "<p>Essential phrases for dining out in France:</p><ul><li><strong>Une table pour deux personnes, s'il vous plaît.</strong> = A table for two, please.</li><li><strong>La carte, s'il vous plaît.</strong> = The à la carte menu, please.</li><li><strong>Je voudrais commander.</strong> = I would like to order.</li><li><strong>Vous avez choisi ?</strong> = Have you chosen? (waiter's phrase)</li><li><strong>Qu'est-ce que vous recommandez ?</strong> = What do you recommend?</li></ul><p><strong>Remember:</strong> 'La carte' = the full à la carte menu; 'le menu' = the set meal at a fixed price.</p>"
          },
          {
            "type": "info",
            "title": "The three courses",
            "body": "<p>A traditional French meal:</p><table><tr><th>Course</th><th>French</th><th>Notes</th></tr><tr><td>Starter</td><td>l'entrée (f)</td><td>Warning: NOT 'main course' as in American English!</td></tr><tr><td>Main course</td><td>le plat principal</td><td>'Plat' = dish/course</td></tr><tr><td>Dessert</td><td>le dessert</td><td>Same spelling as English</td></tr></table><p>Other useful terms: le fromage (cheese course), la boisson (the drink), le pain (bread — usually free).</p>"
          },
          {
            "type": "info",
            "title": "Feedback and paying",
            "body": "<p>Expressing opinions and settling the bill:</p><ul><li><strong>C'est délicieux !</strong> = It is delicious!</li><li><strong>C'est trop salé.</strong> = It is too salty.</li><li><strong>C'est trop sucré.</strong> = It is too sweet.</li><li><strong>C'est inclus le service ?</strong> = Is service included?</li><li><strong>L'addition, s'il vous plaît !</strong> = The bill, please!</li><li><strong>Le pourboire</strong> = the tip (lit. 'for a drink')</li></ul><p><strong>Cultural note:</strong> In France, service (15%) is usually included (service compris). A small extra tip is welcome but not obligatory.</p>"
          }
        ],
        "check": [
          {
            "q": "How do you ask for the bill in French?",
            "opts": ["Le menu, s'il vous plaît", "Le pourboire, s'il vous plaît", "L'addition, s'il vous plaît", "La carte, s'il vous plaît"],
            "ans": 2,
            "exp": "'L'addition, s'il vous plaît' = The bill, please. This is the essential phrase for ending a French restaurant meal."
          },
          {
            "q": "What is 'l'entrée' in a French restaurant?",
            "opts": ["the main course", "the entrance", "the starter", "the dessert"],
            "ans": 2,
            "exp": "'L'entrée' = the starter/first course in France. Warning: in American English, 'entrée' means the main course — the opposite!"
          },
          {
            "q": "How do you say 'I would like to order' in French?",
            "opts": ["Je voudrais payer", "Je voudrais commander", "Je voudrais la carte", "Je voudrais partir"],
            "ans": 1,
            "exp": "'Je voudrais commander' = I would like to order. 'Commander' = to order. 'Je voudrais' is the polite conditional."
          },
          {
            "q": "What does 'c'est trop salé' mean?",
            "opts": ["it is too sweet", "it is delicious", "it is too spicy", "it is too salty"],
            "ans": 3,
            "exp": "'C'est trop salé' = it is too salty. 'Sel' = salt → 'salé' = salty. 'Trop' = too (much). Compare: 'trop sucré' (too sweet)."
          },
          {
            "q": "What is the difference between 'la carte' and 'le menu'?",
            "opts": ["They mean the same thing", "La carte is the set meal; le menu is à la carte", "La carte is the full à la carte menu; le menu is a fixed-price set meal", "Le menu is only for drinks"],
            "ans": 2,
            "exp": "In France: 'la carte' = the full à la carte menu (choose freely); 'le menu' = a fixed-price set meal. Asking for 'le menu' means you want the set deal."
          }
        ]
      },
      {
        "id": "fr-l54",
        "title": "Conjugaison : faire, vouloir, pouvoir, devoir",
        "icon": "⚙️",
        "cards": [
          {
            "type": "info",
            "title": "Faire — to do / to make",
            "body": "<p>Faire is highly irregular — memorise the full table:</p><table><tr><th>Pronoun</th><th>faire</th></tr><tr><td>je</td><td><strong>fais</strong></td></tr><tr><td>tu</td><td><strong>fais</strong></td></tr><tr><td>il/elle</td><td><strong>fait</strong></td></tr><tr><td>nous</td><td><strong>faisons</strong></td></tr><tr><td>vous</td><td><strong>faites</strong></td></tr><tr><td>ils/elles</td><td><strong>font</strong></td></tr></table><p>⚠️ <strong>vous faites</strong> (NOT faisez) — one of only three vous forms ending in -tes: êtes, faites, dites.</p>"
          },
          {
            "type": "info",
            "title": "Vouloir (to want) and Pouvoir (to be able to)",
            "body": "<p>Both follow the same stem-change pattern — different stem in singular vs plural:</p><table><tr><th>Pronoun</th><th>vouloir</th><th>pouvoir</th></tr><tr><td>je</td><td>veux</td><td>peux</td></tr><tr><td>tu</td><td>veux</td><td>peux</td></tr><tr><td>il/elle</td><td>veut</td><td>peut</td></tr><tr><td>nous</td><td>voulons</td><td>pouvons</td></tr><tr><td>vous</td><td>voulez</td><td>pouvez</td></tr><tr><td>ils/elles</td><td>veulent</td><td>peuvent</td></tr></table><p><strong>Usage:</strong> vouloir/pouvoir + infinitive: <em>je veux partir</em> · <em>je peux venir</em></p>"
          },
          {
            "type": "info",
            "title": "Devoir — must / to have to",
            "body": "<p>Devoir expresses obligation — also stem-changing:</p><table><tr><th>Pronoun</th><th>devoir</th><th>Example</th></tr><tr><td>je</td><td><strong>dois</strong></td><td>je dois travailler</td></tr><tr><td>tu</td><td><strong>dois</strong></td><td>tu dois écouter</td></tr><tr><td>il/elle</td><td><strong>doit</strong></td><td>il doit partir</td></tr><tr><td>nous</td><td><strong>devons</strong></td><td>nous devons rester</td></tr><tr><td>vous</td><td><strong>devez</strong></td><td>vous devez finir</td></tr><tr><td>ils/elles</td><td><strong>doivent</strong></td><td>ils doivent attendre</td></tr></table>"
          }
        ],
        "check": [
          {
            "q": "What is the 'vous' form of faire?",
            "opts": ["vous faisez", "vous faisons", "vous faites", "vous font"],
            "ans": 2,
            "exp": "vous faites — irregular! Most verbs use -ez for vous, but faire, être, and dire use -tes: êtes, faites, dites."
          },
          {
            "q": "What is 'ils font' in English?",
            "opts": ["they want", "they can", "they go", "they do/make"],
            "ans": 3,
            "exp": "ils font = they do / they make. Irregular: not 'faisent'. faire: je fais · tu fais · il fait · nous faisons · vous faites · ils font."
          },
          {
            "q": "Which form of vouloir is correct for 'je'?",
            "opts": ["je veut", "je veux", "je voulons", "je voulez"],
            "ans": 1,
            "exp": "je veux = I want. Stem change: je/tu veux · il veut · nous voulons · vous voulez · ils veulent."
          },
          {
            "q": "'Je ___ partir.' — Which verb form means 'I must leave'?",
            "opts": ["peux", "dois", "veux", "fais"],
            "ans": 1,
            "exp": "je dois partir = I must leave / I have to leave. Devoir expresses obligation: je dois · tu dois · il doit · nous devons · vous devez · ils doivent."
          }
        ]
      },
      {
        "id": "fr-l55",
        "title": "Le passé composé — révision",
        "icon": "🔁",
        "cards": [
          {
            "type": "info",
            "title": "Structure of the passé composé",
            "body": "<p><strong>Passé composé = auxiliary verb + past participle</strong></p><p>Most verbs use <strong>avoir</strong>; motion/state verbs use <strong>être</strong>:</p><table><tr><th>Auxiliary</th><th>Example</th><th>English</th></tr><tr><td>avoir</td><td>j'ai mangé</td><td>I ate / have eaten</td></tr><tr><td>avoir</td><td>elle a fini</td><td>she finished</td></tr><tr><td>être</td><td>il est allé</td><td>he went</td></tr><tr><td>être</td><td>elles sont parties</td><td>they left (fem.)</td></tr></table>"
          },
          {
            "type": "info",
            "title": "Être verbs and agreement",
            "body": "<p>Verbs that take <strong>être</strong>: aller, venir, partir, arriver, naître, mourir, rester, retourner, tomber, entrer, sortir (plus all reflexive verbs).</p><p>With être, the past participle <strong>agrees</strong> with the subject:</p><ul><li>il est parti · <strong>elle est partie</strong> (+e)</li><li>ils sont partis · <strong>elles sont parties</strong> (+es)</li></ul><p><strong>No agreement with avoir auxiliary</strong> (unless a preceding direct object).</p>"
          },
          {
            "type": "info",
            "title": "Key irregular past participles",
            "body": "<table><tr><th>Infinitive</th><th>Past participle</th></tr><tr><td>avoir</td><td><strong>eu</strong></td></tr><tr><td>être</td><td><strong>été</strong></td></tr><tr><td>faire</td><td><strong>fait</strong></td></tr><tr><td>prendre</td><td><strong>pris</strong></td></tr><tr><td>voir</td><td><strong>vu</strong></td></tr><tr><td>venir</td><td><strong>venu</strong></td></tr><tr><td>mettre</td><td><strong>mis</strong></td></tr><tr><td>pouvoir</td><td><strong>pu</strong></td></tr></table><p>Regular patterns: -ER → <strong>-é</strong> · -IR → <strong>-i</strong> · -RE → <strong>-u</strong> (e.g. vendre → vendu)</p>"
          }
        ],
        "check": [
          {
            "q": "What auxiliary does 'aller' use in the passé composé?",
            "opts": ["avoir", "être", "either one", "aller itself"],
            "ans": 1,
            "exp": "aller uses être: je suis allé(e). Être verbs include: aller, venir, partir, arriver, sortir, entrer, tomber, naître, mourir, rester."
          },
          {
            "q": "What is the past participle of 'faire'?",
            "opts": ["faisé", "fait", "faite", "fais"],
            "ans": 1,
            "exp": "faire → fait. J'ai fait = I did/made. Key irregular past participles: faire → fait · avoir → eu · être → été · prendre → pris · voir → vu."
          },
          {
            "q": "'Elle est ___.' — Which form of 'partir' is correct?",
            "opts": ["parti", "partis", "parties", "partie"],
            "ans": 3,
            "exp": "elle est partie. With être auxiliary, the past participle agrees with the subject: elle (feminine singular) → add -e → partie."
          },
          {
            "q": "How is negation placed in the passé composé?",
            "opts": ["ne...pas around the whole verb phrase", "ne before auxiliary, pas after auxiliary", "pas only before the past participle", "ne at the end of the sentence"],
            "ans": 1,
            "exp": "ne before the auxiliary, pas immediately after it: je N'AI PAS mangé. The past participle comes last, after 'pas'."
          }
        ]
      },
      {
        "id": "fr-l57",
        "title": "Dialogues du quotidien — A2",
        "icon": "🗣️",
        "cards": [
          {
            "type": "info",
            "title": "Hotel and accommodation",
            "body": "<p>Checking in and reporting problems:</p><ul><li><strong>Avez-vous une réservation ?</strong> = Do you have a reservation?</li><li><strong>Oui, au nom de...</strong> = Yes, in the name of...</li><li><strong>Pour combien de nuits ?</strong> = For how many nights?</li><li><strong>Il y a un problème avec ma chambre.</strong> = There's a problem with my room.</li><li><strong>Il n'y a pas d'eau chaude.</strong> = There's no hot water.</li><li><strong>Serait-il possible de changer de chambre ?</strong> = Would it be possible to change rooms?</li></ul>"
          },
          {
            "type": "info",
            "title": "Transport and giving directions",
            "body": "<p>Buying tickets and navigating:</p><table><tr><th>French</th><th>English</th></tr><tr><td>Un aller simple pour Lyon</td><td>A single/one-way ticket to Lyon</td></tr><tr><td>Un aller-retour</td><td>A return ticket</td></tr><tr><td>Deuxième classe</td><td>Second class</td></tr><tr><td>Prenez la première rue à droite</td><td>Take the first street on the right</td></tr><tr><td>Puis tournez à gauche</td><td>Then turn left</td></tr></table><p>Making plans: <strong>On se retrouve devant...</strong> = We'll meet outside... · <strong>Tu es libre samedi ?</strong> = Are you free Saturday?</p>"
          },
          {
            "type": "info",
            "title": "Phone calls and making appointments",
            "body": "<p>Essential telephone phrases:</p><ul><li><strong>Allô, bonjour ! [Société X], j'écoute.</strong> = Hello! [Company X], speaking.</li><li><strong>Je voudrais prendre rendez-vous.</strong> = I would like to make an appointment.</li><li><strong>C'est pour quel motif ?</strong> = What is the reason? (for your appointment)</li><li><strong>Elle est absente pour le moment.</strong> = She is not available right now.</li><li><strong>Voulez-vous laisser un message ?</strong> = Would you like to leave a message?</li><li><strong>Pourriez-vous me rappeler ?</strong> = Could you call me back?</li></ul>"
          }
        ],
        "check": [
          {
            "q": "At a hotel: 'Avez-vous une réservation ?' — What is the receptionist asking?",
            "opts": ["Do you have a room number?", "Do you have a reservation?", "Have you checked in before?", "Do you have identification?"],
            "ans": 1,
            "exp": "'Avez-vous une réservation ?' = Do you have a reservation? Reply: 'Oui, au nom de [name], pour [X] nuits.' At = in the name of (au nom de)."
          },
          {
            "q": "'Un aller-retour pour Lyon, deuxième classe' — what have you asked for?",
            "opts": ["A single first-class ticket to Lyon", "A return second-class ticket to Lyon", "A single second-class ticket to Lyon", "A first-class return to Lyon"],
            "ans": 1,
            "exp": "Aller-retour = return ticket. Deuxième classe = second class. Aller simple = one-way ticket. Première classe = first class."
          },
          {
            "q": "'On se retrouve devant le cinéma à 20h' — what does this mean?",
            "opts": ["We are meeting inside the cinema at 8pm", "We'll meet outside the cinema at 8pm", "The cinema is open at 8pm", "We're watching a film at 8pm"],
            "ans": 1,
            "exp": "'On se retrouve' = we'll meet up. 'Devant' = in front of/outside. 'À 20h' = at 8pm (using the 24-hour clock, which is standard in French)."
          },
          {
            "q": "On the phone: 'Voulez-vous laisser un message ?' — what does the assistant want to know?",
            "opts": ["Do you want to speak louder?", "Would you like to leave a message?", "Are you leaving now?", "Do you want to call back?"],
            "ans": 1,
            "exp": "'Laisser un message' = to leave a message. If yes: 'Oui, pouvez-vous lui demander de me rappeler ?' (Yes, could you ask them to call me back?) If no: 'Non merci, je rappellerai plus tard.' (No thank you, I'll call back later.)"
          }
        ]
      },
      {
        "id": "fr-l60",
        "title": "Prononciation — nasales, liaison, élision",
        "icon": "🔗",
        "cards": [
          {
            "type": "info",
            "title": "The four nasal vowels",
            "body": "<p>French has four nasal vowels — the air flows through the nose:</p><table><tr><th>Sound</th><th>Spellings</th><th>Examples</th></tr><tr><td>/ɑ̃/</td><td>an, am, en, em</td><td>enfant, sans, vent, temps</td></tr><tr><td>/ɛ̃/</td><td>in, im, ain, ein, un*</td><td>vin, pain, bein, fin</td></tr><tr><td>/ɔ̃/</td><td>on, om</td><td>bon, maison, garçon</td></tr><tr><td>/œ̃/</td><td>un, um</td><td>un, lundi, parfum</td></tr></table><p>*In modern French, /un/ and /ɛ̃/ are merging — many speakers don't distinguish 'un' and 'in'.</p>"
          },
          {
            "type": "info",
            "title": "Liaison and enchaînement",
            "body": "<p><strong>Liaison</strong>: a normally silent final consonant is pronounced before a word starting with a vowel/h muet:</p><ul><li>les enfants → /lez‿ɑ̃fɑ̃/ (s becomes z)</li><li>un homme → /œ̃n‿ɔm/ (n pronounced)</li><li>grand ami → /grɑ̃t‿ami/ (d becomes t)</li></ul><p><strong>Enchaînement</strong>: a pronounced consonant links naturally to the next vowel:</p><ul><li>une amie → /y‿na‿mi/ (the n of une links)</li></ul><p>⚠️ Liaison is <em>mandatory</em> after les, des, mes, ces, un, en, très, plus (as adverb), and <em>forbidden</em> before h aspiré.</p>"
          },
          {
            "type": "info",
            "title": "Élision and the schwa",
            "body": "<p><strong>Élision</strong> (mandatory before vowels/h muet):</p><ul><li>le + ami → <strong>l'ami</strong></li><li>je + ai → <strong>j'ai</strong></li><li>ne + est → <strong>n'est</strong></li><li>de + eau → <strong>de l'eau</strong></li></ul><p><strong>Schwa /ə/</strong> (mute e): often dropped in fast speech:</p><ul><li>'je ne le veux pas' → /ʒnlvøpa/ in rapid speech</li><li>'tu' → /t/ before vowel in casual: 't'as vu ?'</li></ul><p>In formal speech, every schwa is pronounced. In casual speech, many drop.</p>"
          }
        ],
        "check": [
          {
            "q": "In 'les enfants', what happens to the 's' of 'les'?",
            "opts": ["It stays silent", "It becomes /z/ and links to 'enfants'", "It becomes /s/ and is pronounced", "The word contracts to l'enfants"],
            "ans": 1,
            "exp": "Liaison: the normally-silent 's' of 'les' becomes /z/ before the vowel of 'enfants': /lez‿ɑ̃fɑ̃/. Liaison is mandatory after 'les, des, mes, un, en, très'. The 's' always becomes /z/ in liaison."
          },
          {
            "q": "Which word contains the nasal vowel /ɑ̃/?",
            "opts": ["vin", "bon", "enfant", "brun"],
            "ans": 2,
            "exp": "Enfant /ɑ̃fɑ̃/ contains /ɑ̃/ (an/en). vin /vɛ̃/ = /ɛ̃/ · bon /bɔ̃/ = /ɔ̃/ · brun /bʁœ̃/ = /œ̃/. The four nasals are distinct sounds — learning to hear the difference is key."
          },
          {
            "q": "Does 'hibou' (owl) have a silent h or aspirate h? What does this mean for elision?",
            "opts": ["Silent h — write l'hibou", "Aspirate h — write le hibou (no elision)", "Always write l'hibou in formal French", "The 'h' is always pronounced in hibou"],
            "ans": 1,
            "exp": "'Hibou' has aspirate h: le hibou (no elision), les hiboux (no liaison: /le ibu/, not /lez ibu/). Compare: l'homme (silent h, elision applies). Aspirate h must be memorised — there is no rule to predict it."
          }
        ]
      },
      {
        "id": "fr-l63",
        "title": "Ordre des mots — A2",
        "icon": "🔀",
        "cards": [
          {
            "type": "info",
            "title": "Object pronouns before the verb",
            "body": "<p>Direct and indirect object pronouns go <strong>BEFORE</strong> the verb in French:</p><table><tr><th>English</th><th>French (wrong)</th><th>French (correct)</th></tr><tr><td>I see him.</td><td>Je vois le.</td><td>Je <strong>le</strong> vois.</td></tr><tr><td>She gives it to him.</td><td>Elle donne lui le livre.</td><td>Elle <strong>lui</strong> donne le livre.</td></tr></table><p>In passé composé: the pronoun goes before the AUXILIARY: <em>Je <strong>l'</strong>ai vu.</em></p><p>Negation wraps around pronoun + auxiliary: <em>Je <strong>ne l'ai pas</strong> vu.</em></p>"
          },
          {
            "type": "info",
            "title": "Adjective placement — BAGS and others",
            "body": "<p>Most adjectives follow the noun; BAGS adjectives precede it:</p><ul><li><strong>Before noun (BAGS)</strong>: beau, joli, jeune, vieux, nouveau, bon, mauvais, grand, petit, gros</li><li><strong>After noun</strong>: all colours, nationalities, shapes, most others</li></ul><p>Both in one sentence: <em>C'est une <strong>belle</strong> robe <strong>rouge</strong>.</em> (belle = BAGS before; rouge = colour after)</p><p>Some adjectives CHANGE meaning depending on position: <em>un homme <strong>grand</strong></em> (a tall man) vs <em>un <strong>grand</strong> homme</em> (a great man).</p>"
          },
          {
            "type": "info",
            "title": "Passé composé and time expressions",
            "body": "<p>In passé composé, the structure is: <strong>Subject + auxiliary + past participle + rest</strong></p><ul><li>J'<strong>ai mangé</strong> une pizza hier.</li><li>Elle <strong>est allée</strong> au marché ce matin.</li><li>Nous <strong>avons visité</strong> le Louvre la semaine dernière.</li></ul><p>Time expressions come at the end: hier (yesterday) · ce matin (this morning) · la semaine dernière (last week) · l'année dernière (last year).</p><p>Agreement of past participle with être verbs: elle est allé<strong>e</strong> · ils sont allé<strong>s</strong>.</p>"
          }
        ],
        "check": [
          {
            "q": "Where does the direct object pronoun 'le' go in 'I see him' (Je le vois)?",
            "opts": ["After the verb: Je vois le.", "Before the verb: Je le vois.", "At the end: Je vois lui.", "Before the subject: Le je vois."],
            "ans": 1,
            "exp": "Je le vois. Object pronouns go BEFORE the verb in French. This is the opposite of English ('I see him'). In passé composé: je l'ai vu (pronoun before auxiliary)."
          },
          {
            "q": "How do you say 'She went to the cinema' in passé composé?",
            "opts": ["Elle a allée au cinéma.", "Elle est allé au cinéma.", "Elle est allée au cinéma.", "Elle aller est au cinéma."],
            "ans": 2,
            "exp": "Elle est allée au cinéma. Aller uses ÊTRE auxiliary. Past participle agrees with subject: elle (feminine) → allée (add -e). Je suis allé · tu es allé · il est allé · elle est allée."
          },
          {
            "q": "In 'C'est une belle robe rouge', why is 'belle' before and 'rouge' after the noun?",
            "opts": ["It's random word order", "Belle is a BAGS adjective (Beauty) — before; rouge is a colour — after", "Belle is longer so it goes first", "Both should be after the noun"],
            "ans": 1,
            "exp": "Belle (beautiful) is a BAGS adjective — it goes before the noun. Rouge (red) is a colour adjective — it goes after the noun. BAGS = Beauty, Age, Goodness, Size."
          }
        ]
      },
      {
        "id": "fr-l66",
        "title": "Écoute active — A2",
        "icon": "🎧",
        "cards": [
          {
            "type": "info",
            "title": "Listening for tense clues",
            "body": "<p>At A2 level, recognising tense markers helps you understand when something happened:</p><ul><li><strong>Passé composé</strong>: je suis allé, j'ai mangé — you'll hear the auxiliary (suis/ai) before the past participle.</li><li><strong>Imparfait</strong>: c'était, il faisait — often ends in '-ait' sound.</li><li><strong>Futur proche</strong>: je vais + infinitive — signals a near-future action.</li></ul><p>Time markers: <em>hier</em> (yesterday), <em>la semaine dernière</em> (last week), <em>demain</em> (tomorrow).</p>"
          },
          {
            "type": "info",
            "title": "Formal vs informal register",
            "body": "<p>Listen for these clues to tell formal (vous) from informal (tu):</p><table><tr><th>Formal</th><th>Informal</th></tr><tr><td>vous pouvez</td><td>tu peux</td></tr><tr><td>s'il vous plaît</td><td>s'il te plaît</td></tr><tr><td>Comment allez-vous ?</td><td>Comment vas-tu ? / Ça va ?</td></tr></table><p>In shops, restaurants and with strangers: expect <em>vous</em>. With friends and children: expect <em>tu</em>.</p>"
          },
          {
            "type": "info",
            "title": "Restaurant and café vocabulary in context",
            "body": "<p>Key phrases you'll hear in a French restaurant or café:</p><ul><li><em>Je voudrais / Je prends...</em> — I would like / I'll have...</li><li><em>Qu'est-ce que vous recommandez ?</em> — What do you recommend?</li><li><em>Nous avons réservé une table pour...</em> — We have reserved a table for...</li><li><em>L'addition, s'il vous plaît.</em> — The bill, please.</li></ul><p>Note: <em>entrée</em> = starter (NOT entrance); <em>plat principal</em> = main course; <em>dessert</em> = dessert.</p>"
          }
        ],
        "check": [
          {
            "q": "Tap Listen — when did this happen?",
            "audio": "Hier soir, je suis allé au cinéma.",
            "opts": ["This evening", "Yesterday evening", "Last week", "Tomorrow evening"],
            "ans": 1,
            "exp": "'Hier soir' = yesterday evening. 'Hier' = yesterday; 'soir' = evening. The passé composé 'suis allé' confirms a completed past action. Compare: 'ce soir' (this evening), 'demain soir' (tomorrow evening)."
          },
          {
            "q": "Tap Listen — what register is the phrase you hear?",
            "audio": "s'il te plaît",
            "opts": ["Formal (vouvoiement)", "Informal (tutoiement)", "Neither — this is a fixed phrase", "Regional dialect"],
            "ans": 1,
            "exp": "'S'il te plaît' uses 'te', the informal object pronoun, making it tutoiement (informal register). The formal equivalent is 's'il vous plaît' with 'vous'. Both mean please."
          },
          {
            "q": "Tap Listen — how many people is the table reservation for?",
            "audio": "Nous avons réservé une table pour quatre.",
            "opts": ["Two", "Three", "Four", "Six"],
            "ans": 2,
            "exp": "'Pour quatre' = for four. 'Quatre' = 4. Common numbers for restaurant reservations: deux (2), trois (3), quatre (4), cinq (5), six (6)."
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
      },
      {
        "id": "fr-l58",
        "title": "Situations formelles — B1",
        "icon": "🎩",
        "cards": [
          {
            "type": "info",
            "title": "Formal complaints and requests",
            "body": "<p>How to complain and request politely in French:</p><ul><li><strong>Je souhaiterais signaler un problème concernant...</strong> = I would like to report a problem regarding...</li><li><strong>Serait-il possible de... ?</strong> = Would it be possible to...?</li><li><strong>Je me permets de vous contacter pour...</strong> = I am taking the liberty of contacting you to...</li><li><strong>Suite à notre entretien, je...</strong> = Following our meeting/call, I...</li></ul><p>Using the conditional (<em>je souhaiterais, serait-il</em>) instead of the present (<em>je veux</em>) transforms a demand into a polite request.</p>"
          },
          {
            "type": "info",
            "title": "Professional discussions and debate",
            "body": "<p>Useful structures for formal discussion:</p><table><tr><th>Purpose</th><th>French phrase</th></tr><tr><td>Agree</td><td>Je suis (tout à fait) d'accord.</td></tr><tr><td>Partly disagree</td><td>Je ne suis pas tout à fait d'accord.</td></tr><tr><td>Give opinion</td><td>À mon sens / À mon avis...</td></tr><tr><td>Contrast</td><td>D'un côté... de l'autre côté...</td></tr><tr><td>Add a point</td><td>Si vous me le permettez, j'aimerais ajouter...</td></tr><tr><td>Suggest</td><td>Il faudrait revoir / envisager...</td></tr></table>"
          },
          {
            "type": "info",
            "title": "Formal written French",
            "body": "<p>Key conventions for formal emails and letters:</p><ul><li><strong>Opening:</strong> Madame, Monsieur, (no first name in formal letters)</li><li><strong>Purpose:</strong> Je me permets de vous écrire concernant... / Suite à...</li><li><strong>Request:</strong> Auriez-vous la possibilité de... ? / Pourriez-vous... ?</li><li><strong>Sign-off:</strong> Cordialement, / Dans l'attente de votre réponse, je vous adresse mes cordiales salutations.</li></ul><p>Avoid informal register (salut, bisous, t'as vu) in professional correspondence.</p><p><em>Journalistic conditional:</em> 'Le gouvernement <strong>aurait</strong> décidé...' = The government has reportedly decided... (unconfirmed).</p>"
          }
        ],
        "check": [
          {
            "q": "Which opening is best for a formal complaint to a hotel manager?",
            "opts": ["Ce bruit, c'est inadmissible !", "Je souhaiterais signaler un problème concernant ma chambre.", "Mon patron sera très en colère !", "J'exige une solution immédiate."],
            "ans": 1,
            "exp": "'Je souhaiterais signaler un problème' = I would like to report a problem. The conditional 'souhaiterais' is polite and measured. A formal complaint should state the problem calmly and propose a solution."
          },
          {
            "q": "In a professional email, how do you politely ask if someone is available for a meeting?",
            "opts": ["Tu es libre mardi ?", "Venez mardi.", "Auriez-vous la possibilité de vous rendre disponible mardi ?", "Je veux te voir mardi."],
            "ans": 2,
            "exp": "'Auriez-vous la possibilité de...' = Would you be able to...? This uses the conditional of avoir (auriez) + possibilité de + infinitive — a very polite formal structure for professional requests."
          },
          {
            "q": "What does 'Je ne suis pas tout à fait d'accord' mean in a discussion?",
            "opts": ["I completely agree", "I don't entirely agree", "I have no opinion", "I'm not sure what you mean"],
            "ans": 1,
            "exp": "'Pas tout à fait' = not entirely. This is a polite way to disagree in French professional and academic contexts. Stronger: 'Je suis en désaccord' (I disagree). Milder: 'Cependant...' (However...) or 'Certes, mais...' (Admittedly, but...)."
          },
          {
            "q": "A news report says 'Le ministre aurait démissionné.' What does 'aurait démissionné' indicate?",
            "opts": ["The minister definitely resigned", "It is reportedly/allegedly the minister resigned (unconfirmed)", "The minister should resign", "The minister resigned yesterday"],
            "ans": 1,
            "exp": "The conditionnel passé (aurait + past participle) is used in French journalism to report unconfirmed information. 'Le ministre aurait démissionné' = the minister has reportedly resigned (not yet confirmed). This is called the 'conditionnel journalistique'."
          }
        ]
      },
      {
        "id": "fr-l61",
        "title": "Prononciation — registre et intonation",
        "icon": "🎶",
        "cards": [
          {
            "type": "info",
            "title": "Word stress in French",
            "body": "<p>Unlike English, French does NOT stress individual words — stress falls on the <strong>last syllable of a rhythmic group</strong> (phrase):</p><ul><li>English: <em>IM-por-tant</em> (variable stress)</li><li>French: <em>im-por-TANT</em> in isolation; in a sentence stress goes on the last content word's last syllable</li></ul><p>This gives French its characteristic even, flowing rhythm. Example: 'Je mange une pomme' — stress falls on <em>pomme's</em> last syllable.</p>"
          },
          {
            "type": "info",
            "title": "Register: spoken vs written French",
            "body": "<p>French has significant differences between formal/written and informal/spoken registers:</p><table><tr><th>Feature</th><th>Formal/written</th><th>Informal/spoken</th></tr><tr><td>Negation</td><td>Je ne sais pas.</td><td>Je sais pas. / Chais pas.</td></tr><tr><td>Questions</td><td>As-tu vu ? / Est-ce que tu as vu ?</td><td>T'as vu ?</td></tr><tr><td>Il y a</td><td>Il y a un problème.</td><td>Y'a un problème.</td></tr><tr><td>Nous</td><td>Nous allons.</td><td>On y va.</td></tr></table>"
          },
          {
            "type": "info",
            "title": "Intonation and the schwa",
            "body": "<p><strong>Intonation patterns:</strong></p><ul><li>Yes/no questions: rising intonation at end ↗</li><li>Information questions (où, quand, comment): falling intonation ↘</li></ul><p><strong>Schwa /ə/ reduction in fast speech:</strong></p><ul><li>'je ne le veux pas' → /ʒnlvøpa/</li><li>'tu' → 't'' before vowel: 't'as mangé ?'</li><li>'il y a' → 'y'a': 'y'a pas de problème'</li></ul><p>In formal speech all schwas are pronounced; in casual speech many drop — both are natural in their contexts.</p>"
          }
        ],
        "check": [
          {
            "q": "Where does stress fall in French?",
            "opts": ["On the first syllable of a word (like English)", "On the last syllable of a rhythmic group/phrase", "On the syllable with an accent mark", "French has no stress — every syllable is equal"],
            "ans": 1,
            "exp": "French stress falls on the LAST syllable of a rhythmic group. Individual words have no fixed stress. This gives French its smooth, flowing rhythm — very different from English's variable stress patterns."
          },
          {
            "q": "In informal spoken French, 'je ne sais pas' often becomes what?",
            "opts": ["je ne sais", "je sais pas", "j'ne sais pas", "ne sais pas"],
            "ans": 1,
            "exp": "'Je sais pas' — the 'ne' is dropped. This is standard in casual spoken French. In very fast speech: 'chais pas'. Always write 'je ne sais pas' in formal contexts."
          },
          {
            "q": "In formal French, how would you turn 'tu as vu le film' into a question?",
            "opts": ["T'as vu le film ?", "Tu as vu le film ? (rising intonation)", "As-tu vu le film ?", "Est-ce que t'as vu le film ?"],
            "ans": 2,
            "exp": "'As-tu vu le film ?' uses inversion — the most formal question structure. 'Est-ce que tu as vu le film ?' is also formal/standard. Rising intonation alone is informal; 'T'as vu' is very casual."
          },
          {
            "q": "What is the 'conditionnel journalistique' used for?",
            "opts": ["To express polite requests", "To report unconfirmed information in news", "To describe past habits", "To make formal complaints"],
            "ans": 1,
            "exp": "The journalistic conditional (aurait + past participle) signals unconfirmed information: 'Le ministre aurait démissionné' = the minister has reportedly resigned. It is very common in French news media."
          }
        ]
      },
      {
        "id": "fr-l64",
        "title": "Ordre des mots — B1",
        "icon": "🔀",
        "cards": [
          {
            "type": "info",
            "title": "Relative pronouns and word order",
            "body": "<p>Relative clauses follow the noun they describe:</p><table><tr><th>Pronoun</th><th>Replaces</th><th>Example</th></tr><tr><td>qui</td><td>subject</td><td>l'homme <strong>qui</strong> parle</td></tr><tr><td>que/qu'</td><td>direct object</td><td>le livre <strong>que</strong> je lis</td></tr><tr><td>dont</td><td>de + noun</td><td>la maison <strong>dont</strong> je rêve</td></tr><tr><td>où</td><td>place/time</td><td>le jour <strong>où</strong> il est parti</td></tr></table><p>Word order inside the relative clause is normal: subject + verb + rest.</p>"
          },
          {
            "type": "info",
            "title": "Pronoun placement in complex tenses",
            "body": "<p>Object pronouns before the AUXILIARY in compound tenses:</p><ul><li>Je <strong>l'</strong>ai vu. (I saw him.) — pronoun before ai</li><li>Je <strong>ne l'</strong>ai <strong>pas</strong> vu. (I didn't see him.) — ne + pronoun + ai + pas</li><li>Je <strong>lui en</strong> ai parlé. (I spoke to him about it.) — double pronoun before auxiliary</li></ul><p>Pronoun order before verb: <strong>me/te/se/nous/vous → le/la/les → lui/leur → y → en</strong></p><p>In infinitive constructions: pronoun before the infinitive: <em>Je vais <strong>le</strong> voir.</em></p>"
          },
          {
            "type": "info",
            "title": "Subjunctive and conditional word order",
            "body": "<p><strong>Subjunctive</strong>: triggered after certain verbs/expressions — word order inside is normal:</p><ul><li>Il faut que + tu <strong>sois</strong> là.</li><li>Je veux que + elle <strong>vienne</strong>.</li></ul><p><strong>Conditionnel passé</strong> (what would have happened):</p><ul><li>Subject + conditional auxiliary + past participle: <em>Nous <strong>aurions pu</strong> finir plus tôt.</em></li></ul><p><strong>Y and EN</strong> pronouns go before the verb (after ne in negation):</p><ul><li>J'<strong>y</strong> vais tous les jours.</li><li>Je n'<strong>en</strong> ai plus.</li></ul>"
          }
        ],
        "check": [
          {
            "q": "In 'C'est la maison dont je rêve', what does 'dont' replace?",
            "opts": ["qui — the subject of rêver", "que — the direct object of rêver", "de + la maison — because rêver takes 'de'", "où — the location"],
            "ans": 2,
            "exp": "'Dont' replaces 'de + la maison'. 'Rêver de' = to dream of. Whenever the verb takes 'de', use 'dont' as the relative pronoun: rêver de, parler de, avoir besoin de → dont."
          },
          {
            "q": "Where does the object pronoun go in 'I didn't see him' (Je ne l'ai pas vu)?",
            "opts": ["Je ne ai l' pas vu", "Je ne l'ai pas vu", "Je l'ne ai pas vu", "Je ne ai pas l'vu"],
            "ans": 1,
            "exp": "Je ne l'ai pas vu. The pronoun 'l'' goes between 'ne' and the auxiliary 'ai'. Negation: ne + pronoun + auxiliary + pas + past participle. The pronoun always stays right before the auxiliary."
          },
          {
            "q": "What is the correct order in 'It is necessary that you be on time' (Il faut que tu sois à l'heure)?",
            "opts": ["Il faut que sois tu à l'heure", "Il faut que tu sois à l'heure", "Que il faut tu sois à l'heure", "Il faut tu que sois à l'heure"],
            "ans": 1,
            "exp": "Il faut que tu sois à l'heure. After 'il faut que', normal subject + verb order follows: tu sois (subjunctive of être). The subjunctive is triggered by 'il faut que' but the word order inside the clause is standard."
          }
        ]
      },
      {
        "id": "fr-l67",
        "title": "Écoute active — B1",
        "icon": "🎧",
        "cards": [
          {
            "type": "info",
            "title": "Listening for the subjunctive",
            "body": "<p>At B1 level, listen for subjunctive triggers — verbs that change the verb ending:</p><ul><li><strong>Il faut que</strong> + subjonctif: <em>Il faut que tu <strong>finisses</strong>.</em></li><li><strong>Je ne suis pas sûr que</strong> + subjonctif: <em>Je ne suis pas sûr que ce <strong>soit</strong> vrai.</em></li><li>Subjunctive endings for -ER verbs sound like the ils/elles form: fasse, aille, soit.</li></ul><p>Train your ear to catch <em>soit</em> (subjunctive of être) vs <em>est</em> (indicative).</p>"
          },
          {
            "type": "info",
            "title": "Listening for the conditionnel passé",
            "body": "<p>The conditionnel passé sounds like: conditional of avoir/être + past participle.</p><ul><li><em>Je n'<strong>aurais</strong> pas accepté.</em> = I wouldn't have accepted.</li><li><em>Il <strong>serait</strong> parti.</em> = He would have left.</li></ul><p>Key pattern: <strong>si + plus-que-parfait</strong> → <strong>conditionnel passé</strong></p><p>Listen for 'aurais/aurait/aurions' (avoir) and 'serais/serait' (être) before a past participle — that signals a conditionnel passé.</p>"
          },
          {
            "type": "info",
            "title": "French proverbs and set phrases",
            "body": "<p>B1 listening often includes idiomatic expressions:</p><ul><li><strong>C'est en forgeant qu'on devient forgeron.</strong> = Practice makes perfect.</li><li><strong>Il pleut des cordes.</strong> = It's raining cats and dogs.</li><li><strong>Avoir le cafard.</strong> = To feel blue/down.</li></ul><p>Key: the gérondif (<em>en + -ant</em>) expresses 'by doing something': <em>en forgeant</em> = by forging/smithing.</p>"
          }
        ],
        "check": [
          {
            "q": "In 'Je ne suis pas sûr que ce soit vrai', why is 'soit' used instead of 'est'?",
            "opts": ["It is a typo — 'est' is correct here", "Because 'ne pas être sûr que' triggers the subjunctive", "Because 'soit' is the future tense of être", "Because the sentence is negative"],
            "ans": 1,
            "exp": "'Soit' is the subjunctive of être. Verbs of doubt and uncertainty (ne pas être sûr que, douter que) trigger the subjunctive in the following clause. 'Est' would be used after certainty: 'Je suis sûr que c'est vrai.'"
          },
          {
            "q": "What tense is used in 'Si j'avais su, je n'aurais pas accepté'?",
            "opts": ["Imparfait + conditionnel présent", "Plus-que-parfait + conditionnel passé", "Passé composé + futur antérieur", "Subjonctif + conditionnel présent"],
            "ans": 1,
            "exp": "This is the past hypothetical: si + plus-que-parfait (j'avais su), then conditionnel passé (je n'aurais pas accepté). This structure expresses something that didn't happen: 'If I had known (but I didn't), I wouldn't have accepted (but I did).'"
          },
          {
            "q": "What does 'C'est en forgeant qu'on devient forgeron' literally mean?",
            "opts": ["Only blacksmiths can make things", "It is by forging that one becomes a blacksmith", "One must forge a new path in life", "Working with iron makes you strong"],
            "ans": 1,
            "exp": "Literal: 'It is by forging that one becomes a blacksmith.' The proverb means practice makes perfect. Structure: c'est en + gérondif (forgeant) + que = it is by [doing X] that..."
          }
        ]
      }
    ]
  },
];
