/**
 * Reorder lessons within each unit so Core/Advanced/Mastery tiers
 * accurately reflect true difficulty, not just insertion order.
 *
 * Tier assignment (from app.js):
 *   positions 0–2  → Core     (most foundational)
 *   positions 3–5  → Advanced (builds on core)
 *   positions 6+   → Mastery  (extension / complex)
 *
 * Also corrects FR_LESSON_CEFR_SUBLEVEL for mismapped lessons.
 */
'use strict';
const fs   = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'french-data.js');
let src = fs.readFileSync(filePath, 'utf8');

// ── Load the data ─────────────────────────────────────────────────────────────
const patched = src.replace(/window\.(\w+)\s*=/g, 'global.$1 =');
new Function('global', patched)(global);

const lp = global.FR_LEARN_PATH;

// ── Proposed lesson orders ────────────────────────────────────────────────────
// Key pedagogical decisions:
//  A1 Core: greetings → -ER verbs (most common verb type) → articles/gender
//  A1 Advanced: être → avoir → negation/questions (grammar backbone)
//  A2 Core: PC avoir → PC être → verbes pronominaux (essential past tense + reflexives)
//  A2 Advanced: imparfait → imparfait/PC contrast → essential irregular verbs
//  B1 Core: conditionnel → pronoms Y/EN → pronoms relatifs
//  B1 Advanced: subjonctif → plus-que-parfait → connecteurs
//  B1 Mastery: compound tenses → applied practice → stories → exam last
const NEW_ORDER = {
  'fr-a1': [
    // CORE (0–2): absolute first things a beginner needs
    'fr-l01', // Saluer et se présenter
    'fr-l09', // Les verbes en -ER au présent  ← pulled forward: most common verb type
    'fr-l04', // Les articles et le genre       ← pulled forward: underpins all nouns
    // ADVANCED (3–5): the grammar backbone
    'fr-l02', // Les pronoms et le verbe « être »
    'fr-l03', // « Avoir », l'âge et la possession
    'fr-l10', // La négation et les questions
    // MASTERY (6+): builds on core, then vocabulary, then consolidation
    'fr-l45', // Les chiffres (1–100)            ← pulled forward: A1.1 bedrock
    'fr-l05', // Le pluriel des noms
    'fr-l92', // Le genre des noms (gender rules) ← supports articles from pos 2
    'fr-l40', // La prononciation et les accents  ← phonics after first grammar
    'fr-l59', // Prononciation — sons de base
    'fr-l07', // Quelle heure est-il ?
    'fr-l11', // La famille et les adjectifs possessifs
    'fr-l12', // Décrire : les adjectifs
    'fr-l75', // Les couleurs
    'fr-l13', // Nationalités, pays et langues
    'fr-l53', // Conjugaison : verbes réguliers   ← reference/drill, early in Mastery
    'fr-l76', // La classe et les objets
    'fr-l14', // « Aller », « faire » et les loisirs
    'fr-l15', // Manger et boire : au café
    'fr-l16', // Le temps et les saisons
    'fr-l68', // Les jours, les mois et les dates
    'fr-l69', // La maison et les pièces
    'fr-l39', // Les transports, les directions et prépositions
    'fr-l41', // Le corps et la santé
    'fr-l62', // Ordre des mots — A1
    'fr-l56', // Dialogues du quotidien — A1
    'fr-l46', // La famille élargie et les pronoms possessifs
    'fr-l47', // Les quantités et les mesures
    'fr-l50', // Les activités saisonnières et les fêtes
    'fr-l65', // Écoute active — A1
    'fr-l52', // Expressions idiomatiques : avoir, être, aller
    'fr-l32', // Histoire : Au café
    'fr-l33', // Histoire : Ma famille
    'fr-l86', // Les grands nombres (100–1 000 000)
    'fr-l17', // Examen A1 (type DELF)             ← exam always last
  ],
  'fr-a2': [
    // CORE (0–2): passé composé is the gateway A2 skill + reflexive verbs
    'fr-l18', // Le passé composé — avec « avoir »
    'fr-l19', // Le passé composé — avec « être »
    'fr-l23', // Les verbes pronominaux              ← pulled forward: standard A2 Core
    // ADVANCED (3–5): tense contrast + most-used irregular verbs
    'fr-l20', // L'imparfait
    'fr-l21', // Imparfait ou passé composé ?
    'fr-l38', // Les verbes irréguliers essentiels
    // MASTERY (6+): extends grammar, then applied practice, then exam last
    'fr-l54', // Conjugaison : faire/vouloir/pouvoir/devoir ← critical modals, first Mastery
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
    'fr-l72', // Écrire une lettre ou un e-mail
    'fr-l73', // Exprimer son opinion
    'fr-l60', // Prononciation — nasales, liaison, élision
    'fr-l63', // Ordre des mots — A2
    'fr-l55', // Le passé composé — révision
    'fr-l78', // Le discours indirect
    'fr-l57', // Dialogues du quotidien — A2
    'fr-l66', // Écoute active — A2
    'fr-l34', // Histoire : Le week-end dernier
    'fr-l35', // Histoire : Lettre de Lyon
    'fr-l82', // Les faux amis (False Friends)
    'fr-l87', // La culture française
    'fr-l26', // Examen A2 (type DELF)              ← exam always last
  ],
  'fr-b1': [
    // CORE (0–2): conditionnel (most-used B1 form) → pronouns → relative clauses
    'fr-l27', // Le conditionnel présent
    'fr-l44', // Les pronoms Y et EN                ← pulled forward: A2 holdover, needed early
    'fr-l29', // Les pronoms relatifs
    // ADVANCED (3–5): subjunctive + compound past + discourse connectors
    'fr-l28', // Le subjonctif présent
    'fr-l79', // Le plus-que-parfait
    'fr-l81', // Les connecteurs et le discours
    // MASTERY (6+): complex tenses, applied contexts, stories, exam last
    'fr-l80', // La voix passive
    'fr-l83', // Le gérondif
    'fr-l84', // Le futur antérieur
    'fr-l85', // Le conditionnel passé
    'fr-l30', // Exprimer son opinion (B1 nuance)
    'fr-l58', // Situations formelles — B1
    'fr-l61', // Prononciation — registre et intonation
    'fr-l64', // Ordre des mots — B1
    'fr-l67', // Écoute active — B1
    'fr-l88', // Textes authentiques — pratique A2   ← consolidation before B1 texts
    'fr-l89', // Textes authentiques — pratique B1
    'fr-l90', // Les expressions idiomatiques
    'fr-l91', // Le français professionnel
    'fr-l36', // Histoire : Un débat
    'fr-l37', // Histoire : Changer de vie
    'fr-l31', // Examen B1 (type DELF)              ← exam always last
  ],
  'fr-b2': [
    // 4-lesson unit; swap nominalisation and register so register is Core first
    'fr-l93', // Le subjonctif — usage avancé et nuances
    'fr-l94', // La concession avancée
    'fr-l96', // Le registre et le style            ← contextual foundation for nominalisation
    'fr-l95', // La nominalisation                  ← specific technique, Advanced capstone
  ],
};

