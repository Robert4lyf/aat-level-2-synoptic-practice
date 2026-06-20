'use strict';
/**
 * 1. Fix lesson ordering issues across all units
 * 2. Move fr-l88 from B1 → A2
 * 3. Add 4 new story lessons using public domain literature
 * 4. Update FR_LESSON_CEFR_SUBLEVEL for new lessons
 */
const fs   = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'french-data.js');
let src = fs.readFileSync(filePath, 'utf8');

const patched = src.replace(/window\.(\w+)\s*=/g, 'global.$1 =');
new Function('global', patched)(global);

const lp = global.FR_LEARN_PATH;

// ── Build lookup of all existing lesson objects ────────────────────────────────
const allLessons = {};
for (const unit of lp) {
  for (const L of unit.lessons) allLessons[L.id] = L;
}

// ── New story lesson objects ───────────────────────────────────────────────────

const STORY_LESSONS = {

'fr-l97': {
  id: 'fr-l97',
  title: 'Histoire : La Cigale et la Fourmi',
  icon: '🐜',
  tag: 'mastery',
  cards: [
    {
      h: 'La Cigale et la Fourmi — lisez la fable',
      p: ["D'après Jean de La Fontaine (1668). Adapted for A1 learners. Read the fable, then answer the questions."],
      visual: "<div style='background:linear-gradient(135deg,#f0fdf4,#fff);border-left:4px solid #166534;border-radius:10px;padding:16px;font-size:0.92em;line-height:2'>\n<div style='color:#166534;font-weight:700;font-size:1em;margin-bottom:10px'>🐜 La Fable — d'après La Fontaine</div>\n<p>La cigale chante toute la journée. Elle chante en été, au printemps, en automne. Elle est heureuse !</p>\n<p>La fourmi, elle, <strong>travaille</strong>. Elle cherche de la nourriture. Elle mange, et elle mange encore. Elle prépare pour l'hiver.</p>\n<p>L'hiver <strong>arrive</strong>. Il <strong>fait</strong> très froid. La cigale <strong>n'a pas</strong> de nourriture. Elle a faim et elle a froid.</p>\n<p>La cigale <strong>va</strong> chez la fourmi. Elle <strong>dit</strong> : <em>« Bonjour, amie ! Tu as de la nourriture pour moi ? »</em></p>\n<p>La fourmi répond : <em>« En été, tu chantes, tu ne travailles pas. Maintenant, je n'ai pas de nourriture pour toi ! »</em></p>\n<p>La cigale <strong>est</strong> triste. Elle comprend maintenant : <strong>il faut travailler !</strong></p>\n</div>"
    },
    {
      h: 'Vocabulaire clé',
      example: {
        title: 'Key words from the fable',
        rows: [
          ['toute la journée', 'all day long'],
          ['chercher', 'to look for'],
          ['la nourriture', 'food'],
          ['avoir faim', 'to be hungry'],
          ['avoir froid', 'to be cold'],
          ['il faut + infinitif', 'you must / one must'],
          ['la fourmi', 'the ant'],
          ['la cigale', 'the cicada / grasshopper'],
        ]
      }
    }
  ],
  check: [
    {
      q: 'What does the cicada do all summer long?',
      opts: ['She works', 'She sleeps', 'She sings', 'She eats'],
      ans: 2,
      exp: 'La cigale chante toute la journée — she sings all day long.'
    },
    {
      q: 'What does the ant do during summer?',
      opts: ['She sings and dances', 'She collects food for winter', 'She sleeps in the sun', 'She visits the cicada'],
      ans: 1,
      exp: 'La fourmi travaille et cherche de la nourriture — she works and collects food.'
    },
    {
      q: 'Why does the cicada go to the ant\'s house in winter?',
      opts: ['To sing together', 'To return borrowed food', 'Because she has no food and is hungry', 'Because it is too hot outside'],
      ans: 2,
      exp: 'La cigale n\'a pas de nourriture et elle a faim — she has no food and is hungry.'
    },
    {
      q: 'What is the moral of the fable?',
      opts: ['Singing makes you happy', 'You must work to prepare for the future', 'Ants are unkind', 'Winter is short'],
      ans: 1,
      exp: 'La cigale comprend : il faut travailler — you must work. La Fontaine\'s fable teaches that preparation matters.'
    }
  ]
},

'fr-l98': {
  id: 'fr-l98',
  title: 'Histoire : Le Tour du Monde',
  icon: '🌍',
  tag: 'mastery',
  cards: [
    {
      h: 'Le Tour du Monde en 80 Jours — lisez l\'extrait',
      p: ["D'après Jules Verne, <em>Le Tour du Monde en Quatre-vingts Jours</em> (1872). Notice the mix of <strong>imparfait</strong> (descriptions) and <strong>passé composé</strong> (events)."],
      visual: "<div style='background:linear-gradient(135deg,#fff7ed,#fff);border-left:4px solid #c2410c;border-radius:10px;padding:16px;font-size:0.92em;line-height:2'>\n<div style='color:#c2410c;font-weight:700;font-size:1em;margin-bottom:10px'>🎩 Londres, 1872</div>\n<p>Phileas Fogg <strong>habitait</strong> au 7, Saville Row, à Londres. C'<strong>était</strong> un homme très mystérieux et très précis. Chaque matin, il se <strong>levait</strong> à huit heures exactement, <strong>déjeunait</strong> à treize heures, et <strong>dînait</strong> à dix-neuf heures.</p>\n<p>Un mardi soir, Fogg <strong>a lu</strong> dans son journal qu'on pouvait faire le tour du monde en quatre-vingts jours.</p>\n<p>Ses amis au Reform Club <strong>ont dit</strong> : <em>« C'est impossible ! »</em></p>\n<p>Fogg <strong>a répondu</strong> calmement : <em>« Je peux le faire. Je parie vingt mille livres. »</em></p>\n<p>Le même soir, il <strong>a parlé</strong> à son domestique Passepartout.</p>\n<p><em>« Passepartout, nous partons ce soir. »</em><br>\n<em>« Ce soir, monsieur ?! »</em><br>\n<em>« Oui. Dans deux heures. Préparez vos affaires. »</em></p>\n<p>Passepartout <strong>était</strong> très surpris, mais il <strong>a obéi</strong>. L'aventure <strong>commençait</strong> !</p>\n</div>"
    },
    {
      h: 'Imparfait vs passé composé dans le texte',
      p: ['The text uses both tenses deliberately — spot the pattern:'],
      split: {
        left: {
          title: 'Imparfait (description / habit)',
          items: [
            'habitait (lived — ongoing)',
            'était (was — description)',
            'se levait (used to get up)',
            'déjeunait (used to have lunch)',
            'commençait (was beginning)',
          ]
        },
        right: {
          title: 'Passé composé (single event)',
          items: [
            'a lu (read — one moment)',
            'ont dit (said)',
            'a répondu (replied)',
            'a parlé (spoke)',
            'a obéi (obeyed)',
          ]
        }
      },
      callout: {
        kind: 'key',
        text: 'Imparfait paints the background; passé composé marks the events that move the story forward.'
      }
    }
  ],
  check: [
    {
      q: 'Where did Phileas Fogg live?',
      opts: ['Paris', 'New York', 'London, Saville Row', 'Mumbai'],
      ans: 2,
      exp: 'Fogg habitait au 7, Saville Row, à Londres.'
    },
    {
      q: 'What did Fogg read in his newspaper?',
      opts: [
        'That a new train line was opening',
        'That one could travel the world in 80 days',
        'That his friends had won a bet',
        'That the Reform Club was closing'
      ],
      ans: 1,
      exp: 'Fogg a lu qu\'on pouvait faire le tour du monde en quatre-vingts jours.'
    },
    {
      q: 'How much did Fogg bet?',
      opts: ['Ten thousand pounds', 'Twenty thousand pounds', 'Eighty thousand francs', 'One thousand livres'],
      ans: 1,
      exp: 'Fogg a dit : « Je parie vingt mille livres. »'
    },
    {
      q: 'Why is « habitait » (imparfait) used rather than passé composé?',
      opts: [
        'It describes his ongoing living situation, not a single event',
        'It happened only once',
        'It is a reflexive verb',
        'The sentence is negative'
      ],
      ans: 0,
      exp: 'Habitait is imparfait because it describes an ongoing state or habit — he lived there continuously, not as a one-off event.'
    },
    {
      q: 'How did Passepartout react to the news?',
      opts: ['He was delighted and immediately packed', 'He refused to go', 'He was very surprised but obeyed', 'He had already expected it'],
      ans: 2,
      exp: 'Passepartout était très surpris, mais il a obéi — very surprised but he obeyed.'
    }
  ]
},

'fr-l99': {
  id: 'fr-l99',
  title: 'Histoire : Les Misérables',
  icon: '📚',
  tag: 'mastery',
  cards: [
    {
      h: 'Les Misérables — lisez l\'extrait',
      p: ["D'après Victor Hugo, <em>Les Misérables</em> (1862). This passage uses <strong>connecteurs</strong> and <strong>pronouns</strong> to build a complex narrative — skills you have been practising."],
      visual: "<div style='background:linear-gradient(135deg,#f8f4ff,#fff);border-left:4px solid #6d28d9;border-radius:10px;padding:16px;font-size:0.92em;line-height:2'>\n<div style='color:#6d28d9;font-weight:700;font-size:1em;margin-bottom:10px'>⚖️ France, début du XIXe siècle</div>\n<p>Jean Valjean <strong>avait passé</strong> dix-neuf ans en prison. Lorsqu'il est sorti, personne ne voulait lui ouvrir sa porte — ni les auberges, ni les maisons particulières.</p>\n<p><strong>Cependant</strong>, un soir, un vieux prêtre, Monseigneur Myriel, <strong>l'a accueilli</strong> chez lui. Il <strong>lui a donné</strong> à dîner et un lit pour la nuit.</p>\n<p><strong>Or</strong>, la nuit, au lieu de dormir, Jean Valjean s'<strong>est levé</strong> en silence. Il <strong>a pris</strong> l'argenterie et s'<strong>est enfui</strong>.</p>\n<p>Le lendemain matin, les gendarmes <strong>l'ont arrêté</strong> et <strong>l'ont ramené</strong> devant l'évêque.</p>\n<p><em>« Votre Excellence, il a volé votre argenterie ! »</em></p>\n<p>L'évêque a souri. <em>« Non, messieurs. Je <strong>lui ai offert</strong> ces objets. »</em></p>\n<p><strong>Puis</strong>, il a dit à voix basse à Jean Valjean : <em>« N'oubliez jamais : vous avez promis de devenir un homme honnête. »</em></p>\n<p>Jean Valjean était bouleversé. Ces mots <strong>ont changé</strong> sa vie pour toujours.</p>\n</div>"
    },
    {
      h: 'Vocabulaire clé',
      example: {
        title: 'Key words and phrases',
        rows: [
          ['avait passé', 'had spent (plus-que-parfait)'],
          ['cependant', 'however (connecteur)'],
          ['or', 'now / but then (narrative connecteur)'],
          ['puis', 'then / next (connecteur)'],
          ['l\'argenterie', 'the silverware'],
          ['s\'enfuir', 'to flee'],
          ['bouleversé(e)', 'overwhelmed, shaken'],
          ['à voix basse', 'in a low voice'],
        ]
      }
    }
  ],
  check: [
    {
      q: 'How long had Jean Valjean spent in prison?',
      opts: ['Ten years', 'Fifteen years', 'Nineteen years', 'Twenty-five years'],
      ans: 2,
      exp: 'Jean Valjean avait passé dix-neuf ans en prison.'
    },
    {
      q: 'What did the Bishop do when Jean Valjean arrived?',
      opts: ['He called the police', 'He sent him away', 'He welcomed him, gave him dinner and a bed', 'He lent him money'],
      ans: 2,
      exp: 'Monseigneur Myriel l\'a accueilli, lui a donné à dîner et un lit pour la nuit.'
    },
    {
      q: 'What did Jean Valjean steal?',
      opts: ['Money from the safe', 'The Bishop\'s silverware', 'A horse', 'Food from the kitchen'],
      ans: 1,
      exp: 'Jean Valjean a pris l\'argenterie — the silverware.'
    },
    {
      q: 'What did the Bishop tell the police?',
      opts: [
        'That Valjean was a dangerous man',
        'That he had given the silverware to Valjean himself',
        'That he had not seen Valjean',
        'That he wanted Valjean arrested'
      ],
      ans: 1,
      exp: 'L\'évêque a dit : « Je lui ai offert ces objets » — he claimed he had given them to Valjean.'
    },
    {
      q: 'What is the grammatical tense of « avait passé » and why is it used?',
      opts: [
        'Passé composé — a completed action',
        'Plus-que-parfait — an action completed before another past action',
        'Imparfait — an ongoing past state',
        'Futur antérieur — a future completion'
      ],
      ans: 1,
      exp: 'Avait passé is plus-que-parfait — it shows his prison time was already completed before the moment the story begins.'
    }
  ]
},

'fr-l100': {
  id: 'fr-l100',
  title: 'Histoire : La Parure',
  icon: '💎',
  tag: 'mastery',
  cards: [
    {
      h: 'La Parure — lisez l\'extrait',
      p: ["D'après Guy de Maupassant, <em>La Parure</em> (1884). One of Maupassant's most famous short stories. Notice the <strong>conditionnel</strong> and <strong>plus-que-parfait</strong> in the narrative."],
      visual: "<div style='background:linear-gradient(135deg,#fff0f7,#fff);border-left:4px solid #be185d;border-radius:10px;padding:16px;font-size:0.92em;line-height:2'>\n<div style='color:#be185d;font-weight:700;font-size:1em;margin-bottom:10px'>💎 Paris, fin du XIXe siècle</div>\n<p>Mathilde Loisel était une belle jeune femme qui vivait modestement avec son mari, un employé de ministère. Elle <strong>rêvait</strong> de richesse et d'élégance.</p>\n<p>Un soir, son mari <strong>a apporté</strong> une invitation à un grand bal au Ministère. Mathilde <strong>était</strong> désespérée : elle n'avait rien à mettre, aucun bijou.</p>\n<p>Son amie Madame Forestier <strong>lui a prêté</strong> un magnifique collier de diamants. Au bal, Mathilde était la plus belle de toutes. Elle <strong>a dansé</strong> toute la nuit, ravie.</p>\n<p>Mais en rentrant, elle <strong>a découvert</strong> avec horreur que le collier <strong>avait disparu</strong>.</p>\n<p>Le couple <strong>a cherché</strong> partout — en vain. Ils <strong>ont acheté</strong> alors un collier semblable pour trente-six mille francs et <strong>ont travaillé</strong> dix ans pour rembourser leurs dettes.</p>\n<p>Dix ans plus tard, Mathilde <strong>a croisé</strong> Madame Forestier. Son amie ne la reconnaissait plus — Mathilde <strong>avait vieilli</strong>.</p>\n<p><em>« Je dois vous dire quelque chose. Ce collier que vous m'avez prêté — je l'ai perdu. Nous en avons acheté un autre. »</em></p>\n<p>Madame Forestier, émue, a répondu : <em>« Oh, ma pauvre Mathilde ! Mais le mien <strong>était faux</strong>. Il ne <strong>valait</strong> pas plus de cinq cents francs… »</em></p>\n</div>"
    },
    {
      h: 'Vocabulaire et structures clés',
      example: {
        title: 'Key words and grammar structures',
        rows: [
          ['rêver de + nom', 'to dream of something'],
          ['n\'avoir rien à mettre', 'to have nothing to wear'],
          ['prêter', 'to lend'],
          ['avait disparu', 'had disappeared (plus-que-parfait)'],
          ['en vain', 'in vain / without success'],
          ['rembourser', 'to pay back, reimburse'],
          ['vieillir', 'to age, grow old'],
          ['avait vieilli', 'had aged (plus-que-parfait)'],
          ['émue', 'moved / touched (emotion)'],
        ]
      }
    }
  ],
  check: [
    {
      q: 'Why was Mathilde upset when she received the ball invitation?',
      opts: [
        'She did not like balls',
        'She had nothing to wear and no jewellery',
        'She was ill',
        'She did not know anyone at the Ministry'
      ],
      ans: 1,
      exp: 'Mathilde était désespérée : elle n\'avait rien à mettre, aucun bijou — nothing to wear and no jewels.'
    },
    {
      q: 'How did Mathilde get a diamond necklace for the ball?',
      opts: [
        'Her husband bought her one',
        'She found it in the street',
        'She borrowed it from her friend Madame Forestier',
        'She stole it from a jewellery shop'
      ],
      ans: 2,
      exp: 'Madame Forestier lui a prêté un magnifique collier de diamants — she lent it to her.'
    },
    {
      q: 'How much did the replacement necklace cost?',
      opts: ['Five hundred francs', 'Ten thousand francs', 'Twenty thousand francs', 'Thirty-six thousand francs'],
      ans: 3,
      exp: 'Ils ont acheté un collier semblable pour trente-six mille francs — thirty-six thousand francs.'
    },
    {
      q: 'What is the twist at the end of the story?',
      opts: [
        'The necklace was found in the house',
        'Madame Forestier had not noticed the loss',
        'The original necklace was fake and only worth 500 francs',
        'Mathilde wins the money back at cards'
      ],
      ans: 2,
      exp: 'Madame Forestier révèle : « le mien était faux — il ne valait pas plus de cinq cents francs. » Ten years of poverty for a fake necklace.'
    },
    {
      q: 'What does « avait disparu » (plus-que-parfait) tell us?',
      opts: [
        'The necklace will disappear in the future',
        'The disappearance had already happened before Mathilde noticed it',
        'Mathilde was watching the necklace disappear',
        'The necklace disappears regularly'
      ],
      ans: 1,
      exp: 'Plus-que-parfait (avait disparu) = an action completed before another past moment. By the time Mathilde checked, the necklace had already gone.'
    }
  ]
},

};

