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
        inputTax: 'Input tax is NOT reclaimed — that is the trade for the lower rate.',
        capitalGoodsException: { value: 2000, unit: '£',
          note: 'Input tax MAY be reclaimed on a single purchase of capital expenditure goods costing £2,000 or more including VAT.' },
        firstYearDiscount: { value: 1, unit: '%',
          note: 'A 1% reduction to the sector rate, running until the first anniversary of VAT registration.' },
        limitedCostBusiness: { value: 16.5, unit: '%',
          note: 'A business whose spend on relevant goods is under 2% of flat rate turnover, or over 2% but under £1,000 a year, must use 16.5% whatever its sector.' },
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
      source: 'HMRC, How to correct VAT errors and make adjustments or claims (VAT Notice 700/45)',
      checked: '2026-08-07'
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
          note: 'Points reset to zero only after a period of compliance AND submission of all outstanding returns for the preceding 24 months.' },
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

    /* Figures the assessment SUPPLIES rather than expects from memory. Teach the
       method and the fact that a table will be given; do not ship a table that
       will be wrong next year. */
    PROVIDED_IN_ASSESSMENT: [
      'Fuel scale charge amounts — given by CO2 band and VAT period length.',
      'Flat rate scheme percentages — given by trade sector.',
      'Income Tax, National Insurance and student loan figures for payroll tasks — the specification excludes calculating these (TPFB 4.1.12).'
    ]
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