// ── Validate and apply reordering ─────────────────────────────────────────────
let changed = 0;
for (const unit of lp) {
  const order = NEW_ORDER[unit.id];
  if (!order) continue;

  const byId = {};
  for (const lesson of unit.lessons) byId[lesson.id] = lesson;

  const currentIds = unit.lessons.map(l => l.id);
  const missing = order.filter(id => !byId[id]);
  const extra   = currentIds.filter(id => !order.includes(id));

  if (missing.length) { console.error(`[${unit.id}] Missing lessons in proposed order:`, missing); process.exit(1); }
  if (extra.length)   { console.error(`[${unit.id}] Lessons in unit but not in proposed order:`, extra); process.exit(1); }

  unit.lessons = order.map(id => byId[id]);
  changed++;
  console.log(`Reordered ${unit.id} (${order.length} lessons)`);

  // Log the first 6 positions so Core/Advanced can be verified
  const tiers = order.slice(0, 6).map((id, i) => {
    const t = i < 3 ? 'CORE' : 'ADV';
    return `  ${t} pos${i}: ${id} (${byId[id].title})`;
  });
  console.log(tiers.join('\n'));
}
console.log(`\nReordered ${changed} units.`);

// ── Reconstruct the FR_LEARN_PATH section of the file ─────────────────────────
const lpMarker = 'window.FR_LEARN_PATH = window.FR_LEARN_PATH = ';
const start = src.indexOf(lpMarker);
if (start === -1) { console.error('Cannot find FR_LEARN_PATH marker'); process.exit(1); }

// Find the matching closing `];` after the start
const arrayStart = src.indexOf('[', start);
// Walk forward tracking bracket depth
let depth = 0, end = -1;
for (let i = arrayStart; i < src.length; i++) {
  if (src[i] === '[') depth++;
  else if (src[i] === ']') { depth--; if (depth === 0) { end = i + 1; break; } }
}
if (end === -1) { console.error('Cannot find end of FR_LEARN_PATH array'); process.exit(1); }
// Consume the optional `;` and newline after `]`
while (end < src.length && (src[end] === ';' || src[end] === '\n')) end++;

const newSection = lpMarker + JSON.stringify(lp, null, 2) + ';\n';
src = src.slice(0, start) + newSection + src.slice(end);

// ── Fix FR_LESSON_CEFR_SUBLEVEL ───────────────────────────────────────────────
// Corrections from audit:
//   To A1.1: fr-l45 (numbers), fr-l92 (gender rules), fr-l59 (basic phonics), fr-l53 (regular conjugation)
//   To A2.1: fr-l54 (faire/vouloir/pouvoir/devoir), fr-l55 (PC revision), fr-l77 (frequency adverbs)
//   To A2.2: fr-l88 (authentic A2 texts — currently labelled B1)

const sublevelFixes = [
  // Move to A1.1
  [/'fr-l45':\s*'A1\.2'/, "'fr-l45': 'A1.1'"],
  [/'fr-l92':\s*'A1\.2'/, "'fr-l92': 'A1.1'"],
  [/'fr-l59':\s*'A1\.2'/, "'fr-l59': 'A1.1'"],
  [/'fr-l53':\s*'A1\.2'/, "'fr-l53': 'A1.1'"],
  // Move to A2.1
  [/'fr-l54':\s*'A2\.2'/, "'fr-l54': 'A2.1'"],
  [/'fr-l55':\s*'A2\.2'/, "'fr-l55': 'A2.1'"],
  [/'fr-l77':\s*'A2\.2'/, "'fr-l77': 'A2.1'"],
  // Move fr-l88 from B1 to A2.2
  [/'fr-l88':\s*'B1'/, "'fr-l88': 'A2.2'"],
];

for (const [find, replace] of sublevelFixes) {
  const before = src;
  src = src.replace(find, replace);
  if (src === before) console.warn('WARNING: sublevel fix not applied for pattern', find);
  else console.log('Applied sublevel fix:', replace);
}

fs.writeFileSync(filePath, src, 'utf8');
console.log('\nDone — lessons reordered and CEFR sublevels corrected.');
