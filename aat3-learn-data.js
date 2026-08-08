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

  var ORIENTATION = [

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
            '**Outcomes 1 to 4 are written; only Outcome 5 is not.** That is 90% of the assessment. Take them in order, because each depends on the one before. Outcome 1 establishes what VAT is, who must register, what must be filed and by when, and what happens when any of that goes wrong. Outcome 2 does the arithmetic those rules govern. Outcome 3 checks the result — verifying a return, reconciling it to the records, and correcting it when it is wrong. Outcome 4 then changes subject to payroll, which turns out to have the same shape: register, record, report, pay, be penalised.',
            'What is missing matters, and it would be dishonest not to say so. Outcome 5 — reporting information within the organisation — is 10% of the marks and is not written yet. Treat what follows as thorough preparation for nine tenths of the unit rather than as complete preparation for the assessment.',
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
  ];

  /* ── Outcome 2: Calculate VAT (30%) ──────────────────────────────────── */
  var LESSONS_LO2 = [

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


  /* ── Outcome 1: Understand legislation requirements relating to VAT (25%) ─
     Knowledge-led rather than calculation-led. The temptation with an outcome
     like this is a list of facts to memorise; what follows tries instead to
     give each rule a reason, because a rule with a reason survives the exam
     and a rule without one does not. */
  var LESSONS_LO1 = [

    /* ── 1.1 ────────────────────────────────────────────────────────────── */
    {
      id: 'L3-TPFB-1A',
      title: 'The law, the tax authority and the five categories',
      icon: '⚖️',
      criteria: ['TPFB-1.1.1', 'TPFB-1.1.2', 'TPFB-1.1.3'],
      cards: [
        {
          h: 'Who makes the rules and who enforces them',
          p: [
            'VAT is created by statute — principally the Value Added Tax Act 1994 and the regulations made under it — and amended every year by the Finance Act. The body that administers and enforces it is **HM Revenue and Customs**, and for the purposes of this unit HMRC is *the* relevant tax authority for VAT in the United Kingdom. There is no other. When the material says "notify HMRC" or "HMRC may assess", it is describing a statutory power, not a matter of custom or good practice.',
            'That distinction is worth holding on to, because it explains the tone of everything that follows. HMRC is not a supplier the business negotiates with. It sets the deadlines, it decides what records must exist, it may inspect them, and where a business does not file, HMRC may simply decide the figure itself and pursue it as a debt. A commercial creditor has none of those powers.',
            'It also explains why the unit is written the way it is. Most of Outcome 1 is not arithmetic. It is knowing what the law requires, by when, and what happens when it does not happen — the framework inside which the calculations of Outcome 2 are performed.',
            'One boundary the specification draws explicitly: **the rules relating to Northern Ireland are not assessed in this unit**. Northern Ireland has a distinct position for goods, and you may meet it in practice, but it is outside what the assessment can ask.',
          ],
          callout: { kind: 'key', text: 'HMRC is the tax authority for VAT in the UK. Its powers are statutory, which is why deadlines are fixed and penalties are automatic rather than negotiated.' },
        },
        {
          h: 'Taxable persons and taxable supplies',
          p: [
            'Two terms do a great deal of work in the legislation, and they are narrower than ordinary English suggests.',
            'A **taxable person** is a person — an individual, a partnership, a company, a charity — who is registered for VAT or who is *required* to be. That second limb matters more than it looks. A business that has passed the registration threshold and simply not registered is still a taxable person; it is a taxable person that is breaking the law. Its liability to account for VAT began when it should have registered, not when it eventually did. This is why the late registration penalty in lesson 1F is calculated on the VAT that *should* have been paid.',
            'A **taxable supply** is a supply of goods or services made in the UK in the course of business that is not exempt. Note what that definition includes: standard-rated, reduced-rated and **zero-rated** supplies are all taxable. Zero-rated is a taxable supply on which the rate happens to be nil. It is not the same as exempt, and Level 3 will punish the confusion repeatedly.',
            'Putting the two together gives the charge: VAT is due on taxable supplies made in the UK by a taxable person in the course or furtherance of business. Strip out any one element — a private sale between individuals, a supply made abroad, an exempt supply — and there is no VAT to charge.',
          ],
          callout: { kind: 'warning', text: 'A business required to register is a taxable person even before it registers. Its VAT liability starts from the date registration was due, not the date it got round to it.' },
        },
        {
          h: 'The five categories of supply',
          p: [
            'Every supply a business makes falls into exactly one of five categories, and almost every decision in this unit begins by placing a supply in the right one. Learn them as a set rather than individually, because it is the *contrasts* between them that get tested.',
            'The first three — standard, reduced and zero — are the taxable rates. They differ only in the percentage applied, and in all three cases the supplier charges VAT (even if at 0%) and recovers input tax on related purchases in the normal way.',
            'The fourth, **exempt**, is different in kind rather than degree. No VAT is charged, and — this is the sting — input tax on costs incurred in making those supplies cannot be recovered. The business absorbs it. Insurance, most finance, postal services, health and welfare, education and betting are the familiar examples.',
            'The fifth, **outside the scope**, means the transaction is not a supply within the UK VAT system at all. Wages paid to employees, dividends, most statutory charges such as vehicle excise duty, and supplies made outside the UK sit here. There is nothing to record on the return in Boxes 1 or 4, and nothing to recover.',
            'The distinction that costs the most marks is **zero-rated versus exempt**. Both mean the customer is charged no VAT, so from the outside they look identical. From the inside they are opposites: a zero-rated trader recovers all its input tax and is usually in a repayment position, while an exempt trader recovers none of it and quietly bears the cost.',
          ],
          table: {
            headers: ['Category', 'Rate charged', 'Input tax recoverable?', 'Typical examples'],
            rows: [
              ['Standard-rated', '20%', 'Yes', 'Most goods and services'],
              ['Reduced-rated', '5%', 'Yes', 'Domestic fuel and power, children’s car seats'],
              ['Zero-rated', '0%', '**Yes**', 'Most food, books, children’s clothing, public transport'],
              ['Exempt', 'None', '**No**', 'Insurance, finance, postal services, education, health'],
              ['Outside the scope', 'None', 'No', 'Wages, dividends, supplies made outside the UK'],
            ],
          },
        },
        {
          h: 'Why the zero-rated / exempt distinction matters so much',
          p: [
            'It is worth seeing the difference in money rather than in words, because the two categories behave identically from the customer’s side and oppositely from the business’s side.',
            'Consider two businesses, each with £100,000 of sales and £40,000 of standard-rated costs. The first sells children’s clothing — zero-rated. The second is an insurance broker — exempt. Neither charges its customers a penny of VAT.',
            'The clothing retailer charges £0 of output tax and reclaims £8,000 of input tax on its costs. It receives £8,000 from HMRC. Its costs are genuinely £40,000.',
            'The broker charges £0 of output tax and reclaims nothing. It receives nothing from HMRC, and its costs are £48,000. The £8,000 has become an ordinary business expense that reduces its profit, exactly as it would for a private individual.',
            'Same customer experience, £16,000 apart. That is why the specification asks you to know the categories rather than the rates, and why "no VAT is charged" is never a sufficient answer to a question about a supply.',
          ],
          examtrap: 'Asked whether a supply is "taxable", zero-rated counts as YES. It is a taxable supply at a rate of 0%. Only exempt and outside-the-scope supplies are not taxable supplies.',
        },
        {
          h: 'Where the tax finally lands',
          p: [
            'The chain in the opening chapter showed VAT passing through each registered business untouched and settling on the final consumer. The categories are what decide where "final" is.',
            'For most supplies the chain ends with a private individual, who has no VAT registration and so no way to reclaim. That is the intended result: VAT is a tax on consumer spending, and the consumer bears it.',
            'But the chain can also end early. A business making exempt supplies cannot reclaim, so the chain stops with it — it bears the tax exactly as a consumer does, even though it is a business. A partially exempt business bears part of it. A business below the registration threshold that has chosen not to register is in the same position: it pays VAT on its purchases and cannot recover it.',
            'So the question "who bears the VAT?" is answered not by who paid it at the till, but by who was unable to pass it on. Keeping that question in mind makes several later rules — partial exemption, the benefit of voluntary registration, the logic of the flat rate scheme — considerably easier to reason about than to memorise.',
          ],
          callout: { kind: 'tip', text: 'The tax stops at the first person in the chain who cannot reclaim. Usually that is the consumer; sometimes it is an exempt or unregistered business.' },
        },
      ],
      check: [
        {
          type: 'mcq',
          q: 'A business makes only exempt supplies. What is the VAT position on its purchases?',
          opts: [
            'It cannot recover the input tax, which becomes a cost of the business',
            'It recovers the input tax in full, as a zero-rated trader would do',
            'It recovers half of the input tax under the standard apportionment rules',
            'It recovers the input tax but must add a corresponding charge to output tax',
          ],
          ans: 0,
          exp: 'Exempt supplies carry no right to recover the input tax attributable to them. The VAT sticks to the business and reduces its profit, exactly as it would for a private consumer. This is the single practical difference between exempt and zero-rated, and it is why the two must never be treated as interchangeable.',
        },
        {
          type: 'truefalse',
          q: 'Decide whether each statement about the categories of supply is true or false.',
          statements: [
            { text: 'A zero-rated supply is a taxable supply.', answer: true },
            { text: 'Wages paid to employees are outside the scope of VAT.', answer: true },
            { text: 'An exempt supply allows the supplier to recover related input tax.', answer: false },
            { text: 'A business that is required to register but has not done so is still a taxable person.', answer: true },
          ],
          exp: 'Zero-rated supplies are taxable at 0%, which is what preserves the right to recover input tax. Wages are outside the scope entirely. Exempt supplies carry no recovery — that is the defining feature. And a taxable person is one who is registered OR required to be, which is why liability runs from the date registration fell due.',
        },
        {
          type: 'mcq',
          q: 'Which body is the relevant tax authority for VAT in the United Kingdom?',
          opts: [
            'HM Revenue and Customs',
            'The Financial Conduct Authority, through its tax division',
            'Companies House, as part of its statutory filing role',
            'The Association of Accounting Technicians',
          ],
          ans: 0,
          exp: 'HMRC administers and enforces VAT under the Value Added Tax Act 1994 and its regulations. Its powers — to require registration, to demand records, to inspect, to assess and to penalise — are statutory, which is why VAT deadlines are fixed rather than negotiable.',
        },
        {
          type: 'gapfill',
          q: 'Complete the contrast between exempt and zero-rated supplies.',
          template: 'A supply of insurance is {0}, so the supplier recovers {1} of the input tax on its related costs. A supply of children’s clothing is {2}, so the supplier recovers {3} of it.',
          gaps: [
            { options: ['exempt', 'zero-rated', 'outside the scope'], answer: 0 },
            { options: ['none', 'all', 'half'], answer: 0 },
            { options: ['zero-rated', 'exempt', 'reduced-rated'], answer: 0 },
            { options: ['all', 'none', 'half'], answer: 0 },
          ],
          exp: 'Insurance is exempt and children’s clothing is zero-rated. Neither charges the customer VAT, but the exempt supplier absorbs its input tax while the zero-rated supplier recovers every penny — and is usually in a repayment position as a result.',
        },
      ],
    },

    /* ── 1.1 continued ──────────────────────────────────────────────────── */
    {
      id: 'L3-TPFB-1B',
      title: 'Records, inspections and visits',
      icon: '🗄️',
      criteria: ['TPFB-1.1.4', 'TPFB-1.1.5'],
      cards: [
        {
          h: 'Why record keeping is a legal duty, not good practice',
          p: [
            'Every business keeps records because it needs to know how it is doing. A VAT-registered business keeps records because **the law requires it to**, in a prescribed form, for a prescribed period, and subject to inspection. Those are different obligations, and the second is the one this unit tests.',
            'The justification is the one running through the whole unit. The business is holding public money and calculating its own liability. HMRC does not see the underlying transactions; it sees nine boxes on a return that the business itself completed. The records are the only thing standing between a self-assessed tax and an honour system, which is why the duty to keep them is enforced separately from the duty to pay.',
            'That separation is the detail students most often miss. The penalty for failing to keep records is not a penalty for underpaying tax. A business can pay every penny it owes, on time, and still be penalised because it cannot produce the evidence. The two obligations stand independently.',
          ],
          callout: { kind: 'key', text: 'The duty to keep records is independent of the duty to pay. Paying the right amount does not excuse being unable to prove it.' },
        },
        {
          h: 'What must be kept, and for how long',
          p: [
            'The requirement is broad: essentially everything that evidences the figures on the return. HMRC’s list runs to business correspondence and delivery notes, which gives a sense of how widely it is drawn — the test is not "is this an accounting record?" but "does this evidence a supply?".',
            'At the centre sits the **VAT account** — the summary linking the business’s books to the boxes on the return. It is the document that shows how a set of daybooks became a return, and it is the first thing an officer asks for.',
            'The retention period is **' + T.records.retentionYears.value + ' years**. Note that this is longer than the four-year window for correcting errors and longer than the four-year assessment limit, which sometimes strikes students as odd. It is not: HMRC may assess up to twenty years back where tax has been lost deliberately, and the six-year rule gives a working margin for the ordinary case without being open-ended.',
            'Records may be kept electronically, and for most businesses now they must be. Under Making Tax Digital the records forming part of the electronic account have to be kept **digitally in functional compatible software, with digital links between them** — meaning the data must flow from record to return without being retyped. Copying a figure by hand between two systems breaks the digital link even if the figure is correct.',
          ],
          table: {
            headers: ['Requirement', 'The rule'],
            rows: [
              ['How long', T.records.retentionYears.value + ' years'],
              ['What', 'The VAT account, invoices issued and received, credit and debit notes, daybooks, cash books, till rolls, import and export documents, orders and correspondence'],
              ['How', 'Paper or electronic; digitally in compatible software where MTD applies, with digital links'],
              ['Penalty for failure', '£' + T.records.penalty.value + ' — separate from any tax or payment penalty'],
            ],
          },
        },
        {
          h: 'HMRC’s rights of inspection and visit',
          p: [
            'HMRC may inspect a registered business’s records, enter its business premises at a reasonable time, and require documents to be produced. These are powers of the tax authority, exercisable as part of routine compliance work — a visit is not an accusation, and most businesses will receive one at some point without anything being wrong.',
            'Visits are usually **arranged in advance**, with notice of what the officer wants to see and roughly how long it will take. HMRC may make an unannounced visit, but that is the exception rather than the pattern, and it is generally reserved for cases where advance notice would defeat the purpose.',
            'What an officer typically does is trace figures in both directions: from the return back through the VAT account to the daybooks and the invoices, and forward from a sample of invoices to check they were recorded, categorised and rated correctly. Anything that cannot be traced is the problem — which is the practical reason the retention rule matters. A business that has discarded its purchase invoices cannot demonstrate its input tax claim, and input tax that cannot be evidenced is input tax that can be disallowed.',
            'The reasonable response to all of this is not anxiety but organisation. A business whose records are complete, retained and reconcilable has nothing to fear from an inspection; a business whose records are none of those things has a problem that existed long before the officer arrived.',
          ],
          callout: { kind: 'tip', text: 'Rights of inspection exist because the business holds public money. A visit is routine compliance, not an allegation — but it is only survivable if the records are complete.' },
        },
      ],
      check: [
        {
          type: 'mcq',
          q: 'For how long must a VAT-registered business normally retain its VAT records?',
          opts: [
            '6 years',
            '3 years, matching the ordinary limitation period for contract claims',
            '4 years, matching the time limit for correcting errors on a return',
            '10 years, matching the retention period required for statutory accounts',
          ],
          ans: 0,
          exp: 'The retention period is six years. It is deliberately longer than the four-year error correction window and the four-year normal assessment limit, so that records still exist when HMRC exercises those powers near the end of their period.',
        },
        {
          type: 'truefalse',
          q: 'Decide whether each statement about records and inspections is true or false.',
          statements: [
            { text: 'HMRC may enter business premises at a reasonable time to inspect records.', answer: true },
            { text: 'A business that has paid the correct VAT cannot be penalised for poor records.', answer: false },
            { text: 'Under Making Tax Digital, records must be kept digitally with digital links between them.', answer: true },
            { text: 'All HMRC visits must be arranged in advance.', answer: false },
          ],
          exp: 'Inspection and entry are statutory powers. The record-keeping duty is separate from the payment duty, so a correct payment is no defence to a records failure. MTD requires digital records and digital links — retyping a figure breaks the link. And while visits are usually arranged in advance, HMRC may visit unannounced.',
        },
        {
          type: 'mcq',
          q: 'Which document links a business’s books to the figures reported in the boxes of its VAT return?',
          opts: [
            'The VAT account',
            'The sales daybook, which records every invoice issued in date order',
            'The trial balance extracted at the end of the accounting period',
            'The bank reconciliation statement for the final month of the quarter',
          ],
          ans: 0,
          exp: 'The VAT account is the required summary showing how the underlying records became the return. It is the first record an inspecting officer will ask for, because it is the bridge between the bookkeeping and the declaration.',
        },
      ],
    },

    /* ── 1.2 ────────────────────────────────────────────────────────────── */
    {
      id: 'L3-TPFB-1C',
      title: 'Registration and deregistration',
      icon: '📝',
      criteria: ['TPFB-1.2.1', 'TPFB-1.2.2', 'TPFB-1.2.3'],
      cards: [
        {
          h: 'The threshold, and what counts towards it',
          p: [
            'A business must register for VAT once its **taxable turnover** passes the registration threshold of **£' + T.registration.threshold.value.toLocaleString('en-GB') + '**. Two words in that sentence do all the work.',
            '**Taxable** means what lesson 1A meant by it: standard-rated, reduced-rated and zero-rated supplies all count. Exempt supplies and supplies outside the scope do not. A business with £120,000 of sales, £100,000 of which is exempt insurance commission, has taxable turnover of £20,000 and no obligation to register. Conversely, a zero-rated food producer with £95,000 of sales must register, even though it will never charge a customer a penny of VAT.',
            '**Turnover** means the value of supplies, not profit and not cash received. It is measured net of VAT, and it includes sales the business has invoiced but not yet been paid for.',
            'The threshold is not tested against a financial year. It is tested on a **rolling 12-month basis**, which means it must be reconsidered at the end of every single month, looking back over the previous twelve. A business with steady sales of £8,000 a month will cross £' + T.registration.threshold.value.toLocaleString('en-GB') + ' partway through its second year without anything unusual happening in any individual month.',
          ],
          examtrap: 'Zero-rated sales count towards the registration threshold. A business can be obliged to register even though it will charge no VAT to any customer — and it will then recover input tax, which is usually to its advantage.',
        },
        {
          h: 'Two tests, two different answers',
          p: [
            'There are two separate tests for compulsory registration, and they differ in what triggers them, when HMRC must be told, and — the part most often got wrong — **the date registration takes effect**. Getting the trigger right and the effective date wrong loses the mark just as completely as getting neither.',
            'The **historic test** looks backwards. At the end of each month, add up taxable turnover for the previous twelve months. If it exceeds the threshold, the business must notify HMRC within **' + T.registration.historicTest.notifyWithinDays.value + ' days of the end of that month**, and registration takes effect from **the first day of the second month** after the threshold was exceeded. The gap is deliberate: it gives the business a short run-in to change its invoicing and systems before it has to start charging.',
            'The **future test** looks forwards, and it is much sharper than students expect. It bites when the business expects taxable turnover to exceed the threshold **in the next 30 days alone** — not over the next year. This is the test that catches a business winning a single unusually large contract. Notification is due by the end of that 30-day period, and registration takes effect from **the date the expectation arose**, which is the start of the period, not the end of it.',
            'Read those two effective dates side by side. Under the historic test registration starts *after* a delay; under the future test it starts *immediately, and retrospectively by the time you notify*. A business that realises on 1 May that it will bill £100,000 in the next fortnight is registered from 1 May, and every invoice it issues from that date carries VAT.',
          ],
          table: {
            headers: ['', 'Historic test', 'Future test'],
            rows: [
              ['Trigger', 'Taxable turnover in the past 12 months exceeded the threshold', 'Expected to exceed the threshold in the next 30 days **alone**'],
              ['Tested', 'At the end of every month, rolling', 'The moment the expectation arises'],
              ['Notify by', 'Within ' + T.registration.historicTest.notifyWithinDays.value + ' days of the end of that month', 'The end of that 30-day period'],
              ['Registered from', 'The 1st of the **second** month after', '**The date the expectation arose**'],
            ],
          },
        },
        {
          h: 'Applying the historic test',
          p: [
            'The arithmetic is straightforward; the dates are where the marks are. Work the trigger month out first, then apply the two rules to it separately rather than trying to hold both in your head at once.',
          ],
          worked: {
            title: 'When must Brayford Joinery register, and from when?',
            problem: 'Brayford Joinery has taxable turnover of £7,000 in most months. Adding up the twelve months to 31 August, the total is £' + (T.registration.threshold.value + 2400).toLocaleString('en-GB') + '. This is the first month the rolling total has exceeded the threshold. By when must Brayford notify HMRC, and from what date will it be registered?',
            steps: [
              { do: 'Identify the trigger month.', why: 'The rolling 12-month total first exceeded £' + T.registration.threshold.value.toLocaleString('en-GB') + ' at the end of August, so August is the month in which the threshold was exceeded.' },
              { do: 'Apply the notification rule.', why: 'Notification is due within ' + T.registration.historicTest.notifyWithinDays.value + ' days of the END OF that month. Thirty days from 31 August is 30 September.' },
              { do: 'Apply the effective date rule — separately.', why: 'Registration takes effect from the first day of the SECOND month after the threshold was exceeded. The first month after August is September; the second is October. So registration runs from 1 October.' },
              { do: 'Note what the two dates mean in practice.', why: 'Brayford must tell HMRC by 30 September, and must charge VAT on supplies made from 1 October onwards. It does not charge VAT in September, even though it already knows it has crossed the threshold.' },
            ],
            answer: 'Notify by 30 September; registered from 1 October',
            tryIt: {
              q: 'A business first exceeds the rolling 12-month threshold at the end of March. In which month does its registration take effect? Answer with the month number (1 = January).',
              answer: 5,
              unit: '',
              hint: 'Count forward: the first month after March, then the second.',
              exp: 'The threshold was exceeded at the end of March. The first month after is April, the second is May, so registration takes effect from 1 May — month 5. Notification would have been due within 30 days of 31 March, that is by 30 April.',
            },
          },
        },
        {
          h: 'Registering voluntarily',
          p: [
            'A business below the threshold may register anyway, and for some businesses this is plainly the right decision rather than a marginal one.',
            'The clearest case is a business making **zero-rated supplies**. It charges its customers 0%, so registration costs its customers nothing at all, while allowing it to recover input tax on everything it buys. It will be in a repayment position almost every period. A small bakery selling zero-rated food has no reason not to register.',
            'A second case is a business whose customers are themselves VAT-registered. Those customers reclaim whatever VAT they are charged, so the extra 20% costs them nothing in substance — meaning registration is close to free in commercial terms, while letting the supplier recover its own input tax. A business trading mainly with the public is in the opposite position: to a private customer, VAT is a genuine 20% price increase.',
            'Third, a business planning significant expenditure before it begins trading — fitting out premises, buying equipment — may register to recover that input tax rather than absorb it.',
            'Against all this sit real costs: returns to file on a fixed calendar, records to keep in prescribed form, penalties to be exposed to, and the credibility of every figure resting on evidence. Voluntary registration is a decision with a downside, not a free option, and the exam expects you to be able to argue both sides.',
          ],
          split: {
            left: { title: 'Points towards registering voluntarily', items: ['The business makes zero-rated supplies and will be in repayment', 'Its customers are VAT-registered and reclaim what they are charged', 'It has large input tax to recover, especially pre-trading', 'It wants to appear larger or more established'] },
            right: { title: 'Points against', items: ['Customers who are private individuals face a real price rise', 'Returns must be filed on a fixed calendar, on time', 'Records must be kept in prescribed form for ' + T.records.retentionYears.value + ' years', 'The business becomes exposed to the penalty regimes'] },
          },
        },
        {
          h: 'Coming out again: deregistration',
          p: [
            'Deregistration mirrors registration, and like registration it comes in a compulsory form and a voluntary one.',
            '**Compulsory deregistration** applies when the business ceases to be eligible to be registered — it stops trading, it is sold, or its supplies become wholly exempt. HMRC must be told within **' + T.registration.deregistration.compulsoryNotifyWithinDays.value + ' days** of the business ceasing to be eligible, and a penalty may follow if it is not.',
            '**Voluntary deregistration** is available where taxable turnover for the **next 12 months** is expected to fall below the deregistration threshold of **£' + T.registration.deregistrationThreshold.value.toLocaleString('en-GB') + '**. Note that this is a forward-looking test, on expected turnover, not a backward-looking one on what has already happened. HMRC may refuse the application.',
            'The deregistration threshold is set £' + (T.registration.threshold.value - T.registration.deregistrationThreshold.value).toLocaleString('en-GB') + ' below the registration threshold, and the gap is there for a reason. Without it, a business hovering around the line would be obliged to register and permitted to deregister in the same breath, and would spend its life going in and out of the system. The gap creates a buffer zone in which a registered business simply stays registered.',
          ],
          examtrap: 'The registration threshold looks BACK 12 months (historic test); the voluntary deregistration threshold looks FORWARD 12 months. Reversing the direction is a common and expensive slip.',
        },
      ],
      check: [
        {
          type: 'mcq',
          q: 'A business first exceeds the rolling 12-month registration threshold at the end of July. From what date is it registered for VAT?',
          opts: [
            '1 September',
            '1 August, being the first day of the month following the breach',
            '31 August, being thirty days after the end of the trigger month',
            '1 July, being the first day of the month in which the breach occurred',
          ],
          ans: 0,
          exp: 'Under the historic test registration takes effect from the first day of the SECOND month after the threshold was exceeded. July is the trigger month, August is the first month after, so registration runs from 1 September. Notification, separately, is due within 30 days of 31 July — by 30 August.',
        },
        {
          type: 'mcq',
          q: 'On 3 June a business signs a contract that will produce £110,000 of taxable turnover within the next three weeks. Which test applies and from when is it registered?',
          opts: [
            'The future test, registered from 3 June',
            'The future test, registered from 3 July once the thirty-day period has ended',
            'The historic test, registered from 1 August under the usual two-month rule',
            'Neither test, because a single contract is disregarded for threshold purposes',
          ],
          ans: 0,
          exp: 'The future test bites when the threshold is expected to be exceeded in the next 30 days alone, which this contract does. Registration takes effect from the date the expectation arose — 3 June — so VAT must be charged on supplies from that date. Notification is due by the end of the 30-day period.',
        },
        {
          type: 'numeric',
          q: 'A business has annual sales of £140,000, of which £58,000 is exempt insurance commission and the remainder is standard-rated. What is its taxable turnover for registration purposes, in pounds?',
          answer: 82000,
          unit: '£',
          exp: '£140,000 − £58,000 = £82,000. Only taxable supplies count towards the threshold, and exempt supplies are not taxable supplies. At £82,000 the business is below the £' + T.registration.threshold.value.toLocaleString('en-GB') + ' threshold and is not required to register, even though its total sales comfortably exceed it.',
        },
        {
          type: 'truefalse',
          q: 'Decide whether each statement about registration and deregistration is true or false.',
          statements: [
            { text: 'Zero-rated sales count towards the registration threshold.', answer: true },
            { text: 'Voluntary deregistration depends on expected turnover for the next 12 months.', answer: true },
            { text: 'A business making only exempt supplies must register once its sales exceed the threshold.', answer: false },
            { text: 'The deregistration threshold is set below the registration threshold.', answer: true },
          ],
          exp: 'Zero-rated supplies are taxable, so they count. Voluntary deregistration is a forward-looking test on the next 12 months. Exempt supplies are not taxable supplies, so they never trigger registration however large. And the deregistration threshold sits below the registration threshold to stop businesses oscillating in and out of the system.',
        },
      ],
    },

    /* ── 1.3 ────────────────────────────────────────────────────────────── */
    {
      id: 'L3-TPFB-1D',
      title: 'Filing, paying and Making Tax Digital',
      icon: '📅',
      criteria: ['TPFB-1.3.1', 'TPFB-1.3.2', 'TPFB-1.3.3', 'TPFB-1.3.4'],
      cards: [
        {
          h: 'The standard calendar',
          p: [
            'Under the normal scheme a business files a return every **three months** and both files and pays by the same deadline: **one calendar month and seven days** after the end of the VAT period. A quarter ending 31 March is due on 7 May; one ending 30 June is due on 7 August.',
            'Two features of that deadline are worth noticing. First, it covers **both obligations**. Submitting the return on time but paying late is a failure, and the two failures are penalised under entirely separate regimes — the points system for the return, a percentage charge for the money. A business can be penalised twice over for the same period.',
            'Second, "one calendar month" means exactly that, not thirty days. From 31 January the calendar month ends 28 February, and the deadline is 7 March. From 30 April it ends 31 May, and the deadline is 7 June. Counting thirty-seven days from the period end will give the wrong answer roughly half the time.',
            'Where input tax exceeds output tax the return produces a **repayment** rather than a payment, and HMRC pays the business. That is the ordinary position for zero-rated traders and exporters and is not an indication that anything has gone wrong.',
          ],
          formula: 'Filing and payment deadline = period end + 1 calendar month + 7 days',
        },
        {
          h: 'When monthly returns are worth having',
          p: [
            'A business may apply to file **monthly** rather than quarterly, and for one particular kind of business it is a straightforwardly good idea.',
            'A **repayment trader** — one whose input tax routinely exceeds its output tax — is lending money to HMRC between the moment it incurs the input tax and the moment the return is filed and processed. On a quarterly cycle that wait can approach four months for expenditure incurred early in a quarter. Filing monthly cuts it to a few weeks.',
            'The businesses in this position are the ones lesson 1A identified: zero-rated suppliers, who charge no output tax while recovering input tax in full, and exporters, whose supplies are likewise zero-rated. A food producer or a children’s clothing wholesaler will be in repayment nearly every period, and the cash-flow benefit of monthly filing is real and recurring.',
            'The cost is administrative: twelve filings a year instead of four, twelve opportunities to be late, and twelve sets of figures to prepare. For a business that pays VAT over rather than reclaims it, monthly filing simply accelerates its own payments and has nothing to recommend it. The question to ask is always which direction the money flows.',
          ],
          callout: { kind: 'tip', text: 'Monthly returns suit repayment traders — zero-rated suppliers and exporters. For a business that pays VAT over, monthly filing just means paying sooner, more often.' },
        },
        {
          h: 'The deadline is when the money arrives',
          p: [
            'The statutory deadline is fixed, but the last safe day to *start* a payment is not, because what the law requires is that **cleared funds reach HMRC** by the deadline. A payment initiated on the due date by a slow method is a late payment, and the penalty regime does not care that the instruction was given in time.',
            'Some methods are effectively instant. **Faster Payments** usually arrive the same or the next day, including weekends and bank holidays; **CHAPS** arrives the same working day if sent within the bank’s cut-off; a debit or corporate credit card payment online is treated as made on the day.',
            'Others take **three working days**: Bacs, standing orders, and payment in person at a bank or building society. Working days exclude weekends and bank holidays, so a three-working-day method started on the Thursday before a bank holiday Monday will not arrive until the following Wednesday.',
            '**Direct debit** works differently again, and in the business’s favour. It must be set up at least three working days before the return is submitted; HMRC then collects automatically **three working days after the deadline**. That is a genuine extension of the payment date, not merely a convenience — the money leaves the account later than it would under any other method. If the return is filed late, collection moves to three days after filing.',
          ],
          table: {
            headers: ['Method', 'Time to reach HMRC'],
            rows: [
              ['Faster Payments', 'Same or next day, including weekends'],
              ['CHAPS', 'Same working day, within bank cut-off times'],
              ['Debit or corporate credit card online', 'Treated as paid on the day'],
              ['Bacs, standing order, at a bank', '**3 working days**'],
              ['Direct debit', 'Collected automatically **3 working days after** the deadline'],
            ],
          },
          examtrap: 'The obligation is that the money REACHES HMRC by the deadline, not that it was sent by then. Choosing a three-working-day method on the due date makes the payment late.',
        },
        {
          h: 'Making Tax Digital',
          p: [
            'Returns must be submitted under **Making Tax Digital**, which imposes two requirements that are easy to state and easy to underestimate.',
            'The first is that the return must be filed from **functional compatible software** — software able to connect to HMRC’s systems directly and authorised to do so. Typing figures into a web form is no longer an available route for a VAT-registered business. The authorisation step matters: software must be linked to the business’s HMRC account before it can file, and doing that for the first time on the day of the deadline is a well-known way to miss it.',
            'The second is that the underlying **records must be kept digitally, with digital links between them**. A digital link is any transfer of data between systems that happens without manual intervention — an export and import, a linked cell, an API call. Retyping a figure from one system into another is not a digital link, even if the figure is typed correctly.',
            'The practical consequence deserves stating plainly, because it changes what carefulness means. Under the old regime a figure was seen by a person at least once, when the return was typed up, and an obvious absurdity might be caught there. Under MTD a figure entered wrongly at source flows through to submission untouched. Nobody is looking at it. That is precisely why Outcome 3 — reviewing and verifying the return — exists as a separate learning outcome.',
          ],
          callout: { kind: 'warning', text: 'A digital link means no retyping. Copying a figure by hand between two systems breaks the link even when the figure is right.' },
        },
      ],
      check: [
        {
          type: 'mcq',
          q: 'A VAT quarter ends on 30 September. By what date must the return be filed and the VAT paid?',
          opts: [
            '7 November',
            '31 October, being one calendar month after the period end',
            '7 October, being seven days after the period end',
            '30 November, being two calendar months after the period end',
          ],
          ans: 0,
          exp: 'The deadline is one calendar month and seven days after the period end. One calendar month from 30 September is 31 October; seven days further is 7 November. The same date applies to both the return and the payment, and the two failures carry separate penalties.',
        },
        {
          type: 'mcq',
          q: 'Which business is most likely to benefit from filing monthly VAT returns?',
          opts: [
            'A wholesaler of children’s clothing, whose sales are zero-rated',
            'A newsagent selling mainly standard-rated goods to the public for cash',
            'An insurance broker whose supplies are exempt from VAT',
            'A restaurant with standard-rated sales and mainly standard-rated costs',
          ],
          ans: 0,
          exp: 'Zero-rated sales mean almost no output tax while input tax is recovered in full, so the business is in repayment nearly every period. Filing monthly gets those repayments in twelve times a year instead of four. A business that pays VAT over gains nothing, and an exempt business is not filing returns for those supplies at all.',
        },
        {
          type: 'truefalse',
          q: 'Decide whether each statement about filing and payment is true or false.',
          statements: [
            { text: 'A direct debit is collected three working days after the payment deadline.', answer: true },
            { text: 'A Bacs payment started on the deadline day will arrive in time.', answer: false },
            { text: 'Under MTD, retyping a figure between two systems counts as a digital link.', answer: false },
            { text: 'Filing on time but paying late attracts no penalty.', answer: false },
          ],
          exp: 'Direct debit collection genuinely falls after the deadline. Bacs takes three working days, so starting on the deadline is too late — what matters is when the money arrives. A digital link excludes manual retyping. And filing and payment are separate obligations with separate penalty regimes.',
        },
        {
          type: 'gapfill',
          q: 'Complete the two Making Tax Digital requirements.',
          template: 'Under Making Tax Digital a business must file from {0} software, and must keep its records {1} with {2} between them.',
          gaps: [
            { options: ['functional compatible', 'commercially available', 'HMRC-owned'], answer: 0 },
            { options: ['digitally', 'on paper', 'in duplicate'], answer: 0 },
            { options: ['digital links', 'manual reconciliations', 'audit certificates'], answer: 0 },
          ],
          exp: 'MTD requires functional compatible software, authorised to connect to HMRC, plus digital record keeping with digital links. The effect is that a figure entered wrongly at source reaches the return with nobody having looked at it.',
        },
      ],
    },

    /* ── 1.4 ────────────────────────────────────────────────────────────── */
    {
      id: 'L3-TPFB-1E',
      title: 'The special schemes',
      icon: '🗂️',
      criteria: ['TPFB-1.4.1', 'TPFB-1.4.2', 'TPFB-1.4.3'],
      cards: [
        {
          h: 'Three schemes, three different problems',
          p: [
            'The normal scheme asks a business to account for VAT on invoices as they are issued, four times a year, with full records of every transaction on both sides. For a small business that is a real administrative and cash-flow burden, and three optional schemes exist to relieve it. Each solves a *different* problem, and the exam expects you to match the scheme to the difficulty rather than recite all three.',
            '**Cash accounting** solves a cash-flow problem: paying VAT on invoices customers have not yet settled. **Annual accounting** solves an administrative and budgeting problem: four returns a year and a liability that is hard to predict. **The flat rate scheme** solves a record-keeping problem: the effort of tracking input tax on every purchase.',
            'They are not mutually exclusive in every combination — annual accounting can be operated alongside either of the others — but each has its own thresholds, its own mechanics and its own exit rules. What follows takes them one at a time, then compares them.',
            'One thing they have in common is worth stating first: none of them changes what the customer is charged. A business on any of these schemes still charges VAT at the normal rate on its invoices. The schemes change what the business does with the figures afterwards.',
          ],
          callout: { kind: 'key', text: 'Cash accounting fixes cash flow. Annual accounting fixes administration and budgeting. The flat rate scheme fixes record keeping. Match the scheme to the problem in the question.' },
        },
        {
          h: 'Cash accounting',
          p: [
            'Under cash accounting, output tax is accounted for when **payment is received** and input tax reclaimed when **suppliers are paid** — not when invoices are issued or received. Everything else is unchanged: still quarterly returns, still one month and seven days.',
            'The benefit is automatic and continuous. A business that gives its customers 60 days to pay is, under the normal scheme, handing VAT to HMRC on invoices it has not yet been paid for. Under cash accounting that never happens. And if a customer never pays at all, no VAT was ever accounted for — which means **bad debt relief becomes irrelevant** while the business is in the scheme, because there is nothing to relieve.',
            'The price is symmetry: input tax cannot be reclaimed until the supplier has actually been paid. A business that takes long credit from its own suppliers loses as much as it gains, and a business that pays quickly while being paid slowly gains most.',
            'The thresholds are **£' + T.schemes.cashAccounting.joinThreshold.value.toLocaleString('en-GB') + '** to join, on estimated taxable turnover for the next 12 months, and **£' + T.schemes.cashAccounting.leaveThreshold.value.toLocaleString('en-GB') + '** at which the business must leave. Some supplies are excluded from the scheme altogether and must be dealt with normally: goods on lease or hire purchase, imports, supplies under the domestic reverse charge, invoices payable more than six months ahead, and invoices issued in advance of the supply.',
          ],
          split: {
            left: { title: 'Cash accounting helps', items: ['A business that gives long credit to customers', 'A business exposed to bad debts — no VAT is ever paid on an unpaid invoice', 'A business paid slowly but paying its own suppliers quickly'] },
            right: { title: 'Cash accounting does not help', items: ['A retailer paid at the point of sale — nothing changes', 'A business that itself takes long credit from suppliers', 'A repayment trader, which now waits to pay before reclaiming'] },
          },
        },
        {
          h: 'Annual accounting',
          p: [
            'Annual accounting replaces four returns with **one**, filed after the end of a twelve-month VAT year, and spreads the liability across the year in payments on account based on the **previous year’s** liability.',
            'The business chooses between **nine monthly instalments of 10%**, due at the end of months 4 to 12, or **three quarterly instalments of 25%**, due at the end of months 4, 7 and 10. Either way the instalments total less than the expected liability, leaving a balancing figure at the year end.',
            'The deadline for the annual return is the detail most often missed, because it is **not** the usual one month and seven days. The return and the **balancing payment** are both due **two months after the end of the VAT year**. A business that applies the quarterly deadline to an annual scheme return will file a month early — harmless — or apply the wrong rule elsewhere, which is not.',
            'The thresholds are **£' + T.schemes.annualAccounting.joinThreshold.value.toLocaleString('en-GB') + '** to join and **£' + T.schemes.annualAccounting.leaveThreshold.value.toLocaleString('en-GB') + '** to leave, the same figures as cash accounting. The scheme suits a stable business that values predictability and one filing a year. It suits a **repayment trader** badly: a business owed money by HMRC would now collect it once a year instead of four times, having made payments on account in the meantime.',
          ],
          table: {
            headers: ['', 'Annual accounting'],
            rows: [
              ['Returns per year', '1'],
              ['Instalments', '9 monthly at 10%, or 3 quarterly at 25%, of last year’s liability'],
              ['Instalments due', 'Months 4–12 (monthly), or months 4, 7 and 10 (quarterly)'],
              ['Return and balancing payment', '**2 months** after the year end — not 1 month and 7 days'],
              ['Suits', 'A stable business wanting predictable payments and one filing'],
              ['Does not suit', 'A repayment trader, who would wait a year for the refund'],
            ],
          },
        },
        {
          h: 'The flat rate scheme',
          p: [
            'The flat rate scheme is the most different of the three, because it changes **how much VAT is due**, not merely when it is paid or how often it is reported.',
            'The business continues to charge its customers VAT at the normal rate. But instead of calculating output tax less input tax, it pays HMRC a **flat percentage of its VAT-inclusive turnover** and keeps the difference. In exchange, it **does not reclaim input tax at all**. The percentage depends on trade sector, and the assessment supplies it — you are never expected to know the sector rates from memory.',
            'Three refinements attach to that basic bargain. A business in its **first year of VAT registration** takes a **1% discount** off its sector rate, running until the first anniversary of registration. A **limited cost business** — one whose spending on goods is under 2% of its flat rate turnover, or over 2% but under £1,000 a year — must use **' + T.schemes.flatRate.limitedCostBusiness.value + '%** whatever its sector; this exists to stop labour-only businesses with almost no costs profiting from a scheme designed for businesses with real purchases. And although input tax is not normally recoverable, it **may** be reclaimed on a single purchase of capital expenditure goods costing **£' + T.schemes.flatRate.capitalGoodsException.value.toLocaleString('en-GB') + ' or more including VAT**.',
            'The thresholds are asymmetric and the difference is deliberately awkward: **£' + T.schemes.flatRate.joinThreshold.value.toLocaleString('en-GB') + ' excluding VAT** to join, but **£' + T.schemes.flatRate.leaveThreshold.value.toLocaleString('en-GB') + ' including VAT** to leave. They are not measured on the same basis, and a question that gives you one figure and asks about the other is testing exactly that.',
          ],
          examtrap: 'Flat rate thresholds are measured differently at each end: £' + T.schemes.flatRate.joinThreshold.value.toLocaleString('en-GB') + ' EXCLUDING VAT to join, £' + T.schemes.flatRate.leaveThreshold.value.toLocaleString('en-GB') + ' INCLUDING VAT to leave. And the flat percentage applies to VAT-inclusive turnover.',
        },
        {
          h: 'Working out a flat rate payment',
          p: [
            'The calculation itself is a single multiplication. What makes it go wrong is applying the percentage to the wrong turnover figure — it is the **VAT-inclusive** total, not the net sales figure the business would otherwise put in Box 6.',
          ],
          worked: {
            title: 'Flat rate VAT due for a quarter',
            problem: 'Harlow Design is on the flat rate scheme with a sector rate of 12%. It is in its second year of VAT registration. For the quarter its net sales were £40,000, all standard-rated. How much VAT does it pay HMRC, and how does that compare with the normal scheme if its input tax for the quarter was £1,800?',
            steps: [
              { do: 'Find the VAT-inclusive turnover.', why: 'The flat rate applies to the gross figure. £40,000 net plus 20% VAT = £48,000 including VAT.' },
              { do: 'Check whether the first-year discount applies.', why: 'It does not — the discount runs only until the first anniversary of registration, and Harlow is in its second year. The rate stays at 12%.' },
              { do: 'Apply the flat rate.', why: '£48,000 × 12% = £5,760 payable to HMRC.' },
              { do: 'Compare with the normal scheme.', why: 'Normally Harlow would pay output tax £8,000 less input tax £1,800 = £6,200. The flat rate scheme costs £5,760, so it is £440 better off.' },
              { do: 'Notice what drives that result.', why: 'The scheme rewards a business with LOW input tax. Had Harlow’s input tax been £3,000, the normal scheme would have cost £5,000 and the flat rate scheme would have been the worse choice.' },
            ],
            answer: '£5,760 under the flat rate scheme, £440 less than the £6,200 due under the normal scheme',
            tryIt: {
              q: 'A business on the flat rate scheme has a sector rate of 9% and net standard-rated sales of £30,000 for the quarter. It is in its third year of registration. How much VAT does it pay HMRC, in pounds?',
              answer: 3240,
              unit: '£',
              hint: 'Gross the sales up first — the flat rate applies to VAT-inclusive turnover. No first-year discount applies.',
              exp: '£30,000 × 1.20 = £36,000 VAT-inclusive turnover. £36,000 × 9% = £3,240. Applying 9% to the net £30,000 would give £2,700, which is the error the question is designed to catch.',
            },
          },
        },
        {
          h: 'Leaving a scheme',
          p: [
            'Withdrawal comes in the same two forms as everything else in this outcome.',
            '**Voluntary withdrawal** is available from any of the three schemes. A business simply tells HMRC, normally leaving at the end of a VAT period. No reason is required — a business may conclude the scheme no longer suits it, and that is enough.',
            '**Compulsory withdrawal** happens when the scheme’s leave threshold is breached, or where HMRC withdraws use of the scheme to protect the revenue. For cash accounting the business must also leave if it is convicted of a VAT offence or penalised for dishonest evasion — the scheme is a concession, and it can be taken away.',
            'One asymmetry is worth remembering because it makes leaving the flat rate scheme a decision rather than an experiment: a business that has left the flat rate scheme **cannot rejoin for 12 months**. There is no such restriction on cash accounting, where a business whose turnover fell back below the join threshold could return.',
            'Leaving also has consequences for the figures. A business leaving cash accounting must account for the VAT still outstanding on invoices issued but unpaid, even though it has not been paid — at which point ordinary bad debt relief becomes available to it again if a debt subsequently goes bad.',
          ],
          callout: { kind: 'warning', text: 'Leave the flat rate scheme and you cannot rejoin for 12 months. Treat it as a decision to be modelled, not a setting to be toggled.' },
        },
      ],
      check: [
        {
          type: 'mcq',
          q: 'A business is frequently paid 60 days after invoicing and has suffered several bad debts. Which scheme addresses its problem most directly?',
          opts: [
            'Cash accounting',
            'Annual accounting, because a single return reduces the administrative burden',
            'The flat rate scheme, because it removes the need to track input tax',
            'Monthly returns, because they accelerate the recovery of input tax',
          ],
          ans: 0,
          exp: 'Cash accounting ties VAT to money actually received and paid, so nothing is handed to HMRC on an invoice the customer has not settled — and if the customer never pays, no VAT was accounted for at all. Annual accounting addresses administration, and the flat rate scheme addresses record keeping; neither fixes the cash-flow problem described.',
        },
        {
          type: 'numeric',
          q: 'A business on the flat rate scheme has a sector rate of 11% and net standard-rated sales of £25,000 for the quarter. It is in its fourth year of registration. How much VAT is payable to HMRC, in pounds?',
          answer: 3300,
          unit: '£',
          exp: '£25,000 × 1.20 = £30,000 VAT-inclusive turnover. £30,000 × 11% = £3,300. The flat rate applies to the gross figure, not the net — applying 11% to £25,000 would give £2,750 and is the trap. No first-year discount applies in year four.',
        },
        {
          type: 'mcq',
          q: 'Under the annual accounting scheme, when are the annual return and the balancing payment due?',
          opts: [
            'Two months after the end of the VAT year',
            'One calendar month and seven days after the end of the VAT year',
            'On the last day of the VAT year itself',
            'Three months after the end of the VAT year',
          ],
          ans: 0,
          exp: 'Annual accounting uses a two-month deadline for both the return and the balancing payment, not the one month and seven days that applies under the normal scheme. Carrying the quarterly deadline across to the annual scheme is a common error.',
        },
        {
          type: 'truefalse',
          q: 'Decide whether each statement about the special schemes is true or false.',
          statements: [
            { text: 'A business on the flat rate scheme still charges its customers VAT at the normal rate.', answer: true },
            { text: 'Input tax can never be reclaimed under the flat rate scheme in any circumstances.', answer: false },
            { text: 'Annual accounting suits a repayment trader particularly well.', answer: false },
            { text: 'A business leaving the flat rate scheme cannot rejoin for 12 months.', answer: true },
          ],
          exp: 'The flat rate scheme changes what the business pays HMRC, not what it charges customers. Input tax is generally not recoverable, but there is an exception for a single capital purchase of £' + T.schemes.flatRate.capitalGoodsException.value.toLocaleString('en-GB') + ' or more including VAT. Annual accounting suits a repayment trader badly, since the refund arrives once a year. And the 12-month bar on rejoining the flat rate scheme is real.',
        },
      ],
    },

    /* ── 1.5 ────────────────────────────────────────────────────────────── */
    {
      id: 'L3-TPFB-1F',
      title: 'Penalties: registration and returns',
      icon: '⚠️',
      criteria: ['TPFB-1.5.1', 'TPFB-1.5.2', 'TPFB-1.5.3', 'TPFB-1.5.4'],
      cards: [
        {
          h: 'Failing to register on time',
          p: [
            'A business that should have registered and did not has committed a **failure to notify**, and HMRC has statutory power to penalise it. The reasoning goes back to lesson 1A: the business was a taxable person from the date registration fell due, so it should have been charging VAT from that date. It did not, and the tax that should have reached the Exchequer did not arrive.',
            'That lost amount has a name — the **potential lost revenue**, or PLR. It is the VAT that would have been paid had the business registered on time, and the penalty is calculated as a **percentage of it**. This is worth pausing on: the penalty scales with the tax at stake, so registering three months late on modest turnover is a small matter, and registering three years late on substantial turnover is not.',
            'A harsher consequence often bites before the penalty does. Because the business was liable from the date registration fell due, it owes the output tax on everything it sold in the intervening period — whether or not it charged its customers any VAT. Most customers cannot be persuaded to pay a 20% surcharge on invoices settled a year ago, so in practice the business absorbs the tax out of margin it has already spent.',
          ],
          callout: { kind: 'warning', text: 'The penalty is usually the smaller problem. The larger one is owing output tax on sales made since registration fell due, on which no VAT was ever charged to the customer.' },
        },
        {
          h: 'How the failure to notify penalty is set',
          p: [
            'The percentage applied to the potential lost revenue depends on **behaviour**, and this is the structure to learn — the exact minima matter less than understanding what drives the figure.',
            'Three categories of behaviour, in ascending order of seriousness. **Non-deliberate** — the business did not realise, perhaps because it never tracked its rolling turnover — carries a maximum of **' + T.penalties.failureToNotify.behaviours.nonDeliberate.max + '%**. **Deliberate** — it knew it should register and chose not to — carries a maximum of **' + T.penalties.failureToNotify.behaviours.deliberate.max + '%**. **Deliberate and concealed** — it also took active steps to hide the failure, such as falsifying records — carries a maximum of **' + T.penalties.failureToNotify.behaviours.deliberateAndConcealed.max + '%**.',
            'Those maxima are then **reduced for the quality of disclosure**, and the single most valuable distinction is between **unprompted** and **prompted**. A disclosure is unprompted if made when the business had no reason to think HMRC had discovered, or was about to discover, the failure. Come forward first and the reduction is substantial: a non-deliberate failure disclosed unprompted within 12 months can be reduced to **nil**. Wait to be caught and the same failure carries a minimum of 10%.',
            'Finally, a **reasonable excuse** removes the penalty altogether for a **non-deliberate** failure, provided the failure is put right without unreasonable delay once the excuse ends. Serious illness or bereavement may qualify; not knowing the law, or relying on someone else without checking, generally does not.',
          ],
          table: {
            headers: ['Behaviour', 'Maximum', 'Minimum if unprompted', 'Minimum if prompted'],
            rows: [
              ['Non-deliberate, disclosed within 12 months', T.penalties.failureToNotify.behaviours.nonDeliberate.max + '%', '**0%**', '10%'],
              ['Non-deliberate, after 12 months', T.penalties.failureToNotify.behaviours.nonDeliberate.max + '%', '10%', '20%'],
              ['Deliberate', T.penalties.failureToNotify.behaviours.deliberate.max + '%', '20%', '35%'],
              ['Deliberate and concealed', T.penalties.failureToNotify.behaviours.deliberateAndConcealed.max + '%', '30%', '50%'],
            ],
          },
          examtrap: 'Some study material still quotes a 5% / 10% / 15% late registration penalty with a £50 minimum. That regime applied only where the duty to notify arose before 1 April 2010. The live regime is behaviour-based, on potential lost revenue.',
        },
        {
          h: 'Late returns: the points system',
          p: [
            'Late **submission** of a return is penalised on a points basis, and the design is deliberately forgiving of the occasional slip while being unforgiving of a pattern.',
            'Each late return earns **one point**. Nothing is charged for a point on its own. Once the business reaches its **threshold**, a **£' + T.penalties.lateSubmission.penalty.value + '** penalty is charged — and a further £' + T.penalties.lateSubmission.penalty.value + ' for every late return after that, for as long as it stays at the threshold.',
            'The threshold depends on filing frequency, and it is inversely related to how often the business files: **' + T.penalties.lateSubmission.thresholds.annual + ' points** for annual filers, **' + T.penalties.lateSubmission.thresholds.quarterly + '** for quarterly, **' + T.penalties.lateSubmission.thresholds.monthly + '** for monthly. That makes sense — a business filing twelve times a year has more opportunities to be late, so it is allowed more points before the penalty bites.',
            'Points do not last forever, but clearing them at the threshold requires real effort. The business must complete a **period of compliance**, submitting everything on time for **' + T.penalties.lateSubmission.complianceMonths.annual + ' months** (annual), **' + T.penalties.lateSubmission.complianceMonths.quarterly + ' months** (quarterly) or **' + T.penalties.lateSubmission.complianceMonths.monthly + ' months** (monthly) — *and* it must have submitted all outstanding returns for the previous 24 months. Both conditions, not either.',
            'Note what is being penalised here: **lateness of the return, not of the money**. A nil return filed late earns a point in exactly the same way as one showing a large liability.',
          ],
          table: {
            headers: ['Filing frequency', 'Points threshold', 'Period of compliance to reset'],
            rows: [
              ['Annual', String(T.penalties.lateSubmission.thresholds.annual), T.penalties.lateSubmission.complianceMonths.annual + ' months'],
              ['Quarterly', String(T.penalties.lateSubmission.thresholds.quarterly), T.penalties.lateSubmission.complianceMonths.quarterly + ' months'],
              ['Monthly', String(T.penalties.lateSubmission.thresholds.monthly), T.penalties.lateSubmission.complianceMonths.monthly + ' months'],
            ],
          },
        },
        {
          h: 'When no return is submitted at all',
          p: [
            'Points and penalties assume a return eventually arrives. Where one does not, HMRC has a further power: it may raise an **assessment to the best of its judgement**, estimating the liability from whatever information it has — previous returns, trade data, information from third parties. These are sometimes called prime or central assessments.',
            'Three features of an assessment are worth knowing, and each is a common misunderstanding.',
            'First, an assessment does **not** discharge the obligation to file. The return is still due; the assessment simply creates an enforceable debt in the meantime, so that HMRC is not left waiting indefinitely with nothing to collect. Submitting the return displaces the assessment with the real figure.',
            'Second, the assessment is HMRC’s best judgement, not the business’s. It is frequently higher than the true liability, because the business is not there to argue for deductions and HMRC will not assume input tax it cannot see. Ignoring an assessment because "it is too high anyway" is the worst available response.',
            'Third, there are **time limits**. HMRC may normally assess up to **' + T.assessments.normalTimeLimitYears.value + ' years** back — which is why the ' + T.records.retentionYears.value + '-year retention rule exists — extended to **' + T.assessments.extendedTimeLimitYears.value + ' years** where the loss of tax was brought about deliberately. Penalties and interest continue to run throughout, so the passage of time makes the position worse rather than better.',
          ],
          callout: { kind: 'key', text: 'An assessment is a placeholder debt, not a substitute for the return. Filing displaces it; ignoring it lets penalties and interest accumulate on a figure that is usually too high.' },
        },
      ],
      check: [
        {
          type: 'mcq',
          q: 'A business registers for VAT eighteen months late. On what amount is the failure to notify penalty calculated?',
          opts: [
            'The potential lost revenue — the VAT that should have been paid over that period',
            'The total turnover of the business over the eighteen-month period',
            'A fixed statutory sum of £' + T.penalties.lateSubmission.penalty.value + ', in line with the late submission penalty',
            'The input tax the business would have been able to reclaim had it registered',
          ],
          ans: 0,
          exp: 'The penalty is a percentage of the potential lost revenue — the VAT that would have reached HMRC had registration happened on time. The percentage itself depends on behaviour and on whether disclosure was prompted or unprompted.',
        },
        {
          type: 'mcq',
          q: 'A business files quarterly and has just submitted its fourth late return. What happens?',
          opts: [
            'It reaches the points threshold and a £' + T.penalties.lateSubmission.penalty.value + ' penalty is charged',
            'It receives a fourth point but no penalty, the quarterly threshold being five points',
            'A penalty of £' + (T.penalties.lateSubmission.penalty.value * 4) + ' is charged, being £' + T.penalties.lateSubmission.penalty.value + ' for each of the four late returns',
            'Nothing is charged, because points expire automatically after twelve months',
          ],
          ans: 0,
          exp: 'The threshold for quarterly filers is four points. The fourth late return reaches it, triggering a £' + T.penalties.lateSubmission.penalty.value + ' penalty — and a further £' + T.penalties.lateSubmission.penalty.value + ' for every late return while the business remains at the threshold. Points are only cleared by a 12-month period of compliance together with submission of all outstanding returns for the previous 24 months.',
        },
        {
          type: 'truefalse',
          q: 'Decide whether each statement about penalties and assessments is true or false.',
          statements: [
            { text: 'An unprompted disclosure attracts a lower minimum penalty than a prompted one.', answer: true },
            { text: 'An HMRC assessment removes the obligation to submit the outstanding return.', answer: false },
            { text: 'A nil return submitted late still earns a penalty point.', answer: true },
            { text: 'A reasonable excuse can remove a penalty for a non-deliberate failure to notify.', answer: true },
          ],
          exp: 'Coming forward before HMRC finds the failure is rewarded with a lower minimum. An assessment creates an enforceable debt but the return remains due, and filing it displaces the assessment. The points system penalises lateness of the return regardless of the amount, so a nil return counts. And a reasonable excuse removes the penalty for a non-deliberate failure put right promptly.',
        },
        {
          type: 'gapfill',
          q: 'Complete the points threshold, the reset period and the assessment limit.',
          template: 'A business filing quarterly reaches the points threshold at {0} points, and must then file on time for {1} to reset them. HMRC may normally raise an assessment going back {2}.',
          gaps: [
            { options: ['4', '2', '5'], answer: 0 },
            { options: ['12 months', '6 months', '24 months'], answer: 0 },
            { options: ['4 years', '6 years', '20 years'], answer: 0 },
          ],
          exp: 'Quarterly filers reach the threshold at four points and need a 12-month period of compliance, plus all outstanding returns for the previous 24 months, to clear them. The normal assessment limit is four years, extended to twenty where tax has been lost deliberately.',
        },
      ],
    },

    /* ── 1.5 continued ──────────────────────────────────────────────────── */
    {
      id: 'L3-TPFB-1G',
      title: 'Penalties: paying late, errors and wrong recovery',
      icon: '💷',
      criteria: ['TPFB-1.5.5', 'TPFB-1.5.6', 'TPFB-1.5.7'],
      cards: [
        {
          h: 'Paying late: two penalties and interest',
          p: [
            'Late **payment** is penalised entirely separately from late submission, and the structure is escalating rather than fixed — the longer the money is outstanding, the harder it bites. There are three distinct charges and they can all run at once.',
            'Nothing at all is charged if payment is made **within 15 days** of the due date. This is a genuine grace period, and it exists because HMRC would rather have the money slightly late than fight about it.',
            'The **first penalty** arrives at day 15: **' + T.penalties.latePayment.firstPenaltyDay15.value + '%** of whatever is outstanding then. If the debt is still unpaid at **day 30**, a further **' + T.penalties.latePayment.firstPenaltyDay30.value + '%** of the amount outstanding at that point is added — so a business that pays on day 31 has been charged twice.',
            'The **second penalty** then begins on **day 31** and accrues **daily at ' + T.penalties.latePayment.secondPenaltyAnnualised.value + '% a year** on the balance outstanding, until it is paid or a Time to Pay agreement is reached. Unlike the first penalty, this one keeps growing.',
            'Running alongside all of it is **late payment interest**, charged at the **Bank of England base rate plus 4%** from the first day the payment is overdue. Interest is not a penalty and is not affected by the 15-day grace period — it runs from day one. And it continues even where a Time to Pay agreement has stopped further penalties accruing.',
          ],
          table: {
            headers: ['When paid', 'What is charged'],
            rows: [
              ['Within 15 days', 'No penalty — interest only'],
              ['Days 16–30', T.penalties.latePayment.firstPenaltyDay15.value + '% of the amount outstanding at day 15'],
              ['Day 31 or later', 'That ' + T.penalties.latePayment.firstPenaltyDay15.value + '%, **plus** ' + T.penalties.latePayment.firstPenaltyDay30.value + '% of the amount outstanding at day 30'],
              ['Still unpaid after day 30', '**Plus** a second penalty accruing daily at ' + T.penalties.latePayment.secondPenaltyAnnualised.value + '% a year'],
              ['Throughout', 'Late payment interest at base rate + 4%, from day one'],
            ],
          },
          examtrap: 'These rates changed under Finance Act 2025. They were previously 2% / 2% / 4%. Material written before the change quotes the old figures, and both sets look equally plausible.',
        },
        {
          h: 'Working out what late payment costs',
          p: [
            'Questions on this tend to give a liability and a payment date and ask for the penalty. The method is to work out where the payment date sits relative to the three checkpoints — day 15, day 30, and beyond — and then apply only the charges that have been triggered.',
          ],
          worked: {
            title: 'Penalties on a VAT liability paid 40 days late',
            problem: 'Ashby Ltd owes £20,000 of VAT for the quarter. It pays nothing until 40 days after the due date, when it settles the full amount. What late payment penalties arise? Ignore interest.',
            steps: [
              { do: 'Check the 15-day grace period.', why: 'Payment was not made within 15 days, so the grace period does not apply and the first penalty is triggered.' },
              { do: 'Apply the day 15 charge.', why: 'The full £20,000 was outstanding at day 15. £20,000 × ' + T.penalties.latePayment.firstPenaltyDay15.value + '% = £600.' },
              { do: 'Check the position at day 30.', why: 'Still nothing had been paid, so the whole £20,000 was outstanding at day 30 as well. A further £20,000 × ' + T.penalties.latePayment.firstPenaltyDay30.value + '% = £600 is charged.' },
              { do: 'Add the second penalty from day 31.', why: 'The debt ran from day 31 to day 40 — ten days — at ' + T.penalties.latePayment.secondPenaltyAnnualised.value + '% a year. £20,000 × 10% × 10/365 = £54.79.' },
              { do: 'Total it.', why: '£600 + £600 + £54.79 = £1,254.79, on top of the £20,000 of VAT and the interest running from day one.' },
            ],
            answer: '£1,254.79 in penalties — £600 at day 15, £600 at day 30 and £54.79 of second penalty',
            tryIt: {
              q: 'A business owes £8,000 of VAT and pays it in full on day 20 after the due date. What is the total late payment penalty, in pounds? Ignore interest.',
              answer: 240,
              unit: '£',
              hint: 'Day 20 is past the grace period but before day 30. Only one charge has been triggered.',
              exp: '£8,000 × ' + T.penalties.latePayment.firstPenaltyDay15.value + '% = £240. The day 30 charge never arises because the debt was cleared on day 20, and the second penalty only begins at day 31.',
            },
          },
        },
        {
          h: 'Getting error correction wrong',
          p: [
            'Outcome 3 covers the mechanics of correcting an error. What belongs here is the **consequence of doing it wrongly**, because that is a matter of legislation rather than method.',
            'The rule being applied is that a small net error may be corrected on the next return, while a larger one must be separately notified to HMRC on **form ' + T.errorCorrection.separateNotificationForm + '**. Correcting a large error quietly on the next return, rather than notifying it, is a **failure to notify an error** in its own right — and it is penalised, even though the tax itself has been put right and HMRC has lost nothing in the end.',
            'That can feel disproportionate until you see what is being protected. The notification requirement is what lets HMRC see the scale and pattern of errors across the taxpayer population. An error buried in a return is invisible; the same error notified is data. The obligation is to the transparency of the system, not only to the money.',
            'Two further points. A **deliberate** error must **always** be separately notified, whatever its size — the value limits apply only to genuine mistakes. And errors carry the same behaviour-based penalty structure as failure to notify: a percentage of the tax, driven by whether the error was careless, deliberate, or deliberate and concealed, and reduced according to the quality of disclosure. Correcting an error the moment it is found, unprompted, is worth real money.',
          ],
          callout: { kind: 'warning', text: 'A deliberate error must always be separately notified, whatever the amount. The size limits exist for genuine mistakes only.' },
        },
        {
          h: 'Reclaiming VAT that was never recoverable',
          p: [
            'The last of these concerns **incorrect recovery** — input tax reclaimed that the business was not entitled to reclaim. Outcome 2 covered which items are blocked: client entertaining, cars available for private use, purchases without a valid VAT invoice, and costs attributable to exempt supplies.',
            'The **operational** consequence is straightforward. The input tax is disallowed and becomes repayable, with interest from the date it was wrongly recovered. A business that has reclaimed £6,000 on a car for three years does not simply stop; it repays what it took, with interest, and the cash impact arrives all at once.',
            'The **legal** consequence depends, as ever, on behaviour. A genuine misunderstanding about a borderline item is careless at worst and may attract a low penalty or none. A pattern of reclaiming VAT on obviously blocked items, or on invoices the business knows it does not hold, moves quickly towards deliberate — and at the far end, VAT fraud is a criminal offence, not merely a matter of penalties.',
            'There is a professional dimension too, and the specification cares about it. An accounting technician who prepares a return knowing it claims input tax the business is not entitled to has a problem that is not solved by the penalty being the client’s. The obligation to act with integrity and to make a disclosure where required sits with the person preparing the figures, and it is the subject of Outcome 5.',
          ],
          split: {
            left: { title: 'Operational consequences', items: ['The input tax is disallowed and becomes repayable', 'Interest runs from the date of the wrongful recovery', 'HMRC may look at earlier periods too, up to ' + T.assessments.normalTimeLimitYears.value + ' years', 'Records and systems come under closer scrutiny'] },
            right: { title: 'Legal consequences', items: ['A behaviour-based penalty as a percentage of the tax', 'A higher percentage where the recovery was deliberate', 'Criminal liability at the extreme, for VAT fraud', 'A professional obligation on whoever prepared the return'] },
          },
        },
      ],
      check: [
        {
          type: 'numeric',
          q: 'A business owes £15,000 of VAT and pays it in full 25 days after the due date. What is the total late payment penalty, in pounds? Ignore interest.',
          answer: 450,
          unit: '£',
          exp: '£15,000 × ' + T.penalties.latePayment.firstPenaltyDay15.value + '% = £450. Day 25 is past the 15-day grace period, so the first charge applies, but the payment was made before day 30 so the second ' + T.penalties.latePayment.firstPenaltyDay30.value + '% charge is never triggered and the second penalty never begins.',
        },
        {
          type: 'mcq',
          q: 'A business discovers a deliberate error of £3,000 in a previous return. How must it be corrected?',
          opts: [
            'It must be separately notified to HMRC, because deliberate errors are always notifiable regardless of amount',
            'It may be corrected on the next return, being comfortably below the £' + T.errorCorrection.netErrorLimit.value.toLocaleString('en-GB') + ' net error limit',
            'It may be corrected on the next return provided it does not exceed 1% of the Box 6 figure',
            'It requires no action, because the error will be picked up on the next HMRC inspection',
          ],
          ans: 0,
          exp: 'The value limits for correcting an error on the next return apply only to genuine mistakes. A deliberate error must always be separately notified, whatever its size, and correcting it quietly is itself a further failure.',
        },
        {
          type: 'truefalse',
          q: 'Decide whether each statement about late payment and incorrect recovery is true or false.',
          statements: [
            { text: 'No late payment penalty arises if the VAT is paid within 15 days of the due date.', answer: true },
            { text: 'Late payment interest only begins to run after day 15.', answer: false },
            { text: 'Input tax wrongly recovered becomes repayable with interest from the date of recovery.', answer: true },
            { text: 'A Time to Pay agreement, if kept to, prevents further penalties accruing.', answer: true },
          ],
          exp: 'The 15-day grace period applies to penalties only — interest runs from the first day the payment is overdue. Wrongly recovered input tax is repayable with interest from when it was taken. And a Time to Pay agreement that is honoured stops further penalties, though interest continues.',
        },
        {
          type: 'mcq',
          q: 'VAT is paid 35 days after the due date, having been outstanding in full throughout. Which charges apply?',
          opts: [
            'Both first penalty charges, plus a second penalty accruing from day 31, plus interest',
            'Only the day 15 charge, since a single late payment cannot be penalised twice',
            'Only the second penalty, which replaces the first once day 31 has passed',
            'No penalty, provided the return itself was submitted by the due date',
          ],
          ans: 0,
          exp: 'The charges are cumulative rather than alternative. ' + T.penalties.latePayment.firstPenaltyDay15.value + '% is charged on the amount outstanding at day 15, a further ' + T.penalties.latePayment.firstPenaltyDay30.value + '% on the amount outstanding at day 30, and the second penalty accrues daily from day 31. Interest runs alongside all of it from day one, and filing the return on time is irrelevant to the payment penalties.',
        },
      ],
    },
  ];


  /* ── Outcome 3: Review and verify VAT returns (20%) ───────────────────────
     Half of this outcome is "be able to" rather than "understand", so it is
     built around worked examples rather than exposition. It also depends on
     Outcome 2 throughout: you cannot check a return you could not have built. */
  var LESSONS_LO3 = [

    /* ── 3.1 ────────────────────────────────────────────────────────────── */
    {
      id: 'L3-TPFB-3A',
      title: 'Errors: which ones go on the next return',
      icon: '🔧',
      criteria: ['TPFB-3.1.1', 'TPFB-3.1.2', 'TPFB-3.1.3', 'TPFB-3.1.4'],
      cards: [
        {
          h: 'Returns are wrong more often than you would think',
          p: [
            'A VAT return is a self-assessment prepared under time pressure from records that were themselves prepared under time pressure. Invoices arrive late. A supply gets rated wrongly. A credit note is posted to the wrong side. Input tax is claimed on a car. None of this is unusual, and the law does not treat it as scandalous — it provides a route for putting it right.',
            'What the law does insist on is that the route is followed. There are exactly two ways of correcting a previous period\'s error, HMRC calls them **Method 1** and **Method 2**, and which one applies is not a matter of preference. Using the wrong one is itself a failure, penalised separately from the error, even where the tax ends up correct.',
            'So the question this lesson answers is a narrow one, and it is worth stating precisely before any arithmetic: **given an error in a previous period, may it be corrected on the next return, or must it be separately notified to HMRC?** Everything else follows from that.',
            'One thing to be clear about at the outset. This is about errors in **previous** periods. An error spotted before the return is submitted is not an error correction at all — it is just a correction. Fix it and file the right figure.',
          ],
          callout: { kind: 'key', text: 'Method 1: adjust it on the next return. Method 2: notify HMRC separately on form ' + T.errorCorrection.separateNotificationForm + '. The choice is determined by the rules, not by convenience.' },
        },
        {
          h: 'The test has two limbs',
          p: [
            'Method 1 — correcting on the next return — is available only if the error passes **both** limbs of a two-part test. Fail either one and Method 2 becomes compulsory.',
            'The **first limb** is a flat figure. A net error of **£' + T.errorCorrection.netErrorLimit.value.toLocaleString('en-GB') + ' or less** may always be corrected on the next return. Below that figure nothing else needs checking; the error is small enough that HMRC does not want to hear about it separately.',
            'The **second limb** catches larger errors and scales them to the size of the business. An error **above £' + T.errorCorrection.netErrorLimit.value.toLocaleString('en-GB') + '** may still go on the next return if it does not exceed **' + T.errorCorrection.turnoverPercentage.value + '% of the Box 6 figure** for the period in which the error is discovered — subject to an absolute ceiling of **£' + T.errorCorrection.absoluteCeiling.value.toLocaleString('en-GB') + '**. Above that ceiling, Method 2 is required however large the business is.',
            'Read the two limbs together and the structure is: small errors always qualify; middling errors qualify if the business is big enough that the error is proportionately trivial; very large errors never qualify. That is a sensible design, and remembering the reason makes the mechanics much easier to reproduce under pressure than remembering three numbers.',
          ],
          flow: ['Net error ≤ £' + T.errorCorrection.netErrorLimit.value.toLocaleString('en-GB') + '?', 'Yes → Method 1', 'No → is it ≤ ' + T.errorCorrection.turnoverPercentage.value + '% of Box 6 AND ≤ £' + T.errorCorrection.absoluteCeiling.value.toLocaleString('en-GB') + '?', 'Yes → Method 1', 'No → Method 2'],
          examtrap: 'The ' + T.errorCorrection.turnoverPercentage.value + '% is of the Box 6 figure for the period in which the error is DISCOVERED — not the period in which it was made. Questions give both figures.',
        },
        {
          h: '"Net error" means net',
          p: [
            'The word doing most of the work in that test is **net**, and it is the detail that most often produces a wrong answer even when the thresholds have been learned correctly.',
            'The net error is the **total of all errors found, under-declarations less over-declarations**, for the periods being corrected. It is not the largest single error, and it is not the sum of their absolute values.',
            'So a business that finds it under-declared output tax by £9,000 and separately over-claimed input tax by £4,000 has a net error of £13,000 — both are under-declarations of VAT due, and they add. But a business that under-declared output tax by £9,000 and *also* under-claimed input tax by £4,000 has a net error of £5,000, because the second error was in HMRC\'s favour and offsets the first.',
            'That second case is the one to watch. Two errors of £9,000 and £4,000 might look like a £13,000 problem requiring Method 2, when in fact the business owes £5,000 net and may correct it on the next return. Working out the direction of each error before adding anything is not optional.',
          ],
          split: {
            left: { title: 'Increases the net error', items: ['Output tax **under**-declared — too little VAT charged', 'Input tax **over**-claimed — too much VAT reclaimed', 'Both mean VAT is owed to HMRC'] },
            right: { title: 'Reduces the net error', items: ['Output tax **over**-declared — too much VAT charged', 'Input tax **under**-claimed — too little VAT reclaimed', 'Both mean HMRC owes the business'] },
          },
        },
        {
          h: 'Time limits, and the errors the test does not cover',
          p: [
            'Two qualifications sit outside the two-limb test, and both override it.',
            'The first is the **four-year time limit**. An error may only be corrected within four years — measured from the end of the period for under- or over-declared **output** tax, and from the return due date for under-claimed **input** tax. Beyond four years the correction is simply out of time, whichever method would otherwise have applied.',
            'The second is the treatment of **deliberate** errors. A deliberate error must **always** be separately notified under Method 2, whatever its size. The value limits exist for genuine mistakes; they are not a shelter for a decision. Burying a deliberate error inside the next return is a further failure on top of the original one, and it moves the whole matter into the deliberate-and-concealed band of the penalty regime — the most expensive band there is.',
            'It is also worth knowing that **Method 2 may be used voluntarily** for any error, including a small one. There is no rule against notifying an error you were entitled to adjust quietly. A business that wants a clean, documented record — or an accountant who wants the disclosure to be visibly unprompted — may reasonably choose it.',
          ],
          callout: { kind: 'warning', text: 'A deliberate error is always Method 2, whatever the amount. And nothing at all can be corrected more than four years back.' },
        },
        {
          h: 'What separate notification involves, and what it costs',
          p: [
            'Method 2 means telling HMRC about the error directly, on **form ' + T.errorCorrection.separateNotificationForm + '** or through the online error correction service, rather than folding it into a return. The notification states what the error was, which periods it affected, how much VAT is involved and in which direction.',
            'Two consequences follow, and neither is automatic punishment.',
            '**Interest** runs where the error meant VAT was paid late. That is not a penalty and is not discretionary — the business had money that should have been HMRC\'s, and interest is the price of that.',
            'A **penalty** depends entirely on **behaviour**, following the same structure as the failure to notify regime in lesson 1F. An error made despite taking reasonable care attracts no penalty at all. A careless error attracts a modest one. A deliberate error attracts a large one, and concealment larger still. Every band is reduced for the quality of disclosure, and an **unprompted** disclosure — made before the business had reason to think HMRC was about to find it — is worth a great deal.',
            'The practical lesson is the same one that runs through the whole penalty regime: the moment an error is found is the moment it is cheapest to disclose. Waiting does not make it go away, and being found rather than confessing costs real money.',
          ],
          callout: { kind: 'tip', text: 'Reasonable care taken and prompt unprompted disclosure can mean no penalty at all. The same error found by HMRC eighteen months later will not be free.' },
        },
      ],
      check: [
        {
          type: 'mcq',
          q: 'A business discovers a net error of £6,200 relating to a previous quarter. It was a genuine mistake. How should it be corrected?',
          opts: [
            'On the next return, under Method 1',
            'By separate notification on form VAT652, because all errors above £5,000 must be reported',
            'By separate notification, because errors in previous periods can never go on a later return',
            'It cannot be corrected at all, and the business must wait for HMRC to raise an assessment',
          ],
          ans: 0,
          exp: 'A net error of £' + T.errorCorrection.netErrorLimit.value.toLocaleString('en-GB') + ' or less may always be corrected on the next return, so the first limb is satisfied and nothing further needs checking. At £6,200, and not being deliberate, this is a straightforward Method 1 correction.',
        },
        {
          type: 'mcq',
          q: 'A business finds a net error of £24,000. Its Box 6 figure for the period of discovery is £3,000,000. The error was careless, not deliberate. Which method applies?',
          opts: [
            'Method 1 — the error is within ' + T.errorCorrection.turnoverPercentage.value + '% of Box 6 and below the £' + T.errorCorrection.absoluteCeiling.value.toLocaleString('en-GB') + ' ceiling',
            'Method 2 — any error above £' + T.errorCorrection.netErrorLimit.value.toLocaleString('en-GB') + ' must always be separately notified',
            'Method 2 — the error exceeds 1% of the Box 6 figure for the period',
            'Method 1 — but only if HMRC gives prior written approval for the adjustment',
          ],
          ans: 0,
          exp: '1% of £3,000,000 is £30,000, and the £24,000 error is below it. It is also below the £' + T.errorCorrection.absoluteCeiling.value.toLocaleString('en-GB') + ' ceiling and was not deliberate, so both limbs are satisfied and Method 1 is available. The first limb being failed does not by itself force Method 2 — that is what the second limb is for.',
        },
        {
          type: 'truefalse',
          q: 'Decide whether each statement about correcting errors is true or false.',
          statements: [
            { text: 'A deliberate error must always be separately notified, whatever its value.', answer: true },
            { text: 'The 1% test uses the Box 6 figure for the period in which the error was made.', answer: false },
            { text: 'An error discovered five years after the period can still be corrected.', answer: false },
            { text: 'A business may choose to notify a small error separately even though it need not.', answer: true },
          ],
          exp: 'Deliberate errors are always Method 2. The 1% test uses the Box 6 figure for the period of DISCOVERY, not of the error. Nothing can be corrected beyond four years. And Method 2 is always available voluntarily, which can be worth doing for a clean disclosure record.',
        },
        {
          type: 'gapfill',
          q: 'Complete the two limbs of the error correction test.',
          template: 'A net error of £{0} or less may always go on the next return. Above that, it may still go on the next return if it is within {1} of the Box 6 figure for the period of discovery, subject to a ceiling of £{2}.',
          gaps: [
            { options: ['10,000', '1,000', '50,000'], answer: 0 },
            { options: ['1%', '10%', '5%'], answer: 0 },
            { options: ['50,000', '10,000', '100,000'], answer: 0 },
          ],
          exp: 'Small errors always qualify; middling ones qualify if proportionately trivial for the size of the business; very large ones never do. Both limbs must be satisfied, and a deliberate error fails regardless.',
        },
      ],
    },

    /* ── 3.1 continued ──────────────────────────────────────────────────── */
    {
      id: 'L3-TPFB-3B',
      title: 'Calculating and processing error adjustments',
      icon: '🧮',
      criteria: ['TPFB-3.1.5', 'TPFB-3.1.6'],
      cards: [
        {
          h: 'From "there is an error" to "here is the figure"',
          p: [
            'Knowing which method applies is half the outcome. The other half is producing the number: working out what the correction actually is, deciding which way it goes, and seeing what it does to the return.',
            'The method is always the same three steps, and following them in order prevents nearly every mistake that these questions are designed to produce. **Work out what was recorded. Work out what should have been recorded. The difference is the adjustment.** Resist the urge to leap straight to the answer; the difference between "the invoice was £2,400" and "the error was £2,400" is exactly the kind of slip that a computer-marked assessment cannot give partial credit for.',
            'Then decide the **direction**, which is a separate question and deserves separate attention. Does the correction increase the VAT due to HMRC, or reduce it? Every error is one or the other, and the arithmetic that follows depends entirely on getting that right.',
          ],
          callout: { kind: 'key', text: 'What was recorded, what should have been recorded, and the difference between them. Then the direction — more VAT due, or less.' },
        },
        {
          h: 'A single error',
          p: [
            'Start with one error in isolation, because the compound cases are only this repeated. Note in particular how the question gives a *gross* figure — as they usually do — and how much of the work is in the first step rather than the last.',
          ],
          worked: {
            title: 'Output tax under-declared on a missed invoice',
            problem: 'While preparing the March quarter return, Lyndon Supplies finds that a sales invoice from the December quarter was never posted. The invoice was for £7,200 including VAT at the standard rate. What is the error, which way does it go, and how is it corrected?',
            steps: [
              { do: 'Work out what should have been recorded.', why: 'The invoice was £7,200 gross. VAT at the standard rate is one sixth of the gross: £7,200 ÷ 6 = £1,200 of output tax, on a net value of £6,000.' },
              { do: 'Work out what was recorded.', why: 'Nothing. The invoice was never posted, so £0 of output tax was declared for it.' },
              { do: 'Take the difference.', why: '£1,200 − £0 = £1,200. That is the error.' },
              { do: 'Decide the direction.', why: 'Output tax was UNDER-declared, so the business owes HMRC more. The correction increases the VAT payable by £1,200.' },
              { do: 'Choose the method.', why: 'The net error of £1,200 is well under £' + T.errorCorrection.netErrorLimit.value.toLocaleString('en-GB') + ' and was not deliberate, so Method 1 applies: adjust the VAT account and add £1,200 to output tax on the March return.' },
              { do: 'Do not forget the value box.', why: 'The net £6,000 also belongs in the sales total. Correcting only the VAT and leaving Box 6 understated leaves the return internally inconsistent — and it is the sort of thing a reconciliation is designed to catch.' },
            ],
            answer: 'A £1,200 under-declaration of output tax, corrected on the next return under Method 1',
            tryIt: {
              q: 'A purchase invoice for £3,600 including standard-rate VAT was omitted from a previous return. By how much does correcting it change the VAT payable, in pounds?',
              answer: 600,
              unit: '£',
              hint: 'Find the VAT in the gross figure, then decide which way a missed PURCHASE invoice goes.',
              exp: '£3,600 ÷ 6 = £600 of input tax that was never reclaimed. Input tax was under-claimed, so the correction REDUCES the VAT payable by £600 — the opposite direction to a missed sales invoice of the same size.',
            },
          },
        },
        {
          h: 'Several errors at once',
          p: [
            'Assessment questions rarely give one error. They give three or four pointing in different directions and expect a single net figure, because that is what the two-limb test needs and because it is the only way to test whether direction has been understood.',
            'The discipline is to build a table rather than work in prose: one line per error, each showing the amount and the direction, then a single total. Keeping under-declarations and over-declarations in separate columns and subtracting once at the end is far more reliable than trying to add signed numbers in your head.',
          ],
          worked: {
            title: 'Four errors, one net figure, one decision',
            problem: 'Ashwell Trading finds four errors from earlier periods. (1) Output tax under-declared £8,400. (2) Input tax over-claimed £2,600 on client entertaining. (3) Output tax over-declared £1,900 on a sale wrongly treated as standard-rated when it was zero-rated. (4) Input tax under-claimed £3,100 on a mislaid purchase invoice. Box 6 for the current period is £520,000. What is the net error, and how must it be corrected?',
            steps: [
              { do: 'Classify error 1.', why: 'Output tax under-declared £8,400 — too little VAT charged, so VAT is OWED to HMRC. This increases the net error.' },
              { do: 'Classify error 2.', why: 'Input tax over-claimed £2,600 — too much VAT reclaimed, so VAT is again OWED. Increases the net error. Entertaining is blocked, so none of it was recoverable.' },
              { do: 'Classify error 3.', why: 'Output tax over-declared £1,900 — too much VAT charged, so HMRC owes the business. This REDUCES the net error.' },
              { do: 'Classify error 4.', why: 'Input tax under-claimed £3,100 — too little reclaimed, so HMRC owes the business again. Also REDUCES the net error.' },
              { do: 'Net them off.', why: 'Owed to HMRC: £8,400 + £2,600 = £11,000. Owed to the business: £1,900 + £3,100 = £5,000. Net error = £11,000 − £5,000 = £6,000 payable to HMRC.' },
              { do: 'Apply the test to the NET figure.', why: '£6,000 is below £' + T.errorCorrection.netErrorLimit.value.toLocaleString('en-GB') + ', so the first limb is satisfied and Method 1 applies. Notice that the gross total of the four errors was £16,000, which would have failed the first limb and, at 1% of £520,000 = £5,200, failed the second as well. Netting is what makes the difference here.' },
            ],
            answer: 'A net error of £6,000 payable to HMRC, corrected on the next return under Method 1',
            tryIt: {
              q: 'A business finds it under-declared output tax by £14,500 and under-claimed input tax by £2,300. What is the net error, in pounds?',
              answer: 12200,
              unit: '£',
              hint: 'The two errors point in opposite directions — one is VAT owed to HMRC, the other is VAT owed to the business.',
              exp: '£14,500 owed to HMRC less £2,300 owed to the business = £12,200 net. That exceeds £' + T.errorCorrection.netErrorLimit.value.toLocaleString('en-GB') + ', so the second limb must now be tested against 1% of the Box 6 figure for the period of discovery.',
            },
          },
        },
        {
          h: 'What the adjustment does to the return',
          p: [
            'The last requirement of this topic area is to recognise the **impact** of the adjustment — not merely to compute it. Three effects are worth being able to state.',
            'The **immediate** effect is on Box 5. A correction that increases VAT due raises the payment; one that reduces it lowers the payment, or turns it into a repayment. Under Method 1 the adjustment is folded into the return, so no separate figure appears — this is why an unexplained jump in a period\'s liability should always prompt the question of whether a prior-period correction is buried in it.',
            'The **record-keeping** effect is that the VAT account must show the correction separately. Adjusting the return without adjusting the underlying account leaves the two disagreeing, and the reconciliation in lesson 3E will then fail for a reason nobody can trace six months later.',
            'The **cash** effect is the one businesses feel. A large Method 1 correction arrives in a single period, on top of that period\'s ordinary liability. A business that has been under-declaring for a year does not repay it gently over the next year; it repays it all at once, on one due date, and if it cannot the late payment regime of lesson 1G begins immediately.',
          ],
          examtrap: 'Under Method 1 the correction disappears into the return\'s ordinary figures. Only the VAT account shows it separately — which is exactly why the VAT account has to be kept properly.',
        },
      ],
      check: [
        {
          type: 'numeric',
          q: 'A sales invoice for £10,800 including standard-rate VAT was omitted from a previous return. By how much does the correction increase the VAT payable, in pounds?',
          answer: 1800,
          unit: '£',
          exp: '£10,800 ÷ 6 = £1,800 of output tax that was never declared. A missed sales invoice means output tax was under-declared, so the correction increases the VAT payable. The net £9,000 also needs adding to the sales value box.',
        },
        {
          type: 'numeric',
          q: 'A business finds these errors: output tax under-declared £9,600; input tax over-claimed £1,400; output tax over-declared £2,000. What is the net error, in pounds?',
          answer: 9000,
          unit: '£',
          exp: 'Owed to HMRC: £9,600 + £1,400 = £11,000. Owed to the business: £2,000. Net error = £11,000 − £2,000 = £9,000. That is below £' + T.errorCorrection.netErrorLimit.value.toLocaleString('en-GB') + ', so Method 1 is available — though the gross total of £13,000 would not have been.',
        },
        {
          type: 'mcq',
          q: 'Input tax of £900 was reclaimed on client entertaining in a previous period. What is the effect of correcting this?',
          opts: [
            'It increases the VAT payable by £900, because input tax was over-claimed',
            'It reduces the VAT payable by £900, because the input tax is now allowable',
            'It has no effect on the VAT payable, because entertaining is outside the scope',
            'It increases the VAT payable by £180, being 20% of the amount over-claimed',
          ],
          ans: 0,
          exp: 'Entertaining is blocked, so the £900 should never have been reclaimed. Over-claimed input tax means VAT is owed to HMRC, so the correction increases the VAT payable by the full £900 — not by a percentage of it, since the £900 is already the VAT.',
        },
        {
          type: 'truefalse',
          q: 'Decide whether each statement about processing adjustments is true or false.',
          statements: [
            { text: 'Correcting a missed sales invoice means adjusting the sales value box as well as the VAT.', answer: true },
            { text: 'A Method 1 adjustment appears as a separate figure on the face of the return.', answer: false },
            { text: 'Under-claimed input tax reduces the net error.', answer: true },
            { text: 'The VAT account must show the correction separately.', answer: true },
          ],
          exp: 'Both the VAT and the net value need correcting, or the return is internally inconsistent. Method 1 folds the adjustment into the ordinary figures — only the VAT account shows it separately, which is why it must. And under-claimed input tax is VAT owed to the business, so it offsets under-declarations.',
        },
      ],
    },

    /* ── 3.2 ────────────────────────────────────────────────────────────── */
    {
      id: 'L3-TPFB-3C',
      title: 'Inside the return: what goes in each box',
      icon: '📦',
      criteria: ['TPFB-3.2.1', 'TPFB-3.2.2'],
      cards: [
        {
          h: 'Nine boxes, and the ones this unit asks about',
          p: [
            'The VAT return has nine boxes. Outcome 2 built the figures that go in them; this topic is about knowing precisely what each one contains, because the assessment asks directly and because you cannot verify a return without it.',
            'Three of the nine are **not assessed in this unit**. Boxes 2, 8 and 9 all concern movements of goods between Northern Ireland and the EU, and the specification excludes Northern Ireland rules from the unit entirely. They are mentioned here only so that the numbering makes sense — if you meet Box 3 as "boxes 1 and 2 added together" and have never heard of Box 2, the definition looks broken.',
            'That leaves six to know properly, and they fall into two natural groups whose difference is the single most useful thing in this lesson. Boxes 1 to 5 are the **VAT boxes** — amounts of tax. Boxes 6 to 9 are the **value boxes** — the net values of the supplies themselves, excluding VAT. Confusing the two groups is the most common error in return preparation, and almost everything that follows is a consequence of the distinction.',
          ],
          table: {
            headers: ['Box', 'Contains', 'Assessed?'],
            rows: [
              ['1', 'VAT due on sales and other outputs', 'Yes'],
              ['2', 'VAT due on acquisitions from EU member states', '**No** — NI only'],
              ['3', 'Total VAT due (Box 1 + Box 2)', 'Yes'],
              ['4', 'VAT reclaimed on purchases and other inputs', 'Yes'],
              ['5', 'Net VAT to pay or reclaim (Box 3 − Box 4)', 'Yes'],
              ['6', 'Total value of sales and other outputs, excluding VAT', 'Yes'],
              ['7', 'Total value of purchases and other inputs, excluding VAT', 'Yes'],
              ['8', 'Value of goods supplied to EU member states', '**No** — NI only'],
              ['9', 'Value of goods acquired from EU member states', '**No** — NI only'],
            ],
          },
        },
        {
          h: 'The VAT boxes: 1, 3, 4 and 5',
          p: [
            '**Box 1** is output tax: the VAT due on everything supplied in the period. It is not only sales invoices. It also picks up the adjustments taught in Outcome 2 — the **fuel scale charge**, VAT on **gifts of goods worth more than £50**, and **import VAT declared under postponed accounting**. Zero-rated, exempt and outside-the-scope supplies add nothing here, because no VAT arises on them.',
            '**Box 4** is input tax: VAT recoverable on purchases. It includes **import VAT reclaimed under postponed accounting** — the same figure that went into Box 1 — and **bad debt relief**, which is claimed as input tax rather than as a reduction of output tax. It excludes everything blocked: client entertaining, cars available for private use, and anything for which the business does not hold a valid VAT invoice.',
            '**Boxes 3 and 5 are calculated, not entered.** Box 3 is Box 1 plus Box 2; since Box 2 is nil for a business without Northern Ireland acquisitions, Box 3 usually equals Box 1. Box 5 is Box 3 minus Box 4 — the figure that is actually paid or reclaimed.',
            'A negative Box 5 is a **repayment**, and lesson 2G made the point that this is entirely normal for a zero-rated trader or an exporter. Software will present it as a repayment rather than a negative number, but the arithmetic is the same subtraction.',
          ],
          formula: 'Box 3 = Box 1 + Box 2 · Box 5 = Box 3 − Box 4 · Box 5 negative means a repayment is due',
        },
        {
          h: 'The value boxes: 6 and 7',
          p: [
            'The value boxes are where returns most often go quietly wrong, because their contents are broader than intuition suggests.',
            '**Box 6** is the total **net value of ALL sales and other outputs**, excluding VAT. The word "all" is doing the work. It includes standard-rated and reduced-rated sales, and it also includes **zero-rated sales, exempt sales and exports** — supplies that contributed nothing whatever to Box 1. The instinct to leave out a sale that carried no VAT is exactly wrong, and it is what makes a Box 6 figure too small.',
            '**Box 7** is the total **net value of all purchases and other inputs**, excluding VAT, including imports. It excludes things that are outside the scope of VAT altogether: **wages, PAYE and National Insurance, drawings**, and other non-business expenditure. A Box 7 figure that has swallowed the payroll is a large and obvious error, and it is one of the first things a reviewer checks.',
            'It is worth holding on to why Box 6 matters beyond the return itself: it is the figure the **1% error correction test** is measured against. A business that habitually understates Box 6 by omitting its zero-rated sales is also, without realising, shrinking the size of error it may correct on a future return.',
          ],
          examtrap: 'Box 6 includes zero-rated and exempt sales even though they added nothing to Box 1. Box 7 excludes wages, PAYE and drawings. Both are easy to get wrong in the same return.',
        },
        {
          h: 'Imports and exports on the return',
          p: [
            'Lesson 2F covered the mechanics; what matters here is where the figures land, because imports and exports touch different boxes and behave quite differently.',
            '**Exports** — goods sent outside the UK — are **zero-rated**. No VAT arises, so Box 1 is unaffected. But the net value still belongs in **Box 6**, exactly like any other zero-rated sale. An exporter that omits its export sales from Box 6 will report a Box 6 figure close to nil while reclaiming substantial input tax, which is both wrong and conspicuous.',
            '**Imports under postponed VAT accounting** are the neat case, and the one most likely to be examined because it looks paradoxical. The import VAT is declared as output tax in **Box 1** and simultaneously reclaimed as input tax in **Box 4**. For a fully taxable business the two cancel and the net effect on Box 5 is **nil** — no cash crosses at the border and none crosses on the return. The net value of the goods goes in **Box 7**.',
            'The word "fully taxable" in that sentence is load-bearing. A **partially exempt** business cannot recover all of its input tax, so the Box 4 entry is smaller than the Box 1 entry and postponed accounting produces a real net cost. PVA is a timing mechanism, not a relief, and it only nets to nothing for a business that could recover the VAT anyway.',
          ],
          table: {
            headers: ['Transaction', 'Box 1', 'Box 4', 'Box 6', 'Box 7'],
            rows: [
              ['Standard-rated UK sale', 'VAT', '—', 'Net', '—'],
              ['Zero-rated sale or export', '—', '—', '**Net**', '—'],
              ['Exempt sale', '—', '—', '**Net**', '—'],
              ['Standard-rated UK purchase', '—', 'VAT', '—', 'Net'],
              ['Import under PVA', '**VAT**', '**VAT**', '—', 'Net'],
              ['Wages and PAYE', '—', '—', '—', '**Excluded**'],
            ],
          },
        },
      ],
      check: [
        {
          type: 'mcq',
          q: 'A business makes £40,000 of standard-rated sales and £25,000 of zero-rated sales in a quarter, both net. What goes in Box 6?',
          opts: [
            '£65,000 — Box 6 includes zero-rated sales',
            '£40,000, because only sales carrying VAT belong in Box 6',
            '£78,000, being the standard-rated sales grossed up plus the zero-rated sales',
            '£25,000, because standard-rated sales are already represented in Box 1',
          ],
          ans: 0,
          exp: 'Box 6 is the net value of ALL sales and other outputs, whether or not VAT arose on them. Zero-rated and exempt sales belong there too. Only £8,000 of VAT on the standard-rated sales goes in Box 1, but the full £65,000 of net value goes in Box 6.',
        },
        {
          type: 'mcq',
          q: 'Which of these must be EXCLUDED from Box 7?',
          opts: [
            'Wages and PAYE',
            'The net value of goods imported under postponed VAT accounting',
            'The net value of standard-rated purchases from UK suppliers',
            'The net value of purchases on which input tax was blocked',
          ],
          ans: 0,
          exp: 'Wages, PAYE and drawings are outside the scope of VAT and never appear in Box 7. Imports and ordinary purchases do belong there, and so does the net value of a blocked purchase — the input tax is not recoverable in Box 4, but the expenditure still happened.',
        },
        {
          type: 'truefalse',
          q: 'Decide whether each statement about the VAT return boxes is true or false.',
          statements: [
            { text: 'Box 5 is calculated as Box 3 minus Box 4.', answer: true },
            { text: 'Import VAT under postponed accounting appears in both Box 1 and Box 4.', answer: true },
            { text: 'Exempt sales are omitted from Box 6 because no VAT arises on them.', answer: false },
            { text: 'Bad debt relief is claimed by reducing Box 1.', answer: false },
          ],
          exp: 'Box 5 is Box 3 less Box 4. PVA is declared and reclaimed simultaneously, netting to nil for a fully taxable business. Box 6 includes exempt and zero-rated sales despite carrying no VAT. And bad debt relief is claimed as input tax in Box 4, not as a reduction of output tax.',
        },
        {
          type: 'numeric',
          q: 'A fully taxable business imports goods with a customs value of £30,000 under postponed VAT accounting. What is the net effect on Box 5, in pounds?',
          answer: 0,
          unit: '£',
          exp: '£6,000 is declared in Box 1 and the same £6,000 reclaimed in Box 4, so the net effect on Box 5 is nil. The £30,000 net value still goes in Box 7. The answer would not be nil for a partially exempt business, which could not recover the whole Box 4 figure.',
        },
      ],
    },

    /* ── 3.2 continued ──────────────────────────────────────────────────── */
    {
      id: 'L3-TPFB-3D',
      title: 'Checking the return before it goes',
      icon: '🔍',
      criteria: ['TPFB-3.2.3', 'TPFB-3.2.4'],
      cards: [
        {
          h: 'Why checking is a step and not a formality',
          p: [
            'It would be easy to treat "check the return before submission" as advice rather than content. The specification makes it a key concept, and there are good reasons why.',
            'The first is that **submission is a declaration**. The return is the business\'s own statement of what it owes, and once submitted it is the figure HMRC relies on. Getting it wrong is not a draft that will be reviewed by somebody else; it is a legal statement that then has to be corrected through the machinery of lesson 3A, with interest and possibly a penalty.',
            'The second is the point lesson 1D made about Making Tax Digital. Under MTD, figures flow from the underlying records to the return through **digital links, with no manual stage**. That is precisely what removes the accidental safety net. Under the old regime somebody typed the figures and might have noticed that Box 6 was implausibly small; now nobody types anything, and a wrong figure at source arrives at HMRC untouched. The check has to be deliberate because it is no longer incidental.',
            'The third is that **errors are cheapest when found early**. An error caught before submission is not an error at all — there is no correction, no notification, no interest, no penalty, no question about behaviour. The same error caught eighteen months later by an HMRC officer is all of those things. The few minutes spent checking buy a genuinely disproportionate amount of protection.',
          ],
          callout: { kind: 'key', text: 'An error found before submission costs nothing. The same error found after submission costs a correction, interest, possibly a penalty, and a conversation about behaviour.' },
        },
        {
          h: 'What to actually check',
          p: [
            'Useful checking is a small number of specific tests, not a vague re-reading. Each of the following catches a different class of error, and together they catch most of what goes wrong.',
            '**Does the VAT bear a sensible relationship to the values?** If sales are all standard-rated, Box 1 should be close to 20% of Box 6. A long way off means either that some sales are zero-rated or exempt — which should be verifiable — or that something is wrong. This single ratio test catches more than any other.',
            '**Is the direction plausible for this business?** Lesson 2G made the point: a general retailer selling standard-rated goods to the public should be paying HMRC. If the return shows a repayment, look again. An exporter that comes out payable deserves the same second look.',
            '**Is the period right?** Invoices near a period end are the classic problem. A tax point falling either side of the boundary moves a supply between quarters, and both the omission and the duplication are easy.',
            '**Have the adjustments been made?** Fuel scale charge, bad debt relief, blocked input tax removed, prior-period corrections. These are the items that live outside the sales and purchase daybooks and so are missed most often — they have no natural prompt.',
            '**Does the return agree with the records?** That is the reconciliation, and it is the subject of the next lesson.',
          ],
          split: {
            left: { title: 'Quick sense checks', items: ['Box 1 ≈ 20% of Box 6, unless there are zero-rated or exempt sales', 'Payment or repayment — is that right for this business?', 'Is Box 6 much larger than Box 1 for a standard-rated trader?', 'Does the liability look like previous periods?'] },
            right: { title: 'Completeness checks', items: ['Invoices around the period-end boundary', 'Fuel scale charge and bad debt relief included', 'Blocked input tax removed from purchases', 'Prior-period corrections processed', 'Zero-rated and exempt sales present in Box 6'] },
          },
        },
        {
          h: 'When the return and the records disagree',
          p: [
            'A reviewer\'s real skill is diagnostic: given a difference between the return and the accounting records, working out what would produce a difference of that shape. Some causes are innocent and some are errors, and telling them apart quickly is what the specification means by identifying reasons for differences.',
            'Several **legitimate** causes exist, and a reviewer who has not internalised them will chase problems that are not there. **Timing differences** are the commonest: the tax point rules of lesson 2B mean a supply belongs to the period of its tax point, which is not always the period the accounting system recorded it in. Under **cash accounting** the return follows receipts and payments while the ledgers follow invoices, so the two are *expected* to differ. **Prior-period error corrections** made under Method 1 sit in the return without appearing in this period\'s ledgers at all. And **partial exemption** restrictions reduce recoverable input tax below the amount in the purchase ledger.',
            'The **error** causes look different in character. Input tax claimed on a blocked item, a supply given the wrong rate, a credit note posted to the wrong side, a transposition, a missing invoice, or output tax accounted for in the wrong period.',
            'The practical approach is to size the difference first and let its shape suggest the cause. A difference that is exactly 20% of a round number points at a single omitted or duplicated invoice. A difference divisible by 9 is very often a transposition — £1,530 recorded as £1,350 differs by £180. A difference matching the fuel scale charge to the penny is an adjustment that was forgotten. Sizing before hunting saves a great deal of time.',
          ],
          table: {
            headers: ['Cause', 'Legitimate or error?'],
            rows: [
              ['Tax point falls in a different period from the ledger entry', 'Legitimate — timing'],
              ['Cash accounting: return follows money, ledgers follow invoices', 'Legitimate — expected'],
              ['A Method 1 correction of a prior-period error', 'Legitimate — by design'],
              ['Partial exemption restricting recoverable input tax', 'Legitimate — restriction'],
              ['Input tax claimed on entertaining or a car', '**Error** — blocked'],
              ['A sale given the wrong VAT rate', '**Error** — categorisation'],
              ['Two digits transposed (difference divisible by 9)', '**Error** — posting'],
            ],
          },
        },
      ],
      check: [
        {
          type: 'mcq',
          q: 'A business makes only standard-rated sales. Its return shows Box 6 of £200,000 and Box 1 of £12,000. What does this most likely indicate?',
          opts: [
            'An error — Box 1 should be around £40,000 if all sales are standard-rated',
            'Nothing unusual, since Box 1 and Box 6 are not expected to be related',
            'That the business is partially exempt and has restricted its output tax',
            'That the sales figure in Box 6 has been grossed up to include VAT',
          ],
          ans: 0,
          exp: '£200,000 × 20% = £40,000, so £12,000 is far too low for a wholly standard-rated trader. The ratio test between Box 1 and Box 6 is the single most productive check available. Partial exemption restricts INPUT tax, not output tax, so it could not explain this.',
        },
        {
          type: 'mcq',
          q: 'A business uses cash accounting. Its VAT return does not agree with its sales ledger. What is the most likely explanation?',
          opts: [
            'Nothing is wrong — the return follows receipts while the ledger follows invoices',
            'Input tax has been claimed on blocked items such as entertaining',
            'A prior-period error has been corrected under Method 2',
            'The business has exceeded the cash accounting turnover threshold',
          ],
          ans: 0,
          exp: 'Under cash accounting output tax follows money received rather than invoices issued, so a difference from the sales ledger is expected rather than symptomatic. Knowing the legitimate causes of difference is what stops a reviewer chasing problems that are not there.',
        },
        {
          type: 'truefalse',
          q: 'Decide whether each statement about checking returns is true or false.',
          statements: [
            { text: 'An error found before submission requires no correction, interest or penalty.', answer: true },
            { text: 'Making Tax Digital removes the manual stage at which a wrong figure might be noticed.', answer: true },
            { text: 'A difference between the return and the ledgers always indicates an error.', answer: false },
            { text: 'A difference divisible by 9 often indicates a transposition.', answer: true },
          ],
          exp: 'Fixing a figure before filing is not an error correction at all. MTD\'s digital links are precisely what remove the incidental human check, which is why a deliberate one is needed. Timing, cash accounting, prior-period corrections and partial exemption all cause legitimate differences. And the divisible-by-nine test is a genuinely useful shortcut for spotting transpositions.',
        },
      ],
    },

    /* ── 3.2 continued ──────────────────────────────────────────────────── */
    {
      id: 'L3-TPFB-3E',
      title: 'Reconciling the return to the records',
      icon: '⚖️',
      criteria: ['TPFB-3.2.5', 'TPFB-3.2.6'],
      cards: [
        {
          h: 'The VAT control account',
          p: [
            'Reconciliation is the formal version of the checking in the last lesson: proving that the return and the accounting records tell the same story, and explaining every difference between them.',
            'The document at the centre of it is the **VAT control account**, which lesson 1B identified as the record HMRC asks for first. It is an ordinary ledger account, and Level 2 taught you to post to it. Output tax is **credited** to it as sales are recorded, because it is a liability owed to HMRC. Input tax is **debited**, because it reduces that liability. The balance at the period end is what the business owes — and it should equal Box 5.',
            'Should, but does not automatically. The control account is built from the daybooks; the return is built from the control account **plus the adjustments** that live outside the daybooks. Every one of those adjustments is a legitimate difference that has to be identified and explained, and that is precisely what a reconciliation does.',
            'It is worth being clear about what a successful reconciliation proves and what it does not. It proves the return is **consistent** with the records. It does not prove either is **right**: a sale recorded at the wrong rate in the daybook will flow through to both, and reconcile perfectly. Reconciliation and review are two different checks, and a business needs both.',
          ],
          split: {
            left: { title: 'Credited to the VAT control account', items: ['Output tax on sales', 'Fuel scale charge', 'Import VAT under PVA (declared)', 'Credit notes received from suppliers'] },
            right: { title: 'Debited to the VAT control account', items: ['Input tax on purchases', 'Bad debt relief', 'Import VAT under PVA (reclaimed)', 'Credit notes issued to customers'] },
          },
        },
        {
          h: 'Reconciling in practice',
          p: [
            'The method is the same as any reconciliation you have met: start with one figure, apply the known reconciling items, and arrive at the other. Start from the control account balance, because that is the one built mechanically from the ledgers, and work towards Box 5.',
          ],
          worked: {
            title: 'Reconciling a control account balance to Box 5',
            problem: 'Bramley Ltd\'s VAT control account shows a credit balance of £18,400 at the quarter end. The return shows Box 5 of £18,010 payable. Investigation finds: a fuel scale charge of £90 was included in the return but never posted to the control account; bad debt relief of £560 was claimed on the return but not posted; and input tax of £80 on client entertaining was posted to the control account but correctly excluded from the return. Does the return reconcile?',
            steps: [
              { do: 'Start with the control account balance.', why: 'A credit balance of £18,400 means the ledgers say £18,400 is owed to HMRC. That is the starting point because it is built mechanically from the daybooks.' },
              { do: 'Add the fuel scale charge.', why: 'The £90 charge increased output tax on the return but never reached the control account. Adding it moves the ledger figure towards the return: £18,400 + £90 = £18,490.' },
              { do: 'Deduct the bad debt relief.', why: 'Relief is claimed as input tax, reducing what is owed. It reduced the return but not the control account: £18,490 − £560 = £17,930.' },
              { do: 'Add back the blocked input tax.', why: 'The £80 on entertaining was debited to the control account, which wrongly REDUCED the ledger liability by £80. The return correctly left it out, so the return is £80 higher than the ledger. Reversing the wrong debit: £17,930 + £80 = £18,010. Work out which way each item moves the balance rather than assuming an adjustment always reduces it.' },
              { do: 'Compare with Box 5.', why: '£18,010 reconciled against £18,010 on the return. It agrees, and every difference is explained by an identified adjustment.' },
            ],
            answer: 'Yes — £18,400 + £90 − £560 + £80 = £18,010, agreeing with Box 5',
            tryIt: {
              q: 'A VAT control account shows a credit balance of £9,400. A fuel scale charge of £120 was included in the return but not posted, and bad debt relief of £300 was claimed on the return but not posted. What figure should Box 5 show, in pounds?',
              answer: 9220,
              unit: '£',
              hint: 'The scale charge increases what is owed; bad debt relief reduces it.',
              exp: '£9,400 + £120 − £300 = £9,220. The scale charge is additional output tax, so it increases the liability; bad debt relief is claimed as input tax, so it reduces it.',
            },
          },
        },
        {
          h: 'Reviewing a return from the accounting information',
          p: [
            'The other "be able to" requirement in this topic is the reverse exercise: given a set of accounting information, review a return somebody else prepared and say whether it is right.',
            'This is a different skill from building one, and it is worth approaching differently. When building a return you work forwards from the records. When reviewing, work **backwards from the return**, asking of each figure: what should this be, and does the evidence support it?',
            'A workable order is to check the **structure** first — is Box 3 really Box 1 plus Box 2, is Box 5 really Box 3 less Box 4? These are arithmetic and either agree or do not. Then check the **ratios**, as in lesson 3D. Then check **completeness**: are the adjustments there, and does Box 6 include the zero-rated and exempt sales? Then check the **exclusions**: is there blocked input tax in Box 4, or wages in Box 7?',
            'Working in that order matters, because a structural error makes every later check meaningless — if Box 5 does not equal Box 3 minus Box 4 then something is badly wrong with how the return was assembled, and there is no point examining the ratios of figures that were not combined correctly in the first place.',
          ],
          flow: ['Check the structure', 'Check the ratios', 'Check completeness', 'Check the exclusions', 'Reconcile to the records'],
        },
        {
          h: 'What to do with what you find',
          p: [
            'Finding a problem is not the end of the task. What happens next depends on when it was found and how large it is, and the whole of this outcome comes together at that point.',
            'If the return has **not yet been submitted**, amend it. There is no error to correct, nothing to notify and nothing to disclose.',
            'If it **has been submitted**, lesson 3A decides the route: work out the net error, apply the two-limb test, and either adjust the next return under Method 1 or notify separately under Method 2. Remember that a deliberate error is always Method 2, and that nothing is correctable beyond four years.',
            'If the problem is **systemic** rather than a one-off — input tax claimed on entertaining every quarter, or zero-rated sales routinely omitted from Box 6 — then correcting this period is only half the job. The same error is in earlier returns too, and the aggregate may be large enough to change which method applies. It is also the kind of pattern HMRC finds quickly on inspection, and finding it yourself first is worth real money under the unprompted disclosure rules.',
            'And if the problem raises a question about **whether the figures were wrong on purpose**, that is no longer a technical matter. Lesson 1G touched on it: the obligation to act with integrity sits with whoever prepares the return, and it is not discharged by the penalty falling on somebody else. Outcome 5 deals with who to tell and how.',
          ],
          callout: { kind: 'tip', text: 'Before submission, just fix it. After submission, run the two-limb test. If it is systemic, check the earlier periods too — the aggregate may change the method.' },
        },
      ],
      check: [
        {
          type: 'numeric',
          q: 'A VAT control account shows a credit balance of £12,600. A fuel scale charge of £150 was included in the return but never posted, and bad debt relief of £480 was claimed on the return but not posted. What should Box 5 show, in pounds?',
          answer: 12270,
          unit: '£',
          exp: '£12,600 + £150 − £480 = £12,270. The fuel scale charge is additional output tax and increases the liability; bad debt relief is claimed as input tax and reduces it. Both were on the return but not in the ledger, so both are reconciling items.',
        },
        {
          type: 'mcq',
          q: 'A reconciliation between the VAT control account and the return agrees exactly. What does this prove?',
          opts: [
            'That the return is consistent with the accounting records',
            'That the return is correct and no further checking is needed',
            'That every supply has been given the correct VAT rate',
            'That no input tax has been claimed on blocked items',
          ],
          ans: 0,
          exp: 'Reconciliation proves consistency, not correctness. A sale recorded at the wrong rate flows into both the ledger and the return and reconciles perfectly. Reconciliation and review are separate checks, and a business needs both.',
        },
        {
          type: 'truefalse',
          q: 'Decide whether each statement about reconciliation is true or false.',
          statements: [
            { text: 'Output tax is credited to the VAT control account.', answer: true },
            { text: 'Bad debt relief reduces the balance owed on the control account.', answer: true },
            { text: 'A return found to be wrong before submission requires a Method 1 correction.', answer: false },
            { text: 'A systemic error may affect earlier periods as well as the current one.', answer: true },
          ],
          exp: 'Output tax is a liability, so it is credited; input tax and bad debt relief are debited and reduce it. A return not yet submitted is simply amended — there is no error correction. And a systemic error certainly does affect earlier periods, which is exactly why the aggregate may change which method applies.',
        },
        {
          type: 'mcq',
          q: 'A reviewer finds that input tax on client entertaining has been claimed in every quarter for the past two years. What should be done?',
          opts: [
            'Correct the current period and aggregate the earlier errors to determine the method',
            'Correct only the current period, since earlier returns have already been submitted',
            'Notify HMRC under Method 2 regardless of the amounts, because the error repeated',
            'Take no action, since input tax on entertaining is recoverable if incurred on clients',
          ],
          ans: 0,
          exp: 'A systemic error affects every period it occurred in. The aggregate net error must be worked out across all of them, because it may exceed the limits that the current period alone would satisfy. Entertaining is blocked, and repetition alone does not make an error deliberate — behaviour does.',
        },
      ],
    },
  ];


  /* ── Outcome 4: Understand principles of payroll (15%) ────────────────────
     A change of subject: the first three outcomes were VAT throughout. The
     specification excludes CALCULATING Income Tax, National Insurance and
     student loan repayments (4.1.12) — those figures are supplied. What is
     assessed is the employer's framework and the arithmetic AROUND the given
     deductions, which is a much narrower and more learnable target than most
     students expect. */
  var LESSONS_LO4 = [

    /* ── 4.1 ────────────────────────────────────────────────────────────── */
    {
      id: 'L3-TPFB-4A',
      title: 'Payroll: who runs it and what HMRC can require',
      icon: '👥',
      criteria: ['TPFB-4.1.1', 'TPFB-4.1.2', 'TPFB-4.1.3', 'TPFB-4.1.4', 'TPFB-4.1.9'],
      cards: [
        {
          h: 'The second tax collected on somebody else\'s behalf',
          p: [
            'Everything so far has been VAT. This outcome changes subject, and it is worth pausing on why the two sit in the same unit at all, because the connection is not accidental.',
            'The opening chapter framed the unit as being about **two taxes a business handles on other people\'s behalf**. VAT is collected from customers. Payroll taxes are deducted from employees. In both cases the business is holding money that belongs to the Exchequer and passing it on, and in both cases that is what justifies the machinery around it — compulsory registration, prescribed records, fixed deadlines, rights of inspection, and penalties that begin on a named day.',
            'So if the shape of this outcome feels familiar, that is because it is the same shape. Register, keep records, file returns, pay on time, be penalised if you do not. What changes is the detail: different deadlines, different forms, different retention period, a different penalty structure. The temptation is to assume the VAT answers carry across, and several of them very nearly do without being right.',
            '**Payroll is operated by any business or individual who employs staff**, and the obligation is genuinely universal. A sole director of their own limited company is an employer of one, and must run payroll. A household employing a nanny is an employer. There is no size below which the rules stop applying. And as with VAT, **HMRC is the relevant tax authority** — the same body, the same statutory footing.',
          ],
          callout: { kind: 'key', text: 'Same shape as VAT: register, record, report, pay, be penalised. Different details throughout — and it is the details that are assessed.' },
        },
        {
          h: 'When a business must register as an employer',
          p: [
            'Registration is the first obligation, and unlike VAT registration there is **no threshold to cross**. The trigger is simply employing somebody.',
            'The timing rule is short: an employer must register **before the first payday**, and cannot register **more than two months** in advance. The window is deliberately narrow at both ends. Registering after the first payment has already been made is late; registering six months before trading starts is not permitted.',
            'What follows registration is an **employer PAYE reference**, which is needed before any submission can be made. This is the practical reason the deadline matters: the reference does not arrive instantly, and an employer who registers the day before payday may find they cannot file on time even though they intended to. The same trap appeared in lesson 1D with Making Tax Digital authorisation.',
            'It is worth noticing how different this is from VAT. VAT registration turns on a **turnover threshold**, tested backwards and forwards, and a small business may trade for years without it. Employer registration turns on a single binary fact: is anyone being paid? A business with £20,000 of turnover and one part-time employee must register as an employer while being nowhere near the VAT threshold.',
          ],
          split: {
            left: { title: 'VAT registration', items: ['Triggered by a turnover **threshold**', 'Two tests, historic and future', 'Effective date depends on which test', 'A business may never need to register'] },
            right: { title: 'Employer registration', items: ['Triggered by **employing anyone at all**', 'No threshold of any kind', 'Before the first payday', 'Not more than 2 months in advance'] },
          },
        },
        {
          h: 'What HMRC can require, and what it can inspect',
          p: [
            'HMRC\'s powers over payroll mirror its powers over VAT, and for the same reason — the employer is holding deducted money that is not its own.',
            'HMRC may require an employer to **register**, to **keep records** in a prescribed form, to **submit returns** on a fixed calendar, and to **pay the amounts due** by statutory deadlines. Each of those is a separate obligation with its own consequence for failure, which is the point most worth carrying into the penalties lesson: an employer can comply with three of the four and still be penalised for the fourth.',
            'HMRC also has **rights of inspection**. It may inspect payroll records, visit business premises at a reasonable time, and require documents to be produced. As with VAT, an employer compliance visit is routine work rather than an accusation, and it is generally arranged in advance — though HMRC may visit unannounced.',
            'What an officer looks for is whether the deductions actually made match what should have been made, and whether what was deducted was actually paid over. That second half is the one that catches struggling businesses. Deducting tax from an employee\'s wage and then using the money for something else is not a late payment in the ordinary commercial sense; it is spending money deducted from somebody else\'s pay, and HMRC treats it accordingly.',
          ],
          callout: { kind: 'warning', text: 'Deductions are the employee\'s money until they reach HMRC. An employer who deducts and does not pay over has spent somebody else\'s wages, and the penalty regime reflects that.' },
        },
      ],
      check: [
        {
          type: 'mcq',
          q: 'When must a business register as an employer with HMRC?',
          opts: [
            'Before the first payday, and no more than two months in advance',
            'Once its total annual payroll cost first exceeds the VAT registration threshold',
            'Within 30 days of the end of the tax year in which it first employed staff',
            'Only if it employs someone other than its own directors',
          ],
          ans: 0,
          exp: 'There is no threshold for employer registration — employing anyone at all triggers it, including a sole director of their own company. Registration must happen before the first payday, and cannot be made more than two months ahead. The employer PAYE reference is needed before any submission can be filed.',
        },
        {
          type: 'truefalse',
          q: 'Decide whether each statement about employer obligations is true or false.',
          statements: [
            { text: 'HMRC is the relevant tax authority for payroll as well as for VAT.', answer: true },
            { text: 'A sole director of their own limited company must operate payroll.', answer: true },
            { text: 'Employer registration is triggered by a turnover threshold.', answer: false },
            { text: 'HMRC may inspect payroll records and visit business premises.', answer: true },
          ],
          exp: 'HMRC administers both taxes on the same statutory footing. Employing anyone — including only yourself as a director — makes a business an employer. There is no threshold, unlike VAT. And the inspection and visit powers mirror those for VAT, because in both cases the business holds money belonging to the Exchequer.',
        },
        {
          type: 'mcq',
          q: 'A business has annual turnover of £22,000 and employs one part-time assistant. What is its position?',
          opts: [
            'It must register as an employer, but not for VAT',
            'It need register for neither, being below the threshold for both',
            'It must register for both, since employing staff triggers VAT registration',
            'It must register for VAT, but employer registration is optional at this size',
          ],
          ans: 0,
          exp: 'Employer registration has no threshold, so employing the assistant makes it compulsory. VAT registration turns on taxable turnover, and £22,000 is far below the threshold. The two regimes are entirely independent of each other.',
        },
      ],
    },

    /* ── 4.1 continued ──────────────────────────────────────────────────── */
    {
      id: 'L3-TPFB-4B',
      title: 'Records, software and employee data',
      icon: '🔐',
      criteria: ['TPFB-4.1.5', 'TPFB-4.1.10'],
      cards: [
        {
          h: 'What must be kept, and for how long',
          p: [
            'The payroll record-keeping duty is drawn as widely as the VAT one, and for the same reason: HMRC sees submissions, not the underlying facts, so the records are what makes the system checkable.',
            'An employer must keep what it **paid** each employee and the **deductions** made, the **reports submitted** to HMRC and the **payments made** to HMRC, employee **leave and sickness absence**, **tax code notices**, **taxable expenses and benefits**, and Payroll Giving documents where the scheme is operated.',
            'The retention period is **' + T.payroll.records.retentionYears.value + ' years from the end of the tax year** the records relate to. That is worth committing to memory as a contrast rather than in isolation, because **VAT records must be kept for ' + T.records.retentionYears.value + ' years** and the two are examined in the same unit. Three for payroll, six for VAT. Mixing them up is one of the easiest marks in the paper to throw away.',
            'The consequence of failing to keep records is severe and comes in two parts. HMRC may **estimate what is owed** — an estimate the employer is then in a poor position to argue with, having no records — **and** charge a penalty of up to **£' + T.payroll.records.penalty.value.toLocaleString('en-GB') + '**. If records are lost, stolen or destroyed, HMRC must be told immediately and the employer must make reasonable efforts to reconstruct them.',
          ],
          table: {
            headers: ['', 'Payroll', 'VAT'],
            rows: [
              ['Retention period', '**' + T.payroll.records.retentionYears.value + ' years**', '**' + T.records.retentionYears.value + ' years**'],
              ['Measured from', 'The end of the tax year', 'The date of the record'],
              ['Penalty for failure', 'Up to £' + T.payroll.records.penalty.value.toLocaleString('en-GB') + ', plus an estimated assessment', '£' + T.records.penalty.value],
            ],
          },
          examtrap: 'Payroll records: ' + T.payroll.records.retentionYears.value + ' years. VAT records: ' + T.records.retentionYears.value + ' years. Both are examined in this unit and the numbers are easy to transpose under pressure.',
        },
        {
          h: 'Software is not optional',
          p: [
            'Payroll must be run using **software capable of reporting under Real Time Information**. This is not a recommendation about efficiency; RTI submissions have to be made electronically in a prescribed format every time employees are paid, and that cannot be done on paper.',
            'HMRC provides **Basic PAYE Tools** free for employers with fewer than 10 employees, which removes the cost objection for the smallest businesses. Larger employers use commercial payroll software, often integrated with their accounting system.',
            'The parallel with Making Tax Digital in lesson 1D is close, and the consequence is the same one worth internalising: the figures flow from the payroll system to HMRC without a person reading them. Where a wrong tax code or a mistyped hours figure would once have been caught by somebody preparing a return, it now goes straight through. Checking has to be deliberate because it is no longer incidental.',
          ],
          callout: { kind: 'tip', text: 'RTI-capable software is compulsory. HMRC\'s Basic PAYE Tools is free for employers with fewer than 10 employees, so cost is not a reason to be non-compliant.' },
        },
        {
          h: 'Employee data is personal data',
          p: [
            'The specification asks specifically about **data protection as it applies to employees\' personal data**, and it belongs here because payroll is where a business holds the most sensitive information about the people who work for it.',
            'Consider what a payroll record actually contains: name, address, date of birth, National Insurance number, bank details, salary, and — through sickness absence and statutory payments — information about health, pregnancy and family circumstances. Some of that is **special category data** under UK GDPR, subject to stricter conditions than ordinary personal data.',
            'The principles that bear most directly on payroll are worth stating individually. Data must be processed **lawfully, fairly and transparently** — employees should know what is held and why. It must be collected for **specified purposes** and not reused for unrelated ones; payroll data gathered to pay people is not a marketing list. It must be **adequate and limited to what is necessary**, so collecting information the payroll does not need is itself a breach. It must be **accurate** and kept up to date. It must not be **kept longer than necessary** — which is where the three-year retention rule and data protection meet, and where they can pull in opposite directions. And it must be kept **secure**, with appropriate technical and organisational measures.',
            'The practical consequences are mundane and are exactly what an assessment would ask about: payroll files are not left where colleagues can read them, payslips are not distributed openly, salary information is not discussed with people who have no need to know, access to the payroll system is restricted to those who require it, and a breach — a payroll file emailed to the wrong recipient — has to be dealt with rather than quietly hoped about.',
          ],
          split: {
            left: { title: 'The principles that bite hardest in payroll', items: ['Lawful, fair and transparent', 'Collected for a specified purpose only', 'Adequate, relevant, and limited to what is needed', 'Accurate and kept up to date', 'Not kept longer than necessary', 'Kept secure'] },
            right: { title: 'What that means in practice', items: ['Restrict payroll system access to those who need it', 'Do not leave payroll files or payslips on view', 'Do not discuss individual pay with colleagues', 'Do not reuse payroll data for another purpose', 'Deal with a breach rather than hope', 'Treat health and absence data as more sensitive still'] },
          },
        },
      ],
      check: [
        {
          type: 'mcq',
          q: 'For how long must payroll records be retained?',
          opts: [
            '3 years from the end of the tax year they relate to',
            '6 years from the end of the tax year, matching the rule for VAT records',
            '4 years, matching the normal HMRC assessment time limit',
            '7 years from the date each employee leaves the business',
          ],
          ans: 0,
          exp: 'Payroll records are kept for three years from the end of the tax year. VAT records are kept for six. Both rules are examined in this unit and the two figures are easy to transpose — three for payroll, six for VAT.',
        },
        {
          type: 'truefalse',
          q: 'Decide whether each statement about payroll records and data is true or false.',
          statements: [
            { text: 'Payroll must be run using RTI-capable software.', answer: true },
            { text: 'Failing to keep payroll records can lead to both an estimated assessment and a penalty.', answer: true },
            { text: 'Payroll data may be reused for another business purpose once collected.', answer: false },
            { text: 'Sickness absence records fall outside data protection because they are operational.', answer: false },
          ],
          exp: 'RTI submissions must be electronic, so compliant software is compulsory. HMRC may estimate the liability AND charge up to £' + T.payroll.records.penalty.value.toLocaleString('en-GB') + '. Data collected for payroll is limited to that purpose. And absence data is health-related, which makes it more sensitive than ordinary personal data, not less.',
        },
        {
          type: 'mcq',
          q: 'Which of these is the clearest breach of the data protection principles in a payroll context?',
          opts: [
            'Emailing a spreadsheet of all staff salaries to an employee who did not need it',
            'Keeping a record of each employee’s tax code notices from HMRC',
            'Restricting access to the payroll system to the two people who operate it',
            'Retaining payroll records for three years after the end of the tax year',
          ],
          ans: 0,
          exp: 'Sending salary data to someone with no need to see it breaches both the security principle and the purpose limitation. Keeping tax code notices is required, restricting access is exactly what the security principle demands, and three-year retention is the rule rather than a breach of it.',
        },
      ],
    },

    /* ── 4.1 continued ──────────────────────────────────────────────────── */
    {
      id: 'L3-TPFB-4C',
      title: 'Gross pay, taxable pay and net pay',
      icon: '💰',
      criteria: ['TPFB-4.1.6', 'TPFB-4.1.7', 'TPFB-4.1.8'],
      cards: [
        {
          h: 'Four terms that are not synonyms',
          p: [
            'The specification asks for the difference between **gross pay, taxable pay, taxable gross pay and net pay**. Four terms, easily blurred, and the distinctions carry real marks because a payslip question is usually a question about which figure a deduction attaches to.',
            '**Gross pay** is everything the employee earns before any deduction at all: basic pay, overtime, commission, bonuses, holiday pay, statutory payments. It is the top line and the starting point for everything else.',
            '**Taxable gross pay** is gross pay **less deductions made before tax is calculated**. The main ones are employee **pension contributions** under a net pay arrangement, and **payroll giving**. These reduce the figure on which Income Tax is worked out, which is precisely the benefit of making them this way — relief is given immediately rather than reclaimed later.',
            '**Taxable pay** is the amount actually subject to Income Tax. In most payslip questions it is the same figure as taxable gross pay; the reason the specification lists both is that the terms are used slightly differently in different sources, and you should recognise either.',
            '**Net pay** is what reaches the employee\'s bank account: gross pay less **every** deduction, whether it was taken before tax or after.',
          ],
          formula: 'Gross pay − pre-tax deductions = Taxable gross pay · Gross pay − ALL deductions = Net pay',
          examtrap: 'Taxable gross pay is NOT gross pay less all deductions. It is gross pay less only those deductions made BEFORE tax is calculated — pension under a net pay arrangement, payroll giving.',
        },
        {
          h: 'Statutory and non-statutory deductions',
          p: [
            'Deductions divide into two kinds, and the difference is about **who requires them**, not how large they are.',
            '**Statutory deductions** are required by law, and the employer has no discretion. They are **Pay As You Earn (PAYE) Income Tax**, **National Insurance contributions**, **student loan repayments**, and — where the employer has automatically enrolled staff — **pension contributions**. An employee cannot instruct the employer to stop deducting Income Tax; the obligation runs to HMRC, not to the employee.',
            '**Non-statutory deductions** are everything else, and they depend on the employee having agreed to them or on a court order. Trade union subscriptions, payroll giving to charity, season ticket loan repayments, workplace savings schemes, and repayments of a salary advance all sit here. So do **attachment of earnings orders**, which are imposed by a court rather than chosen — the point being that they are not part of the tax system.',
            'Two consequences follow. The **order** matters: pre-tax deductions come off before Income Tax is calculated, and everything else comes off afterwards, so putting a deduction in the wrong place changes the tax. And the **amount due to HMRC** includes only the statutory tax and National Insurance items — a union subscription deducted from wages is owed to the union, not to HMRC, and never appears in the payment to them.',
          ],
          split: {
            left: { title: 'Statutory — required by law', items: ['PAYE Income Tax', 'National Insurance contributions', 'Student loan repayments', 'Auto-enrolment pension contributions'] },
            right: { title: 'Non-statutory — agreed or ordered', items: ['Trade union subscriptions', 'Payroll giving to charity', 'Season ticket and salary advance repayments', 'Attachment of earnings orders'] },
          },
        },
        {
          h: 'Working through a payslip',
          p: [
            'This is where the specification\'s exclusion matters most. You are **not** asked to calculate Income Tax, National Insurance or student loan repayments — those figures are given to you. What you are asked to do is assemble them correctly: build gross pay, apply the pre-tax deductions to reach taxable gross pay, then take everything off to reach net pay.',
            'That makes these questions much more tractable than they look. The work is in the ordering and in reading which figures have been supplied, not in the tax arithmetic.',
          ],
          worked: {
            title: 'From hours worked to money in the bank',
            problem: 'Priya works 160 basic hours at £14.50 an hour and 12 overtime hours at time and a half. She receives a bonus of £300. She contributes 5% of gross pay to a pension under a net pay arrangement. Her Income Tax for the month is £742, employee National Insurance £398, and a student loan repayment of £61 applies. She also pays £12 a month in union subscriptions. Calculate her gross pay, taxable gross pay and net pay.',
            steps: [
              { do: 'Build gross pay.', why: 'Basic: 160 × £14.50 = £2,320. Overtime: 12 × £14.50 × 1.5 = £261. Plus the £300 bonus. Gross pay = £2,320 + £261 + £300 = £2,881.' },
              { do: 'Find the pre-tax deduction.', why: 'The pension is 5% of gross pay under a NET PAY arrangement, which means it comes off before tax is calculated: £2,881 × 5% = £144.05.' },
              { do: 'Arrive at taxable gross pay.', why: '£2,881 − £144.05 = £2,736.95. This is the figure Income Tax was calculated on — and the reason the pension contribution gets relief immediately.' },
              { do: 'Total the remaining deductions.', why: 'Income Tax £742, National Insurance £398, student loan £61, union subscription £12. Together £1,213. Note the union subscription is non-statutory but still comes out of net pay.' },
              { do: 'Arrive at net pay.', why: 'Gross pay less ALL deductions: £2,881 − £144.05 − £1,213 = £1,523.95.' },
              { do: 'Check the logic rather than just the total.', why: 'The pension was deducted once, before tax. The other four came off after. Deducting the pension twice, or taking it off after tax, are the two errors these questions are built to catch.' },
            ],
            answer: 'Gross pay £2,881 · taxable gross pay £2,736.95 · net pay £1,523.95',
            tryIt: {
              q: 'An employee has gross pay of £3,200 and contributes 4% of gross to a pension under a net pay arrangement. What is the taxable gross pay, in pounds?',
              answer: 3072,
              unit: '£',
              hint: 'Only the pre-tax deduction comes off to reach taxable gross pay.',
              exp: '£3,200 × 4% = £128 pension contribution. £3,200 − £128 = £3,072 taxable gross pay. Income Tax would then be calculated on £3,072 rather than on the full £3,200.',
            },
          },
        },
        {
          h: 'Reconciling gross to net',
          p: [
            'The other "be able to" requirement here is **reconciliation**: proving that gross pay, the deductions and net pay all agree. It is the same discipline as the VAT reconciliation in lesson 3E, and it is checked the same way — by showing that the parts account for the whole.',
            'The reconciliation is simply the identity **gross pay less total deductions equals net pay**, demonstrated line by line. If it does not balance, something has been omitted, double-counted, or put on the wrong side.',
            'The failure that recurs is **double-counting a pre-tax deduction**. A pension contribution taken off to reach taxable gross pay is easy to subtract a second time when totalling the deductions, and the reconciliation then shows net pay lower than it should be by exactly the pension amount. If a reconciliation is out by a figure that appears on the payslip, that figure has almost certainly been used twice.',
            'The same check works in the other direction. Given net pay and the deductions, gross pay must be recoverable by adding them all back. An assessment may give the figures either way round, and the identity holds regardless of which end you start from.',
          ],
          formula: 'Gross pay − total deductions = Net pay · Net pay + total deductions = Gross pay',
          callout: { kind: 'tip', text: 'If a gross-to-net reconciliation is out by exactly the amount of a figure on the payslip, that figure has been counted twice. Usually it is the pension.' },
        },
      ],
      check: [
        {
          type: 'numeric',
          q: 'An employee has gross pay of £2,600 and pays 5% of gross into a pension under a net pay arrangement. What is the taxable gross pay, in pounds?',
          answer: 2470,
          unit: '£',
          exp: '£2,600 × 5% = £130. £2,600 − £130 = £2,470. Only deductions made before tax is calculated reduce taxable gross pay — Income Tax, National Insurance and student loan repayments do not.',
        },
        {
          type: 'numeric',
          q: 'An employee has gross pay of £2,400. Deductions are: pension £120 (pre-tax), Income Tax £310, National Insurance £180, union subscription £9. What is the net pay, in pounds?',
          answer: 1781,
          unit: '£',
          exp: '£2,400 − £120 − £310 − £180 − £9 = £1,781. Net pay is gross less EVERY deduction, whether taken before or after tax. The pension comes off once, not twice — deducting it again is the classic error.',
        },
        {
          type: 'mcq',
          q: 'Which of these is a non-statutory deduction?',
          opts: [
            'Trade union subscriptions',
            'Student loan repayments collected through the payroll',
            'Employee National Insurance contributions',
            'PAYE Income Tax',
          ],
          ans: 0,
          exp: 'Union subscriptions are deducted only because the employee has agreed to it. PAYE, National Insurance and student loan repayments are all required by law, which is what makes them statutory — and only the statutory tax and NI items form part of the amount owed to HMRC.',
        },
        {
          type: 'truefalse',
          q: 'Decide whether each statement about pay and deductions is true or false.',
          statements: [
            { text: 'Taxable gross pay is gross pay less deductions made before tax is calculated.', answer: true },
            { text: 'Net pay is gross pay less all deductions.', answer: true },
            { text: 'A student loan repayment reduces taxable gross pay.', answer: false },
            { text: 'An attachment of earnings order is a statutory deduction.', answer: false },
          ],
          exp: 'Taxable gross pay reflects only pre-tax deductions such as a net pay arrangement pension. Net pay reflects all of them. A student loan repayment is taken after tax and does not reduce the taxable figure. And an attachment of earnings order is imposed by a court, not by tax law, so it sits outside the statutory deductions.',
        },
      ],
    },

    /* ── 4.1 continued ──────────────────────────────────────────────────── */
    {
      id: 'L3-TPFB-4D',
      title: 'What the employer owes HMRC',
      icon: '🧾',
      criteria: ['TPFB-4.1.11', 'TPFB-4.1.12'],
      cards: [
        {
          h: 'The payment is more than the deductions',
          p: [
            'Having built a payslip, the last calculation is what the **employer** must send HMRC. This is the figure students most often get wrong, and the reason is a single conceptual point.',
            'The amount due is not merely what was deducted from employees. It is **everything deducted from employees, plus the employer\'s own National Insurance contribution**. Employer\'s NI is a genuine cost of employment borne by the business — it is not withheld from anybody\'s wage, it does not appear as a deduction on the payslip, and the employee never sees it. But it is paid over to HMRC in the same payment.',
            'So the total has four components in a typical case: **PAYE Income Tax** deducted from employees, **employee National Insurance** deducted from employees, **employer National Insurance** paid by the business, and **student loan repayments** deducted from employees.',
            'And it excludes several things that were on the payslip. **Pension contributions** go to the pension provider, not HMRC. **Union subscriptions** go to the union. **Attachment of earnings** goes wherever the court directed. A deduction being made through the payroll does not make it money owed to HMRC — the question is always who the money belongs to.',
          ],
          formula: 'Due to HMRC = PAYE + employee NI + employer NI + student loan repayments',
          examtrap: 'Employer\'s National Insurance is included in the payment to HMRC but never appears as a deduction on a payslip. Pension contributions appear on the payslip but are NOT paid to HMRC.',
        },
        {
          h: 'Working out the monthly payment',
          p: [
            'Questions here typically give a list of figures, some of which belong in the payment and some of which do not. The work is in classification rather than arithmetic — decide who each amount belongs to before adding anything.',
          ],
          worked: {
            title: 'The amount due to HMRC for the month',
            problem: 'For the month, Kelso Ltd\'s payroll shows: gross pay £48,000; PAYE Income Tax £7,900; employee National Insurance £3,850; employer National Insurance £5,120; student loan repayments £340; employee pension contributions £2,400; employer pension contributions £1,440; union subscriptions £85. How much is due to HMRC?',
            steps: [
              { do: 'Include the PAYE.', why: '£7,900 of Income Tax was deducted from employees and belongs to HMRC.' },
              { do: 'Include the employee National Insurance.', why: '£3,850 deducted from employees, also owed to HMRC.' },
              { do: 'Include the employer National Insurance.', why: '£5,120. This was never deducted from anyone — it is the employer\'s own liability — but it goes to HMRC in the same payment. Omitting it is the single most common error in this calculation.' },
              { do: 'Include the student loan repayments.', why: '£340 deducted from employees. Student loan repayments are collected through PAYE and passed to HMRC.' },
              { do: 'Exclude the pension contributions.', why: 'Both the £2,400 from employees and the £1,440 from the employer go to the PENSION PROVIDER. Neither is owed to HMRC, however they appear on the payslip.' },
              { do: 'Exclude the union subscriptions.', why: 'The £85 belongs to the union. It is a non-statutory deduction and has nothing to do with the tax system.' },
              { do: 'Total the four HMRC items.', why: '£7,900 + £3,850 + £5,120 + £340 = £17,210 due to HMRC.' },
            ],
            answer: '£17,210 due to HMRC',
            tryIt: {
              q: 'A payroll shows PAYE of £4,200, employee NI of £1,900, employer NI of £2,300 and employee pension contributions of £1,100. How much is due to HMRC, in pounds?',
              answer: 8400,
              unit: '£',
              hint: 'Three of these four go to HMRC. Decide who the pension money belongs to.',
              exp: '£4,200 + £1,900 + £2,300 = £8,400. The £1,100 of pension contributions goes to the pension provider, not HMRC, so it is excluded — while the employer\'s NI is included even though no employee was ever charged it.',
            },
          },
        },
        {
          h: 'Reconciling the payroll',
          p: [
            'The final "be able to" of this topic is reconciliation, and it works at two levels which are worth keeping distinct.',
            'The **individual** reconciliation is the one from the last lesson: for each employee, gross pay less every deduction equals net pay.',
            'The **employer** reconciliation is the one that proves the payroll as a whole: the total cost to the business is the total net pay to employees, plus everything owed to HMRC, plus everything owed to third parties. Nothing may appear twice and nothing may be unaccounted for.',
            'Stated as an identity: **gross pay + employer NI + employer pension = net pay + HMRC + pension provider + other third parties**. The left is what the employment cost; the right is where the money went. An imbalance means something has been misclassified, and the size of the gap usually names the culprit — a gap equal to the employer\'s NI means it has been left out of the payment to HMRC, which is the most frequent error of all.',
            'It is worth noticing that gross pay is not the cost of employing somebody. Employer\'s National Insurance and employer pension contributions are real costs on top of it. An employee on £30,000 costs the business meaningfully more than £30,000, and the payroll reconciliation is where that becomes visible.',
          ],
          formula: 'Gross pay + employer NI + employer pension = Net pay + due to HMRC + pension provider + other third parties',
        },
      ],
      check: [
        {
          type: 'numeric',
          q: 'A payroll shows PAYE £5,600, employee NI £2,400, employer NI £3,100, student loan repayments £220, and employee pension contributions £1,800. How much is due to HMRC, in pounds?',
          answer: 11320,
          unit: '£',
          exp: '£5,600 + £2,400 + £3,100 + £220 = £11,320. Employer\'s NI is included even though it was never deducted from an employee. The £1,800 of pension contributions goes to the pension provider and is excluded.',
        },
        {
          type: 'mcq',
          q: 'Which item appears in the payment to HMRC but never as a deduction on an employee’s payslip?',
          opts: [
            'Employer National Insurance contributions',
            'Employee National Insurance contributions',
            'Student loan repayments collected through PAYE',
            'PAYE Income Tax deducted from wages',
          ],
          ans: 0,
          exp: 'Employer’s NI is the business’s own liability — it is not withheld from anyone’s pay, so it never shows as a payslip deduction, but it is paid over to HMRC with everything else. The other three are all deducted from the employee and appear on the payslip.',
        },
        {
          type: 'truefalse',
          q: 'Decide whether each statement about the amount due to HMRC is true or false.',
          statements: [
            { text: 'Employee pension contributions are paid over to HMRC.', answer: false },
            { text: 'Employer National Insurance forms part of the payment to HMRC.', answer: true },
            { text: 'Gross pay understates the true cost of employing someone.', answer: true },
            { text: 'Union subscriptions deducted from wages are owed to HMRC.', answer: false },
          ],
          exp: 'Pension contributions go to the pension provider and union subscriptions to the union — being deducted through the payroll does not make money HMRC\'s. Employer\'s NI does go to HMRC and is a real cost on top of gross pay, which is why gross pay alone understates what an employee costs.',
        },
      ],
    },

    /* ── 4.2 ────────────────────────────────────────────────────────────── */
    {
      id: 'L3-TPFB-4E',
      title: 'The forms, and when they are due',
      icon: '📄',
      criteria: ['TPFB-4.2.1', 'TPFB-4.2.2', 'TPFB-4.2.3'],
      cards: [
        {
          h: 'Six forms, each with a moment',
          p: [
            'Payroll produces a small set of standard forms. Each exists for a particular moment in the employment relationship, and learning them by **when** rather than by name is far more reliable — the assessment usually describes a situation and asks which form applies.',
            'A **starter checklist** is completed when someone joins **without a P45**, collecting what is needed to work out a tax code. A **payslip** is issued **every pay period**, on or before payday, itemising gross pay, deductions and net pay; it is a legal right rather than a courtesy. A **P45** is issued when an employee **leaves**, recording pay and tax to that date so the next employer can operate the right code.',
            'The remaining three are annual. A **P60** is the end-of-year certificate given to everyone still employed on 5 April, summarising the year\'s taxable pay and deductions. A **P11D** reports **expenses and benefits** provided to an employee that were not put through the payroll. A **P11D(b)** is the employer\'s declaration and the **Class 1A National Insurance** due on those benefits.',
            'Note the relationship between the last two, because it is a common confusion. The P11D is per employee and reports the benefits; the P11D(b) is one form for the employer and carries the Class 1A liability. An employer that payrolls all its benefits needs no P11Ds at all — but it still needs a P11D(b).',
          ],
          table: {
            headers: ['Form', 'When', 'Deadline'],
            rows: [
              ['Starter checklist', 'A new employee with no P45', 'Before the first payment'],
              ['Payslip', 'Every pay period', 'On or before payday'],
              ['P45', 'An employee leaves', 'On leaving'],
              ['P60', 'Employed on 5 April', '**31 May**'],
              ['P11D', 'Benefits not payrolled', '**6 July**'],
              ['P11D(b)', 'Class 1A NIC declaration', '**6 July**; pay by **22 July**'],
            ],
          },
        },
        {
          h: 'The dates worth memorising',
          p: [
            'Three annual dates carry most of the marks in this topic, and they cluster in a way that makes them easier to hold together than separately.',
            'The tax year ends **5 April**. **31 May** is the P60 deadline — employees get their end-of-year certificate about eight weeks later. **6 July** is the P11D and P11D(b) deadline, and it is also the date by which the employee must receive their copy of the P11D. **22 July** is when the Class 1A National Insurance on those benefits must reach HMRC electronically, or **19 July** if paying by cheque.',
            'That last pair should look familiar. The **22nd electronic, 19th non-electronic** split is the same one that applies to ordinary monthly PAYE payments, covered in the next lesson. It is a general rule about how HMRC treats payment methods rather than something specific to Class 1A, which makes it one fact rather than two.',
            'A useful way to hold the sequence: the year ends in April, employees are told where they stand by the end of May, benefits are reported in early July, and the tax on those benefits is paid a fortnight later.',
          ],
          flow: ['5 April — tax year ends', '31 May — P60 to employees', '6 July — P11D and P11D(b)', '22 July — Class 1A NIC paid'],
          examtrap: 'The P11D deadline is 6 July for BOTH filing with HMRC and giving the employee their copy. The Class 1A payment is a separate, later date — 22 July electronically.',
        },
        {
          h: 'P11D or payrolling — two ways to handle benefits',
          p: [
            'The specification asks specifically for the difference between **reporting benefits on a P11D** and **payrolling** them, and the distinction is about **when the employee pays the tax**.',
            'Under the **P11D route**, benefits are reported after the tax year ends. HMRC then collects the tax by adjusting the employee\'s tax code, typically in a later year. The employee pays eventually, but by an indirect route and on a delay, and the tax code change often arrives without explanation — which is why it generates so many queries.',
            'Under **payrolling**, the taxable value of the benefit is put through the payroll and taxed **in real time**, spread across the year alongside ordinary pay. No P11D is needed for a payrolled benefit. The employee pays the right tax as they go, sees it on the payslip, and avoids the tax code adjustment altogether.',
            'Two qualifications matter. The employer must **register with HMRC before the start of the tax year** in which it wants to payroll benefits — this cannot be decided retrospectively. And a **P11D(b) is still required** either way, because the employer\'s Class 1A National Insurance on the benefits is due regardless of how the employee\'s Income Tax was collected.',
            'Payrolling is the direction of travel, and for good reason: it is simpler for the employee, more transparent, and removes a whole class of tax code confusion. But it requires a decision in advance, which is exactly the sort of detail an assessment likes to test.',
          ],
          split: {
            left: { title: 'P11D route', items: ['Reported after the tax year ends', 'Tax collected via a tax code adjustment', 'The employee pays late and indirectly', 'A P11D per employee, by 6 July'] },
            right: { title: 'Payrolling', items: ['Taxed in real time through the payroll', 'Spread across the year with ordinary pay', 'Visible on the payslip, no code change', 'No P11D — but **register in advance**'] },
          },
        },
      ],
      check: [
        {
          type: 'mcq',
          q: 'By what date must an employer give a P60 to employees?',
          opts: [
            '31 May following the end of the tax year',
            '6 July following the end of the tax year',
            '5 April, being the last day of the tax year itself',
            '22 July, alongside the Class 1A National Insurance payment',
          ],
          ans: 0,
          exp: 'The P60 deadline is 31 May, about eight weeks after the tax year ends on 5 April. 6 July is the P11D and P11D(b) deadline, and 22 July is when the Class 1A National Insurance must be paid electronically.',
        },
        {
          type: 'mcq',
          q: 'An employer payrolls all of its benefits. What must it still submit?',
          opts: [
            'A P11D(b), because the Class 1A National Insurance is still due',
            'Nothing further, because payrolling replaces all benefit reporting',
            'A P11D for each employee, in addition to the payrolled amounts',
            'A starter checklist for every employee receiving a benefit',
          ],
          ans: 0,
          exp: 'Payrolling removes the need for P11Ds, because the employee’s Income Tax has already been collected in real time. But the employer’s Class 1A National Insurance on those benefits is still due, and the P11D(b) is the form that declares it.',
        },
        {
          type: 'truefalse',
          q: 'Decide whether each statement about payroll forms is true or false.',
          statements: [
            { text: 'A payslip must be given on or before payday.', answer: true },
            { text: 'A starter checklist is used when a new employee has no P45.', answer: true },
            { text: 'An employer can decide to payroll benefits part-way through a tax year.', answer: false },
            { text: 'A P45 is issued at the end of every tax year.', answer: false },
          ],
          exp: 'The payslip is a legal right, due on or before payday. The starter checklist substitutes for a missing P45. Payrolling must be registered for BEFORE the tax year starts. And a P45 is issued when an employee leaves — it is the P60 that comes at the year end.',
        },
        {
          type: 'gapfill',
          q: 'Complete the three annual payroll deadlines.',
          template: 'The P60 is due by {0}, the P11D and P11D(b) by {1}, and the Class 1A National Insurance must reach HMRC electronically by {2}.',
          gaps: [
            { options: ['31 May', '6 July', '5 April'], answer: 0 },
            { options: ['6 July', '31 May', '22 July'], answer: 0 },
            { options: ['22 July', '19 July', '6 July'], answer: 0 },
          ],
          exp: 'The tax year ends 5 April; employees get their P60 by 31 May; benefits are reported by 6 July; and the Class 1A NIC is paid by 22 July electronically, or 19 July by cheque.',
        },
      ],
    },

    /* ── 4.2 continued ──────────────────────────────────────────────────── */
    {
      id: 'L3-TPFB-4F',
      title: 'RTI, deadlines and what late costs',
      icon: '⏱️',
      criteria: ['TPFB-4.2.4', 'TPFB-4.2.5', 'TPFB-4.2.6', 'TPFB-4.2.7', 'TPFB-4.2.8'],
      cards: [
        {
          h: 'Real Time Information',
          p: [
            'Payroll is reported to HMRC under **Real Time Information**, and the name describes the change it made. Before RTI, an employer deducted tax all year and told HMRC what had happened once, after the year ended. Under RTI a submission is made **every time employees are paid**.',
            'The consequence is that HMRC knows what each employee has earned within days rather than months. That is what makes real-time adjustment of tax codes possible, and it is what allows Universal Credit to respond to earnings as they change. It also means an employer\'s errors are visible almost immediately rather than at the year end.',
            'Two submissions do the work, and understanding what each is **for** makes the details follow.',
            'The **Full Payment Submission (FPS)** reports **what was paid**: for every employee paid in the period, their gross pay, Income Tax, National Insurance, student loan and pension deductions, together with starters, leavers and changes of detail. It must be sent **on or before the date the employees are paid** — not afterwards, and not at the month end. This holds even for an employer paying HMRC quarterly, because the reporting cycle and the payment cycle are separate things.',
            'The **Employer Payment Summary (EPS)** reports **why less is owed** than the FPS implies: statutory pay recovered, the Employment Allowance, CIS deductions suffered — and a declaration that no employees were paid at all in a month. It is due by the **19th of the following tax month**, and is only sent when there is something to report.',
          ],
          table: {
            headers: ['', 'FPS', 'EPS'],
            rows: [
              ['Reports', 'What was paid to employees', 'Why less is owed to HMRC'],
              ['Contains', 'Pay, deductions, starters, leavers, changes', 'Statutory pay recovered, Employment Allowance, CIS suffered, nil payment months'],
              ['Deadline', '**On or before payday**', '**19th of the following tax month**'],
              ['Frequency', 'Every time employees are paid', 'Only when there is something to report'],
            ],
          },
        },
        {
          h: 'Paying HMRC',
          p: [
            'Reporting and paying are separate obligations with separate deadlines, exactly as they were for VAT — except that in VAT the two shared a date, and here they do not.',
            'The payment deadline is the **' + T.payroll.paymentToHmrc.electronicDeadline.value + 'nd of the following month** if paying electronically, or the **' + T.payroll.paymentToHmrc.nonElectronicDeadline.value + 'th** if paying by post. This is the same electronic/non-electronic split seen on the Class 1A deadline in the last lesson, and it reflects the same underlying principle from lesson 1D: what matters is when **cleared funds reach HMRC**, so a slower method needs a longer run-up.',
            'A smaller employer may pay **quarterly** rather than monthly, where the average monthly liability is under **£' + T.payroll.paymentToHmrc.quarterlyThreshold.value.toLocaleString('en-GB') + '**. The reporting obligation is unaffected: the FPS is still due on or before every payday, twelve times a year for a monthly payroll, even though only four payments are made. Assuming quarterly payment implies quarterly reporting is a trap the assessment sets deliberately.',
            'The pattern to carry away is that **the FPS is tied to the payday, and the payment is tied to the month end**. They move independently, and an employer can be perfectly compliant on one and late on the other.',
          ],
          flow: ['Employees paid', 'FPS on or before that day', 'EPS by the 19th, if needed', 'Pay HMRC by the 22nd'],
          examtrap: 'Quarterly PAYMENT does not mean quarterly REPORTING. An employer paying HMRC quarterly still files an FPS on or before every single payday.',
        },
        {
          h: 'Late filing',
          p: [
            'A late FPS is penalised on a **monthly** basis, and the penalty is scaled by **headcount** rather than by the tax at stake — a design that differs from every other penalty in this unit.',
            'The amounts are **£' + T.payroll.penalties.lateFiling.byEmployees['1to9'] + '** for 1 to 9 employees, **£' + T.payroll.penalties.lateFiling.byEmployees['10to49'] + '** for 10 to 49, **£' + T.payroll.penalties.lateFiling.byEmployees['50to249'] + '** for 50 to 249, and **£' + T.payroll.penalties.lateFiling.byEmployees['250plus'] + '** for 250 or more. They are charged for each month or part month the return is late.',
            'The **first failure in a tax year is not penalised** — a genuine allowance for the occasional slip, in the same spirit as the points threshold for VAT returns, though the mechanism is quite different. Annual schemes are excepted from that relief.',
            'A return still outstanding after **three months** attracts a further penalty of **5% of the tax** that should have been reported on it. At that point the penalty stops being a flat administrative charge and starts scaling with the money involved.',
          ],
          table: {
            headers: ['Employees', 'Penalty per month'],
            rows: [
              ['1 to 9', '£' + T.payroll.penalties.lateFiling.byEmployees['1to9']],
              ['10 to 49', '£' + T.payroll.penalties.lateFiling.byEmployees['10to49']],
              ['50 to 249', '£' + T.payroll.penalties.lateFiling.byEmployees['50to249']],
              ['250 or more', '£' + T.payroll.penalties.lateFiling.byEmployees['250plus']],
              ['Outstanding after 3 months', '**A further 5% of the tax due**'],
            ],
          },
        },
        {
          h: 'Late payment',
          p: [
            'Late **payment** is penalised as a **percentage of the amount paid late**, and the percentage escalates with the number of times it has happened in the tax year. This is a different mechanism again from the VAT regime in lesson 1G, where the escalation was by elapsed time rather than by repetition.',
            'The **first failure to pay on time in a tax year does not count as a default**. After that: **' + T.payroll.penalties.latePayment.byDefaults['1to3'] + '%** for 1 to 3 defaults, **' + T.payroll.penalties.latePayment.byDefaults['4to6'] + '%** for 4 to 6, **' + T.payroll.penalties.latePayment.byDefaults['7to9'] + '%** for 7 to 9, and **' + T.payroll.penalties.latePayment.byDefaults['10plus'] + '%** for 10 or more. An employer that is habitually a few days late therefore pays progressively more for the same behaviour.',
            'Two further penalties catch prolonged non-payment, and both apply even where only one payment in the year was late. An amount still unpaid after **6 months** attracts an additional **5%**, and after **12 months** a further **5%**.',
            '**Daily interest** runs on everything unpaid from the due date until payment, separately from all of the above. As with VAT, interest is not a penalty and is not discretionary — it is the price of holding money that was due.',
            'It is worth putting this beside the VAT regime rather than learning it in isolation, because the two are examined in one paper and the mechanisms are genuinely different. VAT late payment escalates with **how long** the money is outstanding. PAYE late payment escalates with **how often** the employer has been late. Getting the two the wrong way round is the mistake this pairing is designed to catch.',
          ],
          split: {
            left: { title: 'VAT late payment', items: ['Escalates with **elapsed time**', '3% at day 15, a further 3% at day 30', 'Then 10% a year accruing daily', 'Nothing at all within 15 days'] },
            right: { title: 'PAYE late payment', items: ['Escalates with **number of defaults**', '1% → 2% → 3% → 4% across the year', 'Extra 5% at 6 months, 5% more at 12', 'First failure in the year is free'] },
          },
        },
      ],
      check: [
        {
          type: 'mcq',
          q: 'When must a Full Payment Submission be sent to HMRC?',
          opts: [
            'On or before the date the employees are paid',
            'By the 19th of the following tax month, alongside any EPS',
            'By the 22nd of the following month, with the payment',
            'Quarterly, where the employer pays HMRC quarterly',
          ],
          ans: 0,
          exp: 'The FPS is tied to the payday itself, not to the month end. It is due on or before the date employees are paid, and that holds even for an employer that pays HMRC quarterly — the reporting cycle and the payment cycle are independent.',
        },
        {
          type: 'mcq',
          q: 'An employer with 30 employees files its FPS one month late. It has already been late once earlier in the same tax year. What penalty applies?',
          opts: [
            '£' + T.payroll.penalties.lateFiling.byEmployees['10to49'] + ', being the monthly penalty for 10 to 49 employees',
            'Nothing, because the first failure in a tax year is not penalised',
            '£100, the penalty being fixed regardless of the number of employees',
            '5% of the tax due on the missing return',
          ],
          ans: 0,
          exp: 'The late filing penalty is scaled by headcount, and 30 employees falls in the 10 to 49 band at £' + T.payroll.penalties.lateFiling.byEmployees['10to49'] + ' a month. The first-failure relief was used up by the earlier lateness, so this one is charged. The 5% charge only applies once a return is more than three months outstanding.',
        },
        {
          type: 'truefalse',
          q: 'Decide whether each statement about RTI and deadlines is true or false.',
          statements: [
            { text: 'An EPS reports amounts that reduce what the employer owes HMRC.', answer: true },
            { text: 'An employer paying HMRC quarterly may also file its FPS quarterly.', answer: false },
            { text: 'PAYE paid electronically is due by the 22nd of the following month.', answer: true },
            { text: 'The first failure to pay PAYE on time in a tax year counts as a default.', answer: false },
          ],
          exp: 'The EPS reports statutory pay recovered, the Employment Allowance and similar reductions. Quarterly payment never implies quarterly reporting — the FPS follows every payday. The 22nd is the electronic payment deadline, the 19th non-electronic. And the first failure in a year does not count as a default, so it carries no percentage penalty.',
        },
        {
          type: 'mcq',
          q: 'How does the PAYE late payment penalty differ from the VAT late payment penalty?',
          opts: [
            'PAYE escalates with the number of defaults in the year; VAT escalates with how long the money is outstanding',
            'PAYE escalates with elapsed time; VAT escalates with the number of separate defaults',
            'Both escalate identically, being charged under the same statutory regime',
            'PAYE carries no percentage penalty at all, only daily interest on the amount unpaid',
          ],
          ans: 0,
          exp: 'The two mechanisms are genuinely different and are examined in the same paper. PAYE runs 1% to 4% according to how many times the employer has been late in the tax year. VAT charges 3% at day 15, a further 3% at day 30, then 10% a year from day 31 — driven entirely by elapsed time.',
        },
      ],
    },
  ];

  /* One entry per learning outcome. The orientation lessons open Outcome 1
     because they are the opening of the unit, not of any one outcome. */
  var PATH = [
    {
      unit: 'tpfb',
      level: 3,
      title: 'Tax Processes for Businesses',
      outcome: 1,
      outcomeTitle: 'Understand legislation requirements relating to VAT',
      weighting: 25,
      lessons: ORIENTATION.concat(LESSONS_LO1),
    },
    {
      unit: 'tpfb',
      level: 3,
      title: 'Tax Processes for Businesses',
      outcome: 2,
      outcomeTitle: 'Calculate VAT',
      weighting: 30,
      lessons: LESSONS_LO2,
    },
    {
      unit: 'tpfb',
      level: 3,
      title: 'Tax Processes for Businesses',
      outcome: 3,
      outcomeTitle: 'Review and verify VAT returns',
      weighting: 20,
      lessons: LESSONS_LO3,
    },
    {
      unit: 'tpfb',
      level: 3,
      title: 'Tax Processes for Businesses',
      outcome: 4,
      outcomeTitle: 'Understand principles of payroll',
      weighting: 15,
      lessons: LESSONS_LO4,
    },
  ];

  if (typeof module === 'object' && module.exports) module.exports = { AAT3_LEARN_PATH: PATH };
  else root.AAT3_LEARN_PATH = PATH;
}(typeof self !== 'undefined' ? self : this));