// ── Final lesson orders for each unit ─────────────────────────────────────────
// (Includes all ordering fixes + new story lessons inserted at strategic points)
const FINAL_ORDERS = {

'fr-a1': [
  'fr-l01',  // Saluer et se présenter
  'fr-l09',  // Les verbes en -ER au présent
  'fr-l04',  // Les articles et le genre
  'fr-l02',  // Le verbe « être »
  'fr-l03',  // « Avoir »
  'fr-l10',  // La négation et les questions
  'fr-l45',  // Les chiffres (1–100)
  'fr-l86',  // Les grands nombres (MOVED: near chiffres where it belongs)
  'fr-l05',  // Le pluriel des noms
  'fr-l92',  // Le genre des noms
  'fr-l40',  // La prononciation et les accents
  'fr-l59',  // Prononciation — sons de base
  'fr-l07',  // Quelle heure est-il ?
  'fr-l11',  // La famille et les adjectifs possessifs
  'fr-l12',  // Décrire : les adjectifs
  'fr-l75',  // Les couleurs
  'fr-l13',  // Nationalités, pays et langues
  'fr-l53',  // Conjugaison : verbes réguliers
  'fr-l76',  // La classe et les objets
  'fr-l14',  // « Aller », « faire » et les loisirs
  'fr-l15',  // Manger et boire : au café
  'fr-l16',  // Le temps et les saisons
  'fr-l41',  // Le corps et la santé (A1.1 — keep before story/A1.2)
  'fr-l97',  // STORY: La Cigale et la Fourmi (midpoint checkpoint, A1.2)
  'fr-l68',  // Les jours, les mois et les dates
  'fr-l69',  // La maison et les pièces
  'fr-l39',  // Les transports, les directions
  'fr-l62',  // Ordre des mots — A1
  'fr-l56',  // Dialogues du quotidien — A1
  'fr-l46',  // La famille élargie
  'fr-l47',  // Les quantités et les mesures
  'fr-l50',  // Les activités saisonnières
  'fr-l65',  // Écoute active — A1
  'fr-l52',  // Expressions idiomatiques
  'fr-l32',  // Histoire : Au café
  'fr-l33',  // Histoire : Ma famille
  'fr-l17',  // Examen A1
],

'fr-a2': [
  'fr-l18',  // Le passé composé — avoir
  'fr-l19',  // Le passé composé — être
  'fr-l55',  // Le passé composé — révision (MOVED: right after PC teaching)
  'fr-l23',  // Les verbes pronominaux
  'fr-l20',  // L'imparfait
  'fr-l21',  // Imparfait ou passé composé ?
  'fr-l98',  // STORY: Le Tour du Monde (checkpoint after past tenses)
  'fr-l38',  // Les verbes irréguliers essentiels
  'fr-l54',  // Conjugaison : faire/vouloir/pouvoir/devoir
  'fr-l22',  // Le futur proche et le futur simple
  'fr-l70',  // Les adjectifs et pronoms démonstratifs
  'fr-l24',  // Les pronoms COD et COI
  'fr-l25',  // Le comparatif et le superlatif
  'fr-l71',  // Les pronoms relatifs — qui, que, où
  'fr-l77',  // Les adverbes de fréquence
  'fr-l42',  // Les vêtements et le shopping
  'fr-l43',  // Le travail et la vie professionnelle
  'fr-l48',  // Faire les courses
  'fr-l49',  // Les transports et les directions
  'fr-l51',  // Au restaurant
  'fr-l74',  // La santé — chez le médecin
  'fr-l72',  // Écrire une lettre ou un e-mail
  'fr-l73',  // Exprimer son opinion
  'fr-l60',  // Prononciation — nasales, liaison, élision
  'fr-l63',  // Ordre des mots — A2
  'fr-l78',  // Le discours indirect
  'fr-l57',  // Dialogues du quotidien — A2
  'fr-l66',  // Écoute active — A2
  'fr-l34',  // Histoire : Le week-end dernier
  'fr-l35',  // Histoire : Lettre de Lyon
  'fr-l82',  // Les faux amis
  'fr-l87',  // La culture française
  'fr-l88',  // Textes authentiques — pratique A2 (MOVED from B1; sublevel A2.2)
  'fr-l26',  // Examen A2
],

'fr-b1': [
  'fr-l27',  // Le conditionnel présent
  'fr-l44',  // Les pronoms Y et EN
  'fr-l29',  // Les pronoms relatifs
  'fr-l28',  // Le subjonctif présent
  'fr-l79',  // Le plus-que-parfait
  'fr-l81',  // Les connecteurs et le discours
  'fr-l30',  // Exprimer son opinion (MOVED: grouped with core discourse lessons)
  'fr-l80',  // La voix passive
  'fr-l99',  // STORY: Les Misérables (checkpoint after core B1 grammar)
  'fr-l83',  // Le gérondif
  'fr-l84',  // Le futur antérieur
  'fr-l85',  // Le conditionnel passé
  'fr-l100', // STORY: La Parure (checkpoint after complex tenses)
  'fr-l58',  // Situations formelles — B1
  'fr-l61',  // Prononciation — registre et intonation
  'fr-l64',  // Ordre des mots — B1
  'fr-l67',  // Écoute active — B1
  'fr-l89',  // Textes authentiques — pratique B1
  'fr-l90',  // Les expressions idiomatiques
  'fr-l91',  // Le français professionnel
  'fr-l36',  // Histoire : Un débat
  'fr-l37',  // Histoire : Changer de vie
  'fr-l31',  // Examen B1
],

'fr-b2': [
  'fr-l93',  // Le subjonctif — usage avancé
  'fr-l94',  // La concession avancée
  'fr-l96',  // Le registre et le style
  'fr-l95',  // La nominalisation
],

};

