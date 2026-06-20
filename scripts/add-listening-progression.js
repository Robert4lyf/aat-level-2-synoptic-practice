/**
 * Add 51 new listening questions covering A1 → A1/A2 → A2 → B1 progression.
 * IDs fr-1465 – fr-1515.
 *
 * Sections:
 *   A1  recognition   (fr-1465–fr-1476)  lesson fr-l65  listen MCQ
 *   Sound disc.        (fr-1477–fr-1482)  lesson fr-l40  listen MCQ
 *   A1/A2 near-ident.  (fr-1483–fr-1489)  lesson fr-l65  listen MCQ
 *   A2  dictation      (fr-1490–fr-1497)  lesson fr-l66  listen-typed
 *   A2  comprehension  (fr-1498–fr-1505)  lesson fr-l66  listen MCQ
 *   B1  inference      (fr-1506–fr-1515)  lesson fr-l67  listen MCQ
 */
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'french-data.js');
let src = fs.readFileSync(filePath, 'utf8');

const newQuestions = [

  // ── A1 RECOGNITION ─────────────────────────────────────────────────────────
  // Students simply identify which word/phrase was spoken.

  {"id":"fr-1465","topic":"fr-listen","lesson":"fr-l65","type":"listen",
   "audio":"Bonjour !",
   "q":"Which greeting did you hear?",
   "opts":["Bonjour","Bonsoir","Bonne nuit","Bonne journée"],
   "ans":0,
   "exp":"'Bonjour' = Hello / Good day (used from morning until early evening). 'Bonsoir' = Good evening. 'Bonne nuit' = Good night (said when going to bed). 'Bonne journée' = Have a good day (said when parting)."},

  {"id":"fr-1466","topic":"fr-listen","lesson":"fr-l65","type":"listen",
   "audio":"Trois.",
   "q":"Which number did you hear?",
   "opts":["Deux (2)","Trois (3)","Treize (13)","Trente (30)"],
   "ans":1,
   "exp":"'Trois' = three (3). Common confusion: 'deux' (2) sounds like 'duh'; 'treize' (13) has a clear 'tr-èz' ending; 'trente' (30) ends in '-ent'. 'Trois' is short with a closed vowel /wa/."},

  {"id":"fr-1467","topic":"fr-listen","lesson":"fr-l65","type":"listen",
   "audio":"Douze.",
   "q":"Which number did you hear?",
   "opts":["Deux (2)","Douze (12)","Vingt (20)","Vingt-deux (22)"],
   "ans":1,
   "exp":"'Douze' = twelve (12). 'Deux' /dø/ is one syllable; 'douze' /duz/ has a longer vowel sound and a clear final 'z'. 'Vingt' = 20; the final 't' is silent. Always listen for the number of syllables to distinguish teens from units."},

  {"id":"fr-1468","topic":"fr-listen","lesson":"fr-l65","type":"listen",
   "audio":"Il est midi.",
   "q":"What time is it?",
   "opts":["Midnight","Noon","10:00","14:00"],
   "ans":1,
   "exp":"'Il est midi.' = It is noon. 'Midi' = midday / noon (12:00). 'Il est minuit' = it is midnight (00:00). 'Il est dix heures' = 10:00. 'Il est quatorze heures' = 14:00 (24-hour clock used in formal French)."},

  {"id":"fr-1469","topic":"fr-listen","lesson":"fr-l65","type":"listen",
   "audio":"Il fait froid.",
   "q":"What is the weather like?",
   "opts":["Hot","Raining","Cold","Windy"],
   "ans":2,
   "exp":"'Il fait froid.' = It is cold. Weather phrases: 'il fait chaud' (hot), 'il pleut' (it is raining), 'il fait froid' (cold), 'il y a du vent' (windy). 'Faire' is used for general weather conditions: il fait beau (nice), il fait mauvais (bad)."},

  {"id":"fr-1470","topic":"fr-listen","lesson":"fr-l65","type":"listen",
   "audio":"Merci beaucoup.",
   "q":"What does this mean?",
   "opts":["Excuse me","You're welcome","Thank you very much","Please"],
   "ans":2,
   "exp":"'Merci beaucoup' = Thank you very much. 'Merci' alone = thank you. 'Beaucoup' = a lot / very much. Contrast: 'Excusez-moi' (excuse me), 'De rien / Je vous en prie' (you're welcome), 'S'il vous plaît' (please)."},

  {"id":"fr-1471","topic":"fr-listen","lesson":"fr-l65","type":"listen",
   "audio":"S'il vous plaît.",
   "q":"Is this phrase formal or informal?",
   "opts":["Formal (uses 'vous')","Informal (uses 'tu')","Neither — it's an exclamation","Both are equally acceptable"],
   "ans":0,
   "exp":"'S'il vous plaît' = Please (formal). 'Vous' is the formal/plural pronoun. The informal equivalent is 'S'il te plaît' (using 'tu'). In a shop, restaurant, or with strangers, always use the 'vous' version."},

  {"id":"fr-1472","topic":"fr-listen","lesson":"fr-l65","type":"listen",
   "audio":"Le train part à deux heures.",
   "q":"When does the train leave?",
   "opts":["At 2 o'clock","At 12 o'clock","At 20:00","At 22:00"],
   "ans":0,
   "exp":"'Le train part à deux heures.' = The train leaves at two o'clock (14:00 in 24-hour time, or 2 pm in 12-hour). 'Partir' = to leave/depart. 'À deux heures' = at two o'clock. Contrast with 'à douze heures' (noon), 'à vingt heures' (20:00), 'à vingt-deux heures' (22:00)."},

  {"id":"fr-1473","topic":"fr-listen","lesson":"fr-l65","type":"listen",
   "audio":"Bienvenue !",
   "q":"What does this mean?",
   "opts":["Goodbye","Good luck","Welcome","Come in"],
   "ans":2,
   "exp":"'Bienvenue !' = Welcome! It is used to greet someone arriving somewhere. 'Au revoir' = goodbye. 'Bonne chance' = good luck. 'Entrez !' = come in! 'Bienvenue' can also appear as 'Bienvenue à Paris !' (Welcome to Paris!)."},

  {"id":"fr-1474","topic":"fr-listen","lesson":"fr-l65","type":"listen",
   "audio":"C'est combien ?",
   "q":"What is the speaker doing?",
   "opts":["Asking someone's name","Asking the time","Asking the price","Asking for directions"],
   "ans":2,
   "exp":"'C'est combien ?' = How much is it? A key shopping phrase. 'Combien' = how much / how many. You might also hear 'Ça coûte combien ?' (How much does it cost?). Contrast: 'Comment vous appelez-vous ?' (name), 'Il est quelle heure ?' (time), 'Où est… ?' (directions)."},

  {"id":"fr-1475","topic":"fr-listen","lesson":"fr-l65","type":"listen",
   "audio":"Il y a du soleil.",
   "q":"What is the weather like?",
   "opts":["It is windy","It is raining","It is sunny","It is snowing"],
   "ans":2,
   "exp":"'Il y a du soleil.' = It is sunny (there is sun). 'Il y a' = there is/there are. Weather with 'il y a': du vent (windy), du brouillard (foggy), du soleil (sunny), des nuages (cloudy). Contrast: 'il pleut' (raining), 'il neige' (snowing), 'il fait beau' (nice weather)."},

  {"id":"fr-1476","topic":"fr-listen","lesson":"fr-l65","type":"listen",
   "audio":"Mon anniversaire est le vingt-cinq décembre.",
   "q":"When is the speaker's birthday?",
   "opts":["5th December","15th December","20th December","25th December"],
   "ans":3,
   "exp":"'Mon anniversaire est le vingt-cinq décembre.' = My birthday is the 25th of December. 'Vingt-cinq' = 25. Dates in French: 'le + cardinal number + month'. Exception: 1st = 'le premier' (not 'le un'). Months are not capitalised in French."},

  // ── SOUND DISCRIMINATION ─────────────────────────────────────────────────────
  // Students identify specific sounds, accents, and homophones.

  {"id":"fr-1477","topic":"fr-listen","lesson":"fr-l40","type":"listen",
   "audio":"Tu joues du violon ?",
   "q":"Which word contains the French 'ou' sound (/u/ as in 'vous')?",
   "opts":["Tu","Joues","Du","Violon"],
   "ans":1,
   "exp":"'joues' /ʒu/ contains the French 'ou' sound — rounded lips, like 'oo' in 'boot'. 'tu' has the French 'u' (/y/) — lips rounded as for 'oo' but tongue forward, no English equivalent. 'du' also has French 'u'. 'violon' contains /jɔ̃/ (nasal). Remember: ou = /u/ (boot); u = /y/ (no English match)."},

  {"id":"fr-1478","topic":"fr-listen","lesson":"fr-l40","type":"listen",
   "audio":"J'ai acheté un billet.",
   "q":"What accent does the final vowel of 'acheté' carry?",
   "opts":["Accent grave (è)","Accent aigu (é)","Accent circonflexe (ê)","No accent"],
   "ans":1,
   "exp":"'acheté' ends in é = accent aigu. This gives the closed /e/ sound (like 'ay' in 'say'). Contrast: accent grave (è) = open /ɛ/ sound (like 'e' in 'bed'), used in 'père', 'mère'. Accent circonflexe (ê) = historically long vowel, used in 'fête', 'tête'. Participles of -er verbs always end in -é (aigu)."},

  {"id":"fr-1479","topic":"fr-listen","lesson":"fr-l40","type":"listen",
   "audio":"On entend un son étrange dans le salon.",
   "q":"How many nasal vowel sounds can you hear in this sentence?",
   "opts":["Two","Three","Four","Five"],
   "ans":2,
   "exp":"Four nasal vowels: 'On' /ɔ̃/, 'en-tend' /ɑ̃/, 'un' /œ̃/, 'son' /ɔ̃/ — that's four nasal sounds. Note: 'dans' /dɑ̃/ and 'salon' /salɔ̃/ add further nasals if counting all. Core nasal vowels: /ɑ̃/ (an/en), /ɔ̃/ (on/om), /œ̃/ (un/im), /ɛ̃/ (in/ain). Air flows through the nose as you pronounce them."},

  {"id":"fr-1480","topic":"fr-listen","lesson":"fr-l40","type":"listen",
   "audio":"Ils arrivent.",
   "q":"What sound links 'Ils' and 'arrivent' in natural speech?",
   "opts":["A silent pause","A /z/ sound — mandatory liaison","A /t/ sound","The 'l' of 'Ils' is pronounced"],
   "ans":1,
   "exp":"'Ils arrivent' = They arrive. Mandatory liaison: the normally silent 's' of 'ils' links to the following vowel, producing /z/: 'ilz-arrivent'. Liaison is obligatory after subject pronouns (ils, elles, nous, vous) before a vowel. The /l/ of 'ils' is always silent in spoken French."},

  {"id":"fr-1481","topic":"fr-listen","lesson":"fr-l40","type":"listen",
   "audio":"Ils ont des enfants.",
   "q":"How many of the final consonants in 'enfants' are pronounced?",
   "opts":["All three (n, t, s)","Two (n and t)","One (n only)","None — all are silent"],
   "ans":3,
   "exp":"In 'enfants', the final consonants are all silent: -ants = /ɑ̃/. The word is pronounced /ɑ̃fɑ̃/. French rule: most final consonants are silent. Exceptions: C, R, F, L are often pronounced (the CaReFuL consonants). 'des enfants' also triggers liaison: /dez-ɑ̃fɑ̃/."},

  {"id":"fr-1482","topic":"fr-listen","lesson":"fr-l40","type":"listen",
   "audio":"Ses parents sont en vacances.",
   "q":"What does 'sont' mean in this sentence?",
   "opts":["his/her (possessive, singular)","his/her (possessive, plural)","are (3rd person plural of être)","sound / noise (noun)"],
   "ans":2,
   "exp":"'sont' = are (3rd person plural of être: ils/elles sont). All four options sound identical: /sɔ̃/. Disambiguation: 'son' (no s) + singular noun = possessive (his/her book); 'ses' + plural noun = possessive (his/her books); 'son' alone = a sound; 'sont' follows a plural subject + is a verb."},

  // ── A1/A2 NEAR-IDENTICAL OPTIONS ───────────────────────────────────────────
  // Students must pick the exact sentence heard from options that differ by
  // one word, register, or tense — training careful listening.

  {"id":"fr-1483","topic":"fr-listen","lesson":"fr-l65","type":"listen",
   "audio":"Est-ce que vous avez une chambre pour deux nuits ?",
   "q":"What did you hear?",
   "opts":[
     "Est-ce que vous avez une chambre pour deux nuits ?",
     "Est-ce que vous avez une chambre pour trois nuits ?",
     "Est-ce que vous avez une table pour deux personnes ?",
     "Avez-vous une chambre disponible pour deux nuits ?"
   ],
   "ans":0,
   "exp":"'Est-ce que vous avez une chambre pour deux nuits ?' = Do you have a room for two nights? Key details: 'chambre' (room, not 'table'), 'deux nuits' (two nights, not 'trois'), 'Est-ce que vous avez' (not 'Avez-vous' — both are correct questions but different word order). Always track nouns and numbers first."},

  {"id":"fr-1484","topic":"fr-listen","lesson":"fr-l65","type":"listen",
   "audio":"Il va pleuvoir cet après-midi.",
   "q":"What did you hear?",
   "opts":[
     "Il pleut cet après-midi.",
     "Il a plu cet après-midi.",
     "Il va pleuvoir cet après-midi.",
     "Il va faire beau cet après-midi."
   ],
   "ans":2,
   "exp":"'Il va pleuvoir cet après-midi.' = It is going to rain this afternoon. 'Il va + infinitive' = near-future (aller + infinitif). Contrast: 'il pleut' (present — it is raining), 'il a plu' (passé composé — it rained), 'il va faire beau' (going to be nice). Listen for the auxiliary verb to identify the tense."},

  {"id":"fr-1485","topic":"fr-listen","lesson":"fr-l65","type":"listen",
   "audio":"T'as mangé ?",
   "q":"Which register is this phrase?",
   "opts":[
     "Formal — uses vous",
     "Neutral / standard",
     "Very informal — spoken contraction of 'tu as'",
     "Written French only"
   ],
   "ans":2,
   "exp":"'T'as mangé ?' = Have you eaten? This is very informal spoken French. 'T'as' is a contraction of 'tu as' — dropping the 'u' in rapid speech. The neutral form is 'Tu as mangé ?' and the formal inversion is 'As-tu mangé ?'. 'T'as' is never written in formal or standard contexts."},

  {"id":"fr-1486","topic":"fr-listen","lesson":"fr-l65","type":"listen",
   "audio":"Vous avez ça en rouge, taille trente-huit ?",
   "q":"What did you hear?",
   "opts":[
     "Vous avez ça en rouge, taille quarante ?",
     "Vous avez ça en bleu, taille trente-huit ?",
     "Vous avez ça en rouge, taille trente-six ?",
     "Vous avez ça en rouge, taille trente-huit ?"
   ],
   "ans":3,
   "exp":"'Vous avez ça en rouge, taille trente-huit ?' = Do you have this in red, size 38? Key details: colour = 'rouge' (red, not 'bleu'), size = 'trente-huit' (38, not 36 or 40). French clothing sizes: 38 = UK 10; 40 = UK 12; 36 = UK 8. Colour and size are the two critical pieces of information."},

  {"id":"fr-1487","topic":"fr-listen","lesson":"fr-l65","type":"listen",
   "audio":"Tu préfères Paris ou Lyon ?",
   "q":"What role does 'ou' play in this sentence?",
   "opts":[
     "It means 'where' — asking about location",
     "It means 'or' — offering a choice between two cities",
     "It means 'when' — asking about timing",
     "It is the preposition 'to' before a city name"
   ],
   "ans":1,
   "exp":"'Tu préfères Paris ou Lyon ?' = Do you prefer Paris or Lyon? 'ou' (no accent) = or — used to offer alternatives. 'où' (accent grave) = where — used in questions about location. Both sound identical /u/. Trick: replace 'ou' with 'ou bien' — if it still makes sense (Paris ou bien Lyon ?), it's 'or' = ou without accent."},

  {"id":"fr-1488","topic":"fr-listen","lesson":"fr-l65","type":"listen",
   "audio":"Bonjour Madame, est-ce que vous cherchez quelque chose en particulier ?",
   "q":"Which element tells you this is formal speech?",
   "opts":[
     "'Bonjour' — this word is always formal",
     "'quelque chose' — this is a formal expression",
     "'Madame' + 'vous' — title and formal pronoun",
     "The sentence is actually informal"
   ],
   "ans":2,
   "exp":"'Bonjour Madame, est-ce que vous cherchez quelque chose en particulier ?' = Hello Madam, are you looking for something in particular? Formal signals: 'Madame' (title/honorific) + 'vous' (formal pronoun instead of 'tu'). 'Bonjour' is neutral — used in both registers. 'Quelque chose' is also neutral. In shops, staff always use 'vous' with customers."},

  {"id":"fr-1489","topic":"fr-listen","lesson":"fr-l65","type":"listen",
   "audio":"Le bus part à huit heures moins le quart.",
   "q":"What did you hear?",
   "opts":[
     "Le bus part à sept heures et quart.",
     "Le bus part à huit heures et quart.",
     "Le bus part à huit heures moins le quart.",
     "Le bus part à huit heures moins dix."
   ],
   "ans":2,
   "exp":"'Le bus part à huit heures moins le quart.' = The bus leaves at a quarter to eight (07:45). Time expressions: 'et quart' = quarter past (+15 min); 'et demie' = half past (+30 min); 'moins le quart' = quarter to (-15 min). '8h moins le quart' = 07:45. Contrast with '8h et quart' = 08:15."},

  // ── A2 DICTATION ────────────────────────────────────────────────────────────
  // Students write down the complete sentence they hear.

  {"id":"fr-1490","topic":"fr-listen","lesson":"fr-l66","type":"listen-typed",
   "audio":"Il neige ce matin.",
   "q":"Write down what you hear:",
   "ans":"Il neige ce matin.",
   "alts":["il neige ce matin.","Il neige ce matin","il neige ce matin","Il neige ce matin."],
   "ignoreAccents":true,
   "exp":"'Il neige ce matin.' = It is snowing this morning. 'Neiger' = to snow (impersonal verb, always used with 'il'). 'Ce matin' = this morning; 'cet après-midi' = this afternoon; 'ce soir' = this evening. Compare: 'il pleut' (raining), 'il neige' (snowing), 'il grêle' (hailing)."},

  {"id":"fr-1491","topic":"fr-listen","lesson":"fr-l66","type":"listen-typed",
   "audio":"Tournez à droite après le pont.",
   "q":"Write down what you hear:",
   "ans":"Tournez à droite après le pont.",
   "alts":["tournez à droite après le pont.","Tournez a droite apres le pont.","tournez a droite apres le pont","Tournez à droite après le pont"],
   "ignoreAccents":true,
   "exp":"'Tournez à droite après le pont.' = Turn right after the bridge. Directions vocab: 'tournez' (turn — polite imperative), 'à droite' (to the right), 'à gauche' (to the left), 'tout droit' (straight ahead), 'après' (after), 'avant' (before), 'le pont' (the bridge)."},

  {"id":"fr-1492","topic":"fr-listen","lesson":"fr-l66","type":"listen-typed",
   "audio":"Je voudrais la carte des vins, s'il vous plaît.",
   "q":"Write down what you hear:",
   "ans":"Je voudrais la carte des vins, s'il vous plaît.",
   "alts":["je voudrais la carte des vins, s'il vous plaît.","Je voudrais la carte des vins s'il vous plaît.","je voudrais la carte des vins s'il vous plait","Je voudrais la carte des vins, s'il vous plait."],
   "ignoreAccents":true,
   "exp":"'Je voudrais la carte des vins, s'il vous plaît.' = I would like the wine list, please. 'Je voudrais' = I would like (conditional — polite). 'La carte des vins' = the wine menu. 'La carte' alone = the menu. 'L'addition' = the bill. 'S'il vous plaît' = please (formal)."},

  {"id":"fr-1493","topic":"fr-listen","lesson":"fr-l66","type":"listen-typed",
   "audio":"Vous avez ça en taille moyenne ?",
   "q":"Write down what you hear:",
   "ans":"Vous avez ça en taille moyenne ?",
   "alts":["vous avez ça en taille moyenne ?","Vous avez ca en taille moyenne ?","vous avez ca en taille moyenne","Vous avez ça en taille moyenne"],
   "ignoreAccents":true,
   "exp":"'Vous avez ça en taille moyenne ?' = Do you have this in a medium size? Shopping sizes: 'taille petite / S' (small), 'taille moyenne / M' (medium), 'taille grande / L' (large), 'taille extra-large / XL'. 'Ça' = that/this (informal demonstrative pronoun)."},

  {"id":"fr-1494","topic":"fr-listen","lesson":"fr-l66","type":"listen-typed",
   "audio":"Mon rendez-vous est à quatorze heures trente.",
   "q":"Write down what you hear:",
   "ans":"Mon rendez-vous est à quatorze heures trente.",
   "alts":["mon rendez-vous est à quatorze heures trente.","Mon rendez-vous est a quatorze heures trente.","mon rendez-vous est a quatorze heures trente","Mon rendez-vous est à quatorze heures trente"],
   "ignoreAccents":true,
   "exp":"'Mon rendez-vous est à quatorze heures trente.' = My appointment is at 14:30 (2:30 pm). 'Rendez-vous' = appointment / meeting (also a date — 'j'ai un rendez-vous avec Marie'). French uses 24-hour time formally: 'quatorze heures trente' = 14:30. 'Trente' = 30 (half past)."},

  {"id":"fr-1495","topic":"fr-listen","lesson":"fr-l66","type":"listen-typed",
   "audio":"Le bus s'arrête devant la poste.",
   "q":"Write down what you hear:",
   "ans":"Le bus s'arrête devant la poste.",
   "alts":["le bus s'arrête devant la poste.","Le bus s'arrete devant la poste.","le bus s'arrete devant la poste","Le bus s'arrête devant la poste"],
   "ignoreAccents":true,
   "exp":"'Le bus s'arrête devant la poste.' = The bus stops in front of the post office. 'S'arrêter' = to stop (reflexive). 'Devant' = in front of. 'La poste' = the post office. Prepositions of place: 'devant' (in front), 'derrière' (behind), 'à côté de' (next to), 'en face de' (opposite)."},

  {"id":"fr-1496","topic":"fr-listen","lesson":"fr-l66","type":"listen-typed",
   "audio":"Bonjour, je m'appelle Fatima Benali.",
   "q":"Write down what you hear:",
   "ans":"Bonjour, je m'appelle Fatima Benali.",
   "alts":["bonjour, je m'appelle Fatima Benali.","Bonjour, je m'appelle fatima benali.","Bonjour je m'appelle Fatima Benali.","bonjour je mappelle Fatima Benali"],
   "ignoreAccents":true,
   "exp":"'Bonjour, je m'appelle Fatima Benali.' = Hello, my name is Fatima Benali. 'S'appeler' = to be called (reflexive: je m'appelle, tu t'appelles, il s'appelle). Alternative: 'Mon nom est Fatima Benali.' — more formal and less natural in speech. Proper nouns (names) are always capitalised."},

  {"id":"fr-1497","topic":"fr-listen","lesson":"fr-l66","type":"listen-typed",
   "audio":"Ça coûte soixante-quinze euros.",
   "q":"Write down what you hear:",
   "ans":"Ça coûte soixante-quinze euros.",
   "alts":["ça coûte soixante-quinze euros.","Ca coute soixante-quinze euros.","ça coute soixante-quinze euros","Ça coûte soixante-quinze euros"],
   "ignoreAccents":true,
   "exp":"'Ça coûte soixante-quinze euros.' = It costs seventy-five euros. 'Coûter' = to cost. Tricky number: 'soixante-quinze' = 60 + 15 = 75. Belgian/Swiss French use 'septante-cinq' instead. French numbers 70–99 are arithmetic: 70 = soixante-dix, 80 = quatre-vingts, 90 = quatre-vingt-dix."},

  // ── A2 COMPREHENSION ────────────────────────────────────────────────────────
  // Audio gives information; question tests understanding — not just recall.

  {"id":"fr-1498","topic":"fr-listen","lesson":"fr-l66","type":"listen",
   "audio":"Le magasin ferme à dix-huit heures trente.",
   "q":"What time does the shop close?",
   "opts":["17:30","18:00","18:30","19:30"],
   "ans":2,
   "exp":"'Le magasin ferme à dix-huit heures trente.' = The shop closes at 18:30 (6:30 pm). 'Dix-huit' = 18; 'trente' = 30. 'Fermer' = to close; 'ouvrir' = to open. French shops often close for lunch (12h–14h) and on Sundays. 24-hour time is standard in transport and business."},

  {"id":"fr-1499","topic":"fr-listen","lesson":"fr-l66","type":"listen",
   "audio":"Je prends une bière et elle prend un verre de vin rouge.",
   "q":"What does the woman order?",
   "opts":["A beer","A glass of white wine","A glass of red wine","A coffee"],
   "ans":2,
   "exp":"'Elle prend un verre de vin rouge.' = She has a glass of red wine. 'Elle' = she. 'Un verre de vin rouge' = a glass of red wine. Contrast: 'vin blanc' (white wine), 'vin rosé' (rosé), 'une bière' (a beer — what the male speaker orders). 'Prendre' here means 'to have/order' in a café context."},

  {"id":"fr-1500","topic":"fr-listen","lesson":"fr-l66","type":"listen",
   "audio":"La pharmacie est juste en face de la boulangerie.",
   "q":"Where is the pharmacy?",
   "opts":["Next to the bakery","Behind the bakery","Opposite the bakery","At the end of the street"],
   "ans":2,
   "exp":"'La pharmacie est juste en face de la boulangerie.' = The pharmacy is just opposite the bakery. 'En face de' = opposite / facing. Direction vocab: 'à côté de' (next to), 'derrière' (behind), 'en face de' (opposite), 'au bout de la rue' (at the end of the street), 'au coin de' (at the corner of)."},

  {"id":"fr-1501","topic":"fr-listen","lesson":"fr-l66","type":"listen",
   "audio":"Prenez la première rue à gauche, puis continuez tout droit jusqu'au carrefour.",
   "q":"What should you do after turning left?",
   "opts":["Turn right at the crossroads","Go back to the start","Continue straight on to the crossroads","Take the second left"],
   "ans":2,
   "exp":"'Prenez la première rue à gauche, puis continuez tout droit jusqu'au carrefour.' = Take the first street on the left, then continue straight on as far as the crossroads. 'Puis' = then. 'Tout droit' = straight ahead. 'Jusqu'à' = as far as / until. 'Le carrefour' = the crossroads/junction."},

  {"id":"fr-1502","topic":"fr-listen","lesson":"fr-l66","type":"listen",
   "audio":"— Vous prenez quoi comme dessert ? — La tarte aux pommes, s'il vous plaît.",
   "q":"What does the customer order?",
   "opts":["Chocolate cake","Apple tart","Crème brûlée","Fruit salad"],
   "ans":1,
   "exp":"'La tarte aux pommes' = apple tart. 'Quoi comme…?' = What… would you like? (= Qu'est-ce que vous prenez comme…?). 'Dessert' = dessert. Key food vocab: 'la tarte aux pommes' (apple tart), 'le gâteau au chocolat' (chocolate cake), 'la crème brûlée', 'la salade de fruits' (fruit salad)."},

  {"id":"fr-1503","topic":"fr-listen","lesson":"fr-l66","type":"listen",
   "audio":"J'ai réservé une chambre pour trois nuits.",
   "q":"How long is the speaker staying?",
   "opts":["One night","Two nights","Three nights","A week"],
   "ans":2,
   "exp":"'J'ai réservé une chambre pour trois nuits.' = I have reserved a room for three nights. 'Réserver' = to reserve/book. 'Trois nuits' = three nights. Time expressions: 'une nuit' (one night), 'deux nuits' (two nights), 'une semaine' (a week), 'un week-end' (a weekend). 'J'ai réservé' = passé composé of réserver."},

  {"id":"fr-1504","topic":"fr-listen","lesson":"fr-l66","type":"listen",
   "audio":"Il fait froid mais il ne pleut pas.",
   "q":"What is the weather like?",
   "opts":["Cold and raining","Hot and sunny","Cold but dry","Windy and cloudy"],
   "ans":2,
   "exp":"'Il fait froid mais il ne pleut pas.' = It is cold but it is not raining. Two pieces of information: (1) 'il fait froid' = it is cold; (2) 'il ne pleut pas' = it is not raining (negation: ne…pas). 'Mais' = but. Always process both clauses in a compound sentence — the conjunction 'mais' signals a contrast."},

  {"id":"fr-1505","topic":"fr-listen","lesson":"fr-l66","type":"listen",
   "audio":"Il est neuf heures et quart du matin.",
   "q":"What time is it?",
   "opts":["08:45","09:00","09:15","09:30"],
   "ans":2,
   "exp":"'Il est neuf heures et quart du matin.' = It is a quarter past nine in the morning. 'Neuf heures' = 9 o'clock. 'Et quart' = and a quarter = +15 minutes → 09:15. 'Du matin' confirms am. Time expressions: 'et demie' (+30), 'moins le quart' (-15), 'pile' (exactly). '9h45' = dix heures moins le quart."},

  // ── B1 INFERENCE ────────────────────────────────────────────────────────────
  // Students infer location, relationship, tense, or intent from a mini-dialogue.

  {"id":"fr-1506","topic":"fr-listen","lesson":"fr-l67","type":"listen",
   "audio":"— Qu'est-ce que vous prenez ? — Un espresso, s'il vous plaît. Et l'addition ensuite.",
   "q":"Where does this conversation most likely take place?",
   "opts":["At a bakery","At a post office","At a café or restaurant","At a doctor's surgery"],
   "ans":2,
   "exp":"The clues: 'Qu'est-ce que vous prenez ?' (What will you have?) is a server's question; 'un espresso' is a drink; 'l'addition' = the bill. All three point to a café or restaurant. 'L'addition' is the key word — you only ask for the bill after eating or drinking. A bakery uses 'Qu'est-ce que je vous sers ?' and there is no 'addition'."},

  {"id":"fr-1507","topic":"fr-listen","lesson":"fr-l67","type":"listen",
   "audio":"— Le prochain départ pour Bordeaux, c'est quand ? — Dans vingt minutes, voie sept.",
   "q":"Where does this conversation take place?",
   "opts":["At an airport","At a bus station","At a train station","At a taxi rank"],
   "ans":2,
   "exp":"'Le prochain départ pour Bordeaux, c'est quand ?' = When is the next departure for Bordeaux? 'Dans vingt minutes, voie sept.' = In twenty minutes, platform seven. Key word: 'voie' = platform/track (used for trains, not buses or planes). 'Départ' = departure. At an airport it would be 'porte' (gate); at a bus station 'quai' (bay)."},

  {"id":"fr-1508","topic":"fr-listen","lesson":"fr-l67","type":"listen",
   "audio":"— Deux baguettes et une ficelle, s'il vous plaît. — Et avec ça ? — Un pain de campagne.",
   "q":"Where does this conversation take place?",
   "opts":["At a supermarket","At a bakery","At a restaurant","At a market stall selling cheese"],
   "ans":1,
   "exp":"'Deux baguettes et une ficelle' — a baguette and a ficelle (thinner baguette) are types of bread. 'Un pain de campagne' = a country loaf. 'Et avec ça ?' = And with that? / Anything else? These are bread products sold at a 'boulangerie' (bakery). 'La boulangerie' also sells croissants, pains au chocolat, and brioches."},

  {"id":"fr-1509","topic":"fr-listen","lesson":"fr-l67","type":"listen",
   "audio":"— T'as fait quoi ce week-end ? — Pas grand-chose. J'ai traîné à la maison.",
   "q":"What is the relationship between the two speakers?",
   "opts":["A teacher and a student","A manager and an employee","Two friends or peers","A parent and a child"],
   "ans":2,
   "exp":"'T'as fait quoi ?' (=Tu as fait quoi ? — informal contraction), 'Pas grand-chose' (not much), 'traîner' (to lounge around/hang out) are all very informal, casual expressions. This register signals a peer relationship — friends, classmates, or close colleagues. A manager/teacher would use 'vous' and more formal vocabulary."},

  {"id":"fr-1510","topic":"fr-listen","lesson":"fr-l67","type":"listen",
   "audio":"— Bonjour Monsieur Leblanc. Avez-vous eu le temps d'examiner notre proposition ? — Oui, j'ai quelques questions.",
   "q":"What is the likely relationship between the speakers?",
   "opts":["Close friends","Doctor and patient","Business / professional colleagues","Family members"],
   "ans":2,
   "exp":"'Bonjour Monsieur Leblanc' (formal title + surname), 'Avez-vous eu le temps d'examiner notre proposition ?' (formal inversion, professional vocabulary: 'proposition'). These signals all point to a business/professional context — likely a meeting between colleagues or a client and supplier. Friends use first names and 'tu'."},

  {"id":"fr-1511","topic":"fr-listen","lesson":"fr-l67","type":"listen",
   "audio":"Hier, je suis allé au marché et j'ai acheté des légumes frais.",
   "q":"Which tense is used in this sentence?",
   "opts":["Présent (ongoing/habitual actions)","Futur proche (going to do)","Imparfait (background/repeated past)","Passé composé (completed past events)"],
   "ans":3,
   "exp":"'Je suis allé' (I went) and 'j'ai acheté' (I bought) are both passé composé — used for completed past actions at a specific time. 'Hier' (yesterday) confirms a specific past moment. Contrast: imparfait for background description ('quand j'étais jeune…'); futur proche: 'je vais aller'; présent: 'je vais au marché'."},

  {"id":"fr-1512","topic":"fr-listen","lesson":"fr-l67","type":"listen",
   "audio":"Si j'avais plus de temps, je voyagerais davantage.",
   "q":"What grammatical structure does this sentence illustrate?",
   "opts":[
     "Si + présent + futur simple (real future condition)",
     "Si + passé composé + présent (past condition)",
     "Si + imparfait + conditionnel (unreal/hypothetical present condition)",
     "Si + subjonctif + impératif (command)"
   ],
   "ans":2,
   "exp":"'Si j'avais plus de temps, je voyagerais davantage.' = If I had more time, I would travel more. Structure: si + imparfait ('j'avais') + conditionnel présent ('je voyagerais') = hypothetical/unreal condition in the present. Contrast: si + présent + futur = real condition ('Si tu viens, je serai là'). Never use 'si + conditionnel' together."},

  {"id":"fr-1513","topic":"fr-listen","lesson":"fr-l67","type":"listen",
   "audio":"Je cherche la rue Mouffetard. Je suis complètement perdu — pouvez-vous m'aider ?",
   "q":"What does the speaker need?",
   "opts":["A taxi","Directions to a street","A recommendation for a restaurant","Help with a translation"],
   "ans":1,
   "exp":"'Je cherche la rue Mouffetard.' = I am looking for Rue Mouffetard. 'Je suis complètement perdu.' = I am completely lost. 'Pouvez-vous m'aider ?' = Can you help me? Three clues: specific street name + 'perdu' (lost) + request for help → the speaker needs directions. 'Rue Mouffetard' is a famous street in Paris's 5th arrondissement."},

  {"id":"fr-1514","topic":"fr-listen","lesson":"fr-l67","type":"listen",
   "audio":"Je voudrais retourner cette veste. Je l'ai achetée hier mais elle a une tache.",
   "q":"What is the customer's problem?",
   "opts":["The jacket is the wrong size","The jacket has a stain","The jacket is the wrong colour","The customer changed their mind"],
   "ans":1,
   "exp":"'Elle a une tache.' = It has a stain. 'Retourner' = to return (a purchase). 'Je l'ai achetée hier' = I bought it yesterday (note the agreement: 'achetée' agrees with 'la veste', feminine). 'Une tache' = a stain. Other reasons to return: 'elle est trop petite/grande' (wrong size), 'c'est la mauvaise couleur' (wrong colour), 'j'ai changé d'avis' (changed mind)."},

  {"id":"fr-1515","topic":"fr-listen","lesson":"fr-l67","type":"listen",
   "audio":"— Il vous reste des places pour ce soir ? — Il ne reste qu'une seule place, au balcon.",
   "q":"What does the response tell us?",
   "opts":[
     "The venue is fully sold out",
     "There are plenty of seats available",
     "Only one seat is left, in the balcony",
     "Balcony seats are cheaper than stalls"
   ],
   "ans":2,
   "exp":"'Il ne reste qu'une seule place, au balcon.' = There is only one seat left, in the balcony. 'Il ne reste que' = there is/are only (restrictive negation: ne…que = only). 'Une seule place' = one single seat. 'Au balcon' = in the balcony (upper level). Contrast: 'Il ne reste plus de places' = no seats left at all. Context: booking theatre or cinema tickets."}

];

// Insert all new questions before the closing `];` of the FR_QUESTIONS array.
// We find the last question (fr-1464) first, then seek the first `\n];` after it.
const lastQAnchor = '"id":"fr-1464"';
const anchorPos = src.indexOf(lastQAnchor);
if (anchorPos === -1) {
  console.error('ERROR: Could not find anchor question fr-1464 in french-data.js');
  process.exit(1);
}
const marker = '\n];';
const insertPos = src.indexOf(marker, anchorPos);
if (insertPos === -1) {
  console.error('ERROR: Could not find closing ]; after fr-1464');
  process.exit(1);
}

const newEntries = newQuestions.map(q => '  ' + JSON.stringify(q)).join(',\n');
src = src.slice(0, insertPos) + ',\n' + newEntries + src.slice(insertPos);

fs.writeFileSync(filePath, src, 'utf8');
console.log(`Done — added ${newQuestions.length} new listening questions (fr-1465–fr-1515).`);
