'use strict';
/**
 * Add 17 new story lessons (fr-l101–fr-l117) placed every ~3 lessons throughout
 * A1, A2, B1 and B2. Stories use public domain literature where available,
 * original texts otherwise. Each story consolidates the preceding 3 lessons.
 *
 * Final unit sizes: A1=45, A2=40, B1=25, B2=5
 */
const fs   = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'french-data.js');
let src = fs.readFileSync(filePath, 'utf8');

const patched = src.replace(/window\.(\w+)\s*=/g, 'global.$1 =');
new Function('global', patched)(global);

const lp = global.FR_LEARN_PATH;

// Build lookup of all existing lesson objects
const allLessons = {};
for (const unit of lp) {
  for (const L of unit.lessons) allLessons[L.id] = L;
}

// ── Story lesson definitions ──────────────────────────────────────────────────

const STORY_LESSONS = {

// ────────── A1 STORIES ──────────────────────────────────────────────────────

'fr-l101': {
  id: 'fr-l101',
  title: 'Histoire : Bonjour, Paris !',
  icon: '🗼',
  tag: 'mastery',
  cards: [
    {
      h: 'Bonjour, Paris ! — lisez l\'histoire',
      p: ['An original A1 story. Marie arrives in Paris and uses ER verbs, definite/indefinite articles and basic greetings. Read the story then answer the questions.'],
      visual: `<div style="background:#fff9f0;border-left:4px solid #ff6b35;padding:16px;border-radius:10px;font-size:0.93em;line-height:2">
<div style="color:#c0392b;font-weight:700;margin-bottom:10px">📖 Bonjour, Paris !</div>
<p>Marie <strong>arrive</strong> à Paris pour la première fois. Elle <strong>cherche</strong> son hôtel dans le quartier Latin.</p>
<p>Dans la rue, un homme <strong>parle</strong> à une femme. Marie <strong>demande</strong> : <em>« Excusez-moi ! Je <strong>cherche</strong> l'Hôtel des Artistes. »</em></p>
<p>L'homme <strong>répond</strong> : <em>« Bonjour ! L'hôtel est dans la rue Victor Hugo. Vous <strong>continuez</strong> tout droit et vous <strong>tournez</strong> à gauche. »</em></p>
<p>Marie <strong>marche</strong> cinq minutes. Elle <strong>trouve</strong> une boulangerie, une librairie, un café… et l'hôtel !</p>
<p>À la réception, elle <strong>parle</strong> avec le réceptionniste :<br>
<em>« Bonjour, je m'appelle Marie Dupont. J'ai une réservation. »<br>
« Bienvenue, madame ! Voilà la clé de votre chambre. »</em></p>
<p>Marie <strong>entre</strong> dans sa chambre. Elle <strong>adore</strong> Paris !</p>
</div>`
    },
    {
      h: 'Vocabulaire clé',
      example: {
        title: 'Key words from the story',
        rows: [
          ['arriver', 'to arrive'],
          ['chercher', 'to look for'],
          ['demander', 'to ask'],
          ['trouver', 'to find'],
          ['marcher', 'to walk'],
          ['entrer', 'to enter / go in'],
          ['la clé', 'the key (f)'],
          ['la chambre', 'the room (f)'],
          ['le réceptionniste', 'the receptionist (m)'],
          ['tout droit', 'straight ahead'],
        ]
      }
    }
  ],
  check: [
    {
      q: 'Qu\'est-ce que Marie cherche dans le quartier Latin ?',
      opts: ['Un restaurant', 'Son hôtel', 'Une boulangerie', 'Un musée'],
      ans: 1,
      exp: 'Marie cherche son hôtel — she is looking for her hotel in the Latin Quarter.'
    },
    {
      q: '"L\'hôtel" — why is it "l\'" instead of "le" or "la"?',
      opts: ['Because "hôtel" is feminine', 'Because "hôtel" begins with a vowel sound', 'Because it is plural', 'Because it is a special word'],
      ans: 1,
      exp: 'In French, "le" and "la" contract to "l\'" before a word starting with a vowel or silent h. "Hôtel" starts with a silent h, so we use "l\'hôtel".'
    },
    {
      q: 'Which -ER verb from the story means "to walk"?',
      opts: ['chercher', 'trouver', 'marcher', 'parler'],
      ans: 2,
      exp: '"Marcher" means to walk. It is a regular -ER verb: je marche, tu marches, il marche…'
    },
    {
      q: '"Une boulangerie, une librairie, un café" — why does "café" use "un" but "boulangerie" uses "une"?',
      opts: ['"Café" is masculine and "boulangerie" is feminine', '"Café" is feminine and "boulangerie" is masculine', 'Both are feminine', 'Both are masculine'],
      ans: 0,
      exp: '"Café" (m) → un café. "Boulangerie" (f) and "librairie" (f) → une boulangerie / une librairie.'
    },
    {
      q: 'How does Marie greet the receptionist?',
      opts: ['Au revoir', 'Merci', 'Bonjour', 'Excusez-moi'],
      ans: 2,
      exp: 'Marie says "Bonjour" — the standard greeting in French at any time of day.'
    }
  ]
},

'fr-l102': {
  id: 'fr-l102',
  title: 'Histoire : Le Corbeau et le Renard',
  icon: '🦊',
  tag: 'mastery',
  cards: [
    {
      h: 'Le Corbeau et le Renard — lisez la fable',
      p: ['Adapted from Jean de La Fontaine (1668). This simplified version uses être, avoir and basic negation — the grammar you have just studied. Read carefully, then answer the questions.'],
      visual: `<div style="background:#f0fff4;border-left:4px solid #16a34a;padding:16px;border-radius:10px;font-size:0.93em;line-height:2">
<div style="color:#166534;font-weight:700;margin-bottom:10px">🦊 Le Corbeau et le Renard — d'après La Fontaine (1668)</div>
<p>Un corbeau <strong>est</strong> sur un arbre. Il <strong>a</strong> un grand fromage dans le bec.</p>
<p>Un renard <strong>arrive</strong> sous l'arbre. Il n'<strong>a</strong> pas de fromage. Il <strong>a</strong> très faim.</p>
<p>Le renard regarde le corbeau et dit :<br>
<em>« Bonjour ! Vous <strong>êtes</strong> très beau ! Vous <strong>avez</strong> une belle voix ? »</em></p>
<p>Le corbeau <strong>est</strong> content. Il ouvre le bec pour chanter.</p>
<p>Le fromage <strong>tombe</strong> de l'arbre.</p>
<p>Le renard prend le fromage et dit :<br>
<em>« Merci, Monsieur le Corbeau ! Vous n'<strong>êtes</strong> pas intelligent ! »</em></p>
<p>Le corbeau n'<strong>est</strong> pas content. Il n'<strong>a</strong> plus de fromage.</p>
<p><strong>Morale :</strong> Ne soyez pas naïf !</p>
</div>`
    },
    {
      h: 'Vocabulaire clé',
      example: {
        title: 'Key words from the fable',
        rows: [
          ['un corbeau', 'a crow (m)'],
          ['un renard', 'a fox (m)'],
          ['un fromage', 'a cheese (m)'],
          ['le bec', 'the beak (m)'],
          ['avoir faim', 'to be hungry'],
          ['ouvrir', 'to open'],
          ['tomber', 'to fall'],
          ['ne … plus', 'no longer / not any more'],
          ['naïf / naïve', 'naive'],
        ]
      }
    }
  ],
  check: [
    {
      q: 'Où est le corbeau au début de l\'histoire ?',
      opts: ['Sur le sol', 'Dans l\'eau', 'Sur un arbre', 'Dans une maison'],
      ans: 2,
      exp: 'Le corbeau est sur un arbre — the crow is up in a tree.'
    },
    {
      q: '"Il n\'a pas de fromage" — what does this mean?',
      opts: ['He has cheese', 'He doesn\'t have any cheese', 'He wants cheese', 'He hates cheese'],
      ans: 1,
      exp: '"Il n\'a pas de fromage" uses the negation ne … pas + avoir. With negation, "un/une/du/de la" all become "de".'
    },
    {
      q: '"Le renard a très faim." Which verb is used here?',
      opts: ['être', 'aller', 'avoir', 'faire'],
      ans: 2,
      exp: '"Avoir" (to have) is used in the expression "avoir faim" (to be hungry). In French, hunger uses "avoir", not "être".'
    },
    {
      q: '"Vous êtes très beau !" — which verb is "êtes"?',
      opts: ['avoir (vous avez)', 'être (vous êtes)', 'aller (vous allez)', 'faire (vous faites)'],
      ans: 1,
      exp: '"Êtes" is the vous form of "être" (to be): je suis, tu es, il est, nous sommes, vous êtes, ils sont.'
    },
    {
      q: 'Why does the crow open his beak?',
      opts: ['He is angry', 'He wants to eat', 'He wants to sing', 'He is bored'],
      ans: 2,
      exp: 'The fox flatters the crow about his voice. The crow opens his beak to sing — and drops the cheese!'
    }
  ]
},

'fr-l103': {
  id: 'fr-l103',
  title: 'Histoire : Au marché',
  icon: '🧺',
  tag: 'mastery',
  cards: [
    {
      h: 'Au marché — lisez l\'histoire',
      p: ['An original A1 story focusing on numbers (1–10 000) and plural nouns — exactly what you have just practised. Follow Mme Leblanc on her Saturday market trip.'],
      visual: `<div style="background:#fefce8;border-left:4px solid #ca8a04;padding:16px;border-radius:10px;font-size:0.93em;line-height:2">
<div style="color:#92400e;font-weight:700;margin-bottom:10px">🧺 Au marché du village</div>
<p>Chaque samedi, Mme Leblanc va au <strong>marché</strong> du village. Elle achète des <strong>légumes</strong>, des <strong>fruits</strong> et du pain.</p>
<p><em>« Bonjour madame ! J'ai de belles <strong>tomates</strong> aujourd'hui. Deux euros le kilo ! »</em> dit le marchand.</p>
<p><em>« Je prends trois kilos de tomates et deux kilos de <strong>carottes</strong>, s'il vous plaît. »</em></p>
<p><em>« Très bien ! Trois kilos à deux euros, c'est <strong>six euros</strong>. Et les carottes, c'est un euro cinquante le kilo — donc <strong>trois euros</strong>. Total : <strong>neuf euros</strong>. »</em></p>
<p>Mme Leblanc achète aussi des <strong>pommes</strong> (quatre-vingts centimes le kilo) et des <strong>oranges</strong>.</p>
<p>Elle paie avec un billet de <strong>vingt euros</strong> et reçoit <strong>onze euros</strong> de monnaie.</p>
<p>À la fin, elle a six <strong>sacs</strong> pleins de bonnes choses !</p>
</div>`
    },
    {
      h: 'Vocabulaire clé',
      example: {
        title: 'Key words from the story',
        rows: [
          ['le marché', 'the market (m)'],
          ['le marchand', 'the vendor / stallholder (m)'],
          ['un légume', 'a vegetable (m)'],
          ['un fruit', 'a fruit (m)'],
          ['un sac', 'a bag (m)'],
          ['acheter', 'to buy'],
          ['payer', 'to pay'],
          ['la monnaie', 'the change / coins (f)'],
          ['quatre-vingts', '80'],
          ['chaque', 'each / every'],
        ]
      }
    }
  ],
  check: [
    {
      q: 'How much do the tomatoes cost per kilo?',
      opts: ['One euro', 'Two euros', 'Three euros', 'Fifty cents'],
      ans: 1,
      exp: '"Deux euros le kilo" — the tomatoes cost two euros per kilo.'
    },
    {
      q: 'Mme Leblanc buys 3 kg of tomatoes at €2/kg. How much is that?',
      opts: ['Five euros', 'Six euros', 'Seven euros', 'Eight euros'],
      ans: 1,
      exp: '3 × 2 = 6 — trois fois deux font six euros.'
    },
    {
      q: '"Des légumes, des fruits" — "des" is the plural of which article?',
      opts: ['le / la', 'l\'', 'un / une', 'ce / cette'],
      ans: 2,
      exp: '"Des" is the plural indefinite article, the plural form of "un" (m) or "une" (f): un sac → des sacs.'
    },
    {
      q: 'What is the plural of "sac" (bag)?',
      opts: ['sacs', 'saces', 'sac', 'sacx'],
      ans: 0,
      exp: 'Most French nouns form their plural by adding -s: un sac → des sacs. The -s is not pronounced.'
    },
    {
      q: '"Quatre-vingts" means…',
      opts: ['60', '70', '80', '90'],
      ans: 2,
      exp: '"Quatre-vingts" literally means "four twenties" (4 × 20 = 80). Note the -s on vingts when it ends the number.'
    }
  ]
},

'fr-l104': {
  id: 'fr-l104',
  title: 'Histoire : La Dictée de Mme Moreau',
  icon: '✏️',
  tag: 'mastery',
  cards: [
    {
      h: 'La Dictée de Mme Moreau — lisez l\'histoire',
      p: ['An original A1 story. A dictation class highlights gender rules and French vowel sounds — consolidating the pronunciation and gender lessons you have just completed.'],
      visual: `<div style="background:#fdf4ff;border-left:4px solid #9333ea;padding:16px;border-radius:10px;font-size:0.93em;line-height:2">
<div style="color:#6b21a8;font-weight:700;margin-bottom:10px">✏️ La Dictée de Mme Moreau</div>
<p>Dans la salle de classe, les élèves sont prêts pour la <strong>dictée</strong> de Mme Moreau.</p>
<p>Mme Moreau dit : <em>« Écoutez bien et écrivez ! »</em></p>
<p>Elle lit lentement : <em>« La belle <strong>table</strong> ronde est dans le salon. »</em></p>
<p>Thomas écrit « <strong>le</strong> belle table ». Il se trompe ! "Table" est <strong>féminin</strong> — c'est "la table", pas "le table" !</p>
<p>Ensuite Mme Moreau lit : <em>« Un grand <strong>chat</strong> noir dort sous une chaise. »</em></p>
<p>Sophie hésite — "chat", est-ce masculin ou féminin ? C'est <strong>masculin</strong> : "un chat", pas "une chat" !</p>
<p>Puis Mme Moreau lit : <em>« La <strong>fenêtre</strong> est fermée. »</em><br>
Le son /e/ dans "fermée" — c'est le <strong>é fermé</strong>. Dans "fenêtre" — c'est le <strong>ê ouvert</strong> !</p>
<p>À la fin, Mme Moreau corrige les dictées. Thomas a <strong>trois fautes</strong>. Sophie a <strong>zéro faute</strong>.</p>
<p><em>« Bravo, Sophie ! »</em> dit Mme Moreau.</p>
</div>`
    },
    {
      h: 'Vocabulaire clé',
      example: {
        title: 'Key words from the story',
        rows: [
          ['la dictée', 'dictation (f)'],
          ['un élève', 'a pupil (m)'],
          ['se tromper', 'to make a mistake'],
          ['lentement', 'slowly'],
          ['masculin / féminin', 'masculine / feminine'],
          ['une faute', 'a mistake (f)'],
          ['le é fermé', 'closed /e/ sound (as in été)'],
          ['le ê ouvert', 'open /ɛ/ sound (as in fête)'],
          ['corriger', 'to correct'],
        ]
      }
    }
  ],
  check: [
    {
      q: '"Table" — quel est le genre de ce nom ?',
      opts: ['Masculin', 'Féminin', 'Neutre', 'Les deux'],
      ans: 1,
      exp: '"Table" est féminin → "la table". Thomas\'s mistake was writing "le belle table" instead of "la belle table".'
    },
    {
      q: '"Un grand chat" — what gender is "chat" (cat)?',
      opts: ['Feminine', 'Masculine', 'Neutral', 'Plural'],
      ans: 1,
      exp: '"Chat" is masculine → "un chat". Note that the grammatical gender of a noun is often unpredictable and must be learned.'
    },
    {
      q: 'Which article goes with a feminine noun when it is singular?',
      opts: ['un', 'le', 'la', 'des'],
      ans: 2,
      exp: '"La" is the definite article for singular feminine nouns (la table, la fenêtre). "Le" is for masculine nouns.'
    },
    {
      q: 'The sound in "fermée" (/e/) is described as…',
      opts: ['é ouvert', 'é fermé', 'é nasal', 'é muet'],
      ans: 1,
      exp: 'The closed /e/ sound (é fermé) as in "été", "fermée", "café". The open /ɛ/ (ê ouvert) appears in "fenêtre", "fête".'
    },
    {
      q: 'How many mistakes does Sophie make in the dictation?',
      opts: ['Three', 'One', 'Two', 'Zero'],
      ans: 3,
      exp: '"Sophie a zéro faute" — Sophie makes zero mistakes. Thomas makes three.'
    }
  ]
},

'fr-l105': {
  id: 'fr-l105',
  title: 'Histoire : La famille Martin',
  icon: '👨‍👩‍👧',
  tag: 'mastery',
  cards: [
    {
      h: 'La famille Martin — lisez l\'histoire',
      p: ['An original A1 story told by Léa about her family. It practises telling the time, possessive adjectives (mon, ma, mes…) and descriptive adjectives — exactly what you have just studied.'],
      visual: `<div style="background:#fff0f6;border-left:4px solid #db2777;padding:16px;border-radius:10px;font-size:0.93em;line-height:2">
<div style="color:#9d174d;font-weight:700;margin-bottom:10px">👨‍👩‍👧 La famille Martin</div>
<p>La famille Martin habite dans une belle maison à Lyon.</p>
<p><strong>Mon père</strong> s'appelle Paul. Il est <em>grand</em> et <em>sportif</em>. Il commence son travail à <strong>huit heures et demie</strong>.</p>
<p><strong>Ma mère</strong> s'appelle Claire. Elle est <em>gentille</em> et <em>intelligente</em>. Sa réunion est à <strong>dix heures</strong>.</p>
<p><strong>Mon frère</strong> Thomas est <em>petit</em> et <em>timide</em>. <strong>Son</strong> école commence à <strong>huit heures moins le quart</strong>.</p>
<p><strong>Ma sœur</strong> Camille est <em>grande</em> et <em>bavarde</em>. <strong>Ses</strong> amies arrivent chez nous à <strong>midi</strong>.</p>
<p>Et moi ? Je m'appelle Léa. <strong>Mon</strong> chat est noir et blanc. Il est <em>mignon</em> !</p>
<p>Le soir, nous mangeons ensemble à <strong>sept heures et quart</strong>. <strong>Ma</strong> famille est formidable !</p>
</div>`
    },
    {
      h: 'Vocabulaire clé',
      example: {
        title: 'Key words and structures',
        rows: [
          ['sportif / sportive', 'sporty'],
          ['gentil / gentille', 'kind'],
          ['timide', 'shy'],
          ['bavard / bavarde', 'talkative'],
          ['mignon / mignonne', 'cute'],
          ['formidable', 'wonderful / great'],
          ['ensemble', 'together'],
          ['huit heures et demie', 'half past eight'],
          ['huit heures moins le quart', 'quarter to eight'],
          ['sept heures et quart', 'quarter past seven'],
        ]
      }
    }
  ],
  check: [
    {
      q: '"Son école" — the possessive "son" refers to whose school?',
      opts: ['Léa\'s school', 'Thomas\'s school', 'Camille\'s school', 'Paul\'s school'],
      ans: 1,
      exp: '"Son école" = his school. The preceding sentence is about Thomas, so "son" refers to Thomas\'s school. Note: "son" is used before feminine nouns beginning with a vowel (école) for sound reasons.'
    },
    {
      q: '"Ses amies arrivent" — why is "ses" used here?',
      opts: ['Because the owner is feminine', 'Because the noun is plural', 'Because it is a formal register', 'Because it is a masculine noun'],
      ans: 1,
      exp: '"Ses" is the plural possessive adjective (his/her/its when the owned noun is plural). Camille\'s friends are plural → ses amies.'
    },
    {
      q: '"Thomas est petit et timide." Which adjective describes his personality (not appearance)?',
      opts: ['petit', 'timide', 'grand', 'sportif'],
      ans: 1,
      exp: '"Timide" (shy) is a personality adjective. "Petit" (small/short) describes physical appearance.'
    },
    {
      q: 'The family eats dinner together at what time?',
      opts: ['Seven o\'clock', 'Quarter past seven', 'Half past seven', 'Quarter to seven'],
      ans: 1,
      exp: '"Sept heures et quart" = quarter past seven (7:15). "Et quart" always means + 15 minutes.'
    },
    {
      q: '"Ma mère" — what does "ma" mean?',
      opts: ['the', 'a', 'my', 'her'],
      ans: 2,
      exp: '"Ma" is the feminine singular possessive adjective meaning "my". My father = mon père (m), my mother = ma mère (f).'
    }
  ]
},

'fr-l106': {
  id: 'fr-l106',
  title: 'Histoire : Une classe internationale',
  icon: '🌍',
  tag: 'mastery',
  cards: [
    {
      h: 'Une classe internationale — lisez l\'histoire',
      p: ['An original A1 story set in a Paris language school. It practises nationalities, colours and regular -ER verb conjugation — all topics from your recent lessons.'],
      visual: `<div style="background:#f0f9ff;border-left:4px solid #0284c7;padding:16px;border-radius:10px;font-size:0.93em;line-height:2">
<div style="color:#075985;font-weight:700;margin-bottom:10px">🌍 Une classe internationale</div>
<p>Dans mon école de langues à Paris, il y a des étudiants de toutes nationalités.</p>
<p><strong>Ahmed</strong> vient d'Algérie. Il <strong>parle</strong> arabe et français. Il <strong>porte</strong> un T-shirt <em>rouge</em>.</p>
<p><strong>Yuki</strong> vient du Japon. Elle <strong>parle</strong> japonais. Elle <strong>porte</strong> une robe <em>blanche</em> et <em>bleue</em>.</p>
<p><strong>Carlos</strong> vient d'Espagne. Il <strong>parle</strong> espagnol. Il <strong>préfère</strong> les vêtements <em>noirs</em>.</p>
<p><strong>Emma</strong> vient d'Angleterre. Elle <strong>parle</strong> anglais. Elle <strong>porte</strong> un manteau <em>vert</em>.</p>
<p><strong>Paulo</strong> vient du Brésil. Il <strong>parle</strong> portugais. Il <strong>aime</strong> les couleurs vives — son sac est <em>jaune</em> et <em>orange</em> !</p>
<p>Nous <strong>étudions</strong> tous le français ensemble. Nous <strong>écoutons</strong> le professeur, nous <strong>répétons</strong> les phrases et nous <strong>chantons</strong> des chansons françaises.</p>
<p>Le professeur <strong>demande</strong> : <em>« De quelle couleur est le drapeau français ? »</em></p>
<p><em>« Bleu, blanc, rouge ! »</em> <strong>répondons</strong>-nous tous ensemble.</p>
</div>`
    },
    {
      h: 'Vocabulaire clé',
      example: {
        title: 'Key words from the story',
        rows: [
          ['venir de', 'to come from'],
          ['porter', 'to wear'],
          ['une robe', 'a dress (f)'],
          ['un manteau', 'a coat (m)'],
          ['vif / vive', 'bright / vivid'],
          ['un drapeau', 'a flag (m)'],
          ['répéter', 'to repeat'],
          ['chanter', 'to sing'],
          ['étudier', 'to study'],
          ['écouter', 'to listen'],
        ]
      }
    }
  ],
  check: [
    {
      q: 'Yuki vient de quel pays ?',
      opts: ['L\'Algérie', 'Le Japon', 'L\'Espagne', 'Le Brésil'],
      ans: 1,
      exp: '"Yuki vient du Japon." — Yuki comes from Japan. "Du" = de + le (contracted masculine article).'
    },
    {
      q: '"Il porte un T-shirt rouge." Which regular -ER conjugation is "porte"?',
      opts: ['nous portons', 'vous portez', 'il porte', 'ils portent'],
      ans: 2,
      exp: '"Il porte" = he wears. Regular -ER verbs: je porte, tu portes, il/elle porte, nous portons, vous portez, ils/elles portent.'
    },
    {
      q: 'Emma\'s coat is what colour?',
      opts: ['Red', 'White', 'Black', 'Green'],
      ans: 3,
      exp: '"Emma porte un manteau vert." — Emma wears a green coat.'
    },
    {
      q: '"Nous chantons des chansons françaises." "Chantons" comes from which verb?',
      opts: ['changer', 'chanter', 'choisir', 'chercher'],
      ans: 1,
      exp: '"Chanter" (to sing) → nous chantons. A regular -ER verb with the nous ending -ons.'
    },
    {
      q: 'The colours of the French flag are…',
      opts: ['Rouge, blanc, bleu', 'Bleu, blanc, rouge', 'Vert, blanc, rouge', 'Bleu, rouge, vert'],
      ans: 1,
      exp: 'The French tricolore is bleu, blanc, rouge — blue (hoist side), white (centre), red (fly side).'
    }
  ]
},

'fr-l107': {
  id: 'fr-l107',
  title: 'Histoire : Une journée à l\'école',
  icon: '🏫',
  tag: 'mastery',
  cards: [
    {
      h: 'Une journée à l\'école — lisez l\'histoire',
      p: ['An original A1 story about a typical school day. It uses school objects (la classe), the verbs aller and faire with leisure activities, and vocabulary for eating and drinking (manger et boire).'],
      visual: `<div style="background:#f0fdf4;border-left:4px solid #16a34a;padding:16px;border-radius:10px;font-size:0.93em;line-height:2">
<div style="color:#166534;font-weight:700;margin-bottom:10px">🏫 Une journée à l'école</div>
<p>Le lundi matin, je <strong>vais</strong> à l'école en bus. Dans mon sac à dos, j'ai un <strong>stylo</strong>, un <strong>cahier</strong>, une <strong>règle</strong> et mes <strong>livres</strong>.</p>
<p>À neuf heures, nous <strong>faisons</strong> du français. Le professeur écrit au <strong>tableau</strong> et nous prenons des notes dans nos cahiers.</p>
<p>À midi, je <strong>mange</strong> à la cantine. Je mange un sandwich au jambon et je <strong>bois</strong> de l'eau. Mes amis préfèrent <strong>boire</strong> du jus d'orange.</p>
<p>L'après-midi, nous <strong>faisons</strong> du sport. Je <strong>joue</strong> au football dans la cour. C'est mon sport préféré !</p>
<p>Après l'école, je <strong>vais</strong> au café avec ma copine Sarah. Elle <strong>boit</strong> un chocolat chaud et moi, je <strong>mange</strong> un croissant.</p>
<p>Le soir, je rentre chez moi. Je <strong>fais</strong> mes devoirs et je regarde la télévision. Quelle belle journée !</p>
</div>`
    },
    {
      h: 'Vocabulaire clé',
      example: {
        title: 'Key words from the story',
        rows: [
          ['un sac à dos', 'a backpack (m)'],
          ['un stylo', 'a pen (m)'],
          ['un cahier', 'an exercise book (m)'],
          ['une règle', 'a ruler (f)'],
          ['le tableau', 'the board (m)'],
          ['la cantine', 'the school canteen (f)'],
          ['la cour', 'the school yard (f)'],
          ['les devoirs', 'homework (m pl)'],
          ['faire du sport', 'to do sport'],
          ['faire ses devoirs', 'to do one\'s homework'],
        ]
      }
    }
  ],
  check: [
    {
      q: '"Je vais à l\'école en bus." Which verb means "to go"?',
      opts: ['faire', 'aller', 'venir', 'prendre'],
      ans: 1,
      exp: '"Aller" means to go. Irregular: je vais, tu vas, il va, nous allons, vous allez, ils vont.'
    },
    {
      q: 'What does the narrator drink at the canteen?',
      opts: ['Orange juice', 'Coffee', 'Water', 'Hot chocolate'],
      ans: 2,
      exp: '"Je bois de l\'eau" — I drink water. The narrator\'s friends prefer orange juice.'
    },
    {
      q: '"Nous faisons du sport." "Faisons" comes from which irregular verb?',
      opts: ['faire', 'jouer', 'aller', 'prendre'],
      ans: 0,
      exp: '"Faire" (to do / to make) → nous faisons. Faire is used for many activities: faire du sport, faire ses devoirs, faire du vélo…'
    },
    {
      q: 'Which school object does the narrator NOT mention having in their bag?',
      opts: ['Un stylo', 'Un cahier', 'Une règle', 'Une gomme'],
      ans: 3,
      exp: 'The narrator mentions a pen (stylo), exercise book (cahier) and ruler (règle) — but not an eraser (une gomme).'
    },
    {
      q: 'Where does the narrator go after school?',
      opts: ['Home', 'The park', 'The café', 'The library'],
      ans: 2,
      exp: '"Après l\'école, je vais au café" — after school, the narrator goes to the café with their friend Sarah.'
    }
  ]
},

'fr-l108': {
  id: 'fr-l108',
  title: 'Histoire : Le voyage de Lucas',
  icon: '🚂',
  tag: 'mastery',
  cards: [
    {
      h: 'Le voyage de Lucas — lisez l\'histoire',
      p: ['An original A1 story. Lucas travels from Paris to Lyon and the text practises dates, rooms of the house, transport and prepositions of place — the three lesson topics you have just completed.'],
      visual: `<div style="background:#fff7ed;border-left:4px solid #ea580c;padding:16px;border-radius:10px;font-size:0.93em;line-height:2">
<div style="color:#9a3412;font-weight:700;margin-bottom:10px">🚂 Le voyage de Lucas</div>
<p>Le <strong>quinze mars</strong>, Lucas part en voyage à Lyon.</p>
<p>Il habite dans un <strong>appartement</strong> à Paris — au <strong>troisième étage</strong>. Sa <strong>chambre</strong> est à gauche du <strong>salon</strong>, et la <strong>salle de bains</strong> est en face de la <strong>cuisine</strong>.</p>
<p>Ce matin, Lucas descend l'escalier et sort de l'immeuble.</p>
<p>Il prend le <strong>métro</strong> jusqu'à la <strong>gare de Lyon</strong>. Sur le quai, il lit le panneau : <em>« Train pour Lyon — départ à neuf heures vingt. »</em></p>
<p>Dans le train, Lucas pense à Lyon. Il va chez sa tante. Sa maison est <strong>près du fleuve</strong>. À <strong>droite</strong> de la maison, il y a un grand <strong>jardin</strong>. <strong>Devant</strong> la maison, il y a deux grands arbres.</p>
<p>Le train <strong>arrive</strong> à Lyon à onze heures. Lucas sort de la gare et prend un <strong>taxi</strong>.</p>
<p><em>« Bonjour ! Rue de la République, s'il vous plaît. »</em></p>
<p>C'est le début d'un beau week-end !</p>
</div>`
    },
    {
      h: 'Vocabulaire clé',
      example: {
        title: 'Key words from the story',
        rows: [
          ['un appartement', 'an apartment / flat (m)'],
          ['un étage', 'a floor / storey (m)'],
          ['un escalier', 'a staircase (m)'],
          ['la salle de bains', 'the bathroom (f)'],
          ['en face de', 'opposite'],
          ['un quai', 'a platform (m)'],
          ['un panneau', 'a notice board / sign (m)'],
          ['le fleuve', 'the river (m)'],
          ['devant', 'in front of'],
          ['jusqu\'à', 'as far as / until'],
        ]
      }
    }
  ],
  check: [
    {
      q: 'When does Lucas travel to Lyon?',
      opts: ['15 February', '15 March', '15 April', '15 May'],
      ans: 1,
      exp: '"Le quinze mars" — the fifteenth of March. French dates use the cardinal number for all days except the first (le premier).'
    },
    {
      q: 'Where is Lucas\'s bathroom relative to the kitchen?',
      opts: ['Next to the bedroom', 'Opposite the kitchen', 'To the right of the lounge', 'Next to the entrance'],
      ans: 1,
      exp: '"La salle de bains est en face de la cuisine" — the bathroom is opposite the kitchen. "En face de" means opposite.'
    },
    {
      q: '"Il prend le métro jusqu\'à la gare." "Jusqu\'à" means…',
      opts: ['from', 'near', 'as far as / until', 'under'],
      ans: 2,
      exp: '"Jusqu\'à" expresses the limit of movement or time: as far as, up to, until. Il prend le métro jusqu\'à la gare = he takes the metro as far as the station.'
    },
    {
      q: 'Where is the aunt\'s house located?',
      opts: ['Near the train station', 'In the town centre', 'Near the river', 'Near the airport'],
      ans: 2,
      exp: '"Sa maison est près du fleuve" — her house is near the river.'
    },
    {
      q: '"À droite de la maison, il y a un grand jardin." What does "à droite de" mean?',
      opts: ['In front of', 'Behind', 'To the left of', 'To the right of'],
      ans: 3,
      exp: '"À droite de" = to the right of. "À gauche de" = to the left of. "En face de" = opposite. "Derrière" = behind.'
    }
  ]
},

// ────────── A2 STORIES ──────────────────────────────────────────────────────

'fr-l109': {
  id: 'fr-l109',
  title: 'Histoire : Les Vacances de Lucie',
  icon: '✉️',
  tag: 'mastery',
  cards: [
    {
      h: 'Les Vacances de Lucie — lisez la lettre',
      p: ['An original A2 letter from Lucie to her friend Emma. It consolidates the passé composé with avoir and être, including agreement rules — the three lessons you have just studied.'],
      visual: `<div style="background:#f0f9ff;border-left:4px solid #0284c7;padding:16px;border-radius:10px;font-size:0.93em;line-height:1.9">
<div style="color:#075985;font-weight:700;margin-bottom:10px">✉️ Les Vacances de Lucie</div>
<p><em>Chère Emma,</em></p>
<p>Je t'écris de Marseille où je <strong>suis arrivée</strong> samedi dernier. Le voyage en train <strong>s'est très bien passé</strong> !</p>
<p>Samedi, nous <strong>sommes partis</strong> de Paris à 7h. Ma sœur <strong>est restée</strong> à la maison car elle <strong>a eu</strong> un rendez-vous médical. Mon frère et moi, nous <strong>avons pris</strong> le TGV. Nous <strong>sommes arrivés</strong> à Marseille à 9h30.</p>
<p>Dimanche, nous <strong>avons visité</strong> le Vieux-Port. J'<strong>ai acheté</strong> des souvenirs et nous <strong>avons mangé</strong> une délicieuse bouillabaisse au bord de la mer. Mon frère <strong>a adoré</strong> !</p>
<p>Lundi, nous <strong>sommes allés</strong> à la plage des Catalans. Il <strong>a fait</strong> très beau. J'<strong>ai nagé</strong> dans la mer pendant deux heures !</p>
<p>Et toi, qu'est-ce que tu <strong>as fait</strong> pendant le week-end ?</p>
<p><em>Je t'embrasse,<br>Lucie</em></p>
</div>`
    },
    {
      h: 'Vocabulaire clé',
      example: {
        title: 'Key verbs and expressions',
        rows: [
          ['se passer', 'to go / to happen (ça s\'est bien passé = it went well)'],
          ['partir (être)', 'to leave → nous sommes partis'],
          ['rester (être)', 'to stay → elle est restée'],
          ['arriver (être)', 'to arrive → je suis arrivée'],
          ['aller (être)', 'to go → nous sommes allés'],
          ['nager (avoir)', 'to swim → j\'ai nagé'],
          ['la bouillabaisse', 'Marseille fish stew (f)'],
          ['Je t\'embrasse', 'Kisses / Love (letter closing)'],
        ]
      }
    }
  ],
  check: [
    {
      q: '"Nous sommes arrivés à Marseille." Why is "être" used as the auxiliary?',
      opts: ['"Arriver" takes avoir in PC', '"Arriver" takes être in PC', 'It is a reflexive verb', '"Arriver" is irregular with avoir'],
      ans: 1,
      exp: '"Arriver" is one of the verbs that uses être as its auxiliary in the passé composé (the "DR MRS VANDERTRAMP" verbs). Agreement is made with the subject.'
    },
    {
      q: '"J\'ai acheté des souvenirs." Which is the correct PC form of "acheter"?',
      opts: ['j\'ai acheté', 'je suis acheté', 'j\'ai achetais', 'j\'achète'],
      ans: 0,
      exp: '"Acheter" uses avoir as its auxiliary. Past participle: acheté. J\'ai acheté = I bought.'
    },
    {
      q: '"Ma sœur est restée à la maison." What does the extra -e in "restée" indicate?',
      opts: ['The subject is feminine', 'The subject is plural', 'Rester takes avoir', 'It is a mistake'],
      ans: 0,
      exp: 'When être verbs are used in the PC, the past participle agrees with the subject in gender and number. Ma sœur is feminine singular → restée (not resté).'
    },
    {
      q: 'Why did Lucie\'s sister stay at home?',
      opts: ['She was on holiday', 'She missed the train', 'She had a medical appointment', 'She was feeling unwell'],
      ans: 2,
      exp: '"Ma sœur est restée à la maison car elle a eu un rendez-vous médical." — she had a medical appointment.'
    },
    {
      q: 'What did they eat in Marseille?',
      opts: ['Pizza', 'Crêpes', 'Bouillabaisse', 'Croissants'],
      ans: 2,
      exp: '"Nous avons mangé une délicieuse bouillabaisse" — they ate bouillabaisse, the famous Marseille fish stew.'
    }
  ]
},

'fr-l110': {
  id: 'fr-l110',
  title: 'Histoire : La Dernière Classe',
  icon: '📚',
  tag: 'mastery',
  cards: [
    {
      h: 'La Dernière Classe — lisez l\'extrait',
      p: ['Adapted from Alphonse Daudet, "La Dernière Classe" (1873) — public domain. Set in Alsace after the Franco-Prussian War, this story consolidates irregular verbs, vouloir/pouvoir/devoir and the futur simple.'],
      visual: `<div style="background:#fefce8;border-left:4px solid #ca8a04;padding:16px;border-radius:10px;font-size:0.93em;line-height:1.9">
<div style="color:#92400e;font-weight:700;margin-bottom:10px">📚 La Dernière Classe — Alphonse Daudet (1873)</div>
<p>Ce matin-là, Franz arriva tard à l'école. Il ne <strong>voulait</strong> pas y aller — il préférait jouer dehors.</p>
<p>Mais dans la salle de classe, il y avait quelque chose d'étrange. M. Hamel, le professeur, portait sa belle veste du dimanche.</p>
<p>M. Hamel dit à voix haute : <em>« Mes amis, c'est la dernière fois que je vous <strong>fais</strong> la classe. L'ordre <strong>est venu</strong> de Berlin : dans toutes les écoles d'Alsace, on <strong>devra</strong> enseigner uniquement l'allemand à partir de demain. »</em></p>
<p>Franz était choqué. Il pensa à toutes les heures qu'il avait perdues, à tous les cours qu'il avait manqués. Il <strong>voulait</strong> apprendre le français maintenant, mais il était trop tard !</p>
<p>M. Hamel dit : <em>« Le français est la plus belle langue du monde. Vous ne <strong>devez</strong> jamais oublier votre langue. »</em></p>
<p>Il aurait <strong>pu</strong> parler encore longtemps, mais la cloche sonna.</p>
<p>M. Hamel écrivit au tableau : <em>« <strong>Vive la France !</strong> »</em></p>
</div>`
    },
    {
      h: 'Vocabulaire clé',
      example: {
        title: 'Key words and grammar points',
        rows: [
          ['vouloir', 'to want (il voulait = he wanted)'],
          ['pouvoir', 'to be able to (il aurait pu = he could have)'],
          ['devoir', 'to have to (on devra = one will have to — futur)'],
          ['faire la classe', 'to teach (a lesson)'],
          ['manquer un cours', 'to miss a lesson'],
          ['une cloche', 'a bell (f)'],
          ['Vive…!', 'Long live…!'],
          ['dehors', 'outside'],
          ['uniquement', 'only / solely'],
        ]
      }
    }
  ],
  check: [
    {
      q: 'Why was Franz late to school that morning?',
      opts: ['He missed the bus', 'He preferred playing outside', 'He was ill', 'He forgot about school'],
      ans: 1,
      exp: '"Il ne voulait pas y aller — il préférait jouer dehors." He didn\'t want to go; he preferred playing outside.'
    },
    {
      q: '"On devra enseigner l\'allemand" — "devra" is the futur simple of which verb?',
      opts: ['faire', 'vouloir', 'pouvoir', 'devoir'],
      ans: 3,
      exp: '"Devoir" (to have to) → futur simple: je devrai, tu devras, il/on devra. "On devra" = one will have to.'
    },
    {
      q: '"Il voulait apprendre le français." Which irregular verb is "voulait" (imperfect)?',
      opts: ['pouvoir', 'vouloir', 'devoir', 'savoir'],
      ans: 1,
      exp: '"Vouloir" (to want) → imparfait: je voulais, tu voulais, il voulait. Franz wanted to learn French but it was too late.'
    },
    {
      q: 'What did M. Hamel write on the board?',
      opts: ['"Bonjour la France !"', '"Vive la France !"', '"Merci la France !"', '"Adieu la France !"'],
      ans: 1,
      exp: '"M. Hamel écrivit au tableau : \'Vive la France !\'" — Long live France! A powerful ending to the last French lesson.'
    },
    {
      q: '"Il aurait pu parler encore longtemps." "Pu" is the past participle of…',
      opts: ['vouloir', 'devoir', 'pouvoir', 'faire'],
      ans: 2,
      exp: '"Pouvoir" (to be able to) → past participle: pu. "Il aurait pu" = he could have (conditional perfect).'
    }
  ]
},

'fr-l111': {
  id: 'fr-l111',
  title: 'Histoire : En vitrine',
  icon: '👗',
  tag: 'mastery',
  cards: [
    {
      h: 'En vitrine — lisez l\'histoire',
      p: ['An original A2 story set in a Paris boutique. It consolidates demonstrative adjectives/pronouns (ce/cette/celui/celle), direct and indirect object pronouns (COD/COI) and the comparatif/superlatif.'],
      visual: `<div style="background:#fdf4ff;border-left:4px solid #9333ea;padding:16px;border-radius:10px;font-size:0.93em;line-height:1.9">
<div style="color:#6b21a8;font-weight:700;margin-bottom:10px">👗 En vitrine</div>
<p>Chloé et sa mère regardent les vitrines dans une grande rue commerçante.</p>
<p><em>« Regarde <strong>cette</strong> robe là-bas ! »</em> dit Chloé. <em>« Elle est <strong>plus belle que celle</strong> que j'ai achetée hier ! »</em></p>
<p><em>« Laquelle ? <strong>Cette</strong> robe rouge ou <strong>celle</strong> qui est bleue ? »</em></p>
<p><em>« La rouge ! Elle est <strong>la plus jolie</strong> de toute la vitrine. Je <strong>la</strong> veux ! »</em></p>
<p>Elles entrent dans le magasin. La vendeuse <strong>leur</strong> demande : <em>« Je peux vous aider ? »</em></p>
<p><em>« Oui, je voudrais voir <strong>cette</strong> robe rouge dans ma taille. »</em></p>
<p><em>« Bien sûr ! Je vais <strong>la</strong> chercher. Vous faites quelle taille ? »</em></p>
<p>La vendeuse <strong>lui</strong> apporte la robe. Chloé <strong>l'</strong>essaie.</p>
<p><em>« Elle est encore <strong>plus belle</strong> sur toi ! »</em> dit la mère.</p>
<p><em>« Tu crois ? C'est <strong>la plus chère</strong> du magasin, mais… je <strong>la</strong> prends ! »</em></p>
</div>`
    },
    {
      h: 'Vocabulaire clé',
      example: {
        title: 'Key words and grammar points',
        rows: [
          ['la vitrine', 'the shop window (f)'],
          ['une vendeuse', 'a female shop assistant (f)'],
          ['la taille', 'the size / waist (f)'],
          ['essayer', 'to try on'],
          ['cher / chère', 'expensive; dear'],
          ['celui / celle', 'the one (demonstrative pronoun)'],
          ['la / le / l\'', 'direct object pronoun (COD)'],
          ['lui / leur', 'indirect object pronoun (COI)'],
          ['plus … que', 'more … than (comparative)'],
          ['le / la plus …', 'the most … (superlative)'],
        ]
      }
    }
  ],
  check: [
    {
      q: '"Cette robe" — what type of word is "cette"?',
      opts: ['A definite article', 'A demonstrative adjective', 'A possessive adjective', 'An indefinite article'],
      ans: 1,
      exp: '"Cette" is a demonstrative adjective meaning "this/that" before a feminine singular noun. Ce (m), cette (f), ces (pl).'
    },
    {
      q: '"Je la veux" — what does "la" replace here?',
      opts: ['The shop assistant', 'The mother', 'The red dress', 'The shop itself'],
      ans: 2,
      exp: '"La" is a direct object pronoun (COD) replacing "la robe rouge" (feminine singular). Je la veux = I want it.'
    },
    {
      q: '"Elle est plus belle que celle que j\'ai achetée." This sentence contains…',
      opts: ['The superlative', 'The comparative', 'The imperfect tense', 'A reflexive verb'],
      ans: 1,
      exp: '"Plus belle que" is the comparative of superiority: more beautiful than. The superlative would be "la plus belle".'
    },
    {
      q: '"La vendeuse leur demande" — "leur" is a…',
      opts: ['Direct object pronoun (COD)', 'Indirect object pronoun (COI)', 'Reflexive pronoun', 'Demonstrative pronoun'],
      ans: 1,
      exp: '"Leur" is an indirect object pronoun (COI) meaning "to them". La vendeuse demande à Chloé et à sa mère → la vendeuse leur demande.'
    },
    {
      q: '"C\'est la plus chère du magasin." This sentence expresses…',
      opts: ['A comparison between two items', 'The superlative', 'A negation', 'A question'],
      ans: 1,
      exp: '"La plus chère" is the feminine superlative of "cher" — the most expensive (of the shop). Superlative = le/la/les + plus + adjective.'
    }
  ]
},

'fr-l112': {
  id: 'fr-l112',
  title: 'Histoire : Le marché aux puces',
  icon: '🛍️',
  tag: 'mastery',
  cards: [
    {
      h: 'Le marché aux puces — lisez l\'histoire',
      p: ['An original A2 story set at the famous Saint-Ouen flea market in Paris. It consolidates relative pronouns (qui, que, où), frequency adverbs and clothing vocabulary.'],
      visual: `<div style="background:#fff7ed;border-left:4px solid #ea580c;padding:16px;border-radius:10px;font-size:0.93em;line-height:1.9">
<div style="color:#9a3412;font-weight:700;margin-bottom:10px">🛍️ Le marché aux puces</div>
<p><strong>Tous les samedis</strong>, Nora va au marché aux puces de Saint-Ouen, le célèbre marché <strong>qui</strong> attire des touristes du monde entier.</p>
<p>Elle cherche <strong>souvent</strong> des vêtements vintage <strong>qu'</strong>elle collectionne depuis des années.</p>
<p><em>« Ces chaussures rouges <strong>que</strong> tu portes — <strong>où</strong> tu les as trouvées ? »</em> lui demande son amie Maya.</p>
<p><em>« Je les ai achetées ici la semaine dernière ! C'est le vendeur <strong>qui</strong> est là-bas <strong>qui</strong> me les a vendues. Il a <strong>toujours</strong> de bonnes choses. »</em></p>
<p>Nora essaie un manteau beige <strong>qu'</strong>elle voit sur un cintre. Il lui va parfaitement.</p>
<p><em>« Tu es magnifique ! Tu le prends ? »</em></p>
<p><em>« Je ne sais pas… Il est un peu grand. Je l'essaie <strong>rarement</strong>, les manteaux — j'ai déjà trop de vêtements ! »</em></p>
<p>Elle finit <strong>toujours</strong> par acheter quelque chose, pourtant.</p>
</div>`
    },
    {
      h: 'Vocabulaire clé',
      example: {
        title: 'Key words from the story',
        rows: [
          ['un marché aux puces', 'a flea market (m)'],
          ['collectionner', 'to collect'],
          ['un cintre', 'a coat hanger (m)'],
          ['parfaitement', 'perfectly'],
          ['pourtant', 'however / yet'],
          ['toujours', 'always (also: still)'],
          ['souvent', 'often'],
          ['rarement', 'rarely'],
          ['qui', 'relative pronoun — subject'],
          ['que / qu\'', 'relative pronoun — direct object'],
        ]
      }
    }
  ],
  check: [
    {
      q: '"Le marché qui attire des touristes" — "qui" in this sentence is…',
      opts: ['A question word', 'A relative pronoun replacing the subject', 'A direct object pronoun', 'A frequency adverb'],
      ans: 1,
      exp: '"Qui" here is a relative pronoun linking two clauses. It replaces the subject of the relative clause: le marché (qui attire…). Use "qui" when it is the subject of the verb that follows.'
    },
    {
      q: '"Ces chaussures que tu portes" — "que" replaces…',
      opts: ['The subject of the relative clause', 'The location', 'The direct object', 'The indirect object'],
      ans: 2,
      exp: '"Que" (or qu\') is a relative pronoun replacing the direct object. Tu portes ces chaussures → ces chaussures que tu portes. Use "que" when it is the object of the verb in the relative clause.'
    },
    {
      q: '"Elle cherche souvent des vêtements." "Souvent" is a…',
      opts: ['Demonstrative adjective', 'Frequency adverb', 'Direct object pronoun', 'Relative pronoun'],
      ans: 1,
      exp: '"Souvent" (often) is a frequency adverb. Common frequency adverbs: toujours, souvent, parfois, rarement, jamais.'
    },
    {
      q: '"Je l\'essaie rarement, les manteaux." What does "rarement" mean?',
      opts: ['Always', 'Often', 'Sometimes', 'Rarely'],
      ans: 3,
      exp: '"Rarement" means rarely. It is near the end of the adverb frequency scale: toujours > souvent > parfois > rarement > jamais.'
    },
    {
      q: 'Where does the story take place?',
      opts: ['A department store', 'A clothing boutique', 'A flea market', 'An online shop'],
      ans: 2,
      exp: '"Le marché aux puces de Saint-Ouen" is one of the most famous flea markets in the world, in the north of Paris.'
    }
  ]
},

'fr-l113': {
  id: 'fr-l113',
  title: 'Histoire : La semaine de Karim',
  icon: '🏙️',
  tag: 'mastery',
  cards: [
    {
      h: 'La semaine de Karim — lisez l\'histoire',
      p: ['An original A2 story. Follow Karim through a busy Parisian working week. The text consolidates professional vocabulary, shopping for groceries (les courses) and transport/directions.'],
      visual: `<div style="background:#f0f9ff;border-left:4px solid #0284c7;padding:16px;border-radius:10px;font-size:0.93em;line-height:1.9">
<div style="color:#075985;font-weight:700;margin-bottom:10px">🏙️ La semaine de Karim</div>
<p>Karim travaille dans une <strong>entreprise</strong> de marketing à Paris. Sa semaine est toujours bien organisée.</p>
<p><strong>Lundi</strong>, il prend le <strong>RER B</strong> pour aller au <strong>bureau</strong>. Le <strong>trajet</strong> dure vingt minutes. Au bureau, il fait des <strong>réunions</strong> avec ses <strong>collègues</strong> et répond à ses e-mails.</p>
<p><strong>Mardi</strong>, il fait les <strong>courses</strong> après le travail. Il va au supermarché du quartier et achète du lait, du pain, des fruits et de la viande. Il dépense environ <strong>trente euros</strong>.</p>
<p><strong>Mercredi</strong>, son <strong>chef</strong> lui donne un nouveau projet. Il <strong>doit</strong> préparer une présentation pour vendredi.</p>
<p><strong>Jeudi</strong>, Karim prend le <strong>vélo</strong> pour aller au travail — c'est plus rapide et plus <strong>écologique</strong> que le bus.</p>
<p><strong>Vendredi</strong>, il présente son travail. Son chef est <strong>satisfait</strong> !</p>
<p>Le soir, Karim prend le <strong>métro ligne 4</strong> jusqu'à la station Montrouge. Il est fatigué mais content.</p>
</div>`
    },
    {
      h: 'Vocabulaire clé',
      example: {
        title: 'Key words from the story',
        rows: [
          ['une entreprise', 'a company / business (f)'],
          ['un bureau', 'an office (m)'],
          ['une réunion', 'a meeting (f)'],
          ['un collègue', 'a colleague (m)'],
          ['le trajet', 'the commute / journey (m)'],
          ['durer', 'to last'],
          ['un chef', 'a boss (m)'],
          ['satisfait/e', 'satisfied'],
          ['écologique', 'eco-friendly'],
          ['dépenser', 'to spend (money)'],
        ]
      }
    }
  ],
  check: [
    {
      q: 'How does Karim travel to work on Mondays?',
      opts: ['By bike', 'By metro', 'By RER', 'By bus'],
      ans: 2,
      exp: '"Il prend le RER B" — he takes the RER B line (a suburban express rail line in Paris).'
    },
    {
      q: 'How much does Karim spend at the supermarket?',
      opts: ['Around €20', 'Around €30', 'Around €40', 'Around €50'],
      ans: 1,
      exp: '"Il dépense environ trente euros" — he spends approximately thirty euros on groceries.'
    },
    {
      q: 'Why does Karim prefer the bike on Thursday?',
      opts: ['It is cheaper', 'It is faster and more eco-friendly', 'The metro is on strike', 'He lives very close'],
      ans: 1,
      exp: '"C\'est plus rapide et plus écologique que le bus" — it is faster and more eco-friendly than the bus.'
    },
    {
      q: '"Il doit préparer une présentation." "Doit" comes from which verb?',
      opts: ['faire', 'pouvoir', 'vouloir', 'devoir'],
      ans: 3,
      exp: '"Devoir" (to have to / must) → il doit. Modal verbs: je dois, tu dois, il doit, nous devons, vous devez, ils doivent.'
    },
    {
      q: '"Sa semaine est toujours bien organisée." The word "toujours" is a…',
      opts: ['Frequency adverb', 'Relative pronoun', 'Demonstrative adjective', 'Possessive adjective'],
      ans: 0,
      exp: '"Toujours" (always) is a frequency adverb. Here it emphasises the regularity of Karim\'s organised routine.'
    }
  ]
},

'fr-l114': {
  id: 'fr-l114',
  title: 'Histoire : Une semaine difficile',
  icon: '💌',
  tag: 'mastery',
  cards: [
    {
      h: 'Une semaine difficile — lisez la lettre',
      p: ['An original A2 letter from Sylvie to her friend Véronique. It consolidates restaurant vocabulary, health/doctor vocabulary and the conventions of writing a formal or informal letter in French.'],
      visual: `<div style="background:#fff0f6;border-left:4px solid #db2777;padding:16px;border-radius:10px;font-size:0.93em;line-height:1.9">
<div style="color:#9d174d;font-weight:700;margin-bottom:10px">💌 Une semaine difficile</div>
<p><em>Lyon, le 3 octobre</em></p>
<p><em>Chère Véronique,</em></p>
<p>Comment vas-tu ? Je t'écris pour te raconter ma semaine difficile.</p>
<p>Lundi, j'ai attrapé un mauvais <strong>rhume</strong>. J'avais de la <strong>fièvre</strong>, mal à la <strong>gorge</strong> et je toussais beaucoup. J'ai dû aller chez le <strong>médecin</strong> le lendemain. Il m'a auscultée et m'a dit : <em>« Vous avez une <strong>angine</strong>. Je vous prescris des <strong>antibiotiques</strong> — trois <strong>comprimés</strong> par jour pendant une semaine. »</em></p>
<p>J'ai dû annuler mon dîner au <strong>restaurant</strong> avec mes collègues. C'est dommage, car le restaurant était très bien noté — on m'a dit que l'<strong>entrée</strong> au saumon était délicieuse et que le <strong>plat principal</strong>, un bœuf bourguignon, était magnifique.</p>
<p>Heureusement, je me sens mieux maintenant. Samedi prochain, est-ce que tu voudrais dîner ensemble ? Je connais un bon restaurant italien près de chez moi !</p>
<p><em>Écris-moi vite !<br>Bisous,<br>Sylvie</em></p>
</div>`
    },
    {
      h: 'Vocabulaire clé',
      example: {
        title: 'Key words from the story',
        rows: [
          ['attraper un rhume', 'to catch a cold'],
          ['la fièvre', 'a fever (f)'],
          ['tousser', 'to cough'],
          ['ausculter', 'to examine (doctor, with stethoscope)'],
          ['prescrire', 'to prescribe'],
          ['un comprimé', 'a tablet / pill (m)'],
          ['une angine', 'strep throat / tonsillitis (f)'],
          ['annuler', 'to cancel'],
          ['une entrée', 'a starter / appetiser (f)'],
          ['un plat principal', 'a main course (m)'],
        ]
      }
    }
  ],
  check: [
    {
      q: 'Why did Sylvie go to the doctor?',
      opts: ['She had a broken arm', 'She had a sore throat and fever', 'She had an accident', 'She wanted a routine check-up'],
      ans: 1,
      exp: '"J\'avais de la fièvre, mal à la gorge et je toussais beaucoup." — she had a fever, sore throat and a bad cough.'
    },
    {
      q: 'What did the doctor prescribe?',
      opts: ['Rest and hot drinks', 'Antibiotics', 'A vitamin supplement', 'An injection'],
      ans: 1,
      exp: '"Je vous prescris des antibiotiques — trois comprimés par jour pendant une semaine." — antibiotics, three tablets a day for a week.'
    },
    {
      q: 'Sylvie had to cancel her restaurant dinner because…',
      opts: ['The restaurant was full', 'She was ill', 'It was too expensive', 'She forgot about it'],
      ans: 1,
      exp: '"J\'ai dû annuler mon dîner au restaurant" — she had to cancel because she was ill (j\'ai dû = I had to).'
    },
    {
      q: 'In the letter, "Je t\'écris pour te raconter…" — what does "raconter" mean?',
      opts: ['to ask', 'to invite', 'to tell / recount', 'to thank'],
      ans: 2,
      exp: '"Raconter" means to tell or recount. "Je t\'écris pour te raconter ma semaine" = I\'m writing to tell you about my week.'
    },
    {
      q: 'Which part of the menu does the salmon dish belong to?',
      opts: ['Le plat principal', 'Le dessert', 'L\'entrée', 'La boisson'],
      ans: 2,
      exp: '"L\'entrée au saumon" — the salmon starter. French menu structure: entrée (starter), plat principal (main course), dessert.'
    }
  ]
},

// ────────── B1 STORIES ──────────────────────────────────────────────────────

'fr-l115': {
  id: 'fr-l115',
  title: 'Histoire : La Chèvre de M. Seguin',
  icon: '🐐',
  tag: 'mastery',
  cards: [
    {
      h: 'La Chèvre de M. Seguin — lisez l\'extrait',
      p: ['Adapted from Alphonse Daudet, "La Chèvre de Monsieur Seguin" (1866) — public domain. This B1 story consolidates the conditionnel présent, the pronouns Y and EN, and pronoms relatifs composés.'],
      visual: `<div style="background:#f0fff4;border-left:4px solid #16a34a;padding:16px;border-radius:10px;font-size:0.93em;line-height:1.9">
<div style="color:#166534;font-weight:700;margin-bottom:10px">🐐 La Chèvre de M. Seguin — Alphonse Daudet (1866)</div>
<p>M. Seguin n'avait jamais eu de chance avec ses chèvres. Il y <strong>en</strong> avait eu sept avant Blanquette, et toutes s'étaient sauvées dans la montagne.</p>
<p>Cette fois, il dit à Blanquette : <em>« Je t'<strong>en</strong> supplie, reste avec moi ! Dans la montagne, il y <strong>aurait</strong> des loups <strong>qui</strong> n'attendraient que toi. »</em></p>
<p>Blanquette était la plus petite chèvre <strong>qu'</strong>il eût jamais possédée, mais elle avait un regard plein d'audace. Elle répondit :</p>
<p><em>« J'<strong>en</strong> ai assez d'être enfermée ici. Je veux aller dans la montagne <strong>dont</strong> je vois les sommets de ma fenêtre. »</em></p>
<p>Elle s'échappa. Dans la montagne, elle <strong>y</strong> trouva un bonheur <strong>qu'</strong>elle n'avait jamais connu — l'herbe fraîche, l'air pur, les fleurs sauvages.</p>
<p>Mais le soir, le loup arriva. Blanquette se dit : <em>« Si seulement M. Seguin me voyait maintenant… Il <strong>serait</strong> fier de moi. »</em></p>
<p>Elle se battit courageusement toute la nuit. Elle <strong>aurait pu</strong> s'enfuir, mais elle préférait mourir libre.</p>
<p>Au petit matin, le loup la mangea.</p>
</div>`
    },
    {
      h: 'Vocabulaire clé',
      example: {
        title: 'Key words and grammar points',
        rows: [
          ['une chèvre', 'a goat (f)'],
          ['un loup', 'a wolf (m)'],
          ['s\'échapper', 'to escape'],
          ['l\'herbe', 'grass (f)'],
          ['le sommet', 'the summit / top (m)'],
          ['l\'audace', 'boldness / daring (f)'],
          ['se battre', 'to fight'],
          ['fier / fière', 'proud'],
          ['dont', 'of which / whose (relative pronoun)'],
          ['il aurait pu', 'she could have (conditional perfect)'],
        ]
      }
    }
  ],
  check: [
    {
      q: '"Il y en avait eu sept avant Blanquette." What does "en" replace here?',
      opts: ['"Chèvres" (goats)', '"Loups" (wolves)', '"M. Seguin"', '"La montagne"'],
      ans: 0,
      exp: '"En" replaces "de + noun". Here it replaces "de chèvres" (of goats). Il y en avait eu sept = there had been seven of them (goats).'
    },
    {
      q: '"Il y aurait des loups." The tense "aurait" is the conditionnel of…',
      opts: ['être', 'aller', 'avoir', 'faire'],
      ans: 2,
      exp: '"Avoir" → conditionnel: j\'aurais, tu aurais, il/elle aurait, nous aurions, vous auriez, ils auraient. "Il y aurait" = there would be.'
    },
    {
      q: '"La montagne dont je vois les sommets." The relative pronoun "dont" expresses…',
      opts: ['Location', 'A direct object', 'The subject', 'Possession or relationship (de + noun)'],
      ans: 3,
      exp: '"Dont" replaces "de + noun/pronoun" in relative clauses. Je vois les sommets de la montagne → la montagne dont je vois les sommets.'
    },
    {
      q: 'How many goats did M. Seguin have before Blanquette?',
      opts: ['Five', 'Six', 'Seven', 'Eight'],
      ans: 2,
      exp: '"Il y en avait eu sept avant Blanquette" — there had been seven before Blanquette, and all of them had escaped to the mountains.'
    },
    {
      q: '"Elle aurait pu s\'enfuir, mais elle préférait mourir libre." What does this conditional imply?',
      opts: ['She did escape', 'She had the ability to escape but chose not to', 'She will escape tomorrow', 'She escaped and came back'],
      ans: 1,
      exp: '"Aurait pu" (conditional perfect of pouvoir) expresses an action that was possible but did not happen. Blanquette could have fled but chose to fight and die free.'
    }
  ]
},

'fr-l116': {
  id: 'fr-l116',
  title: 'Histoire : Bel-Ami',
  icon: '🎩',
  tag: 'mastery',
  cards: [
    {
      h: 'Bel-Ami — lisez l\'extrait',
      p: ['Adapted from Guy de Maupassant, "Bel-Ami" (1885) — public domain. This B1 extract consolidates expressing opinion, the passive voice (la voix passive) and the gerund (le gérondif).'],
      visual: `<div style="background:#fdf4ff;border-left:4px solid #9333ea;padding:16px;border-radius:10px;font-size:0.93em;line-height:1.9">
<div style="color:#6b21a8;font-weight:700;margin-bottom:10px">🎩 Bel-Ami — Maupassant (1885)</div>
<p>Georges Duroy vient d'<strong>être nommé</strong> reporter au journal « La Vie française ». Il est ravi, mais nerveux.</p>
<p><strong>En entrant</strong> dans la salle de rédaction, il observe ses nouveaux collègues. Il pense : <em>« Je dois faire bonne impression. »</em></p>
<p>Son chef, M. Walter, lui <strong>est présenté</strong> par un collègue. M. Walter demande : <em>« Avez-vous déjà travaillé dans la presse ? »</em></p>
<p><em>« Non, monsieur. Mais <strong>j\'estime que</strong> le journalisme est le métier le plus important de notre époque. »</em></p>
<p><em>« Tiens ! Voilà une opinion bien affirmée ! »</em> dit M. Walter <strong>en souriant</strong>.</p>
<p><em>« <strong>Je pense qu\'</strong>un bon journaliste est fait par son honnêteté, répond Duroy. Les faits doivent <strong>être rapportés</strong> avec précision. »</em></p>
<p>M. Walter est impressionné. Il lui confie son premier article.</p>
<p><strong>En travaillant</strong> toute la nuit, Duroy rédige un texte brillant. L'article sera publié le lendemain.</p>
<p>Il <strong>est félicité</strong> par tous ses collègues. Son avenir commence.</p>
</div>`
    },
    {
      h: 'Vocabulaire clé',
      example: {
        title: 'Key words and grammar points',
        rows: [
          ['être nommé', 'to be appointed (passive)'],
          ['être présenté', 'to be introduced (passive)'],
          ['être rapporté', 'to be reported (passive)'],
          ['être félicité', 'to be congratulated (passive)'],
          ['en entrant', 'upon entering / while entering (gerund)'],
          ['en souriant', 'while smiling (gerund)'],
          ['en travaillant', 'while working (gerund)'],
          ['j\'estime que', 'I consider that / I believe that'],
          ['je pense que', 'I think that'],
          ['la salle de rédaction', 'the newsroom (f)'],
        ]
      }
    }
  ],
  check: [
    {
      q: '"Georges Duroy vient d\'être nommé reporter." The structure "être nommé" is an example of…',
      opts: ['The reflexive voice', 'The active voice', 'The passive voice', 'The conditional mood'],
      ans: 2,
      exp: 'The passive voice in French: être + past participle. "Être nommé" = to be appointed. The agent (who does the action) can be introduced with "par": il est nommé par le directeur.'
    },
    {
      q: '"Il est félicité par tous ses collègues." In the active voice, this means…',
      opts: ['He congratulates his colleagues', 'All his colleagues congratulate him', 'He is criticised by his colleagues', 'His colleagues are congratulated'],
      ans: 1,
      exp: 'Passive → Active: "Tous ses collègues le félicitent." The passive subject (il) becomes the active object, and "par" introduces the new subject.'
    },
    {
      q: '"En entrant dans la salle de rédaction" — "en entrant" is a gerund expressing…',
      opts: ['The reason for the action', 'A simultaneous or immediately preceding action', 'A future plan', 'A condition'],
      ans: 1,
      exp: 'The gerund (gérondif) = en + present participle. It expresses simultaneity (while doing) or manner. "En entrant" = upon entering / while entering.'
    },
    {
      q: '"J\'estime que le journalisme est le métier le plus important." "J\'estime que" is used to…',
      opts: ['Describe an objective fact', 'Ask a question', 'Express a personal opinion', 'Give a direct command'],
      ans: 2,
      exp: '"Estimer que", "penser que", "croire que", "trouver que" are all phrases for expressing personal opinion at B1 level.'
    },
    {
      q: '"En travaillant toute la nuit, Duroy rédige un texte brillant." The gerund expresses…',
      opts: ['A contrast between two actions', 'A sequence: first this, then that', 'A condition', 'The manner or simultaneous action'],
      ans: 3,
      exp: '"En travaillant toute la nuit" = by working all night / while working all night. The gerund describes how or when Duroy writes his article.'
    }
  ]
},

// ────────── B2 STORY ────────────────────────────────────────────────────────

'fr-l117': {
  id: 'fr-l117',
  title: 'Histoire : Le Rouge et le Noir',
  icon: '📖',
  tag: 'mastery',
  cards: [
    {
      h: 'Le Rouge et le Noir — lisez l\'extrait',
      p: ['Adapted from Stendhal, "Le Rouge et le Noir" (1830) — public domain. This B2 extract consolidates advanced subjunctive usage, concession structures and literary register/style.'],
      visual: `<div style="background:#fef2f2;border-left:4px solid #dc2626;padding:16px;border-radius:10px;font-size:0.93em;line-height:1.9">
<div style="color:#991b1b;font-weight:700;margin-bottom:10px">📖 Le Rouge et le Noir — Stendhal (1830)</div>
<p>Julien Sorel, fils de charpentier, venait d'être engagé comme précepteur chez M. de Rênal, le maire de Verrières. <strong>Bien qu\'il fût</strong> de naissance modeste, Julien possédait une intelligence remarquable et une mémoire prodigieuse.</p>
<p>En arrivant chez les Rênal, Julien craignait <strong>que</strong> les domestiques ne le <strong>méprisent</strong>. Pourtant, il se comporta avec une dignité qui imposa le respect.</p>
<p>Mme de Rênal — dont tout le monde disait <strong>qu\'elle fût</strong> la plus belle femme du pays — l'accueillit avec une grâce naturelle. Julien, <strong>bien qu\'il eût voulu</strong> paraître indifférent, fut ému malgré lui.</p>
<p>M. de Rênal, quant à lui, examina Julien avec méfiance. <strong>Encore qu\'il reconnût</strong> les qualités du jeune homme, il ne pouvait admettre <strong>qu\'</strong>un fils d'ouvrier <strong>fût</strong> son égal.</p>
<p>Le narrateur observe : <strong>quelle que soit</strong> la naissance d'un homme, c'est par son mérite <strong>qu\'</strong>il doit être jugé — à condition toutefois <strong>qu\'il ait</strong> le courage de le montrer.</p>
</div>`
    },
    {
      h: 'Vocabulaire clé',
      example: {
        title: 'Key words and grammar points',
        rows: [
          ['un charpentier', 'a carpenter (m)'],
          ['un précepteur', 'a private tutor (m)'],
          ['la naissance', 'birth (f)'],
          ['prodigieux/se', 'prodigious / remarkable'],
          ['mépriser', 'to despise / look down on'],
          ['la dignité', 'dignity (f)'],
          ['la méfiance', 'distrust / suspicion (f)'],
          ['ému/e', 'moved / touched (emotionally)'],
          ['malgré lui', 'despite himself'],
          ['quant à lui', 'as for him / for his part'],
        ]
      }
    }
  ],
  check: [
    {
      q: '"Bien qu\'il fût de naissance modeste" — "fût" is the subjunctive of which verb?',
      opts: ['faire', 'avoir', 'aller', 'être'],
      ans: 3,
      exp: '"Fût" is the imperfect subjunctive of "être" (rare in modern speech but found in literary French). "Bien que" always requires the subjunctive: bien qu\'il soit (present subj.) / bien qu\'il fût (imperfect subj.).'
    },
    {
      q: '"Encore qu\'il reconnût les qualités du jeune homme" — "encore que" introduces…',
      opts: ['A result clause', 'A concession', 'A condition', 'A time relationship'],
      ans: 1,
      exp: '"Encore que" (+ subjunctive) is a literary concession meaning "although / even though / granted that". It is equivalent to "bien que" but more formal.'
    },
    {
      q: '"Bien que…, bien qu\'il eût voulu…, quelle que soit…" These constructions all require…',
      opts: ['The indicative mood', 'The conditional mood', 'The subjunctive mood', 'The infinitive'],
      ans: 2,
      exp: 'Concession structures (bien que, encore que, quelle que soit, à condition que, craindre que) all trigger the subjunctive in French.'
    },
    {
      q: '"C\'est par son mérite qu\'il doit être jugé" — the register of this sentence is…',
      opts: ['Casual and informal', 'Formal and literary', 'Archaic / incomprehensible to modern readers', 'Technical / specialist'],
      ans: 1,
      exp: 'The use of inversion, abstract nouns (mérite, naissance) and nominal style mark this as formal literary register — characteristic of 19th-century prose.'
    },
    {
      q: 'What does M. de Rênal feel towards Julien, despite recognising his qualities?',
      opts: ['Admiration', 'Friendship', 'Distrust / suspicion', 'Complete indifference'],
      ans: 2,
      exp: '"M. de Rênal examina Julien avec méfiance." — he examined Julien with distrust. He cannot accept that a workman\'s son could be his equal.'
    }
  ]
},

};

