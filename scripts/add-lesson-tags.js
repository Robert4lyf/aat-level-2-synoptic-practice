'use strict';
const fs   = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'french-data.js');
let src = fs.readFileSync(filePath, 'utf8');

// Load the data
const patched = src.replace(/window\.(\w+)\s*=/g, 'global.$1 =');
new Function('global', patched)(global);

const lp = global.FR_LEARN_PATH;

// Tag assignments: core = standard CEFR, advanced = partly beyond basics,
// mastery = beyond CEFR curriculum (conversational/cultural skills)
const TAGS = {
  // ── A1 ─────────────────────────────────────────────────────────────────────
  'fr-a1': {
    core: new Set([
      'fr-l01', // Saluer et se présenter
      'fr-l09', // Les verbes en -ER au présent
      'fr-l04', // Les articles et le genre
      'fr-l02', // Les pronoms et le verbe « être »
      'fr-l03', // « Avoir », l'âge et la possession
      'fr-l10', // La négation et les questions
      'fr-l45', // Les chiffres (1–100)
      'fr-l05', // Le pluriel des noms
      'fr-l40', // La prononciation et les accents
      'fr-l59', // Prononciation — sons de base
      'fr-l07', // Quelle heure est-il ?
      'fr-l11', // La famille et les adjectifs possessifs
      'fr-l12', // Décrire : les adjectifs
      'fr-l75', // Les couleurs
      'fr-l13', // Nationalités, pays et langues
      'fr-l53', // Conjugaison : verbes réguliers
      'fr-l76', // La classe et les objets
      'fr-l14', // « Aller », « faire » et les loisirs
      'fr-l15', // Manger et boire : au café
      'fr-l16', // Le temps et les saisons
      'fr-l68', // Les jours, les mois et les dates
      'fr-l69', // La maison et les pièces
      'fr-l39', // Les transports, les directions et prépositions
      'fr-l41', // Le corps et la santé
      'fr-l65', // Écoute active — A1
      'fr-l17', // Examen A1 (type DELF)
    ]),
    advanced: new Set([
      'fr-l92', // Le genre des noms (gender rules — beyond basic A1)
      'fr-l62', // Ordre des mots — A1 (meta-grammar)
      'fr-l56', // Dialogues du quotidien — A1 (applied interaction)
      'fr-l46', // La famille élargie et les pronoms possessifs
      'fr-l47', // Les quantités et les mesures
      'fr-l50', // Les activités saisonnières et les fêtes
      'fr-l86', // Les grands nombres (100–1 000 000)
    ]),
    mastery: new Set([
      'fr-l52', // Expressions idiomatiques : avoir, être, aller
      'fr-l32', // Histoire : Au café
      'fr-l33', // Histoire : Ma famille
    ]),
  },
  // ── A2 ─────────────────────────────────────────────────────────────────────
  'fr-a2': {
    core: new Set([
      'fr-l18', // Le passé composé — avec « avoir »
      'fr-l19', // Le passé composé — avec « être »
      'fr-l23', // Les verbes pronominaux
      'fr-l20', // L'imparfait
      'fr-l21', // Imparfait ou passé composé ?
      'fr-l38', // Les verbes irréguliers essentiels
      'fr-l54', // Conjugaison : faire/vouloir/pouvoir/devoir
      'fr-l22', // Le futur proche et le futur simple
      'fr-l70', // Les adjectifs et pronoms démonstratifs
      'fr-l24', // Les pronoms COD et COI
      'fr-l25', // Le comparatif et le superlatif
      'fr-l71', // Les pronoms relatifs — qui, que, où
      'fr-l77', // Les adverbes de fréquence
      'fr-l42', // Les vêtements et le shopping
      'fr-l43', // Le travail et la vie professionnelle
      'fr-l48', // Faire les courses
      'fr-l49', // Les transports et les directions
      'fr-l51', // Au restaurant
      'fr-l74', // La santé — chez le médecin
      'fr-l55', // Le passé composé — révision
      'fr-l66', // Écoute active — A2
      'fr-l26', // Examen A2 (type DELF)
    ]),
    advanced: new Set([
      'fr-l72', // Écrire une lettre ou un e-mail
      'fr-l73', // Exprimer son opinion
      'fr-l60', // Prononciation — nasales, liaison, élision
      'fr-l63', // Ordre des mots — A2
      'fr-l78', // Le discours indirect
      'fr-l57', // Dialogues du quotidien — A2
    ]),
    mastery: new Set([
      'fr-l34', // Histoire : Le week-end dernier
      'fr-l35', // Histoire : Lettre de Lyon
      'fr-l82', // Les faux amis (False Friends)
      'fr-l87', // La culture française
    ]),
  },
  // ── B1 ─────────────────────────────────────────────────────────────────────
  'fr-b1': {
    core: new Set([
      'fr-l27', // Le conditionnel présent
      'fr-l44', // Les pronoms Y et EN
      'fr-l29', // Les pronoms relatifs
      'fr-l28', // Le subjonctif présent
      'fr-l79', // Le plus-que-parfait
      'fr-l81', // Les connecteurs et le discours
      'fr-l80', // La voix passive
      'fr-l30', // Exprimer son opinion (B1 nuance)
      'fr-l67', // Écoute active — B1
      'fr-l88', // Textes authentiques — pratique A2
      'fr-l89', // Textes authentiques — pratique B1
      'fr-l31', // Examen B1 (type DELF)
    ]),
    advanced: new Set([
      'fr-l83', // Le gérondif
      'fr-l84', // Le futur antérieur
      'fr-l85', // Le conditionnel passé
      'fr-l58', // Situations formelles — B1
      'fr-l61', // Prononciation — registre et intonation
      'fr-l64', // Ordre des mots — B1
    ]),
    mastery: new Set([
      'fr-l90', // Les expressions idiomatiques
      'fr-l91', // Le français professionnel
      'fr-l36', // Histoire : Un débat
      'fr-l37', // Histoire : Changer de vie
    ]),
  },
  // ── B2 ─────────────────────────────────────────────────────────────────────
  'fr-b2': {
    core: new Set([
      'fr-l93', // Le subjonctif — usage avancé et nuances
      'fr-l94', // La concession avancée
    ]),
    advanced: new Set([
      'fr-l96', // Le registre et le style
      'fr-l95', // La nominalisation
    ]),
    mastery: new Set(),
  },
};

