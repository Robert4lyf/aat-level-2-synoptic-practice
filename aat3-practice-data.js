/* AAT Level 3 — Tax Processes for Businesses: practice question bank.
 *
 * SEPARATE FROM THE LESSON CHECKS, AND DELIBERATELY SO
 *
 * The questions inside a lesson are formative: they follow the teaching
 * immediately and test whether the card just read was understood. These are
 * different work. They assume the lesson is done, they are not sequenced to
 * follow any particular card, and they are meant to be met cold — which is the
 * only condition under which a right answer means anything.
 *
 * No question here repeats a lesson-check stem. scripts/check-aat3-quality.js
 * enforces that across both files, because a "practice" bank that quietly
 * re-asks the lesson is a bank that measures recall of a page rather than
 * knowledge of a rule.
 *
 * SHAPE
 *
 * Every question carries `unit` (which Level 3 unit it belongs to), `lo` (the
 * outcome within that unit) and `criteria` (the key concepts it tests, checked
 * against aat3-syllabus.js). The `lo` field is what the by-outcome picker
 * filters on; "mix all" ignores it.
 *
 * `unitKey`, and NOT `unit`. On a numeric question `unit` is already the unit of
 * MEASUREMENT — the £ or % the answer is expressed in, which the player prints
 * as the input's placeholder. Twenty-nine questions here carry `unit: '£'`, so
 * a first attempt at tagging this bank by writing `unit: 'tpfb'` was silently
 * overwritten by the later key in the same object literal and dropped all
 * twenty-nine out of the bank. Two meanings, two names.
 *
 * It is stated on every question rather than defaulted, because outcome numbers
 * restart at 1 in each unit: an untagged question would not merely fall out of
 * its own bank, it would be counted inside another unit's outcome 1.
 *
 * Question types are the four the Level 3 player already renders: mcq,
 * numeric, truefalse and gapfill. Figures come from aat3-tax-data.js.
 *
 * A NOTE ON STYLE
 *
 * These lean towards the shapes a published mock actually uses — identify
 * whether each item is or is not X, complete the sentence, compute a figure
 * from a scenario — rather than towards definition recall. The assessment
 * supplies its reference material, so questions that merely ask for a number
 * test the wrong thing.
 */
