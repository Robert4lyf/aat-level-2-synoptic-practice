/* AAT Level 3 — Tax Processes for Businesses: tax figures, isolated.
 *
 * WHY THIS FILE EXISTS
 *
 * The qualification specification contains NO numeric thresholds anywhere — it
 * says only "the registration and deregistration thresholds… and how to apply
 * them". Every figure a student needs therefore comes from HMRC, not from AAT,
 * and every one of them can move.
 *
 * The unit is reissued for a new Finance Act each September, assessable from
 * the following late January (FA23 → FA24 → FA25 across eleven spec revisions).
 * Isolating the numbers here makes that annual roll a one-file job with a review
 * pass, rather than a hunt through the whole corpus. Lessons and questions
 * reference these constants; none hardcodes a figure.
 *
 * RULES FOR EDITING
 *
 *  - Every value carries `source` and `checked` (the date it was verified).
 *  - Nothing goes in from memory. The specification's own advice is to work
 *    from current HMRC guidance, and tax figures are the single easiest thing
 *    to get confidently wrong.
 *  - When the Finance Act rolls, bump FINANCE_ACT and ASSESSABLE_FROM, then
 *    re-verify every entry rather than assuming only some changed.
 *  - Two Finance Act variants coexist for roughly four months each year, and
 *    which applies depends on the student's SITTING DATE, not the calendar.
 *    `appliesTo` records the window.
 */
