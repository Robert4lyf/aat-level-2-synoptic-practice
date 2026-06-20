#!/usr/bin/env node
/**
 * Adds ~120 new practical real-world questions across six topic areas:
 *   1. Restaurant and café        (fr-1105 – fr-1129)  25 questions
 *   2. Shopping and supermarket   (fr-1130 – fr-1149)  20 questions
 *   3. Transport and directions   (fr-1150 – fr-1174)  25 questions
 *   4. Hotel and travel problems  (fr-1175 – fr-1189)  15 questions
 *   5. Pharmacy, health, emergencies (fr-1190 – fr-1204) 15 questions
 *   6. Everyday polite interactions (fr-1205 – fr-1224) 20 questions
 *
 * Usage: node scripts/add-practical-questions.js
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

// ── 1. RESTAURANT AND CAFÉ (fr-1105 – fr-1129) ──────────────────────────────

const NEW_QUESTIONS = [

  // ── Restaurant & Café ───────────────────────────────────────────────────────

  {
    id: 'fr-1105', topic: 'fr-resto', lesson: 'fr-l51', type: 'gapfill',
    q: "Complete the order: 'I would like the set menu, please.'",
    template: 'Je voudrais ___ menu, s\'il vous plaît.',
    gaps: [{ options: ['le', 'la', 'un', 'du'], answer: 0 }],
    exp: "'Le menu' = set menu (specific item → use 'le'). La carte = the à la carte menu. Je voudrais le menu à 15€ = I would like the €15 set menu.",
  },
  {
    id: 'fr-1106', topic: 'fr-resto', lesson: 'fr-l51', type: 'typed',
    q: "Translate: 'A table for four, please.'",
    ans: "Une table pour quatre, s'il vous plaît",
    alts: ["une table pour quatre s'il vous plaît", "une table pour quatre, s'il vous plait"],
    ignoreAccents: true,
    exp: "Une table pour [nombre], s'il vous plaît = A table for [number], please. Alternative: Nous sommes quatre = We are four.",
  },
  {
    id: 'fr-1107', topic: 'fr-resto', lesson: 'fr-l51', type: 'mcq',
    q: "The waiter asks: 'Vous avez réservé ?' What is he asking?",
    opts: ['Have you made a reservation?', 'Would you like to order?', 'Can I take your coat?', 'Are you ready for dessert?'],
    ans: 0,
    exp: "réserver = to reserve/book. 'Vous avez réservé ?' = Have you made a reservation? J'ai réservé au nom de Martin = I have a booking under the name Martin.",
  },
  {
    id: 'fr-1108', topic: 'fr-resto', lesson: 'fr-l51', type: 'gapfill',
    q: "Complete: 'Is service included?' (checking the bill)",
    template: 'Le service est ___ ?',
    gaps: [{ options: ['compris', 'inclus', 'payé', 'gratuit'], answer: 0 }],
    exp: "'Le service est compris' is the standard phrase for 'service is included'. You may see 'SC' on the bill. compris (from comprendre) = included in this context.",
  },
  {
    id: 'fr-1109', topic: 'fr-resto', lesson: 'fr-l51', type: 'typed',
    q: "Translate: 'I am allergic to gluten.'",
    ans: 'Je suis allergique au gluten',
    alts: ['je suis allergique au gluten'],
    ignoreAccents: true,
    exp: "allergique à = allergic to. à + le = au: allergique au gluten. Je suis allergique aux noix (nuts), au lait (milk).",
  },
  {
    id: 'fr-1110', topic: 'fr-resto', lesson: 'fr-l51', type: 'mcq',
    q: "You want to order. Which phrase is most polite?",
    opts: ['Je prends ça !', 'Je veux le steak.', "Je voudrais le poulet rôti, s'il vous plaît.", "Donnez-moi l'entrée."],
    ans: 2,
    exp: "'Je voudrais' (conditional of vouloir) is the polite way to order. 'Je veux' sounds blunt; 'Donnez-moi' is a command. Adding 's'il vous plaît' adds further politeness.",
  },
  {
    id: 'fr-1111', topic: 'fr-resto', lesson: 'fr-l51', type: 'gapfill',
    q: "Complete: 'I don't eat meat.' (negation + partitive)",
    template: 'Je ne mange ___ viande.',
    gaps: [{ options: ['pas de', 'pas la', 'pas du', 'pas'], answer: 0 }],
    exp: "After negation, use 'de' (not an article): je ne mange pas de viande. This rule applies to all negated direct objects.",
  },
  {
    id: 'fr-1112', topic: 'fr-resto', lesson: 'fr-l51', type: 'wordorder',
    q: "Build: 'The fish of the day, please.'",
    words: ['Le', 'poisson', 'du', 'jour', "s'il", 'vous', 'plaît', 'La', 'soupe'],
    answer: ['Le', 'poisson', 'du', 'jour', "s'il", 'vous', 'plaît'],
    exp: "le poisson du jour = fish of the day (du = de + le). s'il vous plaît = please. A common way to order a daily special in French restaurants.",
  },
  {
    id: 'fr-1113', topic: 'fr-resto', lesson: 'fr-l51', type: 'mcq',
    q: "The waiter says: 'Et comme boisson ?' What is he asking?",
    opts: ['And what would you like to drink?', 'And what would you like for dessert?', 'And for a starter?', 'And the bill?'],
    ans: 0,
    exp: "'Comme' in menu context = for/as. comme boisson = as a drink; comme entrée = as a starter; comme plat principal = for the main; comme dessert = for dessert.",
  },
  {
    id: 'fr-1114', topic: 'fr-resto', lesson: 'fr-l51', type: 'gapfill',
    q: "Complete the complaint: 'My food is cold.'",
    template: 'Mon repas est ___.',
    gaps: [{ options: ['froid', 'chaud', 'prêt', 'vide'], answer: 0 }],
    exp: "froid = cold. 'Mon repas est froid' = my meal is cold. Other complaints: ce n'est pas ce que j'ai commandé (it's not what I ordered), il manque quelque chose (something is missing).",
  },
  {
    id: 'fr-1115', topic: 'fr-resto', lesson: 'fr-l15', type: 'mcq',
    q: "At the café, how do you order 'a white coffee'?",
    opts: ['Un café crème / un café au lait', 'Un café noir', 'Un café glacé', 'Un expresso double'],
    ans: 0,
    exp: "Un café crème (or café au lait) = coffee with milk/cream. Un café noir = black coffee. Un expresso = espresso. Café allongé = long black.",
  },
  {
    id: 'fr-1116', topic: 'fr-resto', lesson: 'fr-l15', type: 'typed',
    q: "Translate: 'One coffee and one croissant, please.'",
    ans: "Un café et un croissant, s'il vous plaît",
    alts: ["un café et un croissant, s'il vous plaît", "Un café et un croissant s'il vous plait"],
    ignoreAccents: true,
    exp: "Standard French café order. In France, 'un café' usually means an espresso. Un croissant is a classic accompaniment.",
  },
  {
    id: 'fr-1117', topic: 'fr-resto', lesson: 'fr-l15', type: 'gapfill',
    q: "Order 'a glass of water' at the café:",
    template: "Un ___ d'eau, s'il vous plaît.",
    gaps: [{ options: ['verre', 'bol', 'tasse', 'morceau'], answer: 0 }],
    exp: "un verre d'eau = a glass of water. un bol = a bowl; une tasse = a cup (hot drinks); un morceau = a piece (of cake etc.).",
  },
  {
    id: 'fr-1118', topic: 'fr-resto', lesson: 'fr-l15', type: 'mcq',
    q: "You'd like to pay separately. What do you say?",
    opts: ["C'est pour moi.", 'On va payer ensemble.', 'On peut payer séparément ?', "Donnez-moi l'addition totale."],
    ans: 2,
    exp: "'On peut payer séparément ?' = Can we pay separately? payer ensemble = pay together. 'C'est pour moi' = it's on me (I'll pay for everyone).",
  },
  {
    id: 'fr-1119', topic: 'fr-resto', lesson: 'fr-l51', type: 'mcq',
    q: "The menu says 'plat du jour : €12'. What does this mean?",
    opts: ['The most expensive dish', 'The dish of the day', 'The house special only on weekends', "The children's menu"],
    ans: 1,
    exp: "'Le plat du jour' = the dish of the day — a freshly prepared daily special. French restaurants frequently offer a plat du jour for lunch, often good value.",
  },
  {
    id: 'fr-1120', topic: 'fr-resto', lesson: 'fr-l51', type: 'gapfill',
    q: "Ask the waiter: 'Does this dish contain nuts?'",
    template: 'Est-ce que ce plat ___ des noix ?',
    gaps: [{ options: ['contient', 'a', 'fait', 'prend'], answer: 0 }],
    exp: "contenir = to contain. 'Ce plat contient-il des noix ?' = Does this dish contain nuts? Useful for food allergies. Je suis allergique aux noix = I'm allergic to nuts.",
  },
  {
    id: 'fr-1121', topic: 'fr-resto', lesson: 'fr-l51', type: 'typed',
    q: "How do you say 'I am a vegetarian' in French? (feminine speaker)",
    ans: 'Je suis végétarienne',
    alts: ['je suis végétarienne', 'Je suis végétarien', 'je suis végétarien'],
    ignoreAccents: true,
    exp: "végétarien (masc.) / végétarienne (fem.). Je suis végétalien(ne) = I am vegan. Sans viande = without meat.",
  },
  {
    id: 'fr-1122', topic: 'fr-resto', lesson: 'fr-l51', type: 'mcq',
    q: "You want to say: 'That was delicious!' Which phrase is correct?",
    opts: ["C'était délicieux !", "C'est délicieux !", "C'était dégoûtant !", "Ça va être bon !"],
    ans: 0,
    exp: "'C'était délicieux' uses the imperfect (past) — the meal is now finished. 'C'est délicieux' = it is delicious (present, still eating). 'Dégoûtant' = disgusting.",
  },
  {
    id: 'fr-1123', topic: 'fr-resto', lesson: 'fr-l51', type: 'gapfill',
    q: "Ask what the dish of the day is:",
    template: "Qu'est-ce que c'est, le ___ du jour ?",
    gaps: [{ options: ['plat', 'menu', 'repas', 'dîner'], answer: 0 }],
    exp: "'Le plat du jour' = the dish of the day. Qu'est-ce que c'est, le plat du jour ? = What is the dish of the day? A polite way to enquire about the daily special.",
  },
  {
    id: 'fr-1124', topic: 'fr-resto', lesson: 'fr-l15', type: 'mcq',
    q: "You want to sit outside at the café. What do you ask?",
    opts: ["Est-ce qu'on peut s'asseoir en terrasse ?", 'Avez-vous une cave ?', 'Le chauffage est en panne ?', 'Je voudrais manger debout.'],
    ans: 0,
    exp: "'La terrasse' = outdoor seating. S'asseoir en terrasse = to sit outside. French café culture revolves around la terrasse, even in mild weather.",
  },
  {
    id: 'fr-1125', topic: 'fr-resto', lesson: 'fr-l51', type: 'mcq',
    q: "The waiter brings the wrong dish. What do you say politely?",
    opts: ["Excusez-moi, je n'ai pas commandé ça.", "Ce n'est pas bon !", 'Apportez-moi autre chose !', 'Je refuse de payer.'],
    ans: 0,
    exp: "'Excusez-moi, je n'ai pas commandé ça' = Excuse me, I didn't order this. Politely points out an error. 'Je n'ai pas commandé' = passé composé of commander.",
  },
  {
    id: 'fr-1126', topic: 'fr-resto', lesson: 'fr-l51', type: 'wordorder',
    q: "Build: 'We would like to pay now.'",
    words: ['Nous', 'voudrions', 'payer', 'maintenant', 'voulons', 'allons', 'voulions'],
    answer: ['Nous', 'voudrions', 'payer', 'maintenant'],
    exp: "'Nous voudrions payer maintenant' = We would like to pay now. voudrions = conditional of vouloir (more polite than voulons). maintenant = now.",
  },
  {
    id: 'fr-1127', topic: 'fr-resto', lesson: 'fr-l15', type: 'mcq',
    q: "In a French café, ordering 'un café' refers to:",
    opts: ['A large milky coffee', 'An espresso', 'A filter coffee', 'An iced coffee'],
    ans: 1,
    exp: "In France, 'un café' = an espresso by default. For milky coffee: un café crème or un café au lait. For a longer coffee: un café allongé. Grand café = double espresso.",
  },
  {
    id: 'fr-1128', topic: 'fr-resto', lesson: 'fr-l51', type: 'gapfill',
    q: "Complete: 'Excuse me, the menu please.' (asking the waiter for it)",
    template: "Excusez-moi, la ___, s'il vous plaît.",
    gaps: [{ options: ['carte', 'facture', 'serviette', 'nappe'], answer: 0 }],
    exp: "'La carte' = the à la carte menu. la facture = invoice/bill (formal); la serviette = napkin; la nappe = tablecloth. 'L'addition' is more common for the bill.",
  },
  {
    id: 'fr-1129', topic: 'fr-resto', lesson: 'fr-l51', type: 'scenario',
    setup: "You are at a French restaurant without a reservation.",
    parts: [
      {
        q: "The waiter asks: 'Vous avez réservé ?' You don't have a reservation. What do you say?",
        opts: ['Oui, au nom de Smith.', "Non, mais est-ce qu'il y a de la place ?", "L'addition, s'il vous plaît.", 'Je suis végétarien.'],
        ans: 1,
        exp: "'Y a-t-il de la place ?' = Is there a table available? If no reservation, check availability politely.",
      },
      {
        q: "The waiter asks: 'Et comme boisson ?' You'd like mineral water. What do you say?",
        opts: ["Je voudrais de l'eau minérale, s'il vous plaît.", "Un café, s'il vous plaît.", "L'addition tout de suite.", 'Je ne bois pas.'],
        ans: 0,
        exp: "de l'eau minérale = some mineral water. 'comme boisson' = as a drink. Eau plate = still water; eau gazeuse = sparkling water.",
      },
      {
        q: "At the end of the meal, you want to pay. What do you say?",
        opts: ["Encore du pain, s'il vous plaît.", "L'addition, s'il vous plaît.", "C'est pour moi et mon ami.", 'Je reviendrai demain.'],
        ans: 1,
        exp: "'L'addition, s'il vous plaît' = The bill, please. The most common way to ask for the bill. le pourboire = tip (customary but optional).",
      },
    ],
    exp: "Restaurant: Y a-t-il de la place ? → comme boisson = as a drink → L'addition, s'il vous plaît = the bill, please.",
  },

  // ── Shopping and Supermarket ─────────────────────────────────────────────────

  {
    id: 'fr-1130', topic: 'fr-shop', lesson: 'fr-l48', type: 'mcq',
    q: "You want to exchange an item. Which phrase is most accurate?",
    opts: ["Je voudrais l'acheter.", "Je voudrais échanger cet article, s'il vous plaît.", "Je voudrais un remboursement.", "Donnez-moi un bon de réduction."],
    ans: 1,
    exp: "'Échanger' = to exchange. 'Rembourser' = to refund. 'Je voudrais échanger cet article' = I would like to exchange this item. Je voudrais me faire rembourser = I'd like a refund.",
  },
  {
    id: 'fr-1131', topic: 'fr-shop', lesson: 'fr-l48', type: 'gapfill',
    q: "Complete: 'I have the receipt.' (proof of purchase)",
    template: "J'ai le ___.",
    gaps: [{ options: ['ticket de caisse', 'bon de commande', 'passeport', 'remboursement'], answer: 0 }],
    exp: "le ticket de caisse = the (cash register) receipt. Also: le reçu. You need it for exchanges or refunds. La caisse = the till/checkout.",
  },
  {
    id: 'fr-1132', topic: 'fr-shop', lesson: 'fr-l48', type: 'typed',
    q: "Translate: 'Do you have this in a larger size?'",
    ans: 'Vous avez ça en plus grande taille',
    alts: ['vous avez ça en plus grande taille ?', 'Vous avez ça en plus grande taille ?', 'Avez-vous ça en plus grande taille'],
    ignoreAccents: true,
    exp: "'en plus grande taille' = in a larger size. en plus petite taille = in a smaller size. Quelle est votre taille ? = What is your size?",
  },
  {
    id: 'fr-1133', topic: 'fr-shop', lesson: 'fr-l48', type: 'mcq',
    q: "At the supermarket, where do you pay?",
    opts: ['Le rayon', 'La caisse', 'Le chariot', "L'allée"],
    ans: 1,
    exp: "La caisse = the till/checkout. le rayon = the shelf/section (e.g. rayon boulangerie); le chariot = the shopping trolley; l'allée = the aisle.",
  },
  {
    id: 'fr-1134', topic: 'fr-shop', lesson: 'fr-l48', type: 'gapfill',
    q: "Complete: 'I'm looking for the bakery section.'",
    template: 'Je cherche le ___ boulangerie.',
    gaps: [{ options: ['rayon', 'aile', 'côté', 'stand'], answer: 0 }],
    exp: "le rayon + department = the [department] section. le rayon boulangerie (bakery), le rayon légumes (vegetables), le rayon surgelés (frozen foods).",
  },
  {
    id: 'fr-1135', topic: 'fr-shop', lesson: 'fr-l48', type: 'mcq',
    q: "You ask: 'Vous acceptez les chèques ?' What are you asking?",
    opts: ['Do you accept cheques?', 'Do you have a loyalty card?', 'Can I get a discount?', 'Is there cashback?'],
    ans: 0,
    exp: "accepter = to accept. les chèques = cheques. Most French shops prefer carte bancaire or espèces (cash). Chèques are less common now.",
  },
  {
    id: 'fr-1136', topic: 'fr-shop', lesson: 'fr-l48', type: 'typed',
    q: "How do you ask 'Where are the changing rooms?' in French?",
    ans: "Où sont les cabines d'essayage",
    alts: ["Où sont les cabines d'essayage ?", "où sont les cabines d'essayage", "Où est la cabine d'essayage"],
    ignoreAccents: true,
    exp: "les cabines d'essayage = the fitting/changing rooms. Puis-je essayer ceci ? = May I try this on? une cabine = a booth.",
  },
  {
    id: 'fr-1137', topic: 'fr-shop', lesson: 'fr-l48', type: 'mcq',
    q: "What does 'une promotion' mean on a shop sign?",
    opts: ['A job promotion', 'A special offer / discount', 'A product launch', 'A loyalty card benefit'],
    ans: 1,
    exp: "'Une promotion' in a shop = a special offer or discount (false friend!). En promotion = on special offer. Not to be confused with a professional promotion.",
  },
  {
    id: 'fr-1138', topic: 'fr-shop', lesson: 'fr-l48', type: 'gapfill',
    q: "Complete: 'I would like to pay by card.'",
    template: 'Je voudrais payer ___ carte.',
    gaps: [{ options: ['par', 'en', 'avec', 'à'], answer: 0 }],
    exp: "payer par carte = to pay by card. payer en espèces = to pay in cash. payer par virement = to pay by bank transfer.",
  },
  {
    id: 'fr-1139', topic: 'fr-shop', lesson: 'fr-l48', type: 'mcq',
    q: "You see 'SOLDES −50%' in a shop window. What does this mean?",
    opts: ['50% price increase', '50% discount', '50 items only', 'Open 50 hours a week'],
    ans: 1,
    exp: "Les soldes = the sales. −50% = 50% reduction. In France, les soldes are biannual regulated events in January and July.",
  },
  {
    id: 'fr-1140', topic: 'fr-shop', lesson: 'fr-l48', type: 'wordorder',
    q: "Build: 'I would like to exchange this jacket.'",
    words: ['Je', 'voudrais', 'échanger', 'cette', 'veste', 'prendre', 'acheter', 'perdre'],
    answer: ['Je', 'voudrais', 'échanger', 'cette', 'veste'],
    exp: "échanger = to exchange. cette = this (feminine, matches veste). Je voudrais + infinitive = I would like to...",
  },
  {
    id: 'fr-1141', topic: 'fr-shop', lesson: 'fr-l48', type: 'mcq',
    q: "The shop assistant asks: 'Vous voulez un sac ?' What does she mean?",
    opts: ['Would you like a bag?', 'Would you like a receipt?', 'Do you have a discount card?', 'Would you like to pay now?'],
    ans: 0,
    exp: "un sac = a bag. In France, single-use plastic bags are banned or charged for, so assistants ask. Un sac réutilisable = a reusable bag.",
  },
  {
    id: 'fr-1142', topic: 'fr-shop', lesson: 'fr-l48', type: 'gapfill',
    q: "Complete: 'I am looking for a birthday present.'",
    template: "Je cherche un ___ d'anniversaire.",
    gaps: [{ options: ['cadeau', 'gâteau', 'bon', 'prix'], answer: 0 }],
    exp: "un cadeau = a gift/present. un cadeau d'anniversaire = a birthday present. un cadeau de Noël = a Christmas present. Offrir un cadeau = to give a gift.",
  },
  {
    id: 'fr-1143', topic: 'fr-shop', lesson: 'fr-l48', type: 'mcq',
    q: "You want to check if an item is in stock. What do you ask?",
    opts: ["C'est en ligne.", "C'est en stock ?", 'Vous livrez à domicile ?', "C'est quel rayon ?"],
    ans: 1,
    exp: "'C'est en stock ?' = Is it in stock? Vous avez ça en stock ? = Do you have this in stock? Rupture de stock = out of stock.",
  },
  {
    id: 'fr-1144', topic: 'fr-shop', lesson: 'fr-l48', type: 'typed',
    q: "Translate: 'Can I have a refund?'",
    ans: 'Je peux être remboursé',
    alts: ['Je peux être remboursée', 'je peux être remboursé', 'Puis-je être remboursé', 'Je voudrais être remboursé'],
    ignoreAccents: true,
    exp: "remboursé(e) = refunded. Je peux être remboursé(e) ? = Can I get a refund? Je voudrais me faire rembourser = I would like a refund.",
  },
  {
    id: 'fr-1145', topic: 'fr-shop', lesson: 'fr-l48', type: 'mcq',
    q: "What is 'un bon de réduction' ?",
    opts: ['A gift voucher', 'A coupon / discount voucher', 'A loyalty card', 'A price tag'],
    ans: 1,
    exp: "un bon de réduction = a coupon or discount voucher. une carte de fidélité = loyalty card; un bon cadeau = gift voucher; une étiquette = price tag.",
  },
  {
    id: 'fr-1146', topic: 'fr-shop', lesson: 'fr-l48', type: 'gapfill',
    q: "Ask if you can try on the dress:",
    template: 'Est-ce que je ___ essayer cette robe ?',
    gaps: [{ options: ['peux', 'dois', 'veux', 'sais'], answer: 0 }],
    exp: "'Est-ce que je peux essayer cette robe ?' = Can I try on this dress? pouvoir = can. Puis-je = more formal alternative.",
  },
  {
    id: 'fr-1147', topic: 'fr-shop', lesson: 'fr-l48', type: 'mcq',
    q: "In a French supermarket, 'le rayon surgelés' refers to:",
    opts: ['Fresh produce aisle', 'Frozen foods aisle', 'Dairy aisle', 'Organic aisle'],
    ans: 1,
    exp: "les surgelés = frozen foods. surgeler = to deep-freeze. le rayon = section/aisle. frais/fraîche = fresh; bio = organic; produits laitiers = dairy.",
  },
  {
    id: 'fr-1148', topic: 'fr-shop', lesson: 'fr-l48', type: 'scenario',
    setup: "You are shopping for a jacket in a French clothes shop.",
    parts: [
      {
        q: "You can't find your size. What do you ask the assistant?",
        opts: ['Vous avez ça en taille 40 ?', "C'est combien, le café ?", 'Où est la sortie ?', 'Je voudrais un remboursement.'],
        ans: 0,
        exp: "'Vous avez ça en taille 40 ?' = Do you have this in size 40? en taille + number = in size...",
      },
      {
        q: "The assistant says: 'Désolé(e), c'est la dernière.' What does this mean?",
        opts: ["Sorry, it's on sale.", "Sorry, it's the last one.", "Sorry, we're closed.", "Sorry, it's out of order."],
        ans: 1,
        exp: "c'est la dernière = it's the last one. désolé(e) = sorry. En rupture de stock = out of stock.",
      },
      {
        q: "You decide to buy it. The cashier asks: 'Vous payez comment ?' What do they want to know?",
        opts: ["What's your name?", 'How are you paying?', 'Do you want a bag?', 'Do you have a receipt?'],
        ans: 1,
        exp: "payer comment ? / de quelle façon ? = how are you paying? Par carte (by card) ou en espèces (in cash)?",
      },
    ],
    exp: "Shopping: Vous avez ça en taille...? → c'est la dernière = last one → Vous payez comment ? = how are you paying?",
  },
  {
    id: 'fr-1149', topic: 'fr-shop', lesson: 'fr-l48', type: 'mcq',
    q: "What does 'les heures d'ouverture' mean on a shop sign?",
    opts: ['The opening hours', 'The closing time only', 'The lunch break', 'The holiday closure'],
    ans: 0,
    exp: "les heures d'ouverture = opening hours. ouvert = open; fermé = closed. In France, many shops close for lunch (12h–14h) and are closed on Sundays.",
  },

  // ── Transport and Directions ─────────────────────────────────────────────────

  {
    id: 'fr-1150', topic: 'fr-transport', lesson: 'fr-l49', type: 'mcq',
    q: "You want a single ticket to Lyon. What do you say at the counter?",
    opts: ["Un aller-retour pour Lyon, s'il vous plaît.", "Un aller simple pour Lyon, s'il vous plaît.", "Deux billets pour Lyon, s'il vous plaît.", 'Je voudrais réserver un siège pour Lyon.'],
    ans: 1,
    exp: "un aller simple = a single (one-way) ticket. un aller-retour = a return ticket. Je voudrais réserver une place = I would like to reserve a seat.",
  },
  {
    id: 'fr-1151', topic: 'fr-transport', lesson: 'fr-l49', type: 'gapfill',
    q: "Complete: 'The train to Paris departs from platform 3.'",
    template: 'Le train pour Paris part du ___ 3.',
    gaps: [{ options: ['quai', 'voie', 'gare', 'terminus'], answer: 0 }],
    exp: "le quai = the platform (where you stand to board). la voie = the track. Voie is also used for platform numbers. la gare = station; le terminus = terminus.",
  },
  {
    id: 'fr-1152', topic: 'fr-transport', lesson: 'fr-l49', type: 'typed',
    q: "How do you ask 'What time does the next train leave?' in French?",
    ans: 'À quelle heure part le prochain train',
    alts: ['À quelle heure part le prochain train ?', 'a quelle heure part le prochain train', 'Le prochain train part à quelle heure'],
    ignoreAccents: true,
    exp: "'À quelle heure part le prochain train ?' = What time does the next train leave? partir = to leave/depart. le prochain = the next.",
  },
  {
    id: 'fr-1153', topic: 'fr-transport', lesson: 'fr-l49', type: 'mcq',
    q: "The announcement says: 'Le train est en retard de vingt minutes.' What does this mean?",
    opts: ['The train is on time.', 'The train is 20 minutes late.', 'The train departs in 20 minutes.', 'The train has been cancelled.'],
    ans: 1,
    exp: "'En retard' = late. 'En retard de 20 minutes' = 20 minutes late. En avance = early; à l'heure = on time; annulé = cancelled; supprimé = removed from schedule.",
  },
  {
    id: 'fr-1154', topic: 'fr-transport', lesson: 'fr-l49', type: 'gapfill',
    q: "Complete: 'Is this seat taken?'",
    template: 'Cette place est ___ ?',
    gaps: [{ options: ['occupée', 'libre', 'vide', 'ouverte'], answer: 0 }],
    exp: "'Cette place est occupée ?' = Is this seat taken? libre = free/available. La place est libre ? = Is this seat free? réservée = reserved.",
  },
  {
    id: 'fr-1155', topic: 'fr-transport', lesson: 'fr-l49', type: 'mcq',
    q: "How do you say 'I need to validate my ticket' in French?",
    opts: ['Je dois composter mon billet.', 'Je dois acheter mon billet.', 'Je dois changer de train.', 'Je dois trouver mon siège.'],
    ans: 0,
    exp: "'Composter' = to stamp/validate your ticket in the machine — mandatory on French regional trains (TER). Oubliez pas de composter ! = Don't forget to validate!",
  },
  {
    id: 'fr-1156', topic: 'fr-transport', lesson: 'fr-l49', type: 'typed',
    q: "Translate: 'Where do I change for the metro?'",
    ans: 'Où est-ce que je change pour le métro',
    alts: ['Où est-ce que je change pour le métro ?', 'Où dois-je changer pour le métro', "Où est-ce qu'on change pour le métro"],
    ignoreAccents: true,
    exp: "changer = to change (trains/lines). La correspondance = the connection point. Changez à... = Change at...",
  },
  {
    id: 'fr-1157', topic: 'fr-transport', lesson: 'fr-l49', type: 'mcq',
    q: "At the bus stop: 'Ligne 12 — direction Centre-Ville'. What does 'direction' mean here?",
    opts: ['The speed of the bus', 'The name of the driver', 'The route heading towards the city centre', 'The departure time'],
    ans: 2,
    exp: "'Direction' on public transport = the terminus or final destination. Direction Centre-Ville = heading toward the city centre.",
  },
  {
    id: 'fr-1158', topic: 'fr-transport', lesson: 'fr-l49', type: 'gapfill',
    q: "Complete: 'Take the second street on the right.'",
    template: 'Prenez la ___ rue à droite.',
    gaps: [{ options: ['deuxième', 'deux', 'second', 'prochaine'], answer: 0 }],
    exp: "Ordinals: première (1st), deuxième (2nd), troisième (3rd). 'La prochaine rue' = the next street (without specifying which number).",
  },
  {
    id: 'fr-1159', topic: 'fr-transport', lesson: 'fr-l49', type: 'mcq',
    q: "Someone says: 'C'est à cinq minutes à pied.' What did they say?",
    opts: ["It's 5 km away.", "It's 5 minutes on foot.", "It's 5 stops on the metro.", "It takes 5 minutes by car."],
    ans: 1,
    exp: "'À cinq minutes à pied' = five minutes on foot. à pied = on foot. Structure: à + time + transport. À dix minutes en voiture = ten minutes by car.",
  },
  {
    id: 'fr-1160', topic: 'fr-transport', lesson: 'fr-l49', type: 'typed',
    q: "How do you ask 'Is there a bus to the airport?' in French?",
    ans: "Il y a un bus pour l'aéroport",
    alts: ["il y a un bus pour l'aéroport ?", "Il y a un bus pour l'aéroport ?", "Est-ce qu'il y a un bus pour l'aéroport"],
    ignoreAccents: true,
    exp: "Il y a un bus pour l'aéroport ? = Is there a bus to the airport? l'aéroport = airport. Y a-t-il... ? = more formal alternative.",
  },
  {
    id: 'fr-1161', topic: 'fr-transport', lesson: 'fr-l49', type: 'mcq',
    q: "'La correspondance' on the Paris métro means:",
    opts: ['The metro ticket price', 'The transfer point to another line', 'The last metro of the night', 'A direct service'],
    ans: 1,
    exp: "'La correspondance' = the connection/transfer between metro lines. Changez à Châtelet pour la correspondance = Change at Châtelet to transfer. Prendre la correspondance = to change lines.",
  },
  {
    id: 'fr-1162', topic: 'fr-transport', lesson: 'fr-l49', type: 'wordorder',
    q: "Build: 'You need to change at Lyon Part-Dieu.'",
    words: ['Vous', 'devez', 'changer', 'à', 'Lyon', 'Part-Dieu', 'partir', 'prendre'],
    answer: ['Vous', 'devez', 'changer', 'à', 'Lyon', 'Part-Dieu'],
    exp: "'Vous devez changer à Lyon Part-Dieu' = You need to change at Lyon Part-Dieu. devoir + infinitive = must/to need to. changer = to change (trains).",
  },
  {
    id: 'fr-1163', topic: 'fr-transport', lesson: 'fr-l49', type: 'gapfill',
    q: "Complete: 'The bus stop is opposite the post office.'",
    template: "L'arrêt de bus est ___ la poste.",
    gaps: [{ options: ['en face de', 'à côté de', 'derrière', 'devant'], answer: 0 }],
    exp: "'en face de' = opposite/across from. à côté de = next to; derrière = behind; devant = in front of.",
  },
  {
    id: 'fr-1164', topic: 'fr-transport', lesson: 'fr-l49', type: 'mcq',
    q: "How do you ask 'Does this bus stop at the town hall?'",
    opts: ["Ce bus s'arrête à la mairie ?", 'Ce bus va à la gare ?', 'Est-ce que le bus est direct ?', "Où est l'arrêt de bus ?"],
    ans: 0,
    exp: "'s'arrêter à' = to stop at. 'Ce bus s'arrête à la mairie ?' = Does this bus stop at the town hall? la mairie = town hall/mayor's office.",
  },
  {
    id: 'fr-1165', topic: 'fr-transport', lesson: 'fr-l49', type: 'mcq',
    q: "The sign says 'PÉAGE'. What does this mean on a French motorway?",
    opts: ['Motorway rest area', 'Toll booth', 'Speed camera', 'Road works ahead'],
    ans: 1,
    exp: "'Le péage' = toll (booth). French motorways (autoroutes) are largely tolled. Payer le péage = to pay the toll. une autoroute = motorway.",
  },
  {
    id: 'fr-1166', topic: 'fr-transport', lesson: 'fr-l49', type: 'gapfill',
    q: "Complete: 'I would like a return ticket to Marseille.'",
    template: 'Je voudrais un aller-___ pour Marseille.',
    gaps: [{ options: ['retour', 'simple', 'direct', 'double'], answer: 0 }],
    exp: "'Un aller-retour' = a return ticket (go-and-return). Un aller simple = single/one-way ticket.",
  },
  {
    id: 'fr-1167', topic: 'fr-transport', lesson: 'fr-l49', type: 'mcq',
    q: "You see 'Accès aux quais' at the train station. What does it mean?",
    opts: ['Exit', 'Ticket office', 'Platform access', 'Left luggage'],
    ans: 2,
    exp: "'Accès aux quais' = platform access. le quai = platform. la billetterie = ticket office; la sortie = exit; la consigne = left luggage / locker.",
  },
  {
    id: 'fr-1168', topic: 'fr-transport', lesson: 'fr-l49', type: 'typed',
    q: "Translate: 'Is the train direct or do I need to change?'",
    ans: 'Le train est direct ou je dois changer',
    alts: ['Le train est direct ou je dois changer ?', "C'est direct ou je dois changer", "C'est direct ou je dois changer ?"],
    ignoreAccents: true,
    exp: "'Direct ou avec correspondance ?' = Direct or with a connection? je dois changer = I need to change trains. Sans changement = without changing.",
  },
  {
    id: 'fr-1169', topic: 'fr-transport', lesson: 'fr-l49', type: 'mcq',
    q: "In a taxi: 'Pouvez-vous m'emmener à l'hôtel Mercure ?' What does this mean?",
    opts: ['Can you take me to the Mercure hotel?', 'How far is the Mercure hotel?', 'Is the Mercure hotel near here?', "What's the price to the Mercure hotel?"],
    ans: 0,
    exp: "'Emmener quelqu'un' = to take someone (somewhere). m' = me. Pouvez-vous m'emmener = Can you take me? Combien ça coûte jusqu'à l'hôtel ? = How much to the hotel?",
  },
  {
    id: 'fr-1170', topic: 'fr-transport', lesson: 'fr-l49', type: 'wordorder',
    q: "Build: 'Go straight ahead, then turn right at the roundabout.'",
    words: ['Allez', 'tout', 'droit', 'puis', 'tournez', 'à', 'droite', 'au', 'rond-point', 'gauche'],
    answer: ['Allez', 'tout', 'droit', 'puis', 'tournez', 'à', 'droite', 'au', 'rond-point'],
    exp: "'tout droit' = straight ahead; 'puis' = then; 'à droite' = to the right; 'au rond-point' = at the roundabout (au = à + le).",
  },
  {
    id: 'fr-1171', topic: 'fr-transport', lesson: 'fr-l49', type: 'mcq',
    q: "You hear: 'Attention à la fermeture des portes.' What does this mean?",
    opts: ['Watch out for the gap!', 'Mind the closing doors!', 'Please have your tickets ready.', 'This train terminates here.'],
    ans: 1,
    exp: "'la fermeture des portes' = the closing of the doors. 'Attention à' = mind / watch out for. Also heard: 'Attention à la marche' = Mind the step/gap.",
  },
  {
    id: 'fr-1172', topic: 'fr-transport', lesson: 'fr-l49', type: 'gapfill',
    q: "Complete: 'I am lost. Where am I on this map?'",
    template: 'Je suis perdu(e). Où suis-je ___ ce plan ?',
    gaps: [{ options: ['sur', 'dans', 'à', 'de'], answer: 0 }],
    exp: "'sur ce plan' = on this map. un plan = a (city) map. une carte = a map (general/road). Je suis perdu(e) = I am lost (perdu masc. / perdue fem.).",
  },
  {
    id: 'fr-1173', topic: 'fr-transport', lesson: 'fr-l49', type: 'mcq',
    q: "What was 'un carnet' in Paris, now replaced by the Navigo Easy card?",
    opts: ['A monthly travel pass', 'A book of 10 metro tickets', 'A tourist day pass', 'A single journey ticket'],
    ans: 1,
    exp: "Un carnet = 10 metro tickets sold together at a discount — now phased out. Le pass Navigo = monthly/weekly pass. Navigo Easy = the reloadable contactless card.",
  },
  {
    id: 'fr-1174', topic: 'fr-transport', lesson: 'fr-l49', type: 'scenario',
    setup: "You are at a French train station buying tickets.",
    parts: [
      {
        q: "You want a return ticket to Bordeaux for tomorrow. What do you say?",
        opts: ["Un aller-retour pour Bordeaux pour demain, s'il vous plaît.", 'Un aller simple pour Bordeaux aujourd\'hui.', 'Je voudrais un hôtel à Bordeaux.', 'Quel est le quai pour Bordeaux ?'],
        ans: 0,
        exp: "aller-retour = return ticket. pour demain = for tomorrow. s'il vous plaît = please.",
      },
      {
        q: "The clerk asks: 'Première ou deuxième classe ?' You want second class. What do you say?",
        opts: ["Deuxième classe, s'il vous plaît.", "Première classe, s'il vous plaît.", 'Je ne sais pas.', 'Un billet aller simple.'],
        ans: 0,
        exp: "Première classe = 1st class; deuxième classe = 2nd class. In France, TGV tickets are class-specific.",
      },
      {
        q: "Your train is delayed. You ask a member of staff about the delay:",
        opts: ['Le train est en retard de combien de minutes ?', 'Sur quel quai est le train ?', 'Combien coûte le billet ?', 'Est-ce que le train est complet ?'],
        ans: 0,
        exp: "en retard de combien de minutes ? = how many minutes late? Le train est annulé = the train is cancelled; le train est supprimé = removed from schedule.",
      },
    ],
    exp: "Train tickets: aller-retour = return → première/deuxième classe → en retard = late (ask how many minutes).",
  },

  // ── Hotel and Travel Problems ────────────────────────────────────────────────

  {
    id: 'fr-1175', topic: 'fr-dial', lesson: 'fr-l57', type: 'mcq',
    q: "At hotel check-in, the receptionist asks: 'Vous avez une réservation ?' What does she mean?",
    opts: ['Do you have a reservation?', 'Do you need help with your luggage?', 'How many nights will you stay?', 'Would you like breakfast included?'],
    ans: 0,
    exp: "une réservation = a booking. J'ai réservé au nom de... = I have a booking under the name... Au nom de qui ? = Under whose name?",
  },
  {
    id: 'fr-1176', topic: 'fr-dial', lesson: 'fr-l57', type: 'typed',
    q: "Translate: 'I have a booking for two nights.'",
    ans: "J'ai une réservation pour deux nuits",
    alts: ["j'ai une réservation pour deux nuits", "J'ai réservé pour deux nuits", "j'ai réservé pour deux nuits"],
    ignoreAccents: true,
    exp: "une nuit = one night; deux nuits = two nights. J'ai réservé = I have booked. Jusqu'au [date] = until [date].",
  },
  {
    id: 'fr-1177', topic: 'fr-dial', lesson: 'fr-l57', type: 'gapfill',
    q: "Complete: 'I would like a room with a sea view.'",
    template: 'Je voudrais une chambre ___ vue sur la mer.',
    gaps: [{ options: ['avec', 'à', 'de', 'pour'], answer: 0 }],
    exp: "'avec vue sur' = with a view of. une chambre avec vue sur la mer = a room with a sea view. côté jardin = garden side; côté rue = street side.",
  },
  {
    id: 'fr-1178', topic: 'fr-dial', lesson: 'fr-l57', type: 'mcq',
    q: "You call the hotel and say: 'Il y a un problème avec la climatisation.' What have you reported?",
    opts: ['The heating is broken.', 'The air conditioning is not working.', 'The television is broken.', 'The Wi-Fi is not working.'],
    ans: 1,
    exp: "'la climatisation' (la clim) = air conditioning. le chauffage = heating; la télé = TV; le Wi-Fi = Wi-Fi. 'Il y a un problème avec...' = There is a problem with...",
  },
  {
    id: 'fr-1179', topic: 'fr-dial', lesson: 'fr-l57', type: 'gapfill',
    q: "Complete the hotel complaint: 'The room is too noisy.'",
    template: 'La chambre est trop ___.',
    gaps: [{ options: ['bruyante', 'calme', 'petite', 'chère'], answer: 0 }],
    exp: "bruyant(e) = noisy. calme = quiet; petit(e) = small; cher/chère = expensive. A noisy room is a common complaint — try asking for one facing the courtyard instead.",
  },
  {
    id: 'fr-1180', topic: 'fr-dial', lesson: 'fr-l57', type: 'typed',
    q: "How do you ask 'What time is breakfast?' in French?",
    ans: 'Le petit-déjeuner est à quelle heure',
    alts: ['Le petit-déjeuner est à quelle heure ?', 'À quelle heure est le petit-déjeuner', 'À quelle heure est le petit-déjeuner ?'],
    ignoreAccents: true,
    exp: "'Le petit-déjeuner est à quelle heure ?' = What time is breakfast? More formal: 'À quelle heure est servi le petit-déjeuner ?'",
  },
  {
    id: 'fr-1181', topic: 'fr-dial', lesson: 'fr-l57', type: 'mcq',
    q: "You need to check out. What do you say at reception?",
    opts: ['Je voudrais prolonger mon séjour.', "Je voudrais régler ma note, s'il vous plaît.", 'Je voudrais changer de chambre.', 'Avez-vous une chambre disponible ?'],
    ans: 1,
    exp: "'régler sa note' = to settle/pay one's bill. une note d'hôtel = hotel bill. prolonger son séjour = to extend one's stay. Libérez la chambre avant midi = check out before noon.",
  },
  {
    id: 'fr-1182', topic: 'fr-dial', lesson: 'fr-l57', type: 'mcq',
    q: "What does 'le petit-déjeuner est compris' mean?",
    opts: ['Breakfast is available for extra charge.', 'Breakfast is included.', 'Breakfast is served until 10am.', 'Breakfast is not available.'],
    ans: 1,
    exp: "'compris' = included. le petit-déjeuner est compris = breakfast is included. Service compris (SC) = service included. Non compris = not included.",
  },
  {
    id: 'fr-1183', topic: 'fr-dial', lesson: 'fr-l57', type: 'gapfill',
    q: "Complete: 'Can I leave my luggage here until 3pm?'",
    template: "Est-ce que je peux laisser mes ___ ici jusqu'à 15h ?",
    gaps: [{ options: ['bagages', 'valises', 'sacs', 'affaires'], answer: 0 }],
    exp: "'les bagages' = luggage (general). une valise = suitcase; un sac = bag; les affaires = belongings. Je peux laisser mes bagages = Can I leave my luggage?",
  },
  {
    id: 'fr-1184', topic: 'fr-dial', lesson: 'fr-l57', type: 'mcq',
    q: "The receptionist says: 'Voici votre clé, chambre 205 au deuxième étage.' Which floor is that?",
    opts: ['Ground floor', 'First floor', 'Second floor', 'Third floor'],
    ans: 2,
    exp: "French floor numbering: rez-de-chaussée = ground floor; premier étage = 1st floor; deuxième étage = 2nd floor. So 'deuxième étage' = two floors above ground.",
  },
  {
    id: 'fr-1185', topic: 'fr-dial', lesson: 'fr-l57', type: 'typed',
    q: "Translate: 'There is no hot water in my room.'",
    ans: "Il n'y a pas d'eau chaude dans ma chambre",
    alts: ["il n'y a pas d'eau chaude dans ma chambre", "Il n'y a pas d'eau chaude dans ma chambre."],
    ignoreAccents: true,
    exp: "'Il n'y a pas de...' = There is no... (negation of il y a + de). eau chaude = hot water; eau froide = cold water.",
  },
  {
    id: 'fr-1186', topic: 'fr-dial', lesson: 'fr-l57', type: 'mcq',
    q: "How do you ask for a wake-up call at 7am?",
    opts: ["Est-ce que vous pouvez me réveiller à 7h ?", "À quelle heure ouvre la réception ?", 'Je voudrais le petit-déjeuner à 7h.', 'Pouvez-vous garder mes bagages ?'],
    ans: 0,
    exp: "'Réveiller quelqu'un' = to wake someone up. 'Pouvez-vous me réveiller à 7h ?' = Can you wake me at 7? Un réveil = an alarm clock.",
  },
  {
    id: 'fr-1187', topic: 'fr-dial', lesson: 'fr-l57', type: 'gapfill',
    q: "Complete: 'I have a booking under the name Johnson.'",
    template: "J'ai une réservation au ___ de Johnson.",
    gaps: [{ options: ['nom', 'titre', 'numéro', 'ordre'], answer: 0 }],
    exp: "'Au nom de...' = under the name of... J'ai réservé au nom de Johnson. Au nom de qui ? = Under whose name? Puis-je voir votre passeport ? = May I see your passport?",
  },
  {
    id: 'fr-1188', topic: 'fr-dial', lesson: 'fr-l57', type: 'mcq',
    q: "You find your room has a broken toilet. What is the clearest way to report it?",
    opts: ["Ma chambre a un problème.", "Les toilettes ne fonctionnent pas dans ma chambre.", "La salle de bain est sale.", "Je voudrais changer d'hôtel."],
    ans: 1,
    exp: "'Les toilettes ne fonctionnent pas' = the toilet isn't working. fonctionner / marcher = to work (of machines). Ma douche ne marche pas = my shower isn't working.",
  },
  {
    id: 'fr-1189', topic: 'fr-dial', lesson: 'fr-l57', type: 'scenario',
    setup: "You are checking into a French hotel.",
    parts: [
      {
        q: "The receptionist says: 'Bonjour, vous avez une réservation ?' You do. What do you say?",
        opts: ['Oui, au nom de Dupont, deux nuits.', 'Non merci, je pars demain.', 'Je voudrais visiter la ville.', "L'addition, s'il vous plaît."],
        ans: 0,
        exp: "Give your name and duration: au nom de [name], pour [X] nuits. Au nom de = under the name of.",
      },
      {
        q: "She asks: 'Vous préférez chambre côté rue ou côté jardin ?' What is she asking?",
        opts: ['Street-side or garden-side room?', 'Single or double bed?', 'With or without breakfast?', 'Smoking or non-smoking?'],
        ans: 0,
        exp: "côté rue = street side; côté jardin = garden/courtyard side. côté = side.",
      },
      {
        q: "Later you call reception: 'La douche ne marche pas.' What are you reporting?",
        opts: ["The shower isn't working.", 'The shower is too cold.', 'The room is too small.', 'The heating is broken.'],
        ans: 0,
        exp: "ne marche pas / ne fonctionne pas = doesn't work. la douche = the shower.",
      },
    ],
    exp: "Hotel check-in: au nom de... pour X nuits → côté rue/jardin → ne marche pas = doesn't work.",
  },

  // ── Pharmacy, Health, Emergencies ───────────────────────────────────────────

  {
    id: 'fr-1190', topic: 'fr-vie', lesson: 'fr-l74', type: 'mcq',
    q: "At the pharmacy: 'J'ai mal à la tête.' What would the pharmacist most likely recommend?",
    opts: ["De l'aspirine ou du paracétamol", 'Des gouttes pour les yeux', 'Un sirop pour la toux', 'De la crème solaire'],
    ans: 0,
    exp: "'J'ai mal à la tête' = I have a headache. avoir mal à = to have pain in. l'aspirine and le paracétamol are standard headache remedies.",
  },
  {
    id: 'fr-1191', topic: 'fr-vie', lesson: 'fr-l41', type: 'gapfill',
    q: "Complete: 'I have a sore throat.'",
    template: "J'ai mal à ___ gorge.",
    gaps: [{ options: ['la', 'ma', 'une', 'de la'], answer: 0 }],
    exp: "'J'ai mal à la gorge' = I have a sore throat. Use 'à la/au/aux' with body parts: j'ai mal à la tête, j'ai mal au dos, j'ai mal aux pieds.",
  },
  {
    id: 'fr-1192', topic: 'fr-vie', lesson: 'fr-l74', type: 'typed',
    q: "How do you say 'I need to see a doctor' in French?",
    ans: "J'ai besoin de voir un médecin",
    alts: ["j'ai besoin de voir un médecin", "J'ai besoin d'un médecin", "Je dois voir un médecin"],
    ignoreAccents: true,
    exp: "'J'ai besoin de...' = I need to... avoir besoin de + infinitive. un médecin = a doctor. Prendre rendez-vous chez le médecin = to book a doctor's appointment.",
  },
  {
    id: 'fr-1193', topic: 'fr-vie', lesson: 'fr-l74', type: 'mcq',
    q: "The doctor asks: 'Depuis combien de temps avez-vous ces symptômes ?' What is she asking?",
    opts: ['Where does it hurt?', 'How long have you had these symptoms?', 'What medication are you taking?', 'Do you have insurance?'],
    ans: 1,
    exp: "'Depuis combien de temps' = how long (for). Since when + present tense: j'ai mal depuis trois jours = I've been in pain for three days.",
  },
  {
    id: 'fr-1194', topic: 'fr-vie', lesson: 'fr-l74', type: 'gapfill',
    q: "Complete the dosage instruction: 'Take two tablets three times a day.'",
    template: 'Prenez deux ___ trois fois par jour.',
    gaps: [{ options: ['comprimés', 'sachets', 'bouteilles', 'injections'], answer: 0 }],
    exp: "'les comprimés' = tablets/pills. un sachet = sachet; une bouteille = bottle. trois fois par jour = three times a day; avant les repas = before meals.",
  },
  {
    id: 'fr-1195', topic: 'fr-vie', lesson: 'fr-l74', type: 'mcq',
    q: "What does 'la salle des urgences' mean?",
    opts: ['The waiting room', 'The emergency room (A&E)', 'The operating theatre', 'The pharmacy'],
    ans: 1,
    exp: "'La salle des urgences' (or 'les urgences') = A&E / emergency room. Emergency numbers in France: 15 (SAMU — medical), 17 (police), 18 (fire brigade).",
  },
  {
    id: 'fr-1196', topic: 'fr-vie', lesson: 'fr-l74', type: 'typed',
    q: "Translate: 'I am in pain. Call an ambulance!'",
    ans: "J'ai mal. Appelez une ambulance !",
    alts: ["j'ai mal. appelez une ambulance !", "J'ai mal, appelez une ambulance", "Appelez une ambulance, j'ai mal !"],
    ignoreAccents: true,
    exp: "'Appelez une ambulance !' = Call an ambulance! The emergency medical number in France is le 15 (SAMU). J'ai besoin d'aide = I need help.",
  },
  {
    id: 'fr-1197', topic: 'fr-vie', lesson: 'fr-l74', type: 'gapfill',
    q: "Complete: 'I am taking medication for high blood pressure.'",
    template: "Je ___ des médicaments contre l'hypertension.",
    gaps: [{ options: ['prends', 'mange', 'bois', 'porte'], answer: 0 }],
    exp: "'Prendre des médicaments' = to take medication. prendre = to take (for pills/medicine). J'ai une ordonnance = I have a prescription.",
  },
  {
    id: 'fr-1198', topic: 'fr-vie', lesson: 'fr-l74', type: 'mcq',
    q: "At the pharmacy, what is 'une pommade' ?",
    opts: ['A cough syrup', 'An ointment / cream', 'A bandage', 'A tablet'],
    ans: 1,
    exp: "'Une pommade' = an ointment/cream (applied to skin). un sirop = syrup; un pansement = plaster/bandage; un comprimé = tablet.",
  },
  {
    id: 'fr-1199', topic: 'fr-vie', lesson: 'fr-l41', type: 'mcq',
    q: "You say: 'Je me suis cassé la jambe.' What has happened?",
    opts: ['I hurt my arm.', 'I broke my leg.', 'I twisted my ankle.', 'I have a fever.'],
    ans: 1,
    exp: "'Se casser' = to break (reflexive). je me suis cassé la jambe = I broke my leg. la jambe = leg; le bras = arm; la cheville = ankle; le poignet = wrist.",
  },
  {
    id: 'fr-1200', topic: 'fr-vie', lesson: 'fr-l41', type: 'gapfill',
    q: "Complete: 'I have twisted my ankle.'",
    template: 'Je me suis ___ la cheville.',
    gaps: [{ options: ['foulé', 'cassé', 'coupé', 'brûlé'], answer: 0 }],
    exp: "'Se fouler la cheville' = to twist/sprain the ankle. se casser = to break; se couper = to cut oneself; se brûler = to burn oneself. All pronominal verbs using être in PC.",
  },
  {
    id: 'fr-1201', topic: 'fr-vie', lesson: 'fr-l74', type: 'mcq',
    q: "The SAMU dispatcher asks: 'C'est une urgence ?' What do they want to know?",
    opts: ["What's your name?", "Is it an emergency?", "What's your address?", 'Are you insured?'],
    ans: 1,
    exp: "'une urgence' = an emergency. C'est urgent = It's urgent. Le 15 handles medical emergencies. Have your address ready: Mon adresse est...",
  },
  {
    id: 'fr-1202', topic: 'fr-vie', lesson: 'fr-l74', type: 'typed',
    q: "How do you say 'I am diabetic' in French? (masculine)",
    ans: 'Je suis diabétique',
    alts: ['je suis diabétique'],
    ignoreAccents: true,
    exp: "'Je suis diabétique' = I am diabetic. Important information in medical situations. Je suis allergique à la pénicilline = I am allergic to penicillin.",
  },
  {
    id: 'fr-1203', topic: 'fr-vie', lesson: 'fr-l74', type: 'scenario',
    setup: "You are at a French pharmacy with a headache and cold.",
    parts: [
      {
        q: "What do you say to the pharmacist first?",
        opts: ["J'ai mal à la tête et j'ai un rhume.", "Je suis fatigué(e) et j'ai faim.", "J'ai mal au ventre et à la jambe.", "Je tousse et j'ai mal aux dents."],
        ans: 0,
        exp: "un rhume = a cold; j'ai mal à la tête = I have a headache. Describing your symptoms clearly helps the pharmacist.",
      },
      {
        q: "The pharmacist asks: 'Vous avez une ordonnance ?' You don't have one. What do you say?",
        opts: ["Non, je n'ai pas d'ordonnance.", 'Oui, voici mon ordonnance.', 'Je voudrais des comprimés.', "C'est urgent !"],
        ans: 0,
        exp: "une ordonnance = prescription. 'Je n'ai pas d'ordonnance' = I don't have a prescription. Many basic medicines are available without one.",
      },
      {
        q: "She gives you medicine and says: 'Deux comprimés, matin et soir.' How often should you take it?",
        opts: ['Once a day', 'Two tablets morning and evening', 'Three times a day', 'Before every meal'],
        ans: 1,
        exp: "matin et soir = morning and evening = twice daily. avant les repas = before meals; après les repas = after meals; au coucher = at bedtime.",
      },
    ],
    exp: "Pharmacy visit: describe symptoms → ordonnance = prescription → matin et soir = twice daily.",
  },
  {
    id: 'fr-1204', topic: 'fr-vie', lesson: 'fr-l74', type: 'mcq',
    q: "What is 'la mutuelle' in France?",
    opts: ['The national health service', 'A complementary health insurance', 'A pharmacy chain', 'A medical emergency number'],
    ans: 1,
    exp: "'La mutuelle' = complementary health insurance topping up what the Sécurité Sociale doesn't cover. La Sécu reimburses most costs; la mutuelle covers the remainder.",
  },

  // ── Everyday Polite Interactions and Small Talk ──────────────────────────────

  {
    id: 'fr-1205', topic: 'fr-salut', lesson: 'fr-l01', type: 'mcq',
    q: "Someone sneezes. What do you say in French?",
    opts: ['Bon appétit !', 'À vos souhaits !', 'Bonne chance !', 'Félicitations !'],
    ans: 1,
    exp: "'À vos souhaits !' (formal) or 'À tes souhaits !' (informal) = Bless you! (lit. 'to your wishes'). Bon appétit = enjoy your meal; Bonne chance = good luck.",
  },
  {
    id: 'fr-1206', topic: 'fr-salut', lesson: 'fr-l01', type: 'typed',
    q: "How do you say 'Happy birthday!' in French?",
    ans: 'Bon anniversaire',
    alts: ['Joyeux anniversaire', 'bon anniversaire', 'joyeux anniversaire'],
    ignoreAccents: true,
    exp: "'Bon anniversaire !' or 'Joyeux anniversaire !' = Happy birthday! Joyeux Noël = Merry Christmas; Bonne Année = Happy New Year.",
  },
  {
    id: 'fr-1207', topic: 'fr-salut', lesson: 'fr-l01', type: 'gapfill',
    q: "Complete the polite request: 'Excuse me, could you repeat that?'",
    template: 'Excusez-moi, pouvez-vous ___ ?',
    gaps: [{ options: ['répéter', 'répondre', 'parler', 'attendre'], answer: 0 }],
    exp: "'Pouvez-vous répéter ?' = Can you repeat? répéter = to repeat. Also: 'plus lentement' = more slowly. Je n'ai pas compris = I didn't understand.",
  },
  {
    id: 'fr-1208', topic: 'fr-salut', lesson: 'fr-l01', type: 'mcq',
    q: "Which phrase means 'Could you speak more slowly, please?'",
    opts: ["Pouvez-vous parler plus lentement, s'il vous plaît ?", 'Vous parlez très bien français !', 'Je ne parle pas français.', 'Répétez-moi ça.'],
    ans: 0,
    exp: "'Parler plus lentement' = to speak more slowly. lentement = slowly; vite = quickly. An essential phrase for language learners everywhere!",
  },
  {
    id: 'fr-1209', topic: 'fr-salut', lesson: 'fr-l01', type: 'typed',
    q: "Translate: 'I don't understand. Could you write it down?'",
    ans: "Je ne comprends pas. Pouvez-vous l'écrire ?",
    alts: ["je ne comprends pas. pouvez-vous l'écrire ?", "Je ne comprends pas, pouvez-vous l'écrire ?"],
    ignoreAccents: true,
    exp: "'Je ne comprends pas' = I don't understand. Pouvez-vous l'écrire ? = Can you write it down? Vous pouvez épeler ? = Can you spell it?",
  },
  {
    id: 'fr-1210', topic: 'fr-dial', lesson: 'fr-l56', type: 'mcq',
    q: "Someone compliments you: 'Vous parlez très bien français !' What is the most natural modest reply?",
    opts: ['Merci, mais il faut beaucoup pratiquer.', "Non, je ne parle pas du tout.", "C'est vrai, je suis excellent(e).", "Merci beaucoup, c'est trop aimable."],
    ans: 3,
    exp: "'C'est trop aimable' = you're too kind. Merci beaucoup = thank you very much. Being modest is culturally appreciated in France. 'Vous êtes trop gentil(le)' = you're too kind.",
  },
  {
    id: 'fr-1211', topic: 'fr-dial', lesson: 'fr-l56', type: 'gapfill',
    q: "Complete: 'It doesn't matter / Never mind.'",
    template: 'Ça ne ___ pas.',
    gaps: [{ options: ['fait rien', 'change rien', 'fait', 'importe'], answer: 0 }],
    exp: "'Ça ne fait rien' = it doesn't matter / never mind. Also: 'Ce n'est pas grave' = it's not serious. Both are very common in everyday French.",
  },
  {
    id: 'fr-1212', topic: 'fr-dial', lesson: 'fr-l56', type: 'mcq',
    q: "A French person asks: 'Tu es d'où ?' What are they asking?",
    opts: ['What do you do for a living?', 'Where are you from?', 'How old are you?', "What's your name?"],
    ans: 1,
    exp: "'Tu es d'où ?' (informal) = Where are you from? Formal: 'Vous êtes de quel pays ?' Je viens d'Angleterre = I come from England.",
  },
  {
    id: 'fr-1213', topic: 'fr-dial', lesson: 'fr-l56', type: 'typed',
    q: "Translate: 'I'm sorry, I don't speak French very well.'",
    ans: "Je suis désolé, je ne parle pas très bien français",
    alts: ['Je suis désolée, je ne parle pas très bien français', 'je suis désolé, je ne parle pas très bien français'],
    ignoreAccents: true,
    exp: "'Je suis désolé(e)' = I'm sorry. 'Je ne parle pas très bien français' = I don't speak French very well. Je parle un peu français = I speak a little French.",
  },
  {
    id: 'fr-1214', topic: 'fr-dial', lesson: 'fr-l56', type: 'mcq',
    q: "You give your phone number. Which follow-up phrase checks they've noted it?",
    opts: ['...vous pouvez me rappeler.', '...répétez après moi.', '...vous notez ?', "...c'est en promotion."],
    ans: 2,
    exp: "'Vous notez ?' = Are you writing it down / Got it? An informal way to check if someone is noting your information. Vous avez noté ? = Did you get that?",
  },
  {
    id: 'fr-1215', topic: 'fr-dial', lesson: 'fr-l56', type: 'gapfill',
    q: "Complete the polite request: 'Could I leave a message?'",
    template: 'Est-ce que je peux ___ un message ?',
    gaps: [{ options: ['laisser', 'prendre', 'donner', 'écrire'], answer: 0 }],
    exp: "'Laisser un message' = to leave a message. prendre un message = to take a message (what the other person does). Je rappellerai plus tard = I'll call back later.",
  },
  {
    id: 'fr-1216', topic: 'fr-dial', lesson: 'fr-l57', type: 'mcq',
    q: "At a French party, the host says 'Faites comme chez vous !' What does this mean?",
    opts: ['Help yourself to food!', 'Make yourself at home!', 'Dance if you want to!', 'You can leave whenever you like!'],
    ans: 1,
    exp: "'Faites comme chez vous !' = Make yourself at home! (lit. 'do as you would at your place'). Vous pouvez vous servir = help yourself (to food).",
  },
  {
    id: 'fr-1217', topic: 'fr-dial', lesson: 'fr-l56', type: 'typed',
    q: "How do you say 'What a pity!' in French?",
    ans: 'Quel dommage',
    alts: ['quel dommage', 'Quel dommage !'],
    ignoreAccents: true,
    exp: "'Quel dommage !' = What a pity/shame! C'est dommage = It's a pity. Also: C'est regrettable = It's unfortunate.",
  },
  {
    id: 'fr-1218', topic: 'fr-dial', lesson: 'fr-l56', type: 'mcq',
    q: "A colleague has achieved something great. What do you say?",
    opts: ['Je suis désolé.', 'Félicitations !', 'Bon appétit !', 'À vos souhaits !'],
    ans: 1,
    exp: "'Félicitations !' = Congratulations! Also: Bravo ! = Well done! Chapeau ! = Hats off! (informal). Je suis fier/fière de toi = I'm proud of you (informal).",
  },
  {
    id: 'fr-1219', topic: 'fr-dial', lesson: 'fr-l56', type: 'gapfill',
    q: "Complete the strong agreement: 'Absolutely! / Quite right!'",
    template: 'Tout à ___ !',
    gaps: [{ options: ['fait', 'coup', 'suite', "l'heure"], answer: 0 }],
    exp: "'Tout à fait !' = Absolutely! A very common affirmation. Other agreements: Exactement ! (Exactly!), En effet ! (Indeed!), C'est ça ! (That's it!).",
  },
  {
    id: 'fr-1220', topic: 'fr-dial', lesson: 'fr-l57', type: 'mcq',
    q: "Which is the correct formal leave-taking when leaving a business meeting?",
    opts: ['Salut, à plus !', 'Au revoir et bonne journée à tous.', 'Ciao !', 'À tout à l\'heure !'],
    ans: 1,
    exp: "'Au revoir et bonne journée à tous' = Goodbye and have a good day everyone — formal setting. 'Salut/Ciao' are informal. 'À tout à l'heure' implies seeing them again later today.",
  },
  {
    id: 'fr-1221', topic: 'fr-dial', lesson: 'fr-l56', type: 'mcq',
    q: "Someone says 'Bon courage !' to you before an exam. What do they mean?",
    opts: ['Good luck!', 'Be brave / You can do it!', 'Have a good time!', 'Take care!'],
    ans: 1,
    exp: "'Bon courage !' = keep going / you can do it (about effort). Bonne chance = good luck (about outcome). Bon courage is used when facing a challenge.",
  },
  {
    id: 'fr-1222', topic: 'fr-dial', lesson: 'fr-l56', type: 'typed',
    q: "Translate: 'I am very pleased to meet you.' (formal)",
    ans: 'Je suis très heureux de faire votre connaissance',
    alts: ['Je suis très heureuse de faire votre connaissance', 'je suis très heureux de faire votre connaissance', 'Très heureux de faire votre connaissance'],
    ignoreAccents: true,
    exp: "'Faire la connaissance de quelqu'un' = to make someone's acquaintance. 'Je suis ravi(e) de vous rencontrer' = I'm delighted to meet you (slightly less formal).",
  },
  {
    id: 'fr-1223', topic: 'fr-dial', lesson: 'fr-l57', type: 'mcq',
    q: "A French friend says: 'Il ne faut pas se quitter sans un verre !' What are they suggesting?",
    opts: ['They want you to leave now.', "They're suggesting you have a drink before leaving.", 'They want to make a formal toast.', 'They are saying goodbye formally.'],
    ans: 1,
    exp: "'Il ne faut pas se quitter sans...' = we mustn't part without... un verre = a drink. A typical French social expression — always an excuse to linger a little longer!",
  },
  {
    id: 'fr-1224', topic: 'fr-dial', lesson: 'fr-l56', type: 'scenario',
    setup: "You bump into a French neighbour on the street.",
    parts: [
      {
        q: "What is the most natural opening?",
        opts: ['Bonjour ! Ça va ?', 'Je voudrais parler avec vous.', 'Quel temps affreux !', 'Excusez-moi, où est la gare ?'],
        ans: 0,
        exp: "'Bonjour ! Ça va ?' = Hello! How are you? The standard casual opener with someone you know.",
      },
      {
        q: "They say 'Il fait beau aujourd'hui, non ?' The most natural reply is:",
        opts: ["Oui, c'est très agréable !", 'Je voudrais un café.', 'Vous habitez ici depuis longtemps ?', "La météo ne m'intéresse pas."],
        ans: 0,
        exp: "Agreeing on the weather is a universal social lubricant! 'C'est agréable' = it's pleasant/nice.",
      },
      {
        q: "You need to end the conversation politely. What do you say?",
        opts: ['Bon, je vous laisse, à bientôt !', "Je n'ai plus rien à dire.", "C'est ennuyeux.", 'Je dois téléphoner à ma mère.'],
        ans: 0,
        exp: "'Bon, je vous laisse' = Right, I'll let you go. à bientôt = see you soon. A polite and warm way to close a conversation.",
      },
    ],
    exp: "Small talk: Bonjour + Ça va ? → agree on the weather → 'Bon, je vous laisse, à bientôt !'",
  },

];

// ── Validate no ID collisions ─────────────────────────────────────────────────
const existingIds = new Set(QUESTIONS.map(q => q.id));
const newIds      = NEW_QUESTIONS.map(q => q.id);
const dupes = newIds.filter(id => existingIds.has(id));
if (dupes.length) {
  console.error('ERROR: Duplicate IDs found:', dupes);
  process.exit(1);
}
const newDupes = newIds.filter((id, i) => newIds.indexOf(id) !== i);
if (newDupes.length) {
  console.error('ERROR: Duplicate IDs within new questions:', newDupes);
  process.exit(1);
}

// ── Append ───────────────────────────────────────────────────────────────────
const ALL = QUESTIONS.concat(NEW_QUESTIONS);

const qStart = src.indexOf('window.FR_QUESTIONS = [');
const qEnd   = src.indexOf('\n];', qStart) + 3;

const before      = src.slice(0, qStart);
const after       = src.slice(qEnd);
const qLines      = ALL.map(q => '  ' + JSON.stringify(q));
const newQSection = `window.FR_QUESTIONS = [\n${qLines.join(',\n')}\n];`;

fs.writeFileSync(dataPath, before + newQSection + after, 'utf8');

console.log(`Added ${NEW_QUESTIONS.length} new questions.`);
console.log(`Total questions: ${ALL.length}`);
console.log('Verify with: node scripts/validate-french-data.js');
