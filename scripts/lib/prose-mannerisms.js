/**
 * Prose mannerisms — the shared machine-writing guard.
 *
 * This material is written by a model, and models have tics. Three checkers
 * (check-aat1-quality.js, check-aat2-quality.js, check-aat3-quality.js) each
 * carried an identical copy of the lists below; a fourth was about to be added
 * for the guitar module. Four copies drift, so they live here instead.
 *
 * The three copies were verified byte-identical apart from column alignment
 * before this file was created. Nothing about the rules changed in the move.
 *
 * THREE PASSES, and they catch different things:
 *
 * NEVER hunts VOCABULARY — words with no business in this material that read as
 * machine-generated on sight. All of it sits at zero across every module, so a
 * hard failure costs nothing today and catches drift the day it appears.
 *
 * SIGNPOST hunts a FRAME — "it is worth noting that X" announces that X matters
 * instead of making the point. A few are fine, so this is a rate ceiling per
 * thousand prose words, not a ban. Level 2 ran at 0.41 per thousand before a
 * cull and 0.03 after.
 *
 * CADENCE hunts SHAPES, which is the harder and more common tell. A reader
 * spotted "That sounds modest, and it is worth being clear about why it is not"
 * and was right to, even though every word in it is ordinary. These shapes are
 * not banned — "A credit note is not a cancelled invoice — it is X" corrects a
 * real misconception and earns its form. What reads as machine-written is
 * DENSITY: the worst card in the project stacked four of them, opening with a
 * concession-reversal, defining by negation, reaching for a superlative and
 * then announcing that the point was the point of the card. So the rule is at
 * most one per card, which permits the device and forbids the pile-up.
 *
 * ADDING A DOMAIN LIST: every matcher takes an optional `extra` argument that
 * is ADDED to the shared list, never substituted for it, so a module can carry
 * its own tics without editing this file and without being able to switch the
 * shared rules off. Set shared rules here; keep domain-specific ones in the
 * module that needs them.
 *
 * Callers keep their own message strings. This file supplies the patterns and
 * the matching primitives only — that is what let the extraction be proved
 * behaviour-neutral against the three checkers' existing output.
 */

'use strict';