// ── Final lesson orders for each unit ─────────────────────────────────────────

// A1: 45 lessons (37 existing + 8 new stories)
const A1_ORDER = [
  'fr-l01','fr-l09','fr-l04','fr-l101',          // greetings, ER verbs, articles → story
  'fr-l02','fr-l03','fr-l10','fr-l102',          // être, avoir, negation → story
  'fr-l45','fr-l86','fr-l05','fr-l103',          // numbers, grands nombres, plural → story
  'fr-l92','fr-l40','fr-l59','fr-l104',          // gender, pronunciation, sounds → story
  'fr-l07','fr-l11','fr-l12','fr-l105',          // time, family, adjectives → story
  'fr-l75','fr-l13','fr-l53','fr-l106',          // colours, nationalities, conjugation → story
  'fr-l76','fr-l14','fr-l15','fr-l107',          // school objects, activities, food → story
  'fr-l16','fr-l41','fr-l97',                    // weather/seasons, body/health → existing story
  'fr-l68','fr-l69','fr-l39','fr-l108',          // dates, house, transport → story
  'fr-l62','fr-l56','fr-l46','fr-l32',           // word order, dialogues, extended family → existing story
  'fr-l47','fr-l50','fr-l65','fr-l33',           // quantities, seasons, listening → existing story
  'fr-l52','fr-l17',                             // idioms, exam
];

