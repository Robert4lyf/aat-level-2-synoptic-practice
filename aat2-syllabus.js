/* AAT Level 2 syllabus — machine-readable spine.
 *
 * Source: AAT Level 2 Certificate in Accounting (Q2022) Qualification
 * Specification, QN 603/6338/1, version 5.4 published May 2025 (the document
 * also records a v5.5 amendment dated 24 September 2025). The extracted text
 * this file was transcribed from is kept at
 * docs/reference/aat-l2-spec-v5.4-extracted.txt.
 *
 * WHY THIS FILE EXISTS
 *
 * Levels 1 and 3 each have an encoded syllabus, and a build check that fails
 * when a lesson claims something the specification does not contain or a
 * shipped outcome leaves a criterion untaught. Level 2 — the original and
 * largest module — had neither, so "covers the Level 2 syllabus" was the one
 * claim in this project that nothing verified. This is that spine.
 *
 * STRUCTURE — three levels
 *
 *   unit (ITBK)  →  learning outcome (1)  →  assessment criterion (1.1)
 *
 * DELIBERATE DEPTH LIMIT, AND WHY
 *
 * The specification has a fourth level — the numbered "scope of content" items
 * (1.1.1, 1.2.3 and so on) that Levels 1 and 3 encode in full. Those are NOT
 * encoded here, and the omission is deliberate rather than lazy.
 *
 * In this document's PDF layout, the scope-of-content numbers are set in one
 * column and their text in another, so a run of identifiers (1.2.1 … 1.2.7)
 * appears as seven bare numbers followed by seven paragraphs. Recovering which
 * number belongs to which paragraph is guesswork wherever a paragraph wraps or
 * a bullet list intervenes, and a mis-paired criterion is worse than an absent
 * one: it would let a lesson claim coverage of something it does not teach, and
 * the coverage check would confirm the error rather than catch it.
 *
 * Assessment criteria (1.1, 1.2, …) extract unambiguously and are the level AAT
 * itself uses to describe what is assessed, so they are what lessons tag
 * against here. Sixty criteria across four units is a real, checkable spine.
 * If a text-layer version of the specification is ever obtained, the fourth
 * level can be added without changing any lesson tag — criteria numbering is a
 * prefix of scope numbering.
 *
 * `tier` records the specification's own verb framing, as at the other levels:
 *   'understand' — "learners need to understand" / "Understand …"
 *   'do'         — a criterion the student must be able to perform
 * At Level 2 the split is visible in the outcome titles themselves: "Understand
 * how to set up bookkeeping systems" against "Process customer transactions".
 *
 * This is a personal, non-commercial study tool. AAT permits reproduction of
 * this material for personal and educational use.
 */
