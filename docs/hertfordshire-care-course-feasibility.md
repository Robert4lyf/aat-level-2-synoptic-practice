# Hertfordshire adult disability care — course feasibility assessment

Status: **assessment only. Nothing built, nothing committed to.**
Written August 2026 in response to: *"would it be feasible to add a course about
the Hertfordshire adult disability care market?"*

Stated goal: **improve understanding of the care system in Hertfordshire in order
to progress within the care commissioning team.** That goal, not the course idea,
is what this document is judged against.

**Short answer: technically easy, and the sources exist — but the course as
literally described would be wrong within a year. Build the durable two-thirds as
a subject, and keep the Hertfordshire specifics as a maintained brief instead.
See §6.**

---

## 1. Technical feasibility: easy, and cheaper than the Level 3 plan feared

Adding a sixth subject is close to a solved problem in this repo. The registry at
`app.js:16` takes `{ id, name, short, flag, color, desc, meta, tabs, assets,
activate() }`, and progress is already keyed per subject (`prep_v2_<id>`,
`app.js:9`), so nothing existing is disturbed.

`docs/aat-level-3-plan.md` §2 estimated **25–30 edit sites across 7 files** for a
fifth subject. Most of that cost has since been paid: `aat3` shipped, and the
AAT-only surfaces it complained about are now explicitly gated. For a subject
that rides the shared engine — the `code-route` / `lsf` shape, not the
self-rendering `aat3` shape — the real cost today is:

| Edit | File | Size |
|---|---|---|
| Registry entry | `app.js:16` | ~10 lines |
| Data file (`*_TOPICS` / `*_QUESTIONS` / `*_LEARN_PATH`) | new `herts-data.js` | the whole job — see §3 |
| `--subj` token triple, light + dark | `styles.css:4963-4971` | 2 lines |
| Precache entry + `CACHE_VERSION` bump | `sw.js:6` | 2 lines |

That is **four edit sites**, not thirty. Three things make it that cheap:

- **The AAT-only UI is already gated the right way round.** The calculator
  sidebar (`app.js:4196, 4353, 4433, 5065`), the L3 bridge panel (`app.js:5338`)
  and the reference panel (`styles.css:2790-2791`, written as
  `body:not([data-subject="aat"])`) all key off `=== 'aat'`. A new subject
  inherits sensible defaults with **no code change** — the opposite of the Level 3
  problem, where those same literals silently hid wanted UI.
- **Assets load lazily.** `ensureSubjectAssets()` (`app.js:88`) injects the data
  file on first open, so `index.html` needs no edit and the default AAT load does
  not get slower.
- **The lesson player, SM-2 spaced repetition, the journey UI, progress tracking,
  offline support and the question types are all shared.** A new subject gets
  them for free.

`_activeSubjectId` still appears 35 times in `app.js`, ~20 of them hardcoded id
comparisons — but 9 of those are `'french'`-specific (CEFR gating, TTS, flip
mode) and the rest are `'aat'` / `'aat3'`. None need touching.

**One trap, unchanged from the Level 3 plan:** `getStorageKey` is duplicated in
the CSP-hashed inline bootstrap in `index.html`. Adding a subject does *not*
require editing it (the `prep_v2_` + id pattern already generalises), but if you
ever do, the `sha256-` hash is pinned in **three** files — `index.html`,
`_headers`, `vercel.json` — and `npm run check:csp` is what catches it.

Nothing in `npm test` validates a new subject's data, so a `validate-herts-data.js`
mirroring `validate-french-data.js` would be worth adding — but it is not blocking.

**Verdict on the engineering: a weekend, most of it spent on the data file.**

---

## 2. Source material: abundant, and much of it genuinely current

This was the part most at risk of being a dead end. It isn't. There is a real,
inspectable evidence base:

