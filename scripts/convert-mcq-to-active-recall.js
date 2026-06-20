#!/usr/bin/env node
/**
 * One-time conversion script: MCQ → active-recall formats.
 * Converts ~54 simple recognition MCQs to typed / gapfill question types.
 * Preserves id, topic, lesson. Removes MCQ-specific opts/ans fields.
 *
 * Usage: node scripts/convert-mcq-to-active-recall.js
 * Then:  node scripts/validate-french-data.js
 */

'use strict';

const fs   = require('fs');
const path = require('path');

const dataPath = path.resolve(__dirname, '..', 'french-data.js');
const src = fs.readFileSync(dataPath, 'utf8');

const patched = src.replace(/window\.(\w+)\s*=/g, 'global.$1 =');
new Function('global', patched)(global);

const QUESTIONS = JSON.parse(JSON.stringify(global.FR_QUESTIONS || []));

// ── Conversions ────────────────────────────────────────────────────────────────
// Each entry replaces type + all type-specific fields.
// Fields NOT listed here (id, topic, lesson) are preserved automatically.
// 'opts' and 'ans' (MCQ) are removed when converting away from MCQ.

const CONVERSIONS = {

  // ── fr-salut: greetings / politeness ────────────────────────────────────────

  'fr-001': {
    type: 'typed',
    q: "Translate to French: 'Hello / Good day.'",
    ans: 'Bonjour',
    alts: ['bonjour'],
    ignoreAccents: true,
    exp: '"Bonjour" is the standard French greeting used throughout the day until evening.',
  },
  'fr-002': {
    type: 'typed',
    q: "Translate to French: 'Good evening.'",
    ans: 'Bonsoir',
    alts: ['bonsoir'],
    ignoreAccents: true,
    exp: '"Bonsoir" is used to greet someone in the evening.',
  },
  'fr-003': {
    type: 'typed',
    q: "Translate to French: 'Good night.' (said when going to bed)",
    ans: 'Bonne nuit',
    alts: ['bonne nuit'],
    ignoreAccents: true,
    exp: '"Bonne nuit" means good night and is used when parting for bed.',
  },
  'fr-007': {
    type: 'typed',
    q: "How do you say 'please' (formal) in French?",
    ans: "S'il vous plaît",
    alts: ["s'il vous plaît", "S'il vous plait", "s'il vous plait"],
    ignoreAccents: true,
    exp: '"S\'il vous plaît" is the formal way to say please in French. Informal: s\'il te plaît.',
  },
  'fr-008': {
    type: 'typed',
    q: "Translate to French: 'Thank you very much.'",
    ans: 'Merci beaucoup',
    alts: ['merci beaucoup'],
    ignoreAccents: true,
    exp: '"Merci beaucoup" means thank you very much. "Beaucoup" means a lot/very much.',
  },
  'fr-009': {
    type: 'gapfill',
    q: 'Complete the dialogue with the right response:',
    template: '— Merci ! — De {0} !',
    gaps: [{ options: ['rien', 'tout', 'plus', 'jamais'], answer: 0 }],
    exp: '"De rien" means you\'re welcome (literally "it\'s nothing"). Alternatives: avec plaisir, je vous en prie (formal).',
  },
  'fr-011': {
    type: 'typed',
    q: "How do you ask 'What is your name?' formally in French?",
    ans: 'Comment vous appelez-vous',
    alts: ['Comment vous appelez-vous ?', 'comment vous appelez-vous', 'comment vous appelez-vous ?'],
    ignoreAccents: true,
    exp: '"Comment vous appelez-vous?" is the formal way to ask someone\'s name. Informal: "Tu t\'appelles comment ?"',
  },
  'fr-013': {
    type: 'gapfill',
    q: 'Complete the informal greeting:',
    template: '{0} va ?',
    gaps: [{ options: ['Ça', 'Il', 'Tu', 'Bien'], answer: 0 }],
    exp: '"Ça va?" is an informal way to ask how someone is doing. Reply: Ça va bien (I\'m fine) / Ça va, merci.',
  },
  'fr-014': {
    type: 'typed',
    q: "Translate to French: 'I'm fine, thanks.' (informal, using ça va)",
    ans: 'Ça va bien, merci',
    alts: ['Ca va bien, merci', 'ça va bien, merci', 'ca va bien, merci', 'Ça va bien merci'],
    ignoreAccents: true,
    exp: '"Ça va bien" means it\'s going well / I\'m fine, and "merci" adds thank you.',
  },
  'fr-016': {
    type: 'typed',
    q: "How do you say 'Nice to meet you' in French? (masculine form)",
    ans: 'Enchanté',
    alts: ['Enchantée', 'enchanté', 'enchantée'],
    ignoreAccents: true,
    exp: '"Enchanté(e)" means nice to meet you. Add -e for the feminine form: enchantée.',
  },
  'fr-125': {
    type: 'typed',
    q: "How do you say 'See you later today' in French?",
    ans: "À tout à l'heure",
    alts: ["A tout a l'heure", "à tout à l'heure", "a tout a l'heure"],
    ignoreAccents: true,
    exp: '« À tout à l\'heure » = see you later (the same day). Others: à bientôt (see you soon), au revoir (goodbye).',
  },

  // ── fr-gram: core grammar ────────────────────────────────────────────────────

  'fr-041': {
    type: 'gapfill',
    q: "Complete the negative sentence: 'I don't speak English.'",
    template: 'Je ne parle {0} anglais.',
    gaps: [{ options: ['pas', 'plus', 'jamais', 'rien'], answer: 0 }],
    exp: '"Ne...pas" surrounds the verb to form a negative. ne...plus = no more; ne...jamais = never.',
  },
  'fr-042': {
    type: 'gapfill',
    q: "Choose the correct form of être: 'I am a student.'",
    template: 'Je {0} étudiant(e).',
    gaps: [{ options: ['suis', 'es', 'est', 'sommes'], answer: 0 }],
    exp: '"Je suis" is the first-person singular of être. Full conjugation: je suis, tu es, il/elle est, nous sommes, vous êtes, ils/elles sont.',
  },
  'fr-043': {
    type: 'gapfill',
    q: "Choose the correct form of avoir: 'How old are you?'",
    template: 'Tu {0} quel âge ?',
    gaps: [{ options: ['as', 'est', 'a', 'avons'], answer: 0 }],
    exp: '"Tu as" is the informal second-person singular of avoir (to have). avoir: j\'ai, tu as, il/elle a, nous avons, vous avez, ils/elles ont.',
  },
  'fr-050': {
    type: 'gapfill',
    q: "Complete: 'The book is on the table.' (choose the preposition)",
    template: 'Le livre est {0} la table.',
    gaps: [{ options: ['sur', 'sous', 'dans', 'devant'], answer: 0 }],
    exp: '"Sur" means on or above (e.g. sur la table). Contrast: sous (under), dans (in), devant (in front of).',
  },
  'fr-051': {
    type: 'gapfill',
    q: "Complete: 'The cat is under the chair.' (choose the preposition)",
    template: 'Le chat est {0} la chaise.',
    gaps: [{ options: ['sous', 'sur', 'dans', 'derrière'], answer: 0 }],
    exp: '"Sous" means under or below (e.g. sous la table). Contrast: sur (on), dans (in), derrière (behind).',
  },

  // ── fr-vie: everyday life / transport / restaurant / weather / shopping ──────

  'fr-069': {
    type: 'typed',
    q: "How do you ask 'How much does it cost?' in French?",
    ans: 'Combien ça coûte',
    alts: ['Combien ça coûte ?', 'combien ça coûte', 'Combien ca coute', 'combien ca coute'],
    ignoreAccents: true,
    exp: '"Combien ça coûte?" is the standard way to ask how much something costs. Alternative: Ça coûte combien ?',
  },
  'fr-071': {
    type: 'typed',
    q: "How do you say 'the train' in French?",
    ans: 'le train',
    alts: ['Le train', 'train'],
    ignoreAccents: true,
    exp: '"Le train" = train. Transport: l\'avion (plane), le bus/l\'autobus (bus), le métro (metro).',
  },
  'fr-072': {
    type: 'typed',
    q: "How do you say 'the bus' in French? (either form)",
    ans: 'le bus',
    alts: ["l'autobus", "L'autobus", 'Le bus', 'bus', 'autobus'],
    ignoreAccents: true,
    exp: '"L\'autobus" (or "le bus") is the French word for bus. In everyday speech "le bus" is more common.',
  },
  'fr-073': {
    type: 'typed',
    q: "How do you say 'the metro/subway' in French?",
    ans: 'le métro',
    alts: ['Le métro', 'métro', 'le metro', 'Le metro', 'metro'],
    ignoreAccents: true,
    exp: '"Le métro" refers to the underground subway/metro system. Prendre le métro = to take the metro.',
  },
  'fr-074': {
    type: 'typed',
    q: "How do you say 'on foot' in French?",
    ans: 'à pied',
    alts: ['À pied', 'a pied', 'A pied'],
    ignoreAccents: true,
    exp: '"À pied" means on foot. Je vais à pied = I\'m going on foot.',
  },
  'fr-075': {
    type: 'typed',
    q: "How do you say 'straight ahead' in French?",
    ans: 'tout droit',
    alts: ['Tout droit'],
    ignoreAccents: true,
    exp: '"Tout droit" means straight ahead. Allez tout droit = Go straight ahead.',
  },
  'fr-076': {
    type: 'typed',
    q: "How do you say 'to the left' in French?",
    ans: 'à gauche',
    alts: ['À gauche', 'a gauche'],
    ignoreAccents: true,
    exp: '"À gauche" means to the left. Tournez à gauche = Turn left.',
  },
  'fr-077': {
    type: 'typed',
    q: "How do you say 'to the right' in French?",
    ans: 'à droite',
    alts: ['À droite', 'a droite'],
    ignoreAccents: true,
    exp: '"À droite" means to the right. Tournez à droite = Turn right.',
  },
  'fr-078': {
    type: 'typed',
    q: "What is 'the menu' called at a French restaurant?",
    ans: 'la carte',
    alts: ['La carte', 'carte'],
    ignoreAccents: true,
    exp: '"La carte" at a restaurant means the menu. "La carte des vins" = wine list. Le menu often refers to a set-price meal.',
  },
  'fr-079': {
    type: 'typed',
    q: "How do you ask for 'the bill' in French? (give the noun)",
    ans: "l'addition",
    alts: ["L'addition", "l'addition s'il vous plaît", "L'addition s'il vous plaît"],
    ignoreAccents: true,
    exp: '"L\'addition" is the bill/check at a restaurant. L\'addition, s\'il vous plaît = The bill, please.',
  },
  'fr-080': {
    type: 'gapfill',
    q: "Complete the weather phrase: 'It's nice weather today.'",
    template: "Il {0} beau aujourd'hui.",
    gaps: [{ options: ['fait', 'a', 'est', 'va'], answer: 0 }],
    exp: '"Il fait beau" = it\'s nice/fine weather. Use "il fait" for most weather: il fait beau, il fait chaud, il fait froid.',
  },
  'fr-081': {
    type: 'typed',
    q: "Translate to French: 'It is raining.' (verb: pleuvoir)",
    ans: 'Il pleut',
    alts: ['il pleut', 'Il pleut.'],
    ignoreAccents: true,
    exp: '"Il pleut" comes from the verb pleuvoir and means it is raining. It is an impersonal verb — only used with "il".',
  },
  'fr-082': {
    type: 'gapfill',
    q: "Complete: 'It's hot in summer.' (weather adjective)",
    template: 'Il fait {0} en été.',
    gaps: [{ options: ['chaud', 'froid', 'beau', 'nuageux'], answer: 0 }],
    exp: '"Il fait chaud" = it\'s hot. Opposite: il fait froid (cold). il fait beau (fine weather), il fait mauvais (bad weather).',
  },
  'fr-083': {
    type: 'typed',
    q: "How do you say 'a room' in French? (hotel vocabulary)",
    ans: 'une chambre',
    alts: ['Une chambre', 'chambre'],
    ignoreAccents: true,
    exp: '"Une chambre" means a room/bedroom in a hotel. Je voudrais une chambre = I would like a room.',
  },
  'fr-084': {
    type: 'typed',
    q: "How do you say 'by car' in French?",
    ans: 'en voiture',
    alts: ['En voiture'],
    ignoreAccents: true,
    exp: '"En voiture" means by car. Use en for most transport: en bus, en train, en avion. Exception: à pied, à vélo.',
  },
  'fr-085': {
    type: 'typed',
    q: "Give the French command: 'Turn left.'",
    ans: 'Tournez à gauche',
    alts: ['tournez à gauche', 'Tournez a gauche', 'tournez a gauche'],
    ignoreAccents: true,
    exp: '"Tournez à gauche" = Turn left. "Tournez" = turn (vous imperative), "à gauche" = to the left.',
  },
  'fr-163': {
    type: 'gapfill',
    q: "Complete the direction: 'Turn left at the traffic lights.'",
    template: 'Tournez {0} gauche aux feux.',
    gaps: [{ options: ['à', 'de', 'en', 'au'], answer: 0 }],
    exp: '"à gauche" = to the left; "à droite" = to the right. The preposition "à" is always used with gauche and droite.',
  },
  'fr-165': {
    type: 'typed',
    q: "How do you say 'to go grocery shopping' in French? (faire ...)",
    ans: 'faire les courses',
    alts: ['Faire les courses'],
    ignoreAccents: true,
    exp: 'faire les courses = to do the grocery shopping. Also: faire du shopping = to go clothes shopping.',
  },
  'fr-198': {
    type: 'gapfill',
    q: "Complete: 'I have a fever.' (at the pharmacy)",
    template: "J'ai de la {0}.",
    gaps: [{ options: ['fièvre', 'toux', 'grippe', 'douleur'], answer: 0 }],
    exp: 'la fièvre = fever; j\'ai de la fièvre = I have a fever. Other: j\'ai de la toux (cough), j\'ai la grippe (flu).',
  },
  'fr-201': {
    type: 'typed',
    q: "Translate to French: 'I cough.' (from tousser)",
    ans: 'Je tousse',
    alts: ['je tousse'],
    ignoreAccents: true,
    exp: 'tousser = to cough; je tousse. Other: j\'éternue (I sneeze), j\'ai mal à la gorge (I have a sore throat).',
  },
  'fr-209': {
    type: 'typed',
    q: "Translate to French: 'I am wearing a dress.'",
    ans: 'Je porte une robe',
    alts: ['je porte une robe'],
    ignoreAccents: true,
    exp: 'une robe = a dress; porter = to wear. Je porte = I wear / I am wearing. Other: un manteau (coat), un jean (jeans).',
  },
  'fr-212': {
    type: 'typed',
    q: "Translate to French: 'I would like to try it on.'",
    ans: "Je voudrais l'essayer",
    alts: ["je voudrais l'essayer", 'Je voudrais l essayer'],
    ignoreAccents: true,
    exp: 'essayer = to try on; je voudrais l\'essayer = I would like to try it on. Je voudrais = I would like (conditional of vouloir).',
  },
  'fr-216': {
    type: 'gapfill',
    q: "Complete: 'I am paying by card.' (choose the preposition)",
    template: 'Je paie {0} carte.',
    gaps: [{ options: ['par', 'en', 'avec', 'à'], answer: 0 }],
    exp: 'payer par carte = to pay by card; payer en espèces = to pay in cash. Use "par" for payment method.',
  },
  'fr-217': {
    type: 'typed',
    q: "Translate to French: 'It is too expensive.'",
    ans: "C'est trop cher",
    alts: ["c'est trop cher", "C'est trop cher.", 'c est trop cher'],
    ignoreAccents: true,
    exp: 'trop = too (much); cher = expensive. C\'est bon marché = it\'s cheap/good value.',
  },

  // ── fr-fam: family vocabulary ────────────────────────────────────────────────

  'fr-393': {
    type: 'typed',
    q: "How do you say 'the father' in French?",
    ans: 'le père',
    alts: ['Le père', 'père', 'le pere'],
    ignoreAccents: true,
    exp: 'le père = the father. Feminine: la mère (the mother). les parents = the parents (also "relatives").',
  },
  'fr-397': {
    type: 'gapfill',
    q: "Complete: 'My daughter is called Camille.' (family vocab)",
    template: "Ma {0} s'appelle Camille.",
    gaps: [{ options: ['fille', 'sœur', 'femme', 'cousine'], answer: 0 }],
    exp: 'la fille = daughter (in a family context) OR girl. ma fille = my daughter. Masculine: le fils (son) — pronounced "fiss".',
  },
  'fr-401': {
    type: 'typed',
    q: "How do you say 'the children' in French?",
    ans: 'les enfants',
    alts: ['Les enfants', 'enfants'],
    ignoreAccents: true,
    exp: 'les enfants = the children. Singular: l\'enfant (can be masculine or feminine). un garçon (boy), une fille (girl).',
  },
  'fr-404': {
    type: 'typed',
    q: "How do you say 'the in-laws' (parents-in-law) in French?",
    ans: 'les beaux-parents',
    alts: ['Les beaux-parents', 'beaux-parents'],
    ignoreAccents: true,
    exp: 'les beaux-parents = in-laws. le beau-père = father-in-law or stepfather; la belle-mère = mother-in-law or stepmother.',
  },

  // ── fr-food: food and meals ──────────────────────────────────────────────────

  'fr-408': {
    type: 'typed',
    q: "How do you say 'bread' in French?",
    ans: 'le pain',
    alts: ['Le pain', 'pain', 'du pain'],
    ignoreAccents: true,
    exp: 'le pain = bread. Un pain = a loaf; une baguette = the long thin bread.',
  },
  'fr-413': {
    type: 'typed',
    q: "How do you say 'chicken' in French?",
    ans: 'le poulet',
    alts: ['Le poulet', 'poulet'],
    ignoreAccents: true,
    exp: 'le poulet = chicken. Other meats: le bœuf (beef), le porc (pork), l\'agneau (lamb), le veau (veal).',
  },
  'fr-415': {
    type: 'gapfill',
    q: "Complete: 'I would like some milk, please.' (partitive article)",
    template: "Je voudrais {0} lait, s'il vous plaît.",
    gaps: [{ options: ['du', 'de', 'le', 'un'], answer: 0 }],
    exp: 'du lait = some milk. du = de + le (partitive, masculine). Use partitive for uncountable nouns: du lait, de la crème, de l\'eau.',
  },
  'fr-419': {
    type: 'typed',
    q: "Translate to French: 'There are fruits on the table.'",
    ans: 'Il y a des fruits sur la table',
    alts: ['il y a des fruits sur la table', 'Il y a des fruits sur la table.'],
    ignoreAccents: true,
    exp: 'Il y a = there is / there are. des fruits = some fruits (indefinite plural). sur la table = on the table.',
  },
  'fr-422': {
    type: 'typed',
    q: "How do you say 'breakfast' in French?",
    ans: 'le petit-déjeuner',
    alts: ['Le petit-déjeuner', 'petit-déjeuner', 'le petit dejeuner', 'petit dejeuner'],
    ignoreAccents: true,
    exp: 'le petit-déjeuner = breakfast (lit. "the small lunch"). le déjeuner = lunch; le dîner = dinner.',
  },

  // ── fr-shop: shopping ────────────────────────────────────────────────────────

  'fr-428': {
    type: 'typed',
    q: "How do you say 'the sales' (seasonal discounts) in French?",
    ans: 'les soldes',
    alts: ['Les soldes', 'soldes'],
    ignoreAccents: true,
    exp: 'les soldes = the sales (seasonal discounts). en soldes = on sale. In France, Les Soldes are biannual regulated events.',
  },
  'fr-430': {
    type: 'typed',
    q: "Translate to French: 'It comes to twenty euros.' (cashier phrase)",
    ans: 'Ça fait vingt euros',
    alts: ['ca fait vingt euros', 'Ça fait vingt euros.', 'ça fait vingt euros'],
    ignoreAccents: true,
    exp: 'Ça fait vingt euros = It comes to / That\'s twenty euros. Ça fait + price is the standard cashier phrase.',
  },

  // ── fr-meteo: weather ────────────────────────────────────────────────────────

  'fr-449': {
    type: 'typed',
    q: "Translate to French: 'It's windy.' (using il y a)",
    ans: 'Il y a du vent',
    alts: ['il y a du vent', 'Il y a du vent.'],
    ignoreAccents: true,
    exp: 'il y a du vent = it\'s windy (lit. "there is some wind"). Use il y a du/de la for weather nouns: du soleil, du brouillard.',
  },
  'fr-450': {
    type: 'typed',
    q: "How do you ask 'What's the weather like today?' in French?",
    ans: "Quel temps fait-il aujourd'hui",
    alts: ["Quel temps fait-il aujourd'hui ?", "quel temps fait-il aujourd'hui", 'Quel temps fait-il ?'],
    ignoreAccents: true,
    exp: 'Quel temps fait-il ? = What\'s the weather like? le temps = weather (also "time" as duration). aujourd\'hui = today.',
  },
  'fr-455': {
    type: 'typed',
    q: "Translate to French: 'It's 30 degrees.'",
    ans: 'Il fait 30 degrés',
    alts: ['il fait 30 degrés', 'Il fait 30 degrés.', 'Il fait trente degrés', 'il fait trente degrés'],
    ignoreAccents: true,
    exp: 'Il fait 30 degrés = It\'s 30 degrees. Il fait + temperature is the standard construction.',
  },
};

