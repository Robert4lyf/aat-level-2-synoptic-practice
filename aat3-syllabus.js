/* AAT Level 3 syllabus — machine-readable spine.
 *
 * Source: AAT Level 3 Diploma in Accounting (Q2022) Qualification Specification,
 * QN 603/6337/X, version 5.11, published 16 March 2026.
 *
 * WHY THIS FILE EXISTS
 *
 * "Follows the AAT syllabus closely" is otherwise an unverifiable claim. With
 * the syllabus encoded, scripts/check-aat3-coverage.js can fail the build when
 * a module ships without covering every item it declares — and the app can show
 * a student exactly which parts of the specification they have studied.
 *
 * STRUCTURE — four levels, as the specification defines them
 *
 *   outcome (1)  →  topic area (1.1)  →  key concept (1.1.1)  →  indicative content
 *
 * The specification is explicit that "the indicative content will need to be
 * covered in a programme of learning", so a coverage check against key concepts
 * alone is not enough; `indicative` is where the actual teaching load lives.
 *
 * `tier` records the specification's own verb framing:
 *   'know'  — "learners need to know"
 *   'understand' — "learners need to understand"
 *   'do'    — "learners need to be able to" / "learners will be able to"
 * A 'do' concept costs several times more to teach than a 'know' one, so lesson
 * sizing is driven off this rather than off raw counts.
 *
 * `excluded` records what the specification explicitly says is NOT assessed.
 * These are first-class data because they are the cheapest savings available and
 * the easiest thing for an over-thorough author to teach unnecessarily.
 *
 * VERSIONING — read this before regenerating
 *
 * The outcome and topic-area structure has been stable across eleven revisions,
 * but KEY CONCEPT IDENTIFIERS ARE NOT STABLE IN THIS UNIT. Between v4.5 and
 * v5.11 roughly a quarter of TPFB's identifiers moved: some renumbered, some
 * deleted, at least one narrowed in scope while keeping its number. A Finance
 * Act roll therefore invalidates tags, not just figures. Hence `specVersion`
 * and `financeAct` below, and hence the coverage checker reports tags that
 * match nothing as well as concepts that no lesson covers.
 *
 * This is a personal, non-commercial study tool. AAT permits reproduction of
 * this material for personal and educational use.
 */