/* Vocabulary. Hard fail: all of it is at zero across every module today. */
const NEVER = [
  [/\bdelv(e|es|ing)\b/i,                        'delve'],
  [/\bleverag(e|es|ing)\b/i,                     'leverage'],
  [/\bseamless(ly)?\b/i,                         'seamless'],
  [/\b(landscape|realm|tapestry|ecosystem)\b/i,  'landscape/realm/tapestry/ecosystem'],
  [/\bin today'?s (world|business|climate)\b/i,  "in today's world"],
  [/\bever-(changing|evolving)\b/i,              'ever-changing'],
  [/\bat (its|the) (core|heart)\b/i,             'at its core'],
  [/\bthat said\b/i,                             'that said'],
  [/(^|[.!?]\s+)(Furthermore|Moreover|Additionally),/, 'Furthermore/Moreover/Additionally'],
  [/\bunderscore[sd]?\b/i,                       'underscores'],
  [/\bholistic(ally)?\b/i,                       'holistic'],
  [/\bmulti-faceted\b/i,                         'multi-faceted'],
  [/\bnavigat(e|es|ing) the\b/i,                 'navigate the (metaphor)'],
  /* Both forms. The pattern was `it'?s important to note`, where the optional
     apostrophe covers "it's" and "its" and nothing covers "it IS important to
     note" — the uncontracted form, which is the one a model writes more often.
     A mutation test injected it into a card and the guard said nothing. */
  [/\bit(?:'|’)?s important to note\b|\bit is important to note\b/i, "it's/it is important to note"],
  [/\bit should be noted\b/i,                    'it should be noted'],

  /* Added with the FAPS unit, after the gap above showed the list had been
     written once and never re-examined. Every one of these was measured at
     ZERO across every module's corpus before being added, so none of them
     fails anything today and each catches drift the day it appears. Kept to
     vocabulary with no business in this material — "crucial", "vital" and
     "robust" are ordinary words an author may legitimately need, and are
     deliberately not here. */
  [/\ba testament to\b/i,                        'a testament to'],
  [/\bcornerstone\b/i,                           'cornerstone'],
  [/\bmyriad\b/i,                                'myriad'],
  [/\bboasts?\b/i,                               'boasts'],
  [/\bin essence\b/i,                            'in essence'],
  [/\b(deep )?div(e|es|ing) into\b/i,            'dive into'],
  [/\bgame[- ]chang(er|ing)\b/i,                 'game-changer'],
];

/* The signposting frame, and its rate ceiling per 1,000 prose words. */
const SIGNPOST = /\b(it is|it's) worth\b|\bworth (noting|saying|being|pausing|flagging)\b/gi;
const SIGNPOST_CEILING_PER_1K = 1.0;

/* Rhetorical shapes. Permitted singly, failed when stacked. */
const CADENCE = [
  [/\b(that|this|it) (sounds|seems|looks|feels)\b[^.!?]{0,60}?\b(and|but|yet)\b[^.!?]{0,40}?\bnot\b/gi, 'concession-reversal ("that sounds X, but it is not")'],
  [/\bthan it (first |initially )?(appears|looks|sounds|seems)\b/gi,          '"than it appears"'],
  [/\b(is|are) not [^.!?]{3,60}?[.—:] ?(It|They) (is|are)\b/g,                'definition by negation'],
  [/\bis not [^.!?]{3,50}?(,| —) (but|it is|rather)\b/gi,                     '"not X, but Y"'],
  [/\b(that|this) is (the )?(whole |entire |very )?(point|of it|difference)\b/gi, '"that is the point"'],
  [/\bwhich is (exactly|precisely)\b/gi,                                      '"which is exactly/precisely"'],
  [/\bthe answer is (almost |nearly )?always\b/gi,                            '"the answer is almost always"'],
  [/\b(keep|hold) (that|this) (thread |thought )?in mind\b/gi,                '"keep that in mind"'],
  [/\bthe (only|single most|one) [a-z]+ (account|source|place|thing|reason|way|figure|check)\b/gi, 'superlative-only'],
  [/\beverything else\b[^.!?]{0,40}\b(is built|rests|follows|depends)\b/gi,    '"everything else follows"'],
  [/\b(is|are) doing (the|real|a lot of) work\b|\bcarr(y|ies) the whole\b/gi,  '"is doing the work"'],
  [/\bis the (point|subject|whole) of this (card|lesson)\b/gi,                 '"is the point of this card"'],
  [/\bworth (pausing|dwelling|lingering) on\b/gi,                             '"worth dwelling on"'],
  [/\b(none of (that|this) is|that is not) (arbitrary|accidental|an accident|a coincidence)\b/gi, '"not arbitrary/no accident"'],
  [/\band that is (exactly|precisely) (why|what|the)\b/gi,                     '"and that is precisely why"'],
];
const CADENCE_MAX_PER_CARD = 1;

/* Flag normalisation, and why each matcher needs it.
 *
 * With the shared lists none of this matters: NEVER is non-global and is used
 * with .test(), CADENCE and SIGNPOST are global and are used with .match(),
 * which resets lastIndex itself. It matters for the `extra` lists a module
 * passes in, where the flags are whatever the author happened to type.
 *
 *   neverHits   asks "does this appear at all", so /g must be REMOVED — a
 *               global regex passed to .test() advances lastIndex and the next
 *               call starts mid-string, silently missing hits.
 *   cadenceHits counts occurrences, so /g must be ADDED — without it .match()
 *               returns [fullMatch, ...captureGroups], and one match of a
 *               two-group pattern would count as three, failing a clean card.
 *   signpostCount is the same case: without /g it counts capture groups
 *               instead of occurrences and feeds nonsense to the rate ceiling.
 */
function nonGlobal(re) { return new RegExp(re.source, re.flags.replace(/g/g, '')); }
function global_(re)   { return new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g'); }

/* `extra` ADDS to the shared list; it never replaces it. A module's own tics
   are additional to the ones every module shares, and a signature that let a
   caller silently drop all 14 shared vocabulary rules by passing one of its
   own would defeat the point of a shared guard. */

/* → array of labels, one entry per matching pattern. */
function neverHits(text, extra) {
  const out = [];
  NEVER.concat(extra || []).forEach(([re, label]) => {
    if (nonGlobal(re).test(String(text))) out.push(label);
  });
  return out;
}

/* → array of labels, one entry per OCCURRENCE, so callers can count density. */
function cadenceHits(text, extra) {
  const out = [];
  CADENCE.concat(extra || []).forEach(([re, label]) => {
    const m = String(text).match(global_(re));
    if (m) for (let k = 0; k < m.length; k++) out.push(label);
  });
  return out;
}

/* → number of signposting frames in the text. */
function signpostCount(text, re) {
  return (String(text).match(global_(re || SIGNPOST)) || []).length;
}

/* A card's paragraphs, however they were authored.
 *
 * EVERY RENDERER IN THIS APP ACCEPTS `p` AS A STRING OR AN ARRAY — they all do
 * `Array.isArray(c.p) ? c.p : [c.p]` — and every checker here assumed an array,
 * because until now every card happened to be written as one. A card authored
 * with a bare string therefore skipped the prose checks silently on Levels 1
 * and 2 and in the guitar module, and crashed the Level 3 one outright. The
 * checkers have to accept exactly what the renderers accept, or the rule they
 * enforce is "written the way the existing cards happen to be written" rather
 * than the rule anybody stated.
 */
function paras(card) {
  const p = card && card.p;
  if (!p) return [];
  return Array.isArray(p) ? p : [p];
}

module.exports = {
  paras,
  NEVER,
  SIGNPOST,
  SIGNPOST_CEILING_PER_1K,
  CADENCE,
  CADENCE_MAX_PER_CARD,
  neverHits,
  cadenceHits,
  signpostCount,
};