// ── Apply conversions ─────────────────────────────────────────────────────────
const MCQ_ONLY_FIELDS = new Set(['opts', 'ans']);

let converted = 0;
let skipped   = 0;

QUESTIONS.forEach(q => {
  const conv = CONVERSIONS[q.id];
  if (!conv) return;

  if (q.type !== 'mcq') {
    console.warn(`[SKIP] ${q.id} is already type=${q.type}, expected mcq`);
    skipped++;
    return;
  }

  // Remove MCQ-specific fields
  MCQ_ONLY_FIELDS.forEach(f => delete q[f]);

  // Apply new fields
  Object.assign(q, conv);
  converted++;
});

console.log(`[convert] Applied ${converted} conversions, skipped ${skipped}.`);

// ── Write back ────────────────────────────────────────────────────────────────
const qStart = src.indexOf('window.FR_QUESTIONS = [');
const qEnd   = src.indexOf('\n];', qStart) + 3;

const before      = src.slice(0, qStart);
const after       = src.slice(qEnd);
const qLines      = QUESTIONS.map(q => '  ' + JSON.stringify(q));
const newQSection = `window.FR_QUESTIONS = [\n${qLines.join(',\n')}\n];`;

fs.writeFileSync(dataPath, before + newQSection + after, 'utf8');

console.log(`Wrote ${QUESTIONS.length} questions to french-data.js.`);
console.log('Verify with: node scripts/validate-french-data.js');
