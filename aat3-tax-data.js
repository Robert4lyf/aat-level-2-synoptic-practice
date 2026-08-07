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
        source: 'HMRC, VAT registration thresholds', checked: '2026-08-07' }
    },

    schemes: {
      cashAccounting: {
        joinThreshold: { value: 1350000, unit: '£', note: 'Estimated taxable turnover, excluding VAT, for the next 12 months.' },
        leaveThreshold: { value: 1600000, unit: '£', note: 'Annual value of taxable supplies, excluding VAT.' },
        source: 'HMRC, Cash Accounting Scheme (VAT Notice 731)', checked: '2026-08-07'
      },
      annualAccounting: {
        joinThreshold: { value: 1350000, unit: '£', note: 'Estimated taxable supplies, excluding VAT, for the next 12 months.' },
        leaveThreshold: { value: 1600000, unit: '£', note: 'Must leave if turnover exceeds this.' },
        source: 'HMRC, Annual Accounting Scheme (VAT Notice 732)', checked: '2026-08-07'
      },
      flatRate: {
        joinThreshold: { value: 150000, unit: '£', note: 'Estimated taxable turnover, excluding VAT, for the next 12 months.' },
        leaveThreshold: { value: 230000, unit: '£', note: 'Total turnover INCLUDING VAT, tested on the anniversary of joining or if expected in the next 12 months.' },
        source: 'HMRC, Flat Rate Scheme for small businesses (VAT Notice 733)', checked: '2026-08-07',
        note: 'The flat rate percentage itself depends on trade sector and is supplied in the assessment — see PROVIDED_IN_ASSESSMENT.'
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
      source: 'HMRC, Making Tax Digital for VAT; Sending a VAT Return',
      checked: '2026-08-07'
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