// A2: 40 lessons (34 existing + 6 new stories)
const A2_ORDER = [
  'fr-l18','fr-l19','fr-l55','fr-l109',          // PC avoir, PC être, PC revision → story
  'fr-l23','fr-l20','fr-l21','fr-l98',           // pronominaux, imparfait, imparfait vs PC → existing story
  'fr-l38','fr-l54','fr-l22','fr-l110',          // irregular verbs, modals, futur → story
  'fr-l70','fr-l24','fr-l25','fr-l111',          // demonstratifs, COD/COI, comparatif → story
  'fr-l71','fr-l77','fr-l42','fr-l112',          // relatifs, adverbes, vêtements → story
  'fr-l43','fr-l48','fr-l49','fr-l113',          // travail, courses, transports → story
  'fr-l51','fr-l74','fr-l72','fr-l114',          // restaurant, santé, lettre → story
  'fr-l73','fr-l60','fr-l63','fr-l34',           // opinion, pronunciation, word order → existing story
  'fr-l78','fr-l57','fr-l66','fr-l35',           // indirect speech, dialogues, listening → existing story
  'fr-l82','fr-l87','fr-l88','fr-l26',           // faux amis, culture, textes auth., exam
];

// B1: 25 lessons (23 existing + 2 new stories)
const B1_ORDER = [
  'fr-l27','fr-l44','fr-l29','fr-l115',          // conditionnel, Y/EN, pronoms relatifs → story
  'fr-l28','fr-l79','fr-l81','fr-l99',           // subjonctif, plus-que-parfait, connecteurs → existing story
  'fr-l30','fr-l80','fr-l83','fr-l116',          // opinion, voix passive, gérondif → story
  'fr-l84','fr-l85','fr-l58','fr-l100',          // futur ant., conditionnel passé, formelles → existing story
  'fr-l61','fr-l64','fr-l67','fr-l36',           // pronunciation, word order, listening → existing story
  'fr-l89','fr-l90','fr-l91','fr-l37',           // textes auth., idioms, professional → existing story
  'fr-l31',                                      // exam
];

