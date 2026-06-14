// french-data.js — vanilla JS data file for French study app
// Sets three globals: window.FR_TOPICS, window.FR_QUESTIONS, window.FR_LEARN_PATH

window.FR_TOPICS = [
  { id: 'fr-salut', name: 'Salutations',      short: 'Salutations',    icon: '👋', desc: 'Greetings and polite expressions' },
  { id: 'fr-vocab', name: 'Vocabulaire',       short: 'Vocabulaire',    icon: '📚', desc: 'Essential nouns and adjectives' },
  { id: 'fr-gram',  name: 'Grammaire',         short: 'Grammaire',      icon: '✏️', desc: 'French grammar rules and structures' },
  { id: 'fr-num',   name: 'Chiffres & temps',  short: 'Chiffres',       icon: '🔢', desc: 'Numbers, time and dates in French' },
  { id: 'fr-vie',   name: 'Vie quotidienne',   short: 'Vie quotidienne',icon: '🏠', desc: 'Daily life, shopping, transport and directions' },
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
];

window.FR_LEARN_PATH = [
  {
    id: 'fr-debut',
    title: 'Débuter en français',
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
    ],
  },
];