(function (root) {
  'use strict';

  var TPFB = {
    unit: 'tpfb',
    code: 'TPFB',
    title: 'Tax Processes for Businesses',
    financeAct: 'FA2025',
    /* "This unit is based on the Finance Act 2025 subject to assessment from
       26 January 2026." — specification, TPFB unit introduction. */
    assessableFrom: '2026-01-26',
    glh: 60,
    /* Contribution of this unit's assessment to the qualification grade. */
    qualificationWeighting: 15,
    assessment: {
      method: 'Computer based assessment',
      marking: 'Computer marked',
      durationMinutes: 90,
      passMark: 70,
      /* The qualification specification states no task count for this unit, and
         AAT publishes a Sample Assessment for Business Awareness only. The
         figures below come from a published Q2022 mock rather than from AAT, so
         they are labelled indicative and must not be presented as official —
         see docs/aat-level-3-plan.md §10 and TAX.ASSESSMENT_SHAPE. Replace them
         if a per-unit practice assessment is ever obtained. */
      taskCount: 8,
      taskCountSource: 'indicative — published mock, not an AAT publication',
      totalMarks: 80
    },
    /* Applies to the whole unit. */
    excluded: [
      'The rules relating to Northern Ireland are not assessed in this unit.'
    ],
    outcomes: [
      {
        n: 1,
        title: 'Understand legislation requirements relating to VAT',
        weighting: 25,
        topics: [
          {
            id: '1.1',
            title: 'UK tax law principles relating to VAT',
            concepts: [
              { id: '1.1.1', tier: 'understand', text: 'HMRC is the relevant tax authority for VAT in the UK' },
              { id: '1.1.2', tier: 'understand', text: 'VAT is a tax on consumer spending, charged on taxable supplies by taxable persons, including whether the charge falls on registered businesses or the end user' },
              { id: '1.1.3', tier: 'understand', text: 'The definitions of the categories of supply',
                indicative: ['taxable supplies', 'standard-rated supplies', 'reduced-rated supplies', 'zero-rated supplies', 'exempt supplies', 'supplies outside the scope of VAT'] },
              { id: '1.1.4', tier: 'understand', text: 'HMRC rules on VAT records',
                indicative: ['what records should be kept', 'how long VAT records should be retained', 'how VAT records should be retained', 'penalties for failure to keep VAT records'] },
              { id: '1.1.5', tier: 'understand', text: 'HMRC rights of inspection of records and visits to registered businesses' }
            ]
          },
          {
            id: '1.2',
            title: 'VAT registration and deregistration requirements',
            concepts: [
              { id: '1.2.1', tier: 'understand', text: 'The registration and deregistration thresholds for the normal VAT scheme, and how to apply them' },
              { id: '1.2.2', tier: 'understand', text: 'The historic turnover method (historic test) and the future turnover method (future test), and how to comply with them for registration' },
              { id: '1.2.3', tier: 'understand', text: 'The circumstances for voluntary registration and for deregistration',
                indicative: ['when voluntary registration may benefit a business', 'circumstances for voluntary and compulsory deregistration'] }
            ]
          },
          {
            id: '1.3',
            title: 'Filing and payment of VAT returns',
            concepts: [
              { id: '1.3.1', tier: 'understand', text: 'The timing and frequency of filing and of payment or repayment under the normal scheme',
                indicative: ['filing VAT returns under the normal scheme', 'payment/repayment of VAT under the normal scheme'] },
              { id: '1.3.2', tier: 'understand', text: 'When monthly accounting may benefit a business' },
              { id: '1.3.3', tier: 'understand', text: 'How statutory time limits for payment differ depending on the payment method used' },
              { id: '1.3.4', tier: 'understand', text: 'That compatible software must be used and authorised for submitting VAT returns under Making Tax Digital (MTD)' }
            ]
          },
          {
            id: '1.4',
            title: 'Special schemes',
            concepts: [
              { id: '1.4.1', tier: 'understand', text: 'The thresholds, qualification criteria and operation of the special VAT schemes',
                indicative: ['annual accounting scheme', 'cash accounting scheme', 'flat rate scheme'] },
              { id: '1.4.2', tier: 'understand', text: 'The timing and frequency of filing and of payment or repayment under the special schemes',
                indicative: ['filing VAT returns', 'payment/repayment of VAT'] },
              { id: '1.4.3', tier: 'understand', text: 'The circumstances for voluntary and compulsory withdrawal from special schemes' }
            ]
          },
          {
            id: '1.5',
            title: 'Implications for non-compliance with VAT regulations',
            concepts: [
              { id: '1.5.1', tier: 'understand', text: 'HMRC powers to penalise a business that has failed to register for VAT' },
              { id: '1.5.2', tier: 'understand', text: 'The penalty regime applicable to non-registration or late registration' },
              { id: '1.5.3', tier: 'understand', text: 'How the penalty regime applies to late submission or non-submission of VAT returns',
                excluded: ['changes in filing frequency'] },
              { id: '1.5.4', tier: 'understand', text: 'HMRC powers of assessment where VAT returns are not submitted' },
              { id: '1.5.5', tier: 'understand', text: 'The penalty and interest regime applicable to late or non-payment of VAT due' },
              { id: '1.5.6', tier: 'understand', text: 'The consequences of failing to correct errors properly, or to report an error when required to do so' },
              { id: '1.5.7', tier: 'understand', text: 'The operational and legal consequences of incorrect recovery of VAT' }
            ]
          }
        ]
      },
      {
        n: 2,
        title: 'Calculate VAT',
        weighting: 30,
        topics: [
          {
            id: '2.1',
            title: 'Extracting relevant data from accounting records',
            concepts: [
              { id: '2.1.1', tier: 'understand', text: 'Relevant sources of VAT information' },
              { id: '2.1.2', tier: 'understand', text: 'How to identify the accounting records covering the period of each VAT return' },
              { id: '2.1.3', tier: 'understand', text: 'How to identify and extract relevant revenue, expenditure and VAT figures from the accounting records' },
              { id: '2.1.4', tier: 'understand', text: 'How to validate data and confirm figures come from original, verified source documents' },
              { id: '2.1.5', tier: 'understand', text: 'The benefits of accounting software in identifying errors, for example an incorrect VAT rate' }
            ]
          },
          {
            id: '2.2',
            title: 'VAT invoices',
            concepts: [
              { id: '2.2.1', tier: 'understand', text: 'The contents and form of a VAT invoice',
                indicative: ['simplified VAT invoices', 'modified VAT invoices', 'e-invoicing requirements', 'mixed-rated supplies'] },
              { id: '2.2.2', tier: 'understand', text: 'How to determine the tax point of an invoice, both basic and actual',
                indicative: ['advance payments', 'deposits', 'continuous supplies', 'goods on sale or return'] },
              { id: '2.2.3', tier: 'understand', text: 'The significance of the correct tax point',
                indicative: ['eligibility for special VAT schemes', 'applying the correct rate of VAT', 'determining the correct VAT period'] },
              { id: '2.2.4', tier: 'understand', text: 'The time limits for issuing VAT invoices',
                indicative: ['14-day rules', '30-day rules'] },
              { id: '2.2.5', tier: 'understand', text: 'The rules relating to electronic invoicing' }
            ]
          },
          {
            id: '2.3',
            title: 'VAT calculations',
            concepts: [
              { id: '2.3.1', tier: 'understand', text: 'The difference between inputs and outputs, and between input tax and output tax' },
              { id: '2.3.2', tier: 'understand', text: 'The automation of calculations through use of accounting software' },
              { id: '2.3.3', tier: 'understand', text: 'Rounding rules on VAT calculations' },
              { id: '2.3.4', tier: 'understand', text: 'Rules for VAT when prompt payment discounts (PPD) are offered to customers' },
              { id: '2.3.5', tier: 'understand', text: 'The different implications of exempt supplies and of zero-rated supplies, and the effect on recovery of input tax' },
              { id: '2.3.6', tier: 'understand', text: 'How partial exemption works, the de-minimis limit, and how this affects recovery of input tax' },
              { id: '2.3.7', tier: 'understand', text: 'What cannot be claimed as input tax',
                indicative: ['employee and business contact entertaining, including mixed groups', 'purchases and sales of cars and vans', 'assets with private use'] },
              { id: '2.3.8', tier: 'understand', text: 'The VAT rules on fuel scale charges, how to apply them, and their effect on VAT payable or reclaimable' },
              { id: '2.3.9', tier: 'understand', text: 'How to apply VAT bad debt relief, when it is available and what time limits apply' },
              { id: '2.3.10', tier: 'understand', text: 'How to account for postponed import VAT' },
              { id: '2.3.11', tier: 'do', text: 'Calculate VAT on standard-rated and reduced-rated supplies',
                indicative: ['standard-rated supplies', 'reduced-rated supplies'] },
              { id: '2.3.12', tier: 'do', text: 'Calculate VAT when given either the net or the gross amount of the supply' },
              { id: '2.3.13', tier: 'do', text: 'Calculate the VAT payable or repayable for a VAT period',
                indicative: ['sales and purchases invoices', 'credit notes issued and received', 'cash and petty cash transaction receipts', 'deposits, advance payments and delayed payments', 'adjustments for fuel scale charges', 'adjustments for bad debts', 'adjustments for input tax that cannot be claimed'] },
              { id: '2.3.14', tier: 'do', text: 'Calculate the impact on VAT of adjustments',
                indicative: ['prompt payment discounts', 'fuel scale charges', 'bad debts', 'items on which input tax cannot be reclaimed'] },
              { id: '2.3.15', tier: 'do', text: 'Calculate VAT for international trade',
                indicative: ['imports', 'exports'] }
            ]
          }
        ]
      },
      {
        n: 3,
        title: 'Review and verify VAT returns',
        weighting: 20,
        topics: [
          {
            id: '3.1',
            title: 'Make adjustments for errors or omissions in VAT returns',
            concepts: [
              { id: '3.1.1', tier: 'understand', text: 'Whether previous period errors or omissions can be corrected by amendment on the current VAT return' },
              { id: '3.1.2', tier: 'understand', text: 'The thresholds and deadlines where previous period errors or omissions must be declared, including the timescales within which corrections can be made' },
              { id: '3.1.3', tier: 'understand', text: 'When previous period errors or omissions must be separately reported rather than corrected on the current return' },
              { id: '3.1.4', tier: 'understand', text: 'When to report previous period errors or omissions that cannot be corrected on the current return' },
              { id: '3.1.5', tier: 'do', text: 'Calculate and process the appropriate adjustments for given previous errors' },
              { id: '3.1.6', tier: 'do', text: 'Recognise the impact that adjustments for previous errors will have on VAT' }
            ]
          },
          {
            id: '3.2',
            title: 'Verify information contained within VAT returns',
            concepts: [
              { id: '3.2.1', tier: 'understand', text: 'What is included in the relevant boxes of the VAT return',
                excluded: ['Box 2', 'Box 8', 'Box 9'] },
              { id: '3.2.2', tier: 'understand', text: 'How imports and exports are treated on a VAT return' },
              { id: '3.2.3', tier: 'understand', text: 'The importance of checking the VAT return before submission' },
              { id: '3.2.4', tier: 'understand', text: 'How to identify reasons for differences between the VAT return and the accounting records' },
              { id: '3.2.5', tier: 'do', text: 'Review VAT returns from accounting information' },
              { id: '3.2.6', tier: 'do', text: 'Reconcile the VAT return to accounting records' }
            ]
          }
        ]
      },
      {
        n: 4,
        title: 'Understand principles of payroll',
        weighting: 15,
        topics: [
          {
            id: '4.1',
            title: 'Employer responsibilities of payroll',
            concepts: [
              { id: '4.1.1', tier: 'understand', text: 'That payroll is operated by businesses or individuals who employ staff' },
              { id: '4.1.2', tier: 'understand', text: 'That HMRC is the relevant tax authority for payroll' },
              { id: '4.1.3', tier: 'understand', text: 'HMRC powers to require businesses to comply',
                indicative: ['regulations about registration', 'record keeping', 'submissions of returns', 'payment of amounts due'] },
              { id: '4.1.4', tier: 'understand', text: 'HMRC rights in respect of inspection of records and visits' },
              { id: '4.1.5', tier: 'understand', text: 'HMRC rules about payroll records',
                indicative: ['what records should be kept', 'software', 'how payroll records should be retained', 'how long payroll records should be retained'] },
              { id: '4.1.6', tier: 'understand', text: 'The difference between gross pay, taxable pay, taxable gross pay and net pay' },
              { id: '4.1.7', tier: 'understand', text: 'That businesses are required to make statutory deductions from gross pay',
                indicative: ['Pay As You Earn (PAYE)', 'National Insurance contributions', 'student loan repayments', 'pension contributions'] },
              { id: '4.1.8', tier: 'understand', text: 'That businesses may be required to make non-statutory deductions from gross pay' },
              { id: '4.1.9', tier: 'understand', text: 'When businesses or individuals are required to register as an employer' },
              { id: '4.1.10', tier: 'understand', text: 'The data protection principles specifically related to the personal data of employees' },
              { id: '4.1.11', tier: 'do', text: 'Calculate gross pay, taxable gross pay, deductions, net pay and the amount due to HMRC',
                indicative: ['gross pay', 'taxable gross pay', 'deductions from the pay of employees', 'net pay', 'the amount due to HMRC'],
                note: 'Students will be provided with figures from which to calculate these values.' },
              { id: '4.1.12', tier: 'do', text: 'Reconcile gross pay to net pay and/or to taxable gross pay',
                excluded: ['the calculation of Income Tax', 'the calculation of National Insurance contributions', 'the calculation of student loan repayments'] }
            ]
          },
          {
            id: '4.2',
            title: 'Operating payroll',
            concepts: [
              { id: '4.2.1', tier: 'understand', text: 'The outline content of forms produced for payroll',
                indicative: ['starter checklist', 'payslips', 'P45s', 'P60s', 'P11Ds', 'P11Dbs'] },
              { id: '4.2.2', tier: 'understand', text: 'That employers must produce and distribute forms to employees within the required time period' },
              { id: '4.2.3', tier: 'understand', text: 'The difference between reporting expenses and benefits on form P11D and payrolling benefits and expenses' },
              { id: '4.2.4', tier: 'understand', text: 'That payroll reports must be submitted to HMRC using Real Time Information (RTI)' },
              { id: '4.2.5', tier: 'understand', text: 'The content of the Full Payment Submission (FPS) and the Employer Payment Summary (EPS)' },
              { id: '4.2.6', tier: 'understand', text: 'That employers must report employee payments and employee changes within the required timescale' },
              { id: '4.2.7', tier: 'understand', text: 'The statutory time limits for submitting payroll returns and making payment to HMRC' },
              { id: '4.2.8', tier: 'understand', text: 'The consequences of late payroll returns and/or payment' }
            ]
          }
        ]
      },
      {
        n: 5,
        title: 'Report information within the organisation',
        weighting: 10,
        topics: [
          {
            id: '5.1',
            title: 'Communicating information on VAT and payroll related matters',
            concepts: [
              { id: '5.1.1', tier: 'understand', text: 'Who to report relevant information to' },
              { id: '5.1.2', tier: 'understand', text: 'When a query is beyond current experience or expertise and should be referred to a line manager' },
              { id: '5.1.3', tier: 'understand', text: 'The significant effect on cash flows and cash budgeting of the requirement to pay HMRC on time' },
              { id: '5.1.4', tier: 'do', text: 'Communicate the appropriate time limits for submitting returns and making payments to appropriate persons' },
              { id: '5.1.5', tier: 'do', text: 'Communicate the effects of new legislation to the appropriate person' },
              { id: '5.1.6', tier: 'do', text: 'Provide appropriate information for VAT',
                indicative: ['completion of the VAT return', 'discovery of current and previous period errors and omissions', 'determining whether to correct or disclose errors and omissions', 'penalties and assessments', 'the effects of a change in VAT rate or other regulatory changes', 'the effect on VAT of a change in business operations', 'effects of adopting special VAT schemes on payment or recovery of VAT'] },
              { id: '5.1.7', tier: 'do', text: 'Provide appropriate information for payroll',
                indicative: ['completion of payroll reports', 'penalties', 'the effects of regulatory changes'] }
            ]
          },
          {
            id: '5.2',
            title: 'Legislation, regulation, guidance and codes of practice',
            concepts: [
              { id: '5.2.1', tier: 'understand', text: 'Where to find information regarding changes to VAT and payroll law and practice' },
              { id: '5.2.2', tier: 'understand', text: 'The importance of seeking authorisation before returns are submitted' },
              { id: '5.2.3', tier: 'understand', text: 'The relevance of data protection, information security and confidentiality to VAT and payroll practice' },
              { id: '5.2.4', tier: 'understand', text: 'The importance of maintaining up to date and relevant knowledge' },
              { id: '5.2.5', tier: 'understand', text: 'The importance of ethical behaviour in relation to VAT and payroll' },
              { id: '5.2.6', tier: 'understand', text: 'The importance of updating accounting software for changes to VAT and payroll legislation' },
              { id: '5.2.7', tier: 'understand', text: 'The importance of acting in good faith and exercising care over facts or information presented on behalf of clients or employers when dealing with HMRC, in line with the AAT Code of Professional Ethics' }
            ]
          }
        ]
      }
    ]
  };

  /* ── Financial Accounting: Preparing Financial Statements ────────────────
   *
   * The largest unit in the qualification by every measure that matters: 150
   * guided learning hours against TPFB's 60, 40% of the grade against 15%, and
   * 122 key concepts across nine outcomes against 93 across five.
   *
   * It is also the stable one. TPFB carries a Finance Act and its key concept
   * identifiers moved between spec versions; FAPS is built on IAS 2 and IAS 16
   * and on double entry, none of which is rolled annually. So this unit has no
   * `financeAct`, and the coverage checker's finance-act requirement is scoped
   * to the unit that needs it rather than applied to every unit by default.
   */
  var FAPS = {
    unit: 'faps',
    code: 'FAPS',
    title: 'Financial Accounting: Preparing Financial Statements',
    unitReference: 'R/618/3580',
    glh: 150,
    /* Contribution of this unit's assessment to the qualification grade. The
       largest single share available at Level 3 — more than BUAW and TPFB
       combined. */
    qualificationWeighting: 40,
    assessment: {
      method: 'Computer based assessment',
      marking: 'Computer marked',
      durationMinutes: 150,
      passMark: 70,
      /* Unlike TPFB, no task count is claimed here. The specification states
         none, AAT publishes no sample assessment for this unit (see
         docs/aat-level-3-plan.md §3.9), and no published mock has been
         obtained. An indicative figure invented to fill the gap would be
         presented to a student as fact, so the field is absent instead. */
      taskCount: null,
      taskCountSource: 'not stated by AAT and not obtained — deliberately absent',
      totalMarks: null
    },
    excluded: [],
    outcomes: [
      {
        n: 1,
        title: 'Understand the accounting principles underlying final accounts preparation',
        weighting: 5,
        topics: [
          {
            id: '1.1',
            title: 'The primary users of final accounts',
            concepts: [
              { id: '1.1.1', tier: 'know', text: 'The primary users of final accounts',
                indicative: ['existing and potential investors', 'lenders', 'other creditors'] },
              { id: '1.1.2', tier: 'know', text: 'How final accounts are used by the primary users' }
            ]
          },
          {
            id: '1.2',
            title: 'The framework of accounting underlying the preparation of final accounts',
            concepts: [
              { id: '1.2.1', tier: 'understand', text: 'The accounting principles',
                indicative: ['accruals', 'going concern', 'business entity', 'materiality', 'consistency', 'prudence', 'money measurement'] }
            ]
          },
          {
            id: '1.3',
            title: 'Qualities of useful financial information',
            concepts: [
              { id: '1.3.1', tier: 'know', text: 'The fundamental qualitative characteristics',
                indicative: ['relevance', 'faithful representation'],
                note: 'Version 5.11 of the specification prints the first of these as "relevance representation". Read against the IASB Conceptual Framework the two fundamental qualitative characteristics are relevance and faithful representation, so the stray word is a typesetting fault rather than a third characteristic. Encoded as the framework has it, and recorded here so the discrepancy is visible rather than silently corrected.' },
              { id: '1.3.2', tier: 'know', text: 'The enhancing qualitative characteristics',
                indicative: ['comparability', 'verifiability', 'timeliness', 'understandability'] },
              { id: '1.3.3', tier: 'know', text: 'The importance of ensuring financial statements are free from material misstatement' },
              { id: '1.3.4', tier: 'know', text: "The importance of the accountant's fundamental ethical principles and professional scepticism when preparing financial statements for users" }
            ]
          }
        ]
      },
      {
        n: 2,
        title: 'Understand the principles of advanced double-entry bookkeeping',
        weighting: 10,
        topics: [
          {
            id: '2.1',
            title: 'Use of the accounting equation',
            concepts: [
              { id: '2.1.1', tier: 'understand', text: 'The importance of the accounting equation for keeping accounting records' },
              { id: '2.1.2', tier: 'understand', text: 'The effect of accounting transactions on elements of the accounting equation',
                indicative: ['capital', 'assets', 'liabilities'] },
              { id: '2.1.3', tier: 'do', text: 'Calculate the different elements of the accounting equation',
                indicative: ['capital', 'assets', 'liabilities'] }
            ]
          },
          {
            id: '2.2',
            title: 'Classification of ledger accounts',
            concepts: [
              { id: '2.2.1', tier: 'know', text: 'The classification of general ledger accounts',
                indicative: ['assets: non-current (tangible, intangible) and current', 'liabilities: non-current and current', 'equity (capital)', 'income', 'expenses'] }
            ]
          },
          {
            id: '2.3',
            title: 'Purpose and use of books of prime entry and ledger accounting',
            concepts: [
              { id: '2.3.1', tier: 'understand', text: 'The daybooks (books of prime entry): sales, sales returns, purchases, purchases returns, discounts allowed, discounts received, cash book and journal (including narratives)' },
              { id: '2.3.2', tier: 'understand', text: 'The information recorded in each type of daybook' },
              { id: '2.3.3', tier: 'understand', text: 'How daybooks are used to update ledger account records, including dealing with value added tax (VAT)' },
              { id: '2.3.4', tier: 'understand', text: 'The different ledgers and how they interact: the general ledger and the memorandum (subsidiary) ledgers (receivables ledger and payables ledger)' },
              { id: '2.3.5', tier: 'understand', text: 'Control accounts',
                indicative: ['receivables ledger', 'payables ledger', 'wages and salaries', 'VAT'] },
              { id: '2.3.6', tier: 'understand', text: 'That accounting software automates the transfer of data into the control accounts' },
              { id: '2.3.7', tier: 'do', text: 'Prepare ledger accounts using double-entry principles' }
            ]
          },
          {
            id: '2.4',
            title: 'Carry out financial period end routines',
            concepts: [
              { id: '2.4.1', tier: 'understand', text: 'That at the end of the period accounts are balanced off differently depending on their classification in terms of income, expense, asset, liability or capital' },
              { id: '2.4.2', tier: 'understand', text: 'That accounting software automates the period end routine' },
              { id: '2.4.3', tier: 'do', text: 'Verify general ledger balances by using relevant sources of information and performing reconciliations where appropriate: physical checks, inventory records, supplier and bank statements, receivables and payables ledgers (memorandum ledger accounts), non-current asset register' },
              { id: '2.4.4', tier: 'do', text: 'Transfer balances or carry down balances on ledger accounts as appropriate' },
              { id: '2.4.5', tier: 'do', text: "Determine whether transactions are genuine and valid for inclusion in the organisation's records" }
            ]
          }
        ]
      },
      {
        n: 3,
        title: 'Implement procedures for the acquisition and disposal of non-current assets',
        weighting: 10,
        topics: [
          {
            id: '3.1',
            title: 'Importance of prior authority for capital expenditure',
            concepts: [
              { id: '3.1.1', tier: 'understand', text: 'Why authorisation is necessary' },
              { id: '3.1.2', tier: 'understand', text: 'The appropriate person in an organisation to give authority' }
            ]
          },
          {
            id: '3.2',
            title: 'The importance of classifying expenditure into capital or revenue expenditure',
            concepts: [
              { id: '3.2.1', tier: 'understand', text: 'That International Financial Reporting Standards (IFRS) exist that are relevant to non-current assets (NCA): IAS 16' },
              { id: '3.2.2', tier: 'understand', text: 'The definitions of cost, useful life, residual value, depreciable amount, carrying amount' },
              { id: '3.2.3', tier: 'understand', text: 'Which items can be included in the cost of NCA under the current IFRS (capital expenditure)' },
              { id: '3.2.4', tier: 'understand', text: 'That revenue expenditure should be excluded from the value of NCA' },
              { id: '3.2.5', tier: 'understand', text: "The importance of only capitalising expenditure in excess of the level specified in the organisation's policy" },
              { id: '3.2.6', tier: 'understand', text: 'The effect of capitalisation on the statement of profit or loss (SPL) and statement of financial position (SFP)' },
              { id: '3.2.7', tier: 'do', text: 'Categorise items into revenue and capital expenditure for the purposes of accounting for non-current assets' }
            ]
          },
          {
            id: '3.3',
            title: 'Record acquisitions and disposals of non-current assets',
            concepts: [
              { id: '3.3.1', tier: 'understand', text: 'The purpose and content of the non-current asset register, including assisting physical verification and reconciling with general ledger entries and balances' },
              { id: '3.3.2', tier: 'understand', text: 'The meaning of any balance on the disposals account' },
              { id: '3.3.3', tier: 'understand', text: 'That part-exchange is a different form of funding to cash or credit' },
              { id: '3.3.4', tier: 'understand', text: 'That non-current asset registers can be part of accounting software or held independently on spreadsheets' },
              { id: '3.3.5', tier: 'understand', text: 'How gains and losses on disposal are treated at the period end' },
              { id: '3.3.6', tier: 'do', text: 'Update the non-current asset register for acquisitions and disposals' },
              { id: '3.3.7', tier: 'do', text: 'Record acquisitions and disposals in the general ledger (including part-exchanges)' },
              { id: '3.3.8', tier: 'do', text: 'Treat VAT according to the registration status of the acquiring organisation',
                excluded: ['VAT treatment of part exchanges'] }
            ]
          }
        ]
      },
      {
        n: 4,
        title: 'Prepare and record depreciation calculations',
        weighting: 10,
        topics: [
          {
            id: '4.1',
            title: 'Calculate depreciation',
            concepts: [
              { id: '4.1.1', tier: 'understand', text: 'That accounting for depreciation is an application of the accruals principle of accounting' },
              { id: '4.1.2', tier: 'understand', text: 'That the depreciable amount of the NCA should be allocated over the relevant period of its useful life' },
              { id: '4.1.3', tier: 'understand', text: 'That depreciation can be calculated automatically by accounting software or independently through spreadsheets then journaled-in' },
              { id: '4.1.4', tier: 'do', text: 'Calculate the depreciation charge for an asset, using the straight-line method of depreciation, according to organisational policy',
                indicative: ['using either a given percentage or the useful life calculation method', 'dealing with cases when a residual value is expected or where no residual value is expected', 'depreciating for a full year or pro-rata for part of a year'] },
              { id: '4.1.5', tier: 'do', text: 'Calculate the depreciation charge for an asset, using the diminishing balance method of depreciation for a full year with a given percentage' }
            ]
          },
          {
            id: '4.2',
            title: 'Record depreciation',
            concepts: [
              { id: '4.2.1', tier: 'do', text: 'Record depreciation',
                indicative: ['non-current asset register', 'general ledger, including producing relevant journal entries'] },
              { id: '4.2.2', tier: 'do', text: 'Reconcile the NCA register to the appropriate general ledger balances' }
            ]
          }
        ]
      },
      {
        n: 5,
        title: 'Record period end adjustments',
        weighting: 10,
        topics: [
          {
            id: '5.1',
            title: 'Record accruals and prepayments of income and expenditure',
            concepts: [
              { id: '5.1.1', tier: 'understand', text: 'That adjustments for accruals and prepayments are an application of the accruals principle of accounting' },
              { id: '5.1.2', tier: 'understand', text: 'Why there can be a difference between the amount paid or received during the period and the amount recognised in the statement of profit or loss for that period' },
              { id: '5.1.3', tier: 'understand', text: 'How adjustments for accruals and prepayments for the current period and the reversal of adjustments for the previous period affect ledger accounts' },
              { id: '5.1.4', tier: 'understand', text: 'That accrued and prepaid income and expense balances are recognised as either assets or liabilities' },
              { id: '5.1.5', tier: 'understand', text: 'That accounting software automates recurring entries including for accruals and prepayments' },
              { id: '5.1.6', tier: 'do', text: 'Calculate the amount of a prepayment or accrual adjustment to be made' },
              { id: '5.1.7', tier: 'do', text: 'Account for accruals and prepayments by making entries in the general ledger, including using the journal' },
              { id: '5.1.8', tier: 'do', text: 'Account for the reversal of accruals and prepayments from a previous period by making entries in the general ledger, including using the journal' }
            ]
          },
          {
            id: '5.2',
            title: 'Record irrecoverable debts and allowances for doubtful receivables',
            concepts: [
              { id: '5.2.1', tier: 'understand', text: 'That allowances for doubtful receivables are an application of the accruals principle of accounting' },
              { id: '5.2.2', tier: 'understand', text: 'The differences between irrecoverable debts, allowances for specific doubtful receivables and general allowances for doubtful receivables' },
              { id: '5.2.3', tier: 'do', text: 'Account for the writing-off of an irrecoverable debt and for the recovery of an irrecoverable debt previously written off in the ledgers' },
              { id: '5.2.4', tier: 'do', text: 'Calculate new allowances for doubtful receivables and adjustments to existing allowances for doubtful receivables in accordance with organisational policy' },
              { id: '5.2.5', tier: 'do', text: 'Use the journal to record irrecoverable debts and adjustments to allowances for doubtful receivables' }
            ]
          },
          {
            id: '5.3',
            title: 'Record inventory',
            concepts: [
              { id: '5.3.1', tier: 'understand', text: 'That accounting for inventory is an application of the accruals basis of accounting' },
              { id: '5.3.2', tier: 'understand', text: 'The effect that changes in valuation of inventory have on profit/loss for a period' },
              { id: '5.3.3', tier: 'understand', text: 'That IFRS exist that are relevant to inventory valuation: IAS 2' },
              { id: '5.3.4', tier: 'understand', text: 'That inventory must be valued at the lower of cost and net realisable value (NRV) on an individual item basis' },
              { id: '5.3.5', tier: 'understand', text: 'Which types of expenditure can be included in the valuation of inventory' },
              { id: '5.3.6', tier: 'understand', text: 'That accounting software automates the process of recording, tracking and valuing inventory' },
              { id: '5.3.7', tier: 'do', text: 'Determine the closing inventory figure in accordance with current accounting standards' },
              { id: '5.3.8', tier: 'do', text: 'Make entries in the journal to record the value of closing inventory' }
            ]
          },
          {
            id: '5.4',
            title: 'Considerations for recording period end adjustments',
            concepts: [
              { id: '5.4.1', tier: 'understand', text: 'That when making period end adjustments',
                indicative: ['there is scope to significantly affect the reported results of the organisation', 'accounting software requires the user to enter dates accurately'] },
              { id: '5.4.2', tier: 'understand', text: 'The need to apply professional scepticism, integrity and objectivity to prevent misleading and inaccurate information' },
              { id: '5.4.3', tier: 'understand', text: 'The effects of including misleading or inaccurate period end adjustments (non-compliance with regulations, misinformed decision making by users of the final accounts)' },
              { id: '5.4.4', tier: 'understand', text: 'How to respond appropriately to period end pressures',
                indicative: ['time pressure', 'pressure to report favourable results', 'pressure from authority'] }
            ]
          }
        ]
      },
      {
        n: 6,
        title: 'Produce and extend the trial balance',
        weighting: 15,
        topics: [
          {
            id: '6.1',
            title: 'Prepare an initial trial balance',
            concepts: [
              { id: '6.1.1', tier: 'understand', text: 'That certain accounts can carry either a debit or a credit balance: VAT, disposals, bank, irrecoverable debts expense' },
              { id: '6.1.2', tier: 'understand', text: 'The importance of producing the trial balance to check for errors' },
              { id: '6.1.3', tier: 'understand', text: 'The limitations of the trial balance as a check for errors' },
              { id: '6.1.4', tier: 'understand', text: 'That accounting software completes the transfer of data into the trial balance' },
              { id: '6.1.5', tier: 'do', text: 'Transfer balances from ledger accounts, a list of balances or written data into the correct debit or credit columns of the initial trial balance' },
              { id: '6.1.6', tier: 'do', text: 'Correct errors that are not shown by the initial trial balance' },
              { id: '6.1.7', tier: 'do', text: 'Correct errors that are shown by the initial trial balance by the use and clearing of the suspense account' }
            ]
          },
          {
            id: '6.2',
            title: 'Prepare an adjusted trial balance',
            concepts: [
              { id: '6.2.1', tier: 'understand', text: 'That accounting software automatically recalculates balances after adjustments' },
              { id: '6.2.2', tier: 'do', text: 'Place adjustments correctly into the adjustments columns of the adjusted trial balance so that it balances',
                indicative: ['closing inventory', 'accruals of income or expenses', 'prepayments of income or expenses', 'corrections of errors', 'depreciation', 'irrecoverable debts', 'allowances for doubtful receivables', 'disposals of NCA including part-exchange'] }
            ]
          },
          {
            id: '6.3',
            title: 'Complete the extended trial balance (ETB)',
            concepts: [
              { id: '6.3.1', tier: 'understand', text: 'The importance of the fully extended trial balance for the preparation of financial statements' },
              { id: '6.3.2', tier: 'understand', text: 'The difference between entries in the ETB for sole traders and partnerships' },
              { id: '6.3.3', tier: 'do', text: 'Complete the SPL and SFP columns of the ETB, for sole traders, by extending figures',
                indicative: ['from the ledger balances and adjustments columns of the adjusted trial balance', 'to the relevant SPL and SFP columns'] },
              { id: '6.3.4', tier: 'do', text: 'Balance off the ETB, for sole traders, by calculating the profit/loss figure and entering it into the relevant SPL and SFP columns',
                excluded: ['completion of the ETB for partnerships'] }
            ]
          }
        ]
      },
      {
        n: 7,
        title: 'Produce financial statements for sole traders and partnerships',
        weighting: 20,
        topics: [
          {
            id: '7.1',
            title: 'Prepare financial statements for sole traders',
            concepts: [
              { id: '7.1.1', tier: 'understand', text: 'The purpose of SPLs' },
              { id: '7.1.2', tier: 'understand', text: 'The purpose of SFPs' },
              { id: '7.1.3', tier: 'understand', text: 'How the financial statements are linked to the accounting equation' },
              { id: '7.1.4', tier: 'understand', text: 'How the SPL and SFP are related' },
              { id: '7.1.5', tier: 'understand', text: 'Terminology',
                indicative: ['sales revenue = sales − sales returns', 'net purchases = purchases − purchases returns + carriage inwards', 'cost of sales = opening inventory + net purchases − closing inventory'] },
              { id: '7.1.6', tier: 'do', text: 'Prepare SPLs' },
              { id: '7.1.7', tier: 'do', text: 'Prepare SFPs using the net assets presentation' }
            ]
          },
          {
            id: '7.2',
            title: 'Opening and closing capital for sole traders',
            concepts: [
              { id: '7.2.1', tier: 'understand', text: 'The reasons for movements in the capital balance during a period' },
              { id: '7.2.2', tier: 'do', text: 'Account for drawings of cash, goods and services, capital injections and profits or losses during a period in order to complete the capital account' }
            ]
          },
          {
            id: '7.3',
            title: 'Produce the SPL for partnerships',
            concepts: [
              { id: '7.3.1', tier: 'understand', text: 'Why the difference between the SPL for a partnership and for a sole trader is the appropriation account' },
              { id: '7.3.2', tier: 'understand', text: 'The purpose and content of the partnership appropriation account' },
              { id: '7.3.3', tier: 'understand', text: 'How the SPL is linked to the partnership appropriation account' },
              { id: '7.3.4', tier: 'do', text: 'Prepare an appropriation account',
                indicative: ['interest on capital (calculation not required)', 'interest on drawings (calculation not required)', 'salaries or commission paid to partners'] },
              { id: '7.3.5', tier: 'do', text: "Calculate each partner's share of any residual profit/loss according to the profit-sharing ratio" },
              { id: '7.3.6', tier: 'do', text: "Prepare a partnership's SPL" }
            ]
          },
          {
            id: '7.4',
            title: 'Produce the SFP for partnerships',
            concepts: [
              { id: '7.4.1', tier: 'understand', text: "Why the difference between the SFP for a partnership and for a sole trader is the partners' capital and current accounts" },
              { id: '7.4.2', tier: 'understand', text: "The difference between the partners' current accounts and the appropriation account" },
              { id: '7.4.3', tier: 'understand', text: "The difference between the partners' current accounts and the partners' capital account" },
              { id: '7.4.4', tier: 'do', text: 'Account for drawings in the form of cash, goods or services' },
              { id: '7.4.5', tier: 'do', text: "Prepare partners' current accounts",
                indicative: ['interest on capital (calculation not required)', 'interest on drawings (calculation not required)', 'salaries or commission paid to partners', 'drawings'] },
              { id: '7.4.6', tier: 'do', text: "Prepare a partnership's SFP using the net assets presentation" }
            ]
          }
        ]
      },
      {
        n: 8,
        title: 'Interpret financial statements using profitability ratios',
        weighting: 10,
        topics: [
          {
            id: '8.1',
            title: 'Calculate profitability ratios',
            concepts: [
              { id: '8.1.1', tier: 'understand', text: 'The relationship between the SPL and SFP regarding net profit' },
              { id: '8.1.2', tier: 'understand', text: 'The link between gross profit margin and mark-up' },
              { id: '8.1.3', tier: 'understand', text: 'The meaning of profitability ratios' },
              { id: '8.1.4', tier: 'do', text: 'Calculate profitability ratios to assist with interpretation of the financial statements',
                indicative: [
                  'ROCE (return on capital employed) = profit for the year / capital employed × 100, where capital employed = capital + non-current liabilities',
                  'gross profit margin = gross profit / sales revenue × 100',
                  'net profit margin = profit for the year / sales revenue × 100',
                  'expense/sales revenue percentage (a specified expense, including cost of sales, as a % of sales revenue) = specified expense / sales revenue × 100'
                ] }
            ]
          },
          {
            id: '8.2',
            title: 'The interpretation of profitability ratios',
            concepts: [
              { id: '8.2.1', tier: 'understand', text: 'Why calculating ratios can aid planning, decision making and control for businesses' },
              { id: '8.2.2', tier: 'understand', text: "Factors that may cause changes in a business's ratios and differences between businesses' ratios" },
              { id: '8.2.3', tier: 'understand', text: 'Whether a ratio is better or worse than a comparative ratio',
                indicative: ['a different organisation', 'a different time period', 'an industry standard'] },
              { id: '8.2.4', tier: 'understand', text: 'The importance of professional scepticism to the interpretation of financial information' }
            ]
          }
        ]
      },
      {
        n: 9,
        title: 'Prepare accounting records from incomplete information',
        weighting: 10,
        topics: [
          {
            id: '9.1',
            title: 'Identify missing figures',
            concepts: [
              { id: '9.1.1', tier: 'do', text: 'Calculate missing figures relating to income, expenses, assets, liabilities and capital',
                indicative: [
                  'selecting relevant data',
                  'using daybooks',
                  'using the cash book',
                  'reconstructing ledger accounts: receivables and payables ledger control accounts, VAT control account and the bank account',
                  'calculating and labelling the missing figures of reconstructed accounts',
                  'calculating opening and closing balances',
                  'adjusting for VAT'
                ] }
            ]
          },
          {
            id: '9.2',
            title: 'Mark-up and margin',
            concepts: [
              { id: '9.2.1', tier: 'understand', text: 'The difference between margin and mark-up' },
              { id: '9.2.2', tier: 'do', text: 'Calculate margin and mark-up to determine missing figures' },
              { id: '9.2.3', tier: 'do', text: 'Use cost of sales calculations to determine missing figures' }
            ]
          },
          {
            id: '9.3',
            title: 'Reasonableness of figures when information is incomplete',
            concepts: [
              { id: '9.3.1', tier: 'understand', text: 'Whether a given figure is reasonable' },
              { id: '9.3.2', tier: 'understand', text: 'Why an actual balance and a calculated balance can be different' },
              { id: '9.3.3', tier: 'understand', text: 'The importance of checking information produced by accounting software for accuracy' },
              { id: '9.3.4', tier: 'understand', text: 'When and how to apply professional scepticism' }
            ]
          }
        ]
      }
    ]
  };

  var SYLLABUS = {
    qualification: 'AAT Level 3 Diploma in Accounting (Q2022)',
    qualificationNumber: '603/6337/X',
    specVersion: '5.11',
    specPublished: '2026-03-16',
    grading: { distinction: 90, merit: 80, pass: 70 },
    /* Weighted unit percentages combine to the qualification grade. Failing any
       single unit makes the whole qualification unclassified. A resit that
       scores lower does not displace an earlier higher result. */
    units: { faps: FAPS, tpfb: TPFB }
  };

  /* ── Helpers used by the coverage checker and by the app ─────────────────── */

  /* Every key concept in a unit, flattened, each carrying its parents. */
  function concepts(unitKey) {
    var u = SYLLABUS.units[unitKey];
    if (!u) return [];
    var out = [];
    u.outcomes.forEach(function (o) {
      o.topics.forEach(function (t) {
        t.concepts.forEach(function (c) {
          out.push({
            tag: u.code + '-' + c.id,
            id: c.id, text: c.text, tier: c.tier,
            indicative: c.indicative || [],
            excluded: c.excluded || [],
            note: c.note || null,
            topicId: t.id, topicTitle: t.title,
            outcome: o.n, outcomeTitle: o.title, outcomeWeighting: o.weighting
          });
        });
      });
    });
    return out;
  }

  /* Teaching-load estimate. A 'do' concept costs several times a 'know' one,
     and each indicative-content bullet is a thing that must actually appear. */
  function loadUnits(concept) {
    var base = concept.tier === 'do' ? 4 : 1;
    return base + (concept.indicative ? concept.indicative.length : 0);
  }

  function unitSummary(unitKey) {
    var u = SYLLABUS.units[unitKey];
    if (!u) return null;
    var cs = concepts(unitKey);
    return {
      code: u.code, title: u.title,
      outcomes: u.outcomes.length,
      topics: u.outcomes.reduce(function (s, o) { return s + o.topics.length; }, 0),
      concepts: cs.length,
      indicative: cs.reduce(function (s, c) { return s + c.indicative.length; }, 0),
      doConcepts: cs.filter(function (c) { return c.tier === 'do'; }).length,
      load: cs.reduce(function (s, c) { return s + loadUnits(c); }, 0),
      exclusions: cs.reduce(function (s, c) { return s + c.excluded.length; }, u.excluded.length)
    };
  }

  var API = {
    SYLLABUS: SYLLABUS,
    concepts: concepts,
    unitSummary: unitSummary,
    loadUnits: loadUnits
  };

  if (typeof module === 'object' && module.exports) module.exports = API;
  else { root.AAT3_SYLLABUS = SYLLABUS; root.AAT3_SYLLABUS_API = API; }
}(typeof self !== 'undefined' ? self : this));