(function (root) {
  'use strict';

  var T = (typeof require === 'function' && typeof module === 'object')
    ? require('./aat3-tax-data.js').TAX
    : root.AAT3_TAX;

  var money = function (n) { return '£' + Number(n).toLocaleString('en-GB'); };

  var QUESTIONS = [

    /* ── Outcome 1 — legislation (25%) ─────────────────────────────────── */
    {
      id: 'P-1-01', unitKey: 'tpfb', lo: 1, criteria: ['TPFB-1.1.3'],
      type: 'truefalse',
      q: 'Identify whether each supply is taxable for VAT purposes.',
      statements: [
        { text: 'A sale of children’s clothing, zero-rated.', answer: true },
        { text: 'A supply of insurance by a broker.', answer: false },
        { text: 'A sale of domestic fuel at the reduced rate.', answer: true },
        { text: 'Wages paid to an employee.', answer: false },
      ],
      exp: 'Taxable supplies are standard, reduced and zero-rated — zero-rated is taxable at 0%, which is what preserves input tax recovery. Insurance is exempt and wages are outside the scope, and neither is a taxable supply.',
    },
    {
      id: 'P-1-02', unitKey: 'tpfb', lo: 1, criteria: ['TPFB-1.2.1', 'TPFB-1.2.2'],
      type: 'numeric',
      q: 'A business has rolling 12-month sales of £96,000, of which £11,000 is exempt rental income. The rest is standard-rated. What is its taxable turnover for registration purposes, in pounds?',
      answer: 85000, unit: '£',
      exp: money(96000) + ' − ' + money(11000) + ' = ' + money(85000) + '. Only taxable supplies count, and exempt income never does. At ' + money(85000) + ' the business is below the ' + money(T.registration.threshold.value) + ' threshold and need not register — despite total income being above it.',
    },
    {
      id: 'P-1-03', unitKey: 'tpfb', lo: 1, criteria: ['TPFB-1.2.2'],
      type: 'mcq',
      q: 'A business exceeds the rolling 12-month threshold at the end of November. By when must it notify HMRC?',
      opts: [
        '30 December',
        '1 January',
        '31 December',
        '5 December',
      ],
      ans: 0,
      exp: 'Notification under the historic test is due within ' + T.registration.historicTest.notifyWithinDays.value + ' days of the END of the month in which the threshold was passed. Thirty days from 30 November is 30 December. Registration itself takes effect separately, from 1 January.',
    },
    {
      id: 'P-1-04', unitKey: 'tpfb', lo: 1, criteria: ['TPFB-1.2.3'],
      type: 'mcq',
      q: 'Which business has the strongest case for registering for VAT voluntarily?',
      opts: [
        'A bakery selling zero-rated food, with standard-rated costs',
        'A hairdresser selling standard-rated services to private individuals',
        'A driving instructor whose customers are all private individuals',
        'A takeaway selling standard-rated hot food to the general public',
      ],
      ans: 0,
      exp: 'Zero-rated sales mean no VAT is charged to customers, while input tax on costs becomes recoverable — a repayment position with no price impact. The other three sell standard-rated supplies to people who cannot reclaim, so registering would raise their prices by 20% in substance.',
    },
    {
      id: 'P-1-05', unitKey: 'tpfb', lo: 1, criteria: ['TPFB-1.4.1'],
      type: 'numeric',
      q: 'A flat rate scheme business has a sector rate of 14.5% and net standard-rated sales of £48,000 for the quarter. It is in its fifth year of registration. How much VAT is due to HMRC, in pounds?',
      answer: 8352, unit: '£',
      exp: money(48000) + ' × 1.20 = ' + money(57600) + ' VAT-inclusive turnover. ' + money(57600) + ' × 14.5% = £8,352. The flat rate applies to the GROSS figure; applying it to the net would give £6,960. No first-year discount applies in year five.',
    },
    {
      id: 'P-1-06', unitKey: 'tpfb', lo: 1, criteria: ['TPFB-1.4.1', 'TPFB-1.4.3'],
      type: 'truefalse',
      q: 'Identify whether each statement about the special schemes is true or false.',
      statements: [
        { text: 'A business on the flat rate scheme still charges customers VAT at the normal rate.', answer: true },
        { text: 'Cash accounting changes when VAT is accounted for, not how often returns are filed.', answer: true },
        { text: 'A business must leave the annual accounting scheme once turnover exceeds £1,350,000.', answer: false },
        { text: 'A business leaving the flat rate scheme may rejoin immediately.', answer: false },
      ],
      exp: 'The flat rate scheme changes what is paid to HMRC, not what customers are charged. Cash accounting keeps quarterly returns and the usual deadline. The annual accounting LEAVE threshold is ' + money(T.schemes.annualAccounting.leaveThreshold.value) + '; ' + money(T.schemes.annualAccounting.joinThreshold.value) + ' is the join threshold. And there is a 12-month bar on rejoining the flat rate scheme.',
    },
    {
      id: 'P-1-07', unitKey: 'tpfb', lo: 1, criteria: ['TPFB-1.3.3'],
      type: 'mcq',
      q: 'A VAT payment deadline falls on Friday 7 August. The business initiates a Bacs payment on that Friday. What is the position?',
      opts: [
        'The payment is late, because Bacs takes three working days to arrive',
        'The payment is on time, because it was initiated on the deadline day',
        'The payment is on time, because Bacs transfers are treated as same-day',
        'The payment is late, but only if the business also filed its return late',
      ],
      ans: 0,
      exp: 'What the law requires is that cleared funds REACH HMRC by the deadline, not that the instruction was given by then. Bacs takes three working days, so a payment started on the due date arrives late. Faster Payments or CHAPS would have arrived in time.',
    },
    {
      id: 'P-1-08', unitKey: 'tpfb', lo: 1, criteria: ['TPFB-1.1.4'],
      type: 'gapfill',
      q: 'Complete the VAT record-keeping rules.',
      template: 'VAT records must be kept for {0} years, and where Making Tax Digital applies they must be kept {1} with {2} between them.',
      gaps: [
        { options: ['6', '3', '4'], answer: 0 },
        { options: ['digitally', 'on paper', 'in duplicate'], answer: 0 },
        { options: ['digital links', 'manual checks', 'signed reconciliations'], answer: 0 },
      ],
      exp: 'Six years, kept digitally with digital links where MTD applies — meaning data moves between systems without being retyped. The six-year period is longer than the four-year assessment window on purpose, so records still exist when HMRC exercises that power near its limit.',
    },
    {
      id: 'P-1-09', unitKey: 'tpfb', lo: 1, criteria: ['TPFB-1.5.3'],
      type: 'mcq',
      q: 'A business files monthly returns and submits its fifth late return of the tax year. What is the consequence?',
      opts: [
        'It reaches the points threshold and a £' + T.penalties.lateSubmission.penalty.value + ' penalty is charged',
        'It receives a fifth point but no penalty, the monthly threshold being six',
        'A penalty of £' + (T.penalties.lateSubmission.penalty.value * 5) + ' is charged, one for each late return',
        'No penalty arises, because points expire after twelve months of trading',
      ],
      ans: 0,
      exp: 'The threshold for monthly filers is ' + T.penalties.lateSubmission.thresholds.monthly + ' points, so the fifth late return reaches it and triggers the fixed penalty — with a further one for each later late return while at the threshold. Monthly filers get the highest threshold because they file most often.',
    },
    {
      id: 'P-1-10', unitKey: 'tpfb', lo: 1, criteria: ['TPFB-1.5.5'],
      type: 'numeric',
      q: 'A business owes £24,000 of VAT and pays nothing until day 28 after the due date, when it settles in full. What is the total late payment penalty, in pounds? Ignore interest.',
      answer: 720, unit: '£',
      exp: '£24,000 × ' + T.penalties.latePayment.firstPenaltyDay15.value + '% = £720. Day 28 is past the 15-day grace period, so the first element of the first penalty applies — but the debt was cleared before day 30, so the second element never arises and the second penalty, which starts at day 31, never begins.',
    },
    {
      id: 'P-1-11', unitKey: 'tpfb', lo: 1, criteria: ['TPFB-1.5.1', 'TPFB-1.5.2'],
      type: 'mcq',
      q: 'A business should have registered for VAT 14 months ago but did not, and comes forward before HMRC makes any enquiry. Which best describes its position?',
      opts: [
        'It owes the VAT not charged, plus a penalty cut for disclosing unprompted',
        'It owes nothing for the earlier period, and simply registers with effect from today',
        'It owes a fixed penalty only, that being the standard charge for registering late',
        'It owes the VAT, but no penalty can arise at all where the failure was not deliberate',
      ],
      ans: 0,
      exp: 'Liability runs from the date registration fell due, so output tax is owed on sales made since — usually absorbed, since customers will not pay a surcharge afterwards. The penalty is a percentage of that potential lost revenue, and coming forward unprompted reduces it substantially.',
    },
    {
      id: 'P-1-12', unitKey: 'tpfb', lo: 1, criteria: ['TPFB-1.5.4'],
      type: 'truefalse',
      q: 'Identify whether each statement about HMRC assessments is true or false.',
      statements: [
        { text: 'An assessment raised because no return was filed removes the duty to file it.', answer: false },
        { text: 'HMRC may normally assess up to four years back.', answer: true },
        { text: 'An assessment is usually lower than the true liability.', answer: false },
        { text: 'Penalties and interest continue to run while an assessment is outstanding.', answer: true },
      ],
      exp: 'An assessment creates an enforceable debt but the return remains due, and filing it displaces the assessment. The normal limit is four years, extended to twenty for deliberate loss of tax. Assessments are typically HIGHER than the truth, because HMRC will not assume input tax it cannot see.',
    },

    /* ── Outcome 2 — calculate VAT (30%) ───────────────────────────────── */
    {
      id: 'P-2-01', unitKey: 'tpfb', lo: 2, criteria: ['TPFB-2.3.1', 'TPFB-2.3.2'],
      type: 'numeric',
      q: 'Goods are sold for £2,148 including VAT at the standard rate. What is the VAT, in pounds?',
      answer: 358, unit: '£',
      exp: 'At 20% the VAT is one sixth of the gross: £2,148 ÷ 6 = £358. The net is £1,790, and £1,790 × 20% = £358 confirms it. Applying 20% to the gross figure instead would give £429.60 and is the error being tested.',
    },
    {
      id: 'P-2-02', unitKey: 'tpfb', lo: 2, criteria: ['TPFB-2.2.1', 'TPFB-2.2.2'],
      type: 'truefalse',
      q: 'Identify whether each document is valid as evidence for reclaiming input tax.',
      statements: [
        { text: 'A supplier’s VAT invoice showing the supplier’s VAT registration number.', answer: true },
        { text: 'A supplier’s statement of account showing the total owed.', answer: false },
        { text: 'A pro-forma invoice marked “this is not a VAT invoice”.', answer: false },
        { text: 'A simplified VAT invoice for a retail purchase of £180 including VAT.', answer: true },
      ],
      exp: 'Input tax needs a valid VAT invoice. A statement of account and a pro-forma are neither — a pro-forma says so on its face. A simplified invoice is valid for retail supplies up to £250 including VAT.',
    },
    {
      id: 'P-2-03', unitKey: 'tpfb', lo: 2, criteria: ['TPFB-2.2.3', 'TPFB-2.2.4'],
      type: 'mcq',
      q: 'Goods are delivered on 12 May. An invoice is issued on 21 May and paid on 30 June. What is the tax point?',
      opts: [
        '21 May, because the invoice was issued within 14 days of the basic tax point',
        '12 May, because the basic tax point is always the date the goods were delivered',
        '30 June, because the tax point follows the date on which payment was received',
        '11 June, being exactly 30 days after the goods were physically delivered',
      ],
      ans: 0,
      exp: 'The basic tax point is 12 May, but an invoice issued within ' + T.invoicing.actualTaxPointDays.value + ' days after it overrides it. 21 May is nine days later, so the invoice date becomes the actual tax point. Payment date is irrelevant here — the business is not on cash accounting.',
    },
    {
      id: 'P-2-04', unitKey: 'tpfb', lo: 2, criteria: ['TPFB-2.3.5', 'TPFB-2.3.6'],
      type: 'truefalse',
      q: 'Identify whether input tax may be reclaimed on each item.',
      statements: [
        { text: 'A car bought for a sales representative, available for private use.', answer: false },
        { text: 'A van used only for deliveries.', answer: true },
        { text: 'Entertaining a customer at a restaurant.', answer: false },
        { text: 'Repairs to a vehicle used partly for business.', answer: true },
      ],
      exp: 'Input tax on a car available for any private use is blocked outright, and client entertaining is blocked. Commercial vehicles such as vans are recoverable, and VAT on repairs and maintenance is recoverable where there is some business use.',
    },
    {
      id: 'P-2-05', unitKey: 'tpfb', lo: 2, criteria: ['TPFB-2.3.7'],
      type: 'numeric',
      q: 'A partially exempt business has total input tax of £7,500 for the quarter, of which £1,800 relates to exempt supplies. How much input tax is recoverable, in pounds?',
      answer: 7500, unit: '£',
      exp: '£1,800 ÷ 3 = £600 a month, which is at or below the £' + T.partialExemption.deMinimisPerMonth.value + ' limit. £1,800 is 24% of £7,500, below 50%. BOTH limbs pass, so the business is de minimis and recovers everything — all £7,500.',
    },
    {
      id: 'P-2-06', unitKey: 'tpfb', lo: 2, criteria: ['TPFB-2.3.4'],
      type: 'numeric',
      q: 'An invoice is raised for £5,000 net with a 2% prompt payment discount, which the customer takes. What is the VAT finally due, in pounds?',
      answer: 980, unit: '£',
      exp: '£5,000 × 2% = £100 discount, leaving £4,900 actually paid. £4,900 × 20% = £980. VAT follows the consideration actually received, so the £1,000 originally invoiced is reduced by £20.',
    },
    {
      id: 'P-2-07', unitKey: 'tpfb', lo: 2, criteria: ['TPFB-2.3.9'],
      type: 'mcq',
      q: 'An invoice was due for payment on 1 March. On what date does it first become eligible for bad debt relief, assuming it has been written off?',
      opts: [
        '1 September',
        '1 June',
        '1 March the following year',
        '1 April',
      ],
      ans: 0,
      exp: 'The debt must be at least ' + T.badDebtRelief.debtAgeMonths.value + ' months overdue, measured from the later of the due date and the date of supply. Six months from 1 March is 1 September. The claim must then be made within four years and six months.',
    },
    {
      id: 'P-2-08', unitKey: 'tpfb', lo: 2, criteria: ['TPFB-2.3.8'],
      type: 'numeric',
      q: 'A quarterly fuel scale charge of £402 applies. What amount is added to output tax, in pounds?',
      answer: 67, unit: '£',
      exp: 'The scale charge is VAT-inclusive, so the VAT is one sixth: £402 ÷ 6 = £67. It is added to output tax, increasing the VAT payable. The scale charge amounts themselves are supplied in the assessment’s reference material.',
    },
    {
      id: 'P-2-09', unitKey: 'tpfb', lo: 2, criteria: ['TPFB-2.3.10', 'TPFB-2.3.15'],
      type: 'mcq',
      q: 'A partially exempt business imports goods under postponed VAT accounting. What is the effect on its VAT return?',
      opts: [
        'Declared in Box 1 but only partly recovered in Box 4, so a cost arises',
        'The Box 1 and Box 4 entries cancel exactly, as they would for a fully taxable business',
        'No entry is required in either box, given that no VAT was actually paid at the border',
        'The VAT is recovered in Box 4 only, with nothing at all declared in Box 1',
      ],
      ans: 0,
      exp: 'Postponed accounting declares and recovers the same figure, so it nets to nil only for a business that could recover the VAT anyway. A partially exempt business cannot recover it all, so the Box 4 entry is smaller than the Box 1 entry and the difference is a genuine cost.',
    },
    {
      id: 'P-2-10', unitKey: 'tpfb', lo: 2, criteria: ['TPFB-2.3.13'],
      type: 'numeric',
      q: 'For a quarter: output tax on sales £27,400; credit notes issued carrying £900 of VAT; input tax on purchases £14,200, including £340 on client entertaining; bad debt relief £610. What is the VAT payable, in pounds?',
      answer: 12030, unit: '£',
      exp: 'Output tax £27,400 − £900 = £26,500. Input tax £14,200 − £340 blocked + £610 relief = £14,470. Payable = £26,500 − £14,470 = £12,030. The entertaining VAT comes out because it is already inside the purchases figure, and bad debt relief is added as input tax rather than deducted from output tax.',
    },
    {
      id: 'P-2-11', unitKey: 'tpfb', lo: 2, criteria: ['TPFB-2.1.1', 'TPFB-2.1.2'],
      type: 'mcq',
      q: 'Which figure should be used as the starting point for output tax on cash sales made through a till?',
      opts: [
        'The gross daily takings, from which VAT is extracted',
        'The net sales figure shown in the annual accounts',
        'The amount banked, after cash expenses paid out of the till',
        'The total of customer receipts recorded in the sales ledger',
      ],
      ans: 0,
      exp: 'Till takings are VAT-inclusive, so the VAT is extracted from the gross figure. Using the banked amount would understate sales by whatever was paid out in cash, and a retailer’s cash sales do not pass through the sales ledger at all.',
    },
    {
      id: 'P-2-12', unitKey: 'tpfb', lo: 2, criteria: ['TPFB-2.3.3'],
      type: 'gapfill',
      q: 'Complete the two VAT fractions.',
      template: 'At the standard rate the VAT in a gross figure is {0} of it. At the reduced rate it is {1} of the gross.',
      gaps: [
        { options: ['one sixth', 'one fifth', 'one quarter'], answer: 0 },
        { options: ['one twenty-first', 'one twentieth', 'one nineteenth'], answer: 0 },
      ],
      exp: 'At 20% the gross is 120% of net, so VAT is 20/120 = one sixth. At 5% the gross is 105% of net, so VAT is 5/105 = one twenty-first. Both cancel down, which is why they are worth learning as fractions.',
    },

    /* ── Outcome 3 — review and verify (20%) ───────────────────────────── */
    {
      id: 'P-3-01', unitKey: 'tpfb', lo: 3, criteria: ['TPFB-3.1.1', 'TPFB-3.1.2'],
      type: 'numeric',
      q: 'A business finds it under-declared output tax by £11,800 and over-declared output tax by £3,100 in earlier periods. What is the net error, in pounds?',
      answer: 8700, unit: '£',
      exp: '£11,800 owed to HMRC less £3,100 owed to the business = £8,700 net. That is below the ' + money(T.errorCorrection.netErrorLimit.value) + ' limit, so it may be corrected on the next return — even though the larger of the two errors was above it.',
    },
    {
      id: 'P-3-02', unitKey: 'tpfb', lo: 3, criteria: ['TPFB-3.1.3'],
      type: 'mcq',
      q: 'A business finds a net error of £31,000. Its Box 6 figure for the period of discovery is £2,400,000. The error was careless. Which method applies?',
      opts: [
        'Method 2 — the error exceeds 1% of the Box 6 figure',
        'Method 1 — the error is below the £50,000 absolute ceiling',
        'Method 1 — errors are only notifiable above £50,000',
        'Method 2 — every error above £10,000 must be separately notified',
      ],
      ans: 0,
      exp: '1% of £2,400,000 is £24,000, and £31,000 exceeds it. The second limb fails, so Method 2 is required even though the error is below the ' + money(T.errorCorrection.absoluteCeiling.value) + ' ceiling. Both limbs must be satisfied.',
    },
    {
      id: 'P-3-03', unitKey: 'tpfb', lo: 3, criteria: ['TPFB-3.1.4'],
      type: 'truefalse',
      q: 'Identify whether each error must be separately notified to HMRC.',
      statements: [
        { text: 'A deliberate under-declaration of £900.', answer: true },
        { text: 'A careless net error of £4,300 for a business with Box 6 of £500,000.', answer: false },
        { text: 'A careless net error of £62,000.', answer: true },
        { text: 'An error discovered six years after the period it relates to.', answer: false },
      ],
      exp: 'Deliberate errors are always Method 2, whatever the size. £4,300 is under ' + money(T.errorCorrection.netErrorLimit.value) + ' so it goes on the next return. £62,000 exceeds the ' + money(T.errorCorrection.absoluteCeiling.value) + ' ceiling. And an error six years back cannot be corrected at all — the limit is four years — so it is not a notification question.',
    },
    {
      id: 'P-3-04', unitKey: 'tpfb', lo: 3, criteria: ['TPFB-3.1.5', 'TPFB-3.1.6'],
      type: 'numeric',
      q: 'A purchase invoice for £8,400 including standard-rate VAT was omitted from a previous return. By how much does correcting it change the VAT payable, in pounds?',
      answer: 1400, unit: '£',
      exp: '£8,400 ÷ 6 = £1,400 of input tax never reclaimed. Input tax was under-claimed, so the correction REDUCES the VAT payable by £1,400. A missed sales invoice of the same value would move it the other way.',
    },
    {
      id: 'P-3-05', unitKey: 'tpfb', lo: 3, criteria: ['TPFB-3.2.1'],
      type: 'truefalse',
      q: 'Identify whether each item belongs in Box 6 of the VAT return.',
      statements: [
        { text: 'The net value of zero-rated export sales.', answer: true },
        { text: 'The net value of exempt rental income.', answer: true },
        { text: 'The VAT charged on standard-rated sales.', answer: false },
        { text: 'Wages paid to employees.', answer: false },
      ],
      exp: 'Box 6 is the net value of ALL outputs excluding VAT, so zero-rated and exempt sales belong there despite carrying no VAT. The VAT itself goes in Box 1, not Box 6, and wages are outside the scope entirely.',
    },
    {
      id: 'P-3-06', unitKey: 'tpfb', lo: 3, criteria: ['TPFB-3.2.1'],
      type: 'mcq',
      q: 'Which item must be excluded from Box 7?',
      opts: [
        'PAYE and National Insurance paid to HMRC',
        'Goods imported during the period',
        'Client entertaining, on which input tax was blocked',
        'Standard-rated purchases from UK suppliers',
      ],
      ans: 0,
      exp: 'PAYE and NI are outside the scope of VAT and never appear in Box 7. Imports and ordinary purchases do belong there, and so does blocked expenditure — the input tax is irrecoverable in Box 4, but the purchase still happened.',
    },
    {
      id: 'P-3-07', unitKey: 'tpfb', lo: 3, criteria: ['TPFB-3.2.3', 'TPFB-3.2.4'],
      type: 'mcq',
      q: 'A wholly standard-rated trader’s return shows Box 6 of £310,000 and Box 1 of £62,000. What does the check suggest?',
      opts: [
        'The figures are consistent — Box 1 is 20% of Box 6 as expected',
        'Box 1 is too high, and output tax has probably been double-counted',
        'Box 1 is too low, suggesting sales have been omitted from Box 6',
        'Nothing can be inferred, since the two boxes are unrelated',
      ],
      ans: 0,
      exp: '£310,000 × 20% = £62,000, so the ratio is exactly right for a wholly standard-rated trader. This single check is the most productive review test available, and it passes here.',
    },
    {
      id: 'P-3-08', unitKey: 'tpfb', lo: 3, criteria: ['TPFB-3.2.4'],
      type: 'truefalse',
      q: 'Identify whether each difference between the VAT return and the accounting records is legitimate.',
      statements: [
        { text: 'A tax point falling in a different period from the ledger entry.', answer: true },
        { text: 'A business on cash accounting whose return follows receipts.', answer: true },
        { text: 'Input tax claimed on a car available for private use.', answer: false },
        { text: 'A prior-period error corrected under Method 1.', answer: true },
      ],
      exp: 'Timing differences, cash accounting and Method 1 corrections all produce differences by design. Input tax on a car available for private use is blocked, so that one is an error rather than a reconciling item.',
    },
    {
      id: 'P-3-09', unitKey: 'tpfb', lo: 3, criteria: ['TPFB-3.2.6'],
      type: 'numeric',
      q: 'A VAT control account shows a credit balance of £21,300. A fuel scale charge of £96 was included in the return but never posted, and bad debt relief of £740 was claimed on the return but not posted. What should Box 5 show, in pounds?',
      answer: 20656, unit: '£',
      exp: '£21,300 + £96 − £740 = £20,656. The fuel scale charge is additional output tax and raises the liability; bad debt relief is claimed as input tax and reduces it. Both were on the return but not in the ledger.',
    },
    {
      id: 'P-3-10', unitKey: 'tpfb', lo: 3, criteria: ['TPFB-3.2.5'],
      type: 'mcq',
      q: 'A reviewer checking a return finds Box 5 does not equal Box 3 minus Box 4. What should they do first?',
      opts: [
        'Stop and investigate — a structural error voids every later check',
        'Check the ratio of Box 1 to Box 6 carefully before looking at anything else',
        'Reconcile the return to the VAT control account to locate the difference',
        'Submit the return anyway and correct it on the next one under Method 1',
      ],
      ans: 0,
      exp: 'Structure comes first. If the boxes do not combine correctly then the return was assembled wrongly, and examining ratios or reconciling figures that were not added up properly tells you nothing. Fix the structure, then check the content.',
    },
    {
      id: 'P-3-11', unitKey: 'tpfb', lo: 3, criteria: ['TPFB-3.2.2'],
      type: 'gapfill',
      q: 'Complete the treatment of an import under postponed VAT accounting.',
      template: 'Import VAT under postponed accounting is declared in Box {0}, recovered in Box {1}, and the net value of the goods is entered in Box {2}.',
      gaps: [
        { options: ['1', '4', '6'], answer: 0 },
        { options: ['4', '1', '7'], answer: 0 },
        { options: ['7', '6', '9'], answer: 0 },
      ],
      exp: 'Declared in Box 1 and recovered in Box 4 — the same figure both times — with the net value of the goods in Box 7. For a fully taxable business the two VAT entries cancel and no cash moves.',
    },
    {
      id: 'P-3-12', unitKey: 'tpfb', lo: 3, criteria: ['TPFB-3.1.6'],
      type: 'mcq',
      q: 'A reviewer finds a careless error and the business discloses it only after HMRC opens an enquiry. What is the minimum penalty percentage?',
      opts: [
        '15% of the potential lost revenue',
        '0% of the potential lost revenue',
        '10% of the potential lost revenue',
        '30% of the potential lost revenue',
      ],
      ans: 0,
      exp: 'Errors in a return fall under the inaccuracy regime, where a careless error carries a maximum of ' + T.errorCorrection.penaltyForError.careless.max + '% reduced to a minimum of ' + T.errorCorrection.penaltyForError.careless.promptedMin + '% on a prompted disclosure. Unprompted, it can fall to ' + T.errorCorrection.penaltyForError.careless.unpromptedMin + '%. The 10% figure belongs to the separate failure-to-notify regime.',
    },

    /* ── Outcome 4 — payroll (15%) ─────────────────────────────────────── */
    {
      id: 'P-4-01', unitKey: 'tpfb', lo: 4, criteria: ['TPFB-4.1.6'],
      type: 'numeric',
      q: 'An employee has gross pay of £3,450 and contributes 6% of gross to a pension under a net pay arrangement. What is the taxable gross pay, in pounds?',
      answer: 3243, unit: '£',
      exp: '£3,450 × 6% = £207. £3,450 − £207 = £3,243. Only deductions made before tax is calculated reduce taxable gross pay — Income Tax, National Insurance and student loan repayments do not.',
    },
    {
      id: 'P-4-02', unitKey: 'tpfb', lo: 4, criteria: ['TPFB-4.1.6', 'TPFB-4.1.12'],
      type: 'numeric',
      q: 'Gross pay is £2,880. Deductions are pension £144 (pre-tax), Income Tax £389, National Insurance £212, and a season ticket loan repayment of £75. What is the net pay, in pounds?',
      answer: 2060, unit: '£',
      exp: '£2,880 − £144 − £389 − £212 − £75 = £2,060. Net pay is gross less every deduction, before or after tax. The pension comes off once — deducting it a second time is the classic error in this calculation.',
    },
    {
      id: 'P-4-03', unitKey: 'tpfb', lo: 4, criteria: ['TPFB-4.1.11'],
      type: 'numeric',
      q: 'A payroll shows PAYE £6,150, employee NI £2,780, employer NI £3,420, student loan repayments £185, and employee pension contributions £1,600. How much is due to HMRC, in pounds?',
      answer: 12535, unit: '£',
      exp: '£6,150 + £2,780 + £3,420 + £185 = £12,535. Employer’s NI is included even though it never appears as a payslip deduction. The pension contributions go to the pension provider and are excluded.',
    },
    {
      id: 'P-4-04', unitKey: 'tpfb', lo: 4, criteria: ['TPFB-4.1.7', 'TPFB-4.1.8'],
      type: 'truefalse',
      q: 'Identify whether each deduction is statutory.',
      statements: [
        { text: 'PAYE Income Tax.', answer: true },
        { text: 'A charitable donation under payroll giving.', answer: false },
        { text: 'Student loan repayments.', answer: true },
        { text: 'Repayment of a salary advance to the employer.', answer: false },
      ],
      exp: 'Statutory deductions are required by law: PAYE, National Insurance, student loan repayments and auto-enrolment pension contributions. Payroll giving and a salary advance repayment happen only because the employee agreed to them.',
    },
    {
      id: 'P-4-05', unitKey: 'tpfb', lo: 4, criteria: ['TPFB-4.2.1', 'TPFB-4.2.2'],
      type: 'mcq',
      q: 'An employee leaves on 14 October. Which form must the employer produce?',
      opts: [
        'A P45',
        'A P60',
        'A starter checklist',
        'A P11D',
      ],
      ans: 0,
      exp: 'A P45 is issued when an employee leaves, recording pay and tax to that date so the next employer can operate the right code. A P60 goes to those still employed at 5 April, and a starter checklist is completed by a new employee without a P45.',
    },
    {
      id: 'P-4-06', unitKey: 'tpfb', lo: 4, criteria: ['TPFB-4.2.2'],
      type: 'gapfill',
      q: 'A tax year has just ended. Complete the sequence of employer deadlines that follows.',
      template: 'P60s go to employees by {0}. P11Ds and P11D(b)s are due by {1}. Class 1A National Insurance must reach HMRC electronically by {2}.',
      gaps: [
        { options: ['31 May', '6 July', '19 July'], answer: 0 },
        { options: ['6 July', '31 May', '22 July'], answer: 0 },
        { options: ['22 July', '6 July', '31 May'], answer: 0 },
      ],
      exp: 'The tax year ends 5 April, P60s follow by 31 May, benefits are reported by 6 July, and the Class 1A NIC is paid by 22 July electronically — 19 July by cheque.',
    },
    {
      id: 'P-4-07', unitKey: 'tpfb', lo: 4, criteria: ['TPFB-4.2.4', 'TPFB-4.2.5'],
      type: 'truefalse',
      q: 'Identify whether each item is reported on the Full Payment Submission.',
      statements: [
        { text: 'Pay and deductions for each employee paid in the period.', answer: true },
        { text: 'Details of a new starter joining the business.', answer: true },
        { text: 'The Employment Allowance claimed by the employer.', answer: false },
        { text: 'Statutory maternity pay recovered from HMRC.', answer: false },
      ],
      exp: 'The FPS reports what was paid, including starters, leavers and changes of detail. Amounts that REDUCE what the employer owes — the Employment Allowance, statutory pay recovered — belong on the Employer Payment Summary instead.',
    },
    {
      id: 'P-4-08', unitKey: 'tpfb', lo: 4, criteria: ['TPFB-4.2.7'],
      type: 'mcq',
      q: 'An employer pays PAYE electronically. By what date must the payment reach HMRC?',
      opts: [
        'The 22nd of the following month',
        'The 19th of the following month',
        'The last working day of the following month',
        'Within 30 days of the end of the tax month',
      ],
      ans: 0,
      exp: 'Electronic payments are due by the 22nd of the following month, non-electronic by the 19th. The same split applies to the Class 1A National Insurance deadline in July.',
    },
    {
      id: 'P-4-09', unitKey: 'tpfb', lo: 4, criteria: ['TPFB-4.2.8'],
      type: 'mcq',
      q: 'An employer with 120 employees files an FPS late for the second time in a tax year. What penalty applies?',
      opts: [
        '£300 for the month, being the band for 50 to 249 employees',
        'Nothing, because the first two failures in a tax year are excused',
        '£200 for the month, the penalty being based on the amount of tax due',
        '5% of the tax that should have been reported on the return',
      ],
      ans: 0,
      exp: 'Late filing penalties are scaled by headcount, and 120 employees falls in the 50 to 249 band. Only the FIRST failure in a tax year is excused, so the second is charged. The 5% charge applies once a return is more than three months late.',
    },
    {
      id: 'P-4-10', unitKey: 'tpfb', lo: 4, criteria: ['TPFB-4.1.5'],
      type: 'truefalse',
      q: 'Identify whether each record must be kept by an employer.',
      statements: [
        { text: 'Tax code notices received from HMRC.', answer: true },
        { text: 'Records of employee leave and sickness absence.', answer: true },
        { text: 'Payments made to HMRC.', answer: true },
        { text: 'Personal bank statements of the business owner.', answer: false },
      ],
      exp: 'Payroll records include what was paid, the deductions made, reports and payments to HMRC, absence records, tax code notices and taxable benefits. The owner’s personal banking is not a payroll record.',
    },
    {
      id: 'P-4-11', unitKey: 'tpfb', lo: 4, criteria: ['TPFB-4.2.3'],
      type: 'mcq',
      q: 'What is the main effect for the employee of payrolling benefits rather than reporting them on a P11D?',
      opts: [
        'The tax is collected in real time, not via a later tax code change',
        'The benefit becomes exempt from Income Tax once it is taxed at source',
        'The employer bears the tax on the benefit instead of the employee doing so',
        'No Class 1A National Insurance is due on a benefit that has been payrolled',
      ],
      ans: 0,
      exp: 'Payrolling spreads the tax across the year alongside ordinary pay, so the employee pays as they go and avoids a tax code adjustment later. The benefit remains taxable, the employee still bears the tax, and Class 1A NIC is still due via the P11D(b).',
    },
    {
      id: 'P-4-12', unitKey: 'tpfb', lo: 4, criteria: ['TPFB-4.1.10'],
      type: 'mcq',
      q: 'Which action is the clearest breach of data protection principles in a payroll context?',
      opts: [
        'Leaving printed payslips where any colleague can read them',
        'Keeping records of sickness absence as required for statutory sick pay',
        'Restricting payroll system access to the two staff who operate it',
        'Retaining payroll records for three years after the end of the tax year',
      ],
      ans: 0,
      exp: 'Leaving payslips on view breaches the security principle and discloses pay data to people with no need to know. Keeping absence records is required, restricted access is exactly what security demands, and three-year retention is the rule.',
    },

    /* ── Outcome 5 — reporting (10%) ───────────────────────────────────── */
    {
      id: 'P-5-01', unitKey: 'tpfb', lo: 5, criteria: ['TPFB-5.1.1'],
      type: 'mcq',
      q: 'A technician calculates that an unusually large VAT payment will fall due next month. Who should be told first?',
      opts: [
        'Whoever manages the cash',
        'HMRC, ahead of the return',
        'The company’s bank',
        'Nobody — it will show on the return',
      ],
      ans: 0,
      exp: 'A large, dated, non-negotiable outflow has to be budgeted for, and whoever controls cash cannot plan for a payment they do not know about. HMRC learns the figure from the return in the normal way.',
    },
    {
      id: 'P-5-02', unitKey: 'tpfb', lo: 5, criteria: ['TPFB-5.1.2'],
      type: 'truefalse',
      q: 'Identify whether each query should be referred to a line manager rather than answered directly.',
      statements: [
        { text: 'Whether a partial exemption special method should be adopted.', answer: true },
        { text: 'The date this quarter’s VAT return is due.', answer: false },
        { text: 'Whether an error appears to have been made deliberately.', answer: true },
        { text: 'Whether to disclose an error to HMRC.', answer: true },
      ],
      exp: 'A special method, a judgement about somebody’s intent, and a disclosure decision all carry consequences beyond the figures. A filing deadline is a matter of fact that any technician should answer directly.',
    },
    {
      id: 'P-5-03', unitKey: 'tpfb', lo: 5, criteria: ['TPFB-5.1.3'],
      type: 'mcq',
      q: 'Why does a rapidly growing business face particular VAT cash-flow risk?',
      opts: [
        'Its liability rises as cash is tied up in stock and receivables',
        'HMRC requires growing businesses to pay monthly rather than quarterly',
        'Growth removes eligibility for the cash accounting scheme immediately',
        'The VAT rate applied increases once turnover passes a set threshold',
      ],
      ans: 0,
      exp: 'More sales mean more output tax, and growth usually absorbs working capital at the same time. The quarter after a boom brings the largest payment the business has faced, which is why growth is a cash-flow risk and not only a benefit.',
    },
    {
      id: 'P-5-04', unitKey: 'tpfb', lo: 5, criteria: ['TPFB-5.1.4'],
      type: 'mcq',
      q: 'Which is the most useful way to communicate a VAT payment deadline to the finance manager?',
      opts: [
        'The date, the amount and the consequence — sent well ahead',
        'A note that the VAT return is due at some point in the coming month',
        'A copy of the completed VAT return, forwarded without comment',
        'A reminder sent on the deadline day itself, to ensure it is fresh',
      ],
      ans: 0,
      exp: 'A useful deadline communication says what is due, when, how much and what follows from missing it — and arrives with time to act. A reminder on the day is technically a communication and practically useless.',
    },
    {
      id: 'P-5-05', unitKey: 'tpfb', lo: 5, criteria: ['TPFB-5.2.1'],
      type: 'gapfill',
      q: 'Complete the publication frequencies.',
      template: 'HMRC publishes Agent Update {0}, and the Employer Bulletin {1}.',
      gaps: [
        { options: ['monthly', 'weekly', 'quarterly'], answer: 0 },
        { options: ['six times a year', 'monthly', 'annually'], answer: 0 },
      ],
      exp: 'Agent Update is monthly and aimed at agents and advisers; the Employer Bulletin appears six times a year and carries payroll news. Both can be subscribed to by email, which is what turns keeping current from a task into something that arrives.',
    },
    {
      id: 'P-5-06', unitKey: 'tpfb', lo: 5, criteria: ['TPFB-5.2.2'],
      type: 'mcq',
      q: 'Why should a return be authorised before it is submitted to HMRC?',
      opts: [
        'It is the business’s declaration, and it bears the consequences',
        'HMRC will reject any return that has not been formally authorised beforehand',
        'Authorisation transfers responsibility for the figures away from the preparer',
        'It is a courtesy only, and carries no particular professional significance',
      ],
      ans: 0,
      exp: 'The return commits the business and exposes it to penalties, so whoever is accountable is entitled to see it first. The approval is also a genuine last check by someone who may know something the preparer does not.',
    },
    {
      id: 'P-5-07', unitKey: 'tpfb', lo: 5, criteria: ['TPFB-5.2.3'],
      type: 'truefalse',
      q: 'Identify whether each statement about confidentiality is true or false.',
      statements: [
        { text: 'The duty continues after the employment ends.', answer: true },
        { text: 'A legally required disclosure overrides the duty.', answer: true },
        { text: 'Information may be used for personal advantage if it is never disclosed.', answer: false },
        { text: 'A senior manager is automatically entitled to any payroll information.', answer: false },
      ],
      exp: 'Confidentiality survives the end of the relationship and covers both disclosure and use for personal advantage. It yields to a legal requirement, such as money laundering reporting. Seniority is not the same as a legitimate need to know.',
    },
    {
      id: 'P-5-08', unitKey: 'tpfb', lo: 5, criteria: ['TPFB-5.2.5', 'TPFB-5.2.7'],
      type: 'mcq',
      q: 'An employer instructs a technician to submit a return the technician believes overstates input tax. What does the AAT Code require?',
      opts: [
        'Raise it, escalate if unresolved, and do not submit a wrong return',
        'Submit it, since the employer takes responsibility for its own declaration to HMRC',
        'Submit it, then report the employer to HMRC without telling them it has happened',
        'Resign immediately, on the basis that the position cannot be resolved internally',
      ],
      ans: 0,
      exp: 'Integrity does not yield to instruction, and the obligation runs to the accuracy of what is submitted. The Code expects the matter raised, escalated and documented, with advice from AAT if it stays unresolved. Reporting behind the employer’s back is not the first step.',
    },
    {
      id: 'P-5-09', unitKey: 'tpfb', lo: 5, criteria: ['TPFB-5.2.4'],
      type: 'mcq',
      q: 'Which fundamental principle requires a technician to keep up with changes in tax law?',
      opts: [
        'Professional competence and due care',
        'Objectivity',
        'Professional behaviour',
        'Integrity',
      ],
      ans: 0,
      exp: 'Professional competence and due care requires competence to be maintained, not merely attained. Knowledge correct when acquired does not stay correct, and a superseded figure sounds exactly as authoritative as a current one.',
    },
    {
      id: 'P-5-10', unitKey: 'tpfb', lo: 5, criteria: ['TPFB-5.2.6'],
      type: 'mcq',
      q: 'Payroll software has not been updated for the new tax year. What is the most likely result?',
      opts: [
        'Plausible but incorrect deductions across the whole workforce until noticed',
        'The software refuses to process the payroll at all until it has been updated',
        'HMRC rejects the Full Payment Submission and returns an error to the employer',
        'Deductions remain correct, because HMRC recalculates them all on receipt',
      ],
      ans: 0,
      exp: 'Stale software does not fail visibly. It applies last year’s rules consistently and produces figures that look entirely normal, which is why updates must be applied before the change takes effect rather than after.',
    },
    {
      id: 'P-5-11', unitKey: 'tpfb', lo: 5, criteria: ['TPFB-5.1.5'],
      type: 'mcq',
      q: 'A VAT rate change takes effect in six weeks. What should the technician’s communication to the directors contain?',
      opts: [
        'The change, its effect on this business, what must be done and by when',
        'A link to the HMRC guidance page announcing the change',
        'A full explanation of the tax point rules governing straddling supplies',
        'Confirmation once the change has taken effect and the position is certain',
      ],
      ans: 0,
      exp: 'Facts without consequences are not advice. The directors need to know how much of turnover is affected, what has to change, who does it and by when. The tax point mechanism matters to whoever implements it, not to the people deciding on pricing.',
    },
    {
      id: 'P-5-12', unitKey: 'tpfb', lo: 5, criteria: ['TPFB-5.1.7'],
      type: 'truefalse',
      q: 'Identify whether each is an appropriate payroll communication.',
      statements: [
        { text: 'Explaining to a manager why the amount due to HMRC exceeds the deductions shown on payslips.', answer: true },
        { text: 'Telling a colleague what another employee earns, when asked directly.', answer: false },
        { text: 'Warning the finance manager ahead of the April rate changes.', answer: true },
        { text: 'Explaining to an employee why their pension deduction reduced their taxable pay.', answer: true },
      ],
      exp: 'Explaining the employer’s NI, flagging April changes ahead of the first payday, and explaining a payslip to the person it belongs to are all appropriate. Disclosing a colleague’s pay is not, whoever is asking.',
    },

    /* ── Expansion ───────────────────────────────────────────────────────────
       Written to close the concepts the first 60 left untouched, and weighted
       towards the outcomes that carry the most marks. */

    /* ── Outcome 1 ─────────────────────────────────────────────────────── */
    {
      id: 'P-1-13', unitKey: 'tpfb', lo: 1, criteria: ['TPFB-1.1.1', 'TPFB-1.1.2'],
      type: 'truefalse',
      q: 'Identify whether each statement about the nature of VAT is true or false.',
      statements: [
        { text: 'VAT is ultimately borne by the registered business that charges it.', answer: false },
        { text: 'A registered business making only standard-rated supplies bears the VAT it charges.', answer: false },
        { text: 'A business making only exempt supplies bears the VAT on its costs.', answer: true },
        { text: 'HMRC administers VAT under the Value Added Tax Act 1994.', answer: true },
      ],
      exp: 'VAT is a tax on consumer spending. It passes through a registered business — charged on sales, recovered on purchases — until it reaches someone who cannot reclaim. Usually that is a private individual, but an exempt business is in exactly the same position and absorbs the cost.',
    },
    {
      id: 'P-1-14', unitKey: 'tpfb', lo: 1, criteria: ['TPFB-1.1.5'],
      type: 'mcq',
      q: 'HMRC arranges a compliance visit to inspect a business’s VAT records. What is the position?',
      opts: [
        'This is routine compliance work and HMRC has a statutory right of inspection',
        'HMRC may only inspect records where it already suspects an error',
        'The business may refuse entry unless HMRC obtains a court order first',
        'Inspection rights apply only to businesses using Making Tax Digital',
      ],
      ans: 0,
      exp: 'HMRC may inspect records and enter business premises at a reasonable time. Most visits are arranged in advance and are ordinary compliance work rather than an allegation — the powers exist because the business is holding public money, not because it is suspected of anything.',
    },
    {
      id: 'P-1-15', unitKey: 'tpfb', lo: 1, criteria: ['TPFB-1.3.1'],
      type: 'mcq',
      q: 'A VAT quarter ends on 31 January. When are the return and the payment due?',
      opts: [
        '7 March',
        '28 February',
        '7 February',
        '31 March',
      ],
      ans: 0,
      exp: 'One calendar month and seven days after the period end. One calendar month from 31 January is 28 February, and seven days further is 7 March. Note that "one calendar month" is not thirty days — counting 37 days would give the wrong answer here.',
    },
    {
      id: 'P-1-16', unitKey: 'tpfb', lo: 1, criteria: ['TPFB-1.3.2'],
      type: 'mcq',
      q: 'Which business gains least from moving to monthly VAT returns?',
      opts: [
        'A restaurant with standard-rated sales and standard-rated costs',
        'A book publisher whose sales are almost entirely zero-rated',
        'An exporter selling exclusively to customers outside the UK',
        'A children’s clothing wholesaler with standard-rated overheads',
      ],
      ans: 0,
      exp: 'Monthly returns accelerate repayments, so they help a repayment trader — a zero-rated supplier or an exporter. A business that pays VAT over gains nothing but twelve filings a year instead of four, and twelve opportunities to be late.',
    },
    {
      id: 'P-1-17', unitKey: 'tpfb', lo: 1, criteria: ['TPFB-1.3.4'],
      type: 'truefalse',
      q: 'Identify whether each statement about Making Tax Digital is true or false.',
      statements: [
        { text: 'Returns must be filed from software authorised to connect to HMRC.', answer: true },
        { text: 'Copying a figure by hand between two systems satisfies the digital links requirement.', answer: false },
        { text: 'Underlying records must be kept digitally, not only the return.', answer: true },
        { text: 'A business may still type its figures into an HMRC web form.', answer: false },
      ],
      exp: 'MTD requires functional compatible software, authorised in advance, plus digital records with digital links — meaning no manual retyping anywhere in the chain. The web form route is closed. The practical effect is that a wrong figure at source reaches HMRC with nobody having looked at it.',
    },
    {
      id: 'P-1-18', unitKey: 'tpfb', lo: 1, criteria: ['TPFB-1.4.2'],
      type: 'mcq',
      q: 'A business on annual accounting makes nine monthly interim payments. What percentage of the previous year’s liability is each one?',
      opts: [
        '10%',
        '25%',
        '9%',
        '11.1%',
      ],
      ans: 0,
      exp: 'Nine monthly instalments of 10% each, due at the end of months 4 to 12. The alternative is three quarterly instalments of 25%, due at the end of months 4, 7 and 10. Either way a balancing payment follows with the annual return.',
    },
    {
      id: 'P-1-19', unitKey: 'tpfb', lo: 1, criteria: ['TPFB-1.4.2'],
      type: 'mcq',
      q: 'When is the annual accounting scheme return and balancing payment due?',
      opts: [
        'Two months after the end of the VAT year',
        'One month and seven days after the end of the VAT year',
        'On the last day of the VAT year',
        'Three months after the end of the VAT year',
      ],
      ans: 0,
      exp: 'Annual accounting uses a two-month deadline for both, not the one month and seven days that applies to quarterly returns. Carrying the quarterly deadline across to the annual scheme is a common and easily avoided error.',
    },
    {
      id: 'P-1-20', unitKey: 'tpfb', lo: 1, criteria: ['TPFB-1.4.1'],
      type: 'numeric',
      q: 'A business joins the flat rate scheme in its first year of VAT registration. Its sector rate is 12%. What percentage does it actually apply?',
      answer: 11, unit: '%',
      exp: 'A 1% discount applies during the first year of VAT registration, so 12% − 1% = 11%. The discount runs until the first anniversary of registration, not the first anniversary of joining the scheme.',
    },
    {
      id: 'P-1-21', unitKey: 'tpfb', lo: 1, criteria: ['TPFB-1.5.6'],
      type: 'mcq',
      q: 'A business corrects a £70,000 net error on its next return instead of notifying HMRC separately. What is the consequence?',
      opts: [
        'A further failure, penalised separately from the original error',
        'No consequence, because the tax has been correctly accounted for',
        'The correction is void and the error remains outstanding',
        'HMRC will issue an assessment for double the amount involved',
      ],
      ans: 0,
      exp: 'Using the wrong method is a failure in its own right, even though the tax ends up right and HMRC loses nothing. The notification requirement exists so HMRC can see the scale and pattern of errors — an error buried in a return is invisible, and that is what is being protected.',
    },
    {
      id: 'P-1-22', unitKey: 'tpfb', lo: 1, criteria: ['TPFB-1.5.7'],
      type: 'truefalse',
      q: 'Identify whether each consequence follows from wrongly recovering input tax.',
      statements: [
        { text: 'The input tax is disallowed and becomes repayable.', answer: true },
        { text: 'Interest runs from the date the VAT was wrongly recovered.', answer: true },
        { text: 'A penalty depends on whether the recovery was careless or deliberate.', answer: true },
        { text: 'HMRC is limited to the period in which the error was found.', answer: false },
      ],
      exp: 'Wrongly recovered input tax is repayable with interest from when it was taken, and the penalty turns on behaviour. HMRC may look back over earlier periods too — normally four years, and twenty where tax was lost deliberately — which is what makes a systemic error expensive.',
    },
    {
      id: 'P-1-23', unitKey: 'tpfb', lo: 1, criteria: ['TPFB-1.2.3'],
      type: 'mcq',
      q: 'A business expects its taxable turnover for the next 12 months to be £81,000. What may it do?',
      opts: [
        'Apply to deregister, being below the deregistration threshold',
        'It must deregister immediately, having fallen below the threshold',
        'Nothing — deregistration depends on the previous 12 months',
        'It must remain registered until turnover falls below £50,000',
      ],
      ans: 0,
      exp: 'Voluntary deregistration is available where taxable turnover for the NEXT 12 months is expected to fall below ' + money(T.registration.deregistrationThreshold.value) + '. It is a forward-looking test and it is permissive, not compulsory — HMRC may also refuse the application.',
    },
    {
      id: 'P-1-24', unitKey: 'tpfb', lo: 1, criteria: ['TPFB-1.5.3'],
      type: 'gapfill',
      q: 'Complete the late submission points thresholds.',
      template: 'An annual filer reaches the threshold at {0} points, a quarterly filer at {1}, and a monthly filer at {2}.',
      gaps: [
        { options: ['2', '4', '5'], answer: 0 },
        { options: ['4', '2', '5'], answer: 0 },
        { options: ['5', '4', '2'], answer: 0 },
      ],
      exp: 'Two, four and five. The threshold rises with filing frequency, because a business filing twelve times a year has more opportunities to slip than one filing once. The thresholds are supplied in the assessment’s reference material.',
    },

    /* ── Outcome 2 ─────────────────────────────────────────────────────── */
    {
      id: 'P-2-13', unitKey: 'tpfb', lo: 2, criteria: ['TPFB-2.3.11'],
      type: 'numeric',
      q: 'Domestic fuel is supplied for a net £3,400 at the reduced rate. What is the VAT, in pounds?',
      answer: 170, unit: '£',
      exp: '£3,400 × 5% = £170. The reduced rate applies to domestic fuel and power. Working forward from a net figure the rate applies directly — the one twenty-first fraction is only for extracting VAT from a gross amount.',
    },
    {
      id: 'P-2-14', unitKey: 'tpfb', lo: 2, criteria: ['TPFB-2.3.12'],
      type: 'numeric',
      q: 'A supply is made for £9,540 including VAT at the standard rate. What is the net value, in pounds?',
      answer: 7950, unit: '£',
      exp: 'The VAT is one sixth of the gross: £9,540 ÷ 6 = £1,590. The net is £9,540 − £1,590 = £7,950. Checking backwards, £7,950 × 20% = £1,590, which confirms it.',
    },
    {
      id: 'P-2-15', unitKey: 'tpfb', lo: 2, criteria: ['TPFB-2.1.3', 'TPFB-2.1.4'],
      type: 'truefalse',
      q: 'Identify whether each source is acceptable evidence for the figures on a VAT return.',
      statements: [
        { text: 'The sales daybook, agreed to the invoices behind it.', answer: true },
        { text: 'A supplier’s VAT invoice held by the business.', answer: true },
        { text: 'A figure remembered by the person who raised the invoice.', answer: false },
        { text: 'A customer’s emailed statement of what they believe they owe.', answer: false },
      ],
      exp: 'Figures must come from original, verified sources the business holds. Daybooks agreed to underlying invoices and the invoices themselves qualify; recollection and a counterparty’s own summary do not, because neither can be checked against anything.',
    },
    {
      id: 'P-2-16', unitKey: 'tpfb', lo: 2, criteria: ['TPFB-2.1.5'],
      type: 'mcq',
      q: 'What is the main VAT benefit of using accounting software rather than manual records?',
      opts: [
        'It applies the rate held against each item consistently and flags anomalies',
        'It removes the need to hold VAT invoices for purchases',
        'It guarantees the VAT return will be correct before submission',
        'It exempts the business from the digital record-keeping rules',
      ],
      ans: 0,
      exp: 'Software applies rates consistently and can flag duplicates, gaps in invoice numbering and unusual values. What it cannot do is judge whether the rate it was given is the right one — it will apply a wrong rate perfectly, on every transaction, which is why review still matters.',
    },
    {
      id: 'P-2-17', unitKey: 'tpfb', lo: 2, criteria: ['TPFB-2.2.5'],
      type: 'truefalse',
      q: 'Identify whether each statement about electronic invoicing is true or false.',
      statements: [
        { text: 'An electronic invoice must contain the same particulars as a paper one.', answer: true },
        { text: 'The authenticity and integrity of the content must be assured.', answer: true },
        { text: 'Electronic invoices need not be retained, since they can be regenerated.', answer: false },
        { text: 'The customer must agree to receive invoices electronically.', answer: true },
      ],
      exp: 'An electronic invoice carries the same particulars and the same retention obligation as a paper one, with authenticity and integrity assured. It also depends on the customer agreeing to receive invoices that way — a supplier cannot impose the format unilaterally.',
    },
    {
      id: 'P-2-18', unitKey: 'tpfb', lo: 2, criteria: ['TPFB-2.3.14'],
      type: 'numeric',
      q: 'Output tax before adjustments is £18,600. A fuel scale charge of £360 applies and a credit note carrying £540 of VAT was issued. What is the adjusted output tax, in pounds?',
      answer: 18120, unit: '£',
      exp: 'The scale charge is VAT-inclusive, so it adds £360 ÷ 6 = £60 of output tax. The credit note reduces output tax by £540. £18,600 + £60 − £540 = £18,120. Adding the whole £360 instead of its VAT element is the trap.',
    },
    {
      id: 'P-2-19', unitKey: 'tpfb', lo: 2, criteria: ['TPFB-2.3.6'],
      type: 'numeric',
      q: 'Purchase invoices carry £9,400 of input tax, including £220 on client entertaining and £180 on a van used solely for deliveries. How much input tax is recoverable, in pounds?',
      answer: 9180, unit: '£',
      exp: '£9,400 − £220 = £9,180. Client entertaining is blocked. The van is a commercial vehicle used only for business, so its £180 is recoverable and stays in — removing it as well would give £9,000 and is the error being tested.',
    },
    {
      id: 'P-2-20', unitKey: 'tpfb', lo: 2, criteria: ['TPFB-2.3.7'],
      type: 'numeric',
      q: 'A partially exempt business has total input tax of £5,400 for a quarter, of which £2,900 relates to exempt supplies. How much input tax is recoverable, in pounds?',
      answer: 2500, unit: '£',
      exp: '£2,900 ÷ 3 = £966.67 a month, above the £' + T.partialExemption.deMinimisPerMonth.value + ' limit, so the first limb fails. It is also 53.7% of total input tax, so the second limb fails too. The exempt input tax is blocked: £5,400 − £2,900 = £2,500.',
    },
    {
      id: 'P-2-21', unitKey: 'tpfb', lo: 2, criteria: ['TPFB-2.2.3'],
      type: 'mcq',
      q: 'A deposit is received on 3 April for goods delivered on 20 May, with the balance invoiced on 25 May. What is the tax point for the deposit?',
      opts: [
        '3 April',
        '20 May',
        '25 May',
        'There is no tax point for a deposit',
      ],
      ans: 0,
      exp: 'A payment received in advance of supply creates a tax point for the amount received, on the date of receipt. So the deposit belongs to the April period and the balance to May — one transaction, two tax points. Security deposits, which are refundable, are different.',
    },
    {
      id: 'P-2-22', unitKey: 'tpfb', lo: 2, criteria: ['TPFB-2.3.9'],
      type: 'numeric',
      q: 'A business writes off a debt of £4,320 including VAT at the standard rate, six months overdue. How much bad debt relief may it claim, in pounds?',
      answer: 720, unit: '£',
      exp: '£4,320 ÷ 6 = £720. The relief is the VAT element of the written-off debt, and it is claimed as input tax rather than as a reduction of output tax. The debt must be at least ' + T.badDebtRelief.debtAgeMonths.value + ' months overdue and written off in the refunds for bad debts account.',
    },
    {
      id: 'P-2-23', unitKey: 'tpfb', lo: 2, criteria: ['TPFB-2.3.10'],
      type: 'mcq',
      q: 'A UK business exports goods to a customer in Australia. How is the sale treated?',
      opts: [
        'Zero-rated, with the net value included in Box 6',
        'Standard-rated, with VAT charged to the overseas customer',
        'Exempt, with no entry required anywhere on the return',
        'Outside the scope, with no entry required anywhere on the return',
      ],
      ans: 0,
      exp: 'Exports are zero-rated, so no VAT is charged and Box 1 is unaffected — but the net value still belongs in Box 6 like any other zero-rated sale. An exporter omitting exports from Box 6 would report almost nothing there while reclaiming substantial input tax.',
    },
    {
      id: 'P-2-24', unitKey: 'tpfb', lo: 2, criteria: ['TPFB-2.3.13'],
      type: 'numeric',
      q: 'Output tax £31,200; credit notes issued carrying £1,100 of VAT; input tax £16,800 including £460 blocked; bad debt relief £380. What is the VAT payable, in pounds?',
      answer: 13380, unit: '£',
      exp: 'Output tax £31,200 − £1,100 = £30,100. Input tax £16,800 − £460 + £380 = £16,720. Payable = £30,100 − £16,720 = £13,380.',
    },
    {
      id: 'P-2-25', unitKey: 'tpfb', lo: 2, criteria: ['TPFB-2.3.4'],
      type: 'numeric',
      q: 'An invoice for £7,500 net offers a 3% prompt payment discount. The customer does NOT take it and pays in full. What VAT is due, in pounds?',
      answer: 1500, unit: '£',
      exp: '£7,500 × 20% = £1,500. VAT follows the consideration actually received, and the customer paid the full amount, so no adjustment arises. The discount only reduces the VAT if it is actually taken.',
    },
    {
      id: 'P-2-26', unitKey: 'tpfb', lo: 2, criteria: ['TPFB-2.2.1'],
      type: 'mcq',
      q: 'Within what period must a VAT invoice normally be issued?',
      opts: [
        '30 days of the basic tax point',
        '14 days of the basic tax point',
        '7 days of the basic tax point',
        '3 months of the basic tax point',
      ],
      ans: 0,
      exp: 'A VAT invoice must normally be issued within ' + T.invoicing.issueWithinDays.value + ' days of the basic tax point. The ' + T.invoicing.actualTaxPointDays.value + '-day rule is a different thing — an invoice issued within 14 days AFTER the basic tax point moves the tax point to the invoice date.',
    },
    {
      id: 'P-2-27', unitKey: 'tpfb', lo: 2, criteria: ['TPFB-2.3.13'],
      type: 'numeric',
      q: 'In the year to date a firm has given one client goods costing £28 excluding VAT, then a second gift of goods costing £26 excluding VAT, reclaiming input tax on both. What output tax must now be accounted for, in pounds?',
      answer: 10.8, unit: '£',
      exp: 'The cost of gifts to one person over 12 months is a running total: £28 + £26 = £54, which is over the £' + T.gifts.goodsLimit.value + ' limit. Output tax is therefore due on the WHOLE cost of the series, not the excess: £54 × 20% = £10.80, added to Box 1.',
    },

    /* ── Outcome 3 ─────────────────────────────────────────────────────── */
    {
      id: 'P-3-13', unitKey: 'tpfb', lo: 3, criteria: ['TPFB-3.1.2'],
      type: 'numeric',
      q: 'A business discovers a net error of £18,000. Its Box 6 figure for the period of discovery is £2,000,000. What is 1% of Box 6, in pounds?',
      answer: 20000, unit: '£',
      exp: '£2,000,000 × 1% = £20,000. The £18,000 error is below that and below the ' + money(T.errorCorrection.absoluteCeiling.value) + ' ceiling, so Method 1 applies and it may be corrected on the next return.',
    },
    {
      id: 'P-3-14', unitKey: 'tpfb', lo: 3, criteria: ['TPFB-3.1.1'],
      type: 'truefalse',
      q: 'Identify whether each error may be corrected on the next return.',
      statements: [
        { text: 'A careless net error of £2,400.', answer: true },
        { text: 'A deliberate net error of £600.', answer: false },
        { text: 'A careless net error of £58,000 for a business with Box 6 of £9,000,000.', answer: false },
        { text: 'A careless net error of £9,800.', answer: true },
      ],
      exp: 'Errors of ' + money(T.errorCorrection.netErrorLimit.value) + ' or less always qualify, so £2,400 and £9,800 do. A deliberate error never qualifies, whatever its size. And £58,000 exceeds the ' + money(T.errorCorrection.absoluteCeiling.value) + ' ceiling, so the 1% test cannot rescue it however large the business.',
    },
    {
      id: 'P-3-15', unitKey: 'tpfb', lo: 3, criteria: ['TPFB-3.1.6'],
      type: 'mcq',
      q: 'What is the effect of a large Method 1 correction on the period in which it is made?',
      opts: [
        'The whole correction lands in that period’s liability at once',
        'The correction is spread evenly across the following four returns',
        'The correction appears as a separate line on the face of the return',
        'HMRC issues a revised assessment for the original period instead',
      ],
      ans: 0,
      exp: 'Method 1 folds the correction into the ordinary figures of one return, so a year of under-declaration arrives as a single amount on one due date. Only the VAT account shows it separately — which is why an unexplained jump in a period’s liability is worth investigating.',
    },
    {
      id: 'P-3-16', unitKey: 'tpfb', lo: 3, criteria: ['TPFB-3.2.1'],
      type: 'numeric',
      q: 'Box 1 is £24,600, Box 2 is nil and Box 4 is £15,850. What figure goes in Box 5, in pounds?',
      answer: 8750, unit: '£',
      exp: 'Box 3 = Box 1 + Box 2 = £24,600. Box 5 = Box 3 − Box 4 = £24,600 − £15,850 = £8,750 payable. Boxes 3 and 5 are calculated rather than entered.',
    },
    {
      id: 'P-3-17', unitKey: 'tpfb', lo: 3, criteria: ['TPFB-3.2.2'],
      type: 'truefalse',
      q: 'Identify whether each statement about imports and exports on the return is true or false.',
      statements: [
        { text: 'The net value of exports belongs in Box 6.', answer: true },
        { text: 'Import VAT under postponed accounting appears in Box 1 and Box 4.', answer: true },
        { text: 'The net value of imported goods belongs in Box 7.', answer: true },
        { text: 'Exports increase the figure in Box 1.', answer: false },
      ],
      exp: 'Exports are zero-rated: nothing in Box 1, but the net value in Box 6. Postponed accounting declares and recovers the same figure in Boxes 1 and 4, with the goods’ net value in Box 7.',
    },
    {
      id: 'P-3-18', unitKey: 'tpfb', lo: 3, criteria: ['TPFB-3.2.4'],
      type: 'mcq',
      q: 'A reconciliation is out by £180, and an invoice was posted as £1,530 rather than £1,350. What does this indicate?',
      opts: [
        'A transposition — the difference is divisible by 9',
        'A duplicated invoice somewhere in the period',
        'A missing credit note of exactly £180',
        'An arithmetic slip in the VAT control account total',
      ],
      ans: 0,
      exp: '£1,530 − £1,350 = £180, and any transposition of two digits produces a difference divisible by 9. Sizing the difference and looking at its shape usually names the cause faster than searching transaction by transaction.',
    },
    {
      id: 'P-3-19', unitKey: 'tpfb', lo: 3, criteria: ['TPFB-3.2.5'],
      type: 'mcq',
      q: 'A wholly standard-rated trader reports Box 6 of £180,000 and Box 1 of £54,000. What is the likely explanation?',
      opts: [
        'Box 1 is too high — output tax has probably been overstated',
        'The figures are consistent for a standard-rated trader',
        'Box 6 has been overstated by including VAT in the figure',
        'The business must have made substantial zero-rated sales',
      ],
      ans: 0,
      exp: '£180,000 × 20% = £36,000, so £54,000 is far too high — 30% of Box 6. Zero-rated sales would push Box 1 DOWN relative to Box 6, not up, so that cannot explain it. Something has inflated output tax.',
    },
    {
      id: 'P-3-20', unitKey: 'tpfb', lo: 3, criteria: ['TPFB-3.2.6'],
      type: 'numeric',
      q: 'A VAT control account shows a credit balance of £7,900. Blocked input tax of £140 was debited to the account but correctly excluded from the return. What should Box 5 show, in pounds?',
      answer: 8040, unit: '£',
      exp: '£7,900 + £140 = £8,040. The blocked input tax wrongly reduced the ledger liability by £140, so reversing it raises the figure. Subtracting it instead is the classic direction error in this reconciliation.',
    },

    /* ── Outcome 4 ─────────────────────────────────────────────────────── */
    {
      id: 'P-4-13', unitKey: 'tpfb', lo: 4, criteria: ['TPFB-4.1.1', 'TPFB-4.1.2'],
      type: 'truefalse',
      q: 'Identify whether each statement about who operates payroll is true or false.',
      statements: [
        { text: 'A company whose only worker is its sole director is exempt from operating payroll.', answer: false },
        { text: 'HMRC is the relevant tax authority for payroll as well as for VAT.', answer: true },
        { text: 'A household employing a nanny is an employer for payroll purposes.', answer: true },
        { text: 'Payroll obligations begin once a business has five or more employees.', answer: false },
      ],
      exp: 'Employing anyone at all makes a business an employer, including a sole director of their own company and a household employing domestic staff. There is no headcount threshold, and HMRC administers payroll on the same statutory footing as VAT.',
    },
    {
      id: 'P-4-14', unitKey: 'tpfb', lo: 4, criteria: ['TPFB-4.1.3', 'TPFB-4.1.4'],
      type: 'truefalse',
      q: 'Identify whether HMRC has each power in relation to payroll.',
      statements: [
        { text: 'To require an employer to register before the first payday.', answer: true },
        { text: 'To inspect payroll records and visit business premises.', answer: true },
        { text: 'To require submissions on a fixed calendar.', answer: true },
        { text: 'To set the wage an employer pays its staff.', answer: false },
      ],
      exp: 'HMRC may require registration, prescribed records, submissions on a fixed calendar and payment by statutory deadlines, and may inspect and visit. What people are paid is a matter between employer and employee — subject to employment law, not to HMRC.',
    },
    {
      id: 'P-4-15', unitKey: 'tpfb', lo: 4, criteria: ['TPFB-4.1.9'],
      type: 'mcq',
      q: 'How far in advance of paying staff may a business register as an employer?',
      opts: [
        'No more than two months',
        'No more than six months',
        'At any time, with no limit',
        'Only in the tax year in which it starts trading',
      ],
      ans: 0,
      exp: 'Registration must happen before the first payday and cannot be made more than two months ahead. The window is narrow at both ends, and the employer PAYE reference that follows is needed before any submission can be filed.',
    },
    {
      id: 'P-4-16', unitKey: 'tpfb', lo: 4, criteria: ['TPFB-4.1.5'],
      type: 'gapfill',
      q: 'Complete the payroll record-keeping rule.',
      template: 'Payroll records must be kept for {0} years from the end of the {1} they relate to, and failing to keep them can bring an estimated assessment plus a penalty of up to £{2}.',
      gaps: [
        { options: ['3', '6', '4'], answer: 0 },
        { options: ['tax year', 'calendar year', 'VAT quarter'], answer: 0 },
        { options: ['3,000', '500', '200'], answer: 0 },
      ],
      exp: 'Three years from the end of the tax year — shorter than the six years for VAT records, and the two are examined in the same paper. HMRC may both estimate what is owed and charge up to £' + T.payroll.records.penalty.value.toLocaleString('en-GB') + '.',
    },
    {
      id: 'P-4-17', unitKey: 'tpfb', lo: 4, criteria: ['TPFB-4.2.6'],
      type: 'mcq',
      q: 'An employee’s home address changes. When must this be reported to HMRC?',
      opts: [
        'On the next Full Payment Submission',
        'Immediately, on a separate notification',
        'At the end of the tax year, on the P60',
        'Only if the employee also changes tax code',
      ],
      ans: 0,
      exp: 'The FPS carries changes to employee details alongside pay and deductions, and is submitted on or before each payday. Starters, leavers and changes of detail all travel on it — there is no separate notification for them.',
    },
    {
      id: 'P-4-18', unitKey: 'tpfb', lo: 4, criteria: ['TPFB-4.1.11'],
      type: 'numeric',
      q: 'An employee works 150 hours at £13.20 and 8 hours of overtime at time and a half. What is the gross pay, in pounds?',
      answer: 2138.40, unit: '£',
      exp: 'Basic: 150 × £13.20 = £1,980. Overtime: 8 × £13.20 × 1.5 = £158.40. Gross pay = £1,980 + £158.40 = £2,138.40. Overtime at time and a half means 1.5 times the basic hourly rate, not 1.5 times the hours.',
    },
    {
      id: 'P-4-19', unitKey: 'tpfb', lo: 4, criteria: ['TPFB-4.2.8'],
      type: 'mcq',
      q: 'An employer pays PAYE late for the fifth time in a tax year. What penalty percentage applies?',
      opts: [
        '2% of the amount paid late',
        '1% of the amount paid late',
        '3% of the amount paid late',
        '5% of the amount paid late',
      ],
      ans: 0,
      exp: 'The first failure in a tax year is not a default. Defaults 1 to 3 carry 1%, defaults 4 to 6 carry 2%. The fifth late payment is the fourth default, so 2% applies. The rate escalates with repetition rather than with elapsed time — the opposite of the VAT regime.',
    },

    /* ── Outcome 5 ─────────────────────────────────────────────────────── */
    {
      id: 'P-5-13', unitKey: 'tpfb', lo: 5, criteria: ['TPFB-5.1.6'],
      type: 'mcq',
      q: 'A business is considering starting to export. What VAT effect should be communicated to the directors?',
      opts: [
        'Exports are zero-rated, so the business may move into a repayment position',
        'Exports are exempt, so input tax on related costs becomes irrecoverable',
        'Exports are standard-rated, so overseas customers must be charged 20%',
        'Exports are outside the scope, so they need not appear on the return',
      ],
      ans: 0,
      exp: 'Exports are zero-rated: no output tax, but input tax remains fully recoverable, so a substantial exporter often moves into repayment. That in turn makes monthly returns worth considering — which is exactly the kind of consequence a director needs told.',
    },
    {
      id: 'P-5-14', unitKey: 'tpfb', lo: 5, criteria: ['TPFB-5.1.6'],
      type: 'truefalse',
      q: 'Identify whether each is appropriate information to provide about an error that has been found.',
      statements: [
        { text: 'The size of the error and which periods it affects.', answer: true },
        { text: 'Whether it meets the conditions for correction on the next return.', answer: true },
        { text: 'The penalty exposure and how disclosure affects it.', answer: true },
        { text: 'A decision to disclose, taken by the technician alone.', answer: false },
      ],
      exp: 'Size, periods, method and exposure are all information the person with authority needs in order to decide. The decision itself is theirs — it affects the business’s relationship with HMRC and may turn on whether the error was deliberate, which is a judgement about people.',
    },
    {
      id: 'P-5-15', unitKey: 'tpfb', lo: 5, criteria: ['TPFB-5.1.3'],
      type: 'numeric',
      q: 'A business sets aside VAT as it collects it. In a quarter it makes standard-rated sales of £240,000 net. How much output tax should it have set aside, in pounds?',
      answer: 48000, unit: '£',
      exp: '£240,000 × 20% = £48,000. Setting it aside as it is collected is the practical defence against spending money that belongs to the Exchequer — the VAT sits in the current account looking exactly like the business’s own cash until the return falls due.',
    },
    {
      id: 'P-5-16', unitKey: 'tpfb', lo: 5, criteria: ['TPFB-5.2.5'],
      type: 'mcq',
      q: 'A technician is offered a bonus by a client for keeping the VAT liability as low as possible. Which principle is most directly threatened?',
      opts: [
        'Objectivity',
        'Confidentiality',
        'Professional behaviour',
        'Professional competence and due care',
      ],
      ans: 0,
      exp: 'A financial interest in a particular outcome is a self-interest threat to objectivity — the risk that judgement is influenced by something other than the facts. Integrity would be engaged too if the technician acted on it, but the threat arises the moment the incentive exists.',
    },

    /* ── Exam-shaped tasks ───────────────────────────────────────────────
       One dataset, several answers, and rows in the dataset that do not
       belong in any of them.

       Every other question in this bank hands over the figures it wants
       operated on: already classified, already converted, none of them
       spare. That trains the arithmetic and nothing else — and the
       arithmetic is the easy half. What the assessment actually asks is
       which rows count, which are excluded from which box, and which are
       not a taxable supply at all. Those decisions are invisible in a
       question that has already made them for you.

       So the rows here are deliberately mixed: wages and local authority
       rates that stay out of Box 7, client entertaining that goes into
       Box 7 while its VAT stays out of Box 4, exempt and zero-rated sales
       that belong in Box 6 despite carrying no output tax, and a credit
       note that reduces rather than adds. The figures are net, so the
       conversion is the reader's to make.

       Numbered from T- rather than P-, so the bank a question came from is
       readable in a progress record without a lookup. */
    {
      id: 'T-1-01', unitKey: 'tpfb', lo: 1,
      criteria: ['TPFB-1.2.1', 'TPFB-1.2.2', 'TPFB-1.2.3'],
      type: 'task',
      q: 'Decide whether this business must register for VAT, and by when.',
      brief: 'The business began trading on 1 April and is not yet registered. Figures are monthly, exclusive of VAT.',
      datasets: [
        {
          title: 'Income for the twelve months to 31 March',
          headers: ['Month', 'Standard £', 'Zero £', 'Exempt £', 'Assets £'],
          rows: [
            ['Apr', '6,200.00', '900.00', '400.00', '—'],
            ['May', '5,800.00', '1,100.00', '400.00', '—'],
            ['Jun', '7,400.00', '800.00', '400.00', '—'],
            ['Jul', '6,900.00', '1,300.00', '400.00', '—'],
            ['Aug', '8,100.00', '700.00', '400.00', '—'],
            ['Sep', '7,200.00', '950.00', '400.00', '—'],
            ['Oct', '6,600.00', '1,050.00', '400.00', '—'],
            ['Nov', '9,300.00', '1,200.00', '400.00', '14,000.00'],
            ['Dec', '11,400.00', '1,500.00', '400.00', '—'],
            ['Jan', '5,900.00', '850.00', '400.00', '—'],
            ['Feb', '6,100.00', '1,000.00', '400.00', '—'],
            ['Mar', '8,700.00', '1,150.00', '400.00', '—'],
          ],
          note: 'The Assets column is the sale of a delivery van in November. Exempt income is rent from a flat above the workshop.',
        },
      ],
      parts: [
        {
          label: 'Taxable turnover for the twelve months to 31 March',
          type: 'numeric', unit: '£', answer: 102100,
          exp: 'Standard-rated and zero-rated income both count, and nothing else does: 89,600.00 + 12,500.00 = £102,100.00. Zero-rated supplies are taxable at ' + T.rates.zero.value + '%, so they push a business towards registration even though they carry no VAT.',
        },
        {
          label: 'Exempt income for the same twelve months',
          type: 'numeric', unit: '£', answer: 4800,
          exp: 'Twelve months of rent at 400.00 is £4,800.00. Exempt income is not a taxable supply, so it plays no part in the threshold test — but it does make the business partly exempt once it registers, which is a separate problem.',
        },
        {
          label: 'At the end of which month did taxable turnover first exceed the threshold?',
          type: 'choice',
          options: ['February', 'December', 'January', 'March'],
          answer: 0,
          exp: 'The rolling total reaches 85,150.00 at the end of January and 92,250.00 at the end of February, so February is the month it is crossed. December is what you get by counting the van: the proceeds of a capital asset are excluded from the test, and including them puts the total over at 92,400.00 two months early.',
        },
        {
          label: 'By what date must HMRC be notified?',
          type: 'choice',
          options: ['30 March', '30 April', '28 February', '1 April'],
          answer: 0,
          exp: 'The historic test allows ' + T.registration.historicTest.notifyWithinDays.value + ' days from the END of the month in which the threshold was crossed. February ends on the 28th, so notification is due by 30 March. The clock runs from the month end, not from the day the total happened to tip over.',
        },
        {
          label: 'From what date is the business registered?',
          type: 'choice',
          options: ['1 April', '1 March', '30 March', '1 May'],
          answer: 0,
          exp: 'Registration takes effect from the first day of the second month after the threshold was exceeded — February, then March, then 1 April. Notifying and being registered are two different dates, and VAT must be accounted for from the second even if the first was met late.',
        },
      ],
      exp: 'Three decisions sit behind one threshold: what counts as taxable turnover, when the rolling total crossed it, and which of the two dates that follow is which. The van is the trap — a capital asset is excluded from the test, and counting it moves the crossing two months earlier and every date with it.',
    },
    {
      id: 'T-2-01', unitKey: 'tpfb', lo: 2,
      criteria: ['TPFB-2.3.11', 'TPFB-2.3.12', 'TPFB-2.3.13', 'TPFB-3.2.5'],
      type: 'task',
      q: 'Complete the VAT return for the quarter ended 31 March.',
      brief: 'All amounts in the day books are **net of VAT**. The business is registered and accounts for VAT on the invoice basis.',
      datasets: [
        {
          title: 'Sales day book — quarter ended 31 March',
          headers: ['Date', 'Customer', 'Net £', 'Rate'],
          rows: [
            ['12 Jan', 'Ashdown Ltd', '14,600.00', 'Standard'],
            ['28 Jan', 'Brayford Care Homes', '5,200.00', 'Exempt'],
            ['09 Feb', 'Calder & Co', '8,400.00', 'Standard'],
            ['21 Feb', 'Dunmore Foods', '3,750.00', 'Zero'],
            ['06 Mar', 'Ashdown Ltd — credit note', '(1,200.00)', 'Standard'],
            ['19 Mar', 'Eastgate Ltd', '6,050.00', 'Standard'],
          ],
        },
        {
          title: 'Purchases day book — quarter ended 31 March',
          headers: ['Date', 'Supplier or expense', 'Net £', 'Rate'],
          rows: [
            ['15 Jan', 'Farrow Supplies', '9,300.00', 'Standard'],
            ['02 Feb', 'Local authority rates', '2,400.00', 'Outside the scope'],
            ['17 Feb', 'Greenway Motors — client entertaining', '880.00', 'Standard'],
            ['25 Feb', 'Halstead Ltd', '4,120.00', 'Standard'],
            ['11 Mar', 'Wages', '18,500.00', 'Outside the scope'],
            ['22 Mar', 'Ivory Print', '1,530.00', 'Zero'],
          ],
        },
      ],
      parts: [
        {
          label: 'Box 1 — VAT due on sales and other outputs',
          type: 'numeric', unit: '£', answer: 5570,
          exp: 'Only the standard-rated lines carry output tax, and the credit note reduces them: 14,600.00 + 8,400.00 − 1,200.00 + 6,050.00 = 27,850.00 net, and at ' + T.rates.standard.value + '% that is £5,570.00. The exempt and zero-rated sales carry none.',
        },
        {
          label: 'Box 4 — VAT reclaimed on purchases and other inputs',
          type: 'numeric', unit: '£', answer: 2684,
          exp: 'Standard-rated purchases are 9,300.00 + 880.00 + 4,120.00, but the VAT on client entertaining is blocked, so only 9,300.00 + 4,120.00 = 13,420.00 is recoverable. At ' + T.rates.standard.value + '% that is £2,684.00.',
        },
        {
          label: 'Box 5 — net VAT to pay HMRC',
          type: 'numeric', unit: '£', answer: 2886,
          exp: 'Box 3 less Box 4. Box 3 is Box 1 plus Box 2, and there are no acquisitions here, so Box 3 is £5,570.00 and the net figure is 5,570.00 − 2,684.00 = £2,886.00.',
        },
        {
          label: 'Box 6 — total value of sales, excluding VAT',
          type: 'numeric', unit: '£', answer: 36800,
          exp: 'Box 6 takes every output, not only the taxed ones: 27,850.00 standard-rated after the credit note, plus 3,750.00 zero-rated, plus 5,200.00 exempt, is £36,800.00. Leaving the exempt sale out is the common error, and it is the one figure a reviewer can check against the accounts.',
        },
        {
          label: 'Box 7 — total value of purchases, excluding VAT',
          type: 'numeric', unit: '£', answer: 15830,
          exp: 'Wages and local authority rates are both left out of Box 7. What remains is 9,300.00 + 880.00 + 4,120.00 + 1,530.00 = £15,830.00 — the entertaining is a purchase and belongs here even though its VAT does not reach Box 4.',
        },
        {
          label: 'The client entertaining of £880.00 net — how is it treated?',
          type: 'choice',
          options: [
            'Included in Box 7, and its VAT is not reclaimed in Box 4',
            'Left out of Box 7, and its VAT is not reclaimed in Box 4',
            'Included in Box 7, and its VAT is reclaimed in Box 4',
            'Left out of Box 7, and its VAT is reclaimed in Box 4',
          ],
          answer: 0,
          exp: 'Two separate rules meet on one line. Business entertaining is a real purchase, so its net value belongs in Box 7; input tax on it is blocked, so its VAT never reaches Box 4. Treating the block as though the expense had not happened understates Box 7.',
        },
      ],
      exp: 'The arithmetic here is the easy half. What the return depends on is which rows count: the credit note reduces the standard-rated total rather than adding to it, the exempt and zero-rated sales still belong in Box 6, wages and rates stay out of Box 7 altogether, and entertaining sits in Box 7 while its VAT stays out of Box 4.',
    },
    {
      id: 'T-2-02', unitKey: 'tpfb', lo: 2,
      criteria: ['TPFB-2.3.11', 'TPFB-2.3.12', 'TPFB-2.3.14'],
      type: 'task',
      q: 'Work out the output tax and the Box 6 figure from these invoices.',
      brief: 'Read the **Basis** column: some amounts are net and one is quoted inclusive of VAT.',
      datasets: [
        {
          title: 'Sales invoices raised in the quarter',
          headers: ['Ref', 'Description', 'Amount £', 'Basis', 'Rate'],
          rows: [
            ['101', 'Consultancy', '4,800.00', 'Net', 'Standard'],
            ['102', 'Printed books', '2,150.00', 'Net', 'Zero'],
            ['103', 'Repairs, priced inclusive', '3,660.00', 'Gross', 'Standard'],
            ['104', 'Domestic fuel', '1,900.00', 'Net', 'Reduced'],
            ['105', 'Consultancy, 3% discount taken', '6,000.00', 'Net', 'Standard'],
            ['106', 'Insurance commission', '1,450.00', 'Net', 'Exempt'],
            ['107', 'Local authority grant, no supply made', '5,000.00', '—', 'Outside the scope'],
          ],
        },
      ],
      parts: [
        {
          label: 'VAT on invoice 103, which is priced inclusive',
          type: 'numeric', unit: '£', answer: 610,
          exp: 'A gross figure holds the VAT inside it, so the fraction is ' + T.rates.standard.value + '/120 and not ' + T.rates.standard.value + '/100: 3,660.00 × 20 ÷ 120 = £610.00, leaving 3,050.00 net. Applying ' + T.rates.standard.value + '% to the gross figure instead gives 732.00, which is the single most common slip on this calculation.',
        },
        {
          label: 'Net value of invoice 105 after the discount is taken',
          type: 'numeric', unit: '£', answer: 5820,
          exp: 'A prompt payment discount that is actually taken reduces the consideration, so the supply is worth 6,000.00 × 97% = £5,820.00 and the VAT follows that figure rather than the list price.',
        },
        {
          label: 'Total output tax for the quarter',
          type: 'numeric', unit: '£', answer: 2829,
          exp: 'Three invoices carry standard-rated VAT and one carries reduced: 960.00 on invoice 101, 610.00 on 103, 95.00 on 104 at ' + T.rates.reduced.value + '%, and 1,164.00 on the discounted 5,820.00. That is £2,829.00. The books are zero-rated, the commission is exempt, and the grant is not a supply at all.',
        },
        {
          label: 'Box 6 — total value of outputs, excluding VAT',
          type: 'numeric', unit: '£', answer: 19170,
          exp: '4,800.00 + 2,150.00 + 3,050.00 + 1,900.00 + 5,820.00 + 1,450.00 = £19,170.00. The zero-rated and exempt supplies belong here even though neither carries output tax; invoice 103 goes in at its net value, not its gross one; and the grant is left out.',
        },
        {
          label: 'The local authority grant — where does it appear on the return?',
          type: 'choice',
          options: [
            'In neither Box 1 nor Box 6',
            'In Box 6 only, and not in Box 1',
            'In Box 1 only, and not in Box 6',
            'In both Box 1 and Box 6',
          ],
          answer: 0,
          exp: 'Nothing was supplied in return for the grant, so there is no supply and the money is outside the scope of VAT. That is different from exempt: an exempt supply is still a supply and still reaches Box 6, which is why invoice 106 appears there and the grant does not.',
        },
      ],
      exp: 'Every figure here needs a decision before it needs arithmetic: whether the amount is net or gross, whether a discount has changed the consideration, which rate applies, and whether there is a supply at all. Get those five right and the sums are trivial.',
    },
    {
      id: 'T-3-01', unitKey: 'tpfb', lo: 3,
      criteria: ['TPFB-3.1.5', 'TPFB-3.1.6'],
      type: 'task',
      q: 'Decide how these errors from earlier periods must be put right.',
      brief: 'All six were found during this quarter. Turnover for the period of discovery is well under a million pounds, and none of the errors is more than four years old.',
      datasets: [
        {
          title: 'Errors found in earlier VAT returns',
          headers: ['Ref', 'What happened', 'VAT understated £', 'VAT overstated £'],
          rows: [
            ['E1', 'A sales invoice was left off the return', '4,200.00', '—'],
            ['E2', 'A purchase invoice was entered twice', '1,850.00', '—'],
            ['E3', 'A zero-rated sale was treated as standard-rated', '—', '900.00'],
            ['E4', 'Input tax was reclaimed on client entertaining', '260.00', '—'],
            ['E5', 'A credit note was left off the return', '—', '1,140.00'],
            ['E6', 'Cash sales were deliberately suppressed', '3,000.00', '—'],
          ],
        },
      ],
      parts: [
        {
          label: 'Total VAT understated',
          type: 'numeric', unit: '£', answer: 9310,
          exp: '4,200.00 + 1,850.00 + 260.00 + 3,000.00 = £9,310.00. Entering a purchase invoice twice understates the VAT due just as surely as omitting a sale does — the input tax claimed was too high, so the payment was too low.',
        },
        {
          label: 'Total VAT overstated',
          type: 'numeric', unit: '£', answer: 2040,
          exp: '900.00 + 1,140.00 = £2,040.00. Both are errors in the business’s own favour to correct: it has paid HMRC more than it owed.',
        },
        {
          label: 'Net error across all six',
          type: 'numeric', unit: '£', answer: 7270,
          exp: 'Understatements less overstatements: 9,310.00 − 2,040.00 = £7,270.00. The net error is what the limit is tested against — the two directions are set off, not added.',
        },
        {
          label: 'Amount that may be corrected on the next return',
          type: 'numeric', unit: '£', answer: 4270,
          exp: 'E6 is deliberate, so it comes out of the adjustment altogether: (9,310.00 − 3,000.00) − 2,040.00 = £4,270.00. Both figures sit under the ' + money(T.errorCorrection.netErrorLimit.value) + ' limit, so the limit is not what separates them — the behaviour behind the error is.',
        },
        {
          label: 'How must E6 be dealt with?',
          type: 'choice',
          options: [
            'Notified separately to HMRC, whatever its size',
            'Corrected on the next return, whatever its size',
            'Notified separately only where it exceeds the limit',
            'Corrected on the next return where it is under the limit',
          ],
          answer: 0,
          exp: 'A deliberate error can never be rolled into the next return, however small it is. The limit governs careless and innocent errors; deliberate ones are notified separately on their own, and unprompted disclosure is what keeps the penalty down.',
        },
      ],
      exp: 'The arithmetic is two columns and a subtraction. What the task is really asking is which errors go which way, and which one is excluded from the adjustment for a reason that has nothing to do with its size.',
    },
    {
      id: 'T-4-01', unitKey: 'tpfb', lo: 4,
      criteria: ['TPFB-4.1.11', 'TPFB-4.1.12'],
      type: 'task',
      q: 'Work out this employee’s pay for the month.',
      brief: 'The pension scheme operates on a **net pay arrangement**, so the employee’s contribution comes out of pay before tax is worked out.',
      datasets: [
        {
          title: 'Payroll figures for the month',
          headers: ['Item', 'Amount £'],
          rows: [
            ['Basic pay', '2,400.00'],
            ['Overtime', '315.00'],
            ['Employer pension contribution', '168.00'],
            ['Income tax under PAYE', '402.60'],
            ['Employee National Insurance', '174.36'],
            ['Employee pension contribution', '136.50'],
            ['Student loan repayment', '63.00'],
            ['Employer National Insurance', '289.15'],
          ],
        },
      ],
      parts: [
        {
          label: 'Gross pay',
          type: 'numeric', unit: '£', answer: 2715,
          exp: 'Gross pay is what the employee has earned: 2,400.00 + 315.00 = £2,715.00. The employer’s pension contribution is money the employer pays on top and never forms part of the employee’s gross pay.',
        },
        {
          label: 'Taxable gross pay',
          type: 'numeric', unit: '£', answer: 2578.50,
          exp: 'Under a net pay arrangement the employee’s pension contribution is taken off before tax is calculated: 2,715.00 − 136.50 = £2,578.50. That is why the same contribution appears twice in this task — once reducing taxable pay, and again as one of the deductions from it.',
        },
        {
          label: 'Total deductions from the employee',
          type: 'numeric', unit: '£', answer: 776.46,
          exp: '402.60 + 174.36 + 136.50 + 63.00 = £776.46. Everything the employee has withheld counts, whether it goes to HMRC, to the student loans company or to the pension scheme.',
        },
        {
          label: 'Net pay',
          type: 'numeric', unit: '£', answer: 1938.54,
          exp: 'Gross pay less deductions: 2,715.00 − 776.46 = £1,938.54. Note that it is gross pay this comes off, not taxable gross pay — subtracting from 2,578.50 double-counts the pension and gives 1,802.04.',
        },
        {
          label: 'The employer National Insurance of £289.15 is',
          type: 'choice',
          options: [
            'a cost to the employer, and not a deduction from the employee',
            'a deduction from the employee, and not a cost to the employer',
            'a cost to the employer, and also a deduction from the employee',
            'neither a cost to the employer nor a deduction from the employee',
          ],
          answer: 0,
          exp: 'Employer National Insurance is a charge on the employer for having the employee at all. It never touches the payslip arithmetic, though it is paid over to HMRC alongside the amounts that do — which is why it appears on this list and in none of the four figures above.',
        },
      ],
      exp: 'Two of the eight lines are the employer’s own costs and belong in none of the answers, and one line appears in two of them for two different reasons. Gross to taxable to net is a chain, and taking a step off the wrong figure carries the error all the way down.',
    },
    {
      id: 'T-5-01', unitKey: 'tpfb', lo: 5,
      criteria: ['TPFB-5.1.4', 'TPFB-5.1.6', 'TPFB-5.1.7'],
      type: 'task',
      q: 'Tell the finance manager what is due, and when.',
      brief: 'The VAT quarter ended 31 March and the tax year ended 5 April. Everything is filed and paid **electronically**.',
      datasets: [
        {
          title: 'Obligations outstanding at the start of April',
          headers: ['Obligation', 'Period ended', 'Amount £'],
          rows: [
            ['VAT return and payment', '31 March', '8,420.00'],
            ['PAYE and National Insurance', '5 April', '3,265.00'],
            ['Class 1A National Insurance on benefits', '5 April', '1,180.00'],
            ['P60s to employees', '5 April', '—'],
            ['P11D and P11D(b) to HMRC', '5 April', '—'],
          ],
        },
      ],
      parts: [
        {
          label: 'The VAT return and payment are due by',
          type: 'choice',
          options: ['7 May', '30 April', '1 May', '31 May'],
          answer: 0,
          exp: 'One calendar month and seven days after the end of the period: 31 March plus a month is 30 April, plus seven days is 7 May. The same date governs the return and the money, and the money must have REACHED HMRC by then rather than merely been sent.',
        },
        {
          label: 'The PAYE and National Insurance are due by',
          type: 'choice',
          options: ['22 May', '19 May', '22 April', '6 May'],
          answer: 0,
          exp: 'Paid electronically, PAYE is due by the ' + T.payroll.paymentToHmrc.electronicDeadline.value + 'nd of the month following the tax month, so the month ended 5 April is due by 22 May. The ' + T.payroll.paymentToHmrc.nonElectronicDeadline.value + 'th is the deadline for paying by post, which is not how this employer pays.',
        },
        {
          label: 'P60s must reach employees by',
          type: 'choice',
          options: ['31 May', '6 July', '5 April', '19 May'],
          answer: 0,
          exp: 'A P60 summarises the tax year just ended and is due to each employee still employed at 5 April by 31 May. It goes to the employee, not to HMRC, which already has the same figures from the final submission of the year.',
        },
        {
          label: 'P11D and P11D(b) must reach HMRC by',
          type: 'choice',
          options: ['6 July', '31 May', '22 July', '5 April'],
          answer: 0,
          exp: 'Both forms are due by 6 July following the end of the tax year. 22 July is the date the Class 1A National Insurance those forms declare must be paid electronically — two deadlines a fortnight apart, and reporting the benefits is not the same act as paying for them.',
        },
        {
          label: 'Total that must reach HMRC during May',
          type: 'numeric', unit: '£', answer: 11685,
          exp: '8,420.00 of VAT by 7 May and 3,265.00 of PAYE by 22 May is £11,685.00. The Class 1A National Insurance of 1,180.00 is not due until 22 July, so it belongs to a later month however early the P11D that declares it is filed.',
        },
      ],
      exp: 'A finance manager asking what is due next month wants the answer for next month. Three obligations fall in the period and two of them are payments, so the figure that matters is not the total of the table — it is the total of the rows whose deadline lands in May.',
    },
  ];

  /* Grouped for the by-outcome picker. */
  function byOutcome() {
    var out = {};
    QUESTIONS.forEach(function (q) { (out[q.lo] = out[q.lo] || []).push(q); });
    return out;
  }

  var API = { QUESTIONS: QUESTIONS, byOutcome: byOutcome };
  if (typeof module === 'object' && module.exports) module.exports = { AAT3_PRACTICE: API };
  else { root.AAT3_PRACTICE = API; }
}(typeof self !== 'undefined' ? self : this));
