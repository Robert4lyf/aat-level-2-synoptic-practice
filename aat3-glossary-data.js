/* AAT Level 3 — the glossary, one list per unit.
 *
 * WHY PER UNIT AND NOT ONE ALPHABET
 *
 * The three units share words and do not share meanings. "Standard rate" is a
 * rate of VAT in TPFB and a standard cost per unit in MATS; "materiality" is an
 * accounting principle in FAPS and a reporting judgement in TPFB. One merged
 * list would have to pick a winner for each collision, and the reader looking a
 * word up would get the other unit's answer. Keeping them apart also lets a
 * flashcard run be drawn from the unit the reader is actually studying.
 *
 * GOVERNED FIGURES COME FROM aat3-tax-data.js, NOT FROM THIS FILE.
 *
 * Every rate, threshold and statutory period in the TPFB list is interpolated
 * from the tax data at load. A glossary is exactly the kind of file that gets
 * written once and then quietly disagrees with the rest of the app after a
 * Budget — and a reader looking a figure UP is the reader least able to notice
 * that it is out of date, because looking it up is what they are doing instead
 * of knowing it.
 *
 * SHAPE
 *
 *   { t: 'Term', d: 'What it means.', lo: 3 }
 *
 * `lo` is the outcome the term belongs to, so the glossary can be read one
 * outcome at a time and a flashcard run can be drawn to the exam weighting the
 * way every other run in this app is.
 *
 * WHAT A DEFINITION IS FOR HERE. Not a dictionary entry — a sentence that would
 * let a reader answer an exam question about the thing. Where two terms are
 * commonly confused the definition says so and names the difference, because
 * that confusion is what the assessment tests: zero-rated against exempt,
 * standing order against Direct Debit, a provision against a reserve.
 */