// B2: 5 lessons (4 existing + 1 new story)
const B2_ORDER = [
  'fr-l93','fr-l94','fr-l96','fr-l117',          // subj. avancé, concession, registre → story
  'fr-l95',                                      // nominalisation
];

const UNIT_ORDERS = {
  'fr-a1': A1_ORDER,
  'fr-a2': A2_ORDER,
  'fr-b1': B1_ORDER,
  'fr-b2': B2_ORDER,
};

// ── Tags for all lessons (existing + new) ─────────────────────────────────────

const ALL_TAGS = {
  'fr-l01':'core','fr-l02':'core','fr-l03':'core','fr-l04':'core','fr-l05':'core',
  'fr-l07':'core','fr-l09':'core','fr-l10':'core','fr-l11':'core','fr-l12':'core',
  'fr-l13':'core','fr-l14':'core','fr-l15':'core','fr-l16':'core','fr-l17':'core',
  'fr-l18':'core','fr-l19':'core','fr-l20':'core','fr-l21':'core','fr-l22':'core',
  'fr-l23':'core','fr-l24':'core','fr-l25':'core','fr-l26':'core','fr-l27':'core',
  'fr-l28':'core','fr-l29':'core','fr-l30':'core','fr-l31':'core','fr-l38':'core',
  'fr-l39':'core','fr-l40':'core','fr-l41':'core','fr-l42':'core','fr-l43':'core',
  'fr-l44':'core','fr-l45':'core','fr-l46':'core','fr-l47':'core','fr-l48':'core',
  'fr-l49':'core','fr-l50':'core','fr-l51':'core','fr-l52':'advanced','fr-l53':'core',
  'fr-l54':'core','fr-l55':'core','fr-l56':'advanced','fr-l57':'advanced',
  'fr-l58':'advanced','fr-l59':'core','fr-l60':'core','fr-l61':'advanced',
  'fr-l62':'advanced','fr-l63':'advanced','fr-l64':'advanced','fr-l65':'advanced',
  'fr-l66':'advanced','fr-l67':'advanced','fr-l68':'core','fr-l69':'core',
  'fr-l70':'core','fr-l71':'core','fr-l72':'core','fr-l73':'core','fr-l74':'core',
  'fr-l75':'core','fr-l76':'core','fr-l77':'core','fr-l78':'core','fr-l79':'core',
  'fr-l80':'core','fr-l81':'core','fr-l82':'advanced','fr-l83':'core',
  'fr-l84':'core','fr-l85':'core','fr-l86':'core','fr-l87':'advanced',
  'fr-l88':'advanced','fr-l89':'advanced','fr-l90':'mastery','fr-l91':'mastery',
  'fr-l92':'core','fr-l93':'core','fr-l94':'core','fr-l95':'advanced',
  'fr-l96':'advanced','fr-l97':'mastery','fr-l98':'mastery','fr-l99':'mastery',
  'fr-l100':'mastery','fr-l101':'mastery','fr-l102':'mastery','fr-l103':'mastery',
  'fr-l104':'mastery','fr-l105':'mastery','fr-l106':'mastery','fr-l107':'mastery',
  'fr-l108':'mastery','fr-l109':'mastery','fr-l110':'mastery','fr-l111':'mastery',
  'fr-l112':'mastery','fr-l113':'mastery','fr-l114':'mastery','fr-l115':'mastery',
  'fr-l116':'mastery','fr-l117':'mastery',
  'fr-l32':'mastery','fr-l33':'mastery','fr-l34':'mastery','fr-l35':'mastery',
  'fr-l36':'mastery','fr-l37':'mastery',
};