**Live and current**
- **Hertfordshire's Market Position Statements** — [hertfordshire.gov.uk/hertsmpe](https://www.hertfordshire.gov.uk/hertsmpe),
  carrying **2023-24** data with 2022-23 and 2021-22 comparatives, and split by
  sector including a *Disabled Adults Service* statement. 32,809 new requests for
  support in 2023-24 (28% aged 18-64); 58.2% closed with information/advice only;
  5% into long-term domiciliary or residential care. This is the natural spine.
- **The Supported Living Programme** — approved February 2025, **£47.7m to deliver
  820 new homes by 2030**. The July 2026 Year 1 update reports **231 homes**
  across delivered/in-progress/pipeline and — candidly — that registered housing
  providers have shown *"reduced appetite for supported living"* in *"challenging"*
  market conditions. That single programme is a complete case study in structure,
  forthcoming change, opportunity and problem at once.
- **Procurement artefacts you can actually read** — the HCC 02/24 *Provision of
  Supported Living Services in Hertfordshire* award notice on Contracts Finder
  (multi-provider), a Dynamic Purchasing Vehicle notice for supported living for
  adults with learning disability, mental health and autism on Find a Tender, and
  a countywide Autism Community Support Service tender.
- **CQC local authority assessment (2024): Good** — 8 of 9 areas scored 3, with
  *partnerships and communities* at 4. Plus an LGA pre-assurance peer challenge
  report noting the shift to an **outcome-based** home care model away from
  time-and-task, co-produced with lead providers.
- **The delivery landscape** — HPFT delivers integrated mental health, learning
  disability and autism health-and-social-care alongside HCC; HCPA is the
  provider-facing intermediary; Herts & West Essex ICB and its MHLDN partnership
  are the health-side counterparts.

**National frame**
- Care Act 2014 (esp. the market-shaping duty), Transforming Care / Building the
  Right Support, the Procurement Act 2023 regime.
- The **Casey Commission**: began May 2025, originally two phases (2026 and 2028);
  following the change of Prime Minister in July 2026 the timetable was
  accelerated to **a single final report in summer 2027**.

---

## 3. Where it breaks: four honest problems

### 3.1 The disability-specific documents are a decade old

The Learning Disability Market Position Statement still published on
hertfordshire.gov.uk is **~2016/17 vintage** — I extracted and read it. It
measures itself against "our 2015 Market Position Statement", its achievements
section runs to 2016, and it discusses partnership with **CCGs**, which have not
existed since July 2022. The companion Autism Spectrum Condition MPS is **2017**.

This matters more than it looks. Those are exactly the two documents a course on
"the Hertfordshire adult *disability* care market" would lean on hardest, and
teaching from them would install a pre-ICB mental model. The failure mode is not
a wasted evening — it is confidently saying something out of date in a
commissioning meeting.

### 3.2 Volatility, not availability, is the real killer

This is the decisive argument, and it is a difference in kind from every subject
already in the repo.

| Subject | Answer key | Rate of change |
|---|---|---|
| AAT L2 / L3 | Published AAT specification | Multi-year cycle |
| Français / DELF | CEFR descriptors | Effectively static |
| Code de la route | Statutory highway code | Slow, gazetted |
| **Herts disability market** | **None** | **Quarterly** |

Contract awards land, the Supported Living Programme reports annually, Casey has
already moved once (two reports → one, 2028 → summer 2027), ICB structures shift,
budgets settle. A lesson card asserting "Hertfordshire's commissioning intention
is X" has a half-life measured in months.

The repo knows this pattern is expensive. `docs/aat-level-3-plan.md` records that
the *entire* Level 2 learning corpus is **49,269 words** after all the work to
date, and that a 470-file feature was once built and deleted wholesale. Content
here is not cheap, and content that needs re-auditing every quarter against no
fixed reference is the most expensive kind there is.

### 3.3 There is no verification loop

Every validator in `npm test` works because there is something to check *against*
— an answer key, a mark blueprint, a coverage target. You can write
`check-question-integrity.js` for AAT because a trial balance either balances or
it doesn't.