// Apply tags to each lesson object
let tagged = 0, untagged = [];
for (const unit of lp) {
  const unitTags = TAGS[unit.id];
  if (!unitTags) { console.warn(`No tag map for unit ${unit.id} — skipping`); continue; }
  for (const lesson of unit.lessons) {
    if (unitTags.mastery.has(lesson.id))       { lesson.tag = 'mastery'; tagged++; }
    else if (unitTags.advanced.has(lesson.id)) { lesson.tag = 'advanced'; tagged++; }
    else if (unitTags.core.has(lesson.id))     { lesson.tag = 'core'; tagged++; }
    else                                        { untagged.push(`${unit.id}/${lesson.id}`); }
  }
}

if (untagged.length) {
  console.error('ERROR: lessons with no tag assigned:', untagged);
  process.exit(1);
}
console.log(`Tagged ${tagged} lessons.`);

// Reconstruct FR_LEARN_PATH in the file
const lpMarker = 'window.FR_LEARN_PATH = window.FR_LEARN_PATH = ';
const start = src.indexOf(lpMarker);
if (start === -1) { console.error('Cannot find FR_LEARN_PATH marker'); process.exit(1); }

const arrayStart = src.indexOf('[', start);
let depth = 0, end = -1;
for (let i = arrayStart; i < src.length; i++) {
  if (src[i] === '[') depth++;
  else if (src[i] === ']') { depth--; if (depth === 0) { end = i + 1; break; } }
}
if (end === -1) { console.error('Cannot find end of FR_LEARN_PATH array'); process.exit(1); }
while (end < src.length && (src[end] === ';' || src[end] === '\n')) end++;

const newSection = lpMarker + JSON.stringify(lp, null, 2) + ';\n';
src = src.slice(0, start) + newSection + src.slice(end);

fs.writeFileSync(filePath, src, 'utf8');
console.log('Done — lesson tags written to french-data.js.');