// ── CEFR sublevels for all lessons ────────────────────────────────────────────

const SUBLEVEL_ADDITIONS = {
  'fr-l101':'A1.1','fr-l102':'A1.1','fr-l103':'A1.1','fr-l104':'A1.1',
  'fr-l105':'A1.1','fr-l106':'A1.2','fr-l107':'A1.2','fr-l108':'A1.2',
  'fr-l109':'A2.1','fr-l110':'A2.1','fr-l111':'A2.1',
  'fr-l112':'A2.2','fr-l113':'A2.2','fr-l114':'A2.2',
  'fr-l115':'B1','fr-l116':'B1',
  'fr-l117':'B2',
};

// ── Reconstruct FR_LEARN_PATH ─────────────────────────────────────────────────

const newLp = lp.map(unit => {
  const order = UNIT_ORDERS[unit.id];
  if (!order) return unit;

  const newLessons = order.map(id => {
    // Use new story lesson if defined
    if (STORY_LESSONS[id]) {
      const s = STORY_LESSONS[id];
      s.tag = ALL_TAGS[id] || 'mastery';
      return s;
    }
    // Use existing lesson, updating tag
    const L = allLessons[id];
    if (!L) throw new Error(`Lesson ${id} not found in any unit!`);
    return { ...L, tag: ALL_TAGS[id] || L.tag || 'core' };
  });

  return { ...unit, lessons: newLessons };
});

