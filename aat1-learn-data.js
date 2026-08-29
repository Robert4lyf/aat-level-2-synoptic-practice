/* AAT Level 1 — learning content for Bookkeeping Fundamentals.
 *
 * All five learning outcomes of the AAT Level 1 Award in Bookkeeping
 * (QN 610/0818/7). Every lesson declares the scope items it covers in
 * `criteria`, checked by scripts/check-aat1-coverage.js against
 * aat1-syllabus.js, so a lesson cannot claim coverage that does not exist and a
 * shipped outcome cannot leave a scope item untaught.
 *
 * WHO THIS IS WRITTEN FOR
 *
 * Somebody who has never seen an invoice, a daybook or a ledger, and who may
 * well be meeting the word "asset" as a piece of technical vocabulary for the
 * first time. That governs three decisions throughout.
 *
 * First, nothing is assumed. Where Level 3's material can say "you already know
 * output tax from Level 2", this cannot lean on anything.
 *
 * Second, vocabulary is taught explicitly rather than absorbed. Terms are
 * marked with `backticks` at first use, which the player renders as a
 * highlighted term, and gathered into `terms` blocks. The specification's own
 * delivery guidance asks for exactly this: "students can be encouraged to
 * develop a list of key terms, writing definitions in their own words".
 *
 * Third, exclusions are stated out loud, using the `notyet` element. Almost
 * every one of this unit's exclusions is the Level 2 treatment of a topic it
 * introduces — debits and credits, ledger accounts, VAT from a gross figure,
 * bank reconciliation. A beginner who has read around the subject needs telling
 * that those are deliberately absent, or they will assume the material is thin.
 *
 * The standard VAT rate comes from aat1-syllabus.js (FACTS) rather than being
 * typed into prose, so a rate change is one edit and the quality checker can
 * enforce it.
 *
 * WHAT THIS IS NOT
 *
 * It is not checked by a qualified accountant, and syllabus coverage is not the
 * same thing as exam readiness. Lesson 0A says so to the reader directly rather
 * than burying it here.
 */
