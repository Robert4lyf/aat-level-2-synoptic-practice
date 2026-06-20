/**
 * Fix ambiguous typed questions where students don't know if they should
 * type a single word/suffix or a full sentence.
 * Also adds "t'as" contraction alt to fr-1312.
 */
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'french-data.js');
let src = fs.readFileSync(filePath, 'utf8');

// Helper: replace a question's JSON block by id
function fixQuestion(id, findStr, replaceStr) {
  if (!src.includes(findStr)) {
    console.warn(`WARNING: Could not find target string for ${id}`);
    return;
  }
  src = src.replace(findStr, replaceStr);
  console.log(`Fixed ${id}`);
}

// ── fr-1052: add full-sentence alts ──────────────────────────────────────────
fixQuestion('fr-1052',
  `"ans":"heureuses","alts":["Heureuses"]`,
  `"ans":"heureuses","alts":["Heureuses","elles sont heureuses","Elles sont heureuses"]`
);

// ── fr-1054: add full-sentence alts ──────────────────────────────────────────
fixQuestion('fr-1054',
  `"ans":"belle","alts":["Belle"]`,
  `"ans":"belle","alts":["Belle","une belle femme","Une belle femme"]`
);

// ── fr-1056: add full-sentence alts ──────────────────────────────────────────
fixQuestion('fr-1056',
  `"ans":"sportives","alts":["Sportives"]`,
  `"ans":"sportives","alts":["Sportives","des femmes sportives","Des femmes sportives"]`
);

// ── fr-1058: add full-sentence alts ──────────────────────────────────────────
fixQuestion('fr-1058',
  `"ans":"est","alts":["Est"],"ignoreAccents":false,"exp":"'Elle est arrivée.'`,
  `"ans":"est","alts":["Est","elle est","Elle est","elle est arrivée","Elle est arrivée"],"ignoreAccents":false,"exp":"'Elle est arrivée.'`
);

// ── fr-1060: add full-sentence alts ──────────────────────────────────────────
fixQuestion('fr-1060',
  `"ans":"sont","alts":["Sont"]`,
  `"ans":"sont","alts":["Sont","elles sont venues me voir","Elles sont venues me voir"]`
);

// ── fr-1062: add full-sentence alts ──────────────────────────────────────────
fixQuestion('fr-1062',
  `"ans":"est","alts":["Est"],"ignoreAccents":false,"exp":"'Elle s'est couchée tôt.'`,
  `"ans":"est","alts":["Est","elle s'est couchée tôt","Elle s'est couchée tôt"],"ignoreAccents":false,"exp":"'Elle s'est couchée tôt.'`
);

// ── fr-1071: add partial + full-sentence alts ────────────────────────────────
fixQuestion('fr-1071',
  `"ans":"en","alts":["En"],"ignoreAccents":false,"exp":"'Je voyage en avion.'`,
  `"ans":"en","alts":["En","en avion","En avion","je voyage en avion","Je voyage en avion"],"ignoreAccents":false,"exp":"'Je voyage en avion.'`
);

// ── fr-1076: add full-sentence alts ──────────────────────────────────────────
fixQuestion('fr-1076',
  `"ans":"lui","alts":["Lui"]`,
  `"ans":"lui","alts":["Lui","je lui donne le livre","Je lui donne le livre"]`
);

// ── fr-1081: change "missing verb ending" → "conjugated verb" + add suffix alt
fixQuestion('fr-1081',
  `"q":"Type the missing verb ending: 'Tu parl___.' (You speak — present tense -er verb.)","ans":"parles","alts":["Parles","tu parles","Tu parles"]`,
  `"q":"Type the complete missing word: 'Tu parl___.' (You speak — present tense -er verb.)","ans":"parles","alts":["Parles","tu parles","Tu parles","es"]`
);

// ── fr-1083: change "missing verb ending" → "conjugated verb" + add suffix alt
fixQuestion('fr-1083',
  `"q":"[A2] Type the missing verb ending: 'Il fin___.' (He finishes — present tense, regular -ir verb.)","ans":"finit","alts":["Finit","il finit","Il finit"]`,
  `"q":"[A2] Type the complete missing word: 'Il fin___.' (He finishes — present tense, regular -ir verb.)","ans":"finit","alts":["Finit","il finit","Il finit","it"]`
);

// ── fr-1085: change "missing verb ending" → "conjugated verb" + add suffix alt
fixQuestion('fr-1085',
  `"q":"Type the missing verb ending: 'Elle mang___.' (She eats — present tense.)","ans":"mange","alts":["Mange","elle mange","Elle mange"]`,
  `"q":"Type the complete missing word: 'Elle mang___.' (She eats — present tense.)","ans":"mange","alts":["Mange","elle mange","Elle mange","e"]`
);

// ── fr-1087: add full-sentence alts and suffix alt ───────────────────────────
fixQuestion('fr-1087',
  `"ans":"peux","alts":["Peux"]`,
  `"ans":"peux","alts":["Peux","tu peux","Tu peux","eux"]`
);

// ── fr-1098: add full-sentence alt ───────────────────────────────────────────
fixQuestion('fr-1098',
  `"ans":"vous","alts":["Vous"],"ignoreAccents":false,"exp":"'Pourriez-vous me passer le sel ?'`,
  `"ans":"vous","alts":["Vous","Pourriez-vous me passer le sel ?","pourriez-vous me passer le sel ?"],"ignoreAccents":false,"exp":"'Pourriez-vous me passer le sel ?'`
);

// ── fr-1100: add full-sentence alts ──────────────────────────────────────────
fixQuestion('fr-1100',
  `"ans":"n'est","alts":["N'est"]`,
  `"ans":"n'est","alts":["N'est","n'est pas","ce n'est pas facile","Ce n'est pas facile"]`
);

// ── fr-1104: add full-sentence alts for key answers ─────────────────────────
fixQuestion('fr-1104',
  `"ans":"très","alts":["fort","extrêmement","particulièrement","Très","Fort","Extrêmement","Particulièrement"]`,
  `"ans":"très","alts":["fort","extrêmement","particulièrement","Très","Fort","Extrêmement","Particulièrement","c'est très intéressant","C'est très intéressant"]`
);

// ── fr-1312: add "t'as" contraction alts ────────────────────────────────────
fixQuestion('fr-1312',
  `"alts":["tu as bien dormi","As-tu bien dormi ?","est-ce que tu as bien dormi ?","Est-ce que tu as bien dormi ?","As-tu bien dormi"]`,
  `"alts":["tu as bien dormi","As-tu bien dormi ?","est-ce que tu as bien dormi ?","Est-ce que tu as bien dormi ?","As-tu bien dormi","t'as bien dormi ?","t'as bien dormi","T'as bien dormi ?","T'as bien dormi"]`
);

// Write back
fs.writeFileSync(filePath, src, 'utf8');
console.log('\nDone — all fixes applied.');