// ── Patch FR_LESSON_CEFR_SUBLEVEL ─────────────────────────────────────────────

// Read the existing sublevel map
const existingSublevels = global.FR_LESSON_CEFR_SUBLEVEL || {};
const mergedSublevels = { ...existingSublevels, ...SUBLEVEL_ADDITIONS };

// ── Serialise and write back to french-data.js ────────────────────────────────

function serialise(val, indent = 2) {
  const pad = (n) => ' '.repeat(n);

  function walk(v, depth) {
    const sp = pad(depth * indent);
    const sp2 = pad((depth + 1) * indent);

    if (v === null) return 'null';
    if (typeof v === 'boolean') return String(v);
    if (typeof v === 'number') return String(v);
    if (typeof v === 'string') {
      // Escape special chars
      return JSON.stringify(v);
    }
    if (Array.isArray(v)) {
      if (v.length === 0) return '[]';
      const items = v.map(item => sp2 + walk(item, depth + 1));
      return '[\n' + items.join(',\n') + '\n' + sp + ']';
    }
    if (typeof v === 'object') {
      const keys = Object.keys(v);
      if (keys.length === 0) return '{}';
      const items = keys.map(k => sp2 + JSON.stringify(k) + ': ' + walk(v[k], depth + 1));
      return '{\n' + items.join(',\n') + '\n' + sp + '}';
    }
    return String(v);
  }

  return walk(val, 0);
}

