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

  /* ── MATS ────────────────────────────────────────────────────────────────
     Encoded from the specification text in docs/reference/, not from memory.
     That distinction earned itself: a first pass written from recall had four
     of the seven outcome weightings wrong (LO3 as 15 rather than 20, LO4 as 10
     rather than 15, LO6 as 20 rather than 15, LO7 as 15 rather than 10), which
     would have tilted every weighted draw and every mock in this unit.

     TWO THINGS ABOUT THIS UNIT ARE UNLIKE THE OTHER TWO.

     It is PARTIALLY HUMAN MARKED. FAPS and TPFB are computer marked
     throughout; MATS is not, and the human-marked part is most plausibly the
     spreadsheet output (see docs/aat-level-3-plan.md §3.8). Recorded as the
     specification states it rather than normalised to match its neighbours.

     LO5 IS SPREADSHEET SKILL, and this app has no spreadsheet. Designing a
     workbook, building a pivot table, formatting a chart axis — these are done
     with a mouse in Excel and cannot be assessed by a question bank. That is
     15% of the unit, 4.5% of the qualification. What is written here teaches
     and tests the KNOWLEDGE around those skills — which function does what,
     what absolute referencing is for, which audit tool answers which question —
     and the module says plainly that the hands-on part has to happen in a real
     spreadsheet. Pretending otherwise would be the more serious failure. */
  var MATS = {
    unit: 'mats',
    code: 'MATS',
    title: 'Management Accounting Techniques',
    unitReference: 'D/618/3582',
    glh: 120,
    /* Second only to FAPS, and double TPFB or BUAW. */
    qualificationWeighting: 30,
    assessment: {
      method: 'Computer based assessment',
      marking: 'Partially computer/partially human marked',
      durationMinutes: 150,
      passMark: 70,
      /* As with FAPS: the specification states no task count, and no published
         mock has been obtained. An invented figure would be shown to a student
         as fact. */
      taskCount: null,
      taskCountSource: 'not stated by AAT and not obtained — deliberately absent',
      totalMarks: null
    },
    excluded: [],
    outcomes: [
      {
        n: 1,
        title: 'Understand the purpose and use of management accounting within organisations',
        weighting: 10,
        topics: [
          {
            id: '1.1',
            title: 'Internal reporting calculations',
            concepts: [
              { id: '1.1.1', tier: 'know', text: 'The purpose of costing, budgeting and internal reporting' },
              { id: '1.1.2', tier: 'know', text: 'The importance of providing accurate information to management for the purposes of planning, control and decision-making' },
              { id: '1.1.3', tier: 'do', text: 'Calculate revenue, costs, contribution and reported profits for an organisation' },
              { id: '1.1.4', tier: 'do', text: 'Calculate segmented revenue, costs, contribution and reported profits by product' }
            ]
          },
          {
            id: '1.2',
            title: 'Differences between marginal and absorption costing',
            concepts: [
              { id: '1.2.1', tier: 'understand', text: 'The difference between product and period costs',
                indicative: ['some period costs are carried forward in the value of closing inventory under absorption costing',
                             'in marginal costing only variable costs are included in inventory and period costs are written off in full'] },
              { id: '1.2.2', tier: 'understand', text: 'The differences between costing techniques',
                indicative: ['marginal costing', 'absorption costing'] },
              { id: '1.2.3', tier: 'understand', text: 'The impact on reported performance of marginal versus full absorption costing in both the short run and the long run' },
              { id: '1.2.4', tier: 'understand', text: 'When each technique is appropriate' },
              { id: '1.2.5', tier: 'do', text: 'Calculate prime cost, marginal cost and full absorption cost',
                indicative: ['prime cost', 'marginal cost', 'full absorption cost'] }
            ]
          }
        ]
      },
      {
        n: 2,
        title: 'Use techniques required for dealing with costs',
        weighting: 15,
        topics: [
          {
            id: '2.1',
            title: 'Record and calculate materials, labour and overhead costs',
            concepts: [
              { id: '2.1.1', tier: 'do', text: 'Use appropriate data and information from both manual records and software packages',
                indicative: ['prepare and interpret inventory records for materials, work-in-progress and finished goods',
                             'calculate materials and labour costs',
                             'account for overheads',
                             'calculate cost per equivalent unit of finished production'] }
            ]
          },
          {
            id: '2.2',
            title: 'Prepare cost accounting journals',
            concepts: [
              { id: '2.2.1', tier: 'understand', text: 'Principles of cost accounting journal entries',
                indicative: ['direct materials or indirect materials', 'direct or indirect labour', 'overheads costs'] },
              { id: '2.2.2', tier: 'do', text: 'Prepare cost accounting journals',
                indicative: ['materials', 'labour', 'overheads'] }
            ]
          },
          {
            id: '2.3',
            title: 'Apply inventory control methods',
            concepts: [
              { id: '2.3.1', tier: 'do', text: 'Calculate inventory control and valuation measures',
                indicative: ['inventory buffers, lead times, minimum/maximum order quantities',
                             'economic order quantity (EOQ)',
                             'compliance with inventory control policies',
                             'the effect on reported profits of choice of method'],
                note: 'The specification prints the formulas and states twice that students will be PROVIDED with one side of each pair — either buffer inventory or re-order level, and either maximum inventory level or maximum re-order quantity. buffer inventory = re-order level − (average usage × average lead time); re-order level = (average usage × average lead time) + buffer inventory; maximum inventory level = buffer inventory + maximum re-order quantity; maximum re-order quantity = maximum inventory level − buffer inventory; minimum re-order quantity = average usage × average lead time; EOQ = √((2 × annual usage × ordering cost) ÷ inventory holding cost).' },
              { id: '2.3.2', tier: 'do', text: 'Account for inventories using first-in-first-out (FIFO) and average cost (AVCO) methods' },
              { id: '2.3.3', tier: 'do', text: 'Analyse closing inventory balances' }
            ]
          },
          {
            id: '2.4',
            title: 'Cost behaviours',
            concepts: [
              { id: '2.4.1', tier: 'understand', text: 'The implications of different cost behaviours for cost analysis, decision making and reporting',
                indicative: ['fixed', 'variable', 'semi-variable', 'stepped'] },
              { id: '2.4.2', tier: 'do', text: 'Use the high-low method to separate fixed and variable cost elements of semi-variable costs' }
            ]
          },
          {
            id: '2.5',
            title: 'Differences between costing systems',
            concepts: [
              { id: '2.5.1', tier: 'understand', text: 'The appropriate choice of costing system for different business sectors and individual organisations' },
              { id: '2.5.2', tier: 'understand', text: 'The effect of waste on costing inputs and outputs' },
              { id: '2.5.3', tier: 'do', text: 'Record cost information using different costing systems',
                indicative: ['job costing', 'batch costing', 'unit costing', 'service costing'] }
            ]
          }
        ]
      },
      {
        n: 3,
        title: 'Attribute costs according to organisational requirements',
        weighting: 20,
        topics: [
          {
            id: '3.1',
            title: 'Calculate and attribute overhead costs using traditional methods',
            concepts: [
              { id: '3.1.1', tier: 'know', text: 'Different methods of indirect cost recovery',
                indicative: ['apportionment', 'allocation'] },
              { id: '3.1.2', tier: 'do', text: 'Attribute overhead costs to production and service cost centres',
                indicative: ['apportionment versus allocation', 'direct method', 'step-down method'] }
            ]
          },
          {
            id: '3.2',
            title: 'Calculate overhead recovery rates using traditional methods',
            concepts: [
              { id: '3.2.1', tier: 'do', text: 'Calculate overhead recovery rates in accordance with suitable bases of absorption',
                indicative: ['for a manufacturer: machine hours or direct labour hours',
                             'for a service business: suitable basis for the specific business'] }
            ]
          },
          {
            id: '3.3',
            title: 'Calculate overhead recovery rates using activity-based costing',
            concepts: [
              { id: '3.3.1', tier: 'know', text: 'The concept of activity-based costing',
                indicative: ['appropriate cost drivers', 'use of cost pools'] },
              { id: '3.3.2', tier: 'do', text: 'Calculate overhead recovery rates using appropriate cost drivers' }
            ]
          },
          {
            id: '3.4',
            title: 'Under- or over-recovery of overheads',
            concepts: [
              { id: '3.4.1', tier: 'understand', text: 'How to account for under- or over-recovered overhead costs in accordance with established procedures',
                indicative: ['making under- or over-absorption calculations',
                             'interpreting the significance of under- or over-recoveries of overhead costs on unit costs and total profit'] }
            ]
          }
        ]
      },
      {
        n: 4,
        title: 'Investigate deviations from budgets',
        weighting: 15,
        topics: [
          {
            id: '4.1',
            title: 'Principles of standard prices/costs and budgeting',
            concepts: [
              { id: '4.1.1', tier: 'understand', text: "A product's standard price and standard cost" },
              { id: '4.1.2', tier: 'understand', text: 'How standard prices and costs can be used to develop budgets' },
              { id: '4.1.3', tier: 'understand', text: 'Different types of budget',
                indicative: ['fixed', 'flexed', 'rolling'] },
              { id: '4.1.4', tier: 'understand', text: 'How operating statements are used to compare budgeted volume and standard revenue/cost versus actual performance' },
              { id: '4.1.5', tier: 'do', text: 'Prepare budgets for multi-product organisations',
                indicative: ['revenue', 'materials', 'labour', 'variable overheads', 'fixed overheads', 'non-manufacturing overheads'] },
              { id: '4.1.6', tier: 'do', text: 'Flex fixed budgets for actual volume' }
            ]
          },
          {
            id: '4.2',
            title: 'Calculate variances',
            concepts: [
              { id: '4.2.1', tier: 'do', text: 'Recognise variances as being either favourable or adverse' },
              { id: '4.2.2', tier: 'do', text: 'Calculate variances using flexed budgets' },
              { id: '4.2.3', tier: 'do', text: 'Compare flexed budget versus actual costs and revenues to calculate the total variances',
                indicative: ['sales price variance (total)', 'raw material variance (total)', 'labour variance (total)',
                             'variable overhead variance (total)', 'fixed production variance (total)'],
                note: 'TOTAL variances only. The specification names five, each qualified "(total)", and never asks for the price/usage or rate/efficiency splits that Level 4 requires. Teaching the sub-variances here would be teaching above the unit.' }
            ]
          },
          {
            id: '4.3',
            title: 'Analyse and investigate variances',
            concepts: [
              { id: '4.3.1', tier: 'do', text: 'Determine the cause and effects of revenue and cost variances' },
              { id: '4.3.2', tier: 'do', text: 'Recognise significant variances for investigation' },
              { id: '4.3.3', tier: 'do', text: 'Report on remedial action to address adverse variances' }
            ]
          }
        ]
      },
      {
        n: 5,
        title: 'Use spreadsheet techniques to provide management accounting information',
        weighting: 15,
        topics: [
          {
            id: '5.1',
            title: 'Organise, record and format data',
            concepts: [
              { id: '5.1.1', tier: 'do', text: 'Organise data',
                indicative: ['design spreadsheets to support: flexing budgets; the calculation and analysis of variances; production of operating statements; overhead absorption and allocation; short-term decision making; cash budgeting'] },
              { id: '5.1.2', tier: 'do', text: 'Ensure data is valid and reliable',
                indicative: ['select data from different sources',
                             'enter data manually into appropriate cells and worksheets',
                             'link data from different sources within the same worksheet or across different worksheets: copying and pasting special values; linking',
                             'remove duplications in data'] },
              { id: '5.1.3', tier: 'do', text: 'Format data',
                indicative: ['formatting cells: advanced formatting, i.e. data manipulation, data security, data statistics; decimals, whole numbers, thousand separator, %; currency, accountancy, general, number; show adverse or negative figures with ( ) or −',
                             'produce, format and adjust charts and graphs: chart production in 3D, exploded, bar, column, pie and line; changing chart type',
                             'chart labelling: axis scale; titles; legend; data tables'] }
            ]
          },
          {
            id: '5.2',
            title: 'Use tools to manipulate, analyse and verify data',
            concepts: [
              { id: '5.2.1', tier: 'do', text: 'Use a range of formulas and functions to perform calculations',
                indicative: ['mathematical and logical functions using absolute and relative cell referencing: sum; average; minimum; maximum; round; roundup; rounddown; sumif; count; counta; countif; IF (simple and nested); VLOOKUP; HLOOKUP; days',
                             'statistical techniques: goal seek; forecast'] },
              { id: '5.2.2', tier: 'do', text: 'Use tools to support analysis of data',
                indicative: ['data sort/data filter using single and/or multiple criteria',
                             'conditional formatting (using function)',
                             'lookup tables: pivot tables; pivot charts',
                             'subtotals: average; sum; maximum; minimum',
                             'comments box: show; hide'] },
              { id: '5.2.3', tier: 'do', text: 'Edit and update data',
                indicative: ['include new data in a worksheet or chart',
                             'consider whether new data is included in any existing analysis or charts'] },
              { id: '5.2.4', tier: 'do', text: 'Verify accuracy of data by using formula auditing tools',
                indicative: ['trace precedents', 'trace dependents', 'show formulas'] }
            ]
          },
          {
            id: '5.3',
            title: 'Use tools to prepare, protect and present accounting information',
            concepts: [
              { id: '5.3.1', tier: 'do', text: 'Protect integrity of data',
                indicative: ['use data validation to restrict data entry and editing',
                             'protect individual and ranges of cells'] },
              { id: '5.3.2', tier: 'do', text: 'Enhance the visual presentation of data',
                indicative: ['insert and edit headers and footers', 'hide and unhide rows or columns',
                             'format columns and rows: font type, colour, size, bold, italics, alignment',
                             'freezing rows and columns', 'adjust margins, orientation and print area',
                             'use a range of charts to summarise and present information',
                             'chart alteration: moving, resizing, changing type, stacked, 3D, exploded',
                             'changing data series: chart colour and format, cell fill colour',
                             'format charts: scales, axes, labels, data series, data tables'] }
            ]
          }
        ]
      },
      {
        n: 6,
        title: 'Use management accounting techniques to support short-term decision making',
        weighting: 15,
        topics: [
          {
            id: '6.1',
            title: 'Estimate and use short-term future revenue and costs',
            concepts: [
              { id: '6.1.1', tier: 'understand', text: 'The concept of contribution, that is revenue minus variable costs' },
              { id: '6.1.2', tier: 'do', text: 'Use estimates of relevant future revenue and costs' },
              { id: '6.1.3', tier: 'do', text: 'Use cost-volume-profit (CVP) analysis, both by calculation and by linear break-even chart',
                indicative: ['break-even analysis', 'margin of safety and margin of safety percentage',
                             'target profit', 'profit-volume ratio'] },
              { id: '6.1.4', tier: 'do', text: 'Interpret and report on CVP analysis' }
            ]
          },
          {
            id: '6.2',
            title: 'Examine the effects of changing activity levels',
            concepts: [
              { id: '6.2.1', tier: 'understand', text: 'The effect of changing activity levels on unit revenue, costs and profits' },
              { id: '6.2.2', tier: 'do', text: 'Calculate changes in forecast unit revenue, costs and profits' }
            ]
          }
        ]
      },
      {
        n: 7,
        title: 'Understand principles of cash management',
        weighting: 10,
        topics: [
          {
            id: '7.1',
            title: 'Principles of cash budgeting',
            concepts: [
              { id: '7.1.1', tier: 'understand', text: 'The key differences between cash and profit' },
              { id: '7.1.2', tier: 'understand', text: 'Principles of forecasting cash receipts and payments',
                indicative: ['sales, purchases and production', 'the acquisition and disposal of non-current assets',
                             'accounts receivable and payable', 'capital and new loans, repayment of loans and drawings'] },
              { id: '7.1.3', tier: 'understand', text: 'The funding methods available for the acquisition of non-current assets',
                indicative: ['cash', 'part-exchange', 'borrowing — loans, hire purchase'] },
              { id: '7.1.4', tier: 'understand', text: 'The suitability of each funding method for the acquisition of non-current assets' },
              { id: '7.1.5', tier: 'understand', text: 'The importance of liquidity and use of resources ratios' },
              { id: '7.1.6', tier: 'understand', text: 'The working capital cycle' },
              { id: '7.1.7', tier: 'do', text: 'Produce cash budgets' },
              { id: '7.1.8', tier: 'do', text: 'Calculate working capital using resources ratios',
                indicative: ['inventory holding period (days) = inventories ÷ cost of sales × 365',
                             'trade receivables collection period (days) = trade receivables ÷ revenue × 365',
                             'trade payables payment period (days) = trade payables ÷ cost of sales × 365',
                             'working capital cycle (days) = inventory days + receivable days − payable days'],
                note: 'The specification prints all four formulas, and prints the denominators asymmetrically on purpose: inventory and payables days run on COST OF SALES, receivables days on REVENUE. Using revenue throughout is the commonest error and the one these formulas exist to prevent.' }
            ]
          },
          {
            id: '7.2',
            title: 'Improving cash flow',
            concepts: [
              { id: '7.2.1', tier: 'understand', text: "The importance of liquidity for businesses' survival" },
              { id: '7.2.2', tier: 'understand', text: 'The actions that can be taken if there is insufficient liquidity',
                indicative: ['raise additional finance from owners in the form of capital',
                             'raise additional finance externally in the form of debt'] },
              { id: '7.2.3', tier: 'understand', text: 'Other methods of improving cash flow',
                indicative: ['chase receivables', 'delay supplier payments', 'offer prompt payment discounts (PPD)',
                             'dispose of non-current assets', 'reduce inventory'] },
              { id: '7.2.4', tier: 'understand', text: 'How accounting software and the use of automation and visualisation can aid cash flow planning' }
            ]
          }
        ]
      }
    ]
  };

  /* ── BUAW · Business Awareness ─────────────────────────────────────────────
     THE UNIT WITH NO ARITHMETIC IN IT, and the one this app was least shaped
     for. TPFB, FAPS and MATS are built out of figures that are right or wrong;
     BUAW is built out of judgements — which stakeholder has power here, which
     ethical threat is this, what would PESTLE say about that. There is exactly
     one calculation in the whole scope of content, and it is the effect of a
     price change on revenue.

     That is not a reason to weaken the questions. It is the reason WRITTEN
     TASKS matter more here than anywhere else in the qualification: BUAW is
     "partially computer/partially human marked" and the specification says in
     terms that "some tasks will require extended written responses". A bank of
     multiple choice would rehearse the recognisable half of a paper whose
     assessed half is prose.

     THE SCOPE IS ENCODED AS THE SPECIFICATION STATES IT, including the places
     where its own numbering is uneven — outcome 3's "learners need to be able
     to" items are numbered 3.1.11 to 3.1.17 and sit alongside 3.1.1 to 3.1.10
     rather than under their own topic. Renumbering them to look tidier would
     break the one thing this file is for: being able to say "criterion 3.1.13"
     and have it mean what AAT means by it. */
  var BUAW = {
    unit: 'buaw',
    code: 'BUAW',
    title: 'Business Awareness',
    unitReference: 'D/618/3579',
    glh: 70,
    /* The smallest unit in the qualification, level with TPFB. */
    qualificationWeighting: 15,
    assessment: {
      method: 'Computer based assessment',
      marking: 'Partially computer/partially human marked',
      durationMinutes: 150,
      passMark: 70,
      taskCount: null,
      taskCountSource: 'not stated by AAT and not obtained — deliberately absent',
      totalMarks: null
    },
    excluded: [],
    outcomes: [
      {
        n: 1,
        title: 'Understand business types, structures and governance, and the legal framework in which they operate',
        weighting: 25,
        topics: [
          {
            id: '1.1',
            title: 'The types of businesses',
            concepts: [
              { id: '1.1.1', tier: 'understand', text: 'The standard organisation types and their key characteristics',
                indicative: ['sole traders', 'partnerships (unlimited liability)',
                             'limited liability partnerships and limited partnerships',
                             'private limited companies', 'public limited companies',
                             'not-for-profit organisations including public sector'] },
              { id: '1.1.2', tier: 'understand', text: "The impact of business type on the organisation's governance",
                indicative: ['degree of separation of ownership', 'control/management'] },
              { id: '1.1.3', tier: 'understand', text: 'Types of funding used by businesses',
                indicative: ['new capital introduced', 'profits retained', 'lending', 'working capital'] },
              { id: '1.1.4', tier: 'understand', text: 'Common features of business organisations',
                indicative: ['a structure determined by groups of interrelated individuals',
                             'achievement of common objectives, i.e. goal congruence',
                             'co-operative relationships', 'defined responsibility, authority, relationship',
                             'individuals working together as teams', 'division of work'] },
              { id: '1.1.5', tier: 'understand', text: 'The differences between manufacturing and service businesses',
                indicative: ['availability of internal information', 'the processes and activities',
                             'reporting requirements'] }
            ]
          },
          {
            id: '1.2',
            title: 'The legal framework for companies and partnerships',
            concepts: [
              { id: '1.2.1', tier: 'understand', text: 'The key elements of companies legislation',
                indicative: ['the rights and roles of shareholders', 'the role and duties of directors',
                             'regulates company formation and reporting'] },
              { id: '1.2.2', tier: 'understand', text: 'The key elements of unlimited liability partnerships',
                indicative: ['what a partnership agreement typically contains',
                             'that formal partnership agreements may not exist for all partnerships',
                             'the definition of goodwill and its relevance to the partnership',
                             'the impact of a change in partner on the partnership'] }
            ]
          },
          {
            id: '1.3',
            title: "Business stakeholders' interactions and needs",
            concepts: [
              { id: '1.3.1', tier: 'understand', text: 'Different business stakeholders',
                indicative: ['customers', 'suppliers', 'finance providers', 'owners', 'government',
                             'employees', 'regulatory/professional bodies', 'the general public'] },
              { id: '1.3.2', tier: 'understand', text: "Stakeholders' objectives and requirements from the business" },
              { id: '1.3.3', tier: 'understand', text: "Stakeholders' contributions to and impact on the business" },
              { id: '1.3.4', tier: 'understand', text: 'The relative significance of stakeholders to the business (including attitudes to risk)' }
            ]
          },
          {
            id: '1.4',
            title: 'Organisational structure and governance',
            concepts: [
              { id: '1.4.1', tier: 'understand', text: 'Organisational structure',
                indicative: ['different organisational structures: functional, divisional, matrix',
                             'the impact that the span of control has on the organisation structure, i.e. tall or flat'] },
              { id: '1.4.2', tier: 'understand', text: 'The importance of governance in different organisation types',
                indicative: ["what is meant by the term 'governance' in a business context",
                             'the impact of organisational structure and size on governance',
                             'the difference between centralised and decentralised control'] },
              { id: '1.4.3', tier: 'understand', text: 'The role of operational, managerial and corporate/strategic levels within an organisation' },
              { id: '1.4.4', tier: 'understand', text: "The role of the finance function in contributing towards the operation of the other business functions and the organisation's plans and decision making",
                indicative: ['operations/production', 'sales and marketing', 'human resources',
                             'information technology', 'distribution and logistics'] },
              { id: '1.4.5', tier: 'understand', text: 'The concept of risk and risk management',
                indicative: ['difference between risk and uncertainty',
                             'types of risk: business risk, financial risk, strategic risk, operational risk (cyber risk and reputational risk)',
                             'risk management: transfer, accept, reduce, avoid'] }
            ]
          }
        ]
      },
      {
        n: 2,
        title: 'Understand the impact of the external and internal environment on businesses, their performance and decisions',
        weighting: 20,
        topics: [
          {
            id: '2.1',
            title: 'The use of PESTLE model for analysing the external environment',
            concepts: [
              { id: '2.1.1', tier: 'understand', text: "The use of PESTLE to analyse the impact of the business's macro environment" },
              { id: '2.1.2', tier: 'understand', text: 'Political factors affecting a business',
                indicative: ['government policy', 'taxation', 'imports and exports', 'public spending'] },
              { id: '2.1.3', tier: 'understand', text: 'Economic factors affecting a business',
                indicative: ['interest rates', 'exchange rates', 'changes in disposable income',
                             'business cycles', 'demand-pull and cost-push inflation'] },
              { id: '2.1.4', tier: 'understand', text: 'Social factors affecting a business',
                indicative: ['demographic changes', 'trends', 'unemployment'] },
              { id: '2.1.5', tier: 'understand', text: 'Technological factors affecting a business',
                indicative: ['changes in technology', 'impact on structure'] },
              { id: '2.1.6', tier: 'understand', text: 'Legal factors affecting a business',
                indicative: ['trade regulations', 'changes in law and regulations'] },
              { id: '2.1.7', tier: 'understand', text: 'Environmental factors affecting a business',
                indicative: ['environmental changes', 'sustainability'] },
              { id: '2.1.8', tier: 'do', text: 'Identify PESTLE factors affecting a business' },
              { id: '2.1.9', tier: 'do', text: 'Recognise the impact of PESTLE factors on the business' }
            ]
          },
          {
            id: '2.2',
            title: 'The micro-economic environment',
            concepts: [
              { id: '2.2.1', tier: 'understand', text: 'The concept of supply and demand' },
              { id: '2.2.2', tier: 'understand', text: 'How prices are determined by the price mechanism (supply = demand, i.e. shifts along the supply/demand curves) and market forces (shifts of the supply/demand curves) and the impact of the type of goods (normal, necessity, substitute and complementary)' },
              { id: '2.2.3', tier: 'understand', text: 'The impact of price changes on volumes, revenues, costs and profitability' },
              { id: '2.2.4', tier: 'understand', text: 'How the levels of competition in the micro-economic environment are influenced',
                indicative: ['product features', 'number of sellers and buyers',
                             'barriers to entry, i.e. licences and regulatory controls, cost to set up, expertise',
                             'location', 'availability of information'] }
            ]
          },
          {
            id: '2.3',
            title: 'The importance of sustainability',
            concepts: [
              { id: '2.3.1', tier: 'understand', text: 'The meaning of sustainability' },
              { id: '2.3.2', tier: 'understand', text: 'The three aspects of sustainable performance',
                indicative: ['social', 'ecological/environmental', 'economic/financial'] },
              { id: '2.3.3', tier: 'understand', text: 'The importance of sustainable practice',
                indicative: ['taking a long-term view and allowing the needs of present generations to be met without compromising the ability of future generations to meet their own needs',
                             "considering the needs of the organisation's wider stakeholders",
                             'long-term responsible management and use of resources',
                             'operating sustainably in relation to products and services, customers, employees, the workplace, the supply chain and business functions and processes',
                             "the accountant's public interest duty to protect society as a whole and the organisation's sustainability"] }
            ]
          }
        ]
      },
      {
        n: 3,
        title: 'Understand how businesses and accountants comply with principles of professional ethics',
        weighting: 20,
        topics: [
          {
            id: '3.1',
            title: 'The relevance of the ethical code for professional accountants',
            concepts: [
              { id: '3.1.1', tier: 'understand', text: 'The principle of integrity',
                indicative: ['the effect of accountants being associated with misleading information',
                             'the key ethical values of honesty, transparency and fairness when liaising with clients, suppliers and colleagues',
                             'how integrity is threatened by self-interest and familiarity threats'] },
              { id: '3.1.2', tier: 'understand', text: 'The principle of objectivity',
                indicative: ['what is meant by a conflict of interest, including self-interest threats arising from financial interests, and compensation and incentives linked to financial reporting and decision making',
                             'the importance of appearing to be objective as well as actually being objective',
                             'the importance of professional scepticism when exercising professional judgement in relation to financial accounting and the link between compromised objectivity and possible accusations of bribery or fraud'] },
              { id: '3.1.3', tier: 'understand', text: 'The principle of professional behaviour',
                indicative: ['how compliance with relevant laws and regulations in relation to financial accounting is a minimum requirement but an act that is permitted by the law or regulations is not necessarily ethical',
                             'the link between bringing disrepute on the profession and disciplinary action brought by a professional accountancy body'] },
              { id: '3.1.4', tier: 'understand', text: 'The principle of professional competence and acting with due care' },
              { id: '3.1.5', tier: 'understand', text: 'The principle of confidentiality',
                indicative: ['how financial accounting information confidentiality may be affected by compliance with data protection laws'] },
              { id: '3.1.6', tier: 'understand', text: 'Professional scepticism',
                indicative: ['assessing information critically, with a questioning mind, and being alert to possible misstatements due to error or fraud',
                             'the importance of professional scepticism when exercising professional judgement in relation to transactions recording and financial reporting'] },
              { id: '3.1.7', tier: 'understand', text: 'The difference between a principles-based approach and a rules-based approach' },
              { id: '3.1.8', tier: 'understand', text: 'How documented organisational policies on relevant issues can be used as safeguards to prevent threats and ethical conflict from arising' },
              { id: '3.1.9', tier: 'understand', text: 'The types of safeguard that may be applied' },
              { id: '3.1.10', tier: 'understand', text: 'What an accountant should do when a threat cannot be eliminated or reduced to an acceptable level' },
              { id: '3.1.11', tier: 'do', text: 'Recognise threats to integrity in financial accounting: intimidation/self-interest threats to present misleading information to users of financial statements' },
              { id: '3.1.12', tier: 'do', text: 'Recognise threats to objectivity: intimidation, self-review, advocacy, self-interest, familiarity threats resulting in bias' },
              { id: '3.1.13', tier: 'do', text: 'Recognise professional competence and due care threats: keeping knowledge up to date, pressure in working role, self-interest, self-review, familiarity threats' },
              { id: '3.1.14', tier: 'do', text: 'Recognise areas in which up to date technical knowledge can be critical and the consequences of not maintaining CPD' },
              { id: '3.1.15', tier: 'do', text: 'Recognise when confidential information can or must be disclosed, when it must not be disclosed, and when situations pose a threat to confidentiality' },
              { id: '3.1.16', tier: 'do', text: 'Recognise situations when professional scepticism should be applied and the action to be taken' },
              /* The CPD bullet is printed under 3.1.17 in the extract, not under 3.1.4
                 where its subject belongs — the same two-column spread that
                 scrambles the tiers of 3.1.5 to 3.1.10. Encoded where the
                 document puts it, so the load figures agree; the teaching in
                 aat3-buaw-data.js covers it under competence, where it reads. */
              { id: '3.1.17', tier: 'do', text: 'Recognise which safeguards may be appropriate',
                indicative: ['how professional qualifications and continuing professional development (CPD) support professional competence'] }
            ]
          },
          {
            id: '3.2',
            title: 'Ethical conflicts and reporting unethical behaviour',
            concepts: [
              { id: '3.2.1', tier: 'understand', text: 'How ethical conflicts arise' },
              { id: '3.2.2', tier: 'understand', text: 'How to determine whether behaviour is ethical or unethical' },
              { id: '3.2.3', tier: 'understand', text: 'Key organisational values and compliance with regulations',
                indicative: ['being transparent with customers and suppliers',
                             'reporting financial and regulatory information clearly and on time',
                             'whether to accept and give gifts and hospitality',
                             'paying suppliers a fair price and on time',
                             'providing fair treatment, decent wages and good working conditions to employees',
                             'use of social media'] },
              { id: '3.2.4', tier: 'understand', text: 'The stages in the process for ethical conflict resolution when a situation presents a conflict in application of the fundamental principles' },
              { id: '3.2.5', tier: 'understand', text: 'What happens when a course of action is unethical',
                indicative: ['when disciplinary action by the relevant professional accountancy body may be brought against the accountant for misconduct, and the possible penalties that can arise',
                             'when internal disciplinary procedures may be brought against the accountant by the employer for unethical or illegal behaviour'] },
              { id: '3.2.6', tier: 'understand', text: 'The link between lack of professional competence and due care and claims for breach of contract and professional negligence' },
              { id: '3.2.7', tier: 'understand', text: 'The requirement for professional indemnity insurance' },
              { id: '3.2.8', tier: 'understand', text: 'When and how to report unethical behaviour to responsible persons at work',
                indicative: ['when it is appropriate to report that a breach of the ethical code has taken place',
                             "report in line with formal internal whistle-blowing or 'speak-out' procedures that may be available for reporting unethical behaviour",
                             'seek advice confidentially from relevant managers or helplines as appropriate',
                             'circumstances when there may be public interest disclosure protection available under statute for blowing the whistle externally in the public interest in relation to certain illegal or unethical acts by the employer',
                             'seeking third-party advice before blowing the whistle externally'] }
            ]
          },
          {
            id: '3.3',
            title: 'Money laundering',
            concepts: [
              { id: '3.3.1', tier: 'understand', text: 'Money laundering law and regulations',
                indicative: ['the process of money laundering (layering, placement, integration)',
                             "the consequences for an accountant of failing to act appropriately in response to money laundering, including the potential for the offences of 'tipping off' and 'failure to disclose'",
                             "the consequences for any person of 'prejudicing an investigation'",
                             'the nature of the protection given to accountants by protected disclosures and authorised disclosures under money laundering law and regulations',
                             'all accountants will be regulated by their professional body or by HMRC'] },
              { id: '3.3.2', tier: 'understand', text: 'The importance of reporting suspected money laundering in accordance with regulations',
                indicative: ['select the information that should be reported by an accountant making a required disclosure in either an internal report or a suspicious activity report regarding suspicions about money laundering',
                             'timescales for disclosure of suspected money laundering'] }
            ]
          }
        ]
      },
      {
        n: 4,
        title: 'Understand the impact of new technologies in accounting and the risks associated with data security',
        weighting: 15,
        topics: [
          {
            id: '4.1',
            title: 'Technology',
            concepts: [
              { id: '4.1.1', tier: 'understand', text: 'The impact of emerging and developing technologies on accounting systems',
                indicative: ['automation of processes', 'AI and machine learning', 'blockchain',
                             'electronic filing of documents', 'electronic signing of documents', 'data analytics'] },
              { id: '4.1.2', tier: 'understand', text: 'How technological developments have increased outsourcing and offshoring, which has impacted business development',
                indicative: ['cost structure', 'markets', 'locations'] },
              { id: '4.1.3', tier: 'understand', text: 'The effect of automation and AI in accounting systems on the role of the accountant and the finance function' },
              { id: '4.1.4', tier: 'understand', text: 'The key features of cloud accounting',
                indicative: ['access to data and information from anywhere',
                             'remote data storage so no backup by the business is required',
                             'automation capabilities', 'availability of apps/plug-ins/add-ins',
                             'interactions with stakeholders', 'real-time data'] },
              { id: '4.1.5', tier: 'understand', text: 'Benefits and limitations of cloud accounting for an organisation' }
            ]
          },
          {
            id: '4.2',
            title: 'Data protection, information-security and cybersecurity',
            concepts: [
              { id: '4.2.1', tier: 'understand', text: 'The principles of data protection',
                indicative: ['lawfulness, fairness and transparency', 'purpose limitation', 'data minimisation',
                             'accuracy', 'storage limitation', 'integrity and confidentiality (security)',
                             'accountability'] },
              { id: '4.2.2', tier: 'understand', text: 'The impact of data protection breaches on the individual and business' },
              { id: '4.2.3', tier: 'understand', text: 'The importance of maintaining information security',
                indicative: ['accounting systems access levels', 'security controls, i.e. firewalls',
                             'integrity controls (input, processing and output controls)'] },
              { id: '4.2.4', tier: 'understand', text: 'The importance of cybersecurity to address cyber risks' },
              { id: '4.2.5', tier: 'understand', text: 'The risks to data and operations posed by cyberattacks' }
            ]
          }
        ]
      },
      {
        n: 5,
        title: 'Communicate information to stakeholders',
        weighting: 20,
        topics: [
          {
            id: '5.1',
            title: 'Information requirements in a business organisation',
            concepts: [
              { id: '5.1.1', tier: 'understand', text: 'The attributes of good quality information' },
              { id: '5.1.2', tier: 'understand', text: 'The type, purpose and characteristics of information at operational, managerial and corporate/strategic levels within an organisation' },
              { id: '5.1.3', tier: 'understand', text: 'The characteristics of big data',
                indicative: ['value', 'variety', 'velocity', 'veracity', 'volume'] },
              { id: '5.1.4', tier: 'understand', text: 'The benefits and limitations of the use of big data' },
              { id: '5.1.5', tier: 'understand', text: 'The sources of internal and external big data' },
              { id: '5.1.6', tier: 'understand', text: 'The need to apply professional scepticism in relation to big data' },
              { id: '5.1.7', tier: 'understand', text: 'The use of data analytics from external sources' }
            ]
          },
          {
            id: '5.2',
            title: 'Visualising information',
            concepts: [
              { id: '5.2.1', tier: 'understand', text: 'The importance of being able to visualise information in different formats',
                indicative: ['images', 'charts', 'diagrams', 'tables', 'matrices', 'graphs'] },
              { id: '5.2.2', tier: 'understand', text: 'Patterns or significant anomalies within data' },
              { id: '5.2.3', tier: 'understand', text: 'The importance of choosing the most appropriate forms of visualised data for communication purposes' },
              { id: '5.2.4', tier: 'understand', text: 'That accounting software packages use dashboards to communicate to non-technical stakeholders' },
              { id: '5.2.5', tier: 'do', text: 'Interpret visual information to indicate relationships and trends' }
            ]
          },
          {
            id: '5.3',
            title: 'Communicating information',
            concepts: [
              { id: '5.3.1', tier: 'understand', text: 'The principles used to determine the appropriate method of communication to use both internally and externally by the business' },
              { id: '5.3.2', tier: 'understand', text: 'The characteristics of professional communication',
                indicative: ['meeting different stakeholder requirements',
                             'use of appropriate communication medium for desired outcome',
                             'importance of communicating valid information', 'importance of confidentiality'] }
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
    units: { faps: FAPS, mats: MATS, tpfb: TPFB, buaw: BUAW }
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
