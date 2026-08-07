/* AAT Level 3 — learning content.
 *
 * Module T1: Tax Processes for Businesses, Learning Outcome 2 "Calculate VAT".
 * 30% of the unit — the largest outcome and the calculation core.
 *
 * Every lesson declares the key concepts it covers in `criteria`, checked by
 * scripts/check-aat3-coverage.js against aat3-syllabus.js. Figures come from
 * aat3-tax-data.js and are not hardcoded here, so a Finance Act roll is a
 * one-file change. Teaching prose is written from scratch.
 *
 * Card vocabulary is the one the Level 2 player already renders: h, p, split,
 * table, example, formula, callout, examtrap, flow, worked.
 */
(function (root) {
  'use strict';

  var T = (typeof require === 'function' && typeof module === 'object')
    ? require('./aat3-tax-data.js').TAX
    : root.AAT3_TAX;

  var LESSONS = [
    /* ── 2.1 ────────────────────────────────────────────────────────────── */
    {
      id: 'L3-TPFB-2A',
      title: 'Finding the right figures',
      icon: '🔎',
      criteria: ['TPFB-2.1.1', 'TPFB-2.1.2', 'TPFB-2.1.3', 'TPFB-2.1.4', 'TPFB-2.1.5'],
      cards: [
        {
          h: 'A return is only as good as what goes into it',
          p: [
            'Every VAT return is assembled from records the business already keeps. Nothing on it is invented at the year end — the whole task is finding the right figures, for the right period, from records you can stand behind.',
            'That is why this outcome starts here rather than with arithmetic. A perfectly executed calculation on the wrong month\'s data is simply a wrong return, and it is the kind of error that survives every check the software makes.',
            'At Level 2 you posted transactions. Here you go the other way: starting from the return, working back to the evidence that supports each box.',
          ],
        },
        {
          h: 'Where the figures come from',
          table: {
            headers: ['Source', 'What it gives you', 'Watch for'],
            rows: [
              ['Sales day book', 'Output tax on credit sales', 'Credit notes issued reduce output tax'],
              ['Purchases day book', 'Input tax on credit purchases', 'Not everything on it is reclaimable'],
              ['Cash book', 'VAT on cash sales and payments', 'Easily missed on a purely invoice-led review'],
              ['Petty cash records', 'Small amounts of input tax', 'Often unsupported by a valid VAT invoice'],
              ['VAT control account', 'The ledger position for the period', 'Should reconcile to the return — if not, something is wrong'],
              ['Accounting software reports', 'A drafted return', 'A draft, not an answer — it still needs checking'],
            ],
          },
          p: [
            'The **VAT control account** is the one to treat as a check rather than a source. If the return and the control account disagree, the difference is a real finding — it points at a posting error, a missing adjustment or a transaction in the wrong period.',
          ],
        },
        {
          h: 'The right period, not the right month',
          p: [
            'A VAT period is defined by its **tax points**, not by when an invoice happened to be entered or paid. A transaction belongs to the period containing its tax point, however late it reached the ledger.',
            'So the first job is to identify the exact date range the return covers, then to select records whose tax points fall inside it. Two traps recur:',
            '**Cut-off at each end** — an invoice dated on the last day of the period belongs in it, even if it was posted the following week.',
            '**Late-entered documents** — an invoice for a previous period entered now is not simply "this period\'s". If the previous return has already been submitted, that is an error correction, which is Outcome 3.',
          ],
          callout: { kind: 'warning', text: 'Selecting by posting date rather than tax point is the single most common way to build a return from the wrong data. The software will not flag it, because nothing is arithmetically wrong.' },
        },
        {
          h: 'Validating what you have extracted',
          p: [
            'Extracting a figure is not the same as being able to support it. Input tax may only be reclaimed where there is a **valid VAT invoice** — an entry in the purchases day book is not itself evidence.',
            'Check that each figure traces to an original, verified document: a supplier invoice showing the supplier\'s VAT number, or a valid simplified invoice for small amounts. A supplier\'s statement, a delivery note, a pro-forma invoice or an order confirmation are none of them a VAT invoice.',
            'Petty cash is where this bites most often. Small purchases frequently arrive with a till receipt that carries no VAT number, and that input tax is not reclaimable however genuine the expense.',
          ],
          examtrap: 'Given a list of documents and asked which support a reclaim, the answer turns on whether the document is a VAT invoice — not on whether the expense was legitimate.',
        },
        {
          h: 'What software does and does not do for you',
          split: {
            left: { title: 'Software is good at', items: ['Applying the right rate consistently once set up', 'Flagging a rate that looks wrong for a supplier', 'Spotting a missing or malformed VAT number', 'Totalling and drafting the return', 'Keeping the digital records MTD requires'] },
            right: { title: 'Software cannot judge', items: ['Whether an expense is blocked (entertaining, a car)', 'Whether a private-use adjustment is needed', 'Whether the tax point falls in this period', 'Whether the underlying document is valid', 'Whether a supply is exempt or zero-rated'] },
          },
          p: [
            'Under Making Tax Digital the return must be filed from **functional compatible software**, with digital records and digital links between them. That makes accuracy at the point of entry more important, not less: an error entered once now flows straight through to submission with no manual stage where anyone would notice.',
          ],
        },
      ],
      check: [
        {
          q: 'A sales invoice dated 31 March was not entered into the ledger until 14 April. The VAT period ends 31 March. Which return does it belong on?',
          opts: [
            'The period ending 31 March, because the tax point falls in that period',
            'The following period, because that is when it was entered in the ledger',
            'Either period, provided the treatment is applied consistently',
            'Neither — a late-entered invoice is excluded until the following year',
          ],
          ans: 0,
          exp: 'A transaction belongs to the period containing its tax point, regardless of when it was posted. Posting date has no bearing on which return a supply falls into, which is why selecting records by posting date quietly produces a wrong return.',
        },
        {
          q: 'Which of these is a valid basis for reclaiming input tax?',
          opts: [
            'A supplier VAT invoice showing the supplier’s VAT registration number',
            'A supplier statement listing the month’s invoices and the balance due',
            'A pro-forma invoice issued before the goods were supplied',
            'A delivery note signed on receipt of the goods',
          ],
          ans: 0,
          exp: 'Input tax needs a valid VAT invoice. A statement summarises what is owed, a pro-forma is a request for payment rather than a VAT invoice, and a delivery note evidences movement of goods, not the tax charged.',
        },
        {
          type: 'truefalse',
          q: 'Decide whether each statement about assembling a VAT return is true or false.',
          statements: [
            { text: 'The VAT control account should agree with the return, and a difference is worth investigating.', answer: true },
            { text: 'Cash and petty cash transactions can be ignored because they are small.', answer: false },
            { text: 'Accounting software can determine whether input tax on entertaining is reclaimable.', answer: false },
            { text: 'Under Making Tax Digital, records must be kept digitally with digital links between them.', answer: true },
          ],
          exp: 'The control account is a genuine check on the return. Cash and petty cash carry real VAT and are a common omission. Software applies the rules it is given but cannot judge whether an expense is blocked. MTD requires digital records and digital links, not just digital filing.',
        },
      ],
    },

    /* ── 2.2 ────────────────────────────────────────────────────────────── */
    {
      id: 'L3-TPFB-2B',
      title: 'VAT invoices and the tax point',
      icon: '🧾',
      criteria: ['TPFB-2.2.1', 'TPFB-2.2.2', 'TPFB-2.2.3', 'TPFB-2.2.4', 'TPFB-2.2.5'],
      cards: [
        {
          h: 'Why the tax point decides everything',
          p: [
            'The **tax point** — the time of supply — fixes three things at once: which VAT period a supply falls into, which rate of VAT applies, and whether a business qualifies for a special scheme.',
            'That is why it gets a topic area of its own. A supply with the wrong tax point is not a small error: it lands on the wrong return, and if a rate changed in between, it is charged at the wrong rate too.',
          ],
          callout: { kind: 'key', text: 'Tax point questions are rarely about arithmetic. They ask you to apply a rule to a date, so the marks are in knowing which rule bites.' },
        },
        {
          h: 'Basic and actual tax points',
          p: [
            'Start with the **basic tax point**: the date the goods are removed or made available, or the date a service is completed.',
            'Then check whether anything overrides it to create an **actual tax point**. Two overrides matter, and they work in opposite directions:',
            '**Payment or invoice BEFORE the basic tax point** — whichever happens first becomes the tax point, for that amount.',
            '**Invoice issued within ' + T.invoicing.actualTaxPointDays.value + ' days AFTER the basic tax point** — the invoice date becomes the tax point instead.',
          ],
          formula: 'Basic tax point = date of removal / availability / completion · Overridden by earlier payment or invoice · Overridden by an invoice issued within ' + T.invoicing.actualTaxPointDays.value + ' days after',
          examtrap: 'The ' + T.invoicing.actualTaxPointDays.value + '-day rule only moves the tax point FORWARD to the invoice date. An invoice issued later than that leaves the basic tax point standing.',
        },
        {
          h: 'The awkward cases',
          table: {
            headers: ['Situation', 'Tax point'],
            rows: [
              ['Advance payment', 'The date the payment is received, for that amount only. The balance follows the normal rules.'],
              ['Deposit', 'Same as an advance payment — a tax point is created when it is received.'],
              ['Continuous supply', 'The earlier of each invoice issued and each payment received.'],
              ['Goods on sale or return', 'When the customer adopts the goods, or 12 months from despatch if earlier.'],
            ],
          },
          p: [
            'Advance payments and deposits are the ones most often missed, because they create a tax point for **part** of a supply before anything has been delivered. A single order can therefore straddle two VAT periods quite legitimately.',
          ],
        },
        {
          h: 'What a VAT invoice must carry, and its variants',
          split: {
            left: { title: 'Full VAT invoice', items: ['Unique sequential number', 'Supplier name, address and VAT number', 'Customer name and address', 'Date of issue and tax point', 'Description, quantity and rate for each supply', 'Net amount, rate of VAT, total VAT'] },
            right: { title: 'Variants', items: ['**Simplified** — for small retail supplies; less detail, no customer details, VAT-inclusive amounts', '**Modified** — for higher-value retail; shows VAT-inclusive totals with the VAT separately stated', '**Mixed-rated** — must show each rate separately, not one blended total'] },
          },
          p: [
            'A **mixed-rated** supply is worth care: where one invoice covers items at different rates, each rate must be shown separately with its own net and VAT. A single combined figure makes the invoice invalid for the customer\'s reclaim.',
          ],
        },
        {
          h: 'Time limits and electronic invoicing',
          p: [
            'A VAT invoice must normally be issued within **' + T.invoicing.issueWithinDays.value + ' days** of the basic tax point. Miss that and the basic tax point stands.',
            'The two periods are easy to confuse because both concern the gap between supply and invoice. The ' + T.invoicing.actualTaxPointDays.value + '-day rule is about **moving** the tax point; the ' + T.invoicing.issueWithinDays.value + '-day rule is about **when you must issue** the document at all.',
            '**Electronic invoices** have the same legal standing as paper ones. They must contain the same information, their authenticity and integrity must be assured, and they must remain readable for the full retention period. The customer\'s agreement to receive them electronically is expected.',
          ],
          callout: { kind: 'key', text: 'Two numbers, two jobs: ' + T.invoicing.actualTaxPointDays.value + ' days moves the tax point to the invoice date; ' + T.invoicing.issueWithinDays.value + ' days is the deadline for issuing the invoice.' },
        },
        {
          h: 'Working out a tax point',
          worked: {
            title: 'Which period does the supply fall into?',
            problem: 'Bramley Tools despatches goods to a customer on 27 June. It issues the VAT invoice on 4 July. The customer pays on 22 July. Bramley’s VAT quarter ends on 30 June. Which return does the supply belong on?',
            steps: [
              { do: 'Identify the basic tax point.', why: 'The goods were removed on 27 June, so that is the basic tax point — and it falls in the quarter ending 30 June.' },
              { do: 'Check for an earlier payment or invoice.', why: 'Neither happened before 27 June, so nothing overrides the basic tax point in that direction.' },
              { do: 'Check the ' + T.invoicing.actualTaxPointDays.value + '-day rule.', why: 'The invoice was issued on 4 July — seven days after the basic tax point, so within ' + T.invoicing.actualTaxPointDays.value + ' days. The invoice date therefore becomes the actual tax point.' },
              { do: 'Place the supply.', why: 'The actual tax point is 4 July, which falls in the NEXT quarter. The payment date of 22 July is irrelevant — payment only matters when it comes first.' },
            ],
            answer: 'The quarter beginning 1 July — the actual tax point is 4 July.',
            tryIt: {
              q: 'Same facts, but Bramley issues the invoice on 20 July instead. In which quarter does the supply now fall? Enter 6 for the quarter ending 30 June, or 9 for the quarter ending 30 September.',
              answer: 6,
              hint: 'Count the days between 27 June and 20 July, then ask whether the ' + T.invoicing.actualTaxPointDays.value + '-day rule can still apply.',
              exp: '20 July is 23 days after the basic tax point, so the ' + T.invoicing.actualTaxPointDays.value + '-day rule does not apply and nothing overrides 27 June. The supply belongs in the quarter ending 30 June — a late invoice does not push a supply into a later period.',
            },
          },
        },
      ],
      check: [
        {
          q: 'Goods are made available on 12 May. A VAT invoice is issued on 20 May. No payment has been made. What is the tax point?',
          opts: ['20 May', '12 May', 'The date payment is eventually received', '11 June, one month after supply'],
          ans: 0,
          exp: 'The basic tax point is 12 May, but the invoice was issued eight days later — within ' + T.invoicing.actualTaxPointDays.value + ' days — so the invoice date of 20 May becomes the actual tax point.',
        },
        {
          q: 'A customer pays a £500 deposit on 3 February for goods delivered on 10 March. What is the effect for VAT?',
          opts: [
            'A tax point is created on 3 February for the £500 deposit only',
            'No tax point arises until the goods are delivered on 10 March',
            'A tax point is created on 3 February for the whole value of the order',
            'Deposits are outside the scope of VAT until the sale completes',
          ],
          ans: 0,
          exp: 'A payment received before the basic tax point creates a tax point for that amount. The deposit therefore falls into the February period; the balance follows the normal rules and may well fall into a later one.',
        },
        {
          q: 'An invoice covers goods at the standard rate and goods at the reduced rate. How must it be presented?',
          opts: [
            'Each rate shown separately with its own net and VAT amounts',
            'A single combined total with an average rate of VAT applied',
            'Two entirely separate invoices, one for each rate',
            'One total at the standard rate, with the difference adjusted later',
          ],
          ans: 0,
          exp: 'A mixed-rated invoice must show each rate separately with its own net and VAT. Blending them into one figure makes the invoice invalid as evidence for the customer’s reclaim. Separate invoices are permitted but not required.',
        },
        {
          type: 'gapfill',
          q: 'Complete the two time limits.',
          template: 'An invoice issued within {0} days after the basic tax point moves the tax point to the invoice date, while a VAT invoice must normally be issued within {1} days of the basic tax point.',
          gaps: [
            { options: ['7', '14', '30'], answer: 1 },
            { options: ['14', '30', '90'], answer: 1 },
          ],
          exp: 'Fourteen days moves the tax point; thirty days is the deadline for issuing the invoice. Both concern the gap between supply and invoice, which is why they are so easily swapped.',
        },
      ],
    },

    /* ── 2.3 — the calculation core ─────────────────────────────────────── */
    {
      id: 'L3-TPFB-2C',
      title: 'Calculating VAT: net, gross and rounding',
      icon: '🧮',
      criteria: ['TPFB-2.3.1', 'TPFB-2.3.2', 'TPFB-2.3.3', 'TPFB-2.3.11', 'TPFB-2.3.12'],
      cards: [
        {
          h: 'Four words that must not blur',
          p: [
            '**Inputs** are what the business buys. **Outputs** are what it sells. **Input tax** is the VAT on its purchases; **output tax** is the VAT on its sales.',
            'The business collects output tax on behalf of HMRC and recovers input tax it has been charged. Only the difference is settled.',
            'Getting the pairing wrong reverses the whole return, so it is worth fixing the association now: *out*puts go *out* to customers, and the tax on them is output tax.',
          ],
          formula: 'VAT due to HMRC = Output tax − Input tax · Input tax greater than output tax means a repayment is due',
        },
        {
          h: 'Net to VAT, and gross to VAT',
          p: [
            'Working forward from a **net** figure is straightforward: multiply by the rate.',
            'Working back from a **gross** figure is where errors creep in, because the rate cannot simply be applied to it — the gross already includes the VAT.',
            'At the standard rate of ' + T.rates.standard.value + '%, the gross is 120% of the net, so the VAT is 20/120 of the gross — which simplifies to **one sixth**. At the reduced rate of ' + T.rates.reduced.value + '%, the gross is 105% of the net, so the VAT is 5/105, or **one twenty-first**.',
          ],
          formula: 'Net → VAT: Net × ' + T.rates.standard.value + '% · Gross → VAT at ' + T.rates.standard.value + '%: Gross ÷ 6 · Gross → VAT at ' + T.rates.reduced.value + '%: Gross ÷ 21 · Gross → Net: Gross ÷ 1.' + (100 + T.rates.standard.value).toString().slice(1),
          examtrap: 'Applying ' + T.rates.standard.value + '% to a gross figure overstates the VAT by a fifth. If a question gives you a "total including VAT", the divide-by-six route is the one you want.',
        },
        {
          h: 'The four conversions',
          example: {
            title: 'Standard rate ' + T.rates.standard.value + '% and reduced rate ' + T.rates.reduced.value + '%',
            rows: [
              ['Given', 'Working', 'Result'],
              ['Net £2,480 at ' + T.rates.standard.value + '%', '£2,480 × 0.20', 'VAT £496.00, gross £2,976.00'],
              ['Gross £1,734 at ' + T.rates.standard.value + '%', '£1,734 ÷ 6', 'VAT £289.00, net £1,445.00'],
              ['Net £860 at ' + T.rates.reduced.value + '%', '£860 × 0.05', 'VAT £43.00, gross £903.00'],
              ['Gross £1,050 at ' + T.rates.reduced.value + '%', '£1,050 ÷ 21', 'VAT £50.00, net £1,000.00'],
            ],
          },
          p: [
            'Sense-check every gross-to-net answer by adding the VAT back. If net plus VAT does not return the gross you started with, the wrong route was taken.',
          ],
        },
        {
          h: 'Rounding',
          p: [
            'The total VAT on an invoice may be **rounded down to the nearest penny**. This is a concession in the taxpayer\'s favour and applies to the invoice total, not to each line calculated separately.',
            'On the **VAT return itself**, figures are entered in whole pounds. VAT amounts are rounded to the nearest pound; the pence are not carried onto the return.',
            'Do not round intermediate workings. Round once, at the end, or small differences compound across a period.',
          ],
          callout: { kind: 'warning', text: 'Rounding down applies to the invoice total. Rounding line by line and then totalling gives a different — and wrong — answer.' },
        },
        {
          h: 'What automation changes',
          p: [
            'Accounting software applies whichever rate it has been configured to use and totals the result without arithmetic error. That removes one class of mistake and leaves another entirely intact.',
            'The rate a supply attracts, whether the tax point falls in this period, and whether input tax is recoverable at all are **judgements**. Software executes the judgement it was given; it does not make it.',
            'The practical consequence is that errors now tend to be systematic rather than random — a supplier set up at the wrong rate produces a consistent error across every transaction with them, which is harder to spot than a one-off slip.',
          ],
        },
        {
          h: 'Working from a gross total',
          worked: {
            title: 'Extracting the VAT from a VAT-inclusive figure',
            problem: 'Harrow Interiors records cash takings of £8,742 including VAT for the quarter, all at the standard rate. What are the net sales and the output tax?',
            steps: [
              { do: 'Recognise the figure is gross.', why: '"Including VAT" means the ' + T.rates.standard.value + '% has already been added, so the rate cannot be applied to it directly.' },
              { do: 'Divide the gross by 6 to get the VAT.', why: 'At ' + T.rates.standard.value + '%, VAT is 20/120 of the gross, which is one sixth. £8,742 ÷ 6 = £1,457.00.' },
              { do: 'Subtract to get the net.', why: '£8,742 − £1,457 = £7,285.00.' },
              { do: 'Check by adding back.', why: '£7,285 × 0.20 = £1,457, and £7,285 + £1,457 = £8,742. The figures reconcile.' },
            ],
            answer: 'Net sales £7,285.00, output tax £1,457.00',
            tryIt: {
              q: 'Cash takings for the following quarter are £5,352 including VAT at the standard rate. What is the output tax, in pounds?',
              answer: 892,
              unit: '£',
              hint: 'One sixth of the gross.',
              exp: '£5,352 ÷ 6 = £892.00 of output tax, leaving net sales of £4,460.00. Checking: £4,460 × 0.20 = £892 ✓',
            },
          },
        },
      ],
      check: [
        {
          q: 'A supply has a gross value of £3,120 including VAT at the standard rate. What is the VAT?',
          opts: ['£520', '£624', '£3,744', '£416'],
          ans: 0,
          exp: '£3,120 ÷ 6 = £520. The net is £2,600, and £2,600 × 20% = £520 ✓. The £624 answer comes from applying 20% to the gross, which overstates the VAT.',
        },
        {
          type: 'numeric',
          q: 'A business sells goods with a net value of £14,600 at the standard rate. What is the output tax, in pounds?',
          answer: 2920,
          unit: '£',
          exp: '£14,600 × 20% = £2,920. Working forward from a net figure, the rate is simply applied.',
        },
        {
          type: 'numeric',
          q: 'Domestic fuel is supplied for £1,260 including VAT at the reduced rate. What is the VAT, in pounds?',
          answer: 60,
          unit: '£',
          exp: 'At ' + T.rates.reduced.value + '%, VAT is 5/105 of the gross, or one twenty-first. £1,260 ÷ 21 = £60. The net is £1,200, and £1,200 × 5% = £60 ✓',
        },
        {
          q: 'Which statement about rounding is correct?',
          opts: [
            'The total VAT on an invoice may be rounded down to the nearest penny',
            'The VAT on each individual line must be rounded down before totalling',
            'VAT must always be rounded up to the nearest penny in HMRC’s favour',
            'No rounding of any kind is permitted on a VAT invoice',
          ],
          ans: 0,
          exp: 'The concession applies to the invoice total and rounds down, in the taxpayer’s favour. Rounding each line separately and then totalling produces a different figure and is not the rule.',
        },
        {
          type: 'truefalse',
          q: 'Decide whether each statement is true or false.',
          statements: [
            { text: 'Output tax is the VAT charged on sales.', answer: true },
            { text: 'If input tax exceeds output tax, a repayment is due from HMRC.', answer: true },
            { text: 'Accounting software can determine the correct rate for an unfamiliar supply.', answer: false },
            { text: 'Figures are entered on the VAT return to the nearest penny.', answer: false },
          ],
          exp: 'Output tax is on sales and input tax on purchases; where input exceeds output a repayment arises. Software applies the rate it has been given rather than judging which is correct, and return figures are entered in whole pounds.',
        },
      ],
    },

    /* ── 2.3 — recovery restrictions ────────────────────────────────────── */
    {
      id: 'L3-TPFB-2D',
      title: 'When input tax cannot be reclaimed',
      icon: '🚫',
      criteria: ['TPFB-2.3.5', 'TPFB-2.3.6', 'TPFB-2.3.7'],
      cards: [
        {
          h: 'Zero-rated and exempt are not the same thing',
          p: [
            'Both mean no VAT is charged to the customer. The difference is what happens to the **input tax** on the costs of making that supply, and it is the difference that matters.',
            'A **zero-rated** supply is a taxable supply on which the rate happens to be ' + T.rates.zero.value + '%. Because it is taxable, input tax relating to it is fully recoverable.',
            'An **exempt** supply is outside the VAT charge altogether. Input tax relating to it is **not** recoverable.',
            'So a business making only zero-rated supplies charges nothing and reclaims everything — it is in a permanent repayment position. A business making only exempt supplies charges nothing and reclaims nothing, and the VAT it pays becomes an absorbed cost.',
          ],
          split: {
            left: { title: 'Zero-rated (taxable at 0%)', items: ['Most food', 'Books and newspapers', 'Children’s clothing', 'Input tax fully recoverable', 'Counts toward the registration threshold'] },
            right: { title: 'Exempt', items: ['Insurance', 'Postal services', 'Most finance and credit', 'Input tax NOT recoverable', 'Does not count toward the registration threshold'] },
          },
          examtrap: 'That exempt supplies do not count toward the taxable turnover threshold is a favourite. A business making only exempt supplies cannot register at all, however large it is.',
        },
        {
          h: 'Partial exemption',
          p: [
            'Most businesses making exempt supplies also make taxable ones. They are **partially exempt**, and their input tax splits three ways: wholly attributable to taxable supplies (recoverable), wholly attributable to exempt supplies (not recoverable), and residual overheads relating to both (apportioned).',
            'There is relief for businesses whose exempt activity is small. If the exempt input tax passes the **de minimis** test, all of it may be recovered as though the business were fully taxable.',
          ],
          formula: 'De minimis: exempt input tax ≤ ' + T.partialExemption.deMinimisPerMonth.value + ' per month on average AND ≤ ' + T.partialExemption.inputTaxProportion.value + '% of total input tax',
          callout: { kind: 'warning', text: 'BOTH limbs must be satisfied. Passing the ' + T.partialExemption.deMinimisPerMonth.value + ' test while exempt input tax is more than half the total does not qualify.' },
        },
        {
          h: 'Blocked input tax',
          table: {
            headers: ['Blocked', 'Why, and the exception'],
            rows: [
              ['Business entertaining', 'Not recoverable. Entertaining employees IS recoverable — but on a mixed group of staff and clients, only the staff proportion.'],
              ['Cars', 'Not recoverable on purchase, unless used exclusively for business with no private use at all — a very hard test to meet.'],
              ['Vans and commercial vehicles', 'Recoverable. The block applies to cars, not to commercial vehicles.'],
              ['Assets with private use', 'Recoverable only to the extent of business use, so an apportionment is needed.'],
            ],
          },
          p: [
            'The car block is unusually strict: merely being available for private use is enough to fail it, so the exception almost never applies outside pool cars and vehicles bought for hire or driving instruction.',
            'A **mixed group** of employees and clients is the exam favourite. Split the cost and recover only the employee share.',
          ],
        },
        {
          h: 'Applying the de minimis test',
          worked: {
            title: 'Can the exempt input tax be recovered?',
            problem: 'Calder Services is partially exempt. For the quarter, total input tax is £9,000, of which £1,700 relates to exempt supplies. Does it pass the de minimis test?',
            steps: [
              { do: 'Test the monthly average.', why: 'The quarter is three months, so £1,700 ÷ 3 = £566.67 per month. That is below the £' + T.partialExemption.deMinimisPerMonth.value + ' limit. First limb passed.' },
              { do: 'Test the proportion of total input tax.', why: '' + T.partialExemption.inputTaxProportion.value + '% of £9,000 is £4,500. The exempt input tax of £1,700 is well below that. Second limb passed.' },
              { do: 'Apply both together.', why: 'Both limbs are satisfied, so the business is de minimis for the period.' },
              { do: 'State the consequence.', why: 'All input tax is recoverable — the full £9,000, including the £1,700 that relates to exempt supplies.' },
            ],
            answer: 'De minimis: the whole £9,000 of input tax is recoverable',
            tryIt: {
              q: 'The following quarter, total input tax is £4,000, of which £2,100 relates to exempt supplies. How much input tax is recoverable, in pounds?',
              answer: 1900,
              unit: '£',
              hint: 'Work out the monthly average first. If either limb fails, the exempt element cannot be recovered.',
              exp: '£2,100 ÷ 3 = £700 per month, which exceeds the £' + T.partialExemption.deMinimisPerMonth.value + ' limit, so the first limb fails. Once either limb fails the business is not de minimis, and there is no need to test the other. The exempt input tax is therefore blocked: £4,000 − £2,100 = £1,900 recoverable.',
            },
          },
        },
      ],
      check: [
        {
          q: 'What is the key VAT difference between a zero-rated supply and an exempt supply?',
          opts: [
            'Input tax relating to zero-rated supplies is recoverable; input tax relating to exempt supplies is not',
            'Zero-rated supplies are charged at 5% while exempt supplies are charged at 0%',
            'Exempt supplies count toward the registration threshold but zero-rated supplies do not',
            'There is no practical difference — both mean no VAT is charged',
          ],
          ans: 0,
          exp: 'A zero-rated supply is taxable at 0%, so input tax remains recoverable and it counts toward taxable turnover. An exempt supply falls outside the charge, so input tax is not recoverable and it does not count toward the threshold.',
        },
        {
          q: 'A company buys a car that directors may use privately at weekends. Is the input tax recoverable?',
          opts: [
            'No — availability for private use defeats the exclusive-business-use test',
            'Yes — input tax on cars is always recoverable in full',
            'Yes, but restricted to the proportion of business mileage',
            'Only if the car is fully electric',
          ],
          ans: 0,
          exp: 'Input tax on a car is blocked unless it is used exclusively for business with no private use. Merely being available for private use fails that test, which is why the exception rarely applies outside pool cars and vehicles bought for hire or instruction.',
        },
        {
          q: 'A business spends £600 plus VAT entertaining a group made up of its own staff and of clients. What can it recover?',
          opts: [
            'The proportion of the VAT relating to its own employees',
            'All of the VAT, because staff were present',
            'None of the VAT, because clients were present',
            'Half of the VAT, by standard convention',
          ],
          ans: 0,
          exp: 'Employee entertaining is recoverable and client entertaining is blocked. On a mixed group the cost is apportioned and only the employee share recovered — there is no fixed convention of a half.',
        },
        {
          type: 'numeric',
          q: 'A partially exempt business has total input tax of £12,000 for a quarter, of which £2,400 relates to exempt supplies. Applying the de minimis test, how much input tax is recoverable, in pounds?',
          answer: 9600,
          unit: '£',
          exp: '£2,400 ÷ 3 = £800 per month, above the £' + T.partialExemption.deMinimisPerMonth.value + ' limit, so the first limb fails and the business is not de minimis. Note that the second limb would have passed — £2,400 is only 20% of £12,000 — but both must be met. The exempt input tax is blocked: £12,000 − £2,400 = £9,600.',
        },
      ],
    },
  ];

  var PATH = [{
    unit: 'tpfb',
    level: 3,
    title: 'Tax Processes for Businesses',
    outcome: 2,
    outcomeTitle: 'Calculate VAT',
    lessons: LESSONS,
  }];

  if (typeof module === 'object' && module.exports) module.exports = { AAT3_LEARN_PATH: PATH };
  else root.AAT3_LEARN_PATH = PATH;
}(typeof self !== 'undefined' ? self : this));