(function (root) {
  'use strict';

  /* `AAT3_TAX`, not `TAX` — that is the name aat3-tax-data.js publishes on the
     browser side, and the two other files that read it use the same one. The
     first version of this reached for `root.TAX`, which is undefined in a
     browser: every figure below threw on load, taking the whole Level 3 module
     with it. Nothing in Node noticed, because Node takes the require branch. */
  var TAX = (typeof require === 'function' && typeof module === 'object')
    ? require('./aat3-tax-data.js').TAX
    : root.AAT3_TAX;

  /* Named locally so the definitions below read as sentences rather than as
     string concatenation, and so a figure used twice cannot be updated once. */
  var STD = TAX.rates.standard.value + '%';
  var RED = TAX.rates.reduced.value + '%';
  var FRAC = TAX.fractions.standardVatFromGross.numerator + '/' +
             TAX.fractions.standardVatFromGross.denominator;
  var KEEP = TAX.records.retentionYears.value + ' years';
  var BAD = TAX.badDebtRelief.debtAgeMonths.value + ' months';
  var TP14 = TAX.invoicing.actualTaxPointDays.value + ' days';
  var TP30 = TAX.invoicing.issueWithinDays.value + ' days';

  var TPFB = [
    /* ── TPFB · Outcome 1 · VAT legislation ─────────────────────────────── */
    { t: 'HMRC', d: 'His Majesty’s Revenue and Customs — the authority that administers VAT, issues the notices businesses must follow, and collects the tax.', lo: 1 },
    { t: 'VAT Notice 700', d: 'HMRC’s main guide to VAT. It is guidance rather than law, but a business that departs from it is expected to be able to say why.', lo: 1 },
    { t: 'Taxable supply', d: 'A supply of goods or services within the scope of VAT — standard-rated, reduced-rated or zero-rated. Exempt supplies are outside it.', lo: 1 },
    { t: 'Taxable turnover', d: 'The value of taxable supplies, excluding VAT itself and excluding exempt supplies. The figure the registration threshold is tested against.', lo: 1 },
    { t: 'Standard rate', d: 'The main rate of VAT, ' + STD + ', applying to most goods and services.', lo: 1 },
    { t: 'Reduced rate', d: 'A lower rate — ' + RED + ' — applying to a defined list: domestic fuel, children’s car seats, some energy-saving materials.', lo: 1 },
    { t: 'Zero-rated', d: 'Taxable at 0%. The supply still counts towards taxable turnover, and the seller can still recover input tax on the costs of making it — which is what separates it from exempt.', lo: 1 },
    { t: 'Exempt supply', d: 'Outside the scope of VAT — insurance, postage, most health and education. No VAT is charged, the supply does not count towards taxable turnover, and input tax on its costs cannot be recovered.', lo: 1 },
    { t: 'Outside the scope', d: 'Not a supply for VAT at all — wages, dividends, most grants. Different from exempt, which is a supply the law has chosen not to tax.', lo: 1 },
    { t: 'Registration threshold', d: 'The level of taxable turnover at which registration becomes compulsory, tested both backwards over the last 12 months and forwards over the next 30 days alone.', lo: 1 },
    { t: 'Historic test', d: 'The backward-looking registration test: taxable turnover in the last 12 months exceeding the threshold. It is a rolling 12 months, not a financial year.', lo: 1 },
    { t: 'Future test', d: 'The forward-looking registration test: taxable turnover expected to exceed the threshold in the NEXT 30 days alone. Registration is immediate, not from the end of a month.', lo: 1 },
    { t: 'Deregistration threshold', d: 'The level of taxable turnover below which a registered business may ask to deregister. Set below the registration threshold so that a business hovering around it is not registering and deregistering repeatedly.', lo: 1 },
    { t: 'Voluntary registration', d: 'Registering while below the threshold, usually to recover input tax. Sensible for a business selling mainly to other registered businesses; costly for one selling to the public, who cannot recover the VAT added to their price.', lo: 1 },
    { t: 'Standard accounting scheme', d: 'VAT accounted for on invoice dates, quarterly. Output tax is due when the invoice is raised, whether or not the customer has paid.', lo: 1 },
    { t: 'Cash accounting scheme', d: 'VAT accounted for when money moves rather than when invoices are raised. Helps a business whose customers pay late, and gives automatic relief for bad debts because the output tax was never due.', lo: 1 },
    { t: 'Annual accounting scheme', d: 'One VAT return a year, with instalments through it. Reduces paperwork and makes cash flow predictable; the balancing payment can be large.', lo: 1 },
    { t: 'Flat rate scheme', d: 'A single percentage applied to VAT-inclusive turnover instead of tracking input and output tax. Simpler, and input tax on ordinary purchases cannot be reclaimed.', lo: 1 },
    { t: 'Limited cost business', d: 'A flat-rate business whose goods spending is very low, which must use a higher flat rate. It exists to stop the scheme being used as a discount by businesses with almost no costs.', lo: 1 },
    { t: 'Making Tax Digital', d: 'The requirement to keep VAT records digitally and file returns through compatible software, with digital links between the records and the return.', lo: 1 },
    { t: 'Digital link', d: 'An electronic transfer of data between systems with no retyping. Copying a figure by hand from a spreadsheet into the return breaks it, even if the figure is right.', lo: 1 },
    { t: 'Record retention', d: 'How long VAT records must be kept: at least ' + KEEP + '. Records supporting a return are not the return.', lo: 1 },
    { t: 'VAT invoice', d: 'An invoice carrying the details VAT law requires — supplier’s VAT number, tax point, rate, and the VAT amount. Without them the customer has no valid evidence to reclaim input tax.', lo: 1 },
    { t: 'Simplified VAT invoice', d: 'A shortened invoice allowed for supplies under a set value, showing the VAT-inclusive amount and the rate rather than a separate VAT figure.', lo: 1 },
    { t: 'Default surcharge', d: 'The former penalty regime for late returns or payments, based on a surcharge period and an escalating percentage.', lo: 1 },
    { t: 'Penalty points', d: 'The current regime for late VAT returns: a point per late submission, and a fixed penalty once the threshold for the filing frequency is reached. Points expire after a period of compliance.', lo: 1 },
    { t: 'Late payment interest', d: 'Interest charged from the day payment was due until it is made. Separate from penalties, and not avoided by filing on time.', lo: 1 },
    { t: 'VAT control account', d: 'The ledger account bringing together output tax, input tax and payments, so that the balance can be checked against the return.', lo: 1 },

    /* ── TPFB · Outcome 2 · Calculating VAT ─────────────────────────────── */
    { t: 'Output tax', d: 'VAT charged on sales. Owed to HMRC.', lo: 2 },
    { t: 'Input tax', d: 'VAT paid on purchases. Recoverable from HMRC where the purchase is for taxable business use.', lo: 2 },
    { t: 'Net amount', d: 'The value of a supply before VAT.', lo: 2 },
    { t: 'Gross amount', d: 'The value of a supply including VAT.', lo: 2 },
    { t: 'VAT fraction', d: 'The fraction that extracts VAT from a VAT-inclusive figure — ' + FRAC + ' at ' + STD + '. Applied to gross, never to net.', lo: 2 },
    { t: 'Tax point', d: 'The date a supply is treated as taking place, which fixes the return it falls in. The basic tax point is the date of supply; an invoice or a payment within the permitted window overrides it.', lo: 2 },
    { t: 'Basic tax point', d: 'The date goods are removed or made available, or the date a service is completed. An invoice must normally be issued within ' + TP30 + ' of it.', lo: 2 },
    { t: 'Actual tax point', d: 'The date that overrides the basic one: a payment received or an invoice issued before it, or an invoice issued within ' + TP14 + ' after it.', lo: 2 },
    { t: 'Trade discount', d: 'A reduction from the list price for the type of customer. Always deducted before VAT is calculated.', lo: 2 },
    { t: 'Prompt payment discount', d: 'A discount for paying early. VAT is charged on the amount actually paid, so the invoice must state the terms and the VAT is adjusted only if the discount is taken.', lo: 2 },
    { t: 'Bulk discount', d: 'A reduction for buying a large quantity. Like a trade discount, taken off before VAT.', lo: 2 },
    { t: 'Blocked input tax', d: 'Input tax the law does not allow to be recovered whatever the business use — business entertainment of UK customers, and most cars.', lo: 2 },
    { t: 'Partial exemption', d: 'The position of a business making both taxable and exempt supplies, which can only recover the input tax attributable to the taxable side.', lo: 2 },
    { t: 'De minimis limit', d: 'The threshold below which a partly exempt business may recover all its input tax, tested monthly and annually.', lo: 2 },
    { t: 'Bad debt relief', d: 'Recovery of output tax already paid on an invoice the customer never paid. Available once the debt is at least ' + BAD + ' overdue, measured from the later of the due date and the date of supply, and has been written off in the accounts.', lo: 2 },
    { t: 'Reverse charge', d: 'The rule making the CUSTOMER account for VAT on a supply instead of the supplier — used for services from abroad and for construction. The customer records both output and input tax, usually netting to nothing.', lo: 2 },
    { t: 'Domestic reverse charge', d: 'The reverse charge as it applies to specified construction services between VAT-registered contractors, introduced to stop missing-trader fraud in the sector.', lo: 2 },
    { t: 'Imports', d: 'Goods brought into the UK. VAT is due at import, and postponed VAT accounting lets it be declared and recovered on the same return instead of being paid at the border.', lo: 2 },
    { t: 'Postponed VAT accounting', d: 'Declaring import VAT on the return and recovering it on the same return, so no cash leaves the business.', lo: 2 },
    { t: 'Fuel scale charge', d: 'A fixed output-tax charge for private use of fuel bought by the business, based on the car’s CO₂ emissions. An alternative to apportioning actual private mileage.', lo: 2 },

    /* ── TPFB · Outcome 3 · Reviewing and verifying returns ─────────────── */
    { t: 'VAT return', d: 'The periodic declaration of output tax, input tax and the resulting payment or reclaim, filed under Making Tax Digital.', lo: 3 },
    { t: 'Box 1', d: 'Output tax due on sales and other outputs — including the output side of any reverse charge.', lo: 3 },
    { t: 'Box 2', d: 'VAT due on acquisitions from EU member states under the Northern Ireland Protocol. Nil for most businesses.', lo: 3 },
    { t: 'Box 3', d: 'Total output tax due: box 1 plus box 2. Calculated rather than entered.', lo: 3 },
    { t: 'Box 4', d: 'Input tax reclaimed on purchases, including postponed import VAT and the input side of a reverse charge.', lo: 3 },
    { t: 'Box 5', d: 'The net VAT to pay or reclaim: the difference between box 3 and box 4. The figure that actually moves.', lo: 3 },
    { t: 'Box 6', d: 'Total value of sales excluding VAT. A value figure, not a tax figure — the commonest place to enter a VAT amount by mistake.', lo: 3 },
    { t: 'Error correction', d: 'Putting right a mistake on a previous return. Below the threshold and not deliberate, it may be adjusted on the next return; otherwise it must be disclosed separately.', lo: 3 },
    { t: 'Voluntary disclosure', d: 'Telling HMRC about an error rather than adjusting it on the next return. Required for errors above the threshold or made deliberately, and it reduces the penalty.', lo: 3 },
    { t: 'Reconciliation', d: 'Agreeing the VAT control account to the return. A return that does not reconcile is a return with something missing, not a return with an explanation.', lo: 3 },
    { t: 'Payment on account', d: 'An instalment required from businesses with a large VAT liability, paid during the quarter rather than after it.', lo: 3 },

    /* ── TPFB · Outcome 4 · Payroll ─────────────────────────────────────── */
    { t: 'Gross pay', d: 'What an employee earns before any deductions.', lo: 4 },
    { t: 'Net pay', d: 'What the employee actually receives, after deductions.', lo: 4 },
    { t: 'PAYE', d: 'Pay As You Earn — the system by which income tax is deducted from pay at source and paid over by the employer.', lo: 4 },
    { t: 'National Insurance', d: 'Contributions paid by both employee and employer on earnings above set thresholds. The employer’s share is a cost of employment, not a deduction from pay.', lo: 4 },
    { t: 'Employer’s National Insurance', d: 'The employer’s own contribution. It never appears as a deduction on the payslip, because the employee does not pay it.', lo: 4 },
    { t: 'Statutory deduction', d: 'A deduction the law requires — income tax, National Insurance, student loan repayments, and pension under auto-enrolment.', lo: 4 },
    { t: 'Voluntary deduction', d: 'A deduction the employee has agreed to — a charity donation, union subscription, or additional pension.', lo: 4 },
    { t: 'Real Time Information (RTI)', d: 'The requirement to report pay and deductions to HMRC on or before each payday, rather than at the end of the year.', lo: 4 },
    { t: 'Full Payment Submission (FPS)', d: 'The RTI report of what was paid and deducted, sent on or before payday.', lo: 4 },
    { t: 'Auto-enrolment', d: 'The duty to enrol eligible workers into a pension scheme and contribute to it. The employee may opt out; the employer may not fail to enrol.', lo: 4 },
    { t: 'Payslip', d: 'The statement of gross pay, deductions and net pay that every employee is entitled to receive on or before payday.', lo: 4 },

    /* ── TPFB · Outcome 5 · Reporting within the organisation ───────────── */
    { t: 'Materiality', d: 'Whether an amount is large enough to change a reader’s decision. It decides what has to be reported, not what has to be recorded.', lo: 5 },
    { t: 'Escalation', d: 'Taking something to a supervisor or manager rather than deciding it yourself. Required for anything outside your authority — a large error, a suspicion, an instruction you think is wrong.', lo: 5 },
    { t: 'Ethical threat', d: 'A situation that puts one of the fundamental principles at risk — self-interest, self-review, advocacy, familiarity or intimidation.', lo: 5 },
    { t: 'Safeguard', d: 'An action that reduces an ethical threat to an acceptable level — a second reviewer, a declaration of interest, or declining the work.', lo: 5 },
    { t: 'Cash flow impact', d: 'What a VAT position does to the money the business actually holds. The reason a large VAT bill is reported before it falls due rather than when it does.', lo: 5 },
  ];

  var FAPS = [
    /* ── FAPS · Outcome 1 · Accounting principles ───────────────────────── */
    { t: 'Going concern', d: 'The assumption that the business will continue trading for the foreseeable future. It is what justifies carrying assets at cost less depreciation rather than at what they would fetch in a forced sale.', lo: 1 },
    { t: 'Accruals basis', d: 'Recording income and expenses when they are earned or incurred, not when cash moves. The whole reason period-end adjustments exist.', lo: 1 },
    { t: 'Consistency', d: 'Treating like items the same way from one period to the next, so the figures can be compared. A change of policy has to be disclosed.', lo: 1 },
    { t: 'Prudence', d: 'Not overstating assets or income, and not understating liabilities or expenses. The reason a doubtful debt is provided for before it is certain.', lo: 1 },
    { t: 'Materiality', d: 'Whether an amount is large enough to influence a reader’s decision. It decides how much detail is disclosed, not whether something is recorded.', lo: 1 },
    { t: 'Business entity concept', d: 'The business is accounted for separately from its owner. What makes drawings a reduction of capital rather than an expense.', lo: 1 },
    { t: 'Money measurement', d: 'Only things that can be measured reliably in money are recorded. The reason a skilled workforce appears nowhere in the accounts.', lo: 1 },
    { t: 'Historic cost', d: 'Recording an asset at what was paid for it. Objective and verifiable, and increasingly out of date as time passes.', lo: 1 },
    { t: 'Faithful representation', d: 'The accounts show what actually happened — complete, neutral and free from material error.', lo: 1 },
    { t: 'Relevance', d: 'Information capable of making a difference to a decision. Relevance and faithful representation are the two fundamental qualitative characteristics.', lo: 1 },
    { t: 'Comparability', d: 'Being able to set this year against last year, and this business against another. Achieved through consistency and disclosure.', lo: 1 },
    { t: 'Verifiability', d: 'Different people looking at the same evidence would reach the same figure.', lo: 1 },
    { t: 'Understandability', d: 'Presented so that a reader with reasonable business knowledge can follow it. Not an excuse to leave out something complicated.', lo: 1 },
    { t: 'Timeliness', d: 'Available in time to be acted on. Accounts that are perfect and late have lost most of their value.', lo: 1 },
    { t: 'Sole trader', d: 'A business owned by one person, who is personally liable for its debts. Its capital account is one account.', lo: 1 },
    { t: 'Partnership', d: 'A business owned by two or more people sharing profits under an agreement. Each partner has a capital account and a current account.', lo: 1 },

    /* ── FAPS · Outcome 2 · Advanced double entry ───────────────────────── */
    { t: 'Journal', d: 'The book of prime entry for anything not routine — corrections, adjustments, opening balances, payroll, and the writing off of a debt.', lo: 2 },
    { t: 'Suspense account', d: 'A temporary account holding the difference when a trial balance does not agree. It must be cleared before financial statements are prepared; a suspense balance in a set of accounts is an admission that something is still wrong.', lo: 2 },
    { t: 'Error of omission', d: 'A transaction left out of the books entirely. The trial balance still agrees, because nothing was entered on either side.', lo: 2 },
    { t: 'Error of commission', d: 'A correct amount posted to the wrong account of the right type — a repair charged to another expense account. The trial balance still agrees.', lo: 2 },
    { t: 'Error of principle', d: 'An amount posted to a wrong account of the WRONG type — a repair capitalised as a non-current asset. The trial balance still agrees, and profit is wrong.', lo: 2 },
    { t: 'Error of original entry', d: 'The wrong figure entered, but entered as a correct double entry — £540 written as £450 on both sides. The trial balance still agrees.', lo: 2 },
    { t: 'Reversal of entries', d: 'The debit and the credit the wrong way round. The trial balance still agrees, and the correction is twice the original amount.', lo: 2 },
    { t: 'Compensating error', d: 'Two unrelated errors that happen to cancel out in the totals. The rarest of the errors that leave a trial balance agreeing.', lo: 2 },
    { t: 'Transposition error', d: 'Two digits swapped — 54 for 45. The difference is always divisible by 9, which is why that test is worth doing first.', lo: 2 },
    { t: 'Control account', d: 'A general ledger account whose balance should equal the total of a memorandum ledger — receivables or payables. The check is between two records built from the same documents by different routes.', lo: 2 },
    { t: 'Memorandum ledger', d: 'The sales or purchases ledger, holding one account per customer or supplier. Outside the double entry, which is why an error in it does not unbalance the trial balance.', lo: 2 },
    { t: 'Control account reconciliation', d: 'Agreeing a control account to the total of its memorandum ledger, and explaining any difference. Errors found in one are corrected in that one only.', lo: 2 },
    { t: 'Contra entry', d: 'Setting a balance owed by a customer against a balance owed to the same party as a supplier. Reduces both the receivables and the payables control accounts.', lo: 2 },
    { t: 'Irrecoverable debt', d: 'A debt written off as never going to be paid. An expense, and the receivable is removed.', lo: 2 },
    { t: 'Allowance for doubtful debts', d: 'A provision against receivables that MAY not pay, without removing any specific debt. Only the movement in the allowance goes to profit or loss.', lo: 2 },

    /* ── FAPS · Outcome 3 · Non-current assets ──────────────────────────── */
    { t: 'Non-current asset', d: 'An asset bought for continuing use in the business rather than for resale, expected to last more than a year.', lo: 3 },
    { t: 'Capital expenditure', d: 'Spending on acquiring or improving a non-current asset. Goes to the statement of financial position and is depreciated.', lo: 3 },
    { t: 'Revenue expenditure', d: 'Spending on running the business day to day. Charged to profit or loss in the period. Confusing the two is the error of principle.', lo: 3 },
    { t: 'Capitalisation policy', d: 'The rule about what is treated as capital rather than revenue — usually a value threshold. Its purpose is consistency, not accuracy.', lo: 3 },
    { t: 'Cost of an asset', d: 'Purchase price plus everything needed to bring it into use — delivery, installation, professional fees, irrecoverable VAT. Not the insurance or the running costs.', lo: 3 },
    { t: 'Non-current asset register', d: 'The detailed record of every asset: cost, date, depreciation, carrying amount and location. Reconciled to the general ledger, and to what is physically there.', lo: 3 },
    { t: 'Carrying amount', d: 'Cost less accumulated depreciation. What the asset stands at in the accounts, and never a valuation.', lo: 3 },
    { t: 'Disposal', d: 'Removing an asset from the books on sale or scrapping. Cost and accumulated depreciation both come out, and proceeds come in.', lo: 3 },
    { t: 'Profit or loss on disposal', d: 'Proceeds less carrying amount. A profit here is really a statement that too much depreciation was charged over the asset’s life, not that the business made money on the sale.', lo: 3 },
    { t: 'Part exchange', d: 'Trading an old asset in against a new one. The allowance given is the disposal proceeds of the old asset.', lo: 3 },
    { t: 'Authorisation', d: 'The approval required before capital expenditure is committed. The control that stops an asset being bought outside the capital budget.', lo: 3 },

    /* ── FAPS · Outcome 4 · Depreciation ────────────────────────────────── */
    { t: 'Depreciation', d: 'Spreading the cost of a non-current asset over the periods that benefit from it. An allocation of cost, not a fall in value and not a fund of cash.', lo: 4 },
    { t: 'Useful life', d: 'How long the business expects to use the asset — not how long it could last.', lo: 4 },
    { t: 'Residual value', d: 'What the asset is expected to be worth at the end of its useful life. Deducted from cost before straight-line depreciation is calculated.', lo: 4 },
    { t: 'Straight-line method', d: '(Cost − residual value) ÷ useful life. The same charge every year; right for an asset used evenly.', lo: 4 },
    { t: 'Diminishing balance method', d: 'A fixed percentage of the carrying amount each year. A large charge early and a small one late; right for an asset that gives most of its benefit when new.', lo: 4 },
    { t: 'Units of production method', d: 'Depreciation by output rather than by time. Right where wear depends on use rather than on age.', lo: 4 },
    { t: 'Accumulated depreciation', d: 'All the depreciation charged on an asset since it was bought. A credit balance sitting against the asset, never an expense of this year.', lo: 4 },
    { t: 'Depreciation charge', d: 'This period’s expense. Goes to profit or loss; the accumulated figure does not.', lo: 4 },
    { t: 'Pro-rata depreciation', d: 'Charging by the month of ownership rather than a full year. Applied where the policy says so, and applied consistently to acquisitions and disposals alike.', lo: 4 },
    { t: 'Full year in the year of acquisition', d: 'A policy charging a whole year’s depreciation in the year an asset is bought and none in the year it is sold. Simpler than pro-rata and just as acceptable, provided it is applied consistently.', lo: 4 },
    { t: 'Amortisation', d: 'Depreciation by another name, used for intangible assets.', lo: 4 },

    /* ── FAPS · Outcome 5 · Period-end adjustments ──────────────────────── */
    { t: 'Accrued expense', d: 'A cost incurred but not yet invoiced or paid at the year end. Increases the expense and creates a liability.', lo: 5 },
    { t: 'Prepaid expense', d: 'A cost paid in advance of the period it belongs to. Reduces this year’s expense and creates an asset.', lo: 5 },
    { t: 'Accrued income', d: 'Income earned but not yet invoiced or received. Increases income and creates an asset.', lo: 5 },
    { t: 'Deferred income', d: 'Money received for something not yet delivered. Reduces this year’s income and creates a liability.', lo: 5 },
    { t: 'Inventory', d: 'Goods held for resale or for use in production, counted at the year end and valued at the lower of cost and net realisable value.', lo: 5 },
    { t: 'Net realisable value', d: 'What inventory would fetch, less the costs of getting it sold. Used instead of cost where it is lower — an application of prudence.', lo: 5 },
    { t: 'Closing inventory', d: 'What is left at the year end. It reduces cost of sales and appears as a current asset — the same figure doing two jobs.', lo: 5 },
    { t: 'Opening inventory', d: 'Last year’s closing inventory. Added into cost of sales this year.', lo: 5 },
    { t: 'Reversal of an accrual', d: 'Undoing last year’s year-end adjustment at the start of this one, so the invoice when it arrives can be posted in full without double-counting.', lo: 5 },

    /* ── FAPS · Outcome 6 · The trial balance ───────────────────────────── */
    { t: 'Trial balance', d: 'A list of every ledger balance, debits in one column and credits in the other. Agreeing proves the arithmetic of the double entry, and nothing about whether the entries were right.', lo: 6 },
    { t: 'Extended trial balance', d: 'The trial balance with extra column pairs for adjustments, and for the amounts carried to profit or loss and to the statement of financial position. The working paper that turns a ledger into a set of accounts.', lo: 6 },
    { t: 'Adjustment columns', d: 'The debit and credit pair on the extended trial balance holding the year-end journals — accruals, prepayments, depreciation, inventory and irrecoverable debts.', lo: 6 },
    { t: 'Profit or loss columns', d: 'The pair on the extended trial balance collecting income and expenses. The difference between them is the profit for the year.', lo: 6 },
    { t: 'Statement of financial position columns', d: 'The pair collecting assets, liabilities and capital. The profit figure is entered here as the balancing item.', lo: 6 },
    { t: 'Balancing figure', d: 'The amount that makes two columns agree. On the extended trial balance it is the profit or loss, and it appears in both pairs on opposite sides.', lo: 6 },

    /* ── FAPS · Outcome 7 · Financial statements ────────────────────────── */
    { t: 'Statement of profit or loss', d: 'The account showing income less expenses for the period, ending in profit or loss for the year.', lo: 7 },
    { t: 'Statement of financial position', d: 'The statement of what the business owns and owes at a point in time. Assets equal capital plus liabilities.', lo: 7 },
    { t: 'Revenue', d: 'Sales for the period, net of returns and of VAT.', lo: 7 },
    { t: 'Cost of sales', d: 'Opening inventory plus purchases less closing inventory. What the goods sold actually cost.', lo: 7 },
    { t: 'Gross profit', d: 'Revenue less cost of sales. What trading earned before the costs of running the business.', lo: 7 },
    { t: 'Profit for the year', d: 'Gross profit less expenses. What is added to capital.', lo: 7 },
    { t: 'Current asset', d: 'An asset expected to be turned into cash within a year — inventory, receivables, bank.', lo: 7 },
    { t: 'Current liability', d: 'An amount due within a year — payables, accruals, a bank overdraft.', lo: 7 },
    { t: 'Non-current liability', d: 'An amount due after more than a year — typically a long-term loan.', lo: 7 },
    { t: 'Net current assets', d: 'Current assets less current liabilities. Also called working capital, and the figure that says whether the short-term position holds together.', lo: 7 },
    { t: 'Capital account', d: 'A partner’s permanent stake — what they put in. Changes rarely.', lo: 7 },
    { t: 'Current account', d: 'A partner’s running account: share of profit and interest on capital in, drawings out. A debit balance means the partner has taken more than they have earned.', lo: 7 },
    { t: 'Appropriation account', d: 'The account dividing a partnership’s profit between the partners — salaries, interest on capital, interest on drawings, and the residual share.', lo: 7 },
    { t: 'Partnership agreement', d: 'What the partners agreed about sharing profits, salaries and interest. Without one, the default is equal shares and no salaries or interest.', lo: 7 },
    { t: 'Goodwill', d: 'The value of a business above its identifiable net assets. In a partnership it is dealt with on a change in the profit-sharing arrangement, and is not usually left in the books.', lo: 7 },

    /* ── FAPS · Outcome 8 · Profitability ratios ────────────────────────── */
    { t: 'Gross profit margin', d: 'Gross profit ÷ revenue × 100. Says how much of each pound of sales survives the cost of the goods. Moves with selling prices, buying prices and sales mix.', lo: 8 },
    { t: 'Profit margin', d: 'Profit for the year ÷ revenue × 100. Says how much of each pound of sales survives everything.', lo: 8 },
    { t: 'Expense to revenue ratio', d: 'An expense ÷ revenue × 100. Isolates which cost moved when the profit margin fell but the gross margin did not.', lo: 8 },
    { t: 'Return on capital employed', d: 'Profit ÷ capital employed × 100. What the money tied up in the business earned. The ratio an owner compares against leaving it in the bank.', lo: 8 },
    { t: 'Capital employed', d: 'Capital plus non-current liabilities — everything financing the business long term, whoever it came from.', lo: 8 },
    { t: 'Mark-up', d: 'Profit as a percentage of COST. A 25% mark-up is a 20% margin; using one where the other is meant is the commonest arithmetic error in this outcome.', lo: 8 },
    { t: 'Margin', d: 'Profit as a percentage of SELLING PRICE. Always the smaller of the two percentages for the same transaction.', lo: 8 },

    /* ── FAPS · Outcome 9 · Incomplete records ──────────────────────────── */
    { t: 'Incomplete records', d: 'Accounts prepared where the business did not keep a full double-entry system. The work is reconstructing the missing figure from what IS known.', lo: 9 },
    { t: 'Net assets approach', d: 'Finding profit from the change in net assets: closing capital − opening capital + drawings − capital introduced. Used when nothing else survives.', lo: 9 },
    { t: 'Sales figure from receivables', d: 'Opening receivables + credit sales − receipts = closing receivables, rearranged to give the sales that were never listed.', lo: 9 },
    { t: 'Purchases figure from payables', d: 'The same reconstruction on the payables side, giving purchases from opening and closing balances and payments made.', lo: 9 },
    { t: 'Missing figure', d: 'The one unknown in an account where everything else is known. The technique of this outcome: build the account, and the gap is the answer.', lo: 9 },
    { t: 'Cash loss', d: 'Money taken from the till and unrecorded — found as the difference in a reconstructed cash account.', lo: 9 },
  ];

  var MATS = [
    /* ── MATS · Outcome 1 · The purpose of management accounting ────────── */
    { t: 'Management accounting', d: 'Information prepared for people inside the business to plan, control and decide with. No format is prescribed and no deadline is imposed, because nobody outside is entitled to it.', lo: 1 },
    { t: 'Financial accounting', d: 'Information prepared for people outside the business, to a required format and a statutory deadline. Backward-looking by nature; management accounting need not be.', lo: 1 },
    { t: 'Planning', d: 'Deciding what the business intends to do, and expressing it in figures. The budget is the output.', lo: 1 },
    { t: 'Control', d: 'Comparing what happened with what was planned, and acting on the difference. Variance analysis is the machinery.', lo: 1 },
    { t: 'Decision making', d: 'Choosing between courses of action. Needs future, incremental figures — which is why the accounts are the wrong place to look.', lo: 1 },
    { t: 'Cost centre', d: 'A part of the business whose costs are collected together. Its manager is accountable for costs and for nothing else.', lo: 1 },
    { t: 'Profit centre', d: 'A part accountable for revenue as well as costs.', lo: 1 },
    { t: 'Investment centre', d: 'A part accountable for the return on the capital it uses, as well as for profit.', lo: 1 },
    { t: 'Responsibility accounting', d: 'Reporting to each manager the figures they can actually influence. A manager charged with a cost they cannot control learns nothing from the report.', lo: 1 },
    { t: 'Controllable cost', d: 'A cost a particular manager can influence within the period. The only kind their performance should be judged on.', lo: 1 },
    { t: 'Relevant range', d: 'The span of activity over which the assumed cost behaviour actually holds. Outside it, a fixed cost is not fixed.', lo: 1 },

    /* ── MATS · Outcome 2 · Dealing with costs ──────────────────────────── */
    { t: 'Direct cost', d: 'A cost traceable to one unit of output — materials in the product, labour working on it.', lo: 2 },
    { t: 'Indirect cost', d: 'A cost not traceable to one unit, and therefore shared out. Also called overhead.', lo: 2 },
    { t: 'Prime cost', d: 'Direct materials plus direct labour plus direct expenses. Everything traceable, before any overhead.', lo: 2 },
    { t: 'Fixed cost', d: 'A cost unchanged in total as activity changes within the relevant range. Per unit it FALLS as volume rises, which is where the exam questions live.', lo: 2 },
    { t: 'Variable cost', d: 'A cost changing in total in proportion to activity. Per unit it stays the same.', lo: 2 },
    { t: 'Semi-variable cost', d: 'A cost with a fixed element and a variable element — a standing charge plus a rate per unit.', lo: 2 },
    { t: 'Stepped fixed cost', d: 'A cost fixed over a range and then jumping to a new level — a second supervisor at a second shift.', lo: 2 },
    { t: 'High-low method', d: 'Splitting a semi-variable cost by comparing the highest and lowest activity levels: the difference in cost over the difference in units gives the variable rate, and the fixed element is whatever is left.', lo: 2 },
    { t: 'FIFO', d: 'First in, first out — inventory issued at the cost of the oldest units held. In rising prices it gives a lower cost of sales and a higher closing inventory value.', lo: 2 },
    { t: 'AVCO', d: 'Weighted average cost — a new average is struck after each receipt, and issues are made at it. Smooths price movements rather than following them.', lo: 2 },
    { t: 'LIFO', d: 'Last in, first out. Not permitted for financial reporting, and examinable here only as a contrast.', lo: 2 },
    { t: 'Inventory valuation', d: 'The method by which units issued and units held are costed. It changes reported profit without changing a single physical unit.', lo: 2 },
    { t: 'Time rate', d: 'Paying labour by hours worked. Cost per unit varies with how fast people work.', lo: 2 },
    { t: 'Piece rate', d: 'Paying labour by units produced. Cost per unit is fixed; total cost varies with output.', lo: 2 },
    { t: 'Overtime premium', d: 'The EXTRA paid above the basic rate for overtime hours. Normally treated as an overhead, because charging it to whichever job happened to run late would distort that job’s cost.', lo: 2 },
    { t: 'Idle time', d: 'Paid hours not spent producing. An overhead, and a figure worth watching in its own right.', lo: 2 },

    /* ── MATS · Outcome 3 · Attributing costs ───────────────────────────── */
    { t: 'Overhead allocation', d: 'Charging a whole overhead to one cost centre, because the whole of it belongs there.', lo: 3 },
    { t: 'Overhead apportionment', d: 'Splitting a shared overhead between cost centres on a sensible basis — floor area for rent, headcount for canteen.', lo: 3 },
    { t: 'Reapportionment', d: 'Sharing the service centres’ costs out to the production centres, so that every overhead ends up somewhere a unit passes through.', lo: 3 },
    { t: 'Basis of apportionment', d: 'The measure used to split a shared cost. Chosen because it drives the cost, not because the figures are handy.', lo: 3 },
    { t: 'Direct method', d: 'Reapportioning service centre costs straight to production centres, ignoring services given to other service centres.', lo: 3 },
    { t: 'Step-down method', d: 'Reapportioning service centres one at a time, largest first, recognising services given to service centres not yet dealt with.', lo: 3 },
    { t: 'Reciprocal method', d: 'Recognising that service centres serve each other, and solving for both at once — by repeated distribution or algebra.', lo: 3 },
    { t: 'Overhead absorption rate', d: 'The rate at which overhead is charged to units: budgeted overhead ÷ budgeted activity. Set BEFORE the year from budget, which is why it is almost never exactly right.', lo: 3 },
    { t: 'Absorption basis', d: 'What the rate is per — labour hours, machine hours, or units. Machine hours for a machine-intensive centre; labour hours where people are the constraint.', lo: 3 },
    { t: 'Over-absorption', d: 'More overhead charged to units than was actually incurred. Credited to profit or loss — the cost was overstated during the year and is being put back.', lo: 3 },
    { t: 'Under-absorption', d: 'Less overhead charged than incurred. Debited to profit or loss.', lo: 3 },
    { t: 'Absorption costing', d: 'Costing that puts fixed production overhead into the unit cost. Required for inventory valuation in financial statements.', lo: 3 },
    { t: 'Marginal costing', d: 'Costing that treats fixed cost as a period cost and puts only variable cost into the unit. The right basis for a short-term decision.', lo: 3 },
    { t: 'Activity based costing', d: 'Charging overhead by the activities that cause it, using a cost driver for each pool rather than one plant-wide rate.', lo: 3 },
    { t: 'Cost driver', d: 'What actually causes an activity’s cost to rise — number of set-ups, number of orders. The measure ABC charges by.', lo: 3 },
    { t: 'Cost pool', d: 'The costs of one activity, gathered together before being charged out by its driver.', lo: 3 },

    /* ── MATS · Outcome 4 · Deviations from budget ──────────────────────── */
    { t: 'Budget', d: 'A plan expressed in figures for a period. Something to be measured against, not a forecast of what will happen.', lo: 4 },
    { t: 'Fixed budget', d: 'A budget set for one level of activity and left there. Comparing actual output at a different volume against it measures the volume difference and nothing useful.', lo: 4 },
    { t: 'Flexed budget', d: 'The budget restated at the activity level ACTUALLY achieved. Only then does the comparison say anything about cost control.', lo: 4 },
    { t: 'Variance', d: 'The difference between the flexed budget and the actual. Favourable when profit is better than planned; adverse when it is worse.', lo: 4 },
    { t: 'Favourable variance', d: 'A difference improving profit — lower cost or higher revenue than the flexed budget.', lo: 4 },
    { t: 'Adverse variance', d: 'A difference reducing profit. Not automatically a failure: an adverse materials variance from buying better materials may be paid for by a favourable usage or labour variance.', lo: 4 },
    { t: 'Materials variance', d: 'The total difference between what materials cost and what they should have cost at the actual output. Splitting it into price and usage is Level 4.', lo: 4 },
    { t: 'Labour variance', d: 'The total difference between actual labour cost and the flexed budget. Splitting it into rate and efficiency is Level 4.', lo: 4 },
    { t: 'Significant variance', d: 'One large enough, in money or in percentage, to be worth investigating. The percentage matters as much as the pounds: a small overspend on a small budget can be the bigger warning.', lo: 4 },
    { t: 'Management by exception', d: 'Reporting only what departs materially from plan, so attention goes where it is needed. What variance reporting is for.', lo: 4 },
    { t: 'Interdependence of variances', d: 'One decision showing up as two variances in opposite directions. The reason variances are read together rather than one at a time.', lo: 4 },

    /* ── MATS · Outcome 5 · Spreadsheet techniques ──────────────────────── */
    { t: 'Absolute reference', d: 'A cell reference fixed with dollar signs so it does not move when the formula is copied. What a rate held in one cell needs.', lo: 5 },
    { t: 'Relative reference', d: 'A reference that shifts as the formula is copied. The default, and right for a calculation running down a column of data.', lo: 5 },
    { t: 'SUMIF', d: 'Adds the values whose row meets one condition. The function that totals one cost centre out of a long list.', lo: 5 },
    { t: 'SUMIFS', d: 'The same with several conditions at once — one cost centre AND one month.', lo: 5 },
    { t: 'IF', d: 'Returns one value when a test is true and another when it is false. How a variance is labelled favourable or adverse without anyone reading it.', lo: 5 },
    { t: 'VLOOKUP', d: 'Finds a value in the first column of a range and returns something from the same row. Breaks silently if the lookup column is not the first one.', lo: 5 },
    { t: 'Pivot table', d: 'A summary that groups and totals a table by whichever fields are chosen, without changing the data. The fastest way to turn a transaction list into a report.', lo: 5 },
    { t: 'Data validation', d: 'A rule restricting what can be typed into a cell. Prevents the error rather than finding it afterwards.', lo: 5 },
    { t: 'Conditional formatting', d: 'Formatting that changes with the cell’s value. Makes an adverse variance visible without anyone reading the sign.', lo: 5 },
    { t: 'Cell protection', d: 'Locking cells so formulas cannot be typed over. The control that keeps a working model working after other people have used it.', lo: 5 },
    { t: 'Sort and filter', d: 'Reordering and hiding rows to answer a question of the data. Sorting part of a table and not the rest is how a spreadsheet gets silently wrong.', lo: 5 },
    { t: 'Version control', d: 'Knowing which copy of the spreadsheet is the live one. The commonest failure in practice is not a wrong formula but the right formula in the wrong file.', lo: 5 },

    /* ── MATS · Outcome 6 · Short-term decision making ──────────────────── */
    { t: 'Contribution', d: 'Selling price less variable cost. What each unit contributes towards fixed costs and then to profit. The figure every short-term decision turns on.', lo: 6 },
    { t: 'Contribution per unit', d: 'Contribution for one unit. Multiply by volume for total contribution; fixed costs are then deducted once, not per unit.', lo: 6 },
    { t: 'Contribution to sales ratio', d: 'Contribution ÷ revenue. Lets a break-even point be worked out in sales value rather than in units.', lo: 6 },
    { t: 'Break-even point', d: 'Fixed costs ÷ contribution per unit. The volume at which total contribution exactly covers fixed costs and profit is nil.', lo: 6 },
    { t: 'Margin of safety', d: 'How far sales can fall before break-even is reached, in units or as a percentage of budgeted sales. A measure of risk, not of profit.', lo: 6 },
    { t: 'Target profit volume', d: '(Fixed costs + target profit) ÷ contribution per unit. The same calculation as break-even with the profit added to the top.', lo: 6 },
    { t: 'Cost-volume-profit analysis', d: 'Working out how profit moves with volume, price and cost. Rests on assumptions — a constant selling price, linear costs, one product mix — and those assumptions are what an interpretation question is really asking about.', lo: 6 },
    { t: 'Relevant cost', d: 'A future cash flow that changes because of the decision. Everything else is irrelevant, however large it is in the accounts.', lo: 6 },
    { t: 'Sunk cost', d: 'A cost already incurred. Never relevant, because no decision can now change it.', lo: 6 },
    { t: 'Committed cost', d: 'A future cost the business is already bound to. Not relevant, because it happens either way.', lo: 6 },
    { t: 'Opportunity cost', d: 'The benefit given up by using a resource one way rather than the next best. Relevant, and invisible in the accounts.', lo: 6 },
    { t: 'Special order', d: 'A one-off order at a price below the normal one. Accept it if it covers its variable cost and there is spare capacity — provided it does not displace normal sales or reset the normal price.', lo: 6 },
    { t: 'Limiting factor', d: 'The scarce resource that caps output — machine hours, a material, skilled labour.', lo: 6 },
    { t: 'Contribution per limiting factor', d: 'Contribution ÷ units of the scarce resource each product uses. Rank by this, not by contribution per unit, when a resource is short.', lo: 6 },
    { t: 'Make or buy decision', d: 'Comparing the cost of making in-house with the cost of buying in. Only the costs that change matter — fixed overhead that continues either way does not.', lo: 6 },

    /* ── MATS · Outcome 7 · Cash management ─────────────────────────────── */
    { t: 'Cash flow forecast', d: 'A projection of receipts and payments, period by period, showing the balance at the end of each. Built on when cash MOVES, not when income is earned.', lo: 7 },
    { t: 'Receipts', d: 'Cash coming in, timed by when customers actually pay rather than by when they were invoiced.', lo: 7 },
    { t: 'Payments', d: 'Cash going out, timed by when the business actually pays.', lo: 7 },
    { t: 'Profit is not cash', d: 'The reason a profitable business runs out of money: profit counts income when earned, while cash arrives when customers pay, and inventory, capital spending and drawings take cash without touching profit.', lo: 7 },
    { t: 'Working capital', d: 'Current assets less current liabilities — the money tied up in the day-to-day cycle of inventory, receivables and payables.', lo: 7 },
    { t: 'Working capital cycle', d: 'Inventory days plus receivable days less payable days. How long cash is tied up between paying for goods and being paid for them.', lo: 7 },
    { t: 'Inventory days', d: 'Inventory ÷ cost of sales × 365. How long stock sits before it sells.', lo: 7 },
    { t: 'Receivable days', d: 'Receivables ÷ credit sales × 365. How long customers take to pay.', lo: 7 },
    { t: 'Payable days', d: 'Payables ÷ credit purchases × 365. How long the business takes to pay. Extending it improves cash and costs supplier goodwill.', lo: 7 },
    { t: 'Cash surplus', d: 'More cash than the business needs. Worth investing, but only where the money can be got back when it is wanted.', lo: 7 },
    { t: 'Cash deficit', d: 'A forecast shortfall. Dealt with in advance — an overdraft arranged before it is needed costs less than one arranged after.', lo: 7 },
    { t: 'Overdraft', d: 'Short-term borrowing on a current account, repayable on demand. Flexible and expensive; wrong for financing a long-term asset.', lo: 7 },
    { t: 'Liquidity', d: 'Being able to pay what falls due. A business can be profitable and illiquid, and it is illiquidity that ends it.', lo: 7 },
  ];

  var BUAW = [
    /* ── BUAW · Outcome 1 · Business types, structures, governance ──────── */
    { t: 'Sole trader', d: 'A business owned by one person, who is the same legal person as the business. Unlimited liability: the owner’s house is at risk for the business’s debts.', lo: 1 },
    { t: 'Partnership', d: 'Two or more people in business together. Liability is unlimited and JOINT — each partner is liable for the whole of a debt, not for a share of it.', lo: 1 },
    { t: 'Limited partnership', d: 'A partnership with at least one general partner carrying unlimited liability and limited partners who may not take part in management. Not the same as an ordinary partnership, and not the same as an LLP.', lo: 1 },
    { t: 'Limited liability partnership (LLP)', d: 'A partnership whose members have the liability protection a company’s shareholders have. It must publish accounts, which an ordinary partnership need not.', lo: 1 },
    { t: 'Private limited company', d: 'A company whose shares may not be offered to the public. A separate legal person; its shareholders are liable only for what is unpaid on their shares.', lo: 1 },
    { t: 'Public limited company', d: 'A company whose shares may be offered to the public. Heavier reporting and governance requirements follow from that, because the owners are numerous and absent.', lo: 1 },
    { t: 'Not-for-profit organisation', d: 'An organisation whose surplus cannot be distributed to owners and is reinvested in its purpose. It may still generate a surplus, and often must.', lo: 1 },
    { t: 'Separate legal person', d: 'A company owns its own assets, owes its own debts and can be sued in its own name. The reason a shareholder who has paid for their shares owes nothing more.', lo: 1 },
    { t: 'Unlimited liability', d: 'The owner’s personal assets stand behind the business’s debts. It follows from the business having no separate legal identity.', lo: 1 },
    { t: 'Separation of ownership from control', d: 'The gap between the people whose money is at stake and the people deciding how to spend it. Governance exists to manage it, and the wider it is the more formal governance has to be.', lo: 1 },
    { t: 'Retained profit', d: 'Profit kept in the business rather than drawn out. A source of funding that costs no interest — the owners simply forgo the cash now.', lo: 1 },
    { t: 'Working capital as funding', d: 'Releasing cash by collecting sooner, holding less stock or paying later. Nobody lends anything, and it is the source a finance function can most directly influence.', lo: 1 },
    { t: 'Goal congruence', d: 'The alignment of what individuals and departments pull towards with what the organisation wants. It fails when a sales team paid on volume sells below cost.', lo: 1 },
    { t: 'Shareholders’ rights', d: 'To vote, to appoint and remove directors, to receive the accounts, and to receive dividends when declared. Not to run the company: the power is to change the directors.', lo: 1 },
    { t: 'Directors’ duties', d: 'Act within powers; promote the company’s success; exercise independent judgement; exercise reasonable care, skill and diligence; avoid conflicts; refuse third-party benefits; declare interests.', lo: 1 },
    { t: 'Reasonable care, skill and diligence', d: 'The duty with TWO standards — what a reasonable director would do, and what this director’s own expertise makes possible. The higher one applies.', lo: 1 },
    { t: 'Partnership agreement', d: 'A private contract between partners covering capital, profit shares, salaries, interest and what happens when a partner joins or leaves. Filed nowhere, and often never written.', lo: 1 },
    { t: 'Partnership defaults', d: 'What applies with no agreement: profits shared EQUALLY whatever the capital or hours, no salaries, no interest on capital or drawings, and every partner may manage.', lo: 1 },
    { t: 'Goodwill', d: 'The value of a business above its identifiable net assets — reputation, customers, trained staff. Adjusted on a change of partner so a newcomer does not share it for nothing, then written out again.', lo: 1 },
    { t: 'Stakeholder', d: 'Anyone affected by what the business does: customers, suppliers, finance providers, owners, government, employees, regulators and the general public.', lo: 1 },
    { t: 'Stakeholder power', d: 'How much a stakeholder can do about it, which comes from DEPENDENCE rather than size. A sole supplier of an essential component outranks a large supplier of a commodity.', lo: 1 },
    { t: 'Functional structure', d: 'Grouped by what people do — finance, sales, production. Deep expertise, and departments that pull apart at the boundaries.', lo: 1 },
    { t: 'Divisional structure', d: 'Grouped by product, region or market. Close to the customer and accountable for its own result; functions are duplicated and divisions compete.', lo: 1 },
    { t: 'Matrix structure', d: 'Grouped by function AND by project at once. Expertise reaches where it is needed, and an employee reports to two managers who may want different things.', lo: 1 },
    { t: 'Span of control', d: 'How many people report to one manager. Widen it and the organisation gets flatter, because the same workforce fits under fewer managers.', lo: 1 },
    { t: 'Governance', d: 'The system of rules, practices and relationships by which an organisation is directed and controlled — who decides, who checks, and to whom they answer.', lo: 1 },
    { t: 'Centralised control', d: 'Decisions made at the top. Consistent and cheap at scale; slow, and local knowledge goes unused.', lo: 1 },
    { t: 'Decentralised control', d: 'Decisions pushed down to divisions or sites. Responsive and develops managers; inconsistent and harder to control.', lo: 1 },
    { t: 'Operational level', d: 'Running today’s work. Needs detailed, internal, frequent and exact information.', lo: 1 },
    { t: 'Strategic level', d: 'Setting direction over years. Needs highly summarised information, much of it external and uncertain.', lo: 1 },
    { t: 'Risk', d: 'A situation where the possible outcomes are known and probabilities can be estimated. It can be measured, priced and insured.', lo: 1 },
    { t: 'Uncertainty', d: 'A situation where no probability can be attached — how a new competitor will price next year. Techniques that assume probabilities do not apply to it.', lo: 1 },
    { t: 'Business risk', d: 'Risk inherent in the trade itself — demand for the product falling.', lo: 1 },
    { t: 'Financial risk', d: 'Risk arising from how the business is funded and manages money — a rate rise on variable borrowing, or a large customer not paying.', lo: 1 },
    { t: 'Strategic risk', d: 'Risk to the long-term direction — a technology change making the main product obsolete.', lo: 1 },
    { t: 'Operational risk', d: 'Risk from internal processes, people, premises and systems failing. Cyber risk and reputational risk sit here.', lo: 1 },
    { t: 'Risk transfer', d: 'Moving the financial consequence to somebody else, usually by insurance. It pays the money; it does not restore the customers who left.', lo: 1 },
    { t: 'Risk acceptance', d: 'Carrying a risk knowingly, as a recorded decision. A risk nobody has written down has not been accepted — it has been missed.', lo: 1 },

    /* ── BUAW · Outcome 2 · The environment ─────────────────────────────── */
    { t: 'PESTLE', d: 'A checklist for the macro environment: Political, Economic, Social, Technological, Legal, Environmental. Its value is that it stops you noticing only the factor you were already worried about.', lo: 2 },
    { t: 'Political factor', d: 'Government action — policy, taxation, imports and exports, public spending. The test is whether it is a policy CHOICE.', lo: 2 },
    { t: 'Economic factor', d: 'A movement in the economy — interest rates, exchange rates, disposable income, business cycles, inflation.', lo: 2 },
    { t: 'Social factor', d: 'People and society — demographic change, trends, unemployment. Demographics move slowly and predictably; trends can turn in a season.', lo: 2 },
    { t: 'Technological factor', d: 'Changes in technology, and their impact on STRUCTURE: automation removes the people who did the work and the layer that supervised them.', lo: 2 },
    { t: 'Legal factor', d: 'A rule that must be obeyed — trade regulations, changes in law. Distinguished from political by whether it is a choice or an obligation.', lo: 2 },
    { t: 'Environmental factor', d: 'Changes in the natural world, and sustainability. A law about emissions is legal; the changing weather is environmental.', lo: 2 },
    { t: 'Demand-pull inflation', d: 'Prices rising because buyers compete for goods the economy cannot supply fast enough. Usually accompanies a strong economy.', lo: 2 },
    { t: 'Cost-push inflation', d: 'Prices rising because supplying has become dearer — wages, energy, materials. It can happen while demand is weak, which is the squeeze that cannot be passed on.', lo: 2 },
    { t: 'Exchange rate', d: 'What one currency buys of another. A weaker pound makes imports dearer and exports more competitive, so the same movement helps and hurts different businesses.', lo: 2 },
    { t: 'Equilibrium price', d: 'The price at which the quantity buyers want equals the quantity sellers will provide. Above it a surplus pushes price down; below it a shortage pushes it up.', lo: 2 },
    { t: 'Movement along a curve', d: 'What happens when the price of the good ITSELF changes: quantity adjusts and the relationship is unchanged.', lo: 2 },
    { t: 'Shift of a curve', d: 'What happens when anything OTHER than the good’s own price changes — incomes, tastes, input costs, the number of producers. A new equilibrium at a new price and quantity.', lo: 2 },
    { t: 'Normal good', d: 'One whose demand rises as income rises. Most goods.', lo: 2 },
    { t: 'Necessity', d: 'A good bought whatever the price within reason, so demand moves little. Cutting the price of one reduces revenue.', lo: 2 },
    { t: 'Substitute goods', d: 'Goods that can be used instead of one another. A rise in the price of A raises demand for B.', lo: 2 },
    { t: 'Complementary goods', d: 'Goods used together. A rise in the price of A REDUCES demand for B — printers and cartridges.', lo: 2 },
    { t: 'Barriers to entry', d: 'What stops a competitor entering a market: licences, regulatory controls, set-up cost, scarce expertise. They are what allow a good margin to persist.', lo: 2 },
    { t: 'Sustainability', d: 'Meeting the needs of the present without compromising the ability of future generations to meet their own. Not a synonym for environmentalism.', lo: 2 },
    { t: 'Three aspects of sustainability', d: 'Social, ecological/environmental, and economic/financial. All three must hold — a plan that bankrupts the business is not sustainable.', lo: 2 },
    { t: 'Public interest duty', d: 'The accountant’s duty to protect society as a whole, and the organisation’s own sustainability. It is what makes accountancy a profession rather than a trade.', lo: 2 },

    /* ── BUAW · Outcome 3 · Professional ethics ─────────────────────────── */
    { t: 'Integrity', d: 'Being straightforward and honest. Breached by being knowingly associated with misleading information — including by omission and by staying silent.', lo: 3 },
    { t: 'Objectivity', d: 'Not letting bias, conflict of interest or pressure override judgement. It is not enough to be objective; an accountant must also APPEAR objective.', lo: 3 },
    { t: 'Professional competence and due care', d: 'Keeping knowledge current and doing the work carefully. It requires refusing work beyond your ability, and it is what CPD supports.', lo: 3 },
    { t: 'Confidentiality', d: 'Not disclosing what you learn at work, or using it for your own advantage. It applies to employers and clients, current and former, and does not end when the job does.', lo: 3 },
    { t: 'Professional behaviour', d: 'Obeying the law and avoiding conduct that would discredit the profession. Compliance with law is a MINIMUM — a lawful act is not automatically ethical.', lo: 3 },
    { t: 'Conflict of interest', d: 'Having an interest that competes with a duty owed. It includes financial interests and incentives linked to reported figures or to a decision.', lo: 3 },
    { t: 'Professional scepticism', d: 'Assessing information critically, with a questioning mind, alert to misstatement due to error or fraud. Not suspicion of everybody — refusing to accept an explanation because it was offered by someone plausible.', lo: 3 },
    { t: 'Self-interest threat', d: 'The accountant stands to gain or lose personally — a bonus tied to profit, a shareholding in the client.', lo: 3 },
    { t: 'Self-review threat', d: 'The accountant is judging their own earlier work, so finding a problem means admitting a mistake.', lo: 3 },
    { t: 'Advocacy threat', d: 'The accountant promotes a client’s position to the point of losing objectivity about it.', lo: 3 },
    { t: 'Familiarity threat', d: 'The accountant is too close or too sympathetic to question what they are told — a long relationship, or a relative in the team.', lo: 3 },
    { t: 'Intimidation threat', d: 'The accountant is deterred by pressure, real or perceived — a threat of dismissal, of losing the client, or of litigation.', lo: 3 },
    { t: 'Safeguard', d: 'An action that reduces a threat to an acceptable level: a second reviewer, rotation, declaring an interest, a written policy, or declining the work.', lo: 3 },
    { t: 'Principles-based approach', d: 'A code stating what must be achieved, requiring judgement in each case. It covers situations nobody anticipated, and cannot be complied with to the letter by someone acting badly.', lo: 3 },
    { t: 'Rules-based approach', d: 'A code listing what is and is not permitted. Certain and easy to test, silent about anything not listed, and it invites "it does not say I cannot".', lo: 3 },
    { t: 'Ethical conflict resolution', d: 'Establish the facts, raise it internally, take confidential advice, consider external disclosure with advice, and resign if it cannot be resolved. In that order.', lo: 3 },
    { t: 'Whistle-blowing', d: 'Reporting wrongdoing, following the organisation’s formal internal procedure where one exists. Advice should be taken before any external disclosure.', lo: 3 },
    { t: 'Public interest disclosure protection', d: 'Statutory protection that may be available for an external disclosure about certain illegal or unethical acts. Conditional, not automatic — which is why advice comes first.', lo: 3 },
    { t: 'Professional indemnity insurance', d: 'Cover required in practice, meeting claims for professional negligence or breach of contract that follow a failure of competence and due care.', lo: 3 },
    { t: 'Money laundering', d: 'Handling the proceeds of crime so that they appear legitimate. Three stages: placement, layering, integration.', lo: 3 },
    { t: 'Placement', d: 'Getting criminal cash into the financial system — small deposits, or mixing it with the takings of a cash business. The riskiest stage for the launderer.', lo: 3 },
    { t: 'Layering', d: 'Moving the money through transactions, accounts and jurisdictions to obscure where it came from.', lo: 3 },
    { t: 'Integration', d: 'The money emerging with an explanation — a property, a business, a salary.', lo: 3 },
    { t: 'Failure to disclose', d: 'The offence of suspecting money laundering in the course of regulated work and not reporting it. SUSPICION is the threshold, not proof.', lo: 3 },
    { t: 'Tipping off', d: 'The offence of telling the suspect, or anyone else, that a report has been made or an investigation is under way. Often committed by an accountant trying to be fair to a client.', lo: 3 },
    { t: 'Prejudicing an investigation', d: 'The offence, which any person can commit, of falsifying, concealing or destroying relevant documents, or making a disclosure that could prejudice an investigation.', lo: 3 },
    { t: 'Protected disclosure', d: 'A report of a suspicion made through the proper channel. It protects the discloser from a claim for breach of confidentiality.', lo: 3 },
    { t: 'Authorised disclosure', d: 'A report made BEFORE doing an act that might otherwise be an offence, seeking consent to proceed.', lo: 3 },
    { t: 'Suspicious activity report', d: 'The report identifying who is suspected, what is suspected and why, and the information it rests on. Made as soon as practicable, and never mentioned to the client.', lo: 3 },

    /* ── BUAW · Outcome 4 · Technology and data security ────────────────── */
    { t: 'Automation of processes', d: 'Software doing repetitive work without keying — bank feeds, recurring journals, invoice capture. It moves the work, not the accountability.', lo: 4 },
    { t: 'Machine learning', d: 'Software inferring a rule from past behaviour rather than being given one — suggesting codings, flagging anomalies a fixed rule would miss.', lo: 4 },
    { t: 'Blockchain', d: 'A shared, append-only ledger: entries cannot be altered once written, and every participant holds the same record. Immutability and shared visibility, not speed.', lo: 4 },
    { t: 'Data analytics', d: 'Interrogating whole populations rather than samples, and finding patterns in them.', lo: 4 },
    { t: 'Outsourcing', d: 'Another organisation doing the work. About WHO does it.', lo: 4 },
    { t: 'Offshoring', d: 'The work being done in another country. About WHERE it is done — a task can be one, both or neither.', lo: 4 },
    { t: 'Cloud accounting', d: 'Software run on the provider’s servers and reached through a browser. Access from anywhere, remote storage, automation, add-ins, stakeholder interaction and real-time data.', lo: 4 },
    { t: 'Off-the-shelf software', d: 'Sold ready-made to many businesses. Cheap, available now, well supported, and it only does what it was built to do.', lo: 4 },
    { t: 'Bespoke software', d: 'Written for one business, so it fits exactly. Costs more, takes longer, and support depends on whoever wrote it.', lo: 4 },
    { t: 'Data protection principles', d: 'Lawfulness, fairness and transparency; purpose limitation; data minimisation; accuracy; storage limitation; integrity and confidentiality; accountability.', lo: 4 },
    { t: 'Purpose limitation', d: 'Personal data collected for a stated purpose may not be reused for an unrelated one.', lo: 4 },
    { t: 'Data minimisation', d: 'Collecting only what is needed for the purpose, not everything that might be handy.', lo: 4 },
    { t: 'Storage limitation', d: 'Not keeping personal data longer than the purpose requires. It needs a retention schedule that actually deletes.', lo: 4 },
    { t: 'Accountability', d: 'The organisation must be able to DEMONSTRATE compliance, not merely assert it. Being careful in practice is not evidence.', lo: 4 },
    { t: 'Access levels', d: 'Restricting what each user can see and do to what their role needs. The control that limits the damage an insider or a stolen password can do.', lo: 4 },
    { t: 'Input control', d: 'A check on data as it enters the system — validation rules, range checks, and a second person approving a change of supplier bank details.', lo: 4 },
    { t: 'Processing control', d: 'A check that the system did what it should — batch totals, reconciliations, exception reports.', lo: 4 },
    { t: 'Output control', d: 'A check on what leaves the system and who receives it — review before issue, and a reviewed distribution list.', lo: 4 },
    { t: 'Phishing', d: 'A message appearing to come from someone trusted, designed to obtain credentials or a payment. The attack firewalls and anti-virus do not stop, because a person lets it in.', lo: 4 },
    { t: 'Ransomware', d: 'Data encrypted and held to ransom. It risks the data AND the ability to operate, and the second is usually the larger immediate loss.', lo: 4 },
    { t: 'Cybersecurity', d: 'Preventing, detecting, responding to and recovering from attacks. A backup nobody has restored from is a hope rather than a control.', lo: 4 },

    /* ── BUAW · Outcome 5 · Communicating information ───────────────────── */
    { t: 'Good quality information', d: 'Accurate, complete, relevant, timely, understandable, reliable, cost-effective and accessible. The standard for accuracy is accurate ENOUGH, in time.', lo: 5 },
    { t: 'Timeliness', d: 'Arriving in time to be acted on. A figure accurate to the penny that arrives after the decision has been made is worthless.', lo: 5 },
    { t: 'Cost-effectiveness of information', d: 'Producing it must cost less than the better decision is worth. A £9,000 study to refine a £1,200 decision fails this whatever else it does.', lo: 5 },
    { t: 'Big data', d: 'Data too large and varied for conventional tools. Five characteristics: volume, velocity, variety, veracity, value.', lo: 5 },
    { t: 'Volume', d: 'How much data there is. Size does not make a conclusion more likely to be right — it makes a wrong one look better supported.', lo: 5 },
    { t: 'Velocity', d: 'How fast the data arrives, and how fast it has to be used.', lo: 5 },
    { t: 'Variety', d: 'How many forms the data takes — numbers, text, images, sensor readings, clicks.', lo: 5 },
    { t: 'Veracity', d: 'How far the data can be trusted: its accuracy, its bias and its gaps. One of the two characteristics that can be absent.', lo: 5 },
    { t: 'Value', d: 'Whether anything useful can actually be extracted. The other characteristic that can be absent, however much data there is.', lo: 5 },
    { t: 'Internal data source', d: 'Data generated by processes the business controls and can check — transactions, till data, website activity, sensors on its own vehicles.', lo: 5 },
    { t: 'External data source', d: 'Data the business did not see collected — social media, government statistics, purchased datasets. It arrives with whatever bias was in its collection.', lo: 5 },
    { t: 'Dashboard', d: 'A continuous view of a position, designed for stakeholders who will not read a report. It shows what, not why.', lo: 5 },
    { t: 'Truncated axis', d: 'A chart axis starting above zero, which exaggerates a small difference. Nothing stated is false, which is what makes it effective and what makes it an integrity matter.', lo: 5 },
    { t: 'Anomaly', d: 'A figure that does not fit the pattern around it. It is a question to be investigated, not a nuisance to be smoothed, excluded or averaged away.', lo: 5 },
    { t: 'Professional communication', d: 'Meeting the stakeholder’s actual requirement, in a medium suited to the outcome, with valid information, respecting confidentiality.', lo: 5 },
    { t: 'Choosing a medium', d: 'Decided by the audience, the urgency, the complexity, whether a record is needed and how sensitive it is — not by what is convenient for the sender.', lo: 5 },
  ];

  var AAT3_GLOSSARY = { UNITS: { tpfb: TPFB, faps: FAPS, mats: MATS, buaw: BUAW } };

  if (typeof module === 'object' && module.exports) module.exports = { AAT3_GLOSSARY: AAT3_GLOSSARY };
  else root.AAT3_GLOSSARY = AAT3_GLOSSARY;
}(typeof self !== 'undefined' ? self : this));