// ── Tags for all lessons (complete map) ───────────────────────────────────────
const ALL_TAGS = {
  // A1
  'fr-l01':'core','fr-l09':'core','fr-l04':'core','fr-l02':'core','fr-l03':'core',
  'fr-l10':'core','fr-l45':'core','fr-l86':'advanced','fr-l05':'core',
  'fr-l92':'advanced','fr-l40':'core','fr-l59':'core','fr-l07':'core',
  'fr-l11':'core','fr-l12':'core','fr-l75':'core','fr-l13':'core',
  'fr-l53':'core','fr-l76':'core','fr-l14':'core','fr-l15':'core','fr-l16':'core',
  'fr-l97':'mastery',
  'fr-l41':'core','fr-l68':'core','fr-l69':'core','fr-l39':'core',
  'fr-l62':'advanced','fr-l56':'advanced','fr-l46':'advanced',
  'fr-l47':'advanced','fr-l50':'advanced',
  'fr-l65':'core','fr-l52':'mastery','fr-l32':'mastery','fr-l33':'mastery','fr-l17':'core',
  // A2
  'fr-l18':'core','fr-l19':'core','fr-l55':'core','fr-l23':'core',
  'fr-l20':'core','fr-l21':'core',
  'fr-l98':'mastery',
  'fr-l38':'core','fr-l54':'core','fr-l22':'core','fr-l70':'core',
  'fr-l24':'core','fr-l25':'core','fr-l71':'core','fr-l77':'core',
  'fr-l42':'core','fr-l43':'core','fr-l48':'core','fr-l49':'core',
  'fr-l51':'core','fr-l74':'core',
  'fr-l72':'advanced','fr-l73':'advanced','fr-l60':'advanced',
  'fr-l63':'advanced','fr-l78':'advanced','fr-l57':'advanced',
  'fr-l66':'core','fr-l34':'mastery','fr-l35':'mastery',
  'fr-l82':'mastery','fr-l87':'mastery','fr-l88':'core','fr-l26':'core',
  // B1
  'fr-l27':'core','fr-l44':'core','fr-l29':'core','fr-l28':'core',
  'fr-l79':'core','fr-l81':'core','fr-l30':'core','fr-l80':'core',
  'fr-l99':'mastery',
  'fr-l83':'advanced','fr-l84':'advanced','fr-l85':'advanced',
  'fr-l100':'mastery',
  'fr-l58':'advanced','fr-l61':'advanced','fr-l64':'advanced',
  'fr-l67':'core','fr-l89':'core',
  'fr-l90':'mastery','fr-l91':'mastery','fr-l36':'mastery','fr-l37':'mastery','fr-l31':'core',
  // B2
  'fr-l93':'core','fr-l94':'core','fr-l96':'advanced','fr-l95':'advanced',
};

