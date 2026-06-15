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
  },,
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
  {"id":"fr-135","topic":"fr-vocab","type":"mcq","q":"« marron » is a:","opts":["fruit","colour (brown)","animal","month"],"ans":1,"exp":"marron = brown (an invariable colour)."},
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
  {"id":"fr-155","topic":"fr-num","type":"mcq","q":"How do you say « the 1st of May »?","opts":["le un mai","le premier mai","le première mai","premier mai"],"ans":1,"exp":"Only the 1st uses « premier »: le premier mai."},
  {"id":"fr-156","topic":"fr-num","type":"mcq","q":"Which is the first day of the French week?","opts":["dimanche","lundi","samedi","mardi"],"ans":1,"exp":"The week starts on lundi (Monday)."},
  {"id":"fr-157","topic":"fr-num","type":"mcq","q":"14:30 in 24-hour French is:","opts":["deux heures trente","quatorze heures trente","quatre heures trente","quatorze et demie"],"ans":1,"exp":"quatorze heures trente = 14:30."},
  {"id":"fr-158","topic":"fr-num","type":"mcq","q":"« quatre-vingt-dix » = ","opts":["80","90","70","100"],"ans":1,"exp":"4×20 + 10 = 90."},
  {"id":"fr-159","topic":"fr-num","type":"dragdrop","q":"Match the month to English:","pairs":[{"left":"janvier","right":"January"},{"left":"avril","right":"April"},{"left":"juillet","right":"July"},{"left":"octobre","right":"October"}],"exp":"French months (lowercase)."},
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
  {"id":"fr-182","topic":"fr-conj","type":"mcq","q":"Conditionnel of « vouloir » for politeness:","opts":["je veux","je voudrais","je voulais","je voudrai"],"ans":1,"exp":"je voudrais = I would like (polite)."}
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
        "id": "fr-l06",
        "title": "Les nombres de 0 à 100",
        "icon": "🔢",
        "cards": [
          {
            "h": "0 à 20",
            "p": [
              "zéro, un, deux, trois, quatre, cinq, six, sept, huit, neuf, dix.",
              "onze, douze, treize, quatorze, quinze, seize, dix-sept, dix-huit, dix-neuf, vingt."
            ],
            "callout": {
              "kind": "tip",
              "text": "11–16 are unique words; 17–19 are simply dix + sept/huit/neuf."
            }
          },
          {
            "h": "Les dizaines",
            "example": {
              "title": "Tens",
              "rows": [
                [
                  "20 / 30 / 40",
                  "vingt / trente / quarante"
                ],
                [
                  "50 / 60",
                  "cinquante / soixante"
                ],
                [
                  "70",
                  "soixante-dix (60 + 10)"
                ],
                [
                  "80",
                  "quatre-vingts (4 × 20)"
                ],
                [
                  "90",
                  "quatre-vingt-dix (4 × 20 + 10)"
                ],
                [
                  "100",
                  "cent"
                ]
              ]
            }
          },
          {
            "h": "Construire les nombres",
            "p": [
              "21, 31… add **et un**: vingt **et un**, trente **et un**.",
              "22–29 just join: vingt-deux, vingt-trois…",
              "70 = soixante-dix, 71 = soixante **et onze**, 72 = soixante-douze… 99 = quatre-vingt-dix-neuf."
            ],
            "callout": {
              "kind": "warning",
              "text": "« quatre-vingts » has an -s, but it disappears before another number: quatre-vingt-un, quatre-vingt-deux."
            }
          },
          {
            "h": "Les nombres ordinaux",
            "example": {
              "title": "Ordinals",
              "rows": [
                [
                  "premier / première",
                  "first"
                ],
                [
                  "deuxième",
                  "second"
                ],
                [
                  "troisième",
                  "third"
                ],
                [
                  "quatrième, cinquième…",
                  "fourth, fifth…"
                ]
              ]
            },
            "p": [
              "Most ordinals = cardinal + **-ième** (trois → troisième). « cinq » adds a u: cinquième; « neuf » → neuvième."
            ]
          }
        ],
        "check": [
          {
            "q": "What is « quinze »?",
            "opts": [
              "13",
              "14",
              "15",
              "16"
            ],
            "ans": 2,
            "exp": "quinze = 15."
          },
          {
            "q": "How do you say 70?",
            "opts": [
              "septante",
              "soixante-dix",
              "soixante-douze",
              "huitante"
            ],
            "ans": 1,
            "exp": "Standard French: 70 = soixante-dix (sixty-ten)."
          },
          {
            "q": "How do you say 80?",
            "opts": [
              "octante",
              "huitante",
              "quatre-vingts",
              "quatre-vingt-dix"
            ],
            "ans": 2,
            "exp": "80 = quatre-vingts (four twenties)."
          },
          {
            "q": "How do you write 21?",
            "opts": [
              "vingt-un",
              "vingt et un",
              "vingt-et-un",
              "vingt un"
            ],
            "ans": 1,
            "exp": "21 = vingt et un (with « et », no hyphen in traditional spelling)."
          },
          {
            "q": "« quatre-vingt-dix » = ?",
            "opts": [
              "80",
              "90",
              "70",
              "100"
            ],
            "ans": 1,
            "exp": "quatre-vingt-dix = 90 (4×20 + 10)."
          },
          {
            "q": "« Deuxième » means:",
            "opts": [
              "first",
              "second",
              "third",
              "fourth"
            ],
            "ans": 1,
            "exp": "deuxième = second."
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
        "id": "fr-l08",
        "title": "Les jours, les mois et la date",
        "icon": "📅",
        "cards": [
          {
            "h": "Les jours de la semaine",
            "p": [
              "lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche.",
              "Days are **not** capitalised in French. The week starts on **lundi** (Monday)."
            ],
            "callout": {
              "kind": "tip",
              "text": "« le lundi » (with le) = every Monday: « Le lundi, je travaille. » Without « le » = this coming Monday."
            }
          },
          {
            "h": "Les mois de l'année",
            "p": [
              "janvier, février, mars, avril, mai, juin, juillet, août, septembre, octobre, novembre, décembre.",
              "Months are not capitalised either."
            ]
          },
          {
            "h": "Dire la date",
            "example": {
              "title": "Saying the date",
              "rows": [
                [
                  "Quelle est la date ?",
                  "What's the date?"
                ],
                [
                  "C'est le 3 mars.",
                  "It's the 3rd of March."
                ],
                [
                  "le premier mai",
                  "the 1st of May (premier, not « un »)"
                ],
                [
                  "Nous sommes le 14 juillet.",
                  "It's the 14th of July."
                ]
              ]
            },
            "callout": {
              "kind": "warning",
              "text": "Only the 1st uses the ordinal « premier ». All other dates use the plain number: le 2 mai, le 3 mai."
            }
          },
          {
            "h": "Phrases utiles",
            "p": [
              "**aujourd'hui** (today), **demain** (tomorrow), **hier** (yesterday).",
              "**Mon anniversaire est le 12 octobre.** (My birthday is the 12th of October.)"
            ]
          }
        ],
        "check": [
          {
            "q": "Which is the first day of the French week?",
            "opts": [
              "dimanche",
              "samedi",
              "lundi",
              "mardi"
            ],
            "ans": 2,
            "exp": "The French week starts on lundi (Monday)."
          },
          {
            "q": "Days of the week in French are:",
            "opts": [
              "always capitalised",
              "not capitalised",
              "capitalised only at the start",
              "written in English"
            ],
            "ans": 1,
            "exp": "Days and months are lowercase in French."
          },
          {
            "q": "How do you say « the 1st of May »?",
            "opts": [
              "le un mai",
              "le premier mai",
              "le première mai",
              "premier de mai"
            ],
            "ans": 1,
            "exp": "The 1st uses « premier »: le premier mai."
          },
          {
            "q": "« hier » means:",
            "opts": [
              "today",
              "tomorrow",
              "yesterday",
              "now"
            ],
            "ans": 2,
            "exp": "hier = yesterday; demain = tomorrow; aujourd'hui = today."
          },
          {
            "q": "« Nous sommes le 14 juillet » means:",
            "opts": [
              "We are 14",
              "It's the 14th of July",
              "There are 14 of us in July",
              "We go on 14 July"
            ],
            "ans": 1,
            "exp": "« Nous sommes le… » is a common way to state today's date."
          },
          {
            "q": "Which month is « août »?",
            "opts": [
              "April",
              "August",
              "October",
              "March"
            ],
            "ans": 1,
            "exp": "août = August."
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
        "title": "Décrire : couleurs et adjectifs",
        "icon": "🎨",
        "cards": [
          {
            "h": "Les couleurs",
            "p": [
              "rouge, bleu, vert, jaune, noir, blanc, orange, rose, violet, gris, marron.",
              "**une voiture rouge**, **un chat noir** — colours come AFTER the noun."
            ],
            "callout": {
              "kind": "warning",
              "text": "« orange » and « marron » are invariable: « des chaussures marron » (no -s)."
            }
          },
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
            "q": "« vert » means:",
            "opts": [
              "yellow",
              "blue",
              "green",
              "grey"
            ],
            "ans": 2,
            "exp": "vert = green."
          },
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
            "q": "Which colour is invariable (never adds -e/-s)?",
            "opts": [
              "bleu",
              "vert",
              "marron",
              "noir"
            ],
            "ans": 2,
            "exp": "« marron » (and « orange ») are invariable."
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
              "Use **+ infinitive** or **+ le/la/les**: **J'aime lire.** / **J'adore le chocolat.** / **Je déteste les maths.**",
              "**Qu'est-ce que tu aimes faire le week-end ?** (What do you like doing at the weekend?)"
            ]
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
            "h": "À la forme négative",
            "p": [
              "After a negative, all partitives become **de** (or **d'**).",
              "**Je bois du café.** → **Je ne bois pas de café.**",
              "**Il y a de la place.** → **Il n'y a pas de place.**"
            ],
            "callout": {
              "kind": "warning",
              "text": "This « de » rule is a classic A1 exam point: ne … pas + de, never « pas du / pas des »."
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
              "About 17 verbs of movement / change of state use **être** — remember **DR MRS VANDERTRAMP**.",
              "Devenir, Revenir, Monter, Rester, Sortir, Venir, Aller, Naître, Descendre, Entrer, Rentrer, Tomber, Retourner, Arriver, Mourir, Partir."
            ]
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