(function (root) {
  'use strict';

  var TAX = {
    unit: 'tpfb',
    FINANCE_ACT: 'FA2025',
    /* Specification, TPFB unit introduction: "This unit is based on the Finance
       Act 2025 subject to assessment from 26 January 2026." */
    ASSESSABLE_FROM: '2026-01-26',
    lastReviewed: '2026-08-07',

    rates: {
      standard: { value: 20, unit: '%', note: 'Standard rate of VAT.',
        source: 'HMRC, VAT rates on different goods and services', checked: '2026-08-07' },
      reduced: { value: 5, unit: '%', note: 'Reduced rate — e.g. domestic fuel and power, children’s car seats.',
        source: 'HMRC, VAT rates on different goods and services', checked: '2026-08-07' },
      zero: { value: 0, unit: '%', note: 'Zero-rated — a TAXABLE supply at 0%, so input tax remains recoverable. This is the distinction from exempt.',
        source: 'HMRC, VAT rates on different goods and services', checked: '2026-08-07' }
    },

    /* Handy derived values so lessons never re-derive them inline. */
    fractions: {
      /* Gross → VAT at the standard rate: gross × 1/6. */
      standardVatFromGross: { numerator: 1, denominator: 6,
        note: 'At 20%, VAT is one sixth of the gross. Gross ÷ 6, or gross × 20/120.' },
      standardGrossMultiplier: 1.20,
      reducedVatFromGross: { numerator: 1, denominator: 21,
        note: 'At 5%, VAT is one twenty-first of the gross. Gross × 5/105.' },
      reducedGrossMultiplier: 1.05
    },

    registration: {
      threshold: { value: 90000, unit: '£',
        note: 'Taxable turnover in any rolling 12-month period (historic test), or expected in the next 30 days alone (future test).',
        source: 'HMRC, VAT registration thresholds — unchanged since 1 April 2024', checked: '2026-08-07' },
      deregistrationThreshold: { value: 88000, unit: '£',
        note: 'Set below the registration threshold so businesses trading around the line do not register and deregister repeatedly.',
        source: 'HMRC, VAT registration thresholds', checked: '2026-08-07' },

      /* The two tests differ in BOTH the notification deadline and the date
         registration takes effect. Mixing them up is the classic exam error. */
      historicTest: {
        basis: 'Taxable turnover in the previous rolling 12 months exceeded the threshold. Tested at the end of every month, looking back — not on a financial year.',
        notifyWithinDays: { value: 30, unit: 'days', note: 'From the END OF THE MONTH in which the threshold was exceeded.' },
        effectiveFrom: 'The first day of the second month after the threshold was exceeded.',
        source: 'HMRC, VAT registration — when to register', checked: '2026-08-08'
      },
      futureTest: {
        basis: 'Taxable turnover is expected to exceed the threshold in the NEXT 30 DAYS ALONE. Not a 12-month projection.',
        notifyWithinDays: { value: 30, unit: 'days', note: 'By the end of that same 30-day period.' },
        effectiveFrom: 'The date the expectation arose — the start of the 30-day period, not its end.',
        source: 'HMRC, VAT registration — when to register', checked: '2026-08-08'
      },
      deregistration: {
        compulsory: 'Required when the business ceases to make taxable supplies — it stops trading, is sold, or its supplies become wholly exempt.',
        compulsoryNotifyWithinDays: { value: 30, unit: 'days', note: 'From the date the business stopped being eligible. A penalty may follow late notification.' },
        voluntary: 'Permitted where taxable turnover for the NEXT 12 months is expected to fall below the deregistration threshold. HMRC may refuse.',
        source: 'HMRC, Cancel your VAT registration', checked: '2026-08-08'
      },
      voluntaryRegistration: {
        note: 'A business below the threshold may register anyway. It benefits a business making zero-rated supplies (recovers input tax while charging no output tax), one with large input tax before trading, or one wanting to appear established. It costs compliance time and makes supplies to non-registered customers more expensive.',
        source: 'HMRC, VAT registration', checked: '2026-08-08'
      }
    },

    records: {
      retentionYears: { value: 6, unit: 'years',
        note: 'At least six years. Records used for other taxes may need to be kept longer; HMRC may allow shorter where six years causes serious storage difficulty.' },
      whatToKeep: [
        'the VAT account itself',
        'copies of all VAT invoices issued, and all VAT invoices received',
        'credit and debit notes issued and received',
        'purchase and sales daybooks, cash books and till rolls',
        'import and export documents',
        'business correspondence, orders and delivery notes'
      ],
      digital: 'Records forming part of the electronic account must be kept digitally in functional compatible software, with digital links between them.',
      penalty: { value: 500, unit: '£',
        note: 'A fixed penalty for failing to preserve records as required (VATA 1994 s.69). Separate from any penalty for the tax itself.' },
      source: 'HMRC, Record keeping (VAT Notice 700/21); VATA 1994 s.69',
      checked: '2026-08-08'
    },

    inspection: {
      powers: 'HMRC may inspect business records, enter business premises at a reasonable time, and require the production of documents. Visits are usually arranged in advance, but HMRC may make unannounced visits.',
      note: 'These powers exist because the business holds public money, not because it is suspected of anything.',
      source: 'HMRC, Compliance checks: VAT visits',
      checked: '2026-08-08'
    },

    assessments: {
      power: 'Where a return is not submitted, HMRC may raise an assessment to the best of its judgement under VATA 1994 s.73 — a "prime" or central assessment — creating an enforceable debt for the period.',
      note: 'An assessment does NOT replace the obligation to file. The return is still due, the assessment stands until displaced by it, and penalties continue to run.',
      direction: 'An assessment may be too high OR too low; HMRC publishes no directional claim and neither should teaching material.',
      underAssessment: 'Where an assessment understates the liability the business must tell HMRC within 30 days, or send a correct return and payment. Otherwise a penalty of up to 30% of the assessment may apply.',
      underAssessmentSource: 'HMRC, Send a VAT Return — late returns and payment',
      normalTimeLimitYears: { value: 4, unit: 'years', note: 'The maximum period HMRC may assess, except where the 20-year rule applies.' },
      extendedTimeLimitYears: { value: 20, unit: 'years', note: 'Where the loss of tax is brought about deliberately.' },
      source: 'HMRC, VAT Assessments and Error Correction manual VAEC1143, VAEC2920; VATA 1994 s.73',
      checked: '2026-08-08'
    },

    schemes: {
      cashAccounting: {
        joinThreshold: { value: 1350000, unit: '£', note: 'Estimated taxable turnover, excluding VAT, for the next 12 months.' },
        leaveThreshold: { value: 1600000, unit: '£', note: 'Annual value of taxable supplies, excluding VAT.' },
        operation: 'Output tax is accounted for when payment is RECEIVED, and input tax reclaimed when suppliers are PAID — not on invoice dates. Returns and deadlines are otherwise unchanged: still quarterly, still one month and seven days.',
        benefit: 'Automatic cash-flow relief for a business that gives credit, and no VAT is ever paid over on an invoice the customer never settles.',
        badDebtNote: 'Bad debt relief is irrelevant while in the scheme — VAT on an unpaid invoice was never accounted for in the first place.',
        excluded: [
          'goods bought or sold under lease or hire purchase',
          'goods imported, or acquired from an EU member state',
          'supplies under the VAT domestic reverse charge',
          'invoices where payment is not due for more than six months',
          'invoices issued in advance of the supply'
        ],
        mustLeave: 'Turnover exceeds the leave threshold, HMRC withdraws use of the scheme, or the business is convicted of a VAT offence or penalised for dishonest evasion.',
        source: 'HMRC, Cash Accounting Scheme (VAT Notice 731)', checked: '2026-08-08'
      },
      annualAccounting: {
        joinThreshold: { value: 1350000, unit: '£', note: 'Estimated taxable supplies, excluding VAT, for the next 12 months.' },
        leaveThreshold: { value: 1600000, unit: '£', note: 'Must leave if turnover exceeds this.' },
        operation: 'ONE return a year instead of four, with interim payments on account based on the previous year’s liability.',
        instalments: {
          monthly: { count: 9, percentEach: 10, note: 'Nine monthly payments of 10% of last year’s liability, due at the end of months 4 to 12.' },
          quarterly: { count: 3, percentEach: 25, note: 'Three quarterly payments of 25% of last year’s liability, due at the end of months 4, 7 and 10.' }
        },
        returnAndBalancingPayment: { value: 2, unit: 'months',
          note: 'The single annual return AND the balancing payment are both due two months after the end of the VAT year — not one month and seven days.' },
        benefit: 'One return a year and predictable, budgetable payments. It suits a stable business; it suits a repayment trader badly, because a refund is collected only once a year.',
        source: 'HMRC, Annual accounting Scheme (VAT Notice 732)', checked: '2026-08-08'
      },
      flatRate: {
        joinThreshold: { value: 150000, unit: '£', note: 'Estimated taxable turnover, EXCLUDING VAT, for the next 12 months.' },
        leaveThreshold: { value: 230000, unit: '£', note: 'Total turnover INCLUDING VAT, tested on the anniversary of joining or if expected in the next 30 days.' },
        operation: 'VAT due is a flat percentage of VAT-INCLUSIVE turnover. The business still charges its customers VAT at the normal rate; it simply pays HMRC a different, smaller figure and keeps the difference.',
        inputTax: 'Input tax is NOT reclaimed separately, because the sector percentages have an ALLOWANCE FOR INPUT TAX BUILT INTO THEM. The flat rate is a net figure: it stands in for output tax less input tax, not for output tax alone. That is why the rate is well below 20%, why it varies by sector — sectors differ in how much they would normally reclaim — and why a business with almost no purchases is pushed onto the limited cost rate instead.',
        inputTaxSource: 'HMRC, Flat Rate Scheme for small businesses (VAT Notice 733): "the flat rate percentages have an allowance for input tax built into them".',
        capitalGoodsException: { value: 2000, unit: '£',
          note: 'Input tax MAY be reclaimed on a single purchase of capital expenditure goods costing £2,000 or more including VAT.' },
        firstYearDiscount: { value: 1, unit: '%',
          note: 'A 1% reduction to the sector rate, running until the first anniversary of VAT registration.' },
        limitedCostBusiness: { value: 16.5, unit: '%',
          note: 'A business whose spend on relevant goods INCLUDING VAT is under 2% of flat rate turnover, or over 2% but under £1,000 a year, must use 16.5% whatever its sector. The £1,000 is annual — for a QUARTERLY return the figure is £250.' },
        source: 'HMRC, Flat Rate Scheme for small businesses (VAT Notice 733)', checked: '2026-08-08',
        note: 'The sector flat rate percentage itself is supplied in the assessment — see PROVIDED_IN_ASSESSMENT.'
      },
      withdrawal: {
        voluntary: 'A business may leave any of the three schemes voluntarily, normally at the end of a VAT period, by telling HMRC.',
        compulsory: 'It MUST leave once the scheme’s leave threshold is breached, or if HMRC withdraws use of the scheme to protect the revenue.',
        rejoinNote: 'A business that has left the flat rate scheme cannot rejoin for 12 months.',
        source: 'HMRC, VAT Notices 731, 732 and 733', checked: '2026-08-08'
      }
    },

    /* The nine boxes. Boxes 2, 8 and 9 are EXCLUDED from this unit by the
       specification (TPFB 3.2.1) — they concern Northern Ireland and the EU,
       and the unit excludes Northern Ireland rules generally. They are listed
       here only so the numbering is not silently wrong. */
    /* ── The domestic reverse charge for construction ───────────────────────
       NOT a named criterion. It appears here because the unit already meets it
       twice — it is excluded from cash accounting and from the flat rate
       scheme, and it is one of the things a technician should escalate rather
       than guess at — and because a rule that changes who accounts for the VAT
       is worth understanding wherever a reader meets it. Treated as context,
       not as something the assessment asks about directly. */
    reverseCharge: {
      appliesFrom: '1 March 2021',
      scope: 'Specified construction services supplied between VAT-registered businesses where the payment falls within the scope of the Construction Industry Scheme, and the customer is neither an end user nor an intermediary supplier.',
      mechanism: 'The supplier does NOT charge VAT. The customer accounts for the output tax on the supplier’s behalf and recovers it as input tax under the normal rules, so for a fully taxable customer the net cash effect is nil.',
      why: 'It removes the opportunity for a supplier to charge VAT, be paid it, and disappear without accounting for it — missing trader fraud, to which construction supply chains were particularly exposed.',
      supplierReturn: { box1: 'No output tax.', box6: 'The NET value of the sale, as normal.' },
      customerReturn: {
        box1: 'The output tax the supplier did not charge.',
        box4: 'The same VAT as input tax, subject to the normal recovery rules.',
        box6: 'Nothing. The purchase is not a sale.',
        box7: 'The NET value of the purchase, as normal.'
      },
      invoice: 'The supplier’s invoice must state that the reverse charge applies and that the customer is required to account for the VAT, and must show the VAT rate or the amount of VAT that would have applied — without including it in the total charged.',
      endUser: 'An end user, or an intermediary supplier, must tell the supplier IN WRITING. Until they do, the supplier applies the reverse charge; once they have, normal VAT rules apply to that customer.',
      fivePercentDisregard: { value: 5, unit: '%',
        note: 'Where the reverse charge element is 5% or less of the value of the supply, the whole supply may be treated under normal VAT rules.' },
      schemeInteraction: 'Excluded from cash accounting and from the flat rate scheme — a business doing much reverse charge work is usually better off leaving the flat rate scheme, since it charges no output tax to keep.',
      source: 'HMRC, VAT domestic reverse charge for building and construction services (VAT Notice 735)',
      checked: '2026-08-29'
    },

    returnBoxes: {
      box1: { title: 'VAT due on sales and other outputs', note: 'Output tax on all supplies made: standard and reduced rated sales, fuel scale charges, import VAT under postponed accounting, and VAT on gifts of goods over £50. Zero-rated, exempt and outside-the-scope supplies carry no VAT so add nothing here.' },
      box2: { title: 'VAT due in the period on acquisitions of goods made in Northern Ireland from EU member states', assessed: false, note: 'Northern Ireland only. EXCLUDED from this unit — the label was rescoped to NI after 2020 and pre-2021 wording is stale.' },
      box3: { title: 'Total VAT due', note: 'Box 1 + Box 2. Calculated, not entered.' },
      box4: { title: 'VAT reclaimed on purchases and other inputs', note: 'Input tax recoverable: purchases, import VAT under postponed accounting, and bad debt relief. Excludes blocked items — client entertaining, cars available for private use — and anything without a valid VAT invoice.' },
      box5: { title: 'Net VAT to pay or reclaim', note: 'Deduct the smaller of Box 3 and Box 4 from the larger and enter the difference. ALWAYS POSITIVE — HMRC states expressly that a minus sign must not be entered in Box 5. Box 4 exceeding Box 3 means a repayment is due.' },
      box6: { title: 'Total value of sales and other outputs, excluding VAT', note: 'NET values of ALL supplies, including zero-rated and exempt ones. This is a value box, not a VAT box — a common error is to omit zero-rated or exempt sales because they carried no VAT.' },
      box7: { title: 'Total value of purchases and other inputs, excluding VAT', note: 'NET values of all business purchases including imports. Excludes wages, PAYE, drawings and other outside-the-scope expenditure.' },
      box8: { title: 'Value of supplies of goods to EU member states', assessed: false, note: 'Northern Ireland only. EXCLUDED from this unit.' },
      box9: { title: 'Value of acquisitions of goods from EU member states', assessed: false, note: 'Northern Ireland only. EXCLUDED from this unit.' },
      /* NOT VERIFIED against current HMRC guidance — see the note in
         docs/aat-level-3-plan.md. The rule (VAT boxes in pounds and pence,
         value boxes in whole pounds rounded down) originates in the online
         return service and older VAT 100 guidance rather than Notice 700/12,
         which no longer restates it. Taught in lesson 2C. Re-verify before
         relying on it, and do not treat this entry as sourced. */
      roundingUnverified: 'Boxes 1–5 in pounds and pence; boxes 6–9 in whole pounds, rounded down.',
      source: 'HMRC, How to fill in and submit your VAT Return (VAT Notice 700/12)',
      checked: '2026-08-08'
    },

    errorCorrection: {
      /* The two-limb test. An error may be corrected on the next return only if
         it is below BOTH limbs; otherwise it must be separately notified. */
      netErrorLimit: { value: 10000, unit: '£',
        note: 'Net errors at or below this may always be corrected on the next return.' },
      turnoverPercentage: { value: 1, unit: '%',
        note: 'Errors above £10,000 may still be corrected on the next return if they do not exceed 1% of the Box 6 figure…' },
      absoluteCeiling: { value: 50000, unit: '£',
        note: '…subject to this absolute ceiling. Above £50,000 the error must always be separately notified.' },
      timeLimitYears: { value: 4, unit: 'years',
        note: 'Errors may be corrected within four years.' },
      deliberateErrors: 'Deliberate errors must ALWAYS be separately notified, whatever their size.',
      separateNotificationForm: 'VAT652',

      /* HMRC's own names for the two routes. Worth teaching, because the
         assessment and the notice both use them. */
      method1: 'Adjust the VAT account and correct the error on the NEXT return. Available only where the net error is within both limbs of the test and was not deliberate.',
      method2: 'Notify HMRC SEPARATELY, on form VAT652 or online. Required where either limb is breached, and always for a deliberate error. Method 2 may be used voluntarily for any error.',
      netErrorMeaning: 'The NET of all errors found — under-declarations less over-declarations — for the periods being corrected, not the largest single error and not their gross total.',
      timeLimitRunsFrom: 'Four years from the end of the period, for under- or over-declared OUTPUT tax; four years from the return due date, for under-claimed INPUT tax.',
      interestAndPenalties: 'Interest runs where an error delayed payment of VAT. A penalty depends on behaviour — careless, deliberate, or deliberate and concealed — and is reduced for an unprompted disclosure. Taking reasonable care and disclosing promptly can mean no penalty at all.',

      /* ERRORS use Schedule 24 FA2007 (inaccuracies), which is NOT the same
         table as the Schedule 41 failure-to-notify regime in penalties.failureToNotify.
         Two differences matter: the first band is "careless" rather than
         "non-deliberate", and there is no 12-month distinction — a prompted
         careless disclosure has a flat 15% minimum. This table is supplied in
         the AAT reference material during the assessment. */
      penaltyForError: {
        basis: 'A percentage of the potential lost revenue, set by behaviour and reduced for the quality of disclosure.',
        careless: { max: 30, unpromptedMin: 0, promptedMin: 15, unit: '%' },
        deliberate: { max: 70, unpromptedMin: 20, promptedMin: 35, unit: '%' },
        deliberateAndConcealed: { max: 100, unpromptedMin: 30, promptedMin: 50, unit: '%' },
        reasonableCare: 'An inaccuracy made despite taking reasonable care attracts no penalty at all.',
        source: 'HMRC Compliance Handbook CH82470; Schedule 24 Finance Act 2007',
        checked: '2026-08-08'
      },
      source: 'HMRC, How to correct VAT errors and make adjustments or claims (VAT Notice 700/45)',
      checked: '2026-08-08'
    },

    gifts: {
      /* The £50 limit comes from VATA 1994 Sch 4 para 5 and has stood since
         2003 — but it is a statutory limit, so it lives here with the rest
         rather than in prose. */
      goodsLimit: { value: 50, unit: '£',
        note: 'Business gifts of goods: no output tax so long as the total cost of gifts to the same person stays at or under £50, excluding VAT, in any 12-month period. Once the running total goes over, output tax is due on the total cost of ALL the gifts to that person — not just the excess.',
        source: 'HMRC, Business promotions (VAT Notice 700/7), para 2.3', checked: '2026-08-18' },
      basis: 'Output tax is calculated on the COST to the business of the goods given away, not their retail value.',
      samples: 'Free samples are not liable to VAT, however many are given, provided they are genuine specimens meant to let the recipient assess the product.',
      services: 'A service given away free of charge is normally no supply at all, so no output tax arises — the deemed-supply rule is about goods.',
      source: 'HMRC, Business promotions (VAT Notice 700/7), paras 2.3, 3.1, 4.1–4.2',
      checked: '2026-08-18'
    },

    badDebtRelief: {
      debtAgeMonths: { value: 6, unit: 'months',
        note: 'The debt must be at least six months overdue, measured from the later of the due date and the date of supply.' },
      writeOffRequired: 'The debt must have been written off in the business’s refunds for bad debts account.',
      claimWindow: { value: '4 years and 6 months', note: 'A claim must be made within four years and six months of the later of the payment due date and the date of supply.' },
      recordRetentionYears: { value: 4, unit: 'years', note: 'Records supporting the claim must be kept for four years from the date of claim.' },
      source: 'HMRC, Relief from VAT on bad debts (VAT Notice 700/18)',
      checked: '2026-08-07'
    },

    partialExemption: {
      deMinimisPerMonth: { value: 625, unit: '£', note: 'Exempt input tax must average no more than this per month…' },
      deMinimisPerQuarter: { value: 1875, unit: '£' },
      deMinimisPerYear: { value: 7500, unit: '£' },
      inputTaxProportion: { value: 50, unit: '%',
        note: '…AND must be no more than half of total input tax. BOTH limbs must be met.' },
      source: 'HMRC, Partial exemption (VAT Notice 706); VAT Partial Exemption Guidance PE24500',
      checked: '2026-08-07'
    },

    penalties: {
      lateSubmission: {
        model: 'Points-based. One point per late return; a fixed penalty once the threshold is reached, and for every late return thereafter.',
        thresholds: { annual: 2, quarterly: 4, monthly: 5 },
        penalty: { value: 200, unit: '£', note: 'Charged at the threshold and again for each subsequent late submission.' },
        complianceMonths: { annual: 24, quarterly: 12, monthly: 6,
          note: 'AT the threshold, points reset to zero only after a period of compliance AND submission of all outstanding returns for the preceding 24 months.' },
        pointExpiryMonths: { value: 24, unit: 'months',
          note: 'BELOW the threshold, a single point expires automatically 24 months after the first day of the month following the month in which the late return was due. Two different mechanisms — do not merge them.' },
        source: 'HMRC, Penalty points and penalties if you submit your VAT Return late',
        checked: '2026-08-07'
      },
      latePayment: {
        /* CHANGED BY FINANCE ACT 2025 — previously 2% / 2% / 4%. This is exactly
           the kind of figure that goes stale silently. */
        firstPenaltyDay15: { value: 3, unit: '%', note: 'Of the VAT outstanding at day 15.' },
        firstPenaltyDay30: { value: 3, unit: '%', note: 'A further 3% of the VAT still outstanding at day 30.' },
        secondPenaltyAnnualised: { value: 10, unit: '% per year',
          note: 'Accrues daily from day 31 on the outstanding amount, until paid or a Time to Pay agreement is made.' },
        appliesTo: 'Amounts due on or after 31 May 2025, unless the period began before 1 April 2025.',
        previousRates: '2% at day 15, 2% at day 30, 4% annualised — for earlier periods.',
        timeToPay: 'A Time to Pay agreement, if kept to, prevents further penalties accruing.',
        source: 'HMRC, How late payment penalties work if you pay VAT late; Increase to VAT late payment penalties percentage rate',
        checked: '2026-08-07'
      },

      lateInterest: {
        rate: 'Bank of England base rate plus 4%.',
        runsFrom: 'The first day the payment is overdue until it is paid in full.',
        note: 'Interest is NOT a penalty. It runs alongside the late payment penalties and is charged even where a Time to Pay agreement prevents further penalties.',
        source: 'HMRC, Late payment interest if you do not pay VAT or penalties on time',
        checked: '2026-08-08'
      },

      /* CAUTION FOR ANYONE MAINTAINING THIS FILE.
         VAT Notice 700/41 describes a 5% / 10% / 15% belated notification
         penalty with a £50 minimum. That regime applies ONLY where the
         obligation to notify arose before 1 April 2010, and the notice itself
         says so. Plenty of study material still quotes it. The live regime is
         Schedule 41 FA2008 — behaviour-based, a percentage of potential lost
         revenue. Do not reintroduce the old rates. */
      failureToNotify: {
        basis: 'A percentage of the potential lost revenue (PLR) — the VAT that would have been paid had the business registered on time.',
        behaviours: {
          nonDeliberate: { max: 30, unit: '%',
            note: 'Unprompted disclosure within 12 months can reduce this to 0%; prompted, to 10%. Disclosed after 12 months: 10% unprompted, 20% prompted.' },
          deliberate: { max: 70, unit: '%', note: 'Minimum 20% unprompted, 35% prompted.' },
          deliberateAndConcealed: { max: 100, unit: '%', note: 'Minimum 30% unprompted, 50% prompted.' }
        },
        reasonableExcuse: 'A reasonable excuse removes the penalty for a NON-DELIBERATE failure, provided the failure is put right without unreasonable delay once the excuse ends.',
        unpromptedMeaning: 'Disclosure is unprompted if made at a time when the business had no reason to believe HMRC had discovered, or was about to discover, the failure.',
        source: 'HMRC, Compliance checks: penalties for failure to notify (CC/FS11); Schedule 41 Finance Act 2008',
        checked: '2026-08-08'
      }
    },

    invoicing: {
      issueWithinDays: { value: 30, unit: 'days',
        note: 'A VAT invoice must normally be issued within 30 days of the basic tax point.' },
      actualTaxPointDays: { value: 14, unit: 'days',
        note: 'If an invoice is issued within 14 days after the basic tax point, that invoice date becomes the actual tax point instead.' },
      source: 'HMRC, VAT guide (VAT Notice 700), tax points',
      checked: '2026-08-07'
    },

    filing: {
      standardDeadline: 'One calendar month and seven days after the end of the VAT period, for both filing and payment.',
      makingTaxDigital: 'Returns must be filed using functional compatible software, authorised to connect to HMRC. Records must be kept digitally with digital links between them.',
      monthlyReturns: 'A business may apply to file monthly. It suits a repayment trader — typically a zero-rated supplier or an exporter — who would otherwise wait a full quarter to recover input tax. The cost is twelve filings a year instead of four.',
      source: 'HMRC, Making Tax Digital for VAT; Sending a VAT Return',
      checked: '2026-08-07',

      /* Key concept 1.3.3 is specifically about this: the statutory deadline is
         fixed, but the effective last safe day moves with the payment method,
         because what matters is when CLEARED FUNDS reach HMRC. */
      paymentMethods: {
        principle: 'The money must REACH HMRC’s account by the deadline. A payment started on the deadline by a slow method is late.',
        sameDay: ['Faster Payments — same or next day, including weekends and bank holidays', 'CHAPS — same working day within the bank’s processing times', 'debit or corporate credit card online'],
        threeWorkingDays: ['Bacs', 'standing order', 'payment at a bank or building society'],
        directDebit: 'Set up at least three working days before submitting the return; HMRC then collects automatically three working days AFTER the deadline. File late and collection is three days after filing instead.',
        source: 'HMRC, Pay your VAT bill',
        checked: '2026-08-08'
      }
    },

    /* ── Payroll (Outcome 4) ────────────────────────────────────────────────
       The specification EXCLUDES calculating Income Tax, National Insurance and
       student loan repayments (the exclusion note beneath TPFB 4.1.11–4.1.12),
       so no rates, thresholds or bands appear here — the assessment supplies
       those figures. What is assessable
       is the framework: who registers, what is kept, what is filed, by when,
       and what happens when it is late. */
    payroll: {
      registration: {
        when: 'Before the first payday. A business must register as an employer even if it employs only its sole director.',
        earliestBefore: { value: 2, unit: 'months', note: 'Registration cannot be made more than two months before the first payment.' },
        source: 'HMRC, Register as an employer', checked: '2026-08-08'
      },

      records: {
        whatToKeep: [
          'what was paid to each employee, and the deductions made',
          'reports submitted to HMRC and payments made to HMRC',
          'employee leave and sickness absence',
          'tax code notices',
          'taxable expenses and benefits',
          'Payroll Giving Scheme documents, where operated'
        ],
        retentionYears: { value: 3, unit: 'years',
          note: 'Three years from the END OF THE TAX YEAR they relate to — shorter than the six years for VAT records, and the two are easily confused.' },
        software: 'Payroll must be run using software able to report under Real Time Information; HMRC offers Basic PAYE Tools for employers with fewer than 10 employees.',
        penalty: { value: 3000, unit: '£',
          note: 'Where records are not kept, HMRC may estimate what is owed AND charge a penalty of up to £3,000.' },
        lostRecords: 'HMRC must be told immediately, and the employer must make reasonable efforts to reconstruct the information.',
        source: 'HMRC, PAYE and payroll for employers — keeping records', checked: '2026-08-08'
      },

      rti: {
        principle: 'Payroll is reported in REAL TIME: a submission is made every time employees are paid, rather than once a year.',
        fps: {
          name: 'Full Payment Submission',
          content: 'Pay and deductions for every employee paid in the period — gross pay, tax, National Insurance, student loan, pension — plus starters, leavers and changes of details. It reports what was paid.',
          deadline: 'On or before the date the employees are paid. This holds even for an employer that pays HMRC quarterly.'
        },
        eps: {
          name: 'Employer Payment Summary',
          content: 'Amounts that REDUCE what is owed to HMRC — statutory pay recovered, the Employment Allowance, CIS deductions suffered — and a declaration where no employees were paid in a month.',
          deadline: 'By the 19th of the following tax month.',
          note: 'An EPS is sent only when there is something to report. The FPS says what was paid; the EPS says why less is owed than the FPS implies.'
        },
        source: 'HMRC, Running payroll — reporting to HMRC', checked: '2026-08-08'
      },

      /* THE ONE FIGURE IN THIS SECTION, and it is here despite the note above
         because it is not a rate, threshold or band used to CALCULATE anything
         excluded by 4.1.12. It is a relief set against a liability the
         assessment gives you, and 4.1.11 asks for the amount due to HMRC — so
         a reader who does not know the allowance exists overstates that amount
         by up to the whole of it. */
      employmentAllowance: {
        value: 10500, unit: '£',
        period: 'per tax year',
        reduces: 'The employer’s (secondary) Class 1 National Insurance ONLY. It does not touch PAYE, employee National Insurance, student loan deductions, or Class 1A on benefits.',
        claimedVia: 'The Employer Payment Summary. It is claimed, not automatic — an employer entitled to it who never files the EPS simply pays more.',
        howItIsUsed: 'Set against the employer’s Class 1 NIC as that liability arises, month by month, until the allowance is exhausted. It is not spread evenly across the year.',
        notAvailable: [
          'a company whose only employee paid above the secondary threshold is a director',
          'most public sector work',
          'workers employed for personal, household or domestic work — care and support workers excepted'
        ],
        note: 'The £100,000 cap on the previous year’s secondary Class 1 NIC, which used to restrict eligibility, was REMOVED from 6 April 2025 at the same time the allowance rose from £5,000. Study material written before then still quotes both.',
        source: 'HMRC, Employment Allowance: check if you are eligible; Claim Employment Allowance',
        checked: '2026-08-29'
      },

      paymentToHmrc: {
        electronicDeadline: { value: 22, unit: 'day of the following month' },
        nonElectronicDeadline: { value: 19, unit: 'day of the following month' },
        quarterlyThreshold: { value: 1500, unit: '£',
          note: 'An employer whose average monthly liability is under £1,500 may pay quarterly instead of monthly.' },
        source: 'HMRC, Running payroll — paying HMRC', checked: '2026-08-08'
      },

      forms: {
        starterChecklist: { what: 'Collects the details needed to work out a new employee’s tax code where no P45 is available.', when: 'Before the first payment to a new employee.' },
        payslip: { what: 'Shows gross pay, deductions (itemised) and net pay.', when: 'On or before payday. It is a legal right, not a courtesy.' },
        p45: { what: 'Records pay and tax to the date of leaving, so the next employer can operate the right code.', when: 'On the employee leaving.' },
        p60: { what: 'End-of-year certificate summarising the year’s taxable pay and deductions.', when: 'By 31 May following the end of the tax year, to everyone employed on 5 April.' },
        p11d: { what: 'Reports expenses and benefits provided to an employee that were not payrolled.', when: 'By 6 July following the end of the tax year; the employee gets a copy by the same date.' },
        p11db: { what: 'The employer’s declaration and the Class 1A National Insurance due on those benefits.', when: 'By 6 July; the Class 1A NIC is payable by 22 July electronically, 19 July by cheque.' },
        source: 'HMRC, PAYE forms P45, P60, P11D; Expenses and benefits — deadlines', checked: '2026-08-08'
      },

      payrollingBenefits: {
        what: 'Benefits are put through the payroll and taxed in real time across the year, instead of being reported on a P11D after it.',
        effect: 'No P11D is needed for a payrolled benefit, and the employee pays the tax as they go rather than through a changed tax code later. A P11D(b) is still required for the Class 1A National Insurance.',
        registration: 'The employer must register with HMRC to payroll benefits BEFORE the start of the tax year in which it wants to do so.',
        source: 'HMRC, Expenses and benefits — reporting and paying', checked: '2026-08-08'
      },

      penalties: {
        lateFiling: {
          model: 'A monthly penalty based on headcount, for a late Full Payment Submission.',
          byEmployees: { '1to9': 100, '10to49': 200, '50to249': 300, '250plus': 400 },
          unit: '£ per month',
          firstFailureFree: 'The FIRST failure in a tax year is not penalised (annual schemes excepted).',
          extendedFailure: 'A return still outstanding after 3 months attracts a further penalty of 5% of the tax that should have been reported.',
          source: 'HMRC, What happens if you do not report payroll information on time', checked: '2026-08-08'
        },
        latePayment: {
          model: 'A percentage of the amount paid late, escalating with the number of defaults in the tax year.',
          byDefaults: { '1to3': 1, '4to6': 2, '7to9': 3, '10plus': 4 },
          unit: '%',
          firstFailureFree: 'The first failure to pay on time in a tax year does not count as a default.',
          sixMonths: { value: 5, unit: '%', note: 'An additional 5% if still unpaid after 6 months.' },
          twelveMonths: { value: 5, unit: '%', note: 'A further 5% if still unpaid after 12 months.' },
          interest: 'Daily interest accrues on all unpaid amounts from the due date until payment, separately from the penalties.',
          source: 'HMRC, Late payment penalties for PAYE and National Insurance', checked: '2026-08-08'
        }
      }
    },

    /* ── Reporting and ethics (Outcome 5) ───────────────────────────────────
       No figures here — this outcome is about who to tell, when, and on what
       authority. What IS factual is where the information comes from and what
       the AAT Code requires, so those are recorded and sourced. */
    reporting: {
      /* 5.2.1 — where changes are found. Cadences verified, because "check the
         HMRC website" is not an answer an assessment will accept. */
      sources: [
        { name: 'HMRC Agent Update', what: 'Guidance and news for tax agents and advisers.', cadence: 'Monthly' },
        { name: 'HMRC Employer Bulletin', what: 'Payroll news for employers and agents — rate changes, RTI, deadlines.', cadence: '6 times a year' },
        { name: 'GOV.UK VAT and PAYE guidance', what: 'The notices themselves, updated as the law changes.', cadence: 'Continuous' },
        { name: 'The Finance Act', what: 'The annual statute that changes rates, thresholds and penalties.', cadence: 'Annual' },
        { name: 'AAT — Comment, CPD and technical updates', what: 'Professional-body interpretation and CPD.', cadence: 'Continuous' },
        { name: 'Payroll and accounting software vendors', what: 'Release notes covering legislative changes built into the product.', cadence: 'Per release' }
      ],
      sourcesSource: 'HMRC, Agent Update collection; HMRC, Employer Bulletin collection',
      checked: '2026-08-08',

      /* 5.2.7 — the AAT Code of Professional Ethics. Five fundamental
         principles, shared with the IESBA code the other UK bodies use. */
      ethics: {
        principles: [
          { name: 'Integrity', what: 'Being straightforward and honest in all professional and business relationships.' },
          { name: 'Objectivity', what: 'Not allowing bias, conflict of interest or undue influence to override professional judgement.' },
          { name: 'Professional competence and due care', what: 'Keeping knowledge and skill at the level required, and acting diligently. It includes knowing the limits of your own competence.' },
          { name: 'Confidentiality', what: 'Not disclosing information acquired at work without proper authority, and not using it for personal advantage.' },
          { name: 'Professional behaviour', what: 'Complying with relevant laws and regulations and avoiding conduct that discredits the profession.' }
        ],
        goodFaith: 'A member must act in good faith and exercise care over the facts and information presented to HMRC on behalf of a client or employer. The obligation runs to the accuracy of what is submitted, not merely to following instructions.',
        source: 'AAT Code of Professional Ethics',
        checked: '2026-08-08'
      }
    },

    /* Figures the assessment SUPPLIES rather than expects from memory. Teach the
       method and the fact that a table will be given; do not ship a table that
       will be wrong next year. */
    /* AAT supplies reference material that can be viewed DURING the assessment.
       This is not a minor convenience — it changes what is worth memorising.
       The figures below are all looked up rather than recalled, so revision
       effort belongs on knowing WHICH rule applies and HOW to apply it, not on
       holding the numbers. The rules themselves are still assessed.

       Confirmed against a published Q2022 TPFB mock (Acorn/MarZar, 2025),
       whose model answers cite the reference material by name at each point. */
    PROVIDED_IN_ASSESSMENT: [
      'Fuel scale charge amounts — given by CO2 band and VAT period length.',
      'Flat rate scheme percentages — given by trade sector.',
      'The partial exemption de minimis figures — the £625 monthly average and the 50% proportion.',
      'The conditions for bad debt relief.',
      'The late submission penalty points thresholds and the £200 penalty.',
      'The late payment penalty percentages and the days they apply from.',
      'The late payment interest rate, and the Bank of England base rate it is built on.',
      'The behaviour-based penalty table for errors and for failure to notify.',
      'Income Tax, National Insurance and student loan figures for payroll tasks — the specification excludes calculating these (the exclusion note beneath TPFB 4.1.11–4.1.12).'
    ],

    /* Assessment shape, from a published Q2022 mock. The qualification
       specification does not state a task count, so this is the best evidence
       available and is labelled as such rather than presented as official. */
    ASSESSMENT_SHAPE: {
      tasks: 8,
      marks: 80,
      minutes: 90,
      breakdown: [
        { task: 1, marks: 9, about: 'UK tax law principles, registration and deregistration, special schemes', outcome: 1 },
        { task: 2, marks: 8, about: 'Calculating and accounting for VAT', outcome: 2 },
        { task: 3, marks: 12, about: 'Recovery of input tax', outcome: 2 },
        { task: 4, marks: 8, about: 'Preparing, calculating and adjusting information for VAT returns', outcome: 3 },
        { task: 5, marks: 12, about: 'Verifying VAT returns', outcome: 3 },
        { task: 6, marks: 11, about: 'Record keeping, filing, payment and non-compliance', outcome: 1 },
        { task: 7, marks: 12, about: 'Principles of payroll', outcome: 4 },
        { task: 8, marks: 8, about: 'Reporting information on VAT and payroll', outcome: 5 }
      ],
      roundingInstruction: 'Answers are rounded by normal mathematical rules unless a task says otherwise.',
      /* The `outcome` above is a best-fit mapping, not an AAT tagging. Tasks
         span outcomes — task 4 in particular straddles LO2 and LO3. Mapped this
         way the marks reproduce the published weightings exactly for LO1 (25%),
         LO4 (15%) and LO5 (10%), which is good evidence the shape is real. */
      mappingNote: 'Task-to-outcome mapping is inferred. Tasks deliberately span outcomes, so practice should interleave them.',
      source: 'Acorn/MarZar published Q2022 TPFB mock assessment — indicative, not an AAT publication',
      checked: '2026-08-08'
    }
  };

  /* Convenience for lessons: format a figure with its unit. */
  function fig(node) {
    if (!node) return '';
    if (node.unit === '£') return '£' + Number(node.value).toLocaleString('en-GB');
    if (node.unit === '%' || node.unit === '% per year') return node.value + '%';
    return node.value + (node.unit ? ' ' + node.unit : '');
  }

  /* Every dated figure in the file, for the staleness check in CI. */
  function checkpoints() {
    var out = [];
    (function walk(node, pathStr) {
      if (!node || typeof node !== 'object') return;
      if (node.checked && node.source) out.push({ path: pathStr, checked: node.checked, source: node.source });
      Object.keys(node).forEach(function (k) {
        if (k === 'checked' || k === 'source') return;
        walk(node[k], pathStr ? pathStr + '.' + k : k);
      });
    }(TAX, ''));
    return out;
  }

  var API = { TAX: TAX, fig: fig, checkpoints: checkpoints };
  if (typeof module === 'object' && module.exports) module.exports = API;
  else { root.AAT3_TAX = TAX; root.AAT3_TAX_API = API; }
}(typeof self !== 'undefined' ? self : this));