(function (root) {
  'use strict';

  var F = (typeof require === 'function' && typeof module === 'object')
    ? require('./aat1-syllabus.js').FACTS
    : root.AAT1_FACTS;

  var VAT = F.vat.standardRate.label;   // '20%'

  /* ── Outcome 1 — Understand the role of the bookkeeper (17%) ─────────────── */
  var O1 = [
    {
      /* Orientation. `criteria: []` is honest — this covers no scope item. It
         exists because the material previously would have opened on the duties
         of a bookkeeper with no account of what bookkeeping is for, which is a
         strange place to start for a reader who has never seen any of it. */
      id: 'L1-BKFN-0A',
      title: 'Where this unit fits',
      summary: 'What bookkeeping is for, how the assessment works, and what this material does and does not promise.',
      kind: 'theory',
      criteria: [],
      cards: [
        {
          h: 'What bookkeeping actually is',
          p: [
            'A business does things all day that involve money. It sells something. It buys stock. It pays the electricity bill. Somebody puts fuel in the van. `Bookkeeping` is the work of writing all of that down in an organised way, so that at any point somebody can answer questions about it.',
            'Nobody can hold a year of a business in their head. Without records, the owner of a small shop cannot tell you whether the shop made money last month, which customers still owe them, whether that invoice from the wholesaler has already been paid, or how much of the money in the bank is really theirs rather than tax they are holding for somebody else. Every one of those questions has a definite answer, and the records are the only place it exists.',
            'Filing is part of the job, but only the part that keeps the paper findable. The records themselves are what the accounts sent to Companies House are built from, what the tax return is built from, and what an owner uses to decide whether they can afford to hire somebody. If the bookkeeping is wrong, each of those is wrong too, and nobody further down the chain has any way of knowing.',
            'This unit teaches the first layer of that work. It is deliberately narrow — one business, straightforward transactions, no complications — so that the shape of the work is familiar before the volume arrives.',
          ],
          callout: { kind: 'key', text: 'Bookkeeping is the record from which every financial answer about a business is taken. That is why accuracy is treated so seriously throughout this unit.' },
        },
        {
          h: 'How the assessment works',
          table: {
            headers: ['', ''],
            rows: [
              ['Qualification', 'AAT Level 1 Award in Bookkeeping (610/0818/7)'],
              ['Unit', 'Bookkeeping Fundamentals — the only unit'],
              ['Assessment', 'One computer based assessment, computer marked'],
              ['Length', '1 hour 30 minutes'],
              ['Grading', '**Ungraded** — you pass or you do not'],
              ['Guided learning hours', '75'],
              ['Total qualification time', '110 hours'],
            ],
          },
          p: [
            'One assessment, ninety minutes, marked by computer. That last detail should change how you revise. There is no written answer for an examiner to weigh up and no credit for a well-argued wrong figure: an answer is either the one the marking scheme holds or it is not.',
            'The upside is that this unit is unusually **learnable**. There is a finite set of documents, a finite set of rules about which column a figure belongs in, and a finite vocabulary. Learn those and you have most of the marks. Very little rests on judgement of the kind that takes years to acquire.',
            'The downside is the same fact from the other side. A figure that is nearly right is wrong. Putting a receipt in the payments column is wrong even if the amount is perfect. Reading £1,240 as £1,420 is wrong. Most marks lost at this level are lost to carelessness rather than to ignorance, which is why a whole topic area of the syllabus — and two lessons here — is about how to work so that does not happen.',
            'The qualification is **not graded**, so there is no distinction to chase. AAT publishes no pass percentage for it; the 70% you will see quoted on training-provider websites is their figure, not AAT’s. Treat the target as "know the material", not "clear a number".',
          ],
        },
        {
          h: 'The five outcomes, and where the marks are',
          table: {
            headers: ['Outcome', 'Weight', 'What it asks of you'],
            rows: [
              ['1. The role of the bookkeeper', '17%', 'Duties, why accuracy and timeliness matter, ethics, money laundering'],
              ['2. Understand financial transactions', '10%', 'Classify items; see that every transaction moves at least two of them'],
              ['3. Customer and supplier transactions', '29%', 'The documents; prepare a sales invoice; check a purchase invoice; daybooks'],
              ['4. Process receipts and payments', '**34%**', 'The cash book, closing cash, the bank statement, who owes what'],
              ['5. Accounting software', '10%', 'What software does well, the types of it, and the risks'],
            ],
          },
          p: [
            'The weightings are published, and they are lopsided enough to be worth planning around. Outcomes 3 and 4 together are 63% of the assessment, and both are practical: entering figures in the right place, spotting an error on a document, working out a closing balance. That is where revision time belongs.',
            'Outcome 1 is 17% and is entirely written — duties, consequences, the ethical principles, money laundering. It is the easiest part to under-prepare because it feels like common sense, and the easiest to lose marks on for the same reason: the assessment wants the specific consequence or the named principle, not a general sense that carelessness is bad.',
            'Outcomes 2 and 5 are 10% each. Outcome 2 is small but load-bearing — it is the idea underneath double-entry bookkeeping, which is where Level 2 begins. Outcome 5 is about software, and it is genuinely modern content: bank feeds, cloud versus desktop, phishing.',
            'Take them in order. The documents in Outcome 3 are the source of the figures in Outcome 4, and Outcome 5 makes little sense until you have done the manual version of the work it automates.',
          ],
          flow: ['Role and ethics', 'Transactions', 'Documents', 'Cash and bank', 'Software'],
        },
        {
          h: 'Two habits worth forming now',
          p: [
            'Nearly all of this unit rewards two habits, and they are worth adopting from the first lesson rather than the last.',
            'The first is **reading the label before the number**. Every practical task in this unit is really the same question in different clothes: does this figure belong on the receipts side or the payments side, in the sales daybook or the sales returns daybook, in the net column or the total column? Read what the column is called and what the document is before touching the arithmetic. Almost every wrong answer at this level is a right number in the wrong place.',
            'The second is **checking against expectation**. When you total a column, glance at whether the answer is roughly the size it should be. When a closing balance comes out negative, ask whether that is possible for cash in a till. This is a named part of the syllabus — 1.2.3 asks you to "check that totals agree to expectation" — and it is the single cheapest way to catch a slip.',
            'Neither habit is clever. Both are the difference between somebody who has read the material and somebody who can do the work.',
          ],
          callout: { kind: 'tip', text: 'Label first, number second. Then ask whether the answer is the right size. Those two habits cover most of the marks available in Outcomes 3 and 4.' },
        },
        {
          h: 'What this material is, and what it is not',
          p: [
            'This is a textbook and a question bank, written independently. It is not affiliated with AAT, endorsed by AAT, or approved by anybody. It follows the published qualification specification closely — every lesson names the scope items it covers, and a build check fails if a lesson claims something the specification does not contain — but following a specification is not the same as being a good preparation for sitting an assessment.',
            'Two honest limitations. Nothing here has been reviewed by a qualified accountant or an AAT tutor. And covering a syllabus is not the same as exam readiness, which also needs timed practice against AAT’s own question formats. AAT publishes practice assessments to registered students through MyAAT, and they are the right thing to sit before the real one. Use this to learn the material; use those to find out whether you can do it under a clock.',
            'What this material does offer is depth. Each step teaches the idea properly rather than listing bullet points to memorise, and every question explains why the right answer is right. That is the part a bullet-point summary cannot do.',
          ],
          notyet: 'Several things you may have read about are deliberately absent, because the specification puts them out of scope at this level: debits and credits, ledger accounts, calculating VAT backwards from a gross figure, and bank reconciliation statements. All four arrive at Level 2. Their absence here is the syllabus, not an omission.',
        },
      ],
      check: [
        {
          q: 'Which best describes what the bookkeeping records of a business are for?',
          opts: [
            'They are the record from which financial questions are answered',
            'They are a legal filing requirement with no use in day-to-day business',
            'They are a summary written once a year for the tax return',
            'They are the owner’s personal notes about how trade is going',
          ],
          ans: 0,
          exp: 'The records are the only place the answers exist — who owes what, whether a bill was paid, whether the month made money. The tax return and the annual accounts are built from them, so they are a consequence of good bookkeeping rather than its purpose.',
        },
        {
          q: 'Which two outcomes carry the largest share of the assessment between them?',
          opts: [
            'Outcome 3 (customer and supplier transactions) and Outcome 4 (receipts and payments)',
            'Outcome 1 (the role of the bookkeeper) and Outcome 2 (understand financial transactions)',
            'Outcome 2 (financial transactions) and Outcome 5 (accounting software)',
            'Outcome 1 (the role of the bookkeeper) and Outcome 5 (accounting software)',
          ],
          ans: 0,
          exp: 'Outcome 3 is 29% and Outcome 4 is 34%, so together they are 63% of the assessment — and both are practical rather than written. Outcome 1 is 17%, and Outcomes 2 and 5 are 10% each.',
        },
        {
          q: 'The Level 1 Award in Bookkeeping is graded pass, merit or distinction depending on the percentage scored.',
          type: 'truefalse',
          statements: [
            { text: 'The qualification is ungraded — you either pass or you do not.', answer: true },
            { text: 'The assessment is marked by computer rather than by an examiner.', answer: true },
            { text: 'AAT publishes an official pass percentage for this qualification.', answer: false },
            { text: 'The assessment lasts two hours.', answer: false },
          ],
          exp: 'The specification states the qualification is not graded and that students must pass one mandatory assessment; it publishes no pass percentage, so the 70% quoted by training providers is not an AAT figure. The assessment is computer based and computer marked, and it lasts 1 hour 30 minutes rather than two hours.',
        },
        {
          q: 'Which of these is out of scope at Level 1?',
          opts: [
            'Recording a transaction using debits and credits',
            'Entering a receipt from a customer into the cash book',
            'Recognising an error on a purchase invoice received',
            'Calculating VAT at the standard rate on a net invoice amount',
          ],
          ans: 0,
          exp: 'Scope item 2.1.3 explicitly excludes making entries in ledger accounts and debits and credits — those belong to Level 2. The other three are all required here: the cash book is Outcome 4, checking purchase invoices is 3.3, and VAT on a net amount is 3.2.3. What is excluded is working VAT backwards from a VAT-inclusive figure.',
        },
      ],
    },

    {
      id: 'L1-BKFN-1A',
      title: 'What a bookkeeper actually does',
      summary: 'The duties of the role, the limits of your own authority, and why the job is defined by who relies on the output.',
      kind: 'theory',
      criteria: ['BKFN-1.1.1'],
      cards: [
        {
          h: 'Seven duties, and the thread running through them',
          p: [
            'The specification sets out what a bookkeeper is responsible for. Read as a list it looks like seven unrelated obligations. Read properly it is one idea repeated: other people are going to act on what you produce, and they cannot check it themselves.',
            'That is the thread. A bookkeeper is not producing work for their own use. The owner deciding whether they can afford to hire someone, the accountant preparing the year-end accounts, HMRC receiving a tax figure, the supplier waiting to be paid — all of them treat your output as fact. None of them is in a position to verify it. Every duty below follows from that.',
          ],
          table: {
            headers: ['Duty', 'What it means in practice'],
            rows: [
              ['Record financial transactions', 'Write down what happened — sales, purchases, receipts, payments — in the right place'],
              ['Check financial transactions', 'Look at what you have recorded and confirm it against the paperwork'],
              ['Prepare financial documentation', 'Produce documents such as sales invoices and credit notes'],
              ['Check financial documentation', 'Examine documents received, such as purchase invoices, for errors before they are acted on'],
              ['Prepare information that is timely and accurate', 'Right, and in time to be useful — both are required'],
              ['Prepare information used in decisions', 'Managers and owners make choices from your figures'],
              ['Follow ethical principles', 'Behave to a professional standard, covered in detail later in this outcome'],
            ],
          },
          p: [
            'Notice that recording and checking appear separately, and that documentation is both prepared and checked. That is not padding. Producing an entry and verifying it are different pieces of work, and a great deal of Outcome 3 is checking rather than creating.',
          ],
          terms: [
            { t: 'Transaction', d: 'A single piece of business involving money — one sale, one purchase, one payment. The unit of everything you record.' },
            { t: 'Financial documentation', d: 'The paperwork that evidences transactions: invoices, credit notes, orders, delivery notes, receipts.' },
          ],
        },
        {
          h: 'Referring upwards is part of the job, not a failure of it',
          p: [
            'Two of the seven duties are easy to misread as weaknesses. A bookkeeper **must refer to a supervisor or seek authorisation where appropriate**, and a bookkeeper **has money laundering obligations**. Both are limits on acting alone, and beginners tend to read them as an admission of not being trusted.',
            'They are the opposite. In finance, knowing the boundary of your own authority is a professional skill, and the people who cause the most damage are rarely those who ask — they are those who guess and carry on. If an invoice arrives for goods nobody in the business seems to have ordered, the right action is not to decide for yourself whether it is genuine. It is to escalate it to somebody whose job includes making that decision.',
            'The same applies to your own competence. Later in this outcome you will meet the principle of `professional competence and due care`, which requires you not to take on work beyond your ability. Referring a task upwards is how that principle is actually honoured. It costs a conversation; the alternative costs a wrong payment, a wrong tax figure, or a decision made on a false number.',
            'Money laundering obligations work the same way and are important enough to have their own lesson at the end of this outcome. The short version: bookkeeping is an accountancy service, suspicions must be reported, and failing to report one is itself a criminal offence.',
          ],
          callout: { kind: 'tip', text: 'A question that describes something unusual and asks what you should do almost always has "check with your supervisor" as the right answer. Acting alone on an uncertainty is the wrong instinct at this level and every level above it.' },
        },
        {
          h: 'Who relies on your work',
          split: {
            left: { title: 'Inside the business', items: ['The **owner or manager**, deciding whether to hire, buy or expand', 'Whoever chases unpaid customer invoices, working from your figures', 'Whoever authorises payments to suppliers, relying on your check of the invoice', 'Colleagues asking what a department has spent'] },
            right: { title: 'Outside the business', items: ['The **accountant** preparing statutory accounts from your records', 'HMRC, receiving tax figures that started as your entries', 'Suppliers, who are paid — or not — on the strength of your work', 'Customers, who receive the invoices you prepare', 'A bank considering a loan, reading accounts built on your records'] },
          },
          p: [
            'The distinction matters because the assessment asks about the effect of errors, and the effects are different depending on who is affected. A misposted internal figure may cost an afternoon of somebody’s time. A wrong figure sent to HMRC is a wrong tax payment. A customer invoiced twice may simply never come back.',
            'It is also the answer to the question a beginner reasonably asks: why does a small mistake matter so much when somebody will surely notice? Often nobody will. A wrong figure that looks plausible passes straight through every stage that follows, because everybody downstream assumes the stage before them did their job. There is frequently no second check at all — which is exactly why "have a second person review when appropriate" appears in the syllabus as a deliberate action rather than as something that happens automatically.',
          ],
        },
      ],
      check: [
        {
          q: 'An invoice arrives from a supplier for goods you have no record of anyone ordering. What should you do?',
          opts: [
            'Refer it to your supervisor before it is paid',
            'Pay it, since a supplier would not invoice for nothing',
            'Discard it, since there is no order to support it',
            'Enter it in the purchases daybook and decide later',
          ],
          ans: 0,
          exp: 'Referring to a supervisor or seeking authorisation where appropriate is a named duty of the role. Deciding alone whether the invoice is genuine is not your call — and both paying it and discarding it are decisions, taken without the authority to take them.',
        },
        {
          q: 'Match each duty of a bookkeeper to an example of it.',
          type: 'match',
          left: [
            'Prepare financial documentation',
            'Check financial documentation',
            'Prepare information used in decisions',
            'Refer for authorisation where appropriate',
          ],
          right: [
            'Raising a sales invoice for a customer from the delivery note',
            'Comparing a purchase invoice against the purchase order before it is paid',
            'Producing a list of amounts owed by customers for the owner',
            'Escalating an unexpected invoice rather than deciding whether to pay it',
          ],
          exp: 'Preparing documentation means producing it — a sales invoice is the standard example. Checking documentation means examining what arrives, typically a purchase invoice against the order. Information used in decisions is anything the owner or manager acts on. And referring upwards applies whenever the decision is not yours to make.',
        },
        {
          q: 'Why does a plausible-looking wrong figure often cause more damage than an obviously wrong one?',
          opts: [
            'Each stage downstream assumes the one before it was correct',
            'It is harder to correct once entered in the records',
            'It affects external users but not internal ones',
            'It cannot be found without auditing the whole year of entries',
          ],
          ans: 0,
          exp: 'An obviously wrong figure gets challenged. A plausible one passes through every later stage untouched, because everybody assumes the stage before them did their job. That is why reviewing your own work, and having a second person review when appropriate, are named actions in the syllabus rather than optional extras.',
        },
        {
          q: 'Complete the sentence about the bookkeeper’s duties.',
          type: 'gapfill',
          template: 'A bookkeeper must prepare information that is timely and {0}, and must {1} to a supervisor where appropriate rather than deciding alone.',
          gaps: [
            { options: ['accurate', 'detailed', 'confidential'], answer: 0 },
            { options: ['refer', 'report', 'explain'], answer: 0 },
          ],
          exp: 'The specification pairs timely with accurate — both are required, and one without the other is of little use. And the duty is to refer to a supervisor or seek authorisation where appropriate, which is what keeps a bookkeeper inside the limits of their own authority.',
        },
      ],
    },

    {
      id: 'L1-BKFN-1B',
      title: 'When the numbers are wrong',
      summary: 'What inaccurate records actually do — to customers, suppliers, the accounts, the tax bill, and your reputation.',
      kind: 'theory',
      criteria: ['BKFN-1.2.1'],
      cards: [
        {
          h: 'Why this is a whole topic on its own',
          p: [
            'It would be reasonable to expect "be accurate" to take one line. The specification gives it a topic area and twelve separate consequences, and the reason comes before the list.',
            'The reason is that the assessment does not test whether you think accuracy is good. It tests whether you can trace a specific error to its specific consequence. Given a scenario — a sales invoice entered at £450 when it should have been £540 — the question is not "is this bad" but "what happens next". And what happens next is definite: that customer is undercharged, the sales figure is understated, the profit is understated, and the VAT declared is too low.',
            'So learn this as a set of causal chains rather than as a list of bad outcomes. An error in the customer records does something different from an error in the supplier records, and an error in either does something different again by the time it reaches the accounts.',
          ],
        },
        {
          h: 'Errors that reach customers',
          table: {
            headers: ['Error', 'What follows'],
            rows: [
              ['A payment received is not recorded', '`Incorrect chasing of customers` — the customer is pursued for money they have already paid'],
              ['An invoice is not recorded, or recorded late', '`Delayed receipts from customers` — nobody is chasing money that is genuinely owed'],
              ['A customer is invoiced for the wrong amount', 'Either they are undercharged and the business loses money, or overcharged and dispute it'],
              ['Repeated errors of any of the above kinds', '`Loss of customer goodwill` — the relationship deteriorates, and eventually they leave'],
            ],
          },
          p: [
            'The first row is the one worth dwelling on, because it is the classic. A customer pays, the receipt is never entered, and the records continue to show them as owing money. Somebody then contacts them to ask for it. From the customer’s side this is not a clerical slip — they have been accused of not paying a bill they paid, by a business that cannot keep track of its own money.',
            'The second row is the mirror image and is worse for the business rather than for the customer. An unrecorded sales invoice means nobody knows the money is due, so nobody asks for it. It is not a dispute; it is simply cash that never arrives.',
            '`Goodwill` is the term the specification uses for the value of a good working relationship. It is not a soft consideration: a customer who leaves after being chased for a paid invoice takes all their future orders with them, and none of that shows up as a cost anywhere in the records.',
          ],
        },
        {
          h: 'Errors that reach suppliers',
          table: {
            headers: ['Error', 'What follows'],
            rows: [
              ['A purchase invoice is entered at too high an amount', '`Overpayment` — the business pays money it does not owe'],
              ['A purchase invoice is entered at too low an amount', '`Underpayment` — the supplier is short-paid and will chase'],
              ['An invoice already paid is not marked as paid', '`Duplicated payment` — the supplier is paid twice for one invoice'],
              ['An invoice is recorded late or not at all', 'The supplier is paid late, and may hold the next delivery'],
              ['Any of the above, repeatedly', '`Delayed receipt of goods` and `loss of supplier goodwill`'],
            ],
          },
          p: [
            'Note the asymmetry between overpayment and underpayment. Both are errors, but their consequences differ in kind. An overpayment is the business’s own money leaving for nothing, and recovering it depends on the supplier noticing and being willing to repay. An underpayment is visible immediately from the other side — the supplier will chase it, so it gets corrected, but at the cost of the relationship and possibly of the next delivery.',
            'The last row contains a consequence beginners regularly miss: **delayed receipt of goods from suppliers**. A supplier who has not been paid may put the account on hold, and the business then cannot get the stock it needs to trade. So a bookkeeping error in the purchases records ends up stopping the business from selling. That is the kind of chain the assessment likes.',
          ],
          examtrap: 'Overpayment and underpayment are listed separately in the specification because they are different consequences. If a question asks what follows from a purchase invoice recorded at the wrong amount, the direction of the error decides the answer — do not answer "the supplier is paid the wrong amount" when the question is specific enough to want one or the other.',
        },
        {
          h: 'Errors that reach the accounts and the tax authorities',
          p: [
            'Everything above concerns individuals — a customer chased, a supplier short-paid. This card concerns the totals, and the consequences are structurally different, because the totals are what other people build on.',
          ],
          table: {
            headers: ['Consequence', 'How it arises'],
            rows: [
              ['`Overstatement` in the records', 'A figure recorded too high, or recorded twice'],
              ['`Understatement` in the records', 'A figure recorded too low, or missed entirely'],
              ['`Incorrect profit or loss reported`', 'Income or expenses being wrong makes the profit wrong by the same amount'],
              ['`Incorrect tax payments to authorities`', 'Tax is calculated from those figures, so a wrong profit or wrong VAT gives a wrong tax payment'],
              ['Incorrect information on internal or external reports', 'Reports are built from the records, so they inherit every error'],
              ['`Incorrect management or client decision making`', 'Somebody chooses to hire, buy or expand on the strength of a figure that is not true'],
            ],
          },
          p: [
            'Overstatement and understatement are simply the two directions an error can take, and the specification names both because the assessment expects you to identify which one has happened. If an expense is recorded twice, expenses are overstated and profit is understated — both at once, in opposite directions. Getting the direction right is most of the mark.',
            'The tax consequence is the one with legal weight. The business does not calculate tax from thin air; it calculates it from the records. So an error in the records becomes a wrong figure sent to a tax authority, which is a different category of problem from an internal mistake — it may attract interest and penalties, and it has to be corrected formally.',
            'The last row is the most far-reaching and the hardest to see. Nobody makes a decision because the bookkeeping was wrong; they make it because a report told them something. If the report says the business is more profitable than it is, somebody may commit to a cost it cannot carry. The error has by then caused a consequence that has nothing visibly to do with bookkeeping at all.',
          ],
          callout: { kind: 'warning', text: 'One error usually produces several consequences at once, in a chain. A missed sales invoice means understated income, understated profit, understated VAT, a customer not chased, and cash that never arrives — from a single omission.' },
        },
        {
          h: 'The two consequences that land on you',
          p: [
            'The specification closes the list with two consequences that fall on the person doing the work, and they are the ones students skip because they seem to be about feelings rather than facts. They are not.',
            'The first is `time spent tracing and correcting errors`. Finding an error is nearly always more work than making the entry correctly would have been. When a total does not agree, you do not know which entry is wrong, so the work is a search through everything rather than a single fix. Ten seconds of care at the point of entry routinely saves an hour later, and that is a cost to the business measured in wages.',
            'The second is `loss of reputation with managers or clients`. Once a colleague has found two errors in your work, they check the third piece — and the fourth. From that point your figures stop being usable as facts, which removes the whole value of the role. Reputation here is not vanity; it is whether the work can be relied on without being redone.',
            'Both belong in your answer when a question asks about the effects of inaccurate work, and both are commonly the ones a student forgets.',
          ],
          terms: [
            { t: 'Overstatement', d: 'A figure in the records that is higher than it should be.' },
            { t: 'Understatement', d: 'A figure in the records that is lower than it should be.' },
            { t: 'Goodwill', d: 'The value of a good working relationship with a customer or supplier. Lost slowly and rarely recovered.' },
          ],
        },
      ],
      check: [
        {
          q: 'A customer paid their invoice in full, but the receipt was never entered in the records. What is the most likely immediate consequence?',
          opts: [
            'The customer is chased for money they have already paid',
            'The customer is invoiced twice for the same goods delivery',
            'The supplier of those goods is paid late',
            'The business overpays its VAT for the period',
          ],
          ans: 0,
          exp: 'With the receipt missing, the records still show the invoice as unpaid, so the customer appears in the list of people who owe money and gets chased. That is "incorrect chasing of customers" — and repeated, it costs customer goodwill.',
        },
        {
          q: 'An expense of £480 was recorded twice in error. Identify the effect on the records.',
          type: 'truefalse',
          labels: ['Yes', 'No'],
          statements: [
            { text: 'Expenses are overstated.', answer: true },
            { text: 'Profit is understated.', answer: true },
            { text: 'Income is overstated.', answer: false },
            { text: 'The error may lead to an incorrect tax payment.', answer: true },
          ],
          exp: 'Recording an expense twice makes expenses too high — overstated. Profit is income less expenses, so higher expenses make profit too low — understated. Income is untouched. And because tax is calculated from these figures, an understated profit can produce an incorrect tax payment.',
        },
        {
          q: 'Which consequence of inaccurate bookkeeping stops the business from being able to trade?',
          opts: [
            'Delayed receipt of goods from suppliers',
            'Time spent tracing and correcting errors',
            'Incorrect profit or loss reported',
            'Loss of reputation with managers',
          ],
          ans: 0,
          exp: 'A supplier who has not been paid — because the invoice was recorded late or wrongly — may stop supplying. Without stock the business cannot sell, so an error in the purchases records ends up preventing sales. The other three are real consequences but none of them halts trade.',
        },
        {
          q: 'A purchase invoice for £1,200 is recorded as £2,100. Which specific consequence does the specification name for this?',
          opts: [
            'Overpayment to the supplier',
            'Underpayment to the supplier',
            'Duplicated payment to the supplier',
            'Delayed payment to the supplier',
          ],
          ans: 0,
          exp: 'Recorded higher than it should be, so the business pays £2,100 for a £1,200 debt — an overpayment, and its own money leaving for nothing. Underpayment is the opposite direction; duplication is paying the same invoice twice; delay is a timing problem rather than an amount problem.',
        },
        {
          q: 'Why is time spent tracing and correcting errors treated as a real cost?',
          opts: [
            'Finding an error takes far longer than avoiding it',
            'Corrections must be reported to HMRC',
            'Errors cannot be corrected once a total has been calculated',
            'The business must pay a penalty for each error found',
          ],
          ans: 0,
          exp: 'When a total does not agree you do not know which entry is at fault, so correcting it means searching rather than fixing — often an hour of paid time against ten seconds of care at the point of entry. There is no penalty for an internal error, and corrections are always possible.',
        },
      ],
    },

    {
      id: 'L1-BKFN-1C',
      title: 'When the numbers are late',
      summary: 'Why right-but-late is still a failure, and the specific consequences of untimely information.',
      kind: 'theory',
      criteria: ['BKFN-1.2.2'],
      cards: [
        {
          h: 'Accuracy and timeliness are separate requirements',
          p: [
            'The specification treats accuracy and timeliness as two things, with their own lists of consequences, and they cannot be collapsed into one.',
            'Information that is wrong misleads. Information that is late does something different: it is not available when the decision is made. The figure may be perfect, but if the owner needed it on Tuesday to decide whether to place an order, a perfect figure on Friday is worth nothing. The decision was taken on Tuesday, using whatever was to hand — a guess, or last month’s figures.',
            'This is the point beginners find least intuitive, because carefulness feels like an unambiguous virtue. It is not. Work slowly enough and you produce accurate information that nobody can use. The duty in the specification is to prepare information that is timely **and** accurate, and treating either as optional fails it.',
          ],
          callout: { kind: 'key', text: 'A right answer after the deadline is not a partial success. The decision has already been made without it.' },
        },
        {
          h: 'The consequences of untimely information',
          table: {
            headers: ['Consequence', 'How lateness causes it'],
            rows: [
              ['`Missed accounting and other compliance deadlines`', 'Returns and filings have fixed dates; late records mean nothing to file'],
              ['`Delayed receipts from customers`', 'An invoice raised late is paid late — the payment terms only start when it is sent'],
              ['`Delayed payments to suppliers`', 'A purchase invoice processed late is paid late'],
              ['`Delayed receipt of goods from suppliers`', 'A supplier not paid on time may hold the next delivery'],
              ['`Loss of customer or supplier goodwill`', 'Both sides notice a business that is consistently behind'],
              ['Out of date information in reports', 'A report built from stale records describes a business that no longer exists'],
              ['`Incorrect management or client decision making`', 'Decisions get made on the out-of-date picture'],
              ['`Loss of reputation with managers or clients`', 'Persistent lateness is what a reputation is built from'],
            ],
          },
          p: [
            'Compare this list with the one for inaccuracy and you will see three items appearing in both: delayed receipts from customers, delayed receipt of goods, and loss of goodwill and reputation. That overlap is real and worth noticing — it means those consequences can arrive by either route, and a question that describes one of them may be testing either topic.',
            'The distinctively timeliness consequence is the first: **missed deadlines**. Nothing in the inaccuracy list corresponds to it. Compliance dates are fixed and do not move because the records were not ready, so lateness here produces a specific, external failure with its own penalties.',
          ],
        },
        {
          h: 'The invoice-timing chain, in detail',
          p: [
            'One chain is worth following all the way through, because it is the most commonly examined and the one that surprises people.',
            'A business delivers goods on 3 March. The sales invoice is not raised until 24 March. Payment terms are 30 days. Nothing here is inaccurate — the invoice, when it goes out, is perfectly correct.',
            'But the customer’s 30 days begin when they receive the invoice, not when they received the goods. Payment is now due at the end of April instead of early April. The business has waited three extra weeks for money it earned in early March, and if it is short of cash in the meantime that is a genuine problem — possibly a borrowing cost, possibly not being able to pay its own suppliers on time, which starts the supplier chain running as well.',
            'Notice that no error was ever made. Every figure was right. The whole cost came from a delay of three weeks in doing the work, which is exactly why the specification treats timeliness as a duty in its own right.',
          ],
          flow: ['Goods delivered 3 March', 'Invoice raised 24 March', 'Terms start on receipt', 'Payment due end April', 'Three weeks of cash lost'],
          examtrap: 'Payment terms run from the invoice, not from the delivery. A question that gives you a delivery date, an invoice date and payment terms is usually checking that you know which of the two dates the clock starts from.',
        },
        {
          h: 'Stale reports, and the decisions taken from them',
          p: [
            'The last consequences on the list are about reports, and they are the ones with the largest reach.',
            'Reports are produced from the records at a moment in time. If the records are three weeks behind, the report describes the business as it was three weeks ago, and it does so without saying so — a report of amounts owed by customers looks equally authoritative whether it is current or a month out of date.',
            'So somebody reads it and acts. They see that customers owe £14,000 and plan around that money arriving, when in fact half of it was paid a fortnight ago and £9,000 of new invoices have not yet been entered. The figure is not wrong in the sense of being miscalculated. It is simply no longer true, which for the purpose of a decision is the same thing.',
            'This is why "out of date information in reports" and "incorrect management decision making" are listed as separate consequences: the first is the state of the report, the second is what somebody does because of it.',
          ],
          terms: [
            { t: 'Timely', d: 'Available in time to be used for the decision or deadline it is needed for. Not the same as fast.' },
            { t: 'Compliance deadline', d: 'A fixed date by which something must be filed or paid. It does not move because the records were not ready.' },
          ],
        },
      ],
      check: [
        {
          q: 'Which consequence appears in the specification’s list for untimely information but not in its list for inaccurate information?',
          opts: [
            'Missed accounting and other compliance deadlines',
            'Delayed receipts from customers',
            'Loss of customer or supplier goodwill',
            'Incorrect management or client decision making from stale figures',
          ],
          ans: 0,
          exp: 'Missed compliance deadlines are specific to lateness — a filing date is fixed and does not move because the records were not ready. The other three appear in both lists, because they can be caused by an error or by a delay.',
        },
        {
          q: 'Goods are delivered on 3 March. The sales invoice is raised on 24 March with 30-day payment terms. When is payment due, and why does it matter?',
          opts: [
            'Late April — the terms run from the invoice date',
            'Early April — the terms run from the delivery date',
            'Late March — the terms run from the start of the month of delivery',
            'It cannot be determined without the customer’s own payment policy',
          ],
          ans: 0,
          exp: 'Payment terms start from the invoice, not the delivery. Raising it 21 days late moves the due date 21 days later, so the business waits until late April for money it earned in early March. Nothing was inaccurate — the entire cost came from the delay.',
        },
        {
          q: 'Complete the sentence about timeliness.',
          type: 'gapfill',
          template: 'A report produced from records that are three weeks behind is {0} rather than miscalculated — and a decision taken from it is still {1}.',
          gaps: [
            { options: ['out of date', 'overstated', 'unauthorised'], answer: 0 },
            { options: ['incorrect', 'delayed', 'confidential'], answer: 0 },
          ],
          exp: 'The figures may each be right; the picture they give is simply no longer true, which the specification calls out-of-date information in reports. The consequence it leads to is incorrect management or client decision making — listed separately, because the state of the report and the action taken from it are two different harms.',
        },
        {
          q: 'A bookkeeper works very carefully and never makes an arithmetical error, but is consistently two weeks behind. Has the duty in the specification been met?',
          opts: [
            'No — the duty requires both timeliness and accuracy',
            'Yes — accuracy is the primary duty and has been achieved',
            'Yes, provided no compliance deadline has actually been missed',
            'No — but only if a manager has complained about the delay',
          ],
          ans: 0,
          exp: 'The specification pairs the two words deliberately. Accurate information that arrives after the decision has been taken has not served its purpose, so being reliably late is a failure of the duty in its own right — regardless of whether anyone has complained yet.',
        },
      ],
    },

    {
      id: 'L1-BKFN-1D',
      title: 'Working so that it does not happen',
      summary: 'The fourteen actions the syllabus names for keeping work accurate and on time — grouped so they can be remembered.',
      kind: 'theory',
      criteria: ['BKFN-1.2.3'],
      cards: [
        {
          h: 'Fourteen actions, four groups',
          p: [
            'Having established what goes wrong, the specification asks for the actions that prevent it. There are fourteen, and as a flat list they are unmemorable. They fall naturally into four groups, and the groups are the useful thing: given a scenario, you can ask which kind of problem it is and reach for the right kind of answer.',
            'The groups are **plan the work**, **know your limits**, **check the output**, and **use the help available**. Almost every scenario the assessment can put in front of you is one of those four in disguise.',
          ],
          table: {
            headers: ['Group', 'Actions the specification names'],
            rows: [
              ['Plan the work', 'Identify deadlines · identify how long each item needs · prioritise so deadlines can be met · plan using diaries, calendars or planning software · do not take on more work than the time allows'],
              ['Know your limits', 'Do not take on work beyond your ability · discuss with your supervisor if unsure how to process an item · check your understanding of the task with the supervisor or client · discuss workload and priorities with your supervisor'],
              ['Check the output', 'Take time when processing entries · review your own work · check that totals agree to expectation · use internal checks within software to identify errors'],
              ['Use the help available', 'Have a second person review when appropriate · use the software’s own checks'],
            ],
          },
          p: [
            'Notice how much of this is about the work *around* the entries rather than the entries themselves. Only two of the fourteen — taking time, and reviewing your own work — describe the act of bookkeeping. The rest are about planning, asking and checking, which is the specification’s way of saying that accuracy is mostly a product of how the work is organised.',
          ],
        },
        {
          h: 'Planning: deadlines first, then the time each thing takes',
          p: [
            'The planning group has an order to it that is easy to miss. You cannot prioritise work until you know two things: when each item is due, and how long each item takes. Both are named separately in the specification, and the second is the one people skip.',
            'Knowing a VAT return is due on the 7th is not enough to plan with. You also need to know that getting the records to the point where it can be prepared takes two days. Only with both can you work out that you must start on the 4th — and only then can you see whether the other work in front of you fits around it.',
            'That is what `prioritise` means here, and it is a stronger claim than "do the urgent thing first". It means ordering the work so that every deadline is met, which sometimes means starting the thing due later because it is the thing that takes longer.',
            'The last item in the group — **do not take on more work than is possible in the time available** — is the consequence of doing the planning honestly. Once you know what the work needs, you can see when it does not fit, and saying so in advance is a professional act. Accepting it and delivering late is not.',
          ],
          flow: ['Identify deadlines', 'Estimate how long each takes', 'Prioritise to meet them all', 'Record it in a diary or planner', 'Say so if it does not fit'],
        },
        {
          h: 'Limits: four separate reasons to speak to your supervisor',
          p: [
            'The specification names four situations involving a supervisor, and they are genuinely different. Treating them as one blurred instruction to "ask if unsure" loses marks, because the assessment can describe any one of them specifically.',
          ],
          table: {
            headers: ['Situation', 'The action'],
            rows: [
              ['You do not fully understand what the task requires', 'Check your understanding of the task with the supervisor or client'],
              ['You understand the task but not how to process a particular item', 'Discuss that item with your supervisor'],
              ['The work is beyond your competence', 'Do not take it on'],
              ['You have more work than time', 'Discuss workload and priorities with your supervisor'],
            ],
          },
          p: [
            'The distinction between the first two is worth holding onto. Not understanding the **task** is a problem at the start — you have been asked to do something and are not sure what is wanted. Not knowing how to process an **item** happens mid-flow, when the work is clear but one transaction does not fit any pattern you recognise. The first is resolved by a conversation before starting; the second by asking about the specific item rather than guessing at it.',
            'The third is the hardest in practice, because declining work feels like admitting inadequacy. It is the opposite: taking on work beyond your ability guarantees the errors this whole topic is about, and it breaches the ethical principle of professional competence and due care that the next lesson covers.',
            'The fourth is the honest end of the planning group. Workload is a matter for the person who allocates it, and they can only reprioritise if they know.',
          ],
          callout: { kind: 'tip', text: 'When a question describes a bookkeeper facing something they cannot resolve, the answer is almost never "make a decision and note it". It is to establish the position with somebody who has the authority — before the entry is made, not after.' },
        },
        {
          h: 'Checking: three different checks, not one',
          p: [
            'The checking group contains three distinct activities, and each catches a different kind of error.',
            '**Reviewing your own work** means going back over the entries against the source documents. It catches transcription errors — the £1,240 entered as £1,420, the invoice entered under the wrong customer. This is a line-by-line comparison and there is no shortcut to it.',
            '**Checking that totals agree to expectation** is different and much faster. It does not compare anything to a document; it asks whether the answer is the right size. If a month’s sales normally run at £30,000 and this month’s total comes out at £300,000, something is wrong, and you know that before checking a single entry. This catches the large errors — a decimal point, a figure entered twice, a column totalled twice — and it costs seconds.',
            '**Using internal checks within software** means letting the system do what it is built to do: flag a duplicate invoice number, refuse a date outside the period, warn that a total does not cross cast. Outcome 5 returns to this at length. The point here is that a check the software performs is a check you do not have to perform, and ignoring the warnings is a choice.',
            'The fourth action, **taking time when processing entries**, is not really a check. It is the recognition that speed at the point of entry is a false economy, given how much longer finding an error takes than avoiding it.',
          ],
          split: {
            left: { title: 'A review catches', items: ['Figures transcribed wrongly', 'Entries against the wrong customer or supplier', 'Documents missed altogether', 'Amounts in the wrong column'] },
            right: { title: 'An expectation check catches', items: ['A misplaced decimal point', 'A figure entered twice', 'A column totalled or included twice', 'An answer with the wrong sign, such as negative cash'] },
          },
        },
        {
          h: 'A second pair of eyes',
          p: [
            'The last action is to **have a second person review the work when appropriate**, and the phrase "when appropriate" is doing real work.',
            'Not everything warrants a second reviewer; there would be no time for anything else. What warrants it is work that is unusually large, unusual in kind, going outside the business, or hard to reverse. A one-off payment for a substantial amount is worth having somebody else look at. A routine week of sales invoices is not.',
            'The reason a second person catches things you cannot is that you know what you meant. Re-reading your own entry, you see the transaction you intended rather than the one on the page. Somebody who has never seen it reads only what is there. This is why proofreading your own writing is unreliable, and it is the same effect.',
            'It is also the last line of defence. Earlier in this outcome the point was made that a plausible wrong figure passes through every later stage untouched, because everybody assumes the stage before them did their job. A deliberate second review is the one place that assumption is actually tested.',
          ],
        },
      ],
      check: [
        {
          q: 'A bookkeeper knows a return is due on the 7th but has not considered how long preparing it takes. Which named action has been skipped?',
          opts: [
            'Identify how long each item of work requires',
            'Identify the deadlines that apply to the work',
            'Review own work against the source documents',
            'Have a second person review when appropriate',
          ],
          ans: 0,
          exp: 'The deadline has been identified; what is missing is the estimate of how long the work takes. The specification names both separately, because without the second you cannot prioritise — knowing the date does not tell you when to start.',
        },
        {
          q: 'A month’s sales total comes out at £300,000 when the business normally sells about £30,000. Which check has caught this, and what makes it useful?',
          opts: [
            'Checking that a total agrees to expectation',
            'Reviewing own work against the source documents',
            'A second person’s independent review',
            'An internal check within the software',
          ],
          ans: 0,
          exp: 'Nothing has been compared to a document; the total has simply been judged against the size it ought to be. That is what catches a misplaced decimal, a doubled figure or a column added twice — and it costs seconds, which is why it is worth doing every time.',
        },
        {
          q: 'Match each situation to the action the specification names for it.',
          type: 'match',
          left: [
            'You are unsure what the task you have been given actually requires',
            'You understand the task, but one transaction does not fit any pattern you know',
            'You have been offered work that is beyond your competence',
            'You have been given more work than the time allows',
          ],
          right: [
            'Check your understanding of the task with your supervisor or client',
            'Discuss that item with your supervisor before processing it',
            'Do not take on work beyond your ability',
            'Discuss workload and priorities with your supervisor',
          ],
          exp: 'The four are deliberately distinct. Not understanding the task is resolved before starting; not knowing how to process an item arises mid-flow and is about that item; competence is a reason to decline; and workload is a matter for whoever allocates the work, who can only reprioritise if told.',
        },
        {
          q: 'Why does a second person often catch an error the original preparer cannot?',
          opts: [
            'The preparer reads what they intended rather than what is there',
            'A second person is usually more senior and therefore more accurate',
            'A second review is done against the source documents, whereas self-review is not',
            'The software only allows its internal checks to run for a second user',
          ],
          ans: 0,
          exp: 'It is the proofreading effect: knowing what you meant makes it hard to see what you wrote. Seniority is irrelevant, and both kinds of review can use the source documents — what differs is that the second reader has no memory of the intention to override what is there.',
        },
        {
          q: 'Which of these is the best example of taking an action to protect timeliness rather than accuracy?',
          opts: [
            'Prioritising the work to meet every deadline',
            'Reviewing your own entries against the source documents',
            'Checking that a total agrees to expectation',
            'Having a second person review a large one-off payment',
          ],
          ans: 0,
          exp: 'Prioritising is about getting the work done in time. The other three are all checks on whether the work is right — valuable, but they do nothing about lateness. This distinction matters because the specification treats timeliness and accuracy as separate duties.',
        },
      ],
    },

    {
      id: 'L1-BKFN-1E',
      title: 'The five fundamental principles',
      summary: 'Confidentiality, professional behaviour, professional competence and due care, integrity, objectivity — and how to tell them apart.',
      kind: 'theory',
      criteria: ['BKFN-1.3.1'],
      cards: [
        {
          h: 'Why a bookkeeper has ethics at all',
          p: [
            'Ethics can look like an odd subject in a bookkeeping qualification. It is here for a concrete reason: a bookkeeper is trusted with two things that are easy to misuse, and neither is protected by anything except the behaviour of the person holding them.',
            'The first is **information**. You will know what a business earns, what it owes, what its customers pay, and often what its staff are paid. Much of that is valuable to somebody and damaging to disclose.',
            'The second is **the record itself**. You are the person who writes down what happened. Somebody who wants the figures to say something other than the truth has to come through you, and it is not always an obvious villain — often it is a manager who wants this quarter to look better, framing it as a small accommodation.',
            'The five principles are the profession’s answer to both. AAT publishes them in its Code of Professional Ethics, and they are not local rules invented for a syllabus: the same five appear across the accountancy profession internationally.',
          ],
          terms: [
            { t: 'Code of Professional Ethics', d: 'AAT’s published standard of behaviour for its members and students. Breaching it is a disciplinary matter, separately from any legal consequence.' },
          ],
        },
        {
          h: 'The five, one by one',
          table: {
            headers: ['Principle', 'What it requires', 'A breach looks like'],
            rows: [
              ['`Integrity`', 'Being straightforward and honest in all professional relationships', 'Signing off figures you know to be wrong; letting a misleading impression stand'],
              ['`Objectivity`', 'Not letting bias, conflict of interest or the influence of others override professional judgement', 'Treating a friend’s account more leniently; changing a figure because a manager pressed you'],
              ['`Professional competence and due care`', 'Maintaining the knowledge and skill to do the work properly, and applying care when doing it', 'Taking on work you are not able to do; rushing entries so that errors get through'],
              ['`Confidentiality`', 'Not disclosing information acquired at work without proper authority', 'Mentioning a client’s turnover to a friend; leaving a payroll report on a shared screen'],
              ['`Professional behaviour`', 'Complying with relevant laws and regulations and avoiding conduct that discredits the profession', 'Ignoring a legal obligation; behaving in a way that reflects badly on the profession'],
            ],
          },
          p: [
            'Learn the five names first — the assessment can simply ask you to identify them, and there is no partial credit for four. A common mnemonic takes their initials as **ICPCO**, or reorders them as **PIC-OC**; use whichever sticks, but be careful not to shorten "professional competence and due care" to "competence", because "due care" is half of what it requires.',
          ],
        },
        {
          h: 'Telling integrity from objectivity',
          p: [
            'These two are the pair students confuse, and the confusion is understandable — both are about not producing a false picture. The difference is *why* the picture would be false.',
            '**Integrity** is about honesty. It is breached when you knowingly state or endorse something untrue, or knowingly allow a false impression to stand. The test is what you know: if you are aware the figures are wrong and you let them go out, that is integrity, whatever your reason.',
            '**Objectivity** is about influence. It is breached when your judgement is displaced by something that should not affect it — a personal relationship, a financial interest, or pressure from somebody with authority over you. Here the outcome may not even be dishonest. A bookkeeper who genuinely believes their friend’s explanation, and would not have believed a stranger’s, has failed on objectivity while remaining entirely honest.',
            'A useful way to separate them: integrity asks *do I know this is untrue?*, objectivity asks *would I have reached the same conclusion about anybody else?*',
          ],
          split: {
            left: { title: 'Integrity is at stake when', items: ['You know a figure is wrong and send it anyway', 'You stay silent while somebody relies on a false impression', 'You describe work as done that is not done'] },
            right: { title: 'Objectivity is at stake when', items: ['A friend or relative is involved in the account', 'You have a financial interest in the outcome', 'A manager is pressing you towards a particular answer', 'A gift or favour has come from somebody affected'] },
          },
          examtrap: 'A scenario where a manager pressures a bookkeeper to change a figure engages **both** principles: objectivity, because judgement is being displaced by pressure, and integrity if the bookkeeper knows the changed figure is untrue. If a question asks for one, read carefully whether it emphasises the pressure or the knowledge.',
        },
        {
          h: 'Competence, due care, and professional behaviour',
          p: [
            '`Professional competence and due care` is two obligations in one name, and both halves are examinable.',
            '**Competence** is about capability: having the knowledge and skill the work requires, keeping it current, and declining work that is beyond it. This is the principle behind "do not take on work beyond your ability" from the previous lesson. It is not a permanent judgement about you — it is about this task, now.',
            '**Due care** is about how you work when the task is well within your competence. Rushing, skipping the review, not checking a total against expectation — none of those is a lack of knowledge. They are a lack of care, and they breach the principle just as surely.',
            '`Professional behaviour` is the broadest of the five and functions partly as a backstop. It requires compliance with relevant laws and regulations, and avoiding conduct that discredits the profession. Data protection obligations sit here. So does the anti-money-laundering framework in the next lesson. And so does conduct that is not illegal at all but reflects badly on the profession — being abusive to a client, or making claims about your qualifications that are not true.',
          ],
          callout: { kind: 'key', text: 'Competence is "could I do this properly?". Due care is "did I do this properly?". A capable bookkeeper who rushes breaches the same principle as one who takes work beyond their ability.' },
        },
        {
          h: 'Confidentiality, in outline',
          p: [
            'Confidentiality is the fifth principle and the one this unit treats at greatest length — the specification gives it two further scope items of its own, which the next lesson covers. In outline it requires that information acquired through your work is not disclosed without proper authority, and not used for your own advantage.',
            'Three features stand out at this stage. It applies to information about **anybody** you encounter through the work — the business, its customers, its suppliers, its employees — not only to your employer. It is not limited to deliberate disclosure; leaving a screen visible or discussing a client where you can be overheard breaches it just as effectively. And it continues after the relationship ends: leaving a job does not release you from it.',
            'The reason it gets extra attention in this unit is that it is the principle a junior bookkeeper is most likely to breach, and to breach accidentally. The others generally require a decision. This one can be broken by a laptop left open on a train.',
          ],
        },
      ],
      check: [
        {
          q: 'Which list contains all five fundamental principles of ethics?',
          opts: [
            'Confidentiality, professional behaviour, professional competence and due care, integrity, objectivity',
            'Confidentiality, professional behaviour, professional competence, honesty and independence',
            'Integrity, objectivity, confidentiality, accuracy, timeliness and independence',
            'Professional competence and due care, confidentiality, integrity, objectivity, honesty',
          ],
          ans: 0,
          exp: 'Those are the five, exactly as the specification names them. Accuracy, timeliness, honesty, independence and transparency are all plausible-sounding intruders — honesty is part of what integrity requires, but it is not the name of a principle.',
        },
        {
          q: 'A bookkeeper accepts at face value an explanation from a supplier who is a close friend, where they would have asked for evidence from anybody else. Which principle is most directly at risk?',
          opts: [
            'Objectivity',
            'Integrity',
            'Confidentiality',
            'Professional behaviour',
          ],
          ans: 0,
          exp: 'Objectivity is about judgement being displaced by something that should not affect it — here, a personal relationship. Nothing dishonest has occurred, which is what separates it from integrity: the test for objectivity is whether the same conclusion would have been reached about anybody else.',
        },
        {
          q: 'An experienced bookkeeper, entirely capable of the task, rushes a week of entries and does not review them. Errors get through. Which principle has been breached?',
          opts: [
            'Professional competence and due care — the due care half',
            'None — the work was within their competence',
            'Integrity, because the errors make the records untrue',
            'Objectivity, because time pressure influenced the judgement',
          ],
          ans: 0,
          exp: 'The principle has two halves and both bind. Competence was not in question; due care was, and rushing past the review breaches it. Integrity is not engaged because the errors were not knowing, and time pressure is not the kind of influence objectivity is about.',
        },
        {
          q: 'Identify whether each statement about the fundamental principles is true.',
          type: 'truefalse',
          statements: [
            { text: 'Confidentiality continues to apply after you leave the employer or client.', answer: true },
            { text: 'Confidentiality applies to information about the employer but not its customers.', answer: false },
            { text: 'Professional behaviour includes complying with relevant laws and regulations.', answer: true },
            { text: 'A breach of confidentiality requires a deliberate act of disclosure.', answer: false },
          ],
          exp: 'Confidentiality survives the end of the relationship, and it covers anybody encountered through the work — customers, suppliers and employees, not only the employer. Professional behaviour is the principle that carries legal and regulatory compliance. And confidentiality can be breached entirely accidentally: an open screen or an overheard conversation does it.',
        },
        {
          q: 'Complete the sentence distinguishing two principles.',
          type: 'gapfill',
          template: 'Knowingly signing off a figure you believe to be wrong is a failure of {0}, while changing a figure because a manager pressed you engages {1}.',
          gaps: [
            { options: ['integrity', 'objectivity', 'confidentiality'], answer: 0 },
            { options: ['objectivity', 'due care', 'professional behaviour'], answer: 0 },
          ],
          exp: 'Integrity turns on knowledge — you know it is untrue and you let it stand. Objectivity turns on influence — your judgement has been displaced by pressure from somebody with authority. A single scenario can engage both, which is why the wording of the question matters.',
        },
      ],
    },

    {
      id: 'L1-BKFN-1F',
      title: 'Confidentiality in practice',
      summary: 'What follows from a breach, and the fifteen safeguards the syllabus names for keeping information secure.',
      kind: 'theory',
      criteria: ['BKFN-1.3.2', 'BKFN-1.3.3'],
      cards: [
        {
          h: 'What a breach of confidentiality actually costs',
          p: [
            'The previous lesson established confidentiality as one of the five principles. The specification then asks specifically what happens when it fails, and the answer has five parts operating at different levels. They are worth separating, because a single incident can trigger all five at once.',
          ],
          table: {
            headers: ['Consequence', 'What it means'],
            rows: [
              ['`Unauthorised sharing of information`', 'The immediate event — information has reached somebody with no right to it'],
              ['Breach of `data protection` / GDPR', 'A legal failure. Personal data is protected by law, with regulatory consequences for the business'],
              ['Breach of the `AAT Code of Professional Ethics`', 'A professional failure, dealt with by AAT as a disciplinary matter'],
              ['Breach of `employment contract`', 'A contractual failure, and normally grounds for dismissal'],
              ['`Loss of business or personal reputation`', 'The business loses clients; the individual loses the trust the role depends on'],
            ],
          },
          p: [
            'The structure here is worth noticing: one act, four separate frameworks broken, plus a consequence that is not a breach of anything but may outlast all of them.',
            'A bookkeeper who emails a client’s payroll file to the wrong recipient has in one action shared information without authority, probably breached data protection law, breached the ethical code they are bound by, breached the confidentiality term in their employment contract, and damaged both the firm’s reputation and their own. No malice is required, and no benefit is obtained. The consequences do not scale with intent.',
            'That is why the safeguards on the next cards are worth taking seriously rather than treating as an IT department’s concern. The person who causes a breach is almost never trying to.',
          ],
          callout: { kind: 'warning', text: 'One careless email can breach data protection law, the ethical code and your employment contract simultaneously. Intent is not part of any of those tests.' },
        },
        {
          h: 'Safeguards: the technical ones',
          p: [
            'The specification names fifteen ways of keeping information confidential and secure. They divide cleanly into things a system does and things a person does, and the technical group is the smaller half.',
          ],
          terms: [
            { t: 'Encryption', d: 'Storing or sending data in a form that is unreadable without a key, so an intercepted or stolen file is useless.' },
            { t: 'Firewall', d: 'A barrier controlling what traffic may reach a network, keeping unauthorised connections out.' },
            { t: 'Authentication', d: 'Proving you are who you claim before access is granted — a password, and increasingly a second factor such as a code sent to a phone.' },
            { t: 'Anti-virus software', d: 'Software that detects and removes malicious programs, which is one route by which data is stolen.' },
          ],
          table: {
            headers: ['Safeguard', 'What it protects against'],
            rows: [
              ['Strong passwords, and **not sharing them**', 'Someone else using your access — and any action then appearing to be yours'],
              ['Screensavers that lock the screen', 'An unattended machine being read or used by whoever walks past'],
              ['Encryption', 'A stolen or intercepted file being readable'],
              ['Firewalls', 'Unauthorised access into the network from outside'],
              ['Anti-virus software', 'Malicious software that steals or destroys data'],
              ['Secure networks for remote or hybrid working', 'Data being intercepted over a public or unsecured connection'],
              ['Authentication for cloud-based information', 'Anybody who finds the web address simply reading the data'],
              ['Cookies and privacy settings', 'Browsing and account information leaking to third parties'],
            ],
          },
          p: [
            'Two of these deserve emphasis. **Not sharing passwords** is separate from having a strong one, and it is the more commonly breached: sharing a login also means every action taken under it appears to have been taken by you, so there is a self-interested reason as well as a security one.',
            'The **secure network** point is the modern addition. Working from home or from a café is normal, and it moves confidential data onto connections nobody in the business controls. That is why the specification names remote and hybrid working explicitly rather than assuming an office.',
          ],
          notyet: 'Scope item 1.3.3 excludes *creating* passwords. You need to know that strong passwords are a safeguard and that they must not be shared, but you will not be asked to compose one or to judge whether a particular string is strong enough.',
        },
        {
          h: 'Safeguards: the behavioural ones',
          p: [
            'The larger group is about how a person behaves, and it is where most real breaches are actually prevented. No amount of encryption helps if the screen is visible to the next table.',
          ],
          split: {
            left: { title: 'Where information is kept', items: ['Hard-copy records stored securely, with **physical access restrictions** — locked cabinets, restricted rooms', 'Soft-copy records in cloud storage or archives, with **secure back-ups** and **restricted access**', 'Not sharing laptops or computers with others'] },
            right: { title: 'How you behave with it', items: ['Not leaving information where unauthorised people can **see** it, and not working in a public space', 'Not discussing confidential matters where unauthorised people can **hear**', 'Only sharing information with **authorised** personnel', 'Checking the correct **recipient** before sending anything'] },
          },
          p: [
            'The see/hear pairing is deliberate and both halves get examined. Not working in a public space addresses the visual route — a screen on a train is readable by whoever is behind you. Not discussing confidential matters where you can be overheard addresses the audible route, and it catches the case people forget: a phone call in an open-plan office, or a conversation with a colleague in a lift.',
            '**Only sharing information with authorised personnel** is the principle the others serve. The test is not whether somebody seems trustworthy or works for the same organisation; it is whether they are authorised to have this particular information. A colleague in another department usually is not.',
            '**Checking the correct recipient before sending** is the last item and the most valuable per second spent. Autocomplete in an email client will offer a similar address to the one you want, and the most common serious breach in practice is a correctly-written email sent to the wrong person. Reading the address before sending costs two seconds and prevents the whole cascade of consequences on the first card.',
          ],
          examtrap: 'Questions here often describe something that sounds harmless — mentioning a client by name to a colleague in another team, or taking a laptop to a café. Both breach the specification’s safeguards. "No harm was done" is not part of the test; unauthorised access being *possible* is.',
        },
      ],
      check: [
        {
          q: 'A bookkeeper emails a client’s payroll report to the wrong recipient by mistake. Identify what this may amount to.',
          type: 'truefalse',
          labels: ['Yes', 'No'],
          statements: [
            { text: 'Unauthorised sharing of information.', answer: true },
            { text: 'A breach of data protection / GDPR.', answer: true },
            { text: 'A breach of the AAT Code of Professional Ethics.', answer: true },
            { text: 'Nothing, because the disclosure was accidental.', answer: false },
          ],
          exp: 'One act can breach several frameworks at once — the sharing itself, data protection law because personal data is involved, the ethical code, and typically the employment contract too. None of those tests asks about intent, so "it was accidental" is not a defence.',
        },
        {
          q: 'Which safeguard most directly addresses the risk of working from a café?',
          opts: [
            'Using a secure network, and not working in a public space',
            'Installing anti-virus software on every machine',
            'Keeping secure back-ups of soft-copy records',
            'Physical access restrictions on hard-copy records held on site',
          ],
          ans: 0,
          exp: 'A café presents two risks the specification names separately: an unsecured connection, met by using a secure network, and a visible screen, met by not working in a public space. Anti-virus, back-ups and physical storage restrictions all address different threats.',
        },
        {
          q: 'Why does the specification name "not sharing passwords" separately from "using strong passwords"?',
          opts: [
            'It gives someone else your access, under your name',
            'Shared passwords are weaker than unshared ones',
            'Sharing a password breaches data protection law but using a weak one does not',
            'It only applies to cloud-based systems',
          ],
          ans: 0,
          exp: 'Strength protects against guessing; not sharing protects against authorised-looking misuse. The second has an extra consequence — the audit trail attributes everything done with that login to you, so you carry the responsibility for another person’s actions.',
        },
        {
          q: 'Match each safeguard to the risk it addresses.',
          type: 'match',
          left: [
            'Checking the recipient before sending',
            'A locking screensaver',
            'Encryption',
            'Physical access restrictions',
          ],
          right: [
            'A correctly written email reaching the wrong person',
            'An unattended machine being read by whoever passes it',
            'A stolen or intercepted file being readable',
            'Someone walking into a room and opening a filing cabinet',
          ],
          exp: 'Each safeguard has a specific failure it is designed for. Recipient checking is the guard against misdirected email — the most common serious breach in practice. Screensavers cover the unattended machine, encryption covers the file that leaves your control, and physical restrictions cover hard-copy records.',
        },
        {
          q: 'A colleague from another department asks how much a particular customer owes. What does the specification’s guidance require?',
          opts: [
            'Only share the information if they are authorised to have it',
            'Share it — they work for the same business',
            'Share it only in writing, to leave a record',
            'Refuse outright — customer balances are never disclosed internally',
          ],
          ans: 0,
          exp: 'The test is authorisation for this particular information, not employment by the same organisation and not seniority. Working for the same business does not itself confer a right to it — and an outright refusal is equally wrong, because plenty of colleagues are authorised.',
        },
      ],
    },

    {
      id: 'L1-BKFN-1G',
      title: 'Money laundering obligations',
      summary: 'Why bookkeeping is regulated, who must register for supervision, and why silence is itself an offence.',
      kind: 'theory',
      criteria: ['BKFN-1.4.1'],
      cards: [
        {
          h: 'What money laundering is, and why it reaches bookkeepers',
          p: [
            '`Money laundering` is the process of making money obtained from crime appear to have come from a legitimate source. Criminal proceeds are of limited use while they are obviously criminal; laundering is what turns them into money that can be banked, spent and explained.',
            'The reason this concerns bookkeepers is structural. Laundering nearly always requires a business to pass the money through, and a business passing money through needs its records to look ordinary. That means somebody has to record the transactions — and the person recording them is the person best placed to notice that they make no sense.',
            'A bookkeeper is therefore in an unusual position: not a suspect, not an investigator, but the person who sees the paperwork first. The obligations in this lesson follow from that position, and they are the reason bookkeeping is a **regulated** activity rather than simply a job.',
          ],
          terms: [
            { t: 'Money laundering', d: 'Making the proceeds of crime appear to come from a legitimate source.' },
            { t: 'Accountancy service', d: 'The regulatory category bookkeeping falls into. It is what brings bookkeepers inside the anti-money-laundering framework.' },
          ],
        },
        {
          h: 'The five obligations the specification names',
          table: {
            headers: ['Obligation', 'What it means'],
            rows: [
              ['**Bookkeeping is an accountancy service**', 'It sits inside the regulated sector, so the anti-money-laundering rules apply to it'],
              ['Bookkeepers providing **external** bookkeeping services must register for **anti-money-laundering supervision**', 'Working for your own clients means being supervised by a body such as AAT or HMRC'],
              ['**Money laundering is a criminal offence**', 'Not a regulatory matter but a crime, with imprisonment available'],
              ['**Reports of suspicious activity should be made**', 'A suspicion is passed on, through your firm’s procedures, without being investigated by you'],
              ['**Failure to report a suspicion is itself a criminal offence**', 'Doing nothing is not a neutral option — silence is separately punishable'],
            ],
          },
          p: [
            'Take the second and the fifth carefully; they are the two the assessment tends to probe.',
            'The registration obligation attaches to **external** services — providing bookkeeping to clients, whether as a sole practitioner or a firm. An employee doing the bookkeeping of the business that employs them is covered by that employer’s own arrangements rather than registering personally. The distinction is who the service is provided to.',
            'The reporting obligation is the one that surprises people, because it inverts the usual instinct. In most of life, staying out of something is the cautious choice. Here it is an offence. If you suspect money laundering and say nothing, you have committed a crime by omission, quite separately from whatever the launderer has done.',
          ],
          callout: { kind: 'warning', text: 'Failing to report a suspicion of money laundering is itself a criminal offence. Not getting involved is not the safe option — it is the punishable one.' },
        },
        {
          h: 'What "suspicion" requires, and what it does not',
          p: [
            'The threshold is **suspicion**, and beginners consistently set it too high. Suspicion is not proof, not evidence, and not certainty. It is more than idle speculation, but it is well short of knowing.',
            'What it does not require is investigation. You are not asked to establish whether a crime has occurred, gather evidence, or confront anybody. That work belongs to people with the powers and training for it. Your obligation is to pass the suspicion on.',
            'What it does not permit is telling the person concerned. Alerting somebody that they are, or may be, the subject of a report is a separate offence — usually called tipping off. So the two instincts a decent person has when they notice something odd, asking the person directly and waiting until they are sure, are both wrong here.',
            'In practice, an employed bookkeeper reports internally, following the firm’s procedures — normally to a nominated officer whose role is to receive exactly this. That is the whole of the duty: recognise, report, hand over.',
          ],
          flow: ['Notice something that does not make sense', 'Do not investigate', 'Do not tell the person', 'Report through your firm’s procedure'],
        },
        {
          h: 'What "does not make sense" looks like',
          p: [
            'The specification does not list warning signs, so nothing below is examinable as a list. It is here because "report a suspicion" is hard to act on without some sense of what a suspicion is made of.',
            'The common thread is a transaction that does not fit the business it is happening in. A small cash-based shop banking far more than its trade could produce. A customer settling a modest invoice with a substantially larger payment and asking for the difference back. Payments routed through an unrelated third party for no stated reason. Requests to invoice for goods or services that were never provided. A customer indifferent to price, delivery or terms in a way no ordinary buyer is.',
            'None of these proves anything, and each has innocent explanations. That is precisely why the threshold is suspicion rather than proof, and why the response is a report rather than a conclusion: you are being asked to notice, not to decide.',
          ],
          split: {
            left: { title: 'Your obligation is to', items: ['Notice transactions that do not fit', 'Report the suspicion through the proper channel', 'Keep the report confidential'] },
            right: { title: 'Your obligation is not to', items: ['Prove that a crime occurred', 'Gather evidence or investigate', 'Question the person concerned', 'Decide whether it is serious enough to bother with'] },
          },
        },
      ],
      check: [
        {
          q: 'Who must register for anti-money-laundering supervision?',
          opts: [
            'A bookkeeper providing external bookkeeping services to clients',
            'Every bookkeeper, whether employed or self-employed',
            'Only bookkeepers who have actually encountered a suspicious transaction',
            'Only bookkeepers who are AAT members',
          ],
          ans: 0,
          exp: 'The obligation attaches to providing bookkeeping as a service to clients. An employee doing the bookkeeping of their own employer is covered by that employer’s arrangements rather than registering personally, and membership of AAT is not what triggers the requirement.',
        },
        {
          q: 'A bookkeeper suspects a client’s transactions involve money laundering but has no evidence. What should they do?',
          opts: [
            'Report the suspicion through their firm’s procedures',
            'Gather evidence first, so the report is not made without grounds',
            'Ask the client to explain the transactions',
            'Take no action, since suspicion without evidence is not reportable',
          ],
          ans: 0,
          exp: 'The threshold is suspicion, not proof, and the duty is to report rather than to establish anything. Investigating is not your role; asking the client risks the separate offence of tipping off; and doing nothing is itself a criminal offence.',
        },
        {
          q: 'Identify whether each statement about money laundering obligations is true.',
          type: 'truefalse',
          statements: [
            { text: 'Bookkeeping is an accountancy service for these purposes.', answer: true },
            { text: 'Money laundering is a criminal offence.', answer: true },
            { text: 'Failing to report a suspicion is a criminal offence.', answer: true },
            { text: 'A suspicion only needs reporting once it can be supported with evidence.', answer: false },
          ],
          exp: 'Bookkeeping falls within the regulated sector as an accountancy service, which is what brings the framework to bear. Laundering is a crime, and so is failing to report a suspicion of it. Evidence is not required — waiting for it is how the reporting offence gets committed.',
        },
        {
          q: 'Why is "not getting involved" the wrong response to a suspicion of money laundering?',
          opts: [
            'Failing to report a suspicion is a criminal offence in itself',
            'The bookkeeper becomes personally liable for the laundered money',
            'It breaches confidentiality towards the employer',
            'The suspicion must be recorded in the books of prime entry',
          ],
          ans: 0,
          exp: 'Silence is separately punishable — the omission is its own offence, quite apart from whatever the launderer has done. There is no personal liability for the money itself, confidentiality is not what is engaged, and a suspicion is reported through the firm’s procedures rather than entered in the accounting records.',
        },
      ],
    },
  ];

  /* ── Outcome 2 — Understand financial transactions (10%) ─────────────────── */
  var O2 = [
    {
      id: 'L1-BKFN-2A',
      title: 'The six kinds of thing',
      summary: 'Assets, liabilities, income, expenses, capital, profit and loss — the classification everything else is built on.',
      kind: 'theory',
      criteria: ['BKFN-2.1.1', 'BKFN-2.1.2'],
      cards: [
        {
          h: 'Why classification comes first',
          p: [
            'A business has hundreds of different things going on, and bookkeeping cannot treat each as unique. So the first move in accounting is to sort everything into a small number of kinds. The specification names six: `assets`, `liabilities`, `income`, `expenses`, `capital`, and `profit or loss`.',
            'Once an item is classified, you know what to do with it. That is the whole purpose. A van and a computer are different objects, but both are assets, and everything the records need to do with a van they do with a computer. Rent and wages are quite different arrangements, but both are expenses, and they behave identically in the accounts.',
            'This lesson is only 10% of the assessment, but it underpins the rest of accounting entirely. Every ledger, every set of accounts and every entry in Level 2 rests on knowing which of these six a thing is. Get it solid now and a great deal downstream becomes easy.',
          ],
          callout: { kind: 'key', text: 'Classification is not a labelling exercise. Once you know which of the six kinds an item is, you know how the records must treat it.' },
        },
        {
          h: 'Assets and liabilities — what the business has and what it owes',
          terms: [
            { t: 'Asset', d: 'Something the business owns or is owed — it has value to the business.' },
            { t: 'Liability', d: 'Something the business owes to somebody else.' },
          ],
          table: {
            headers: ['Assets — owned or owed to the business', 'Liabilities — owed by the business'],
            rows: [
              ['Cash in the till', 'A bank loan'],
              ['Money in the bank account', 'A bank overdraft'],
              ['A delivery van', 'Amounts owed to suppliers (`payables`)'],
              ['Computers, tools, shop fittings', 'VAT owed to HMRC'],
              ['Stock waiting to be sold', 'Wages earned by staff but not yet paid'],
              ['Amounts owed by customers (`receivables`)', 'Money owed for an expense not yet paid, such as an electricity bill'],
            ],
          },
          p: [
            'The two entries at the bottom of each column are the ones worth studying, because they are where beginners go wrong.',
            'An amount **owed by a customer** is an asset. That surprises people — nothing has been received, so it feels like nothing is there. But the business has a right to that money, and a right to money has value: it can be chased, and in some circumstances sold. The technical term is a `receivable`, and it comes up constantly in Outcomes 3 and 4.',
            'An amount **owed to a supplier** is a liability, for the same reason in reverse. The goods have arrived and the money has not yet gone; the obligation exists now. The term is a `payable`.',
            'Neither depends on whether cash has moved. That is the single most important idea in this card, and the reason for it becomes clear in the lesson on cash trading versus credit trading.',
          ],
          examtrap: 'A bank overdraft is a **liability**, not an asset. Money in the bank is an asset; being overdrawn means the bank is owed money, which reverses the direction. If a question gives you a bank figure, read whether it is a balance or an overdraft.',
        },
        {
          h: 'Income and expenses — what comes in and what goes out',
          terms: [
            { t: 'Income', d: 'What the business earns — mainly from selling goods or services.' },
            { t: 'Expense', d: 'What the business spends in order to trade.' },
          ],
          p: [
            'Income is what the business earns. For most businesses that means `sales` — the value of goods or services sold. It can also include other earnings such as interest received on a bank balance or rent charged to a tenant.',
            'Expenses are what the business spends in order to trade: buying stock, wages, rent, insurance, electricity, fuel, advertising, postage. The test is that the spending is part of trading.',
            'There is a distinction here that trips people up, and it is better met now even though the full treatment belongs at Level 2. Buying a van is **not** an expense, even though money leaves the business. The van is still there afterwards — the business has swapped one asset (cash) for another (a van), and its overall position has not changed. Buying fuel for the van *is* an expense: the fuel is consumed and nothing of value remains.',
            'So the question is not "did money leave?" but "does the business still have something of value?". If yes, it is an asset. If it has been used up in the course of trading, it is an expense.',
          ],
          split: {
            left: { title: 'Expenses — used up in trading', items: ['Fuel for the van', 'Wages', 'Rent and insurance', 'Electricity', 'Advertising', 'Stock bought for resale'] },
            right: { title: 'Assets — still there afterwards', items: ['The van itself', 'Computers and equipment', 'Shop fittings', 'Cash in the bank', 'Unsold stock'] },
          },
        },
        {
          h: 'Capital, profit and loss',
          terms: [
            { t: 'Capital', d: 'What the business owes back to its owner — the owner’s stake in the business.' },
            { t: 'Profit', d: 'Income greater than expenses over a period.' },
            { t: 'Loss', d: 'Expenses greater than income over a period.' },
          ],
          p: [
            '`Capital` is the hardest of the six, so take it slowly. It is the owner’s stake in the business — the amount the business owes back to the person who owns it.',
            'That phrasing is deliberate. Accounting treats the business as separate from its owner, even for a sole trader where they are the same person in law. So when the owner puts £5,000 of their own money in to get started, the business now has £5,000 of cash (an asset) and owes £5,000 back to the owner (capital). The money has not appeared from nowhere; it has arrived from somebody, and the records show who.',
            '`Profit` and `loss` are the difference between income and expenses over a period. Income above expenses is a profit; expenses above income is a loss.',
            'And here is the connection that makes Outcome 2 hang together: **profit belongs to the owner**. So a profit increases capital, and a loss decreases it. The business has earned more than it spent, and that extra is the owner’s — so the amount the business owes back to them goes up. This is scope item 2.2.2, and the next lesson but one builds directly on it.',
          ],
          formula: 'Income − Expenses = Profit (or Loss) · Profit increases capital · Loss decreases capital',
          callout: { kind: 'tip', text: 'Capital is a liability in character — it is owed by the business to its owner. That is why an owner putting money in increases capital, and why profits, which belong to the owner, increase it too.' },
        },
        {
          h: 'Classifying, in practice',
          table: {
            headers: ['Item', 'Classification', 'Why'],
            rows: [
              ['Cash in the till', 'Asset', 'Owned by the business'],
              ['A bank overdraft', 'Liability', 'Owed to the bank'],
              ['Amount owed by a customer', 'Asset', 'A right to receive money — a receivable'],
              ['Amount owed to a supplier', 'Liability', 'An obligation to pay — a payable'],
              ['Sales for the month', 'Income', 'Earned by trading'],
              ['Rent paid on the shop', 'Expense', 'Used up in trading'],
              ['A computer bought for the office', 'Asset', 'Still has value after the purchase'],
              ['Money the owner paid in at the start', 'Capital', 'Owed back to the owner'],
              ['Wages owed to staff but not yet paid', 'Liability', 'An obligation that exists now'],
              ['Interest received from the bank', 'Income', 'Earned, though not from sales'],
            ],
          },
          p: [
            'Two working questions will settle almost any item you meet.',
            'First: **is this a thing, or a flow?** Assets, liabilities and capital are things the business has, owes, or owes to its owner at a moment in time. Income and expenses are flows over a period. A van is a thing; fuel is a flow. This is the distinction that separates the top three from the middle two.',
            'Second, for a thing: **does the business have it, or owe it?** Have it — asset. Owe it to an outsider — liability. Owe it to the owner — capital.',
            'Work through the two questions in that order and the six categories resolve almost mechanically.',
          ],
        },
      ],
      check: [
        {
          q: 'Classify each item.',
          type: 'match',
          left: [
            'An amount owed by a customer',
            'A bank overdraft',
            'Rent paid on the shop',
            'Money the owner paid into the business',
          ],
          right: [
            'Asset',
            'Liability',
            'Expense',
            'Capital',
          ],
          exp: 'An amount owed by a customer is a receivable — a right to money, which has value, so an asset. An overdraft is money owed to the bank, so a liability. Rent is used up in trading, so an expense. And money from the owner is owed back to them, which is capital.',
        },
        {
          q: 'A business buys a delivery van for £9,000 in cash. Why is this not treated as an expense?',
          opts: [
            'The business has swapped one asset for another',
            'Vans are always treated as capital rather than as expenses',
            'No expense arises until the van is sold',
            'The payment was in cash rather than on credit',
          ],
          ans: 0,
          exp: 'The test is whether something of value remains. Cash has gone but a van has arrived, so the business is no worse off overall — one asset has replaced another. Fuel for that van would be an expense, because it is consumed and nothing remains.',
        },
        {
          q: 'Complete the sentences about capital.',
          type: 'gapfill',
          template: 'Capital is the amount the business owes back to its {0}. A profit {1} capital, because the profit belongs to them.',
          gaps: [
            { options: ['owner', 'bank', 'suppliers'], answer: 0 },
            { options: ['increases', 'decreases', 'does not affect'], answer: 0 },
          ],
          exp: 'Accounting treats the business as separate from its owner, so money put in is owed back — that is capital. Because profit belongs to the owner, earning it increases what the business owes them, so capital rises. A loss reduces it for the same reason.',
        },
        {
          q: 'Identify whether each item is an asset.',
          type: 'truefalse',
          labels: ['Asset', 'Not an asset'],
          statements: [
            { text: 'Stock waiting to be sold.', answer: true },
            { text: 'An amount owed to a supplier.', answer: false },
            { text: 'Money in the business bank account.', answer: true },
            { text: 'Wages earned by staff but not yet paid.', answer: false },
          ],
          exp: 'Stock and a bank balance are both owned by the business, so both are assets. An amount owed to a supplier is a payable and unpaid wages are an obligation — both are liabilities, because in each case the business owes rather than has.',
        },
        {
          q: 'Which pair of questions most reliably classifies an item?',
          opts: [
            'Is it a thing or a flow? — then, who does it belong to?',
            'Did money move? — then, was it a large amount or a small one?',
            'Is it on an invoice? — then, was the invoice paid?',
            'Is it physical or not? — then, was it bought this period?',
          ],
          ans: 0,
          exp: 'The first question separates assets, liabilities and capital (things held at a point in time) from income and expenses (flows over a period). The second then splits the things three ways. Whether money moved is unreliable — buying a van moves money without creating an expense.',
        },
      ],
    },

    {
      id: 'L1-BKFN-2B',
      title: 'The dual effect',
      summary: 'Why every transaction changes at least two things, and why that is the idea double-entry bookkeeping is built on.',
      kind: 'theory',
      criteria: ['BKFN-2.1.3'],
      cards: [
        {
          h: 'Every transaction has two sides',
          p: [
            'Here is the central idea of Outcome 2, and arguably of accounting: **every transaction changes at least two of the items in the bookkeeping records**. This is called the `dual effect`.',
            'It is not a convention somebody adopted for tidiness. It follows from what a transaction is. Money and value do not appear or vanish; they move. So if something has arrived, it came from somewhere, and if something has gone, it went somewhere. Recording only one end of that describes half of what happened.',
            'A worked instance: the business pays £300 rent from the bank. Two things change. The bank balance falls by £300 — an asset decreasing. And rent expense rises by £300 — an expense increasing. Recording only the bank movement leaves you knowing money left without knowing why; recording only the rent leaves you knowing an expense arose without knowing what paid for it.',
            'The specification also notes that amounts may **increase and/or decrease**. Both effects can be increases, both can be decreases, or one of each. There is no rule that says one must go up and one down — a point the next card makes concrete.',
          ],
          callout: { kind: 'key', text: 'Every transaction changes at least two items. If you can only see one effect, you have not finished describing the transaction.' },
        },
        {
          h: 'The four shapes a transaction can take',
          table: {
            headers: ['Transaction', 'First effect', 'Second effect'],
            rows: [
              ['Owner pays £5,000 into the business bank account', 'Bank (asset) **increases** £5,000', 'Capital **increases** £5,000'],
              ['Pay £300 rent from the bank', 'Bank (asset) **decreases** £300', 'Rent (expense) **increases** £300'],
              ['Buy a £900 computer, paying by bank transfer', 'Computer (asset) **increases** £900', 'Bank (asset) **decreases** £900'],
              ['Pay a supplier £400 that was owed', 'Bank (asset) **decreases** £400', 'Payable (liability) **decreases** £400'],
              ['Make a £600 sale, the customer paying immediately', 'Bank (asset) **increases** £600', 'Sales (income) **increases** £600'],
              ['Make a £600 sale on credit', 'Receivable (asset) **increases** £600', 'Sales (income) **increases** £600'],
            ],
          },
          p: [
            'Read down the effects columns and you will see all four combinations present: up and up, up and down, down and up, down and down. The table shows there is no pattern to memorise about directions, only the requirement that two things move.',
            'The third row is the swap: one asset up, another asset down, and nothing else in the business changes. This is the transaction from the previous lesson that is not an expense, now shown in terms of its two effects.',
            'Look hardest at the fourth row: paying a supplier reduces the bank **and** reduces the liability. Both go down. Nothing about the business’s overall position changes — it had cash and an obligation; now it has less cash and no obligation. Beginners often want an expense here, but the expense arose earlier, when the goods were received.',
            'The last two rows are the same sale settled differently. The income is identical; only the asset created differs — cash in one case, a right to cash in the other. That is the whole of the difference between cash trading and credit trading, which Outcome 3 takes up.',
          ],
          examtrap: 'Paying a supplier is not an expense. The expense happened when the goods or services were received; paying is settling a liability. If a question asks for the two effects of paying a payable, both are decreases — bank down, liability down.',
        },
        {
          h: 'Working out the second effect',
          p: [
            'One effect of a transaction is nearly always obvious — usually the money. The skill is finding the other one, and there is a reliable question for it: **where did it come from, or where did it go?**',
            'Money left the bank. Where did it go? To a landlord for rent (expense), or to a supplier settling a debt (liability down), or to buy equipment (asset up). Money arrived. Where did it come from? From a customer paying for goods (income, or a receivable going down if they had been invoiced earlier), or from the owner (capital), or from a bank as a loan (liability up).',
            'Notice how much rests on which of those it was. Money arriving from a customer who was invoiced last month is not income — the income was recorded when the sale was made. What is happening now is one asset turning into another: the receivable becomes cash. Treating that receipt as income would record the same sale twice.',
            'That is the most common error at this level, and the question above is what prevents it. Trace where the money came from and you will see whether the sale has already been recorded.',
          ],
          flow: ['Identify the obvious effect', 'Ask where it came from or went to', 'Name the second item', 'Decide whether each increases or decreases'],
        },
        {
          h: 'Where this is going',
          p: [
            'The dual effect is the foundation of `double-entry bookkeeping`, which is the system almost all accounting uses and which Level 2 teaches properly. The name says it: two entries for every transaction, one for each effect.',
            'At Level 2 the two effects acquire names — a `debit` and a `credit` — and they get recorded in ledger accounts, one on each side. There are rules about which effect is which, and learning them is a substantial part of that qualification.',
        'Those rules come with a mnemonic you will meet on the first day of Level 2, and it is worth knowing the name now even though you will not use it here: **DEAD CLIC**. Debits are **E**xpenses, **A**ssets and **D**rawings; credits are **L**iabilities, **I**ncome and **C**apital. Six words, each naming a kind of thing and the side it increases on.',
            'None of that is required here, and the omission is deliberate rather than a gap. What this level asks is that you can see the two effects and say whether each is an increase or a decrease. If you can do that, the machinery at Level 2 is just a notation for something you already understand — which is exactly the intention. Students who struggle with debits and credits are almost always students who never got the dual effect solid first.',
          ],
          notyet: 'Scope item 2.1.3 excludes making entries in ledger accounts, debits and credits, transactions including VAT, and transactions with more than two items. So every transaction you meet in this outcome has exactly two effects and no VAT. VAT appears later, in Outcome 3, but only on documents — never as a third effect in a dual-effect question.',
        },
      ],
      check: [
        {
          q: 'A business pays £450 to a supplier for goods invoiced last month. What are the two effects?',
          opts: [
            'Bank decreases £450; the payable (liability) decreases £450',
            'Bank decreases £450; purchases (expense) increases £450',
            'Bank decreases £450; capital decreases £450',
            'Purchases (expense) increases £450; the payable (liability) increases £450',
          ],
          ans: 0,
          exp: 'Both effects are decreases. The expense arose last month when the goods were received; this transaction settles the obligation. Recording an expense now would record the same purchase twice.',
        },
        {
          q: 'A customer who was invoiced last month pays £800 into the bank. Why is this not income?',
          opts: [
            'The income was recorded when the sale was made',
            'Income is only recorded when goods are delivered, not when they are sold',
            'Receipts into the bank are never income',
            'It is income, but only for the following period',
          ],
          ans: 0,
          exp: 'The sale created the income and the receivable at the same time. The receipt turns one asset into another — the receivable falls, the bank rises. Treating it as income would count the same sale twice, which is the most common error at this level.',
        },
        {
          q: 'The owner pays £5,000 of their own money into the business bank account. Identify the effects.',
          type: 'truefalse',
          labels: ['Yes', 'No'],
          statements: [
            { text: 'The bank balance, an asset, increases.', answer: true },
            { text: 'Capital increases.', answer: true },
            { text: 'Income increases.', answer: false },
            { text: 'Only one item in the records changes.', answer: false },
          ],
          exp: 'The business gains cash and owes that amount back to the owner, so an asset and capital both increase. It is not income, because nothing has been earned — no goods or services were sold. And as with every transaction, at least two items change.',
        },
        {
          q: 'A business buys a £1,200 computer, paying immediately from the bank. What is distinctive about the two effects?',
          opts: [
            'Both items are assets — one up, the other down',
            'Both are decreases, because money has left the business',
            'One is an asset and one is an expense',
            'One is an asset and one is capital',
          ],
          ans: 0,
          exp: 'This is the asset swap: the computer arrives, the cash goes, and the business is no better or worse off overall. There is no expense, because something of value remains — which is why "did money leave?" is an unreliable test for an expense.',
        },
        {
          q: 'Complete the statement of the dual effect.',
          type: 'gapfill',
          template: 'Every transaction changes at least {0} items in the records, and the amounts may {1}.',
          gaps: [
            { options: ['two', 'three', 'four'], answer: 0 },
            { options: ['increase and/or decrease', 'only increase', 'only decrease'], answer: 0 },
          ],
          exp: 'At least two — that is the dual effect, and it is what double-entry bookkeeping is named after. There is no rule about direction: paying a supplier decreases two items, an owner’s investment increases two, and buying equipment does one of each.',
        },
      ],
    },

    {
      id: 'L1-BKFN-2C',
      title: 'The accounting equation',
      summary: 'Assets = Liabilities + Capital — why it holds, why it never breaks, and what profit does to it.',
      kind: 'theory',
      criteria: ['BKFN-2.2.1', 'BKFN-2.2.2', 'BKFN-2.2.3'],
      cards: [
        {
          h: 'The equation, and why it is true',
          formula: 'Assets = Liabilities + Capital',
          p: [
            'This is the `accounting equation`, and it is the tidiest statement of what a set of accounts is.',
            'Read the left side as **what the business has**: cash, bank, equipment, stock, money owed by customers. Read the right side as **where it came from**: some was borrowed or is owed to suppliers (liabilities), and the rest belongs to the owner (capital).',
            'Put like that the equation is close to obvious. Everything a business has came from somewhere, and there are only two somewheres: outsiders it owes, or the owner. Add up what it has, and you have necessarily added up where it came from — by two different routes to the same total.',
            'A concrete instance. A business has £3,000 in the bank, a £7,000 van and £2,000 of stock: £12,000 of assets. It owes £4,000 on a loan and £1,000 to suppliers: £5,000 of liabilities. So the owner’s stake is £7,000. And £12,000 = £5,000 + £7,000.',
          ],
          example: {
            title: 'The same business, both sides',
            rows: [
              ['What it has (assets)', '', 'Where it came from', ''],
              ['Bank', '£3,000', 'Loan', '£4,000'],
              ['Van', '£7,000', 'Payables', '£1,000'],
              ['Stock', '£2,000', 'Capital', '£7,000'],
              ['**Total**', '**£12,000**', '**Total**', '**£12,000**'],
            ],
          },
        },
        {
          h: 'Why it can never fail to balance',
          p: [
            'Scope item 2.2.3 says the equation **will always balance**, and that is a certainty rather than a hope. The reason is the dual effect from the previous lesson.',
            'Every transaction changes at least two items. Work through what any transaction does to the two sides of the equation and you find it either changes both sides by the same amount, or changes two items on the same side in opposite directions. Either way the totals stay equal.',
            'Take a £2,000 bank loan. Assets rise £2,000 (cash in) and liabilities rise £2,000 (the loan). Both sides up by the same amount. Or buy a £900 computer for cash: assets rise £900 and fall £900, so that side nets to nothing and the other side never moved. Or pay a supplier £400: assets fall £400 and liabilities fall £400. Both sides down together.',
            'There is no transaction that can break it. So if a set of records does not balance, that is not a fact about the business — it is proof that something has been recorded wrongly. This is why balancing is used as a check throughout accounting, and it is the whole logic behind the trial balance you will meet at Level 2.',
          ],
          table: {
            headers: ['Transaction', 'Effect on assets', 'Effect on liabilities + capital'],
            rows: [
              ['Take a £2,000 bank loan', '+£2,000', '+£2,000 (liability)'],
              ['Buy a £900 computer for cash', '+£900 and −£900 = no change', 'No change'],
              ['Pay a supplier £400', '−£400', '−£400 (liability)'],
              ['Owner pays in £5,000', '+£5,000', '+£5,000 (capital)'],
              ['Customer pays a £800 invoice', '+£800 and −£800 = no change', 'No change'],
            ],
          },
          callout: { kind: 'key', text: 'The equation balances because of the dual effect. So records that do not balance are not describing an unusual business — they contain an error.' },
        },
        {
          h: 'What profit does to the equation',
          p: [
            'Income and expenses are not in the equation, which puzzles people at first. They get there through capital.',
            'Recall from the first lesson of this outcome that profit belongs to the owner. So a profit increases capital, and a loss decreases it — scope item 2.2.2. That is how trading gets into the equation.',
            'Follow it through. A business sells for £1,000 goods that cost it £600, all in cash. Assets rise by £1,000 from the sale and fall by £600 from the cost, so assets are up £400 net. Liabilities have not moved. For the equation to hold, capital must have risen by £400 — and it has, because the £400 profit belongs to the owner.',
            'So the equation absorbs a period of trading without any special machinery. Whatever profit is made increases what the business owes back to its owner, and whatever loss is made reduces it. This is also the answer to a question beginners ask: if the business made a profit, where is it? It is in the assets — as cash, or stock, or money owed by customers — and its counterpart on the other side is the increase in capital.',
          ],
          formula: 'Assets = Liabilities + Capital · where Capital = opening capital + profit − losses',
          example: {
            title: 'A trading period, both sides',
            rows: [
              ['', 'Before', 'Change', 'After'],
              ['Assets', '£12,000', '+£400', '£12,400'],
              ['Liabilities', '£5,000', 'no change', '£5,000'],
              ['Capital', '£7,000', '+£400 profit', '£7,400'],
            ],
          },
        },
        {
          h: 'What you are and are not asked to do with it',
          p: [
            'Be clear about the boundary here, because it is unusually sharp.',
            'You are asked to **know** the equation, to know that profit increases capital and losses decrease it, and to know that the equation always balances. Those are the three scope items, and all three are "learners need to know" rather than "learners need to be able to".',
            'You are **not** asked to calculate a missing figure from it. Scope item 2.2.3 excludes "calculations of missing entries using the accounting equation" — so a question giving you assets and capital and asking for liabilities is not what this level tests.',
            'What you may well be asked is which way something moves. If a business makes a loss, what happens to capital? If the owner takes money out, does capital rise or fall? If assets rise and liabilities are unchanged, what must have happened to capital? Those are directional questions rather than arithmetic, and they are answerable from the three facts above.',
          ],
          notyet: 'Calculating a missing figure from the accounting equation is explicitly excluded at this level. The equation is here to be understood as a relationship, not used as a formula to solve. It becomes a working tool at Level 2.',
        },
      ],
      check: [
        {
          q: 'Which is the accounting equation?',
          opts: [
            'Assets = Liabilities + Capital',
            'Assets + Liabilities = Capital',
            'Assets = Capital − Liabilities',
            'Income − Expenses = Assets',
          ],
          ans: 0,
          exp: 'Assets are what the business has; liabilities and capital are where it came from — owed to outsiders, or belonging to the owner. Since everything came from one of those two places, the two sides must be equal. Income less expenses gives profit, which reaches the equation through capital.',
        },
        {
          q: 'A business makes a loss for the period. What happens to capital?',
          opts: [
            'It decreases',
            'It increases',
            'It is unaffected — losses only affect assets',
            'It depends on whether the loss was paid in cash',
          ],
          ans: 0,
          exp: 'Profits and losses belong to the owner, so they land in capital: a profit increases it, a loss decreases it. That is scope item 2.2.2, and it is how a period of trading gets into an equation that contains no income or expense line of its own.',
        },
        {
          q: 'Why can the accounting equation never fail to balance?',
          opts: [
            'Because of the dual effect — every transaction keeps both sides equal',
            'Because the bookkeeper adjusts capital at the end of each period to make it balance',
            'Because liabilities are always recorded at the same value as assets',
            'Because losses are excluded from the records until the year end',
          ],
          ans: 0,
          exp: 'Every transaction either moves both sides by the same amount or moves two items on one side in opposite directions, so the totals stay equal automatically. Nothing is adjusted to force it — which is exactly why records that do not balance prove an error has been made.',
        },
        {
          q: 'A business has £18,000 of assets and £6,000 of liabilities. Identify what follows.',
          type: 'truefalse',
          labels: ['Yes', 'No'],
          statements: [
            { text: 'Capital must be £12,000 for the equation to balance.', answer: true },
            { text: 'A £2,000 profit always increases capital by exactly £2,000.', answer: true },
            { text: 'If the business takes a further £5,000 loan, capital changes.', answer: false },
            { text: 'Assets and liabilities are equal to each other.', answer: false },
          ],
          exp: 'Assets less liabilities leaves the owner’s stake, so capital is £12,000. Profit belongs to the owner, so £2,000 of it raises capital by exactly £2,000. A new loan raises assets and liabilities together and leaves capital alone. And assets equal liabilities *plus* capital — not liabilities on their own.',
        },
        {
          q: 'Complete the sentence about capital and trading.',
          type: 'gapfill',
          template: 'A profit {0} capital, and if assets rise while liabilities are unchanged then capital must have {1}.',
          gaps: [
            { options: ['increases', 'decreases', 'does not affect'], answer: 0 },
            { options: ['increased', 'decreased', 'stayed the same'], answer: 0 },
          ],
          exp: 'Profit belongs to the owner, so it increases capital. And since the two sides of the equation must stay equal, assets rising with liabilities unchanged can only mean capital has risen by the same amount.',
        },
      ],
    },
  ];

  /* ── Outcome 3 — Process customer and supplier transactions (29%) ─────────── */
  var O3 = [
    {
      id: 'L1-BKFN-3A',
      title: 'Cash trading and credit trading',
      summary: 'The difference between being paid now and being paid later, and the vocabulary that goes with each.',
      kind: 'theory',
      criteria: ['BKFN-3.1.1'],
      cards: [
        {
          h: 'Two ways to do business',
          p: [
            'Every sale and every purchase happens in one of two ways: the money changes hands at the time, or it does not.',
            'A `cash sale` is a sale paid for at the time. Somebody buys a coffee and pays for it. The transaction is complete and there is nothing outstanding.',
            'A `credit sale` is a sale where the goods or services go now and the money follows later — typically after 30 days. The business has done its half and is waiting for the customer to do theirs.',
            'The same split applies to buying. A `cash purchase` is paid for at the time; a `credit purchase` means the business receives goods now and pays the supplier later.',
            'One warning about the word "cash". In this context it does not mean notes and coins — it means paid immediately, by whatever method. A customer paying by debit card is making a cash sale. A customer paying next month by bank transfer is a credit sale, even though no physical cash appears in either. What "cash" describes is the timing, not the medium.',
          ],
          callout: { kind: 'warning', text: '"Cash" here means paid at the time, not notes and coins. A debit card payment is a cash sale; an invoice settled in 30 days by bank transfer is a credit sale.' },
        },
        {
          h: 'The vocabulary, and which way it points',
          terms: [
            { t: 'Customer', d: 'Somebody who buys from the business.' },
            { t: 'Supplier', d: 'Somebody the business buys from.' },
            { t: 'Receivable', d: 'A customer who owes the business money for a credit sale — and also the amount itself. An asset.' },
            { t: 'Payable', d: 'A supplier the business owes money to for a credit purchase — and also the amount itself. A liability.' },
          ],
          p: [
            'Four words, and the whole of the difficulty is direction. Get them the wrong way round and every later task in this outcome and the next goes wrong, so fix them now.',
            'The trick that works is to read the words literally. A `receivable` is something you will **receive** — money coming in, from a customer. A `payable` is something you will **pay** — money going out, to a supplier. The words describe what the business does next.',
            'Note that only credit trading creates receivables and payables. A cash sale is settled on the spot, so nobody owes anybody anything afterwards. That is why the distinction on the previous card matters so much: credit trading is what generates the records of who owes what, and those records are what Outcome 4 spends most of its time on.',
          ],
          table: {
            headers: ['', 'Cash', 'Credit'],
            rows: [
              ['**Selling**', 'Cash sale — paid at the time, nothing outstanding', 'Credit sale — creates a **receivable** (asset)'],
              ['**Buying**', 'Cash purchase — paid at the time, nothing outstanding', 'Credit purchase — creates a **payable** (liability)'],
            ],
          },
          examtrap: 'Receivables are assets; payables are liabilities. Reversing them is the single most common error in this outcome, and it propagates into every calculation of who owes what in Outcome 4.',
        },
        {
          h: 'Why any business would sell on credit',
          p: [
            'From the seller’s point of view credit looks like a bad deal: hand over the goods, wait a month, and risk not being paid at all. Businesses do it anyway, and knowing why makes the paperwork that follows make sense.',
            'The plain reason is that they would otherwise not get the business. If a builder needs materials and one merchant offers 30 days while another wants payment on collection, the builder uses the first. Trade credit is normal between businesses, and refusing it means competing with one hand tied.',
            'The second reason is that most business customers cannot pay immediately even when willing. They are waiting to be paid themselves. Credit is what lets a chain of businesses trade with each other without every link holding a large cash balance.',
            'The cost is that the seller carries the risk and the wait. Which is precisely why credit trading comes with a paper trail — the invoice recording what is owed, the records showing who has paid, the process for chasing those who have not. A cash business needs almost none of that. Nearly every document in the next lesson exists because somebody is being trusted to pay later.',
          ],
          split: {
            left: { title: 'Cash trading needs', items: ['A receipt for the customer', 'The takings recorded'] },
            right: { title: 'Credit trading also needs', items: ['An invoice stating what is owed and by when', 'A record of each customer’s balance', 'A record of what has been paid and what has not', 'A process for chasing overdue amounts', 'A credit note if something goes back'] },
          },
        },
      ],
      check: [
        {
          q: 'A customer pays for goods by debit card at the till. Is this a cash sale or a credit sale?',
          opts: [
            'A cash sale — payment is made at the time',
            'A credit sale — no physical cash was involved',
            'A credit sale — card payments take days to clear',
            'Neither, until the money reaches the bank account',
          ],
          ans: 0,
          exp: '"Cash" describes the timing, not the medium. Payment happened at the time of sale, so it is a cash sale and creates no receivable. A credit sale is one where the goods go now and the money follows later.',
        },
        {
          q: 'Match each term to what it means.',
          type: 'match',
          left: ['Receivable', 'Payable', 'Customer', 'Supplier'],
          right: [
            'An amount owed to the business by a customer — an asset',
            'An amount the business owes to a supplier — a liability',
            'Somebody who buys from the business',
            'Somebody the business buys from',
          ],
          exp: 'Read the two hard words literally: a receivable is money to be received, so it is owed to the business and is an asset; a payable is money to be paid, so it is owed by the business and is a liability. Customers buy from you; suppliers sell to you.',
        },
        {
          q: 'Which type of trading creates receivables and payables?',
          opts: [
            'Credit trading only',
            'Cash trading only',
            'Both, equally',
            'Neither — they arise only when payment is late',
          ],
          ans: 0,
          exp: 'A cash sale or purchase is settled at the time, so nothing is left outstanding. Only credit trading leaves an amount owed, and that is what a receivable or payable is. They exist from the moment the credit transaction happens, not from the moment payment becomes late.',
        },
        {
          q: 'Identify whether each statement about cash and credit trading is true.',
          type: 'truefalse',
          statements: [
            { text: 'A credit purchase creates a liability for the business.', answer: true },
            { text: 'A cash purchase creates a payable.', answer: false },
            { text: 'Trade credit is offered mainly because customers would otherwise buy elsewhere.', answer: true },
            { text: 'A receivable is a liability of the business.', answer: false },
          ],
          exp: 'A credit purchase leaves the business owing a supplier — a payable, which is a liability. A cash purchase leaves nothing outstanding. Credit is competitive necessity between businesses. And a receivable is money owed *to* the business, so it is an asset.',
        },
      ],
    },

    {
      id: 'L1-BKFN-3B',
      title: 'The documents of buying and selling',
      summary: 'Nine documents, what each one does, and the order they appear in.',
      kind: 'document',
      criteria: ['BKFN-3.1.2'],
      cards: [
        {
          h: 'One transaction, a trail of paper',
          p: [
            'A credit sale generates a sequence of documents, and the sequence is not arbitrary — each one exists because of a question somebody needs answered at that point.',
            'The specification names nine documents. Learning them as a list of definitions is possible but hard; learning them as a story is much easier, because each document’s purpose is obvious once you know where in the story it sits.',
            'The story runs: the customer asks how much · the business says how much · the customer orders · the goods go · the goods arrive · the bill goes · anything wrong comes back · the customer pays · the customer says what the payment covers.',
          ],
          flow: ['Quotation', 'Order', 'Delivery note', 'Goods received note', 'Invoice', 'Credit note', 'Payment', 'Remittance advice'],
        },
        {
          h: 'Before anything moves: quotation and order',
          terms: [
            { t: 'Quotation', d: 'A statement of the price at which the seller will supply, sent before the customer commits. Not a bill.' },
            { t: 'Sales order', d: 'The seller’s record of what a customer has ordered.' },
            { t: 'Purchase order', d: 'The buyer’s formal instruction to a supplier to supply goods or services.' },
          ],
          p: [
            'A `quotation` answers the customer’s first question: how much would this cost? It commits the seller to a price if the customer goes ahead, and commits the customer to nothing. Nothing is owed and no goods have moved, so a quotation never appears in the accounting records at all.',
            'An **order** is the customer deciding to proceed. Here the same event has two names depending on whose paperwork you are looking at. The buyer raises a `purchase order` — their instruction to the supplier. The seller records the same thing as a `sales order`. One event, two documents, two filing cabinets.',
            'This double naming runs through the whole outcome and is worth getting used to now. A single invoice is a **sales** invoice to the business that issued it and a **purchase** invoice to the business that received it. Same piece of paper; the name depends on which side you are standing on.',
          ],
          callout: { kind: 'key', text: 'Sales or purchase describes which side of the transaction you are on, not a different document. Your sales invoice is your customer’s purchase invoice.' },
        },
        {
          h: 'When goods move: delivery note, goods received note, goods returned note',
          terms: [
            { t: 'Delivery note', d: 'Sent with the goods by the seller, listing what is in the delivery. Signed by the customer on arrival.' },
            { t: 'Goods received note (GRN)', d: 'The buyer’s own record of what actually arrived, made when the delivery is checked.' },
            { t: 'Goods returned note', d: 'A record of goods sent back to the supplier — the evidence that something went back.' },
          ],
          p: [
            'A `delivery note` travels with the goods and lists what should be in the box. The customer signs it, which is how the seller proves the delivery happened.',
            'A `goods received note` is the buyer’s independent record of what actually arrived, written when the delivery is opened and checked. It is easy to think this duplicates the delivery note, and the distinction is the entire point: the delivery note says what the **supplier says** they sent, and the GRN says what the buyer **found**. When those two disagree, the disagreement is the useful information — and without a GRN there is nothing to compare the invoice against later.',
            'A `goods returned note` records goods going back — damaged, faulty, wrong item, over-delivered. It is the evidence that supports asking for a credit note, which the next card covers.',
            'Note that none of these three documents contains a price. They are about quantities and condition. Money enters the story at the invoice.',
          ],
          examtrap: 'The delivery note comes from the supplier; the goods received note is made by the buyer. Both describe the same delivery. A question asking which document evidences what actually arrived wants the GRN, because that is the one written by the person who looked in the box.',
        },
        {
          h: 'When money is involved: invoice and credit note',
          terms: [
            { t: 'Invoice', d: 'The document that says money is owed: what was supplied, how much, and when payment is due.' },
            { t: 'Credit note', d: 'A document reducing an amount previously invoiced — the formal cancellation of part or all of a bill.' },
          ],
          p: [
            'The `invoice` is the document that matters most, because it is the one that creates the debt. Before the invoice, the customer has goods and no bill. After it, a specific amount is owed by a specific date. It is the invoice, not the delivery, that puts a receivable into the seller’s records and a payable into the buyer’s.',
            'A `credit note` goes the other way. When goods come back, or an invoice was wrong, or a discount was missed, the seller issues a credit note reducing what is owed. It looks much like an invoice and carries the same kinds of detail, but its effect is subtraction rather than addition.',
            'A frequent question is why the invoice is not simply corrected or cancelled. Two reasons. Invoices are numbered in an unbroken sequence, and a missing number is exactly what an auditor or HMRC looks for — so documents are not withdrawn once issued. And the customer may have already recorded the original invoice in their own books; they need a document to record against it, not a hole where an invoice used to be. A credit note leaves both sides with a complete, matching trail.',
          ],
          callout: { kind: 'tip', text: 'An invoice adds to what is owed; a credit note subtracts. Wrong invoices are never deleted, because the numbering must stay unbroken and the customer needs something to record.' },
        },
        {
          h: 'When payment happens: cash receipt and remittance advice',
          terms: [
            { t: 'Cash receipt', d: 'Confirmation that a payment has been received — the customer’s proof of paying.' },
            { t: 'Remittance advice', d: 'Sent by the payer with a payment, listing which invoices the payment covers.' },
          ],
          p: [
            'A `cash receipt` is the acknowledgement that money has been received. For an over-the-counter sale it is the till receipt; it is the customer’s evidence of having paid.',
            'A `remittance advice` is the more interesting of the two and the one students under-value. It is sent **by the person paying**, listing which invoices the payment is for.',
            'Its purpose becomes obvious as soon as volume appears. A customer with six outstanding invoices sends £4,180. Which invoices has that settled? Without being told, the seller has to guess — and guessing wrongly means chasing an invoice that has been paid while treating another as settled when it has not been. The remittance advice removes the guesswork.',
            'It becomes essential where a credit note is in play. A customer with a £1,200 invoice and a £150 credit note pays £1,050. Nothing in the bank statement explains that figure; the remittance advice is what tells the seller the invoice is fully settled rather than £150 short. Outcome 4 returns to this when calculating what each customer owes.',
          ],
          examtrap: 'The remittance advice is sent by the payer, not the seller. If a question asks which document tells you which invoices a payment relates to, that is the one — and it arrives with the money, not with the goods.',
        },
        {
          h: 'The nine, in order',
          table: {
            headers: ['Document', 'Sent by', 'What it does'],
            rows: [
              ['Quotation', 'Seller', 'States a price before the customer commits. No debt, no entry in the records'],
              ['Purchase order', 'Buyer', 'Instructs the supplier to supply'],
              ['Sales order', 'Seller (own record)', 'Records what the customer has ordered'],
              ['Delivery note', 'Seller, with the goods', 'Lists what is being delivered; signed on arrival'],
              ['Goods received note', 'Buyer (own record)', 'Records what actually arrived, as checked'],
              ['Goods returned note', 'Buyer', 'Records goods sent back; supports a credit note'],
              ['Invoice', 'Seller', 'Creates the debt: what is owed, and by when'],
              ['Credit note', 'Seller', 'Reduces an amount previously invoiced'],
              ['Cash receipt', 'Seller', 'Confirms money has been received'],
              ['Remittance advice', 'Buyer, with the payment', 'Says which invoices the payment covers'],
            ],
            caption: 'Ten rows for nine named documents, because the order appears as both a purchase order and a sales order.',
          },
          p: [
            'Two observations worth carrying forward. Only the invoice and the credit note change what is owed — everything else in the list is evidence, instruction or acknowledgement. And the three documents made by the buyer for their own use (purchase order, goods received note, goods returned note) are exactly the three used to check a purchase invoice, which is what lesson 3E is about.',
          ],
        },
      ],
      check: [
        {
          q: 'Put these documents in the order they normally arise for one credit sale.',
          type: 'ordering',
          items: ['Quotation', 'Purchase order', 'Delivery note', 'Invoice', 'Remittance advice'],
          exp: 'The customer asks the price (quotation), decides to buy (order), the goods travel with a delivery note, the bill follows as an invoice, and the payment arrives with a remittance advice saying what it covers. Money only enters the story at the invoice.',
        },
        {
          q: 'Which document is the buyer’s own record of what actually arrived in a delivery?',
          opts: [
            'The goods received note',
            'The delivery note',
            'The purchase order',
            'The goods returned note',
          ],
          ans: 0,
          exp: 'The delivery note states what the supplier says they sent; the goods received note records what the buyer found on checking. Keeping both is the point — when they disagree, the disagreement is the useful information, and the GRN is what an invoice gets checked against.',
        },
        {
          q: 'Goods worth £150 are returned as faulty against a £1,200 invoice already issued. What does the seller send?',
          opts: [
            'A credit note for £150',
            'A replacement invoice for £1,050',
            'A remittance advice for £150',
            'A goods returned note for £150',
          ],
          ans: 0,
          exp: 'A credit note reduces an amount already invoiced. The original invoice is not withdrawn or replaced — the numbering must stay unbroken, and the customer needs a document to record against the invoice already in their books. The goods returned note came from the buyer and supports the request.',
        },
        {
          q: 'Which document is sent by the person making a payment?',
          opts: [
            'Remittance advice',
            'Cash receipt from the seller',
            'Sales invoice',
            'Credit note',
          ],
          ans: 0,
          exp: 'The remittance advice travels with the money and tells the recipient which invoices it settles — essential where several are outstanding, or where a credit note makes the amount paid differ from any single invoice. The other three all come from the seller.',
        },
        {
          q: 'Identify whether each statement about the buying and selling documents is true.',
          type: 'truefalse',
          statements: [
            { text: 'A quotation creates no debt and no entry in the accounting records.', answer: true },
            { text: 'The same invoice is a sales invoice to the seller and a purchase invoice to the buyer.', answer: true },
            { text: 'A delivery note states the price of the goods delivered.', answer: false },
            { text: 'Only the invoice and the credit note change the amount owed.', answer: true },
          ],
          exp: 'A quotation commits the customer to nothing, so nothing is recorded. "Sales" and "purchase" describe which side you are on, not different documents. Delivery notes deal in quantities and condition, not money. And of the nine documents only the invoice and credit note alter what is owed.',
        },
      ],
    },

    {
      id: 'L1-BKFN-3C',
      title: 'Preparing a sales invoice',
      summary: 'Where the details come from, what every invoice must carry, and how a credit note differs.',
      kind: 'document',
      criteria: ['BKFN-3.2.1', 'BKFN-3.2.2'],
      cards: [
        {
          h: 'Four documents feed an invoice',
          p: [
            'An invoice is not composed from memory. Every figure and every detail on it comes from a document that already exists, and the specification names the four: the `quotation`, the `delivery note`, the `price list` and the `sales order`.',
            'Knowing which detail comes from which document is the practical skill here, because it is also how you check an invoice you have prepared, and how you check one you have received.',
          ],
          table: {
            headers: ['Source document', 'What it supplies'],
            rows: [
              ['Sales order', 'Who the customer is, their reference, and what they ordered'],
              ['Delivery note', 'What was actually sent — the quantities that should be billed'],
              ['Price list', 'The unit price, and any quantity discount that applies'],
              ['Quotation', 'A price already agreed with this customer, which overrides the standard list price'],
            ],
          },
          p: [
            'The delivery note is the one that decides quantities, and this is where care is needed. If the customer ordered 50 and only 40 were sent, the invoice is for 40. Billing the order rather than the delivery is one of the most common errors on an invoice, and the customer will certainly notice.',
            'The quotation ranks above the price list where the two disagree. A quoted price was agreed with this customer; the list price is the default for everybody else. Invoicing the list price when a lower price was quoted is a straightforward dispute.',
          ],
          examtrap: 'Invoice the quantity **delivered**, not the quantity ordered. And where a quotation exists, use the quoted price rather than the price list.',
        },
        {
          h: 'What an invoice has to carry',
          p: [
            'The specification lists the details a sales invoice must be completed with. Grouped by what each is for, they are much easier to hold.',
          ],
          split: {
            left: { title: 'Identifying the customer', items: ['`Customer name`', '`Customer address`', '`Customer reference` — the number the customer uses for this order'] },
            right: { title: 'Identifying the document', items: ['`Invoice number` — unique, in an unbroken sequence', '`Invoice date` — the date the invoice is raised'] },
          },
          table: {
            headers: ['Detail', 'Why it is there'],
            rows: [
              ['Customer name and address', 'Says who owes the money and where the invoice goes'],
              ['Customer reference', 'Lets the customer match the invoice to their own purchase order'],
              ['Invoice number', 'Unique identifier. The sequence must be unbroken, which is why invoices are never deleted'],
              ['Invoice date', 'Starts the payment clock — terms run from here'],
              ['Product description', 'Says what is being charged for, in words the customer recognises'],
              ['Product code', 'Identifies the exact item, where a description alone might be ambiguous'],
            ],
          },
          p: [
            'Two of these carry more weight than they appear to.',
            'The `invoice date` is the date the invoice is raised, and it is the date payment terms run from — as lesson 1C showed, raising an invoice three weeks late delays the money by three weeks. It is not the delivery date and not the order date.',
            'The `customer reference` exists for the customer’s benefit, not yours. A business receiving fifty invoices a week matches each to its own purchase order using that reference. Omit it and your invoice is the one that sits in a query pile.',
            'Product `description` and `code` are both required because they do different jobs. The description is human-readable; the code is exact. "Blue folder" might be any of six products, while FLD-A4-BL is one of them.',
          ],
        },
        {
          h: 'A sales invoice, complete',
          doc: {
            kind: 'invoice',
            title: 'Invoice',
            tag: 'Sales invoice',
            fromLabel: 'From',
            from: ['**Marlow Print Supplies Ltd**', '22 Foundry Lane, Derby DE1 3PQ', 'VAT registration 341 9922 07'],
            toLabel: 'Invoice to',
            to: ['**Ashcroft Design Studio**', 'Unit 4, Canal Wharf', 'Nottingham NG1 7FF'],
            fields: [
              ['Invoice number', '4417'],
              ['Invoice date', '14 May'],
              ['Customer reference', 'ADS-PO-2290'],
              ['Payment terms', '30 days'],
            ],
            table: {
              headers: ['Description', 'Code', 'Qty', 'Unit price', 'Amount'],
              rows: [
                ['A4 card, white, 250gsm (pack of 100)', 'CRD-A4-W', '12', '£8.50', '£102.00'],
                ['Ring binder, A4, blue', 'BND-A4-BL', '20', '£3.20', '£64.00'],
              ],
            },
            totals: [['Net', '£166.00'], ['VAT at ' + VAT, '£33.20'], ['Total due', '£199.20']],
            foot: 'Every detail here has a source: the customer name, address and reference from the sales order; the quantities from the delivery note; the unit prices from the price list; the invoice number and date added when the invoice is raised.',
          },
          p: [
            'Work down the invoice and notice that nothing on it is invented. The only two details that originate with the invoice itself are its number and its date — everything else is carried across from a document that already existed.',
            'That is what makes checking possible, and it is the principle behind the whole of lesson 3E. An invoice is verifiable precisely because every field on it can be traced to somewhere else.',
          ],
        },
        {
          h: 'Credit notes: the same details, the opposite effect',
          p: [
            'A credit note carries almost exactly the same information as an invoice. The specification asks for the same customer details, the same product description and code, the same amounts — and then `credit note number` and `credit note date` in place of the invoice number and date.',
            'Credit notes have their own numbering sequence, separate from invoices and equally unbroken. That is why the specification names the two number fields separately: a document is either an invoice or a credit note, never both, and each has its own sequence.',
            'What differs is the effect. An invoice increases what the customer owes; a credit note reduces it. So a credit note must make clear what it relates to — normally by referencing the original invoice number — because otherwise neither side can match the reduction to the debt it reduces.',
            'A credit note is issued for a small number of reasons: goods returned as faulty, damaged or wrong; goods invoiced but never delivered; an overcharge on the original invoice; or a discount that should have been applied and was not.',
          ],
          doc: {
            kind: 'creditnote',
            title: 'Credit note',
            tag: 'Reduces invoice 4417',
            fromLabel: 'From',
            from: ['**Marlow Print Supplies Ltd**', '22 Foundry Lane, Derby DE1 3PQ'],
            toLabel: 'Credit to',
            to: ['**Ashcroft Design Studio**', 'Unit 4, Canal Wharf', 'Nottingham NG1 7FF'],
            fields: [
              ['Credit note number', 'CN-208'],
              ['Credit note date', '21 May'],
              ['Customer reference', 'ADS-PO-2290'],
              ['Relates to invoice', '4417'],
            ],
            table: {
              headers: ['Description', 'Code', 'Qty', 'Unit price', 'Amount'],
              rows: [['Ring binder, A4, blue — returned damaged', 'BND-A4-BL', '5', '£3.20', '£16.00']],
            },
            totals: [['Net', '£16.00'], ['VAT at ' + VAT, '£3.20'], ['Total credited', '£19.20']],
            foot: 'Its own number sequence, its own date, and a reference to the invoice it reduces. Ashcroft now owes £199.20 − £19.20 = £180.00.',
          },
          callout: { kind: 'tip', text: 'A credit note is an invoice in reverse: same details, its own number sequence, and a reference to the invoice it reduces. It never replaces the original.' },
        },
      ],
      check: [
        {
          q: 'A customer orders 50 units. Only 40 are delivered. How many should the invoice charge for, and which document decides?',
          opts: [
            '40 — the delivery note supplies the quantities to be billed',
            '50 — the sales order records the customer’s commitment to buy',
            '50, with a credit note for 10 issued at the same time',
            '40, but only once the customer confirms the shortfall',
          ],
          ans: 0,
          exp: 'The invoice bills what was actually sent, and the delivery note is the record of that. Billing the order rather than the delivery is one of the most common invoicing errors. A credit note would only be needed if 50 had been invoiced in error.',
        },
        {
          q: 'Match each invoice detail to the document it comes from.',
          type: 'match',
          left: [
            'Customer name, address and reference',
            'The quantity of each item to be billed',
            'The unit price of each item',
            'A price previously agreed with this customer',
          ],
          right: [
            'Sales order',
            'Delivery note',
            'Price list',
            'Quotation',
          ],
          exp: 'These are the four source documents scope item 3.2.1 names. Customer details and what was ordered come from the sales order; quantities from the delivery note; prices from the price list — unless a quotation agreed a different price, which then takes precedence.',
        },
        {
          q: 'Why are wrongly issued invoices never simply deleted?',
          opts: [
            'The numbering sequence must stay unbroken',
            'Deleting an invoice is a criminal offence',
            'The software does not permit it',
            'The invoice may have already been paid',
          ],
          ans: 0,
          exp: 'A gap in the invoice sequence is exactly what an auditor or HMRC looks for. And the customer may already have entered the original in their own books, so they need a credit note to record against it rather than a hole where an invoice used to be.',
        },
        {
          q: 'Complete the sentences about invoice details.',
          type: 'gapfill',
          template: 'Payment terms run from the {0}. The {1} exists so the customer can match the invoice to their own purchase order.',
          gaps: [
            { options: ['invoice date', 'delivery date', 'order date'], answer: 0 },
            { options: ['customer reference', 'product code', 'invoice number'], answer: 0 },
          ],
          exp: 'Terms run from the invoice, which is why raising one late delays the money by the same number of days. The customer reference is for the customer’s benefit — the invoice number is yours, and the product code identifies the item rather than the order.',
        },
        {
          q: 'Which two details does a credit note carry in place of the invoice number and invoice date?',
          opts: [
            'Credit note number and credit note date',
            'The original invoice number and date, reused',
            'A negative invoice number and the date of return',
            'No number is required, only the date of the return',
          ],
          ans: 0,
          exp: 'The specification names the credit note number and credit note date separately from the invoice fields, because credit notes run in their own unbroken sequence. The original invoice is referenced on the credit note but its number is not reused.',
        },
      ],
    },

    {
      id: 'L1-BKFN-3D',
      title: 'Invoice amounts: units, discounts and VAT',
      summary: 'Extending quantities to a price, applying a quantity discount, and adding VAT at the standard rate.',
      kind: 'practical',
      criteria: ['BKFN-3.2.3'],
      cards: [
        {
          h: 'Three steps, always in this order',
          p: [
            'Completing the amounts on an invoice is arithmetic, and it is reliable if the order is fixed. The order is: extend, discount, then add VAT.',
            '**Extend** means multiply. Quantity × unit price for each line, which the specification calls the "price for multiple units".',
            '**Discount** means apply any reduction for buying in quantity, to the extended amount.',
            '**VAT** is then calculated on the discounted figure — the `net` amount. Never on the pre-discount figure.',
            'That last point is the one that causes wrong answers. VAT is charged on what the customer is actually being charged. If a discount reduces the price, it reduces the VAT with it. Calculating VAT before the discount overstates both the VAT and the total.',
          ],
          formula: 'Qty × unit price = extended · less discount = **net** · net × ' + VAT + ' = VAT · net + VAT = **total**',
          terms: [
            { t: 'Net', d: 'The amount before VAT is added — what the goods themselves cost, after any discount.' },
            { t: 'VAT', d: 'Value Added Tax, added to the net amount. The standard rate is ' + VAT + '.' },
            { t: 'Total', d: 'Net plus VAT — the amount the customer actually pays.' },
          ],
        },
        {
          h: 'Worked: one line, no discount',
          worked: {
            title: 'A single-line invoice',
            problem: 'A customer buys 15 boxes of A4 paper at £4.80 a box. VAT applies at the standard rate of ' + VAT + '. Complete the net, VAT and total amounts for the invoice.',
            steps: [
              { do: 'Extend the line: 15 × £4.80 = **£72.00**', why: 'Quantity times unit price. This is the net amount, because there is no discount to apply.' },
              { do: 'Calculate VAT: £72.00 × 20 ÷ 100 = **£14.40**', why: 'VAT is always calculated on the net figure. Twenty per cent of £72 is £14.40.' },
              { do: 'Add them: £72.00 + £14.40 = **£86.40**', why: 'Net plus VAT gives the total the customer pays.' },
            ],
            answer: 'Net £72.00 · VAT £14.40 · Total £86.40',
            tryIt: {
              q: 'A customer buys 24 folders at £2.75 each. What is the **net** amount, in pounds?',
              answer: 66,
              unit: '£',
              hint: 'Extend the line first — quantity times unit price. No discount, so that is the net.',
              exp: '24 × £2.75 = £66.00. VAT would then be £13.20, giving a total of £79.20 — but the net is the figure before VAT.',
            },
          },
          p: [
            'A useful arithmetic shortcut for the standard rate: VAT is a fifth of the net, so divide by 5. £72 ÷ 5 = £14.40. And the total is the net plus a fifth, which is the net × 1.2 — £72 × 1.2 = £86.40. Both are worth having, because they are faster and less error-prone under time pressure than working with percentages.',
          ],
          examtrap: 'VAT at ' + VAT + ' is one fifth of the net, so the total is 1.2 × net. It is **not** the net divided by 6 — that formula works backwards from a VAT-inclusive figure, which the specification explicitly excludes at this level.',
        },
        {
          h: 'Worked: two lines with a quantity discount',
          worked: {
            title: 'Applying a discount for buying in quantity',
            problem: 'A customer orders 40 packs of labels at £1.60 a pack and 6 boxes of ink at £12.50 a box. The price list gives a 10% discount on labels where 25 or more packs are bought. VAT applies at ' + VAT + '. Complete the invoice amounts.',
            steps: [
              { do: 'Extend the labels: 40 × £1.60 = **£64.00**', why: 'Quantity times unit price, before any discount.' },
              { do: 'Check the discount condition: 40 packs is 25 or more, so the 10% discount applies', why: 'A quantity discount only applies if the threshold is met. Always check it against the quantity actually being billed.' },
              { do: 'Apply it: £64.00 − 10% (£6.40) = **£57.60**', why: 'Ten per cent of £64 is £6.40, so the discounted labels line is £57.60.' },
              { do: 'Extend the ink: 6 × £12.50 = **£75.00**', why: 'No discount is offered on ink, so this line stands as extended.' },
              { do: 'Net total: £57.60 + £75.00 = **£132.60**', why: 'Add the lines after any discounts. This is the net figure VAT is calculated on.' },
              { do: 'VAT: £132.60 ÷ 5 = **£26.52**', why: 'Twenty per cent is a fifth. Calculated on the discounted net, not on the £139 the lines came to before the discount.' },
              { do: 'Total: £132.60 + £26.52 = **£159.12**', why: 'Net plus VAT.' },
            ],
            answer: 'Net £132.60 · VAT £26.52 · Total £159.12',
            tryIt: {
              q: 'A customer orders 30 packs at £2.00 a pack, with a 10% discount for orders of 25 packs or more. What is the **net** amount, in pounds?',
              answer: 54,
              unit: '£',
              hint: 'Extend first, then check whether the discount threshold is met, then apply it.',
              exp: '30 × £2.00 = £60.00. Thirty packs meets the 25-pack threshold, so deduct 10% (£6.00) to give a net of £54.00. VAT would be £10.80 and the total £64.80.',
            },
          },
          p: [
            'Notice step 2. The discount was not applied because the invoice mentioned one — it was applied because the quantity met the condition. If the customer had ordered 20 packs, no discount would arise however clearly the price list advertises it.',
            'That check works in both directions, and it is one of the specific errors lesson 3E asks you to look for on a purchase invoice: a discount claimed when the threshold was not met, or a discount forgotten when it was.',
          ],
        },
        {
          h: 'The direction you are not asked to work in',
          p: [
            'One boundary is worth stating explicitly because it is easy to read ahead into it.',
            'At this level VAT is always calculated **forwards**: from a net amount, add ' + VAT + '. You will never be given a VAT-inclusive total and asked to find the VAT inside it. Scope items 3.2.3 and 3.3.2 both exclude "calculation of VAT from VAT-inclusive amounts".',
            'That matters practically. The backwards calculation divides a gross figure by 6, and it is a genuinely different operation. Learning it now risks reaching for it in an exam where every question runs the other way — and dividing a net figure by 6 gives a wrong answer.',
            'So the rule at this level is simple: if you have been given a net figure, multiply by a fifth. If a figure is described as including VAT, look again — you have probably read the label wrongly, which is exactly the habit lesson 0A recommended.',
          ],
          notyet: 'Calculating VAT from a VAT-inclusive amount is excluded at this level, so the ÷ 6 rule is not required and will not be needed. Every VAT calculation here starts from a net figure and adds ' + VAT + '.',
        },
      ],
      check: [
        {
          q: 'A customer buys 18 items at £6.50 each, with no discount. What is the VAT at the standard rate, in pounds?',
          type: 'numeric',
          answer: 23.4,
          unit: '£',
          exp: '18 × £6.50 = £117.00 net. VAT at ' + VAT + ' is a fifth of that: £117.00 ÷ 5 = £23.40. The total would be £140.40.',
        },
        {
          q: 'An invoice line extends to £250.00 before a 10% quantity discount. What is the VAT, in pounds?',
          type: 'numeric',
          answer: 45,
          unit: '£',
          exp: 'Apply the discount first: £250.00 − £25.00 = £225.00 net. VAT is a fifth of the net: £225.00 ÷ 5 = £45.00. Calculating VAT on the pre-discount £250 would give £50.00, overstating both the VAT and the total — VAT is charged on what the customer is actually charged.',
        },
        {
          q: 'Put the steps for completing invoice amounts in the correct order.',
          type: 'ordering',
          items: [
            'Multiply quantity by unit price for each line',
            'Deduct any quantity discount that the order qualifies for',
            'Add the lines together to give the net amount',
            'Calculate VAT on the net amount',
            'Add net and VAT to give the total',
          ],
          exp: 'Extend, discount, total the net, then VAT, then add. The order matters at one point in particular: VAT must be calculated after the discount, because VAT is charged on the amount the customer is actually being charged.',
        },
        {
          q: 'A price list offers 10% off orders of 25 units or more. A customer orders 20 units at £5.00. What is the net amount, in pounds?',
          type: 'numeric',
          answer: 100,
          unit: '£',
          exp: '20 × £5.00 = £100.00, and no discount applies — 20 units does not meet the 25-unit threshold. The discount is applied because the condition is met, not because the price list advertises one. Applying it wrongly would give £90.00.',
        },
        {
          q: 'Identify whether each statement about VAT at this level is true.',
          type: 'truefalse',
          statements: [
            { text: 'VAT at the standard rate is one fifth of the net amount.', answer: true },
            { text: 'VAT is calculated after any quantity discount has been deducted.', answer: true },
            { text: 'You may be asked to find the VAT within a VAT-inclusive total.', answer: false },
            { text: 'VAT at the standard rate is found by dividing the net amount by six.', answer: false },
          ],
          exp: 'Twenty per cent is a fifth, so net ÷ 5 gives the VAT and net × 1.2 gives the total — dividing by six is the reverse calculation, which works from a VAT-inclusive figure and is explicitly excluded at this level. VAT follows the discount, because it is charged on what is actually charged.',
        },
      ],
    },

    {
      id: 'L1-BKFN-3E',
      title: 'Checking a purchase invoice',
      summary: 'The four documents you check against, and the twelve things that can be wrong.',
      kind: 'document',
      criteria: ['BKFN-3.3.1', 'BKFN-3.3.2'],
      cards: [
        {
          h: 'Why an invoice received gets checked before it gets paid',
          p: [
            'A purchase invoice is a demand for money from outside the business. Nobody inside has prepared it, nobody inside has checked it, and paying it transfers real money. So it is checked first — and checking purchase invoices is a named duty of the bookkeeper.',
            'The check is not a matter of judgement. It is a comparison against documents the business already holds, which is why the specification names them: the `quotation`, the `purchase order`, the `goods received note` and the `goods returned note`.',
            'Those four are exactly the ones your own business generated. The invoice is the supplier’s claim; your own records are what test it. If the two agree, the invoice can be paid. If they do not, the difference is a query to be raised before any money moves.',
          ],
          table: {
            headers: ['Check against', 'What it establishes'],
            rows: [
              ['Purchase order', 'That we ordered this, from this supplier, at these prices, in these quantities'],
              ['Goods received note', 'That the goods actually arrived, and how many'],
              ['Quotation', 'That the price charged is the price agreed'],
              ['Goods returned note', 'That anything sent back has been credited rather than still being billed'],
            ],
          },
          callout: { kind: 'key', text: 'An invoice is checked against your own documents, not against your memory. If the business has no purchase order and no goods received note, there is nothing to check it with — which is why those documents are raised in the first place.' },
        },
        {
          h: 'The twelve things that can be wrong',
          p: [
            'The specification lists what you are to recognise as errors, and it is the same list of fields as for preparing an invoice — which makes sense, since anything that can be entered can be entered wrongly. Grouped by what the error does, they are:',
          ],
          split: {
            left: { title: 'Wrong party or wrong document', items: ['Customer name — the invoice is addressed to a different business', 'Customer address', 'Customer reference — does not match our purchase order', 'Invoice number — missing, or duplicated from an earlier invoice', 'Invoice date', 'Credit note number and date, on a credit note'] },
            right: { title: 'Wrong goods or wrong money', items: ['Product description — not what we ordered', 'Product code — a different item from the one described', 'Unit price — does not match the order or quotation', 'Number of units — more than the goods received note shows', 'Price for multiple units — the extension is arithmetically wrong', 'Quantity discount — omitted, or claimed when not due', 'Amounts: net, VAT at the standard rate, total'] },
          },
          p: [
            'The left column contains errors of identity. Some are trivial to correct and some are serious: an invoice addressed to another business is not our debt at all, and a **duplicated invoice number** is the classic sign of an invoice being presented twice. Recall from lesson 1B that duplicated payment to suppliers is a named consequence of poor records — this check is where it gets prevented.',
            'The right column contains errors of substance, and the most valuable check in it is **units against the goods received note**. A supplier billing for 50 when 40 arrived is an overcharge that only your own GRN can reveal. Nothing on the invoice itself is wrong; it simply describes a delivery that did not happen.',
          ],
          examtrap: 'The goods received note, not the purchase order, is what quantities are checked against. An invoice matching the order exactly can still be wrong if only part of the order was delivered.',
        },
        {
          h: 'A purchase invoice with errors in it',
          p: [
            'Here is an invoice received by Ashcroft Design Studio, together with the documents it should be checked against. Work through it before reading the analysis on the next card.',
          ],
          doc: {
            kind: 'invoice',
            title: 'Invoice received',
            tag: 'Purchase invoice',
            fromLabel: 'From',
            from: ['**Kesgrave Papers Ltd**', '8 Sandy Lane, Ipswich IP4 2LL'],
            toLabel: 'Invoice to',
            to: ['**Ashcroft Design Studio**', 'Unit 4, Canal Wharf, Nottingham NG1 7FF'],
            fields: [
              ['Invoice number', '9051'],
              ['Invoice date', '3 June'],
              ['Customer reference', 'ADS-PO-2311'],
            ],
            table: {
              headers: ['Description', 'Code', 'Qty', 'Unit price', 'Amount'],
              rows: [
                ['Mounting board, A2, grey', 'MNT-A2-GY', '30', '£3.40', '£102.00'],
                ['Foam board, A1, white', 'FOM-A1-WH', '10', '£7.50', '£82.50'],
              ],
            },
            totals: [['Net', '£184.50'], ['VAT at ' + VAT, '£36.90'], ['Total due', '£221.40']],
            foot: 'Compare this against the three documents below before deciding whether it can be paid.',
          },
          table: {
            headers: ['Our records', 'What they say'],
            rows: [
              ['Purchase order ADS-PO-2311', '30 × mounting board A2 grey at £3.40 · 10 × foam board A1 white at £7.50'],
              ['Goods received note GRN-884', '30 × mounting board A2 grey received · **8** × foam board A1 white received'],
              ['Quotation from Kesgrave', 'Mounting board £3.40 per sheet · foam board £7.50 per sheet'],
            ],
          },
        },
        {
          h: 'What was wrong, and what to do about it',
          p: [
            'Two errors, of quite different kinds.',
            'First, an **arithmetical error** in the extension. The foam board line shows 10 × £7.50 as £82.50, and 10 × £7.50 is £75.00. The supplier has extended the line wrongly, so the invoice overstates the amount by £7.50 before VAT. This one is visible on the invoice alone, without reference to any other document — the sort of error a "check that totals agree to expectation" habit catches immediately.',
            'Second, a **quantity error**. The invoice bills 10 sheets of foam board, but the goods received note records 8 arriving. This one is invisible on the invoice — it looks entirely consistent with the purchase order, which was for 10. Only the GRN reveals it.',
            'Corrected, the foam board line should be 8 × £7.50 = £60.00, making the net £102.00 + £60.00 = £162.00, VAT £32.40, and the total £194.40 — against the £221.40 billed. Almost £27 of an overcharge, from one supplier slip and one under-delivery.',
            'The action is not to pay a figure of your own devising. It is to **query the invoice with the supplier**, who will normally issue a credit note for the difference. Amending a supplier’s invoice yourself leaves the two businesses holding documents that do not agree, which causes a dispute later.',
          ],
          example: {
            title: 'The invoice as billed, and as it should be',
            rows: [
              ['', 'As billed', 'Correct'],
              ['Mounting board 30 × £3.40', '£102.00', '£102.00'],
              ['Foam board (8 received, not 10)', '£82.50', '£60.00'],
              ['Net', '£184.50', '£162.00'],
              ['VAT at ' + VAT, '£36.90', '£32.40'],
              ['**Total**', '**£221.40**', '**£194.40**'],
            ],
          },
          callout: { kind: 'tip', text: 'When an invoice is wrong, query it and expect a credit note. Do not amend the supplier’s document and pay a different figure — that leaves the two sets of records disagreeing.' },
        },
      ],
      check: [
        {
          q: 'Which document do you check the quantities on a purchase invoice against?',
          opts: [
            'The goods received note',
            'The purchase order',
            'The quotation',
            'The delivery note supplied by the seller',
          ],
          ans: 0,
          exp: 'The goods received note records what actually arrived, as checked by your own staff. An invoice can match the purchase order perfectly and still overcharge, because the order says what was wanted rather than what was delivered.',
        },
        {
          q: 'An invoice line reads: 12 units at £4.25, amount £53.00. What is wrong, and what should the amount be?',
          type: 'numeric',
          answer: 51,
          unit: '£',
          exp: '12 × £4.25 = £51.00, so the extension is overstated by £2.00. This is an arithmetical error visible on the invoice alone — no other document is needed to spot it, which is why glancing at whether each line looks the right size is worth the seconds it costs.',
        },
        {
          q: 'A purchase invoice arrives bearing the same invoice number as one paid last month. Why does this matter?',
          opts: [
            'It may be a duplicate of an invoice already paid',
            'Invoice numbers are not required on purchase invoices',
            'The supplier must reissue it with a credit note',
            'It affects the VAT but not the amount payable',
          ],
          ans: 0,
          exp: 'A duplicated invoice number is the classic sign of an invoice presented twice. Duplicated payment to suppliers is a named consequence of poor records, and this check is where it is prevented — before any money moves.',
        },
        {
          q: 'Match each error to the document that reveals it.',
          type: 'match',
          left: [
            'The invoice bills 10 units but only 8 arrived',
            'The unit price is higher than the price agreed with this supplier',
            'The invoice charges for an item nobody ordered',
            'The invoice still bills for goods that were sent back',
          ],
          right: [
            'Goods received note',
            'Quotation',
            'Purchase order',
            'Goods returned note',
          ],
          exp: 'Each of the four documents scope item 3.3.1 names answers a different question: the GRN what arrived, the quotation what price was agreed, the purchase order what was wanted, and the goods returned note what went back and should therefore have been credited.',
        },
        {
          q: 'A purchase invoice is found to overcharge by £27.00. What should the bookkeeper do?',
          opts: [
            'Query it with the supplier and expect a credit note',
            'Amend the invoice and pay the corrected amount',
            'Pay it in full and claim the difference on the next order',
            'Refuse to pay anything until a replacement invoice arrives',
          ],
          ans: 0,
          exp: 'Querying it and obtaining a credit note leaves both businesses holding documents that agree. Amending a supplier’s invoice yourself creates two disagreeing records and a dispute later, and paying in full on a promise loses control of the money.',
        },
      ],
    },

    {
      id: 'L1-BKFN-3F',
      title: 'The books of prime entry',
      summary: 'Four daybooks, why there are four rather than one, and what goes in each column.',
      kind: 'document',
      criteria: ['BKFN-3.4.1', 'BKFN-3.4.2'],
      cards: [
        {
          h: 'Where invoices go once they are checked',
          p: [
            'An invoice, once prepared or checked, has to be recorded. It is not recorded on its own — it joins a list of similar documents, and those lists are called the `books of prime entry`.',
            '"Prime" here means first. These are the first place a transaction is written down in the accounting records, before anything is summarised or totalled elsewhere. The name `daybook` is used interchangeably, and describes the practice: documents are entered as they arise, day by day.',
            'There are four for invoices and credit notes, and the reason there are four rather than one is the whole idea. Each daybook holds one kind of document, so at the end of a period the total of each daybook is a meaningful figure on its own — total sales for the month, total purchases, total returns. If everything went into one book those totals would have to be picked apart again.',
          ],
          table: {
            headers: ['Daybook', 'What it records'],
            rows: [
              ['`Sales daybook`', 'Sales invoices issued to customers'],
              ['`Purchases daybook`', 'Purchase invoices received from suppliers'],
              ['`Sales returns daybook`', 'Credit notes issued to customers (goods coming back to us)'],
              ['`Purchases returns daybook`', 'Credit notes received from suppliers (goods we sent back)'],
            ],
          },
          p: [
            'The four divide on two questions, and asking them in order will place any document correctly. **Are we selling or buying?** — that picks the pair. **Is this an invoice or a credit note?** — that picks which of the pair.',
          ],
          flow: ['Selling or buying?', 'Invoice or credit note?', 'One of four daybooks'],
        },
        {
          h: 'Getting the returns books the right way round',
          p: [
            'The two returns daybooks are where mistakes happen, and the trouble is the word "returns" — it does not say who is returning anything.',
            'The naming follows the **original transaction**, not the direction of movement. A `sales return` is a return arising from a sale we made: our customer is sending goods back to us, and we issue a credit note. A `purchases return` is a return arising from a purchase we made: we are sending goods back to a supplier, and they issue a credit note to us.',
            'So the reliable test is not which way the goods are travelling. It is: **whose credit note is this?** A credit note we issued goes in the sales returns daybook, because we only issue credit notes to customers. A credit note we received goes in the purchases returns daybook, because only suppliers send us credit notes.',
            'That test never fails, and it does not require working out who posted what to whom.',
          ],
          table: {
            headers: ['Document', 'Who issued it', 'Daybook'],
            rows: [
              ['Sales invoice', 'Us, to a customer', 'Sales daybook'],
              ['Credit note we issued', 'Us, to a customer', 'Sales returns daybook'],
              ['Purchase invoice', 'A supplier, to us', 'Purchases daybook'],
              ['Credit note we received', 'A supplier, to us', 'Purchases returns daybook'],
            ],
          },
          examtrap: 'Ask who issued the credit note. One we issued is a sales return; one we received is a purchases return. Trying to reason from which direction the goods travelled is where students get these two the wrong way round.',
        },
        {
          h: 'The columns',
          p: [
            'All four daybooks have the same shape, which is one less thing to learn. The specification names the columns:',
          ],
          table: {
            headers: ['Column', 'What goes in it'],
            rows: [
              ['`Date`', 'The date of the invoice or credit note — not the date you entered it'],
              ['Customer or supplier name', 'Customer in the sales books, supplier in the purchases books'],
              ['Invoice or credit note number', 'The document’s own number, so an entry can be traced back to the paper'],
              ['`Net`', 'The amount before VAT'],
              ['`VAT`', 'The VAT on that net amount'],
              ['`Total`', 'Net plus VAT — the amount owed or owing'],
            ],
          },
          p: [
            'Three amount columns rather than one, and the reason is that the three figures are wanted for different purposes. The **net** is the value of the trade, which is what appears in the profit calculation. The **VAT** is money held for HMRC and never belongs to the business. The **total** is what the customer actually owes or the supplier is actually owed. Recording only the total would lose the split, and it cannot be recovered afterwards — which is precisely why VAT gets its own column from the outset.',
            'The `date` column takes the **document** date, not the date of entry. This is the same point as payment terms running from the invoice date: the entry describes when the transaction happened, not when the bookkeeper got to it.',
          ],
          notyet: 'Scope item 3.4.5 excludes **analysis columns** in the books of prime entry — extra columns splitting sales or purchases by product type, department or category. So every daybook you meet here has exactly the six columns above. Analysis columns do appear in the cash book, which is Outcome 4, so this exclusion is specific to the daybooks.',
        },
        {
          h: 'A sales daybook, filled in',
          example: {
            title: 'Sales daybook — May',
            rows: [
              ['Date', 'Customer', 'Invoice no.', 'Net', 'VAT', 'Total'],
              ['3 May', 'Ashcroft Design', '4409', '120.00', '24.00', '144.00'],
              ['9 May', 'Verity Signs', '4410', '86.40', '17.28', '103.68'],
              ['14 May', 'Ashcroft Design', '4417', '166.00', '33.20', '199.20'],
              ['22 May', 'Holt & Reed', '4418', '240.00', '48.00', '288.00'],
              ['**Totals**', '', '', '**612.40**', '**122.48**', '**734.88**'],
            ],
          },
          p: [
            'Read across any row and you have the invoice in miniature: when, who, which document, and the three amounts. Read down a column and you have a month’s figure.',
            'Notice that Ashcroft Design appears twice, on 3 and 14 May. The daybook is in **date order**, not customer order — it is a chronological record of documents as they arose. Working out what one customer owes in total is a separate task, and it is what lesson 4E does.',
            'The totals row is where the next lesson begins. Those three totals are the month’s sales, the month’s output VAT and the month’s total invoiced, and getting them right — and proving they are right — is the last skill in this outcome.',
          ],
        },
      ],
      check: [
        {
          q: 'A credit note is received from a supplier for goods returned to them. Which daybook records it?',
          opts: [
            'Purchases returns daybook',
            'Sales returns daybook',
            'Purchases daybook',
            'Sales daybook',
          ],
          ans: 0,
          exp: 'Ask who issued the credit note. A supplier issued this one, so it is a purchases return. A credit note we issue to a customer goes in the sales returns daybook. Reasoning from which way the goods travelled is where these two get swapped.',
        },
        {
          q: 'Match each document to its daybook.',
          type: 'match',
          left: [
            'A sales invoice we issued',
            'A credit note we issued to a customer',
            'A purchase invoice received from a supplier',
            'A credit note received from a supplier',
          ],
          right: [
            'Sales daybook',
            'Sales returns daybook',
            'Purchases daybook',
            'Purchases returns daybook',
          ],
          exp: 'Two questions place any document: are we selling or buying, and is it an invoice or a credit note? Anything we issued is in the sales pair; anything we received is in the purchases pair.',
        },
        {
          q: 'Why do the daybooks have separate columns for net, VAT and total?',
          opts: [
            'The split between them cannot be recovered later',
            'To make the arithmetic easier to check',
            'Because VAT is not part of the total',
            'Because customers pay the net and HMRC pays the VAT',
          ],
          ans: 0,
          exp: 'Net is the value of the trade and feeds the profit calculation; VAT is money held for HMRC and never belongs to the business; total is what is actually owed. Record only the total and the split is lost for good, which is why VAT gets its own column from the start.',
        },
        {
          q: 'Which date goes in the date column of a daybook?',
          opts: [
            'The date on the invoice or credit note',
            'The date the document was entered in the daybook',
            'The date the goods were delivered',
            'The date payment is due',
          ],
          ans: 0,
          exp: 'The document date, because the entry describes when the transaction happened rather than when the bookkeeper got to it. It is the same principle as payment terms running from the invoice date.',
        },
        {
          q: 'Identify whether each statement about the books of prime entry is true.',
          type: 'truefalse',
          statements: [
            { text: 'They are the first place a transaction is recorded in the accounting records.', answer: true },
            { text: 'Entries are made in date order rather than grouped by customer.', answer: true },
            { text: 'There is one daybook for invoices and one for credit notes.', answer: false },
            { text: 'Analysis columns are required in the daybooks at this level.', answer: false },
          ],
          exp: '"Prime" means first — these are the point of initial record, kept chronologically. There are four daybooks, not two: the sales/purchases split comes before the invoice/credit note split. And analysis columns are explicitly **excluded** from the daybooks at this level, so the last statement is false.',
        },
      ],
    },

    {
      id: 'L1-BKFN-3G',
      title: 'Totalling and cross casting',
      summary: 'Entering documents, adding the columns, and the check that proves the totals are right.',
      kind: 'practical',
      criteria: ['BKFN-3.4.3', 'BKFN-3.4.4', 'BKFN-3.4.5'],
      cards: [
        {
          h: 'Three tasks, one of which is a proof',
          p: [
            'This lesson covers the three things the specification asks you to be able to do with a daybook: make the entries, total the columns, and `cross cast` them.',
            'The first two are straightforward. The third is the interesting one, and it is the only place in this unit where the records check themselves.',
            '**Cross casting** means adding across as well as down, and confirming the two agree. In a daybook, each row’s net plus VAT should equal that row’s total. So the total of the net column plus the total of the VAT column should equal the total of the total column. If it does, the addition is almost certainly right. If it does not, there is definitely an error somewhere.',
          ],
          formula: 'Total of net column + total of VAT column = total of total column',
          terms: [
            { t: 'Cross cast', d: 'To add across the columns and check that the result agrees with the column totals added down.' },
          ],
        },
        {
          h: 'Why cross casting works, and what it can and cannot catch',
          p: [
            'The logic is simple. Every row satisfies net + VAT = total. Add up all the rows and the relationship must survive, because you have added the same numbers in a different order. So the three column totals must satisfy the same equation.',
            'That makes it a genuine proof of the addition — and it costs one subtraction. It is much better value than re-adding all three columns, which is the alternative and is both slower and prone to repeating the same slip.',
            'Be clear about its limits, because this is what the assessment probes. Cross casting proves the **columns have been added correctly**. It says nothing about whether the right figures were entered in the first place.',
            'So it catches: a column mis-added, a row omitted from one column but not another, a figure transposed between columns. It does not catch: an invoice entered under the wrong customer, an invoice recorded in the wrong daybook, an invoice entered at £450 instead of £540, or an invoice missed out altogether. All four of those leave a set of internally consistent figures that cross casts perfectly.',
          ],
          split: {
            left: { title: 'Cross casting catches', items: ['A column added up wrongly', 'A row included in one column and not another', 'Two figures written in the wrong columns', 'A total copied down incorrectly'] },
            right: { title: 'Cross casting cannot catch', items: ['An invoice entered against the wrong customer', 'An invoice put in the wrong daybook', 'A figure transcribed wrongly from the invoice', 'An invoice omitted from the daybook entirely'] },
          },
          examtrap: 'A daybook that cross casts is not a daybook that is right. It proves the arithmetic, not the entries. Catching a wrong or missing entry still needs a comparison back to the source documents.',
        },
        {
          h: 'Worked: entering, totalling, cross casting',
          worked: {
            title: 'A purchases daybook for the week',
            problem: 'Three purchase invoices arrive: 4 June from Kesgrave Papers, invoice 9051, net £162.00; 7 June from Halden Inks, invoice 3390, net £84.00; 11 June from Kesgrave Papers, invoice 9078, net £45.00. VAT applies at ' + VAT + '. Enter them, total the columns, and cross cast.',
            steps: [
              { do: 'Enter each invoice on its own row, in date order, with the supplier name and invoice number', why: 'A daybook is a chronological list of documents. The invoice number is what lets an entry be traced back to the paper.' },
              { do: 'Work out the VAT and total for each row: £162.00 → VAT £32.40, total £194.40', why: 'VAT at the standard rate is a fifth of the net. £162 ÷ 5 = £32.40, and £162 + £32.40 = £194.40.' },
              { do: 'Then £84.00 → VAT £16.80, total £100.80; and £45.00 → VAT £9.00, total £54.00', why: 'Same method for each row. Each row must satisfy net + VAT = total before you go any further.' },
              { do: 'Total the net column: £162.00 + £84.00 + £45.00 = **£291.00**', why: 'Add down. This is the week’s purchases before VAT.' },
              { do: 'Total the VAT column: £32.40 + £16.80 + £9.00 = **£58.20**', why: 'Add down. This is the input VAT for the week.' },
              { do: 'Total the total column: £194.40 + £100.80 + £54.00 = **£349.20**', why: 'Add down. This is the amount owed to suppliers from these invoices.' },
              { do: 'Cross cast: £291.00 + £58.20 = £349.20, which agrees with the total column', why: 'The check passes, so the three columns have been added correctly. Had it come to anything else, one of the three totals would be wrong.' },
            ],
            answer: 'Net £291.00 · VAT £58.20 · Total £349.20 — and it cross casts',
            tryIt: {
              q: 'A sales daybook has a net column totalling £480.00 and a VAT column totalling £96.00. What should the total column come to, in pounds?',
              answer: 576,
              unit: '£',
              hint: 'Cross casting: the net total plus the VAT total equals the total column.',
              exp: '£480.00 + £96.00 = £576.00. If the total column came to anything else, one of the three columns has been added wrongly — and note that £96.00 is a fifth of £480.00, as it should be at the standard rate.',
            },
          },
          example: {
            title: 'Purchases daybook — June',
            rows: [
              ['Date', 'Supplier', 'Invoice no.', 'Net', 'VAT', 'Total'],
              ['4 June', 'Kesgrave Papers', '9051', '162.00', '32.40', '194.40'],
              ['7 June', 'Halden Inks', '3390', '84.00', '16.80', '100.80'],
              ['11 June', 'Kesgrave Papers', '9078', '45.00', '9.00', '54.00'],
              ['**Totals**', '', '', '**291.00**', '**58.20**', '**349.20**'],
            ],
          },
        },
        {
          h: 'A daybook that does not cross cast',
          p: [
            'Finding the error when the check fails is a skill in itself, and there is a method for it rather than a hunt.',
            'Take this sales daybook. The net total is £310.00 and the VAT total is £62.00, so the total column should be £372.00. It shows £352.00. Something is wrong by exactly £20.00.',
          ],
          example: {
            title: 'Sales daybook — does not cross cast',
            rows: [
              ['Date', 'Customer', 'Invoice no.', 'Net', 'VAT', 'Total'],
              ['2 July', 'Verity Signs', '4501', '90.00', '18.00', '108.00'],
              ['8 July', 'Holt & Reed', '4502', '120.00', '24.00', '124.00'],
              ['15 July', 'Ashcroft Design', '4503', '100.00', '20.00', '120.00'],
              ['**Totals**', '', '', '**310.00**', '**62.00**', '**352.00**'],
            ],
          },
          p: [
            'The method is to cross cast **each row** rather than only the totals. Row one: £90 + £18 = £108 ✓. Row two: £120 + £24 = £144, but the row shows £124 ✗. Row three: £100 + £20 = £120 ✓.',
            'So the error is in row two’s total, which should be £144.00 and not £124.00. Correcting it makes the total column £108.00 + £144.00 + £120.00 = £372.00, which now agrees with £310.00 + £62.00.',
            'Two things worth taking from this. Row-by-row cross casting locates an error rather than merely detecting one, so it is where to go the moment the overall check fails. And the discrepancy itself is a clue: a difference of exactly £20 in a daybook where VAT figures include £24 and £20 suggests a transposition or a misread digit rather than a mis-addition, which narrows the search before you start.',
          ],
          callout: { kind: 'tip', text: 'When a daybook does not cross cast, cross cast each row. The row that fails is the row with the error — far faster than re-adding three columns and hoping.' },
        },
      ],
      check: [
        {
          q: 'A daybook has a net column totalling £745.00 and a VAT column totalling £149.00. What should the total column come to, in pounds?',
          type: 'numeric',
          answer: 894,
          unit: '£',
          exp: 'Cross casting: £745.00 + £149.00 = £894.00. Note also that £149.00 is a fifth of £745.00, which is what the standard rate requires — so both checks agree.',
        },
        {
          q: 'What exactly does cross casting prove?',
          opts: [
            'That the columns have been added up correctly',
            'That every invoice has been entered in the daybook',
            'That each invoice has been entered against the right customer',
            'That the VAT on each invoice was calculated at the correct rate',
          ],
          ans: 0,
          exp: 'Cross casting tests the arithmetic of the addition and nothing else. An invoice entered against the wrong customer, in the wrong daybook, at the wrong amount, or omitted entirely will all still cross cast perfectly — catching those needs a comparison back to the source documents.',
        },
        {
          q: 'A daybook row reads: net £160.00, VAT £32.00, total £182.00. What should the total be, in pounds?',
          type: 'numeric',
          answer: 192,
          unit: '£',
          exp: '£160.00 + £32.00 = £192.00, so the row is understated by £10.00. Cross casting row by row is what finds this — the overall check would only tell you the daybook was wrong by £10 somewhere.',
        },
        {
          q: 'A daybook does not cross cast. What is the most efficient next step?',
          opts: [
            'Cross cast each row to locate the failing row',
            'Re-add all three columns from the top',
            'Compare every entry against its source invoice',
            'Recalculate the VAT on every row at the standard rate',
          ],
          ans: 0,
          exp: 'Row-by-row cross casting locates the error rather than merely confirming one exists. Re-adding the columns risks repeating the same slip, and going back to the source documents is a much larger job that this particular failure does not require.',
        },
        {
          q: 'Identify whether each of these errors would be caught by cross casting.',
          type: 'truefalse',
          labels: ['Caught', 'Not caught'],
          statements: [
            { text: 'The VAT column has been added up wrongly.', answer: true },
            { text: 'An invoice has been entered against the wrong customer.', answer: false },
            { text: 'A row has been included in the net column but omitted from the total column.', answer: true },
            { text: 'A sales invoice has been entered in the purchases daybook.', answer: false },
          ],
          exp: 'Cross casting tests whether net plus VAT equals total across the whole book, so it catches anything that disturbs that arithmetic — a mis-added column, or a row present in one column and not another. A right figure in the wrong place leaves the arithmetic intact, so the wrong customer and the wrong daybook both pass.',
        },
      ],
    },
  ];

  /* ── Outcome 4 — Process receipts and payments (34%) ─────────────────────── */
  var O4 = [
    {
      id: 'L1-BKFN-4A',
      title: 'The cash book',
      summary: 'Two sides, the columns on each, and where every entry comes from.',
      kind: 'document',
      criteria: ['BKFN-4.1.1', 'BKFN-4.1.2', 'BKFN-4.1.3'],
      cards: [
        {
          h: 'Money in on one side, money out on the other',
          p: [
            'The daybooks in the last outcome recorded invoices — amounts that became owed. The `cash book` records money actually moving: what came in and what went out.',
            'Its shape is the first thing to learn, and it is unlike the daybooks. A cash book has **two sides**: a `receipts side` for money coming in and a `payments side` for money going out. They sit alongside each other, and every entry belongs on one side or the other.',
            'That is the whole structure, and it makes the first question about any transaction very simple: is this money arriving or money leaving? Get that wrong and everything downstream — the totals, the closing balance, the comparison with the bank statement — comes out wrong, which is why this is the "read the label before the number" habit at its most literal.',
          ],
          split: {
            left: { title: 'Receipts side — money in', items: ['A customer paying an invoice', 'Cash takings from the till', 'Interest received from the bank', 'The owner paying money in'] },
            right: { title: 'Payments side — money out', items: ['Paying a supplier', 'Paying wages, rent or an electricity bill', 'Buying equipment', 'Bank charges taken by the bank'] },
          },
          callout: { kind: 'key', text: 'Every cash book entry is on the receipts side or the payments side. Deciding which comes before any arithmetic.' },
        },
        {
          h: 'The columns on each side',
          table: {
            headers: ['Column', 'What goes in it'],
            rows: [
              ['`Date`', 'The date the money moved'],
              ['Customer or supplier', 'Who paid us, or who we paid'],
              ['`Cash`', 'The amount, where it moved as physical cash'],
              ['`Bank`', 'The amount, where it moved through the bank account'],
              ['`Analysis columns`', 'The amount split by what it was for — including a **VAT** column'],
            ],
          },
          p: [
            'Two features need explaining, and both are new here.',
            'First, **cash and bank are separate columns**. The business holds money in two places: physical cash in a till or petty-cash tin, and money in its bank account. They are genuinely different — you can count one and not the other, and one can be plentiful while the other is short. So each amount goes into the cash column or the bank column depending on where it actually moved. A customer paying by card affects the bank; a customer paying with notes affects the cash.',
            'Second, **analysis columns**. This is the opposite of the daybooks, where analysis columns were excluded. Here they are part of the syllabus, and they are what makes a cash book useful: they split each amount by what it was for. So a payments side might have analysis columns for purchases, wages, rent and VAT, and each payment appears both in the bank or cash column and in the analysis column describing it.',
            'The VAT analysis column is named specifically. Where a receipt or payment includes VAT, the VAT element goes in its own analysis column — the same reasoning as in the daybooks, since VAT is money held for HMRC rather than the business’s own.',
          ],
          examtrap: 'Analysis columns are excluded from the daybooks but required in the cash book. If a question about analysis columns does not say which book it means, check — the answer is the opposite for the two.',
        },
        {
          h: 'A cash book, both sides',
          example: {
            title: 'Receipts side — week ending 12 June',
            rows: [
              ['Date', 'Detail', 'Cash', 'Bank', 'Receivables', 'Cash sales', 'VAT'],
              ['8 June', 'Verity Signs', '', '108.00', '108.00', '', ''],
              ['9 June', 'Till takings', '96.00', '', '', '80.00', '16.00'],
              ['11 June', 'Holt & Reed', '', '288.00', '288.00', '', ''],
              ['**Totals**', '', '**96.00**', '**396.00**', '**396.00**', '**80.00**', '**16.00**'],
            ],
          },
          p: [
            'Read the 9 June row across. Till takings of £96.00 came in as physical cash, so the figure is in the **cash** column. Of that £96.00, £80.00 was the sale and £16.00 was VAT, so the analysis columns split it. Note that the analysis columns add across to the amount received: £80.00 + £16.00 = £96.00.',
            'Now read the 8 June row. Verity Signs paid £108.00 by bank transfer, so it is in the **bank** column, and the whole £108.00 is analysed to receivables. There is no VAT analysis on it — and the reason is important. The VAT on that sale was recorded when the invoice went into the sales daybook. This receipt is settling an invoice, not making a new sale, so analysing VAT again would count it twice.',
            'That distinction is the single most examined point about cash book analysis: **VAT is analysed on a cash sale, not on a receipt from a credit customer**. It is the same logic as lesson 2B — money from a customer who was invoiced last month converts one asset into another rather than creating income.',
          ],
          callout: { kind: 'warning', text: 'Analyse VAT on a cash sale. Do not analyse VAT again on a receipt settling an invoice — that invoice’s VAT was already recorded in the sales daybook.' },
        },
        {
          h: 'Where the entries come from',
          p: [
            'The specification names eight sources for cash book entries, and they divide neatly into evidence of money in and evidence of money out.',
          ],
          split: {
            left: { title: 'Evidence of money in', items: ['`Cash receipts` — till receipts for over-the-counter sales', '`Paying-in book` — the record of what was banked', '`Remittance advices` — from customers, saying which invoices a payment covers', 'Lists of receipts'] },
            right: { title: 'Evidence of money out', items: ['`Cheque stubs` — the counterfoil left when a cheque is written', 'Lists of payments', 'Lists of `Direct Debits` and `standing orders`', 'Lists of `Faster Payments` and `BACS`'] },
          },
          p: [
            'Two sources sit across both and deserve separate mention.',
            'The `bank statement` is the bank’s own record of what went through the account. It is a source of entries, and it is also what the cash book gets checked against — which lesson 4D covers. It catches the entries nobody in the business initiated: bank charges, and interest received.',
            '`Automatic bank feeds` are the modern equivalent. Accounting software connects to the bank and imports transactions as they happen, so the entries arrive without anybody typing them. This is the first appearance of something Outcome 5 develops at length, and it is why the specification names it alongside the paper sources rather than treating it as an afterthought.',
          ],
          terms: [
            { t: 'Standing order', d: 'An instruction from the payer to their bank to pay a fixed amount at regular intervals. The payer controls it.' },
            { t: 'Direct Debit', d: 'An authority for the recipient to collect varying amounts from the payer’s account. The recipient controls the amount.' },
            { t: 'BACS', d: 'A bank transfer system taking around three working days. Commonly used for wages and supplier payments.' },
            { t: 'Faster Payments', d: 'A bank transfer arriving within minutes rather than days.' },
          ],
          notyet: 'Scope item 4.1.4 excludes opening and closing balances **in the cash book itself**, and excludes treating the cash book as part of the double-entry system. You will still calculate closing amounts of cash — that is topic 4.2 and the next lesson — but as a calculation rather than as balances written into the book.',
        },
      ],
      check: [
        {
          q: 'A customer pays £240 by bank transfer to settle an invoice. Where does this go in the cash book?',
          opts: [
            'Receipts side, bank column, analysed to receivables',
            'Receipts side, cash column, analysed to cash sales',
            'Payments side, bank column',
            'Receipts side, bank column, analysed to cash sales and VAT',
          ],
          ans: 0,
          exp: 'Money is arriving, so the receipts side; it came through the bank, so the bank column; and it settles an invoice, so it is analysed to receivables. There is no VAT analysis, because that invoice’s VAT was recorded in the sales daybook when the invoice was raised.',
        },
        {
          q: 'Till takings of £132 are banked, of which £110 is the sale and £22 is VAT. Identify the correct treatment.',
          type: 'truefalse',
          labels: ['Yes', 'No'],
          statements: [
            { text: 'The £132 goes on the receipts side.', answer: true },
            { text: '£110 is analysed to cash sales and £22 to VAT.', answer: true },
            { text: 'The analysis columns should add across to £132.', answer: true },
            { text: 'It should be analysed to receivables.', answer: false },
          ],
          exp: 'Money in, so the receipts side, and the analysis splits it between the sale and the VAT — which must add back to the amount received. Receivables would be wrong: nobody was invoiced, so no receivable existed to settle. This is a cash sale, which is exactly when VAT *is* analysed.',
        },
        {
          q: 'Why does the cash book have separate columns for cash and bank?',
          opts: [
            'The business keeps money in two different places',
            'Cash transactions do not attract VAT',
            'Bank transactions are recorded a day later than cash ones',
            'The bank column is only used for amounts over a set limit',
          ],
          ans: 0,
          exp: 'Physical cash in a till and money in the bank account are separate resources — one can be plentiful while the other is short, and each is checked in its own way. That is why lesson 4B calculates a closing figure for each of them separately.',
        },
        {
          q: 'Match each payment method to its description.',
          type: 'match',
          left: ['Standing order', 'Direct Debit', 'BACS', 'Faster Payments'],
          right: [
            'A fixed amount paid at regular intervals, controlled by the payer',
            'A varying amount collected by the recipient under an authority given to them',
            'A bank transfer taking around three working days',
            'A bank transfer arriving within minutes',
          ],
          exp: 'The standing order/Direct Debit distinction is who controls the amount: the payer fixes a standing order, whereas a Direct Debit lets the recipient collect what is due. BACS and Faster Payments differ in speed — three working days against near-immediate.',
        },
        {
          q: 'Which statement about analysis columns is correct?',
          opts: [
            'Required in the cash book, excluded from the daybooks',
            'Required in both the cash book and the daybooks',
            'Excluded from both the cash book and the daybooks',
            'Required in the daybooks, excluded from the cash book',
          ],
          ans: 0,
          exp: 'Scope item 4.1.2 names analysis columns, including a VAT analysis column, as part of the cash book. Scope item 3.4.5 explicitly excludes them from the books of prime entry. The two books are treated oppositely, which is exactly what makes it worth checking which book a question means.',
        },
      ],
    },

    {
      id: 'L1-BKFN-4B',
      title: 'Closing cash in hand and at the bank',
      summary: 'Opening amount, plus receipts, less payments — worked separately for cash and for bank.',
      kind: 'practical',
      criteria: ['BKFN-4.1.4', 'BKFN-4.2.1', 'BKFN-4.2.2'],
      cards: [
        {
          h: 'One calculation, done twice',
          formula: 'Opening amount + receipts − payments = closing amount',
          p: [
            'Having entered receipts and payments, the natural question is how much is left. The calculation is the one above: opening amount, add what came in, take away what went out.',
            'The only complication is that it is done **twice** — once for cash in hand and once for cash at the bank — because those are two separate resources. The specification names them as separate scope items, 4.2.1 and 4.2.2, and questions routinely ask for one and not the other.',
            'So the figures you use are the **cash column** totals for cash in hand, and the **bank column** totals for cash at the bank. Mixing them is the standard error: adding all the receipts together and taking away all the payments gives a combined figure that answers neither question.',
          ],
          callout: { kind: 'tip', text: 'Two separate calculations, from two separate columns. Read the question to see whether it wants cash in hand, cash at the bank, or both.' },
        },
        {
          h: 'Worked: both closing amounts',
          worked: {
            title: 'Closing cash in hand and at the bank',
            problem: 'At the start of the week a business holds £145.00 cash in hand and £2,380.00 in the bank. During the week the cash book records: cash receipts £412.00 and bank receipts £1,860.00; cash payments £268.00 and bank payments £2,105.00. Calculate the closing amount of cash in hand and the closing amount of cash at the bank.',
            steps: [
              { do: 'Separate the figures. Cash: opening £145.00, receipts £412.00, payments £268.00', why: 'Cash in hand uses only the cash column. Nothing from the bank column belongs in this calculation.' },
              { do: 'Cash in hand: £145.00 + £412.00 = £557.00, then − £268.00 = **£289.00**', why: 'Opening plus receipts less payments. Add before you subtract — it is harder to lose track that way.' },
              { do: 'Now the bank: opening £2,380.00, receipts £1,860.00, payments £2,105.00', why: 'The bank calculation is entirely separate, using only the bank column.' },
              { do: 'Cash at bank: £2,380.00 + £1,860.00 = £4,240.00, then − £2,105.00 = **£2,135.00**', why: 'The same formula, applied to the bank figures.' },
              { do: 'Sense-check both: £289.00 of cash in a till is plausible, and the bank has fallen slightly on the week, which fits payments exceeding receipts', why: 'Checking that totals agree to expectation, from lesson 1D. A negative cash figure or a wildly different balance would signal an error immediately.' },
            ],
            answer: 'Cash in hand £289.00 · Cash at bank £2,135.00',
            tryIt: {
              q: 'A business opens the month with £86.00 cash in hand. Cash receipts for the month are £524.00 and cash payments are £371.00. What is the closing cash in hand, in pounds?',
              answer: 239,
              unit: '£',
              hint: 'Opening, plus receipts, less payments — using cash figures only.',
              exp: '£86.00 + £524.00 = £610.00, less £371.00 = £239.00. Any bank figures in the question would be irrelevant to this calculation.',
            },
          },
        },
        {
          h: 'Where the figures come from, and the checks worth doing',
          p: [
            'In a real cash book the receipts and payments figures are **column totals**, so the calculation depends on those totals being right. Two checks from earlier in the material apply directly.',
            '**Cross casting** works here just as it did in the daybooks. On each side, the analysis columns should add across to the cash and bank columns: if a receipts side shows £96.00 of cash and the analysis columns for that row show £80.00 and £16.00, those agree. Do it for the totals as well as for individual rows.',
            '**Checking against expectation** is the other. Cash in hand cannot be negative — you cannot take more notes out of a till than are in it — so a negative closing cash figure is proof of an error, usually a receipt entered on the payments side or a figure omitted. Learn this as a hard rule: it turns a vague sense that something is wrong into a certainty.',
            'The bank is different: a bank balance genuinely can be negative, when the account is overdrawn. But **overdrawn amounts are excluded at this level**, so within this unit a negative bank figure also indicates an error rather than an overdraft.',
          ],
          notyet: 'Overdrawn amounts are excluded from scope items 4.2.2 and 4.3.4. So every closing bank figure you are asked for here is positive, and a negative result means a mistake in the arithmetic or in which side an entry went on — not an overdraft.',
          examtrap: 'A negative closing cash in hand is always an error. The most common causes are a receipt entered on the payments side, or the bank figures accidentally included in the cash calculation.',
        },
        {
          h: 'Worked: from a cash book, with analysis',
          worked: {
            title: 'Totalling a cash book and finding the closing bank figure',
            problem: 'The payments side of a cash book for the week shows three bank payments: £349.20 to suppliers, £680.00 wages, and £144.00 rent including £24.00 VAT. There are no cash payments. Bank receipts for the week are £504.00 and the opening bank amount is £1,910.00. Total the bank column and calculate the closing amount at the bank.',
            steps: [
              { do: 'Total the bank payments column: £349.20 + £680.00 + £144.00 = **£1,173.20**', why: 'The bank column holds the full amount of each payment, VAT included — the VAT analysis column shows the split without changing the total paid.' },
              { do: 'Note that the £24.00 VAT is an analysis figure, not an extra payment', why: 'Analysis columns describe what a payment was for. Adding the VAT again would double-count it — the £144.00 already contains it.' },
              { do: 'Opening plus receipts: £1,910.00 + £504.00 = **£2,414.00**', why: 'Money available before payments are taken off.' },
              { do: 'Less payments: £2,414.00 − £1,173.20 = **£1,240.80**', why: 'The closing amount at the bank.' },
              { do: 'Sense-check: payments exceeded receipts by about £670, and the balance has fallen by about that much', why: 'The direction and rough size are both as expected, so the arithmetic is probably sound.' },
            ],
            answer: 'Bank payments £1,173.20 · Closing at bank £1,240.80',
            tryIt: {
              q: 'Bank payments for a week are £220.00, £96.00 (including £16.00 VAT) and £415.00. What is the total of the bank payments column, in pounds?',
              answer: 731,
              unit: '£',
              hint: 'The bank column holds the full amount of each payment. The VAT is an analysis of the £96.00, not an addition to it.',
              exp: '£220.00 + £96.00 + £415.00 = £731.00. Adding the £16.00 VAT separately would give £747.00 and count that VAT twice — it is already inside the £96.00.',
            },
          },
          p: [
            'Step 2 is the point of the example. Analysis columns are a **breakdown** of the amount received or paid, not additional amounts. A payment of £144.00 analysed as £120.00 rent and £24.00 VAT is one payment of £144.00, described in two parts. Adding all the columns together as if they were separate movements of money is a common and expensive error.',
          ],
        },
      ],
      check: [
        {
          q: 'A business opens with £212.00 cash in hand. Cash receipts are £680.00 and cash payments are £445.00. What is the closing cash in hand, in pounds?',
          type: 'numeric',
          answer: 447,
          unit: '£',
          exp: '£212.00 + £680.00 = £892.00, less £445.00 = £447.00. Opening, plus receipts, less payments — using only the cash column, since cash in hand and cash at the bank are separate calculations.',
        },
        {
          q: 'Opening bank £3,140.00. Bank receipts £2,260.00. Bank payments £1,875.00. What is the closing amount at the bank, in pounds?',
          type: 'numeric',
          answer: 3525,
          unit: '£',
          exp: '£3,140.00 + £2,260.00 = £5,400.00, less £1,875.00 = £3,525.00. Receipts exceeded payments, so the balance has risen — a quick check that the answer is going the right way.',
        },
        {
          q: 'A closing cash in hand figure comes out as negative £64.00. What does this tell you?',
          opts: [
            'There is an error — cash in hand cannot be negative',
            'The business is overdrawn by £64.00',
            'The opening figure was omitted',
            'Payments must be reduced by £64.00 to make it balance',
          ],
          ans: 0,
          exp: 'You cannot take more notes out of a till than are in it, so a negative cash in hand is proof of an error — most often a receipt entered on the payments side or the bank figures included by mistake. An overdraft is a bank concept, and overdrawn amounts are excluded at this level in any case.',
        },
        {
          q: 'A bank payment of £180.00 is analysed as £150.00 purchases and £30.00 VAT. How much money left the bank?',
          type: 'numeric',
          answer: 180,
          unit: '£',
          exp: '£180.00. The analysis columns break the payment down; they do not add to it. Treating £150.00 and £30.00 as separate movements would give £330.00 and count the VAT twice.',
        },
        {
          q: 'Complete the calculation of a closing amount.',
          type: 'gapfill',
          template: 'Closing amount = opening amount {0} receipts {1} payments.',
          gaps: [
            { options: ['plus', 'less', 'times'], answer: 0 },
            { options: ['less', 'plus', 'divided by'], answer: 0 },
          ],
          exp: 'Money in is added and money out is subtracted. The same formula serves for cash in hand and for cash at the bank, but the two are worked separately from their own columns — mixing them answers neither question.',
        },
      ],
    },

    {
      id: 'L1-BKFN-4C',
      title: 'Reading a bank statement',
      summary: 'What the bank sends, the ten kinds of entry on it, and why its sides are the opposite way round.',
      kind: 'document',
      criteria: ['BKFN-4.3.1', 'BKFN-4.3.2'],
      cards: [
        {
          h: 'The bank’s version of events',
          p: [
            'A `bank statement` is the bank’s own record of everything that went through the business’s account, with a balance after each movement. It is a second, independent account of the same transactions the cash book records — which is what makes it useful for checking.',
            'There is one feature that confuses nearly everybody the first time, and it is better confronted immediately. On a bank statement, the columns appear to be the wrong way round.',
            'The reason is whose statement it is. The bank writes it from **its own** point of view. Money you pay in is money the bank now owes you, so it appears as a credit. Money you take out reduces what the bank owes you, so it appears as a debit. Your bank balance is, to the bank, a liability — it owes you your money.',
            'At this level you are not asked about debits and credits, so this need not be laboured. What you do need is the practical rule: **read the column headings, and do not assume they match the cash book**. Many statements avoid the problem by using "paid in" and "paid out", or "money in" and "money out", which are unambiguous.',
          ],
          callout: { kind: 'warning', text: 'A bank statement is written from the bank’s point of view, so its columns can look reversed compared with the cash book. Always read the headings.' },
        },
        {
          h: 'The ten kinds of entry',
          p: [
            'The specification lists ten things you should recognise on a bank statement. Split by direction, they are:',
          ],
          table: {
            headers: ['Money in', 'Money out'],
            rows: [
              ['`Counter credit` — cash or cheques paid in over the counter', '`Cash withdrawal` — money taken out of the account'],
              ['`BACS` or `Faster Payments` received from customers', '`Standing order` — a fixed regular payment set up by us'],
              ['`Bank interest received` — earned on the balance', '`Direct Debit` — a variable amount collected by the recipient'],
              ['', '`Debit card payment` — a purchase paid for by card'],
              ['', '`Cheque` — presented by whoever we wrote it to'],
              ['', '`Bank charges` — the bank’s own fees'],
            ],
          },
          p: [
            'Most of these are self-explanatory once named. Three deserve comment.',
            'A `counter credit` is a paying-in at a branch — cash or cheques handed over the counter. It corresponds to the paying-in book entry in the cash book, and it is the entry most likely to appear on the statement days after it appears in the cash book, for reasons the next lesson explains.',
            '`Bank charges` and `bank interest received` are the two entries **the business did not initiate**. Nobody in the business decided to pay a bank charge, so nobody has a document for it and nobody has entered it in the cash book. The statement is the only place it appears — which makes it the classic example of something in the statement that is not in the cash book, and it is the reason the statement is itself listed as a source of cash book entries.',
            'BACS and Faster Payments are worth distinguishing only by speed: three working days against near-immediate. Both are electronic transfers and both can go either way.',
          ],
          examtrap: 'Bank charges and interest received are almost never in the cash book, because the business never had a document for them. When a question asks what is on the statement but not in the cash book, these two are the first place to look.',
        },
        {
          h: 'A bank statement, read line by line',
          doc: {
            kind: 'statement',
            title: 'Bank statement',
            tag: 'Ashcroft Design Studio · June',
            fromLabel: 'Account',
            from: ['**Ashcroft Design Studio**', 'Account 40218866', 'Sort code 20-44-19'],
            toLabel: 'Period',
            to: ['1 June to 30 June', 'Statement 114'],
            table: {
              headers: ['Date', 'Detail', 'Paid out', 'Paid in', 'Balance'],
              rows: [
                ['1 Jun', 'Opening balance', '', '', '1,910.00'],
                ['4 Jun', 'Counter credit', '', '504.00', '2,414.00'],
                ['7 Jun', 'BACS — Kesgrave Papers', '349.20', '', '2,064.80'],
                ['12 Jun', 'Standing order — rent', '144.00', '', '1,920.80'],
                ['18 Jun', 'BACS — wages', '680.00', '', '1,240.80'],
                ['26 Jun', 'Direct Debit — insurance', '58.00', '', '1,182.80'],
                ['29 Jun', 'Bank charges', '14.50', '', '1,168.30'],
                ['30 Jun', 'Bank interest received', '', '2.15', '1,170.45'],
              ],
            },
            foot: 'Closing balance at 30 June: £1,170.45. Note the last two entries — neither originated with the business, so neither is in the cash book yet.',
          },
          p: [
            'Two things to take from this statement.',
            'First, the **balance column** runs down the page and updates after every entry. The `closing balance` is the last figure in it, and it is what the cash book’s closing bank figure gets compared with. Scope item 4.3.2 asks you to recognise balances on a statement, and in practice that means reading the right figure off the right row — the closing balance is the last one, not the largest and not the one against the last payment.',
            'Second, the final two entries. Bank charges of £14.50 and interest of £2.15 were both initiated by the bank. The business has no receipt, no cheque stub and no remittance advice for either, so neither is in the cash book. The statement is where they are discovered, and entering them is one of the things the comparison in the next lesson is for.',
          ],
        },
      ],
      check: [
        {
          q: 'Why can the columns on a bank statement appear reversed compared with the cash book?',
          opts: [
            'The statement is written from the bank’s point of view',
            'Banks record transactions a day later than the business does',
            'The statement shows only cleared items, which reverses the order',
            'The cash book uses net amounts and the statement uses totals',
          ],
          ans: 0,
          exp: 'To the bank, your balance is a liability — it owes you your money. So paying in increases what it owes and appears as a credit. The practical response is to read the column headings rather than assume they match the cash book; many statements sidestep this with "paid in" and "paid out".',
        },
        {
          q: 'Which two entries on a bank statement are least likely to be in the cash book already?',
          opts: [
            'Bank charges and bank interest received',
            'Counter credits and cheques',
            'BACS receipts and Faster Payments from customers',
            'Standing orders and Direct Debits',
          ],
          ans: 0,
          exp: 'Both are initiated by the bank rather than by the business, so there is no receipt, cheque stub or remittance advice to enter them from. The statement is the only place they appear — which is why the statement is itself a source of cash book entries.',
        },
        {
          q: 'Identify the direction of each bank statement entry.',
          type: 'truefalse',
          labels: ['Money in', 'Money out'],
          statements: [
            { text: 'Counter credit', answer: true },
            { text: 'Direct Debit', answer: false },
            { text: 'Bank interest received', answer: true },
            { text: 'Bank charges', answer: false },
          ],
          exp: 'A counter credit is a paying-in at a branch, and interest received is earned on the balance — both money in. A Direct Debit is a collection by the recipient and bank charges are the bank’s fees — both money out.',
        },
        {
          q: 'Looking at the June statement in this lesson, what is the closing balance?',
          type: 'numeric',
          answer: 1170.45,
          unit: '£',
          exp: '£1,170.45 — the last figure in the balance column, after the interest received on 30 June. Not £1,168.30, which is the balance before the interest, and not £1,240.80, which is the balance in the middle of the month.',
        },
        {
          q: 'Match each statement entry to what it is.',
          type: 'match',
          left: ['Counter credit', 'Standing order', 'Direct Debit', 'Debit card payment'],
          right: [
            'Cash or cheques paid in over the counter',
            'A fixed regular payment set up by the account holder',
            'A varying amount collected by the recipient under an authority',
            'A purchase paid for using the account’s card',
          ],
          exp: 'Only the counter credit is money in. The standing order and Direct Debit differ in who controls the amount — the payer sets a standing order, whereas a Direct Debit lets the recipient collect what is due. A debit card payment takes money at the point of purchase.',
        },
      ],
    },

    {
      id: 'L1-BKFN-4D',
      title: 'Cash book against bank statement',
      summary: 'Why the two never quite agree, and how to identify what is in one and not the other.',
      kind: 'practical',
      criteria: ['BKFN-4.3.3', 'BKFN-4.3.4'],
      cards: [
        {
          h: 'Two records of the same money, and why they differ',
          p: [
            'The cash book’s closing bank figure and the bank statement’s closing balance describe the same thing: how much money the business has in the bank. They are almost never the same number, and the reasons are entirely ordinary.',
            'They differ because of **timing** and because of **knowledge**.',
            'Timing: the business records a transaction when it does its half, and the bank records it when the money actually moves. A cheque written and posted on Monday is in the cash book on Monday. It reaches the recipient on Wednesday, they bank it on Thursday, and it appears on the statement the following week. For those days the cash book knows about a payment the bank has never heard of.',
            'Knowledge: the bank sometimes acts without telling the business first. Bank charges and interest are applied by the bank, and the business only learns of them when the statement arrives. For that period the bank knows about entries the cash book has never heard of.',
            'So a difference is normal. What matters is being able to say **which** items account for it — and that is precisely what scope items 4.3.3 and 4.3.4 ask for.',
          ],
          callout: { kind: 'key', text: 'The two records differ for two reasons: items the business has recorded that the bank has not yet processed, and items the bank has applied that the business did not know about.' },
        },
        {
          h: 'In the cash book but not on the statement',
          p: [
            'These are almost always **timing** items — things the business has recorded that the bank has not yet processed.',
          ],
          table: {
            headers: ['Item', 'Why it is not on the statement yet'],
            rows: [
              ['A cheque written and sent to a supplier', 'The supplier has not banked it yet, or it has not cleared'],
              ['A cheque received and recorded, not yet banked', 'It is still in the office; nothing has reached the bank'],
              ['Cash paid in very close to the statement date', 'It may have been credited after the statement was produced'],
              ['A payment entered in the cash book in error', 'Not a timing difference at all — the entry should not exist'],
            ],
          },
          p: [
            'The first two rows are the classic pair, and they point in opposite directions. An **unpresented cheque** we wrote means the cash book has already deducted money the bank still holds, so the statement balance is higher than the cash book figure. An **unbanked cheque** we received means the cash book has already added money the bank does not have, so the statement balance is lower.',
            'Beginners tend to assume all differences run one way. They do not, and being able to say which way a particular item pushes the two figures apart is the useful skill.',
            'The last row is a reminder that not every difference is innocent. If an item is in the cash book and not on the statement and no timing explanation fits, the possibility is that the cash book entry is wrong — a payment entered twice, or entered when it never happened.',
          ],
        },
        {
          h: 'On the statement but not in the cash book',
          table: {
            headers: ['Item', 'Why it is not in the cash book'],
            rows: [
              ['`Bank charges`', 'Applied by the bank; the business had no document for it'],
              ['`Bank interest received`', 'Credited by the bank; again, no document'],
              ['A `standing order` or `Direct Debit` not yet entered', 'It went out automatically and nobody recorded it'],
              ['A customer’s `BACS` payment straight into the account', 'The money arrived without the business being told'],
              ['A bank error', 'Rare, but possible — an entry that should not be there at all'],
            ],
          },
          p: [
            'The first two are the standard answer to this question and were flagged in the previous lesson: the business never had a document, so nothing was ever entered.',
            'The third and fourth are different in character, and more interesting. Standing orders and Direct Debits go out automatically, and a customer can pay by BACS without telling anybody. In each case the transaction is entirely proper and the business simply has not recorded it yet. This is why the specification lists the bank statement as a **source of cash book entries** as well as a thing to check against: the statement is often where these transactions are discovered.',
            'Note the difference in what happens next. Timing items from the previous card need no action — the cheque will clear in due course and the difference will disappear by itself. Items on the statement that are not in the cash book generally **do** need action: they should be entered.',
          ],
          examtrap: 'Do not confuse the two directions. Unpresented cheques are in the cash book and not on the statement. Bank charges are on the statement and not in the cash book. Questions frequently give a list and ask you to sort it into the two.',
        },
        {
          h: 'Worked: identifying the differences',
          worked: {
            title: 'Comparing a cash book with a statement',
            problem: 'A cash book shows a closing bank figure of £1,468.30. The bank statement shows a closing balance of £1,170.45. Comparing the two, the following are found: a cheque for £312.00 written to a supplier on 28 June does not appear on the statement; bank charges of £14.50 on the statement are not in the cash book; and interest received of £2.15 on the statement is not in the cash book. Identify which items are in which record, and show that they account for the difference.',
            steps: [
              { do: 'The difference is £1,468.30 − £1,170.45 = **£297.85**', why: 'Establishing the size of the gap first tells you when you have found everything.' },
              { do: 'In the cash book, not on the statement: the £312.00 cheque', why: 'Written and sent on 28 June, so the cash book has deducted it — but the supplier has not banked it, so the bank still holds the money.' },
              { do: 'On the statement, not in the cash book: bank charges £14.50 and interest received £2.15', why: 'Both were applied by the bank. The business had no document for either, so neither was ever entered.' },
              { do: 'Check the arithmetic: the cash book is £312.00 lower for the cheque, and £14.50 lower and £2.15 higher for the bank items still to be entered', why: 'Working out which way each item pushes the two figures apart is what turns a list into an explanation.' },
              { do: '£312.00 − £14.50 + £2.15 = **£299.65**… which does not equal £297.85', why: 'A £1.80 gap remains, so at least one more item is outstanding. Never stop before the difference is fully explained.' },
              { do: 'The correct reading: the unexplained £1.80 means the comparison is incomplete, and the remaining items must be found', why: 'The whole value of the exercise is that an unexplained residue is evidence of an error or an omission. A difference that does not resolve is the finding, not a rounding nuisance.' },
            ],
            answer: 'Cash book only: the £312.00 cheque · Statement only: charges £14.50 and interest £2.15 · £1.80 remains unexplained and must be investigated',
            tryIt: {
              q: 'A cash book shows £2,140.00 at the bank. The statement shows £2,265.00. An unpresented cheque for £125.00 was written to a supplier. By how much, in pounds, is the difference explained by that cheque?',
              answer: 125,
              unit: '£',
              hint: 'The cash book has already deducted the cheque; the bank has not. So the statement is higher by exactly that amount.',
              exp: '£2,265.00 − £2,140.00 = £125.00, which the unpresented cheque explains in full. The cash book deducted the payment when the cheque was written, while the bank still holds the money because the supplier has not banked it.',
            },
          },
          p: [
            'The last two steps are deliberately awkward, because that is what the exercise is for. An unexplained residue is not something to shrug at — it is the evidence that something has been missed or mis-recorded, and it is exactly the situation lesson 1D said to take to a supervisor rather than resolve by adjusting a figure until it fits.',
          ],
          notyet: 'This is **not** a bank reconciliation. Scope items 4.3.3 and 4.3.4 exclude bank reconciliations, and 4.3.4 also excludes overdrawn amounts. What is required here is identifying which items are in one record and not the other. Producing a formal reconciliation statement that agrees the two figures is Level 2 work.',
        },
      ],
      check: [
        {
          q: 'A cheque was written to a supplier and entered in the cash book, but has not appeared on the bank statement. What is the effect on the two figures?',
          opts: [
            'The statement balance is higher than the cash book figure',
            'The statement balance is lower, because the cheque has already been deducted by the bank',
            'Both figures are unaffected until the cheque clears',
            'The cash book entry should be reversed until the cheque appears',
          ],
          ans: 0,
          exp: 'The cash book deducted the payment when the cheque was written; the bank has not, because the supplier has not banked it. So the bank still shows the higher figure. No action is needed — the cheque will clear and the difference will disappear by itself.',
        },
        {
          q: 'Sort these into the correct category.',
          type: 'truefalse',
          labels: ['Cash book only', 'Statement only'],
          statements: [
            { text: 'A cheque written to a supplier that has not been presented.', answer: true },
            { text: 'Bank charges of £18.00.', answer: false },
            { text: 'A cheque received from a customer and recorded, but not yet banked.', answer: true },
            { text: 'A Direct Debit that went out automatically and was not entered.', answer: false },
          ],
          exp: 'Items the business recorded but the bank has not processed are in the cash book only — both unpresented and unbanked cheques. Items the bank applied without the business having a document are on the statement only, which covers bank charges and any automatic payment nobody recorded.',
        },
        {
          q: 'A cash book shows £3,412.00 at the bank; the statement shows £3,560.00. An unpresented cheque for £148.00 is identified. Is the difference explained?',
          opts: [
            'Yes — £3,560.00 − £3,412.00 is exactly £148.00',
            'No — the cheque explains only part of the difference',
            'No — the cheque should make the statement lower, not higher',
            'It cannot be determined without the opening balances',
          ],
          ans: 0,
          exp: 'The difference is £148.00, and the unpresented cheque accounts for all of it: the cash book has deducted a payment the bank still holds. When a single item explains the whole gap, the comparison is complete.',
        },
        {
          q: 'Which action does an item on the statement but not in the cash book normally require?',
          opts: [
            'It should be entered in the cash book',
            'No action — it will resolve itself as the item clears',
            'The bank should be asked to reverse it',
            'The cash book total should be adjusted to match the statement',
          ],
          ans: 0,
          exp: 'These are transactions the business has not yet recorded — bank charges, interest, an automatic payment — so they need entering. That is the opposite of a timing item like an unpresented cheque, which needs nothing because it will clear on its own.',
        },
        {
          q: 'After identifying all known differences, £1.80 of the gap between the two records remains unexplained. What does this indicate?',
          opts: [
            'Something has been missed or mis-recorded',
            'Rounding, which can be ignored at this level',
            'A bank error, which should be assumed',
            'The cash book should be adjusted by £1.80 to agree',
          ],
          ans: 0,
          exp: 'An unexplained residue is the finding, not a nuisance. Every difference has a cause, so £1.80 outstanding means an item is missing or wrong — and adjusting a figure until it fits is exactly the wrong response. This is a case for checking with a supervisor rather than resolving alone.',
        },
      ],
    },

    {
      id: 'L1-BKFN-4E',
      title: 'What each customer owes, and what you owe each supplier',
      summary: 'Bringing the daybooks and cash book together to work out an individual balance from an opening amount.',
      kind: 'practical',
      criteria: ['BKFN-4.4.1', 'BKFN-4.4.2', 'BKFN-4.4.3', 'BKFN-4.4.4', 'BKFN-4.4.5'],
      cards: [
        {
          h: 'The question the records exist to answer',
          p: [
            'A business needs to know, for each customer, how much that customer currently owes — and for each supplier, how much is owed to them. These are the figures used to chase payment, to decide who to pay, and to answer a customer who queries their balance.',
            'The records already contain everything needed. What they do not contain is the answer, because the daybooks are in date order and the cash book is in date order, so one customer’s dealings are scattered across both. Pulling them together is the last practical skill in this outcome.',
            'The calculation itself is short:',
          ],
          formula: 'Opening amount owed + invoices − credit notes − payments received = amount owed now',
          examtrap: 'Note the signs. Invoices increase what a customer owes; credit notes and payments both reduce it. The commonest error is adding a credit note instead of subtracting it.',
        },
        {
          h: 'Where the figures come from',
          split: {
            left: { title: 'Records (4.4.2)', items: ['`Sales daybook` — invoices issued to this customer', '`Sales returns daybook` — credit notes issued to them', '`Purchases daybook` — invoices from this supplier', '`Purchases returns daybook` — credit notes from them', '`Cash book` — money received or paid'] },
            right: { title: 'Documents (4.4.1)', items: ['Sales and purchase invoices, and credit notes', 'Lists of invoices and/or credit notes', 'Cash receipts, cheque stubs, paying-in book', '`Remittance advices` — which invoices a payment covered', 'Lists of receipts and/or payments', 'Bank statements and bank feeds', 'Software reports'] },
          },
          p: [
            'The specification also names the **software reports** that answer this question automatically, and learn them by name, because Outcome 5 returns to them: individual customer reports, individual supplier reports, `receivables` reports, `payables` reports, and `aged receivables` and `aged payables` analyses.',
            'An `aged` analysis is the one to understand now. It splits what is owed by how long it has been outstanding — current, 30 days, 60 days, 90 days and over. That matters because £5,000 owed across recent invoices is an ordinary trading position, while £5,000 owed on invoices from four months ago is a problem. The total is identical; the picture is not.',
            'The `remittance advice` earns its place on this list for the reason lesson 3B gave: without it you may not know which invoices a payment settled, and for an individual balance that is exactly what you need to know.',
          ],
          terms: [
            { t: 'Aged receivables analysis', d: 'A report splitting what customers owe by how long it has been outstanding.' },
            { t: 'Opening amount owed', d: 'What was owed at the start of the period, before this period’s transactions.' },
          ],
        },
        {
          h: 'Worked: what a customer owes',
          worked: {
            title: 'Ashcroft Design Studio’s balance at 30 June',
            problem: 'Ashcroft Design Studio owed £144.00 at 1 June. During June the sales daybook shows invoices to them of £199.20 and £288.00. The sales returns daybook shows a credit note of £19.20. The cash book shows a receipt from them of £144.00. What does Ashcroft owe at 30 June?',
            steps: [
              { do: 'Start with the opening amount owed: **£144.00**', why: 'Scope item 4.4.5 — the balance carried forward from the previous period is the starting point, not zero.' },
              { do: 'Add the invoices: £144.00 + £199.20 + £288.00 = **£631.20**', why: 'Invoices increase what a customer owes. Both come from the sales daybook.' },
              { do: 'Subtract the credit note: £631.20 − £19.20 = **£612.00**', why: 'A credit note reduces what was invoiced. It comes from the sales returns daybook — and it is subtracted, not added.' },
              { do: 'Subtract the receipt: £612.00 − £144.00 = **£468.00**', why: 'Money received reduces what is still owed. This comes from the cash book, analysed to receivables.' },
              { do: 'Sense-check: the £144.00 receipt exactly matches the opening balance, so Ashcroft has settled last month and owes June’s invoices less the credit note', why: 'A quick check that the story hangs together: £199.20 + £288.00 − £19.20 = £468.00, which agrees.' },
            ],
            answer: 'Ashcroft Design Studio owes £468.00 at 30 June',
            tryIt: {
              q: 'A customer owed £320.00 at the start of the month. Invoices of £540.00 were issued, a credit note of £60.00 was raised, and £320.00 was received. What is owed at the end of the month, in pounds?',
              answer: 480,
              unit: '£',
              hint: 'Opening, plus invoices, less credit notes, less receipts.',
              exp: '£320.00 + £540.00 = £860.00, less £60.00 = £800.00, less £320.00 = £480.00. Adding the credit note instead of subtracting it would give £920.00 — a £120.00 error, and the commonest mistake in this calculation.',
            },
          },
        },
        {
          h: 'Worked: what is owed to a supplier',
          p: [
            'The supplier side works identically, with the documents coming from the other direction: purchase invoices increase what is owed, credit notes received reduce it, and payments made reduce it.',
          ],
          worked: {
            title: 'Kesgrave Papers’ balance at 30 June',
            problem: 'The business owed Kesgrave Papers £349.20 at 1 June. The purchases daybook shows invoices from them of £194.40 and £54.00 during June. The purchases returns daybook shows a credit note received of £27.00. The cash book shows a payment to them of £349.20. What is owed to Kesgrave at 30 June?',
            steps: [
              { do: 'Opening amount owed: **£349.20**', why: 'What was outstanding at the start of the period.' },
              { do: 'Add the purchase invoices: £349.20 + £194.40 + £54.00 = **£597.60**', why: 'Invoices received increase what the business owes. Both come from the purchases daybook.' },
              { do: 'Subtract the credit note received: £597.60 − £27.00 = **£570.60**', why: 'A credit note from a supplier reduces what is owed to them — from the purchases returns daybook.' },
              { do: 'Subtract the payment made: £570.60 − £349.20 = **£221.40**', why: 'Money paid reduces the outstanding amount. From the cash book, payments side.' },
              { do: 'Sense-check: the payment cleared the opening balance exactly, leaving June’s invoices less the credit note', why: '£194.40 + £54.00 − £27.00 = £221.40, which agrees.' },
            ],
            answer: '£221.40 is owed to Kesgrave Papers at 30 June',
            tryIt: {
              q: 'A supplier was owed £180.00 at the start of the month. Invoices of £425.00 were received, a credit note of £35.00 was received, and £180.00 was paid. What is owed at the end of the month, in pounds?',
              answer: 390,
              unit: '£',
              hint: 'Opening, plus invoices received, less credit notes received, less payments made.',
              exp: '£180.00 + £425.00 = £605.00, less £35.00 = £570.00, less £180.00 = £390.00. The method is identical to the customer calculation — only the documents come from the other direction.',
            },
          },
          notyet: 'Scope item 4.4.5 excludes sales, purchase, receivables and payables **ledger accounts**. So these calculations are done as arithmetic from the daybooks and cash book, not by ruling up a ledger account for each customer. Ledger accounts are how Level 2 does the same job.',
        },
        {
          h: 'Why remittance advices matter here',
          p: [
            'One practical difficulty deserves its own card, because it is what makes this work harder than the arithmetic suggests.',
            'The calculations above assumed you know which receipts came from which customer. In a real cash book you do, because each entry names the customer. But you may not know **which invoices** a payment settled — and where a customer has several outstanding, that can matter.',
            'Consider a customer with three invoices outstanding: £199.20, £288.00 and £144.00. They pay £443.20. The total owed drops by £443.20 either way, so the overall balance is unaffected by which invoices it covered. But if you need to know which invoices are still outstanding — to chase them, or to produce an aged analysis — you need the split.',
            '£443.20 happens to be £199.20 + £288.00 − £44.00, or £288.00 + £144.00 + £11.20, or several other combinations. Guessing is not analysis. The `remittance advice` is what removes the guesswork, and this is why the specification lists it among the documents used to identify outstanding amounts.',
            'The same applies where a credit note is involved: a customer with a £1,200 invoice and a £150 credit note who pays £1,050 has settled that invoice in full, but nothing in the bank statement says so.',
          ],
          callout: { kind: 'tip', text: 'A payment tells you how much a customer has paid. Only a remittance advice tells you which invoices it covered — which is what an aged analysis and any chasing depend on.' },
        },
      ],
      check: [
        {
          q: 'A customer owed £250.00 at the start of the month. Invoices of £480.00 were issued, a credit note of £40.00 was raised, and £250.00 was received. What is owed at month end, in pounds?',
          type: 'numeric',
          answer: 440,
          unit: '£',
          exp: '£250.00 + £480.00 = £730.00, less £40.00 = £690.00, less £250.00 = £440.00. Invoices increase the balance; credit notes and receipts both reduce it.',
        },
        {
          q: 'In calculating what a customer owes, how is a credit note treated?',
          opts: [
            'Subtracted, because it reduces what was invoiced',
            'Added, because it is a document issued to the customer',
            'Ignored, because it does not involve money moving',
            'Subtracted only if the customer has already paid the invoice',
          ],
          ans: 0,
          exp: 'A credit note reduces an amount previously invoiced, so it comes off the balance. Adding it is the commonest error in this calculation — and it doubles the size of the mistake, since the figure moves the wrong way by twice the credit note.',
        },
        {
          q: 'A supplier was owed £96.00 at the start of the month. Purchase invoices of £312.00 were received, a credit note of £18.00 was received, and £96.00 was paid. What is owed at month end, in pounds?',
          type: 'numeric',
          answer: 294,
          unit: '£',
          exp: '£96.00 + £312.00 = £408.00, less £18.00 = £390.00, less £96.00 = £294.00. The supplier calculation follows the same pattern as the customer one, with the documents coming from the other direction.',
        },
        {
          q: 'Match each record to what it contributes to a customer’s balance.',
          type: 'match',
          left: ['Sales daybook', 'Sales returns daybook', 'Cash book', 'Remittance advice'],
          right: [
            'Invoices issued, which increase the amount owed',
            'Credit notes issued, which reduce it',
            'Receipts from the customer, which reduce it',
            'Which invoices a particular payment covered',
          ],
          exp: 'The three records supply the amounts, and the remittance advice supplies the allocation. The last is not needed for the overall balance, but it is essential for knowing which invoices remain outstanding — which is what chasing and an aged analysis depend on.',
        },
        {
          q: 'What does an aged receivables analysis show that a total of receivables does not?',
          opts: [
            'How long each amount has been outstanding',
            'Which customers are most profitable',
            'The VAT included in each invoice',
            'Whether each customer has agreed a credit limit',
          ],
          ans: 0,
          exp: 'It splits what is owed by age — current, 30, 60, 90 days and over. The total can be identical in two businesses while one is trading normally and the other is owed money on invoices four months old. The ageing is the information, not the total.',
        },
      ],
    },
  ];

  /* ── Outcome 5 — Accounting software (10%) ───────────────────────────────── */
  var O5 = [
    {
      id: 'L1-BKFN-5A',
      title: 'What software does that paper cannot',
      summary: 'Importing data, real-time reports, and the reports accounting software can produce.',
      kind: 'theory',
      criteria: ['BKFN-5.1.1', 'BKFN-5.1.2', 'BKFN-5.1.3', 'BKFN-5.1.4'],
      cards: [
        {
          h: 'Why this outcome comes last',
          p: [
            'Everything so far has been done by hand: invoices completed field by field, daybooks totalled and cross cast, closing cash calculated from columns. Almost no business works that way now.',
            'That is not a reason to have skipped it. Software automates a process; it does not remove the need to understand it. A bookkeeper who has never totalled a cash book cannot tell whether the software’s figure is plausible, cannot find the error when a bank feed miscodes a transaction, and cannot explain to a client why the VAT figure is what it is. The manual version is how you learn what the automated version is doing.',
            'What this outcome asks is that you understand what software adds, what it does not fix, and what risks it introduces. It is 10% of the assessment and entirely written — no software is operated, and no particular product is named.',
          ],
          callout: { kind: 'key', text: 'Software automates the process this unit has taught by hand. Knowing the manual version is what lets you judge whether the automated output is right.' },
        },
        {
          h: 'Getting data in without typing it',
          p: [
            'The first thing software does that paper cannot is take in data from somewhere else. The specification names three sources.',
          ],
          table: {
            headers: ['Source', 'What it means'],
            rows: [
              ['`Bank records`', 'Transactions imported directly from the bank — a **bank feed**, updating automatically'],
              ['`CSV files`', 'A simple spreadsheet-style file that most systems can produce and most can read'],
              ['`Third party software and apps`', 'Other systems — an online shop, a payment provider, a payroll package — passing transactions across'],
            ],
          },
          terms: [
            { t: 'Bank feed', d: 'A live connection to the bank account that imports transactions into the accounting software as they occur.' },
            { t: 'CSV file', d: 'Comma-separated values — a plain data file, readable by almost any system. The usual way to move data between products that do not connect directly.' },
            { t: 'Integrate', d: 'To connect two systems so data passes between them without being re-typed.' },
          ],
          p: [
            'The bank feed is the one that changes the work most. In lesson 4A the bank statement was a source of cash book entries, discovered when the statement arrived at the end of the month. With a feed, those transactions appear as they happen — including the bank charges and interest that nobody in the business initiated.',
            'The specification then lists the benefits of being able to integrate, import and export data. There are seven, and they are worth reading as a group rather than memorising individually, because most of them follow from one thing: the data is only entered once, by whoever generated it.',
          ],
        },
        {
          h: 'The seven benefits of integration',
          table: {
            headers: ['Benefit', 'Why it follows'],
            rows: [
              ['`Real-time` information — live bank feeds, wider accessibility', 'Transactions appear as they happen rather than at month end'],
              ['**Save time**', 'Nothing is re-typed from one system into another'],
              ['**Reduce reliance on paper** communication', 'Documents move as data rather than as printed paper in the post'],
              ['**Communicate information in various formats**', 'The same data can be a report, a spreadsheet, an emailed invoice or a screen'],
              ['**Work with data more flexibly**', 'Figures can be sorted, filtered and re-analysed without being re-entered'],
              ['**Reduce the risk of human error**', 'Every keystroke avoided is a keystroke that cannot be mistyped'],
              ['**Easy access from a single system**', 'One place to look rather than several disconnected records'],
            ],
          },
          p: [
            'The one to read carefully is **reduce risk of human error**. It says reduce, not eliminate, and the distinction is examined. Importing a bank transaction removes the chance of mistyping the amount. It does nothing about the transaction being coded to the wrong account, and nothing at all about an error made when a figure was first entered somewhere upstream. Scope item 5.1.7 makes that explicit, and the next lesson takes it up.',
            '**Real-time** is the other term worth pinning down. It means the information reflects the position now, rather than as at the last time somebody updated it. Set against lesson 1C — where out-of-date information in reports was a named consequence of untimely work — this is software addressing a specific problem the syllabus has already established.',
          ],
        },
        {
          h: 'The reports software can produce',
          p: [
            'Scope items 5.1.3 and 5.1.4 cover reporting, and they are largely a naming exercise: because the data is already in the system and current, a report is a matter of asking for it rather than of compiling it. The specification lists ten.',
          ],
          table: {
            headers: ['Report', 'What it shows'],
            rows: [
              ['Real-time financial position', 'Where the business stands now — assets, liabilities, capital'],
              ['Analysis of income and expenses', 'What has been earned and spent, broken down by category'],
              ['Individual customer report', 'Everything for one customer: invoices, credit notes, receipts, balance'],
              ['Individual supplier report', 'The same for one supplier'],
              ['`Receivables` report', 'What all customers owe'],
              ['`Payables` report', 'What is owed to all suppliers'],
              ['`Aged receivables` analysis', 'What customers owe, split by how long it has been outstanding'],
              ['`Aged payables` analysis', 'What is owed to suppliers, split by age'],
              ['Bank payments analysis for a period', 'Payments out of the bank over a chosen period'],
              ['Bank receipts analysis for a period', 'Receipts into the bank over a chosen period'],
            ],
          },
          p: [
            'Every one of these answers a question this unit has already asked by hand. The individual customer report is lesson 4E’s calculation, produced instantly. The receivables report is that calculation for every customer at once. The bank payments analysis is the cash book’s payments side, filtered to a period.',
            'That parallel is the point of putting this outcome last. The reports are not new capabilities; they are the manual work automated. What software adds is that they are **current** and available on demand — where the hand-worked version was a job somebody had to sit down and do, and was out of date by the time it was finished.',
            'The `aged` analyses remain the most useful of the ten, for the reason lesson 4E gave: two businesses can be owed the same total while one is trading normally and the other is not being paid.',
          ],
          callout: { kind: 'tip', text: 'Each report on this list is a task from Outcomes 3 and 4, done automatically and kept current. Recognising which is which is the easiest way to remember the list.' },
        },
      ],
      check: [
        {
          q: 'From which three sources does the specification say digital systems can import transactions?',
          opts: [
            'Bank records, CSV files, and third party software or apps',
            'Bank records, paper invoices, and email attachments',
            'CSV files, PDF statements, and scanned receipts',
            'Bank records, cheque stubs, and remittance advices received',
          ],
          ans: 0,
          exp: 'Those are the three scope item 5.1.1 names. Paper documents, PDFs and scans all still require somebody to enter or process them, so they are not imports in this sense — the point of an import is that the data arrives as data.',
        },
        {
          q: 'The specification says integration reduces the risk of human error. What does "reduce" rather than "eliminate" acknowledge?',
          opts: [
            'Imported data can still be coded to the wrong account',
            'Software occasionally corrupts the figures it imports',
            'Only some banks support automatic feeds',
            'Errors are reduced only where the business uses cloud software',
          ],
          ans: 0,
          exp: 'Removing the keystroke removes the mistyping. It does nothing about a transaction being allocated to the wrong account, and nothing about an error made where the figure was first entered. Scope item 5.1.7 states this directly: manual errors at the initial point of entry may still occur.',
        },
        {
          q: 'Match each software report to the manual task it replaces.',
          type: 'match',
          left: [
            'Individual customer report',
            'Aged receivables analysis',
            'Bank payments analysis for a period',
            'Analysis of income and expenses',
          ],
          right: [
            'Working out one customer’s balance from the daybooks and cash book',
            'Splitting what customers owe by how long it has been outstanding',
            'Reading the payments side of the cash book for a chosen period',
            'Adding up what has been earned and spent, by category',
          ],
          exp: 'Every report on the specification’s list corresponds to work this unit has already done by hand. What software adds is that the answer is current and available on demand, rather than being a job somebody has to sit down and do.',
        },
        {
          q: 'Identify whether each statement about integration and reporting is true.',
          type: 'truefalse',
          statements: [
            { text: 'A bank feed imports transactions as they occur rather than at month end.', answer: true },
            { text: 'Real-time reporting means the information reflects the position now.', answer: true },
            { text: 'Integration means data can be moved between systems without being re-typed.', answer: true },
            { text: 'Importing data from the bank eliminates the risk of human error.', answer: false },
          ],
          exp: 'The first three are what integration and real-time reporting mean. The last overstates it: importing removes mistyping but not miscoding, and not errors made further upstream — the specification is careful to say "reduce".',
        },
      ],
    },

    {
      id: 'L1-BKFN-5B',
      title: 'Software in the sales and purchase cycle',
      summary: 'What automation does for invoicing and for matching payments — and the two things it makes worse.',
      kind: 'theory',
      criteria: ['BKFN-5.1.5', 'BKFN-5.1.6', 'BKFN-5.1.7'],
      cards: [
        {
          h: 'Automating the documents',
          p: [
            'Scope item 5.1.5 covers what software does for customer and supplier transactions — which is to say, for everything in Outcome 3. Nine features are named, and each maps onto a step that was manual there.',
          ],
          table: {
            headers: ['Feature', 'What it replaces'],
            rows: [
              ['`Pro-forma invoices` and pro-forma purchase orders', 'Templates, so the standing details are not re-entered each time'],
              ['`Automated calculations`', 'Extending lines, applying discounts, adding VAT — lesson 3D by hand'],
              ['Automatic conversion of quotes to sales invoices', 'Re-keying a quotation as an invoice, and the errors that introduces'],
              ['`Recurring invoicing schedules`', 'Raising the same invoice every month by hand'],
              ['Duplicating a previously raised invoice', 'Typing a near-identical invoice from scratch'],
              ['`Automated emailing` of invoices', 'Printing, enveloping and posting — and the days that adds'],
              ['Automated updates of changes to invoices', 'Amending a document and everything derived from it, separately'],
              ['`Automatic checks` for accuracy', 'Cross casting by hand, and spotting a duplicate invoice number'],
            ],
          },
          terms: [
            { t: 'Pro-forma', d: 'A template or draft document — the standing details already filled in, ready to be completed.' },
            { t: 'Recurring invoice', d: 'An invoice the software raises automatically at set intervals, for a customer billed the same amount regularly.' },
          ],
          p: [
            'Two of these deserve a second look because they connect back to earlier problems.',
            '**Automatic conversion of quotes to sales invoices** removes a specific error. In lesson 3C the quotation supplied a price that overrode the price list, and the risk was invoicing the list price by mistake. If the invoice is generated from the quotation, that cannot happen.',
            '**Automated emailing** addresses lesson 1C directly. Payment terms run from the invoice date, so days spent printing and posting are days of cash lost. Emailing an invoice the moment it is raised removes that delay entirely.',
          ],
        },
        {
          h: 'Automating the money',
          p: [
            'Scope item 5.1.6 covers receipts and payments — Outcome 4 — and it is the longer list, with eleven features. Grouped by what they do:',
          ],
          split: {
            left: { title: 'Matching money to documents', items: ['Match bank **receipts** to sales invoices', 'Match bank **payments** to purchase invoices', '**Software learning** — suggesting matches based on previous transactions', 'Automatic identification of **differences** between the amount paid or received and what was expected', 'Automated allocation of an amount received to the cash book and the customer’s account'] },
            right: { title: 'Chasing and telling', items: ['Automated **remittance advice** when a payment is made', 'Automated **reminders** of when payments are due', 'Automated **payment set-up** for due dates', 'Automatic checks for accuracy', 'Customer **statements** in real time, showing amounts outstanding', 'Supplier statements in real time'] },
          },
          p: [
            'The matching group is the significant one, because it automates the hardest part of lesson 4E. There, a payment arriving in the bank had to be allocated to a customer and — with several invoices outstanding — to particular invoices, which is why the remittance advice mattered so much. Software attempts that allocation itself, matching a receipt to the invoice it fits.',
            '**Software learning** goes further: having seen a supplier’s payments coded to a particular account several times, the system suggests the same coding next time. It is a suggestion, not a decision, and treating it as a decision is exactly how a miscoding becomes permanent.',
            '**Automatic identification of differences** is the check that catches what matching cannot resolve. A customer paying £1,050 against a £1,200 invoice is either £150 short or has a £150 credit note; the software flags the difference and a person decides which. That is the shape of most of these features — the software narrows the work down to the decisions that need judgement.',
          ],
          callout: { kind: 'tip', text: 'Software suggests and flags; a person still decides. Every feature on this list reduces the volume of work rather than removing the need to judge it.' },
        },
        {
          h: 'The two disadvantages the specification names',
          p: [
            'Scope item 5.1.7 is short and pointed. Software has two named disadvantages, and both are examined precisely because they cut against the assumption that automation is straightforwardly an improvement.',
            'The first: **it can create errors when the amount or frequency of a recurring entry changes**. A recurring invoice is a benefit only while the arrangement stays the same. If a customer’s monthly charge rises, or they move from monthly to quarterly, the schedule keeps issuing the old invoice — correctly, on time, and wrong. Worse, because it is automated, nobody is looking at it. A manual process would have put the invoice in front of somebody every month; the automated one does not.',
            'The second: **manual errors at the initial point of entry may still occur**. Automation protects the steps after the first one. Whatever was entered wrongly at the start flows through every automated step downstream, arriving faster and in more places than it would have done by hand. A wrong unit price on a pro-forma is applied to every invoice generated from it.',
            'Together they make a single point: automation multiplies whatever it is given. Correct input becomes correct output at scale; wrong input becomes wrong output at scale, with less human attention on the way through.',
          ],
          split: {
            left: { title: 'Where automation helps', items: ['Repeated work that does not change', 'Arithmetic', 'Anything requiring speed', 'Consistency across many documents'] },
            right: { title: 'Where it hurts', items: ['Arrangements that have changed but the schedule has not', 'Errors made at the point of first entry', 'Anything nobody is now checking because it is automatic'] },
          },
          examtrap: 'The two disadvantages are specific: errors when a recurring entry’s amount or frequency changes, and manual errors at the initial point of entry. Vague answers about "over-reliance on technology" or "system failure" are not what scope item 5.1.7 names — system crashes belong to 5.3.1, on security threats.',
        },
      ],
      check: [
        {
          q: 'A customer’s monthly charge rises from £200 to £260, but the recurring invoice schedule is not updated. What does the specification identify as the problem here?',
          opts: [
            'Errors when a recurring entry’s amount or frequency changes',
            'Manual errors at the initial point of entry may still occur',
            'The software will refuse to issue the invoice',
            'Automated emailing will send the invoice to the wrong recipient',
          ],
          ans: 0,
          exp: 'This is the first of the two named disadvantages. The schedule keeps issuing the old amount correctly and on time, and because it is automated nobody is looking at it — where a manual process would have put the invoice in front of somebody each month.',
        },
        {
          q: 'Which feature most directly addresses the problem of allocating a payment when a customer has several invoices outstanding?',
          opts: [
            'Matching bank receipts to sales invoices',
            'Recurring invoicing schedules for regular customers',
            'Automated emailing of invoices',
            'Pro-forma purchase orders',
          ],
          ans: 0,
          exp: 'That was the hard part of lesson 4E — knowing which invoices a payment settled, which is why the remittance advice mattered. Software attempts the match itself and flags any difference between what was paid and what was expected, leaving a person to decide the cases it cannot resolve.',
        },
        {
          q: 'Why does automation make an error at the point of first entry more serious rather than less?',
          opts: [
            'It flows through every automated step downstream',
            'The software cannot be corrected once an entry has been made',
            'Automated entries are not included in the audit trail',
            'Errors in automated systems are not reportable',
          ],
          ans: 0,
          exp: 'Automation protects the steps after the first one and multiplies whatever it is given. A wrong unit price on a pro-forma reaches every invoice generated from it, and because each step ran automatically nobody was looking at the figure as it passed.',
        },
        {
          q: 'Identify whether each is a benefit the specification names for processing customer and supplier transactions.',
          type: 'truefalse',
          labels: ['Named', 'Not named'],
          statements: [
            { text: 'Automatic conversion of quotes to sales invoices.', answer: true },
            { text: 'Recurring invoicing schedules.', answer: true },
            { text: 'Automatic filing of VAT returns with HMRC.', answer: false },
            { text: 'Automatic detection of money laundering.', answer: false },
          ],
          exp: 'Converting quotes to invoices and recurring invoicing schedules are among the nine features scope item 5.1.5 lists. Filing VAT returns and detecting money laundering are not features the specification attributes to accounting software — the money laundering obligation is on the bookkeeper, to recognise and report a suspicion.',
        },
        {
          q: 'What does "software learning to suggest automated matching based on previous transactions" mean in practice?',
          opts: [
            'The system proposes the coding used for similar transactions before',
            'The software refuses transactions that do not match a previous pattern',
            'The software corrects previous errors once it has seen enough transactions',
            'Matching is done by the bank rather than by the accounting software',
          ],
          ans: 0,
          exp: 'It is a proposal based on history, and treating it as a decision is how a miscoding becomes permanent — the system will keep suggesting the wrong account as confidently as the right one. Every feature on this list narrows the work down rather than removing the judgement.',
        },
      ],
    },

    {
      id: 'L1-BKFN-5C',
      title: 'Choosing software, and keeping it safe',
      summary: 'Off-the-shelf against bespoke, traditional against cloud, and the eight threats to data security.',
      kind: 'theory',
      criteria: ['BKFN-5.2.1', 'BKFN-5.2.2', 'BKFN-5.3.1'],
      cards: [
        {
          h: 'Off-the-shelf or built for you',
          p: [
            '`Off-the-shelf` software is a finished product sold to many businesses. `Bespoke` software is written for one business to its own requirements. The specification asks for the differences across seven factors.',
          ],
          table: {
            headers: ['Factor', 'Off-the-shelf', 'Bespoke'],
            rows: [
              ['`Cost`', 'Low — development is shared across many customers', 'High — one business pays for all of it'],
              ['`Timeframe for development`', 'None — buy it and use it today', 'Months, before anything can be used'],
              ['`Levels of support`', 'Wide: manuals, forums, a large user base, many trained users', 'Narrow: only the developer understands it'],
              ['`Range of functions`', 'Broad, but may include much you do not need and lack something you do', 'Exactly what the business asked for'],
              ['`Frequency and ease of updates`', 'Regular, automatic, included', 'Only when commissioned and paid for'],
              ['`Training required`', 'Less — the product is documented and widely known', 'More — nobody has used it before, and no external courses exist'],
              ['`Type of subscription`', 'Usually a monthly or annual subscription per user', 'Often bought outright, with a support contract'],
            ],
          },
          p: [
            'The trade-off is fit against everything else. Bespoke software does exactly what the business wants; off-the-shelf costs a fraction as much, works immediately, updates itself, and can be supported by anybody who has used it before.',
            'For a small business doing ordinary bookkeeping, off-the-shelf wins comfortably — the work is not unusual, so software built for many businesses fits it. Bespoke becomes worth considering only where a business genuinely does something no standard product handles.',
            'The **support** row is the one students under-rate. When bespoke software has a problem, one supplier can fix it, and if they cease trading the business is left with software nobody understands. That is a risk, not merely an inconvenience.',
          ],
        },
        {
          h: 'Traditional or cloud',
          p: [
            '`Traditional` accounting software is installed on a particular computer, with the data held on that machine or on a local server. `Cloud` software runs on the provider’s servers and is reached through a browser or app, with the data held there. The specification asks for eleven differences.',
          ],
          table: {
            headers: ['Factor', 'Traditional', 'Cloud'],
            rows: [
              ['`Cost`', 'Bought once, often a larger initial outlay', 'Ongoing subscription, lower to start'],
              ['`Type of subscription`', 'A licence, often per machine', 'Usually per user per month'],
              ['`Access to internet`', 'Not needed — it works offline', '**Required** — no connection means no access'],
              ['`Access from multiple devices`', 'Limited to where it is installed', 'Any device that can sign in'],
              ['`Access from mobile devices`', 'Rarely', 'Normally, through an app'],
              ['`Frequency and ease of updates`', 'Installed manually, sometimes paid for', 'Applied by the provider, automatically'],
              ['`Upgrade capacity`', 'Constrained by the machine it runs on', 'Provider scales it; more users are a setting'],
              ['`Integration with third party software and apps`', 'Limited', 'Generally strong — bank feeds, apps, other systems'],
              ['`Levels of support`', 'Varies; may depend on a current licence', 'Included in the subscription'],
              ['`Range of functions`', 'Fixed at the installed version', 'Grows as the provider adds features'],
              ['`Training required`', 'Comparable — depends on the product', 'Comparable, though the interface changes more often'],
            ],
          },
          p: [
            'Two rows carry most of the weight in an answer.',
            '**Access to the internet** is cloud software’s one real dependency, and it is absolute: no connection means no access to the accounts at all. Traditional software keeps working when the line is down.',
            '**Access from multiple devices** is the corresponding advantage, and it is what makes remote and hybrid working practical. It also connects back to lesson 1F: data reachable from any device needs authentication, and the specification names exactly that safeguard for cloud-based information.',
            'The integration row explains why cloud software has largely won. Bank feeds, app connections and imports from other systems — the whole of scope item 5.1.1 — are far easier when the software already lives on the internet.',
          ],
          examtrap: 'The distinguishing weakness of cloud software is its dependence on an internet connection. The distinguishing weakness of traditional software is access from only one place, plus manual updates. Do not attribute security weakness to cloud by default — the threats on the next card apply to both.',
        },
        {
          h: 'The eight threats to data security',
          p: [
            'Scope item 5.3.1 names eight threats. They divide usefully into deliberate attacks, accidents, and events nobody controls — and that grouping matters, because it is what decides which safeguard from lesson 1F applies.',
          ],
          table: {
            headers: ['Threat', 'What it is'],
            rows: [
              ['`Viruses`', 'Malicious software that damages, steals or encrypts data'],
              ['`Hacking`', 'Unauthorised access to systems by someone breaking in'],
              ['`Phishing`', 'Messages impersonating a trusted sender, to trick somebody into giving up credentials or data'],
              ['`Employee fraud`', 'Misuse of legitimate access by somebody inside the business'],
              ['`System crashes`', 'Hardware or software failure, potentially losing unsaved or unbacked-up data'],
              ['`Corrupt files`', 'Data becoming unreadable through fault or interruption'],
              ['`Accidental deletion`', 'Somebody deleting data without meaning to'],
              ['`Natural disasters`', 'Fire, flood or similar destroying equipment and records'],
            ],
          },
          split: {
            left: { title: 'Deliberate', items: ['Viruses', 'Hacking', 'Phishing', 'Employee fraud'] },
            right: { title: 'Accidental or beyond control', items: ['System crashes', 'Corrupt files', 'Accidental deletion', 'Natural disasters'] },
          },
          p: [
            '`Phishing` is the one worth the most attention, because it is the threat that defeats technical safeguards. A firewall stops an intruder; it does nothing when an employee is persuaded to type their password into a convincing imitation of the bank’s website. The defence is the behavioural one from lesson 1F — checking who a message is really from, and never disclosing credentials in response to a request.',
            '`Employee fraud` is the other awkward one, and it is the only threat on the list that comes from somebody with legitimate access. Passwords and firewalls do not address it; restricted access, segregation of duties and a second person’s review do. That is why "have a second person review when appropriate" appeared as far back as lesson 1D.',
            'The last four have a common answer: **secure back-ups**, from scope item 1.3.3. A crash, a corrupt file, an accidental deletion and a fire all destroy data, and in every case a back-up held somewhere else is what makes the loss recoverable rather than final.',
          ],
          callout: { kind: 'warning', text: 'Back-ups are the single safeguard that covers crashes, corruption, accidental deletion and natural disasters. A back-up on the same machine as the data protects against none of them.' },
        },
      ],
      check: [
        {
          q: 'Which is an advantage of off-the-shelf software over bespoke software?',
          opts: [
            'It is usable immediately, with no development period',
            'It fits the business’s own requirements precisely and fully',
            'It can only be supported by the developer who wrote it',
            'It never requires updating once it has been installed',
          ],
          ans: 0,
          exp: 'Off-the-shelf software is a finished product, so there is no development timeframe — and it is cheaper, better supported and updated automatically. Exact fit is bespoke software’s advantage, and dependence on one developer is its weakness.',
        },
        {
          q: 'What is the distinguishing weakness of cloud accounting software?',
          opts: [
            'It requires an internet connection',
            'It cannot be accessed from mobile devices',
            'It cannot integrate with third party apps',
            'It cannot be updated once installed',
          ],
          ans: 0,
          exp: 'The internet dependency is absolute, and traditional software keeps working when the line is down. The other three are the reverse of cloud software’s strengths — mobile access, integration and automatic updates are among its main advantages.',
        },
        {
          q: 'Which threat to data security is least addressed by firewalls and strong passwords?',
          opts: [
            'Employee fraud',
            'Hacking from outside',
            'Viruses and malware',
            'Corrupt files',
          ],
          ans: 0,
          exp: 'Employee fraud is the only threat on the list that comes from somebody who is supposed to be in the system. Technical barriers do not apply; restricted access, segregation of duties and a second person’s review are what address it.',
        },
        {
          q: 'Match each threat to its description.',
          type: 'match',
          left: ['Phishing', 'Hacking', 'Corrupt files', 'Natural disasters'],
          right: [
            'A message impersonating a trusted sender, to trick somebody into giving up credentials',
            'Unauthorised access gained by somebody breaking into the system',
            'Data becoming unreadable through fault or interruption',
            'Fire or flood destroying equipment and records',
          ],
          exp: 'Phishing works on the person rather than the system, which is why technical safeguards do not stop it. Hacking is the break-in. Corrupt files and natural disasters are both cases where the data is lost rather than stolen — and both are answered by back-ups held elsewhere.',
        },
        {
          q: 'Which safeguard covers system crashes, corrupt files, accidental deletion and natural disasters together?',
          opts: [
            'Secure back-ups held elsewhere',
            'A firewall on the office network',
            'Strong passwords, changed regularly',
            'Anti-virus software on every machine',
          ],
          ans: 0,
          exp: 'All four destroy data rather than steal it, so the answer in every case is a copy held elsewhere. The location matters: a back-up on the same machine survives none of these, and one in the same building survives no fire.',
        },
      ],
    },
  ];

  /* == PRACTICE HOOK == */

  /* ── Assembly ────────────────────────────────────────────────────────────── */
  var AAT1_LEARN_PATH = [
    {
      id: 'bkfn-1',
      outcome: 1,
      outcomeTitle: 'Understand the role of the bookkeeper',
      weighting: 17,
      blurb: 'What the job is, why accuracy and timeliness are treated as duties, and the ethical and legal obligations that come with handling other people’s money and information.',
      lessons: O1,
    cheatsheet: {
      id: 'L1-BKFN-1S',
      title: 'The bookkeeper\'s role on one page',
      card: {
        h: 'Outcome 1 at a glance',
        p: [
          'The whole of this outcome is one idea from four directions: other people act on what you record, so being right and being on time are both part of the job.',
        ],
        split: {
          left: {
            title: 'When the numbers are wrong',
            items: [
              'Customers billed twice, or not at all',
              'Suppliers overpaid, or underpaid and chasing',
              'Profit and tax overstated or understated',
              'Goodwill lost, and your own position at risk',
            ],
          },
          right: {
            title: 'When the numbers are late',
            items: [
              'A right answer after the deadline is not a partial success',
              'Payment terms run from the invoice date',
              'Late invoicing delays the money coming in',
              'Decisions get made from stale reports',
            ],
          },
        },
        table: {
          headers: ['The five principles', 'What it asks of you'],
          rows: [
            ['Integrity', 'Be straightforward and honest'],
            ['Objectivity', 'No bias, no undue influence from anyone'],
            ['Professional competence and due care', 'Could I do this properly — and did I?'],
            ['Confidentiality', 'What you learn at work stays there'],
            ['Professional behaviour', 'Nothing that discredits the profession'],
          ],
        },
        callout: { kind: 'key', text: 'When a scenario describes something you cannot resolve, the answer is almost never "decide and make a note". It is to check with your supervisor.' },
        examtrap: 'Failing to report a suspicion of money laundering is itself a criminal offence, so staying out of it is not the safe option. And a manager pressing you to change a figure engages objectivity and integrity at once.',
      },
    },
    },
    {
      id: 'bkfn-2',
      outcome: 2,
      outcomeTitle: 'Understand financial transactions',
      weighting: 10,
      blurb: 'The smallest outcome and the one everything else rests on: the six kinds of item, the fact that every transaction moves at least two of them, and the equation that holds it all together.',
      lessons: O2,
    cheatsheet: {
      id: 'L1-BKFN-2S',
      title: 'Financial transactions on one page',
      card: {
        h: 'Outcome 2 at a glance',
        p: [
          'Classify the item first, and how the records must treat it follows. Every transaction then changes at least two of those items — if you can see only one effect, you have not finished describing it.',
        ],
        formula: 'Assets = Liabilities + Capital · Income − Expenses = Profit or Loss · Profit increases capital, a loss decreases it',
        table: {
          headers: ['The six kinds', 'What it is'],
          rows: [
            ['Asset', 'Something the business has or is owed'],
            ['Liability', 'Something the business owes'],
            ['Income', 'What the business earns'],
            ['Expense', 'What the business spends to earn it'],
            ['Capital', 'What the business owes its owner'],
            ['Profit or loss', 'Income less expenses, which moves capital'],
          ],
        },
        callout: { kind: 'key', text: 'Capital is a liability in character — the business owes it to the owner. That is why money put in increases capital and money taken out reduces it.' },
        examtrap: 'A bank overdraft is a liability, not an asset. And paying a supplier is not an expense — the expense happened when the goods arrived; the payment settles what was already owed.',
      },
    },
    },
    {
      id: 'bkfn-3',
      outcome: 3,
      outcomeTitle: 'Process customer and supplier transactions',
      weighting: 29,
      blurb: 'The practical heart of the first half: cash against credit, the nine documents and the order they arrive in, preparing an invoice and checking one, and getting them all into the daybooks.',
      lessons: O3,
    cheatsheet: {
      id: 'L1-BKFN-3S',
      title: 'Customers and suppliers on one page',
      card: {
        h: 'Outcome 3 at a glance',
        p: [
          'Nearly a third of the assessment. One transaction leaves a trail of paper, and most of the marks are for knowing which document does what and which way round it points.',
        ],
        table: {
          headers: ['Stage', 'Document', 'Who issues it'],
          rows: [
            ['Before anything moves', 'Quotation', 'The seller'],
            ['', 'Purchase order', 'The buyer'],
            ['When goods move', 'Delivery note', 'The seller'],
            ['', 'Goods received note', 'The buyer'],
            ['When money is owed', 'Invoice — adds to what is owed', 'The seller'],
            ['', 'Credit note — subtracts from it', 'The seller'],
            ['When it is paid', 'Remittance advice', 'The payer'],
          ],
        },
        formula: 'Net + VAT = Total · VAT at ' + VAT + ' is one fifth of the net, so Total = Net × 1.2 · Cross cast: net column + VAT column = total column',
        split: {
          left: {
            title: 'Which daybook',
            items: [
              'Invoice we issued → sales daybook',
              'Invoice we received → purchases daybook',
              'Credit note we issued → sales returns',
              'Credit note we received → purchases returns',
            ],
          },
          right: {
            title: 'Checking an invoice received',
            items: [
              'Quantities against the goods received note',
              'Prices against the quotation or the order',
              'The arithmetic, line by line and in total',
              'Wrong? Query it and expect a credit note',
            ],
          },
        },
        examtrap: 'Receivables are assets and payables are liabilities — reversing them is the commonest error here. Invoice the quantity DELIVERED, not the quantity ordered. And a daybook that cross casts is not a daybook that is right: it proves the arithmetic, not the entries.',
      },
    },
    },
    {
      id: 'bkfn-4',
      outcome: 4,
      outcomeTitle: 'Process receipts and payments',
      weighting: 34,
      blurb: 'The largest outcome. Money actually moving: the cash book and its two sides, closing cash in hand and at the bank, reading a bank statement against your own record, and working out what each customer and supplier owes.',
      lessons: O4,
    cheatsheet: {
      id: 'L1-BKFN-4S',
      title: 'Receipts and payments on one page',
      card: {
        h: 'Outcome 4 at a glance',
        p: [
          'The largest outcome in the unit. Money in on one side, money out on the other — deciding which side comes before any arithmetic.',
        ],
        formula: 'Opening amount + receipts − payments = closing amount · Opening owed + invoices − credit notes − payments = owed now',
        split: {
          left: {
            title: 'In the cash book, not on the statement',
            items: [
              'Cheques written and not yet presented',
              'Receipts paid in and not yet cleared',
              'The business knows; the bank has not caught up',
            ],
          },
          right: {
            title: 'On the statement, not in the cash book',
            items: [
              'Bank charges and interest',
              'Direct debits and standing orders',
              'Dishonoured cheques',
              'No document ever reached the business',
            ],
          },
        },
        table: {
          headers: ['Watch for', 'Because'],
          rows: [
            ['A negative closing cash in hand', 'Always an error — usually a receipt on the payments side'],
            ['Two closing figures, not one', 'Cash in hand and cash at the bank are separate columns'],
            ['VAT on a receipt settling an invoice', 'Already recorded in the sales daybook — do not analyse it twice'],
            ['A bank statement\'s column headings', 'Written from the bank\'s point of view, so they can look reversed'],
          ],
        },
        examtrap: 'Invoices increase what a customer owes; credit notes and payments both reduce it. And a payment tells you how much came in — only a remittance advice tells you which invoices it covered.',
      },
    },
    },
    {
      id: 'bkfn-5',
      outcome: 5,
      outcomeTitle: 'Understand the benefits and risks of using accounting software',
      weighting: 10,
      blurb: 'The modern half of the unit, and last for a reason: software automates the work the earlier outcomes taught by hand. What it adds, what it does not fix, and what it puts at risk.',
      lessons: O5,
    cheatsheet: {
      id: 'L1-BKFN-5S',
      title: 'Accounting software on one page',
      card: {
        h: 'Outcome 5 at a glance',
        p: [
          'This outcome comes last because software automates what the rest of the unit taught by hand. Knowing the manual version is what lets you judge whether the automated answer is right.',
        ],
        split: {
          left: {
            title: 'What software gives you',
            items: [
              'Data in without retyping — bank feeds, scanning, imports',
              'Documents produced and sent automatically',
              'Reports kept current: aged analyses, trial balance, VAT',
              'One entry updating every record at once',
            ],
          },
          right: {
            title: 'What it does not give you',
            items: [
              'Judgement — it suggests and flags; a person decides',
              'Protection from a wrong figure entered confidently',
              'Correct recurring entries when the amount or timing changes',
              'Any check on data that was wrong going in',
            ],
          },
        },
        table: {
          headers: ['Choice', 'The distinguishing weakness'],
          rows: [
            ['Off-the-shelf', 'May not fit an unusual business'],
            ['Bespoke', 'Costs more and takes longer to build'],
            ['Traditional, installed', 'Tied to the machine it is on'],
            ['Cloud', 'Depends on an internet connection'],
          ],
        },
        callout: { kind: 'key', text: 'Back-ups are the one safeguard covering crashes, corruption, accidental deletion and fire alike — but a back-up on the same machine protects against none of them.' },
        examtrap: 'The two disadvantages the specification names are specific: errors when a recurring entry\'s amount or frequency changes, and manual errors that the software carries through everywhere at once.',
      },
    },
    },
  ];

  if (typeof module === 'object' && module.exports) module.exports = { AAT1_LEARN_PATH: AAT1_LEARN_PATH };
  else root.AAT1_LEARN_PATH = AAT1_LEARN_PATH;
}(typeof self !== 'undefined' ? self : this));