// Replace FR_LEARN_PATH block — find the ASSIGNMENT (not the comment on line 2)
const lpMarker = '\nwindow.FR_LEARN_PATH = ';
const lpStart = src.indexOf(lpMarker);
if (lpStart === -1) throw new Error('Cannot find window.FR_LEARN_PATH assignment in source');
// Find the end: next top-level window. assignment
const lpEnd = src.indexOf('\nwindow.FR_LESSON_CEFR_SUBLEVEL');
if (lpEnd === -1) throw new Error('Cannot find end of FR_LEARN_PATH block');

const newLpBlock = `\nwindow.FR_LEARN_PATH = ${serialise(newLp)};\n`;
src = src.slice(0, lpStart) + newLpBlock + src.slice(lpEnd);

// Replace FR_LESSON_CEFR_SUBLEVEL block
const subMarker = '\nwindow.FR_LESSON_CEFR_SUBLEVEL = ';
const subStart = src.indexOf(subMarker);
if (subStart === -1) throw new Error('Cannot find window.FR_LESSON_CEFR_SUBLEVEL in source');
// Find the closing "};\n" of the block and skip past it entirely
const CLOSE_TOKEN = '\n};\n';
const closeIdx = src.indexOf(CLOSE_TOKEN, subStart);
if (closeIdx === -1) throw new Error('Cannot find closing };\\n of FR_LESSON_CEFR_SUBLEVEL block');
const subEnd = closeIdx + CLOSE_TOKEN.length; // skip past the entire closing token

const newSubBlock = `\nwindow.FR_LESSON_CEFR_SUBLEVEL = ${serialise(mergedSublevels)};\n`;
src = src.slice(0, subStart) + newSubBlock + src.slice(subEnd);

fs.writeFileSync(filePath, src, 'utf8');
console.log('Done. Written to', filePath);
console.log('New story lessons added: fr-l101 through fr-l117');
console.log('Unit sizes:');
newLp.forEach(u => console.log(`  ${u.id}: ${u.lessons.length} lessons`));
