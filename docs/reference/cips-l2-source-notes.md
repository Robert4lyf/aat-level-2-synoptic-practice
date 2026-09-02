# CIPS Level 2 — source record for the syllabus spine

Reviewed: 2026-09-02
Status: source record for `cips2-syllabus.js`; not learner-facing content.

## Governing sources

The current CIPS qualification page for the **CIPS Level 2 Certificate in Procurement and Supply Operations** (qualification accreditation number **603/3282/7**) links to two CIPS-hosted PDFs:

1. **Full syllabus** — *CIPS Level 2 Certificate in Procurement and Supply Operations, 2018 Syllabus, Version 1* (16 pages)
   - Current CIPS download URL: `https://udntho.files.cmp.optimizely.com/download/assets/CIPS%2BQuals_L2_Syllabus.pdf/0e549ebc8e7b11f0acf12ace6ddd3d42`
   - Current qualification page: `https://1prd-dxp.cips.org/qualifications/procurement-certificate`
   - The PDF cover says “2018 Syllabus — Version 1”; its footer is `L2B/JAN/2019/V2`.
   - Although old-dated, this is still the **Full syllabus** linked by CIPS on the live qualification page as reviewed on 2026-09-02.

2. **Qualification specification** — *CIPS Level 2 Certificate in Procurement and Supply Operations* (5 pages)
   - Current CIPS download URL: `https://udntho.files.cmp.optimizely.com/download/assets/Level%2B2%2BCertificate%2Bin%2Bprocurement%2Band%2Bsupply%2Boperations%2Bspecification/7d17e1de9dfc11f093deea7e6d2090fc?channelToken=91dccf09421341a0966a4fcb510b55ae`
   - Linked as **View full specification** from the same live qualification page.

The live CIPS page additionally confirms: five mandatory core modules, 18 credits, 180 total qualification hours, 120 guided-learning hours, 54 recommended self-study hours and six examination hours. All modules are assessed by computer-based examinations.

## Copyright handling

CIPS's syllabus states that its content may not be copied or reproduced without permission. This repository therefore does **not** store a verbatim text extraction or a copy of the PDF.

`cips2-syllabus.js` preserves the public qualification structure and short official learning-outcome / assessment-criterion headings needed to map study content to the qualification. The longer indicative-content bullets are independently paraphrased. `sourceBulletCount` records how many indicative bullets the official syllabus places under each criterion so a dropped or accidentally invented teaching area can be detected without republishing CIPS prose.

## Qualification structure confirmed from the specification

| Module | Credits | Questions | Duration | Questions per LO (as printed) | GLH | Self-study | Module learning time |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| L2M1 Introducing Procurement and Supply | 6 | 72 OR | 120 min | 12 | 40 | 18 | 60 h |
| L2M2 Procurement and Supply Operations | 3 | 36 OR | 60 min | 9 | 20 | 9 | 30 h |
| L2M3 Stakeholder Relationships | 3 | 36 OR | 60 min | 9 | 20 | 9 | 30 h |
| L2M4 Systems Technology | 3 | 36 OR | 60 min | 12 | 20 | 9 | 30 h |
| L2M5 Inventory, Logistics and Expediting | 3 | 36 OR | 60 min | 9 | 20 | 9 | 30 h |

The specification states an examination pass mark of **70%** and says the learner must achieve 70% for **each learning-outcome section** within the examination.

## Source discrepancy that must not be hidden

The specification table says L2M5 has **36 Objective Response questions** and **9 questions per learning outcome**. The published syllabus has **three** top-level learning outcomes for L2M5. Three × nine is 27, not 36.

That is an inconsistency in the current CIPS-published source, not something this project should guess away. `cips2-syllabus.js` therefore records both facts and carries an `assessmentCaveat`. A future mock engine must not claim an official per-LO L2M5 allocation until CIPS publishes a source that resolves it.

## Coverage counts transcribed from the syllabus

These counts are deliberately small, independently checkable facts rather than a republication of the syllabus text. They form the ratchet used by `scripts/check-cips2-syllabus-fidelity.js`.

| Module | Learning outcomes | Assessment criteria | Indicative bullets |
| --- | ---: | ---: | ---: |
| L2M1 | 6 | 13 | 69 |
| L2M2 | 4 | 10 | 34 |
| L2M3 | 4 | 14 | 34 |
| L2M4 | 3 | 9 | 36 |
| L2M5 | 3 | 12 | 37 |
| **Total** | **20** | **58** | **210** |

### Indicative-bullet counts by assessment criterion

- **L2M1:** 1.1=3, 1.2=7, 1.3=6, 2.1=7, 2.2=3, 3.1=3, 3.2=3, 4.1=13, 5.1=3, 5.2=6, 5.3=4, 5.4=5, 6.1=6.
- **L2M2:** 1.1=2, 1.2=2, 1.3=3, 2.1=3, 2.2=5, 2.3=4, 3.1=3, 3.2=3, 3.3=4, 4.1=5.
- **L2M3:** 1.1=3, 1.2=1, 1.3=1, 2.1=2, 2.2=3, 2.3=4, 2.4=4, 3.1=1, 3.2=1, 3.3=3, 3.4=3, 4.1=1, 4.2=3, 4.3=4.
- **L2M4:** 1.1=8, 1.2=4, 1.3=4, 2.1=3, 2.2=4, 2.3=2, 3.1=3, 3.2=3, 3.3=5.
- **L2M5:** 1.1=5, 1.2=2, 1.3=7, 1.4=1, 2.1=3, 2.2=5, 2.3=2, 2.4=1, 2.5=4, 3.1=4, 3.2=2, 3.3=1.

## Review rule

Before any CIPS lesson is marked complete, re-check the live CIPS qualification page. If CIPS replaces either linked PDF, changes the qualification number, module list, exam shape or pass rule, update this record and the syllabus spine before changing teaching content.
