# French Learning Pathway Audit

A review of the French course pathway (`FR_LEARN_PATH`) for logical lesson
order, CEFR/DELF level assignment, topic coverage, and quality consistency.

**Scope at time of audit:** 115 lessons — A1 (45), A2 (40), B1 (25), B2 (5).
**Key mechanic:** within a unit, lessons unlock **sequentially** (each stays
locked until the previous reaches ≥50%), so the array order *is* the learner's
forced path. Levels (A1–B2) are defined purely by which unit array a lesson
sits in.

---

## A. CEFR / DELF level assignment

| Lesson | Topic | Was | Now | Why |
|---|---|---|---|---|
| `fr-l78` | Le discours indirect (reported speech) | A2 | **B1** | Reported speech with pronoun/tense shifts is a B1 grammar point in the CEFR/DELF syllabus; A2 does not include it. |
| `fr-l46` | …et les pronoms possessifs | A1 | **A2** | Possessive *pronouns* (le mien/le tien) are A2. The A1 lesson `fr-l11` already covers possessive *adjectives* (mon/ma), which is the A1 point. |

CEFR sublevel tags (`FR_LESSON_CEFR_SUBLEVEL`) were updated to match
(`fr-l78` → `B1`, `fr-l46` → `A2.1`).

Everything else is correctly placed: passé composé / imparfait at A2;
conditional, present subjunctive, plus-que-parfait, passive voice, gérondif,
futur antérieur and conditionnel passé at B1; advanced subjunctive, concession
and nominalisation at B2.

## B. Logical order

| Change | Detail |
|---|---|
| Dates beside time | `fr-l68` "Les jours, les mois et les dates" moved to directly follow `fr-l07` "Quelle heure est-il ?" (they were 15 lessons apart in A1). |
| Seasons grouped | `fr-l50` "Les activités saisonnières et les fêtes" moved to follow `fr-l16` "Le temps et les saisons". |

The A2/B1 tense progression itself was already sound (past → imperfect →
future → conditional → subjunctive) and was left as-is. One remaining
debatable point, **not changed**: A1 introduces -ER verbs (`fr-l09`) before
être (`fr-l02`) and avoir (`fr-l03`); both sequencing philosophies are valid.

## C. Topic coverage & clarity

| Change | Detail |
|---|---|
| Title differentiated | B1 `fr-l30` "Exprimer son opinion" → **"Exprimer et nuancer son opinion"** (A2 `fr-l73` keeps "Exprimer son opinion"). The content was already correctly differentiated (A2 basics vs B1 doubt/certainty + subjunctive); only the duplicate title was confusing. |
| Title differentiated | B1 `fr-l29` "Les pronoms relatifs" → **"Les pronoms relatifs — dont et lequel"**, distinguishing it from A2 `fr-l71` "Les pronoms relatifs — qui, que, où". |

`fr-l04` (articles + gender intro) and `fr-l92` (gender-by-suffix rules) were
checked and found **complementary, not redundant** — left as-is.

## D. Quality consistency — outstanding (reported, not yet fixed)

Practice depth **degrades sharply as difficulty rises** — the hardest material
gets the least practice:

| Level | Median questions / lesson | Core lessons with <8 questions |
|---|---|---|
| A1 | 16 | 4 / 33 |
| A2 | 12 | 9 / 30 |
| B1 | **6** | **13 / 18** |
| B2 | **3** | **4 / 4** |

Every B1 grammar lesson (subjunctive, passive, gérondif, futur antérieur…) has
only 5–7 questions, and A2 grammar lessons (~6 q) are far thinner than A2
vocabulary/listening lessons (30–44 q). Card depth and explanations are, by
contrast, consistent (0 missing explanations).

**Recommendation:** author additional practice for the thin B1 (and B2)
grammar lessons, and top up the thin A2 grammar lessons, to bring practice
depth roughly in line with A1/A2 vocabulary lessons. Deferred to a separate,
scoped content-writing effort. The `check:french-quality` CI script emits
coverage warnings that track this gap.

---

*Structural changes in this audit are enforced/observed by `npm test`
(`validate:french` + `check:french-quality`). All moves preserve every lesson
and question; question levels follow their lesson's unit automatically.*