No script can detect that "HCC intends to commission X" quietly became false.
The content would degrade **silently**, which is the worst possible failure mode
for material intended to make someone sound authoritative at work.

### 3.4 The learning goal is a poor fit for quizzing

The five existing subjects are exam prep: there is a real assessment, and
retrieval practice is precisely the right tool. Here there is no exam. What the
goal actually requires is **judgement in conversation** — reading a market, arguing
a spec, knowing why a provider walked away from a framework. Multiple-choice
recall trains the vocabulary layer of that, which is real but is maybe a third of
the value.

### 3.5 A smaller flag: publishing it

This repo deploys publicly (GitHub Pages / Vercel). Everything above is
public-domain material, so there is no disclosure issue. But a polished study
site that reads as an authoritative account of **your own employer's** market
position, published under your name, is a slightly odd artefact to have indexed.
Either keep it unpublished, or carry a disclaimer in the README's existing style.

---

## 4. What the honest verdict is

**Feasible to build: yes, comfortably.**
**Worth building exactly as described: no.**

The idea's own framing — "how the market is structured, forthcoming changes,
problems and opportunities, procurement" — is three parts moving target to one
part durable knowledge. Encoding a moving target as lesson cards inverts the
effort: maximum authoring cost on the fastest-decaying content.

---

## 5. What is durable, and therefore course-shaped

Roughly a third of the intended scope has stable answers and would *still be true
in 2030*. This is also, not coincidentally, the part that makes someone credible
in a commissioning team:

1. **Statutory duties** — Care Act 2014: the market-shaping and diversity duty,
   assessment and eligibility, care and support planning, reviews, appeals,
   ordinary residence, and the wellbeing principle as the organising idea.
2. **What commissioning actually is** — the commissioning cycle end to end:
   JSNA → market shaping → service design → procurement → contract management →
   review. Where an MPS sits in that loop and what it is *for*.
3. **Procurement mechanics** — Procurement Act 2023 and the Provider Selection
   Regime; how frameworks, dynamic purchasing vehicles, individual placement
   agreements and spot purchasing differ, and when each is the right instrument.
   Outcome-based versus time-and-task specifications, and why Hertfordshire moved.
4. **Service models** — residential vs supported living vs Shared Lives vs
   extra care vs day opportunities; what "supported living" means legally and
   financially (tenancy + care, and why the housing-benefit interaction is what
   makes the model work — and what makes registered providers wary of it).
5. **Money** — where it comes from and what each stream can buy: council-funded
   packages, Continuing Healthcare, s117 aftercare, the Better Care Fund, s75
   pooled budgets, direct payments and personal budgets.
6. **Safeguarding and deprivation of liberty** — Care Act s42 enquiries, DoLS
   and the LPS position, and how quality assurance and CQC registration interact
   with commissioning.
7. **Population and pathway** — Transforming Care / Building the Right Support,
   Preparing for Adulthood transitions from children's services, and LeDeR.

**Use Hertfordshire as the worked example throughout, not as the structure.** Every
lesson lands its stable principle and then illustrates it with a live local case
— the Supported Living Programme for market shaping, HCC 02/24 for framework
procurement, the 2024 CQC assessment for assurance. The specifics can then be
refreshed without the curriculum moving.

**Realistic size:** 7–8 lessons at ~1,200 words plus 90–120 questions, against
the repo's own yardstick of 49,269 words for the whole of Level 2. Comparable to
`code-route` in shape, denser in prose. Real work, but bounded — and it is
content work, not engineering, which is the correct ratio.

---

## 6. Recommendation

**Split the goal, because it is really two goals.**

**(a) Build the durable core as a sixth subject** — id `herts-care` or, better
named for what it is, **"Adult Social Care Commissioning (England)"** with a
Hertfordshire lens. Scope it to §5. It is cheap to wire up (§1), has stable
answers, and survives contact with the next three years of reform.