// ── Apply reordering ───────────────────────────────────────────────────────────
// Build a global pool so lessons can be moved across units
const globalPool = {};
for (const unit of lp) {
  for (const L of unit.lessons) globalPool[L.id] = L;
}
for (const [id, obj] of Object.entries(STORY_LESSONS)) globalPool[id] = obj;

let changed = 0;
for (const unit of lp) {
  const order = FINAL_ORDERS[unit.id];
  if (!order) continue;

  // byId: lessons currently in this unit OR in the global pool (covers cross-unit moves)
  const byId = {};
  for (const id of order) {
    if (globalPool[id]) byId[id] = globalPool[id];
  }

  const missing = order.filter(id => !byId[id]);
  if (missing.length) { console.error(`[${unit.id}] Missing lessons:`, missing); process.exit(1); }

  // Sanity: every lesson in old unit should appear somewhere in FINAL_ORDERS
  const allNewIds = new Set(Object.values(FINAL_ORDERS).flat());
  const orphaned  = unit.lessons.map(l => l.id).filter(id => !allNewIds.has(id));
  if (orphaned.length) { console.error(`[${unit.id}] Orphaned lessons (not in any new order):`, orphaned); process.exit(1); }

  unit.lessons = order.map(id => {
    const L = byId[id];
    L.tag = ALL_TAGS[id] || 'core';
    return L;
  });
  changed++;
  console.log(`Reordered ${unit.id} (${order.length} lessons)`);
}
console.log(`\nReordered ${changed} units.`);

