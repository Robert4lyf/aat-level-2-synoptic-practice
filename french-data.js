// french-data.js — vanilla JS data file for French study app
// Sets three globals: window.FR_TOPICS, window.FR_QUESTIONS, window.FR_LEARN_PATH

window.FR_TOPICS = [
  { id: 'fr-salut', name: 'Salutations',      short: 'Salutations',    icon: '👋', desc: 'Greetings and polite expressions' },
  { id: 'fr-vocab', name: 'Vocabulaire',       short: 'Vocabulaire',    icon: '📚', desc: 'Essential nouns and adjectives' },
  { id: 'fr-gram',  name: 'Grammaire',         short: 'Grammaire',      icon: '✏️', desc: 'French grammar rules and structures' },
  { id: 'fr-num',   name: 'Chiffres & temps',  short: 'Chiffres',       icon: '🔢', desc: 'Numbers, time and dates in French' },
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

  // ── fr-vocab (fr-018 to fr-034) ──────────────────────────────────────────
  {
    id: 'fr-018', topic: 'fr-vocab', type: 'mcq',
    q: '"Rouge" means?',
    opts: ['Blue', 'Green', 'Red', 'Yellow'],
    ans: 2,
    exp: '"Rouge" is the French word for red.'
  },
  {
    id: 'fr-019', topic: 'fr-vocab', type: 'mcq',
    q: '"Bleu" means?',
    opts: ['Blue', 'Purple', 'Green', 'Brown'],
    ans: 0,
    exp: '"Bleu" is the French word for blue.'
  },
  {
    id: 'fr-020', topic: 'fr-vocab', type: 'mcq',
    q: '"Vert" means?',
    opts: ['Red', 'Green', 'Black', 'White'],
    ans: 1,
    exp: '"Vert" is the French word for green.'
  },
  {
    id: 'fr-021', topic: 'fr-vocab', type: 'mcq',
    q: '"Jaune" means?',
    opts: ['Orange', 'Yellow', 'Pink', 'Beige'],
    ans: 1,
    exp: '"Jaune" is the French word for yellow.'
  },
  {
    id: 'fr-022', topic: 'fr-vocab', type: 'mcq',
    q: '"Noir" means?',
    opts: ['White', 'Grey', 'Black', 'Brown'],
    ans: 2,
    exp: '"Noir" is the French word for black.'
  },
  {
    id: 'fr-023', topic: 'fr-vocab', type: 'mcq',
    q: '"Blanc" means?',
    opts: ['White', 'Black', 'Brown', 'Cream'],
    ans: 0,
    exp: '"Blanc" is the French word for white.'
  },
  {
    id: 'fr-024', topic: 'fr-vocab', type: 'mcq',
    q: 'What is "lundi"?',
    opts: ['Tuesday', 'Monday', 'Wednesday', 'Sunday'],
    ans: 1,
    exp: '"Lundi" is Monday in French.'
  },
  {
    id: 'fr-025', topic: 'fr-vocab', type: 'mcq',
    q: 'What is "vendredi"?',
    opts: ['Thursday', 'Saturday', 'Friday', 'Wednesday'],
    ans: 2,
    exp: '"Vendredi" is Friday in French.'
  },
  {
    id: 'fr-026', topic: 'fr-vocab', type: 'mcq',
    q: 'What is "dimanche"?',
    opts: ['Saturday', 'Sunday', 'Monday', 'Friday'],
    ans: 1,
    exp: '"Dimanche" is Sunday in French.'
  },
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
  {
    id: 'fr-034', topic: 'fr-vocab', type: 'mcq',
    q: 'What month is "mars"?',
    opts: ['January', 'February', 'March', 'April'],
    ans: 2,
    exp: '"Mars" is March in French.'
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

  // ── fr-num (fr-052 to fr-068) ────────────────────────────────────────────
  {
    id: 'fr-052', topic: 'fr-num', type: 'mcq',
    q: 'What is "cinq"?',
    opts: ['Four', 'Five', 'Six', 'Seven'],
    ans: 1,
    exp: '"Cinq" is the French word for five.'
  },
  {
    id: 'fr-053', topic: 'fr-num', type: 'mcq',
    q: 'What is "dix"?',
    opts: ['Eight', 'Nine', 'Ten', 'Eleven'],
    ans: 2,
    exp: '"Dix" is the French word for ten.'
  },
  {
    id: 'fr-054', topic: 'fr-num', type: 'mcq',
    q: 'What is "vingt"?',
    opts: ['Twelve', 'Fifteen', 'Twenty', 'Twenty-two'],
    ans: 2,
    exp: '"Vingt" is the French word for twenty.'
  },
  {
    id: 'fr-055', topic: 'fr-num', type: 'mcq',
    q: 'What is "trente"?',
    opts: ['Twenty', 'Thirty', 'Forty', 'Fifty'],
    ans: 1,
    exp: '"Trente" is the French word for thirty.'
  },
  {
    id: 'fr-056', topic: 'fr-num', type: 'mcq',
    q: 'What is "soixante-dix"?',
    opts: ['Sixty', 'Seventy', 'Eighty', 'Ninety'],
    ans: 1,
    exp: '"Soixante-dix" literally means sixty-ten, which equals seventy (70).'
  },
  {
    id: 'fr-057', topic: 'fr-num', type: 'mcq',
    q: 'How do you say 80 in French?',
    opts: ['Huitante', 'Octante', 'Quatre-vingts', 'Soixante-vingt'],
    ans: 2,
    exp: '80 in French is "quatre-vingts" (literally four-twenties).'
  },
  {
    id: 'fr-058', topic: 'fr-num', type: 'mcq',
    q: 'How do you say 90 in French?',
    opts: ['Nonante', 'Quatre-vingt-dix', 'Soixante-trente', 'Neuvante'],
    ans: 1,
    exp: '90 is "quatre-vingt-dix" (four-twenties-ten) in standard French.'
  },
  {
    id: 'fr-059', topic: 'fr-num', type: 'mcq',
    q: 'How do you say 100 in French?',
    opts: ['Millier', 'Centième', 'Cent', 'Centi'],
    ans: 2,
    exp: '"Cent" is the French word for one hundred (100).'
  },
  {
    id: 'fr-060', topic: 'fr-num', type: 'mcq',
    q: '"Premier / Première" means?',
    opts: ['Second', 'Third', 'First', 'Last'],
    ans: 2,
    exp: '"Premier" (masc) / "Première" (fem) means first — the 1st ordinal number.'
  },
  {
    id: 'fr-061', topic: 'fr-num', type: 'mcq',
    q: '"Deuxième" means?',
    opts: ['First', 'Second', 'Third', 'Fourth'],
    ans: 1,
    exp: '"Deuxième" means second (2nd ordinal).'
  },
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
  {
    id: 'fr-066', topic: 'fr-num', type: 'mcq',
    q: 'How do you write the date 3 January 2024 in French?',
    opts: ['January 3 2024', '3 janvier 2024', '2024-01-03', 'jan/03/2024'],
    ans: 1,
    exp: 'French dates are written day month year: "3 janvier 2024".'
  },
  {
    id: 'fr-067', topic: 'fr-num', type: 'mcq',
    q: 'What is "mardi"?',
    opts: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    ans: 1,
    exp: '"Mardi" is Tuesday in French.'
  },
  {
    id: 'fr-068', topic: 'fr-num', type: 'mcq',
    q: 'What is "septembre"?',
    opts: ['August', 'September', 'October', 'November'],
    ans: 1,
    exp: '"Septembre" is September in French.'
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
];

window.FR_LEARN_PATH = [
  // ═══════════════════════════════════════════════════════════════════════════
  // UNIT 1 — A1 Débutant
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'fr-a1',
    title: 'A1 — Débutant',
    lessons: [
      // ── Lesson 1 ────────────────────────────────────────────────────────
      {
        id: 'fr-l01',
        title: 'Saluer et se présenter',
        icon: '👋',
        cards: [
          {
            h: 'Bonjour & Salut',
            p: [
              'Use \'Bonjour\' (hello/good day) in formal contexts and \'Salut\' (hi) casually with friends.',
              'In formal speech always add \'Monsieur\', \'Madame\', or \'Mademoiselle\'.',
            ],
          },
          {
            h: 'Prendre congé',
            p: [
              '\'Au revoir\' is the standard goodbye.',
              '\'À bientôt\' = see you soon, \'À demain\' = see you tomorrow, \'À tout à l\'heure\' = see you later today.',
            ],
          },
          {
            h: 'Politesse essentielle',
            p: [
              '\'S\'il vous plaît\' (formal) and \'S\'il te plaît\' (informal) both mean please.',
              '\'Merci\' = thank you, \'De rien\' = you\'re welcome, \'Pardon\' or \'Excusez-moi\' = excuse me.',
            ],
          },
          {
            h: 'Se présenter',
            p: [
              'Say \'Je m\'appelle [name]\' to introduce yourself.',
              '\'Enchanté(e)\' means nice to meet you. Use \'Ça va?\' to ask how someone is informally.',
            ],
          },
        ],
        check: [
          {
            q: 'Which is the formal greeting?',
            opts: ['Salut', 'Bonjour', 'Ciao', 'Hé'],
            ans: 1,
            exp: '"Bonjour" is formal; "Salut" is informal.',
          },
          {
            q: 'What does "Au revoir" mean?',
            opts: ['See you soon', 'Goodbye', 'Good night', 'Hello'],
            ans: 1,
            exp: '"Au revoir" means goodbye.',
          },
          {
            q: '"Merci beaucoup" means?',
            opts: ['Please', 'You are welcome', 'Thank you very much', 'Excuse me'],
            ans: 2,
            exp: '"Merci beaucoup" = thank you very much.',
          },
          {
            q: 'How do you say "my name is" in French?',
            opts: ['Je suis', 'Je m\'appelle', 'Mon nom est (only)', 'J\'ai'],
            ans: 1,
            exp: '"Je m\'appelle" literally means "I call myself" and is the standard way to give your name.',
          },
          {
            q: '"De rien" means?',
            opts: ['Nothing matters', 'You\'re welcome', 'Please', 'Sorry'],
            ans: 1,
            exp: '"De rien" = you\'re welcome (literally "it\'s nothing").',
          },
        ],
      },

      // ── Lesson 2 ────────────────────────────────────────────────────────
      {
        id: 'fr-l02',
        title: 'Les articles et le genre',
        icon: '✏️',
        cards: [
          {
            h: 'Articles définis',
            p: [
              '\'Le\' is masculine singular (le livre), \'La\' is feminine singular (la table).',
              '\'Les\' is the plural for both genders (les livres, les tables).',
            ],
          },
          {
            h: 'Articles indéfinis',
            p: [
              '\'Un\' is masculine singular (un chien — a dog), \'Une\' is feminine singular (une maison — a house).',
              '\'Des\' is the plural indefinite (des amis — some friends).',
            ],
          },
          {
            h: 'Le genre des noms',
            p: [
              'French nouns are either masculine or feminine — there is no neuter.',
              'Tips: nouns ending in -tion, -sion, -ure, -ette are usually feminine; nouns ending in -age, -ment, -isme are usually masculine.',
            ],
          },
          {
            h: 'Accord des adjectifs',
            p: [
              'Adjectives agree in gender and number with the noun.',
              'Add -e for feminine (grand → grande), -s for plural (grand → grands), -es for feminine plural (grande → grandes).',
            ],
          },
        ],
        check: [
          {
            q: 'Which article goes with "livre" (masculine noun)?',
            opts: ['la', 'le', 'une', 'les'],
            ans: 1,
            exp: '"Le" is the masculine definite article.',
          },
          {
            q: '"Un/une" are what type of article?',
            opts: ['Definite', 'Indefinite', 'Partitive', 'Negative'],
            ans: 1,
            exp: '"Un" and "une" are indefinite articles meaning "a/an".',
          },
          {
            q: '"Les" is used when?',
            opts: ['Masculine singular', 'Feminine singular', 'Plural (both genders)', 'Before vowels only'],
            ans: 2,
            exp: '"Les" is the plural definite article for both masculine and feminine nouns.',
          },
          {
            q: 'The feminine form of "grand" is?',
            opts: ['Grands', 'Grande', 'Grandes', 'Grand'],
            ans: 1,
            exp: 'Add -e to make a masculine adjective feminine: grand → grande.',
          },
          {
            q: '"Des" is the plural of?',
            opts: ['le / la', 'un / une', 'du / de la', 'de'],
            ans: 1,
            exp: '"Des" is the plural of the indefinite articles un and une.',
          },
        ],
      },

      // ── Lesson 3 ────────────────────────────────────────────────────────
      {
        id: 'fr-l03',
        title: 'Les chiffres 1 à 20',
        icon: '🔢',
        cards: [
          {
            h: '1 à 10',
            p: [
              'un, deux, trois, quatre, cinq, six, sept, huit, neuf, dix',
              'Pronunciation tip: the final consonant of \'cinq\' (5) and \'sept\' (7) is pronounced.',
            ],
          },
          {
            h: '11 à 20',
            p: [
              'onze, douze, treize, quatorze, quinze, seize, dix-sept, dix-huit, dix-neuf, vingt',
              '11–16 are unique words; 17–19 are compounds of dix + number.',
            ],
          },
          {
            h: 'Dizaines',
            p: [
              'vingt (20), trente (30), quarante (40), cinquante (50), soixante (60)',
              'Then: soixante-dix (70), quatre-vingts (80), quatre-vingt-dix (90), cent (100).',
            ],
          },
          {
            h: 'Nombres ordinaux',
            p: [
              'premier/première (1st), deuxième (2nd), troisième (3rd), quatrième (4th), cinquième (5th).',
              'Most ordinals add \'-ième\' to the cardinal number.',
            ],
          },
        ],
        check: [
          {
            q: 'What is "huit"?',
            opts: ['Six', 'Seven', 'Eight', 'Nine'],
            ans: 2,
            exp: '"Huit" = eight.',
          },
          {
            q: 'What is "quinze"?',
            opts: ['Thirteen', 'Fourteen', 'Fifteen', 'Sixteen'],
            ans: 2,
            exp: '"Quinze" = fifteen.',
          },
          {
            q: 'How do you say 70 in French?',
            opts: ['Septante', 'Soixante-dix', 'Soixante-douze', 'Huitante'],
            ans: 1,
            exp: 'French uses "soixante-dix" (sixty-ten) for 70.',
          },
          {
            q: 'How do you say 80 in French?',
            opts: ['Octante', 'Huitante', 'Quatre-vingts', 'Quatre-vingt-dix'],
            ans: 2,
            exp: '80 is "quatre-vingts" (four-twenties).',
          },
          {
            q: '"Deuxième" means?',
            opts: ['First', 'Second', 'Third', 'Fourth'],
            ans: 1,
            exp: '"Deuxième" = second (2nd ordinal).',
          },
        ],
      },

      // ── Lesson 4 ────────────────────────────────────────────────────────
      {
        id: 'fr-l04',
        title: 'Les couleurs',
        icon: '🎨',
        cards: [
          {
            h: 'Couleurs primaires',
            p: [
              'rouge (red), bleu (blue), jaune (yellow), blanc (white), noir (black).',
              'These are the most essential colours to know.',
            ],
          },
          {
            h: 'Autres couleurs',
            p: [
              'vert (green), orange (orange), rose (pink), violet (purple), gris (grey), marron (brown).',
              '\'Orange\' and \'marron\' are invariable — they do not change for gender or plural.',
            ],
          },
          {
            h: 'Accord des couleurs',
            p: [
              'Colour adjectives follow the noun in French: \'un chat noir\', \'une voiture rouge\'.',
              'Add -e for feminine (bleu → bleue), -s for plural (rouge → rouges). Exceptions: orange, marron stay unchanged.',
            ],
          },
        ],
        check: [
          {
            q: '"Rouge" means?',
            opts: ['Blue', 'Green', 'Red', 'Yellow'],
            ans: 2,
            exp: '"Rouge" = red.',
          },
          {
            q: 'What colour is "vert"?',
            opts: ['Yellow', 'Purple', 'Blue', 'Green'],
            ans: 3,
            exp: '"Vert" = green.',
          },
          {
            q: 'In French, where does the colour adjective go?',
            opts: ['Before the noun', 'After the noun', 'Either position, no difference', 'Never used'],
            ans: 1,
            exp: 'Colour adjectives follow the noun in French.',
          },
          {
            q: 'Which colour word does NOT change for feminine?',
            opts: ['Bleu', 'Noir', 'Orange', 'Rouge'],
            ans: 2,
            exp: '"Orange" (and "marron") are invariable adjectives — they do not add -e for feminine.',
          },
        ],
      },

      // ── Lesson 5 ────────────────────────────────────────────────────────
      {
        id: 'fr-l05',
        title: 'Les verbes essentiels',
        icon: '📖',
        cards: [
          {
            h: 'Être (to be)',
            p: [
              'je suis, tu es, il/elle est, nous sommes, vous êtes, ils/elles sont.',
              'Used for identity, nationality, profession: \'Je suis étudiant(e).\'',
            ],
          },
          {
            h: 'Avoir (to have)',
            p: [
              'j\'ai, tu as, il/elle a, nous avons, vous avez, ils/elles ont.',
              'Used for possession and age: \'J\'ai vingt ans\' (I am twenty years old).',
            ],
          },
          {
            h: 'Aller (to go)',
            p: [
              'je vais, tu vas, il/elle va, nous allons, vous allez, ils/elles vont.',
              'Also used to form the near future: \'Je vais manger\' (I am going to eat).',
            ],
          },
          {
            h: 'Faire (to do/make)',
            p: [
              'je fais, tu fais, il/elle fait, nous faisons, vous faites, ils/elles font.',
              'Used in many expressions: \'il fait beau\' (the weather is nice), \'faire du sport\' (to do sport).',
            ],
          },
        ],
        check: [
          {
            q: '"Je suis" uses which verb?',
            opts: ['avoir', 'aller', 'être', 'faire'],
            ans: 2,
            exp: '"Suis" is the first-person singular of être (to be).',
          },
          {
            q: '"Tu as" means?',
            opts: ['You go', 'You are', 'You have', 'You do'],
            ans: 2,
            exp: '"As" is the second-person singular of avoir (to have).',
          },
          {
            q: '"Nous allons" means?',
            opts: ['We are', 'We have', 'We go', 'We do'],
            ans: 2,
            exp: '"Allons" is the first-person plural of aller (to go).',
          },
          {
            q: 'Which verb is used to talk about age?',
            opts: ['être', 'faire', 'aller', 'avoir'],
            ans: 3,
            exp: 'In French, age uses avoir: "J\'ai 20 ans" (I have 20 years = I am 20).',
          },
          {
            q: '"Il fait beau" uses which verb?',
            opts: ['être', 'avoir', 'aller', 'faire'],
            ans: 3,
            exp: '"Faire" is used in weather expressions: "il fait beau/chaud/froid".',
          },
        ],
      },

      // ── Lesson 6 — Pronoms personnels + verbes en -ER ───────────────────
      {
        id: 'fr-l06',
        title: 'Pronoms personnels & verbes en -ER',
        icon: '🔄',
        cards: [
          {
            h: 'Les pronoms sujets',
            p: [
              'je (I), tu (you — informal), il/elle (he/she), nous (we), vous (you — formal/plural), ils/elles (they).',
              'Always use a subject pronoun before the verb in French — unlike Spanish, you cannot drop it.',
            ],
          },
          {
            h: 'Conjugaison des verbes en -ER',
            p: [
              'Pattern for parler (to speak): je parle, tu parles, il/elle parle, nous parlons, vous parlez, ils/elles parlent.',
              'Endings: -e, -es, -e, -ons, -ez, -ent. The -e, -es, and -ent endings are silent — parle/parles/parlent all sound alike.',
            ],
          },
          {
            h: 'Verbes fréquents en -ER',
            p: [
              'aimer (to like/love), habiter (to live), travailler (to work), manger (to eat), regarder (to watch), écouter (to listen), parler (to speak).',
              'All follow the same pattern as parler. Manger adds an -e in the nous form: nous mangeons.',
            ],
          },
          {
            h: 'Élision et liaison',
            p: [
              'Before a vowel or mute h, je becomes j\': j\'aime, j\'habite, j\'écoute.',
              'In "nous aimons", the s of nous links to the vowel (liaison): /nuz‿ɛmɔ̃/.',
            ],
          },
        ],
        check: [
          {
            q: '"Vous" form of "parler"?',
            opts: ['parlons', 'parlent', 'parlez', 'parles'],
            ans: 2,
            exp: '"Vous" takes "-ez" for -ER verbs: vous parlez.',
          },
          {
            q: '"Nous" form of "aimer"?',
            opts: ['aiment', 'aimez', 'aimes', 'aimons'],
            ans: 3,
            exp: '"Nous" takes "-ons": nous aimons.',
          },
          {
            q: '"Je" becomes "j\'" before?',
            opts: ['A consonant', 'A vowel or mute h', 'The verb être only', 'Any verb'],
            ans: 1,
            exp: 'Élision: je → j\' before a vowel sound (j\'aime, j\'habite).',
          },
          {
            q: 'Ending for "ils/elles" in -ER verbs?',
            opts: ['-ez', '-ons', '-ent', '-es'],
            ans: 2,
            exp: '"Ils/elles" takes "-ent": ils parlent. This ending is silent.',
          },
          {
            q: 'Which verb follows the standard -ER pattern?',
            opts: ['être', 'avoir', 'aller', 'habiter'],
            ans: 3,
            exp: '"Habiter" is a regular -ER verb. Être, avoir, aller are all irregular.',
          },
        ],
      },

      // ── Lesson 7 — La négation et l\'interrogation ───────────────────────
      {
        id: 'fr-l07',
        title: 'La négation et l\'interrogation',
        icon: '❓',
        cards: [
          {
            h: 'La négation: ne...pas',
            p: [
              'Wrap the conjugated verb with ne...pas: Je parle → Je ne parle pas.',
              'In informal spoken French the ne is often dropped: "Je parle pas" (speech only, not written).',
            ],
          },
          {
            h: 'Interrogation par intonation',
            p: [
              'The simplest way to ask a question: keep the same word order and raise your voice.',
              '"Tu parles français?" — identical to the statement, distinguished only by intonation.',
            ],
          },
          {
            h: 'Est-ce que',
            p: [
              'Add "est-ce que" before the subject for a neutral written or spoken question.',
              '"Est-ce que tu parles français?" — no inversion needed, correct in all registers.',
            ],
          },
          {
            h: 'L\'inversion',
            p: [
              'Swap the subject pronoun and verb, joined by a hyphen: Parles-tu français? (formal).',
              'Add -t- between vowels for pronunciation: Parle-t-il français? Mange-t-elle ici?',
            ],
          },
        ],
        check: [
          {
            q: '"I do not speak" in French?',
            opts: ['Je parle non', 'Je pas parle', 'Je ne parle pas', 'Ne je parle pas'],
            ans: 2,
            exp: 'Ne...pas wraps the verb: Je NE parle PAS.',
          },
          {
            q: '"Est-ce que" is placed?',
            opts: ['After the verb', 'Before the subject', 'At the end', 'After the object'],
            ans: 1,
            exp: '"Est-ce que" goes before the subject: Est-ce que tu parles?',
          },
          {
            q: 'Which is the most formal way to ask a question?',
            opts: ['Rising intonation', 'Est-ce que', 'Inversion (Parlez-vous?)', 'Adding "non?"'],
            ans: 2,
            exp: 'Inversion is the most formal interrogation structure.',
          },
          {
            q: 'In informal speech, what is often dropped from "ne...pas"?',
            opts: ['pas', 'ne', 'the verb', 'the subject'],
            ans: 1,
            exp: 'Informal spoken French often omits "ne": "Je sais pas" instead of "Je ne sais pas".',
          },
          {
            q: '"Mange-t-il?" — why the -t-?',
            opts: ['It is part of the verb', 'For pronunciation between two vowels', 'It is a spelling rule', 'It marks the formal register'],
            ans: 1,
            exp: '-t- is inserted between a verb ending in -e and a vowel-starting pronoun for easier pronunciation.',
          },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // UNIT 2 — A2 Élémentaire
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'fr-a2',
    title: 'A2 — Élémentaire',
    lessons: [

      // ── Lesson 8 — Le passé composé (avoir) ─────────────────────────────
      {
        id: 'fr-l08',
        title: 'Le passé composé — avec avoir',
        icon: '⏪',
        cards: [
          {
            h: 'Formation',
            p: [
              'Passé composé = avoir (present) + past participle.',
              'j\'ai, tu as, il/elle a, nous avons, vous avez, ils/elles ont + past participle.',
            ],
          },
          {
            h: 'Participes passés réguliers',
            p: [
              '-ER verbs → -é: parler → parlé, manger → mangé, aimer → aimé.',
              '-IR verbs → -i: finir → fini, choisir → choisi.',
              '-RE verbs → -u: vendre → vendu, répondre → répondu.',
            ],
          },
          {
            h: 'Participes passés irréguliers',
            p: [
              'Common irregular past participles to memorise:',
              'faire → fait, voir → vu, lire → lu, dire → dit, prendre → pris, avoir → eu, être → été, pouvoir → pu, savoir → su.',
            ],
          },
          {
            h: 'Usage',
            p: [
              'Use passé composé for completed past actions with a clear end point.',
              '"Hier, j\'ai mangé une pizza." (Yesterday, I ate a pizza.) / "Nous avons vu ce film." (We saw that film.)',
            ],
          },
        ],
        check: [
          {
            q: 'Passé composé = avoir + ?',
            opts: ['Infinitive', 'Present participle', 'Past participle', 'Imparfait form'],
            ans: 2,
            exp: 'Passé composé is formed with the present tense of avoir + the past participle.',
          },
          {
            q: 'Past participle of "finir"?',
            opts: ['finant', 'finu', 'finis', 'fini'],
            ans: 3,
            exp: '-IR verbs form the past participle by replacing -ir with -i: finir → fini.',
          },
          {
            q: 'Past participle of "faire"?',
            opts: ['faisé', 'faisit', 'fait', 'fairu'],
            ans: 2,
            exp: '"Faire" has an irregular past participle: fait.',
          },
          {
            q: '"Nous avons vu" — "vu" is the past participle of?',
            opts: ['vouloir', 'venir', 'voir', 'vivre'],
            ans: 2,
            exp: '"Vu" is the irregular past participle of voir (to see).',
          },
          {
            q: 'Past participle of "parler"?',
            opts: ['parlant', 'parlu', 'parlé', 'parlis'],
            ans: 2,
            exp: '-ER verbs replace -er with -é: parler → parlé.',
          },
        ],
      },

      // ── Lesson 9 — Le passé composé (être) ──────────────────────────────
      {
        id: 'fr-l09',
        title: 'Le passé composé — avec être',
        icon: '🚶',
        cards: [
          {
            h: 'Verbes avec être',
            p: [
              'About 17 intransitive verbs of motion and change of state use être. Remember them as DR MRS VANDERTRAMP:',
              'Devenir, Revenir, Mourir, Rester, Sortir, Venir, Aller, Naître, Descendre, Entrer, Rentrer, Tomber, Retourner, Arriver, Monter, Partir, Passer.',
            ],
          },
          {
            h: 'Accord du participe passé',
            p: [
              'With être, the past participle agrees with the SUBJECT in gender and number.',
              'il est allé / elle est allée / ils sont allés / elles sont allées.',
            ],
          },
          {
            h: 'Verbes réfléchis (pronominaux)',
            p: [
              'All reflexive/pronominal verbs also use être in passé composé.',
              'Je me suis levé(e). Nous nous sommes vus.',
            ],
          },
          {
            h: 'Exemples en contexte',
            p: [
              'Il est parti hier soir. (He left last night.)',
              'Elles sont arrivées ce matin. (They [fem] arrived this morning.)',
              'Je me suis couché(e) tard. (I went to bed late.)',
            ],
          },
        ],
        check: [
          {
            q: '"Je suis allé(e)" uses which auxiliary?',
            opts: ['avoir', 'être', 'aller', 'faire'],
            ans: 1,
            exp: '"Aller" is a DR MRS VANDERTRAMP verb and uses être in passé composé.',
          },
          {
            q: 'Past participle of "partir"?',
            opts: ['partu', 'partis', 'parti', 'parte'],
            ans: 2,
            exp: 'The past participle of "partir" is "parti" (-i). With être: elle est partie.',
          },
          {
            q: '"Elle est arrivée" — why the extra -e on "arrivée"?',
            opts: ['It is always added', 'Agreement with a feminine subject (être auxiliary)', 'It is irregular', 'It shows plural'],
            ans: 1,
            exp: 'With être, the past participle agrees with the subject: elle (feminine) → arrivée.',
          },
          {
            q: 'Reflexive verbs use which auxiliary in passé composé?',
            opts: ['avoir', 'être', 'aller', 'faire'],
            ans: 1,
            exp: 'All pronominal/reflexive verbs use être: je me suis levé(e).',
          },
          {
            q: 'Which verb uses être in passé composé?',
            opts: ['parler', 'finir', 'aller', 'vendre'],
            ans: 2,
            exp: '"Aller" (to go) is a DR MRS VANDERTRAMP verb and uses être. The others use avoir.',
          },
        ],
      },

      // ── Lesson 10 — L\'imparfait ─────────────────────────────────────────
      {
        id: 'fr-l10',
        title: 'L\'imparfait',
        icon: '🔁',
        cards: [
          {
            h: 'Formation',
            p: [
              'Take the nous form of the present tense, drop -ons, then add imparfait endings.',
              'Endings: -ais, -ais, -ait, -ions, -iez, -aient.',
            ],
          },
          {
            h: 'Exemple: parler',
            p: [
              'Nous parlons → stem: parl-',
              'je parlais, tu parlais, il/elle parlait, nous parlions, vous parliez, ils/elles parlaient.',
            ],
          },
          {
            h: 'Être — exception',
            p: [
              '"Être" is the only verb with an irregular imparfait stem: ét-.',
              'j\'étais, tu étais, il était, nous étions, vous étiez, ils étaient.',
            ],
          },
          {
            h: 'Usage',
            p: [
              'Use imparfait for: (1) ongoing background actions, (2) habitual/repeated past actions, (3) descriptions in the past.',
              '"Il pleuvait" (it was raining — background) vs "Il a plu" (it rained — single completed event).',
            ],
          },
        ],
        check: [
          {
            q: 'The imparfait stem comes from?',
            opts: ['The infinitive', 'The ils/elles present form', 'The nous present form (drop -ons)', 'The past participle'],
            ans: 2,
            exp: 'Remove -ons from the nous form of the present tense to get the imparfait stem.',
          },
          {
            q: '"je" ending in the imparfait?',
            opts: ['-e', '-ais', '-ai', '-ait'],
            ans: 1,
            exp: 'Imparfait endings for je: -ais (je parlais, je finissais).',
          },
          {
            q: 'Imparfait of "être" for "je"?',
            opts: ['suis', 'serai', 'serais', 'étais'],
            ans: 3,
            exp: '"Être" has an irregular imparfait stem ét-: j\'étais.',
          },
          {
            q: 'Imparfait is used for?',
            opts: ['A single completed past action', 'Ongoing or habitual past actions / descriptions', 'Future plans', 'Polite requests'],
            ans: 1,
            exp: 'Imparfait = ongoing, habitual, or descriptive past. Passé composé = completed event.',
          },
          {
            q: 'Which sentence correctly uses imparfait for a habitual past?',
            opts: ['Hier, il est parti tôt.', 'Demain, je parlerai.', 'Quand j\'étais jeune, je jouais au foot.', 'Elle a mangé une pomme.'],
            ans: 2,
            exp: '"Je jouais" = I used to play — a repeated habit in the past, expressed with imparfait.',
          },
        ],
      },

      // ── Lesson 11 — Le futur proche et le futur simple ──────────────────
      {
        id: 'fr-l11',
        title: 'Le futur proche & le futur simple',
        icon: '🔮',
        cards: [
          {
            h: 'Futur proche',
            p: [
              'Aller (present) + infinitif = planned or imminent action.',
              'Je vais manger. / Nous allons partir demain. / Il va pleuvoir.',
            ],
          },
          {
            h: 'Futur simple — formation',
            p: [
              'Add these endings to the infinitive: -ai, -as, -a, -ons, -ez, -ont.',
              '-RE verbs drop the final -e before adding endings: vendre → vendr- → je vendrai.',
            ],
          },
          {
            h: 'Futur simple — exemple',
            p: [
              'parler: je parlerai, tu parleras, il parlera, nous parlerons, vous parlerez, ils parleront.',
            ],
          },
          {
            h: 'Stems irréguliers',
            p: [
              'être → ser-, avoir → aur-, aller → ir-, faire → fer-, venir → viendr-, pouvoir → pourr-, vouloir → voudr-.',
              'The endings are always regular: add -ai, -as, -a, -ons, -ez, -ont to these irregular stems.',
            ],
          },
        ],
        check: [
          {
            q: '"Je vais partir" — which tense?',
            opts: ['Futur simple', 'Futur proche', 'Conditionnel', 'Présent'],
            ans: 1,
            exp: 'Futur proche = aller (présent) + infinitif. Je vais partir = I am going to leave.',
          },
          {
            q: 'Futur simple of "parler" for "je"?',
            opts: ['parlais', 'parle', 'parlé', 'parlerai'],
            ans: 3,
            exp: 'Futur simple: infinitive + -ai. parler → je parlerai.',
          },
          {
            q: 'Irregular futur simple stem of "être"?',
            opts: ['êtr-', 'ét-', 'ser-', 'est-'],
            ans: 2,
            exp: '"Être" has the irregular futur stem ser-: je serai, tu seras...',
          },
          {
            q: 'Which tense uses "aller + infinitif"?',
            opts: ['Futur simple', 'Futur proche', 'Imparfait', 'Conditionnel'],
            ans: 1,
            exp: 'Futur proche is formed with the present tense of aller + infinitive.',
          },
          {
            q: '"Ils partiront" means?',
            opts: ['They left', 'They were leaving', 'They will leave', 'They are leaving'],
            ans: 2,
            exp: '"Partiront" is the futur simple (ils form) of partir: they will leave.',
          },
        ],
      },

      // ── Lesson 12 — Les verbes pronominaux ──────────────────────────────
      {
        id: 'fr-l12',
        title: 'Les verbes pronominaux',
        icon: '🪞',
        cards: [
          {
            h: 'Qu\'est-ce qu\'un verbe pronominal ?',
            p: [
              'A pronominal verb includes a reflexive pronoun referring back to the subject.',
              'Reflexive pronouns: me (myself), te (yourself), se (himself/herself/themselves), nous (ourselves), vous (yourselves).',
            ],
          },
          {
            h: 'Conjugaison: se lever',
            p: [
              'je me lève, tu te lèves, il/elle se lève, nous nous levons, vous vous levez, ils/elles se lèvent.',
              'The reflexive pronoun always matches the subject.',
            ],
          },
          {
            h: 'Verbes pronominaux courants',
            p: [
              'se lever (get up), se laver (wash oneself), se coucher (go to bed), s\'habiller (get dressed), se souvenir (remember), s\'appeler (be called), se reposer (rest).',
            ],
          },
          {
            h: 'Passé composé',
            p: [
              'Pronominal verbs always use être in passé composé.',
              'Je me suis levé(e). Elle s\'est habillée. Ils se sont levés.',
            ],
          },
        ],
        check: [
          {
            q: '"Se coucher" means?',
            opts: ['To lie down/go to bed', 'To cook', 'To cut', 'To run'],
            ans: 0,
            exp: '"Se coucher" = to go to bed / to lie down.',
          },
          {
            q: 'Reflexive pronoun for "nous"?',
            opts: ['se', 'nous', 'me', 'vous'],
            ans: 1,
            exp: 'The reflexive pronoun for nous is also "nous": nous nous levons.',
          },
          {
            q: '"Je me lève" means?',
            opts: ['I am lying down', 'I wash myself', 'I get up', 'I go to bed'],
            ans: 2,
            exp: '"Je me lève" = I get up (from se lever).',
          },
          {
            q: 'Pronominal verbs use which auxiliary in passé composé?',
            opts: ['avoir', 'être', 'aller', 'faire'],
            ans: 1,
            exp: 'All pronominal verbs use être: je me suis levé(e).',
          },
          {
            q: 'Reflexive pronoun for "tu"?',
            opts: ['se', 'me', 'te', 'vous'],
            ans: 2,
            exp: 'The reflexive pronoun for tu is "te": tu te lèves.',
          },
        ],
      },

      // ── Lesson 13 — Les pronoms COD et COI ──────────────────────────────
      {
        id: 'fr-l13',
        title: 'Les pronoms COD et COI',
        icon: '🔗',
        cards: [
          {
            h: 'Pronoms COD (objet direct)',
            p: [
              'Replace a direct object noun: me, te, le/la, nous, vous, les.',
              '"Je vois Marie" → "Je la vois." (I see her.) / "Il mange le gâteau" → "Il le mange."',
            ],
          },
          {
            h: 'Pronoms COI (objet indirect)',
            p: [
              'Replace à + person: me, te, lui, nous, vous, leur.',
              '"Je parle à Pierre" → "Je lui parle." (I speak to him.) / "Elle téléphone à ses amis" → "Elle leur téléphone."',
            ],
          },
          {
            h: 'Position',
            p: [
              'Object pronouns go BEFORE the conjugated verb (or the auxiliary in compound tenses).',
              '"Je le mange." / "Je l\'ai mangé." / "Je ne le vois pas."',
            ],
          },
          {
            h: 'COD vs COI',
            p: [
              'COD: verb takes a direct object with no preposition — voir, manger, aimer, connaître, regarder.',
              'COI: verb takes à + person — parler à, téléphoner à, donner à, écrire à, répondre à.',
            ],
          },
        ],
        check: [
          {
            q: '"Je le vois" — "le" is which type of pronoun?',
            opts: ['COI (indirect object)', 'COD (direct object)', 'Reflexive', 'Relative'],
            ans: 1,
            exp: '"Le" is the masculine singular COD (direct object pronoun).',
          },
          {
            q: 'COI pronoun for "he / she"?',
            opts: ['lui', 'le', 'la', 'leur'],
            ans: 0,
            exp: '"Lui" is the COI pronoun for he/she: Je lui parle = I speak to him/her.',
          },
          {
            q: '"Nous leur parlons" — "leur" means?',
            opts: ['To him', 'To her', 'To them', 'For us'],
            ans: 2,
            exp: '"Leur" is the plural COI pronoun meaning "to them".',
          },
          {
            q: 'Where do COD/COI pronouns go?',
            opts: ['After the verb', 'Before the conjugated verb', 'At the end of the sentence', 'After the subject'],
            ans: 1,
            exp: 'Object pronouns go directly before the conjugated verb: Je le mange.',
          },
          {
            q: '"Je lui téléphone" — why "lui" not "le"?',
            opts: ['"Lui" is masculine', '"Téléphoner" takes à (indirect object)', '"Le" is only for objects', '"Lui" is always used after verbs'],
            ans: 1,
            exp: '"Téléphoner à" takes an indirect object (à + person), so the COI "lui" is correct.',
          },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // UNIT 3 — B1 Intermédiaire
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'fr-b1',
    title: 'B1 — Intermédiaire',
    lessons: [

      // ── Lesson 14 — Le conditionnel présent ─────────────────────────────
      {
        id: 'fr-l14',
        title: 'Le conditionnel présent',
        icon: '💭',
        cards: [
          {
            h: 'Formation',
            p: [
              'Conditionnel présent = futur simple stem + imparfait endings.',
              'Endings: -ais, -ais, -ait, -ions, -iez, -aient (same as imparfait).',
            ],
          },
          {
            h: 'Exemple: parler',
            p: [
              'je parlerais, tu parlerais, il/elle parlerait, nous parlerions, vous parleriez, ils/elles parleraient.',
              'Irregular stems are the same as futur simple: être → ser-, avoir → aur-, aller → ir-, faire → fer-.',
            ],
          },
          {
            h: 'Usage 1 — politesse',
            p: [
              'The conditionnel softens requests and makes them more polite.',
              '"Je voudrais un café, s\'il vous plaît." (I would like a coffee.) — much more polite than "Je veux".',
            ],
          },
          {
            h: 'Usage 2 — hypothèse',
            p: [
              'Si + imparfait → conditionnel for hypothetical "if" sentences.',
              '"Si j\'avais de l\'argent, j\'achèterais une voiture." (If I had money, I would buy a car.)',
            ],
          },
        ],
        check: [
          {
            q: 'Conditionnel endings are the same as?',
            opts: ['Futur simple', 'Présent', 'Imparfait', 'Subjonctif'],
            ans: 2,
            exp: 'Conditionnel = futur stem + imparfait endings (-ais, -ais, -ait, -ions, -iez, -aient).',
          },
          {
            q: 'Conditionnel uses stems from which tense?',
            opts: ['Présent', 'Imparfait', 'Futur simple', 'Passé composé'],
            ans: 2,
            exp: 'The conditionnel uses the same stems as the futur simple.',
          },
          {
            q: '"Je voudrais" expresses?',
            opts: ['A past action', 'A polite request', 'A habitual action', 'A completed event'],
            ans: 1,
            exp: '"Je voudrais" (conditionnel of vouloir) = I would like — used for polite requests.',
          },
          {
            q: '"Si j\'avais le temps, je ___" — which tense fills the blank?',
            opts: ['Futur simple', 'Présent', 'Imparfait', 'Conditionnel présent'],
            ans: 3,
            exp: 'Si + imparfait → conditionnel: Si j\'avais le temps, je voyagerais.',
          },
          {
            q: 'Conditionnel of "être" for "elle"?',
            opts: ['sera', 'était', 'soit', 'serait'],
            ans: 3,
            exp: '"Être" conditionnel stem = ser-. elle serait = she would be.',
          },
        ],
      },

      // ── Lesson 15 — Le subjonctif présent ───────────────────────────────
      {
        id: 'fr-l15',
        title: 'Le subjonctif présent',
        icon: '🌀',
        cards: [
          {
            h: 'Formation',
            p: [
              'Take the ils/elles form of the present tense, drop -ent, add subjonctif endings.',
              'Endings: -e, -es, -e, -ions, -iez, -ent.',
            ],
          },
          {
            h: 'Exemple: parler',
            p: [
              'ils parlent → stem: parl-',
              'que je parle, que tu parles, qu\'il parle, que nous parlions, que vous parliez, qu\'ils parlent.',
            ],
          },
          {
            h: 'Verbes déclencheurs',
            p: [
              'The subjonctif is triggered by: vouloir que, il faut que, souhaiter que, douter que, être content(e) que.',
              'And conjunctions: bien que (although), pour que (so that), à moins que (unless), avant que (before).',
            ],
          },
          {
            h: 'Subjonctifs irréguliers',
            p: [
              'Key irregular subjonctifs: être → soit, avoir → ait, aller → aille, faire → fasse, pouvoir → puisse, savoir → sache.',
            ],
          },
        ],
        check: [
          {
            q: 'The subjonctif stem comes from?',
            opts: ['The infinitive', 'The nous present (drop -ons)', 'The ils/elles present (drop -ent)', 'The past participle'],
            ans: 2,
            exp: 'Subjonctif stem = ils/elles present form minus -ent.',
          },
          {
            q: '"Il faut que" triggers which mood?',
            opts: ['Indicatif', 'Conditionnel', 'Subjonctif', 'Infinitif'],
            ans: 2,
            exp: '"Il faut que" always requires the subjonctif.',
          },
          {
            q: 'Subjonctif of "être" for "il"?',
            opts: ['est', 'était', 'serait', 'soit'],
            ans: 3,
            exp: '"Être" has an irregular subjonctif: que je sois, que tu sois, qu\'il soit.',
          },
          {
            q: '"bien que" (although) is followed by?',
            opts: ['Indicatif', 'Conditionnel', 'Infinitif', 'Subjonctif'],
            ans: 3,
            exp: '"Bien que" always takes the subjonctif: bien qu\'il soit tard.',
          },
          {
            q: '"que je parle" — "parle" is which mood?',
            opts: ['Indicatif présent', 'Imparfait', 'Subjonctif', 'Conditionnel'],
            ans: 2,
            exp: 'After "que" following a trigger verb, the verb is in the subjonctif.',
          },
        ],
      },

      // ── Lesson 16 — Les pronoms relatifs ────────────────────────────────
      {
        id: 'fr-l16',
        title: 'Les pronoms relatifs',
        icon: '🔀',
        cards: [
          {
            h: 'qui — sujet',
            p: [
              '"Qui" replaces the SUBJECT of the relative clause.',
              '"L\'homme qui parle est mon professeur." (The man who speaks is my teacher.)',
            ],
          },
          {
            h: 'que — objet direct',
            p: [
              '"Que" replaces the DIRECT OBJECT of the relative clause.',
              '"Le film que je regarde est passionnant." (The film that I am watching is fascinating.)',
            ],
          },
          {
            h: 'dont — après "de"',
            p: [
              '"Dont" replaces de + noun, used after verbs and expressions that require de.',
              '"Le livre dont j\'ai besoin." (avoir besoin de) / "La femme dont il parle." (parler de)',
            ],
          },
          {
            h: 'où — lieu ou temps',
            p: [
              '"Où" replaces a place or time expression.',
              '"Le restaurant où nous mangeons." (where) / "Le jour où je suis arrivé." (when)',
            ],
          },
        ],
        check: [
          {
            q: '"L\'homme ___ parle" — subject relative pronoun?',
            opts: ['que', 'dont', 'où', 'qui'],
            ans: 3,
            exp: '"Qui" is the subject relative pronoun: l\'homme qui parle.',
          },
          {
            q: '"Le livre ___ je lis" — direct object relative pronoun?',
            opts: ['qui', 'dont', 'où', 'que'],
            ans: 3,
            exp: '"Que" is the direct object relative pronoun: le livre que je lis.',
          },
          {
            q: '"dont" is used after expressions with?',
            opts: ['à', 'de', 'en', 'par'],
            ans: 1,
            exp: '"Dont" replaces de + noun: avoir besoin de → dont j\'ai besoin.',
          },
          {
            q: '"Le pays ___ je vis" — which relative pronoun?',
            opts: ['qui', 'que', 'dont', 'où'],
            ans: 3,
            exp: '"Où" is used for place or time: le pays où je vis = the country where I live.',
          },
          {
            q: '"qui" vs "que" — which replaces the SUBJECT?',
            opts: ['que', 'qui', 'Both can', 'Neither'],
            ans: 1,
            exp: '"Qui" = subject; "que" = direct object. L\'homme qui parle / Le livre que je lis.',
          },
        ],
      },
    ],
  },
];