**(b) Do *not* make the volatile material a course.** Keep it as a **maintained
brief** — one markdown dossier with a link register to primary sources
(hertsmpe, the ACS Cabinet Panel papers, Contracts Finder / Find a Tender notices
for HCC awards, the CQC LA assessment, Casey Commission publications), refreshed
on a set cadence. A source-linked briefing note is the right artefact, because
here the value *is* knowing where the documents are and having read them.

**(c) Worth saying plainly, since career progression is the actual objective:**
the fastest route is not a self-built course. It is reading the primary
documents — the last several Adult Care Services Cabinet Panel papers on the
council's democracy pages, HCC's own live tender and award notices, the CQC local
authority assessment report, and the current MPS — which would put you ahead of
most colleagues in a couple of weekends with nothing built at all. Option (a)
earns its place because it gives that reading a durable framework to hang on;
option (b) keeps it current. The course is the scaffolding, not the substance.

**Suggested order:** (c) first — it is free and it will sharpen what (a) should
contain. Then (b), which falls out of (c) naturally. Then (a), if the appetite is
still there once the reading is done.

---

## Sources

- [Hertfordshire Market Position Statements](https://www.hertfordshire.gov.uk/hertsmpe)
- [Learning Disability MPS (c. 2016/17)](https://www.hertfordshire.gov.uk/media-library/documents/about-the-council/data-and-information/learning-disability-mps.pdf)
- [Autism Spectrum Condition MPS (2017)](https://www.hertfordshire.gov.uk/media-library/documents/foi/pdf/autism-spectrum-condition-adults-including-aspergers-market-position-statement-2017.pdf)
- [Adult care services policies and strategies](https://hertfordshire.gov.uk/about-the-council/freedom-of-information-and-council-data/open-data-statistics-about-hertfordshire/our-policies-and-procedures/adult-care-services-policies-and-strategies.aspx)
- [820 supported living homes — programme approval](https://hertscouncil-newsroom.prgloo.com/news/hertfordshire-county-council-approves-project-to-create-820-new-supported-living-homes)
- [Supported Living Programme progress update (2026)](https://www.bishopsstortfordindependent.co.uk/news/herts-county-council-makes-good-progress-on-plans-to-deliv-9473330/)
- [HCC 02/24 Supported Living Services award — Contracts Finder](https://www.contractsfinder.service.gov.uk/notice/d6f76482-275f-44c8-b3f4-70fd65252b81)
- [Dynamic Purchasing Vehicle for supported living — Find a Tender](https://www.find-tender.service.gov.uk/procurement/ocds-h6vhtk-04a5df)
- [CQC rates Hertfordshire adult social care as good](https://www.cqc.org.uk/press-release/cqc-rates-hertfordshire-county-councils-adult-social-care-provision-good)
- [CQC local authority assessment — Hertfordshire](https://www.cqc.org.uk/care-services/local-authority-assessment-reports/Hertfordshire-0524)
- [LGA adult social care peer challenge — Hertfordshire](https://www.local.gov.uk/our-support/council-assurance-and-peer-support/peer-challenges-we-offer/adult-social-care-peer-3)
- [HPFT adult social care](https://www.hpft.nhs.uk/services/adult-social-care/)
- [Herts & West Essex ICS — MHLDN partnership](https://www.hertsandwestessex.ics.nhs.uk/about/hcp/mhlda/)
- [Transforming Care — Hertfordshire](https://www.hertfordshire.gov.uk/services/adult-social-services/disability/learning-disabilities/transforming-care/transforming-care.aspx)
- [Casey Commission — terms of reference](https://caseycommission.co.uk/about/terms-of-reference/)
- [Casey Commission timetable accelerated to summer 2027](https://www.localgovernmentlawyer.co.uk/adult-social-care/391-adult-care-news/101275-burnham-to-bring-forward-date-for-casey-commission-to-report-back-with-plan-on-delivery-of-national-care-service)