(function (root) {
  'use strict';

  /* ── Introduction to Bookkeeping ─────────────────────────────────────────── */
  var ITBK = {
    unit: 'itbk',
    code: 'ITBK',
    title: 'Introduction to Bookkeeping',
    unitReference: 'H/618/3583',
    glh: 65,
    qualificationWeighting: 25,
    assessment: { method: 'Computer based assessment', marking: 'Computer marked', durationMinutes: 90 },
    outcomes: [
      {
        n: 1, title: 'Understand how to set up bookkeeping systems', weighting: 20, tier: 'understand',
        criteria: [
          { id: '1.1', title: 'The purpose of business documents' },
          { id: '1.2', title: 'The process of recording bookkeeping transactions' },
          { id: '1.3', title: 'Create and use coding systems' },
          { id: '1.4', title: 'Set bookkeeping systems' }
        ]
      },
      {
        n: 2, title: 'Process customer transactions', weighting: 20, tier: 'do',
        criteria: [
          { id: '2.1', title: 'Calculate invoice and credit note amounts' },
          { id: '2.2', title: 'Enter customer invoices and credit notes into books of prime entry' },
          { id: '2.3', title: 'Process receipts from customers' }
        ]
      },
      {
        n: 3, title: 'Process supplier transactions', weighting: 20, tier: 'do',
        criteria: [
          { id: '3.1', title: 'Check the accuracy of supplier invoices and credit notes' },
          { id: '3.2', title: 'Enter supplier invoices and credit notes into books of prime entry' },
          { id: '3.3', title: 'Process payments to suppliers' }
        ]
      },
      {
        n: 4, title: 'Process receipts and payments', weighting: 20, tier: 'do',
        criteria: [
          { id: '4.1', title: 'Enter receipts and payments into an analysed cash book' },
          { id: '4.2', title: 'Enter receipts and payments into an analysed petty cash book' },
          { id: '4.3', title: 'Total and balance the cash book and petty cash book' },
          { id: '4.4', title: 'Process recurring receipts and payments' }
        ]
      },
      {
        n: 5, title: 'Process transactions into the ledger accounts', weighting: 20, tier: 'do',
        criteria: [
          { id: '5.1', title: 'Transfer data from the books of prime entry to the ledgers' },
          { id: '5.2', title: 'Total and balance ledger accounts' }
        ]
      }
    ],
    /* The specification is explicit that at this level prompt payment discount
       is adjusted for using credit notes only, recorded in discounts allowed and
       discounts received daybooks — which is what removes the need for discount
       columns in the cash book. Teaching any other PPD method is out of scope. */
    excluded: [
      'Accounting for prompt payment discount (PPD) by any method other than credit notes recorded in discounts allowed and discounts received daybooks.'
    ]
  };

  /* ── Principles of Bookkeeping Controls ──────────────────────────────────── */
  var POBC = {
    unit: 'pobc',
    code: 'POBC',
    title: 'Principles of Bookkeeping Controls',
    unitReference: 'K/618/3584',
    glh: 50,
    qualificationWeighting: 25,
    assessment: { method: 'Computer based assessment', marking: 'Computer marked', durationMinutes: 90 },
    outcomes: [
      {
        n: 1, title: 'Use control accounts', weighting: 25, tier: 'do',
        criteria: [
          { id: '1.1', title: 'Produce control accounts' },
          { id: '1.2', title: 'Reconcile control accounts' }
        ]
      },
      {
        n: 2, title: 'Reconcile a bank statement with the cash book', weighting: 25, tier: 'do',
        criteria: [
          { id: '2.1', title: 'Payment methods' },
          { id: '2.2', title: 'Use the bank statement to update the cash book' },
          { id: '2.3', title: 'Complete bank reconciliation statements' }
        ]
      },
      {
        n: 3, title: 'Use the journal', weighting: 25, tier: 'do',
        criteria: [
          { id: '3.1', title: 'Produce journal entries to record bookkeeping transactions' },
          { id: '3.2', title: 'Produce journal entries to correct errors not disclosed by the trial balance' },
          { id: '3.3', title: 'Produce journal entries to correct errors disclosed by the trial balance' }
        ]
      },
      {
        n: 4, title: 'Produce trial balances', weighting: 25, tier: 'do',
        criteria: [
          { id: '4.1', title: 'Extract an initial trial balance' },
          { id: '4.2', title: 'Redraft the trial balance following adjustments' }
        ]
      }
    ],
    excluded: []
  };

  /* ── Principles of Costing ───────────────────────────────────────────────── */
  var POC = {
    unit: 'poc',
    code: 'POC',
    title: 'Principles of Costing',
    unitReference: 'M/618/3585',
    glh: 50,
    qualificationWeighting: 20,
    assessment: { method: 'Computer based assessment', marking: 'Computer marked', durationMinutes: 90 },
    outcomes: [
      {
        n: 1, title: 'Understand the cost recording system within an organisation', weighting: 30, tier: 'understand',
        criteria: [
          { id: '1.1', title: 'Collection and classification of costs in different types of organisations' },
          { id: '1.2', title: 'Costing techniques used in organisations' },
          { id: '1.3', title: 'Relationships between costing and financial accounting systems within an organisation' },
          { id: '1.4', title: 'Sources of information on income and expenditure' },
          { id: '1.5', title: 'Differences between cost, profit and investment centres' },
          { id: '1.6', title: 'Classification and recording of labour and overheads' }
        ]
      },
      {
        n: 2, title: 'Use cost recording techniques', weighting: 40, tier: 'do',
        criteria: [
          { id: '2.1', title: 'Calculate cost of inventory issues and inventory valuations' },
          { id: '2.2', title: 'Calculate labour payments' },
          { id: '2.3', title: 'Calculate overhead absorption rates' },
          { id: '2.4', title: 'Use cost behaviour to calculate total and unit costs' },
          { id: '2.5', title: 'Calculate the costs of a product' }
        ]
      },
      {
        n: 3, title: 'Provide information on actual and budgeted costs and income', weighting: 20, tier: 'do',
        criteria: [
          { id: '3.1', title: 'Actual and budgeted costs and income' },
          { id: '3.2', title: 'Exception reporting to identify significant variances' }
        ]
      },
      {
        n: 4, title: 'Use tools and techniques to support cost calculations', weighting: 10, tier: 'do',
        criteria: [
          { id: '4.1', title: 'Enter and format data' },
          { id: '4.2', title: 'Use formulas to support cost calculations' }
        ]
      }
    ],
    /* The specification places apportionment, reapportionment and absorption of
       overheads at later units; this one only prepares the ground for them, and
       budgetary control here uses a single product and a fixed budget. */
    excluded: [
      'Overhead apportionment and reapportionment, which the specification places in later units.',
      'Flexed budgets — budgetary control at this level uses a fixed budget for a single product.'
    ]
  };

  /* ── The Business Environment ────────────────────────────────────────────── */
  var BESY = {
    unit: 'besy',
    code: 'BESY',
    title: 'The Business Environment',
    unitReference: 'M/618/3586',
    glh: 90,
    qualificationWeighting: 30,
    /* The one assessment in this qualification that is not wholly computer
       marked, and the only one that is synoptic — it draws on all four units
       rather than on this one alone. */
    assessment: {
      method: 'Synoptic assessment',
      marking: 'Partially computer / partially human marked',
      durationMinutes: 120,
      synoptic: true
    },
    outcomes: [
      {
        n: 1, title: 'Understand the principles of contract law', tier: 'understand',
        criteria: [
          { id: '1.1', title: 'The different classifications of law' },
          { id: '1.2', title: 'The main sources of law' },
          { id: '1.3', title: 'Key features of contracts' },
          { id: '1.4', title: 'Remedies available for breach of contract' }
        ]
      },
      {
        n: 2, title: 'Understand the external business environment', tier: 'understand',
        criteria: [
          { id: '2.1', title: 'The economic environment' },
          { id: '2.2', title: 'Government control of the economy' },
          { id: '2.3', title: 'The competitive environment' }
        ]
      },
      {
        n: 3, title: 'Understand key principles of corporate social responsibility (CSR), ethics and sustainability', tier: 'understand',
        criteria: [
          { id: '3.1', title: 'Corporate social responsibilities of a business' },
          { id: '3.2', title: 'Sustainability and the environment' },
          { id: '3.3', title: 'The fundamental principles of ethics for accounting technicians' },
          { id: '3.4', title: 'The need to act ethically' }
        ]
      },
      {
        n: 4, title: 'Understand the impact of setting up different types of business entity', tier: 'understand',
        criteria: [
          { id: '4.1', title: 'Models of business ownership' },
          { id: '4.2', title: 'The legal administration of a business' },
          { id: '4.3', title: 'Business formation' }
        ]
      },
      {
        n: 5, title: 'Understand the finance function within an organisation', tier: 'understand',
        criteria: [
          { id: '5.1', title: 'The different functions of a business' },
          { id: '5.2', title: 'The role of the finance function' },
          { id: '5.3', title: 'How the finance team contributes to the success of an organisation' }
        ]
      },
      {
        n: 6, title: 'Produce work in appropriate formats and communicate effectively', tier: 'do',
        criteria: [
          { id: '6.1', title: 'Sources of information' },
          { id: '6.2', title: 'Communicate information' },
          { id: '6.3', title: 'Plan workload to meet the needs of the organisation' }
        ]
      },
      {
        n: 7, title: 'Understand the importance of information to business operations', tier: 'understand',
        criteria: [
          { id: '7.1', title: 'The role of information in the work of the finance function' },
          { id: '7.2', title: 'The importance of data and information security' }
        ]
      }
    ],
    excluded: []
  };

  /* The synoptic assessment's eight objectives, with the outcomes each draws on
     and its published weighting. These are what the blueprint mock is built to
     mirror, so they are data rather than prose: a task-weighting drift is then a
     failing check rather than an unnoticed change.

     Note that these weightings are of the SYNOPTIC ASSESSMENT, not of the
     qualification — the synoptic itself is 30% of the grade. */
  var SYNOPTIC_OBJECTIVES = [
    { n: 1, weighting: 10, title: 'Demonstrate an understanding of the different business types and their functions',
      draws: ['BESY-4', 'BESY-5'] },
    { n: 2, weighting: 13, title: 'Demonstrate an understanding of the finance function, its information requirements and sources, and its role in the wider organisation',
      draws: ['BESY-5', 'BESY-6', 'BESY-7'] },
    { n: 3, weighting: 14, title: 'Demonstrate an understanding of corporate social responsibility (CSR), ethics and sustainability',
      draws: ['BESY-3'] },
    { n: 4, weighting: 22, title: 'Process bookkeeping transactions and communicate information',
      draws: ['ITBK-1', 'ITBK-2', 'ITBK-3', 'BESY-6'] },
    { n: 5, weighting: 10, title: 'Produce and reconcile control accounts, and use journals to correct errors',
      draws: ['POBC-1', 'POBC-3'] },
    { n: 6, weighting: 7, title: 'Demonstrate an understanding of the principles of contract law',
      draws: ['BESY-1'] },
    { n: 7, weighting: 10, title: 'Demonstrate an understanding of bookkeeping systems, receipts and payments, and the importance of information and data security',
      draws: ['BESY-7', 'ITBK-1', 'ITBK-2', 'ITBK-3', 'POBC-1', 'POBC-2', 'POBC-3'] },
    { n: 8, weighting: 14, title: 'Demonstrate an understanding of the global business environment',
      draws: ['BESY-2'] }
  ];

  var SYLLABUS = {
    qualification: 'AAT Level 2 Certificate in Accounting (Q2022)',
    qualificationNumber: '603/6338/1',
    specVersion: '5.4',
    specPublished: '2025-05-01',
    glh: 255,
    tqt: 420,
    /* Weighted unit percentages combine to the qualification grade; failing any
       single assessment makes the whole qualification unclassified. */
    grading: { distinction: 90, merit: 80, pass: 70 },
    units: { itbk: ITBK, pobc: POBC, poc: POC, besy: BESY },
    synopticObjectives: SYNOPTIC_OBJECTIVES
  };

  /* ── Helpers used by the checkers and by the app ─────────────────────────── */
  function criteria(unitKey) {
    var u = SYLLABUS.units[unitKey];
    if (!u) return [];
    var out = [];
    u.outcomes.forEach(function (o) {
      o.criteria.forEach(function (c) {
        out.push({
          tag: u.code + '-' + c.id,
          id: c.id, title: c.title,
          tier: c.tier || o.tier,
          outcome: o.n, outcomeTitle: o.title, outcomeWeighting: o.weighting || null,
          unit: u.code, unitTitle: u.title
        });
      });
    });
    return out;
  }

  function allCriteria() {
    return Object.keys(SYLLABUS.units).reduce(function (acc, k) {
      return acc.concat(criteria(k));
    }, []);
  }

  function unitSummary(unitKey) {
    var u = SYLLABUS.units[unitKey];
    if (!u) return null;
    var cs = criteria(unitKey);
    return {
      code: u.code, title: u.title, glh: u.glh,
      qualificationWeighting: u.qualificationWeighting,
      outcomes: u.outcomes.length,
      criteria: cs.length,
      doCriteria: cs.filter(function (c) { return c.tier === 'do'; }).length,
      exclusions: u.excluded.length
    };
  }

  var API = {
    SYLLABUS: SYLLABUS,
    criteria: criteria,
    allCriteria: allCriteria,
    unitSummary: unitSummary
  };

  if (typeof module === 'object' && module.exports) module.exports = API;
  else { root.AAT2_SYLLABUS = SYLLABUS; root.AAT2_SYLLABUS_API = API; }
}(typeof self !== 'undefined' ? self : this));