// ── Reconstruct FR_LEARN_PATH in source ───────────────────────────────────────
const lpMarker = 'window.FR_LEARN_PATH = window.FR_LEARN_PATH = ';
const start = src.indexOf(lpMarker);
if (start === -1) { console.error('Cannot find FR_LEARN_PATH'); process.exit(1); }
const arrayStart = src.indexOf('[', start);
let depth = 0, end = -1;
for (let i = arrayStart; i < src.length; i++) {
  if (src[i] === '[') depth++;
  else if (src[i] === ']') { depth--; if (depth === 0) { end = i + 1; break; } }
}
if (end === -1) { console.error('Cannot find end of FR_LEARN_PATH'); process.exit(1); }
while (end < src.length && (src[end] === ';' || src[end] === '\n')) end++;

src = src.slice(0, start) + lpMarker + JSON.stringify(lp, null, 2) + ';\n' + src.slice(end);

// ── Add new lessons to FR_LESSON_CEFR_SUBLEVEL ────────────────────────────────
const newSublevels = [
  ["'fr-l97': 'A1.2'", 'A1.2'],
  ["'fr-l98': 'A2.1'", 'A2.1'],
  ["'fr-l99': 'B1'",   'B1'],
  ["'fr-l100': 'B1'",  'B1'],
];

// Find the last B1 entry as an insertion anchor
const b1Anchor = /'fr-l89':\s*'B1'/;
for (const [entry] of newSublevels) {
  if (!src.includes(entry.split(':')[0].trim())) {
    const m = b1Anchor.exec(src);
    if (!m) { console.warn('Cannot find B1 anchor for sublevel insertion'); continue; }
    const pos = m.index + m[0].length;
    const insertion = ',\n  ' + entry;
    src = src.slice(0, pos) + insertion + src.slice(pos);
    console.log('Added sublevel entry:', entry);
  }
}

fs.writeFileSync(filePath, src, 'utf8');
console.log('\nDone — ordering fixed, stories added, sublevels updated.');
