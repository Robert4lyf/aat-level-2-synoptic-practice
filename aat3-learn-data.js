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

    /* ── Orientation ────────────────────────────────────────────────────────
       Neither of these covers new syllabus content — they exist because the
       material previously opened straight into building a VAT return, with no
       account of what VAT is, why a business collects it, or what the reader
       already knows from Level 2. `criteria: []` is honest: this is the
       chapter opening a textbook would have, not syllabus coverage. */
    {
      id: 'L3-TPFB-0A',
      title: 'Where this unit fits',
      icon: '🧭',
      criteria: [],
      cards: [
        {
          h: 'What Tax Processes for Businesses is about',
          p: [
            'This unit is about **two taxes a business handles on other people\'s behalf**. VAT is collected from its customers for HMRC. Payroll taxes are deducted from its employees, again for HMRC. In neither case is the business paying tax of its own.',
            'That framing matters more than it first appears, and it is worth pausing on, because almost every rule in the unit follows from it. If the money were the business\'s own, the state would have only the ordinary interest of a creditor in being paid. Because it is not — because a shop holds VAT belonging to the Exchequer between the moment a customer pays and the moment the return falls due — the law surrounds that money with obligations that would look disproportionate for an ordinary debt.',
            'So HMRC can require registration, dictate what records are kept and for how long, demand returns on a fixed calendar, inspect those records, visit premises, and levy penalties for lateness that bear little relation to the harm caused by a few days\' delay. None of that is arbitrary. It is what happens when a private business is conscripted as a tax collector.',
            'Keep that thread in mind as you read. When a rule looks fussy — why a valid VAT invoice is required before input tax can be reclaimed, why a deposit can create a tax liability before anything has been delivered, why a penalty starts accruing on a named day — the answer is almost always that the system is protecting public money held in private hands.',
            'It is worth saying plainly what this unit is **not**. It is not about how much tax a business owes on its own profits. Corporation tax, and the income tax a sole trader pays on trading profit, belong to different units at a different level. If you have met the phrase *adjusting accounting profit for tax*, that is not this. The specification is explicit that even within payroll you are not asked to calculate income tax, National Insurance or student loan deductions — you are given those figures and asked to handle them correctly.',
          ],
          callout: { kind: 'key', text: 'The whole unit sits on one idea: the money is not yours. You are holding it, recording it, and handing it over on time.' },
        },
        {
          h: 'How the unit is assessed',
          table: {
            headers: ['', ''],
            rows: [
              ['Assessment', 'Computer based, computer marked'],
              ['Length', String(T.FINANCE_ACT ? 90 : 90) + ' minutes'],
              ['Pass mark', '70%'],
              ['Share of the qualification', '15%'],
              ['Guided learning hours', '60 — the smallest unit at Level 3'],
              ['Tax year', T.FINANCE_ACT + ', assessable from ' + T.ASSESSABLE_FROM],
            ],
          },
          p: [
            'Tax Processes for Businesses is assessed on its own, in a single sitting, and the result feeds into the overall qualification grade alongside the other three units.',
            'Two features of that assessment should shape how you study. The first is that it is **computer marked**. There is no extended written answer to compose and no examiner judgement to satisfy: an answer is either right or it is not. Compare that with Business Awareness, where 29 of the 100 marks are free text marked by a human — and one task of those is graded against level-of-response bands rather than a mark scheme of right answers. Here there is no credit for a well-argued wrong answer — and equally no risk of a good answer being marked down for how it is expressed.',
            'That makes the unit unusually **learnable**. The rule set is finite. The thresholds, deadlines, categories and adjustments can all be known, and knowing them is most of the mark. Very little is left to interpretation.',
            'The second feature is the flip side of the first: **precision counts absolutely**. A figure that is nearly right is wrong. A rule remembered approximately — six months rather than four years, output tax rather than input tax, the gross figure rather than the net — loses the mark outright. Where other units reward broad understanding, this one rewards exactness, and revision should be adjusted accordingly: learn the numbers, not the gist of them.',
          ],
        },
        {
          h: 'The five outcomes, and their weight',
          table: {
            headers: ['Outcome', 'Weight', 'What it asks of you'],
            rows: [
              ['1. Legislation relating to VAT', '25%', 'Know the rules — registration, schemes, deadlines, penalties'],
              ['2. Calculate VAT', '**30%**', 'Do the arithmetic and the adjustments'],
              ['3. Review and verify VAT returns', '20%', 'Check a return, correct errors, reconcile'],
              ['4. Principles of payroll', '15%', 'Employer duties, the pay figures, RTI'],
              ['5. Report information', '10%', 'Tell the right person the right thing in time'],
            ],
          },
          p: [
            'The unit divides into five learning outcomes, and they are not equally weighted. Knowing the split tells you where the marks are.',
            'VAT dominates. Three of the five outcomes are VAT and nothing else, and they carry 75% of the assessment between them. Payroll is a single outcome worth 15%, and it is about the employer\'s **obligations** rather than the tax computation — you are told what the deductions are and asked to handle, reconcile and report them correctly. The last 10% sits across both: Outcome 5 is about communicating VAT *and* payroll matters to the right person in the right way.',
            '**You are starting at Outcome 2.** That is deliberate rather than an oversight. It is the largest outcome, it is where the actual work of the unit lives, and it is the part that most rewards being taught carefully rather than looked up. The cost of starting there is that the background Outcome 1 would have supplied — what VAT is, who bears it, why the machinery exists at all — has not been laid down yet. The next chapter supplies exactly that, before any calculation begins.',
            'One thing worth flagging now: the outcomes are not independent of each other. Outcome 3 asks you to review and correct a return that Outcome 2 taught you to build. Outcome 5 asks you to explain to somebody else what Outcomes 1 to 4 established. Material learned here is drawn on repeatedly later, which is another reason to learn it properly the first time.',
          ],
        },
        {
          h: 'What you already know',
          p: [
            'If you have come from Level 2 you have already met VAT twice — once in Introduction to Bookkeeping, and again in Principles of Bookkeeping Controls. You know more than you may think, and it is worth being precise about the boundary, because the temptation is either to assume everything ahead is new or to assume it is all revision. Neither is true.',
            'What Level 2 gave you was **mechanical competence**. You can charge VAT on a sale and reclaim it on a purchase. You know output tax and input tax, and that only the difference is settled with HMRC. You can move between net and gross at the standard rate. You have posted VAT through the daybooks into a control account, and you know that account should agree with the return.',
            'What Level 2 did not give you was **judgement**, and that is the whole of the difference. It never asked which rate applied, because everything was standard-rated. It never asked which period a supply belonged to, because the invoice date was always taken as correct. It never asked whether the input tax could be recovered at all, because it always could. And it never asked what to do when a figure turned out to be wrong.',
            'Level 3 asks all four of those questions, constantly. That is why the material ahead spends so much time on categories, dates and restrictions rather than on arithmetic — the arithmetic you can already do.',
          ],
          split: {
            left: { title: 'Already yours from Level 2', items: ['VAT is charged on sales and reclaimed on purchases', 'Output tax and input tax, and that only the difference is settled', 'The standard rate is 20%, and gross ÷ 6 gets you the VAT', 'The VAT control account, and that it should agree with the return', 'Returns are usually quarterly and filed through Making Tax Digital'] },
            right: { title: 'New at Level 3', items: ['*Why* the system works this way, and who actually bears the tax', 'Which supplies are standard, reduced, zero-rated, exempt or outside the scope', 'Tax points — the date a supply legally belongs to', 'What cannot be reclaimed at all, and partial exemption', 'Adjustments: discounts, fuel, bad debts, imports', 'Registration, schemes, penalties and error correction'] },
          },
          callout: { kind: 'tip', text: 'Level 2 taught you to *record* VAT. Level 3 asks you to *decide* it — which rate, which period, which amounts are recoverable, and what to do when something was wrong.' },
        },
      ],
      check: [
        {
          q: 'Whose tax is the VAT a business charges its customers?',
          opts: [
            'The customer’s — the business collects it on HMRC’s behalf',
            'The business’s own, calculated on its profits for the period',
            'HMRC’s, and the business may keep any it does not spend',
            'Nobody’s until the VAT return is submitted and accepted',
          ],
          ans: 0,
          exp: 'VAT is a tax on consumer spending. A registered business charges it, holds it, and pays it over — it is never the business’s own money, which is why the record-keeping and deadline rules are as strict as they are.',
        },
        {
          q: 'Which of these is NOT part of Tax Processes for Businesses?',
          opts: [
            'Calculating the income tax a sole trader owes on their profits',
            'Deciding whether a business must register for VAT',
            'Working out an employee’s net pay from given deductions',
            'Correcting an error found on a previous VAT return',
          ],
          ans: 0,
          exp: 'The unit covers VAT and the employer’s payroll obligations. Computing income tax on business profits belongs elsewhere — and the specification explicitly excludes calculating income tax, National Insurance and student loan repayments from this unit.',
        },
      ],
    },
    {
      id: 'L3-TPFB-0B',
      title: 'How VAT actually works',
      icon: '⛓️',
      criteria: ['TPFB-2.3.1'],
      cards: [
        {
          h: 'A tax on spending, collected in instalments',
          p: [
            'VAT is a tax on **consumer spending**. The person who ultimately bears it is the final customer — you, buying something in a shop. That sentence is the foundation of everything else in the unit, and it is worth reading twice, because almost every confusion about VAT comes from losing sight of it.',
            'What makes VAT unusual, and worth a unit of its own, is the way it is collected. HMRC does not take the tax from that final customer directly. It collects the same tax in instalments, from every business in the chain that brought the goods to the shelf — and each business hands over only the tax on the **value it added** at its own stage.',
            'That is where the name comes from. Value Added Tax is not really a tax on value added in any economic sense; it is a tax on consumption, collected by reference to value added, because collecting it that way spreads the administrative burden across the supply chain and makes evasion harder. If one retailer under-declares, the tax has still been collected from everyone above them in the chain.',
            'The consequence for a registered business is that VAT should pass **through** it rather than stick to it. It charges tax on what it sells, recovers tax on what it buys, and settles the difference. Across the life of a transaction the business should be neither better nor worse off.',
            'Understanding that mechanism is the difference between memorising rules and knowing why they exist. The worked example on the next card is the clearest demonstration of it, and it is worth following slowly even though the arithmetic is trivial — the arithmetic is not the point.',
          ],
        },
        {
          h: 'Following one item along the chain',
          p: [
            'The clearest way to see the mechanism is to follow a single item from factory to shopper and watch what each business hands over. Work through it slowly: the arithmetic is trivial, but the pattern it reveals is the whole of how VAT works.',
          ],
          worked: {
            title: 'The same £50 of tax, collected in three pieces',
            problem: 'A manufacturer sells goods to a wholesaler for £100 plus VAT. The wholesaler sells them on to a retailer for £160 plus VAT. The retailer sells them to a member of the public for £250 plus VAT. How much does each business pay HMRC, and what does the consumer bear?',
            steps: [
              { do: 'The manufacturer charges £20 and reclaims nothing.', why: '£100 × 20% = £20 of output tax. Assume no input tax on this item, so the manufacturer pays HMRC the full £20.' },
              { do: 'The wholesaler charges £32 and reclaims £20.', why: '£160 × 20% = £32 of output tax, less the £20 of input tax it was charged. It pays HMRC £12 — the tax on the £60 of value it added.' },
              { do: 'The retailer charges £50 and reclaims £32.', why: '£250 × 20% = £50 of output tax, less £32 of input tax. It pays HMRC £18 — the tax on the £90 of value it added.' },
              { do: 'Add up what HMRC received.', why: '£20 + £12 + £18 = £50. Exactly the VAT the consumer paid, and not a penny more.' },
              { do: 'Notice what it cost each business.', why: 'Nothing. Each one recovered every pound of VAT it was charged. The tax was borne entirely by the consumer, who has nobody to reclaim from.' },
            ],
            answer: 'HMRC receives £50 in three instalments; the consumer bears all of it and the businesses bear none',
            tryIt: {
              q: 'A distributor buys goods for £400 plus VAT and sells them for £700 plus VAT, both at the standard rate. How much VAT does it pay over to HMRC, in pounds?',
              answer: 60,
              unit: '£',
              hint: 'Output tax less input tax — or, more quickly, the rate applied to the value it added.',
              exp: 'Output tax £700 × 20% = £140. Input tax £400 × 20% = £80. It pays £140 − £80 = £60. The shortcut is the same answer: the value added was £300, and £300 × 20% = £60.',
            },
          },
        },
        {
          h: 'Why registered businesses are collectors, not payers',
          p: [
            'Three consequences follow from the chain, and each explains a rule you will meet later. They are worth stating explicitly, because in the assessment they usually appear as facts to be recalled rather than conclusions to be reasoned to — and a fact that is understood is much harder to forget.',
            '**First, VAT should be broadly neutral for a registered business.** It charges VAT, it reclaims VAT, and it settles the difference. Neither figure touches profit, because neither is its money. This is exactly why the exceptions sting. When input tax is blocked — on client entertaining, or on a car available for any private use — the VAT stops passing through and becomes a real, unrecoverable cost. A car priced at £30,000 before VAT carries £6,000 of input tax that can never be reclaimed, so it genuinely costs the business £36,000.',
            '**Second, the money passing through is not the business\'s own.** Between charging a customer and paying HMRC, the business is holding public money. That is the justification for the entire compliance apparatus: prescribed records kept for a prescribed period, powers of inspection and premises visits, a fixed filing calendar, and penalties that begin on a specific day regardless of intent. A business that spends its VAT and then cannot pay has, in substance, spent somebody else\'s money.',
            '**Third, only the final consumer bears the tax.** The chain of charge-and-reclaim passes the burden along untouched until it reaches someone who cannot reclaim. Usually that is a private individual. But it can equally be a business making exempt supplies — an insurance broker, say — which cannot recover its input tax and therefore absorbs it exactly as a consumer does. That is not an accident in the rules. It is what exemption means, and it is why the difference between exempt and zero-rated matters so much later.',
          ],
          callout: { kind: 'warning', text: 'The neutrality is the general rule, not a guarantee. Blocked input tax, partial exemption and the flat rate scheme are all places where VAT does become a real cost to a business.' },
        },
        {
          h: 'Output tax and input tax',
          split: {
            left: { title: 'Output tax', items: ['VAT on what the business **sells**', 'Charged to the customer', 'Owed to HMRC', 'Goes on the return as tax due'] },
            right: { title: 'Input tax', items: ['VAT on what the business **buys**', 'Charged by the supplier', 'Reclaimed from HMRC', 'Goes on the return as tax recoverable'] },
          },
          formula: 'VAT payable to HMRC = Output tax − Input tax · Input tax greater than output tax means a repayment is due',
          p: [
            'Two terms carry the whole of the arithmetic in this unit, and they are transposed under time pressure often enough that it is worth fixing them firmly now.',
            '**Output tax** is the VAT on what the business sells — its outputs. It is charged to the customer and owed to HMRC. **Input tax** is the VAT on what the business buys — its inputs. It is charged by the supplier and recoverable from HMRC.',
            'The mnemonic that survives an exam is the plain one: *outputs* go *out* to customers, and the tax on them is output tax. Everything else follows from that.',
            'You met both terms at Level 2, so why restate them? Because everything in this outcome is ultimately a decision about which of the two a figure belongs to, and whether it counts at all. A credit note issued to a customer reduces output tax; one received from a supplier reduces input tax. A fuel scale charge increases output tax; bad debt relief increases input tax. Putting a figure on the wrong side does not produce a slightly wrong answer — it moves the result by twice the amount, and produces a confidently wrong one.',
          ],
        },
        {
          h: 'What a VAT return is, and when it happens',
          p: [
            'A **VAT return** is a periodic declaration — for most businesses covering three months — of the output tax charged and the input tax reclaimed, with the difference either paid to HMRC or repaid by them.',
            'It is worth being clear about what it is not. It is not an invoice, a demand, or an assessment raised by HMRC. It is the business\'s own statement of what it believes it owes. That is precisely why the system surrounds it with rules about evidence, and why the penalty regime is as developed as it is: HMRC is relying on the taxpayer\'s own declaration, and a self-assessed tax only works if that declaration can be trusted and checked.',
            'Filing and payment are both due **one calendar month and seven days** after the period ends. A quarter ending 31 March is therefore due on 7 May. Note that the deadline covers both the return and the money — submitting on time but paying late still attracts a penalty, and the two failures are penalised under entirely separate regimes.',
            'The return must be submitted from **functional compatible software** under Making Tax Digital, with the underlying records kept digitally and digital links between them. The practical effect is that a figure entered wrongly at source now flows straight through to submission with no manual stage at which anybody would notice. That raises the stakes on everything in the next lesson considerably.',
            'The rest of this outcome walks the process in order: finding the right figures, valuing them correctly, deciding what is recoverable, applying the adjustments, and arriving at a single number.',
          ],
          flow: ['Trade for three months', 'Extract the figures', 'Calculate the VAT', 'Check and submit', 'Pay HMRC'],
          callout: { kind: 'tip', text: 'The rest of this outcome walks that flow in order — finding the figures, valuing them correctly, deciding what is recoverable, applying adjustments, and arriving at a single number.' },
        },
      ],
      check: [
        {
          q: 'A wholesaler buys goods for £500 plus VAT and sells them for £800 plus VAT. How much VAT does it pay to HMRC?',
          opts: ['£60', '£160', '£100', '£260'],
          ans: 0,
          exp: 'Output tax £160, input tax £100, so £60 is paid over — the tax on the £300 of value added. The £160 answer is the output tax before recovering the input tax the wholesaler was itself charged.',
        },
        {
          q: 'In a chain of registered businesses ending in a sale to a member of the public, who ultimately bears the VAT?',
          opts: [
            'The final consumer, who has nobody to reclaim from',
            'Each business in the chain, in proportion to its sales',
            'The manufacturer, who charged the VAT first',
            'It is shared equally between the businesses and the consumer',
          ],
          ans: 0,
          exp: 'Every registered business in the chain reclaims the VAT it was charged, so none of them bears any of it. The tax stops with the consumer, who cannot reclaim — which is why VAT is described as a tax on consumer spending.',
        },
        {
          type: 'truefalse',
          q: 'Decide whether each statement about how VAT works is true or false.',
          statements: [
            { text: 'Output tax is the VAT a business is charged by its suppliers.', answer: false },
            { text: 'For most registered businesses VAT is broadly cost-neutral.', answer: true },
            { text: 'A VAT return is a demand issued to the business by HMRC.', answer: false },
            { text: 'A business can be in a repayment position if input tax exceeds output tax.', answer: true },
          ],
          exp: 'Output tax is on sales and input tax on purchases — the reverse of the first statement. VAT is broadly neutral because both sides are recovered, though blocked input tax and partial exemption are real exceptions. And the return is the business’s own declaration, not a demand.',
        },
      ],
    },

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
            'You now know what a VAT return is and what it declares. This lesson is about the first practical step in producing one: getting the right numbers out of the books.',
            'Every VAT return is assembled from records the business already keeps. Nothing on it is invented at the period end. The whole task is finding the right figures, for the right period, from records you can stand behind — and it is a task that goes wrong far more often than the arithmetic does.',
            'That is why this outcome starts here rather than with calculation. A perfectly executed sum performed on the wrong month\'s data is simply a wrong return. Worse, it is a wrong return that passes every internal check: the arithmetic reconciles, the software raises no flag, and the figure looks entirely plausible. Errors of this kind are typically found months later by HMRC, or not at all.',
            'There is a change of direction here that is worth naming. At Level 2 you worked forwards: a transaction happened, and you posted it. Here you work backwards. You start from the return, ask what each box requires, and go looking for the evidence that supports it. The skill being tested is selection and verification rather than recording.',
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
            'Almost everything needed is already in the books; the skill is knowing which record answers which question, and what each one is liable to hide.',
            'One entry in the table deserves separate treatment. The **VAT control account** is best thought of as a check rather than a source. It is built independently, by posting daybook totals through the ledger, so if the return and the control account disagree the difference is a genuine finding rather than a nuisance. It points at a posting error, a missing adjustment, or a transaction sitting in the wrong period — and it is the single most useful reconciliation available before submission.',
            'The other entry worth naming is the software\'s own draft return. It is a starting point, not an answer. It reflects every configuration decision made when suppliers and nominal codes were set up, and it will reproduce a systematic error perfectly for as long as that setup stands.',
          ],
        },
        {
          h: 'The right period, not the right month',
          p: [
            'A VAT period is defined by its **tax points**, not by when an invoice happened to be entered in the ledger or when the money moved. A transaction belongs to the period containing its tax point, however late it reached the books. The next lesson deals with how a tax point is determined; what matters here is the principle that it, and nothing else, decides which return a supply falls on.',
            'So the first job is to establish the exact date range the return covers, and then to select records whose tax points fall inside it. Two traps recur, and both are ordinary rather than exotic — they are what actually happens in a real business.',
            '**Cut-off at each end.** An invoice dated on the last day of the period belongs in that period, even if it was not posted until the following week. Conversely, an invoice posted on the first day of the new period but dated before the cut-off belongs to the old one. Real ledgers are full of both, because invoices arrive in the post and get entered when somebody has time.',
            '**Late-entered documents.** An invoice relating to a previous period, entered now, is not simply this period\'s. If the earlier return has already been submitted, including it here is not a tidy solution — it is an error correction, governed by its own thresholds and rules, which is the subject of Outcome 3. Quietly absorbing it into the current return may be acceptable if it falls within the correction limits, and may be a reportable error if it does not.',
            'The practical consequence is that you cannot build a return by filtering the ledger on posting date, however convenient that is. Accounting software will happily produce such a report, and it will look right.',
          ],
          callout: { kind: 'warning', text: 'Selecting by posting date rather than tax point is the single most common way to build a return from the wrong data. The software will not flag it, because nothing is arithmetically wrong.' },
        },
        {
          h: 'Validating what you have extracted',
          p: [
            'Extracting a figure is not the same as being able to support it. Input tax may only be reclaimed where there is evidence of the VAT actually charged — and an entry in the purchases day book is a record of what somebody typed, not evidence of anything.',
            'The primary evidence is a **valid VAT invoice**: one showing the supplier\'s VAT registration number, the date and tax point, a description of what was supplied, and the net, rate and VAT for each rate charged. Several documents that circulate alongside it are not VAT invoices and will not support a reclaim. A supplier\'s **statement** summarises what is owed across a month and shows no VAT analysis. A **pro-forma invoice** is a request for payment issued before the supply, expressly not a VAT invoice. A **delivery note** evidences that goods moved, not what tax was charged. An **order confirmation** evidences only an intention to trade.',
            'There are two sensible relaxations of the general rule, and they matter most exactly where the problem is worst. For supplies of **£25 or less including VAT** — car parking, road tolls, telephone calls, vending machines — no VAT invoice is required at all, provided the supplier is registered. And where an invoice genuinely cannot be obtained, HMRC has discretion to accept alternative evidence.',
            'Petty cash is where all of this bites. Small purchases arrive with till receipts, many of which carry no VAT number and no VAT analysis, and the amounts are small enough that nobody wants to spend time on them. But a reclaim that cannot be evidenced is a reclaim that will be denied on inspection, however genuine the underlying expense was.',
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
            'Accounting software applies whichever rate it has been configured to use, totals the result without arithmetic error, and drafts the return. It has removed one entire class of mistake from the process.',
            'It has not removed the other. The rate a supply attracts, whether a tax point falls in this period, whether input tax is recoverable at all — these are **judgements**. Software executes the judgement it was given when a supplier or a nominal code was set up; it does not make one. It cannot tell that a meal was client entertaining rather than staff subsistence, or that a car has private use, because nothing in the transaction data says so.',
            'The practical consequence is that errors have changed character rather than disappeared. They used to be random — a transposed digit, a missed line — and random errors are relatively easy to spot, because they look wrong. Errors now tend to be **systematic**: a supplier set up at the wrong rate produces a consistent, plausible error across every transaction with that supplier, for as long as the setup stands. Nothing looks odd, and the total is internally consistent.',
            'Under Making Tax Digital the return is filed from functional compatible software, with digital records and digital links between them. That is good for auditability and bad for catching things by eye, because it removes the manual re-keying stage at which somebody used to look at the numbers. Accuracy at the point of entry matters more than it used to, not less.',
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
            'You have the figures. Before they can be used, each supply has to be dated — and for VAT the date that matters is not always the one on the invoice, nor the day the money moved.',
            'The **tax point**, or time of supply, is the date a supply is treated as taking place for VAT purposes. It fixes three separate things at once, which is why it gets a topic area of its own rather than a passing mention.',
            'It determines **which VAT period** the supply falls into, and therefore which return declares it. It determines **which rate** applies, which matters whenever a rate has changed between the supply and the invoice. And it determines **eligibility for the special schemes**, several of which are defined by reference to when supplies are treated as made.',
            'So a supply with the wrong tax point is not a small error. It lands on the wrong return — understating one period and overstating the next — and if a rate changed in between, it is charged at the wrong rate as well. Neither problem is visible from the arithmetic.',
            'One reassurance: tax point questions are rarely about calculation. They give you a set of dates and ask you to apply a rule. The marks are in knowing which rule bites, and in what order to test them.',
          ],
          callout: { kind: 'key', text: 'Tax point questions are rarely about arithmetic. They ask you to apply a rule to a date, so the marks are in knowing which rule bites.' },
        },
        {
          h: 'Basic and actual tax points',
          p: [
            'Work through it in a fixed order, and the awkward cases stop being awkward.',
            'Start with the **basic tax point**: the date the goods are removed or made available to the customer, or the date a service is completed. This is the default, and it applies whenever nothing else overrides it.',
            'Then test for an **actual tax point**, which replaces the basic one. Two overrides matter, and they work in opposite directions along the calendar.',
            '**Payment or invoice before the basic tax point.** Whichever happens first becomes the tax point, and only for the amount concerned. A deposit received in advance creates a tax point for the deposit; the balance follows the normal rules and may well land in a different period.',
            '**An invoice issued within 14 days after the basic tax point.** Here the invoice date becomes the tax point instead. Note the direction: this rule can only move the tax point **forward**, to the invoice date. If the invoice is issued later than 14 days, the rule simply does not apply and the basic tax point stands — a late invoice never pushes a supply into a later period.',
            'The 14-day rule is not quite automatic in both directions. A supplier may ask HMRC to use the basic tax point instead, and HMRC may allow a period longer than 14 days where a business\'s invoicing cycle requires it. Neither is common, but both exist.',
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
              ['Deposit as part-payment', 'Same as an advance payment — a tax point is created when it is received.'],
              ['Refundable security deposit', 'Not consideration for a supply, so no tax point arises on receipt — for example a deposit against the safe return of hired goods.'],
              ['Continuous supply', 'The earlier of each invoice issued and each payment received.'],
              ['Goods on sale or return', 'When the customer adopts the goods, or 12 months from despatch if earlier.'],
            ],
          },
          p: [
            'Four situations come up repeatedly because the ordinary rules do not settle them cleanly, and each has its own answer.',
            'Advance payments and deposits are the ones most often missed, because they create a tax point for **part** of a supply before anything has been delivered. A single order can therefore straddle two VAT periods perfectly legitimately — the deposit in one, the balance in the next.',
            'One important qualification on deposits. A deposit taken as **security** — against the safe return of hired goods, say — is not consideration for a supply at all, and creates no tax point on receipt. Only a deposit that is a genuine part-payment towards the supply does. If the security deposit is later retained because the goods came back damaged, the position changes at that point.',
            'Note also that a business using the **cash accounting scheme** replaces these rules entirely: its tax point is the date payment is received or made. That is one of the reasons the tax point matters for scheme eligibility.',
          ],
        },
        {
          h: 'What a VAT invoice must carry, and its variants',
          split: {
            left: { title: 'Full VAT invoice', items: ['Unique sequential number', 'Supplier name, address and VAT number', 'Customer name and address', 'Date of issue and tax point', 'Description, quantity and rate for each supply', 'Net amount, rate of VAT, total VAT'] },
            right: { title: 'Variants', items: ['**Simplified** — for small retail supplies; less detail, no customer details, VAT-inclusive amounts', '**Modified** — for higher-value retail; shows VAT-inclusive totals with the VAT separately stated', '**Mixed-rated** — must show each rate separately, not one blended total'] },
          },
          p: [
            'A full VAT invoice has a prescribed content, and the customer\'s right to reclaim depends on it. An invoice missing the supplier\'s VAT number is not a minor irregularity — it is not evidence of input tax.',
            'Three variants relax the requirements in specific circumstances. A **simplified** invoice may be issued for retail supplies up to £250 including VAT: it omits the customer\'s details and shows VAT-inclusive amounts with the rate applied. A **modified** invoice is for higher-value retail supplies, showing VAT-inclusive totals with the VAT stated separately. Neither is a lesser document; each is valid evidence within its own limits.',
            '**Mixed-rated** supplies deserve particular care. Where one invoice covers items at different rates, each rate must be shown separately with its own net and VAT figures. A single blended total makes the invoice invalid as evidence for the customer\'s reclaim, because there is no way to establish how much VAT was charged at which rate.',
          ],
        },
        {
          h: 'Time limits and electronic invoicing',
          p: [
            'A VAT invoice must normally be issued within **30 days** of the basic tax point. Miss that, and the basic tax point stands — issuing late does not move the supply.',
            'The two periods are easy to confuse, because both concern the gap between a supply and its invoice, and both are counted in days from the same starting point. Keep the jobs separate. **Fourteen days moves the tax point** to the invoice date. **Thirty days is the deadline for issuing the document at all.** One is about which period the supply falls into; the other is a compliance obligation in its own right.',
            '**Electronic invoices** have exactly the same legal standing as paper ones. They must contain the same information, their authenticity of origin and integrity of content must be assured, and they must remain legible for the whole retention period. In practice the customer is expected to agree to receive them electronically, though that agreement can be tacit.',
            'There is no separate, lesser standard for e-invoices. A digital document missing the supplier\'s VAT number is exactly as invalid as a paper one, and a PDF that cannot be opened in six years\' time has not been retained in any meaningful sense.',
          ],
          callout: { kind: 'key', text: 'Two numbers, two jobs: ' + T.invoicing.actualTaxPointDays.value + ' days moves the tax point to the invoice date; ' + T.invoicing.issueWithinDays.value + ' days is the deadline for issuing the invoice.' },
        },
        {
          h: 'Working out a tax point',
          p: [
            'Tax point questions all have the same shape — a set of dates, and a decision about which period a supply belongs to. Work through the rules in a fixed order and they resolve mechanically.',
          ],
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
            'With the figures found and dated, this is where the arithmetic happens. Level 2 taught you these mechanics; they are revisited because Level 3 runs them in both directions, at two rates, and expects the rounding rules to be right.',
            '**Inputs** are what the business buys. **Outputs** are what it sells. **Input tax** is the VAT on its purchases; **output tax** is the VAT on its sales. The business collects output tax on HMRC\'s behalf and recovers the input tax it has been charged, and only the difference is settled.',
            'Getting the pairing wrong reverses the entire return, so it is worth fixing the association until it is automatic: *outputs* go *out* to customers, and the tax on them is output tax.',
            'Where output tax exceeds input tax, the difference is payable to HMRC. Where input tax exceeds output tax, it is repayable to the business — a position that is entirely normal for some businesses and not a sign of error, as the last lesson in this outcome explains.',
          ],
          formula: 'VAT due to HMRC = Output tax − Input tax · Input tax greater than output tax means a repayment is due',
        },
        {
          h: 'Net to VAT, and gross to VAT',
          p: [
            'Working forward from a **net** figure is straightforward: multiply by the rate. A net figure of £2,480 at the standard rate carries £496 of VAT, and the gross is £2,976.',
            'Working backwards from a **gross** figure is where the errors creep in, because the rate cannot simply be applied to it — the gross already contains the VAT. Applying 20% to a VAT-inclusive figure overstates the tax by a fifth, and produces an answer that looks entirely reasonable.',
            'The arithmetic is worth understanding rather than memorising. At the standard rate of 20%, the gross is 120% of the net. The VAT is therefore 20/120 of the gross — which cancels down to **one sixth**. At the reduced rate of 5%, the gross is 105% of the net, so the VAT is 5/105 of the gross, or **one twenty-first**.',
            'Both fractions are exact, not approximations, and both are quicker than the alternative of dividing back to the net first. Whichever route you take, sense-check the answer by adding the VAT back to the net: if it does not reproduce the gross you started with, you have applied the wrong operation.',
            'Watch the language in a question. *Plus VAT* and *excluding VAT* mean the figure is net. *Including VAT*, *inclusive of VAT*, *gross*, and a stated total a customer paid all mean it already contains the tax.',
          ],
          formula: 'Net → VAT: Net × ' + T.rates.standard.value + '% · Gross → VAT at ' + T.rates.standard.value + '%: Gross ÷ 6 · Gross → VAT at ' + T.rates.reduced.value + '%: Gross ÷ 21 · Gross → Net: Gross ÷ ' + (1 + T.rates.standard.value / 100).toFixed(2),
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
            'There are only four movements between net, gross and VAT, and every calculation in this outcome is one of them. It is worth being able to do all four without hesitating.',
            'Sense-check every gross-to-net answer by adding the VAT back to the net. If the total does not reproduce the gross you started with, the wrong route was taken — almost always applying the rate directly to a VAT-inclusive figure.',
          ],
        },
        {
          h: 'Rounding',
          p: [
            'Rounding in VAT is one of those areas where a plausible general rule turns out to be several specific ones, and the assessment tests the specifics.',
            '**Calculating the VAT on an invoice.** HMRC permits VAT to be worked out **per line item** or **per unit**, rounding to the nearest penny. Line-by-line calculation is not an error — it is one of the prescribed methods, and it is what accounting software actually does.',
            '**The invoice-trader concession.** Separately, an invoice trader may round the total VAT on an invoice **down** to a whole penny. This is a concession in the taxpayer\'s favour, and it is genuinely narrow: it is not available to retailers, who have their own rules under the retail schemes.',
            '**On the VAT return itself**, the two groups of boxes are treated differently, and reversing them is a common and expensive slip. The **VAT boxes (1 to 5)** are completed in **pounds and pence**. The **value boxes (6 to 9)** — the net values of sales and purchases, excluding VAT — are **whole pounds, rounded down**.',
            'One habit is worth adopting whatever the context: do not round intermediate workings. Carry the full figure through and round once, at the end. Rounding at each step compounds small differences across a period, and on a large return the accumulated drift can be enough to fail a reconciliation.',
          ],
          callout: { kind: 'key', text: 'VAT boxes carry pence; value boxes are whole pounds rounded down. Reversing the two is a common and expensive slip.' },
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
          p: [
            'Retail takings are the classic case where the figure you are handed already contains the tax. The method below is the one to use whenever a question says *including VAT*.',
          ],
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
          exp: '£14,600 × 20% = £2,920. The net figure is the VAT-exclusive value, so the rate applies to it directly — no fraction is needed. The VAT fraction of 1/6 is for the opposite journey, when you are handed a gross figure and have to strip the VAT back out of it. Reading which figure you have been given is half the work in these questions.',
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
            'An invoice trader may round the total VAT on an invoice down to a whole penny',
            'Every business may round the total VAT on an invoice down, including retailers',
            'VAT must always be rounded up to the nearest penny in HMRC’s favour',
            'Calculating VAT line by line is not permitted and must be avoided',
          ],
          ans: 0,
          exp: 'The rounding-down concession belongs to invoice traders; retailers have separate rules. Calculating VAT line by line is expressly permitted — it is one of HMRC’s prescribed methods, not an error.',
        },
        {
          type: 'truefalse',
          q: 'Decide whether each statement about calculating VAT is true or false.',
          statements: [
            { text: 'Output tax is the VAT charged on sales.', answer: true },
            { text: 'If input tax exceeds output tax, a repayment is due from HMRC.', answer: true },
            { text: 'Accounting software can determine the correct rate for an unfamiliar supply.', answer: false },
            { text: 'The value boxes (6 to 9) on the VAT return are rounded down to whole pounds.', answer: true },
          ],
          exp: 'Output tax is on sales and input tax on purchases; where input exceeds output a repayment arises. Software applies the rate it has been given rather than judging which is correct. On the return, the VAT boxes carry pounds and pence while the value boxes are whole pounds rounded down.',
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
            'So far every purchase has been assumed recoverable. It is not. This lesson covers the three situations where input tax is restricted or blocked — and this is where VAT stops being cost-neutral and starts costing the business real money.',
            'Start with the pair that is confused most often. Zero-rated and exempt supplies look identical from the customer\'s side: no VAT is charged either way. The difference is entirely on the supplier\'s side, and it concerns the **input tax** on the costs of making that supply.',
            'A **zero-rated** supply is a **taxable** supply on which the rate happens to be 0%. Because it is taxable, the input tax relating to it remains fully recoverable, and its value counts towards taxable turnover for registration purposes.',
            'An **exempt** supply is within the scope of VAT but exempted from the charge. Input tax relating to it is **not** recoverable, and its value does not count towards the registration threshold. Note that exempt is not the same as **outside the scope** — a fourth category altogether, covering things that are not taxable supplies at all — and the syllabus treats the two as distinct.',
            'The practical difference is stark. A business making only zero-rated supplies charges nothing and reclaims everything: it is in a permanent repayment position, receiving money from HMRC every quarter. A business making only exempt supplies charges nothing and reclaims nothing: the VAT on its costs is simply absorbed, exactly as a private consumer absorbs it. One is a net beneficiary of the system; the other is, in effect, its final consumer.',
          ],
          split: {
            left: { title: 'Zero-rated (taxable at 0%)', items: ['Most food', 'Books and newspapers', 'Children’s clothing', 'Input tax fully recoverable', 'Counts toward the registration threshold'] },
            right: { title: 'Exempt', items: ['Insurance', 'Public postal services (Royal Mail universal service)', 'Most finance and credit', 'Input tax NOT recoverable', 'Does not count toward the registration threshold'] },
          },
          examtrap: 'That exempt supplies do not count toward the taxable turnover threshold is a favourite. A business making only exempt supplies cannot register at all, however large it is.',
        },
        {
          h: 'Partial exemption',
          p: [
            'Most businesses that make exempt supplies also make taxable ones. They are **partially exempt**, and their input tax has to be divided three ways.',
            'Input tax **wholly attributable to taxable supplies** is recoverable in full. Input tax **wholly attributable to exempt supplies** is not recoverable. Input tax on **residual overheads** — rent, heating, professional fees, everything that supports both activities — is apportioned between the two, normally by reference to the value of supplies made.',
            'That is administratively heavy for a business whose exempt activity is incidental, so there is relief. If the exempt input tax passes the **de minimis** test, all of it may be recovered as though the business were fully taxable.',
            'The test has two limbs and **both** must be satisfied. The exempt input tax must average no more than £' + T.partialExemption.deMinimisPerMonth.value + ' a month, and it must be no more than ' + T.partialExemption.inputTaxProportion.value + '% of total input tax. A quarter is three months, so the monthly figure is the quarterly exempt input tax divided by three.',
            'The order in which you test them does not matter, but the conjunction does: passing one limb while failing the other does not qualify. HMRC also operates two simplified tests and an annual review of the position, both of which are beyond this unit — within it, treat the two-limb test as the test.',
          ],
          formula: 'De minimis: exempt input tax ≤ £' + T.partialExemption.deMinimisPerMonth.value + ' per month on average AND ≤ ' + T.partialExemption.inputTaxProportion.value + '% of total input tax',
          callout: { kind: 'warning', text: 'BOTH limbs must be satisfied. Passing the £' + T.partialExemption.deMinimisPerMonth.value + ' test while exempt input tax is more than half the total does not qualify.' },
        },
        {
          h: 'Blocked input tax',
          table: {
            headers: ['Blocked', 'Why, and the exception'],
            rows: [
              ['Client entertaining', 'Not recoverable. Where employees act as hosts to clients, the whole cost is blocked — including the employees’ share.'],
              ['Employee entertaining', 'Recoverable. Where staff bring guests to a staff event, apportion and recover only the employees’ share.'],
              ['Cars', 'Not recoverable on purchase, unless used exclusively for business with no private use at all — a very hard test to meet.'],
              ['Vans and commercial vehicles', 'Recoverable. The block applies to cars, not to commercial vehicles.'],
              ['Assets with private use', 'Recoverable only to the extent of business use, so an apportionment is needed.'],
            ],
          },
          p: [
            'The third restriction is different in kind. Here the supply is taxable and the business is fully taxable, but the law simply refuses recovery on particular categories of expenditure — generally because the spending has a private or non-business flavour that would be hard to police case by case.',
            '**Entertaining** turns on who is being entertained and why. Entertaining employees is recoverable. Entertaining clients is blocked. Where staff bring guests to a staff event, apportion and recover only the employees\' share. But where employees are acting as **hosts to clients**, HMRC treats the whole cost as incurred for the purpose of entertaining the client, and blocks all of it — including the employees\' portion. Read the purpose, not just the guest list.',
            '**Cars** are blocked on purchase unless used exclusively for business with no private use whatsoever. That test is far stricter than it sounds: merely being *available* for private use defeats it, so the exception is confined in practice to pool cars and to vehicles bought for hire, for driving instruction or as taxis. Note that the block applies to cars specifically — **vans and commercial vehicles are recoverable** in the ordinary way.',
            '**Assets with private use** are recoverable only to the extent of business use, so an apportionment is required rather than an all-or-nothing decision.',
            'The reason this lesson exists is the point made at the very start of the unit. Everywhere else, VAT passes through the business untouched. Here it stops, and becomes a genuine cost that will never be recovered.',
          ],
        },
        {
          h: 'Applying the de minimis test',
          p: [
            'The de minimis test is arithmetic followed by a decision, and the decision is where the marks are. Compute both limbs before concluding anything — the numbers are usually chosen to sit close to one of the two limits.',
          ],
          worked: {
            title: 'Can the exempt input tax be recovered?',
            problem: 'Calder Services is partially exempt. For the quarter, total input tax is £9,000, of which £1,700 relates to exempt supplies. Does it pass the de minimis test?',
            steps: [
              { do: 'Test the monthly average.', why: 'The quarter is three months, so £1,700 ÷ 3 = £566.67 per month. That is below the £' + T.partialExemption.deMinimisPerMonth.value + ' limit. First limb passed.' },
              { do: 'Test the proportion of total input tax.', why: T.partialExemption.inputTaxProportion.value + '% of £9,000 is £4,500. The exempt input tax of £1,700 is well below that. Second limb passed.' },
              { do: 'Apply both together.', why: 'Both limbs are satisfied, so the business is de minimis for the period.' },
              { do: 'State the consequence.', why: 'All input tax is recoverable — the full £9,000, including the £1,700 that relates to exempt supplies.' },
            ],
            answer: 'De minimis: the whole £9,000 of input tax is recoverable',
            tryIt: {
              q: 'The following quarter, total input tax is £4,000, of which £2,100 relates to exempt supplies. How much input tax is recoverable, in pounds?',
              answer: 1900,
              unit: '£',
              hint: 'Work out the monthly average first. If either limb fails, the exempt element cannot be recovered.',
              exp: '£2,100 ÷ 3 = £700 per month, which exceeds the £' + T.partialExemption.deMinimisPerMonth.value + ' limit, so the first limb fails. Once either limb fails the business is not de minimis, and both limbs must be met. The exempt input tax is therefore blocked: £4,000 − £2,100 = £1,900 recoverable. (HMRC also operates two simplified tests and an annual review, which are beyond this unit.)',
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
          q: 'A business holds a staff Christmas party at which employees may each bring a partner. What VAT can it recover?',
          opts: [
            'The proportion relating to its own employees',
            'All of the VAT, because it is a staff event',
            'None of the VAT, because non-employees attended',
            'Half of the VAT, by standard convention',
          ],
          ans: 0,
          exp: 'Employee entertaining is recoverable, so a staff event is apportioned and the employees’ share recovered. Contrast this with employees hosting clients, where the purpose is entertaining the client and the whole cost — including the employees’ share — is blocked.',
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

    /* ── 2.3 — adjustments ──────────────────────────────────────────────── */
    {
      id: 'L3-TPFB-2E',
      title: 'Adjustments: discounts, fuel and bad debts',
      icon: '🔧',
      criteria: ['TPFB-2.3.4', 'TPFB-2.3.8', 'TPFB-2.3.9', 'TPFB-2.3.14'],
      cards: [
        {
          h: 'Three things that move the figures after the invoice',
          p: [
            'The last three lessons dealt with supplies as they were made. Real periods are untidier than that: customers take discounts, cars are fuelled privately, and some invoices are never paid at all.',
            'This lesson covers the three routine adjustments that change the VAT position after the original supply has been recorded. What makes them worth grouping together is that they pull in different directions, and the commonest error with all three is putting them on the wrong side of the return.',
            'A **prompt payment discount** taken by the customer reduces output tax, because less consideration was ultimately received. A **fuel scale charge** increases output tax, because it is a charge for private consumption of business fuel. **Bad debt relief** increases input tax, recovering output tax that was declared on a sale which produced no money.',
            'Note the asymmetry in that last one: relief for a bad debt is claimed as extra *input* tax, not as a reduction of output tax. The effect on the amount payable is identical, but the return asks for the two figures separately, and the boxes will not reconcile if it is put in the wrong place.',
          ],
          split: {
            left: { title: 'Reduces what you owe', items: ['PPD taken by the customer — less output tax', 'Bad debt relief — more input tax'] },
            right: { title: 'Increases what you owe', items: ['Fuel scale charge — more output tax'] },
          },
        },
        {
          h: 'Prompt payment discounts',
          p: [
            'A prompt payment discount is a reduction offered for early settlement — commonly something like 2.5% for payment within ten days. It creates a problem for VAT because, at the moment the invoice is raised, nobody knows what the customer will actually pay.',
            'The rule is that **VAT is due on the consideration actually received**. If the discount is taken, the consideration is lower and so is the VAT.',
            'The mechanics follow from that. The supplier invoices the **full** amount, with VAT on the full amount, and states the discount terms on the invoice. If the customer then takes the discount, the VAT must be adjusted downwards — normally by issuing a credit note for the difference, or by the invoice carrying wording that allows the customer to adjust their own claim without one. HMRC\'s model wording sets out the discount terms including the deadline, states that the customer may only recover the VAT actually paid, and adds that no credit note will be issued.',
            'What is **not** permitted is assuming at the outset that the discount will be taken and charging the lower VAT up front. That was the pre-2015 treatment and it no longer applies.',
            'There is a mirror obligation on the customer, which is easy to overlook. A customer who takes the discount may only reclaim the VAT actually paid, and must restrict their input tax claim accordingly — whether or not a credit note ever arrives.',
          ],
          callout: { kind: 'key', text: 'VAT follows the money. Discount taken, VAT reduced; discount not taken, the original VAT stands.' },
        },
        {
          h: 'A discount taken',
          p: [
            'Discount questions are asking two things at once: what VAT is finally due, and what adjustment that implies to what was originally declared. Answer both.',
          ],
          worked: {
            title: 'Adjusting output tax for a PPD',
            problem: 'Sandford Supplies invoices a customer £4,000 net, offering a 2.5% discount for payment within 10 days. The customer pays within the 10 days. What VAT is finally due, and what is the adjustment?',
            steps: [
              { do: 'Calculate the VAT as originally invoiced.', why: 'The invoice goes out on the full amount: £4,000 × 20% = £800 of output tax.' },
              { do: 'Calculate the amount actually paid, net of the discount.', why: '£4,000 × 2.5% = £100 discount, so the net consideration becomes £4,000 − £100 = £3,900.' },
              { do: 'Calculate the VAT on what was actually paid.', why: '£3,900 × 20% = £780. This is the VAT genuinely due, because VAT follows the consideration.' },
              { do: 'Work out the adjustment.', why: '£800 originally accounted for, £780 due — so output tax is reduced by £20, normally via a credit note.' },
            ],
            answer: 'VAT due £780; output tax reduced by £20',
            tryIt: {
              q: 'An invoice is raised for £6,000 net with a 3% prompt payment discount, and the customer takes it. What is the VAT finally due, in pounds?',
              answer: 1164,
              unit: '£',
              hint: 'Reduce the net by the discount first, then apply the rate to what was actually paid.',
              exp: '£6,000 × 3% = £180 discount, leaving £5,820. £5,820 × 20% = £1,164. The invoice would originally have carried £1,200, so output tax falls by £36.',
            },
          },
        },
        {
          h: 'Fuel scale charges',
          p: [
            'Where a business reclaims input tax on road fuel that is also used privately, it has to deal with the private element somehow. There are four permitted approaches, and the exam favours the third.',
            'It can **reclaim nothing** on road fuel at all — simple, but it must then apply that treatment to every vehicle, including commercial ones. It can **reclaim only the business proportion**, which requires detailed mileage records. It can reclaim only on fuel for business mileage where employees are reimbursed. Or it can **reclaim all the input tax and apply a fuel scale charge**, which trades a fixed charge for the record-keeping burden.',
            'The scale charge is a fixed amount set by reference to the vehicle\'s CO2 emissions and the length of the VAT period, taken from a published table. It is treated as **additional output tax**, which is what makes it increase the VAT payable rather than reduce the amount recoverable.',
            'Two details are routinely got wrong. The figure from the table is **VAT-inclusive**, so the VAT element is one sixth of it — the same divide-by-six as any other gross amount, not the whole figure. And the charge applies **per car**, for each car where fuel is available for private use; a business using the scale charge cannot pick and choose between qualifying vehicles.',
            'The charge applies to cars. Vans and commercial vehicles are outside it.',
          ],
          example: {
            title: 'Applying a quarterly scale charge',
            rows: [
              ['Step', 'Working', 'Result'],
              ['Scale charge from the table (VAT-inclusive)', 'given', '£462'],
              ['VAT element', '£462 ÷ 6', '£77.00'],
              ['Treatment', 'added to output tax', 'increases VAT payable by £77'],
            ],
          },
          examtrap: 'The scale charge is a gross figure and it is OUTPUT tax. Treating it as net, or deducting it from input tax, are the two standard errors.',
        },
        {
          h: 'Bad debt relief',
          p: [
            'When a customer does not pay, the supplier has a problem the VAT system has to answer. Output tax was declared on the sale and paid over to HMRC at the time — but no money ever arrived. Without relief, the business would have funded tax on income it never received.',
            '**Bad debt relief** recovers that VAT. The conditions are cumulative and all of them must be met.',
            'The VAT must already have been **accounted for and paid** to HMRC — which is the whole basis of the claim. The debt must be at least **six months overdue**, measured from the later of the payment due date and the date of supply. It must have been **written off** in the business\'s refunds for bad debts account. The supply must not have been made at above the customary selling price. And the debt must not have been paid, sold or factored on.',
            'A claim must be made within **four years and six months** of the later of the payment due date and the date of supply, and the supporting records kept for four years from the date of claim.',
            'The relief is claimed by **adding the VAT to input tax**, not by reducing output tax — the original sale stands, and the return shows both the tax charged and the tax recovered.',
            'There is a matching obligation on the other side that is easy to forget. A **customer** who has reclaimed input tax on a purchase and has not paid within six months of the relevant date must **repay** that input tax to HMRC. The relief is symmetrical: it is not a windfall for the debtor.',
          ],
          formula: 'Debt at least ' + T.badDebtRelief.debtAgeMonths.value + ' months overdue · written off in the accounts · claimed within ' + T.badDebtRelief.claimWindow.value + ' · relief added to INPUT tax',
        },
        {
          h: 'Claiming relief on an unpaid invoice',
          p: [
            'Bad debt questions are conditions first, arithmetic second. Test each condition explicitly before computing anything — if one fails, there is no relief to calculate.',
          ],
          worked: {
            title: 'How much relief, and where does it go?',
            problem: 'A sale was invoiced at £3,200 net plus VAT, payable within 30 days. Seven months after the due date the customer has not paid and the debt has been written off in the accounts. What relief can be claimed?',
            steps: [
              { do: 'Check the age of the debt.', why: 'Seven months have passed since the due date, which is more than the ' + T.badDebtRelief.debtAgeMonths.value + '-month minimum. Condition met.' },
              { do: 'Check the write-off.', why: 'The debt has been written off in the refunds for bad debts account. Condition met.' },
              { do: 'Calculate the VAT originally accounted for.', why: '£3,200 × 20% = £640 of output tax was declared when the sale was made.' },
              { do: 'Claim it as input tax.', why: 'The £640 is added to input tax on the return, recovering the VAT paid over on a sale that produced no money.' },
            ],
            answer: '£640, added to input tax',
            tryIt: {
              q: 'An invoice for £1,450 net plus standard-rate VAT is eight months overdue and has been written off. How much bad debt relief can be claimed, in pounds?',
              answer: 290,
              unit: '£',
              hint: 'The relief is the VAT that was originally charged on the supply.',
              exp: '£1,450 × 20% = £290. Both conditions are met — eight months exceeds ' + T.badDebtRelief.debtAgeMonths.value + ', and the debt is written off — so £290 is added to input tax.',
            },
          },
        },
      ],
      check: [
        {
          q: 'An invoice for £2,000 net offers a 4% prompt payment discount, which the customer takes. What VAT is due?',
          opts: ['£384', '£400', '£416', '£320'],
          ans: 0,
          exp: '£2,000 × 4% = £80 discount, leaving £1,920 actually paid. £1,920 × 20% = £384. VAT follows the consideration actually received, so the £400 originally invoiced is reduced by £16.',
        },
        {
          type: 'numeric',
          q: 'A quarterly fuel scale charge of £588 applies. What amount is added to output tax, in pounds?',
          answer: 98,
          unit: '£',
          exp: 'The scale charge is VAT-inclusive, so the VAT is one sixth: £588 ÷ 6 = £98. It is added to output tax, increasing the VAT payable.',
        },
        {
          q: 'Which is NOT a condition for claiming VAT bad debt relief?',
          opts: [
            'The customer must have been formally declared insolvent',
            'The debt must be at least six months overdue',
            'The debt must have been written off in the accounts',
            'The claim must be made within four years and six months',
          ],
          ans: 0,
          exp: 'Insolvency is not required — the debt simply has to be old enough and written off. The other three are the actual conditions, and all must be met.',
        },
        {
          type: 'truefalse',
          q: 'Decide whether each statement about adjustments is true or false.',
          statements: [
            { text: 'A fuel scale charge increases the VAT payable.', answer: true },
            { text: 'Bad debt relief is claimed by reducing output tax.', answer: false },
            { text: 'A supplier may charge VAT on the discounted amount before knowing whether the discount will be taken.', answer: false },
            { text: 'A fuel scale charge figure is VAT-inclusive.', answer: true },
          ],
          exp: 'The scale charge is additional output tax and is a gross figure. Bad debt relief is added to INPUT tax rather than netted off output tax. And VAT must be charged on the full amount until the discount is actually taken.',
        },
      ],
    },

    /* ── 2.3 — international ────────────────────────────────────────────── */
    {
      id: 'L3-TPFB-2F',
      title: 'Imports, exports and postponed VAT accounting',
      icon: '🌍',
      criteria: ['TPFB-2.3.10', 'TPFB-2.3.15'],
      cards: [
        {
          h: 'Goods leaving the UK',
          p: [
            'Everything so far has assumed both parties are in the UK. Trade across a border changes both the rate charged and the mechanics of paying the tax.',
            'Exports of goods from the UK are **zero-rated**. No VAT is charged to the overseas customer, and because zero-rating is a taxable rate rather than an exemption, the input tax on the costs of making that supply remains fully recoverable. An exporter is therefore typically in a repayment position — charging nothing while recovering everything.',
            'The zero-rating is conditional, and the condition is evidence. The business must hold proof that the goods physically left the UK, and must obtain it within the time limit: **three months** for most exports, or six where the goods are processed or incorporated into something else before they leave.',
            'Miss that window and the consequence is severe. The supply must be standard-rated, with the VAT declared in Box 1 of the return for the period in which the time limit expired. Zero-rating can be reinstated if the evidence turns up later, but in the meantime the business owes tax it never charged.',
            'That is the commercial risk, and it is entirely one-sided. The customer has long since paid a price that contained no VAT, and there is usually no realistic prospect of going back to an overseas buyer months later to ask for 20% more. The VAT comes out of the exporter\'s margin. This is why export documentation is treated as a compliance matter rather than an administrative one.',
          ],
          callout: { kind: 'warning', text: 'The commercial risk here is one-sided. If the export evidence is missing, the VAT is still due — and the customer has long since paid a price that did not include it.' },
        },
        {
          h: 'Goods entering the UK, and the cash-flow problem',
          p: [
            'Import VAT is due on goods brought into the UK, charged at the rate those goods would attract if bought domestically. Standard-rated goods bear import VAT at 20%.',
            'The question is not whether the tax is due but **when it is paid**, and that turns out to matter a great deal. Traditionally import VAT was paid at the border, at the point the goods were cleared, and then reclaimed as input tax on the next return. In principle that is fine: a fully taxable importer recovers every penny.',
            'In practice it was painful. A business importing £200,000 of goods a quarter had to find £40,000 in cash at the border and then wait — potentially up to four months, depending on where in the VAT quarter the import fell — to recover money it was always going to get back in full. For an importer of any size that is a permanent, significant working-capital cost imposed by nothing more than the timing of a tax that nets to zero.',
            '**Postponed VAT accounting** removes that gap. Instead of paying at the border, the importer accounts for the import VAT on the VAT return itself.',
            'It is optional, not a replacement. A business may still pay at the border and reclaim in the ordinary way, supported by the monthly **C79 certificate** that HMRC issues as evidence of import VAT paid. Both routes are current, and a question may use either.',
          ],
        },
        {
          h: 'How postponed VAT accounting works on the return',
          p: [
            'Under postponed VAT accounting the same amount is entered on the return **twice**: once as output tax, and once as input tax.',
            'It is declared as output tax because the import VAT is a liability the business has incurred — this is the entry that replaces the payment at the border. It is then reclaimed as input tax under the ordinary rules, exactly as if it had been charged by a UK supplier. For a fully taxable business the two entries cancel, and the cash-flow cost of importing disappears.',
            'The value of the goods themselves also enters the total purchases figure, so the return still shows the scale of the business\'s importing activity even though the net tax effect is nil.',
            'That word **nil** deserves care, because it holds only where the input tax is fully recoverable. A **partially exempt** business, or one importing something on which input tax is blocked, still faces a real cost: the output tax entry stands in full while the input tax entry is restricted, and the difference is payable. Postponed VAT accounting changes when import VAT is paid, not whether it is due.',
            'Without postponed accounting the treatment is different in shape as well as timing: the import VAT appears as **input tax only**, evidenced by the C79 certificate, having already been paid in cash at the frontier.',
          ],
          formula: 'PVA: import VAT added to output tax AND to input tax · net effect nil where input tax is fully recoverable · the value of the goods also enters total purchases',
          examtrap: 'PVA is not a relief and does not make import VAT disappear. It is a timing mechanism. The commonest error is entering it once rather than twice.',
        },
        {
          h: 'Accounting for an import under PVA',
          p: [
            'The mechanics are easier to see on a single transaction than to describe in the abstract. Note especially what happens to the two entries at the end.',
          ],
          worked: {
            title: 'What goes where on the return?',
            problem: 'Weald Trading imports goods with a customs value of £20,000. The goods would be standard-rated if bought in the UK, and the business uses postponed VAT accounting. It is fully taxable. What is the effect on the return?',
            steps: [
              { do: 'Calculate the import VAT.', why: 'The goods are standard-rated, so £20,000 × 20% = £4,000 of import VAT.' },
              { do: 'Declare it as output tax.', why: 'Under PVA the import VAT is accounted for on the return rather than paid at the border, so £4,000 is added to output tax.' },
              { do: 'Reclaim it as input tax.', why: 'The business is fully taxable, so the same £4,000 is recoverable and is added to input tax.' },
              { do: 'Net the two.', why: 'Output tax up £4,000, input tax up £4,000 — no net VAT cost and no cash paid at the border. The £20,000 value of the goods is also included in total purchases.' },
            ],
            answer: '£4,000 added to output tax and £4,000 to input tax — net effect nil',
            tryIt: {
              q: 'The following quarter Weald imports standard-rated goods with a customs value of £13,500 under PVA. What amount is declared as output tax, in pounds?',
              answer: 2700,
              unit: '£',
              hint: 'Apply the domestic rate to the customs value. The same figure appears on both sides.',
              exp: '£13,500 × 20% = £2,700 declared as output tax, and the same £2,700 reclaimed as input tax since the business is fully taxable. Net effect nil.',
            },
          },
        },
      ],
      check: [
        {
          q: 'A UK business exports goods to a customer overseas. How is the supply treated?',
          opts: [
            'Zero-rated, with input tax on related costs still recoverable',
            'Exempt, so input tax on related costs is not recoverable',
            'Standard-rated, with the customer reclaiming the VAT locally',
            'Outside the scope of VAT entirely, with no reporting requirement',
          ],
          ans: 0,
          exp: 'Exports are zero-rated. Because zero-rating is a taxable rate rather than an exemption, related input tax remains fully recoverable — which is the practical difference from exempt treatment.',
        },
        {
          q: 'Under postponed VAT accounting, how is import VAT dealt with on the return?',
          opts: [
            'Declared as output tax and reclaimed as input tax on the same return',
            'Reclaimed as input tax only, having been paid at the border',
            'Declared as output tax only, with recovery on a later return',
            'Omitted from the return, as it is settled directly with customs',
          ],
          ans: 0,
          exp: 'The same amount goes on both sides of the return. That is what removes the cash-flow cost of paying at the border and reclaiming months later. Entering it once is the standard error.',
        },
        {
          type: 'numeric',
          q: 'A fully taxable business imports standard-rated goods with a customs value of £46,000 under PVA. What is the NET effect on the VAT payable for the period, in pounds?',
          answer: 0,
          unit: '£',
          exp: '£9,200 is declared as output tax and the same £9,200 reclaimed as input tax, so the net effect is nil. PVA is a timing mechanism, not a relief — and the answer would not be nil if the business were partially exempt.',
        },
      ],
    },

    /* ── 2.3 — the whole period ─────────────────────────────────────────── */
    {
      id: 'L3-TPFB-2G',
      title: 'Working out the VAT payable for a period',
      icon: '🧾',
      criteria: ['TPFB-2.3.13'],
      cards: [
        {
          h: 'Everything, in one figure',
          p: [
            'Every lesson in this outcome has produced one component of a single figure. This is where they come together.',
            'Given a period\'s records, work out the VAT payable to HMRC or repayable by them. It is the task the whole outcome has been building toward, and it is the one most likely to appear as a substantial question carrying several marks.',
            'It is not conceptually difficult. Output tax less input tax; the arithmetic is subtraction. What makes it go wrong is that there are many small components, each of which has to be identified, valued, and placed on the correct side. A single item on the wrong side moves the answer by twice its value, and there is nothing in the result to indicate that anything is amiss.',
            'The defence is method. Work down a fixed checklist rather than through the question in the order it happens to present things — assessment questions are deliberately written so that the adjustments are scattered through a narrative rather than grouped helpfully at the end.',
          ],
          flow: ['Total output tax', 'Total input tax', 'Apply every adjustment', 'Output − Input = payable or repayable'],
        },
        {
          h: 'A checklist that stops things being missed',
          table: {
            headers: ['Component', 'Side', 'Direction'],
            rows: [
              ['VAT on sales invoices', 'Output', 'Add'],
              ['Credit notes issued to customers', 'Output', 'Subtract'],
              ['Fuel scale charge', 'Output', 'Add'],
              ['Import VAT under PVA *(declared)*', 'Output', 'Add'],
              ['VAT on purchase invoices', 'Input', 'Add'],
              ['Credit notes received from suppliers', 'Input', 'Subtract'],
              ['Blocked input tax (entertaining, cars)', 'Input', 'Subtract'],
              ['Bad debt relief', 'Input', 'Add'],
              ['Import VAT under PVA *(reclaimed)*', 'Input', 'Add'],
            ],
          },
          p: [
            'Work down this list rather than through the question in the order it presents things. Questions are written so that adjustments appear scattered through a narrative, and reading sequentially is how items get missed.',
            'Two items account for most lost marks. **Credit notes** reduce whichever side issued them — a credit note to a customer reduces output tax, one from a supplier reduces input tax — and it is easy to net them against the wrong figure. **Blocked input tax** has to be taken *out* of a purchases figure that already includes it, which means subtracting rather than simply not adding, and is easy to overlook entirely when the entertaining or car expense is buried in a total.',
            'Do not forget the components taught earlier in the outcome that are easy to leave out of a period calculation: cash and petty cash takings carry output tax, deposits and advance payments create tax points in the period they are received, and a prompt payment discount taken reduces output tax.',
          ],
          examtrap: 'The two most-missed items are credit notes, which reduce whichever side issued them, and blocked input tax, which has to be taken OUT of a purchases figure that already includes it.',
        },
        {
          h: 'A full period calculation',
          p: [
            'This example carries every component the outcome has covered. Follow the checklist rather than the order of the narrative, and build the two totals separately before subtracting.',
          ],
          worked: {
            title: 'VAT payable for the quarter',
            problem: 'For the quarter, Fenwick Trading records: sales invoices £84,000 net with £16,800 VAT; credit notes issued £2,000 net with £400 VAT; purchase invoices £41,000 net with £8,200 VAT; credit notes received £600 net with £120 VAT. A fuel scale charge of £420 applies. Bad debt relief of £480 is claimable. Included in the purchase VAT is £150 on entertaining clients. What is the VAT payable?',
            steps: [
              { do: 'Start the output tax with sales.', why: '£16,800 of VAT was charged on sales invoices.' },
              { do: 'Deduct credit notes issued.', why: 'These reduce what customers owe and therefore reduce output tax: £16,800 − £400 = £16,400.' },
              { do: 'Add the fuel scale charge VAT.', why: 'The £420 charge is VAT-inclusive, so the VAT is £420 ÷ 6 = £70. It is additional output tax: £16,400 + £70 = £16,470.' },
              { do: 'Start the input tax with purchases.', why: '£8,200 of VAT was charged by suppliers.' },
              { do: 'Deduct credit notes received.', why: 'These reduce what is owed to suppliers and so reduce input tax: £8,200 − £120 = £8,080.' },
              { do: 'Remove the blocked input tax.', why: 'Client entertaining is not recoverable, and the £150 is already inside the purchases figure: £8,080 − £150 = £7,930.' },
              { do: 'Add bad debt relief.', why: 'Relief is claimed as input tax, not as a reduction of output tax: £7,930 + £480 = £8,410.' },
              { do: 'Subtract input from output.', why: '£16,470 − £8,410 = £8,060 payable to HMRC.' },
            ],
            answer: '£8,060 payable',
            tryIt: {
              q: 'For the next quarter, output tax totals £22,400. Input tax on purchases is £11,900, of which £260 relates to client entertaining. Bad debt relief of £540 is claimable. What is the VAT payable, in pounds?',
              answer: 10220,
              unit: '£',
              hint: 'Adjust the input tax first — take out what is blocked, add the relief — then subtract from output tax.',
              exp: 'Input tax = £11,900 − £260 (blocked) + £540 (relief) = £12,180. VAT payable = £22,400 − £12,180 = £10,220.',
            },
          },
        },
        {
          h: 'Payable or repayable?',
          p: [
            'Having reached a number, say which direction it goes. If output tax exceeds input tax, the difference is **payable** to HMRC. If input tax exceeds output tax, it is **repayable** to the business.',
            'A repayment position is entirely normal and is not a sign that something has gone wrong. A business making mainly **zero-rated** supplies charges almost no output tax while recovering input tax in full, and will be in repayment nearly every period — a bookshop, a children\'s clothing retailer, most food producers. A business that has just made a large capital purchase may be in repayment for a single quarter and payable thereafter. An **exporter** is in the same position for the same reason.',
            'Always state the direction explicitly. A correct figure labelled the wrong way round is not a correct answer, and in a computer-marked assessment there is no partial credit for arithmetic that was right until the last step.',
            'Sense-check before you finish. Does the direction make sense for this business? A general retailer selling standard-rated goods to the public should be paying HMRC; if your working produces a repayment, something has probably been put on the wrong side. An exporter that comes out payable deserves the same second look. The check takes seconds and catches the error that the arithmetic cannot.',
          ],
          callout: { kind: 'key', text: 'Sense-check before you finish: does the sign make sense for this business? A retailer in permanent repayment, or an exporter permanently paying, both suggest something has been put on the wrong side.' },
        },
      ],
      check: [
        {
          type: 'numeric',
          q: 'Output tax is £19,600. Input tax on purchases is £8,450, including £310 on client entertaining. Bad debt relief of £275 is claimable. What is the VAT payable, in pounds?',
          answer: 11185,
          unit: '£',
          exp: 'Input tax = £8,450 − £310 + £275 = £8,415. Payable = £19,600 − £8,415 = £11,185. The entertaining VAT must come out because it is already inside the purchases figure.',
        },
        {
          q: 'A business issues credit notes to customers during the period. What is the effect?',
          opts: [
            'Output tax is reduced',
            'Input tax is reduced',
            'Output tax is increased',
            'There is no effect until the customer pays',
          ],
          ans: 0,
          exp: 'A credit note issued to a customer reduces what that customer owes, and with it the output tax originally charged. Credit notes RECEIVED from suppliers work the other way and reduce input tax.',
        },
        {
          type: 'numeric',
          q: 'Output tax for a quarter is £6,300. Input tax is £9,150, all recoverable. What amount is repayable by HMRC, in pounds?',
          answer: 2850,
          unit: '£',
          exp: '£9,150 − £6,300 = £2,850 repayable. Input tax exceeding output tax gives a repayment, which is the normal position for a business making mainly zero-rated supplies.',
        },
        {
          type: 'truefalse',
          q: 'Decide whether each statement about the period calculation is true or false.',
          statements: [
            { text: 'A fuel scale charge is added to output tax.', answer: true },
            { text: 'Blocked input tax must be removed from the purchases VAT figure.', answer: true },
            { text: 'A repayment position always indicates an error has been made.', answer: false },
            { text: 'Credit notes received from suppliers reduce output tax.', answer: false },
          ],
          exp: 'The scale charge is additional output tax and blocked input tax has to be taken out of a purchases figure that already includes it. A repayment is perfectly normal for zero-rated traders. Credit notes received reduce INPUT tax, not output tax.',
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
