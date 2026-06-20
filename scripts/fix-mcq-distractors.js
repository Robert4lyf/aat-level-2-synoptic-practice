/**
 * Fix MCQ distractor issues:
 *  1. fr-005  — joke distractor "Goodbye forever"
 *  2. fr-333  — duplicate option "nous pouvez"
 *  3. fr-773  — duplicate option "des chevals"
 *  4. fr-774  — duplicate option "des gâteaux" (one is the correct answer!)
 *  5. fr-776  — duplicate option "des œils"
 *  6. fr-796  — duplicate option "fais-" (one is the correct answer!)
 *  7. fr-878  — joke distractor "Napoleon's birthday"
 *  8. fr-1268 — duplicate option "sportife"
 */
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '..', 'french-data.js');
let src = fs.readFileSync(filePath, 'utf8');

function fix(id, find, replace) {
  if (!src.includes(find)) { console.warn('WARNING: not found for', id); return; }
  src = src.replace(find, replace);
  console.log('Fixed', id);
}

// fr-005: "Goodbye forever" → plausible translation error
fix('fr-005',
  '"À bientôt" means?","opts":["See you soon","See you tomorrow","Goodbye forever","Good night"]',
  '"À bientôt" means?","opts":["See you soon","See you tomorrow","See you in a moment","Good night"]'
);

// fr-333: duplicate "nous pouvez" at index 3 → "nous peut" (wrong singular stem on nous)
fix('fr-333',
  '"opts":["nous pouvons","nous pouvez","nous peuvent","nous pouvez"]',
  '"opts":["nous pouvons","nous pouvez","nous peuvent","nous peut"]'
);

// fr-773: duplicate "des chevals" at index 3 → "des cheval" (no change, omitting plural marker)
fix('fr-773',
  '"opts":["des chevals","des chevaux","des chevales","des chevals"]',
  '"opts":["des chevals","des chevaux","des chevales","des cheval"]'
);

// fr-774: duplicate "des gâteaux" at index 2 (index 1 is correct!) → "des gâteaues"
fix('fr-774',
  '"opts":["des gâteaus","des gâteaux","des gâteaux","des gâteauxs"]',
  '"opts":["des gâteaus","des gâteaux","des gâteaues","des gâteauxs"]'
);

// fr-776: duplicate "des œils" at index 2 → "des œilles"
fix('fr-776',
  '"opts":["des œils","des yeux","des œils","des œux"]',
  '"opts":["des œils","des yeux","des œilles","des œux"]'
);

// fr-796: duplicate "fais-" at index 3 (index 0 is correct!) → "font-" (wrong irregular form as stem)
fix('fr-796',
  '"opts":["fais-","fer-","faisions-","fais-"]',
  '"opts":["fais-","fer-","faisions-","font-"]'
);

// fr-878: "Napoleon's birthday" → "Victory in Europe Day (8 mai)"
fix('fr-878',
  '"opts":["Armistice Day","Napoleon\'s birthday","Bastille Day — celebrating the Revolution","France\'s founding day"]',
  '"opts":["Armistice Day","Victory in Europe Day (8 mai)","Bastille Day — celebrating the Revolution","France\'s founding day"]'
);

// fr-1268: duplicate "sportife" at index 2 → "sportivée" (double error: wrong vowel + past-participle ending)
fix('fr-1268',
  '"opts":["sportife","sportive","sportife","sportifs"]',
  '"opts":["sportife","sportive","sportivée","sportifs"]'
);

fs.writeFileSync(filePath, src, 'utf8');
console.log('\nDone.');
