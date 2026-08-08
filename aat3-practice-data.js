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
 * Every question carries `lo` (the outcome it belongs to) and `criteria` (the
 * key concepts it tests, checked against aat3-syllabus.js). The `lo` field is
 * what the by-outcome picker filters on; "mix all" ignores it.
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
      id: 'P-1-01', lo: 1, criteria: ['TPFB-1.1.3'],
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
      id: 'P-1-02', lo: 1, criteria: ['TPFB-1.2.1', 'TPFB-1.2.2'],
      type: 'numeric',
      q: 'A business has rolling 12-month sales of £96,000, of which £11,000 is exempt rental income. The rest is standard-rated. What is its taxable turnover for registration purposes, in pounds?',
      answer: 85000, unit: '£',
      exp: money(96000) + ' − ' + money(11000) + ' = ' + money(85000) + '. Only taxable supplies count, and exempt income never does. At ' + money(85000) + ' the business is below the ' + money(T.registration.threshold.value) + ' threshold and need not register — despite total income being above it.',
    },
    {
      id: 'P-1-03', lo: 1, criteria: ['TPFB-1.2.2'],
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
      id: 'P-1-04', lo: 1, criteria: ['TPFB-1.2.3'],
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
      id: 'P-1-05', lo: 1, criteria: ['TPFB-1.4.1'],
      type: 'numeric',
      q: 'A flat rate scheme business has a sector rate of 14.5% and net standard-rated sales of £48,000 for the quarter. It is in its fifth year of registration. How much VAT is due to HMRC, in pounds?',
      answer: 8352, unit: '£',
      exp: money(48000) + ' × 1.20 = ' + money(57600) + ' VAT-inclusive turnover. ' + money(57600) + ' × 14.5% = £8,352. The flat rate applies to the GROSS figure; applying it to the net would give £6,960. No first-year discount applies in year five.',
    },
    {
      id: 'P-1-06', lo: 1, criteria: ['TPFB-1.4.1', 'TPFB-1.4.3'],
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
      id: 'P-1-07', lo: 1, criteria: ['TPFB-1.3.3'],
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
      id: 'P-1-08', lo: 1, criteria: ['TPFB-1.1.4'],
      type: 'gapfill',
      q: 'Complete the two retention periods examined in this unit.',
      template: 'VAT records must be kept for {0} years, while payroll records must be kept for {1} years from the end of the tax year.',
      gaps: [
        { options: ['6', '3', '4'], answer: 0 },
        { options: ['3', '6', '5'], answer: 0 },
      ],
      exp: 'Six years for VAT, three for payroll. Both appear in this unit and the figures are easy to transpose. The VAT period is longer partly because HMRC may assess up to four years back, and twenty where tax was lost deliberately.',
    },
    {
      id: 'P-1-09', lo: 1, criteria: ['TPFB-1.5.3'],
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
      id: 'P-1-10', lo: 1, criteria: ['TPFB-1.5.5'],
      type: 'numeric',
      q: 'A business owes £24,000 of VAT and pays nothing until day 28 after the due date, when it settles in full. What is the total late payment penalty, in pounds? Ignore interest.',
      answer: 720, unit: '£',
      exp: '£24,000 × ' + T.penalties.latePayment.firstPenaltyDay15.value + '% = £720. Day 28 is past the 15-day grace period, so the first element of the first penalty applies — but the debt was cleared before day 30, so the second element never arises and the second penalty, which starts at day 31, never begins.',
    },
    {
      id: 'P-1-11', lo: 1, criteria: ['TPFB-1.5.1', 'TPFB-1.5.2'],
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
      id: 'P-1-12', lo: 1, criteria: ['TPFB-1.5.4'],
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
      id: 'P-2-01', lo: 2, criteria: ['TPFB-2.3.1', 'TPFB-2.3.2'],
      type: 'numeric',
      q: 'Goods are sold for £2,148 including VAT at the standard rate. What is the VAT, in pounds?',
      answer: 358, unit: '£',
      exp: 'At 20% the VAT is one sixth of the gross: £2,148 ÷ 6 = £358. The net is £1,790, and £1,790 × 20% = £358 confirms it. Applying 20% to the gross figure instead would give £429.60 and is the error being tested.',
    },
    {
      id: 'P-2-02', lo: 2, criteria: ['TPFB-2.2.1', 'TPFB-2.2.2'],
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
      id: 'P-2-03', lo: 2, criteria: ['TPFB-2.2.3', 'TPFB-2.2.4'],
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
      id: 'P-2-04', lo: 2, criteria: ['TPFB-2.3.5', 'TPFB-2.3.6'],
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
      id: 'P-2-05', lo: 2, criteria: ['TPFB-2.3.7'],
      type: 'numeric',
      q: 'A partially exempt business has total input tax of £7,500 for the quarter, of which £1,800 relates to exempt supplies. How much input tax is recoverable, in pounds?',
      answer: 7500, unit: '£',
      exp: '£1,800 ÷ 3 = £600 a month, which is at or below the £' + T.partialExemption.deMinimisPerMonth.value + ' limit. £1,800 is 24% of £7,500, below 50%. BOTH limbs pass, so the business is de minimis and recovers everything — all £7,500.',
    },
    {
      id: 'P-2-06', lo: 2, criteria: ['TPFB-2.3.4'],
      type: 'numeric',
      q: 'An invoice is raised for £5,000 net with a 2% prompt payment discount, which the customer takes. What is the VAT finally due, in pounds?',
      answer: 980, unit: '£',
      exp: '£5,000 × 2% = £100 discount, leaving £4,900 actually paid. £4,900 × 20% = £980. VAT follows the consideration actually received, so the £1,000 originally invoiced is reduced by £20.',
    },
    {
      id: 'P-2-07', lo: 2, criteria: ['TPFB-2.3.9'],
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
      id: 'P-2-08', lo: 2, criteria: ['TPFB-2.3.8'],
      type: 'numeric',
      q: 'A quarterly fuel scale charge of £402 applies. What amount is added to output tax, in pounds?',
      answer: 67, unit: '£',
      exp: 'The scale charge is VAT-inclusive, so the VAT is one sixth: £402 ÷ 6 = £67. It is added to output tax, increasing the VAT payable. The scale charge amounts themselves are supplied in the assessment’s reference material.',
    },
    {
      id: 'P-2-09', lo: 2, criteria: ['TPFB-2.3.10', 'TPFB-2.3.15'],
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
      id: 'P-2-10', lo: 2, criteria: ['TPFB-2.3.13'],
      type: 'numeric',
      q: 'For a quarter: output tax on sales £27,400; credit notes issued carrying £900 of VAT; input tax on purchases £14,200, including £340 on client entertaining; bad debt relief £610. What is the VAT payable, in pounds?',
      answer: 12030, unit: '£',
      exp: 'Output tax £27,400 − £900 = £26,500. Input tax £14,200 − £340 blocked + £610 relief = £14,470. Payable = £26,500 − £14,470 = £12,030. The entertaining VAT comes out because it is already inside the purchases figure, and bad debt relief is added as input tax rather than deducted from output tax.',
    },
    {
      id: 'P-2-11', lo: 2, criteria: ['TPFB-2.1.1', 'TPFB-2.1.2'],
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
      id: 'P-2-12', lo: 2, criteria: ['TPFB-2.3.3'],
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
      id: 'P-3-01', lo: 3, criteria: ['TPFB-3.1.1', 'TPFB-3.1.2'],
      type: 'numeric',
      q: 'A business finds it under-declared output tax by £11,800 and over-declared output tax by £3,100 in earlier periods. What is the net error, in pounds?',
      answer: 8700, unit: '£',
      exp: '£11,800 owed to HMRC less £3,100 owed to the business = £8,700 net. That is below the ' + money(T.errorCorrection.netErrorLimit.value) + ' limit, so it may be corrected on the next return — even though the larger of the two errors was above it.',
    },
    {
      id: 'P-3-02', lo: 3, criteria: ['TPFB-3.1.3'],
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
      id: 'P-3-03', lo: 3, criteria: ['TPFB-3.1.4'],
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
      id: 'P-3-04', lo: 3, criteria: ['TPFB-3.1.5', 'TPFB-3.1.6'],
      type: 'numeric',
      q: 'A purchase invoice for £8,400 including standard-rate VAT was omitted from a previous return. By how much does correcting it change the VAT payable, in pounds?',
      answer: 1400, unit: '£',
      exp: '£8,400 ÷ 6 = £1,400 of input tax never reclaimed. Input tax was under-claimed, so the correction REDUCES the VAT payable by £1,400. A missed sales invoice of the same value would move it the other way.',
    },
    {
      id: 'P-3-05', lo: 3, criteria: ['TPFB-3.2.1'],
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
      id: 'P-3-06', lo: 3, criteria: ['TPFB-3.2.1'],
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
      id: 'P-3-07', lo: 3, criteria: ['TPFB-3.2.3', 'TPFB-3.2.4'],
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
      id: 'P-3-08', lo: 3, criteria: ['TPFB-3.2.4'],
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
      id: 'P-3-09', lo: 3, criteria: ['TPFB-3.2.6'],
      type: 'numeric',
      q: 'A VAT control account shows a credit balance of £21,300. A fuel scale charge of £96 was included in the return but never posted, and bad debt relief of £740 was claimed on the return but not posted. What should Box 5 show, in pounds?',
      answer: 20656, unit: '£',
      exp: '£21,300 + £96 − £740 = £20,656. The fuel scale charge is additional output tax and raises the liability; bad debt relief is claimed as input tax and reduces it. Both were on the return but not in the ledger.',
    },
    {
      id: 'P-3-10', lo: 3, criteria: ['TPFB-3.2.5'],
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
      id: 'P-3-11', lo: 3, criteria: ['TPFB-3.2.2'],
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
      id: 'P-3-12', lo: 3, criteria: ['TPFB-3.1.6'],
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
      id: 'P-4-01', lo: 4, criteria: ['TPFB-4.1.6'],
      type: 'numeric',
      q: 'An employee has gross pay of £3,450 and contributes 6% of gross to a pension under a net pay arrangement. What is the taxable gross pay, in pounds?',
      answer: 3243, unit: '£',
      exp: '£3,450 × 6% = £207. £3,450 − £207 = £3,243. Only deductions made before tax is calculated reduce taxable gross pay — Income Tax, National Insurance and student loan repayments do not.',
    },
    {
      id: 'P-4-02', lo: 4, criteria: ['TPFB-4.1.6', 'TPFB-4.1.12'],
      type: 'numeric',
      q: 'Gross pay is £2,880. Deductions are pension £144 (pre-tax), Income Tax £389, National Insurance £212, and a season ticket loan repayment of £75. What is the net pay, in pounds?',
      answer: 2060, unit: '£',
      exp: '£2,880 − £144 − £389 − £212 − £75 = £2,060. Net pay is gross less every deduction, before or after tax. The pension comes off once — deducting it a second time is the classic error in this calculation.',
    },
    {
      id: 'P-4-03', lo: 4, criteria: ['TPFB-4.1.11'],
      type: 'numeric',
      q: 'A payroll shows PAYE £6,150, employee NI £2,780, employer NI £3,420, student loan repayments £185, and employee pension contributions £1,600. How much is due to HMRC, in pounds?',
      answer: 12535, unit: '£',
      exp: '£6,150 + £2,780 + £3,420 + £185 = £12,535. Employer’s NI is included even though it never appears as a payslip deduction. The pension contributions go to the pension provider and are excluded.',
    },
    {
      id: 'P-4-04', lo: 4, criteria: ['TPFB-4.1.7', 'TPFB-4.1.8'],
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
      id: 'P-4-05', lo: 4, criteria: ['TPFB-4.2.1', 'TPFB-4.2.2'],
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
      id: 'P-4-06', lo: 4, criteria: ['TPFB-4.2.2'],
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
      id: 'P-4-07', lo: 4, criteria: ['TPFB-4.2.4', 'TPFB-4.2.5'],
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
      id: 'P-4-08', lo: 4, criteria: ['TPFB-4.2.7'],
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
      id: 'P-4-09', lo: 4, criteria: ['TPFB-4.2.8'],
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
      id: 'P-4-10', lo: 4, criteria: ['TPFB-4.1.5'],
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
      id: 'P-4-11', lo: 4, criteria: ['TPFB-4.2.3'],
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
      id: 'P-4-12', lo: 4, criteria: ['TPFB-4.1.10'],
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
      id: 'P-5-01', lo: 5, criteria: ['TPFB-5.1.1'],
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
      id: 'P-5-02', lo: 5, criteria: ['TPFB-5.1.2'],
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
      id: 'P-5-03', lo: 5, criteria: ['TPFB-5.1.3'],
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
      id: 'P-5-04', lo: 5, criteria: ['TPFB-5.1.4'],
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
      id: 'P-5-05', lo: 5, criteria: ['TPFB-5.2.1'],
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
      id: 'P-5-06', lo: 5, criteria: ['TPFB-5.2.2'],
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
      id: 'P-5-07', lo: 5, criteria: ['TPFB-5.2.3'],
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
      id: 'P-5-08', lo: 5, criteria: ['TPFB-5.2.5', 'TPFB-5.2.7'],
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
      id: 'P-5-09', lo: 5, criteria: ['TPFB-5.2.4'],
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
      id: 'P-5-10', lo: 5, criteria: ['TPFB-5.2.6'],
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
      id: 'P-5-11', lo: 5, criteria: ['TPFB-5.1.5'],
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
      id: 'P-5-12', lo: 5, criteria: ['TPFB-5.1.7'],
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
